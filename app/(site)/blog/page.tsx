import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getPosts } from '@/sanity/queries';
import { urlForImage } from '@/sanity/lib.image';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Artículos sobre comportamiento animal, bienestar y convivencia con perros y gatos, con criterio clínico.',
  path: '/blog',
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="section-sm">
      <Container className="max-w-4xl">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Blog', href: '/blog' }]} />

        <h1 className="type-h1">Blog</h1>
        <p className="mt-4 type-body-lg text-muted-foreground">
          Artículos sobre comportamiento animal, bienestar y convivencia.
        </p>

        <div className="mt-12 space-y-6">
          {posts.length === 0 ? (
            <p className="type-body text-muted-foreground">Aún no hay artículos publicados.</p>
          ) : (
            posts.map((post) => {
              const thumb = urlForImage(post.featuredImage, { width: 480, height: 300, quality: 70 });
              return (
                <article key={post.slug} className="rounded-xl border border-border bg-surface p-6 shadow-soft transition hover:shadow-card">
                  <Link href={`/blog/${post.slug}`} className="grid gap-5 sm:grid-cols-[200px_1fr] sm:items-center">
                    {thumb ? (
                      <span className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-border">
                        <Image src={thumb} alt="" fill sizes="200px" className="object-cover" />
                      </span>
                    ) : null}
                    <span className="block">
                      <h2 className="type-h4">{post.title}</h2>
                      {post.publishedAt ? (
                        <time dateTime={post.publishedAt} className="mt-2 block text-sm text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </time>
                      ) : null}
                      {post.excerpt ? <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">{post.excerpt}</span> : null}
                      <span className="mt-4 inline-block text-sm font-medium text-primary">Leer artículo →</span>
                    </span>
                  </Link>
                </article>
              );
            })
          )}
        </div>
      </Container>
    </section>
  );
}
