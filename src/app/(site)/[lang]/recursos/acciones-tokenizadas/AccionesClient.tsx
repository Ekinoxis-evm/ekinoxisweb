'use client';

import { Fragment, useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Landmark, X } from 'lucide-react';
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
 * One action: «Reservar mi cupo · US$15» opens the Stripe Payment Link (same tab).
 * Without a link it falls back to the interest form below.
 */

export type BandItem = { name: string; href?: string; logo: Logo | null };

type Sector = { value: number; transfers: number; holders: number; source: string };

/** Logos drawn under each step of the fork; a null is a missing file and is skipped. */
type Fork = { account: (Logo | null)[]; a: (Logo | null)[]; b: (Logo | null)[]; goal: (Logo | null)[] };

type SourceItem = { id: string; label: string; url: string | null };

interface Props {
  tiles: TechTile[];
  sources: SourceItem[];
  issuers: IssuerStat[];
  /** Logo per venue or issuer id, for the detail cards. */
  idLogos: Record<string, Logo | null>;
  sector: Sector;
  names: Record<string, string>;
  asOf: string;
  fork: Fork;
  selfCustodyLogos: (Logo | null)[];
  custodialBand: BandItem[];
  selfCustodyBand: BandItem[];
}

const FORM_ID = 'reservar';
const SOURCES_ID = 'fuentes';
const PAY = R.price.paymentLink;
const CTA = PAY ? R.reserve.paid(R.price.amount) : R.reserve.interest;
const num = (n: number) => n.toLocaleString('es-CO');
/** «US$1,4 mil millones», «US$875,2 millones». */
const usd = (n: number) =>
  n >= 1e9
    ? `US$${(n / 1e9).toLocaleString('es-CO', { maximumSignificantDigits: 3 })} mil millones`
    : `US$${(n / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 1 })} millones`;
/** «4,89 millones». */
const count = (n: number) => (n >= 1e6 ? `${(n / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 2 })} millones` : num(n));
const label = 'font-mono text-[12px] uppercase tracking-widest text-outline';
/** Sources and footnotes: readable body text, not a mono label. */
const note = 'font-body text-[13px] leading-relaxed text-on-surface-variant';

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

