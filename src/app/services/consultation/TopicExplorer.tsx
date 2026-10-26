'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, type LucideIcon } from 'lucide-react';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { EASE_SETTLE } from '@/lib/animations';

export type Topic = { code: string; title: string; fit: string; tech: string; desc: string; outcome: string };

export type TopicLabels = {
  label: string;
  title: string;
  fitLabel: string;
  doLabel: string;
  outcomeLabel: string;
  prev: string;
  next: string;
  book: string;
  swipe: string;
};

interface Props {
  topics: Topic[];
  icons: Record<string, LucideIcon>;
  fallbackIcon: LucideIcon;
  t: TopicLabels;
  onBook: () => void;
}

const num = (i: number) => String(i + 1).padStart(2, '0');

/**
 * The five topics as one readable view: pick a topic from the list (or the
 * progress bar on a phone) and read it whole — who it is for, what we do,
 * what you leave with. Back / next name the topic they lead to; arrow keys
 * and a swipe on touch do the same.
 */
export default function TopicExplorer({ topics, icons, fallbackIcon, t, onBook }: Props) {
  const reduce = useReducedMotion();
  const [[active, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [touch, setTouch] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setTouch(window.matchMedia('(pointer: coarse)').matches), []);

  const go = (i: number) => {
    if (i < 0 || i >= topics.length || i === active) return;
    setState([i, i > active ? 1 : -1]);
  };

  // Arrow keys move between tabs, as a tab list should
  const onTabKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const i = Math.min(topics.length - 1, Math.max(0, active + step));
    go(i);
    tabRefs.current[i]?.focus();
  };

  const topic = topics[active];
  const Icon = icons[topic.code] ?? fallbackIcon;
  const prev = topics[active - 1];
  const next = topics[active + 1];
  const shift = reduce ? 0 : 40;

  return (
    <div>
      {/* Header: what this is, and where you are */}
      <div className="flex items-end justify-between gap-4 py-6">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-4">
          <ScanBadge variant="primary">{t.label}</ScanBadge>
          <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">{t.title}</span>
        </div>
        <span className="font-mono text-[12px] text-outline tracking-widest flex-shrink-0" aria-live="polite">
          <span className="text-primary">{num(active)}</span> / {num(topics.length - 1)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-primary/10">
        {/* Topic list — laptop and up */}
        <div role="tablist" aria-orientation="vertical" aria-label={t.title} onKeyDown={onTabKey} className="hidden lg:flex lg:col-span-4 flex-col gap-px">
          {topics.map((tp, i) => {
            const TabIcon = icons[tp.code] ?? fallbackIcon;
            const on = i === active;
            return (
              <button
                key={tp.code}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`topic-tab-${tp.code}`}
                aria-selected={on}
                aria-controls="topic-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                className={`relative flex flex-1 items-center gap-4 px-6 py-5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                  on ? 'bg-surface-container' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId={reduce ? undefined : 'topic-marker'}
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary shadow-[0_0_12px_rgba(143,245,255,0.6)]"
                    transition={{ duration: 0.45, ease: EASE_SETTLE }}
                  />
                )}
                <span className={`font-mono text-[12px] tracking-widest ${on ? 'text-primary' : 'text-outline'}`}>{num(i)}</span>
                <TabIcon size={18} strokeWidth={1.75} className={`flex-shrink-0 ${on ? 'text-primary' : 'text-outline'}`} />
                <span className="min-w-0">
                  <span className={`block font-headline text-[15px] font-bold tracking-tight leading-snug ${on ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                    {tp.title}
                  </span>
                  <span className="block font-mono text-[11px] text-outline uppercase tracking-widest mt-1">{tp.tech}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* The open topic */}
        <div className="lg:col-span-8 bg-surface-container-low flex flex-col overflow-hidden">
          {/* Progress — tappable on a phone, a quiet meter on laptop */}
          <div className="flex gap-1 px-6 md:px-10 pt-6" role="group" aria-label={t.title}>
            {topics.map((tp, i) => (
              <button
                key={tp.code}
                type="button"
                onClick={() => go(i)}
                aria-label={`${num(i)} · ${tp.title}`}
                aria-current={i === active ? 'step' : undefined}
                className="group flex-1 py-3 lg:pointer-events-none"
              >
                <span className={`block h-[3px] transition-colors duration-500 ${i <= active ? 'bg-primary' : 'bg-primary/15 group-hover:bg-primary/30'}`} />
              </button>
            ))}
          </div>

          <div className="relative flex-1 grid">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.div
                key={topic.code}
                id="topic-panel"
                role="tabpanel"
                aria-labelledby={`topic-tab-${topic.code}`}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * shift }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -shift }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE_SETTLE }}
                drag={touch ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(active + 1);
                  else if (info.offset.x > 60) go(active - 1);
                }}
                className="[grid-area:1/1] p-6 md:p-10 flex flex-col touch-pan-y"
              >
                <div className="flex items-start gap-5 mb-8">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-primary/40 bg-primary/5 text-primary shadow-[0_0_20px_rgba(143,245,255,0.18)]">
                    <Icon size={26} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-2">
                      {num(active)} · {topic.tech}
                    </p>
                    <h3 className="font-headline text-2xl md:text-4xl font-bold tracking-tighter leading-[1.05] text-on-surface">
                      {topic.title}
                    </h3>
                  </div>
                </div>

                {/* Read top to bottom: the problem, what we do, what you keep */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 mb-8">
                  <div className="bg-surface-container-lowest/70 p-5">
                    <p className="font-mono text-[11px] text-secondary uppercase tracking-widest mb-2">{t.fitLabel}</p>
                    <p className="font-body text-[15px] text-on-surface leading-snug">{topic.fit}</p>
                  </div>
                  <div className="bg-surface-container-lowest/70 p-5">
                    <p className="font-mono text-[11px] text-primary uppercase tracking-widest mb-2">{t.doLabel}</p>
                    <p className="font-body text-[15px] text-on-surface-variant leading-snug">{topic.desc}</p>
                  </div>
                  <div className="bg-surface-container-lowest/70 p-5">
                    <p className="font-mono text-[11px] text-tertiary-dim uppercase tracking-widest mb-2">{t.outcomeLabel}</p>
                    <p className="flex gap-2 font-body text-[15px] text-on-surface leading-snug">
                      <Check size={16} className="text-tertiary-dim flex-shrink-0 mt-0.5" />
                      {topic.outcome}
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button variant="primary" onClick={onBook} className="w-full sm:w-auto justify-center">
                    {t.book}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Back / next — each names where it goes */}
          <div className="grid grid-cols-2 gap-px bg-primary/10 border-t border-primary/10">
            {[
              { to: prev, i: active - 1, label: t.prev, Arrow: ArrowLeft, align: 'text-left' },
              { to: next, i: active + 1, label: t.next, Arrow: ArrowRight, align: 'text-right' },
            ].map(({ to, i, label, Arrow, align }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(i)}
                disabled={!to}
                className={`group flex min-h-[72px] items-center gap-3 bg-surface-container-low px-6 md:px-10 py-4 transition-colors duration-300 hover:bg-surface-container disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                  align === 'text-right' ? 'flex-row-reverse' : ''
                }`}
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-primary/30 text-primary transition-colors group-hover:bg-primary group-hover:text-surface-container-lowest">
                  <Arrow size={18} />
                </span>
                <span className={`min-w-0 ${align}`}>
                  <span className="block font-mono text-[11px] text-outline uppercase tracking-widest">{label}</span>
                  <span className="hidden sm:block font-headline text-sm font-bold text-on-surface tracking-tight truncate">
                    {to?.title ?? '—'}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {touch && <p className="lg:hidden font-mono text-[11px] text-outline uppercase tracking-widest mt-3">{t.swipe}</p>}
    </div>
  );
}
