import { Stagger } from '@/components/animations/motion';
import { CtaBlock } from '@/components/sections/cta-block';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { ReelPreviewCard } from '@/components/sections/reel-preview-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ContentCard, ServiceCard, TestimonialCard } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import { SectionHeader } from '@/components/ui/section-header';

export default function DesignSystemPage() {
  return (
    <main className="section" aria-labelledby="ds-title">
      <Container className="space-y-14">
        <SectionHeader
          eyebrow="Etología Argentina"
          title="Design System premium emocional"
          subtitle="Base visual reusable para landing, blog, páginas internas y futuras expansiones."
        />

        <section className="space-y-6">
          <h3 id="buttons" className="type-h3">1) Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="whatsapp">WhatsApp CTA</Button>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="type-h3">2) Badges + Dividers</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Premium</Badge>
            <Badge>Healthcare</Badge>
            <Badge>Emocional</Badge>
          </div>
          <Divider />
        </section>

        <section className="space-y-6">
          <h3 id="cards" className="type-h3">3) Cards</h3>
          <Stagger>
            <div className="grid gap-5 md:grid-cols-3">
              <ServiceCard title="Service Card" description="Consultas online y acompañamiento conductual." />
              <TestimonialCard quote="La convivencia mejoró con claridad y contención." author="Familia paciente" />
              <ContentCard title="Content Card" excerpt="Artículo, recurso o contenido educativo." />
            </div>
          </Stagger>
        </section>

        <section className="space-y-6">
          <h3 className="type-h3">4) Section header + Input</h3>
          <SectionHeader title="Form primitives" subtitle="Inputs listos para formularios futuros." />
          <Input placeholder="Nombre y apellido" aria-label="Nombre y apellido" />
        </section>

        <section className="space-y-6">
          <h3 id="faq" className="type-h3">5) Reel preview + FAQ + CTA block</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <ReelPreviewCard title="Señales de estrés en perros" platform="Instagram" />
            <ReelPreviewCard title="Convivencia con gatos sensibles" platform="Instagram" />
          </div>
          <FaqAccordion
            items={[
              { q: '¿Es mobile-first?', a: 'Sí, el sistema fue diseñado mobile-first con componentes adaptativos.' },
              { q: '¿Está preparado para CMS?', a: 'Sí, la estructura es reusable y lista para integración Sanity.' },
            ]}
          />
          <CtaBlock />
        </section>
      </Container>
    </main>
  );
}
