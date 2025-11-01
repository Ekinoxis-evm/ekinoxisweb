'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: 'blue' | 'purple';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  glow = 'blue',
  className = '',
  onClick,
  disabled,
  type,
  ...props 
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 transform';
  
  const variants = {
    primary: glow === 'blue' 
      ? 'bg-cyber-blue text-cyber-black border border-cyber-blue hover:bg-cyber-blue-dark hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]'
      : 'bg-cyber-purple text-white border border-cyber-purple hover:bg-cyber-purple-dark hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]',
    secondary: 'bg-cyber-black-light text-cyber-blue border border-cyber-blue/50 hover:border-cyber-blue hover:bg-cyber-blue/10',
    outline: glow === 'blue'
      ? 'bg-transparent text-cyber-blue border border-cyber-blue hover:bg-cyber-blue/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
      : 'bg-transparent text-cyber-purple border border-cyber-purple hover:bg-cyber-purple/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}

