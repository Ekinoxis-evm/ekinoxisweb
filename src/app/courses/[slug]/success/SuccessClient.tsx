'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Course } from '@/lib/courses';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const ui = {
  en: {
    badge: 'PAYMENT_RECEIVED',
    title: 'You are in.',
    body: 'Stripe is sending your receipt now. Within 24 hours you will get an email from hola@ekinoxis.xyz with the cohort calendar, the Telegram group and what to prepare before session one.',
    note: 'Nothing arrived? Check spam, then write to us on Telegram with the email you paid with.',
    telegram: 'Open Telegram',
    back: 'All Courses',
  },
  es: {
    badge: 'PAGO_RECIBIDO',
    title: 'Ya estás dentro.',
    body: 'Stripe te está enviando el recibo. En menos de 24 horas recibirás un correo de hola@ekinoxis.xyz con el calendario de la cohorte, el grupo de Telegram y qué preparar antes de la primera sesión.',
    note: '¿No llegó nada? Revisa spam y escríbenos por Telegram con el correo con el que pagaste.',
    telegram: 'Abrir Telegram',
    back: 'Todos los Cursos',
  },
};

export default function SuccessClient({ course }: { course: Course }) {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <Link href="/courses" className="border border-primary/30 px-2 py-1 hover:border-primary transition-colors">COURSES</Link>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">{course.code}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="mb-6">
              <ScanBadge variant="tertiary">{t.badge}</ScanBadge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-4">
              {t.title}
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-mono text-xs text-primary tracking-widest uppercase mb-8">
              {course.title[language]}
            </motion.p>
            <motion.p variants={fadeInUp} className="font-body text-lg text-on-surface-variant leading-relaxed mb-4">
              {t.body}
            </motion.p>
            <motion.p variants={fadeInUp} className="font-body text-sm text-outline leading-relaxed mb-10">
              {t.note}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="w-full justify-center">{t.telegram}</Button>
              </a>
              <Link href="/courses">
                <Button variant="ghost" className="w-full justify-center">{t.back}</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
