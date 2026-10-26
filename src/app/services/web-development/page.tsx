'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import BookCallPanel from '@/components/BookCallPanel';
import { useBookCall } from '@/components/BookCall';
import WorkStrip from '@/components/WorkStrip';
import BuildLoop, { type BuildLoopCopy } from '@/components/BuildLoop';
import { CreditCard, Eye, Hammer, LayoutTemplate, MessageSquare, Rocket, RefreshCw, Shuffle } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import { ToolsBand } from '@/components/LogoBands';

/** Plan and pay half, we build, rounds with you, live */
const STEP_ICONS = [CreditCard, LayoutTemplate, RefreshCw, Rocket];
const ROUND_ICONS = [Hammer, Eye, MessageSquare, Shuffle];

const webDevContent = {
  en: {
    title: 'YOUR BUSINESS ONLINE',
    subtitle: 'Live in 5 days. Taking payments and answering WhatsApp from day one.',
    trustLine: 'From $1,500 · Fixed price',
    perfectFor: ['Entrepreneurs launching fast', 'Local businesses going digital', 'Consultants and service providers', 'Online stores & digital products'],
    included: ['A site that sells', 'Admin panel', 'Card payments', 'WhatsApp booking', 'Domain and hosting', 'Business email', 'Automatic receipts'],
    flow: {
      label: 'How it works',
      title: 'From a plan to a site that sells',
      steps: [
        { num: '01', title: 'Pick your plan', desc: 'Choose a package and pay half. We agree on what your site must do.', chip: 'Day 1' },
        { num: '02', title: 'We build it', desc: 'We set up your site, payments and WhatsApp. You watch it take shape.', chip: 'First version' },
        { num: '03', title: 'Rounds with you', desc: 'We show you, you tell us what to change, we adjust. Directly with you.', chip: 'Back and forth' },
        { num: '04', title: 'You go live', desc: 'Pay the rest and your business is online, taking payments.', chip: 'Day 5' },
      ],
      round: ['Build', 'Show you', 'You tell us', 'Adjust'],
      center: 'Ready in 5\u00a0days',
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
    finalCta: 'Start your business today',
  },
  es: {
    title: 'TU NEGOCIO EN LÍNEA',
    subtitle: 'En línea en 5 días. Cobrando y respondiendo WhatsApp desde el primer día.',
    trustLine: 'Desde $1,500 · Precio fijo',
    perfectFor: ['Emprendedores lanzando rápido', 'Negocios locales digitalizándose', 'Consultores y proveedores de servicios', 'Tiendas online y productos digitales'],
    included: ['Un sitio que vende', 'Panel de administración', 'Pagos con tarjeta', 'Agenda por WhatsApp', 'Dominio y hosting', 'Correo de empresa', 'Recibos automáticos'],
    flow: {
      label: 'Cómo funciona',
      title: 'De un plan a un sitio que vende',
      steps: [
        { num: '01', title: 'Elige tu plan', desc: 'Escoges un paquete y pagas la mitad. Acordamos qué debe hacer tu sitio.', chip: 'Día 1' },
        { num: '02', title: 'Lo construimos', desc: 'Montamos tu sitio, los pagos y WhatsApp. Tú lo ves tomar forma.', chip: 'Primera versión' },
        { num: '03', title: 'Rondas contigo', desc: 'Te mostramos, nos dices qué cambiar y ajustamos. Directo contigo.', chip: 'Ida y vuelta' },
        { num: '04', title: 'Sales en vivo', desc: 'Pagas el resto y tu negocio queda en línea, cobrando.', chip: 'Día 5' },
      ],
      round: ['Construimos', 'Te mostramos', 'Nos dices', 'Ajustamos'],
      center: 'Listo en 5\u00a0días',
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
    finalCta: 'Comienza tu negocio hoy',
  },
};

export default function WebDevelopmentPage() {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const book = () => bookCall('web');
  const t = webDevContent[language];

  return (
    <AnimatedBackground variant="gradient" banner="/media/banners/websites.webp">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Breadcrumb + Header */}
          <motion.div
            className="rise mb-10 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
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

            {/* What every site comes with, at a glance */}
            <motion.ul variants={fadeInUp} className="flex flex-wrap gap-2 mt-8">
              {t.included.map((k) => (
                <li key={k} className="font-mono text-[12px] text-on-surface-variant uppercase tracking-widest border border-primary/20 bg-surface-container-low/60 px-3 py-1.5">
                  {k}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <BuildLoop t={t.flow as BuildLoopCopy} stepIcons={STEP_ICONS} roundIcons={ROUND_ICONS} />

          {/* What it's built with — the same band as the home page */}
          <div className="-mx-6 my-12">
            <ToolsBand />
          </div>

          <WorkStrip
            language={language}
            title={{ en: 'Sites we shipped', es: 'Sitios que lanzamos' }}
            items={[
              { name: 'CONVEXO', href: 'https://www.convexo.xyz', img: '/screens/convexo.jpg', what: { en: 'Fintech site for LATAM businesses.', es: 'Sitio fintech para empresas de LATAM.' } },
              { name: 'Apalancados', href: 'https://www.apalancados.tech', img: '/screens/apalancados.jpg', what: { en: 'Live trading education with an AI crypto portfolio manager.', es: 'Educación en trading en vivo con un gestor de portafolio cripto con IA.' } },
              { name: 'MGM Autobroker', href: 'https://mgmautobroker.com', img: '/screens/mgm-autobroker.jpg', what: { en: 'Used-car marketplace with no-interest financing.', es: 'Marketplace de carros usados con financiación sin intereses.' } },
            ]}
          />


          {/* Pricing Plans */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mt-12 mb-px"
          >
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
              <ScanBadge variant="secondary">{language === 'en' ? 'Pricing' : 'Precios'}</ScanBadge>
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
                  <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-8">
                    {plan.priceAlt}
                  </p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-sm flex-shrink-0">{'>'}</span>
                        <span className="font-label text-[13px] font-medium text-on-surface-variant uppercase tracking-wide leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={book} variant={plan.popular ? 'primary' : 'ghost'} className="w-full justify-center">
                      {plan.cta}
                    </Button>
                </div>
              ))}
            </div>
            <p className="font-mono text-[12px] text-outline uppercase tracking-widest mt-3">{t.pricing.note}</p>
          </motion.div>

          <BookCallPanel topic="web" />

        </div>
      </div>
    </AnimatedBackground>
  );
}
