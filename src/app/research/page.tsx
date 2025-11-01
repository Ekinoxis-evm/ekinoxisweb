'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';

export default function ResearchPage() {
  const { language } = useLanguage();
  const t = content[language].research;

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
              {t.description}
            </p>
            <p className="text-lg text-cyber-purple/80 max-w-2xl mx-auto">
              {t.focus}
            </p>
          </motion.div>

          {/* Research Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Blockchain Innovation', icon: '🔗', description: 'Advancing blockchain technology and protocols' },
              { title: 'AI Research', icon: '🧠', description: 'Exploring the frontiers of artificial intelligence' },
              { title: 'Cryptography', icon: '🔐', description: 'Developing secure cryptographic solutions' },
              { title: 'WEB3 Integration', icon: '🌐', description: 'Building the next generation of web technologies' },
            ].map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card glow={idx % 2 === 0 ? 'blue' : 'purple'} className="h-full p-8">
                  <div className="text-6xl mb-4">{area.icon}</div>
                  <h2 className="text-2xl font-bold mb-4 text-cyber-blue">
                    {area.title}
                  </h2>
                  <p className="text-gray-400">{area.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

