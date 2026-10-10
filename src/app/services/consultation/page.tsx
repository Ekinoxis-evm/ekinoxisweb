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
import {
  Check, FileSearch, Globe, Mic, PhoneCall, Plug, Rocket, ServerCog, Users, Workflow,
  type LucideIcon,
} from 'lucide-react';

const TELEGRAM = 'https://t.me/ekinoxis';

/** One icon per step of the flow, in order: talk, call, session, plan. */
const FLOW_ICONS: LucideIcon[] = [Mic, PhoneCall, Users, Rocket];

const TOPIC_ICONS: Record<string, LucideIcon> = {
  AI_INT: Plug,
  PAY_RAIL: Globe,
  SELF_AGT: ServerCog,
  RAG: FileSearch,
  BIZ_VIRT: Workflow,
};

const consultationContent = {
  en: {
    title: 'Consultation',
    subtitle: 'From the stage to your plan.',
    description:
      'We talk at events about five things changing how businesses run. Then we sit down with your team and write the plan.',
    topics: {
      label: 'TOPICS',
      title: 'Five topics. One session each.',
      fitLabel: 'This is for you if',
      outcomeLabel: 'You leave with',
      items: [
        {
          code: 'AI_INT',
          title: 'AI inside the tools you already use',
          fit: 'Your team copies data between tools all day.',
          tech: 'AI integrations',
          desc: 'Your CRM, support inbox, sales and back office — made faster by AI, without replacing any of them.',
          outcome: 'A list of 3–5 things to automate first, with the cost of each.',
        },
        {
          code: 'PAY_RAIL',
          title: 'Get paid from abroad in minutes',
          fit: 'Clients abroad pay you late, or fees eat 3–5% of every invoice.',
          tech: 'Stablecoin payment rails',
          desc: 'Send and receive dollars across borders in minutes instead of days, and keep your accounting as it is.',
          outcome: 'Which rail to use, who holds the money, what the law asks, and a flow you can turn on.',
        },
        {
          code: 'SELF_AGT',
          title: 'AI that runs on your own servers',
          fit: 'You want AI, but client data cannot leave the company.',
          tech: 'Private self-hosted agents',
          desc: 'Software that reads your data and acts on it — on machines you own. No customer data leaves the building.',
          outcome: 'The design, where to host it, and the limits it must never cross.',
        },
        {
          code: 'RAG',
          title: 'Answers from your own documents',
          fit: 'The answer is in some PDF, and nobody can find it.',
          tech: 'RAG and knowledge systems',
          desc: 'Contracts, manuals and tickets become something your team can simply ask, and trust the answer.',
          outcome: 'What data you hold, how it gets searched, and how we prove the answers are right.',
        },
        {
          code: 'BIZ_VIRT',
          title: 'A business that runs without you',
          fit: 'Everything stops when you are not there.',
          tech: 'Business virtualization',
          desc: 'Your processes, roles and approvals, written as software — so the work happens whether you are there or not.',
          outcome: 'A map of how the work flows and a 90-day order to digitize it.',
        },
      ],
    },
    funnel: {
      label: 'HOW IT WORKS',
      title: 'From a talk to a plan, in four steps',
      book: 'Book the free call',
      steps: [
        { chip: 'Free', num: '01', title: 'Attend a talk', desc: 'Catch us at an event or invite us to yours.' },
        { chip: 'Free · 30 min', num: '02', title: 'Free call', desc: '30 minutes. We find the problem worth solving first.' },
        { chip: 'From $500', num: '03', title: 'Private session', desc: 'Pick one below. Your team, your data, one topic.' },
        { chip: 'Your plan', num: '04', title: 'Plan and build', desc: 'You keep the plan. Build it yourself, or with us.' },
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
      fitLabel: 'Es para ti si',
      outcomeLabel: 'Te llevas',
      items: [
        {
          code: 'AI_INT',
          title: 'IA dentro de las herramientas que ya usas',
          fit: 'Tu equipo pasa el día copiando datos entre herramientas.',
          tech: 'Integraciones de IA',
          desc: 'Tu CRM, tu bandeja de soporte, ventas y administración — más rápidos con IA, sin reemplazar nada.',
          outcome: 'Una lista de 3–5 cosas para automatizar primero, con el costo de cada una.',
        },
        {
          code: 'PAY_RAIL',
          title: 'Recibe pagos del exterior en minutos',
          fit: 'Tus clientes del exterior pagan tarde, o las comisiones se comen 3–5% de cada factura.',
          tech: 'Rieles de pago con stablecoins',
          desc: 'Envía y recibe dólares entre países en minutos en vez de días, sin cambiar tu contabilidad.',
          outcome: 'Qué riel usar, quién custodia el dinero, qué exige la ley y un flujo listo para encender.',
        },
        {
          code: 'SELF_AGT',
          title: 'IA que corre en tus propios servidores',
          fit: 'Quieres IA, pero los datos de tus clientes no pueden salir de la empresa.',
          tech: 'Agentes privados auto-alojados',
          desc: 'Software que lee tus datos y actúa sobre ellos, en máquinas tuyas. Ningún dato de clientes sale de la empresa.',
          outcome: 'El diseño, dónde alojarlo y los límites que nunca debe cruzar.',
        },
        {
          code: 'RAG',
          title: 'Respuestas desde tus propios documentos',
          fit: 'La respuesta está en algún PDF, y nadie la encuentra.',
          tech: 'RAG y sistemas de conocimiento',
          desc: 'Contratos, manuales y tickets se vuelven algo que tu equipo puede preguntar, y confiar en la respuesta.',
          outcome: 'Qué datos tienes, cómo se buscan y cómo probamos que las respuestas son correctas.',
        },
        {
          code: 'BIZ_VIRT',
          title: 'Un negocio que funciona sin ti',
          fit: 'Todo se detiene cuando tú no estás.',
          tech: 'Virtualización del negocio',
          desc: 'Tus procesos, roles y aprobaciones escritos como software — para que el trabajo pase estés o no.',
          outcome: 'Un mapa de cómo fluye el trabajo y un orden de 90 días para digitalizarlo.',
        },
      ],
    },
    funnel: {
      label: 'CÓMO FUNCIONA',
      title: 'De una charla a un plan, en cuatro pasos',
      book: 'Agenda la llamada gratis',
      steps: [
        { chip: 'Gratis', num: '01', title: 'Asiste a una charla', desc: 'Búscanos en un evento o invítanos al tuyo.' },
        { chip: 'Gratis · 30 min', num: '02', title: 'Llamada gratis', desc: '30 minutos. Encontramos el problema que vale la pena resolver primero.' },
        { chip: 'Desde $500', num: '03', title: 'Sesión privada', desc: 'Elige una abajo. Tu equipo, tus datos, un tema.' },
        { chip: 'Tu plan', num: '04', title: 'Plan y construcción', desc: 'El plan es tuyo. Constrúyelo tú, o con nosotros.' },
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
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
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

            <motion.p variants={fadeInUp} className="font-mono text-[13px] text-primary tracking-widest uppercase mb-6">
              {t.subtitle}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>

          {/* How it works — the flow, drawn as connected steps */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="bg-surface-container-low p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <div className="mb-4">
                  <ScanBadge variant="muted">{t.funnel.label}</ScanBadge>
                </div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface">
                  {t.funnel.title}
                </h2>
              </div>
              <a href="#contact" className="flex-shrink-0">
                <Button variant="primary" size="sm" className="w-full sm:w-auto justify-center">{t.funnel.book}</Button>
              </a>
            </div>

            <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
              {/* The connector draws itself: across on desktop, down on a phone */}
              <motion.div
                aria-hidden
                className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/70 via-primary/40 to-tertiary-dim/70 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
              />
              <motion.div
                aria-hidden
                className="md:hidden absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-primary/70 to-tertiary-dim/70 origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
              />
              {t.funnel.steps.map((step, idx) => {
                const Icon = FLOW_ICONS[idx] ?? Rocket;
                const isCall = idx === 1;
                return (
                  <motion.li
                    key={step.num}
                    variants={fadeInUp}
                    className="relative flex md:flex-col md:items-center md:text-center gap-5 md:gap-0"
                  >
                    <div
                      className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border transition-shadow duration-500 ${
                        isCall
                          ? 'border-primary bg-primary text-surface-container-lowest shadow-[0_0_28px_rgba(143,245,255,0.45)]'
                          : 'border-primary/40 bg-surface-container-lowest text-primary hover:shadow-[0_0_20px_rgba(143,245,255,0.25)]'
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <div className="md:mt-6">
                      <p className="font-mono text-[12px] text-outline tracking-widest mb-1">{step.num}</p>
                      <h3 className="font-headline text-lg font-bold tracking-tight text-on-surface mb-2">{step.title}</h3>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-4 md:max-w-[230px] md:mx-auto">
                        {step.desc}
                      </p>
                      <ScanBadge variant={isCall ? 'primary' : idx === 2 ? 'secondary' : idx === 3 ? 'tertiary' : 'muted'}>
                        {step.chip}
                      </ScanBadge>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </motion.section>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-px mb-px"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-6">
              <ScanBadge variant="secondary">{t.pricing.label}</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">
                {t.pricing.title}
              </span>
            </div>
            <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-6">
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
                  <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-8">
                    {plan.meta}
                  </p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-sm flex-shrink-0">{'>'}</span>
                        <span className="font-label text-[13px] font-medium text-on-surface-variant uppercase tracking-wide leading-relaxed">{f}</span>
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
            <p className="font-mono text-[12px] text-outline uppercase tracking-widest mt-3">{t.pricing.note}</p>
          </motion.div>

          {/* Topics — each card says who it is for, what it is, and what you leave with */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="mt-px"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-6">
              <ScanBadge variant="primary">{t.topics.label}</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">{t.topics.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
              {t.topics.items.map((topic, idx) => {
                const Icon = TOPIC_ICONS[topic.code] ?? Plug;
                return (
                  <motion.article
                    key={topic.code}
                    variants={fadeInUp}
                    className="relative bg-surface-container-low p-6 md:p-8 flex flex-col group hover:bg-surface-container transition-colors duration-500"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/5 text-primary transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(143,245,255,0.25)]">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-[12px] text-outline tracking-widest">{String(idx + 1).padStart(2, '0')}</span>
                    </div>

                    <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors mb-1">
                      {topic.title}
                    </h3>
                    {/* The technical name, kept small — for the reader who already knows it */}
                    <p className="font-mono text-[11px] text-outline uppercase tracking-widest mb-6">{topic.tech}</p>

                    <div className="bg-secondary/5 px-4 py-3 mb-5">
                      <p className="font-mono text-[11px] text-secondary uppercase tracking-widest mb-1">{t.topics.fitLabel}</p>
                      <p className="font-body text-[15px] text-on-surface leading-snug">{topic.fit}</p>
                    </div>

                    <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">{topic.desc}</p>

                    <div className="mt-auto bg-surface-container-lowest/70 p-4">
                      <p className="font-mono text-[11px] text-tertiary-dim uppercase tracking-widest mb-2">{t.topics.outcomeLabel}</p>
                      <p className="flex gap-2 font-label text-[13px] font-medium text-on-surface leading-relaxed">
                        <Check size={16} className="text-tertiary-dim flex-shrink-0 mt-0.5" />
                        {topic.outcome}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.article>
                );
              })}

              {/* Sixth cell: talks */}
              <motion.div variants={fadeInUp} className="relative bg-surface-container-high p-6 md:p-8 flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center border border-tertiary-dim/40 bg-tertiary-dim/5 text-tertiary-dim mb-6">
                  <Mic size={22} strokeWidth={1.75} />
                </div>
                <div className="mb-3">
                  <ScanBadge variant="tertiary">{t.talks.label}</ScanBadge>
                </div>
                <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface mb-3">{t.talks.title}</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">{t.talks.desc}</p>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button variant="tertiary" className="w-full justify-center">{t.talks.cta}</Button>
                </a>
              </motion.div>
            </div>
          </motion.section>

          {/* Final step — the form, not a link off the site */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="bg-surface-container-low border-t border-primary/10 mt-px p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-24"
          >
            <div className="lg:col-span-4">
              <p className="font-mono text-[13px] text-outline uppercase tracking-widest mb-3">
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
