import { HeroSection } from '@/components/sections/hero';
import { localBusinessSchema } from '@/lib/schema';

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <HeroSection />
    </>
  );
}
