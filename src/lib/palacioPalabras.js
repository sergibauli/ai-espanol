// Palacio de las palabras · 字母宫殿 — lógica pura del juego (sin React).
// Tablero propio de 13×13 con el Trono en el centro, bolsa de 100 fichas con la Ñ y su reparto,
// casillas temáticas (sello ×2 letra, jade ×3 letra, linterna ×2 palabra, dragón ×3 palabra),
// validación de jugadas y el rival: el Rey Mono, que busca jugadas en el léxico.

export const LADO = 13;
export const CENTRO = 6;
export const ATRIL = 7;
export const BONO_SIETE = 40; // «Siete sellos»: usar las 7 fichas en una jugada
export const LETRAS = "abcdefghijlmnñopqrstuvxyz".split("");

// Reparto propio (100 fichas): [letra, cantidad, puntos]; «*» = comodín del Mono (悟), vale 0
const REPARTO = [
  ["a", 12, 1], ["e", 12, 1], ["o", 9, 1], ["i", 6, 1], ["s", 6, 1], ["r", 6, 1], ["n", 5, 1], ["l", 5, 1], ["u", 4, 1], ["t", 4, 1],
  ["d", 5, 2], ["c", 5, 2], ["m", 3, 2],
  ["b", 2, 3], ["g", 2, 3], ["p", 2, 3],
  ["f", 1, 4], ["h", 2, 4], ["v", 1, 4], ["y", 1, 4],
  ["q", 1, 5], ["j", 1, 5], ["ñ", 1, 6],
  ["z", 1, 7], ["x", 1, 8],
  ["*", 2, 0],
];
export const PUNTOS = Object.fromEntries(REPARTO.map(([l, , p]) => [l, p]));

// ---------- Casillas especiales (simetría de 8 ejes a partir de un octante) ----------
// L2 = sello rojo (×2 letra) · L3 = jade (×3 letra) · P2 = linterna (×2 palabra) · P3 = dragón (×3 palabra) · T = Trono (inicio, ×2 palabra)
const OCTANTE = {
  P3: [[0, 3]],
  P2: [[1, 1], [4, 4]],
  L3: [[2, 5], [0, 6]],
  L2: [[0, 0], [1, 4], [3, 6], [2, 2]],
};
export const PREMIOS = (() => {
  const p = new Array(LADO * LADO).fill(null);
  for (const [tipo, lista] of Object.entries(OCTANTE))
    for (const [r, c] of lista)
      for (const [a, b] of [[r, c], [c, r]])
        for (const f of [a, LADO - 1 - a]) for (const k of [b, LADO - 1 - b]) p[f * LADO + k] = tipo;
  p[CENTRO * LADO + CENTRO] = "T";
  return p;
})();
export const INFO_PREMIO = {
  L2: { es: "Sello rojo · ×2 letra", zh: "红印 · 字母×2", corto: "×2", glifo: "印" },
  L3: { es: "Jade · ×3 letra", zh: "玉石 · 字母×3", corto: "×3", glifo: "玉" },
  P2: { es: "Linterna · ×2 palabra", zh: "灯笼 · 单词×2", corto: "×2", glifo: "灯" },
  P3: { es: "Dragón · ×3 palabra", zh: "龙 · 单词×3", corto: "×3", glifo: "龙" },
  T: { es: "Trono · empieza aquí (×2 palabra)", zh: "宝座 · 从这里开始（单词×2）", corto: "始", glifo: "座" },
};

// ---------- Utilidades ----------
export const fila = (i) => Math.floor(i / LADO);
export const col = (i) => i % LADO;
export const idx = (r, c) => r * LADO + c;
export const dentro = (r, c) => r >= 0 && c >= 0 && r < LADO && c < LADO;

export const clave = (p) =>
  String(p ?? "")
    .toLowerCase()
    .replace(/ñ/g, "\u0001")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\u0001/g, "ñ");

