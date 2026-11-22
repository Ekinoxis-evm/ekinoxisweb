/**
 * Free resources, Spanish only for now (they come from the Instagram «reto» and
 * its audience reads Spanish). One object per resource; the page renders it.
 *
 * Inline code: wrap it in backticks inside any string, e.g. "corre `npx foo`".
 * Figures are copied from the marketing source (marketing/dias/dia-04/datos-fuentes.md,
 * read on `checkedOn`): never round them, never add one that is not there.
 */

export type Tool = {
  id: string;
  name: string;
  /** One line: what it does for you. */
  does: string;
  author: string;
  /** The source's mark, drawn beside its link; 'web' is a plain globe. */
  source: { label: string; url: string; logo?: 'github' | 'figma' | 'web' };
  /** The one metric shown, dated by `checkedOn`. */
  metric: string;
  /** One thing to type into Claude Code after installing. */
  example: string;
};

export const SKILLS_DISENO = {
  slug: 'skills-diseno',
  path: '/recursos/skills-diseno',
  checkedOn: '2026-11-07',
  title: 'Las skills que uso para que una web hecha con IA no se vea genérica',
  metaTitle: 'Skills de diseño para Claude Code: el prompt para instalarlas',
  metaDescription:
    'Cinco herramientas que le dan reglas de diseño a Claude Code (Impeccable, Emil Kowalski, Taste Skill, getdesign.md y Figma MCP), con el prompt para instalarlas todas de una vez.',
  lead: 'Sin reglas de diseño, la IA usa sus opciones por defecto. Estas cinco herramientas se las dan.',

  prompt: {
    heading: 'Instálalas todas con un prompt',
    steps: ['Abre Claude Code en tu proyecto.', 'Copia el prompt.', 'Pégalo y aprueba cada comando.'],
    copy: 'Copiar prompt',
    copied: 'Copiado',
    copyFailed: 'No se pudo copiar',
    note: 'Necesitas Node.js y una cuenta de Figma. Probado el 7 nov 2026.',
    /** Exactly what the button copies, word for word from the guide. */
    text: [
      'Instala en este proyecto estas herramientas de diseño. Antes de cada comando, dime en una línea qué hace y espera mi OK.',
      '',
      '1. Impeccable: corre npx impeccable install --project --providers=claude -y (instala la skill, sus agentes y el hook de diseño en este proyecto).',
      '2. Skills de Emil Kowalski: corre npx skills@latest add emilkowalski/skills -s emil-design-eng animate review-animations find-animation-opportunities break-ui -a claude-code -y.',
      '3. Taste Skill: corre npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" -a claude-code -y.',
      '4. DESIGN.md de referencia: corre npx getdesign list, muéstrame 5 estilos que encajen con mi marca y, cuando elija uno, corre npx getdesign add <slug>.',
      '5. Figma: corre claude mcp add --transport http figma https://mcp.figma.com/mcp.',
      '',
      'Al terminar: pídeme reiniciar Claude Code, aprobar el servidor de Figma y escribir /mcp para autenticarlo; después corre /impeccable init. Confírmame qué quedó instalado y qué falló.',
    ].join('\n'),
  },

  toolsHeading: 'Qué instala',
  toolsNote: 'Estrellas de GitHub al 7 nov 2026.',
  tryLabel: 'Prueba',

  tools: [
    {
      id: 'impeccable',
      name: 'Impeccable',
      does: 'Critica y pule el diseño; marca lo que se ve «hecho con IA».',
      author: 'Paul Bakaus',
      source: { label: 'GitHub', url: 'https://github.com/pbakaus/impeccable', logo: 'github' },
      metric: '105.300 ★',
      example: '/impeccable critique la página de inicio',
    },
    {
      id: 'emil',
      name: 'Skills de Emil Kowalski',
      does: 'Animaciones bien hechas: qué animar y cómo.',
      author: 'Emil Kowalski',
      source: { label: 'GitHub', url: 'https://github.com/emilkowalski/skills', logo: 'github' },
      metric: '54.309 ★',
      example: 'Anima la entrada del menú',
    },
    {
      id: 'taste',
      name: 'Taste Skill',
      does: 'Dirección de arte: composición, tipografía y paleta.',
      author: 'Leonxlnx',
      source: { label: 'GitHub', url: 'https://github.com/Leonxlnx/taste-skill', logo: 'github' },
      metric: '111.508 ★',
      example: 'Haz la página: qué es el negocio, para quién y una acción principal',
    },
    {
      id: 'getdesign',
      name: 'getdesign.md',
      does: 'DESIGN.md sacados de webs reales, para darle un estilo a la IA.',
      author: 'VoltAgent',
      source: { label: 'getdesign.md', url: 'https://getdesign.md', logo: 'web' },
      metric: '125.994 ★',
      example: 'Construye la página siguiendo DESIGN.md',
    },
    {
      id: 'figma',
      name: 'Figma MCP',
      does: 'Conecta Claude con tus diseños de Figma.',
      author: 'Figma',
      source: { label: 'Docs oficiales', url: 'https://developers.figma.com/docs/figma-mcp-server/', logo: 'figma' },
      metric: 'Oficial',
      example: 'Implementa este frame en código siguiendo DESIGN.md',
    },
  ] satisfies Tool[],

  order: {
    heading: 'El orden que sigo',
    steps: ['DESIGN.md', '`/impeccable init`', 'Construir por secciones', '`/impeccable critique` y `audit`', 'Animar solo donde ayuda', '`/impeccable polish` y publicar'],
  },

  close: {
    heading: '¿Prefieres que la hagamos nosotros?',
    cta: 'Agendar llamada gratis',
  },
} as const;

