/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Obsidian Architect surface hierarchy ──
        'surface-container-lowest': '#000000',
        'surface': '#060f16',
        'surface-container-low': '#09151c',
        'surface-container': '#0f1b23',
        'surface-container-high': '#14212a',
        'surface-container-highest': '#192731',
        'surface-variant': '#192731',
        'surface-bright': '#1e2e38',
        'surface-dim': '#060f16',
        'background': '#060f16',
        'on-background': '#e8f2fb',
        'on-surface': '#e8f2fb',
        'on-surface-variant': '#a2acb5',
        // ── Primary: Electric Cyan ──
        'primary': '#8ff5ff',
        'primary-fixed': '#00eefc',
        'primary-dim': '#00deec',
        'primary-container': '#00eefc',
        'on-primary': '#005d63',
        'on-primary-container': '#005359',
        'on-primary-fixed': '#003f43',
        'on-primary-fixed-variant': '#005e64',
        'inverse-primary': '#006a71',
        'surface-tint': '#8ff5ff',
        // ── Secondary: Cosmic Blue ──
        'secondary': '#9492ff',
        'secondary-dim': '#625dff',
        'secondary-container': '#3106ff',
        'secondary-fixed': '#cfcdff',
        'secondary-fixed-dim': '#bfbdff',
        'on-secondary': '#100077',
        'on-secondary-container': '#dedcff',
        'on-secondary-fixed': '#1e00b1',
        'on-secondary-fixed-variant': '#320aff',
        // ── Tertiary: Neon Lime ──
        'tertiary': '#f3ffca',
        'tertiary-dim': '#beee00',
        'tertiary-fixed': '#cafd00',
        'tertiary-fixed-dim': '#beee00',
        'tertiary-container': '#cafd00',
        'on-tertiary': '#516700',
        'on-tertiary-container': '#4a5e00',
        'on-tertiary-fixed': '#3a4a00',
        'on-tertiary-fixed-variant': '#526900',
        // ── Outline ──
        'outline': '#6c777f',
        'outline-variant': '#3f4951',
        // ── Error ──
        'error': '#ff716c',
        'error-dim': '#d7383b',
        'error-container': '#9f0519',
        'on-error': '#490006',
        'on-error-container': '#ffa8a3',
        // ── Inverse ──
        'inverse-surface': '#f5faff',
        'inverse-on-surface': '#4c565e',
        // ── Backward-compat aliases (remove after full migration) ──
        cyber: {
          blue: '#8ff5ff',
          'blue-dark': '#00deec',
          'blue-light': '#8ff5ff',
          'blue-dim': 'rgba(143, 245, 255, 0.1)',
          purple: '#9492ff',
          'purple-dark': '#625dff',
          'purple-light': '#9492ff',
          'purple-dim': 'rgba(148, 146, 255, 0.1)',
          black: '#000000',
          'black-light': '#060f16',
          'black-dark': '#000000',
          'black-card': 'rgba(0, 0, 0, 0.7)',
        },
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
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #8ff5ff 0%, #9492ff 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000000 0%, #060f16 100%)',
        'gradient-surface': 'linear-gradient(180deg, #060f16 0%, #000000 100%)',
      },
      animation: {
        // ── New Obsidian Architect animations ──
        'hero-core': 'pulse-breathing 8s ease-in-out infinite, slow-rotate 60s linear infinite',
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
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 50px rgba(0,240,255,0.3))' },
          '50%': { transform: 'scale(1.05)', filter: 'drop-shadow(0 0 70px rgba(0,240,255,0.6))' },
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
