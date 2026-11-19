// Palacio de las palabras · 字母宫殿 — formar palabras con fichas de marfil sobre un tablero de laca y oro,
// contra el Rey Mono. Tablero propio de 13×13 con el Trono en el centro y casillas temáticas
// (sello ×2 letra, jade ×3 letra, linterna ×2 palabra, dragón ×3 palabra). Bono si la palabra es de la unidad.
// Sustituye al antiguo juego de tablero de letras (la ruta /juegos/apalabrados redirige aquí).
import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import {
  ArrowLeftIcon,
  CheckIcon,
  RotateCcwIcon,
  ShuffleIcon,
  RepeatIcon,
  SkipForwardIcon,
  LightbulbIcon,
  Volume2Icon,
  VolumeXIcon,
  PlayIcon,
  StarIcon,
  BookOpenIcon,
  XIcon,
} from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak, confetti } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { useContenidoJuego, SelectorUnidad, Sello, etiquetaContenido, usePrefiereMenosMovimiento, claveRecord, leerNumero, guardarNumero } from "./jbComun.jsx";
import {
  LADO,
  ATRIL,
  BONO_SIETE,
  LETRAS,
  PUNTOS,
  PREMIOS,
  INFO_PREMIO,
  crearBolsa,
  rellenar,
  prepararLexico,
  evaluar,
  buscarJugadas,
  eligeMono,
  traduccion,
  sumaAtril,
  fila,
  col,
  idx,
  dentro,
} from "../../lib/palacioPalabras.js";
import "../../styles/palacio-palabras.css";

const RONDAS_CORTA = 8;
const BASE = import.meta.env.BASE_URL || "./";
const imgMono = (pose) => `${BASE}mono/${pose}.webp`;
const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];
const MAYUS = (l) => (l || "").toUpperCase();

const FRASES = {
  inicio: [["¡Bienvenido a mi palacio! Empiezas tú: pasa por el Trono.", "欢迎来到我的宫殿！你先来：经过中间的宝座。"]],
  bien: [
    ["¡Buena palabra!", "好单词！"],
    ["¡Muy bien jugado!", "下得好！"],
    ["¡Eso suma!", "加分了！"],
  ],
  grande: [["¡Uf! Esa jugada vale oro.", "哇！这一步价值千金。"]],
  unidad: [["¡Palabra de la unidad! Bono para ti.", "本单元的单词！给你加分。"]],
  mal: [["Hmm… revisa esa palabra.", "嗯……再检查一下这个词。"]],
  piensa: [["Déjame pensar…", "让我想想……"]],
  mono: [
    ["¡Mi turno! Mira esta.", "轮到我了！看这个。"],
    ["¿Qué te parece esta palabra?", "这个词怎么样？"],
  ],
  monoGrande: [["¡Golpe del Rey Mono!", "美猴王出击！"]],
  monoPasa: [["Paso… ¡no encuentro nada!", "我跳过……找不到词！"]],
  cambia: [["Cambio mis fichas.", "我换几张牌。"]],
};

