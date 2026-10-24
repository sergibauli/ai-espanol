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

function adapt(root) {
  const els = root.querySelectorAll("*:not([data-la])");
  for (const el of els) {
    el.setAttribute("data-la", "1");
    if (el.closest(".side-nav, .bottom-nav, .light-top, svg, video, img")) continue;
    const cs = getComputedStyle(el);
    if (isDarkPanel(cs)) {
      el.style.setProperty("background", "#fbf1dc", "important");
      el.style.setProperty("border-color", "#d9b97a", "important");
      if (parseFloat(cs.borderRadius) > 6) el.style.setProperty("box-shadow", "0 0 0 1px #e7c873, 0 4px 14px rgba(200,150,30,.25)", "important");
    }
  }
  // Segunda pasada: textos claros sobre fondo ya claro
  for (const el of els) {
    if (el.closest("svg")) continue;
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

export function attachLightAdapter(root) {
  if (!root) return () => {};
  let t = 0;
  const run = () => {
    cancelAnimationFrame(t);
    t = requestAnimationFrame(() => adapt(root));
  };
  run();
  const mo = new MutationObserver(run);
  mo.observe(root, { childList: true, subtree: true });
  const iv = setInterval(() => root.querySelectorAll("[data-la]").forEach((e) => e.removeAttribute("data-la")) || run(), 4000);
  return () => {
    mo.disconnect();
    clearInterval(iv);
    cancelAnimationFrame(t);
  };
}
