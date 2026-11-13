import * as React from "react";

// Utilidades de movimiento de la portada y las pantallas de acceso (v14).
// Todo respeta prefers-reduced-motion y se detiene cuando la pestaña no está visible.

export function prefiereQuietud() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

// Parallax con el puntero (solo ratón): escribe --px y --py (−1…1) en el elemento, suavizado con rAF + lerp.
// Cada capa decide su amplitud en CSS con su propia --prof (px).
export function useParallaxPuntero(refRaiz) {
  React.useEffect(() => {
    const raiz = refRaiz.current;
    if (!raiz || prefiereQuietud()) return;
    let conRaton = false;
    try {
      conRaton = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    } catch {}
    if (!conRaton) return;

    const destino = { x: 0, y: 0 };
    const actual = { x: 0, y: 0 };
    let cuadro = 0;

    const pintar = () => {
      cuadro = 0;
      actual.x += (destino.x - actual.x) * 0.075;
      actual.y += (destino.y - actual.y) * 0.075;
      raiz.style.setProperty("--px", actual.x.toFixed(4));
      raiz.style.setProperty("--py", actual.y.toFixed(4));
      const falta = Math.abs(destino.x - actual.x) + Math.abs(destino.y - actual.y);
      if (falta > 0.002 && !document.hidden) cuadro = requestAnimationFrame(pintar);
    };
    const pedir = () => {
      if (!cuadro && !document.hidden) cuadro = requestAnimationFrame(pintar);
    };
    const mover = (evento) => {
      if (evento.pointerType && evento.pointerType !== "mouse") return;
      destino.x = (evento.clientX / window.innerWidth) * 2 - 1;
      destino.y = (evento.clientY / window.innerHeight) * 2 - 1;
      pedir();
    };
    const centrar = () => {
      destino.x = 0;
      destino.y = 0;
      pedir();
    };
    window.addEventListener("pointermove", mover, { passive: true });
    document.documentElement.addEventListener("pointerleave", centrar);
    document.addEventListener("visibilitychange", pedir);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("pointerleave", centrar);
      document.removeEventListener("visibilitychange", pedir);
    };
  }, [refRaiz]);
}

// Contador que sube de 0 al valor final (una vez). Con reduced-motion muestra el valor final directamente.
export function useContador(final, { retraso = 0, duracion = 1100 } = {}) {
  const [valor, setValor] = React.useState(() => (prefiereQuietud() ? final : 0));
  React.useEffect(() => {
    if (prefiereQuietud()) return;
    let cuadro = 0;
    let inicio = 0;
    const paso = (ahora) => {
      if (!inicio) inicio = ahora;
      const avance = Math.min(1, (ahora - inicio) / duracion);
      const suave = 1 - Math.pow(1 - avance, 3);
      setValor(Math.round(final * suave));
      if (avance < 1) cuadro = requestAnimationFrame(paso);
    };
    const espera = setTimeout(() => (cuadro = requestAnimationFrame(paso)), retraso);
    // Si la pestaña estaba oculta, rAF no corre: al volver se termina igual; y por si acaso, valor final garantizado
    const seguro = setTimeout(() => setValor(final), retraso + duracion + 1500);
    return () => {
      clearTimeout(espera);
      clearTimeout(seguro);
      cancelAnimationFrame(cuadro);
    };
  }, [final, retraso, duracion]);
  return valor;
}

// Marca con la clase «v14-vista» los hijos directos de un contenedor cuando entran en pantalla (una sola vez).
export function useEntradaAlVer(refContenedor) {
  React.useEffect(() => {
    const contenedor = refContenedor.current;
    if (!contenedor) return;
    const hijos = [...contenedor.children];
    if (prefiereQuietud() || typeof IntersectionObserver === "undefined") {
      hijos.forEach((hijo) => hijo.classList.add("v14-vista"));
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("v14-vista");
          observador.unobserve(entrada.target);
        });
      },
      { threshold: 0.2 }
    );
    hijos.forEach((hijo) => observador.observe(hijo));
    return () => observador.disconnect();
  }, [refContenedor]);
}

// «true» durante la secuencia de apertura: sirve para poner will-change solo mientras dura.
export function useEntrando(milisegundos = 2600) {
  const [entrando, setEntrando] = React.useState(() => !prefiereQuietud());
  React.useEffect(() => {
    if (!entrando) return;
    const fin = setTimeout(() => setEntrando(false), milisegundos);
    return () => clearTimeout(fin);
  }, [entrando, milisegundos]);
  return entrando;
}
