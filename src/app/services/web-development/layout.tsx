import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';

const description =
  'A website that books, sells and answers on WhatsApp for your business. Fixed price, live in 5 days: Online Business $1,500, Professional $3,000 with an AI assistant, Complete $6,000. Domain, hosting and business email included.';

export const metadata: Metadata = {
  title: 'Websites for your business — live in 5 days, from $1,500',
  description,
  alternates: { canonical: '/services/web-development' },
  openGraph: { title: 'Websites live in 5 days — Ekinoxis Labs', description, url: '/services/web-development' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            path: '/services/web-development',
            name: 'Business website development',
            serviceType: 'Web development',
            description,
            offers: [
              { name: 'Online Business', price: 1500, description: 'Admin panel, online booking, WhatsApp contact, card payments, domain, hosting and business email' },
              { name: 'Professional', price: 3000, description: 'Everything in Online Business plus an AI assistant that answers on WhatsApp' },
              { name: 'Complete', price: 6000, description: 'One place to manage every client, built to keep growing' },
            ],
          }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Websites', path: '/services/web-development' }]),
        ]}
      />
      {children}
    </>
  );
}
