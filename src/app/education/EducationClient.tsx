'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { EducationPartner } from '@/lib/supabase/types';

interface Props {
  universities: EducationPartner[]
  government: EducationPartner[]
}

export default function EducationClient({ universities, government }: Props) {
  const { language } = useLanguage();
  const t = content[language].education;

  const partnerName = (p: EducationPartner) => p.name;

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">EKX_ROOT</span>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">EDUCATION_NODE</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>

          {/* DECENTRALIZING KNOWLEDGE banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-primary px-10 py-6 mb-px flex items-center justify-between overflow-hidden"
          >
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-primary uppercase">
              {language === 'en' ? 'Decentralizing Knowledge' : 'Descentralizando el Conocimiento'}
            </h2>
            <ScanBadge className="bg-on-primary/10 border-on-primary/20 text-on-primary" bordered>
              {language === 'en' ? 'LATAM_NETWORK' : 'RED_LATAM'}
            </ScanBadge>
          </motion.div>

          {/* Universities Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-px"
          >
            <div className="bg-surface-container-low border-b border-primary/10 px-10 py-5 flex items-center gap-4">
              <ScanBadge variant="primary">UNIVERSITY_PARTNERS</ScanBadge>
              <h2 className="font-headline text-xl font-bold tracking-tighter text-on-surface">
                {t.universities.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10">
              {universities.map((partner, idx) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                  className="relative bg-surface-container-low p-10 flex flex-col items-center justify-center group hover:bg-surface-container transition-colors duration-500 min-h-[180px]"
                >
                  <div className="absolute top-3 right-3">
                    <ScanBadge variant="muted">UNI_{String(idx + 1).padStart(2, '0')}</ScanBadge>
                  </div>
                  <div className="relative w-full h-24 mb-4">
                    {partner.logo_url ? (
                      <Image
                        src={partner.logo_url}
                        alt={partnerName(partner)}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized={partner.logo_url.startsWith('http')}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="font-mono text-[9px] text-outline/40 uppercase">NO_LOGO</span>
                      </div>
                    )}
                  </div>
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest text-center">
                    {partnerName(partner)}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Government Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-surface-container-low border-b border-primary/10 px-10 py-5 flex items-center gap-4">
              <ScanBadge variant="secondary">GOV_PARTNERS</ScanBadge>
              <h2 className="font-headline text-xl font-bold tracking-tighter text-on-surface">
                {t.gov.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10">
              {government.map((partner, idx) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                  className="relative bg-surface-container-low p-10 flex flex-col items-center justify-center group hover:bg-surface-container transition-colors duration-500 min-h-[180px]"
                >
                  <div className="absolute top-3 right-3">
                    <ScanBadge variant="muted">GOV_{String(idx + 1).padStart(2, '0')}</ScanBadge>
                  </div>
                  <div className="relative w-full h-28 mb-4">
                    {partner.logo_url ? (
                      <Image
                        src={partner.logo_url}
                        alt={partnerName(partner)}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized={partner.logo_url.startsWith('http')}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="font-mono text-[9px] text-outline/40 uppercase">NO_LOGO</span>
                      </div>
                    )}
                  </div>
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest text-center">
                    {partnerName(partner)}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 flex items-center justify-between font-mono text-[10px] text-outline tracking-widest uppercase"
          >
            <span>UNI_PARTNERS: {universities.length}</span>
            <span>GOV_PARTNERS: {government.length}</span>
            <span>REGION: LATAM // PACIFIC_COAST</span>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
