import { redirect } from 'next/navigation';
import { langOf } from '@/lib/i18n';
import { ACCIONES } from '@/lib/recursos';
import { catalog, dateEs, issuerStats, logoFor, sourceList, techTiles } from '@/lib/acciones/catalog';
import AccionesClient, { type BandItem } from './AccionesClient';

const band = (key: string, name: string, href?: string): BandItem => ({ name, href, logo: logoFor(key) });

/** The course exists only in Spanish; the bare (English) address sends visitors to it. */
export default function Page({ params }: { params: { lang: string } }) {
  if (langOf(params) !== 'es') redirect(`/es${ACCIONES.path}`);

  const m = catalog.metrics;
  const tiles = techTiles();
  const names = Object.fromEntries([
    ...Object.entries(catalog.venues).map(([id, v]) => [id, v.name]),
    ...Object.entries(catalog.issuers).map(([id, i]) => [id, i.name]),
  ]);

  return (
    <AccionesClient
      tiles={tiles}
      sources={sourceList()}
      issuers={issuerStats()}
      idLogos={Object.fromEntries([
        // Symbol marks where a wordmark is unreadable at card size.
        ...Object.keys(catalog.venues).map((id) => [id, logoFor(id === 'kraken' ? 'venue-kraken-mark' : `venue-${id}`)]),
        ...Object.keys(catalog.issuers).map((id) => [id, logoFor(`issuer-${id}`)]),
      ])}
      sector={{
        value: catalog.sector.distributed_value_usd,
        transfers: catalog.sector.monthly_transfer_volume_usd,
        holders: catalog.sector.holders,
        source: `RWA.xyz · ${dateEs(catalog.sector.read_on)}`,
      }}
      names={names}
      asOf={dateEs(m.as_of)}
      fork={{
        // Symbol marks where they exist: wordmarks are unreadable at fork-step size.
        account: [logoFor('venue-okx'), logoFor('venue-kraken-mark'), logoFor('venue-bybit')],
        a: [logoFor('issuer-xstocks')],
        b: [logoFor('tool-rabby'), logoFor('tool-metamask'), logoFor('tool-phantom'), logoFor('venue-uniswap')],
        goal: ['aapl', 'nvda', 'spcx'].map((slug) => logoFor(slug)),
      }}
      selfCustodyLogos={[logoFor('tool-rabby'), logoFor('tool-metamask'), logoFor('tool-phantom'), logoFor('venue-uniswap')]}
      custodialBand={ACCIONES.bands.custodial.venueIds.map((id) => band(`venue-${id}`, catalog.venues[id]?.name ?? id, catalog.venues[id]?.url))}
      selfCustodyBand={[
        ...ACCIONES.bands.selfCustody.wallets.map((w) => band(`tool-${w.id}`, w.name, w.url)),
        band(`venue-${ACCIONES.bands.selfCustody.dexId}`, catalog.venues.uniswap?.name ?? 'Uniswap', 'https://app.uniswap.org'),
      ]}
    />
  );
}
