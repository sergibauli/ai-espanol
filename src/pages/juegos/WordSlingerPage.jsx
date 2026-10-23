import {
  ZapIcon,
  TrophyIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  CrosshairIcon,
  LayersIcon,
  TimerIcon,
  TargetIcon,
  FlameIcon,
  WindIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, b, c } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function dt(s) {
  const f = [...s];
  for (let c = f.length - 1; c > 0; c--) {
    const j = Math.floor(Math.random() * (c + 1));
    [f[c], f[j]] = [f[j], f[c]];
  }
  return f;
}
function CtComponent({ expression, scale = 1 }) {
  const c = expression === "happy" ? 1.5 : expression === "excited" ? 2.5 : expression === "sad" ? -0.5 : 0;
  const d =
    expression === "happy"
      ? "M 14 32 Q 20 38 26 32"
      : expression === "excited"
        ? "M 14 32 Q 20 42 26 32"
        : expression === "sad"
          ? "M 14 36 Q 20 30 26 36"
          : "M 16 34 Q 20 36 24 34";
  const opacity = expression === "happy" || expression === "excited" ? 0.7 : 0.3;
  const E = expression === "excited";
  const x = expression === "sad";
  const z = expression === "sad";
  const u = expression === "excited" ? "3px" : "0px";
  const w = expression === "sad" ? "#4a2010" : "#6b3020";
  const P = expression === "sad" ? "#888" : "#ffd600";
  return (
    <svg
      width={80 * scale}
      height={90 * scale}
      viewBox="0 0 40 48"
      style={{
        filter: "drop-shadow(0 0 12px rgba(255,180,50,.7)) drop-shadow(0 0 24px rgba(255,180,50,.3))",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="hatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5a3c" />
          <stop offset="100%" stopColor="#5a3010" />
        </linearGradient>
        <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe8d6" />
          <stop offset="100%" stopColor="#ffcdb0" />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="12" rx="18" ry="4.5" fill="url(#hatGrad)" stroke="#4a2510" strokeWidth="0.8" />
      <path
        d={`M 9 12 Q 20 ${1 - parseInt(u)} 31 12 L 29 18 Q 20 14 11 18 Z`}
        fill="url(#hatGrad)"
        stroke="#4a2510"
        strokeWidth="0.5"
      />
      <rect x="10" y="14" width="20" height="2.5" rx="1" fill="#2a2a3a" />
      <polygon
        points="20,7 21.2,10.2 24.5,10.5 22,12.5 22.8,15.5 20,14 17.2,15.5 18,12.5 15.5,10.5 18.8,10.2"
        fill="#ffd600"
        opacity="0.9"
      />
      <ellipse cx="20" cy="24" rx="13" ry="12" fill="url(#faceGrad)" />
      <ellipse cx="11" cy="28" rx="3.5" ry="2.2" fill="#ff6688" opacity={opacity}>
        <animate attributeName="rx" values="3.5;4;3.5" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="29" cy="28" rx="3.5" ry="2.2" fill="#ff6688" opacity={opacity}>
        <animate attributeName="rx" values="3.5;4;3.5" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {E ? (
        <>
          <polygon
            points="12,20 14,24 18,24 15,27 16,31 12,28 8,31 9,27 6,24 10,24"
            fill="#ffd600"
            stroke="#e6a000"
            strokeWidth="0.3"
          >
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.15;1"
              dur="0.6s"
              repeatCount="indefinite"
              additive="sum"
            />
          </polygon>
          <polygon
            points="28,20 30,24 34,24 31,27 32,31 28,28 24,31 25,27 22,24 26,24"
            fill="#ffd600"
            stroke="#e6a000"
            strokeWidth="0.3"
          >
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.15;1"
              dur="0.6s"
              repeatCount="indefinite"
              additive="sum"
            />
          </polygon>
        </>
      ) : (
        <>
          <ellipse cx="15" cy={22 + c} rx="2.8" ry={expression === "sad" ? 2 : 3.8} fill="#1a1a2e" />
          <ellipse cx="25" cy={22 + c} rx="2.8" ry={expression === "sad" ? 2 : 3.8} fill="#1a1a2e" />
          <circle cx="16.2" cy={21 + c} r="1.2" fill="white" />
          <circle cx="26.2" cy={21 + c} r="1.2" fill="white" />
          <line
            x1="12"
            y1={20 + c}
            x2="11"
            y2={18 + c}
            stroke="#1a1a2e"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
          <line
            x1="28"
            y1={20 + c}
            x2="29"
            y2={18 + c}
            stroke="#1a1a2e"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
        </>
      )}
      {z && (
        <path d="M 32 16 Q 34 19 32 22 Q 30 19 32 16" fill="#4dd0e1" opacity="0.7">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,3; 0,0"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      )}
      {x && (
        <circle cx="13" cy="25" r="1.2" fill="#4dd0e1" opacity="0.6">
          <animate attributeName="cy" values="25;30;32" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.3;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
      )}
      <path d={d} fill="none" stroke="#c45c6a" strokeWidth="1.4" strokeLinecap="round">
        {expression === "happy" && (
          <animate
            attributeName="d"
            values="M 14 32 Q 20 38 26 32;M 14 32 Q 20 40 26 32;M 14 32 Q 20 38 26 32"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </path>
      <path d="M 8 34 L 6 46 Q 20 50 34 46 L 32 34 Z" fill={w} stroke="#3a1508" strokeWidth="1" />
      <rect x="18" y="39" width="4" height="4" rx="1" fill={P}>
        {expression === "excited" && (
          <animate
            attributeName="fill"
            values="#ffd600;#ff6b35;#ffd600"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      <rect x="28" y="36" width="9" height="3.5" rx="1" fill="#5a5a6a" />
      <rect x="35" y="34.5" width="3.5" height="4.5" rx="0.5" fill="#4a4a5a" />
      <ellipse cx="9" cy="38" rx="2.5" ry="6" fill={w} transform="rotate(20 9 38)" />
      <ellipse cx="31" cy="38" rx="2.5" ry="6" fill={w} transform="rotate(-20 31 38)" />
      {expression === "happy" && (
        <path d="M 32 8 Q 34 5 36 8 Q 38 5 40 8 Q 40 12 36 16 Q 32 12 32 8" fill="#ff4d6d" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-4; 0,0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
      )}
    </svg>
  );
}
function LComponent({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 40 80"
      width="40"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cactusGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2d8a3e" />
          <stop offset="50%" stopColor="#39ff14" />
          <stop offset="100%" stopColor="#1a5c24" />
        </linearGradient>
        <filter id="cactusGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="20" cy="76" rx="14" ry="3" fill="rgba(0,0,0,0.3)" filter="blur(2px)" />
      <path
        d="M 18 76 L 18 20 Q 18 10 20 10 Q 22 10 22 20 L 22 76 Z"
        fill="url(#cactusGrad)"
        stroke="#39ff14"
        strokeWidth="1.5"
        filter="url(#cactusGlow)"
      />
      <path
        d="M 18 35 Q 8 30 8 22 Q 8 18 12 18 Q 16 18 16 22 L 16 35 Z"
        fill="url(#cactusGrad)"
        stroke="#39ff14"
        strokeWidth="0.8"
        filter="url(#cactusGlow)"
      />
      <path
        d="M 22 45 Q 32 40 32 32 Q 32 28 28 28 Q 24 28 24 32 L 24 45 Z"
        fill="url(#cactusGrad)"
        stroke="#39ff14"
        strokeWidth="0.8"
        filter="url(#cactusGlow)"
      />
      <circle cx="19" cy="18" r="1.5" fill="#ff6688" opacity="0.7" />
      <circle cx="21" cy="22" r="1.2" fill="#ff6688" opacity="0.6" />
      <circle cx="18" cy="30" r="1" fill="#ff6688" opacity="0.5" />
    </svg>
  );
}
function XtComponent({ shooting }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%) translateZ(30px)",
        zIndex: 20,
      }}
    >
      <svg
        width="40"
        height="50"
        viewBox="0 0 40 50"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255,150,50,0.6)) drop-shadow(0 0 20px rgba(255,100,30,0.3))",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a0522d" />
            <stop offset="100%" stopColor="#6b3a1a" />
          </linearGradient>
        </defs>
        <rect
          x="18"
          y="20"
          width="4"
          height="28"
          rx="2"
          fill="url(#woodGrad)"
          stroke="#ffd700"
          strokeWidth="0.5"
        />
        <line x1="20" y1="22" x2="8" y2="6" stroke="url(#woodGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="22" x2="32" y2="6" stroke="url(#woodGrad)" strokeWidth="3" strokeLinecap="round" />
        <line
          x1="8"
          y1="6"
          x2="20"
          y2={shooting ? "2" : "14"}
          stroke="#ff6b35"
          strokeWidth="2"
          opacity="0.9"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255,107,53,0.8))",
            transition: "all 0.15s ease",
          }}
        />
        <line
          x1="32"
          y1="6"
          x2="20"
          y2={shooting ? "2" : "14"}
          stroke="#ff6b35"
          strokeWidth="2"
          opacity="0.9"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255,107,53,0.8))",
            transition: "all 0.15s ease",
          }}
        />
        <ellipse
          cx="20"
          cy={shooting ? "2" : "14"}
          rx="3"
          ry="2"
          fill="#8b4513"
          stroke="#ffd700"
          strokeWidth="0.5"
          style={{
            transition: "all 0.15s ease",
          }}
        />
      </svg>
    </div>
  );
}
function FtComponent({ shooting }) {
  if (shooting) {
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 80,
          left: "50%",
          zIndex: 25,
          marginLeft: -8,
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: 16,
            height: 16,
            background: "radial-gradient(circle at 30% 30%, #d4a574, #8b6914, #4a3010)",
            boxShadow:
              "0 0 15px rgba(255,180,50,0.9), 0 0 30px rgba(255,120,40,0.6), 0 0 50px rgba(255,100,30,0.3), inset 0 0 8px rgba(255,200,100,0.5)",
            animation: "rockFlyArc 0.4s ease-out forwards, rockSpin 0.4s linear forwards",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            background: "radial-gradient(circle, rgba(255,180,50,0.6), transparent)",
            top: 8,
            left: 3,
            animation: "trailFade 0.4s ease-out forwards",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "radial-gradient(circle, rgba(255,200,100,0.4), transparent)",
            top: 14,
            left: 5,
            animation: "trailFade 0.4s ease-out 0.05s forwards",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            background: "radial-gradient(circle, rgba(255,220,150,0.3), transparent)",
            top: 18,
            left: 6,
            animation: "trailFade 0.4s ease-out 0.1s forwards",
          }}
        />
      </div>
    );
  }
  return null;
}
function PtComponent({ m, onClick }) {
  const [c, setC] = React.useState({
    x: 0,
    y: 0,
  });
  const mRef = React.useRef(null);
  const { playClick } = useSound();
  const onMouseMove = (u) => {
    if (!mRef.current) {
      return;
    }
    const w = mRef.current.getBoundingClientRect();
    const P = (u.clientX - w.left) / w.width;
    const Z = (u.clientY - w.top) / w.height;
    setC({
      x: (Z - 0.5) * -22,
      y: (P - 0.5) * 22,
    });
  };
  const onMouseLeave = () =>
    setC({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={mRef}
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,10,30,.6))",
        border: `1px solid ${m.color}50`,
        transform: `perspective(600px) rotateX(${c.x}deg) rotateY(${c.y}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        boxShadow: `0 10px 40px rgba(0,0,0,.5), 0 0 30px ${m.color}15`,
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${m.color}00, ${m.color}, ${m.color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
          transform: "translateZ(20px)",
          boxShadow: `0 0 20px ${m.color}40`,
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
        {m.titulo}
      </h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m.color}aa`,
          transform: "translateZ(10px)",
        }}
      >
        {m.tituloChino}
      </p>
      <p
        className="text-xs font-medium text-white/40"
        style={{
          transform: "translateZ(5px)",
        }}
      >
        {m.vocabularioCount} palabras / 词
      </p>
    </button>
  );
}
function StComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick, playSlice } = useSound();
  const [x, setX] = React.useState("select");
  const [u, setU] = React.useState([]);
  const [P, setP] = React.useState([]);
  const [A, setA] = React.useState([]);
  const [V, setV] = React.useState([]);
  const [K, setK] = React.useState([]);
  const [Le, setLe] = React.useState([]);
  const [H, setH] = React.useState([]);
  const [J, setJ] = React.useState([]);
  const [ee, setEe] = React.useState([]);
  const [ae, setAe] = React.useState([]);
  const [me, setMe] = React.useState(60);
  const [ye, setYe] = React.useState(0);
  const [B, setB] = React.useState(0);
  const [Be, setBe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordslinger_best") || "0");
    } catch {
      return 0;
    }
  });
  const [oe, setOe] = React.useState(0);
  const [h, setH_1] = React.useState(false);
  const [je, setJe] = React.useState(false);
  const [De, setDe] = React.useState(false);
  const [Ye, setYe_1] = React.useState("");
  const [Ne, setNe] = React.useState("");
  const [ut, setUt] = React.useState(0);
  const [Ae, setAe_1] = React.useState(false);
  const [T, setT] = React.useState(false);
  const YRef = React.useRef(0);
  const yRef = React.useRef(0);
  const XRef = React.useRef(0);
  const ieRef = React.useRef(null);
  const deRef = React.useRef(null);
  React.useRef(null);
  const Oe = g();
  const [ze, setZe] = React.useState("");
  const kRef = React.useRef(null);
  const FRef = React.useRef(null);
  const xeRef = React.useRef(null);
  const VeRef = React.useRef(null);
  const UeRef = React.useRef(0);
  const KeRef = React.useRef(0);
  const _eRef = React.useRef(0);
  const HeRef = React.useRef(0);
  const qeRef = React.useRef(0);
  const [expression, setExpression] = React.useState("neutral");
  const peRef = React.useRef(null);
  const GRef = React.useRef(null);
  const Ce = (t) => {
    setExpression(t);
    if (peRef.current) {
      clearTimeout(peRef.current);
    }
    peRef.current = setTimeout(() => setExpression("neutral"), 1500);
  };
  const ue = React.useCallback(
    (t) => {
      playClick();
      let o = t ? b(t) : c();
      if (o.length === 0) {
        setZe('Este módulo no tiene vocabulario válido. Prueba con otro o selecciona "Todos los módulos".');
        return;
      }
      const a = dt(
        o
          .filter((l) => l.espanol && l.chino)
          .map((l) => ({
            espanol: l.espanol.trim().toUpperCase(),
            chino: l.chino,
          }))
          .filter((l) => l.espanol.length >= 3 && l.espanol.length <= 15),
      );
      setU(a);
      setP([]);
      setA([]);
      setV([]);
      setK([]);
      setLe([]);
      setH([]);
      setJ([]);
      setEe([]);
      setAe([]);
      setMe(60);
      setYe(0);
      setB(0);
      setOe(0);
      setH_1(false);
      setDe(false);
      setNe("");
      YRef.current = 0;
      yRef.current = 0;
      XRef.current = 0;
      FRef.current = null;
      setExpression("neutral");
      setX("playing");
    },
    [playClick],
  );
  React.useEffect(() => {
    if (x === "playing") {
      ieRef.current = setInterval(() => {
        setMe((t) => {
          if (t <= 1) {
            return (
              setX("gameover"),
              playLose(),
              setBe((o) => {
                const a = Math.max(o, YRef.current);
                localStorage.setItem("wordslinger_best", String(a));
                return a;
              }),
              0
            );
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (ieRef.current) {
          clearInterval(ieRef.current);
        }
      };
    }
  }, [x, playLose]);
  React.useEffect(() => {
    if (x !== "playing" || h) {
      return;
    }
    const t = setInterval(() => {
      setOe((o) => {
        const a = Math.max(0, o - 1.5);
        XRef.current = a;
        return a;
      });
    }, 200);
    return () => clearInterval(t);
  }, [x, h]);
  React.useEffect(() => {
    if (x === "playing") {
      deRef.current = setInterval(() => {
        setP((t) => {
          if (t.length >= 4) {
            return t;
          }
          const o = u[Math.floor(Math.random() * u.length)];
          if (!o) {
            return t;
          }
          if (!FRef.current || Math.random() > 0.6) {
            FRef.current = o;
            setYe_1(o.chino);
          }
          const a = kRef.current ? kRef.current.clientWidth : 800;
          const l = ["left", "center", "right"];
          const side = l[Math.floor(Math.random() * l.length)];
          const g =
            side === "left"
              ? 30 + Math.random() * (a * 0.25)
              : side === "center"
                ? a * 0.35 + Math.random() * (a * 0.2)
                : a * 0.65 + Math.random() * (a * 0.25);
          const d = u[Math.floor(Math.random() * u.length)];
          const b = {
            id: Date.now() + Math.random(),
            espanol: d.espanol,
            chino: d.chino,
            x: g,
            y: 80 + Math.random() * 80,
            side,
            destroyed: false,
            entryProgress: 0,
            shake: 0,
          };
          return [...t, b];
        });
      }, 2500);
      return () => {
        if (deRef.current) {
          clearInterval(deRef.current);
        }
      };
    }
  }, [x, u]);
  React.useEffect(() => {
    if (x !== "playing") {
      return;
    }
    const t = setInterval(() => {
      setP((o) =>
        o.map((a) => {
          if (a.entryProgress < 1) {
            return {
              ...a,
              entryProgress: Math.min(1, a.entryProgress + 0.08),
              shake: a.shake * 0.9,
            };
          }
          return {
            ...a,
            shake: a.shake * 0.9,
          };
        }),
      );
      setUt((o) => o + 1);
    }, 50);
    return () => clearInterval(t);
  }, [x]);
  React.useEffect(() => {
    if (A.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setA((o) =>
        o
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.15,
            life: a.life - 0.025,
            rotation: a.rotation + 5,
          }))
          .filter((a) => a.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [A.length]);
  React.useEffect(() => {
    if (V.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setV((o) =>
        o
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.3,
            rotation: a.rotation + a.rotSpeed,
            life: a.life - 0.02,
          }))
          .filter((a) => a.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [V.length]);
  React.useEffect(() => {
    if (K.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setK((o) =>
        o
          .map((a) => ({
            ...a,
            y: a.y - 1,
            life: a.life - 0.02,
          }))
          .filter((a) => a.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [K.length]);
  React.useEffect(() => {
    if (J.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setJ((o) =>
        o
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.1,
            life: a.life - 0.04,
          }))
          .filter((a) => a.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [J.length]);
  React.useEffect(() => {
    if (ee.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setEe((o) =>
        o
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.05,
            rotation: a.rotation + a.rotSpeed,
            life: a.life - 0.008,
          }))
          .filter((a) => a.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [ee.length]);
  React.useEffect(() => {
    if (ae.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setAe((o) =>
        o
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.2,
            rotation: a.rotation + 15,
            life: a.life - 0.05,
          }))
          .filter((a) => a.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [ae.length]);
  React.useEffect(() => {
    if (x !== "playing") {
      return;
    }
    const t = setInterval(() => {
      setLe((o) => {
        const a = kRef.current ? kRef.current.clientWidth : 800;
        const l = o
          .map((n) => ({
            ...n,
            x: n.x + n.vx,
            rotation: n.rotation + n.vx * 3,
          }))
          .filter((n) => n.x < a + 50);
        if (Math.random() < 0.3) {
          const n = ++UeRef.current;
          l.push({
            id: n,
            x: -30,
            y: 85 + Math.random() * 10,
            vx: 0.5 + Math.random() * 1.5,
            rotation: 0,
            size: 15 + Math.random() * 15,
          });
        }
        return l;
      });
    }, 100);
    return () => clearInterval(t);
  }, [x]);
  React.useEffect(() => {
    if (x !== "playing") {
      return;
    }
    const t = setInterval(() => {
      const o = ++KeRef.current;
      setH((a) =>
        [
          ...a,
          {
            id: o,
            x: Math.random() * 100,
            y: 90 + Math.random() * 10,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -0.2 - Math.random() * 0.3,
            size: 2 + Math.random() * 4,
            life: 1,
            opacity: 0.3 + Math.random() * 0.4,
          },
        ].filter((l) => l.life > 0),
      );
    }, 400);
    return () => clearInterval(t);
  }, [x]);
  React.useEffect(() => {
    if (H.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setH((o) =>
        o
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            life: a.life - 0.008,
            opacity: a.life * a.opacity,
          }))
          .filter((a) => a.life > 0),
      );
    }, 50);
    return () => clearInterval(t);
  }, [H.length]);
  const onChange = (t) => {
    setNe(t.target.value);
  };
  const onKeyDown = (t) => {
    if (t.key !== "Enter" || h) {
      return;
    }
    const o = Ne.trim().toUpperCase();
    if (!o) {
      return;
    }
    const a = P.find((n) => !n.destroyed && n.espanol === o);
    const FRef_current = FRef.current;
    if (a && FRef_current && a.espanol === FRef_current.espanol) {
      playSlice();
      setT(true);
      setTimeout(() => setT(false), 300);
      if (kRef.current) {
        const d = kRef.current.getBoundingClientRect();
        const b = document.getElementById(`sign-${a.id}`);
        if (b) {
          const p = b.getBoundingClientRect();
          const C = p.left + p.width / 2 - d.left;
          const I = p.top + p.height / 2 - d.top;
          const W = d.width / 2;
          const v = d.height - 60;
          const S = C - W;
          const M = I - v;
          const i = Math.sqrt(S * S + M * M) || 1;
          setAe((N) => [
            ...N,
            {
              id: ++qeRef.current,
              x: W,
              y: v,
              vx: (S / i) * 12,
              vy: (M / i) * 12 - 3,
              life: 1,
              rotation: 0,
            },
          ]);
        }
      }
      setJe(true);
      setTimeout(() => setJe(false), 150);
      setP((d) => d.filter((b) => b.id !== a.id));
      yRef.current += 1;
      setB(yRef.current);
      const n = 250 + yRef.current * 50;
      YRef.current += n;
      setYe(YRef.current);
      if (yRef.current >= 3 && (setAe_1(true), setTimeout(() => setAe_1(false), 800), kRef.current)) {
        const d = kRef.current.getBoundingClientRect();
        const b = document.getElementById(`sign-${a.id}`);
        if (b) {
          const p = b.getBoundingClientRect();
          const C = p.left + p.width / 2 - d.left;
          const y = p.top + p.height / 2 - d.top;
          const W = [];
          for (let v = 0; v < 30; v++) {
            const S = Math.random() * Math.PI * 2;
            const M = 2 + Math.random() * 5;
            W.push({
              id: ++HeRef.current,
              x: C,
              y,
              vx: Math.cos(S) * M,
              vy: Math.sin(S) * M - 3,
              rotation: Math.random() * 360,
              rotSpeed: (Math.random() - 0.5) * 20,
              color: ["#ffd600", "#ff6b35", "#00d4ff", "#39ff14", "#ff00aa", "#ffffff", "#ff3860"][v % 7],
              size: 4 + Math.random() * 8,
              life: 1.5,
            });
          }
          setEe((v) => [...v, ...W]);
        }
      }
      const g = kRef.current;
      if (g) {
        const d = g.getBoundingClientRect();
        const b = document.getElementById(`sign-${a.id}`);
        if (b) {
          const p = b.getBoundingClientRect();
          const C = p.left + p.width / 2 - d.left;
          const I = p.top + p.height / 2 - d.top;
          const W = yRef.current >= 2 ? ` x${yRef.current}!` : "";
          setK((i) => [
            ...i,
            {
              id: Date.now(),
              x: C,
              y: I - 20,
              text: `+${n}${W}`,
              life: 1,
              color: yRef.current >= 3 ? "#ffd600" : yRef.current >= 2 ? "#ff00aa" : "#ff6b35",
            },
          ]);
          const v = [];
          for (let i = 0; i < 28; i++) {
            const N = Math.random() * Math.PI * 2;
            const R = 1 + Math.random() * 6;
            v.push({
              id: Date.now() + Math.random(),
              x: C,
              y: I,
              vx: Math.cos(N) * R,
              vy: Math.sin(N) * R - 1,
              life: 1,
              color: [
                "rgba(255,200,80,0.8)",
                "rgba(255,160,40,0.7)",
                "rgba(200,140,60,0.6)",
                "rgba(255,220,120,0.5)",
                "rgba(255,180,50,0.7)",
                "rgba(255,100,30,0.6)",
                "rgba(255,255,200,0.5)",
              ][i % 7],
              size: 6 + Math.random() * 14,
              rotation: Math.random() * 360,
            });
          }
          setA((i) => [...i, ...v]);
          const S = [];
          for (let i = 0; i < 20; i++) {
            const N = Math.random() * Math.PI * 2;
            const R = 3 + Math.random() * 8;
            S.push({
              id: Date.now() + Math.random(),
              x: C,
              y: I,
              vx: Math.cos(N) * R,
              vy: Math.sin(N) * R - 3,
              rotation: Math.random() * 360,
              rotSpeed: (Math.random() - 0.5) * 20,
              life: 1,
            });
          }
          setV((i) => [...i, ...S]);
          const M = [];
          for (let i = 0; i < 12; i++) {
            const N = Math.random() * Math.PI * 2;
            const R = 4 + Math.random() * 8;
            M.push({
              id: ++_eRef.current,
              x: C,
              y: I,
              vx: Math.cos(N) * R,
              vy: Math.sin(N) * R - 2,
              life: 1,
              size: 2 + Math.random() * 4,
              color: ["#ffd600", "#ff6b35", "#ff0000", "#ffffff"][i % 4],
            });
          }
          setJ((i) => [...i, ...M]);
        }
      }
      if (Math.random() > 0.4) {
        const d = u[Math.floor(Math.random() * u.length)];
        if (d) {
          FRef.current = d;
          setYe_1(d.chino);
        }
      }
      setNe("");
      Ce(yRef.current >= 3 ? "excited" : "happy");
    } else {
      playWrong();
      setP((n) =>
        n.map((g) => {
          if (g.espanol === o) {
            return {
              ...g,
              shake: 8,
            };
          }
          return g;
        }),
      );
      setDe(true);
      setTimeout(() => setDe(false), 400);
      if (GRef.current) {
        GRef.current.style.animation = "none";
        GRef.current.offsetHeight;
        GRef.current.style.animation = "screenShake 0.3s ease-in-out";
      }
      setOe((n) => {
        const g = Math.min(100, n + 20);
        XRef.current = g;
        if (g >= 100) {
          setH_1(true);
          if (xeRef.current) {
            clearTimeout(xeRef.current);
          }
          xeRef.current = setTimeout(() => {
            setH_1(false);
            setOe(0);
            XRef.current = 0;
          }, 2000);
        }
        return g;
      });
      setB(0);
      yRef.current = 0;
      setNe("");
      Ce("sad");
    }
  };
  if (x === "select") {
    return (
      <StarfieldBackground>
        <SoundToggles />
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10"
          style={{
            perspective: "1000px",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div
              className="relative w-28 h-28 mx-auto mb-4"
              style={{
                animation: "slingerFloat 3s ease-in-out infinite",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #ffd600)",
                  boxShadow:
                    "0 0 60px rgba(255,107,53,0.7), 0 0 100px rgba(255,214,0,0.4), inset 0 0 20px rgba(255,255,255,0.1)",
                  transform: "rotateX(15deg)",
                  perspective: "800px",
                }}
              >
                <CrosshairIcon
                  size={48}
                  className="text-white relative z-10"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                  }}
                />
              </div>
              <div
                className="absolute -inset-1 rounded-2xl border-2 border-[#ff6b3540]"
                style={{
                  animation: "orbitRing 4s linear infinite",
                }}
              />
              <div
                className="absolute -inset-3 rounded-3xl border border-[#ffd60020]"
                style={{
                  animation: "orbitRing 6s linear infinite reverse",
                }}
              />
            </div>
            <h1
              className="text-5xl md:text-6xl font-black mb-3"
              style={{
                textShadow:
                  "0 0 40px rgba(255,107,53,0.5), 0 0 80px rgba(255,107,53,0.2), 0 0 120px rgba(255,180,50,0.15)",
                background: "linear-gradient(135deg,#ff6b35,#ffd600,#ff00aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Word Slinger
            </h1>
            <p className="text-white/40 text-base font-medium">
              Escribe la palabra correcta para disparar / 输入正确的单词射击
            </p>
            {ze && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,0.1)",
                }}
              >
                {ze}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setZe("");
                ue(null);
              }}
              className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,10,30,.6))",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "perspective(600px) translateZ(10px)",
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 40px rgba(0,0,0,.5), 0 0 30px rgba(255,0,170,0.15)",
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
            {Oe.map((m) => (
              <PtComponent
                key={m.id}
                m={m}
                onClick={() => {
                  setZe("");
                  ue(m.id);
                }}
              />
            ))}
          </div>
          <div className="fixed bottom-4 left-4 pointer-events-none opacity-20 hidden md:block">
            <LComponent
              style={{
                width: 60,
                height: 120,
                filter: "drop-shadow(0 0 10px rgba(57,255,20,0.3))",
              }}
            />
          </div>
          <div className="fixed bottom-8 right-20 pointer-events-none opacity-15 hidden md:block">
            <LComponent
              style={{
                width: 40,
                height: 80,
                filter: "drop-shadow(0 0 8px rgba(57,255,20,0.2))",
              }}
            />
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <SoundToggles />
      <div className="max-w-5xl mx-auto px-3 md:px-4 py-4 md:py-6 min-h-screen relative z-10" ref={GRef}>
        <div className="flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setX("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(255,255,255,0.05)",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(0,255,100,.1)",
                border: "1px solid rgba(0,255,100,.2)",
                color: "#39ff14",
                boxShadow: "0 0 15px rgba(57,255,20,0.1)",
              }}
            >
              <CrosshairIcon size={12} className="inline mr-1" /> x{B}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(0,212,255,.1)",
                border: "1px solid rgba(0,212,255,.2)",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,0.1)",
              }}
            >
              <TimerIcon size={12} className="inline mr-1" /> {me}s
            </div>
          </div>
        </div>
        <div className="text-center mb-3 md:mb-4">
          <h1
            className="text-3xl md:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#ff6b35,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,107,53,.5)) drop-shadow(0 0 60px rgba(255,180,50,.2))",
            }}
          >
            Word Slinger
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-medium">
            Escribe la palabra en ESPAÑOL / 输入西班牙语单词
          </p>
        </div>
        <div className="flex justify-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
          <div
            className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold"
            style={{
              background: "rgba(255,214,0,.1)",
              border: "1px solid rgba(255,214,0,.2)",
              color: "#ffd600",
              boxShadow: "0 0 15px rgba(255,214,0,.15), 0 0 30px rgba(255,214,0,.05)",
            }}
          >
            <ZapIcon size={14} className="inline mr-1" /> Score: <span className="tabular-nums">{ye}</span>
          </div>
          <div
            className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold"
            style={{
              background: "rgba(255,107,53,.1)",
              border: "1px solid rgba(255,107,53,.2)",
              color: "#ff6b35",
              boxShadow: "0 0 15px rgba(255,107,53,.15), 0 0 30px rgba(255,107,53,.05)",
            }}
          >
            <TargetIcon size={14} className="inline mr-1" /> Pista: <span className="tabular-nums">{Ye}</span>
          </div>
          <div
            className="px-3 py-1 md:py-1.5 rounded-full text-xs font-bold flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
              minWidth: 140,
              boxShadow: "0 0 15px rgba(255,255,255,0.05)",
            }}
          >
            <FlameIcon
              size={14}
              style={{
                color: h ? "#ff0000" : oe > 70 ? "#ff6b35" : "#ffd600",
                filter: h ? "drop-shadow(0 0 5px #ff0000)" : "drop-shadow(0 0 3px rgba(255,107,53,0.5))",
              }}
            />
            <div
              className="flex-1 h-2 md:h-2.5 rounded-full overflow-hidden"
              style={{
                background: "rgba(255,255,255,.1)",
                boxShadow: "inset 0 0 5px rgba(0,0,0,.3)",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${oe}%`,
                  background: h
                    ? "#ff0000"
                    : oe > 70
                      ? "linear-gradient(90deg, #ff6b35, #ff0000)"
                      : "linear-gradient(90deg, #ffd600, #ff6b35)",
                  boxShadow: h
                    ? "0 0 20px #ff0000, 0 0 40px #ff0000"
                    : "0 0 12px rgba(255,107,53,.5), 0 0 20px rgba(255,180,50,.2)",
                  animation: h ? "heatPulse 0.3s ease-in-out infinite" : "none",
                }}
              />
            </div>
            {h && (
              <span
                className="text-[10px] font-black"
                style={{
                  color: "#ff0000",
                  textShadow: "0 0 8px rgba(255,0,0,.8), 0 0 15px rgba(255,0,0,.5)",
                }}
              >
                ¡CALOR!
              </span>
            )}
          </div>
        </div>
        {Ae && B >= 3 && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div
              className="text-5xl md:text-6xl font-black"
              style={{
                background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(255,214,0,.8)) drop-shadow(0 0 80px rgba(255,107,53,.4))",
                animation: "comboPop 0.8s ease-out forwards",
              }}
            >
              x{B} COMBO!
            </div>
          </div>
        )}
        <div
          ref={kRef}
          className="relative mx-auto rounded-2xl md:rounded-3xl overflow-hidden border-2"
          style={{
            height: "clamp(300px, 50vh, 450px)",
            background:
              "linear-gradient(180deg, rgba(255,160,80,.15), rgba(220,120,50,.12), rgba(140,70,30,.2), rgba(60,25,10,.35))",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 0 60px rgba(255,107,53,.25), 0 20px 60px rgba(0,0,0,.4), inset 0 0 40px rgba(255,180,50,.05)",
            transformStyle: "preserve-3d",
            perspective: "1000px",
            border: "2px solid rgba(255,180,50,.35)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-[1] opacity-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,180,50,0.05) 1px, transparent 1px), linear-gradient(180deg, rgba(255,180,50,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              animation: "neonGridMove 20s linear infinite",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,100,40,.18), rgba(255,140,60,.12), rgba(220,100,30,.08), transparent 70%)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 90,
                height: 90,
                right: "12%",
                top: "6%",
                background:
                  "radial-gradient(circle, rgba(255,220,80,.6), rgba(255,120,40,.35), transparent 70%)",
                filter: "blur(25px)",
                animation: "sunPulse 5s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 50,
                height: 50,
                right: "14%",
                top: "8%",
                background: "radial-gradient(circle, rgba(255,255,200,.8), rgba(255,200,60,.5))",
                filter: "blur(8px)",
                animation: "sunPulse 5s ease-in-out infinite 0.5s",
              }}
            />
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: 120,
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="w-full h-full opacity-30">
              <path d="M0,120 L0,85 Q120,45 240,75 T480,55 T720,85 T800,65 L800,120 Z" fill="#5a3010" />
              <path d="M0,120 L0,95 Q200,65 400,85 T800,75 L800,120 Z" fill="#4a2510" opacity="0.6" />
            </svg>
          </div>
          <div
            className="absolute bottom-6 left-4 pointer-events-none z-[2] opacity-50 hidden sm:block"
            style={{
              animation: "cactusFloat3D 4s ease-in-out infinite",
            }}
          >
            <LComponent
              style={{
                width: 36,
                height: 72,
                filter: "drop-shadow(0 0 12px rgba(57,255,20,0.4)) drop-shadow(0 0 24px rgba(57,255,20,0.2))",
              }}
            />
          </div>
          <div
            className="absolute bottom-4 right-8 pointer-events-none z-[2] opacity-40 hidden sm:block"
            style={{
              animation: "cactusFloat3D 4s ease-in-out infinite 1s",
            }}
          >
            <LComponent
              style={{
                width: 28,
                height: 56,
                filter:
                  "drop-shadow(0 0 10px rgba(57,255,20,0.3)) drop-shadow(0 0 20px rgba(57,255,20,0.15))",
              }}
            />
          </div>
          {Le.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-[3]"
              style={{
                left: t.x,
                top: `${t.y}%`,
                width: t.size,
                height: t.size,
                transform: `rotate(${t.rotation}deg)`,
                opacity: 0.45,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              <svg viewBox="0 0 20 20" width={t.size} height={t.size}>
                <circle cx="10" cy="10" r="8" fill="none" stroke="#8b7355" strokeWidth="1" opacity="0.7" />
                <line x1="2" y1="10" x2="18" y2="10" stroke="#8b7355" strokeWidth="0.5" opacity="0.5" />
                <line x1="10" y1="2" x2="10" y2="18" stroke="#8b7355" strokeWidth="0.5" opacity="0.5" />
                <line x1="4" y1="4" x2="16" y2="16" stroke="#8b7355" strokeWidth="0.5" opacity="0.5" />
                <line x1="16" y1="4" x2="4" y2="16" stroke="#8b7355" strokeWidth="0.5" opacity="0.5" />
                <circle cx="10" cy="10" r="3" fill="none" stroke="#a08060" strokeWidth="0.3" opacity="0.6" />
              </svg>
            </div>
          ))}
          {H.map((t) => (
            <div
              key={t.id}
              className="absolute rounded-full pointer-events-none z-[3]"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: t.size,
                height: t.size,
                background: "#d4a574",
                opacity: t.opacity * 0.5,
                filter: "blur(1px)",
              }}
            />
          ))}
          {je && (
            <div
              className="absolute inset-0 pointer-events-none z-50"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%, rgba(255,255,220,.5), rgba(255,180,80,.3), transparent 60%)",
                animation: "flashFade 0.25s ease-out forwards",
              }}
            />
          )}
          {De && (
            <div
              className="absolute inset-0 pointer-events-none z-50"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.25), rgba(255,0,0,0.1), transparent 60%)",
                animation: "missRedFlash 0.4s ease-out forwards",
              }}
            />
          )}
          {P.map((t) => {
            const o = 20 * (1 - t.entryProgress);
            const t_entryProgress = t.entryProgress;
            const l = t.shake > 0 ? (Math.random() - 0.5) * t.shake * 3 : 0;
            return (
              <div
                key={t.id}
                id={`sign-${t.id}`}
                className="absolute cursor-default select-none"
                style={{
                  left: t.x + l,
                  top: t.y + o,
                  opacity: t_entryProgress,
                  transition: "top 0.3s ease-out, opacity 0.3s ease-out",
                  zIndex: 5,
                  animation:
                    t.shake > 0 ? "signShake 0.3s ease-in-out" : "targetFloat3D 3s ease-in-out infinite",
                  transform: `perspective(600px) rotateX(5deg) rotateY(${t.side === "left" ? "-3" : t.side === "right" ? "3" : "0"}deg) translateZ(15px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-black text-sm md:text-lg whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(160,100,50,.85), rgba(120,70,30,.7), rgba(80,45,20,.6))",
                    border: "2px solid rgba(180,120,60,.5)",
                    boxShadow:
                      "0 4px 25px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.2), 0 0 50px rgba(255,180,50,.3), 0 0 80px rgba(255,120,40,.15)",
                    backdropFilter: "blur(4px)",
                    transform: "translateZ(10px)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-15"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(60,30,10,.25) 3px, rgba(60,30,10,.25) 4px)",
                    }}
                  />
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#5a3010] opacity-60" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5a3010] opacity-60" />
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#5a3010] opacity-60" />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5a3010] opacity-60" />
                  <span
                    className="relative text-base md:text-lg font-black tracking-wider"
                    style={{
                      color: "#ffd699",
                      textShadow:
                        "0 0 15px rgba(255,180,50,.8), 0 1px 3px rgba(0,0,0,.6), 0 0 30px rgba(255,150,30,.5)",
                    }}
                  >
                    {t.espanol}
                  </span>
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-40 transition-opacity"
                    style={{
                      boxShadow: "0 0 25px rgba(255,180,50,.5), inset 0 0 20px rgba(255,180,50,.2)",
                    }}
                  />
                </div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full w-1.5 md:w-2 h-8 md:h-10"
                  style={{
                    background: "linear-gradient(180deg, #8b4513, #5a3010)",
                    boxShadow: "0 0 8px rgba(139,69,19,.4)",
                  }}
                />
              </div>
            );
          })}
          {A.map((t) => (
            <div
              key={t.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: t.color,
                opacity: t.life * 0.6,
                transform: `rotate(${t.rotation}deg) scale(${t.life})`,
                zIndex: 9999,
                filter: "blur(1px) brightness(1.5)",
                boxShadow: `0 0 ${t.size * 1.5}px ${t.color}, 0 0 ${t.size * 3}px ${t.color}80`,
              }}
            />
          ))}
          {V.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none"
              style={{
                left: t.x,
                top: t.y,
                width: 8,
                height: 3,
                background: "linear-gradient(90deg, #8b4513, #d2691e)",
                transform: `rotate(${t.rotation}deg) translateZ(${t.life * 50}px)`,
                opacity: t.life,
                zIndex: 9999,
                boxShadow: "0 0 8px rgba(139,69,19,.6), 0 0 16px rgba(255,150,50,.3)",
                filter: "blur(0.5px)",
              }}
            />
          ))}
          {J.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none rounded-full"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: t.color,
                opacity: t.life,
                zIndex: 9999,
                boxShadow: `0 0 ${t.size * 2}px ${t.color}, 0 0 ${t.size * 4}px ${t.color}80, 0 0 ${t.size * 6}px ${t.color}40`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
          {K.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none font-black text-lg md:text-xl"
              style={{
                left: t.x,
                top: t.y,
                color: t.color,
                opacity: t.life,
                textShadow: `0 0 15px ${t.color}, 0 0 30px ${t.color}80, 0 0 50px ${t.color}40`,
                zIndex: 9999,
                transform: "translateX(-50%) translateZ(30px)",
                animation: "floatUp 1s ease-out forwards",
              }}
            >
              {t.text}
            </div>
          ))}
          {ee.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size * 0.6,
                background: t.color,
                opacity: t.life * 0.8,
                transform: `rotate(${t.rotation}deg) translateZ(20px)`,
                zIndex: 9998,
                borderRadius: 2,
                boxShadow: `0 0 6px ${t.color}60`,
              }}
            />
          ))}
          {ae.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none"
              style={{
                left: t.x,
                top: t.y,
                zIndex: 30,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  background: "radial-gradient(circle at 30% 30%, #ffd699, #d4a574, #8b6914)",
                  boxShadow:
                    "0 0 15px rgba(255,180,50,0.9), 0 0 30px rgba(255,120,40,0.6), 0 0 50px rgba(255,100,30,0.3)",
                  transform: `rotate(${t.rotation}deg) scale(${t.life})`,
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  top: -6,
                  left: -3,
                  background: "radial-gradient(circle, rgba(255,180,50,0.5), transparent)",
                  opacity: t.life * 0.6,
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: 5,
                  height: 5,
                  top: -10,
                  left: -2,
                  background: "radial-gradient(circle, rgba(255,200,100,0.3), transparent)",
                  opacity: t.life * 0.4,
                }}
              />
            </div>
          ))}
          {je && (
            <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
              <div
                className="rounded-full"
                style={{
                  width: 60,
                  height: 60,
                  border: "3px solid rgba(255,180,50,0.8)",
                  boxShadow: "0 0 30px rgba(255,180,50,0.6), inset 0 0 20px rgba(255,180,50,0.3)",
                  animation: "shockwaveExpand 0.5s ease-out forwards",
                }}
              />
            </div>
          )}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              zIndex: 10,
            }}
          >
            <div
              className="relative"
              style={{
                width: 90,
                height: 100,
                perspective: "250px",
              }}
            >
              <XtComponent shooting={T} />
              <FtComponent shooting={T} />
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 z-20"
                style={{
                  width: 52,
                  height: 20,
                  background: "linear-gradient(180deg, #7b4a2a, #4a2510)",
                  borderRadius: "26px 26px 4px 4px",
                  boxShadow:
                    "0 0 20px rgba(107,58,26,.6), 0 2px 8px rgba(0,0,0,.4), 0 4px 15px rgba(0,0,0,.3)",
                  transform: `translateZ(15px) ${T ? "rotate(-5deg) translateY(-2px)" : "rotate(0deg)"}`,
                  transition: "transform 0.2s ease",
                }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-5 w-8 h-8 rounded-t-lg"
                  style={{
                    background: "linear-gradient(180deg, #8b5a3a, #5a3010)",
                    boxShadow: "0 0 15px rgba(139,90,58,.5)",
                  }}
                />
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-1.5 w-14 h-2 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #2a2a3a, #1a1a2a)",
                  }}
                />
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3"
                  style={{
                    background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    boxShadow: "0 0 8px rgba(255,214,0,0.6)",
                  }}
                />
              </div>
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[14px] w-7 h-8 rounded-b-lg z-10"
                style={{
                  background: "linear-gradient(180deg, #f0d0a0, #d4a87a)",
                  boxShadow: "0 0 15px rgba(232,200,160,.5)",
                  transform: "translateZ(10px)",
                }}
              >
                <div className="flex justify-center gap-1.5 pt-2">
                  <div className="w-1 h-1 rounded-full bg-[#3a2a1a]" />
                  <div className="w-1 h-1 rounded-full bg-[#3a2a1a]" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[60%] w-6 h-1 rounded-full bg-[#3a2a1a] opacity-60" />
              </div>
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[26px] w-14 h-18 rounded-t-lg z-[5]"
                style={{
                  background: "linear-gradient(180deg, #7b3a2a, #4a2010)",
                  boxShadow: "0 0 25px rgba(123,58,42,.5), inset 0 0 15px rgba(0,0,0,.3)",
                  border: "1px solid rgba(180,80,40,.4)",
                  transform: "translateZ(8px)",
                  clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-1 rounded-full"
                  style={{
                    background: "rgba(255,200,100,.5)",
                  }}
                />
                <div
                  className="absolute top-5 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full"
                  style={{
                    background: "rgba(255,200,100,.4)",
                  }}
                />
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                    boxShadow: "0 0 10px rgba(255,214,0,0.5)",
                  }}
                />
              </div>
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[42px] w-11 h-2.5 rounded-full z-[6]"
                style={{
                  background: "linear-gradient(90deg, #6a3a1a, #3a2510)",
                  boxShadow: "0 0 10px rgba(106,58,26,.5)",
                }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-3.5 h-3.5 rounded-full -mt-0.5"
                  style={{
                    background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                    boxShadow: "0 0 15px rgba(255,214,0,.6), 0 0 25px rgba(255,107,53,.3)",
                    animation: "badgePulse 2s ease-in-out infinite",
                  }}
                />
              </div>
              <div
                className="absolute right-[4px] top-[28px] w-4 h-11 rounded-full origin-top z-[15]"
                style={{
                  background: "linear-gradient(180deg, #7b3a2a, #4a2010)",
                  transform: T ? "rotate(-55deg) translateZ(12px)" : "rotate(-15deg) translateZ(8px)",
                  transition: "transform 0.15s ease",
                  boxShadow: "0 0 10px rgba(123,58,42,.4)",
                }}
              >
                <div
                  className="absolute -top-1 -right-3.5 w-7 h-3.5 rounded-sm"
                  style={{
                    background: "linear-gradient(90deg, #6a6a7a, #3a3a4a)",
                    transform: T ? "rotate(-10deg) translateZ(14px)" : "rotate(0deg) translateZ(10px)",
                    transition: "transform 0.15s ease",
                    boxShadow: "0 0 15px rgba(90,90,106,.6)",
                  }}
                >
                  {T && (
                    <div
                      className="absolute -right-4 top-1/2 -translate-y-1/2"
                      style={{
                        width: 30,
                        height: 18,
                        background:
                          "radial-gradient(ellipse, rgba(255,255,220,1), rgba(255,180,50,.7), rgba(255,100,30,.4), transparent 70%)",
                        filter: "blur(6px)",
                        animation: "muzzleFlash 0.15s ease-out",
                      }}
                    />
                  )}
                </div>
              </div>
              <div
                className="absolute left-[4px] top-[28px] w-4 h-11 rounded-full origin-top z-[15]"
                style={{
                  background: "linear-gradient(180deg, #7b3a2a, #4a2010)",
                  transform: "rotate(15deg) translateZ(8px)",
                  boxShadow: "0 0 10px rgba(123,58,42,.4)",
                }}
              />
              <div
                className="absolute left-[26%] top-[62%] w-3.5 h-11 rounded-full origin-top z-[4]"
                style={{
                  background: "linear-gradient(180deg, #5a3018, #3a2010)",
                  transform: "rotate(-4deg) translateZ(4px)",
                  border: "1px solid rgba(120,60,30,.2)",
                }}
              />
              <div
                className="absolute right-[26%] top-[62%] w-3.5 h-11 rounded-full origin-top z-[4]"
                style={{
                  background: "linear-gradient(180deg, #5a3018, #3a2010)",
                  transform: "rotate(4deg) translateZ(4px)",
                  border: "1px solid rgba(120,60,30,.2)",
                }}
              />
              <div
                className="absolute left-[24%] top-[88%] w-5 h-3.5 rounded-sm z-[5]"
                style={{
                  background: "linear-gradient(180deg, #3a2010, #2a1508)",
                  boxShadow: "0 0 10px rgba(58,32,16,.5)",
                }}
              />
              <div
                className="absolute right-[24%] top-[88%] w-5 h-3.5 rounded-sm z-[5]"
                style={{
                  background: "linear-gradient(180deg, #3a2010, #2a1508)",
                  boxShadow: "0 0 10px rgba(58,32,16,.5)",
                }}
              />
            </div>
          </div>
          <div
            className="fixed bottom-4 right-4 z-50 pointer-events-none"
            style={{
              animation: "slingerFloat 2.5s ease-in-out infinite",
            }}
          >
            <CtComponent expression={expression} scale={1.2} />
          </div>
          {h && (
            <div
              className="absolute inset-0 pointer-events-none z-40"
              style={{
                background: "radial-gradient(circle, rgba(255,0,0,0.1), transparent 70%)",
                animation: "heatPulse 0.5s ease-in-out infinite",
              }}
            />
          )}
          <div
            className="absolute top-3 right-3 pointer-events-none z-[4] opacity-30"
            style={{
              animation: "windSpin 8s linear infinite",
            }}
          >
            <WindIcon
              size={24}
              style={{
                color: "#00d4ff",
                filter: "drop-shadow(0 0 5px rgba(0,212,255,0.5))",
              }}
            />
          </div>
        </div>
        <div className="max-w-md mx-auto mt-3 md:mt-4 px-2">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(60,30,10,.6), rgba(40,20,8,.5))",
              border: "2px solid rgba(255,180,50,.35)",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 0 40px rgba(255,180,50,.2), 0 20px 60px rgba(0,0,0,.3), inset 0 0 20px rgba(255,180,50,.05)",
            }}
          >
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,180,50,0), rgba(255,180,50), rgba(255,180,50,0))",
                backgroundSize: "200% 100%",
                animation: "borderRotate 3s linear infinite",
                zIndex: -1,
              }}
            />
            <input
              ref={VeRef}
              type="text"
              value={Ne}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder="Escribe la palabra... / 输入单词..."
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-transparent text-white font-bold text-center outline-none placeholder-white/30 uppercase text-sm md:text-base"
              autoFocus
              style={{
                textShadow: "0 0 12px rgba(255,255,255,.3)",
              }}
            />
          </div>
          <p className="text-center text-[10px] md:text-xs text-white/30 mt-2">
            Presiona Enter para disparar / 按回车射击
          </p>
        </div>
        {h && (
          <div className="text-center mt-2 md:mt-3">
            <p
              className="text-sm md:text-base font-black"
              style={{
                color: "#ff0000",
                textShadow: "0 0 15px rgba(255,0,0,.8), 0 0 30px rgba(255,0,0,.5)",
                animation: "heatPulse 0.4s ease-in-out infinite",
              }}
            >
              ¡REVÓLVER SOBRECALENTADO! Espera... / 手枪过热！等待...
            </p>
          </div>
        )}
        <div className="fixed top-20 right-4 pointer-events-none opacity-20 z-0 hidden md:block">
          <div
            className="w-24 h-32 rounded-sm border-2 border-[#8b7355] p-2"
            style={{
              background: "linear-gradient(180deg, #d4c4a0, #c4b490)",
              boxShadow: "0 4px 15px rgba(0,0,0,.3), 0 0 30px rgba(180,160,120,0.2)",
              transform: "rotate(5deg)",
            }}
          >
            <div className="text-[8px] text-[#5a3010] font-black text-center border-b border-[#5a3010] pb-1 mb-1">
              WANTED
            </div>
            <div className="w-12 h-12 mx-auto rounded-sm bg-[#8b7355] opacity-30 mb-1" />
            <div className="text-[6px] text-[#5a3010] text-center font-bold">DEAD OR ALIVE</div>
            <div className="text-[8px] text-[#5a3010] text-center font-black mt-1">$1000</div>
          </div>
        </div>
        <div className="fixed bottom-4 left-4 pointer-events-none opacity-20 z-0 hidden md:block">
          <LComponent
            style={{
              width: 50,
              height: 100,
              filter: "drop-shadow(0 0 10px rgba(57,255,20,0.3))",
            }}
          />
        </div>
        {x === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.88)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-2xl md:rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
                border: "2px solid rgba(255,107,53,.35)",
                boxShadow:
                  "0 0 80px rgba(255,107,53,.3), 0 0 120px rgba(255,180,50,.2), 0 0 160px rgba(255,107,53,.1)",
                transformStyle: "preserve-3d",
                perspective: "800px",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ff6b35,#ffd600)",
                  filter: "blur(25px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              {Array.from({
                length: 30,
              }).map((t, o) => (
                <div
                  key={o}
                  className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: ["#ff6b35", "#ffd600", "#00d4ff", "#39ff14", "#ff00aa", "#ffffff", "#ff3860"][
                      o % 7
                    ],
                    animation: `confettiFall ${2 + Math.random() * 3}s ease-in infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: 0.8,
                    boxShadow: `0 0 8px ${["#ff6b35", "#ffd600", "#00d4ff", "#39ff14", "#ff00aa", "#ffffff", "#ff3860"][o % 7]}`,
                  }}
                />
              ))}
              <div className="relative">
                <TrophyIcon
                  size={56}
                  className="mx-auto mb-4"
                  style={{
                    color: "#ffd600",
                    filter:
                      "drop-shadow(0 0 20px rgba(255,214,0,.6)) drop-shadow(0 0 40px rgba(255,214,0,.3))",
                    animation: "trophyBounce 2s ease-in-out infinite",
                  }}
                />
              </div>
              <h2
                className="text-2xl md:text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff6b35,#ffd600,#ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,107,53,.4))",
                }}
              >
                ¡Duelo Terminado!
              </h2>
              <p className="text-white/50 text-sm mb-4 md:mb-6">决斗结束！</p>
              <div className="grid grid-cols-2 gap-3 mb-4 md:mb-6">
                <div
                  className="p-3 rounded-xl gameover-card"
                  style={{
                    background: "rgba(255,107,53,.1)",
                    border: "1px solid rgba(255,107,53,.2)",
                    boxShadow: "0 0 15px rgba(255,107,53,0.1)",
                    transform: "translateZ(10px)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#ff6b35",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,107,53,0.5))",
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
                    className="text-lg font-black"
                    style={{
                      color: "#ff6b35",
                    }}
                  >
                    {ye}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl gameover-card"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 15px rgba(255,214,0,0.1)",
                    transform: "translateZ(10px)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <CrosshairIcon
                    size={16}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,214,0,0.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Combo Máx
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                    }}
                  >
                    {B}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl gameover-card"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.2)",
                    boxShadow: "0 0 15px rgba(0,212,255,0.1)",
                    transform: "translateZ(10px)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(0,212,255,0.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor Score
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#00d4ff",
                    }}
                  >
                    {Be}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl gameover-card"
                  style={{
                    background: "rgba(255,0,100,.1)",
                    border: "1px solid rgba(255,0,100,.2)",
                    boxShadow: "0 0 15px rgba(255,0,100,0.1)",
                    transform: "translateZ(10px)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <TimerIcon
                    size={16}
                    style={{
                      color: "#ff3860",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,56,96,0.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Tiempo
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff3860",
                    }}
                  >
                    {60 - me}s
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => ue(null)}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 text-sm md:text-base"
                  style={{
                    background: "linear-gradient(135deg,#ff6b35,#ffd600)",
                    boxShadow: "0 0 30px rgba(255,107,53,.4), 0 0 60px rgba(255,180,50,.2)",
                    animation: "neonPulseGlow 2s ease-in-out infinite",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setX("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,0.05)",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <P_1 currentGameId="word-slinger" />
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes signShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes flashFade { from{opacity:1} to{opacity:0} }
        @keyframes comboPop { 0%{transform:scale(0.3) rotateX(90deg);opacity:0} 40%{transform:scale(1.3) rotateX(0deg);opacity:1} 60%{transform:scale(1.1) rotateX(0deg);opacity:1} 100%{transform:scale(1.5) rotateX(0deg);opacity:0} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(120px) rotate(360deg);opacity:0} }
        @keyframes sunPulse { 0%,100%{transform:scale(1); opacity:1} 50%{transform:scale(1.15); opacity:0.85} }
        @keyframes muzzleFlash { 0%{opacity:1; transform:scale(1)} 50%{opacity:0.9; transform:scale(1.4)} 100%{opacity:0; transform:scale(0.5)} }
        @keyframes victoryGlow { from{opacity:.3} to{opacity:.7} }
        @keyframes slingerFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes orbitRing { 0%{transform:rotate(0deg) scale(1.1)} 50%{transform:rotate(180deg) scale(1.25)} 100%{transform:rotate(360deg) scale(1.1)} }
        @keyframes heatPulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes badgePulse { 0%,100%{box-shadow:0 0 15px rgba(255,214,0,0.5)} 50%{box-shadow:0 0 25px rgba(255,214,0,0.8)} }
        @keyframes screenShake { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-4px,2px)} 40%{transform:translate(4px,-2px)} 60%{transform:translate(-2px,1px)} 80%{transform:translate(2px,-1px)} }
        @keyframes floatUp { 0%{transform:translate(-50%,0)} 100%{transform:translate(-50%,-20px)} }
        @keyframes targetFloat3D { 0%,100%{transform:perspective(600px) rotateX(5deg) rotateY(var(--rotateY,0deg)) translateY(0) translateZ(15px)} 50%{transform:perspective(600px) rotateX(8deg) rotateY(var(--rotateY,0deg)) translateY(-8px) translateZ(25px)} }
        @keyframes cactusFloat3D { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-6px) translateZ(10px)} }
        @keyframes rockFlyArc { 0%{transform:translate3d(0,0,20px) scale(0.5); opacity:1} 50%{transform:translate3d(40px,-120px,40px) scale(1) rotate(180deg); opacity:1} 100%{transform:translate3d(80px,-200px,60px) scale(0.3) rotate(360deg); opacity:0} }
        @keyframes rockSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes trailFade { 0%{opacity:0.6; transform:scale(1)} 100%{opacity:0; transform:scale(0.3)} }
        @keyframes shockwaveExpand { 0%{transform:scale(0.5); opacity:1; border-width:4px} 100%{transform:scale(3); opacity:0; border-width:0} }
        @keyframes missRedFlash { 0%,100%{opacity:0} 20%{opacity:0.5} 40%{opacity:0.15} 60%{opacity:0.3} 80%{opacity:0} }
        @keyframes neonGridMove { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        @keyframes windSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes trophyBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.05)} }
        @keyframes neonPulseGlow { 0%,100%{box-shadow:0 0 30px rgba(255,107,53,.4), 0 0 60px rgba(255,180,50,.2)} 50%{box-shadow:0 0 45px rgba(255,107,53,.6), 0 0 80px rgba(255,180,50,.3)} }
        .gameover-card:hover { transform: perspective(600px) rotateX(5deg) rotateY(5deg) translateZ(20px) scale(1.05) !important; }
      `}</style>
    </StarfieldBackground>
  );
}
export { StComponent as default };
