import { siteConfig } from '@/config/site';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  areaServed: { '@type': 'Country', name: 'Argentina' },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: siteConfig.url,
    availableLanguage: { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
  },
  founder: {
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
  },
  provider: {
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
  },
  serviceType: [
    'Etología clínica',
    'Consulta conductual online',
    'Acompañamiento conductual para perros y gatos',
  ],
};
