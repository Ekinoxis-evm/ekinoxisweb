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
        cyber: {
          blue: '#00F0FF',
          'blue-dark': '#00D4E6',
          'blue-light': '#33F5FF',
          'blue-dim': 'rgba(0, 240, 255, 0.1)',
          purple: '#8B5CF6',
          'purple-dark': '#7C3AED',
          'purple-light': '#A78BFA',
          'purple-dim': 'rgba(139, 92, 246, 0.1)',
          black: '#000000',
          'black-light': '#0A0A0A',
          'black-dark': '#050505',
          'black-card': 'rgba(0, 0, 0, 0.7)',
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-purple': 'glow-purple 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-text': 'glow-text 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00F0FF, 0 0 10px #00F0FF, 0 0 15px #00F0FF' },
          '100%': { boxShadow: '0 0 10px #00F0FF, 0 0 20px #00F0FF, 0 0 30px #00F0FF, 0 0 40px #00F0FF' },
        },
        'glow-purple': {
          '0%': { boxShadow: '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 15px #8B5CF6' },
          '100%': { boxShadow: '0 0 10px #8B5CF6, 0 0 20px #8B5CF6, 0 0 30px #8B5CF6, 0 0 40px #8B5CF6' },
        },
        'glow-text': {
          '0%': { textShadow: '0 0 10px #00F0FF, 0 0 20px #00F0FF, 0 0 30px #00F0FF' },
          '100%': { textShadow: '0 0 20px #00F0FF, 0 0 30px #00F0FF, 0 0 40px #00F0FF, 0 0 50px #00F0FF' },
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

