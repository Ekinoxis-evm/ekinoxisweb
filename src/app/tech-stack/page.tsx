'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { fadeInUp } from '@/lib/animations';

export default function TechStackPage() {
  const { language } = useLanguage();
  const t = content[language].technologies;
  const [selectedCategory, setSelectedCategory] = useState<string>(() => Object.keys(t.categories)[0]);
  const categories = Object.entries(t.categories);

  const currentCat = t.categories[selectedCategory as keyof typeof t.categories] as any;
  const allLogos = [
    ...('logos' in currentCat ? currentCat.logos : []),
    ...('tools' in currentCat ? currentCat.tools : []),
  ];

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen flex flex-col">

        {/* Top OS bar */}
        <div className="border-b border-primary/10 px-6 py-3 flex items-center justify-between font-mono text-[10px] text-outline uppercase tracking-widest bg-surface-container-lowest">
          <div className="flex items-center gap-6">
            <span className="text-primary">EKX_OS v2.4</span>
            <span>MODULE: TECH_REGISTRY</span>
            <span>USER: ROOT</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>{t.title}</span>
            <span className="text-primary">ACTIVE_SYNC: TRUE</span>
          </div>
        </div>

        <div className="flex-1 flex">

          {/* Sidebar — category list */}
          <aside className="w-56 border-r border-primary/10 bg-surface-container-lowest flex-shrink-0 flex flex-col">
            <div className="p-4 border-b border-primary/10">
              <p className="font-mono text-[10px] text-outline uppercase tracking-widest">CATEGORIES</p>
            </div>
            <nav className="flex-1 overflow-y-auto">
              {categories.map(([key, cat], idx) => {
                const isActive = selectedCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors duration-200 border-b border-primary/5 ${
                      isActive
                        ? 'bg-primary/10 text-primary border-l-4 border-l-primary'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-primary border-l-4 border-l-transparent'
                    }`}
                  >
                    <span className="font-mono text-[9px] text-outline w-4 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider truncate">
                      {(cat as any).name}
                    </span>
                    {isActive && <span className="ml-auto font-mono text-[8px] text-primary">●</span>}
                  </button>
                );
              })}
            </nav>
            {/* Status */}
            <div className="p-4 border-t border-primary/10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-tertiary-dim animate-pulse flex-shrink-0" />
                <span className="font-mono text-[9px] text-tertiary-dim uppercase tracking-widest">ALL_SYSTEMS_OK</span>
              </div>
            </div>
          </aside>

          {/* Main panel */}
          <main className="flex-1 overflow-hidden">

            {/* Category header */}
            <div className="border-b border-primary/10 px-8 py-5 flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-4">
                <h1 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
                  {currentCat.name}
                </h1>
                <ScanBadge variant="primary">ACTIVE_SYNC</ScanBadge>
              </div>
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">
                NODES: {allLogos.length}
              </span>
            </div>

            {/* Logo Grid */}
            <div className="p-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-px bg-primary/10"
                >
                  {allLogos.map((logo: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="bg-surface-container-lowest p-4 aspect-square flex items-center justify-center group hover:bg-surface-container transition-colors duration-300"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={logo}
                          alt="Tech logo"
                          fill
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                          sizes="80px"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>

        {/* Bottom status bar */}
        <div className="border-t border-primary/10 px-6 py-2 flex items-center justify-between font-mono text-[9px] text-outline uppercase tracking-widest bg-surface-container-lowest">
          <span>{language === 'en' ? 'STACK' : 'STACK'}: {currentCat.name}</span>
          <span className="hidden md:block">{t.description}</span>
          <span className="text-primary">UPLINK: SECURE</span>
        </div>

      </div>
    </AnimatedBackground>
  );
}
