import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-200">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold">Etología Argentina</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/about">Sobre mí</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
