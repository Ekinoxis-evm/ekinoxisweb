import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import raw from '@/data/acciones/catalogo.json';
import { SITES } from './sites';
import logoManifest from '../../../public/recursos/acciones/logos/manifest.json';

/**
 * The tokenized-stocks catalog: which company can be bought as a token, from whom (issuer),
 * and where (route A: an exchange holds it for you · route B: your own wallet on Uniswap).
 *
 * A dated snapshot built in products/digital products/acciones-tokenizadas/datos/merge.py and copied here as
 * src/data/acciones/catalogo.json. No prices by decision. Metrics are computed there, never
 * typed here. Server only (it reads the filesystem); pages pass `techTiles()` to the client.
 */

type Level = 'oficial' | 'pantalla' | 'dashboard' | 'pendiente';

interface Source {
  name: string;
  url: string | null;
  read_on: string | null;
  level: Level;
}

interface Issuer {
  name: string;
  site?: string;
  eligibility_es?: string;
  /** Distributed tokenized value from one dashboard (RWA.xyz), same metric for all; null when not listed. */
  value?: { usd: number | null };
}

interface Sector {
  monthly_transfer_volume_usd: number;
  distributed_value_usd: number;
  holders: number;
  source: string;
  read_on: string;
}

export interface IssuerStat {
  id: string;
  name: string;
  logo: Logo | null;
  /** Companies in the catalog with a token from this issuer. */
  stocks: number;
  /** Distributed tokenized value in USD (RWA.xyz), or null when there is no public figure. */
  value: number | null;
  site: string | null;
  /** Who may buy, in Spanish, from the issuer's own terms. */
  eligibility: string | null;
}

interface Venue {
  name: string;
  route: 'A' | 'B';
  url: string;
  restricted_es?: string;
  fees_es?: string;
  colombia_es?: string;
}

interface RawCompany {
  slug: string;
  ticker: string;
  name: string;
  uniswap: boolean;
  onchain: { issuer: string; symbol: string; networks: string[]; sources: string[] }[];
  exchanges: { venue: string; symbol: string; issuer: string; source: string }[];
}

interface Metrics {
  as_of: string;
  tech_companies: number;
  issuers: number;
  venues: number;
  issuers_per_company_max: number;
  top_by_issuers: [string, string, number][];
}

interface RawCatalog {
  version: string;
  sources: Record<string, Source>;
  issuers: Record<string, Issuer>;
  venues: Record<string, Venue>;
  tech: string[];
  metrics: Metrics;
  sector: Sector;
  companies: RawCompany[];
}

const data = raw as unknown as RawCatalog;
const manifest = logoManifest as Record<string, { hex?: string; title?: string }>;

export interface Logo {
  src: string;
  /** Near-black brand colour: painted in the page's text colour instead (DESIGN.md: never a white tile). */
  mono: boolean;
  /** A wordmark, not a symbol: it gets the tile's width instead of a square box. */
  wide: boolean;
  /** The owner's official site (src/lib/acciones/sites.ts); the logo links there. */
  href: string | null;
  /** The owner's name from the logo manifest, for the link's accessible name. */
  name: string | null;
}

/** One of the 40 tiles, with what its panel shows. */
export interface TechTile {
  slug: string;
  ticker: string;
  name: string;
  logo: Logo | null;
  /** Route A: exchanges that list it. */
  venues: string[];
  /** Route B: issuers with an onchain token (the count the metrics use). */
  issuers: string[];
}

const LOGO_DIR = '/recursos/acciones/logos';

/** simple-icons draw every mark in a 24×24 box, so their wordmarks can't be told by shape. */
const WORDMARKS = new Set(['intc', 'arm', 'dell', 'csco', 'amd', 'uber', 'coin']);

/** Wider than tall by 1.8× or more (from the SVG viewBox) reads as a wordmark. */
function isWide(name: string, file: string): boolean {
  if (WORDMARKS.has(name)) return true;
  if (!file.endsWith('.svg')) return false;
  const box = readFileSync(file, 'utf8').match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
  return box ? Number(box[1]) / Number(box[2]) >= 1.8 : false;
}

/** Relative luminance of a hex colour (WCAG). */
function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Logo by file name (company slug, `issuer-{id}`, `venue-{id}`, `tool-{id}`), or null. */
export function logoFor(name: string): Logo | null {
  for (const ext of ['svg', 'png']) {
    const src = `${LOGO_DIR}/${name}.${ext}`;
    const file = join(process.cwd(), 'public', src);
    if (!existsSync(file)) continue;
    const hex = manifest[name]?.hex;
    return { src, mono: hex ? luminance(hex) < 0.2 : false, wide: isWide(name, file), href: SITES[name] ?? null, name: manifest[name]?.title ?? null };
  }
  return null;
}

/** «Kraken · disponibilidad de xStocks · 19 nov 2026». */
export function sourceLabel(id: string): string {
  const s = data.sources[id];
  if (!s) return id;
  return s.read_on ? `${s.name} · ${dateEs(s.read_on)}` : s.name;
}

export function dateEs(iso: string): string {
  return new Date(`${iso}T12:00:00Z`)
    .toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .replace('.', '');
}

const bySlug = new Map(data.companies.map((c) => [c.slug, c]));

/** The 40 tech companies, most issuers first (the order the page shows). */
export function techTiles(): TechTile[] {
  return data.tech
    .map((slug) => bySlug.get(slug))
    .filter((c): c is RawCompany => c !== undefined)
    .map((c) => ({
      slug: c.slug,
      ticker: c.ticker,
      name: c.name,
      logo: logoFor(c.slug),
      venues: Array.from(new Set(c.exchanges.map((e) => e.venue))),
      issuers: Array.from(new Set(c.onchain.map((o) => o.issuer))),
    }))
    .sort((a, b) => b.issuers.length - a.issuers.length);
}

/** Symbol marks for issuers whose wordmark is unreadable in a square tile. */
const ISSUER_MARK: Record<string, string> = { robinhood: 'hood', coinbase: 'coin' };

/** Each issuer with how many companies it tokenizes across the whole catalog, most first. */
export function issuerStats(): IssuerStat[] {
  const counts = new Map<string, number>();
  for (const c of data.companies) {
    const ids = new Set([...c.onchain.map((o) => o.issuer), ...c.exchanges.map((e) => e.issuer)]);
    ids.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));
  }
  return Object.entries(data.issuers)
    .filter(([id]) => counts.has(id))
    .map(([id, i]) => ({ id, name: i.name, logo: logoFor(ISSUER_MARK[id] ?? `issuer-${id}`), stocks: counts.get(id) ?? 0, value: i.value?.usd ?? null, site: i.site ?? null, eligibility: i.eligibility_es ?? null }))
    .sort((a, b) => b.stocks - a.stocks);
}

/** Every source the catalog cites, for the page's sources list. */
export function sourceList(): { id: string; label: string; url: string | null }[] {
  return Object.entries(data.sources).map(([id, s]) => ({ id, label: sourceLabel(id), url: s.url }));
}

export const catalog = {
  version: data.version,
  metrics: data.metrics,
  sector: { ...data.sector, label: sourceLabel(data.sector.source) },
  issuers: data.issuers,
  venues: data.venues,
};
