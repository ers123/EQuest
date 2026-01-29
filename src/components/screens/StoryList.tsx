import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Story, Level, LEVEL_INFO } from '@/types';
import { STORIES } from '@/data/stories';
import { AnimatedCard } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  Check,
  Filter,
  Search,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryListProps {
  onBack: () => void;
  onSelectStory: (story: Story) => void;
}

const collectionLabels: Record<string, { label: string; emoji: string }> = {
  aesop: { label: "Aesop's Fables", emoji: '🦊' },
  grimm: { label: "Grimm's Tales", emoji: '🏰' },
  andersen: { label: "Andersen's Tales", emoji: '🧜' },
  world: { label: 'World Folktales', emoji: '🌍' },
  classic: { label: 'Classic Stories', emoji: '📚' },
  science: { label: 'Science Stories', emoji: '🔬' },
};

export function StoryList({ onBack, onSelectStory }: StoryListProps) {
  const { stories } = useProgressStore();
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedCollection, setSelectedCollection] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter stories
  const filteredStories = useMemo(() => {
    return STORIES.filter((story) => {
      // Level filter
      if (selectedLevel !== 'all' && story.level !== selectedLevel) {
        return false;
      }

      // Collection filter
      if (selectedCollection !== 'all' && story.collection !== selectedCollection) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          story.title.toLowerCase().includes(query) ||
          story.titleKorean.includes(query)
        );
      }

      return true;
    });
  }, [selectedLevel, selectedCollection, searchQuery]);

  // Group by collection for display
  const groupedStories = useMemo(() => {
    if (selectedCollection !== 'all') {
      return { [selectedCollection]: filteredStories };
    }
    return filteredStories.reduce((acc, story) => {
      if (!acc[story.collection]) {
        acc[story.collection] = [];
      }
      acc[story.collection].push(story);
      return acc;
    }, {} as Record<string, Story[]>);
  }, [filteredStories, selectedCollection]);

  const getStoryProgress = (storyId: string) => {
    const progress = stories[storyId];
    if (!progress) return 0;
    const story = STORIES.find((s) => s.id === storyId);
    if (!story) return 0;
    return (progress.completedChapters.length / story.chapters.length) * 100;
  };

  const isStoryCompleted = (storyId: string) => {
    return stories[storyId]?.completed || false;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <IconButton onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </IconButton>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Story Quest</h1>
            <p className="text-xs text-gray-500">스토리 퀘스트</p>
          </div>

          <IconButton onClick={() => setShowFilters(!showFilters)}>
            <Filter className={cn('w-5 h-5', showFilters && 'text-primary')} />
          </IconButton>
        </div>

        {/* Search bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="px-4 py-3 space-y-3">
                {/* Level filter */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Difficulty Level</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedLevel('all')}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                        selectedLevel === 'all'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )}
                    >
                      All
                    </button>
                    {LEVEL_INFO.map((info) => (
                      <button
                        key={info.level}
                        onClick={() => setSelectedLevel(info.level)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                          selectedLevel === info.level
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                      >
                        {info.emoji} Lv.{info.level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collection filter */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Collection</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCollection('all')}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                        selectedCollection === 'all'
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )}
                    >
                      All
                    </button>
                    {Object.entries(collectionLabels).map(([key, { label, emoji }]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCollection(key)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                          selectedCollection === key
                            ? 'bg-secondary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                      >
                        {emoji} {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content */}
      <main className="px-4 py-4 pb-8">
        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No stories found</p>
            <p className="text-sm text-gray-400">Try different filters</p>
          </div>
        ) : (
          Object.entries(groupedStories).map(([collection, collectionStories]) => (
            <div key={collection} className="mb-6">
              {selectedCollection === 'all' && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{collectionLabels[collection]?.emoji}</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    {collectionLabels[collection]?.label || collection}
                  </h2>
                  <span className="text-sm text-gray-400">
                    ({collectionStories.length})
                  </span>
                </div>
              )}

              <div className="space-y-3">
                {collectionStories.map((story, index) => {
                  const progress = getStoryProgress(story.id);
                  const completed = isStoryCompleted(story.id);

                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <AnimatedCard
                        onClick={() => onSelectStory(story)}
                        padding="none"
                        className="overflow-hidden"
                      >
                        <div className="flex">
                          {/* Thumbnail */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl">
                              {collectionLabels[story.collection]?.emoji || '📖'}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-3 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="font-bold text-gray-800 truncate">
                                  {story.title}
                                </h3>
                                <p className="text-sm text-gray-500 truncate">
                                  {story.titleKorean}
                                </p>
                              </div>
                              {completed && (
                                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Level {story.level}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {story.estimatedMinutes} min
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {story.chapters.length} ch
                              </span>
                            </div>

                            {/* Progress bar */}
                            {progress > 0 && !completed && (
                              <div className="mt-2">
                                <ProgressBar
                                  value={progress}
                                  size="sm"
                                  variant="primary"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </AnimatedCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>
    </motion.div>
  );
}
