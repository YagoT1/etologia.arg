import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <article className={cn('rounded-xl border border-border bg-surface p-6 shadow-soft transition duration-300 ease-premium', className)}>{children}</article>;
}

export function ServiceCard({ title, description }: { title: string; description: string }) {
  return <Card className="shadow-card"><h3 className="type-h4">{title}</h3><p className="mt-3 type-small">{description}</p></Card>;
}

export function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <article className="rounded-xl border border-border/75 bg-surface/85 p-5 shadow-soft sm:p-6">
      <blockquote className="type-body-lg text-foreground">“{quote}”</blockquote>
      <p className="mt-4 type-small">{author}</p>
    </article>
  );
}

export function ContentCard({ title, excerpt }: { title: string; excerpt: string }) {
  return <Card><h3 className="type-h4">{title}</h3><p className="mt-2 type-small">{excerpt}</p></Card>;
}
