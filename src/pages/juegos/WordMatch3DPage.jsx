import {
  BookOpenIcon,
  ZapIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  ArrowLeftIcon,
  Grid3x3Icon,
  LayersIcon,
  TimerIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, b, c as c_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function de(s) {
  const r = [...s];
  for (let l = r.length - 1; l > 0; l--) {
    const f = Math.floor(Math.random() * (l + 1));
    [r[l], r[f]] = [r[f], r[l]];
  }
  return r;
}
function Ze(s, r, l, f, b) {
  if (s === "gameover") {
    if (f === b) {
      return "excited";
    }
    if (r === 0) {
      return "sad";
    }
    return "happy";
  }
  if (l >= 3) {
    return "excited";
  }
  if (r <= 10) {
    return "sad";
  }
  if (l >= 1) {
    return "happy";
  }
  return "neutral";
}
function FeComponent({ expression }) {
  const r = {
    happy: (
      <>
        <path d="M28 42 Q34 38 40 42" stroke="#5a3e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M60 42 Q66 38 72 42" stroke="#5a3e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
    sad: (
      <>
        <path d="M28 46 Q34 42 40 46" stroke="#5a3e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M60 46 Q66 42 72 46" stroke="#5a3e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="34" cy="52" r="2.5" fill="#5a3e2b" opacity="0.6" />
        <circle cx="66" cy="52" r="2.5" fill="#5a3e2b" opacity="0.6" />
      </>
    ),
    excited: (
      <>
        <circle cx="34" cy="42" r="5" fill="#5a3e2b" />
        <circle cx="66" cy="42" r="5" fill="#5a3e2b" />
        <circle cx="36" cy="40" r="1.5" fill="white" />
        <circle cx="68" cy="40" r="1.5" fill="white" />
        <path d="M28 32 Q34 28 40 32" stroke="#5a3e2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M60 32 Q66 28 72 32" stroke="#5a3e2b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    ),
    neutral: (
      <>
        <circle cx="34" cy="44" r="4.5" fill="#5a3e2b" />
        <circle cx="66" cy="44" r="4.5" fill="#5a3e2b" />
        <circle cx="36" cy="42" r="1.5" fill="white" />
        <circle cx="68" cy="42" r="1.5" fill="white" />
      </>
    ),
  };
  const l = {
    happy: (
      <path d="M42 58 Q50 66 58 58" stroke="#5a3e2b" strokeWidth="3" fill="none" strokeLinecap="round" />
    ),
    sad: <path d="M42 62 Q50 56 58 62" stroke="#5a3e2b" strokeWidth="3" fill="none" strokeLinecap="round" />,
    excited: <ellipse cx="50" cy="60" rx="5" ry="6" fill="#5a3e2b" />,
    neutral: <line x1="44" y1="60" x2="56" y2="60" stroke="#5a3e2b" strokeWidth="3" strokeLinecap="round" />,
  };
  const f = {
    happy: (
      <>
        <circle cx="26" cy="50" r="5" fill="#ff6b9d" opacity="0.5" />
        <circle cx="74" cy="50" r="5" fill="#ff6b9d" opacity="0.5" />
      </>
    ),
    sad: (
      <>
        <circle cx="26" cy="50" r="5" fill="#6b8cff" opacity="0.4" />
        <circle cx="74" cy="50" r="5" fill="#6b8cff" opacity="0.4" />
      </>
    ),
    excited: (
      <>
        <circle cx="26" cy="50" r="6" fill="#ff6b9d" opacity="0.6" />
        <circle cx="74" cy="50" r="6" fill="#ff6b9d" opacity="0.6" />
      </>
    ),
    neutral: (
      <>
        <circle cx="26" cy="50" r="4" fill="#ff6b9d" opacity="0.3" />
        <circle cx="74" cy="50" r="4" fill="#ff6b9d" opacity="0.3" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd6e8" />
          <stop offset="100%" stopColor="#ffb3d1" />
        </linearGradient>
        <linearGradient id="earGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd6e8" />
          <stop offset="100%" stopColor="#ff9ec6" />
        </linearGradient>
      </defs>
      <ellipse cx="22" cy="18" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(-20 22 18)" />
      <ellipse cx="78" cy="18" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(20 78 18)" />
      <ellipse cx="22" cy="18" rx="5" ry="8" fill="#ff9ec6" opacity="0.6" transform="rotate(-20 22 18)" />
      <ellipse cx="78" cy="18" rx="5" ry="8" fill="#ff9ec6" opacity="0.6" transform="rotate(20 78 18)" />
      <ellipse cx="50" cy="55" rx="38" ry="32" fill="url(#bodyGrad)" />
      {f[expression]}
      {r[expression]}
      {l[expression]}
      <g className="animate-pulse">
        <text x="10" y="20" fontSize="12" fill="#ffd600">
          ✨
        </text>
        <text x="82" y="85" fontSize="10" fill="#00d4ff">
          ✨
        </text>
      </g>
    </svg>
  );
}
function WeComponent({ expression }) {
  const fill = {
    happy: "#39ff14",
    sad: "#6b8cff",
    excited: "#ffd600",
    neutral: "#00d4ff",
  }[expression];
  const f =
    expression === "excited" ? (
      <>
        <polygon points="38,32 42,36 38,40 34,36" fill="white" />
        <polygon points="38,34 40,36 38,38 36,36" fill="#1a1a2e" />
      </>
    ) : expression === "sad" ? (
      <>
        <circle cx="38" cy="38" r="3" fill="white" />
        <circle cx="38" cy="39" r="1.5" fill="#1a1a2e" />
        <path d="M34 42 Q38 40 42 42" stroke="white" strokeWidth="1" fill="none" />
      </>
    ) : (
      <>
        <circle cx="38" cy="36" r="3" fill="white" />
        <circle cx="38" cy="36" r="1.5" fill="#1a1a2e" />
      </>
    );
  const b =
    expression === "excited" ? (
      <>
        <polygon points="62,32 66,36 62,40 58,36" fill="white" />
        <polygon points="62,34 64,36 62,38 60,36" fill="#1a1a2e" />
      </>
    ) : expression === "sad" ? (
      <>
        <circle cx="62" cy="38" r="3" fill="white" />
        <circle cx="62" cy="39" r="1.5" fill="#1a1a2e" />
        <path d="M58 42 Q62 40 66 42" stroke="white" strokeWidth="1" fill="none" />
      </>
    ) : (
      <>
        <circle cx="62" cy="36" r="3" fill="white" />
        <circle cx="62" cy="36" r="1.5" fill="#1a1a2e" />
      </>
    );
  const p =
    expression === "happy" ? (
      <path d="M44 50 Q50 56 56 50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    ) : expression === "sad" ? (
      <path d="M44 54 Q50 48 56 54" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    ) : expression === "excited" ? (
      <ellipse cx="50" cy="52" rx="4" ry="5" fill="white" />
    ) : (
      <line x1="46" y1="52" x2="54" y2="52" stroke="white" strokeWidth="2" strokeLinecap="round" />
    );
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="wizBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.35)" />
          <stop offset="50%" stopColor="rgba(255,0,170,0.25)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0.35)" />
        </linearGradient>
        <linearGradient id="wizHat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        <filter id="wizGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse
        cx="50"
        cy="70"
        rx="30"
        ry="25"
        fill={fill}
        opacity="0.2"
        filter="url(#wizGlow)"
        className="animate-pulse"
      />
      <polygon
        points="50,20 70,55 60,85 40,85 30,55"
        fill="url(#wizBody)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
      <polygon points="50,20 70,55 50,70 30,55" fill="rgba(255,255,255,0.1)" />
      <polygon points="50,70 70,55 60,85 50,85" fill="rgba(0,212,255,0.15)" />
      <polygon
        points="50,5 65,28 35,28"
        fill="url(#wizHat)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
      />
      <rect x="32" y="26" width="36" height="4" rx="2" fill="#ffd600" />
      {f}
      {b}
      {p}
      <text x="5" y="20" fontSize="12" fill="#ffd600" className="animate-pulse">
        ✨
      </text>
      <text x="78" y="75" fontSize="10" fill="#00d4ff" className="animate-pulse">
        ✨
      </text>
      <text x="82" y="25" fontSize="8" fill="#39ff14" className="animate-pulse">
        ✦
      </text>
    </svg>
  );
}
function Ce1Component() {
  const s = [];
  for (let id = 0; id < 30; id++) {
    s.push({
      id,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    });
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {s.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full bg-white animate-float-star"
          style={{
            left: `${r.left}%`,
            top: `${r.top}%`,
            width: r.size,
            height: r.size,
            opacity: 0.3,
            animationDelay: `${r.delay}s`,
            animationDuration: `${r.duration}s`,
            boxShadow: `0 0 ${r.size * 2}px rgba(255,255,255,0.5)`,
          }}
        />
      ))}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20 animate-nebula-pulse"
        style={{
          top: "10%",
          left: "10%",
          background: "radial-gradient(circle, rgba(255,0,170,0.3), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-20 animate-nebula-pulse"
        style={{
          bottom: "20%",
          right: "15%",
          background: "radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%)",
          filter: "blur(50px)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full opacity-15 animate-nebula-pulse"
        style={{
          top: "40%",
          right: "30%",
          background: "radial-gradient(circle, rgba(255,214,0,0.2), transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}
function ReComponent({ timeLeft, maxTime }) {
  const l = Math.max(0, (timeLeft / maxTime) * 100);
  const f = timeLeft <= 15;
  const b = timeLeft <= 10;
  let background = "linear-gradient(90deg, #39ff14, #00d4ff)";
  if (f) {
    background = "linear-gradient(90deg, #ffd600, #ff7700)";
  }
  if (b) {
    background = "linear-gradient(90deg, #ff4444, #ff6b35)";
  }
  return (
    <div
      className="w-full max-w-md mx-auto mb-4"
      style={{
        perspective: "600px",
      }}
    >
      <div
        className="relative h-3 rounded-full overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 10px rgba(0,212,255,0.1)",
          transform: "translateZ(10px)",
        }}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
          style={{
            width: `${l}%`,
            background,
            boxShadow: b
              ? "0 0 15px rgba(255,68,68,0.6), 0 0 30px rgba(255,68,68,0.3)"
              : f
                ? "0 0 15px rgba(255,214,0,0.5), 0 0 30px rgba(255,214,0,0.2)"
                : "0 0 15px rgba(57,255,20,0.4), 0 0 30px rgba(0,212,255,0.2)",
          }}
        />
        {b && (
          <div
            className="absolute top-0 left-0 h-full rounded-full animate-timer-pulse"
            style={{
              width: `${l}%`,
              background: "rgba(255,68,68,0.3)",
            }}
          />
        )}
      </div>
      <div
        className="flex justify-between mt-1 text-xs font-bold"
        style={{
          color: b ? "#ff6b35" : f ? "#ffd600" : "#00d4ff",
        }}
      >
        <span>{`${timeLeft}s`}</span>
        <span>{`${maxTime}s`}</span>
      </div>
    </div>
  );
}
function TeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [p, setP] = React.useState("select");
  const [c, setC] = React.useState([]);
  const [h, setH] = React.useState(60);
  const [A, setA] = React.useState(0);
  const [B, setB] = React.useState(0);
  const [xe, setXe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordmatch3d_best") || "0");
    } catch {
      return 0;
    }
  });
  const [G, setG] = React.useState([]);
  const [X, setX] = React.useState([]);
  const [fe, setFe] = React.useState([]);
  const [pe, setPe] = React.useState(false);
  const [H, setH_1] = React.useState(0);
  const PRef = React.useRef(null);
  const me = g();
  const [J, setJ] = React.useState("");
  const FRef = React.useRef(null);
  const wRef = React.useRef(false);
  const MRef = React.useRef(0);
  const yRef = React.useRef(0);
  const geRef = React.useRef(0);
  const _ = React.useCallback((a) => {
    let n = a ? b(a) : c_1();
    if (n.length === 0) {
      setJ('Este módulo no tiene vocabulario válido. Prueba con otro o selecciona "Todos los módulos".');
      return;
    }
    const t = de(n.filter((i) => i.espanol && i.chino).slice(0, 8));
    const u = [];
    let d = 0;
    t.forEach((i, pairId) => {
      u.push({
        id: d++,
        text: i.espanol,
        lang: "es",
        pairId,
        flipped: false,
        matched: false,
        shaking: false,
      });
      u.push({
        id: d++,
        text: i.chino,
        lang: "zh",
        pairId,
        flipped: false,
        matched: false,
        shaking: false,
      });
    });
    setC(de(u));
    geRef.current = t.length;
    setH(60);
    setA(0);
    setB(0);
    setH_1(0);
    MRef.current = 0;
    yRef.current = 0;
    setFe([]);
    setG([]);
    setX([]);
    wRef.current = false;
    setP("playing");
  }, []);
  React.useEffect(() => {
    if (p === "playing") {
      PRef.current = setInterval(() => {
        setH((a) => {
          if (a <= 1) {
            return (
              setP("gameover"),
              setXe((n) => {
                const t = Math.max(n, MRef.current);
                localStorage.setItem("wordmatch3d_best", String(t));
                return t;
              }),
              0
            );
          }
          return a - 1;
        });
      }, 1000);
      return () => {
        if (PRef.current) {
          clearInterval(PRef.current);
        }
      };
    }
  }, [p]);
  React.useEffect(() => {
    if (c.length > 0 && c.every((a) => a.matched)) {
      setP("gameover");
      setXe((a) => {
        const n = Math.max(a, MRef.current);
        localStorage.setItem("wordmatch3d_best", String(n));
        return n;
      });
    }
  }, [c]);
  React.useEffect(() => {
    if (p === "gameover") {
      if (c.every((n) => n.matched)) {
        playWin();
        const n = [];
        const t = [
          "#ffd600",
          "#ffaa00",
          "#ffffff",
          "#00d4ff",
          "#ff00aa",
          "#39ff14",
          "#c0a0ff",
          "#a0ffe0",
          "#ff6b9d",
          "#ffb3d1",
        ];
        for (let u = 0; u < 150; u++) {
          n.push({
            id: Date.now() + u,
            x: 50 + (Math.random() - 0.5) * 40,
            y: 40 + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 15 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 20,
            color: t[Math.floor(Math.random() * t.length)],
            size: 4 + Math.random() * 8,
            life: 1,
          });
        }
        setX(n);
      } else {
        playLose();
      }
    }
  }, [p]);
  React.useEffect(() => {
    if (G.length === 0) {
      return;
    }
    const a = setInterval(() => {
      setG((n) =>
        n
          .map((t) => ({
            ...t,
            x: t.x + t.vx,
            y: t.y + t.vy,
            vy: t.vy + 0.15,
            life: t.life - 0.025,
          }))
          .filter((t) => t.life > 0),
      );
    }, 30);
    return () => clearInterval(a);
  }, [G.length]);
  React.useEffect(() => {
    if (X.length === 0) {
      return;
    }
    const a = setInterval(() => {
      setX((n) =>
        n
          .map((t) => ({
            ...t,
            x: t.x + t.vx,
            y: t.y + t.vy,
            vy: t.vy + 0.25,
            rotation: t.rotation + t.rotationSpeed,
            life: t.life - 0.008,
          }))
          .filter((t) => t.life > 0),
      );
    }, 30);
    return () => clearInterval(a);
  }, [X.length]);
  const be = (a) => {
    if (wRef.current) {
      return;
    }
    const n = c.find((d) => d.id === a);
    if (!n || n.flipped || n.matched) {
      return;
    }
    playClick();
    const t = [...fe, a];
    setFe(t);
    setC((d) =>
      d.map((i) => {
        if (i.id === a) {
          return {
            ...i,
            flipped: true,
          };
        }
        return i;
      }),
    );
    const u = document.getElementById(`card-${a}`);
    if (u && FRef.current) {
      const d = u.getBoundingClientRect();
      const i = FRef.current.getBoundingClientRect();
      const k = d.left + d.width / 2 - i.left;
      const W = d.top + d.height / 2 - i.top;
      const g = [];
      const x = ["#00d4ff", "#ff00aa", "#ffffff", "#ffd600", "#39ff14"];
      const j = ["circle", "star", "square"];
      for (let m = 0; m < 15; m++) {
        const C = Math.random() * Math.PI * 2;
        const v = 1 + Math.random() * 4;
        g.push({
          id: Date.now() + Math.random() + m,
          x: k,
          y: W,
          vx: Math.cos(C) * v,
          vy: Math.sin(C) * v - 2,
          life: 1,
          color: x[Math.floor(Math.random() * x.length)],
          size: 2 + Math.random() * 4,
          type: j[Math.floor(Math.random() * j.length)],
        });
      }
      setG((m) => [...m, ...g]);
    }
    if (t.length === 2) {
      wRef.current = true;
      const [d, i] = t;
      const k = c.find((g) => g.id === d) || n;
      const W = c.find((g) => g.id === i);
      if (!W) {
        wRef.current = false;
        setFe([]);
        return;
      }
      if (k.pairId === W.pairId) {
        yRef.current += 1;
        setB(yRef.current);
        if (yRef.current >= 2) {
          setH_1(yRef.current);
          setTimeout(() => setH_1(0), 1500);
        }
        const g = 200 + yRef.current * 50;
        MRef.current += g;
        setA(MRef.current);
        setPe(true);
        setTimeout(() => setPe(false), 600);
        const x = FRef.current;
        if (x) {
          const j = x.getBoundingClientRect();
          const m = document.getElementById(`card-${d}`);
          const C = document.getElementById(`card-${i}`);
          if (m && C) {
            const v = m.getBoundingClientRect();
            const R = C.getBoundingClientRect();
            const ye = (v.left + v.width / 2 + R.left + R.width / 2) / 2 - j.left;
            const je = (v.top + v.height / 2 + R.top + R.height / 2) / 2 - j.top;
            const K = [];
            const U = [
              "#ffd600",
              "#ffaa00",
              "#ff7700",
              "#ffffff",
              "#ff00aa",
              "#00d4ff",
              "#39ff14",
              "#ff6b9d",
              "#c0a0ff",
              "#a0ffe0",
            ];
            for (let Y = 0; Y < 40; Y++) {
              const $ = Math.random() * Math.PI * 2;
              const ee = 1 + Math.random() * 6;
              const ae = ["circle", "star", "square"];
              K.push({
                id: Date.now() + Math.random() + Y,
                x: ye,
                y: je,
                vx: Math.cos($) * ee,
                vy: Math.sin($) * ee - 3,
                life: 1,
                color: U[Math.floor(Math.random() * U.length)],
                size: 3 + Math.random() * 6,
                type: ae[Math.floor(Math.random() * ae.length)],
              });
            }
            setG((Y) => [...Y, ...K]);
          }
        }
        setTimeout(() => {
          setC((j) =>
            j.map((m) => {
              if (m.id === d || m.id === i) {
                return {
                  ...m,
                  matched: true,
                };
              }
              return m;
            }),
          );
          playCorrect();
          setFe([]);
          wRef.current = false;
        }, 600);
      } else {
        yRef.current = 0;
        setB(0);
        playWrong();
        setC((g) =>
          g.map((x) => {
            if (x.id === d || x.id === i) {
              return {
                ...x,
                shaking: true,
              };
            }
            return x;
          }),
        );
        setTimeout(() => {
          setC((g) =>
            g.map((x) => {
              if (x.id === d || x.id === i) {
                return {
                  ...x,
                  flipped: false,
                  shaking: false,
                };
              }
              return x;
            }),
          );
          setFe([]);
          wRef.current = false;
        }, 800);
      }
    }
  };
  const expression = Ze(p, h, B, c.filter((a) => a.matched).length, c.length);
  const length = c.filter((a) => a.matched).length;
  if (p === "select") {
    return (
      <StarfieldBackground>
        <Ce1Component />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
          <SoundToggles />
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
          </div>
          <div className="text-center mb-12">
            <div className="inline-block animate-float-3d mb-4">
              <div
                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #00d4ff)",
                  boxShadow:
                    "0 0 40px rgba(255,0,170,.4), 0 0 80px rgba(0,212,255,.2), 0 0 120px rgba(255,0,170,.1)",
                  transform: "translateZ(30px)",
                }}
              >
                <Grid3x3Icon size={40} className="text-white drop-shadow-lg" />
              </div>
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3 animate-title-glow"
              style={{
                textShadow: "0 0 40px rgba(255,0,170,0.5), 0 0 80px rgba(0,212,255,0.3)",
              }}
            >
              Word Match 3D
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Encuentra las parejas español↔chino / 找到西班牙语和中文配对
            </p>
            {J && (
              <div
                className="mt-6 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-pulse"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,.2)",
                }}
              >
                {J}
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
                setJ("");
                _(null);
              }}
              className="group rounded-2xl p-6 text-left transition-all relative overflow-hidden module-card-3d"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.4)",
                boxShadow: "0 0 20px rgba(255,0,170,.1)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,.1), rgba(0,212,255,.1))",
                }}
              />
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative z-10"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 20px rgba(255,0,170,.3)",
                  transform: "translateZ(15px)",
                }}
              >
                <LayersIcon size={28} className="text-white drop-shadow-lg" />
              </div>
              <h3
                className="text-white font-black text-lg mb-1 relative z-10"
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1 relative z-10"
                style={{
                  color: "rgba(255,0,170,.8)",
                  transform: "translateZ(8px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40 relative z-10"
                style={{
                  transform: "translateZ(5px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
            </button>
            {me.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setJ("");
                  _(a.id);
                }}
                className="group rounded-2xl p-6 text-left transition-all relative overflow-hidden module-card-3d"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${a.color}60`,
                  boxShadow: `0 0 20px ${a.color}15`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}15, transparent)`,
                  }}
                />
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
                    boxShadow: `0 0 20px ${a.color}40`,
                    transform: "translateZ(15px)",
                  }}
                >
                  <BookOpenIcon size={28} className="text-white drop-shadow-lg" />
                </div>
                <h3
                  className="text-white font-black text-lg mb-1 relative z-10"
                  style={{
                    transform: "translateZ(10px)",
                  }}
                >
                  {a.titulo}
                </h3>
                <p
                  className="text-xs font-medium mb-1 relative z-10"
                  style={{
                    color: `${a.color}cc`,
                    transform: "translateZ(8px)",
                  }}
                >
                  {a.tituloChino}
                </p>
                <p
                  className="text-xs font-medium text-white/40 relative z-10"
                  style={{
                    transform: "translateZ(5px)",
                  }}
                >
                  {a.vocabularioCount} palabras / 词
                </p>
              </button>
            ))}
          </div>
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none w-24 h-24 md:w-32 md:h-32 animate-float-slow">
            <FeComponent expression="neutral" />
          </div>
        </div>
        <style>{`
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
          @keyframes gradient-rotate { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          .animate-gradient-rotate { animation: gradient-rotate 3s ease infinite; background-size: 300% 300%; }
          @keyframes float-star { 0%,100%{transform:translateY(0) scale(1);opacity:0.3} 50%{transform:translateY(-20px) scale(1.2);opacity:0.8} }
          .animate-float-star { animation: float-star 4s ease-in-out infinite; }
          @keyframes nebula-pulse { 0%,100%{transform:scale(1);opacity:0.2} 50%{transform:scale(1.3);opacity:0.4} }
          .animate-nebula-pulse { animation: nebula-pulse 6s ease-in-out infinite; }
          @keyframes float-3d { 0%,100%{transform:translateY(0) translateZ(20px) rotateX(0)} 50%{transform:translateY(-12px) translateZ(30px) rotateX(2deg)} }
          .animate-float-3d { animation: float-3d 3s ease-in-out infinite; transform-style: preserve-3d; }
          @keyframes title-glow { 0%,100%{filter:drop-shadow(0 0 20px rgba(255,0,170,0.5)) drop-shadow(0 0 40px rgba(0,212,255,0.3))} 50%{filter:drop-shadow(0 0 40px rgba(255,0,170,0.8)) drop-shadow(0 0 80px rgba(0,212,255,0.5))} }
          .animate-title-glow { animation: title-glow 3s ease-in-out infinite; }
          .module-card-3d { transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .module-card-3d:hover { transform: rotateX(-5deg) rotateY(5deg) translateZ(20px); }
        `}</style>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <Ce1Component />
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 min-h-screen relative z-10">
        <div
          className="flex items-center justify-between mb-4 flex-wrap gap-2"
          style={{
            perspective: "800px",
          }}
        >
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            style={{
              transform: "translateZ(5px)",
            }}
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div
            className="flex items-center gap-2 flex-wrap"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <button
              onClick={() => setP("select")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,.2)]"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                transform: "translateZ(10px)",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all animate-neon-breathe"
              style={{
                background: h <= 10 ? "rgba(255,68,68,.2)" : "rgba(255,0,170,.1)",
                border: h <= 10 ? "1px solid rgba(255,68,68,.4)" : "1px solid rgba(255,0,170,.2)",
                color: h <= 10 ? "#ff6b35" : "#ff00aa",
                boxShadow: h <= 10 ? "0 0 15px rgba(255,68,68,.3)" : "none",
                transform: "translateZ(10px)",
              }}
            >
              <TimerIcon size={12} className={h <= 10 ? "animate-pulse" : ""} /> {h}s
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 animate-neon-breathe"
              style={{
                background: "rgba(0,212,255,.1)",
                border: "1px solid rgba(0,212,255,.2)",
                color: "#00d4ff",
                boxShadow: "0 0 10px rgba(0,212,255,.15)",
                transform: "translateZ(10px)",
              }}
            >
              <ZapIcon size={12} className="animate-pulse" /> {A}
            </div>
          </div>
        </div>
        <div
          className="text-center mb-4"
          style={{
            perspective: "600px",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black mb-2 animate-title-glow"
            style={{
              background: "linear-gradient(135deg,#ff00aa,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,0,170,.5))",
              transform: "translateZ(15px)",
            }}
          >
            Word Match 3D
          </h1>
          <p
            className="text-white/40 text-xs font-medium"
            style={{
              transform: "translateZ(5px)",
            }}
          >
            Haz clic en las tarjetas para voltearlas / 点击卡片翻转
          </p>
        </div>
        <ReComponent timeLeft={h} maxTime={60} />
        <div
          className="flex justify-center gap-3 mb-4 flex-wrap"
          style={{
            perspective: "600px",
          }}
        >
          <div
            className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse"
            style={{
              background: "rgba(255,0,170,.15)",
              border: "1px solid rgba(255,0,170,.3)",
              color: "#ff00aa",
              boxShadow: "0 0 15px rgba(255,0,170,.2)",
              transform: "translateZ(10px)",
            }}
          >
            <SparklesIcon size={12} /> Racha: {B}
          </div>
          <div
            className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(0,212,255,.15)",
              border: "1px solid rgba(0,212,255,.3)",
              color: "#00d4ff",
              boxShadow: "0 0 15px rgba(0,212,255,.2)",
              transform: "translateZ(10px)",
            }}
          >
            <StarIcon size={12} /> Parejas: {length / 2} / {c.length / 2}
          </div>
        </div>
        {H > 0 && (
          <div className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center">
            <div className="combo-popup-3d text-center">
              <div
                className="text-5xl md:text-7xl font-black"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    "drop-shadow(0 0 20px rgba(255,214,0,0.8)) drop-shadow(0 0 40px rgba(255,0,170,0.5))",
                }}
              >{`x${H}`}</div>
              <div
                className="text-xl md:text-2xl font-black mt-2"
                style={{
                  color: "#ffd600",
                  textShadow: "0 0 20px rgba(255,214,0,0.8), 0 0 40px rgba(255,0,170,0.5)",
                }}
              >
                ¡COMBO!
              </div>
            </div>
          </div>
        )}
        <div
          ref={FRef}
          className="relative mx-auto"
          style={{
            maxWidth: "640px",
            perspective: "1400px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute -inset-[3px] rounded-3xl z-0 animate-gradient-rotate"
            style={{
              background: "linear-gradient(90deg, #ff00aa, #00d4ff, #ffd600, #39ff14, #ff00aa)",
              backgroundSize: "400% 400%",
              borderRadius: "24px",
            }}
          />
          <div
            className="absolute -inset-[3px] rounded-3xl z-0 animate-gradient-rotate"
            style={{
              background: "linear-gradient(90deg, #ff00aa, #00d4ff, #ffd600, #39ff14, #ff00aa)",
              backgroundSize: "400% 400%",
              filter: "blur(15px)",
              opacity: 0.6,
              borderRadius: "24px",
              animationDirection: "reverse",
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl z-0 opacity-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,0,170,.2), rgba(0,212,255,.2), rgba(255,214,0,.1))",
              filter: "blur(40px)",
              transform: "scale(1.05)",
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl z-0 opacity-20 animate-pulse"
            style={{
              background: "linear-gradient(135deg, rgba(255,0,170,.15), rgba(0,212,255,.15))",
              filter: "blur(60px)",
              transform: "scale(1.1)",
            }}
          />
          <div
            className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-3xl"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.5),rgba(5,8,27,.4))",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 40px rgba(255,0,170,.1), inset 0 0 40px rgba(0,212,255,.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              transformStyle: "preserve-3d",
            }}
          >
            {c.map((a) => (
              <div
                key={a.id}
                id={`card-${a.id}`}
                className={`relative cursor-pointer group ${a.matched ? "matched-float" : ""}`}
                style={{
                  perspective: "800px",
                  height: "clamp(90px, 18vw, 120px)",
                  transformStyle: "preserve-3d",
                }}
                onClick={() => be(a.id)}
              >
                <div
                  className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-gradient-rotate"
                  style={{
                    background: "linear-gradient(90deg, #ff00aa, #00d4ff, #ffd600, #ff00aa)",
                    backgroundSize: "300% 300%",
                    zIndex: 1,
                    borderRadius: "18px",
                  }}
                />
                <div
                  className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-gradient-rotate"
                  style={{
                    background: "linear-gradient(90deg, #ff00aa, #00d4ff, #ffd600, #ff00aa)",
                    backgroundSize: "300% 300%",
                    filter: "blur(8px)",
                    opacity: 0,
                    zIndex: 1,
                    borderRadius: "18px",
                  }}
                />
                <div
                  className="card-3d-hover absolute inset-0"
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: 2,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl transition-all duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: a.flipped || a.matched ? "rotateY(180deg)" : "rotateY(0deg)",
                      animation: a.shaking
                        ? "cardShakeGlow 0.5s ease-in-out"
                        : a.matched
                          ? "matchBurst 0.6s ease-out"
                          : "none",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl flex items-center justify-center backface-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        background:
                          "linear-gradient(135deg, rgba(255,0,170,.25), rgba(0,212,255,.25), rgba(255,214,0,.1))",
                        border: "1px solid rgba(255,255,255,.25)",
                        boxShadow:
                          "0 0 25px rgba(255,0,170,.2), inset 0 0 30px rgba(255,255,255,.05), 0 8px 16px rgba(0,0,0,.3)",
                        backdropFilter: "blur(8px)",
                        transform: "translateZ(4px)",
                      }}
                    >
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center animate-pulse"
                        style={{
                          background: "linear-gradient(135deg, #ff00aa, #00d4ff)",
                          boxShadow: "0 0 20px rgba(255,0,170,.4), inset 0 0 10px rgba(255,255,255,.2)",
                        }}
                      >
                        <SparklesIcon size={20} className="text-white drop-shadow-lg" />
                      </div>
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,.2), transparent 40%, rgba(0,0,0,.2) 100%)",
                        }}
                      />
                      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20" />
                      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="shine-sweep absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-2xl flex items-center justify-center p-2 sm:p-3 backface-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translateZ(4px)",
                        background: a.matched
                          ? "linear-gradient(135deg, rgba(57,255,20,.3), rgba(0,212,255,.3))"
                          : "linear-gradient(135deg, rgba(255,214,0,.25), rgba(255,0,170,.25))",
                        border: a.matched ? "1px solid rgba(57,255,20,.6)" : "1px solid rgba(255,214,0,.5)",
                        boxShadow: a.matched
                          ? "0 0 30px rgba(57,255,20,.4), inset 0 0 20px rgba(57,255,20,.1)"
                          : "0 0 30px rgba(255,214,0,.3), inset 0 0 20px rgba(255,214,0,.1)",
                        opacity: a.matched ? 0 : 1,
                        transition: "opacity 0.5s ease-out 0.2s",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <p className="text-white font-black text-xs sm:text-sm text-center leading-tight drop-shadow-[0_0_8px_rgba(255,255,255,.5)]">
                        {a.text}
                      </p>
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,.4), transparent 45%, rgba(255,255,255,.05) 100%)",
                        }}
                      />
                      <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20" />
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/60 animate-ping" />
                      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="shine-sweep-reverse absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {a.matched && (
                  <>
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        zIndex: 3,
                        boxShadow: "0 0 30px rgba(57,255,20,.8), inset 0 0 20px rgba(57,255,20,.3)",
                        border: "1px solid rgba(57,255,20,.5)",
                        animation: "glowPulseGreen 1.5s ease-in-out infinite, matchBurst 0.6s ease-out",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        zIndex: 3,
                        boxShadow: "0 0 60px rgba(57,255,20,.4)",
                        animation: "glowPulseGreen 2s ease-in-out infinite",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        zIndex: 3,
                        border: "2px solid rgba(57,255,20,0.8)",
                        boxShadow: "0 0 40px rgba(57,255,20,1), 0 0 80px rgba(57,255,20,0.5)",
                        animation: "matchedFloat 2s ease-in-out infinite",
                      }}
                    />
                  </>
                )}
                {a.shaking && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      zIndex: 3,
                      border: "1px solid rgba(255,68,68,0.6)",
                      boxShadow: "0 0 20px rgba(255,68,68,0.6)",
                      animation: "glowPulseRed 0.4s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {G.map((a) => (
            <div
              key={a.id}
              className="absolute pointer-events-none"
              style={{
                left: a.x,
                top: a.y,
                width: a.size,
                height: a.size,
                background: a.type === "star" ? "transparent" : a.color,
                borderRadius: a.type === "square" ? "2px" : "50%",
                boxShadow: `0 0 ${a.size * 3}px ${a.color}, 0 0 ${a.size * 6}px ${a.color}80`,
                opacity: a.life,
                zIndex: 9999,
                transform: `rotate(${a.life * 360}deg)`,
              }}
            >
              {a.type === "star" && (
                <svg viewBox="0 0 10 10" className="w-full h-full" fill={a.color}>
                  <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <div
          className={`fixed bottom-4 right-4 z-50 pointer-events-none w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 transition-transform duration-300 ${pe ? "scale-125" : "scale-100"}`}
        >
          <div className="animate-float-slow">
            <WeComponent expression={expression} />
          </div>
        </div>
        {p === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.88)",
              backdropFilter: "blur(20px)",
            }}
          >
            {c.every((a) => a.matched) && (
              <div
                className="fixed inset-0 pointer-events-none animate-victory-flash"
                style={{
                  background: "radial-gradient(circle, rgba(255,214,0,0.3), transparent 70%)",
                  zIndex: 101,
                }}
              />
            )}
            {X.map((a) => (
              <div
                key={a.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${a.x}%`,
                  top: `${a.y}%`,
                  width: a.size,
                  height: a.size * 0.6,
                  background: a.color,
                  borderRadius: "1px",
                  opacity: a.life,
                  transform: `rotate(${a.rotation}deg)`,
                  boxShadow: `0 0 ${a.size}px ${a.color}80`,
                  zIndex: 9999,
                }}
              />
            ))}
            <div
              className="text-center p-6 sm:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-float"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
                border: "1px solid rgba(255,0,170,.3)",
                boxShadow: "0 0 60px rgba(255,0,170,.2), 0 0 120px rgba(0,212,255,.1)",
                perspective: "800px",
              }}
            >
              <div
                className="absolute -inset-[3px] rounded-[26px] -z-10 opacity-80 animate-gradient-rotate"
                style={{
                  background: "linear-gradient(90deg, #ff00aa, #ffd600, #00d4ff, #ff00aa)",
                  backgroundSize: "400% 400%",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="absolute -inset-[3px] rounded-[26px] -z-10 opacity-40 animate-gradient-rotate"
                style={{
                  background: "linear-gradient(90deg, #ff00aa, #ffd600, #00d4ff, #ff00aa)",
                  backgroundSize: "400% 400%",
                  animationDirection: "reverse",
                }}
              />
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 animate-bounce"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff7700)",
                  boxShadow: "0 0 30px rgba(255,214,0,.5)",
                  transform: "translateZ(20px)",
                }}
              >
                <TrophyIcon size={40} className="text-white drop-shadow-lg" />
              </div>
              <h2
                className="text-3xl sm:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff00aa,#ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(255,0,170,.3))",
                }}
              >
                {c.every((a) => a.matched) ? "¡Victoria!" : "¡Partida Finalizada!"}
              </h2>
              <p className="text-white/50 text-sm mb-6">
                {c.every((a) => a.matched) ? "游戏通关！" : "游戏结束！"}
              </p>
              <div
                className="grid grid-cols-2 gap-3 mb-6"
                style={{
                  perspective: "600px",
                }}
              >
                <div
                  className="stat-card-3d p-3 rounded-xl"
                  style={{
                    background: "rgba(255,0,170,.15)",
                    border: "1px solid rgba(255,0,170,.25)",
                    boxShadow: "0 0 15px rgba(255,0,170,.1)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,0,170,.5))",
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
                      color: "#ff00aa",
                    }}
                  >
                    {A}
                  </p>
                </div>
                <div
                  className="stat-card-3d p-3 rounded-xl"
                  style={{
                    background: "rgba(255,214,0,.15)",
                    border: "1px solid rgba(255,214,0,.25)",
                    boxShadow: "0 0 15px rgba(255,214,0,.1)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <SparklesIcon
                    size={16}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,214,0,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor Racha
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
                  className="stat-card-3d p-3 rounded-xl"
                  style={{
                    background: "rgba(0,212,255,.15)",
                    border: "1px solid rgba(0,212,255,.25)",
                    boxShadow: "0 0 15px rgba(0,212,255,.1)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(0,212,255,.5))",
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
                    {xe}
                  </p>
                </div>
                <div
                  className="stat-card-3d p-3 rounded-xl"
                  style={{
                    background: "rgba(57,255,20,.15)",
                    border: "1px solid rgba(57,255,20,.25)",
                    boxShadow: "0 0 15px rgba(57,255,20,.1)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <TimerIcon
                    size={16}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(57,255,20,.5))",
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
                      color: "#39ff14",
                    }}
                  >
                    {60 - h}s
                  </p>
                </div>
              </div>
              <div
                className="flex gap-3 justify-center flex-wrap"
                style={{
                  perspective: "400px",
                }}
              >
                <button
                  onClick={() => _(null)}
                  className="px-6 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,170,.5)]"
                  style={{
                    background: "linear-gradient(135deg,#ff00aa,#ffd600)",
                    boxShadow: "0 0 25px rgba(255,0,170,.3)",
                    transform: "translateZ(10px)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => setP("select")}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,.2)]"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                    transform: "translateZ(5px)",
                  }}
                >
                  Cambiar / 切换
                </button>
                <P currentGameId="word-match-3d" />
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes cardShakeGlow { 0%,100%{transform:rotateY(180deg) translateX(0);box-shadow:0 0 15px rgba(255,68,68,0.5)} 15%{transform:rotateY(180deg) translateX(-10px) rotate(-3deg);box-shadow:0 0 35px rgba(255,68,68,0.9)} 30%{transform:rotateY(180deg) translateX(10px) rotate(3deg);box-shadow:0 0 35px rgba(255,68,68,0.9)} 45%{transform:rotateY(180deg) translateX(-8px) rotate(-2deg);box-shadow:0 0 30px rgba(255,68,68,0.8)} 60%{transform:rotateY(180deg) translateX(8px) rotate(2deg);box-shadow:0 0 30px rgba(255,68,68,0.8)} 75%{transform:rotateY(180deg) translateX(-4px);box-shadow:0 0 25px rgba(255,68,68,0.7)} 90%{transform:rotateY(180deg) translateX(4px);box-shadow:0 0 25px rgba(255,68,68,0.7)} }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(255,0,170,.2)} 50%{box-shadow:0 0 40px rgba(255,0,170,.4)} }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        @keyframes gradient-rotate { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .animate-gradient-rotate { animation: gradient-rotate 3s ease infinite; background-size: 300% 300%; }
        @keyframes float-star { 0%,100%{transform:translateY(0) scale(1);opacity:0.3} 50%{transform:translateY(-20px) scale(1.2);opacity:0.8} }
        .animate-float-star { animation: float-star 4s ease-in-out infinite; }
        @keyframes nebula-pulse { 0%,100%{transform:scale(1);opacity:0.2} 50%{transform:scale(1.3);opacity:0.4} }
        .animate-nebula-pulse { animation: nebula-pulse 6s ease-in-out infinite; }
        @keyframes timer-pulse { 0%,100%{box-shadow:0 0 10px rgba(255,68,68,0.3)} 50%{box-shadow:0 0 25px rgba(255,68,68,0.6)} }
        .animate-timer-pulse { animation: timer-pulse 1s ease-in-out infinite; }
        @keyframes victory-flash { 0%{opacity:0.6} 100%{opacity:0} }
        .animate-victory-flash { animation: victory-flash 1.5s ease-out forwards; }
        .card-3d-hover { transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .group:hover .card-3d-hover { transform: translateZ(40px) rotateX(-5deg) rotateY(5deg); }
        .group:hover .shine-sweep { animation: shine-sweep 1.5s ease-in-out; }
        .group:hover .shine-sweep-reverse { animation: shine-sweep 1.5s ease-in-out reverse; }
        @keyframes shine-sweep { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(200%) skewX(-15deg)} }
        @keyframes float-3d { 0%,100%{transform:translateY(0) translateZ(20px) rotateX(0)} 50%{transform:translateY(-12px) translateZ(30px) rotateX(2deg)} }
        .animate-float-3d { animation: float-3d 3s ease-in-out infinite; transform-style: preserve-3d; }
        @keyframes title-glow { 0%,100%{filter:drop-shadow(0 0 20px rgba(255,0,170,0.5)) drop-shadow(0 0 40px rgba(0,212,255,0.3))} 50%{filter:drop-shadow(0 0 40px rgba(255,0,170,0.8)) drop-shadow(0 0 80px rgba(0,212,255,0.5))} }
        .animate-title-glow { animation: title-glow 3s ease-in-out infinite; }
        @keyframes neon-breathe { 0%,100%{box-shadow:0 0 10px rgba(0,212,255,0.2), 0 0 20px rgba(255,0,170,0.1)} 50%{box-shadow:0 0 25px rgba(0,212,255,0.4), 0 0 50px rgba(255,0,170,0.2)} }
        .animate-neon-breathe { animation: neon-breathe 2s ease-in-out infinite; }
        @keyframes matchedFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .matched-float { animation: matchedFloat 2s ease-in-out infinite; }
        @keyframes matchBurst { 0%{transform:rotateY(180deg) scale(1)} 50%{transform:rotateY(180deg) scale(1.08)} 100%{transform:rotateY(180deg) scale(1)} }
        @keyframes glowPulseGreen { 0%,100%{box-shadow:0 0 20px rgba(57,255,20,0.6), inset 0 0 20px rgba(57,255,20,0.2)} 50%{box-shadow:0 0 40px rgba(57,255,20,1), inset 0 0 30px rgba(57,255,20,0.4), 0 0 80px rgba(57,255,20,0.3)} }
        @keyframes glowPulseRed { 0%,100%{box-shadow:0 0 15px rgba(255,68,68,0.5)} 50%{box-shadow:0 0 30px rgba(255,68,68,0.9), 0 0 60px rgba(255,68,68,0.4)} }
        @keyframes combo-popup-3d { 0%{transform:scale(0) rotateX(-30deg);opacity:0} 30%{transform:scale(1.3) rotateX(10deg);opacity:1} 60%{transform:scale(1) rotateX(0deg);opacity:1} 100%{transform:scale(0.8) rotateX(10deg);opacity:0} }
        .combo-popup-3d { animation: combo-popup-3d 1.5s ease-out forwards; }
        .stat-card-3d { transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .stat-card-3d:hover { transform: rotateX(-3deg) rotateY(3deg) translateZ(10px); }
      `}</style>
    </StarfieldBackground>
  );
}
export { TeComponent as default };
