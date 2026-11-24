// Brand values come from @ekinoxis/brand (github.com/Ekinoxis-evm/brand), the one source for every
// Ekinoxis project. The Material-style names below are this site's aliases onto it; values the brand
// doesn't define (inverse/dim shades) were unused Material scaffolding and are gone; a new shade goes
// into the brand's tokens.json first.
const brand = require('@ekinoxis/brand/tailwind');
const b = brand.theme.extend.colors;

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [brand],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Obsidian Architect surface hierarchy ──
        'surface-container-lowest': b['void'],
        'surface-container-low': b['deep-tide'],
        'surface-container': b['tide'],
        'surface-container-high': b['raised-tide'],
        'surface-container-highest': b['high-tide'],
        'background': b['obsidian'],
        'on-background': b['first-light'],
        'on-surface': b['first-light'],
        'on-surface-variant': b['mist'],
        // ── Primary: Electric Cyan ──
        'primary': b['equinox-cyan'],
        'primary-dim': b['equinox-cyan-deep'],
        'on-primary': b['ink-on-cyan'],
        // ── Secondary: Cosmic Blue ── (chart-1…4 come straight from the brand preset)
        'secondary': b['cosmic-blue'],
        // ── Tertiary: Signal Green (Matrix green) ──
        'tertiary-dim': b['signal-green'],
        // ── Outline ──
        'outline': b['slate-label'],
        'outline-variant': b['hairline'],
        // ── Error ──
        'error': b['alert-coral'],
      },
      fontFamily: {
        headline: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        label: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '9999px',
      },
      animation: {
        // ── New Obsidian Architect animations ──
        'hero-core': 'slow-rotate 60s linear infinite',
        'hero-breathe': 'pulse-breathing 8s ease-in-out infinite',
        'hero-glow': 'hero-glow-pulse 8s ease-in-out infinite',
        'hero-glitch': 'glitch-flicker 4s infinite step-end',
        'ambient-pulse': 'ambient-pulse 4s ease-in-out infinite',
        'scan-line': 'scan-line-move 3s linear infinite',
        'terminal-blink': 'terminal-blink 1.2s step-end infinite',
        // ── Legacy (kept for backward compat) ──
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-purple': 'glow-purple 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-text': 'glow-text 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        // ── New Obsidian Architect keyframes ──
        'pulse-breathing': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'hero-glow-pulse': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
        'slow-rotate': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'glitch-flicker': {
          '0%': { opacity: '0.98', transform: 'translate(0,0)' },
          '5%': { opacity: '1', transform: 'translate(1px, -1px)' },
          '10%': { opacity: '0.95', transform: 'translate(-1px, 1px)' },
          '15%': { opacity: '1', transform: 'translate(0,0)' },
          '100%': { opacity: '1', transform: 'translate(0,0)' },
        },
        'ambient-pulse': {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.15' },
        },
        'scan-line-move': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        // ── Legacy keyframes ──
        glow: {
          '0%': { boxShadow: '0 0 5px #8ff5ff, 0 0 10px #8ff5ff, 0 0 15px #8ff5ff' },
          '100%': { boxShadow: '0 0 10px #8ff5ff, 0 0 20px #8ff5ff, 0 0 30px #8ff5ff, 0 0 40px #8ff5ff' },
        },
        'glow-purple': {
          '0%': { boxShadow: '0 0 5px #9492ff, 0 0 10px #9492ff, 0 0 15px #9492ff' },
          '100%': { boxShadow: '0 0 10px #9492ff, 0 0 20px #9492ff, 0 0 30px #9492ff, 0 0 40px #9492ff' },
        },
        'glow-text': {
          '0%': { textShadow: '0 0 10px #8ff5ff, 0 0 20px #8ff5ff, 0 0 30px #8ff5ff' },
          '100%': { textShadow: '0 0 20px #8ff5ff, 0 0 30px #8ff5ff, 0 0 40px #8ff5ff, 0 0 50px #8ff5ff' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'grid-pulse': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
