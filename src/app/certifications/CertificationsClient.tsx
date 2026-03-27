'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { CertificationPartner } from '@/lib/supabase/types';

interface Props {
  partners: CertificationPartner[]
}

export default function CertificationsClient({ partners }: Props) {
  const { language } = useLanguage();
  const t = content[language].certifications;

  const partnerName = (p: CertificationPartner) => p.name;

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
              <span className="border border-primary/30 px-2 py-1">CERT_REGISTRY</span>
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

          {/* Provider grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 mb-8"
          >
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                variants={fadeInUp}
                className="relative bg-surface-container-low p-12 flex flex-col items-center group hover:bg-surface-container transition-colors duration-500 min-h-[280px]"
              >
                {/* UID */}
                <div className="absolute top-4 right-4">
                  <ScanBadge variant="muted">CERT_{String(idx + 1).padStart(2, '0')}</ScanBadge>
                </div>

                {/* Status dot */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-tertiary-dim animate-pulse" />
                  <span className="font-mono text-[9px] text-tertiary-dim uppercase tracking-widest">ACTIVE</span>
                </div>

                {/* Logo */}
                <div className="relative w-full h-36 mb-6 mt-6">
                  {partner.logo_url ? (
                    <Image
                      src={partner.logo_url}
                      alt={partnerName(partner)}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={partner.logo_url.startsWith('http')}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="font-mono text-[9px] text-outline/40 uppercase">NO_LOGO</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-secondary transition-colors duration-300 text-center">
                  {partnerName(partner)}
                </h3>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom readout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-between font-mono text-[10px] text-outline tracking-widest uppercase"
          >
            <span>CERT_PROVIDERS: {partners.length}</span>
            <span>CREDENTIAL_STATUS: VERIFIED</span>
            <span>REGISTRY: EKX_EDUCATION_NODE</span>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
