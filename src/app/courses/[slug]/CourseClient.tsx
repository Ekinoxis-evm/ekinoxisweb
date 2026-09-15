'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Course, CourseStatus, CourseLevel } from '@/lib/courses';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import EnrollButton from '@/components/courses/EnrollButton';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const ui = {
  en: {
    status: { open: 'Enrolling', waitlist: 'Waitlist', coming_soon: 'Coming soon' } as Record<CourseStatus, string>,
    level: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' } as Record<CourseLevel, string>,
    cta: { open: 'Enroll', waitlist: 'Join Waitlist', coming_soon: 'Join Waitlist' } as Record<CourseStatus, string>,
    format: 'Format',
    duration: 'Duration',
    levelLabel: 'Level',
    starts: 'Starts',
    price: 'Price',
    priceTbd: 'To be announced',
    audience: "Who It's For",
    outcomes: 'You Leave With',
    prerequisites: 'Prerequisites',
    syllabus: 'Syllabus',
    stack: 'You will work with',
    syllabusEmpty: 'Full syllabus published with the cohort announcement.',
    next: 'NEXT STEP',
    nextText: 'Seats are limited per cohort. Reserve yours or ask us anything on Telegram.',
    allCourses: 'All Courses',
  },
  es: {
    status: { open: 'Inscripciones abiertas', waitlist: 'Lista de espera', coming_soon: 'Muy pronto' } as Record<CourseStatus, string>,
    level: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' } as Record<CourseLevel, string>,
    cta: { open: 'Inscribirme', waitlist: 'Unirme a la Lista', coming_soon: 'Unirme a la Lista' } as Record<CourseStatus, string>,
    format: 'Formato',
    duration: 'Duración',
    levelLabel: 'Nivel',
    starts: 'Inicio',
    price: 'Precio',
    priceTbd: 'Por anunciar',
    audience: 'Para Quién Es',
    outcomes: 'Te Llevas',
    prerequisites: 'Requisitos',
    syllabus: 'Programa',
    stack: 'Trabajarás con',
    syllabusEmpty: 'El programa completo se publica con el anuncio de la cohorte.',
    next: 'SIGUIENTE PASO',
    nextText: 'Los cupos por cohorte son limitados. Reserva el tuyo o pregúntanos lo que quieras por Telegram.',
    allCourses: 'Todos los Cursos',
  },
};

const statusVariant: Record<CourseStatus, 'tertiary' | 'primary' | 'muted'> = {
  open: 'tertiary',
  waitlist: 'primary',
  coming_soon: 'muted',
};

interface Props { course: Course }

export default function CourseClient({ course }: Props) {
  const { language } = useLanguage();
  const t = ui[language];
  const modules = course.modules[language];

  const facts = [
    { label: t.format, value: course.format[language] },
    { label: t.duration, value: course.duration[language] },
    { label: t.levelLabel, value: t.level[course.level] },
    ...(course.startDate ? [{ label: t.starts, value: course.startDate }] : []),
  ];

  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Breadcrumb + Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <Link href="/courses" className="border border-primary/30 px-2 py-1 hover:border-primary transition-colors">COURSES</Link>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">{course.code}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-6">
              <ScanBadge variant={statusVariant[course.status]}>{t.status[course.status]}</ScanBadge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-4"
            >
              {course.title[language]}
            </motion.h1>

            <motion.p variants={fadeInUp} className="font-mono text-xs text-primary tracking-widest uppercase mb-6">
              {course.tagline[language]}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
            >
              {course.description[language]}
            </motion.p>
          </motion.div>

          {/* Facts + price + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-primary/10 mb-px"
          >
            <div className="lg:col-span-2 bg-surface-container-low p-6 md:p-10">
              <div className="mb-6">
                <ScanBadge variant="muted">COURSE_SPEC</ScanBadge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-10">
                {facts.map((f) => (
                  <div key={f.label} className="flex justify-between border-b border-primary/10 pb-3 font-mono text-[11px] uppercase tracking-widest">
                    <span className="text-outline">{f.label}</span>
                    <span className="text-on-surface-variant text-right">{f.value}</span>
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-4">{t.stack}</p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 group">
                {course.tools.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3">
                    <div className="relative h-8 w-28">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        fill
                        className="object-contain object-left grayscale group-hover:grayscale-0 transition-all duration-300"
                        sizes="112px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-high p-6 md:p-10 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">{t.price}</p>
                {course.price ? (
                  <>
                    <p className="font-headline text-4xl font-bold text-primary mb-1">{course.price}</p>
                    {course.priceAlt && (
                      <p className="font-mono text-[10px] text-outline uppercase tracking-widest">{course.priceAlt}</p>
                    )}
                  </>
                ) : (
                  <p className="font-headline text-2xl font-bold text-on-surface-variant">{t.priceTbd}</p>
                )}
              </div>
              <EnrollButton course={course} label={t.cta[course.status]} className="mt-8" />
            </div>
          </motion.div>

          {/* Audience / Outcomes / Prerequisites */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 mt-px mb-px"
          >
            {[
              { badge: 'AUDIENCE', variant: 'primary' as const, title: t.audience, items: course.audience[language], mark: '>' },
              { badge: 'OUTCOMES', variant: 'tertiary' as const, title: t.outcomes, items: course.outcomes[language], mark: '✓' },
              { badge: 'PREREQS', variant: 'secondary' as const, title: t.prerequisites, items: course.prerequisites[language], mark: '>' },
            ].map((block) => (
              <div key={block.badge} className="bg-surface-container-low p-6 md:p-10">
                <div className="mb-6">
                  <ScanBadge variant={block.variant}>{block.badge}</ScanBadge>
                </div>
                <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-8">{block.title}</h2>
                <div className="space-y-3">
                  {block.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="font-mono text-primary/50 text-sm flex-shrink-0 mt-0.5">{block.mark}</span>
                      <span className="font-label text-xs text-on-surface-variant uppercase tracking-wide leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Syllabus */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-px mb-px"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-6">
              <ScanBadge variant="secondary">SYLLABUS</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">{t.syllabus}</span>
            </div>
            {modules.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10">
                {modules.map((m, idx) => (
                  <div key={idx} className="bg-surface-container-low p-6 group hover:bg-surface-container transition-colors duration-500">
                    <p className="font-mono text-primary text-xs mb-4">M_{String(idx + 1).padStart(2, '0')}</p>
                    <h4 className="font-headline text-base font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors mb-2">
                      {m.title}
                    </h4>
                    <p className="font-label text-[10px] text-outline uppercase tracking-widest leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface-container-low p-6 md:p-10">
                <p className="font-mono text-xs text-outline uppercase tracking-widest">{t.syllabusEmpty}</p>
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="bg-surface-container-low border-t border-primary/10 mt-6 p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-1">{t.next}</p>
              <p className="font-body text-on-surface-variant text-sm max-w-lg">{t.nextText}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <EnrollButton course={course} label={t.cta[course.status]} />
              <Link href="/courses">
                <Button variant="ghost" className="w-full justify-center">{t.allCourses}</Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
