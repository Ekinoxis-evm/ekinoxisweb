'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { TOOLS } from '@/lib/tools';
import { createClient } from '@/lib/supabase/client';
import LogoMarquee, { type MarqueeLogo } from './LogoMarquee';

/**
 * The tools band — every logo on /tech-stack, dealt round-robin across categories
 * so it mixes AI, chains, payments… instead of running ten AI logos in a row.
 * Shared by the home page and the services pages.
 */
export function ToolsBand() {
  const { language } = useLanguage();
  const en = language === 'en';
  const groups = Object.values(content[language].technologies.categories as Record<string, { logos?: string[]; tools?: string[] }>).map(
    (c) => [...(c.logos ?? []), ...(c.tools ?? [])],
  );
  const tools: MarqueeLogo[] = Array.from({ length: Math.max(...groups.map((g) => g.length)) }, (_, i) => groups.map((g) => g[i]))
    .flat()
    .filter((src): src is string => Boolean(src))
    .map((src) => ({ name: TOOLS[src]?.name ?? '', src, href: TOOLS[src]?.url }));

  return (
    <LogoMarquee
      eyebrow={en ? 'Our tools' : 'Nuestras herramientas'}
      title={en ? 'The tools we build with every day.' : 'Las herramientas con las que construimos cada día.'}
      link={{ href: '/tech-stack', label: en ? 'Full tech stack' : 'Stack completo' }}
      logos={tools}
      plate="dark"
      shape="square"
      reverse
      speed={2}
    />
  );
}

/**
 * "Where we've been" — universities and governments we teach with. Read in the
 * browser for client pages that cannot fetch on the server (the home page passes
 * its own server-fetched list to LogoMarquee instead).
 */
export function PlacesBand() {
  const { language } = useLanguage();
  const en = language === 'en';
  const [logos, setLogos] = useState<MarqueeLogo[]>([]);

  useEffect(() => {
    createClient()
      .from('education_partners')
      .select('name, logo_url, partner_type, display_order')
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (!data) return;
        // Universities first, then government — the order /education uses
        const sorted = [...data].sort((a, b) => Number(a.partner_type !== 'university') - Number(b.partner_type !== 'university'));
        setLogos(sorted.filter((p) => p.logo_url).map((p) => ({ name: p.name, src: p.logo_url })));
      });
  }, []);

  return (
    <LogoMarquee
      eyebrow={en ? "Where we've been" : 'Dónde hemos estado'}
      title={en ? 'Universities and governments we teach with.' : 'Universidades y gobiernos con los que enseñamos.'}
      link={{ href: '/education', label: en ? 'Education' : 'Educación' }}
      logos={logos}
      plate="light"
    />
  );
}
