'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';

const SERVICES = {
  en: [
    { id: 'consultation', title: 'Consultation', tagline: 'Blockchain, crypto & AI guidance. From $25.', href: '/services/consultation', icon: '💡' },
    { id: 'web', title: 'Web Development', tagline: 'Online business in 5 days. From $300.', href: '/services/web-development', icon: '🌐' },
    { id: 'app', title: 'App Building', tagline: 'Custom apps with blockchain & AI.', href: '/services/app-building', icon: '📱' },
  ],
  es: [
    { id: 'consultation', title: 'Consultoría', tagline: 'Orientación en blockchain, cripto e IA. Desde $25.', href: '/services/consultation', icon: '💡' },
    { id: 'web', title: 'Desarrollo Web', tagline: 'Negocio online en 5 días. Desde $300.', href: '/services/web-development', icon: '🌐' },
    { id: 'app', title: 'Desarrollo de Apps', tagline: 'Apps a medida con blockchain e IA.', href: '/services/app-building', icon: '📱' },
  ],
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = content[language].services;
  const services = SERVICES[language];

  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl mx-auto w-full">
          {/* Minimal header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-glow">
              {t.title}
            </h1>
            <p className="text-lg text-cyber-blue/80">
              {language === 'en' ? 'Pick a path. We’ll take it from there.' : 'Elige una opción. Nosotros seguimos.'}
            </p>
          </motion.div>

          {/* Compact service list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4 mb-12"
          >
            {services.map((service, idx) => (
              <Link
                key={service.id}
                href={service.href}
                className="block group"
              >
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + idx * 0.08 }}
                  className="flex items-center gap-4 p-5 rounded-xl border border-cyber-blue/20 bg-black/40 hover:border-cyber-blue/50 hover:bg-cyber-blue/5 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{service.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-white group-hover:text-cyber-blue transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {service.tagline}
                    </p>
                  </div>
                  <span className="text-cyber-blue text-sm font-medium flex-shrink-0">
                    {language === 'en' ? 'Learn more →' : 'Saber más →'}
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Single primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-center"
          >
            <p className="text-sm text-gray-400 mb-4">
              {language === 'en' ? 'Not sure? Talk to us first.' : '¿Dudas? Habla con nosotros.'}
            </p>
            <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="primary" glow="blue" className="w-full sm:w-auto min-w-[200px]">
                {language === 'en' ? 'Contact Us' : 'Contáctanos'}
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
