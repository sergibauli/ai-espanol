import {
  BookOpenIcon,
  ZapIcon,
  StarIcon,
  TrophyIcon,
  ArrowLeftIcon,
  CarIcon,
  LayersIcon,
  TimerIcon,
  CrosshairIcon,
  FlagIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a, c as c_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function Ae(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Ge(a) {
  const s = [...a];
  for (let t = s.length - 1; t > 0; t--) {
    const n = Math.floor(Math.random() * (t + 1));
    [s[t], s[n]] = [s[n], s[t]];
  }
  return s;
}
function Le1Component({ expression }) {
  const cy = expression === "sad" ? 22 : expression === "excited" ? 18 : 20;
  const d_1 =
    expression === "happy"
      ? "M 28 30 Q 35 36 42 30"
      : expression === "sad"
        ? "M 28 34 Q 35 28 42 34"
        : expression === "excited"
          ? "M 30 30 Q 35 38 40 30 Q 35 32 30 30"
          : "M 32 32 Q 35 34 38 32";
  const n = expression === "happy" || expression === "excited" ? 0.6 : 0.3;
  const animation =
    expression === "excited"
      ? "mascotBounce 0.4s ease-in-out infinite"
      : "mascotFloat 3s ease-in-out infinite";
  const f =
    expression === "excited"
      ? "#ff00aa"
      : expression === "happy"
        ? "#39ff14"
        : expression === "sad"
          ? "#ff3860"
          : "#00d4ff";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <div className="relative">
        <div
          className="absolute -inset-3 rounded-full opacity-40 blur-xl"
          style={{
            background: f,
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <svg width="80" height="80" viewBox="0 0 70 70" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8ac5" />
              <stop offset="100%" stopColor="#ff00aa" />
            </linearGradient>
            <linearGradient id="earGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd600" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
          <ellipse cx="18" cy="14" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(-20 18 14)" />
          <ellipse cx="52" cy="14" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(20 52 14)" />
          <circle cx="35" cy="38" r="26" fill="url(#bodyGrad)" />
          <ellipse cx="22" cy="36" rx="5" ry="3" fill="#ff6b6b" opacity={n} />
          <ellipse cx="48" cy="36" rx="5" ry="3" fill="#ff6b6b" opacity={n} />
          <circle cx="26" cy={cy} r="3.5" fill="#1a0b2e" />
          <circle cx="44" cy={cy} r="3.5" fill="#1a0b2e" />
          <circle cx="27.5" cy={cy - 1} r="1.2" fill="white" />
          <circle cx="45.5" cy={cy - 1} r="1.2" fill="white" />
          <path d={d_1} stroke="#1a0b2e" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-black text-white whitespace-nowrap"
          style={{
            background: f,
            boxShadow: `0 0 10px ${f}80`,
            opacity: 0.9,
          }}
        >
          {expression === "excited"
            ? "NITRO!"
            : expression === "happy"
              ? "¡Bien!"
              : expression === "sad"
                ? "¡Ups!"
                : "Vamos"}
        </div>
      </div>
    </div>
  );
}
function IeComponent({ active }) {
  if (active) {
    return (
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {Array.from({
          length: 36,
        }).map((s, t) => {
          const n = (t / 36) * Math.PI * 2;
          const d = 80 + Math.random() * 140;
          const f = Math.cos(n) * d;
          const x = Math.sin(n) * d;
          const m = ["#ffd600", "#ff6b35", "#00d4ff", "#39ff14", "#ff00aa", "#b829dd"][t % 6];
          return (
            <div
              key={t}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                background: m,
                boxShadow: `0 0 12px ${m}, 0 0 24px ${m}80`,
                animation: "particleBurst 0.8s ease-out forwards",
                animationDelay: `${Math.random() * 0.12}s`,
                "--dx": `${f}px`,
                "--dy": `${x}px`,
              }}
            />
          );
        })}
      </div>
    );
  }
  return null;
}
function WeComponent({ active }) {
  if (active) {
    return (
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {Array.from({
          length: 60,
        }).map((s, t) => (
          <div
            key={t}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10px",
              width: 6 + Math.random() * 8,
              height: 6 + Math.random() * 8,
              background: ["#ffd600", "#ff6b35", "#00d4ff", "#39ff14", "#ff00aa", "#b829dd", "#ffffff"][
                t % 7
              ],
              boxShadow: `0 0 10px ${["#ffd600", "#ff6b35", "#00d4ff", "#39ff14", "#ff00aa", "#b829dd", "#ffffff"][t % 7]}`,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              animation: `confettiDrop ${2.5 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
    );
  }
  return null;
}
function ZeComponent({ speed }) {
  const s = -135 + (speed / 100) * 270;
  const t = speed > 80 ? "#ef4444" : speed > 50 ? "#f97316" : speed > 30 ? "#ffd700" : "#00d4ff";
  const n = `${t}40`;
  return (
    <div
      className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
      style={{
        perspective: "300px",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "3px solid rgba(255,255,255,0.08)",
          borderTopColor: t,
          borderRightColor: speed > 50 ? t : "rgba(255,255,255,0.08)",
          borderBottomColor: speed > 80 ? t : "rgba(255,255,255,0.08)",
          transform: "rotateX(35deg) rotateZ(-45deg)",
          boxShadow: `0 0 15px ${n}, inset 0 0 15px rgba(0,0,0,0.5)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <div
            className="absolute left-1/2 top-1/2 w-0.5 h-[32%] origin-bottom"
            style={{
              background: `linear-gradient(to top, ${t}, #fff)`,
              transform: `translate(-50%, -100%) rotate(${s}deg)`,
              boxShadow: `0 0 8px ${t}`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              borderRadius: "2px",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: t,
              boxShadow: `0 0 10px ${t}`,
            }}
          />
        </div>
      </div>
      <div
        className="absolute -bottom-3 left-0 right-0 text-center text-[9px] font-black tracking-wider"
        style={{
          color: t,
        }}
      >
        {Math.round(speed)} KM/H
      </div>
    </div>
  );
}
function DeComponent({ active }) {
  if (active) {
    return (
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 pointer-events-none">
        {Array.from({
          length: 6,
        }).map((s, t) => {
          const n = 3 + Math.random() * 5;
          const left = `${-(Math.random() * 16 + 4)}px`;
          const top = `${(Math.random() - 0.5) * 8}px`;
          return (
            <div
              key={t}
              className="absolute rounded-full"
              style={{
                width: n,
                height: n,
                background: t % 2 === 0 ? "#39ff14" : "#00d4ff",
                boxShadow: `0 0 6px ${t % 2 === 0 ? "#39ff14" : "#00d4ff"}`,
                left,
                top,
                opacity: 0.8,
                animation: "exhaustFade 0.4s ease-out forwards",
                animationDelay: `${t * 0.03}s`,
              }}
            />
          );
        })}
      </div>
    );
  }
  return null;
}
function ReComponent({ current, total }) {
  return (
    <div
      className="relative mx-auto mb-3 md:mb-4 w-fit"
      style={{
        perspective: "500px",
      }}
    >
      <div
        className="px-5 py-2 rounded-full relative"
        style={{
          background: "linear-gradient(135deg, rgba(14,22,64,0.9), rgba(5,8,27,0.8))",
          border: "1px solid rgba(255,214,0,0.3)",
          boxShadow: "0 0 30px rgba(255,214,0,0.15), 0 10px 40px rgba(0,0,0,0.4)",
          transform: "rotateX(10deg) translateZ(20px)",
          animation: "lapFloat 3s ease-in-out infinite",
        }}
      >
        <div
          className="absolute -inset-[1px] rounded-full opacity-40 blur-md -z-10"
          style={{
            background: "linear-gradient(135deg, #ffd600, #ff6b35)",
            animation: "lapGlow 2s ease-in-out infinite",
          }}
        />
        <span
          className="text-xs font-black tracking-wider"
          style={{
            color: "#ffd600",
            textShadow: "0 0 10px rgba(255,214,0,0.5)",
          }}
        >
          VUELTA {current}/{total} · 第{current}轮
        </span>
      </div>
    </div>
  );
}
function LeComponent({ target, typed }) {
  if (!target) {
    return null;
  }
  const t = typed
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "");
  return (
    <div
      className="flex justify-center gap-0.5 md:gap-1 mb-3 md:mb-4"
      style={{
        perspective: "600px",
      }}
    >
      {target.split("").map((n, d) => {
        const f = t[d];
        let color = "rgba(255,255,255,0.25)";
        let textShadow = "none";
        let g = "translateZ(0px)";
        let h = "1";
        if (f) {
          if (f === n) {
            color = "#10b981";
            textShadow = "0 0 12px #10b981, 0 0 24px #10b98160";
            g = "translateZ(40px)";
            h = "1.15";
          } else {
            color = "#ef4444";
            textShadow = "0 0 12px #ef4444, 0 0 24px #ef444460";
            g = "translateZ(15px)";
            h = "1.05";
          }
        }
        return (
          <span
            key={d}
            className="text-3xl md:text-5xl font-black transition-all duration-200 inline-block"
            style={{
              color,
              textShadow,
              transform: `${g} scale(${h})`,
              minWidth: "1ch",
              animation: f ? "letterPop 0.2s ease-out" : "none",
            }}
          >
            {n}
          </span>
        );
      })}
    </div>
  );
}
function EeComponent({ active }) {
  if (active) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-[35]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(239,68,68,0.18), transparent 70%)",
          animation: "wrongFlashIn 0.2s ease-out forwards",
        }}
      />
    );
  }
  return null;
}
function EComponent() {
  return (
    <>
      {Array.from({
        length: 8,
      }).map((a, s) => (
        <div
          key={`left-${s}`}
          className="absolute"
          style={{
            left: "8%",
            top: `${10 + s * 12}%`,
            width: "3px",
            height: "8px",
            background: "#ff00aa",
            boxShadow: "0 0 8px #ff00aa, 0 0 16px #ff00aa60",
            borderRadius: "2px",
            animation: `markerBlink ${1.5 + Math.random() * 1}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 1}s`,
            opacity: 0.7,
          }}
        />
      ))}
      {Array.from({
        length: 8,
      }).map((a, s) => (
        <div
          key={`right-${s}`}
          className="absolute"
          style={{
            right: "8%",
            top: `${10 + s * 12}%`,
            width: "3px",
            height: "8px",
            background: "#00d4ff",
            boxShadow: "0 0 8px #00d4ff, 0 0 16px #00d4ff60",
            borderRadius: "2px",
            animation: `markerBlink ${1.5 + Math.random() * 1}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 1}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </>
  );
}
function OeComponent({ progress }) {
  if (!(progress > 70)) {
    return null;
  }
  const t = (progress - 70) / 30;
  return (
    <div
      className="absolute right-6 md:right-10 top-0 bottom-0 pointer-events-none z-10"
      style={{
        opacity: t,
        perspective: "400px",
      }}
    >
      <div className="relative h-full flex items-center">
        <div
          className="w-1 h-3/4 rounded-full"
          style={{
            background: "linear-gradient(to bottom, transparent, #ffd600, #ff6b35, transparent)",
            boxShadow: "0 0 20px #ffd600, 0 0 40px #ff6b3580",
            animation: "archPulse 1s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[12%] left-0 right-0 h-1 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #ffd600, #ff6b35, transparent)",
            boxShadow: "0 0 20px #ffd600",
            animation: "archPulse 1s ease-in-out infinite",
            animationDelay: "0.2s",
          }}
        />
        {Array.from({
          length: 8,
        }).map((n, d) => (
          <div
            key={d}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              background: "#ffd600",
              boxShadow: "0 0 8px #ffd600",
              left: `${Math.random() * 20 - 10}px`,
              top: `${10 + Math.random() * 80}%`,
              animation: `archParticle ${1 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
function VeComponent({ active }) {
  if (active) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[35] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(57,255,20,0.2), transparent 60%)",
            animation: "nitroBurst 0.5s ease-out forwards",
          }}
        />
        {Array.from({
          length: 16,
        }).map((s, t) => {
          const n = (t / 16) * Math.PI * 2;
          const d = 100 + Math.random() * 200;
          return (
            <div
              key={t}
              className="absolute left-1/2 bottom-0 rounded-full"
              style={{
                width: 3 + Math.random() * 4,
                height: 20 + Math.random() * 40,
                background: "linear-gradient(to top, #ff6b35, #ffd600, transparent)",
                boxShadow: "0 0 10px #ff6b35",
                transform: `rotate(${(-n * 180) / Math.PI + 90}deg)`,
                left: "50%",
                bottom: "10%",
                marginLeft: Math.cos(n) * d - 2,
                marginBottom: Math.sin(n) * d * 0.3,
                animation: "nitroStreak 0.4s ease-out forwards",
                animationDelay: `${Math.random() * 0.1}s`,
              }}
            />
          );
        })}
      </div>
    );
  }
  return null;
}
function RaComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick, playSlice } = useSound();
  const [x, setX] = React.useState("select");
  const [g, setG] = React.useState([]);
  const [k, setK] = React.useState(0);
  const [y, setY] = React.useState("");
  const [c, setC] = React.useState(0);
  const [p, setP] = React.useState(0);
  const [v, setV] = React.useState(0);
  const [Ue, setUe] = React.useState(0);
  const [z, setZ] = React.useState(0);
  const [j, setJ] = React.useState(0);
  const [qe, setQe] = React.useState(0);
  const [de, setDe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordracer_best") || "0");
    } catch {
      return 0;
    }
  });
  const [b, setB] = React.useState(false);
  const [xe, setXe] = React.useState(false);
  const [S, setS] = React.useState(0);
  const [fe, setFe] = React.useState(false);
  const [expression, setExpression] = React.useState("neutral");
  const [pe, setPe] = React.useState(false);
  const [ue, setUe_1] = React.useState(false);
  const [be, setBe] = React.useState(false);
  const ARef = React.useRef(null);
  const GRef = React.useRef(null);
  const ge = g_1();
  const [J, setJ_1] = React.useState("");
  const heRef = React.useRef(null);
  const WRef = React.useRef(false);
  const ZRef = React.useRef(null);
  const total = 10;
  const w = (r, i = 1200) => {
    setExpression(r);
    if (ZRef.current) {
      clearTimeout(ZRef.current);
    }
    ZRef.current = setTimeout(() => setExpression("neutral"), i);
  };
  const D = React.useCallback(
    (r) => {
      playClick();
      let i = r ? a(r) : c_1();
      if (i.length === 0) {
        setJ_1('Este módulo no tiene palabras válidas. Prueba con otro o selecciona "Todos los módulos".');
        return;
      }
      const u = Ge(
        i
          .filter((l) => l.espanol && l.chino)
          .map((l) => ({
            espanol: Ae(l.espanol),
            chino: l.chino,
          }))
          .filter((l) => l.espanol.length >= 3 && l.espanol.length <= 12),
      ).slice(0, total);
      setG(u);
      setK(0);
      setY("");
      setC(0);
      setP(0);
      setV(0);
      setUe(0);
      setZ(0);
      setJ(0);
      setQe(0);
      setS(0);
      setXe(false);
      setExpression("neutral");
      setUe_1(false);
      setBe(false);
      WRef.current = false;
      setX("playing");
    },
    [playClick],
  );
  React.useEffect(() => {
    if (x === "playing") {
      ARef.current = setInterval(() => setV((r) => r + 1), 1000);
      return () => {
        if (ARef.current) {
          clearInterval(ARef.current);
        }
      };
    }
  }, [x]);
  React.useEffect(() => {
    if (x === "playing") {
      GRef.current = setInterval(() => {
        setP((r) => {
          if (r >= 100) {
            return 100;
          }
          return Math.min(100, r + 0.4 + Math.random() * 0.6);
        });
      }, 500);
      return () => {
        if (GRef.current) {
          clearInterval(GRef.current);
        }
      };
    }
  }, [x]);
  React.useEffect(() => {
    if (x === "playing" && (c >= 100 || p >= 100) && !WRef.current) {
      WRef.current = true;
      setX("gameover");
      const r = c >= 100 && c > p;
      if (r) {
        playWin();
        w("happy", 5000);
      } else {
        playLose();
        w("sad", 5000);
      }
      const i = Math.max(0, Math.round(j * 1000 - v * 10 + (r ? 2000 : 0)));
      setDe((u) => {
        const l = Math.max(u, i);
        localStorage.setItem("wordracer_best", String(l));
        return l;
      });
    }
  }, [x, c, p, j, v, playWin, playLose]);
  const ye = (r) => {
    const i = r
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-ZÑ]/g, "")
      .trim();
    setY(i);
    setZ((l) => l + 1);
    const u = g[k];
    if (u) {
      if (i === u.espanol) {
        playCorrect();
        setJ((l) => l + 1);
        setC((l) => Math.min(100, l + 100 / total));
        setQe(1);
        setB(true);
        setBe(true);
        setS((l) => {
          const $ = l + 1;
          if ($ >= 3) {
            setXe(true);
            w("excited", 1500);
          } else {
            w("happy", 800);
          }
          setTimeout(() => setXe(false), 600);
          return $;
        });
        setTimeout(() => setB(false), 600);
        setTimeout(() => setQe(0), 1000);
        setTimeout(() => setBe(false), 500);
        setY("");
        setK((l) => l + 1);
        setFe(true);
        setTimeout(() => setFe(false), 200);
        setPe(true);
        setTimeout(() => setPe(false), 800);
      } else if (i.length >= u.espanol.length && !u.espanol.startsWith(i)) {
        playWrong();
        setS(0);
        w("sad", 800);
        setUe_1(true);
        setTimeout(() => setUe_1(false), 400);
      }
    }
  };
  const onKeyDown = (r) => {
    if (r.key === "Enter") {
      ye(y);
    }
  };
  const R = g[k];
  const je = Math.max(0, Math.round(j * 1000 - v * 10 + (c >= 100 && c > p ? 2000 : 0)));
  const we = z > 0 ? Math.round((j / z) * 100) : 0;
  const speed = Math.min(100, S * 12 + c * 0.5 + (b ? 30 : 0));
  if (x === "select") {
    return (
      <StarfieldBackground>
        <SoundToggles />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10 flex-1 flex flex-col justify-center">
            <div
              className="inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-3xl mb-6 mx-auto relative"
              style={{
                background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                boxShadow: "0 0 60px rgba(255,214,0,.5), 0 0 120px rgba(255,107,53,.3)",
                animation: "logoPulse 3s ease-in-out infinite",
                transform: "rotateX(15deg)",
                perspective: "800px",
              }}
            >
              <CarIcon size={48} className="text-white drop-shadow-lg" />
              <div
                className="absolute -inset-2 rounded-3xl opacity-40 blur-xl"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                  animation: "logoPulse 3s ease-in-out infinite",
                }}
              />
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-4 tracking-tight"
              style={{
                textShadow: "0 0 40px rgba(255,214,0,0.4), 0 0 80px rgba(255,107,53,0.2)",
                transform: "rotateX(5deg)",
                perspective: "800px",
                animation: "titleFloat 4s ease-in-out infinite",
              }}
            >
              Word Racer
            </h1>
            <p className="text-white/50 text-sm md:text-base font-medium max-w-md mx-auto mb-2">
              Escribe más rápido que la IA para ganar la carrera
            </p>
            <p className="text-white/30 text-xs font-medium mb-6">比AI更快输入赢得比赛</p>
            {J && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-2xl text-sm font-bold border border-red-400/30"
                style={{
                  background: "rgba(255,68,68,.12)",
                  color: "#ff6b6b",
                  boxShadow: "0 0 20px rgba(255,68,68,.2)",
                }}
              >
                {J}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setJ_1("");
                D(null);
              }}
              className="group rounded-2xl p-5 md:p-6 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "rgba(14,22,64,.7)",
                border: "1px solid rgba(255,0,170,.4)",
                transformStyle: "preserve-3d",
                boxShadow: "0 0 30px rgba(255,0,170,.1)",
              }}
              onMouseEnter={(r) => {
                r.currentTarget.style.transform = "rotateY(5deg) rotateX(5deg) scale(1.03)";
              }}
              onMouseLeave={(r) => {
                r.currentTarget.style.transform = "";
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                }}
              />
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 25px rgba(255,0,170,.4)",
                }}
              >
                <LayersIcon size={26} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base md:text-lg mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.8)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
            </button>
            {ge.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setJ_1("");
                  D(r.id);
                }}
                className="group rounded-2xl p-5 md:p-6 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
                style={{
                  background: "rgba(14,22,64,.7)",
                  border: `1px solid ${r.color}60`,
                  transformStyle: "preserve-3d",
                  boxShadow: `0 0 30px ${r.color}15`,
                }}
                onMouseEnter={(i) => {
                  i.currentTarget.style.transform = "rotateY(5deg) rotateX(5deg) scale(1.03)";
                }}
                onMouseLeave={(i) => {
                  i.currentTarget.style.transform = "";
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${r.color}, ${r.color}88)`,
                  }}
                />
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 relative"
                  style={{
                    background: `linear-gradient(135deg, ${r.color}, ${r.color}88)`,
                    boxShadow: `0 0 25px ${r.color}50`,
                  }}
                >
                  <BookOpenIcon size={26} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base md:text-lg mb-1">{r.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${r.color}cc`,
                  }}
                >
                  {r.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{r.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
        </div>
        <Le1Component expression="neutral" />
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <SoundToggles />
      <IeComponent active={pe} />
      <WeComponent active={x === "gameover" && c >= 100 && c > p} />
      <EeComponent active={ue} />
      <VeComponent active={be} />
      <div
        className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6 min-h-screen relative z-10 flex flex-col"
        style={{
          transform: fe ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : "none",
          transition: "transform 0.05s",
        }}
      >
        <div className="flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setX("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(255,255,255,.05)",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1px solid rgba(255,214,0,.25)",
                color: "#ffd600",
                boxShadow: "0 0 15px rgba(255,214,0,.1)",
              }}
            >
              <TimerIcon size={12} /> {v}s
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(0,212,255,.12)",
                border: "1px solid rgba(0,212,255,.25)",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,.1)",
              }}
            >
              <ZapIcon size={12} /> {k + 1}/{total}
            </div>
          </div>
        </div>
        <div className="text-center mb-2 md:mb-3">
          <h1
            className="text-3xl md:text-5xl font-black mb-1 md:mb-2 tracking-tight"
            style={{
              background: "linear-gradient(135deg,#ffd600,#ff6b35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,214,0,.4))",
              animation: "titleFloat 4s ease-in-out infinite",
            }}
          >
            Word Racer
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-medium">
            Escribe la palabra española / 输入西班牙语单词
          </p>
        </div>
        <ReComponent current={k + 1} total={total} />
        {xe && S >= 3 && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div
              className="text-5xl md:text-7xl font-black relative"
              style={{
                background: "linear-gradient(135deg,#ffd600,#ff6b35,#ff00aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,214,0,.6))",
                animation: "comboPop 0.7s ease-out forwards",
              }}
            >
              <span
                className="absolute -inset-4 blur-2xl opacity-50"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff00aa)",
                }}
              />
              x{S} COMBO!
            </div>
          </div>
        )}
        <div
          ref={heRef}
          className="relative mx-auto rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 mb-4 md:mb-6"
          style={{
            height: "clamp(240px, 42vh, 400px)",
            background: "linear-gradient(180deg,rgba(3,5,18,.98),rgba(8,12,40,.9))",
            perspective: "1200px",
            transformStyle: "preserve-3d",
            boxShadow:
              "0 0 60px rgba(255,214,0,.15), 0 20px 80px rgba(0,0,0,.5), inset 0 0 40px rgba(0,0,0,.5)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255,214,0,0.08), transparent)",
              opacity: 0.6,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              transform: "rotateX(60deg) translateY(-40px) scale(1.6)",
              transformOrigin: "center bottom",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(20,20,40,.95), rgba(5,5,18,1))",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,214,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.08) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                animation: "roadMove 0.8s linear infinite",
              }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1.5"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, rgba(255,214,0,.7) 0px, rgba(255,214,0,.7) 24px, transparent 24px, transparent 48px)",
                animation: "roadMove 0.4s linear infinite",
                transform: "translateX(-50%)",
                boxShadow: "0 0 15px rgba(255,214,0,.3)",
              }}
            />
            <div
              className="absolute left-[12%] top-0 bottom-0 w-1"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, rgba(255,0,170,.5) 0px, rgba(255,0,170,.5) 18px, transparent 18px, transparent 36px)",
                animation: "roadMove 0.6s linear infinite",
                boxShadow: "0 0 10px rgba(255,0,170,.3)",
              }}
            />
            <div
              className="absolute right-[12%] top-0 bottom-0 w-1"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, rgba(0,212,255,.5) 0px, rgba(0,212,255,.5) 18px, transparent 18px, transparent 36px)",
                animation: "roadMove 0.6s linear infinite",
                boxShadow: "0 0 10px rgba(0,212,255,.3)",
              }}
            />
            <div
              className="absolute left-[5%] top-0 bottom-0 w-2"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #ff3860 0px, #ff3860 12px, #fff 12px, #fff 24px)",
                animation: "roadMove 0.3s linear infinite",
              }}
            />
            <div
              className="absolute right-[5%] top-0 bottom-0 w-2"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #ff3860 0px, #ff3860 12px, #fff 12px, #fff 24px)",
                animation: "roadMove 0.3s linear infinite",
              }}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({
              length: 16,
            }).map((r, i) => (
              <div
                key={i}
                className="absolute h-px rounded-full"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${20 + Math.random() * 60}%`,
                  width: `${40 + Math.random() * 100}px`,
                  background: "linear-gradient(90deg, transparent, rgba(255,214,0,.6), transparent)",
                  animation: `speedLine ${0.2 + Math.random() * 0.4}s linear infinite`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  boxShadow: "0 0 8px rgba(255,214,0,.2)",
                }}
              />
            ))}
          </div>
          <EComponent />
          {b && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center bottom, rgba(57,255,20,.18), transparent 70%)",
                animation: "nitroGlow 0.3s ease-in-out infinite",
              }}
            />
          )}
          <div className="absolute left-3 right-3 md:left-4 md:right-4 top-3 md:top-4 flex flex-col gap-2 md:gap-3 z-10">
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #10b981)",
                  boxShadow: "0 0 25px rgba(0,212,255,.6), 0 0 50px rgba(16,185,129,.3)",
                  animation: b ? "carShake 0.12s ease-in-out infinite" : "carIdle 1s ease-in-out infinite",
                  transform: "rotateY(-15deg) rotateX(5deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <CarIcon
                  size={18}
                  className="text-white"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
                  }}
                />
                <DeComponent active={b} />
                {b && (
                  <div
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-1 rounded-full"
                    style={{
                      background: "#39ff14",
                      boxShadow: "0 0 10px #39ff14, 0 0 20px #39ff14",
                      animation: "flameFlicker 0.1s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
              <div
                className="flex-1 h-3 md:h-4 rounded-full overflow-hidden relative"
                style={{
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,.3)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300 relative"
                  style={{
                    width: `${c}%`,
                    background: "linear-gradient(90deg, #00d4ff, #10b981)",
                    boxShadow: b ? "0 0 25px #10b981, 0 0 50px #00d4ff" : "0 0 15px rgba(0,212,255,.4)",
                    transition: "width 0.3s ease-out, box-shadow 0.2s",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,.5), transparent)",
                    }}
                  />
                </div>
              </div>
              <span className="text-xs font-black text-white/90 w-10 text-right drop-shadow-md">
                {Math.round(c)}%
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #ff00aa)",
                  boxShadow: "0 0 25px rgba(239,68,68,.6), 0 0 50px rgba(255,0,170,.3)",
                  animation: "carIdle 1.2s ease-in-out infinite",
                  transform: "rotateY(-15deg) rotateX(5deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <CarIcon
                  size={18}
                  className="text-white"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
                  }}
                />
              </div>
              <div
                className="flex-1 h-3 md:h-4 rounded-full overflow-hidden relative"
                style={{
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,.3)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500 relative"
                  style={{
                    width: `${p}%`,
                    background: "linear-gradient(90deg, #ef4444, #ff00aa)",
                    boxShadow: "0 0 15px rgba(239,68,68,.4)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,.5), transparent)",
                    }}
                  />
                </div>
              </div>
              <span className="text-xs font-black text-white/90 w-10 text-right drop-shadow-md">
                IA {Math.round(p)}%
              </span>
            </div>
          </div>
          {b && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {Array.from({
                length: 6,
              }).map((r, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 8 + Math.random() * 10,
                    height: 24 + Math.random() * 24,
                    background: "linear-gradient(to top, #ff6b35, #ffd600, #fff)",
                    boxShadow: "0 0 20px #ff6b35, 0 0 40px #ffd600",
                    animation: "flameFlicker 0.15s ease-in-out infinite",
                    animationDelay: `${i * 0.04}s`,
                  }}
                />
              ))}
            </div>
          )}
          <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10">
            <ZeComponent speed={speed} />
          </div>
          <OeComponent progress={c} />
          <div
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10"
            style={{
              animation: "flagWave 2s ease-in-out infinite",
            }}
          >
            <div className="relative">
              <FlagIcon
                size={36}
                className="md:w-10 md:h-10"
                style={{
                  color: "#ffd600",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.6))",
                }}
              />
              <div
                className="absolute -inset-2 rounded-full opacity-40 blur-lg"
                style={{
                  background: "#ffd600",
                  animation: "flagGlow 1.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
        {R && (
          <div
            className="rounded-2xl md:rounded-3xl p-5 md:p-8 mb-3 md:mb-6 text-center relative overflow-hidden mx-auto w-full max-w-2xl"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
              border: "1px solid rgba(255,255,255,.15)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 50px rgba(255,214,0,.12), 0 20px 80px rgba(0,0,0,.4)",
              transformStyle: "preserve-3d",
              perspective: "800px",
              animation: "cardFloat 5s ease-in-out infinite",
            }}
          >
            <div
              className="absolute -inset-[2px] rounded-[22px] md:rounded-[26px] -z-10 opacity-30"
              style={{
                background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                filter: "blur(25px)",
                animation: "cardGlow 3s ease-in-out infinite",
              }}
            />
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2 md:mb-3"
              style={{
                color: "rgba(207,216,255,.5)",
              }}
            >
              Chino / 中文
            </p>
            <p
              className="text-4xl md:text-6xl font-black mb-3 md:mb-4"
              style={{
                color: "#ffd600",
                textShadow: "0 0 40px rgba(255,214,0,.5), 0 0 80px rgba(255,107,53,.3)",
                animation: "wordPulse 2s ease-in-out infinite",
                transform: "translateZ(30px)",
              }}
            >
              {R.chino}
            </p>
            <LeComponent target={R.espanol} typed={y} />
            <p
              className="text-xs font-bold uppercase tracking-wider mb-1"
              style={{
                color: "rgba(207,216,255,.5)",
              }}
            >
              Escribe en español / 输入西班牙语
            </p>
          </div>
        )}
        <div className="max-w-md mx-auto mb-3 md:mb-6 w-full px-1">
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-2xl opacity-40 blur-lg transition-opacity"
              style={{
                background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                opacity: y ? 0.6 : 0.2,
                animation: y ? "inputGlow 1.5s ease-in-out infinite" : "none",
              }}
            />
            <input
              type="text"
              value={y}
              onChange={(r) => setY(r.target.value.toUpperCase())}
              onKeyDown={onKeyDown}
              className="relative w-full px-5 md:px-6 py-3 md:py-4 rounded-2xl font-black text-base md:text-lg text-center bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#ffd600] transition-all"
              style={{
                boxShadow: "0 0 30px rgba(255,214,0,.15), inset 0 0 20px rgba(0,0,0,.2)",
                textShadow: "0 0 10px rgba(255,255,255,.1)",
              }}
              placeholder="Escribe aquí / 在此输入..."
              autoFocus
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 md:gap-3 flex-wrap mb-4">
          <div
            className="px-3 md:px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(0,212,255,.1)",
              border: "1px solid rgba(0,212,255,.25)",
              color: "#00d4ff",
              boxShadow: "0 0 15px rgba(0,212,255,.1)",
            }}
          >
            <CrosshairIcon size={12} /> Precisión: {we}%
          </div>
          <div
            className="px-3 md:px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(255,214,0,.1)",
              border: "1px solid rgba(255,214,0,.25)",
              color: "#ffd600",
              boxShadow: "0 0 15px rgba(255,214,0,.1)",
            }}
          >
            <ZapIcon size={12} /> Correctas: {j}/{z}
          </div>
          <div
            className="px-3 md:px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(255,0,170,.1)",
              border: "1px solid rgba(255,0,170,.25)",
              color: "#ff00aa",
              boxShadow: "0 0 15px rgba(255,0,170,.1)",
            }}
          >
            <StarIcon size={12} /> Combo: {S}
          </div>
        </div>
        {x === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-2xl md:rounded-3xl max-w-sm mx-4 relative overflow-hidden w-full"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.65))",
                border: "1px solid rgba(255,214,0,.25)",
                boxShadow: "0 0 60px rgba(255,214,0,.2), 0 0 120px rgba(255,107,53,.1)",
                transformStyle: "preserve-3d",
                perspective: "800px",
                animation: "modalFloat 4s ease-in-out infinite",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[22px] md:rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                  filter: "blur(30px)",
                  animation: "modalGlow 3s ease-in-out infinite",
                }}
              />
              <div className="relative mb-4">
                <TrophyIcon
                  size={56}
                  className="mx-auto"
                  style={{
                    color: "#ffd600",
                    filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                    animation: "trophyBounce 2s ease-in-out infinite",
                  }}
                />
              </div>
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(255,214,0,.3))",
                }}
              >
                {c >= 100 && c > p ? "¡Victoria!" : "¡Carrera Terminada!"}
              </h2>
              <p className="text-white/50 text-sm mb-6">{c >= 100 && c > p ? "你赢了！" : "比赛结束！"}</p>
              <div
                className="grid grid-cols-2 gap-3 mb-6"
                style={{
                  perspective: "600px",
                }}
              >
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 20px rgba(255,214,0,.05)",
                    transform: "translateZ(20px) rotateX(5deg)",
                    animation: "statFloat 3s ease-in-out infinite",
                  }}
                >
                  <ZapIcon
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
                    Score
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,.3)",
                    }}
                  >
                    {je}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.2)",
                    boxShadow: "0 0 20px rgba(0,212,255,.05)",
                    transform: "translateZ(10px) rotateX(5deg)",
                    animation: "statFloat 3s ease-in-out infinite",
                    animationDelay: "0.2s",
                  }}
                >
                  <TimerIcon
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
                    Tiempo
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 10px rgba(0,212,255,.3)",
                    }}
                  >
                    {v}s
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(16,185,129,.1)",
                    border: "1px solid rgba(16,185,129,.2)",
                    boxShadow: "0 0 20px rgba(16,185,129,.05)",
                    transform: "translateZ(10px) rotateX(5deg)",
                    animation: "statFloat 3s ease-in-out infinite",
                    animationDelay: "0.4s",
                  }}
                >
                  <CarIcon
                    size={16}
                    style={{
                      color: "#10b981",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(16,185,129,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Progreso
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#10b981",
                      textShadow: "0 0 10px rgba(16,185,129,.3)",
                    }}
                  >
                    {Math.round(c)}%
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 20px rgba(255,0,170,.05)",
                    transform: "translateZ(20px) rotateX(5deg)",
                    animation: "statFloat 3s ease-in-out infinite",
                    animationDelay: "0.6s",
                  }}
                >
                  <TrophyIcon
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
                    Mejor Score
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,.3)",
                    }}
                  >
                    {de}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => D(null)}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 text-sm md:text-base relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                    boxShadow: "0 0 30px rgba(255,214,0,.4), 0 0 60px rgba(255,107,53,.2)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, #fff, transparent)",
                    }}
                  />
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setX("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.18)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                  }}
                >
                  Cambiar / 切换
                </button>
                <P currentGameId="word-racer" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Le1Component expression={expression} />
      <style>{`
        @keyframes roadMove { 0%{background-position:0 0} 100%{background-position:0 40px} }
        @keyframes speedLine { 0%{transform:translateX(-120px);opacity:0} 30%{opacity:1} 100%{transform:translateX(200px);opacity:0} }
        @keyframes flameFlicker { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.4)} }
        @keyframes flagWave { 0%,100%{transform:translateY(-50%) rotate(-8deg)} 50%{transform:translateY(-50%) rotate(8deg)} }
        @keyframes flagGlow { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        @keyframes comboPop { 0%{transform:scale(0.3) rotateX(90deg);opacity:0} 50%{transform:scale(1.3) rotateX(0deg);opacity:1} 100%{transform:scale(1) rotateX(0deg);opacity:0} }
        @keyframes confettiDrop { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.1)} }
        @keyframes mascotPulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.15)} }
        @keyframes logoPulse { 0%,100%{transform:rotateX(15deg) scale(1)} 50%{transform:rotateX(15deg) scale(1.05)} }
        @keyframes titleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes cardFloat { 0%,100%{transform:translateY(0) rotateX(2deg)} 50%{transform:translateY(-4px) rotateX(-2deg)} }
        @keyframes cardGlow { 0%,100%{opacity:0.2} 50%{opacity:0.4} }
        @keyframes wordPulse { 0%,100%{transform:translateZ(30px) scale(1)} 50%{transform:translateZ(30px) scale(1.02)} }
        @keyframes inputGlow { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
        @keyframes nitroGlow { 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes carShake { 0%,100%{transform:rotateY(-15deg) rotateX(5deg) translateX(0)} 25%{transform:rotateY(-15deg) rotateX(5deg) translateX(-2px)} 75%{transform:rotateY(-15deg) rotateX(5deg) translateX(2px)} }
        @keyframes carIdle { 0%,100%{transform:rotateY(-15deg) rotateX(5deg) translateY(0)} 50%{transform:rotateY(-15deg) rotateX(5deg) translateY(-2px)} }
        @keyframes modalFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes modalGlow { 0%,100%{opacity:0.5} 50%{opacity:0.8} }
        @keyframes trophyBounce { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-8px) rotate(-5deg)} 75%{transform:translateY(-4px) rotate(5deg)} }
        @keyframes particleBurst {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0); opacity: 0; }
        }
        @keyframes markerBlink { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes lapFloat { 0%,100%{transform:rotateX(10deg) translateZ(20px) translateY(0)} 50%{transform:rotateX(10deg) translateZ(20px) translateY(-3px)} }
        @keyframes lapGlow { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
        @keyframes letterPop { 0%{transform:translateZ(40px) scale(1.3)} 100%{transform:translateZ(40px) scale(1.15)} }
        @keyframes wrongFlashIn { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
        @keyframes exhaustFade { 0%{transform:scale(1); opacity:0.8} 100%{transform:scale(0.2); opacity:0} }
        @keyframes archPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes archParticle { 0%,100%{transform:translateY(0); opacity:0.6} 50%{transform:translateY(-10px); opacity:1} }
        @keyframes nitroBurst { 0%{transform:scale(0.8); opacity:0} 50%{transform:scale(1); opacity:1} 100%{transform:scale(1.2); opacity:0} }
        @keyframes nitroStreak { 0%{transform:scaleY(1); opacity:1} 100%{transform:scaleY(0.2); opacity:0} }
        @keyframes statFloat { 0%,100%{transform:translateZ(20px) rotateX(5deg) translateY(0)} 50%{transform:translateZ(20px) rotateX(5deg) translateY(-3px)} }
      `}</style>
    </StarfieldBackground>
  );
}
export { RaComponent as default };
