import { getEducationPartners, getCertificationPartners, getHackathons, getProducts } from '@/lib/supabase/queries'
import KnowledgeClient from './KnowledgeClient'

/**
 * Education, certifications and research — one page, three sections.
 * /certifications and /research redirect here (see next.config.js).
 */

export const revalidate = 60

export default async function EducationPage() {
  const [{ universities, government }, certifications, products, hackathons] = await Promise.all([
    getEducationPartners(),
    getCertificationPartners(),
    getProducts(),
    getHackathons(),
  ])

  return (
    <KnowledgeClient
      universities={universities}
      government={government}
      certifications={certifications}
      productCount={products.length}
      hackathonCount={hackathons.length}
    />
  )
}
