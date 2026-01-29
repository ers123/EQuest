// ============================================
// EQuest Type Definitions
// ============================================

// User Level (1-5, based on US Grade system)
// Level 1 = US 3rd Grade (Basic)
// Level 2 = US 4th Grade (Elementary)
// Level 3 = US 5th Grade (Intermediate)
// Level 4 = US 6th Grade (Advanced)
// Level 5 = US 7th Grade (Challenge)
export type Level = 1 | 2 | 3 | 4 | 5;

// Legacy Grade type for migration support
export type Grade = 4 | 5 | 6;

// App Navigation Screens
export type Screen =
  | 'onboarding'
  | 'home'
  | 'story-list'
  | 'story-reader'
  | 'vocab-list'
  | 'vocab-quiz'
  | 'grammar'
  | 'listen'
  | 'speak'
  | 'ai-tutor'
  | 'stats'
  | 'achievements'
  | 'settings';

// ============================================
// Story Types
// ============================================

export interface Word {
  word: string;
  pronunciation: string;
  meaning: string;        // Korean meaning
  example: string;        // Example sentence
  exampleKorean?: string; // Korean translation of example
  level: Level;           // Difficulty level (1-5)
  topic: string;          // Category: animals, emotions, travel, etc.
  audioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'match';
  question: string;
  questionKorean?: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  explanationKorean?: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  titleKorean: string;
  content: string;        // Marked content with vocabulary words: [[word]]
  contentKorean: string;
  vocabulary: Word[];
  quiz: QuizQuestion[];
  imageUrl?: string;
}

export interface Story {
  id: string;
  title: string;
  titleKorean: string;
  author: string;
  collection: 'aesop' | 'grimm' | 'andersen' | 'world' | 'classic' | 'science';
  level: Level;           // Difficulty level (1-5)
  description: string;
  descriptionKorean: string;
  chapters: StoryChapter[];
  coverImage?: string;
  estimatedMinutes: number;
  totalWords: number;
}

// ============================================
// Vocabulary SRS Types
// ============================================

export interface SRSItem {
  wordId: string;
  word: string;
  meaning: string;
  easeFactor: number;     // Starting at 2.5
  interval: number;       // Days until next review
  repetitions: number;    // Number of successful reviews
  nextReviewDate: string; // ISO date string
  lastReviewDate?: string;
}

export type VocabQuizType =
  | 'en-to-ko'      // English to Korean
  | 'ko-to-en'      // Korean to English
  | 'listen'        // Listen and select
  | 'image-match'   // Match with image
  | 'fill-blank';   // Fill in the blank

// ============================================
// Progress Types
// ============================================

export interface StoryProgress {
  storyId: string;
  currentChapter: number;
  completedChapters: number[];
  quizScores: Record<string, number>;
  completed: boolean;
  completedAt?: string;
}

export interface VocabularyProgress {
  totalLearned: number;
  totalMastered: number;
  srsItems: SRSItem[];
  masteredWords: string[];     // Word IDs
  learningWords: string[];     // Currently learning
}

export interface Achievement {
  id: string;
  title: string;
  titleKorean: string;
  description: string;
  descriptionKorean: string;
  icon: string;           // Emoji or icon name
  category: 'streak' | 'vocabulary' | 'story' | 'accuracy' | 'special';
  requirement: number;
  unlockedAt?: string;
}

export interface UserStats {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalQuizzes: number;
  correctAnswers: number;
  totalStoriesRead: number;
  totalWordsLearned: number;
  totalStudyMinutes: number;
}

// ============================================
// User Progress (localStorage)
// ============================================

export interface UserProgress {
  version: number;          // For migrations
  userName: string;
  level: Level;             // User's selected level (1-5)
  createdAt: string;

  // Stats & XP
  stats: UserStats;

  // Story Progress
  stories: Record<string, StoryProgress>;

  // Vocabulary Progress
  vocabulary: VocabularyProgress;

  // Achievements
  achievements: Achievement[];
  unlockedAchievements: string[];  // Achievement IDs

