'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import ContactForm from '@/components/ContactForm';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const webDevContent = {
  en: {
    title: 'YOUR BUSINESS ONLINE',
    subtitle: 'Live in 5 days. Taking payments and answering WhatsApp from day one.',
    trustLine: 'From $1,500 · Fixed price',
    perfectFor: ['Entrepreneurs launching fast', 'Local businesses going digital', 'Consultants and service providers', 'Online stores & digital products'],
    whatYouGet: {
      title: 'Included',
      items: ['A website that sells, not a brochure', 'A panel to manage products and services', 'Card payments with Stripe or Wompi', 'WhatsApp contact and booking', 'Domain, hosting and business email', 'Automatic payment receipts', 'Ready in 5 days'],
    },
    pricing: {
      title: 'Choose Your Package',
      plans: [
        { name: 'Online Business', price: '$1,500', priceAlt: '6.000.000 COP', badge: 'Best to start', features: ['Admin panel', 'Online booking', 'WhatsApp contact', 'Card payments', 'Domain and hosting (1 year*)', 'Business email', 'Automatic receipts', 'Ready in 5 days'], cta: 'Start' },
        { name: 'Professional', price: '$3,000', priceAlt: '12.000.000 COP', badge: 'Most popular', popular: true, features: ['Everything in Online Business, plus:', 'An AI assistant that answers on WhatsApp', 'Usage billed straight to you, no markup', 'One live review meeting', 'Two rounds of changes', 'Ready in 5 days'], cta: 'Go Pro' },
        { name: 'Complete', price: '$6,000', priceAlt: '24.000.000 COP', badge: 'For teams', features: ['Everything above, plus:', 'One place to manage every client', 'See who asked, and who bought', 'Built to keep growing'], cta: 'Build Complete' },
      ],
      note: '*Domains and hosting subject to availability',
    },
    howItWorks: ['Choose your plan', 'Pay half', 'We build, you watch it happen', 'You tell us what to change', 'Pay the rest', 'You go live'],
    finalCta: 'Start your business today',
  },
  es: {
    title: 'TU NEGOCIO EN LÍNEA',
    subtitle: 'En línea en 5 días. Cobrando y respondiendo WhatsApp desde el primer día.',
    trustLine: 'Desde $1,500 · Precio fijo',
    perfectFor: ['Emprendedores lanzando rápido', 'Negocios locales digitalizándose', 'Consultores y proveedores de servicios', 'Tiendas online y productos digitales'],
    whatYouGet: {
      title: 'Incluido',
      items: ['Un sitio que vende, no un folleto', 'Un panel para manejar productos y servicios', 'Pagos con tarjeta vía Stripe o Wompi', 'Contacto y agendamiento por WhatsApp', 'Dominio, hosting y correo de empresa', 'Recibos de pago automáticos', 'Listo en 5 días'],
    },
    pricing: {
      title: 'Elige Tu Paquete',
      plans: [
        { name: 'Negocio Online', price: '$1,500', priceAlt: '6.000.000 COP', badge: 'Mejor para empezar', features: ['Panel de administración', 'Agendamiento en línea', 'Contacto por WhatsApp', 'Pagos con tarjeta', 'Dominio y hosting (1 año*)', 'Correo de empresa', 'Recibos automáticos', 'Listo en 5 días'], cta: 'Comenzar' },
        { name: 'Profesional', price: '$3,000', priceAlt: '12.000.000 COP', badge: 'Más popular', popular: true, features: ['Todo lo de Negocio Online, más:', 'Un asistente de IA que responde en WhatsApp', 'El consumo se te factura directo, sin sobrecosto', 'Una reunión de revisión en vivo', 'Dos rondas de cambios', 'Listo en 5 días'], cta: 'Ir Pro' },
        { name: 'Completo', price: '$6,000', priceAlt: '24.000.000 COP', badge: 'Para equipos', features: ['Todo lo anterior, más:', 'Un solo lugar para manejar cada cliente', 'Mira quién preguntó y quién compró', 'Hecho para seguir creciendo'], cta: 'Construir Completo' },
      ],
      note: '*Dominios y hosting sujetos a disponibilidad',
    },
    howItWorks: ['Elige tu plan', 'Pagas la mitad', 'Construimos, tú lo ves avanzar', 'Nos dices qué cambiar', 'Pagas el resto', 'Sales en vivo'],
    finalCta: 'Comienza tu negocio hoy',
  },
};

export default function WebDevelopmentPage() {
  const { language } = useLanguage();
  const t = webDevContent[language];

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
              <Link href="/services" className="border border-primary/30 px-2 py-1 hover:border-primary transition-colors">SERVICES</Link>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">WEBSITES</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
                {t.subtitle}
              </p>
              <ScanBadge variant="primary">{t.trustLine}</ScanBadge>
            </motion.div>
          </motion.div>

          {/* Pricing Plans */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-px"
          >
            <div className="flex items-center gap-4 mb-6">
              <ScanBadge variant="secondary">PRICING_PLANS</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">
                {t.pricing.title}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 mb-px">
              {t.pricing.plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative bg-surface-container-low p-6 md:p-10 flex flex-col group ${plan.popular ? 'ring-1 ring-inset ring-primary/40' : ''}`}
                >
                  {plan.badge && (
                    <div className="mb-6">
                      <ScanBadge variant={plan.popular ? 'primary' : 'muted'}>{plan.badge}</ScanBadge>
                    </div>
                  )}
                  <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-1">
                    <span className="font-headline text-4xl font-bold text-primary">{plan.price}</span>
                  </div>
                  <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-8">
                    {plan.priceAlt}
                  </p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-sm flex-shrink-0">{'>'}</span>
                        <span className="font-label text-xs text-on-surface-variant uppercase tracking-wide leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact">
                    <Button variant={plan.popular ? 'primary' : 'ghost'} className="w-full justify-center">
                      {plan.cta}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-outline uppercase tracking-widest mt-3">{t.pricing.note}</p>
          </motion.div>

          {/* How It Works + What You Get row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10 mt-px"
          >
            {/* How It Works */}
            <div className="bg-surface-container-low p-6 md:p-10">
              <div className="mb-6">
                <ScanBadge variant="muted">PROCESS_FLOW</ScanBadge>
              </div>
              <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-8">
                {language === 'en' ? 'How It Works' : 'Cómo Funciona'}
              </h2>
              <div className="space-y-4">
                {t.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-primary w-6 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="flex-1 h-px bg-primary/10" />
                    <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-surface-container-low p-6 md:p-10">
              <div className="mb-6">
                <ScanBadge variant="tertiary">DELIVERABLES</ScanBadge>
              </div>
              <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-8">
                {t.whatYouGet.title}
              </h2>
              <div className="space-y-3">
                {t.whatYouGet.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-mono text-tertiary-dim/70 text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="font-label text-xs text-on-surface-variant uppercase tracking-wide leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final CTA — the form lives here now, not on Typeform */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-surface-container-low border-t border-primary/10 mt-px p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-24"
          >
            <div className="lg:col-span-4">
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-3">
                {language === 'en' ? 'READY?' : '¿LISTO?'}
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-on-surface uppercase mb-4">
                {t.finalCta}
              </h2>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                {language === 'en'
                  ? 'Tell us what you sell and which package fits. We reply with a fixed price and a start date.'
                  : 'Cuéntanos qué vendes y qué paquete te sirve. Respondemos con un precio fijo y una fecha de inicio.'}
              </p>
            </div>
            <div className="lg:col-span-8">
              <ContactForm topic="web" />
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
