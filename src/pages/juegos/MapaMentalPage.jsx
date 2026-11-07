// Mapa mental · 思维导图 — lienzo SVG con zoom, ramas de la clase y fichas de vocabulario que se unen con flechas
import * as React from "react";
import { createPortal } from "react-dom";
import {
  CheckIcon,
  PlusIcon,
  MinusIcon,
  LocateFixedIcon,
  Trash2Icon,
  DownloadIcon,
  RotateCcwIcon,
  ShuffleIcon,
  PencilIcon,
  XIcon,
  Volume2Icon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { useContenidoJA, CabeceraJA, SelectorUnidadJA, chispasOro, barajar, reducido } from "./ja-comun.jsx";
import "../../styles/v13-juegos-a.css";

// ---------- Colores imperiales de los nodos ----------
const COLORES = {
  laca: { fill: "#c8102e", stroke: "#f2c14e", text: "#fff8e7", sub: "#ffe08a", nombre: "Laca · 漆红" },
  jade: { fill: "#1f6f5c", stroke: "#f2c14e", text: "#f3fff9", sub: "#d5f5e6", nombre: "Jade · 玉" },
  oro: { fill: "#f2c14e", stroke: "#8f0c21", text: "#3b2416", sub: "#8f0c21", nombre: "Oro · 金" },
  tinta: { fill: "#3b2416", stroke: "#c8961e", text: "#fbf1d9", sub: "#f2c14e", nombre: "Tinta · 墨" },
  papel: { fill: "#fbf3df", stroke: "#c8961e", text: "#3b2416", sub: "#8f0c21", nombre: "Papel · 纸" },
};
const COLORES_RAMA = ["laca", "jade", "tinta", "oro"];
const FUENTE_UI = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const FUENTE_ZH = 'STKaiti, KaiTi, "Kaiti SC", "Noto Serif SC", "Songti SC", serif';

// ---------- Medida y reparto del texto ----------
let medidor = null;
function anchoTexto(texto, fuente) {
  if (typeof document === "undefined") return texto.length * 8;
  medidor ||= document.createElement("canvas").getContext("2d");
  medidor.font = fuente;
  return medidor.measureText(texto).width;
}
function partir(texto, max, fuente, maxLineas = 3) {
  const limpio = String(texto || "").trim();
  if (!limpio) return [];
  const cjk = /[㐀-鿿]/.test(limpio) && !/\s/.test(limpio);
  const piezas = cjk ? [...limpio] : limpio.split(/\s+/);
  const lineas = [];
  let actual = "";
  for (const pieza of piezas) {
    const prueba = actual ? (cjk ? actual + pieza : `${actual} ${pieza}`) : pieza;
    if (anchoTexto(prueba, fuente) > max && actual) {
      lineas.push(actual);
      actual = pieza;
    } else actual = prueba;
  }
  if (actual) lineas.push(actual);
  if (lineas.length > maxLineas) {
    const cortadas = lineas.slice(0, maxLineas);
    cortadas[maxLineas - 1] = `${cortadas[maxLineas - 1].replace(/.$/, "")}…`;
    return cortadas;
  }
  return lineas;
}
const ESTILO = {
  centro: { es: `800 18px ${FUENTE_UI}`, zh: `700 17px ${FUENTE_ZH}`, max: 230, pad: 22, lh: 22, lz: 21, rx: 28 },
  rama: { es: `800 15px ${FUENTE_UI}`, zh: `700 15px ${FUENTE_ZH}`, max: 190, pad: 16, lh: 19, lz: 19, rx: 18 },
  palabra: { es: `700 15px ${FUENTE_UI}`, zh: `500 13px ${FUENTE_ZH}`, max: 170, pad: 14, lh: 19, lz: 17, rx: 14 },
  zh: { es: `700 19px ${FUENTE_ZH}`, zh: `500 12px ${FUENTE_UI}`, max: 150, pad: 14, lh: 23, lz: 15, rx: 14 },
  libre: { es: `700 15px ${FUENTE_UI}`, zh: `500 13px ${FUENTE_ZH}`, max: 180, pad: 14, lh: 19, lz: 17, rx: 14 },
};
const cacheGeo = new Map();
function geometria(nodo) {
  const clave = `${nodo.tipo}|${nodo.texto}|${nodo.sub || ""}`;
  if (cacheGeo.has(clave)) return cacheGeo.get(clave);
  const e = ESTILO[nodo.tipo] || ESTILO.libre;
  const lineasEs = partir(nodo.texto, e.max, e.es);
  const lineasZh = partir(nodo.sub, e.max, e.zh, 2);
  const ancho = Math.max(...lineasEs.map((l) => anchoTexto(l, e.es)), ...lineasZh.map((l) => anchoTexto(l, e.zh)), nodo.tipo === "centro" ? 150 : 56);
  const geo = { w: Math.ceil(ancho + e.pad * 2), h: Math.ceil(lineasEs.length * e.lh + lineasZh.length * e.lz + e.pad * 1.3), lineasEs, lineasZh, e };
  cacheGeo.set(clave, geo);
  return geo;
}

// ---------- Categorías gramaticales derivadas del vocabulario ----------
const CATEGORIAS = {
  verbo: { es: "Verbos", zh: "动词", pista: "-ar · -er · -ir" },
  sust: { es: "Sustantivos", zh: "名词", pista: "el · la · un · una" },
  adj: { es: "Adjetivos", zh: "形容词", pista: "¿cómo es?" },
  expr: { es: "Expresiones", zh: "表达 · 短语", pista: "frases hechas" },
};
const NO_VERBOS = /^(mujer|lugar|mar|bar|hogar|collar|azúcar|cáncer|carácter|placer|taller|alquiler|ayer|anteayer|suéter|chófer|máster|póster|líder|cráter|militar|familiar|altar|pilar|dólar|néctar|ámbar|alfiler|deber|poder|amanecer|atardecer|anochecer|par|nivel)$/;
function categoria(v) {
  const es = String(v.espanol || "").toLowerCase().replace(/\(.*?\)/g, "").trim();
  const zh = String(v.chino || "").replace(/[（(].*?[)）]/g, "").trim();
  const primero = es.split(/\s*[/,;]\s*/)[0].trim();
  const palabras = primero.split(/\s+/);
  if (/[¿?¡!.]/.test(es)) return "expr";
  if (/^(soy|eres|es|somos|sois|son|estoy|estás|está|estamos|están|tengo|tienes|tiene|tenemos|tienen|voy|vas|va|vamos|van|hay|quiero|quieres|puedo|puedes|vivo|vives|vive)$/.test(primero)) return "verbo";
  // Una sola palabra con mayúscula inicial en el vocabulario suele ser una fórmula: «Encantado», «Hola», «Gracias»
  if (palabras.length === 1 && /^[A-ZÁÉÍÓÚÑ]/.test(String(v.espanol).trim()) && !/的$/.test(zh)) return "expr";
  if (/^(el|la|los|las|un|una|unos|unas)$/.test(palabras[0]) && palabras.length <= 3) return "sust";
  if (palabras.length >= 2 && !/^[a-záéíóúñü]+(ar|er|ir|ír)(se)?$/.test(palabras[0])) return "expr";
  if (/的$/.test(zh) && palabras.length === 1) return "adj";
  if (/^[a-záéíóúñü]+(ar|er|ir|ír)(se|le|la|lo)?$/.test(palabras[0]) && !NO_VERBOS.test(palabras[0])) return palabras.length === 1 ? "verbo" : "expr";
  return "sust";
}

// ---------- Construcción de los mapas ----------
let contador = 0;
const nuevoId = (p = "n") => `${p}${Date.now().toString(36)}${(contador++).toString(36)}`;
const radial = (n, radio, inicio = -Math.PI / 2, fx = null) =>
  Array.from({ length: n }, (_, i) => {
    const angulo = n === 2 ? (i === 0 ? Math.PI : 0) : inicio + (Math.PI * 2 * i) / n;
    return { x: Math.round(Math.cos(angulo) * radio * (fx ?? (n === 2 ? 0.95 : 1.25))), y: Math.round(Math.sin(angulo) * radio) };
  });

function mapaRamas(contenido, estrecho) {
  const total = estrecho ? 6 : 8;
  const porCategoria = {};
  for (const v of contenido.vocabulario) (porCategoria[categoria(v)] ||= []).push(v);
  const cats = Object.keys(CATEGORIAS).filter((c) => porCategoria[c]?.length);
  // Ronda equilibrada: se reparte entre las categorías presentes
  const elegidas = [];
  const colas = cats.map((c) => barajar(porCategoria[c]));
  for (let i = 0; elegidas.length < total && colas.some((q) => q.length); i++) {
    const q = colas[i % colas.length];
    if (q.length) elegidas.push(q.pop());
  }
  const radio = estrecho ? 150 : 210;
  // En móvil, con dos ramas, una arriba y otra abajo (las palabras se colocan a su derecha)
  const inicio = cats.length === 4 ? -Math.PI * 0.75 : -Math.PI / 2;
  const posiciones = estrecho ? (cats.length === 2 ? [{ x: -40, y: -150 }, { x: -40, y: 150 }] : radial(cats.length, 140, inicio, 0.8)) : radial(cats.length, radio, inicio);
  const nodos = [
    { id: "centro", tipo: "centro", texto: contenido.titulo, sub: contenido.tituloChino, x: 0, y: 0, color: "laca", fijo: true },
    ...cats.map((c, i) => ({ id: `rama-${c}`, tipo: "rama", texto: CATEGORIAS[c].es, sub: CATEGORIAS[c].zh, cat: c, x: posiciones[i].x, y: posiciones[i].y, color: COLORES_RAMA[i % 4] })),
  ];
  const aristas = cats.map((c) => ({ id: `fija-${c}`, de: "centro", a: `rama-${c}`, fija: true }));
  const fichas = barajar(elegidas).map((v, i) => ({ id: `f${i}`, texto: v.espanol, sub: v.chino, cat: categoria(v), tipo: "palabra", habla: v.espanol }));
  return { nodos, aristas, fichas, cats };
}

function mapaPares(contenido, estrecho) {
  const total = estrecho ? 6 : 8;
  const elegidas = barajar(contenido.vocabulario).slice(0, total);
  const sepY = estrecho ? 62 : 74;
  const altoTotal = (elegidas.length - 1) * sepY;
  const xEs = estrecho ? -85 : -40;
  const nodos = [
    { id: "centro", tipo: "centro", texto: contenido.titulo, sub: contenido.tituloChino, x: estrecho ? 0 : -330, y: estrecho ? -altoTotal / 2 - 90 : 0, color: "laca", fijo: true },
    ...elegidas.map((v, i) => ({ id: `es${i}`, tipo: "palabra", texto: v.espanol, sub: "", par: i, x: xEs, y: -altoTotal / 2 + i * sepY, color: "papel", habla: v.espanol })),
  ];
  const aristas = estrecho ? [] : elegidas.map((_, i) => ({ id: `fija-${i}`, de: "centro", a: `es${i}`, fija: true }));
  const fichas = barajar(elegidas.map((v, i) => ({ id: `z${i}`, texto: v.chino, sub: "", par: i, tipo: "zh" })));
  return { nodos, aristas, fichas };
}

function mapaLibreInicial(contenido) {
  const teoria = contenido.teoria.slice(0, 6);
  const posiciones = radial(Math.max(teoria.length, 1), 200);
  return {
    nodos: [
      { id: "centro", tipo: "centro", texto: contenido.titulo, sub: contenido.tituloChino, x: 0, y: 0, color: "laca" },
      ...teoria.map((t, i) => ({ id: `t${i}`, tipo: "rama", texto: t.titulo, sub: t.tituloChino, x: posiciones[i].x, y: posiciones[i].y, color: COLORES_RAMA[i % 4] })),
    ],
    aristas: teoria.map((_, i) => ({ id: `a${i}`, de: "centro", a: `t${i}` })),
  };
}

const claveLibre = (c) => `dele_mapa_mental_m${c.numero}_${c.clase ? `c${c.clase}` : "u"}`;

// ---------- Geometría de las flechas ----------
function lado(n, hacia) {
  const g = geometria(n);
  const dx = hacia.x - n.x;
  const dy = hacia.y - n.y;
  if (Math.abs(dx) / (g.w / 2 + 30) > Math.abs(dy) / (g.h / 2 + 30)) return { x: n.x + Math.sign(dx) * (g.w / 2), y: n.y, eje: "x", s: Math.sign(dx) };
  return { x: n.x, y: n.y + Math.sign(dy || 1) * (g.h / 2), eje: "y", s: Math.sign(dy || 1) };
}
function curva(a, b) {
  const distancia = Math.max(40, Math.hypot(b.x - a.x, b.y - a.y) * 0.45);
  const c1 = a.eje === "x" ? { x: a.x + a.s * distancia, y: a.y } : { x: a.x, y: a.y + a.s * distancia };
  const c2 = b.eje === "x" ? { x: b.x + b.s * distancia, y: b.y } : b.eje === "y" ? { x: b.x, y: b.y + b.s * distancia } : b;
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
}
function rutaArista(origen, destino) {
  return curva(lado(origen, destino), lado(destino, origen));
}
function nodoEn(nodos, p) {
  for (let i = nodos.length - 1; i >= 0; i--) {
    const n = nodos[i];
    const g = geometria(n);
    if (Math.abs(p.x - n.x) <= g.w / 2 + 6 && Math.abs(p.y - n.y) <= g.h / 2 + 6) return n;
  }
  return null;
}
// Busca un hueco libre (en espiral) cerca de p para un nodo de tamaño geo
function huecoLibre(p, geo, nodos) {
  const choca = (q) =>
    nodos.some((n) => {
      const g = geometria(n);
      return Math.abs(q.x - n.x) < (g.w + geo.w) / 2 + 10 && Math.abs(q.y - n.y) < (g.h + geo.h) / 2 + 8;
    });
  if (!choca(p)) return p;
  for (let paso = 1; paso < 40; paso++) {
    const radio = 26 * paso;
    const intentos = 6 + paso * 2;
    for (let i = 0; i < intentos; i++) {
      const a = (Math.PI * 2 * i) / intentos + paso;
      const q = { x: p.x + Math.cos(a) * radio * 1.4, y: p.y + Math.sin(a) * radio };
      if (!choca(q)) return q;
    }
  }
  return p;
}
function limites(nodos) {
  if (!nodos.length) return { x0: -200, y0: -150, x1: 200, y1: 150 };
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const n of nodos) {
    const g = geometria(n);
    x0 = Math.min(x0, n.x - g.w / 2);
    x1 = Math.max(x1, n.x + g.w / 2 + 14);
    y0 = Math.min(y0, n.y - g.h / 2);
    y1 = Math.max(y1, n.y + g.h / 2);
  }
  return { x0, y0, x1, y1 };
}

