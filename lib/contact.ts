import { siteConfig } from '@/config/site';

const defaultWhatsAppMessage = [
  'Hola Agustina, vengo desde la web.',
  'Quisiera consultar por un proceso de etología clínica.',
  'El animal es un perro/gato y lo que más me preocupa es:',
].join('\n');

/**
 * Construye el enlace a WhatsApp. El número está validado en `lib/env.ts`,
 * por lo que este helper siempre devuelve un enlace válido (sin fallback silencioso).
 */
export function buildWhatsAppUrl(message = defaultWhatsAppMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
