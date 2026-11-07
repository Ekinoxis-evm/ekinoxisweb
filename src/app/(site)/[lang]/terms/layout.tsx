import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/terms', {
    title: { en: 'Terms of Service', es: 'Términos del servicio' },
    description: {
      en: 'The rules for using ekinoxis.xyz, booking a call, buying a course and working with Ekinoxis Labs.',
      es: 'Las reglas para usar ekinoxis.xyz, agendar una llamada, comprar un curso y trabajar con Ekinoxis Labs.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
