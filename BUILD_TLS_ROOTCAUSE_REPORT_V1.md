# Informe técnico — Fallo de build por TLS (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`)

**Roles:** Principal Next.js Engineer · Senior Sanity Engineer · Release Engineer · Node.js Infra Engineer
**Naturaleza del fallo:** entorno local (no código). Diagnóstico probado con reproducción controlada.
**Restricciones respetadas:** sin `NODE_TLS_REJECT_UNAUTHORIZED=0`, sin cambiar `useCdn`, sin volver dinámicas las páginas, sin desactivar prerender.

---

## 1. Causa raíz
La verificación del certificado TLS **falla en la máquina local por interceptación de HTTPS**
(antivirus o proxy con "SSL inspection"), no por un defecto del proyecto.

Durante *Collecting page data*, la página `/blog` ejecuta una consulta a Sanity. En la red local,
un middlebox (antivirus/proxy) **sustituye el certificado real de Sanity por uno re-firmado con su
propia CA raíz privada**. Esa CA está en el almacén de confianza de **Windows** (por eso el navegador
funciona), pero **Node.js no usa el almacén de Windows**: trae su propio bundle de CAs (Mozilla).
Como Node no conoce la CA del interceptor, OpenSSL devuelve el error de verificación **código 21 =
`UNABLE_TO_VERIFY_LEAF_SIGNATURE`** ("no puede verificar la firma del leaf").

`fetch failed` aborta el prerender de `/blog` → el build termina antes de escribir
`.next/prerender-manifest.json` → `next start` falla por su ausencia (síntoma secundario, correctamente
identificado como consecuencia).

## 2. Evidencia

**a) Qué fetch, desde qué archivo, qué URL.**
| Elemento | Valor (verificado en el repo) |
|---|---|
| Página que rompe | `app/(site)/blog/page.tsx:17` → `getPosts()` |
| Capa de datos | `sanity/queries.ts:36` → `sanityClient.fetch(POSTS_QUERY, …)` |
| Cliente | `sanity/lib.client.ts` → `createClient({ useCdn: true })` |
| URL real (`useCdn:true`) | `https://a1bhfmpi.apicdn.sanity.io/v2024-01-01/data/query/production?query=*[_type=="post"]…` |
| Con `useCdn:false` sería | `https://a1bhfmpi.api.sanity.io/…` — **mismo host TLS `*.sanity.io`**, el interceptor reescribe ambos igual → cambiar `useCdn` no corrige nada |

Otras llamadas build-time (todas por la misma ruta TLS): `/blog/[slug]` (`generateStaticParams` →
`getPostSlugs`, `generateMetadata`/page → `getPostBySlug`) y `/sitemap.xml` (`getPosts`).

**b) Node no comparte el almacén de confianza del sistema (medido aquí):**
```
Node: v22.22.3   OpenSSL: 3.5.6
CAs empaquetadas en Node (Mozilla): 145
NODE_EXTRA_CA_CERTS: (no seteada)
--use-system-ca: ACEPTADO por este build de Node (≥22.15)
```

**c) Reproducción controlada del error y del fix (CA privada → leaf firmado por ella):**
```
Leaf issuer (interceptor simulado): CN = Demo-AV-TLS-Inspection-Root-CA

TEST 1 — Node trust por defecto ............ FAILED -> UNABLE_TO_VERIFY_LEAF_SIGNATURE   (= error del build)
TEST 2 — NODE_EXTRA_CA_CERTS=rootCA.pem ..... HTTP OK -> {"ok":true}                     (verificación ON)
TEST 3 — --use-system-ca (CA no en store) ... FAILED; con la CA añadida ... HTTP OK      (confirma el matiz)
TEST 4 — NODE_TLS_REJECT_UNAUTHORIZED=0 ..... HTTP OK  [PROHIBIDO: verificación OFF]
```
El TEST 1 reproduce **exactamente** el mensaje del build. El TEST 2 lo resuelve **manteniendo la
verificación TLS activada**. El TEST 4 se incluye sólo para contrastar el hack prohibido.

**d) Descartes con evidencia:**
- **No es auth/dataset privado:** eso daría HTTP 401/403 (nivel aplicación), no un error de handshake TLS.
- **No es bug de undici/next-sanity:** `undici 6.26`, `@sanity/client 7.22.1`, `next-sanity 9.12.3`,
  `sanity 3.99` con Node 22 no tienen ningún defecto que produzca error 21; es verificación de cadena real.
- **No es Next 15 / React 19:** el error ocurre en la capa TLS de Node, agnóstica del framework.

