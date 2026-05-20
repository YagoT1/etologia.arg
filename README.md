# Etología Argentina - Base Arquitectónica

Base escalable con Next.js 15 + TypeScript + Tailwind + Framer Motion + Sanity.

## Estructura
- `app/`: rutas App Router y SEO técnico (`sitemap.ts`, `robots.ts`).
- `components/`: layout, sections, ui y animaciones.
- `lib/`: utilidades transversales (SEO, schema, i18n, helpers).
- `sanity/`: cliente y schemas del CMS.
- `messages/`: mensajes por locale (`es`, `en`).
- `config/`: configuración central de sitio e internacionalización.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
