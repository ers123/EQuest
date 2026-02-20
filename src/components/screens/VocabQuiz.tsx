import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { useSRS } from '@/hooks/useSRS';
import { useConfetti } from '@/hooks/useConfetti';
import { Word } from '@/types';
import { VOCABULARY } from '@/data/vocabulary';
import { Card } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Mascot } from '@/components/ui/Mascot';
import {
  ArrowLeft,
  Volume2,
  Check,
  X,
  ArrowRight,
  RotateCcw,
  Trophy,
  Zap,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VocabQuizProps {
  words: Word[];
  onBack: () => void;
  onComplete: () => void;
}

type QuizType = 'en-to-ko' | 'ko-to-en' | 'listen';

export function VocabQuiz({ words, onBack, onComplete }: VocabQuizProps) {
  const { incrementQuizCount } = useProgressStore();
  const { reviewWord } = useSRS();
  const { fireConfetti, fireStars } = useConfetti();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  // Generate quiz items
  const quizItems = useMemo(() => {
    return words.map((word) => {
      // Alternate quiz types
      const types: QuizType[] = ['en-to-ko', 'ko-to-en', 'listen'];
      const type = types[Math.floor(Math.random() * 2)]; // Mostly en-ko or ko-en

      // Generate distractor options - use full vocabulary as fallback when quiz pool is small
      let distractorPool = words.filter((w) => w.word !== word.word);
      if (distractorPool.length < 3) {
        const quizWordIds = new Set(words.map((w) => w.word));
        const additionalWords = VOCABULARY.filter(
          (w) => w.word !== word.word && !quizWordIds.has(w.word)
        );
        distractorPool = [...distractorPool, ...additionalWords];
      }
      const shuffledOthers = distractorPool.sort(() => Math.random() - 0.5).slice(0, 3);

      let options: string[];
      let correctIndex: number;

      if (type === 'en-to-ko' || type === 'listen') {
        options = [word.meaning, ...shuffledOthers.map((w) => w.meaning)];
      } else {
        options = [word.word, ...shuffledOthers.map((w) => w.word)];
      }

      // Deduplicate options (in case meanings overlap), then pad if needed
      const uniqueOptions = [...new Set(options)];
      if (uniqueOptions.length < options.length) {
        const extraWords = VOCABULARY
          .filter((w) => w.word !== word.word && !uniqueOptions.includes(w.meaning) && !uniqueOptions.includes(w.word))
          .sort(() => Math.random() - 0.5);
        for (const ew of extraWords) {
          if (uniqueOptions.length >= 4) break;
          const val = type === 'ko-to-en' ? ew.word : ew.meaning;
          if (!uniqueOptions.includes(val)) uniqueOptions.push(val);
        }
        options = uniqueOptions;
      }

      // Shuffle options and find correct index
      const shuffledOptions = options.sort(() => Math.random() - 0.5);
      correctIndex = shuffledOptions.indexOf(
        type === 'ko-to-en' ? word.word : word.meaning
      );

      return {
        word,
        type,
        options: shuffledOptions,
        correctIndex,
      };
    });
  }, [words]);

  const currentItem = quizItems[currentIndex];
  const progress = ((currentIndex) / quizItems.length) * 100;

  // Speak word
  const speakWord = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Auto-play for listen type
  useEffect(() => {
    if (currentItem?.type === 'listen' && !showResult) {
      setTimeout(() => speakWord(currentItem.word.word), 300);
    }
  }, [currentIndex, currentItem, showResult, speakWord]);

  // Handle answer selection
  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === currentItem.correctIndex;

    // Update streak
    if (isCorrect) {
      setStreak((prev) => prev + 1);
      setScore((prev) => prev + 1);

      // Streak bonus effects
      if (streak >= 4) {
        fireStars();
      }
    } else {
      setStreak(0);
    }

    // Update stats
    incrementQuizCount(isCorrect);

    // Update SRS
    reviewWord(currentItem.word.word, isCorrect, isCorrect ? 'medium' : 'hard');

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(isCorrect ? [50] : [50, 50, 50]);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentIndex >= quizItems.length - 1) {
      setShowComplete(true);
      if (score / quizItems.length >= 0.8) {
        fireConfetti();
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  // Retry quiz
  const retryQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setStreak(0);
    setShowComplete(false);
  };

  if (showComplete) {
    const percentage = Math.round((score / quizItems.length) * 100);
    const xpEarned = score * 10 + (percentage === 100 ? 50 : 0);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <Mascot
            size="xl"
            mood={percentage >= 80 ? 'excited' : percentage >= 60 ? 'happy' : 'thinking'}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-6 w-full max-w-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-gold" />
            <span className="text-sm font-bold text-gold-dark uppercase">
              Quiz Complete!
            </span>
          </div>

          <h2 className="text-4xl font-black text-gray-800 mb-1">
            {percentage}%
          </h2>
          <p className="text-gray-500 mb-6">
            {percentage === 100
              ? 'Perfect! 완벽해요! 🎉'
              : percentage >= 80
              ? 'Great job! 잘했어요! 👏'
              : percentage >= 60
              ? 'Good effort! 좋아요! 👍'
              : 'Keep practicing! 연습해요! 💪'}
          </p>

          {/* Score breakdown */}
          <Card className="mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Correct answers</span>
              <span className="font-bold text-gray-800">
                {score} / {quizItems.length}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">XP earned</span>
              <span className="font-bold text-primary flex items-center gap-1">
                <Zap className="w-4 h-4" />
                +{xpEarned}
              </span>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button size="lg" fullWidth onClick={onComplete}>
              <Star className="w-5 h-5" />
              Done
            </Button>

            <Button size="lg" fullWidth variant="outline" onClick={retryQuiz}>
              <RotateCcw className="w-5 h-5" />
              Try Again
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (!currentItem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <IconButton onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </IconButton>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Question {currentIndex + 1} of {quizItems.length}
              </span>
              {streak >= 3 && (
                <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full animate-pulse">
                  🔥 {streak} streak!
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 rounded-full">
            <Check className="w-4 h-4 text-secondary" />
            <span className="text-sm font-bold text-secondary">{score}</span>
          </div>
        </div>

        <ProgressBar value={progress} size="sm" variant="secondary" />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col"
          >
            {/* Question card */}
            <Card className="mb-6 flex-shrink-0">
              <div className="text-center">
                {currentItem.type === 'listen' ? (
                  <>
                    <p className="text-gray-500 mb-4">Listen and select the meaning</p>
                    <button
                      onClick={() => speakWord(currentItem.word.word)}
                      className="w-20 h-20 mx-auto bg-gradient-sky rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                      <Volume2 className="w-10 h-10 text-white" />
                    </button>
                    <p className="text-xs text-gray-400 mt-3">Tap to listen again</p>
                  </>
                ) : currentItem.type === 'en-to-ko' ? (
                  <>
                    <p className="text-gray-500 mb-2">What does this word mean?</p>
                    <p className="text-xs text-gray-400 mb-4">이 단어의 뜻은?</p>
                    <div className="flex items-center justify-center gap-3">
                      <h2 className="text-3xl font-black text-gray-800">
                        {currentItem.word.word}
                      </h2>
                      <IconButton
                        size="sm"
                        onClick={() => speakWord(currentItem.word.word)}
                      >
                        <Volume2 className="w-5 h-5" />
                      </IconButton>
                    </div>
                    <p className="text-gray-400 mt-2">{currentItem.word.pronunciation}</p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 mb-2">What is this word in English?</p>
                    <p className="text-xs text-gray-400 mb-4">영어로 뭐예요?</p>
                    <h2 className="text-3xl font-black text-gray-800">
                      {currentItem.word.meaning}
                    </h2>
                  </>
                )}
              </div>
            </Card>

            {/* Options */}
            <div className="space-y-3 flex-1">
              {currentItem.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentItem.correctIndex;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={cn(
                      'w-full p-4 rounded-2xl text-left transition-all duration-200',
                      'border-2 bg-white shadow-card',
                      !showResult && 'hover:border-primary/30 hover:shadow-card-hover active:scale-98',
                      isSelected && !showResult && 'border-primary bg-primary/5',
                      showCorrect && 'border-secondary bg-secondary/10',
                      showWrong && 'border-red-400 bg-red-50 shake'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'text-lg font-medium',
                          showCorrect && 'text-secondary-dark',
                          showWrong && 'text-red-600'
                        )}
                      >
                        {option}
                      </span>
                      {showCorrect && <Check className="w-6 h-6 text-secondary" />}
                      {showWrong && <X className="w-6 h-6 text-red-500" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Result & Next button */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6"
                >
                  {/* Explanation card */}
                  <Card
                    className={cn(
                      'mb-4',
                      selectedAnswer === currentItem.correctIndex
                        ? 'bg-secondary/5 border border-secondary/20'
                        : 'bg-red-50 border border-red-100'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === currentItem.correctIndex ? (
                        <>
                          <Check className="w-5 h-5 text-secondary" />
                          <span className="font-bold text-secondary">Correct!</span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5 text-red-500" />
                          <span className="font-bold text-red-500">Not quite!</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-700">
                        <span className="font-bold">{currentItem.word.word}</span>
                        {' = '}
                        <span>{currentItem.word.meaning}</span>
                      </p>
                      {currentItem.word.example && (
                        <p className="text-sm text-gray-500 italic">
                          "{currentItem.word.example}"
                        </p>
                      )}
                    </div>
                  </Card>

                  <Button size="lg" fullWidth onClick={nextQuestion}>
                    {currentIndex >= quizItems.length - 1 ? 'See Results' : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shake animation styles */}
      <style>{`
        .shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </motion.div>
  );
}
