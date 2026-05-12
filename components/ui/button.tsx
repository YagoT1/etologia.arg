import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PrimaryButton({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-900',
        className,
      )}
    >
      {children}
    </Link>
  );
}
