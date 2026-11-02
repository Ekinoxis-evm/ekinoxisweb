import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/services', {
    section: true,
    title: { en: 'Services', es: 'Servicios' },
    description: {
      en: 'Three ways to work with Ekinoxis Labs: AI and crypto consultation from $100, websites live in 5 days from $1,500, custom software from $12,000. Colombia and the USA, in English or Spanish. Start with a free 30-minute call.',
      es: 'Tres formas de trabajar con Ekinoxis Labs: consultoría en IA y cripto desde $100, sitios web listos en 5 días desde $1,500, software a medida desde $12,000. Colombia y Estados Unidos, en español o inglés. Empieza con una llamada gratis de 30 minutos.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
