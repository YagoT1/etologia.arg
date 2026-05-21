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
const benefits = ['Convivencia más ordenada', 'Menos tensión diaria', 'Lectura emocional más clara', 'Vínculos más estables', 'Acompañamiento profesional continuo'];

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="section-sm pt-14 md:pt-24" id="hero">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <div className="space-y-8">
              <p className="type-label text-muted-foreground/90">MV Agustina Gasparini · Etología Clínica</p>
              <h1 className="type-h1 max-w-[18ch]">Ayudo a familias a convivir mejor con sus animales.</h1>
              <p className="type-body-lg max-w-[52ch] text-muted-foreground">Trabajo con abordajes conductuales y emocionales para mejorar la convivencia, reducir el estrés y fortalecer el vínculo en casa.</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button href="https://wa.me/5490000000000" variant="whatsapp" size="lg">Solicitar consulta por WhatsApp</Button>
                <Button href="#presentacion" variant="ghost" size="lg">Ver enfoque de trabajo</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-8 hidden h-[78%] w-px bg-border/70 lg:block" />
              <figure className="overflow-hidden rounded-xl border border-border/60 bg-[#e9e3d8] p-3 shadow-soft">
                <div className="aspect-[4/5] rounded-md bg-[linear-gradient(145deg,#ebe4d8_5%,#d6dfd2_48%,#f3eee6_100%)]" />
              </figure>
              <figcaption className="mt-4 max-w-[34ch] type-small text-muted-foreground">Espacio reservado para fotografía editorial o video breve de consulta y acompañamiento profesional.</figcaption>
            </div>
          </div>
        </Container>
      </section>

      <section id="problemas" className="section">
        <Container className="space-y-10">
          <SectionHeader title="Problemas frecuentes" subtitle="Detrás de cada conducta hay un contexto. Entenderlo con criterio profesional es el primer paso para mejorar." />
          <Stagger>
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {concerns.map((title) => (
                <li key={title} className="border-b border-border/70 pb-4">
                  <p className="type-h4">{title}</p>
                  <p className="mt-2 type-small">Evaluación precisa del caso, pautas aplicables y seguimiento para sostener cambios.</p>
                </li>
              ))}
            </ul>
          </Stagger>
        </Container>
      </section>

      <section id="presentacion" className="section bg-surface/60">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <SectionHeader eyebrow="Presentación profesional" title="MV Agustina Gasparini" subtitle="Etología clínica con enfoque práctico y humano: evaluación conductual, lectura emocional y acompañamiento para decisiones claras." />
          <div className="space-y-5 border-l border-border/80 pl-5 md:pl-7">
            <p className="type-body">Cada plan se adapta al contexto real de la familia, con objetivos concretos y una guía profesional sostenida.</p>
            <p className="type-small">El trabajo combina observación, criterio técnico y comunicación simple para que cada indicación sea aplicable en la vida diaria.</p>
          </div>
        </Container>
      </section>

      <section id="servicios" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Servicios" subtitle="Modalidades flexibles para intervenir con continuidad y resultados medibles." />
          <div className="grid gap-5 md:grid-cols-2">
            <ServiceCard title="Consultas online" description="Entrevista y evaluación por videollamada, definición de pautas y seguimiento profesional en cada etapa." />
            <ServiceCard title="Encuentros presenciales quincenales" description="Observación en contexto, ajustes del plan y trabajo directo sobre situaciones concretas de convivencia." />
          </div>
        </Container>
      </section>

      <section id="proceso" className="section bg-surface/60">
        <Container className="space-y-8">
          <SectionHeader title="Cómo funciona" subtitle="Un proceso claro para avanzar con orden, criterio y acompañamiento." />
          <ol className="grid gap-6 md:grid-cols-2">
            {['Primer contacto por WhatsApp', 'Evaluación inicial del caso', 'Plan de trabajo personalizado', 'Seguimiento y ajustes profesionales'].map((step, idx) => (
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
          <SectionHeader title="Beneficios del acompañamiento" subtitle="Resultados concretos que impactan en la rutina y en el bienestar de toda la familia." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <article key={item} className="rounded-xl border border-border/70 bg-surface/80 p-5 shadow-soft">
                <p className="type-small font-medium text-foreground">{item}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="reels" className="section bg-surface/60">
        <Container className="space-y-8">
          <SectionHeader title="Contenido destacado" subtitle="Reels y publicaciones breves con herramientas útiles para prevenir conflictos y mejorar la convivencia." />
          <Stagger>
            <div className="grid gap-5 md:grid-cols-3">
              <ReelPreviewCard title="Señales tempranas de estrés" platform="Instagram" />
              <ReelPreviewCard title="Cómo acompañar la ansiedad" platform="Instagram" />
              <ReelPreviewCard title="Rutinas para una convivencia estable" platform="Instagram" />
            </div>
          </Stagger>
        </Container>
      </section>

      <section id="testimonios" className="section">
        <Container className="space-y-8">
          <SectionHeader title="Testimonios" subtitle="Experiencias reales de familias que mejoraron su convivencia con acompañamiento profesional." />
          <div className="grid gap-5 md:grid-cols-2">
            <TestimonialCard quote="Aprendimos a reconocer sus señales y hoy convivimos con más calma y menos frustración." author="Lucía y Martín · CABA" />
            <TestimonialCard quote="Nos sentimos orientados desde el primer encuentro. Las pautas fueron claras y realmente aplicables." author="Carla · Zona Norte" />
          </div>
        </Container>
      </section>

      <section id="faq" className="section bg-surface/60">
        <Container className="space-y-8">
          <SectionHeader title="Preguntas frecuentes" subtitle="Información breve para tomar una decisión con tranquilidad y claridad." />
          <FaqAccordion items={[
            { q: '¿Las consultas pueden ser virtuales?', a: 'Sí. La modalidad online permite evaluar, planificar y hacer seguimiento en la mayoría de los casos.' },
            { q: '¿Cada cuánto se realizan los encuentros presenciales?', a: 'Habitualmente de forma quincenal, según objetivos y evolución del caso.' },
            { q: '¿Cuánto dura el proceso?', a: 'Depende de cada situación. Se trabaja con objetivos concretos y revisiones periódicas para medir avances.' },
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
