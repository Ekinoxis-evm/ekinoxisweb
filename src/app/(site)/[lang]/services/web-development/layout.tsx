import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { HOME_CRUMB, SERVICES_CRUMB, breadcrumbJsonLd, pageMetadata, serviceJsonLd, type Bi } from '@/lib/seo';
import { langOf } from '@/lib/i18n';

const description: Bi = {
  en: 'A website that books, sells and answers on WhatsApp for your business. Fixed price, live in 5 days: Online Business $1,500, Professional $3,000 with an AI assistant, Complete $6,000. Domain, hosting and business email included.',
  es: 'Un sitio web que agenda, vende y responde por WhatsApp para tu negocio. Precio fijo, listo en 5 días: Negocio Online $1,500, Profesional $3,000 con asistente de IA, Completo $6,000. Dominio, hosting y correo de empresa incluidos.',
};

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(langOf(params), '/services/web-development', {
    title: {
      en: 'Websites for your business — live in 5 days, from $1,500',
      es: 'Sitios web para tu negocio — listos en 5 días, desde $1,500',
    },
    ogTitle: { en: 'Websites live in 5 days — Ekinoxis Labs', es: 'Sitios web listos en 5 días — Ekinoxis Labs' },
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
            path: '/services/web-development',
            name: { en: 'Business website development', es: 'Desarrollo de sitios web para negocios' },
            serviceType: 'Web development',
            description,
            offers: [
              {
                name: { en: 'Online Business', es: 'Negocio Online' },
                price: 1500,
                description: {
                  en: 'Admin panel, online booking, WhatsApp contact, card payments, domain, hosting and business email',
                  es: 'Panel de administración, agendamiento en línea, contacto por WhatsApp, pagos con tarjeta, dominio, hosting y correo de empresa',
                },
              },
              {
                name: { en: 'Professional', es: 'Profesional' },
                price: 3000,
                description: {
                  en: 'Everything in Online Business plus an AI assistant that answers on WhatsApp',
                  es: 'Todo lo de Negocio Online más un asistente de IA que responde en WhatsApp',
                },
              },
              {
                name: { en: 'Complete', es: 'Completo' },
                price: 6000,
                description: { en: 'One place to manage every client, built to keep growing', es: 'Un solo lugar para manejar cada cliente, hecho para seguir creciendo' },
              },
            ],
          }),
          breadcrumbJsonLd(lang, [HOME_CRUMB, SERVICES_CRUMB, { name: { en: 'Websites', es: 'Sitios web' }, path: '/services/web-development' }]),
        ]}
      />
      {children}
    </>
  );
}
