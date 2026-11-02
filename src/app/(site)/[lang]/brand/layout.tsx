import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/brand', {
    title: { en: 'Brand', es: 'Marca' },
    description: {
      en: 'The Ekinoxis brand kit: logo, colors and typography.',
      es: 'El kit de marca de Ekinoxis: logo, colores y tipografía.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
