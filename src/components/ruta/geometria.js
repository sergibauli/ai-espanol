// Geometría del camino de la Ruta: una parada por clase + cofre del examen, en un carril de ancho fijo.
// La comparten RutaPage (dibujo del camino) y MonoViajero (recorrido del Rey Mono).
// v22 · Cada nivel tiene sus formas de recorrido (y cada tramo de 3 unidades alterna entre ellas):
//   muralla  → la Gran Muralla zigzaguea en tramos rectos con almenas            (A1)
//   rio      → puente de madera que serpentea sobre un río con linternas         (A2)
//   pincel   → trazo de tinta que hace rizos de caligrafía entre paradas         (B1)
//   escalinata → escalinata de mármol en el eje de la Ciudad Prohibida           (B2)
//   nubes    → el vuelo del Rey Mono saltando de nube en nube                    (todos, de vez en cuando)
// Todo es determinista: la misma unidad (nivel + posición) siempre dibuja la misma forma.
export const ANCHO_CARRIL = 300;
export const FILA = 150;
export const ARRIBA = 150;
const CENTRO = ANCHO_CARRIL / 2;

const FORMAS_NIVEL = {
  A1: ["muralla", "muralla", "nubes"],
  A2: ["rio", "rio", "nubes"],
  B1: ["pincel", "pincel", "nubes"],
  B2: ["escalinata", "escalinata", "nubes"],
};
// Desplazamiento horizontal de cada parada según la forma (se repite en ciclo)
const PASOS = {
  zigzag: [0, 48, 70, 48, 0, -48, -70, -48],
  muralla: [-78, 78, -50, 80, -78, 56],
  rio: [-80, 80, -80, 80],
  pincel: [-50, 50, -46, 54],
  escalinata: [0, 0, 0, 0],
  nubes: [-62, 70, -44, 76, -70, 52],
};
// Cómo se une una parada con la siguiente
const CURVA = { zigzag: "S", muralla: "recta", rio: "meandro", pincel: "rizo", escalinata: "recta", nubes: "salto" };

/** Forma del recorrido de la unidad `idx` (posición dentro del nivel) */
export function formaDe(nivel, idx = 0) {
  const lista = FORMAS_NIVEL[nivel];
  if (!lista) return { tipo: "zigzag", espejo: 1, curva: "S" };
  const tipo = lista[idx % lista.length];
  // Cada dos tramos el dibujo se refleja para que dos unidades seguidas no se parezcan
  const espejo = Math.floor(idx / lista.length) % 2 ? -1 : 1;
  return { tipo, espejo, curva: CURVA[tipo] };
}
const normal = (forma) => (typeof forma === "string" ? { tipo: forma, espejo: 1, curva: CURVA[forma] || "S" } : forma || { tipo: "zigzag", espejo: 1, curva: "S" });

/** Puntos [x, y] de las paradas de la unidad `idx` (la última es el cofre del examen) */
export function puntosCamino(idx, paradas, forma) {
  const f = normal(forma);
  if (f.tipo === "zigzag") return Array.from({ length: paradas + 1 }, (_, i) => [CENTRO + PASOS.zigzag[(idx * 3 + i) % 8], ARRIBA + i * FILA]);
  const pasos = PASOS[f.tipo] || PASOS.zigzag;
  return Array.from({ length: paradas + 1 }, (_, i) => {
    const ultima = i === paradas;
    // El cofre de la escalinata y de la muralla queda en el eje (puerta / torre final)
    const dx = ultima && (f.tipo === "escalinata" || f.tipo === "muralla") ? 0 : pasos[i % pasos.length] * f.espejo;
    return [CENTRO + dx, ARRIBA + i * FILA];
  });
}

/** Entrada del camino de cada unidad (arriba, bajo el estandarte) */
export const ENTRADA = [CENTRO, 0];

