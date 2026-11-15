// v20 · Fluidez global:
// 1) Precarga la página (y los datos de la unidad) de cualquier enlace interno en cuanto el puntero o el dedo lo tocan,
//    así al soltar ya está descargada y el cambio de pantalla es inmediato.
// 2) Detiene las animaciones infinitas cuando la pestaña no se ve.
import { precargar } from "./precarga.js";

const PAGINAS = [
  [/^\/modulos\/modulo-(\d+)/, (m) => [import("../pages/UnitPage.jsx"), import("./examGenerator.js").then((g) => g.loadModule(Number(m[1])))]],
  [/^\/juegos\/kahoot/, () => import("../pages/juegos/KahootPage.jsx")],
  [/^\/juegos\/uno/, () => import("../pages/juegos/UnoPage.jsx")],
  [/^\/juegos\/ruleta/, () => import("../pages/juegos/RuletaPage.jsx")],
  [/^\/juegos\/ahorcado/, () => import("../pages/juegos/AhorcadoPage.jsx")],
  [/^\/juegos\/memory/, () => import("../pages/juegos/MemoryPage.jsx")],
  [/^\/juegos\/sopa/, () => import("../pages/juegos/SopaPage.jsx")],
  [/^\/juegos\/scramble/, () => import("../pages/juegos/ScramblePage.jsx")],
  [/^\/juegos\/apalabrados/, () => import("../pages/juegos/ApalabradosPage.jsx")],
  [/^\/juegos\/dragon-jade/, () => import("../pages/juegos/DragonJadePage.jsx")],
  [/^\/juegos\/escape-palacio/, () => import("../pages/juegos/EscapePalacioPage.jsx")],
  [/^\/juegos\/mapa-mental/, () => import("../pages/juegos/MapaMentalPage.jsx")],
  [/^\/juegos\/teatro/, () => import("../pages/juegos/TeatroDialogosPage.jsx")],
  [/^\/juegos\/enjambre/, () => import("../pages/juegos/EnjambrePage.jsx")],
];

const hechas = new Set();
export function precargarEnlace(href) {
  const ruta = String(href || "").replace(/^.*#/, "").split("?")[0];
  if (!ruta.startsWith("/") || hechas.has(ruta)) return;
  hechas.add(ruta);
  precargar(ruta);
  for (const [patron, cargar] of PAGINAS) {
    const m = ruta.match(patron);
    if (m) {
      for (const p of [].concat(cargar(m))) p?.catch?.(() => hechas.delete(ruta));
      break;
    }
  }
}

// Bloques pesados (cada unidad de la ruta, tarjetas…): fuera de pantalla se pausan todas sus animaciones,
// así el navegador no recalcula estilos de cientos de animaciones que no se ven.
const BLOQUES = ".ruta-unit, .ruta-head, .u18-carta, .u19-carta, .u19-mundo, .unit-hero, .mr-capa, .v18-deco, .pc-apertura, .pc-mundo, .ud-mapa, .v27-sala, .v27-acciones, .u19-mundo";
function pausarFueraDePantalla() {
  if (typeof IntersectionObserver === "undefined") return;
  const vistos = new WeakSet();
  const ojo = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) e.target.toggleAttribute("data-fuera", !e.isIntersecting);
    },
    { rootMargin: "200px 0px" },
  );
  const buscar = () => {
    pendiente = 0;
    document.querySelectorAll(BLOQUES).forEach((el) => {
      if (vistos.has(el)) return;
      vistos.add(el);
      ojo.observe(el);
    });
  };
  let pendiente = 0;
  new MutationObserver(() => {
    if (!pendiente) pendiente = setTimeout(buscar, 150);
  }).observe(document.body, { childList: true, subtree: true });
  buscar();
}

export function iniciarFluidez() {
  if (typeof window === "undefined") return;
  const alSeñalar = (evento) => {
    const enlace = evento.target?.closest?.('a[href*="#/"]');
    if (enlace) precargarEnlace(enlace.getAttribute("href"));
  };
  document.addEventListener("pointerover", alSeñalar, { passive: true });
  document.addEventListener("touchstart", alSeñalar, { passive: true });
  document.addEventListener("focusin", alSeñalar, { passive: true });
  const visibilidad = () => document.documentElement.classList.toggle("sin-anim", document.hidden);
  document.addEventListener("visibilitychange", visibilidad);
  if (document.body) pausarFueraDePantalla();
  else document.addEventListener("DOMContentLoaded", pausarFueraDePantalla, { once: true });
}
