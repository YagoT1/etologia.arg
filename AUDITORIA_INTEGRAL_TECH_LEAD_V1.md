# Auditoría integral — Etología Argentina

**Rol:** Staff Software Architect / Tech Lead responsable del go/no-go a producción
**Alcance:** repositorio completo (Next.js 15.5 · React 19 · TypeScript · Tailwind 3.4 · Sanity 3.99 · framer-motion)
**Método:** revisión de código fuente real (no supuestos). Cada hallazgo cita archivo. Contrastes verificados numéricamente (WCAG 2.x).
**Veredicto de una línea:** base técnica sólida y copy excelente, pero **no está listo para producción** por bugs silenciosos que rompen la propuesta de valor (fuentes de marca no aplicadas, CTA de WhatsApp degradado, OG rota, CMS no consumido por la landing).

---

## 🔴 Problemas críticos — corregir antes de publicar

### C1. Las fuentes de marca (Inter/Manrope) NO se están aplicando
`app/layout.tsx` carga las fuentes como variables `--font-inter` y `--font-manrope`. Pero `tailwind.config.ts` declara la familia con `var(--font-heading)` y `var(--font-body)`, variables que **no se definen en ningún lado**. Resultado: todo el sitio renderiza con el fallback `sans-serif` del sistema. Toda la escala tipográfica cuidada (clamp, letter-spacing, pesos) se aplica sobre la fuente equivocada.
**Impacto:** branding. Una web que "vende confianza" está mostrando tipografía genérica del navegador. Es el bug más caro del repo porque invalida el trabajo de diseño.
**Fix:** mapear en `layout.tsx` las variables a las que Tailwind espera (`variable: '--font-body'` / `'--font-heading'`) o exponer los nombres reales en `globals.css` (`:root { --font-heading: var(--font-manrope); --font-body: var(--font-inter) }`).

### C2. El CTA principal (WhatsApp) se degrada en silencio
`lib/contact.ts`: si `NEXT_PUBLIC_WHATSAPP_NUMBER` está vacío, `buildWhatsAppUrl()` devuelve `'/contact'`. En `config/site.ts` el default es `''`. No hay `.env.example` ni documentación de variables requeridas.
**Impacto:** conversión. Si la variable no se setea en producción (probable, dado que no está documentada), **todos los botones "Consultar por WhatsApp"** —hero, header, sticky móvil, CTA final— llevan a `/contact` en vez de abrir WhatsApp. El canal de conversión primario deja de funcionar sin ningún error visible.
**Fix:** crear `.env.example`, validar la variable en build (fallar el build si falta en prod), y que el fallback sea explícito, no un silencioso cambio de destino.

### C3. La imagen Open Graph no existe
`lib/seo.ts` referencia `siteConfig.defaultOgImage = '/og/default-og.jpg'`. No existe la carpeta `public/og`. Todas las metadatas de OG y Twitter Card apuntan a un 404.
**Impacto:** SEO/branding. Al compartir cualquier link (WhatsApp, Instagram, Google) no aparece imagen ni preview. Para un negocio que vive de la recomendación, es una pérdida directa de credibilidad.
**Fix:** generar la imagen OG (o usar `opengraph-image.tsx` dinámico de Next 15).

### C4. Fallback de `projectId` de Sanity hardcodeado en el código
`sanity/env.ts` tiene `?? 'a1bhfmpi'`. Esto (a) filtra el projectId al repositorio y (b) anula la comprobación "variable requerida" — el `throw` nunca se ejecuta porque siempre hay un valor.
**Impacto:** seguridad/mantenibilidad. Un entorno mal configurado apunta silenciosamente a un proyecto Sanity que no debería, en vez de fallar rápido.
**Fix:** eliminar el fallback; que falte la env sea un error de build.

### C5. La landing no consume el CMS que se construyó
Existen schemas de Sanity para `service`, `testimonial`, `faq`, `highlightedContent` y `globalConfig`, pero `app/(site)/page.tsx` tiene **todo el contenido hardcodeado** en arrays (`cases`, `testimonials`, `faqItems`, `reels`…). El CMS solo alimenta el blog.
**Impacto:** el objetivo declarado del proyecto (contenido editable por la clínica) no se cumple en la página que más importa. La dueña no puede tocar un testimonio, una FAQ o un caso sin un deploy.
**Fix:** conectar la landing a las queries de Sanity antes de considerar "fase CMS" terminada, o admitir explícitamente que la landing es estática por decisión.

