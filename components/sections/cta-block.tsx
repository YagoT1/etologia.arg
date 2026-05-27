import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { buildWhatsAppUrl } from '@/lib/contact';

export function CtaBlock() {
  return (
    <Card className="overflow-hidden bg-primary p-0 text-primary-foreground">
      <div className="grid gap-6 p-6 md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-8">
        <div>
          <p className="type-label text-primary-foreground/70">Primer paso</p>
          <h3 className="mt-3 text-2xl leading-tight md:text-3xl">
            Si la convivencia está cambiando, no hace falta esperar a que el problema escale.
          </h3>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Escribime por WhatsApp con una descripción breve de lo que está pasando. Te oriento sobre la modalidad adecuada y qué información conviene reunir antes de la consulta.
          </p>
        </div>
        <div className="space-y-3 md:text-right">
          <Button variant="whatsapp" className="w-full md:w-auto" href={buildWhatsAppUrl()}>
            Consultar por WhatsApp
          </Button>
          <p className="text-sm leading-relaxed text-primary-foreground/70">
            Sin juicios. Con criterio clínico y pasos claros desde el primer contacto.
          </p>
        </div>
      </div>
    </Card>
  );
}

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-toast border-t border-border/70 bg-background/95 px-4 py-3 shadow-card backdrop-blur md:hidden">
      <Button href={buildWhatsAppUrl()} variant="whatsapp" className="w-full">
        Consultar por WhatsApp
      </Button>
      <p className="mt-1 text-center text-[0.72rem] leading-snug text-muted-foreground">
        Contame qué conducta te preocupa y te indico el primer paso.
      </p>
    </div>
  );
}
