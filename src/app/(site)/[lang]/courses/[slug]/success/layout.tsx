import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

// A confirmation screen after checkout — useful to the buyer, noise to a search engine.
export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  return pageMetadata(langOf(params), `/courses/${params.slug}/success`, {
    noIndex: true,
    title: { en: 'Enrollment confirmed', es: 'Inscripción confirmada' },
    description: { en: 'Your seat is booked.', es: 'Tu cupo está reservado.' },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
