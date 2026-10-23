import { BookOpenIcon, TrophyIcon, ZapIcon, HeartIcon, ArrowLeftIcon, CloudRainIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { b, c, g as g_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const Q = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#b829dd"];
function Q1Component() {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-14px); }
      }
      @keyframes bounce-excited {
        0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
        20% { transform: translateY(-24px) scale(1.12) rotate(-6deg); }
        40% { transform: translateY(0) scale(0.94) rotate(0deg); }
        60% { transform: translateY(-12px) scale(1.06) rotate(4deg); }
        80% { transform: translateY(0) scale(1) rotate(0deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.3); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
      }
      @keyframes shake-wave {
        0%, 100% { transform: translateX(0) translateY(0); }
        15% { transform: translateX(-10px) translateY(-3px); }
        30% { transform: translateX(10px) translateY(2px); }
        45% { transform: translateX(-6px) translateY(-1px); }
        60% { transform: translateX(6px) translateY(1px); }
        75% { transform: translateX(-3px) translateY(0); }
        90% { transform: translateX(3px) translateY(0); }
      }
      @keyframes combo-pop {
        0% { transform: scale(0.4); opacity: 0; }
        60% { transform: scale(1.25); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes neon-border-pulse {
        0%, 100% { border-color: rgba(0,212,255,0.35); box-shadow: 0 0 20px rgba(0,212,255,0.08), inset 0 0 20px rgba(0,212,255,0.03); }
        50% { border-color: rgba(0,212,255,0.7); box-shadow: 0 0 40px rgba(0,212,255,0.25), inset 0 0 30px rgba(0,212,255,0.08); }
      }
      @keyframes title-glow {
        0%, 100% { text-shadow: 0 0 30px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1); }
        50% { text-shadow: 0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2); }
      }
      @keyframes grid-scroll {
        0% { background-position: 0 0; }
        100% { background-position: 0 40px; }
      }
      @keyframes fall-streak {
        0% { opacity: 0.5; transform: scaleY(0); transform-origin: top; }
        100% { opacity: 0; transform: scaleY(1); transform-origin: top; }
      }
      @keyframes heart-beat {
        0%, 100% { transform: scale(1); }
        15% { transform: scale(1.25); }
        30% { transform: scale(1); }
        45% { transform: scale(1.15); }
      }
      @keyframes score-bump {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      @keyframes waterfall-flow {
        0% { background-position: 0 0; }
        100% { background-position: 0 200px; }
      }
      @keyframes waterfall-glow {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
      @keyframes splash-particle {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-50px) scale(0); opacity: 0; }
      }
      @keyframes ripple-expand {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; border-width: 3px; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; border-width: 0px; }
      }
      @keyframes level-flash {
        0% { opacity: 0; }
        20% { opacity: 0.5; }
        100% { opacity: 0; }
      }
      @keyframes bucket-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1), inset 0 0 20px rgba(0,212,255,0.1); }
        50% { box-shadow: 0 0 50px rgba(0,212,255,0.7), 0 0 100px rgba(0,212,255,0.3), inset 0 0 30px rgba(0,212,255,0.2); }
      }
      @keyframes glow-pulse-fast {
        0%, 100% { filter: brightness(1); box-shadow: 0 0 15px currentColor; }
        50% { filter: brightness(1.6); box-shadow: 0 0 35px currentColor, 0 0 70px currentColor; }
      }
      @keyframes wave-distort {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-2px) rotate(0.5deg); }
        75% { transform: translateY(2px) rotate(-0.5deg); }
      }
      @keyframes stats-card-enter {
        0% { transform: perspective(800px) rotateX(25deg) translateY(40px) translateZ(-30px); opacity: 0; }
        100% { transform: perspective(800px) rotateX(0deg) translateY(0) translateZ(0); opacity: 1; }
      }
      @keyframes neon-ring-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes float-particle {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
      }
      @keyframes score-float-3d {
        0%, 100% { transform: translateZ(30px) rotateX(0deg); }
        50% { transform: translateZ(40px) rotateX(3deg); }
      }
      @keyframes container-glow {
        0%, 100% { box-shadow: inset 0 0 40px rgba(0,212,255,0.05), 0 0 30px rgba(0,0,0,0.4); }
        50% { box-shadow: inset 0 0 60px rgba(0,212,255,0.1), 0 0 50px rgba(0,212,255,0.1); }
      }
      .worddrop-stagger-1 { animation-delay: 0.05s; }
      .worddrop-stagger-2 { animation-delay: 0.1s; }
      .worddrop-stagger-3 { animation-delay: 0.15s; }
      .worddrop-stagger-4 { animation-delay: 0.2s; }
    `}</style>
  );
}
function GComponent({ mood }) {
  const b = mood === "excited" ? -3 : mood === "sad" ? 2 : 0;
  const d_1 =
    mood === "happy"
      ? "M 30,44 Q 40,52 50,44"
      : mood === "sad"
        ? "M 30,48 Q 40,42 50,48"
        : mood === "excited"
          ? "M 32,42 Q 40,56 48,42"
          : "M 35,46 Q 40,46 45,46";
  const opacity = mood === "happy" || mood === "excited" ? 0.6 : 0.25;
  const o = mood === "excited" ? "bounce-excited" : "float";
  const r = mood === "excited" ? "0.8s" : "3s";
  return (
    <div
      className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50 pointer-events-none"
      style={{
        animation: `${o} ${r} ease-in-out infinite`,
      }}
    >
      <svg width="72" height="72" viewBox="0 0 80 80" className="drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]">
        <defs>
          <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#2080ff" stopOpacity="0.65" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path
          d="M40,8 C18,8 8,30 8,52 C8,68 22,78 40,78 C58,78 72,68 72,52 C72,30 62,8 40,8 Z"
          fill="url(#dropGrad)"
          stroke="#00d4ff"
          strokeWidth="2.5"
          filter="url(#glow)"
        />
        <circle cx="30" cy="36" r="5" fill="#0b0f2e" />
        <circle cx="50" cy="36" r="5" fill="#0b0f2e" />
        <circle
          cx="31"
          cy="34"
          r="1.8"
          fill="#fff"
          style={{
            transform: `translateY(${b}px)`,
          }}
        />
        <circle
          cx="51"
          cy="34"
          r="1.8"
          fill="#fff"
          style={{
            transform: `translateY(${b}px)`,
          }}
        />
        <path d={d_1} stroke="#0b0f2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="22" cy="42" r="5.5" fill="#ff6b9d" opacity={opacity} />
        <circle cx="58" cy="42" r="5.5" fill="#ff6b9d" opacity={opacity} />
        <ellipse cx="28" cy="20" rx="9" ry="4.5" fill="#fff" opacity="0.35" transform="rotate(-18 28 20)" />
      </svg>
    </div>
  );
}
function J(n, b) {
  const s = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#ff3860", "#b829dd", "#ffffff"];
  const d = n !== undefined ? (window.innerWidth * n) / 100 : window.innerWidth / 2;
  const o = b !== undefined ? (window.innerHeight * b) / 100 : window.innerHeight / 2;
  const r = 90;
  for (let f = 0; f < r; f++) {
    const m = document.createElement("div");
    const w = 5 + Math.random() * 9;
    const g = s[Math.floor(Math.random() * s.length)];
    const N = Math.random() > 0.5;
    m.style.cssText = `position:fixed;left:${d}px;top:${o}px;width:${w}px;height:${w}px;${N ? "border-radius:2px;" : "border-radius:50%;"}background:${g};pointer-events:none;z-index:9999;box-shadow:0 0 14px ${g}, 0 0 28px ${g}80;`;
    document.body.appendChild(m);
    const u = Math.random() * Math.PI * 2;
    const v = 3 + Math.random() * 14;
    let j = d;
    let y = o;
    let x = 1;
    const R = Math.cos(u) * v;
    let h = Math.sin(u) * v - 5;
    let z = Math.random() * 360;
    const S = (Math.random() - 0.5) * 24;
    const C = () => {
      j += R;
      y += h;
      h += 0.28;
      x -= 0.011;
      z += S;
      m.style.left = `${j}px`;
      m.style.top = `${y}px`;
      m.style.opacity = String(x);
      m.style.transform = `rotate(${z}deg) scale(${x})`;
      if (x > 0) {
        requestAnimationFrame(C);
      } else {
        m.remove();
      }
    };
    requestAnimationFrame(C);
  }
}
function me(n, b, color) {
  for (let o = 0; o < 35; o++) {
    const r = document.createElement("div");
    const f = 3 + Math.random() * 8;
    const m = Math.random() > 0.5;
    const w = Math.random() > 0.5;
    const g = (window.innerWidth * n) / 100;
    const N = (window.innerHeight * b) / 100;
    r.style.cssText = `position:fixed;left:${g}px;top:${N}px;width:${f}px;height:${f}px;${m ? "border-radius:2px;" : "border-radius:50%;"}${w ? `background:radial-gradient(circle, rgba(255,255,255,0.9), ${color});box-shadow:0 0 10px ${color},0 0 20px ${color}80;` : `background:${color};box-shadow:0 0 14px ${color},0 0 28px ${color}80;`}pointer-events:none;z-index:9998;`;
    document.body.appendChild(r);
    const u = Math.random() * Math.PI * 2;
    const v = 2 + Math.random() * 9;
    let j = g;
    let y = N;
    let x = 1;
    const R = Math.cos(u) * v;
    let h = Math.sin(u) * v - 5;
    let z = Math.random() * 360;
    const S = (Math.random() - 0.5) * 28;
    const C = () => {
      j += R;
      y += h;
      h += 0.28;
      x -= 0.011;
      z += S;
      r.style.left = `${j}px`;
      r.style.top = `${y}px`;
      r.style.opacity = String(x);
      r.style.transform = `rotate(${z}deg) scale(${x})`;
      if (x > 0) {
        requestAnimationFrame(C);
      } else {
        r.remove();
      }
    };
    requestAnimationFrame(C);
  }
  for (let o = 0; o < 2; o++) {
    const r = document.createElement("div");
    const f = o * 100;
    r.style.cssText = `position:fixed;left:${n}vw;top:${b}vh;width:20px;height:20px;border-radius:50%;border:2px solid ${color};pointer-events:none;z-index:9997;box-shadow:0 0 15px ${color};animation:ripple-expand 0.5s ease-out ${f}ms forwards;`;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 700);
  }
}
function ge(n, b, s, color) {
  const o = document.createElement("div");
  o.textContent = n;
  o.style.cssText = `position:fixed;left:${b}vw;top:${s}vh;color:${color};font-weight:900;font-size:20px;pointer-events:none;z-index:9999;text-shadow:0 0 12px ${color}, 0 0 24px ${color}80;transform:translate(-50%,-50%);font-family:sans-serif;white-space:nowrap;`;
  document.body.appendChild(o);
  let r = (window.innerHeight * s) / 100;
  let f = 1;
  const m = () => {
    r -= 2;
    f -= 0.016;
    o.style.top = `${r}px`;
    o.style.opacity = String(f);
    o.style.transform = `translate(-50%,-50%) scale(${1 + (1 - f) * 0.4})`;
    if (f > 0) {
      requestAnimationFrame(m);
    } else {
      o.remove();
    }
  };
  requestAnimationFrame(m);
}
function be(n, b) {
  for (let s = 0; s < 3; s++) {
    const d = document.createElement("div");
    const o = s * 120;
    const r = 24 + s * 16;
    d.style.cssText = `position:fixed;left:${n}vw;top:${b}vh;width:${r}px;height:${r}px;border-radius:50%;border:2px solid rgba(0,212,255,${0.7 - s * 0.2});pointer-events:none;z-index:9997;box-shadow:0 0 20px rgba(0,212,255,${0.5 - s * 0.15}),inset 0 0 20px rgba(0,212,255,${0.2 - s * 0.05});animation:ripple-expand 0.7s ease-out ${o}ms forwards;`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 900 + o);
  }
  for (let s = 0; s < 8; s++) {
    const d = document.createElement("div");
    const o = 3 + Math.random() * 5;
    const r = Math.random() > 0.5 ? "#00d4ff" : "#2080ff";
    const f = (window.innerWidth * n) / 100;
    const m = (window.innerHeight * b) / 100;
    d.style.cssText = `position:fixed;left:${f}px;top:${m}px;width:${o}px;height:${o}px;border-radius:50%;background:${r};pointer-events:none;z-index:9998;box-shadow:0 0 10px ${r};`;
    document.body.appendChild(d);
    const w = Math.random() * Math.PI * 2;
    const g = 2 + Math.random() * 5;
    let N = Math.cos(w) * g;
    let u = Math.sin(w) * g - 3;
    let v = f;
    let j = m;
    let y = 1;
    const x = () => {
      v += N;
      j += u;
      u += 0.2;
      y -= 0.02;
      d.style.left = `${v}px`;
      d.style.top = `${j}px`;
      d.style.opacity = String(y);
      if (y > 0) {
        requestAnimationFrame(x);
      } else {
        d.remove();
      }
    };
    requestAnimationFrame(x);
  }
}
function ue() {
  const n = document.createElement("div");
  n.style.cssText =
    "position:fixed;inset:0;background:radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);pointer-events:none;z-index:10000;animation:level-flash 0.6s ease-out forwards;";
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 600);
}
function JeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [r, setR] = React.useState("select");
  const [m, setM] = React.useState([]);
  const [g, setG] = React.useState(0);
  const [u, setU] = React.useState(3);
  const [value, setValue] = React.useState("");
  const [x, setX] = React.useState(0);
  const [h, setH] = React.useState(1);
  const [S, setS] = React.useState(false);
  const [X, setX_1] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("worddrop_best") || "0");
    } catch {
      return 0;
    }
  });
  const ORef = React.useRef(0);
  const DRef = React.useRef([]);
  const ERef = React.useRef();
  const BRef = React.useRef(null);
  const TRef = React.useRef(null);
  const YRef = React.useRef(null);
  const ZRef = React.useRef(1);
  const U = React.useCallback(
    (t) => {
      playClick();
      const a = (t ? b(t) : c())
        .map((p) => ({
          es: p.espanol.trim(),
          zh: p.chino.trim(),
        }))
        .filter((p) => p.es && p.zh && !p.es.includes(" "));
      if (a.length < 5) {
        alert("Este módulo no tiene suficientes palabras simples");
        return;
      }
      DRef.current = a;
      ZRef.current = 1;
      setG(0);
      setU(3);
      setX(0);
      setH(1);
      setM([]);
      setValue("");
      setR("playing");
      setS(true);
      ORef.current = 0;
    },
    [playClick],
  );
  const _ = React.useCallback(() => {
    const DRef_current = DRef.current;
    if (!DRef_current.length) {
      return;
    }
    const i = DRef_current[Math.floor(Math.random() * DRef_current.length)];
    const id = ++ORef.current;
    const x_1 = 10 + Math.random() * 80;
    const speed = 0.15 + h * 0.03;
    const color = Q[id % Q.length];
    setM((l) => [
      ...l,
      {
        id,
        word: i.zh,
        translation: i.es,
        x: x_1,
        y: -5,
        speed,
        color,
      },
    ]);
  }, [h]);
  React.useEffect(() => {
    if (!S) {
      return;
    }
    let t = 0;
    const i = () => {
      const a = Date.now();
      const p = Math.max(2500, 5000 - h * 300);
      if (a - t > p) {
        _();
        t = a;
      }
      setM((M) =>
        M.map((l) => ({
          ...l,
          y: l.y + l.speed,
        })).filter((l) => {
          if (l.y > 100) {
            be(l.x, 92);
            const A = document.getElementById("word-drop-game-area");
            if (A) {
              A.style.animation = "shake-wave 0.6s ease-in-out";
              setTimeout(() => (A.style.animation = ""), 600);
            }
            setU((re) => {
              const H = re - 1;
              if (H <= 0) {
                setS(false);
                setR("gameover");
                playLose();
              }
              return H;
            });
            return false;
          }
          return true;
        }),
      );
      ERef.current = requestAnimationFrame(i);
    };
    ERef.current = requestAnimationFrame(i);
    return () => {
      if (ERef.current) {
        cancelAnimationFrame(ERef.current);
      }
    };
  }, [S, h, _, playLose]);
  const onChange = (t) => {
    const value = t.target.value;
    setValue(value);
    const a = m.find((p) => p.translation.toLowerCase() === value.toLowerCase());
    if (a) {
      playCorrect();
      setM((k) => k.filter((l) => l.id !== a.id));
      setValue("");
      const p = x + 1;
      setX(p);
      const M = 100 + p * 25;
      setG((k) => k + M);
      if (p % 5 === 0) {
        setH((k) => k + 1);
      }
      if (YRef.current) {
        YRef.current.style.animation = "none";
        YRef.current.offsetWidth;
        YRef.current.style.animation = "bucket-glow 0.4s ease-in-out";
        setTimeout(() => {
          if (YRef.current) {
            YRef.current.style.animation = "";
          }
        }, 400);
      }
      me(a.x, a.y, a.color);
      ge(`+${M}`, a.x, Math.max(a.y - 8, 5), a.color);
      J(a.x, a.y);
      if (TRef.current) {
        TRef.current.style.animation = "none";
        TRef.current.offsetWidth;
        TRef.current.style.animation = "score-bump 0.3s ease-out";
      }
    }
  };
  const onClick = () => {
    setR("select");
    setS(false);
  };
  React.useEffect(() => {
    const BRef_current = BRef.current;
    if (!BRef_current) {
      return;
    }
    const i = BRef_current.getContext("2d");
    if (!i) {
      return;
    }
    let a;
    const p = [];
    for (let l = 0; l < 80; l++) {
      p.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 2 + Math.random() * 6,
        len: 10 + Math.random() * 20,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    const M = () => {
      BRef_current.width = window.innerWidth;
      BRef_current.height = window.innerHeight;
    };
    M();
    window.addEventListener("resize", M);
    const k = () => {
      i.clearRect(0, 0, BRef_current.width, BRef_current.height);
      i.strokeStyle = "rgba(0, 212, 255, 0.15)";
      i.lineWidth = 1;
      for (const l of p) {
        l.y += l.speed;
        if (l.y > BRef_current.height) {
          l.y = -20;
          l.x = Math.random() * BRef_current.width;
        }
        i.beginPath();
        i.moveTo(l.x, l.y);
        i.lineTo(l.x, l.y + l.len);
        i.strokeStyle = `rgba(0, 212, 255, ${l.opacity})`;
        i.stroke();
      }
      a = requestAnimationFrame(k);
    };
    k();
    return () => {
      cancelAnimationFrame(a);
      window.removeEventListener("resize", M);
    };
  }, []);
  const te = g_1();
  const mood = React.useMemo(() => {
    if (r === "gameover") {
      if (g > X) {
        return "excited";
      }
      return "sad";
    }
    if (r === "select" || !S) {
      return "neutral";
    }
    if (u === 1) {
      return "sad";
    }
    if (x >= 5) {
      return "excited";
    }
    if (x >= 2) {
      return "happy";
    }
    return "neutral";
  }, [r, S, u, x, g, X]);
  React.useEffect(() => {
    if (h > ZRef.current && S) {
      ue();
    }
    ZRef.current = h;
  }, [h, S]);
  if (r === "select") {
    return (
      <StarfieldBackground>
        <Q1Component />
        <GComponent mood={mood} />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative">
          <SoundToggles />
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-12">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: "linear-gradient(135deg,#00d4ff,#2080ff)",
                boxShadow: "0 0 50px rgba(0,212,255,0.55), 0 0 100px rgba(0,212,255,0.2)",
                animation: "float 3s ease-in-out infinite",
                transform: "translateZ(40px)",
              }}
            >
              <CloudRainIcon size={40} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black text-white mb-3"
              style={{
                animation: "title-glow 3s ease-in-out infinite",
              }}
            >
              Word Drop
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto">
              Escribe las traducciones antes de que toquen el suelo / 在单词落地前输入翻译
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {te.map((t, i) => (
              <button
                key={t.id}
                onClick={() => U(t.id)}
                className={`group relative rounded-2xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 worddrop-stagger-${(i % 4) + 1}`}
                style={{
                  background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.45))",
                  border: `1.5px solid ${t.color}50`,
                  backdropFilter: "blur(14px)",
                  boxShadow: `0 0 0 ${t.color}10, 0 4px 20px rgba(0,0,0,0.4)`,
                  animation: "combo-pop 0.5s ease-out backwards",
                  animationDelay: `${i * 0.05}s`,
                  transform: "translateZ(0)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(a) => {
                  a.currentTarget.style.borderColor = `${t.color}cc`;
                  a.currentTarget.style.boxShadow = `0 0 20px ${t.color}30, 0 4px 20px rgba(0,0,0,0.4)`;
                  a.currentTarget.style.transform = "translateZ(20px) scale(1.03)";
                }}
                onMouseLeave={(a) => {
                  a.currentTarget.style.borderColor = `${t.color}50`;
                  a.currentTarget.style.boxShadow = `0 0 0 ${t.color}10, 0 4px 20px rgba(0,0,0,0.4)`;
                  a.currentTarget.style.transform = "translateZ(0) scale(1)";
                }}
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-lg mb-3"
                  style={{
                    background: `${t.color}18`,
                    boxShadow: `0 0 12px ${t.color}25`,
                  }}
                >
                  <BookOpenIcon
                    size={22}
                    style={{
                      color: t.color,
                    }}
                  />
                </div>
                <p className="text-sm md:text-base font-black text-white">{t.titulo}</p>
                <p
                  className="text-xs md:text-sm font-medium"
                  style={{
                    color: `${t.color}aa`,
                  }}
                >
                  {t.tituloChino}
                </p>
              </button>
            ))}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  if (r === "gameover") {
    const t = g > X;
    if (t) {
      try {
        localStorage.setItem("worddrop_best", String(g));
        setX_1(g);
      } catch {}
      setTimeout(() => J(), 300);
    }
    return (
      <StarfieldBackground>
        <Q1Component />
        <GComponent mood={mood} />
        <div
          className="max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center relative"
          style={{
            perspective: "800px",
          }}
        >
          <SoundToggles />
          <div
            className="relative mb-6"
            style={{
              transform: "translateZ(50px)",
            }}
          >
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#ffd600,#ff3860)",
                boxShadow: "0 0 60px rgba(255,214,0,0.4), 0 0 120px rgba(255,56,96,0.15)",
                animation: "float 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite",
              }}
            >
              <TrophyIcon size={52} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            {t && (
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-20px",
                  background: "linear-gradient(135deg, #ffd600, #ff3860)",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 900,
                  boxShadow: "0 0 20px rgba(255,214,0,0.6)",
                  animation: "combo-pop 0.5s ease-out",
                  whiteSpace: "nowrap",
                }}
              >
                ¡NUEVO RÉCORD!
              </div>
            )}
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-2"
            style={{
              animation: "title-glow 3s ease-in-out infinite",
              transform: "translateZ(30px)",
            }}
          >
            ¡Resultados!
          </h1>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8 mt-4"
            style={{
              perspective: "800px",
            }}
          >
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.5))",
                border: "1.5px solid rgba(255,255,255,.12)",
                boxShadow: "0 0 30px rgba(255,214,0,0.08), 0 20px 40px rgba(0,0,0,0.3)",
                animation: "stats-card-enter 0.6s ease-out backwards",
                animationDelay: "0.1s",
                transformStyle: "preserve-3d",
                backdropFilter: "blur(10px)",
              }}
            >
              <p className="text-sm text-white/40 mb-1">Score</p>
              <p
                className="text-4xl md:text-5xl font-black"
                style={{
                  color: "#ffd600",
                  textShadow: "0 0 20px rgba(255,214,0,0.4), 0 0 40px rgba(255,214,0,0.2)",
                  transform: "translateZ(20px)",
                }}
              >
                {g}
              </p>
            </div>
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.5))",
                border: "1.5px solid rgba(255,255,255,.12)",
                boxShadow: "0 0 30px rgba(57,255,20,0.08), 0 20px 40px rgba(0,0,0,0.3)",
                animation: "stats-card-enter 0.6s ease-out backwards",
                animationDelay: "0.3s",
                transformStyle: "preserve-3d",
                backdropFilter: "blur(10px)",
              }}
            >
              <p className="text-sm text-white/40 mb-1">Mejor</p>
              <p
                className="text-4xl md:text-5xl font-black"
                style={{
                  color: "#39ff14",
                  textShadow: "0 0 20px rgba(57,255,20,0.4), 0 0 40px rgba(57,255,20,0.2)",
                  transform: "translateZ(20px)",
                }}
              >
                {X}
              </p>
            </div>
          </div>
          <button
            onClick={onClick}
            className="px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-black text-sm md:text-base transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#2080ff)",
              boxShadow: "0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.15)",
              transform: "translateZ(40px)",
            }}
          >
            Jugar de nuevo / 再玩一次
          </button>
          <P currentGameId="word-drop" />
        </div>
      </StarfieldBackground>
    );
  }
  const strokeDasharray = 2 * Math.PI * 8;
  const strokeDashoffset = strokeDasharray - ((x % 5) / 5) * strokeDasharray;
  return (
    <StarfieldBackground>
      <Q1Component />
      <GComponent mood={mood} />
      <canvas
        ref={BRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 1,
        }}
      />
      <div
        className="max-w-5xl mx-auto px-3 py-4 md:px-4 md:py-6 min-h-screen relative"
        style={{
          zIndex: 2,
        }}
      >
        <SoundToggles />
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
            <div
              ref={TRef}
              className="flex items-center gap-1 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1.5px solid rgba(255,214,0,.3)",
                color: "#ffd600",
                boxShadow: "0 0 12px rgba(255,214,0,0.15), 0 0 30px rgba(255,214,0,0.08)",
                transform: "translateZ(30px)",
                animation: "score-float-3d 3s ease-in-out infinite",
                textShadow: "0 0 8px rgba(255,214,0,0.4)",
              }}
            >
              <ZapIcon size={12} /> {g}
            </div>
            <div
              className="flex items-center gap-1 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,56,96,.12)",
                border: "1.5px solid rgba(255,56,96,.3)",
                color: "#ff3860",
                boxShadow: u === 1 ? "0 0 16px rgba(255,56,96,0.35)" : "0 0 12px rgba(255,56,96,0.15)",
                animation: u === 1 ? "heart-beat 1s ease-in-out infinite" : "none",
                transform: "translateZ(30px)",
              }}
            >
              <HeartIcon size={12} /> {u}
            </div>
            <div
              className="flex items-center gap-1 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(0,212,255,.12)",
                border: "1.5px solid rgba(0,212,255,.3)",
                color: "#00d4ff",
                boxShadow: "0 0 12px rgba(0,212,255,0.15)",
                transform: "translateZ(30px)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "20px",
                  height: "20px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  style={{
                    transform: "rotate(-90deg)",
                  }}
                >
                  <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="2" />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="2"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 4px #00d4ff)",
                      transition: "stroke-dashoffset 0.3s ease",
                    }}
                  />
                </svg>
              </div>
              Nivel {h}
            </div>
          </div>
        </div>
        <div
          id="word-drop-game-area"
          className="relative h-[55vh] md:h-[65vh] rounded-3xl mb-4 md:mb-6 overflow-hidden"
          style={{
            background: "linear-gradient(180deg,rgba(14,22,64,.55),rgba(5,8,27,.35))",
            border: "1.5px solid rgba(255,255,255,.12)",
            backdropFilter: "blur(10px)",
            perspective: "1000px",
            boxShadow: "inset 0 0 40px rgba(0,212,255,0.05), 0 0 30px rgba(0,0,0,0.4)",
            animation: "container-glow 3s ease-in-out infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: "15%",
              width: "50px",
              transform: "translateX(-50%) translateZ(-60px) rotateY(10deg)",
              transformStyle: "preserve-3d",
              opacity: 0.35,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(180deg, rgba(0,212,255,0.05) 0%, rgba(0,212,255,0.25) 40%, rgba(0,212,255,0.35) 60%, rgba(0,212,255,0.15) 100%)",
                backgroundSize: "100% 300px",
                animation: "waterfall-flow 1.5s linear infinite",
                filter: "blur(1px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "2px",
                background:
                  "linear-gradient(180deg, transparent, rgba(0,212,255,0.9), rgba(0,212,255,0.6), transparent)",
                boxShadow: "0 0 15px rgba(0,212,255,0.8)",
                animation: "waterfall-glow 2s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "2px",
                background:
                  "linear-gradient(180deg, transparent, rgba(0,212,255,0.9), rgba(0,212,255,0.6), transparent)",
                boxShadow: "0 0 15px rgba(0,212,255,0.8)",
                animation: "waterfall-glow 2s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-5%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "120px",
                height: "20px",
                background: "radial-gradient(ellipse, rgba(0,212,255,0.3) 0%, transparent 70%)",
                filter: "blur(4px)",
              }}
            />
            {[0, 1, 2, 3, 4, 5].map((t) => (
              <div
                key={`sp-${t}`}
                style={{
                  position: "absolute",
                  width: `${3 + (t % 3)}px`,
                  height: `${3 + (t % 3)}px`,
                  borderRadius: "50%",
                  background: `rgba(0,212,255,${0.5 + (t % 3) * 0.15})`,
                  boxShadow: "0 0 8px rgba(0,212,255,0.8)",
                  left: `${15 + t * 14}%`,
                  bottom: 0,
                  animation: `splash-particle ${0.5 + t * 0.1}s ease-out ${t * 0.08}s infinite`,
                }}
              />
            ))}
          </div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((t) => (
            <div
              key={`fp-${t}`}
              style={{
                position: "absolute",
                width: `${2 + (t % 3)}px`,
                height: `${2 + (t % 3)}px`,
                borderRadius: "50%",
                background: `rgba(0,212,255,${0.15 + (t % 4) * 0.08})`,
                boxShadow: "0 0 6px rgba(0,212,255,0.3)",
                left: `${10 + t * 12}%`,
                top: `${20 + (t % 3) * 25}%`,
                animation: `float-particle ${3 + t * 0.5}s ease-in-out ${t * 0.3}s infinite`,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "20%",
              background: "linear-gradient(to top, rgba(0,212,255,0.08), transparent)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.25) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              animation: "grid-scroll 2s linear infinite",
            }}
          />
          <div
            ref={YRef}
            style={{
              position: "absolute",
              bottom: "2%",
              left: "50%",
              transform: "translateX(-50%) translateZ(50px) rotateX(25deg)",
              transformStyle: "preserve-3d",
              zIndex: 5,
              width: "140px",
              height: "45px",
              borderRadius: "0 0 70px 70px",
              background: "linear-gradient(180deg, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0.04) 100%)",
              border: "2px solid rgba(0,212,255,0.5)",
              borderTop: "none",
              backdropFilter: "blur(6px)",
              boxShadow:
                "0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1), inset 0 0 20px rgba(0,212,255,0.1)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-3px",
                left: "5%",
                right: "5%",
                height: "4px",
                background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.9), transparent)",
                borderRadius: "2px",
                boxShadow: "0 0 10px rgba(0,212,255,0.8)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "10%",
                right: "10%",
                height: "60%",
                background: "linear-gradient(180deg, rgba(0,212,255,0.08), transparent)",
                borderRadius: "0 0 50px 50px",
              }}
            />
          </div>
          {m.map((t) => {
            const i = t.y > 75;
            const a = ((t.id % 5) - 2) * 4;
            const p = 5 + (t.id % 3) * 3;
            return (
              <div
                key={t.id}
                className="absolute text-center"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  transform: "translateX(-50%)",
                  zIndex: 10,
                  transition: "top 0.1s linear",
                }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-full w-px pointer-events-none"
                  style={{
                    height: `${Math.min(t.y * 0.8, 18)}vh`,
                    background: `linear-gradient(to top, ${t.color}60, transparent)`,
                    filter: "blur(1px)",
                    opacity: 0.35,
                  }}
                />
                <div
                  style={{
                    transform: `perspective(400px) rotateX(${p}deg) rotateY(${a}deg) translateZ(40px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="relative px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-black text-white whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}45, ${t.color}10)`,
                      border: `2px solid ${t.color}`,
                      boxShadow: i
                        ? `0 0 30px ${t.color}90, 0 0 60px #ff386040, 0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)`
                        : `0 0 22px ${t.color}55, 0 4px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)`,
                      textShadow: `0 0 12px ${t.color}, 0 2px 6px rgba(0,0,0,0.8)`,
                      animation: i ? "glow-pulse-fast 0.5s ease-in-out infinite" : "none",
                      transform: i ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {t.word}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "100%",
                      transform: "translateX(-50%) translateZ(-30px)",
                      width: "60%",
                      height: "6px",
                      background: `radial-gradient(ellipse, ${t.color}30, transparent)`,
                      borderRadius: "50%",
                      filter: "blur(3px)",
                      marginTop: "2px",
                    }}
                  />
                  <div
                    className="text-[10px] md:text-xs font-bold mt-1"
                    style={{
                      color: `${t.color}cc`,
                      textShadow: `0 0 10px ${t.color}70`,
                    }}
                  >
                    {t.translation}
                  </div>
                </div>
              </div>
            );
          })}
          {x > 1 && (
            <div
              className="absolute top-3 right-3 md:top-4 md:right-4 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs font-black"
              style={{
                background: "rgba(255,214,0,.18)",
                border: "1.5px solid rgba(255,214,0,.4)",
                color: "#ffd600",
                boxShadow: "0 0 20px rgba(255,214,0,0.25), 0 0 40px rgba(255,214,0,0.1)",
                animation: "combo-pop 0.4s ease-out",
                textShadow: "0 0 10px rgba(255,214,0,0.5)",
                transform: "translateZ(30px)",
              }}
            >
              {x}x COMBO
            </div>
          )}
        </div>
        <div className="max-w-lg mx-auto">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full px-5 py-3 md:px-6 md:py-4 rounded-2xl text-white font-black text-base md:text-lg text-center outline-none transition-all"
            style={{
              background: "rgba(14,22,64,.7)",
              border: "2px solid rgba(0,212,255,.35)",
              boxShadow: "0 0 30px rgba(0,212,255,.12), inset 0 0 20px rgba(0,212,255,.04)",
              animation: "neon-border-pulse 2s ease-in-out infinite",
            }}
            onFocus={(t) => {
              t.currentTarget.style.borderColor = "rgba(0,212,255,0.8)";
              t.currentTarget.style.boxShadow =
                "0 0 50px rgba(0,212,255,0.3), inset 0 0 30px rgba(0,212,255,0.08)";
            }}
            onBlur={(t) => {
              t.currentTarget.style.borderColor = "rgba(0,212,255,0.35)";
              t.currentTarget.style.boxShadow =
                "0 0 30px rgba(0,212,255,.12), inset 0 0 20px rgba(0,212,255,.04)";
            }}
            placeholder="Escribe la traducción española / 输入西班牙语翻译..."
            autoFocus
          />
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { JeComponent as default };
