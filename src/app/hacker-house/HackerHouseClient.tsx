'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { HackathonWithStatus, ProductWithRelations } from '@/lib/supabase/types';

const STATUS_LABEL: Record<string, { en: string; es: string }> = {
  incoming: { en: 'Coming up', es: 'Próximo' },
  ongoing: { en: 'Happening now', es: 'En curso' },
  past: { en: 'Past', es: 'Pasado' },
};

interface Props {
  hackathons: HackathonWithStatus[];
  products: ProductWithRelations[];
}

export default function HackerHouseClient({ hackathons, products }: Props) {
  const { language } = useLanguage();
  const en = language === 'en';
  const t = content[language].hackerHouse;
  const fmt = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString(en ? 'en-US' : 'es-CO', { month: 'short', year: 'numeric' });

  // Dated events form the timeline, newest first; undated ones are listed as "also with".
  const dated = hackathons
    .filter((h) => h.start_date)
    .sort((a, b) => (b.start_date as string).localeCompare(a.start_date as string));
  const undated = hackathons.filter((h) => !h.start_date);
  const builtAt = (id: string) => products.filter((p) => p.hackathon_id === id);
  const born = products.filter((p) => p.hackathon_id).length;
  const firstYear = dated.length ? (dated[dated.length - 1].start_date as string).slice(0, 4) : '2024';

  const stats = [
    { value: String(hackathons.length), label: en ? 'Hackathons and programs' : 'Hackathons y programas' },
    { value: String(born), label: en ? 'Products born at one' : 'Productos nacidos en uno' },
    { value: firstYear, label: en ? 'Building since' : 'Construyendo desde' },
  ];

  return (
    <AnimatedBackground variant="grid">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-16 md:mb-24">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">Hacker House</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6">
                  {t.title}
                </h1>
                <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl mb-8">
                  {en
                    ? 'A room in Cali where developers build together, then take what they built to hackathons — and some of it becomes a product.'
                    : 'Un espacio en Cali donde los desarrolladores construyen juntos, llevan lo construido a hackathons — y parte de eso se vuelve producto.'}
                </p>
                <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary">{en ? 'Build with us at the next one' : 'Construye con nosotros en el próximo'}</Button>
                </a>
              </div>
              <dl className="lg:col-span-5 grid grid-cols-3 gap-px bg-primary/10">
                {stats.map((s) => (
                  <div key={s.label} className="bg-surface-container-low p-5 md:p-6">
                    <dd className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">{s.value}</dd>
                    <dt className="font-mono text-[11px] text-outline uppercase tracking-widest mt-2 leading-snug">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <section>
            <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-8">
              {en ? 'Where we have built' : 'Dónde hemos construido'}
            </p>
            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative border-l border-primary/20 ml-2 md:ml-4"
            >
              {dated.map((h) => {
                const built = builtAt(h.id);
                return (
                  <motion.li key={h.id} variants={fadeInUp} className="relative pl-8 md:pl-14 pb-12 last:pb-0">
                    <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border border-primary bg-black shadow-[0_0_12px_rgba(143,245,255,0.5)]" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                      <div className="lg:col-span-3">
                        <p className="font-mono text-[13px] text-primary uppercase tracking-widest">
                          {fmt(h.start_date as string)}
                          {h.end_date && h.end_date.slice(0, 7) !== (h.start_date as string).slice(0, 7) ? ` – ${fmt(h.end_date)}` : ''}
                        </p>
                        {h.hackathonStatus !== 'past' && (
                          <div className="mt-2"><ScanBadge variant="primary">{STATUS_LABEL[h.hackathonStatus][language]}</ScanBadge></div>
                        )}
                      </div>
                      <div className="lg:col-span-9 bg-surface-container-low p-6 md:p-8 group hover:bg-surface-container transition-colors duration-500">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex items-center gap-5">
                            {h.logo_url && (
                              <div className="relative h-10 w-10 flex-shrink-0">
                                <Image src={h.logo_url} alt="" fill className="object-contain" sizes="40px" />
                              </div>
                            )}
                            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface">{h.name}</h2>
                          </div>
                          {h.website && (
                            <a
                              href={h.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${h.name} — ${en ? 'event page' : 'página del evento'}`}
                              className="flex-shrink-0 text-outline hover:text-primary transition-colors"
                            >
                              <ArrowUpRight size={20} />
                            </a>
                          )}
                        </div>
                        {built.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-primary/10">
                            <p className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3">
                              {en ? 'What we built there' : 'Lo que construimos ahí'}
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {built.map((p) => (
                                <Link
                                  key={p.id}
                                  href={`/portfolio/${p.project_type === 'poc' ? 'proofs-of-concept' : p.project_type === 'experiment' ? 'experiments' : 'products'}`}
                                  className="inline-flex items-center gap-3 border border-primary/20 bg-black/40 pr-4 hover:border-primary transition-colors"
                                >
                                  {p.image_url ? (
                                    <span className="relative block h-12 w-20 overflow-hidden">
                                      <Image src={p.image_url} alt="" fill className="object-cover object-top" sizes="80px" />
                                    </span>
                                  ) : null}
                                  <span className="py-3 font-label text-[13px] font-semibold text-on-surface uppercase tracking-wide">{p.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ol>
          </section>

          {/* Programs without a date */}
          {undated.length > 0 && (
            <section className="mt-20">
              <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-6">
                {en ? 'Also built with' : 'También construimos con'}
              </p>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-primary/10">
                {undated.map((h) => {
                  const inner = (
                    <>
                      <div className="relative h-14 w-full mb-4">
                        {h.logo_url && <Image src={h.logo_url} alt="" fill className="object-contain object-left" sizes="200px" />}
                      </div>
                      <p className="font-label text-[13px] font-semibold text-on-surface uppercase tracking-wide">{h.name}</p>
                      {builtAt(h.id).length > 0 && (
                        <p className="font-mono text-[11px] text-primary uppercase tracking-widest mt-2">
                          → {builtAt(h.id).map((p) => p.name).join(', ')}
                        </p>
                      )}
                    </>
                  );
                  return (
                    <li key={h.id} className="bg-surface-container-low">
                      {h.website ? (
                        <a href={h.website} target="_blank" rel="noopener noreferrer" className="block p-6 hover:bg-surface-container transition-colors">{inner}</a>
                      ) : (
                        <div className="p-6">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

        </div>
      </div>
    </AnimatedBackground>
  );
}
