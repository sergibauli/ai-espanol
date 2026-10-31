// Cambia el chino que muestra la web por el idioma de apoyo elegido (inglés, francés, ruso…).
// Las páginas siguen escribiendo sus textos en español + chino; aquí se sustituyen los trozos en chino del DOM usando
// los diccionarios generados por scripts/traducir.mjs (public/i18n/<idioma>/ui.json y m<N>.json por unidad).
// Lo que no esté en el diccionario se queda en chino. Al volver al chino se restauran los textos originales.
import { segmentosZh, tieneChino } from "./segmentosZh.js";

const BASE = `${import.meta.env.BASE_URL || "./"}i18n/`;
const ATRIBUTOS = ["title", "placeholder", "aria-label"];
const SALTAR = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE", "NOSCRIPT"]);

const cacheFicheros = new Map();
export function cargarI18n(lang, fichero) {
  const clave = `${lang}/${fichero}`;
  if (!cacheFicheros.has(clave)) {
    cacheFicheros.set(
      clave,
      fetch(`${BASE}${clave}.json`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    );
  }
  return cacheFicheros.get(clave);
}

// Teoría larga de una unidad en el idioma de apoyo: { <id>: { titulo, descripcion, ejemplos } } o null
export async function teoriaTraducida(lang, numero) {
  if (!lang || lang === "zh") return null;
  return (await cargarI18n(lang, `m${numero}`))?.teoria || null;
}

let activo = null;

export function iniciarTraductor(lang) {
  activo?.parar();
  activo = null;
  if (!lang || lang === "zh" || typeof document === "undefined") return () => {};
  const t = crearTraductor(lang);
  activo = t;
  return () => {
    t.parar();
    if (activo === t) activo = null;
  };
}

function crearTraductor(lang) {
  const dic = new Map();
  const originalTexto = new Map(); // nodo de texto → { original, traducido }
  const originalAttr = new Map(); // elemento → { attr: { original, traducido } }
  let parado = false;
  let pendiente = new Set();
  let programado = false;

  const traducir = (s) => {
    const segs = segmentosZh(s);
    if (!segs.length) return s;
    let out = "";
    let pos = 0;
    for (const g of segs) {
      out += s.slice(pos, g.inicio) + (dic.get(g.texto) ?? traducirPorPartes(g.texto));
      pos = g.fin;
    }
    return out + s.slice(pos);
  };
  // «第3课»: el código tenía «第» y «课» por separado; se traducen las partes chinas entre cifras o palabras latinas
  // Solo si se conocen todas las partes: una mezcla de chino y otro idioma se lee peor que el chino entero
  const traducirPorPartes = (t) => {
    let completo = true;
    const r = t.replace(/[\u3400-\u9fff\uf900-\ufaff][\u3400-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef]*/g, (p) => {
      const v = dic.get(p);
      if (v == null) completo = false;
      return v ?? p;
    });
    return completo ? r : t;
  };

  const tratarTexto = (n) => {
    const v = n.nodeValue;
    const prev = originalTexto.get(n);
    if (prev && prev.traducido === v) return;
    if (!tieneChino(v)) return;
    const nuevo = traducir(v);
    if (nuevo !== v) {
      originalTexto.set(n, { original: v, traducido: nuevo });
      n.nodeValue = nuevo;
    }
  };
  const tratarAttrs = (el) => {
    for (const a of ATRIBUTOS) {
      const v = el.getAttribute?.(a);
      if (!v || !tieneChino(v)) continue;
      const reg = originalAttr.get(el) || {};
      if (reg[a]?.traducido === v) continue;
      const nuevo = traducir(v);
      if (nuevo !== v) {
        reg[a] = { original: v, traducido: nuevo };
        originalAttr.set(el, reg);
        el.setAttribute(a, nuevo);
      }
    }
  };
  const recorrer = (raiz) => {
    if (!raiz) return;
    if (raiz.nodeType === 3) return tratarTexto(raiz);
    if (raiz.nodeType !== 1 || SALTAR.has(raiz.tagName) || raiz.closest?.("[translate=no],[data-sin-traducir]")) return;
    tratarAttrs(raiz);
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => (n.nodeType === 1 && (SALTAR.has(n.tagName) || n.hasAttribute("translate") || n.hasAttribute("data-sin-traducir")) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    let n;
    while ((n = w.nextNode())) n.nodeType === 3 ? tratarTexto(n) : tratarAttrs(n);
  };
  const vaciar = () => {
    programado = false;
    if (parado) return;
    const lote = pendiente;
    pendiente = new Set();
    for (const n of lote) if (n.isConnected) recorrer(n);
    // Olvida los nodos que ya no están en la página
    if (originalTexto.size > 4000) for (const n of originalTexto.keys()) if (!n.isConnected) originalTexto.delete(n);
  };
  const programar = (n) => {
    pendiente.add(n);
    if (!programado) {
      programado = true;
      requestAnimationFrame(vaciar);
    }
  };

  const obs = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === "characterData") programar(m.target);
      else if (m.type === "attributes") programar(m.target);
      else m.addedNodes.forEach(programar);
    }
  });

  // Diccionario de la interfaz + el de la unidad abierta
  const cargados = new Set();
  const cargar = async (fichero) => {
    if (cargados.has(fichero)) return;
    cargados.add(fichero);
    const d = await cargarI18n(lang, fichero);
    const entradas = fichero === "ui" ? d : d?.dict;
    if (!entradas || parado) return;
    for (const [k, v] of Object.entries(entradas)) if (!dic.has(k)) dic.set(k, v);
    programar(document.body);
  };
  const porRuta = () => {
    const m = /#\/(?:modulos|unidad|leccion)\/(?:modulo-)?(\d+)/.exec(location.hash);
    if (m) cargar(`m${m[1]}`);
  };

  cargar("ui").then(porRuta);
  window.addEventListener("hashchange", porRuta);
  obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATRIBUTOS });

  return {
    parar() {
      parado = true;
      obs.disconnect();
      window.removeEventListener("hashchange", porRuta);
      for (const [n, r] of originalTexto) if (n.isConnected && n.nodeValue === r.traducido) n.nodeValue = r.original;
      for (const [el, reg] of originalAttr) for (const [a, r] of Object.entries(reg)) if (el.getAttribute(a) === r.traducido) el.setAttribute(a, r.original);
    },
  };
}
