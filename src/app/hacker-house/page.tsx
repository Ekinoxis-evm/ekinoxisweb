import { getHackathons } from '@/lib/supabase/queries'
import HackerHouseClient from './HackerHouseClient'

export const revalidate = 60

export default async function HackerHousePage() {
  const hackathons = await getHackathons()
  return <HackerHouseClient hackathons={hackathons} />
}
