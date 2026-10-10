import { getHackathons, getProducts } from '@/lib/supabase/queries'
import HackerHouseClient from './HackerHouseClient'

export const revalidate = 60

export default async function HackerHousePage() {
  const [hackathons, products] = await Promise.all([getHackathons(), getProducts()])
  return <HackerHouseClient hackathons={hackathons} products={products} />
}
