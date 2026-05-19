import { Badge } from '@/components/ui/badge';

export function ReelPreviewCard({ title, platform }: { title: string; platform: string }) {
  return (
    <article className="space-y-3 border-b border-border/70 pb-5">
      <Badge>{platform}</Badge>
      <h3 className="type-h4">{title}</h3>
      <p className="type-small">Contenido destacado para educar y acompañar.</p>
    </article>
  );
}
