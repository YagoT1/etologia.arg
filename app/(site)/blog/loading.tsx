import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogLoading() {
  return (
    <section className="section-sm">
      <Container className="max-w-4xl">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="mt-4 h-5 w-full max-w-md" />
        <div className="mt-12 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-6">
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="mt-3 h-4 w-32" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
