export type Language = 'en' | 'es';

export const content = {
  en: {
    hero: {
      title: "INNOVATION WITHOUT FRONTIERS",
      subtitle: "We are the first Innovation Laboratory from the Colombian Pacific specialized in Blockchain, Cryptography and Artificial Intelligence.",
      contactUs: "Contact Us",
    },
    nav: {
      home: "Home",
      education: "Education",
      certifications: "Certifications",
      hackerHouse: "Hacker House",
      products: "Products",
      research: "Research",
      culture: "Culture",
      techStack: "Tech Stack",
      services: "Services",
      hackers: "Our Hackers",
    },
    education: {
      title: "EDUCATION",
      description: "We enable free education in high technologies in collaboration with universities and government institutions. We conduct workshops, content and free access activities for the adoption of artificial intelligence, Blockchain and Crypto.",
      universities: {
        title: "University Partners",
        partners: [
          { name: "Universidad Autónoma de Occidente", logo: "/education/universities/Logo-uao.png" },
          { name: "Universidad del Valle", logo: "/education/universities/logo-USC.png" },
          { name: "Universidad ICESI", logo: "/education/universities/universidad_icesi.png" },
          { name: "Universidad San Buenaventura", logo: "/education/universities/usb_cali.png" },
        ],
      },
      gov: {
        title: "Government Partners",
        partners: [
          { name: "Gobernación del Valle", logo: "/gov/gov_valle.png" },
          { name: "SEDEC", logo: "/gov/SEDEC.png" },
          { name: "NIDO", logo: "/locations/nido_logo.png" },
        ],
      },
    },
    certifications: {
      title: "CERTIFICATIONS",
      description: "We encourage our hackers to get certified in cutting-edge technologies with leading certification partners.",
      partners: [
        { name: "Cyphrin", logo: "/education/certifications/cyphrin/cyphrinupdraft.png" },
        { name: "Speedrun Ethereum", logo: "/education/certifications/speedrunethereum/speedrunethereum.png" },
        { name: "Consensys Academy", logo: "/education/certifications/consensysacademy/consensys.png" },
        { name: "Alchemy University", logo: "/education/certifications/alchemyuniversity/alchemyu.png" },
        
      ],
    },
    hackerHouse: {
      title: "HACKER HOUSE",
      description: "We host hacker houses and hacking sessions to participate in global hackathons. We design, execute or support the creation of free spaces for developers who can build products or participate in international hackathons.",
      cta: "Join Our Next Session",
      hackathons: {
        title: "Participated Hackathons",
        items: [
          { name: "ETHGlobal", logo: "/hackathons/ethglobal.png" },
          { name: "Tech Startup Weeekend", logo: "/hackathons/techstars.png" },
          { name: "Base Batches 001", logo: "/hackathons/basebatches001.png" },
          { name: "Base Batches 002", logo: "/hackathons/basebatches002.png" },
          { name: "Crecimiento Alepth", logo: "/hackathons/crecimientoaleph.png" },
        ],
      },
    },
    products: {
      title: "PRODUCTS",
      description: " We design, develop and build prototypes, MVPs and proof of concepts products based on blockchain, crypto and AI.",
      categories: {
        blockchain: "Blockchain Solutions",
        crypto: "Cryptocurrency Products",
        ai: "AI Applications",
      },
      showcase: {
        title: "Products Created in Ekinoxis Hackers Houses",
        items: [
          {
            name: "ETHCALI Wallet",
            image: "/products/ethcaliwallet.png",
            description: "Built for Public Goods use. Enabling fast onboarding to users using privy.io. Please Fork the repo if you found it useful.",
            website: "https://wallet.ethcali.org/",
            github: "https://github.com/ETHcali/ethcaliorg",
            hackathon: "",
            technologies: ["Blockchain"],
            categories: ["Devtooling"],
          },
          {
            name: "Conservationix",
            image: "/products/conservationix.png",
            description: "Tokenize an island's ecosystems to fund their protection using NFTs and environmental bonds.",
            website: "",
            github: "https://github.com/Ekinoxis-evm/Superhack2024/tree/main",
            hackathon: "ETHGlobal Superhack 2024",
            hackathonLink: "https://ethglobal.com/events/superhack2024/",
            technologies: ["Blockchain"],
            categories: ["Marketplaces", "Real World Assets", "NFTs"],
          },
          {
            name: "CARP2P / TCARS",
            image: "/products/tcars.webp",
            description: "Tokenize your car, trade it seamlessly, or use it as collateral for loans.",
            website: "https://basebathches-2025.vercel.app/",
            github: "https://github.com/Ekinoxis-evm/tcars_xyz",
            hackathon: "Base Batches 001",
            hackathonLink: "",
            technologies: ["Blockchain"],
            categories: ["Marketplaces", "Real World Assets", "Stablecoins", "NFTs"],
          },
          {
            name: "CONVEXO",
            image: "/products/convexo.png",
            description: "Enabling international Funding for SMEs in LATAM.",
            website: "https://app.convexo.xyz/",
            github: "",
            hackathon: "ETHGlobal New York 2025",
            hackathonLink: "https://ethglobal.com/events/newyork2025/",
            technologies: ["Blockchain", "AI"],
            categories: ["Defi", "Real World Assets", "Stablecoins", "TradFi"],
          },
          {
            name: "AUKTRAFI",
            image: "/products/auktrafi.png",
            description: "Onchain Auctions for Real State bookings.",
            website: "https://www.auktrafi.xyz/",
            github: "https://github.com/Ekinoxis-evm/auktrafi-frontend",
            githubSecondary: "https://github.com/Ekinoxis-evm/auktrafi_contracts",
            hackathon: "ETH Online 2025",
            hackathonLink: "https://ethglobal.com/events/ethonline2025",
            technologies: ["Blockchain", "AI"],
            categories: ["Defi", "Real World Assets", "Stablecoins"],
          },
          {
            name: "1UP ESPORTS / Gaming Tower",
            image: "/products/1up.png",
            description: "Tokenized Gaming Tower on Base. Identity-gated challenges, course NFTs with ETH payments, and 1UP token for gaming actions.",
            website: "https://gamintower-fe.vercel.app/",
            github: "https://github.com/Ekinoxis-evm/gamintower-fe",
            githubSecondary: "https://github.com/Ekinoxis-evm/gaming-tower",
            hackathon: "",
            technologies: ["Blockchain"],
            categories: ["Gaming", "Identity", "NFTs", "Education"],
          },
          {
            name: "ZBricks",
            image: "/products/zbricks.png",
            description: "Real estate auctions on-chain. Transparent, secure property auctions powered by smart contracts. Bid with USDC, track phases in real-time, Base Network.",
            website: "https://zbricks-fe.vercel.app/",
            github: "https://github.com/Ekinoxis-evm/zbricks-fe",
            githubSecondary: "https://github.com/Ekinoxis-evm/zbricks-scs",
            hackathon: "ETH Global Hack Money 2026",
            hackathonLink: "https://ethglobal.com/events/hackmoney2026/home",
            technologies: ["Blockchain"],
            categories: ["Real World Assets", "Auctions", "NFTs", "Stablecoins"],
          },
        ],
      },
    },
    research: {
      title: "RESEARCH & COLLABORATION",
      description: "We conduct research in collaboration with universities and enterprises to enable edge innovative solutions that boost acceleration of innovation.",
      focus: "Cutting-edge research on the most advanced technologies of the 21st century.",
    },
    culture: {
      title: "CULTURE",
      description: "Cypher-minded builders. Open by default. Innovation by default.",
      values: [
        {
          title: "Open Source",
          description: "We build in public and share primitives that others can reuse.",
          details: [
            "We open-source reusable modules whenever possible — code, templates, and tooling.",
            "We document what we learn (trade-offs included) so others can replicate faster.",
            "We prefer open standards and verifiable systems over closed black boxes.",
          ],
        },
        {
          title: "Privacy",
          description: "User sovereignty by design. Data minimization by default.",
          details: [
            "We collect the minimum data needed and keep sensitive logic off-server when possible.",
            "We design for self-custody, consent, and selective disclosure.",
            "We explore ZK and privacy-preserving primitives to unlock safer UX.",
          ],
        },
        {
          title: "Innovation",
          description: "Frontier tech, shipped. Experiments become production when they earn it.",
          details: [
            "We prototype fast (hackathons, hacker houses), then harden what works.",
            "We test new ideas safely with measurable outcomes — not hype.",
            "We merge AI, cryptography, and blockchain into products that run in the real world.",
          ],
        },
        {
          title: "Community",
          description: "A builders-first network across LATAM and beyond.",
          details: [
            "We run spaces where builders meet: sessions, hacker houses, workshops, and demos.",
            "We connect researchers, founders, and developers to turn ideas into deployments.",
            "We share opportunities and collaborate across teams instead of competing in silos.",
          ],
        },
        {
          title: "Education",
          description: "Learning loops: teach → build → iterate → teach again.",
          details: [
            "We teach by building: real projects, real repos, real demos.",
            "We create accessible learning paths for AI, crypto, and blockchain adoption.",
            "We mentor hackers to become leaders: research, shipping, and communication.",
          ],
        },
        {
          title: "Collaboration",
          description: "We partner with institutions to deploy, not just to publish.",
          details: [
            "We co-build with universities, enterprises, and governments to reach production outcomes.",
            "We translate research into prototypes and pilots with clear success criteria.",
            "We keep IP and incentives aligned so innovation can scale responsibly.",
          ],
        },
      ],  
    },
    technologies: {
      title: "TECH STACK",
      description: "We use technologies at the frontier always. Our stack includes the latest tools and frameworks.",
      categories: {
        ai: {
          name: "Artificial Intelligence",
          logos: [
            "/tecnologies/AI/ChatGPT-Logo.png",
            "/tecnologies/AI/Claude_AI_logo.png",
            "/tecnologies/AI/cursor.png",
            "/tecnologies/AI/v0-logo-light.png",
            "/tecnologies/AI/gemini.webp",
            "/tecnologies/AI/grok.webp",
            "/tecnologies/AI/deepseek.webp",
          ],
        },
        crypto_networks: {
          name: "Blockchain Networks",
          tools: [
            "/tecnologies/Crypto/Blockchains/Base_Logo_1.png",
            "/tecnologies/Crypto/Blockchains/ethereum.png",
            "/tecnologies/Crypto/Blockchains/op mainnet.png",
            "/tecnologies/Crypto/Blockchains/polygon.png",
            "/tecnologies/Crypto/Blockchains/unichain.png",
          ],
        },
        crypto_protocols: {
          name: "WEB3 Protocols",
          tools: [
            "/tecnologies/Crypto/Protocols/uniswap-uni-logo.png",
            "/tecnologies/Crypto/Protocols/aave.svg",
            "/tecnologies/Crypto/Protocols/ens.svg",
            "/tecnologies/Crypto/Protocols/safe.svg",
          ],
        },
        crypto_wallets: {
          name: "Wallet Providers",
          tools: [
            "/tecnologies/Crypto/wallet providers/privy.png",
            "/tecnologies/Crypto/wallet providers/alchemy.png",
            "/tecnologies/Crypto/wallet providers/thirdweb.png",
          ],
        },
        development: {
          name: "Development & Infrastructure",
          tools: [
            "/tecnologies/Deployments/Vercel_Logo_1.png",
            "/tecnologies/infraservices/Primary_Vertical_Lockup_Full_Color.png",
          ],  
        },
        creativity: {
          name: "Creativity & Design",
          tools: [
            "/tecnologies/Creativity/canva.webp",
            "/tecnologies/Creativity/figma.png",
            "/tecnologies/Creativity/ilustrator.webp",
          ],
        },
        automations: {
          name: "Automations",
          tools: [
            "/tecnologies/automations/n8n-color.png",
            "/tecnologies/automations/zapier.webp",
          ],
        },
        management: {
          name: "Management",
          tools: [
            "/tecnologies/management/g-drive.png",
            "/tecnologies/management/OCclsw4c_400x400.jpg",
          ],
        },
        marketing: {
          name: "Marketing & E-commerce",
          tools: [
            "/tecnologies/marketing/qK72DSBL_400x400.jpg",
            "/tecnologies/marketing/shopify_logo_white.png",
            "/tecnologies/marketing/metaads.svg",
          ],
        },
        paymentintegrations: {
          name: "Payment Integrations",
          tools: [
            "/tecnologies/paymentintegrations/Stripe/Stripe_Logo_1.png",
            "/tecnologies/paymentintegrations/Coinbase/Coinbase.png",
            "/tecnologies/paymentintegrations/PayPal/PayPal_Logo_Alternative_1.png",
            "/tecnologies/paymentintegrations/MercadoPago/mercadopago.png",
            "/tecnologies/paymentintegrations/wompi/wompi.png",
          ],
        },
      },
    },
    services: {
      title: "SERVICES",
      description: "We provide consultancy and development services to help organizations leverage cutting-edge technologies.",
      offerings: [
        {
          title: "Consultancy",
          description: "Strategic guidance on blockchain, crypto, and AI implementation. We help organizations navigate the complexities of emerging technologies and develop innovative solutions.",
        },
        {
          title: "Development",
          description: "Custom development of prototypes, MVPs, and production-ready solutions. We build products that integrate WEB3 and AI technologies.",
        },
      ],
      pricing: {
        title: "Pricing Structure",
        description: "Transparent pricing for our services",
        plans: [
          {
            name: "Starter",
            price: "From $5,000",
            period: "project",
            features: [
              "Initial consultation & strategy",
              "Technical assessment",
              "MVP development",
              "2 weeks of support",
            ],
            popular: false,
          },
          {
            name: "Professional",
            price: "From $15,000",
            period: "project",
            features: [
              "Full consultation package",
              "Custom development",
              "Integration with existing systems",
              "1 month of support",
              "Documentation & training",
            ],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "quote",
            features: [
              "Dedicated team",
              "Ongoing support & maintenance",
              "Advanced integrations",
              "24/7 support",
              "SLA guarantees",
              "Custom pricing",
            ],
            popular: false,
          },
        ],
      },
      calendarLink: "https://calendar.app.google/DjRwd2YNcaTxGN5g8",
    },
    hackers: {
      title: "OUR HACKERS",
      description: "Meet the talented developers who have participated in our hacker houses and projects.",
      members: [
        { 
          name: "William Martinez", 
          image: "/hackers/william.png",
          profile: "Product Manager",
          university: "ICESI",
          github: "https://github.com/wmb81321",
          linkedin: "https://www.linkedin.com/in/williammartinez8/",
          x: "https://twitter.com/0xwmb"
        },
        { 
          name: "Juan Urrea", 
          image: "/hackers/Juanurrea.png",
          profile: "Researcher, Defi Specialist",
          university: "Anon",
          github: "",
          linkedin: "",
          x: "https://twitter.com/juan21179"
        },
        { 
          name: "Filadelfo Caicedo", 
          image: "/hackers/filadelfo.png",
          profile: "Researcher, Defi Specialist",
          university: "Anon",
          github: "https://github.com/phill900",
          linkedin: "https://www.linkedin.com/in/filadelfo-caicedo/",
          x: "https://twitter.com/Filatrader"
        },
        { 
          name: "Maria del Mar Borrero", 
          image: "/hackers/maria del mar.png",
          profile: "Community Manager, Digital Marketing",
          university: "UAO",
          github: "https://github.com/marimarketingdigitalw3",
          linkedin: "https://www.linkedin.com/in/mariadelmarborrerog/",
          x: "https://twitter.com/marimarketingw3"
        },
        { 
          name: "Cristobal Valencia", 
          image: "/hackers/cristobal.jpg",
          profile: "Full Stack Developer",
          university: "USC",
          github: "https://github.com/DevCristobalvc/",
          linkedin: "https://www.linkedin.com/in/cristobalvalenciaceron",
          x: "https://x.com/DevCristobalvc"
        },
        { 
          name: "Jose Bailon", 
          image: "/hackers/juan jose bailon.png",
          profile: "Backend Developer",
          university: "Univalle",
          github: "https://github.com/juanbailon",
          linkedin: "https://linkedin.com/in/juan-bailon-ab3767192",
          x: ""
        },
        { 
          name: "Juan David Burgos", 
          image: "/hackers/juan david burgos.jpg",
          profile: "Lawyer",
          university: "Unicauca",
          github: "https://github.com/juandavid883",
          linkedin: "https://www.linkedin.com/in/juan-david-burgos-giraldo-0000000000",
          x: "https://x.com/JuanBK_ethcali"
        },
        { 
          name: "Miguel Bolaños", 
          image: "/hackers/miguel bolanos.png",
          profile: "Front End Developer",
          university: "Anon",
          github: "https://github.com/MAB015",
          linkedin: "https://www.linkedin.com/in/mab015/",
          x: "https://twitter.com/MAB015"
        },
        { 
          name: "Jhon Alex Torres", 
          image: "/hackers/jhonalex.jpg",
          profile: "Full stack Developer",
          university: "USC",
          github: "https://github.com/DevJhonnTorres",
          linkedin: "https://www.linkedin.com/in/jhonnalexandertorrescastro",
          x: "https://x.com/the_aleeeex?s=21"
        },
        { 
          name: "Tania Agredo", 
          image: "/hackers/taniaagredo.png",
          profile: "Full stack Developer",
          university: "USC",
          github: "https://github.com/taniagredo/",
          linkedin: "https://www.linkedin.com/in/tania-agredoh?trk=contact-info",
          x: "https://x.com/devil_skyy?s=21"
        },
        { 
          name: "Juice Sands", 
          image: "/hackers/juicesands.png",
          profile: "Smartcontract Developer",
          university: "Anon",
          github: "https://github.com/ICREE8",
          linkedin: "",
          x: "https://x.com/1cree8"
        },
      ],
    },
    socials: {
      x: "https://x.com/ekinoxis",
      instagram: "https://www.instagram.com/ekinoxis.evm/",
      telegram: "https://t.me/ekinoxis",
      discord: "https://discord.gg/teQR8fA786",
      github: "https://github.com/ekinoxis-evm/",
    },
    footer: {
      usa: {
        address: "159 North Wolcott Street\nSuite 133\nCasper, WY - US",
        phone: "+1 (305) 504-1248",
      },
      colombia: {
        address: "Calle 36#128-321 - Zona Franca, Zonaamerica.com\nCali, Valle del Cauca - Colombia",
        phone: "+57 302 3721435",
      },
    },
  },
  es: {
    hero: {
      title: "EKINOXIS ES INNOVACIÓN SIN FRONTERAS",
      subtitle: "Somos el primer Laboratorio de Innovación del Pacífico Colombiano especializado en Blockchain, Criptografía e inteligencia artificial.",
      contactUs: "Contáctanos",
    },
    nav: {
      home: "Inicio",
      education: "Educación",
      certifications: "Certificaciones",
      hackerHouse: "Hacker House",
      products: "Productos",
      research: "Investigación",
      culture: "Cultura",
      techStack: "Tech Stack",
      services: "Servicios",
      hackers: "Nuestros Hackers",
    },
    education: {
      title: "EDUCACIÓN",
      description: "Habilitamos educación gratuita en tecnologías avanzadas en colaboración con universidades e instituciones gubernamentales. Realizamos talleres, contenido y actividades de acceso libre para la adopción de inteligencia artificial, Blockchain y Cripto.",
      universities: {
        title: "Socios Universitarios",
        partners: [
          { name: "Universidad Autónoma de Occidente", logo: "/education/universities/Logo-uao.png" },
          { name: "Universidad del Valle", logo: "/education/universities/logo-USC.png" },
          { name: "Universidad ICESI", logo: "/education/universities/universidad_icesi.png" },
          { name: "Universidad San Buenaventura", logo: "/education/universities/usb_cali.png" },
        ],
      },
      gov: {
        title: "Socios Gubernamentales",
        partners: [
          { name: "Gobernación del Valle", logo: "/gov/gov_valle.png" },
          { name: "SEDEC", logo: "/gov/SEDEC.png" },
          { name: "NIDO", logo: "/locations/nido_logo.png" },
        ],
      },
    },
    certifications: {
      title: "CERTIFICACIONES",
      description: "Colaboramos con socios certificadores líderes para validar y reconocer habilidades en tecnologías de vanguardia.",
      partners: [
        { name: "Cyphrin", logo: "/education/certifications/cyphrin/Updraft Logo Full - Dark.png" },
      ],
    },
    hackerHouse: {
      title: "HACKER HOUSE",
      description: "Organizamos hacker houses y sesiones de hacking para participar en hackathones globales. Diseñamos, ejecutamos o apoyamos la creación de espacios gratuitos para desarrolladores que puedan construir productos o participar en hackathon internacionales.",
      cta: "Únete a Nuestra Próxima Sesión",
      hackathons: {
        title: "Hackathones Participados",
        items: [
          { name: "ETHGlobal", logo: "/hackathons/ethglobal.png" },
        ],
      },
    },
    products: {
      title: "PRODUCTOS",
      description: "Creamos productos basados en blockchain, cripto e IA. Diseñamos, desarrollamos y construimos prototipos, MVPs y pruebas de conceptos que integren WEB3 y AI.",
      categories: {
        blockchain: "Soluciones Blockchain",
        crypto: "Productos Criptográficos",
        ai: "Aplicaciones de IA",
      },
      showcase: {
        title: "Productos Creados en Ekinoxis Hacker Houses",
        items: [
          {
            name: "ETHCALI Wallet",
            image: "/products/ethcaliwallet.png",
            description: "Construido para uso de Bienes Públicos. Habilitando onboarding rápido para usuarios usando privy.io. Por favor haz Fork del repo si lo encontraste útil.",
            website: "https://wallet.ethcali.org/",
            github: "",
            hackathon: "",
            technologies: ["Blockchain"],
            categories: ["Devtooling"],
          },
          {
            name: "Conservationix",
            image: "/products/conservationix.png",
            description: "Tokeniza ecosistemas de islas para financiar su protección usando NFTs y bonos ambientales.",
            website: "",
            github: "https://github.com/Ekinoxis-evm/Superhack2024/tree/main",
            hackathon: "ETHGlobal Superhack 2024",
            hackathonLink: "https://ethglobal.com/events/superhack2024/",
            technologies: ["Blockchain"],
            categories: ["Marketplaces", "Real World Assets", "NFTs"],
          },
          {
            name: "CARP2P / TCARS",
            image: "/products/tcars.png",
            description: "Tokeniza tu carro, tradéalo sin problemas, o úsalo como colateral para préstamos.",
            website: "https://basebathches-2025.vercel.app/",
            github: "https://github.com/Ekinoxis-evm/tcars_xyz",
            hackathon: "Base Batches 001",
            hackathonLink: "",
            technologies: ["Blockchain"],
            categories: ["Marketplaces", "Real World Assets", "Stablecoins", "NFTs"],
          },
          {
            name: "CONVEXO",
            image: "/products/convexo.png",
            description: "Habilitando financiamiento internacional para PYMEs en LATAM.",
            website: "https://app.convexo.xyz/",
            github: "",
            hackathon: "Tech Startup Weekend Cali 2025 & ETHGlobal NY 2025",
            hackathonLink: "https://ethglobal.com/events/newyork2025/",
            technologies: ["Blockchain", "AI"],
            categories: ["Defi", "Real World Assets", "Stablecoins", "TradFi"],
          },
          {
            name: "AUKTRAFI",
            image: "/products/auktrafi.png",
            description: "Subastas Onchain para reservas de Bienes Raíces.",
            website: "https://www.auktrafi.xyz/",
            github: "https://github.com/Ekinoxis-evm/auktrafi-frontend",
            githubSecondary: "https://github.com/Ekinoxis-evm/auktrafi_contracts",
            hackathon: "ETH Online 2025",
            hackathonLink: "https://ethglobal.com/events/ethonline2025",
            technologies: ["Blockchain", "AI"],
            categories: ["Defi", "Real World Assets", "Stablecoins"],
          },
          {
            name: "1UP ESPORTS / Gaming Tower",
            image: "/products/1up.png",
            description: "Tokenized Gaming Tower en Base. Desafíos con identidad, NFTs de cursos con pagos en ETH y token 1UP para acciones de gaming.",
            website: "https://gamintower-fe.vercel.app/",
            github: "https://github.com/Ekinoxis-evm/gamintower-fe",
            githubSecondary: "https://github.com/Ekinoxis-evm/gaming-tower",
            hackathon: "",
            technologies: ["Blockchain"],
            categories: ["Gaming", "Identity", "NFTs", "Education"],
          },
          {
            name: "ZBricks",
            image: "/products/zbricks.png",
            description: "Subastas de bienes raíces on-chain. Subastas transparentes y seguras con smart contracts. Oferta con USDC, fases en tiempo real, Base Network.",
            website: "https://zbricks-fe.vercel.app/",
            github: "https://github.com/Ekinoxis-evm/zbricks-fe",
            githubSecondary: "https://github.com/Ekinoxis-evm/zbricks-scs",
            hackathon: "ETH Global Hack Money 2026",
            hackathonLink: "https://ethglobal.com/events/hackmoney2026/home",
            technologies: ["Blockchain"],
            categories: ["Real World Assets", "Auctions", "NFTs", "Stablecoins"],
          },
        ],
      },
    },
    research: {
      title: "INVESTIGACIÓN & COLABORACIÓN",
      description: "Realizamos investigación en colaboración con universidades y empresas para habilitar soluciones innovadoras de vanguardia que impulsen la aceleración de la innovación.",
      focus: "Investigación de vanguardia sobre las tecnologías más avanzadas del siglo XXI.",
    },
    culture: {
      title: "CULTURA",
      description: "Constructores con mentalidad cypher. Abierto por defecto. Innovación por defecto.",
      values: [
        {
          title: "Open Source",
          description: "Construimos en público y compartimos primitivas reutilizables.",
          details: [
            "Open source cuando tiene sentido: módulos, plantillas y tooling reutilizable.",
            "Documentamos lo que aprendemos (incluyendo trade-offs) para acelerar a otros.",
            "Preferimos estándares abiertos y sistemas verificables sobre cajas negras.",
          ],
        },
        {
          title: "Privacidad",
          description: "Soberanía del usuario por diseño. Minimización de datos por defecto.",
          details: [
            "Recopilamos lo mínimo necesario y mantenemos lógica sensible fuera del servidor cuando es posible.",
            "Diseñamos para autocustodia, consentimiento y divulgación selectiva.",
            "Exploramos ZK y primitivas de privacidad para habilitar UX más segura.",
          ],
        },
        {
          title: "Innovación",
          description: "Tecnología de frontera, entregada. De experimento a producción cuando se lo gana.",
          details: [
            "Prototipamos rápido (hackathons, hacker houses) y endurecemos lo que funciona.",
            "Probamos ideas nuevas con métricas y seguridad — no solo hype.",
            "Combinamos IA, criptografía y blockchain para productos en el mundo real.",
          ],
        },
        {
          title: "Comunidad",
          description: "Una red de constructores en LATAM y más allá.",
          details: [
            "Creamos espacios para construir: sesiones, hacker houses, workshops y demos.",
            "Conectamos investigadores, founders y developers para llegar a despliegues reales.",
            "Compartimos oportunidades y colaboramos entre equipos, sin silos.",
          ],
        },
        {
          title: "Educación",
          description: "Ciclos de aprendizaje: enseñar → construir → iterar → enseñar.",
          details: [
            "Enseñamos construyendo: proyectos reales, repos reales, demos reales.",
            "Creamos rutas accesibles para adoptar IA, cripto y blockchain.",
            "Acompañamos hackers a ser líderes: investigación, shipping y comunicación.",
          ],
        },
        {
          title: "Colaboración",
          description: "Aliados para desplegar, no solo para publicar.",
          details: [
            "Co-construimos con universidades, empresas y gobiernos para resultados en producción.",
            "Llevamos investigación a prototipos y pilotos con criterios claros de éxito.",
            "Alineamos incentivos e IP para escalar innovación de forma responsable.",
          ],
        },
      ],
    },
    technologies: {
      title: "TECH STACK",
      description: "Siempre usamos tecnologías en la frontera. Nuestro stack incluye las últimas herramientas y frameworks.",
      categories: {
        ai: {
          name: "Inteligencia Artificial",
          logos: [
            "/tecnologies/AI/ChatGPT-Logo.png",
            "/tecnologies/AI/Claude_AI_logo.png",
            "/tecnologies/AI/cursor.png",
            "/tecnologies/AI/v0-logo-light.png",
          ],
        },
        crypto_networks: {
          name: "Redes Blockchain",
          tools: [
            "/tecnologies/Crypto/Blockchains/Base_Logo_1.png",
            "/tecnologies/Crypto/Blockchains/ethereum.png",
            "/tecnologies/Crypto/Blockchains/op mainnet.png",
            "/tecnologies/Crypto/Blockchains/polygon.png",
            "/tecnologies/Crypto/Blockchains/unichain.png",
          ],
        },
        crypto_protocols: {
          name: "Protocolos",
          tools: [
            "/tecnologies/Crypto/Protocols/uniswap-uni-logo.png",
            "/tecnologies/Crypto/Protocols/aave.svg",
            "/tecnologies/Crypto/Protocols/ens.svg",
            "/tecnologies/Crypto/Protocols/safe.svg",
          ],
        },
        crypto_wallets: {
          name: "Proveedores de Wallet",
          tools: [
            "/tecnologies/Crypto/wallet providers/privy.png",
            "/tecnologies/Crypto/wallet providers/alchemy.png",
          ],
        },
        development: {
          name: "Desarrollo & Infraestructura",
          tools: [
            "/tecnologies/Deployments/Vercel_Logo_1.png",
            "/tecnologies/infraservices/Primary_Vertical_Lockup_Full_Color.png",
          ],
        },
        creativity: {
          name: "Creatividad & Diseño",
          tools: [
            "/tecnologies/Creativity/canva.webp",
            "/tecnologies/Creativity/figma.png",
            "/tecnologies/Creativity/ilustrator.webp",
          ],
        },
        automations: {
          name: "Automatizaciones",
          tools: [
            "/tecnologies/automations/n8n-color.png",
            "/tecnologies/automations/zapier.webp",
          ],
        },
        management: {
          name: "Gestión",
          tools: [
            "/tecnologies/management/g-drive.png",
            "/tecnologies/management/OCclsw4c_400x400.jpg",
          ],
        },
        marketing: {
          name: "Marketing & E-commerce",
          tools: [
            "/tecnologies/marketing/qK72DSBL_400x400.jpg",
            "/tecnologies/marketing/shopify_logo_white.png",
          ],
        },
        paymentintegrations: {
          name: "Integraciones de Pago",
          tools: [
            "/tecnologies/paymentintegrations/Stripe/Stripe_Logo_1.png",
            "/tecnologies/paymentintegrations/Coinbase/Coinbase.png",
            "/tecnologies/paymentintegrations/PayPal/PayPal_Logo_Alternative_1.png",
          ],
        },
      },
    },
    services: {
      title: "SERVICIOS",
      description: "Proporcionamos servicios de consultoría y desarrollo para ayudar a las organizaciones a aprovechar tecnologías de vanguardia.",
      offerings: [
        {
          title: "Consultoría",
          description: "Orientación estratégica sobre implementación de blockchain, cripto e IA. Ayudamos a las organizaciones a navegar las complejidades de las tecnologías emergentes y desarrollar soluciones innovadoras.",
        },
        {
          title: "Desarrollo",
          description: "Desarrollo personalizado de prototipos, MVPs y soluciones listas para producción. Construimos productos que integran tecnologías WEB3 e IA.",
        },
      ],
      pricing: {
        title: "Estructura de Precios",
        description: "Precios transparentes para nuestros servicios",
        plans: [
          {
            name: "Starter",
            price: "Desde $5,000",
            period: "proyecto",
            features: [
              "Consulta inicial y estrategia",
              "Evaluación técnica",
              "Desarrollo de MVP/prototipo",
              "2 semanas de soporte",
            ],
            popular: false,
          },
          {
            name: "Profesional",
            price: "Desde $15,000",
            period: "proyecto",
            features: [
              "Paquete completo de consultoría",
              "Desarrollo personalizado",
              "Integración con sistemas existentes",
              "1 mes de soporte",
              "Documentación y capacitación",
            ],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Personalizado",
            period: "cotización",
            features: [
              "Equipo dedicado",
              "Soporte y mantenimiento continuo",
              "Integraciones avanzadas",
              "Soporte 24/7",
              "Garantías SLA",
              "Precio personalizado",
            ],
            popular: false,
          },
        ],
      },
      calendarLink: "https://calendar.app.google/DjRwd2YNcaTxGN5g8",
    },
    hackers: {
      title: "NUESTROS HACKERS",
      description: "Conoce a los talentosos desarrolladores que han participado en nuestros hacker houses y proyectos.",
      members: [
        { 
          name: "William Martinez", 
          image: "/hackers/william.png",
          profile: "Founder",
          university: "ICESI",
          github: "https://github.com/wmb81321",
          linkedin: "https://www.linkedin.com/in/williammartinez8/",
          x: "https://twitter.com/0xwmb"
        },
        { 
          name: "Juan Urrea", 
          image: "/hackers/Juanurrea.png",
          profile: "Researcher, Defi Specialist",
          university: "Anon",
          github: "",
          linkedin: "",
          x: "https://twitter.com/juan21179"
        },
        { 
          name: "Filadelfo Caicedo", 
          image: "/hackers/filadelfo.png",
          profile: "Researcher, Defi Specialist",
          university: "Anon",
          github: "https://github.com/phill900",
          linkedin: "https://www.linkedin.com/in/filadelfo-caicedo/",
          x: "https://twitter.com/Filatrader"
        },
        { 
          name: "Maria del Mar Borrero", 
          image: "/hackers/maria del mar.png",
          profile: "Community Manager, Digital Marketing",
          university: "UAO",
          github: "https://github.com/marimarketingdigitalw3",
          linkedin: "https://www.linkedin.com/in/mariadelmarborrerog/",
          x: "https://twitter.com/marimarketingw3"
        },
        { 
          name: "Cristobal Valencia", 
          image: "/hackers/cristobal.jpg",
          profile: "Full Stack Developer",
          university: "USC",
          github: "https://github.com/DevCristobalvc/",
          linkedin: "https://www.linkedin.com/in/cristobalvalenciaceron",
          x: "https://x.com/DevCristobalvc"
        },
        { 
          name: "Jose Bailon", 
          image: "/hackers/juan jose bailon.png",
          profile: "Backend Developer",
          university: "Univalle",
          github: "https://github.com/juanbailon",
          linkedin: "https://linkedin.com/in/juan-bailon-ab3767192",
          x: ""
        },
        { 
          name: "Juan David Burgos", 
          image: "/hackers/juan david burgos.jpg",
          profile: "Lawyer",
          university: "Unicauca",
          github: "",
          linkedin: "https://www.linkedin.com/in/juan-david-burgos-giraldo-0000000000",
          x: "https://x.com/JuanBK_ethcali"
        },
        { 
          name: "Miguel Bolaños", 
          image: "/hackers/miguel bolanos.png",
          profile: "Front End Developer",
          university: "Anon",
          github: "https://github.com/MAB015",
          linkedin: "https://www.linkedin.com/in/mab015/",
          x: "https://twitter.com/MAB015"
        },
        { 
          name: "Jhon Alex Torres", 
          image: "/hackers/jhonalex.jpg",
          profile: "Full stack Developer",
          university: "USC",
          github: "https://github.com/DevJhonnTorres",
          linkedin: "https://www.linkedin.com/in/jhonnalexandertorrescastro",
          x: "https://x.com/the_aleeeex?s=21"
        },
        { 
          name: "Tania Agredo", 
          image: "/hackers/taniaagredo.png",
          profile: "Full stack Developer",
          university: "USC",
          github: "https://github.com/taniagredo/",
          linkedin: "https://www.linkedin.com/in/tania-agredoh?trk=contact-info",
          x: "https://x.com/devil_skyy?s=21"
        },
        { 
          name: "Juice Sands", 
          image: "/hackers/william.png",
          profile: "Smartcontract Developer",
          university: "Anon",
          github: "https://github.com/ICREE8",
          linkedin: "",
          x: "https://x.com/1cree8"
        },
      ],
    },
    socials: {
      x: "https://x.com/ekinoxis",
      instagram: "https://www.instagram.com/ekinoxis.evm/",
      telegram: "https://t.me/ekinoxis",
      discord: "https://discord.gg/teQR8fA786",
      github: "https://github.com/ekinoxis-evm/",
    },
    footer: {
      usa: {
        address: "159 North Wolcott Street\nSuite 133\nCasper, WY - US",
        phone: "+1 (305) 504-1248",
        email: "hello@ekinoxis.com",
      },
      colombia: {
        address: "Calle 36#128-321 - Zona Franca, Zonaamerica.com\nCali, Valle del Cauca - Colombia",
        phone: "+57 302 3721435",
        email: "hola@ekinoxis.com",
      },
    },
  },
};

