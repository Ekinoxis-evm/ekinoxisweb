'use client';

import { ArrowRight } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <div className="min-h-[calc(100svh-4rem)] flex flex-col justify-center px-6 py-24">
      <div className="max-w-screen-2xl mx-auto w-full">
        <div className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
          <span className="border border-primary/30 px-2 py-1">EKX_ROOT</span>
          <span className="text-outline">/</span>
          <span className="border border-primary/30 px-2 py-1">ERR_404</span>
        </div>
        <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface uppercase mb-6">
          {en ? 'Nothing here' : 'Aquí no hay nada'}
        </h1>
        <p className="max-w-xl text-lg text-on-surface-variant leading-relaxed mb-10">
          {en ? 'That address does not exist, or it moved.' : 'Esa dirección no existe o se movió.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[44px] font-mono text-[12px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors"
        >
          {en ? 'Back to the start' : 'Volver al inicio'}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
