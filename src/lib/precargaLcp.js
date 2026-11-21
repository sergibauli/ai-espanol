// Precarga de la imagen más grande de la primera pantalla (LCP) según la ruta con la que se abre la app.
// Estas imágenes van como fondo en el CSS de páginas diferidas (o en un componente diferido), así que el
// navegador no las descubría hasta tener el JS y el CSS de la sección: 2–3 viajes de red más tarde.
// Importarlas aquí da la misma URL con hash que usa el CSS, y el <link rel="preload"> sale con el JS inicial.
import dragonLuz from "../../public/theme/dragon-luz.webp";
import papel from "../../public/theme/papel.jpg";

const POR_RUTA = [
  [/^\/juegos\/?$/, dragonLuz], // cabecera del Pabellón de juegos
  [/^\/modulos\/[^/]+/, papel], // mapa de la unidad
  [/^\/(ruta|dashboard)\/?$/, "./mono/saluda.webp"], // Rey Mono de la ruta
];

export function iniciarPrecargaLcp() {
  try {
    const ruta = (location.hash.replace(/^#/, "").split("?")[0] || "/").trim();
    const fila = POR_RUTA.find(([re]) => re.test(ruta));
    if (!fila) return;
    const enlace = document.createElement("link");
    enlace.rel = "preload";
    enlace.as = "image";
    enlace.href = fila[1];
    enlace.setAttribute("fetchpriority", "high");
    document.head.appendChild(enlace);
  } catch {}
}