function Heading({ children, id }: { children: string; id: string }) {
  return (
    <div className="mb-8">
      <h2 id={id} className="font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

/**
 * A detail card over the page: the native modal <dialog> traps focus, closes on Esc and on a
 * click on the backdrop, and hands focus back to the button that opened it.
 */
function Sheet({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="w-[min(34rem,calc(100vw-2rem))] max-h-[85vh] overflow-y-auto border border-outline-variant bg-surface-container p-0 text-on-surface backdrop:bg-black/80"
    >
      <div className="relative p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={R.tech.close}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center text-on-surface-variant transition-colors duration-150 hover:text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <X size={20} aria-hidden />
        </button>
        {children}
      </div>
    </dialog>
  );
}

/** A logo with its name, for lists inside the detail cards. */
function NamedLogo({ logo, name }: { logo: Logo | null; name: string }) {
  return (
    <li className="flex items-center gap-3">
      <LogoTile logo={logo} text={name.slice(0, 3).toUpperCase()} className="w-10" />
      <span className="font-body text-base text-on-surface">{name}</span>
    </li>
  );
}

/* ── Sections ─────────────────────────────────────────────────────────────── */

function SectorBlock({ s }: { s: Sector }) {
  const t = R.sector;
  const items: [string, string][] = [
    [usd(s.value), t.value],
    [usd(s.transfers), t.transfers],
    [count(s.holders), t.holders],
  ];
  return (
    <section aria-labelledby="sector-heading" className="mt-10">
      <h2 id="sector-heading" className="mb-6 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{t.heading}</h2>
      <dl className="grid grid-cols-1 gap-px bg-primary/10 md:grid-cols-3">
        {items.map(([n, l]) => (
          <div key={l} className="flex flex-col-reverse gap-1 bg-surface-container-low p-5 md:p-6">
            <dt className="font-body text-[15px] leading-snug text-on-surface-variant">{l}</dt>
            <dd className="font-headline text-3xl font-bold tracking-tight text-on-surface [font-variant-numeric:tabular-nums] md:text-4xl">{n}</dd>
          </div>
        ))}
      </dl>
      <p className={`${note} mt-3`}>{s.source}</p>
    </section>
  );
}

/** One slice of the share chart: an issuer with a published value, or the «others» remainder. */
type Slice = { id: string; name: string; logo: Logo | null; value: number; stocks: number | null; floor: boolean };

/**
 * Who issues the tokens and how much of the market each holds: a donut of tokenized value
 * (one source, one date) with a ranked legend that doubles as the table view. Tap or hover a
 * slice or a row to read its numbers in the centre. One neutral hue; the chosen slice lights up,
 * so colour never carries identity alone (names are always printed).
 */
function IssuersBlock({ issuers, asOf, sector }: { issuers: IssuerStat[]; asOf: string; sector: Sector }) {
  const [card, setCard] = useState<IssuerStat | null>(null);
  const b = R.issuersBlock;
  const valued = issuers.filter((i): i is IssuerStat & { value: number } => i.value !== null).sort((x, y) => y.value - x.value);
  const known = valued.reduce((sum, i) => sum + i.value, 0);
  const slices: Slice[] = [
    ...valued.map((i) => ({ id: i.id, name: i.name, logo: i.logo, value: i.value, stocks: i.stocks, floor: (b.partial as readonly string[]).includes(i.id) })),
    ...(sector.value > known ? [{ id: 'otros', name: b.others, logo: null, value: sector.value - known, stocks: null, floor: false }] : []),
  ];
  const [sel, setSel] = useState(slices[0]?.id ?? '');
  const openCard = (id: string) => {
    setSel(id);
    const found = issuers.find((i) => i.id === id);
    if (found) {
      setCard(found);
      track('issuer_open', { issuer: id });
    }
  };
  const current = slices.find((x) => x.id === sel) ?? slices[0];
  const pct = (v: number) => `${((v / sector.value) * 100).toLocaleString('es-CO', { maximumFractionDigits: 1 })} %`;

  const R0 = 80;
  const CIRC = 2 * Math.PI * R0;
  const GAP = 3;
  let offset = 0;

  return (
    <section aria-labelledby="issuers-heading">
      <Heading id="issuers-heading">{b.heading}</Heading>
      <p className="-mt-4 mb-8 font-body text-lg text-on-surface-variant">{b.lead}</p>

      <div className="grid grid-cols-1 gap-px bg-primary/10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="flex items-center justify-center bg-surface-container-low p-6 md:p-10">
          <div className="relative w-full max-w-[20rem]">
            <svg viewBox="0 0 200 200" className="block w-full -rotate-90" role="img" aria-label={b.chartLabel}>
              {slices.map((x) => {
                const len = (x.value / sector.value) * CIRC;
                const dash = Math.max(len - GAP, 0.5);
                const el = (
                  <circle
                    key={x.id}
                    cx="100"
                    cy="100"
                    r={R0}
                    fill="none"
                    strokeWidth={x.id === current?.id ? 30 : 24}
                    strokeDasharray={`${dash} ${CIRC - dash}`}
                    strokeDashoffset={-offset}
                    onClick={() => openCard(x.id)}
                    onMouseEnter={() => setSel(x.id)}
                    className={`cursor-pointer transition-[stroke-width] duration-150 motion-reduce:transition-none ${
                      x.id === current?.id ? 'stroke-on-surface' : x.id === 'otros' ? 'stroke-outline-variant' : 'stroke-on-surface-variant'
                    }`}
                  />
                );
                offset += len;
                return el;
              })}
            </svg>
            {current && (
              <div aria-live="polite" className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
                <p className="font-headline text-4xl font-bold tracking-tighter text-on-surface [font-variant-numeric:tabular-nums]">{pct(current.value)}</p>
                <p className="font-body text-[13px] text-on-surface-variant">{b.share}</p>
                <p className="mt-2 font-headline text-lg font-bold text-on-surface">{current.name}</p>
                <p className="font-body text-[15px] text-on-surface-variant [font-variant-numeric:tabular-nums]">{usd(current.value)}</p>
              </div>
            )}
          </div>
        </div>

        <ol className="flex flex-col gap-px bg-primary/10">
          {slices.map((x) => {
            const on = x.id === current?.id;
            return (
              <li key={x.id}>
                <button
                  type="button"
                  onClick={() => (x.id === 'otros' ? setSel(x.id) : openCard(x.id))}
                  onMouseEnter={() => setSel(x.id)}
                  aria-pressed={on}
                  aria-haspopup={x.id === 'otros' ? undefined : 'dialog'}
                  aria-label={x.id === 'otros' ? undefined : b.open(x.name)}
                  className={`grid min-h-[64px] w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 border-l-2 p-4 text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                    on ? 'border-on-surface bg-surface-container-high' : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  {x.id !== 'otros' ? <LogoTile logo={x.logo} text={x.name.slice(0, 3).toUpperCase()} className="w-10" /> : <span className="flex h-10 w-10 items-center justify-center bg-surface-container-high font-mono text-[12px] text-on-surface-variant">+</span>}
                  <span>
                    <span className="block font-headline text-lg font-bold text-on-surface">{x.name}</span>
                    <span className="block font-body text-[13px] text-on-surface-variant [font-variant-numeric:tabular-nums]">
                      {x.stocks !== null ? `${x.floor ? `${b.atLeast} ` : ''}${num(x.stocks)} ${b.stocksLabel}` : b.othersNote}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block font-headline text-lg font-bold text-on-surface [font-variant-numeric:tabular-nums]">{pct(x.value)}</span>
                    <span className="block font-body text-[13px] text-on-surface-variant [font-variant-numeric:tabular-nums]">{usd(x.value)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <Sheet open={card !== null} onClose={() => setCard(null)} label={card?.name ?? b.heading}>
        {card && (
          <div>
            <div className="flex items-center gap-4 pr-12">
              <LogoTile logo={card.logo} text={card.name.slice(0, 3).toUpperCase()} className="w-16" />
              <p className="font-headline text-3xl font-bold tracking-tight text-on-surface">{card.name}</p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-px bg-primary/10">
              {card.value !== null && (
                <>
                  <div className="bg-surface-container-low p-4">
                    <dd className="font-headline text-3xl font-bold tracking-tight [font-variant-numeric:tabular-nums]">{pct(card.value)}</dd>
                    <dt className="font-body text-[13px] text-on-surface-variant">{b.share}</dt>
                  </div>
                  <div className="bg-surface-container-low p-4">
                    <dd className="font-headline text-xl font-bold [font-variant-numeric:tabular-nums]">{usd(card.value)}</dd>
                    <dt className="font-body text-[13px] text-on-surface-variant">{b.valueLabel}</dt>
                  </div>
                </>
              )}
              <div className="col-span-2 bg-surface-container-low p-4">
                <dd className="font-headline text-3xl font-bold tracking-tight [font-variant-numeric:tabular-nums]">
                  {(b.partial as readonly string[]).includes(card.id) && <span className="mr-2 font-body text-[15px] font-normal text-on-surface-variant">{b.atLeast}</span>}
                  {num(card.stocks)}
                </dd>
                <dt className="font-body text-[13px] text-on-surface-variant">{b.stocksLabel}</dt>
              </div>
            </dl>
            {card.eligibility && (
              <>
                <h3 className="mt-6 font-headline text-lg font-bold text-on-surface">{b.eligibility}</h3>
                <p className="mt-2 font-body text-base leading-relaxed text-on-surface-variant">{card.eligibility}</p>
              </>
            )}
            {card.site && (
              <a
                href={card.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 border border-outline-variant px-4 font-body text-[15px] text-on-surface transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {b.site}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
            <p className={`${note} mt-6`}>{b.note(asOf, sector.source)}</p>
          </div>
        )}
      </Sheet>
      <p className={`${note} mt-3`}>{b.note(asOf, sector.source)}</p>
    </section>
  );
}

/** A row of small logo tiles under a step of the fork. */
function MiniLogos({ logos, className = '' }: { logos: (Logo | null)[]; className?: string }) {
  const shown = logos.filter((l): l is Logo => l !== null);
  if (shown.length === 0) return null;
  return (
    <span className={`flex gap-1 ${className}`}>
      {shown.map((l) => (
        <LogoTile key={l.src} logo={l} text="" className="w-10" />
      ))}
    </span>
  );
}

/** USDT → A or B → «Tienes el token» on one line that warms to lime (DESIGN.md Light Line). */
function Routes({ fork }: { fork: Fork }) {
  const r = R.routes;
  const [tab, setTab] = useState<'a' | 'b'>('a');
  const node = 'border border-primary bg-surface-container-lowest px-3 py-2 font-mono text-[12px] uppercase tracking-wider text-on-surface';
  const dot = 'h-3 w-3 shrink-0 rounded-full border border-primary bg-surface-container-lowest';
  const nodeText = 'font-mono text-[12px] uppercase tracking-wider';
  return (
    <section aria-labelledby="routes-heading">
      <Heading id="routes-heading">{r.heading}</Heading>
      <p className="-mt-4 mb-8 font-body text-lg text-on-surface-variant">{r.lead}</p>

      {/* Phones: the line runs down, splits into two lanes and meets again at the goal. */}
      <div aria-hidden className="mb-10 flex flex-col items-center md:hidden">
        <Landmark size={24} className="text-on-surface" />
        <span className={`${nodeText} mt-2 text-on-surface`}>{r.start}</span>
        <span className={`${nodeText} text-outline`}>{r.startNote}</span>
        <span className="mt-2 h-6 w-px bg-primary" />
        <span className={dot} />
        <span className={`${nodeText} mt-2 text-on-surface`}>{r.account}</span>
        <MiniLogos logos={fork.account} className="mt-2" />
        <span className="mt-2 h-6 w-px bg-primary" />
        <span className="h-px w-1/2 bg-primary" />
        <div className="grid w-full grid-cols-2">
          {([
            [r.aShort, fork.a],
            [r.bShort, fork.b],
          ] as const).map(([lane, logos]) => (
            <div key={lane} className="flex h-full flex-col items-center">
              <span className="h-6 w-px bg-primary" />
              <span className={dot} />
              <span className={`${nodeText} mt-2 text-on-surface`}>{lane}</span>
              <MiniLogos logos={logos} className="my-2 flex-wrap justify-center" />
              {/* Stretches so both lanes meet the merge line even when one wraps its logos. */}
              <span className="min-h-6 w-px flex-1 bg-gradient-to-b from-primary to-tertiary-dim" />
            </div>
          ))}
        </div>
        <span className="h-px w-1/2 bg-tertiary-dim" />
        <span className="h-6 w-px bg-tertiary-dim" />
        <span className="h-3 w-3 rounded-full bg-tertiary-dim" />
        <span className={`${nodeText} mt-2 text-tertiary-dim`}>
          {r.goal} · {r.goalNote}
        </span>
        <MiniLogos logos={fork.goal} className="mt-2" />
      </div>

      <div aria-hidden className="mb-10 hidden items-center gap-3 md:flex">
        <span className={`${node} flex flex-col items-start gap-2`}>
          <span className="flex items-center gap-2">
            <Landmark size={16} /> {r.start}
          </span>
          <span className="text-outline">{r.startNote}</span>
        </span>
        <span className="h-px flex-1 bg-primary" />
        <span className={`${node} flex flex-col items-start gap-2`}>
          {r.account}
          <MiniLogos logos={fork.account} />
        </span>
        <span className="h-px flex-1 bg-primary" />
        <span className="flex flex-col gap-2">
          <span className={`${node} flex flex-col items-start gap-2`}>
            {r.aShort}
            <MiniLogos logos={fork.a} />
          </span>
          <span className={`${node} flex flex-col items-start gap-2`}>
            {r.bShort}
            <MiniLogos logos={fork.b} />
          </span>
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-primary to-tertiary-dim" />
        <span className="flex flex-col items-start gap-2 border border-tertiary-dim px-3 py-2 font-mono text-[12px] uppercase tracking-wider text-tertiary-dim">
          {r.goal} · {r.goalNote}
          <MiniLogos logos={fork.goal} />
        </span>
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
function Universe({ tiles, names, idLogos, asOf }: { tiles: TechTile[]; names: Record<string, string>; idLogos: Record<string, Logo | null>; asOf: string }) {
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
    track('tech_tile_open', { slug });
    setOpen(slug);
  };

  return (
    <section aria-labelledby="tech-heading">
      <Heading id="tech-heading">{t.heading}</Heading>
      <p className="-mt-4 mb-6 font-body text-lg text-on-surface-variant">{t.lead}</p>
      <div
        ref={field}
        onPointerMove={lean}
        onPointerLeave={rest}
        className="relative h-[700px] overflow-hidden border border-primary/10 bg-surface-container-lowest md:h-[520px]"
      >
        <ul aria-label={t.heading}>
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
                    aria-haspopup="dialog"
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

      <Sheet open={sel !== null} onClose={() => setOpen(null)} label={sel?.name ?? t.heading}>
        {sel && (
          <div>
            <div className="flex items-center gap-4 pr-12">
              <LogoTile logo={sel.logo} text={sel.ticker} className="w-16" />
              <div>
                <p className="font-headline text-3xl font-bold tracking-tight text-on-surface">{sel.name}</p>
                <p className="font-mono text-[12px] text-outline">{sel.ticker}</p>
              </div>
            </div>
            <h3 className="mt-6 font-headline text-lg font-bold text-on-surface">{t.routeA}</h3>
            {sel.venues.length ? (
              <ul className="mt-3 flex flex-col gap-3">
                {sel.venues.map((v) => (
                  <NamedLogo key={v} logo={idLogos[v] ?? null} name={names[v] ?? v} />
                ))}
              </ul>
            ) : (
              <p className="mt-2 font-body text-base text-on-surface-variant">{t.none}</p>
            )}
            <h3 className="mt-6 font-headline text-lg font-bold text-on-surface">{t.routeB(sel.issuers.length)}</h3>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sel.issuers.map((id) => (
                <NamedLogo key={id} logo={idLogos[id] ?? null} name={names[id] ?? id} />
              ))}
            </ul>
            <p className={`${note} mt-6`}>
              {t.sources(asOf)}{' '}
              <a
                href={`#${SOURCES_ID}`}
                onClick={() => setOpen(null)}
                className="inline-flex min-h-[44px] items-center text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                {t.sourcesLink}
              </a>
            </p>
          </div>
        )}
      </Sheet>
      <p className={`${note} mt-3`}>{t.note(asOf)}</p>
    </section>
  );
}

/** Who teaches: William's photo, what he has built (from his own site) and where to follow him. */
function Teacher() {
  const t = R.teacher;
  return (
    <section aria-labelledby="teacher-heading" className="grid grid-cols-1 gap-px bg-primary/10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="relative h-80 overflow-hidden bg-surface-container-lowest md:h-auto md:min-h-[28rem]">
        {/* eslint-disable-next-line @next/next/no-img-element -- William's own portrait, served from /public */}
        <img src={t.photo} alt={t.photoAlt} className="absolute inset-0 h-full w-full object-cover object-[50%_72%]" loading="lazy" />
      </div>
      <div className="flex flex-col justify-center bg-surface-container-low p-6 md:p-10">
        <h2 id="teacher-heading" className="font-mono text-[12px] uppercase tracking-widest text-outline">{t.heading}</h2>
        <p className="mt-3 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">{t.name}</p>
        <p className="mt-2 font-body text-lg text-on-surface-variant">{t.role}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {t.facts.map((f) => (
            <li key={f} className="border-l-2 border-outline-variant pl-3 font-body text-base leading-relaxed text-on-surface">{f}</li>
          ))}
        </ul>
        <p className={`${note} mt-4`}>{t.source}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {t.socials.map((x) => (
            <li key={x.label}>
              <a
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 border border-outline-variant px-3 font-body text-[15px] text-on-surface transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- 18px social marks from /public/socials */}
                {x.icon && <img src={x.icon} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />}
                {x.label}
              </a>
            </li>
          ))}
          <li>
            <LocalizedLink
              href="/about"
              className="inline-flex min-h-[44px] items-center gap-2 px-3 font-body text-[15px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-150 hover:decoration-primary"
            >
              {t.link}
              <ArrowRight size={14} aria-hidden />
            </LocalizedLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** The real purchase, muted and looping; under reduced motion it waits for a tap. */
function Clip() {
  const c = R.clip;
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [step, setStep] = useState(0);
  // React does not render `muted` as an attribute, which blocks autoplay; set it and start by hand.
  useEffect(() => {
    const v = ref.current;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduce(still);
    if (!v || still) return;
    v.muted = true;
    v.play().catch(() => setReduce(true));
  }, []);
  const onTime = () => {
    const t = ref.current?.currentTime ?? 0;
    let k = 0;
    c.steps.forEach((s, i) => {
      if (t >= s.at) k = i;
    });
    setStep(k);
  };
  const jump = (i: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = c.steps[i].at;
    setStep(i);
  };
  return (
    <figure className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
      <video
        ref={ref}
        src={c.src}
        poster={c.poster}
        muted
        playsInline
        loop
        controls={reduce}
        preload="metadata"
        onTimeUpdate={onTime}
        aria-label={c.caption}
        className="w-full border border-outline-variant bg-surface-container-lowest lg:mx-auto lg:max-w-[16rem] xl:max-w-none"
      />
      <figcaption>
        <span className="block font-headline text-lg font-bold leading-snug text-on-surface">{c.caption}</span>
        <ol className="mt-3 flex flex-col gap-1">
          {c.steps.map((s, i) => (
            <li key={s.at}>
              <button
                type="button"
                onClick={() => jump(i)}
                aria-current={i === step ? 'step' : undefined}
                className={`flex min-h-[44px] w-full items-start gap-3 border-l-2 py-2 pl-3 text-left font-body text-[15px] leading-snug transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                  i === step ? 'border-on-surface text-on-surface' : 'border-outline-variant text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="font-mono text-[12px] text-outline">{i + 1}</span>
                {s.text}
              </button>
            </li>
          ))}
        </ol>
        <span className={`${note} mt-2 block`}>{c.source}</span>
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

/**
 * The three blocks as cards that slide one to the next every 8 s. Pauses on hover and focus;
 * under reduced motion it never auto-advances and swaps without movement. Screen readers hear a
 * slide only when the visitor changes it (aria-live polite), never on the timer.
 */
function Course({ onReserve, selfCustodyLogos }: { onReserve: (p: string) => void; selfCustodyLogos: (Logo | null)[] }) {
  const c = R.course;
  const total = c.modules.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  useEffect(() => {
    if (paused || still) return;
    const t = setTimeout(() => setI((x) => (x + 1) % total), 8000);
    return () => clearTimeout(t);
  }, [i, paused, still, total]);
  const go = (n: number) => {
    setManual(true);
    setI((n + total) % total);
  };
  const arrow =
    'flex h-11 w-11 items-center justify-center border border-outline-variant text-on-surface transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  return (
    <section aria-labelledby="course-heading" aria-roledescription="carrusel">
      <Heading id="course-heading">{c.heading}</Heading>
      <p className="-mt-4 mb-8 font-body text-lg text-on-surface-variant">{c.format}</p>
      <div
        className="overflow-hidden border border-primary/10 bg-surface-container-low"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ol
          aria-live={paused || manual || still ? 'polite' : 'off'}
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {c.modules.map((m, k) => (
            <li
              key={m.n}
              aria-roledescription="diapositiva"
              aria-label={`${k + 1} / ${total}`}
              aria-hidden={k !== i}
              className="grid w-full shrink-0 grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              {/* Short on phones so «Bloque · title · line» fits in one view with the image. */}
              <div className="flex h-40 items-center justify-center overflow-hidden bg-surface-container-lowest md:h-auto md:min-h-[26rem]">
                {'image' in m ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local screenshot from William's own recording
                  <img src={m.image} alt={m.imageAlt} className="h-full w-full object-cover object-top" loading="lazy" />
                ) : (
                  <div className="flex flex-col items-center gap-3 p-4 md:gap-5 md:p-6">
                    <MiniLogos logos={selfCustodyLogos} className="gap-2 md:[&>span]:w-14" />
                    <ul className="flex flex-wrap justify-center gap-2">
                      {'networks' in m &&
                        m.networks.map((n) => (
                          <li key={n} className="border border-outline-variant px-2 py-1 font-mono text-[12px] text-on-surface-variant">
                            {n}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="font-mono text-[12px] uppercase tracking-wider text-primary">{m.n}</p>
                <h3 className="mt-3 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{m.title}</h3>
                <p className="mt-3 font-body text-lg leading-relaxed text-on-surface-variant">{m.desc}</p>
                {'pre' in m && <p className="mt-5 border-l-2 border-outline-variant pl-3 font-body text-[15px] leading-relaxed text-on-surface">{m.pre}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-1">
          {c.modules.map((m, k) => (
            <button
              key={m.n}
              type="button"
              onClick={() => go(k)}
              aria-label={c.goTo(k + 1)}
              aria-current={k === i}
              className="flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className={`block h-1 w-8 transition-colors duration-150 ${k === i ? 'bg-primary' : 'bg-outline-variant'}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(i - 1)} aria-label={c.prev} className={arrow}>
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label={c.next} className={arrow}>
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
      <div className="mt-px flex flex-col gap-5 bg-surface-container-high p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <p className="font-headline text-3xl font-bold tracking-tight text-on-surface">{PAY ? R.priceLine(R.price.amount, R.price.until) : c.soon}</p>
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
          <Button type="submit" size="lg" variant={PAY ? 'ghost' : 'primary'} disabled={status === 'sending'} className="w-full justify-center">
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

export default function AccionesClient({ tiles, sources, issuers, idLogos, sector, names, asOf, fork, selfCustodyLogos, custodialBand, selfCustodyBand }: Props) {
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
    if (PAY) {
      // Attribution on the Stripe session: campaign (or «landing») + which button; Stripe accepts [A-Za-z0-9_-].
      const campaign = new URLSearchParams(window.location.search).get('utm_campaign') ?? 'landing';
      const ref = `${campaign}-${position}`.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 200);
      window.location.assign(`${PAY}?client_reference_id=${encodeURIComponent(ref)}`);
      return;
    }
    const el = formRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    el.querySelector<HTMLInputElement>('input[name=name]')?.focus({ preventScroll: true });
  }, []);


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
            <p className="mt-6 max-w-2xl font-headline text-xl font-bold leading-snug text-on-surface md:text-2xl">{R.hero.control}</p>
            <ul className="mt-6 grid w-full max-w-xl grid-cols-8 gap-px bg-primary/10 md:mt-8" aria-label={wall.map((t) => t.name).join(', ')}>
              {wall.map((t) => (
                <li key={t.slug}>
                  <LogoTile logo={t.logo} text={t.ticker} className="w-full" />
                </li>
              ))}
            </ul>
            <ReserveButton position="hero" onReserve={reserve} className="mt-6 md:mt-10" />
            <p className="mt-4 font-body text-[15px] text-on-surface-variant">
              {R.session.line(R.session.date, R.session.time)}{' '}
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
      <LogoMarquee eyebrow={R.bands.custodial.eyebrow} title={R.bands.custodial.title} logos={marquee(custodialBand)} plate="dark" shape="square" speed={3} />
      <LogoMarquee eyebrow={R.bands.selfCustody.eyebrow} title={R.bands.selfCustody.title} logos={marquee(selfCustodyBand)} plate="dark" shape="square" speed={3} reverse />

      <div className="px-4 py-20 sm:px-6 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col gap-20 md:gap-32">
          <div>
            <IssuersBlock issuers={issuers} asOf={asOf} sector={sector} />
            <SectorBlock s={sector} />
          </div>
          <Routes fork={fork} />
          <div>
            <Universe tiles={tiles} names={names} idLogos={idLogos} asOf={asOf} />
          </div>
          <Course onReserve={reserve} selfCustodyLogos={selfCustodyLogos} />
          <Teacher />

          <section aria-labelledby="risks-heading">
            <Heading id="risks-heading">{R.risks.heading}</Heading>
            <ul className="flex flex-col gap-px bg-primary/10">
              {R.risks.items.map((r) => (
                <li key={r.title} className="bg-surface-container-low p-5 md:p-6">
                  <p className="font-headline text-lg font-bold text-on-surface">{r.title}</p>
                  <p className="mt-1 font-body text-base leading-relaxed text-on-surface-variant">{r.body}</p>
                  {'source' in r && <p className={`${note} mt-2`}>{r.source}</p>}
                </li>
              ))}
            </ul>
          </section>

          <section id={FORM_ID} ref={formRef} aria-labelledby="form-heading" className="scroll-mt-24">
            <p className="mb-px border-l-2 border-outline-variant bg-surface-container-low p-5 font-body text-base leading-relaxed text-on-surface md:p-6">{R.custody}</p>
            <ReserveForm />
          </section>

          <section id={SOURCES_ID} aria-labelledby="sources-heading" className="scroll-mt-24">
            <h2 id="sources-heading" className="font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{R.sourcesList.heading}</h2>
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
