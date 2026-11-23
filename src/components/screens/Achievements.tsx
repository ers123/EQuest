import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { ACHIEVEMENTS } from '@/data/achievements';
import { IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ArrowLeft, Trophy, Lock, Check, Flame, BookOpen, Star, Target } from 'lucide-react';

interface AchievementsProps { onBack: () => void; }
const categories = {
  streak: { icon: Flame, label: '꾸준히 함께한 날' },
  vocabulary: { icon: BookOpen, label: '단어와 친해지기' },
  story: { icon: Star, label: '이야기 모으기' },
  accuracy: { icon: Target, label: '문제 풀어보기' },
  special: { icon: Trophy, label: '특별한 순간' },
};
export function Achievements({ onBack }: AchievementsProps) {
  const { unlockedAchievements, stats, vocabulary } = useProgressStore();
  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;
  const groupedAchievements = ACHIEVEMENTS.reduce((groups, achievement) => {
    (groups[achievement.category] ||= []).push(achievement); return groups;
  }, {} as Record<string, typeof ACHIEVEMENTS>);
  const getProgress = (achievement: typeof ACHIEVEMENTS[0]) => {
    const current = achievement.category === 'streak' ? stats.currentStreak
      : achievement.category === 'vocabulary' ? vocabulary.totalMastered
      : achievement.category === 'story' ? stats.totalStoriesRead
      : achievement.category === 'accuracy' ? (stats.totalQuizzes > 0 ? Math.round((stats.correctAnswers / stats.totalQuizzes) * 100) : 0) : 0;
    return { current, target: achievement.requirement };
  };
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
    <header className="border-b border-ink/10"><div className="page-width flex items-center gap-3 py-4 safe-top">
      <IconButton onClick={onBack} aria-label="홈으로 돌아가기"><ArrowLeft size={20} /></IconButton>
      <div className="flex-1"><p className="text-[10px] font-semibold tracking-[.14em] text-ink/50">EQUEST COLLECTION</p><h1 className="mt-0.5 text-xl font-bold tracking-tight text-ink">나의 배지</h1></div>
      <span className="text-sm tabular-nums text-ink/60">{unlockedCount} / {totalCount}</span>
    </div></header>
    <main className="page-width pb-12 pt-8">
      <p className="mb-2 text-xl font-semibold text-ink">작은 발견을 모아두었어요.</p>
      <p className="mb-8 text-sm leading-6 text-ink/60">읽고, 익히고, 다시 찾아온 순간의 기록이에요.</p>
      {Object.entries(groupedAchievements).map(([category, achievements]) => {
        const { icon: CategoryIcon, label } = categories[category as keyof typeof categories] || categories.special;
        return <section key={category} className="mb-9" aria-labelledby={`badge-${category}`}>
          <div className="mb-2 flex items-center gap-2 border-b border-ink/20 pb-3"><CategoryIcon size={18} strokeWidth={1.5} className="text-primary" aria-hidden="true" /><h2 id={`badge-${category}`} className="flex-1 text-base font-bold text-ink">{label}</h2><span className="text-xs text-ink/50">{achievements.filter((item) => unlockedAchievements.includes(item.id)).length} / {achievements.length}</span></div>
          {achievements.map((achievement) => {
            const unlocked = unlockedAchievements.includes(achievement.id);
            const progress = getProgress(achievement);
            return <div key={achievement.id} className="flex items-start gap-4 border-b border-ink/10 py-5">
              <div aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${unlocked ? 'bg-secondary/10 text-secondary' : 'bg-ink/5 text-ink/35'}`}>{unlocked ? <CategoryIcon size={20} strokeWidth={1.5} /> : <Lock size={17} strokeWidth={1.5} />}</div>
              <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold text-ink">{achievement.titleKorean}</h3>{unlocked && <span className="flex shrink-0 items-center gap-1 text-xs text-secondary"><Check size={13} aria-hidden="true" />모았어요</span>}</div><p className="mt-1 text-sm leading-6 text-ink/60">{achievement.descriptionKorean || achievement.description}</p>
                {!unlocked && <div className="mt-3 max-w-sm"><div className="mb-2 flex justify-between text-xs text-ink/50"><span>지금까지</span><span>{progress.current} / {progress.target}</span></div><ProgressBar value={progress.current} max={progress.target} size="sm" variant="secondary" /></div>}
              </div>
            </div>;
          })}
        </section>;
      })}
    </main>
  </motion.div>;
}
