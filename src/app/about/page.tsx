import type { Metadata } from 'next';
import { getHackers } from '@/lib/supabase/queries';
import AboutClient from './AboutClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About us',
  description: 'Ekinoxis Labs — the first innovation lab of the Colombian Pacific. Who we are, what we do, and how we work. Innovation Without Frontiers.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const hackers = await getHackers();
  return <AboutClient hackers={hackers} />;
}
