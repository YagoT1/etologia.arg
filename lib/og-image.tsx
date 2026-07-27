import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = siteConfig.name;

/** Imagen Open Graph/Twitter de marca, generada en tiempo de build (válida siempre). */
export function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F7F4EE',
          padding: '72px',
          fontFamily: 'sans-serif',
          color: '#232323',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 999, background: '#4E5B52' }} />
          <div style={{ fontSize: 26, letterSpacing: 2, textTransform: 'uppercase', color: '#4E5B52' }}>
            {siteConfig.author.name}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 60, lineHeight: 1.1, fontWeight: 600, maxWidth: 900 }}>
            Etología clínica y acompañamiento conductual para perros y gatos
          </div>
          <div style={{ fontSize: 30, color: '#4E5B52', maxWidth: 820 }}>
            Una lectura profesional y humana cuando la conducta cambia la vida de la casa.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#4E5B52' }}>
          <span>Consulta online y presencial · Argentina</span>
          <span>etologia-arg.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
