'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('sticky top-0 z-nav transition-all duration-300 ease-premium', scrolled ? 'border-b border-border/80 bg-background/90 backdrop-blur' : 'bg-transparent')}>
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-base font-semibold tracking-tight">Etología Argentina</Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Navegación principal">
          <a href="#servicios" className="hover:text-foreground">Servicios</a>
          <a href="#como-funciona" className="hover:text-foreground">Cómo funciona</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <Button href="https://wa.me/5490000000000" size="sm" variant="whatsapp">WhatsApp</Button>
      </Container>
    </header>
  );
}
