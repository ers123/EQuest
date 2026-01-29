import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Grade } from '@/types';
import { Button } from '@/components/ui/Button';
import { Mascot, MascotWithSpeech } from '@/components/ui/Mascot';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingProps {
  onComplete: () => void;
}

type Step = 'welcome' | 'name' | 'grade' | 'ready';

const gradeOptions: { grade: Grade; label: string; labelKorean: string; emoji: string }[] = [
  { grade: 4, label: '4th Grade', labelKorean: '4학년', emoji: '🌟' },
  { grade: 5, label: '5th Grade', labelKorean: '5학년', emoji: '⭐' },
  { grade: 6, label: '6th Grade', labelKorean: '6학년', emoji: '🌠' },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const { setInitialized } = useProgressStore();
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  const handleNameSubmit = () => {
    if (name.trim().length >= 2) {
      setStep('grade');
    }
  };

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    setStep('ready');
  };

  const handleComplete = () => {
    if (name && selectedGrade) {
      setInitialized(name.trim(), selectedGrade);
      onComplete();
    }
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-background to-primary-50 flex flex-col"
    >
      {/* Header decoration */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-primary opacity-10 rounded-b-[60px]" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 safe-top safe-bottom">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center max-w-md w-full"
            >
              {/* Mascot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                className="mb-6"
              >
                <Mascot size="xl" mood="excited" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-black text-gray-800 mb-2"
              >
                Welcome to{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  EQuest!
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-lg mb-2"
              >
                Your English Adventure Begins Here
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 mb-8"
              >
                영어 모험을 시작해요!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  size="xl"
                  fullWidth
                  onClick={() => setStep('name')}
                >
                  <Sparkles className="w-5 h-5" />
                  Start Adventure
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 'name' && (
            <motion.div
              key="name"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center max-w-md w-full"
            >
              {/* Mascot with speech bubble */}
              <div className="flex justify-center mb-8">
                <MascotWithSpeech
                  size="lg"
                  mood="happy"
                  message="What's your name? 이름이 뭐예요?"
                  bubblePosition="right"
                />
              </div>

              {/* Name input */}
              <div className="mb-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="Enter your name..."
                  className={cn(
                    'w-full px-6 py-4 text-xl text-center font-bold',
                    'bg-white rounded-2xl shadow-card',
                    'border-2 border-gray-100 focus:border-primary focus:outline-none',
                    'transition-all duration-200'
                  )}
                  autoFocus
                  maxLength={20}
                />
                <p className="text-gray-400 text-sm mt-2">
                  2-20 characters
                </p>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={handleNameSubmit}
                disabled={name.trim().length < 2}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {step === 'grade' && (
            <motion.div
              key="grade"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center max-w-md w-full"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Mascot size="md" mood="thinking" />
                <h2 className="text-2xl font-black text-gray-800 mt-4 mb-1">
                  Hi, {name}! 👋
                </h2>
                <p className="text-gray-500">
                  What grade are you in?
                </p>
                <p className="text-gray-400 text-sm">
                  몇 학년이에요?
                </p>
              </motion.div>

              {/* Grade options */}
              <div className="space-y-3 mb-6">
                {gradeOptions.map((option, index) => (
                  <motion.button
                    key={option.grade}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handleGradeSelect(option.grade)}
                    className={cn(
                      'w-full p-4 rounded-2xl bg-white shadow-card',
                      'border-2 border-gray-100',
                      'flex items-center justify-between',
                      'transition-all duration-200',
                      'hover:border-primary hover:shadow-card-hover',
                      'active:scale-98'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <div className="text-left">
                        <p className="font-bold text-gray-800">{option.label}</p>
                        <p className="text-sm text-gray-400">{option.labelKorean}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'ready' && (
            <motion.div
              key="ready"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center max-w-md w-full"
            >
              {/* Celebration */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 8 }}
                className="mb-6"
              >
                <Mascot size="xl" mood="waving" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-black text-gray-800 mb-2">
                  You're All Set! 🎉
                </h2>
                <p className="text-gray-500 text-lg mb-1">
                  준비 완료!
                </p>
              </motion.div>

              {/* Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-card mb-8 mt-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-800 text-lg">{name}</p>
                    <p className="text-gray-500">
                      {gradeOptions.find((g) => g.grade === selectedGrade)?.label}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="xl"
                  fullWidth
                  onClick={handleComplete}
                >
                  <Sparkles className="w-5 h-5" />
                  Begin Your Quest!
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center gap-2 pb-8">
        {['welcome', 'name', 'grade', 'ready'].map((s, i) => (
          <div
            key={s}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              step === s
                ? 'w-6 bg-primary'
                : ['welcome', 'name', 'grade', 'ready'].indexOf(step) > i
                ? 'bg-primary/50'
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}
