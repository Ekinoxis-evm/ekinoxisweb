'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';

export default function CulturePage() {
  const { language } = useLanguage();
  const t = content[language].culture;

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow-purple">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-cyber-purple/80 max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <Card glow="purple" className="h-full p-8">
                  <h2 className="text-3xl font-bold mb-4 text-cyber-purple text-glow-purple">
                    {value.title}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

