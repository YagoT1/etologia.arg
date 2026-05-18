export const siteConfig = {
  name: 'Etología Argentina',
  description:
    'Etología clínica y acompañamiento conductual para familias que conviven con perros y gatos, por MV Agustina Gasparini.',
  url: 'https://etologia-arg.vercel.app',
  locale: 'es_AR',
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  },
  defaultOgImage: '/og/default-og.jpg',
};

export type SiteConfig = typeof siteConfig;
