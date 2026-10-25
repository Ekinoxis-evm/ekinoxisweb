'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

type BackgroundVariant = 'grid' | 'ambient' | 'gradient' | 'terminal' | 'particles';

interface AnimatedBackgroundProps {
  children: ReactNode;
  variant?: BackgroundVariant;
  /**
   * A full-bleed equinox banner behind the page header: dark on the left where
   * the headline sits, light on the right. It settles in and fades into the page.
   */
  banner?: string;
}

export default function AnimatedBackground({
  children,
  variant = 'ambient',
  banner,
}: AnimatedBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {banner && (
        <div className="absolute inset-x-0 top-0 h-[70vh] min-h-[520px] max-h-[860px] overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 animate-banner-settle">
            <Image src={banner} alt="" fill priority sizes="100vw" className="object-cover object-[70%_50%]" />
          </div>
          {/* Keep the headline side dark and the bottom melting into the page */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/0 md:via-black/40" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
      )}

      {/* Terminal dot-grid */}
      {variant === 'terminal' && (
        <div className="fixed inset-0 terminal-grid opacity-100 -z-10" />
      )}

      {/* Subtle cyber grid (legacy pages) */}
      {variant === 'grid' && (
        <div className="fixed inset-0 cyber-grid opacity-20 -z-10" />
      )}

      {/* Ambient glow blobs — primary treatment for new design */}
      {(variant === 'ambient' || variant === 'particles') && (
        <>
          <div
            className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10 pointer-events-none animate-[ambient-pulse_4s_ease-in-out_infinite]"
            style={{ borderRadius: '50%' }}
          />
          <div
            className="fixed bottom-1/4 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] -z-10 pointer-events-none animate-[ambient-pulse_6s_ease-in-out_infinite_1s]"
            style={{ borderRadius: '50%' }}
          />
          <div
            className="fixed top-3/4 right-1/3 w-[300px] h-[300px] bg-tertiary-dim/3 blur-[100px] -z-10 pointer-events-none animate-[ambient-pulse_8s_ease-in-out_infinite_2s]"
            style={{ borderRadius: '50%' }}
          />
        </>
      )}

      {/* Gradient overlay */}
      {variant === 'gradient' && (
        <div className="fixed inset-0 bg-gradient-to-b from-surface-container-lowest via-background to-surface-container-lowest -z-10" />
      )}

      {/* Fade to black at the bottom of every variant */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent -z-10 pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
