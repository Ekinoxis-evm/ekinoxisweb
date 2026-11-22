'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Ban, Bot, MessageCircleQuestion, Radio, CalendarDays, Check, CircleHelp, Clock, Coins, Gauge, ListChecks, ShoppingCart, Landmark, Scale, Search, ShieldAlert, ShieldCheck, TrendingDown, Vault, Video, Wallet, X } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import { track } from '@/lib/analytics';
import { fbq } from '@/lib/meta/pixel';
import { ACCIONES as R } from '@/lib/recursos';
import type { IssuerStat, Logo, TechTile } from '@/lib/acciones/catalog';

/**
 * «Acciones tech tokenizadas»: the page behind the OKX reel (products/digital products/acciones-tokenizadas/landing/DISENO-v3-reserva.md).
 * One action: «Reservar mi cupo por US$30» (US$49 from 2 Dec) opens the Stripe Payment Link (same tab).
 */

export type BandItem = { name: string; href?: string; logo: Logo | null };

type Sector = { value: number; transfers: number; holders: number; source: string };

/** Logo groups the money-flow diagrams draw; a null is a missing file and is skipped. */
export type Marks = Record<'exchanges' | 'usdt' | 'gas' | 'xstocks' | 'wallets' | 'uniswap' | 'stocks', (Logo | null)[]>;

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
  marks: Marks;
  /** Logos of the next issuers by value, for the «Otros emisores» row. */
  otherIssuers: (Logo | null)[];
  /** Logo per blockchain id (chain-<id> files). */
  chains: Record<string, Logo | null>;
  exchanges: BandItem[];
  wallets: BandItem[];
  tokens: BandItem[];
}

/** Icon per workshop fact in R.course.facts. */
const COURSE_FACT_ICONS = { live: Radio, questions: MessageCircleQuestion, recording: Video, ai: Bot } as const;

/** Icon per comparison question in R.routes.facts. */
const FACT_ICONS: Record<string, typeof Check> = { buy: ShoppingCart, choose: ListChecks, cost: Gauge, risk: ShieldAlert };

/** One icon per «Antes de comprar» item, in the order of R.risks.items. */
const RISK_ICONS = [Coins, Search, Ban, Scale, TrendingDown];

const SOURCES_ID = 'fuentes';
/** What the button sells right now: the link, the amount and, during the promo, the real later price. */
type Offer = { link: string; amount: number; was: number | null; note: string | null };

function offerAt(now: Date): Offer {
  const p = R.price;
  return now.getTime() < Date.parse(p.promo.endsAt)
    ? { link: p.links.promo, amount: p.promo.amount, was: p.regular, note: R.promoNote(p.promo.label, p.promo.until) }
    : { link: p.links.regular, amount: p.regular, was: null, note: null };
}

const ctaFor = (o: Offer) => R.reserve.paid(o.amount);
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

