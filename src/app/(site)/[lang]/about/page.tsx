import type { Metadata } from 'next';
import { getHackers } from '@/lib/supabase/queries';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import AboutClient from './AboutClient';

export const revalidate = 60;

type Props = { params: { lang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return pageMetadata(langOf(params), '/about', {
    title: { en: 'About us', es: 'Nosotros' },
    description: {
      en: 'Ekinoxis Labs — the first innovation lab of the Colombian Pacific. Who we are, what we do, and how we work. Innovation Without Frontiers.',
      es: 'Ekinoxis Labs — el primer laboratorio de innovación del Pacífico colombiano. Quiénes somos, qué hacemos y cómo trabajamos. Innovación sin fronteras.',
    },
  });
}

export default async function AboutPage() {
  const hackers = await getHackers();
  return <AboutClient hackers={hackers} />;
}
