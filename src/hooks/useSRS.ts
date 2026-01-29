import { useCallback } from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import { SRSItem, Word } from '@/types';

// SM-2 Algorithm Constants
const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0 - Complete blackout
// 1 - Incorrect; correct answer remembered
// 2 - Incorrect; correct answer seemed easy to recall
// 3 - Correct with serious difficulty
// 4 - Correct after hesitation
// 5 - Perfect response

export function useSRS() {
  const { addSRSItem, updateSRSItem, masterWord, vocabulary } = useProgressStore();

  // Add a new word to the SRS system
  const addWord = useCallback(
    (word: Word) => {
      const now = new Date();
      const newItem: SRSItem = {
        wordId: word.word,
        word: word.word,
        meaning: word.meaning,
        easeFactor: DEFAULT_EASE_FACTOR,
        interval: 1, // First review after 1 day
        repetitions: 0,
        nextReviewDate: now.toISOString(),
      };
      addSRSItem(newItem);
    },
    [addSRSItem]
  );

  // Calculate next review based on SM-2 algorithm
  const calculateNextReview = useCallback(
    (item: SRSItem, quality: ReviewQuality): Partial<SRSItem> => {
      const now = new Date();
      let { easeFactor, interval, repetitions } = item;

      if (quality >= 3) {
        // Correct response
        if (repetitions === 0) {
          interval = 1;
        } else if (repetitions === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
      } else {
        // Incorrect response - reset
        repetitions = 0;
        interval = 1;
      }

      // Update ease factor
      easeFactor =
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      if (easeFactor < MIN_EASE_FACTOR) {
        easeFactor = MIN_EASE_FACTOR;
      }

      // Calculate next review date
      const nextReview = new Date(now);
      nextReview.setDate(nextReview.getDate() + interval);

      return {
        easeFactor,
        interval,
        repetitions,
        nextReviewDate: nextReview.toISOString(),
        lastReviewDate: now.toISOString(),
      };
    },
    []
  );

  // Process a review result
  const reviewWord = useCallback(
    (wordId: string, correct: boolean, difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
      const item = vocabulary.srsItems.find((i) => i.wordId === wordId);
      if (!item) return;

      let quality: ReviewQuality;
      if (correct) {
        quality = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 4 : 3;
      } else {
        quality = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 1 : 0;
      }

      const updates = calculateNextReview(item, quality);
      updateSRSItem(wordId, updates);

      // Check if word should be marked as mastered (5+ successful reviews with high ease factor)
      if (updates.repetitions && updates.repetitions >= 5 && updates.easeFactor && updates.easeFactor >= 2.5) {
        masterWord(wordId);
      }
    },
    [vocabulary.srsItems, calculateNextReview, updateSRSItem, masterWord]
  );

  // Get words due for review
  const getDueWords = useCallback((): SRSItem[] => {
    const today = new Date().toISOString().split('T')[0];
    return vocabulary.srsItems.filter((item) => {
      const reviewDate = item.nextReviewDate.split('T')[0];
      return reviewDate <= today && !vocabulary.masteredWords.includes(item.wordId);
    });
  }, [vocabulary.srsItems, vocabulary.masteredWords]);

  // Get learning statistics
  const getStats = useCallback(() => {
    const dueWords = getDueWords();
    const totalLearning = vocabulary.learningWords.length;
    const totalMastered = vocabulary.masteredWords.length;

    return {
      dueToday: dueWords.length,
      learning: totalLearning,
      mastered: totalMastered,
      total: totalLearning + totalMastered,
    };
  }, [getDueWords, vocabulary.learningWords, vocabulary.masteredWords]);

  return {
    addWord,
    reviewWord,
    getDueWords,
    getStats,
  };
}
