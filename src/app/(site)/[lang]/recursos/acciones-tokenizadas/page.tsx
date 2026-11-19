import { redirect } from 'next/navigation';
import { langOf } from '@/lib/i18n';
import { ACCIONES } from '@/lib/recursos';
import { catalog, dateEs, logoFor, sourceList, techTiles } from '@/lib/acciones/catalog';
import AccionesClient, { type BandItem } from './AccionesClient';

const band = (key: string, name: string, href?: string): BandItem => ({ name, href, logo: logoFor(key) });

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