// ---------- Nodo SVG ----------
const NodoSVG = React.memo(function NodoSVG({ nodo, seleccionado, estado, sacudir, conAsa }) {
  const g = geometria(nodo);
  const c = COLORES[nodo.color] || COLORES.papel;
  const e = g.e;
  const esCentro = nodo.tipo === "centro";
  const altoTexto = g.lineasEs.length * e.lh + g.lineasZh.length * e.lz;
  let y = -altoTexto / 2 + e.lh * 0.72;
  const trazo = estado === "ok" ? "#f2c14e" : estado === "bad" ? "#c8102e" : c.stroke;
  return (
    <g data-nodo={nodo.id} transform={`translate(${nodo.x},${nodo.y})`} className="ja-nodo">
      <g className={`ja-nodo-cuerpo${seleccionado ? " is-sel" : ""}${estado ? ` is-${estado}` : ""}${sacudir ? " ja-sacude" : ""}`} key={sacudir || "q"}>
        <rect x={-g.w / 2 + 3} y={-g.h / 2 + 5} width={g.w} height={g.h} rx={e.rx} fill="rgba(59,36,22,.28)" />
        {seleccionado && <rect className="ja-sel-aro ja-solo-pantalla" x={-g.w / 2 - 6} y={-g.h / 2 - 6} width={g.w + 12} height={g.h + 12} rx={e.rx + 6} fill="none" />}
        <rect x={-g.w / 2} y={-g.h / 2} width={g.w} height={g.h} rx={e.rx} fill={esCentro ? "url(#ja-grad-laca)" : c.fill} stroke={trazo} strokeWidth={esCentro ? 4 : estado ? 3.5 : 2.5} />
        <rect x={-g.w / 2 + 4.5} y={-g.h / 2 + 4.5} width={g.w - 9} height={g.h - 9} rx={Math.max(4, e.rx - 4)} fill="none" stroke={c.stroke} strokeOpacity={esCentro ? 0.75 : 0.45} strokeWidth="1" />
        {esCentro && (
          <g className="ja-solo-pantalla" fill="#f2c14e">
            <path d={`M${-g.w / 2 + 12},${-g.h / 2 + 12} l8,0 l-8,8 z`} />
            <path d={`M${g.w / 2 - 12},${-g.h / 2 + 12} l-8,0 l8,8 z`} />
            <path d={`M${-g.w / 2 + 12},${g.h / 2 - 12} l8,0 l-8,-8 z`} />
            <path d={`M${g.w / 2 - 12},${g.h / 2 - 12} l-8,0 l8,-8 z`} />
          </g>
        )}
        {g.lineasEs.map((l, i) => {
          const yy = y;
          y += e.lh;
          return (
            <text key={`e${i}`} x="0" y={yy} textAnchor="middle" fill={esCentro ? "#fff8e7" : c.text} style={{ font: e.es }}>
              {l}
            </text>
          );
        })}
        {g.lineasZh.map((l, i) => {
          const yy = y - e.lh + e.lz;
          y += e.lz;
          return (
            <text key={`z${i}`} x="0" y={yy} textAnchor="middle" fill={esCentro ? "#ffe08a" : c.sub} style={{ font: e.zh }}>
              {l}
            </text>
          );
        })}
        {estado === "ok" && (
          <g transform={`translate(${-g.w / 2},${-g.h / 2})`} className="ja-solo-pantalla">
            <circle r="11" fill="#f2c14e" stroke="#8f0c21" strokeWidth="2" />
            <path d="M-5,0 l3.5,4 l6.5,-7" fill="none" stroke="#8f0c21" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
      {conAsa && (
        <g data-asa={nodo.id} className="ja-asa ja-solo-pantalla" transform={`translate(${g.w / 2},0)`}>
          <circle r="22" fill="transparent" />
          <circle className="ja-asa-punto" r="9" fill="#f2c14e" stroke="#8f0c21" strokeWidth="2.5" />
          <path d="M-3.5,0 h7 M0,-3.5 v7" stroke="#8f0c21" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
});

// ---------- Modal para crear o editar un nodo de texto ----------
function ModalTexto({ inicial, onGuardar, onCerrar }) {
  const [texto, setTexto] = React.useState(inicial?.texto || "");
  const [sub, setSub] = React.useState(inicial?.sub || "");
  const ref = React.useRef(null);
  React.useEffect(() => ref.current?.focus(), []);
  return createPortal(
    <div className="ja-modal-fondo gm-no-adapt" onClick={onCerrar}>
      <form
        className="ja-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Nodo de texto · 文本节点"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (texto.trim()) onGuardar(texto.trim(), sub.trim());
        }}
      >
        <button type="button" className="ja-modal-cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
          <XIcon size={20} />
        </button>
        <p className="ja-modal-kicker">{inicial ? "Editar nodo · 编辑节点" : "Nuevo nodo · 新节点"}</p>
        <label className="ja-campo">
          <span>Texto en español · 西班牙语</span>
          <input ref={ref} value={texto} maxLength={80} onChange={(e) => setTexto(e.target.value)} placeholder="p. ej. Profesiones" />
        </label>
        <label className="ja-campo">
          <span>Nota en chino (opcional) · 中文备注（可选）</span>
          <input value={sub} maxLength={40} onChange={(e) => setSub(e.target.value)} placeholder="例如：职业" />
        </label>
        <button type="submit" className="ja-boton ja-boton-oro" disabled={!texto.trim()}>
          <CheckIcon size={18} /> Guardar · 保存
        </button>
      </form>
    </div>,
    document.body,
  );
}

// ---------- Página ----------
const MODOS = [
  { id: "ramas", es: "Reto: ramas", zh: "分类挑战" },
  { id: "pares", es: "Reto: parejas", zh: "中西配对" },
  { id: "libre", es: "Mapa libre", zh: "自由创作" },
];

export default function MapaMentalPage() {
  const { contenido, elegir, quitar } = useContenidoJA();
  if (!contenido)
    return (
      <div className="ja-raiz ja-mapa gm-no-adapt">
        <CabeceraJA titulo="Mapa mental" tituloZh="思维导图" sello="图" />
        <SelectorUnidadJA
          titulo="Mapa mental"
          tituloZh="思维导图"
          sello="图"
          descripcion="Elige una unidad y una clase: ordena su vocabulario en ramas, une español y chino o crea tu propio mapa. · 选择单元和课：把词汇分到分支、连接中西文，或创作你自己的导图。"
          onElegir={elegir}
        />
      </div>
    );
  return <MapaMental key={`${contenido.numero}-${contenido.clase}`} contenido={contenido} onCambiar={quitar} />;
}

function MapaMental({ contenido, onCambiar }) {
  const { playCorrect, playWrong, playWin, playClick } = useSound();
  const lienzoRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const [tam, setTam] = React.useState({ w: 800, h: 520 });
  const [medido, setMedido] = React.useState(false);
  const estrecho = tam.w < 600;
  const hayCategorias = React.useMemo(() => new Set(contenido.vocabulario.map(categoria)).size >= 2, [contenido]);
  const [modo, setModo] = React.useState(hayCategorias ? "ramas" : "pares");
  const [mapa, setMapa] = React.useState({ nodos: [], aristas: [] });
  const [fichas, setFichas] = React.useState([]);
  const [vista, setVista] = React.useState({ x: 400, y: 260, k: 1 });
  const [sel, setSel] = React.useState(null); // {tipo:'nodo'|'arista', id}
  const [cable, setCable] = React.useState(null); // conexión en curso {de, x, y}
  const [fantasma, setFantasma] = React.useState(null); // ficha arrastrada {ficha, x, y}
  const [resultado, setResultado] = React.useState(null);
  const [sacudidas, setSacudidas] = React.useState({});
  const [cajonAbierto, setCajonAbierto] = React.useState(true);
  const [modal, setModal] = React.useState(null); // {inicial?, idEditar?}
  const [ronda, setRonda] = React.useState(0);
  const premiados = React.useRef(new Set());
  const vistaRef = React.useRef(vista);
  vistaRef.current = vista;
  const mapaRef = React.useRef(mapa);
  mapaRef.current = mapa;
  const libre = modo === "libre";

  // Tamaño del lienzo
  React.useLayoutEffect(() => {
    const el = lienzoRef.current;
    if (!el) return;
    const medir = () => {
      setTam({ w: el.clientWidth || 800, h: el.clientHeight || 520 });
      setMedido(true);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const encuadrar = React.useCallback((nodos, w = tam.w, h = tam.h) => {
    const b = limites(nodos);
    const margen = 40;
    const k = Math.max(0.35, Math.min(1.25, (w - margen) / (b.x1 - b.x0 || 1), (h - margen) / (b.y1 - b.y0 || 1)));
    setVista({ k, x: w / 2 - ((b.x0 + b.x1) / 2) * k, y: h / 2 - ((b.y0 + b.y1) / 2) * k });
  }, [tam.w, tam.h]);

  // Construir el mapa al cambiar de modo o de ronda
  React.useEffect(() => {
    if (!medido) return;
    setSel(null);
    setResultado(null);
    setSacudidas({});
    premiados.current = new Set();
    if (modo === "libre") {
      let guardado = null;
      try {
        guardado = JSON.parse(localStorage.getItem(claveLibre(contenido)) || "null");
      } catch {}
      const base = guardado?.nodos?.length ? guardado : mapaLibreInicial(contenido);
      setMapa({ nodos: base.nodos, aristas: base.aristas || [] });
      const usados = new Set(base.nodos.map((n) => n.vocab).filter(Boolean));
      setFichas(contenido.vocabulario.map((v, i) => ({ id: `v${i}`, texto: v.espanol, sub: v.chino, tipo: "palabra", habla: v.espanol })).filter((f) => !usados.has(f.texto)));
      encuadrar(base.nodos);
    } else {
      const construido = modo === "ramas" ? mapaRamas(contenido, estrecho) : mapaPares(contenido, estrecho);
      setMapa({ nodos: construido.nodos, aristas: construido.aristas });
      setFichas(construido.fichas);
      // Deja sitio a las fichas que se van a colocar
      const extra =
        modo === "pares"
          ? [{ ...construido.nodos[1], id: "x", x: estrecho ? 85 : 200, tipo: "zh", texto: "某某某" }]
          : construido.nodos
              .filter((n) => n.tipo === "rama" && !estrecho)
              .map((n) => {
                const dir = Math.abs(n.x) < 60 ? 1 : Math.sign(n.x);
                return { id: "x", tipo: "palabra", texto: "xxxxxxxxxx", x: n.x + dir * (geometria(n).w / 2 + 120), y: n.y };
              });
      encuadrar([...construido.nodos, ...extra]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modo, ronda, contenido, medido]);

  // Guardar el mapa libre
  React.useEffect(() => {
    if (!libre || !mapa.nodos.length) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(claveLibre(contenido), JSON.stringify(mapa));
      } catch {}
    }, 300);
    return () => clearTimeout(t);
  }, [mapa, libre, contenido]);

  const aMundo = React.useCallback((cx, cy) => {
    const r = svgRef.current.getBoundingClientRect();
    const v = vistaRef.current;
    return { x: (cx - r.left - v.x) / v.k, y: (cy - r.top - v.y) / v.k };
  }, []);
  const aPantalla = React.useCallback((p) => {
    const r = svgRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    const v = vistaRef.current;
    return { x: r.left + v.x + p.x * v.k, y: r.top + v.y + p.y * v.k };
  }, []);

  const marcarCambio = () => setResultado((r) => (r ? { ...r, viejo: true } : r));

  const conectar = React.useCallback((de, a) => {
    if (!de || !a || de === a) return false;
    const { aristas } = mapaRef.current;
    if (aristas.some((x) => (x.de === de && x.a === a) || (x.de === a && x.a === de))) return false;
    setMapa((m) => ({ ...m, aristas: [...m.aristas, { id: nuevoId("a"), de, a, nueva: true }] }));
    marcarCambio();
    return true;
  }, []);

  // ---------- Gestos sobre el lienzo ----------
  const punteros = React.useRef(new Map());
  const gesto = React.useRef(null);

  const alPulsar = (e) => {
    const svg = svgRef.current;
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try {
      svg.setPointerCapture(e.pointerId);
    } catch {}
    if (punteros.current.size === 2) {
      const [p1, p2] = [...punteros.current.values()];
      gesto.current = { tipo: "pinza", d0: Math.hypot(p1.x - p2.x, p1.y - p2.y), v0: { ...vistaRef.current }, m0: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 } };
      setCable(null);
      return;
    }
    const asa = e.target.closest?.("[data-asa]");
    const nodoEl = e.target.closest?.("[data-nodo]");
    const aristaEl = e.target.closest?.("[data-arista]");
    if (asa) {
      const p = aMundo(e.clientX, e.clientY);
      gesto.current = { tipo: "asa", de: asa.getAttribute("data-asa") };
      setCable({ de: gesto.current.de, x: p.x, y: p.y });
      playClick?.();
      return;
    }
    if (nodoEl) {
      const id = nodoEl.getAttribute("data-nodo");
      const n = mapaRef.current.nodos.find((x) => x.id === id);
      const p = aMundo(e.clientX, e.clientY);
      gesto.current = { tipo: "nodo", id, dx: p.x - n.x, dy: p.y - n.y, sx: e.clientX, sy: e.clientY, movido: false, fijo: n.fijo };
      return;
    }
    if (aristaEl) {
      gesto.current = { tipo: "toque-arista", id: aristaEl.getAttribute("data-arista"), sx: e.clientX, sy: e.clientY };
      return;
    }
    gesto.current = { tipo: "pan", sx: e.clientX, sy: e.clientY, v0: { ...vistaRef.current }, movido: false };
  };

  const alMover = (e) => {
    if (!punteros.current.has(e.pointerId)) return;
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesto.current;
    if (!g) return;
    if (g.tipo === "pinza" && punteros.current.size >= 2) {
      const [p1, p2] = [...punteros.current.values()];
      const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      const k = Math.max(0.3, Math.min(2.6, g.v0.k * (d / g.d0)));
      const r = svgRef.current.getBoundingClientRect();
      const m = { x: (p1.x + p2.x) / 2 - r.left, y: (p1.y + p2.y) / 2 - r.top };
      const m0 = { x: g.m0.x - r.left, y: g.m0.y - r.top };
      const wx = (m0.x - g.v0.x) / g.v0.k;
      const wy = (m0.y - g.v0.y) / g.v0.k;
      setVista({ k, x: m.x - wx * k, y: m.y - wy * k });
    } else if (g.tipo === "pan") {
      if (Math.hypot(e.clientX - g.sx, e.clientY - g.sy) > 4) g.movido = true;
      setVista({ ...g.v0, x: g.v0.x + e.clientX - g.sx, y: g.v0.y + e.clientY - g.sy });
    } else if (g.tipo === "nodo") {
      if (!g.movido && Math.hypot(e.clientX - g.sx, e.clientY - g.sy) < 6) return;
      g.movido = true;
      if (g.fijo) return;
      const p = aMundo(e.clientX, e.clientY);
      setMapa((m) => ({ ...m, nodos: m.nodos.map((n) => (n.id === g.id ? { ...n, x: Math.round(p.x - g.dx), y: Math.round(p.y - g.dy) } : n)) }));
    } else if (g.tipo === "asa") {
      const p = aMundo(e.clientX, e.clientY);
      setCable({ de: g.de, x: p.x, y: p.y });
    }
  };

  const alSoltar = (e) => {
    punteros.current.delete(e.pointerId);
    const g = gesto.current;
    if (!g) return;
    if (g.tipo === "pinza") {
      if (punteros.current.size < 2) gesto.current = null;
      return;
    }
    gesto.current = null;
    if (g.tipo === "asa") {
      const destino = nodoEn(mapaRef.current.nodos, aMundo(e.clientX, e.clientY));
      setCable(null);
      if (destino && conectar(g.de, destino.id)) playClick?.();
    } else if (g.tipo === "nodo") {
      if (!g.movido) {
        setSel({ tipo: "nodo", id: g.id });
        const n = mapaRef.current.nodos.find((x) => x.id === g.id);
        if (n?.habla) speak(n.habla, 0.9, "m");
        else playClick?.();
        const ahora = Date.now();
        if (libre && g.id === ultimoToque.current.id && ahora - ultimoToque.current.t < 380) setModal({ idEditar: g.id, inicial: n });
        ultimoToque.current = { id: g.id, t: ahora };
      } else if (!g.fijo) marcarCambio();
    } else if (g.tipo === "toque-arista") {
      if (Math.hypot(e.clientX - g.sx, e.clientY - g.sy) < 8) setSel({ tipo: "arista", id: g.id });
    } else if (g.tipo === "pan" && !g.movido) setSel(null);
  };
  const ultimoToque = React.useRef({ id: null, t: 0 });

  // Rueda: zoom alrededor del cursor (escucha no pasiva para poder cancelar el scroll)
  React.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const rueda = (e) => {
      e.preventDefault();
      const r = svg.getBoundingClientRect();
      const v = vistaRef.current;
      const k = Math.max(0.3, Math.min(2.6, v.k * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015))));
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      setVista({ k, x: mx - ((mx - v.x) / v.k) * k, y: my - ((my - v.y) / v.k) * k });
    };
    svg.addEventListener("wheel", rueda, { passive: false });
    return () => svg.removeEventListener("wheel", rueda);
  }, []);

  const zoom = (factor) => {
    const v = vistaRef.current;
    const k = Math.max(0.3, Math.min(2.6, v.k * factor));
    setVista({ k, x: tam.w / 2 - ((tam.w / 2 - v.x) / v.k) * k, y: tam.h / 2 - ((tam.h / 2 - v.y) / v.k) * k });
  };

  // Desplaza la vista (animada) para que un punto del mundo quede dentro del lienzo
  const asegurarVisible = React.useCallback(
    (p, medio = { w: 160, h: 50 }) => {
      const v = vistaRef.current;
      const sx = v.x + p.x * v.k;
      const sy = v.y + p.y * v.k;
      const mx = Math.min((medio.w / 2) * v.k + 24, tam.w / 3);
      const my = Math.min((medio.h / 2) * v.k + 24, tam.h / 3);
      const dx = sx < mx ? mx - sx : sx > tam.w - mx ? tam.w - mx - sx : 0;
      const dy = sy < my ? my - sy : sy > tam.h - my ? tam.h - my - sy : 0;
      if (!dx && !dy) return;
      if (reducido()) return setVista({ ...v, x: v.x + dx, y: v.y + dy });
      const t0 = performance.now();
      const paso = (ahora) => {
        const t = Math.min(1, (ahora - t0) / 320);
        const s = 1 - Math.pow(1 - t, 3);
        setVista({ ...v, x: v.x + dx * s, y: v.y + dy * s });
        if (t < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    },
    [tam.w, tam.h],
  );

  // ---------- Fichas de la paleta ----------
  const colocarFicha = React.useCallback(
    (ficha, punto, nodoDestino) => {
      const destino = nodoDestino && (libre || (modo === "ramas" ? nodoDestino.tipo === "rama" : nodoDestino.id.startsWith("es"))) ? nodoDestino : null;
      let pos = punto;
      if (destino) {
        // Encima de un nodo (o con un nodo seleccionado): se coloca a su lado y se une
        const g = geometria(destino);
        const fuera = modo === "pares" || Math.abs(destino.x) < 60 ? 1 : Math.sign(destino.x);
        const hermanos = mapaRef.current.aristas.filter((a) => !a.fija && (a.de === destino.id || a.a === destino.id)).length;
        const propia = geometria({ tipo: ficha.tipo, texto: ficha.texto, sub: libre ? ficha.sub : "" });
        pos = { x: destino.x + fuera * (g.w / 2 + 46 + propia.w / 2), y: destino.y + (modo === "pares" ? 0 : (hermanos % 4) * (propia.h + 8) - (propia.h + 8)) };
      } else if (!pos) {
        const v = vistaRef.current;
        pos = { x: (tam.w / 2 - v.x) / v.k + Math.random() * 80 - 40, y: (tam.h / 2 - v.y) / v.k + Math.random() * 80 - 40 };
      }
      const geoFicha = geometria({ tipo: ficha.tipo, texto: ficha.texto, sub: libre ? ficha.sub : "" });
      pos = huecoLibre(pos, geoFicha, mapaRef.current.nodos);
      asegurarVisible(pos, geoFicha);
      const nodo = { id: nuevoId("p"), tipo: ficha.tipo, texto: ficha.texto, sub: libre || modo === "ramas" ? "" : ficha.sub, x: Math.round(pos.x), y: Math.round(pos.y), color: modo === "pares" ? "jade" : "papel", cat: ficha.cat, par: ficha.par, habla: ficha.habla, vocab: libre ? ficha.texto : undefined, nuevo: true };
      if (libre) nodo.sub = ficha.sub;
      setMapa((m) => ({ ...m, nodos: [...m.nodos, nodo] }));
      setFichas((f) => f.filter((x) => x.id !== ficha.id));
      if (destino) setTimeout(() => conectar(destino.id, nodo.id), 0);
      marcarCambio();
      if (ficha.habla) speak(ficha.habla, 0.9, "m");
      else playClick?.();
    },
    [tam.w, tam.h, modo, libre, conectar, playClick, asegurarVisible],
  );

  const pulsarFicha = (e, ficha) => {
    if (e.button !== undefined && e.button !== 0) return;
    const inicio = { x: e.clientX, y: e.clientY };
    let arrastrando = false;
    const mover = (ev) => {
      if (!arrastrando && Math.hypot(ev.clientX - inicio.x, ev.clientY - inicio.y) > 7) arrastrando = true;
      if (arrastrando) {
        ev.preventDefault();
        setFantasma({ ficha, x: ev.clientX, y: ev.clientY });
      }
    };
    const soltar = (ev) => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
      setFantasma(null);
      if (!arrastrando) {
        const seleccionado = sel?.tipo === "nodo" ? mapaRef.current.nodos.find((n) => n.id === sel.id) : null;
        colocarFicha(ficha, null, seleccionado);
        return;
      }
      const r = svgRef.current.getBoundingClientRect();
      if (ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) return;
      const p = aMundo(ev.clientX, ev.clientY);
      colocarFicha(ficha, p, nodoEn(mapaRef.current.nodos, p));
    };
    window.addEventListener("pointermove", mover, { passive: false });
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);
  };

  // ---------- Acciones ----------
  const borrar = React.useCallback(() => {
    if (!sel) return;
    if (sel.tipo === "arista") {
      const a = mapaRef.current.aristas.find((x) => x.id === sel.id);
      if (!a || a.fija) return;
      setMapa((m) => ({ ...m, aristas: m.aristas.filter((x) => x.id !== sel.id) }));
    } else {
      const n = mapaRef.current.nodos.find((x) => x.id === sel.id);
      if (!n || n.fijo || (!libre && !n.id.startsWith("p"))) return;
      if (libre && n.tipo === "centro") return;
      setMapa((m) => ({ nodos: m.nodos.filter((x) => x.id !== n.id), aristas: m.aristas.filter((a) => a.de !== n.id && a.a !== n.id) }));
      // La ficha vuelve a la paleta
      if (n.id.startsWith("p") && (n.vocab || !libre)) setFichas((f) => [{ id: nuevoId("f"), texto: n.texto, sub: libre ? n.sub : n.tipo === "zh" ? "" : n.sub, tipo: n.tipo, cat: n.cat, par: n.par, habla: n.habla }, ...f]);
    }
    setSel(null);
    marcarCambio();
    playClick?.();
  }, [sel, libre, playClick]);

  React.useEffect(() => {
    const tecla = (e) => {
      if (modal || /input|textarea/i.test(e.target.tagName)) return;
      if (e.key === "Delete" || e.key === "Backspace") borrar();
      if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [borrar, modal]);

  const pintar = (color) => {
    if (sel?.tipo !== "nodo") return;
    setMapa((m) => ({ ...m, nodos: m.nodos.map((n) => (n.id === sel.id && n.tipo !== "centro" ? { ...n, color } : n)) }));
    playClick?.();
  };

  const guardarModal = (texto, sub) => {
    if (modal?.idEditar) setMapa((m) => ({ ...m, nodos: m.nodos.map((n) => (n.id === modal.idEditar ? { ...n, texto, sub } : n)) }));
    else {
      const v = vistaRef.current;
      const base = sel?.tipo === "nodo" ? mapaRef.current.nodos.find((n) => n.id === sel.id) : null;
      const nodo = { id: nuevoId("p"), tipo: "libre", texto, sub, x: Math.round(base ? base.x + geometria(base).w / 2 + 120 : (tam.w / 2 - v.x) / v.k), y: Math.round(base ? base.y + 40 : (tam.h / 2 - v.y) / v.k + 60), color: "jade", nuevo: true };
      setMapa((m) => ({ ...m, nodos: [...m.nodos, nodo] }));
      if (base) setTimeout(() => conectar(base.id, nodo.id), 0);
      setSel({ tipo: "nodo", id: nodo.id });
    }
    setModal(null);
  };

  const reiniciarLibre = () => {
    if (!window.confirm("¿Borrar tu mapa y empezar de nuevo? · 要清除导图重新开始吗？")) return;
    try {
      localStorage.removeItem(claveLibre(contenido));
    } catch {}
    setRonda((r) => r + 1);
  };

  // ---------- Comprobar el reto ----------
  const comprobar = () => {
    const { nodos, aristas } = mapaRef.current;
    const porId = Object.fromEntries(nodos.map((n) => [n.id, n]));
    const estadoArista = {};
    const estadoNodo = {};
    let aciertos = 0;
    const colocados = nodos.filter((n) => n.id.startsWith("p"));
    for (const n of colocados) {
      const unidas = aristas.filter((a) => !a.fija && (a.de === n.id || a.a === n.id)).map((a) => ({ a, otro: porId[a.de === n.id ? a.a : a.de] }));
      let bien = false;
      let mal = false;
      for (const { a, otro } of unidas) {
        if (!otro) continue;
        const correcta = modo === "ramas" ? otro.tipo === "rama" && otro.cat === n.cat : otro.par === n.par && otro.id !== n.id && otro.tipo !== "centro";
        const relevante = modo === "ramas" ? otro.tipo === "rama" || otro.tipo === "palabra" : otro.tipo === "palabra" || otro.tipo === "zh";
        if (!relevante) continue;
        estadoArista[a.id] = correcta ? "ok" : "bad";
        if (correcta) bien = true;
        else mal = true;
      }
      const ok = bien && !mal;
      estadoNodo[n.id] = ok ? "ok" : unidas.length ? "bad" : "bad";
      if (ok) {
        aciertos++;
        if (modo === "pares") {
          const es = nodos.find((x) => x.par === n.par && x.id.startsWith("es"));
          if (es) estadoNodo[es.id] = "ok";
        }
      }
    }
    const total = colocados.length + fichas.length;
    const nuevos = colocados.filter((n) => estadoNodo[n.id] === "ok" && !premiados.current.has(n.texto));
    nuevos.forEach((n) => premiados.current.add(n.texto));
    const completo = aciertos === total && total > 0;
    let xp = nuevos.length * 2;
    if (completo && !premiados.current.has("__bono")) {
      premiados.current.add("__bono");
      xp += 10;
    }
    if (xp) addXp(xp);
    const estrellas = completo ? 3 : aciertos / total >= 0.6 ? 2 : aciertos > 0 ? 1 : 0;
    const marca = Date.now();
    setSacudidas(Object.fromEntries([...Object.entries(estadoNodo), ...Object.entries(estadoArista)].filter(([, v]) => v === "bad").map(([k]) => [k, marca])));
    setResultado({ aciertos, total, xp, estrellas, completo, faltan: fichas.length, estadoArista, estadoNodo });
    setSel(null);
    if (completo) {
      playWin?.();
      colocados.slice(0, 10).forEach((n, i) => setTimeout(() => {
        const p = aPantalla(n);
        chispasOro(p.x, p.y, 22);
      }, i * 90));
    } else if (aciertos) {
      playCorrect?.();
      colocados.filter((n) => estadoNodo[n.id] === "ok").slice(0, 6).forEach((n) => {
        const p = aPantalla(n);
        chispasOro(p.x, p.y, 14);
      });
      setTimeout(() => playWrong?.(), 350);
    } else playWrong?.();
  };

  // ---------- Exportar PNG ----------
  const exportar = async () => {
    const svg = svgRef.current;
    if (!svg) return;
    const copia = svg.cloneNode(true);
    copia.querySelectorAll(".ja-solo-pantalla").forEach((el) => el.remove());
    const capa = copia.querySelector("[data-capa]");
    const b = limites(mapaRef.current.nodos);
    const m = 40;
    const ancho = Math.ceil(b.x1 - b.x0 + m * 2);
    const alto = Math.ceil(b.y1 - b.y0 + m * 2 + 50);
    capa.setAttribute("transform", `translate(${m - b.x0},${m + 50 - b.y0})`);
    copia.setAttribute("width", ancho);
    copia.setAttribute("height", alto);
    copia.setAttribute("viewBox", `0 0 ${ancho} ${alto}`);
    copia.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    copia.removeAttribute("class");
    const fondo = copia.querySelector("[data-fondo]");
    fondo?.setAttribute("width", ancho);
    fondo?.setAttribute("height", alto);
    const ns = "http://www.w3.org/2000/svg";
    const titulo = document.createElementNS(ns, "text");
    titulo.setAttribute("x", 24);
    titulo.setAttribute("y", 36);
    titulo.setAttribute("fill", "#8f0c21");
    titulo.setAttribute("style", `font: 800 18px ${FUENTE_UI}`);
    titulo.textContent = `AI Español · ${contenido.nivel} · U${contenido.numero}${contenido.clase ? ` · Clase ${contenido.clase}` : ""} · 思维导图`;
    copia.insertBefore(titulo, capa);
    const datos = new XMLSerializer().serializeToString(copia);
    const img = new Image();
    const url = URL.createObjectURL(new Blob([datos], { type: "image/svg+xml;charset=utf-8" }));
    try {
      await new Promise((ok, mal) => {
        img.onload = ok;
        img.onerror = mal;
        img.src = url;
      });
      const escala = 2;
      const lienzo = document.createElement("canvas");
      lienzo.width = ancho * escala;
      lienzo.height = alto * escala;
      const ctx = lienzo.getContext("2d");
      ctx.scale(escala, escala);
      ctx.drawImage(img, 0, 0);
      const enlace = document.createElement("a");
      enlace.download = `mapa-mental-U${contenido.numero}${contenido.clase ? `-C${contenido.clase}` : ""}.png`;
      enlace.href = lienzo.toDataURL("image/png");
      enlace.click();
      playCorrect?.();
    } catch {
      playWrong?.();
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  // ---------- Render ----------
  const porId = React.useMemo(() => Object.fromEntries(mapa.nodos.map((n) => [n.id, n])), [mapa.nodos]);
  const origenCable = cable ? porId[cable.de] : null;
  const estadoA = resultado && !resultado.viejo ? resultado.estadoArista : {};
  const estadoN = resultado && !resultado.viejo ? resultado.estadoNodo : {};
  const nodoSel = sel?.tipo === "nodo" ? porId[sel.id] : null;
  const puedeBorrar = sel && (sel.tipo === "arista" ? !mapa.aristas.find((a) => a.id === sel.id)?.fija : nodoSel && !nodoSel.fijo && nodoSel.tipo !== "centro" && (libre || nodoSel.id.startsWith("p")));
  const instrucciones = {
    ramas: ["Arrastra cada palabra junto a su rama gramatical y únela con una flecha.", "把每个词拖到正确的词类分支旁，并用箭头连接。"],
    pares: ["Arrastra cada ficha china junto a su palabra española y únelas.", "把每个中文卡片拖到对应的西班牙语单词旁并连线。"],
    libre: ["Crea tu propio mapa: añade palabras y notas, colorea, mueve y une con flechas.", "创作你自己的导图：添加词语和笔记，上色、移动并连线。"],
  }[modo];

  return (
    <div className="ja-raiz ja-mapa gm-no-adapt">
      <CabeceraJA titulo="Mapa mental" tituloZh="思维导图" sello="图" contenido={contenido} onCambiar={onCambiar} />

      <div className="ja-modos" role="tablist" aria-label="Modo · 模式">
        {MODOS.filter((m) => m.id !== "ramas" || hayCategorias).map((m) => (
          <button key={m.id} type="button" role="tab" aria-selected={modo === m.id} className={`ja-modo${modo === m.id ? " is-on" : ""}`} onClick={() => setModo(m.id)}>
            <b>{m.es}</b>
            <small>{m.zh}</small>
          </button>
        ))}
      </div>

      <p className="ja-instruccion">
        <span>{instrucciones[0]}</span>
        <span lang="zh">{instrucciones[1]}</span>
      </p>

      <div className={`ja-mesa${cajonAbierto ? " cajon-abierto" : ""}`}>
        <div className="ja-lienzo" ref={lienzoRef}>
          <svg
            ref={svgRef}
            className={`ja-svg${cable ? " is-cableando" : ""}`}
            width={tam.w}
            height={tam.h}
            onPointerDown={alPulsar}
            onPointerMove={alMover}
            onPointerUp={alSoltar}
            onPointerCancel={alSoltar}
            role="application"
            aria-label="Lienzo del mapa mental · 思维导图画布"
          >
            <defs>
              <pattern id="ja-puntos" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform={`translate(${vista.x},${vista.y}) scale(${vista.k})`}>
                <circle cx="14" cy="14" r="1.4" fill="#8a6a3f" fillOpacity=".35" />
              </pattern>
              <radialGradient id="ja-grad-laca" cx="50%" cy="35%" r="75%">
                <stop offset="0" stopColor="#e2283f" />
                <stop offset=".6" stopColor="#c8102e" />
                <stop offset="1" stopColor="#8f0c21" />
              </radialGradient>
              <marker id="ja-flecha" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                <path d="M1,1 L11,6 L1,11 L4,6 z" fill="#8a5a2b" />
              </marker>
              <marker id="ja-flecha-ok" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                <path d="M1,1 L11,6 L1,11 L4,6 z" fill="#c8961e" />
              </marker>
              <marker id="ja-flecha-bad" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                <path d="M1,1 L11,6 L1,11 L4,6 z" fill="#c8102e" />
              </marker>
            </defs>
            <rect data-fondo="" x="0" y="0" width={tam.w} height={tam.h} fill="#f6ead0" />
            <rect className="ja-solo-pantalla" x="0" y="0" width={tam.w} height={tam.h} fill="url(#ja-puntos)" />
            <g data-capa="" transform={`translate(${vista.x},${vista.y}) scale(${vista.k})`}>
              {mapa.aristas.map((a) => {
                const de = porId[a.de];
                const hacia = porId[a.a];
                if (!de || !hacia) return null;
                const d = rutaArista(de, hacia);
                const est = estadoA[a.id];
                const elegida = sel?.tipo === "arista" && sel.id === a.id;
                return (
                  <g key={a.id} data-arista={a.id} className={`ja-arista${est ? ` is-${est}` : ""}${elegida ? " is-sel" : ""}${a.fija ? " is-fija" : ""}`}>
                    <path className="ja-solo-pantalla" d={d} stroke="transparent" strokeWidth="18" fill="none" />
                    {elegida && <path className="ja-solo-pantalla ja-arista-halo" d={d} fill="none" />}
                    <path
                      key={est && sacudidas[a.id] ? sacudidas[a.id] : "l"}
                      className={`ja-arista-linea${a.nueva ? " is-nueva" : ""}${est === "bad" ? " ja-sacude" : ""}`}
                      d={d}
                      fill="none"
                      stroke={est === "ok" ? "#c8961e" : est === "bad" ? "#c8102e" : a.fija ? "#b0894f" : "#8a5a2b"}
                      strokeWidth={est ? 4 : a.fija ? 3 : 2.6}
                      strokeDasharray={a.fija ? "2 7" : undefined}
                      strokeLinecap="round"
                      markerEnd={a.fija ? undefined : `url(#ja-flecha${est ? `-${est}` : ""})`}
                      pathLength={a.nueva && !a.fija ? 1 : undefined}
                    />
                  </g>
                );
              })}
              {origenCable && (
                <path className="ja-cable ja-solo-pantalla" d={curva(lado(origenCable, cable), { x: cable.x, y: cable.y, eje: "p" })} fill="none" stroke="#c8102e" strokeWidth="3" strokeDasharray="7 6" markerEnd="url(#ja-flecha-bad)" />
              )}
              {mapa.nodos.map((n) => (
                <NodoSVG key={n.id} nodo={n} seleccionado={sel?.tipo === "nodo" && sel.id === n.id} estado={estadoN[n.id]} sacudir={estadoN[n.id] === "bad" ? sacudidas[n.id] : 0} conAsa={libre || n.tipo !== "centro"} />
              ))}
            </g>
          </svg>

          <div className="ja-zoom" role="group" aria-label="Zoom">
            <button type="button" onClick={() => zoom(1.2)} aria-label="Acercar · 放大" title="Acercar · 放大">
              <PlusIcon size={20} />
            </button>
            <button type="button" onClick={() => zoom(1 / 1.2)} aria-label="Alejar · 缩小" title="Alejar · 缩小">
              <MinusIcon size={20} />
            </button>
            <button type="button" onClick={() => encuadrar(mapa.nodos)} aria-label="Centrar · 居中" title="Centrar · 居中">
              <LocateFixedIcon size={20} />
            </button>
          </div>

          {resultado && !resultado.viejo && (
            <div className={`ja-resultado${resultado.completo ? " is-completo" : ""}`} role="status">
              <img src={resultado.completo ? "./mono/trofeo.png" : resultado.aciertos ? "./mono/feliz.png" : "./mono/serio.png"} alt="" aria-hidden="true" />
              <div>
                <div className="ja-estrellas" aria-label={`${resultado.estrellas} estrellas`}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={i < resultado.estrellas ? "is-on" : ""} style={{ animationDelay: `${i * 0.15}s` }}>
                      ★
                    </span>
                  ))}
                </div>
                <b>
                  {resultado.aciertos}/{resultado.total} correctas · 正确
                </b>
                <small>
                  {resultado.completo ? "¡Mapa perfecto! · 完美！" : resultado.faltan ? `Faltan ${resultado.faltan} fichas · 还剩 ${resultado.faltan} 个` : "Corrige las rojas · 改正红色的连线"}
                  {resultado.xp ? ` · +${resultado.xp} XP` : ""}
                </small>
              </div>
              {resultado.completo && (
                <button type="button" className="ja-boton ja-boton-oro" onClick={() => setRonda((r) => r + 1)}>
                  <ShuffleIcon size={18} /> Otra ronda · 再来
                </button>
              )}
            </div>
          )}
        </div>

        <aside className="ja-paleta" aria-label="Fichas · 词卡">
          <button type="button" className="ja-paleta-asa" onClick={() => setCajonAbierto((a) => !a)} aria-expanded={cajonAbierto}>
            {cajonAbierto ? <ChevronDownIcon size={18} /> : <ChevronUpIcon size={18} />}
            <span>
              Fichas · 词卡 <em>{fichas.length}</em>
            </span>
          </button>
          <div className="ja-paleta-cuerpo">
            <div className="ja-herramientas">
              {libre ? (
                <>
                  <button type="button" className="ja-herr" onClick={() => setModal({})} title="Añadir nodo · 添加节点">
                    <PlusIcon size={18} /> <span>Nodo · 节点</span>
                  </button>
                  <button type="button" className="ja-herr" disabled={!nodoSel} onClick={() => setModal({ idEditar: nodoSel.id, inicial: nodoSel })} title="Editar · 编辑">
                    <PencilIcon size={18} /> <span>Editar · 编辑</span>
                  </button>
                  <div className="ja-colores" role="group" aria-label="Color · 颜色">
                    {["laca", "jade", "oro", "tinta", "papel"].map((c) => (
                      <button key={c} type="button" className={`ja-color ja-color-${c}${nodoSel?.color === c ? " is-on" : ""}`} disabled={!nodoSel || nodoSel.tipo === "centro"} onClick={() => pintar(c)} title={COLORES[c].nombre} aria-label={COLORES[c].nombre} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button type="button" className="ja-boton ja-boton-laca ja-comprobar" onClick={comprobar} disabled={mapa.nodos.every((n) => !n.id.startsWith("p"))}>
                    <CheckIcon size={20} /> Comprobar · 检查
                  </button>
                  <button type="button" className="ja-herr" onClick={() => setRonda((r) => r + 1)} title="Nueva ronda · 新一轮">
                    <ShuffleIcon size={18} /> <span>Nueva · 新一轮</span>
                  </button>
                </>
              )}
              <button type="button" className="ja-herr" disabled={!puedeBorrar} onClick={borrar} title="Borrar selección · 删除所选">
                <Trash2Icon size={18} /> <span>Borrar · 删除</span>
              </button>
              {libre && (
                <>
                  <button type="button" className="ja-herr" onClick={exportar} title="Exportar PNG · 导出图片">
                    <DownloadIcon size={18} /> <span>PNG · 导出图片</span>
                  </button>
                  <button type="button" className="ja-herr" onClick={reiniciarLibre} title="Reiniciar · 重置">
                    <RotateCcwIcon size={18} /> <span>Reiniciar · 重置</span>
                  </button>
                </>
              )}
            </div>
            <div className="ja-fichas">
              {fichas.length === 0 && <p className="ja-fichas-vacio">{libre ? "¡Todas las palabras están en tu mapa! · 所有词语都在导图上了！" : "Todas colocadas: pulsa «Comprobar». · 全部放好了：点击「检查」。"}</p>}
              {fichas.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`ja-ficha ja-ficha-${f.tipo}${fantasma?.ficha.id === f.id ? " is-fuera" : ""}`}
                  onPointerDown={(e) => pulsarFicha(e, f)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      colocarFicha(f, null, sel?.tipo === "nodo" ? porId[sel.id] : null);
                    }
                  }}
                  title="Arrastra al lienzo o toca para colocar · 拖到画布或点击放置"
                >
                  <b lang={f.tipo === "zh" ? "zh" : "es"}>{f.texto}</b>
                  {f.sub && libre && <small lang="zh">{f.sub}</small>}
                  {f.habla && <Volume2Icon size={14} aria-hidden="true" className="ja-ficha-voz" />}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {fantasma &&
        createPortal(
          <div className="ja-fantasma gm-no-adapt" style={{ transform: `translate(${fantasma.x}px, ${fantasma.y}px)` }} aria-hidden="true">
            <b>{fantasma.ficha.texto}</b>
          </div>,
          document.body,
        )}
      {modal && <ModalTexto inicial={modal.inicial} onGuardar={guardarModal} onCerrar={() => setModal(null)} />}
    </div>
  );
}

