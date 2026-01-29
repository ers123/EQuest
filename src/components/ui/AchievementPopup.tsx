import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Achievement } from '@/types';
import { X, Trophy } from 'lucide-react';

export function AchievementPopup() {
  const { achievements } = useProgressStore();
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Find newly unlocked achievements that haven't been shown
    const newAchievements = achievements.filter(
      (a) => a.unlockedAt && !shownIds.has(a.id)
    );

    if (newAchievements.length > 0 && !currentAchievement) {
      setCurrentAchievement(newAchievements[0]);
    }
  }, [achievements, shownIds, currentAchievement]);

  const handleClose = () => {
    if (currentAchievement) {
      setShownIds((prev) => new Set([...prev, currentAchievement.id]));
      setCurrentAchievement(null);
    }
  };

  return (
    <AnimatePresence>
      {currentAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-white rounded-4xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-light/50 to-transparent" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="relative z-10 text-center">
              {/* Trophy icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-4xl">{currentAchievement.icon}</span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-gold-dark" />
                  <span className="text-sm font-bold text-gold-dark uppercase tracking-wide">
                    Achievement Unlocked!
                  </span>
                </div>

                <h2 className="text-2xl font-black text-gray-800 mb-1">
                  {currentAchievement.title}
                </h2>
                <p className="text-gray-500 text-sm mb-1">
                  {currentAchievement.titleKorean}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-4 mb-6"
              >
                {currentAchievement.description}
              </motion.p>

              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleClose}
                className="w-full py-3 px-6 bg-gradient-gold text-amber-900 font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                Awesome! 🎉
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
