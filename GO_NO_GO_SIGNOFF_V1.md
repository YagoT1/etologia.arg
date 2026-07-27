# Dictamen de lanzamiento (Go / No-Go) — Etología Argentina

**Responsable técnico del release:** Lead Engineer (firma de aprobación)
**Contexto:** decisión vinculante. La web será usada por clientes reales; mi reputación depende de que funcione durante años.
**Método:** revisión completa del repositorio + verificaciones ejecutadas (dimensiones de imagen, archivos de error, exposición de `/studio`, render de imágenes de CMS, descubribilidad de rutas, contraste numérico WCAG).

## Decisión

# 🔴 NO-GO — la publicación queda BLOQUEADA.

No firmo este lanzamiento hoy. Hay defectos que un cliente o un usuario notarían en los primeros 30 segundos y que proyectan "en desarrollo". El detalle, la justificación de la decisión y la checklist de desbloqueo están abajo.

---

## Bloqueantes (cada uno, por sí solo, impide publicar)

Formato por hallazgo: **Gravedad · Impacto · Prioridad · Archivo · Explicación · Solución + código.**

---

### B1 — Las fuentes de marca no se aplican en TODO el sitio
- **Gravedad:** Crítica · **Impacto:** Branding/UI global · **Prioridad:** P0
- **Archivo:** `app/layout.tsx` + `tailwind.config.ts`
- **Explicación:** `layout.tsx` expone `--font-inter` y `--font-manrope`. Tailwind (`fontFamily.heading/body`) consume `var(--font-heading)` y `var(--font-body)`, **que no existen**. Todo renderiza con `sans-serif` del sistema. La escala tipográfica (clamp, tracking, pesos) se aplica sobre la fuente equivocada. Un estudio profesional nunca entrega esto.
- **Solución:** alinear los nombres de variable.

```ts
// app/layout.tsx
const inter = localFont({ src: [...], variable: '--font-body' });      // era --font-inter
const manrope = localFont({ src: [...], variable: '--font-heading' }); // era --font-manrope
// <html className={`${inter.variable} ${manrope.variable}`}>
```

---

### B2 — El CTA de conversión (WhatsApp) puede caer en silencio
- **Gravedad:** Crítica · **Impacto:** Conversión (el objetivo del sitio) · **Prioridad:** P0
- **Archivo:** `lib/contact.ts`, `config/site.ts`
- **Explicación:** si `NEXT_PUBLIC_WHATSAPP_NUMBER` está vacío (default `''`, sin `.env.example` ni validación), `buildWhatsAppUrl()` devuelve `'/contact'`. Todos los botones "Consultar por WhatsApp" (hero, header, sticky, CTA final) dejan de abrir WhatsApp y van a `/contact`, sin error visible. Un negocio de referidos pierde el 100% de los clics del canal principal.
- **Solución:** validar la env en arranque y documentarla; nunca degradar el destino en silencio.

```ts
// config/site.ts — fail fast en server
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
if (!whatsapp && process.env.NODE_ENV === 'production') {
  throw new Error('Falta NEXT_PUBLIC_WHATSAPP_NUMBER');
}
```
Crear `.env.example` con `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`.

---

### B3 — No hay manejo de errores ni estados de carga (app entera)
- **Gravedad:** Crítica · **Impacto:** UX/percepción profesional · **Prioridad:** P0
- **Archivo:** ausencia de `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx`, `app/(site)/blog/loading.tsx`
- **Explicación:** el blog hace `await getPosts()` / `getPostBySlug()` contra Sanity. Si el CDN falla, la red cae o el dato está mal, la excepción sube sin capturar → **el usuario ve la pantalla de error genérica de Next** (o un stack en dev). `notFound()` en el post renderiza el 404 por defecto, sin diseño. No hay `loading.tsx` → navegación sin feedback. Esto es exactamente lo que hace que un sitio parezca "en desarrollo".
- **Solución:** agregar los cuatro archivos con el diseño del sistema.

