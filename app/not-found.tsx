import { PageShell } from '@/components/layout/page-shell';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function RootNotFound() {
  return (
    <PageShell>
      <section className="section-sm">
        <Container className="max-w-2xl text-center">
          <p className="type-label text-muted-foreground">Error 404</p>
          <h1 className="mt-4 type-h1">No encontramos esta página</h1>
          <p className="mt-5 type-body-lg text-muted-foreground">
            Puede que el enlace haya cambiado o ya no exista. Volvé al inicio para seguir navegando.
          </p>
          <Button href="/" variant="primary" size="lg" className="mt-8">
            Volver al inicio
          </Button>
        </Container>
      </section>
    </PageShell>
  );
}
