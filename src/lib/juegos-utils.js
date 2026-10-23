import { ALL_MODULES } from "../data/modulos/index.js";
export function g() {
  return ALL_MODULES.map((o) => ({
    id: o.id,
    titulo: o.titulo,
    tituloChino: o.tituloChino,
    vocabularioCount: o.vocabulario?.length || 0,
    color: o.color,
  }));
}
function i(espanol) {
  if (!espanol || typeof espanol !== "string") {
    return false;
  }
  const t = espanol.trim();
  return t.length >= 1 && t.length <= 40;
}
export function b(o) {
  const t = ALL_MODULES.find((n) => n.id === o);
  if (!t || !t.vocabulario) {
    return [];
  }
  return t.vocabulario
    .map((n) => ({
      espanol: n.espanol,
      chino: n.chino,
      ejemplo: n.ejemplo || "",
    }))
    .filter((n) => i(n.espanol));
}
function a() {
  const o = [];
  for (const t of ALL_MODULES) {
    if (t.vocabulario) {
      for (const n of t.vocabulario) {
        const e = {
          espanol: n.espanol,
          chino: n.chino,
          ejemplo: n.ejemplo || "",
        };
        if (i(e.espanol)) {
          o.push(e);
        }
      }
    }
  }
  return o;
}
function c(o) {
  return (o ? b(o) : a()).filter((n) => {
    const e = n.espanol.trim();
    if (!e || e.length < 1 || e.includes(" ") || e.includes("-")) {
      return false;
    }
    return e.length >= 1 && e.length <= 20;
  });
}
export { c as a, a as c };
