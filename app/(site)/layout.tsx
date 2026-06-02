import type { ReactNode } from 'react';
import { PageShell } from '@/components/layout/page-shell';

export default function SiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <PageShell>{children}</PageShell>;
}
