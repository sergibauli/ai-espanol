// Fichas del palacio · 宫殿麻将 — solitario de fichas de marfil apiladas en capas.
// Solo se cogen las fichas libres (nada encima y un lado despejado); se retiran por parejas
// formadas con el contenido de la unidad o la clase (palabra ↔ traducción, pronombre ↔ verbo…).
import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router";
import { LightbulbIcon, ShuffleIcon, Undo2Icon, RotateCcwIcon, TimerIcon, Volume2Icon, VolumeXIcon, StarIcon, PlayIcon, LayersIcon, SparklesIcon, TrophyIcon, ArrowLeftIcon, GraduationCapIcon } from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak, confetti } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { todasLasPalabras } from "../../lib/contenidoJuego.js";
import { DISPOSICIONES, TIPOS, disposicion, posicionesDe, medidas, elegirParejas, repartir, validas, emparejan, libres, jugadas, rebarajar, candidatas, TUTORIAL } from "../../lib/mahjong.js";
import { useContenidoJuego, claveRecord, leerNumero, guardarNumero, usePrefiereMenosMovimiento, SelectorUnidad, Sello, etiquetaContenido } from "./jbComun.jsx";
import "../../styles/v13-juegos-b.css";
import "../../styles/mahjong.css";

const CLAVE_DISP = "dele_mahjong_disposicion";
const CLAVE_TUTORIAL = "dele_mahjong_tutorial_visto";
const tutorialVisto = () => {
  try {
    return localStorage.getItem(CLAVE_TUTORIAL) === "1";
  } catch {
    return true;
  }
};
const GRAMATICA = new Set(["conj", "art", "qa", "rel"]);
const formatoTiempo = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];

const FRASES_MONO = {
  inicio: [["¡Despeja el palacio ficha a ficha!", "一对一对清空宫殿吧！"]],
  pareja: [
    ["¡Bien hecho!", "做得好！"],
    ["¡Eso es!", "就是这样！"],
    ["¡Muy bien!", "很好！"],
    ["¡Perfecto!", "完美！"],
  ],
  combo: [["¡Racha de oro!", "黄金连击！"]],
  error: [
    ["Esas dos no van juntas.", "这两张不是一对。"],
    ["Casi… prueba otra.", "差一点……再试试。"],
  ],
  bloqueada: [["Esa ficha está atrapada.", "这张牌被挡住了。"]],
  pista: [["Mira las dos que brillan.", "看看发光的那两张。"]],
  barajar: [["¡Nuevo orden, nuevas parejas!", "重新洗牌！"]],
};

/** Decide si girar la disposición para que quepa mejor (móvil en vertical). */
function debeGirar(disp) {
  if (!disp.rotable || typeof window === "undefined") return false;
  const { anchoMedias, altoMedias } = medidas(posicionesDe(disp));
  return window.innerWidth < 760 && window.innerHeight > window.innerWidth && anchoMedias > altoMedias;
}

// ---------- Página ----------
export default function MahjongPage() {
  const contenido = useContenidoJuego();
  if (!contenido)
    return (
      <SelectorUnidad
        titulo="Fichas del palacio"
        tituloChino="宫殿麻将"
        icono={<Sello grande>牌</Sello>}
        descripcion="Retira las fichas de marfil por parejas con tu clase · 用本课内容一对一对消除象牙牌"
      />
    );
  return <JuegoMahjong key={`${contenido.numero}-${contenido.clase}`} contenido={contenido} />;
}

