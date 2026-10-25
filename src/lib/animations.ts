import { Variants } from 'framer-motion';

/**
 * The one motion curve on the site — fast out, long soft landing. Everything
 * "settles into the light": reveals, banners, the hero video. Mirrored in CSS
 * as --ease-settle (globals.css) so Framer and keyframe motion feel the same.
 */
export const EASE_SETTLE = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_SETTLE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_SETTLE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const terminalReveal: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_SETTLE } },
};

export const pressIn = {
  whileTap: { scale: 0.95 },
};

export const cardHover = {
  whileHover: { backgroundColor: 'rgba(15, 27, 35, 1)' },
  transition: { duration: 0.3 },
};
