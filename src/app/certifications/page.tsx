'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';

export default function CertificationsPage() {
  const { language } = useLanguage();
  const t = content[language].certifications;

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow-purple">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-cyber-purple/80 max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Certification Partners */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.partners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <Card glow="purple" className="h-full p-8">
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center text-cyber-purple">
                    {partner.name}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

