'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Globe } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import { ClaudeMark, FigmaMark, GitHubMark } from '@/components/ui/BrandMarks';
import { useBookCall } from '@/components/BookCall';
import { track } from '@/lib/analytics';
import { EASE_SETTLE } from '@/lib/animations';
import { SKILLS_DISENO as R, type Tool } from '@/lib/recursos';

const MARKS = { github: GitHubMark, figma: FigmaMark, web: Globe } as const;

/**
 * «Skills de diseño», the free guide behind the Día 4 Instagram carousel.
 * One job: copy the install prompt. The prompt itself is not printed; the
 * button copies it word for word. Content lives in src/lib/recursos.ts.
 */

type CopyState = 'idle' | 'copied' | 'failed';

/** Copies text and reports idle → copied/failed → idle. */
function useCopy(onCopied?: () => void) {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = useCallback(
    async (text: string) => {
      clearTimeout(timer.current);
      try {
        await navigator.clipboard.writeText(text);
        setState('copied');
        onCopied?.();
      } catch {
        setState('failed');
      }
      timer.current = setTimeout(() => setState('idle'), 2400);
    },
    [onCopied],
  );
  return { state, copy };
}

/** Text with `inline code` in backticks. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, i) =>
        i % 2 === 0 ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <code key={i} className="bg-surface-container-highest px-1.5 py-0.5 font-mono text-[0.88em] text-on-surface">
            {part}
          </code>
        ),
      )}
    </>
  );
}

function PromptCard() {
  const p = R.prompt;
  const { state, copy } = useCopy(useCallback(() => track('resource_prompt_copy', { resource: R.slug }), []));
  const copied = state === 'copied';
  return (
    <section aria-labelledby="prompt-heading" className="bg-surface-container-low p-6 md:p-10">
      <h2 id="prompt-heading" className="flex items-center gap-3 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
        <ClaudeMark size={28} className="shrink-0" />
        {p.heading}
      </h2>
      <ol className="mt-6 flex flex-col gap-3">
        {p.steps.map((s, i) => (
          <li key={s} className="flex items-baseline gap-4 font-body text-lg text-on-surface-variant">
            <span aria-hidden className="font-mono text-[12px] text-outline">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => copy(p.text)}
        className={`mt-8 inline-flex min-h-[56px] w-full items-center justify-center gap-3 px-8 font-headline text-[15px] font-bold uppercase tracking-widest transition-[background-color,box-shadow,transform] duration-300 [transition-timing-function:var(--ease-settle)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          copied
            ? 'bg-tertiary-dim text-black shadow-[0_0_20px_rgba(190,238,0,0.25)]'
            : 'bg-primary text-on-primary hover:bg-primary-dim hover:shadow-[0_0_30px_rgba(143,245,255,0.4)]'
        }`}
      >
        {copied ? <Check size={20} aria-hidden /> : <Copy size={20} aria-hidden />}
        <span aria-live="polite">{copied ? p.copied : state === 'failed' ? p.copyFailed : p.copy}</span>
      </button>
      <p className="mt-4 font-body text-[15px] text-on-surface-variant">{p.note}</p>
    </section>
  );
}

/** One thing to type into Claude Code, drawn like the site's input field, with its own copy button. */
function ExampleLine({ tool, text }: { tool: string; text: string }) {
  const { state, copy } = useCopy(useCallback(() => track('resource_snippet_copy', { resource: R.slug, tool }), [tool]));
  const done = state === 'copied';
  return (
    <div className="flex items-stretch border border-outline-variant bg-surface-container-high">
      <span className="flex flex-1 items-center px-4 py-2.5 font-mono text-[13px] leading-snug text-on-surface [overflow-wrap:anywhere]">{text}</span>
      <button
        type="button"
        onClick={() => copy(text)}
        aria-label={done ? R.prompt.copied : `Copiar: ${text}`}
        className={`flex w-11 shrink-0 items-center justify-center border-l border-outline-variant transition-colors duration-300 hover:bg-surface-container-highest focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${done ? 'text-tertiary-dim' : 'text-on-surface-variant hover:text-primary'}`}
      >
        {done ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      </button>
    </div>
  );
}

function Tools() {
  return (
    <section aria-labelledby="tools-heading" className="mt-20 md:mt-32">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="tools-heading" className="font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface md:text-5xl">
          {R.toolsHeading}
        </h2>
        <p className="font-mono text-[12px] uppercase tracking-widest text-outline">{R.toolsNote}</p>
      </div>
      <ul className="flex flex-col gap-px bg-primary/10">
        {R.tools.map((t) => {
          const logo = (t.source as Tool['source']).logo;
          const Mark = MARKS[logo ?? 'web'];
          return (
            <li
              key={t.id}
              className="grid grid-cols-1 gap-4 bg-surface-container-low p-5 transition-colors duration-500 hover:bg-surface-container md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10 md:p-8"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">{t.name}</h3>
                  <span className="font-mono text-[12px] tracking-wider text-outline [font-variant-numeric:tabular-nums]">{t.metric}</span>
                </div>
                <p className="mt-2 font-body text-base leading-relaxed text-on-surface-variant">{t.does}</p>
                <a
                  href={t.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('resource_source_click', { resource: R.slug, tool: t.id, url: t.source.url })}
                  className="mt-1 inline-flex min-h-[44px] items-center gap-2 font-body text-[15px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-300 hover:decoration-primary"
                >
                  <Mark size={18} aria-hidden />
                  {t.author} · {t.source.label}
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
              <div className="md:self-center">
                <p className="mb-2 font-mono text-[12px] uppercase tracking-widest text-outline">{R.tryLabel}</p>
                <ExampleLine tool={t.id} text={t.example} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** William's order as the site's Light Line: cyan from the first step, warming to lime at «publicar». */
function OrderLine() {
  const reduce = useReducedMotion();
  const steps = R.order.steps;
  const last = steps.length - 1;
  const draw = (axis: 'x' | 'y') =>
    reduce
      ? {}
      : {
          initial: axis === 'x' ? { scaleX: 0 } : { scaleY: 0 },
          whileInView: axis === 'x' ? { scaleX: 1 } : { scaleY: 1 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 1.4, ease: EASE_SETTLE },
        };

  return (
    <section aria-labelledby="order-heading" className="mt-20 md:mt-32">
      <h2 id="order-heading" className="mb-10 font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface md:mb-14 md:text-5xl">
        {R.order.heading}
      </h2>
      <div className="relative">
        <motion.div aria-hidden {...draw('x')} className="absolute left-[6px] right-[6px] top-[6px] hidden h-px origin-left bg-gradient-to-r from-primary via-primary to-tertiary-dim lg:block" />
        <motion.div aria-hidden {...draw('y')} className="absolute bottom-3 left-[6px] top-[6px] w-px origin-top bg-gradient-to-b from-primary via-primary to-tertiary-dim lg:hidden" />
        <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-6">
          {steps.map((s, i) => {
            const goal = i === last;
            return (
              <motion.li
                key={s}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: reduce ? 0 : 0.15 + i * 0.12, ease: EASE_SETTLE }}
                className="grid grid-cols-[13px_minmax(0,1fr)] items-start gap-5 lg:block"
              >
                <span
                  aria-hidden
                  className={`block h-[13px] w-[13px] rounded-full ${goal ? 'bg-tertiary-dim shadow-[0_0_20px_rgba(190,238,0,0.25)]' : 'border border-primary bg-surface-container-lowest'}`}
                />
                <p className={`-mt-1.5 font-body text-base leading-relaxed lg:mt-5 ${goal ? 'text-tertiary-dim' : 'text-on-surface-variant'}`}>
                  <Rich text={s} />
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Close() {
  const bookCall = useBookCall();
  const c = R.close;
  return (
    <section
      aria-labelledby="close-heading"
      className="mt-20 flex flex-col gap-8 bg-surface-container-low p-6 md:mt-32 md:p-12 lg:flex-row lg:items-center lg:justify-between"
    >
      <h2 id="close-heading" className="font-headline text-3xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-5xl">
        {c.heading}
      </h2>
      <Button size="lg" onClick={() => bookCall('web')} className="w-full shrink-0 justify-center sm:w-auto">
        {c.cta}
      </Button>
    </section>
  );
}

export default function SkillsDisenoClient() {
  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <header className="rise lg:col-span-6">
              <h1 className="font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] sm:text-5xl xl:text-6xl">
                {R.title}
              </h1>
              <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-on-surface-variant">{R.lead}</p>
            </header>
            <div className="rise lg:col-span-6">
              <PromptCard />
            </div>
          </div>
          <Tools />
          <OrderLine />
          <Close />
        </div>
      </div>
    </AnimatedBackground>
  );
}
