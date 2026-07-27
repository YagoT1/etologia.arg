import { OgImage, size, contentType, alt } from '@/lib/og-image';

export { size, contentType, alt };
export const runtime = 'nodejs';

export default function Image() {
  return OgImage();
}
