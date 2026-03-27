import { getHackers } from '@/lib/supabase/queries'
import HackersClient from './HackersClient'

export const revalidate = 60

export default async function HackersPage() {
  const hackers = await getHackers()
  return <HackersClient hackers={hackers} />
}
