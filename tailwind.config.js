/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4F3EF',
          soft: '#EDEBE3',
        },
        ink: {
          DEFAULT: '#151C2E',
          navy: '#1C243E',
          muted: '#687080',
        },
        void: {
          DEFAULT: '#12151F',
          surface: '#1A1F2E',
          soft: '#242A3B',
        },
        cream: '#F1EDEA',
        accent: {
          orange: '#E2661F',
          'orange-bright': '#FE7E37',
          teal: '#1F9C93',
          'teal-bright': '#5EE0DB',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '10px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sway: 'sway 8s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
}
