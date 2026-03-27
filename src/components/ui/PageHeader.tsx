'use client';

import { motion } from 'framer-motion';
import ScanBadge from './ScanBadge';

interface PageHeaderProps {
  breadcrumb?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  description?: string;
  metadata?: { label: string; value: string }[];
}

export default function PageHeader({
  breadcrumb,
  title,
  titleAccent,
  subtitle,
  description,
  metadata,
}: PageHeaderProps) {
  return (
    <div className="relative mb-16">
      {/* Breadcrumb */}
      {breadcrumb && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <ScanBadge variant="outline">{breadcrumb}</ScanBadge>
        </motion.div>
      )}

      <div className="flex items-start justify-between gap-8">
        <div className="flex-1">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface mb-6"
          >
            {title}
            {titleAccent && (
              <span className="text-primary text-glow italic"> {titleAccent}</span>
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-headline text-xl text-secondary mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-on-surface-variant text-lg font-light leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Right metadata readout */}
        {metadata && metadata.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex flex-col gap-2 font-mono text-[10px] text-outline tracking-widest uppercase text-right"
          >
            {metadata.map((m) => (
              <div key={m.label}>
                <span className="text-outline/60">{m.label}: </span>
                <span className="text-primary">{m.value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
