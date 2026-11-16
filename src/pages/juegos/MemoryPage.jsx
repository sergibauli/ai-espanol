import {
  StarIcon,
  ZapIcon,
  AwardIcon,
  TrophyIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  Grid3x3Icon,
  LayersIcon,
  RotateCcwIcon,
  FlameIcon,
  TimerIcon,
  FootprintsIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import { useSound } from "../../lib/sound.jsx";
import { Escena3D, BarraJuego, Placa, Boton3D, Resultado3D } from "../../components/juegos/Escena3D.jsx";
import "../../styles/v17-ruleta.css";
import "../../styles/v17-memory.css";
import "../../styles/movil-juegos.css";
const G = {
  "4x4": {
    pairs: 8,
    cols: 4,
    label: "Fácil 4×4",
    labelCn: "简单",
    baseTime: 60,
  },
  "4x5": {
    pairs: 10,
    cols: 5,
    label: "Medio 4×5",
    labelCn: "中等",
    baseTime: 90,
  },
  "6x6": {
    pairs: 18,
    cols: 6,
    label: "Difícil 6×6",
    labelCn: "困难",
    baseTime: 120,
  },
};
function He() {
  const a = [
    "#e0283f",
    "#f2c14e",
    "#f2c14e",
    "#5fd08a",
    "#d99a22",
    "#a50f25",
    "#e0283f",
    "#a50f25",
    "#ffffff",
  ];
  const r = window.innerWidth < 768 ? 28 : 52;
  const f = document.createDocumentFragment();
  for (let b = 0; b < r; b++) {
    const u = document.createElement("div");
    const d = 3 + Math.random() * 8;
    const l = Math.random() > 0.6 ? "50%" : Math.random() > 0.5 ? "2px" : "0";
    u.style.cssText = `position:fixed;left:50%;top:40%;width:${d}px;height:${d}px;border-radius:${l};background:${a[b % a.length]};pointer-events:none;z-index:9999;box-shadow:0 0 15px ${a[b % a.length]};`;
    f.appendChild(u);
    const w = (Math.PI * 2 * b) / r + (Math.random() - 0.5) * 0.7;
    const m = 130 + Math.random() * (window.innerWidth < 768 ? 190 : 330);
    const h = Math.cos(w) * m;
    const y = Math.sin(w) * m + 150;
    const S = u.animate(
      [
        {
          transform: "translate3d(0,0,0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate3d(${h}px,${y}px,0) rotate(${360 + Math.random() * 540}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1050 + Math.random() * 650,
        easing: "cubic-bezier(.18,.75,.25,1)",
        fill: "forwards",
      },
    );
    S.onfinish = () => u.remove();
  }
  document.body.appendChild(f);
}
function ve(a) {
  const r = [...a];
  for (let f = r.length - 1; f > 0; f--) {
    const b = Math.floor(Math.random() * (f + 1));
    [r[f], r[b]] = [r[b], r[f]];
  }
  return r;
}
// v17 · Ficha con grosor que se voltea en 3D: dorso de jade con sello, cara de marfil con la palabra.
function Ficha3D({ card, index, onClick, tiembla, recien }) {
  const vista = card.state === "revealed" || card.state === "matched";
  const pareja = card.state === "matched";
  return (
    <button
      type="button"
      className={`mm-ficha ${vista ? "mm-ficha--vista" : ""} ${pareja ? "mm-ficha--pareja" : ""} ${tiembla ? "mm-ficha--mal" : ""} ${recien ? "mm-ficha--recien" : ""}`}
      style={{ "--i": index }}
      onClick={onClick}
      disabled={pareja}
      aria-label={vista ? card.text : `Ficha ${index + 1} · 第 ${index + 1} 张`}
    >
      <span className="mm-ficha__giro">
        <span className="mm-ficha__dorso" aria-hidden="true" translate="no">
          <i>忆</i>
        </span>
        <span className={`mm-ficha__cara ${card.isSpanish ? "mm-ficha__cara--es" : "mm-ficha__cara--zh"}`}>
          <b className={card.text.length > 7 ? "mm-largo" : ""}>{vista ? card.text : ""}</b>
          <i aria-hidden="true">{card.isSpanish ? "ES" : "中"}</i>
        </span>
      </span>
    </button>
  );
}
function PtComponent() {
  const [a, setA] = React.useState("select");
  const [f, setF] = React.useState(null);
  const [u, setU] = React.useState([]);
  const [l, setL] = React.useState("4x4");
  const [m, setM] = React.useState([]);
  const [z, setZ] = React.useState(0);
  const [j, setJ] = React.useState(0);
  const [g, setG] = React.useState(false);
  const [$, set$] = React.useState(false);
  const [M, setM_1] = React.useState(1);
  const [F, setF_1] = React.useState(0);
  const [X, setX] = React.useState(0);
  const [se, setSe] = React.useState(0);
  const [at, setAt] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("memory_best") || "{}");
    } catch {
      return {};
    }
  });
  const [Ne, setNe] = React.useState([]);
  const [Me, setMe] = React.useState([]);
  const [shakeIds, setShakeIds] = React.useState(new Set());
  const [matchIds, setMatchIds] = React.useState(new Set());
  const [$e, set$e] = React.useState(false);
  const [mood, setMood] = React.useState("neutral");
  const [_, set_] = React.useState([]);
  const URef = React.useRef(0);
  const PRef = React.useRef(null);
  const [oe, setOe] = React.useState("");
  const [Pe, setPe] = React.useState(false);
  // Turno de comparación sin cierres obsoletos: la primera carta, el bloqueo del tablero mientras se
  // comparan dos, el combo y todos los temporizadores pendientes (se cancelan al reiniciar o salir).
  const primeraRef = React.useRef(null);
  const bloqueoRef = React.useRef(false);
  const comboRef = React.useRef(0);
  const cartasRef = React.useRef([]);
  const timersRef = React.useRef(new Set());
  const programar = React.useCallback((fn, ms) => {
    const id = setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, ms);
    timersRef.current.add(id);
  }, []);
  const cancelarTimers = React.useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
  }, []);
  React.useEffect(() => cancelarTimers, [cancelarTimers]);
  const { playCorrect, playWrong, playWin, playClick } = useSound();
  const K = G[l];
  const C = Math.max(10, Math.floor(K.baseTime * 0.85 ** (M - 1)));
  const Ye = Math.min(1 + F * 0.5, 5);
  React.useEffect(() => {
    if (_.length === 0) {
      return;
    }
    const t = setTimeout(() => set_([]), 1250);
    return () => clearTimeout(t);
  }, [_.length]);
  const Te = (t, top, p, x) => {
    const n = ++URef.current;
    setNe((i) => [
      ...i,
      {
        id: n,
        x: t,
        y: top,
        text: p,
        color: x,
      },
    ]);
    programar(() => setNe((i) => i.filter((v) => v.id !== n)), 1500);
  };
  const Xe = (t, o, p, x) => {
    const n = ++URef.current;
    setMe((i) => [
      ...i,
      {
        id: n,
        x: t,
        y: o,
        text: p,
        color: x,
        scale: 1 + F * 0.15,
      },
    ]);
    programar(() => setMe((i) => i.filter((v) => v.id !== n)), 1800);
  };
  const Be = (t, o, p = "#f2c14e", x = 50) => {
    const n = ["#f2c14e", "#e0283f", "#f2c14e", "#5fd08a", "#d99a22", "#a50f25", "#ffffff", "#5fd08a"];
    const i = [];
    const v = Math.min(x, window.innerWidth < 768 ? 16 : 34);
    for (let k = 0; k < v; k++) {
      const c = (Math.PI * 2 * k) / v + (Math.random() - 0.5) * 0.5;
      const N = 3 + Math.random() * 18;
      i.push({
        id: ++URef.current,
        x: t,
        y: o,
        vx: Math.cos(c) * N,
        vy: Math.sin(c) * N - 4,
        color: n[k % n.length],
        life: 1 + Math.random() * 0.8,
        size: 3 + Math.random() * 10,
        rotation: Math.random() * 360,
      });
    }
    set_((k) => [...k, ...i]);
  };
  const We = g_1();
  const de = React.useCallback((t) => {
    let o;
    if (t) {
      o = a_1(t);
    } else {
      o = a_1();
    }
    if (o.length === 0) {
      setOe(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const p = o
      .filter((x) => x.espanol && x.chino)
      .map((x) => ({
        es: x.espanol
          .toUpperCase()
          .replace(/[¿?¡!.,;:'"]/g, "")
          .trim(),
        zh: x.chino.trim(),
      }))
      .filter((x) => x.es.length > 0 && x.es.length <= 12);
    setU(p);
    setF(t);
    setA("playing");
    setMood("neutral");
    setM_1(1);
    setF_1(0);
    setX(0);
    setSe(0);
  }, []);
  const W = React.useCallback(
    (t, o = 1) => {
      const p = G[t];
      const x = u.length > 0 ? u : [];
      const n = ve(x).slice(0, p.pairs);
      let i = 0;
      const v = [];
      n.forEach((k, pairId) => {
        v.push({
          id: i++,
          text: k.es,
          isSpanish: true,
          pairId,
          state: "hidden",
        });
        v.push({
          id: i++,
          text: k.zh,
          isSpanish: false,
          pairId,
          state: "hidden",
        });
      });
      cancelarTimers();
      primeraRef.current = null;
      bloqueoRef.current = false;
      comboRef.current = 0;
      cartasRef.current = ve(v);
      setM(cartasRef.current);
      setZ(0);
      setJ(0);
      setG(false);
      set$(false);
      setMood("neutral");
      setF_1(0);
      set_([]);
      setNe([]);
      setMe([]);
      setShakeIds(new Set());
      setMatchIds(new Set());
      set$e(false);
      setPe(false);
      if (PRef.current) {
        clearInterval(PRef.current);
      }
      setM_1(o);
    },
    [u, cancelarTimers],
  );
  React.useEffect(() => {
    if (a === "playing") {
      W(l, 1);
    }
  }, [l, W, a]);
  React.useEffect(() => {
    if (g && !$) {
      PRef.current = setInterval(() => setJ((t) => t + 1), 1000);
      return () => {
        if (PRef.current) {
          clearInterval(PRef.current);
        }
      };
    }
  }, [g, $]);
  React.useEffect(() => {
    if (m.length > 0 && m.every((t) => t.state === "matched") && !$) {
      set$(true);
      setG(false);
      setMood("super");
      if (PRef.current) {
        clearInterval(PRef.current);
      }
      playWin();
      He();
      const t = Math.max(1000 - z * 10 - j * 5, 100);
      const o = X * 150;
      const p = j <= C ? 500 : j <= C * 1.5 ? 200 : 0;
      const x = 1 + (M - 1) * 0.5;
      const n = Math.floor((t + o + p) * x);
      setSe(n);
      setAt((i) => {
        const v = `${l}_L${M}`;
        const k = {
          ...i,
          [v]: Math.max(i[v] || 0, n),
        };
        localStorage.setItem("memory_best", JSON.stringify(k));
        return k;
      });
    }
  }, [m, $, z, j, l, M, X, C, playWin]);
  cartasRef.current = m;
  const marcar = (ids, state) =>
    setM((cartas) => cartas.map((carta) => (ids.includes(carta.id) ? { ...carta, state } : carta)));
  // Levantar una carta: se decide aquí, con refs, y no en un efecto que dependa del combo.
  const Le = (card) => {
    if ($ || bloqueoRef.current) return;
    const actual = cartasRef.current.find((carta) => carta.id === card.id);
    if (!actual || actual.state !== "hidden" || primeraRef.current === card.id) return;
    playClick();
    if (!g) setG(true);
    cartasRef.current = cartasRef.current.map((carta) => (carta.id === card.id ? { ...carta, state: "revealed" } : carta));
    marcar([card.id], "revealed");
    if (primeraRef.current === null) {
      primeraRef.current = card.id;
      return;
    }
    const t = primeraRef.current;
    const o = card.id;
    primeraRef.current = null;
    bloqueoRef.current = true;
    setZ((pasos) => pasos + 1);
    const p = cartasRef.current.find((carta) => carta.id === t);
    if (p && p.pairId === actual.pairId) {
      playCorrect();
      const n = comboRef.current + 1;
      comboRef.current = n;
      setF_1(n);
      setX((c) => Math.max(c, n));
      setMood(n >= 3 ? "super" : "happy");
      const v = Math.floor(100 * Math.min(1 + n * 0.5, 5));
      const k = document.getElementById(`mem-card-${t}`);
      if (k) {
        const c = k.getBoundingClientRect();
        Be(c.left + c.width / 2, c.top + c.height / 2, "#5fd08a", 30 + n * 10);
        Te(c.left + c.width / 2, c.top, `+${v}`, "#5fd08a");
        if (n >= 2) {
          Xe(c.left + c.width / 2, c.top - 30, `COMBO x${n}!`, "#f2c14e");
        }
      }
      cartasRef.current = cartasRef.current.map((carta) => (carta.id === t || carta.id === o ? { ...carta, state: "matched" } : carta));
      setMatchIds((c) => new Set(c).add(t).add(o));
      programar(() => {
        marcar([t, o], "matched");
        setMatchIds((c) => {
          const N = new Set(c);
          N.delete(t);
          N.delete(o);
          return N;
        });
        bloqueoRef.current = false;
      }, 700);
    } else {
      playWrong();
      comboRef.current = 0;
      setMood("sad");
      set$e(true);
      programar(() => set$e(false), 500);
      setShakeIds((n) => new Set(n).add(t).add(o));
      setF_1(0);
      programar(() => {
        cartasRef.current = cartasRef.current.map((carta) => (carta.id === t || carta.id === o ? { ...carta, state: "hidden" } : carta));
        marcar([t, o], "hidden");
        setShakeIds((n) => {
          const i = new Set(n);
          i.delete(t);
          i.delete(o);
          return i;
        });
        bloqueoRef.current = false;
      }, 1000);
    }
  };
  const onClick = () => {
    playClick();
    setPe(true);
    programar(() => {
      W(l, M + 1);
    }, 800);
  };
  const H = Math.max(1000 - z * 10 - j * 5, 100);
  const xe = X * 150;
  const Ze = $ ? (j <= C ? 500 : j <= C * 1.5 ? 200 : 0) : 0;
  const J = 1 + (M - 1) * 0.5;
  const Ge = $ ? se : Math.floor((H + xe) * J);
  const Z = Math.min(100, (j / C) * 100);
  if (a === "select") {
    return (
      <>
        <SelectorTemaJuego juego="memory" error={oe} onIniciar={(id) => { setOe(""); de(id); }} />
      </>
    );
  }
  if ($) {
    return (
      <Escena3D tema="memory">
        <CintaTemaJuego />
        <BarraJuego titulo="Memory Match" tituloZh="记忆配对" />
        <Resultado3D
          gano
          sello="忆"
          estrellas={j <= C ? 3 : j <= C * 1.5 ? 2 : 1}
          titulo="¡Completado!"
          tituloZh={`完成 · 第 ${M} 关`}
          datos={[
            { etiqueta: "Puntos · 得分", valor: se, tono: "rojo" },
            { etiqueta: "Movimientos · 步数", valor: z, tono: "tinta" },
            { etiqueta: "Tiempo · 时间", valor: `${j}s`, tono: "jade" },
            { etiqueta: "Combo máx. · 最高连击", valor: `x${X}`, tono: "oro" },
          ]}
          acciones={
            <>
              <Boton3D tono="oro" onClick={onClick}>
                Siguiente nivel · 下一关 <ChevronRightIcon size={18} />
              </Boton3D>
              <Boton3D tono="tinta" onClick={() => { playClick(); W(l, 1); }}>
                <RotateCcwIcon size={18} /> Reintentar · 重试
              </Boton3D>
            </>
          }
        >
          <dl className="mm-desglose">
            <div><dt>Base · 基础分</dt><dd>{H}</dd></div>
            <div><dt>Combo (x{X}) · 连击</dt><dd>+{xe}</dd></div>
            <div><dt>Rapidez · 速度</dt><dd>+{Ze}</dd></div>
            <div><dt>Nivel · 关卡</dt><dd>x{J.toFixed(1)}</dd></div>
          </dl>
        </Resultado3D>
        <P currentGameId="memory" />
        {Pe && (
          <div className="mm-telon" aria-live="polite">
            <p>¡Nivel {M + 1}! · 第 {M + 1} 关</p>
          </div>
        )}
      </Escena3D>
    );
  }
  const ultimoCombo = Me[Me.length - 1];
  return (
    <Escena3D tema="memory" suelo={false} className={`mm mm--c${K.cols} ${$e ? "rl--temblor" : ""}`}>
      <CintaTemaJuego />
      <BarraJuego titulo="Memory Match" tituloZh="记忆配对" alVolver={() => playClick()}>
        <Placa icono={<AwardIcon size={16} />} valor={Ge} etiqueta="Puntos · 分" />
        <Placa icono={<FlameIcon size={16} />} valor={`x${F}`} etiqueta="Combo · 连击" tono="rojo" pulso={F >= 2} />
        <Placa icono={<TimerIcon size={16} />} valor={`${Math.floor(j / 60)}:${String(j % 60).padStart(2, "0")}`} etiqueta={`Meta ${C}s · 目标`} tono={j <= C ? "jade" : "rojo"} />
        <Placa icono={<FootprintsIcon size={16} />} valor={z} etiqueta="Pasos · 步" tono="tinta" />
        <button type="button" className="rl-accion" onClick={() => { playClick(); W(l, 1); }} title="Reiniciar · 重置" aria-label="Reiniciar · 重置">
          <RotateCcwIcon size={18} />
        </button>
        <button type="button" className="rl-accion" onClick={() => { playClick(); setA("select"); }} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
      </BarraJuego>

      <div className="mm-ajustes">
        <span className="mm-nivel">
          <ZapIcon size={14} /> Nivel {M} · 第 {M} 关
        </span>
        <div className="mm-tamanos" role="group" aria-label="Dificultad · 难度">
          {Object.keys(G).map((clave) => (
            <button key={clave} type="button" className={`mm-tamano ${l === clave ? "mm-tamano--activo" : ""}`} aria-pressed={l === clave} onClick={() => { playClick(); setL(clave); }}>
              <b>{G[clave].label.split(" ")[1]}</b>
              <i>{G[clave].labelCn}</i>
            </button>
          ))}
        </div>
        <div className={`mm-meta ${j > C ? "mm-meta--tarde" : ""}`} aria-hidden="true">
          <i style={{ width: `${Math.min(Z, 100)}%` }} />
        </div>
      </div>

      <div className="rl-avisos" aria-live="polite">
        {ultimoCombo && (
          <p key={ultimoCombo.id} className="rl-aviso rl-aviso--racha">
            {ultimoCombo.text}
          </p>
        )}
      </div>

      <div className="mm-mesa">
        <div className="mm-tablero" style={{ "--cols": K.cols }}>
          {m.map((card, index) => (
            <div key={card.id} id={`mem-card-${card.id}`} className="mm-hueco">
              <Ficha3D card={card} index={index} onClick={() => Le(card)} tiembla={shakeIds.has(card.id)} recien={matchIds.has(card.id)} />
            </div>
          ))}
        </div>
      </div>
      {Pe && (
        <div className="mm-telon" aria-live="polite">
          <p>¡Nivel {M + 1}! · 第 {M + 1} 关</p>
        </div>
      )}
    </Escena3D>
  );
}
export { PtComponent as default };
