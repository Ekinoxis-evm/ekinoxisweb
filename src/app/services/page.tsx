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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                  <Button variant="outline" glow={idx % 2 === 0 ? 'blue' : 'purple'}>
                    Learn More
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Card glow="purple" className="p-12">
              <h2 className="text-4xl font-bold mb-4 text-cyber-purple">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Contact us to discuss how we can help your organization leverage cutting-edge technologies.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" glow="blue">
                  Contact Us
                </Button>
                <Button variant="outline" glow="purple">
                  Schedule Consultation
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

