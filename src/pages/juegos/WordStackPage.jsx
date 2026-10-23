import {
  BookOpenIcon,
  ZapIcon,
  TrophyIcon,
  ArrowLeftIcon,
  LayersIcon,
  ArrowDownIcon,
  BoxIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function le(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function oe(espanol) {
  if (espanol.length <= 4) {
    return espanol.split("");
  }
  const i = Math.ceil(espanol.length / 3);
  const l = [];
  for (let d = 0; d < espanol.length; d += i) {
    l.push(espanol.slice(d, d + i));
  }
  return l;
}
function q(o) {
  const i = [...o];
  for (let l = i.length - 1; l > 0; l--) {
    const d = Math.floor(Math.random() * (l + 1));
    [i[l], i[d]] = [i[d], i[l]];
  }
  return i;
}
function ie(o, i) {
  const l = ["#ffd600", "#ff8a2a", "#ff00aa", "#b829dd", "#39ecff", "#46ff9a"];
  for (let d = 0; d < 40; d++) {
    const r = document.createElement("div");
    const x = 4 + Math.random() * 8;
    r.style.cssText = `position:fixed;left:${o}px;top:${i}px;width:${x}px;height:${x}px;border-radius:${Math.random() > 0.5 ? "50%" : "2px"};background:${l[d % l.length]};pointer-events:none;z-index:9999;box-shadow:0 0 10px ${l[d % l.length]};`;
    document.body.appendChild(r);
    const b = Math.random() * Math.PI * 2;
    const g = 2 + Math.random() * 10;
    let v = Math.cos(b) * g;
    let p = Math.sin(b) * g;
    let f = 1;
    let m = 0;
    let u = (Math.random() - 0.5) * 20;
    const h = () => {
      v *= 0.96;
      p *= 0.96;
      p += 0.5;
      r.style.left = `${parseFloat(r.style.left) + v}px`;
      r.style.top = `${parseFloat(r.style.top) + p}px`;
      m += u;
      r.style.transform = `rotate(${m}deg) scale(${f})`;
      f -= 0.015;
      r.style.opacity = String(f);
      if (f > 0) {
        requestAnimationFrame(h);
      } else {
        r.remove();
      }
    };
    requestAnimationFrame(h);
  }
}
function Q(o, i) {
  const l = ["#ffd600", "#ff8a2a", "#ff00aa", "#b829dd", "#39ecff", "#46ff9a", "#ffffff"];
  for (let d = 0; d < 80; d++) {
    const r = document.createElement("div");
    const x = 6 + Math.random() * 8;
    const b = 6 + Math.random() * 8;
    const g = l[Math.floor(Math.random() * l.length)];
    r.style.cssText = `position:fixed;left:${o}px;top:${i}px;width:${x}px;height:${b}px;border-radius:${Math.random() > 0.5 ? "50%" : "2px"};background:${g};pointer-events:none;z-index:10000;box-shadow:0 0 12px ${g};`;
    document.body.appendChild(r);
    const v = Math.random() * Math.PI * 2;
    const p = 3 + Math.random() * 14;
    let f = Math.cos(v) * p;
    let m = Math.sin(v) * p - 4;
    let u = 1;
    let h = 0;
    let S = (Math.random() - 0.5) * 25;
    const k = () => {
      f *= 0.97;
      m *= 0.97;
      m += 0.25;
      r.style.left = `${parseFloat(r.style.left) + f}px`;
      r.style.top = `${parseFloat(r.style.top) + m}px`;
      h += S;
      r.style.transform = `rotate(${h}deg) scale(${0.5 + u * 0.5})`;
      u -= 0.008;
      r.style.opacity = String(u);
      if (u > 0) {
        requestAnimationFrame(k);
      } else {
        r.remove();
      }
    };
    requestAnimationFrame(k);
  }
}
function DComponent({ expression }) {
  const i = {
    happy: (
      <g>
        <path d="M22 30 Q28 24 34 30" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M46 30 Q52 24 58 30" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    ),
    sad: (
      <g>
        <path d="M22 28 Q28 34 34 28" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M46 28 Q52 34 58 28" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="28" cy="38" r="2.5" fill="#39ecff" opacity="0.8">
          <animate attributeName="cy" values="38;42;38" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="56" cy="38" r="2.5" fill="#39ecff" opacity="0.8">
          <animate attributeName="cy" values="38;42;38" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    ),
    excited: (
      <g>
        <circle cx="28" cy="30" r="5" fill="#1a1a2e" />
        <circle cx="30" cy="28" r="2" fill="white" />
        <circle cx="54" cy="30" r="5" fill="#1a1a2e" />
        <circle cx="56" cy="28" r="2" fill="white" />
        <circle cx="20" cy="22" r="3" fill="#ff00aa" opacity="0.7">
          <animate attributeName="r" values="3;5;3" dur="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="22" r="3" fill="#ff00aa" opacity="0.7">
          <animate attributeName="r" values="3;5;3" dur="0.7s" repeatCount="indefinite" />
        </circle>
      </g>
    ),
    neutral: (
      <g>
        <circle cx="28" cy="30" r="4.5" fill="#1a1a2e" />
        <circle cx="30" cy="28" r="1.5" fill="white" />
        <circle cx="54" cy="30" r="4.5" fill="#1a1a2e" />
        <circle cx="56" cy="28" r="1.5" fill="white" />
      </g>
    ),
  };
  const l = {
    happy: (
      <path d="M32 44 Q40 52 48 44" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
    ),
    sad: <path d="M32 48 Q40 42 48 48" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />,
    excited: <ellipse cx="40" cy="46" rx="6" ry="8" fill="#1a1a2e" />,
    neutral: <line x1="34" y1="46" x2="46" y2="46" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />,
  };
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none mascot-float"
      style={{
        width: 100,
        height: 100,
      }}
    >
      <svg
        viewBox="0 0 80 80"
        width="100"
        height="100"
        style={{
          filter: "drop-shadow(0 0 15px rgba(255,0,170,0.4)) drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
        }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd600" />
            <stop offset="100%" stopColor="#ff8a2a" />
          </linearGradient>
          <linearGradient id="earGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8a2a" />
            <stop offset="100%" stopColor="#ff00aa" />
          </linearGradient>
        </defs>
        <g>
          <ellipse cx="20" cy="22" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(-20 20 22)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-20 20 22;-10 20 22;-20 20 22"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="60" cy="22" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(20 60 22)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="20 60 22;10 60 22;20 60 22"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
          <circle cx="40" cy="42" r="28" fill="url(#bodyGrad)" />
          <circle cx="28" cy="38" r="4" fill="#ff00aa" opacity="0.35" />
          <circle cx="52" cy="38" r="4" fill="#ff00aa" opacity="0.35" />
          {i[expression]}
          {l[expression]}
        </g>
        {expression === "excited" && (
          <g>
            <polygon points="10,10 14,18 6,18" fill="#ffd600">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,-4; 0,0"
                dur="0.4s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon points="70,10 74,18 66,18" fill="#ffd600">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,-4; 0,0"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </polygon>
          </g>
        )}
      </svg>
    </div>
  );
}
function UeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [x, setX] = React.useState("select");
  const [g, setG] = React.useState([]);
  const [p, setP] = React.useState(0);
  const [m, setM] = React.useState([]);
  const [h, setH] = React.useState([]);
  const [k, setK] = React.useState(0);
  const [W, setW] = React.useState(0);
  const [_, set_] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordstack_best") || "0");
    } catch {
      return 0;
    }
  });
  const [F, setF] = React.useState("");
  const [H, setH_1] = React.useState(false);
  const [de, setDe] = React.useState("none");
  const [expression, setExpression] = React.useState("neutral");
  const U = g_1();
  const XRef = React.useRef(null);
  const Z = React.useCallback((a) => {
    playClick();
    let t = a ? a_1(a) : a_1();
    if (t.length === 0) {
      setF(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const n = q(
      t
        .filter((s) => s.espanol && s.chino)
        .map((s) => {
          const espanol = le(s.espanol);
          return {
            espanol,
            chino: s.chino,
            parts: oe(espanol),
          };
        })
        .filter((s) => s.espanol.length >= 3 && s.espanol.length <= 12),
    );
    if (n.length === 0) {
      setF(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    setG(n);
    setP(0);
    setK(0);
    setW(0);
    setF("");
    setX("playing");
    setExpression("happy");
  }, []);
  const w = g[p];
  React.useEffect(() => {
    if (x === "playing" && w) {
      const a = w.parts.map((text, n) => ({
        id: n,
        text,
        correctIndex: n,
        selected: false,
        fallen: false,
      }));
      setM(q(a));
      setH([]);
      setDe("none");
      setExpression("happy");
    }
  }, [p, x, w]);
  React.useEffect(() => {
    if (x === "won") {
      setExpression("excited");
      setTimeout(() => {
        if (typeof window !== "undefined") {
          Q(window.innerWidth / 2, window.innerHeight / 2);
        }
      }, 300);
    }
  }, [x]);
  const K = (a) => {
    if (x !== "playing" || a.selected || a.fallen) {
      return;
    }
    playClick();
    const h_length = h.length;
    if (a.correctIndex === h_length) {
      playCorrect();
      setDe("correct");
      setExpression("excited");
      setTimeout(() => setExpression("happy"), 800);
      setM((n) =>
        n.map((s) => {
          if (s.id === a.id) {
            return {
              ...s,
              selected: true,
            };
          }
          return s;
        }),
      );
      setH((n) => [...n, a.id]);
      if (XRef.current) {
        const n = XRef.current.getBoundingClientRect();
        Q(n.left + n.width / 2, n.top + n.height / 2 - 40);
      }
      if (h_length === m.length - 1) {
        setK((n) => n + 100 + W * 10);
        setW((n) => {
          const s = n + 1;
          set_((y) => {
            const A = Math.max(y, s);
            localStorage.setItem("wordstack_best", String(A));
            return A;
          });
          return s;
        });
        setTimeout(() => {
          if (p < g.length - 1) {
            setP((n) => n + 1);
          } else {
            playWin();
            setX("won");
          }
        }, 900);
      }
    } else {
      playWrong();
      setH_1(true);
      setDe("wrong");
      setExpression("sad");
      setTimeout(() => setExpression("happy"), 1200);
      setW(0);
      const n = document.getElementById(`block-${a.id}`);
      if (n) {
        const s = n.getBoundingClientRect();
        ie(s.left + s.width / 2, s.top + s.height / 2);
      }
      setM((s) =>
        s.map((y) => {
          if (y.id === a.id) {
            return {
              ...y,
              fallen: true,
            };
          }
          return y;
        }),
      );
      setTimeout(() => setH_1(false), 500);
      setTimeout(() => {
        if (p < g.length - 1) {
          setP((s) => s + 1);
        } else {
          playWin();
          setX("won");
        }
      }, 1400);
    }
  };
  if (x === "select") {
    return (
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {Array.from({
              length: 12,
            }).map((a, t) => (
              <div
                key={t}
                className="absolute rounded-full"
                style={{
                  width: `${4 + (t % 3) * 2}px`,
                  height: `${4 + (t % 3) * 2}px`,
                  left: `${t * 8.3}%`,
                  top: `${t * 7.1 + 5}%`,
                  background:
                    t % 3 === 0
                      ? "rgba(0,212,255,0.5)"
                      : t % 3 === 1
                        ? "rgba(255,0,170,0.4)"
                        : "rgba(255,214,0,0.4)",
                  boxShadow: `0 0 10px ${t % 3 === 0 ? "rgba(0,212,255,0.6)" : t % 3 === 1 ? "rgba(255,0,170,0.5)" : "rgba(255,214,0,0.5)"}`,
                  animation: `particleFloat ${4 + t * 0.7}s ease-in-out infinite`,
                  animationDelay: `${t * 0.3}s`,
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center justify-center mb-4 relative">
              <div
                className="absolute -inset-6 rounded-full opacity-50 animate-pulse-slow"
                style={{
                  background: "radial-gradient(circle, rgba(255,214,0,0.4) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute -inset-2 rounded-2xl opacity-30 animate-neon-pulse-gold"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff8a2a)",
                  filter: "blur(12px)",
                }}
              />
              <LayersIcon
                size={48}
                className="text-[#ffd600] relative z-10"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,0.6))",
                }}
              />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3 tracking-tight"
              style={{
                textShadow:
                  "0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(255,0,170,0.3), 0 0 120px rgba(255,214,0,0.2)",
              }}
            >
              Word Stack
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {F && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,0.15)",
                  border: "1px solid rgba(255,68,68,0.4)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,0.2)",
                }}
              >
                {F}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10"
            style={{
              perspective: "1200px",
            }}
          >
            <button
              onClick={() => {
                playClick();
                setF("");
                Z(null);
              }}
              className="group relative rounded-2xl p-6 text-left transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 overflow-hidden select-card"
              style={{
                background: "rgba(14,22,64,0.7)",
                border: "1px solid rgba(255,0,170,0.35)",
                boxShadow:
                  "0 0 30px rgba(255,0,170,0.1), 0 8px 32px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.2)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,0.08), rgba(184,41,221,0.08))",
                }}
              />
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  filter: "blur(12px)",
                }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 25px rgba(255,0,170,0.4), 0 4px 12px rgba(0,0,0,0.3)",
                  transform: "translateZ(20px)",
                }}
              >
                <LayersIcon size={28} className="text-white" />
              </div>
              <h3
                className="text-white font-black text-lg mb-1 relative z-10"
                style={{
                  transform: "translateZ(15px)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1 relative z-10"
                style={{
                  color: "rgba(255,0,170,0.8)",
                  transform: "translateZ(15px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40 relative z-10"
                style={{
                  transform: "translateZ(15px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
            </button>
            {U.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  playClick();
                  setF("");
                  Z(a.id);
                }}
                className="group relative rounded-2xl p-6 text-left transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 overflow-hidden select-card"
                style={{
                  background: "rgba(14,22,64,0.7)",
                  border: `1px solid ${a.color}50`,
                  boxShadow: `0 0 30px ${a.color}15, 0 8px 32px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.2)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}12, ${a.color}08)`,
                  }}
                />
                <div
                  className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
                    filter: "blur(12px)",
                  }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
                    boxShadow: `0 0 25px ${a.color}40, 0 4px 12px rgba(0,0,0,0.3)`,
                    transform: "translateZ(20px)",
                  }}
                >
                  <BookOpenIcon size={28} className="text-white" />
                </div>
                <h3
                  className="text-white font-black text-lg mb-1 relative z-10"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  {a.titulo}
                </h3>
                <p
                  className="text-xs font-medium mb-1 relative z-10"
                  style={{
                    color: `${a.color}cc`,
                    transform: "translateZ(15px)",
                  }}
                >
                  {a.tituloChino}
                </p>
                <p
                  className="text-xs font-medium text-white/40 relative z-10"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  {a.vocabularioCount} palabras / 词
                </p>
              </button>
            ))}
          </div>
        </div>
        <DComponent expression="neutral" />
        <style>{`
          @keyframes mascot-float { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
          .mascot-float { animation: mascot-float 3s ease-in-out infinite; }
          @keyframes pulse-slow { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.15); opacity: 0.6; } }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
          @keyframes neon-pulse-gold { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
          .animate-neon-pulse-gold { animation: neon-pulse-gold 2s ease-in-out infinite; }
          @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
          .animate-shake { animation: shake 0.5s ease; }
          @keyframes particleFloat { 0%,100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.4; } 25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.8; } 50% { transform: translateY(-10px) translateX(-5px) scale(0.9); opacity: 0.5; } 75% { transform: translateY(-30px) translateX(15px) scale(1.1); opacity: 0.7; } }
          .select-card:hover { transform: translateY(-8px) rotateX(5deg) rotateY(-2deg) scale(1.03); }
        `}</style>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="max-w-4xl mx-auto px-4 py-4 min-h-screen relative z-10">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
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
                setX("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            >
              <BoxIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5 relative overflow-hidden"
              style={{
                background: "rgba(255,214,0,0.12)",
                border: "1px solid rgba(255,214,0,0.3)",
                color: "#ffd600",
                boxShadow: "0 0 20px rgba(255,214,0,0.2), 0 4px 12px rgba(0,0,0,0.2)",
                transform: "translateZ(10px)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 animate-neon-pulse-gold"
                style={{
                  background: "radial-gradient(circle, rgba(255,214,0,0.2), transparent)",
                }}
              />
              <ZapIcon size={12} /> {k}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5 relative overflow-hidden"
              style={{
                background: "rgba(255,0,170,0.12)",
                border: "1px solid rgba(255,0,170,0.3)",
                color: "#ff00aa",
                boxShadow: "0 0 20px rgba(255,0,170,0.2), 0 4px 12px rgba(0,0,0,0.2)",
                transform: "translateZ(10px)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 animate-neon-pulse-magenta"
                style={{
                  background: "radial-gradient(circle, rgba(255,0,170,0.2), transparent)",
                }}
              />
              <TrophyIcon size={12} /> {W}
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-5xl font-black mb-2 tracking-tight"
            style={{
              background: "linear-gradient(135deg,#ffd600,#ff8a2a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,214,0,0.4))",
            }}
          >
            Word Stack
          </h1>
          <p className="text-white/40 text-xs font-medium">
            Selecciona los bloques en el orden correcto / 按正确顺序选择方块
          </p>
        </div>
        <div
          className="max-w-sm mx-auto mb-5"
          style={{
            perspective: "600px",
          }}
        >
          <div
            className="h-3 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 relative overflow-hidden"
              style={{
                width: `${(p / g.length) * 100}%`,
                background: "linear-gradient(90deg,#ffd600,#ff8a2a)",
                boxShadow: "0 0 20px rgba(255,214,0,0.5)",
              }}
            >
              <div
                className="absolute inset-0 animate-progress-shine"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
            </div>
          </div>
          <p
            className="text-center text-xs mt-1.5 font-bold tracking-wider"
            style={{
              color: "rgba(207,216,255,0.5)",
            }}
          >
            {p + 1} / {g.length}
          </p>
        </div>
        {w && (
          <div className="text-center mb-6">
            <div
              className="relative inline-block"
              style={{
                perspective: "800px",
              }}
            >
              <div
                className="absolute -inset-1 rounded-2xl opacity-30 animate-pulse-slow"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  filter: "blur(12px)",
                }}
              />
              <div
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-lg md:text-xl"
                style={{
                  background: "linear-gradient(180deg, rgba(14,22,64,0.95), rgba(5,8,27,0.8))",
                  border: "1px solid rgba(255,0,170,0.4)",
                  color: "#ffd600",
                  boxShadow:
                    "0 0 30px rgba(255,0,170,0.2), 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                  textShadow: "0 0 15px rgba(255,0,170,0.5)",
                  backdropFilter: "blur(10px)",
                  transform: "translateZ(20px) rotateX(-3deg)",
                }}
              >
                <BoxIcon
                  size={20}
                  style={{
                    color: "#ff00aa",
                    filter: "drop-shadow(0 0 5px rgba(255,0,170,0.5))",
                  }}
                />
                <span>Pista: {w.chino}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center mb-2">
          <div
            className="relative"
            style={{
              width: "min(100%, 400px)",
              height: 24,
            }}
          >
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full rounded-full"
              style={{
                background: "linear-gradient(180deg, #39ecff, #0077ff)",
                boxShadow: "0 0 15px rgba(57,236,255,0.5), 0 0 30px rgba(57,236,255,0.2)",
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center animate-crane-pulse"
              style={{
                borderColor: "#39ecff",
                boxShadow: "0 0 20px rgba(57,236,255,0.4), 0 0 40px rgba(57,236,255,0.15)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#39ecff] animate-pulse" />
            </div>
            <div
              className="absolute top-2 left-0 right-0 h-px"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(57,236,255,0.2) 0px, rgba(57,236,255,0.2) 8px, transparent 8px, transparent 16px)",
              }}
            />
          </div>
        </div>
        <div
          className="flex justify-center mb-6"
          style={{
            perspective: "800px",
          }}
        >
          <div className="relative" ref={XRef}>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(70,255,154,0.2), rgba(0,212,255,0.2), rgba(70,255,154,0.2))",
                boxShadow: "0 0 20px rgba(70,255,154,0.3), 0 8px 24px rgba(0,0,0,0.4)",
                transform: "rotateX(60deg) translateZ(-10px)",
              }}
            />
            <div
              className="flex justify-center gap-2 min-h-[70px]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {h.map((a, t) => {
                const n = m.find((s) => s.id === a);
                return (
                  <div
                    key={t}
                    className="w-14 h-14 md:w-16 md:h-14 flex items-center justify-center text-base md:text-lg font-black rounded-xl transition-all duration-300 relative animate-stack-bounce"
                    style={{
                      background: "linear-gradient(135deg, rgba(70,255,154,0.25), rgba(0,212,255,0.15))",
                      border: "1px solid rgba(70,255,154,0.6)",
                      color: "#46ff9a",
                      boxShadow: `0 0 25px rgba(70,255,154,0.35), 0 ${4 + t * 2}px ${8 + t * 4}px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
                      transform: `translateY(${-t * 5}px) translateZ(${15 + t * 8}px) rotateX(-5deg)`,
                      transformStyle: "preserve-3d",
                      textShadow: "0 0 10px rgba(70,255,154,0.6)",
                      animationDelay: `${t * 0.05}s`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-30"
                      style={{
                        background: "linear-gradient(135deg, rgba(70,255,154,0.4), transparent)",
                      }}
                    />
                    <span className="relative z-10">{n?.text}</span>
                    <div
                      className="absolute inset-x-0 -top-1 h-1 rounded-t-xl"
                      style={{
                        background: "linear-gradient(90deg, rgba(70,255,154,0.4), rgba(0,212,255,0.3))",
                        transform: "translateY(-100%) rotateX(90deg)",
                        transformOrigin: "bottom",
                      }}
                    />
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                      style={{
                        background: "linear-gradient(180deg, rgba(70,255,154,0.35), rgba(0,212,255,0.25))",
                        transform: "translateX(-100%) rotateY(-90deg)",
                        transformOrigin: "right",
                      }}
                    />
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 rounded-r-xl"
                      style={{
                        background: "linear-gradient(180deg, rgba(70,255,154,0.35), rgba(0,212,255,0.25))",
                        transform: "translateX(100%) rotateY(90deg)",
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="max-w-lg mx-auto mb-3 relative h-3 rounded-full overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #1a1a2e, #16213e)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="absolute inset-0 animate-conveyor"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,214,0,0.15) 0px, rgba(255,214,0,0.15) 20px, transparent 20px, transparent 40px)",
            }}
          />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: "radial-gradient(circle, #ff4444, #cc0000)",
              boxShadow: "0 0 8px rgba(255,68,68,0.6)",
              animation: "conveyorMove 2s linear infinite",
            }}
          />
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: "radial-gradient(circle, #46ff9a, #00cc66)",
              boxShadow: "0 0 8px rgba(70,255,154,0.6)",
              animation: "conveyorMove 2s linear infinite reverse",
            }}
          />
        </div>
        {x === "playing" && w && (
          <div
            className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-lg mx-auto"
            style={{
              perspective: "1000px",
            }}
          >
            {m.map((a, t) => (
              <button
                key={a.id}
                id={`block-${a.id}`}
                onClick={() => K(a)}
                disabled={a.selected || a.fallen}
                className="relative h-20 md:h-24 rounded-2xl font-black text-base md:text-lg transition-all duration-300 flex items-center justify-center overflow-hidden group"
                style={{
                  background: a.selected
                    ? "linear-gradient(135deg, rgba(70,255,154,0.2), rgba(0,212,255,0.12))"
                    : a.fallen
                      ? "linear-gradient(135deg, rgba(255,68,68,0.12), rgba(255,0,0,0.06))"
                      : "linear-gradient(135deg, rgba(255,214,0,0.2), rgba(255,138,42,0.14))",
                  border: a.selected
                    ? "1px solid rgba(70,255,154,0.6)"
                    : a.fallen
                      ? "1px solid rgba(255,68,68,0.4)"
                      : "1px solid rgba(255,214,0,0.5)",
                  color: a.selected ? "#46ff9a" : a.fallen ? "rgba(255,68,68,0.5)" : "#ffd600",
                  boxShadow: a.selected
                    ? "0 0 30px rgba(70,255,154,0.35), 0 12px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : a.fallen
                      ? "0 0 15px rgba(255,68,68,0.15)"
                      : "0 0 25px rgba(255,214,0,0.15), 0 12px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                  transform: a.fallen
                    ? "translateY(140px) rotateX(55deg) rotateZ(20deg) scale(0.7)"
                    : a.selected
                      ? "translateY(-8px) scale(1.1) translateZ(40px)"
                      : "translateY(0) scale(1) translateZ(15px)",
                  opacity: a.fallen ? 0.15 : 1,
                  transformStyle: "preserve-3d",
                  animation:
                    H && !a.fallen && !a.selected
                      ? "blockShake 0.5s ease"
                      : `blockEnter 0.6s ease-out ${t * 0.08}s both`,
                  cursor: a.selected || a.fallen ? "default" : "pointer",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl opacity-25 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.2), transparent)",
                  }}
                />
                <div
                  className="absolute inset-x-0 -top-1 h-1 rounded-t-2xl opacity-40 pointer-events-none"
                  style={{
                    background: a.selected
                      ? "linear-gradient(90deg, rgba(70,255,154,0.4), rgba(0,212,255,0.3))"
                      : a.fallen
                        ? "linear-gradient(90deg, rgba(255,68,68,0.3), rgba(255,0,0,0.2))"
                        : "linear-gradient(90deg, rgba(255,214,0,0.3), rgba(255,138,42,0.2))",
                    transform: "translateY(-100%) rotateX(90deg)",
                    transformOrigin: "bottom",
                  }}
                />
                <div
                  className="absolute inset-y-0 right-0 w-2 rounded-r-2xl opacity-40 pointer-events-none"
                  style={{
                    background: a.selected
                      ? "linear-gradient(180deg, rgba(70,255,154,0.15), rgba(0,0,0,0.2))"
                      : a.fallen
                        ? "linear-gradient(180deg, rgba(255,68,68,0.1), rgba(0,0,0,0.2))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2))",
                    transform: "translateX(100%) rotateY(90deg)",
                    transformOrigin: "left",
                  }}
                />
                <div
                  className="absolute inset-y-0 left-0 w-2 rounded-l-2xl opacity-40 pointer-events-none"
                  style={{
                    background: a.selected
                      ? "linear-gradient(180deg, rgba(70,255,154,0.15), rgba(0,0,0,0.2))"
                      : a.fallen
                        ? "linear-gradient(180deg, rgba(255,68,68,0.1), rgba(0,0,0,0.2))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2))",
                    transform: "translateX(-100%) rotateY(-90deg)",
                    transformOrigin: "right",
                  }}
                />
                {!a.selected && !a.fallen && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 25px rgba(255,214,0,0.25), 0 0 40px rgba(255,214,0,0.3), 0 0 60px rgba(255,214,0,0.1)",
                    }}
                  />
                )}
                {!a.selected && !a.fallen && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,214,0,0.1), rgba(255,138,42,0.05))",
                    }}
                  />
                )}
                <span
                  className="relative z-10"
                  style={{
                    textShadow: a.selected ? "0 0 10px rgba(70,255,154,0.7)" : "0 0 10px rgba(255,214,0,0.5)",
                  }}
                >
                  {a.text}
                </span>
                {a.fallen && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <ArrowDownIcon
                      size={18}
                      className="animate-bounce"
                      style={{
                        color: "#ff4444",
                        filter: "drop-shadow(0 0 5px rgba(255,68,68,0.6))",
                      }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
        {x === "won" && (
          <div
            className="rounded-3xl p-8 md:p-10 text-center relative overflow-hidden mx-auto max-w-lg animate-win-float"
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,0.95), rgba(5,8,27,0.8))",
              border: "1px solid rgba(255,214,0,0.3)",
              boxShadow: "0 0 60px rgba(255,214,0,0.25), 0 20px 60px rgba(0,0,0,0.4)",
              transform: "rotateX(5deg) translateZ(40px)",
              perspective: "800px",
            }}
          >
            <div
              className="absolute -inset-[3px] rounded-[26px] -z-10 animate-glow-rotate opacity-60"
              style={{
                background: "linear-gradient(135deg, #ffd600, #ff8a2a, #ff00aa, #b829dd, #39ecff)",
                filter: "blur(20px)",
                backgroundSize: "200% 200%",
              }}
            />
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center justify-center relative">
                <div
                  className="absolute -inset-8 rounded-full opacity-50 animate-pulse-slow"
                  style={{
                    background: "radial-gradient(circle, rgba(255,214,0,0.5) 0%, transparent 70%)",
                  }}
                />
                <TrophyIcon
                  size={56}
                  className="relative z-10 animate-trophy-spin"
                  style={{
                    color: "#ffd600",
                    filter: "drop-shadow(0 0 15px rgba(255,214,0,0.6))",
                  }}
                />
              </div>
              <h2
                className="text-3xl md:text-4xl font-black mb-3"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff8a2a, #ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(255,214,0,0.3))",
                }}
              >
                ¡Completado!
              </h2>
              <p className="text-white/50 text-sm mb-6">你完成了所有单词！</p>
              <div className="flex gap-4 justify-center mb-8">
                <div
                  className="p-5 rounded-2xl relative overflow-hidden transition-transform hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: "rgba(0,212,255,0.12)",
                    border: "1px solid rgba(0,212,255,0.25)",
                    boxShadow: "0 0 25px rgba(0,212,255,0.2), 0 8px 24px rgba(0,0,0,0.2)",
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: "radial-gradient(circle at center, rgba(0,212,255,0.3), transparent)",
                    }}
                  />
                  <ZapIcon
                    size={24}
                    className="relative z-10 mx-auto mb-2"
                    style={{
                      color: "#00d4ff",
                      filter: "drop-shadow(0 0 8px rgba(0,212,255,0.5))",
                    }}
                  />
                  <p
                    className="relative z-10 text-2xl font-black"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 10px rgba(0,212,255,0.4)",
                    }}
                  >
                    {k}
                  </p>
                  <p
                    className="relative z-10 text-[10px] font-bold tracking-wider"
                    style={{
                      color: "rgba(207,216,255,0.5)",
                    }}
                  >
                    SCORE
                  </p>
                </div>
                <div
                  className="p-5 rounded-2xl relative overflow-hidden transition-transform hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,0,170,0.12)",
                    border: "1px solid rgba(255,0,170,0.25)",
                    boxShadow: "0 0 25px rgba(255,0,170,0.2), 0 8px 24px rgba(0,0,0,0.2)",
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: "radial-gradient(circle at center, rgba(255,0,170,0.3), transparent)",
                    }}
                  />
                  <TrophyIcon
                    size={24}
                    className="relative z-10 mx-auto mb-2"
                    style={{
                      color: "#ff00aa",
                      filter: "drop-shadow(0 0 8px rgba(255,0,170,0.5))",
                    }}
                  />
                  <p
                    className="relative z-10 text-2xl font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,0.4)",
                    }}
                  >
                    {_}
                  </p>
                  <p
                    className="relative z-10 text-[10px] font-bold tracking-wider"
                    style={{
                      color: "rgba(207,216,255,0.5)",
                    }}
                  >
                    MEJOR RACHA
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={() => {
                    playClick();
                    setP(0);
                    setK(0);
                    setW(0);
                    Z(null);
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-110 hover:-translate-y-1 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #ffd600, #ff8a2a)",
                    boxShadow: "0 0 40px rgba(255,214,0,0.5), 0 8px 24px rgba(0,0,0,0.3)",
                    transform: "translateZ(30px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    }}
                  />
                  Jugar de nuevo / 再玩一次
                </button>
              </div>
              <div className="mt-4">
                <P currentGameId="word-stack" />
              </div>
            </div>
          </div>
        )}
        <DComponent expression={expression} />
        <style>{`
          @keyframes mascot-float { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
          .mascot-float { animation: mascot-float 3s ease-in-out infinite; }
          @keyframes pulse-slow { 0%,100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.15); opacity: 0.6; } }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
          @keyframes neon-pulse-gold { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
          .animate-neon-pulse-gold { animation: neon-pulse-gold 2s ease-in-out infinite; }
          @keyframes neon-pulse-magenta { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
          .animate-neon-pulse-magenta { animation: neon-pulse-magenta 2s ease-in-out infinite; }
          @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          @keyframes blockEnter { from { transform: translateY(40px) rotateX(30deg) scale(0.7) translateZ(60px); opacity: 0; } to { transform: translateY(0) rotateX(0) scale(1) translateZ(15px); opacity: 1; } }
          @keyframes blockShake { 0%,100% { transform: translateX(0) translateZ(15px); } 20% { transform: translateX(-10px) translateZ(15px); } 40% { transform: translateX(10px) translateZ(15px); } 60% { transform: translateX(-6px) translateZ(15px); } 80% { transform: translateX(6px) translateZ(15px); } }
          @keyframes progress-shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          .animate-progress-shine { animation: progress-shine 2s ease-in-out infinite; }
          @keyframes conveyor { 0% { transform: translateX(0); } 100% { transform: translateX(-40px); } }
          .animate-conveyor { animation: conveyor 1s linear infinite; }
          @keyframes conveyorMove { 0% { transform: translateY(-50%) translateX(0); } 100% { transform: translateY(-50%) translateX(-40px); } }
          @keyframes cranePulse { 0%,100% { box-shadow: 0 0 15px rgba(57,236,255,0.4), 0 0 30px rgba(57,236,255,0.15); } 50% { box-shadow: 0 0 25px rgba(57,236,255,0.6), 0 0 50px rgba(57,236,255,0.3); } }
          .animate-crane-pulse { animation: cranePulse 1.5s ease-in-out infinite; }
          @keyframes stackBounce { 0% { transform: translateY(-40px) translateZ(60px) scale(0.8); opacity: 0; } 50% { transform: translateY(5px) translateZ(var(--stack-z, 15px)) scale(1.05); } 100% { transform: translateY(0) translateZ(var(--stack-z, 15px)) scale(1); opacity: 1; } }
          .animate-stack-bounce { animation: stackBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          @keyframes winFloat { 0%,100% { transform: rotateX(5deg) translateZ(40px) translateY(0); } 50% { transform: rotateX(5deg) translateZ(40px) translateY(-8px); } }
          .animate-win-float { animation: winFloat 4s ease-in-out infinite; }
          @keyframes glowRotate { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          .animate-glow-rotate { animation: glowRotate 4s ease infinite, pulse-slow 3s ease infinite; }
          @keyframes trophySpin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
          .animate-trophy-spin { animation: trophySpin 6s linear infinite; }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { UeComponent as default };
