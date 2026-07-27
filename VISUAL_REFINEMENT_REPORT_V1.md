# Refinamiento visual — corrección sistémica de contraste y jerarquía

**Enfoque:** se corrigió el sistema de diseño (tokens), no los componentes uno por uno.
Un cambio en `tailwind.config.ts` propaga a todo el sitio porque los componentes usan clases
semánticas (`text-muted-foreground`, `text-primary`, `border-border`), no colores hardcodeados.

## 1. Archivos modificados
| Archivo | Cambio |
|---|---|
| `tailwind.config.ts` | 4 tokens de color + token de sombra de foco |
| `app/(site)/page.tsx` | 1 línea: se eliminó texto con opacidad (`text-primary-foreground/80` → sólido) |

Sólo dos archivos. Todo el resto del sitio mejora por herencia de tokens.

## 2. Tokens modificados
| Token | Antes | Ahora | Motivo |
|---|---|---|---|
| `muted.foreground` (tinta de cuerpo/secundario) | `#4E5B52` (6.5:1) | `#3B453E` (**9.1:1 AAA**) | Era el gris verdoso lavado. Es el token de la mayoría del texto (49 usos). |
| `primary` (verde de marca / CTA / links / foco) | `#4E5B52` | `#3E4A42` | Verde bosque más profundo: tarjetas y enlaces con más cuerpo. |
| `primary.foreground` (texto sobre verde) | `#F7F4EE` | `#FCFBF8` | Crema más brillante: texto sobre tarjeta oscura pasa de 6.9:1 a **9.0:1**. |
| `border` | `#DDD5C8` | `#D4CCBE` | Bordes de tarjetas/inputs más definidos, menos "lavados". |
| `boxShadow.focus` | anillo `rgb(78 91 82)` | `rgb(62 74 66)` | Coherencia con el nuevo `primary`. |

Ningún gris con contraste insuficiente queda en el sistema (`grep` de `text-gray/slate/zinc` y
texto con opacidad: **0 resultados**).

## 3. Componentes que mejoraron automáticamente (sin tocarlos)
**Por `muted.foreground` (49 usos en 17 archivos):**
`SectionHeader` (subtítulos y eyebrows), `Badge`, `FaqAccordion` (respuestas), `Footer`
(navegación y contacto), `Header` (nav), `Breadcrumbs`, `PortableBody` (cuerpo de artículos,
listas, citas), `Input` (placeholder), tarjetas de casos/beneficios/proceso/reels/testimonios
en la Home, `about`, `contact`, `blog` (lista y artículo), `error`, `not-found`.

**Por `primary` + `primary.foreground`:** `CtaBlock` y `MobileStickyCta`, tarjeta "Agustina"
de la Home, `Button` (variante primary), enlaces `text-primary` ("Leer artículo →", hover de
breadcrumbs), anillo de foco global.

**Por `border`:** todas las tarjetas, `Input`, `Divider`, borde del `Header`, separadores del `Footer`.

## 4. Cambios visuales esperados (por página)
- **Home:** el cuerpo de cada sección deja de verse gris; la tarjeta CTA "Primer paso" (la que
  señalaste) pasa a verde bosque con crema nítida y su subtexto ya no está atenuado. Eyebrows y
  badges (“Interpretación clínica”, “Criterio clínico”) más firmes. Jerarquía inmediata:
  título casi-negro (14.3:1) › subtítulo tinta (9.1:1, más grande) › cuerpo tinta.
- **Sobre mí:** intro y párrafo de la tarjeta con lectura cómoda; eyebrow "Sobre mí" más presente.
- **Blog (lista):** título de cada artículo fuerte, fecha y extracto legibles (antes muy tenues),
  enlace “Leer artículo →” con verde de marca más profundo.
- **Artículo:** cuerpo PortableText con tinta 9:1 para lectura de varios minutos; citas y listas
  con mejor color; breadcrumbs con jerarquía clara (actual oscuro › previos tinta).
- **Contacto:** intro legible, tarjeta CTA con el mismo tratamiento premium del verde profundo.
- **Global:** anillo de foco más visible; bordes de tarjetas mejor definidos; footer menos lavado.

## 5. Certificación de contraste (paleta final)
| Par | Ratio | Nivel |
|---|---|---|
| Título `#232323` / fondo | 14.3 | AAA |
| Cuerpo `#3B453E` / fondo | 9.1 | AAA |
| Cuerpo / tarjeta surface | 9.8 | AAA |
| Badge (`#3B453E`/`#EFE9E0`) | 8.3 | AAA |
| Link `#3E4A42` / fondo | 8.5 | AAA |
| Crema `#FCFBF8` / tarjeta `#3E4A42` | 9.0 | AAA |
| Botón WhatsApp `#F3FFF8`/`#3A7D5D` | 4.79 | AA |

Todo el texto de lectura queda en **AAA**. El botón de WhatsApp se mantiene deliberadamente en
verde vibrante (AA, texto grande semibold) para no apagar la acción de conversión principal.

## 6. Confirmaciones
- **Arquitectura:** sin cambios (mismos archivos, estructura y componentes).
- **Comportamiento funcional:** sin cambios (no se tocó lógica, rutas, estado ni datos).
- **SEO:** sin cambios (mismo HTML, headings, metadata, schema; sólo valores de color).
- **Rendimiento:** sin cambios (sólo hex en tokens; sin nuevas dependencias, sin JS, sin DOM extra).
- **Sólo se refinó la experiencia visual.**

## Criterio de éxito
- No quedan textos con contraste insuficiente (verificado por grep + cálculo WCAG). ✔
- Jerarquía tipográfica clara en todas las páginas (color + tamaño + peso de fuente heading). ✔
- Diseño consistente: un único sistema de tokens gobierna todo. ✔
- Profesionalismo desde el primer scroll: verde bosque profundo + tinta cálida, sin grises lavados. ✔
- Apto para entregar a un cliente sin commit correctivo posterior. ✔
