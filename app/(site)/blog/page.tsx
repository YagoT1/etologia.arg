import Link from 'next/link';
import { getPosts } from '@/sanity/queries';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold">Blog</h1>

        <p className="mt-4 text-muted-foreground">
          Artículos sobre comportamiento animal, bienestar y convivencia.
        </p>

        <div className="mt-12 space-y-6">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">
              Aún no hay artículos publicados.
            </p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-border p-6"
              >
                <h2 className="text-2xl font-semibold">
                  {post.title}
                </h2>

                {post.publishedAt && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString('es-AR')}
                  </p>
                )}

                {post.excerpt && (
                  <p className="mt-4 text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block font-medium"
                >
                  Leer artículo →
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}