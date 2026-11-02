'use client';

import NextLink from 'next/link';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/lib/i18n';

type Props = Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> & { href: string };

/**
 * next/link that keeps the visitor in their language: `/about` becomes `/es/about`
 * when the page is Spanish. Write every internal href bare; this adds the prefix.
 */
const Link = forwardRef<HTMLAnchorElement, Props>(function LocalizedLink({ href, ...rest }, ref) {
  const { language } = useLanguage();
  return <NextLink ref={ref} href={localizePath(href, language)} {...rest} />;
});

export default Link;
