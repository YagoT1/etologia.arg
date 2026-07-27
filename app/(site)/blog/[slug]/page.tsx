import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { PortableBody } from '@/components/sections/portable-text';
import { getPostBySlug, getPostSlugs } from '@/sanity/queries';
import { urlForImage, imageDimensions } from '@/sanity/lib.image';
import { buildMetadata } from '@/lib/seo';
import { buildWhatsAppUrl } from '@/lib/contact';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Si el CMS no responde durante el build, las rutas se generan bajo demanda (dynamicParams).
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return buildMetadata({ title: 'Artículo no encontrado', path: `/blog/${slug}`, noIndex: true });

  const ogImage = urlForImage(post.featuredImage, { width: 1200, height: 630, quality: 78 }) ?? undefined;
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: ogImage,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const heroUrl = urlForImage(post.featuredImage, { width: 1600, quality: 78 });
  const heroDims = imageDimensions(post.featuredImage);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(heroUrl ? { image: heroUrl } : {}),
    author: { '@type': 'Person', name: siteConfig.author.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <section className="section-sm">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Container>
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <h1 className="type-h1">{post.title}</h1>

          {post.publishedAt ? (
            <time dateTime={post.publishedAt} className="mt-4 block text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          ) : null}

          {post.excerpt ? <p className="mt-6 type-body-lg text-muted-foreground">{post.excerpt}</p> : null}

          {heroUrl && heroDims ? (
            <Image
              src={heroUrl}
              alt={post.featuredImage?.alt ?? post.title}
              width={heroDims.width}
              height={heroDims.height}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="mt-8 w-full rounded-xl border border-border"
            />
          ) : null}

          {post.body ? (
            <div className="mt-10">
              <PortableBody value={post.body} />
            </div>
          ) : null}

          <aside className="mt-12 rounded-xl border border-border bg-surface p-6 shadow-soft">
            <h2 className="type-h4">¿Necesitás orientación profesional?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Cada caso tiene características propias. Una evaluación clínica permite comprender qué factores están
              influyendo en la conducta y definir un plan de trabajo adecuado para cada familia.
            </p>
            <Button href={buildWhatsAppUrl()} variant="whatsapp" className="mt-5">
              Consultar por WhatsApp
            </Button>
          </aside>
        </article>
      </Container>
    </section>
  );
}
