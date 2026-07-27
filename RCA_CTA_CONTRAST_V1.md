# Causa raíz — La tarjeta CTA "Primer paso" se veía gris

**Investigado sobre el CSS realmente compilado (`tailwindcss` → salida real), no sobre lo que "debería" aplicar.**
No era un problema de color ni de tokens. Era la **cascada**: la clase que se quería aplicar nunca ganaba.

## 1. Causa raíz (dos defectos estructurales, ninguno de color)

### Defecto A — Colisión de clases de fondo (el dominante)
- `components/ui/card.tsx:5` — el componente `Card` **fija** `bg-surface` en su base:
  `cn('rounded-xl border border-border bg-surface p-6 shadow-soft transition …', className)`.
- `components/sections/cta-block.tsx:7` — `CtaBlock` usaba `<Card className="… bg-primary …">`.
- `lib/utils.ts` — `cn()` es un **`join()` ingenuo, sin `tailwind-merge`**. No resuelve conflictos:
  el elemento termina con **ambas** clases → `class="… bg-surface … bg-primary …"`.
- En el CSS compilado, con **igual especificidad (0,1,0)**, gana la regla que aparece **más tarde**:
  ```
  /tmp/out.css:1190  .bg-primary { background-color: rgb(62 74 66) }   ← #3E4A42 (verde, la buscada)
  /tmp/out.css:1209  .bg-surface { background-color: rgb(255 252 248) } ← #FFFCF8 (crema, MÁS TARDE → GANA)
  ```
  **Resultado real: el fondo de la tarjeta es crema `#FFFCF8`, no verde.** El `bg-primary` nunca se aplicó.

Sobre ese fondo crema, el label y el cuerpo usan `text-primary-foreground` (`#FCFBF8`, casi blanco):
**`#FCFBF8` sobre `#FFFCF8` = 1.01:1 → invisibles.** La tarjeta se percibe pálida/lavada = "gris".

### Defecto B — El `<h3>` ignora el color de la tarjeta
- `styles/globals.css:11` → compila a `/tmp/out.css:580`:
  ```
  h1,h2,h3,h4 { color: rgb(35 35 35) }   /* #232323, especificidad (0,0,1), @layer base */
  ```
- `components/sections/cta-block.tsx:14` — el `<h3>` **no tenía ninguna clase de color**.
  Una regla que fija `color` **directamente sobre el elemento** gana a la herencia del ancestro
  (`text-primary-foreground` del `Card`). Por eso el título se pintaba `#232323`.
- Único texto visible en la tarjeta crema → un título oscuro solitario. Y si el fondo hubiera sido
  verde, ese `#232323` sobre `#3E4A42` daría **1.69:1** (oscuro-sobre-oscuro, "barro"). En ambos
  escenarios el título rompe la percepción.

## 2 y 3. Archivo y línea exactos
| Defecto | Archivo | Línea |
|---|---|---|
| A (fondo colisiona) | `components/ui/card.tsx` (`bg-surface`) + `components/sections/cta-block.tsx:7` (`bg-primary`) + `lib/utils.ts` (`cn` sin merge) | 5 / 7 / 1 |
| B (h3 sin color) | `components/sections/cta-block.tsx:14` + `styles/globals.css:11` | 14 / 11 |

## 4. Regla CSS responsable (la ganadora del navegador)
- Fondo: **`.bg-surface { background-color: rgb(255 252 248) }`** (`out.css:1209`) gana a `.bg-primary` (`out.css:1190`) por orden de fuente.
- Título: **`h1,h2,h3,h4 { color: rgb(35 35 35) }`** (`out.css:580`, de `globals.css:11`) gana por ser regla directa sobre el `<h3>`.

## 5. Por qué los cambios anteriores no lo solucionaron
Los ajustes previos cambiaron **valores de tokens** (`primary`, `primary.foreground`, `muted.foreground`, `border`) y quitaron opacidades. Pero:
- `bg-primary` **nunca ganaba** (lo tapaba `bg-surface`), así que cambiar el valor de `primary` no tenía efecto visible en esta tarjeta.
- `text-primary-foreground` se aplicaba sobre un fondo **crema** → cambiar su valor lo dejaba igual de invisible.
- El `<h3>` tomaba su color de `foreground` (que no se tocó, y no debía tocarse).

En síntesis: **el problema nunca fue el color, sino qué regla ganaba la cascada.** Por eso "cambiar colores" no podía arreglarlo.

## 6. Modificación mínima aplicada
`components/sections/cta-block.tsx` (sin tocar tokens, colores, tamaños ni fuentes; se replicó el patrón de la tarjeta "Agustina" que sí renderiza bien):
1. Se reemplazó `<Card className="… bg-primary …">` por un `<div className="overflow-hidden rounded-xl border border-border bg-primary text-primary-foreground shadow-card">` → elimina la colisión `bg-surface` (el `div` no arrastra el fondo del componente `Card`).
2. Se añadió `text-primary-foreground` al `<h3>` (línea 14) → gana a la regla base `h1..h4`.
3. Se quitó el `import { Card }` que quedó sin uso.

## 7. Confirmación (equivalente DevTools, sobre el CSS/DOM reales)
Tras el cambio, el `<div>` de la tarjeta expone **una sola** regla de fondo:
```
class="overflow-hidden rounded-xl border border-border bg-primary text-primary-foreground shadow-card"
→ sin bg-surface  ⇒  background-color: rgb(62 74 66)  (#3E4A42 verde)   [regla ganadora, sin competidora]
```
El `<h3>` ahora incluye `text-primary-foreground` (especificidad 0,1,0, en `@layer utilities`, posterior a `@layer base`) → **gana** a `h1,h2,h3,h4` (0,0,1). Color computado del título: `rgb(252 251 248)` (#FCFBF8).

Contraste resultante (WCAG):
| Elemento | Color / fondo | Ratio | Nivel |
|---|---|---|---|
| Título h3 | `#FCFBF8` / `#3E4A42` | 8.97 | AAA |
| Label + cuerpo | `#FCFBF8` / `#3E4A42` | 8.97 | AAA |

`tsc` (typecheck) tras el cambio: **0 errores**. No cambió arquitectura, comportamiento, SEO ni rendimiento.

## Comparación exigida (tarjeta que sí funcionaba)
La tarjeta "Criterio clínico + sensibilidad familiar" (`app/(site)/page.tsx:227`) **siempre se vio bien** porque:
- Usa un `<div className="… bg-primary … text-primary-foreground">` plano (no el componente `Card`) → **sin colisión** de fondo.
- Su `<h3 className="type-h4 text-primary-foreground">` **sí** trae clase de color → escapa a la regla base.
Es exactamente el patrón que ahora también usa `CtaBlock`.

## Recomendación de hardening (no aplicada; requiere tu visto bueno)
La causa profunda es `cn()` sin `tailwind-merge`: cualquier `<Card className="bg-…">` que intente sobrescribir el fondo **fallará en silencio**. Hoy solo afectaba a `CtaBlock` (único consumidor de `Card` con fondo propio), y ya está resuelto. Para blindar el design system a futuro: `cn = (…c) => twMerge(clsx(c))`. Y opcionalmente, no fijar `color` en la regla base `h1..h4` (dejar heredar), para que los títulos sobre superficies oscuras no requieran clase explícita. Ambos son cambios sistémicos; los dejo señalados para que decidas.
