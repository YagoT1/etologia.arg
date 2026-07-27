import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { buildMetadata } from '@/lib/seo';

// Cuerpo de texto → Inter. Se expone como --font-body (consumido por Tailwind).
const inter = localFont({
  src: [
    { path: '../public/fonts/Inter/Inter-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Inter/static/Inter_18pt-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Inter/Inter-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Títulos → Manrope. Se expone como --font-heading (consumido por Tailwind).
const manrope = localFont({
  src: [
    { path: '../public/fonts/Manrope/Manrope-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Manrope/static/Manrope-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/Manrope/static/Manrope-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
