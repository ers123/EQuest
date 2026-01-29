import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Story, Word } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Mascot } from '@/components/ui/Mascot';
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  Languages,
  X,
  Check,
  BookOpen,
  Lightbulb,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryReaderProps {
  story: Story;
  onBack: () => void;
  onComplete: () => void;
}

type ReaderState = 'reading' | 'quiz' | 'complete';

export function StoryReader({ story, onBack, onComplete }: StoryReaderProps) {
  const { stories, completeChapter, completeStory } = useProgressStore();

  // Get current progress
  const progress = stories[story.id];
  const initialChapter = progress?.currentChapter || 0;

  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [showKorean, setShowKorean] = useState(false);
  const [readerState, setReaderState] = useState<ReaderState>('reading');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const chapter = story.chapters[currentChapter];
  const isLastChapter = currentChapter === story.chapters.length - 1;

  // Parse content to highlight vocabulary words
  const parsedContent = useMemo(() => {
    if (!chapter) return [];

    // Split by marked words [[word]] and regular text
    const parts: { type: 'text' | 'vocab'; content: string; word?: Word }[] = [];
    const regex = /\[\[([^\]]+)\]\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(chapter.content)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        const text = showKorean
          ? chapter.contentKorean.slice(lastIndex, match.index)
          : chapter.content.slice(lastIndex, match.index);
        parts.push({ type: 'text', content: text });
      }

      // Add vocabulary word
      const wordText = match[1];
      const wordData = chapter.vocabulary.find(
        (w) => w.word.toLowerCase() === wordText.toLowerCase()
      );
      parts.push({
        type: 'vocab',
        content: wordText,
        word: wordData,
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < chapter.content.length) {
      const text = showKorean
        ? chapter.contentKorean.slice(lastIndex)
        : chapter.content.slice(lastIndex);
      parts.push({ type: 'text', content: text });
    }

    return parts;
  }, [chapter, showKorean]);

  // Text-to-speech
  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Handle quiz answer selection
  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    if (showResults) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  // Submit quiz
  const submitQuiz = () => {
    setShowResults(true);

    // Calculate score
    const totalQuestions = chapter.quiz.length;
    const correctAnswers = chapter.quiz.filter(
      (q) => quizAnswers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save progress
    completeChapter(story.id, currentChapter, score);
  };

  // Continue after quiz
  const continueAfterQuiz = () => {
    if (isLastChapter) {
      completeStory(story.id);
      setReaderState('complete');
    } else {
      setCurrentChapter((prev) => prev + 1);
      setReaderState('reading');
      setQuizAnswers({});
      setShowResults(false);
    }
  };

  // Calculate quiz score
  const quizScore = useMemo(() => {
    if (!showResults) return 0;
    const totalQuestions = chapter?.quiz.length || 1;
    const correctAnswers = chapter?.quiz.filter(
      (q) => quizAnswers[q.id] === q.correctAnswer
    ).length || 0;
    return Math.round((correctAnswers / totalQuestions) * 100);
  }, [chapter, quizAnswers, showResults]);

  if (!chapter) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <IconButton onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </IconButton>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-800 truncate">
              {story.title}
            </h1>
            <p className="text-xs text-gray-500">
              Chapter {currentChapter + 1} of {story.chapters.length}
            </p>
          </div>

          {/* Toggle Korean */}
          <IconButton
            onClick={() => setShowKorean(!showKorean)}
            className={cn(showKorean && 'bg-primary/10 text-primary')}
          >
            <Languages className="w-5 h-5" />
          </IconButton>

          {/* TTS */}
          <IconButton onClick={() => speakText(chapter.content.replace(/\[\[|\]\]/g, ''))}>
            <Volume2 className="w-5 h-5" />
          </IconButton>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-2">
          <ProgressBar
            value={currentChapter + 1}
            max={story.chapters.length}
            size="sm"
            variant="primary"
          />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {readerState === 'reading' && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4"
            >
              {/* Chapter title */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {showKorean ? chapter.titleKorean : chapter.title}
                </h2>
              </div>

              {/* Story content */}
              <Card className="mb-4">
                <div className="text-lg leading-relaxed text-gray-700">
                  {parsedContent.map((part, index) => (
                    part.type === 'vocab' && part.word ? (
                      <span
                        key={index}
                        onClick={() => setSelectedWord(part.word!)}
                        className="word-highlight vocabulary cursor-pointer"
                      >
                        {part.content}
                      </span>
                    ) : (
                      <span key={index}>{part.content}</span>
                    )
                  ))}
                </div>
              </Card>

              {/* Vocabulary list */}
              {chapter.vocabulary.length > 0 && (
                <Card className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-gold" />
                    <h3 className="font-bold text-gray-800">New Words</h3>
                    <span className="text-sm text-gray-400">새 단어</span>
                  </div>

                  <div className="space-y-2">
                    {chapter.vocabulary.map((word) => (
                      <button
                        key={word.word}
                        onClick={() => setSelectedWord(word)}
                        className="w-full flex items-center justify-between p-3 bg-gold/10 rounded-xl hover:bg-gold/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-800">{word.word}</span>
                          <span className="text-sm text-gray-500">{word.pronunciation}</span>
                        </div>
                        <span className="text-gray-600">{word.meaning}</span>
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Continue button */}
              <Button
                size="lg"
                fullWidth
                onClick={() => setReaderState('quiz')}
              >
                Take Quiz
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {readerState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-gray-800">Chapter Quiz</h2>
              </div>

              {/* Questions */}
              <div className="space-y-4 mb-6">
                {chapter.quiz.map((question, qIndex) => (
                  <Card key={question.id}>
                    <p className="font-bold text-gray-800 mb-1">
                      {qIndex + 1}. {question.question}
                    </p>
                    {question.questionKorean && (
                      <p className="text-sm text-gray-500 mb-3">
                        {question.questionKorean}
                      </p>
                    )}

                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => {
                        const isSelected = quizAnswers[question.id] === oIndex;
                        const isCorrect = showResults && oIndex === question.correctAnswer;
                        const isWrong = showResults && isSelected && oIndex !== question.correctAnswer;

                        return (
                          <button
                            key={oIndex}
                            onClick={() => handleQuizAnswer(question.id, oIndex)}
                            disabled={showResults}
                            className={cn(
                              'quiz-option w-full text-left',
                              isSelected && !showResults && 'selected',
                              isCorrect && 'correct',
                              isWrong && 'incorrect'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {isCorrect && <Check className="w-5 h-5 text-secondary" />}
                              {isWrong && <X className="w-5 h-5 text-red-500" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {showResults && question.explanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-3 bg-sky-light/30 rounded-xl"
                      >
                        <p className="text-sm text-gray-600">
                          <span className="font-bold text-sky-dark">Explanation: </span>
                          {question.explanation}
                        </p>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Submit / Continue button */}
              {!showResults ? (
                <Button
                  size="lg"
                  fullWidth
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < chapter.quiz.length}
                >
                  Submit Answers
                  <Check className="w-5 h-5" />
                </Button>
              ) : (
                <div>
                  {/* Score display */}
                  <Card className="mb-4 text-center">
                    <div className="text-5xl font-black text-primary mb-2">
                      {quizScore}%
                    </div>
                    <p className="text-gray-600">
                      {quizScore === 100
                        ? 'Perfect! 완벽해요! 🎉'
                        : quizScore >= 80
                        ? 'Great job! 잘했어요! 👏'
                        : quizScore >= 60
                        ? 'Good effort! 좋아요! 👍'
                        : 'Keep practicing! 연습해요! 💪'}
                    </p>
                  </Card>

                  <Button size="lg" fullWidth onClick={continueAfterQuiz}>
                    {isLastChapter ? 'Complete Story' : 'Next Chapter'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {readerState === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 flex flex-col items-center justify-center min-h-[60vh]"
            >
              <Mascot size="xl" mood="excited" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-gold" />
                  <span className="text-sm font-bold text-gold-dark uppercase">
                    Story Complete!
                  </span>
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">
                  {story.title}
                </h2>
                <p className="text-gray-500">이야기를 완료했어요!</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-xs mt-8"
              >
                <Card className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-1">XP Earned</p>
                  <p className="text-3xl font-black text-primary">+500 XP</p>
                </Card>

                <Button size="lg" fullWidth onClick={onComplete}>
                  Back to Stories
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Word popup */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/30"
            onClick={() => setSelectedWord(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-t-3xl rounded-b-xl p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-gray-800">
                    {selectedWord.word}
                  </h3>
                  <p className="text-gray-500">{selectedWord.pronunciation}</p>
                </div>
                <button
                  onClick={() => speakText(selectedWord.word)}
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <Volume2 className="w-5 h-5 text-primary" />
                </button>
              </div>

              <div className="bg-gold/10 rounded-xl p-4 mb-4">
                <p className="text-lg font-bold text-gray-800">
                  {selectedWord.meaning}
                </p>
              </div>

              {selectedWord.example && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Example</p>
                  <p className="text-gray-700">{selectedWord.example}</p>
                  {selectedWord.exampleKorean && (
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedWord.exampleKorean}
                    </p>
                  )}
                </div>
              )}

              <Button
                size="lg"
                fullWidth
                variant="outline"
                onClick={() => setSelectedWord(null)}
              >
                Got it!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
