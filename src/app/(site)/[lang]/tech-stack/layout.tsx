import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/tech-stack', {
    title: 'Tech Stack',
    description: {
      en: 'The tools Ekinoxis Labs builds with: AI, blockchain, cloud and front-end.',
      es: 'Las herramientas con las que construye Ekinoxis Labs: IA, blockchain, nube y front-end.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
