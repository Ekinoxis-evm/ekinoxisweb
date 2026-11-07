/**
 * Everything a search engine reads, built in one place so every page agrees:
 *
 *  - `siteMetadata` / `pageMetadata` — title, description, canonical and the
 *    hreflang pair (English at the bare path, Spanish under /es) for each page.
 *  - Structured data (JSON-LD): Organization on every page, Service + Offer and
 *    BreadcrumbList on the service pages. Rendered by <JsonLd /> in a server layout.
 */

import type { Metadata } from 'next';
import { content } from './content';
import { hreflang, localizePath, type Lang } from './i18n';

export const SITE_URL = 'https://www.ekinoxis.xyz';
export const ORG_ID = `${SITE_URL}/#organization`;

type Json = Record<string, unknown>;
export type Bi = { en: string; es: string };

const pick = (v: string | Bi, lang: Lang) => (typeof v === 'string' ? v : v[lang]);
const ogLocale = (lang: Lang) => (lang === 'es' ? 'es_CO' : 'en_US');

const socials = Object.values(content.en.socials as Record<string, string>).filter((u) => typeof u === 'string' && u.startsWith('http'));

const SITE_TITLE: Bi = {
  en: 'Ekinoxis Labs — AI & Crypto Innovation Lab · Colombia & USA',
  es: 'Ekinoxis Labs — Laboratorio de innovación en IA y cripto · Colombia y USA',
};
const SITE_DESCRIPTION: Bi = {
  en: 'AI, blockchain and crypto software for your business, from Cali, Colombia and Casper, Wyoming. Consultation from $100, websites live in 5 days from $1,500, custom apps from $12,000. Book a free 30-minute call.',
  es: 'Software con IA, blockchain y cripto para tu negocio, desde Cali, Colombia y Casper, Wyoming. Consultoría desde $100, sitios web listos en 5 días desde $1,500, apps a medida desde $12,000. Agenda una llamada gratis de 30 minutos.',
};
const OG_TITLE: Bi = { en: 'Ekinoxis Labs — Innovation Without Frontiers', es: 'Ekinoxis Labs — Innovación sin fronteras' };
const OG_DESCRIPTION: Bi = {
  en: 'The first AI and crypto innovation lab of the Colombian Pacific. We unlock the power of frontier technologies for your business. Colombia & USA.',
  es: 'El primer laboratorio de innovación en IA y cripto del Pacífico colombiano. Desbloqueamos el poder de las tecnologías de frontera para tu negocio. Colombia y USA.',
};
/** The link preview, drawn by src/app/opengraph-image.tsx. Named here because a file under a route group is not picked up automatically. */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Ekinoxis — Innovation Without Frontiers. Unlocking the power of frontier technologies.',
};

const KEYWORDS: Record<Lang, string[]> = {
  en: ['AI consulting Colombia', 'blockchain development', 'stablecoin payments', 'web development Cali', 'custom software', 'innovation lab', 'Ekinoxis'],
  es: ['consultoría IA Colombia', 'desarrollo blockchain', 'pagos con stablecoins', 'desarrollo web Cali', 'software a medida', 'laboratorio de innovación', 'Ekinoxis'],
};

