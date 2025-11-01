'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';

export default function ProductsPage() {
  const { language } = useLanguage();
  const t = content[language].products;

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-cyber-blue/80 max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Product Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(t.categories).map(([key, category], idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                style={{ perspective: '1000px' }}
              >
                <Card glow={idx % 2 === 0 ? 'blue' : 'purple'} className="h-full p-8 transform hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-cyber flex items-center justify-center">
                      <span className="text-4xl">
                        {key === 'blockchain' && '⛓️'}
                        {key === 'crypto' && '₿'}
                        {key === 'ai' && '🤖'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-cyber-blue">
                      {category}
                    </h2>
                    <p className="text-gray-400">
                      Innovative solutions leveraging cutting-edge technologies
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

