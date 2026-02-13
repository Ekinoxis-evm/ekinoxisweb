'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ConsultationPage() {
  const { language } = useLanguage();

  const consultationContent = {
    en: {
      title: "Consultation Services",
      subtitle: "Expert guidance for your blockchain, crypto, and AI journey",
      headline: "Transform your business with strategic technology consulting",
      description: "Get expert advice on implementing cutting-edge technologies. Our consultation services help you navigate the complexities of blockchain, cryptocurrency, and artificial intelligence.",
      valueDelivered: {
        title: "Value Delivered",
        items: [
          "3 Hours of consultancy",
          "Private and Flexible Schedule",
          "Charge based on attendees",
          "1 Hour Preliminary Diagnosis Free",
          "Flexible execution: 3 sessions of 1 hour or 1 session of 3 Hours",
          "Material to review: Video + textual documentation"
        ]
      },
      pricing: {
        title: "Transparent Pricing",
        subtitle: "Choose the package that fits your team size",
        plans: [
          { people: "1", price: "$25.00" },
          { people: "2", price: "$50.00" },
          { people: "4", price: "$90.00" },
          { people: "8", price: "$180.00" },
          { people: "16", price: "$350.00" },
          { people: "32", price: "$600.00" },
          { people: "More than 32", price: "$1,000.00" }
        ]
      },
      cta: {
        primary: "Schedule Consultation",
        secondary: "Back to Services"
      }
    },
    es: {
      title: "Servicios de Consultoría",
      subtitle: "Orientación experta para tu viaje en blockchain, cripto e IA",
      headline: "Transforma tu negocio con consultoría tecnológica estratégica",
      description: "Obtén asesoramiento experto en la implementación de tecnologías de vanguardia. Nuestros servicios de consultoría te ayudan a navegar las complejidades de blockchain, criptomonedas e inteligencia artificial.",
      valueDelivered: {
        title: "Valor Entregado",
        items: [
          "3 Horas de consultoría",
          "Horario Privado y Flexible",
          "Cobro basado en asistentes",
          "1 Hora de Diagnóstico Preliminar Gratis",
          "Ejecución flexible: 3 sesiones de 1 hora o 1 sesión de 3 Horas",
          "Material para revisar: Video + documentación textual"
        ]
      },
      pricing: {
        title: "Precios Transparentes",
        subtitle: "Elige el paquete que se ajuste al tamaño de tu equipo",
        plans: [
          { people: "1", price: "$25.00" },
          { people: "2", price: "$50.00" },
          { people: "4", price: "$90.00" },
          { people: "8", price: "$180.00" },
          { people: "16", price: "$350.00" },
          { people: "32", price: "$600.00" },
          { people: "Más de 32", price: "$1,000.00" }
        ]
      },
      cta: {
        primary: "Agendar Consulta",
        secondary: "Volver a Servicios"
      }
    }
  };

  const t = consultationContent[language];

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
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-cyber-blue/80 max-w-3xl mx-auto mb-4">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Value Delivered Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card glow="purple" className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyber-purple">
                {t.valueDelivered.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.valueDelivered.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    className="flex items-start"
                  >
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
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-purple">
                {t.pricing.title}
              </h2>
              <p className="text-xl text-cyber-blue/80">
                {t.pricing.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {t.pricing.plans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                >
                  <Card
                    glow={idx === 3 ? 'purple' : 'blue'}
                    className={`h-full p-6 text-center ${
                      idx === 3 ? 'border-2 border-cyber-purple' : ''
                    }`}
                  >
                    {idx === 3 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-cyber-purple text-white text-sm font-bold rounded-full">
                        {language === 'en' ? 'POPULAR' : 'POPULAR'}
                      </div>
                    )}
                    <div className="text-5xl mb-4">👥</div>
                    <h3 className="text-2xl font-bold mb-2 text-cyber-blue">
                      {plan.people}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {language === 'en' ? 'People' : 'Personas'}
                    </p>
                    <div className="text-4xl font-bold text-cyber-purple mb-6">
                      {plan.price}
                    </div>
                    <a
                      href="https://calendar.app.google/DjRwd2YNcaTxGN5g8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant={idx === 3 ? 'primary' : 'outline'}
                        glow={idx === 3 ? 'purple' : 'blue'}
                        className="w-full"
                      >
                        {language === 'en' ? 'Book Now' : 'Reservar'}
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
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Card glow="blue" className="p-12">
              <h2 className="text-4xl font-bold mb-4 text-cyber-blue">
                {language === 'en' ? 'Ready to Get Started?' : '¿Listo para Comenzar?'}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {language === 'en'
                  ? 'Schedule your free preliminary diagnosis and discover how we can help your organization.'
                  : 'Agenda tu diagnóstico preliminar gratuito y descubre cómo podemos ayudar a tu organización.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://calendar.app.google/DjRwd2YNcaTxGN5g8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" glow="purple">
                    {t.cta.primary}
                  </Button>
                </a>
                <Link href="/services">
                  <Button variant="outline" glow="blue">
                    {t.cta.secondary}
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
