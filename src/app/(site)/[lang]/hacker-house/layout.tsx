import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/hacker-house', {
    title: 'Hacker House',
    description: {
      en: 'The hackathons and hacker houses Ekinoxis Labs builds at, and what came out of them.',
      es: 'Los hackathons y hacker houses donde construye Ekinoxis Labs, y lo que salió de ellos.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
