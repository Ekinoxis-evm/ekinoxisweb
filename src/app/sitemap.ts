import type { MetadataRoute } from 'next';
import { courses } from '@/lib/courses';
import { DIVISIONS, caseStudyHref, hasCaseStudy } from '@/lib/portfolio';
import { getProducts } from '@/lib/supabase/queries';
import { LANGS, localizePath } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

/** Every page in both languages, each entry naming its pair so Google ties them together. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Case studies come from the database; an empty list just leaves them out.
  const studies = (await getProducts())
    .filter(hasCaseStudy)
    .map(caseStudyHref)
    .filter((h): h is string => Boolean(h));

  const routes = [
    '/',
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
    '/privacy',
    '/terms',
    '/data-deletion',
  ];
  const now = new Date();
  return routes.flatMap((path) => {
    const languages = { en: `${SITE_URL}${path}`, es: `${SITE_URL}${localizePath(path, 'es')}` };
    return LANGS.map((lang) => ({
      url: `${SITE_URL}${localizePath(path, lang)}`,
      lastModified: now,
      changeFrequency: path === '/' || path.startsWith('/portfolio') ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : path.startsWith('/services') ? 0.9 : 0.7,
      alternates: { languages },
    }));
  });
}
