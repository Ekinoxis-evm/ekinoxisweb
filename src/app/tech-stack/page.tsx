'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';

export default function TechStackPage() {
  const { language } = useLanguage();
  const t = content[language].technologies;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Object.entries(t.categories);

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

          {/* Technology Categories */}
          <div className="space-y-16">
            {categories.map(([key, category], categoryIdx) => {
              const allLogos = [
                ...('logos' in category ? category.logos : []),
                ...('tools' in category ? category.tools : []),
              ];

              const isExpanded = selectedCategory === key || selectedCategory === null;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIdx * 0.1 }}
                >
                  <Card
                    glow={categoryIdx % 2 === 0 ? 'blue' : 'purple'}
                    className="p-8 cursor-pointer"
                    onClick={() => setSelectedCategory(isExpanded && selectedCategory === key ? null : key)}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-cyber-blue">
                        {category.name}
                      </h2>
                      <button className="text-cyber-blue text-2xl">
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>
                    
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6"
                      >
                        {allLogos.map((logo, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-cyber-black-light p-4 rounded-lg border border-cyber-blue/10 hover:border-glow transition-all"
                          >
                            <div className="relative w-full aspect-square">
                              <Image
                                src={logo}
                                alt="Tech logo"
                                fill
                                className="object-contain grayscale hover:grayscale-0 transition-all"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

