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
 * Until Stripe env vars exist in Vercel, «Reservar» opens the interest form (no payment).
 */
export const ACCIONES = {
  slug: 'acciones-tokenizadas',
  path: '/recursos/acciones-tokenizadas',
  metaTitle: 'Acciones tech tokenizadas: el curso para comprarlas desde un exchange o tu propia wallet',
  metaDescription:
    'Apple, NVIDIA, Microsoft, SpaceX y 36 tecnológicas más como tokens: quién las emite, dónde se consiguen y cómo comprarlas. Reserva tu cupo con US$5. Esto no es asesoría de inversión.',
  disclaimer: 'Esto no es asesoría de inversión.',

  price: {
    /** Flip to true once Stripe is configured in Vercel: the button becomes the checkout. */
    checkout: false,
    /**
     * Single presale payment instead of reserve + balance. William is leaning to
     * { amount: 15, after: 20, until: '30 nov' }; stays null until he confirms.
     */
    presale: null as { amount: number; after: number; until: string } | null,
    reserve: 5,
    total: null as number | null,
    opens: null as string | null,
    refund: null as string | null,
  },

  hero: {
    badge: 'Curso nuevo',
    title: 'Compra acciones de las grandes tecnológicas, ',
    titleEm: 'tokenizadas',
    lead: 'Abres tu cuenta, compras ahí y, si quieres, te lo llevas a tu propia wallet. Con lo que tengas.',
    control: 'Siempre a tu nombre: en tu propia cuenta o en tu propia wallet, bajo tu control.',
    /** First 8 of these that have a logo file (a monogram among real logos reads as broken). */
    wall: ['aapl', 'nvda', 'msft', 'googl', 'amzn', 'meta', 'tsla', 'spcx', 'ant', 'coin'],
  },

  /** Never promise a payment that does not exist: the label follows `price.checkout` and `price.presale`. */
  reserve: { paid: 'Reservar con US$5', interest: 'Reservar mi cupo', presale: (amount: number) => `Reservar mi cupo · US$${amount}` },
  presaleLine: (until: string, after: number) => `Precio de preventa hasta el ${until} · después US$${after}`,
  /** Line under the hero button, only once the total price is set. */
  restLine: (total: number) => `Curso completo: US$${total} · pagas el resto al abrir.`,

  metrics: {
    heading: 'El mapa, en números',
    tech: 'tecnológicas',
    issuers: 'emisores',
    venues: 'plataformas',
    max: (name: string) => `emisores para una sola empresa (${name})`,
    sources: 'xStocks, Ondo, Dinari, Robinhood, Base, OKX, Kraken, Bybit, Uniswap',
  },

  bands: {
    tools: 'Lo que vas a usar',
    toolsTitle: 'Un exchange para empezar, tu wallet para quedarte',
    issuers: 'Quién emite los tokens',
    issuersTitle: 'Cada token tiene un emisor detrás',
    toolIds: ['okx', 'kraken', 'bybit', 'uniswap'],
    rabby: { name: 'Rabby', url: 'https://rabby.io' },
    issuerIds: ['xstocks', 'ondo', 'dinari', 'robinhood', 'coinbase', 'backpack', 'bstocks', 'st0x'],
  },

  clip: {
    caption: 'Así se compra: SpaceX con 1 USDT en OKX.',
    source: 'Grabación propia · 19 nov 2026',
    src: '/recursos/acciones/clip-okx-spacex.mp4',
    poster: '/recursos/acciones/clip-okx-spacex.jpg',
  },

  routes: {
    kicker: 'La meta',
    heading: 'Dos caminos, el mismo token',
    lead: 'Lo que cambia es quién lo guarda: el exchange o tú.',
    start: 'Tus pesos',
    account: 'Tu cuenta · KYC',
    goal: 'Tienes el token',
    a: 'A · Desde un exchange',
    b: 'B · Con tu propia wallet',
    aShort: 'A · Compras ahí',
    bShort: 'B · A tu wallet',
    rows: [
      { label: 'Empiezas en', a: 'Tu cuenta verificada del exchange. En OKX cargas pesos por PSE.', b: 'La misma cuenta: compras USDT y ETH y los envías a tu wallet.' },
      { label: 'Quién guarda el token', a: 'El exchange, en tu cuenta.', b: 'Tú, en tu wallet, con tus 12 palabras.' },
      { label: 'Eliges emisor y red', a: 'No: el exchange decide (xStocks).', b: 'Sí.' },
      { label: 'Cuánto cuesta', a: 'En mis compras: Convert ≈ +2,1 %, orden a mercado 0,1 % (OKX, 19 nov 2026).', b: 'Comisión del pool + gas (pagado en ETH). Lo ves antes de confirmar.' },
      { label: 'Riesgo principal', a: 'Las reglas del exchange por país.', b: 'Perder tus 12 palabras.' },
    ],
  },

  tech: {
    kicker: 'Las 40',
    heading: 'Toca una empresa',
    lead: 'Dónde está y quién la emite.',
    note: (date: string) => `Datos al ${date} · sin precios`,
    routeA: 'A · En exchanges',
    routeB: (n: number) => `B · ${n} ${n === 1 ? 'emisor' : 'emisores'} con token propio`,
    none: 'Ninguno en esta lista',
    sources: (date: string) => `Fuentes: OKX, Kraken y Bybit (APIs públicas) · emisores · Uniswap · ${date}`,
    sourcesLink: 'Ver todas las fuentes',
  },

  sourcesList: {
    heading: 'Fuentes de los datos',
  },

  course: {
    kicker: 'El curso',
    heading: 'Tres sesiones, de tus pesos a tu primer token',
    format: '3 sesiones en vivo de 1 hora (45 min + preguntas). Te quedas con las grabaciones y con un asistente de IA que te guía paso a paso.',
    modules: [
      { n: '01', title: 'Tu cuenta: de pesos a USDT', desc: 'Creas y verificas tu cuenta en el exchange y compras tus primeros USDT con pesos (PSE).' },
      { n: '02', title: 'Compra tus acciones tokenizadas', desc: 'Compras en el exchange por la ruta fácil y por la barata, y calculas cuánto te costó de verdad.' },
      { n: '03', title: 'Sin custodio: tu wallet y Uniswap', desc: 'Pasas USDT y ETH (gas) a tu propia wallet, retiras lo que compraste en el exchange y compras en Uniswap, eligiendo emisor y red.' },
    ],
    today: { paid: 'US$5 hoy para reservar', interest: 'Reserva: US$5 cuando abra el pago' },
    rest: (rest: number) => `US$${rest} al abrir`,
  },

  risks: {
    kicker: 'Antes de comprar',
    heading: 'Lo que nadie te dice en el video',
    items: [
      { title: 'Es un token, no la acción', body: 'Sigue el precio, pero no da voto y los dividendos se reinvierten, no se pagan en efectivo.', source: 'OKX help · sep 2026' },
      { title: 'Busca por emisor, no por nombre', body: 'En Uniswap aparecen tokens con nombres parecidos que no son la acción, como «Claude» o «ANTHROPIC 1x Long».', source: 'Uniswap, Trending · 19 nov 2026' },
      { title: 'No es para todos', body: 'xStocks no está disponible para residentes de EE. UU., Canadá, Reino Unido ni Australia.', source: 'Kraken · ene 2026' },
      { title: 'Colombia: no verificado', body: 'No hemos verificado el estatus legal ni tributario para residentes en Colombia. Consulta a un profesional antes de invertir.' },
      { title: 'Puedes perder lo que pongas', body: 'Empieza con un monto que estés dispuesto a perder.' },
    ],
  },

  /** What Ekinoxis never does, shown beside the form. */
  custody: 'Ekinoxis nunca recibe, guarda ni mueve tu dinero ni tus activos, y nunca te pedirá tus 12 palabras ni tus claves. Tú compras directamente en cada plataforma.',

  issuersBlock: {
    heading: 'Acciones tokenizadas por emisor',
    stocks: (n: string) => `${n} acciones`,
    atLeast: 'al menos',
    noVolume: 'no publica su volumen',
    note: (date: string) => `Conteo de nuestro catálogo al ${date} (todas las empresas, no solo las 40).`,
    /** Issuers whose official list is partial; their count is a floor. */
    partial: ['ondo'],
  },

  /** Interest form, used while card payment is not live. */
  form: {
    heading: 'Reserva tu cupo',
    lead: 'El pago con tarjeta abre en unos días. Deja tu correo y te escribimos primero.',
    name: 'Nombre',
    nameError: 'Escribe tu nombre.',
    phone: 'WhatsApp',
    country: 'Indicativo del país',
    phoneError: 'Escribe tu número, sin el indicativo.',
    email: 'Correo',
    emailError: 'Revisa el correo.',
    submit: 'Quiero mi cupo',
    sending: 'Enviando…',
    networkError: 'No se pudo enviar. Intenta de nuevo.',
    /** leads.message is required; the lead records what was asked for. */
    message: 'Quiero reservar mi cupo del curso de acciones tokenizadas',
    doneBadge: 'Listo',
    doneHeading: 'Estás en la lista.',
    doneBody: 'Te escribimos apenas abra la reserva con US$5.',
  },

  teacher: {
    heading: 'Quién lo enseña',
    body: 'William Martínez, fundador de Ekinoxis Labs, el laboratorio de IA y cripto del Pacífico colombiano.',
    link: 'Conoce el lab',
  },

  /** The lead's confirmation email (src/lib/notify.ts). No promise of a personal reply. */
  email: {
    subject: 'Estás en la lista del curso de acciones tokenizadas',
    hello: (name: string) => `Hola ${name}:`,
    body: 'Guardamos tu lugar. Te escribimos apenas abra la reserva con US$5, antes que a nadie.',
    button: 'Ver el curso',
    sign: '— Ekinoxis Labs',
  },
} as const;
