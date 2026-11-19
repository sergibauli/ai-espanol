// Datos y reglas de «Pincel mágico · 神笔»: qué palabras tienen dibujo y cómo se comprueba la respuesta.
import DATOS from "../data/pincel-dibujos.json";

export const ICONOS = DATOS.iconos;

/** Normaliza para comparar: minúsculas, sin acentos (la ñ se conserva), sin signos ni artículo inicial */
export function normalizar(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/ñ/g, "\u0001")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\u0001/g, "ñ")
    .replace(/[¿?¡!.,;:…"'«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(el|la|los|las|un|una|unos|unas) /, "");
}

/** Todas las formas válidas de una palabra (variantes separadas por « / ») */
export const formasDe = (es) =>
  String(es || "")
    .split(/\s+\/\s+/)
    .map(normalizar)
    .filter(Boolean);

/** Texto para mostrar: primera variante sin aclaraciones entre paréntesis */
export const mostrar = (es) => String(es || "").replace(/\s*\([^)]*\)/g, "").trim();

// Entradas de la tabla curada
export const PALABRAS = DATOS.tabla.map(([es, zh, icono, cat], i) => ({ id: `p${i}`, es: mostrar(es), original: es, zh, icono, cat, formas: formasDe(es) }));

// Índice forma → entrada (la primera de la tabla gana en caso de ambigüedad)
const INDICE = new Map();
for (const p of PALABRAS) for (const f of p.formas) if (!INDICE.has(f)) INDICE.set(f, p);

/** Busca el dibujo de una palabra del vocabulario de una unidad (o null) */
export function dibujoDe(palabraEs) {
  for (const f of formasDe(palabraEs)) {
    const p = INDICE.get(f);
    if (p) return p;
  }
  return null;
}

/**
 * Reparte las palabras con dibujo para una unidad.
 * unidades: [{ numero, nivel, vocabulario: [{espanol, chino}] }]
 * Devuelve { propias, nivel, extra }: propias = de la unidad; nivel = de otras unidades del mismo nivel; extra = resto de la tabla.
 */
export function palabrasConDibujo(numero, unidades) {
  const vistas = new Set();
  const de = (lista, origen) => {
    const res = [];
    for (const v of lista) {
      const p = dibujoDe(v.espanol);
      if (!p || vistas.has(p.icono + "|" + p.id)) continue;
      // Evita dos palabras con el mismo dibujo en la misma partida
      if (res.some((x) => x.icono === p.icono)) continue;
      vistas.add(p.icono + "|" + p.id);
      res.push({ ...p, es: mostrarConArticulo(p, v.espanol), zh: p.zh, origen });
    }
    return res;
  };
  if (numero === "todas") {
    const todas = unidades.flatMap((u) => u.vocabulario || []);
    return { propias: de(todas, "unidad"), nivel: [], extra: [] };
  }
  const unidad = unidades.find((u) => u.numero === Number(numero));
  const propias = de(unidad?.vocabulario || [], "unidad");
  const mismoNivel = unidades.filter((u) => u.numero !== Number(numero) && u.nivel && u.nivel === unidad?.nivel).flatMap((u) => u.vocabulario || []);
  const nivel = de(mismoNivel, "nivel").filter((p) => !propias.some((x) => x.icono === p.icono));
  const usados = new Set([...propias, ...nivel].map((p) => p.icono));
  const extra = PALABRAS.filter((p) => !usados.has(p.icono) && (usados.add(p.icono), true)).map((p) => ({ ...p, origen: "extra" }));
  return { propias, nivel, extra };
}

// La tabla lleva artículo («la cocina»); se usa siempre esa forma para que el alumno aprenda el género
function mostrarConArticulo(p) {
  return p.es;
}

/** ¿La respuesta escrita es correcta? (acentos y artículo no cuentan) */
export function esCorrecta(respuesta, palabra) {
  const r = normalizar(respuesta);
  if (!r) return false;
  return palabra.formas.includes(r) || palabra.formas.some((f) => f.replace(/ñ/g, "n") === r.replace(/ñ/g, "n"));
}
