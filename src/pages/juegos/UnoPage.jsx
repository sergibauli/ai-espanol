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
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { a as a_1, g as g_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const B = {
  red: "#ff3860",
  green: "#39ff14",
  blue: "#00d4ff",
  yellow: "#ffd600",
  wild: "#333333",
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
  red: "rgba(255,56,96,0.85)",
  green: "rgba(57,255,20,0.85)",
  blue: "rgba(0,212,255,0.85)",
  yellow: "rgba(255,214,0,0.85)",
  wild: "rgba(180,180,180,0.6)",
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
      ? "rgba(255,105,180,0.7)"
      : "rgba(255,105,180,0.15)";
  const b =
    mood === "happy"
      ? "#46ff9a"
      : mood === "sad"
        ? "#ff4444"
        : mood === "excited" || mood === "super"
          ? "#ffd600"
          : "#00d4ff";
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
          <circle cx="16" cy="22" r="3" fill="#1a1a2e" />
          <circle cx="32" cy="22" r="3" fill="#1a1a2e" />
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
                fill="#ffd600"
                style={{
                  animation: "sparkle 0.5s ease-in-out infinite",
                }}
              />
              <circle
                cx="44"
                cy="8"
                r="1"
                fill="#ff00aa"
                style={{
                  animation: "sparkle 0.7s ease-in-out infinite 0.2s",
                }}
              />
              <circle
                cx="42"
                cy="38"
                r="1.5"
                fill="#00d4ff"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
              <circle
                cx="2"
                cy="30"
                r="1"
                fill="#39ff14"
                style={{
                  animation: "sparkle 0.8s ease-in-out infinite 0.1s",
                }}
              />
            </>
          ) : null}
          {o && (
            <>
              <circle cx="11" cy="26" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="26" to="36" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="37" cy="26" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="26" to="36" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="unoBlobGrad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#ffd600" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#ff00aa" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
function Ge1Component({
  card,
  onClick,
  isPlayable,
  isHidden,
  size = "medium",
  showWord = false,
  dealing = false,
}) {
  const [h, setH] = React.useState(false);
  const i = B[card.color];
  const l = R[card.color];
  const j = size === "small" ? "w-14" : size === "large" ? "w-28" : "w-20";
  const N = size === "small" ? "h-20" : size === "large" ? "h-40" : "h-28";
  if (isHidden) {
    return (
      <div
        className={`gm-uno-back relative rounded-2xl cursor-pointer ${j} ${N}`}
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #0d0d1a)",
          border: "2px solid rgba(255,255,255,0.15)",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px rgba(123,97,255,0.15)",
          transform: h
            ? "translateY(-6px) scale(1.08) rotateY(-8deg)"
            : "translateY(0) scale(1) rotateY(0deg)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          perspective: "800px",
        }}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        onClick={onClick}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, rgba(123,97,255,0.2) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
            style={{
              border: "1px solid rgba(0,212,255,0.25)",
              animation: "cardBorderPulse 3s ease-in-out infinite",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xl font-black"
            style={{
              color: "rgba(255,255,255,0.15)",
              textShadow: "0 0 15px rgba(123,97,255,0.4), 0 0 30px rgba(0,212,255,0.2)",
            }}
          >
            UNO
          </span>
        </div>
      </div>
    );
  }
  const w = () => {
    if (card.type === "number") {
      return String(card.value);
    }
    if (card.type === "skip") {
      return "⊘";
    }
    if (card.type === "reverse") {
      return "⇄";
    }
    if (card.type === "draw2") {
      return "+2";
    }
    if (card.type === "wild") {
      return "★";
    }
    if (card.type === "wild4") {
      return "+4";
    }
    return "";
  };
  const background =
    card.color === "wild"
      ? "linear-gradient(135deg, #1a1a1a, #2a2a2a, #1a1a1a)"
      : `linear-gradient(135deg, ${i}33, ${i}18, ${i}08)`;
  const I = isPlayable ? l : `${i}50`;
  const boxShadow = isPlayable
    ? `0 0 30px ${l}, 0 0 60px ${l}30, 0 0 100px ${l}15, 0 12px 35px rgba(0,0,0,0.6)`
    : "0 8px 25px rgba(0,0,0,0.5), 0 0 15px rgba(0,0,0,0.3)";
  const D = size === "small" ? "32px" : size === "large" ? "64px" : "48px";
  const _ = size === "small" ? "16px" : size === "large" ? "32px" : "24px";
  const Z = size === "small" ? "12px" : size === "large" ? "18px" : "14px";
  const transform = h
    ? "translateY(-14px) scale(1.15) rotateX(10deg) rotateY(-15deg)"
    : "translateY(0) scale(1) rotateX(0deg) rotateY(0deg)";
  const E = isPlayable && !h ? "floatCard 2.5s ease-in-out infinite" : "none";
  const ae = dealing ? "dealDrop 0.6s ease-out forwards" : "none";
  return (
    <div
      className={`gm-uno-card relative rounded-2xl cursor-pointer overflow-hidden ${j} ${N}`}
      style={{
        background,
        border: `3px solid ${I}`,
        boxShadow,
        transform,
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        perspective: "800px",
        animation: `${E}, ${ae}`,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
        style={{
          animation: "shineSweep 4s ease-in-out infinite",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 55%, transparent 60%)",
            transform: "translateX(-100%)",
            animation: "shineSweep 4s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className="absolute top-1.5 left-2 font-black"
        style={{
          fontSize: Z,
          color: i,
          textShadow: `0 0 8px ${l}, 0 0 16px ${l}80`,
        }}
      >
        {w()}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: D,
            height: D,
            background:
              card.color === "wild"
                ? "linear-gradient(135deg, #ff3860, #ffd600, #39ff14, #00d4ff)"
                : `${i}40`,
            boxShadow: `0 0 25px ${l}, inset 0 0 15px ${l}30`,
            border: `3px solid ${i}`,
            transform: "rotate(-12deg)",
          }}
        >
          <span
            className="font-black"
            style={{
              fontSize: _,
              color: i,
              textShadow: `0 0 12px ${l}, 0 0 24px ${l}60`,
              transform: "rotate(12deg)",
            }}
          >
            {w()}
          </span>
        </div>
      </div>
      <div
        className="absolute bottom-1.5 right-2 font-black"
        style={{
          fontSize: Z,
          color: i,
          textShadow: `0 0 8px ${l}, 0 0 16px ${l}80`,
          transform: "rotate(180deg)",
        }}
      >
        {w()}
      </div>
      {showWord && card.word && (
        <div className="absolute bottom-5 left-0 right-0 text-center px-1">
          <p
            className="text-[9px] font-bold leading-tight"
            style={{
              color: i,
              textShadow: `0 0 6px ${l}, 0 0 12px ${l}60`,
            }}
          >
            {card.word}
          </p>
          <p
            className="text-[8px] font-medium leading-tight"
            style={{
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {card.translation}
          </p>
        </div>
      )}
      {isPlayable && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${l}50, inset 0 0 60px ${l}20`,
            animation: "matchRingPulse 1.5s ease-in-out infinite",
          }}
        />
      )}
      {isPlayable && (
        <div
          className="absolute inset-[-2px] rounded-[14px] pointer-events-none"
          style={{
            border: `2px solid ${l}`,
            opacity: 0.6,
            animation: "cardNeonPulse 1.5s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
function DtComponent({ onPick, onCancel }) {
  const m = ["red", "green", "blue", "yellow"];
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "rgba(3,4,17,0.85)",
        backdropFilter: "blur(15px)",
      }}
    >
      <div
        className="p-6 rounded-3xl max-w-sm mx-4 w-full text-center"
        style={{
          background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 60px rgba(0,0,0,0.5)",
        }}
      >
        <h2 className="text-2xl font-black mb-1 text-white">Elige un color</h2>
        <p className="text-white/50 text-sm mb-6">选择颜色</p>
        <div className="grid grid-cols-2 gap-3">
          {m.map((u) => (
            <button
              key={u}
              onClick={() => onPick(u)}
              className="p-4 rounded-xl font-black text-sm transition-all hover:scale-110"
              style={{
                background: `${B[u]}20`,
                border: `3px solid ${B[u]}`,
                color: B[u],
                boxShadow: `0 0 30px ${R[u]}, 0 0 60px ${R[u]}40`,
                textShadow: `0 0 12px ${R[u]}, 0 0 24px ${R[u]}60`,
              }}
            >
              {be[u]}
            </button>
          ))}
        </div>
        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 rounded-full text-xs font-bold text-white/50 hover:text-white transition-colors"
        >
          Cancelar / 取消
        </button>
      </div>
    </div>
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
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
              style={{
                background: "linear-gradient(135deg,#ff3860,#ffd600)",
                boxShadow: "0 0 80px rgba(255,56,96,0.5), 0 0 160px rgba(255,214,0,0.3)",
                animation: "unoFloat 3s ease-in-out infinite",
              }}
            >
              <ZapIcon
                size={48}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,0.6))",
                }}
              />
              <div
                className="absolute -top-2 -right-2"
                style={{
                  animation: "sparkle 2s ease-in-out infinite",
                }}
              >
                <StarIcon
                  size={20}
                  style={{
                    color: "#ffd600",
                    fill: "#ffd600",
                  }}
                />
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#ff3860 0%,#ffd600 50%,#39ff14 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 50px rgba(255,56,96,.4))",
                animation: "unoTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              UNO
            </h1>
            <p className="text-white/50 text-lg font-medium">
              El clásico juego de cartas en español / 西班牙语UNO卡牌游戏
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                ze(null);
              }}
              className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "perspective(600px) translateZ(10px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(255,0,170,0), rgba(255,0,170), rgba(255,0,170,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 2s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  transform: "translateZ(20px)",
                  boxShadow: "0 0 20px rgba(255,0,170,0.4)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3
                className="text-white font-black text-base mb-1"
                style={{
                  transform: "translateZ(15px)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                  transform: "translateZ(10px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40"
                style={{
                  transform: "translateZ(5px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
            </button>
            {Ke.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  ze(t.id);
                }}
                className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
                  border: `1px solid ${t.color}40`,
                  transform: "perspective(600px) translateZ(10px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, ${t.color}00, ${t.color}, ${t.color}00)`,
                    backgroundSize: "200% 100%",
                    animation: "borderRotate 2s linear infinite",
                    zIndex: -1,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    transform: "translateZ(20px)",
                    boxShadow: `0 0 20px ${t.color}60`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3
                  className="text-white font-black text-base mb-1"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  {t.titulo}
                </h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${t.color}aa`,
                    transform: "translateZ(10px)",
                  }}
                >
                  {t.tituloChino}
                </p>
                <p
                  className="text-xs font-medium text-white/40"
                  style={{
                    transform: "translateZ(5px)",
                  }}
                >
                  {t.vocabularioCount} palabras / 词
                </p>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white/40"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ZapIcon size={12} /> 108 cartas • 2 jugadores • 4 colores
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "@keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} } @keyframes unoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} } @keyframes unoTitlePulse { from{filter:drop-shadow(0 0 50px rgba(255,56,96,.4)) brightness(1)} to{filter:drop-shadow(0 0 100px rgba(255,56,96,.6)) brightness(1.2)} } @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }",
            }}
          />
        </div>
      </StarfieldBackground>
    );
  }
  if (s === "gameover") {
    const t = ae === 0;
    const a = Ne.size;
    return (
      <StarfieldBackground>
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "rgba(3,4,17,.85)",
            backdropFilter: "blur(20px)",
            perspective: "1000px",
          }}
        >
          <div
            className="text-center p-8 rounded-3xl max-w-md mx-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
              border: `2px solid ${t ? "rgba(57,255,20,.3)" : "rgba(255,56,96,.3)"}`,
              boxShadow: `0 0 60px ${t ? "rgba(57,255,20,.2)" : "rgba(255,56,96,.2)"}, 0 0 120px ${t ? "rgba(57,255,20,.1)" : "rgba(255,56,96,.1)"}`,
              transform: "translateZ(50px)",
              animation: "victoryBounce 1s ease-out",
            }}
          >
            <div
              className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
              style={{
                background: t
                  ? "linear-gradient(135deg, #39ff14, #00d4ff)"
                  : "linear-gradient(135deg, #ff3860, #ff6b35)",
                filter: "blur(25px)",
                animation: "victoryGlow 2s ease-in-out infinite alternate",
              }}
            />
            <TrophyIcon
              size={56}
              style={{
                color: t ? "#39ff14" : "#ff3860",
                margin: "0 auto 16px",
                filter: `drop-shadow(0 0 15px ${t ? "rgba(57,255,20,.5)" : "rgba(255,56,96,.5)"})`,
                animation: "trophySpin 3s ease-in-out infinite",
              }}
            />
            <h2
              className="text-4xl font-black mb-2"
              style={{
                background: t
                  ? "linear-gradient(135deg, #39ff14, #00d4ff)"
                  : "linear-gradient(135deg, #ff3860, #ff6b35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: `drop-shadow(0 0 20px ${t ? "rgba(57,255,20,.3)" : "rgba(255,56,96,.3)"})`,
              }}
            >
              {t ? "¡Victoria!" : "Derrota..."}
            </h2>
            <p className="text-white/50 text-sm mb-4">
              {t ? "完成！" : "再试一次"} • {re} turnos
            </p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div
                className="p-3 rounded-xl"
                style={{
                  background: "rgba(0,212,255,.1)",
                  border: "1px solid rgba(0,212,255,.15)",
                  boxShadow: "0 0 10px rgba(0,212,255,.1)",
                }}
              >
                <ZapIcon
                  size={16}
                  style={{
                    color: "#00d4ff",
                    margin: "0 auto 4px",
                  }}
                />
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(207,216,255,.5)",
                  }}
                >
                  Turnos
                </p>
                <p
                  className="text-lg font-black"
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 10px rgba(0,212,255,.3)",
                  }}
                >
                  {re}
                </p>
              </div>
              <div
                className="p-3 rounded-xl"
                style={{
                  background: "rgba(57,255,20,.1)",
                  border: "1px solid rgba(57,255,20,.15)",
                  boxShadow: "0 0 10px rgba(57,255,20,.1)",
                }}
              >
                <StarIcon
                  size={16}
                  style={{
                    color: "#39ff14",
                    margin: "0 auto 4px",
                  }}
                />
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(207,216,255,.5)",
                  }}
                >
                  Palabras
                </p>
                <p
                  className="text-lg font-black"
                  style={{
                    color: "#39ff14",
                    textShadow: "0 0 10px rgba(57,255,20,.3)",
                  }}
                >
                  {a}
                </p>
              </div>
              <div
                className="p-3 rounded-xl"
                style={{
                  background: "rgba(255,214,0,.1)",
                  border: "1px solid rgba(255,214,0,.15)",
                  boxShadow: "0 0 10px rgba(255,214,0,.1)",
                }}
              >
                <TrophyIcon
                  size={16}
                  style={{
                    color: "#ffd600",
                    margin: "0 auto 4px",
                  }}
                />
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(207,216,255,.5)",
                  }}
                >
                  Puntos
                </p>
                <p
                  className="text-lg font-black"
                  style={{
                    color: "#ffd600",
                    textShadow: "0 0 10px rgba(255,214,0,.3)",
                  }}
                >
                  {t ? Ze : Ee}
                </p>
              </div>
            </div>
            {a > 0 && (
              <div
                className="mb-4 p-3 rounded-xl max-h-40 overflow-y-auto"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <p className="text-xs font-bold text-white/50 mb-2">Palabras aprendidas / 学到的单词</p>
                <div className="flex flex-wrap gap-1">
                  {Array.from(Ne).map((f, key) => {
                    const r = f.split("|");
                    return (
                      <span
                        key={key}
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{
                          background: "rgba(0,212,255,.15)",
                          color: "#00d4ff",
                          border: "1px solid rgba(0,212,255,.2)",
                        }}
                      >
                        {r[0]} = {r[1]}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="flex gap-3 justify-center mb-4">
              <button
                onClick={Me}
                className="px-6 py-3 rounded-full text-white font-black transition-all hover:scale-105 text-sm"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                  boxShadow: "0 0 25px rgba(255,214,0,.3)",
                }}
              >
                <RotateCcwIcon size={14} className="inline mr-1" /> Reintentar / 重试
              </button>
            </div>
            <P currentGameId="uno" />
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "@keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} } @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} } @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(20deg)} }",
          }}
        />
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="max-w-6xl mx-auto px-4 py-4 min-h-screen relative z-10">
        <CtComponent mood={mood} message={message} />
        {Ie && le && (
          <div
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] px-6 py-3 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(14,22,64,.9), rgba(5,8,27,.9))",
              border: "2px solid rgba(0,212,255,.4)",
              boxShadow: "0 0 40px rgba(0,212,255,.3)",
              animation: "wordPopupIn 0.5s ease-out forwards",
            }}
          >
            <p
              className="text-xl font-black mb-1"
              style={{
                color: "#00d4ff",
                textShadow: "0 0 15px rgba(0,212,255,.5)",
              }}
            >
              {le.es}
            </p>
            <p
              className="text-sm font-bold"
              style={{
                color: "#ffd600",
              }}
            >
              {le.zh}
            </p>
          </div>
        )}
        {W && <DtComponent onPick={onPick} onCancel={onCancel} />}
        <div className="flex items-center justify-between mb-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex gap-2">
            <button
              onClick={Je}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar módulo / 切换模块
            </button>
            <button
              onClick={Me}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <RotateCcwIcon size={12} /> Reiniciar / 重置
            </button>
          </div>
        </div>
        <div className="text-center mb-2">
          <h1
            className="text-3xl md:text-4xl font-black mb-1"
            style={{
              background: "linear-gradient(135deg,#ff3860,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(255,56,96,.4))",
            }}
          >
            UNO
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold">
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,212,255,.1)",
                color: "#00d4ff",
                border: "1px solid rgba(0,212,255,.2)",
                textShadow: "0 0 8px rgba(0,212,255,.4)",
              }}
            >
              Color: {be[z]}
            </span>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,214,0,.1)",
                color: "#ffd600",
                border: "1px solid rgba(255,214,0,.2)",
                textShadow: "0 0 8px rgba(255,214,0,.4)",
              }}
            >
              Turno {re}
            </span>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                background: y === 0 ? "rgba(57,255,20,.1)" : "rgba(255,56,96,.1)",
                color: y === 0 ? "#39ff14" : "#ff3860",
                border: `1px solid ${y === 0 ? "rgba(57,255,20,.2)" : "rgba(255,56,96,.2)"}`,
                textShadow: `0 0 8px ${y === 0 ? "rgba(57,255,20,.4)" : "rgba(255,56,96,.4)"}`,
              }}
            >
              {y === 0 ? "Tu turno / 你的回合" : "CPU / 电脑"}
            </span>
          </div>
        </div>
        <div className="max-w-md mx-auto mb-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white/40 justify-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 10px rgba(0,212,255,0.05)",
            }}
          >
            <ClockIcon size={10} /> {Fe[0] || "¡Comienza el juego!"}
          </div>
        </div>
        <div className="gm-uno-table">
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BotIcon
              size={14}
              style={{
                color: "#ff3860",
                filter: "drop-shadow(0 0 5px rgba(255,56,96,0.5))",
              }}
            />
            <span className="text-xs font-bold text-white/60">CPU</span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(255,56,96,.15)",
                color: "#ff3860",
                border: "1px solid rgba(255,56,96,.3)",
                textShadow: "0 0 6px rgba(255,56,96,0.4)",
              }}
            >
              {l.length} cartas
            </span>
          </div>
          <div className="flex gap-1 justify-center flex-wrap">
            {l.map((t, a) => (
              <div
                key={t.id}
                style={{
                  marginLeft: a > 0 ? "-20px" : "0",
                  zIndex: a,
                  animation: ce ? `dealDrop ${0.3 + a * 0.1}s ease-out forwards` : "none",
                }}
              >
                <Ge1Component card={t} isHidden size="small" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 mb-6 relative">
          <div className="relative">
            <div
              className="cursor-pointer relative"
              onClick={Ve}
              style={{
                opacity: y === 0 && !A && !W ? 1 : 0.5,
                pointerEvents: y === 0 && !A && !W ? "auto" : "none",
              }}
            >
              <div
                className="w-20 h-28 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e, #0d0d1a)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  boxShadow:
                    "0 0 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px rgba(123,97,255,0.2)",
                  animation: "floatCard 3s ease-in-out infinite",
                }}
              >
                <span
                  className="text-sm font-black text-white/25"
                  style={{
                    textShadow: "0 0 15px rgba(123,97,255,0.4)",
                  }}
                >
                  UNO
                </span>
                <div
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[9px] font-black"
                  style={{
                    background: "rgba(0,212,255,.25)",
                    color: "#00d4ff",
                    border: "1px solid rgba(0,212,255,.4)",
                    textShadow: "0 0 6px rgba(0,212,255,0.5)",
                    boxShadow: "0 0 10px rgba(0,212,255,0.2)",
                  }}
                >
                  {b.length}
                </div>
                {A && (
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      animation: "drawPulse 0.5s ease-in-out",
                      background: "radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)",
                    }}
                  />
                )}
                {je > 0 && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 font-black text-xl"
                    style={{
                      color: "#ff3860",
                      textShadow: "0 0 15px rgba(255,56,96,0.7), 0 0 30px rgba(255,56,96,0.4)",
                      animation: "drawCountPop 0.8s ease-out forwards",
                    }}
                  >
                    +{je}
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-[10px] font-bold text-white/30 mt-1">Robar / 抽牌</p>
          </div>
          <div className="relative">
            {F && (
              <div
                className="relative"
                style={{
                  animation: ce ? "dealDrop 0.8s ease-out forwards" : "none",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `0 0 40px ${R[F.color]}40, 0 0 80px ${R[F.color]}20`,
                    animation: "matchRingPulse 2s ease-in-out infinite",
                  }}
                />
                <Ge1Component card={F} size="large" showWord />
                <div className="absolute -bottom-6 left-0 right-0 text-center">
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                    style={{
                      background: `${B[z]}25`,
                      color: B[z],
                      border: `1px solid ${B[z]}50`,
                      textShadow: `0 0 6px ${R[z]}`,
                    }}
                  >
                    {lt[z]}
                  </span>
                </div>
              </div>
            )}
            <p className="text-center text-[10px] font-bold text-white/30 mt-7">Descarte / 弃牌</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <UserIcon
              size={14}
              style={{
                color: "#39ff14",
                filter: "drop-shadow(0 0 5px rgba(57,255,20,0.5))",
              }}
            />
            <span className="text-xs font-bold text-white/60">Tú / 你</span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(57,255,20,.15)",
                color: "#39ff14",
                border: "1px solid rgba(57,255,20,.3)",
                textShadow: "0 0 6px rgba(57,255,20,0.4)",
              }}
            >
              {o.length} cartas
            </span>
          </div>
          <div className="flex gap-1 justify-center flex-wrap max-w-3xl">
            {o.map((t, a) => {
              const f = F ? q(t, F, z) : false;
              return (
                <div
                  key={t.id}
                  style={{
                    marginLeft: a > 0 ? "-28px" : "0",
                    zIndex: a,
                    transition: "margin 0.3s ease, z-index 0.3s ease",
                  }}
                  onMouseEnter={(p) => {
                    const p_currentTarget = p.currentTarget;
                    p_currentTarget.style.marginLeft = "6px";
                    p_currentTarget.style.zIndex = "100";
                  }}
                  onMouseLeave={(p) => {
                    const p_currentTarget = p.currentTarget;
                    p_currentTarget.style.marginLeft = a > 0 ? "-28px" : "0";
                    p_currentTarget.style.zIndex = String(a);
                  }}
                >
                  <Ge1Component
                    card={t}
                    isPlayable={f && y === 0 && !W}
                    onClick={() => Xe(t)}
                    size="medium"
                    dealing={ce}
                  />
                </div>
              );
            })}
          </div>
        </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-[10px] text-white/30 font-medium">
            Haz clic en una carta para jugarla. Mismo color o mismo número. / 点击卡牌出牌，相同颜色或数字
          </p>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes cardGlowPulse { 0%,100%{box-shadow:0 0 15px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.4)} 50%{box-shadow:0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.08), 0 8px 25px rgba(0,0,0,0.5)} }
          @keyframes matchRingPulse { 0%,100%{transform:scale(1); opacity:0.5} 50%{transform:scale(1.05); opacity:0.9} }
          @keyframes cardBorderPulse { 0%,100%{opacity:0.2} 50%{opacity:0.5} }
          @keyframes drawPulse { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
          @keyframes drawCountPop { 0%{transform:translate(-50%, 0) scale(1); opacity:1} 100%{transform:translate(-50%, -30px) scale(1.5); opacity:0} }
          @keyframes wordPopupIn { 0%{transform:translateX(-50%) translateY(-20px) scale(0.8); opacity:0} 100%{transform:translateX(-50%) translateY(0) scale(1); opacity:1} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
          @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
          @keyframes bubblePop { 0%{transform:translateY(10px) scale(0.8); opacity:0} 100%{transform:translateY(0) scale(1); opacity:1} }
          @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          @keyframes earWiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-5deg)} 75%{transform:rotate(5deg)} }
          @keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(20deg)} }
          @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes shineSweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes cardNeonPulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
          @keyframes dealDrop { 0%{transform:translateY(-60px) rotateX(45deg) scale(0.6); opacity:0} 60%{transform:translateY(5px) rotateX(0deg) scale(1.05); opacity:1} 100%{transform:translateY(0) rotateX(0deg) scale(1); opacity:1} }
        `,
          }}
        />
      </div>
    </StarfieldBackground>
  );
}
export { HtComponent as default };
