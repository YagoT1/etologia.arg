import { z } from 'zod';

/**
 * Validación centralizada de variables de entorno.
 * Falla de forma explícita (nunca en silencio) si falta una variable requerida.
 * Las variables NEXT_PUBLIC_* se referencian de forma literal para que Next
 * las inyecte correctamente en el bundle del cliente.
 */
const schema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z
    .string()
    .min(1, 'Falta NEXT_PUBLIC_SANITY_PROJECT_ID'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1).default('2024-01-01'),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d{8,15}$/, 'NEXT_PUBLIC_WHATSAPP_NUMBER debe ser el número en formato internacional sin signos (ej: 5493511234567)'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  · ${i.path.join('.')}: ${i.message}`)
    .join('\n');
  throw new Error(
    `[env] Configuración de entorno inválida. Revisá tu .env / variables en Vercel:\n${issues}`,
  );
}

export const env = parsed.data;
