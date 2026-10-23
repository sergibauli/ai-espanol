import {
  SparklesIcon,
  Gamepad2Icon,
  BookOpenIcon,
  ZapIcon,
  TrophyIcon,
  StarIcon,
  ArrowLeftIcon,
  BombIcon,
  LayersIcon,
  FlameIcon,
  TimerIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function le(m) {
  const n = [...m];
  for (let s = n.length - 1; s > 0; s--) {
    const x = Math.floor(Math.random() * (s + 1));
    [n[s], n[x]] = [n[x], n[s]];
  }
  return n;
}
function ce(m, n) {
  const s = ["#ffd600", "#ff6b35", "#ff00aa", "#ff3860", "#39ff14", "#00d4ff", "#b829dd", "#fff"];
  const x = ["circle", "star", "square"];
  for (let d = 0; d < 70; d++) {
    const o = document.createElement("div");
    const f = 4 + Math.random() * 14;
    const h = s[Math.floor(Math.random() * s.length)];
    const y = x[Math.floor(Math.random() * x.length)];
    let g = "50%";
    if (y === "square") {
      g = "2px";
    }
    if (y === "star") {
      o.style.clipPath =
        "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)";
      g = "0";
    }
    o.style.cssText = `position:fixed;left:${m}px;top:${n}px;width:${f}px;height:${f}px;${y !== "star" ? `border-radius:${g};` : ""}background:${h};pointer-events:none;z-index:9999;box-shadow:0 0 ${Math.floor(f * 1.5)}px ${h}, 0 0 ${Math.floor(f * 3)}px ${h}80;`;
    document.body.appendChild(o);
    const w = Math.random() * Math.PI * 2;
    const N = 3 + Math.random() * 18;
    let S = Math.cos(w) * N;
    let C = Math.sin(w) * N;
    let $ = 1;
    let u = 0;
    let T = (Math.random() - 0.5) * 25;
    const R = () => {
      S *= 0.96;
      C *= 0.96;
      C += 0.25;
      o.style.left = `${parseFloat(o.style.left) + S}px`;
      o.style.top = `${parseFloat(o.style.top) + C}px`;
      u += T;
      o.style.transform = `rotate(${u}deg)`;
      $ -= 0.016;
      o.style.opacity = String($);
      if ($ > 0) {
        requestAnimationFrame(R);
      } else {
        o.remove();
      }
    };
    requestAnimationFrame(R);
  }
}
function je() {
  const m = ["#ffd600", "#ff6b35", "#ff00aa", "#ff3860", "#39ff14", "#00d4ff", "#b829dd", "#fff"];
  for (let n = 0; n < 120; n++) {
    const s = document.createElement("div");
    const x = Math.random() > 0.5;
    const d = x ? 8 + Math.random() * 6 : 6 + Math.random() * 4;
    s.style.cssText = `position:fixed;left:${window.innerWidth / 2}px;top:${window.innerHeight / 2}px;width:${d}px;height:${d}px;border-radius:${x ? "2px" : "50%"};background:${m[n % m.length]};pointer-events:none;z-index:9999;`;
    document.body.appendChild(s);
    const o = Math.random() * Math.PI * 2;
    const f = 6 + Math.random() * 18;
    let h = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let g = 1;
    let w = 0;
    let N = Math.cos(o) * f;
    let S = Math.sin(o) * f - 4;
    const C = 0.15 + Math.random() * 0.2;
    const $ = (Math.random() - 0.5) * 15;
    const u = () => {
      h += N;
      y += S;
      S += C;
      w += $;
      s.style.left = `${h}px`;
      s.style.top = `${y}px`;
      s.style.transform = `rotate(${w}deg)`;
      g -= 0.008;
      s.style.opacity = String(g);
      if (g > 0) {
        requestAnimationFrame(u);
      } else {
        s.remove();
      }
    };
    requestAnimationFrame(u);
  }
}
function ve() {
  const m = ["#ff4444", "#ff6b35", "#ff00aa"];
  for (let n = 0; n < 20; n++) {
    const s = document.createElement("div");
    s.style.cssText = `position:fixed;left:50%;top:50%;width:4px;height:4px;border-radius:50%;background:${m[n % m.length]};pointer-events:none;z-index:9999;`;
    document.body.appendChild(s);
    const x = Math.random() * Math.PI * 2;
    const d = 5 + Math.random() * 12;
    let o = Math.cos(x) * d;
    let f = Math.sin(x) * d;
    let h = 1;
    const y = () => {
      o *= 0.94;
      f *= 0.94;
      s.style.left = `${parseFloat(s.style.left) + o}px`;
      s.style.top = `${parseFloat(s.style.top) + f}px`;
      h -= 0.03;
      s.style.opacity = String(h);
      if (h > 0) {
        requestAnimationFrame(y);
      } else {
        s.remove();
      }
    };
    requestAnimationFrame(y);
  }
}
function DeComponent({ expression }) {
  const n = expression === "excited";
  const s = expression === "sad";
  const x = expression === "happy";
  const d = n ? (
    <>
      <StarIcon
        size={12}
        className="mascot-star-1"
        style={{
          fill: "#ffd600",
          color: "#ffd600",
          position: "absolute",
          left: "10px",
          top: "14px",
        }}
      />
      <StarIcon
        size={8}
        className="mascot-star-2"
        style={{
          fill: "#ff6b35",
          color: "#ff6b35",
          position: "absolute",
          left: "6px",
          top: "20px",
        }}
      />
    </>
  ) : s ? (
    <g>
      <circle cx="14" cy="18" r="3" fill="#0a0a1a" />
      <circle cx="15" cy="17" r="1" fill="white" />
      <path d="M 11 22 Q 14 24 17 22" stroke="#0a0a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ) : (
    <g>
      <circle cx="14" cy="18" r="3.5" fill="#0a0a1a" />
      <circle cx="15.5" cy="16.5" r="1.2" fill="white" />
    </g>
  );
  const o = n ? (
    <>
      <StarIcon
        size={12}
        className="mascot-star-1"
        style={{
          fill: "#ffd600",
          color: "#ffd600",
          position: "absolute",
          right: "10px",
          top: "14px",
        }}
      />
      <StarIcon
        size={8}
        className="mascot-star-2"
        style={{
          fill: "#ff6b35",
          color: "#ff6b35",
          position: "absolute",
          right: "6px",
          top: "20px",
        }}
      />
    </>
  ) : s ? (
    <g>
      <circle cx="38" cy="18" r="3" fill="#0a0a1a" />
      <circle cx="37" cy="17" r="1" fill="white" />
      <path d="M 33 22 Q 36 24 39 22" stroke="#0a0a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ) : (
    <g>
      <circle cx="38" cy="18" r="3.5" fill="#0a0a1a" />
      <circle cx="36.5" cy="16.5" r="1.2" fill="white" />
    </g>
  );
  const f = n ? (
    <g>
      <ellipse cx="26" cy="24" rx="5" ry="4" fill="#ff6b35" />
      <ellipse cx="26" cy="22" rx="3" ry="1.5" fill="white" />
    </g>
  ) : s ? (
    <g>
      <path d="M 22 24 Q 26 21 30 24" stroke="#0a0a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ) : x ? (
    <g>
      <path d="M 21 22 Q 26 27 31 22" stroke="#0a0a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ) : (
    <g>
      <path d="M 23 23 Q 26 25 29 23" stroke="#0a0a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
  const h = (x || n) && (
    <g>
      <circle cx="10" cy="22" r="3" fill="#ff6b35" opacity="0.35" />
      <circle cx="42" cy="22" r="3" fill="#ff6b35" opacity="0.35" />
    </g>
  );
  const y = s && (
    <g>
      <circle cx="11" cy="26" r="1.5" fill="#00d4ff" opacity="0.8">
        <animate attributeName="cy" values="26;32" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="39" cy="26" r="1.5" fill="#00d4ff" opacity="0.8">
        <animate attributeName="cy" values="26;32" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="0.9s" repeatCount="indefinite" />
      </circle>
    </g>
  );
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 52 40"
      style={{
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
      }}
    >
      <defs>
        <linearGradient id="mascotBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe066" />
          <stop offset="100%" stopColor="#ffd600" />
        </linearGradient>
        <linearGradient id="mascotEarL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        <linearGradient id="mascotEarR" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
      </defs>
      <ellipse cx="8" cy="8" rx="6" ry="10" fill="url(#mascotEarL)" transform="rotate(-25 8 8)" />
      <ellipse cx="8" cy="8" rx="3" ry="5" fill="#ff6b35" opacity="0.5" transform="rotate(-25 8 8)" />
      <ellipse cx="44" cy="8" rx="6" ry="10" fill="url(#mascotEarR)" transform="rotate(25 44 8)" />
      <ellipse cx="44" cy="8" rx="3" ry="5" fill="#ff6b35" opacity="0.5" transform="rotate(25 44 8)" />
      <rect x="4" y="10" width="44" height="28" rx="14" fill="url(#mascotBody)" />
      {d}
      {o}
      {f}
      {h}
      {y}
      {n && (
        <>
          <circle cx="2" cy="6" r="1.5" fill="#ffd600" className="mascot-sparkle" />
          <circle cx="50" cy="10" r="1" fill="#ff6b35" className="mascot-sparkle-2" />
          <circle cx="48" cy="34" r="1.2" fill="#39ff14" className="mascot-sparkle-3" />
          <circle cx="4" cy="32" r="1" fill="#00d4ff" className="mascot-sparkle-2" />
        </>
      )}
    </svg>
  );
}
function FeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [o, setO] = React.useState("select");
  const [h, setH] = React.useState([]);
  const [g, setG] = React.useState([]);
  const [N, setN] = React.useState([]);
  const [C, setC] = React.useState(0);
  const [u, setU] = React.useState(0);
  const [R, setR] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("vocabblast_bestcombo") || "0");
    } catch {
      return 0;
    }
  });
  const [v, setV] = React.useState(60);
  const [M, setM] = React.useState(false);
  const [L, setL] = React.useState([]);
  const [xe, setXe] = React.useState(false);
  const [D, setD] = React.useState({
    x: 0,
    y: 0,
  });
  const FRef = React.useRef(null);
  const PRef = React.useRef({});
  const fe = g_1();
  const [O, setO_1] = React.useState("");
  const zRef = React.useRef(0);
  const IRef = React.useRef(0);
  const YRef = React.useRef(null);
  const expression = React.useMemo(() => {
    if (o === "select") {
      return "neutral";
    }
    if (o === "gameover") {
      if (M) {
        return "excited";
      }
      return "sad";
    }
    if (u >= 3) {
      return "excited";
    }
    if (u >= 1) {
      return "happy";
    }
    return "neutral";
  }, [o, u, M]);
  const A = React.useCallback(
    (t) => {
      playClick();
      let a = t ? a_1(t) : a_1();
      if (a.length === 0) {
        setO_1(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const i = a
        .filter((l) => l.espanol && l.chino)
        .map((l) => ({
          es: l.espanol
            .toUpperCase()
            .replace(/[¿?¡!.,;:'"]/g, "")
            .trim(),
          zh: l.chino.trim(),
        }))
        .filter((l) => l.es.length > 0 && l.es.length <= 12);
      const p = [];
      const b = new Set();
      for (const l of i) {
        if (!b.has(l.es)) {
          b.add(l.es);
          p.push(l);
        }
      }
      const j = le(p).slice(0, 12);
      let r = 0;
      const k = [];
      j.forEach((l, pairId) => {
        k.push({
          id: r++,
          text: l.es,
          isSpanish: true,
          pairId,
          state: "hidden",
        });
        k.push({
          id: r++,
          text: l.zh,
          isSpanish: false,
          pairId,
          state: "hidden",
        });
      });
      setH(j);
      setG(le(k));
      setN([]);
      setC(0);
      IRef.current = 0;
      setU(0);
      zRef.current = 0;
      setV(60);
      setM(false);
      setL([]);
      setO("playing");
    },
    [playClick],
  );
  React.useEffect(() => {
    if (L.length === 0) {
      return;
    }
    let t;
    let a = performance.now();
    const i = (p) => {
      const b = Math.min((p - a) / 25, 5);
      a = p;
      setL((j) =>
        j
          .map((r) => ({
            ...r,
            y: r.y - 1.5 * b,
            life: r.life - 0.02 * b,
          }))
          .filter((r) => r.life > 0),
      );
      t = requestAnimationFrame(i);
    };
    t = requestAnimationFrame(i);
    return () => cancelAnimationFrame(t);
  }, [L.length]);
  React.useEffect(() => {
    if (o === "playing" && !M) {
      FRef.current = setInterval(() => {
        setV((t) => {
          if (t <= 1) {
            return (
              clearInterval(FRef.current),
              setO("gameover"),
              playLose(),
              setR((a) => {
                const i = Math.max(a, zRef.current);
                localStorage.setItem("vocabblast_bestcombo", String(i));
                return i;
              }),
              0
            );
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (FRef.current) {
          clearInterval(FRef.current);
        }
      };
    }
  }, [o, M, playLose]);
  React.useEffect(() => {
    if (N.length === 2) {
      const [t, a] = N;
      const i = g.find((b) => b.id === t);
      const p = g.find((b) => b.id === a);
      if (i && p && i.pairId === p.pairId) {
        playCorrect();
        const b = PRef.current[t];
        const j = PRef.current[a];
        if (b) {
          const r = b.getBoundingClientRect();
          ce(r.left + r.width / 2, r.top + r.height / 2);
          setL((k) => [
            ...k,
            {
              id: Date.now() + Math.random(),
              x: r.left + r.width / 2 - 20,
              y: r.top + r.height / 2,
              text: `+${100 * (zRef.current + 1)}`,
              color: "#ff6b35",
              life: 1.8,
            },
          ]);
        }
        if (j) {
          const r = j.getBoundingClientRect();
          ce(r.left + r.width / 2, r.top + r.height / 2);
          setL((k) => [
            ...k,
            {
              id: Date.now() + Math.random() + 1000,
              x: r.left + r.width / 2 - 20,
              y: r.top + r.height / 2,
              text: `+${100 * (zRef.current + 1)}`,
              color: "#ff6b35",
              life: 1.8,
            },
          ]);
        }
        setTimeout(() => {
          setG((k) =>
            k.map((l) => {
              if (l.id === t || l.id === a) {
                return {
                  ...l,
                  state: "matched",
                };
              }
              return l;
            }),
          );
          setN([]);
          setU((k) => {
            const l = k + 1;
            zRef.current = l;
            setR((G) => {
              const Z = Math.max(G, l);
              localStorage.setItem("vocabblast_bestcombo", String(Z));
              return Z;
            });
            return l;
          });
          const r = 100 * (zRef.current + 1);
          IRef.current += r;
          setC(IRef.current);
        }, 600);
      } else {
        playWrong();
        setXe(true);
        ve();
        if (YRef.current) {
          clearInterval(YRef.current);
        }
        YRef.current = setInterval(() => {
          setD({
            x: Math.random() * 10 - 5,
            y: Math.random() * 10 - 5,
          });
        }, 40);
        setTimeout(() => {
          setXe(false);
          setD({
            x: 0,
            y: 0,
          });
          if (YRef.current) {
            clearInterval(YRef.current);
          }
        }, 500);
        setTimeout(() => {
          setG((b) =>
            b.map((j) => {
              if (j.id === t || j.id === a) {
                return {
                  ...j,
                  state: "hidden",
                };
              }
              return j;
            }),
          );
          setN([]);
          setU(0);
          zRef.current = 0;
        }, 900);
      }
    }
  }, [N, g, playCorrect, playWrong]);
  React.useEffect(() => {
    if (g.length > 0 && g.every((t) => t.state === "matched") && !M) {
      setM(true);
      if (FRef.current) {
        clearInterval(FRef.current);
      }
      je();
      playWin();
      setTimeout(() => setO("gameover"), 1500);
    }
  }, [g, M, playWin]);
  const pe = (t) => {
    playClick();
    if (!(t.state !== "hidden" || N.length >= 2 || M || o !== "playing")) {
      setG((a) =>
        a.map((i) => {
          if (i.id === t.id) {
            return {
              ...i,
              state: "revealed",
            };
          }
          return i;
        }),
      );
      setN((a) => [...a, t.id]);
    }
  };
  if (o === "select") {
    return (
      <StarfieldBackground>
        <div
          className="max-w-5xl mx-auto px-3 sm:px-4 py-6 min-h-screen"
          style={{
            perspective: "1200px",
          }}
        >
          <SoundToggles />
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/juegos"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold hover:scale-105 transform"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-8 sm:mb-10">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
              style={{
                background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                boxShadow: "0 0 50px rgba(255,214,0,0.6), 0 0 100px rgba(255,107,53,0.3)",
                animation: "vocabFloat 3s ease-in-out infinite",
              }}
            >
              <BombIcon
                size={44}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
              <div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#ff00aa,#b829dd)",
                  animation: "pulseGlow 2s infinite",
                }}
              >
                <SparklesIcon size={10} className="text-white" />
              </div>
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-black mb-3 tracking-tight"
              style={{
                background: "linear-gradient(135deg,#ffd600 0%,#ff6b35 40%,#ff3860 70%,#ff00aa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 50px rgba(255,214,0,.5))",
                animation: "vocabTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Vocabulario Blast
            </h1>
            <p className="text-white/50 text-base sm:text-lg font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {O && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold border border-red-400/30"
                style={{
                  background: "rgba(255,68,68,.12)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,.2)",
                }}
              >
                {O}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            style={{
              perspective: "1200px",
            }}
          >
            <button
              onClick={() => {
                setO_1("");
                A(null);
              }}
              className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left cursor-pointer block overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.6))",
                border: "1px solid rgba(255,255,255,.15)",
                backdropFilter: "blur(14px)",
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={(t) => {
                t.currentTarget.style.transform = "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                t.currentTarget.style.boxShadow =
                  "0 0 60px rgba(255,214,0,.35),0 25px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.1)";
                t.currentTarget.style.borderColor = "#ffd60060";
              }}
              onMouseLeave={(t) => {
                t.currentTarget.style.transform = "";
                t.currentTarget.style.boxShadow = "";
                t.currentTarget.style.borderColor = "rgba(255,255,255,.15)";
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, #ffd60000, #ffd600, #ff6b35, #ffd60000)",
                  backgroundSize: "300% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 20px rgba(255,0,170,.3)",
                }}
              >
                <LayersIcon size={26} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base sm:text-lg mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.8)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Gamepad2Icon size={20} className="text-white/30" />
              </div>
            </button>
            {fe.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setO_1("");
                  A(t.id);
                }}
                className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left cursor-pointer block overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.6))",
                  border: "1px solid rgba(255,255,255,.15)",
                  backdropFilter: "blur(14px)",
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={(a) => {
                  a.currentTarget.style.transform =
                    "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                  a.currentTarget.style.boxShadow = `0 0 60px ${t.color}35,0 25px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.1)`;
                  a.currentTarget.style.borderColor = `${t.color}60`;
                }}
                onMouseLeave={(a) => {
                  a.currentTarget.style.transform = "";
                  a.currentTarget.style.boxShadow = "";
                  a.currentTarget.style.borderColor = "rgba(255,255,255,.15)";
                }}
              >
                <div
                  className="absolute -inset-[2px] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, ${t.color}00, ${t.color}, ${t.color}00)`,
                    backgroundSize: "300% 100%",
                    animation: "borderRotate 3s linear infinite",
                    zIndex: -1,
                  }}
                />
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 relative"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 20px ${t.color}30`,
                  }}
                >
                  <BookOpenIcon size={26} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base sm:text-lg mb-1">{t.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${t.color}cc`,
                  }}
                >
                  {t.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{t.vocabularioCount} palabras / 词</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Gamepad2Icon size={20} className="text-white/30" />
                </div>
              </button>
            ))}
          </div>
          <div
            className="fixed bottom-4 right-4 z-50 pointer-events-none"
            style={{
              animation: "mascotFloat 4s ease-in-out infinite",
            }}
          >
            <DeComponent expression={expression} />
          </div>
          <style>{`
            @keyframes vocabFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
            @keyframes vocabTitlePulse { from{filter:drop-shadow(0 0 40px rgba(255,214,0,.5)) brightness(1)} to{filter:drop-shadow(0 0 90px rgba(255,214,0,.7)) brightness(1.2)} }
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
            @keyframes mascotFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-6px) rotate(2deg)} 75%{transform:translateY(-4px) rotate(-2deg)} }
            @keyframes pulseGlow { 0%,100%{box-shadow:0 0 5px rgba(255,0,170,.4)} 50%{box-shadow:0 0 20px rgba(255,0,170,.8)} }
            @keyframes mascot-sparkle { 0%,100%{opacity:1} 50%{opacity:0.3} }
            @keyframes mascot-sparkle-2 { 0%,100%{opacity:0.6} 50%{opacity:0.1} }
            @keyframes mascot-sparkle-3 { 0%,100%{opacity:0.8} 50%{opacity:0.2} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div
        className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen relative"
        style={{
          transform: xe ? `translate(${D.x}px, ${D.y}px)` : "none",
          transition: "transform 0.05s",
        }}
      >
        <SoundToggles />
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {Array.from({
            length: 40,
          }).map((t, a) => (
            <div
              key={`vb-particle-${a}`}
              className="absolute rounded-full animate-bg-particle"
              style={{
                left: `${(a * 37) % 100}%`,
                top: `${(a * 23) % 100}%`,
                width: `${2 + (a % 3)}px`,
                height: `${2 + (a % 3)}px`,
                background: ["#ffd600", "#ff6b35", "#ff00aa", "#39ff14", "#00d4ff"][a % 5],
                opacity: 0.15 + ((a * 7) % 5) * 0.08,
                animationDelay: `${(a * 0.3) % 5}s`,
                animationDuration: `${3 + (a % 4)}s`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            onClick={() => playClick()}
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold hover:scale-105 transform"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setO("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.18)",
                color: "#fff",
                boxShadow: "0 4px 15px rgba(0,0,0,.2)",
              }}
            >
              <LayersIcon size={12} /> Cambiar módulo
            </button>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1px solid rgba(255,214,0,.25)",
                color: "#ffd600",
                boxShadow: "0 0 15px rgba(255,214,0,.15)",
              }}
            >
              <ZapIcon size={12} /> {C}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,107,53,.12)",
                border: "1px solid rgba(255,107,53,.25)",
                color: "#ff6b35",
                boxShadow: "0 0 15px rgba(255,107,53,.15)",
              }}
            >
              <FlameIcon size={12} /> x{u}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: v <= 10 ? "rgba(255,68,68,.15)" : "rgba(255,214,0,.08)",
                border: `1px solid ${v <= 10 ? "rgba(255,68,68,.3)" : "rgba(255,214,0,.2)"}`,
                color: v <= 10 ? "#ff4444" : "#ffd600",
                boxShadow: v <= 10 ? "0 0 15px rgba(255,68,68,.3)" : "0 0 15px rgba(255,214,0,.1)",
                animation: v <= 10 ? "timerPulse 0.6s infinite" : "none",
              }}
            >
              <TimerIcon size={12} /> {v}s
            </div>
          </div>
        </div>
        <div className="text-center mb-4 sm:mb-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tight"
            style={{
              background: "linear-gradient(135deg,#ffd600,#ff6b35,#ff3860)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(255,214,0,.4))",
            }}
          >
            <BombIcon
              size={28}
              className="inline mr-2"
              style={{
                color: "#ffd600",
                filter: "drop-shadow(0 0 8px rgba(255,214,0,.6))",
              }}
            />
            Vocabulario Blast
          </h1>
          <p className="text-white/40 text-xs sm:text-sm font-medium">
            Empareja español y chino / 配对西班牙语和中文
          </p>
        </div>
        <div className="max-w-lg mx-auto w-full mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider"
              style={{
                color: "#ffd600",
              }}
            >
              Tiempo
            </span>
            <span
              className="text-[10px] sm:text-xs font-bold tabular-nums"
              style={{
                color: v <= 10 ? "#ff4444" : "rgba(207,216,255,.5)",
              }}
            >
              {v}s
            </span>
          </div>
          <div
            className="h-3 sm:h-4 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,.06)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.05)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{
                width: `${(v / 60) * 100}%`,
                background:
                  v <= 10
                    ? "linear-gradient(90deg,#ff4444,#ff6b35,#ff3860)"
                    : "linear-gradient(90deg,#ffd600,#ff6b35,#ff3860)",
                boxShadow:
                  v <= 10
                    ? "0 0 20px rgba(255,68,68,.6)"
                    : "0 0 20px rgba(255,214,0,.5), 0 0 40px rgba(255,107,53,.3)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
                  animation: "shimmer 1.5s linear infinite",
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(180deg,rgba(255,255,255,.2),transparent)",
                }}
              />
            </div>
          </div>
        </div>
        {u > 1 && (
          <div className="text-center mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black"
              style={{
                background: "linear-gradient(135deg,rgba(255,107,53,.2),rgba(255,56,96,.2))",
                border: "1px solid rgba(255,107,53,.4)",
                color: "#ff6b35",
                boxShadow: "0 0 25px rgba(255,107,53,.3), 0 0 50px rgba(255,56,96,.15)",
                animation: "comboPulse 0.8s ease-in-out infinite",
              }}
            >
              <FlameIcon size={14} className="animate-flame" /> ¡Combo x{u}!{" "}
              <span className="text-lg">🔥</span>
            </span>
          </div>
        )}
        <div className="flex justify-center relative">
          <div
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full"
            style={{
              maxWidth: "900px",
            }}
          >
            {g.map((t, a) => {
              const i = t.state === "revealed" || t.state === "matched";
              const p = t.state === "matched";
              return (
                <button
                  key={t.id}
                  ref={(b) => (PRef.current[t.id] = b)}
                  onClick={() => pe(t)}
                  disabled={i || N.length >= 2 || M}
                  className="relative flex items-center justify-center font-black transition-all duration-500 disabled:pointer-events-none cursor-pointer select-none group"
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "14px",
                    minHeight: "80px",
                    background: p
                      ? "linear-gradient(135deg, rgba(255,107,53,.35), rgba(255,56,96,.25))"
                      : i
                        ? "linear-gradient(135deg, rgba(14,22,64,.95), rgba(5,8,27,.9))"
                        : "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",
                    border: p
                      ? "2px solid rgba(255,107,53,.7)"
                      : i
                        ? "2px solid rgba(255,214,0,.6)"
                        : "2px solid rgba(255,255,255,.12)",
                    boxShadow: p
                      ? "0 0 35px rgba(255,107,53,.5), 0 0 70px rgba(255,56,96,.3), inset 0 1px 0 rgba(255,255,255,.15)"
                      : i
                        ? "0 0 30px rgba(255,214,0,.4), 0 0 60px rgba(255,107,53,.2), inset 0 1px 0 rgba(255,255,255,.15)"
                        : "0 8px 30px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.08)",
                    color: p ? "#ff6b35" : i ? (t.isSpanish ? "#ffd600" : "#00d4ff") : "transparent",
                    transform: i ? "rotateY(180deg)" : "rotateY(0)",
                    transformStyle: "preserve-3d",
                    animation: p ? "blastMatch 0.6s ease" : `blastEntrance 0.5s ease-out ${a * 0.04}s both`,
                    opacity: p ? 0.75 : 1,
                    transition: "box-shadow 0.3s, border 0.3s, background 0.3s",
                  }}
                >
                  <span
                    className="relative z-10"
                    style={{
                      transform: i ? "rotateY(180deg)" : "none",
                      transition: "transform 0.5s",
                      fontSize: "clamp(12px, 2.5vw, 20px)",
                    }}
                  >
                    {i ? t.text : "?"}
                  </span>
                  {!i && (
                    <>
                      <div
                        className="absolute inset-0 rounded-[12px]"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,.06), transparent)",
                          boxShadow: "inset 0 1px 1px rgba(255,255,255,.08)",
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,214,0,.12), rgba(255,107,53,.06))",
                          boxShadow: "inset 0 0 25px rgba(255,214,0,.08), 0 0 20px rgba(255,214,0,.15)",
                        }}
                      />
                    </>
                  )}
                  {p && (
                    <div
                      className="absolute inset-0 rounded-[12px] pointer-events-none"
                      style={{
                        animation: "matchGlow 2s ease-in-out infinite",
                        background:
                          "radial-gradient(circle at center, rgba(255,107,53,.25), transparent 70%)",
                      }}
                    />
                  )}
                  {i && !p && (
                    <div
                      className="absolute inset-0 rounded-[12px] pointer-events-none"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,.08), transparent 50%)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {L.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none font-black text-base sm:text-lg"
              style={{
                left: t.x,
                top: t.y,
                color: t.color,
                textShadow: `0 0 15px ${t.color}, 0 0 30px ${t.color}80`,
                opacity: t.life,
                transform: `translateZ(50px) scale(${1 + (1.5 - t.life) * 0.3})`,
                animation: "floatScore 0.5s ease-out",
              }}
            >
              {t.text}
            </div>
          ))}
        </div>
        {o === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div
              className="text-center p-6 sm:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.9),rgba(5,8,27,.7))",
                border: "1px solid rgba(255,214,0,.25)",
                boxShadow: "0 0 80px rgba(255,214,0,.2), 0 25px 80px rgba(0,0,0,.6)",
                animation: "overlayPop 0.6s cubic-bezier(.2,.9,.2,1)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff6b35,#ff3860)",
                  filter: "blur(30px)",
                  animation: "glowRotate 4s linear infinite",
                }}
              />
              <div className="absolute inset-0 rounded-[26px] overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,214,0,.05), rgba(255,107,53,.05), rgba(255,56,96,.05))",
                    animation: "shimmer 3s linear infinite",
                  }}
                />
              </div>
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-3xl sm:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff6b35,#ff3860)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.4))",
                }}
              >
                {M ? "¡Victoria!" : "¡Tiempo!"}
              </h2>
              <p className="text-white/50 text-sm mb-6">{M ? "¡Completado!" : "时间到！"}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 sm:p-4 rounded-xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,214,0,.12), rgba(255,107,53,.08))",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 20px rgba(255,214,0,.1)",
                  }}
                >
                  <ZapIcon
                    size={18}
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
                    className="text-xl sm:text-2xl font-black"
                    style={{
                      color: "#ffd600",
                    }}
                  >
                    {C}
                  </p>
                </div>
                <div
                  className="p-3 sm:p-4 rounded-xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,0,170,.12), rgba(184,41,221,.08))",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 20px rgba(255,0,170,.1)",
                  }}
                >
                  <TrophyIcon
                    size={18}
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
                    Mejor Combo
                  </p>
                  <p
                    className="text-xl sm:text-2xl font-black"
                    style={{
                      color: "#ff00aa",
                    }}
                  >
                    {R}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    playClick();
                    A(null);
                  }}
                  className="px-6 sm:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
                  style={{
                    background: "linear-gradient(135deg,#ffd600,#ff6b35,#ff3860)",
                    boxShadow: "0 0 30px rgba(255,214,0,.4), 0 10px 30px rgba(0,0,0,.3)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
              </div>
              <P currentGameId="vocab-blast" />
            </div>
          </div>
        )}
        <div
          className="fixed bottom-4 right-4 z-50 pointer-events-none"
          style={{
            animation: "mascotFloat 4s ease-in-out infinite",
          }}
        >
          <div className="relative">
            <DeComponent expression={expression} />
            {u >= 3 && (
              <div
                className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #ff3860)",
                  boxShadow: "0 0 10px rgba(255,107,53,.5)",
                  animation: "pulseGlow 1s infinite",
                }}
              >
                {u}
              </div>
            )}
          </div>
        </div>
        <style>{`
          @keyframes blastMatch { 0%{transform:scale(1) rotateY(180deg)} 40%{transform:scale(1.2) rotateY(180deg)} 60%{transform:scale(1.1) rotateY(180deg)} 100%{transform:scale(1) rotateY(180deg)} }
          @keyframes blastEntrance { from{transform:scale(0) rotateY(0);opacity:0} to{transform:scale(1) rotateY(0);opacity:1} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes comboPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
          @keyframes overlayPop { 0%{transform:scale(0.7) rotateX(-10deg);opacity:0} 100%{transform:scale(1) rotateX(0);opacity:1} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0) scale(1)} 50%{transform:rotateY(180deg) scale(1.15)} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
          @keyframes timerPulse { 0%,100%{box-shadow:0 0 15px rgba(255,68,68,.3)} 50%{box-shadow:0 0 30px rgba(255,68,68,.6)} }
          @keyframes matchGlow { 0%,100%{opacity:0.5} 50%{opacity:1} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-8px) rotate(3deg)} 75%{transform:translateY(-4px) rotate(-3deg)} }
          @keyframes floatScore { from{transform:translateY(10px) scale(0.8)} to{transform:translateY(0) scale(1)} }
          @keyframes glowRotate { 0%{filter:blur(30px) hue-rotate(0deg)} 100%{filter:blur(30px) hue-rotate(360deg)} }
          @keyframes pulseGlow { 0%,100%{box-shadow:0 0 5px rgba(255,0,170,.4)} 50%{box-shadow:0 0 25px rgba(255,0,170,.8)} }
          @keyframes mascot-sparkle { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyframes mascot-sparkle-2 { 0%,100%{opacity:0.6} 50%{opacity:0.1} }
          @keyframes mascot-sparkle-3 { 0%,100%{opacity:0.8} 50%{opacity:0.2} }
          @keyframes bg-particle { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0 } 20% { opacity: 1 } 80% { opacity: 0.5 } 100% { transform: translateY(-60px) translateX(20px) scale(0); opacity: 0 } }
          .animate-bg-particle { animation: bg-particle 4s ease-in-out infinite; }
          .animate-flame { animation: flameFlicker 0.5s ease-in-out infinite; }
          @keyframes flameFlicker { 0%,100%{transform:scale(1) rotate(0)} 25%{transform:scale(1.15) rotate(-5deg)} 75%{transform:scale(1.1) rotate(5deg)} }
          @media (max-width: 640px) {
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { FeComponent as default };
