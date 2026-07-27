# Troubleshooting

## `npm run build` falla con `UNABLE_TO_VERIFY_LEAF_SIGNATURE` (prerender de `/blog`)

### Síntoma
```
Collecting page data ...
Error occurred prerendering page "/blog"
TypeError: fetch failed
  cause: UNABLE_TO_VERIFY_LEAF_SIGNATURE
...
next start  ->  falla: no existe .next/prerender-manifest.json
```
El segundo error (`prerender-manifest.json`) es una **consecuencia**: el build se abortó antes de generarlo.

### Causa raíz
No es un bug del código, de Next ni de next-sanity. Es **interceptación TLS local**:

1. `/blog` ejecuta `getPosts()` → `sanityClient.fetch()` durante *Collecting page data*.
   La petición sale a `https://a1bhfmpi.apicdn.sanity.io` (o `.api.sanity.io` si `useCdn:false`).
2. En la máquina local, un **antivirus o proxy que inspecciona HTTPS** (Kaspersky, ESET,
   Avast/AVG, BitDefender, Zscaler, Netskope, Fortinet, cortafuegos corporativo…) **sustituye
   el certificado del servidor** por uno re-firmado con **su propia CA raíz privada**.
3. Esa CA raíz está instalada en el **almacén de confianza de Windows** (por eso el navegador
   y `curl` funcionan), pero **Node.js NO lee el almacén de Windows por defecto**: trae su
   **propio bundle de CAs** (Mozilla, ~145 certificados). Node no conoce la CA del interceptor
   → OpenSSL error 21 → `UNABLE_TO_VERIFY_LEAF_SIGNATURE`.

**Por qué Vercel funciona:** los builds corren en Linux limpio, sin interceptación; Sanity
presenta su certificado real (CA pública) que Node ya trae en su bundle → verifica OK.

**Por qué local falla:** el interceptor cambia el certificado por uno firmado con una CA que
Node no trae. `useCdn:true/false` es indistinto: ambos hosts son TLS 443 a `*.sanity.io` y el
interceptor reescribe ambos igual (por eso cambiar `useCdn` NO es la solución).

### Diagnóstico (confirmar en la máquina afectada)
```bash
# 1) Ver quién firma el certificado que llega. Si el "issuer" es tu antivirus/proxy, confirmado.
openssl s_client -connect a1bhfmpi.apicdn.sanity.io:443 -servername a1bhfmpi.apicdn.sanity.io </dev/null 2>/dev/null | openssl x509 -noout -issuer

# 2) Reproducir el error exacto con Node:
node -e "fetch('https://a1bhfmpi.apicdn.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%3D%3D%22post%22%5D').then(r=>console.log('HTTP',r.status)).catch(e=>console.log(e.cause?.code))"
# -> imprime: UNABLE_TO_VERIFY_LEAF_SIGNATURE
```

### Solución correcta (sin degradar TLS)
La CA del interceptor es legítima **en esta máquina**. Hay que hacer que Node confíe en ella
igual que ya hace Windows. La verificación TLS permanece **activada**.

**Opción A — usar el almacén del sistema (Node ≥ 22.15, recomendado):**
```powershell
setx NODE_OPTIONS "--use-system-ca"   # permanente (abrir una terminal nueva después)
npm run build
```
Node lee el almacén de Windows, donde la CA del antivirus ya está instalada.

**Opción B — CA explícita (portable, CI-friendly, cualquier Node):**
1. Exportar la CA raíz del interceptor a PEM (Windows: `certmgr.msc` → Entidades de
   certificación raíz de confianza → tu CA → Exportar como Base-64 `.cer`/`.pem`).
2. Apuntar Node a ella:
```powershell
setx NODE_EXTRA_CA_CERTS "C:\ruta\rootCA.pem"
npm run build
```

**Prohibido:** `NODE_TLS_REJECT_UNAUTHORIZED=0` (desactiva la verificación y oculta el problema).

### Evidencia reproducible del mecanismo y del fix
Con una CA privada + un leaf firmado por ella (simulando al interceptor):

| Test | Comando | Resultado |
|------|---------|-----------|
| Fallo | `node client.js` (trust por defecto) | `UNABLE_TO_VERIFY_LEAF_SIGNATURE` |
| Fix A/B | `NODE_EXTRA_CA_CERTS=rootCA.pem node client.js` | `HTTP OK` (verificación ON) |
| Hack ❌ | `NODE_TLS_REJECT_UNAUTHORIZED=0 node client.js` | `HTTP OK` pero verificación OFF |

El fix hace que Node **verifique** contra el ancla de confianza correcta; no desactiva nada.
