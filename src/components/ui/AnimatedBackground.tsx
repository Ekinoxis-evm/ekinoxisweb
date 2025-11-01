'use client';

import { ReactNode } from 'react';

interface AnimatedBackgroundProps {
  children: ReactNode;
  variant?: 'grid' | 'particles' | 'gradient';
}

export default function AnimatedBackground({ 
  children, 
  variant = 'grid' 
}: AnimatedBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Grid Background */}
      {variant === 'grid' && (
        <div className="fixed inset-0 cyber-grid opacity-30 -z-10" />
      )}
      
      {/* Gradient Overlay */}
      {variant === 'gradient' && (
        <div className="fixed inset-0 bg-gradient-to-b from-cyber-black via-cyber-black-light to-cyber-black -z-10" />
      )}
      
      {/* Particle Effect Overlay */}
      {variant === 'particles' && (
        <>
          <div className="fixed inset-0 cyber-grid opacity-20 -z-10" />
          <div className="fixed inset-0 bg-gradient-to-b from-cyber-black via-transparent to-cyber-black -z-10" />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

