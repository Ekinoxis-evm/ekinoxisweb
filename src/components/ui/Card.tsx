'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  uid?: string;
  hover?: boolean;
  onClick?: () => void;
  /** @deprecated — new design uses surface tone shifts, not glow variants */
  glow?: 'blue' | 'purple' | 'none';
}

export default function Card({
  children,
  className = '',
  uid,
  hover = true,
  onClick,
}: CardProps) {
  const base =
    'relative bg-surface-container-low border border-outline-variant/[0.15] p-6 transition-all duration-500';

  const hoverClasses = hover
    ? 'hover:bg-surface-container hover:border-primary/10 cursor-pointer'
    : '';

  const content = (
    <>
      {uid && (
        <span className="absolute top-0 right-0 p-2 font-mono text-[8px] text-outline bg-surface-container-high tracking-widest uppercase">
          {uid}
        </span>
      )}
      {children}
    </>
  );

  if (!hover) {
    return (
      <div
        onClick={onClick}
        className={`${base} ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`${base} ${hoverClasses} ${className}`}
    >
      {content}
    </motion.div>
  );
}
