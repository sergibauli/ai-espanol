// Precarga de las secciones principales: al pasar el ratón o tocar un enlace del menú y, en reposo, todas
// las de la barra, para que cambiar de sección no espere a la red. Las mismas funciones las usa React.lazy.
export const SECCIONES = {
  "/ruta": () => import("../pages/RutaPage.jsx"),
  "/modulos": () => import("../pages/UnidadesPage.jsx"),
  "/oficial": () => import("../pages/dele/OficialHubPage.jsx"),
  "/mi-dele": () => import("../pages/MiDelePage.jsx"),
  "/juegos": () => import("../pages/juegos/JuegosHubPage.jsx"),
  "/diccionarios": () => import("../pages/DiccionarioPage.jsx"),
  "/pronunciacion": () => import("../pages/PronunciacionNuevaPage.jsx"),
  "/memoria": () => import("../pages/MemoriaPage.jsx"),
  "/tutor-voz": () => import("../pages/TutorIAPage.jsx"),
  "/tv": () => import("../pages/TvPage.jsx"),
};

const hechas = new Set();
export function precargar(ruta) {
  const cargar = SECCIONES[ruta];
  if (!cargar || hechas.has(ruta)) return;
  hechas.add(ruta);
  cargar().catch(() => hechas.delete(ruta));
}

// En reposo y de una en una, sin competir con la pantalla actual:
// - empieza cuando la página ha terminado de cargar (evento load) y 2,5 s después, en un hueco de reposo;
// - la siguiente sección no se pide hasta que la anterior ha llegado (nunca hay dos descargas de precarga a la vez);
// - se salta la sección en la que ya estás (React.lazy ya la tiene) y se pausa con la pestaña oculta;
// - con «ahorro de datos» o red 2G solo se precarga al señalar un enlace.
let programada = false;
export function precargarSecciones() {
  const red = navigator.connection;
  if (programada || red?.saveData || /2g/.test(red?.effectiveType || "")) return;
  programada = true;
  const cola = Object.keys(SECCIONES);
  const reposo = window.requestIdleCallback ? (f) => window.requestIdleCallback(f, { timeout: 8000 }) : (f) => setTimeout(f, 1200);
  const siguiente = () => {
    if (document.hidden) {
      document.addEventListener("visibilitychange", () => reposo(siguiente), { once: true });
      return;
    }
    const actual = (window.location.hash.replace(/^#/, "").split("?")[0] || "/").replace(/\/+$/, "") || "/";
    let ruta = cola.shift();
    while (ruta && (hechas.has(ruta) || actual === ruta || actual.startsWith(`${ruta}/`))) ruta = cola.shift();
    if (!ruta) return;
    hechas.add(ruta);
    SECCIONES[ruta]()
      .catch(() => hechas.delete(ruta))
      .finally(() => setTimeout(() => reposo(siguiente), 400));
  };
  const empezar = () => setTimeout(() => reposo(siguiente), 2500);
  if (document.readyState === "complete") empezar();
  else window.addEventListener("load", empezar, { once: true });
}
