import { Badge } from '@/components/ui/badge';

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <header className="max-w-prose space-y-3">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="type-h2">{title}</h2>
      {subtitle ? <p className="type-body-lg text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}
