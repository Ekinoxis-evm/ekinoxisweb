'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Weighted, gliding scroll on wheel and trackpad (touch stays native). In-page
 * links glide too, stopping clear of the fixed 64px nav. Off entirely when the
 * visitor asks for reduced motion. Add `data-lenis-prevent` to any element that
 * must scroll on its own (a modal, a long dropdown).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -80 },
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
