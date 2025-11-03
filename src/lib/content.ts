export type Language = 'en' | 'es';

export const content = {
  en: {
    hero: {
      title: "INNOVATION WITHOUT FRONTIERS",
      subtitle: "We are the first Innovation Laboratory of the Colombian Pacific specialized in Blockchain, Cryptography and Artificial Intelligence.",
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
      description: "We collaborate with leading certification partners to validate and recognize skills in cutting-edge technologies.",
      partners: [
        { name: "Cyphrin", logo: "/education/certifications/cyphrin/Updraft Logo Full - Dark.png" },
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
        ],
      },
    },
    products: {
      title: "PRODUCTS",
      description: "We create products based on blockchain, crypto and AI. We design, develop and build prototypes, MVPs and proof of concepts that integrate WEB3 and AI.",
      categories: {
        blockchain: "Blockchain Solutions",
        crypto: "Cryptocurrency Products",
        ai: "AI Applications",
      },
    },
    research: {
      title: "RESEARCH & COLLABORATION",
      description: "We conduct research in collaboration with universities and enterprises to enable edge innovative solutions that boost acceleration of innovation.",
      focus: "Cutting-edge research on the most advanced technologies of the 21st century.",
    },
    culture: {
      title: "CULTURE",
      description: "We have a culture and practices oriented to open source innovation. We believe in collaborative development and knowledge sharing.",
      values: [
        {
          title: "Open Source",
          description: "We believe in transparency and collaborative development.",
        },
        {
          title: "Innovation",
          description: "We push the boundaries of what's possible with emerging technologies.",
        },
        {
          title: "Community",
          description: "We foster a community of developers, researchers, and innovators.",
        },
        {
          title: "Education",
          description: "We share knowledge freely and empower the next generation.",
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
          ],
        },
        crypto: {
          name: "Cryptocurrency & Blockchain",
          blockchains: [
            "/tecnologies/Crypto/Blockchains/Base_Logo_1.png",
            "/tecnologies/Crypto/Blockchains/ethereum.png",
            "/tecnologies/Crypto/Blockchains/op mainnet.png",
            "/tecnologies/Crypto/Blockchains/polygon.png",
            "/tecnologies/Crypto/Blockchains/unichain.png",
          ],
          protocols: [
            "/tecnologies/Crypto/Protocols/uniswap-uni-logo.png",
            "/tecnologies/Crypto/Protocols/aave.svg",
            "/tecnologies/Crypto/Protocols/ens.svg",
            "/tecnologies/Crypto/Protocols/safe.svg",
          ],
          wallets: [
            "/tecnologies/Crypto/wallet providers/privy.png",
          ],
        },
        development: {
          name: "Development & Infrastructure",
          tools: [
            "/tecnologies/Deployments/vercel-logotype-light.png",
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
            "/tecnologies/marketing/shopify_logo_black.png",
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
    },
    hackers: {
      title: "OUR HACKERS",
      description: "Meet the talented developers who have participated in our hacker houses and projects.",
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
          name: "Camilo Sacamboy", 
          image: "/hackers/camilosacanamboy.png",
          profile: "Full stack Developer",
          university: "ICESI",
          github: "https://github.com/csacanam",
          linkedin: "https://www.linkedin.com/in/camilosaka/",
          x: "https://x.com/camilosaka"
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
    },
    research: {
      title: "INVESTIGACIÓN & COLABORACIÓN",
      description: "Realizamos investigación en colaboración con universidades y empresas para habilitar soluciones innovadoras de vanguardia que impulsen la aceleración de la innovación.",
      focus: "Investigación de vanguardia sobre las tecnologías más avanzadas del siglo XXI.",
    },
    culture: {
      title: "CULTURA",
      description: "Tenemos una cultura y prácticas orientadas a la innovación open source. Creemos en el desarrollo colaborativo y el intercambio de conocimiento.",
      values: [
        {
          title: "Open Source",
          description: "Creemos en la transparencia y el desarrollo colaborativo.",
        },
        {
          title: "Innovación",
          description: "Impulsamos los límites de lo posible con tecnologías emergentes.",
        },
        {
          title: "Comunidad",
          description: "Fomentamos una comunidad de desarrolladores, investigadores e innovadores.",
        },
        {
          title: "Educación",
          description: "Compartimos conocimiento libremente y empoderamos a la próxima generación.",
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
        crypto: {
          name: "Criptomonedas & Blockchain",
          blockchains: [
            "/tecnologies/Crypto/Blockchains/Base_Logo_1.png",
            "/tecnologies/Crypto/Blockchains/ethereum.png",
            "/tecnologies/Crypto/Blockchains/op mainnet.png",
            "/tecnologies/Crypto/Blockchains/polygon.png",
            "/tecnologies/Crypto/Blockchains/unichain.png",
          ],
          protocols: [
            "/tecnologies/Crypto/Protocols/uniswap-uni-logo.png",
            "/tecnologies/Crypto/Protocols/aave.svg",
            "/tecnologies/Crypto/Protocols/ens.svg",
            "/tecnologies/Crypto/Protocols/safe.svg",
          ],
          wallets: [
            "/tecnologies/Crypto/wallet providers/privy.png",
          ],
        },
        development: {
          name: "Desarrollo & Infraestructura",
          tools: [
            "/tecnologies/Deployments/vercel-logotype-light.png",
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
            "/tecnologies/marketing/shopify_logo_black.png",
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
          name: "Camilo Sacamboy", 
          image: "/hackers/camilosacanamboy.png",
          profile: "Full stack Developer",
          university: "ICESI",
          github: "https://github.com/csacanam",
          linkedin: "https://www.linkedin.com/in/camilosaka/",
          x: "https://x.com/camilosaka"
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
      },
      colombia: {
        address: "Calle 36#128-321 - Zona Franca, Zonaamerica.com\nCali, Valle del Cauca - Colombia",
        phone: "+57 302 3721435",
      },
    },
  },
};

