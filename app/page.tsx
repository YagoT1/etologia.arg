import { Stagger } from '@/components/animations/motion';
import { CtaBlock } from '@/components/sections/cta-block';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { ReelPreviewCard } from '@/components/sections/reel-preview-card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ContentCard, ServiceCard, TestimonialCard } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { localBusinessSchema } from '@/lib/schema';

const concerns = ['Agresividad', 'Ansiedad', 'Miedo', 'Estrés', 'Celos', 'Socialización'];
const benefits = ['Mejor convivencia', 'Tranquilidad', 'Comprensión emocional', 'Vínculos saludables', 'Acompañamiento profesional'];

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="section-sm pt-12 md:pt-20" id="hero">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="type-label text-muted-foreground">MV Agustina Gasparini · Etología Argentina</p>
              <h1 className="type-h1">Ayudo a familias a convivir mejor con sus animales.</h1>
              <p className="type-body-lg text-muted-foreground">Acompañamiento profesional en procesos emocionales y conductuales para fortalecer el vínculo entre humanos y animales.</p>
              <div className="flex flex-wrap gap-3">
                <Button href="https://wa.me/5490000000000" variant="whatsapp" size="lg">Solicitar consulta por WhatsApp</Button>
                <Button href="#presentacion" variant="outline" size="lg">Conocer más</Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-gradient-to-br from-secondary to-background p-5 shadow-card sm:p-7">
              <div className="aspect-[4/5] rounded-lg border border-border/80 bg-[radial-gradient(circle_at_28%_28%,rgba(168,181,162,0.58),transparent_48%),radial-gradient(circle_at_72%_64%,rgba(230,224,214,0.95),transparent_56%)]" />
              <p className="mt-4 type-small">Espacio reservado para fotografía editorial o video cinematográfico suave del vínculo humano-animal.</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="problemas" className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Problemas frecuentes" subtitle="Cada conducta tiene una historia detrás. Comprenderla es el primer paso para transformar la convivencia." />
          <Stagger>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {concerns.map((title) => (
                <ContentCard key={title} title={title} excerpt="Intervenciones respetuosas, con foco en bienestar y evolución sostenida." />
              ))}
            </div>
          </Stagger>
        </Container>
      </section>

      <section id="presentacion" className="section">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <SectionHeader eyebrow="Presentación profesional" title="MV Agustina Gasparini" subtitle="Etología clínica con mirada emocional: evidencia, escucha y acompañamiento humano para transformar la convivencia con sensibilidad y claridad." />
          <ContentCard title="Expertise cercano" excerpt="Un enfoque profesional cálido, sin juicios, diseñado para familias reales y procesos emocionalmente sostenibles." />
        </Container>
      </section>

      <section id="servicios" className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Servicios" subtitle="Procesos claros, premium y adaptados al contexto de cada familia." />
          <div className="grid gap-5 md:grid-cols-2">
            <ServiceCard title="Consultas online" description="Sesiones virtuales para evaluar el caso y acompañar implementación con seguimiento profesional." />
            <ServiceCard title="Encuentros presenciales quincenales" description="Intervención situada para lectura integral del entorno y mejoras concretas en convivencia." />
          </div>
        </Container>
      </section>

      <section id="proceso" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Cómo funciona" subtitle="Un proceso simple, contenido y profesional." />
          <ol className="grid gap-4 md:grid-cols-2">
            {['Contacto por WhatsApp', 'Evaluación inicial', 'Plan de acompañamiento', 'Seguimiento profesional'].map((step, idx) => (
              <li key={step} className="rounded-lg border border-border bg-surface p-5">
                <p className="type-caption uppercase">Paso {idx + 1}</p>
                <p className="mt-1 type-h4">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="beneficios" className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Beneficios emocionales" subtitle="Cambios visibles en la vida cotidiana, con mayor calma y conexión." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-background px-4 py-5 type-small font-medium text-foreground">{item}</div>
            ))}
          </div>
        </Container>
      </section>

      <section id="reels" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Posts y reels destacados" subtitle="Contenido breve y útil para acompañar, prevenir y comprender mejor." />
          <Stagger>
            <div className="grid gap-5 md:grid-cols-3">
              <ReelPreviewCard title="Señales tempranas de estrés" platform="Instagram" />
              <ReelPreviewCard title="Cómo acompañar la ansiedad" platform="Instagram" />
              <ReelPreviewCard title="Rutinas para una convivencia sana" platform="Instagram" />
            </div>
          </Stagger>
        </Container>
      </section>

      <section id="testimonios" className="section bg-surface/70">
        <Container className="space-y-8">
          <SectionHeader title="Testimonios" subtitle="Historias reales de procesos acompañados con sensibilidad y método." />
          <div className="grid gap-5 md:grid-cols-2">
            <TestimonialCard quote="Aprendimos a leer su ansiedad y hoy convivimos con más calma y conexión." author="Lucía y Martín · CABA" />
            <TestimonialCard quote="Nos sentimos acompañados desde el primer contacto. Cambió nuestro vínculo." author="Carla · Zona Norte" />
          </div>
        </Container>
      </section>

      <section id="faq" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Preguntas frecuentes" subtitle="Información clara para decidir con tranquilidad." />
          <FaqAccordion items={[
            { q: '¿Las consultas pueden ser virtuales?', a: 'Sí. Muchas familias trabajan de forma online con excelentes resultados.' },
            { q: '¿Con qué frecuencia son los encuentros presenciales?', a: 'Generalmente quincenales, ajustados a objetivos y evolución del caso.' },
            { q: '¿Cuánto dura un proceso de acompañamiento?', a: 'Depende de cada situación. Se define por objetivos concretos y seguimiento continuo.' },
          ]} />
        </Container>
      </section>

      <section className="section pt-0" id="cta-final">
        <Container>
          <CtaBlock />
        </Container>
      </section>
    </>
  );
}
