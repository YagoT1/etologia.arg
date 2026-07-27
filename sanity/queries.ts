import { sanityClient } from './lib.client';

export type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  body?: any[];
  featuredImage?: {
    asset?: {
      _ref: string;
    };
  };
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

const POSTS_QUERY = `
  *[_type == "post"]
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

export async function getPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(POSTS_QUERY);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
}