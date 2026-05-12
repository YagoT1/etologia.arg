import type { Metadata } from 'next';
import '@/styles/globals.css';
import { buildMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/page-shell';

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
