import './listen.css';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowDownToLine, ArrowUpRight, Headphones, RotateCcw, RotateCw, Globe2, Feather, Footprints, Check, Link2 } from 'lucide-react';
import episodes from '@/data/listening/episodes.json';
import metadata from '@/data/listening/audio-metadata.json';

type Episode = typeof episodes[number];
const getId = () => { try { return decodeURIComponent(window.location.hash.split('/')[1] || ''); } catch { return ''; } };
const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

function Cover({ theme, large = false }: { theme: string; large?: boolean }) {
  return <div className={`listen-art listen-art-${theme} ${large ? 'listen-art-large' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 400 250" fill="none">
      {theme === 'tour' ? <>
        <path d="M44 218h312M64 218v-55m272 55v-55M94 162h212" stroke="currentColor" strokeWidth="2" />
        <path d="M130 216V167h140v49M120 225h160" stroke="currentColor" strokeWidth="2" />
        <circle cx="224" cy="95" r="58" fill="#cf785f" />
        <path d="M249 43a58 58 0 0 0 0 104 58 58 0 0 1-25 6 58 58 0 1 1 25-110" fill="#edb8a2" />
        <path d="m105 48 7 15-16-6 15-7-6 15m195 44 5 10 10 5-10 5-5 10-5-10-10-5 10-5 5-10" stroke="currentColor" strokeWidth="2" />
        <path d="M80 75c35-39 99-53 139-48M302 50l12 8-14 5" stroke="currentColor" strokeWidth="2" strokeDasharray="5 7" />
      </> : theme === 'bird' ? <>
        <path d="M56 210h288M192 190l-4 20m24-20 5 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M190 63c-43 0-61 36-57 76 3 34 29 61 70 61 51 0 80-42 71-89-6-29-34-48-65-48h-19Z" fill="#a8baa1" />
        <path d="M176 118c-21 29-8 61 28 64 23-14 28-44 10-67" stroke="currentColor" strokeWidth="2" />
        <path d="m260 86 38 25-31 12" fill="#d39d53" stroke="currentColor" strokeWidth="2" />
        <circle cx="242" cy="91" r="5" fill="currentColor" />
        <path d="m152 166-27 50 48-32M202 62l8-20 10 21M89 85c-13 8-13 27 0 35m-15-44c-20 14-20 40 0 53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </> : <>
        <path d="M54 216c30-10 48-5 72-1m147 0c30-10 48-5 72 1" stroke="currentColor" strokeWidth="2" />
        <path d="M167 103c-18-5-42 8-42 34 0 32 34 59 62 48 29 11 63-16 63-48 0-26-24-39-42-34Z" fill="#7c96b0" stroke="currentColor" strokeWidth="2" />
        <path d="M187 107c-3-28 11-47 35-49-2 24-14 40-35 49Z" fill="#a8baa1" stroke="currentColor" strokeWidth="2" />
        <path d="M189 106c-11-23-25-32-42-28 5 19 20 29 42 28Z" stroke="currentColor" strokeWidth="2" />
        <path d="M160 124c-8 1-13 8-13 16" stroke="#edf1f5" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="282" cy="170" rx="9" ry="14" transform="rotate(30 282 170)" fill="currentColor" opacity=".5" />
        <ellipse cx="309" cy="143" rx="8" ry="12" transform="rotate(30 309 143)" fill="currentColor" opacity=".4" />
        <ellipse cx="328" cy="117" rx="6" ry="10" transform="rotate(30 328 117)" fill="currentColor" opacity=".3" />
      </>}
    </svg>
  </div>;
}

function Player({ episode }: { episode: Episode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [tab, setTab] = useState<'summary' | 'english'>('summary');
  const [rate, setRate] = useState(1);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const duration = metadata[episode.id as keyof typeof metadata].duration;
  const src = `${import.meta.env.BASE_URL}audio/${episode.id}.mp3`;
  const seek = (amount: number) => {
    if (!audio.current || !Number.isFinite(audio.current.duration)) return;
    audio.current.currentTime = Math.max(0, Math.min(audio.current.duration, audio.current.currentTime + amount));
  };
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  };
  useEffect(() => {
    const current = audio.current;
    return () => { current?.pause(); };
  }, []);
  return <article className="listen-detail">
    <Cover theme={episode.theme} large />
    <div className="listen-story-heading">
      <p className="listen-eyebrow">{episode.category} <span> / </span> {time(duration)}</p>
      <h1>{episode.title}</h1>
      <p className="listen-korean-title">{episode.titleKorean}</p>
      <p className="listen-description">{episode.description}</p>
    </div>
    <section className="listen-player" aria-label="영어 이야기 재생">
      <div className="listen-player-label"><Headphones size={17} /><span>ENGLISH AUDIO</span><span>{time(duration)}</span></div>
      <audio ref={audio} controls preload="metadata" src={src} onError={() => setError(true)} aria-label={`${episode.title} 영어 음성`} />
      {error && <p role="alert" className="listen-error">음성을 불러오지 못했어요. 연결을 확인한 뒤 <button onClick={() => { setError(false); audio.current?.load(); }}>다시 불러오기</button>를 눌러주세요.</p>}
      <div className="listen-audio-tools">
        <button onClick={() => seek(-15)} aria-label="15초 뒤로"><RotateCcw size={18} /><span>15초</span></button>
        <button onClick={() => seek(15)} aria-label="15초 앞으로"><RotateCw size={18} /><span>15초</span></button>
        <label>속도 <select aria-label="재생 속도" value={rate} onChange={event => { const speed = Number(event.target.value); setRate(speed); if (audio.current) audio.current.playbackRate = speed; }}><option value={0.8}>0.8×</option><option value={1}>1×</option><option value={1.15}>1.15×</option></select></label>
        <a href={src} download={`${episode.id}.mp3`} aria-label="영어 음성 MP3 저장"><ArrowDownToLine size={18} /><span>저장</span></a>
      </div>
      <p className="listen-voice-note">컴퓨터가 읽어주는 영어 음성이에요. 듣기 편한 속도를 골라보세요.</p>
    </section>
    <div className="listen-tabs" role="tablist" aria-label="이야기 읽기">
      <button id="summary-tab" role="tab" aria-selected={tab === 'summary'} aria-controls="story-text" onClick={() => setTab('summary')} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { setTab('english'); document.getElementById('english-tab')?.focus(); } }} tabIndex={tab === 'summary' ? 0 : -1}>한국어 요약</button>
      <button id="english-tab" role="tab" aria-selected={tab === 'english'} aria-controls="story-text" onClick={() => setTab('english')} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { setTab('summary'); document.getElementById('summary-tab')?.focus(); } }} tabIndex={tab === 'english' ? 0 : -1}>English story</button>
    </div>
    <div id="story-text" role="tabpanel" aria-labelledby={`${tab}-tab`} tabIndex={0} className={`listen-text ${tab === 'english' ? 'listen-english' : ''}`} lang={tab === 'english' ? 'en' : 'ko'}>
      {tab === 'summary' ? <p>{episode.summary}</p> : episode.text.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </div>
    <div className="listen-detail-footer"><span>가족을 위한 짧은 창작 이야기</span><button onClick={share}>{copied ? <Check size={16} /> : <Link2 size={16} />}{copied ? '링크를 복사했어요' : '이야기 링크 복사'}</button></div>
    {copyFailed && <p role="status" className="listen-voice-note">주소창의 링크를 복사해서 공유해 주세요.</p>}
    <a className="listen-next" href="#listen">다른 이야기 골라보기 <ArrowUpRight size={18} /></a>
  </article>;
}

export function Listen({ onBack }: { onBack: () => void }) {
  const [id, setId] = useState(getId);
  useEffect(() => {
    const update = () => { setId(getId()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const episode = episodes.find(item => item.id === id);
  return <main className="listen-shell">
    <header className="listen-topbar"><button onClick={episode ? () => { window.location.hash = 'listen'; } : onBack} aria-label={episode ? '이야기 목록으로' : '홈으로'}><ArrowLeft size={20} /></button><a href="#listen" className="listen-brand">EQuest<span>LISTEN</span></a><span className="listen-edition">FAMILY EDITION / 01</span></header>
    {episode ? <Player key={episode.id} episode={episode} /> : <>
      <section className="listen-intro"><p className="listen-eyebrow">작은 궁금증, 새로운 이야기</p><h1>오늘은 무슨 이야기를<br />들어볼까?</h1><p>무대 뒤로, 새의 세계로, 작은 모험 속으로.<br />마음이 가는 이야기부터 골라봐요.</p></section>
      {id && <p role="status" className="listen-voice-note">이 이야기는 아직 없어요. 아래에서 다른 이야기를 골라주세요.</p>}
      <div className="listen-collection">{episodes.map((item, index) => {
        const Icon = item.theme === 'tour' ? Globe2 : item.theme === 'bird' ? Feather : Footprints;
        return <a key={item.id} href={`#listen/${item.id}`} className="listen-episode"><Cover theme={item.theme} /><div className="listen-episode-body"><div className="listen-episode-meta"><span><Icon size={14} />{item.category}</span><span>{time(metadata[item.id as keyof typeof metadata].duration)}</span></div><h2>{item.titleKorean}</h2><p className="listen-episode-en" lang="en">{item.title}</p><p>{item.description}</p><div className="listen-episode-bottom"><span>0{index + 1} / {item.audience}</span><span className="listen-episode-play"><Headphones size={17} />듣기</span></div></div></a>;
      })}</div>
      <footer className="listen-library-footer"><span>영어 음성 · 한국어 요약 · 퀴즈 없이 자유롭게</span><p>모든 이야기는 컴퓨터 합성 음성으로 읽어줘요.</p></footer>
    </>}
  </main>;
}