// ---------- Vista previa de una disposición ----------
function MiniDisposicion({ disp }) {
  const ps = posicionesDe(disp);
  const { anchoMedias, altoMedias, capas } = medidas(ps);
  const d = 0.35;
  const ordenadas = [...ps].sort((a, b) => a.z - b.z || a.y - b.y || a.x - b.x);
  return (
    <svg className="mj-mini" viewBox={`-0.2 -0.2 ${anchoMedias + capas * d + 0.6} ${altoMedias * 1.25 + capas * d + 0.6}`} aria-hidden="true" focusable="false">
      {ordenadas.map((p) => {
        const x = p.x + (capas - 1 - p.z) * d;
        const y = p.y * 1.25 + (capas - 1 - p.z) * d;
        return (
          <g key={p.id}>
            <rect x={x + 0.22} y={y + 0.28} width="1.9" height="2.4" rx=".3" fill="#1d6339" />
            <rect x={x} y={y} width="1.9" height="2.4" rx=".3" fill={p.z === capas - 1 ? "#fffaf0" : p.z === 0 ? "#e8d6ad" : "#f4e6c4"} stroke="#a8823f" strokeWidth=".08" />
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Ficha de marfil ----------
const Ficha = React.memo(function Ficha({ f, libre, sel, pista, tiembla, guia, onPulsar, w, h, d, capas }) {
  const grammar = GRAMATICA.has(f.kind);
  const tono = f.lang === "zh" ? "zh" : grammar && f.lado === "a" ? "jade" : "es";
  const n = [...f.t].length;
  const factor = f.lang === "zh" ? (n <= 2 ? 0.34 : n <= 3 ? 0.29 : n <= 4 ? 0.24 : n <= 6 ? 0.2 : 0.17) : n <= 4 ? 0.25 : n <= 7 ? 0.205 : n <= 10 ? 0.17 : n <= 14 ? 0.148 : 0.13;
  const left = (f.x / 2) * w + (capas - 1 - f.z) * d;
  const top = (f.y / 2) * h + (capas - 1 - f.z) * d;
  const tipo = TIPOS[f.kind] || TIPOS.vocab;
  return (
    <button
      type="button"
      data-id={f.id}
      className={`mj-ficha mj-ficha--${tono} ${libre ? "is-libre" : "is-bloq"} ${sel ? "is-sel" : ""} ${pista ? "is-pista" : ""} ${tiembla ? "is-tiembla" : ""} ${guia ? "is-guia" : ""}`}
      style={{ left, top, zIndex: f.z * 1000 + f.y * 20 + f.x + 30, "--z": f.z, "--k": f.id, "--fs": `${Math.max(9, w * factor)}px` }}
      onClick={() => onPulsar(f)}
      aria-pressed={sel}
      aria-label={`${f.t} · ${tipo.es} ${tipo.zh} · ${libre ? "libre 可选" : "bloqueada 被挡住"}`}
    >
      <span className="mj-cara">
        <span className={`mj-marca mj-marca--${grammar ? "jade" : "rojo"}`} translate="no" aria-hidden="true">
          {tipo.sello}
        </span>
        <span className="mj-texto" lang={f.lang === "zh" ? "zh-CN" : "es"} translate="no">
          {f.t.replace(/\//g, "/\u200b")}
        </span>
        <span className="mj-orla" aria-hidden="true" />
      </span>
      {guia && (
        <span className="mj-flecha" aria-hidden="true">
          ▼
        </span>
      )}
    </button>
  );
});

// ---------- Rey Mono ----------
function Mono({ estado }) {
  if (!estado) return null;
  return (
    <div className={`mj-mono is-${estado.pose} ${estado.fijo ? "is-fijo" : ""}`} key={estado.id} aria-live="polite">
      <img src={`./mono/${estado.pose}.webp`} alt="" aria-hidden="true" />
      {estado.es && (
        <p className="mj-bocadillo">
          <b>{estado.es}</b>
          <span>{estado.zh}</span>
        </p>
      )}
    </div>
  );
}

// ---------- Juego ----------
function JuegoMahjong({ contenido }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playClick } = useSound();
  const reducido = usePrefiereMenosMovimiento();
  const [dispId, setDispId] = React.useState(() => {
    try {
      return disposicion(localStorage.getItem(CLAVE_DISP)).id;
    } catch {
      return DISPOSICIONES[0].id;
    }
  });
  const disp = disposicion(dispId);
  const [fase, setFase] = React.useState("inicio");
  const [partida, setPartida] = React.useState(null); // { fichas, conjunto, total, girar }
  const [historial, setHistorial] = React.useState([]);
  const [sel, setSel] = React.useState(null);
  const [pista, setPista] = React.useState(null);
  const [tiembla, setTiembla] = React.useState([]);
  const [vuelos, setVuelos] = React.useState([]);
  const [mono, setMono] = React.useState({ pose: "saluda", es: FRASES_MONO.inicio[0][0], zh: FRASES_MONO.inicio[0][1], id: 0 });
  const [stats, setStats] = React.useState({ pistas: 0, barajadas: 0, deshechas: 0, errores: 0 });
  const [inicio, setInicio] = React.useState(0);
  const [ahora, setAhora] = React.useState(0);
  const [sinJugadas, setSinJugadas] = React.useState(false);
  const [resultado, setResultado] = React.useState(null);
  const [barajando, setBarajando] = React.useState(false);
  const [entrada, setEntrada] = React.useState(false);
  const [hechas, setHechas] = React.useState([]); // parejas retiradas, para el repaso final
  const [area, setArea] = React.useState({ w: 0, h: 0 });
  const areaRef = React.useRef(null);
  const combo = React.useRef({ n: 0, t: 0 });
  const timers = React.useRef(new Set());
  const programar = React.useCallback((fn, ms) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }, []);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const resumenTipos = React.useMemo(() => {
    const cuenta = {};
    for (const p of candidatas(contenido)) cuenta[p.kind] = (cuenta[p.kind] || 0) + 1;
    return cuenta;
  }, [contenido]);

  const decirMono = React.useCallback((pose, clave) => {
    const [es, zh] = clave ? azar(FRASES_MONO[clave]) : [null, null];
    const id = Math.random();
    setMono({ pose, es, zh, id });
    if (es) programar(() => setMono((m) => (m.id === id ? { ...m, es: null, zh: null } : m)), 4000);
  }, [programar]);

  // Tiempo
  React.useEffect(() => {
    if (fase !== "juego") return;
    const id = window.setInterval(() => setAhora(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [fase]);
  const segundos = inicio ? Math.max(0, ((resultado ? resultado.fin : ahora) - inicio) / 1000) : 0;

  // Al cambiar de pantalla, arriba del todo (el botón Empezar queda abajo en móvil)
  React.useEffect(() => {
    if (fase === "juego" || fase === "inicio") window.scrollTo(0, 0);
  }, [fase]);

  // Tamaño del tablero
  React.useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const medir = () => {
      // La mesa ocupa lo que queda de ventana (en móvil, menos la barra inferior fija)
      const arriba = el.getBoundingClientRect().top + window.scrollY;
      const reserva = window.innerWidth <= 760 ? 96 : 16;
      const alto = Math.round(Math.min(760, Math.max(320, window.innerHeight - arriba - reserva)));
      if (Math.abs(el.clientHeight - alto) > 2) el.style.height = `${alto}px`;
      setArea({ w: el.clientWidth, h: alto });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [fase]);

  const nuevaPartida = React.useCallback(
    (id = dispId) => {
      const d = disposicion(id);
      const girar = debeGirar(d);
      const posiciones = posicionesDe(d, girar);
      const respaldo = contenido.numero === "todas" ? [] : todasLasPalabras();
      let fichas = null;
      let conjunto = null;
      for (let i = 0; i < 6 && !fichas; i++) {
        const parejas = elegirParejas(contenido, posiciones.length / 2, Math.random, respaldo);
        conjunto = validas(parejas);
        fichas = repartir(posiciones, parejas);
      }
      if (!fichas) return;
      try {
        localStorage.setItem(CLAVE_DISP, id);
      } catch {}
      setDispId(id);
      setPartida({ fichas, conjunto, total: fichas.length / 2, girar });
      setHechas([]);
      if (!reducido) {
        setEntrada(true);
        programar(() => setEntrada(false), 1800);
      }
      setHistorial([]);
      setSel(null);
      setPista(null);
      setVuelos([]);
      setStats({ pistas: 0, barajadas: 0, deshechas: 0, errores: 0 });
      setResultado(null);
      setSinJugadas(false);
      combo.current = { n: 0, t: 0 };
      const t = Date.now();
      setInicio(t);
      setAhora(t);
      setFase("juego");
      decirMono("saluda", "inicio");
    },
    [contenido, dispId, decirMono, reducido, programar],
  );

  // Tutorial: mesa de 6 fichas con tres parejas fáciles de la unidad y el Rey Mono guiando
  const decirFijo = React.useCallback((pose, es, zh) => setMono({ pose, es, zh, id: Math.random(), fijo: true }), []);
  const empezarTutorial = React.useCallback(() => {
    const posiciones = posicionesDe(TUTORIAL);
    const respaldo = contenido.numero === "todas" ? [] : todasLasPalabras();
    // Solo palabras y expresiones cortas: lo importante aquí es entender la regla
    const sencillo = { ...contenido, teoria: [], dialogos: [], ejercicios: {}, vocabulario: (contenido.vocabulario || []).filter((v) => String(v.espanol || "").length <= 12) };
    const parejas = elegirParejas(sencillo, 3, Math.random, respaldo);
    const conjunto = validas(parejas);
    const reparto = new Map();
    TUTORIAL.guion.forEach(([p, q], i) => {
      reparto.set(p, { par: parejas[i], lado: "a" });
      reparto.set(q, { par: parejas[i], lado: "b" });
    });
    const fichas = posiciones.map((pos) => {
      const { par, lado } = reparto.get(pos.id);
      return { ...pos, pareja: par.id, kind: par.kind, lado, t: par[lado].t, lang: par[lado].lang, vivo: true };
    });
    setPartida({ fichas, conjunto, total: 3, girar: false, tutorial: true });
    setHechas([]);
    setHistorial([]);
    setSel(null);
    setPista(null);
    setVuelos([]);
    setStats({ pistas: 0, barajadas: 0, deshechas: 0, errores: 0 });
    setResultado(null);
    setSinJugadas(false);
    const t = Date.now();
    setInicio(t);
    setAhora(t);
    setFase("juego");
    decirFijo("saluda", "Las fichas claras están libres. Toca la de arriba, la que brilla.", "亮的牌是可选的。点最上面发光的那张。");
  }, [contenido, decirFijo]);

  const fichas = partida?.fichas || [];
  const vivas = React.useMemo(() => fichas.filter((f) => f.vivo), [fichas]);
  const libresSet = React.useMemo(() => new Set(libres(vivas).map((f) => f.id)), [vivas]);
  const posibles = React.useMemo(() => (partida ? jugadas(fichas, partida.conjunto) : []), [fichas, partida]);
  const retiradas = partida ? partida.total - vivas.length / 2 : 0;
  const pasoTutorial = partida?.tutorial ? Math.min(TUTORIAL.guion.length - 1, retiradas) : -1;
  const guiaId = partida?.tutorial && vivas.length ? TUTORIAL.guion[pasoTutorial].find((id) => id !== sel) : null;

  // Medidas de las fichas para el área disponible
  const geo = React.useMemo(() => {
    if (!partida || !area.w) return null;
    const ps = partida.fichas;
    const { anchoMedias, altoMedias, capas } = medidas(ps);
    const estrecho = area.w < 600;
    const ratio = estrecho ? 1.18 : 1.3;
    const kd = 0.085;
    const kt = 0.075;
    const cols = anchoMedias / 2;
    const filas = altoMedias / 2;
    const margen = estrecho ? 10 : 28;
    const lateral = estrecho || partida.tutorial ? 0 : 250; // sitio para el Rey Mono a la izquierda (y simetría a la derecha)
    let w = Math.min((area.w - margen - lateral) / (cols + (capas - 1) * kd + kt), (area.h - margen) / (filas * ratio + (capas - 1) * kd + kt));
    w = Math.max(30, Math.min(w, partida.tutorial ? 124 : 96));
    const h = w * ratio;
    const d = w * kd;
    const t = w * kt;
    return { w, h, d, t, capas, ancho: cols * w + (capas - 1) * d + t, alto: filas * h + (capas - 1) * d + t };
  }, [partida, area]);

  // ¿Fin de partida o sin jugadas?
  React.useEffect(() => {
    if (fase !== "juego" || !partida) return;
    if (vivas.length === 0 && partida.tutorial) {
      try {
        localStorage.setItem(CLAVE_TUTORIAL, "1");
      } catch {}
      programar(() => {
        soundEnabled && playWin();
        setResultado({ tutorial: true, fin: Date.now() });
        setFase("final");
      }, reducido ? 200 : 900);
      setFase("fin");
      return;
    }
    if (vivas.length === 0) {
      const fin = Date.now();
      const total = (fin - inicio) / 1000;
      const n = partida.total;
      let estrellas = 1;
      if (total <= n * 18 && stats.pistas <= 3) estrellas = 2;
      if (total <= n * 10 && stats.pistas <= 1 && stats.barajadas === 0 && stats.deshechas <= 2) estrellas = 3;
      const clave = claveRecord(`mahjong_${dispId}`, contenido);
      const mejor = leerNumero(clave);
      const nuevoRecord = !mejor || total < mejor;
      if (nuevoRecord) guardarNumero(clave, Math.round(total));
      const xp = 20 + estrellas * 10 + Math.round(n / 2);
      try {
        addXp(xp);
      } catch {}
      programar(() => {
        soundEnabled && playWin();
        if (!reducido) confetti({ count: 120 });
        setResultado({ fin, total, estrellas, nuevoRecord, xp, mejor: nuevoRecord ? Math.round(total) : mejor });
        setFase("final");
        decirMono("trofeo", null);
      }, reducido ? 200 : 900);
      setFase("fin");
    } else if (posibles.length === 0) setSinJugadas(true);
  }, [vivas.length, posibles.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const temblar = (ids) => {
    setTiembla(ids);
    programar(() => setTiembla([]), 450);
  };

  const retirar = (a, b) => {
    setHistorial((hs) => [...hs, fichas]);
    setPartida((p) => ({ ...p, fichas: p.fichas.map((f) => (f.id === a.id || f.id === b.id ? { ...f, vivo: false } : f)) }));
    setSel(null);
    setPista(null);
    soundEnabled && playCorrect();
    const [pa1, pb1] = a.lado === "a" ? [a, b] : [b, a];
    setHechas((hs) => (hs.some((x) => x.a === pa1.t && x.b === pb1.t) ? hs : [...hs, { a: pa1.t, b: pb1.t, la: pa1.lang, lb: pb1.lang, kind: a.kind }]));
    // Pronuncia la parte española (o las dos si son pronombre + verbo, artículo + nombre…)
    const es = [a, b].filter((f) => f.lang === "es");
    const ordenadas = es.sort((x, y) => (x.lado === "a" ? -1 : 1));
    if (soundEnabled && ordenadas.length) speak(ordenadas.map((f) => f.t).join(ordenadas.length > 1 && (a.kind === "qa" || a.kind === "rel") ? ". " : " "), 0.9);
    // Vuelo hacia el punto medio y destello de oro
    if (geo) {
      const pos = (f) => ({ left: (f.x / 2) * geo.w + (geo.capas - 1 - f.z) * geo.d, top: (f.y / 2) * geo.h + (geo.capas - 1 - f.z) * geo.d });
      const pa = pos(a);
      const pb = pos(b);
      const mx = (pa.left + pb.left) / 2;
      const my = (pa.top + pb.top) / 2 - geo.h * 0.3;
      const id = Math.random();
      setVuelos((v) => [...v, { id, a: { ...a, ...pa }, b: { ...b, ...pb }, mx, my }]);
      programar(() => setVuelos((v) => v.filter((x) => x.id !== id)), reducido ? 350 : 1100);
    }
    if (partida.tutorial) {
      const quedan = vivas.length - 2;
      if (quedan === 4) decirFijo("feliz", "¡Muy bien! La ficha de la izquierda ya no tiene nada encima: ahora está libre.", "很好！左边那张上面没有牌了，现在可以选。");
      else if (quedan === 2) decirFijo("guino", "Las dos últimas tienen un lado vacío. ¡Emparéjalas!", "最后两张都有一侧是空的。配对吧！");
      return;
    }
    const ahoraMs = Date.now();
    combo.current = ahoraMs - combo.current.t < 5000 ? { n: combo.current.n + 1, t: ahoraMs } : { n: 1, t: ahoraMs };
    if (combo.current.n >= 3 && combo.current.n % 3 === 0) {
      const [es2, zh2] = FRASES_MONO.combo[0];
      const id = Math.random();
      setMono({ pose: "poder", es: `${es2} ×${combo.current.n}`, zh: `${zh2} ×${combo.current.n}`, id });
      programar(() => setMono((m) => (m.id === id ? { ...m, es: null, zh: null } : m)), 4000);
    } else if (Math.random() < 0.45) decirMono(azar(["feliz", "guino"]), "pareja");
  };

  const pulsar = (f) => {
    if (fase !== "juego" || !f.vivo) return;
    if (!libresSet.has(f.id)) {
      temblar([f.id]);
      if (partida.tutorial) decirFijo("serio", "Esa está atrapada: tiene una ficha encima o fichas a los dos lados.", "这张被挡住了：上面有牌，或者左右两边都有牌。");
      else decirMono("serio", "bloqueada");
      return;
    }
    if (sel === null) {
      setSel(f.id);
      soundEnabled && playClick?.();
      if (partida.tutorial) decirFijo("guino", `«${f.t}»: ahora toca su pareja, la que brilla.`, `「${f.t}」：现在点它的配对（发光的那张）。`);
      return;
    }
    if (sel === f.id) {
      setSel(null);
      return;
    }
    const s = fichas.find((x) => x.id === sel);
    if (s && emparejan(s, f, partida.conjunto)) retirar(s, f);
    else {
      soundEnabled && playWrong();
      temblar([sel, f.id]);
      setSel(f.id);
      setStats((st) => ({ ...st, errores: st.errores + 1 }));
      combo.current = { n: 0, t: 0 };
      decirMono("serio", "error");
    }
  };

  const pedirPista = () => {
    if (fase !== "juego") return;
    if (!posibles.length) return setSinJugadas(true);
    const [a, b] = azar(posibles);
    setPista([a.id, b.id]);
    setSel(null);
    setStats((st) => ({ ...st, pistas: st.pistas + 1 }));
    decirMono("guino", "pista");
    programar(() => setPista(null), 2600);
  };

  const barajarFichas = () => {
    if (fase !== "juego" || !partida) return;
    let nuevas = null;
    for (let i = 0; i < 5 && !nuevas; i++) nuevas = rebarajar(fichas, partida.conjunto);
    if (!nuevas) return;
    setHistorial((hs) => [...hs, fichas]);
    setPartida((p) => ({ ...p, fichas: nuevas }));
    setSel(null);
    setPista(null);
    setSinJugadas(false);
    setStats((st) => ({ ...st, barajadas: st.barajadas + 1 }));
    decirMono("poder", "barajar");
    if (!reducido) {
      setBarajando(true);
      programar(() => setBarajando(false), 650);
    }
  };

  const deshacer = () => {
    if (fase !== "juego" || !historial.length) return;
    const previas = historial[historial.length - 1];
    setHistorial((hs) => hs.slice(0, -1));
    setPartida((p) => ({ ...p, fichas: previas }));
    setSel(null);
    setPista(null);
    setSinJugadas(false);
    setStats((st) => ({ ...st, deshechas: st.deshechas + 1 }));
  };

  if (import.meta.env.DEV) window.__mj = { jugadas: () => posibles.map(([a, b]) => [a.id, b.id]), vivas: vivas.length, fase }; // solo pruebas locales

  const seleccionada = sel !== null ? fichas.find((f) => f.id === sel) : null;
  const record = leerNumero(claveRecord(`mahjong_${dispId}`, contenido));
  const salir = () => navigate(location.pathname);

  // ---------- Pantalla de inicio ----------
  if (fase === "inicio")
    return (
      <div className={`mj-raiz gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
        <div className="mj-barra">
          <button type="button" className="mj-volver" onClick={salir}>
            <ArrowLeftIcon size={18} aria-hidden="true" /> <span>Unidades · 单元</span>
          </button>
          <span className="mj-unidad">{etiquetaContenido(contenido)}</span>
        </div>
        <section className="mj-intro">
          <header className="mj-intro__cab">
            <div className="mj-intro__emblema" aria-hidden="true">
              <span className="mj-intro__ficha mj-intro__ficha--1">
                <i>西</i>
              </span>
              <span className="mj-intro__ficha mj-intro__ficha--2">
                <i>中</i>
              </span>
              <Sello grande>牌</Sello>
            </div>
            <div>
              <h1 className="mj-titulo">
                Fichas del palacio <span translate="no">宫殿麻将</span>
              </h1>
              <p className="mj-sub">
                Retira las fichas de marfil por parejas: cada palabra con su traducción, cada pronombre con su verbo.
                <span> 一对一对消除象牙牌：单词配翻译，代词配动词。</span>
              </p>
            </div>
            <img className="mj-intro__mono" src="./mono/saluda.webp" alt="" aria-hidden="true" />
          </header>

          <ol className="mj-reglas">
            <li>
              <b>1</b>
              <span>
                Toca una ficha <em>libre</em>: sin nada encima y con un lado despejado.<small>点一张可选的牌：上面没有牌，左边或右边是空的。</small>
              </span>
            </li>
            <li>
              <b>2</b>
              <span>
                Toca su pareja y las dos se funden en oro.<small>再点它的配对，两张牌化作金光。</small>
              </span>
            </li>
            <li>
              <b>3</b>
              <span>
                ¿Atascado? Usa pista, barajar o deshacer.<small>卡住了？用提示、洗牌或撤销。</small>
              </span>
            </li>
          </ol>

          <h2 className="mj-intro__h2">
            Elige la disposición <span>选择布局</span>
          </h2>
          <div className="mj-disposiciones" role="radiogroup" aria-label="Disposición · 布局">
            {DISPOSICIONES.map((d) => {
              const mejor = leerNumero(claveRecord(`mahjong_${d.id}`, contenido));
              return (
                <button key={d.id} type="button" role="radio" aria-checked={dispId === d.id} className={`mj-disp ${dispId === d.id ? "is-activa" : ""}`} onClick={() => setDispId(d.id)}>
                  <MiniDisposicion disp={d} />
                  <span className="mj-disp__nombre">
                    <Sello className="mj-disp__sello">{d.sello}</Sello>
                    <b>{d.es}</b>
                    <small translate="no">{d.zh}</small>
                  </span>
                  <span className="mj-disp__datos">
                    {d.fichas.length} fichas · {d.fichas.length}张 · {d.nivel.es} {d.nivel.zh}
                  </span>
                  {mejor > 0 && (
                    <span className="mj-disp__record">
                      <TrophyIcon size={13} aria-hidden="true" /> {formatoTiempo(mejor)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mj-tipos" aria-label="Tipos de pareja · 配对类型">
            {Object.entries(TIPOS)
              .filter(([k]) => resumenTipos[k])
              .map(([k, t]) => (
                <span key={k} className={`mj-tipo ${GRAMATICA.has(k) ? "is-jade" : ""}`}>
                  <i translate="no">{t.sello}</i> {t.es} · {t.zh}
                </span>
              ))}
          </div>

          <div className="mj-intro__acciones">
            <button type="button" className="mj-empezar" onClick={() => (tutorialVisto() ? nuevaPartida(dispId) : empezarTutorial())}>
              <PlayIcon size={22} aria-hidden="true" /> {tutorialVisto() ? "Empezar · 开始" : "Aprender a jugar · 学玩法"}
            </button>
            <button type="button" className="mj-boton mj-boton--claro mj-intro__tuto" onClick={empezarTutorial}>
              <GraduationCapIcon size={19} aria-hidden="true" /> ¿Cómo se juega? · 怎么玩？
            </button>
          </div>
        </section>
      </div>
    );

  // ---------- Partida ----------
  return (
    <div className={`mj-raiz mj-raiz--juego gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
      <div className="mj-barra">
        <button type="button" className="mj-volver" onClick={() => setFase("inicio")}>
          <ArrowLeftIcon size={18} aria-hidden="true" /> <span>Salir · 退出</span>
        </button>
        <span className="mj-barra__titulo">
          <Sello className="mj-barra__sello">牌</Sello>
          <span>
            Fichas del palacio <small translate="no">宫殿麻将 · {disp.zh}</small>
          </span>
        </span>
        <span className="mj-unidad">{etiquetaContenido(contenido)}</span>
      </div>

      <div className="mj-hud" role="group" aria-label="Estado · 状态">
        <span className="mj-chip" aria-label={`Tiempo ${formatoTiempo(segundos)} · 用时`}>
          <TimerIcon size={17} aria-hidden="true" /> <b>{formatoTiempo(segundos)}</b>
        </span>
        <span className="mj-chip mj-chip--parejas" aria-label={`Parejas ${retiradas} de ${partida?.total ?? 0} · 已配对`}>
          <LayersIcon size={17} aria-hidden="true" />
          <b>
            {retiradas}/{partida?.total ?? 0}
          </b>
          <span className="mj-chip__barra" aria-hidden="true">
            <i style={{ width: `${partida ? (retiradas / partida.total) * 100 : 0}%` }} />
          </span>
        </span>
        <span className={`mj-chip ${posibles.length <= 1 ? "is-aviso" : ""}`} aria-label={`${posibles.length} parejas posibles · 可配对`}>
          <SparklesIcon size={17} aria-hidden="true" /> <b>{posibles.length}</b>
          <small>libres · 可配</small>
        </span>
        {!partida?.tutorial && (
        <div className="mj-herramientas">
          <button type="button" className="mj-boton" onClick={pedirPista} aria-label="Pista · 提示">
            <LightbulbIcon size={19} aria-hidden="true" />
            <span>Pista · 提示</span>
          </button>
          <button type="button" className="mj-boton" onClick={barajarFichas} aria-label="Barajar · 洗牌">
            <ShuffleIcon size={19} aria-hidden="true" />
            <span>Barajar · 洗牌</span>
          </button>
          <button type="button" className="mj-boton" onClick={deshacer} disabled={!historial.length} aria-label="Deshacer · 撤销">
            <Undo2Icon size={19} aria-hidden="true" />
            <span>Deshacer · 撤销</span>
          </button>
          <button type="button" className="mj-boton" onClick={() => nuevaPartida(dispId)} aria-label="Nueva partida · 重新开始">
            <RotateCcwIcon size={19} aria-hidden="true" />
            <span>Reiniciar · 重来</span>
          </button>
          <button type="button" className="mj-boton mj-boton--icono" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"}>
            {soundEnabled ? <Volume2Icon size={19} aria-hidden="true" /> : <VolumeXIcon size={19} aria-hidden="true" />}
          </button>
        </div>
        )}
      </div>

      <div className={`mj-placa ${mono.fijo && !seleccionada ? "is-fijo" : ""}`} aria-live="polite">
        {seleccionada ? (
          <>
            <span className={`mj-placa__tipo ${GRAMATICA.has(seleccionada.kind) ? "is-jade" : ""}`} translate="no">
              {TIPOS[seleccionada.kind]?.sello}
            </span>
            <b lang={seleccionada.lang === "zh" ? "zh-CN" : "es"}>{seleccionada.t}</b>
            <small>
              {TIPOS[seleccionada.kind]?.es} · {TIPOS[seleccionada.kind]?.zh} — busca su pareja · 找到它的配对
            </small>
            {seleccionada.lang === "es" && (
              <button type="button" className="mj-placa__oir" onClick={() => speak(seleccionada.t, 0.9)} aria-label={`Escuchar ${seleccionada.t} · 听`}>
                <Volume2Icon size={16} aria-hidden="true" />
              </button>
            )}
          </>
        ) : (
          <>
            <img className="mj-placa__mono" src={`./mono/${mono.pose}.webp`} alt="" aria-hidden="true" key={mono.id} />
            {mono.es && (
              <span className="mj-placa__dice">
                <b>{mono.es}</b> <small>{mono.zh}</small>
              </span>
            )}
            <small className="mj-placa__instr">Toca una ficha libre · 点一张可选的牌（上面无牌，且一侧为空）</small>
          </>
        )}
      </div>

      <div className="mj-mesa" ref={areaRef}>
        <span className="mj-mesa__nube mj-mesa__nube--1" aria-hidden="true" />
        <span className="mj-mesa__nube mj-mesa__nube--2" aria-hidden="true" />
        <span className="mj-mesa__tejado" aria-hidden="true" />
        {[0, 1].map((i) => (
          <span key={i} className={`mj-farol mj-farol--${i ? "der" : "izq"}`} aria-hidden="true">
            <i className="mj-farol__cuerda" />
            <i className="mj-farol__cuerpo" translate="no">
              {i ? "福" : "学"}
            </i>
            <i className="mj-farol__borla" />
          </span>
        ))}
        <span className="mj-polvo" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ "--x": `${(i * 37) % 100}%`, "--d": `${(i * 0.73) % 6}s`, "--s": `${6 + (i % 5)}s` }} />
          ))}
        </span>
        {geo && (
          <div
            className={`mj-tablero ${barajando ? "is-barajando" : ""} ${entrada ? "is-entrada" : ""} ${partida?.tutorial ? "is-tutorial" : ""}`}
            style={{ width: geo.ancho, height: geo.alto, "--w": `${geo.w}px`, "--h": `${geo.h}px`, "--t": `${geo.t}px` }}
            role="group"
            aria-label={`Tablero · 牌桌: ${vivas.length} fichas`}
          >
            {vivas.map((f) => (
              <Ficha
                key={f.id}
                f={f}
                libre={libresSet.has(f.id)}
                sel={sel === f.id}
                pista={!!pista?.includes(f.id)}
                tiembla={tiembla.includes(f.id)}
                guia={guiaId === f.id}
                onPulsar={pulsar}
                w={geo.w}
                h={geo.h}
                d={geo.d}
                capas={geo.capas}
              />
            ))}
            {vuelos.map((v) => (
              <React.Fragment key={v.id}>
                {[v.a, v.b].map((f, i) => (
                  <span
                    key={i}
                    className={`mj-vuelo mj-ficha--${f.lang === "zh" ? "zh" : GRAMATICA.has(f.kind) && f.lado === "a" ? "jade" : "es"}`}
                    style={{ left: f.left, top: f.top, "--dx": `${v.mx - f.left}px`, "--dy": `${v.my - f.top}px`, "--r": `${i ? 8 : -8}deg`, "--fs": `${Math.max(9, geo.w * 0.18)}px` }}
                    aria-hidden="true"
                  >
                    <span className="mj-cara">
                      <span className="mj-texto">{f.t}</span>
                    </span>
                  </span>
                ))}
                <span className="mj-sentido" style={{ left: v.mx + geo.w / 2, top: v.my }} aria-hidden="true">
                  {(v.a.lado === "a" ? [v.a, v.b] : [v.b, v.a]).map((f, i) => (
                    <b key={i} className={f.lang === "zh" ? "is-zh" : ""}>
                      {f.t}
                    </b>
                  ))}
                </span>
                <span className="mj-destello" style={{ left: v.mx + geo.w / 2, top: v.my + geo.h / 2 }} aria-hidden="true">
                  <i className="mj-destello__luz" />
                  <i className="mj-destello__aro" />
                  {Array.from({ length: 10 }, (_, k) => (
                    <i key={k} className="mj-destello__rayo" style={{ "--a": `${k * 36}deg` }} />
                  ))}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
        <Mono estado={mono} />
      </div>

      {sinJugadas &&
        fase === "juego" &&
        createPortal(
          <div className="mj-modal gm-no-adapt" role="dialog" aria-modal="true" aria-labelledby="mj-sin-titulo">
            <div className="mj-tarjeta">
              <img className="mj-tarjeta__mono" src="./mono/serio.webp" alt="" aria-hidden="true" />
              <h2 id="mj-sin-titulo" className="mj-tarjeta__titulo">
                No quedan parejas libres
                <span>没有可以配对的牌了</span>
              </h2>
              <p className="mj-tarjeta__txt">Baraja las fichas que quedan o deshaz la última jugada. · 洗牌，或撤销上一步。</p>
              <div className="mj-tarjeta__botones">
                <button type="button" className="mj-empezar" onClick={barajarFichas} autoFocus>
                  <ShuffleIcon size={20} aria-hidden="true" /> Barajar · 洗牌
                </button>
                <button type="button" className="mj-boton mj-boton--claro" onClick={deshacer} disabled={!historial.length}>
                  <Undo2Icon size={19} aria-hidden="true" /> Deshacer · 撤销
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {fase === "final" &&
        resultado?.tutorial &&
        createPortal(
          <div className={`mj-modal gm-no-adapt ${reducido ? "is-reducido" : ""}`} role="dialog" aria-modal="true" aria-labelledby="mj-tuto-titulo">
            <div className="mj-tarjeta mj-tarjeta--fin">
              <span className="mj-fin__rayos" aria-hidden="true" />
              <img className="mj-fin__mono" src="./mono/feliz.webp" alt="" aria-hidden="true" />
              <h2 id="mj-tuto-titulo" className="mj-tarjeta__titulo">
                ¡Ya sabes jugar!
                <span>你学会了！</span>
              </h2>
              <ul className="mj-resumen-reglas">
                <li>Solo se cogen fichas sin nada encima y con un lado libre. · 只能选上面没有牌、且一侧为空的牌。</li>
                <li>Une cada palabra con su pareja. · 把每个词和它的配对连起来。</li>
                <li>¿Atascado? Pista, barajar o deshacer. · 卡住了？用提示、洗牌或撤销。</li>
              </ul>
              <div className="mj-tarjeta__botones">
                <button
                  type="button"
                  className="mj-empezar"
                  onClick={() => {
                    const facil = "patio";
                    nuevaPartida(facil);
                  }}
                  autoFocus
                >
                  <PlayIcon size={20} aria-hidden="true" /> Jugar en el Patio · 开始游戏
                </button>
                <button type="button" className="mj-boton mj-boton--claro" onClick={() => setFase("inicio")}>
                  <LayersIcon size={19} aria-hidden="true" /> Elegir disposición · 选布局
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {fase === "final" &&
        resultado &&
        !resultado.tutorial &&
        createPortal(
          <div className={`mj-modal gm-no-adapt ${reducido ? "is-reducido" : ""}`} role="dialog" aria-modal="true" aria-labelledby="mj-fin-titulo">
            <div className="mj-tarjeta mj-tarjeta--fin">
              <span className="mj-fin__rayos" aria-hidden="true" />
              <img className="mj-fin__mono" src="./mono/trofeo.webp" alt="Rey Mono con el trofeo · 美猴王" />
              <Sello grande className="mj-fin__sello">
                通关
              </Sello>
              <h2 id="mj-fin-titulo" className="mj-tarjeta__titulo">
                ¡Palacio despejado!
                <span>宫殿清空了！</span>
              </h2>
              <div className="mj-estrellas" aria-label={`${resultado.estrellas} de 3 estrellas · 星`}>
                {[0, 1, 2].map((i) => (
                  <StarIcon key={i} size={44} className={i < resultado.estrellas ? "is-llena" : ""} style={{ "--i": i }} aria-hidden="true" />
                ))}
              </div>
              <div className="mj-stats">
                <div>
                  <small>Tiempo · 用时</small>
                  <strong>{formatoTiempo(resultado.total)}</strong>
                </div>
                <div>
                  <small>Parejas · 配对</small>
                  <strong>{partida.total}</strong>
                </div>
                <div>
                  <small>Pistas · 提示</small>
                  <strong>{stats.pistas}</strong>
                </div>
                <div>
                  <small>XP · 经验</small>
                  <strong>+{resultado.xp}</strong>
                </div>
              </div>
              <p className="mj-record">
                {resultado.nuevoRecord ? (
                  <>
                    <TrophyIcon size={16} aria-hidden="true" /> ¡Nuevo récord! · 新纪录！
                  </>
                ) : (
                  <>
                    Récord · 最佳: {formatoTiempo(resultado.mejor || record)}
                  </>
                )}
              </p>
              {hechas.length > 0 && (
                <details className="mj-repaso" open>
                  <summary>
                    Repasa las parejas · 复习配对 <span>{hechas.length}</span>
                  </summary>
                  <ul>
                    {hechas.map((x, i) => (
                      <li key={i}>
                        <span className={x.la === "zh" ? "is-zh" : ""}>{x.a}</span>
                        <i aria-hidden="true">⟷</i>
                        <span className={x.lb === "zh" ? "is-zh" : ""}>{x.b}</span>
                        <button type="button" onClick={() => speak([x.a, x.b].filter((_, k) => (k ? x.lb : x.la) === "es").join(x.kind === "qa" || x.kind === "rel" ? ". " : " "), 0.9)} aria-label={`Escuchar · 听: ${x.a}`}>
                          <Volume2Icon size={15} aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              <div className="mj-tarjeta__botones">
                <button type="button" className="mj-empezar" onClick={() => nuevaPartida(dispId)} autoFocus>
                  <RotateCcwIcon size={20} aria-hidden="true" /> Otra vez · 再来一局
                </button>
                <button type="button" className="mj-boton mj-boton--claro" onClick={() => setFase("inicio")}>
                  <LayersIcon size={19} aria-hidden="true" /> Otra disposición · 换布局
                </button>
                <Link to="/juegos" className="mj-boton mj-boton--claro">
                  <ArrowLeftIcon size={19} aria-hidden="true" /> Juegos · 游戏
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
