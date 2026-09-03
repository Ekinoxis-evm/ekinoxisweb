'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { courses, COURSES_ENROLL_FALLBACK, type CourseStatus, type CourseLevel } from '@/lib/courses';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const coursesContent = {
  en: {
    title: 'COURSES',
    subtitle: 'Learn by shipping.',
    description:
      'Cohort-based courses from the lab. Every course ends with something deployed — not a certificate for watching videos. Small groups, live sessions, real code.',
    status: { open: 'Enrolling', waitlist: 'Waitlist', coming_soon: 'Coming soon' } as Record<CourseStatus, string>,
    level: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' } as Record<CourseLevel, string>,
    priceTbd: 'Price TBA',
    enter: 'ENTER →',
    principles: {
      label: 'HOW_WE_TEACH',
      items: [
        { num: '01', title: 'Project first', desc: 'You pick the project on day one. Every session moves it forward.' },
        { num: '02', title: 'Live, not recorded', desc: 'Small cohorts. Questions answered in the moment, code reviewed in the moment.' },
        { num: '03', title: 'Production tools', desc: 'The same stack we use for clients: Next.js, Supabase, Base, Claude.' },
        { num: '04', title: 'Deployed by the end', desc: 'Your project is live on a real URL before the last session closes.' },
      ],
    },
    cta: {
      label: 'WANT_A_PRIVATE_COHORT?',
      text: 'We run any course privately for companies and universities, adapted to your stack and your data.',
      button: 'Talk to Us',
    },
  },
  es: {
    title: 'CURSOS',
    subtitle: 'Aprende lanzando.',
    description:
      'Cursos por cohortes desde el laboratorio. Cada curso termina con algo desplegado — no con un certificado por ver videos. Grupos pequeños, sesiones en vivo, código real.',
    status: { open: 'Inscripciones abiertas', waitlist: 'Lista de espera', coming_soon: 'Muy pronto' } as Record<CourseStatus, string>,
    level: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' } as Record<CourseLevel, string>,
    priceTbd: 'Precio por anunciar',
    enter: 'ENTRAR →',
    principles: {
      label: 'CÓMO_ENSEÑAMOS',
      items: [
        { num: '01', title: 'Proyecto primero', desc: 'Eliges el proyecto el primer día. Cada sesión lo hace avanzar.' },
        { num: '02', title: 'En vivo, no grabado', desc: 'Cohortes pequeñas. Preguntas respondidas al momento, código revisado al momento.' },
        { num: '03', title: 'Herramientas de producción', desc: 'El mismo stack que usamos con clientes: Next.js, Supabase, Base, Claude.' },
        { num: '04', title: 'Desplegado al final', desc: 'Tu proyecto está en vivo en una URL real antes de que cierre la última sesión.' },
      ],
    },
    cta: {
      label: '¿COHORTE_PRIVADA?',
      text: 'Dictamos cualquier curso de forma privada para empresas y universidades, adaptado a tu stack y tus datos.',
      button: 'Hablemos',
    },
  },
};

const statusVariant: Record<CourseStatus, 'tertiary' | 'primary' | 'muted'> = {
  open: 'tertiary',
  waitlist: 'primary',
  coming_soon: 'muted',
};

export default function CoursesPage() {
  const { language } = useLanguage();
  const t = coursesContent[language];

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">EKX_ROOT</span>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">COURSES</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-4"
            >
              {t.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="font-mono text-xs text-primary tracking-widest uppercase mb-6">
              {t.subtitle}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>

          {/* Course grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 mb-px"
          >
            {courses.map((course) => (
              <motion.div key={course.slug} variants={fadeInUp}>
                <Link href={`/courses/${course.slug}`} className="block group h-full">
                  <div className="relative h-full bg-surface-container-low p-6 md:p-10 hover:bg-surface-container transition-colors duration-500 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <ScanBadge variant={statusVariant[course.status]}>{t.status[course.status]}</ScanBadge>
                      <span className="font-mono text-[10px] text-outline tracking-widest">{course.code}</span>
                    </div>

                    <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-3">
                      {course.title[language]}
                    </h2>

                    <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6 flex-1">
                      {course.tagline[language]}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                      {course.tools.map((tool) => (
                        <div key={tool.name} className="relative h-6 w-20" title={tool.name}>
                          <Image
                            src={tool.logo}
                            alt={tool.name}
                            fill
                            className="object-contain object-left grayscale group-hover:grayscale-0 transition-all duration-300"
                            sizes="80px"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-8">
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-outline">{language === 'en' ? 'Format' : 'Formato'}</span>
                        <span className="text-on-surface-variant text-right">{course.format[language]}</span>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-outline">{language === 'en' ? 'Duration' : 'Duración'}</span>
                        <span className="text-on-surface-variant text-right">{course.duration[language]}</span>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className="text-outline">{language === 'en' ? 'Level' : 'Nivel'}</span>
                        <span className="text-on-surface-variant text-right">{t.level[course.level]}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-headline text-xl font-bold text-primary">
                        {course.price ?? <span className="font-mono text-xs text-outline uppercase tracking-widest">{t.priceTbd}</span>}
                      </span>
                      <span className="font-mono text-primary text-xs group-hover:translate-x-1 transition-transform duration-200">
                        {t.enter}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Principles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-px mb-px"
          >
            <div className="flex items-center gap-4 py-6">
              <ScanBadge variant="muted">{t.principles.label}</ScanBadge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10">
              {t.principles.items.map((p) => (
                <div key={p.num} className="bg-surface-container-low p-6 group hover:bg-surface-container transition-colors duration-500">
                  <p className="font-mono text-primary text-xs mb-4">{p.num}</p>
                  <h4 className="font-headline text-base font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors mb-2">
                    {p.title}
                  </h4>
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-surface-container-low border-t border-primary/10 mt-6 p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-1">{t.cta.label}</p>
              <p className="font-body text-on-surface-variant text-sm max-w-lg">{t.cta.text}</p>
            </div>
            <a href={COURSES_ENROLL_FALLBACK} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">{t.cta.button}</Button>
            </a>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
