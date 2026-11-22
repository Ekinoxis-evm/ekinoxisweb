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
    date: 'sábado 5 de diciembre',
    time: '10:00 a. m.' as string | null,
    line: (date: string, time: string | null) => `En vivo el ${date}${time ? `, ${time} (hora Colombia)` : ''}.`,
  },

  hero: {
    badge: 'Taller en vivo',
    title: 'Compra acciones tech, ',
    titleEm: 'tokenizadas',
    sub: 'Apple, NVIDIA, SpaceX y 37 más. Desde un exchange o en tu propia wallet: tú decides cómo comprarlas y almacenarlas.',
    facts: {
      date: 'Sábado 5 de diciembre',
      time: '10:00 a. m. a 1:00 p. m. (hora Colombia)',
      place: 'En línea, por Google Meet',
    },
    /** First 8 of these that have a logo file (a monogram among real logos reads as broken). */
    wall: ['aapl', 'nvda', 'msft', 'googl', 'amzn', 'meta', 'tsla', 'spcx', 'ant', 'coin'],
  },

  reserve: { paid: (amount: number) => `Reservar mi cupo por US$${amount}` },
  priceLine: (amount: number) => `US$${amount}`,
  single: 'pago único',
  promoNote: (label: string, until: string) => `${label} hasta el ${until}. Después, US$49.`,

  clip: {
    caption: 'Compra real: SpaceX con 1 USDT en OKX',
    step: (n: number, total: number) => `Paso ${n} de ${total}`,
    /** Steps of the 15 s clip; `at` is the second each one starts. Tapping a step jumps the video there. */
    steps: [
      { at: 0, text: 'Quick → Stock: eliges SpaceX (xSPCX).' },
      { at: 1.5, text: 'Escribes el monto: 1 USDT.' },
      { at: 5, text: 'Preview: ves cuánto token recibes.' },
      { at: 9.5, text: 'Confirmas «Buy xSPCX». Dice «No fee»; el costo va en el precio.' },
      { at: 13, text: '«Your order is complete»: el token ya está en tu cuenta.' },
    ],
    src: '/recursos/acciones/clip-okx-spacex.mp4',
    poster: '/recursos/acciones/clip-okx-spacex.jpg',
  },

  /**
   * «Lo que usaremos»: four full-bleed bands sliding sideways. Logos only from
   * public/recursos/acciones/logos. The stock tiles open their card (where to buy, who issues).
   */
  toolkit: {
    heading: 'Lo que usaremos',
    exchanges: { title: 'Exchanges que usaremos', venueIds: ['okx', 'kraken', 'bybit'], dexId: 'uniswap' },
    wallets: {
      title: 'Wallets que usaremos',
      items: [
        { id: 'base', name: 'Base app', url: 'https://base.app' },
        { id: 'metamask', name: 'MetaMask', url: 'https://metamask.io' },
        { id: 'rabby', name: 'Rabby', url: 'https://rabby.io' },
        { id: 'phantom', name: 'Phantom', url: 'https://phantom.com' },
        { id: 'trustwallet', name: 'Trust Wallet', url: 'https://trustwallet.com' },
        { id: 'ledger', name: 'Ledger', url: 'https://www.ledger.com' },
        { id: 'safe', name: 'Safe', url: 'https://safe.global' },
      ],
    },
    /** Blockchains, then the stablecoins; ETH and SOL share their chain's mark, so they appear once. `logo` is the file key. */
    tokens: {
      title: 'Tecnología blockchain que usaremos',
      items: [
        { logo: 'chain-ethereum', name: 'Ethereum', url: 'https://ethereum.org' },
        { logo: 'chain-arbitrum', name: 'Arbitrum', url: 'https://arbitrum.io' },
        { logo: 'chain-base', name: 'Base', url: 'https://www.base.org' },
        { logo: 'chain-robinhood', name: 'Robinhood Chain', url: 'https://robinhood.com' },
        { logo: 'chain-solana', name: 'Solana', url: 'https://solana.com' },
        { logo: 'coin-usdt', name: 'USDT', url: 'https://tether.to' },
        { logo: 'coin-usdc', name: 'USDC', url: 'https://www.circle.com/usdc' },
        { logo: 'coin-eurc', name: 'EURC', url: 'https://www.circle.com/eurc' },
        { logo: 'coin-dai', name: 'DAI', url: 'https://sky.money' },
      ],
    },
    stocks: { title: 'Acciones que puedes obtener', hint: 'Toca una para ver dónde comprarla y quién la emite.' },
  },

  /** A map (bank → exchange → USDT, then the split into A and B) over two method cards. */
  routes: {
    heading: '2 métodos, el mismo resultado',
    lead: 'Los dos empiezan igual: tu moneda bancaria (COP, USD, MXN…) se vuelve USDT, un dólar digital, en un exchange. Al final cambia quién guarda tu acción.',
    /** The animated bands: stop labels, and the coin's first face (cash). */
    flow: {
      label: 'Cómo viaja tu dinero en cada método, de tu banco a tu acción tokenizada',
      cash: 'COP',
      bank: 'Tu banco',
      exchange: 'Compras USDT en un exchange',
      aBuy: 'Compras la acción ahí mismo',
      aEnd: 'La guarda el exchange',
      bWallet: 'Envías USDT y un poco de ETH (gas) a tu wallet',
      bBuy: 'Compras en Uniswap',
      bEnd: 'La guardas tú',
    },
    /** Images: Higgsfield GPT Image 2.5, equinox style (no text, logos or faces), 21 nov 2026. */
    a: { letter: 'A', title: 'Lo guarda un custodio', tag: 'Lo más fácil', image: '/recursos/acciones/metodo-custodio.webp', imageAlt: 'La puerta de una bóveda de acero cerrada, iluminada por una luz cian.' },
    b: { letter: 'B', title: 'Lo guardas tú', tag: 'Más control', image: '/recursos/acciones/metodo-propia.webp', imageAlt: 'Una mano abierta sostiene una pequeña wallet física, iluminada por una luz cian.' },
    /** One row per question; `short` is the answer at a glance, `detail` the line under it. `mark` draws a yes/no icon. */
    facts: [
      {
        icon: 'buy',
        label: 'Cómo compras',
        a: { short: 'En el exchange', detail: 'Con tus USDT, ahí mismo.' },
        b: { short: 'En Uniswap', detail: 'Envías USDT y un poco de ETH (para el gas) a tu wallet.' },
      },
      {
        icon: 'choose',
        label: 'Eliges emisor y red',
        a: { short: 'No', detail: 'Lo decide el exchange (hoy, xStocks).', mark: 'no' },
        b: { short: 'Sí', detail: 'Tú eliges en Uniswap.', mark: 'yes' },
      },
      {
        icon: 'cost',
        label: 'Cuánto cuesta',
        a: { short: '0,1 % a 2,1 %', detail: 'Mis compras en OKX (19 nov 2026): orden a mercado 0,1 %; Convert ≈ +2,1 %.' },
        b: { short: 'Pool + gas', detail: 'Comisión del pool más el gas en ETH. Lo ves antes de confirmar.' },
      },
      {
        icon: 'risk',
        label: 'Si algo sale mal',
        a: { short: 'Reglas del exchange', detail: 'Dependes de lo que el exchange permita en tu país.' },
        b: { short: 'Tus 12 palabras', detail: 'Si las pierdes, pierdes la wallet.' },
      },
    ],
  },

  tech: {
    close: 'Cerrar',
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

  /** The four issuers whose tokens the workshop buys, as one pie; each opens its card. Colours: DESIGN.md chart-1…4. */
  issuersBlock: {
    heading: 'Quién emite los tokens',
    lead: 'Cuatro emisores crean los tokens que compras en el taller. Toca uno para ver su ficha.',
    /**
     * `since`: when each issuer started issuing tokenized stocks. xStocks and Robinhood: launch on
     * 30 jun 2025 (catalog sources, Kraken/xStocks and Robinhood docs). Coinbase: aug 2026 (press, per
     * the catalog). Ondo Global Markets: sep 2025 (launch announcement; not yet in the catalog).
     */
    shown: [
      { id: 'ondo', color: 'chart-1', since: 'sep 2025' },
      { id: 'xstocks', color: 'chart-2', since: 'jun 2025' },
      { id: 'robinhood', color: 'chart-3', since: 'jun 2025' },
      { id: 'coinbase', color: 'chart-4', since: 'ago 2026' },
    ],
    center: 'todo el mercado',
    others: 'Otros emisores',
    /** Next issuers by value on RWA.xyz (22 nov 2026), shown as logos in the «Otros emisores» row; each links to its RWA.xyz page. */
    othersList: [
      { id: 'bstocks', name: 'bStocks' },
      { id: 'securitize', name: 'Securitize' },
      { id: 'reality', name: 'Reality' },
      { id: 'figure', name: 'Figure' },
      { id: 'wisdomtree', name: 'WisdomTree' },
      { id: 'superstate', name: 'Superstate', slug: 'superstate-opening-bell' },
    ],
    tableLabel: 'Emisores: valor tokenizado, participación en el mercado, acciones y ETF, y desde cuándo emiten',
    sinceLabel: 'desde',
    colIssuer: 'Emisor',
    sourceUrl: 'https://app.rwa.xyz/stocks',
    ofMarket: 'del mercado total',
    stocksLabel: 'acciones y ETF',
    valueLabel: 'valor tokenizado',
    atLeast: 'al menos',
    open: (name: string) => `Ver la ficha de ${name}`,
    eligibility: 'Quién puede comprar',
    site: 'Sitio oficial',
    chartLabel: 'Participación de Ondo, xStocks, Robinhood, Coinbase y los demás emisores en el valor tokenizado de acciones',
    note: (date: string, source: string) => `Valor: ${source}. Acciones y ETF: nuestro catálogo al ${date}.`,
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
    /** Four icon cells, a 2×2 grid on phones and one row on laptops. */
    facts: [
      { icon: 'live', text: '3 horas en vivo' },
      { icon: 'questions', text: 'Preguntas al final de cada bloque' },
      { icon: 'recording', text: 'Te quedas con la grabación' },
      { icon: 'ai', text: 'Un Skill.md para tu agente de IA (Claude o ChatGPT) que te guía paso a paso' },
    ],
    steps: [
      {
        n: 'Antes',
        title: 'Crea tu cuenta',
        marks: ['exchanges'],
        does: ['Abres tu cuenta en el exchange y completas la verificación (KYC).', 'Te guía el Skill.md en tu agente de IA.'],
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
        /** Shown as logo + name (DESIGN.md: blockchains always by their logo); files chain-<id>. */
        networks: [
          { id: 'ethereum', name: 'Ethereum' },
          { id: 'arbitrum', name: 'Arbitrum' },
          { id: 'base', name: 'Base' },
          { id: 'robinhood', name: 'Robinhood Chain' },
          { id: 'solana', name: 'Solana' },
        ],
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

  /** The offer, right under the hero: the visitor does it with their own tools; Ekinoxis never holds the money. */
  control: {
    heading: 'Lo haces tú, con tus herramientas',
    items: [
      { icon: 'money', title: 'Tu dinero no pasa por nosotros', body: 'Compras directo en el exchange o en Uniswap. Ekinoxis nunca recibe, guarda ni mueve tu dinero.' },
      { icon: 'keys', title: 'Siempre tuyo', body: 'En tu cuenta, a tu nombre, o en tu wallet, con tus llaves. Nunca te pediremos tus 12 palabras.' },
      { icon: 'guide', title: 'Nosotros te enseñamos', body: 'El taller en vivo y el Skill.md te guían paso a paso; cada clic lo haces tú.' },
    ],
  },

  /** What Ekinoxis never does: the thank-you page repeats it after payment. */
  custody: 'Ekinoxis nunca recibe, guarda ni mueve tu dinero ni tus activos, y nunca te pedirá tus 12 palabras ni tus claves. Tú compras directamente en cada plataforma.',

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
  },

  /** After-payment page; the Payment Link redirects here. It cannot verify the payment, so it claims nothing Stripe has not. */
  thanks: {
    path: '/recursos/acciones-tokenizadas/gracias',
    metaTitle: 'Gracias por tu reserva',
    title: 'Gracias. Tu cupo está reservado.',
    body: 'Taller en vivo el sábado 5 de diciembre, de 10:00 a. m. a 1:00 p. m. (hora Colombia). Te escribimos al correo con el enlace y la preparación previa: tu cuenta y la verificación (KYC). Stripe te envía el recibo.',
    back: 'Volver al taller',
  },

} as const;

/** The workshop price in force at `now`: the Black Friday price until 1 Dec, then the regular one. */
export function accionesAmount(now: Date): number {
  const p = ACCIONES.price;
  return now.getTime() < Date.parse(p.promo.endsAt) ? p.promo.amount : p.regular;
}
