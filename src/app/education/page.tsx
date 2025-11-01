'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';

export default function EducationPage() {
  const { language } = useLanguage();
  const t = content[language].education;

  return (
    <AnimatedBackground variant="grid">
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">{t.title}</h1>
            <p className="text-xl md:text-2xl text-cyber-blue/80 max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Universities Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold mb-12 text-center text-cyber-blue">
              {t.universities.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.universities.partners.map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card glow="blue" className="h-full flex items-center justify-center p-8">
                    <div className="relative w-full h-32">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4">{partner.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Government Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center text-cyber-purple">
              {t.gov.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.gov.partners.map((partner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card glow="purple" className="h-full flex items-center justify-center p-8">
                    <div className="relative w-full h-32">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4">{partner.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

