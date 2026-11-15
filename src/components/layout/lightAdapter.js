// Adapta en vivo páginas antiguas de tema oscuro al tema claro: aclara paneles oscuros y oscurece
// textos claros que quedan sobre fondo claro. Respeta botones y chips de color saturado.
const parse = (c) => {
  const m = String(c).match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(",").map((x) => parseFloat(x));
  return { r, g, b, a };
};
const lum = ({ r, g, b }) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const sat = ({ r, g, b }) => {
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  return mx ? (mx - mn) / mx : 0;
};
const gradColors = (img) => (String(img).match(/rgba?\([^)]+\)/g) || []).map(parse).filter(Boolean);

function isDarkPanel(cs) {
  const bg = parse(cs.backgroundColor);
  if (bg && bg.a > 0.15 && (lum(bg) < 0.14 || (lum(bg) < 0.5 && sat(bg) < 0.45) || (lum(bg) < 0.32 && sat(bg) < 0.75))) return true;
  const gs = gradColors(cs.backgroundImage);
  if (gs.length) {
    const solid = gs.filter((c) => c.a > 0.15);
    if (solid.length && solid.every((c) => lum(c) < 0.14 || (lum(c) < 0.5 && sat(c) < 0.45) || (lum(c) < 0.32 && sat(c) < 0.75))) return true;
  }
  return false;
}

// Elementos aún sin revisar, saltando de golpe los subárboles excluidos (menús, juegos nuevos .gm-no-adapt, SVG, vídeo)
const SALTA = /^(svg|video|img|canvas|picture|script|style)$/i;
function pendientes(root) {
  const lista = [];
  const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (el) => {
      if (SALTA.test(el.tagName)) return NodeFilter.FILTER_REJECT;
      const c = el.classList;
      if (c.contains("gm-no-adapt") || c.contains("side-nav") || c.contains("bottom-nav") || c.contains("light-top")) return NodeFilter.FILTER_REJECT;
      return el.hasAttribute("data-la") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = w.nextNode())) lista.push(n);
  return lista;
}

function adapt(root) {
  const els = pendientes(root);
  if (!els.length) return;
  for (const el of els) {
    el.setAttribute("data-la", "1");
    const cs = getComputedStyle(el);
    if (isDarkPanel(cs)) {
      // Papel de pergamino: el fondo real lo pone la clase .la-paper en parchment.css
      el.classList.add("la-paper");
      if (parseFloat(cs.borderRadius) > 6) el.classList.add("la-round");
    }
  }
  // Segunda pasada: textos claros sobre fondo ya claro
  for (const el of els) {
    const c = parse(getComputedStyle(el).color);
    if (!c || lum(c) < 0.72) continue;
    let p = el;
    let bgLight = true;
    while (p && p !== root) {
      const cs = getComputedStyle(p);
      const bg = parse(cs.backgroundColor);
      const gs = gradColors(cs.backgroundImage).filter((x) => x.a > 0.4);
      if (gs.length) {
        bgLight = gs.every((x) => lum(x) > 0.6 && sat(x) < 0.35);
        break;
      }
      if (bg && bg.a > 0.4) {
        bgLight = lum(bg) > 0.6 && sat(bg) < 0.35;
        break;
      }
      p = p.parentElement;
    }
    if (bgLight) el.style.setProperty("color", "#3b2416", "important");
  }
}

// v20 · Sin re-escaneo periódico de toda la página (daba un tirón cada 4 s en los juegos):
// solo se revisa lo que aparece nuevo, en un hueco libre del navegador y como mucho una vez por frame.
export function attachLightAdapter(root) {
  if (!root) return () => {};
  const libre = window.requestIdleCallback || ((f) => setTimeout(f, 16));
  const cancelaLibre = window.cancelIdleCallback || clearTimeout;
  let id = 0;
  const run = () => {
    if (id) return;
    id = libre(() => {
      id = 0;
      adapt(root);
    }, { timeout: 120 });
  };
  adapt(root);
  const mo = new MutationObserver(run);
  mo.observe(root, { childList: true, subtree: true });
  return () => {
    mo.disconnect();
    if (id) cancelaLibre(id);
  };
}
