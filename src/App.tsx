import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Screen, Story, Word } from '@/types';

// Screens
import { Onboarding } from '@/components/screens/Onboarding';
import { Home } from '@/components/screens/Home';
import { StoryList } from '@/components/screens/StoryList';
import { StoryReader } from '@/components/screens/StoryReader';
import { VocabList } from '@/components/screens/VocabList';
import { VocabQuiz } from '@/components/screens/VocabQuiz';
import { Stats } from '@/components/screens/Stats';
import { Achievements } from '@/components/screens/Achievements';

// Components
import { AchievementPopup } from '@/components/ui/AchievementPopup';
import { LevelUpPopup } from '@/components/ui/LevelUpPopup';

// Hooks
import { useConfetti } from '@/hooks/useConfetti';

function App() {
  const { isInitialized, checkDailyLogin, stats } = useProgressStore();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [previousLevel, setPreviousLevel] = useState(stats.level);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const { fireConfetti } = useConfetti();

  // Check daily login on mount
  useEffect(() => {
    if (isInitialized) {
      checkDailyLogin();
    }
  }, [isInitialized, checkDailyLogin]);

  // Check for level up
  useEffect(() => {
    if (stats.level > previousLevel) {
      setShowLevelUp(true);
      fireConfetti();
      setPreviousLevel(stats.level);
    }
  }, [stats.level, previousLevel, fireConfetti]);

  // Determine initial screen
  useEffect(() => {
    if (!isInitialized) {
      setScreen('onboarding');
    }
  }, [isInitialized]);

  // Navigation handlers
  const navigate = useCallback((newScreen: Screen) => {
    setScreen(newScreen);
  }, []);

  const navigateToStory = useCallback((story: Story) => {
    setSelectedStory(story);
    setScreen('story-reader');
  }, []);

  const navigateToVocabQuiz = useCallback((words: Word[]) => {
    setSelectedWords(words);
    setScreen('vocab-quiz');
  }, []);

  const goBack = useCallback(() => {
    switch (screen) {
      case 'story-reader':
        setSelectedStory(null);
        setScreen('story-list');
        break;
      case 'story-list':
      case 'vocab-list':
      case 'vocab-quiz':
      case 'stats':
      case 'achievements':
        setScreen('home');
        break;
      default:
        setScreen('home');
    }
  }, [screen]);

  // Render current screen
  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return (
          <Onboarding
            onComplete={() => {
              fireConfetti();
              navigate('home');
            }}
          />
        );

      case 'home':
        return (
          <Home
            onNavigate={navigate}
            onStartStory={() => navigate('story-list')}
            onStartVocab={() => navigate('vocab-list')}
          />
        );

      case 'story-list':
        return (
          <StoryList
            onBack={goBack}
            onSelectStory={navigateToStory}
          />
        );

      case 'story-reader':
        return selectedStory ? (
          <StoryReader
            story={selectedStory}
            onBack={goBack}
            onComplete={() => {
              fireConfetti();
              goBack();
            }}
          />
        ) : (
          <StoryList onBack={goBack} onSelectStory={navigateToStory} />
        );

      case 'vocab-list':
        return (
          <VocabList
            onBack={goBack}
            onStartQuiz={navigateToVocabQuiz}
          />
        );

      case 'vocab-quiz':
        return (
          <VocabQuiz
            words={selectedWords}
            onBack={goBack}
            onComplete={() => {
              fireConfetti();
              navigate('vocab-list');
            }}
          />
        );

      case 'stats':
        return <Stats onBack={goBack} />;

      case 'achievements':
        return <Achievements onBack={goBack} />;

      default:
        return <Home onNavigate={navigate} onStartStory={() => navigate('story-list')} onStartVocab={() => navigate('vocab-list')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>

      {/* Level Up Popup */}
      <LevelUpPopup
        isOpen={showLevelUp}
        level={stats.level}
        onClose={() => setShowLevelUp(false)}
      />

      {/* Achievement Popup handled by global store */}
      <AchievementPopup />
    </div>
  );
}

export default App;
