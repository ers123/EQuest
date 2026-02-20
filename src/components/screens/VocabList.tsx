import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Word, Level, LEVEL_INFO } from '@/types';
import { VOCABULARY } from '@/data/vocabulary';
import { useSRS } from '@/hooks/useSRS';
import { Card } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Mascot } from '@/components/ui/Mascot';
import {
  ArrowLeft,
  Play,
  Zap,
  Target,
  Trophy,
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

const topicEmojis: Record<string, string> = {
  animals: '🐾',
  food: '🍎',
  family: '👨‍👩‍👧',
  school: '🏫',
  nature: '🌳',
  body: '🫀',
  colors: '🎨',
  numbers: '🔢',
  time: '⏰',
  weather: '🌤️',
  emotions: '😊',
  actions: '🏃',
  places: '🏠',
  travel: '✈️',
  clothes: '👕',
  sports: '⚽',
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
      {/* Header */}
      <header className="bg-gradient-secondary px-5 pt-safe-top pb-6 rounded-b-[40px] shadow-lg">
        <div className="flex items-center gap-3 pt-4 mb-4">
          <IconButton onClick={onBack} variant="ghost" className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </IconButton>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Word Quest</h1>
            <p className="text-xs text-white/80">단어 퀘스트</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Due reviews */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-white font-bold text-sm">
                {stats.dueToday} due
              </span>
            </div>

            {/* Learning */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
              <Target className="w-4 h-4 text-sky-light" />
              <span className="text-white font-bold text-sm">
                {stats.learning} learning
              </span>
            </div>
          </div>

          {/* Mastered */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="text-white font-bold text-sm">
              {stats.mastered} mastered
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="px-5 -mt-4">
        {/* Quick actions */}
        <Card className="mb-6">
          <div className="flex items-center gap-3">
            <Mascot size="sm" mood="happy" animate={false} />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">
                {stats.dueToday > 0
                  ? `${stats.dueToday} words to review!`
                  : 'Great job! All caught up!'}
              </h3>
              <p className="text-sm text-gray-500">
                {stats.dueToday > 0 ? '복습할 단어가 있어요!' : '모든 복습을 완료했어요!'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {stats.dueToday > 0 && (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={startReview}
              >
                <Zap className="w-4 h-4" />
                Review Now
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
              {unlearnedCount > 0 ? 'Learn New' : 'All Learned!'}
            </Button>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={startPractice}
              className={stats.dueToday > 0 ? 'col-span-2' : ''}
              disabled={filteredVocab.length === 0}
            >
              <Target className="w-4 h-4" />
              Practice All
            </Button>
          </div>
        </Card>

        {/* Progress overview */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Your Progress</h3>
            <span className="text-sm text-gray-500">
              {stats.total} / {VOCABULARY.length} words
            </span>
          </div>

          <ProgressBar
            value={stats.total}
            max={VOCABULARY.length}
            variant="secondary"
            size="lg"
          />

          <div className="flex justify-between mt-3 text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <div className="w-3 h-3 rounded-full bg-sky" />
              Learning: {stats.learning}
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <div className="w-3 h-3 rounded-full bg-gold" />
              Mastered: {stats.mastered}
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Filter by Level</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedLevel('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                selectedLevel === 'all'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              All Levels
            </button>
            {LEVEL_INFO.map((info) => (
              <button
                key={info.level}
                onClick={() => setSelectedLevel(info.level)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedLevel === info.level
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {info.emoji} Lv.{info.level}
              </button>
            ))}
          </div>
        </div>

        {/* Topic filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Filter by Topic</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedTopic('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                selectedTopic === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              All Topics
            </button>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedTopic === topic
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {topicEmojis[topic] || '📝'} {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {Object.keys(groupedVocab).length === 0 && (
          <Card className="mb-6 text-center py-8">
            <p className="text-gray-500 text-lg mb-1">No words found</p>
            <p className="text-gray-400 text-sm">이 필터에 해당하는 단어가 없어요. 다른 레벨이나 주제를 선택해 보세요.</p>
          </Card>
        )}

        {/* Word list by topic */}
        {Object.entries(groupedVocab).map(([topic, words]) => (
          <div key={topic} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{topicEmojis[topic] || '📝'}</span>
              <h2 className="text-lg font-bold text-gray-800 capitalize">{topic}</h2>
              <span className="text-sm text-gray-400">({words.length})</span>
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
                        <span className="font-bold text-gray-800">{word.word}</span>
                        {mastered && <Star className="w-4 h-4 text-gold fill-gold" />}
                      </div>
                      <span className="text-sm text-gray-500">{word.meaning}</span>
                    </div>

                    {/* Level badge */}
                    <span className="text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded-full">
                      Lv.{word.level}
                    </span>

                    {/* Audio button */}
                    <IconButton
                      size="sm"
                      onClick={() => speakWord(word.word)}
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
                  View all {words.length} words & practice →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
