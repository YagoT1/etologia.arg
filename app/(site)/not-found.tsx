import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <section className="section-sm">
      <Container className="max-w-2xl text-center">
        <p className="type-label text-muted-foreground">Error 404</p>
        <h1 className="mt-4 type-h1">No encontramos esta página</h1>
        <p className="mt-5 type-body-lg text-muted-foreground">
          Puede que el enlace haya cambiado o ya no exista. Volvé al inicio para seguir navegando.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">
            Volver al inicio
          </Button>
          <Button href="/blog" variant="outline" size="lg" className="w-full sm:w-auto">
            Ver el blog
          </Button>
        </div>
      </Container>
    </section>
  );
}
