export const blogPostType = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 4,
      description:
        'Breve descripción que aparecerá en listados y resultados de búsqueda.',
    },

    {
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'featuredImage',
      title: 'Imagen destacada',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },

    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description:
        'Título optimizado para buscadores. Si se deja vacío, se utilizará el título principal.',
    },

    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description:
        'Descripción para Google y redes sociales.',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      subtitle: 'publishedAt',
    },
  },
};