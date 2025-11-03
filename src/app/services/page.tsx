'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = content[language].services;

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
            <p className="text-xl md:text-2xl text-cyber-blue/80 max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {t.offerings.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <Card glow={idx % 2 === 0 ? 'blue' : 'purple'} className="h-full p-8">
                  <div className="text-5xl mb-6">
                    {idx === 0 ? '💡' : '⚡'}
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-cyber-blue">
                    {service.title}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

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
              <p className="text-xl text-cyber-purple/80 max-w-2xl mx-auto">
                {t.pricing.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.pricing.plans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
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
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Card glow="purple" className="p-12">
              <h2 className="text-4xl font-bold mb-4 text-cyber-purple">
                {language === 'en' ? 'Ready to Get Started?' : '¿Listo para Comenzar?'}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {language === 'en'
                  ? 'Contact us to discuss how we can help your organization leverage cutting-edge technologies.'
                  : 'Contáctanos para discutir cómo podemos ayudar a tu organización a aprovechar tecnologías de vanguardia.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={t.calendarLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" glow="blue">
                    {language === 'en' ? 'Schedule Consultation' : 'Agendar Consulta'}
                  </Button>
                </a>
                <a href="mailto:ekinoxis.evm@gmail.com">
                  <Button variant="outline" glow="purple">
                    {language === 'en' ? 'Contact Us' : 'Contáctanos'}
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
