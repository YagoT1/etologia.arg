# Auditoría final de release — Etología Argentina

**Ejecutado por:** Principal/Staff Engineer · Lead UX/Frontend · A11y · SEO técnico · Release Manager
**Modo:** implementación (no análisis). Se verificó el estado real del código antes de cada cambio.
**Verificación de tipos:** `tsc --noEmit` sobre el 100% de los archivos tocados → **0 errores** (ejecutado en dos configs acotadas por límites del entorno; ver "Limitaciones").

Clasificación: ✅ Resuelto · ⚠ Parcial (con motivo) · ❌ No aplica.

---

## 1. Design System ✅
**Archivos:** `tailwind.config.ts`, `styles/globals.css`, `app/layout.tsx`
**Qué se hizo:** se conectaron las variables de fuente (ver §2). Se corrigió el token de foco: `boxShadow.focus` pasó de verde translúcido (1.9:1) a doble anillo `#4E5B52` sólido (6.5:1). Contrastes de texto verificados numéricamente: cuerpo 6.5:1, badge 5.9:1, botón WhatsApp 4.79:1 — todos ≥ AA. Escalas de tipografía, spacing, radios y sombras se conservaron (ya eran correctas).
**Impacto:** identidad visual coherente y foco visible conforme WCAG. **Deuda restante:** ninguna crítica.

## 2. Tipografía ✅
**Archivos:** `app/layout.tsx`
**Motivo técnico:** Tailwind consumía `var(--font-heading)`/`var(--font-body)` pero `layout.tsx` exponía `--font-inter`/`--font-manrope` → todo caía a `sans-serif`. Se renombraron las variables (`Inter → --font-body`, `Manrope → --font-heading`), se añadió `display:'swap'`, `preload` y `fallback`.
**Impacto:** la marca ahora renderiza con Inter/Manrope reales. **Riesgo:** nulo (fuentes self-hosted ya presentes).

## 3. Hero ✅
**Archivos:** `app/(site)/page.tsx`, `public/images/img-hero.webp` (nuevo)
**Motivo:** la foto es landscape 1672×941 y se mostraba en contenedor `aspect-[4/5]` (retrato) → recortaba la cara de la profesional. Además pesaba 2 MB en PNG (LCP).
**Qué se hizo:** reencuadre a `aspect-[4/3]` con `object-center` (conserva a la profesional y al perro), conversión a WebP (**2 MB → 76 KB, −96%**), `sizes` responsive, `priority`+`fetchPriority`, y `alt` que nombra a la profesional (autoridad).
**Impacto:** mejor LCP, composición correcta, primera impresión de confianza. **Deuda:** el PNG original (2 MB) quedó en disco por límite de borrado del entorno → `git rm public/images/img-hero.png`.

## 4. UX ✅
**Archivos:** `components/ui/button.tsx`, `components/ui/card.tsx`, error/loading/not-found (ver §6)
**Qué se hizo:** `Button` ahora soporta `onClick`, `disabled` (con estilos) y abre externos con `target="_blank" rel="noopener noreferrer"`. Se eliminaron cards duplicadas/inconsistentes. Estados de carga y error cubiertos.
**Impacto:** menos ambigüedad, sin enlaces inseguros, feedback en cada interacción.

## 5. Navegación ✅
**Archivos:** `components/layout/footer.tsx`, `components/layout/header.tsx`, `components/ui/breadcrumbs.tsx` (nuevo), `app/(site)/{about,contact,blog,blog/[slug]}/page.tsx`, `app/(site)/en/page.tsx`
**Motivo:** `/about`, `/blog`, `/contact` eran páginas huérfanas (sin enlaces desde el home). `/en` era un stub indexable.
**Qué se hizo:** footer con navegación completa + contacto; header con enlaces persistentes a Sobre mí/Blog (y anclas en el home); breadcrumbs (visuales + `BreadcrumbList` schema) en about/contact/blog/artículo; `/en` ahora redirige a `/`.
**Impacto:** cero páginas huérfanas; crawleabilidad y orientación del usuario resueltas.

## 6. Accesibilidad ✅
**Archivos:** `app/(site)/error.tsx`, `app/not-found.tsx`, `app/(site)/not-found.tsx`, `app/global-error.tsx`, `app/(site)/blog/loading.tsx`, `app/(site)/blog/[slug]/loading.tsx`, `components/ui/skeleton.tsx`, `components/layout/header.tsx`, `styles/globals.css`
**Qué se hizo:** foco visible ≥3:1; menú móvil cierra con `Esc` y usa ícono hamburguesa real (SVG 3 barras ↔ X) con `aria-label` dinámico; landmarks (`nav aria-label`, `footer`, `main`); skeletons de carga; boundaries de error (`error`, `global-error`) y `not-found` con diseño de marca. FAQ ya tenía `aria-expanded/controls`.
**Impacto:** navegación por teclado y lectores de pantalla correctas; nunca se ve una pantalla de error cruda. **Deuda:** falta test manual con lector de pantalla real (no ejecutable en este entorno).

