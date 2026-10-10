'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { ArrowRight, Check, Clock, Code2, Globe2, MessagesSquare } from 'lucide-react';

const ICONS = { chat: MessagesSquare, globe: Globe2, code: Code2 };

const SERVICE_TRACKS = {
  en: [
    {
      id: 'consultation',
      code: '01',
      type: 'ADVICE',
      title: 'Consultation',
      tagline: 'We tell you what to build. You leave with a written plan.',
      points: ['Three hours with your team, one topic', 'A written plan and a recording', 'Seven days of follow-up questions'],
      time: 'Book this week',
      cta: 'See sessions',
      icon: 'chat' as const,
      price: 'From $500',
      href: '/services/consultation',
      badgeVariant: 'primary' as const,
    },
    {
      id: 'web',
      code: '02',
      type: 'WEBSITES',
      title: 'Websites',
      tagline: 'Your business online in 5 days.',
      points: ['Booking, payments and WhatsApp built in', 'Domain, hosting and business email', 'An AI assistant on the Pro plan'],
      time: 'Live in 5 days',
      cta: 'See packages',
      icon: 'globe' as const,
      price: 'From $1,500',
      href: '/services/web-development',
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'app',
      code: '03',
      type: 'SOFTWARE',
      title: 'Software & apps',
      tagline: 'Software built for you, with AI and blockchain.',
      points: ['Web and mobile, designed and built by us', 'AI and blockchain where they earn their place', 'We host it and keep it running'],
      time: 'First version in 4–6 weeks',
      cta: 'See plans',
      icon: 'code' as const,
      price: 'From $12,000',
      href: '/services/app-building',
      badgeVariant: 'tertiary' as const,
    },
  ],
  es: [
    {
      id: 'consultation',
      code: '01',
      type: 'ASESORÍA',
      title: 'Consultoría',
      tagline: 'Te decimos qué construir. Te llevas un plan escrito.',
      points: ['Tres horas con tu equipo, un tema', 'Un plan escrito y la grabación', 'Siete días de preguntas de seguimiento'],
      time: 'Agenda esta semana',
      cta: 'Ver sesiones',
      icon: 'chat' as const,
      price: 'Desde $500',
      href: '/services/consultation',
      badgeVariant: 'primary' as const,
    },
    {
      id: 'web',
      code: '02',
      type: 'SITIOS WEB',
      title: 'Sitios web',
      tagline: 'Tu negocio online en 5 días.',
      points: ['Agendamiento, pagos y WhatsApp integrados', 'Dominio, hosting y correo de empresa', 'Un asistente de IA en el plan Pro'],
      time: 'En vivo en 5 días',
      cta: 'Ver paquetes',
      icon: 'globe' as const,
      price: 'Desde $1,500',
      href: '/services/web-development',
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'app',
      code: '03',
      type: 'SOFTWARE',
      title: 'Software y apps',
      tagline: 'Software hecho para ti, con IA y blockchain.',
      points: ['Web y móvil, diseñado y construido por nosotros', 'IA y blockchain donde aportan de verdad', 'Lo alojamos y lo mantenemos funcionando'],
      time: 'Primera versión en 4–6 semanas',
      cta: 'Ver planes',
      icon: 'code' as const,
      price: 'Desde $12,000',
      href: '/services/app-building',
      badgeVariant: 'tertiary' as const,
    },
  ],
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = content[language].services;
  const tracks = SERVICE_TRACKS[language];

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">SERVICES</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed"
            >
              {language === 'en' ? 'Pick one. We start there.' : 'Elige uno. Empezamos por ahí.'}
            </motion.p>
          </motion.div>

          {/* Service Tracks */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-primary/10 mb-px items-stretch"
          >
            {tracks.map((track) => {
              const Icon = ICONS[track.icon];
              return (
                <motion.div key={track.id} variants={fadeInUp} className="flex">
                  <Link
                    href={track.href}
                    className="group relative flex w-full flex-col bg-surface-container-low p-8 md:p-12 hover:bg-surface-container transition-colors duration-500"
                  >
                    <div className="flex items-start justify-between mb-10">
                      <div className="flex h-14 w-14 items-center justify-center border border-primary/30 bg-primary/5 text-primary transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_24px_rgba(143,245,255,0.25)]">
                        <Icon size={24} strokeWidth={1.75} />
                      </div>
                      <ScanBadge variant={track.badgeVariant}>{track.type}</ScanBadge>
                    </div>

                    <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-4">
                      {track.title}
                    </h2>
                    <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8">{track.tagline}</p>

                    <ul className="space-y-3 mb-10">
                      {track.points.map((pt) => (
                        <li key={pt} className="flex gap-3 font-body text-sm text-on-surface leading-relaxed">
                          <Check size={16} className="text-tertiary-dim flex-shrink-0 mt-0.5" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8 border-t border-primary/10">
                      <div className="flex flex-col gap-2 mb-6">
                        <span className="font-headline text-3xl font-bold text-primary">{track.price}</span>
                        <span className="flex items-center gap-2 font-mono text-[12px] text-outline uppercase tracking-widest">
                          <Clock size={14} className="text-primary flex-shrink-0" />
                          {track.time}
                        </span>
                      </div>
                      <span className="flex w-full items-center justify-center gap-2 border border-primary/30 py-3.5 font-label text-[13px] font-bold uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-surface-container-lowest group-hover:border-primary transition-colors duration-300">
                        {track.cta} <ArrowRight size={16} />
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-surface-container-low border-t border-primary/10 p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-2">
                {language === 'en' ? 'Not sure which one?' : '¿No sabes cuál?'}
              </p>
              <p className="font-body text-on-surface-variant">
                {language === 'en' ? 'Start with a free 30-minute call. We tell you which one fits — or that you need none.' : 'Empieza con una llamada gratis de 30 minutos. Te decimos cuál encaja — o que no necesitas ninguna.'}
              </p>
            </div>
            <Link href="/services/consultation#contact">
              <Button variant="primary">
                {language === 'en' ? 'Book a free call' : 'Agenda una llamada gratis'}
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
