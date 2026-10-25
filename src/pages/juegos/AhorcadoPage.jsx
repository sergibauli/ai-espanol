import {
  SparklesIcon,
  TrophyIcon,
  ZapIcon,
  LightbulbIcon,
  HeartIcon,
  XIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  LayersIcon,
  RotateCcwIcon,
  ClockIcon,
  MoonIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const Ye = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];
const maxTime = 90;
const Fe = 6;
function De(espanol) {
  return espanol
    .toLocaleUpperCase("es-ES")
    .replace(/Ñ/g, "\0")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0000/g, "Ñ")
    .replace(/[^A-ZÑ]/g, "");
}
function Ze(word) {
  return /^[A-ZÑ]+$/i.test(word) && word.length >= 2 && word.length <= 14;
}
function HeComponent({ mood }) {
  const stroke = React.useMemo(() => {
    if (mood === "happy" || mood === "excited") {
      return "#39ff14";
    }
    if (mood === "sad" || mood === "worried") {
      return "#ff4444";
    }
    return "#ffd700";
  }, [mood]);
  const i = React.useMemo(() => {
    if (mood === "excited" || mood === "happy") {
      return "mascotExcited 0.5s ease-in-out infinite";
    }
    return "mascotFloat 3s ease-in-out infinite";
  }, [mood]);
  const c = React.useMemo(
    () => ({
      position: "fixed",
      bottom: "16px",
      right: "16px",
      zIndex: 50,
      pointerEvents: "none",
      animation: i,
    }),
    [i],
  );
  const a = React.useMemo(
    () => ({
      position: "absolute",
      inset: 0,
      borderRadius: "9999px",
      background: `radial-gradient(circle, ${stroke}40, transparent 70%)`,
      filter: "blur(20px)",
      animation: "mascotPulse 2s ease-in-out infinite",
    }),
    [stroke],
  );
  const d = React.useMemo(() => {
    if (mood === "happy" || mood === "excited") {
      return "M 35 58 Q 50 70 65 58";
    }
    if (mood === "sad" || mood === "worried") {
      return "M 35 68 Q 50 55 65 68";
    }
    return "M 40 62 Q 50 65 60 62";
  }, [mood]);
  const s = React.useMemo(
    () => ({
      width: "100px",
      height: "100px",
      filter: `drop-shadow(0 0 20px ${stroke}90)`,
    }),
    [stroke],
  );
  return (
    <div className="gm-mascota" style={c}>
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
        }}
      >
        <div style={a} />
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={s}>
          <circle cx="50" cy="50" r="40" fill="url(#monoGrad)" stroke={stroke} strokeWidth="2" />
          <circle cx="38" cy="42" r="5" fill="#1a1a2e" />
          <circle cx="62" cy="42" r="5" fill="#1a1a2e" />
          <circle cx="39.5" cy="40.5" r="2" fill="white" />
          <circle cx="63.5" cy="40.5" r="2" fill="white" />
          <path d={d} stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="52" r="4" fill="rgba(255,105,180,0.5)" />
          <circle cx="70" cy="52" r="4" fill="rgba(255,105,180,0.5)" />
          <defs>
            <radialGradient id="monoGrad" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffd600" />
              <stop offset="100%" stopColor="#ff8a00" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <style>{`
        @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.1)} }
        @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      `}</style>
    </div>
  );
}
function OeComponent({ active }) {
  const fRef = React.useRef(null);
  const iRef = React.useRef([]);
  const cRef = React.useRef(false);
  const aRef = React.useRef(null);
  React.useEffect(() => {
    cRef.current = active;
  }, [active]);
  React.useEffect(() => {
    const fRef_current = fRef.current;
    if (!fRef_current) {
      return;
    }
    const s = fRef_current.getContext("2d");
    if (!s) {
      return;
    }
    let d;
    const g = () => {
      const u = Math.min(window.devicePixelRatio || 1, 1.5);
      fRef_current.width = window.innerWidth * u;
      fRef_current.height = window.innerHeight * u;
      fRef_current.style.width = `${window.innerWidth}px`;
      fRef_current.style.height = `${window.innerHeight}px`;
      s.setTransform(u, 0, 0, u, 0, 0);
    };
    const x = () => {
      const iRef_current = iRef.current;
      if (!cRef.current && iRef_current.length === 0) {
        d = 0;
        return;
      }
      if (document.hidden) {
        d = requestAnimationFrame(x);
        return;
      }
      s.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let p = iRef_current.length - 1; p >= 0; p--) {
        const n = iRef_current[p];
        n.x += n.vx;
        n.y += n.vy;
        n.vy += n.gravity;
        n.vx *= 0.99;
        n.rotation += n.rotSpeed;
        n.life -= n.decay;
        if (n.life <= 0 || n.y > window.innerHeight + 50) {
          iRef_current.splice(p, 1);
          continue;
        }
        s.save();
        s.translate(n.x, n.y);
        s.rotate((n.rotation * Math.PI) / 180);
        s.globalAlpha = n.life * n.a;
        s.fillStyle = n.c;
        s.shadowBlur = 8;
        s.shadowColor = n.c;
        if (n.shape === "circle") {
          s.beginPath();
          s.arc(0, 0, n.r, 0, Math.PI * 2);
          s.fill();
        } else if (n.shape === "square") {
          s.fillRect(-n.r / 2, -n.r / 2, n.r, n.r);
        } else {
          s.beginPath();
          s.moveTo(0, -n.r);
          s.lineTo(n.r * 0.866, n.r * 0.5);
          s.lineTo(-n.r * 0.866, n.r * 0.5);
          s.closePath();
          s.fill();
        }
        s.restore();
      }
      d = requestAnimationFrame(x);
    };
    aRef.current = x;
    g();
    window.addEventListener("resize", g);
    x();
    return () => {
      cancelAnimationFrame(d);
      window.removeEventListener("resize", g);
    };
  }, []);
  React.useEffect(() => {
    const l = [];
    if (active) {
      aRef.current?.();
      for (let s = 0; s < 2; s++) {
        l.push(
          window.setTimeout(() => {
            const iRef_current = iRef.current;
            const g = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#b829dd"];
            for (let x = 0; x < 70; x++) {
              const u = Math.random() * Math.PI * 2;
              const p = 3 + Math.random() * 15;
              iRef_current.push({
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
                y: window.innerHeight / 2 - 100 + (Math.random() - 0.5) * 50,
                vx: Math.cos(u) * p,
                vy: Math.sin(u) * p - 8,
                r: 4 + Math.random() * 10,
                a: 1,
                c: g[Math.floor(Math.random() * g.length)],
                life: 1,
                decay: 0.002 + Math.random() * 0.004,
                gravity: 0.06 + Math.random() * 0.1,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 25,
                shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
              });
            }
          }, s * 260),
        );
      }
    }
    return () => l.forEach((s) => clearTimeout(s));
  }, [active]);
  return (
    <canvas
      ref={fRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 101,
        pointerEvents: "none",
      }}
    />
  );
}
function VeComponent({ wrongCount, gameStatus }) {
  const i = gameStatus === "lost";
  const c = gameStatus === "won";
  const a = i ? "#ff4444" : c ? "#39ff14" : "#00d4ff";
  const l = React.useCallback((b) => wrongCount >= b + 1 || c, [wrongCount, c]);
  const s = React.useCallback(
    (b, k, F) => {
      if (l(b)) {
        return {
          opacity: 1,
          transform: "scale(1)",
          animation: "hangmanPartAppear 0.6s cubic-bezier(.34,1.56,.64,1) forwards",
          transformOrigin: `${k}px ${F}px`,
        };
      }
      return {
        opacity: 0,
        transform: "scale(0)",
      };
    },
    [l],
  );
  const d = React.useCallback(
    (b) => ({
      strokeDasharray: "400",
      strokeDashoffset: l(b) ? "0" : "400",
      transition: `stroke-dashoffset 0.5s ease ${b * 0.05}s`,
    }),
    [l],
  );
  const g = React.useCallback(
    (b) => ({
      strokeDasharray: "400",
      strokeDashoffset: l(b) ? "0" : "400",
      transition: `stroke-dashoffset 0.7s ease ${b * 0.05}s`,
    }),
    [l],
  );
  const x = l(0);
  const u = i;
  const p = c;
  const n = c ? "hangmanVictoryDance 1.2s ease-in-out infinite" : "none";
  const j = React.useMemo(
    () => ({
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "9999px",
      opacity: 0.15,
      pointerEvents: "none",
      width: "260px",
      height: "260px",
      background: `radial-gradient(circle, ${a}40, transparent 70%)`,
      filter: "blur(25px)",
      animation: c ? "hangmanGlowPulse 2s ease-in-out infinite" : "none",
    }),
    [a, c],
  );
  const S = React.useMemo(
    () => ({
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "9999px",
      opacity: 0.08,
      pointerEvents: "none",
      width: "340px",
      height: "340px",
      background: `radial-gradient(circle, ${a}30, transparent 60%)`,
      filter: "blur(35px)",
    }),
    [a],
  );
  React.useEffect(() => {
    const b = "hangman-keyframes";
    if (document.getElementById(b)) {
      return;
    }
    const k = document.createElement("style");
    k.id = b;
    k.textContent = [
      "@keyframes hangmanPartAppear { 0%{opacity:0; transform:scale(0) translateY(-20px) rotate(-8deg)} 100%{opacity:1; transform:scale(1) translateY(0) rotate(0deg)} }",
      "@keyframes hangmanVictoryDance { 0%,100%{transform:rotate(0deg) translateY(0)} 25%{transform:rotate(6deg) translateY(-6px)} 50%{transform:rotate(0deg) translateY(0)} 75%{transform:rotate(-6deg) translateY(-6px)} }",
      "@keyframes hangmanGlowPulse { 0%,100%{opacity:0.15; transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.25; transform:translate(-50%,-50%) scale(1.05)} }",
      "@keyframes hangmanKnotPulse { 0%,100%{opacity:0.8; transform:scale(1)} 50%{opacity:1; transform:scale(1.4)} }",
    ].join(" ");
    document.head.appendChild(k);
    return () => {};
  }, []);
  const id = "gallowGrad";
  const stroke = `url(#${id})`;
  return (
    <div
      className="relative mx-auto"
      style={{
        width: 260,
        height: 360,
      }}
    >
      <div style={j} />
      <div style={S} />
      <svg
        width="260"
        height="360"
        viewBox="0 0 260 360"
        className="mx-auto overflow-visible"
        style={{
          filter: `drop-shadow(0 0 10px ${a}50)`,
        }}
      >
        <defs>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={i ? "#ff4444" : "#00d4ff"} />
            <stop offset="100%" stopColor={i ? "#ff6b35" : "#b829dd"} />
          </linearGradient>
        </defs>
        <g
          style={{
            animation: n,
            transformOrigin: "150px 320px",
          }}
        >
          <g>
            <line
              x1="30"
              y1="320"
              x2="210"
              y2="320"
              stroke={stroke}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />
            <line
              x1="60"
              y1="320"
              x2="60"
              y2="30"
              stroke={stroke}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />
            <line
              x1="60"
              y1="30"
              x2="180"
              y2="30"
              stroke={stroke}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />
            <line
              x1="60"
              y1="320"
              x2="95"
              y2="80"
              stroke={i ? "#ff4444" : a}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.4"
              filter="url(#softGlow)"
            />
            <line
              x1="150"
              y1="30"
              x2="150"
              y2="70"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2.5"
              strokeDasharray="4,3"
              filter="url(#softGlow)"
            />
            <circle
              cx="150"
              cy="70"
              r="3"
              fill={i ? "#ff4444" : a}
              filter="url(#softGlow)"
              style={{
                animation: "hangmanKnotPulse 2s ease-in-out infinite",
              }}
            />
          </g>
          <g style={s(0, 150, 92)}>
            <circle
              cx="150"
              cy="92"
              r="18"
              fill="none"
              stroke={a}
              strokeWidth="3"
              filter="url(#neonGlow)"
              style={g(0)}
            />
            <circle
              cx="150"
              cy="92"
              r="13"
              fill="none"
              stroke={a}
              strokeWidth="1"
              opacity="0.3"
              filter="url(#softGlow)"
              style={g(0)}
            />
            {x && !u && (
              <g
                style={{
                  opacity: x ? 1 : 0,
                  transition: "opacity 0.3s 0.4s",
                }}
              >
                <ellipse cx="143" cy="89" rx="3.5" ry={p ? 3.5 : 3} fill="#fff" filter="url(#softGlow)" />
                <circle cx="143" cy="89" r="2" fill="#1a1a2e" />
                <circle cx="144" cy="88" r="0.8" fill="#fff" opacity="0.9" />
                <ellipse cx="157" cy="89" rx="3.5" ry={p ? 3.5 : 3} fill="#fff" filter="url(#softGlow)" />
                <circle cx="157" cy="89" r="2" fill="#1a1a2e" />
                <circle cx="158" cy="88" r="0.8" fill="#fff" opacity="0.9" />
                <path
                  d={p ? "M 140 98 Q 150 107 160 98" : "M 142 98 Q 150 103 158 98"}
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#softGlow)"
                />
                <circle cx="135" cy="96" r="3.5" fill="rgba(255,105,180,0.5)" filter="url(#softGlow)" />
                <circle cx="165" cy="96" r="3.5" fill="rgba(255,105,180,0.5)" filter="url(#softGlow)" />
              </g>
            )}
            {u && (
              <g
                style={{
                  opacity: u ? 1 : 0,
                  transition: "opacity 0.3s 0.4s",
                }}
              >
                <line
                  x1="138"
                  y1="85"
                  x2="148"
                  y2="93"
                  stroke="#ff4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#softGlow)"
                />
                <line
                  x1="148"
                  y1="85"
                  x2="138"
                  y2="93"
                  stroke="#ff4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#softGlow)"
                />
                <line
                  x1="152"
                  y1="85"
                  x2="162"
                  y2="93"
                  stroke="#ff4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#softGlow)"
                />
                <line
                  x1="162"
                  y1="85"
                  x2="152"
                  y2="93"
                  stroke="#ff4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#softGlow)"
                />
                <path
                  d="M 142 102 Q 150 95 158 102"
                  stroke="#ff4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#softGlow)"
                />
              </g>
            )}
          </g>
          <g style={s(1, 150, 140)}>
            <line
              x1="150"
              y1="110"
              x2="150"
              y2="190"
              stroke={a}
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#neonGlow)"
              style={d(1)}
            />
          </g>
          <g style={s(2, 150, 145)}>
            <line
              x1="150"
              y1="145"
              x2="100"
              y2="170"
              stroke={a}
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#neonGlow)"
              style={d(2)}
            />
            <circle
              cx="100"
              cy="170"
              r="3"
              fill={a}
              filter="url(#softGlow)"
              style={{
                opacity: l(2) ? 1 : 0,
                transition: "opacity 0.3s 0.4s",
              }}
            />
          </g>
          <g style={s(3, 150, 145)}>
            <line
              x1="150"
              y1="145"
              x2="200"
              y2="170"
              stroke={a}
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#neonGlow)"
              style={d(3)}
            />
            <circle
              cx="200"
              cy="170"
              r="3"
              fill={a}
              filter="url(#softGlow)"
              style={{
                opacity: l(3) ? 1 : 0,
                transition: "opacity 0.3s 0.4s",
              }}
            />
          </g>
          <g style={s(4, 150, 190)}>
            <line
              x1="150"
              y1="190"
              x2="105"
              y2="245"
              stroke={i ? "#ff4444" : a}
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#neonGlow)"
              style={d(4)}
            />
            <path
              d="M 100 245 L 110 247 L 105 253 Z"
              fill="none"
              stroke={i ? "#ff4444" : a}
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#softGlow)"
              style={{
                opacity: l(4) ? 1 : 0,
                transition: "opacity 0.3s 0.4s",
              }}
            />
          </g>
          <g style={s(5, 150, 190)}>
            <line
              x1="150"
              y1="190"
              x2="195"
              y2="245"
              stroke={i ? "#ff4444" : a}
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#neonGlow)"
              style={d(5)}
            />
            <path
              d="M 190 245 L 200 247 L 195 253 Z"
              fill="none"
              stroke={i ? "#ff4444" : a}
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#softGlow)"
              style={{
                opacity: l(5) ? 1 : 0,
                transition: "opacity 0.3s 0.4s",
              }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
function XeComponent({ ch, isRevealed, gameLost, index }) {
  const [a, setA] = React.useState(isRevealed);
  React.useEffect(() => {
    if (isRevealed && !a) {
      const d = setTimeout(() => setA(true), index * 80);
      return () => clearTimeout(d);
    }
    if (!isRevealed) {
      setA(false);
    }
  }, [isRevealed, index, a]);
  const s = React.useMemo(() => {
    const d = a
      ? "linear-gradient(135deg, rgba(57,255,20,.25), rgba(57,255,20,.08))"
      : "rgba(255,255,255,.03)";
    const g = a
      ? "2px solid rgba(57,255,20,.6)"
      : gameLost
        ? "1px solid rgba(255,68,68,.3)"
        : "1px solid rgba(255,255,255,.1)";
    const x = a ? "#39ff14" : "transparent";
    const u = a
      ? "0 0 30px rgba(57,255,20,.4), inset 0 0 15px rgba(57,255,20,.15), 0 8px 32px rgba(0,0,0,.3)"
      : "0 4px 16px rgba(0,0,0,.2)";
    const p = index * 0.05;
    const n = a ? `letterReveal 0.6s cubic-bezier(.2,.9,.2,1) ${p}s both` : "none";
    return {
      width: "52px",
      height: "64px",
      borderRadius: "16px",
      background: d,
      border: g,
      color: x,
      boxShadow: u,
      transition: "all 0.4s cubic-bezier(.2,.9,.2,1)",
      animation: n,
      textShadow: a ? "0 0 15px rgba(57,255,20,.8), 0 0 30px rgba(57,255,20,.4)" : "none",
      transform: a ? "translateZ(20px) rotateX(5deg)" : "translateZ(0) rotateX(0deg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.25rem",
      fontWeight: 900,
      position: "relative",
      userSelect: "none",
      transformStyle: "preserve-3d",
    };
  }, [a, gameLost, index]);
  return <div style={s}>{a ? ch : <span className="text-white/10">?</span>}</div>;
}
function EComponent({ ch, isUsed, isCorrect, isWrong, onClick, disabled }) {
  const [s, setS] = React.useState(false);
  const [g, setG] = React.useState(false);
  const u = () => {
    if (!disabled) {
      setS(true);
      setTimeout(() => setS(false), 150);
      onClick();
    }
  };
  const p = React.useMemo(() => {
    const n = isCorrect ? "#46ff9a" : isWrong ? "#ff4444" : "#00d4ff";
    const j = isCorrect
      ? "linear-gradient(145deg, rgba(70,255,154,.35), rgba(70,255,154,.1))"
      : isWrong
        ? "linear-gradient(145deg, rgba(255,68,68,.15), rgba(255,68,68,.05))"
        : s
          ? "rgba(0,212,255,.25)"
          : g
            ? "rgba(0,212,255,.12)"
            : "rgba(255,255,255,.07)";
    const S = isCorrect
      ? `1.5px solid ${n}`
      : isWrong
        ? "1px solid rgba(255,68,68,.2)"
        : s
          ? "1px solid rgba(0,212,255,.6)"
          : g
            ? "1px solid rgba(0,212,255,.4)"
            : "1px solid rgba(255,255,255,.15)";
    const W = isCorrect ? "#46ff9a" : isWrong ? "rgba(255,68,68,.3)" : "#fff";
    const N = isCorrect
      ? `0 0 15px ${n}40, 0 4px 8px rgba(0,0,0,.3)`
      : isWrong
        ? "none"
        : s
          ? "0 0 20px rgba(0,212,255,.4), 0 2px 4px rgba(0,0,0,.3)"
          : g
            ? "0 0 15px rgba(0,212,255,.3), 0 6px 12px rgba(0,0,0,.3)"
            : "0 4px 6px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.05)";
    return {
      background: j,
      border: S,
      color: W,
      boxShadow: N,
      transform: s
        ? "translateY(2px) scale(0.95) translateZ(0)"
        : g
          ? "translateY(-2px) translateZ(10px) rotateX(-5deg)"
          : "translateY(0) translateZ(0) rotateX(0deg)",
      textShadow: isCorrect ? "0 0 8px rgba(70,255,154,.6)" : s ? "0 0 8px rgba(0,212,255,.6)" : "none",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: 700,
      transition: "all 0.15s",
      position: "relative",
      overflow: "hidden",
      userSelect: "none",
      cursor: disabled ? "default" : "pointer",
      touchAction: "manipulation",
    };
  }, [isCorrect, isWrong, s, g, disabled]);
  return (
    <button
      onClick={u}
      disabled={disabled}
      onMouseEnter={() => setG(true)}
      onMouseLeave={() => setG(false)}
      className="mobile-letter-key disabled:pointer-events-none min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] p-2 sm:p-1.5 text-sm sm:text-xs"
      style={p}
    >
      {isWrong && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-0.5 bg-red-500/40 rotate-45 absolute" />
          <div className="w-full h-0.5 bg-red-500/40 -rotate-45 absolute" />
        </div>
      )}
      {ch}
    </button>
  );
}
function QeComponent({ timeLeft, maxTime }) {
  const i = Math.max(0, Math.min(1, timeLeft / maxTime));
  const r_1 = 40;
  const strokeDasharray = 2 * Math.PI * r_1;
  const strokeDashoffset = strokeDasharray * (1 - i);
  const s = i > 0.5 ? "#10b981" : i > 0.25 ? "#ffd700" : "#ef4444";
  const d = `${s}80`;
  return (
    <div
      className="mx-auto mb-6"
      style={{
        position: "relative",
        width: "100px",
        height: "100px",
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        style={{
          filter: `drop-shadow(0 0 8px ${d})`,
        }}
      >
        <circle cx="50" cy="50" r={r_1} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r={r_1}
          fill="none"
          stroke={s}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.3s",
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ClockIcon
          size={13}
          style={{
            color: s,
            marginBottom: "2px",
            filter: `drop-shadow(0 0 4px ${d})`,
          }}
        />
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 900,
            color: s,
            textShadow: `0 0 10px ${d}`,
          }}
        >{`${Math.ceil(timeLeft)}s`}</span>
      </div>
    </div>
  );
}
function UeComponent({ m, onClick }) {
  const [i, setI] = React.useState(false);
  const a = React.useMemo(() => {
    const transform = i ? "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)" : "";
    const d = i ? `0 0 60px ${m.color}30, 0 25px 60px rgba(0,0,0,.5)` : "";
    return {
      background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
      border: `1px solid ${i ? `${m.color}60` : "rgba(255,255,255,.14)"}`,
      backdropFilter: "blur(14px)",
      transformStyle: "preserve-3d",
      transform,
      boxShadow: d,
      transition: "all 0.5s",
    };
  }, [i, m.color]);
  const l = React.useMemo(
    () => ({
      position: "absolute",
      inset: "-2px",
      borderRadius: "26px",
      opacity: i ? 1 : 0,
      transition: "opacity 0.5s",
      pointerEvents: "none",
      background: `linear-gradient(90deg, ${m.color}00, ${m.color}, ${m.color}00)`,
      backgroundSize: "200% 100%",
      animation: "borderRotate 3s linear infinite",
      zIndex: -1,
    }),
    [i, m.color],
  );
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setI(true)}
      onMouseLeave={() => setI(false)}
      className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden"
      style={a}
    >
      <div style={l} />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
          boxShadow: `0 0 20px ${m.color}40`,
        }}
      >
        <BookOpenIcon size={24} className="text-white" />
      </div>
      <h3 className="text-white font-black text-base mb-1">{m.titulo}</h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m.color}aa`,
        }}
      >
        {m.tituloChino}
      </p>
      <p className="text-xs font-medium text-white/40">{m.vocabularioCount} palabras / 词</p>
    </button>
  );
}
function OtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [l, setL] = React.useState("select");
  const [d, setD] = React.useState([]);
  const [x, setX] = React.useState({
    word: "",
    hint: "",
    category: "Vocabulario",
  });
  const [p, setP] = React.useState(new Set());
  const [j, setJ] = React.useState(0);
  const [W, setW] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [F, setF] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("ahorcado_best") || "0");
    } catch {
      return 0;
    }
  });
  const [w, setW_1] = React.useState("playing");
  const [q, setQ] = React.useState("");
  const [ge, setGe] = React.useState(new Set());
  const [be, setBe] = React.useState(false);
  const [D, setD_1] = React.useState([]);
  const [B, setB_1] = React.useState(false);
  const [ye, setYe] = React.useState(true);
  const [R, setR] = React.useState("idle");
  const [te, setTe] = React.useState(0);
  const [H, setH] = React.useState(maxTime);
  const [se, setSe] = React.useState(Date.now());
  const [Ke, setKe] = React.useState(false);
  const VRef = React.useRef(null);
  React.useRef(0);
  const XRef = React.useRef(null);
  const length = Fe;
  const A = x.word.split("");
  const oe = l === "playing" && A.length > 0 && A.every((r) => p.has(r));
  const we = g();
  const [ae, setAe] = React.useState("");
  React.useEffect(() => {
    if (!(w !== "playing" || l !== "playing")) {
      XRef.current = window.setInterval(() => {
        setH((r) => Math.max(0, r - 1));
      }, 1000);
      return () => {
        if (XRef.current) {
          clearInterval(XRef.current);
        }
      };
    }
  }, [w, l]);
  React.useEffect(() => {
    if (D.length === 0) {
      return;
    }
    const r = setTimeout(() => setD_1([]), 1400);
    return () => clearTimeout(r);
  }, [D.length]);
  React.useEffect(() => {
    if (!(l !== "playing" || w !== "playing" || H > 0)) {
      setQ("Tiempo agotado / 时间到");
      setJ(length);
    }
  }, [l, w, H, length]);
  React.useEffect(() => {
    if (R === "happy" || R === "sad" || R === "worried") {
      const r = setTimeout(() => setR("idle"), 1800);
      return () => clearTimeout(r);
    }
  }, [R]);
  React.useEffect(() => {
    if (B) {
      const r = setTimeout(() => setB_1(false), 400);
      return () => clearTimeout(r);
    }
  }, [B]);
  const ne = React.useCallback(
    (r) => {
      playClick();
      let m = r ? a(r) : a();
      if (m.length === 0) {
        setAe(
          'Este modulo no tiene palabras validas para este juego. Prueba con otro modulo o selecciona "Todos los modulos".',
        );
        return;
      }
      const h = m
        .filter((y) => y.espanol && y.chino)
        .map((y) => ({
          word: De(y.espanol),
          hint: y.chino,
          category: "Vocabulario",
        }))
        .filter((y) => Ze(y.word));
      const T = new Set();
      const C = [];
      for (const y of h) {
        if (!T.has(y.word)) {
          T.add(y.word);
          C.push(y);
        }
      }
      const v =
        C.length > 0
          ? C
          : [
              {
                word: "HOLA",
                hint: "你好",
                category: "Vocabulario",
              },
            ];
      setD(v);
      setL("playing");
      setGe(new Set());
      setW(0);
      setB(0);
      setP(new Set());
      setJ(0);
      setW_1("playing");
      setQ("");
      setD_1([]);
      setR("idle");
      setTe(0);
      setH(maxTime);
      setSe(Date.now());
      setX(v[Math.floor(Math.random() * v.length)]);
    },
    [playClick],
  );
  React.useEffect(() => {
    if (oe && w === "playing") {
      setW_1("won");
      const r = (Date.now() - se) / 1000;
      const m = Math.max(0, Math.floor((maxTime - r) * 3));
      const h = te * 5;
      const C = Math.max(100 - j * 10, 10) + m + h;
      setW((v) => v + C);
      setB((v) => {
        const y = v + 1;
        setF((le) => {
          const ie = Math.max(le, y);
          localStorage.setItem("ahorcado_best", String(ie));
          return ie;
        });
        return y;
      });
      setTe(0);
      playWin();
      setR("excited");
      setBe(true);
      if (VRef.current) {
        const v = VRef.current.getBoundingClientRect();
        setD_1((y) => [
          ...y,
          {
            id: Date.now() + Math.random(),
            x: v.width / 2 - 30,
            y: v.height / 2 - 40,
            text: `+${C}`,
            color: "#46ff9a",
            life: 2,
            scale: 1.5,
          },
        ]);
      }
    }
  }, [oe, w, j, playWin, te, se]);
  React.useEffect(() => {
    if (j >= length && w === "playing") {
      setW_1("lost");
      setB(0);
      setTe(0);
      setR("sad");
      playLose();
      setBe(true);
    }
  }, [j, w, playLose, length]);
  const Q = React.useCallback(
    (r) => {
      if (w !== "playing" || p.has(r)) {
        return;
      }
      const m = new Set(p);
      m.add(r);
      setP(m);
      if (x.word.includes(r)) {
        playCorrect();
        setTe((h) => h + 1);
        setR("happy");
      } else {
        setJ((h) => h + 1);
        setTe(0);
        playWrong();
        setR("worried");
        setB_1(true);
      }
    },
    [w, p, x, playCorrect, playWrong],
  );
  React.useEffect(() => {
    const r = (m) => {
      const h = m.key.toUpperCase();
      if (/^[A-ZÑ]$/u.test(h)) {
        Q(h);
      }
    };
    window.addEventListener("keydown", r);
    return () => window.removeEventListener("keydown", r);
  }, [Q]);
  const je = () => {
    playClick();
    setKe(true);
    setTimeout(() => {
      const r = d.filter((h) => !ge.has(h.word) && h.word !== x.word);
      const m =
        r.length > 0 ? r[Math.floor(Math.random() * r.length)] : d[Math.floor(Math.random() * d.length)];
      setX(m);
      setP(new Set());
      setJ(0);
      setW_1("playing");
      setQ("");
      setYe(true);
      setBe(false);
      setR("idle");
      setTe(0);
      setH(maxTime);
      setSe(Date.now());
      setGe((h) => new Set(h).add(x.word));
      setKe(false);
    }, 600);
  };
  const ke = () => {
    playClick();
    setP(new Set());
    setJ(0);
    setW_1("playing");
    setQ("");
    setYe(true);
    setBe(false);
    setR("idle");
    setTe(0);
    setH(maxTime);
    setSe(Date.now());
  };
  const ve = React.useMemo(() => {
    const r = {
      touchAction: "manipulation",
    };
    if (B) {
      return {
        ...r,
        animation: "hangmanScreenShake 0.38s ease-out",
      };
    }
    return r;
  }, [B]);
  const Se = React.useMemo(
    () => ({
      background: "rgba(3,4,17,.92)",
      backdropFilter: "blur(30px)",
      animation: "fadeIn 0.5s ease-out",
    }),
    [],
  );
  const Ne = React.useMemo(
    () => ({
      background: "linear-gradient(135deg,#39ff14,#00d4ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 40px rgba(57,255,20,0.5))",
      animation: "popIn 0.6s cubic-bezier(.34,1.56,.64,1)",
    }),
    [],
  );
  const Me = React.useMemo(
    () => ({
      color: "#ff4444",
      textShadow: "0 0 40px rgba(255,68,68,0.5)",
      animation: "popIn 0.6s cubic-bezier(.34,1.56,.64,1)",
    }),
    [],
  );
  const U = React.useMemo(
    () => ({
      background: "linear-gradient(135deg, rgba(0,212,255,.08), rgba(184,41,221,.04))",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(0,212,255,.25)",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 0 30px rgba(0,212,255,.15), 0 12px 40px rgba(0,0,0,.4)",
      transform: "translateZ(30px) rotateX(3deg)",
      transition: "all 0.4s",
    }),
    [],
  );
  if (l === "select") {
    return (
      <StarfieldBackground>
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10"
          style={{
            perspective: "1000px",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
              style={{
                background: "linear-gradient(135deg,#00d4ff,#b829dd)",
                boxShadow: "0 0 60px rgba(0,212,255,0.5), 0 0 120px rgba(184,41,221,0.2)",
                animation: "ahorcadoFloat 3s ease-in-out infinite",
              }}
            >
              <MoonIcon
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
                <SparklesIcon
                  size={20}
                  style={{
                    color: "#ffd600",
                  }}
                />
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#00d4ff 0%,#b829dd 50%,#ff00aa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(0,212,255,.4))",
                animation: "ahorcadoTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Ahorcado
            </h1>
            <p className="text-white/50 text-lg font-medium">Adivina la palabra / 猜单词</p>
            {ae && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {ae}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{
              perspective: "1000px",
            }}
          >
            <button
              onClick={() => {
                setAe("");
                ne(null);
              }}
              className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                border: "1px solid rgba(255,255,255,.14)",
                backdropFilter: "blur(14px)",
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={(r) => {
                r.currentTarget.style.transform = "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                r.currentTarget.style.boxShadow = "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)";
                r.currentTarget.style.borderColor = "#00d4ff60";
              }}
              onMouseLeave={(r) => {
                r.currentTarget.style.transform = "";
                r.currentTarget.style.boxShadow = "";
                r.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, #00d4ff00, #00d4ff, #00d4ff00)",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 20px rgba(255,0,170,0.3)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base mb-1">Todos los modulos</h3>
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
            {we.map((m) => (
              <UeComponent
                key={m.id}
                m={m}
                onClick={() => {
                  setAe("");
                  ne(m.id);
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes ahorcadoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes ahorcadoTitlePulse { from{filter:drop-shadow(0 0 40px rgba(0,212,255,.4)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(0,212,255,.6)) brightness(1.15)} }
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <HeComponent mood={R} />
      <OeComponent active={w === "won"} />
      <div ref={VRef} className="max-w-4xl mx-auto px-4 py-6 min-h-screen relative z-10" style={ve}>
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {D.map((r) => (
            <div
              key={r.id}
              className="floating-score absolute font-black text-xl"
              style={{
                left: r.x,
                top: r.y,
                color: r.color,
                textShadow: `0 0 20px ${r.color}90`,
              }}
            >
              {r.text}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/juegos"
            onClick={() => playClick()}
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setL("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar modulo / 切换模块
            </button>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,0,170,.1)",
                border: "1px solid rgba(255,0,170,.2)",
                color: "#ff00aa",
              }}
            >
              <TrophyIcon size={12} /> Racha: {b}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(0,212,255,.1)",
                border: "1px solid rgba(0,212,255,.2)",
                color: "#00d4ff",
                textShadow: "0 0 8px rgba(0,212,255,.5)",
                boxShadow: "0 0 15px rgba(0,212,255,.15)",
              }}
            >
              Score: {W}
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <h1
            className="text-5xl md:text-6xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#b829dd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(0,212,255,.3))",
            }}
          >
            <MoonIcon
              size={40}
              className="inline mr-3"
              style={{
                color: "#ffd600",
                filter: "drop-shadow(0 0 10px rgba(255,214,0,.5))",
              }}
            />
            Ahorcado
          </h1>
          <p className="text-white/40 text-sm font-medium">Adivina la palabra / 猜单词</p>
        </div>
        <QeComponent timeLeft={H} maxTime={maxTime} />
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(255,0,170,.08)",
              border: "1px solid rgba(255,0,170,.15)",
              color: "#ff00aa",
            }}
          >
            <ZapIcon size={12} /> Categoria: {x.category}
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(0,212,255,.08)",
              border: "1px solid rgba(0,212,255,.15)",
              color: "#00d4ff",
            }}
          >
            <LightbulbIcon size={12} /> {A.length} letras / {A.length} 字母
          </div>
        </div>
        <div className="gm-scroll gm-ahorcado grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <VeComponent wrongCount={j} gameStatus={w} />
            <div className="flex items-center gap-1.5">
              {Array.from({
                length,
              }).map((r, m) => (
                <HeartIcon
                  key={m}
                  size={18}
                  fill={m < length - j ? "#ff446d" : "none"}
                  style={{
                    color: m < length - j ? "#ff446d" : "rgba(255,255,255,0.18)",
                    filter: m < length - j ? "drop-shadow(0 0 8px rgba(255,68,109,.7))" : "none",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            {ye && (
              <div
                className="px-5 py-3 rounded-xl text-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,.15), rgba(184,41,221,.1))",
                  border: "1px solid rgba(255,0,170,.3)",
                  animation: "fadeIn 0.5s ease-out",
                }}
              >
                <p
                  className="text-sm font-medium"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Pista / 提示
                </p>
                <p
                  className="text-xl font-black mt-1"
                  style={{
                    color: "#ff00aa",
                    textShadow: "0 0 15px rgba(255,0,170,0.4)",
                  }}
                >
                  {x.hint}
                </p>
              </div>
            )}
            <div
              className="flex gap-2 justify-center flex-wrap"
              style={{
                perspective: "800px",
              }}
            >
              {A.map((ch, m) => (
                <XeComponent key={m} ch={ch} isRevealed={p.has(ch)} gameLost={w === "lost"} index={m} />
              ))}
            </div>
            <div
              className="mobile-letter-keyboard flex flex-col gap-2 items-center"
              style={{
                perspective: "800px",
                touchAction: "manipulation",
              }}
            >
              {Ye.map((r, key) => (
                <div key={key} className="mobile-letter-row flex gap-1.5 justify-center">
                  {r.split("").map((h) => {
                    const isUsed = p.has(h);
                    const isCorrect = x.word.includes(h) && isUsed;
                    const isWrong = isUsed && !x.word.includes(h);
                    return (
                      <EComponent
                        key={h}
                        ch={h}
                        isUsed={isUsed}
                        isCorrect={isCorrect}
                        isWrong={isWrong}
                        onClick={() => Q(h)}
                        disabled={w !== "playing"}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {q && (
          <div
            className="text-center mt-2 text-sm font-bold"
            style={{
              color: "#ff8a2a",
              textShadow: "0 0 15px rgba(255,138,42,0.4)",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            {q}
          </div>
        )}
        {be && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={Se}>
            {w === "won" ? (
              <>
                <div className="text-6xl font-black mb-2" style={Ne}>
                  <TrophyIcon size={48} className="inline mr-3" />
                  ¡Ganaste!
                </div>
                <p
                  className="text-xl font-bold mb-1"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  Palabra: {x.word}
                </p>
                <p
                  className="text-lg mb-6"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {x.hint}
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl font-black mb-2" style={Me}>
                  <XIcon size={48} className="inline mr-3" />
                  ¡Perdiste!
                </div>
                <p
                  className="text-xl font-bold mb-1"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  La palabra era: {x.word}
                </p>
                <p
                  className="text-lg mb-6"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {x.hint}
                </p>
              </>
            )}
            <div
              className="grid grid-cols-3 gap-4 mb-6 max-w-md w-full"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div style={U}>
                <div className="text-xs font-bold text-white/50 mb-1">Score</div>
                <div
                  className="text-2xl font-black"
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 10px rgba(0,212,255,.5)",
                  }}
                >
                  {W}
                </div>
              </div>
              <div style={U}>
                <div className="text-xs font-bold text-white/50 mb-1">Racha</div>
                <div
                  className="text-2xl font-black"
                  style={{
                    color: "#ff00aa",
                    textShadow: "0 0 10px rgba(255,0,170,.5)",
                  }}
                >
                  {b}
                </div>
              </div>
              <div style={U}>
                <div className="text-xs font-bold text-white/50 mb-1">Mejor</div>
                <div
                  className="text-2xl font-black"
                  style={{
                    color: "#ffd700",
                    textShadow: "0 0 10px rgba(255,215,0,.5)",
                  }}
                >
                  {F}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={je}
                className="px-8 py-3 rounded-full text-white font-black text-lg transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#b829dd)",
                  boxShadow: "0 0 40px rgba(0,212,255,0.4), 0 8px 30px rgba(0,0,0,0.4)",
                }}
              >
                <SparklesIcon size={20} className="inline mr-2" /> Siguiente / 下一个
              </button>
              <button
                onClick={ke}
                className="px-6 py-3 rounded-full text-white font-bold text-sm transition-all hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <RotateCcwIcon size={16} className="inline mr-2" /> Reintentar / 重试
              </button>
            </div>
            <P currentGameId="ahorcado" />
          </div>
        )}
      </div>
      <style>{`
        @keyframes letterReveal { 0%{opacity:0; transform:scale(0.5) translateY(-10px) translateZ(0)} 100%{opacity:1; transform:scale(1) translateY(0) translateZ(20px)} }
        @keyframes fadeIn { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:translateY(0)} }
        @keyframes popIn { 0%{opacity:0; transform:scale(0.3)} 100%{opacity:1; transform:scale(1)} }
      `}</style>
    </StarfieldBackground>
  );
}
export { OtComponent as default };