## 7. SEO ✅
**Archivos:** `lib/seo.ts`, `lib/schema.ts`, `app/opengraph-image.tsx` (nuevo), `app/twitter-image.tsx` (nuevo), `lib/og-image.tsx` (nuevo), `app/robots.ts`, `app/sitemap.ts`, `app/studio/layout.tsx` (nuevo), metadata por página.
**Qué se hizo:** OG/Twitter dinámicos de marca (elimina la imagen 404 anterior); `metadata` propia con `canonical` en home/about/contact/blog; `generateMetadata` en el artículo usando `seoTitle/seoDescription` + OG desde `featuredImage`; `robots` bloquea `/studio` + `host`; `sitemap` async con artículos y sin `/en`; schema enriquecido (`ProfessionalService` con `image/areaServed/provider`, `Article`, `BreadcrumbList`); `/studio` con `noindex`.
**Impacto:** cada página con SEO propio, previews válidas, indexación correcta.

## 8. Sanity ✅ / ⚠
**Archivos:** `sanity/lib.image.ts` (nuevo), `sanity/queries.ts`, `types/cms.ts`, `components/sections/portable-text.tsx` (nuevo), blog pages, `sanity/env.ts`
**Qué se hizo:** builder de imágenes del CDN **sin dependencias** (parsea el `_ref`); `featuredImage` ahora se renderiza (índice y artículo) con dimensiones reales (evita CLS); PortableText con componentes on-brand (headings, listas, citas, enlaces seguros, imágenes) en vez de `prose` (que no tenía plugin); tipos unificados en `types/cms.ts` (se eliminó `any` y el `Post` duplicado); caché ISR (`revalidate:60` + tags).
**⚠ Decisión deliberada:** la landing mantiene su contenido (casos/testimonios/FAQ) como constantes tipadas, **no** desde Sanity. Motivo de release: conectar la home a un dataset aún sin poblar la dejaría en blanco en producción; el contenido estático es más rápido y confiable para el camino crítico. El CMS alimenta el blog (su caso de uso real). Migrar testimonios/FAQ a Sanity queda como mejora sin bloqueo cuando se cargue el contenido.

## 9. Performance ✅ / ⚠
**Archivos:** `next.config.ts`, `app/layout.tsx`, `package.json`, animaciones neutralizadas
**Qué se hizo:** hero −96%; `framer-motion` dejó de importarse (los componentes que lo usaban estaban muertos) → fuera del bundle; fuentes con `swap`+`preload`; `next/image` en todo (blog incluido); ISR. `next/image` sirve AVIF/WebP por dispositivo.
**⚠ Limitación:** no pude ejecutar Lighthouse ni `next build` en este entorno (ver "Limitaciones"), así que **no puedo certificar los números Performance>95 / A11y=100 empíricamente**. Las causas de LCP/CLS/bundle atacadas son las correctas; la medición debe correrse en Vercel Preview.

## 10. Seguridad ✅
**Archivos:** `next.config.ts`, `lib/env.ts` (nuevo), `.env.example` (nuevo), `sanity/env.ts`, `app/robots.ts`, `app/studio/layout.tsx`
**Qué se hizo:** cabeceras (`CSP`, `HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader:false`); CSP estricta para el sitio y una específica (con `unsafe-eval`/workers) sólo para `/studio`; validación de entorno con **zod** que **falla explícitamente** si falta `NEXT_PUBLIC_WHATSAPP_NUMBER` o el `projectId` (se eliminó el `projectId` hardcodeado y el fallback silencioso del CTA); `/studio` con `noindex`+`disallow`.
**Impacto:** sin fallback silencioso; superficie de ataque acotada. **Deuda:** la CSP del sitio incluye `'unsafe-inline'` en `script-src` (bootstrap inline de Next); se puede endurecer con nonces más adelante.

## 11. Conversión ✅ / ⚠
**Qué se hizo:** el CTA de WhatsApp ya no puede degradarse en silencio (env validado); sticky móvil + CTA en footer + CTA en artículos; navegación a Sobre mí/Blog que construye autoridad; enlaces externos seguros.
**⚠ Deuda de negocio (no fabricable):** faltan credenciales verificables (matrícula, formación), enlaces reales de Instagram y testimonios atribuibles. No los inventé por integridad profesional; el owner debe aportarlos. Están listos los huecos técnicos (schema `provider`, footer, `sameAs`) para insertarlos.

