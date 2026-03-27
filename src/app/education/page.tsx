import { getEducationPartners } from '@/lib/supabase/queries'
import EducationClient from './EducationClient'

export const revalidate = 60

export default async function EducationPage() {
  const { universities, government } = await getEducationPartners()
  return <EducationClient universities={universities} government={government} />
}
