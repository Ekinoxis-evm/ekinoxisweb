import type { Language } from './content';

/**
 * Course registry — static for now. When there are more than a handful of
 * courses, move this to a Supabase `courses` table + /admin form following
 * the products/hackers pattern.
 */

export type CourseStatus = 'open' | 'waitlist' | 'coming_soon';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

type Bilingual = Record<Language, string>;
type BilingualList = Record<Language, string[]>;

export interface CourseModule {
  title: string;
  desc: string;
}

export interface CourseTool {
  name: string;
  /** Path under /public. */
  logo: string;
}

export interface Course {
  slug: string;
  code: string;
  status: CourseStatus;
  level: CourseLevel;
  title: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  format: Bilingual;
  duration: Bilingual;
  /** USD display price, e.g. "$550". null while unpriced. */
  price: string | null;
  /** Optional COP display price, e.g. "2.200.000 COP". */
  priceAlt?: string;
  /** ISO date of the first session, if scheduled. */
  startDate?: string;
  audience: BilingualList;
  outcomes: BilingualList;
  prerequisites: BilingualList;
  modules: Record<Language, CourseModule[]>;
  /** Enrollment or waitlist link. Falls back to Telegram when absent. */
  enrollUrl?: string;
  /** Platforms taught, rendered as a logo strip. */
  tools: CourseTool[];
  /**
   * Name of the env var holding this course's Stripe price id (price_…).
   * Only read when status === 'open'. Keeps test/live ids out of the code.
   */
  stripePriceEnv?: string;
}

export const COURSES_ENROLL_FALLBACK = 'https://t.me/ekinoxis';

