// Fichas del palacio · 宫殿麻将 — lógica pura (sin React): parejas desde el contenido de la unidad,
// disposiciones en capas, regla de ficha libre y reparto que siempre tiene solución.
//
// Coordenadas en medias fichas: una ficha en (x, y, z) ocupa [x, x+2) × [y, y+2) en la capa z.

const limpiar = (t) => String(t ?? "").replace(/\s+/g, " ").trim();
const tieneChino = (t) => /[一-鿿]/.test(String(t || ""));
const lista = (v) => (Array.isArray(v) ? v : []);
const sinMarcas = (t) => limpiar(t).replace(/\*+/g, "");

export function barajar(lista, rnd = Math.random) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// ---------------------------------------------------------------- Tipos de pareja
export const TIPOS = {
  vocab: { es: "Palabra", zh: "词语", sello: "词" },
  frase: { es: "Expresión", zh: "表达", sello: "句" },
  conj: { es: "Conjugación", zh: "动词变位", sello: "变" },
  art: { es: "Artículo", zh: "冠词", sello: "冠" },
  qa: { es: "Pregunta y respuesta", zh: "问答", sello: "问" },
  rel: { es: "Relación", zh: "配对", sello: "配" },
};

// ---------------------------------------------------------------- Disposiciones
const fila = (z, y, xs) => xs.map((x) => ({ x, y, z }));
const rango = (desde, hasta, paso = 2) => {
  const r = [];
  for (let v = desde; v <= hasta; v += paso) r.push(v);
  return r;
};

export const DISPOSICIONES = [
  {
    id: "patio",
    es: "Patio",
    zh: "庭院",
    sello: "院",
    nivel: { es: "Muy fácil", zh: "入门" },
    rotable: true,
    // una sola capa: nunca hay fichas encima, solo cuentan los lados
    fichas: [...fila(0, 0, rango(2, 10)), ...fila(0, 2, rango(0, 12)), ...fila(0, 4, rango(0, 12)), ...fila(0, 6, rango(2, 10))],
  },
  {
    id: "pagoda",
    es: "Pagoda",
    zh: "宝塔",
    sello: "塔",
    nivel: { es: "Fácil", zh: "简单" },
    rotable: false,
    fichas: [
      // capa 0: aguja, tres pisos y la base
      ...fila(0, 0, [4]),
      ...fila(0, 2, [2, 4, 6]),
      ...fila(0, 4, [2, 4, 6]),
      ...fila(0, 6, rango(0, 8)),
      ...fila(0, 8, [1, 3, 5, 7]),
      ...fila(0, 10, rango(0, 8)),
      ...fila(0, 12, [0, 8]),
      // capa 1
      ...fila(1, 3, [3, 5]),
      ...fila(1, 7, [2, 4, 6]),
      ...fila(1, 10, [1, 3, 5, 7]),
      // capa 2
      ...fila(2, 10, [3, 5]),
    ],
  },
  {
    id: "puerta",
    es: "Puerta",
    zh: "宫门",
    sello: "门",
    nivel: { es: "Medio", zh: "中等" },
    rotable: false,
    fichas: [
      // tejado de dos aguas y dos columnas
      ...fila(0, 0, rango(0, 14)),
      ...fila(0, 2, rango(2, 12)),
      ...fila(0, 4, [2, 4, 10, 12]),
      ...fila(0, 6, [2, 4, 10, 12]),
      ...fila(0, 8, [0, 2, 4, 10, 12, 14]),
      // capa 1
      ...fila(1, 0, rango(2, 12)),
      ...fila(1, 5, [3, 11]),
      ...fila(1, 8, [3, 11]),
      // capa 2: la cumbrera
      ...fila(2, 0, [6, 8]),
    ],
  },
  {
    id: "tortuga",
    es: "Tortuga",
    zh: "神龟",
    sello: "龟",
    nivel: { es: "Medio", zh: "中等" },
    rotable: true,
    fichas: [
      // caparazón
      ...fila(0, 0, rango(4, 10)),
      ...fila(0, 2, rango(2, 12)),
      ...fila(0, 4, rango(0, 14)),
      ...fila(0, 6, rango(2, 12)),
      ...fila(0, 8, rango(4, 10)),
      // cabeza y cola
      ...fila(0, 4, [-2, 16]),
      // capa 1
      ...fila(1, 2, rango(4, 10)),
      ...fila(1, 4, rango(4, 10)),
      ...fila(1, 6, rango(4, 10)),
      // capa 2
      ...fila(2, 3, [6, 8]),
      ...fila(2, 5, [6, 8]),
    ],
  },
  {
    id: "dragon",
    es: "Dragón",
    zh: "蟠龙",
    sello: "龙",
    nivel: { es: "Reto", zh: "挑战" },
    rotable: true,
    fichas: [
      // cuerpo en S: tres franjas unidas por los extremos
      ...fila(0, 0, rango(0, 12)),
      ...fila(0, 2, [12, 14]),
      ...fila(0, 4, rango(2, 14)),
      ...fila(0, 6, [0, 2]),
      ...fila(0, 8, rango(0, 12)),
      // cabeza (derecha abajo) y cola
      ...fila(0, 6, [14]),
      ...fila(0, 8, [14]),
      // capa 1: el lomo
      ...fila(1, 0, rango(2, 10)),
      ...fila(1, 4, rango(4, 12)),
      ...fila(1, 8, rango(2, 10)),
      // capa 2: las crestas
      ...fila(2, 0, [5, 7]),
      ...fila(2, 4, [7, 9]),
      ...fila(2, 8, [5, 7]),
    ],
  },
];

