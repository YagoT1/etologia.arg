import { CtaBlock } from '@/components/sections/cta-block';
import { Container } from '@/components/ui/container';

export default function ContactPage() {
  return (
    <section className="section-sm">
      <Container className="max-w-4xl space-y-8">
        <div className="max-w-2xl">
          <p className="type-label text-muted-foreground">Contacto</p>
          <h1 className="mt-4 type-h1">Empezá por contar qué está pasando.</h1>
          <p className="mt-5 type-body-lg text-muted-foreground">
            No necesitás llegar con un diagnóstico. Compartí especie, edad, desde cuándo ocurre la conducta y qué situación te preocupa más.
          </p>
        </div>
        <CtaBlock />
      </Container>
    </section>
  );
}
