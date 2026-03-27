'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const webDevContent = {
  en: {
    title: 'FAST WEB_DEPLOYMENT',
    subtitle: 'Online in 5 days. Payments, WhatsApp & automation ready.',
    trustLine: 'From $300 · No hidden fees',
    perfectFor: ['Entrepreneurs launching fast', 'Local businesses going digital', 'Consultants & service providers', 'Online stores & digital products'],
    whatYouGet: {
      title: 'Included',
      items: ['Professional website ready to sell', 'Admin panel — products & services', 'Stripe or Wompi payments', 'WhatsApp contact + scheduling', 'Domain, hosting & corporate email', 'Email payment confirmations', '5-day delivery'],
    },
    pricing: {
      title: 'Choose Your Package',
      plans: [
        { name: 'Online Business', price: '$300', priceAlt: '1.000.000 COP', badge: 'Best to start', features: ['Admin panel', 'Appointment scheduling', 'WhatsApp integration', 'Stripe or Wompi payments', 'Domain + hosting (1 year*)', 'Corporate email', 'Email confirmations', '5-day delivery'], cta: 'Start' },
        { name: 'Professional', price: '$600', priceAlt: '2.000.000 COP', badge: 'Most popular', popular: true, features: ['Everything in Basic, plus:', 'AI Agent on WhatsApp or Telegram', 'API billing direct to client', '+1 live feedback meeting', '+2 feedback iterations', '5-day delivery'], cta: 'Go Pro' },
        { name: 'Complete', price: '$1,000', priceAlt: '4.000.000 COP', badge: 'For teams & scale', features: ['Everything above, plus:', 'CRM — manage & follow up clients', 'Lead tracking & pipeline', 'Control for growth'], cta: 'Build Complete' },
      ],
      note: '*Domains and hosting subject to availability',
    },
    howItWorks: ['Choose your plan', 'Pay 50% upfront', 'We build & share progress', 'Feedback & adjustments', 'Pay remaining 50%', 'Go live'],
    finalCta: 'Start your business today',
  },
  es: {
    title: 'DESPLIEGUE_WEB RÁPIDO',
    subtitle: 'Online en 5 días. Pagos, WhatsApp y automatización listos.',
    trustLine: 'Desde $300 · Sin costos ocultos',
    perfectFor: ['Emprendedores lanzando rápido', 'Negocios locales digitalizándose', 'Consultores y proveedores de servicios', 'Tiendas online y productos digitales'],
    whatYouGet: {
      title: 'Incluido',
      items: ['Sitio web profesional listo para vender', 'Panel admin — productos y servicios', 'Pagos con Stripe o Wompi', 'WhatsApp + agendamiento', 'Dominio, hosting y correo corporativo', 'Confirmaciones de pago por email', 'Entrega en 5 días'],
    },
    pricing: {
      title: 'Elige Tu Paquete',
      plans: [
        { name: 'Negocio Online', price: '$300', priceAlt: '1.000.000 COP', badge: 'Mejor para empezar', features: ['Panel de administración', 'Agendamiento de citas', 'Integración WhatsApp', 'Stripe o Wompi', 'Dominio + hosting (1 año*)', 'Correo corporativo', 'Confirmaciones email', 'Entrega 5 días'], cta: 'Comenzar' },
        { name: 'Profesional', price: '$600', priceAlt: '2.000.000 COP', badge: 'Más popular', popular: true, features: ['Todo lo básico, más:', 'Agente IA en WhatsApp o Telegram', 'API facturada al cliente', '+1 reunión de feedback', '+2 iteraciones', 'Entrega 5 días'], cta: 'Ir Pro' },
        { name: 'Completo', price: '$1,000', priceAlt: '4.000.000 COP', badge: 'Para equipos', features: ['Todo lo anterior, más:', 'CRM para gestión de clientes', 'Pipeline y seguimiento', 'Control para crecer'], cta: 'Construir Completo' },
      ],
      note: '*Dominios y hosting sujetos a disponibilidad',
    },
    howItWorks: ['Elige tu plan', 'Paga 50% adelantado', 'Construimos y compartimos progreso', 'Feedback y ajustes', 'Paga el 50% restante', 'Sal en vivo'],
    finalCta: 'Comienza tu negocio hoy',
  },
};

export default function WebDevelopmentPage() {
  const { language } = useLanguage();
  const t = webDevContent[language];

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
              <span className="border border-primary/30 px-2 py-1">WEB_DEVELOPMENT</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
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
                  className={`relative bg-surface-container-low p-10 flex flex-col group ${plan.popular ? 'ring-1 ring-inset ring-primary/40' : ''}`}
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
                  <a href="https://mcai2mcfwrq.typeform.com/to/bXBs9fR4" target="_blank" rel="noopener noreferrer">
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
            <div className="bg-surface-container-low p-10">
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
            <div className="bg-surface-container-low p-10">
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

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-surface-container-low border-t border-primary/10 mt-px p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-1">READY_TO_DEPLOY?</p>
              <p className="font-body text-on-surface-variant text-sm">{t.finalCta}</p>
            </div>
            <a href="https://mcai2mcfwrq.typeform.com/to/bXBs9fR4" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                {language === 'en' ? 'Get Started' : 'Comenzar'}
              </Button>
            </a>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
