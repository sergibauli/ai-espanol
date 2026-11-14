import {
  ZapIcon,
  StarIcon,
  BookOpenIcon,
  TrophyIcon,
  BotIcon,
  UserIcon,
  ArrowLeftIcon,
  LayersIcon,
  RotateCcwIcon,
  ClockIcon,
  BanIcon,
  RepeatIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { a as a_1, g as g_1 } from "../../lib/juegos-utils.js";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import { useSound } from "../../lib/sound.jsx";
import { createPortal } from "react-dom";
import { Escena3D, BarraJuego, Placa, Boton3D, Resultado3D } from "../../components/juegos/Escena3D.jsx";
import "../../styles/v17-uno.css";
// Colores de las cartas (v14 · paleta imperial): laca, jade, azul porcelana y oro
const B = {
  red: "#d0213b",
  green: "#2f9e6a",
  blue: "#3a6fc4",
  yellow: "#f2c14e",
  wild: "#3b2416",
};
const be = {
  red: "Rojo",
  green: "Verde",
  blue: "Azul",
  yellow: "Amarillo",
  wild: "Comodín",
};
const lt = {
  red: "Verbos / 动词",
  green: "Adjetivos / 形容词",
  blue: "Sustantivos / 名词",
  yellow: "Expresiones / 表达",
  wild: "General / 通用",
};
const R = {
  red: "rgba(208,33,59,0.85)",
  green: "rgba(47,158,106,0.85)",
  blue: "rgba(58,111,196,0.85)",
  yellow: "rgba(242,193,78,0.85)",
  wild: "rgba(200,150,30,0.6)",
};
let nt = 0;
function U() {
  return ++nt;
}
function Oe(s) {
  const x = [...s];
  for (let m = x.length - 1; m > 0; m--) {
    const u = Math.floor(Math.random() * (m + 1));
    [x[m], x[u]] = [x[u], x[m]];
  }
  return x;
}
function it(s) {
  const x = [];
  const m = ["red", "green", "blue", "yellow"];
  const u = s.filter((o, i) => i % 4 === 0);
  const g = s.filter((o, i) => i % 4 === 1);
  const G = s.filter((o, i) => i % 4 === 2);
  const b = s.filter((o, i) => i % 4 === 3);
  function h(o, i) {
    const l = o === "red" ? u : o === "green" ? g : o === "blue" ? G : b;
    return l[i % Math.max(l.length, 1)];
  }
  for (const o of m) {
    const i = h(o, 0);
    x.push({
      id: U(),
      color: o,
      type: "number",
      value: 0,
      word: i?.es,
      translation: i?.zh,
    });
    for (let l = 1; l <= 9; l++) {
      for (let j = 0; j < 2; j++) {
        const N = h(o, l * 2 + j + 1);
        x.push({
          id: U(),
          color: o,
          type: "number",
          value: l,
          word: N?.es,
          translation: N?.zh,
        });
      }
    }
    for (let l = 0; l < 2; l++) {
      const j = h(o, 20 + l);
      x.push({
        id: U(),
        color: o,
        type: "skip",
        value: 0,
        word: j?.es,
        translation: j?.zh,
      });
      const N = h(o, 22 + l);
      x.push({
        id: U(),
        color: o,
        type: "reverse",
        value: 0,
        word: N?.es,
        translation: N?.zh,
      });
      const w = h(o, 24 + l);
      x.push({
        id: U(),
        color: o,
        type: "draw2",
        value: 0,
        word: w?.es,
        translation: w?.zh,
      });
    }
  }
  for (let o = 0; o < 4; o++) {
    const i = s[o % Math.max(s.length, 1)];
    x.push({
      id: U(),
      color: "wild",
      type: "wild",
      value: 0,
      word: i?.es,
      translation: i?.zh,
    });
  }
  for (let o = 0; o < 4; o++) {
    const i = s[(o + 4) % Math.max(s.length, 1)];
    x.push({
      id: U(),
      color: "wild",
      type: "wild4",
      value: 0,
      word: i?.es,
      translation: i?.zh,
    });
  }
  return Oe(x);
}
function q(s, x, m) {
  return (
    s.color === "wild" ||
    s.color === m ||
    (s.type === x.type && s.type !== "number") ||
    (s.type === "number" && x.type === "number" && s.value === x.value)
  );
}
function CtComponent({ mood, message }) {
  const rx = mood === "sad" ? 5 : mood === "excited" || mood === "super" ? 8 : 6;
  const ry = mood === "sad" ? 3 : mood === "excited" || mood === "super" ? 9 : 6;
  const d =
    mood === "happy"
      ? "M 14 24 Q 24 32 34 24"
      : mood === "sad"
        ? "M 14 30 Q 24 22 34 30"
        : mood === "excited" || mood === "super"
          ? "M 14 24 Q 24 36 34 24"
          : "M 16 26 Q 24 28 32 26";
  const fill =
    mood === "happy" || mood === "excited" || mood === "super"
      ? "rgba(224,40,63,0.7)"
      : "rgba(224,40,63,0.15)";
  const b =
    mood === "happy"
      ? "#5fd08a"
      : mood === "sad"
        ? "#ff4444"
        : mood === "excited" || mood === "super"
          ? "#f2c14e"
          : "#f2c14e";
  const animation =
    mood === "excited" || mood === "super"
      ? "mascotExcited 0.3s ease-in-out infinite"
      : "mascotFloat 3s ease-in-out infinite";
  const o = mood === "sad";
  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      {message && (
        <div
          className="absolute -top-12 right-0 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: `1px solid ${b}60`,
            color: b,
            backdropFilter: "blur(10px)",
            animation: "bubblePop 0.4s ease-out forwards",
            textShadow: `0 0 10px ${b}80`,
          }}
        >
          {message}
          <div
            className="absolute -bottom-1 right-6 w-2 h-2 rotate-45"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRight: `1px solid ${b}60`,
              borderBottom: `1px solid ${b}60`,
            }}
          />
        </div>
      )}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70"
          style={{
            background: b,
            width: "90px",
            height: "90px",
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <svg
          width="90"
          height="90"
          viewBox="0 0 48 48"
          fill="none"
          className="relative"
          style={{
            filter: `drop-shadow(0 0 15px ${b}80)`,
          }}
        >
          <ellipse cx="24" cy="26" rx="20" ry="18" fill="url(#unoBlobGrad)" stroke={b} strokeWidth="1.5" />
          <path
            d="M 6 14 L 10 2 L 18 12"
            fill="url(#unoBlobGrad)"
            stroke={b}
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{
              animation: mood === "excited" ? "earWiggle 0.5s ease-in-out infinite" : "none",
            }}
          />
          <path
            d="M 42 14 L 38 2 L 30 12"
            fill="url(#unoBlobGrad)"
            stroke={b}
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{
              animation: mood === "excited" ? "earWiggle 0.5s ease-in-out infinite 0.1s" : "none",
            }}
          />
          <path d="M 9 12 L 11 6 L 16 11" fill="rgba(255,182,193,0.5)" />
          <path d="M 39 12 L 37 6 L 32 11" fill="rgba(255,182,193,0.5)" />
          <ellipse cx="16" cy="22" rx={rx} ry={ry} fill="white" />
          <ellipse cx="32" cy="22" rx={rx} ry={ry} fill="white" />
          <circle cx="16" cy="22" r="3" fill="#2a160c" />
          <circle cx="32" cy="22" r="3" fill="#2a160c" />
          <circle cx="17.5" cy="20.5" r="1.2" fill="white" opacity="0.9" />
          <circle cx="33.5" cy="20.5" r="1.2" fill="white" opacity="0.9" />
          <circle cx="14.5" cy="23.5" r="0.6" fill="white" opacity="0.6" />
          <circle cx="30.5" cy="23.5" r="0.6" fill="white" opacity="0.6" />
          <path d={d} stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="11" cy="28" r="3.5" fill={fill} />
          <circle cx="37" cy="28" r="3.5" fill={fill} />
          {mood === "excited" || mood === "super" ? (
            <>
              <circle
                cx="4"
                cy="12"
                r="1.5"
                fill="#f2c14e"
                style={{
                  animation: "sparkle 0.5s ease-in-out infinite",
                }}
              />
              <circle
                cx="44"
                cy="8"
                r="1"
                fill="#e0283f"
                style={{
                  animation: "sparkle 0.7s ease-in-out infinite 0.2s",
                }}
              />
              <circle
                cx="42"
                cy="38"
                r="1.5"
                fill="#f2c14e"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
              <circle
                cx="2"
                cy="30"
                r="1"
                fill="#5fd08a"
                style={{
                  animation: "sparkle 0.8s ease-in-out infinite 0.1s",
                }}
              />
            </>
          ) : null}
          {o && (
            <>
              <circle cx="11" cy="26" r="1.5" fill="#f2c14e" opacity="0.8">
                <animate attributeName="cy" from="26" to="36" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="37" cy="26" r="1.5" fill="#f2c14e" opacity="0.8">
                <animate attributeName="cy" from="26" to="36" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="unoBlobGrad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#f2c14e" />
              <stop offset="50%" stopColor="#d99a22" />
              <stop offset="100%" stopColor="#e0283f" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
// v17 · Carta en 3D: cara de papel con óvalo lacado del color, o dorso de laca roja con sello.
function simboloCarta(card) {
  if (card.type === "number") return String(card.value);
  if (card.type === "skip") return <BanIcon strokeWidth={3} />;
  if (card.type === "reverse") return <RepeatIcon strokeWidth={3} />;
  if (card.type === "draw2") return "+2";
  if (card.type === "wild4") return "+4";
  return <span className="uno-rueda" />;
}
function Ge1Component({ card, onClick, isPlayable, isHidden, size = "medium", showWord = false, dealing = false }) {
  if (isHidden) {
    return (
      <div className={`uno-carta uno-carta--${size} uno-carta--dorso`} aria-hidden="true" translate="no">
        <span>牌</span>
      </div>
    );
  }
  const simbolo = simboloCarta(card);
  const Etiqueta = onClick ? "button" : "div";
  return (
    <Etiqueta
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`uno-carta uno-carta--${size} uno-carta--${card.color} ${isPlayable ? "uno-carta--jugable" : ""} ${dealing ? "uno-carta--reparto" : ""}`}
      aria-label={`${be[card.color]} ${card.type === "number" ? card.value : card.type}${card.word ? ` · ${card.word}` : ""}`}
    >
      <span className="uno-carta__esquina">{simbolo}</span>
      <span className="uno-carta__ovalo">
        <b>{simbolo}</b>
      </span>
      {card.word && (showWord || size !== "small") && (
        <span className="uno-carta__palabra">
          <b>{card.word}</b>
          {showWord && card.translation && <i>{card.translation}</i>}
        </span>
      )}
      <span className="uno-carta__esquina uno-carta__esquina--abajo">{simbolo}</span>
    </Etiqueta>
  );
}
function DtComponent({ onPick, onCancel }) {
  const colores = ["red", "green", "blue", "yellow"];
  return createPortal(
    <div className="uno-elige gm-no-adapt" role="dialog" aria-modal="true" aria-label="Elige un color · 选择颜色">
      <div className="uno-elige__caja">
        <h2>Elige un color</h2>
        <p>选择颜色</p>
        <div className="uno-elige__rueda">
          {colores.map((color) => (
            <button key={color} type="button" className={`uno-elige__gajo uno-elige__gajo--${color}`} onClick={() => onPick(color)}>
              <span>{be[color]}</span>
              <i>{lt[color].split(" / ")[1]}</i>
            </button>
          ))}
        </div>
        <button type="button" className="uno-elige__cancelar" onClick={onCancel}>
          Cancelar · 取消
        </button>
      </div>
    </div>,
    document.body,
  );
}
function HtComponent() {
  const [s, setS] = React.useState("select");
  const [m, setM] = React.useState(null);
  const [g, setG] = React.useState([]);
  const [b, setB] = React.useState([]);
  const [o, setO] = React.useState([]);
  const [l, setL] = React.useState([]);
  const [N, setN] = React.useState([]);
  const [z, setZ] = React.useState("red");
  const [y, setY] = React.useState(0);
  const [_, set_] = React.useState(1);
  const [L, setL_1] = React.useState(false);
  const [ae, setAe] = React.useState(null);
  const [mood, setMood] = React.useState("neutral");
  const [message, setMessage] = React.useState("");
  const [W, setW] = React.useState(false);
  const [we, setWe] = React.useState(null);
  const [je, setJe] = React.useState(0);
  const [re, setRe] = React.useState(0);
  const [Ze, setZe] = React.useState(0);
  const [Ee, setEe] = React.useState(0);
  const [Ne, setNe] = React.useState(new Set());
  const [Fe, setFe] = React.useState([]);
  const [A, setA] = React.useState(false);
  const [Ie, setIe] = React.useState(false);
  const [le, setLe] = React.useState(null);
  const [ee, setEe_1] = React.useState(0);
  const [ce, setCe] = React.useState(false);
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const QRef = React.useRef({
    playerHand: o,
    cpuHand: l,
    deck: b,
    discardPile: N,
    currentColor: z,
    currentPlayer: y,
    direction: _,
    gameOver: L,
    showColorPicker: W,
    phase: s,
    cpuTurnCounter: ee,
  });
  React.useEffect(() => {
    QRef.current = {
      playerHand: o,
      cpuHand: l,
      deck: b,
      discardPile: N,
      currentColor: z,
      currentPlayer: y,
      direction: _,
      gameOver: L,
      showColorPicker: W,
      phase: s,
      cpuTurnCounter: ee,
    };
  }, [o, l, b, N, z, y, _, L, W, s, ee]);
  const T = React.useCallback((t) => {
    setFe((a) => [t, ...a].slice(0, 6));
  }, []);
  const C = React.useCallback((t, a) => {
    setMood(t);
    setMessage(a);
    setTimeout(() => setMessage(""), 2000);
  }, []);
  const O = React.useCallback((newDeck, newDiscard) => {
    if (newDeck.length > 0) {
      return {
        newDeck,
        newDiscard,
      };
    }
    if (newDiscard.length <= 1) {
      return {
        newDeck,
        newDiscard,
      };
    }
    const f = newDiscard[newDiscard.length - 1];
    const p = newDiscard.slice(0, -1);
    return {
      newDeck: Oe(p),
      newDiscard: [f],
    };
  }, []);
  const ze = React.useCallback(
    (t) => {
      let a;
      if (t) {
        a = a_1(t);
      } else {
        a = a_1();
      }
      if (a.length === 0) {
        C("sad", "No hay palabras!");
        return;
      }
      const f = a
        .filter((p) => p.espanol && p.chino)
        .map((p) => ({
          es: p.espanol.trim(),
          zh: p.chino.trim(),
        }));
      setG(f);
      setM(t);
      setS("playing");
      setMood("neutral");
      setFe([]);
      setNe(new Set());
      setRe(0);
      setZe(0);
      setEe(0);
      setL_1(false);
      setAe(null);
    },
    [C],
  );
  const xe = React.useCallback(() => {
    const t = it(g);
    const a = [];
    const f = [];
    const p = [...t];
    for (let c = 0; c < 7; c++) {
      if (p.length > 0) {
        a.push(p.pop());
      }
      if (p.length > 0) {
        f.push(p.pop());
      }
    }
    let r = p.pop();
    while (r && r.color === "wild") {
      p.unshift(r);
      r = p.pop();
    }
    const P = r ? r.color : "red";
    setO(a);
    setL(f);
    setB(p);
    setN(r ? [r] : []);
    setZ(P);
    setY(0);
    set_(1);
    setL_1(false);
    setAe(null);
    setJe(0);
    setW(false);
    setWe(null);
    setA(false);
    setIe(false);
    setLe(null);
    setRe(0);
    setEe_1(0);
    setCe(true);
    setTimeout(() => setCe(false), 1500);
  }, [g]);
  React.useEffect(() => {
    if (s === "playing" && g.length > 0) {
      xe();
    }
  }, [s, g, xe]);
  React.useEffect(() => {
    if (s !== "playing" || L || y !== 1) {
      return;
    }
    const t = setTimeout(() => {
      const QRef_current = QRef.current;
      if (QRef_current.gameOver || QRef_current.currentPlayer !== 1 || QRef_current.phase !== "playing") {
        return;
      }
      const f = QRef_current.discardPile[QRef_current.discardPile.length - 1];
      if (!f) {
        return;
      }
      const p = QRef_current.cpuHand.filter((r) => q(r, f, QRef_current.currentColor));
      if (p.length > 0) {
        let r = p[0];
        const P = p.filter((d) => d.color !== "wild");
        if (P.length > 0) {
          const d = P.filter((v) => v.type === "number");
          if (d.length > 0) {
            r = d[Math.floor(Math.random() * d.length)];
          } else {
            r = P[Math.floor(Math.random() * P.length)];
          }
        }
        let c = "red";
        if (r.color === "wild") {
          const d = {
            red: 0,
            green: 0,
            blue: 0,
            yellow: 0,
          };
          for (const M of QRef_current.cpuHand) {
            if (M.color !== "wild") {
              d[M.color] = (d[M.color] || 0) + 1;
            }
          }
          let v = 0;
          for (const M of ["red", "green", "blue", "yellow"]) {
            if (d[M] > v) {
              v = d[M];
              c = M;
            }
          }
        }
        setL((d) => d.filter((v) => v.id !== r.id));
        setN((d) => [...d, r]);
        if (r.word) {
          setNe((d) => {
            const v = new Set(d);
            v.add(`${r.word}|${r.translation}`);
            return v;
          });
          setLe({
            es: r.word,
            zh: r.translation || "",
          });
          setIe(true);
          setTimeout(() => setIe(false), 2000);
        }
        playCorrect();
        C("sad", `CPU jugó ${be[r.color === "wild" ? c : r.color]}`);
        let S = r.color === "wild" ? c : r.color;
        let k = false;
        if (r.type === "skip") {
          k = true;
        } else if (r.type === "reverse") {
          set_((d) => -d);
          k = true;
        } else if (r.type === "draw2") {
          const { newDeck, newDiscard } = O(QRef_current.deck, QRef_current.discardPile);
          const M = newDeck.slice(-2);
          const pe = newDeck.slice(0, -2);
          setO((fe) => [...fe, ...M]);
          setB(pe);
          if (newDiscard !== QRef_current.discardPile) {
            setN(newDiscard);
          }
          setJe(2);
          setTimeout(() => setJe(0), 1000);
          k = true;
        } else if (r.type === "wild4") {
          const { newDeck, newDiscard } = O(QRef_current.deck, QRef_current.discardPile);
          const M = newDeck.slice(-4);
          const pe = newDeck.slice(0, -4);
          setO((fe) => [...fe, ...M]);
          setB(pe);
          if (newDiscard !== QRef_current.discardPile) {
            setN(newDiscard);
          }
          setJe(4);
          setTimeout(() => setJe(0), 1000);
          k = true;
        }
        setZ(S);
        if (QRef_current.cpuHand.filter((d) => d.id !== r.id).length === 0) {
          setL_1(true);
          setAe(1);
          setS("gameover");
          playLose();
          C("sad", "CPU gana...");
          setEe(100);
          T("CPU gana la partida");
          return;
        }
        setRe((d) => d + 1);
        if (k) {
          T("CPU: ¡Salto! Juega otra vez");
          setEe_1((d) => d + 1);
        } else {
          setY(0);
          T("Tu turno");
          C("neutral", "Tu turno!");
        }
      } else {
        const { newDeck, newDiscard } = O(QRef_current.deck, QRef_current.discardPile);
        if (newDeck.length > 0) {
          const c = newDeck[newDeck.length - 1];
          const S = newDeck.slice(0, -1);
          setL((k) => [...k, c]);
          setB(S);
          if (newDiscard !== QRef_current.discardPile) {
            setN(newDiscard);
          }
          setA(true);
          setTimeout(() => setA(false), 500);
          if (q(c, f, QRef_current.currentColor)) {
            setTimeout(() => {
              setEe_1((k) => k + 1);
            }, 800);
            T("CPU roba y juega");
          } else {
            setTimeout(() => {
              setY(0);
              T("CPU pasa turno");
              C("neutral", "Tu turno!");
            }, 800);
            setRe((k) => k + 1);
          }
        } else {
          setY(0);
          T("CPU pasa turno (sin cartas)");
          C("neutral", "Tu turno!");
          setRe((c) => c + 1);
        }
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [y, s, L, T, C, playCorrect, playLose, O, ee]);
  const Xe = (t) => {
    if (L || y !== 0 || A || W) {
      return;
    }
    const QRef_current = QRef.current;
    const f = QRef_current.discardPile[QRef_current.discardPile.length - 1];
    if (f) {
      if (!q(t, f, QRef_current.currentColor)) {
        playWrong();
        C("sad", "No válido!");
        return;
      }
      if (t.color === "wild") {
        setWe(t);
        setW(true);
        return;
      }
      Te(t, t.color);
    }
  };
  const Te = (t, a) => {
    const QRef_current = QRef.current;
    setO((c) => c.filter((S) => S.id !== t.id));
    setN((c) => [...c, t]);
    if (t.word) {
      setNe((c) => {
        const S = new Set(c);
        S.add(`${t.word}|${t.translation}`);
        return S;
      });
      setLe({
        es: t.word,
        zh: t.translation || "",
      });
      setIe(true);
      setTimeout(() => setIe(false), 2000);
    }
    playCorrect();
    C("happy", "¡Bien!");
    let p = t.color === "wild" ? a : t.color;
    let r = false;
    if (t.type === "skip") {
      r = true;
    } else if (t.type === "reverse") {
      set_((c) => -c);
      r = true;
    } else if (t.type === "draw2") {
      const { newDeck, newDiscard } = O(QRef_current.deck, QRef_current.discardPile);
      const k = newDeck.slice(-2);
      const se = newDeck.slice(0, -2);
      setL((d) => [...d, ...k]);
      setB(se);
      if (newDiscard !== QRef_current.discardPile) {
        setN(newDiscard);
      }
      setJe(2);
      setTimeout(() => setJe(0), 1000);
      r = true;
    } else if (t.type === "wild4") {
      const { newDeck, newDiscard } = O(QRef_current.deck, QRef_current.discardPile);
      const k = newDeck.slice(-4);
      const se = newDeck.slice(0, -4);
      setL((d) => [...d, ...k]);
      setB(se);
      if (newDiscard !== QRef_current.discardPile) {
        setN(newDiscard);
      }
      setJe(4);
      setTimeout(() => setJe(0), 1000);
      r = true;
    }
    setZ(p);
    if (QRef_current.playerHand.filter((c) => c.id !== t.id).length === 0) {
      setL_1(true);
      setAe(0);
      setS("gameover");
      playWin();
      C("super", "¡Ganaste!");
      setZe(100);
      T("¡Ganaste la partida!");
      return;
    }
    setRe((c) => c + 1);
    if (r) {
      T("¡Salto! Tu turno otra vez");
      C("excited", "¡Otra vez!");
    } else {
      setY(1);
      T("CPU piensa...");
    }
  };
  const Ve = () => {
    if (L || y !== 0 || A || W) {
      return;
    }
    const QRef_current = QRef.current;
    const { newDeck, newDiscard } = O(QRef_current.deck, QRef_current.discardPile);
    if (newDeck.length === 0) {
      T("Mazo vacío");
      setY(1);
      setRe((c) => c + 1);
      return;
    }
    const p = newDeck[newDeck.length - 1];
    const r = newDeck.slice(0, -1);
    setO((c) => [...c, p]);
    setB(r);
    if (newDiscard !== QRef_current.discardPile) {
      setN(newDiscard);
    }
    setA(true);
    setTimeout(() => setA(false), 500);
    const P = QRef_current.discardPile[QRef_current.discardPile.length - 1];
    if (P && q(p, P, QRef_current.currentColor)) {
      C("happy", "¡Puedes jugar!");
    } else {
      setTimeout(() => {
        setY(1);
        T("Pasas turno");
        C("neutral", "CPU turno");
        setRe((c) => c + 1);
      }, 600);
    }
  };
  const onPick = (t) => {
    if (!we) {
      return;
    }
    setW(false);
    const a = we;
    setWe(null);
    Te(a, t);
  };
  const onCancel = () => {
    setW(false);
    setWe(null);
  };
  const Me = () => {
    playClick();
    xe();
  };
  const Je = () => {
    playClick();
    setS("select");
  };
  const Ke = g_1();
  const F = N[N.length - 1];
  if (s === "select") {
    return (
      <>
        <SelectorTemaJuego juego="uno" onIniciar={(id) => { playClick(); ze(id); }} />
      </>
    );
  }
  if (s === "gameover") {
    const gano = ae === 0;
    const palabras = Ne.size;
    return (
      <Escena3D tema="uno" suelo={false}>
        <CintaTemaJuego />
        <BarraJuego titulo="UNO" tituloZh="UNO 卡牌" />
        <Resultado3D
          gano={gano}
          sello="牌"
          estrellas={gano ? (re <= 20 ? 3 : 2) : palabras >= 5 ? 1 : 0}
          titulo={gano ? "¡Victoria!" : "Derrota…"}
          tituloZh={gano ? "胜利 · 完成" : "再试一次"}
          datos={[
            { etiqueta: "Turnos · 回合", valor: re, tono: "tinta" },
            { etiqueta: "Palabras · 单词", valor: palabras, tono: "jade" },
            { etiqueta: "Puntos · 得分", valor: gano ? Ze : Ee, tono: "rojo" },
          ]}
          acciones={
            <>
              <Boton3D tono="oro" onClick={Me}>
                <RotateCcwIcon size={18} /> Reintentar · 重试
              </Boton3D>
              <Boton3D tono="rojo" onClick={Je}>
                <LayersIcon size={18} /> Otra unidad · 其他单元
              </Boton3D>
            </>
          }
        >
          {palabras > 0 && (
            <div className="uno-aprendidas">
              <p>Palabras aprendidas · 学到的单词</p>
              <div>
                {Array.from(Ne).map((par) => {
                  const [es, zh] = par.split("|");
                  return (
                    <span key={par}>
                      <b>{es}</b> {zh}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </Resultado3D>
        <P currentGameId="uno" />
      </Escena3D>
    );
  }
  const miTurno = y === 0;
  const puedoRobar = miTurno && !A && !W;
  // Abanico de la mano: cuanto más cartas, más se solapan (el ancho útil lo da --uno-ancho en CSS)
  const totalMano = o.length;
  const descartes = N.slice(-4, -1);
  return (
    <Escena3D tema="uno" suelo={false} className={`uno uno--${z}`}>
      <CintaTemaJuego />
      <CtComponent mood={mood} message={message} />
      {W && <DtComponent onPick={onPick} onCancel={onCancel} />}
      <BarraJuego titulo="UNO" tituloZh="UNO 卡牌">
        <Placa icono={<span className={`uno-gema uno-gema--${z}`} />} valor={be[z]} etiqueta="Color · 颜色" tono="tinta" />
        <Placa icono={<ZapIcon size={16} />} valor={re} etiqueta="Turno · 回合" />
        <button type="button" className="uno-accion" onClick={Je} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
        <button type="button" className="uno-accion" onClick={Me} title="Reiniciar · 重置" aria-label="Reiniciar · 重置">
          <RotateCcwIcon size={18} />
        </button>
      </BarraJuego>

      <div className="uno-sala">
        <div className="uno-rival">
          <span className={`uno-jugador ${!miTurno ? "uno-jugador--activo" : ""}`}>
            <BotIcon size={16} /> CPU · 电脑 <b>{l.length}</b>
          </span>
          <div className="uno-rival__mano" style={{ "--n": l.length }}>
            {l.map((carta, n) => (
              <div key={carta.id} className="uno-rival__carta" style={{ "--i": n }}>
                <Ge1Component card={carta} isHidden size="small" />
              </div>
            ))}
          </div>
        </div>

        <div className="uno-mesa">
          <div className="uno-tapete" aria-hidden="true">
            <span className="uno-tapete__anillo" />
            <span className="uno-tapete__sello" translate="no">牌</span>
          </div>
          <div className="uno-centro">
            <button type="button" className={`uno-mazo ${puedoRobar ? "uno-mazo--activo" : ""}`} onClick={Ve} disabled={!puedoRobar} aria-label={`Robar carta · 抽牌 (${b.length})`}>
              <span className="uno-mazo__pila">
                <Ge1Component card={{ color: "wild", type: "wild" }} isHidden size="large" />
              </span>
              <b className="uno-mazo__cuenta">{b.length}</b>
              {je > 0 && <b className="uno-mazo__mas">+{je}</b>}
              <i>Robar · 抽牌</i>
            </button>
            <div className="uno-descarte">
              {descartes.map((carta, n) => (
                <div key={carta.id} className="uno-descarte__vieja" style={{ "--giro": `${((carta.id * 37) % 40) - 20}deg`, "--i": n }}>
                  <Ge1Component card={carta} size="large" />
                </div>
              ))}
              {F && (
                <div key={F.id} className="uno-descarte__cima" style={{ "--giro": `${((F.id * 37) % 14) - 7}deg` }}>
                  <Ge1Component card={F} size="large" showWord />
                </div>
              )}
              <i>{lt[z]}</i>
            </div>
          </div>
          {Ie && le && (
            <div className="uno-palabra" role="status">
              <b>{le.es}</b>
              <i>{le.zh}</i>
            </div>
          )}
        </div>

        <p className={`uno-turno ${miTurno ? "uno-turno--mio" : ""}`} aria-live="polite">
          {miTurno ? "Tu turno · 你的回合" : "Juega la CPU… · 电脑出牌"}
          <span>
            <ClockIcon size={12} /> {Fe[0] || "¡Comienza el juego!"}
          </span>
        </p>

        <div className="uno-mano" style={{ "--n": totalMano }}>
          {o.map((carta, n) => {
            const jugable = F ? q(carta, F, z) : false;
            const centro = (totalMano - 1) / 2;
            return (
              <div key={carta.id} className="uno-mano__hueco" style={{ "--i": n, "--d": totalMano > 1 ? (n - centro) / Math.max(1, centro) : 0 }}>
                <Ge1Component card={carta} isPlayable={jugable && miTurno && !W} onClick={() => Xe(carta)} size="medium" dealing={ce} />
              </div>
            );
          })}
        </div>
        <p className="uno-ayuda">
          <UserIcon size={13} /> Tú · 你 <b>{totalMano}</b> — mismo color o mismo número · 相同颜色或数字
        </p>
      </div>
    </Escena3D>
  );
}
export { HtComponent as default };
