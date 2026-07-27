import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostLoading() {
  return (
    <section className="section-sm">
      <Container className="max-w-3xl">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-6 h-10 w-full" />
        <Skeleton className="mt-3 h-10 w-2/3" />
        <Skeleton className="mt-6 aspect-[16/9] w-full rounded-xl" />
        <div className="mt-10 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </Container>
    </section>
  );
}
