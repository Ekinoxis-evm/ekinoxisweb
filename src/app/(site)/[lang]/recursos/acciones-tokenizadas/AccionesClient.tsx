'use client';

import { Fragment, useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import LocalizedLink from '@/components/LocalizedLink';
import LogoMarquee from '@/components/LogoMarquee';
import { identifyLead, replayUrl, track } from '@/lib/analytics';
import { COUNTRIES } from '@/lib/countries';
import { ACCIONES as R } from '@/lib/recursos';
import type { IssuerStat, Logo, TechTile } from '@/lib/acciones/catalog';

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
  issuers: IssuerStat[];
  names: Record<string, string>;
  asOf: string;
  metrics: Metrics;
  tools: BandItem[];
  issuerBand: BandItem[];
}

const FORM_ID = 'reservar';
const SOURCES_ID = 'fuentes';
const { presale } = R.price;
const CTA = presale ? R.reserve.presale(presale.amount) : R.price.checkout ? R.reserve.paid : R.reserve.interest;
const num = (n: number) => n.toLocaleString('es-CO');
const label = 'font-mono text-[12px] uppercase tracking-widest text-outline';

/* ── Atoms ────────────────────────────────────────────────────────────────── */

/** Square Raised Tide tile, logo at 60 % (wordmarks 80 % wide). Near-black marks are painted in the text colour; no logo → ticker monogram. */
function LogoTile({ logo, text, className = '' }: { logo: Logo | null; text: string; className?: string }) {
  let mark: React.ReactNode;
  if (!logo) {
    mark = <span className="font-mono text-[12px] font-bold text-on-surface-variant">{text}</span>;
  } else if (logo.mono) {
    const url = `url(${logo.src})`;
    mark = (
      <span
        aria-hidden
        className={`h-3/5 bg-on-surface ${logo.wide ? 'w-4/5' : 'w-3/5'}`}
        style={{ maskImage: url, WebkitMaskImage: url, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}
      />
    );
  } else {
    // eslint-disable-next-line @next/next/no-img-element -- static local SVG/PNG marks, no optimisation needed
    mark = <img src={logo.src} alt="" className={`h-3/5 object-contain ${logo.wide ? 'w-4/5' : 'w-3/5'}`} loading="lazy" />;
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

/** Each issuer: logo, how many companies it tokenizes (bar to scale) and, when published, its volume. */
function IssuersBlock({ issuers, asOf }: { issuers: IssuerStat[]; asOf: string }) {
  const b = R.issuersBlock;
  const max = Math.max(...issuers.map((i) => i.stocks));
  return (
    <section aria-labelledby="issuers-heading" className="mt-10">
      <h2 id="issuers-heading" className={`${label} mb-4`}>{b.heading}</h2>
      <ul className="flex flex-col gap-px bg-primary/10">
        {issuers.map((i) => {
          const floor = (b.partial as readonly string[]).includes(i.id);
          return (
            <li key={i.id} className="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 bg-surface-container-low p-4 md:grid-cols-[2.75rem_10rem_minmax(0,1fr)_12rem] md:p-5">
              <LogoTile logo={i.logo} text={i.name.slice(0, 3).toUpperCase()} className="w-11" />
              <p className="font-headline text-lg font-bold text-on-surface">{i.name}</p>
              <div className="order-last col-span-3 md:order-none md:col-span-1">
                <span aria-hidden className="block h-2 bg-surface-container-highest">
                  <span className="block h-full origin-left bg-primary" style={{ transform: `scaleX(${i.stocks / max})` }} />
                </span>
              </div>
              <div className="text-right">
                {floor && <p className="font-body text-[12px] text-on-surface-variant">{b.atLeast}</p>}
                <p className="font-headline text-xl font-bold text-on-surface [font-variant-numeric:tabular-nums]">{b.stocks(num(i.stocks))}</p>
                {i.volume && (
                  <p className="font-body text-[15px] text-on-surface-variant">
                    US${num(i.volume.usd)} · {i.volume.period}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className={`${label} mt-3 normal-case tracking-wider`}>{b.note(asOf)}</p>
    </section>
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

/** Deterministic 0..1 values from a slug, so positions match on server and client. */
function seeds(slug: string): [number, number, number] {
  let h = 2166136261;
  for (const ch of slug) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const r = (k: number) => ((Math.imul(h ^ k, 2654435761) >>> 0) % 1000) / 1000;
  return [r(1), r(2), r(3)];
}

/** Three depth layers: far logos are smaller and drift less. Sizes leave room for the 20px float between rows. */
const LAYER = ['h-11 w-11 md:h-12 md:w-12', 'h-12 w-12 md:h-14 md:w-14', 'h-[3.25rem] w-[3.25rem] md:h-16 md:w-16'] as const;

function useUniverseCols() {
  const [cols, setCols] = useState(5);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = () => setCols(mq.matches ? 8 : 5);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return cols;
}

/**
 * The 40 companies as a floating field: each logo sits on a jittered grid cell at one of three
 * depths, bobs on its own clock and leans away from the cursor by its depth. Transform only;
 * reduced motion keeps it still. Tapping a logo opens its panel under the field.
 */
function Universe({ tiles, names, asOf }: { tiles: TechTile[]; names: Record<string, string>; asOf: string }) {
  const t = R.tech;
  const cols = useUniverseCols();
  const rows = Math.ceil(tiles.length / cols);
  const field = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const sel = tiles.find((x) => x.slug === open) ?? null;

  const lean = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = field.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--mx', String(((e.clientX - box.left) / box.width) * 2 - 1));
    el.style.setProperty('--my', String(((e.clientY - box.top) / box.height) * 2 - 1));
  };
  const rest = () => {
    field.current?.style.setProperty('--mx', '0');
    field.current?.style.setProperty('--my', '0');
  };

  const pick = (slug: string) => {
    if (open !== slug) track('tech_tile_open', { slug });
    setOpen((cur) => (cur === slug ? null : slug));
  };

  return (
    <section aria-labelledby="tech-heading">
      <Heading id="tech-heading" kicker={t.kicker}>{t.heading}</Heading>
      <p className="-mt-4 mb-6 font-body text-lg text-on-surface-variant">{t.lead}</p>
      <div
        ref={field}
        onPointerMove={lean}
        onPointerLeave={rest}
        className="relative h-[700px] overflow-hidden border border-primary/10 bg-surface-container-lowest md:h-[520px]"
      >
        <ul aria-label={t.kicker}>
          {tiles.map((tile, i) => {
            const [jx, jy, jd] = seeds(tile.slug);
            const layer = jd < 0.34 ? 0 : jd < 0.67 ? 1 : 2;
            // Sideways jitter only where cells are wide; the float supplies the vertical life.
            // A margin keeps the lean from pushing a logo off the field.
            const spread = cols === 8 ? 0.3 : 0.1;
            const x = 0.07 + 0.86 * (((i % cols) + 0.5 + (jx - 0.5) * spread) / cols);
            const y = 0.08 + 0.84 * ((Math.floor(i / cols) + 0.5) / rows);
            const active = open === tile.slug;
            return (
              <li
                key={tile.slug}
                className="absolute -translate-x-1/2 -translate-y-1/2 hover:!z-20 focus-within:!z-20"
                style={{ left: `${x * 100}%`, top: `${y * 100}%`, zIndex: layer + 1 }}
              >
                <span
                  className="block transition-transform duration-300 ease-out motion-reduce:transition-none"
                  style={{ transform: `translate(calc(var(--mx, 0) * ${-(layer + 1) * 10}px), calc(var(--my, 0) * ${-(layer + 1) * 10}px))` }}
                >
                  <button
                    type="button"
                    onClick={() => pick(tile.slug)}
                    aria-expanded={active}
                    aria-controls="tech-panel"
                    aria-label={tile.name}
                    className={`group relative block animate-float motion-reduce:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${active ? 'outline outline-2 outline-offset-2 outline-primary' : ''}`}
                    style={{ animationDelay: `${-jx * 6}s`, animationDuration: `${5 + jy * 4}s` }}
                  >
                    <LogoTile logo={tile.logo} text={tile.ticker} className={`${LAYER[layer]} border border-primary/10 transition-colors duration-150 group-hover:border-primary/50`} />
                    {/* Ticker on hover, focus or selection; monogram tiles already show it. */}
                    {tile.logo && (
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-surface-container-lowest px-1 font-mono text-[12px] text-outline transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${active ? 'opacity-100' : 'opacity-0'}`}
                      >
                        {tile.ticker}
                      </span>
                    )}
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {sel && (
        <div id="tech-panel" role="region" aria-label={sel.name} className="border-l-2 border-outline-variant bg-surface-container p-5 md:p-6">
          <p className="font-headline text-2xl font-bold tracking-tight text-on-surface">
            {sel.name} <span className="font-mono text-[12px] font-normal text-outline">{sel.ticker}</span>
          </p>
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
        </div>
      )}
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
    <span data-cta className={`block w-full sm:w-auto ${className}`}>
      <Button size="lg" onClick={() => onReserve(position)} className="w-full justify-center sm:w-auto">
        {CTA}
      </Button>
    </span>
  );
}

function Course({ onReserve }: { onReserve: (p: string) => void }) {
  const c = R.course;
  const { total, opens, refund, reserve } = R.price;
  const details = [total !== null ? c.rest(total - reserve) : null, opens, refund].filter((x): x is string => Boolean(x));
  return (
    <section aria-labelledby="course-heading">
      <Heading id="course-heading" kicker={c.kicker}>{c.heading}</Heading>
      <p className="-mt-4 mb-8 font-body text-lg text-on-surface-variant">{c.format}</p>
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
          <p className="font-headline text-3xl font-bold tracking-tight text-on-surface">
            {presale ? R.presaleLine(presale.until, presale.after) : R.price.checkout ? c.today.paid : c.today.interest}
          </p>
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
        <span data-cta className="block">
          <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full justify-center">
            {status === 'sending' ? f.sending : f.submit}
          </Button>
        </span>
        <Disclaimer />
      </form>
    </div>
  );
}

/** Bands show official logos only; an entry without a file stays out until one lands. */
const marquee = (items: BandItem[]) =>
  items.flatMap((it) => (it.logo ? [{ name: it.name, src: it.logo.src, href: it.href }] : []));

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AccionesClient({ tiles, sources, issuers, names, asOf, metrics, tools, issuerBand }: Props) {
  const [barShown, setBarShown] = useState(false);
  const formRef = useRef<HTMLElement>(null);
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

  // One light per screen: the bar shows only while no other «Reservar» button and no form submit is visible.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-cta]'));
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
      <div className="px-4 pb-20 pt-12 sm:px-6 md:pb-32 md:pt-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-20 md:gap-32">
          {/* 1 · Hero: copy left, the real purchase right from lg; stacked on phones */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <header className="rise flex flex-col items-start lg:col-span-7">
            <ScanBadge>{R.hero.badge}</ScanBadge>
            <h1 className="mt-6 font-headline text-5xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-7xl">
              {R.hero.title}
              <em className="text-primary">{R.hero.titleEm}</em>
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant">{R.hero.lead}</p>
            <p className="mt-4 max-w-2xl font-headline text-xl font-bold leading-snug text-on-surface">{R.hero.control}</p>
            <ul className="mt-6 grid w-full max-w-xl grid-cols-8 gap-px bg-primary/10 md:mt-8" aria-label={wall.map((t) => t.name).join(', ')}>
              {wall.map((t) => (
                <li key={t.slug}>
                  <LogoTile logo={t.logo} text={t.ticker} className="w-full" />
                </li>
              ))}
            </ul>
            <ReserveButton position="hero" onReserve={reserve} className="mt-6 md:mt-10" />
            <p className="mt-4 font-body text-[15px] text-on-surface-variant">
              {total !== null && `${R.restLine(total)} `}
              {R.disclaimer}
            </p>
          </header>

          <div className="lg:col-span-5">
            <Clip />
          </div>
          </div>
        </div>
      </div>

      {/* Full-bleed bands: what you will use, and who issues the tokens. Only official logos. */}
      <LogoMarquee eyebrow={R.bands.tools} title={R.bands.toolsTitle} logos={marquee(tools)} plate="dark" shape="square" speed={3} />
      <LogoMarquee eyebrow={R.bands.issuers} title={R.bands.issuersTitle} logos={marquee(issuerBand)} plate="dark" shape="square" speed={3} reverse />

      <div className="px-4 py-20 sm:px-6 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col gap-20 md:gap-32">
          <Routes />
          <div>
            <Universe tiles={tiles} names={names} asOf={asOf} />
            <div className="mt-10">
              <MetricsBlock m={metrics} asOf={asOf} />
              <IssuersBlock issuers={issuers} asOf={asOf} />
            </div>
          </div>
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
            <p className="mb-px border-l-2 border-outline-variant bg-surface-container-low p-5 font-body text-base leading-relaxed text-on-surface md:p-6">{R.custody}</p>
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
