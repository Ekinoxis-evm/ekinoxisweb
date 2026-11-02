import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/education', {
    title: { en: 'Education', es: 'Educación' },
    description: {
      en: 'University partnerships, workshops and certifications in blockchain and AI across Latin America.',
      es: 'Alianzas con universidades, talleres y certificaciones en blockchain e IA en toda Latinoamérica.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
