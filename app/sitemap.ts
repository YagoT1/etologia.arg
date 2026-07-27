import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPosts } from '@/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: 'yearly', priority: 0.6 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    postRoutes = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // Si el CMS no responde durante el build, el sitemap se genera con las rutas estáticas.
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}
