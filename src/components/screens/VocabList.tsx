import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Word, Level, LEVEL_INFO } from '@/types';
import { VOCABULARY } from '@/data/vocabulary';
import { useSRS } from '@/hooks/useSRS';
import { Card } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  ArrowLeft,
  Play,
  Zap,
  Target,
  Filter,
  Volume2,
  BookOpen,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VocabListProps {
  onBack: () => void;
  onStartQuiz: (words: Word[]) => void;
}

const topicLabels: Record<string, string> = {
  animals: '동물', food: '음식', family: '가족', school: '학교', nature: '자연',
  body: '몸', colors: '색깔', numbers: '숫자', time: '시간', weather: '날씨',
  emotions: '마음', actions: '동작', places: '장소', travel: '여행', clothes: '옷', sports: '운동',
};

export function VocabList({ onBack, onStartQuiz }: VocabListProps) {
  const { vocabulary } = useProgressStore();
  const { getStats, getDueWords, addWord } = useSRS();
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all');

  const stats = getStats();
  const dueWords = getDueWords();

  // Get available topics
  const topics = useMemo(() => {
    const topicSet = new Set(VOCABULARY.map((w) => w.topic));
    return Array.from(topicSet).sort();
  }, []);

  // Filter vocabulary
  const filteredVocab = useMemo(() => {
    return VOCABULARY.filter((word) => {
      if (selectedLevel !== 'all' && word.level !== selectedLevel) {
        return false;
      }
      if (selectedTopic !== 'all' && word.topic !== selectedTopic) {
        return false;
      }
      return true;
    });
  }, [selectedLevel, selectedTopic]);

  // Group vocabulary by topic
  const groupedVocab = useMemo(() => {
    return filteredVocab.reduce((acc, word) => {
      if (!acc[word.topic]) {
        acc[word.topic] = [];
      }
      acc[word.topic].push(word);
      return acc;
    }, {} as Record<string, Word[]>);
  }, [filteredVocab]);

  // Check if word is mastered
  const isWordMastered = (wordId: string) => {
    return vocabulary.masteredWords.includes(wordId);
  };

  // Check if word is being learned
  const isWordLearning = (wordId: string) => {
    return vocabulary.learningWords.includes(wordId);
  };

  // Start review with due words
  const startReview = () => {
    if (dueWords.length > 0) {
      const wordsToReview = dueWords
        .slice(0, 10)
        .map((item) => VOCABULARY.find((w) => w.word === item.wordId))
        .filter(Boolean) as Word[];
      onStartQuiz(wordsToReview);
    }
  };

  // Start new learning session with unlearned words
  const startLearning = () => {
    const unlearnedWords = filteredVocab.filter(
      (word) => !isWordMastered(word.word) && !isWordLearning(word.word)
    );
    if (unlearnedWords.length === 0) return;
    const wordsToLearn = unlearnedWords.slice(0, 10);

    // Add new words to SRS
    wordsToLearn.forEach((word) => addWord(word));

    onStartQuiz(wordsToLearn);
  };

  // Start practice with random words
  const startPractice = () => {
    if (filteredVocab.length === 0) return;
    const shuffled = [...filteredVocab].sort(() => Math.random() - 0.5);
    onStartQuiz(shuffled.slice(0, 10));
  };

  // Check availability for buttons
  const unlearnedCount = filteredVocab.filter(
    (word) => !isWordMastered(word.word) && !isWordLearning(word.word)
  ).length;

  // Speak word
  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-24"
    >
      <header className="border-b border-ink/10">
        <div className="page-width flex items-center gap-3 py-4 safe-top">
          <IconButton onClick={onBack} aria-label="홈으로 돌아가기"><ArrowLeft size={20} /></IconButton>
          <div><p className="text-[10px] font-semibold tracking-[.14em] text-ink/50">EQUEST WORDS</p><h1 className="mt-0.5 text-xl font-bold tracking-tight text-ink">나의 단어장</h1></div>
        </div>
      </header>

      {/* Main content */}
      <div className="page-width pt-7">
        {/* Quick actions */}
        <Card className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-ink">
                {stats.dueToday > 0
                  ? `다시 만날 단어가 ${stats.dueToday}개 있어요`
                  : '새로운 표현을 만나볼까요?'}
              </h3>
              <p className="text-sm text-ink/60">
                {stats.dueToday > 0 ? '익숙해질 때까지 가볍게 다시 살펴봐요.' : '궁금한 주제를 고르거나 발음을 들어보세요.'}
              </p>
            </div>
          </div>

          <div className="grid gap-3 mt-4 sm:grid-cols-2">
            {stats.dueToday > 0 && (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={startReview}
              >
                <Zap className="w-4 h-4" />
                다시 보기
              </Button>
            )}

            <Button
              variant={stats.dueToday > 0 ? 'outline' : 'secondary'}
              size="md"
              fullWidth
              onClick={startLearning}
              disabled={unlearnedCount === 0}
            >
              <Play className="w-4 h-4" />
              새 단어 만나기
            </Button>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={startPractice}
              disabled={filteredVocab.length === 0}
              className={stats.dueToday > 0 ? 'sm:col-span-2' : ''}
            >
              <Target className="w-4 h-4" />
              단어 퀴즈
            </Button>
          </div>
        </Card>

        {/* Progress overview */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-ink">나의 단어 기록</h3>
            <span className="text-sm text-ink/60">
              {stats.total} / {VOCABULARY.length}개
            </span>
          </div>

          <ProgressBar
            value={stats.total}
            max={VOCABULARY.length}
            variant="secondary"
            size="lg"
          />

          <div className="flex justify-between mt-3 text-sm">
            <div className="flex items-center gap-1 text-ink/60">
              <div className="w-3 h-3 rounded-full bg-sky" />
              익히는 중 {stats.learning}개
            </div>
            <div className="flex items-center gap-1 text-ink/60">
              <div className="w-3 h-3 rounded-full bg-gold" />
              익숙한 단어 {stats.mastered}개
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-ink/50" />
            <span className="text-sm font-medium text-ink/60">읽기 단계</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedLevel('all')}
              aria-pressed={selectedLevel === 'all'}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                selectedLevel === 'all'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
              )}
            >
              모든 단계
            </button>
            {LEVEL_INFO.map((info) => (
              <button
                key={info.level}
                onClick={() => setSelectedLevel(info.level)}
                aria-pressed={selectedLevel === info.level}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedLevel === info.level
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
                )}
              >
                단계 {info.level}
              </button>
            ))}
          </div>
        </div>

        {/* Topic filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-ink/50" />
            <span className="text-sm font-medium text-ink/60">궁금한 주제</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedTopic('all')}
              aria-pressed={selectedTopic === 'all'}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                selectedTopic === 'all'
                  ? 'bg-ink text-white'
                  : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
              )}
            >
              모든 주제
            </button>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                aria-pressed={selectedTopic === topic}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedTopic === topic
                    ? 'bg-ink text-white'
                    : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
                )}
              >
                {topicLabels[topic] || topic}
              </button>
            ))}
          </div>
        </div>

        {filteredVocab.length === 0 && <div className="border-y border-ink/10 py-10 text-center"><p className="text-sm text-ink/60">이 단계와 주제에 해당하는 단어가 없어요.</p><button className="mt-3 min-h-11 px-4 text-sm font-semibold text-primary" onClick={() => { setSelectedLevel('all'); setSelectedTopic('all'); }}>모든 단어 보기</button></div>}

        {/* Word list by topic */}
        {Object.entries(groupedVocab).map(([topic, words]) => (
          <div key={topic} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              <h2 className="text-lg font-bold text-ink capitalize">{topicLabels[topic] || topic}</h2>
              <span className="text-sm text-ink/50">({words.length})</span>
            </div>

            <div className="space-y-2">
              {words.slice(0, 5).map((word) => {
                const mastered = isWordMastered(word.word);
                const learning = isWordLearning(word.word);

                return (
                  <Card
                    key={word.word}
                    padding="sm"
                    className={cn(
                      'flex items-center gap-3',
                      mastered && 'bg-gold/5 border border-gold/20'
                    )}
                  >
                    {/* Status indicator */}
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full flex-shrink-0',
                        mastered
                          ? 'bg-gold'
                          : learning
                          ? 'bg-sky'
                          : 'bg-gray-200'
                      )}
                    />

                    {/* Word info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink">{word.word}</span>
                        {mastered && <Star className="w-4 h-4 text-gold fill-gold" />}
                      </div>
                      <span className="text-sm text-ink/60">{word.meaning}</span>
                    </div>

                    {/* Level badge */}
                    <span className="text-xs text-ink/50 px-2 py-1 bg-gray-100 rounded-full">
                      Lv.{word.level}
                    </span>

                    {/* Audio button */}
                    <IconButton
                      size="sm"
                      onClick={() => speakWord(word.word)}
                      aria-label={`${word.word} 발음 듣기`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </IconButton>
                  </Card>
                );
              })}

              {words.length > 5 && (
                <button
                  onClick={() => {
                    setSelectedTopic(topic);
                    onStartQuiz(words.slice(0, 10));
                  }}
                  className="w-full py-3 text-center text-sm font-medium text-secondary hover:text-secondary-dark"
                >
                  이 주제 단어로 퀴즈 풀기 →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
