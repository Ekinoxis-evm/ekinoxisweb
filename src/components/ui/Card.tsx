'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: 'blue' | 'purple' | 'none';
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = '',
  glow = 'blue',
  hover = true 
}: CardProps) {
  const glowClasses = {
    blue: 'border-cyber-blue/30 hover:border-glow bg-cyber-black-card backdrop-blur-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]',
    purple: 'border-cyber-purple/30 hover:border-glow-purple bg-cyber-black-card backdrop-blur-sm hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
    none: 'border-cyber-blue/20 bg-cyber-black-card backdrop-blur-sm',
  };

  const baseClasses = 'rounded-xl p-6 border transition-all duration-300';

  if (!hover) {
    return (
      <div className={`${baseClasses} ${glowClasses[glow]} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`${baseClasses} ${glowClasses[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

