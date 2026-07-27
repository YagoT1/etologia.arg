import type { Metadata } from 'next';
import Image from 'next/image';
import { CtaBlock, MobileStickyCta } from '@/components/sections/cta-block';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui/section-header';
import { buildWhatsAppUrl } from '@/lib/contact';
import { buildMetadata } from '@/lib/seo';
import { localBusinessSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({ path: '/' });

const cases = [
  {
    title: 'Ansiedad al quedarse solo',
    description: 'Ladridos, destrucción, salivación, escape o una familia que ya no puede salir tranquila de casa.',
  },
  {
    title: 'Miedo, estrés o hipervigilancia',
    description: 'Animales que se esconden, tiemblan, no descansan o reaccionan ante ruidos, visitas y cambios de rutina.',
  },
  {
    title: 'Agresividad o reacciones intensas',
    description: 'Gruñidos, mordidas, conflictos con otros animales o señales que necesitan lectura clínica y manejo seguro.',
  },
  {
    title: 'Convivencia familiar difícil',
    description: 'Llegadas de bebés, mudanzas, adopciones, duelos, nuevos animales o vínculos que se tensaron con el tiempo.',
  },
];

const trustSignals = [
  'Médica Veterinaria',
  'Etología clínica',
  'Evaluación conductual',
  'Plan familiar aplicable',
];

const process = [
  {
    step: '01',
    title: 'Me contás qué está pasando',
    text: 'Por WhatsApp compartís especie, edad, motivo de consulta y una escena concreta del problema. No necesitás tener todo ordenado para escribir.',
  },
  {
    step: '02',
    title: 'Evaluamos el caso con mirada clínica',
    text: 'Revisamos conducta, rutina, entorno, salud, antecedentes, familia y señales emocionales. Si algo requiere control veterinario, se indica.',
  },
  {
    step: '03',
    title: 'Definimos un plan posible para tu casa',
    text: 'La intervención se adapta a la familia real: tiempos, espacios, recursos, riesgos y nivel de acompañamiento necesario.',
  },
  {
    step: '04',
    title: 'Seguimos la evolución',
    text: 'Ajustamos pautas, resolvemos dudas y medimos avances sin exigir soluciones mágicas ni recetas iguales para todos.',
  },
];

const includes = [
  'Entrevista clínica y conductual',
  'Lectura del entorno y rutinas',
  'Hipótesis de trabajo claras',
  'Pautas aplicables en casa',
  'Seguimiento según el caso',
  'Criterios de seguridad y bienestar',
];

const benefits = [
  'Más calma en la rutina diaria y menos decisiones impulsivas ante conductas difíciles.',
  'Lectura más precisa de señales tempranas para prevenir escaladas y reducir riesgo.',
  'Pautas aplicables para toda la familia, sin recetas genéricas ni exigencias irreales.',
  'Mayor seguridad para sostener cambios con acompañamiento profesional y humano.',
];

const reels = [
  {
    title: 'Señales tempranas de estrés en perros y gatos',
    detail: 'Cómo diferenciar una reacción puntual de una señal de sobrecarga sostenida.',
  },
  {
    title: 'Qué hacer (y qué evitar) ante una reacción intensa',
    detail: 'Primeros pasos para bajar riesgo y ordenar la situación en casa.',
  },
  {
    title: 'Convivencia familiar: cambios que sí ayudan',
    detail: 'Ajustes concretos de rutina y entorno para reducir tensión diaria.',
  },
];

const testimonials = [
  {
    quote: 'Llegamos con miedo porque nuestro perro reaccionaba a las visitas. Entender las señales previas nos cambió la forma de manejar la situación.',
    author: 'Familia con perro adulto · CABA',
  },
  {
    quote: 'No fue una lista de órdenes. Fue entender qué le pasaba a nuestra gata y qué podíamos modificar en casa sin forzarla.',
    author: 'Familia multiespecie · Buenos Aires',
  },
];

const faqItems = [
  {
    q: '¿La consulta online sirve para conducta animal?',
    a: 'Sí. En muchos casos permite observar rutinas, videos, ambiente y dinámica familiar con mucho detalle. Si el caso necesita intervención presencial o derivación clínica, se conversa desde el inicio.',
  },
  {
    q: '¿Qué tengo que escribir por WhatsApp?',
    a: 'Contame especie, edad, desde cuándo ocurre, qué conducta te preocupa y en qué momentos aparece. Con eso alcanza para orientarte sobre el primer paso.',
  },
  {
    q: '¿Trabajás con agresividad?',
    a: 'Sí, siempre con criterios de seguridad. En estos casos se prioriza evaluar riesgo, contexto, señales previas, salud y manejo familiar antes de indicar pautas.',
  },
  {
    q: '¿El proceso reemplaza una consulta veterinaria clínica?',
    a: 'No. La conducta puede estar influida por dolor, enfermedad o cambios fisiológicos. Cuando hay sospecha médica, se recomienda evaluación veterinaria complementaria.',
  },
];

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16" id="hero">
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(168,181,162,0.28),_transparent_42%)]" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-2xl">
              <Badge>MV Agustina Gasparini · Etología clínica</Badge>
              <h1 className="mt-5 type-h1">
                Cuando una conducta cambia la vida de la casa, necesitás una lectura profesional y humana.
              </h1>
              <p className="mt-5 type-body-lg text-muted-foreground">
                Acompaño a familias que conviven con perros y gatos en situaciones de ansiedad, miedo, agresividad, estrés o cambios difíciles. Evaluamos qué está comunicando la conducta y armamos un plan posible, seguro y respetuoso.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={buildWhatsAppUrl()} variant="whatsapp" size="lg" className="w-full sm:w-auto">
                  Consultar por WhatsApp
                </Button>
                <Button href="#consulta" variant="outline" size="lg" className="w-full sm:w-auto">
                  Ver cómo es la consulta
                </Button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Podés escribirme aunque no sepas cómo nombrar el problema. Empezamos por ordenar lo que está pasando.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {trustSignals.map((signal) => (
                  <div key={signal} className="rounded-lg border border-border bg-surface/80 px-3 py-3 text-sm font-medium text-foreground shadow-soft">
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-card">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/img-hero.webp"
                    alt="MV Agustina Gasparini, médica veterinaria especializada en etología clínica, acompañando a un perro en un entorno familiar y calmo"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="casos" className="section bg-surface/70">
        <Container className="space-y-8">
        <SectionHeader
          eyebrow="Interpretación clínica"
          title="La conducta es una señal. El desafío es entender qué la está produciendo."
          subtitle="Ansiedad, miedo, agresividad o conflictos de convivencia pueden parecer problemas distintos. Muchas veces comparten factores médicos, emocionales, ambientales o familiares. El trabajo empieza por identificar qué está influyendo en cada caso antes de decidir cómo intervenir."
        />
          <div className="grid gap-4 md:grid-cols-2">
            {cases.map((item) => (
              <article key={item.title} className="rounded-xl border border-border bg-background p-5 shadow-soft">
                <h3 className="type-h4">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

          <section id="agustina" className="section">
            <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="rounded-[1.5rem] border border-border bg-surface p-6 shadow-soft">
                <p className="type-label text-muted-foreground">
                  Dirección clínica del caso
                </p>

                <h2 className="mt-3 type-h2">
                  MV Agustina Gasparini
                </h2>

                <p className="mt-3 text-sm font-medium text-foreground">
                  Medicina veterinaria + etología clínica
                </p>

                <p className="mt-4 type-body-lg text-muted-foreground">
                  Trabajo desde la medicina veterinaria y la etología clínica para
                  interpretar conductas complejas, identificar factores relevantes y
                  ordenar prioridades de intervención con criterio clínico.
                </p>

                <p className="mt-4 text-muted-foreground">
                  Mi rol no es ofrecer respuestas rápidas ni recetas universales. Es
                  comprender qué está ocurriendo, evaluar el contexto completo y orientar
                  decisiones seguras para el animal y su familia.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-primary p-6 text-primary-foreground shadow-card">
                  <h3 className="type-h4 text-primary-foreground">
                    Criterio clínico + sensibilidad familiar
                  </h3>

                  <p className="mt-3 text-primary-foreground">
                    Un cambio de conducta puede involucrar dolor, miedo, aprendizaje,
                    ambiente, manejo, edad, estrés o dinámica familiar. Por eso cada caso
                    requiere una evaluación integral antes de definir pautas o tomar
                    decisiones.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-surface p-5">
                    <p className="type-label text-muted-foreground">
                      Enfoque clínico
                    </p>

                    <p className="mt-2 font-medium">
                      Evaluación integral, prevención de riesgos y pautas realistas para
                      cada situación.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-5">
                    <p className="type-label text-muted-foreground">
                      Modalidad
                    </p>

                    <p className="mt-2 font-medium">
                      Consultas online y encuentros presenciales según las necesidades del
                      caso.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

      <section id="consulta" className="section bg-surface/70">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="La consulta"
            title="Qué incluye una evaluación conductual"
            subtitle="El objetivo es que salgas con una lectura más clara del problema y próximos pasos posibles para tu familia."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {includes.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-background px-4 py-4 text-sm font-medium text-foreground">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="metodo" className="section">
        <Container className="space-y-8">
        <SectionHeader
          eyebrow="Criterio clínico"
          title="Cada decisión parte de una evaluación, no de una receta"
          subtitle="La conducta puede estar influida por factores médicos, emocionales, ambientales y familiares. Por eso el trabajo sigue una secuencia de evaluación y toma de decisiones antes de definir cualquier intervención."
        />
          <ol className="grid gap-4 md:grid-cols-2">
            {process.map((item) => (
              <li key={item.step} className="rounded-xl border border-border bg-surface p-5 shadow-soft">
                <p className="type-label text-muted-foreground">{item.step}</p>
                <h3 className="mt-3 type-h4">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section bg-primary/[0.04]">
        <Container>
          <div className="grid gap-8 rounded-[1.5rem] border border-border bg-background p-6 shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <p className="type-label text-muted-foreground">Una escena real</p>
              <h2 className="mt-3 type-h2">“No sé si tiene miedo, si está enojado o si estamos haciendo todo mal.”</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Muchas familias llegan así: agotadas, preocupadas y con culpa. La consulta ayuda a separar interpretación de información clínica: qué señales aparecen, cuándo empezaron, qué las intensifica y qué necesita cambiar primero.
              </p>
              <p>
                La meta no es prometer una transformación instantánea. Es construir seguridad, calma y decisiones concretas para que el vínculo pueda mejorar sin improvisar.
              </p>
              <Button href={buildWhatsAppUrl()} variant="outline">
                Contar mi caso
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section id="beneficios" className="section bg-surface/70">
        <Container className="space-y-8">
        <SectionHeader
            eyebrow="Impacto clínico"
            title="Qué suele cambiar cuando existe una lectura clínica adecuada"
            subtitle="Cuando se identifican los factores que están influyendo en la conducta, las decisiones dejan de basarse en prueba y error. El objetivo no es buscar soluciones mágicas, sino construir cambios sostenibles y más seguros para el animal y su familia."
        />
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((item) => (
              <article key={item} className="rounded-xl border border-border/80 bg-background/80 p-6 shadow-soft">
                <p className="text-sm leading-relaxed text-foreground">{item}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="reels" className="section bg-surface/60">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Contenido breve"
            title="Reels y posts para entender mejor lo que está pasando"
            subtitle="Piezas educativas para identificar señales y tomar mejores decisiones entre consultas."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {reels.map((item) => (
              <article key={item.title} className="rounded-xl border border-border/80 bg-surface/90 p-6 shadow-soft">
                <p className="type-label text-muted-foreground">Instagram</p>
                <h3 className="mt-3 type-h4">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="testimonios" className="section">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Confianza"
            title="Familias que pudieron volver a entender lo que estaba pasando"
            subtitle="La confidencialidad importa: los testimonios resumen experiencias reales sin exponer detalles sensibles del caso."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <article key={item.author} className="rounded-xl border border-border/80 bg-background/80 p-6 shadow-soft">
                <blockquote className="text-lg leading-relaxed">“{item.quote}”</blockquote>
                <p className="mt-4 text-sm text-muted-foreground">{item.author}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="section bg-surface/60">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Antes de escribir"
            title="Dudas frecuentes"
            subtitle="Si tu situación involucra riesgo de mordida, lesiones o deterioro repentino, escribí aclarando ese contexto para priorizar la orientación inicial."
          />
          <FaqAccordion items={faqItems} />
        </Container>
      </section>

      <section className="section pt-0" id="cta-final">
        <Container>
          <CtaBlock />
        </Container>
      </section>

      <MobileStickyCta />
    </>
  );
}
