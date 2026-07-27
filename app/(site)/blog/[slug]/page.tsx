import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getPostBySlug } from '@/sanity/queries';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="container py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">
          {post.title}
        </h1>

        {post.publishedAt && (
          <p className="mt-4 text-sm text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString('es-AR')}
          </p>
        )}

        {post.excerpt && (
          <p className="mt-6 text-xl text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        {post.body && (
          <div className="prose prose-neutral mt-10 max-w-none">
            <PortableText value={post.body} />
          </div>
        )}

        <div className="mt-12 rounded-xl border border-border p-6">
          <h2 className="text-xl font-semibold">
            ¿Necesitás orientación profesional?
          </h2>

          <p className="mt-3 text-muted-foreground">
            Cada caso tiene características propias. Una evaluación clínica
            permite comprender qué factores están influyendo en la conducta y
            definir un plan de trabajo adecuado para cada familia.
          </p>

          <a
            href="/contact"
            className="mt-4 inline-block font-medium"
          >
            Solicitar una consulta →
          </a>
        </div>
      </article>
    </section>
  );
}