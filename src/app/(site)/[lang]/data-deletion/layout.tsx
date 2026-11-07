import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/data-deletion', {
    title: { en: 'Data deletion', es: 'Eliminación de datos' },
    description: {
      en: 'How to ask Ekinoxis Labs to delete your data, what happens next and what must be kept.',
      es: 'Cómo pedir a Ekinoxis Labs que elimine tus datos, qué pasa después y qué debe conservarse.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
