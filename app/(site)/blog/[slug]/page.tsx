type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <section className="container py-16"><h1 className="text-3xl font-semibold">Post: {slug}</h1></section>;
}