## 12. Código ✅
**Qué se hizo:** se eliminaron exports muertos (`ServiceCard/ContentCard/TestimonialCard`), se deduplicó `L2_SURFACE`, se tipó PortableText (sin `any`), se unificaron tipos CMS, se neutralizó el andamiaje i18n fantasma y componentes sin uso.
**⚠ Limitación de borrado:** el sistema de archivos del entorno **no permite eliminar** archivos. Los archivos muertos quedaron neutralizados (`export {}` + nota) y deben eliminarse con git:
```
git rm app/(site)/en/page.tsx  # sólo si no se quiere el redirect; el redirect es válido dejarlo
git rm config/i18n.ts lib/i18n.ts hooks/use-locale.ts messages/en.json messages/es.json
git rm components/animations/fade-in.tsx components/animations/motion.tsx components/sections/reel-preview-card.tsx
git rm public/images/img-hero.png tsconfig.check.json tsconfig.check2.json
npm uninstall framer-motion   # regenera package-lock (dep ya no se importa)
```

---

## Limitaciones del entorno (disclosure honesto)
Este entorno de ejecución impuso tres restricciones que afectan sólo a la *verificación*, no al código entregado:
1. **Sin `git rm`/unlink:** no se pueden borrar archivos; los muertos quedaron neutralizados y listados arriba para `git rm`.
2. **npm no puede instalar/reparar** en este mount (falla en `rename`), y el churn previo dejó `node_modules` inconsistente (se restauraron `@types/*` extrayendo tarballs). Por eso **ESLint no pudo ejecutarse** (faltaba `@typescript-eslint/*`). Se compensó con `tsc` completo (0 errores) y revisión manual de reglas de hooks/`no-target-blank`/`no-img-element` (cumplidas).
3. **Tope de 45 s por comando y procesos de fondo no persistentes** → **no pude correr `next build` ni Lighthouse** (cargar los tipos de Sanity excede el tope). El typecheck se corrió acotado cubriendo el 100% de los archivos modificados.
**Acción requerida del owner antes de deploy:** `npm install` (sincroniza lockfile) → `npm run typecheck` → `npm run build` → correr Lighthouse en Vercel Preview → setear `NEXT_PUBLIC_WHATSAPP_NUMBER` real en Vercel.

---

## DEFINICIÓN DE DONE — estado verificado

| Criterio | Estado | Evidencia |
|---|---|---|
| No hay errores conocidos | ⚠ | `tsc` 0 errores en todos los archivos tocados; `next build` no ejecutable aquí → validar en Vercel |
| Sin problemas de accesibilidad relevantes | ✅ | foco 6.5:1, teclado (Esc), landmarks, aria, boundaries, skeletons |
| Sin problemas SEO relevantes | ✅ | metadata/canonical por página, OG válido, sitemap con posts, robots, schema |
| Sin problemas UX relevantes | ✅ | estados de carga/error, CTAs claros, navegación completa |
| Sin inconsistencias visuales | ✅ | fuentes conectadas, tokens de foco/superficie corregidos |
| Sin componentes huérfanos | ✅ | footer/header/breadcrumbs enlazan todas las rutas; `/en` redirige |
| Sin problemas de contraste | ✅ | verificado numéricamente (todos ≥ AA) |
| Sin errores de tipografía | ✅ | Inter/Manrope aplicadas vía variables correctas |
| Sin fallos de navegación | ✅ | rutas descubribles; anclas + páginas |
| Sin problemas de performance significativos | ⚠ | causas atacadas (hero −96%, framer fuera, ISR); falta medir Lighthouse en Preview |
| Código mantenible | ✅ | sin `any`, tipos unificados, dead code neutralizado, env validado |
| Entregable a un cliente profesional | ✅ | tras los pasos de deploy del owner (env + build) |

## Veredicto
Los **9 bloqueantes** del dictamen previo están **resueltos en código** (fuentes, CTA, error boundaries, `/studio`, hero, huérfanas, CMS/imágenes, SEO/OG, foco). Firmo el release **condicionado a** los tres pasos finales del owner que este entorno no me permitió ejecutar: `npm install` + `npm run build` verde en Vercel Preview, medición Lighthouse, y `NEXT_PUBLIC_WHATSAPP_NUMBER` real en Vercel. Con eso, **esta versión sí la compartiría con un cliente y la publicaría en producción.**
