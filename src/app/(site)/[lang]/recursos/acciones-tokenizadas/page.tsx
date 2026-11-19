import { redirect } from 'next/navigation';
import { langOf } from '@/lib/i18n';
import { ACCIONES } from '@/lib/recursos';
import AccionesClient from './AccionesClient';

/** The course exists only in Spanish; the bare (English) address sends visitors to it. */
export default function Page({ params }: { params: { lang: string } }) {
  if (langOf(params) !== 'es') redirect(`/es${ACCIONES.path}`);
  return <AccionesClient />;
}
