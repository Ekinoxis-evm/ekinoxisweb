import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import raw from '@/data/acciones/catalogo.json';
import logoManifest from '../../../public/recursos/acciones/logos/manifest.json';

/**
 * The tokenized-stocks catalog: which company can be bought as a token, from whom (issuer),
 * and where (route A: an exchange holds it for you · route B: your own wallet on Uniswap).
 *
 * A dated snapshot built in products/digital products/acciones-tokenizadas/datos/merge.py and copied here as
 * src/data/acciones/catalogo.json. No prices by decision. Metrics are computed there, never
 * typed here. Server only (it reads the filesystem); pages pass `techTiles()` to the client.
 */

type Level = 'oficial' | 'pantalla' | 'pendiente';

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
  companies: RawCompany[];
}

const data = raw as unknown as RawCatalog;
const manifest = logoManifest as Record<string, { hex?: string }>;

export interface Logo {
  src: string;
  /** Near-black brand colour: painted in the page's text colour instead (DESIGN.md: never a white tile). */
  mono: boolean;
  /** A wordmark, not a symbol: it gets the tile's width instead of a square box. */
  wide: boolean;
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
    return { src, mono: hex ? luminance(hex) < 0.2 : false, wide: isWide(name, file) };
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

/** Every source the catalog cites, for the page's sources list. */
export function sourceList(): { id: string; label: string; url: string | null }[] {
  return Object.entries(data.sources).map(([id, s]) => ({ id, label: sourceLabel(id), url: s.url }));
}

export const catalog = {
  version: data.version,
  metrics: data.metrics,
  issuers: data.issuers,
  venues: data.venues,
};
