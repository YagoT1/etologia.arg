export const testimonialType = {
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    { name: 'author', type: 'string' },
    { name: 'quote', type: 'text' },
    { name: 'featured', type: 'boolean', initialValue: false }
  ]
};