/* ── Acciones tech tokenizadas (reserva) ──────────────────────────────────── */

/**
 * v3 (products/digital products/acciones-tokenizadas/landing/DISENO-v3-reserva.md): one action, «Reservar con US$5».
 * Numbers on the page come from the catalog's computed `metrics` (src/lib/acciones/catalog.ts);
 * the only figures typed here are William's own three OKX buys (marketing/referencias/acciones-okx/datos-fuentes.md, 19 nov 2026).
 * `price.total`, `opens` and `refund` stay null until William sets them; null hides the line.
 */
export const ACCIONES = {
  slug: 'acciones-tokenizadas',
  path: '/recursos/acciones-tokenizadas',
  metaTitle: 'Taller en vivo: compra acciones tech tokenizadas desde un exchange o tu propia wallet',
  metaDescription:
    'Taller en vivo: compra acciones tokenizadas de las grandes tecnológicas del mundo con tu moneda bancaria, por el método custodio o con custodia propia. Esto no es asesoría de inversión.',
  disclaimer: 'Esto no es asesoría de inversión.',

  /**
   * Confirmed by William (20 nov 2026): US$49 is the real price from 2 Dec; until then the
   * Black Friday price is US$30. That is what makes the struck-through US$49 legitimate.
   * Each tier is its own Stripe Payment Link (product prod_Vexh0me4TtKkC4, created 21 nov 2026).
   * The page picks the tier by the visitor's clock, so it switches on 2 Dec 00:00 COT without a deploy.
   */
  price: {
    regular: 49,
    promo: { amount: 30, label: 'Precio Black Friday', until: '1 de diciembre', endsAt: '2026-12-02T05:00:00Z' },
    links: { promo: 'https://buy.stripe.com/fZu6oH3EK5c91eG9vWcfK01', regular: 'https://buy.stripe.com/bJeeVd2AG6gde1sbE4cfK02' },
  },

  /** Live session. `time` stays null until William sets it; null hides it. */
  session: {
    date: 'viernes 5 de diciembre',
    time: null as string | null,
    line: (date: string, time: string | null) => `En vivo el ${date}${time ? ` · ${time} (hora Colombia)` : ''}.`,
  },

  hero: {
    badge: 'Taller en vivo',
    title: 'Compra acciones de las grandes tecnológicas del mundo, ',
    titleEm: 'tokenizadas',
    control: 'Siempre tuyos: en tu cuenta, a tu nombre, o en tu propia wallet, bajo tu control. Tú decides siempre.',
    /** First 8 of these that have a logo file (a monogram among real logos reads as broken). */
    wall: ['aapl', 'nvda', 'msft', 'googl', 'amzn', 'meta', 'tsla', 'spcx', 'ant', 'coin'],
  },

  reserve: { paid: (amount: number) => `Reservar mi cupo · US$${amount}` },
  priceLine: (amount: number) => `US$${amount}`,
  single: 'pago único',
  promoNote: (label: string, until: string) => `${label} hasta el ${until}. Después, US$49.`,

  clip: {
    caption: 'Así se compra: SpaceX con 1 USDT en OKX.',
    /** Steps of the 15 s clip; `at` is the second each one starts. Tapping a step jumps the video there. */
    steps: [
      { at: 0, text: 'Quick → Stock: eliges SpaceX (xSPCX).' },
      { at: 1.5, text: 'Escribes el monto: 1 USDT.' },
      { at: 5, text: 'Preview: ves cuánto token recibes.' },
      { at: 9.5, text: 'Confirmas «Buy xSPCX». Dice «No fee»; el costo va en el precio.' },
      { at: 13, text: '«Your order is complete»: el token ya está en tu cuenta.' },
    ],
    source: 'Grabación propia, 19 nov 2026',
    src: '/recursos/acciones/clip-okx-spacex.mp4',
    poster: '/recursos/acciones/clip-okx-spacex.jpg',
  },

  /** Two full-bleed bands, one per method. Logos only from public/recursos/acciones/logos. */
  bands: {
    custodial: {
      eyebrow: 'Método custodio',
      title: 'Exchanges para empezar',
      venueIds: ['okx', 'kraken', 'bybit'],
    },
    selfCustody: {
      eyebrow: 'Método custodia propia',
      title: 'Wallets y Uniswap: para tener y comprar tus activos',
      wallets: [
        { id: 'base', name: 'Base app', url: 'https://base.app' },
        { id: 'metamask', name: 'MetaMask', url: 'https://metamask.io' },
        { id: 'rabby', name: 'Rabby', url: 'https://rabby.io' },
        { id: 'phantom', name: 'Phantom', url: 'https://phantom.com' },
        { id: 'trustwallet', name: 'Trust Wallet', url: 'https://trustwallet.com' },
        { id: 'ledger', name: 'Ledger', url: 'https://www.ledger.com' },
        { id: 'safe', name: 'Safe', url: 'https://safe.global' },
      ],
      /** Where you buy once the wallet holds USDT and ETH. */
      dexId: 'uniswap',
    },
  },

  /** A map (bank → exchange → USDT, then the split into A and B) over two method cards. */
  routes: {
    heading: 'Dos formas de tener tus acciones',
    lead: 'Las dos empiezan igual: cambias tu moneda bancaria (COP, USD, MXN…) a USDT, un dólar digital, en un exchange. Al final cambia quién guarda tu acción.',
    map: {
      label: 'Mapa: de tu banco a tu acción tokenizada, por el método A o el B',
      bank: 'Tu banco',
      exchange: 'Exchange',
      usdt: 'USDT',
      aBuy: 'Compras ahí',
      aEnd: 'En tu cuenta del exchange',
      bWallet: 'A tu wallet',
      bBuy: 'Compras en Uniswap',
      bEnd: 'En tu wallet',
      show: (m: string) => `Resaltar el método ${m}`,
    },
    a: { letter: 'A', eyebrow: 'A · Método custodio', title: 'La guarda el exchange', tag: 'Lo más fácil' },
    b: { letter: 'B', eyebrow: 'B · Custodia propia', title: 'La guardas tú', tag: 'Más control' },
    facts: [
      { label: 'Cómo compras', a: 'Con tus USDT, en el mismo exchange.', b: 'Envías USDT y un poco de ETH (para el gas) a tu wallet y compras en Uniswap.' },
      { label: 'Eliges emisor y red', a: 'No: lo decide el exchange (hoy, xStocks).', b: 'Sí, en Uniswap.' },
      { label: 'Cuánto cuesta', a: 'En mis compras en OKX (19 nov 2026): Convert ≈ +2,1 %; orden a mercado 0,1 %.', b: 'Comisión del pool más el gas en ETH. Lo ves antes de confirmar.' },
      { label: 'Si algo sale mal', a: 'Dependes de las reglas del exchange en tu país.', b: 'Si pierdes tus 12 palabras, pierdes la wallet.' },
    ],
    move: 'Puedes empezar en A y pasar a B cuando quieras: retiras el token del exchange a tu wallet.',
  },

  tech: {
    heading: 'Las 40 tecnológicas',
    lead: 'Toca una para abrir su ficha: dónde comprarla y quién la emite.',
    close: 'Cerrar',
    note: (date: string) => `Datos al ${date}. Sin precios.`,
    routeA: 'Método custodio: dónde comprarla',
    routeB: (n: number) => `Custodia propia: ${n} ${n === 1 ? 'emisor' : 'emisores'} con token propio`,
    none: 'Ninguno en esta lista',
    sources: (date: string) => `Fuentes: APIs públicas de OKX, Kraken y Bybit, listas de los emisores y Uniswap, ${date}.`,
    sourcesLink: 'Ver todas las fuentes',
  },

  /** The whole tokenized-stocks market, one dashboard, one date. */
  sector: {
    heading: 'El mercado de acciones tokenizadas',
    value: 'en valor tokenizado',
    transfers: 'transferidos en los últimos 30 días',
    holders: 'de direcciones que las tienen',
  },

  issuersBlock: {
    heading: 'Los emisores',
    lead: 'Quién crea cada token y cuánto del mercado tiene. Toca uno para ver su ficha.',
    share: 'del valor tokenizado',
    stocksLabel: 'acciones y ETF',
    valueLabel: 'valor tokenizado',
    atLeast: 'al menos',
    others: 'Otros emisores y plataformas',
    othersNote: 'Fuera del top de RWA.xyz, incluidas plataformas fuera de nuestro catálogo.',
    open: (name: string) => `Ver detalles de ${name}`,
    eligibility: 'Quién puede comprar',
    site: 'Sitio oficial',
    chartLabel: 'Participación de cada emisor en el valor tokenizado de acciones',
    note: (date: string, source: string) =>
      `Valor y participación: ${source}. Conteo de acciones y ETF: nuestro catálogo al ${date}, sobre todas las empresas, no solo las 40.`,
    /** Issuers whose official list is partial; their count is a floor. */
    partial: ['ondo'],
  },

  sourcesList: {
    heading: 'Fuentes de los datos',
  },

  /**
   * The session as one timeline: before the session, then the three blocks. Blocks 2 and 3 are the
   * map's methods A and B. `marks` keys the logo groups (see `Marks` in AccionesClient).
   */
  course: {
    heading: 'Qué haces en el taller',
    facts: ['3 horas en vivo', 'Preguntas al final de cada bloque', 'Te quedas con la grabación', 'Un asistente de IA (Claude o ChatGPT) te guía paso a paso'],
    steps: [
      {
        n: 'Antes',
        title: 'Crea tu cuenta',
        marks: ['exchanges'],
        does: ['Abres tu cuenta en el exchange y completas la verificación (KYC).', 'Te guiamos con el asistente.'],
      },
      {
        n: 'Bloque 1',
        title: 'De tu banco a tus primeros USDT',
        marks: ['usdt'],
        does: ['Cargas tu cuenta con tu moneda bancaria.', 'Compras tus primeros USDT y ves cuánto te cobraron.'],
      },
      {
        n: 'Bloque 2',
        method: 'Método A',
        title: 'Tu primera acción tokenizada, en el exchange',
        marks: ['xstocks', 'stocks'],
        does: ['Compras por la ruta fácil (Convert) y por la barata (orden a mercado).', 'Calculas cuánto te costó de verdad.'],
      },
      {
        n: 'Bloque 3',
        method: 'Método B',
        title: 'A tu propia wallet',
        marks: ['wallets', 'uniswap'],
        does: ['Llevas USDT y el gas (ETH) a tu wallet.', 'Retiras a tu wallet lo que compraste en el exchange.', 'Compras en Uniswap eligiendo emisor y red.'],
        networks: ['Ethereum', 'Arbitrum', 'Base', 'Robinhood Chain', 'Solana'],
      },
    ],
  },

  risks: {
    heading: 'Antes de comprar',
    items: [
      { title: 'Es un token, no la acción', body: 'Sigue el precio, pero no da voto y los dividendos se reinvierten, no se pagan en efectivo.', source: 'OKX help, sep 2026' },
      { title: 'Busca por emisor, no por nombre', body: 'En Uniswap aparecen tokens con nombres parecidos que no son la acción, como «Claude» o «ANTHROPIC 1x Long».', source: 'Uniswap, Trending, 19 nov 2026' },
      { title: 'No es para todos', body: 'xStocks no está disponible para residentes de EE. UU., Canadá, Reino Unido ni Australia.', source: 'Kraken, ene 2026' },
      { title: 'Colombia: no verificado', body: 'No hemos verificado el estatus legal ni tributario para residentes en Colombia. Consulta a un profesional antes de invertir.' },
      { title: 'Puedes perder lo que pongas', body: 'Empieza con un monto que estés dispuesto a perder.' },
    ],
  },

  /** What Ekinoxis never does, shown beside the form. */
  custody: 'Ekinoxis nunca recibe, guarda ni mueve tu dinero ni tus activos, y nunca te pedirá tus 12 palabras ni tus claves. Tú compras directamente en cada plataforma.',

  /** The soft path for visitors not ready to pay. */
  form: {
    heading: '¿Todavía no?',
    lead: 'Déjanos tus datos y te avisamos.',
    name: 'Nombre',
    nameError: 'Escribe tu nombre.',
    phone: 'WhatsApp',
    country: 'Indicativo del país',
    phoneError: 'Escribe tu número, sin el indicativo.',
    email: 'Correo',
    emailError: 'Revisa el correo.',
    submit: 'Avísame',
    sending: 'Enviando…',
    networkError: 'No se pudo enviar. Intenta de nuevo.',
    /** leads.message is required; the lead records what was asked for. */
    message: 'Todavía no: quiero que me avisen del taller de acciones tokenizadas',
    doneBadge: 'Listo',
    doneHeading: 'Estás en la lista.',
    doneBody: 'Te escribimos antes de la sesión del viernes 5 de diciembre.',
  },

  /** William's own published profile (0xwomb.xyz, read 19 nov 2026). Photo: portrait-nyc from the same site. */
  teacher: {
    heading: 'Quién lo enseña',
    name: 'William Martínez Bolaños',
    role: 'Economista y Technical Product Manager en cripto, fintech e IA.',
    photo: '/recursos/acciones/william.jpg',
    photoAlt: 'William Martínez en el puente de Brooklyn con una gorra que dice «Verify Everything».',
    facts: [
      '7+ años en cripto y 4+ en IA.',
      'Fundador de Ekinoxis Labs y de Convexo Protocol.',
      'Steward de ETH Cali: 380+ usuarios y 100+ desarrolladores en 30+ meetups y 3 hackathons.',
      'Diseñó y dictó un curso de DeFi de 32 horas en la Universidad de San Buenaventura Cali.',
    ],
    source: 'Fuente: 0xwomb.xyz',
    socials: [
      { label: 'X', href: 'https://twitter.com/wmb_eth', icon: '/socials/x.jpg' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/williammartinez8', icon: '/socials/linkedin.png' },
      { label: 'GitHub', href: 'https://github.com/wmb81321', icon: '/socials/github.png' },
      { label: 'Farcaster', href: 'https://warpcast.com/williammartinez', icon: '/socials/farcaster.png' },
      { label: '0xwomb.xyz', href: 'https://0xwomb.xyz', icon: null },
    ],
    link: 'Conoce el lab',
  },

  /** After-payment page; the Payment Link redirects here. It cannot verify the payment, so it claims nothing Stripe has not. */
  thanks: {
    path: '/recursos/acciones-tokenizadas/gracias',
    metaTitle: 'Gracias por tu reserva',
    title: 'Gracias. Tu cupo está reservado.',
    body: 'Taller en vivo el viernes 5 de diciembre. Te escribimos al correo con el enlace y la preparación previa: tu cuenta y la verificación (KYC). Stripe te envía el recibo.',
    back: 'Volver al taller',
  },

  /** The lead's confirmation email (src/lib/notify.ts). No promise of a personal reply. */
  email: {
    subject: 'Estás en la lista del taller de acciones tokenizadas',
    hello: (name: string) => `Hola ${name}:`,
    body: 'Guardamos tus datos. Te escribimos antes de la sesión en vivo del viernes 5 de diciembre.',
    button: 'Ver el taller',
    sign: '— Ekinoxis Labs',
  },
} as const;

/** The workshop price in force at `now`: the Black Friday price until 1 Dec, then the regular one. */
export function accionesAmount(now: Date): number {
  const p = ACCIONES.price;
  return now.getTime() < Date.parse(p.promo.endsAt) ? p.promo.amount : p.regular;
}
