import { sanityClient } from './lib.client';
import type { BlogPost, BlogPostSummary } from '@/types/cms';

// Revalidación incremental (ISR): el contenido publicado se refresca cada 60 s.
const REVALIDATE_SECONDS = 60;

const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(publishedAt desc)
  {
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt
  }
`;

const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0]
  {
    title,
    "slug": slug.current,
    excerpt,
    body,
    featuredImage,
    publishedAt,
    seoTitle,
    seoDescription
  }
`;

const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

export async function getPosts(): Promise<BlogPostSummary[]> {
  return sanityClient.fetch(POSTS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS, tags: ['post'] } });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: REVALIDATE_SECONDS, tags: ['post', `post:${slug}`] } });
}

export async function getPostSlugs(): Promise<string[]> {
  return sanityClient.fetch(POST_SLUGS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS, tags: ['post'] } });
}
