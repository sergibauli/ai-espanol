// Marcas globales en <html> que sustituyen a los `body:has(.x)` / `html:has(.x)` / `.app-stage:has(.x)` del CSS.
// Un :has() anclado en un contenedor grande obliga a Chrome a revisar el árbol entero en cada inserción de nodos
// (recalcs de miles de elementos al cargar y al navegar). Aquí un único MutationObserver mira solo los nodos que
// entran o salen (y los cambios de class) y pone `html.hay-<marca>` mientras exista algún elemento con esa clase.
// El callback de MutationObserver corre como microtarea antes del pintado: no hay ningún fotograma sin la clase.
const MARCAS = ["lp-root", "pp-overlay", "sx-bnav", "pc", "v14j-marca", "v14j-selector"];
const SELECTOR = MARCAS.map((m) => `.${m}`).join(",");
const EN_CLASS = new RegExp(`(^|\\s)(${MARCAS.join("|")})(\\s|$)`);

function actualizar() {
  const raiz = document.documentElement.classList;
  for (const m of MARCAS) {
    const hay = document.getElementsByClassName(m).length > 0;
    if (raiz.contains(`hay-${m}`) !== hay) raiz.toggle(`hay-${m}`, hay);
  }
}

const tocaMarca = (n) => n.nodeType === 1 && (n.matches(SELECTOR) || (n.firstElementChild !== null && n.querySelector(SELECTOR) !== null));

export function iniciarClasesRaiz() {
  if (typeof document === "undefined" || !document.body) return;
  actualizar();
  new MutationObserver((registros) => {
    for (const r of registros) {
      if (r.type === "attributes") {
        if (EN_CLASS.test(r.oldValue || "") || EN_CLASS.test(r.target.getAttribute("class") || "")) return actualizar();
        continue;
      }
      for (const n of r.addedNodes) if (tocaMarca(n)) return actualizar();
      for (const n of r.removedNodes) if (tocaMarca(n)) return actualizar();
    }
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"], attributeOldValue: true });
}
