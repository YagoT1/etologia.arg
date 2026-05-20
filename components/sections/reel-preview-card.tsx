import { Badge } from '@/components/ui/badge';

export function ReelPreviewCard({ title, platform }: { title: string; platform: string }) {
  return (
    <article className="rounded-xl border border-border/70 bg-surface/75 p-4 shadow-soft">
      <Badge>{platform}</Badge>
      <h3 className="mt-3 type-h4">{title}</h3>
      <p className="mt-2 type-small">Contenido destacado para educar y acompañar.</p>
    </article>
  );
}
