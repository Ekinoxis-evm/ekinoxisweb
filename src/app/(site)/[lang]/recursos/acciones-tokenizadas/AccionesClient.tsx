'use client';

import { Fragment, useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import LocalizedLink from '@/components/LocalizedLink';
import { identifyLead, replayUrl, track } from '@/lib/analytics';
import { COUNTRIES } from '@/lib/countries';
import { ACCIONES as R } from '@/lib/recursos';
import type { Logo, TechTile } from '@/lib/acciones/catalog';

/**
 * «Acciones tech tokenizadas»: the page behind the OKX reel (products/digital products/acciones-tokenizadas/landing/DISENO-v3-reserva.md).
 * One action, «Reservar con US$5». Card payment is not live yet, so the button takes the
 * visitor to the interest form; when Stripe is configured it becomes the checkout.
 */

export type BandItem = { name: string; href?: string; logo: Logo | null };

type Metrics = { tech: number; issuers: number; venues: number; max: number; maxName: string };

type SourceItem = { id: string; label: string; url: string | null };

interface Props {
  tiles: TechTile[];
  sources: SourceItem[];
  names: Record<string, string>;
  asOf: string;
  metrics: Metrics;
  tools: BandItem[];
  issuerBand: BandItem[];
}

const FORM_ID = 'reservar';
const SOURCES_ID = 'fuentes';
const CTA = R.price.checkout ? R.reserve.paid : R.reserve.interest;
const label = 'font-mono text-[12px] uppercase tracking-widest text-outline';

/* ── Atoms ────────────────────────────────────────────────────────────────── */

/** Square Raised Tide tile, logo at 60 %. Near-black marks are painted in the text colour; no logo → ticker monogram. */
function LogoTile({ logo, text, className = '' }: { logo: Logo | null; text: string; className?: string }) {
  let mark: React.ReactNode;
  if (!logo) {
    mark = <span className="font-mono text-[12px] font-bold text-on-surface-variant">{text}</span>;
  } else if (logo.mono) {
    const url = `url(${logo.src})`;
    mark = (
      <span
        aria-hidden
        className="h-3/5 w-3/5 bg-on-surface"
        style={{ maskImage: url, WebkitMaskImage: url, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
      />
    );
  } else {
    // eslint-disable-next-line @next/next/no-img-element -- static local SVG/PNG marks, no optimisation needed
    mark = <img src={logo.src} alt="" className="h-3/5 w-3/5 object-contain" loading="lazy" />;
  }
  return <span className={`flex aspect-square items-center justify-center bg-surface-container-high ${className}`}>{mark}</span>;
}

function Disclaimer({ className = '' }: { className?: string }) {
  return <p className={`font-body text-[15px] text-on-surface-variant ${className}`}>{R.disclaimer}</p>;
}

function Heading({ kicker, children, id }: { kicker?: string; children: string; id: string }) {
  return (
    <div className="mb-8">
      {kicker && <p className={`${label} mb-3`}>{kicker}</p>}
      <h2 id={id} className="font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

/* ── Sections ─────────────────────────────────────────────────────────────── */

function MetricsBlock({ m, asOf }: { m: Metrics; asOf: string }) {
  const items: [number, string][] = [
    [m.tech, R.metrics.tech],
    [m.issuers, R.metrics.issuers],
    [m.venues, R.metrics.venues],
    [m.max, R.metrics.max(m.maxName)],
  ];
  return (
    <section aria-labelledby="metrics-heading">
      <h2 id="metrics-heading" className={`${label} mb-4`}>{R.metrics.heading}</h2>
      <dl className="grid grid-cols-2 gap-px bg-primary/10 md:grid-cols-4">
        {items.map(([n, l]) => (
          <div key={l} className="flex flex-col-reverse gap-2 bg-surface-container-low p-5 md:p-6">
            <dt className="font-body text-[15px] leading-snug text-on-surface-variant">{l}</dt>
            <dd className="font-headline text-5xl font-bold tracking-tighter text-on-surface [font-variant-numeric:tabular-nums] md:text-6xl">{n}</dd>
          </div>
        ))}
      </dl>
      <p className={`${label} mt-3 normal-case tracking-wider`}>
        Datos al {asOf} · {R.metrics.sources}
      </p>
    </section>
  );
}

function Band({ title, items }: { title: string; items: BandItem[] }) {
  return (
    <div>
      <h3 className={`${label} mb-4`}>{title}</h3>
      <ul className="flex flex-wrap gap-px bg-primary/10">
        {items.map((it) => {
          const inner = (
            <>
              <LogoTile logo={it.logo} text={it.name.slice(0, 3).toUpperCase()} className="w-12" />
              <span className="font-headline text-base font-bold text-on-surface">{it.name}</span>
            </>
          );
          const cls = 'flex min-h-[64px] items-center gap-3 bg-surface-container-low px-4 py-2';
          return (
            <li key={it.name} className="flex-1 basis-40">
              {it.href ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors duration-150 hover:bg-surface-container focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary`}>
                  {inner}
                </a>
              ) : (
                <span className={cls}>{inner}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** USDT → A or B → «Tienes el token» on one line that warms to lime (DESIGN.md Light Line). */
function Routes() {
  const r = R.routes;
  const [tab, setTab] = useState<'a' | 'b'>('a');
  const node = 'border border-primary bg-surface-container-lowest px-3 py-2 font-mono text-[12px] uppercase tracking-wider text-on-surface';
  const dot = 'h-3 w-3 shrink-0 rounded-full border border-primary bg-surface-container-lowest';
  const nodeText = 'font-mono text-[12px] uppercase tracking-wider';
  return (
    <section aria-labelledby="routes-heading">
      <Heading id="routes-heading" kicker={r.kicker}>{r.heading}</Heading>
      <p className="-mt-4 mb-8 font-body text-lg text-on-surface-variant">{r.lead}</p>

      {/* Phones: the line runs down, splits into two lanes and meets again at the goal. */}
      <div aria-hidden className="mb-10 flex flex-col items-center md:hidden">
        <span className={dot} />
        <span className={`${nodeText} mt-2 text-on-surface`}>{r.start}</span>
        <span className="mt-2 h-6 w-px bg-primary" />
        <span className={dot} />
        <span className={`${nodeText} mt-2 text-on-surface`}>{r.account}</span>
        <span className="mt-2 h-6 w-px bg-primary" />
        <span className="h-px w-1/2 bg-primary" />
        <div className="grid w-full grid-cols-2">
          {[r.aShort, r.bShort].map((lane) => (
            <div key={lane} className="flex flex-col items-center">
              <span className="h-6 w-px bg-primary" />
              <span className={dot} />
              <span className={`${nodeText} my-2 text-on-surface`}>{lane}</span>
              <span className="h-6 w-px bg-gradient-to-b from-primary to-tertiary-dim" />
            </div>
          ))}
        </div>
        <span className="h-px w-1/2 bg-tertiary-dim" />
        <span className="h-6 w-px bg-tertiary-dim" />
        <span className="h-3 w-3 rounded-full bg-tertiary-dim" />
        <span className={`${nodeText} mt-2 text-tertiary-dim`}>{r.goal}</span>
      </div>

      <div aria-hidden className="mb-10 hidden items-center gap-3 md:flex">
        <span className={node}>{r.start}</span>
        <span className="h-px flex-1 bg-primary" />
        <span className={node}>{r.account}</span>
        <span className="h-px flex-1 bg-primary" />
        <span className="flex flex-col gap-2">
          <span className={node}>{r.aShort}</span>
          <span className={node}>{r.bShort}</span>
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-primary to-tertiary-dim" />
        <span className="border border-tertiary-dim px-3 py-2 font-mono text-[12px] uppercase tracking-wider text-tertiary-dim">{r.goal}</span>
      </div>

      {/* Phones: A/B tabs */}
      <div className="md:hidden">
        <div role="tablist" aria-label={r.heading} className="grid grid-cols-2 gap-px bg-primary/10">
          {(['a', 'b'] as const).map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`min-h-[48px] px-3 font-headline text-sm font-bold uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                tab === k ? 'bg-surface-container-high text-primary' : 'bg-surface-container-low text-on-surface-variant'
              }`}
            >
              {k === 'a' ? r.aShort : r.bShort}
            </button>
          ))}
        </div>
        <dl role="tabpanel" className="flex flex-col gap-px bg-primary/10">
          {r.rows.map((row) => (
            <div key={row.label} className="bg-surface-container-low p-5">
              <dt className={label}>{row.label}</dt>
              <dd className="mt-2 font-body text-base leading-relaxed text-on-surface">{tab === 'a' ? row.a : row.b}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Desktop: side by side */}
      <table className="hidden w-full border-collapse md:table">
        <thead>
          <tr>
            <th className="w-1/4" />
            <th scope="col" className="bg-surface-container-high p-5 text-left font-headline text-lg font-bold text-on-surface">{r.a}</th>
            <th scope="col" className="bg-surface-container-high p-5 text-left font-headline text-lg font-bold text-on-surface">{r.b}</th>
          </tr>
        </thead>
        <tbody>
          {r.rows.map((row) => (
            <tr key={row.label} className="border-t border-primary/10">
              <th scope="row" className={`${label} p-5 text-left align-top font-normal`}>{row.label}</th>
              <td className="bg-surface-container-low p-5 align-top font-body text-base leading-relaxed text-on-surface">{row.a}</td>
              <td className="bg-surface-container-low p-5 align-top font-body text-base leading-relaxed text-on-surface">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/** Columns of the tile grid; the panel opens under the row of the tapped tile. */
function useCols() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = () => setCols(mq.matches ? 8 : 4);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return cols;
}

function TechGrid({ tiles, names, asOf }: { tiles: TechTile[]; names: Record<string, string>; asOf: string }) {
  const t = R.tech;
  const cols = useCols();
  const [open, setOpen] = useState<string | null>(null);
  const openIdx = tiles.findIndex((x) => x.slug === open);
  const rowEnd = openIdx < 0 ? -1 : Math.min(tiles.length - 1, Math.floor(openIdx / cols) * cols + cols - 1);
  const sel = openIdx >= 0 ? tiles[openIdx] : null;

  const toggle = (slug: string) => {
    if (open !== slug) track('tech_tile_open', { slug });
    setOpen((cur) => (cur === slug ? null : slug));
  };

  return (
    <section aria-labelledby="tech-heading">
      <Heading id="tech-heading" kicker={t.kicker}>{t.heading}</Heading>
      <p className="-mt-4 mb-6 font-body text-lg text-on-surface-variant">{t.lead}</p>
      <ul className="grid grid-cols-4 gap-px bg-primary/10 md:grid-cols-8">
        {tiles.map((tile, i) => (
          <Fragment key={tile.slug}>
            <li>
              <button
                type="button"
                onClick={() => toggle(tile.slug)}
                aria-expanded={open === tile.slug}
                aria-controls="tech-panel"
                aria-label={tile.name}
                className={`flex w-full flex-col items-center gap-2 p-3 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                  open === tile.slug ? 'bg-surface-container-high' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <LogoTile logo={tile.logo} text={tile.ticker} className="w-full" />
                {tile.logo && <span className={`font-mono text-[12px] ${open === tile.slug ? 'text-primary' : 'text-on-surface-variant'}`}>{tile.ticker}</span>}
              </button>
            </li>
            {i === rowEnd && sel && (
              <li id="tech-panel" className="col-span-4 border-l-2 border-outline-variant bg-surface-container p-5 md:col-span-8 md:p-6">
                <p className="font-headline text-2xl font-bold tracking-tight text-on-surface">{sel.name}</p>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className={label}>{t.routeA}</p>
                    <p className="mt-2 font-body text-base text-on-surface">
                      {sel.venues.length ? sel.venues.map((v) => names[v] ?? v).join(' · ') : t.none}
                    </p>
                  </div>
                  <div>
                    <p className={label}>{t.routeB(sel.issuers.length)}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {sel.issuers.map((id) => (
                        <li key={id} className="border border-outline-variant px-2 py-1 font-mono text-[12px] text-on-surface-variant">{names[id] ?? id}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className={`${label} mt-5 normal-case tracking-wider`}>
                  {t.sources(asOf)} ·{' '}
                  <a href={`#${SOURCES_ID}`} className="inline-flex min-h-[44px] items-center text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    {t.sourcesLink}
                  </a>
                </p>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
      <p className={`${label} mt-3 normal-case tracking-wider`}>{t.note(asOf)}</p>
    </section>
  );
}

/** The real purchase, muted and looping; under reduced motion it waits for a tap. */
function Clip() {
  const c = R.clip;
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  // React does not render `muted` as an attribute, which blocks autoplay; set it and start by hand.
  useEffect(() => {
    const v = ref.current;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduce(still);
    if (!v || still) return;
    v.muted = true;
    v.play().catch(() => setReduce(true));
  }, []);
  return (
    <figure className="flex flex-col items-center gap-3">
      <video
        ref={ref}
        src={c.src}
        poster={c.poster}
        muted
        playsInline
        loop
        controls={reduce}
        preload="metadata"
        aria-label={c.caption}
        className="w-full max-w-[280px] border border-outline-variant bg-surface-container-lowest"
      />
      <figcaption className="text-center">
        <span className="block font-body text-[15px] text-on-surface">{c.caption}</span>
        <span className={`${label} normal-case tracking-wider`}>{c.source}</span>
      </figcaption>
    </figure>
  );
}

function ReserveButton({ position, onReserve, className = '' }: { position: string; onReserve: (p: string) => void; className?: string }) {
  return (
    <Button size="lg" onClick={() => onReserve(position)} className={`w-full justify-center sm:w-auto ${className}`}>
      {CTA}
    </Button>
  );
}

function Course({ onReserve }: { onReserve: (p: string) => void }) {
  const c = R.course;
  const { total, opens, refund, reserve } = R.price;
  const details = [total !== null ? c.rest(total - reserve) : null, opens, refund].filter((x): x is string => Boolean(x));
  return (
    <section aria-labelledby="course-heading">
      <Heading id="course-heading" kicker={c.kicker}>{c.heading}</Heading>
      <ol className="flex flex-col gap-px bg-primary/10">
        {c.modules.map((m) => (
          <li key={m.n} className="flex items-baseline gap-4 bg-surface-container-low p-5 md:p-6">
            <span aria-hidden className="font-mono text-[12px] text-primary">{m.n}</span>
            <div>
              <p className="font-headline text-xl font-bold text-on-surface">{m.title}</p>
              <p className="mt-1 font-body text-base leading-relaxed text-on-surface-variant">{m.desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-px flex flex-col gap-5 bg-surface-container-high p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="font-headline text-3xl font-bold tracking-tight text-on-surface">{R.price.checkout ? c.today.paid : c.today.interest}</p>
          {details.length > 0 && <p className="mt-1 font-body text-base text-on-surface-variant">{details.join(' · ')}</p>}
        </div>
        <ReserveButton position="precio" onReserve={onReserve} />
      </div>
      <Disclaimer className="mt-4" />
    </section>
  );
}

type Status = 'idle' | 'sending' | 'error' | 'done';

function ReserveForm() {
  const f = R.form;
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; email?: boolean }>({});
  const field =
    'w-full bg-surface-container-high border border-outline-variant hover:border-outline focus:border-primary outline-none ' +
    'focus-visible:ring-1 focus-visible:ring-primary text-on-surface font-body text-base px-4 py-3 min-h-[48px] transition-colors';
  const fieldLabel = 'mb-2 block font-mono text-[12px] uppercase tracking-widest text-on-surface-variant';

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const bad = {
      name: !name,
      phone: !/^[0-9 ()-]{6,20}$/.test(phone),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    };
    setErrors(bad);
    const first = (['name', 'phone', 'email'] as const).find((k) => bad[k]);
    if (first) {
      form.querySelector<HTMLInputElement>(`input[name=${first}]`)?.focus();
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
          whatsapp: `${String(data.get('country') ?? '')} ${phone}`,
          message: f.message,
          language: 'es',
          details: { resource: R.slug },
          replay_url: replayUrl(),
          website: String(data.get('website') ?? ''),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const json: unknown = await res.json().catch(() => null);
      const leadId = json && typeof json === 'object' && 'id' in json ? String((json as { id: unknown }).id) : '';
      if (leadId) identifyLead(leadId, { topic: 'course', language: 'es', resource: R.slug });
      track('acciones_form_submit');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="border border-tertiary-dim bg-surface-container-low p-6 md:p-10">
        <ScanBadge variant="tertiary">{f.doneBadge}</ScanBadge>
        <p className="mt-4 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{f.doneHeading}</p>
        <p className="mt-3 font-body text-base text-on-surface-variant">{f.doneBody}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low p-6 md:p-10">
      <h2 id="form-heading" className="font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">{f.heading}</h2>
      <p className="mt-3 font-body text-base text-on-surface-variant">{f.lead}</p>
      <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-6">
        <div>
          <label htmlFor={id('name')} className={fieldLabel}>{f.name}</label>
          <input id={id('name')} name="name" type="text" required maxLength={60} autoComplete="given-name" aria-invalid={errors.name || undefined} aria-describedby={errors.name ? id('name-err') : undefined} className={field} />
          {errors.name && <p id={id('name-err')} className="mt-2 font-body text-[15px] text-error">{f.nameError}</p>}
        </div>
        <div>
          <label htmlFor={id('phone')} className={fieldLabel}>{f.phone}</label>
          <div className="flex">
            <select name="country" aria-label={f.country} defaultValue="+57" className={`${field.replace('w-full ', '')} w-[6.75rem] shrink-0 border-r-0 px-3`}>
              {COUNTRIES.map((c) => (
                <option key={c.code + c.name} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input id={id('phone')} name="phone" type="tel" required inputMode="tel" maxLength={20} autoComplete="tel-national" placeholder="300 123 4567" aria-invalid={errors.phone || undefined} aria-describedby={errors.phone ? id('phone-err') : undefined} className={`${field} min-w-0 flex-1`} />
          </div>
          {errors.phone && <p id={id('phone-err')} className="mt-2 font-body text-[15px] text-error">{f.phoneError}</p>}
        </div>
        <div>
          <label htmlFor={id('email')} className={fieldLabel}>{f.email}</label>
          <input id={id('email')} name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" aria-invalid={errors.email || undefined} aria-describedby={errors.email ? id('email-err') : undefined} className={field} />
          {errors.email && <p id={id('email-err')} className="mt-2 font-body text-[15px] text-error">{f.emailError}</p>}
        </div>
        {/* Honeypot: hidden from people, filled by bots; the API answers 200 and saves nothing. */}
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        {status === 'error' && <p role="alert" className="font-body text-[15px] text-error">{f.networkError}</p>}
        <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full justify-center">
          {status === 'sending' ? f.sending : f.submit}
        </Button>
        <Disclaimer />
      </form>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AccionesClient({ tiles, sources, names, asOf, metrics, tools, issuerBand }: Props) {
  const [barShown, setBarShown] = useState(false);
  const formRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const wall = R.hero.wall
    .map((s) => tiles.find((t) => t.slug === s))
    .filter((t): t is TechTile => t?.logo != null)
    .slice(0, 8);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    track('recurso_view', {
      resource: R.slug,
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
  }, []);

  const reserve = useCallback((position: string) => {
    track('reserve_click', { position });
    const el = formRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    el.querySelector<HTMLInputElement>('input[name=name]')?.focus({ preventScroll: true });
  }, []);

  const { total } = R.price;

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-20 md:gap-32">
          {/* 1 · Hero */}
          <header ref={heroRef} className="rise flex flex-col items-start">
            <ScanBadge>{R.hero.badge}</ScanBadge>
            <h1 className="mt-6 font-headline text-5xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-7xl">
              {R.hero.title}
              <em className="text-primary">{R.hero.titleEm}</em>
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant">{R.hero.lead}</p>
            <ul className="mt-8 grid w-full max-w-xl grid-cols-4 gap-px bg-primary/10 sm:grid-cols-8" aria-label={wall.map((t) => t.name).join(', ')}>
              {wall.map((t) => (
                <li key={t.slug}>
                  <LogoTile logo={t.logo} text={t.ticker} className="w-full" />
                </li>
              ))}
            </ul>
            <ReserveButton position="hero" onReserve={reserve} className="mt-10" />
            <p className="mt-4 font-body text-[15px] text-on-surface-variant">
              {total !== null && `${R.restLine(total)} `}
              {R.disclaimer}
            </p>
          </header>

          <Clip />

          <MetricsBlock m={metrics} asOf={asOf} />

          <section aria-label={`${R.bands.tools} · ${R.bands.issuers}`} className="flex flex-col gap-10">
            <Band title={R.bands.tools} items={tools} />
            <Band title={R.bands.issuers} items={issuerBand} />
          </section>

          <Routes />
          <TechGrid tiles={tiles} names={names} asOf={asOf} />
          <Course onReserve={reserve} />

          <section aria-labelledby="risks-heading">
            <Heading id="risks-heading" kicker={R.risks.kicker}>{R.risks.heading}</Heading>
            <ul className="flex flex-col gap-px bg-primary/10">
              {R.risks.items.map((r) => (
                <li key={r.title} className="bg-surface-container-low p-5 md:p-6">
                  <p className="font-headline text-lg font-bold text-on-surface">{r.title}</p>
                  <p className="mt-1 font-body text-base leading-relaxed text-on-surface-variant">{r.body}</p>
                  {'source' in r && <p className={`${label} mt-2 normal-case tracking-wider`}>{r.source}</p>}
                </li>
              ))}
            </ul>
          </section>

          <section id={FORM_ID} ref={formRef} aria-labelledby="form-heading" className="scroll-mt-24">
            <ReserveForm />
          </section>

          <section id={SOURCES_ID} aria-labelledby="sources-heading" className="scroll-mt-24">
            <h2 id="sources-heading" className={label}>{R.sourcesList.heading}</h2>
            <ul className="mt-3 flex flex-col">
              {sources.map((s) => (
                <li key={s.id} className="font-body text-[15px] text-on-surface-variant">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center underline decoration-outline underline-offset-4 hover:text-primary">
                      {s.label}
                    </a>
                  ) : (
                    <span className="inline-flex min-h-[44px] items-center">{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="teacher-heading">
            <h2 id="teacher-heading" className={label}>{R.teacher.heading}</h2>
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
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-black/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-[transform,opacity] duration-300 [transition-timing-function:var(--ease-settle)] motion-reduce:transition-none md:hidden ${
          barShown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => reserve('barra')}
          tabIndex={barShown ? 0 : -1}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-primary font-headline text-sm font-bold uppercase tracking-wider text-surface-container-lowest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {CTA}
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </AnimatedBackground>
  );
}
