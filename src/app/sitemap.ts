import type { MetadataRoute } from 'next';
import { courses } from '@/lib/courses';
import { DIVISIONS, caseStudyHref, hasCaseStudy } from '@/lib/portfolio';
import { getProducts } from '@/lib/supabase/queries';

const BASE = 'https://www.ekinoxis.xyz';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Case studies come from the database; an empty list just leaves them out.
  const studies = (await getProducts())
    .filter(hasCaseStudy)
    .map(caseStudyHref)
    .filter((h): h is string => Boolean(h));

  const routes = [
    '',
    '/services',
    '/services/consultation',
    '/services/web-development',
    '/services/app-building',
    '/portfolio',
    ...DIVISIONS.map((d) => `/portfolio/${d.slug}`),
    ...studies,
    '/courses',
    ...courses.map((c) => `/courses/${c.slug}`),
    '/education',
    '/hacker-house',
    '/about',
    '/tech-stack',
    '/brand',
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path.startsWith('/portfolio') ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/services') ? 0.9 : 0.7,
  }));
}
