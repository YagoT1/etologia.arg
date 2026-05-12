import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      screens: { '2xl': '1200px' },
      padding: { DEFAULT: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem', xl: '3rem' },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        h1: ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '600' }],
        h2: ['clamp(1.65rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        h3: ['clamp(1.35rem, 2.2vw, 1.85rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        h4: ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.005em', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.65', letterSpacing: '-0.003em', fontWeight: '400' }],
        small: ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.002em', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.45', letterSpacing: '0.01em', fontWeight: '400' }],
        label: ['0.8125rem', { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '500' }],
      },
      colors: {
        background: '#F7F4EE', foreground: '#232323', surface: '#FFFCF8', border: '#DDD5C8',
        primary: { DEFAULT: '#4E5B52', foreground: '#F7F4EE', soft: '#A8B5A2' },
        secondary: { DEFAULT: '#E6E0D6', foreground: '#232323' },
        accent: { DEFAULT: '#A8B5A2', foreground: '#232323' },
        muted: { DEFAULT: '#EFE9E0', foreground: '#4E5B52' },
        success: { DEFAULT: '#3A7D5D', foreground: '#F3FFF8' },
        warning: { DEFAULT: '#B67A2D', foreground: '#FFF9F1' },
      },
      borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem', pill: '999px' },
      boxShadow: { soft: '0 2px 12px rgb(35 35 35 / 0.06)', card: '0 14px 40px rgb(35 35 35 / 0.08)', focus: '0 0 0 4px rgb(168 181 162 / 0.45)' },
      spacing: { section: 'clamp(4rem, 8vw, 7rem)', 'section-sm': 'clamp(2.75rem, 6vw, 4.5rem)' },
      maxWidth: { prose: '68ch', content: '1200px' },
      transitionTimingFunction: { premium: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      zIndex: { nav: '50', overlay: '60', modal: '70', toast: '80' },
    },
  },
  plugins: [],
};

export default config;
