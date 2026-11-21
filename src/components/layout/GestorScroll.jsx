import * as React from "react";
import { useLocation, useNavigationType } from "react-router";

// Scroll coherente entre pantallas (HashRouter no trae ScrollRestoration):
// - Al ir a una pantalla nueva (enlace, botón, ?m=N de un juego) se empieza arriba.
// - Al volver atrás/adelante (botón del móvil o del navegador) se recupera la posición que tenía.
// La página que vuelve puede cargar en diferido (React.lazy), así que se reintenta unos fotogramas
// hasta que haya altura suficiente o el alumno toque la pantalla.
const posiciones = new Map();

export function GestorScroll() {
  const location = useLocation();
  const tipo = useNavigationType();
  // HashRouter da la clave «default» a las entradas creadas sin estado (hash escrito a mano): se añade la ruta
  const clave = `${location.key}|${location.pathname}${location.search}`;

  React.useEffect(() => {
    try {
      if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    } catch {}
  }, []);

  // Guarda la posición mientras se desplaza (no al desmontar: para entonces la página nueva ya
  // puede haber encogido el documento y el navegador habría recortado scrollY)
  React.useLayoutEffect(() => {
    const guardar = () => posiciones.set(clave, window.scrollY);
    window.addEventListener("scroll", guardar, { passive: true });
    return () => window.removeEventListener("scroll", guardar);
  }, [clave]);

  React.useLayoutEffect(() => {
    if (tipo !== "POP") {
      window.scrollTo(0, 0);
      return undefined;
    }
    const objetivo = posiciones.get(clave) || 0;
    if (!objetivo) {
      window.scrollTo(0, 0);
      return undefined;
    }
    let intentos = 0;
    let id = 0;
    let cancelado = false;
    const parar = () => (cancelado = true);
    const probar = () => {
      if (cancelado) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.min(objetivo, Math.max(0, max)));
      if (max >= objetivo || ++intentos > 60) return;
      id = requestAnimationFrame(probar);
    };
    probar();
    window.addEventListener("touchstart", parar, { passive: true, once: true });
    window.addEventListener("wheel", parar, { passive: true, once: true });
    return () => {
      cancelado = true;
      cancelAnimationFrame(id);
      window.removeEventListener("touchstart", parar);
      window.removeEventListener("wheel", parar);
    };
  }, [clave, tipo]);

  return null;
}
