import type { PortableTextBlock } from '@portabletext/react';

export type SanityImage = {
  asset?: { _ref?: string };
  alt?: string;
};

export type BlogPostSummary = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  featuredImage?: SanityImage;
};

export type BlogPost = BlogPostSummary & {
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};
