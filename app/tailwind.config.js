/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef3ff',
          100: '#fde8ff',
          200: '#fbd0fe',
          300: '#f8a8fc',
          400: '#f271f5',
          500: '#e644e8',
          600: '#c921cc',
          700: '#a81aa9',
          800: '#891888',
          900: '#70186e',
        },
        sunshine: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
        },
        ocean: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        mint: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
        },
        coral: {
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
        },
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'star-spin': 'starSpin 1s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(230, 68, 232, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(230, 68, 232, 0.7)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        starSpin: {
          '0%': { transform: 'rotate(0deg) scale(0)', opacity: '0' },
          '50%': { transform: 'rotate(180deg) scale(1.3)' },
          '100%': { transform: 'rotate(360deg) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
