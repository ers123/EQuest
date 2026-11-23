import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { LEVEL_TIERS } from '@/types';
import { IconButton } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ArrowLeft, Flame, Zap, Target, BookOpen, Star, TrendingUp } from 'lucide-react';

interface StatsProps { onBack: () => void; }
export function Stats({ onBack }: StatsProps) {
  const { userName, stats, vocabulary } = useProgressStore();
  const currentTier = LEVEL_TIERS.find((tier) => stats.level >= tier.min && stats.level <= tier.max) || LEVEL_TIERS[0];
  const accuracy = stats.totalQuizzes > 0 ? Math.round((stats.correctAnswers / stats.totalQuizzes) * 100) : 0;
  const xpProgress = stats.totalXP - (stats.level - 1) * 100;
  const statItems = [
    { icon: BookOpen, label: '읽은 이야기', value: stats.totalStoriesRead, suffix: '편' },
    { icon: Star, label: '만난 단어', value: stats.totalWordsLearned, suffix: '개' },
    { icon: Flame, label: '함께한 연속 일수', value: stats.currentStreak, suffix: '일' },
    { icon: TrendingUp, label: '가장 긴 연속 기록', value: stats.longestStreak, suffix: '일' },
    { icon: Zap, label: '모은 경험치', value: stats.totalXP, suffix: 'XP' },
    { icon: Target, label: '퀴즈 정확도', value: accuracy, suffix: '%' },
  ];
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
    <header className="border-b border-ink/10">
      <div className="page-width flex items-center gap-3 py-4 safe-top">
        <IconButton onClick={onBack} aria-label="홈으로 돌아가기"><ArrowLeft size={20} /></IconButton>
        <div><p className="text-[10px] font-semibold tracking-[.14em] text-ink/50">EQUEST JOURNAL</p><h1 className="mt-0.5 text-xl font-bold tracking-tight text-ink">나의 기록</h1></div>
      </div>
    </header>
    <main className="page-width pb-12 pt-8">
      <p className="mb-2 text-sm text-ink/60">{userName}의 책장에 쌓인 이야기들</p>
      <section className="mb-8 border-b border-ink/15 pb-7" aria-label="현재 레벨">
        <div className="mb-4 flex items-baseline justify-between gap-4"><h2 className="text-2xl font-semibold text-ink">{currentTier.nameKorean}</h2><span className="text-sm text-ink/60">레벨 {stats.level}</span></div>
        <ProgressBar value={xpProgress} max={100} variant="secondary" size="sm" />
        <p className="mt-2 text-right text-xs text-ink/55">다음 레벨까지 {xpProgress} / 100 XP</p>
      </section>
      <dl className="mb-10 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
        {statItems.map(({ icon: Icon, label, value, suffix }) => <div key={label} className="border-b border-ink/10 py-5">
          <dt className="mb-3 flex items-center gap-2 text-xs text-ink/60"><Icon size={15} strokeWidth={1.5} aria-hidden="true" />{label}</dt>
          <dd className="text-3xl font-semibold tabular-nums text-ink">{value}<span className="ml-1.5 text-sm font-normal text-ink/50">{suffix}</span></dd>
        </div>)}
      </dl>
      <section className="mb-9" aria-labelledby="word-progress-title">
        <h2 id="word-progress-title" className="mb-5 border-b border-ink/15 pb-3 text-lg font-bold text-ink">단어장 기록</h2>
        <div className="space-y-5">
          <div><div className="mb-2 flex justify-between text-sm"><span className="text-ink/65">익히는 중</span><span className="font-semibold text-ink">{vocabulary.learningWords.length}개</span></div><ProgressBar value={vocabulary.learningWords.length} max={vocabulary.totalLearned || 1} variant="secondary" size="sm" /></div>
          <div><div className="mb-2 flex justify-between text-sm"><span className="text-ink/65">익숙해진 단어</span><span className="font-semibold text-ink">{vocabulary.totalMastered}개</span></div><ProgressBar value={vocabulary.totalMastered} max={vocabulary.totalLearned || 1} variant="primary" size="sm" /></div>
        </div>
      </section>
      <section aria-labelledby="quiz-record-title">
        <h2 id="quiz-record-title" className="mb-2 border-b border-ink/15 pb-3 text-lg font-bold text-ink">퀴즈 기록</h2>
        <dl><div className="flex justify-between border-b border-ink/10 py-4 text-sm"><dt className="text-ink/65">풀어본 문제</dt><dd className="font-semibold text-ink">{stats.totalQuizzes}개</dd></div><div className="flex justify-between border-b border-ink/10 py-4 text-sm"><dt className="text-ink/65">맞힌 문제</dt><dd className="font-semibold text-ink">{stats.correctAnswers}개</dd></div></dl>
      </section>
    </main>
  </motion.div>;
}
