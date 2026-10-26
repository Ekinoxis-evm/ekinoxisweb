'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import PanelBackdrop from '@/components/ui/PanelBackdrop';
import { useBookCall } from '@/components/BookCall';
import TopicExplorer from './TopicExplorer';
import { staggerContainer, fadeInUp, EASE_SETTLE } from '@/lib/animations';
import {
  CalendarDays, Clock, FileSearch, Globe, Mic, PhoneCall, Plug, Rocket, ServerCog, Users, Workflow,
  type LucideIcon,
} from 'lucide-react';
import { PlacesBand } from '@/components/LogoBands';

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
      doLabel: 'What we do',
      outcomeLabel: 'You leave with',
      prev: 'Previous',
      next: 'Next',
      book: 'Book a free call about this',
      swipe: 'Swipe left or right to change topic',
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
          name: 'Session or Roadmap',
          price: '$500 – $2,500',
          time: '5 to 12 hours', people: 'Up to 5 people', format: '3-hour sessions · you set the pace',
          badge: 'Start here',
          features: ['One question answered — from $500', 'Or a full written roadmap — up to $2,500', 'How the pieces fit, what to build and what to buy', 'What year one will cost', 'Recording and summary'],
          cta: 'Book a Session',
        },
        {
          name: 'Team Workshop',
          price: '$3,800',
          time: 'Half day', people: 'Up to 15 people', format: 'In person or online',
          badge: 'Full day $6,500',
          features: ['We work with your real data', 'Something working by the end of the day', 'Slides and materials to keep'],
          cta: 'Book Workshop',
        },
        {
          name: 'Monthly Advisor',
          price: '$3,000',
          time: '16 hours a month · 4 a week', people: 'Your team', format: 'Monthly · 3-month minimum',
          badge: 'Best value',
          popular: true,
          features: ['4 hours with us every week', 'Reach us any time on Telegram', 'We review your decisions before you commit', 'First pick of dates'],
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
      label: 'Free · 30 minutes',
      title: 'Not sure which one fits?',
      text: 'Book the free call. We tell you which session fits — or that you do not need one.',
      button: 'Book your free call',
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
      doLabel: 'Qué hacemos',
      outcomeLabel: 'Te llevas',
      prev: 'Anterior',
      next: 'Siguiente',
      book: 'Agenda una llamada gratis sobre esto',
      swipe: 'Desliza a la izquierda o derecha para cambiar de tema',
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
          name: 'Sesión o Plan',
          price: '$500 – $2,500',
          time: '5 a 12 horas', people: 'Hasta 5 personas', format: 'Sesiones de 3 horas · tú defines el ritmo',
          badge: 'Empieza aquí',
          features: ['Una pregunta resuelta — desde $500', 'O un plan escrito completo — hasta $2,500', 'Cómo encajan las piezas, qué construir y qué comprar', 'Cuánto costará el primer año', 'Grabación y resumen'],
          cta: 'Reservar Sesión',
        },
        {
          name: 'Taller de Equipo',
          price: '$3,800',
          time: 'Medio día', people: 'Hasta 15 personas', format: 'Presencial u online',
          badge: 'Día completo $6,500',
          features: ['Trabajamos con tus datos reales', 'Algo funcionando al final del día', 'Diapositivas y material para conservar'],
          cta: 'Reservar Taller',
        },
        {
          name: 'Asesor Mensual',
          price: '$3,000',
          time: '16 horas al mes · 4 por semana', people: 'Tu equipo', format: 'Mensual · mínimo 3 meses',
          badge: 'Mejor valor',
          popular: true,
          features: ['4 horas con nosotros cada semana', 'Escríbenos cuando quieras por Telegram', 'Revisamos tus decisiones antes de comprometerte', 'Primera opción de fechas'],
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
      label: 'Gratis · 30 minutos',
      title: '¿No sabes cuál te sirve?',
      text: 'Agenda la llamada gratis. Te decimos qué sesión te sirve — o que no necesitas ninguna.',
      button: 'Agenda tu llamada gratis',
    },
  },
};

export default function ConsultationPage() {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const book = () => bookCall('consultation');
  const t = consultationContent[language];

  return (
    <AnimatedBackground variant="gradient" banner="/media/banners/consultation.webp">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Breadcrumb + Header */}
          <motion.div
            className="rise mb-10 md:mb-20"
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
              <Button variant="primary" size="sm" onClick={book} className="flex-shrink-0 w-full sm:w-auto justify-center">{t.funnel.book}</Button>
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

          {/* Proof before the prices: where we've taught */}
          <div className="-mx-6 my-12">
            <PlacesBand />
          </div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-px mb-px"
          >
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-4 py-6">
              <ScanBadge variant="secondary">{t.pricing.label}</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">
                {t.pricing.title}
              </span>
            </div>
            <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-6">
              {t.pricing.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10">
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
                  <div className="mb-6">
                    <span className="font-headline text-4xl font-bold text-primary">{plan.price}</span>
                  </div>
                  {/* Time, group size and format — the three things a buyer compares first */}
                  <ul className="space-y-2.5 bg-surface-container-lowest/60 p-4 mb-8">
                    {([
                      [Clock, plan.time],
                      [Users, plan.people],
                      [CalendarDays, plan.format],
                    ] as const).map(([Icon, text]) => (
                      <li key={text} className="flex items-center gap-3">
                        <Icon size={16} strokeWidth={1.75} className="text-primary flex-shrink-0" />
                        <span className="font-label text-[13px] font-semibold text-on-surface uppercase tracking-wide">{text}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-sm flex-shrink-0">{'>'}</span>
                        <span className="font-label text-[13px] font-medium text-on-surface-variant uppercase tracking-wide leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? 'primary' : 'ghost'} onClick={book} className="w-full justify-center">
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
            <p className="font-mono text-[12px] text-outline uppercase tracking-widest mt-3">{t.pricing.note}</p>
          </motion.div>

          {/* Topics — one readable view, with back / next */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
            className="mt-12"
          >
            <TopicExplorer topics={t.topics.items} icons={TOPIC_ICONS} fallbackIcon={Plug} t={t.topics} onBook={book} />
          </motion.section>

          {/* Last step — the call opens in the popup; talks sit beside it */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_SETTLE }}
            className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-px bg-primary/10"
          >
            <div className="relative overflow-hidden lg:col-span-8 bg-surface-container-low p-8 md:p-12 flex flex-col justify-center">
              <PanelBackdrop name="metal" />
              {/* Phones stack the copy over the bright side — dim it */}
              <div className="absolute inset-0 bg-black/55 lg:hidden pointer-events-none" />
              <div className="relative">
                <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">{t.cta.label}</p>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface mb-4">{t.cta.title}</h2>
                <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">{t.cta.text}</p>
                <Button variant="primary" size="lg" onClick={book} className="w-full sm:w-auto justify-center">{t.cta.button}</Button>
              </div>
            </div>
            <div className="lg:col-span-4 bg-surface-container-high p-8 md:p-10 flex flex-col">
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
            </div>
          </motion.section>

        </div>
      </div>
    </AnimatedBackground>
  );
}
