import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/lib/contact';

export function CtaBlock() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-primary text-primary-foreground shadow-card">
      <div className="grid gap-10 p-8 md:grid-cols-[1.35fr_0.65fr] md:items-center md:p-10">
        <div className="max-w-2xl">
          <p className="type-label text-primary-foreground">
            Primer paso
          </p>

          <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-primary-foreground md:text-4xl">
            Si la convivencia está cambiando, no hace falta esperar a que el problema escale.
          </h3>

          <p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground">
            Escribime por WhatsApp con una descripción breve de lo que está pasando.
            Te voy a orientar sobre la modalidad más adecuada y qué información conviene reunir
            antes de la consulta.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
          <Button
            variant="whatsapp"
            className="w-full md:w-auto"
            href={buildWhatsAppUrl()}
          >
            Consultar por WhatsApp
          </Button>

          <p className="max-w-xs text-sm leading-6 text-primary-foreground">
            Sin juicios. Con criterio clínico y pasos claros desde el primer contacto.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-toast border-t border-border/70 bg-background/95 px-4 py-3 shadow-card backdrop-blur md:hidden">
      <Button
        href={buildWhatsAppUrl()}
        variant="whatsapp"
        className="w-full"
      >
        Consultar por WhatsApp
      </Button>

      <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
        Contame qué conducta te preocupa y te indico el primer paso.
      </p>
    </div>
  );
}