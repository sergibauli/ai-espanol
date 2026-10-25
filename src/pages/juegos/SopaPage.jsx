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
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
const length_1 = 12;
const n = [
  "#00f0ff",
  "#ff00aa",
  "#ffd600",
  "#39ff14",
  "#ff6b35",
  "#b829dd",
  "#2080ff",
  "#ff3f8f",
  "#00f0ff",
  "#ff8a2a",
  "#46ff9a",
  "#a855f7",
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
    "#ff00aa",
    "#00d4ff",
    "#ffd600",
    "#39ff14",
    "#ff6b35",
    "#b829dd",
    "#ff6ec7",
    "#7b61ff",
    "#ff3f8f",
    "#00f0ff",
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
      "#00d4ff",
      "#ffd600",
      "#ff00aa",
      "#39ff14",
      "#b829dd",
      "#ff6b35",
      "#00f0ff",
      "#46ff9a",
      "#a855f7",
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
            "radial-gradient(ellipse at 30% 20%, rgba(32,128,255,.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(184,41,221,.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,0,170,.08) 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(0,212,255,.1) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-1/4 w-1 h-full opacity-15"
        style={{
          background: "linear-gradient(180deg, transparent, #00d4ff, transparent)",
          animation: "nebulaRay 8s ease-in-out infinite",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute top-0 right-1/3 w-1 h-full opacity-15"
        style={{
          background: "linear-gradient(180deg, transparent, #ff00aa, transparent)",
          animation: "nebulaRay 10s ease-in-out infinite 2s",
          filter: "blur(25px)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 w-1 h-full opacity-10"
        style={{
          background: "linear-gradient(180deg, transparent, #ffd600, transparent)",
          animation: "nebulaRay 12s ease-in-out infinite 4s",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-1 h-full opacity-10"
        style={{
          background: "linear-gradient(180deg, transparent, #39ff14, transparent)",
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
      ? "rgba(255,105,180,0.7)"
      : "rgba(255,105,180,0.15)";
  const u =
    mood === "happy"
      ? "#46ff9a"
      : mood === "sad"
        ? "#ff4444"
        : mood === "excited" || mood === "combo"
          ? "#ffd600"
          : "#00d4ff";
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
              background: "linear-gradient(135deg, #ff00aa, #ff6b35)",
              color: "#fff",
              textShadow: "0 0 10px #fff",
              boxShadow: "0 0 20px #ff00aa80",
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
            fill="#ffd600"
            style={{
              filter: "drop-shadow(0 0 4px #ffd600)",
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
          <circle cx="17" cy="24" r="2.5" fill="#1a1a2e" />
          <circle cx="31" cy="24" r="2.5" fill="#1a1a2e" />
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
                cy="40"
                r="1.5"
                fill="#00d4ff"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
              <circle
                cx="8"
                cy="44"
                r="1"
                fill="#39ff14"
                style={{
                  animation: "sparkle 0.8s ease-in-out infinite 0.3s",
                }}
              />
            </>
          )}
          {m && (
            <>
              <circle cx="12" cy="28" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="28" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="sopaGrad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#2080ff" />
              <stop offset="50%" stopColor="#b829dd" />
              <stop offset="100%" stopColor="#ff00aa" />
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
        background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
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
          filter: "drop-shadow(0 0 4px #00d4ff)",
        }}
      >
        <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="3" />
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="3"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s linear",
            filter: "drop-shadow(0 0 6px #00d4ff)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[10px] font-black"
          style={{
            color: "#00d4ff",
            textShadow: "0 0 8px #00d4ff",
          }}
        >
          {h}
        </span>
      </div>
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(0,212,255,.15)",
          boxShadow: "0 0 15px rgba(0,212,255,.1), inset 0 0 10px rgba(0,212,255,.05)",
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
        background: "linear-gradient(135deg, rgba(255,214,0,.12), rgba(255,107,53,.06))",
        border: "1.5px solid rgba(255,214,0,.35)",
        transform: "perspective(600px) rotateX(5deg) translateZ(12px)",
        boxShadow:
          "0 0 20px rgba(255,214,0,.2), 0 0 40px rgba(255,214,0,.1), inset 0 0 20px rgba(255,214,0,.05)",
        animation: "scoreFloat 3s ease-in-out infinite",
      }}
    >
      <ZapIcon
        size={14}
        style={{
          color: "#ffd600",
          filter: "drop-shadow(0 0 4px #ffd600)",
        }}
      />
      <span
        className="text-sm font-black"
        style={{
          color: "#ffd600",
          textShadow: "0 0 8px rgba(255,214,0,.5), 0 0 16px rgba(255,214,0,.3)",
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
        background: "linear-gradient(180deg, rgba(14,22,64,.5), rgba(5,8,27,.3))",
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
  const ke = React.useCallback((t, s, o, l, x) => {
    const f = [];
    for (let c = 0; c < l; c++) {
      const w = (Math.PI * 2 * c) / l + (Math.random() - 0.5) * 0.5;
      const b = x === "explode" ? 3 + Math.random() * 8 : 2 + Math.random() * 5;
      const size = x === "explode" ? 4 + Math.random() * 8 : 2 + Math.random() * 5;
      const S = ["circle", "star", "square"];
      f.push({
        id: ++IeRef.current,
        x: t,
        y: s,
        vx: Math.cos(w) * b,
        vy: Math.sin(w) * b - (x === "explode" ? 4 : 2),
        color: x === "error" ? "#ff4444" : o,
        life: 1 + Math.random() * 0.8,
        size,
        text: x === "explode" && c < 3 ? ["★", "✦", "✨"][c] : undefined,
        type: S[Math.floor(Math.random() * S.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
      });
    }
    setEe((c) => [...c, ...f]);
  }, []);
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
          color: f >= 3 ? "#ff00aa" : "#ffd600",
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
        background: "linear-gradient(135deg, rgba(0,212,255,.55), rgba(0,212,255,.25))",
        border: "2.5px solid rgba(0,212,255,.95)",
        color: "#00f0ff",
        boxShadow:
          "0 0 40px rgba(0,212,255,.8), 0 0 80px rgba(0,212,255,.5), 0 0 120px rgba(0,212,255,.2), inset 0 0 30px rgba(0,212,255,.35)",
        textShadow: "0 0 20px rgba(0,212,255,.9), 0 0 40px rgba(0,212,255,.5)",
        transform: f ? "scale(1.1) translateX(2px) translateZ(20px)" : "scale(1.22) translateZ(25px)",
        animation: f ? "cellShake 0.4s ease-in-out" : "cellSelectedPulse 1.5s ease-in-out infinite",
        transition: "all 0.15s ease",
      };
    }
    return {
      background: "linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02))",
      border: "1px solid rgba(255,255,255,.12)",
      color: "rgba(207,216,255,.8)",
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
      <StarfieldBackground>
        <GeComponent />
        <TeComponent />
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10"
          style={{
            perspective: "1000px",
          }}
        >
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
                background: "linear-gradient(135deg,#2080ff,#b829dd)",
                boxShadow: "0 0 60px rgba(32,128,255,0.4), 0 0 120px rgba(184,41,221,0.2)",
                animation: "sopaFloat 3s ease-in-out infinite",
              }}
            >
              <SparklesIcon
                size={48}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
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
              <div
                className="absolute -bottom-1 -left-1"
                style={{
                  animation: "sparkle 2s ease-in-out infinite 0.5s",
                }}
              >
                <StarIcon
                  size={14}
                  style={{
                    color: "#ff00aa",
                    fill: "#ff00aa",
                  }}
                />
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#2080ff 0%,#b829dd 50%,#ff00aa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(32,128,255,.3))",
                animation: "sopaTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Sopa de Letras
            </h1>
            <p className="text-white/50 text-lg font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {ve && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {ve}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setVe("");
                we(null);
              }}
              className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "perspective(600px) translateZ(15px)",
                transformStyle: "preserve-3d",
                boxShadow: "0 15px 50px rgba(0,0,0,.4), 0 0 30px rgba(255,0,170,.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                  transform: "translateZ(25px)",
                  boxShadow: "0 0 20px rgba(255,0,170,0.4)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3
                className="text-white font-black text-base mb-1"
                style={{
                  transform: "translateZ(20px)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                  transform: "translateZ(15px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40"
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
            </button>
            {De.map((m_1) => (
              <Ct1Component
                key={m_1.id}
                m={m_1}
                onClick={() => {
                  setVe("");
                  we(m_1.id);
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes sopaFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes sopaTitlePulse { from{filter:drop-shadow(0 0 40px rgba(32,128,255,.3)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(32,128,255,.5)) brightness(1.15)} }
            @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <GeComponent />
      <TeComponent />
      <div
        className={`max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10 ${Be ? "animate-screenShake" : ""}`}
        onMouseUp={ne}
        onMouseLeave={ne}
        onMouseMove={Ne}
        onTouchMove={Ne}
        onTouchEnd={ne}
        style={{
          perspective: "1500px",
        }}
      >
        <ItComponent mood={J} combo={L} />
        {Ee && Z && (
          <svg
            className="fixed inset-0 pointer-events-none z-30"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <linearGradient id="selGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f0ff">
                  <animate
                    attributeName="stop-color"
                    values="#00f0ff;#ff00aa;#ffd600;#00f0ff"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#ff00aa">
                  <animate
                    attributeName="stop-color"
                    values="#ff00aa;#ffd600;#00f0ff;#ff00aa"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              <filter id="selGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="selGlowStrong">
                <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line
              x1={Z.startX}
              y1={Z.startY}
              x2={Z.endX}
              y2={Z.endY}
              stroke="url(#selGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#selGlowStrong)"
              opacity="0.95"
              style={{
                animation: "linePulse 0.5s ease-in-out infinite alternate",
              }}
            />
            <line
              x1={Z.startX}
              y1={Z.startY}
              x2={Z.endX}
              y2={Z.endY}
              stroke="url(#selGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#selGlow)"
              opacity="0.8"
            />
            <circle
              cx={Z.startX}
              cy={Z.startY}
              r="12"
              fill="#00f0ff"
              filter="url(#selGlowStrong)"
              opacity="0.9"
            >
              <animate attributeName="r" values="8;14;8" dur="0.6s" repeatCount="indefinite" />
            </circle>
            <circle cx={Z.endX} cy={Z.endY} r="10" fill="#ff00aa" filter="url(#selGlowStrong)" opacity="0.9">
              <animate attributeName="r" values="6;12;6" dur="0.6s" repeatCount="indefinite" />
            </circle>
          </svg>
        )}
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {ee.map((t) => (
            <div
              key={t.id}
              className="absolute font-black"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                opacity: t.life,
                transform: `rotate(${t.rotation}deg) scale(${t.life > 0.5 ? 1 : t.life * 2})`,
                fontSize: t.size,
                color: t.color,
                textShadow: `0 0 ${t.size * 2}px ${t.color}, 0 0 ${t.size * 4}px ${t.color}80`,
                pointerEvents: "none",
              }}
            >
              {t.text || (t.type === "star" ? "★" : t.type === "square" ? "■" : "")}
              {!t.text && t.type === "circle" && (
                <div
                  style={{
                    width: t.size,
                    height: t.size,
                    borderRadius: "50%",
                    background: t.color,
                    boxShadow: `0 0 ${t.size * 2}px ${t.color}, 0 0 ${t.size * 4}px ${t.color}80`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
        {L > 1 && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full font-black text-lg"
              style={{
                background: "linear-gradient(135deg, #ff00aa30, #ff6b3530)",
                border: "2px solid #ff00aabb",
                color: "#ff00aa",
                textShadow: "0 0 15px #ff00aa",
                boxShadow: "0 0 30px #ff00aa60, 0 0 60px #ff00aa30",
                animation: "comboBanner 0.5s ease-out",
              }}
            >
              <FlameIcon
                size={20}
                style={{
                  animation: "flameFlicker 0.3s ease-in-out infinite",
                }}
              />
              {L}x COMBO<span className="text-sm opacity-70">+{Math.min(L, 10) * 50} pts</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => setA("select")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar módulo / 切换模块
            </button>
            <div className="flex items-center gap-1.5">
              <DtComponent seconds={M} />
            </div>
            <div className="flex items-center gap-1.5">
              <FtComponent score={T} />
            </div>
            {R > 1 && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(255,0,170,.1)",
                  border: "1px solid rgba(255,0,170,.2)",
                  color: "#ff00aa",
                  boxShadow: "0 0 10px rgba(255,0,170,.1)",
                }}
              >
                <CrownIcon size={12} /> {R}x
              </div>
            )}
            <button
              onClick={onClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <RotateCcwIcon size={12} />
            </button>
          </div>
        </div>
        <div
          className="text-center mb-6"
          style={{
            transform: "translateZ(30px)",
          }}
        >
          <h1
            className="text-5xl md:text-6xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#2080ff,#b829dd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(32,128,255,.3))",
            }}
          >
            Sopa de Letras
          </h1>
          <p className="text-white/40 text-sm font-medium">Encuentra las palabras / 找出单词</p>
        </div>
        {A && (
          <div
            className="fixed pointer-events-none z-[9998] font-black text-3xl -translate-x-1/2"
            style={{
              left: A.x,
              top: A.y,
              color: A.color,
              textShadow: `0 0 20px ${A.color}, 0 0 40px ${A.color}80`,
              animation: "floatScoreSopa 1.5s ease-out forwards",
            }}
          >
            {A.text}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex justify-center">
            <div
              className="gm-scroll gm-sopa rounded-3xl p-4 md:p-5 select-none relative"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
                border: "2px solid transparent",
                backgroundClip: "padding-box",
                backdropFilter: "blur(20px)",
                transform: "translateZ(20px) perspective(1500px) rotateX(8deg)",
                boxShadow:
                  "0 0 80px rgba(32,128,255,.3), 0 0 160px rgba(32,128,255,.15), 0 0 320px rgba(184,41,221,.1), inset 0 0 80px rgba(32,128,255,.08)",
                transition: "transform 0.3s ease",
                animation:
                  "gridContainerFloat 6s ease-in-out infinite, gridContainerPulse 4s ease-in-out infinite",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-3xl -z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #2080ff, #b829dd, #ff00aa, #39ff14, #2080ff)",
                  backgroundSize: "400% 400%",
                  animation: "neonBorder 6s linear infinite",
                  opacity: 0.7,
                  filter: "blur(1px)",
                }}
              />
              <div
                className="absolute -inset-[2px] rounded-3xl -z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #2080ff, #b829dd, #ff00aa, #39ff14, #2080ff)",
                  backgroundSize: "400% 400%",
                  animation: "neonBorder 6s linear infinite",
                  opacity: 0.4,
                  filter: "blur(12px)",
                }}
              />
              <div
                className="absolute -inset-[2px] rounded-3xl -z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #2080ff, #b829dd, #ff00aa, #39ff14, #2080ff)",
                  backgroundSize: "400% 400%",
                  animation: "neonBorder 6s linear infinite",
                  opacity: 0.2,
                  filter: "blur(25px)",
                }}
              />
              <div
                ref={HRef}
                className="grid gap-[4px]"
                style={{
                  gridTemplateColumns: `repeat(${length_1}, min(44px, 7.5vw))`,
                  userSelect: "none",
                  transform: "perspective(1000px) rotateX(2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {u.map((t, s) =>
                  t.map((o, l) => {
                    const x = Oe(s, l);
                    const f = Y.has(E(s, l));
                    const c = m.some(([S, I]) => S === s && I === l);
                    const w = W !== null && d[W]?.cells.some(([S, I]) => S === s && I === l) && !d[W]?.found;
                    const b = U ? (s * length_1 + l) * 0.008 : 0;
                    const F = me.has(E(s, l));
                    return (
                      <div
                        key={`${s}-${l}`}
                        onMouseDown={(S) => Se(s, l, S)}
                        onMouseEnter={() => Ae(s, l)}
                        onTouchStart={(S) => Se(s, l, S)}
                        className={`gm-sopa-cell ${f ? "sel" : c ? "found" : ""} flex items-center justify-center font-bold text-sm transition-all duration-150 relative overflow-hidden group`}
                        style={{
                          width: "min(44px, 7.5vw)",
                          height: "min(44px, 7.5vw)",
                          borderRadius: "14px",
                          ...x,
                          cursor: "pointer",
                          boxShadow: w
                            ? `0 0 25px ${n[W % n.length]}aa, 0 0 50px ${n[W % n.length]}50`
                            : x.boxShadow,
                          border: w ? `2.5px dashed ${n[W % n.length]}aa` : x.border,
                          color: w ? n[W % n.length] : x.color,
                          opacity: U ? 0 : F ? 0.3 : 1,
                          transform: U ? `scale(0) rotate(${Math.random() * 360}deg)` : x.transform,
                          animation: U
                            ? `gridEnter 0.5s ease ${b}s forwards`
                            : x.animation || "letterFloat 3s ease-in-out infinite",
                          animationDelay: U ? `${b}s` : `${(s + l) * 0.1}s`,
                          fontWeight: f || c ? 900 : 700,
                          fontSize: f || c ? "min(18px, 3.5vw)" : "min(16px, 3.2vw)",
                          textShadow: f || c ? x.textShadow : "0 0 8px rgba(207,216,255,.3)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            transform: f ? "translateZ(8px)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          {o}
                        </span>
                        {!f && !c && (
                          <div
                            className="absolute inset-0 rounded-[14px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: "linear-gradient(135deg, rgba(0,212,255,.2), rgba(184,41,221,.15))",
                              boxShadow: "0 0 25px rgba(0,212,255,.3), inset 0 0 15px rgba(0,212,255,.15)",
                              transform: "translateZ(5px)",
                            }}
                          />
                        )}
                        {f && (
                          <div
                            className="absolute inset-0 rounded-[14px] pointer-events-none"
                            style={{
                              boxShadow: `inset 0 0 30px ${n[Y.get(E(s, l)) % n.length]}60`,
                              animation: "cellPulse 1.5s ease-in-out infinite",
                            }}
                          />
                        )}
                        {f && !F && (
                          <div
                            className="absolute inset-0 rounded-[14px] pointer-events-none"
                            style={{
                              border: `1px solid ${n[Y.get(E(s, l)) % n.length]}60`,
                              animation: "celebrationRing 1s ease-out forwards",
                            }}
                          />
                        )}
                        {f && !F && (
                          <div
                            className="absolute inset-0 rounded-[14px] pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at center, ${n[Y.get(E(s, l)) % n.length]}20 0%, transparent 70%)`,
                              animation: "cellDepthPulse 2s ease-in-out infinite",
                            }}
                          />
                        )}
                      </div>
                    );
                  }),
                )}
              </div>
            </div>
          </div>
          <div
            className="space-y-3"
            style={{
              transform: "translateZ(20px)",
            }}
          >
            <div
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.5), rgba(5,8,27,.35))",
                border: "1px solid rgba(255,255,255,.08)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 40px rgba(32,128,255,.15), 0 8px 32px rgba(0,0,0,.3)",
              }}
            >
              <h3
                className="text-sm font-black mb-3 flex items-center gap-2"
                style={{
                  color: "#2080ff",
                  textShadow: "0 0 10px rgba(32,128,255,.3)",
                }}
              >
                <EyeIcon size={14} /> Palabras / 单词{" "}
                <span
                  className="text-xs font-medium ml-auto"
                  style={{
                    color: "rgba(207,216,255,.4)",
                  }}
                >
                  {length}/{d.length}
                </span>
              </h3>
              <div className="space-y-2">
                {d.map((t, s) => (
                  <div
                    key={t.word}
                    className="flex items-center gap-2 p-2 rounded-xl transition-all relative overflow-hidden group word-card-3d"
                    style={{
                      background: t.found
                        ? `linear-gradient(135deg, ${n[s % n.length]}22, ${n[s % n.length]}0c)`
                        : "rgba(255,255,255,.02)",
                      border: t.found
                        ? `1.5px solid ${n[s % n.length]}60`
                        : "1px solid rgba(255,255,255,.05)",
                      transform: t.found ? "translateX(10px) scale(1.03)" : "translateX(0)",
                      boxShadow: t.found
                        ? `0 0 25px ${n[s % n.length]}50, 0 0 50px ${n[s % n.length]}25`
                        : "none",
                      animation: t.found ? `wordFound 0.6s ease ${s * 0.05}s both` : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t.found && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                        <div
                          className="absolute top-1/2 left-0 h-[2px] rounded-full"
                          style={{
                            background: n[s % n.length],
                            width: "100%",
                            transform: "translateY(-50%)",
                            animation: "strikeThrough 0.4s ease forwards",
                            boxShadow: `0 0 12px ${n[s % n.length]}, 0 0 24px ${n[s % n.length]}80`,
                          }}
                        />
                      </div>
                    )}
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                      style={{
                        background: t.found ? `${n[s % n.length]}35` : "rgba(255,255,255,.05)",
                        color: t.found ? n[s % n.length] : "rgba(207,216,255,.3)",
                        boxShadow: t.found ? `0 0 12px ${n[s % n.length]}50` : "none",
                        transform: "translateZ(5px)",
                      }}
                    >
                      {t.found ? <CheckIcon size={10} /> : s + 1}
                    </div>
                    <span
                      className="text-sm font-bold relative"
                      style={{
                        color: t.found ? n[s % n.length] : "#fff",
                        opacity: t.found ? 0.7 : 1,
                        textShadow: t.found ? `0 0 15px ${n[s % n.length]}80` : "none",
                      }}
                    >
                      {t.word}
                    </span>
                    <span
                      className="text-xs ml-auto relative z-10"
                      style={{
                        color: "rgba(207,216,255,.4)",
                      }}
                    >
                      {t.meaning}
                    </span>
                    {!t.found && (
                      <button
                        onClick={() => setW(W === s ? null : s)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                        style={{
                          color: W === s ? n[s % n.length] : "rgba(207,216,255,.3)",
                        }}
                      >
                        <LightbulbIcon size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-4 text-center relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.06)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 30px rgba(32,128,255,.12), 0 8px 32px rgba(0,0,0,.2)",
              }}
            >
              <div
                className="h-3 rounded-full overflow-hidden mb-2 relative"
                style={{
                  background: "rgba(255,255,255,.05)",
                  boxShadow: "inset 0 0 5px rgba(0,0,0,.3)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 relative"
                  style={{
                    width: `${qe}%`,
                    background: "linear-gradient(90deg, #2080ff, #b829dd, #ff00aa)",
                    boxShadow: "0 0 20px rgba(32,128,255,.6), 0 0 40px rgba(184,41,221,.4)",
                    animation: "progressGlow 2s ease-in-out infinite",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent)",
                      animation: "shimmer 2s linear infinite",
                    }}
                  />
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #fff, #ff00aa)",
                      boxShadow: "0 0 15px #ff00aa, 0 0 30px #ff00aa80",
                      animation: "tipSparkle 0.5s ease-in-out infinite alternate",
                    }}
                  />
                </div>
              </div>
              <p
                className="text-xs font-medium"
                style={{
                  color: "rgba(207,216,255,.4)",
                }}
              >
                Progreso / 进度
              </p>
            </div>
            <div
              className="rounded-2xl p-3 flex items-center justify-between"
              style={{
                background: "rgba(255,255,255,.02)",
                border: "1px solid rgba(255,255,255,.05)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 20px rgba(32,128,255,.1), 0 4px 16px rgba(0,0,0,.2)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <TargetIcon
                  size={12}
                  style={{
                    color: "#00d4ff",
                  }}
                />
                <span
                  className="text-xs font-bold"
                  style={{
                    color: "#00d4ff",
                  }}
                >
                  {length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <FlameIcon
                  size={12}
                  style={{
                    color: L > 1 ? "#ff00aa" : "rgba(207,216,255,.3)",
                  }}
                />
                <span
                  className="text-xs font-bold"
                  style={{
                    color: L > 1 ? "#ff00aa" : "rgba(207,216,255,.3)",
                  }}
                >
                  {L}x
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <AwardIcon
                  size={12}
                  style={{
                    color: R > 1 ? "#ffd600" : "rgba(207,216,255,.3)",
                  }}
                />
                <span
                  className="text-xs font-bold"
                  style={{
                    color: R > 1 ? "#ffd600" : "rgba(207,216,255,.3)",
                  }}
                >
                  {R}x
                </span>
              </div>
            </div>
          </div>
        </div>
        {j && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.85)",
              backdropFilter: "blur(20px)",
              perspective: "1000px",
            }}
          >
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              {Array.from({
                length: 30,
              }).map((t, s) => (
                <div
                  key={s}
                  className="absolute"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    width: `${4 + Math.random() * 8}px`,
                    height: `${4 + Math.random() * 8}px`,
                    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                    background: n[s % n.length],
                    boxShadow: `0 0 10px ${n[s % n.length]}, 0 0 20px ${n[s % n.length]}80`,
                    animation: `victoryParticle ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
            <div
              className="text-center p-8 rounded-3xl relative overflow-hidden max-w-sm mx-4"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
                border: "2px solid rgba(32,128,255,.3)",
                boxShadow:
                  "0 0 80px rgba(32,128,255,.3), 0 0 160px rgba(32,128,255,.15), 0 0 300px rgba(184,41,221,.1)",
                transform: "translateZ(60px)",
                animation: "victoryBounce 1s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg, #2080ff, #b829dd, #ff00aa)",
                  filter: "blur(30px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.5))",
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #2080ff, #b829dd, #ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(32,128,255,.3))",
                }}
              >
                ¡Completado!
              </h2>
              <p className="text-white/50 text-sm mb-4">完成！找到所有单词</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <Ie1Component
                  icon={
                    <TrophyIcon
                      size={20}
                      style={{
                        color: "#ffd600",
                        filter: "drop-shadow(0 0 4px #ffd600)",
                      }}
                    />
                  }
                  label="Score"
                  value={String(T)}
                  color="#ffd600"
                  delay={0.2}
                />
                <Ie1Component
                  icon={
                    <TimerIcon
                      size={20}
                      style={{
                        color: "#00d4ff",
                        filter: "drop-shadow(0 0 4px #00d4ff)",
                      }}
                    />
                  }
                  label="Tiempo"
                  value={`${Math.floor(M / 60)}:${String(M % 60).padStart(2, "0")}`}
                  color="#00d4ff"
                  delay={0.4}
                />
                <Ie1Component
                  icon={
                    <CrownIcon
                      size={20}
                      style={{
                        color: "#ff00aa",
                        filter: "drop-shadow(0 0 4px #ff00aa)",
                      }}
                    />
                  }
                  label="Combo"
                  value={`${R}x`}
                  color="#ff00aa"
                  delay={0.6}
                />
              </div>
              {R > 1 && (
                <p
                  className="text-sm font-bold mb-4"
                  style={{
                    color: "#ff00aa",
                    textShadow: "0 0 15px rgba(255,0,170,.4)",
                  }}
                >
                  Mejor combo: {R}x
                </p>
              )}
              <button
                onClick={onClick}
                className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #2080ff, #b829dd)",
                  boxShadow: "0 0 30px rgba(32,128,255,.4), 0 0 60px rgba(184,41,221,.15)",
                }}
              >
                Jugar de nuevo / 再玩一次
              </button>
              <P currentGameId="sopa" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes floatScoreSopa { 0%{transform:translateY(0) scale(1) rotateY(0deg);opacity:1} 30%{transform:translateY(-20px) scale(1.3) rotateY(10deg);opacity:1} 100%{transform:translateY(-80px) scale(1.6) rotateY(-10deg);opacity:0} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes screenShake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-10px)} 20%{transform:translateX(10px)} 30%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 50%{transform:translateX(-5px)} 60%{transform:translateX(5px)} 70%{transform:translateX(-3px)} 80%{transform:translateX(3px)} 90%{transform:translateX(-1px)} }
          @keyframes victoryBounce { 0%{transform:translateZ(60px) scale(0.8) rotateY(-10deg); opacity:0} 60%{transform:translateZ(60px) scale(1.02) rotateY(2deg); opacity:1} 100%{transform:translateZ(60px) scale(1) rotateY(0deg); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.7} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg) scale(1)} 50%{transform:rotateY(25deg) scale(1.1)} }
          @keyframes cellFoundGreen { 0%{transform:scale(0) rotate(-10deg) translateZ(0); opacity:0; background:linear-gradient(135deg, #10b981, #39ff14)} 50%{transform:scale(1.3) rotate(5deg) translateZ(40px); opacity:1; background:linear-gradient(135deg, #10b981, #39ff14)} 100%{transform:scale(1.2) rotate(0deg) translateZ(35px); opacity:1} }
          @keyframes cellFoundColor { 0%{filter:brightness(1.5)} 100%{filter:brightness(1)} }
          @keyframes cellDisappear { 0%{transform:scale(1.2) translateZ(35px); opacity:1} 50%{transform:scale(1.4) rotate(10deg) translateZ(20px); opacity:0.6} 100%{transform:scale(0.7) rotate(15deg) translateZ(5px); opacity:0.2} }
          @keyframes cellGlow { 0%,100%{box-shadow:0 0 30px var(--cell-color, #00d4ff)aa, 0 0 60px var(--cell-color, #00d4ff)60} 50%{box-shadow:0 0 50px var(--cell-color, #00d4ff)cc, 0 0 100px var(--cell-color, #00d4ff)80} }
          @keyframes cellPulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
          @keyframes cellDepthPulse { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
          @keyframes letterFloat { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-3px) translateZ(5px)} }
          @keyframes wordFound { 0%{transform:translateX(0) scale(1)} 50%{transform:translateX(12px) scale(1.05)} 100%{transform:translateX(10px) scale(1.03)} }
          @keyframes strikeThrough { 0%{width:0} 100%{width:100%} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes progressGlow { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.4)} }
          @keyframes tipSparkle { 0%{transform:translateY(-50%) scale(1)} 100%{transform:translateY(-50%) scale(1.8)} }
          @keyframes gridEnter { 0%{transform:scale(0) rotate(180deg); opacity:0} 60%{transform:scale(1.15) rotate(-10deg); opacity:1} 100%{transform:scale(1) rotate(0deg); opacity:1} }
          @keyframes cellShake { 0%,100%{transform:translateX(0) scale(1.1) translateZ(20px)} 20%{transform:translateX(-6px) scale(1.1) translateZ(20px)} 40%{transform:translateX(6px) scale(1.1) translateZ(20px)} 60%{transform:translateX(-4px) scale(1.1) translateZ(20px)} 80%{transform:translateX(4px) scale(1.1) translateZ(20px)} }
          @keyframes linePulse { 0%{stroke-width:3; opacity:0.7} 100%{stroke-width:6; opacity:1} }
          @keyframes comboBanner { 0%{transform:translateX(-50%) scale(0)} 70%{transform:translateX(-50%) scale(1.1)} 100%{transform:translateX(-50%) scale(1)} }
          @keyframes flameFlicker { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.2) rotate(5deg)} }
          @keyframes neonBorder { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          @keyframes celebrationRing { 0%{transform:scale(1); opacity:0.8} 100%{transform:scale(1.6); opacity:0} }
          @keyframes gridContainerPulse { 0%,100%{box-shadow:0 0 80px rgba(32,128,255,.3), 0 0 160px rgba(32,128,255,.15), 0 0 320px rgba(184,41,221,.1), inset 0 0 80px rgba(32,128,255,.08)} 50%{box-shadow:0 0 100px rgba(32,128,255,.4), 0 0 200px rgba(32,128,255,.2), 0 0 400px rgba(184,41,221,.15), inset 0 0 100px rgba(32,128,255,.12)} }
          @keyframes gridContainerFloat { 0%,100%{transform:translateZ(20px) perspective(1500px) rotateX(8deg)} 50%{transform:translateZ(20px) perspective(1500px) rotateX(6deg)} }
          @keyframes timerPulse { 0%,100%{box-shadow:0 0 15px rgba(0,212,255,.1), inset 0 0 10px rgba(0,212,255,.05)} 50%{box-shadow:0 0 25px rgba(0,212,255,.2), inset 0 0 15px rgba(0,212,255,.1)} }
          @keyframes statCardEnter { 0%{transform:perspective(500px) rotateX(0deg) rotateY(0deg) translateZ(-50px) scale(0.8); opacity:0} 100%{transform:perspective(500px) rotateX(0deg) rotateY(0deg) translateZ(15px) scale(1); opacity:1} }
          @keyframes neonFlicker { 0%,100%{opacity:1} 50%{opacity:0.8} }
          @keyframes cellSelectedPulse { 0%,100%{box-shadow:0 0 30px rgba(0,212,255,.5), 0 0 60px rgba(0,212,255,.3), inset 0 0 20px rgba(0,212,255,.2)} 50%{box-shadow:0 0 50px rgba(0,212,255,.7), 0 0 100px rgba(0,212,255,.4), inset 0 0 30px rgba(0,212,255,.3)} }
          @keyframes scoreFloat { 0%,100%{transform:perspective(600px) rotateX(5deg) translateZ(12px) translateY(0)} 50%{transform:perspective(600px) rotateX(3deg) translateZ(15px) translateY(-3px)} }
          @keyframes victoryParticle { 0%,100%{transform:translateY(0) rotate(0deg) scale(1); opacity:0.6} 50%{transform:translateY(-30px) rotate(180deg) scale(1.5); opacity:0.3} }
          .animate-screenShake { animation: screenShake 0.5s ease-in-out; }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { CtComponent as default };