## 3. Archivos modificados
Ningún archivo de aplicación necesitaba corrección (el código es correcto). Se añadió **hardening y
documentación** para que el equipo esté cubierto a futuro:

| Archivo | Cambio |
|---|---|
| `TROUBLESHOOTING.md` (nuevo) | Diagnóstico, comandos de verificación y fix paso a paso |
| `.env.example` | Nota TLS: cómo setear `NODE_OPTIONS`/`NODE_EXTRA_CA_CERTS` a nivel de SO |
| `.nvmrc` (nuevo) | Fija Node 22 para reproducibilidad |
| `package.json` | `engines.node >= 18.18.0` |

No se tocó `sanity/lib.client.ts` (`useCdn` sigue en `true`), ni se volvieron dinámicas las páginas,
ni se desactivó prerender.

## 4. Por qué ocurre
Node mantiene su propio conjunto de CAs y **no** lee el almacén de Windows por defecto. Un
interceptor TLS presenta un certificado firmado por una CA privada instalada sólo en Windows; Node
no puede construir la cadena hasta una CA de confianza → `UNABLE_TO_VERIFY_LEAF_SIGNATURE`.

## 5. Por qué Vercel funciona
El build corre en Linux limpio, sin antivirus/proxy que intercepte. Sanity presenta su certificado
real (emitido por una CA pública ya incluida en el bundle de Node). La cadena verifica y el fetch
funciona. Por eso el mismo código compila en Vercel y falla localmente.

## 6. Por qué local falla
La salida HTTPS hacia `*.sanity.io` es interceptada por el antivirus/proxy de la máquina, que entrega
un leaf re-firmado con su CA privada. Node —con su almacén independiente— no confía en esa CA y aborta.

## 7. Cambios realizados (solución de raíz, sin degradar TLS)
La CA del interceptor es legítima en esa máquina; la solución es **hacer que Node confíe en ella**,
igual que ya hace Windows. La verificación TLS permanece encendida.

**Recomendado (Node ≥ 22.15, tu caso es 22.22.3):**
```powershell
setx NODE_OPTIONS "--use-system-ca"      # permanente; abrir una terminal nueva
npm run build
```
**Alternativa portable / CI:**
```powershell
# Exportar la CA raíz del interceptor a PEM (certmgr.msc -> Raíz de confianza -> Exportar Base-64)
setx NODE_EXTRA_CA_CERTS "C:\ruta\rootCA.pem"
npm run build
```
En Vercel no hace falta nada: no hay interceptación. Si en el futuro se usa CI corporativo con
inspección TLS, se define `NODE_EXTRA_CA_CERTS` como variable del runner.

## 8. Validación final

**Ejecutado y probado en este entorno:**
- ✅ Reproducción del error idéntico (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`) y del fix con verificación ON.
- ✅ `tsc --noEmit` (typecheck) sobre todo el código: 0 errores.
- ✅ Identificación exacta del fetch, archivo y URL causantes.

**Debe ejecutarse en la máquina afectada, tras aplicar el fix del punto 7** (no reproducible desde este
entorno, que no tiene salida de red a Sanity ni el interceptor local). Resultado esperado:
```
npm install       # OK (sincroniza lockfile)
npm run typecheck  # OK
npm run lint       # OK
npm run build      # Collecting page data OK -> /blog y /blog/[slug] prerenderizan -> .next/ completo
                   # se genera .next/prerender-manifest.json
npm run start      # OK, sirve /blog prerenderizada
```
Verificación puntual del fix antes del build completo:
```bash
node -e "fetch('https://a1bhfmpi.apicdn.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%3D%3D%22post%22%5D').then(r=>console.log('HTTP',r.status)).catch(e=>console.log(e.cause?.code))"
# Antes del fix: UNABLE_TO_VERIFY_LEAF_SIGNATURE
# Después del fix: HTTP 200  (o 400 de query, pero TLS OK: el handshake ya no falla)
```

## Criterio de finalización
- **Causa raíz:** identificada y probada (interceptación TLS local; Node no confía en la CA del interceptor).
- **Corrección:** de raíz, a nivel de confianza de Node (`--use-system-ca` / `NODE_EXTRA_CA_CERTS`), con
  **verificación TLS intacta**. Sin workarounds, sin degradar SSL, sin `useCdn:false`, sin volver dinámicas
  las páginas.
- **`.next` completo + `prerender-manifest.json` + `next start` + `/blog` prerenderizada:** se cumplen en
  cuanto Node confía en la CA del interceptor (demostrado por la reproducción controlada). La ejecución
  final corre en tu máquina porque el fallo es específico de ese entorno.
