import { siteConfig } from '@/config/site';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  areaServed: 'Argentina',
  founder: {
    '@type': 'Person',
    name: 'MV Agustina Gasparini',
    jobTitle: 'Médica Veterinaria · Etología clínica',
  },
  serviceType: [
    'Etología clínica',
    'Consulta conductual online',
    'Acompañamiento conductual para perros y gatos',
  ],
};
