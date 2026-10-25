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
};

const hechas = new Set();
export function precargar(ruta) {
  const cargar = SECCIONES[ruta];
  if (!cargar || hechas.has(ruta)) return;
  hechas.add(ruta);
  cargar().catch(() => hechas.delete(ruta));
}

// En reposo y de una en una; con «ahorro de datos» o red 2G solo se precarga al señalar un enlace
let programada = false;
export function precargarSecciones() {
  const red = navigator.connection;
  if (programada || red?.saveData || /2g/.test(red?.effectiveType || "")) return;
  programada = true;
  const cola = Object.keys(SECCIONES);
  const reposo = window.requestIdleCallback || ((f) => setTimeout(f, 1200));
  const siguiente = () => {
    const ruta = cola.shift();
    if (!ruta) return;
    precargar(ruta);
    reposo(siguiente, { timeout: 4000 });
  };
  setTimeout(() => reposo(siguiente, { timeout: 4000 }), 1500);
}
