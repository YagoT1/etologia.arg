'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { buildWhatsAppUrl } from '@/lib/contact';

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // En producción esto llega al logger de Vercel; sirve para diagnóstico sin exponer detalles al usuario.
    console.error(error);
  }, [error]);

  return (
    <section className="section-sm">
      <Container className="max-w-2xl text-center">
        <p className="type-label text-muted-foreground">Algo salió mal</p>
        <h1 className="mt-4 type-h1">No pudimos cargar esta sección</h1>
        <p className="mt-5 type-body-lg text-muted-foreground">
          Fue un problema temporal de nuestro lado. Podés reintentar o escribirme directamente y te respondo.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset} variant="primary" size="lg" className="w-full sm:w-auto">
            Reintentar
          </Button>
          <Button href={buildWhatsAppUrl()} variant="whatsapp" size="lg" className="w-full sm:w-auto">
            Escribir por WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