/** Mesa del tutorial: 5 fichas en fila y una encima de las dos centrales-izquierdas. */
export const TUTORIAL = {
  id: "tutorial",
  es: "Aprende a jugar",
  zh: "学玩法",
  rotable: false,
  fichas: [...fila(0, 0, [0, 2, 4, 6, 8]), ...fila(1, 0, [3])],
  // orden en que se retiran (ids de posición): primero la de arriba con la del extremo izquierdo…
  guion: [
    [5, 0],
    [1, 4],
    [2, 3],
  ],
};

export function disposicion(id) {
  return DISPOSICIONES.find((d) => d.id === id) || DISPOSICIONES[0];
}

/** Normaliza (mín. x/y = 0) y, si se pide, gira 90° (intercambia x e y). */
export function posicionesDe(disp, girar = false) {
  let ps = disp.fichas.map((f, i) => ({ ...f, id: i }));
  if (girar) ps = ps.map((p) => ({ ...p, x: p.y, y: p.x }));
  const minX = Math.min(...ps.map((p) => p.x));
  const minY = Math.min(...ps.map((p) => p.y));
  return ps.map((p) => ({ ...p, x: p.x - minX, y: p.y - minY }));
}

export function medidas(posiciones) {
  const anchoMedias = Math.max(...posiciones.map((p) => p.x)) + 2;
  const altoMedias = Math.max(...posiciones.map((p) => p.y)) + 2;
  const capas = Math.max(...posiciones.map((p) => p.z)) + 1;
  return { anchoMedias, altoMedias, capas };
}

// ---------------------------------------------------------------- Regla de ficha libre
/** ¿Está libre la ficha `f` entre las fichas vivas? (nada encima y un lado despejado) */
export function estaLibre(f, vivas) {
  let izq = false;
  let der = false;
  for (const o of vivas) {
    if (o === f || o.id === f.id) continue;
    const solapaY = Math.abs(o.y - f.y) < 2;
    if (o.z > f.z && solapaY && Math.abs(o.x - f.x) < 2) return false;
    if (o.z === f.z && solapaY) {
      if (o.x === f.x - 2 || (o.x < f.x && o.x > f.x - 2)) izq = true;
      if (o.x === f.x + 2 || (o.x > f.x && o.x < f.x + 2)) der = true;
    }
  }
  return !(izq && der);
}

export function libres(vivas) {
  return vivas.filter((f) => estaLibre(f, vivas));
}