---

## 🟠 Problemas importantes — no bloquean, pero bajan la calidad

### I1. Anillo de foco por debajo del mínimo WCAG 2.2 (verificado)
`globals.css` usa `:focus-visible { ring-primary-soft }` (#A8B5A2). Contraste medido contra el fondo #F7F4EE = **1.95:1**; WCAG 2.2 exige **3:1** para indicadores de foco. El `shadow-focus` de botones (`rgb(168 181 162 / 0.45)`) es aún más débil.
**Fix:** usar `primary` (#4E5B52) o un tono más oscuro para el anillo. (El contraste de *texto*, en cambio, está bien: cuerpo 6.5:1, badge 5.9:1, botón WhatsApp 4.79:1 — todos ≥ AA.)

### I2. i18n a medio construir (código muerto que confunde)
`config/i18n.ts`, `lib/i18n.ts`, `hooks/use-locale.ts`, `messages/es.json`, `messages/en.json` existen, pero **nada de esto está cableado**: no hay middleware, `getMessages` no se importa en ninguna parte, y `/en` (`app/(site)/en/page.tsx`) es un stub de una línea. Peor: `messages/es.json` dice hero "Etología clínica con enfoque emocional", texto que ya no coincide con la landing real → contenido stale.
**Impacto:** mantenibilidad y SEO (el `/en` indexable y vacío perjudica). Un dev nuevo pierde tiempo asumiendo que hay i18n.
**Fix:** decisión binaria — implementar i18n de verdad (routing + hreflang + alternates) o borrar todo el andamiaje y el `/en` hasta que se necesite (YAGNI).

### I3. Metadata por página inexistente
`about`, `contact`, `blog` y `blog/[slug]` no exportan `metadata` ni `generateMetadata`. Todas heredan el título/description del root → **misma etiqueta en todo el sitio**. El post de blog incluso *pide* `seoTitle`/`seoDescription` a Sanity (`queries.ts`) pero no los usa para nada.
**Fix:** `generateMetadata` en el post usando los campos SEO ya disponibles; metadata propia en about/contact/blog; `alternates.canonical` por ruta.

### I4. Sitemap no incluye los artículos del blog
`app/sitemap.ts` es una lista estática que además incluye `/en` (stub). Los posts de Sanity —el único contenido dinámico real— no entran al sitemap. `lastModified: new Date()` marca todo como modificado "ahora" siempre.
**Fix:** hacer el sitemap async y mapear los slugs de `getPosts()`; usar `publishedAt` como `lastModified`.

### I5. El blog usa clases `prose` sin el plugin de tipografía
`blog/[slug]/page.tsx` renderiza el body con `className="prose prose-neutral"`, pero `@tailwindcss/typography` **no está instalado** (`tailwind.config.ts` → `plugins: []`). El cuerpo del artículo sale sin estilos de tipografía enriquecida.
**Fix:** instalar el plugin, o serializar PortableText con componentes propios del design system.

### I6. `cn()` no resuelve colisiones de Tailwind
`lib/utils.ts` es un `filter(Boolean).join(' ')`. No hace merge. En `Button`, pasar `className="bg-..."` no sobrescribe la variante de forma fiable (ganan las dos clases; el resultado depende del orden en el CSS). Es una trampa latente.
**Fix:** `tailwind-merge` (`twMerge(clsx(...))`), patrón estándar de shadcn.

### I7. Imagen hero de 2.0 MB en PNG
`public/images/img-hero.png` pesa 2 MB en formato PNG (formato equivocado para una foto). Es `priority`, o sea LCP. Next optimiza on-the-fly, pero el origen pesado encarece build/procesamiento y el `sizes` no está declarado.
**Fix:** origen en WebP/AVIF (~150–300 KB), y añadir `sizes` al `<Image fill>`.

### I8. `styled-components` como dependencia sin uso aparente
`package.json` lista `styled-components` (peso considerable, runtime CSS-in-JS que choca con RSC). No se importa en el código de aplicación; probablemente arrastre de Sanity Studio.
**Fix:** confirmar si Studio lo requiere; si no, quitarlo.

---

## 🟡 Mejoras recomendadas

- **Código muerto:** `ServiceCard`, `TestimonialCard`, `ContentCard` (`ui/card.tsx`), `ReelPreviewCard`, `Input`, `Divider`, `FadeIn`, `Stagger` — ninguno se usa; la página construye cards inline. Borrar o adoptar. La constante `L2_SURFACE` está duplicada en `card.tsx` y `reel-preview-card.tsx`.
- **Tokens de superficie inconsistentes:** la landing mezcla `bg-surface/70`, `/60`, `/80`, `bg-background/80`, `bg-primary/[0.04]` sin sistema de elevación explícito. Definir L1/L2/L3 y usarlos; hoy el ritmo visual de fondos es ligeramente turbio.
- **Cards inline repetidas:** el patrón `rounded-xl border border-border bg-… p-… shadow-soft` se repite ~8 veces en `page.tsx`. Extraer a un componente resuelve consistencia y reduce el archivo.
- **Tipado débil:** `body?: any[]` en `queries.ts`; `types/cms.ts` define un `Post` mínimo que duplica/contradice `BlogPost`. Unificar y tipar PortableText (`PortableTextBlock[]`).
- **Botón externo:** `Button` detecta externo con `href.startsWith('http')` y renderiza `<a>` sin `target`/`rel="noopener"`. WhatsApp abre en la misma pestaña.
- **Ícono hamburguesa:** en `header.tsx` son solo 2 barras → parece un signo "=", no un menú. Añadir la tercera barra.
- **Menú móvil sin foco atrapado:** abre/cierra con `hidden`, sin trap ni cierre con `Esc`. Aceptable, mejorable.
- **`framer-motion`** se incluye (y se optimiza en `next.config`) para animaciones que no están cableadas en la página. O se usan o se remueve la dependencia.
- **Sin tests ni CI:** cero cobertura, sin workflow de GitHub Actions. Para salud a 10 años, mínimo typecheck+lint+build en CI.
- **Schema.org pobre:** `ProfessionalService` sin `telephone`, `image`, `logo`, `sameAs` (Instagram), `address`/`areaServed` estructurado. Falta `Article`/`BreadcrumbList` en el blog.

---

## 🟢 Buenas decisiones (y por qué)

- **Arquitectura de carpetas limpia y por responsabilidad:** `ui/` (átomos) · `sections/` · `layout/` · `lib/` · `config/` · `sanity/`. Route group `(site)` separa el shell público del `/studio`. Escala bien.
- **Server Components por defecto, `'use client'` quirúrgico:** solo `header`, `faq-accordion`, `studio` y animaciones son cliente. Uso correcto de RSC en Next 15.
- **Design tokens bien pensados en Tailwind:** escala tipográfica con `clamp()`, spacing de sección fluido, sombras semánticas (`soft`/`card`/`focus`), radios y z-index nombrados. La *definición* del sistema es de buen nivel (el problema es la aplicación, C1).
- **Accesibilidad base correcta:** `focus-visible` global, `prefers-reduced-motion` respetado, `aria-expanded`/`aria-controls` en header y FAQ, `sr-only`, `alt` descriptivo en el hero, semántica `<header><main><footer>`, `<ol>` para el proceso.
- **Contraste de texto real ≥ AA** en todos los pares medidos — decisión de paleta acertada.
- **Copywriting sobresaliente:** tono clínico, empático, argentino, orientado a objeciones (miedo, culpa, "no sé cómo nombrarlo"). Estructura de conversión completa: hero → casos → autoridad → consulta → método → prueba social → FAQ → CTA. Es el mayor activo del proyecto.
- **Detalles de UX móvil cuidados:** sticky CTA + `mb-20` en footer para no solaparlo; targets `min-h-12`. Se nota intención.
- **`strict: true`, ESLint `next/core-web-vitals`, fuentes self-hosted** (sin llamadas a Google Fonts): decisiones correctas de base.

---

## 📈 Evaluación final (1–10)

| Aspecto | Nota | Comentario |
|---|---|---|
| Arquitectura | 8 | Estructura limpia, RSC bien usados. Resta consumir el CMS. |
| Código | 6 | Buenas bases, pero código muerto, `any`, `cn()` naive, duplicación. |
| UI | 6.5 | Buen gusto y jerarquía, pero fuentes rotas (C1) e inconsistencia de superficies. |
| UX | 8 | Recorrido claro, baja carga cognitiva, CTA omnipresente. |
| Accesibilidad | 7 | Semántica y contraste de texto correctos; falla el foco (I1). |
| SEO | 4.5 | Base OK, pero OG rota, sin metadata por página, sitemap sin blog. |
| Performance | 6 | RSC + fuentes locales bien; hero 2 MB PNG y deps sin uso pesan. |
| Branding | 6 | Copy de 9, pero C1/C3 hacen que se perciba por debajo de su potencial. |
| Escalabilidad | 7.5 | Tokens + estructura escalan; i18n a medio hacer resta. |
| Mantenibilidad | 6 | Legible, pero código muerto, i18n fantasma y projectId hardcodeado. |
| Conversión | 5.5 | Estructura CRO fuerte, socavada por el CTA degradado (C2). |
| **Calidad general** | **6.5** | Proyecto prometedor a un sprint de ser genuinamente profesional. |

---

## Roadmap priorizado

Orden por **impacto en usuario/negocio ÷ esfuerzo**. Primero lo que hoy rompe la propuesta de valor con muy poco trabajo.

**Fase 0 — Bloqueantes de lanzamiento (medio día)**
1. **C2 · CTA WhatsApp** — setear/validar la env y `.env.example`. *Sin esto el sitio no convierte; es lo primero.*
2. **C1 · Fuentes de marca** — mapear las variables. *Cambia la percepción de todo el sitio con un cambio de 3 líneas: máximo ROI.*
3. **C3 · Imagen OG** — generar el asset (o `opengraph-image.tsx`). *Cada vez que alguien comparte el link, hoy se pierde.*
4. **C4 · projectId hardcodeado** — quitar fallback. *Riesgo de seguridad/config, fix trivial.*

**Fase 1 — Confianza y SEO (1–2 días)**
5. **I1 · Anillo de foco 3:1** — accesibilidad, obligación legal en salud.
6. **I3 + I4 · Metadata por página + sitemap dinámico + canonical** — visibilidad orgánica, el canal más barato de captación.
7. **I2 · Decidir i18n** — implementar o borrar (incluido `/en`). *Elimina un `/en` vacío indexable y deuda conceptual.*
8. **I5 · Estilos del blog** — plugin typography o serializador propio.

**Fase 2 — Cumplir la promesa del CMS (2–4 días)**
9. **C5 · Conectar landing ↔ Sanity** (casos, testimonios, FAQ, config global). *Da autonomía a la clínica; es la razón de haber integrado Sanity.*
10. **I7 · Optimizar hero** a AVIF/WebP + `sizes`. Mejora LCP móvil.

**Fase 3 — Salud del código a largo plazo (1–2 días)**
11. Borrar código muerto, deduplicar `L2_SURFACE`, extraer componente Card, tipar PortableText (I6, mejoras 🟡).
12. `tailwind-merge`, `rel/target` en botón externo, ícono hamburguesa, `styled-components` si sobra.
13. CI mínimo (typecheck + lint + build) y schema.org enriquecido.

**Justificación del orden:** la Fase 0 son bugs invisibles que anulan branding y conversión —el propósito mismo de la web— a costo casi nulo, así que van primero. La Fase 1 protege confianza (accesibilidad legal en salud) y activa el canal orgánico. La Fase 2 recién entrega la autonomía editorial prometida, que aporta valor continuo pero no bloquea el lanzamiento. La Fase 3 asegura que "otro equipo lo mantenga durante diez años" sin fricción.

---

### Nota de honestidad técnica
Este proyecto **no es una landing genérica**: el copy y la intención de UX están por encima del promedio del rubro. El problema es la brecha entre *diseño definido* y *diseño aplicado* — varios sistemas quedaron a mitad de cableado (fuentes, i18n, CMS, OG). Cerrar la Fase 0 lo lleva de "prototipo avanzado" a "producto publicable" en menos de un día de trabajo enfocado.
