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

/* ── Acciones de EE. UU. tokenizadas ───────────────────────────────────────── */

export type Company = 'spacex' | 'apple' | 'anthropic' | 'nvidia';

export type ModuleStep = { title: string; body: string; source?: string };

export type FreeModule = {
  n: string;
  title: string;
  summary: string;
  source: string;
  steps: ModuleStep[];
  exercise?: string;
};

/**
 * Figures come from marketing/referencias/acciones-okx/datos-fuentes.md (William's own OKX
 * recordings and order history, 19 nov 2026) and the issuer catalog read from the Uniswap app the
 * same day (products/digital products/catalogo-uniswap-acciones.md). Every figure carries its source
 * beside it. Draft copy, pending William's review: docs/courses/acciones-tokenizadas-contenido.md.
 */
export const ACCIONES = {
  slug: 'acciones-tokenizadas',
  path: '/recursos/acciones-tokenizadas',
  /** localStorage key and URL flag (?abierto=1) that open modules 1–2 in this browser. */
  unlockKey: 'acciones_unlocked',
  unlockParam: 'abierto',
  metaTitle: 'Acciones de EE. UU. tokenizadas: cómo comprarlas y cuánto cuestan de verdad',
  metaDescription:
    'Dos módulos gratis: qué compras cuando compras una acción tokenizada y las dos rutas en OKX, con el costo real de tres compras. Esto no es asesoría de inversión.',
  disclaimer: 'Esto no es asesoría de inversión.',

  hero: {
    badge: 'Recurso gratis',
    title: 'Compra acciones de EE. UU. ',
    titleEm: 'con lo que tengas',
    lead: 'Te muestro las dos rutas que usé en OKX para comprar SpaceX y Anthropic, cuánto me costó cada una de verdad, y qué es exactamente lo que compraste.',
    logos: ['spacex', 'apple', 'anthropic'] as Company[],
    cta: 'Quiero los dos primeros módulos gratis',
  },

  free: {
    badge: 'Gratis · módulos 1 y 2',
    heading: 'Lo que aprendes gratis',
    locked: 'Se abre con tu correo',
    modules: [
      {
        n: '01',
        title: 'Qué compras de verdad',
        summary: 'Un token que sigue el precio, no la acción: sin voto y con dividendos reinvertidos, no en efectivo.',
        source: 'Fuente: OKX help · sep 2026',
        steps: [
          { title: 'La idea en una frase.', body: 'Un token en una blockchain que sigue el precio de una acción de EE. UU.' },
          { title: 'Lo que no recibes.', body: 'No es propiedad legal de la acción y no da voto; los dividendos se reinvierten, no se pagan en efectivo.', source: 'OKX help · aviso en pantalla' },
          { title: 'Quién está detrás.', body: 'OKX distribuye y negocia; el emisor es xStocks (Backed Assets). Si lo retiras, sale el token del emisor (AAPLx en vez de xAAPL).', source: 'OKX help · sep 2026' },
          { title: 'Respaldo.', body: 'xStocks dice que cada token está respaldado 1:1 por la acción. Es la afirmación del emisor.', source: 'Kraken xStocks · consultado 19 nov 2026' },
          { title: 'Cuándo se negocia.', body: '24/7 en OKX; fuera del horario de EE. UU. el precio es el último cierre más una estimación y los spreads se amplían. Compra con la bolsa abierta.', source: 'OKX help · sep 2026' },
          { title: 'Quién no puede.', body: 'Residentes de EE. UU., Canadá, Reino Unido y Australia.', source: 'Kraken · ene 2026' },
        ],
        exercise: 'Abre la ficha de una acción en OKX y encuentra el aviso de «no es propiedad legal».',
      },
      {
        n: '02',
        title: 'Dos rutas, dos costos',
        summary: 'La compra rápida salió ≈ 2,1 % más cara aunque decía «No fee»; la orden a mercado costó 0,1 %.',
        source: 'Fuente: mi historial de órdenes · 19 nov 2026',
        steps: [
          { title: 'Antes.', body: 'Cuenta en OKX con la identidad verificada y USDT en la cuenta.' },
          { title: 'Ruta 1 · Convert.', body: 'Trade → Quick → Stock → empresa → Buy → Instant. Dice «No fee».' },
          { title: 'Dónde está el costo.', body: 'Apple: ficha 349,23 USDT, cotizado 356,70 (+2,1 %). Por eso, justo después de pagar 2,00 USDT, el portafolio mostró US$1,95.', source: 'Pantalla · 19 nov 2026' },
          { title: 'Ruta 2 · Spot.', body: 'TradFi → empresa → orden a mercado. Anthropic: 2,35 USDT, comisión 0,1 % cobrada en el token.', source: 'Pantalla · 19 nov 2026' },
          { title: 'Calcúlalo tú.', body: 'Historial de órdenes → precio pagado frente al precio de la ficha en ese momento. OKX no publica esta tarifa; la tuya está en «My fee tier».' },
        ],
        exercise: 'Compra el mínimo por las dos rutas y calcula tu propio porcentaje.',
      },
    ] satisfies FreeModule[],
    start: 'Empezar el módulo 1',
  },

  proof: {
    kicker: 'Lo que hice',
    heading: 'Tres compras reales, con su costo',
    rows: [
      { company: 'spacex', name: 'SpaceX', route: 'Convert · pagué 1,00 USDT', cost: '+2,1 %' },
      { company: 'apple', name: 'Apple', route: 'Convert · pagué 2,00 USDT', cost: '+2,1 %' },
      { company: 'anthropic', name: 'Anthropic', route: 'Orden a mercado, el día que debutó · 2,35 USDT', cost: '0,1 %' },
    ] as { company: Company; name: string; route: string; cost: string }[],
    note: 'Compras del 19 nov 2026 en una cuenta de OKX. Tu costo puede ser distinto: depende de tu nivel de comisión y de la hora.',
  },

  paid: {
    badge: 'Próximamente',
    heading: 'El curso completo',
    topics: [
      { n: '03', title: 'Tu propia wallet y cómo cuidarla' },
      { n: '04', title: 'Comprar en Uniswap desde esa wallet' },
      { n: '05', title: 'Emisores y riesgos: un checklist antes de comprar' },
    ],
    catalogHeading: 'En Uniswap, la misma empresa tiene varios emisores',
    catalogLead: 'Cada token lo emite alguien distinto. En el módulo 5 aprendes a elegir.',
    catalog: [
      { company: 'spacex', name: 'SpaceX', issuers: ['Robinhood', 'xStocks', 'Ondo', 'Coinbase', 'Bstocks', 'Reality', 'Anchored'] },
      { company: 'anthropic', name: 'Anthropic', issuers: ['xStocks', 'Ondo'] },
      { company: 'nvidia', name: 'NVIDIA', issuers: ['xStocks', 'Ondo', 'Dinari', 'Coinbase', 'Bstocks', 'Reality', 'Anchored'] },
      { company: 'apple', name: 'Apple', issuers: ['xStocks', 'Ondo', 'Coinbase', 'Bstocks', 'Reality', 'Anchored'] },
    ] as { company: Company; name: string; issuers: string[] }[],
    catalogSource: 'Fuente: Uniswap web app, categoría Stocks · 19 nov 2026',
    cta: 'Avísame cuando abra',
  },

  risks: {
    kicker: 'Antes de comprar',
    heading: 'Lo que nadie te dice en el video',
    items: [
      { title: 'No es para todos', body: 'xStocks no está disponible para residentes de EE. UU., Canadá, Reino Unido ni Australia.', source: 'Kraken · ene 2026' },
      { title: 'Colombia: no verificado', body: 'No hemos verificado el estatus legal ni tributario para residentes en Colombia. Consulta a un profesional antes de invertir.' },
      { title: 'Busca por emisor, no por nombre', body: 'En Uniswap aparecen tokens con nombres parecidos que no son la acción, como «Claude» o «ANTHROPIC 1x Long».', source: 'Uniswap, Trending · 19 nov 2026' },
      { title: 'Puedes perder lo que pongas', body: 'Empieza con un monto que estés dispuesto a perder.' },
    ],
  },

  form: {
    badge: 'Gratis',
    heading: 'Abre los módulos 1 y 2',
    name: 'Nombre',
    nameError: 'Escribe tu nombre.',
    email: 'Correo',
    emailError: 'Revisa el correo.',
    whatsapp: 'WhatsApp (opcional)',
    notify: 'Avísame también cuando abra el curso completo.',
    submit: 'Abrir los módulos gratis',
    sending: 'Enviando…',
    after: 'Se abren aquí mismo, al instante.',
    networkError: 'No se pudo enviar. Intenta de nuevo.',
    /** leads.message is required; the lead records what was asked for. */
    message: 'Quiero la introducción al curso de acciones tokenizadas',
    messageNotify: ' + avísame cuando abra el curso completo',
    doneBadge: 'Listo',
    doneHeading: 'Tus módulos 1 y 2 están abiertos.',
    doneNotify: 'Te avisamos por correo cuando abra el curso completo.',
  },

  teacher: {
    heading: 'Quién lo enseña',
    body: 'William Martínez, fundador de Ekinoxis Labs, el laboratorio de IA y cripto del Pacífico colombiano.',
    link: 'Conoce el lab',
  },

  mobileCta: 'Quiero los módulos gratis',

  /** The lead's confirmation email (src/lib/notify.ts). No promise of a personal reply. */
  email: {
    subject: 'Tus módulos 1 y 2 están abiertos',
    hello: (name: string) => `Hola ${name}:`,
    body: 'Ya puedes leer los dos primeros módulos del curso de acciones tokenizadas.',
    button: 'Ir a los módulos',
    notify: 'Te escribimos cuando abra el curso completo.',
    sign: '— Ekinoxis Labs',
  },
} as const;