// ---------------------------------------------------------------- Parejas
const claveTexto = (t) => limpiar(t).toLowerCase();

// Términos de gramática (metalenguaje) y traducciones con notas: solo si no hay nada mejor
const METALENGUAJE = new Set(
  "singular plural verbo verbos raíz terminación terminaciones pronombre pronombres conjugar conjugación persona sustantivo adjetivo adverbio artículo masculino femenino infinitivo sujeto objeto género número regular irregular tiempo modo presente pasado futuro preposición".split(" "),
);
export const esFloja = (p) => /[()（）]/.test(p.a.t + p.b.t) || METALENGUAJE.has(claveTexto(p.a.t)) || METALENGUAJE.has(claveTexto(p.b.t));

/** Conjunto de combinaciones válidas por texto (así dos fichas iguales son intercambiables). */
export function validas(parejas) {
  const s = new Set();
  for (const p of parejas) {
    s.add(`${claveTexto(p.a.t)}|${claveTexto(p.b.t)}`);
    s.add(`${claveTexto(p.b.t)}|${claveTexto(p.a.t)}`);
  }
  return s;
}

export function emparejan(f1, f2, conjunto) {
  if (!f1 || !f2 || f1.id === f2.id || f1.lado === f2.lado) return false;
  return conjunto.has(`${claveTexto(f1.t)}|${claveTexto(f2.t)}`);
}