```tsx
// app/(site)/not-found.tsx
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
export default function NotFound() {
  return (
    <section className="section-sm">
      <Container className="max-w-2xl text-center">
        <p className="type-label text-muted-foreground">Error 404</p>
        <h1 className="mt-4 type-h1">No encontramos esta página</h1>
        <p className="mt-4 type-body-lg text-muted-foreground">
          Puede que el enlace haya cambiado. Volvé al inicio o escribime.
        </p>
        <Button href="/" className="mt-8">Volver al inicio</Button>
      </Container>
    </section>
  );
}
```
Análogo para `error.tsx` (`'use client'` + `reset()`), `global-error.tsx` y un `loading.tsx` con skeletons en el blog.

---

### B4 — El admin de Sanity (`/studio`) es público e indexable
- **Gravedad:** Crítica · **Impacto:** Seguridad + SEO + percepción · **Prioridad:** P0
- **Archivo:** `app/robots.ts`, `app/studio/[[...index]]/page.tsx`
- **Explicación:** `robots.ts` hace `allow: '/'` sin excluir `/studio`. La consola de administración del CMS queda rastreable por Google y accesible en la URL pública. Además `sitemap` no la excluye. Que un cliente encuentre "el panel de administración" indexado destruye la percepción de seriedad.
- **Solución:**

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio', '/studio/'] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```
Y `metadata: { robots: { index: false } }` en el layout del studio.

---

### B5 — La imagen hero se recorta mal y pesa 2 MB
- **Gravedad:** Alta · **Impacto:** UI (primera impresión) + LCP · **Prioridad:** P0
- **Archivo:** `app/(site)/page.tsx`, `public/images/img-hero.png`
- **Explicación:** verificado — la foto es **landscape 1672×941**, pero el contenedor es `aspect-[4/5]` (retrato) con `object-cover`. Se recorta ~40% de la imagen y la composición original se pierde. Además es un **PNG de 2 MB** (formato equivocado para foto) y es el LCP (`priority`), sin `sizes`.
- **Solución:** usar un recorte pensado para retrato (o cambiar el contenedor a `aspect-[4/3]`), exportar a AVIF/WebP (~150–300 KB) y declarar `sizes`.

```tsx
<Image
  src="/images/img-hero.avif"
  alt="MV Agustina Gasparini, médica veterinaria especializada en etología clínica"
  fill priority
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover object-center"
/>
```
(Nota: el `alt` actual describe el servicio, no a la profesional; conviene nombrarla para autoridad/branding.)

---

### B6 — Páginas huérfanas: /about, /blog y /contact no son alcanzables desde el home
- **Gravedad:** Alta · **Impacto:** UX + SEO (crawl) + conversión · **Prioridad:** P0
- **Archivo:** `components/layout/header.tsx`, `components/layout/footer.tsx`
- **Explicación:** en la home el `NAV_BY_PATH['/']` sólo tiene anclas (`#casos`, `#consulta`, `#metodo`, `#faq`). **No existe un solo enlace a `/about`, `/blog` o `/contact` desde la portada**, y el footer no tiene navegación. Un usuario que quiere "conocer a la profesional" o "leer el blog" no puede. Google tampoco descubre esas rutas por enlaces internos. Es el tipo de hueco que sólo se nota al recorrer el sitio como usuario.
- **Solución:** footer con navegación real + incluir "Sobre mí"/"Blog" en el header (o un enlace persistente). Ejemplo de footer:

```tsx
// añadir enlaces a / , /about , /blog , /contact + WhatsApp + Instagram
<nav aria-label="Navegación de pie" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
  <Link href="/about">Sobre mí</Link>
  <Link href="/blog">Blog</Link>
  <Link href="/contact">Contacto</Link>
</nav>
```

---

