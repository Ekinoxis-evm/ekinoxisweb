import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { HOME_CRUMB, SERVICES_CRUMB, breadcrumbJsonLd, pageMetadata, serviceJsonLd, type Bi } from '@/lib/seo';
import { langOf } from '@/lib/i18n';

const description: Bi = {
  en: 'Web and mobile software built for your business, with AI and blockchain where they earn their place. Fixed price for fixed scope: First Version from $12,000 in 4–6 weeks, Full Product from $38,000, your own team from $16,000 a month.',
  es: 'Software web y móvil construido para tu negocio, con IA y blockchain donde realmente aportan. Precio fijo por alcance fijo: Primera Versión desde $12,000 en 4–6 semanas, Producto Completo desde $38,000, tu propio equipo desde $16,000 al mes.',
};

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(langOf(params), '/services/app-building', {
    title: {
      en: 'Custom software & apps with AI and blockchain — from $12,000',
      es: 'Software y apps a medida con IA y blockchain — desde $12,000',
    },
    ogTitle: { en: 'Custom software & apps — Ekinoxis Labs', es: 'Software y apps a medida — Ekinoxis Labs' },
    description,
  });
}

export default function Layout({ children, params }: Props & { children: React.ReactNode }) {
  const lang = langOf(params);
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            lang,
            path: '/services/app-building',
            name: { en: 'Custom software and app development', es: 'Desarrollo de software y apps a medida' },
            serviceType: 'Software development',
            description,
            offers: [
              {
                name: { en: 'First Version', es: 'Primera Versión' },
                price: 12000,
                description: {
                  en: 'One thing your users can do, done properly, in 4–6 weeks',
                  es: 'Una cosa que tus usuarios puedan hacer, bien hecha, en 4–6 semanas',
                },
              },
              {
                name: { en: 'Full Product', es: 'Producto Completo' },
                price: 38000,
                description: {
                  en: 'The whole product, connected to the systems you already use, in 8–12 weeks',
                  es: 'El producto completo, conectado a los sistemas que ya usas, en 8–12 semanas',
                },
              },
              {
                name: { en: 'Your Own Team', es: 'Tu Propio Equipo' },
                price: 16000,
                unit: 'month',
                description: { en: '2–3 engineers and a product lead, 3-month minimum', es: '2–3 ingenieros y un líder de producto, mínimo 3 meses' },
              },
            ],
          }),
          breadcrumbJsonLd(lang, [HOME_CRUMB, SERVICES_CRUMB, { name: { en: 'Software & apps', es: 'Software y apps' }, path: '/services/app-building' }]),
        ]}
      />
      {children}
    </>
  );
}
