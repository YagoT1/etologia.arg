import { cn } from '@/lib/utils';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('h-11 w-full rounded-md border border-border bg-surface px-3 text-sm placeholder:text-muted-foreground focus-visible:shadow-focus', props.className)} />;
}