const PRONOMBRES = /^\s*[•·\-]?\s*(yo|tú|él\/ella\/usted|él\/ella|nosotros\/as|nosotros|vosotros\/as|vosotros|ellos\/ellas\/ustedes|ellos\/as|ellos\/ellas)\s*[:→=]?\s*([a-záéíóúüñ*]+(?: [a-záéíóúüñ*]+)?)\s*(?:$|[=(（,·]|\s-\s)/i;
const ARTICULO = /^(el|la|los|las|un|una|unos|unas)\s+([a-záéíóúüñ]+)$/i;

/** Todas las parejas candidatas de un contenido de juego (unidad o clase). */
export function candidatas(c) {
  const out = [];
  const vistos = new Set();
  const add = (kind, a, la, b, lb, extra = {}) => {
    a = sinMarcas(a);
    b = sinMarcas(b);
    if (!a || !b || claveTexto(a) === claveTexto(b)) return;
    const k = `${kind}|${claveTexto(a)}|${claveTexto(b)}`;
    if (vistos.has(k)) return;
    vistos.add(k);
    out.push({ kind, a: { t: a, lang: la }, b: { t: b, lang: lb }, ...extra });
  };
  const cortoEs = (t, max = 20) => t && t.length <= max && !tieneChino(t);
  const cortoZh = (t, max = 9) => t && t.length <= max && tieneChino(t);

  // Vocabulario: palabra ↔ traducción; y artículo ↔ sustantivo
  for (const v of lista(c?.vocabulario)) {
    const es = limpiar(v.espanol);
    const zh = limpiar(v.chino).split(/[;；]/)[0].trim();
    if (cortoEs(es, 18) && cortoZh(zh)) add("vocab", es, "es", zh, "zh", { origen: es });
    const m = es.match(ARTICULO);
    if (m) add("art", m[1].toLowerCase(), "es", m[2], "es", { origen: es });
  }
  // Ejercicios «emparejar»
  for (const e of lista(c?.ejercicios?.emparejar))
    for (const p of lista(e?.pares)) {
      const iz = limpiar(p.izquierda);
      const de = limpiar(p.derecha);
      if (!cortoEs(iz, 18)) continue;
      if (cortoZh(de)) add("frase", iz, "es", de, "zh", { origen: iz });
      else if (cortoEs(de, 18)) add("rel", iz, "es", de, "es", { origen: iz });
    }
  // Teoría: «• expresión = traducción» (en descripcionChino) y conjugaciones «yo hablo»
  for (const t of lista(c?.teoria)) {
    for (const linea of String(t?.descripcionChino || "").split("\n")) {
      const m = linea.match(/^\s*[•·]\s*([^=]+?)\s*=\s*(.+?)\s*$/);
      if (!m) continue;
      const es = limpiar(m[1].replace(/[（(].*?[)）]/g, ""));
      const zh = limpiar(m[2].replace(/[（(].*?[)）]/g, ""));
      if (cortoEs(es, 18) && !/[+\[\]/]/.test(es) && cortoZh(zh, 8) && !/(说|形式|用于|表示|缩写)$/.test(zh)) add("frase", es, "es", zh, "zh", { origen: es });
    }
    for (const linea of String(t?.descripcion || "").split("\n")) {
      const m = linea.match(PRONOMBRES);
      if (!m || /-\s*$/.test(m[2])) continue;
      const forma = m[2].replace(/\*/g, "").toLowerCase();
      if (forma.length < 2 || /^(habl|com|viv)$/.test(forma)) continue;
      add("conj", m[1].toLowerCase(), "es", forma, "es");
    }
    // Ejemplos de pregunta y respuesta: «—¿Dónde vives? —Vivo en Madrid.»
    for (const ej of lista(t?.ejemplos)) {
      const m = limpiar(ej?.espanol).match(/^—?\s*(¿[^?]+\?)\s*—\s*(.+)$/);
      if (m && m[1].length <= 22 && m[2].length <= 22) add("qa", m[1], "es", m[2], "es");
    }
  }
  // Diálogos: pregunta seguida de su respuesta
  for (const d of lista(c?.dialogos)) {
    const ls = lista(d?.lineas);
    for (let i = 0; i + 1 < ls.length; i++) {
      const q = limpiar(ls[i]?.texto);
      const r = limpiar(ls[i + 1]?.texto);
      if (/^¿[^?]+\?$/.test(q) && q.length <= 22 && r && r.length <= 22 && !r.includes("?") && !tieneChino(r)) add("qa", q, "es", r, "es");
    }
  }
  return out;
}

/**
 * Elige `n` parejas para la partida: mezcla gramática (hasta ~40 %) con palabras y expresiones;
 * si la clase tiene pocas, repite parejas (son intercambiables por texto). `extra` = vocabulario
 * de respaldo cuando la clase casi no tiene contenido.
 */
export function elegirParejas(c, n, rnd = Math.random, extra = []) {
  const todas = candidatas(c);
  const porTipo = (k) => barajar(todas.filter((p) => p.kind === k), rnd);
  const tope = { conj: 4, art: 3, qa: 3, rel: 3 };
  const gram = [];
  for (const k of ["conj", "art", "qa", "rel"]) gram.push(...porTipo(k).slice(0, tope[k]));
  const elegidas = [];
  const usados = new Set();
  const lado = new Set(); // evita dos parejas distintas con el mismo texto en una ficha (salvo intercambiables)
  const tomar = (p) => {
    if (elegidas.length >= n) return;
    if (p.origen && usados.has(p.origen)) return;
    const ka = claveTexto(p.a.t);
    const kb = claveTexto(p.b.t);
    if (p.kind !== "art" && p.kind !== "conj" && (lado.has(ka) || lado.has(kb))) return;
    elegidas.push(p);
    if (p.origen) usados.add(p.origen);
    if (p.kind !== "art" && p.kind !== "conj") {
      lado.add(ka);
      lado.add(kb);
    }
  };
  const buenas = (l) => l.filter((p) => !esFloja(p));
  barajar(buenas(gram), rnd).slice(0, Math.round(n * 0.4)).forEach(tomar);
  buenas([...porTipo("vocab"), ...porTipo("frase")]).forEach(tomar);
  buenas(gram).forEach(tomar);
  // Si aún faltan, primero repite buenas antes de recurrir a las flojas
  if (elegidas.length < Math.ceil(n / 3)) [...porTipo("vocab"), ...porTipo("frase"), ...gram].forEach(tomar);
  // Muy poco contenido: completa con vocabulario de respaldo
  if (elegidas.length < Math.ceil(n / 3))
    for (const v of barajar(extra, rnd)) {
      const es = limpiar(v.espanol);
      const zh = limpiar(v.chino).split(/[;；]/)[0].trim();
      if (es.length <= 18 && zh.length <= 9 && tieneChino(zh)) tomar({ kind: "vocab", a: { t: es, lang: "es" }, b: { t: zh, lang: "zh" }, origen: es });
      if (elegidas.length >= Math.ceil(n / 2)) break;
    }
  const distintas = elegidas.length;
  for (let i = 0; elegidas.length < n && distintas > 0; i++) elegidas.push(elegidas[i % distintas]);
  return elegidas.map((p, i) => ({ ...p, id: i }));
}

// ---------------------------------------------------------------- Reparto con solución
/**
 * Asigna las parejas a las posiciones de forma que exista al menos una solución:
 * simula la partida desde el tablero lleno retirando dos fichas libres al azar cada vez
 * y les da la misma pareja. Devuelve las fichas o null si no lo consigue.
 */
export function repartir(posiciones, parejas, rnd = Math.random, intentos = 80) {
  if (posiciones.length !== parejas.length * 2) return null;
  for (let k = 0; k < intentos; k++) {
    let vivas = [...posiciones];
    const orden = [];
    while (vivas.length) {
      const ls = libres(vivas);
      if (ls.length < 2) break;
      const [p, q] = barajar(ls, rnd);
      orden.push([p, q]);
      vivas = vivas.filter((f) => f !== p && f !== q);
    }
    if (vivas.length) continue;
    const ps = barajar(parejas, rnd);
    const fichas = [];
    orden.forEach(([p, q], i) => {
      const par = ps[i];
      const [l1, l2] = rnd() < 0.5 ? ["a", "b"] : ["b", "a"];
      fichas.push({ ...p, pareja: par.id, kind: par.kind, lado: l1, t: par[l1].t, lang: par[l1].lang, vivo: true });
      fichas.push({ ...q, pareja: par.id, kind: par.kind, lado: l2, t: par[l2].t, lang: par[l2].lang, vivo: true });
    });
    return fichas.sort((a, b) => a.id - b.id);
  }
  return null;
}

/** Parejas que se pueden jugar ahora mismo entre las fichas libres. */
export function jugadas(fichas, conjunto) {
  const vivas = fichas.filter((f) => f.vivo);
  const ls = libres(vivas);
  const r = [];
  for (let i = 0; i < ls.length; i++) for (let j = i + 1; j < ls.length; j++) if (emparejan(ls[i], ls[j], conjunto)) r.push([ls[i], ls[j]]);
  return r;
}

/** Baraja las fichas que quedan manteniendo una solución posible. */
export function rebarajar(fichas, conjunto, rnd = Math.random) {
  const vivas = fichas.filter((f) => f.vivo);
  // Reconstruye parejas válidas con lo que queda (las fichas iguales son intercambiables)
  const pendientes = [...vivas];
  const pares = [];
  while (pendientes.length) {
    const f = pendientes.shift();
    const j = pendientes.findIndex((o) => emparejan(f, o, conjunto));
    if (j < 0) return null;
    const o = pendientes.splice(j, 1)[0];
    pares.push({ id: pares.length, kind: f.kind, a: { t: f.t, lang: f.lang, lado: f.lado, pareja: f.pareja }, b: { t: o.t, lang: o.lang, lado: o.lado, pareja: o.pareja } });
  }
  const posiciones = vivas.map(({ x, y, z, id }) => ({ x, y, z, id }));
  const nuevas = repartir(posiciones, pares, rnd);
  if (!nuevas) return null;
  const porId = new Map(nuevas.map((f) => [f.id, f]));
  return fichas.map((f) => {
    if (!f.vivo) return f;
    const n = porId.get(f.id);
    const par = pares[n.pareja];
    const datos = par[n.lado];
    return { ...f, t: datos.t, lang: datos.lang, lado: datos.lado, pareja: datos.pareja, kind: par.kind };
  });
}
