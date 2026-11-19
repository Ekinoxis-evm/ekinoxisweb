import { redirect } from 'next/navigation';
import { langOf } from '@/lib/i18n';
import { ACCIONES } from '@/lib/recursos';
import { catalog, dateEs, logoFor, sourceList, techTiles, type Logo } from '@/lib/acciones/catalog';
import AccionesClient, { type BandItem } from './AccionesClient';

/** Logos the site already carries for its tech-stack page, used until an official file lands in logos/. */
const EXISTING: Record<string, Logo> = {
  'venue-uniswap': { src: '/tecnologies/Crypto/Protocols/uniswap-uni-logo.png', mono: false },
  'issuer-coinbase': { src: '/tecnologies/paymentintegrations/Coinbase/Coinbase.png', mono: false },
};

const band = (key: string, name: string, href?: string): BandItem => ({ name, href, logo: logoFor(key) ?? EXISTING[key] ?? null });

/** The course exists only in Spanish; the bare (English) address sends visitors to it. */
export default function Page({ params }: { params: { lang: string } }) {
  if (langOf(params) !== 'es') redirect(`/es${ACCIONES.path}`);

  const m = catalog.metrics;
  const maxName = m.top_by_issuers[0]?.[1] ?? '';
  const tiles = techTiles();
  const names = Object.fromEntries([
    ...Object.entries(catalog.venues).map(([id, v]) => [id, v.name]),
    ...Object.entries(catalog.issuers).map(([id, i]) => [id, i.name]),
  ]);

  return (
    <AccionesClient
      tiles={tiles}
      sources={sourceList()}
      names={names}
      asOf={dateEs(m.as_of)}
      metrics={{ tech: m.tech_companies, issuers: m.issuers, venues: m.venues, max: m.issuers_per_company_max, maxName }}
      tools={[
        ...ACCIONES.bands.toolIds.map((id) => band(`venue-${id}`, catalog.venues[id]?.name ?? id, catalog.venues[id]?.url)),
        band('tool-rabby', ACCIONES.bands.rabby.name, ACCIONES.bands.rabby.url),
      ]}
      issuerBand={ACCIONES.bands.issuerIds.map((id) => band(`issuer-${id}`, catalog.issuers[id]?.name ?? id, catalog.issuers[id]?.site))}
    />
  );
}
