export const globalConfigType = {
  name: 'globalConfig',
  title: 'Configuración global',
  type: 'document',
  fields: [
    { name: 'siteTitle', type: 'string' },
    { name: 'siteDescription', type: 'text' },
    { name: 'defaultLocale', type: 'string', initialValue: 'es' },
    { name: 'whatsapp', type: 'string' }
  ]
};
