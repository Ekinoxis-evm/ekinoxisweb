import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import { ACCIONES as R } from '@/lib/recursos';
import MetaPixel from '@/components/MetaPixel';

const URL = `/es${R.path}`;

/** Spanish only: one canonical address, no hreflang pair (the English path redirects here). */
export const metadata: Metadata = {
  title: R.metaTitle,
  description: R.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: `${R.metaTitle} — Ekinoxis Labs`,
    description: R.metaDescription,
    url: URL,
    siteName: 'Ekinoxis Labs',
    type: 'article',
    locale: 'es_CO',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: R.metaTitle, description: R.metaDescription, images: [OG_IMAGE.url] },
};

/** The Meta pixel loads on the workshop pages only (landing, thanks, prep), for the ads that point here. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MetaPixel />
    </>
  );
}
