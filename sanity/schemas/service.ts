export const serviceType = {
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', type: 'text' },
    { name: 'active', type: 'boolean', initialValue: true }
  ]
};
