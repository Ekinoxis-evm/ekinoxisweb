import { phaseForStatus } from '@/lib/portfolio';
import type { ProductWithRelations } from '@/lib/supabase/types';

const TONE = {
  muted: 'text-on-surface-variant border-outline-variant',
  primary: 'text-primary border-primary/50',
  secondary: 'text-secondary border-secondary/50',
  tertiary: 'text-tertiary-dim border-tertiary-dim/60',
} as const;

const DOT = {
  muted: 'bg-outline',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary-dim',
} as const;

/** The 2px rule along a card's top edge: the phase, readable before any text. */
export const PHASE_RULE = {
  muted: 'bg-outline-variant',
  primary: 'bg-primary/40',
  secondary: 'bg-secondary/70',
  tertiary: 'bg-tertiary-dim',
} as const;

/** Solid-backed so it stays legible over a screenshot; Live is the only one that pulses. */
export default function PhaseTag({ status, language }: { status: ProductWithRelations['status']; language: 'en' | 'es' }) {
  const phase = phaseForStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-2 border bg-surface-container-lowest/90 px-2.5 py-1.5 font-mono text-[12px] uppercase tracking-widest backdrop-blur-sm ${TONE[phase.variant]}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${DOT[phase.variant]} ${phase.key === 'live' ? 'animate-pulse motion-reduce:animate-none' : ''}`}
      />
      {phase[language].label}
    </span>
  );
}
