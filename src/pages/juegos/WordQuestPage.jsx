import {
  StarIcon,
  SparklesIcon,
  BookOpenIcon,
  HeartIcon,
  ChevronRightIcon,
  TrophyIcon,
  ArrowLeftIcon,
  SwordIcon,
  GemIcon,
  LayersIcon,
  FlameIcon,
  SkullIcon,
  CrownIcon,
  RotateCcwIcon,
  MapIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { g, b as b_1, c as c_1 } from "../../lib/juegos-utils.js";
function ve(a) {
  const o = [...a];
  for (let i = o.length - 1; i > 0; i--) {
    const l = Math.floor(Math.random() * (i + 1));
    [o[i], o[l]] = [o[l], o[i]];
  }
  return o;
}
const q = [
  {
    name: "Bosque Encantado",
    color: "#27ae60",
    bgGradient: "linear-gradient(180deg, #0a1f0a 0%, #0f3d1e 50%, #1a5c2e 100%)",
    accent: "#2ecc71",
    monsterColor: "#27ae60",
    monsterGlow: "rgba(39,174,96,0.5)",
    pathColor: "rgba(46,204,113,0.3)",
    scenery: "forest",
  },
  {
    name: "Montaña Helada",
    color: "#7f8c8d",
    bgGradient: "linear-gradient(180deg, #1a1a2e 0%, #2c3e50 50%, #34495e 100%)",
    accent: "#bdc3c7",
    monsterColor: "#95a5a6",
    monsterGlow: "rgba(149,165,166,0.5)",
    pathColor: "rgba(189,195,199,0.3)",
    scenery: "mountain",
  },
  {
    name: "Castillo Oscuro",
    color: "#8e44ad",
    bgGradient: "linear-gradient(180deg, #1a0a2e 0%, #2c0e3c 50%, #3d1a5c 100%)",
    accent: "#bb8fce",
    monsterColor: "#9b59b6",
    monsterGlow: "rgba(155,89,182,0.5)",
    pathColor: "rgba(187,143,206,0.3)",
    scenery: "castle",
  },
];
function U(a) {
  if (a < 3) {
    return 0;
  }
  if (a < 7) {
    return 1;
  }
  return 2;
}
function Je(a) {
  const o = a.filter((n) => n.espanol && n.chino && n.espanol.trim().length > 0 && n.chino.trim().length > 0);
  if (o.length < 4) {
    return [];
  }
  const i = [];
  const l = new Set();
  for (let id = 0; id < 10; id++) {
    const isBoss = id === 4 || id === 9;
    let c = isBoss
      ? o.filter((N, M) => !l.has(M) && (N.espanol.includes(" ") || N.espanol.length > 8))
      : o.filter((N, M) => !l.has(M));
    if (c.length === 0) {
      c = o.filter((N, M) => !l.has(M));
    }
    if (c.length === 0) {
      c = o;
    }
    const u = c[Math.floor(Math.random() * c.length)];
    const m = o.indexOf(u);
    l.add(m);
    const g = o.filter((N) => N.chino !== u.chino);
    const b = ve(g)
      .slice(0, 3)
      .map((N) => N.chino);
    const options = ve([u.chino, ...b]);
    const correctIndex = options.indexOf(u.chino);
    i.push({
      id,
      espanol: u.espanol,
      chino: u.chino,
      options,
      correctIndex,
      isBoss,
    });
  }
  return i;
}
function Ke(a, o, i, l = 20) {
  for (let n = 0; n < l; n++) {
    const f = document.createElement("div");
    f.style.cssText = `position:fixed;left:${a}px;top:${o}px;width:6px;height:6px;border-radius:50%;background:${i};pointer-events:none;z-index:9999;`;
    document.body.appendChild(f);
    const c = Math.random() * Math.PI * 2;
    const u = 2 + Math.random() * 6;
    let m = Math.cos(c) * u;
    let g = Math.sin(c) * u;
    let b = 1;
    const h = () => {
      m *= 0.95;
      g *= 0.95;
      g += 0.2;
      f.style.left = `${parseFloat(f.style.left) + m}px`;
      f.style.top = `${parseFloat(f.style.top) + g}px`;
      b -= 0.02;
      f.style.opacity = String(b);
      if (b > 0) {
        requestAnimationFrame(h);
      } else {
        f.remove();
      }
    };
    requestAnimationFrame(h);
  }
}
function ee(a, o, i, l) {
  const n = document.createElement("div");
  n.textContent = i;
  n.style.cssText = `position:fixed;left:${a}px;top:${o}px;color:${l};font-weight:900;font-size:24px;pointer-events:none;z-index:9999;text-shadow:0 0 10px ${l}, 0 0 20px ${l}88;transform:translateX(-50%);`;
  document.body.appendChild(n);
  let f = 1;
  let c = 0;
  const u = () => {
    c -= 1.5;
    f -= 0.015;
    n.style.transform = `translateX(-50%) translateY(${c}px)`;
    n.style.opacity = String(f);
    if (f > 0) {
      requestAnimationFrame(u);
    } else {
      n.remove();
    }
  };
  requestAnimationFrame(u);
}
function Ue(a, o) {
  const i = ["#ff00aa", "#00d4ff", "#39ff14", "#ffd600", "#ff3860", "#b829dd"];
  for (let l = 0; l < 40; l++) {
    const n = document.createElement("div");
    n.style.cssText = `position:fixed;left:${a}px;top:${o}px;width:4px;height:4px;border-radius:50%;background:${i[l % i.length]};pointer-events:none;z-index:9999;box-shadow:0 0 6px ${i[l % i.length]}, 0 0 12px ${i[l % i.length]}88;`;
    document.body.appendChild(n);
    const f = Math.random() * Math.PI * 2;
    const c = 3 + Math.random() * 8;
    let u = Math.cos(f) * c;
    let m = Math.sin(f) * c;
    let g = 1;
    const b = () => {
      u *= 0.96;
      m *= 0.96;
      m += 0.15;
      n.style.left = `${parseFloat(n.style.left) + u}px`;
      n.style.top = `${parseFloat(n.style.top) + m}px`;
      g -= 0.012;
      n.style.opacity = String(g);
      if (g > 0) {
        requestAnimationFrame(b);
      } else {
        n.remove();
      }
    };
    requestAnimationFrame(b);
  }
}
function Ne() {
  const document_body = document.body;
  document_body.style.transform = "translate(4px, 4px)";
  setTimeout(() => (document_body.style.transform = "translate(-4px, -3px)"), 50);
  setTimeout(() => (document_body.style.transform = "translate(3px, -4px)"), 100);
  setTimeout(() => (document_body.style.transform = "translate(-3px, 3px)"), 150);
  setTimeout(() => (document_body.style.transform = "translate(2px, -2px)"), 200);
  setTimeout(() => (document_body.style.transform = ""), 250);
}
const et = [
  {
    color: "#ff3860",
    label: "Rojo",
    shadow: "rgba(255,56,96,0.5)",
  },
  {
    color: "#2080ff",
    label: "Azul",
    shadow: "rgba(32,128,255,0.5)",
  },
  {
    color: "#39ff14",
    label: "Verde",
    shadow: "rgba(57,255,20,0.5)",
  },
  {
    color: "#ffd600",
    label: "Amarillo",
    shadow: "rgba(255,214,0,0.5)",
  },
];
function TtComponent({ mood, attacking }) {
  const i = mood === "shocked" ? 1.3 : mood === "sad" ? 0.6 : 1;
  const l =
    mood === "happy" || mood === "excited"
      ? "M 28 44 Q 35 50 42 44"
      : mood === "sad"
        ? "M 28 48 Q 35 42 42 48"
        : "M 32 46 Q 35 46 38 46";
  const n = mood === "happy" || mood === "excited" ? 0.5 : 0.15;
  const f = attacking ? "#ffd600" : "#c0c0c0";
  return (
    <svg width="100" height="110" viewBox="0 0 80 90" className="drop-shadow-2xl">
      <defs>
        <radialGradient id="heroSkin" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffe8d0" />
          <stop offset="100%" stopColor="#f0c8a0" />
        </radialGradient>
        <radialGradient id="swordGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor={f} />
          <stop offset="100%" stopColor={f} stopOpacity="0" />
        </radialGradient>
        <filter id="glowHero">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 15 24 Q 15 10 40 8 Q 65 10 65 24 L 62 30 L 18 30 Z"
        fill="#4a7fb5"
        stroke="#00d4ff"
        strokeWidth="1.5"
        filter="drop-shadow(0 0 5px rgba(0,212,255,.3))"
      />
      <path d="M 40 8 Q 42 2 45 4 Q 48 2 50 8" fill="#ff3860" stroke="#ff0000" strokeWidth="1" />
      <circle cx="52" cy="5" r="3" fill="#ffd600" filter="drop-shadow(0 0 4px rgba(255,214,0,.5))" />
      <rect
        x="18"
        y="22"
        width="44"
        height="6"
        rx="2"
        fill="#2a3a5c"
        stroke="#00d4ff"
        strokeWidth="1"
        opacity="0.8"
      />
      <ellipse cx="40" cy="38" rx="18" ry="16" fill="url(#heroSkin)" stroke="#d4a070" strokeWidth="1" />
      <ellipse cx="32" cy="36" rx="6" ry={7 * i} fill="#2a1a4e" />
      <ellipse cx="48" cy="36" rx="6" ry={7 * i} fill="#2a1a4e" />
      <circle cx="30" cy="33" r="2.5" fill="white" />
      <circle cx="34" cy="35" r="1.3" fill="white" opacity="0.7" />
      <circle cx="46" cy="33" r="2.5" fill="white" />
      <circle cx="50" cy="35" r="1.3" fill="white" opacity="0.7" />
      <ellipse cx="24" cy="42" rx="4" ry="2.5" fill="#ff88aa" opacity={n} />
      <ellipse cx="56" cy="42" rx="4" ry="2.5" fill="#ff88aa" opacity={n} />
      <path d={l} stroke="#8b4513" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path
        d="M 18 52 L 8 85 L 72 85 L 62 52 Q 40 58 18 52 Z"
        fill="#4a7fb5"
        stroke="#00d4ff"
        strokeWidth="1.5"
      />
      <path d="M 20 55 L 15 85 L 40 85 L 40 58 Z" fill="#2a5a8c" opacity="0.5" />
      <path d="M 60 55 L 65 85 L 40 85 L 40 58 Z" fill="#2a5a8c" opacity="0.5" />
      <rect
        x="28"
        y="56"
        width="24"
        height="20"
        rx="4"
        fill="#6a9fd5"
        stroke="#00d4ff"
        strokeWidth="1"
        filter="drop-shadow(0 0 4px rgba(0,212,255,.3))"
      />
      <circle cx="40" cy="66" r="5" fill="#ffd600" filter="drop-shadow(0 0 4px rgba(255,214,0,.5))" />
      <g transform={attacking ? "rotate(-25 65 55)" : "rotate(-5 65 55)"}>
        <line x1="58" y1="65" x2="75" y2="28" stroke="#c0c0c0" strokeWidth="4" strokeLinecap="round" />
        <line x1="75" y1="28" x2="82" y2="15" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <circle cx="82" cy="15" r="4" fill="#ffd600" filter="drop-shadow(0 0 6px rgba(255,214,0,.6))" />
        <circle cx="82" cy="15" r="8" fill="url(#swordGlow)" opacity="0.4" />
        <rect x="55" y="62" width="10" height="4" rx="1" fill="#8b4513" />
      </g>
      <ellipse
        cx="18"
        cy="68"
        rx="8"
        ry="12"
        fill="#2a5a8c"
        stroke="#00d4ff"
        strokeWidth="1.5"
        filter="drop-shadow(0 0 4px rgba(0,212,255,.3))"
      />
      <circle cx="18" cy="68" r="3" fill="#ffd600" opacity="0.8" />
      {(mood === "excited" || mood === "happy") && (
        <>
          <text x="5" y="18" fontSize="10" fill="#ffd600">
            ✨
          </text>
          <text x="68" y="14" fontSize="8" fill="#00d4ff">
            ✦
          </text>
          <text x="72" y="22" fontSize="6" fill="#39ff14">
            ★
          </text>
        </>
      )}
    </svg>
  );
}
function AtComponent({ mood }) {
  const o = mood === "shocked" ? 1.4 : mood === "sad" ? 0.5 : 1;
  const i =
    mood === "happy" || mood === "excited"
      ? "M 32 52 Q 40 60 48 52"
      : mood === "sad"
        ? "M 32 58 Q 40 50 48 58"
        : "M 38 54 Q 40 54 42 54";
  const l = mood === "happy" || mood === "excited" ? 0.6 : 0.2;
  const n = mood === "sad";
  const f = mood === "excited" || mood === "happy";
  const c = mood === "excited" ? "mascotExcited" : mood === "sad" ? "mascotSad" : "mascotFloat";
  const u = mood === "sad" ? "#6a9fd5" : "#00d4ff";
  const m = mood === "sad" ? "rgba(106,159,213,0.4)" : "rgba(0,212,255,0.5)";
  return (
    <div
      className={`${c} pointer-events-none`}
      style={{
        filter: `drop-shadow(0 0 15px ${m}) drop-shadow(0 0 30px ${m}44)`,
      }}
    >
      <svg width="90" height="100" viewBox="0 0 100 110" className="overflow-visible">
        <defs>
          <radialGradient id="mascotBodyGrad" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor={u} />
            <stop offset="100%" stopColor={mood === "sad" ? "#4a7fb5" : "#2080ff"} />
          </radialGradient>
          <radialGradient id="mascotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={m} stopOpacity="0.6" />
            <stop offset="100%" stopColor={m} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="55" rx="45" ry="48" fill="url(#mascotGlow)" opacity="0.6" />
        <path
          d="M 20 55 Q 15 25, 50 20 Q 85 25, 80 55 Q 85 85, 50 90 Q 15 85, 20 55 Z"
          fill="url(#mascotBodyGrad)"
          stroke="#ffffff"
          strokeWidth="1.5"
          opacity="0.95"
        />
        <ellipse cx="35" cy="38" rx="12" ry="8" fill="rgba(255,255,255,0.25)" transform="rotate(-20 35 38)" />
        <path
          d="M 22 28 Q 50 10, 78 28 L 75 32 Q 50 18, 25 32 Z"
          fill="#8b4513"
          stroke="#5a2d0c"
          strokeWidth="1"
        />
        <path d="M 50 12 Q 55 5, 60 12" fill="#ff3860" stroke="#ff0000" strokeWidth="1" />
        <circle cx="58" cy="8" r="3" fill="#ffd600" filter="drop-shadow(0 0 3px rgba(255,214,0,.5))" />
        <ellipse cx="35" cy="48" rx="7" ry={8 * o} fill="#1a1a2e" />
        <ellipse cx="65" cy="48" rx="7" ry={8 * o} fill="#1a1a2e" />
        <circle cx="32" cy="44" r="2.5" fill="white" />
        <circle cx="37" cy="46" r="1.2" fill="white" opacity="0.7" />
        <circle cx="62" cy="44" r="2.5" fill="white" />
        <circle cx="67" cy="46" r="1.2" fill="white" opacity="0.7" />
        <ellipse cx="22" cy="55" rx="5" ry="3" fill="#ff88aa" opacity={l} />
        <ellipse cx="78" cy="55" rx="5" ry="3" fill="#ff88aa" opacity={l} />
        <path d={i} stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {n && (
          <>
            <circle cx="28" cy="52" r="2.5" fill="#00d4ff" opacity="0.8">
              <animate attributeName="cy" values="52;65;52" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="72" cy="52" r="2.5" fill="#00d4ff" opacity="0.8">
              <animate attributeName="cy" values="52;65;52" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2.2s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        {f && (
          <>
            <text x="8" y="25" fontSize="12" fill="#ffd600">
              ✨
            </text>
            <text x="78" y="18" fontSize="10" fill="#39ff14">
              ★
            </text>
            <text x="85" y="35" fontSize="8" fill="#ff3860">
              ✦
            </text>
          </>
        )}
        <ellipse cx="30" cy="88" rx="8" ry="5" fill="url(#mascotBodyGrad)" opacity="0.8" />
        <ellipse cx="70" cy="88" rx="8" ry="5" fill="url(#mascotBodyGrad)" opacity="0.8" />
      </svg>
    </div>
  );
}
function StComponent({ active }) {
  const oRef = React.useRef(null);
  React.useEffect(() => {
    if (!active) {
      return;
    }
    const oRef_current = oRef.current;
    if (!oRef_current) {
      return;
    }
    const l = oRef_current.getContext("2d");
    if (!l) {
      return;
    }
    const { innerWidth, innerHeight } = window;
    oRef_current.width = innerWidth;
    oRef_current.height = innerHeight;
    const c = ["#ff3860", "#00d4ff", "#39ff14", "#ffd600", "#ff00aa", "#b829dd", "#ff6b35", "#ffffff"];
    const u = [];
    for (let b = 0; b < 180; b++) {
      u.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight * 0.5 - innerHeight * 0.3,
        w: 4 + Math.random() * 8,
        h: 4 + Math.random() * 8,
        color: c[Math.floor(Math.random() * c.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: 1 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        gravity: 0.05 + Math.random() * 0.08,
        opacity: 1,
      });
    }
    let m;
    const g = () => {
      l.clearRect(0, 0, innerWidth, innerHeight);
      let b = 0;
      for (const h of u) {
        if (!(h.opacity <= 0)) {
          b++;
          h.vy += h.gravity;
          h.x += h.vx;
          h.y += h.vy;
          h.rotation += h.rotSpeed;
          h.opacity -= 0.002;
          l.save();
          l.translate(h.x, h.y);
          l.rotate((h.rotation * Math.PI) / 180);
          l.globalAlpha = Math.max(0, h.opacity);
          l.fillStyle = h.color;
          l.fillRect(-h.w / 2, -h.h / 2, h.w, h.h);
          l.restore();
        }
      }
      if (b > 0) {
        m = requestAnimationFrame(g);
      }
    };
    m = requestAnimationFrame(g);
    return () => cancelAnimationFrame(m);
  }, [active]);
  if (active) {
    return <canvas ref={oRef} className="fixed inset-0 pointer-events-none z-50" />;
  }
  return null;
}
function RtComponent({ isBoss, hit, mood, color, accent, glow }) {
  const width = isBoss ? 80 : 56;
  const u = isBoss ? 80 : 52;
  const m = isBoss ? "15% 15% 50% 50%" : "50% 50% 40% 40%";
  const background = isBoss
    ? `linear-gradient(135deg, ${color}, #2c0e3c)`
    : `radial-gradient(circle, ${color}, ${color}dd)`;
  const boxShadow = `0 0 ${isBoss ? 50 : 35}px ${glow}, 0 0 ${isBoss ? 90 : 55}px ${glow}44, inset 0 0 20px rgba(255,255,255,0.1)`;
  const top = mood === "sad" ? "30%" : "25%";
  const w = mood === "sad" ? 0.6 : 1;
  const N = mood === "sad" ? "50% 50% 0 0" : "50%";
  const M = 6;
  const bottom = mood === "sad" ? "28%" : "25%";
  return (
    <div
      style={{
        width,
        height: u,
        background,
        borderRadius: m,
        boxShadow,
        position: "relative",
        transition: "all 0.4s ease",
        opacity: hit ? 0.4 : 1,
      }}
    >
      {mood === "angry" && (
        <>
          <div
            className="absolute bg-white rounded-full"
            style={{
              width: 10,
              height: 2,
              top: "16%",
              left: "16%",
              transform: "rotate(30deg)",
              transition: "all 0.3s ease",
            }}
          />
          <div
            className="absolute bg-white rounded-full"
            style={{
              width: 10,
              height: 2,
              top: "16%",
              right: "16%",
              transform: "rotate(-30deg)",
              transition: "all 0.3s ease",
            }}
          />
        </>
      )}
      {mood === "sad" && (
        <>
          <div
            className="absolute bg-white/50 rounded-full"
            style={{
              width: 8,
              height: 2,
              top: "20%",
              left: "20%",
              transform: "rotate(-20deg)",
              transition: "all 0.3s ease",
            }}
          />
          <div
            className="absolute bg-white/50 rounded-full"
            style={{
              width: 8,
              height: 2,
              top: "20%",
              right: "20%",
              transform: "rotate(20deg)",
              transition: "all 0.3s ease",
            }}
          />
        </>
      )}
      <div
        className="absolute bg-white rounded-full"
        style={{
          width: 10,
          height: 10 * w,
          top,
          left: "22%",
          animation: "eyeBlink 3s ease-in-out infinite",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="absolute bg-black rounded-full"
          style={{
            width: 4,
            height: 4,
            top: 3,
            left: 3,
          }}
        />
      </div>
      <div
        className="absolute bg-white rounded-full"
        style={{
          width: 10,
          height: 10 * w,
          top,
          right: "22%",
          animation: "eyeBlink 3s ease-in-out infinite 0.15s",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="absolute bg-black rounded-full"
          style={{
            width: 4,
            height: 4,
            top: 3,
            left: 3,
          }}
        />
      </div>
      <div
        className="absolute bg-white/20 rounded-full"
        style={{
          height: M,
          bottom,
          left: "28%",
          right: "28%",
          borderRadius: N,
          transition: "all 0.3s ease",
        }}
      />
      {isBoss && (
        <>
          <div
            className="absolute"
            style={{
              top: -12,
              left: "15%",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: `14px solid ${accent}`,
            }}
          />
          <div
            className="absolute"
            style={{
              top: -12,
              right: "15%",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: `14px solid ${accent}`,
            }}
          />
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <CrownIcon
              size={18}
              className="text-yellow-400"
              fill="#ffd600"
              style={{
                filter: "drop-shadow(0 0 6px #ffd600)",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
function LtComponent({ children, className }) {
  return (
    <div className={`relative ${className || ""}`}>
      <div
        className="absolute -inset-[2px] rounded-3xl"
        style={{
          background: "linear-gradient(90deg, #ff3860, #ffd600, #00d4ff, #39ff14, #ff00aa, #ff3860)",
          backgroundSize: "200% 200%",
          animation: "borderRotate 3s linear infinite",
          zIndex: 0,
          borderRadius: "inherit",
        }}
      />
      <div
        className="relative z-10 h-full w-full rounded-3xl overflow-hidden"
        style={{
          borderRadius: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}
function OtComponent({ accent, count }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        opacity: 0.4,
      }}
    >
      {Array.from({
        length: count,
      }).map((i, l) => (
        <div
          key={l}
          className="absolute rounded-full"
          style={{
            width: 2 + (l % 3) * 2,
            height: 2 + (l % 3) * 2,
            background: l % 5 === 0 ? "#ffffff" : accent,
            left: `${(l * 47) % 100}%`,
            top: `${(l * 31) % 100}%`,
            animation: `floatParticle ${4 + (l % 6) * 2}s ease-in-out infinite`,
            animationDelay: `${(l * 0.3) % 4}s`,
            boxShadow: `0 0 ${4 + (l % 3) * 3}px ${l % 5 === 0 ? "rgba(255,255,255,0.4)" : `${accent}60`}`,
            opacity: 0.3 + (l % 4) * 0.15,
          }}
        />
      ))}
    </div>
  );
}
function NtComponent({ terrainIndex }) {
  const scenery = q[terrainIndex].scenery;
  switch (scenery) {
    case "forest":
      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          style={{
            zIndex: 0,
          }}
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2ecc71" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1a5c2e" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M 20 280 L 35 220 L 50 280 Z" fill="url(#treeGrad)" />
          <path d="M 30 280 L 45 200 L 60 280 Z" fill="url(#treeGrad)" opacity="0.7" />
          <path d="M 350 280 L 370 210 L 390 280 Z" fill="url(#treeGrad)" />
          <path d="M 330 280 L 350 190 L 370 280 Z" fill="url(#treeGrad)" opacity="0.6" />
          <path d="M 100 280 L 115 240 L 130 280 Z" fill="url(#treeGrad)" opacity="0.5" />
          <path d="M 280 280 L 295 235 L 310 280 Z" fill="url(#treeGrad)" opacity="0.5" />
          <circle cx="80" cy="150" r="2" fill="#39ff14" opacity="0.4">
            <animate attributeName="cy" values="150;120;150" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="180" r="1.5" fill="#2ecc71" opacity="0.5">
            <animate attributeName="cy" values="180;140;180" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case "mountain":
      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          style={{
            zIndex: 0,
          }}
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bdc3c7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2c3e50" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 0 280 L 80 120 L 160 280 Z" fill="url(#mtnGrad)" />
          <path d="M 120 280 L 200 80 L 280 280 Z" fill="url(#mtnGrad)" opacity="0.7" />
          <path d="M 240 280 L 320 140 L 400 280 Z" fill="url(#mtnGrad)" opacity="0.5" />
          <path d="M 68 140 L 80 120 L 92 140 Z" fill="rgba(255,255,255,0.4)" />
          <path d="M 188 100 L 200 80 L 212 100 Z" fill="rgba(255,255,255,0.4)" />
          <path d="M 308 160 L 320 140 L 332 160 Z" fill="rgba(255,255,255,0.3)" />
          <circle cx="50" cy="80" r="1.5" fill="white" opacity="0.5">
            <animate attributeName="cy" values="80;260;80" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="350" cy="50" r="2" fill="white" opacity="0.4">
            <animate attributeName="cy" values="50;270;50" dur="10s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="60" r="1" fill="white" opacity="0.6">
            <animate attributeName="cy" values="60;250;60" dur="7s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    default:
      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          style={{
            zIndex: 0,
          }}
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="castleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8e44ad" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect x="150" y="180" width="100" height="100" fill="url(#castleGrad)" />
          <rect x="140" y="160" width="20" height="40" fill="url(#castleGrad)" />
          <rect x="240" y="160" width="20" height="40" fill="url(#castleGrad)" />
          <rect x="190" y="140" width="20" height="50" fill="url(#castleGrad)" />
          <path d="M 140 160 L 150 140 L 160 160 Z" fill="url(#castleGrad)" />
          <path d="M 240 160 L 250 140 L 260 160 Z" fill="url(#castleGrad)" />
          <path d="M 190 140 L 200 120 L 210 140 Z" fill="url(#castleGrad)" />
          <rect x="165" y="200" width="8" height="12" fill="#ffd600" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="227" y="200" width="8" height="12" fill="#ffd600" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="196" y="220" width="8" height="12" fill="#ffd600" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <ellipse cx="100" cy="280" rx="80" ry="15" fill="rgba(187,143,206,0.2)">
            <animate attributeName="cx" values="100;120;100" dur="6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="300" cy="270" rx="60" ry="12" fill="rgba(187,143,206,0.15)">
            <animate attributeName="cx" values="300;280;300" dur="8s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      );
  }
}
function YtComponent() {
  const [a, setA] = React.useState("select");
  const [i, setI] = React.useState(null);
  const [n, setN] = React.useState([]);
  const [c, setC] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [b, setB] = React.useState(3);
  const [w, setW] = React.useState(null);
  const [M, setM_1] = React.useState(null);
  const [C, setC_1] = React.useState(false);
  const [L, setL] = React.useState(false);
  const [B, setB_1] = React.useState(false);
  const [R, setR] = React.useState(false);
  const [$, set$] = React.useState(100);
  const [Se, setSe] = React.useState([]);
  const [re, setRe] = React.useState("");
  const [Me, setMe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordquest_best") || "0");
    } catch {
      return 0;
    }
  });
  const [Ce, setCe] = React.useState(false);
  const [oe, setOe] = React.useState("neutral");
  const [ze, setZe] = React.useState(false);
  const [Te, setTe] = React.useState(false);
  const [Ze, setZe_1] = React.useState("neutral");
  const [active, setActive] = React.useState(false);
  const Ye = g();
  const IRef = React.useRef(null);
  const FeRef = React.useRef(null);
  const deRef = React.useRef(null);
  const FRef = React.useRef(null);
  const P = React.useCallback((t) => {
    let s = t ? b_1(t) : c_1();
    if (s.length === 0) {
      setRe('Este módulo no tiene vocabulario válido. Prueba con otro o selecciona "Todos los módulos".');
      return;
    }
    const r = s.filter((x) => x.espanol && x.chino);
    const d = Je(r);
    if (d.length === 0) {
      setRe("No hay suficientes palabras para generar el juego. Prueba con otro módulo.");
      return;
    }
    setN(d);
    setI(t);
    setC(0);
    setM(0);
    setB(3);
    setSe([]);
    setRe("");
    setOe("neutral");
    setA("map");
  }, []);
  const onClick = React.useCallback(() => {
    if (c >= n.length) {
      setA("victory");
      setMe((s) => {
        const r = Math.max(s, m);
        try {
          localStorage.setItem("wordquest_best", String(r));
        } catch {}
        return r;
      });
      return;
    }
    const t = n[c];
    setW(t);
    set$(100);
    setM_1(null);
    setC_1(false);
    setB_1(false);
    setR(false);
    setA("battle");
  }, [n, c, m]);
  const Xe = React.useCallback(
    (t) => {
      if (C || !w) {
        return;
      }
      setM_1(t);
      setC_1(true);
      const s = t === w.correctIndex;
      setL(s);
      if (s) {
        setB_1(true);
        setOe("excited");
        if (FRef.current) {
          clearTimeout(FRef.current);
        }
        FRef.current = setTimeout(() => setOe("neutral"), 1500);
        setTimeout(() => {
          setR(true);
          set$(0);
          setZe_1("sad");
          const IRef_current = IRef.current;
          if (IRef_current) {
            const x = IRef_current.getBoundingClientRect();
            Ke(x.left + x.width / 2, x.top + x.height / 2, "#00d4ff", 40);
            ee(x.left + x.width / 2, x.top, w.isBoss ? "¡CRÍTICO!" : "¡GOLPE!", "#00d4ff");
          }
          const d = w.isBoss ? 200 : 100;
          setM((x) => x + d);
        }, 600);
        setTimeout(() => {
          setB_1(false);
          setR(false);
          setSe((r) => [...r, c]);
          setCe(true);
          setZe(true);
          setTimeout(() => setCe(false), 300);
          setTimeout(() => setZe(false), 800);
          setC((r) => r + 1);
          setA("map");
        }, 1800);
      } else {
        setOe("sad");
        setZe_1("angry");
        setTe(true);
        setTimeout(() => setTe(false), 500);
        if (FRef.current) {
          clearTimeout(FRef.current);
        }
        FRef.current = setTimeout(() => setOe("neutral"), 1500);
        setB((r) => {
          const d = r - 1;
          if (d <= 0) {
            Ne();
            const x = IRef.current;
            if (x) {
              const y = x.getBoundingClientRect();
              ee(y.left + y.width / 2, y.top + y.height / 2, "¡ATAQUE!", "#ff3860");
            }
            setTimeout(() => {
              setA("gameover");
              setMe((y) => {
                const z = Math.max(y, m);
                try {
                  localStorage.setItem("wordquest_best", String(z));
                } catch {}
                return z;
              });
            }, 1500);
          } else {
            Ne();
            const x = IRef.current;
            if (x) {
              const y = x.getBoundingClientRect();
              ee(y.left + y.width / 2, y.top + y.height / 2, "¡OUCH!", "#ff3860");
            }
            setTimeout(() => {
              setM_1(null);
              setC_1(false);
            }, 1500);
          }
          return d;
        });
      }
    },
    [C, w, c, m],
  );
  React.useEffect(() => {
    if (a === "victory") {
      setActive(true);
      const t = setInterval(() => {
        const s = Math.random() * window.innerWidth;
        const r = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.1;
        Ue(s, r);
      }, 400);
      return () => {
        clearInterval(t);
        setActive(false);
      };
    } else {
      setActive(false);
    }
  }, [a]);
  React.useEffect(
    () => () => {
      if (deRef.current) {
        cancelAnimationFrame(deRef.current);
      }
    },
    [],
  );
  const terrainIndex = U(c);
  const v = q[terrainIndex];
  const T = React.useMemo(() => {
    const t = Math.floor(m / 100);
    if (t >= 10) {
      return 3;
    }
    if (t >= 7) {
      return 2;
    }
    if (t >= 4) {
      return 1;
    }
    return 0;
  }, [m]);
  const AeComponent = () => (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 min-h-screen flex flex-col items-center justify-center">
      <Link
        to="/juegos"
        className="absolute top-4 left-4 inline-flex items-center gap-2 text-white/50 hover:text-orange-400 transition-colors text-sm font-bold z-10"
      >
        <ArrowLeftIcon size={16} /> Volver / 返回
      </Link>
      <div className="text-center mb-8 md:mb-10 relative">
        <div
          className="absolute -inset-10 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,56,96,.6), rgba(255,214,0,.3), transparent 70%)",
            filter: "blur(30px)",
            animation: "pulseGlow 4s ease-in-out infinite",
          }}
        />
        <div className="relative inline-block mb-4">
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto"
            style={{
              background: "linear-gradient(135deg,#ff3860,#ffd600)",
              boxShadow:
                "0 0 60px rgba(255,56,96,0.5), 0 0 100px rgba(255,214,0,0.3), 0 0 150px rgba(255,56,96,0.2)",
            }}
          >
            <SwordIcon
              size={36}
              className="text-white"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
              }}
            />
          </div>
          <div
            className="absolute -inset-4 rounded-3xl opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(255,56,96,.5), transparent 70%)",
              filter: "blur(20px)",
              animation: "pulseGlow 3s ease-in-out infinite",
            }}
          />
        </div>
        <h1
          className="text-4xl md:text-6xl font-black text-white mb-2 relative"
          style={{
            textShadow:
              "0 0 40px rgba(255,56,96,0.4), 0 0 80px rgba(255,214,0,0.2), 0 0 120px rgba(255,56,96,0.1)",
          }}
        >
          Word Quest
        </h1>
        <p className="text-white/50 text-base md:text-lg font-bold">Aventura de Palabras / 单词冒险</p>
        <p className="text-white/30 text-xs md:text-sm mt-2 max-w-md mx-auto">
          Embárcate en una épica aventura RPG. ¡Derrota monstruos con palabras! /
          踏上史诗RPG冒险，用单词击败怪物！
        </p>
        <div
          className="absolute -top-4 -left-8 md:-left-16 text-yellow-400 opacity-60"
          style={{
            animation: "floatParticle 3s ease-in-out infinite",
          }}
        >
          <StarIcon size={20} fill="#ffd600" />
        </div>
        <div
          className="absolute top-8 -right-6 md:-right-12 text-cyan-400 opacity-50"
          style={{
            animation: "floatParticle 4s ease-in-out infinite 1s",
          }}
        >
          <SparklesIcon size={18} />
        </div>
        <div
          className="absolute bottom-0 left-0 md:-left-8 text-green-400 opacity-40"
          style={{
            animation: "floatParticle 3.5s ease-in-out infinite 0.5s",
          }}
        >
          <GemIcon size={16} />
        </div>
      </div>
      {re && (
        <div
          className="max-w-xl mx-auto mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-bold text-center"
          style={{
            boxShadow: "0 0 20px rgba(255,56,96,0.1)",
          }}
        >
          {re}
        </div>
      )}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full"
        style={{
          perspective: "1000px",
        }}
      >
        <button
          onClick={() => P(null)}
          className="group relative p-4 md:p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={(t) => {
            t.currentTarget.style.background = "rgba(255,0,170,0.12)";
            t.currentTarget.style.borderColor = "rgba(255,0,170,0.4)";
            t.currentTarget.style.boxShadow =
              "0 0 30px rgba(255,0,170,0.2), 0 0 60px rgba(255,0,170,0.1), 0 0 100px rgba(255,0,170,0.05)";
            t.currentTarget.style.transform =
              "perspective(800px) rotateY(-5deg) rotateX(3deg) translateZ(30px) scale(1.03)";
          }}
          onMouseLeave={(t) => {
            t.currentTarget.style.background = "rgba(255,255,255,0.06)";
            t.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
            t.currentTarget.style.boxShadow = "";
            t.currentTarget.style.transform =
              "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)";
          }}
        >
          <div className="absolute -right-2 -top-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayersIcon size={80} className="text-orange-400" />
          </div>
          <LayersIcon size={28} className="text-orange-400 mb-3 relative z-10" />
          <h3 className="text-white font-bold text-lg relative z-10">Todos los módulos</h3>
          <p className="text-white/40 text-sm relative z-10">所有模块</p>
        </button>
        {Ye.map((t) => (
          <button
            key={t.id}
            onClick={() => P(t.id)}
            className="group relative p-4 md:p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(10px)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={(s) => {
              s.currentTarget.style.background = `${t.color}12`;
              s.currentTarget.style.borderColor = `${t.color}60`;
              s.currentTarget.style.boxShadow = `0 0 30px ${t.color}30, 0 0 60px ${t.color}15, 0 0 100px ${t.color}08`;
              s.currentTarget.style.transform =
                "perspective(800px) rotateY(-5deg) rotateX(3deg) translateZ(30px) scale(1.03)";
            }}
            onMouseLeave={(s) => {
              s.currentTarget.style.background = "rgba(255,255,255,0.06)";
              s.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              s.currentTarget.style.boxShadow = "";
              s.currentTarget.style.transform =
                "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)";
            }}
          >
            <div className="absolute -right-2 -top-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpenIcon
                size={80}
                className="text-white"
                style={{
                  color: t.color,
                }}
              />
            </div>
            <BookOpenIcon
              size={28}
              className="mb-3 relative z-10"
              style={{
                color: t.color,
              }}
            />
            <h3 className="text-white font-bold text-lg relative z-10">{t.titulo}</h3>
            <p className="text-white/40 text-sm relative z-10">{t.tituloChino}</p>
            <p className="text-white/30 text-xs mt-1 relative z-10">{t.vocabularioCount} palabras</p>
          </button>
        ))}
      </div>
    </div>
  );
  const BeComponent = () => (
    <div className="max-w-5xl mx-auto px-3 md:px-4 py-4 md:py-6 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <Link
          to="/juegos"
          className="inline-flex items-center gap-2 text-white/50 hover:text-orange-400 transition-colors text-xs md:text-sm font-bold"
        >
          <ArrowLeftIcon size={16} /> Volver / 返回
        </Link>
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className="flex items-center gap-1 text-xs md:text-sm font-bold"
            style={{
              color: "#ff3860",
              textShadow: "0 0 10px rgba(255,56,96,0.3)",
            }}
          >
            <HeartIcon size={16} fill="#ff3860" /> <span className="text-base md:text-lg">{b}</span>
          </div>
          <div
            className="flex items-center gap-1 text-xs md:text-sm font-bold"
            style={{
              color: "#ffd600",
              textShadow: "0 0 10px rgba(255,214,0,0.3)",
            }}
          >
            <StarIcon size={16} fill="#ffd600" /> <span className="text-base md:text-lg">{m}</span>
          </div>
        </div>
      </div>
      <div className="text-center mb-4 md:mb-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          <MapIcon size={18} className="text-white/40" />
          <h2
            className="text-xl md:text-2xl font-bold text-white"
            style={{
              textShadow: `0 0 20px ${v.accent}50, 0 0 40px ${v.accent}30`,
            }}
          >
            {v.name}
          </h2>
        </div>
        <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-wider font-bold">
          Nivel {Math.min(c + 1, 10)} / 10 · {v.name}
        </p>
      </div>
      <div
        className="flex-1 flex items-center justify-center relative min-h-[350px] md:min-h-[400px]"
        style={{
          perspective: "1200px",
        }}
      >
        <div
          className="relative w-full max-w-2xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <NtComponent terrainIndex={terrainIndex} />
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              zIndex: 0,
              filter: `drop-shadow(0 0 12px ${v.accent})`,
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 10 20 Q 30 8, 50 20 T 90 20 M 90 20 Q 70 35, 50 50 T 10 50 M 10 50 Q 30 65, 50 80 T 90 80"
              fill="none"
              stroke={v.pathColor}
              strokeWidth="2.5"
              strokeDasharray="3 2"
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 10px ${v.accent}) drop-shadow(0 0 20px ${v.accent}66)`,
              }}
            />
            {[0, 1, 2].map((t) => (
              <circle key={t} cx={15 + t * 35} cy={20} r="2" fill={v.accent} opacity="0.6">
                <animate
                  attributeName="opacity"
                  values="0.3;0.9;0.3"
                  dur={`${2 + t}s`}
                  repeatCount="indefinite"
                />
                <animate attributeName="r" values="1.5;2.5;1.5" dur={`${2 + t}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {[...Array(6)].map((t, s) => (
              <circle
                key={`sparkle-${s}`}
                cx={10 + s * 16}
                cy={18 + (s % 3) * 30}
                r="1"
                fill={v.accent}
                opacity="0.4"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.7;0"
                  dur={`${3 + s * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
          <div
            className="grid grid-cols-5 gap-x-2 md:gap-x-4 gap-y-8 md:gap-y-10 relative"
            style={{
              zIndex: 1,
              transform: "rotateX(5deg) translateZ(10px)",
              transformStyle: "preserve-3d",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => {
              const s = U(t);
              const r = q[s];
              const d = t === c;
              const x = Se.includes(t);
              const y = t === 4 || t === 9;
              const z = Math.floor(t / 5);
              const Z = z % 2 === 0 ? t % 5 : 4 - (t % 5);
              return (
                <div
                  key={t}
                  className="flex flex-col items-center relative"
                  style={{
                    gridColumn: Z + 1,
                    gridRow: z + 1,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold relative transition-all duration-500"
                    style={{
                      background: x ? `${r.color}30` : d ? `${r.accent}25` : "rgba(255,255,255,0.05)",
                      border: `2.5px solid ${d ? r.accent : x ? r.color : "rgba(255,255,255,0.15)"}`,
                      boxShadow: d
                        ? `0 0 30px ${r.accent}80, 0 0 60px ${r.accent}50, 0 0 100px ${r.accent}25, 0 0 150px ${r.accent}15, inset 0 0 20px ${r.accent}30, 0 20px 40px rgba(0,0,0,0.3)`
                        : x
                          ? `0 0 20px ${r.color}60, 0 0 40px ${r.color}30, 0 0 80px ${r.color}15`
                          : "none",
                      transform: d
                        ? "translateZ(45px) scale(1.2)"
                        : x
                          ? "translateZ(15px) scale(1.05)"
                          : "translateZ(0px) scale(1)",
                      animation: d ? "nodePulse 2s ease-in-out infinite" : "none",
                      transformStyle: "preserve-3d",
                    }}
                    onMouseMove={(j) => {
                      const k = j.currentTarget.getBoundingClientRect();
                      const A = (j.clientX - k.left) / k.width - 0.5;
                      const S = (j.clientY - k.top) / k.height - 0.5;
                      j.currentTarget.style.transform = `perspective(600px) rotateY(${A * 25}deg) rotateX(${-S * 25}deg) translateZ(60px) scale(1.25)`;
                      j.currentTarget.style.zIndex = "10";
                    }}
                    onMouseLeave={(j) => {
                      j.currentTarget.style.transform = d
                        ? "translateZ(45px) scale(1.2)"
                        : x
                          ? "translateZ(15px) scale(1.05)"
                          : "translateZ(0px) scale(1)";
                      j.currentTarget.style.zIndex = "";
                    }}
                  >
                    {x ? (
                      <div className="flex items-center justify-center">
                        <StarIcon
                          size={20}
                          fill={r.color}
                          className="text-white"
                          style={{
                            filter: `drop-shadow(0 0 8px ${r.color})`,
                          }}
                        />
                      </div>
                    ) : d ? (
                      <div
                        className="relative w-6 h-8 md:w-7 md:h-9"
                        style={{
                          transform: "translateZ(10px)",
                        }}
                      >
                        <div
                          style={{
                            animation: "heroIdle 1.5s ease-in-out infinite",
                          }}
                        >
                          <div
                            className="w-4 h-4 md:w-5 md:h-5 bg-yellow-400 rounded-full absolute top-0 left-0.5 md:left-1 border border-orange-500"
                            style={{
                              boxShadow: "0 0 10px #ffd600, 0 0 20px rgba(255,214,0,0.5)",
                            }}
                          />
                          <div
                            className="w-4 h-3 md:w-5 md:h-4 bg-blue-500 rounded absolute top-4 md:top-5 left-0.5 md:left-1"
                            style={{
                              boxShadow: "0 0 8px #00d4ff",
                            }}
                          />
                          <div
                            className="w-1 h-4 md:h-5 bg-gray-300 absolute top-1.5 md:top-2 -right-1 rounded-sm"
                            style={{
                              transform: "rotate(25deg)",
                              transformOrigin: "bottom center",
                              boxShadow: "0 0 6px rgba(255,255,255,0.5)",
                            }}
                          />
                          <div
                            className="w-3 h-2.5 md:w-4 md:h-3 bg-red-500/80 absolute top-4 md:top-5 -left-0.5 md:-left-1 rounded-l"
                            style={{
                              animation: "capeWave 1s ease-in-out infinite",
                              boxShadow: "0 0 6px rgba(255,56,96,0.5)",
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-white/30 font-black text-sm md:text-base">{t + 1}</span>
                    )}
                    {y && !x && (
                      <div
                        className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center"
                        style={{
                          background: "#ff3860",
                          boxShadow:
                            "0 0 15px #ff3860, 0 0 30px rgba(255,56,96,.6), 0 0 50px rgba(255,56,96,.3), 0 0 80px rgba(255,56,96,.2)",
                          animation: "bossPulse 1.5s ease-in-out infinite",
                        }}
                      >
                        <FlameIcon size={10} className="text-white" />
                      </div>
                    )}
                    {x && (
                      <div
                        className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center bg-yellow-500/80"
                        style={{
                          boxShadow: "0 0 8px rgba(255,214,0,0.5), 0 0 16px rgba(255,214,0,0.3)",
                        }}
                      >
                        <GemIcon size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  {d && (
                    <div
                      className="mt-2 px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold text-white animate-bounce"
                      style={{
                        background: `${r.color}40`,
                        border: `1px solid ${r.color}60`,
                        boxShadow: `0 0 10px ${r.color}40, 0 0 20px ${r.color}25`,
                        transform: "translateZ(20px)",
                      }}
                    >
                      {y ? "¡BOSS!" : "¡BATALLA!"}
                    </div>
                  )}
                  {x && (
                    <div
                      className="mt-1 text-[9px] md:text-[10px] font-bold"
                      style={{
                        color: `${r.color}aa`,
                        transform: "translateZ(10px)",
                      }}
                    >
                      ✓ Conquistado
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-center mt-4 md:mt-6 mb-4">
        {c < 10 ? (
          <button
            onClick={onClick}
            className="px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-bold text-base md:text-lg transition-all hover:scale-105 flex items-center gap-2 md:gap-3 mx-auto"
            style={{
              background:
                c === 4 || c === 9
                  ? "linear-gradient(135deg, #ff3860, #ff00aa)"
                  : "linear-gradient(135deg, #00d4ff, #39ff14)",
              boxShadow:
                c === 4 || c === 9
                  ? "0 0 40px rgba(255,56,96,0.4), 0 0 80px rgba(255,0,170,0.2), 0 0 120px rgba(255,56,96,0.1)"
                  : "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(57,255,20,0.2), 0 0 120px rgba(0,212,255,0.1)",
            }}
          >
            <SwordIcon size={18} />
            {c === 4 || c === 9 ? "¡Enfrentar al Jefe! / 迎战Boss!" : "¡Siguiente Batalla! / 下一战!"}
            <ChevronRightIcon size={18} />
          </button>
        ) : (
          <button
            onClick={() => {
              setA("victory");
              setMe((t) => {
                const s = Math.max(t, m);
                try {
                  localStorage.setItem("wordquest_best", String(s));
                } catch {}
                return s;
              });
            }}
            className="px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-bold text-base md:text-lg transition-all hover:scale-105 flex items-center gap-2 md:gap-3 mx-auto"
            style={{
              background: "linear-gradient(135deg, #ffd600, #ff6b35)",
              boxShadow:
                "0 0 40px rgba(255,214,0,0.4), 0 0 80px rgba(255,107,53,0.2), 0 0 120px rgba(255,214,0,0.1)",
            }}
          >
            <TrophyIcon size={18} /> ¡Ver Victoria! / 查看胜利! <ChevronRightIcon size={18} />
          </button>
        )}
      </div>
    </div>
  );
  const ReComponent = () => {
    if (!w) {
      return null;
    }
    const w_isBoss = w.isBoss;
    const s = U(c);
    const r = q[s];
    return (
      <div
        className="max-w-3xl mx-auto px-3 md:px-4 py-4 md:py-6 min-h-screen flex flex-col"
        style={{
          perspective: "1000px",
        }}
      >
        <LtComponent className="flex-1 flex flex-col items-center justify-center p-2 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setA("map")}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs md:text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Mapa / 地图
            </button>
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className="flex items-center gap-1 text-xs md:text-sm font-bold"
                style={{
                  color: "#ff3860",
                  textShadow: "0 0 10px rgba(255,56,96,0.3)",
                }}
              >
                <HeartIcon size={16} fill="#ff3860" /> <span className="text-base md:text-lg">{b}</span>
              </div>
              <div
                className="flex items-center gap-1 text-xs md:text-sm font-bold"
                style={{
                  color: "#ffd600",
                  textShadow: "0 0 10px rgba(255,214,0,0.3)",
                }}
              >
                <StarIcon size={16} fill="#ffd600" /> <span className="text-base md:text-lg">{m}</span>
              </div>
            </div>
          </div>
          <div className="text-center mb-3">
            <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-wider">
              Nivel {c + 1} / 10 {w_isBoss && "· ¡JEFE FINAL!"}
            </span>
          </div>
          <div
            className="flex-1 flex flex-col items-center justify-center relative mb-4 min-h-[260px] md:min-h-[300px]"
            style={{
              transformStyle: "preserve-3d",
              perspective: "800px",
            }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 md:w-80 h-16 rounded-[100%] opacity-20"
              style={{
                background: `radial-gradient(ellipse, ${r.accent}44, transparent 70%)`,
                filter: "blur(15px)",
                transform: "rotateX(60deg) translateZ(-20px)",
              }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 md:w-72 h-12 rounded-[100%] opacity-10"
              style={{
                background: `radial-gradient(ellipse, ${r.accent}66, transparent 60%)`,
                filter: "blur(10px)",
                transform: "rotateX(60deg) translateZ(-10px)",
              }}
            />
            <div
              className="relative mb-4"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                ref={IRef}
                className="relative mx-auto"
                style={{
                  animation: R ? "monsterShake 0.5s ease-in-out" : "monsterFloat 2.5s ease-in-out infinite",
                  transform: R ? "translateZ(-10px)" : "translateZ(30px)",
                  transition: "transform 0.4s ease",
                  filter: R ? "brightness(2) saturate(0.5)" : "none",
                }}
              >
                <RtComponent
                  isBoss={w_isBoss}
                  hit={R}
                  mood={Ze}
                  color={r.monsterColor}
                  accent={r.accent}
                  glow={r.monsterGlow}
                />
              </div>
              <div
                className="mt-3 md:mt-4 text-center relative"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative inline-block px-6 md:px-8 py-3 md:py-4 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${r.accent}40`,
                    backdropFilter: "blur(14px)",
                    boxShadow: `0 0 30px ${r.accent}25, 0 0 60px ${r.accent}15, 0 0 100px ${r.accent}08, inset 0 0 20px ${r.accent}10`,
                    transform: "translateZ(25px)",
                  }}
                >
                  <div
                    className="text-xl md:text-4xl font-black text-white mb-1"
                    style={{
                      textShadow: `0 0 20px ${r.accent}, 0 0 40px ${r.accent}44, 0 2px 10px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {w.espanol}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/40 font-bold">
                    ¿Cuál es la traducción correcta? / 正确的翻译是什么？
                  </div>
                  <div
                    className="absolute top-0 left-0 w-3 h-3 rounded-tl-2xl border-t-2 border-l-2"
                    style={{
                      borderColor: r.accent,
                      boxShadow: `0 0 8px ${r.accent}60`,
                    }}
                  />
                  <div
                    className="absolute top-0 right-0 w-3 h-3 rounded-tr-2xl border-t-2 border-r-2"
                    style={{
                      borderColor: r.accent,
                      boxShadow: `0 0 8px ${r.accent}60`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-3 h-3 rounded-bl-2xl border-b-2 border-l-2"
                    style={{
                      borderColor: r.accent,
                      boxShadow: `0 0 8px ${r.accent}60`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-br-2xl border-b-2 border-r-2"
                    style={{
                      borderColor: r.accent,
                      boxShadow: `0 0 8px ${r.accent}60`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className={`rounded-full overflow-hidden relative mb-5 md:mb-6 ${w_isBoss ? "w-56 md:w-64 h-3.5 md:h-4" : "w-44 md:w-48 h-2.5 md:h-3"}`}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 10px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.3)",
                transform: "translateZ(15px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="h-full transition-all duration-700 rounded-full relative"
                style={{
                  width: `${$}%`,
                  background: w_isBoss
                    ? "linear-gradient(90deg, #ff3860, #ff00aa)"
                    : "linear-gradient(90deg, #39ff14, #00d4ff)",
                  boxShadow: `0 0 15px ${w_isBoss ? "#ff3860" : "#39ff14"}, 0 0 30px ${w_isBoss ? "#ff3860" : "#39ff14"}44, 0 0 60px ${w_isBoss ? "#ff3860" : "#39ff14"}22`,
                  animation: $ < 30 ? "neonFlicker 0.8s ease-in-out infinite" : "none",
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[9px] md:text-[10px] font-black text-white/80 tracking-wider"
                  style={{
                    textShadow: "0 0 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {$} HP
                </span>
              </div>
            </div>
            <div
              ref={FeRef}
              className="absolute bottom-2 left-2 md:bottom-4 md:left-4 md:left-10"
              style={{
                transform: B
                  ? "translateX(120px) translateZ(40px) scaleX(-1)"
                  : "translateX(0) translateZ(20px) scaleX(1)",
                transition: B ? "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)" : "transform 0.3s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="relative"
                style={{
                  animation: "heroIdle 1.5s ease-in-out infinite",
                }}
              >
                <TtComponent mood={oe} attacking={B} />
                <div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    background: "radial-gradient(circle, rgba(0,212,255,0.4), transparent 70%)",
                    filter: "blur(15px)",
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
              </div>
              {B && (
                <>
                  <div
                    className="absolute top-2 right-[-100px] w-4 h-4 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #ffffff, #00d4ff)",
                      boxShadow:
                        "0 0 15px #00d4ff, 0 0 30px #00d4ff, 0 0 60px rgba(0,212,255,0.3), 0 0 100px rgba(0,212,255,0.15)",
                      animation: "spellFly 0.5s ease-in forwards",
                    }}
                  />
                  {[0, 1, 2, 3].map((d) => (
                    <div
                      key={`trail-${d}`}
                      className="absolute top-2 right-[-100px] w-2.5 h-2.5 rounded-full"
                      style={{
                        background: "radial-gradient(circle, #00d4ff, #39ff14)",
                        boxShadow: "0 0 8px #00d4ff, 0 0 16px rgba(0,212,255,0.4)",
                        animation: `spellFly ${0.5 + d * 0.08}s ease-in forwards`,
                        animationDelay: `${d * 0.04}s`,
                        opacity: 0.7 - d * 0.15,
                      }}
                    />
                  ))}
                  {[0, 1, 2].map((d) => (
                    <div
                      key={`orb-${d}`}
                      className="absolute top-2 right-[-100px] w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#ffffff",
                        boxShadow: "0 0 6px #ffffff, 0 0 12px #00d4ff",
                        animation: `spellFly ${0.5 + d * 0.06}s ease-in forwards, orbFloat 0.3s ease-in-out infinite`,
                        animationDelay: `${d * 0.03}s`,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
            {C && !L && (
              <div
                className="absolute top-1/3 right-1/4 md:right-1/3"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  style={{
                    animation: "spellFly 0.6s ease-in reverse forwards",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #ff3860, #ff00aa)",
                      boxShadow: "0 0 20px #ff3860, 0 0 40px rgba(255,56,96,.5), 0 0 80px rgba(255,56,96,.3)",
                    }}
                  />
                </div>
                {[0, 1, 2].map((d) => (
                  <div
                    key={`mat-${d}`}
                    style={{
                      animation: `spellFly ${0.6 + d * 0.08}s ease-in reverse forwards`,
                      animationDelay: `${d * 0.04}s`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full absolute"
                      style={{
                        background: "radial-gradient(circle, #ff3860, #ff00aa)",
                        boxShadow: "0 0 10px #ff3860",
                        opacity: 0.6 - d * 0.15,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-2 gap-2 md:gap-3 max-w-2xl mx-auto w-full mb-4"
            style={{
              perspective: "900px",
            }}
          >
            {w.options.map((d, x) => {
              const y = M === x;
              const z = x === w.correctIndex;
              const Z = C && z;
              const j = C && y && !z;
              const k = et[x];
              let k_color = k.color;
              if (Z) {
                k_color = "#39ff14";
              }
              if (j) {
                k_color = "#ff3860";
              }
              return (
                <button
                  key={x}
                  onClick={() => Xe(x)}
                  disabled={C}
                  className="relative p-3 md:p-4 rounded-xl text-white font-bold text-xs md:text-base transition-all disabled:scale-100 disabled:cursor-default overflow-hidden"
                  style={{
                    background: k_color,
                    boxShadow: Z
                      ? "0 0 30px rgba(57,255,20,0.5), 0 0 60px rgba(57,255,20,0.2), 0 0 90px rgba(57,255,20,0.1), 0 0 120px rgba(57,255,20,0.05), 0 8px 16px rgba(0,0,0,0.3)"
                      : j
                        ? "0 0 30px rgba(255,56,96,0.5), 0 0 60px rgba(255,56,96,0.2), 0 0 90px rgba(255,56,96,0.1), 0 8px 16px rgba(0,0,0,0.3)"
                        : `0 0 15px ${k.shadow}, 0 0 30px ${k.shadow}44, 0 4px 8px rgba(0,0,0,0.2)`,
                    opacity: C && !y && !z ? 0.5 : 1,
                    transform: Z
                      ? "scale(1.03) translateZ(20px)"
                      : j
                        ? "scale(0.97) rotate(-1deg) translateZ(0px)"
                        : "translateZ(10px)",
                    transformStyle: "preserve-3d",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  onMouseMove={(S) => {
                    if (C) {
                      return;
                    }
                    const E = S.currentTarget.getBoundingClientRect();
                    const Ee = (S.clientX - E.left) / E.width - 0.5;
                    const Oe = (S.clientY - E.top) / E.height - 0.5;
                    S.currentTarget.style.transform = `perspective(600px) rotateY(${Ee * 20}deg) rotateX(${-Oe * 20}deg) translateZ(30px) scale(1.05)`;
                    S.currentTarget.style.boxShadow = `0 0 25px ${k.shadow}, 0 0 50px ${k.shadow}55, 0 12px 24px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(S) => {
                    S.currentTarget.style.transform = Z
                      ? "scale(1.03) translateZ(20px)"
                      : j
                        ? "scale(0.97) rotate(-1deg) translateZ(0px)"
                        : "translateZ(10px)";
                    S.currentTarget.style.boxShadow = Z
                      ? "0 0 30px rgba(57,255,20,0.5), 0 0 60px rgba(57,255,20,0.2), 0 0 90px rgba(57,255,20,0.1), 0 8px 16px rgba(0,0,0,0.3)"
                      : j
                        ? "0 0 30px rgba(255,56,96,0.5), 0 0 60px rgba(255,56,96,0.2), 0 8px 16px rgba(0,0,0,0.3)"
                        : `0 0 15px ${k.shadow}, 0 0 30px ${k.shadow}44, 0 4px 8px rgba(0,0,0,0.2)`;
                  }}
                >
                  <div
                    className="flex items-center gap-2 relative z-10"
                    style={{
                      transform: "translateZ(15px)",
                    }}
                  >
                    <span
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/20 flex items-center justify-center text-[10px] md:text-xs font-black"
                      style={{
                        boxShadow: "0 0 8px rgba(255,255,255,0.2)",
                      }}
                    >
                      {["A", "B", "C", "D"][x]}
                    </span>
                    <span className="text-left leading-tight">{d}</span>
                  </div>
                  {Z && (
                    <>
                      <div
                        className="absolute inset-0 rounded-xl flex items-center justify-center"
                        style={{
                          background: "rgba(57,255,20,0.15)",
                          animation: "glowBurst 0.7s ease-out forwards",
                        }}
                      >
                        <SparklesIcon
                          size={24}
                          className="text-white md:hidden"
                          style={{
                            filter: "drop-shadow(0 0 6px white)",
                          }}
                        />
                        <SparklesIcon
                          size={28}
                          className="text-white hidden md:block"
                          style={{
                            filter: "drop-shadow(0 0 6px white)",
                          }}
                        />
                      </div>
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          boxShadow: "inset 0 0 30px rgba(57,255,20,0.3)",
                          animation: "glowBurst 0.7s ease-out forwards",
                        }}
                      />
                    </>
                  )}
                  {j && (
                    <div
                      className="absolute inset-0 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,56,96,0.15)",
                        animation: "shake3D 0.5s ease-in-out",
                      }}
                    >
                      <SkullIcon size={24} className="text-white md:hidden" />
                      <SkullIcon size={28} className="text-white hidden md:block" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {C && (
            <div
              className="text-center mb-4"
              style={{
                perspective: "600px",
              }}
            >
              <p
                className={`text-base md:text-lg font-black ${L ? "text-green-400" : "text-red-400"}`}
                style={{
                  textShadow: L
                    ? "0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.3), 0 0 60px rgba(57,255,20,0.15)"
                    : "0 0 20px rgba(255,56,96,0.5), 0 0 40px rgba(255,56,96,0.3), 0 0 60px rgba(255,56,96,0.15)",
                  transform: L ? "translateZ(20px) scale(1.05)" : "translateZ(10px)",
                  animation: L ? "glowBurst 0.6s ease-out" : "shake3D 0.5s ease-in-out",
                }}
              >
                {L
                  ? "¡Correcto! ¡Hechizo lanzado! / 正确！法术发射！"
                  : "¡Incorrecto! El monstruo ataca... / 错误！怪物攻击..."}
              </p>
              {!L && (
                <p className="text-xs md:text-sm text-white/50 mt-1">
                  La respuesta correcta era:{" "}
                  <span
                    className="text-white font-bold"
                    style={{
                      textShadow: "0 0 10px rgba(0,212,255,0.4)",
                    }}
                  >
                    {w.chino}
                  </span>
                </p>
              )}
            </div>
          )}
        </LtComponent>
      </div>
    );
  };
  const IeComponent = () => (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col items-center justify-center text-center">
      <StComponent active={active} />
      <div className="mb-6 relative">
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: "linear-gradient(135deg, #ffd600, #ff6b35)",
            boxShadow:
              "0 0 60px rgba(255,214,0,0.5), 0 0 100px rgba(255,107,53,0.3), 0 0 150px rgba(255,214,0,0.2)",
            animation: "heroIdle 2s ease-in-out infinite",
          }}
        >
          <CrownIcon
            size={44}
            className="text-white md:hidden"
            fill="white"
            style={{
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
            }}
          />
          <CrownIcon
            size={56}
            className="text-white hidden md:block"
            fill="white"
            style={{
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
            }}
          />
        </div>
        <div
          className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500 flex items-center justify-center"
          style={{
            boxShadow: "0 0 15px rgba(57,255,20,0.5), 0 0 30px rgba(57,255,20,0.3)",
            animation: "nodePulse 2s ease-in-out infinite",
          }}
        >
          <SparklesIcon size={16} className="text-white" />
        </div>
        <div
          className="absolute -top-4 -left-4 text-yellow-400 opacity-60"
          style={{
            animation: "floatParticle 3s ease-in-out infinite",
          }}
        >
          <StarIcon size={20} fill="#ffd600" />
        </div>
      </div>
      <h1
        className="text-4xl md:text-6xl font-black text-white mb-2"
        style={{
          textShadow:
            "0 0 40px rgba(255,214,0,0.4), 0 0 80px rgba(255,107,53,0.2), 0 0 120px rgba(255,214,0,0.1)",
        }}
      >
        ¡Victoria! / 胜利!
      </h1>
      <p className="text-white/50 text-base md:text-lg mb-6 md:mb-8">
        Has completado tu épica aventura / 你完成了史诗冒险
      </p>
      <div className="flex items-center gap-3 mb-6">
        {[1, 2, 3].map((t) => (
          <StarIcon
            key={t}
            size={36}
            className={`${t <= T ? "text-yellow-400" : "text-white/10"} md:hidden`}
            fill={t <= T ? "#ffd600" : "transparent"}
            style={{
              filter: t <= T ? "drop-shadow(0 0 12px #ffd600)" : "none",
              animation: t <= T ? "nodePulse 2s ease-in-out infinite" : "none",
              animationDelay: `${t * 0.2}s`,
            }}
          />
        ))}
        {[1, 2, 3].map((t) => (
          <StarIcon
            key={t}
            size={48}
            className={`${t <= T ? "text-yellow-400" : "text-white/10"} hidden md:block`}
            fill={t <= T ? "#ffd600" : "transparent"}
            style={{
              filter: t <= T ? "drop-shadow(0 0 12px #ffd600)" : "none",
              animation: t <= T ? "nodePulse 2s ease-in-out infinite" : "none",
              animationDelay: `${t * 0.2}s`,
            }}
          />
        ))}
      </div>
      <div
        className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-md"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="p-4 md:p-5 rounded-2xl transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 0 30px rgba(0,212,255,0.1), 0 0 60px rgba(0,212,255,0.05), 0 8px 16px rgba(0,0,0,0.2)",
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
          onMouseMove={(t) => {
            const s = t.currentTarget.getBoundingClientRect();
            const r = (t.clientX - s.left) / s.width - 0.5;
            const d = (t.clientY - s.top) / s.height - 0.5;
            t.currentTarget.style.transform = `perspective(800px) rotateY(${r * 12}deg) rotateX(${-d * 12}deg) translateZ(30px)`;
            t.currentTarget.style.boxShadow =
              "0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(0,212,255,0.1), 0 12px 24px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(t) => {
            t.currentTarget.style.transform = "translateZ(10px)";
            t.currentTarget.style.boxShadow =
              "0 0 30px rgba(0,212,255,0.1), 0 0 60px rgba(0,212,255,0.05), 0 8px 16px rgba(0,0,0,0.2)";
          }}
        >
          <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase mb-1 tracking-wider">
            Puntuación / 得分
          </p>
          <p
            className="text-3xl md:text-4xl font-black text-white"
            style={{
              textShadow: "0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.2)",
            }}
          >
            {m}
          </p>
        </div>
        <div
          className="p-4 md:p-5 rounded-2xl transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 0 30px rgba(255,0,170,0.1), 0 0 60px rgba(255,0,170,0.05), 0 8px 16px rgba(0,0,0,0.2)",
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
          onMouseMove={(t) => {
            const s = t.currentTarget.getBoundingClientRect();
            const r = (t.clientX - s.left) / s.width - 0.5;
            const d = (t.clientY - s.top) / s.height - 0.5;
            t.currentTarget.style.transform = `perspective(800px) rotateY(${r * 12}deg) rotateX(${-d * 12}deg) translateZ(30px)`;
            t.currentTarget.style.boxShadow =
              "0 0 40px rgba(255,0,170,0.2), 0 0 80px rgba(255,0,170,0.1), 0 12px 24px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(t) => {
            t.currentTarget.style.transform = "translateZ(10px)";
            t.currentTarget.style.boxShadow =
              "0 0 30px rgba(255,0,170,0.1), 0 0 60px rgba(255,0,170,0.05), 0 8px 16px rgba(0,0,0,0.2)";
          }}
        >
          <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase mb-1 tracking-wider">
            Mejor / 最佳
          </p>
          <p
            className="text-3xl md:text-4xl font-black text-white"
            style={{
              textShadow: "0 0 20px rgba(255,0,170,0.3), 0 0 40px rgba(255,0,170,0.2)",
            }}
          >
            {Me}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button
          onClick={() => P(i)}
          className="px-5 md:px-6 py-3 md:py-3.5 rounded-full text-white font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #39ff14)",
            boxShadow:
              "0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(57,255,20,0.2), 0 0 60px rgba(0,212,255,0.1)",
          }}
        >
          <RotateCcwIcon size={18} /> Jugar de nuevo / 再玩一次
        </button>
        <P_1 currentGameId="word-quest" />
      </div>
    </div>
  );
  const PeComponent = () => (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="mb-6 relative">
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4"
          style={{
            boxShadow:
              "0 0 40px rgba(255,56,96,0.3), 0 0 80px rgba(255,56,96,0.2), 0 0 120px rgba(255,56,96,0.1)",
            animation: "monsterShake 0.5s ease-in-out infinite",
          }}
        >
          <SkullIcon size={32} className="text-red-400 md:hidden" />
          <SkullIcon size={40} className="text-red-400 hidden md:block" />
        </div>
        <div
          className="absolute -top-3 -right-3 text-red-400 opacity-40"
          style={{
            animation: "floatParticle 2s ease-in-out infinite",
          }}
        >
          <FlameIcon size={18} />
        </div>
      </div>
      <h1
        className="text-3xl md:text-5xl font-black text-white mb-2"
        style={{
          textShadow:
            "0 0 40px rgba(255,56,96,0.3), 0 0 80px rgba(255,56,96,0.2), 0 0 120px rgba(255,56,96,0.1)",
        }}
      >
        ¡Derrota! / 失败!
      </h1>
      <p className="text-white/50 text-base md:text-lg mb-6 md:mb-8">
        Te quedaste sin vidas... / 你没有生命了...
      </p>
      <div
        className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-md"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="p-4 md:p-5 rounded-2xl transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 0 30px rgba(0,212,255,0.1), 0 0 60px rgba(0,212,255,0.05), 0 8px 16px rgba(0,0,0,0.2)",
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
          onMouseMove={(t) => {
            const s = t.currentTarget.getBoundingClientRect();
            const r = (t.clientX - s.left) / s.width - 0.5;
            const d = (t.clientY - s.top) / s.height - 0.5;
            t.currentTarget.style.transform = `perspective(800px) rotateY(${r * 12}deg) rotateX(${-d * 12}deg) translateZ(30px)`;
            t.currentTarget.style.boxShadow =
              "0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(0,212,255,0.1), 0 12px 24px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(t) => {
            t.currentTarget.style.transform = "translateZ(10px)";
            t.currentTarget.style.boxShadow =
              "0 0 30px rgba(0,212,255,0.1), 0 0 60px rgba(0,212,255,0.05), 0 8px 16px rgba(0,0,0,0.2)";
          }}
        >
          <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase mb-1 tracking-wider">
            Puntuación / 得分
          </p>
          <p
            className="text-3xl md:text-4xl font-black text-white"
            style={{
              textShadow: "0 0 20px rgba(0,212,255,0.3)",
            }}
          >
            {m}
          </p>
        </div>
        <div
          className="p-4 md:p-5 rounded-2xl transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 0 30px rgba(255,0,170,0.1), 0 0 60px rgba(255,0,170,0.05), 0 8px 16px rgba(0,0,0,0.2)",
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
          onMouseMove={(t) => {
            const s = t.currentTarget.getBoundingClientRect();
            const r = (t.clientX - s.left) / s.width - 0.5;
            const d = (t.clientY - s.top) / s.height - 0.5;
            t.currentTarget.style.transform = `perspective(800px) rotateY(${r * 12}deg) rotateX(${-d * 12}deg) translateZ(30px)`;
            t.currentTarget.style.boxShadow =
              "0 0 40px rgba(255,0,170,0.2), 0 0 80px rgba(255,0,170,0.1), 0 12px 24px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(t) => {
            t.currentTarget.style.transform = "translateZ(10px)";
            t.currentTarget.style.boxShadow =
              "0 0 30px rgba(255,0,170,0.1), 0 0 60px rgba(255,0,170,0.05), 0 8px 16px rgba(0,0,0,0.2)";
          }}
        >
          <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase mb-1 tracking-wider">
            Nivel alcanzado / 达到等级
          </p>
          <p
            className="text-3xl md:text-4xl font-black text-white"
            style={{
              textShadow: "0 0 20px rgba(255,0,170,0.3)",
            }}
          >
            {c + 1} / 10
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button
          onClick={() => P(i)}
          className="px-5 md:px-6 py-3 md:py-3.5 rounded-full text-white font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
          style={{
            background: "linear-gradient(135deg, #ff3860, #ff00aa)",
            boxShadow:
              "0 0 20px rgba(255,56,96,0.3), 0 0 40px rgba(255,0,170,0.2), 0 0 60px rgba(255,56,96,0.1)",
          }}
        >
          <RotateCcwIcon size={18} /> Reintentar / 重试
        </button>
        <P_1 currentGameId="word-quest" />
      </div>
    </div>
  );
  return (
    <StarfieldBackground>
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: a === "battle" || a === "map" ? v.bgGradient : undefined,
          transition: "background 0.8s ease",
        }}
      >
        {(a === "battle" || a === "map") && (
          <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{
              zIndex: 0,
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                animation: "parallaxSlow 80s linear infinite",
              }}
            >
              {[...Array(50)].map((t, s) => (
                <div
                  key={s}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    background: "rgba(255,255,255,0.4)",
                    left: `${(s * 37) % 100}%`,
                    top: `${(s * 23) % 100}%`,
                    animation: `floatParticle ${12 + (s % 8) * 3}s ease-in-out infinite`,
                    animationDelay: `${(s * 0.7) % 5}s`,
                    boxShadow: "0 0 6px rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                animation: "parallaxMedium 50s linear infinite",
              }}
            >
              {[...Array(15)].map((t, s) => (
                <div
                  key={s}
                  className="absolute rounded-full"
                  style={{
                    width: 60 + (s % 4) * 40,
                    height: 60 + (s % 4) * 40,
                    background: v.accent,
                    filter: "blur(50px)",
                    left: `${(s * 17) % 100}%`,
                    top: `${(s * 31) % 100}%`,
                    animation: `floatBlob ${25 + (s % 5) * 5}s ease-in-out infinite`,
                    animationDelay: `${(s * 2) % 10}s`,
                    opacity: 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {Ce && (
          <div
            className="fixed inset-0 pointer-events-none z-50"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
              animation: "flashFade 0.4s ease-out forwards",
            }}
          />
        )}
        {Te && (
          <div
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{
              background: "rgba(255,56,96,0.3)",
              animation: "flashFade 0.5s ease-out forwards",
              mixBlendMode: "overlay",
            }}
          />
        )}
        {(a === "battle" || a === "map") && <OtComponent accent={v.accent} count={40} />}
        {ze && a === "map" && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {Array.from({
              length: 15,
            }).map((t, s) => (
              <div
                key={s}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  background: ["#ffd600", "#ff3860", "#00d4ff", "#39ff14"][s % 4],
                  boxShadow: `0 0 6px ${["#ffd600", "#ff3860", "#00d4ff", "#39ff14"][s % 4]}`,
                  animation: `confettiFall ${2 + Math.random() * 2}s ease-in forwards`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`,
                }}
              />
            ))}
          </div>
        )}
        <div
          className="relative"
          style={{
            zIndex: 1,
          }}
        >
          {a === "select" && AeComponent()}
          {a === "map" && BeComponent()}
          {a === "battle" && ReComponent()}
          {a === "victory" && IeComponent()}
          {a === "gameover" && PeComponent()}
        </div>
        <div
          className="fixed bottom-4 right-4 z-50 pointer-events-none"
          style={{
            animation: "mascotFloat 3s ease-in-out infinite",
          }}
        >
          <AtComponent mood={oe} />
        </div>
        <style>{`
          @keyframes heroIdle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes capeWave {
            0%, 100% { transform: rotateY(0deg); }
            50% { transform: rotateY(25deg); }
          }
          @keyframes monsterFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(1deg); }
          }
          @keyframes monsterShake {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-8px, 4px); }
            40% { transform: translate(8px, -4px); }
            60% { transform: translate(-6px, 6px); }
            80% { transform: translate(6px, -6px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes spellFly {
            0% { transform: translateX(0) scale(1); opacity: 1; }
            100% { transform: translateX(180px) scale(0.3); opacity: 0; }
          }
          @keyframes nodePulse {
            0%, 100% { box-shadow: 0 0 20px currentColor; }
            50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
          }
          @keyframes bossPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.9; }
          }
          @keyframes eyeBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          @keyframes parallaxSlow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-30px); }
          }
          @keyframes parallaxMedium {
            0% { transform: translateX(0); }
            100% { transform: translateX(-60px); }
          }
          @keyframes floatParticle {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-15px) translateX(8px); }
          }
          @keyframes floatBlob {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(25px, -25px); }
            50% { transform: translate(-15px, 15px); }
            75% { transform: translate(15px, 25px); }
          }
          @keyframes flashFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          @keyframes heroFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes confettiFall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
          }
          @keyframes mascotFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-4px) rotate(1deg); }
            50% { transform: translateY(-8px) rotate(0deg); }
            75% { transform: translateY(-4px) rotate(-1deg); }
          }
          @keyframes mascotExcited {
            0%, 100% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-10px) scale(1.05); }
            50% { transform: translateY(-4px) scale(1); }
            75% { transform: translateY(-12px) scale(1.08); }
          }
          @keyframes mascotSad {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-2px) rotate(-2deg); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.05); }
          }
          @keyframes borderRotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes shakeFlash {
            0% { transform: translate(0, 0); opacity: 0.6; }
            25% { transform: translate(-6px, 4px); opacity: 0.4; }
            50% { transform: translate(6px, -4px); opacity: 0.6; }
            75% { transform: translate(-4px, 6px); opacity: 0.3; }
            100% { transform: translate(0, 0); opacity: 0; }
          }
          @keyframes neonPulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.3); }
          }
          @keyframes glowBurst {
            0% { transform: scale(0.8); opacity: 0.6; box-shadow: inset 0 0 0px rgba(255,255,255,0); }
            50% { transform: scale(1.1); opacity: 0.3; box-shadow: inset 0 0 40px rgba(255,255,255,0.2); }
            100% { transform: scale(1.3); opacity: 0; box-shadow: inset 0 0 80px rgba(255,255,255,0); }
          }
          @keyframes shake3D {
            0% { transform: translateZ(10px) translateX(0) rotateY(0deg); }
            15% { transform: translateZ(10px) translateX(-8px) rotateY(-3deg); }
            30% { transform: translateZ(10px) translateX(8px) rotateY(3deg); }
            45% { transform: translateZ(10px) translateX(-5px) rotateY(-2deg); }
            60% { transform: translateZ(10px) translateX(5px) rotateY(2deg); }
            75% { transform: translateZ(10px) translateX(-3px) rotateY(-1deg); }
            100% { transform: translateZ(10px) translateX(0) rotateY(0deg); }
          }
          @keyframes neonFlicker {
            0%, 100% { opacity: 1; box-shadow: 0 0 15px currentColor, 0 0 30px currentColor; }
            25% { opacity: 0.7; box-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
            50% { opacity: 1; box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
            75% { opacity: 0.8; box-shadow: 0 0 12px currentColor, 0 0 25px currentColor; }
          }
          @keyframes nodeFloat {
            0%, 100% { transform: translateZ(45px) translateY(0px); }
            50% { transform: translateZ(55px) translateY(-6px); }
          }
          @keyframes orbFloat {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-4px) translateX(3px); }
            50% { transform: translateY(0) translateX(6px); }
            75% { transform: translateY(4px) translateX(3px); }
            100% { transform: translateY(0) translateX(0); }
          }
          @keyframes rotate3dGlow {
            0% { transform: rotateY(0deg) rotateX(0deg); filter: hue-rotate(0deg); }
            50% { transform: rotateY(180deg) rotateX(10deg); filter: hue-rotate(30deg); }
            100% { transform: rotateY(360deg) rotateX(0deg); filter: hue-rotate(0deg); }
          }
          @keyframes card3DEnter {
            0% { transform: perspective(800px) rotateX(-30deg) translateY(40px) translateZ(-50px); opacity: 0; }
            60% { transform: perspective(800px) rotateX(5deg) translateY(-5px) translateZ(20px); opacity: 1; }
            100% { transform: perspective(800px) rotateX(0deg) translateY(0px) translateZ(10px); opacity: 1; }
          }
          @keyframes heroTrail {
            0% { transform: translateX(0) scale(1); opacity: 0.8; }
            100% { transform: translateX(-60px) scale(0.5); opacity: 0; }
          }
          @keyframes damageFloat {
            0% { transform: translateY(0) translateZ(30px) scale(1); opacity: 1; }
            100% { transform: translateY(-40px) translateZ(60px) scale(1.3); opacity: 0; }
          }
          @keyframes shieldPulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.15); opacity: 0.6; }
          }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { YtComponent as default };
