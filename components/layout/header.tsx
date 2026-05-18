'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { buildWhatsAppUrl } from '@/lib/contact';
import { cn } from '@/lib/utils';

const NAV_BY_PATH: Record<string, Array<{ href: string; label: string }>> = {
  '/': [
    { href: '#casos', label: 'Casos' },
    { href: '#consulta', label: 'Consulta' },
    { href: '#metodo', label: 'Método' },
    { href: '#faq', label: 'FAQ' },
  ],
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = NAV_BY_PATH[pathname] ?? [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Sobre mí' },
    { href: '/contact', label: 'Contacto' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={cn('sticky top-0 z-nav transition-all duration-300 ease-premium', scrolled ? 'border-b border-border/80 bg-background/95 shadow-soft backdrop-blur' : 'bg-background/70 backdrop-blur-sm')}>
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="leading-tight" aria-label="Ir al inicio de Etología Argentina">
          <span className="block type-label font-heading">MV Agustina Gasparini</span>
          <span className="hidden text-xs text-muted-foreground sm:block">Etología clínica</span>
        </Link>

        <nav className="hidden items-center gap-6 type-small text-muted-foreground md:flex" aria-label="Navegación principal">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href={buildWhatsAppUrl()} size="sm" variant="whatsapp">
            Consultar
          </Button>
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-muted md:hidden"
          >
            <span className="sr-only">Menú</span>
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
          </button>
        </div>
      </Container>

      <div id="mobile-menu" className={cn('overflow-hidden border-t border-border/70 bg-background/95 md:hidden', open ? 'block' : 'hidden')}>
        <Container className="py-3">
          <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-3 type-body hover:bg-muted" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
