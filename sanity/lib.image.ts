import { dataset, projectId } from './env';
import type { SanityImage } from '@/types/cms';

type ImageOptions = { width?: number; height?: number; quality?: number };

function getRef(source?: SanityImage | null): string | undefined {
  return source?.asset?._ref;
}

/**
 * Construye la URL del CDN de Sanity a partir del _ref del asset, sin dependencias externas.
 * Formato del ref: `image-{assetId}-{width}x{height}-{ext}`.
 */
export function urlForImage(source?: SanityImage | null, opts: ImageOptions = {}): string | null {
  const ref = getRef(source);
  if (!ref) return null;

  const [, assetId, dimensions, ext] = ref.split('-');
  if (!assetId || !dimensions || !ext) return null;

  const params = new URLSearchParams({ auto: 'format', fit: 'max', q: String(opts.quality ?? 75) });
  if (opts.width) params.set('w', String(opts.width));
  if (opts.height) params.set('h', String(opts.height));

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${ext}?${params.toString()}`;
}

/** Devuelve las dimensiones originales del asset (para evitar CLS con next/image). */
export function imageDimensions(source?: SanityImage | null): { width: number; height: number } | null {
  const ref = getRef(source);
  if (!ref) return null;
  const dimensions = ref.split('-')[2];
  if (!dimensions) return null;
  const [width, height] = dimensions.split('x').map(Number);
  if (!width || !height) return null;
  return { width, height };
}
