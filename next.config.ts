import type { NextConfig } from 'next';

/** Cabeceras de seguridad comunes a todas las rutas. */
const baseSecurityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
];

// CSP estricta para el sitio público (sin 'unsafe-eval').
const siteCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://cdn.sanity.io https://*.sanity.io wss://*.api.sanity.io",
].join('; ');

// CSP para /studio (Sanity Studio requiere eval y workers).
const studioCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "worker-src 'self' blob:",
  "connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io",
  "frame-src 'self' https://*.sanity.io",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async headers() {
    return [
      {
        // Todo el sitio público excepto /studio.
        source: '/((?!studio).*)',
        headers: [...baseSecurityHeaders, { key: 'Content-Security-Policy', value: siteCsp }],
      },
      {
        source: '/studio/:path*',
        headers: [...baseSecurityHeaders, { key: 'Content-Security-Policy', value: studioCsp }],
      },
    ];
  },
};

export default nextConfig;
