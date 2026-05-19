import { Stagger } from '@/components/animations/motion';
import { CtaBlock } from '@/components/sections/cta-block';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { ReelPreviewCard } from '@/components/sections/reel-preview-card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ServiceCard, TestimonialCard } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { localBusinessSchema } from '@/lib/schema';

const concerns = ['Agresividad', 'Ansiedad', 'Miedo', 'Estrés', 'Celos', 'Socialización'];
const benefits = ['Mejor convivencia', 'Tranquilidad', 'Comprensión emocional', 'Vínculos saludables', 'Acompañamiento profesional'];

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="section-sm pt-14 md:pt-24" id="hero">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="space-y-8">
              <p className="type-label text-muted-foreground/90">MV Agustina Gasparini · Etología Argentina</p>
              <h1 className="type-h1 max-w-[18ch]">Ayudo a familias a convivir mejor con sus animales.</h1>
              <p className="type-body-lg max-w-[52ch] text-muted-foreground">Acompañamiento profesional en procesos emocionales y conductuales para fortalecer el vínculo entre humanos y animales.</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button href="https://wa.me/5490000000000" variant="whatsapp" size="lg">Solicitar consulta por WhatsApp</Button>
                <Button href="#presentacion" variant="ghost" size="lg">Conocer más</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-8 hidden h-[78%] w-px bg-border/70 lg:block" />
              <figure className="overflow-hidden rounded-xl bg-[#e9e3d8] p-3">
                <div className="aspect-[4/5] rounded-md bg-[linear-gradient(145deg,#ebe4d8_5%,#d6dfd2_48%,#f3eee6_100%)]" />
              </figure>
              <figcaption className="mt-4 max-w-[34ch] type-small text-muted-foreground">Espacio reservado para fotografía editorial o video cinematográfico suave del vínculo humano-animal.</figcaption>
            </div>
          </div>
        </Container>
      </section>

      <section id="problemas" className="section">
        <Container className="space-y-10">
          <SectionHeader title="Problemas frecuentes" subtitle="Cada conducta tiene una historia detrás. Comprenderla es el primer paso para transformar la convivencia." />
          <Stagger>
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {concerns.map((title) => (
                <li key={title} className="border-b border-border/70 pb-4">
                  <p className="type-h4">{title}</p>
                  <p className="mt-2 type-small">Intervenciones respetuosas, con foco en bienestar y evolución sostenida.</p>
                </li>
              ))}
            </ul>
          </Stagger>
        </Container>
      </section>

      <section id="presentacion" className="section bg-surface/60">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <SectionHeader eyebrow="Presentación profesional" title="MV Agustina Gasparini" subtitle="Etología clínica con mirada emocional: evidencia, escucha y acompañamiento humano para transformar la convivencia con sensibilidad y claridad." />
          <div className="space-y-5 border-l border-border/80 pl-5 md:pl-7">
            <p className="type-body">Un enfoque profesional cálido, sin juicios, diseñado para familias reales y procesos emocionalmente sostenibles.</p>
            <p className="type-small">Trabajo desde la observación contextual y objetivos concretos para lograr mejoras consistentes en la vida cotidiana.</p>
          </div>
        </Container>
      </section>

      <section id="servicios" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Servicios" subtitle="Procesos claros, premium y adaptados al contexto de cada familia." />
          <div className="grid gap-5 md:grid-cols-2">
            <ServiceCard title="Consultas online" description="Sesiones virtuales para evaluar el caso y acompañar implementación con seguimiento profesional." />
            <ServiceCard title="Encuentros presenciales quincenales" description="Intervención situada para lectura integral del entorno y mejoras concretas en convivencia." />
          </div>
        </Container>
      </section>

      <section id="proceso" className="section bg-surface/60">
        <Container className="space-y-8">
          <SectionHeader title="Cómo funciona" subtitle="Un proceso simple, contenido y profesional." />
          <ol className="grid gap-6 md:grid-cols-2">
            {['Contacto por WhatsApp', 'Evaluación inicial', 'Plan de acompañamiento', 'Seguimiento profesional'].map((step, idx) => (
              <li key={step} className="space-y-2 border-l border-border pl-4">
                <p className="type-caption uppercase">Paso {idx + 1}</p>
                <p className="type-h4 font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="beneficios" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Beneficios emocionales" subtitle="Cambios visibles en la vida cotidiana, con mayor calma y conexión." />
          <div className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
            {benefits.map((item) => (
              <p key={item} className="type-body border-b border-border/70 pb-3">{item}</p>
            ))}
          </div>
        </Container>
      </section>

      <section id="reels" className="section bg-surface/60">
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

      <section id="testimonios" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Testimonios" subtitle="Historias reales de procesos acompañados con sensibilidad y método." />
          <div className="grid gap-5 md:grid-cols-2">
            <TestimonialCard quote="Aprendimos a leer su ansiedad y hoy convivimos con más calma y conexión." author="Lucía y Martín · CABA" />
            <TestimonialCard quote="Nos sentimos acompañados desde el primer contacto. Cambió nuestro vínculo." author="Carla · Zona Norte" />
          </div>
        </Container>
      </section>

      <section id="faq" className="section bg-surface/60">
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
