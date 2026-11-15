// v21 · Sensación de app nativa: vibración al tocar, dirección de las transiciones,
// aviso de nueva versión (service worker) e instalación en la pantalla de inicio.
import * as React from "react";

const html = () => document.documentElement;
const esTactil = () => window.matchMedia?.("(pointer: coarse)").matches;
export const esInstalada = () => window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;

// Patrones cortos: un toque suave, acierto y fallo
const PATRONES = { toque: 8, ok: [12, 40, 18], error: [40, 60, 40] };
export function vibrar(tipo = "toque") {
  try {
    if (esTactil() && navigator.vibrate) navigator.vibrate(PATRONES[tipo] ?? PATRONES.toque);
  } catch {}
}

// --- Aviso de actualización y botón de instalar: pequeño almacén con suscriptores ---
const estado = { actualizada: false, instalar: null };
const oyentes = new Set();
const avisar = () => oyentes.forEach((fn) => fn({ ...estado }));
export function useEstadoApp() {
  const [valor, setValor] = React.useState(() => ({ ...estado }));
  React.useEffect(() => {
    oyentes.add(setValor);
    return () => oyentes.delete(setValor);
  }, []);
  return valor;
}
export async function instalarApp() {
  const aviso = estado.instalar;
  if (!aviso) return false;
  aviso.prompt();
  const { outcome } = await aviso.userChoice.catch(() => ({ outcome: "dismissed" }));
  estado.instalar = null;
  avisar();
  return outcome === "accepted";
}
export const cerrarAvisoActualizacion = () => {
  estado.actualizada = false;
  avisar();
};

function registrarServiceWorker() {
  if (!("serviceWorker" in navigator) || import.meta.env.DEV) return;
  // Si ya había una versión controlando la página, el cambio de controlador significa «hay versión nueva»
  const habiaControlador = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!habiaControlador) return;
    estado.actualizada = true;
    avisar();
  });
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => {
        // Al volver a la app tras un rato, mira si hay versión nueva
        document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && reg.update().catch(() => {}));
      })
      .catch(() => {});
  });
}

export function iniciarAppNativo() {
  const raiz = html();
  if (esInstalada()) raiz.classList.add("es-app");
  if (esTactil()) raiz.classList.add("es-tactil");

  // Vibración suave al pulsar la barra inferior, botones y enlaces con aspecto de botón
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType !== "touch") return;
      const objetivo = e.target.closest?.(".bottom-nav a, .bottom-nav button, .in-mas__item, button:not(:disabled), [role='button'], .app-vibra");
      if (objetivo) vibrar("toque");
    },
    { passive: true, capture: true },
  );

  // Dirección de la transición: «atrás» (gesto o botón del sistema) entra desde la izquierda
  let temporizador;
  window.addEventListener("popstate", () => {
    raiz.dataset.nav = "atras";
    clearTimeout(temporizador);
    temporizador = setTimeout(() => delete raiz.dataset.nav, 600);
  });

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    estado.instalar = e;
    avisar();
  });
  window.addEventListener("appinstalled", () => {
    estado.instalar = null;
    raiz.classList.add("es-app");
    avisar();
  });

  registrarServiceWorker();
}
