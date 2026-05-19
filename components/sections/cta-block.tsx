import { Button } from '@/components/ui/button';

export function CtaBlock() {
  return (
    <section className="rounded-xl bg-primary px-6 py-10 text-primary-foreground sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[56ch] text-center">
        <p className="type-label text-primary-foreground/70">Etología Argentina</p>
        <h3 className="mt-3 type-h2">Cada vínculo puede mejorar cuando hay comprensión y acompañamiento.</h3>
        <p className="mt-4 type-body-lg text-primary-foreground/80">Empezá hoy un proceso profesional, cálido y adaptado a tu realidad familiar.</p>
        <Button variant="whatsapp" className="mt-7" href="https://wa.me/5490000000000">Solicitar consulta por WhatsApp</Button>
      </div>
    </section>
  );
}
