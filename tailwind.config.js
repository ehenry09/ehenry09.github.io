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
        'cyber': {
          black: '#0D0D0D',
          darker: '#1A1A1A',
          dark: '#262626',
          neon: {
            pink: '#FF2E63',
            blue: '#00FFF5',
            purple: '#BD00FF',
            yellow: '#FFD600',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3',
            accent: '#FF2E63',
          }
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 1.5s infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #FF2E63, 0 0 80px #FF2E63' },
          '100%': { textShadow: '0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #FF2E63, 0 0 73px #FF2E63' }
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #00FFF5, 0 0 80px #00FFF5' },
          '20%, 24%, 55%': { textShadow: 'none' }
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(0deg, transparent 24%, rgba(255, 46, 99, .03) 25%, rgba(255, 46, 99, .03) 26%, transparent 27%, transparent 74%, rgba(255, 46, 99, .03) 75%, rgba(255, 46, 99, .03) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 46, 99, .03) 25%, rgba(255, 46, 99, .03) 26%, transparent 27%, transparent 74%, rgba(255, 46, 99, .03) 75%, rgba(255, 46, 99, .03) 76%, transparent 77%, transparent)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#FFFFFF',
            a: {
              color: '#00FFF5',
              '&:hover': {
                color: '#FF2E63',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 