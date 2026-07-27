'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7F4EE',
          color: '#232323',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.06em', color: '#4E5B52', fontSize: 13 }}>
            Error inesperado
          </p>
          <h1 style={{ fontSize: 30, margin: '12px 0 16px', lineHeight: 1.15 }}>
            Ocurrió un problema al cargar el sitio
          </h1>
          <p style={{ color: '#4E5B52', lineHeight: 1.6, marginBottom: 24 }}>
            Reintentá en unos segundos. Si persiste, escribinos por WhatsApp.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#4E5B52',
              color: '#F7F4EE',
              border: 0,
              borderRadius: 999,
              padding: '12px 24px',
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
