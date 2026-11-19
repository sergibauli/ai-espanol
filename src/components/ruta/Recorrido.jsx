import * as React from "react";
import { muestrear, paralela, cinta, azar } from "./geometria.js";

/*
  v24 · El recorrido de cada unidad dibujado como objeto ilustrado (no como líneas):
    muralla    → adarve enlosado con parapetos, almenas y cara de ladrillo; torres de vigía (烽火台) en las paradas   (A1)
    rio        → río con orillas, agua con brillo y un puente de tablones con barandilla lacada y faroles; muelles redondos (A2)
    pincel     → pincelada de tinta con presión, bordes que sangran y trazos secos (飞白); piedras de tinta (砚台)        (B1)
    escalinata → escalinata de mármol con rampa imperial tallada (御路) y balaustradas; terrazas de mármol (须弥座)        (B2)
    nubes      → nubes volumétricas auspiciosas como pasaderas del vuelo del Rey Mono                                   (todos)
  Las losas, tablones y peldaños se colocan muestreando la curva (geometria.muestrear), con tonos estables.
  El tramo ya recorrido (seg <= hechas) se ilumina con tonos cálidos. Texturas propias en public/theme/ruta/.
  Las definiciones compartidas (patrones, degradados, filtros) van una sola vez en <RecorridoDefs/>.
*/
const BASE = import.meta.env.BASE_URL || "./";
const TEX = (n) => `${BASE}theme/ruta/${n}.webp`;
const f1 = (v) => Math.round(v * 10) / 10;
const P = (q, d, dy = 0) => `${f1(q.x + q.nx * d)} ${f1(q.y + q.ny * d + dy)}`;

/** Cuadrilátero entre dos muestras, de la normal `a` a la `b`, recortado `enc` px por cada extremo */
function losa(q0, q1, a, b, dy = 0, enc = 0) {
  const t0 = { ...q0, x: q0.x + Math.cos(q0.a) * enc, y: q0.y + Math.sin(q0.a) * enc };
  const t1 = { ...q1, x: q1.x - Math.cos(q1.a) * enc, y: q1.y - Math.sin(q1.a) * enc };
  return `M${P(t0, a, dy)}L${P(t1, a, dy)}L${P(t1, b, dy)}L${P(t0, b, dy)}Z`;
}
/** Acumula trozos de path por color para pintar muchas piezas con pocos elementos */
function cubos() {
  const mapa = new Map();
  return {
    add(color, d) {
      mapa.set(color, (mapa.get(color) || "") + d);
    },
    pintar(clase, extra = {}) {
      return [...mapa.entries()].map(([color, d]) => <path key={color} className={clase} d={d} style={{ fill: color }} {...extra} />);
    },
  };
}
const desplaza = (m, d) => m.map((q) => ({ ...q, x: q.x + q.nx * d, y: q.y + q.ny * d }));

