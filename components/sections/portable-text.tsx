import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react';
import { urlForImage, imageDimensions } from '@/sanity/lib.image';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 type-h3">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 type-h4">{children}</h3>,
    normal: ({ children }) => <p className="mt-5 type-body text-muted-foreground">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-primary-soft pl-4 text-foreground">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-muted-foreground">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? '#';
      const isExternal = href.startsWith('http');
      const className = 'text-primary underline underline-offset-2 hover:text-primary/80';
      return isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value, { width: 1200, quality: 78 });
      const dims = imageDimensions(value);
      if (!url || !dims) return null;
      const alt = (value as { alt?: string })?.alt ?? '';
      return (
        <figure className="mt-8">
          <Image
            src={url}
            alt={alt}
            width={dims.width}
            height={dims.height}
            sizes="(max-width: 768px) 100vw, 768px"
            className="rounded-xl border border-border"
          />
          {alt ? <figcaption className="mt-2 type-caption">{alt}</figcaption> : null}
        </figure>
      );
    },
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
