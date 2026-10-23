import {
  StarIcon,
  BookOpenIcon,
  ZapIcon,
  AwardIcon,
  SparklesIcon,
  TrophyIcon,
  BombIcon,
  ArrowLeftIcon,
  LayersIcon,
  FlameIcon,
  DiamondIcon,
  ChevronUpIcon,
  SnowflakeIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function dt(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function xt(n) {
  const b = [...n];
  for (let d = b.length - 1; d > 0; d--) {
    const m = Math.floor(Math.random() * (d + 1));
    [b[d], b[m]] = [b[m], b[d]];
  }
  return b;
}
const Ae = [
  "#00d4ff",
  "#39ff14",
  "#ff00aa",
  "#ffd600",
  "#b829dd",
  "#ff6b35",
  "#00ffcc",
  "#ff3333",
  "#9966ff",
  "#ff9900",
  "#00ccff",
  "#ff66cc",
  "#66ff66",
  "#ffcc00",
  "#cc66ff",
];
const $e = [
  {
    sky: "#0a0e27",
    cloud: "#1a1f4a",
    star: "#ffffff",
    starOpacity: 0.3,
    nebula: "#00d4ff",
  },
  {
    sky: "#0d1a2d",
    cloud: "#1a3050",
    star: "#aaddff",
    starOpacity: 0.4,
    nebula: "#39ff14",
  },
  {
    sky: "#1a0d2e",
    cloud: "#2d1a50",
    star: "#ffccff",
    starOpacity: 0.5,
    nebula: "#ff00aa",
  },
  {
    sky: "#2a1a0d",
    cloud: "#50301a",
    star: "#ffddaa",
    starOpacity: 0.6,
    nebula: "#ffd600",
  },
  {
    sky: "#140d2e",
    cloud: "#2a1a50",
    star: "#ddaaff",
    starOpacity: 0.7,
    nebula: "#b829dd",
  },
];
function y(n) {
  return Ae[(n - 1) % Ae.length];
}
function ft(n) {
  return $e[Math.min(Math.floor((n - 1) / 3), $e.length - 1)];
}
function ae(n, b, d = "#00d4ff", m = 40) {
  const o = [d, "#ffffff", "#ffd600", "#ff00aa", "#39ff14"];
  for (let l = 0; l < m; l++) {
    const h = document.createElement("div");
    const v = 3 + Math.random() * 8;
    const M = Math.random() > 0.5;
    h.style.cssText = `position:fixed;left:${n}px;top:${b}px;width:${v}px;height:${v}px;${M ? "" : "border-radius:50%;"}background:${o[l % o.length]};pointer-events:none;z-index:99999;box-shadow:0 0 ${4 + Math.random() * 8}px ${o[l % o.length]};`;
    document.body.appendChild(h);
    const x = Math.random() * Math.PI * 2;
    const j = 2 + Math.random() * 14;
    let L = Math.cos(x) * j;
    let z = Math.sin(x) * j;
    let Y = 1;
    let D = 1;
    const P = () => {
      L *= 0.95;
      z *= 0.95;
      z += 0.3;
      h.style.left = `${parseFloat(h.style.left) + L}px`;
      h.style.top = `${parseFloat(h.style.top) + z}px`;
      Y -= 0.02;
      D *= 0.98;
      h.style.opacity = String(Y);
      h.style.transform = `scale(${D})`;
      if (Y > 0) {
        requestAnimationFrame(P);
      } else {
        h.remove();
      }
    };
    requestAnimationFrame(P);
  }
}
function pt(n, b, color) {
  for (let m = 0; m < 25; m++) {
    const o = document.createElement("div");
    o.style.cssText = `position:fixed;left:${n}px;top:${b}px;width:6px;height:6px;border-radius:2px;background:${color};pointer-events:none;z-index:99999;box-shadow:0 0 8px ${color};`;
    document.body.appendChild(o);
    const l = Math.random() * Math.PI * 2;
    const h = 1 + Math.random() * 6;
    let v = Math.cos(l) * h;
    let M = Math.sin(l) * h - 2;
    let x = 1;
    const j = () => {
      v *= 0.94;
      M += 0.25;
      o.style.left = `${parseFloat(o.style.left) + v}px`;
      o.style.top = `${parseFloat(o.style.top) + M}px`;
      x -= 0.025;
      o.style.opacity = String(x);
      if (x > 0) {
        requestAnimationFrame(j);
      } else {
        o.remove();
      }
    };
    requestAnimationFrame(j);
  }
}
function re(n, b, d = 80) {
  const m = ["#00d4ff", "#b829dd", "#ff00aa", "#39ff14", "#ffd600", "#ff6b35", "#ffffff", "#00ffcc"];
  for (let o = 0; o < d; o++) {
    const l = document.createElement("div");
    const h = 4 + Math.random() * 10;
    const v = Math.random() > 0.5;
    l.style.cssText = `position:fixed;left:${n}px;top:${b}px;width:${h}px;height:${h}px;${v ? "" : "border-radius:50%;"}background:${m[o % m.length]};pointer-events:none;z-index:99999;box-shadow:0 0 6px ${m[o % m.length]};`;
    document.body.appendChild(l);
    const M = Math.random() * Math.PI * 2;
    const x = 3 + Math.random() * 16;
    let j = Math.cos(M) * x;
    let L = Math.sin(M) * x - 6;
    let z = 0;
    let Y = (Math.random() - 0.5) * 25;
    let D = 1;
    const P = () => {
      j *= 0.96;
      L += 0.35;
      z += Y;
      l.style.left = `${parseFloat(l.style.left) + j}px`;
      l.style.top = `${parseFloat(l.style.top) + L}px`;
      l.style.transform = `rotate(${z}deg)`;
      D -= 0.012;
      l.style.opacity = String(D);
      if (D > 0) {
        requestAnimationFrame(P);
      } else {
        l.remove();
      }
    };
    requestAnimationFrame(P);
  }
}
function Ze(n, b) {
  const d = ["#ffd600", "#ffffff", "#00d4ff", "#ff00aa"];
  for (let m = 0; m < 30; m++) {
    const o = document.createElement("div");
    o.style.cssText = `position:fixed;left:${n}px;top:${b}px;width:4px;height:4px;border-radius:50%;background:${d[m % d.length]};pointer-events:none;z-index:99999;box-shadow:0 0 8px ${d[m % d.length]};`;
    document.body.appendChild(o);
    const l = Math.random() * Math.PI * 2;
    const h = 1 + Math.random() * 6;
    let v = Math.cos(l) * h;
    let M = Math.sin(l) * h;
    let x = 1;
    const j = () => {
      v *= 0.92;
      M *= 0.92;
      o.style.left = `${parseFloat(o.style.left) + v}px`;
      o.style.top = `${parseFloat(o.style.top) + M}px`;
      x -= 0.03;
      o.style.opacity = String(x);
      if (x > 0) {
        requestAnimationFrame(j);
      } else {
        o.remove();
      }
    };
    requestAnimationFrame(j);
  }
}
function Ye(n, b) {
  for (let d = b.left; d < b.right; d += 20) {
    const m = document.createElement("div");
    m.style.cssText = `position:fixed;left:${d}px;top:${n}px;width:16px;height:4px;border-radius:2px;background:#39ff14;pointer-events:none;z-index:99999;box-shadow:0 0 12px #39ff14;`;
    document.body.appendChild(m);
    let o = (Math.random() - 0.5) * 8;
    let l = -2 - Math.random() * 4;
    let h = 1;
    const v = () => {
      o *= 0.92;
      l += 0.2;
      m.style.left = `${parseFloat(m.style.left) + o}px`;
      m.style.top = `${parseFloat(m.style.top) + l}px`;
      h -= 0.03;
      m.style.opacity = String(h);
      if (h > 0) {
        requestAnimationFrame(v);
      } else {
        m.remove();
      }
    };
    requestAnimationFrame(v);
  }
}
function mt(n) {
  for (let b = 0; b < 60; b++) {
    const d = document.createElement("div");
    const m = n.left + Math.random() * n.width;
    const o = n.top + Math.random() * n.height;
    const l = 8 + Math.random() * 16;
    const h = ["#ff4444", "#ff6b35", "#ff9900", "#ffd600", "#ff00aa"];
    d.style.cssText = `position:fixed;left:${m}px;top:${o}px;width:${l}px;height:${l}px;border-radius:3px;background:${h[Math.floor(Math.random() * h.length)]};pointer-events:none;z-index:99999;box-shadow:0 0 10px rgba(255,68,68,0.5);`;
    document.body.appendChild(d);
    let v = -2 - Math.random() * 8;
    let M = (Math.random() - 0.5) * 6;
    let x = 0;
    let j = 1;
    const L = () => {
      v += 0.5;
      M *= 0.98;
      x += M * 2;
      d.style.left = `${parseFloat(d.style.left) + M}px`;
      d.style.top = `${parseFloat(d.style.top) + v}px`;
      d.style.transform = `rotate(${x}deg)`;
      j -= 0.015;
      d.style.opacity = String(j);
      if (j > 0 && parseFloat(d.style.top) < window.innerHeight + 50) {
        requestAnimationFrame(L);
      } else {
        d.remove();
      }
    };
    requestAnimationFrame(L);
  }
}
const _ = 480;
const B = 48;
function GeComponent({ expression, combo }) {
  const d = {
    neutral: (
      <>
        <ellipse cx="35" cy="42" rx="7" ry="9" fill="#1a1a2e" />
        <ellipse cx="65" cy="42" rx="7" ry="9" fill="#1a1a2e" />
        <circle cx="37" cy="40" r="2.5" fill="#fff" />
        <circle cx="67" cy="40" r="2.5" fill="#fff" />
      </>
    ),
    happy: (
      <>
        <path d="M28 46 Q35 38 42 46" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M58 46 Q65 38 72 46" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="37" cy="40" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="67" cy="40" r="2.5" fill="#fff" opacity="0.8" />
      </>
    ),
    sad: (
      <>
        <ellipse cx="35" cy="44" rx="7" ry="9" fill="#1a1a2e" />
        <ellipse cx="65" cy="44" rx="7" ry="9" fill="#1a1a2e" />
        <circle cx="37" cy="42" r="2.5" fill="#fff" />
        <circle cx="67" cy="42" r="2.5" fill="#fff" />
        <path
          d="M30 56 Q35 60 40 56"
          stroke="#1a1a2e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M60 56 Q65 60 70 56"
          stroke="#1a1a2e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M32 52 Q35 50 38 52"
          stroke="#1a1a2e"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M62 52 Q65 50 68 52"
          stroke="#1a1a2e"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
      </>
    ),
    excited: (
      <>
        <ellipse cx="35" cy="42" rx="8" ry="10" fill="#1a1a2e" />
        <ellipse cx="65" cy="42" rx="8" ry="10" fill="#1a1a2e" />
        <circle cx="38" cy="39" r="3" fill="#fff" />
        <circle cx="68" cy="39" r="3" fill="#fff" />
        <path
          d="M32 32 L36 36 L40 32 M36 36 L36 28"
          stroke="#ffd600"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 32 L64 36 L68 32 M64 36 L64 28"
          stroke="#ffd600"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),
    super: (
      <>
        <ellipse cx="35" cy="40" rx="9" ry="11" fill="#1a1a2e" />
        <ellipse cx="65" cy="40" rx="9" ry="11" fill="#1a1a2e" />
        <circle cx="39" cy="37" r="3.5" fill="#fff" />
        <circle cx="69" cy="37" r="3.5" fill="#fff" />
        <path
          d="M28 28 L36 34 L32 24 M36 34 L40 26"
          stroke="#ffd600"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 28 L68 34 L64 24 M68 34 L72 26"
          stroke="#ffd600"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M25 35 Q20 30 25 25" stroke="#ff00aa" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M75 35 Q80 30 75 25" stroke="#ff00aa" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    ),
  };
  const m = {
    neutral: (
      <path d="M42 58 Q50 62 58 58" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
    ),
    happy: (
      <path d="M40 56 Q50 68 60 56" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    ),
    sad: <path d="M42 64 Q50 58 58 64" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />,
    excited: <path d="M40 58 Q50 72 60 58 Z" fill="#1a1a2e" />,
    super: <path d="M38 56 Q50 76 62 56 Z" fill="#1a1a2e" />,
  };
  const o =
    expression === "super"
      ? "#ff00aa"
      : expression === "excited"
        ? "#ffd600"
        : expression === "happy"
          ? "#39ff14"
          : expression === "sad"
            ? "#ff4444"
            : "#00d4ff";
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl"
      style={{
        filter: `drop-shadow(0 0 20px ${o}cc) drop-shadow(0 0 40px ${o}66)`,
        animation: "mascotFloat 2.5s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8a4c" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="100%" stopColor="#ffaa00" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="15" y="25" width="70" height="60" rx="16" fill="url(#bodyGrad)" />
      <rect
        x="15"
        y="25"
        width="70"
        height="60"
        rx="16"
        fill="none"
        stroke="#ffaa00"
        strokeWidth="2"
        opacity="0.4"
      />
      <rect x="22" y="32" width="56" height="46" rx="10" fill="rgba(255,255,255,0.15)" />
      <path
        d="M15 35 Q50 20 85 35"
        fill="none"
        stroke="#ffaa00"
        strokeWidth="2.5"
        opacity="0.3"
        strokeLinecap="round"
      />
      <ellipse cx="28" cy="56" rx="5" ry="3" fill="#ff6b8a" opacity="0.6" />
      <ellipse cx="72" cy="56" rx="5" ry="3" fill="#ff6b8a" opacity="0.6" />
      <rect x="20" y="15" width="60" height="16" rx="8" fill="url(#helmetGrad)" />
      <rect
        x="20"
        y="15"
        width="60"
        height="16"
        rx="8"
        fill="none"
        stroke="#ffcc00"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <rect x="35" y="10" width="30" height="8" rx="4" fill="#ffcc00" />
      <path d="M50 10 L50 5" stroke="#ffaa00" strokeWidth="3" strokeLinecap="round" />
      <circle
        cx="50"
        cy="3"
        r="2.5"
        fill="#ff4444"
        style={{
          animation:
            expression === "excited" || expression === "super"
              ? "mascotBlink 0.3s infinite alternate"
              : "none",
        }}
      />
      {d[expression]}
      {m[expression]}
      <rect
        x="10"
        y="70"
        width="12"
        height="18"
        rx="5"
        fill="#ff6b35"
        opacity="0.9"
        style={{
          animation: "mascotWaveLeft 2s ease-in-out infinite",
        }}
      />
      <rect
        x="78"
        y="70"
        width="12"
        height="18"
        rx="5"
        fill="#ff6b35"
        opacity="0.9"
        style={{
          animation: "mascotWaveRight 2s ease-in-out infinite 0.3s",
        }}
      />
      {combo >= 5 && (
        <>
          <circle cx="10" cy="20" r="4" fill="#ffd600" filter="url(#glow)" opacity="0.9">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="90" cy="15" r="3" fill="#ff00aa" filter="url(#glow)" opacity="0.8">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}
function Ge1Component({ word, x: x_1, y, color, isLanded, isClearing, scale = 1, opacity = 1, index }) {
  const x = color;
  const j = `${x}60`;
  const L = "chino" in word ? word.chino : word.espanol;
  return (
    <div
      id={"id" in word ? `tower-word-${word.id}` : undefined}
      className="absolute font-black text-sm md:text-base whitespace-nowrap select-none"
      style={{
        left: x_1,
        top: y,
        width: "auto",
        opacity,
        transform: `scale(${scale}) ${isLanded ? "translateZ(0px)" : "translateZ(30px)"}`,
        transition: isClearing
          ? "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          : isLanded
            ? "top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "none",
        animation:
          !isLanded && !isClearing
            ? `towerWordAppear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), towerWordFloat 2.5s ease-in-out infinite ${index ? String(index * 0.2) : "0"}s`
            : isClearing
              ? "blockClear 0.6s ease-in forwards"
              : "none",
        zIndex: isLanded ? 10 : 50,
      }}
    >
      <div
        className="relative px-4 py-2 md:px-5 md:py-2.5 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${x}30, ${x}15)`,
          border: `1px solid ${x}80`,
          borderBottom: `3px solid ${x}aa`,
          borderRight: `2px solid ${x}60`,
          boxShadow: isLanded
            ? `0 4px 0 ${x}40, 0 8px 16px rgba(0,0,0,0.4), 0 0 20px ${j}, 0 0 40px ${x}20, 0 0 80px ${x}10`
            : `0 0 30px ${j}, 0 0 60px ${x}20, 0 12px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 80px ${x}10`,
          color: "#fff",
          textShadow: `0 0 8px ${x}, 0 2px 4px rgba(0,0,0,0.5)`,
          backdropFilter: "blur(4px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-l-xl pointer-events-none"
          style={{
            width: "6px",
            background: `linear-gradient(180deg, ${x}50, ${x}20)`,
            transform: "translateX(-6px) translateZ(-6px) rotateY(-90deg)",
            transformOrigin: "right center",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full rounded-b-xl pointer-events-none"
          style={{
            height: "6px",
            background: `linear-gradient(90deg, ${x}40, ${x}15)`,
            transform: "translateY(6px) translateZ(-6px) rotateX(90deg)",
            transformOrigin: "top center",
          }}
        />
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />
        <span className="flex items-center gap-1.5 relative z-10">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>{" "}
          {L}
        </span>
      </div>
      {!isLanded && (
        <>
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              top: "-12px",
              width: "80%",
              height: "6px",
              background: `linear-gradient(180deg, ${x}60, transparent)`,
              opacity: 0.6,
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              bottom: -8 - (y / 500) * 40,
              width: 60 + (y / 500) * 40,
              height: 8,
              background: `radial-gradient(ellipse, ${x}40, transparent 70%)`,
              opacity: 0.3 + (y / 500) * 0.4,
              transition: "none",
            }}
          />
        </>
      )}
    </div>
  );
}
function CtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [l, setL] = React.useState("select");
  const [v, setV] = React.useState([]);
  const [x, setX] = React.useState("");
  const [L, setL_1] = React.useState(0);
  const [Y, setY] = React.useState(0);
  const [P, setP] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordtower_best") || "0");
    } catch {
      return 0;
    }
  });
  const [p, setP_1] = React.useState(1);
  const [He, setHe] = React.useState(false);
  const [ht, setHt] = React.useState(0);
  const [ee, setEe] = React.useState(0);
  const [T, setT] = React.useState([]);
  const [ye, setYe] = React.useState(0);
  const [E, setE] = React.useState(0);
  const [se, setSe] = React.useState(0);
  const [Xe, setXe] = React.useState(false);
  const [je, setJe] = React.useState([
    {
      type: "freeze",
      label: "Congelar",
      icon: SnowflakeIcon,
      color: "#00d4ff",
      active: false,
      cooldown: 0,
      duration: 5000,
    },
    {
      type: "bomb",
      label: "Bomba",
      icon: BombIcon,
      color: "#ff4444",
      active: false,
      cooldown: 0,
      duration: 0,
    },
    {
      type: "clearRow",
      label: "Clear",
      icon: StarIcon,
      color: "#39ff14",
      active: false,
      cooldown: 0,
      duration: 0,
    },
  ]);
  const [J, setJ] = React.useState(false);
  const [Pe, setPe] = React.useState(0);
  const [ce, setCe] = React.useState([]);
  const IRef = React.useRef([]);
  const xeRef = React.useRef(0);
  const RRef = React.useRef(0);
  const qeRef = React.useRef(0);
  const CRef = React.useRef(null);
  const Qe = g();
  const [ke, setKe] = React.useState("");
  const [q, setQ] = React.useState("neutral");
  const VeRef = React.useRef(_);
  const peRef = React.useRef(1);
  const VRef = React.useRef(null);
  const meRef = React.useRef(null);
  React.useRef(null);
  const _eRef = React.useRef(null);
  React.useRef(0);
  const NeRef = React.useRef(1);
  const ue = React.useCallback(
    (t) => {
      playClick();
      let s = t ? a(t) : a();
      if (s.length === 0) {
        setKe(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const u = xt(
        s
          .filter((r) => r.espanol && r.chino)
          .map((r) => ({
            espanol: dt(r.espanol),
            chino: r.chino,
          }))
          .filter((r) => r.espanol.length >= 3 && r.espanol.length <= 10),
      );
      setV(u);
      IRef.current = [];
      xeRef.current = 0;
      RRef.current = 0;
      qeRef.current = 0;
      setX("");
      setL_1(0);
      setY(0);
      setP_1(1);
      setE(0);
      setSe(0);
      setEe(0);
      setT([]);
      setJ(false);
      setPe(0);
      setCe([]);
      setJe([
        {
          type: "freeze",
          label: "Congelar",
          icon: SnowflakeIcon,
          color: "#00d4ff",
          active: false,
          cooldown: 0,
          duration: 5000,
        },
        {
          type: "bomb",
          label: "Bomba",
          icon: BombIcon,
          color: "#ff4444",
          active: false,
          cooldown: 0,
          duration: 0,
        },
        {
          type: "clearRow",
          label: "Clear",
          icon: StarIcon,
          color: "#39ff14",
          active: false,
          cooldown: 0,
          duration: 0,
        },
      ]);
      NeRef.current = 1;
      peRef.current = 1;
      setL("playing");
      setQ("happy");
    },
    [playClick],
  );
  React.useEffect(() => {
    if (l !== "playing") {
      return;
    }
    const s = Math.max(900, 2800 - (p - 1) * 180) + Math.random() * 400;
    meRef.current = setInterval(() => {
      if (v.length === 0) {
        return;
      }
      const u = v[xeRef.current % v.length];
      xeRef.current++;
      const CRef_current = CRef.current;
      const a = CRef_current ? CRef_current.clientWidth : 600;
      const width = 100 + Math.random() * 60;
      const color = y(p);
      const speed = 0.6 + p * 0.25 + Math.random() * 0.5;
      const acceleration = 0.008 + p * 0.003;
      IRef.current = [
        ...IRef.current,
        {
          id: Date.now() + Math.random(),
          espanol: u.espanol,
          chino: u.chino,
          x: Math.random() * Math.max(10, a - width - 30),
          y: 0,
          speed,
          acceleration,
          color,
          landed: false,
          landedAt: 0,
          rowIndex: -1,
          width,
        },
      ];
    }, s);
    return () => {
      if (meRef.current) {
        clearInterval(meRef.current);
      }
    };
  }, [l, p, v]);
  React.useEffect(() => {
    if (l !== "playing") {
      return;
    }
    const t = setInterval(() => {
      const s = CRef.current?.clientHeight || _;
      VeRef.current = s;
      _eRef.current = CRef.current?.getBoundingClientRect() || null;
      const r = J ? 0.15 : NeRef.current;
      const a = new Map();
      T.forEach((i) => {
        if (!i.cleared) {
          const f = a.get(i.rowIndex) || [];
          f.push(i);
          a.set(i.rowIndex, f);
        }
      });
      const g = [];
      const Z = [];
      const k = [];
      for (const i of IRef.current) {
        if (i.landed) {
          Z.push({
            id: i.id,
            espanol: i.espanol,
            chino: i.chino,
            color: i.color,
            rowIndex: i.rowIndex,
            x: i.x,
            width: i.width,
            cleared: false,
            clearingAt: 0,
          });
          continue;
        }
        const speed = i.speed + i.acceleration * r;
        const G = i.y + speed * 5 * r;
        let te = s - B;
        let rowIndex = 0;
        const A = B;
        for (let X = 0; X < 20; X++) {
          const W = a.get(X) || [];
          const $ = s - (X + 1) * A;
          if (!W.some((Se) => Math.abs(Se.x - i.x) < (Se.width + i.width) * 0.6)) {
            rowIndex = X;
            te = $;
            break;
          }
        }
        if (G >= te) {
          k.push({
            ...i,
            y: te,
            speed,
            landed: true,
            landedAt: Date.now(),
            rowIndex,
          });
        } else {
          g.push({
            ...i,
            y: G,
            speed,
          });
        }
      }
      if (k.length > 0) {
        const i = [...T];
        for (const w of k) {
          i.push({
            id: w.id,
            espanol: w.espanol,
            chino: w.chino,
            color: w.color,
            rowIndex: w.rowIndex,
            x: w.x,
            width: w.width,
            cleared: false,
            clearingAt: 0,
          });
          const A = CRef.current?.getBoundingClientRect();
          if (A) {
            pt(A.left + w.x + w.width / 2, A.top + w.y + B / 2, w.color);
          }
        }
        const f = new Map();
        i.filter((w) => !w.cleared).forEach((w) => {
          f.set(w.rowIndex, (f.get(w.rowIndex) || 0) + 1);
        });
        let G = 0;
        for (const [w, A] of f.entries()) {
          if (A >= 3) {
            G++;
            i.filter(($) => $.rowIndex === w && !$.cleared).forEach(($) => {
              $.cleared = true;
              $.clearingAt = Date.now();
            });
            const W = CRef.current?.getBoundingClientRect();
            if (W) {
              const $ = W.top + (s - (w + 1) * B) + B / 2;
              Ye($, W);
              re(W.left + W.width / 2, $, 50);
              ae(W.left + W.width / 2, $, "#39ff14", 30);
            }
            RRef.current += 200 * A;
          }
        }
        if (G > 0) {
          setL_1(RRef.current);
          playCorrect();
          setQ("super");
          setTimeout(() => setQ("happy"), 1500);
        }
        setT(i);
        if (Math.max(...Array.from(f.keys()), -1) >= 8) {
          playLose();
          setL("gameover");
          const w = RRef.current;
          setP((X) => {
            const W = Math.max(X, w);
            localStorage.setItem("wordtower_best", String(W));
            return W;
          });
          setQ("sad");
          const A = CRef.current?.getBoundingClientRect();
          if (A) {
            mt(A);
          }
          return;
        }
      }
      setT((i) => i.filter((f) => !f.cleared || Date.now() - f.clearingAt < 600));
      IRef.current = g;
      const S = new Set(T.filter((i) => !i.cleared).map((i) => i.rowIndex));
      const N = S.size > 0 ? Math.max(...S) : -1;
      const O = Math.max(0, (N - 3) * B);
      setEe((i) => i + (O - i) * 0.1);
      setHt((i) => i + 1);
    }, 50);
    return () => clearInterval(t);
  }, [l, J, T, playCorrect, playWrong, playLose]);
  React.useEffect(() => {
    if (p > peRef.current && l === "playing") {
      setQ("excited");
      setXe(true);
      setTimeout(() => setXe(false), 2000);
      setTimeout(() => setQ("happy"), 2000);
      peRef.current = p;
    }
  }, [p, l]);
  React.useEffect(() => {
    if (l === "select") {
      setQ("neutral");
    }
    if (l === "gameover") {
      setQ("sad");
    }
  }, [l]);
  React.useEffect(() => {
    if (!J) {
      return;
    }
    const t = setInterval(() => {
      setPe((s) => {
        if (s <= 100) {
          return (setJ(false), 0);
        }
        return s - 100;
      });
    }, 100);
    return () => clearInterval(t);
  }, [J]);
  React.useEffect(() => {
    if (ce.length === 0) {
      return;
    }
    const t = setTimeout(() => {
      setCe((s) => s.filter((u) => Date.now() - u.id < 1500));
    }, 1500);
    return () => clearTimeout(t);
  }, [ce]);
  const Ue = (type) => {
    const s = je.find((u) => u.type === type);
    if (!(!s || s.active || s.cooldown > 0)) {
      playClick();
      if (type === "freeze") {
        setJ(true);
        setPe(s.duration);
        setJe((u) =>
          u.map((r) => {
            if (r.type === "freeze") {
              return {
                ...r,
                active: true,
                cooldown: 15000,
              };
            }
            return r;
          }),
        );
        setTimeout(() => {
          setJe((u) =>
            u.map((r) => {
              if (r.type === "freeze") {
                return {
                  ...r,
                  active: false,
                };
              }
              return r;
            }),
          );
        }, s.duration);
        setTimeout(() => {
          setJe((u) =>
            u.map((r) => {
              if (r.type === "freeze") {
                return {
                  ...r,
                  cooldown: 0,
                };
              }
              return r;
            }),
          );
        }, 15000);
      } else if (type === "bomb") {
        const u = CRef.current?.getBoundingClientRect();
        IRef.current.forEach((r) => {
          if (u) {
            ae(u.left + r.x + r.width / 2, u.top + r.y + 20, r.color, 20);
          }
        });
        IRef.current = [];
        RRef.current += 50;
        setL_1(RRef.current);
        setJe((r) =>
          r.map((a) => {
            if (a.type === "bomb") {
              return {
                ...a,
                cooldown: 12000,
              };
            }
            return a;
          }),
        );
        setTimeout(() => {
          setJe((r) =>
            r.map((a) => {
              if (a.type === "bomb") {
                return {
                  ...a,
                  cooldown: 0,
                };
              }
              return a;
            }),
          );
        }, 12000);
      } else if (type === "clearRow") {
        const u = [...new Set(T.filter((r) => !r.cleared).map((r) => r.rowIndex))].sort((r, a) => r - a);
        if (u.length > 0) {
          const r = u[0];
          const a = T.filter((k) => k.rowIndex === r && !k.cleared);
          const g = CRef.current?.getBoundingClientRect();
          const Z = CRef.current?.clientHeight || _;
          if (g) {
            const k = g.top + (Z - (r + 1) * B) + B / 2;
            Ye(k, g);
            re(g.left + g.width / 2, k, 60);
          }
          a.forEach((k) => {
            k.cleared = true;
            k.clearingAt = Date.now();
          });
          RRef.current += 150 * a.length;
          setL_1(RRef.current);
          setT((k) => [...k]);
        }
        setJe((r) =>
          r.map((a) => {
            if (a.type === "clearRow") {
              return {
                ...a,
                cooldown: 10000,
              };
            }
            return a;
          }),
        );
        setTimeout(() => {
          setJe((r) =>
            r.map((a) => {
              if (a.type === "clearRow") {
                return {
                  ...a,
                  cooldown: 0,
                };
              }
              return a;
            }),
          );
        }, 10000);
      }
    }
  };
  const Me = (t) => {
    const s = t
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-ZÑ]/g, "")
      .trim();
    setX(s);
    if (!s) {
      return;
    }
    let u = IRef.current.findIndex((a) => a.espanol === s && !a.landed);
    if (u >= 0) {
      playCorrect();
      const a = IRef.current[u];
      const g = CRef.current?.getBoundingClientRect();
      if (g) {
        ae(g.left + a.x + a.width / 2, g.top + a.y + 20, a.color, 35);
        Ze(g.left + a.x + a.width / 2, g.top + a.y + 20);
      }
      IRef.current = IRef.current.filter((f, G) => G !== u);
      const Z = Date.now();
      const k = Z - ye;
      let S = E;
      if (k < 3000) {
        S = E + 1;
      } else {
        S = 1;
      }
      setE(S);
      setSe((f) => Math.max(f, S));
      setYe(Z);
      if (VRef.current) {
        clearTimeout(VRef.current);
      }
      VRef.current = setTimeout(() => setE(0), 3500);
      let N = 1;
      if (S >= 10) {
        N = 5;
      } else if (S >= 7) {
        N = 4;
      } else if (S >= 5) {
        N = 3;
      } else if (S >= 3) {
        N = 2;
      }
      const i = (100 + a.espanol.length * 15) * N;
      RRef.current += i;
      setL_1(RRef.current);
      setP_1((f) => Math.min(f + 1, 15));
      setX("");
      if (S >= 5) {
        setQ("super");
        if (g) {
          re(g.left + a.x + a.width / 2, g.top + a.y + 20, 60);
        }
      } else {
        setQ("excited");
      }
      setTimeout(() => setQ("happy"), S >= 5 ? 2000 : 1000);
      if (g) {
        const id = Date.now();
        setCe((G) => [
          ...G,
          {
            id,
            x: g.left + a.x + a.width / 2,
            y: g.top + a.y,
            text: N > 1 ? `+${i} x${N}!` : `+${i}`,
            color: N > 1 ? "#ffd600" : "#39ff14",
          },
        ]);
      }
      return;
    }
    const r = T.findIndex((a) => a.espanol === s && !a.cleared);
    if (r >= 0) {
      playCorrect();
      const a = T[r];
      const g = CRef.current?.getBoundingClientRect();
      const Z = CRef.current?.clientHeight || _;
      if (g) {
        const f = g.top + (Z - (a.rowIndex + 1) * B) + B / 2;
        ae(g.left + a.x + a.width / 2, f, a.color, 30);
        Ze(g.left + a.x + a.width / 2, f);
        re(g.left + a.x + a.width / 2, f, 40);
      }
      const k = T.filter((f) => f.rowIndex === a.rowIndex && !f.cleared);
      k.forEach((f) => {
        f.cleared = true;
        f.clearingAt = Date.now();
      });
      setT((f) => [...f]);
      const S = Date.now();
      let N = E;
      if (S - ye < 3000) {
        N = E + 1;
      } else {
        N = 1;
      }
      setE(N);
      setSe((f) => Math.max(f, N));
      setYe(S);
      if (VRef.current) {
        clearTimeout(VRef.current);
      }
      VRef.current = setTimeout(() => setE(0), 3500);
      let O = 1;
      if (N >= 10) {
        O = 5;
      } else if (N >= 7) {
        O = 4;
      } else if (N >= 5) {
        O = 3;
      } else if (N >= 3) {
        O = 2;
      }
      const i = 150 * k.length * O;
      RRef.current += i;
      setL_1(RRef.current);
      setP_1((f) => Math.min(f + 1, 15));
      setX("");
      if (N >= 5) {
        setQ("super");
      } else {
        setQ("excited");
      }
      setTimeout(() => setQ("happy"), N >= 5 ? 2000 : 1000);
      return;
    }
  };
  const onKeyDown = (t) => {
    if (t.key === "Enter") {
      Me(x);
    }
  };
  const Q = ft(p);
  if (l === "select") {
    return (
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4 relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-50"
                style={{
                  background: "radial-gradient(circle, #00d4ff, #b829dd, #ff00aa)",
                }}
              />
              <div
                className="relative p-5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,.2), rgba(184,41,221,.2))",
                  border: "1px solid rgba(0,212,255,.4)",
                  boxShadow: "0 0 40px rgba(0,212,255,.3), inset 0 0 30px rgba(0,212,255,.1)",
                }}
              >
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(0,212,255,.7))",
                  }}
                >
                  <path d="M2 22h20" />
                  <path d="M6 22V12l-4-4" />
                  <path d="M18 22V12l4-4" />
                  <path d="M6 8l12-4 4 4" />
                  <path d="M12 22V12" />
                  <path d="M12 12l-2-2" />
                  <path d="M12 12l2-2" />
                </svg>
              </div>
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3 tracking-tight"
              style={{
                textShadow: "0 0 50px rgba(0,212,255,0.5), 0 0 100px rgba(184,41,221,0.3)",
                background: "linear-gradient(135deg, #00d4ff, #b829dd, #ff00aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Word Tower
            </h1>
            <p className="text-white/50 text-sm font-medium">
              Construye la torre más alta con palabras / 用单词建造最高塔
            </p>
            {ke && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.15)",
                  border: "1px solid rgba(255,68,68,.4)",
                  color: "#ff6b35",
                  boxShadow: "0 0 25px rgba(255,68,68,.2)",
                }}
              >
                {ke}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setKe("");
                ue(null);
              }}
              className="group relative rounded-2xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 overflow-hidden card-3d-tilt"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.4)",
                perspective: "800px",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,.12), rgba(184,41,221,.08))",
                }}
              />
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-lg"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                }}
              />
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 30px rgba(255,0,170,.5), 0 8px 16px rgba(0,0,0,.3)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base mb-1 relative">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1 relative"
                style={{
                  color: "rgba(255,0,170,.9)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40 relative">Mezcla todo el vocabulario</p>
            </button>
            {Qe.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setKe("");
                  ue(t.id);
                }}
                className="group relative rounded-2xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 overflow-hidden card-3d-tilt"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${t.color}55`,
                  perspective: "800px",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}15, ${t.color}08)`,
                  }}
                />
                <div
                  className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-lg"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                  }}
                />
                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 30px ${t.color}50, 0 8px 16px rgba(0,0,0,.3)`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1 relative">{t.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1 relative"
                  style={{
                    color: `${t.color}cc`,
                  }}
                >
                  {t.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40 relative">
                  {t.vocabularioCount} palabras / 词
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col items-end gap-1">
          <GeComponent expression={q} combo={0} />
          <div className="px-2 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/70 border border-white/10 backdrop-blur-md">
            ¡Hola!
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 min-h-screen relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setL("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                boxShadow: "0 0 10px rgba(255,255,255,.05)",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5"
              style={{
                background: "rgba(0,212,255,.15)",
                border: "1px solid rgba(0,212,255,.4)",
                color: "#00d4ff",
                boxShadow: "0 0 20px rgba(0,212,255,.3), inset 0 0 8px rgba(0,212,255,.15)",
              }}
            >
              <ZapIcon size={12} className={L > 0 ? "animate-pulse" : ""} /> {L}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5"
              style={{
                background: "rgba(255,0,170,.15)",
                border: "1px solid rgba(255,0,170,.4)",
                color: "#ff00aa",
                boxShadow: "0 0 20px rgba(255,0,170,.3), inset 0 0 8px rgba(255,0,170,.15)",
              }}
            >
              <AwardIcon size={12} /> Nivel {p}
            </div>
            {E >= 2 && (
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all animate-bounce flex items-center gap-1.5"
                style={{
                  background: "rgba(255,214,0,.2)",
                  border: "1px solid rgba(255,214,0,.4)",
                  color: "#ffd600",
                  boxShadow: "0 0 20px rgba(255,214,0,.3)",
                }}
              >
                <FlameIcon size={12} /> x{E}
              </div>
            )}
            {se >= 3 && (
              <div
                className="px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"
                style={{
                  background: "rgba(57,255,20,.15)",
                  border: "1px solid rgba(57,255,20,.3)",
                  color: "#39ff14",
                }}
              >
                <DiamondIcon size={10} /> Max {se}
              </div>
            )}
          </div>
        </div>
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-4xl font-black mb-2 tracking-tight"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#b829dd,#ff00aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(0,212,255,.4))",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline mr-2 animate-bounce"
              style={{
                verticalAlign: "middle",
                filter: "drop-shadow(0 0 12px rgba(0,212,255,.7))",
              }}
            >
              <path d="M2 22h20" />
              <path d="M6 22V12l-4-4" />
              <path d="M18 22V12l4-4" />
              <path d="M6 8l12-4 4 4" />
              <path d="M12 22V12" />
              <path d="M12 12l-2-2" />
              <path d="M12 12l2-2" />
            </svg>{" "}
            Word Tower
          </h1>
          <p className="text-white/50 text-xs font-medium">
            Escribe la palabra en ESPAÑOL / 输入西班牙语单词
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          {je.map((t) => (
            <button
              key={t.type}
              onClick={() => Ue(t.type)}
              disabled={t.cooldown > 0}
              className="relative flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: t.active ? `${t.color}30` : "rgba(255,255,255,.06)",
                border: `1px solid ${t.active ? t.color : "rgba(255,255,255,.15)"}`,
                color: t.active ? t.color : "#fff",
                boxShadow: t.active ? `0 0 15px ${t.color}40` : "none",
              }}
            >
              <t.icon size={12} />
              {t.label}
              {t.cooldown > 0 && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              )}
            </button>
          ))}
        </div>
        {J && (
          <div className="flex items-center justify-center gap-2 mb-2">
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse"
              style={{
                background: "rgba(0,212,255,.2)",
                border: "1px solid rgba(0,212,255,.4)",
                color: "#00d4ff",
              }}
            >
              <SnowflakeIcon size={12} /> Congelado: {Math.ceil(Pe / 1000)}s
            </div>
          </div>
        )}
        <div className="flex items-center justify-center gap-2 mb-4">
          {Array.from({
            length: 5,
          }).map((t, s) => (
            <div
              key={s}
              className="w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300"
              style={{
                background: s < Y ? "#ff4444" : "rgba(255,255,255,.15)",
                boxShadow:
                  s < Y ? "0 0 20px #ff4444, 0 0 40px rgba(255,68,68,.4)" : "0 0 5px rgba(255,255,255,.05)",
                transform: s < Y ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
        <div
          ref={CRef}
          className="relative mx-auto rounded-3xl overflow-hidden border border-white/15"
          style={{
            height: "min(55vh, 520px)",
            background: `linear-gradient(180deg, ${Q.sky}ee, ${Q.cloud}cc)`,
            backdropFilter: "blur(14px)",
            boxShadow: He
              ? "0 0 50px rgba(255,68,68,.6), 0 20px 60px rgba(0,0,0,.5), inset 0 0 50px rgba(255,68,68,.15)"
              : `0 0 50px ${y(p)}20, 0 20px 60px rgba(0,0,0,.5), inset 0 0 40px ${y(p)}08`,
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${y(p)}15, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({
              length: 30,
            }).map((t, s) => (
              <div
                key={s}
                className="absolute rounded-full"
                style={{
                  left: `${String((s * 37) % 100)}%`,
                  top: `${String((s * 23) % 100)}%`,
                  width: 1 + (s % 3),
                  height: 1 + (s % 3),
                  background: Q.star,
                  opacity: Q.starOpacity * (0.5 + Math.sin(Date.now() / 1000 + s) * 0.5),
                  boxShadow: `0 0 ${String(2 + (s % 4))}px ${Q.star}`,
                  animation: `starTwinkle ${String(2 + (s % 3))}s ease-in-out infinite ${String(s * 0.3)}s`,
                }}
              />
            ))}
          </div>
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(ellipse at 20% 80%, ${Q.nebula}30, transparent 50%), radial-gradient(ellipse at 80% 20%, ${Q.nebula}20, transparent 40%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(${y(p)}15 1px, transparent 1px), linear-gradient(90deg, ${y(p)}15 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${y(p)}, transparent)`,
              opacity: 0.8,
              boxShadow: `0 0 30px ${y(p)}40, 0 0 60px ${y(p)}20`,
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "90%",
              height: "40px",
              background: `radial-gradient(ellipse at 50% 100%, ${y(p)}30, transparent 70%)`,
              transform: "translateX(-50%) translateY(10px)",
              filter: "blur(4px)",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 rounded-b-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${y(p)}, transparent)`,
              opacity: 0.6,
              boxShadow: `0 0 30px ${y(p)}40`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              transform: `translateY(-${ee}px)`,
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {T.filter((t) => !t.cleared).map((t, s) => {
              const r = (CRef.current?.clientHeight || _) - (t.rowIndex + 1) * B - ee;
              return (
                <Ge1Component
                  key={t.id}
                  word={t}
                  x={t.x}
                  y={r + ee}
                  color={t.color}
                  isLanded
                  isClearing={false}
                  scale={1}
                  opacity={1}
                  index={s}
                />
              );
            })}
            {T.filter((t) => t.cleared && Date.now() - t.clearingAt < 600).map((t) => {
              const y_1 = (CRef.current?.clientHeight || _) - (t.rowIndex + 1) * B;
              const r = (Date.now() - t.clearingAt) / 600;
              return (
                <Ge1Component
                  key={t.id}
                  word={t}
                  x={t.x}
                  y={y_1}
                  color={t.color}
                  isLanded
                  isClearing
                  scale={1 - r * 0.5}
                  opacity={1 - r}
                />
              );
            })}
            {IRef.current
              .filter((t) => !t.landed)
              .map((t, s) => (
                <Ge1Component
                  key={t.id}
                  word={t}
                  x={t.x}
                  y={t.y - ee}
                  color={t.color}
                  isLanded={false}
                  isClearing={false}
                  index={s}
                />
              ))}
          </div>
          {Xe && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div
                className="text-center animate-levelUp"
                style={{
                  animation: "levelUpPop 2s ease-out forwards",
                }}
              >
                <div
                  className="text-5xl md:text-6xl font-black mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${y(p)}, #ffd600)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 30px ${y(p)}80)`,
                  }}
                >
                  ¡NIVEL {p}!
                </div>
                <div
                  className="text-sm font-bold"
                  style={{
                    color: y(p),
                  }}
                >
                  <SparklesIcon size={14} className="inline mr-1" /> Más rápido, más difícil
                </div>
              </div>
            </div>
          )}
          {ce.map((t) => {
            const s = Date.now() - t.id;
            const u = Math.min(s / 1500, 1);
            return (
              <div
                key={t.id}
                className="fixed pointer-events-none z-[99999] font-black text-lg md:text-xl"
                style={{
                  left: t.x,
                  top: t.y - u * 60,
                  opacity: 1 - u,
                  transform: `scale(${String(1 + u * 0.3)})`,
                  color: t.color,
                  textShadow: `0 0 15px ${t.color}, 0 2px 4px rgba(0,0,0,0.5)`,
                }}
              >
                {t.text}
              </div>
            );
          })}
        </div>
        <div className="mt-4 max-w-md mx-auto relative">
          <div
            className="absolute -inset-[1px] rounded-2xl opacity-60 blur-md transition-opacity"
            style={{
              background: `linear-gradient(135deg, ${y(p)}, #b829dd, #ff00aa)`,
              opacity: x ? 0.9 : 0.4,
            }}
          />
          <input
            type="text"
            value={x}
            onChange={(t) => Me(t.target.value)}
            onKeyDown={onKeyDown}
            className="relative w-full px-6 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl text-center bg-black/50 border border-white/20 text-white focus:outline-none focus:border-[#00d4ff] transition-all"
            style={{
              boxShadow: `0 0 40px ${y(p)}20, inset 0 0 25px ${y(p)}05`,
              textShadow: `0 0 12px ${y(p)}40`,
              backdropFilter: "blur(12px)",
            }}
            placeholder="Escribe en español / 输入西班牙语..."
            autoFocus
          />
          {x && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div
                className="w-2 h-2 rounded-full animate-ping"
                style={{
                  background: y(p),
                  boxShadow: `0 0 12px ${y(p)}`,
                }}
              />
            </div>
          )}
        </div>
        {E > 0 && (
          <div className="mt-3 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/50">Combo</span>
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{
                  background: "rgba(255,255,255,.1)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${String(Math.min((E / 10) * 100, 100))}%`,
                    background: `linear-gradient(90deg, ${y(p)}, #ffd600)`,
                    boxShadow: `0 0 10px ${y(p)}`,
                  }}
                />
              </div>
              <span
                className="text-xs font-bold"
                style={{
                  color: E >= 5 ? "#ffd600" : y(p),
                }}
              >
                {E}/10
              </span>
            </div>
          </div>
        )}
        <div className="mt-3 flex items-center justify-center gap-2">
          <ChevronUpIcon size={14} className="text-white/30" />
          <span className="text-xs text-white/40 font-medium">
            Altura: {T.filter((t) => !t.cleared).length} bloques
          </span>
          <div
            className="w-24 h-1.5 rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,.1)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${String(Math.min((T.filter((t) => !t.cleared).length / 40) * 100, 100))}%`,
                background: `linear-gradient(90deg, ${y(p)}, #ff4444)`,
              }}
            />
          </div>
        </div>
        {l === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden game-over-card"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.8))",
                border: "1px solid rgba(255,68,68,.3)",
                boxShadow: "0 0 80px rgba(255,68,68,.3), 0 20px 80px rgba(0,0,0,.5)",
                transform: "rotateX(5deg) translateZ(20px)",
                perspective: "800px",
                transformStyle: "preserve-3d",
                animation: "gameOverCollapse 0.8s ease-out forwards",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-70"
                style={{
                  background: "linear-gradient(135deg, #ff4444, #ff6b35, #ffd600)",
                  filter: "blur(30px)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(255,68,68,.15), transparent 60%)",
                }}
              />
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 25px rgba(255,214,0,.7))",
                }}
                className="animate-bounce"
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2 tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #ff4444, #ff6b35, #ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(255,68,68,.4))",
                }}
              >
                ¡Torre Caída!
              </h2>
              <p className="text-white/50 text-sm mb-6">塔倒了！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,255,.12)",
                    border: "1px solid rgba(0,212,255,.25)",
                    boxShadow: "0 0 20px rgba(0,212,255,.15), 0 8px 32px rgba(0,0,0,.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, rgba(0,212,255,.2), transparent 70%)",
                    }}
                  />
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 8px rgba(0,212,255,.6))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Score
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 12px rgba(0,212,255,.5)",
                    }}
                  >
                    {L}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(184,41,221,.12)",
                    border: "1px solid rgba(184,41,221,.25)",
                    boxShadow: "0 0 20px rgba(184,41,221,.15), 0 8px 32px rgba(0,0,0,.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, rgba(184,41,221,.2), transparent 70%)",
                    }}
                  />
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#b829dd",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 8px rgba(184,41,221,.6))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#b829dd",
                      textShadow: "0 0 12px rgba(184,41,221,.5)",
                    }}
                  >
                    {P}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className="p-2 rounded-lg text-center"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                  }}
                >
                  <p className="text-[10px] text-white/40">Max Combo</p>
                  <p
                    className="text-sm font-black"
                    style={{
                      color: "#ffd600",
                    }}
                  >
                    x{se}
                  </p>
                </div>
                <div
                  className="p-2 rounded-lg text-center"
                  style={{
                    background: "rgba(57,255,20,.1)",
                    border: "1px solid rgba(57,255,20,.2)",
                  }}
                >
                  <p className="text-[10px] text-white/40">Nivel</p>
                  <p
                    className="text-sm font-black"
                    style={{
                      color: "#39ff14",
                    }}
                  >
                    {p}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    ue(null);
                  }}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #00d4ff, #b829dd)",
                    boxShadow: "0 0 40px rgba(0,212,255,.5), 0 8px 16px rgba(0,0,0,.3)",
                  }}
                >
                  <span className="relative z-10">Jugar de nuevo / 再玩一次</span>
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      background: "linear-gradient(135deg, #b829dd, #00d4ff)",
                    }}
                  />
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setL("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:bg-white/10"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <div className="mt-4">
                <P_1 currentGameId="word-tower" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col items-end gap-1">
        <GeComponent expression={q} combo={E} />
        <div className="px-2 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/70 border border-white/10 backdrop-blur-md animate-fadeIn">
          {q === "happy" && "¡Vamos!"}
          {q === "excited" && "¡Súper!"}
          {q === "super" && "¡INCREÍBLE!"}
          {q === "sad" && "¡Oh no!"}
          {q === "neutral" && "¡Hola!"}
        </div>
      </div>
      <style>{`
        @keyframes towerWordAppear {
          from { transform: scale(0.3) translateZ(80px) rotateX(-20deg); opacity: 0; }
          to { transform: scale(1) translateZ(30px) rotateX(0deg); opacity: 1; }
        }
        @keyframes towerWordFloat {
          0%, 100% { transform: translateY(0) translateZ(30px) rotateY(0deg); }
          25% { transform: translateY(-6px) translateZ(35px) rotateY(2deg); }
          75% { transform: translateY(-3px) translateZ(25px) rotateY(-2deg); }
        }
        @keyframes blockClear {
          0% { transform: scale(1) rotateZ(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotateZ(5deg); opacity: 0.8; }
          100% { transform: scale(0) rotateZ(15deg); opacity: 0; }
        }
        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes mascotWaveLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes mascotWaveRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes mascotBlink {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0.4; transform: scale(1.3); }
        }
        @keyframes animate-shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          50% { transform: translateX(-4px); }
          70% { transform: translateX(4px); }
          90% { transform: translateX(-2px); }
        }
        @keyframes animate-fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes levelUpPop {
          0% { transform: scale(0.5) translateY(20px); opacity: 0; }
          20% { transform: scale(1.2) translateY(0); opacity: 1; }
          40% { transform: scale(1) translateY(-10px); opacity: 1; }
          80% { transform: scale(1) translateY(-5px); opacity: 0.8; }
          100% { transform: scale(0.8) translateY(-30px); opacity: 0; }
        }
        @keyframes gameOverCollapse {
          0% { transform: scale(0.6) rotateX(15deg) translateZ(-50px); opacity: 0; filter: blur(8px); }
          40% { transform: scale(1.05) rotateX(3deg) translateZ(20px); opacity: 1; filter: blur(0px); }
          60% { transform: scale(1) rotateX(5deg) translateZ(20px); opacity: 1; }
          100% { transform: scale(1) rotateX(5deg) translateZ(20px); opacity: 1; }
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,212,255,.4), 0 0 40px rgba(0,212,255,.2); }
          50% { box-shadow: 0 0 30px rgba(0,212,255,.6), 0 0 60px rgba(0,212,255,.3); }
        }
        @keyframes screenFlashRed {
          0% { box-shadow: inset 0 0 0px rgba(255,68,68,0); }
          50% { box-shadow: inset 0 0 80px rgba(255,68,68,.5); }
          100% { box-shadow: inset 0 0 0px rgba(255,68,68,0); }
        }
        @keyframes towerWobble {
          0%, 100% { transform: rotateZ(0deg); }
          15% { transform: rotateZ(-3deg); }
          30% { transform: rotateZ(2deg); }
          45% { transform: rotateZ(-2deg); }
          60% { transform: rotateZ(1deg); }
          75% { transform: rotateZ(-1deg); }
          90% { transform: rotateZ(0.5deg); }
        }
        @keyframes scoreGlow3D {
          0%, 100% { transform: translateZ(0px) scale(1); text-shadow: 0 0 15px currentColor; }
          50% { transform: translateZ(10px) scale(1.05); text-shadow: 0 0 30px currentColor, 0 0 60px currentColor; }
        }
        @keyframes platformGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        @keyframes card3DTilt {
          0% { transform: perspective(800px) rotateX(0deg) rotateY(0deg); }
          100% { transform: perspective(800px) rotateX(2deg) rotateY(-2deg); }
        }
        .card-3d-tilt:hover {
          transform: perspective(800px) rotateX(2deg) rotateY(-2deg) scale(1.03) translateY(-4px) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,.4), 0 0 40px rgba(255,0,170,.2) !important;
        }
        .game-over-card .absolute.inset-0.pointer-events-none {
          animation: neonPulse 3s ease-in-out infinite;
        }
      `}</style>
    </StarfieldBackground>
  );
}
export { CtComponent as default };
