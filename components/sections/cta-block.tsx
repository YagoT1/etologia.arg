import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CtaBlock() {
  return (
    <Card className="bg-primary text-primary-foreground">
      <h3 className="text-2xl leading-tight">Cada vínculo puede mejorar cuando hay comprensión y acompañamiento.</h3>
      <p className="mt-2 text-primary-foreground/80">Empezá hoy un proceso profesional, cálido y adaptado a tu realidad familiar.</p>
      <Button variant="whatsapp" className="mt-5" href="https://wa.me/5490000000000">Solicitar consulta por WhatsApp</Button>
    </Card>
  );
}