/** The root metadata for one language: site title, description, icons, Open Graph and the home hreflang pair. */
export function siteMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_TITLE[lang], template: '%s — Ekinoxis Labs' },
    description: SITE_DESCRIPTION[lang],
    keywords: KEYWORDS[lang],
    alternates: { canonical: localizePath('/', lang), languages: hreflang('/') },
    // The brand favicon set — the mark, rendered at each size a browser asks for.
    icons: {
      icon: [
        { url: '/brand/favicon/favicon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/brand/favicon/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/brand/favicon/favicon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/brand/favicon/favicon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/brand/favicon/favicon-180.png', sizes: '180x180', type: 'image/png' }],
    },
    openGraph: {
      title: OG_TITLE[lang],
      description: OG_DESCRIPTION[lang],
      url: localizePath('/', lang),
      siteName: 'Ekinoxis Labs',
      type: 'website',
      locale: ogLocale(lang),
      alternateLocale: [ogLocale(lang === 'en' ? 'es' : 'en')],
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: OG_TITLE[lang], description: OG_DESCRIPTION[lang], images: [OG_IMAGE.url] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export type PageMeta = {
  title: string | Bi;
  description: string | Bi;
  /** Open Graph title when it should differ from the page title (the root template is not applied to it). */
  ogTitle?: string | Bi;
  /** A section root: child pages get "%s — Ekinoxis Labs". */
  section?: boolean;
  /** Keep the page out of search results (confirmation screens). */
  noIndex?: boolean;
  /** An image for the link preview, when the page has its own. */
  image?: string;
};

/** Metadata for one page in one language, with canonical and hreflang at the bare path. */
export function pageMetadata(lang: Lang, path: string, m: PageMeta): Metadata {
  const title = pick(m.title, lang);
  const description = pick(m.description, lang);
  const url = localizePath(path, lang);
  return {
    title: m.section ? { default: title, template: '%s — Ekinoxis Labs' } : title,
    description,
    alternates: { canonical: url, languages: hreflang(path) },
    openGraph: {
      title: m.ogTitle ? pick(m.ogTitle, lang) : `${title} — Ekinoxis Labs`,
      description,
      url,
      siteName: 'Ekinoxis Labs',
      type: 'website',
      locale: ogLocale(lang),
      images: [m.image ?? OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: pick(m.ogTitle ?? title, lang), description, images: [m.image ?? OG_IMAGE.url] },
    ...(m.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function organizationJsonLd(lang: Lang = 'en'): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Ekinoxis Labs',
    alternateName: 'Ekinoxis',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/favicon/favicon-512.png`,
    slogan: lang === 'es' ? 'Innovación sin fronteras' : 'Innovation Without Frontiers',
    description:
      lang === 'es'
        ? 'El primer laboratorio de innovación en IA y cripto del Pacífico colombiano. Consultoría, sitios web y software a medida con IA y blockchain para negocios en Colombia y Estados Unidos.'
        : 'The first AI and crypto innovation lab of the Colombian Pacific. Consultation, websites and custom software with AI and blockchain for businesses in Colombia and the USA.',
    email: 'hola@ekinoxis.xyz',
    foundingLocation: { '@type': 'Place', name: 'Cali, Valle del Cauca, Colombia' },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Zonamerica, Calle 36 #128-321',
        addressLocality: 'Cali',
        addressRegion: 'Valle del Cauca',
        addressCountry: 'CO',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '159 N Wolcott St, Suite 133',
        addressLocality: 'Casper',
        addressRegion: 'WY',
        postalCode: '82601',
        addressCountry: 'US',
      },
    ],
    areaServed: [{ '@type': 'Country', name: 'Colombia' }, { '@type': 'Country', name: 'United States' }],
    knowsAbout: ['Artificial intelligence', 'Blockchain', 'Stablecoin payments', 'Business automation', 'Web development', 'Custom software'],
    knowsLanguage: ['en', 'es'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hola@ekinoxis.xyz',
      availableLanguage: ['English', 'Spanish'],
      url: `${SITE_URL}${localizePath('/services', lang)}`,
    },
    sameAs: socials,
  };
}

export type OfferSpec = { name: string | Bi; price: number; unit?: 'one-time' | 'month'; description?: string | Bi };

/** A service page: what it is, who provides it, and the published prices. */
export function serviceJsonLd(spec: {
  lang: Lang;
  path: string;
  name: string | Bi;
  serviceType: string;
  description: string | Bi;
  offers: OfferSpec[];
}): Json {
  const { lang } = spec;
  const url = `${SITE_URL}${localizePath(spec.path, lang)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${spec.path}#service`,
    name: pick(spec.name, lang),
    serviceType: spec.serviceType,
    description: pick(spec.description, lang),
    url,
    inLanguage: lang,
    provider: { '@id': ORG_ID },
    areaServed: [{ '@type': 'Country', name: 'Colombia' }, { '@type': 'Country', name: 'United States' }],
    availableLanguage: ['English', 'Spanish'],
    offers: spec.offers.map((o) => ({
      '@type': 'Offer',
      name: pick(o.name, lang),
      ...(o.description ? { description: pick(o.description, lang) } : {}),
      url,
      priceCurrency: 'USD',
      price: o.price,
      ...(o.unit === 'month'
        ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: o.price, priceCurrency: 'USD', unitText: 'month' } }
        : {}),
      availability: 'https://schema.org/InStock',
    })),
  };
}

/** Breadcrumbs: Home › Services › Page, at the addresses of the page's language. */
export function breadcrumbJsonLd(lang: Lang, items: { name: string | Bi; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: pick(it.name, lang),
      item: `${SITE_URL}${localizePath(it.path, lang)}`,
    })),
  };
}

export const HOME_CRUMB = { name: { en: 'Home', es: 'Inicio' }, path: '/' };
export const SERVICES_CRUMB = { name: { en: 'Services', es: 'Servicios' }, path: '/services' };
