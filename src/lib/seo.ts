/**
 * Structured data (JSON-LD) for search engines, built once here so every page
 * describes the same organization. Google reads Organization on the home page
 * to disambiguate the brand, and Service + Offer on service pages to understand
 * what is sold and at what price. Rendered by <JsonLd /> in a server layout.
 */

import { content } from './content';

export const SITE_URL = 'https://www.ekinoxis.xyz';
export const ORG_ID = `${SITE_URL}/#organization`;

type Json = Record<string, unknown>;

const socials = Object.values(content.en.socials as Record<string, string>).filter((u) => typeof u === 'string' && u.startsWith('http'));

export function organizationJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Ekinoxis Labs',
    alternateName: 'Ekinoxis',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/favicon/favicon-512.png`,
    slogan: 'Innovation Without Frontiers',
    description:
      'The first AI and crypto innovation lab of the Colombian Pacific. Consultation, websites and custom software with AI and blockchain for businesses in Colombia and the USA.',
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
      url: `${SITE_URL}/services`,
    },
    sameAs: socials,
  };
}

export type OfferSpec = { name: string; price: number; unit?: 'one-time' | 'month'; description?: string };

/** A service page: what it is, who provides it, and the published prices. */
export function serviceJsonLd(spec: { path: string; name: string; serviceType: string; description: string; offers: OfferSpec[] }): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${spec.path}#service`,
    name: spec.name,
    serviceType: spec.serviceType,
    description: spec.description,
    url: `${SITE_URL}${spec.path}`,
    provider: { '@id': ORG_ID },
    areaServed: [{ '@type': 'Country', name: 'Colombia' }, { '@type': 'Country', name: 'United States' }],
    availableLanguage: ['English', 'Spanish'],
    offers: spec.offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      description: o.description,
      url: `${SITE_URL}${spec.path}`,
      priceCurrency: 'USD',
      price: o.price,
      ...(o.unit === 'month'
        ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: o.price, priceCurrency: 'USD', unitText: 'month' } }
        : {}),
      availability: 'https://schema.org/InStock',
    })),
  };
}

/** Breadcrumbs: Home › Services › Page. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
