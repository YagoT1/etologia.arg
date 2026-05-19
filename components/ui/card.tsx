import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <article className={cn('rounded-xl border border-border/80 bg-surface p-6 transition duration-300 ease-premium hover:border-border', className)}>{children}</article>;
}

export function ServiceCard({ title, description }: { title: string; description: string }) {
  return <Card><h3 className="type-h4">{title}</h3><p className="mt-3 type-small">{description}</p></Card>;
}

export function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return <article className="space-y-4 border-l border-border pl-4 sm:pl-5"><blockquote className="type-body-lg text-foreground">“{quote}”</blockquote><p className="type-small">{author}</p></article>;
}

export function ContentCard({ title, excerpt }: { title: string; excerpt: string }) {
  return <Card><h3 className="type-h4">{title}</h3><p className="mt-2 type-small">{excerpt}</p></Card>;
}
