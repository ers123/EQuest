import { motion, useReducedMotion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Screen } from '@/types';
import { BookOpen, Headphones, ArrowUpRight, ArrowRight, Library, BarChart3, Award } from 'lucide-react';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  onStartStory: () => void;
  onStartVocab: () => void;
}

export function Home({ onNavigate, onStartStory, onStartVocab }: HomeProps) {
  const { userName, stats } = useProgressStore();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-background">
      <header className="page-width flex items-center justify-between border-b border-ink/10 py-5 safe-top">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-extrabold tracking-tight text-ink">EQuest<span className="text-primary">.</span></span>
          <span className="hidden sm:inline text-xs font-medium tracking-wide text-ink/55">STORIES FOR CURIOUS MINDS</span>
        </div>
        <button onClick={() => onNavigate('stats')} aria-label="나의 기록 보기" className="flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-ink/75 hover:bg-ink/5">
          <BarChart3 size={18} aria-hidden="true" /><span>나의 기록</span>
        </button>
      </header>

      <main className="page-width pb-12 pt-9 sm:pt-12">
        <div className="mb-7 sm:mb-9">
          <p className="mb-2 text-sm text-ink/60">안녕, {userName}.</p>
          <h1 className="text-[1.9rem] font-bold leading-tight tracking-tight text-ink sm:text-4xl">오늘은 어떤 이야기가 궁금해?</h1>
        </div>

        <button onClick={() => onNavigate('listen')} className="group relative mb-9 block w-full overflow-hidden rounded-[1.5rem] bg-ink px-6 py-7 text-left text-white sm:px-9 sm:py-10">
          <div className="relative z-10 max-w-[70%] sm:max-w-[60%]">
            <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.13em] text-[#d5dfd8]"><Headphones size={16} aria-hidden="true" /> 듣는 잡지 · VOL. 01</span>
            <h2 className="mb-3 text-[1.8rem] font-semibold leading-tight tracking-tight sm:text-4xl">귀로 떠나는<br />작은 모험</h2>
            <p className="mb-6 max-w-64 text-sm leading-relaxed text-[#d5dfd8]">좋아하는 이야기, 쉬운 영어.<br />한국어 요약도 함께 볼 수 있어요.</p>
            <span className="inline-flex min-h-11 items-center gap-4 rounded-full bg-[#f6f3ec] px-5 text-sm font-bold text-ink">이야기 고르기 <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
          </div>
          <div aria-hidden="true" className="absolute -right-9 top-1/2 -translate-y-1/2 sm:right-8">
            <svg viewBox="0 0 220 250" className="h-52 w-40 text-[#d2b69a] opacity-75 sm:h-64 sm:w-56" fill="none">
              <circle cx="110" cy="125" r="99" stroke="currentColor" strokeOpacity=".18" />
              <circle cx="110" cy="125" r="78" stroke="currentColor" strokeOpacity=".22" />
              <path d="M54 147v-34a56 56 0 0 1 112 0v34" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
              <rect x="43" y="126" width="27" height="52" rx="13" fill="currentColor" />
              <rect x="150" y="126" width="27" height="52" rx="13" fill="currentColor" />
              <path d="M92 133v23m12-35v46m12-54v62m12-45v30" stroke="#f6f3ec" strokeWidth="4" strokeLinecap="round" />
              <path d="M166 173q0 24-30 24h-12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <section aria-labelledby="explore-title">
          <div className="mb-2 flex items-center justify-between border-b border-ink/15 pb-4">
            <h2 id="explore-title" className="text-lg font-bold text-ink">더 둘러보기</h2>
            <span className="text-xs tracking-wide text-ink/45">READ & DISCOVER</span>
          </div>
          {[
            { icon: BookOpen, title: '이야기 읽기', description: '우화와 동화, 과학 이야기', action: onStartStory, number: '01' },
            { icon: Library, title: '나의 단어장', description: '이야기에서 만난 영어 표현', action: onStartVocab, number: '02' },
          ].map(({ icon: Icon, title, description, action, number }) => (
            <button key={title} onClick={action} className="group flex w-full items-center gap-4 border-b border-ink/10 py-5 text-left transition-colors hover:bg-white/50 sm:gap-6">
              <span className="text-xs tabular-nums text-ink/40">{number}</span>
              <Icon size={24} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden="true" />
              <span className="flex-1"><span className="block text-base font-bold text-ink">{title}</span><span className="mt-1 block text-sm text-ink/60">{description}</span></span>
              <ArrowUpRight size={20} className="text-ink/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          ))}
        </section>

        <section aria-label="나의 활동" className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/60">
          <p>함께 읽은 이야기 <span className="font-semibold text-ink">{stats.totalStoriesRead}</span>편 <span className="mx-2 text-ink/20">/</span> 만난 단어 <span className="font-semibold text-ink">{stats.totalWordsLearned}</span>개</p>
          <button onClick={() => onNavigate('achievements')} className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><Award size={17} aria-hidden="true" /> 나의 배지 <ArrowRight size={15} aria-hidden="true" /></button>
        </section>
      </main>
    </motion.div>
  );
}
