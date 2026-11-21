// v20 · Fluidez global:
// 1) Precarga la página (y los datos de la unidad) de cualquier enlace interno en cuanto el puntero o el dedo lo tocan,
//    así al soltar ya está descargada y el cambio de pantalla es inmediato.
// 2) Detiene las animaciones infinitas cuando la pestaña no se ve.
import { precargar } from "./precarga.js";
import { iniciarMovilLigero } from "./movilLigero.js";

const PAGINAS = [
  [/^\/modulos\/modulo-(\d+)/, (m) => [import("../pages/UnitPage.jsx"), import("./examGenerator.js").then((g) => g.loadModule(Number(m[1])))]],
  [/^\/juegos\/kahoot/, () => import("../pages/juegos/KahootPage.jsx")],
  [/^\/juegos\/uno/, () => import("../pages/juegos/UnoPage.jsx")],
  [/^\/juegos\/ruleta/, () => import("../pages/juegos/RuletaPage.jsx")],
  [/^\/juegos\/ahorcado/, () => import("../pages/juegos/AhorcadoPage.jsx")],
  [/^\/juegos\/memory/, () => import("../pages/juegos/MemoryPage.jsx")],
  [/^\/juegos\/sopa/, () => import("../pages/juegos/SopaPage.jsx")],
  [/^\/juegos\/scramble/, () => import("../pages/juegos/ScramblePage.jsx")],
  [/^\/juegos\/(palacio-palabras|apalabrados)/, () => import("../pages/juegos/PalacioPalabrasPage.jsx")],
  [/^\/juegos\/dragon-jade/, () => import("../pages/juegos/DragonJadePage.jsx")],
  [/^\/juegos\/brisca/, () => import("../pages/juegos/BriscaPage.jsx")],
  [/^\/juegos\/mapa-mental/, () => import("../pages/juegos/MapaMentalPage.jsx")],
  [/^\/juegos\/teatro/, () => import("../pages/juegos/TeatroDialogosPage.jsx")],
  [/^\/juegos\/enjambre/, () => import("../pages/juegos/EnjambrePage.jsx")],
  [/^\/juegos\/fichas-palacio/, () => import("../pages/juegos/MahjongPage.jsx")],
  [/^\/juegos\/viaje-mono/, () => import("../pages/juegos/ViajeMonoPage.jsx")],
  [/^\/juegos\/pincel-magico/, () => import("../pages/juegos/PincelPage.jsx")],
  [/^\/juegos\/pinball-dragon/, () => import("../pages/juegos/PinballDragonPage.jsx")],
  [/^\/juegos\/turbo-kart/, () => import("../pages/juegos/TurboKartPage.jsx")],
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
const BLOQUES = ".ruta-unit, .ruta-head, .u18-carta, .u19-carta, .u19-mundo, .unit-hero, .mr-capa, .v18-deco, .pc-apertura, .pc-mundo";
// Escenas con animaciones de entrada propias (juegos, DELE, pronunciación): fuera de pantalla solo se pausan
// sus animaciones infinitas, con la API de animaciones, para que las entradas sigan su curso de siempre.
const ESCENAS =
  ".jh-hero, .jh-card__portada, .jh-dia__portada, .dm-portal, .dp-lienzo, .dp-puerta, .dx-hero, .tq-escena, .tq-plaza, .dz-fondo";
const pausadas = new WeakSet();
function pausarInfinitas(el, fuera) {
  for (const a of el.getAnimations({ subtree: true })) {
    if (a.effect?.getTiming?.().iterations !== Infinity) continue;
    if (fuera) {
      if (a.playState === "running") (a.pause(), pausadas.add(a));
    } else if (pausadas.has(a)) {
      pausadas.delete(a);
      if (a.playState === "paused") a.play();
    }
  }
}
function pausarFueraDePantalla() {
  if (typeof IntersectionObserver === "undefined") return;
  const vistos = new WeakSet();
  const conApi = typeof Element !== "undefined" && "getAnimations" in Element.prototype;
  const ojo = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.target.matches(BLOQUES)) e.target.toggleAttribute("data-fuera", !e.isIntersecting);
        else pausarInfinitas(e.target, !e.isIntersecting);
      }
    },
    { rootMargin: "200px 0px" },
  );
  const selector = conApi ? `${BLOQUES}, ${ESCENAS}` : BLOQUES;
  const buscar = () => {
    pendiente = 0;
    document.querySelectorAll(selector).forEach((el) => {
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
  const alArrancar = () => (pausarFueraDePantalla(), iniciarMovilLigero());
  if (document.body) alArrancar();
  else document.addEventListener("DOMContentLoaded", alArrancar, { once: true });
}
