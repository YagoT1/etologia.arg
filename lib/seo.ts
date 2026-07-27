import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  /** Ruta relativa (ej. '/about'). Se usa para canonical y og:url. */
  path?: string;
  /** URL absoluta de imagen OG específica (opcional; por defecto usa la del sitio). */
  image?: string;
  /** Marcar como no indexable (ej. borradores). */
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
}: BuildMetadataArgs = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} · Etología clínica para perros y gatos`;
  const metaDescription = description ?? siteConfig.description;
  const canonical = new URL(path, siteConfig.url).toString();
  const images = image ? [{ url: image }] : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}
