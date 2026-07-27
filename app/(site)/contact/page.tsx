import type { Metadata } from 'next';
import { CtaBlock } from '@/components/sections/cta-block';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contacto',
  description:
    'Escribí por WhatsApp para consultar por un proceso de etología clínica para tu perro o gato. Consultas online y presenciales en Argentina.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <section className="section-sm">
      <Container className="max-w-4xl space-y-8">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Contacto', href: '/contact' }]} />
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
