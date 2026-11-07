import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/privacy', {
    title: { en: 'Privacy Policy', es: 'Política de privacidad' },
    description: {
      en: 'How Ekinoxis Labs collects, uses, shares and protects your data, and how to exercise your rights.',
      es: 'Cómo Ekinoxis Labs recoge, usa, comparte y protege tus datos, y cómo ejercer tus derechos.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
