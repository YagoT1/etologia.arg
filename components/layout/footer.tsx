import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { buildWhatsAppUrl } from '@/lib/contact';
import { siteConfig } from '@/config/site';

const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre mí' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
];

export function Footer() {
  return (
    <footer className="mb-20 border-t border-border bg-surface/60 md:mb-0">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-14">
        <div className="max-w-sm">
          <p className="type-label font-heading text-foreground">{siteConfig.author.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{siteConfig.author.jobTitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Acompañamiento conductual con criterio clínico para familias que conviven con perros y gatos.
            Consultas online y presenciales en Argentina.
          </p>
        </div>

        <nav aria-label="Navegación del sitio" className="flex flex-col gap-2 text-sm">
          <p className="type-label text-muted-foreground">Navegación</p>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit text-foreground transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <p className="type-label text-muted-foreground">Contacto</p>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-foreground transition hover:text-primary"
          >
            Consultar por WhatsApp
          </a>
          <Link href="/contact" className="w-fit text-foreground transition hover:text-primary">
            Escribir un mensaje
          </Link>
        </div>
      </Container>

      <div className="border-t border-border/70">
        <Container className="py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.author.name} · Etología Argentina. Todos los derechos reservados.
        </Container>
      </div>
    </footer>
  );
}
