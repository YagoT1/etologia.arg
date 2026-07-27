import { env } from '@/lib/env';

export const siteConfig = {
  name: 'Etología Argentina',
  shortName: 'Etología Argentina',
  description:
    'Etología clínica y acompañamiento conductual para familias que conviven con perros y gatos, por MV Agustina Gasparini.',
  url: env.NEXT_PUBLIC_SITE_URL ?? 'https://etologia-arg.vercel.app',
  locale: 'es_AR',
  author: {
    name: 'MV Agustina Gasparini',
    jobTitle: 'Médica Veterinaria · Etología clínica',
  },
  contact: {
    whatsapp: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  },
} as const;

export type SiteConfig = typeof siteConfig;
