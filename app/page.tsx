import { CtaBlock } from '@/components/sections/cta-block';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { ReelPreviewCard } from '@/components/sections/reel-preview-card';
import { Stagger } from '@/components/animations/motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ContentCard, ServiceCard, TestimonialCard } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { localBusinessSchema } from '@/lib/schema';

const issues = ['Agresividad', 'Ansiedad', 'Miedo', 'Estrés', 'Celos', 'Socialización'];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="section-sm pt-12 md:pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">MV Agustina Gasparini · Etología Argentina</p>
              <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">Ayudo a familias a convivir mejor con sus animales.</h1>
              <p className="max-w-prose text-lg text-muted-foreground">Acompañamiento profesional en procesos emocionales y conductuales para fortalecer el vínculo entre humanos y animales.</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="whatsapp" size="lg" href="https://wa.me/5490000000000">Solicitar consulta por WhatsApp</Button>
                <Button variant="outline" size="lg" href="#presentacion">Conocer más</Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-secondary to-background p-8 shadow-card">
              <div className="aspect-[4/5] rounded-lg border border-border/70 bg-[radial-gradient(circle_at_30%_25%,rgba(168,181,162,0.55),transparent_45%),radial-gradient(circle_at_70%_65%,rgba(230,224,214,0.9),transparent_55%)]" />
              <p className="mt-4 text-sm text-muted-foreground">Placeholder editorial para fotografía o video cinematográfico de vínculo humano-animal.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Problemas frecuentes" subtitle="Cada conducta tiene una historia detrás. Comprenderla es el primer paso para transformar la convivencia." />
          <Stagger>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {issues.map((item) => <ContentCard key={item} title={item} excerpt="Abordaje respetuoso, profesional y adaptado a cada familia." />)}
            </div>
          </Stagger>
        </Container>
      </section>

      <section id="presentacion" className="section">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeader eyebrow="Presentación profesional" title="MV Agustina Gasparini" subtitle="Trabajo desde una etología clínica sensible, combinando evidencia, escucha activa y acompañamiento humano para generar cambios sostenibles." />
          <ContentCard title="Enfoque humano y técnico" excerpt="Procesos claros, cercanos y sin juicios para construir vínculos más estables, seguros y saludables." />
        </Container>
      </section>

      <section id="servicios" className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Servicios" subtitle="Acompañamiento flexible para diferentes etapas y necesidades." />
          <div className="grid gap-5 md:grid-cols-2">
            <ServiceCard title="Consultas online" description="Sesiones virtuales para evaluar el caso, diseñar pautas y acompañar la implementación." />
            <ServiceCard title="Encuentros presenciales quincenales" description="Intervención situada para observar contexto real y optimizar avances en convivencia." />
          </div>
        </Container>
      </section>

      <section id="como-funciona" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Cómo funciona" subtitle="Un proceso simple, claro y profesional." />
          <ol className="grid gap-4 md:grid-cols-2">
            {['Contacto por WhatsApp', 'Evaluación inicial', 'Plan de acompañamiento', 'Seguimiento profesional'].map((step, idx) => (
              <li key={step} className="rounded-lg border border-border bg-surface p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Paso {idx + 1}</p><p className="mt-1 text-lg">{step}</p></li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Beneficios emocionales" subtitle="Resultados que impactan en el bienestar cotidiano de toda la familia." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {['Mejor convivencia', 'Tranquilidad diaria', 'Comprensión emocional', 'Vínculos saludables', 'Acompañamiento profesional'].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-background px-4 py-5 text-sm font-medium">{item}</div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="space-y-8">
          <SectionHeader title="Reels y posts destacados" subtitle="Contenido breve para educar, prevenir y acompañar." />
          <div className="grid gap-5 md:grid-cols-3">
            <ReelPreviewCard title="Señales tempranas de estrés" platform="Instagram" />
            <ReelPreviewCard title="Cómo acompañar la ansiedad" platform="Instagram" />
            <ReelPreviewCard title="Rutinas para una convivencia sana" platform="Instagram" />
          </div>
        </Container>
      </section>

      <section className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Testimonios" subtitle="Historias reales de familias acompañadas." />
          <div className="grid gap-5 md:grid-cols-2">
            <TestimonialCard quote="Aprendimos a entender lo que nuestro perro necesitaba y la convivencia cambió por completo." author="Lucía y Martín · CABA" />
            <TestimonialCard quote="Nos sentimos escuchados y acompañados en cada paso del proceso." author="Carla · Zona Norte" />
          </div>
        </Container>
      </section>

      <section id="faq" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Preguntas frecuentes" subtitle="Información clara para tomar decisión con tranquilidad." />
          <FaqAccordion items={[{ q: '¿Las consultas pueden ser virtuales?', a: 'Sí. Gran parte de los procesos se acompañan online con excelentes resultados.' }, { q: '¿Cada cuánto son los encuentros?', a: 'Depende del caso, aunque el formato presencial suele organizarse de forma quincenal.' }, { q: '¿Cuánto dura el acompañamiento?', a: 'Se ajusta a objetivos y evolución, con seguimiento profesional continuo.' }]} />
        </Container>
      </section>

      <section className="section pt-0">
        <Container>
          <CtaBlock />
        </Container>
      </section>
    </>
  );
}
