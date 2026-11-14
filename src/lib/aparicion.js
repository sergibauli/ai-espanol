// v19 · Aparición progresiva: las piezas de una página entran animadas cuando llegan a la pantalla.
// El hook solo pone clases (`v19-pre` antes de verse, `v19-ver` al entrar); cada tipo de pieza decide su animación en CSS.
// Sin JavaScript, con «reducir movimiento» o sin IntersectionObserver, todo se ve desde el principio.
import * as React from "react";

export function useAparicion(refRaiz, selector) {
  const montado = React.useRef(null);
  React.useEffect(() => {
    const raiz = refRaiz.current;
    if (!raiz || montado.current === raiz) return;
    let quieto = false;
    try {
      quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (quieto || typeof IntersectionObserver === "undefined") return;
    montado.current = raiz;
    const vistos = new WeakSet();
    const ojo = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const pieza = entrada.target;
          ojo.unobserve(pieza);
          pieza.classList.remove("v19-pre");
          pieza.classList.add("v19-ver");
          const limpiar = (evento) => {
            if (evento.target !== pieza) return;
            pieza.classList.remove("v19-ver");
            pieza.style.removeProperty("--v19-i");
            pieza.removeEventListener("animationend", limpiar);
          };
          pieza.addEventListener("animationend", limpiar);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const registrar = () => {
      const cuenta = new Map();
      raiz.querySelectorAll(selector).forEach((pieza) => {
        if (vistos.has(pieza)) return;
        vistos.add(pieza);
        // Orden entre hermanas (para escalonar), con tope para que las listas largas no tarden
        const n = cuenta.get(pieza.parentElement) || 0;
        cuenta.set(pieza.parentElement, n + 1);
        pieza.style.setProperty("--v19-i", String(Math.min(n, 9)));
        pieza.classList.add("v19-pre");
        ojo.observe(pieza);
      });
    };
    registrar();
    let espera = 0;
    const cambios = new MutationObserver(() => {
      clearTimeout(espera);
      espera = setTimeout(registrar, 60);
    });
    cambios.observe(raiz, { childList: true, subtree: true });
    return () => {
      clearTimeout(espera);
      cambios.disconnect();
      ojo.disconnect();
      montado.current = null;
    };
  });
}
