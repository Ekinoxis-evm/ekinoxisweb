import { getCertificationPartners } from '@/lib/supabase/queries'
import CertificationsClient from './CertificationsClient'

export const revalidate = 60

export default async function CertificationsPage() {
  const partners = await getCertificationPartners()
  return <CertificationsClient partners={partners} />
}
