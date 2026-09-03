'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const CONSULTATION_FORM = 'https://mcai2mcfwrq.typeform.com/to/PLttpvSa';
const TELEGRAM = 'https://t.me/ekinoxis';

const consultationContent = {
  en: {
    title: 'Consultation',
    subtitle: 'From the stage to your roadmap.',
    description:
      'We speak at events about the five shifts reshaping how businesses run. Afterwards, we sit down privately with the teams that want to apply them — and leave you with a written plan, not a slide deck.',
    topics: {
      label: 'TOPICS_WE_COVER',
      title: 'Five Topics. One Session Each.',
      items: [
        {
          code: 'AI_INT',
          title: 'AI Integrations',
          desc: 'Put LLMs to work inside the tools you already run — CRM, support, sales, back office — without rebuilding them.',
          outcome: 'Prioritized list of 3–5 automations with cost, model choice and rollout order.',
        },
        {
          code: 'PAY_RAIL',
          title: 'Blockchain Payment Rails',
          desc: 'Accept and send USDC across borders, settle in minutes, and plug stablecoins into your existing accounting.',
          outcome: 'Rail selection, custody model, compliance checklist and a settlement flow you can ship.',
        },
        {
          code: 'SELF_AGT',
          title: 'Private Self-Hosted Agents',
          desc: 'Agents that read your data and act on it, running on infrastructure you control. No customer data leaves your perimeter.',
          outcome: 'Reference architecture, hosting plan and a guardrails spec for the first agent.',
        },
        {
          code: 'RAG',
          title: 'RAG & Knowledge Systems',
          desc: 'Turn contracts, manuals, tickets and databases into an answer engine your team and customers can trust.',
          outcome: 'Data inventory, retrieval design, evaluation plan and an accuracy baseline.',
        },
        {
          code: 'BIZ_VIRT',
          title: 'Business Virtualization',
          desc: 'Model your operation as software — processes, roles, approvals — so it runs the same with or without you in the room.',
          outcome: 'Process map, system-of-record decisions and a 90-day digitization sequence.',
        },
      ],
    },
    funnel: {
      label: 'HOW_IT_WORKS',
      steps: [
        { num: '01', title: 'Attend a talk', desc: 'Catch us at an event or invite us to yours.' },
        { num: '02', title: 'Free diagnosis', desc: '30-minute call. We find the highest-leverage problem.' },
        { num: '03', title: 'Private session', desc: 'Pick a format below. Your team, your data, one topic.' },
        { num: '04', title: 'Roadmap & build', desc: 'Written plan in hand. Build it yourself or with us.' },
      ],
    },
    pricing: {
      label: 'FORMATS_AND_PRICING',
      title: 'Private Sessions',
      subtitle: 'Every format includes recording, written summary and 7 days of follow-up questions',
      plans: [
        {
          name: 'Focus Session',
          price: '$350',
          meta: '90 min · up to 3 people',
          badge: 'One question, answered',
          features: ['One topic, deep', 'Live architecture sketch', 'Tool & vendor shortlist', 'Recording + summary'],
          cta: 'Book Session',
        },
        {
          name: 'Roadmap Sprint',
          price: '$1,500',
          meta: '3 × 2h over 2 weeks · up to 5 people',
          badge: 'Most popular',
          popular: true,
          features: ['Discovery, design, decision', 'Written implementation roadmap', 'Architecture & data-flow doc', 'Build vs. buy recommendations', 'Cost model for year one'],
          cta: 'Start Sprint',
        },
        {
          name: 'Team Workshop',
          price: '$2,500',
          meta: 'Half day · up to 15 people',
          badge: 'Full day $4,500',
          features: ['On-site or remote', 'Hands-on with your real data', 'Working prototype by end of day', 'Slides & lab materials to keep'],
          cta: 'Book Workshop',
        },
        {
          name: 'Advisory Retainer',
          price: '$2,000',
          meta: 'per month · 3-month minimum',
          badge: 'For teams shipping',
          features: ['6 hours of sessions per month', 'Async access on Telegram', 'Architecture & vendor reviews', 'Priority scheduling'],
          cta: 'Talk to Us',
        },
      ],
      note: 'Prices in USD. Colombian companies can be invoiced in COP. Travel billed at cost for on-site work.',
    },
    talks: {
      label: 'TALKS_AND_EVENTS',
      title: 'Book Us to Speak',
      desc: 'Keynotes, panels and hands-on demos on any of the five topics, in English or Spanish. Free for universities and community events. Corporate and private events quoted per request.',
      cta: 'Invite Us',
    },
    cta: {
      label: 'NEXT_STEP',
      text: 'Start with the free 30-minute diagnosis. We tell you which format fits — or that you do not need one.',
      button: 'Request Diagnosis',
    },
  },
  es: {
    title: 'Consultoría',
    subtitle: 'Del escenario a tu roadmap.',
    description:
      'Hablamos en eventos sobre los cinco cambios que están redefiniendo cómo operan los negocios. Después nos sentamos en privado con los equipos que quieren aplicarlos — y te dejamos un plan escrito, no una presentación.',
    topics: {
      label: 'TEMAS_QUE_CUBRIMOS',
      title: 'Cinco Temas. Una Sesión Cada Uno.',
      items: [
        {
          code: 'AI_INT',
          title: 'Integraciones de IA',
          desc: 'Pon los LLMs a trabajar dentro de las herramientas que ya usas — CRM, soporte, ventas, back office — sin reconstruirlas.',
          outcome: 'Lista priorizada de 3–5 automatizaciones con costo, elección de modelo y orden de implementación.',
        },
        {
          code: 'PAY_RAIL',
          title: 'Rieles de Pago Blockchain',
          desc: 'Recibe y envía USDC entre países, liquida en minutos y conecta stablecoins a tu contabilidad actual.',
          outcome: 'Selección de riel, modelo de custodia, checklist de cumplimiento y un flujo de liquidación listo para implementar.',
        },
        {
          code: 'SELF_AGT',
          title: 'Agentes Privados Auto-Alojados',
          desc: 'Agentes que leen tus datos y actúan sobre ellos, ejecutándose en infraestructura que tú controlas. Ningún dato de clientes sale de tu perímetro.',
          outcome: 'Arquitectura de referencia, plan de hosting y especificación de guardrails para el primer agente.',
        },
        {
          code: 'RAG',
          title: 'RAG y Sistemas de Conocimiento',
          desc: 'Convierte contratos, manuales, tickets y bases de datos en un motor de respuestas confiable para tu equipo y tus clientes.',
          outcome: 'Inventario de datos, diseño de recuperación, plan de evaluación y línea base de precisión.',
        },
        {
          code: 'BIZ_VIRT',
          title: 'Virtualización del Negocio',
          desc: 'Modela tu operación como software — procesos, roles, aprobaciones — para que funcione igual estés o no en la sala.',
          outcome: 'Mapa de procesos, decisiones de sistema de registro y secuencia de digitalización a 90 días.',
        },
      ],
    },
    funnel: {
      label: 'CÓMO_FUNCIONA',
      steps: [
        { num: '01', title: 'Asiste a una charla', desc: 'Búscanos en un evento o invítanos al tuyo.' },
        { num: '02', title: 'Diagnóstico gratis', desc: 'Llamada de 30 minutos. Encontramos el problema de mayor impacto.' },
        { num: '03', title: 'Sesión privada', desc: 'Elige un formato abajo. Tu equipo, tus datos, un tema.' },
        { num: '04', title: 'Roadmap y construcción', desc: 'Plan escrito en mano. Constrúyelo tú o con nosotros.' },
      ],
    },
    pricing: {
      label: 'FORMATOS_Y_PRECIOS',
      title: 'Sesiones Privadas',
      subtitle: 'Todos los formatos incluyen grabación, resumen escrito y 7 días de preguntas de seguimiento',
      plans: [
        {
          name: 'Sesión Focus',
          price: '$350',
          meta: '90 min · hasta 3 personas',
          badge: 'Una pregunta, resuelta',
          features: ['Un tema, a fondo', 'Boceto de arquitectura en vivo', 'Lista corta de herramientas y proveedores', 'Grabación + resumen'],
          cta: 'Reservar Sesión',
        },
        {
          name: 'Sprint de Roadmap',
          price: '$1,500',
          meta: '3 × 2h en 2 semanas · hasta 5 personas',
          badge: 'Más popular',
          popular: true,
          features: ['Descubrimiento, diseño, decisión', 'Roadmap de implementación escrito', 'Documento de arquitectura y flujo de datos', 'Recomendaciones construir vs. comprar', 'Modelo de costos del primer año'],
          cta: 'Iniciar Sprint',
        },
        {
          name: 'Taller de Equipo',
          price: '$2,500',
          meta: 'Medio día · hasta 15 personas',
          badge: 'Día completo $4,500',
          features: ['Presencial o remoto', 'Manos a la obra con tus datos reales', 'Prototipo funcional al final del día', 'Slides y material de laboratorio para conservar'],
          cta: 'Reservar Taller',
        },
        {
          name: 'Asesoría Mensual',
          price: '$2,000',
          meta: 'por mes · mínimo 3 meses',
          badge: 'Para equipos que lanzan',
          features: ['6 horas de sesiones al mes', 'Acceso asíncrono por Telegram', 'Revisión de arquitectura y proveedores', 'Agenda prioritaria'],
          cta: 'Hablemos',
        },
      ],
      note: 'Precios en USD. Empresas colombianas pueden facturarse en COP. Viajes facturados al costo para trabajo presencial.',
    },
    talks: {
      label: 'CHARLAS_Y_EVENTOS',
      title: 'Invítanos a Hablar',
      desc: 'Keynotes, paneles y demos prácticas sobre cualquiera de los cinco temas, en español o inglés. Gratis para universidades y eventos de comunidad. Eventos corporativos y privados se cotizan por solicitud.',
      cta: 'Invitarnos',
    },
    cta: {
      label: 'SIGUIENTE_PASO',
      text: 'Empieza con el diagnóstico gratis de 30 minutos. Te decimos qué formato te sirve — o que no necesitas ninguno.',
      button: 'Solicitar Diagnóstico',
    },
  },
};

