import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { LEVEL_TIERS } from '@/types';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/Button';
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar';
import { Mascot } from '@/components/ui/Mascot';
import {
  ArrowLeft,
  Flame,
  Zap,
  Target,
  BookOpen,
  Star,
  TrendingUp,
} from 'lucide-react';

interface StatsProps {
  onBack: () => void;
}

export function Stats({ onBack }: StatsProps) {
  const { userName, stats, vocabulary } = useProgressStore();

  const currentTier =
    LEVEL_TIERS.find((t) => stats.level >= t.min && stats.level <= t.max) ||
    LEVEL_TIERS[0];

  const accuracy =
    stats.totalQuizzes > 0
      ? Math.round((stats.correctAnswers / stats.totalQuizzes) * 100)
      : 0;

  const xpForCurrentLevel = (stats.level - 1) * 100;
  const xpForNextLevel = stats.level * 100;
  const xpProgress = stats.totalXP - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;

  const statItems = [
    {
      icon: Flame,
      label: 'Current Streak',
      labelKorean: '현재 연속 일수',
      value: stats.currentStreak,
      suffix: 'days',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: TrendingUp,
      label: 'Longest Streak',
      labelKorean: '최장 연속 일수',
      value: stats.longestStreak,
      suffix: 'days',
      color: 'text-gold-dark',
      bgColor: 'bg-gold/10',
    },
    {
      icon: Zap,
      label: 'Total XP',
      labelKorean: '총 경험치',
      value: stats.totalXP,
      suffix: 'XP',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Target,
      label: 'Quiz Accuracy',
      labelKorean: '퀴즈 정확도',
      value: accuracy,
      suffix: '%',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: BookOpen,
      label: 'Stories Read',
      labelKorean: '읽은 이야기',
      value: stats.totalStoriesRead,
      suffix: '',
      color: 'text-sky-dark',
      bgColor: 'bg-sky/10',
    },
    {
      icon: Star,
      label: 'Words Learned',
      labelKorean: '배운 단어',
      value: stats.totalWordsLearned,
      suffix: '',
      color: 'text-gold-dark',
      bgColor: 'bg-gold/10',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-8"
    >
      {/* Header */}
      <header className="bg-gradient-accent px-5 pt-safe-top pb-8 rounded-b-[40px] shadow-lg">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <IconButton onClick={onBack} variant="ghost" className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </IconButton>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Your Stats</h1>
            <p className="text-xs text-white/80">나의 통계</p>
          </div>
        </div>

        {/* Level card */}
        <div className="bg-white/20 rounded-3xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-accent">{stats.level}</span>
            </div>

            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">{currentTier.name}</h2>
              <p className="text-white/80 text-sm">{currentTier.nameKorean}</p>

              <div className="mt-2">
                <div className="flex justify-between text-xs text-white/80 mb-1">
                  <span>Level {stats.level}</span>
                  <span>Level {stats.level + 1}</span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(xpProgress / xpNeeded) * 100}%` }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
                <p className="text-xs text-white/60 mt-1">
                  {xpProgress} / {xpNeeded} XP
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="px-5 -mt-4">
        {/* Mascot greeting */}
        <Card className="mb-6 flex items-center gap-4">
          <Mascot size="md" mood="happy" animate={false} />
          <div>
            <h3 className="font-bold text-gray-800">
              Great progress, {userName}!
            </h3>
            <p className="text-sm text-gray-500">
              {stats.currentStreak > 0
                ? `${stats.currentStreak} day streak! Keep it up!`
                : 'Start a streak today!'}
            </p>
          </div>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full">
                <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="text-2xl font-black text-gray-800">
                  {item.value}
                  <span className="text-sm font-normal text-gray-400 ml-1">
                    {item.suffix}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                <p className="text-xs text-gray-400">{item.labelKorean}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Vocabulary progress */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Vocabulary Progress</h3>
              <p className="text-sm text-gray-500">단어 학습 현황</p>
            </div>
            <CircularProgress
              value={vocabulary.totalMastered}
              max={Math.max(vocabulary.totalLearned, 1)}
              size={60}
              variant="gold"
            />
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Learning</span>
                <span className="font-bold text-sky">{vocabulary.learningWords.length}</span>
              </div>
              <ProgressBar
                value={vocabulary.learningWords.length}
                max={vocabulary.totalLearned || 1}
                variant="sky"
                size="sm"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Mastered</span>
                <span className="font-bold text-gold-dark">{vocabulary.totalMastered}</span>
              </div>
              <ProgressBar
                value={vocabulary.totalMastered}
                max={vocabulary.totalLearned || 1}
                variant="gold"
                size="sm"
              />
            </div>
          </div>
        </Card>

        {/* Quiz performance */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Quiz Performance</h3>
              <p className="text-sm text-gray-500">퀴즈 성과</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-secondary">{accuracy}%</div>
              <p className="text-xs text-gray-400">accuracy</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-gray-100">
            <span className="text-gray-600">Total quizzes</span>
            <span className="font-bold text-gray-800">{stats.totalQuizzes}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-gray-100">
            <span className="text-gray-600">Correct answers</span>
            <span className="font-bold text-secondary">{stats.correctAnswers}</span>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
