const s = "dele_clases_v1";
export function e(e) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(e))));
  } catch {
    return "";
  }
}
export function f(e) {
  try {
    const o = JSON.parse(decodeURIComponent(escape(atob(e))));
    if (o && o.titulo) {
      return o;
    }
    return null;
  } catch {
    return null;
  }
}
export function l() {
  try {
    return JSON.parse(localStorage.getItem(s) || "[]");
  } catch {
    return [];
  }
}
function r(e) {
  try {
    localStorage.setItem(s, JSON.stringify(e));
  } catch {}
}
function m(e) {
  r([e, ...l()]);
}
function p(e) {
  r(l().filter((o) => o.id !== e));
}
export function b(e) {
  return `${`${window.location.origin}${window.location.pathname}`}#/clase?d=${e}`;
}
export function d(e, o) {
  return [
    "¡Hola! 👋",
    `Te invito a la clase de español: "${e.titulo}"`,
    "",
    `📅 Fecha: ${e.fecha}`,
    `🕐 Hora: ${e.hora}`,
    e.enlace ? `🔗 Enlace de la reunión: ${e.enlace}` : "",
    e.deberes ? `📚 Deberes: ${e.deberes}` : "",
    "",
    `Confirma tu asistencia aquí: ${o}`,
    "",
    `Profesor/a: ${e.profesor}`,
  ].filter(Boolean).join(`
`);
}
export function a(e, o) {
  const a = encodeURIComponent(`Clase de español: ${e.titulo}`);
  const t = encodeURIComponent(d(e, o));
  return `mailto:${e.estudiantes ? e.estudiantes : ""}?subject=${a}&body=${t}`;
}
export function g(e, o) {
  const t = encodeURIComponent(`${o ? "ACEPTO" : "RECHAZO"} la clase: ${e.titulo}`);
  const n = encodeURIComponent(`Hola ${e.profesor},

${o ? "✅ Confirmo mi asistencia" : "❌ No podré asistir"} a la clase "${e.titulo}" (${e.fecha} a las ${e.hora}).

Saludos.`);
  return `mailto:${e.profesorEmail}?subject=${t}&body=${n}`;
}
export { m as c, p as r };
