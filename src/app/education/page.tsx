import { getEducationPartners, getCertificationPartners } from '@/lib/supabase/queries'
import KnowledgeClient from './KnowledgeClient'

/**
 * Education, certifications and research — one page, three sections.
 * /certifications and /research redirect here (see next.config.js).
 */

export const revalidate = 60

export default async function EducationPage() {
  const [{ universities, government }, certifications] = await Promise.all([
    getEducationPartners(),
    getCertificationPartners(),
  ])

  return (
    <KnowledgeClient
      universities={universities}
      government={government}
      certifications={certifications}
    />
  )
}
