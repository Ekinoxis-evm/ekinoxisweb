'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function HackerHousePage() {
  const { language } = useLanguage();
  const t = content[language].hackerHouse;

  return (
    <AnimatedBackground variant="particles">
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
            <p className="text-xl md:text-2xl text-cyber-blue/80 max-w-3xl mx-auto mb-8">
              {t.description}
            </p>
            <Button variant="primary" glow="purple">
              {t.cta}
            </Button>
          </motion.div>

          {/* Hackathons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-12 text-center text-cyber-purple">
              {t.hackathons.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.hackathons.items.map((hackathon, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card glow="purple" className="h-full p-8 flex flex-col items-center justify-center">
                    <div className="relative w-full h-32 mb-4">
                      <Image
                        src={hackathon.logo}
                        alt={hackathon.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-cyber-purple">
                      {hackathon.name}
                    </h3>
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