export function crearAzar(semilla = Date.now()) {
  let s = semilla >>> 0 || 1;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let siguienteId = 1;
export function crearBolsa(azar = Math.random) {
  const bolsa = [];
  for (const [l, n, v] of REPARTO) for (let k = 0; k < n; k++) bolsa.push({ id: siguienteId++, l: l === "*" ? "" : l, v, comodin: l === "*" });
  for (let i = bolsa.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [bolsa[i], bolsa[j]] = [bolsa[j], bolsa[i]];
  }
  return bolsa;
}

/** Saca fichas de la bolsa hasta completar el atril. Devuelve { atril, bolsa } nuevos. */
export function rellenar(atril, bolsa) {
  const nuevaBolsa = [...bolsa];
  const nuevo = [...atril];
  while (nuevo.length < ATRIL && nuevaBolsa.length) nuevo.push(nuevaBolsa.pop());
  return { atril: nuevo, bolsa: nuevaBolsa };
}

// ---------- Léxico ----------
const BIT = Object.fromEntries(LETRAS.map((l, i) => [l, 1 << i]));
/** Máscara de letras distintas de una palabra (25 bits: a–z sin k/w, más ñ) */
export const mascara = (k) => {
  let m = 0;
  for (let j = 0; j < k.length; j++) m |= BIT[k[j]] || 0;
  return m;
};

/**
 * Prepara el léxico.
 * `datos` = { clave: "forma|chino" | "forma" } (src/data/palacio-lexico.json): formas con tilde y traducción.
 * `palabras` = diccionario completo (public/palabras/es.txt.gz, sin tildes): las que se aceptan.
 * Devuelve { mapa (traducciones), validas (Set), lista, mascaras }.
 */
export function prepararLexico(datos, palabras = [], { conIndice = true } = {}) {
  const mapa = new Map();
  for (const [k, v] of Object.entries(datos || {})) {
    const [es, zh = ""] = String(v).split("|");
    mapa.set(k, { es, zh });
  }
  const validas = new Set(palabras);
  // Las palabras del curso con traducción también valen (aunque no estén en la lista)
  const extra = new Set();
  for (const [k, v] of mapa)
    if (v.zh && /^[a-zñ]{2,13}$/.test(k) && !/[kw]/.test(k) && !validas.has(k)) {
      validas.add(k);
      extra.add(k);
    }
  // El índice (lista + máscaras) solo hace falta donde se buscan jugadas (el Worker del Rey Mono)
  return { mapa, validas, extra, cacheConocidas: new Map(), ...(conIndice ? indice([...validas]) : {}) };
}

/** Lista para el rival + máscara de letras de cada palabra (filtro rápido en buscarJugadas) */
export function indice(lista) {
  const l = lista.filter((k) => k.length >= 2 && k.length <= LADO);
  const mascaras = new Uint32Array(l.length);
  for (let i = 0; i < l.length; i++) mascaras[i] = mascara(l[i]);
  return { lista: l, mascaras };
}

/** ¿Tiene traducción en los diccionarios de la app? (el alumno aprende algo de la jugada) */
export function esConocida(lexico, k) {
  const c = lexico.cacheConocidas;
  if (c?.has(k)) return c.get(k);
  const r = !!traduccion(lexico, k).zh;
  c?.set(k, r);
  return r;
}
export const esValida = (lexico, k) => (lexico.validas ? lexico.validas.has(k) : lexico.mapa.has(k));
// Terminaciones verbales frecuentes (de más larga a más corta) para llegar al infinitivo
const TERMINACIONES = [
  ["aremos", "ar"], ["eremos", "er"], ["iremos", "ir"], ["ábamos", "ar"], ["abamos", "ar"], ["íamos", "er"], ["iamos", "er"], ["aron", "ar"], ["ieron", "er"],
  ["ando", "ar"], ["iendo", "er"], ["amos", "ar"], ["emos", "er"], ["imos", "ir"], ["aban", "ar"], ["ían", "er"], ["ian", "er"], ["aste", "ar"], ["iste", "er"],
  ["ado", "ar"], ["ada", "ar"], ["ido", "er"], ["ida", "er"], ["aba", "ar"], ["ía", "er"], ["ia", "er"], ["ará", "ar"], ["ara", "ar"], ["erá", "er"], ["era", "er"], ["irá", "ir"], ["ira", "ir"],
  ["as", "ar"], ["an", "ar"], ["es", "er"], ["en", "er"], ["ió", "er"], ["io", "er"], ["o", "ar"], ["a", "ar"], ["e", "er"], ["é", "ar"], ["ó", "ar"],
];
function lema(lexico, k) {
  for (const [fin, inf] of TERMINACIONES) {
    const f = clave(fin);
    if (!k.endsWith(f) || k.length - f.length < 2) continue;
    const raiz = k.slice(0, -f.length);
    for (const i of [inf, ...["ar", "er", "ir"].filter((x) => x !== inf)]) {
      const v = lexico.mapa.get(raiz + i);
      if (v?.zh) return { ...v, k: raiz + i };
    }
  }
  return null;
}
// Plurales, femeninos y pronombres pegados («casas» → casa, «acostarse» → acostar)
const BASES = [[/es$/, ""], [/s$/, ""], [/ces$/, "z"], [/a$/, "o"], [/as$/, "os"], [/as$/, "o"], [/(me|te|se|lo|la|le|los|las|les|nos)$/, ""]];
export function traduccion(lexico, k) {
  const v = lexico.mapa.get(k) || { es: k, zh: "" };
  if (v.zh) return v;
  for (const [re, fin] of BASES) {
    if (!re.test(k)) continue;
    const base = k.replace(re, fin);
    const b = base.length >= 2 && lexico.mapa.get(base);
    if (b?.zh) return { es: v.es, zh: b.zh, lema: b.es || base };
  }
  const l = lema(lexico, k);
  return l ? { es: v.es, zh: l.zh, lema: l.es || l.k } : v;
}

// ---------- Validación y puntuación ----------
const ERR = {
  vacia: { es: "Coloca al menos una ficha.", zh: "请至少放一张字母牌。" },
  linea: { es: "Las fichas deben ir en una sola fila o columna.", zh: "字母牌必须在同一行或同一列。" },
  huecos: { es: "No puede haber huecos entre tus fichas.", zh: "字母之间不能有空格。" },
  trono: { es: "La primera palabra debe pasar por el Trono del centro.", zh: "第一个单词必须经过中间的宝座。" },
  corta: { es: "Forma una palabra de al menos dos letras.", zh: "单词至少要两个字母。" },
  suelta: { es: "Tu palabra debe tocar las fichas del tablero.", zh: "单词必须连接棋盘上已有的字母。" },
  comodin: { es: "Elige la letra del comodín.", zh: "请选择万能牌的字母。" },
};

/**
 * Valida una jugada. `tablero`: array LADO² con null | {l, v, comodin}; `puestas`: Map(índice → {l, v, comodin}).
 * Devuelve { ok, error, palabras: [{ k, celdas, puntos, conocida }], total, siete }.
 */
export function evaluar(tablero, puestas, lexico, { comprobarDiccionario = true } = {}) {
  const ind = [...puestas.keys()];
  if (!ind.length) return { ok: false, error: ERR.vacia, palabras: [], total: 0 };
  for (const i of ind) if (!puestas.get(i).l) return { ok: false, error: ERR.comodin, palabras: [], total: 0 };
  const filas = new Set(ind.map(fila));
  const cols = new Set(ind.map(col));
  if (filas.size > 1 && cols.size > 1) return { ok: false, error: ERR.linea, palabras: [], total: 0 };
  const vacio = tablero.every((c) => !c);
  const letra = (i) => puestas.get(i) || tablero[i];

  // Dirección principal
  let horizontal;
  if (ind.length > 1) horizontal = filas.size === 1;
  else {
    const r = fila(ind[0]);
    const c = col(ind[0]);
    const h = (dentro(r, c - 1) && letra(idx(r, c - 1))) || (dentro(r, c + 1) && letra(idx(r, c + 1)));
    horizontal = !!h || !((dentro(r - 1, c) && letra(idx(r - 1, c))) || (dentro(r + 1, c) && letra(idx(r + 1, c))));
  }
  const paso = horizontal ? [0, 1] : [1, 0];

  // Sin huecos entre la primera y la última ficha puesta
  const orden = [...ind].sort((a, b) => a - b);
  {
    let r = fila(orden[0]);
    let c = col(orden[0]);
    const fin = orden[orden.length - 1];
    while (idx(r, c) !== fin) {
      r += paso[0];
      c += paso[1];
      if (!dentro(r, c) || !letra(idx(r, c))) return { ok: false, error: ERR.huecos, palabras: [], total: 0 };
    }
  }

  const palabraEn = (inicio, [dr, dc]) => {
    let r = fila(inicio);
    let c = col(inicio);
    while (dentro(r - dr, c - dc) && letra(idx(r - dr, c - dc))) {
      r -= dr;
      c -= dc;
    }
    const celdas = [];
    while (dentro(r, c) && letra(idx(r, c))) {
      celdas.push(idx(r, c));
      r += dr;
      c += dc;
    }
    return celdas;
  };

  const palabras = [];
  const principal = palabraEn(orden[0], paso);
  if (principal.length >= 2) palabras.push(principal);
  const perpendicular = horizontal ? [1, 0] : [0, 1];
  for (const i of orden) {
    const cruz = palabraEn(i, perpendicular);
    if (cruz.length >= 2) palabras.push(cruz);
  }
  if (!palabras.length) return { ok: false, error: ERR.corta, palabras: [], total: 0 };

  if (vacio) {
    if (!puestas.has(CENTRO * LADO + CENTRO)) return { ok: false, error: ERR.trono, palabras: [], total: 0 };
  } else {
    const toca = ind.some((i) => {
      const r = fila(i);
      const c = col(i);
      return [[-1, 0], [1, 0], [0, -1], [0, 1]].some(([dr, dc]) => dentro(r + dr, c + dc) && tablero[idx(r + dr, c + dc)]);
    });
    if (!toca) return { ok: false, error: ERR.suelta, palabras: [], total: 0 };
  }

  let total = 0;
  const resultado = [];
  const malas = [];
  for (const celdas of palabras) {
    const k = celdas.map((i) => letra(i).l).join("");
    if (comprobarDiccionario && !esValida(lexico, k)) malas.push(k);
    let suma = 0;
    let mult = 1;
    for (const i of celdas) {
      const f = letra(i);
      let v = f.comodin ? 0 : f.v;
      if (puestas.has(i)) {
        const p = PREMIOS[i];
        if (p === "L2") v *= 2;
        else if (p === "L3") v *= 3;
        else if (p === "P2" || p === "T") mult *= 2;
        else if (p === "P3") mult *= 3;
      }
      suma += v;
    }
    const puntos = suma * mult;
    total += puntos;
    resultado.push({ k, celdas, puntos, conocida: esConocida(lexico, k) });
  }
  const siete = ind.length === ATRIL;
  if (siete) total += BONO_SIETE;
  if (malas.length)
    return {
      ok: false,
      error: { es: `«${malas.join("», «").toUpperCase()}» no está en el diccionario del palacio.`, zh: `「${malas.join("」「").toUpperCase()}」不在宫殿词典里。` },
      malas,
      palabras: resultado,
      total,
    };
  return { ok: true, palabras: resultado, total, siete };
}

// ---------- El rival: el Rey Mono ----------
function bits(m) {
  let n = 0;
  for (; m; n++) m &= m - 1;
  return n;
}
function contar(letras) {
  const m = {};
  for (const l of letras) m[l] = (m[l] || 0) + 1;
  return m;
}

/**
 * Busca jugadas válidas para un atril. Devuelve la lista ordenada (mejor primero):
 * [{ puestas: Map(i → ficha), total, palabras }].
 * `limite` corta la búsqueda si tarda demasiado (ms).
 */
export function buscarJugadas(tablero, atril, lexico, { limite = 900, maxResultados = 400 } = {}) {
  const t0 = performance.now();
  const comodines = atril.filter((f) => f.comodin).length;
  const cuentaAtril = contar(atril.filter((f) => !f.comodin).map((f) => f.l));
  const vacio = tablero.every((c) => !c);
  if (!lexico.mascaras) Object.assign(lexico, indice([...lexico.validas]));
  const { lista, mascaras } = lexico;
  const mascaraAtril = mascara(Object.keys(cuentaAtril).join(""));
  const huecos = atril.length;

  const resultados = [];
  const vistas = new Set();
  const lineas = [];
  for (let r = 0; r < LADO; r++) lineas.push({ celdas: Array.from({ length: LADO }, (_, c) => idx(r, c)) });
  for (let c = 0; c < LADO; c++) lineas.push({ celdas: Array.from({ length: LADO }, (_, r) => idx(r, c)) });

  // Casillas «ancla»: vacías y junto a una ficha (o el trono si el tablero está vacío)
  const ancla = new Array(LADO * LADO).fill(false);
  if (vacio) ancla[CENTRO * LADO + CENTRO] = true;
  else
    for (let i = 0; i < LADO * LADO; i++) {
      if (tablero[i]) continue;
      const r = fila(i);
      const c = col(i);
      ancla[i] = [[-1, 0], [1, 0], [0, -1], [0, 1]].some(([dr, dc]) => dentro(r + dr, c + dc) && tablero[idx(r + dr, c + dc)]);
    }

  // Las líneas en orden aleatorio: si se acaba el tiempo, no siempre quedan las mismas sin mirar
  lineas.sort(() => Math.random() - 0.5);
  for (const linea of lineas) {
    const cel = linea.celdas;
    if (!cel.some((i) => ancla[i])) continue;
    // Filtro rápido: letras de la palabra ⊆ atril + fichas de esta línea (+ comodines)
    const enLinea = cel.filter((i) => tablero[i]).map((i) => tablero[i].l);
    const cuenta = contar(enLinea);
    for (const [l, n] of Object.entries(cuentaAtril)) cuenta[l] = (cuenta[l] || 0) + n;
    const disponible = mascaraAtril | mascara(enLinea.join(""));
    const maxLargo = vacio ? Math.min(ATRIL, LADO) : Math.min(LADO, enLinea.length + huecos);
    const candidatas = [];
    for (let w = 0; w < lista.length; w++) {
      const k = lista[w];
      if (k.length > maxLargo) continue;
      const fuera = mascaras[w] & ~disponible;
      if (fuera && (!comodines || bits(fuera) > comodines)) continue;
      const c = contar(k);
      let faltan = 0;
      for (const l in c) faltan += Math.max(0, c[l] - (cuenta[l] || 0));
      if (faltan <= comodines) candidatas.push(k);
    }
    for (const k of candidatas) {
      const n = k.length;
      for (let s = 0; s + n <= LADO; s++) {
        if (s > 0 && tablero[cel[s - 1]]) continue;
        if (s + n < LADO && tablero[cel[s + n]]) continue;
        let usaAtril = 0;
        let tocaAncla = false;
        let ok = true;
        const necesito = {};
        for (let j = 0; j < n; j++) {
          const f = tablero[cel[s + j]];
          if (f) {
            if (f.l !== k[j]) {
              ok = false;
              break;
            }
          } else {
            usaAtril++;
            necesito[k[j]] = (necesito[k[j]] || 0) + 1;
            if (ancla[cel[s + j]]) tocaAncla = true;
          }
        }
        if (!ok || !usaAtril || !tocaAncla || usaAtril > atril.length) continue;
        let faltan = 0;
        for (const [l, m] of Object.entries(necesito)) faltan += Math.max(0, m - (cuentaAtril[l] || 0));
        if (faltan > comodines) continue;
        // Asigna fichas del atril (primero las de la letra, después comodines)
        const disponibles = [...atril];
        const puestas = new Map();
        for (let j = 0; j < n; j++) {
          const i = cel[s + j];
          if (tablero[i]) continue;
          let pos = disponibles.findIndex((f) => !f.comodin && f.l === k[j]);
          if (pos < 0) pos = disponibles.findIndex((f) => f.comodin);
          const f = disponibles.splice(pos, 1)[0];
          puestas.set(i, f.comodin ? { ...f, l: k[j] } : f);
        }
        const firma = [...puestas.entries()].map(([i, f]) => `${i}${f.l}`).join(",");
        if (vistas.has(firma)) continue;
        vistas.add(firma);
        const ev = evaluar(tablero, puestas, lexico);
        if (ev.ok) resultados.push({ puestas, total: ev.total, palabras: ev.palabras });
      }
      if (performance.now() - t0 > limite) break;
    }
    if (performance.now() - t0 > limite) break;
  }
  resultados.sort((a, b) => b.total - a.total);
  return resultados.slice(0, maxResultados);
}

/** Elige la jugada del Rey Mono según la dificultad (fácil, normal, maestro). */
export function eligeMono(jugadas, dificultad = "normal", azar = Math.random) {
  if (!jugadas.length) return null;
  if (dificultad === "maestro") return jugadas[0];
  // Prefiere palabras con traducción en la app: así el alumno aprende algo de sus jugadas
  const conocidas = jugadas.filter((j) => j.palabras.every((p) => p.conocida));
  if (dificultad === "facil") {
    const pool0 = conocidas.length && azar() < 0.85 ? conocidas : jugadas;
    const pool = pool0.filter((j) => j.palabras[0]?.k.length <= 5);
    const base = pool.length ? pool : pool0;
    const desde = Math.floor(base.length * 0.35);
    const tramo = base.slice(desde, Math.max(desde + 1, Math.floor(base.length * 0.8)));
    return tramo[Math.floor(azar() * tramo.length)] || base[base.length - 1];
  }
  const base = conocidas.length && azar() < 0.6 ? conocidas : jugadas;
  const top = base.slice(0, Math.min(5, base.length));
  return top[Math.floor(azar() * top.length)];
}

export const sumaAtril = (atril) => atril.reduce((s, f) => s + (f.comodin ? 0 : f.v), 0);
