import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/contact';

export default function AboutPage() {
  return (
    <section className="section-sm">
      <Container className="max-w-3xl">
        <p className="type-label text-muted-foreground">Sobre mí</p>
        <h1 className="mt-4 type-h1">MV Agustina Gasparini</h1>
        <p className="mt-5 type-body-lg text-muted-foreground">
          Acompaño familias que necesitan entender cambios de conducta en perros y gatos desde una mirada clínica, sensible y aplicable a la vida cotidiana.
        </p>
        <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-soft">
          <h2 className="type-h3">Cómo entiendo la etología clínica</h2>
          <p className="mt-3 text-muted-foreground">
            Una conducta no se aborda aislada de la salud, el ambiente, la historia del animal y la dinámica familiar. Por eso mi trabajo empieza con evaluación, escucha y criterios de seguridad antes de proponer pautas.
          </p>
        </div>
        <Button href={buildWhatsAppUrl()} variant="whatsapp" className="mt-8">
          Consultar por WhatsApp
        </Button>
      </Container>
    </section>
  );
}
