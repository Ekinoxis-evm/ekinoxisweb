'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const consultationContent = {
  en: {
    title: 'Consultation',
    subtitle: 'Expert guidance for blockchain, crypto & AI.',
    description: 'Navigate the complexities of frontier technology with direct access to specialists. 1 hour free preliminary diagnosis included.',
    valueDelivered: {
      title: 'What You Get',
      items: [
        '1 Hour Preliminary Diagnosis — Free',
        '3 Hours of expert consultancy',
        'Private and flexible scheduling',
        'Pricing based on attendee count',
        '3 × 1h sessions or 1 × 3h — your choice',
        'Video recording + textual documentation',
      ],
    },
    pricing: {
      title: 'Transparent Pricing',
      subtitle: 'Scaled by team size',
      plans: [
        { people: '1', price: '$50' },
        { people: '2', price: '$90' },
        { people: '4', price: '$150' },
        { people: '8', price: '$280' },
        { people: '16', price: '$500' },
        { people: '32', price: '$850' },
        { people: '64', price: '$1,500' },
        { people: '64+', price: '$2,500' },
      ],
    },
    cta: 'Request Consultation',
  },
  es: {
    title: 'Consultoría',
    subtitle: 'Orientación experta en blockchain, cripto e IA.',
    description: 'Navega las complejidades de la tecnología de frontera con acceso directo a especialistas. 1 hora de diagnóstico preliminar incluida gratis.',
    valueDelivered: {
      title: 'Qué Obtienes',
      items: [
        '1 Hora de Diagnóstico Preliminar — Gratis',
        '3 Horas de consultoría especializada',
        'Horario privado y flexible',
        'Precio basado en número de asistentes',
        '3 × 1h o 1 × 3h — tú eliges',
        'Video + documentación textual',
      ],
    },
    pricing: {
      title: 'Precios Transparentes',
      subtitle: 'Escalado por tamaño de equipo',
      plans: [
        { people: '1', price: '$50' },
        { people: '2', price: '$90' },
        { people: '4', price: '$150' },
        { people: '8', price: '$280' },
        { people: '16', price: '$500' },
        { people: '32', price: '$850' },
        { people: '64', price: '$1,500' },
        { people: '+64', price: '$2,500' },
      ],
    },
    cta: 'Solicitar Consulta',
  },
};

export default function ConsultationPage() {
  const { language } = useLanguage();
  const t = consultationContent[language];

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Breadcrumb + Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <Link href="/services" className="border border-primary/30 px-2 py-1 hover:border-primary transition-colors">SERVICES</Link>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">CONSULTATION</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-primary/10 mb-px">

            {/* What You Get */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-surface-container-low p-10"
            >
              <div className="mb-6">
                <ScanBadge variant="primary">DELIVERABLES</ScanBadge>
              </div>
              <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-8">
                {t.valueDelivered.title}
              </h2>
              <div className="space-y-4">
                {t.valueDelivered.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-mono text-primary/50 text-sm mt-0.5 flex-shrink-0">{'>'}</span>
                    <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wide leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pricing Grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 bg-surface-container-low p-10"
            >
              <div className="mb-6">
                <ScanBadge variant="secondary">PRICING_MATRIX</ScanBadge>
              </div>
              <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-2">
                {t.pricing.title}
              </h2>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-8">
                {t.pricing.subtitle}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-primary/10">
                {t.pricing.plans.map((plan, idx) => (
                  <div
                    key={idx}
                    className={`bg-surface-container-lowest p-6 text-center group hover:bg-surface-container transition-colors duration-300 ${idx === 3 ? 'ring-1 ring-inset ring-primary/40' : ''}`}
                  >
                    <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">
                      {language === 'en' ? 'People' : 'Personas'}
                    </p>
                    <p className="font-headline text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                      {plan.people}
                    </p>
                    <p className="font-headline text-xl font-bold text-primary">
                      {plan.price}
                    </p>
                    {idx === 3 && (
                      <div className="mt-2">
                        <ScanBadge variant="primary">POPULAR</ScanBadge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-surface-container-low border-t border-primary/10 p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-1">
                NEXT_STEP
              </p>
              <p className="font-body text-on-surface-variant text-sm max-w-lg">
                {language === 'en'
                  ? 'Schedule your free preliminary diagnosis. No commitment required.'
                  : 'Agenda tu diagnóstico preliminar gratis. Sin compromiso.'}
              </p>
            </div>
            <a href="https://mcai2mcfwrq.typeform.com/to/PLttpvSa" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">{t.cta}</Button>
            </a>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
