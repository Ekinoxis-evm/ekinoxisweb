import type { Language } from '@/lib/content';

/**
 * Two languages, two sets of addresses. English lives at the bare path (`/about`),
 * Spanish under `/es` (`/es/about`). The middleware rewrites bare paths to the
 * internal `/en` tree, so every page component receives `params.lang`.
 */
export type Lang = Language;
export const LANGS: readonly Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';
/** The visitor's remembered choice. The middleware reads it to send a returning visitor to the right address. */
export const LANG_COOKIE = 'ekx-lang';

export function isLang(v: unknown): v is Lang {
  return v === 'en' || v === 'es';
}

/** An address on this site, as opposed to http(s), mailto, tel or a bare #anchor. */
const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');

const hasEsPrefix = (href: string) =>
  href === '/es' || href.startsWith('/es/') || href.startsWith('/es?') || href.startsWith('/es#');

/** `/about` → `/es/about` in Spanish; English keeps the bare address. External and already-prefixed hrefs pass through. */
export function localizePath(href: string, lang: Lang): string {
  if (!isInternal(href) || hasEsPrefix(href) || lang === 'en') return href;
  return href === '/' ? '/es' : `/es${href}`;
}

/** A pathname split into its language and the bare (English) path. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  if (pathname === '/es') return { lang: 'es', path: '/' };
  if (pathname.startsWith('/es/')) return { lang: 'es', path: pathname.slice(3) };
  return { lang: 'en', path: pathname };
}

/** The same page in another language. */
export function switchLangPath(pathname: string, lang: Lang): string {
  return localizePath(splitPath(pathname).path, lang);
}

/** hreflang alternates for a bare path. English is the default for every other language. */
export function hreflang(path: string) {
  return { en: path, es: localizePath(path, 'es'), 'x-default': path };
}

/** The language of a route, from its `[lang]` param; anything unknown reads as English. */
export function langOf(params: { lang?: string }): Lang {
  return isLang(params.lang) ? params.lang : DEFAULT_LANG;
}