  // Settings
  settings: UserSettings;
}

export interface UserSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  showKoreanByDefault: boolean;
  autoPlayAudio: boolean;
  theme: 'default' | 'dark' | 'forest' | 'ocean';
  fontSize: 'small' | 'medium' | 'large';
}

// ============================================
// XP System
// ============================================

export const XP_REWARDS = {
  QUIZ_CORRECT: 10,
  QUIZ_PERFECT: 50,
  CHAPTER_COMPLETE: 100,
  STORY_COMPLETE: 500,
  DAILY_LOGIN: 20,
  STREAK_BONUS: 10,      // Per day
  WORD_MASTER: 25,
} as const;

export const LEVEL_TIERS = [
  { min: 1, max: 10, name: 'Beginner Explorer', nameKorean: '초보 탐험가' },
  { min: 11, max: 20, name: 'Word Adventurer', nameKorean: '단어 모험가' },
  { min: 21, max: 30, name: 'Story Seeker', nameKorean: '이야기 탐험가' },
  { min: 31, max: 40, name: 'Grammar Guardian', nameKorean: '문법 수호자' },
  { min: 41, max: 50, name: 'English Champion', nameKorean: '영어 챔피언' },
] as const;

// ============================================
// AI Tutor Types
// ============================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AITutorSession {
  id: string;
  messages: ChatMessage[];
  topic?: string;
  createdAt: string;
}

// ============================================
// Learning Mode Types
// ============================================

export interface LearningMode {
  id: string;
  name: string;
  nameKorean: string;
  description: string;
  descriptionKorean: string;
  icon: string;
  color: string;
  gradient: string;
  screen: Screen;
  available: boolean;
  comingSoon?: boolean;
}

export const LEARNING_MODES: LearningMode[] = [
  {
    id: 'story',
    name: 'Story Quest',
    nameKorean: '스토리 퀘스트',
    description: 'Read fun stories and learn new words',
    descriptionKorean: '재미있는 이야기를 읽고 새 단어를 배워요',
    icon: '📚',
    color: 'primary',
    gradient: 'from-orange-400 to-amber-500',
    screen: 'story-list',
    available: true,
  },
  {
    id: 'vocab',
    name: 'Word Quest',
    nameKorean: '단어 퀘스트',
    description: 'Master vocabulary with flashcards',
    descriptionKorean: '플래시카드로 단어를 마스터해요',
    icon: '🎯',
    color: 'secondary',
    gradient: 'from-emerald-400 to-green-500',
    screen: 'vocab-list',
    available: true,
  },
  {
    id: 'grammar',
    name: 'Grammar Quest',
    nameKorean: '문법 퀘스트',
    description: 'Learn English grammar rules',
    descriptionKorean: '영어 문법 규칙을 배워요',
    icon: '📝',
    color: 'accent',
    gradient: 'from-violet-400 to-purple-500',
    screen: 'grammar',
    available: false,
    comingSoon: true,
  },
  {
    id: 'listen',
    name: 'Listen Quest',
    nameKorean: '듣기 퀘스트',
    description: 'Improve your listening skills',
    descriptionKorean: '듣기 실력을 향상시켜요',
    icon: '🎧',
    color: 'sky',
    gradient: 'from-sky-400 to-blue-500',
    screen: 'listen',
    available: false,
    comingSoon: true,
  },
  {
    id: 'speak',
    name: 'Speak Quest',
    nameKorean: '말하기 퀘스트',
    description: 'Practice pronunciation',
    descriptionKorean: '발음을 연습해요',
    icon: '🎤',
    color: 'gold',
    gradient: 'from-amber-400 to-yellow-500',
    screen: 'speak',
    available: false,
    comingSoon: true,
  },
  {
    id: 'ai-tutor',
    name: 'Adventure Mode',
    nameKorean: '모험 모드',
    description: 'Chat with Eddie the Fox!',
    descriptionKorean: '여우 에디와 대화해요!',
    icon: '🦊',
    color: 'primary',
    gradient: 'from-orange-400 to-red-500',
    screen: 'ai-tutor',
    available: false,
    comingSoon: true,
  },
];

