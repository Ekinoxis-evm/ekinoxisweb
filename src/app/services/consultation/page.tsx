'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import ContactForm from '@/components/ContactForm';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const TELEGRAM = 'https://t.me/ekinoxis';

const consultationContent = {
  en: {
    title: 'Consultation',
    subtitle: 'From the stage to your plan.',
    description:
      'We talk at events about five things changing how businesses run. Then we sit down with your team and write the plan.',
    topics: {
      label: 'TOPICS',
      title: 'Five topics. One session each.',
      items: [
        {
          code: 'AI_INT',
          title: 'AI inside the tools you already use',
          tech: 'AI integrations',
          desc: 'Your CRM, support inbox, sales and back office — made faster by AI, without replacing any of them.',
          outcome: 'A list of 3–5 things to automate first, with the cost of each.',
        },
        {
          code: 'PAY_RAIL',
          title: 'Get paid from abroad in minutes',
          tech: 'Stablecoin payment rails',
          desc: 'Send and receive dollars across borders in minutes instead of days, and keep your accounting as it is.',
          outcome: 'Which rail to use, who holds the money, what the law asks, and a flow you can turn on.',
        },
        {
          code: 'SELF_AGT',
          title: 'AI that runs on your own servers',
          tech: 'Private self-hosted agents',
          desc: 'Software that reads your data and acts on it — on machines you own. No customer data leaves the building.',
          outcome: 'The design, where to host it, and the limits it must never cross.',
        },
        {
          code: 'RAG',
          title: 'Answers from your own documents',
          tech: 'RAG and knowledge systems',
          desc: 'Contracts, manuals and tickets become something your team can simply ask, and trust the answer.',
          outcome: 'What data you hold, how it gets searched, and how we prove the answers are right.',
        },
        {
          code: 'BIZ_VIRT',
          title: 'A business that runs without you',
          tech: 'Business virtualization',
          desc: 'Your processes, roles and approvals, written as software — so the work happens whether you are there or not.',
          outcome: 'A map of how the work flows and a 90-day order to digitize it.',
        },
      ],
    },
    funnel: {
      label: 'HOW IT WORKS',
      steps: [
        { num: '01', title: 'Attend a talk', desc: 'Catch us at an event or invite us to yours.' },
        { num: '02', title: 'Free call', desc: '30 minutes. We find the problem worth solving first.' },
        { num: '03', title: 'Private session', desc: 'Pick one below. Your team, your data, one topic.' },
        { num: '04', title: 'Plan and build', desc: 'You keep the plan. Build it yourself, or with us.' },
      ],
    },
    pricing: {
      label: 'PRICING',
      title: 'Private Sessions',
      subtitle: 'Every session includes a recording, a written summary, and 7 days of follow-up questions',
      plans: [
        {
          name: 'One Session',
          price: '$500',
          meta: '90 min · up to 3 people',
          badge: 'One question, answered',
          features: ['One topic, in depth', 'We sketch the solution live', 'A short list of tools to use', 'Recording and summary'],
          cta: 'Book Session',
        },
        {
          name: 'The Roadmap',
          price: '$2,500',
          meta: '3 × 2h over 2 weeks · up to 5 people',
          badge: 'Most popular',
          popular: true,
          features: ['We look, we design, you decide', 'A written plan to build from', 'How the pieces fit together', 'What to build and what to buy', 'What year one will cost'],
          cta: 'Start the Plan',
        },
        {
          name: 'Team Workshop',
          price: '$3,800',
          meta: 'Half day · up to 15 people',
          badge: 'Full day $6,500',
          features: ['In person or online', 'We work with your real data', 'Something working by the end of the day', 'Slides and materials to keep'],
          cta: 'Book Workshop',
        },
        {
          name: 'Monthly Advisor',
          price: '$3,000',
          meta: 'per month · 3-month minimum',
          badge: 'For teams that ship',
          features: ['6 hours of sessions a month', 'Reach us any time on Telegram', 'We review your decisions before you commit', 'First pick of dates'],
          cta: 'Talk to Us',
        },
      ],
      note: 'Prices in USD. Colombian companies can be invoiced in COP. Travel billed at cost.',
    },
    talks: {
      label: 'TALKS',
      title: 'Book Us to Speak',
      desc: 'Talks, panels and live demos on any of the five topics, in English or Spanish. Free for universities and community events.',
      cta: 'Invite Us',
    },
    cta: {
      label: 'NEXT STEP',
      text: 'Start with the free 30-minute call. We tell you which session fits — or that you do not need one.',
      button: 'Book the Free Call',
    },
  },
  es: {
    title: 'Consultoría',
    subtitle: 'Del escenario a tu plan.',
    description:
      'Hablamos en eventos sobre cinco cosas que están cambiando cómo operan los negocios. Después nos sentamos con tu equipo y escribimos el plan.',
    topics: {
      label: 'TEMAS',
      title: 'Cinco temas. Una sesión cada uno.',
      items: [
        {
          code: 'AI_INT',
          title: 'IA dentro de las herramientas que ya usas',
          tech: 'Integraciones de IA',
          desc: 'Tu CRM, tu bandeja de soporte, ventas y administración — más rápidos con IA, sin reemplazar nada.',
          outcome: 'Una lista de 3–5 cosas para automatizar primero, con el costo de cada una.',
        },
        {
          code: 'PAY_RAIL',
          title: 'Recibe pagos del exterior en minutos',
          tech: 'Rieles de pago con stablecoins',
          desc: 'Envía y recibe dólares entre países en minutos en vez de días, sin cambiar tu contabilidad.',
          outcome: 'Qué riel usar, quién custodia el dinero, qué exige la ley y un flujo listo para encender.',
        },
        {
          code: 'SELF_AGT',
          title: 'IA que corre en tus propios servidores',
          tech: 'Agentes privados auto-alojados',
          desc: 'Software que lee tus datos y actúa sobre ellos, en máquinas tuyas. Ningún dato de clientes sale de la empresa.',
          outcome: 'El diseño, dónde alojarlo y los límites que nunca debe cruzar.',
        },
        {
          code: 'RAG',
          title: 'Respuestas desde tus propios documentos',
          tech: 'RAG y sistemas de conocimiento',
          desc: 'Contratos, manuales y tickets se vuelven algo que tu equipo puede preguntar, y confiar en la respuesta.',
          outcome: 'Qué datos tienes, cómo se buscan y cómo probamos que las respuestas son correctas.',
        },
        {
          code: 'BIZ_VIRT',
          title: 'Un negocio que funciona sin ti',
          tech: 'Virtualización del negocio',
          desc: 'Tus procesos, roles y aprobaciones escritos como software — para que el trabajo pase estés o no.',
          outcome: 'Un mapa de cómo fluye el trabajo y un orden de 90 días para digitalizarlo.',
        },
      ],
    },
    funnel: {
      label: 'CÓMO FUNCIONA',
      steps: [
        { num: '01', title: 'Asiste a una charla', desc: 'Búscanos en un evento o invítanos al tuyo.' },
        { num: '02', title: 'Llamada gratis', desc: '30 minutos. Encontramos el problema que vale la pena resolver primero.' },
        { num: '03', title: 'Sesión privada', desc: 'Elige una abajo. Tu equipo, tus datos, un tema.' },
        { num: '04', title: 'Plan y construcción', desc: 'El plan es tuyo. Constrúyelo tú, o con nosotros.' },
      ],
    },
    pricing: {
      label: 'PRECIOS',
      title: 'Sesiones Privadas',
      subtitle: 'Toda sesión incluye grabación, resumen escrito y 7 días de preguntas de seguimiento',
      plans: [
        {
          name: 'Una Sesión',
          price: '$500',
          meta: '90 min · hasta 3 personas',
          badge: 'Una pregunta, resuelta',
          features: ['Un tema, a fondo', 'Dibujamos la solución en vivo', 'Una lista corta de herramientas a usar', 'Grabación y resumen'],
          cta: 'Reservar Sesión',
        },
        {
          name: 'El Plan',
          price: '$2,500',
          meta: '3 × 2h en 2 semanas · hasta 5 personas',
          badge: 'Más popular',
          popular: true,
          features: ['Miramos, diseñamos, tú decides', 'Un plan escrito para construir', 'Cómo encajan todas las piezas', 'Qué construir y qué comprar', 'Cuánto costará el primer año'],
          cta: 'Empezar el Plan',
        },
        {
          name: 'Taller de Equipo',
          price: '$3,800',
          meta: 'Medio día · hasta 15 personas',
          badge: 'Día completo $6,500',
          features: ['Presencial o en línea', 'Trabajamos con tus datos reales', 'Algo funcionando al final del día', 'Diapositivas y material para conservar'],
          cta: 'Reservar Taller',
        },
        {
          name: 'Asesor Mensual',
          price: '$3,000',
          meta: 'por mes · mínimo 3 meses',
          badge: 'Para equipos que lanzan',
          features: ['6 horas de sesiones al mes', 'Escríbenos cuando quieras por Telegram', 'Revisamos tus decisiones antes de comprometerte', 'Primera opción de fechas'],
          cta: 'Hablemos',
        },
      ],
      note: 'Precios en USD. Empresas colombianas pueden facturarse en COP. Viajes facturados al costo.',
    },
    talks: {
      label: 'CHARLAS',
      title: 'Invítanos a Hablar',
      desc: 'Charlas, paneles y demos en vivo sobre cualquiera de los cinco temas, en español o inglés. Gratis para universidades y eventos de comunidad.',
      cta: 'Invitarnos',
    },
    cta: {
      label: 'SIGUIENTE PASO',
      text: 'Empieza con la llamada gratis de 30 minutos. Te decimos qué sesión te sirve — o que no necesitas ninguna.',
      button: 'Agendar la Llamada',
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
                  <span className="font-mono text-[10px] text-primary/70 tracking-widest block mb-6">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors mb-2">
                    {topic.title}
                  </h3>
                  {/* The technical name, kept small — for the reader who already knows it */}
                  <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-4">
                    {topic.tech}
                  </p>
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

          {/* Final step — the form, not a link off the site */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="bg-surface-container-low border-t border-primary/10 mt-6 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-24"
          >
            <div className="lg:col-span-4">
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-3">
                {t.cta.label}
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-on-surface uppercase mb-4">
                {t.cta.button}
              </h2>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                {t.cta.text}
              </p>
              <a href={calendarLink} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto justify-center">
                  {language === 'en' ? 'Or pick a time' : 'O elige una hora'}
                </Button>
              </a>
            </div>
            <div className="lg:col-span-8">
              <ContactForm topic="consultation" />
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
