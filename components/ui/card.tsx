import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article className={cn('rounded-xl border border-border bg-surface p-6 shadow-soft transition duration-300 ease-premium', className)}>
      {children}
    </article>
  );
}
