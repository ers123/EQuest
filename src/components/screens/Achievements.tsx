import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { ACHIEVEMENTS } from '@/data/achievements';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Mascot } from '@/components/ui/Mascot';
import {
  ArrowLeft,
  Trophy,
  Lock,
  Check,
  Flame,
  BookOpen,
  Star,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsProps {
  onBack: () => void;
}

const categoryIcons = {
  streak: Flame,
  vocabulary: BookOpen,
  story: Star,
  accuracy: Target,
  special: Trophy,
};

const categoryColors = {
  streak: 'from-orange-400 to-red-500',
  vocabulary: 'from-emerald-400 to-green-500',
  story: 'from-amber-400 to-yellow-500',
  accuracy: 'from-violet-400 to-purple-500',
  special: 'from-sky-400 to-blue-500',
};

export function Achievements({ onBack }: AchievementsProps) {
  const { unlockedAchievements, stats, vocabulary } = useProgressStore();

  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;

  // Group achievements by category
  const groupedAchievements = ACHIEVEMENTS.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof ACHIEVEMENTS>);

  // Get progress towards an achievement
  const getProgress = (achievement: typeof ACHIEVEMENTS[0]) => {
    switch (achievement.category) {
      case 'streak':
        return {
          current: stats.currentStreak,
          target: achievement.requirement,
        };
      case 'vocabulary':
        return {
          current: vocabulary.totalMastered,
          target: achievement.requirement,
        };
      case 'story':
        return {
          current: stats.totalStoriesRead,
          target: achievement.requirement,
        };
      case 'accuracy':
        const accuracy =
          stats.totalQuizzes > 0
            ? Math.round((stats.correctAnswers / stats.totalQuizzes) * 100)
            : 0;
        return {
          current: accuracy,
          target: achievement.requirement,
        };
      default:
        return { current: 0, target: achievement.requirement };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-8"
    >
      {/* Header */}
      <header className="bg-gradient-gold px-5 pt-safe-top pb-8 rounded-b-[40px] shadow-lg">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <IconButton onClick={onBack} variant="ghost" className="text-amber-900 hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </IconButton>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-amber-900">Achievements</h1>
            <p className="text-xs text-amber-800">업적</p>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 bg-white/30 rounded-full">
            <Trophy className="w-4 h-4 text-amber-900" />
            <span className="text-amber-900 font-bold text-sm">
              {unlockedCount}/{totalCount}
            </span>
          </div>
        </div>

        {/* Progress overview */}
        <div className="bg-white/30 rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8 text-gold-dark" />
            </div>
            <div className="flex-1">
              <p className="text-amber-900 font-bold">
                {unlockedCount} of {totalCount} unlocked
              </p>
              <p className="text-amber-800 text-sm mb-2">
                {totalCount - unlockedCount} more to go!
              </p>
              <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="px-5 -mt-4">
        {/* Mascot */}
        <Card className="mb-6 flex items-center gap-4">
          <Mascot size="sm" mood="excited" animate={false} />
          <div>
            <h3 className="font-bold text-gray-800">
              {unlockedCount > 0 ? 'Keep collecting!' : 'Start your collection!'}
            </h3>
            <p className="text-sm text-gray-500">
              업적을 모아보세요!
            </p>
          </div>
        </Card>

        {/* Achievement categories */}
        {Object.entries(groupedAchievements).map(([category, achievements]) => {
          const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons] || Trophy;

          return (
            <div key={category} className="mb-6">
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center',
                    categoryColors[category as keyof typeof categoryColors]
                  )}
                >
                  <CategoryIcon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 capitalize">
                  {category}
                </h2>
                <span className="text-sm text-gray-400">
                  ({achievements.filter((a) => unlockedAchievements.includes(a.id)).length}/
                  {achievements.length})
                </span>
              </div>

              {/* Achievement list */}
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const isUnlocked = unlockedAchievements.includes(achievement.id);
                  const progress = getProgress(achievement);

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={cn(
                          'relative overflow-hidden',
                          isUnlocked && 'bg-gold/5 border border-gold/20'
                        )}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className={cn(
                              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                              isUnlocked
                                ? 'bg-gradient-gold shadow-lg'
                                : 'bg-gray-100'
                            )}
                          >
                            {isUnlocked ? (
                              <span className="text-2xl">{achievement.icon}</span>
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3
                                className={cn(
                                  'font-bold truncate',
                                  isUnlocked ? 'text-gray-800' : 'text-gray-500'
                                )}
                              >
                                {achievement.title}
                              </h3>
                              {isUnlocked && (
                                <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-400 truncate">
                              {achievement.titleKorean}
                            </p>
                            <p
                              className={cn(
                                'text-sm mt-1',
                                isUnlocked ? 'text-gray-600' : 'text-gray-400'
                              )}
                            >
                              {achievement.description}
                            </p>

                            {/* Progress bar (only show if not unlocked) */}
                            {!isUnlocked && (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                  <span>Progress</span>
                                  <span>
                                    {progress.current}/{progress.target}
                                  </span>
                                </div>
                                <ProgressBar
                                  value={progress.current}
                                  max={progress.target}
                                  size="sm"
                                  variant="gold"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Unlocked decoration */}
                        {isUnlocked && (
                          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                            <div className="absolute top-2 right-[-20px] w-20 bg-secondary text-white text-xs font-bold py-1 text-center transform rotate-45">
                              Done!
                            </div>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
