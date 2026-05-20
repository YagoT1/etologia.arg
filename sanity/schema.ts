import { type SchemaTypeDefinition } from 'sanity';
import { blogPostType, faqType, globalConfigType, highlightedContentType, serviceType, testimonialType } from '@/sanity/schemas';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPostType, testimonialType, faqType, serviceType, highlightedContentType, globalConfigType],
};
