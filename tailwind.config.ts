import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        brand: {
          50: '#f6f8f6',
          500: '#517a64',
          700: '#3c5d4a',
          900: '#1f3328',
        },
      },
    },
  },
  plugins: [],
};

export default config;
