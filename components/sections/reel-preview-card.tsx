import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ReelPreviewCard({ title, platform }: { title: string; platform: string }) {
  return (
    <Card>
      <Badge>{platform}</Badge>
      <h3 className="mt-3 text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">Contenido destacado para educar y acompañar.</p>
    </Card>
  );
}
