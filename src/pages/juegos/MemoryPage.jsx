import {
  StarIcon,
  ZapIcon,
  AwardIcon,
  TrophyIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  Grid3x3Icon,
  LayersIcon,
  RotateCcwIcon,
  FlameIcon,
  TimerIcon,
  FootprintsIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const G = {
  "4x4": {
    pairs: 8,
    cols: 4,
    label: "Fácil 4×4",
    labelCn: "简单",
    baseTime: 60,
  },
  "4x5": {
    pairs: 10,
    cols: 5,
    label: "Medio 4×5",
    labelCn: "中等",
    baseTime: 90,
  },
  "6x6": {
    pairs: 18,
    cols: 6,
    label: "Difícil 6×6",
    labelCn: "困难",
    baseTime: 120,
  },
};
function He() {
  const a = [
    "#ff00aa",
    "#00d4ff",
    "#ffd600",
    "#39ff14",
    "#ff6b35",
    "#b829dd",
    "#ff6ec7",
    "#7b61ff",
    "#ffffff",
  ];
  const r = window.innerWidth < 768 ? 28 : 52;
  const f = document.createDocumentFragment();
  for (let b = 0; b < r; b++) {
    const u = document.createElement("div");
    const d = 3 + Math.random() * 8;
    const l = Math.random() > 0.6 ? "50%" : Math.random() > 0.5 ? "2px" : "0";
    u.style.cssText = `position:fixed;left:50%;top:40%;width:${d}px;height:${d}px;border-radius:${l};background:${a[b % a.length]};pointer-events:none;z-index:9999;box-shadow:0 0 15px ${a[b % a.length]};`;
    f.appendChild(u);
    const w = (Math.PI * 2 * b) / r + (Math.random() - 0.5) * 0.7;
    const m = 130 + Math.random() * (window.innerWidth < 768 ? 190 : 330);
    const h = Math.cos(w) * m;
    const y = Math.sin(w) * m + 150;
    const S = u.animate(
      [
        {
          transform: "translate3d(0,0,0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate3d(${h}px,${y}px,0) rotate(${360 + Math.random() * 540}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1050 + Math.random() * 650,
        easing: "cubic-bezier(.18,.75,.25,1)",
        fill: "forwards",
      },
    );
    S.onfinish = () => u.remove();
  }
  document.body.appendChild(f);
}
function ve(a) {
  const r = [...a];
  for (let f = r.length - 1; f > 0; f--) {
    const b = Math.floor(Math.random() * (f + 1));
    [r[f], r[b]] = [r[b], r[f]];
  }
  return r;
}
function JeComponent() {
  const a = React.useMemo(
    () =>
      Array.from(
        {
          length: typeof window !== "undefined" && window.innerWidth < 768 ? 9 : 20,
        },
        (r, id) => ({
          id,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: 2 + Math.random() * 4,
          delay: Math.random() * 5,
          duration: 4 + Math.random() * 6,
          color: ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#7b61ff"][Math.floor(Math.random() * 5)],
        }),
      ),
    [],
  );
  return (
    <div className="game-decorative-particles fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {a.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full"
          style={{
            left: r.left,
            top: r.top,
            width: r.size,
            height: r.size,
            background: r.color,
            opacity: 0.3,
            boxShadow: `0 0 ${r.size * 3}px ${r.color}`,
            animation: `floatParticle ${r.duration}s ease-in-out ${r.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
function EtComponent({ mood, combo }) {
  const rx = mood === "sad" ? 5 : mood === "excited" || mood === "super" ? 8 : 6;
  const ry = mood === "sad" ? 3 : mood === "excited" || mood === "super" ? 9 : 6;
  const d_1 =
    mood === "happy"
      ? "M 14 24 Q 24 32 34 24"
      : mood === "sad"
        ? "M 14 30 Q 24 22 34 30"
        : mood === "excited" || mood === "super"
          ? "M 14 24 Q 24 36 34 24"
          : "M 16 26 Q 24 28 32 26";
  const fill =
    mood === "happy" || mood === "excited" || mood === "super"
      ? "rgba(255,105,180,0.7)"
      : "rgba(255,105,180,0.15)";
  const l =
    mood === "happy"
      ? "#46ff9a"
      : mood === "sad"
        ? "#ff4444"
        : mood === "excited" || mood === "super"
          ? "#ffd600"
          : "#00d4ff";
  const animation =
    mood === "excited" || mood === "super"
      ? "mascotExcited 0.3s ease-in-out infinite"
      : "mascotFloat 3s ease-in-out infinite";
  const m = mood === "sad";
  const h = mood === "super";
  const y =
    combo >= 5
      ? "¡INCREÍBLE!"
      : combo >= 3
        ? "¡Combo!"
        : mood === "super"
          ? "¡WOW!"
          : mood === "happy"
            ? "¡Bien!"
            : mood === "sad"
              ? "Oh no..."
              : "";
  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      {y && (
        <div
          className="absolute -top-12 right-0 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: `1px solid ${l}60`,
            color: l,
            backdropFilter: "blur(10px)",
            animation: "bubblePop 0.4s ease-out forwards",
            textShadow: `0 0 10px ${l}80`,
          }}
        >
          {y}
          <div
            className="absolute -bottom-1 right-6 w-2 h-2 rotate-45"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRight: `1px solid ${l}60`,
              borderBottom: `1px solid ${l}60`,
            }}
          />
        </div>
      )}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70"
          style={{
            background: l,
            width: "90px",
            height: "90px",
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <svg
          width="90"
          height="90"
          viewBox="0 0 48 48"
          fill="none"
          className="relative"
          style={{
            filter: `drop-shadow(0 0 15px ${l}80)`,
          }}
        >
          <ellipse cx="24" cy="26" rx="20" ry="18" fill="url(#blobGradMem)" stroke={l} strokeWidth="1.5" />
          <path
            d="M 6 14 L 10 2 L 18 12"
            fill="url(#blobGradMem)"
            stroke={l}
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{
              animation: mood === "excited" ? "earWiggle 0.5s ease-in-out infinite" : "none",
            }}
          />
          <path
            d="M 42 14 L 38 2 L 30 12"
            fill="url(#blobGradMem)"
            stroke={l}
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{
              animation: mood === "excited" ? "earWiggle 0.5s ease-in-out infinite 0.1s" : "none",
            }}
          />
          <path d="M 9 12 L 11 6 L 16 11" fill="rgba(255,182,193,0.5)" />
          <path d="M 39 12 L 37 6 L 32 11" fill="rgba(255,182,193,0.5)" />
          {h ? (
            <>
              <path d="M 12 20 Q 16 14 20 20 Q 16 26 12 20" fill="#ff6ec7" />
              <path d="M 28 20 Q 32 14 36 20 Q 32 26 28 20" fill="#ff6ec7" />
            </>
          ) : (
            <>
              <ellipse cx="16" cy="22" rx={rx} ry={ry} fill="white" />
              <ellipse cx="32" cy="22" rx={rx} ry={ry} fill="white" />
              <circle cx="16" cy="22" r="3" fill="#1a1a2e" />
              <circle cx="32" cy="22" r="3" fill="#1a1a2e" />
              <circle cx="17.5" cy="20.5" r="1.2" fill="white" opacity="0.9" />
              <circle cx="33.5" cy="20.5" r="1.2" fill="white" opacity="0.9" />
              <circle cx="14.5" cy="23.5" r="0.6" fill="white" opacity="0.6" />
              <circle cx="30.5" cy="23.5" r="0.6" fill="white" opacity="0.6" />
            </>
          )}
          <path d={d_1} stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="11" cy="28" r="3.5" fill={fill} />
          <circle cx="37" cy="28" r="3.5" fill={fill} />
          {mood === "excited" || mood === "super" ? (
            <>
              <circle
                cx="4"
                cy="12"
                r="1.5"
                fill="#ffd600"
                style={{
                  animation: "sparkle 0.5s ease-in-out infinite",
                }}
              />
              <circle
                cx="44"
                cy="8"
                r="1"
                fill="#ff00aa"
                style={{
                  animation: "sparkle 0.7s ease-in-out infinite 0.2s",
                }}
              />
              <circle
                cx="42"
                cy="38"
                r="1.5"
                fill="#00d4ff"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
              <circle
                cx="2"
                cy="30"
                r="1"
                fill="#39ff14"
                style={{
                  animation: "sparkle 0.8s ease-in-out infinite 0.1s",
                }}
              />
            </>
          ) : null}
          {m && (
            <>
              <circle cx="11" cy="26" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="26" to="36" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="37" cy="26" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="26" to="36" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="blobGradMem" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#ffd600" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#ff00aa" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
function Ke1Component({ m: m_1, onClick }) {
  const [f, setF] = React.useState({
    x: 0,
    y: 0,
  });
  const uRef = React.useRef(null);
  const { playClick } = useSound();
  const onMouseMove = (m) => {
    if (!uRef.current) {
      return;
    }
    const h = uRef.current.getBoundingClientRect();
    const y = (m.clientX - h.left) / h.width;
    const S = (m.clientY - h.top) / h.height;
    setF({
      x: (S - 0.5) * -20,
      y: (y - 0.5) * 20,
    });
  };
  const onMouseLeave = () =>
    setF({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={uRef}
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
        border: `1px solid ${m_1.color}40`,
        transform: `perspective(600px) rotateX(${f.x}deg) rotateY(${f.y}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        boxShadow: "0 10px 40px rgba(0,0,0,.4)",
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${m_1.color}00, ${m_1.color}, ${m_1.color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `linear-gradient(135deg, ${m_1.color}, ${m_1.color}88)`,
          transform: "translateZ(20px)",
          boxShadow: `0 0 15px ${m_1.color}40`,
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
        {m_1.titulo}
      </h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m_1.color}aa`,
          transform: "translateZ(10px)",
        }}
      >
        {m_1.tituloChino}
      </p>
      <p
        className="text-xs font-medium text-white/40"
        style={{
          transform: "translateZ(5px)",
        }}
      >
        {m_1.descripcion || `${m_1.vocabularioCount} palabras / 词`}
      </p>
    </button>
  );
}
function TtComponent({ card, index, onClick, shakeIds, matchIds, isMatched, difficulty }) {
  const w = card.state === "revealed" || card.state === "matched";
  const m = shakeIds.has(card.id);
  const h = matchIds.has(card.id);
  const [y, setY] = React.useState(false);
  const [z, setZ] = React.useState(0);
  React.useEffect(() => {
    if (isMatched) {
      setZ((T) => T + 1);
    }
  }, [isMatched]);
  const j =
    difficulty === "6x6"
      ? "w-[70px] h-[70px] md:w-[85px] md:h-[85px]"
      : "w-[85px] h-[85px] md:w-[100px] md:h-[100px]";
  return (
    <div
      className={`relative cursor-pointer ${j}`}
      style={{
        perspective: "800px",
        animation: `cardStaggerIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s backwards`,
      }}
      onMouseEnter={() => setY(true)}
      onMouseLeave={() => setY(false)}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: w
            ? `rotateY(180deg) ${isMatched ? "scale(0.95)" : ""}`
            : y
              ? "rotateY(-10deg) translateZ(15px)"
              : "rotateY(0deg)",
          transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      >
        <div
          className="gm-card-back absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(120, 50, 255, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(255, 0, 170, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 60%),
              linear-gradient(135deg, rgba(14, 18, 50, 0.95), rgba(5, 5, 25, 0.98))
            `,
            border: y ? "1.5px solid rgba(0, 212, 255, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: y
              ? "0 15px 35px rgba(0,0,0,0.6), 0 0 30px rgba(123, 97, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 8px 20px rgba(0,0,0,0.4), 0 0 15px rgba(123, 97, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
            style={{
              border: "1px solid rgba(0, 212, 255, 0.15)",
              animation: "cardBorderPulse 3s ease-in-out infinite",
              boxShadow: "inset 0 0 20px rgba(0, 212, 255, 0.05)",
            }}
          />
          <div className="relative">
            <span
              className="text-3xl font-black"
              style={{
                color: "rgba(255, 255, 255, 0.2)",
                textShadow:
                  "0 0 20px rgba(123, 97, 255, 0.5), 0 0 40px rgba(255, 0, 170, 0.2), 0 0 60px rgba(0, 212, 255, 0.1)",
                animation: y ? "questionGlow 1.5s ease-in-out infinite alternate" : "none",
              }}
            >
              ?
            </span>
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(123,97,255,0.5) 0%, rgba(0,212,255,0.2) 40%, transparent 70%)",
              }}
            />
          </div>
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            {Array.from({
              length: 8,
            }).map((T, g) => (
              <div
                key={g}
                className="absolute rounded-full"
                style={{
                  left: `${10 + ((g * 13) % 75)}%`,
                  top: `${8 + ((g * 17) % 75)}%`,
                  width: `${1 + (g % 3)}px`,
                  height: `${1 + (g % 3)}px`,
                  background: "rgba(255,255,255,0.6)",
                  boxShadow: "0 0 6px rgba(255,255,255,0.6), 0 0 12px rgba(0,212,255,0.3)",
                  animation: `starTwinkle ${2 + (g % 3)}s ease-in-out infinite ${g * 0.2}s`,
                }}
              />
            ))}
          </div>
          <div
            className="absolute top-0 left-0 w-3 h-3 rounded-full opacity-40"
            style={{
              background: "rgba(0,212,255,0.3)",
              boxShadow: "0 0 10px rgba(0,212,255,0.3)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full opacity-40"
            style={{
              background: "rgba(255,0,170,0.3)",
              boxShadow: "0 0 10px rgba(255,0,170,0.3)",
              filter: "blur(2px)",
            }}
          />
        </div>
        <div
          className="gm-card-front absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: isMatched
              ? "linear-gradient(135deg, rgba(70,255,154,.2), rgba(57,255,20,.1), rgba(70,255,154,.05))"
              : "linear-gradient(135deg, rgba(14,22,64,.95), rgba(5,8,27,.9))",
            border: isMatched
              ? "2px solid rgba(70,255,154,.7)"
              : h
                ? "2px solid rgba(70,255,154,.9)"
                : "1px solid rgba(0,212,255,.35)",
            boxShadow: h
              ? "0 0 60px rgba(70,255,154,.7), 0 0 120px rgba(70,255,154,.3), 0 0 180px rgba(70,255,154,.15), inset 0 0 25px rgba(70,255,154,.1)"
              : isMatched
                ? "0 0 30px rgba(70,255,154,.5), 0 0 60px rgba(70,255,154,.2), 0 0 100px rgba(70,255,154,.1), inset 0 0 20px rgba(70,255,154,.08)"
                : "0 0 20px rgba(0,212,255,.15), inset 0 0 10px rgba(0,212,255,.03)",
            animation: isMatched ? "matchedPulseFront 2s ease-in-out infinite" : "none",
          }}
        >
          {z > 0 && (
            <div
              key={z}
              className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
              style={{
                animation: "matchFlash 0.6s ease-out forwards",
                background:
                  "radial-gradient(ellipse at center, rgba(70,255,154,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)",
              }}
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              animation: "goldShimmer 3s linear infinite",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
          <span
            className="text-sm font-bold text-center px-1 leading-tight z-10"
            style={{
              color: isMatched ? "#46ff9a" : card.isSpanish ? "#00d4ff" : "#ffd600",
              textShadow: isMatched
                ? "0 0 15px rgba(70,255,154,.7), 0 0 30px rgba(70,255,154,.4), 0 0 45px rgba(70,255,154,.2), 0 0 60px rgba(70,255,154,.1)"
                : card.isSpanish
                  ? "0 0 10px rgba(0,212,255,.3), 0 0 20px rgba(0,212,255,.15), 0 0 30px rgba(0,212,255,.08)"
                  : "0 0 10px rgba(255,214,0,.3), 0 0 20px rgba(255,214,0,.15), 0 0 30px rgba(255,214,0,.08)",
              animation: w && !isMatched ? "textReveal 0.4s ease-out forwards" : "none",
            }}
          >
            {card.text}
          </span>
          {isMatched && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: "inset 0 0 30px rgba(70,255,154,.25), inset 0 0 60px rgba(70,255,154,.1)",
                animation: "matchRingPulse 2s ease-in-out infinite",
                border: "1px solid rgba(70,255,154,.15)",
              }}
            />
          )}
          {isMatched && (
            <>
              <div
                className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#46ff9a",
                  boxShadow: "0 0 8px rgba(70,255,154,.9), 0 0 16px rgba(70,255,154,.5)",
                }}
              />
              <div
                className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#46ff9a",
                  boxShadow: "0 0 8px rgba(70,255,154,.9), 0 0 16px rgba(70,255,154,.5)",
                }}
              />
              <div
                className="absolute bottom-1 left-1 w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#46ff9a",
                  boxShadow: "0 0 8px rgba(70,255,154,.9), 0 0 16px rgba(70,255,154,.5)",
                }}
              />
              <div
                className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#46ff9a",
                  boxShadow: "0 0 8px rgba(70,255,154,.9), 0 0 16px rgba(70,255,154,.5)",
                }}
              />
            </>
          )}
          {isMatched && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {Array.from({
                length: 4,
              }).map((T, g) => (
                <div
                  key={g}
                  className="absolute rounded-full"
                  style={{
                    left: `${20 + g * 20}%`,
                    top: `${10 + g * 15}%`,
                    width: "3px",
                    height: "3px",
                    background: "#46ff9a",
                    boxShadow: "0 0 6px rgba(70,255,154,.8)",
                    animation: `matchFloatParticle ${1.5 + g * 0.3}s ease-in-out infinite ${g * 0.2}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {m && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          style={{
            animation: "mismatchShakeCard 0.5s ease-in-out",
            background:
              "radial-gradient(ellipse at center, rgba(255,68,68,0.2) 0%, rgba(255,0,0,0.1) 40%, transparent 70%)",
            boxShadow:
              "0 0 30px rgba(255,68,68,.4), 0 0 60px rgba(255,68,68,.2), inset 0 0 20px rgba(255,68,68,.1)",
            border: "1px solid rgba(255,68,68,.3)",
          }}
        />
      )}
    </div>
  );
}
function PtComponent() {
  const [a, setA] = React.useState("select");
  const [f, setF] = React.useState(null);
  const [u, setU] = React.useState([]);
  const [l, setL] = React.useState("4x4");
  const [m, setM] = React.useState([]);
  const [y, setY] = React.useState([]);
  const [z, setZ] = React.useState(0);
  const [j, setJ] = React.useState(0);
  const [g, setG] = React.useState(false);
  const [$, set$] = React.useState(false);
  const [M, setM_1] = React.useState(1);
  const [F, setF_1] = React.useState(0);
  const [X, setX] = React.useState(0);
  const [se, setSe] = React.useState(0);
  const [at, setAt] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("memory_best") || "{}");
    } catch {
      return {};
    }
  });
  const [Ne, setNe] = React.useState([]);
  const [Me, setMe] = React.useState([]);
  const [shakeIds, setShakeIds] = React.useState(new Set());
  const [matchIds, setMatchIds] = React.useState(new Set());
  const [$e, set$e] = React.useState(false);
  const [mood, setMood] = React.useState("neutral");
  const [_, set_] = React.useState([]);
  const URef = React.useRef(0);
  const PRef = React.useRef(null);
  const [oe, setOe] = React.useState("");
  const [Pe, setPe] = React.useState(false);
  const { playCorrect, playWrong, playWin, playClick } = useSound();
  const K = G[l];
  const C = Math.max(10, Math.floor(K.baseTime * 0.85 ** (M - 1)));
  const Ye = Math.min(1 + F * 0.5, 5);
  React.useEffect(() => {
    if (_.length === 0) {
      return;
    }
    const t = setTimeout(() => set_([]), 1250);
    return () => clearTimeout(t);
  }, [_.length]);
  const Te = (t, top, p, x) => {
    const n = ++URef.current;
    setNe((i) => [
      ...i,
      {
        id: n,
        x: t,
        y: top,
        text: p,
        color: x,
      },
    ]);
    setTimeout(() => setNe((i) => i.filter((v) => v.id !== n)), 1500);
  };
  const Xe = (t, o, p, x) => {
    const n = ++URef.current;
    setMe((i) => [
      ...i,
      {
        id: n,
        x: t,
        y: o,
        text: p,
        color: x,
        scale: 1 + F * 0.15,
      },
    ]);
    setTimeout(() => setMe((i) => i.filter((v) => v.id !== n)), 1800);
  };
  const Be = (t, o, p = "#ffd600", x = 50) => {
    const n = ["#ffd600", "#ff00aa", "#00d4ff", "#39ff14", "#ff6b35", "#b829dd", "#ffffff", "#46ff9a"];
    const i = [];
    const v = Math.min(x, window.innerWidth < 768 ? 16 : 34);
    for (let k = 0; k < v; k++) {
      const c = (Math.PI * 2 * k) / v + (Math.random() - 0.5) * 0.5;
      const N = 3 + Math.random() * 18;
      i.push({
        id: ++URef.current,
        x: t,
        y: o,
        vx: Math.cos(c) * N,
        vy: Math.sin(c) * N - 4,
        color: n[k % n.length],
        life: 1 + Math.random() * 0.8,
        size: 3 + Math.random() * 10,
        rotation: Math.random() * 360,
      });
    }
    set_((k) => [...k, ...i]);
  };
  const We = g_1();
  const de = React.useCallback((t) => {
    let o;
    if (t) {
      o = a_1(t);
    } else {
      o = a_1();
    }
    if (o.length === 0) {
      setOe(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const p = o
      .filter((x) => x.espanol && x.chino)
      .map((x) => ({
        es: x.espanol
          .toUpperCase()
          .replace(/[¿?¡!.,;:'"]/g, "")
          .trim(),
        zh: x.chino.trim(),
      }))
      .filter((x) => x.es.length > 0 && x.es.length <= 12);
    setU(p);
    setF(t);
    setA("playing");
    setMood("neutral");
    setM_1(1);
    setF_1(0);
    setX(0);
    setSe(0);
  }, []);
  const W = React.useCallback(
    (t, o = 1) => {
      const p = G[t];
      const x = u.length > 0 ? u : [];
      const n = ve(x).slice(0, p.pairs);
      let i = 0;
      const v = [];
      n.forEach((k, pairId) => {
        v.push({
          id: i++,
          text: k.es,
          isSpanish: true,
          pairId,
          state: "hidden",
        });
        v.push({
          id: i++,
          text: k.zh,
          isSpanish: false,
          pairId,
          state: "hidden",
        });
      });
      setM(ve(v));
      setY([]);
      setZ(0);
      setJ(0);
      setG(false);
      set$(false);
      setMood("neutral");
      setF_1(0);
      set_([]);
      setNe([]);
      setMe([]);
      setShakeIds(new Set());
      setMatchIds(new Set());
      set$e(false);
      setPe(false);
      if (PRef.current) {
        clearInterval(PRef.current);
      }
      setM_1(o);
    },
    [u],
  );
  React.useEffect(() => {
    if (a === "playing") {
      W(l, 1);
    }
  }, [l, W, a]);
  React.useEffect(() => {
    if (g && !$) {
      PRef.current = setInterval(() => setJ((t) => t + 1), 1000);
      return () => {
        if (PRef.current) {
          clearInterval(PRef.current);
        }
      };
    }
  }, [g, $]);
  React.useEffect(() => {
    if (y.length === 2) {
      const [t, o] = y;
      const p = m.find((n) => n.id === t);
      const x = m.find((n) => n.id === o);
      if (p && x && p.pairId === x.pairId) {
        playCorrect();
        const n = F + 1;
        setF_1(n);
        setX((c) => Math.max(c, n));
        const i = n >= 3 ? "super" : "happy";
        setMood(i);
        const v = Math.floor(100 * Math.min(1 + n * 0.5, 5));
        const k = document.getElementById(`mem-card-${t}`);
        if (k) {
          const c = k.getBoundingClientRect();
          Be(c.left + c.width / 2, c.top + c.height / 2, "#46ff9a", 30 + n * 10);
          Te(c.left + c.width / 2, c.top, `+${v}`, "#46ff9a");
          if (n >= 2) {
            Xe(c.left + c.width / 2, c.top - 30, `COMBO x${n}!`, "#ffd600");
          }
        }
        setMatchIds((c) => new Set(c).add(t).add(o));
        setTimeout(() => {
          setM((c) =>
            c.map((N) => {
              if (N.id === t || N.id === o) {
                return {
                  ...N,
                  state: "matched",
                };
              }
              return N;
            }),
          );
          setY([]);
          setMatchIds((c) => {
            const N = new Set(c);
            N.delete(t);
            N.delete(o);
            return N;
          });
        }, 700);
      } else {
        playWrong();
        setMood("sad");
        set$e(true);
        setTimeout(() => set$e(false), 500);
        setShakeIds((n) => new Set(n).add(t).add(o));
        setF_1(0);
        setTimeout(() => {
          setM((n) =>
            n.map((i) => {
              if (i.id === t || i.id === o) {
                return {
                  ...i,
                  state: "hidden",
                };
              }
              return i;
            }),
          );
          setY([]);
          setShakeIds((n) => {
            const i = new Set(n);
            i.delete(t);
            i.delete(o);
            return i;
          });
        }, 1000);
      }
    }
  }, [y, m, playCorrect, playWrong, F]);
  React.useEffect(() => {
    if (m.length > 0 && m.every((t) => t.state === "matched") && !$) {
      set$(true);
      setG(false);
      setMood("super");
      if (PRef.current) {
        clearInterval(PRef.current);
      }
      playWin();
      He();
      const t = Math.max(1000 - z * 10 - j * 5, 100);
      const o = X * 150;
      const p = j <= C ? 500 : j <= C * 1.5 ? 200 : 0;
      const x = 1 + (M - 1) * 0.5;
      const n = Math.floor((t + o + p) * x);
      setSe(n);
      setAt((i) => {
        const v = `${l}_L${M}`;
        const k = {
          ...i,
          [v]: Math.max(i[v] || 0, n),
        };
        localStorage.setItem("memory_best", JSON.stringify(k));
        return k;
      });
    }
  }, [m, $, z, j, l, M, X, C, playWin]);
  const Le = (card) => {
    if (!(card.state !== "hidden" || y.length >= 2 || $)) {
      playClick();
      if (!g) {
        setG(true);
      }
      setM((o) =>
        o.map((p) => {
          if (p.id === card.id) {
            return {
              ...p,
              state: "revealed",
            };
          }
          return p;
        }),
      );
      setY((o) => {
        const p = [...o, card.id];
        if (p.length === 2) {
          setZ((x) => x + 1);
        }
        return p;
      });
    }
  };
  const onClick = () => {
    playClick();
    setPe(true);
    setTimeout(() => {
      W(l, M + 1);
    }, 800);
  };
  const H = Math.max(1000 - z * 10 - j * 5, 100);
  const xe = X * 150;
  const Ze = $ ? (j <= C ? 500 : j <= C * 1.5 ? 200 : 0) : 0;
  const J = 1 + (M - 1) * 0.5;
  const Ge = $ ? se : Math.floor((H + xe) * J);
  const Z = Math.min(100, (j / C) * 100);
  if (a === "select") {
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
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
              style={{
                background: "linear-gradient(135deg,#ffd600,#ff6b35)",
                boxShadow: "0 0 60px rgba(255,214,0,0.4), 0 0 120px rgba(255,107,53,0.2)",
                animation: "memFloat 3s ease-in-out infinite",
              }}
            >
              <Grid3x3Icon
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
                <StarIcon
                  size={20}
                  style={{
                    color: "#ffd600",
                    fill: "#ffd600",
                  }}
                />
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#ffd600 0%,#ff6b35 50%,#ff00aa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(255,214,0,.3))",
                animation: "memTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Memory Match
            </h1>
            <p className="text-white/50 text-lg font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {oe && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {oe}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Ke1Component
              key="all"
              m={{
                id: "all",
                titulo: "Todos los módulos",
                tituloChino: "所有模块",
                color: "#ff00aa",
                vocabularioCount: 0,
                descripcion: "Mezcla todo el vocabulario",
              }}
              onClick={() => {
                playClick();
                setOe("");
                de(null);
              }}
            />
            {We.map((m_1) => (
              <Ke1Component
                key={m_1.id}
                m={m_1}
                onClick={() => {
                  setOe("");
                  de(m_1.id);
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
            @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
            @keyframes memFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes memTitlePulse { from{filter:drop-shadow(0 0 40px rgba(255,214,0,.3)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(255,214,0,.5)) brightness(1.15)} }
            @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
            @keyframes earWiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-5deg)} 75%{transform:rotate(5deg)} }
            @keyframes bubblePop { 0%{transform:translateY(10px) scale(0.8); opacity:0} 100%{transform:translateY(0) scale(1); opacity:1} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <JeComponent />
      <div
        className={`max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10 ${$e ? "animate-screenShake" : ""}`}
        style={{
          perspective: "1200px",
        }}
      >
        <EtComponent mood={mood} combo={F} />
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {_.map((t) => (
            <div
              key={t.id}
              className="memory-burst-particle absolute"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: t.color,
                boxShadow: `0 0 ${t.size * 2}px ${t.color}`,
                borderRadius: t.size > 6 ? "2px" : "50%",
                "--particle-dx": `${t.vx * 28}px`,
                "--particle-dy": `${t.vy * 25 + 95}px`,
                "--particle-rotation": `${t.rotation + 420}deg`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => {
                playClick();
                setA("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar módulo / 切换模块
            </button>
            <button
              onClick={() => {
                playClick();
                W(l, 1);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <RotateCcwIcon size={12} /> Reiniciar / 重置
            </button>
          </div>
        </div>
        <div
          className="text-center mb-4"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <h1
            className="text-4xl md:text-5xl font-black mb-1"
            style={{
              background: "linear-gradient(135deg,#ffd600,#ff6b35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,214,0,.3))",
            }}
          >
            Memory Match
          </h1>
          <p className="text-white/40 text-sm font-medium">
            Empareja palabras y traducciones / 配对单词和翻译
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(123,97,255,.1)",
                border: "1px solid rgba(123,97,255,.2)",
                color: "#b8a5ff",
                boxShadow: "0 0 10px rgba(123,97,255,.1)",
              }}
            >
              <ZapIcon size={12} /> Nivel {M}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,214,0,.1)",
                border: "1px solid rgba(255,214,0,.2)",
                color: "#ffd600",
              }}
            >
              <FlameIcon size={12} /> Combo x{F}
            </div>
            {F >= 2 && (
              <div
                className="px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse"
                style={{
                  background: "rgba(255,0,170,.2)",
                  color: "#ff6ec7",
                  border: "1px solid rgba(255,0,170,.3)",
                }}
              >
                x{Ye.toFixed(1)} pts
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-center">
            {Object.keys(G).map((t) => {
              const o = G[t];
              const p = t === l;
              return (
                <button
                  key={t}
                  onClick={() => {
                    playClick();
                    setL(t);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                  style={
                    p
                      ? {
                          background: "rgba(255,214,0,.15)",
                          border: "1px solid rgba(255,214,0,.3)",
                          color: "#ffd600",
                          boxShadow: "0 0 15px rgba(255,214,0,.15)",
                          textShadow: "0 0 10px rgba(255,214,0,.3)",
                        }
                      : {
                          background: "rgba(255,255,255,.04)",
                          border: "1px solid rgba(255,255,255,.08)",
                          color: "rgba(207,216,255,.4)",
                        }
                  }
                >
                  {o.label} / {o.labelCn}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="flex flex-wrap gap-3 justify-center mb-4"
          style={{
            perspective: "800px",
          }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(0,212,255,.12)",
              border: "1px solid rgba(0,212,255,.3)",
              color: "#00d4ff",
              boxShadow:
                "0 0 15px rgba(0,212,255,.15), 0 0 30px rgba(0,212,255,.05), 0 4px 15px rgba(0,0,0,0.3)",
              transform: "translateZ(10px) rotateX(-5deg)",
              textShadow: "0 0 8px rgba(0,212,255,.3)",
            }}
          >
            <TimerIcon size={12} /> {Math.floor(j / 60)}:{String(j % 60).padStart(2, "0")}
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,0,170,.12)",
              border: "1px solid rgba(255,0,170,.3)",
              color: "#ff00aa",
              boxShadow:
                "0 0 15px rgba(255,0,170,.15), 0 0 30px rgba(255,0,170,.05), 0 4px 15px rgba(0,0,0,0.3)",
              transform: "translateZ(15px) rotateX(-5deg)",
              textShadow: "0 0 8px rgba(255,0,170,.3)",
            }}
          >
            <FootprintsIcon size={12} /> {z} movimientos / 步
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(57,255,20,.12)",
              border: "1px solid rgba(57,255,20,.3)",
              color: "#39ff14",
              boxShadow:
                "0 0 15px rgba(57,255,20,.15), 0 0 30px rgba(57,255,20,.05), 0 4px 15px rgba(0,0,0,0.3)",
              transform: "translateZ(20px) rotateX(-5deg)",
              textShadow: "0 0 8px rgba(57,255,20,.3)",
            }}
          >
            <AwardIcon size={12} /> {Ge} pts
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,107,53,.12)",
              border: "1px solid rgba(255,107,53,.3)",
              color: "#ff6b35",
              boxShadow:
                "0 0 15px rgba(255,107,53,.15), 0 0 30px rgba(255,107,53,.05), 0 4px 15px rgba(0,0,0,0.3)",
              transform: "translateZ(10px) rotateX(-5deg)",
              textShadow: "0 0 8px rgba(255,107,53,.3)",
            }}
          >
            <StarIcon size={12} /> Max Combo {X}
          </div>
        </div>
        <div
          className="max-w-md mx-auto mb-6"
          style={{
            perspective: "600px",
          }}
        >
          <div className="flex justify-between text-[10px] font-bold text-white/30 mb-1">
            <span>Tiempo</span>
            <span
              style={{
                color: Z > 100 ? "#ff4444" : "#ffd600",
              }}
            >
              {j <= C ? `Objetivo: ${C}s` : `+${j - C}s`}
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.05)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.3)",
              transform: "rotateX(5deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-20"
              style={{
                boxShadow: "inset 0 0 10px rgba(0,212,255,0.1)",
              }}
            />
            <div
              className="h-full rounded-full transition-all duration-1000 relative"
              style={{
                width: `${Math.min(Z, 100)}%`,
                background:
                  Z > 100
                    ? "linear-gradient(90deg, #ff4444, #ff6b35)"
                    : "linear-gradient(90deg, #00d4ff, #39ff14)",
                boxShadow:
                  Z > 100
                    ? "0 0 15px rgba(255,68,68,0.6), 0 0 30px rgba(255,68,68,0.3)"
                    : "0 0 15px rgba(0,212,255,0.4), 0 0 30px rgba(0,212,255,0.2), 0 0 45px rgba(57,255,20,0.1)",
                animation: "progressGlow 2s ease-in-out infinite alternate",
              }}
            />
          </div>
        </div>
        {Ne.map((t) => (
          <div
            key={t.id}
            className="fixed pointer-events-none z-[9998] font-black text-2xl"
            style={{
              left: t.x,
              top: t.y,
              color: t.color,
              textShadow: `0 0 20px ${t.color}, 0 0 40px ${t.color}80`,
              animation: "floatScoreMem 1.2s ease-out forwards",
            }}
          >
            {t.text}
          </div>
        ))}
        {Me.map((t) => (
          <div
            key={t.id}
            className="fixed pointer-events-none z-[9999] font-black"
            style={{
              left: t.x,
              top: t.y,
              color: t.color,
              textShadow: `0 0 30px ${t.color}, 0 0 60px ${t.color}80, 0 0 90px ${t.color}40`,
              animation: "comboPop3D 1.5s ease-out forwards",
              fontSize: `${1 + t.scale}rem`,
              transformOrigin: "center center",
            }}
          >
            {t.text}
          </div>
        ))}
        <div className="flex justify-center">
          <div
            className="gm-scroll gm-memory grid gap-3 p-6 rounded-3xl relative"
            style={{
              gridTemplateColumns: `repeat(${K.cols}, minmax(0, 1fr))`,
              maxWidth: `${K.cols * (l === "6x6" ? 85 : 110) + 60}px`,
              background: `
                radial-gradient(ellipse at 50% 0%, rgba(123, 97, 255, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 100%, rgba(255, 0, 170, 0.05) 0%, transparent 50%),
                linear-gradient(180deg, rgba(14,22,64,.3), rgba(5,8,27,.2))
              `,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: `
                0 25px 80px rgba(0,0,0,0.5),
                0 0 60px rgba(123,97,255,0.08),
                0 0 120px rgba(0,212,255,0.03),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-40"
              style={{
                background: "radial-gradient(ellipse at center, rgba(123,97,255,0.1) 0%, transparent 70%)",
                animation: "gridAmbientPulse 4s ease-in-out infinite",
              }}
            />
            <div
              className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
              }}
            />
            {m.map((card, index) => (
              <div key={card.id} id={`mem-card-${card.id}`}>
                <TtComponent
                  card={card}
                  index={index}
                  onClick={() => Le(card)}
                  shakeIds={shakeIds}
                  matchIds={matchIds}
                  isMatched={card.state === "matched"}
                  difficulty={l}
                />
              </div>
            ))}
          </div>
        </div>
        {Pe && (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
            style={{
              background: "rgba(3,4,17,0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="text-center"
              style={{
                animation: "levelUpZoom 0.8s ease-out forwards",
              }}
            >
              <h2
                className="text-5xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(255,214,0,.5))",
                }}
              >
                ¡Nivel {M + 1}!
              </h2>
              <p className="text-white/50 text-sm">Preparando tablero...</p>
            </div>
          </div>
        )}
        {$ && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.85)",
              backdropFilter: "blur(20px)",
              perspective: "1000px",
            }}
          >
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
                border: "2px solid rgba(255,214,0,.3)",
                boxShadow:
                  "0 0 60px rgba(255,214,0,.2), 0 0 120px rgba(255,214,0,.1), 0 0 200px rgba(255,214,0,.05)",
                transform: "translateZ(50px)",
                animation: "victoryBounce 1s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff6b35, #ff00aa)",
                  filter: "blur(25px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.5))",
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.3))",
                }}
              >
                ¡Completado!
              </h2>
              <p className="text-white/50 text-sm mb-4">完成！ • Nivel {M}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,255,.12)",
                    border: "1px solid rgba(0,212,255,.2)",
                    boxShadow: "0 0 20px rgba(0,212,255,.1), 0 4px 15px rgba(0,0,0,0.3)",
                    transform: "translateZ(20px) rotateX(-3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,212,255,0.2), transparent)",
                    }}
                  />
                  <ZapIcon
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
                    Base Score
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 15px rgba(0,212,255,.4)",
                    }}
                  >
                    {H}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,0,170,.12)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 20px rgba(255,0,170,.1), 0 4px 15px rgba(0,0,0,0.3)",
                    transform: "translateZ(25px) rotateX(-3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,0,170,0.2), transparent)",
                    }}
                  />
                  <FootprintsIcon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,0,170,0.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Movimientos
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 15px rgba(255,0,170,.4)",
                    }}
                  >
                    {z}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(57,255,20,.12)",
                    border: "1px solid rgba(57,255,20,.2)",
                    boxShadow: "0 0 20px rgba(57,255,20,.1), 0 4px 15px rgba(0,0,0,0.3)",
                    transform: "translateZ(30px) rotateX(-3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(57,255,20,0.2), transparent)",
                    }}
                  />
                  <TimerIcon
                    size={16}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(57,255,20,0.5))",
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
                      textShadow: "0 0 15px rgba(57,255,20,.4)",
                    }}
                  >
                    {j}s
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,107,53,.12)",
                    border: "1px solid rgba(255,107,53,.2)",
                    boxShadow: "0 0 20px rgba(255,107,53,.1), 0 4px 15px rgba(0,0,0,0.3)",
                    transform: "translateZ(20px) rotateX(-3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,107,53,0.2), transparent)",
                    }}
                  />
                  <FlameIcon
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
                    Max Combo
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff6b35",
                      textShadow: "0 0 15px rgba(255,107,53,.4)",
                    }}
                  >
                    x{X}
                  </p>
                </div>
              </div>
              <div
                className="mb-4 p-3 rounded-xl"
                style={{
                  background: "rgba(255,214,0,.08)",
                  border: "1px solid rgba(255,214,0,.15)",
                }}
              >
                <p className="text-xs font-bold text-white/50 mb-1">Desglose de puntuación</p>
                <div className="flex justify-between text-xs mb-0.5">
                  <span
                    style={{
                      color: "#00d4ff",
                    }}
                  >
                    Base
                  </span>
                  <span
                    style={{
                      color: "#00d4ff",
                    }}
                  >
                    {H}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span
                    style={{
                      color: "#ff6b35",
                    }}
                  >
                    Combo Bonus (x{X})
                  </span>
                  <span
                    style={{
                      color: "#ff6b35",
                    }}
                  >
                    +{xe}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span
                    style={{
                      color: "#39ff14",
                    }}
                  >
                    Speed Bonus
                  </span>
                  <span
                    style={{
                      color: "#39ff14",
                    }}
                  >
                    +{Ze}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span
                    style={{
                      color: "#b8a5ff",
                    }}
                  >
                    Nivel Multiplier (x{J.toFixed(1)})
                  </span>
                  <span
                    style={{
                      color: "#b8a5ff",
                    }}
                  >
                    x{J}
                  </span>
                </div>
                <div className="h-px bg-white/10 my-1.5" />
                <div className="flex justify-between text-sm font-black">
                  <span
                    style={{
                      color: "#ffd600",
                    }}
                  >
                    TOTAL
                  </span>
                  <span
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 15px rgba(255,214,0,.5)",
                    }}
                  >
                    {se}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    playClick();
                    W(l, 1);
                  }}
                  className="px-6 py-3 rounded-full text-white font-black transition-all hover:scale-105 text-sm"
                  style={{
                    background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                    boxShadow: "0 0 25px rgba(255,214,0,.3), 0 0 50px rgba(255,214,0,.1)",
                  }}
                >
                  Reintentar / 重试
                </button>
                <button
                  onClick={onClick}
                  className="flex items-center gap-1 px-6 py-3 rounded-full text-white font-black transition-all hover:scale-105 text-sm"
                  style={{
                    background: "linear-gradient(135deg, #00d4ff, #7b61ff)",
                    boxShadow: "0 0 25px rgba(0,212,255,.3), 0 0 50px rgba(0,212,255,.1)",
                  }}
                >
                  Siguiente Nivel <ChevronRightIcon size={16} />
                </button>
              </div>
              <P currentGameId="memory" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes floatParticle { 0%{transform:translateY(0) translateX(0)} 100%{transform:translateY(-30px) translateX(10px)} }
          @keyframes cardStaggerIn { 0%{transform:scale(0) rotateY(-90deg); opacity:0} 100%{transform:scale(1) rotateY(0deg); opacity:1} }
          @keyframes textReveal { 0%{transform:scale(0.8); opacity:0; filter:blur(4px)} 100%{transform:scale(1); opacity:1; filter:blur(0)} }
          @keyframes matchedPulseFront { 0%,100%{box-shadow:0 0 25px rgba(70,255,154,.3), inset 0 0 15px rgba(70,255,154,.05)} 50%{box-shadow:0 0 50px rgba(70,255,154,.5), 0 0 80px rgba(70,255,154,.2), inset 0 0 25px rgba(70,255,154,.1)} }
          @keyframes matchRingPulse { 0%,100%{transform:scale(1); opacity:0.5} 50%{transform:scale(1.05); opacity:0.8} }
          @keyframes mismatchShakeCard { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-6px)} 20%{transform:translateX(6px)} 30%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 50%{transform:translateX(-3px)} 60%{transform:translateX(3px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          @keyframes goldShimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes floatScoreMem { 0%{transform:translateY(0) scale(1); opacity:1} 100%{transform:translateY(-80px) scale(1.3); opacity:0} }
          @keyframes comboPop { 0%{transform:translateY(0) scale(0.5); opacity:0} 20%{transform:translateY(-20px) scale(1.2); opacity:1} 40%{transform:translateY(-30px) scale(1); opacity:1} 100%{transform:translateY(-100px) scale(1.1); opacity:0} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes screenShake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          @keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(20deg)} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
          @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
          @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          @keyframes earWiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-5deg)} 75%{transform:rotate(5deg)} }
          @keyframes bubblePop { 0%{transform:translateY(10px) scale(0.8); opacity:0} 100%{transform:translateY(0) scale(1); opacity:1} }
          @keyframes levelUpZoom { 0%{transform:scale(0.5); opacity:0} 50%{transform:scale(1.1); opacity:1} 100%{transform:scale(1); opacity:0} }
          @keyframes matchFlash { 0%{opacity:0.6} 50%{opacity:0.3} 100%{opacity:0} }
          @keyframes starTwinkle { 0%,100%{opacity:0.3; transform:scale(1)} 50%{opacity:0.8; transform:scale(1.5)} }
          @keyframes cardBorderPulse { 0%,100%{opacity:0.2} 50%{opacity:0.4} }
          @keyframes comboPop3D { 0%{transform:translateY(0) scale(0.5) rotateY(-30deg); opacity:0} 20%{transform:translateY(-20px) scale(1.2) rotateY(10deg); opacity:1} 40%{transform:translateY(-30px) scale(1) rotateY(-5deg); opacity:1} 100%{transform:translateY(-100px) scale(1.1) rotateY(0deg); opacity:0} }
          @keyframes questionGlow { 0%{text-shadow:0 0 20px rgba(123,97,255,.5), 0 0 40px rgba(255,0,170,.2)} 100%{text-shadow:0 0 30px rgba(123,97,255,.8), 0 0 60px rgba(255,0,170,.4), 0 0 90px rgba(0,212,255,.2)} }
          @keyframes matchFloatParticle { 0%,100%{transform:translateY(0) translateX(0); opacity:0.6} 50%{transform:translateY(-15px) translateX(5px); opacity:1} }
          @keyframes progressGlow { 0%{box-shadow:0 0 15px rgba(0,212,255,.4), 0 0 30px rgba(0,212,255,.2)} 100%{box-shadow:0 0 25px rgba(57,255,20,.5), 0 0 50px rgba(57,255,20,.3), 0 0 75px rgba(57,255,20,.15)} }
          @keyframes gridAmbientPulse { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
          .animate-screenShake { animation: screenShake 0.5s ease-in-out; }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { PtComponent as default };