/** Contador que sube poco a poco hasta el valor */
function useNumeroAnimado(valor, reducido) {
  const [mostrado, setMostrado] = React.useState(valor);
  React.useEffect(() => {
    if (reducido) return setMostrado(valor);
    let raf;
    const desde = mostrado;
    const t0 = performance.now();
    const paso = (t) => {
      const k = Math.min(1, (t - t0) / 700);
      setMostrado(Math.round(desde + (valor - desde) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor, reducido]);
  return mostrado;
}

// ---------- Página ----------
export default function PalacioPalabrasPage() {
  const contenido = useContenidoJuego();
  if (!contenido)
    return (
      <SelectorUnidad
        titulo="Palacio de las palabras"
        tituloChino="字母宫殿"
        icono={<Sello grande>字</Sello>}
        descripcion="Forma palabras con fichas de marfil contra el Rey Mono · 用象牙字母牌和美猴王比赛拼词"
      />
    );
  return <CargaLexico key={contenido.numero} contenido={contenido} />;
}

function CargaLexico({ contenido }) {
  const [datos, setDatos] = React.useState(null);
  React.useEffect(() => {
    let vivo = true;
    import("../../data/palacio-lexico.json").then((m) => vivo && setDatos(m.default || m));
    return () => {
      vivo = false;
    };
  }, []);
  const lexico = React.useMemo(() => (datos ? prepararLexico(datos, contenido.vocabulario) : null), [datos, contenido]);
  if (!lexico)
    return (
      <div className="pdl-raiz pdl-cargando gm-no-adapt">
        <Sello grande>字</Sello>
        <p>Abriendo el palacio… · 正在打开宫殿……</p>
      </div>
    );
  return <JuegoPalacio contenido={contenido} lexico={lexico} />;
}

// ---------- Ficha de marfil ----------
function Ficha({ ficha, className = "", style, ...rest }) {
  return (
    <span className={`pdl-ficha ${ficha.comodin ? "is-comodin" : ""} ${className}`} style={style} {...rest}>
      <span className="pdl-ficha__letra">{ficha.l ? MAYUS(ficha.l) : <i translate="no">悟</i>}</span>
      {!ficha.comodin && <span className="pdl-ficha__pts">{ficha.v}</span>}
      {ficha.comodin && ficha.l && (
        <span className="pdl-ficha__pts" translate="no">
          悟
        </span>
      )}
    </span>
  );
}

// ---------- Icono de cada casilla especial ----------
function MarcaPremio({ tipo }) {
  const info = INFO_PREMIO[tipo];
  if (tipo === "P2")
    return (
      <span className="pdl-premio" aria-hidden="true">
        <svg viewBox="0 0 20 24" className="pdl-premio__svg">
          <line x1="10" y1="0" x2="10" y2="3" stroke="#f2c14e" strokeWidth="1.4" />
          <rect x="6" y="3" width="8" height="2" rx="1" fill="#f2c14e" />
          <ellipse cx="10" cy="12.5" rx="7.5" ry="7" fill="#e0283f" stroke="#f2c14e" strokeWidth="1" />
          <path d="M10 5.6 V19.4 M5.2 7.8 Q10 12.5 5.2 17.2 M14.8 7.8 Q10 12.5 14.8 17.2" stroke="#8f0c21" strokeWidth=".8" fill="none" />
          <rect x="6" y="19" width="8" height="2" rx="1" fill="#f2c14e" />
          <line x1="10" y1="21" x2="10" y2="24" stroke="#f2c14e" strokeWidth="1.2" />
        </svg>
        <b>{info.corto}</b>
      </span>
    );
  if (tipo === "P3")
    return (
      <span className="pdl-premio" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="pdl-premio__svg">
          <path d="M3 15 C5 8 11 6 14 9 C16 11 15 14 12 14 C10 14 10 11 12 11 M14 9 C16 5 20 5 21 8 L19 8 M21 8 C21 12 18 13 17 12" stroke="#f2c14e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M3 15 C6 19 13 20 17 17 C19 15.5 20 17 22 18" stroke="#f2c14e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="19" cy="7" r=".9" fill="#fff3c4" />
        </svg>
        <b>{info.corto}</b>
      </span>
    );
  return (
    <span className="pdl-premio" aria-hidden="true">
      <i translate="no">{info.glifo}</i>
      <b>{info.corto}</b>
    </span>
  );
}

// ---------- Juego ----------
function JuegoPalacio({ contenido, lexico }) {
  const reducido = usePrefiereMenosMovimiento();
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [fase, setFase] = React.useState("intro"); // intro | juego | fin
  const [dificultad, setDificultad] = React.useState(() => {
    try {
      return localStorage.getItem("dele_palacio_dificultad") || "normal";
    } catch {
      return "normal";
    }
  });
  const [duracion, setDuracion] = React.useState("corta");
  const [p, setP] = React.useState(null); // estado de la partida
  const [puestas, setPuestas] = React.useState(() => new Map()); // índice → ficha (pendientes del jugador)
  const [sel, setSel] = React.useState(null); // id de la ficha elegida en el atril
  const [cursor, setCursor] = React.useState(null); // { i, h } para escribir con el teclado
  const [cambio, setCambio] = React.useState(null); // Set de ids a cambiar
  const [comodinEn, setComodinEn] = React.useState(null); // índice donde se eligió el comodín
  const [mono, setMono] = React.useState({ pose: "saluda", es: FRASES.inicio[0][0], zh: FRASES.inicio[0][1] });
  const [tarjeta, setTarjeta] = React.useState(null); // { quien, palabras, total, siete }
  const [brillo, setBrillo] = React.useState({ celdas: [], n: 0 }); // fichas que brillan en cadena
  const [sellos, setSellos] = React.useState([]); // sellos «+N» que vuelan al marcador
  const [agita, setAgita] = React.useState(0);
  const [aviso, setAviso] = React.useState(null);
  const [fantasma, setFantasma] = React.useState(null); // ficha arrastrada
  const [objetivo, setObjetivo] = React.useState(null);
  const [iman, setIman] = React.useState(null); // índice recién imantado
  const [verReglas, setVerReglas] = React.useState(false);
  const [brindis, setBrindis] = React.useState(false); // palabra + traducción sobre el tablero (móvil)
  const brindisRef = React.useRef(0);
  const raizRef = React.useRef(null);
  React.useEffect(() => () => clearTimeout(brindisRef.current), []);
  // Al empezar, el tablero arriba del todo (el botón de entrada queda abajo en móvil)
  React.useLayoutEffect(() => {
    if (fase !== "juego") return;
    raizRef.current?.scrollIntoView?.({ block: "start" });
    document.querySelector(".app-pantalla")?.scrollTo?.(0, 0);
  }, [fase]);
  const fantasmaRef = React.useRef(null);
  const arrastre = React.useRef(null);
  const tableroRef = React.useRef(null);

  const ptsJ = useNumeroAnimado(p?.puntos.j ?? 0, reducido);
  const ptsM = useNumeroAnimado(p?.puntos.m ?? 0, reducido);

  // ---------- Partida nueva ----------
  const nuevaPartida = React.useCallback(() => {
    let bolsa = crearBolsa();
    const j = rellenar([], bolsa);
    bolsa = j.bolsa;
    const m = rellenar([], bolsa);
    bolsa = m.bolsa;
    setP({
      tablero: new Array(LADO * LADO).fill(null),
      bolsa,
      atrilJ: j.atril,
      atrilM: m.atril,
      puntos: { j: 0, m: 0 },
      turno: "j",
      pases: 0,
      ronda: 1,
      historial: [],
      pistas: 3,
      fin: null,
    });
    setPuestas(new Map());
    setSel(null);
    setCursor(null);
    setCambio(null);
    setTarjeta(null);
    setBrillo({ celdas: [], n: 0 });
    setMono({ pose: "saluda", es: FRASES.inicio[0][0], zh: FRASES.inicio[0][1] });
    setFase("juego");
    try {
      localStorage.setItem("dele_palacio_dificultad", dificultad);
    } catch {}
  }, [dificultad]);

  const decir = (clave, pose) => {
    const [es, zh] = azar(FRASES[clave]);
    setMono({ pose, es, zh, n: Math.random() });
  };

  // ---------- Vista previa de la jugada ----------
  const previa = React.useMemo(() => {
    if (!p || !puestas.size) return null;
    return evaluar(p.tablero, puestas, lexico);
  }, [p, puestas, lexico]);

  const enAtril = React.useMemo(() => {
    if (!p) return [];
    const usados = new Set([...puestas.values()].map((f) => f.id));
    return p.atrilJ.filter((f) => !usados.has(f.id));
  }, [p, puestas]);

  const miTurno = fase === "juego" && p && p.turno === "j" && !p.fin;

  // ---------- Colocar y retirar fichas ----------
  const colocar = (ficha, i, desde = null) => {
    if (!miTurno || p.tablero[i]) return false;
    if (puestas.has(i) && desde !== i) return false;
    setPuestas((ant) => {
      const n = new Map(ant);
      if (desde != null) n.delete(desde);
      n.set(i, ficha.comodin && desde == null ? { ...ficha, l: "" } : ficha);
      return n;
    });
    setSel(null);
    setIman(i);
    setTimeout(() => setIman((x) => (x === i ? null : x)), 420);
    playClick?.();
    if (ficha.comodin && !ficha.l) setComodinEn(i);
    return true;
  };
  const retirar = (i) => {
    setPuestas((ant) => {
      const n = new Map(ant);
      n.delete(i);
      return n;
    });
  };
  const recoger = () => {
    setPuestas(new Map());
    setCursor(null);
  };
  const mezclar = () => {
    setP((ant) => {
      const a = [...ant.atrilJ];
      for (let k = a.length - 1; k > 0; k--) {
        const r = Math.floor(Math.random() * (k + 1));
        [a[k], a[r]] = [a[r], a[k]];
      }
      return { ...ant, atrilJ: a };
    });
  };

  // ---------- Celebración de una jugada ----------
  const celebrar = (quien, ev, puestasJugada) => {
    const palabras = ev.palabras.map((w) => ({ ...w, ...traduccion(lexico, w.k) }));
    const principal = [...palabras].sort((a, b) => b.celdas.length - a.celdas.length)[0];
    setTarjeta({ quien, palabras, total: ev.total, siete: ev.siete, n: Math.random() });
    setBrindis(true);
    clearTimeout(brindisRef.current);
    brindisRef.current = setTimeout(() => setBrindis(false), 4200);
    setBrillo({ celdas: principal.celdas, otras: palabras.flatMap((w) => w.celdas), n: Math.random(), quien });
    if (soundEnabled) setTimeout(() => speak(principal.es || principal.k, 0.9), reducido ? 0 : 350);
    // Sello «+N» que vuela al marcador
    const ultima = [...puestasJugada.keys()].pop();
    const celda = tableroRef.current?.querySelector(`[data-celda="${ultima}"]`);
    const destino = [...document.querySelectorAll(`.pdl-jugador[data-quien="${quien}"]`)].find((e) => e.offsetParent);
    if (celda && destino && !reducido) {
      const a = celda.getBoundingClientRect();
      const b = destino.getBoundingClientRect();
      const id = Math.random();
      setSellos((s) => [...s, { id, x: a.left + a.width / 2, y: a.top + a.height / 2, dx: b.left + b.width / 2 - (a.left + a.width / 2), dy: b.top + b.height / 2 - (a.top + a.height / 2), n: ev.total, quien }]);
      setTimeout(() => setSellos((s) => s.filter((x) => x.id !== id)), 1500);
    }
    return palabras;
  };

  // ---------- Fin de partida ----------
  const comprobarFin = (estado) => {
    let motivo = null;
    if (!estado.bolsa.length && (!estado.atrilJ.length || !estado.atrilM.length)) motivo = "fichas";
    else if (estado.pases >= 4) motivo = "pases";
    else if (duracion === "corta" && estado.ronda > RONDAS_CORTA) motivo = "rondas";
    if (!motivo) return estado;
    const puntos = { ...estado.puntos };
    const restoJ = sumaAtril(estado.atrilJ);
    const restoM = sumaAtril(estado.atrilM);
    puntos.j -= restoJ;
    puntos.m -= restoM;
    if (!estado.atrilJ.length) puntos.j += restoM;
    if (!estado.atrilM.length) puntos.m += restoJ;
    return { ...estado, puntos, fin: { motivo, restoJ, restoM } };
  };

  // ---------- Jugar (jugador) ----------
  const jugar = () => {
    if (!miTurno) return;
    const ev = evaluar(p.tablero, puestas, lexico);
    if (!ev.ok) {
      setAviso(ev.error);
      setAgita((n) => n + 1);
      playWrong?.();
      decir("mal", "serio");
      return;
    }
    const tablero = [...p.tablero];
    for (const [i, f] of puestas) tablero[i] = { ...f, de: "j" };
    const usados = new Set([...puestas.values()].map((f) => f.id));
    const r = rellenar(
      p.atrilJ.filter((f) => !usados.has(f.id)),
      p.bolsa,
    );
    const palabras = celebrar("j", ev, puestas);
    playCorrect?.();
    if (ev.palabras.some((w) => w.unidad)) decir("unidad", "feliz");
    else if (ev.total >= 25) decir("grande", "guino");
    else decir("bien", "feliz");
    const estado = comprobarFin({
      ...p,
      tablero,
      atrilJ: r.atril,
      bolsa: r.bolsa,
      puntos: { ...p.puntos, j: p.puntos.j + ev.total },
      pases: 0,
      turno: "m",
      historial: [{ quien: "j", palabras, total: ev.total }, ...p.historial],
    });
    setP(estado);
    setPuestas(new Map());
    setCursor(null);
    setAviso(null);
  };

  const pasar = () => {
    if (!miTurno) return;
    recoger();
    setP((ant) => comprobarFin({ ...ant, pases: ant.pases + 1, turno: "m" }));
  };

  const confirmarCambio = () => {
    if (!cambio?.size) return setCambio(null);
    setP((ant) => {
      const fuera = ant.atrilJ.filter((f) => cambio.has(f.id)).map((f) => (f.comodin ? { ...f, l: "" } : f));
      const queda = ant.atrilJ.filter((f) => !cambio.has(f.id));
      const r = rellenar(queda, ant.bolsa);
      const bolsa = [...r.bolsa, ...fuera];
      for (let k = bolsa.length - 1; k > 0; k--) {
        const x = Math.floor(Math.random() * (k + 1));
        [bolsa[k], bolsa[x]] = [bolsa[x], bolsa[k]];
      }
      return comprobarFin({ ...ant, atrilJ: r.atril, bolsa, pases: ant.pases + 1, turno: "m" });
    });
    setCambio(null);
  };

  const pista = () => {
    if (!miTurno || !p.pistas) return;
    recoger();
    const js = buscarJugadas(p.tablero, p.atrilJ, lexico, { limite: 700 });
    if (!js.length) {
      setAviso({ es: "No hay palabra posible: cambia fichas o pasa.", zh: "没有可组的词：换牌或跳过。" });
      return;
    }
    const conUnidad = js.find((j) => j.palabras.some((w) => w.unidad));
    const elegida = conUnidad && conUnidad.total >= js[0].total * 0.5 ? conUnidad : js[Math.min(js.length - 1, 2)];
    setPuestas(new Map(elegida.puestas));
    setP((ant) => ({ ...ant, pistas: ant.pistas - 1 }));
    setMono({ pose: "guino", es: "Prueba esto… pulsa «Jugar».", zh: "试试这个……点「落子」。", n: Math.random() });
  };

  // ---------- Turno del Rey Mono ----------
  React.useEffect(() => {
    if (fase !== "juego" || !p || p.turno !== "m" || p.fin) return;
    decir("piensa", "serio");
    const t = setTimeout(
      () => {
        const js = buscarJugadas(p.tablero, p.atrilM, lexico);
        const m = eligeMono(js, dificultad);
        if (!m) {
          if (p.bolsa.length >= ATRIL) {
            const fuera = p.atrilM.map((f) => (f.comodin ? { ...f, l: "" } : f));
            const r = rellenar([], p.bolsa);
            setP(comprobarFin({ ...p, atrilM: r.atril, bolsa: [...r.bolsa, ...fuera].sort(() => Math.random() - 0.5), pases: p.pases + 1, turno: "j", ronda: p.ronda + 1 }));
            decir("cambia", "serio");
          } else {
            setP(comprobarFin({ ...p, pases: p.pases + 1, turno: "j", ronda: p.ronda + 1 }));
            decir("monoPasa", "serio");
          }
          return;
        }
        const tablero = [...p.tablero];
        let k = 0;
        for (const [i, f] of m.puestas) tablero[i] = { ...f, de: "m", cae: k++ };
        const usados = new Set([...m.puestas.values()].map((f) => f.id));
        const r = rellenar(
          p.atrilM.filter((f) => !usados.has(f.id)),
          p.bolsa,
        );
        const palabras = celebrar("m", { ...m, siete: m.puestas.size === ATRIL }, m.puestas);
        decir(m.total >= 25 ? "monoGrande" : "mono", m.total >= 25 ? "poder" : "feliz");
        setP(
          comprobarFin({
            ...p,
            tablero,
            atrilM: r.atril,
            bolsa: r.bolsa,
            puntos: { ...p.puntos, m: p.puntos.m + m.total },
            pases: 0,
            turno: "j",
            ronda: p.ronda + 1,
            historial: [{ quien: "m", palabras, total: m.total }, ...p.historial],
          }),
        );
      },
      reducido ? 500 : 1500,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?.turno, fase]);

  // ---------- Final: XP, récord, sonido ----------
  const [premio, setPremio] = React.useState(null);
  React.useEffect(() => {
    if (!p?.fin || premio) return;
    const gana = p.puntos.j > p.puntos.m;
    const empate = p.puntos.j === p.puntos.m;
    const margen = p.puntos.j - p.puntos.m;
    const estrellas = gana ? (margen >= 60 ? 3 : margen >= 20 ? 2 : 1) : p.puntos.j >= p.puntos.m * 0.8 && p.puntos.j > 0 ? 1 : 0;
    const misPalabras = p.historial.filter((h) => h.quien === "j").flatMap((h) => h.palabras);
    const deUnidad = misPalabras.filter((w) => w.unidad).length;
    const xp = 10 + Math.max(0, Math.floor(p.puntos.j / 10)) + deUnidad * 3 + (gana ? 15 : 0) + estrellas * 5;
    const r = addXp(xp);
    const clave = claveRecord("palacio", contenido);
    const record = p.puntos.j > leerNumero(clave);
    if (record) guardarNumero(clave, p.puntos.j);
    setPremio({ gana, empate, estrellas, xp, record, deUnidad, subeNivel: r?.levelUp });
    const t = setTimeout(() => {
      setFase("fin");
      if (gana) {
        playWin?.();
        if (!reducido) confetti({ count: 160 });
      } else playLose?.();
    }, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?.fin]);
  React.useEffect(() => {
    if (fase === "juego" && p && !p.fin) setPremio(null);
  }, [fase, p]);

  // ---------- Arrastrar con imán (ratón y táctil) ----------
  const celdaBajo = (x, y) => {
    const el = document.elementFromPoint(x, y);
    const c = el?.closest?.("[data-celda]");
    if (!c) return { i: null, el: null, atril: !!el?.closest?.(".pdl-atril") };
    return { i: Number(c.dataset.celda), el: c, atril: false };
  };
  const moverFantasma = (x, y, el) => {
    const f = fantasmaRef.current;
    if (!f) return;
    let px = x;
    let py = y;
    if (el) {
      const r = el.getBoundingClientRect();
      // Imán: la ficha se acerca al centro de la casilla
      px = x + (r.left + r.width / 2 - x) * 0.65;
      py = y + (r.top + r.height / 2 - y) * 0.65;
    }
    f.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) rotate(${el ? 0 : -6}deg) scale(${el ? 1 : 1.12})`;
  };
  const alPulsar = (e, ficha, origen) => {
    if (!miTurno || e.button > 0) return;
    arrastre.current = { ficha, origen, x0: e.clientX, y0: e.clientY, activo: false, id: e.pointerId };
    const mover = (ev) => {
      const a = arrastre.current;
      if (!a) return;
      if (!a.activo) {
        if (Math.hypot(ev.clientX - a.x0, ev.clientY - a.y0) < 7) return;
        a.activo = true;
        setFantasma(a.ficha);
        setSel(null);
      }
      ev.preventDefault();
      const { i, el } = celdaBajo(ev.clientX, ev.clientY);
      const libre = i != null && !p.tablero[i] && (!puestas.has(i) || i === a.origen);
      a.objetivo = libre ? i : null;
      setObjetivo(libre ? i : null);
      requestAnimationFrame(() => moverFantasma(ev.clientX, ev.clientY, libre ? el : null));
    };
    const soltar = (ev) => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
      const a = arrastre.current;
      arrastre.current = null;
      setFantasma(null);
      setObjetivo(null);
      if (!a) return;
      if (!a.activo) return tocarFicha(a.ficha, a.origen);
      if (a.objetivo != null) colocar(a.ficha, a.objetivo, typeof a.origen === "number" ? a.origen : null);
      else if (typeof a.origen === "number") retirar(a.origen); // fuera del tablero: vuelve al atril
    };
    window.addEventListener("pointermove", mover, { passive: false });
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);
  };
  React.useLayoutEffect(() => {
    if (fantasma && arrastre.current) moverFantasma(arrastre.current.x0, arrastre.current.y0, null);
  }, [fantasma]);

  // Tocar ficha del atril → elegir; tocar ficha pendiente del tablero → vuelve al atril
  const tocarFicha = (ficha, origen) => {
    if (cambio) {
      setCambio((c) => {
        const n = new Set(c);
        n.has(ficha.id) ? n.delete(ficha.id) : n.add(ficha.id);
        return n;
      });
      return;
    }
    if (typeof origen === "number") {
      retirar(origen);
      return;
    }
    if (cursor && !p.tablero[cursor.i] && !puestas.has(cursor.i)) {
      if (colocar(ficha, cursor.i)) avanzarCursor(cursor);
      return;
    }
    setSel((s) => (s === ficha.id ? null : ficha.id));
  };
  const tocarCelda = (i) => {
    if (!miTurno || cambio) return;
    if (puestas.has(i)) return retirar(i);
    if (p.tablero[i]) return;
    const ficha = enAtril.find((f) => f.id === sel);
    if (ficha) {
      colocar(ficha, i);
      return;
    }
    // Sin ficha elegida: cursor para escribir con el teclado (otro toque cambia la dirección)
    setCursor((c) => (c && c.i === i ? { i, h: !c.h } : { i, h: true }));
  };
  const avanzarCursor = (c) => {
    let r = fila(c.i);
    let k = col(c.i);
    do {
      if (c.h) k++;
      else r++;
    } while (dentro(r, k) && (p.tablero[idx(r, k)] || puestas.has(idx(r, k))));
    setCursor(dentro(r, k) ? { i: idx(r, k), h: c.h } : null);
  };

  // Teclado: letras colocan en el cursor, Retroceso retira, Intro juega
  React.useEffect(() => {
    if (!miTurno || comodinEn != null) return;
    const tecla = (e) => {
      if (e.target.closest?.("input,textarea")) return;
      const l = e.key.toLowerCase();
      if (e.key === "Enter" && puestas.size) {
        e.preventDefault();
        return jugar();
      }
      if (e.key === "Escape") return recoger();
      if (e.key === "Backspace" && puestas.size) {
        e.preventDefault();
        const ultima = [...puestas.keys()].pop();
        retirar(ultima);
        setCursor((c) => (c ? { i: ultima, h: c.h } : c));
        return;
      }
      if (!cursor || !LETRAS.includes(l)) return;
      if (p.tablero[cursor.i] || puestas.has(cursor.i)) return;
      let ficha = enAtril.find((f) => !f.comodin && f.l === l);
      if (!ficha) {
        const com = enAtril.find((f) => f.comodin);
        if (com) ficha = { ...com, l };
      }
      if (!ficha) {
        setAgita((n) => n + 1);
        return;
      }
      setPuestas((ant) => new Map(ant).set(cursor.i, ficha));
      setIman(cursor.i);
      playClick?.();
      avanzarCursor(cursor);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  const elegirLetraComodin = (l) => {
    setPuestas((ant) => {
      const n = new Map(ant);
      const f = n.get(comodinEn);
      if (f) n.set(comodinEn, { ...f, l });
      return n;
    });
    setComodinEn(null);
  };

  // ---------- Pantallas ----------
  const unidadPalabras = React.useMemo(() => {
    const lista = [...lexico.unidad.entries()].filter(([k]) => k.length <= 9).map(([k, v]) => ({ k, ...v }));
    return lista.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [lexico]);

  if (fase === "intro" || !p)
    return (
      <div className={`pdl-raiz gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
        <Barra contenido={contenido} soundEnabled={soundEnabled} toggleSound={toggleSound} />
        <section className="pdl-intro">
          <div className="pdl-intro__mono">
            <img src={imgMono("saluda")} alt="" width="180" height="180" />
          </div>
          <div className="pdl-intro__texto">
            <p className="pdl-ceja">
              <Sello>字</Sello> {etiquetaContenido(contenido)} · {contenido.titulo}
            </p>
            <h1>
              Palacio de las palabras <span translate="no">字母宫殿</span>
            </h1>
            <p className="pdl-intro__desc">
              Reta al Rey Mono: coloca tus fichas de marfil en el tablero de laca y forma palabras en español. Las palabras de tu unidad dan <b>bono +50 %</b>.
              <span> 挑战美猴王：把象牙字母牌放到漆金棋盘上，拼出西班牙语单词。本单元的单词额外加分 <b>+50%</b>。</span>
            </p>
            <Leyenda />
            <div className="pdl-opciones">
              <div role="radiogroup" aria-label="Rival · 对手">
                <span className="pdl-opciones__titulo">Rey Mono · 美猴王</span>
                {[
                  ["facil", "Aprendiz", "学徒"],
                  ["normal", "Guerrero", "武士"],
                  ["maestro", "Inmortal", "大圣"],
                ].map(([id, es, zh]) => (
                  <button key={id} type="button" role="radio" aria-checked={dificultad === id} className={`pdl-opcion ${dificultad === id ? "is-activa" : ""}`} onClick={() => setDificultad(id)}>
                    {es} <small translate="no">{zh}</small>
                  </button>
                ))}
              </div>
              <div role="radiogroup" aria-label="Duración · 时长">
                <span className="pdl-opciones__titulo">Partida · 对局</span>
                {[
                  ["corta", `Corta · ${RONDAS_CORTA} rondas`, `短局 · ${RONDAS_CORTA}轮`],
                  ["completa", "Completa · toda la bolsa", "完整 · 用完所有牌"],
                ].map(([id, es, zh]) => (
                  <button key={id} type="button" role="radio" aria-checked={duracion === id} className={`pdl-opcion ${duracion === id ? "is-activa" : ""}`} onClick={() => setDuracion(id)}>
                    {es} <small translate="no">{zh}</small>
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="pdl-boton pdl-boton--grande" onClick={nuevaPartida}>
              <PlayIcon size={22} aria-hidden="true" /> Entrar al palacio · 进入宫殿
            </button>
            <Reglas />
          </div>
        </section>
      </div>
    );

  const marcador = (
    <div className="pdl-marcador" role="group" aria-label="Marcador · 比分">
      <div className={`pdl-jugador ${p.turno === "j" && !p.fin ? "is-turno" : ""}`} data-quien="j">
        <span className="pdl-jugador__sello" translate="no">
          你
        </span>
        <span className="pdl-jugador__nombre">
          Tú <small translate="no">你</small>
        </span>
        <b className="pdl-jugador__pts" aria-live="polite">
          {ptsJ}
        </b>
      </div>
      <div className="pdl-bolsa" title="Fichas en la bolsa · 袋中字母牌">
        <span className="pdl-bolsa__saco" aria-hidden="true" />
        <b>{p.bolsa.length}</b>
        <small>
          {duracion === "corta" ? `Ronda ${Math.min(p.ronda, RONDAS_CORTA)}/${RONDAS_CORTA}` : "bolsa"} <span translate="no">{duracion === "corta" ? "轮" : "袋"}</span>
        </small>
      </div>
      <div className={`pdl-jugador pdl-jugador--mono ${p.turno === "m" && !p.fin ? "is-turno" : ""}`} data-quien="m">
        <img src={imgMono(mono.pose)} alt="" className="pdl-jugador__cara" />
        <span className="pdl-jugador__nombre">
          Rey Mono <small translate="no">美猴王</small>
        </span>
        <b className="pdl-jugador__pts">{ptsM}</b>
      </div>
    </div>
  );

  return (
    <div ref={raizRef} className={`pdl-raiz pdl-raiz--juego gm-no-adapt ${reducido ? "is-reducido" : ""} ${fantasma ? "is-arrastrando" : ""}`}>
      <Barra contenido={contenido} soundEnabled={soundEnabled} toggleSound={toggleSound} onReglas={() => setVerReglas(true)} />
      <div className="pdl-marcador-movil">{marcador}</div>
      <div className="pdl-mesa">
        <div className="pdl-centro">
          <div className="pdl-escena">
            <div className={`pdl-tablero ${p.turno === "m" ? "is-mono" : ""}`} ref={tableroRef} role="grid" aria-label="Tablero 13×13 · 棋盘">
              <span className="pdl-esquina pdl-esquina--1" aria-hidden="true" />
              <span className="pdl-esquina pdl-esquina--2" aria-hidden="true" />
              <span className="pdl-esquina pdl-esquina--3" aria-hidden="true" />
              <span className="pdl-esquina pdl-esquina--4" aria-hidden="true" />
              <div className="pdl-rejilla">
                {p.tablero.map((f, i) => {
                  const pend = puestas.get(i);
                  const premio = PREMIOS[i];
                  const nBrillo = brillo.celdas.indexOf(i);
                  const enOtra = brillo.otras?.includes(i);
                  const mala = previa && !previa.ok && pend && previa.malas;
                  const clases = [
                    "pdl-celda",
                    premio ? `pdl-celda--${premio}` : "",
                    objetivo === i ? "is-objetivo" : "",
                    cursor?.i === i && !f && !pend ? `is-cursor ${cursor.h ? "is-h" : "is-v"}` : "",
                  ].join(" ");
                  const etiqueta = f || pend ? `${MAYUS((f || pend).l)}` : premio ? INFO_PREMIO[premio].es : "";
                  return (
                    <div
                      key={i}
                      role="gridcell"
                      className={clases}
                      data-celda={i}
                      onClick={() => tocarCelda(i)}
                      aria-label={`Fila ${fila(i) + 1}, columna ${col(i) + 1}${etiqueta ? `: ${etiqueta}` : ""}`}
                      style={premio ? { "--d": `${((fila(i) * 7 + col(i) * 3) % 11) * 0.45}s` } : undefined}
                    >
                      {premio && !f && !pend && <MarcaPremio tipo={premio} />}
                      {f && (
                        <Ficha
                          ficha={f}
                          className={`is-fija ${f.de === "m" ? "is-mono" : ""} ${nBrillo >= 0 ? "is-brilla" : enOtra ? "is-brilla-suave" : ""} ${f.cae != null && brillo.quien === "m" && nBrillo >= 0 ? "is-cae" : ""}`}
                          style={{ "--b": `${Math.max(0, nBrillo) * 0.09}s`, "--c": `${(f.cae || 0) * 0.12}s`, "--k": brillo.n }}
                          key={`${f.id}-${nBrillo >= 0 ? brillo.n : 0}`}
                        />
                      )}
                      {pend && (
                        <Ficha
                          ficha={pend}
                          className={`is-pendiente ${iman === i ? "is-iman" : ""} ${mala ? "is-mala" : ""}`}
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            alPulsar(e, pend, i);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          role="button"
                          tabIndex={0}
                          aria-label={`Quitar ${MAYUS(pend.l)} · 收回`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {brindis && tarjeta && (
            <div className={`pdl-brindis ${tarjeta.quien === "m" ? "is-mono" : ""}`} key={tarjeta.n} aria-hidden="true">
              {tarjeta.palabras.slice(0, 2).map((w) => (
                <span key={w.k}>
                  <b>{w.es || w.k}</b> <i translate="no">{w.zh}</i> <em>+{w.puntos}</em>
                </span>
              ))}
            </div>
          )}
          <div className="pdl-previa" aria-live="polite">
            {aviso ? (
              <span className="pdl-previa__error">
                {aviso.es} <small translate="no">{aviso.zh}</small>
              </span>
            ) : previa ? (
              previa.ok ? (
                <span className="pdl-previa__ok">
                  {previa.palabras.map((w) => (
                    <b key={w.k} className={w.unidad ? "is-unidad" : ""}>
                      {MAYUS(w.k)}
                    </b>
                  ))}
                  <em>+{previa.total}</em>
                  {previa.siete && <i>¡Siete sellos! +{BONO_SIETE} · 七印齐发</i>}
                </span>
              ) : (
                <span className="pdl-previa__error">
                  {previa.error.es} <small translate="no">{previa.error.zh}</small>
                </span>
              )
            ) : p.turno === "m" && !p.fin ? (
              <span className="pdl-previa__mono">El Rey Mono está pensando… · 美猴王思考中……</span>
            ) : (
              <span className="pdl-previa__ayuda">
                Arrastra una ficha a una casilla, o tócala y toca la casilla. · 拖动字母牌到格子上，或先点牌再点格子。
              </span>
            )}
          </div>

          <div className={`pdl-atril ${cambio ? "is-cambio" : ""}`} key={agita} data-agita={agita > 0 ? "1" : "0"} aria-label="Tu atril · 你的字母架">
            <div className="pdl-atril__madera">
              {enAtril.map((f, k) => (
                <Ficha
                  key={f.id}
                  ficha={f}
                  className={`is-atril ${sel === f.id ? "is-elegida" : ""} ${cambio?.has(f.id) ? "is-marcada" : ""} ${!miTurno ? "is-espera" : ""}`}
                  style={{ "--i": k }}
                  role="button"
                  tabIndex={miTurno ? 0 : -1}
                  aria-label={`Ficha ${f.comodin ? "comodín · 万能牌" : MAYUS(f.l)}, ${f.v} puntos`}
                  aria-pressed={sel === f.id || cambio?.has(f.id) || false}
                  onPointerDown={(e) => alPulsar(e, f, "atril")}
                  onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), tocarFicha(f, "atril"))}
                />
              ))}
              {Array.from({ length: Math.max(0, ATRIL - enAtril.length) }, (_, k) => (
                <span key={`h${k}`} className="pdl-ficha is-hueco" aria-hidden="true" />
              ))}
            </div>
          </div>

          <div className="pdl-acciones">
            {cambio ? (
              <>
                <span className="pdl-acciones__info">Toca las fichas que quieres cambiar · 点选要换的牌</span>
                <button type="button" className="pdl-boton" onClick={confirmarCambio} disabled={!cambio.size}>
                  <RepeatIcon size={18} aria-hidden="true" /> Cambiar {cambio.size || ""} · 换牌
                </button>
                <button type="button" className="pdl-boton pdl-boton--claro" onClick={() => setCambio(null)}>
                  <XIcon size={18} aria-hidden="true" /> Cancelar · 取消
                </button>
              </>
            ) : (
              <>
                <button type="button" className="pdl-boton pdl-boton--jugar" onClick={jugar} disabled={!miTurno || !puestas.size}>
                  <CheckIcon size={20} aria-hidden="true" /> Jugar · 落子
                </button>
                <button type="button" className="pdl-boton pdl-boton--claro" onClick={recoger} disabled={!miTurno || !puestas.size} aria-label="Recoger · 收回">
                  <RotateCcwIcon size={18} aria-hidden="true" /> <span>Recoger · 收回</span>
                </button>
                <button type="button" className="pdl-boton pdl-boton--claro" onClick={mezclar} disabled={!miTurno} aria-label="Mezclar · 洗牌">
                  <ShuffleIcon size={18} aria-hidden="true" /> <span>Mezclar · 洗牌</span>
                </button>
                <button type="button" className="pdl-boton pdl-boton--claro" onClick={pista} disabled={!miTurno || !p.pistas} aria-label={`Pista, quedan ${p.pistas} · 提示`}>
                  <LightbulbIcon size={18} aria-hidden="true" /> <span>Pista · 提示</span> {p.pistas > 0 && <sup>{p.pistas}</sup>}
                </button>
                <button
                  type="button"
                  className="pdl-boton pdl-boton--claro"
                  onClick={() => {
                    recoger();
                    setCambio(new Set());
                  }}
                  disabled={!miTurno || p.bolsa.length < ATRIL}
                  aria-label="Cambiar fichas · 换牌"
                >
                  <RepeatIcon size={18} aria-hidden="true" /> <span>Cambiar · 换牌</span>
                </button>
                <button type="button" className="pdl-boton pdl-boton--claro" onClick={pasar} disabled={!miTurno} aria-label="Pasar · 跳过">
                  <SkipForwardIcon size={18} aria-hidden="true" /> <span>Pasar · 跳过</span>
                </button>
              </>
            )}
          </div>
        </div>

        <aside className="pdl-lateral">
          <div className="pdl-marcador-lateral">{marcador}</div>
          <div className="pdl-mono" key={mono.n}>
            <img src={imgMono(mono.pose)} alt="" className="pdl-mono__img" width="120" height="120" />
            <p className="pdl-mono__bocadillo">
              {mono.es}
              <small translate="no">{mono.zh}</small>
            </p>
          </div>

          {tarjeta && (
            <div className={`pdl-tarjeta ${tarjeta.quien === "m" ? "is-mono" : ""}`} key={tarjeta.n}>
              <span className="pdl-tarjeta__quien">{tarjeta.quien === "j" ? "Tu palabra · 你的单词" : "Palabra del Rey Mono · 美猴王的单词"}</span>
              {tarjeta.palabras.map((w) => (
                <div className="pdl-tarjeta__palabra" key={w.k}>
                  <button type="button" onClick={() => speak(w.es || w.k, 0.85)} aria-label={`Escuchar ${w.es || w.k} · 听`}>
                    <Volume2Icon size={18} aria-hidden="true" />
                  </button>
                  <span className="pdl-tarjeta__es">{w.es || w.k}</span>
                  <span className="pdl-tarjeta__zh" translate="no">
                    {w.zh || "—"}
                    {w.lema && <em className="pdl-tarjeta__lema">← {w.lema}</em>}
                  </span>
                  {w.unidad && (
                    <span className="pdl-tarjeta__bono" title="Palabra de la unidad · 本单元单词">
                      <i translate="no">课</i> +{w.bono}
                    </span>
                  )}
                  <b className="pdl-tarjeta__pts">+{w.puntos}</b>
                </div>
              ))}
              {tarjeta.siete && (
                <p className="pdl-tarjeta__siete">
                  ¡Siete sellos! +{BONO_SIETE} <span translate="no">七印齐发</span>
                </p>
              )}
            </div>
          )}

          <details className="pdl-panel" open>
            <summary>
              <BookOpenIcon size={16} aria-hidden="true" /> Palabras de la unidad · 本单元单词 <em>+50%</em>
            </summary>
            <ul className="pdl-vocab">
              {unidadPalabras.map((w) => (
                <li key={w.k}>
                  <button type="button" onClick={() => speak(w.es, 0.85)}>
                    <b>{w.es}</b> <small translate="no">{w.zh}</small>
                  </button>
                </li>
              ))}
            </ul>
          </details>

          {p.historial.length > 0 && (
            <details className="pdl-panel pdl-panel--historial">
              <summary>
                Palabras jugadas · 已组单词 <em>{p.historial.length}</em>
              </summary>
              <ol className="pdl-historial">
                {p.historial.slice(0, 14).map((h, k) => (
                  <li key={k} className={h.quien === "m" ? "is-mono" : ""}>
                    <span>{h.quien === "j" ? "Tú" : "Mono"}</span>
                    <b>{h.palabras.map((w) => w.es || w.k).join(", ")}</b>
                    <small translate="no">{h.palabras.map((w) => w.zh).filter(Boolean).join("，")}</small>
                    <em>+{h.total}</em>
                  </li>
                ))}
              </ol>
            </details>
          )}
        </aside>
      </div>

      {fantasma &&
        createPortal(
          <div className="pdl-fantasma gm-no-adapt" ref={fantasmaRef} aria-hidden="true">
            <Ficha ficha={fantasma} className="is-arrastre" />
          </div>,
          document.body,
        )}

      {sellos.length > 0 &&
        createPortal(
          <div className="pdl-capa-sellos gm-no-adapt" aria-hidden="true">
            {sellos.map((s) => (
              <span key={s.id} className={`pdl-sello-vuela ${s.quien === "m" ? "is-mono" : ""}`} style={{ left: s.x, top: s.y, "--dx": `${s.dx}px`, "--dy": `${s.dy}px` }}>
                +{s.n}
              </span>
            ))}
          </div>,
          document.body,
        )}

      {comodinEn != null &&
        createPortal(
          <div className="pdl-modal gm-no-adapt" role="dialog" aria-modal="true" aria-label="Elige la letra del comodín · 选择万能牌的字母">
            <div className="pdl-modal__caja">
              <h2>
                Comodín del Mono <span translate="no">悟 · 万能牌</span>
              </h2>
              <p>¿Qué letra quieres que sea? · 你想让它变成哪个字母？</p>
              <div className="pdl-letras">
                {LETRAS.map((l) => (
                  <button key={l} type="button" className="pdl-ficha pdl-ficha--boton" onClick={() => elegirLetraComodin(l)}>
                    <span className="pdl-ficha__letra">{MAYUS(l)}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="pdl-boton pdl-boton--claro"
                onClick={() => {
                  retirar(comodinEn);
                  setComodinEn(null);
                }}
              >
                <XIcon size={18} aria-hidden="true" /> Cancelar · 取消
              </button>
            </div>
          </div>,
          document.body,
        )}

      {verReglas &&
        createPortal(
          <div className="pdl-modal gm-no-adapt" role="dialog" aria-modal="true" aria-label="Reglas · 规则" onClick={() => setVerReglas(false)}>
            <div className="pdl-modal__caja pdl-modal__caja--reglas" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="pdl-modal__cerrar" onClick={() => setVerReglas(false)} aria-label="Cerrar · 关闭">
                <XIcon size={20} />
              </button>
              <h2>
                Reglas del palacio <span translate="no">宫殿规则</span>
              </h2>
              <Leyenda />
              <Reglas abierto />
            </div>
          </div>,
          document.body,
        )}

      {fase === "fin" && premio &&
        createPortal(
          <div className="pdl-modal pdl-modal--fin gm-no-adapt" role="dialog" aria-modal="true" aria-label="Fin de la partida · 对局结束">
            <div className="pdl-modal__caja pdl-final">
              <img src={imgMono(premio.gana ? "trofeo" : premio.empate ? "guino" : "poder")} alt="" className="pdl-final__mono" />
              <h2>
                {premio.gana ? "¡Has conquistado el palacio!" : premio.empate ? "¡Empate imperial!" : "El Rey Mono gana esta vez"}
                <span translate="no">{premio.gana ? "你征服了宫殿！" : premio.empate ? "平局！" : "这次美猴王赢了"}</span>
              </h2>
              <div className="pdl-estrellas" aria-label={`${premio.estrellas} de 3 estrellas · 星`}>
                {[0, 1, 2].map((k) => (
                  <StarIcon key={k} size={46} className={k < premio.estrellas ? "is-llena" : ""} style={{ "--k": k }} aria-hidden="true" />
                ))}
              </div>
              <div className="pdl-final__marcador">
                <span>
                  Tú <small translate="no">你</small> <b>{p.puntos.j}</b>
                </span>
                <span>
                  Rey Mono <small translate="no">美猴王</small> <b>{p.puntos.m}</b>
                </span>
              </div>
              <p className="pdl-final__datos">
                <span className="pdl-final__xp">+{premio.xp} XP</span>
                {premio.deUnidad > 0 && (
                  <span>
                    {premio.deUnidad} palabras de la unidad · {premio.deUnidad}个本单元单词
                  </span>
                )}
                {premio.record && <span className="pdl-final__record">¡Récord en esta unidad! · 本单元新纪录！</span>}
              </p>
              <ul className="pdl-final__palabras">
                {p.historial
                  .filter((h) => h.quien === "j")
                  .flatMap((h) => h.palabras)
                  .slice(0, 12)
                  .map((w, k) => (
                    <li key={k}>
                      <button type="button" onClick={() => speak(w.es || w.k, 0.85)}>
                        <b>{w.es || w.k}</b> <small translate="no">{w.zh}</small>
                      </button>
                    </li>
                  ))}
              </ul>
              <div className="pdl-final__acciones">
                <button type="button" className="pdl-boton pdl-boton--grande" onClick={nuevaPartida}>
                  <RotateCcwIcon size={20} aria-hidden="true" /> Otra partida · 再来一局
                </button>
                <Link to="/juegos/palacio-palabras" className="pdl-boton pdl-boton--claro">
                  Otra unidad · 换单元
                </Link>
                <Link to="/juegos" className="pdl-boton pdl-boton--claro">
                  Juegos · 游戏
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function Barra({ contenido, soundEnabled, toggleSound, onReglas }) {
  return (
    <div className="pdl-barra">
      <Link to="/juegos" className="pdl-volver">
        <ArrowLeftIcon size={18} aria-hidden="true" /> <span>Juegos · 游戏</span>
      </Link>
      <span className="pdl-barra__titulo">
        <Sello className="pdl-barra__sello">字</Sello>
        <span>
          Palacio de las palabras <small translate="no">字母宫殿</small>
        </span>
      </span>
      <span className="pdl-unidad">{etiquetaContenido(contenido)}</span>
      {onReglas && (
        <button type="button" className="pdl-icono" onClick={onReglas} aria-label="Reglas · 规则">
          <BookOpenIcon size={19} />
        </button>
      )}
      <button type="button" className="pdl-icono" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 开声音"}>
        {soundEnabled ? <Volume2Icon size={19} /> : <VolumeXIcon size={19} />}
      </button>
    </div>
  );
}

function Leyenda() {
  return (
    <ul className="pdl-leyenda" aria-label="Casillas especiales · 特殊格子">
      {["L2", "L3", "P2", "P3", "T"].map((t) => (
        <li key={t}>
          <span className={`pdl-celda pdl-celda--${t} pdl-celda--muestra`}>
            <MarcaPremio tipo={t} />
          </span>
          <span>
            {INFO_PREMIO[t].es}
            <small translate="no">{INFO_PREMIO[t].zh}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Reglas({ abierto = false }) {
  return (
    <details className="pdl-reglas" open={abierto}>
      <summary>¿Cómo se juega? · 怎么玩？</summary>
      <ol>
        <li>
          Cada uno tiene un atril de 7 fichas. La primera palabra pasa por el Trono (座) del centro. <span>每人7张字母牌。第一个单词必须经过中间的宝座。</span>
        </li>
        <li>
          Las palabras van en una fila (→) o en una columna (↓) y deben tocar las fichas del tablero. <span>单词横放或竖放，并且要连接棋盘上的字母。</span>
        </li>
        <li>
          Cada letra vale sus puntos; las casillas especiales los multiplican la primera vez que se cubren. <span>每个字母有分值；特殊格子在第一次被覆盖时加倍。</span>
        </li>
        <li>
          Palabra de la unidad: +50 %. Usar las 7 fichas a la vez: «Siete sellos» +{BONO_SIETE}. <span>本单元单词 +50%；一次用完7张牌「七印齐发」+{BONO_SIETE}。</span>
        </li>
        <li>
          El comodín 悟 sirve de cualquier letra y vale 0. Puedes cambiar fichas o pasar (pierdes el turno). <span>「悟」是万能牌，可当任何字母，0分。可以换牌或跳过（失去本回合）。</span>
        </li>
        <li>
          Con teclado: toca una casilla vacía (otro toque cambia → / ↓), escribe las letras e Intro para jugar. <span>键盘：点空格（再点切换方向），输入字母，按回车落子。</span>
        </li>
      </ol>
      <p className="pdl-reglas__letras">
        {Object.entries(PUNTOS)
          .filter(([l]) => l !== "*")
          .map(([l, v]) => (
            <span key={l}>
              {MAYUS(l)}
              <sub>{v}</sub>
            </span>
          ))}
      </p>
    </details>
  );
}

