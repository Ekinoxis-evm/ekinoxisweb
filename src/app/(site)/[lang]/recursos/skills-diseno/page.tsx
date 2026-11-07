import { redirect } from 'next/navigation';
import { langOf } from '@/lib/i18n';
import { SKILLS_DISENO } from '@/lib/recursos';
import SkillsDisenoClient from './SkillsDisenoClient';

/** The guide exists only in Spanish; the bare (English) address sends visitors to it. */
export default function Page({ params }: { params: { lang: string } }) {
  if (langOf(params) !== 'es') redirect(`/es${SKILLS_DISENO.path}`);
  return <SkillsDisenoClient />;
}
