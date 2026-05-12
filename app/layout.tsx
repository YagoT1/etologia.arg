import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import '@/styles/globals.css';
import { buildMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/page-shell';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

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
