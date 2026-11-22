import type { LucideIcon } from 'lucide-react';
import { Clock, Gift } from 'lucide-react';

export type Fact = { icon: LucideIcon; text: string };

/** One fact per row: icon in primary, text in reading case. Facts are never joined with a dot. */
export default function FactList({ facts, className = '' }: { facts: Fact[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2 font-body text-[15px] text-on-surface ${className}`}>
      {facts.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-start gap-3">
          <Icon size={18} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-primary" />
          {text}
        </li>
      ))}
    </ul>
  );
}

/** The facts behind every «Book your free call» button, in both languages. */
export function FreeCallFacts({ en, className }: { en: boolean; className?: string }) {
  return (
    <FactList
      className={className}
      facts={[
        { icon: Gift, text: en ? 'Free' : 'Gratis' },
        { icon: Clock, text: en ? '30 minutes' : '30 minutos' },
      ]}
    />
  );
}
