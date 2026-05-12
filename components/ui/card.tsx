import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <article className={cn('rounded-xl border border-border bg-surface p-6 shadow-soft transition duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-card', className)}>{children}</article>;
}

export function ServiceCard({ title, description }: { title: string; description: string }) {
  return <Card><h3 className="text-xl">{title}</h3><p className="mt-3 text-muted-foreground">{description}</p></Card>;
}

export function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return <Card><blockquote className="text-lg leading-relaxed">“{quote}”</blockquote><p className="mt-4 text-sm text-muted-foreground">{author}</p></Card>;
}

export function ContentCard({ title, excerpt }: { title: string; excerpt: string }) {
  return <Card><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{excerpt}</p></Card>;
}