export const courses: Course[] = [
  {
    slug: 'business-stack',
    code: 'CRS_01',
    status: 'waitlist',
    level: 'beginner',
    title: {
      en: 'Build Your Business Stack',
      es: 'Construye el Stack de tu Negocio',
    },
    tagline: {
      en: 'Shopify, Stripe and Meta, wired together into one selling machine.',
      es: 'Shopify, Stripe y Meta, conectados en una sola máquina de ventas.',
    },
    description: {
      en: 'Four weeks to turn an idea into a store that sells, charges and advertises itself. You build the store, connect payments, run your first Meta campaign, and set up WhatsApp follow-up — on your own business, with us in the room.',
      es: 'Cuatro semanas para convertir una idea en una tienda que vende, cobra y se promociona sola. Montas la tienda, conectas pagos, lanzas tu primera campaña en Meta y armas el seguimiento por WhatsApp — sobre tu propio negocio, con nosotros al lado.',
    },
    format: {
      en: 'Live online cohort · EN/ES',
      es: 'Cohorte online en vivo · ES/EN',
    },
    duration: {
      en: '4 weeks · 8 sessions of 2h',
      es: '4 semanas · 8 sesiones de 2h',
    },
    price: '$550',
    priceAlt: '2.200.000 COP',
    stripePriceEnv: 'STRIPE_PRICE_BUSINESS_STACK',
    tools: [
      { name: 'Shopify', logo: '/tecnologies/marketing/shopify_logo_white.png' },
      { name: 'Stripe', logo: '/tecnologies/paymentintegrations/Stripe/Stripe_Logo_1.png' },
      { name: 'Meta', logo: '/tecnologies/marketing/metaads.svg' },
    ],
    audience: {
      en: ['Founders launching a product or service', 'Local businesses going online', 'Marketers who want to own the full stack', 'Freelancers building stores for clients'],
      es: ['Fundadores lanzando un producto o servicio', 'Negocios locales pasando a online', 'Marketers que quieren dominar todo el stack', 'Freelancers que montan tiendas para clientes'],
    },
    outcomes: {
      en: ['Your store live on your own domain, taking payments', 'A running Meta campaign with pixel and catalog connected', 'WhatsApp and email automations for orders and follow-up', 'Templates, checklists and prompts you keep', 'Certificate of completion'],
      es: ['Tu tienda en vivo en tu propio dominio, recibiendo pagos', 'Una campaña en Meta activa con pixel y catálogo conectados', 'Automatizaciones de WhatsApp y email para pedidos y seguimiento', 'Plantillas, checklists y prompts que te quedas', 'Certificado de finalización'],
    },
    prerequisites: {
      en: ['A product or service you want to sell', 'A laptop and an email address', 'No code required', 'About $50 for a domain and first ads budget'],
      es: ['Un producto o servicio que quieras vender', 'Un portátil y un correo electrónico', 'No se requiere código', 'Unos $50 para dominio y primer presupuesto de anuncios'],
    },
    modules: {
      en: [
        { title: 'Store foundations', desc: 'Shopify setup, catalog, theme, domain and legal pages.' },
        { title: 'Checkout & payments', desc: 'Stripe and Shopify Payments, taxes, invoices, subscriptions.' },
        { title: 'Meta Business Suite', desc: 'Pixel, Conversions API, catalog sync, WhatsApp Business.' },
        { title: 'First campaign', desc: 'Audiences, creatives, budgets and the 7-day test.' },
        { title: 'Automations', desc: 'Order, abandoned-cart and follow-up flows on WhatsApp and email.' },
        { title: 'AI in the loop', desc: 'Product copy, ad variations and a support agent trained on your FAQ.' },
        { title: 'Numbers', desc: 'One dashboard: Shopify sales, Stripe payouts, Meta cost per result.' },
        { title: 'Launch week', desc: 'Go-live checklist, first 30-day plan and review with the lab.' },
      ],
      es: [
        { title: 'Fundamentos de la tienda', desc: 'Configuración de Shopify, catálogo, tema, dominio y páginas legales.' },
        { title: 'Checkout y pagos', desc: 'Stripe y Shopify Payments, impuestos, facturas, suscripciones.' },
        { title: 'Meta Business Suite', desc: 'Pixel, Conversions API, sincronización de catálogo, WhatsApp Business.' },
        { title: 'Primera campaña', desc: 'Audiencias, creativos, presupuestos y la prueba de 7 días.' },
        { title: 'Automatizaciones', desc: 'Flujos de pedido, carrito abandonado y seguimiento por WhatsApp y email.' },
        { title: 'IA en el proceso', desc: 'Textos de producto, variaciones de anuncios y un agente de soporte entrenado con tu FAQ.' },
        { title: 'Los números', desc: 'Un solo tablero: ventas de Shopify, pagos de Stripe, costo por resultado en Meta.' },
        { title: 'Semana de lanzamiento', desc: 'Checklist de salida, plan de los primeros 30 días y revisión con el laboratorio.' },
      ],
    },
  },
  {
    slug: 'web3-app',
    code: 'CRS_02',
    status: 'coming_soon',
    level: 'intermediate',
    title: {
      en: 'Deploy Your Web3 App',
      es: 'Despliega tu App Web3',
    },
    tagline: {
      en: 'Wallet login, a verified contract and onchain swaps — shipped to a real URL.',
      es: 'Login con wallet, un contrato verificado y swaps onchain — publicado en una URL real.',
    },
    description: {
      en: 'Turn a Next.js app into a working crypto app: wallets and social login with Privy, your own contracts on-chain, and token swaps. You leave with it live on Base.',
      es: 'Convierte una app de Next.js en una app cripto funcional: wallets y login social con Privy, tus propios contratos en cadena, y swaps de tokens. Te lo llevas en vivo en Base.',
    },
    format: {
      en: 'Live online cohort · EN/ES',
      es: 'Cohorte online en vivo · ES/EN',
    },
    duration: {
      en: '4 weeks · 8 sessions of 2h',
      es: '4 semanas · 8 sesiones de 2h',
    },
    price: null,
    tools: [
      { name: 'Privy', logo: '/tecnologies/Crypto/wallet providers/privy.png' },
      { name: 'Etherscan', logo: '/tecnologies/Crypto/explorers/etherscan.svg' },
      { name: 'Uniswap', logo: '/tecnologies/Crypto/Protocols/uniswap-uni-logo.png' },
    ],
    audience: {
      en: ['Web developers going onchain for the first time', 'Hackathon builders who want to ship, not demo', 'Product teams adding wallets or payments to an existing app'],
      es: ['Desarrolladores web entrando a onchain por primera vez', 'Builders de hackathon que quieren publicar, no solo demostrar', 'Equipos de producto agregando wallets o pagos a una app existente'],
    },
    outcomes: {
      en: ['A dApp live on Base with wallet and social login', 'A contract deployed and verified on Etherscan', 'A working swap flow through Uniswap', 'Starter repo and deployment checklist you keep', 'Certificate of completion'],
      es: ['Una dApp en vivo en Base con login por wallet y redes sociales', 'Un contrato desplegado y verificado en Etherscan', 'Un flujo de swap funcional con Uniswap', 'Repo inicial y checklist de despliegue que te quedas', 'Certificado de finalización'],
    },
    prerequisites: {
      en: ['JavaScript or TypeScript', 'React basics', 'Comfortable with Git and a terminal', 'Free Vercel and Privy accounts'],
      es: ['JavaScript o TypeScript', 'Bases de React', 'Manejo de Git y terminal', 'Cuentas gratuitas de Vercel y Privy'],
    },
    modules: {
      en: [
        { title: 'Wallets & login', desc: 'Privy embedded wallets, email and social login, session handling.' },
        { title: 'Reading the chain', desc: 'Etherscan API, verified sources, events and token transfers.' },
        { title: 'Your first contract', desc: 'Write, test, deploy and verify on Etherscan.' },
        { title: 'Frontend to contract', desc: 'viem and wagmi: reads, writes, receipts and errors.' },
        { title: 'Swaps with Uniswap', desc: 'Quotes, routing, approvals and slippage in your UI.' },
        { title: 'Testnet to mainnet', desc: 'Base, gas, sponsored transactions and environment split.' },
        { title: 'Security & QA', desc: 'Common exploits, allowlists, the pre-launch audit checklist.' },
        { title: 'Launch', desc: 'Deploy to Vercel, verify everything, publish and share.' },
      ],
      es: [
        { title: 'Wallets y login', desc: 'Wallets embebidas de Privy, login por email y redes sociales, manejo de sesión.' },
        { title: 'Leer la cadena', desc: 'API de Etherscan, fuentes verificadas, eventos y transferencias de tokens.' },
        { title: 'Tu primer contrato', desc: 'Escribir, probar, desplegar y verificar en Etherscan.' },
        { title: 'Del frontend al contrato', desc: 'viem y wagmi: lecturas, escrituras, recibos y errores.' },
        { title: 'Swaps con Uniswap', desc: 'Cotizaciones, ruteo, aprobaciones y slippage en tu UI.' },
        { title: 'De testnet a mainnet', desc: 'Base, gas, transacciones patrocinadas y separación de entornos.' },
        { title: 'Seguridad y QA', desc: 'Exploits comunes, allowlists, el checklist de auditoría pre-lanzamiento.' },
        { title: 'Lanzamiento', desc: 'Desplegar en Vercel, verificar todo, publicar y compartir.' },
      ],
    },
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
