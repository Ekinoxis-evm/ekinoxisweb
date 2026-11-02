import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';

const description =
  'Web and mobile software built for your business, with AI and blockchain where they earn their place. Fixed price for fixed scope: First Version from $12,000 in 4–6 weeks, Full Product from $38,000, your own team from $16,000 a month.';

export const metadata: Metadata = {
  title: 'Custom software & apps with AI and blockchain — from $12,000',
  description,
  alternates: { canonical: '/services/app-building' },
  openGraph: { title: 'Custom software & apps — Ekinoxis Labs', description, url: '/services/app-building' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            path: '/services/app-building',
            name: 'Custom software and app development',
            serviceType: 'Software development',
            description,
            offers: [
              { name: 'First Version', price: 12000, description: 'One thing your users can do, done properly, in 4–6 weeks' },
              { name: 'Full Product', price: 38000, description: 'The whole product, connected to the systems you already use, in 8–12 weeks' },
              { name: 'Your Own Team', price: 16000, unit: 'month', description: '2–3 engineers and a product lead, 3-month minimum' },
            ],
          }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Software & apps', path: '/services/app-building' }]),
        ]}
      />
      {children}
    </>
  );
}
