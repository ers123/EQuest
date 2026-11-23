import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Story, Level, LEVEL_INFO } from '@/types';
import { STORIES } from '@/data/stories';
import { IconButton } from '@/components/ui/Button';
import { ArrowLeft, ArrowUpRight, BookOpen, Clock, Check, SlidersHorizontal, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryListProps { onBack: () => void; onSelectStory: (story: Story) => void; }
const collectionLabels: Record<string, string> = {
  aesop: '이솝 우화', grimm: '그림 형제 동화', andersen: '안데르센 동화',
  world: '세계의 옛이야기', classic: '오래 사랑받은 이야기', science: '과학 이야기',
};

export function StoryList({ onBack, onSelectStory }: StoryListProps) {
  const { stories } = useProgressStore();
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeFilters = selectedLevel !== 'all' || selectedCollection !== 'all';
  const resetFilters = () => { setSelectedLevel('all'); setSelectedCollection('all'); setSearchQuery(''); };
  const filteredStories = useMemo(() => STORIES.filter((story) => {
    if (selectedLevel !== 'all' && story.level !== selectedLevel) return false;
    if (selectedCollection !== 'all' && story.collection !== selectedCollection) return false;
    const query = searchQuery.trim().toLowerCase();
    return !query || story.title.toLowerCase().includes(query) || story.titleKorean.includes(query);
  }), [selectedLevel, selectedCollection, searchQuery]);
  const groupedStories = useMemo(() => filteredStories.reduce((groups, story) => {
    (groups[story.collection] ||= []).push(story); return groups;
  }, {} as Record<string, Story[]>), [filteredStories]);

  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-background/95 backdrop-blur-md">
        <div className="page-width flex items-center gap-3 py-4 safe-top">
          <IconButton onClick={onBack} aria-label="홈으로 돌아가기"><ArrowLeft size={20} /></IconButton>
          <div className="flex-1"><p className="text-[10px] font-semibold tracking-[.14em] text-ink/50">EQUEST LIBRARY</p><h1 className="mt-0.5 text-xl font-bold tracking-tight text-ink">이야기 책장</h1></div>
          <IconButton onClick={() => setShowFilters(!showFilters)} aria-label="검색 필터" aria-expanded={showFilters} aria-controls="story-filters" className={cn(activeFilters && 'bg-primary/10 text-primary')}><SlidersHorizontal size={20} /></IconButton>
        </div>
        <div className="page-width pb-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden="true" />
            <input aria-label="이야기 검색" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="제목으로 찾아보기" className="min-h-12 w-full rounded-xl border border-ink/10 bg-white py-3 pl-11 pr-12 text-sm text-ink placeholder:text-ink/45" />
            {searchQuery && <button onClick={() => setSearchQuery('')} aria-label="검색어 지우기" className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ink/50"><X size={17} /></button>}
          </div>
          {showFilters && <div id="story-filters" className="mt-5 space-y-4 border-t border-ink/10 pt-4">
            <label className="block text-xs font-semibold text-ink/60">읽기 단계
              <select value={selectedLevel} onChange={(event) => setSelectedLevel(event.target.value === 'all' ? 'all' : Number(event.target.value) as Level)} className="mt-2 min-h-12 w-full rounded-lg border border-ink/15 bg-white px-3 text-sm text-ink">
                <option value="all">모든 단계</option>{LEVEL_INFO.map((info) => <option key={info.level} value={info.level}>단계 {info.level} · {info.nameKorean}</option>)}
              </select>
            </label>
            <label className="block text-xs font-semibold text-ink/60">이야기 종류
              <select value={selectedCollection} onChange={(event) => setSelectedCollection(event.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-ink/15 bg-white px-3 text-sm text-ink">
                <option value="all">모든 이야기</option>{Object.entries(collectionLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </label>
            {activeFilters && <button onClick={resetFilters} className="min-h-11 text-sm font-semibold text-primary">필터 초기화</button>}
          </div>}
        </div>
      </header>

      <main className="page-width pb-12 pt-6">
        <p className="mb-7 text-sm text-ink/55" role="status">{filteredStories.length}편의 이야기{activeFilters ? ' · 필터 적용 중' : ''}</p>
        {filteredStories.length === 0 ? <div className="py-16 text-center">
          <BookOpen size={32} strokeWidth={1.3} className="mx-auto mb-4 text-ink/35" aria-hidden="true" />
          <h2 className="mb-2 text-lg font-bold text-ink">아직 찾는 이야기가 없어요</h2>
          <p className="text-sm text-ink/60">다른 제목이나 종류로 찾아볼까요?</p>
          <button onClick={resetFilters} className="mt-5 min-h-11 rounded-full border border-ink/20 px-5 text-sm font-semibold text-ink">전체 이야기 보기</button>
        </div> : Object.entries(groupedStories).map(([collection, collectionStories]) => <section key={collection} className="mb-10" aria-labelledby={`collection-${collection}`}>
          <div className="mb-1 flex items-baseline justify-between border-b border-ink/20 pb-3">
            <h2 id={`collection-${collection}`} className="text-base font-bold text-ink">{collectionLabels[collection] || collection}</h2>
            <span className="text-xs text-ink/45">{collectionStories.length}편</span>
          </div>
          {collectionStories.map((story, index) => {
            const progress = stories[story.id];
            const percent = Math.min(100, ((progress?.completedChapters.length || 0) / story.chapters.length) * 100);
            return <button key={story.id} onClick={() => onSelectStory(story)} className="group flex w-full items-start gap-4 border-b border-ink/10 py-5 text-left transition-colors hover:bg-white/60 sm:gap-6">
              <span aria-hidden="true" className="flex h-16 w-12 shrink-0 flex-col justify-between rounded-r-md border-l-[3px] border-primary/40 bg-[#eae2d5] px-2 py-2 text-ink/55 sm:h-20 sm:w-14"><BookOpen size={17} strokeWidth={1.4} /><span className="text-[10px] tabular-nums">{String(index + 1).padStart(2, '0')}</span></span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold leading-snug text-ink group-hover:text-primary">{story.title}</span>
                <span className="mt-1 block text-sm text-ink/60">{story.titleKorean}</span>
                <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink/50"><span>단계 {story.level}</span><span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden="true" />{story.estimatedMinutes}분</span><span>{story.chapters.length}개 챕터</span>{progress?.completed && <span className="inline-flex items-center gap-1 text-secondary"><Check size={13} aria-hidden="true" />읽음</span>}</span>
                {percent > 0 && !progress?.completed && <span className="mt-3 block h-1 max-w-44 overflow-hidden rounded-full bg-ink/10" aria-label={`${Math.round(percent)}% 읽음`}><span className="block h-full rounded-full bg-primary" style={{ width: `${percent}%` }} /></span>}
              </span>
              <ArrowUpRight size={18} className="mt-1 shrink-0 text-ink/35" aria-hidden="true" />
            </button>;
          })}
        </section>)}
      </main>
    </motion.div>
  );
}