### B7 — El CMS está incompleto: la landing no lo usa y `featuredImage` nunca se muestra
- **Gravedad:** Alta · **Impacto:** Valor del CMS + mantenimiento · **Prioridad:** P1
- **Archivo:** `app/(site)/page.tsx`, `sanity/queries.ts`, `app/(site)/blog/**`
- **Explicación:** (a) casos, testimonios, FAQ y reels están **hardcodeados** en `page.tsx` pese a existir schemas `testimonial/faq/service/highlightedContent`. La clínica no puede editar nada sin deploy. (b) Ambas queries piden `featuredImage`, pero **no hay `@sanity/image-url` ni `urlFor`**, así que la imagen nunca se renderiza: campo muerto y artículos sin portada. El CMS hoy es una integración a medias.
- **Solución:** conectar la landing a Sanity (al menos testimonios y FAQ, que cambian seguido) y renderizar imágenes con el builder:

```ts
// sanity/lib.image.ts
import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './env';
const builder = createImageUrlBuilder({ projectId, dataset });
export const urlForImage = (src: any) => builder.image(src);
```
```tsx
{post.featuredImage && (
  <Image src={urlForImage(post.featuredImage).width(1200).height(675).url()}
         alt={post.title} width={1200} height={675} className="rounded-xl" />
)}
```

---

### B8 — SEO por página inexistente + OG rota + sitemap sin blog
- **Gravedad:** Alta · **Impacto:** SEO/branding en compartidos · **Prioridad:** P1
- **Archivos:** `lib/seo.ts`, `app/(site)/**`, `app/sitemap.ts`
- **Explicación:**
  1. `defaultOgImage = '/og/default-og.jpg'` **no existe** (no hay `public/og`) → previews rotas al compartir en WhatsApp/redes.
  2. `about`, `contact`, `blog`, `blog/[slug]` **no exportan metadata** → todas comparten título/description del root. El post fetchea `seoTitle`/`seoDescription` y no los usa.
  3. `sitemap.ts` es estático, no incluye los posts y sí incluye `/en` (stub). `lastModified: new Date()` siempre "ahora".
  4. Sin `alternates.canonical`.
- **Solución:** crear `app/opengraph-image.tsx` (OG dinámico), `generateMetadata` en el post, `metadata` propia por página, y sitemap async:

