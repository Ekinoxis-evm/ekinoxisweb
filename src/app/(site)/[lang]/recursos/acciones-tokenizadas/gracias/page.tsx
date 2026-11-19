import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { langOf } from '@/lib/i18n';
import { ACCIONES } from '@/lib/recursos';
import GraciasClient from './GraciasClient';

// A confirmation screen after payment: useful to the buyer, noise to a search engine.
export const metadata: Metadata = {
  title: ACCIONES.thanks.metaTitle,
  robots: { index: false, follow: false },
};

export default function Page({ params }: { params: { lang: string } }) {
  if (langOf(params) !== 'es') redirect(`/es${ACCIONES.thanks.path}`);
  return <GraciasClient />;
}