// ============================================
// Level System
// ============================================

export interface LevelInfo {
  level: Level;
  usGrade: string;
  name: string;
  nameKorean: string;
  description: string;
  descriptionKorean: string;
  emoji: string;
  wordsPerChapter: string;
  chapters: string;
  totalWords: string;
  estimatedTime: string;
}

export const LEVEL_INFO: LevelInfo[] = [
  {
    level: 1,
    usGrade: '3rd Grade',
    name: 'Basic',
    nameKorean: '기초',
    description: 'Simple words and short sentences',
    descriptionKorean: '간단한 단어와 짧은 문장',
    emoji: '🌱',
    wordsPerChapter: '150-200',
    chapters: '3-4',
    totalWords: '500-800',
    estimatedTime: '10-15 min',
  },
  {
    level: 2,
    usGrade: '4th Grade',
    name: 'Elementary',
    nameKorean: '초급',
    description: 'Basic vocabulary and easy stories',
    descriptionKorean: '기본 단어와 쉬운 이야기',
    emoji: '🌟',
    wordsPerChapter: '200-300',
    chapters: '4-5',
    totalWords: '800-1,500',
    estimatedTime: '15-25 min',
  },
  {
    level: 3,
    usGrade: '5th Grade',
    name: 'Intermediate',
    nameKorean: '중급',
    description: 'Expanded vocabulary and longer stories',
    descriptionKorean: '확장된 단어와 긴 이야기',
    emoji: '⭐',
    wordsPerChapter: '300-400',
    chapters: '5-6',
    totalWords: '1,500-2,400',
    estimatedTime: '25-35 min',
  },
  {
    level: 4,
    usGrade: '6th Grade',
    name: 'Advanced',
    nameKorean: '고급',
    description: 'Complex sentences and rich vocabulary',
    descriptionKorean: '복잡한 문장과 풍부한 단어',
    emoji: '🌠',
    wordsPerChapter: '400-500',
    chapters: '6-7',
    totalWords: '2,400-3,500',
    estimatedTime: '35-45 min',
  },
  {
    level: 5,
    usGrade: '7th Grade',
    name: 'Challenge',
    nameKorean: '심화',
    description: 'Advanced reading and comprehension',
    descriptionKorean: '심화 읽기와 이해',
    emoji: '🏆',
    wordsPerChapter: '500+',
    chapters: '7+',
    totalWords: '3,500+',
    estimatedTime: '45+ min',
  },
];

// Migration utility: Convert old Grade (4/5/6) to new Level (1-5)
export function gradeToLevel(grade: Grade): Level {
  switch (grade) {
    case 4: return 2;  // Grade 4 → Level 2 (US 4th Grade)
    case 5: return 3;  // Grade 5 → Level 3 (US 5th Grade)
    case 6: return 4;  // Grade 6 → Level 4 (US 6th Grade)
    default: return 2;
  }
}

// ============================================
// Default Values
// ============================================

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  vibrationEnabled: true,
  showKoreanByDefault: false,
  autoPlayAudio: false,
  theme: 'default',
  fontSize: 'medium',
};

export const DEFAULT_STATS: UserStats = {
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalQuizzes: 0,
  correctAnswers: 0,
  totalStoriesRead: 0,
  totalWordsLearned: 0,
  totalStudyMinutes: 0,
};

export const INITIAL_PROGRESS: UserProgress = {
  version: 2,
  userName: '',
  level: 1,
  createdAt: new Date().toISOString(),
  stats: DEFAULT_STATS,
  stories: {},
  vocabulary: {
    totalLearned: 0,
    totalMastered: 0,
    srsItems: [],
    masteredWords: [],
    learningWords: [],
  },
  achievements: [],
  unlockedAchievements: [],
  settings: DEFAULT_SETTINGS,
};
