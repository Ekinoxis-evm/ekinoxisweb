import { getCertificationPartners, getEducationPartners, getHackathons, getHackers, getProducts } from '@/lib/supabase/queries';
import HomeClient from './HomeClient';

export const revalidate = 60;

export default async function Home() {
  const [products, hackathons, hackers, education, certifications] = await Promise.all([
    getProducts(),
    getHackathons(),
    getHackers(),
    getEducationPartners(),
    getCertificationPartners(),
  ]);
  return (
    <HomeClient
      products={products}
      hackathons={hackathons}
      hackerCount={hackers.length}
      schools={[...education.universities, ...education.government]}
      certifications={certifications}
    />
  );
}
