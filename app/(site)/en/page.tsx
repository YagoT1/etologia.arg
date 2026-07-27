import { redirect } from 'next/navigation';

// El sitio es monolingüe (es-AR). La ruta /en se mantiene por compatibilidad y redirige al inicio.
export default function EnglishRedirect() {
  redirect('/');
}