/** Puntos de control de la Bézier cúbica entre dos paradas según el tipo de curva */
function controles([fx, fy], [tx, ty], forma) {
  const dx = tx - fx;
  const dy = ty - fy;
  let tipo = normal(forma).curva;
  // La entrada (tramo corto) siempre es suave
  if (dy < 120 && (tipo === "rizo" || tipo === "salto" || tipo === "meandro")) tipo = "S";
  switch (tipo) {
    case "recta":
      return [[fx + dx / 3, fy + dy / 3], [fx + (2 * dx) / 3, fy + (2 * dy) / 3]];
    case "meandro": // se abre hacia fuera de cada parada antes de cruzar: curva de río
      return [[fx - dx * 0.55, fy + dy * 0.42], [tx + dx * 0.55, ty - dy * 0.42]];
    case "rizo": {
      // Bucle de pincel: los controles se cruzan y la curva da una vuelta hacia el lado al que va
      const lado = dx >= 0 ? 1 : -1;
      return [[fx + lado * 95, fy + dy * 0.95], [tx + lado * 95, ty - dy * 0.95]];
    }
    case "salto": // arco de vuelo: sube un poco al despegar y cae en picado sobre la nube
      return [[fx + dx * 0.9, fy - dy * 0.32], [tx + dx * 0.15, ty - dy * 0.95]];
    default:
      return [[fx, fy + dy / 2], [tx, ty - dy / 2]];
  }
}
export const curva = (desde, hasta, forma) => {
  const [c1, c2] = controles(desde, hasta, forma);
  return `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${hasta[0]} ${hasta[1]}`;
};
/** Un solo tramo entre dos puntos */
export const tramo = (desde, hasta, forma) => `M${desde[0]} ${desde[1]} ${curva(desde, hasta, forma)}`;
/** Trazado desde la entrada hasta la parada `hasta` */
export const trazado = (pts, hasta = pts.length - 1, forma) => {
  let d = tramo(ENTRADA, pts[0], forma);
  for (let i = 1; i <= hasta; i++) d += ` ${curva(pts[i - 1], pts[i], forma)}`;
  return d;
};
/** Punto de la curva entre dos paradas para t ∈ [0, 1] (misma Bézier que `curva`) */
export function puntoCurva(desde, hasta, t, forma) {
  const [c1, c2] = controles(desde, hasta, forma);
  const u = 1 - t;
  const b = (a, p, q, z) => u * u * u * a + 3 * u * u * t * p + 3 * u * t * t * q + t * t * t * z;
  return [b(desde[0], c1[0], c2[0], hasta[0]), b(desde[1], c1[1], c2[1], hasta[1])];
}

/* ---------- v24 · Muestreo del recorrido para dibujarlo como objeto (losas, tablones, peldaños, nubes) ---------- */
/** Muestras equiespaciadas (cada `paso` px) de todo el recorrido: entrada → paradas.
 *  Cada muestra: { x, y, a (ángulo de la tangente), nx, ny (normal a la izquierda), s (longitud acumulada), seg }
 *  `seg` = 0 en la entrada, i en el tramo pts[i-1] → pts[i] (así «seg <= hechas» = tramo ya recorrido). */
export function muestrear(pts, forma, paso = 8) {
  const finos = [];
  const tramos = [[ENTRADA, pts[0]], ...pts.slice(1).map((p, i) => [pts[i], p])];
  tramos.forEach(([a, b], seg) => {
    const n = 48;
    for (let k = seg ? 1 : 0; k <= n; k++) finos.push({ p: puntoCurva(a, b, k / n, forma), seg: k === 0 ? seg : seg });
  });
  let s = 0;
  for (let i = 0; i < finos.length; i++) {
    if (i) s += Math.hypot(finos[i].p[0] - finos[i - 1].p[0], finos[i].p[1] - finos[i - 1].p[1]);
    finos[i].s = s;
  }
  const total = s;
  const out = [];
  let j = 0;
  for (let d = 0; d <= total + 0.01; d += paso) {
    while (j < finos.length - 2 && finos[j + 1].s < d) j++;
    const f0 = finos[j];
    const f1 = finos[j + 1] || f0;
    const t = f1.s > f0.s ? (d - f0.s) / (f1.s - f0.s) : 0;
    const x = f0.p[0] + (f1.p[0] - f0.p[0]) * t;
    const y = f0.p[1] + (f1.p[1] - f0.p[1]) * t;
    // tangente con una ventana algo más amplia para que no tiemble en las esquinas
    const ia = Math.max(0, j - 1);
    const ib = Math.min(finos.length - 1, j + 2);
    const a = Math.atan2(finos[ib].p[1] - finos[ia].p[1], finos[ib].p[0] - finos[ia].p[0]);
    out.push({ x, y, a, nx: Math.sin(a), ny: -Math.cos(a), s: d, seg: f1.seg });
  }
  return out;
}
const r1 = (v) => Math.round(v * 10) / 10;
/** Polilínea desplazada `desp` px a lo largo de la normal (desp puede ser función de la muestra) */
export function paralela(m, desp = 0, dy = 0) {
  return m.map((q, i) => {
    const d = typeof desp === "function" ? desp(q, i) : desp;
    return `${i ? "L" : "M"}${r1(q.x + q.nx * d)} ${r1(q.y + q.ny * d + dy)}`;
  }).join("");
}
/** Cinta (polígono cerrado) de ancho variable alrededor del recorrido */
export function cinta(m, ancho, dx = 0, dy = 0) {
  const w = (q, i) => (typeof ancho === "function" ? ancho(q, i) : ancho) / 2;
  const izq = m.map((q, i) => `${r1(q.x + q.nx * w(q, i) + dx)} ${r1(q.y + q.ny * w(q, i) + dy)}`);
  const der = m.map((q, i) => `${r1(q.x - q.nx * w(q, i) + dx)} ${r1(q.y - q.ny * w(q, i) + dy)}`).reverse();
  return `M${izq.join("L")}L${der.join("L")}Z`;
}
/** Número pseudoaleatorio estable en [0, 1) */
export const azar = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
