import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  return (
    <section className="container py-20">
      <FadeIn>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
          Etología clínica y acompañamiento emocional para vínculos más sanos.
        </h1>
        <p className="mt-5 max-w-xl text-slate-600">
          MV Agustina Gasparini acompaña procesos conductuales con una mirada profesional, cálida y basada en evidencia.
        </p>
        <Button variant='primary' className="mt-8" href={`https://wa.me/${siteConfig.contact.whatsapp}`}>
          Consultar por WhatsApp
        </Button>
      </FadeIn>
    </section>
  );
}