export function Recorrido({ forma, pts, hechas = 0, alcanzada = false, alto }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const clave = `${forma.tipo}|${forma.espejo}|${pts.map((p) => p.join(",")).join(";")}`;
  const lit = (q) => alcanzada && q.seg <= hechas;
  const dibujo = React.useMemo(() => {
    const fn = DIBUJOS[forma.tipo] || DIBUJOS.muralla;
    return fn({ forma, pts, lit, uid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave, hechas, alcanzada]);
  const entorno = React.useMemo(() => {
    const o = marca({ forma, pts, lit });
    return { suelo: terreno(o), delante: primerPlano(o), bruma: brumaPendiente(o) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave, hechas, alcanzada]);
  return (
    <svg className={`r24 r24-${forma.tipo}`} width="300" height={alto} aria-hidden="true">
      {entorno.suelo}
      {dibujo}
      {entorno.bruma}
      {entorno.delante}
      {/* El camino nace de la niebla bajo el estandarte */}
      <ellipse cx="150" cy="4" rx="190" ry="78" style={{ fill: `url(#r25-entrada-${forma.tipo})` }} />
    </svg>
  );
}

/* ====================================================================== v25 · Terreno, bruma y primer plano */
// Color de la niebla de cada nivel (entrada del camino y tramo pendiente)
const NIEBLA = { muralla: "#eef1f5", rio: "#f6d4a0", pincel: "#2a3358", escalinata: "#eef3ec", nubes: "#fff6e0" };
// Lado de la luz clave: +1 el sol viene de la derecha (A1, B1), −1 de la izquierda (A2, B2)
const LUZ_LADO = { muralla: 1, rio: -1, pincel: 1, escalinata: -1, nubes: 1 };
const SUELO = {
  // [cresta iluminada, ladera en sombra, falda, borde difuso]
  muralla: ["#fdfaf4", "#9fb2d0", "#7489ad", "rgba(244,246,250,.55)"],
  rio: ["#f2cf92", "#c98e5c", "#a8684a", "rgba(250,214,160,.5)"],
  pincel: ["#efe6d2", "#d9cdb2", "#b9ab90", "rgba(239,230,210,.35)"],
  escalinata: ["#a9cf8f", "#5f8f60", "#3f6a4c", "rgba(226,238,226,.6)"],
};

/** Loma / ribera / papel / ladera bajo el recorrido: bordes que se funden, falda en sombra y sombra proyectada */
function terreno({ M, forma }) {
  const tipo = forma.tipo;
  const c = SUELO[tipo];
  if (!c) return null;
  const m = M(tipo === "pincel" ? 3 : 6);
  const lado = LUZ_LADO[tipo];
  const papel = tipo === "pincel";
  // borde: ondulación amplia + barbas de papel de arroz (pincel) o irregularidad del terreno
  const amplio = tipo === "escalinata" ? 2.2 : 1;
  const ancho = (q) => (papel ? 128 : tipo === "escalinata" ? 190 : 170) + 22 * amplio * Math.sin(q.s / 53 + 1) + 12 * Math.sin(q.s / 17) + (papel ? 4 * Math.sin(q.s / 7.3) + 1.6 * Math.sin(q.s / 2.9 + 2) : 3 * Math.sin(q.s / 5.1));
  const grad = `r25-suelo-${tipo}`;
  return (
    <g className={`r25-suelo r25-suelo-${tipo}`}>
      {/* Halo difuso: el terreno se funde con el paisaje */}
      <path className="r25-halo" d={cinta(m, (q) => ancho(q) + 60)} style={{ fill: c[3] }} />
      {/* Falda de la loma (volumen hacia el espectador) */}
      {tipo !== "pincel" && <path d={cinta(m, (q) => ancho(q) - 6, 0, 30)} style={{ fill: c[2] }} />}
      {tipo !== "pincel" && <path d={cinta(m, (q) => ancho(q) - 6, 0, 30)} style={{ fill: "url(#r25-falda)" }} />}
      <path d={cinta(m, ancho)} style={{ fill: `url(#${grad})` }} />
      <path d={cinta(m, (q) => ancho(q) - 4)} style={{ fill: "url(#r24-grano)", opacity: tipo === "pincel" ? 0.25 : 0.18 }} />
      {/* Sombra proyectada del camino sobre el terreno, opuesta a la luz */}
      {tipo !== "pincel" && <path className="r25-proyectada" d={cinta(m, tipo === "escalinata" ? 92 : tipo === "rio" ? 70 : 64, -lado * 16, 22)} />}
    </g>
  );
}

/** Tramo aún no recorrido: lo vela una bruma del color del nivel (desaturado y apagado) */
function brumaPendiente({ M, forma }) {
  const m = M(5).filter((q) => !q._lit);
  if (m.length < 3) return null;
  const w = forma.tipo === "escalinata" ? 110 : forma.tipo === "rio" ? 150 : 96;
  return <path className={`r25-bruma r25-bruma-${forma.tipo}`} d={cinta(m, w)} />;
}

/** Objetos delante del camino (oclusión): pinos nevados, tamariscos y rocas, hojas de orquídea a tinta, arbustos */
function primerPlano({ M, forma, pts }) {
  const tipo = forma.tipo;
  const borde = { escalinata: 92, rio: 92, muralla: 80, pincel: 62 }[tipo] || 80;
  const cerca = { escalinata: 50, rio: 66, muralla: 36, pincel: 30 }[tipo] || 40;
  const libres = M(34).filter((q, k) => k > 1 && !pts.some((p) => Math.hypot(p[0] - q.x, p[1] + 30 - q.y) < 72));
  const piezas = [];
  libres.forEach((q, k) => {
    if (azar(k * 9.1 + pts.length) < 0.3) return;
    const lado = k % 2 ? 1 : -1;
    // dos de cada tres en el borde del terreno (rompen su silueta); una pegada al camino (lo tapa un poco: oclusión)
    const off = (k % 3 === 0 ? cerca : borde) + azar(k * 3.3) * 14;
    const x = q.x + q.nx * lado * off;
    const y = q.y + q.ny * lado * off + 14;
    const e = (k % 3 === 0 ? 0.8 : 1) * (0.75 + azar(k * 5.7) * 0.5);
    piezas.push(<use key={k} href={`#r25-prop-${tipo}-${k % 2}`} transform={`translate(${f1(x)} ${f1(y)}) scale(${lado * e} ${e})`} />);
  });
  return <g className="r25-delante">{piezas}</g>;
}

/* ====================================================================== A1 · Muralla */
function muralla({ M, forma, pts }) {
  const W = 50; // ancho del adarve con sus parapetos
  const H = 20; // altura de la cara de ladrillo
  const m = M(4);
  const mt = M(7);
  const ultima = pts.length - 1;
  // Losas: dos hileras al tresbolillo; tonos de piedra con desgaste
  const TONOS = ["#d9cfb8", "#cfc4aa", "#e3dac6", "#c6ba9e", "#d4c9ae"];
  const CALIDOS = ["#f0d9a0", "#e8cd8c", "#f6e3b2", "#e2c27e", "#efd59a"];
  const losas = cubos();
  const ilum = cubos();
  const interior = W / 2 - 7;
  for (let j = 0; j + 2 < mt.length; j += 2) {
    const q0 = mt[j];
    const q1 = mt[j + 2];
    const r = azar(j * 3.1 + pts.length);
    const enc = 0.7;
    const encendida = q1._lit;
    const tono = (encendida ? CALIDOS : TONOS)[Math.floor(r * 5)];
    (encendida ? ilum : losas).add(tono, losa(q0, q1, 0.6, interior, 0, enc));
    // segunda hilera desplazada media losa
    const q0b = mt[j + 1];
    const q1b = mt[Math.min(j + 3, mt.length - 1)];
    const tono2 = (encendida ? CALIDOS : TONOS)[Math.floor(azar(j * 7.7 + 1) * 5)];
    (encendida ? ilum : losas).add(tono2, losa(q0b, q1b, -interior, -0.6, 0, enc));
  }
  // Almenas (merlones) sobre los dos parapetos, cada 15 px
  const caras = [];
  const topes = [];
  for (const lado of [1, -1]) {
    const linea = desplaza(M(15), lado * (W / 2 - 3));
    linea.forEach((q, k) => {
      if (k === 0) return;
      // hueco a la entrada de cada torre
      if (pts.slice(0, ultima).some((p) => Math.abs(p[0] - q.x) < 58 && Math.abs(p[1] + 24 - q.y) < 40)) return;
      const a = { ...q, nx: q.nx, ny: q.ny };
      const t = [Math.cos(q.a) * 4.5, Math.sin(q.a) * 4.5];
      const c = (s, d, dy) => `${f1(a.x + t[0] * s + a.nx * d)} ${f1(a.y + t[1] * s + a.ny * d + dy)}`;
      topes.push(`M${c(-1, -3.2, -15)}L${c(1, -3.2, -15)}L${c(1, 3.2, -15)}L${c(-1, 3.2, -15)}Z`);
      caras.push(`M${c(-1, lado * 3.2, -15)}L${c(1, lado * 3.2, -15)}L${c(1, lado * 3.2, -7)}L${c(-1, lado * 3.2, -7)}Z`);
      caras.push(`M${c(-1, -3.2, -15)}L${c(-1, 3.2, -15)}L${c(-1, 3.2, -7)}L${c(-1, -3.2, -7)}Z`);
    });
  }
  const parapetos = [1, -1].map((lado) => desplaza(m, lado * (W / 2 - 3)));
  return (
    <g>
      <path className="r24-sombra" d={cinta(m, W + 18, -16, H + 16)} />
      {/* Zócalo y cara de ladrillo (altura del muro) */}
      <path d={cinta(m, W + 4, 0, H + 3)} style={{ fill: "#6b5d47" }} />
      <path d={cinta(m, W, 0, H)} style={{ fill: "url(#r24-ladrillo)" }} />
      <path d={cinta(m, W, 0, H)} style={{ fill: "url(#r24-cara-muro)" }} />
      {/* Adarve: mortero, losas y desgaste */}
      <path d={cinta(m, W)} style={{ fill: "#8f8470" }} />
      {losas.pintar("r24-losa")}
      {ilum.pintar("r24-losa r24-lit")}
      <path d={cinta(m, W - 6)} style={{ fill: "url(#r24-grano)", opacity: 0.55 }} />
      <path d={cinta(m, W - 14)} className="r24-desgaste" />
      {/* Parapetos: cara oscura y remate claro */}
      {parapetos.map((pp, k) => (
        <g key={k}>
          <path d={cinta(pp, 6, 0, -1)} style={{ fill: "#6f6453" }} />
          <path d={cinta(pp, 6, 0, -4)} style={{ fill: "#857a66" }} />
          <path d={cinta(pp, 6, 0, -7)} style={{ fill: "#e7dfcc" }} />
          <path d={paralela(pp, -1.5, -7.5)} className="r24-filo-luz" />
        </g>
      ))}
      <path d={caras.join("")} style={{ fill: "#7a6e5b" }} />
      <path d={topes.join("")} style={{ fill: "#efe8d6", stroke: "#8a7e68", strokeWidth: 0.6 }} />
      {/* Torres de vigía en las paradas */}
      {pts.slice(0, ultima).map((p, i) => (
        <Torre key={i} x={p[0]} y={p[1]} k={i} />
      ))}
      <Explanada x={pts[ultima][0]} y={pts[ultima][1]} tipo="piedra" />
    </g>
  );
}

function Torre({ x, y, k }) {
  const hw = 60;
  const top = y + 8;
  const fondo = y + 64;
  const H = 36;
  const almenas = [];
  for (let px = x - hw + 4; px <= x + hw - 10; px += 14) almenas.push(px);
  return (
    <g className="r24-torre">
      <ellipse className="r24-sombra" cx={x - 14} cy={fondo + H + 8} rx={hw + 14} ry="16" />
      {/* Cara frontal de ladrillo con puerta en arco */}
      <rect x={x - hw} y={fondo - 2} width={hw * 2} height={H + 2} style={{ fill: "url(#r24-ladrillo)" }} />
      <rect x={x - hw} y={fondo - 2} width={hw * 2} height={H + 2} style={{ fill: "url(#r24-cara-torre)" }} />
      <path d={`M${x - 11} ${fondo + H}v-14a11 11 0 0 1 22 0v14z`} style={{ fill: "#2a2119" }} />
      <path d={`M${x - 13} ${fondo + H}v-14a13 13 0 0 1 26 0v14`} style={{ fill: "none", stroke: "#cfc4aa", strokeWidth: 2 }} />
      <rect x={x - hw - 2} y={fondo + H - 3} width={hw * 2 + 4} height="5" style={{ fill: "#6b5d47" }} />
      {/* Plataforma superior enlosada */}
      <rect x={x - hw} y={top} width={hw * 2} height={fondo - top} rx="2" style={{ fill: "#8f8470" }} />
      {Array.from({ length: 4 }, (_, f) =>
        Array.from({ length: 6 }, (_, c) => {
          const w = (hw * 2 - 12) / 6;
          const h = (fondo - top - 10) / 4;
          const r = azar(k * 31 + f * 7 + c);
          return <rect key={`${f}-${c}`} x={x - hw + 6 + c * w + (f % 2 ? w / 2 : 0) * 0 + 0.6} y={top + 5 + f * h + 0.6} width={w - 1.2} height={h - 1.2} rx="1" style={{ fill: ["#d9cfb8", "#cfc4aa", "#e3dac6", "#c9bd9f"][Math.floor(r * 4)] }} />;
        }),
      )}
      <rect x={x - hw + 4} y={top + 3} width={hw * 2 - 8} height={fondo - top - 6} style={{ fill: "url(#r24-grano)", opacity: 0.5 }} />
      <rect x={x - hw} y={top} width={hw * 2} height={fondo - top} style={{ fill: "url(#r24-luz-plataforma)" }} />
      {/* Parapeto perimetral con almenas (detrás y a los lados; delante, bajo) */}
      <path d={`M${x - hw} ${fondo}V${top}H${x + hw}V${fondo}`} style={{ fill: "none", stroke: "#e7dfcc", strokeWidth: 5, strokeLinejoin: "round" }} />
      <path d={`M${x - hw} ${fondo + 1}V${top + 1}H${x + hw}V${fondo + 1}`} style={{ fill: "none", stroke: "#857a66", strokeWidth: 1.2 }} transform="translate(0 2.5)" />
      {almenas.map((px) => (
        <g key={px}>
          <rect x={px} y={top - 11} width="8" height="9" style={{ fill: "#7a6e5b" }} />
          <rect x={px} y={top - 13} width="8" height="4" style={{ fill: "#efe8d6" }} />
        </g>
      ))}
      <rect x={x - hw - 3} y={fondo - 4} width={hw * 2 + 6} height="6" rx="1" style={{ fill: "#e7dfcc" }} />
      <rect x={x - hw - 3} y={fondo + 1} width={hw * 2 + 6} height="3" style={{ fill: "#6f6453" }} />
    </g>
  );
}

/* ====================================================================== A2 · Río y puente */
function rio({ M, forma, pts, uid }) {
  const m = M(4);
  const mt = M(6.5);
  const ultima = pts.length - 1;
  const orilla = (q) => 156 + 16 * Math.sin(q.s / 41) + 9 * Math.sin(q.s / 13 + 2);
  const hierba = (q) => 128 + 14 * Math.sin(q.s / 37 + 1) + 7 * Math.sin(q.s / 9);
  const agua = (q) => 110 + 8 * Math.sin(q.s / 29 + 0.5);
  const D = 36; // ancho del tablero
  const MADERA = ["#c48a4e", "#b47a40", "#cf9858", "#a86e38", "#bd844a"];
  const CALIDA = ["#e6b26a", "#dca25a", "#efbf78", "#d39a52", "#e8b870"];
  const tablones = cubos();
  const vetas = [];
  mt.forEach((q, j) => {
    if (j + 1 >= mt.length) return;
    const encendida = q._lit;
    const tono = (encendida ? CALIDA : MADERA)[Math.floor(azar(j * 5.3 + 2) * 5)];
    tablones.add(tono, losa(q, mt[j + 1], -D / 2, D / 2, 0, 0.8));
    const r = azar(j * 1.7);
    vetas.push(`M${P(q, -D / 2 + 3 + r * 6, 0)}L${P(q, D / 2 - 4 - r * 5, 0)}`);
  });
  // Pilotes y postes de la barandilla
  const postes = [];
  const pilotes = [];
  M(26).forEach((q, k) => {
    if (k === 0) return;
    for (const lado of [1, -1]) {
      postes.push(`M${P(q, lado * (D / 2 - 1), 0)}L${P(q, lado * (D / 2 - 1), -13)}`);
      if (k % 2 === 0) pilotes.push({ x: q.x + q.nx * lado * (D / 2 - 3), y: q.y + q.ny * lado * (D / 2 - 3) });
    }
  });
  // Un farol por tramo, colgado de un mástil en el lado exterior
  const faroles = pts.slice(0, ultima).map((p, i) => {
    const sig = pts[i + 1];
    const cerca = m.reduce((mejor, q) => (Math.abs(q.y - (p[1] + sig[1]) / 2) < Math.abs(mejor.y - (p[1] + sig[1]) / 2) ? q : mejor), m[0]);
    const lado = i % 2 ? 1 : -1;
    return { x: cerca.x + cerca.nx * lado * (D / 2 + 1), y: cerca.y + cerca.ny * lado * (D / 2 + 1), lado: cerca.nx * lado >= 0 ? 1 : -1, k: i };
  });
  return (
    <g>
      <path d={cinta(m, orilla)} style={{ fill: "#dcc48b" }} />
      <path d={cinta(m, orilla)} style={{ fill: "url(#r24-grano)", opacity: 0.4 }} />
      <path d={cinta(m, hierba)} className="r24-juncos" />
      <path d={cinta(m, (q) => agua(q) + 10)} style={{ fill: "#b49a62" }} />
      <path d={cinta(m, (q) => agua(q) + 4)} style={{ fill: "#6e6448" }} />
      <path d={cinta(m, agua)} style={{ fill: "url(#r24-agua)" }} />
      <path d={cinta(m, (q) => agua(q) - 30)} className="r24-hondo" />
      {[1, -1].map((lado) => (
        <path key={lado} className="r24-espuma" d={paralela(m, (q) => lado * (agua(q) / 2 - 3))} style={{ animationDelay: `${lado * -1.3}s` }} />
      ))}
      <path className="r24-destellos" d={paralela(m, (q) => 34 * Math.sin(q.s / 23))} />
      <path className="r24-destellos b" d={paralela(m, (q) => -30 * Math.cos(q.s / 19))} />
      {/* Sombra del puente sobre el agua y pilotes */}
      <path className="r24-sombra-agua" d={cinta(m, D + 4, 8, 13)} />
      {pilotes.map((p, k) => (
        <g key={k}>
          <ellipse cx={p.x} cy={p.y + 12} rx="6" ry="2.4" className="r24-onda-pilote" />
          <rect x={p.x - 2.5} y={p.y} width="5" height="12" rx="1" style={{ fill: "#3b2416" }} />
        </g>
      ))}
      {/* Tablero: vigas, tablones con veta y canto iluminado */}
      <path d={cinta(m, D + 4, 0, 5)} style={{ fill: "#4a2810" }} />
      <path d={cinta(m, D + 2)} style={{ fill: "#3b2010" }} />
      {tablones.pintar("r24-tablon")}
      <path d={vetas.join("")} style={{ fill: "none", stroke: "rgba(90,50,20,.35)", strokeWidth: 0.8 }} />
      <path d={cinta(m, D - 2)} style={{ fill: "url(#r24-grano)", opacity: 0.35 }} />
      {[1, -1].map((lado) => (
        <path key={lado} d={paralela(m, lado * (D / 2 + 0.5))} style={{ fill: "none", stroke: "#5a3014", strokeWidth: 3.2 }} />
      ))}
      {/* Barandilla lacada con remates dorados */}
      <path d={postes.join("")} style={{ fill: "none", stroke: "#8f0c21", strokeWidth: 3, strokeLinecap: "round" }} />
      {[1, -1].map((lado) => (
        <g key={lado}>
          <path d={paralela(m, lado * (D / 2 - 1), -13)} style={{ fill: "none", stroke: "#a5112a", strokeWidth: 3.6, strokeLinecap: "round" }} />
          <path d={paralela(m, lado * (D / 2 - 1), -14)} style={{ fill: "none", stroke: "#ff7a7a", strokeOpacity: 0.55, strokeWidth: 1 }} />
          <path d={paralela(m, lado * (D / 2 - 1), -6)} style={{ fill: "none", stroke: "#8f0c21", strokeWidth: 1.6 }} />
        </g>
      ))}
      {faroles.map((f) => (
        <Farol key={f.k} {...f} uid={uid} />
      ))}
      {pts.slice(0, ultima).map((p, i) => (
        <Muelle key={i} x={p[0]} y={p[1]} />
      ))}
      <Explanada x={pts[ultima][0]} y={pts[ultima][1]} tipo="madera" />
    </g>
  );
}

function Farol({ x, y, lado, k }) {
  const tx = x + lado * 12;
  return (
    <g className="r24-farol-mastil">
      <path d={`M${x} ${y}V${y - 40}h${lado * 13}`} style={{ fill: "none", stroke: "#3b2416", strokeWidth: 2.6, strokeLinecap: "round" }} />
      <circle cx={x} cy={y - 40} r="2" style={{ fill: "#f2c14e" }} />
      <g className="r24-farol" style={{ transformOrigin: `${tx}px ${y - 40}px`, animationDelay: `${k * -0.9}s` }}>
        <circle className="r24-farol-halo" cx={tx} cy={y - 24} r="22" />
        <line x1={tx} y1={y - 40} x2={tx} y2={y - 34} style={{ stroke: "#3b2416", strokeWidth: 1.2 }} />
        <rect x={tx - 5} y={y - 35} width="10" height="3" rx="1" style={{ fill: "#c8961e" }} />
        <ellipse cx={tx} cy={y - 24} rx="9" ry="10" style={{ fill: "url(#r24-farol)" }} />
        <path d={`M${tx} ${y - 34}c-7 3-7 17 0 20M${tx} ${y - 34}c7 3 7 17 0 20M${tx} ${y - 34}v20`} style={{ fill: "none", stroke: "rgba(110,0,20,.45)", strokeWidth: 0.9 }} />
        <rect x={tx - 5} y={y - 15} width="10" height="3" rx="1" style={{ fill: "#c8961e" }} />
        <path d={`M${tx} ${y - 12}v8`} style={{ stroke: "#c8102e", strokeWidth: 2, strokeLinecap: "round" }} />
      </g>
    </g>
  );
}

function Muelle({ x, y }) {
  const cy = y + 40;
  const rx = 68;
  const ry = 30;
  const tachas = Array.from({ length: 14 }, (_, k) => (k / 14) * Math.PI * 2);
  return (
    <g className="r24-muelle">
      <ellipse className="r24-sombra-agua" cx={x + 8} cy={cy + 20} rx={rx + 4} ry={ry + 4} />
      <ellipse className="r24-anillo-agua" cx={x} cy={cy + 14} rx={rx + 10} ry={ry + 9} />
      <ellipse cx={x} cy={cy + 11} rx={rx} ry={ry} style={{ fill: "#4a2810" }} />
      <ellipse cx={x} cy={cy + 6} rx={rx} ry={ry} style={{ fill: "#6b3c1a" }} />
      <ellipse cx={x} cy={cy} rx={rx} ry={ry} style={{ fill: "url(#r24-tarima)" }} />
      <ellipse cx={x} cy={cy} rx={rx - 2} ry={ry - 2} style={{ fill: "url(#r24-grano)", opacity: 0.35 }} />
      <ellipse cx={x} cy={cy} rx={rx} ry={ry} style={{ fill: "url(#r24-luz-redonda)" }} />
      <ellipse cx={x} cy={cy} rx={rx - 1} ry={ry - 1} style={{ fill: "none", stroke: "#a5112a", strokeWidth: 4.5 }} />
      <ellipse cx={x} cy={cy - 0.8} rx={rx - 1} ry={ry - 1} style={{ fill: "none", stroke: "#ff8a8a", strokeOpacity: 0.45, strokeWidth: 1 }} />
      {tachas.map((a) => (
        <circle key={a} cx={x + Math.cos(a) * (rx - 1)} cy={cy + Math.sin(a) * (ry - 1)} r="1.9" style={{ fill: "#f6d77e", stroke: "#8a5a1e", strokeWidth: 0.5 }} />
      ))}
    </g>
  );
}

/* ====================================================================== B1 · Pincelada de tinta */
function pincel({ M, forma, pts }) {
  const m = M(3);
  const ultima = pts.length - 1;
  // Posición (s) de cada parada: ahí el pincel se apoya (carga tinta) y luego se va secando hasta la siguiente
  const sParadas = [0, ...pts.map((p) => m.reduce((mejor, q) => (Math.hypot(q.x - p[0], q.y - p[1]) < Math.hypot(mejor.x - p[0], mejor.y - p[1]) ? q : mejor), m[0]).s)];
  const fin = m[m.length - 1].s;
  const seco = (q) => {
    let i = 0;
    while (i + 1 < sParadas.length && sParadas[i + 1] <= q.s) i++;
    const a0 = sParadas[i];
    const a1 = sParadas[i + 1] ?? fin;
    return a1 > a0 ? Math.min(1, Math.max(0, (q.s - a0) / (a1 - a0))) : 0;
  };
  const ancho = (q) => {
    const presion = sParadas.slice(1).reduce((acc, s0) => acc + 9 * Math.exp(-((q.s - s0) ** 2) / (2 * 26 ** 2)), 0);
    const entrada = Math.min(1, 0.2 + q.s / 50);
    const salida = Math.min(1, 0.3 + (fin - q.s) / 45);
    return (22 + 5 * Math.sin(q.s / 47 + 1) + 2 * Math.sin(q.s / 11)) * (1 - 0.38 * seco(q)) * entrada * salida + presion;
  };
  // 飞白: vetas de papel que asoman cuando el pincel se seca (más cuanto más lejos de la última parada)
  const vetas = [];
  for (let k = 0; k < 11; k++) {
    const f = -0.42 + (k / 10) * 0.84;
    const umbral = 0.28 + azar(k * 7.3) * 0.5;
    let d = "";
    let dentro = false;
    m.forEach((q) => {
      const visible = seco(q) > umbral && Math.sin(q.s / (5 + k) + k) > -0.6;
      if (!visible) {
        dentro = false;
        return;
      }
      const w = ancho(q) * f;
      d += `${dentro ? "L" : "M"}${f1(q.x + q.nx * w)} ${f1(q.y + q.ny * w)}`;
      dentro = true;
    });
    if (d) vetas.push(<path key={k} className="r25-veta" d={d} style={{ strokeWidth: 0.8 + azar(k * 3.1) * 1.4 }} />);
  }
  // Pan de oro (金箔) solo en el tramo recorrido
  const oro = [];
  m.forEach((q, k) => {
    if (!q._lit || azar(k * 1.31) > 0.22) return;
    const off = (azar(k * 2.7) - 0.5) * ancho(q) * 0.8;
    oro.push(<rect key={k} className="r25-oro" x={f1(q.x + q.nx * off - 1.2)} y={f1(q.y + q.ny * off - 1.2)} width={f1(1.4 + azar(k) * 2.2)} height={f1(1.2 + azar(k * 5) * 1.8)} transform={`rotate(${Math.round(azar(k * 9) * 90)} ${f1(q.x + q.nx * off)} ${f1(q.y + q.ny * off)})`} />);
  });
  const gotas = [];
  pts.slice(0, ultima).forEach((p, i) => {
    for (let g = 0; g < 4; g++) {
      const a = azar(i * 13 + g) * Math.PI * 2;
      const d = 58 + azar(i * 7 + g * 3) * 26;
      gotas.push({ x: p[0] + Math.cos(a) * d, y: p[1] + 30 + Math.sin(a) * d * 0.5, r: 1 + azar(i + g * 11) * 2.6 });
    }
  });
  const contorno = (q) => ancho(q) + 1.6 * Math.sin(q.s / 2.3) + 1.1 * Math.sin(q.s / 5.1);
  const hecho = m.filter((q) => q._lit);
  return (
    <g>
      <path className="r24-aguada" d={cinta(m, (q) => ancho(q) * 2.6)} />
      {/* Boceto pálido de lo que queda por pintar; lo recorrido, en tinta rica (el pincel pinta al avanzar) */}
      <path className="r25-tinta-boceto" d={cinta(m, contorno)} />
      {hecho.length > 2 && (
        <g>
          <path className="r25-tinta-cuerpo" d={cinta(hecho, contorno)} />
          <path className="r25-tinta-nucleo" d={cinta(hecho, (q) => ancho(q) * (0.5 - 0.3 * seco(q)))} />
          {[1, -1].map((lado) => (
            <path key={lado} className="r25-tinta-orla" d={paralela(hecho, (q) => (lado * contorno(q)) / 2 - lado * 1.2)} style={{ strokeDasharray: lado > 0 ? "70 6 30 4" : "44 5 90 7" }} />
          ))}
        </g>
      )}
      {[1, -1].map((lado) => (
        <path key={lado} className="r25-tinta-orla boceto" d={paralela(m.filter((q) => !q._lit), (q) => (lado * contorno(q)) / 2 - lado * 1.2)} />
      ))}
      {vetas}
      {oro}
      {gotas.map((g, k) => (
        <circle key={k} className="r24-gota" cx={f1(g.x)} cy={f1(g.y)} r={f1(g.r)} />
      ))}
      {pts.slice(0, ultima).map((p, i) => (
        <PiedraTinta key={i} x={p[0]} y={p[1]} k={i} />
      ))}
      <Explanada x={pts[ultima][0]} y={pts[ultima][1]} tipo="tinta" />
    </g>
  );
}

function PiedraTinta({ x, y, k = 0 }) {
  // Círculo zen (圆相) pintado de un solo trazo alrededor de la base, con aguada clara y sello rojo del artista
  const cx = x;
  const cy = y + 34;
  const rx = 66;
  const ry = 27;
  const ini = -2.2 + k * 0.9;
  const N = 64;
  const fuera = [];
  const dentro = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = ini + t * Math.PI * 1.86;
    const w = (1.5 + 7.5 * Math.sin(Math.PI * Math.min(1, t * 1.15)) ** 0.7) * (1 + 0.15 * Math.sin(t * 23));
    fuera.push(`${f1(cx + Math.cos(a) * (rx + w))} ${f1(cy + Math.sin(a) * (ry + w * 0.55))}`);
    dentro.push(`${f1(cx + Math.cos(a) * (rx - w))} ${f1(cy + Math.sin(a) * (ry - w * 0.55))}`);
  }
  const anillo = `M${fuera.join("L")}L${dentro.reverse().join("L")}Z`;
  return (
    <g className="r24-enso">
      <ellipse cx={cx} cy={cy} rx={rx + 10} ry={ry + 6} className="r24-aguada" />
      <ellipse cx={cx} cy={cy} rx={rx - 4} ry={ry - 3} style={{ fill: "rgba(250,246,236,.55)" }} />
      <path d={anillo} className="r24-tinta" />
      <path d={anillo} style={{ fill: "none", stroke: "rgba(236,229,214,.5)", strokeWidth: 0.8, strokeDasharray: "14 22 6 30" }} />
    </g>
  );
}

/* ====================================================================== B2 · Escalinata de mármol */
function escalinata({ M, forma, pts }) {
  const m = M(4);
  const mt = M(9);
  const ultima = pts.length - 1;
  const W = 78;
  const R = 26; // rampa imperial (御路) en el centro
  const peldanos = [];
  const filos = [];
  mt.forEach((q, j) => {
    if (j + 1 >= mt.length) return;
    for (const lado of [1, -1]) {
      peldanos.push(losa(q, mt[j + 1], lado * (R / 2 + 1), lado * (W / 2), 0, 0).replace(/Z$/, "Z"));
      filos.push(`M${P(q, lado * (R / 2 + 1), 0)}L${P(q, lado * (W / 2), 0)}`);
    }
  });
  const encendido = m.filter((q) => q._lit);
  const postes = [];
  M(24).forEach((q, k) => {
    if (k === 0) return;
    if (pts.slice(0, ultima).some((p) => Math.abs(p[1] + 22 - q.y) < 46)) return;
    for (const lado of [1, -1]) postes.push({ x: q.x + q.nx * lado * (W / 2 + 4), y: q.y + q.ny * lado * (W / 2 + 4), k: `${k}${lado}` });
  });
  return (
    <g>
      <path className="r24-sombra" d={cinta(m, W + 30, 12, 12)} />
      {/* Muro rojo con remate dorado a cada lado */}
      {[1, -1].map((lado) => (
        <path key={lado} d={paralela(m, lado * (W / 2 + 7), 5)} style={{ fill: "none", stroke: "#8f0c21", strokeWidth: 9 }} />
      ))}
      <path d={cinta(m, W)} style={{ fill: "url(#r24-marmol)" }} />
      <path d={peldanos.join("")} style={{ fill: "url(#r24-peldano)" }} />
      <path d={filos.join("")} style={{ fill: "none", stroke: "rgba(255,255,255,.95)", strokeWidth: 1.1 }} />
      {/* Rampa imperial tallada con nubes */}
      <path d={cinta(m, R + 4)} style={{ fill: "#b9ac90" }} />
      <path d={cinta(m, R)} style={{ fill: "url(#r24-marmol)" }} />
      <path d={cinta(m, R)} style={{ fill: "url(#r24-talla)" }} />
      {encendido.length > 1 && <path className="r24-rampa-oro" d={cinta(encendido, R - 2)} />}
      <path d={cinta(m, R)} style={{ fill: "url(#r24-luz-rampa)" }} />
      {/* Balaustradas de mármol */}
      {[1, -1].map((lado) => (
        <g key={lado}>
          <path d={paralela(m, lado * (W / 2 + 4), 0)} style={{ fill: "none", stroke: "#cfc6b2", strokeWidth: 7 }} />
          <path d={paralela(m, lado * (W / 2 + 4), -2)} style={{ fill: "none", stroke: "#fbf8ef", strokeWidth: 4 }} />
          <path d={paralela(m, lado * (W / 2 + 4), -11)} style={{ fill: "none", stroke: "#b5ab95", strokeWidth: 3.2 }} />
          <path d={paralela(m, lado * (W / 2 + 4), -12)} style={{ fill: "none", stroke: "#fffdf6", strokeWidth: 1.6 }} />
          <path d={paralela(m, lado * (W / 2 + 4), 6)} style={{ fill: "none", stroke: "#f2c14e", strokeWidth: 1.4 }} />
        </g>
      ))}
      {postes.map((p) => (
        <g key={p.k}>
          <rect x={p.x - 3.4} y={p.y - 17} width="6.8" height="17" rx="1" style={{ fill: "url(#r24-poste)" }} />
          <ellipse cx={p.x} cy={p.y - 18} rx="4.6" ry="3.4" style={{ fill: "#fffdf6", stroke: "#b5ab95", strokeWidth: 0.7 }} />
          <circle cx={p.x - 1} cy={p.y - 19.5} r="1.3" style={{ fill: "#fff" }} />
        </g>
      ))}
      {pts.slice(0, ultima).map((p, i) => (
        <Terraza key={i} x={p[0]} y={p[1]} />
      ))}
      <Explanada x={pts[ultima][0]} y={pts[ultima][1]} tipo="marmol" />
    </g>
  );
}

function Terraza({ x, y }) {
  const hw = 72;
  const top = y + 10;
  const fondo = y + 64;
  const balas = [];
  for (let px = x - hw + 6; px <= x + hw - 6; px += 16) balas.push(px);
  return (
    <g className="r24-terraza">
      <ellipse className="r24-sombra" cx={x + 12} cy={fondo + 34} rx={hw + 16} ry="14" />
      {/* Basamento 须弥座: molduras, friso rojo con tachas doradas */}
      <rect x={x - hw - 4} y={fondo + 20} width={hw * 2 + 8} height="9" rx="2" style={{ fill: "#d9cfb8" }} />
      <rect x={x - hw - 4} y={fondo + 27} width={hw * 2 + 8} height="3" style={{ fill: "#9a8f7a" }} />
      <rect x={x - hw + 4} y={fondo + 6} width={hw * 2 - 8} height="15" style={{ fill: "#8f0c21" }} />
      <rect x={x - hw + 4} y={fondo + 6} width={hw * 2 - 8} height="15" style={{ fill: "url(#r24-cara-roja)" }} />
      {Array.from({ length: 9 }, (_, k) => (
        <circle key={k} cx={x - hw + 14 + k * ((hw * 2 - 28) / 8)} cy={fondo + 13.5} r="2" style={{ fill: "#f6d77e", stroke: "#8a5a1e", strokeWidth: 0.5 }} />
      ))}
      <rect x={x - hw - 2} y={fondo - 2} width={hw * 2 + 4} height="9" rx="2" style={{ fill: "url(#r24-moldura)" }} />
      {/* Plataforma de mármol */}
      <rect x={x - hw} y={top} width={hw * 2} height={fondo - top} rx="4" style={{ fill: "url(#r24-marmol)" }} />
      <rect x={x - hw + 10} y={top + 8} width={hw * 2 - 20} height={fondo - top - 16} rx="3" style={{ fill: "none", stroke: "rgba(160,140,100,.45)", strokeWidth: 1 }} />
      <rect x={x - hw} y={top} width={hw * 2} height={fondo - top} rx="4" style={{ fill: "url(#r24-luz-plataforma)" }} />
      {/* Balaustrada trasera */}
      <path d={`M${x - hw + 2} ${top + 1}H${x + hw - 2}`} style={{ stroke: "#b5ab95", strokeWidth: 4 }} />
      <path d={`M${x - hw + 2} ${top - 9}H${x + hw - 2}`} style={{ stroke: "#fbf8ef", strokeWidth: 3 }} />
      {balas.map((px) => (
        <g key={px}>
          <rect x={px - 2.6} y={top - 14} width="5.2" height="15" rx="1" style={{ fill: "url(#r24-poste)" }} />
          <ellipse cx={px} cy={top - 15} rx="3.6" ry="2.6" style={{ fill: "#fffdf6", stroke: "#b5ab95", strokeWidth: 0.6 }} />
        </g>
      ))}
      <rect x={x - hw - 2} y={fondo - 3} width={hw * 2 + 4} height="2" style={{ fill: "#f2c14e" }} />
    </g>
  );
}

/* ====================================================================== Nubes (vuelo del Rey Mono) */
function nubes({ M, forma, pts }) {
  const m = M(5);
  const ultima = pts.length - 1;
  const pasaderas = M(34).filter((q, k) => k > 0 && !pts.some((p) => Math.hypot(p[0] - q.x, p[1] - q.y) < 52));
  return (
    <g>
      <path className="r24-estela-halo" d={paralela(m, 0)} />
      <path className="r24-estela" d={paralela(m, 0)} />
      {pasaderas.map((q, k) => {
        const e = 0.55 + azar(k * 3.3 + pts.length) * 0.35;
        const v = ["a", "b", "c"][k % 3];
        return <use key={k} href={`#r24-nube-${v}`} className={`r24-pasadera ${q._lit ? "lit" : ""}`} transform={`translate(${f1(q.x)} ${f1(q.y)}) scale(${(k % 2 ? -1 : 1) * e} ${e})`} style={{ animationDelay: `${k * -0.7}s` }} />;
      })}
      {pts.slice(0, ultima).map((p, i) => (
        <use key={i} href="#r24-nube-grande" className="r24-nube-parada" transform={`translate(${p[0]} ${p[1] + 34}) scale(${i % 2 ? -1 : 1} 1)`} />
      ))}
      <Explanada x={pts[ultima][0]} y={pts[ultima][1]} tipo="nube" />
    </g>
  );
}

/* ====================================================================== Meta: explanada bajo el templo del examen */
function Explanada({ x, y, tipo }) {
  const cy = y + 54;
  if (tipo === "nube") return <use href="#r24-nube-grande" transform={`translate(${x} ${cy - 2}) scale(1.35 1.15)`} className="r24-nube-parada" />;
  const mat = {
    piedra: ["url(#r24-losas-explanada)", "#a3967c", "#6b5d47", "#e7dfcc"],
    madera: ["url(#r24-tarima)", "#7a4520", "#4a2810", "#a5112a"],
    tinta: ["url(#r24-duan)", "#6a5a63", "#3a2f35", "#b3a4ad"],
    marmol: ["url(#r24-marmol)", "#d9cfb8", "#8f0c21", "#fbf8ef"],
  }[tipo];
  // Dos gradas elípticas (la inferior más ancha) con canto en sombra, filete dorado y escalinata frontal
  const grada = (rx, ry, dy, alto, k) => (
    <g key={k}>
      <ellipse cx={x} cy={cy + dy + alto} rx={rx} ry={ry} style={{ fill: mat[2] }} />
      <rect x={x - rx} y={cy + dy} width={rx * 2} height={alto} style={{ fill: mat[1] }} />
      <rect x={x - rx} y={cy + dy} width={rx * 2} height={alto} style={{ fill: "url(#r24-cara-torre)" }} />
      <ellipse cx={x} cy={cy + dy} rx={rx} ry={ry} style={{ fill: mat[0] }} />
      <ellipse cx={x} cy={cy + dy} rx={rx - 2} ry={ry - 2} style={{ fill: "url(#r24-grano)", opacity: tipo === "marmol" ? 0.12 : 0.35 }} />
      <ellipse cx={x} cy={cy + dy} rx={rx} ry={ry} style={{ fill: "url(#r24-luz-redonda)" }} />
      <ellipse cx={x} cy={cy + dy} rx={rx - 0.5} ry={ry - 0.5} style={{ fill: "none", stroke: mat[3], strokeWidth: 1.6, strokeOpacity: 0.8 }} />
    </g>
  );
  return (
    <g className="r24-explanada">
      <ellipse className="r24-sombra" cx={x + 14} cy={cy + 30} rx="122" ry="26" />
      {grada(112, 32, 10, 12, 0)}
      {grada(92, 25, -2, 9, 1)}
      <ellipse cx={x} cy={cy - 2} rx="84" ry="21" style={{ fill: "none", stroke: "#f2c14e", strokeWidth: 1.6, strokeOpacity: 0.9 }} />
      {/* Escalones delanteros */}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={x - 26 + k * 3} y={cy + 20 + k * 6} width={52 - k * 6} height="6" rx="1" style={{ fill: mat[3] }} />
          <rect x={x - 26 + k * 3} y={cy + 24 + k * 6} width={52 - k * 6} height="2" style={{ fill: mat[2], opacity: 0.6 }} />
        </g>
      ))}
    </g>
  );
}

