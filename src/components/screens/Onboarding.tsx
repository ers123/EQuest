import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { Level, LEVEL_INFO } from '@/types';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft, BookOpen, Check } from 'lucide-react';

interface OnboardingProps { onComplete: () => void; }
type Step = 'welcome' | 'name' | 'level' | 'ready';
const steps: Step[] = ['welcome', 'name', 'level', 'ready'];

export function Onboarding({ onComplete }: OnboardingProps) {
  const { setInitialized } = useProgressStore();
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Level>(1);
  const reduceMotion = useReducedMotion();
  const handleComplete = () => {
    if (name.trim()) { setInitialized(name.trim(), selectedLevel); onComplete(); }
  };
  const goBack = () => setStep(steps[Math.max(0, steps.indexOf(step) - 1)]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="page-width flex w-full items-center justify-between border-b border-ink/10 py-5 safe-top">
        <span className="text-2xl font-extrabold tracking-tight text-ink">EQuest<span className="text-primary">.</span></span>
        <span className="text-xs text-ink/50">나만의 이야기 책장</span>
      </header>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
        {step !== 'welcome' && <button onClick={goBack} className="mb-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm text-ink/60"><ArrowLeft size={17} aria-hidden="true" /> 이전</button>}
        <AnimatePresence mode="wait">
          <motion.section key={step} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
            {step === 'welcome' && <>
              <div aria-hidden="true" className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-ink text-[#f6f3ec]"><BookOpen size={38} strokeWidth={1.3} /></div>
              <p className="mb-3 text-xs font-semibold tracking-[.16em] text-primary">A LITTLE CURIOSITY, EVERY DAY</p>
              <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-ink">좋아하는 이야기로<br />영어와 가까워지기.</h1>
              <p className="mb-9 text-base leading-7 text-ink/65">듣고 싶은 이야기를 고르고, 궁금한 표현을 만나세요. 한국어 요약도 함께 볼 수 있어요.</p>
              <Button size="lg" fullWidth onClick={() => { window.location.hash = 'listen'; }}>이야기 먼저 들어보기 <ArrowRight size={18} aria-hidden="true" /></Button>
              <button onClick={() => setStep('name')} className="mt-4 min-h-11 w-full text-sm font-semibold text-ink/70">내 책장 만들기</button>
            </>}
            {step === 'name' && <>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-ink">어떻게 불러줄까?</h1>
              <p className="mb-8 text-sm leading-6 text-ink/65">실명 대신 좋아하는 별명을 써도 좋아요.</p>
              <form onSubmit={(event) => { event.preventDefault(); if (name.trim()) setStep('level'); }}>
                <label htmlFor="reader-name" className="mb-2 block text-sm font-semibold text-ink">이름 또는 별명</label>
                <input id="reader-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="nickname" autoFocus maxLength={20} placeholder="어떤 이름이 좋을까?" className="mb-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-4 text-lg text-ink" />
                <p className="mb-8 text-xs text-ink/50">1–20자 · 이 기기에 저장돼요</p>
                <Button type="submit" size="lg" fullWidth disabled={!name.trim()}>다음 <ArrowRight size={18} aria-hidden="true" /></Button>
              </form>
            </>}
            {step === 'level' && <>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-ink">읽기는 어디서 시작할까?</h1>
              <p className="mb-6 text-sm leading-6 text-ink/65">시험이 아니에요. 편하게 읽을 단계를 골라주세요.<br />듣는 이야기는 단계와 상관없이 고를 수 있어요.</p>
              <div className="mb-7 space-y-2" role="group" aria-label="읽기 시작 단계">
                {LEVEL_INFO.map((option) => <button key={option.level} onClick={() => setSelectedLevel(option.level)} aria-pressed={selectedLevel === option.level} className={`flex min-h-16 w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${selectedLevel === option.level ? 'border-ink bg-ink text-white' : 'border-ink/15 bg-white text-ink hover:border-ink/40'}`}>
                  <span className="text-xs font-semibold tabular-nums opacity-60">0{option.level}</span>
                  <span className="flex-1"><span className="block text-sm font-bold">{option.nameKorean}</span><span className="mt-1 block text-xs opacity-70">{option.descriptionKorean}</span></span>
                  {selectedLevel === option.level && <Check size={18} aria-hidden="true" />}
                </button>)}
              </div>
              <Button size="lg" fullWidth onClick={() => setStep('ready')}>이 단계로 시작 <ArrowRight size={18} aria-hidden="true" /></Button>
            </>}
            {step === 'ready' && <>
              <div aria-hidden="true" className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary"><Check size={28} /></div>
              <h1 className="mb-4 break-words text-3xl font-bold leading-tight tracking-tight text-ink">{name},<br />책장이 준비됐어.</h1>
              <p className="mb-8 text-base leading-7 text-ink/65">지금 끌리는 이야기부터 골라보세요.<br />천천히 듣고, 다시 들어도 좋아요.</p>
              <Button size="lg" fullWidth onClick={handleComplete}>책장 열기 <ArrowRight size={18} aria-hidden="true" /></Button>
            </>}
          </motion.section>
        </AnimatePresence>
      </main>
      <footer className="pb-7 text-center text-xs text-ink/45" aria-label={`준비 ${steps.indexOf(step) + 1} / ${steps.length} 단계`}>{String(steps.indexOf(step) + 1).padStart(2, '0')} <span className="mx-3 text-ink/20">/</span> 04</footer>
    </div>
  );
}
