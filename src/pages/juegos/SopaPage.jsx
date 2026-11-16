import {
  SparklesIcon,
  StarIcon,
  LightbulbIcon,
  AwardIcon,
  TrophyIcon,
  BookOpenIcon,
  ZapIcon,
  ArrowLeftIcon,
  LayersIcon,
  FlameIcon,
  CrownIcon,
  RotateCcwIcon,
  EyeIcon,
  CheckIcon,
  TargetIcon,
  TimerIcon,
} from "lucide-react";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { Escena3D, BarraJuego, Placa, Boton3D, Resultado3D } from "../../components/juegos/Escena3D.jsx";
import "../../styles/v17-ruleta.css";
import "../../styles/v17-sopa.css";
import "../../styles/movil-juegos.css";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
const length_1 = 12;
const n = [
  "#f2c14e",
  "#e0283f",
  "#f2c14e",
  "#5fd08a",
  "#d99a22",
  "#a50f25",
  "#f2c14e",
  "#e0283f",
  "#f2c14e",
  "#d99a22",
  "#5fd08a",
  "#a50f25",
];
function nt(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function ot(a) {
  const r = Array.from(
    {
      length: length_1,
    },
    () => Array(length_1).fill(""),
  );
  const g = [
    [0, 1],
    [1, 0],
    [1, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  const p = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const d of a) {
    let y = false;
    let u = 0;
    while (!y && u < 200) {
      u++;
      const h = g[Math.floor(Math.random() * g.length)];
      const m = h[0] === 1 ? length_1 - d.word.length : h[0] === -1 ? d.word.length - 1 : length_1 - 1;
      const N = h[1] === 1 ? length_1 - d.word.length : h[1] === -1 ? d.word.length - 1 : length_1 - 1;
      const C = h[0] === -1 ? d.word.length - 1 : 0;
      const z = h[1] === -1 ? d.word.length - 1 : 0;
      const M = Math.floor(Math.random() * (m - C + 1)) + C;
      const P = Math.floor(Math.random() * (N - z + 1)) + z;
      let T = true;
      const D = [];
      for (let j = 0; j < d.word.length; j++) {
        const B = M + h[0] * j;
        const Y = P + h[1] * j;
        if (r[B][Y] !== "" && r[B][Y] !== d.word[j]) {
          T = false;
          break;
        }
        D.push([B, Y]);
      }
      if (T) {
        for (let j = 0; j < d.word.length; j++) {
          r[M + h[0] * j][P + h[1] * j] = d.word[j];
        }
        d.cells = D;
        y = true;
      }
    }
  }
  for (let d = 0; d < length_1; d++) {
    for (let y = 0; y < length_1; y++) {
      if (!r[d][y]) {
        r[d][y] = p[Math.floor(Math.random() * p.length)];
      }
    }
  }
  return r;
}
function lt() {
  const a = [
    "#e0283f",
    "#f2c14e",
    "#f2c14e",
    "#5fd08a",
    "#d99a22",
    "#a50f25",
    "#e0283f",
    "#a50f25",
    "#e0283f",
    "#f2c14e",
  ];
  const r = ["circle", "star", "square"];
  for (let g = 0; g < 200; g++) {
    const p = document.createElement("div");
    const d = 4 + Math.random() * 12;
    const y = r[Math.floor(Math.random() * r.length)];
    const u = a[Math.floor(Math.random() * a.length)];
    let h = "50%";
    if (y === "square") {
      h = "2px";
    }
    if (y === "star") {
      p.style.clipPath =
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
      h = "0";
    }
    p.style.cssText = `position:fixed;left:50%;top:50%;width:${d}px;height:${d}px;border-radius:${h};background:${u};pointer-events:none;z-index:9999;box-shadow:0 0 15px ${u}, 0 0 30px ${u}80;`;
    document.body.appendChild(p);
    const m = (Math.PI * 2 * g) / 200 + (Math.random() - 0.5) * 0.5;
    const N = 5 + Math.random() * 25;
    let C = window.innerWidth / 2;
    let z = window.innerHeight / 2;
    let M = 1;
    const P = Math.cos(m) * N;
    const T = Math.sin(m) * N;
    const D = Math.random() * 360;
    const j = (Math.random() - 0.5) * 25;
    let B = D;
    let Y = 0.2;
    const K = () => {
      C += P;
      z += T + Y;
      Y += 0.08;
      M -= 0.008;
      B += j;
      p.style.left = `${C}px`;
      p.style.top = `${z}px`;
      p.style.opacity = String(M);
      p.style.transform = `rotate(${B}deg) scale(${M > 0.5 ? 1 + (0.5 - M) * 2 : 1})`;
      if (M > 0) {
        requestAnimationFrame(K);
      } else {
        p.remove();
      }
    };
    requestAnimationFrame(K);
  }
}
function GeComponent() {
  const aRef = React.useRef([]);
  if (aRef.current.length === 0) {
    const r = [
      "#f2c14e",
      "#f2c14e",
      "#e0283f",
      "#5fd08a",
      "#a50f25",
      "#d99a22",
      "#f2c14e",
      "#5fd08a",
      "#a50f25",
    ];
    for (let id = 0; id < 60; id++) {
      aRef.current.push({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 10,
        speed: 5 + Math.random() * 15,
        opacity: 0.1 + Math.random() * 0.6,
        delay: Math.random() * 10,
        color: r[id % r.length],
        type: id % 4 === 0 ? "star" : id % 4 === 1 ? "circle" : id % 4 === 2 ? "diamond" : "hex",
      });
    }
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {aRef.current.map((r) => (
        <div
          key={r.id}
          className="absolute"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            animation: `magicFloat ${r.speed}s ease-in-out infinite ${r.delay}s`,
          }}
        >
          {r.type === "star" ? (
            <StarIcon
              size={r.size}
              style={{
                color: r.color,
                opacity: r.opacity,
                filter: `drop-shadow(0 0 8px ${r.color})`,
                fill: r.color,
              }}
            />
          ) : r.type === "circle" ? (
            <div
              style={{
                width: r.size,
                height: r.size,
                borderRadius: "50%",
                background: r.color,
                opacity: r.opacity,
                boxShadow: `0 0 10px ${r.color}, 0 0 20px ${r.color}80`,
              }}
            />
          ) : r.type === "diamond" ? (
            <div
              style={{
                width: r.size,
                height: r.size,
                transform: "rotate(45deg)",
                background: r.color,
                opacity: r.opacity,
                boxShadow: `0 0 10px ${r.color}, 0 0 20px ${r.color}80`,
              }}
            />
          ) : (
            <div
              style={{
                width: r.size,
                height: r.size,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: r.color,
                opacity: r.opacity,
                boxShadow: `0 0 10px ${r.color}, 0 0 20px ${r.color}80`,
              }}
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes magicFloat { 0%,100%{transform:translateY(0) rotate(0deg) scale(1)} 50%{transform:translateY(-40px) rotate(180deg) scale(1.5)} }
      `}</style>
    </div>
  );
}
function TeComponent() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(242,193,78,.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(165,15,37,.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(224,40,63,.08) 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(242,193,78,.1) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-1/4 w-1 h-full opacity-15"
        style={{
          background: "linear-gradient(180deg, transparent, #f2c14e, transparent)",
          animation: "nebulaRay 8s ease-in-out infinite",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute top-0 right-1/3 w-1 h-full opacity-15"
        style={{
          background: "linear-gradient(180deg, transparent, #e0283f, transparent)",
          animation: "nebulaRay 10s ease-in-out infinite 2s",
          filter: "blur(25px)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 w-1 h-full opacity-10"
        style={{
          background: "linear-gradient(180deg, transparent, #f2c14e, transparent)",
          animation: "nebulaRay 12s ease-in-out infinite 4s",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-1 h-full opacity-10"
        style={{
          background: "linear-gradient(180deg, transparent, #5fd08a, transparent)",
          animation: "nebulaRay 9s ease-in-out infinite 1s",
          filter: "blur(22px)",
        }}
      />
      <style>
        {
          "@keyframes nebulaRay { 0%,100%{opacity:0.05; transform:translateX(0)} 50%{opacity:0.2; transform:translateX(30px)} }"
        }
      </style>
    </div>
  );
}
function ItComponent({ mood, combo }) {
  const rx = mood === "sad" ? 5 : mood === "excited" || mood === "combo" ? 8 : 6;
  const ry = mood === "sad" ? 3 : mood === "excited" || mood === "combo" ? 9 : 6;
  const d =
    mood === "happy"
      ? "M 16 24 Q 24 30 32 24"
      : mood === "sad"
        ? "M 16 28 Q 24 22 32 28"
        : mood === "excited" || mood === "combo"
          ? "M 14 24 Q 24 36 34 24"
          : "M 18 26 Q 24 28 30 26";
  const fill =
    mood === "happy" || mood === "excited" || mood === "combo"
      ? "rgba(224,40,63,0.7)"
      : "rgba(224,40,63,0.15)";
  const u =
    mood === "happy"
      ? "#5fd08a"
      : mood === "sad"
        ? "#ff4444"
        : mood === "excited" || mood === "combo"
          ? "#f2c14e"
          : "#f2c14e";
  const animation =
    mood === "excited" || mood === "combo"
      ? "mascotExcited 0.25s ease-in-out infinite"
      : "mascotFloat 3s ease-in-out infinite";
  const m = mood === "sad";
  const transform = mood === "combo" ? "scale(1.2)" : "scale(1)";
  const C = mood === "combo" && combo > 1;
  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <div className="relative">
        {C && (
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-black text-lg px-3 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #e0283f, #d99a22)",
              color: "#fff",
              textShadow: "0 0 10px #fff",
              boxShadow: "0 0 20px #e0283f80",
              animation: "comboPop 0.5s ease-out",
            }}
          >
            {combo}x COMBO!
          </div>
        )}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70"
          style={{
            background: u,
            width: "80px",
            height: "80px",
            animation: "mascotPulse 2s ease-in-out infinite",
            transform,
            transition: "transform 0.3s ease",
          }}
        />
        <svg
          width="80"
          height="80"
          viewBox="0 0 48 48"
          fill="none"
          className="relative"
          style={{
            filter: `drop-shadow(0 0 15px ${u}80)`,
            transform,
            transition: "transform 0.3s ease",
          }}
        >
          <path
            d="M 16 14 L 24 2 L 32 14"
            fill="url(#sopaGrad)"
            stroke={u}
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              animation:
                mood === "excited" || mood === "combo" ? "hatWiggle 0.5s ease-in-out infinite" : "none",
            }}
          />
          <path d="M 12 14 Q 24 16 36 14" stroke={u} strokeWidth="1.2" fill="none" />
          <circle
            cx="24"
            cy="8"
            r="2"
            fill="#f2c14e"
            style={{
              filter: "drop-shadow(0 0 4px #f2c14e)",
              animation:
                mood === "excited" || mood === "combo" ? "starPulse 0.5s ease-in-out infinite" : "none",
            }}
          />
          <ellipse cx="24" cy="28" rx="18" ry="16" fill="url(#sopaGrad)" stroke={u} strokeWidth="1.5" />
          <path
            d="M 8 16 L 12 8 L 18 14"
            fill="url(#sopaGrad)"
            stroke={u}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 40 16 L 36 8 L 30 14"
            fill="url(#sopaGrad)"
            stroke={u}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M 11 14 L 13 10 L 16 13" fill="rgba(255,182,193,0.4)" />
          <path d="M 37 14 L 35 10 L 32 13" fill="rgba(255,182,193,0.4)" />
          <ellipse
            cx="17"
            cy="24"
            rx={rx}
            ry={ry}
            fill="white"
            style={{
              animation:
                mood === "excited" || mood === "combo" ? "eyeBounce 0.5s ease-in-out infinite" : "none",
            }}
          />
          <ellipse
            cx="31"
            cy="24"
            rx={rx}
            ry={ry}
            fill="white"
            style={{
              animation:
                mood === "excited" || mood === "combo" ? "eyeBounce 0.5s ease-in-out infinite 0.1s" : "none",
            }}
          />
          <circle cx="17" cy="24" r="2.5" fill="#2a160c" />
          <circle cx="31" cy="24" r="2.5" fill="#2a160c" />
          <circle cx="18.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="32.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="15.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <circle cx="29.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <path d={d} stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="30" r="3" fill={fill} />
          <circle cx="36" cy="30" r="3" fill={fill} />
          {(mood === "excited" || mood === "combo") && (
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
                cy="40"
                r="1.5"
                fill="#f2c14e"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
              <circle
                cx="8"
                cy="44"
                r="1"
                fill="#5fd08a"
                style={{
                  animation: "sparkle 0.8s ease-in-out infinite 0.3s",
                }}
              />
            </>
          )}
          {m && (
            <>
              <circle cx="12" cy="28" r="1.5" fill="#f2c14e" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="28" r="1.5" fill="#f2c14e" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="sopaGrad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#f2c14e" />
              <stop offset="50%" stopColor="#a50f25" />
              <stop offset="100%" stopColor="#e0283f" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <style>{`
        @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-15px) scale(1.1)} }
        @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.5)} }
        @keyframes hatWiggle { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(3deg)} }
        @keyframes eyeBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
        @keyframes starPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
        @keyframes comboPop { 0%{transform:translateX(-50%) scale(0) translateY(10px)} 70%{transform:translateX(-50%) scale(1.1) translateY(-5px)} 100%{transform:translateX(-50%) scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}
function Ct1Component({ m: m_1, onClick }) {
  const [g, setG] = React.useState({
    x: 0,
    y: 0,
  });
  const dRef = React.useRef(null);
  const y = (h) => {
    if (!dRef.current) {
      return;
    }
    const m = dRef.current.getBoundingClientRect();
    const N = (h.clientX - m.left) / m.width;
    const C = (h.clientY - m.top) / m.height;
    setG({
      x: (C - 0.5) * -25,
      y: (N - 0.5) * 25,
    });
  };
  const u = () =>
    setG({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={dRef}
      onClick={onClick}
      onMouseMove={y}
      onMouseLeave={u}
      className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(52,26,16,.6), rgba(30,14,8,.5))",
        border: `1px solid ${m_1.color}40`,
        transform: `perspective(600px) rotateX(${g.x}deg) rotateY(${g.y}deg) translateZ(15px)`,
        transformStyle: "preserve-3d",
        boxShadow: `0 15px 50px rgba(0,0,0,.5), 0 0 30px ${m_1.color}20`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${m_1.color}00, ${m_1.color}, ${m_1.color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `linear-gradient(135deg, ${m_1.color}, ${m_1.color}88)`,
          transform: "translateZ(25px)",
          boxShadow: `0 0 20px ${m_1.color}50`,
        }}
      >
        <BookOpenIcon size={24} className="text-white" />
      </div>
      <h3
        className="text-white font-black text-base mb-1"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {m_1.titulo}
      </h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m_1.color}aa`,
          transform: "translateZ(15px)",
        }}
      >
        {m_1.tituloChino}
      </p>
      <p
        className="text-xs font-medium text-white/40"
        style={{
          transform: "translateZ(10px)",
        }}
      >
        {m_1.vocabularioCount} palabras / 词
      </p>
    </button>
  );
}
function DtComponent({ seconds }) {
  const g = Math.min(seconds / 300, 1);
  const strokeDasharray = 2 * Math.PI * 26;
  const strokeDashoffset = strokeDasharray * (1 - g);
  const y = Math.floor(seconds / 60);
  const u = seconds % 60;
  const h = `${y}:${u < 10 ? "0" : ""}${u}`;
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: 60,
        height: 60,
        transform: "perspective(400px) translateZ(10px)",
      }}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        style={{
          transform: "rotate(-90deg)",
          filter: "drop-shadow(0 0 4px #f2c14e)",
        }}
      >
        <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="3" />
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="#f2c14e"
          strokeWidth="3"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s linear",
            filter: "drop-shadow(0 0 6px #f2c14e)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[10px] font-black"
          style={{
            color: "#f2c14e",
            textShadow: "0 0 8px #f2c14e",
          }}
        >
          {h}
        </span>
      </div>
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(242,193,78,.15)",
          boxShadow: "0 0 15px rgba(242,193,78,.1), inset 0 0 10px rgba(242,193,78,.05)",
          animation: "timerPulse 2s ease-in-out infinite",
        }}
      />
    </div>
  );
}
function FtComponent({ score }) {
  return (
    <div
      className="relative px-3 py-1.5 rounded-xl flex items-center gap-2"
      style={{
        background: "linear-gradient(135deg, rgba(242,193,78,.12), rgba(217,154,34,.06))",
        border: "1.5px solid rgba(242,193,78,.35)",
        transform: "perspective(600px) rotateX(5deg) translateZ(12px)",
        boxShadow:
          "0 0 20px rgba(242,193,78,.2), 0 0 40px rgba(242,193,78,.1), inset 0 0 20px rgba(242,193,78,.05)",
        animation: "scoreFloat 3s ease-in-out infinite",
      }}
    >
      <ZapIcon
        size={14}
        style={{
          color: "#f2c14e",
          filter: "drop-shadow(0 0 4px #f2c14e)",
        }}
      />
      <span
        className="text-sm font-black"
        style={{
          color: "#f2c14e",
          textShadow: "0 0 8px rgba(242,193,78,.5), 0 0 16px rgba(242,193,78,.3)",
        }}
      >
        {score}
      </span>
    </div>
  );
}
function Ie1Component({ icon, label, value, color, delay }) {
  const [y, setY] = React.useState({
    x: 0,
    y: 0,
  });
  const hRef = React.useRef(null);
  const m = (C) => {
    if (!hRef.current) {
      return;
    }
    const z = hRef.current.getBoundingClientRect();
    const M = (C.clientX - z.left) / z.width;
    const P = (C.clientY - z.top) / z.height;
    setY({
      x: (P - 0.5) * -18,
      y: (M - 0.5) * 18,
    });
  };
  const N = () =>
    setY({
      x: 0,
      y: 0,
    });
  return (
    <div
      ref={hRef}
      onMouseMove={m}
      onMouseLeave={N}
      className="rounded-xl p-4 text-center relative overflow-hidden group"
      style={{
        background: "linear-gradient(180deg, rgba(52,26,16,.5), rgba(30,14,8,.3))",
        border: `1.5px solid ${color}30`,
        transform: `perspective(500px) rotateX(${y.x}deg) rotateY(${y.y}deg) translateZ(15px)`,
        transformStyle: "preserve-3d",
        boxShadow: `0 10px 40px rgba(0,0,0,.4), 0 0 30px ${color}20`,
        animation: `statCardEnter 0.6s ease ${delay}s both`,
        transition: "transform 0.3s ease",
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${color}00, ${color}, ${color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="mb-2 flex justify-center"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {icon}
      </div>
      <div
        className="text-xl font-black mb-1"
        style={{
          color,
          textShadow: `0 0 15px ${color}80`,
          transform: "translateZ(15px)",
        }}
      >
        {value}
      </div>
      <div
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{
          color: `${color}aa`,
          transform: "translateZ(10px)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
function CtComponent() {
  const [a, setA] = React.useState("select");
  const [g, setG] = React.useState([]);
  const [d, setD] = React.useState([]);
  const [u, setU] = React.useState([]);
  const [m, setM] = React.useState([]);
  const [C, setC] = React.useState(false);
  const [M, setM_1] = React.useState(0);
  const [T, setT] = React.useState(0);
  const [j, setJ] = React.useState(false);
  const [Y, setY] = React.useState(new Map());
  const [Be, setBe] = React.useState(false);
  const [A, setA_1] = React.useState(null);
  const [J, setJ_1] = React.useState("neutral");
  const [ee, setEe] = React.useState([]);
  const [xt, setXt] = React.useState(new Set());
  const [L, setL] = React.useState(0);
  const [R, setR] = React.useState(0);
  const [Le, setLe] = React.useState(0);
  const [We, setWe] = React.useState(new Set());
  const [me, setMe] = React.useState(new Set());
  const [U, setU_1] = React.useState(true);
  const [W, setW] = React.useState(null);
  const [Ee, setEe_1] = React.useState(false);
  const [pt, setPt] = React.useState({
    x: 0,
    y: 0,
  });
  const GRef = React.useRef(null);
  const HRef = React.useRef(null);
  const IeRef = React.useRef(0);
  const seRef = React.useRef(null);
  const VRef = React.useRef(null);
  const [ve, setVe] = React.useState("");
  const De = React.useMemo(() => g_1(), []);
  React.useEffect(() => {
    if (ee.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setEe((s) =>
        s
          .map((o) => ({
            ...o,
            x: o.x + o.vx,
            y: o.y + o.vy,
            vy: o.vy + 0.15,
            life: o.life - 0.012,
            rotation: o.rotation + o.rotationSpeed,
          }))
          .filter((o) => o.life > 0),
      );
    }, 16);
    return () => clearInterval(t);
  }, [ee.length]);
  React.useEffect(() => {
    if (a === "playing" && u.length > 0) {
      setU_1(true);
      if (VRef.current) {
        clearTimeout(VRef.current);
      }
      VRef.current = setTimeout(() => setU_1(false), 1500);
      return () => {
        if (VRef.current) {
          clearTimeout(VRef.current);
        }
      };
    }
  }, [a, u.length]);
  React.useEffect(() => {
    if (J !== "neutral" && J !== "combo") {
      const t = setTimeout(() => setJ_1("neutral"), 1500);
      return () => clearTimeout(t);
    }
  }, [J]);
  const we = React.useCallback((t) => {
    let s = t ? a_1(t) : a_1();
    if (s.length === 0) {
      setVe(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const o = s
      .filter((c) => c.espanol && c.chino)
      .map((c) => ({
        word: nt(c.espanol),
        meaning: c.chino,
      }))
      .filter((c) => c.word.length >= 3 && c.word.length <= 10);
    const l = new Set();
    const x = [];
    for (const c of o) {
      if (!l.has(c.word)) {
        l.add(c.word);
        x.push({
          ...c,
          found: false,
          cells: [],
        });
      }
    }
    const f = x.slice(0, 10);
    setG(f);
    setA("playing");
    setJ_1("neutral");
  }, []);
  const onClick = React.useCallback(() => {
    const t = g.slice(0, 8).map((o) => ({
      ...o,
      found: false,
      cells: [],
    }));
    const s = ot(t);
    setD(t);
    setU(s);
    setM([]);
    setC(false);
    setM_1(0);
    setT(0);
    setJ(false);
    setY(new Map());
    setXt(new Set());
    setJ_1("neutral");
    setEe([]);
    setL(0);
    setR(0);
    setLe(0);
    setWe(new Set());
    setMe(new Set());
    setW(null);
    if (GRef.current) {
      clearInterval(GRef.current);
    }
    GRef.current = setInterval(() => setM_1((o) => o + 1), 1000);
  }, [g]);
  React.useEffect(() => {
    if (a === "playing") {
      onClick();
    }
  }, [a, onClick]);
  React.useEffect(
    () => () => {
      if (GRef.current) {
        clearInterval(GRef.current);
      }
    },
    [],
  );
  React.useEffect(() => {
    if (!j && a === "playing") {
      GRef.current = setInterval(() => setM_1((t) => t + 1), 1000);
      return () => {
        if (GRef.current) {
          clearInterval(GRef.current);
        }
      };
    }
  }, [j, a]);
  React.useEffect(() => {
    if (d.length > 0 && d.every((t) => t.found) && !j && a === "playing") {
      setJ(true);
      if (GRef.current) {
        clearInterval(GRef.current);
      }
      const t = Math.max(500 - M * 3, 50);
      const s = R * 50;
      const o = T + t + s + 1000;
      setT(o);
      setJ_1("excited");
      lt();
    }
  }, [d, j, M, T, R, a]);
  const E = (t, s) => `${t},${s}`;
  // v17 · Sin partículas en el estado de React (re-pintaban el juego entero 60 veces por segundo)
  const ke = React.useCallback(() => {}, []);
  const Se = (t, s, o) => {
    if (j || a !== "playing") {
      return;
    }
    setC(true);
    setM([[t, s]]);
    setEe_1(true);
    const l = "touches" in o ? o.touches[0].clientX : o.clientX;
    const x = "touches" in o ? o.touches[0].clientY : o.clientY;
    setPt({
      x: l,
      y: x,
    });
  };
  const Ne = (t) => {
    const s = "touches" in t ? t.touches[0].clientX : t.clientX;
    const o = "touches" in t ? t.touches[0].clientY : t.clientY;
    setPt({
      x: s,
      y: o,
    });
  };
  const Ae = (t, s) => {
    if (!(!C || j || a !== "playing")) {
      setM((o) => {
        if (o.length === 0) {
          return [[t, s]];
        }
        const l = o[0];
        const x = [];
        const f = t - l[0];
        const c = s - l[1];
        const w = Math.max(Math.abs(f), Math.abs(c));
        if (w === 0) {
          return [l];
        }
        const b = f === 0 ? 0 : f / Math.abs(f);
        const F = c === 0 ? 0 : c / Math.abs(c);
        for (let S = 0; S <= w; S++) {
          const I = l[0] + b * S;
          const Q = l[1] + F * S;
          if (I >= 0 && I < length_1 && Q >= 0 && Q < length_1) {
            x.push([I, Q]);
          }
        }
        return x;
      });
    }
  };
  const ne = () => {
    if (!C) {
      return;
    }
    setC(false);
    setEe_1(false);
    const t = m.map(([l, x]) => u[l]?.[x] || "").join("");
    const s = m
      .map(([l, x]) => u[l]?.[x] || "")
      .reverse()
      .join("");
    const o = d.findIndex((l) => !l.found && (l.word === t || l.word === s));
    if (o >= 0) {
      const l = Date.now();
      const x = l - Le;
      let f = L;
      if (x < 10000) {
        f = L + 1;
      } else {
        f = 1;
      }
      setL(f);
      if (f > R) {
        setR(f);
      }
      setLe(l);
      const c = Math.min(f, 10);
      const w = x < 5000 ? Math.floor((5000 - x) / 100) : 0;
      const F = 100 + (c - 1) * 50 + w;
      setJ_1(f >= 3 ? "combo" : "happy");
      if (seRef.current) {
        clearTimeout(seRef.current);
      }
      seRef.current = setTimeout(() => {
        setL(0);
        setJ_1("neutral");
      }, 10000);
      const S = n[o % n.length];
      setD((v) =>
        v.map((X, q) => {
          if (q === o) {
            return {
              ...X,
              found: true,
            };
          }
          return X;
        }),
      );
      setY((v) => {
        const X = new Map(v);
        m.forEach(([q, le]) => X.set(E(q, le), o));
        return X;
      });
      setXt((v) => new Set(v).add(o));
      setT((v) => v + F);
      const I = new Set(m.map(([v, X]) => E(v, X)));
      setTimeout(() => {
        setMe((v) => {
          const X = new Set(v);
          I.forEach((q) => X.add(q));
          return X;
        });
      }, 600);
      const Q = HRef.current;
      if (Q) {
        const v = Q.getBoundingClientRect();
        m.forEach(([X, q]) => {
          const le = v.left + (q + 0.5) * (v.width / length_1);
          const He = v.top + (X + 0.5) * (v.height / length_1);
          ke(le, He, S, 15, "explode");
        });
      }
      const Me = HRef.current;
      if (Me) {
        const v = Me.getBoundingClientRect();
        const X = f > 1 ? ` +${c}x` : "";
        setA_1({
          show: true,
          text: `+${F}${X}`,
          x: v.left + v.width / 2,
          y: v.top,
          color: f >= 3 ? "#e0283f" : "#f2c14e",
        });
        setTimeout(() => setA_1(null), 1500);
      }
    } else if (m.length > 0) {
      setJ_1("sad");
      setBe(true);
      setL(0);
      const l = new Set(m.map(([f, c]) => E(f, c)));
      setWe(l);
      const x = HRef.current;
      if (x) {
        const f = x.getBoundingClientRect();
        m.forEach(([c, w]) => {
          const b = f.left + (w + 0.5) * (f.width / length_1);
          const F = f.top + (c + 0.5) * (f.height / length_1);
          ke(b, F, "#ff4444", 8, "error");
        });
      }
      setTimeout(() => {
        setBe(false);
        setWe(new Set());
      }, 500);
    }
    setM([]);
  };
  const Oe = (t, s) => {
    const o = E(t, s);
    const l = Y.has(o);
    const x = m.some(([w, b]) => w === t && b === s);
    const f = We.has(o);
    const c = me.has(o);
    if (l) {
      const w = Y.get(o);
      const color = n[w % n.length];
      return {
        background: `linear-gradient(135deg, ${color}40, ${color}18)`,
        border: `2.5px solid ${color}ee`,
        color,
        boxShadow: `0 0 40px ${color}cc, 0 0 80px ${color}80, 0 0 120px ${color}40, inset 0 0 30px ${color}50`,
        textShadow: `0 0 20px ${color}, 0 0 40px ${color}aa`,
        transform: c ? "scale(0.8) rotate(5deg) translateZ(5px)" : "scale(1.2) translateZ(35px)",
        opacity: c ? 0.3 : 1,
        transition: c ? "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)" : "all 0.2s ease",
        animation: c
          ? "cellDisappear 0.8s ease forwards"
          : "cellFoundGreen 0.4s ease, cellFoundColor 0.6s ease 0.4s forwards, cellGlow 2s ease-in-out infinite",
      };
    }
    if (x) {
      return {
        background: "linear-gradient(135deg, rgba(242,193,78,.55), rgba(242,193,78,.25))",
        border: "2.5px solid rgba(242,193,78,.95)",
        color: "#f2c14e",
        boxShadow:
          "0 0 40px rgba(242,193,78,.8), 0 0 80px rgba(242,193,78,.5), 0 0 120px rgba(242,193,78,.2), inset 0 0 30px rgba(242,193,78,.35)",
        textShadow: "0 0 20px rgba(242,193,78,.9), 0 0 40px rgba(242,193,78,.5)",
        transform: f ? "scale(1.1) translateX(2px) translateZ(20px)" : "scale(1.22) translateZ(25px)",
        animation: f ? "cellShake 0.4s ease-in-out" : "cellSelectedPulse 1.5s ease-in-out infinite",
        transition: "all 0.15s ease",
      };
    }
    return {
      background: "linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02))",
      border: "1px solid rgba(255,255,255,.12)",
      color: "rgba(255,236,200,.8)",
      boxShadow: "none",
      textShadow: "0 0 6px rgba(255,255,255,.2)",
      transform: "scale(1) translateZ(0)",
      transition: "all 0.25s ease",
    };
  };
  const Z = (() => {
    if (m.length < 2 || !HRef.current) {
      return null;
    }
    const t = HRef.current.getBoundingClientRect();
    const s = t.width / length_1;
    const o = t.height / length_1;
    const l = m[0];
    const x = m[m.length - 1];
    const startX = t.left + l[1] * s + s / 2;
    const startY = t.top + l[0] * o + o / 2;
    const endX = t.left + x[1] * s + s / 2;
    const endY = t.top + x[0] * o + o / 2;
    return {
      startX,
      startY,
      endX,
      endY,
    };
  })();
  const length = d.filter((t) => t.found).length;
  const qe = d.length > 0 ? (length / d.length) * 100 : 0;
  if (a === "select") {
    return (
      <>
        <SelectorTemaJuego juego="sopa" error={ve} onIniciar={(id) => { setVe(""); we(id); }} />
      </>
    );
  }
  // v17 · Sopa en 3D: fichas de marfil sobre una mesa de jade, trazo de laca al arrastrar y trazos de color en cada palabra encontrada
  const SP_COLORES = ["#e8324c", "#1fa678", "#e9a520", "#3f7fe0", "#9b4fd8", "#ff7a3d", "#14a3b8", "#d6408f", "#7bb83a", "#c8961e"];
  const colorDe = (i) => SP_COLORES[i % SP_COLORES.length];
  const tiempo = `${Math.floor(M / 60)}:${String(M % 60).padStart(2, "0")}`;
  const trazo = (celdas) => {
    if (!celdas || celdas.length === 0) return null;
    const [f1, c1] = celdas[0];
    const [f2, c2] = celdas[celdas.length - 1];
    return { x1: c1 + 0.5, y1: f1 + 0.5, x2: c2 + 0.5, y2: f2 + 0.5 };
  };
  const seleccion = trazo(m);
  const alMover = (evento) => {
    if (!C) return;
    const el = document.elementFromPoint(evento.clientX, evento.clientY)?.closest?.("[data-celda]");
    if (el) Ae(Number(el.dataset.f), Number(el.dataset.c));
  };
  if (j) {
    return (
      <Escena3D tema="sopa">
        <CintaTemaJuego />
        <BarraJuego titulo="Sopa de Letras" tituloZh="字母寻词" />
        <Resultado3D
          gano
          sello="寻"
          estrellas={M <= 90 ? 3 : M <= 180 ? 2 : 1}
          titulo="¡Todas encontradas!"
          tituloZh="全部找到了"
          datos={[
            { etiqueta: "Puntos · 得分", valor: T, tono: "rojo" },
            { etiqueta: "Tiempo · 时间", valor: tiempo, tono: "jade" },
            { etiqueta: "Mejor combo · 最佳连击", valor: `x${R}`, tono: "oro" },
            { etiqueta: "Palabras · 单词", valor: d.length, tono: "tinta" },
          ]}
          acciones={
            <>
              <Boton3D tono="oro" onClick={onClick}>
                <RotateCcwIcon size={18} /> Otra sopa · 再来一局
              </Boton3D>
              <Boton3D tono="rojo" onClick={() => setA("select")}>
                <LayersIcon size={18} /> Otra unidad · 其他单元
              </Boton3D>
            </>
          }
        >
          <div className="sp-repaso">
            {d.map((palabra, i) => (
              <span key={palabra.word} style={{ "--c": colorDe(i) }}>
                <b>{palabra.word}</b> {palabra.meaning}
              </span>
            ))}
          </div>
        </Resultado3D>
        <P currentGameId="sopa" />
      </Escena3D>
    );
  }
  return (
    <Escena3D tema="sopa" suelo={false} className={`sp ${Be ? "rl--temblor" : ""}`}>
      <CintaTemaJuego />
      <BarraJuego titulo="Sopa de Letras" tituloZh="字母寻词">
        <Placa icono={<AwardIcon size={16} />} valor={T} etiqueta="Puntos · 分" />
        <Placa icono={<CheckIcon size={16} />} valor={`${length}/${d.length}`} etiqueta="Palabras · 词" tono="jade" />
        <Placa icono={<FlameIcon size={16} />} valor={`x${Math.max(L, 1)}`} etiqueta="Combo · 连击" tono="rojo" pulso={L >= 2} />
        <Placa icono={<TimerIcon size={16} />} valor={tiempo} etiqueta="Tiempo · 时间" tono="tinta" />
        <button type="button" className="rl-accion" onClick={onClick} title="Nueva sopa · 重置" aria-label="Nueva sopa · 重置">
          <RotateCcwIcon size={18} />
        </button>
        <button type="button" className="rl-accion" onClick={() => setA("select")} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
      </BarraJuego>

      <div className="rl-avisos" aria-live="polite">
        {A && (
          <p key={A.text + T} className={`rl-aviso ${L >= 3 ? "rl-aviso--racha" : "rl-aviso--multi"}`}>
            {A.text}
          </p>
        )}
      </div>

      <div className="sp-mesa">
        <div className="sp-tablero-caja">
          <div
            ref={HRef}
            className={`sp-tablero ${C ? "sp-tablero--trazando" : ""}`}
            onPointerMove={alMover}
            onPointerUp={ne}
            onPointerLeave={ne}
            onPointerCancel={ne}
            role="grid"
            aria-label="Sopa de letras · 字母方阵"
          >
            <svg className="sp-trazos" viewBox={`0 0 ${length_1} ${length_1}`} aria-hidden="true">
              {d.map((palabra, i) => {
                if (!palabra.found) return null;
                const t = trazo(palabra.cells);
                return t && <line key={palabra.word} {...t} className="sp-trazo sp-trazo--hecho" style={{ "--c": colorDe(i) }} />;
              })}
              {W !== null && d[W] && !d[W].found && (() => {
                const t = trazo(d[W].cells);
                return t && <line {...t} className="sp-trazo sp-trazo--pista" />;
              })()}
              {seleccion && <line {...seleccion} className="sp-trazo sp-trazo--vivo" />}
            </svg>
            {u.map((fila, f) =>
              fila.map((letra, c) => {
                const clave = E(f, c);
                const hallada = Y.has(clave);
                const elegida = m.some(([ff, cc]) => ff === f && cc === c);
                const mal = We.has(clave);
                return (
                  <span
                    key={clave}
                    data-celda=""
                    data-f={f}
                    data-c={c}
                    className={`sp-ficha ${hallada ? "sp-ficha--hallada" : ""} ${elegida ? "sp-ficha--elegida" : ""} ${mal ? "sp-ficha--mal" : ""}`}
                    style={{ "--i": (f * 7 + c * 3) % 23, "--c": hallada ? colorDe(Y.get(clave)) : undefined }}
                    onPointerDown={(evento) => {
                      evento.preventDefault();
                      Se(f, c, evento);
                    }}
                    role="gridcell"
                  >
                    {letra}
                  </span>
                );
              }),
            )}
          </div>
        </div>

        <aside className="sp-lista">
          <p className="sp-lista__titulo">
            <EyeIcon size={16} /> Encuentra · 找出单词 <b>{length}/{d.length}</b>
          </p>
          <div className="sp-progreso" aria-hidden="true">
            <i style={{ width: `${qe}%` }} />
          </div>
          <ul>
            {d.map((palabra, i) => (
              <li key={palabra.word} className={`sp-tablilla ${palabra.found ? "sp-tablilla--hecha" : ""}`} style={{ "--c": colorDe(i), "--i": i }}>
                <span className="sp-tablilla__zh">{palabra.meaning}</span>
                <span className="sp-tablilla__es">{palabra.word}</span>
                {palabra.found ? (
                  <span className="sp-tablilla__sello" aria-label="Encontrada · 已找到" translate="no">
                    得
                  </span>
                ) : (
                  <button type="button" className={`sp-pista ${W === i ? "sp-pista--on" : ""}`} onClick={() => setW(W === i ? null : i)} aria-label={`Pista para ${palabra.word} · 提示`}>
                    <LightbulbIcon size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className="sp-ayuda">Arrastra sobre las letras en cualquier dirección · 在字母上拖动连线</p>
        </aside>
      </div>
    </Escena3D>
  );
}
export { CtComponent as default };
