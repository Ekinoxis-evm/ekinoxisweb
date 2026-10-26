'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import { Eye, Flag, Hammer, MessageSquare, PenTool, RefreshCw, Search, Shuffle, type LucideIcon } from 'lucide-react';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export type FlowStep = { num: string; title: string; desc: string; chip: string };

export type BuildLoopCopy = {
  label: string;
  title: string;
  steps: [FlowStep, FlowStep, FlowStep, FlowStep];
  /** The four beats of one round, clockwise from the top */
  round: [string, string, string, string];
  center: string;
};

const STEP_ICONS: LucideIcon[] = [Search, PenTool, RefreshCw, Flag];
const ROUND_ICONS: LucideIcon[] = [Hammer, Eye, MessageSquare, Shuffle];

/** Ring geometry, in viewBox units */
const C = 160;
const R = 118;
const pt = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  // Rounded so server and browser print the same path (no hydration mismatch)
  return [Math.round((C + R * Math.cos(a)) * 100) / 100, Math.round((C + R * Math.sin(a)) * 100) / 100] as const;
};
/** Clockwise arcs between the four beats (top, right, bottom, left), leaving room for the labels */
const ARCS = [-90, 0, 90, 180].map((start) => {
  const [x1, y1] = pt(start + 24);
  const [x2, y2] = pt(start + 66);
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
});
/** Where each beat's label sits, as % of the box */
const BEAT_POS = [
  'left-1/2 top-[13%] -translate-x-1/2 -translate-y-1/2',
  'left-[87%] top-1/2 -translate-x-1/2 -translate-y-1/2',
  'left-1/2 top-[87%] -translate-x-1/2 -translate-y-1/2',
  'left-[13%] top-1/2 -translate-x-1/2 -translate-y-1/2',
];

/** The feedback loop: build → show → hear back → adjust, around and around until it fits. */
function Ring({ round, center, icons, className = '' }: { round: BuildLoopCopy['round']; center: string; icons: LucideIcon[]; className?: string }) {
  const arrow = `loop-arrow-${useId().replace(/:/g, '')}`;
  return (
    <div className={`relative aspect-square ${className}`}>
      {/* A solid disc, so the step line stops at the ring instead of crossing it */}
      <div className="absolute inset-[13%] rounded-full bg-surface-container-low shadow-[0_0_40px_rgba(143,245,255,0.08)]" />
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <marker id={arrow} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#8ff5ff" />
          </marker>
        </defs>
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(143,245,255,0.08)" strokeWidth="1" />
        {ARCS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#8ff5ff"
            strokeOpacity="0.7"
            strokeWidth="1.5"
            markerEnd={`url(#${arrow})`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.3, ease: 'easeOut' }}
          />
        ))}
      </svg>
      {/* A pulse travelling the ring — one round after another */}
      <div className="absolute inset-[13%] animate-[spin_9s_linear_infinite] motion-reduce:animate-none" aria-hidden>
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_rgba(143,245,255,0.9)]" />
      </div>
      {round.map((beat, i) => {
        const Icon = icons[i];
        return (
          <div key={beat} className={`absolute ${BEAT_POS[i]} flex flex-col items-center gap-1 bg-surface-container-low px-2 py-1`}>
            <Icon size={16} strokeWidth={1.75} className="text-primary" />
            <span className="font-label text-[12px] font-semibold uppercase tracking-wide text-on-surface whitespace-nowrap">{beat}</span>
          </div>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="max-w-[40%] text-center font-headline text-base font-bold leading-tight tracking-tight text-tertiary-dim">{center}</span>
      </div>
    </div>
  );
}

/**
 * How we build, drawn: a start, a first version, then rounds with the client
 * until it fits. Connected steps like the consultation flow, with the loop drawn
 * out where the real work happens. Used by app building and websites.
 */
export default function BuildLoop({
  t,
  stepIcons = STEP_ICONS,
  roundIcons = ROUND_ICONS,
}: {
  t: BuildLoopCopy;
  stepIcons?: LucideIcon[];
  roundIcons?: LucideIcon[];
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className="bg-surface-container-low p-6 md:p-10 mt-px"
    >
      <div className="mb-10 md:mb-14">
        <div className="mb-4">
          <ScanBadge variant="muted">{t.label}</ScanBadge>
        </div>
        <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface">{t.title}</h2>
      </div>

      {/* Laptop: the line runs through the loop — the ring is step 03, sitting on it */}
      <ol className="relative grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.4fr_1fr] gap-10 lg:gap-6">
        <motion.div
          aria-hidden
          className="hidden lg:block absolute top-[130px] left-[11%] right-[11%] h-px bg-gradient-to-r from-primary/70 via-primary/40 to-tertiary-dim/70 origin-left"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.4, ease: 'easeOut', delay: 0.3 } } }}
        />
        <motion.div
          aria-hidden
          className="lg:hidden absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-primary/70 to-tertiary-dim/70 origin-top"
          variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1.4, ease: 'easeOut', delay: 0.3 } } }}
        />
        {t.steps.map((step, idx) => {
          const Icon = stepIcons[idx];
          const isLoop = idx === 2;
          const isGoal = idx === 3;
          return (
            <motion.li
              key={step.num}
              variants={fadeInUp}
              className={`relative flex lg:flex-col lg:items-center lg:text-center gap-5 lg:gap-0 ${isLoop ? '' : 'lg:pt-[102px]'}`}
            >
              {/* Node on the line; on laptop the loop step is the ring itself */}
              <div
                className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border ${isLoop ? 'lg:hidden' : ''} ${
                  isLoop
                    ? 'border-primary bg-primary text-surface-container-lowest shadow-[0_0_28px_rgba(143,245,255,0.45)]'
                    : isGoal
                      ? 'border-tertiary-dim bg-surface-container-lowest text-tertiary-dim shadow-[0_0_20px_rgba(190,238,0,0.25)]'
                      : 'border-primary/40 bg-surface-container-lowest text-primary'
                }`}
              >
                <Icon size={22} strokeWidth={1.75} />
              </div>
              {isLoop && <Ring round={t.round} center={t.center} icons={roundIcons} className="hidden lg:block relative z-10 w-[260px]" />}
              <div className="lg:mt-6 min-w-0 flex-1 lg:flex-none">
                <p className="font-mono text-[12px] text-outline tracking-widest mb-1">{step.num}</p>
                <h3 className="font-headline text-lg font-bold tracking-tight text-on-surface mb-2">{step.title}</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-4 lg:max-w-[260px] lg:mx-auto">{step.desc}</p>
                <ScanBadge variant={isLoop ? 'primary' : isGoal ? 'tertiary' : 'muted'}>{step.chip}</ScanBadge>
                {/* Phones: the loop sits inside its step, on the vertical line */}
                {isLoop && <Ring round={t.round} center={t.center} icons={roundIcons} className="lg:hidden mt-8 -ml-2 w-full max-w-[280px]" />}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.section>
  );
}
