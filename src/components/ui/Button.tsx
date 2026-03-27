'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'ghost' | 'tertiary' | 'outline' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  /** @deprecated use variant instead */
  glow?: 'blue' | 'purple';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary font-headline font-bold uppercase tracking-widest ' +
    'hover:bg-primary-dim hover:shadow-[0_0_30px_rgba(143,245,255,0.4)] active:scale-95',
  ghost:
    'bg-transparent border border-primary/20 text-primary font-headline font-bold uppercase tracking-widest ' +
    'hover:bg-primary hover:text-surface-container-lowest hover:border-primary active:scale-95',
  secondary:
    'bg-transparent border border-secondary/20 text-secondary font-headline font-bold uppercase tracking-widest ' +
    'hover:bg-secondary hover:text-surface-container-lowest active:scale-95',
  tertiary:
    'bg-transparent border border-tertiary-dim/20 text-tertiary-dim font-headline font-bold uppercase tracking-widest ' +
    'hover:bg-tertiary-dim hover:text-surface-container-lowest active:scale-95',
  outline:
    'bg-transparent border border-outline/30 text-on-surface-variant font-headline font-bold uppercase tracking-widest ' +
    'hover:border-primary hover:text-primary active:scale-95',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-xs',
  md: 'py-3 px-6 text-sm',
  lg: 'py-4 px-8 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled,
  type,
  glow: _glow,
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center gap-2 transition-all duration-200
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-40 pointer-events-none' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}
