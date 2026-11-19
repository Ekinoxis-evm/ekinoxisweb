'use client';

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import LocalizedLink from '@/components/LocalizedLink';
import { identifyLead, replayUrl, track } from '@/lib/analytics';
import { ACCIONES as R, type Company, type FreeModule } from '@/lib/recursos';

/**
 * «Acciones de EE. UU. tokenizadas», the landing behind the OKX reel. One job: leave an
 * email. The form opens modules 1–2 on this same page; the browser remembers it, and the
 * confirmation email links back with ?abierto=1 so it opens on another phone too.
 * Phase 1 only: this is convenience, not access control (phase 2 adds Privy logins).
 */

const FORM_ID = 'formulario';
const MODULES_ID = 'modulos';

/** Monochrome company mark, painted in the text colour (the SVGs are single-path simple-icons). */
function Logo({ company, size = 'md' }: { company: Company; size?: 'sm' | 'md' }) {
  const src = `url(/recursos/acciones/${company}.svg)`;
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-on-surface ${size === 'sm' ? 'h-6 w-6' : 'h-8 w-8'}`}
      style={{ maskImage: src, WebkitMaskImage: src, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
    />
  );
}

function Source({ children }: { children: string }) {
  return <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-outline">{children}</p>;
}

function Disclaimer({ className = '' }: { className?: string }) {
  return <p className={`font-body text-[15px] text-on-surface-variant ${className}`}>{R.disclaimer}</p>;
}

function SectionHead({ kicker, heading, id }: { kicker: React.ReactNode; heading: string; id: string }) {
  return (
    <div className="mb-8 flex flex-col items-start gap-4">
      {kicker}
      <h2 id={id} className="font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-5xl">
        {heading}
      </h2>
    </div>
  );
}

/* ── 2 · Free modules ─────────────────────────────────────────────────────── */

function ModuleCard({ m, open }: { m: FreeModule; open: boolean }) {
  return (
    <motion.article
      aria-labelledby={`mod-${m.n}`}
      onViewportEnter={open ? () => track('acciones_module_open', { module: Number(m.n) }) : undefined}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-surface-container-low p-6 md:p-10"
    >
      <div className="flex items-baseline gap-4">
        <span aria-hidden className="font-mono text-[12px] text-primary">{m.n}</span>
        <h3 id={`mod-${m.n}`} className="font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
          {m.title}
        </h3>
      </div>
      <p className="mt-3 font-body text-lg leading-relaxed text-on-surface-variant">{m.summary}</p>
      <Source>{m.source}</Source>

      {open ? (
        <>
          <ol className="mt-8 flex flex-col gap-px bg-primary/10">
            {m.steps.map((s) => (
              <li key={s.title} className="bg-surface-container-low py-4">
                <p className="font-body text-base leading-relaxed text-on-surface-variant">
                  <strong className="font-bold text-on-surface">{s.title}</strong> {s.body}
                </p>
                {s.source && <Source>{s.source}</Source>}
              </li>
            ))}
          </ol>
          {m.exercise && (
            <p className="mt-6 border-l-2 border-primary pl-4 font-body text-base leading-relaxed text-on-surface">
              <strong className="font-bold">Ejercicio:</strong> {m.exercise}
            </p>
          )}
          <Disclaimer className="mt-6" />
        </>
      ) : (
        <ScanBadge variant="muted" className="mt-6">{R.free.locked}</ScanBadge>
      )}
    </motion.article>
  );
}

/* ── 6 · Form ─────────────────────────────────────────────────────────────── */

type Status = 'idle' | 'sending' | 'error';

function LeadForm({ notify, setNotify, onDone }: { notify: boolean; setNotify: (v: boolean) => void; onDone: () => void }) {
  const f = R.form;
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});

  const field =
    'w-full bg-surface-container-high border border-outline-variant hover:border-outline focus:border-primary outline-none ' +
    'focus-visible:ring-1 focus-visible:ring-primary text-on-surface font-body text-base px-4 py-3 min-h-[48px] transition-colors';
  const label = 'mb-2 block font-mono text-[12px] uppercase tracking-widest text-on-surface-variant';

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const bad = { name: !name, email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) };
    setErrors(bad);
    if (bad.name || bad.email) {
      e.currentTarget.querySelector<HTMLInputElement>(bad.name ? 'input[name=name]' : 'input[name=email]')?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'course',
          name,
          email,
          whatsapp: String(data.get('whatsapp') ?? ''),
          message: f.message + (notify ? f.messageNotify : ''),
          language: 'es',
          details: { resource: R.slug, ...(notify ? { notify_full: 'yes' } : {}) },
          replay_url: replayUrl(),
          website: String(data.get('website') ?? ''),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const json: unknown = await res.json().catch(() => null);
      const leadId = json && typeof json === 'object' && 'id' in json ? String((json as { id: unknown }).id) : '';
      if (leadId) identifyLead(leadId, { topic: 'course', language: 'es', resource: R.slug });
      track('acciones_form_submit', { notify_paid: notify });
      if (notify) track('acciones_notify_paid');
      onDone();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor={id('name')} className={label}>{f.name}</label>
        <input id={id('name')} name="name" type="text" required maxLength={120} autoComplete="name" aria-invalid={errors.name || undefined} aria-describedby={errors.name ? id('name-err') : undefined} className={field} />
        {errors.name && <p id={id('name-err')} className="mt-2 font-body text-[15px] text-error">{f.nameError}</p>}
      </div>
      <div>
        <label htmlFor={id('email')} className={label}>{f.email}</label>
        <input id={id('email')} name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" aria-invalid={errors.email || undefined} aria-describedby={errors.email ? id('email-err') : undefined} className={field} />
        {errors.email && <p id={id('email-err')} className="mt-2 font-body text-[15px] text-error">{f.emailError}</p>}
      </div>
      <div>
        <label htmlFor={id('wa')} className={label}>{f.whatsapp}</label>
        <input id={id('wa')} name="whatsapp" type="tel" maxLength={40} autoComplete="tel" inputMode="tel" className={field} />
      </div>
      {/* Honeypot: hidden from people, filled by bots; the API answers 200 and saves nothing. */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="flex min-h-[48px] cursor-pointer items-center gap-4 font-body text-base text-on-surface">
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="peer absolute inset-0 cursor-pointer appearance-none border border-outline-variant bg-surface-container-high transition-colors duration-150 checked:border-primary hover:border-outline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
          <Check size={16} strokeWidth={3} aria-hidden className="pointer-events-none relative text-primary opacity-0 peer-checked:opacity-100" />
        </span>
        {f.notify}
      </label>
      {status === 'error' && (
        <p role="alert" className="font-body text-[15px] text-error">{f.networkError}</p>
      )}
      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full justify-center">
        {status === 'sending' ? f.sending : f.submit}
      </Button>
      <p className="font-body text-[15px] text-on-surface-variant">
        {f.after} {R.disclaimer}
      </p>
    </form>
  );
}

function Done({ notify }: { notify: boolean }) {
  const f = R.form;
  return (
    <div role="status" className="border border-tertiary-dim bg-surface-container-low p-6 md:p-10">
      <ScanBadge variant="tertiary">{f.doneBadge}</ScanBadge>
      <p className="mt-4 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{f.doneHeading}</p>
      {notify && <p className="mt-3 font-body text-base text-on-surface-variant">{f.doneNotify}</p>}
      <a
        href={`#${MODULES_ID}`}
        className="mt-6 inline-flex min-h-[48px] items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-tertiary-dim underline decoration-tertiary-dim/40 underline-offset-4 transition-colors duration-150 hover:decoration-tertiary-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {R.free.start}
        <ArrowDown size={16} aria-hidden />
      </a>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AccionesClient() {
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const [barShown, setBarShown] = useState(false);
  const formRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Read after hydration: the server never knows this browser's state.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromEmail = params.get(R.unlockParam) === '1';
    let remembered = false;
    try {
      remembered = localStorage.getItem(R.unlockKey) === '1';
      if (fromEmail) localStorage.setItem(R.unlockKey, '1');
    } catch {
      /* storage blocked: the page still works, it just forgets */
    }
    if (fromEmail || remembered) setOpen(true);
    track('recurso_view', {
      resource: R.slug,
      unlocked: fromEmail || remembered,
      utm_source: params.get('utm_source') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
    });
  }, []);

  // One light per screen: the bar shows only while neither the hero button nor the form is visible.
  useEffect(() => {
    const targets = [heroRef.current, formRef.current].filter((el): el is HTMLElement => el !== null);
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBarShown(visible.size === 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [open]);

  const toForm = useCallback(() => {
    const el = formRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    el.querySelector<HTMLInputElement>('input[name=name]')?.focus({ preventScroll: true });
  }, []);

  const unlock = useCallback(() => {
    setOpen(true);
    try {
      localStorage.setItem(R.unlockKey, '1');
    } catch {
      /* see above */
    }
  }, []);

  const notifyPaid = () => {
    setNotify(true);
    toForm();
  };

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-20 md:gap-32">
          {/* 1 · Hero */}
          <header ref={heroRef} className="rise flex flex-col items-start">
            <ScanBadge>{R.hero.badge}</ScanBadge>
            <h1 className="mt-6 font-headline text-5xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-7xl">
              {R.hero.title}
              <em className="text-primary">{R.hero.titleEm}</em>
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-on-surface-variant">{R.hero.lead}</p>
            <ul className="mt-8 flex items-center gap-6" aria-label="SpaceX, Apple y Anthropic">
              {R.hero.logos.map((c) => (
                <li key={c}>
                  <Logo company={c} />
                </li>
              ))}
            </ul>
            {!open && (
              <Button size="lg" onClick={toForm} className="mt-10 w-full justify-center sm:w-auto">
                {R.hero.cta}
              </Button>
            )}
            <Disclaimer className="mt-4" />
          </header>

          {/* 2 · Free modules */}
          <section id={MODULES_ID} aria-labelledby="free-heading" className="scroll-mt-24">
            <SectionHead id="free-heading" kicker={<ScanBadge>{R.free.badge}</ScanBadge>} heading={R.free.heading} />
            <div className="flex flex-col gap-px bg-primary/10">
              {R.free.modules.map((m) => (
                <ModuleCard key={m.n} m={m} open={open} />
              ))}
            </div>
          </section>

          {/* 3 · Proof */}
          <section aria-labelledby="proof-heading">
            <SectionHead
              id="proof-heading"
              kicker={<p className="font-mono text-[12px] uppercase tracking-widest text-outline">{R.proof.kicker}</p>}
              heading={R.proof.heading}
            />
            <ul className="flex flex-col gap-px bg-primary/10">
              {R.proof.rows.map((r) => (
                <li key={r.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 bg-surface-container-low p-5 md:p-6">
                  <Logo company={r.company} />
                  <div>
                    <p className="font-headline text-xl font-bold text-on-surface">{r.name}</p>
                    <p className="font-body text-[15px] text-on-surface-variant">{r.route}</p>
                  </div>
                  <p className="font-headline text-xl font-bold text-on-surface [font-variant-numeric:tabular-nums]">{r.cost}</p>
                </li>
              ))}
            </ul>
            <Source>{R.proof.note}</Source>
          </section>

          {/* 4 · Paid course */}
          <section aria-labelledby="paid-heading">
            <SectionHead id="paid-heading" kicker={<ScanBadge variant="muted">{R.paid.badge}</ScanBadge>} heading={R.paid.heading} />
            <ol className="flex flex-col gap-px bg-primary/10">
              {R.paid.topics.map((t) => (
                <li key={t.n} className="flex items-baseline gap-4 bg-surface-container-low p-5 md:p-6">
                  <span aria-hidden className="font-mono text-[12px] text-outline">{t.n}</span>
                  <span className="font-body text-lg text-on-surface">{t.title}</span>
                </li>
              ))}
            </ol>

            <h3 className="mt-12 font-headline text-2xl font-bold tracking-tight text-on-surface">{R.paid.catalogHeading}</h3>
            <p className="mt-2 font-body text-base text-on-surface-variant">{R.paid.catalogLead}</p>
            <ul className="mt-6 flex flex-col gap-px bg-primary/10">
              {R.paid.catalog.map((c) => (
                <li key={c.name} className="flex flex-col gap-3 bg-surface-container-low p-5 md:flex-row md:items-center md:gap-6">
                  <div className="flex items-center gap-3 md:w-40 md:shrink-0">
                    <Logo company={c.company} size="sm" />
                    <span className="font-headline text-lg font-bold text-on-surface">{c.name}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label={`Emisores de ${c.name}`}>
                    {c.issuers.map((i) => (
                      <li key={i} className="border border-outline-variant px-2 py-1 font-mono text-[12px] text-on-surface-variant">
                        {i}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <Source>{R.paid.catalogSource}</Source>
            {!open && (
              <Button variant="ghost" size="lg" onClick={notifyPaid} className="mt-8 w-full justify-center sm:w-auto">
                {R.paid.cta}
              </Button>
            )}
          </section>

          {/* 5 · Before buying */}
          <section aria-labelledby="risks-heading">
            <SectionHead
              id="risks-heading"
              kicker={<p className="font-mono text-[12px] uppercase tracking-widest text-outline">{R.risks.kicker}</p>}
              heading={R.risks.heading}
            />
            <ul className="flex flex-col gap-px bg-primary/10">
              {R.risks.items.map((r) => (
                <li key={r.title} className="bg-surface-container-low p-5 md:p-6">
                  <p className="font-headline text-lg font-bold text-on-surface">{r.title}</p>
                  <p className="mt-1 font-body text-base leading-relaxed text-on-surface-variant">{r.body}</p>
                  {'source' in r && r.source && <Source>{r.source}</Source>}
                </li>
              ))}
            </ul>
          </section>

          {/* 6 · Form */}
          <section id={FORM_ID} ref={formRef} aria-labelledby="form-heading" className="scroll-mt-24">
            {open ? (
              <Done notify={notify} />
            ) : (
              <div className="bg-surface-container-low p-6 md:p-10">
                <SectionHead id="form-heading" kicker={<ScanBadge>{R.form.badge}</ScanBadge>} heading={R.form.heading} />
                <LeadForm notify={notify} setNotify={setNotify} onDone={unlock} />
              </div>
            )}
          </section>

          {/* 7 · Who teaches */}
          <section aria-labelledby="teacher-heading">
            <h2 id="teacher-heading" className="font-mono text-[12px] uppercase tracking-widest text-outline">{R.teacher.heading}</h2>
            <p className="mt-3 font-body text-lg leading-relaxed text-on-surface">{R.teacher.body}</p>
            <LocalizedLink
              href="/about"
              className="mt-1 inline-flex min-h-[44px] items-center gap-2 font-body text-[15px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-150 hover:decoration-primary"
            >
              {R.teacher.link}
              <ArrowRight size={14} aria-hidden />
            </LocalizedLink>
          </section>
        </div>
      </div>

      {/* Phones: this page's own bar (the site-wide «book a call» bar is hidden here). */}
      {!open && (
        <>
          <div
            className={`fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-black/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-[transform,opacity] duration-300 [transition-timing-function:var(--ease-settle)] motion-reduce:transition-none md:hidden ${
              barShown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
            }`}
          >
            <button
              type="button"
              onClick={toForm}
              tabIndex={barShown ? 0 : -1}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-primary font-headline text-sm font-bold uppercase tracking-wider text-surface-container-lowest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {R.mobileCta}
              <ArrowRight size={16} aria-hidden />
            </button>
          </div>
          <div className="h-20 md:hidden" aria-hidden />
        </>
      )}
    </AnimatedBackground>
  );
}
