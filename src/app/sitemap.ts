import type { MetadataRoute } from 'next';
import { courses } from '@/lib/courses';
import { DIVISIONS } from '@/lib/portfolio';

const BASE = 'https://www.ekinoxis.xyz';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/services',
    '/services/consultation',
    '/services/web-development',
    '/services/app-building',
    '/portfolio',
    ...DIVISIONS.map((d) => `/portfolio/${d.slug}`),
    '/courses',
    ...courses.map((c) => `/courses/${c.slug}`),
    '/education',
    '/hacker-house',
    '/hackers',
    '/culture',
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
