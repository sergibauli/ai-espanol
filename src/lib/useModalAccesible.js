import * as React from "react";

/*
  Accesibilidad de teclado para diálogos modales (role="dialog" + aria-modal="true"), sin tocar su aspecto:
  - Tab / Mayús+Tab quedan atrapados dentro del diálogo (si el foco está fuera, entra al primer/último control).
  - Al cerrarse, el foco vuelve al control que lo abrió (si sigue en la página).
  - enfocar: al abrir, lleva el foco al primer control del diálogo (no se usa en las lecciones: allí Intro avanza).
  - onEscape: si se pasa, Escape lo llama (cerrar).
  Uso: const ref = React.useRef(null); useModalAccesible(ref, { onEscape: cerrar }); <div ref={ref} role="dialog" …>
*/
const ENFOCABLES =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), video[controls], audio[controls]';

export function useModalAccesible(ref, { onEscape, enfocar = false, activo = true } = {}) {
  const escape = React.useRef(onEscape);
  escape.current = onEscape;

  React.useEffect(() => {
    if (!activo) return undefined;
    const previo = document.activeElement;
    const controles = () => {
      const raiz = ref.current;
      if (!raiz) return [];
      return [...raiz.querySelectorAll(ENFOCABLES)].filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== "hidden");
    };
    if (enfocar && ref.current && !ref.current.contains(document.activeElement)) controles()[0]?.focus({ preventScroll: true });

    const alPulsar = (e) => {
      const raiz = ref.current;
      if (!raiz || e.defaultPrevented) return;
      if (e.key === "Escape" && escape.current) {
        escape.current(e);
        return;
      }
      if (e.key !== "Tab") return;
      const lista = controles();
      if (!lista.length) return;
      const primero = lista[0];
      const ultimo = lista[lista.length - 1];
      const dentro = raiz.contains(document.activeElement);
      if (e.shiftKey && (!dentro || document.activeElement === primero)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && (!dentro || document.activeElement === ultimo)) {
        e.preventDefault();
        primero.focus();
      }
    };
    document.addEventListener("keydown", alPulsar);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      if (previo && previo !== document.body && previo.isConnected && typeof previo.focus === "function") {
        try {
          previo.focus({ preventScroll: true });
        } catch {}
      }
    };
  }, [activo, enfocar, ref]);
}
