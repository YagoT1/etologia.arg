import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { buildMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/page-shell';

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter",
})

const manrope = localFont({
  src: [
    {
      path: "../public/fonts/Manrope/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
})

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
