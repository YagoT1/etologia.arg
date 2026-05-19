import { siteConfig } from '@/config/site';

const defaultWhatsAppMessage = [
  'Hola Agustina, vengo desde la web.',
  'Quisiera consultar por un proceso de etología clínica.',
  'El animal es un perro/gato y lo que más me preocupa es:',
].join('\n');

export function buildWhatsAppUrl(message = defaultWhatsAppMessage) {
  if (!siteConfig.contact.whatsapp) return '/contact';

  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