/** Wraps a logo in a link to its owner's official site (new tab); plain when the site is unknown. */
function LogoLink({ logo, children, className = '' }: { logo: Logo | null; children: React.ReactNode; className?: string }) {
  if (!logo?.href) return <span className={className}>{children}</span>;
  return (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logo.name ?? logo.href}
      className={`block transition-opacity duration-150 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      {children}
    </a>
  );
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

/** The whole market in three figures (one source, one date). */
function SectorStats({ s }: { s: Sector }) {
  const t = R.sector;
  const items: [string, string][] = [
    [usd(s.value), t.value],
    [usd(s.transfers), t.transfers],
    [count(s.holders), t.holders],
  ];
  return (
    <>
      <dl className="grid grid-cols-1 gap-px bg-primary/10 md:grid-cols-3">
        {items.map(([n, l]) => (
          <div key={l} className="flex flex-col-reverse gap-1 bg-surface-container-low p-5 md:p-6">
            <dt className="font-body text-[15px] leading-snug text-on-surface-variant">{l}</dt>
            <dd className="font-headline text-3xl font-bold tracking-tight text-on-surface [font-variant-numeric:tabular-nums] md:text-4xl">{n}</dd>
          </div>
        ))}
        <a
          href={R.issuersBlock.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] items-center justify-end gap-2 bg-surface-container-lowest px-5 font-body text-[13px] text-on-surface-variant transition-colors duration-150 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary md:col-span-3 md:px-6"
        >
          {s.source}
          <ArrowUpRight size={14} aria-hidden />
        </a>
      </dl>
    </>
  );
}

/** Fill and swatch classes per chart token, spelled out so Tailwind keeps them. */
const CHART: Record<string, { fill: string; bg: string }> = {
  'chart-1': { fill: 'fill-chart-1', bg: 'bg-chart-1' },
  'chart-2': { fill: 'fill-chart-2', bg: 'bg-chart-2' },
  'chart-3': { fill: 'fill-chart-3', bg: 'bg-chart-3' },
  'chart-4': { fill: 'fill-chart-4', bg: 'bg-chart-4' },
};

/** A donut segment between two angles (radians, 0 = top, clockwise) in a 300×300 box. */
function arc(a0: number, a1: number, ro: number, ri: number): string {
  const p = (r: number, a: number) => `${(150 + r * Math.sin(a)).toFixed(2)} ${(150 - r * Math.cos(a)).toFixed(2)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p(ro, a0)} A ${ro} ${ro} 0 ${large} 1 ${p(ro, a1)} L ${p(ri, a1)} A ${ri} ${ri} 0 ${large} 0 ${p(ri, a0)} Z`;
}

/**
 * The four issuers the workshop buys from, as one pie of their tokenized value (one source, one
 * date). Each slice wears its chart colour and the issuer's logo; hovering a slice or a row shows
 * its numbers in the centre, a tap opens its card. The legend rows are the accessible controls and
 * the table view, so colour never carries identity alone.
 */
function IssuersBlock({ issuers, asOf, sector, others }: { issuers: IssuerStat[]; asOf: string; sector: Sector; others: (Logo | null)[] }) {
  const b = R.issuersBlock;
  const rows = b.shown
    .flatMap(({ id, color }): (IssuerStat & { value: number; color: string })[] => {
      const i = issuers.find((x) => x.id === id);
      return i && i.value !== null ? [{ ...i, value: i.value, color }] : [];
    });
  const known = rows.reduce((sum, r) => sum + r.value, 0);
  const total = sector.value;
  const rest = Math.max(total - known, 0);
  const [hover, setHover] = useState<string | null>(null);
  const [card, setCard] = useState<(typeof rows)[number] | null>(null);
  const open = (r: (typeof rows)[number]) => {
    setCard(r);
    track('issuer_open', { issuer: r.id });
  };
  const fmt = (v: number) => `${(v * 100).toLocaleString('es-CO', { maximumFractionDigits: 1 })} %`;
  const active = rows.find((r) => r.id === hover) ?? null;

  const PAD = 0.025;
  let start = 0;
  const geo = rows.map((r) => {
    const sweep = (r.value / total) * 2 * Math.PI;
    const g = { r, a0: start + PAD / 2, a1: start + sweep - PAD / 2, mid: start + sweep / 2 };
    start += sweep;
    return g;
  });
  const restArc = rest > 0 ? arc(start + PAD / 2, 2 * Math.PI - PAD / 2, 112, 70) : null;

  return (
    <section aria-labelledby="market-heading">
      <Heading id="market-heading">{R.sector.heading}</Heading>
      <SectorStats s={sector} />
      <h3 id="issuers-heading" className="mt-14 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{b.heading}</h3>
      <p className="mb-6 mt-2 max-w-2xl font-body text-lg text-on-surface-variant">{b.lead}</p>

      <div className="grid grid-cols-1 gap-px bg-primary/10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex items-center justify-center bg-surface-container-low px-4 py-10 md:p-12">
          <div className="relative w-full max-w-sm">
            <svg viewBox="0 0 300 300" className="block w-full" role="img" aria-label={b.chartLabel}>
              {restArc && <path d={restArc} className="fill-outline-variant" />}
              {geo.map(({ r, a0, a1, mid }) => {
                const on = hover === r.id;
                return (
                  <path
                    key={r.id}
                    d={arc(a0, a1, 112, 70)}
                    onClick={() => open(r)}
                    onMouseEnter={() => setHover(r.id)}
                    onMouseLeave={() => setHover(null)}
                    className={`cursor-pointer ${CHART[r.color].fill} transition-transform duration-200 [transition-timing-function:var(--ease-settle)] motion-reduce:transition-none`}
                    style={{ transform: on ? `translate(${(Math.sin(mid) * 6).toFixed(2)}px, ${(-Math.cos(mid) * 6).toFixed(2)}px)` : undefined }}
                  />
                );
              })}
            </svg>
            {/* Logos ride on slices wide enough to hold one (≥ 6 %); a tap opens the same card as the row. */}
            {geo.filter(({ r }) => r.value / total >= 0.06).map(({ r, mid }) => (
              <button
                key={r.id}
                type="button"
                tabIndex={-1}
                aria-hidden
                onClick={() => open(r)}
                onMouseEnter={() => setHover(r.id)}
                onMouseLeave={() => setHover(null)}
                className="absolute w-9 -translate-x-1/2 -translate-y-1/2 md:w-11"
                style={{ left: `${((150 + 91 * Math.sin(mid)) / 300) * 100}%`, top: `${((150 - 91 * Math.cos(mid)) / 300) * 100}%` }}
              >
                <LogoTile logo={r.logo} text={r.name.slice(0, 2).toUpperCase()} className="w-full" />
              </button>
            ))}
            <div aria-live="polite" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-20 text-center md:px-24">
              <p className="font-headline text-xl font-bold leading-tight tracking-tight text-on-surface [font-variant-numeric:tabular-nums] [text-wrap:balance] md:text-3xl">
                {active ? fmt(active.value / total) : usd(total)}
              </p>
              <p className="mt-1 font-body text-[15px] text-on-surface">{active ? active.name : b.center}</p>
            </div>
          </div>
        </div>

        {/* The table: one row per issuer, the same three figures for each; a row opens its card. */}
        <div role="table" aria-label={b.tableLabel} className="flex flex-col gap-px bg-primary/10">
          <div role="row" className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_repeat(2,minmax(0,1fr))_1.5rem] items-end gap-4 bg-surface-container-lowest px-5 py-3 md:grid md:px-6">
            <span role="columnheader" className={label}>{b.colIssuer}</span>
            <span role="columnheader" className={`${label} text-right`}>{b.valueLabel}</span>
            <span role="columnheader" className={`${label} text-right`}>{b.ofMarket}</span>
            <span role="columnheader" className={`${label} text-right`}>{b.stocksLabel}</span>
            <span />
          </div>
          {rows.map((r) => (
            <button
              key={r.id}
              type="button"
              role="row"
              onClick={() => open(r)}
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(r.id)}
              onBlur={() => setHover(null)}
              aria-haspopup="dialog"
              aria-label={b.open(r.name)}
              className={`grid flex-1 grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-4 gap-y-3 px-5 py-4 text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_repeat(2,minmax(0,1fr))_1.5rem] md:px-6 ${
                hover === r.id ? 'bg-surface-container-high' : 'bg-surface-container-low'
              }`}
            >
              <span role="cell" className="col-span-3 flex items-center gap-3 md:col-span-1">
                <span aria-hidden className={`h-3 w-3 shrink-0 rounded-full ${CHART[r.color].bg}`} />
                <LogoTile logo={r.logo} text={r.name.slice(0, 2).toUpperCase()} className="w-10" />
                <span className="font-headline text-lg font-bold text-on-surface">{r.name}</span>
                <ArrowUpRight size={16} aria-hidden className="ml-auto text-primary md:hidden" />
              </span>
              {([
                [usd(r.value), b.valueLabel],
                [fmt(r.value / total), b.ofMarket],
                [`${(b.partial as readonly string[]).includes(r.id) ? '≥ ' : ''}${num(r.stocks)}`, b.stocksLabel],
              ] as const).map(([v, l]) => (
                <span key={l} role="cell" className="flex flex-col md:items-end">
                  <span className="font-headline text-base font-bold md:whitespace-nowrap text-on-surface [font-variant-numeric:tabular-nums] md:text-lg">{v}</span>
                  <span className="font-body text-[13px] text-on-surface-variant md:hidden">{l}</span>
                </span>
              ))}
              <ArrowUpRight size={16} aria-hidden className="hidden text-primary md:block" />
            </button>
          ))}
          {rest > 0 && (
            <div role="row" className="grid flex-1 grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-4 gap-y-3 bg-surface-container-low px-5 py-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_repeat(2,minmax(0,1fr))_1.5rem] md:px-6">
              <span role="cell" className="col-span-3 flex items-center gap-3 md:col-span-1">
                <span aria-hidden className="h-3 w-3 shrink-0 rounded-full bg-outline" />
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="font-headline text-lg font-bold text-on-surface-variant">{b.others}</span>
                  <MiniLogos logos={others} tile="w-7" className="flex-wrap" />
                </span>
              </span>
              <span role="cell" className="flex flex-col md:items-end">
                <span className="font-headline text-base font-bold md:whitespace-nowrap text-on-surface-variant [font-variant-numeric:tabular-nums] md:text-lg">{usd(rest)}</span>
                <span className="font-body text-[13px] text-on-surface-variant md:hidden">{b.valueLabel}</span>
              </span>
              <span role="cell" className="flex flex-col md:items-end">
                <span className="font-headline text-base font-bold text-on-surface-variant [font-variant-numeric:tabular-nums] md:text-lg">{fmt(rest / total)}</span>
                <span className="font-body text-[13px] text-on-surface-variant md:hidden">{b.ofMarket}</span>
              </span>
              <span role="cell" />
              <span />
            </div>
          )}
        </div>
      </div>

      <Sheet open={card !== null} onClose={() => setCard(null)} label={card?.name ?? b.heading}>
        {card && (
          <div>
            <div className="flex items-center gap-4 pr-12">
              <LogoTile logo={card.logo} text={card.name.slice(0, 2).toUpperCase()} className="w-16" />
              <p className="font-headline text-3xl font-bold tracking-tight text-on-surface">{card.name}</p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-px bg-primary/10">
              <div className="bg-surface-container-low p-4">
                <dd className="font-headline text-3xl font-bold tracking-tight [font-variant-numeric:tabular-nums]">{fmt(card.value / sector.value)}</dd>
                <dt className="font-body text-[13px] text-on-surface-variant">{b.ofMarket}</dt>
              </div>
              <div className="bg-surface-container-low p-4">
                <dd className="font-headline text-3xl font-bold tracking-tight [font-variant-numeric:tabular-nums]">{usd(card.value)}</dd>
                <dt className="font-body text-[13px] text-on-surface-variant">{b.valueLabel}</dt>
              </div>
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
                <p className="mt-2 font-body text-base leading-relaxed text-on-surface">{card.eligibility}</p>
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
    </section>
  );
}

/** A row of small logo tiles; on phones only the first, so a flow of four still fits 375px. */
function MiniLogos({ logos, className = '', firstOnPhone = false, tile = 'w-10' }: { logos: readonly (Logo | null)[]; className?: string; firstOnPhone?: boolean; tile?: string }) {
  const shown = logos.filter((l): l is Logo => l !== null);
  if (shown.length === 0) return null;
  return (
    <span className={`flex gap-1 ${className}`}>
      {shown.map((l, k) => (
        <LogoLink key={l.src} logo={l} className={`${tile} ${firstOnPhone && k > 0 ? 'max-md:hidden' : ''}`}>
          <LogoTile logo={l} text="" className="w-full" />
        </LogoLink>
      ))}
    </span>
  );
}

type Lane = 'a' | 'b';

/** True once the element has scrolled into view (at once under reduced motion), for one-time reveals. */
function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

const settle = 'transition duration-500 [transition-timing-function:var(--ease-settle)] motion-reduce:transition-none';

/** A stretch of the map's line: grows in on reveal, cyan when its lane is lit, hairline when not. */
function MapLine({ on, seen, order, vertical = false, toEnd = false, className = '' }: { on: boolean; seen: boolean; order: number; vertical?: boolean; toEnd?: boolean; className?: string }) {
  const color = !on ? 'bg-outline-variant' : toEnd ? (vertical ? 'bg-gradient-to-b from-primary to-tertiary-dim' : 'bg-gradient-to-r from-primary to-tertiary-dim') : 'bg-primary';
  const grow = vertical ? `origin-top ${seen ? 'scale-y-100' : 'scale-y-0'}` : `origin-left ${seen ? 'scale-x-100' : 'scale-x-0'}`;
  return <span aria-hidden className={`block ${vertical ? 'w-px' : 'h-px'} ${color} ${grow} ${settle} ${className}`} style={{ transitionDelay: `${order * 120}ms` }} />;
}

/** A stop on the map: its logos (or an icon) over a short label. The end stops are lime: arrival. */
function MapStop({ logos, icon, text, seen, order, end = false, on = true, firstOnPhone = false }: { logos?: readonly (Logo | null)[]; icon?: React.ReactNode; text: string; seen: boolean; order: number; end?: boolean; on?: boolean; firstOnPhone?: boolean }) {
  return (
    <span className={`flex min-w-24 shrink-0 flex-col items-center gap-2 text-center ${settle} ${seen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`} style={{ transitionDelay: `${order * 120}ms` }}>
      {icon ? (
        <span className={`flex h-14 w-14 items-center justify-center border transition-colors duration-200 ${end ? (on ? 'border-tertiary-dim text-tertiary-dim' : 'border-outline-variant text-on-surface-variant') : 'border-transparent bg-surface-container-high text-on-surface'}`}>
          {icon}
        </span>
      ) : (
        <MiniLogos logos={logos ?? []} firstOnPhone={firstOnPhone} tile="w-12 lg:w-14" className="justify-center" />
      )}
      <span className={`max-w-28 font-body text-[14px] leading-snug transition-colors duration-200 ${end && on ? 'font-bold text-tertiary-dim' : 'text-on-surface'}`}>{text}</span>
    </span>
  );
}

/** The A / B switch on the map: lights its lane. 44px, pressed state announced. */
function LaneButton({ lane, sel, onSel }: { lane: Lane; sel: Lane | null; onSel: (l: Lane | null) => void }) {
  const m = R.routes[lane];
  const pressed = sel === lane;
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={R.routes.map.show(m.letter)}
      onClick={() => onSel(pressed ? null : lane)}
      className={`flex h-11 w-11 shrink-0 items-center justify-center border font-headline text-lg font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        pressed ? 'border-primary bg-primary text-on-primary' : 'border-primary/40 bg-surface-container-lowest text-primary hover:border-primary'
      }`}
    >
      {m.letter}
    </button>
  );
}

/**
 * Bank money → exchange → USDT, then the split: straight on is A (the exchange keeps the token),
 * the branch down is B (your wallet, Uniswap). Tapping A or B, or hovering a method card, lights
 * that lane. Lines grow in once on scroll (instant under reduced motion). Laptop: left to right;
 * phones: top to bottom with the two lanes side by side.
 */
function RoutesMap({ marks, sel, onSel }: { marks: Marks; sel: Lane | null; onSel: (l: Lane | null) => void }) {
  const t = R.routes.map;
  const [ref, seen] = useSeen<HTMLDivElement>();
  const onA = sel !== 'b';
  const onB = sel !== 'a';
  const trunk = [
    <MapStop key="bank" icon={<Landmark size={22} aria-hidden />} text={t.bank} seen={seen} order={0} />,
    <MapStop key="ex" logos={marks.exchanges} text={t.exchange} seen={seen} order={2} />,
    <MapStop key="usdt" logos={marks.usdt} text={t.usdt} seen={seen} order={4} />,
  ];
  const aStops = [
    <MapStop key="abuy" logos={marks.xstocks} text={t.aBuy} seen={seen} order={7} />,
    <MapStop key="aend" icon={<Vault size={22} aria-hidden />} text={t.aEnd} seen={seen} order={9} end on={onA} />,
  ];
  const bStops = [
    <MapStop key="bw" logos={marks.wallets} text={t.bWallet} seen={seen} order={7} firstOnPhone />,
    <MapStop key="bbuy" logos={marks.uniswap} text={t.bBuy} seen={seen} order={9} />,
    <MapStop key="bend" icon={<Wallet size={22} aria-hidden />} text={t.bEnd} seen={seen} order={11} end on={onB} />,
  ];

  return (
    <div ref={ref} role="group" aria-label={t.label} className="bg-surface-container-lowest px-4 py-10 md:px-10">
      {/* Laptop: the trunk runs straight into lane A; lane B drops from the fork. */}
      <div className="hidden items-start lg:flex">
        {trunk.map((stop, k) => (
          <Fragment key={k}>
            {stop}
            <MapLine on seen={seen} order={k * 2 + 1} className="mt-7 min-w-6 flex-1" />
          </Fragment>
        ))}
        <div className="flex flex-[3] flex-col">
          <div className="relative flex items-start pb-8">
            <MapLine on={onB} seen={seen} order={5} vertical className="absolute -bottom-7 left-0 top-7" />
            <MapLine on={onA} seen={seen} order={5} className="mt-7 w-6" />
            <span className="mt-1.5"><LaneButton lane="a" sel={sel} onSel={onSel} /></span>
            <MapLine on={onA} seen={seen} order={6} className="mt-7 w-6" />
            {aStops[0]}
            <MapLine on={onA} seen={seen} order={8} toEnd className="mt-7 min-w-6 flex-1" />
            {aStops[1]}
          </div>
          <div className="flex items-start">
            <MapLine on={onB} seen={seen} order={6} className="mt-7 w-6" />
            <span className="mt-1.5"><LaneButton lane="b" sel={sel} onSel={onSel} /></span>
            <MapLine on={onB} seen={seen} order={6} className="mt-7 w-6" />
            {bStops[0]}
            <MapLine on={onB} seen={seen} order={8} className="mt-7 min-w-6 flex-1" />
            {bStops[1]}
            <MapLine on={onB} seen={seen} order={10} toEnd className="mt-7 min-w-6 flex-1" />
            {bStops[2]}
          </div>
        </div>
      </div>

      {/* Phones and tablets: down the page, then two lanes side by side. */}
      <div className="flex flex-col items-center lg:hidden">
        {trunk.map((stop, k) => (
          <Fragment key={k}>
            {stop}
            <MapLine on seen={seen} order={k * 2 + 1} vertical className="h-6" />
          </Fragment>
        ))}
        <MapLine on seen={seen} order={5} className="w-1/2" />
        <div className="grid w-full grid-cols-2">
          {([
            ['a', onA, aStops],
            ['b', onB, bStops],
          ] as const).map(([lane, on, stops]) => (
            <div key={lane} className="flex flex-col items-center">
              <MapLine on={on} seen={seen} order={6} vertical className="h-4" />
              <LaneButton lane={lane} sel={sel} onSel={onSel} />
              {stops.map((stop, k) => (
                <Fragment key={k}>
                  <MapLine on={on} seen={seen} order={7 + k * 2} vertical toEnd={k === stops.length - 1} className={k === stops.length - 1 ? 'min-h-6 flex-1' : 'h-6'} />
                  {stop}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** The map, then one card per method with its facts; hovering a card lights its lane on the map. */
function Routes({ marks }: { marks: Marks }) {
  const r = R.routes;
  const [sel, setSel] = useState<Lane | null>(null);
  return (
    <section aria-labelledby="routes-heading">
      <Heading id="routes-heading">{r.heading}</Heading>
      <p className="-mt-4 mb-8 max-w-2xl font-body text-lg text-on-surface-variant">{r.lead}</p>

      <RoutesMap marks={marks} sel={sel} onSel={setSel} />

      <h3 id="compare-heading" className="mb-6 mt-16 font-headline text-3xl font-bold tracking-tighter text-on-surface md:mt-24 md:text-5xl">{r.compareHeading}</h3>
      {/* The comparison: one row per question, A and B side by side under it (phones) or beside it (laptops). */}
      <div role="table" aria-labelledby="compare-heading" className="grid grid-cols-2 gap-px bg-primary/10 md:grid-cols-5">
        <div role="row" className="contents">
          <span role="columnheader" className="hidden bg-surface-container-lowest md:block" />
          {(['a', 'b'] as const).map((key) => {
            const m = r[key];
            return (
              <div
                key={key}
                role="columnheader"
                onMouseEnter={() => setSel(key)}
                onMouseLeave={() => setSel(null)}
                className={`flex flex-col transition-colors duration-200 md:col-span-2 ${sel === key ? 'bg-surface-container-high' : 'bg-surface-container'}`}
              >
                {/* The method's name sits on its image, over a black fade so it always reads. */}
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local generated still, already sized for the column */}
                  <img src={m.image} alt={m.imageAlt} loading="lazy" className="aspect-[3/4] w-full object-cover sm:aspect-[4/3] lg:aspect-[16/9]" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 md:p-6">
                    <span className="flex items-baseline gap-3">
                      <span className="font-headline text-2xl font-bold text-primary md:text-4xl">{m.letter}</span>
                      <span className="font-headline text-xl font-bold leading-tight tracking-tight text-on-surface md:text-4xl">{m.title}</span>
                    </span>
                    <span className="font-body text-[15px] font-bold text-secondary">{m.tag}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {r.facts.map((f) => {
          const Icon = FACT_ICONS[f.icon] ?? CircleHelp;
          return (
            <div key={f.label} role="row" className="contents">
              <span role="rowheader" className="col-span-2 flex items-center gap-3 bg-surface-container-lowest px-4 py-3 md:col-span-1 md:px-6 md:py-6">
                <Icon size={20} aria-hidden className="shrink-0 text-primary" />
                <span className="font-headline text-base font-bold text-on-surface md:text-lg">{f.label}</span>
              </span>
              {(['a', 'b'] as const).map((key) => {
                const v = f[key];
                const mark = 'mark' in v ? v.mark : null;
                return (
                  <div
                    key={key}
                    role="cell"
                    onMouseEnter={() => setSel(key)}
                    onMouseLeave={() => setSel(null)}
                    className={`p-4 transition-colors duration-200 md:col-span-2 md:p-6 ${sel === key ? 'bg-surface-container' : 'bg-surface-container-low'}`}
                  >
                    <span className="flex items-center gap-2 font-headline text-lg font-bold leading-tight text-on-surface md:text-xl">
                      {mark === 'yes' && <Check size={20} aria-hidden className="shrink-0 text-primary" />}
                      {mark === 'no' && <X size={20} aria-hidden className="shrink-0 text-on-surface-variant" />}
                      {v.short}
                    </span>
                    <span className="mt-1 block font-body text-[15px] leading-relaxed text-on-surface-variant">{v.detail}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** A tile in a sliding band: a logo with its name; a link, a card opener, or plain. */
type BandTile = { key: string; name: string; logo: Logo | null; href?: string };

/**
 * One full-bleed band sliding sideways (the site's marquee: two identical halves, CSS only).
 * Pauses on hover and keyboard focus; under reduced motion the repeats hide and the row wraps.
 * With `onPick`, each tile opens a card instead of following a link.
 */
function Band({ title, hint, items, onPick, reverse = false }: { title?: string; hint?: string; items: BandTile[]; onPick?: (key: string) => void; reverse?: boolean }) {
  if (items.length === 0) return null;
  const reps = Math.max(1, Math.ceil(14 / items.length));
  const half = Array.from({ length: reps }, () => items).flat();
  const tile = (it: BandTile, repeat: boolean) => {
    const face = 'group flex w-24 flex-col items-center gap-2 p-2 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:w-28';
    const inner = (
      <>
        <LogoTile logo={it.logo} text={it.name.slice(0, 4).toUpperCase()} className="w-16 border border-primary/10 transition-colors duration-150 group-hover:border-primary/60 md:w-20" />
        <span className="w-full truncate font-body text-[13px] text-on-surface">{it.name}</span>
      </>
    );
    const a11y = repeat ? { tabIndex: -1, 'aria-hidden': true } : {};
    if (onPick)
      return (
        <button type="button" onClick={() => onPick(it.key)} aria-haspopup="dialog" aria-label={it.name} className={face} {...a11y}>
          {inner}
        </button>
      );
    if (it.href)
      return (
        <a href={it.href} target="_blank" rel="noopener noreferrer" aria-label={it.name} className={face} {...a11y}>
          {inner}
        </a>
      );
    return <span className={face}>{inner}</span>;
  };
  return (
    <div className="marquee [&:focus-within_.animate-marquee]:[animation-play-state:paused]">
      {title && (
        <div className="mx-auto mb-4 max-w-screen-2xl px-4 sm:px-6">
          <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">{title}</h3>
          {hint && <p className="mt-1 font-body text-base text-on-surface-variant">{hint}</p>}
        </div>
      )}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul
          className={`flex w-max animate-marquee motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center ${reverse ? '[animation-direction:reverse]' : ''}`}
          style={{ ['--marquee-duration' as string]: `${half.length * 3}s` }}
        >
          {[0, 1].flatMap((h) =>
            half.map((it, k) => {
              const repeat = h === 1 || k >= items.length;
              return (
                <li key={`${h}-${k}`} className={`mr-2 shrink-0 ${repeat ? 'motion-reduce:hidden' : ''}`}>
                  {tile(it, repeat)}
                </li>
              );
            }),
          )}
        </ul>
      </div>
    </div>
  );
}

/**
 * «Lo que usaremos»: exchanges, wallets and tokens as sliding bands of official logos, then the
 * 40 tech stocks in two bands running opposite ways; a stock opens its card (where to buy it,
 * who issues it).
 */
function Toolkit({ tiles, names, idLogos, asOf, exchanges, wallets, tokens }: { tiles: TechTile[]; names: Record<string, string>; idLogos: Record<string, Logo | null>; asOf: string; exchanges: BandTile[]; wallets: BandTile[]; tokens: BandTile[] }) {
  const k = R.toolkit;
  const t = R.tech;
  const [open, setOpen] = useState<string | null>(null);
  const sel = tiles.find((x) => x.slug === open) ?? null;
  const pick = (slug: string) => {
    track('tech_tile_open', { slug });
    setOpen(slug);
  };
  const stock = (x: TechTile): BandTile => ({ key: x.slug, name: x.ticker, logo: x.logo });
  const mid = Math.ceil(tiles.length / 2);
  return (
    <section aria-labelledby="toolkit-heading" className="flex flex-col gap-12 pt-20 md:gap-16 md:pt-28">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6">
        <h2 id="toolkit-heading" className="font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface md:text-5xl">
          {k.heading}
        </h2>
      </div>
      <Band title={k.exchanges.title} items={exchanges} />
      <Band title={k.wallets.title} items={wallets} reverse />
      <Band title={k.tokens.title} items={tokens} />
      <div className="flex flex-col gap-4">
        <Band title={k.stocks.title} hint={k.stocks.hint} items={tiles.slice(0, mid).map(stock)} onPick={pick} reverse />
        <Band items={tiles.slice(mid).map(stock)} onPick={pick} />
      </div>

      <Sheet open={sel !== null} onClose={() => setOpen(null)} label={sel?.name ?? k.stocks.title}>
        {sel && (
          <div>
            <div className="flex items-center gap-4 pr-12">
              <LogoTile logo={sel.logo} text={sel.ticker} className="w-16" />
              <div>
                <p className="font-headline text-3xl font-bold tracking-tight text-on-surface">{sel.name}</p>
                <p className="font-mono text-[12px] text-outline">{sel.ticker}</p>
              </div>
            </div>
            {sel.logo?.href && (
              <a
                href={sel.logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 border border-outline-variant px-4 font-body text-[15px] text-on-surface transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {R.issuersBlock.site}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
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
    <figure className="mx-auto flex w-full max-w-xs flex-col lg:max-w-72">
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
        className="w-full border border-outline-variant bg-surface-container-lowest"
      />
      {/* One subtitle at a time; the segments jump the clip to each step. */}
      <div className="mt-3 flex gap-1" role="group" aria-label={c.caption}>
        {c.steps.map((st, i) => (
          <button
            key={st.at}
            type="button"
            onClick={() => jump(i)}
            aria-label={`${c.step(i + 1, c.steps.length)}: ${st.text}`}
            aria-current={i === step ? 'step' : undefined}
            className="flex h-11 flex-1 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <span className={`block h-1 w-full transition-colors duration-150 ${i <= step ? 'bg-primary' : 'bg-outline-variant'}`} />
          </button>
        ))}
      </div>
      <p className="min-h-14 font-body text-base leading-snug text-on-surface">
        <span className="mr-2 font-mono text-[12px] uppercase tracking-wider text-primary">{c.step(step + 1, c.steps.length)}</span>
        {c.steps[step].text}
      </p>
    </figure>
  );
}

function ReserveButton({ position, onReserve, label, className = '' }: { position: string; onReserve: (p: string) => void; label: string; className?: string }) {
  return (
    <span data-cta className={`block w-full sm:w-auto ${className}`}>
      <Button size="lg" onClick={() => onReserve(position)} className="w-full justify-center sm:w-auto">
        {label}
      </Button>
    </span>
  );
}

/**
 * The session as one timeline: «Antes» then the three blocks, all visible at once. Laptop: a line
 * across the top with a node per step and its column below; phones: the line runs down the left.
 * The line draws in and the steps settle in a short stagger once, on scroll (instant under reduced motion).
 */
function Course({ onReserve, marks, chains, offer }: { onReserve: (p: string) => void; marks: Marks; chains: Record<string, Logo | null>; offer: Offer }) {
  const c = R.course;
  const [ref, seen] = useSeen<HTMLOListElement>();
  return (
    <section aria-labelledby="course-heading">
      <Heading id="course-heading">{c.heading}</Heading>
      <ul className="-mt-2 mb-12 grid grid-cols-2 gap-px bg-primary/10 md:grid-cols-4">
        {c.facts.map((f) => {
          const Icon = COURSE_FACT_ICONS[f.icon as keyof typeof COURSE_FACT_ICONS];
          return (
            <li key={f.icon} className="flex flex-col items-start gap-3 bg-surface-container-low p-4 md:p-6">
              <span aria-hidden className="flex h-11 w-11 items-center justify-center bg-surface-container-high text-primary">
                <Icon size={22} />
              </span>
              <span className="font-body text-base leading-snug text-on-surface">{f.text}</span>
            </li>
          );
        })}
      </ul>

      <ol ref={ref} className="relative grid grid-cols-1 gap-10 pl-10 lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-12">
        {/* The line: down the left on phones, across the top on laptops. */}
        <span aria-hidden className={`absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-outline-variant via-primary to-tertiary-dim lg:hidden ${settle} duration-1000 ${seen ? 'scale-y-100' : 'scale-y-0'}`} />
        <span aria-hidden className={`absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-gradient-to-r from-outline-variant via-primary to-tertiary-dim lg:block ${settle} duration-1000 ${seen ? 'scale-x-100' : 'scale-x-0'}`} />
        {c.steps.map((st, k) => {
          const before = k === 0;
          const last = k === c.steps.length - 1;
          return (
            <li
              key={st.n}
              className={`relative ${settle} ${seen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${150 + k * 80}ms` }}
            >
              <span
                aria-hidden
                className={`absolute -left-10 top-0.5 h-6 w-6 rounded-full border bg-surface-container-lowest lg:-top-12 lg:left-0 ${
                  before ? 'border-outline-variant' : last ? 'border-tertiary-dim' : 'border-primary'
                }`}
              >
                <span className={`absolute inset-1.5 rounded-full ${before ? 'bg-outline-variant' : last ? 'bg-tertiary-dim' : 'bg-primary'}`} />
              </span>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className={`font-mono text-[12px] uppercase tracking-widest ${before ? 'text-outline' : 'text-primary'}`}>{st.n}</span>
                {'method' in st && <span className="font-mono text-[12px] uppercase tracking-widest text-secondary">{st.method}</span>}
              </p>
              <h3 className="mt-2 font-headline text-2xl font-bold leading-tight tracking-tight text-on-surface">{st.title}</h3>
              <MiniLogos logos={st.marks.flatMap((m) => marks[m as keyof Marks] ?? [])} className="mt-4" />
              <ul className="mt-4 flex flex-col gap-2">
                {st.does.map((d) => (
                  <li key={d} className="flex items-start gap-3 font-body text-base leading-relaxed text-on-surface">
                    <span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${before ? 'bg-outline-variant' : 'bg-primary'}`} />
                    {d}
                  </li>
                ))}
              </ul>
              {'networks' in st && (
                <ul aria-label="Redes" className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  {st.networks.map((n) => (
                    <li key={n.id} className="flex items-center gap-2 font-body text-[15px] text-on-surface">
                      <LogoLink logo={chains[n.id] ?? null} className="flex items-center gap-2">
                        <LogoTile logo={chains[n.id] ?? null} text={n.name.slice(0, 2).toUpperCase()} className="w-8" />
                        <span>{n.name}</span>
                      </LogoLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex flex-col gap-5 bg-surface-container-high p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="flex flex-wrap items-baseline gap-x-3 font-headline text-on-surface [font-variant-numeric:tabular-nums]">
            <span className="text-5xl font-bold tracking-tighter">{R.priceLine(offer.amount)}</span>
            {offer.was !== null && <s className="text-2xl text-on-surface-variant">{R.priceLine(offer.was)}</s>}
            <span className="font-body text-base text-on-surface-variant">{R.single}</span>
          </p>
          {offer.note && <p className="mt-2 font-body text-base text-on-surface">{offer.note}</p>}
          <Disclaimer className="mt-2" />
        </div>
        <ReserveButton position="precio" onReserve={onReserve} label={ctaFor(offer)} />
      </div>
    </section>
  );
}

/** Bands show official logos only; an entry without a file stays out until one lands. */
const band = (items: BandItem[]): BandTile[] => items.flatMap((it) => (it.logo ? [{ key: it.name, name: it.name, logo: it.logo, href: it.href }] : []));

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AccionesClient({ tiles, sources, issuers, idLogos, sector, names, asOf, marks, otherIssuers, chains, exchanges, wallets, tokens }: Props) {
  const [barShown, setBarShown] = useState(false);
  // Same first render on server and client (epoch → promo tier); the real clock applies after mount.
  const [offer, setOffer] = useState<Offer>(() => offerAt(new Date(0)));
  useEffect(() => setOffer(offerAt(new Date())), []);
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

  // Meta: the landing view, priced at the offer in force (PageView comes from the base code).
  useEffect(() => {
    fbq('track', 'ViewContent', { value: offer.amount, currency: 'USD', content_name: R.slug, content_type: 'product' });
  }, [offer.amount]);

  const reserve = useCallback((position: string) => {
    track('reserve_click', { position });
    fbq('track', 'InitiateCheckout', { value: offer.amount, currency: 'USD', content_name: R.slug });
    // Attribution on the Stripe session: campaign (or «landing») + which button; Stripe accepts [A-Za-z0-9_-].
    const campaign = new URLSearchParams(window.location.search).get('utm_campaign') ?? 'landing';
    const ref = `${campaign}-${position}`.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 200);
    window.location.assign(`${offer.link}?client_reference_id=${encodeURIComponent(ref)}`);
  }, [offer]);


  return (
    <AnimatedBackground variant="ambient">
      <div className="px-4 pb-20 pt-12 sm:px-6 md:pb-32 md:pt-24">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-20 md:gap-32">
          {/* 1 · Hero: the promise, the 8 biggest names (each links to its site), one action and three facts; the real purchase beside it. */}
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <header className="rise flex flex-col items-start lg:col-span-7">
            <ScanBadge>{R.hero.badge}</ScanBadge>
            <h1 className="mt-6 font-headline text-5xl font-bold leading-[0.95] tracking-tighter text-on-surface [text-wrap:balance] md:text-7xl">
              {R.hero.title}
              <em className="text-primary">{R.hero.titleEm}</em>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-on-surface md:text-xl">{R.hero.sub}</p>
            <ul className="mt-8 grid w-full max-w-xl grid-cols-8 gap-px bg-primary/10" aria-label={wall.map((t) => t.name).join(', ')}>
              {wall.map((t) => (
                <li key={t.slug}>
                  <LogoLink logo={t.logo}>
                    <LogoTile logo={t.logo} text={t.ticker} className="w-full" />
                  </LogoLink>
                </li>
              ))}
            </ul>
            <ReserveButton position="hero" onReserve={reserve} label={ctaFor(offer)} className="mt-8" />
            <ul className="mt-6 flex flex-col gap-3 font-body text-base text-on-surface md:text-lg">
              {[
                [CalendarDays, R.hero.facts.date],
                [Clock, R.hero.facts.time],
                [Video, R.hero.facts.place],
              ].map(([Icon, text]) => {
                const I = Icon as typeof Clock;
                return (
                  <li key={text as string} className="flex items-center gap-2">
                    <I size={18} aria-hidden className="text-primary" />
                    {text as string}
                  </li>
                );
              })}
            </ul>
          </header>

          <div className="lg:col-span-5">
            <Clip />
          </div>
          </div>
        </div>
      </div>

      {/* Full-bleed: what you will use, and the stocks you can get. Only official logos. */}
      <Toolkit tiles={tiles} names={names} idLogos={idLogos} asOf={asOf} exchanges={band(exchanges)} wallets={band(wallets)} tokens={band(tokens)} />

      <div className="px-4 py-20 sm:px-6 md:py-32">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-20 md:gap-32">
          <div>
            <IssuersBlock issuers={issuers} asOf={asOf} sector={sector} others={otherIssuers} />
          </div>
          <Course onReserve={reserve} marks={marks} chains={chains} offer={offer} />
          <Routes marks={marks} />
          <Teacher />

          <section aria-labelledby="risks-heading">
            <Heading id="risks-heading">{R.risks.heading}</Heading>
            <ul className="grid grid-cols-1 gap-px bg-primary/10 md:grid-cols-2">
              {R.risks.items.map((r, k) => {
                const Icon = RISK_ICONS[k] ?? ShieldAlert;
                const lastOdd = k === R.risks.items.length - 1 && R.risks.items.length % 2 === 1;
                return (
                  <li key={r.title} className={`flex gap-4 bg-surface-container-low p-5 md:p-6 ${lastOdd ? 'md:col-span-2' : ''}`}>
                    <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center bg-surface-container-high text-primary">
                      <Icon size={22} />
                    </span>
                    <span>
                      <span className="block font-headline text-lg font-bold text-on-surface">{r.title}</span>
                      <span className="mt-1 block font-body text-base leading-relaxed text-on-surface">{r.body}</span>
                      {'source' in r && <span className={`${note} mt-2 block`}>{r.source}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* What Ekinoxis never does: set large, it is the promise a visitor needs before paying. */}
          <aside aria-label={R.custodyLabel} className="flex flex-col gap-5 border border-primary/40 bg-surface-container-low p-6 md:flex-row md:items-start md:gap-8 md:p-10">
            <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center bg-surface-container-high text-primary md:h-16 md:w-16">
              <ShieldCheck size={32} />
            </span>
            <p className="font-headline text-2xl font-bold leading-snug tracking-tight text-on-surface [text-wrap:pretty] md:text-3xl">{R.custody}</p>
          </aside>

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
          {ctaFor(offer)}
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </AnimatedBackground>
  );
}