const DIBUJOS = {
  muralla: (o) => muralla(marca(o)),
  rio: (o) => rio(marca(o)),
  pincel: (o) => pincel(marca(o)),
  escalinata: (o) => escalinata(marca(o)),
  nubes: (o) => nubes(marca(o)),
};
// M(paso): muestras del recorrido con q._lit = tramo ya recorrido
function marca(o) {
  const M = (paso) => muestrear(o.pts, o.forma, paso).map((q) => ((q._lit = o.lit(q)), q));
  return { ...o, M };
}

/* ====================================================================== Definiciones compartidas (una vez por página) */
export function RecorridoDefs() {
  return (
    <svg className="r24-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="r24-grano" patternUnits="userSpaceOnUse" width="128" height="128">
          <image href={TEX("grano")} width="128" height="128" />
        </pattern>
        <pattern id="r24-marmol" patternUnits="userSpaceOnUse" width="220" height="220">
          <image href={TEX("marmol")} width="220" height="220" />
        </pattern>
        <pattern id="r24-agua" patternUnits="userSpaceOnUse" width="180" height="180">
          <image href={TEX("agua")} width="180" height="180" />
        </pattern>
        {/* Ladrillo: hiladas al tresbolillo con llagas y luz arriba */}
        <pattern id="r24-ladrillo" patternUnits="userSpaceOnUse" width="24" height="12">
          <rect width="24" height="12" fill="#8a7b62" />
          <rect x=".6" y=".6" width="10.8" height="4.8" rx=".6" fill="#cbbd9e" />
          <rect x="12.6" y=".6" width="10.8" height="4.8" rx=".6" fill="#bfb090" />
          <rect x="-5.4" y="6.6" width="10.8" height="4.8" rx=".6" fill="#c4b696" />
          <rect x="6.6" y="6.6" width="10.8" height="4.8" rx=".6" fill="#d2c5a6" />
          <rect x="18.6" y="6.6" width="10.8" height="4.8" rx=".6" fill="#c4b696" />
          <path d="M.6 1.2h10.8M12.6 1.2h10.8M0 7.2h5.4M6.6 7.2h10.8M18.6 7.2h5.4" stroke="#efe6d0" strokeWidth=".7" />
        </pattern>
        <pattern id="r24-losas-explanada" patternUnits="userSpaceOnUse" width="40" height="20">
          <rect width="40" height="20" fill="#8f8470" />
          <rect x=".7" y=".7" width="18.6" height="8.6" rx="1" fill="#d9cfb8" />
          <rect x="20.7" y=".7" width="18.6" height="8.6" rx="1" fill="#cfc4aa" />
          <rect x="-9.3" y="10.7" width="18.6" height="8.6" rx="1" fill="#e3dac6" />
          <rect x="10.7" y="10.7" width="18.6" height="8.6" rx="1" fill="#c9bd9f" />
          <rect x="30.7" y="10.7" width="18.6" height="8.6" rx="1" fill="#e3dac6" />
        </pattern>
        {/* Nubes talladas en relieve para la rampa imperial */}
        <pattern id="r24-talla" patternUnits="userSpaceOnUse" width="26" height="34" x="137">
          <path d="M5 12c0-4 6-5 7-1c1-4 8-3 7 2c3 0 4 4 1 5H6c-3 0-3-5-1-6z" fill="none" stroke="#fff" strokeWidth="1.3" transform="translate(.8 .8)" />
          <path d="M5 12c0-4 6-5 7-1c1-4 8-3 7 2c3 0 4 4 1 5H6c-3 0-3-5-1-6z" fill="rgba(150,130,90,.18)" stroke="#a2967e" strokeWidth="1.1" />
          <path d="M9 27a3 3 0 1 1 4 2" fill="none" stroke="#a2967e" strokeWidth="1.1" />
          <path d="M9.8 27.8a3 3 0 1 1 4 2" fill="none" stroke="#fff" strokeWidth=".9" />
        </pattern>
        <linearGradient id="r24-cara-muro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d140b" stopOpacity=".05" />
          <stop offset="1" stopColor="#1d140b" stopOpacity=".42" />
        </linearGradient>
        <linearGradient id="r24-cara-torre" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".12" />
          <stop offset=".6" stopColor="#1d140b" stopOpacity=".12" />
          <stop offset="1" stopColor="#1d140b" stopOpacity=".45" />
        </linearGradient>
        <linearGradient id="r24-luz-plataforma" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#2a1a0c" stopOpacity=".22" />
        </linearGradient>
        <radialGradient id="r24-luz-redonda" cx=".38" cy=".3" r=".75">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#1d140b" stopOpacity=".3" />
        </radialGradient>
        <pattern id="r24-tarima" patternUnits="userSpaceOnUse" width="60" height="9">
          <rect width="60" height="9" fill="#4a2810" />
          <rect y=".5" width="60" height="8" fill="#c48a4e" />
          <rect x="0" y=".5" width="27" height="8" fill="#b47a40" />
          <path d="M3 3.5h18M30 5h24M8 6.5h12" stroke="rgba(90,50,20,.35)" strokeWidth=".7" />
          <path d="M27 .5v8" stroke="#4a2810" strokeWidth="1" />
          <path d="M0 1h60" stroke="rgba(255,230,190,.45)" strokeWidth=".8" />
        </pattern>
        <radialGradient id="r24-farol" cx=".4" cy=".38" r=".65">
          <stop offset="0" stopColor="#fff2b0" />
          <stop offset=".35" stopColor="#ff9a3c" />
          <stop offset=".75" stopColor="#d3141f" />
          <stop offset="1" stopColor="#7d0a1d" />
        </radialGradient>
        <radialGradient id="r24-farol-luz">
          <stop offset="0" stopColor="#ffd27a" stopOpacity=".7" />
          <stop offset=".5" stopColor="#ff8a3c" stopOpacity=".25" />
          <stop offset="1" stopColor="#ff8a3c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="r24-pizarra" cx=".35" cy=".25" r=".85">
          <stop offset="0" stopColor="#7c7a76" />
          <stop offset=".45" stopColor="#4a4845" />
          <stop offset="1" stopColor="#232220" />
        </radialGradient>
        <linearGradient id="r24-tinta-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#120f0d" stopOpacity=".95" />
          <stop offset=".45" stopColor="#2a2420" stopOpacity=".88" />
          <stop offset="1" stopColor="#3d3530" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="r24-duan" x1="0" y1="0" x2=".6" y2="1">
          <stop offset="0" stopColor="#b3a4ad" />
          <stop offset=".5" stopColor="#80707a" />
          <stop offset="1" stopColor="#56474f" />
        </linearGradient>
        <linearGradient id="r24-moler" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6e6068" />
          <stop offset=".45" stopColor="#564a51" />
          <stop offset=".55" stopColor="#74666e" />
          <stop offset="1" stopColor="#463a41" />
        </linearGradient>
        <radialGradient id="r24-charco" cx=".4" cy=".3" r=".8">
          <stop offset="0" stopColor="#4a4a4e" />
          <stop offset=".3" stopColor="#141416" />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
        <linearGradient id="r24-peldano" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a6c50" stopOpacity="0" />
          <stop offset=".62" stopColor="#7a6c50" stopOpacity="0" />
          <stop offset=".7" stopColor="#6a5a3c" stopOpacity=".55" />
          <stop offset="1" stopColor="#6a5a3c" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="r24-luz-rampa" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".45" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#5a4a30" stopOpacity=".28" />
        </linearGradient>
        <linearGradient id="r24-poste" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset=".55" stopColor="#e9e2d0" />
          <stop offset="1" stopColor="#a69c86" />
        </linearGradient>
        <linearGradient id="r24-cara-roja" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".35" />
          <stop offset=".3" stopColor="#fff" stopOpacity=".12" />
          <stop offset="1" stopColor="#000" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id="r24-moldura" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset=".5" stopColor="#ddd3bd" />
          <stop offset="1" stopColor="#9a8f7a" />
        </linearGradient>
        {/* Nubes volumétricas: cuerpo con luz arriba, vientre dorado y voluta grabada */}
        <radialGradient id="r24-nube" cx=".4" cy=".25" r=".85">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".5" stopColor="#fff6e2" />
          <stop offset=".8" stopColor="#f6dca0" />
          <stop offset="1" stopColor="#e2b765" />
        </radialGradient>
        <linearGradient id="r24-nube-vientre" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2c14e" stopOpacity="0" />
          <stop offset="1" stopColor="#c8961e" stopOpacity=".55" />
        </linearGradient>
        <g id="r24-nube-a">
          <ellipse cx="2" cy="12" rx="34" ry="7" fill="#5a3a10" opacity=".18" />
          <g stroke="#c8961e" strokeWidth="1.4">
            <circle cx="-18" cy="0" r="12" fill="url(#r24-nube)" />
            <circle cx="16" cy="-1" r="13" fill="url(#r24-nube)" />
            <circle cx="-2" cy="-9" r="16" fill="url(#r24-nube)" />
            <path d="M-30 6h60a8 8 0 0 1-8 6h-44a8 8 0 0 1-8-6z" fill="url(#r24-nube)" />
          </g>
          <path d="M-30 4c10 6 50 6 60 0v6h-60z" fill="url(#r24-nube-vientre)" />
          <path d="M-6 -6a5 5 0 1 1 6 6a3 3 0 1 0-3-3M10 0a4 4 0 1 1 5 4" fill="none" stroke="#d9a63a" strokeWidth="1.3" strokeLinecap="round" />
          <ellipse cx="-8" cy="-16" rx="8" ry="3.5" fill="#fff" opacity=".85" />
        </g>
        <g id="r24-nube-b">
          <ellipse cx="0" cy="11" rx="30" ry="6" fill="#5a3a10" opacity=".18" />
          <g stroke="#c8961e" strokeWidth="1.4">
            <circle cx="-14" cy="-2" r="11" fill="url(#r24-nube)" />
            <circle cx="12" cy="-4" r="14" fill="url(#r24-nube)" />
            <path d="M-26 5h52a7 7 0 0 1-7 6h-38a7 7 0 0 1-7-6z" fill="url(#r24-nube)" />
          </g>
          <path d="M-26 3c10 6 42 6 52 0v6h-52z" fill="url(#r24-nube-vientre)" />
          <path d="M6 -6a5 5 0 1 1 6 6a3 3 0 1 0-3-3" fill="none" stroke="#d9a63a" strokeWidth="1.3" strokeLinecap="round" />
          <ellipse cx="9" cy="-13" rx="7" ry="3" fill="#fff" opacity=".85" />
        </g>
        <g id="r24-nube-c">
          <ellipse cx="0" cy="10" rx="24" ry="5" fill="#5a3a10" opacity=".18" />
          <g stroke="#c8961e" strokeWidth="1.4">
            <circle cx="-8" cy="-3" r="12" fill="url(#r24-nube)" />
            <circle cx="10" cy="0" r="9" fill="url(#r24-nube)" />
            <path d="M-20 4h40a6 6 0 0 1-6 5h-28a6 6 0 0 1-6-5z" fill="url(#r24-nube)" />
          </g>
          <path d="M-12 -4a4 4 0 1 1 5 5" fill="none" stroke="#d9a63a" strokeWidth="1.3" strokeLinecap="round" />
          <ellipse cx="-9" cy="-11" rx="6" ry="2.6" fill="#fff" opacity=".85" />
        </g>
        <g id="r24-nube-grande">
          <ellipse cx="6" cy="22" rx="78" ry="12" fill="#5a3a10" opacity=".2" />
          <g stroke="#c8961e" strokeWidth="1.8">
            <circle cx="-50" cy="4" r="18" fill="url(#r24-nube)" />
            <circle cx="50" cy="2" r="20" fill="url(#r24-nube)" />
            <circle cx="-22" cy="-8" r="24" fill="url(#r24-nube)" />
            <circle cx="20" cy="-10" r="26" fill="url(#r24-nube)" />
            <path d="M-70 10h140a12 12 0 0 1-12 12h-116a12 12 0 0 1-12-12z" fill="url(#r24-nube)" />
          </g>
          <path d="M-70 8c20 12 120 12 140 0v12h-140z" fill="url(#r24-nube-vientre)" />
          <path d="M-36 0a7 7 0 1 1 8 8a4 4 0 1 0-4-4M30 -2a7 7 0 1 1 8 8a4 4 0 1 0-4-4M-4 10a5 5 0 1 1 6 5" fill="none" stroke="#d9a63a" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="-24" cy="-26" rx="13" ry="5" fill="#fff" opacity=".9" />
          <ellipse cx="22" cy="-30" rx="12" ry="4.5" fill="#fff" opacity=".8" />
        </g>
        {/* v25 · Terreno: luz desde el lado de la luz clave de cada nivel */}
        {Object.entries(SUELO).map(([tipo, c]) => (
          <linearGradient key={tipo} id={`r25-suelo-${tipo}`} gradientUnits="userSpaceOnUse" x1={LUZ_LADO[tipo] > 0 ? 40 : 260} y1="0" x2={LUZ_LADO[tipo] > 0 ? 260 : 40} y2="0">
            <stop offset="0" stopColor={c[1]} />
            <stop offset=".55" stopColor={c[0]} />
            <stop offset="1" stopColor={c[0]} />
          </linearGradient>
        ))}
        <linearGradient id="r25-falda" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".05" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
        {Object.entries(NIEBLA).map(([tipo, col]) => (
          <radialGradient key={tipo} id={`r25-entrada-${tipo}`} cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor={col} stopOpacity=".95" />
            <stop offset=".5" stopColor={col} stopOpacity=".6" />
            <stop offset="1" stopColor={col} stopOpacity="0" />
          </radialGradient>
        ))}
        {/* Piezas de primer plano (base en 0,0) */}
        <g id="r25-prop-muralla-0">
          <ellipse cx="4" cy="1" rx="22" ry="5" fill="#6f84aa" opacity=".35" />
          <rect x="-2" y="-10" width="4" height="11" fill="#4a3324" />
          {[0, 1, 2, 3].map((k) => {
            const w = 20 - k * 4.2;
            const b = -6 - k * 11;
            return (
              <g key={k}>
                <path d={`M${-w} ${b} L0 ${b - 19} L${w} ${b}Z`} fill={k % 2 ? "#1f3a33" : "#24433a"} />
                <path d={`M${w} ${b} L0 ${b - 19} L${w * 0.2} ${b}Z`} fill="#3f6656" opacity=".7" />
                <path d={`M${-w * 0.8} ${b - 2} Q${-w * 0.3} ${b - 7} 0 ${b - 19} Q${w * 0.4} ${b - 6} ${w * 0.9} ${b - 1} Q${w * 0.3} ${b - 5} 0 ${b - 4} Q${-w * 0.3} ${b - 6} ${-w * 0.8} ${b - 2}Z`} fill="#f7faff" />
              </g>
            );
          })}
        </g>
        <g id="r25-prop-muralla-1">
          <ellipse cx="3" cy="1" rx="20" ry="4.5" fill="#6f84aa" opacity=".35" />
          <path d="M-18 0 L-14 -12 L-4 -19 L8 -16 L17 -6 L18 0Z" fill="#6b6f7c" />
          <path d="M-4 -19 L8 -16 L17 -6 L18 0 L4 0 L2 -10Z" fill="#9aa0ad" />
          <path d="M-15 -11 L-4 -19 L8 -16 L12 -11 Q4 -14 -2 -12 Q-8 -9 -15 -11Z" fill="#fbfdff" />
        </g>
        <g id="r25-prop-rio-0">
          <ellipse cx="-3" cy="1" rx="18" ry="4" fill="#8a4a30" opacity=".3" />
          {[-10, -6, -2, 2, 6, 10, -8, 4].map((x, k) => (
            <path key={k} d={`M${x * 0.5} 0 Q${x} ${-14 - (k % 3) * 6} ${x * 1.8} ${-26 - (k % 4) * 6}`} fill="none" stroke={k % 2 ? "#7d7a3a" : "#a39a52"} strokeWidth="1.8" strokeLinecap="round" />
          ))}
          <circle cx="-6" cy="-30" r="2.4" fill="#d98aa0" />
          <circle cx="7" cy="-34" r="2" fill="#e6a0b4" />
        </g>
        <g id="r25-prop-rio-1">
          <ellipse cx="-3" cy="1" rx="22" ry="5" fill="#8a4a30" opacity=".3" />
          <path d="M-20 0 Q-20 -14 -8 -18 Q6 -22 16 -12 Q20 -5 19 0Z" fill="#a8684a" />
          <path d="M-20 0 Q-20 -14 -8 -18 Q-2 -19 2 -18 Q-6 -10 -4 0Z" fill="#e8b47c" />
          <path d="M-14 -6 H10 M-10 -11 H12" stroke="#8a4a30" strokeWidth=".8" opacity=".5" />
        </g>
        <g id="r25-prop-pincel-0">
          {/* Orquídea a tinta: hojas afiladas de un solo trazo con presión */}
          <path d="M0 0 C-6 -10 -18 -22 -38 -27 C-20 -19 -8 -9 0 0Z" fill="rgba(22,20,18,.82)" />
          <path d="M1 0 C2 -16 10 -30 24 -40 C14 -27 6 -14 1 0Z" fill="rgba(22,20,18,.78)" />
          <path d="M-1 0 C-4 -14 -6 -28 -16 -44 C-9 -28 -4 -14 -1 0Z" fill="rgba(22,20,18,.7)" />
          <path d="M2 0 C8 -6 18 -9 32 -7 C18 -5 9 -3 2 0Z" fill="rgba(22,20,18,.6)" />
          <path d="M-3 -20 q-5 -4 -3 -9 q4 2 3 9z M3 -24 q1 -7 6 -7 q0 5 -6 7z" fill="rgba(60,52,48,.75)" />
          <circle cx="0" cy="-24" r="1.4" fill="#c8102e" />
        </g>
        <g id="r25-prop-pincel-1">
          {/* Ramita de bambú a tinta */}
          <path d="M-2 0 C-1 -14 2 -28 6 -42" fill="none" stroke="rgba(22,20,18,.75)" strokeWidth="2.2" strokeLinecap="round" />
          {[[-1, -14, -150], [1, -24, -30], [3, -34, -160], [5, -40, -20]].map(([x, y, a], k) => (
            <path key={k} transform={`translate(${x} ${y}) rotate(${a})`} d="M0 0 C6 -3 14 -3 22 0 C14 2 6 2 0 0Z" fill={`rgba(22,20,18,${0.82 - k * 0.1})`} />
          ))}
        </g>
        <g id="r25-prop-escalinata-0">
          <ellipse cx="-3" cy="1" rx="22" ry="5" fill="#2f5a3a" opacity=".3" />
          <circle cx="-8" cy="-10" r="11" fill="#3f7a4a" />
          <circle cx="6" cy="-12" r="12" fill="#4f8f55" />
          <circle cx="-1" cy="-20" r="10" fill="#6aa86a" />
          <circle cx="-5" cy="-24" r="4" fill="#a8d58a" opacity=".8" />
          <circle cx="2" cy="-6" r="2" fill="#f4a6c0" />
          <circle cx="10" cy="-14" r="1.8" fill="#f4a6c0" />
        </g>
        <g id="r25-prop-escalinata-1">
          <ellipse cx="-3" cy="1" rx="20" ry="4.5" fill="#2f5a3a" opacity=".3" />
          <path d="M-17 0 Q-19 -12 -8 -17 Q4 -21 13 -12 Q18 -6 17 0Z" fill="#8f9a8a" />
          <path d="M-17 0 Q-19 -12 -8 -17 Q-2 -18 0 -17 Q-8 -8 -6 0Z" fill="#cfd8c8" />
          <path d="M-12 -12 Q-4 -18 6 -15 Q-2 -12 -12 -12Z" fill="#5f8f55" />
        </g>
        <filter id="r24-desenfoque" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="r24-sangrado" x="-10%" y="-5%" width="120%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.08" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="8" />
        </filter>
      </defs>
    </svg>
  );
}