```ts
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticRoutes = ['', '/about', '/blog', '/contact'].map((p) => ({
    url: `${siteConfig.url}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.7,
  }));
  const postRoutes = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const, priority: 0.6,
  }));
  return [...staticRoutes, ...postRoutes];
}
```

---

### B9 — Indicador de foco por debajo de WCAG 2.2 (accesibilidad legal en salud)
- **Gravedad:** Alta · **Impacto:** Accesibilidad AA · **Prioridad:** P1
- **Archivo:** `styles/globals.css`, `tailwind.config.ts`
- **Explicación:** `:focus-visible` usa `ring-primary-soft` (#A8B5A2) = **1.95:1** contra el fondo; WCAG 2.2 (1.4.11 / 2.4.13) exige **≥3:1**. El `shadow-focus` de botones (verde al 45%) es aún más débil. Un usuario por teclado no ve dónde está parado. (El contraste de *texto* sí cumple AA — cuerpo 6.5:1, badge 5.9:1 — no requiere cambios.)
- **Solución:** anillo con `primary` (#4E5B52 = 6.5:1) y foco visible en botones.

```css
:focus-visible { @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-background; }
```

---

## Deuda técnica que exijo resolver antes de compartir (no bloqueante duro, sí obligatoria para "producto terminado")

| # | Archivo | Problema | Gravedad | Prioridad |
|---|---------|----------|----------|-----------|
| D1 | `sanity/env.ts` | `projectId` con fallback hardcodeado `'a1bhfmpi'`: filtra el id y anula el `throw` de "env requerida". | Media | P1 |
| D2 | `config/i18n.ts`, `lib/i18n.ts`, `hooks/use-locale.ts`, `messages/*`, `app/(site)/en/page.tsx` | i18n fantasma: nada cableado, `getMessages` sin usar, `/en` es un stub indexable, `messages/es.json` con copy stale. Implementar o borrar (YAGNI) y quitar `/en` del sitemap. | Media | P1 |
| D3 | `blog/[slug]/page.tsx` | `prose prose-neutral` sin `@tailwindcss/typography` instalado → body sin estilo. | Media | P1 |
| D4 | `lib/utils.ts` | `cn()` es `join`, no hace merge de Tailwind → `className` no sobrescribe variantes de forma fiable. Usar `tailwind-merge`. | Media | P2 |
| D5 | `components/ui/card.tsx`, `reel-preview-card.tsx`, `input.tsx`, `divider.tsx`, `animations/*` | Código muerto: `ServiceCard/TestimonialCard/ContentCard/ReelPreviewCard/Input/Divider/FadeIn/Stagger` sin uso; `L2_SURFACE` duplicado. Borrar o adoptar. | Media | P2 |
| D6 | `sanity/queries.ts`, `types/cms.ts` | `body?: any[]` (tipado débil); `Post` duplica/contradice `BlogPost`. Tipar `PortableTextBlock[]` y unificar. | Media | P2 |
| D7 | `components/ui/button.tsx` | Enlace externo sin `target="_blank"`/`rel="noopener noreferrer"`; base tiene `disabled:` pero nunca recibe `disabled`. | Baja | P2 |
| D8 | `components/layout/header.tsx` | El ícono "hamburguesa" son 2 barras → parece "="; menú móvil sin `Esc` ni focus trap. | Baja | P2 |
| D9 | `next.config.ts` + build | Sin **security headers** (CSP, `X-Content-Type-Options`, `Referrer-Policy`, HSTS) vía `headers()`. | Media | P1 |
| D10 | raíz | Sin CI (typecheck+lint+build), sin tests, sin `.nvmrc`/`engines`. Para mantener 10 años, mínimo un workflow. | Media | P2 |
| D11 | `styled-components` en `package.json` | Dependencia pesada sin uso en app (verificar si Studio la necesita); si no, quitar. | Baja | P3 |
| D12 | `lib/schema.ts` | `ProfessionalService` sin `image`, `logo`, `sameAs` (Instagram), `telephone`, `address`. Enriquecer para EEAT. | Baja | P2 |

---

## Objeciones de conversión sin resolver (visión CRO)
- **Sin credenciales verificables:** no aparece matrícula profesional, universidad, años de experiencia ni foto/nombre en el schema.org. La autoridad se afirma pero no se prueba.
- **Testimonios anónimos:** correcto para privacidad, pero débiles como prueba social; sumar (con permiso) inicial + foto de la mascota, o cantidad de familias acompañadas.
- **Reels que no enlazan:** la sección "Instagram" son tarjetas de texto sin link real → promesa incumplida, resta credibilidad.
- **Sin expectativa de respuesta:** no se dice "respondo en X horas", lo que aumenta la fricción de escribir.
- **Un solo canal (WhatsApp):** bien para fricción, pero si el usuario no usa WhatsApp no hay alternativa (email/formulario).

---

## Justificación de la decisión NO-GO
Ninguno de B1–B9 es cosmético: B1 rompe la identidad visual completa, B2 puede anular la conversión sin avisar, B3 expone pantallas de error crudas, B4 indexa el panel de administración, B5 muestra una foto mal recortada como primera impresión, y B6 deja páginas inalcanzables. Cualquiera de ellos, visto por el cliente, dispara la pregunta "¿esto está terminado?". Firmar hoy comprometería mi responsabilidad sobre el release.

---

## Checklist de desbloqueo (en orden exacto de ejecución)

El orden maximiza impacto percibido ÷ esfuerzo y respeta dependencias.

**Bloque 0 — Config y seguridad (≈2 h)**
1. `.env.example` + validación fail-fast de `NEXT_PUBLIC_WHATSAPP_NUMBER` (B2).
2. Quitar fallback de `projectId` en `sanity/env.ts` (D1).
3. `robots.ts`: `disallow: ['/studio']` + `noindex` en layout del studio (B4).
4. `next.config.ts`: `headers()` con CSP básica, `X-Content-Type-Options`, `Referrer-Policy`, HSTS (D9).

**Bloque 1 — Identidad visual y primera impresión (≈2 h)**
5. Mapear `--font-heading`/`--font-body` (B1).
6. Anillo de foco `ring-primary` (B9).
7. Hero: recorte retrato correcto + export AVIF/WebP + `sizes` + `alt` con nombre (B5).

**Bloque 2 — Robustez y navegación (≈3 h)**
8. `not-found.tsx`, `error.tsx`, `global-error.tsx`, `blog/loading.tsx` con diseño del sistema (B3).
9. Footer con navegación + enlaces en header a /about y /blog (B6).
10. Instalar `@tailwindcss/typography` y estilar el post (D3).

**Bloque 3 — SEO (≈3 h)**
11. `opengraph-image.tsx` dinámico (elimina OG rota) (B8.1).
12. `generateMetadata` en post (usa `seoTitle/seoDescription`) + `metadata` en about/contact/blog + `canonical` (B8.2, B8.4).
13. `sitemap.ts` async con posts, sin `/en` (B8.3).
14. Enriquecer `schema.org` (D12).

**Bloque 4 — CMS real (≈1 día)**
15. `sanity/lib.image.ts` + render de `featuredImage` en blog (B7b).
16. Conectar landing a Sanity: testimonios y FAQ como mínimo (B7a).

**Bloque 5 — Decisión i18n y limpieza (≈3 h)**
17. Implementar o **eliminar** i18n + `/en` + `messages/*` (D2).
18. `tailwind-merge` en `cn()` (D4); borrar código muerto y `L2_SURFACE` duplicado (D5); tipar PortableText y unificar `Post`/`BlogPost` (D6).
19. `target`/`rel` en botón externo (D7); ícono hamburguesa + `Esc` en menú (D8); revisar `styled-components` (D11).

**Bloque 6 — Verificación de release (≈2 h)**
20. CI: workflow con `typecheck` + `lint` + `build` (D10).
21. Lighthouse (móvil) sobre home y post: LCP < 2.5 s, CLS < 0.1, INP < 200 ms; corregir desvíos.
22. Recorrido manual por teclado y con lector de pantalla en las 5 rutas.

---

## Re-evaluación proyectada (con la checklist completa)

| Aspecto | Hoy | Post-checklist |
|---|---|---|
| Arquitectura | 8 | 9 |
| Código | 6 | 8.5 |
| UI | 6.5 | 8.5 |
| UX | 8 | 9 |
| Accesibilidad | 7 | 9 |
| SEO | 4.5 | 9 |
| Performance | 6 | 8.5 |
| Branding | 6 | 8.5 |
| Escalabilidad | 7.5 | 9 |
| Mantenibilidad | 6 | 8.5 |
| Conversión | 5.5 | 8.5 |
| **Global** | **6.5** | **8.7** |

Con los Bloques 0–3 completos (≈1,5 días) el sitio ya sería **presentable a un cliente**. Con 0–6 (≈3 días) sería **publicable en producción** con respaldo técnico.

---

## Veredicto final

**Todavía no la compartiría con un cliente.**

Justificación: en su estado actual el proyecto tiene fuentes de marca que no cargan, un CTA de conversión que puede fallar sin aviso, sin páginas de error, con el panel de administración indexable, una foto principal mal recortada y páginas que no se pueden navegar. Son defectos que un cliente percibe de inmediato como "en desarrollo". Ejecutados los Bloques 0–3 de la checklist, revierto la decisión a **Go** y sí lo compartiría.
