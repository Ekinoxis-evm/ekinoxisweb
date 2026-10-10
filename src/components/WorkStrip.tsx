'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export type WorkItem = {
  name: string;
  href: string;
  img: string;
  what: { en: string; es: string };
};

interface Props {
  language: 'en' | 'es';
  title: { en: string; es: string };
  items: WorkItem[];
}

/** Three live builds, shown as screenshots, so a buyer sees the work before the form. */
export default function WorkStrip({ language, title, items }: Props) {
  const en = language === 'en';
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className="mt-px bg-surface-container-low p-6 md:p-10"
    >
      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-3">{en ? 'Recent work' : 'Trabajo reciente'}</p>
          <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface">{title[language]}</h2>
        </div>
        <Link href="/portfolio" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors">
          {en ? 'Full portfolio' : 'Portafolio completo'} <ArrowRight size={14} />
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.a
            key={item.name}
            variants={fadeInUp}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-[16/10] overflow-hidden border border-primary/10 group-hover:border-primary/40 transition-colors">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex items-start justify-between gap-4 pt-4">
              <div>
                <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mt-1">{item.what[language]}</p>
              </div>
              <ArrowUpRight size={18} className="flex-shrink-0 mt-1 text-outline group-hover:text-primary transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
