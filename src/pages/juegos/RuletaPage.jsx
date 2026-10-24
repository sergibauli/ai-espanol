import {
  BrainIcon,
  SparklesIcon,
  BookOpenIcon,
  ZapIcon,
  TrophyIcon,
  ArrowLeftIcon,
  LayersIcon,
  DiamondIcon,
  FlameIcon,
  TargetIcon,
  CrownIcon,
  TimerIcon,
  CoinsIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const Se = ["#ff2a6d", "#ff8c00", "#ffea00", "#00f5ff", "#bc13fe", "#39ff14", "#ff3860", "#00d9ff"];
const _e = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];
function Qe(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function MeComponent({ expression, comboCount }) {
  const r = {
    happy: {
      eyeY: 18,
      eyeShape: "circle",
      mouth: "smile",
      blush: true,
      tear: false,
      accessory: null,
      bounce: 1,
    },
    sad: {
      eyeY: 22,
      eyeShape: "tear",
      mouth: "frown",
      blush: false,
      tear: true,
      accessory: null,
      bounce: 0.8,
    },
    excited: {
      eyeY: 14,
      eyeShape: "star",
      mouth: "open",
      blush: true,
      tear: false,
      accessory: "sparkles",
      bounce: 1.3,
    },
    neutral: {
      eyeY: 18,
      eyeShape: "circle",
      mouth: "neutral",
      blush: false,
      tear: false,
      accessory: null,
      bounce: 1,
    },
    mega: {
      eyeY: 12,
      eyeShape: "mega",
      mouth: "mega",
      blush: true,
      tear: false,
      accessory: "crown",
      bounce: 1.5,
    },
    cool: {
      eyeY: 16,
      eyeShape: "cool",
      mouth: "smile",
      blush: false,
      tear: false,
      accessory: "glasses",
      bounce: 1.1,
    },
  }[expression];
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        width: "140px",
        height: "140px",
      }}
    >
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full"
        style={{
          animation: `mascotFloat2 ${2.5 / r.bounce}s ease-in-out infinite, mascotPulse2 ${1.5 / r.bounce}s ease-in-out infinite`,
          filter: "drop-shadow(0 8px 20px rgba(255,42,109,0.5))",
        }}
      >
        <defs>
          <radialGradient id="mascotBody2" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#ffb6ff" />
            <stop offset="100%" stopColor="#ff2a6d" />
          </radialGradient>
          <radialGradient id="mascotEar2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffb6ff" />
            <stop offset="100%" stopColor="#ff2a6d" />
          </radialGradient>
          <linearGradient id="mascotBlush2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,100,100,0.6)" />
            <stop offset="100%" stopColor="rgba(255,50,50,0.1)" />
          </linearGradient>
          <linearGradient id="megaGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffea00" />
            <stop offset="100%" stopColor="#ff8a00" />
          </linearGradient>
        </defs>
        <ellipse
          cx="70"
          cy="132"
          rx="35"
          ry="6"
          fill="rgba(0,0,0,0.2)"
          style={{
            animation: "mascotShadow2 2.5s ease-in-out infinite",
          }}
        />
        {r.accessory === "crown" && (
          <g
            style={{
              animation: "crownFloat 2s ease-in-out infinite",
            }}
          >
            <path
              d="M45 28 L52 8 L62 22 L70 5 L78 22 L88 8 L95 28 Z"
              fill="url(#megaGlow)"
              stroke="#ffea00"
              strokeWidth="2"
            />
            <circle cx="52" cy="8" r="3" fill="#ffea00" />
            <circle cx="70" cy="5" r="3" fill="#ffea00" />
            <circle cx="88" cy="8" r="3" fill="#ffea00" />
          </g>
        )}
        {r.accessory === "glasses" && (
          <g>
            <circle cx="55" cy={r.eyeY} r="14" fill="none" stroke="#1a1a2e" strokeWidth="3" />
            <circle cx="85" cy={r.eyeY} r="14" fill="none" stroke="#1a1a2e" strokeWidth="3" />
            <line x1="69" y1={r.eyeY} x2="71" y2={r.eyeY} stroke="#1a1a2e" strokeWidth="3" />
            <line x1="41" y1={r.eyeY} x2="30" y2={r.eyeY - 4} stroke="#1a1a2e" strokeWidth="2" />
            <line x1="99" y1={r.eyeY} x2="110" y2={r.eyeY - 4} stroke="#1a1a2e" strokeWidth="2" />
          </g>
        )}
        <ellipse
          cx="40"
          cy="40"
          rx="22"
          ry="26"
          fill="url(#mascotEar2)"
          transform="rotate(-20 40 40)"
          style={{
            filter: "drop-shadow(0 2px 6px rgba(255,42,109,0.4))",
          }}
        />
        <ellipse
          cx="100"
          cy="40"
          rx="22"
          ry="26"
          fill="url(#mascotEar2)"
          transform="rotate(20 100 40)"
          style={{
            filter: "drop-shadow(0 2px 6px rgba(255,42,109,0.4))",
          }}
        />
        <ellipse cx="40" cy="44" rx="10" ry="14" fill="#ffb6ff" transform="rotate(-20 40 44)" opacity="0.6" />
        <ellipse
          cx="100"
          cy="44"
          rx="10"
          ry="14"
          fill="#ffb6ff"
          transform="rotate(20 100 44)"
          opacity="0.6"
        />
        <circle
          cx="70"
          cy="75"
          r="48"
          fill="url(#mascotBody2)"
          style={{
            filter: "drop-shadow(0 6px 16px rgba(255,42,109,0.5))",
          }}
        />
        <ellipse cx="52" cy="52" rx="14" ry="10" fill="rgba(255,255,255,0.4)" transform="rotate(-20 52 52)" />
        <ellipse cx="88" cy="56" rx="7" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(10 88 56)" />
        {r.eyeShape === "circle" && (
          <>
            <circle cx="52" cy={r.eyeY} r="7" fill="#1a1a2e" />
            <circle cx="88" cy={r.eyeY} r="7" fill="#1a1a2e" />
            <circle cx="54" cy={r.eyeY - 2} r="3" fill="white" />
            <circle cx="90" cy={r.eyeY - 2} r="3" fill="white" />
            <circle cx="51" cy={r.eyeY + 1} r="1.2" fill="white" opacity="0.6" />
            <circle cx="87" cy={r.eyeY + 1} r="1.2" fill="white" opacity="0.6" />
          </>
        )}
        {r.eyeShape === "star" && (
          <>
            <path
              d="M52 16l2 5.5h6l-4.8 3.6 2 5.5-4.8-3.6-4.8 3.6 2-5.5-4.8-3.6h6z"
              fill="#1a1a2e"
              transform={`translate(0, ${r.eyeY - 16})`}
            />
            <path
              d="M88 16l2 5.5h6l-4.8 3.6 2 5.5-4.8-3.6-4.8 3.6 2-5.5-4.8-3.6h6z"
              fill="#1a1a2e"
              transform={`translate(0, ${r.eyeY - 16})`}
            />
            <circle cx="54" cy={r.eyeY - 2} r="2" fill="white" />
            <circle cx="90" cy={r.eyeY - 2} r="2" fill="white" />
          </>
        )}
        {r.eyeShape === "mega" && (
          <>
            <ellipse cx="52" cy={r.eyeY} rx="10" ry="12" fill="#1a1a2e" />
            <ellipse cx="88" cy={r.eyeY} rx="10" ry="12" fill="#1a1a2e" />
            <circle cx="55" cy={r.eyeY - 3} r="4" fill="white" />
            <circle cx="91" cy={r.eyeY - 3} r="4" fill="white" />
            <circle cx="52" cy={r.eyeY + 2} r="2" fill="white" opacity="0.6" />
            <circle cx="88" cy={r.eyeY + 2} r="2" fill="white" opacity="0.6" />
          </>
        )}
        {r.eyeShape === "cool" && (
          <>
            <path
              d={`M44 ${r.eyeY} L60 ${r.eyeY - 2}`}
              stroke="#1a1a2e"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d={`M80 ${r.eyeY - 2} L96 ${r.eyeY}`}
              stroke="#1a1a2e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
        {r.eyeShape === "tear" && (
          <>
            <circle cx="52" cy={r.eyeY} r="7" fill="#1a1a2e" />
            <circle cx="88" cy={r.eyeY} r="7" fill="#1a1a2e" />
            <circle cx="54" cy={r.eyeY - 2} r="3" fill="white" />
            <circle cx="90" cy={r.eyeY - 2} r="3" fill="white" />
            <ellipse
              cx="44"
              cy={r.eyeY + 10}
              rx="2.5"
              ry="5"
              fill="rgba(0,200,255,0.9)"
              style={{
                animation: "tearDrop2 1.2s ease-in-out infinite",
              }}
            />
            <ellipse
              cx="82"
              cy={r.eyeY + 14}
              rx="2"
              ry="4"
              fill="rgba(0,200,255,0.7)"
              style={{
                animation: "tearDrop2 1.5s ease-in-out infinite 0.3s",
              }}
            />
          </>
        )}
        {r.blush && (
          <>
            <ellipse cx="42" cy="65" rx="10" ry="5" fill="url(#mascotBlush2)" opacity="0.7" />
            <ellipse cx="98" cy="65" rx="10" ry="5" fill="url(#mascotBlush2)" opacity="0.7" />
          </>
        )}
        {r.mouth === "smile" && (
          <path d="M58 72 Q70 82 82 72" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {r.mouth === "frown" && (
          <path d="M58 78 Q70 68 82 78" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {r.mouth === "open" && (
          <>
            <ellipse cx="70" cy="76" rx="8" ry="10" fill="#1a1a2e" />
            <ellipse cx="70" cy="80" rx="5" ry="5" fill="#ff6b9d" />
          </>
        )}
        {r.mouth === "mega" && (
          <>
            <ellipse cx="70" cy="72" rx="12" ry="14" fill="#1a1a2e" />
            <ellipse cx="70" cy="78" rx="8" ry="8" fill="#ff6b9d" />
          </>
        )}
        {r.mouth === "neutral" && (
          <line x1="62" y1="74" x2="78" y2="74" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
        )}
        <circle
          cx="22"
          cy="35"
          r="3"
          fill="#ffea00"
          style={{
            animation: "sparkle1b 1.5s ease-in-out infinite",
          }}
        />
        <circle
          cx="118"
          cy="28"
          r="2"
          fill="#00f5ff"
          style={{
            animation: "sparkle2b 2s ease-in-out infinite",
          }}
        />
        <circle
          cx="18"
          cy="92"
          r="1.5"
          fill="#ffea00"
          style={{
            animation: "sparkle3b 1.8s ease-in-out infinite",
          }}
        />
        <circle
          cx="122"
          cy="88"
          r="3"
          fill="#ff2a6d"
          style={{
            animation: "sparkle1b 2.2s ease-in-out infinite",
          }}
        />
        <circle
          cx="70"
          cy="8"
          r="2"
          fill="#bc13fe"
          style={{
            animation: "sparkle2b 1.6s ease-in-out infinite",
          }}
        />
        {comboCount >= 3 && (
          <g>
            <path
              d="M30 110 Q35 95 40 110 Q45 100 50 112 L45 125 L35 125 Z"
              fill="#ff8a00"
              style={{
                animation: "flameFlicker 0.6s ease-in-out infinite alternate",
              }}
            />
            <path
              d="M90 110 Q95 95 100 110 Q105 100 110 112 L105 125 L95 125 Z"
              fill="#ff8a00"
              style={{
                animation: "flameFlicker 0.7s ease-in-out infinite alternate 0.2s",
              }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
function KeComponent() {
  const pRef = React.useRef(null);
  React.useEffect(() => {
    const pRef_current = pRef.current;
    if (!pRef_current) {
      return;
    }
    const s = pRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!s) {
      return;
    }
    let r;
    const i = [];
    const f = [
      "rgba(255,42,109,0.08)",
      "rgba(188,19,254,0.06)",
      "rgba(0,245,255,0.05)",
      "rgba(255,140,0,0.07)",
      "rgba(57,255,20,0.04)",
    ];
    const c = () => {
      const a = window.devicePixelRatio || 1;
      pRef_current.width = (window.innerWidth || 1) * a;
      pRef_current.height = (window.innerHeight || 1) * a;
      pRef_current.style.width = `${window.innerWidth}px`;
      pRef_current.style.height = `${window.innerHeight}px`;
      s.setTransform(a, 0, 0, a, 0, 0);
      i.length = 0;
      for (let v = 0; v < 4; v++) {
        i.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: 150 + Math.random() * 300,
          c: f[v % f.length],
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    const m = () => {
      if (document.hidden) {
        r = requestAnimationFrame(m);
        return;
      }
      if (
        !pRef_current ||
        pRef_current.width <= 0 ||
        pRef_current.height <= 0 ||
        !isFinite(pRef_current.width) ||
        !isFinite(pRef_current.height)
      ) {
        r = requestAnimationFrame(m);
        return;
      }
      s.fillStyle = "rgba(3,4,17,0.15)";
      s.fillRect(0, 0, window.innerWidth, window.innerHeight);
      for (const a of i) {
        a.x += a.vx;
        a.y += a.vy;
        a.phase += 0.005;
        if (a.x < -a.r) {
          a.x = window.innerWidth + a.r;
        }
        if (a.x > window.innerWidth + a.r) {
          a.x = -a.r;
        }
        if (a.y < -a.r) {
          a.y = window.innerHeight + a.r;
        }
        if (a.y > window.innerHeight + a.r) {
          a.y = -a.r;
        }
        const v = a.r * (0.8 + 0.2 * Math.sin(a.phase));
        if (![a.x, a.y, 0, a.x, a.y, v].every((b) => typeof b === "number" && isFinite(b))) {
          continue;
        }
        const l = s.createRadialGradient(a.x, a.y, 0, a.x, a.y, v);
        l.addColorStop(0, a.c);
        l.addColorStop(1, "transparent");
        s.beginPath();
        s.fillStyle = l;
        s.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        s.fill();
      }
      r = requestAnimationFrame(m);
    };
    c();
    window.addEventListener("resize", c);
    m();
    return () => {
      cancelAnimationFrame(r);
      window.removeEventListener("resize", c);
    };
  }, []);
  return (
    <canvas
      ref={pRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
function VeComponent() {
  const pRef = React.useRef(null);
  React.useEffect(() => {
    const pRef_current = pRef.current;
    if (!pRef_current) {
      return;
    }
    const s = pRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!s) {
      return;
    }
    let r;
    const i = [];
    const f = [
      "255,42,109",
      "255,140,0",
      "255,234,0",
      "0,245,255",
      "188,19,254",
      "57,255,20",
      "255,56,96",
      "0,217,255",
    ];
    const c = () => {
      const a = window.devicePixelRatio || 1;
      pRef_current.width = (window.innerWidth || 1) * a;
      pRef_current.height = (window.innerHeight || 1) * a;
      pRef_current.style.width = `${window.innerWidth}px`;
      pRef_current.style.height = `${window.innerHeight}px`;
      s.setTransform(a, 0, 0, a, 0, 0);
      i.length = 0;
      const v = Math.min(60, Math.floor(window.innerWidth / 24));
      for (let l = 0; l < v; l++) {
        i.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 4 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          a: Math.random() * 0.8 + 0.2,
          c: f[Math.floor(Math.random() * f.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.04,
          trail: [],
        });
      }
    };
    const m = () => {
      if (document.hidden) {
        r = requestAnimationFrame(m);
        return;
      }
      if (
        !pRef_current ||
        pRef_current.width <= 0 ||
        pRef_current.height <= 0 ||
        !isFinite(pRef_current.width) ||
        !isFinite(pRef_current.height)
      ) {
        r = requestAnimationFrame(m);
        return;
      }
      s.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const a of i) {
        a.x += a.vx;
        a.y += a.vy;
        a.pulse += a.pulseSpeed;
        a.trail.push({
          x: a.x,
          y: a.y,
        });
        if (a.trail.length > 5) {
          a.trail.shift();
        }
        if (a.x < -30) {
          a.x = window.innerWidth + 30;
        }
        if (a.x > window.innerWidth + 30) {
          a.x = -30;
        }
        if (a.y < -30) {
          a.y = window.innerHeight + 30;
        }
        if (a.y > window.innerHeight + 30) {
          a.y = -30;
        }
        const v = a.a * (0.5 + 0.5 * Math.sin(a.pulse));
        const l = a.r * (0.8 + 0.2 * Math.sin(a.pulse));
        for (let b = 0; b < a.trail.length; b++) {
          const w = a.trail[b];
          const d = (b / a.trail.length) * v * 0.3;
          s.beginPath();
          s.fillStyle = `rgba(${a.c},${d})`;
          s.arc(w.x, w.y, l * (b / a.trail.length) * 0.5, 0, Math.PI * 2);
          s.fill();
        }
        s.beginPath();
        s.fillStyle = `rgba(${a.c},${v})`;
        s.shadowBlur = 25;
        s.shadowColor = `rgba(${a.c},.8)`;
        s.arc(a.x, a.y, l, 0, Math.PI * 2);
        s.fill();
      }
      s.shadowBlur = 0;
      r = requestAnimationFrame(m);
    };
    c();
    window.addEventListener("resize", c);
    m();
    return () => {
      cancelAnimationFrame(r);
      window.removeEventListener("resize", c);
    };
  }, []);
  return (
    <canvas
      ref={pRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
function JeComponent() {
  const [p, setP] = React.useState([]);
  React.useEffect(() => {
    const s = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.44;
      setP(
        Array.from({
          length: 60,
        }).map((c, m) => ({
          angle: (m / 60) * Math.PI * 2,
          radius,
          cx,
          cy,
        })),
      );
    };
    s();
    window.addEventListener("resize", s);
    return () => window.removeEventListener("resize", s);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {p.map((s, r) => (
        <div
          key={r}
          className="absolute rounded-full"
          style={{
            width: "8px",
            height: "8px",
            left: `${s.cx + Math.cos(s.angle) * s.radius - 4}px`,
            top: `${s.cy + Math.sin(s.angle) * s.radius - 4}px`,
            background: r % 2 === 0 ? "#ffea00" : "#ff2a6d",
            boxShadow:
              r % 2 === 0
                ? "0 0 12px #ffea00, 0 0 24px #ffea00, 0 0 40px #ffea00"
                : "0 0 12px #ff2a6d, 0 0 24px #ff2a6d, 0 0 40px #ff2a6d",
            animation: `casinoLight2 ${0.6 + Math.random() * 0.4}s ease-in-out infinite ${r * 0.03}s`,
          }}
        />
      ))}
    </div>
  );
}
function UeComponent({ active }) {
  const oRef = React.useRef(null);
  const sRef = React.useRef([]);
  const rRef = React.useRef(false);
  React.useEffect(() => {
    rRef.current = active;
  }, [active]);
  React.useEffect(() => {
    const oRef_current = oRef.current;
    if (!oRef_current) {
      return;
    }
    const f = oRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!f) {
      return;
    }
    let c;
    const m = [
      "#ff2a6d",
      "#ff8a00",
      "#ffea00",
      "#00f5ff",
      "#bc13fe",
      "#39ff14",
      "#ff3860",
      "#00d9ff",
      "#ff6b9d",
      "#7afcff",
    ];
    const a = () => {
      const b = window.devicePixelRatio || 1;
      oRef_current.width = (window.innerWidth || 1) * b;
      oRef_current.height = (window.innerHeight || 1) * b;
      oRef_current.style.width = `${window.innerWidth}px`;
      oRef_current.style.height = `${window.innerHeight}px`;
      f.setTransform(b, 0, 0, b, 0, 0);
    };
    const v = () => {
      for (let b = 0; b < 150; b++) {
        const w = Math.random() * Math.PI * 2;
        const d = 2 + Math.random() * 10;
        sRef.current.push({
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 100,
          vx: Math.cos(w) * d,
          vy: Math.sin(w) * d - 5,
          r: 3 + Math.random() * 8,
          a: 1,
          c: m[Math.floor(Math.random() * m.length)],
          life: 1,
          maxLife: 1,
          decay: 0.003 + Math.random() * 0.005,
          gravity: 0.08 + Math.random() * 0.12,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 20,
          shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
        });
      }
    };
    const l = () => {
      if (document.hidden) {
        c = requestAnimationFrame(l);
        return;
      }
      if (
        !oRef_current ||
        oRef_current.width <= 0 ||
        oRef_current.height <= 0 ||
        !isFinite(oRef_current.width) ||
        !isFinite(oRef_current.height)
      ) {
        c = requestAnimationFrame(l);
        return;
      }
      f.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const sRef_current = sRef.current;
      for (let w = sRef_current.length - 1; w >= 0; w--) {
        const d = sRef_current[w];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += d.gravity;
        d.vx *= 0.99;
        d.rotation += d.rotSpeed;
        d.life -= d.decay;
        if (d.life <= 0 || d.y > window.innerHeight + 50) {
          sRef_current.splice(w, 1);
          continue;
        }
        f.save();
        f.translate(d.x, d.y);
        f.rotate((d.rotation * Math.PI) / 180);
        f.globalAlpha = d.life * d.a;
        f.fillStyle = d.c;
        f.shadowBlur = 15;
        f.shadowColor = d.c;
        if (d.shape === "circle") {
          f.beginPath();
          f.arc(0, 0, d.r, 0, Math.PI * 2);
          f.fill();
        } else if (d.shape === "square") {
          f.fillRect(-d.r / 2, -d.r / 2, d.r, d.r);
        } else {
          f.beginPath();
          f.moveTo(0, -d.r);
          f.lineTo(d.r * 0.866, d.r * 0.5);
          f.lineTo(-d.r * 0.866, d.r * 0.5);
          f.closePath();
          f.fill();
        }
        f.restore();
      }
      if (rRef.current && sRef_current.length < 50 && Math.random() > 0.7) {
        v();
      }
      c = requestAnimationFrame(l);
    };
    a();
    window.addEventListener("resize", a);
    l();
    return () => {
      cancelAnimationFrame(c);
      window.removeEventListener("resize", a);
    };
  }, []);
  React.useEffect(() => {
    if (active) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const sRef_current = sRef.current;
          const c = ["#ff2a6d", "#ff8a00", "#ffea00", "#00f5ff", "#bc13fe", "#39ff14", "#ff3860", "#00d9ff"];
          for (let m = 0; m < 200; m++) {
            const a = Math.random() * Math.PI * 2;
            const v = 3 + Math.random() * 15;
            sRef_current.push({
              x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
              y: window.innerHeight / 2 - 100 + (Math.random() - 0.5) * 50,
              vx: Math.cos(a) * v,
              vy: Math.sin(a) * v - 8,
              r: 4 + Math.random() * 10,
              a: 1,
              c: c[Math.floor(Math.random() * c.length)],
              life: 1,
              maxLife: 1,
              decay: 0.002 + Math.random() * 0.004,
              gravity: 0.06 + Math.random() * 0.1,
              rotation: Math.random() * 360,
              rotSpeed: (Math.random() - 0.5) * 25,
              shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
            });
          }
        }, i * 300);
      }
    }
  }, [active]);
  return (
    <canvas
      ref={oRef}
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
function EtComponent({ active }) {
  if (active) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
        }}
      >
        {Array.from({
          length: 16,
        }).map((o, s) => {
          const r = (s / 16) * 360;
          const i = s * 0.1;
          const f = 4 + Math.random() * 6;
          const c = ["#ff2a6d", "#ffea00", "#00f5ff", "#bc13fe", "#39ff14", "#ff8a00"];
          const m = c[s % c.length];
          return (
            <div
              key={s}
              className="absolute rounded-full"
              style={{
                width: f,
                height: f,
                left: "50%",
                top: "50%",
                marginLeft: -f / 2,
                marginTop: -f / 2,
                background: m,
                boxShadow: `0 0 12px ${m}, 0 0 24px ${m}`,
                animation: `spinOrbit ${1.5 + Math.random() * 0.5}s linear infinite ${i}s`,
                transformOrigin: "0px 0px",
                transform: `rotate(${r}deg) translateX(${220 + Math.random() * 40}px)`,
              }}
            />
          );
        })}
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes spinOrbit {
          0% { transform: rotate(0deg) translateX(240px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(240px) rotate(-360deg); }
        }
      `,
          }}
        />
      </div>
    );
  }
  return null;
}
function TtComponent({ words, onSelect, onSpin }) {
  const rRef = React.useRef(null);
  const [i, setI] = React.useState(0);
  const [c, setC] = React.useState(false);
  const aRef = React.useRef(0);
  const vRef = React.useRef(0);
  const lRef = React.useRef(0);
  const bRef = React.useRef(0);
  const wRef = React.useRef(0);
  const d = words.length > 0 ? (Math.PI * 2) / words.length : 0;
  const O = React.useCallback(
    (M, T = 0, P = 0, y = 0) => {
      const rRef_current = rRef.current;
      if (
        !rRef_current ||
        rRef_current.width <= 0 ||
        rRef_current.height <= 0 ||
        !isFinite(rRef_current.width) ||
        !isFinite(rRef_current.height)
      ) {
        return;
      }
      const t = rRef_current.getContext("2d", {
        willReadFrequently: false,
      });
      if (!t) {
        return;
      }
      const B = window.devicePixelRatio || 1;
      const z = 520;
      rRef_current.width = z * B;
      rRef_current.height = z * B;
      t.setTransform(B, 0, 0, B, 0, 0);
      const h = z / 2;
      const u = z / 2;
      const g = h - 30;
      const L = M + P;
      t.clearRect(0, 0, z, z);
      t.save();
      t.translate(h, u + 30);
      t.scale(1, 0.25);
      t.beginPath();
      t.arc(0, 0, g + 10, 0, Math.PI * 2);
      t.fillStyle = "rgba(0,0,0,0.5)";
      t.fill();
      t.restore();
      const E = g + 80 + y * 60;
      if (![h, u, g - 20, h, u, E].every((j) => typeof j === "number" && isFinite(j))) {
        return;
      }
      const Y = t.createRadialGradient(h, u, g - 20, h, u, E);
      Y.addColorStop(0, `rgba(255,234,0,${0.25 + y * 0.25})`);
      Y.addColorStop(0.3, `rgba(255,42,109,${0.2 + y * 0.2})`);
      Y.addColorStop(0.6, `rgba(188,19,254,${0.15 + y * 0.15})`);
      Y.addColorStop(1, "transparent");
      t.beginPath();
      t.arc(h, u, E, 0, Math.PI * 2);
      t.fillStyle = Y;
      t.fill();
      if (y > 0.3) {
        const j = ["#ff2a6d", "#ffea00", "#00f5ff", "#bc13fe"];
        for (let C = 0; C < 4; C++) {
          const A = L + (C / 4) * Math.PI * 2;
          const N = h + Math.cos(A) * (g + 30);
          const R = u + Math.sin(A) * (g + 30);
          if (![N, R, 0, N, R, 40 + y * 30].every((D) => typeof D === "number" && isFinite(D))) {
            continue;
          }
          const I = t.createRadialGradient(N, R, 0, N, R, 40 + y * 30);
          I.addColorStop(0, `${j[C]}88`);
          I.addColorStop(1, "transparent");
          t.beginPath();
          t.arc(N, R, 40 + y * 30, 0, Math.PI * 2);
          t.fillStyle = I;
          t.fill();
        }
      }
      if (![h, u, g - 5, h, u, g + 20].every((j) => typeof j === "number" && isFinite(j))) {
        return;
      }
      const $ = t.createRadialGradient(h, u, g - 5, h, u, g + 20);
      $.addColorStop(0, "#ffd700");
      $.addColorStop(0.5, "#ff8a00");
      $.addColorStop(1, "rgba(255,140,0,0.5)");
      t.beginPath();
      t.arc(h, u, g + 20, 0, Math.PI * 2);
      t.fillStyle = $;
      t.fill();
      t.beginPath();
      t.arc(h, u, g + 10, 0, Math.PI * 2);
      t.strokeStyle = "#ffd700";
      t.lineWidth = 5 + y * 2;
      t.shadowBlur = 40 + y * 60;
      t.shadowColor = `rgba(255,234,0,${0.9 + y * 0.1})`;
      t.stroke();
      t.shadowBlur = 0;
      t.beginPath();
      t.arc(h, u, g + 18, 0, Math.PI * 2);
      t.strokeStyle = `rgba(255,42,109,${0.6 + y * 0.3})`;
      t.lineWidth = 2;
      t.shadowBlur = 20 + y * 40;
      t.shadowColor = `rgba(255,42,109,${0.8 + y * 0.2})`;
      t.stroke();
      t.shadowBlur = 0;
      for (let j = 0; j < words.length * 3; j++) {
        const C = (j / (words.length * 3)) * Math.PI * 2 + L * 0.5;
        const A = Math.sin(T + j * 0.7) > 0;
        const N = g + 18;
        const R = h + Math.cos(C) * N;
        const I = u + Math.sin(C) * N;
        t.beginPath();
        t.arc(R, I, 5, 0, Math.PI * 2);
        t.fillStyle = A ? "#ffea00" : "#333";
        t.shadowBlur = A ? 20 + y * 30 : 0;
        t.shadowColor = "#ffea00";
        t.fill();
      }
      t.shadowBlur = 0;
      for (let j = 0; j < words.length; j++) {
        const C = L + j * d;
        t.beginPath();
        t.moveTo(h, u);
        t.arc(h, u, g, C, C + d);
        t.closePath();
        if (![h, u, 0, h, u, g].every((K) => typeof K === "number" && isFinite(K))) {
          continue;
        }
        const A = t.createRadialGradient(h, u, 0, h, u, g);
        const N = Se[j % Se.length];
        A.addColorStop(0, `${N}55`);
        A.addColorStop(0.7, N);
        A.addColorStop(1, `${N}cc`);
        t.fillStyle = A;
        t.fill();
        t.beginPath();
        t.moveTo(h, u);
        t.arc(h, u, g, C + 0.01, C + d - 0.01);
        t.closePath();
        t.fillStyle = "rgba(0,0,0,0.12)";
        t.fill();
        t.beginPath();
        t.arc(h, u, g, C, C + d);
        t.strokeStyle = "rgba(255,255,255,0.4)";
        t.lineWidth = 3;
        t.stroke();
        t.save();
        t.translate(h, u);
        t.rotate(C + d / 2);
        t.textAlign = "right";
        const R = words[j].hintCn;
        const I = g - 60;
        let D = 20;
        for (
          t.font = `bold ${D}px Inter, "Microsoft YaHei", "PingFang SC", sans-serif`;
          t.measureText(R).width > I && D > 9;
        ) {
          D -= 1;
          t.font = `bold ${D}px Inter, "Microsoft YaHei", "PingFang SC", sans-serif`;
        }
        t.fillStyle = "rgba(0,0,0,0.6)";
        t.fillText(R, g - 28, 8);
        t.fillStyle = "#fff";
        t.shadowBlur = 12;
        t.shadowColor = "rgba(0,0,0,0.8)";
        t.fillText(R, g - 30, 6);
        t.shadowBlur = 0;
        t.restore();
      }
      t.beginPath();
      t.arc(h, u, 44, 0, Math.PI * 2);
      t.fillStyle = "#0a0a1a";
      t.fill();
      t.strokeStyle = "#ffd700";
      t.lineWidth = 4;
      t.shadowBlur = 20 + y * 40;
      t.shadowColor = `rgba(255,234,0,${0.6 + y * 0.4})`;
      t.stroke();
      t.shadowBlur = 0;
      if (![h - 6, u - 6, 0, h, u, 34].every((j) => typeof j === "number" && isFinite(j))) {
        return;
      }
      const H = t.createRadialGradient(h - 6, u - 6, 0, h, u, 34);
      H.addColorStop(0, "#ffea00");
      H.addColorStop(0.5, "#ff8a2a");
      H.addColorStop(1, "#ff2a6d");
      t.beginPath();
      t.arc(h, u, 34, 0, Math.PI * 2);
      t.fillStyle = H;
      t.fill();
      t.beginPath();
      t.arc(h - 8, u - 8, 12, 0, Math.PI * 2);
      t.fillStyle = "rgba(255,255,255,0.3)";
      t.fill();
    },
    [words, d],
  );
  React.useEffect(() => {
    let M;
    const T = (P) => {
      const rRef_current = rRef.current;
      if (
        !rRef_current ||
        rRef_current.width <= 0 ||
        rRef_current.height <= 0 ||
        !isFinite(rRef_current.width) ||
        !isFinite(rRef_current.height)
      ) {
        M = requestAnimationFrame(T);
        return;
      }
      vRef.current = P * 0.008;
      if (!c) {
        O(i, vRef.current, bRef.current, wRef.current);
      }
      M = requestAnimationFrame(T);
    };
    M = requestAnimationFrame(T);
    return () => cancelAnimationFrame(M);
  }, [i, c, O]);
  const _ = () => {
    if (c || words.length === 0) {
      return;
    }
    onSpin();
    setC(true);
    lRef.current = performance.now();
    const M = 8 + Math.random() * 6;
    const T = Math.floor(Math.random() * words.length);
    const P = Math.PI * 2 - T * d - d / 2;
    const aRef_current = aRef.current;
    const F = M * Math.PI * 2 + ((P - aRef_current) % (Math.PI * 2));
    const t = 6000;
    const B = performance.now();
    const z = (h) => {
      const u = h - B;
      const g = Math.min(u / t, 1);
      const L = 1 - (1 - g) ** 3.5;
      wRef.current = g < 0.8 ? Math.sin(g * Math.PI) * 1.5 : Math.sin(g * Math.PI) * 0.5;
      let E = 0;
      if (g > 0.92) {
        const $ = (g - 0.92) / 0.08;
        E = Math.sin($ * Math.PI * 4) * 0.15 * (1 - $) * d;
      }
      bRef.current = E;
      const Y = aRef_current + F * L + E;
      aRef.current = Y;
      setI(Y);
      O(Y, vRef.current, E, wRef.current);
      if (g < 1) {
        requestAnimationFrame(z);
      } else {
        setC(false);
        bRef.current = 0;
        wRef.current = 0;
        onSelect(words[T]);
      }
    };
    requestAnimationFrame(z);
  };
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{
          width: "min(440px, 88vw)",
          height: "min(440px, 88vw)",
        }}
      >
        <canvas
          ref={rRef}
          className="w-full h-full rounded-full"
          style={{
            boxShadow:
              "0 0 120px rgba(255,42,109,.4), 0 0 240px rgba(255,140,0,.15), 0 25px 80px rgba(0,0,0,.6), 0 0 60px rgba(0,245,255,.2), 0 0 30px rgba(255,234,0,.3)",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
          }}
        />
        <EtComponent active={c} />
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: "-22px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "44px",
            height: "56px",
            zIndex: 15,
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,.7)) drop-shadow(0 0 20px rgba(255,234,0,0.8))",
          }}
        >
          <svg viewBox="0 0 44 56" width="44" height="56">
            <defs>
              <linearGradient id="pointerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffea00" />
                <stop offset="100%" stopColor="#ff8a00" />
              </linearGradient>
            </defs>
            <path d="M22 56L0 0h44z" fill="url(#pointerGrad)" stroke="#ffd700" strokeWidth="2" />
            <path d="M22 48L6 4h32z" fill="#ff8a00" opacity="0.5" />
            <circle
              cx="22"
              cy="10"
              r="4"
              fill="#ffea00"
              style={{
                filter: "drop-shadow(0 0 8px #ffea00)",
              }}
            />
          </svg>
        </div>
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#ffea00,#ff8a2a,#ff2a6d)",
            boxShadow:
              "0 0 60px rgba(255,234,0,.8), 0 0 120px rgba(255,42,109,.4), 0 0 180px rgba(255,140,0,.2), inset 0 3px 10px rgba(255,255,255,.4)",
            zIndex: 10,
            border: "5px solid rgba(255,255,255,.4)",
            animation: c
              ? "centerPulseFast 0.5s ease-in-out infinite"
              : "centerPulse2 2s ease-in-out infinite",
          }}
        >
          <DiamondIcon
            size={36}
            className="text-white"
            style={{
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.9))",
            }}
          />
        </div>
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: "3px dashed rgba(255,234,0,0.4)",
            animation: c ? "wheelRingSpin2 0.8s linear infinite" : "wheelRingSpin2 15s linear infinite",
          }}
        />
        <div
          className="absolute -inset-3 rounded-full pointer-events-none"
          style={{
            border: "2px dotted rgba(255,42,109,0.3)",
            animation: c
              ? "wheelRingSpin2 1.2s linear infinite reverse"
              : "wheelRingSpin2 25s linear infinite reverse",
          }}
        />
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            border: "4px double rgba(0,245,255,0.2)",
            animation: c ? "wheelRingSpin2 1s linear infinite" : "wheelRingSpin2 20s linear infinite",
          }}
        />
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: "inset 0 0 60px rgba(255,42,109,0.2), inset 0 0 120px rgba(188,19,254,0.1)",
            animation: "neonPulse2 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(255,234,0,0.15)",
            boxShadow: c
              ? "0 0 60px rgba(255,234,0,0.4), 0 0 120px rgba(255,42,109,0.3)"
              : "0 0 40px rgba(255,234,0,0.1), 0 0 80px rgba(255,42,109,0.1)",
            animation: c
              ? "wheelRingSpin2 1.5s linear infinite reverse"
              : "wheelRingSpin2 35s linear infinite reverse",
          }}
        />
        {c && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,234,0,0.08) 0%, transparent 70%)",
              animation: "spinBurst 0.3s ease-in-out infinite alternate",
              zIndex: 3,
            }}
          />
        )}
      </div>
      <button
        onClick={_}
        disabled={c || words.length === 0}
        className="mt-10 px-16 py-5 rounded-full text-white font-black text-xl transition-all disabled:opacity-50 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#ff2a6d,#ff8a00,#ffea00)",
          boxShadow: c
            ? "0 0 80px rgba(255,42,109,.9), 0 12px 50px rgba(0,0,0,.5), 0 0 40px rgba(255,234,0,.6), inset 0 2px 0 rgba(255,255,255,.3)"
            : "0 0 60px rgba(255,42,109,.6), 0 12px 50px rgba(0,0,0,.5), 0 0 30px rgba(255,234,0,.4), inset 0 2px 0 rgba(255,255,255,.3)",
          animation: c
            ? "rlBtnPulseFast 0.4s ease-in-out infinite"
            : "rlBtnFloat2 3s ease-in-out infinite, neonPulse2 1.5s ease-in-out infinite",
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          transform: "perspective(500px) rotateX(5deg)",
        }}
      >
        <span className="relative z-10 flex items-center gap-3">
          <SparklesIcon
            size={22}
            style={{
              animation: c ? "sparkleSpin2 0.3s linear infinite" : "sparkleSpin2 2s linear infinite",
            }}
          />
          {c ? "GIRANDO..." : "▶ GIRAR"}
          <SparklesIcon
            size={22}
            style={{
              animation: c
                ? "sparkleSpin2 0.3s linear infinite reverse"
                : "sparkleSpin2 2s linear infinite reverse",
            }}
          />
        </span>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            animation: c ? "shineSweep2 0.5s ease-in-out infinite" : "shineSweep2 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(255,255,255,0.3)",
            boxShadow: "inset 0 3px 8px rgba(255,255,255,0.3), inset 0 -3px 8px rgba(0,0,0,0.3)",
          }}
        />
      </button>
    </div>
  );
}
function AtComponent({ letter, isRevealed, index, totalLetters, wordKey }) {
  const [f, setF] = React.useState(false);
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    if (isRevealed) {
      if (isRevealed && !f) {
        setTimeout(() => {
          setF(true);
          setTimeout(() => setM(true), 20);
        }, index * 80);
      }
    } else {
      setF(false);
      setM(false);
    }
  }, [isRevealed, index, f, wordKey]);
  return (
    <div
      className="flex items-center justify-center text-2xl font-black relative overflow-hidden"
      style={{
        width: "clamp(40px, 8vw, 56px)",
        height: "clamp(48px, 10vw, 64px)",
        borderRadius: "16px",
        background: m
          ? "linear-gradient(135deg, rgba(57,255,20,.25), rgba(57,255,20,.08))"
          : "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))",
        border: m ? "2px solid rgba(57,255,20,.8)" : "2px solid rgba(255,255,255,.3)",
        color: m ? "#39ff14" : "transparent",
        boxShadow: m
          ? "0 0 30px rgba(57,255,20,.5), 0 0 60px rgba(57,255,20,.3), 0 0 90px rgba(57,255,20,.15), inset 0 1px 0 rgba(255,255,255,.2)"
          : "0 0 20px rgba(255,255,255,.1), 0 4px 20px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.1), 0 0 15px rgba(0,245,255,.15)",
        transition: "all 0.5s cubic-bezier(.2,.9,.2,1)",
        animation: m ? "letterPop2 0.7s cubic-bezier(.2,.9,.2,1)" : "slotPulse 2s ease-in-out infinite",
        transform: "rotateY(0deg) scale(1) translateZ(0)",
        perspective: "300px",
        textShadow: m ? "0 0 25px rgba(57,255,20,.9), 0 0 40px rgba(57,255,20,.5)" : "none",
      }}
    >
      {m ? (
        <span
          style={{
            animation: "letterGlow 2s ease-in-out infinite",
          }}
        >
          {letter}
        </span>
      ) : (
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: "rgba(0,245,255,0.4)",
            boxShadow: "0 0 8px rgba(0,245,255,0.6), 0 0 16px rgba(0,245,255,0.3)",
            animation: "slotDotPulse 1.5s ease-in-out infinite",
          }}
        />
      )}
      {m && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            animation: "shineSweep2 1.5s ease-in-out 0.3s",
          }}
        />
      )}
      {!m && (
        <div
          className="absolute inset-0 rounded-[16px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,42,109,0.3), rgba(0,245,255,0.3), rgba(188,19,254,0.3), rgba(255,42,109,0.3))",
            backgroundSize: "200% 100%",
            animation: "slotBorderRotate 3s linear infinite",
            opacity: 0.3,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "2px",
          }}
        />
      )}
    </div>
  );
}
function RtComponent({ revealed, currentWord }) {
  const s = Array.from(revealed).filter((r) => !currentWord.word.includes(r));
  if (s.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {s.map((r, i) => (
        <span
          key={r}
          className="text-xl font-black px-3 py-1.5 rounded-lg uppercase"
          style={{
            color: "#ff2a6d",
            textShadow: "0 0 15px rgba(255,42,109,0.9), 0 0 30px rgba(255,42,109,0.5)",
            border: "2px solid rgba(255,42,109,0.6)",
            background: "linear-gradient(135deg, rgba(255,42,109,0.15), rgba(255,42,109,0.05))",
            boxShadow: "0 0 20px rgba(255,42,109,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            animation: `fadeIn 0.3s ease-out ${i * 0.05}s both`,
          }}
        >
          {r}
        </span>
      ))}
    </div>
  );
}
function StComponent({ ch, isUsed, isCorrect, onClick, disabled }) {
  const [f, setF] = React.useState(false);
  const m = () => {
    if (!(disabled || isUsed)) {
      setF(true);
      setTimeout(() => setF(false), 150);
      onClick();
    }
  };
  const a = isCorrect ? "rgba(57,255,20,.3)" : isUsed ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.1)";
  const v = isCorrect ? "rgba(57,255,20,.8)" : isUsed ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.25)";
  const color = isCorrect ? "#39ff14" : isUsed ? "rgba(255,255,255,.15)" : "#fff";
  const b = isCorrect
    ? "0 0 20px rgba(57,255,20,.5), 0 0 40px rgba(57,255,20,.2)"
    : f
      ? "0 0 30px rgba(0,245,255,.6)"
      : "0 2px 10px rgba(0,0,0,.3)";
  const textShadow = isCorrect ? "0 0 15px rgba(57,255,20,.7)" : f ? "0 0 15px rgba(0,245,255,.8)" : "none";
  return (
    <button
      onClick={m}
      disabled={disabled || isUsed}
      className="mobile-letter-key min-w-[clamp(28px,7vw,40px)] px-1 py-2 rounded-lg text-sm font-bold transition-all disabled:pointer-events-none relative overflow-hidden"
      style={{
        background: a,
        border: `2px solid ${v}`,
        color,
        boxShadow: `${b}, inset 0 2px 0 rgba(255,255,255,.15), inset 0 -2px 0 rgba(0,0,0,.2)`,
        transform: f ? "scale(0.88) translateY(2px)" : "scale(1)",
        transition: "all 0.15s cubic-bezier(.2,.9,.2,1)",
        textShadow,
        height: "clamp(40px, 9vw, 50px)",
        fontSize: "clamp(12px, 3.5vw, 16px)",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      {ch}
      <div
        className="absolute inset-x-0 top-0 h-[1px]"
        style={{
          background: "rgba(255,255,255,0.2)",
        }}
      />
      {f && (
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)",
            animation: "keyRipple 0.3s ease-out",
          }}
        />
      )}
    </button>
  );
}
function NtComponent({ seconds, maxSeconds, label }) {
  const r = Math.max(0, (seconds / maxSeconds) * 100);
  const i = r > 60 ? "#39ff14" : r > 30 ? "#ffea00" : "#ff2a6d";
  return (
    <div className="flex items-center gap-2 w-full max-w-xs mx-auto">
      <TimerIcon
        size={16}
        className="flex-shrink-0"
        style={{
          color: i,
        }}
      />
      <div
        className="flex-1 h-3 rounded-full overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear relative"
          style={{
            width: `${r}%`,
            background: `linear-gradient(90deg, ${i}, ${i}88)`,
            boxShadow: `0 0 15px ${i}, 0 0 30px ${i}55`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shineSweep2 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
      <span
        className="text-xs font-bold flex-shrink-0"
        style={{
          color: i,
          textShadow: `0 0 10px ${i}`,
        }}
      >
        {label}
      </span>
    </div>
  );
}
function ItComponent({ level }) {
  const o = ["Novato", "Aprendiz", "Experto", "Maestro", "Leyenda"];
  const s = ["#39ff14", "#00f5ff", "#ffea00", "#ff8a00", "#ff2a6d"];
  const r = o[Math.min(level, o.length - 1)];
  const i = s[Math.min(level, s.length - 1)];
  return (
    <div
      className="px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5"
      style={{
        background: `${i}18`,
        border: `1px solid ${i}55`,
        color: i,
        boxShadow: `0 0 15px ${i}30, inset 0 1px 0 rgba(255,255,255,.1)`,
        animation: "neonPulse2 2s ease-in-out infinite",
      }}
    >
      <CrownIcon
        size={14}
        style={{
          filter: `drop-shadow(0 0 4px ${i})`,
        }}
      />
      Nivel {level}: {r}
    </div>
  );
}
function YtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick, playSlice } = useSound();
  const [c, setC] = React.useState("select");
  const [a, setA] = React.useState([]);
  const [l, setL] = React.useState(null);
  const [w, setW] = React.useState(new Set());
  const [O, setO] = React.useState(0);
  const [M, setM] = React.useState(new Set());
  const [P, setP] = React.useState(false);
  const [F, setF] = React.useState("");
  const [B, setB] = React.useState(false);
  const [h, setH] = React.useState(0);
  const [g, setG] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [$, set$] = React.useState(0);
  const [j, setJ] = React.useState(60);
  const [A, setA_1] = React.useState(false);
  const [R, setR] = React.useState("");
  const [D, setD] = React.useState(0);
  const [oe, setOe] = React.useState(0);
  const [Ne, setNe] = React.useState(0);
  const [Ce, setCe] = React.useState(false);
  const [de, setDe] = React.useState(false);
  const [fe, setFe] = React.useState(1);
  const [ze, setZe] = React.useState(false);
  const [ot, setOt] = React.useState(0);
  const [pe, setPe] = React.useState("");
  const words = React.useMemo(() => a.filter((x) => !M.has(x.word)), [a, M]);
  React.useEffect(() => {
    if (c === "playing" && words.length === 0 && a.length > 0 && !P) {
      setP(true);
      playWin();
    }
  }, [c, words, a, P, playWin]);
  const reRef = React.useRef(null);
  const Fe = g_1();
  const [me, setMe] = React.useState("");
  const expression = React.useMemo(() => {
    if (P || (B && h >= 6)) {
      return "mega";
    }
    if (B) {
      return "excited";
    }
    if (g >= 4) {
      return "cool";
    }
    if (g >= 2) {
      return "happy";
    }
    if (g === 0 && w.size > 0 && l && !l.word.split("").every((x) => w.has(x))) {
      return "sad";
    }
    return "neutral";
  }, [P, B, g, w, l, h]);
  React.useEffect(() => {
    if (c === "playing" && l && !M.has(l.word) && !P) {
      reRef.current = setInterval(() => {
        set$((x) => {
          if (x <= 1) {
            if (l && !M.has(l.word)) {
              const k = l.word.split("").filter((S) => !w.has(S));
              if (k.length > 0) {
                const S = k[Math.floor(Math.random() * k.length)];
                setW((G) => new Set(G).add(S));
                setG(0);
                playWrong();
                setF("¡Tiempo agotado! Letra revelada...");
                setTimeout(() => setF(""), 2000);
              }
            }
            return j;
          }
          return x - 1;
        });
      }, 1000);
      return () => {
        if (reRef.current) {
          clearInterval(reRef.current);
        }
      };
    }
  }, [c, l, M, P, j, w, playWrong]);
  const ue = React.useCallback(
    (x) => {
      playClick();
      let k = x ? a_1(x) : a_1();
      if (k.length === 0) {
        setMe(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const S = k
        .filter((W) => W.espanol && W.chino)
        .map((W) => ({
          word: Qe(W.espanol),
          hintCn: W.chino,
        }))
        .filter((W) => W.word.length >= 3 && W.word.length <= 10);
      const G = new Set();
      const X = [];
      for (const W of S) {
        if (!G.has(W.word)) {
          G.add(W.word);
          X.push(W);
        }
      }
      const Q = X.slice(0, 24);
      setA(Q);
      setM(new Set());
      setO(0);
      setW(new Set());
      setL(null);
      setP(false);
      setF("");
      setH(0);
      setG(0);
      setB(false);
      setLevel(1);
      setOe(0);
      setNe(Q.length);
      set$(0);
      setFe(1);
      setOt(0);
      setC("playing");
    },
    [playClick],
  );
  const onSelect = (x) => {
    playSlice();
    if (M.has(x.word)) {
      setF("¡Ya completada! / 已完成！");
      setTimeout(() => setF(""), 1500);
      return;
    }
    setL(null);
    setW(new Set());
    setDe(true);
    setTimeout(() => {
      setL(x);
      setD(Date.now());
      set$(60);
      setJ(60);
      setDe(false);
    }, 400);
    setF(`¡Palabra seleccionada! / 已选择单词: ${x.hintCn}`);
    setTimeout(() => setF(""), 3000);
  };
  const ne = (x) => {
    if (!l || M.has(l.word)) {
      return;
    }
    const k = new Set(w).add(x);
    setW(k);
    if (l.word.includes(x)) {
      playCorrect();
      const S = g + 1;
      setG(S);
      const G = (Date.now() - D) / 1000;
      let X = 0;
      if (G < 15) {
        X = 30;
      } else if (G < 30) {
        X = 15;
      }
      const Q = 1 + Math.min(Math.floor(S / 3), 3);
      setFe(Q);
      if (Q > 1) {
        setZe(true);
        setTimeout(() => setZe(false), 1500);
      }
      const Le = (10 + Math.min(S, 6) * 3 + X) * Q;
      setO((Z) => Z + Le);
      if (S >= 3) {
        setH(S);
        setB(true);
        setTimeout(() => setB(false), 1500);
      }
      setR("rgba(57,255,20,0.35)");
      setA_1(true);
      setTimeout(() => setA_1(false), 400);
      if (!l.word.split("").every((Z) => k.has(Z))) {
        setTimeout(() => {
          setR("rgba(57,255,20,0.15)");
          setA_1(true);
          setTimeout(() => setA_1(false), 200);
        }, 100);
      }
      if (l.word.split("").every((Z) => k.has(Z))) {
        playWin();
        setM((q) => new Set(q).add(l.word));
        setPe("¡Muy bien!");
        setTimeout(() => setPe(""), 2000);
        const Z = 50 + Math.floor(($ / j) * 50);
        setO((q) => q + Z);
        setG(0);
        setOe((q) => q + 1);
        if ((oe + 1) % 3 === 0) {
          setLevel((q) => Math.min(q + 1, 5));
          setJ((q) => Math.max(q - 8, 30));
        }
        setR("rgba(255,234,0,0.2)");
        setA_1(true);
        setTimeout(() => setA_1(false), 500);
        if (M.size + 1 >= a.length) {
          setP(true);
          playWin();
        }
      }
    } else {
      playWrong();
      setG(0);
      setFe(1);
      setCe(true);
      setR("rgba(255,42,109,0.45)");
      setA_1(true);
      setTimeout(() => {
        setCe(false);
        setA_1(false);
      }, 600);
    }
  };
  const We = () => {
    playClick();
    setL(null);
    setW(new Set());
    setO(0);
    setM(new Set());
    setP(false);
    setH(0);
    setG(0);
    setB(false);
    setLevel(1);
    setOe(0);
    set$(0);
    setFe(1);
    setOt(0);
  };
  const onSpin = () => {
    playSlice();
    setOt((x) => x + 1);
  };
  React.useEffect(() => {
    const x = (k) => {
      if (c !== "playing" || !l || P || M.has(l.word)) {
        return;
      }
      const S = k.key.toUpperCase();
      if (/^[A-ZÑ]$/.test(S) && !w.has(S)) {
        ne(S);
      }
    };
    window.addEventListener("keydown", x);
    return () => window.removeEventListener("keydown", x);
  }, [c, l, w, P, ne, M]);
  if (c === "select") {
    return (
      <StarfieldBackground>
        <SoundToggles />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#00f5ff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-28 h-28 rounded-2xl mb-4 relative"
              style={{
                background: "linear-gradient(135deg, #ff2a6d, #ff8a00, #ffea00)",
                boxShadow:
                  "0 0 80px rgba(255,42,109,.6), 0 0 160px rgba(255,140,0,.3), 0 20px 50px rgba(0,0,0,.5), inset 0 3px 10px rgba(255,255,255,.2)",
                animation: "iconFloat2 3s ease-in-out infinite",
                transform: "perspective(500px) rotateX(10deg)",
              }}
            >
              <BrainIcon
                size={52}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,0.6))",
                }}
              />
              <div
                className="absolute -top-2 -right-2"
                style={{
                  animation: "sparkle1b 1.5s ease-in-out infinite",
                }}
              >
                <SparklesIcon size={24} className="text-[#ffea00]" />
              </div>
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3"
              style={{
                textShadow: "0 0 50px rgba(255,42,109,0.5), 0 0 100px rgba(255,140,0,0.3)",
                background: "linear-gradient(135deg, #ff8a2a, #ff2a6d, #ffea00, #00f5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,42,109,0.3))",
              }}
            >
              Ruleta de Palabras
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {me && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,56,96,.15)",
                  border: "1px solid rgba(255,56,96,.4)",
                  color: "#ff3860",
                  boxShadow: "0 0 30px rgba(255,56,96,.3)",
                }}
              >
                {me}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setMe("");
                ue(null);
              }}
              className="group rounded-xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "rgba(14,22,64,.7)",
                border: "1px solid rgba(255,42,109,.4)",
                transformStyle: "preserve-3d",
                boxShadow: "0 0 40px rgba(255,42,109,.15)",
              }}
              onMouseEnter={(x) => {
                x.currentTarget.style.transform = "rotateY(5deg) rotateX(5deg) scale(1.03)";
                x.currentTarget.style.boxShadow = "0 0 60px rgba(255,42,109,.4), 0 20px 50px rgba(0,0,0,.4)";
              }}
              onMouseLeave={(x) => {
                x.currentTarget.style.transform = "";
                x.currentTarget.style.boxShadow = "0 0 40px rgba(255,42,109,.15)";
              }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, rgba(255,42,109,0.15), rgba(255,140,0,0.1))",
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff2a6d, #bc13fe)",
                  boxShadow: "0 0 40px rgba(255,42,109,.5)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
                <CoinsIcon
                  size={14}
                  className="absolute -top-1 -right-1 text-[#ffea00]"
                  style={{
                    filter: "drop-shadow(0 0 6px #ffea00)",
                  }}
                />
              </div>
              <h3 className="text-white font-black text-base mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,42,109,.8)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
            </button>
            {Fe.map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  setMe("");
                  ue(x.id);
                }}
                className="group rounded-xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
                style={{
                  background: "rgba(14,22,64,.7)",
                  border: `1px solid ${x.color}60`,
                  transformStyle: "preserve-3d",
                  boxShadow: `0 0 40px ${x.color}15`,
                }}
                onMouseEnter={(k) => {
                  k.currentTarget.style.transform = "rotateY(5deg) rotateX(5deg) scale(1.03)";
                  k.currentTarget.style.boxShadow = `0 0 60px ${x.color}40, 0 20px 50px rgba(0,0,0,.4)`;
                }}
                onMouseLeave={(k) => {
                  k.currentTarget.style.transform = "";
                  k.currentTarget.style.boxShadow = `0 0 40px ${x.color}15`;
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${x.color}15, ${x.color}05)`,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
                  style={{
                    background: `linear-gradient(135deg, ${x.color}, ${x.color}88)`,
                    boxShadow: `0 0 40px ${x.color}50`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1">{x.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${x.color}cc`,
                  }}
                >
                  {x.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{x.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
        </div>
        <MeComponent expression="neutral" comboCount={0} />
      </StarfieldBackground>
    );
  }
  return (
    <div
      className="gm-ruleta-root min-h-screen relative overflow-hidden"
      style={{
        background: "#030411",
        color: "#fff",
        animation: Ce ? "screenShake 0.5s cubic-bezier(.36,.07,.19,.97) both" : "none",
      }}
    >
      <SoundToggles />
      <MeComponent expression={expression} comboCount={h} />
      {pe && (
        <div
          className="fixed bottom-36 right-4 z-50 pointer-events-none"
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            className="px-4 py-2 rounded-2xl text-sm font-black"
            style={{
              background: "linear-gradient(135deg, rgba(57,255,20,.9), rgba(0,245,255,.9))",
              color: "#0a0a1a",
              boxShadow: "0 0 30px rgba(57,255,20,.6), 0 0 60px rgba(0,245,255,.4)",
              textShadow: "none",
            }}
          >
            {pe}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              right: "24px",
              width: "12px",
              height: "12px",
              background: "rgba(57,255,20,.9)",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      )}
      <UeComponent active={P} />
      {A && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: R,
            animation: "flashFade 0.5s ease-out forwards",
          }}
        />
      )}
      <KeComponent />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05)1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom,transparent 0%,#000 25%,#000 80%,transparent 100%)",
          animation: "rlGridDrift2 12s linear infinite",
        }}
      />
      <VeComponent />
      <JeComponent />
      <div
        className="fixed rounded-full pointer-events-none z-[1]"
        style={{
          width: "400px",
          height: "400px",
          left: "-150px",
          top: "8%",
          background: "radial-gradient(circle,rgba(255,42,109,.5),transparent 68%)",
          filter: "blur(50px)",
          mixBlendMode: "screen",
          animation: "rlDrift2 9s ease-in-out infinite alternate",
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none z-[1]"
        style={{
          width: "450px",
          height: "450px",
          right: "-180px",
          top: "22%",
          background: "radial-gradient(circle,rgba(188,19,254,.48),transparent 68%)",
          filter: "blur(50px)",
          mixBlendMode: "screen",
          animation: "rlDrift2 13s ease-in-out infinite alternate -4s",
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none z-[1]"
        style={{
          width: "420px",
          height: "420px",
          left: "35%",
          bottom: "-200px",
          background: "radial-gradient(circle,rgba(255,140,0,.45),transparent 68%)",
          filter: "blur(50px)",
          mixBlendMode: "screen",
          animation: "rlDrift2 11s ease-in-out infinite alternate -6s",
        }}
      />
      <div
        className="fixed rounded-full pointer-events-none z-[1]"
        style={{
          width: "300px",
          height: "300px",
          left: "60%",
          top: "-100px",
          background: "radial-gradient(circle,rgba(0,245,255,.35),transparent 68%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
          animation: "rlDrift2 14s ease-in-out infinite alternate -8s",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <nav
          className="flex items-center justify-between gap-4 mb-6"
          style={{
            animation: "rlNavSlide2 0.8s ease-out",
          }}
        >
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#00f5ff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <button
            onClick={() => {
              playClick();
              setC("select");
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.2)",
              color: "#fff",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 25px rgba(255,255,255,.08)",
            }}
          >
            <LayersIcon size={12} /> Cambiar módulo / 切换模块
          </button>
        </nav>
        <div
          className="text-center mb-6"
          style={{
            animation: "rlHeaderAppear2 1s ease-out",
          }}
        >
          <div className="gm-ribbon-wrap">
          <h1
            className="font-black"
            style={{
              fontSize: "clamp(32px,6vw,64px)",
              background: "linear-gradient(135deg,#ff8a2a,#ff2a6d,#ffea00,#00f5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(255,42,109,.5))",
              animation: "titleShimmer2 3s ease-in-out infinite",
            }}
          >
            <DiamondIcon
              size={40}
              className="inline mr-2 mb-1"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,234,0,0.8))",
              }}
            />
            Ruleta de Palabras
          </h1>
          </div>
          <p
            className="mt-2 font-medium tracking-wider"
            style={{
              color: "rgba(207,216,255,.5)",
              fontSize: "16px",
              textShadow: "0 0 15px rgba(0,245,255,0.4)",
            }}
          >
            GIRA, ADIVINA Y APRENDE / 转动、猜测、学习
          </p>
        </div>
        <div
          className="flex justify-center gap-3 mb-4 flex-wrap"
          style={{
            animation: "scoreAppear2 0.8s ease-out 0.3s both",
          }}
        >
          <div
            className="px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(0,245,255,.12)",
              border: "1px solid rgba(0,245,255,.3)",
              color: "#00f5ff",
              boxShadow: "0 0 25px rgba(0,245,255,.2), inset 0 1px 0 rgba(255,255,255,.1)",
              animation: "neonPulse2 2s ease-in-out infinite",
            }}
          >
            <ZapIcon
              size={14}
              className="inline"
              style={{
                filter: "drop-shadow(0 0 6px #00f5ff)",
              }}
            />{" "}
            Score: {O}
          </div>
          <div
            className="px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(255,42,109,.12)",
              border: "1px solid rgba(255,42,109,.3)",
              color: "#ff2a6d",
              boxShadow: "0 0 25px rgba(255,42,109,.2), inset 0 1px 0 rgba(255,255,255,.1)",
              animation: "neonPulse2 2.5s ease-in-out infinite",
            }}
          >
            <FlameIcon
              size={14}
              className="inline"
              style={{
                filter: "drop-shadow(0 0 6px #ff2a6d)",
              }}
            />{" "}
            Racha: {g}
          </div>
          <div
            className="px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(255,234,0,.12)",
              border: "1px solid rgba(255,234,0,.3)",
              color: "#ffea00",
              boxShadow: "0 0 25px rgba(255,234,0,.2), inset 0 1px 0 rgba(255,255,255,.1)",
              animation: "neonPulse2 3s ease-in-out infinite",
            }}
          >
            <TrophyIcon
              size={14}
              className="inline"
              style={{
                filter: "drop-shadow(0 0 6px #ffea00)",
              }}
            />{" "}
            {oe}/{Ne}
          </div>
          <ItComponent level={level} />
        </div>
        {l && !M.has(l.word) && (
          <div
            className="mb-4"
            style={{
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            <NtComponent seconds={$} maxSeconds={j} label={`${$}s`} />
          </div>
        )}
        {B && h >= 3 && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div
              className="text-6xl font-black flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg,#ff8a2a,#ff2a6d,#ffea00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 50px rgba(255,42,109,.8))",
                animation: "comboPop2 1.2s ease-out forwards",
              }}
            >
              <FlameIcon
                size={56}
                style={{
                  filter: "drop-shadow(0 0 20px #ffea00)",
                }}
              />
              x{h} RACHA!
            </div>
          </div>
        )}
        {ze && fe > 1 && (
          <div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            style={{
              animation: "fadeOut 1.5s ease-out forwards",
            }}
          >
            <div
              className="text-5xl font-black flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg,#00f5ff,#bc13fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(0,245,255,.6))",
                animation: "multiplierPop 1s ease-out",
              }}
            >
              <TargetIcon
                size={48}
                style={{
                  filter: "drop-shadow(0 0 15px #00f5ff)",
                }}
              />
              x{fe} MULTIPLICADOR!
            </div>
          </div>
        )}
        <div
          className="text-center mb-6"
          style={{
            animation: de
              ? "wordSlideOut 0.4s ease-in forwards"
              : "bannerDrop2 0.6s cubic-bezier(.2,.9,.2,1)",
            opacity: de ? 0 : 1,
          }}
        >
          <div
            className="inline-block px-8 py-4 rounded-2xl font-black text-lg md:text-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,rgba(255,42,109,.25),rgba(188,19,254,.2))",
              border: "2px solid rgba(255,42,109,.5)",
              color: "#ffea00",
              boxShadow:
                "0 0 60px rgba(255,42,109,.4), 0 0 120px rgba(188,19,254,.15), inset 0 2px 0 rgba(255,255,255,.1)",
              textShadow: "0 0 25px rgba(255,234,0,.6)",
              animation: "neonPulse2 2s ease-in-out infinite",
            }}
          >
            <DiamondIcon
              size={24}
              className="inline mr-2 mb-1"
              style={{
                filter: "drop-shadow(0 0 10px rgba(255,234,0,0.8))",
              }}
            />
            {l?.hintCn || "Gira la ruleta!"}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                animation: "shineSweep2 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center gap-6">
            <TtComponent words={words} onSelect={onSelect} onSpin={onSpin} />
            {words.length === 0 && a.length > 0 && !P && (
              <div className="text-center py-8">
                <div
                  className="inline-block px-8 py-4 rounded-2xl font-black text-xl"
                  style={{
                    background: "linear-gradient(135deg,rgba(57,255,20,.2),rgba(0,245,255,.15))",
                    border: "2px solid rgba(57,255,20,.5)",
                    color: "#39ff14",
                    boxShadow: "0 0 40px rgba(57,255,20,.3), inset 0 2px 0 rgba(255,255,255,.1)",
                  }}
                >
                  <TrophyIcon size={28} className="inline mr-2" /> ¡Todas las palabras completadas! /
                  所有单词已完成！
                </div>
              </div>
            )}
            {l && (
              <>
                <div
                  className="flex gap-2 justify-center flex-wrap"
                  style={{
                    animation: "fadeIn 0.5s ease-out",
                  }}
                >
                  {l.word.split("").map((letter, index) => {
                    const isRevealed = w.has(letter) || M.has(l.word);
                    return (
                      <AtComponent
                        key={`${l.word}-${index}`}
                        letter={letter}
                        isRevealed={isRevealed}
                        index={index}
                        totalLetters={l.word.length}
                        wordKey={l.word}
                      />
                    );
                  })}
                </div>
                <RtComponent revealed={w} currentWord={l} />
              </>
            )}
          </div>
          <div
            className="gm-panel rounded-3xl p-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.65))",
              border: "1px solid rgba(255,255,255,.2)",
              backdropFilter: "blur(24px)",
              boxShadow:
                "0 0 80px rgba(255,42,109,.2), 0 25px 80px rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.1)",
              transform: "perspective(1000px) rotateY(-3deg)",
              transition: "transform 0.5s ease-out",
            }}
          >
            <div
              className="absolute -inset-[2px] rounded-[26px] -z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,42,109,.3), rgba(188,19,254,.2), rgba(0,245,255,.2))",
                filter: "blur(30px)",
                opacity: 0.6,
                animation: "neonPulse2 3s ease-in-out infinite",
              }}
            />
            <div
              className="flex items-center gap-2 mb-4 text-lg font-extrabold"
              style={{
                color: "#ffea00",
                textShadow: "0 0 20px rgba(255,234,0,0.5)",
              }}
            >
              <SparklesIcon
                size={20}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255,234,0,0.8))",
                }}
              />{" "}
              Adivina la palabra
            </div>
            {l && (
              <div
                className="gm-word mb-4 p-4 rounded-2xl text-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,42,109,.2), rgba(188,19,254,.15))",
                  border: "2px solid rgba(255,42,109,.4)",
                  boxShadow: "0 0 50px rgba(255,42,109,.3), inset 0 2px 0 rgba(255,255,255,.1)",
                  animation: "neonPulse2 2s ease-in-out infinite",
                }}
              >
                <p className="text-xs text-white/40 mb-1">Palabra seleccionada / 选择的单词</p>
                <p
                  className="text-2xl md:text-4xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #ff8a2a, #ff2a6d, #ffea00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 30px rgba(255,42,109,.4)",
                    filter: "drop-shadow(0 0 10px rgba(255,42,109,0.3))",
                  }}
                >
                  {l.hintCn}
                </p>
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                    animation: "shineSweep2 3s ease-in-out infinite",
                  }}
                />
              </div>
            )}
            {l ? (
              <p
                className="text-sm italic mb-4 text-center font-medium"
                style={{
                  color: "rgba(207,216,255,.5)",
                }}
              >
                Pista: {l.hintCn}
              </p>
            ) : (
              <p
                className="text-center text-sm font-medium mb-5 py-8"
                style={{
                  color: "rgba(207,216,255,.5)",
                }}
              >
                Gira la ruleta para obtener una palabra... / 转动轮盘获取单词...
              </p>
            )}
            <div className="mobile-letter-keyboard flex flex-col gap-2 items-center">
              {_e.map((x, key) => (
                <div key={key} className="mobile-letter-row flex gap-1.5 justify-center">
                  {x.split("").map((S) => {
                    const isUsed = w.has(S);
                    const isCorrect = l?.word.includes(S) && isUsed;
                    return (
                      <StComponent
                        key={S}
                        ch={S}
                        isUsed={isUsed}
                        isCorrect={isCorrect}
                        onClick={() => ne(S)}
                        disabled={!l || M.has(l.word) || P}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div
              className="text-center mt-4 font-extrabold text-xl"
              style={{
                color: "#ffea00",
                textShadow: "0 0 20px rgba(255,234,0,0.5)",
              }}
            >
              <CoinsIcon
                size={18}
                className="inline mr-2 mb-1"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255,234,0,0.8))",
                }}
              />
              Puntuación: {O}
            </div>
            {F && (
              <div
                className="text-center mt-2 text-sm font-bold"
                style={{
                  color: "#ff8a2a",
                  textShadow: "0 0 15px rgba(255,138,42,0.4)",
                  animation: "fadeIn 0.3s ease-out",
                }}
              >
                {F}
              </div>
            )}
          </div>
        </div>
      </div>
      {P && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: "rgba(3,4,17,.96)",
            backdropFilter: "blur(50px)",
          }}
        >
          <h1
            className="font-black mb-4 relative"
            style={{
              fontSize: "clamp(40px,7vw,72px)",
              background: "linear-gradient(135deg,#ff8a2a,#ff2a6d,#ffea00,#00f5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rlWinPop2 1s cubic-bezier(.2,.9,.2,1)",
              filter: "drop-shadow(0 0 40px rgba(255,42,109,0.5))",
            }}
          >
            <TrophyIcon
              size={48}
              className="inline mr-3 mb-2"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,234,0,0.8))",
              }}
            />
            ¡FELICIDADES!
          </h1>
          <div
            className="text-5xl my-4"
            style={{
              animation: "starSpin2 3s ease-in-out infinite",
            }}
          >
            <span
              style={{
                filter: "drop-shadow(0 0 30px rgba(255,234,0,0.9))",
                animation: "starPop2 1s ease-out infinite",
              }}
            >
              ⭐
            </span>
            <span
              style={{
                filter: "drop-shadow(0 0 30px rgba(255,234,0,0.9))",
                animation: "starPop2 1s ease-out infinite 0.2s",
              }}
            >
              ⭐
            </span>
            <span
              style={{
                filter: "drop-shadow(0 0 30px rgba(255,234,0,0.9))",
                animation: "starPop2 1s ease-out infinite 0.4s",
              }}
            >
              ⭐
            </span>
            <span
              style={{
                filter: "drop-shadow(0 0 30px rgba(255,234,0,0.9))",
                animation: "starPop2 1s ease-out infinite 0.6s",
              }}
            >
              ⭐
            </span>
            <span
              style={{
                filter: "drop-shadow(0 0 30px rgba(255,234,0,0.9))",
                animation: "starPop2 1s ease-out infinite 0.8s",
              }}
            >
              ⭐
            </span>
          </div>
          <p
            className="text-lg mb-8 font-medium"
            style={{
              color: "rgba(207,216,255,.6)",
              textShadow: "0 0 15px rgba(0,245,255,0.3)",
            }}
          >
            Has completado todas las palabras / 你完成了所有单词
          </p>
          <p
            className="text-3xl font-black mb-8 flex items-center gap-2"
            style={{
              color: "#ffea00",
              textShadow: "0 0 40px rgba(255,234,0,0.6)",
              animation: "scoreBounce2 2s ease-in-out infinite",
            }}
          >
            <DiamondIcon
              size={32}
              style={{
                filter: "drop-shadow(0 0 15px rgba(255,234,0,0.8))",
              }}
            />{" "}
            Score: {O}
          </p>
          <button
            onClick={We}
            className="px-12 py-4 rounded-full text-white font-black text-lg transition-all hover:scale-105 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#ff2a6d,#ff8a00,#ffea00)",
              boxShadow:
                "0 0 60px rgba(255,42,109,.6), 0 12px 50px rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.3)",
              animation: "neonPulse2 1.5s ease-in-out infinite",
            }}
          >
            <span className="relative z-10">Jugar de nuevo</span>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animation: "shineSweep2 2s ease-in-out infinite",
              }}
            />
          </button>
          <P_1 currentGameId="ruleta" />
        </div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes rlBgShift2{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(15deg) brightness(1.1)}100%{filter:hue-rotate(-10deg)}}
        @keyframes rlGridDrift2{0%{background-position:0 0,0 0}100%{background-position:0 60px,60px 0}}
        @keyframes rlDrift2{from{transform:translate3d(0,0,0) scale(.92)}to{transform:translate3d(40px,-30px,0) scale(1.15)}}
        @keyframes rlNavSlide2{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes rlHeaderAppear2{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes rlBtnFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes rlBtnPulseFast{0%,100%{box-shadow:0 0 80px rgba(255,42,109,.9), 0 12px 50px rgba(0,0,0,.5), 0 0 40px rgba(255,234,0,.6)}50%{box-shadow:0 0 100px rgba(255,42,109,1), 0 12px 50px rgba(0,0,0,.5), 0 0 60px rgba(255,234,0,.8)}}
        @keyframes letterPop2{0%{transform:rotateY(90deg) scale(.4) translateZ(-80px);opacity:0}40%{transform:rotateY(-15deg) scale(1.2) translateZ(20px)}70%{transform:rotateY(5deg) scale(1.05) translateZ(0)}100%{transform:rotateY(0) scale(1) translateZ(0);opacity:1}}
        @keyframes letterGlow{0%,100%{text-shadow:0 0 15px rgba(57,255,20,.7)}50%{text-shadow:0 0 30px rgba(57,255,20,1),0 0 50px rgba(57,255,20,.5)}}
        @keyframes rlWinPop2{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes bannerDrop2{0%{transform:translateY(-50px) scale(0.8);opacity:0}100%{transform:translateY(0) scale(1);opacity:1}}
        @keyframes comboPop2{0%{transform:scale(0.3) rotateX(90deg);opacity:0}25%{transform:scale(1.4) rotateX(0deg);opacity:1}50%{transform:scale(1.1) rotateX(0deg);opacity:1}75%{transform:scale(1.2) rotateX(0deg);opacity:1}100%{transform:scale(1.8) rotateX(0deg);opacity:0}}
        @keyframes multiplierPop{0%{transform:scale(0.2);opacity:0}50%{transform:scale(1.3);opacity:1}100%{transform:scale(1);opacity:0}}
        @keyframes neonPulse2{0%,100%{box-shadow:0 0 15px currentColor, 0 0 30px currentColor}50%{box-shadow:0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor}}
        @keyframes mascotFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes mascotPulse2{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        @keyframes mascotShadow2{0%,100%{transform:scale(1);opacity:0.2}50%{transform:scale(0.8);opacity:0.1}}
        @keyframes sparkle1b{0%,100%{opacity:0}50%{opacity:1}}
        @keyframes sparkle2b{0%,100%{opacity:0;transform:scale(1)}50%{opacity:1;transform:scale(1.6)}}
        @keyframes sparkle3b{0%,100%{opacity:0;transform:translateY(0)}50%{opacity:1;transform:translateY(-6px)}}
        @keyframes tearDrop2{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
        @keyframes wheelRingSpin2{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes centerPulse2{0%,100%{box-shadow:0 0 60px rgba(255,234,0,.8), 0 0 120px rgba(255,42,109,.4), 0 0 180px rgba(255,140,0,.2), inset 0 3px 10px rgba(255,255,255,.4)}50%{box-shadow:0 0 80px rgba(255,234,0,1), 0 0 160px rgba(255,42,109,.6), 0 0 240px rgba(255,140,0,.3), inset 0 3px 10px rgba(255,255,255,.5)}}
        @keyframes centerPulseFast{0%,100%{box-shadow:0 0 80px rgba(255,234,0,1), 0 0 160px rgba(255,42,109,.6), 0 0 240px rgba(255,140,0,.3)}50%{box-shadow:0 0 120px rgba(255,234,0,1), 0 0 200px rgba(255,42,109,.8), 0 0 300px rgba(255,140,0,.5)}}
        @keyframes sparkleSpin2{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes shineSweep2{0%{transform:translateX(-100%)}50%{transform:translateX(100%)}100%{transform:translateX(100%)}}
        @keyframes titleShimmer2{0%{filter:brightness(1)}50%{filter:brightness(1.25)}100%{filter:brightness(1)}}
        @keyframes scoreAppear2{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes starPop2{0%,100%{transform:scale(1)}50%{transform:scale(1.4)}}
        @keyframes starSpin2{0%,100%{transform:rotate(0deg)}50%{transform:rotate(8deg)}}
        @keyframes scoreBounce2{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes casinoLight2{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.3)}}
        @keyframes iconFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes screenShake{0%,100%{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-12px,-6px,0)}20%,40%,60%,80%{transform:translate3d(12px,6px,0)}15%,45%,75%{transform:translate3d(-6px,6px,0)}25%,55%,85%{transform:translate3d(6px,-6px,0)}}
        @keyframes flashFade{0%{opacity:1}100%{opacity:0}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeOut{0%{opacity:1}80%{opacity:1}100%{opacity:0}}
        @keyframes wordSlideOut{0%{transform:translateX(0);opacity:1}100%{transform:translateX(100px);opacity:0}}
        @keyframes keyRipple{0%{transform:scale(0);opacity:1}100%{transform:scale(2.5);opacity:0}}
        @keyframes crownFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @keyframes flameFlicker{0%{transform:scaleY(1)}100%{transform:scaleY(1.3)}}
        @keyframes slotPulse{0%,100%{box-shadow:0 0 20px rgba(255,255,255,.1), 0 4px 20px rgba(0,0,0,.3)}50%{box-shadow:0 0 25px rgba(0,245,255,.2), 0 4px 20px rgba(0,0,0,.3)}}
        @keyframes slotDotPulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.4);opacity:1}}
        @keyframes slotBorderRotate{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes spinBurst{0%{opacity:0.3}100%{opacity:0.6}}
      `,
        }}
      />
    </div>
  );
}
export { YtComponent as default };
