import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/85',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
  whatsapp: 'bg-success text-success-foreground hover:brightness-95',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
};

const base = 'inline-flex items-center justify-center rounded-pill font-medium leading-tight transition duration-300 ease-premium focus-visible:shadow-focus disabled:opacity-60';

export function Button({ children, className, variant = 'primary', size = 'md', href, type = 'button', ariaLabel }: Props) {
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  if (!href) return <button type={type} aria-label={ariaLabel} className={classes}>{children}</button>;

  const isExternal = href.startsWith('http');
  if (isExternal) {
    return <a href={href} aria-label={ariaLabel} className={classes}>{children}</a>;
  }

  return <Link href={href} aria-label={ariaLabel} className={classes}>{children}</Link>;
}