export default function ConsultationPage() {
  const { language } = useLanguage();
  const t = consultationContent[language];
  const calendarLink = content[language].services.calendarLink;

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
              <span className="border border-primary/30 px-2 py-1">CONSULTATION</span>
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

          {/* Topics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-px"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
              <ScanBadge variant="primary">{t.topics.label}</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">
                {t.topics.title}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
              {t.topics.items.map((topic, idx) => (
                <div
                  key={topic.code}
                  className="relative bg-surface-container-low p-6 md:p-8 group hover:bg-surface-container transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <ScanBadge variant="primary">{topic.code}</ScanBadge>
                    <span className="font-mono text-[10px] text-outline tracking-widest">
                      T_{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors mb-3">
                    {topic.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                    {topic.desc}
                  </p>
                  <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">
                    {language === 'en' ? 'You leave with' : 'Te llevas'}
                  </p>
                  <p className="font-label text-xs text-tertiary-dim/90 leading-relaxed">
                    {topic.outcome}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}

              {/* Sixth cell: talks panel */}
              <div className="relative bg-surface-container-high p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <ScanBadge variant="tertiary">{t.talks.label}</ScanBadge>
                  </div>
                  <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface mb-3">
                    {t.talks.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                    {t.talks.desc}
                  </p>
                </div>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                  <Button variant="tertiary" className="w-full justify-center">{t.talks.cta}</Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-px mb-px"
          >
            <div className="flex items-center gap-4 py-6">
              <ScanBadge variant="muted">{t.funnel.label}</ScanBadge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10">
              {t.funnel.steps.map((step) => (
                <div key={step.num} className="bg-surface-container-low p-6 group hover:bg-surface-container transition-colors duration-500">
                  <p className="font-mono text-primary text-xs mb-4">{step.num}</p>
                  <h4 className="font-headline text-base font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors mb-2">
                    {step.title}
                  </h4>
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-px mb-px"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-6">
              <ScanBadge variant="secondary">{t.pricing.label}</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">
                {t.pricing.title}
              </span>
            </div>
            <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-6">
              {t.pricing.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-primary/10">
              {t.pricing.plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative bg-surface-container-low p-6 md:p-8 flex flex-col ${plan.popular ? 'ring-1 ring-inset ring-primary/40' : ''}`}
                >
                  <div className="mb-6">
                    <ScanBadge variant={plan.popular ? 'primary' : 'muted'}>{plan.badge}</ScanBadge>
                  </div>
                  <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-1">
                    <span className="font-headline text-4xl font-bold text-primary">{plan.price}</span>
                  </div>
                  <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-8">
                    {plan.meta}
                  </p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-sm flex-shrink-0">{'>'}</span>
                        <span className="font-label text-xs text-on-surface-variant uppercase tracking-wide leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={CONSULTATION_FORM} target="_blank" rel="noopener noreferrer">
                    <Button variant={plan.popular ? 'primary' : 'ghost'} className="w-full justify-center">
                      {plan.cta}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-outline uppercase tracking-widest mt-3">{t.pricing.note}</p>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="bg-surface-container-low border-t border-primary/10 mt-6 p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-1">
                {t.cta.label}
              </p>
              <p className="font-body text-on-surface-variant text-sm max-w-lg">
                {t.cta.text}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href={calendarLink} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="w-full justify-center">{t.cta.button}</Button>
              </a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-center">Telegram</Button>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
