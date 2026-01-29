import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage } from '@/lib/storage';
import {
  UserProgress,
  UserStats,
  UserSettings,
  StoryProgress,
  SRSItem,
  Achievement,
  Grade,
  INITIAL_PROGRESS,
  DEFAULT_STATS,
  XP_REWARDS,
} from '@/types';
import { ACHIEVEMENTS } from '@/data/achievements';

// Calculate level from XP (100 XP per level)
const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

// Check if same day
const isSameDay = (date1: string, date2: string): boolean => {
  return date1.split('T')[0] === date2.split('T')[0];
};

// Check if consecutive days
const isConsecutiveDay = (lastDate: string, currentDate: string): boolean => {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  const diffTime = current.getTime() - last.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

interface ProgressStore extends UserProgress {
  // Initialization
  isInitialized: boolean;
  setInitialized: (name: string, grade: Grade) => void;
  resetProgress: () => void;

  // XP & Level
  addXP: (amount: number, reason?: string) => void;
  checkDailyLogin: () => void;

  // Stats
  updateStats: (updates: Partial<UserStats>) => void;
  incrementQuizCount: (correct: boolean) => void;

  // Story Progress
  updateStoryProgress: (storyId: string, progress: Partial<StoryProgress>) => void;
  completeStory: (storyId: string) => void;
  completeChapter: (storyId: string, chapterId: number, quizScore: number) => void;

  // Vocabulary
  addSRSItem: (item: SRSItem) => void;
  updateSRSItem: (wordId: string, updates: Partial<SRSItem>) => void;
  masterWord: (wordId: string) => void;
  getDueWords: () => SRSItem[];

  // Achievements
  checkAchievements: () => Achievement[];
  unlockAchievement: (achievementId: string) => void;

  // Settings
  updateSettings: (updates: Partial<UserSettings>) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_PROGRESS,
      isInitialized: false,

      // ============================================
      // Initialization
      // ============================================

      setInitialized: (name: string, grade: Grade) => {
        set({
          isInitialized: true,
          userName: name,
          grade,
          createdAt: new Date().toISOString(),
          stats: {
            ...DEFAULT_STATS,
            lastActiveDate: new Date().toISOString().split('T')[0],
          },
        });
      },

      resetProgress: () => {
        set({
          ...INITIAL_PROGRESS,
          isInitialized: false,
        });
      },

      // ============================================
      // XP & Level
      // ============================================

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.stats.totalXP + amount;
          const newLevel = calculateLevel(newXP);
          return {
            stats: {
              ...state.stats,
              totalXP: newXP,
              level: newLevel,
            },
          };
        });

        // Check achievements after XP update
        get().checkAchievements();
      },

      checkDailyLogin: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const lastActive = state.stats.lastActiveDate;

        if (isSameDay(lastActive, today)) {
          return; // Already logged in today
        }

        let newStreak = 1;
        if (isConsecutiveDay(lastActive, today)) {
          newStreak = state.stats.currentStreak + 1;
        }

        const longestStreak = Math.max(newStreak, state.stats.longestStreak);

        set((state) => ({
          stats: {
            ...state.stats,
            lastActiveDate: today,
            currentStreak: newStreak,
            longestStreak,
          },
        }));

        // Award daily login XP + streak bonus
        const streakBonus = newStreak > 1 ? XP_REWARDS.STREAK_BONUS * newStreak : 0;
        get().addXP(XP_REWARDS.DAILY_LOGIN + streakBonus);
      },

      // ============================================
      // Stats
      // ============================================

      updateStats: (updates: Partial<UserStats>) => {
        set((state) => ({
          stats: { ...state.stats, ...updates },
        }));
      },

      incrementQuizCount: (correct: boolean) => {
        set((state) => ({
          stats: {
            ...state.stats,
            totalQuizzes: state.stats.totalQuizzes + 1,
            correctAnswers: state.stats.correctAnswers + (correct ? 1 : 0),
          },
        }));

        if (correct) {
          get().addXP(XP_REWARDS.QUIZ_CORRECT);
        }
      },

      // ============================================
      // Story Progress
      // ============================================

      updateStoryProgress: (storyId: string, progress: Partial<StoryProgress>) => {
        set((state) => {
          const existing = state.stories[storyId] || {
            storyId,
            currentChapter: 0,
            completedChapters: [],
            quizScores: {},
            completed: false,
          };
          return {
            stories: {
              ...state.stories,
              [storyId]: {
                ...existing,
                ...progress,
              },
            },
          };
        });
      },

      completeChapter: (storyId: string, chapterIndex: number, quizScore: number) => {
        set((state) => {
          const current = state.stories[storyId] || {
            storyId,
            currentChapter: 0,
            completedChapters: [],
            quizScores: {},
            completed: false,
          };

          const completedChapters = current.completedChapters.includes(chapterIndex)
            ? current.completedChapters
            : [...current.completedChapters, chapterIndex];

          return {
            stories: {
              ...state.stories,
              [storyId]: {
                ...current,
                currentChapter: chapterIndex + 1,
                completedChapters,
                quizScores: {
                  ...current.quizScores,
                  [`chapter-${chapterIndex}`]: quizScore,
                },
              },
            },
          };
        });

        // Award XP
        get().addXP(XP_REWARDS.CHAPTER_COMPLETE);
        if (quizScore === 100) {
          get().addXP(XP_REWARDS.QUIZ_PERFECT);
        }
      },

      completeStory: (storyId: string) => {
        set((state) => ({
          stories: {
            ...state.stories,
            [storyId]: {
              ...state.stories[storyId],
              completed: true,
              completedAt: new Date().toISOString(),
            },
          },
          stats: {
            ...state.stats,
            totalStoriesRead: state.stats.totalStoriesRead + 1,
          },
        }));

        get().addXP(XP_REWARDS.STORY_COMPLETE);
        get().checkAchievements();
      },

      // ============================================
      // Vocabulary SRS
      // ============================================

      addSRSItem: (item: SRSItem) => {
        set((state) => {
          // Check if already exists
          if (state.vocabulary.srsItems.some((i) => i.wordId === item.wordId)) {
            return state;
          }
          return {
            vocabulary: {
              ...state.vocabulary,
              srsItems: [...state.vocabulary.srsItems, item],
              learningWords: [...state.vocabulary.learningWords, item.wordId],
              totalLearned: state.vocabulary.totalLearned + 1,
            },
            stats: {
              ...state.stats,
              totalWordsLearned: state.stats.totalWordsLearned + 1,
            },
          };
        });
      },

      updateSRSItem: (wordId: string, updates: Partial<SRSItem>) => {
        set((state) => ({
          vocabulary: {
            ...state.vocabulary,
            srsItems: state.vocabulary.srsItems.map((item) =>
              item.wordId === wordId ? { ...item, ...updates } : item
            ),
          },
        }));
      },

      masterWord: (wordId: string) => {
        set((state) => ({
          vocabulary: {
            ...state.vocabulary,
            masteredWords: [...state.vocabulary.masteredWords, wordId],
            learningWords: state.vocabulary.learningWords.filter((id) => id !== wordId),
            totalMastered: state.vocabulary.totalMastered + 1,
          },
        }));

        get().addXP(XP_REWARDS.WORD_MASTER);
        get().checkAchievements();
      },

      getDueWords: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];

        return state.vocabulary.srsItems.filter((item) => {
          const reviewDate = item.nextReviewDate.split('T')[0];
          return reviewDate <= today;
        });
      },

      // ============================================
      // Achievements
      // ============================================

      checkAchievements: () => {
        const state = get();
        const newAchievements: Achievement[] = [];

        ACHIEVEMENTS.forEach((achievement) => {
          // Skip if already unlocked
          if (state.unlockedAchievements.includes(achievement.id)) {
            return;
          }

          let isUnlocked = false;

          switch (achievement.category) {
            case 'streak':
              isUnlocked = state.stats.currentStreak >= achievement.requirement;
              break;
            case 'vocabulary':
              isUnlocked = state.vocabulary.totalMastered >= achievement.requirement;
              break;
            case 'story':
              isUnlocked = state.stats.totalStoriesRead >= achievement.requirement;
              break;
            case 'accuracy':
              const accuracy =
                state.stats.totalQuizzes > 0
                  ? (state.stats.correctAnswers / state.stats.totalQuizzes) * 100
                  : 0;
              isUnlocked =
                accuracy >= achievement.requirement && state.stats.totalQuizzes >= 10;
              break;
          }

          if (isUnlocked) {
            const unlockedAchievement = {
              ...achievement,
              unlockedAt: new Date().toISOString(),
            };
            newAchievements.push(unlockedAchievement);
            get().unlockAchievement(achievement.id);
          }
        });

        return newAchievements;
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          unlockedAchievements: [...state.unlockedAchievements, achievementId],
          achievements: [
            ...state.achievements,
            {
              ...ACHIEVEMENTS.find((a) => a.id === achievementId)!,
              unlockedAt: new Date().toISOString(),
            },
          ],
        }));
      },

      // ============================================
      // Settings
      // ============================================

      updateSettings: (updates: Partial<UserSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },
    }),
    {
      name: 'equest-progress',
      storage: createJSONStorage(() => safeStorage),
      version: 1,
    }
  )
);
