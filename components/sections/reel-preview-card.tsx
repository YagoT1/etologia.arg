import { Badge } from '@/components/ui/badge';

const L2_SURFACE = 'rounded-xl border border-border/70 bg-surface/80 p-5 shadow-soft';

export function ReelPreviewCard({ title, platform }: { title: string; platform: string }) {
  return (
    <article className={L2_SURFACE}>
      <Badge>{platform}</Badge>
      <h3 className="mt-3 type-h4">{title}</h3>
      <p className="mt-2 type-small">Contenido destacado para educar y acompañar.</p>
    </article>
  );
}
