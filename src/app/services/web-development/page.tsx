'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function WebDevelopmentPage() {
  const { language } = useLanguage();

  const webDevContent = {
    en: {
      title: "Web Development",
      headline: "Launch your online business in 5 days",
      subheadline: "With payments, WhatsApp & automation ready",
      description: "We build your complete online presence so you can sell, get paid, and talk to customers immediately.",
      trustLine: "From $300 · No hidden fees · 50% upfront, 50% on delivery",
      perfectFor: {
        title: "Perfect for:",
        items: [
          "Entrepreneurs launching fast",
          "Local businesses going digital",
          "Consultants & service providers",
          "Online stores & digital products"
        ],
        tagline: "If you want speed, clarity, and ownership — this is for you."
      },
      whatYouGet: {
        title: "What You Get",
        subtitle: "Complete solutions, not just features",
        items: [
          "A professional website ready to sell",
          "Admin panel to manage products & services",
          "Payments with Stripe or Wompi",
          "WhatsApp contact + scheduling",
          "Domain, hosting & corporate email",
          "Email payment confirmations",
          "Delivered in 5 days"
        ]
      },
      pricing: {
        title: "Choose Your Package",
        plans: [
          {
            name: "Online Business",
            price: "$300",
            priceAlt: "1.000.000 COP",
            badge: "Best to start",
            features: [
              "Admin panel (products & services)",
              "Appointment scheduling",
              "WhatsApp integration",
              "Stripe or Wompi payments",
              "Domain + hosting (1 year*)",
              "Corporate email (1 year*)",
              "Payment confirmation emails",
              "5-day delivery",
              "50% upfront / 50% final"
            ],
            cta: "Start with Online Business"
          },
          {
            name: "Professional Online Business",
            price: "$600",
            priceAlt: "2.000.000 COP",
            badge: "Most popular",
            popular: true,
            features: [
              "Everything in Basic, plus:",
              "AI Agent on WhatsApp or Telegram",
              "API usage billed directly to client",
              "+1 live feedback meeting",
              "+2 feedback iterations",
              "5-day delivery"
            ],
            cta: "Go Professional"
          },
          {
            name: "Complete Online Business",
            price: "$1,000",
            priceAlt: "4.000.000 COP",
            badge: "For teams & scale",
            features: [
              "Everything above, plus:",
              "CRM to manage & follow up clients",
              "Lead tracking & pipeline",
              "Better control for growth"
            ],
            cta: "Build the Complete Business"
          }
        ],
        note: "*Domains and hosting subject to availability"
      },
      howItWorks: {
        title: "How It Works",
        subtitle: "Simple, transparent process",
        steps: [
          { number: "1", text: "Choose your plan" },
          { number: "2", text: "Pay 50% upfront" },
          { number: "3", text: "We build & share progress" },
          { number: "4", text: "Feedback & adjustments" },
          { number: "5", text: "Pay remaining 50%" },
          { number: "6", text: "Go live 🚀" }
        ]
      },
      trust: {
        title: "Why Choose Us",
        items: [
          "Secure payments",
          "Clear delivery time",
          "No subscriptions",
          "Ownership of your site",
          "WhatsApp support"
        ]
      },
      finalCta: {
        title: "Ready to launch?",
        button: "Start your business today"
      }
    },
    es: {
      title: "Desarrollo Web",
      headline: "Lanza tu negocio online en 5 días",
      subheadline: "Con pagos, WhatsApp y automatización listos",
      description: "Construimos tu presencia online completa para que puedas vender, recibir pagos y hablar con clientes inmediatamente.",
      trustLine: "Desde $300 · Sin costos ocultos · 50% adelantado, 50% en entrega",
      perfectFor: {
        title: "Perfecto para:",
        items: [
          "Emprendedores lanzando rápido",
          "Negocios locales digitalizándose",
          "Consultores y proveedores de servicios",
          "Tiendas online y productos digitales"
        ],
        tagline: "Si quieres velocidad, claridad y propiedad — esto es para ti."
      },
      whatYouGet: {
        title: "Qué Obtienes",
        subtitle: "Soluciones completas, no solo características",
        items: [
          "Un sitio web profesional listo para vender",
          "Panel de administración para gestionar productos y servicios",
          "Pagos con Stripe o Wompi",
          "Contacto por WhatsApp + agendamiento",
          "Dominio, hosting y correo corporativo",
          "Confirmaciones de pago por email",
          "Entregado en 5 días"
        ]
      },
      pricing: {
        title: "Elige Tu Paquete",
        plans: [
          {
            name: "Negocio Online",
            price: "$300",
            priceAlt: "1.000.000 COP",
            badge: "Mejor para empezar",
            features: [
              "Panel de administración (productos y servicios)",
              "Agendamiento de citas",
              "Integración con WhatsApp",
              "Pagos con Stripe o Wompi",
              "Dominio + hosting (1 año*)",
              "Correo corporativo (1 año*)",
              "Confirmaciones de pago por email",
              "Entrega en 5 días",
              "50% adelantado / 50% final"
            ],
            cta: "Comenzar con Negocio Online"
          },
          {
            name: "Negocio Online Profesional",
            price: "$600",
            priceAlt: "2.000.000 COP",
            badge: "Más popular",
            popular: true,
            features: [
              "Todo lo del Básico, más:",
              "Agente de IA en WhatsApp o Telegram",
              "Uso de API facturado directamente al cliente",
              "+1 reunión de retroalimentación en vivo",
              "+2 iteraciones de retroalimentación",
              "Entrega en 5 días"
            ],
            cta: "Ir Profesional"
          },
          {
            name: "Negocio Online Completo",
            price: "$1,000",
            priceAlt: "4.000.000 COP",
            badge: "Para equipos y escalamiento",
            features: [
              "Todo lo anterior, más:",
              "CRM para gestionar y hacer seguimiento de clientes",
              "Seguimiento de leads y pipeline",
              "Mejor control para el crecimiento"
            ],
            cta: "Construir el Negocio Completo"
          }
        ],
        note: "*Dominios y hosting sujetos a disponibilidad"
      },
      howItWorks: {
        title: "Cómo Funciona",
        subtitle: "Proceso simple y transparente",
        steps: [
          { number: "1", text: "Elige tu plan" },
          { number: "2", text: "Paga 50% adelantado" },
          { number: "3", text: "Construimos y compartimos progreso" },
          { number: "4", text: "Retroalimentación y ajustes" },
          { number: "5", text: "Paga el 50% restante" },
          { number: "6", text: "¡Sal en vivo! 🚀" }
        ]
      },
      trust: {
        title: "Por Qué Elegirnos",
        items: [
          "Pagos seguros",
          "Tiempo de entrega claro",
          "Sin suscripciones",
          "Propiedad de tu sitio",
          "Soporte por WhatsApp"
        ]
      },
      finalCta: {
        title: "¿Listo para lanzar?",
        button: "Comienza tu negocio hoy"
      }
    }
  };

  const t = webDevContent[language];

  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">
              {t.title}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-blue">
              {t.headline}
            </h2>
            <p className="text-xl md:text-2xl text-cyber-purple/80 mb-6">
              {t.subheadline}
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-4">
              {t.description}
            </p>
            <p className="text-sm text-cyber-blue/70 font-semibold">
              {t.trustLine}
            </p>
          </motion.div>

          {/* Perfect For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card glow="blue" className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-cyber-blue">
                {t.perfectFor.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {t.perfectFor.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="text-2xl mr-3">✓</span>
                    <span className="text-gray-300 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-cyber-purple italic text-lg">
                {t.perfectFor.tagline}
              </p>
            </Card>
          </motion.div>

          {/* What You Get Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-purple">
                {t.whatYouGet.title}
              </h2>
              <p className="text-xl text-cyber-blue/80">
                {t.whatYouGet.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.whatYouGet.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                >
                  <Card glow="purple" className="p-6 h-full">
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-cyber-purple mr-3 flex-shrink-0 mt-1"
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
                      <span className="text-gray-300 text-lg">{item}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
                {t.pricing.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {t.pricing.plans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                >
                  <Card
                    glow={plan.popular ? 'purple' : 'blue'}
                    className={`h-full p-8 relative ${
                      plan.popular ? 'border-2 border-cyber-purple' : ''
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-cyber-purple text-white text-sm font-bold rounded-full whitespace-nowrap">
                        {plan.badge}
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-4 text-cyber-blue">
                        {plan.name}
                      </h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-cyber-purple">
                          {plan.price}
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm mb-4">
                        {plan.priceAlt}
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
                      href="https://calendar.app.google/DjRwd2YNcaTxGN5g8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        glow={plan.popular ? 'purple' : 'blue'}
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 italic">
              {t.pricing.note}
            </p>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-purple">
                {t.howItWorks.title}
              </h2>
              <p className="text-xl text-cyber-blue/80">
                {t.howItWorks.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.howItWorks.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + idx * 0.1 }}
                >
                  <Card glow="blue" className="p-6 text-center">
                    <div className="text-5xl font-bold text-cyber-purple mb-4">
                      {step.number}
                    </div>
                    <p className="text-gray-300 text-lg">{step.text}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-16"
          >
            <Card glow="purple" className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-cyber-purple">
                {t.trust.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.trust.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1 + idx * 0.1 }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 text-cyber-purple mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center"
          >
            <Card glow="blue" className="p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cyber-blue">
                {t.finalCta.title}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://calendar.app.google/DjRwd2YNcaTxGN5g8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" glow="purple">
                    {t.finalCta.button}
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" glow="blue">
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
