import {
  BookOpenIcon,
  ZapIcon,
  StarIcon,
  SparklesIcon,
  TrophyIcon,
  ArrowLeftIcon,
  OrbitIcon,
  LayersIcon,
  TimerIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const h = ["#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#ff6b35", "#b829dd", "#2080ff", "#ff3f8f"];
const ae = 60;
const re = 8;
function F(s) {
  const c = [...s];
  for (let p = c.length - 1; p > 0; p--) {
    const o = Math.floor(Math.random() * (p + 1));
    [c[p], c[o]] = [c[o], c[p]];
  }
  return c;
}
function je(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Se1Component({ mood }) {
  const c =
    mood === "sad"
      ? "M30 52 Q34 48 38 52 M58 52 Q62 48 66 52"
      : mood === "excited"
        ? "M28 48 Q34 40 40 48 Q34 52 28 48 M56 48 Q62 40 68 48 Q62 52 56 48"
        : "M30 48 Q34 44 38 48 Q34 52 30 48 M58 48 Q62 44 66 48 Q62 52 58 48";
  const p =
    mood === "happy"
      ? "M38 58 Q48 68 58 58"
      : mood === "sad"
        ? "M38 64 Q48 56 58 64"
        : mood === "excited"
          ? "M38 58 Q48 72 58 58"
          : "M42 62 Q48 64 54 62";
  const o = mood === "happy" || mood === "excited" ? "#ff8ec8" : "#ff9ec9";
  const t =
    mood === "excited" ? "#ffd600" : mood === "happy" ? "#39ff14" : mood === "sad" ? "#ff4444" : "#00d4ff";
  const animationDuration = mood === "excited" ? "1.2s" : mood === "sad" ? "3s" : "2s";
  const n = mood === "excited" ? "1.15" : "1";
  return (
    <div
      className="kawaii-mascot-wrap"
      style={{
        animationDuration,
      }}
    >
      <svg width="80" height="80" viewBox="0 0 96 96" className="kawaii-mascot-svg">
        <defs>
          <radialGradient id="bodyGrad" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#eaf8ff" />
            <stop offset="100%" stopColor="#b2e4ff" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="48" cy="56" r="40" fill={t} opacity="0.15">
          <animate attributeName="r" values="38;44;38" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.25;0.15" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <line x1="40" y1="18" x2="40" y2="8" stroke="#b2e4ff" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="y2" values="8;4;8" dur="2s" repeatCount="indefinite" />
        </line>
        <circle cx="40" cy="6" r="3" fill="#ffd600" filter="url(#glow)">
          <animate attributeName="cy" values="6;2;6" dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="56" y1="18" x2="56" y2="8" stroke="#b2e4ff" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="y2" values="8;4;8" dur="2.3s" repeatCount="indefinite" />
        </line>
        <circle cx="56" cy="6" r="3" fill="#ff00aa" filter="url(#glow)">
          <animate attributeName="cy" values="6;2;6" dur="2.3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="48" cy="56" rx="36" ry="32" fill="url(#bodyGrad)" filter="url(#glow)" opacity="0.95" />
        <path
          d={c}
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            values={`1;${n};1`}
            dur="1.5s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>
        <path d={p} fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="26" cy="56" rx="5" ry="3" fill={o} opacity="0.6" />
        <ellipse cx="70" cy="56" rx="5" ry="3" fill={o} opacity="0.6" />
        <polygon
          points="48,14 50,18 54,18 51,21 52,25 48,23 44,25 45,21 42,18 46,18"
          fill="#ffd600"
          opacity="0.9"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 48 20"
            to="360 48 20"
            dur="6s"
            repeatCount="indefinite"
          />
        </polygon>
      </svg>
    </div>
  );
}
function oe(s, c, p = 60, o) {
  const t = o || [
    "#00d4ff",
    "#ff00aa",
    "#ffd600",
    "#39ff14",
    "#ff6b35",
    "#b829dd",
    "#2080ff",
    "#ff3f8f",
    "#ffffff",
  ];
  for (let a = 0; a < p; a++) {
    const n = document.createElement("div");
    const d = 4 + Math.random() * 6;
    if (Math.random() > 0.7) {
      n.innerHTML = `<svg width="${d * 2}" height="${d * 2}" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="${t[a % t.length]}" /></svg>`;
      n.style.width = `${d * 2}px`;
      n.style.height = `${d * 2}px`;
    } else {
      n.style.width = `${d}px`;
      n.style.height = `${d}px`;
      n.style.background = t[a % t.length];
      n.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    }
    n.style.position = "fixed";
    n.style.left = `${s}px`;
    n.style.top = `${c}px`;
    n.style.pointerEvents = "none";
    n.style.zIndex = "9999";
    document.body.appendChild(n);
    const m = Math.random() * Math.PI * 2;
    const b = 2 + Math.random() * 10;
    let v = Math.cos(m) * b;
    let w = Math.sin(m) * b - 4;
    let g = 1;
    let M = 0;
    let T = (Math.random() - 0.5) * 12;
    const j = () => {
      v *= 0.95;
      w *= 0.95;
      w += 0.25;
      n.style.left = `${parseFloat(n.style.left) + v}px`;
      n.style.top = `${parseFloat(n.style.top) + w}px`;
      M += T;
      n.style.transform = `rotate(${M}deg)`;
      g -= 0.015;
      n.style.opacity = String(g);
      if (g > 0) {
        requestAnimationFrame(j);
      } else {
        n.remove();
      }
    };
    requestAnimationFrame(j);
  }
}
function ke(s, c, color) {
  for (let o = 0; o < 12; o++) {
    const t = document.createElement("div");
    t.style.cssText = `position:fixed;left:${s}px;top:${c}px;width:4px;height:4px;border-radius:50%;background:${color};pointer-events:none;z-index:9999;`;
    document.body.appendChild(t);
    const a = Math.random() * Math.PI * 2;
    const n = 1 + Math.random() * 6;
    let d = Math.cos(a) * n;
    let y = Math.sin(a) * n;
    let m = 1;
    const b = () => {
      d *= 0.92;
      y *= 0.92;
      t.style.left = `${parseFloat(t.style.left) + d}px`;
      t.style.top = `${parseFloat(t.style.top) + y}px`;
      m -= 0.025;
      t.style.opacity = String(m);
      if (m > 0) {
        requestAnimationFrame(b);
      } else {
        t.remove();
      }
    };
    requestAnimationFrame(b);
  }
}
function Ne(s, c) {
  const p = ["#ff4444", "#ff6b35", "#ff8c00", "#ff00aa", "#ffffff"];
  for (let o = 0; o < 20; o++) {
    const t = document.createElement("div");
    const a = 3 + Math.random() * 5;
    t.style.position = "fixed";
    t.style.left = `${s}px`;
    t.style.top = `${c}px`;
    t.style.width = `${a}px`;
    t.style.height = `${a}px`;
    t.style.background = p[o % p.length];
    t.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    t.style.pointerEvents = "none";
    t.style.zIndex = "9999";
    document.body.appendChild(t);
    const n = Math.random() * Math.PI * 2;
    const d = 3 + Math.random() * 8;
    let y = Math.cos(n) * d;
    let m = Math.sin(n) * d;
    let b = 1;
    let v = 0;
    let w = (Math.random() - 0.5) * 15;
    const g = () => {
      y *= 0.94;
      m *= 0.94;
      m += 0.3;
      t.style.left = `${parseFloat(t.style.left) + y}px`;
      t.style.top = `${parseFloat(t.style.top) + m}px`;
      v += w;
      t.style.transform = `rotate(${v}deg) scale(${b})`;
      b -= 0.02;
      t.style.opacity = String(b);
      if (b > 0) {
        requestAnimationFrame(g);
      } else {
        t.remove();
      }
    };
    requestAnimationFrame(g);
  }
}
function Se(s, c, color) {
  const o = document.createElement("div");
  o.style.position = "fixed";
  o.style.left = `${s - 40}px`;
  o.style.top = `${c - 40}px`;
  o.style.width = "80px";
  o.style.height = "80px";
  o.style.borderRadius = "50%";
  o.style.background = `radial-gradient(circle, ${color}88, transparent 70%)`;
  o.style.pointerEvents = "none";
  o.style.zIndex = "9998";
  o.style.animation = "collectFlash 0.6s ease-out forwards";
  document.body.appendChild(o);
  setTimeout(() => o.remove(), 700);
}
function MeComponent() {
  const s = React.useMemo(() => {
    const t = [];
    for (let a = 0; a < 100; a++) {
      t.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
        delay: `${Math.random() * 4}s`,
        dur: `${1.5 + Math.random() * 2.5}s`,
        opacity: 0.3 + Math.random() * 0.7,
      });
    }
    return t;
  }, []);
  const c = React.useMemo(() => {
    const t = [];
    for (let a = 0; a < 5; a++) {
      t.push({
        left: `${10 + Math.random() * 70}%`,
        top: `${5 + Math.random() * 40}%`,
        delay: `${2 + Math.random() * 6}s`,
      });
    }
    return t;
  }, []);
  const p = React.useMemo(() => {
    const t = [];
    for (let a = 0; a < 3; a++) {
      t.push({
        left: `${5 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 60}%`,
        delay: `${1 + Math.random() * 8}s`,
        dur: `${2 + Math.random() * 3}s`,
        color: h[a % h.length],
      });
    }
    return t;
  }, []);
  const o = React.useMemo(() => {
    const t = [];
    for (let a = 0; a < 4; a++) {
      t.push({
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        size: 20 + Math.random() * 40,
        color: h[a % h.length],
        delay: `${Math.random() * 5}s`,
        dur: `${4 + Math.random() * 4}s`,
      });
    }
    return t;
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-10 -top-10 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] bg-[radial-gradient(circle,#ff00aa,transparent)] animate-nebula-drift" />
      <div
        className="absolute -right-10 bottom-0 w-[450px] h-[450px] rounded-full opacity-20 blur-[100px] bg-[radial-gradient(circle,#00d4ff,transparent)] animate-nebula-drift"
        style={{
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute left-1/2 top-1/3 w-[400px] h-[400px] rounded-full opacity-15 blur-[90px] bg-[radial-gradient(circle,#ffd600,transparent)] animate-nebula-drift"
        style={{
          animationDelay: "4s",
        }}
      />
      <div
        className="absolute left-1/4 bottom-1/4 w-[350px] h-[350px] rounded-full opacity-10 blur-[80px] bg-[radial-gradient(circle,#b829dd,transparent)] animate-nebula-drift"
        style={{
          animationDelay: "6s",
        }}
      />
      {s.map((t, key) => (
        <div
          key={key}
          className="absolute rounded-full bg-white"
          style={{
            left: t.left,
            top: t.top,
            width: t.size,
            height: t.size,
            opacity: t.opacity,
            animation: `starTwinkle ${t.dur} ease-in-out infinite alternate`,
            animationDelay: t.delay,
          }}
        />
      ))}
      <div
        className="absolute top-8 left-8 md:top-12 md:left-16 w-14 h-14 md:w-20 md:h-20 rounded-full opacity-70 animate-floatSlow"
        style={{
          background: "radial-gradient(circle at 30% 30%, #ffb347, #ff8c00)",
          boxShadow: "0 0 40px rgba(255,140,0,0.4), inset -4px -4px 12px rgba(0,0,0,0.3)",
        }}
      />
      <div
        className="absolute bottom-16 right-8 md:bottom-24 md:right-20 w-12 h-12 md:w-16 md:h-16 rounded-full opacity-60 animate-floatSlow"
        style={{
          background: "radial-gradient(circle at 30% 30%, #87cefa, #2080ff)",
          boxShadow: "0 0 40px rgba(32,128,255,0.4), inset -4px -4px 12px rgba(0,0,0,0.3)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute top-1/4 right-12 md:right-28 w-8 h-8 md:w-10 md:h-10 rounded-full opacity-60 animate-floatSlow"
        style={{
          background: "radial-gradient(circle at 30% 30%, #ffd600, #ff8c00)",
          boxShadow: "0 0 30px rgba(255,214,0,0.4), inset -3px -3px 8px rgba(0,0,0,0.3)",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute top-1/2 left-8 md:left-12 w-6 h-6 md:w-8 md:h-8 rounded-full opacity-50 animate-floatSlow"
        style={{
          background: "radial-gradient(circle at 30% 30%, #00d4ff, #2080ff)",
          boxShadow: "0 0 25px rgba(0,212,255,0.4), inset -2px -2px 6px rgba(0,0,0,0.3)",
          animationDelay: "4.5s",
        }}
      />
      <div
        className="absolute bottom-16 right-8 md:bottom-24 md:right-20 w-20 h-5 md:w-28 md:h-7 rounded-[50%] border border-white/15 opacity-50 animate-floatSlow"
        style={{
          animationDelay: "1.5s",
          transform: "rotateX(75deg)",
        }}
      />
      <div
        className="absolute top-8 left-8 md:top-12 md:left-16 w-24 h-6 md:w-32 md:h-8 rounded-[50%] border border-white/10 opacity-40 animate-floatSlow"
        style={{
          animationDelay: "0.5s",
          transform: "rotateX(70deg) rotateY(10deg)",
        }}
      />
      {c.map((t, a) => (
        <div
          key={`shoot-${a}`}
          className="shooting-star"
          style={{
            left: t.left,
            top: t.top,
            animationDelay: t.delay,
          }}
        />
      ))}
      {p.map((t, a) => (
        <div
          key={`comet-${a}`}
          className="absolute comet"
          style={{
            left: t.left,
            top: t.top,
            animationDelay: t.delay,
            animationDuration: t.dur,
          }}
        >
          <div
            className="comet-head"
            style={{
              background: `radial-gradient(circle, ${t.color}, transparent)`,
              boxShadow: `0 0 20px ${t.color}, 0 0 40px ${t.color}80`,
            }}
          />
          <div
            className="comet-tail"
            style={{
              background: `linear-gradient(90deg, ${t.color}80, transparent)`,
            }}
          />
        </div>
      ))}
      {o.map((t, a) => (
        <div
          key={`planet-${a}`}
          className="absolute rounded-full animate-floatSlow"
          style={{
            left: t.left,
            top: t.top,
            width: t.size,
            height: t.size,
            background: `radial-gradient(circle at 30% 30%, ${t.color}66, ${t.color}22)`,
            boxShadow: `0 0 ${t.size / 2}px ${t.color}40, inset -3px -3px 8px rgba(0,0,0,0.2)`,
            animationDelay: t.delay,
            animationDuration: t.dur,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}
function CeComponent({ w, onClick, isTarget }) {
  const oRef = React.useRef(null);
  const [t, setT] = React.useState({
    x: 0,
    y: 0,
  });
  const onMouseMove = (y) => {
    if (!oRef.current) {
      return;
    }
    const m = oRef.current.getBoundingClientRect();
    const b = (y.clientX - m.left - m.width / 2) / (m.width / 2);
    const v = (y.clientY - m.top - m.height / 2) / (m.height / 2);
    setT({
      x: v * -12,
      y: b * 12,
    });
  };
  const onMouseLeave = () =>
    setT({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={oRef}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      id={`orbit-word-${w.id}`}
      className="orbit-card absolute flex flex-col items-center justify-center font-black text-[10px] sm:text-xs md:text-sm transition-transform active:scale-90 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl select-none"
      style={{
        transform: `translate(-50%, -50%) perspective(700px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
        background: `linear-gradient(135deg, ${w.color}30, ${w.color}15)`,
        border: `1.5px solid ${w.color}90`,
        color: "#fff",
        boxShadow: `0 0 30px ${w.color}60, 0 0 60px ${w.color}30, inset 0 0 16px ${w.color}20`,
        textShadow: `0 0 12px ${w.color}cc, 0 0 24px ${w.color}66`,
        animation: "orbitFloat 2.8s ease-in-out infinite, orbitNeonPulse 2s ease-in-out infinite alternate",
        animationDelay: `${w.id * 0.3}s`,
        minWidth: "72px",
        transformStyle: "preserve-3d",
      }}
    >
      <span
        className="orbit-glow-text"
        style={{
          textShadow: `0 0 10px ${w.color}aa, 0 0 20px ${w.color}55`,
        }}
      >
        {w.espanol}
      </span>
      <span
        className="text-[8px] md:text-[10px] font-semibold opacity-60 mt-0.5"
        style={{
          textShadow: "none",
        }}
      >
        {w.chino}
      </span>
    </button>
  );
}
function ReComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [a, setA] = React.useState("select");
  const [d, setD] = React.useState([]);
  const [m, setM] = React.useState([]);
  const [v, setV] = React.useState(null);
  const [g, setG] = React.useState(0);
  const [T, setT] = React.useState(0);
  const [O, setO] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordorbit_best") || "0");
    } catch {
      return 0;
    }
  });
  const [C, setC] = React.useState(ae);
  const [_, set_] = React.useState(1);
  const [D, setD_1] = React.useState("");
  const [P, setP] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [_e, set_e] = React.useState("neutral");
  const [z, setZ] = React.useState("neutral");
  const [le, setLe] = React.useState(false);
  const [H, setH] = React.useState(false);
  const ERef = React.useRef(null);
  const ieRef = React.useRef(null);
  const de = g_1();
  const IRef = React.useRef(_);
  IRef.current = _;
  const A = React.useCallback((r) => {
    playClick();
    let i = r ? a_1(r) : a_1();
    if (i.length === 0) {
      setQ(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const x = F(
      i
        .filter((u) => u.espanol && u.chino)
        .map((u) => ({
          espanol: je(u.espanol),
          chino: u.chino,
        }))
        .filter((u) => u.espanol.length >= 3 && u.espanol.length <= 10),
    );
    setD(x);
    setG(0);
    setT(0);
    setC(ae);
    set_(1);
    setD_1("");
    setP(false);
    setLe(false);
    setH(false);
    setA("playing");
    setZ("neutral");
  }, []);
  React.useEffect(() => {
    if (a === "playing" && C > 0) {
      ERef.current = setInterval(() => setC((r) => r - 1), 1000);
      return () => {
        if (ERef.current) {
          clearInterval(ERef.current);
        }
      };
    }
  }, [a, C]);
  React.useEffect(() => {
    if (a === "playing" && C <= 0 && !P) {
      playLose();
      setP(true);
      setA("gameover");
      set_e("sad");
      setZ("sad");
      setO((r) => {
        const i = Math.max(r, g);
        localStorage.setItem("wordorbit_best", String(i));
        return i;
      });
      setTimeout(() => oe(window.innerWidth / 2, window.innerHeight / 2, 80), 300);
    }
  }, [a, C, g, P]);
  React.useEffect(() => {
    if (a !== "playing" || d.length === 0) {
      return;
    }
    const r = d[Math.floor(Math.random() * d.length)];
    setV(r);
    const i = F(d.filter((N) => N.espanol !== r.espanol)).slice(0, re - 1);
    const x = F([r, ...i]);
    const u = x.map((N, S) => ({
      id: S,
      espanol: N.espanol,
      chino: N.chino,
      angle: (Math.PI * 2 * S) / x.length,
      radius: 120 + Math.random() * 100,
      speed: 0.25 + Math.random() * 0.7,
      color: h[S % h.length],
    }));
    setM(u);
  }, [a, d, T]);
  React.useEffect(() => {
    if (a !== "playing") {
      return;
    }
    const r = requestAnimationFrame(function i() {
      setM((x) =>
        x.map((u) => ({
          ...u,
          angle: u.angle + u.speed * 0.016,
        })),
      );
      if (a === "playing") {
        requestAnimationFrame(i);
      }
    });
    return () => cancelAnimationFrame(r);
  }, [a]);
  React.useEffect(() => {
    if (z === "happy" || z === "excited") {
      const r = setTimeout(() => setZ("neutral"), 1200);
      return () => clearTimeout(r);
    }
    if (z === "sad") {
      const r = setTimeout(() => setZ("neutral"), 1500);
      return () => clearTimeout(r);
    }
  }, [z]);
  const ce = (r) => {
    if (P || !v) {
      return;
    }
    const i = document.getElementById(`orbit-word-${r.id}`);
    if (i) {
      const x = i.getBoundingClientRect();
      ke(x.left + x.width / 2, x.top + x.height / 2, r.color);
    }
    if (r.espanol === v.espanol) {
      playCorrect();
      const x = 100 * IRef.current;
      setG((f) => f + x);
      setT((f) => f + 1);
      set_((f) => f + 1);
      setD_1("¡Correcto! / 正确！");
      set_e("happy");
      setZ(IRef.current >= 3 ? "excited" : "happy");
      setH(true);
      setTimeout(() => setH(false), 600);
      if (i) {
        const f = i.getBoundingClientRect();
        oe(f.left + f.width / 2, f.top + f.height / 2, 40, [r.color, "#ffffff", "#ffd600"]);
        Se(f.left + f.width / 2, f.top + f.height / 2, r.color);
      }
      const u = d[Math.floor(Math.random() * d.length)];
      setV(u);
      const N = F(d.filter((f) => f.espanol !== u.espanol)).slice(0, re - 1);
      const S = F([u, ...N]);
      const xe = S.map((f, B) => ({
        id: B,
        espanol: f.espanol,
        chino: f.chino,
        angle: (Math.PI * 2 * B) / S.length,
        radius: 120 + Math.random() * 100,
        speed: 0.25 + Math.random() * 0.7,
        color: h[B % h.length],
      }));
      setM(xe);
    } else {
      playWrong();
      setT(0);
      set_(1);
      setD_1("¡Incorrecto! / 错误！");
      set_e("sad");
      setZ("sad");
      setLe(true);
      setTimeout(() => setLe(false), 500);
      if (i) {
        const x = i.getBoundingClientRect();
        Ne(x.left + x.width / 2, x.top + x.height / 2);
      }
    }
    setTimeout(() => setD_1(""), 1000);
  };
  const mood = a === "gameover" ? (g >= O ? "excited" : "sad") : z;
  if (a === "select") {
    return (
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center justify-center mb-3 animate-floatSlow">
              <OrbitIcon size={40} className="text-[#00d4ff] drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3 tracking-tight"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.2)",
              }}
            >
              <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600)]">
                Word Orbit
              </span>
            </h1>
            <p className="text-white/40 text-sm md:text-base font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {q && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {q}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <button
              onClick={() => {
                playClick();
                setQ("");
                A(null);
              }}
              className="group rounded-2xl p-5 md:p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "translateZ(20px)",
                perspective: "800px",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,170,0.15),transparent_60%)]" />
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 24px rgba(255,0,170,.4)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base md:text-lg mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
            </button>
            {de.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  playClick();
                  setQ("");
                  A(r.id);
                }}
                className="group rounded-2xl p-5 md:p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${r.color}40`,
                  transform: "translateZ(20px)",
                  perspective: "800px",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${r.color}25, transparent 60%)`,
                  }}
                />
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 relative"
                  style={{
                    background: `linear-gradient(135deg, ${r.color}, ${r.color}88)`,
                    boxShadow: `0 0 24px ${r.color}40`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base md:text-lg mb-1">{r.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${r.color}aa`,
                  }}
                >
                  {r.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{r.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
            <Se1Component mood="neutral" />
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6 min-h-screen relative">
        <MeComponent />
        <div className="relative flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5 score-3d"
              style={{
                background: "rgba(0,212,255,.15)",
                border: "1px solid rgba(0,212,255,.35)",
                color: "#00d4ff",
                boxShadow:
                  "0 0 20px rgba(0,212,255,.3), inset 0 0 10px rgba(0,212,255,.15), 0 4px 8px rgba(0,0,0,.3)",
              }}
            >
              <ZapIcon size={12} className="drop-shadow-[0_0_4px_rgba(0,212,255,0.8)]" /> {g}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5 score-3d"
              style={{
                background: "rgba(255,214,0,.15)",
                border: "1px solid rgba(255,214,0,.35)",
                color: "#ffd600",
                boxShadow:
                  "0 0 20px rgba(255,214,0,.3), inset 0 0 10px rgba(255,214,0,.15), 0 4px 8px rgba(0,0,0,.3)",
              }}
            >
              <TimerIcon size={12} className="drop-shadow-[0_0_4px_rgba(255,214,0,0.8)]" /> {C}s
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5 score-3d"
              style={{
                background: "rgba(255,0,170,.15)",
                border: "1px solid rgba(255,0,170,.35)",
                color: "#ff00aa",
                boxShadow:
                  "0 0 20px rgba(255,0,170,.3), inset 0 0 10px rgba(255,0,170,.15), 0 4px 8px rgba(0,0,0,.3)",
              }}
            >
              <StarIcon size={12} className="drop-shadow-[0_0_4px_rgba(255,0,170,0.8)]" /> Racha: {T}
            </div>
            {_ > 1 && (
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all animate-bounce-slow score-3d"
                style={{
                  background: "rgba(57,255,20,.15)",
                  border: "1px solid rgba(57,255,20,.35)",
                  color: "#39ff14",
                  boxShadow:
                    "0 0 20px rgba(57,255,20,.3), inset 0 0 10px rgba(57,255,20,.15), 0 4px 8px rgba(0,0,0,.3)",
                }}
              >
                x{_} Combo!
              </div>
            )}
          </div>
        </div>
        <div className="relative text-center mb-3 md:mb-4">
          <h1
            className="text-3xl md:text-5xl font-black mb-1 tracking-tight"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(0,212,255,.3))",
            }}
          >
            Word Orbit
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-medium">
            Haz clic en la palabra correcta / 点击正确的单词
          </p>
        </div>
        <div className="relative text-center mb-4 md:mb-6">
          <div
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black text-xl md:text-3xl transition-all animate-target-pulse"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.9),rgba(5,8,27,.7))",
              border: "1.5px solid rgba(255,214,0,.4)",
              color: "#ffd600",
              boxShadow:
                "0 0 40px rgba(255,214,0,.3), 0 0 80px rgba(255,214,0,.15), inset 0 0 30px rgba(255,214,0,.12)",
              textShadow: "0 0 20px rgba(255,214,0,.6), 0 0 40px rgba(255,214,0,.3)",
              backdropFilter: "blur(14px)",
              transform: "translateZ(20px)",
              perspective: "800px",
            }}
          >
            <SparklesIcon
              size={24}
              className="drop-shadow-[0_0_8px_rgba(255,0,170,0.8)]"
              style={{
                color: "#ff00aa",
              }}
            />
            <span className="drop-shadow-[0_0_10px_rgba(255,214,0,0.5)]">{v?.chino}</span>
            <span className="text-xs md:text-sm opacity-70 font-bold">(x{_})</span>
          </div>
        </div>
        {D && (
          <div
            className="text-center mb-3 text-sm md:text-base font-black animate-bounce-slow transition-all"
            style={{
              color: D.includes("Correcto") ? "#39ff14" : "#ff4444",
              textShadow: D.includes("Correcto")
                ? "0 0 14px rgba(57,255,20,.6)"
                : "0 0 14px rgba(255,68,68,.6)",
            }}
          >
            {D}
          </div>
        )}
        <div
          ref={ieRef}
          className={`relative mx-auto rounded-3xl overflow-hidden border border-white/10 transition-all orbit-arena ${le ? "animate-screen-shake" : ""} ${H ? "animate-collect-glow" : ""}`}
          style={{
            height: "clamp(300px, 55vw, 460px)",
            maxHeight: "480px",
            perspective: "1200px",
            background: "linear-gradient(180deg,rgba(14,22,64,.6),rgba(5,8,27,.75))",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 0 60px rgba(0,212,255,.15), 0 20px 60px rgba(0,0,0,.5), inset 0 0 80px rgba(0,212,255,.08)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <div
              className="w-32 h-32 md:w-48 md:h-48 rounded-full animate-gravity-pulse pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)",
                boxShadow: "0 0 60px rgba(0,212,255,0.1), inset 0 0 40px rgba(0,212,255,0.05)",
              }}
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <div
              className="w-28 h-28 md:w-40 md:h-40 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-atmosphere-glow"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,214,0,0.15), rgba(0,212,255,0.1), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,214,0,0.3),rgba(0,212,255,0.15),transparent_70%)] animate-center-pulse blur-xl" />
            <div
              className="w-10 h-10 md:w-14 md:h-14 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-center-pulse"
              style={{
                background: "radial-gradient(circle at 35% 30%, #ffd600, #ff8c00)",
                opacity: 0.9,
                boxShadow:
                  "0 0 50px rgba(255,214,0,0.5), 0 0 80px rgba(255,214,0,0.2), inset -3px -3px 8px rgba(0,0,0,0.3)",
              }}
            />
            <div
              className="w-28 h-7 md:w-36 md:h-9 rounded-[50%] border border-[#ffd600]/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 rotate-[12deg] animate-orbit-spin"
              style={{
                boxShadow: "0 0 20px rgba(255,214,0,0.2), inset 0 0 10px rgba(255,214,0,0.1)",
              }}
            />
            <div
              className="w-24 h-6 md:w-32 md:h-7 rounded-[50%] border border-[#00d4ff]/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 rotate-[-8deg] animate-orbit-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "8s",
                boxShadow: "0 0 20px rgba(0,212,255,0.2), inset 0 0 10px rgba(0,212,255,0.1)",
              }}
            />
            <div
              className="w-32 h-8 md:w-44 md:h-10 rounded-[50%] border border-white/8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 rotate-[5deg] animate-orbit-spin"
              style={{
                animationDuration: "12s",
                boxShadow: "0 0 15px rgba(255,255,255,0.1), inset 0 0 8px rgba(255,255,255,0.05)",
              }}
            />
          </div>
          {[120, 170, 220, 270].map((r, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none orbit-ring"
              style={{
                width: `${r * 2}px`,
                height: `${r * 2}px`,
                border: `1px dashed ${h[i % h.length]}20`,
                boxShadow: `0 0 25px ${h[i % h.length]}15, inset 0 0 25px ${h[i % h.length]}10`,
                animation: `orbitSpin ${20 + i * 5}s linear infinite`,
              }}
            />
          ))}
          {m.map((w) => {
            const i = 50 + (Math.cos(w.angle) * w.radius) / 4.5;
            const x = 50 + (Math.sin(w.angle) * w.radius) / 4.5;
            return (
              <div
                key={w.id}
                className="absolute"
                style={{
                  left: `${i}%`,
                  top: `${x}%`,
                  transform: `translateZ(${10 + Math.sin(w.angle) * 20}px)`,
                }}
              >
                <CeComponent w={w} onClick={() => ce(w)} />
              </div>
            );
          })}
          {H && (
            <div
              className="absolute inset-0 pointer-events-none z-20 animate-collect-flash-overlay"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 70%)",
              }}
            />
          )}
        </div>
        {a === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-pop-in"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.95),rgba(5,8,27,.8))",
                border: "1.5px solid rgba(0,212,255,.3)",
                boxShadow:
                  "0 0 80px rgba(0,212,255,.25), 0 20px 60px rgba(0,0,0,.5), inset 0 0 40px rgba(0,212,255,.08)",
                perspective: "800px",
                transform: "rotateX(5deg)",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60 animate-glow-sweep"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#b829dd,#ff00aa)",
                  filter: "blur(30px)",
                }}
              />
              <TrophyIcon
                size={56}
                className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,214,0,0.6)]"
                style={{
                  color: "#ffd600",
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#b829dd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ¡Órbita!
              </h2>
              <p className="text-white/50 text-sm mb-6">轨道结束！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 md:p-4 rounded-xl relative overflow-hidden gameover-stat-card"
                  style={{
                    background: "rgba(0,212,255,.12)",
                    border: "1px solid rgba(0,212,255,.25)",
                    boxShadow: "0 0 20px rgba(0,212,255,.15), inset 0 0 10px rgba(0,212,255,.08)",
                    transform: "translateZ(15px)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.15),transparent)]" />
                  <ZapIcon
                    size={18}
                    className="mx-auto mb-1 drop-shadow-[0_0_6px_rgba(0,212,255,0.6)]"
                    style={{
                      color: "#00d4ff",
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
                      textShadow: "0 0 10px rgba(0,212,255,.5)",
                    }}
                  >
                    {g}
                  </p>
                </div>
                <div
                  className="p-3 md:p-4 rounded-xl relative overflow-hidden gameover-stat-card"
                  style={{
                    background: "rgba(255,0,170,.12)",
                    border: "1px solid rgba(255,0,170,.25)",
                    boxShadow: "0 0 20px rgba(255,0,170,.15), inset 0 0 10px rgba(255,0,170,.08)",
                    transform: "translateZ(15px)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,170,0.15),transparent)]" />
                  <TrophyIcon
                    size={18}
                    className="mx-auto mb-1 drop-shadow-[0_0_6px_rgba(255,0,170,0.6)]"
                    style={{
                      color: "#ff00aa",
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
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,.5)",
                    }}
                  >
                    {O}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    playClick();
                    A(null);
                  }}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                  style={{
                    background: "linear-gradient(135deg,#00d4ff,#b829dd)",
                    boxShadow: "0 0 25px rgba(0,212,255,.35), 0 4px 8px rgba(0,0,0,.3)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
              </div>
              <P_1 currentGameId="word-orbit" />
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
        <Se1Component mood={mood} />
      </div>
      <style>{`
        @keyframes orbitPulse { 0%,100%{transform:translate(-50%,-50%) perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)} 50%{transform:translate(-50%,-50%) perspective(600px) rotateX(0deg) rotateY(0deg) scale(1.08)} }
        @keyframes orbitFloat {
          0%,100% { transform: translate(-50%, -50%) perspective(700px) translateY(0px); }
          50% { transform: translate(-50%, -50%) perspective(700px) translateY(-10px); }
        }
        @keyframes orbitNeonPulse {
          0% { box-shadow: 0 0 20px currentColor30, 0 0 40px currentColor15; border-color: currentColor60; }
          100% { box-shadow: 0 0 35px currentColor60, 0 0 70px currentColor30; border-color: currentColor90; }
        }
        @keyframes starTwinkle { 0%{opacity:0.3;transform:scale(1)} 100%{opacity:1;transform:scale(1.4)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes centerPulse { 0%,100%{transform:translate(-50%,-50%) scale(1); opacity:0.8} 50%{transform:translate(-50%,-50%) scale(1.15); opacity:1} }
        @keyframes bounceSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes targetPulse { 0%,100%{box-shadow:0 0 40px rgba(255,214,0,.3),0 0 80px rgba(255,214,0,.15),inset 0 0 30px rgba(255,214,0,.12)} 50%{box-shadow:0 0 55px rgba(255,214,0,.5),0 0 100px rgba(255,214,0,.25),inset 0 0 40px rgba(255,214,0,.18)} }
        @keyframes popIn { 0%{transform:scale(0.85) rotateX(8deg); opacity:0} 100%{transform:scale(1) rotateX(5deg); opacity:1} }
        @keyframes glowSweep { 0%{opacity:0.4} 50%{opacity:0.8} 100%{opacity:0.4} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; }
          100% { transform: translateX(-200px) translateY(200px) scale(0.5); opacity: 0; }
        }
        @keyframes orbitSpin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes gravityPulse {
          0%,100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        @keyframes atmosphereGlow {
          0%,100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }
        @keyframes nebulaDrift {
          0%,100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes cometFly {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 1; }
          100% { transform: translateX(-300px) translateY(150px) scale(0.3); opacity: 0; }
        }
        @keyframes screenShake {
          0%,100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-8px) translateY(-4px); }
          20% { transform: translateX(8px) translateY(4px); }
          30% { transform: translateX(-6px) translateY(2px); }
          40% { transform: translateX(6px) translateY(-2px); }
          50% { transform: translateX(-4px) translateY(4px); }
          60% { transform: translateX(4px) translateY(-4px); }
          70% { transform: translateX(-2px) translateY(2px); }
          80% { transform: translateX(2px) translateY(-2px); }
        }
        @keyframes collectFlash {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes collectGlow {
          0%,100% { box-shadow: 0 0 60px rgba(0,212,255,.15), 0 20px 60px rgba(0,0,0,.5), inset 0 0 80px rgba(0,212,255,.08); }
          50% { box-shadow: 0 0 100px rgba(57,255,20,.3), 0 20px 60px rgba(0,0,0,.5), inset 0 0 100px rgba(57,255,20,.15); }
        }
        @keyframes neonFlicker {
          0%,100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-floatSlow { animation: floatSlow 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounceSlow 1.8s ease-in-out infinite; }
        .animate-target-pulse { animation: targetPulse 2.5s ease-in-out infinite; }
        .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .animate-glow-sweep { animation: glowSweep 3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-center-pulse { animation: centerPulse 3s ease-in-out infinite; }
        .animate-orbit-spin { animation: orbitSpin 6s linear infinite; }
        .animate-gravity-pulse { animation: gravityPulse 4s ease-in-out infinite; }
        .animate-atmosphere-glow { animation: atmosphereGlow 3s ease-in-out infinite; }
        .animate-nebula-drift { animation: nebulaDrift 8s ease-in-out infinite; }
        .animate-screen-shake { animation: screenShake 0.5s ease-in-out; }
        .animate-collect-flash-overlay { animation: collectFlash 0.6s ease-out forwards; }
        .animate-collect-glow { animation: collectGlow 0.6s ease-out; }

        .orbit-card:hover {
          z-index: 10;
          transform: translate(-50%, -50%) perspective(700px) scale(1.15) !important;
        }
        .orbit-glow-text {
          text-shadow: 0 0 8px currentColor60, 0 0 16px currentColor30;
        }
        .kawaii-mascot-wrap {
          animation: floatSlow 2s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(0,212,255,0.35));
        }
        .kawaii-mascot-svg {
          transition: transform 0.3s ease;
        }
        .shooting-star {
          position: absolute;
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
          border-radius: 2px;
          transform: rotate(-45deg);
          opacity: 0;
          animation: shootingStar 1.5s ease-out infinite;
        }
        .comet {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          animation: cometFly 2.5s ease-out infinite;
          opacity: 0;
        }
        .comet-head {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: relative;
        }
        .comet-tail {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 2px;
          transform: translateY(-50%) rotate(-45deg);
          transform-origin: left center;
          border-radius: 2px;
          opacity: 0.6;
        }
        .orbit-ring {
          transition: box-shadow 0.5s ease;
        }
        .orbit-arena:hover .orbit-ring {
          box-shadow: 0 0 30px rgba(0,212,255,0.15), inset 0 0 30px rgba(0,212,255,0.1);
        }
        .score-3d {
          transform: translateZ(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .score-3d:hover {
          transform: translateZ(20px) scale(1.08);
        }
        .gameover-stat-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gameover-stat-card:hover {
          transform: translateZ(25px) scale(1.05);
        }

        @media (max-width: 640px) {
          .orbit-card { font-size: 10px; min-width: 60px; padding: 6px 8px; }
          .orbit-card span:last-child { display: none; }
        }
      `}</style>
    </StarfieldBackground>
  );
}
export { ReComponent as default };
