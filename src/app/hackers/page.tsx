'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Card from '@/components/ui/Card';

export default function HackersPage() {
  const { language } = useLanguage();
  const t = content[language].hackers;

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

          {/* Hackers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {t.members.map((hacker, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card glow="purple" className="p-4 overflow-hidden group">
                  <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={hacker.image}
                      alt={hacker.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-center text-cyber-purple font-bold group-hover:text-glow-purple transition-all">
                    {hacker.name}
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

