import { Badge } from '@/components/ui/badge';

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <header className="max-w-prose space-y-3">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {subtitle ? <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p> : null}
    </header>
  );
}
