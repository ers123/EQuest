import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Screen, LEARNING_MODES, LEVEL_TIERS } from '@/types';
import { Card } from '@/components/ui/Card';
import { Mascot } from '@/components/ui/Mascot';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import {
  Flame,
  Star,
  Trophy,
  Zap,
  Lock,
  ChevronRight,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  onStartStory: () => void;
  onStartVocab: () => void;
}

export function Home({ onNavigate, onStartStory, onStartVocab }: HomeProps) {
  const { userName, stats } = useProgressStore();

  const currentTier =
    LEVEL_TIERS.find((t) => stats.level >= t.min && stats.level <= t.max) ||
    LEVEL_TIERS[0];

  // XP needed for next level
  const xpForCurrentLevel = (stats.level - 1) * 100;
  const xpForNextLevel = stats.level * 100;
  const xpProgress = stats.totalXP - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background pb-24"
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className="bg-gradient-primary px-5 pt-safe-top pb-8 rounded-b-[40px] shadow-lg"
      >
        <div className="flex items-center justify-between mb-4 pt-4">
          {/* User greeting */}
          <div>
            <p className="text-white/80 text-sm font-medium">Welcome back,</p>
            <h1 className="text-white text-2xl font-black">{userName}! 👋</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('stats')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('achievements')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Trophy className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
            <Flame className="w-4 h-4 text-gold" />
            <span className="text-white font-bold text-sm">
              {stats.currentStreak} day{stats.currentStreak !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Level */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-white font-bold text-sm">Lv.{stats.level}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-white font-bold text-sm">{stats.totalXP} XP</span>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="px-5 -mt-4">
        {/* Level Progress Card */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <Mascot size="lg" animate={false} />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">{stats.level}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{currentTier.name}</h3>
                <p className="text-sm text-gray-500">{currentTier.nameKorean}</p>
              </div>
            </div>

            <ProgressBar
              value={xpProgress}
              max={xpNeeded}
              variant="accent"
              size="md"
            />
            <p className="text-xs text-gray-400 mt-2 text-right">
              {xpProgress}/{xpNeeded} XP to Level {stats.level + 1}
            </p>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStartStory}
            className="flex-col h-auto py-5"
          >
            <span className="text-3xl mb-1">📚</span>
            <span className="text-sm">Read Stories</span>
            <span className="text-xs opacity-80">스토리 읽기</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onStartVocab}
            className="flex-col h-auto py-5"
          >
            <span className="text-3xl mb-1">🎯</span>
            <span className="text-sm">Learn Words</span>
            <span className="text-xs opacity-80">단어 학습</span>
          </Button>
        </motion.div>

        {/* Learning Modes */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Learning Modes</h2>
            <span className="text-sm text-gray-400">학습 모드</span>
          </div>

          <div className="space-y-3">
            {LEARNING_MODES.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  padding="none"
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    mode.available
                      ? 'cursor-pointer hover:shadow-card-hover active:scale-98'
                      : 'opacity-70'
                  )}
                  onClick={() => {
                    if (mode.available) {
                      if (mode.id === 'story') onStartStory();
                      else if (mode.id === 'vocab') onStartVocab();
                      else onNavigate(mode.screen);
                    }
                  }}
                >
                  <div className="flex items-center p-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center mr-4 bg-gradient-to-br shadow-lg',
                        mode.gradient
                      )}
                    >
                      <span className="text-2xl">{mode.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800 truncate">
                          {mode.name}
                        </h3>
                        {mode.comingSoon && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                            Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {mode.description}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {mode.descriptionKorean}
                      </p>
                    </div>

                    {/* Arrow or Lock */}
                    <div className="ml-2">
                      {mode.available ? (
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mascot greeting */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center"
        >
          <div className="relative">
            <Mascot size="md" mood="happy" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 bg-white rounded-full px-3 py-1 shadow-lg"
            >
              <span className="text-sm font-bold text-primary">Let's go!</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
