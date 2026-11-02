import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { HOME_CRUMB, SERVICES_CRUMB, breadcrumbJsonLd, pageMetadata, serviceJsonLd, type Bi } from '@/lib/seo';
import { langOf } from '@/lib/i18n';
import { BLOCK_HOURS, BLOCK_PRICE_USD } from '@/lib/leadForms';

const description: Bi = {
  en: `AI, stablecoin payments, private agents and business automation, explained for your business. A free 30-minute call, then a ${BLOCK_HOURS}-hour personalized session for $${BLOCK_PRICE_USD}. In English or Spanish, Colombia and the USA.`,
  es: `IA, pagos con stablecoins, agentes privados y automatización de negocios, explicados para tu empresa. Una llamada gratis de 30 minutos y luego una sesión personalizada de ${BLOCK_HOURS} horas por $${BLOCK_PRICE_USD}. En español o inglés, Colombia y Estados Unidos.`,
};

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(langOf(params), '/services/consultation', {
    title: {
      en: `AI & Crypto Consultation — $${BLOCK_PRICE_USD} for ${BLOCK_HOURS} hours, first 30 min free`,
      es: `Consultoría en IA y cripto — $${BLOCK_PRICE_USD} por ${BLOCK_HOURS} horas, los primeros 30 min gratis`,
    },
    ogTitle: { en: 'AI & Crypto Consultation — Ekinoxis Labs', es: 'Consultoría en IA y cripto — Ekinoxis Labs' },
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
            path: '/services/consultation',
            name: { en: 'AI and crypto consultation', es: 'Consultoría en IA y cripto' },
            serviceType: 'Technology consulting',
            description,
            offers: [
              {
                name: { en: 'Personalized Session', es: 'Sesión Personalizada' },
                price: BLOCK_PRICE_USD,
                description: {
                  en: `${BLOCK_HOURS} hours with up to 5 people, recording and written summary`,
                  es: `${BLOCK_HOURS} horas con hasta 5 personas, grabación y resumen escrito`,
                },
              },
              { name: { en: 'Team Workshop (half day)', es: 'Taller de Equipo (medio día)' }, price: 3800 },
              {
                name: { en: 'Monthly Advisor', es: 'Asesor Mensual' },
                price: 3000,
                unit: 'month',
                description: { en: '16 hours a month, 3-month minimum', es: '16 horas al mes, mínimo 3 meses' },
              },
            ],
          }),
          breadcrumbJsonLd(lang, [HOME_CRUMB, SERVICES_CRUMB, { name: { en: 'Consultation', es: 'Consultoría' }, path: '/services/consultation' }]),
        ]}
      />
      {children}
    </>
  );
}
