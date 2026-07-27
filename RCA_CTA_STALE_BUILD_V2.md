# Causa raíz REAL — tarjeta CTA con fondo blanco (evidencia de build, DOM y CSS compilado)

Esta vez no es análisis de código: es evidencia de los **artefactos reales de Next** (`.next/`),
del **DOM prerenderizado**, del **CSS compilado** y del **estilo computado por resolución de cascada**.

## Hallazgo decisivo (dos capas)

### Capa 1 — El bug de render (confirmado sobre artefactos reales)
DOM real prerenderizado por Next (`.next/server/app/index.html`), elemento de la tarjeta:
```html
<article class="rounded-xl border border-border bg-surface p-6 shadow-soft transition
                duration-300 ease-premium overflow-hidden bg-primary p-0 text-primary-foreground">
```
El `<article>` tiene **`bg-surface` y `bg-primary` a la vez** (el componente `Card` fija `bg-surface`;
`CtaBlock` le sumaba `bg-primary`; `cn()` no fusiona → conviven ambas).

CSS compilado real (`.next/static/css/07b3ac0162113556.css`), resolución de cascada:
```
lose    .bg-primary   spec(0,1,0)  order#186  -> rgb(78 91 82)     (#4E5B52)
WINNER  .bg-surface   spec(0,1,0)  order#190  -> rgb(255 252 248)  (#FFFCF8)
COMPUTED background-color = rgb(255 252 248)   ← BLANCO
```
Igual especificidad (0,1,0) → gana la **posterior** en el archivo (`.bg-surface`, order 190 > 186).
**Fondo computado = `#FFFCF8` (blanco).** Reproduce exactamente lo que ves.

### Capa 2 — Por qué "el arreglo anterior no funcionó" (la pieza que faltaba)
**El build que estás viendo es viejo.** No se recompiló después del arreglo.

| Artefacto / edición | Timestamp |
|---|---|
| `.next/static/css/*.css` (build que sirve `next start`) | **19:14** |
| Edición de tokens (`tailwind.config.ts`) | 19:25 |
| Arreglo de `CtaBlock` (`components/sections/cta-block.tsx`) | **19:54** |

Pruebas de que el `.next` es anterior a los cambios:
- El CSS del build aún tiene el token **viejo**: `.bg-primary → rgb(78 91 82)` (`#4E5B52`), no el actual `#3E4A42`.
- El HTML del build aún tiene el `<article>` con la colisión (arriba), no el `<div>` ya corregido.

`next start` sirve el `.next` compilado; **no refleja cambios de código sin recompilar.** Por eso,
por muy correcto que fuera el arreglo, la pantalla seguía mostrando el build de las 19:14.

## Causa raíz (respuesta directa)
1. **Fondo blanco:** colisión `bg-surface` (de `Card`) vs `bg-primary` (de `CtaBlock`); `cn()` sin
   `tailwind-merge` deja ambas; en el CSS gana `.bg-surface` por orden de fuente → fondo `#FFFCF8`.
2. **"No cambió tras el fix":** el proyecto no se reconstruyó; `.next` (19:14) es anterior al arreglo (19:54).

## Archivo / línea / regla
- `components/ui/card.tsx:5` — `Card` fija `bg-surface`.
- `components/sections/cta-block.tsx:7` (antes) — añadía `bg-primary` sobre `Card`.
- `lib/utils.ts` — `cn = (...c)=>c.filter(Boolean).join(' ')` (no fusiona clases Tailwind).
- Regla ganadora (perdía la buscada): `.bg-surface{background-color:rgb(255 252 248)}` (order 190) vence a `.bg-primary` (order 186).

## Cambio realizado (ya aplicado en el código, mínimo, sin tocar colores/tokens)
`components/sections/cta-block.tsx`:
1. `<Card className="…bg-primary…">` → `<div className="overflow-hidden rounded-xl border border-border bg-primary text-primary-foreground shadow-card">` (elimina el `bg-surface` heredado del componente `Card`).
2. Se añadió `text-primary-foreground` al `<h3>` (que caía en la regla base `h1..h4{color:#232323}`).
3. Se quitó el `import { Card }` sin uso.

## Evidencia de que ahora renderiza bien (cascada resuelta sobre el código actual)
CSS regenerado del código actual + DOM corregido, resolución de cascada:
```
FIXED card background:
  WINNER  .bg-primary  spec(0,1,0)  order#172  -> rgb(62 74 66)     (#3E4A42 verde)
  COMPUTED background-color = rgb(62 74 66)          ← VERDE, sin regla competidora

FIXED h3 color:
  lose    h3                        spec(0,0,1)  order#44   -> rgb(35 35 35)
  WINNER  .text-primary-foreground  spec(0,1,0)  order#224  -> rgb(252 251 248)
  COMPUTED color = rgb(252 251 248)                 ← CREMA
```
- Fondo tarjeta = `bg-primary` ✓  · Título = `text-primary-foreground` ✓ · Párrafos = `text-primary-foreground` ✓ · Botón sin cambios ✓.

## Acción requerida (única cosa que falta): recompilar
El arreglo está en el código; el navegador seguirá mostrando blanco hasta reconstruir el build:
```bash
rm -rf .next
npm run build      # o, en desarrollo, reiniciar: npm run dev
npm run start
```
Tras esto, el `.next` incluirá el `<div bg-primary>` y el token nuevo; el fondo computado será `rgb(62 74 66)` (verde).

## Sin regresiones (verificado)
- `<Card>` ya no se usa en ningún archivo (grep: 0 consumidores) → el cambio no afecta otras tarjetas.
- La tarjeta "Criterio clínico" (`page.tsx:227`) ya era un `<div bg-primary>` plano → intacta.
- No hay `next-themes`, `ThemeProvider`, `[data-theme]`, `.dark` ni CSS Modules (grep: 0) → el sistema de temas no interviene; descartado.
- `tsc` (typecheck) del código actual: 0 errores.
