import { cn } from '@/lib/utils';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('inline-flex rounded-pill bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground', className)}>{children}</span>;
}
