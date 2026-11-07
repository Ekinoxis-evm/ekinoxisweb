import { NextResponse, type NextRequest } from 'next/server';
import { LANG_COOKIE } from '@/lib/i18n';

/**
 * Language routing.
 *
 *   /about      → rewritten to /en/about (English keeps the bare, canonical address)
 *   /es/about   → served as is
 *   /en/about   → 308 to /about, so the internal tree never leaks into links or Google
 *
 * A visitor who chose Spanish (cookie), or whose browser prefers it on a first visit,
 * is sent from a bare address to the /es one. Crawlers send no cookie and, in Google's
 * case, no Accept-Language, so they index English and follow hreflang to Spanish.
 */
export const config = {
  // Everything except API routes, the admin, Next internals, the analytics proxy,
  // the generated metadata images and static files (anything with a dot).
  matcher: ['/((?!api|admin|_next|ingest|opengraph-image|twitter-image|.*\\..*).*)'],
};

const YEAR = 60 * 60 * 24 * 365;

/** Paths that exist only in Spanish: the bare address redirects to /es. */
const SPANISH_ONLY = ['/recursos'];

/** True when the browser's first-choice language is Spanish. */
function prefersSpanish(acceptLanguage: string | null): boolean {
  const first = (acceptLanguage ?? '').split(',')[0]?.trim().toLowerCase() ?? '';
  return first.startsWith('es');
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/es' || pathname.startsWith('/es/')) return NextResponse.next();

  // Spanish-only sections (free resources from the Instagram reto) have no English page.
  if (SPANISH_ONLY.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    url.pathname = `/es${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  const saved = req.cookies.get(LANG_COOKIE)?.value;
  const wantsSpanish = saved === 'es' || (!saved && prefersSpanish(req.headers.get('accept-language')));
  if (wantsSpanish) {
    url.pathname = pathname === '/' ? '/es' : `/es${pathname}`;
    const res = NextResponse.redirect(url, 307);
    if (!saved) res.cookies.set(LANG_COOKIE, 'es', { path: '/', maxAge: YEAR, sameSite: 'lax' });
    return res;
  }

  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
  return NextResponse.rewrite(url);
}
