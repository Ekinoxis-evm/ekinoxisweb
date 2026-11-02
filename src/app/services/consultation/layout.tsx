import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';
import { BLOCK_HOURS, BLOCK_PRICE_USD } from '@/lib/leadForms';

const description =
  `AI, stablecoin payments, private agents and business automation, explained for your business. A free 30-minute call, then a ${BLOCK_HOURS}-hour personalized session for $${BLOCK_PRICE_USD}. In English or Spanish, Colombia and the USA.`;

export const metadata: Metadata = {
  title: `AI & Crypto Consultation — $${BLOCK_PRICE_USD} for ${BLOCK_HOURS} hours, first 30 min free`,
  description,
  alternates: { canonical: '/services/consultation' },
  openGraph: { title: 'AI & Crypto Consultation — Ekinoxis Labs', description, url: '/services/consultation' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            path: '/services/consultation',
            name: 'AI and crypto consultation',
            serviceType: 'Technology consulting',
            description,
            offers: [
              { name: 'Personalized Session', price: BLOCK_PRICE_USD, description: `${BLOCK_HOURS} hours with up to 5 people, recording and written summary` },
              { name: 'Team Workshop (half day)', price: 3800 },
              { name: 'Monthly Advisor', price: 3000, unit: 'month', description: '16 hours a month, 3-month minimum' },
            ],
          }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Consultation', path: '/services/consultation' }]),
        ]}
      />
      {children}
    </>
  );
}
