import { getHackathons, getHackers, getProducts } from '@/lib/supabase/queries';
import HomeClient from './HomeClient';

export const revalidate = 60;

export default async function Home() {
  const [products, hackathons, hackers] = await Promise.all([getProducts(), getHackathons(), getHackers()]);
  return <HomeClient products={products} hackathonCount={hackathons.length} hackerCount={hackers.length} />;
}
