import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { LEVEL_TIERS } from '@/types';

interface LevelUpPopupProps {
  isOpen: boolean;
  level: number;
  onClose: () => void;
}

export function LevelUpPopup({ isOpen, level, onClose }: LevelUpPopupProps) {
  const tier = LEVEL_TIERS.find((t) => level >= t.min && level <= t.max) || LEVEL_TIERS[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', damping: 12 }}
            className="bg-white rounded-4xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background stars */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    delay: i * 0.15,
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                >
                  <Sparkles
                    className="w-6 h-6 text-gold"
                    style={{ transform: `rotate(${Math.random() * 360}deg)` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Level badge */}
              <motion.div
                initial={{ scale: 0, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', damping: 8 }}
                className="relative inline-block mb-6"
              >
                <div className="w-28 h-28 bg-gradient-accent rounded-full flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <span className="block text-white/80 text-xs font-bold uppercase">
                      Level
                    </span>
                    <span className="block text-white text-4xl font-black">
                      {level}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-gold/50"
                />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="text-sm font-bold text-accent uppercase tracking-wide">
                    Level Up!
                  </span>
                  <Star className="w-5 h-5 text-gold fill-gold" />
                </div>

                <h2 className="text-2xl font-black text-gray-800 mb-1">
                  {tier.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {tier.nameKorean}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 mt-4 mb-6"
              >
                You're doing amazing! Keep learning!
              </motion.p>

              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
                className="w-full py-3 px-6 bg-gradient-accent text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                Continue 🚀
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
