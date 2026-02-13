'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function AppBuildingPage() {
  const { language } = useLanguage();
  const t = content[language].services;

  const appBuildingContent = {
    en: {
      title: "App Building",
      headline: "Transform your ideas into powerful applications",
      subheadline: "Custom mobile and web apps built with cutting-edge technology",
      description: "We design and develop custom applications that integrate blockchain, AI, and modern web technologies. From MVPs to production-ready solutions, we bring your vision to life.",
      features: {
        title: "What We Build",
        items: [
          {
            icon: "📱",
            title: "Mobile Apps",
            description: "Native and cross-platform mobile applications for iOS and Android"
          },
          {
            icon: "🌐",
            title: "Web Applications",
            description: "Progressive web apps and responsive web applications"
          },
          {
            icon: "⛓️",
            title: "Blockchain Integration",
            description: "Web3 applications with smart contracts and crypto wallets"
          },
          {
            icon: "🤖",
            title: "AI-Powered Features",
            description: "Intelligent automation and AI-driven functionality"
          },
          {
            icon: "🔗",
            title: "API Development",
            description: "RESTful and GraphQL APIs for seamless integrations"
          },
          {
            icon: "☁️",
            title: "Cloud Infrastructure",
            description: "Scalable cloud deployment and infrastructure management"
          }
        ]
      },
      technologies: {
        title: "Technologies We Use",
        categories: [
          {
            name: "Frontend",
            items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"]
          },
          {
            name: "Backend",
            items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"]
          },
          {
            name: "Blockchain",
            items: ["Ethereum", "Base", "Solidity", "Hardhat", "Web3.js"]
          },
          {
            name: "AI/ML",
            items: ["OpenAI", "Claude", "TensorFlow", "LangChain", "Vector DBs"]
          }
        ]
      },
      process: {
        title: "Our Development Process",
        steps: [
          {
            number: "1",
            title: "Discovery",
            description: "Understanding your requirements and goals"
          },
          {
            number: "2",
            title: "Design",
            description: "Creating wireframes and user experience flows"
          },
          {
            number: "3",
            title: "Development",
            description: "Building your application with best practices"
          },
          {
            number: "4",
            title: "Testing",
            description: "Comprehensive testing and quality assurance"
          },
          {
            number: "5",
            title: "Deployment",
            description: "Launching your app to production"
          },
          {
            number: "6",
            title: "Support",
            description: "Ongoing maintenance and updates"
          }
        ]
      }
    },
    es: {
      title: "Desarrollo de Aplicaciones",
      headline: "Transforma tus ideas en aplicaciones poderosas",
      subheadline: "Apps móviles y web personalizadas construidas con tecnología de vanguardia",
      description: "Diseñamos y desarrollamos aplicaciones personalizadas que integran blockchain, IA y tecnologías web modernas. Desde MVPs hasta soluciones listas para producción, damos vida a tu visión.",
      features: {
        title: "Qué Construimos",
        items: [
          {
            icon: "📱",
            title: "Apps Móviles",
            description: "Aplicaciones móviles nativas y multiplataforma para iOS y Android"
          },
          {
            icon: "🌐",
            title: "Aplicaciones Web",
            description: "Progressive web apps y aplicaciones web responsivas"
          },
          {
            icon: "⛓️",
            title: "Integración Blockchain",
            description: "Aplicaciones Web3 con smart contracts y wallets cripto"
          },
          {
            icon: "🤖",
            title: "Funciones con IA",
            description: "Automatización inteligente y funcionalidad impulsada por IA"
          },
          {
            icon: "🔗",
            title: "Desarrollo de APIs",
            description: "APIs RESTful y GraphQL para integraciones sin problemas"
          },
          {
            icon: "☁️",
            title: "Infraestructura en la Nube",
            description: "Despliegue escalable en la nube y gestión de infraestructura"
          }
        ]
      },
      technologies: {
        title: "Tecnologías Que Usamos",
        categories: [
          {
            name: "Frontend",
            items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"]
          },
          {
            name: "Backend",
            items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"]
          },
          {
            name: "Blockchain",
            items: ["Ethereum", "Base", "Solidity", "Hardhat", "Web3.js"]
          },
          {
            name: "AI/ML",
            items: ["OpenAI", "Claude", "TensorFlow", "LangChain", "Vector DBs"]
          }
        ]
      },
      process: {
        title: "Nuestro Proceso de Desarrollo",
        steps: [
          {
            number: "1",
            title: "Descubrimiento",
            description: "Entendiendo tus requisitos y objetivos"
          },
          {
            number: "2",
            title: "Diseño",
            description: "Creando wireframes y flujos de experiencia de usuario"
          },
          {
            number: "3",
            title: "Desarrollo",
            description: "Construyendo tu aplicación con mejores prácticas"
          },
          {
            number: "4",
            title: "Pruebas",
            description: "Pruebas exhaustivas y aseguramiento de calidad"
          },
          {
            number: "5",
            title: "Despliegue",
            description: "Lanzando tu app a producción"
          },
          {
            number: "6",
            title: "Soporte",
            description: "Mantenimiento y actualizaciones continuas"
          }
        ]
      }
    }
  };

  const appContent = appBuildingContent[language];

  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">
              {appContent.title}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-blue">
              {appContent.headline}
            </h2>
            <p className="text-xl md:text-2xl text-cyber-purple/80 mb-6">
              {appContent.subheadline}
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              {appContent.description}
            </p>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-purple">
                {appContent.features.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {appContent.features.items.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                >
                  <Card glow={idx % 2 === 0 ? 'blue' : 'purple'} className="h-full p-8">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-cyber-blue">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technologies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
                {appContent.technologies.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {appContent.technologies.categories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                >
                  <Card glow="purple" className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-cyber-purple text-center">
                      {category.name}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-gray-300 text-center">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-purple">
                {appContent.process.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appContent.process.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                >
                  <Card glow="blue" className="p-6 text-center h-full">
                    <div className="text-5xl font-bold text-cyber-purple mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-cyber-blue">
                      {step.title}
                    </h3>
                    <p className="text-gray-300">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
                {t.pricing.title}
              </h2>
              <p className="text-xl text-cyber-blue/80 max-w-2xl mx-auto">
                {t.pricing.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.pricing.plans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + idx * 0.1 }}
                >
                  <Card
                    glow={plan.popular ? 'purple' : 'blue'}
                    className={`h-full p-8 relative ${plan.popular ? 'border-2 border-cyber-purple' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-cyber-purple text-white text-sm font-bold rounded-full">
                        {language === 'en' ? 'POPULAR' : 'POPULAR'}
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-cyber-blue">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-cyber-purple">
                          {plan.price}
                        </span>
                        {plan.period !== 'quote' && plan.period !== 'cotización' && (
                          <span className="text-gray-400 text-sm ml-2">
                            / {plan.period}
                          </span>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-cyber-blue mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={t.calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        glow={plan.popular ? 'purple' : 'blue'}
                        className="w-full"
                      >
                        {language === 'en' ? 'Schedule Meeting' : 'Agendar Reunión'}
                      </Button>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center"
          >
            <Card glow="purple" className="p-12">
              <h2 className="text-4xl font-bold mb-4 text-cyber-purple">
                {language === 'en' ? 'Ready to Build Your App?' : '¿Listo para Construir Tu App?'}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {language === 'en'
                  ? 'Let\'s discuss your project and bring your ideas to life with cutting-edge technology.'
                  : 'Discutamos tu proyecto y demos vida a tus ideas con tecnología de vanguardia.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={t.calendarLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" glow="blue">
                    {language === 'en' ? 'Schedule Consultation' : 'Agendar Consulta'}
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" glow="purple">
                    {language === 'en' ? 'Back to Services' : 'Volver a Servicios'}
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
