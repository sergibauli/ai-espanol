import {
  ZapIcon,
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  TrophyIcon,
  Gamepad2Icon,
  ArrowLeftIcon,
  KeyboardIcon,
  GaugeIcon,
  LayersIcon,
  FlameIcon,
  ShieldIcon,
  TimerIcon,
  CrownIcon,
  RabbitIcon,
  TurtleIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const h = [
  {
    color: "#00d4ff",
    glow: "rgba(0,212,255,.6)",
    bg: "rgba(0,212,255,.12)",
  },
  {
    color: "#ff6b35",
    glow: "rgba(255,107,53,.6)",
    bg: "rgba(255,107,53,.12)",
  },
  {
    color: "#39ff14",
    glow: "rgba(57,255,20,.6)",
    bg: "rgba(57,255,20,.12)",
  },
  {
    color: "#ffd600",
    glow: "rgba(255,214,0,.6)",
    bg: "rgba(255,214,0,.12)",
  },
  {
    color: "#ff00aa",
    glow: "rgba(255,0,170,.6)",
    bg: "rgba(255,0,170,.12)",
  },
  {
    color: "#b829ff",
    glow: "rgba(184,41,255,.6)",
    bg: "rgba(184,41,255,.12)",
  },
];
const ht = [
  {
    name: "Shadow",
    color: "#ff4444",
    speed: 0.04,
  },
  {
    name: "Blaze",
    color: "#ff6b35",
    speed: 0.045,
  },
  {
    name: "Vortex",
    color: "#b829ff",
    speed: 0.035,
  },
];
const yt = {
  turbo: "#ffd600",
  shield: "#00d4ff",
  slow: "#39ff14",
  multiplier: "#ff00aa",
};
const Ce = {
  word: {
    slow: 0.45,
    normal: 1,
    fast: 1.6,
  },
  bot: {
    slow: 0.55,
    normal: 1,
    fast: 1.35,
  },
  spawn: {
    slow: 1.4,
    normal: 1,
    fast: 0.75,
  },
};
const se = 60;
const P = 4;
const X = 100 / P;
function Vt(o, g, color) {
  for (let d = 0; d < 36; d++) {
    const l = document.createElement("div");
    l.style.cssText = `position:fixed;left:${o}px;top:${g}px;width:9px;height:9px;border-radius:50%;background:${color};pointer-events:none;z-index:9999;box-shadow:0 0 14px ${color};`;
    document.body.appendChild(l);
    const m = Math.random() * Math.PI * 2;
    const j = 2 + Math.random() * 10;
    let n = Math.cos(m) * j;
    let i = Math.sin(m) * j;
    let k = 1;
    const M = () => {
      n *= 0.92;
      i *= 0.92;
      i += 0.18;
      l.style.left = `${parseFloat(l.style.left) + n}px`;
      l.style.top = `${parseFloat(l.style.top) + i}px`;
      k -= 0.018;
      l.style.opacity = String(k);
      l.style.transform = `scale(${k})`;
      if (k > 0) {
        requestAnimationFrame(M);
      } else {
        l.remove();
      }
    };
    requestAnimationFrame(M);
  }
}
function Jt1Component({ color, scale = 1, nitro = false, turbo = false }) {
  return (
    <svg
      width={56 * scale}
      height={34 * scale}
      viewBox="0 0 50 30"
      style={{
        filter: `drop-shadow(0 0 8px ${color})`,
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id={`carGrad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity={0.6} />
        </linearGradient>
        <radialGradient id={`headlight-${color.replace("#", "")}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="3" y="8" width="8" height="3" rx="1" fill={color} opacity="0.8" />
      <rect x="39" y="8" width="8" height="3" rx="1" fill={color} opacity="0.8" />
      <rect x="5" y="6" width="40" height="2" rx="1" fill={color} opacity="0.6" />
      <path
        d="M5 20 L10 12 L22 8 L38 12 L45 20 L42 26 L8 26 Z"
        fill={`url(#carGrad-${color.replace("#", "")})`}
        stroke={color}
        strokeWidth="1"
      />
      <path d="M10 18 L42 18 L40 22 L12 22 Z" fill={color} opacity="0.3" />
      <path
        d="M12 14 L22 10 L36 14 L33 18 L15 18 Z"
        fill="#111"
        stroke={color}
        strokeWidth="0.5"
        opacity={0.8}
      />
      <ellipse
        cx="6"
        cy="22"
        rx="4"
        ry="3"
        fill={`url(#headlight-${color.replace("#", "")})`}
        opacity="0.6"
      />
      <ellipse
        cx="44"
        cy="22"
        rx="4"
        ry="3"
        fill={`url(#headlight-${color.replace("#", "")})`}
        opacity="0.6"
      />
      <ellipse cx="8" cy="22" rx="2.5" ry="1.8" fill="#fff" opacity={0.95} />
      <ellipse cx="42" cy="22" rx="2.5" ry="1.8" fill="#fff" opacity={0.95} />
      <circle cx="12" cy="26" r="4" fill="#111" stroke="#444" strokeWidth="1.5" />
      <circle cx="12" cy="26" r="2" fill="#666" stroke="#888" strokeWidth="0.5" />
      <circle cx="38" cy="26" r="4" fill="#111" stroke="#444" strokeWidth="1.5" />
      <circle cx="38" cy="26" r="2" fill="#666" stroke="#888" strokeWidth="0.5" />
      <rect x="5" y="23" width="4" height="2.5" fill="#ff0044" rx="0.5" opacity="0.9" />
      <rect x="41" y="23" width="4" height="2.5" fill="#ff0044" rx="0.5" opacity="0.9" />
      {(nitro || turbo) && (
        <ellipse cx="25" cy="28" rx="20" ry="4" fill="none" stroke={color} strokeWidth="2" opacity="0.4">
          <animate attributeName="rx" values="20;22;20" dur="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.2;0.4" dur="0.3s" repeatCount="indefinite" />
        </ellipse>
      )}
      {(nitro || turbo) && (
        <>
          <polygon points="8,26 2,34 14,28" fill="#ff6600" opacity={0.9}>
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.1s" repeatCount="indefinite" />
            <animate
              attributeName="points"
              values="8,26 2,34 14,28;8,26 1,36 15,28;8,26 2,34 14,28"
              dur="0.1s"
              repeatCount="indefinite"
            />
          </polygon>
          <polygon points="42,26 36,34 48,28" fill="#ff6600" opacity={0.9}>
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.12s" repeatCount="indefinite" />
            <animate
              attributeName="points"
              values="42,26 36,34 48,28;42,26 35,36 49,28;42,26 36,34 48,28"
              dur="0.12s"
              repeatCount="indefinite"
            />
          </polygon>
          <polygon points="8,26 4,31 12,27" fill="#ffff00" opacity={0.8}>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.08s" repeatCount="indefinite" />
          </polygon>
          <polygon points="42,26 38,31 46,27" fill="#ffff00" opacity={0.8}>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.09s" repeatCount="indefinite" />
          </polygon>
        </>
      )}
      {turbo && (
        <ellipse cx="25" cy="17" rx="30" ry="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5">
          <animate attributeName="rx" values="30;34;30" dur="0.3s" repeatCount="indefinite" />
          <animate attributeName="ry" values="18;20;18" dur="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur="0.3s" repeatCount="indefinite" />
        </ellipse>
      )}
    </svg>
  );
}
function Vt1Component({ expression, turbo = false, combo = 0, winner = false }) {
  const cy = expression === "excited" ? 20 : expression === "cool" ? 21 : 23;
  const d =
    expression === "happy"
      ? "M 32 38 Q 50 52 68 38"
      : expression === "sad"
        ? "M 32 48 Q 50 34 68 48"
        : expression === "excited"
          ? "M 32 36 Q 50 54 68 36"
          : expression === "worried"
            ? "M 35 44 Q 50 38 65 44"
            : expression === "cool"
              ? "M 38 42 Q 50 46 62 42"
              : "M 40 42 Q 50 48 60 42";
  const j =
    expression === "happy" || expression === "excited" || expression === "cool" ? (
      <>
        <ellipse cx="28" cy="40" rx="8" ry="4" fill="#ff8ec8" opacity="0.6" />
        <ellipse cx="72" cy="40" rx="8" ry="4" fill="#ff8ec8" opacity="0.6" />
      </>
    ) : null;
  const n =
    expression === "worried" || expression === "sad" ? (
      <path d="M 78 18 Q 82 12 84 18 Q 82 24 78 18" fill="#00d4ff" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
      </path>
    ) : null;
  const i =
    expression === "excited" || winner ? (
      <>
        <polygon points="10,22 13,29 20,29 14,33 17,40 10,35 3,40 6,33 0,29 7,29" fill="#ffd600">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.3;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon points="90,16 92,21 97,21 93,24 95,29 90,26 85,29 87,24 83,21 88,21" fill="#ffd600">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.2;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon points="5,8 7,12 11,12 8,14 9,18 5,16 1,18 2,14 -1,12 3,12" fill="#00d4ff">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.4;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </polygon>
      </>
    ) : null;
  const k = winner ? (
    <>
      <path d="M 30 20 Q 36 14 42 20 Q 36 26 30 20" fill="#ff0044" />
      <path d="M 58 20 Q 64 14 70 20 Q 64 26 58 20" fill="#ff0044" />
    </>
  ) : null;
  const animation = winner
    ? "mascotBounce 0.25s ease-in-out infinite alternate"
    : expression === "excited"
      ? "mascotBounce 0.35s ease-in-out infinite alternate"
      : expression === "happy" || expression === "cool"
        ? "mascotBounce 0.55s ease-in-out infinite alternate"
        : "mascotFloat 3s ease-in-out infinite";
  const z = winner
    ? "¡Eres el mejor!"
    : expression === "happy"
      ? "¡Bien!"
      : expression === "excited"
        ? "¡GO! GO!"
        : expression === "sad"
          ? "Oh no..."
          : expression === "worried"
            ? "¡Rápido!"
            : expression === "cool"
              ? "¡Turbo!"
              : "¡Vamos!";
  const U = winner || turbo ? "rgba(255,214,0,0.9)" : "rgba(255,105,180,0.9)";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 100 100"
        className="drop-shadow-[0_0_20px_rgba(255,105,180,0.6)]"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffb6d9" />
            <stop offset="100%" stopColor="#ff69b4" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <ellipse cx="22" cy="18" rx="14" ry="18" fill="url(#bodyGrad)" transform="rotate(-20 22 18)" />
        <ellipse cx="78" cy="18" rx="14" ry="18" fill="url(#bodyGrad)" transform="rotate(20 78 18)" />
        <ellipse cx="22" cy="18" rx="7" ry="10" fill="#ffcce0" transform="rotate(-20 22 18)" />
        <ellipse cx="78" cy="18" rx="7" ry="10" fill="#ffcce0" transform="rotate(20 78 18)" />
        <circle cx="50" cy="52" r="38" fill="url(#bodyGrad)" />
        {expression === "cool" && (
          <>
            <rect x="22" y="16" width="28" height="12" rx="4" fill="#111" opacity="0.9" />
            <rect x="54" y="16" width="28" height="12" rx="4" fill="#111" opacity="0.9" />
            <line x1="50" y1="22" x2="50" y2="22" stroke="#111" strokeWidth="2" />
            <rect x="24" y="18" width="24" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="56" y="18" width="24" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
          </>
        )}
        {!winner && (
          <>
            <circle cx="36" cy={cy} r="5" fill="#2a0a1a" />
            <circle cx="64" cy={cy} r="5" fill="#2a0a1a" />
            <circle cx="38" cy={cy - 2} r="2" fill="#fff" />
            <circle cx="66" cy={cy - 2} r="2" fill="#fff" />
          </>
        )}
        {k}
        <path d={d} stroke="#2a0a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
        {j}
        {n}
        {i}
        <ellipse cx="12" cy="52" rx="8" ry="6" fill="#ff69b4" transform="rotate(-15 12 52)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-15 12 52;-25 12 52;-15 12 52"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="88" cy="52" rx="8" ry="6" fill="#ff69b4" transform="rotate(15 88 52)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="15 88 52;25 88 52;15 88 52"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="50" cy="88" rx="6" ry="3" fill="#ff69b4" opacity="0.8">
          <animate attributeName="rx" values="6;8;6" dur="1s" repeatCount="indefinite" />
        </ellipse>
        {turbo && (
          <>
            <path
              d="M 30 70 Q 50 85 70 70"
              stroke="#ffd600"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            >
              <animate
                attributeName="d"
                values="M 30 70 Q 50 85 70 70;M 30 70 Q 50 90 70 70;M 30 70 Q 50 85 70 70"
                dur="0.3s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M 70 70 L 85 65 L 82 75 Z" fill="#ffd600" opacity="0.9">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 70 70;10 70 70;0 70 70"
                dur="0.2s"
                repeatCount="indefinite"
              />
            </path>
          </>
        )}
        {winner && (
          <>
            <polygon
              points="25,5 30,15 35,5 40,15 45,5 50,15 55,5 60,15 65,5 70,15 75,5 50,0"
              fill="#ffd600"
              filter="url(#glow)"
            />
            <circle cx="50" cy="8" r="3" fill="#ff8c00" />
          </>
        )}
      </svg>
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap"
        style={{
          background: U,
          color: "#fff",
          textShadow: "0 0 6px rgba(255,255,255,0.8)",
          animation: "mascotBubble 2s ease-in-out infinite",
        }}
      >
        {z}
      </div>
    </div>
  );
}
function KtComponent({ wpm, turbo }) {
  const d = Math.min(wpm / 120, 1);
  const l = d * 270 - 135;
  const m = 50;
  const j = 50;
  const n = 38;
  const x2 = m + n * Math.cos(((l - 90) * Math.PI) / 180);
  const y2 = j + n * Math.sin(((l - 90) * Math.PI) / 180);
  const M = wpm > 50 ? "#ff6b35" : wpm > 30 ? "#ffd600" : "#00d4ff";
  const z = wpm > 50 ? "rgba(255,107,53,0.6)" : wpm > 30 ? "rgba(255,214,0,0.6)" : "rgba(0,212,255,0.6)";
  return (
    <div
      className="relative w-16 h-16 md:w-20 md:h-20 shrink-0"
      style={{
        filter: `drop-shadow(0 0 10px ${z})`,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#ffd600" />
            <stop offset="100%" stopColor="#ff0044" />
          </linearGradient>
        </defs>
        <path
          d="M 18 68 A 38 38 0 1 1 82 68"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 18 68 A 38 38 0 1 1 82 68"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={239}
          strokeDashoffset={239 * (1 - d)}
          style={{
            filter: `drop-shadow(0 0 6px ${z})`,
            transition: "stroke-dashoffset 0.3s ease-out",
          }}
        />
        {Array.from({
          length: 7,
        }).map((U, _) => {
          const G = -135 + _ * 45;
          const cx = m + (n - 8) * Math.cos(((G - 90) * Math.PI) / 180);
          const cy = j + (n - 8) * Math.sin(((G - 90) * Math.PI) / 180);
          return <circle key={_} cx={cx} cy={cy} r="1.5" fill="rgba(255,255,255,0.3)" />;
        })}
        <line
          x1={m}
          y1={j}
          x2={x2}
          y2={y2}
          stroke={turbo ? "#ffd600" : M}
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 4px ${turbo ? "#ffd600" : M})`,
            transition: "all 0.3s ease-out",
          }}
        />
        <circle
          cx={m}
          cy={j}
          r="4"
          fill={turbo ? "#ffd600" : M}
          style={{
            filter: `drop-shadow(0 0 4px ${turbo ? "#ffd600" : M})`,
          }}
        />
        <text x="50" y="58" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">
          {wpm}
        </text>
        <text x="50" y="66" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontWeight="700">
          WPM
        </text>
      </svg>
      {turbo && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(255,214,0,0.3)",
            animation: "gaugePulse 0.5s ease-in-out infinite alternate",
          }}
        />
      )}
    </div>
  );
}
function TComponent({ playerProgress, bots, playerLane, turbo, shield, raceFinished, winner }) {
  return (
    <div
      className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4"
      style={{
        perspective: "1200px",
        background:
          "linear-gradient(180deg, #050818 0%, #0a0e27 15%, #1a1f4b 35%, #0f1429 65%, #0a0e27 100%)",
        border: "2px solid rgba(0,212,255,0.3)",
        boxShadow: "0 0 40px rgba(0,212,255,0.15), inset 0 0 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255,0,170,0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(255,214,0,0.15) 0%, transparent 40%)",
            animation: "nebulaDrift 8s ease-in-out infinite alternate",
          }}
        />
        {Array.from({
          length: 60,
        }).map((n, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              background: "#fff",
              opacity: 0.5 + Math.random() * 0.5,
              animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: `0 0 ${2 + Math.random() * 4}px rgba(255,255,255,0.6)`,
            }}
          />
        ))}
        {Array.from({
          length: 3,
        }).map((n, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-px rounded-full"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 30}%`,
              width: "40px",
              background: "linear-gradient(90deg, transparent, #fff, transparent)",
              animation: `shootingStar ${4 + Math.random() * 4}s linear infinite`,
              animationDelay: `${i * 2 + Math.random() * 3}s`,
              opacity: 0.6,
            }}
          />
        ))}
        {Array.from({
          length: 7,
        }).map((n, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute"
            style={{
              left: `${i * 15 + Math.random() * 10}%`,
              top: `${5 + Math.random() * 15}%`,
              animation: `cloudDrift ${20 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="w-20 h-5 rounded-full opacity-15"
              style={{
                background: "#fff",
                filter: "blur(5px)",
              }}
            />
            <div
              className="w-12 h-3 rounded-full opacity-10 ml-4 -mt-2"
              style={{
                background: "#fff",
                filter: "blur(4px)",
              }}
            />
          </div>
        ))}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 opacity-25"
          style={{
            animation: "mountainParallax 30s linear infinite",
          }}
        >
          <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="w-full h-full">
            <polygon
              points="0,60 30,15 50,30 70,10 100,40 130,5 160,35 190,8 220,30 250,12 280,40 310,5 340,35 370,15 400,60"
              fill="#1a1f4b"
            />
            <polygon
              points="0,60 40,25 80,45 120,20 160,50 200,15 240,40 280,18 320,45 360,22 400,60"
              fill="#0f1429"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[75%]"
        style={{
          transform: "rotateX(60deg) translateZ(-40px)",
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 50%, #080810 100%)",
            borderTop: "3px solid rgba(0,212,255,0.5)",
            boxShadow: "inset 0 0 30px rgba(0,212,255,0.05), 0 -20px 60px rgba(0,212,255,0.1)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,212,255,0.15) 30px)",
            animation: "gridMove 0.6s linear infinite",
          }}
        />
        {Array.from({
          length: P + 1,
        }).map((n) => {
          const i = (n / P) * 100;
          return (
            <div
              key={`lane-${n}`}
              className="absolute top-0 bottom-0"
              style={{
                left: `${i}%`,
                width: n === 0 || n === P ? "2px" : "1px",
                background:
                  "linear-gradient(180deg, transparent, rgba(0,212,255,0.6), rgba(0,212,255,0.4), transparent)",
                transform: `translateZ(${n === 0 || n === P ? 2 : 1}px)`,
                boxShadow: n === 0 || n === P ? "0 0 8px rgba(0,212,255,0.5)" : "none",
              }}
            />
          );
        })}
        {Array.from({
          length: 16,
        }).map((n) => (
          <div
            key={`trackline-${n}`}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${(n / 16) * 100}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(0,212,255,0.5), rgba(0,212,255,0.3), transparent)",
              animation: `trackLineMove ${0.8 + n * 0.05}s linear infinite`,
              animationDelay: `${n * 0.1}s`,
            }}
          />
        ))}
        <div
          className="absolute top-0 bottom-0 left-0 w-2"
          style={{
            background: "linear-gradient(180deg, #ff0044, #ff6b35)",
            boxShadow: "0 0 15px rgba(255,0,68,0.6), 0 0 30px rgba(255,0,68,0.3)",
            opacity: 0.8,
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-2"
          style={{
            background: "linear-gradient(180deg, #ff0044, #ff6b35)",
            boxShadow: "0 0 15px rgba(255,0,68,0.6), 0 0 30px rgba(255,0,68,0.3)",
            opacity: 0.8,
          }}
        />
        {Array.from({
          length: 8,
        }).map((n) => (
          <div
            key={`post-left-${n}`}
            className="absolute left-0 w-2"
            style={{
              top: `${(n / 8) * 100}%`,
              height: "4px",
              background: "#ff0044",
              boxShadow: "0 0 8px rgba(255,0,68,0.8), 0 0 16px rgba(255,0,68,0.4)",
              animation: `neonPulse ${1.2 + n * 0.1}s ease-in-out infinite alternate`,
              animationDelay: `${n * 0.15}s`,
            }}
          />
        ))}
        {Array.from({
          length: 8,
        }).map((n) => (
          <div
            key={`post-right-${n}`}
            className="absolute right-0 w-2"
            style={{
              top: `${(n / 8) * 100}%`,
              height: "4px",
              background: "#ff0044",
              boxShadow: "0 0 8px rgba(255,0,68,0.8), 0 0 16px rgba(255,0,68,0.4)",
              animation: `neonPulse ${1.2 + n * 0.1}s ease-in-out infinite alternate`,
              animationDelay: `${n * 0.15 + 0.5}s`,
            }}
          />
        ))}
        <div
          className="absolute top-0 bottom-0 left-0 w-0.5"
          style={{
            background: "rgba(0,212,255,0.6)",
            boxShadow: "0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.3)",
            animation: "neonPulse 1.5s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-0.5"
          style={{
            background: "rgba(0,212,255,0.6)",
            boxShadow: "0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.3)",
            animation: "neonPulse 1.5s ease-in-out infinite alternate",
          }}
        />
      </div>
      {raceFinished && (
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-64 h-10 md:h-14"
            style={{
              background: "repeating-linear-gradient(90deg, #fff 0px, #fff 8px, #000 8px, #000 16px)",
              animation: "finishLineFlash 0.5s ease-in-out infinite alternate",
              boxShadow: "0 0 25px rgba(255,255,255,0.6), 0 0 50px rgba(255,214,0,0.3)",
            }}
          >
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-12 bg-yellow-400"
              style={{
                boxShadow: "0 0 10px rgba(255,214,0,0.8)",
              }}
            />
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black text-yellow-400"
              style={{
                textShadow: "0 0 10px rgba(255,214,0,0.8)",
              }}
            >
              META
            </div>
          </div>
          <div
            className="absolute top-0 left-[20%] w-2 h-16"
            style={{
              background: "linear-gradient(180deg, #ffd600, #ff6b35)",
              boxShadow: "0 0 20px rgba(255,214,0,0.6)",
            }}
          />
          <div
            className="absolute top-0 right-[20%] w-2 h-16"
            style={{
              background: "linear-gradient(180deg, #ffd600, #ff6b35)",
              boxShadow: "0 0 20px rgba(255,214,0,0.6)",
            }}
          />
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-[75%]"
        style={{
          transform: "rotateX(60deg) translateZ(-40px)",
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute w-16 h-10 flex items-center justify-center transition-all duration-300"
          style={{
            left: `${playerLane * X + X / 2}%`,
            bottom: `${playerProgress}%`,
            transform: `translateX(-50%) translateZ(14px) ${turbo ? "scale(1.4) rotateZ(-2deg)" : "scale(1.15) rotateZ(0deg)"}`,
            zIndex: 10,
            filter: shield ? "drop-shadow(0 0 12px rgba(0,212,255,0.9))" : "none",
          }}
        >
          <Jt1Component color={turbo ? "#ffd600" : "#00d4ff"} scale={1.4} nitro={turbo} turbo={turbo} />
          {shield && (
            <div
              className="absolute -inset-3 rounded-full border-2 border-cyan-400 opacity-60"
              style={{
                animation: "shieldPulse 1s ease-in-out infinite",
              }}
            />
          )}
          {turbo &&
            Array.from({
              length: 4,
            }).map((n, i) => (
              <div
                key={`exhaust-${i}`}
                className="absolute -bottom-2 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  width: `${4 - i}px`,
                  height: `${4 - i}px`,
                  background: i % 2 === 0 ? "#ff6600" : "#ffd600",
                  boxShadow: `0 0 6px ${i % 2 === 0 ? "#ff6600" : "#ffd600"}`,
                  animation: `exhaustFade ${0.3 + i * 0.1}s ease-out infinite`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-cyan-400 whitespace-nowrap"
            style={{
              textShadow: "0 0 8px rgba(0,212,255,0.9)",
            }}
          >
            TÚ
          </div>
        </div>
        {bots.map((n) => (
          <div
            key={n.id}
            className="absolute w-12 h-8 flex items-center justify-center transition-all duration-500"
            style={{
              left: `${n.lane * X + X / 2}%`,
              bottom: `${n.progress}%`,
              transform: "translateX(-50%) translateZ(10px) scale(1.1)",
              zIndex: 5,
            }}
          >
            <Jt1Component
              color={n.color}
              scale={1.2}
              nitro={n.progress > 80 && n.progress < playerProgress}
            />
            <div
              className="absolute -inset-2 rounded-full opacity-30"
              style={{
                border: `1px solid ${n.color}`,
                boxShadow: `0 0 10px ${n.color}`,
                animation: "neonPulse 1.5s ease-in-out infinite alternate",
              }}
            />
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-bold whitespace-nowrap"
              style={{
                color: n.color,
                textShadow: `0 0 6px ${n.color}`,
              }}
            >
              {n.name}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {turbo &&
          Array.from({
            length: 24,
          }).map((n, i) => (
            <div
              key={`speed-${i}`}
              className="absolute bg-gradient-to-b from-transparent via-white to-transparent rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: "-20%",
                width: "1px",
                height: `${40 + Math.random() * 80}px`,
                animation: `speedLineDrop ${0.15 + Math.random() * 0.2}s linear infinite`,
                animationDelay: `${Math.random() * 0.5}s`,
                opacity: 0.7,
                boxShadow: "0 0 6px rgba(255,255,255,0.5)",
              }}
            />
          ))}
        {Array.from({
          length: 12,
        }).map((n, i) => {
          const M =
            (i % 2 === 0 ? "left" : "right") === "left" ? Math.random() * 20 : 80 + Math.random() * 20;
          return (
            <div
              key={`converge-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
              style={{
                left: `${M}%`,
                top: `${10 + Math.random() * 80}%`,
                width: `${30 + Math.random() * 60}px`,
                opacity: 0.15,
                animation: `convergeLine ${1 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          );
        })}
      </div>
      <div
        className="absolute top-[35%] left-0 right-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,212,255,0.08) 0%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />
      {raceFinished && winner === "player" && (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
          <div
            className="text-2xl md:text-4xl font-black text-yellow-400"
            style={{
              textShadow:
                "0 0 25px rgba(255,214,0,0.9), 0 0 50px rgba(255,214,0,0.5), 0 0 80px rgba(255,214,0,0.3)",
              animation: "winnerPop 0.6s ease-out",
            }}
          >
            🏆 ¡VICTORIA! 🏆
          </div>
        </div>
      )}
      <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes shootingStar { 0%{transform:translateX(0) translateY(0); opacity:0} 10%{opacity:0.8} 90%{opacity:0.8} 100%{transform:translateX(-200px) translateY(80px); opacity:0} }
        @keyframes nebulaDrift { 0%{transform:translateX(0)} 100%{transform:translateX(20px)} }
        @keyframes cloudDrift { 0%{transform:translateX(-20px)} 100%{transform:translateX(20px)} }
        @keyframes mountainParallax { 0%{transform:translateX(0)} 100%{transform:translateX(-50px)} }
        @keyframes gridMove { 0%{transform:translateY(0)} 100%{transform:translateY(30px)} }
        @keyframes trackLineMove { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes finishLineFlash { from{opacity:0.6} to{opacity:1} }
        @keyframes shieldPulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.1);opacity:0.3} }
        @keyframes winnerPop { 0%{transform:scale(0.5);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes speedLineDrop { 0%{transform:translateY(-120%)} 100%{transform:translateY(120vh)} }
        @keyframes convergeLine { 0%{transform:translateX(0) scaleX(1); opacity:0.15} 50%{opacity:0.3} 100%{transform:translateX(-30px) scaleX(0.5); opacity:0} }
        @keyframes neonPulse { from{opacity:0.4} to{opacity:0.8} }
        @keyframes exhaustFade { 0%{transform:translateY(0) scale(1); opacity:0.8} 100%{transform:translateY(10px) scale(0.3); opacity:0} }
        @keyframes gaugePulse { from{box-shadow:0 0 10px rgba(255,214,0,0.2)} to{box-shadow:0 0 20px rgba(255,214,0,0.5)} }
      `}</style>
    </div>
  );
}
function XaComponent() {
  const { playCorrect, playWrong, playLose, playClick } = useSound();
  const [l, setL] = React.useState("select");
  const [j, setJ] = React.useState([]);
  const [i, setI] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [U, setU] = React.useState(0);
  const [G, setG] = React.useState(3);
  const [D, setD] = React.useState(1);
  const [oe, setOe] = React.useState(false);
  const [kt, setKt] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("typing_best") || "0");
    } catch {
      return 0;
    }
  });
  const [L, setL_1] = React.useState(0);
  const [F, setF] = React.useState(0);
  const [Nt, setNt] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("typing_bestcombo") || "0");
    } catch {
      return 0;
    }
  });
  const [Fe, setFe] = React.useState([]);
  const [St, setSt] = React.useState(false);
  const [ze, setZe] = React.useState([]);
  const [Mt, setMt] = React.useState([]);
  const [expression, setExpression] = React.useState("neutral");
  const HRef = React.useRef(null);
  const ceRef = React.useRef(null);
  const LeRef = React.useRef(1);
  const AeRef = React.useRef(0);
  const feRef = React.useRef(0);
  const Tt = g();
  const [qe, setQe] = React.useState("");
  const TRef = React.useRef(0);
  const ZRef = React.useRef(0);
  const HeRef = React.useRef(0);
  const VeRef = React.useRef(0);
  const [playerLane, setPlayerLane] = React.useState(1);
  const [bots, setBots] = React.useState([]);
  const [xe, setXe] = React.useState(0);
  const [V, setV] = React.useState(0);
  const [c, setC] = React.useState(false);
  const [Ee, setEe] = React.useState(0);
  const [$, set$] = React.useState(false);
  const [pe, setPe] = React.useState(0);
  const [me, setMe] = React.useState(false);
  const [be, setBe] = React.useState(0);
  const [te, setTe] = React.useState(1);
  const [ye, setYe] = React.useState(0);
  const [Ke, setKe] = React.useState(0);
  const [O, setO] = React.useState(false);
  const [winner, setWinner] = React.useState(null);
  const [Xe, setXe_1] = React.useState([]);
  const [Je, setJe] = React.useState(0);
  const [Jt, setJt] = React.useState(0);
  const [ea, setEa] = React.useState([]);
  const [f, setF_1] = React.useState("normal");
  const BeRef = React.useRef(0);
  const ZeRef = React.useRef([]);
  const [N, setN] = React.useState("neutral");
  const SeRef = React.useRef("neutral");
  const IRef = React.useRef(null);
  const tt = React.useMemo(() => {
    if (l === "gameover") {
      return "sad";
    }
    if (c) {
      return "cool";
    }
    if (G === 1) {
      return "worried";
    }
    if (TRef.current >= 8) {
      return "excited";
    }
    if (TRef.current >= 3) {
      return "happy";
    }
    return "neutral";
  }, [l, G, F, c]);
  React.useEffect(() => {
    const t = Date.now();
    if (t - VeRef.current > 300) {
      VeRef.current = t;
      setExpression(tt);
    }
  }, [tt]);
  const at = React.useCallback(
    (t) => {
      playClick();
      let r = t ? a_1(t) : a_1();
      if (r.length === 0) {
        setQe(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const a = r
        .filter((u) => u.espanol)
        .map((u) =>
          u.espanol
            .toUpperCase()
            .replace(/[\u00BF\u003F\u00A1\u0021\u002E\u002C\u003B\u003A\u0027\u0022]/g, "")
            .trim(),
        )
        .filter((u) => u.length >= 2 && u.length <= 12);
      const x = Array.from(new Set(a));
      setJ(x);
      setI([]);
      setValue("");
      setU(0);
      ZRef.current = 0;
      setG(3);
      setD(1);
      setOe(false);
      setL_1(0);
      setF(0);
      TRef.current = 0;
      setFe([]);
      setZe([]);
      LeRef.current = 1;
      feRef.current = 0;
      setL("playing");
      setExpression("neutral");
      setMt(
        Array.from(
          {
            length: 16,
          },
          (u, v) => ({
            id: v,
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 0.5 + Math.random() * 0.7,
            height: 30 + Math.random() * 80,
            lane: v % P,
          }),
        ),
      );
      setPlayerLane(1);
      setXe(0);
      const p = Ce.bot[f];
      setBots(
        ht.map((u, v) => ({
          id: v,
          lane: v >= 1 ? v + 1 : 0,
          progress: 0,
          speed: (u.speed + Math.random() * 0.01) * p,
          color: u.color,
          name: u.name,
          carStyle: v,
        })),
      );
      setV(0);
      setC(false);
      setEe(0);
      set$(false);
      setPe(0);
      setMe(false);
      setBe(0);
      setTe(1);
      setYe(0);
      setKe(Date.now());
      setO(false);
      setWinner(null);
      setXe_1([]);
      setJe(0);
      setJt(0);
      setEa([]);
      ZeRef.current = [];
      setN("neutral");
      SeRef.current = "neutral";
      if (IRef.current) {
        clearTimeout(IRef.current);
      }
    },
    [playClick, f],
  );
  React.useEffect(() => {
    if (l === "playing" && ceRef.current) {
      ceRef.current.focus();
    }
  }, [l]);
  React.useEffect(() => {
    if (Fe.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setFe((r) =>
        r
          .map((a) => ({
            ...a,
            y: a.y - 2,
            life: a.life - 0.02,
          }))
          .filter((a) => a.life > 0),
      );
    }, 20);
    return () => clearInterval(t);
  }, [Fe.length]);
  React.useEffect(() => {
    if (ze.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setZe((r) =>
        r
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.08,
            life: a.life - 0.015,
          }))
          .filter((a) => a.life > 0),
      );
    }, 20);
    return () => clearInterval(t);
  }, [ze.length]);
  React.useEffect(() => {
    if (Xe.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setXe_1((r) =>
        r
          .map((a) => ({
            ...a,
            y: a.y + 2,
            life: a.life - 0.04,
          }))
          .filter((a) => a.life > 0),
      );
    }, 20);
    return () => clearInterval(t);
  }, [Xe.length]);
  React.useEffect(() => {
    if (l !== "playing" || oe || O) {
      return;
    }
    let t = performance.now();
    const r = (a) => {
      const x = (a - t) / 16;
      t = a;
      const p = me ? 0.5 : c ? 1.3 : 1;
      const u = Ce.word[f];
      setI((b) => {
        const y = b
          .map((w) => ({
            ...w,
            y: w.y + w.speed * x * p * u,
          }))
          .filter((w) => !w.matched);
        const A = HRef.current?.clientHeight || 500;
        const C = y.filter((w) => w.y > A - 30);
        if (C.length > 0) {
          setG((w) => {
            let W = w;
            if ($) {
              W = w;
            } else {
              W = w - C.length;
            }
            if (W <= 0) {
              setOe(true);
              setL("gameover");
              playLose();
              setExpression("sad");
              setKt((R) => {
                const E = Math.max(R, ZRef.current);
                localStorage.setItem("typing_best", String(E));
                return E;
              });
              setNt((R) => {
                const E = Math.max(R, TRef.current);
                localStorage.setItem("typing_bestcombo", String(E));
                return E;
              });
            } else {
              playWrong();
              setSt(true);
              setExpression("worried");
              setJe((R) => R + 1);
              setEe((R) => Math.max(0, R - 15));
              setTimeout(() => setSt(false), 400);
            }
            return Math.max(W, 0);
          });
          setF(0);
          TRef.current = 0;
          if ($) {
            set$(false);
            setPe(0);
          }
        }
        return y.filter((w) => w.y <= A - 30);
      });
      const v = Math.max(2500 - D * 100, 1200) * (me ? 1.5 : 1) * Ce.spawn[f];
      if (a - feRef.current > v && j.length > 0) {
        feRef.current = a;
        const text = j[Math.floor(Math.random() * j.length)];
        const y = h[Math.floor(Math.random() * h.length)];
        const lane = Math.floor(Math.random() * P);
        const isPowerUp = Math.random() < 0.08;
        const w = ["turbo", "shield", "slow", "multiplier"];
        const W = w[Math.floor(Math.random() * w.length)];
        const R = HRef.current?.clientWidth || 600;
        const E = lane * X + X * 0.1 + Math.random() * (X * 0.6);
        setI((It) => [
          ...It,
          {
            id: LeRef.current++,
            text,
            x: (E / 100) * R,
            y: -40,
            speed: (1.5 + D * 0.3 + Math.random() * 0.5) * u,
            color: isPowerUp ? yt[W] : y.color,
            glow: isPowerUp ? yt[W] : y.glow,
            matched: false,
            lane,
            isPowerUp,
            powerType: isPowerUp ? W : undefined,
          },
        ]);
      }
      AeRef.current = requestAnimationFrame(r);
    };
    AeRef.current = requestAnimationFrame(r);
    return () => cancelAnimationFrame(AeRef.current);
  }, [l, oe, O, j, D, playLose, playWrong, c, me, $, f]);
  React.useEffect(() => {
    if (l !== "playing" || oe || O) {
      return;
    }
    const t = () => {
      setBots((r) => {
        const a = r.map((p) => {
          const v = xe > p.progress ? 1.1 : 0.95;
          const progress = Math.min(p.progress + p.speed * v, 100);
          return {
            ...p,
            progress,
          };
        });
        if (a.find((p) => p.progress >= 100) && xe < 100) {
          setO(true);
          setWinner("bot");
          setOe(true);
          setL("gameover");
          playLose();
          setExpression("sad");
        }
        return a;
      });
      BeRef.current = setTimeout(t, 200);
    };
    BeRef.current = setTimeout(t, 200);
    return () => clearTimeout(BeRef.current);
  }, [l, oe, O, xe, playLose]);
  React.useEffect(() => {
    if (l !== "playing") {
      return;
    }
    const t = setInterval(() => {
      const r = (Date.now() - Ke) / 1000 / 60;
      if (r > 0) {
        const a = Math.round(L / r);
        setV(a);
        setEa((x) => [...x.slice(-20), a]);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [l, L, Ke]);
  React.useEffect(() => {
    const t = Math.floor(L / 5) + 1;
    setD(t);
  }, [L]);
  React.useEffect(() => {
    if (l !== "playing") {
      return;
    }
    const t = setInterval(() => {
      if (pe > 0) {
        setPe((r) => r - 1);
        if (pe <= 1) {
          set$(false);
        }
      }
      if (be > 0) {
        setBe((r) => r - 1);
        if (be <= 1) {
          setMe(false);
        }
      }
      if (ye > 0) {
        setYe((r) => r - 1);
        if (ye <= 1) {
          setTe(1);
        }
      }
      if (c) {
        setEe((r) => {
          if (r <= 0) {
            return (setC(false), 0);
          }
          return r - 1;
        });
      }
    }, 1000);
    return () => clearInterval(t);
  }, [l, pe, be, ye, c]);
  const Lt = (x_1, y_1, color) => {
    const x = ["circle", "square", "triangle", "star"];
    const p = Array.from(
      {
        length: 40,
      },
      (u, v) => {
        const b = Math.random() * Math.PI * 2;
        const y = 1 + Math.random() * 7;
        return {
          id: HeRef.current++,
          x: x_1,
          y: y_1,
          vx: Math.cos(b) * y,
          vy: Math.sin(b) * y - 3,
          color: v % 3 === 0 ? color : h[Math.floor(Math.random() * h.length)].color,
          size: 3 + Math.random() * 6,
          life: 1,
          maxLife: 1,
          shape: x[Math.floor(Math.random() * x.length)],
        };
      },
    );
    setZe((u) => [...u, ...p]);
  };
  const At = (t, r) => {
    const a = Array.from(
      {
        length: 12,
      },
      (x, p) => ({
        id: HeRef.current++,
        x: t + (Math.random() - 0.5) * 20,
        y: r + 10,
        color: Math.random() > 0.5 ? "#ff6600" : "#ffd600",
        life: 0.8 + Math.random() * 0.4,
      }),
    );
    setXe_1((x) => [...x, ...a]);
  };
  const rt = (t) => {
    setN(t);
    SeRef.current = t;
    if (IRef.current) {
      clearTimeout(IRef.current);
    }
    IRef.current = setTimeout(
      () => {
        setN("neutral");
        SeRef.current = "neutral";
      },
      t === "correct" ? 350 : 500,
    );
  };
  const onChange = (t) => {
    const r = t.target.value.toUpperCase();
    setValue(r);
    const a = i.find((x) => x.text === r && !x.matched);
    if (a) {
      setI((b) =>
        b.map((y) => {
          if (y.id === a.id) {
            return {
              ...y,
              matched: true,
            };
          }
          return y;
        }),
      );
      setValue("");
      rt("correct");
      if (a.isPowerUp && a.powerType) {
        switch (a.powerType) {
          case "turbo":
            setC(true);
            setEe(100);
            break;
          case "shield":
            set$(true);
            setPe(10);
            break;
          case "slow":
            setMe(true);
            setBe(5);
            break;
          case "multiplier":
            setTe(2);
            setYe(10);
            break;
        }
      }
      const p = (100 + Math.floor(a.speed * 20) + TRef.current * 10) * te;
      ZRef.current += p;
      setU(ZRef.current);
      setL_1((b) => b + 1);
      TRef.current += 1;
      setF(TRef.current);
      setJe(0);
      ZeRef.current.push(Date.now());
      if (!c) {
        setEe((b) => Math.min(100, b + 5 + TRef.current * 2));
      }
      if (Ee >= 100 && !c) {
        setC(true);
      }
      const u = 100 / se;
      setXe((b) => {
        const y = Math.min(b + u * (c ? 1.5 : 1), 100);
        if (y >= 100 && !O) {
          setO(true);
          setWinner("player");
          setL("victory");
          setTimeout(() => {
            setL("gameover");
            setOe(true);
            setKt((A) => {
              const C = Math.max(A, ZRef.current);
              localStorage.setItem("typing_best", String(C));
              return C;
            });
            setNt((A) => {
              const C = Math.max(A, TRef.current);
              localStorage.setItem("typing_bestcombo", String(C));
              return C;
            });
          }, 3000);
        }
        return y;
      });
      setPlayerLane(a.lane);
      playCorrect();
      const v = HRef.current;
      if (v) {
        const b = v.getBoundingClientRect();
        Vt(b.left + a.x + 40, b.top + a.y + 20, a.color);
        Lt(a.x + 40, a.y + 20, a.color);
        if (c || TRef.current >= 5) {
          At(a.x + 40, a.y + 20);
        }
        setFe((y) => [
          ...y,
          {
            id: Date.now() + Math.random(),
            x: a.x + 20,
            y: a.y,
            text: `+${p}`,
            color: a.color,
            life: 1.5,
          },
        ]);
      }
    } else {
      if (r.length >= 3 && !i.some((x) => x.text.startsWith(r) && !x.matched)) {
        setJe((x) => x + 1);
        rt("wrong");
        setSt(true);
        setTimeout(() => setSt(false), 250);
        if (Je >= 2) {
          setEe((x) => Math.max(0, x - 10));
        }
      }
    }
  };
  const onClick = () => {
    playClick();
    setI([]);
    setValue("");
    setU(0);
    ZRef.current = 0;
    setG(3);
    setD(1);
    setOe(false);
    setL_1(0);
    setF(0);
    TRef.current = 0;
    setFe([]);
    setZe([]);
    LeRef.current = 1;
    feRef.current = 0;
    setL("playing");
    setExpression("neutral");
    setMt(
      Array.from(
        {
          length: 16,
        },
        (r, a) => ({
          id: a,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 0.5 + Math.random() * 0.7,
          height: 30 + Math.random() * 80,
          lane: a % P,
        }),
      ),
    );
    setPlayerLane(1);
    setXe(0);
    const t = Ce.bot[f];
    setBots(
      ht.map((r, a) => ({
        id: a,
        lane: a >= 1 ? a + 1 : 0,
        progress: 0,
        speed: (r.speed + Math.random() * 0.01) * t,
        color: r.color,
        name: r.name,
        carStyle: a,
      })),
    );
    setV(0);
    setC(false);
    setEe(0);
    set$(false);
    setPe(0);
    setMe(false);
    setBe(0);
    setTe(1);
    setYe(0);
    setKe(Date.now());
    setO(false);
    setWinner(null);
    setXe_1([]);
    setJe(0);
    setJt(0);
    setEa([]);
    ZeRef.current = [];
    setN("neutral");
    SeRef.current = "neutral";
    if (IRef.current) {
      clearTimeout(IRef.current);
    }
  };
  if (l === "select") {
    return (
      <StarfieldBackground>
        <div
          className="max-w-6xl mx-auto px-4 py-6 min-h-screen flex flex-col"
          style={{
            perspective: "1000px",
          }}
        >
          <SoundToggles />
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/juegos"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
              style={{
                background: "linear-gradient(135deg,#00d4ff,#ff6b35)",
                boxShadow: "0 0 50px rgba(0,212,255,0.6), 0 0 80px rgba(255,107,53,0.3)",
                animation: "typingFloat 3s ease-in-out infinite",
              }}
            >
              <KeyboardIcon size={40} className="text-white md:w-12 md:h-12" />
              <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                style={{
                  background: "#ff00aa",
                  color: "#fff",
                  boxShadow: "0 0 10px rgba(255,0,170,0.5)",
                  animation: "pulseBadge 1.5s ease-in-out infinite",
                }}
              >
                <ZapIcon size={10} />
              </div>
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#00d4ff 0%,#ff6b35 50%,#ffd600 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(0,212,255,.5))",
                animation: "typingTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Typing Race 🏎️
            </h1>
            <p className="text-white/50 text-base md:text-lg mb-2">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {qe && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {qe}
              </div>
            )}
          </div>
          <div className="max-w-2xl mx-auto w-full mb-8">
            <p className="text-center text-white/60 text-sm font-bold mb-3">⚡ Velocidad / 速度</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  playClick();
                  setF_1("slow");
                }}
                className="flex-1 max-w-[140px] rounded-2xl py-3 px-4 text-sm font-black transition-all duration-300 border-2"
                style={{
                  background:
                    f === "slow"
                      ? "linear-gradient(135deg, rgba(57,255,20,0.2), rgba(0,212,255,0.2))"
                      : "rgba(255,255,255,0.05)",
                  borderColor: f === "slow" ? "rgba(57,255,20,0.6)" : "rgba(255,255,255,0.12)",
                  color: f === "slow" ? "#39ff14" : "rgba(255,255,255,0.5)",
                  boxShadow:
                    f === "slow" ? "0 0 25px rgba(57,255,20,0.3), 0 0 50px rgba(0,212,255,0.1)" : "none",
                  transform: f === "slow" ? "scale(1.05)" : "scale(1)",
                }}
              >
                <TurtleIcon size={20} className="mx-auto mb-1" />
                Lenta
              </button>
              <button
                onClick={() => {
                  playClick();
                  setF_1("normal");
                }}
                className="flex-1 max-w-[140px] rounded-2xl py-3 px-4 text-sm font-black transition-all duration-300 border-2"
                style={{
                  background:
                    f === "normal"
                      ? "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(255,214,0,0.2))"
                      : "rgba(255,255,255,0.05)",
                  borderColor: f === "normal" ? "rgba(0,212,255,0.6)" : "rgba(255,255,255,0.12)",
                  color: f === "normal" ? "#00d4ff" : "rgba(255,255,255,0.5)",
                  boxShadow:
                    f === "normal" ? "0 0 25px rgba(0,212,255,0.3), 0 0 50px rgba(255,214,0,0.1)" : "none",
                  transform: f === "normal" ? "scale(1.05)" : "scale(1)",
                }}
              >
                <GaugeIcon size={20} className="mx-auto mb-1" />
                Normal
              </button>
              <button
                onClick={() => {
                  playClick();
                  setF_1("fast");
                }}
                className="flex-1 max-w-[140px] rounded-2xl py-3 px-4 text-sm font-black transition-all duration-300 border-2"
                style={{
                  background:
                    f === "fast"
                      ? "linear-gradient(135deg, rgba(255,0,170,0.2), rgba(255,68,68,0.2))"
                      : "rgba(255,255,255,0.05)",
                  borderColor: f === "fast" ? "rgba(255,0,170,0.6)" : "rgba(255,255,255,0.12)",
                  color: f === "fast" ? "#ff00aa" : "rgba(255,255,255,0.5)",
                  boxShadow:
                    f === "fast" ? "0 0 25px rgba(255,0,170,0.3), 0 0 50px rgba(255,68,68,0.1)" : "none",
                  transform: f === "fast" ? "scale(1.05)" : "scale(1)",
                }}
              >
                <RabbitIcon size={20} className="mx-auto mb-1" />
                Rápida
              </button>
            </div>
            <p className="text-center text-white/30 text-xs mt-2 font-medium">
              {f === "slow"
                ? "Palabras caen despacio, bots lentos. Ideal para principiantes."
                : f === "fast"
                  ? "Palabras caen rápido, bots expertos. ¡Solo para valientes!"
                  : "Velocidad equilibrada. La experiencia clásica."}
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1"
            style={{
              perspective: "1000px",
            }}
          >
            <button
              onClick={() => {
                setQe("");
                at(null);
              }}
              className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                border: "1px solid rgba(255,255,255,.14)",
                backdropFilter: "blur(14px)",
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={(t) => {
                t.currentTarget.style.transform = "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                t.currentTarget.style.boxShadow = "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)";
                t.currentTarget.style.borderColor = "#00d4ff60";
              }}
              onMouseLeave={(t) => {
                t.currentTarget.style.transform = "";
                t.currentTarget.style.boxShadow = "";
                t.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
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
              <h3 className="text-white font-black text-base mb-1">Todos los módulos</h3>
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
            {Tt.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setQe("");
                  at(t.id);
                }}
                className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                  border: "1px solid rgba(255,255,255,.14)",
                  backdropFilter: "blur(14px)",
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={(r) => {
                  r.currentTarget.style.transform =
                    "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                  r.currentTarget.style.boxShadow = `0 0 60px ${t.color}30,0 25px 60px rgba(0,0,0,.5)`;
                  r.currentTarget.style.borderColor = `${t.color}60`;
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
                    background: `linear-gradient(90deg, ${t.color}00, ${t.color}, ${t.color}00)`,
                    backgroundSize: "200% 100%",
                    animation: "borderRotate 3s linear infinite",
                    zIndex: -1,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 20px ${t.color}30`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1">{t.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${t.color}aa`,
                  }}
                >
                  {t.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{t.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
          <Vt1Component expression="happy" />
          <style>{`
            @keyframes typingFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
            @keyframes typingTitlePulse { from{filter:drop-shadow(0 0 40px rgba(0,212,255,.5)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(0,212,255,.7)) brightness(1.2)} }
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes pulseBadge { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
            @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes mascotBounce { 0%{transform:translateY(0)} 100%{transform:translateY(-12px)} }
            @keyframes mascotBubble { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-4px)} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  const st =
    N === "correct"
      ? "rgba(57,255,20,0.8)"
      : N === "wrong"
        ? "rgba(255,42,109,0.8)"
        : c
          ? "rgba(255,214,0,0.6)"
          : "rgba(0,212,255,0.4)";
  const Wt =
    N === "correct"
      ? "rgba(57,255,20,0.7)"
      : N === "wrong"
        ? "rgba(255,42,109,0.7)"
        : c
          ? "rgba(255,214,0,0.5)"
          : "rgba(0,212,255,0.3)";
  const Yt =
    N === "correct"
      ? "rgba(57,255,20,0.12)"
      : N === "wrong"
        ? "rgba(255,42,109,0.12)"
        : c
          ? "rgba(255,214,0,0.08)"
          : "rgba(0,212,255,0.08)";
  const color = N === "correct" ? "#39ff14" : N === "wrong" ? "#ff2a6d" : c ? "#ffd600" : "#00d4ff";
  return (
    <StarfieldBackground>
      <div
        className="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6 min-h-[95vh] flex flex-col relative z-10"
        style={{
          transform: St ? `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)` : "none",
          transition: "transform 0.05s",
          touchAction: "manipulation",
        }}
      >
        <SoundToggles />
        <div className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2">
          <Link
            to="/juegos"
            onClick={() => playClick()}
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setL("select");
              }}
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> <span className="hidden sm:inline">Cambiar módulo / 切换模块</span>
              <span className="sm:hidden">Módulo</span>
            </button>
            <div
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold"
              style={{
                background: "rgba(0,212,255,.1)",
                border: "1px solid rgba(0,212,255,.2)",
                color: "#00d4ff",
                boxShadow: "0 0 10px rgba(0,212,255,.1)",
              }}
            >
              <ZapIcon size={12} /> {U}
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold"
              style={{
                background: "rgba(255,107,53,.1)",
                border: "1px solid rgba(255,107,53,.2)",
                color: "#ff6b35",
                boxShadow: "0 0 10px rgba(255,107,53,.1)",
              }}
            >
              <FlameIcon size={12} /> x{F}
            </div>
            <div
              className="flex items-center gap-1 px-2.5 md:px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold"
              style={{
                background: "rgba(255,0,0,.1)",
                border: "1px solid rgba(255,0,0,.2)",
                color: "#ff4444",
                boxShadow: "0 0 10px rgba(255,0,0,.1)",
              }}
            >
              {Array.from(
                {
                  length: 3,
                },
                (t, r) => (
                  <HeartIcon
                    key={r}
                    size={12}
                    fill={r < G ? "#ff4444" : "transparent"}
                    style={{
                      color: r < G ? "#ff4444" : "rgba(255,255,255,.2)",
                      filter: r < G ? "drop-shadow(0 0 4px rgba(255,68,68,.6))" : "none",
                    }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
        <div className="text-center mb-2 md:mb-3">
          <h1
            className="text-2xl md:text-4xl font-black mb-1"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#ff6b35,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(0,212,255,.4))",
              animation: "typingTitlePulse 2.5s ease-in-out infinite alternate",
            }}
          >
            Typing Race 🏎️
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-medium">
            Escribe la palabra antes de que toque el fondo / 在单词触底前输入
          </p>
          {f !== "normal" && (
            <div
              className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-black"
              style={{
                background: f === "slow" ? "rgba(57,255,20,.1)" : "rgba(255,0,170,.1)",
                border: `1px solid ${f === "slow" ? "rgba(57,255,20,.3)" : "rgba(255,0,170,.3)"}`,
                color: f === "slow" ? "#39ff14" : "#ff00aa",
              }}
            >
              {f === "slow" ? <TurtleIcon size={10} /> : <RabbitIcon size={10} />}
              {f === "slow" ? "Velocidad: Lenta" : "Velocidad: Rápida"}
            </div>
          )}
        </div>
        <TComponent
          playerProgress={xe}
          bots={bots}
          playerLane={playerLane}
          turbo={c}
          shield={$}
          raceFinished={O}
          winner={winner}
        />
        <div className="max-w-2xl mx-auto w-full mb-2 md:mb-3">
          <div className="flex items-center gap-3">
            <KtComponent wpm={V} turbo={c} />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <GaugeIcon size={14} className="text-cyan-400 shrink-0" />
                <div
                  className="flex-1 h-3 rounded-full overflow-hidden relative"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,.4)",
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300 relative"
                    style={{
                      width: `${Math.min((V / 80) * 100, 100)}%`,
                      background:
                        V > 50
                          ? "linear-gradient(90deg,#ffd600,#ff6b35)"
                          : "linear-gradient(90deg,#00d4ff,#39ff14)",
                      boxShadow: V > 50 ? "0 0 15px rgba(255,214,0,.6)" : "0 0 15px rgba(0,212,255,.6)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
                        animation: "shimmer 1.5s linear infinite",
                      }}
                    />
                  </div>
                </div>
                <span className="text-[10px] md:text-xs font-black text-cyan-400 w-12 text-right">
                  {V} WPM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ZapIcon
                  size={14}
                  className="text-yellow-400 shrink-0"
                  style={{
                    filter: c ? "drop-shadow(0 0 6px rgba(255,214,0,0.8))" : "none",
                  }}
                />
                <div
                  className="flex-1 h-3 rounded-full overflow-hidden relative"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,.4)",
                    border: c ? "1px solid rgba(255,214,0,0.4)" : "1px solid transparent",
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300 relative"
                    style={{
                      width: `${Ee}%`,
                      background: c
                        ? "linear-gradient(90deg,#ff6b35,#ffd600,#ff6b35)"
                        : "linear-gradient(90deg,#ffd600,#ff6b35)",
                      boxShadow: c
                        ? "0 0 20px rgba(255,107,53,.8), 0 0 40px rgba(255,214,0,.4)"
                        : "0 0 10px rgba(255,214,0,.3)",
                      animation: c ? "turboShimmer 0.5s linear infinite" : "none",
                    }}
                  >
                    {c && <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />}
                  </div>
                </div>
                <span className="text-[10px] md:text-xs font-black text-yellow-400 w-12 text-right">
                  {c ? "NITRO" : `${Ee}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
          {$ && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(0,212,255,.15)",
                border: "1px solid rgba(0,212,255,.3)",
                color: "#00d4ff",
                animation: "shieldPulse 1s ease-in-out infinite",
              }}
            >
              <ShieldIcon size={10} /> Escudo {pe}s
            </div>
          )}
          {me && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(57,255,20,.15)",
                border: "1px solid rgba(57,255,20,.3)",
                color: "#39ff14",
              }}
            >
              <TimerIcon size={10} /> Slow-Mo {be}s
            </div>
          )}
          {te > 1 && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(255,0,170,.15)",
                border: "1px solid rgba(255,0,170,.3)",
                color: "#ff00aa",
              }}
            >
              <StarIcon size={10} /> x{te} {ye}s
            </div>
          )}
          {c && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(255,214,0,.15)",
                border: "1px solid rgba(255,214,0,.3)",
                color: "#ffd600",
                animation: "turboPulse 0.5s ease-in-out infinite",
              }}
            >
              <FlameIcon size={10} /> TURBO ON
            </div>
          )}
        </div>
        <div className="max-w-2xl mx-auto w-full mb-2 md:mb-3">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] md:text-xs font-bold uppercase tracking-wider"
              style={{
                color: "#00d4ff",
                textShadow: "0 0 8px rgba(0,212,255,0.4)",
              }}
            >
              Nivel {D}
            </span>
            <span
              className="text-[10px] md:text-xs font-bold"
              style={{
                color: "rgba(207,216,255,.5)",
              }}
            >
              {L} / {se} palabras
            </span>
          </div>
          <div
            className="h-3 md:h-4 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,.06)",
              boxShadow: "inset 0 0 8px rgba(0,0,0,.4)",
              transform: "translateZ(0)",
              perspective: "500px",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 relative"
              style={{
                width: `${Math.min((L / se) * 100, 100)}%`,
                background: "linear-gradient(90deg,#00d4ff,#ff6b35,#ffd600)",
                boxShadow: "0 0 15px rgba(0,212,255,.6), 0 0 30px rgba(255,107,53,.4)",
                transform: "translateZ(2px)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
                  animation: "shimmer 1.5s linear infinite",
                }}
              />
            </div>
            <div className="absolute top-0 bottom-0 flex items-center justify-between px-1 w-full pointer-events-none">
              {[0, 1, 2, 3, 4].map((t) => (
                <div
                  key={t}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: (L / se) * 5 > t ? "#00d4ff" : "rgba(255,255,255,0.15)",
                    boxShadow: (L / se) * 5 > t ? "0 0 6px rgba(0,212,255,0.6)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {F > 1 && (
          <div className="text-center mb-2 md:mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-black"
              style={{
                background: F >= 5 ? "rgba(255,0,170,.15)" : "rgba(255,107,53,.15)",
                border: F >= 5 ? "1px solid rgba(255,0,170,.3)" : "1px solid rgba(255,107,53,.3)",
                color: F >= 5 ? "#ff00aa" : "#ff6b35",
                boxShadow:
                  F >= 5
                    ? "0 0 20px rgba(255,0,170,.3), 0 0 40px rgba(255,0,170,.1)"
                    : "0 0 15px rgba(255,107,53,.2)",
                animation: "comboPulse 0.8s ease-in-out infinite",
              }}
            >
              <FlameIcon size={14} /> ¡Combo x{F}! {F >= 5 ? "🔥🔥" : "🔥"} {te > 1 && `x${te}`}
            </span>
          </div>
        )}
        <div
          ref={HRef}
          className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden mb-3 md:mb-4"
          style={{
            background: "linear-gradient(180deg,rgba(14,22,64,.5),rgba(5,8,27,.4))",
            border: "1px solid rgba(0,212,255,.15)",
            minHeight: "clamp(420px, 60vh, 700px)",
            perspective: "1000px",
            boxShadow: "inset 0 0 40px rgba(0,212,255,0.05), 0 0 30px rgba(0,0,0,0.3)",
            touchAction: "manipulation",
          }}
          onClick={() => ceRef.current?.focus()}
        >
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {Array.from({
              length: P + 1,
            }).map((t) => (
              <div
                key={t}
                className="absolute top-0 bottom-0 w-px"
                style={{
                  left: `${(t / P) * 100}%`,
                  background: "linear-gradient(180deg,transparent,#00d4ff,transparent)",
                  opacity: 0.3,
                  boxShadow: "0 0 4px rgba(0,212,255,0.3)",
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            {Mt.map((t) => (
              <div
                key={t.id}
                className="absolute w-px bg-gradient-to-b from-transparent via-white to-transparent rounded-full"
                style={{
                  left: `${t.left}%`,
                  top: "-10%",
                  height: `${t.height}px`,
                  animation: `speedLineDrop ${t.duration}s linear infinite`,
                  animationDelay: `${t.delay}s`,
                  opacity: c ? 0.8 : 0.4,
                }}
              />
            ))}
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-3 md:h-4 pointer-events-none opacity-40"
            style={{
              background:
                "repeating-linear-gradient(90deg, #fff 0px, #fff 6px, transparent 6px, transparent 12px), repeating-linear-gradient(0deg, #fff 0px, #fff 6px, #000 6px, #000 12px)",
              backgroundSize: "12px 12px",
              mixBlendMode: "overlay",
            }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {Array.from({
              length: 50,
            }).map((t, r) => {
              const a = Math.random();
              return (
                <div
                  key={r}
                  className="absolute rounded-full"
                  style={{
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: h[r % h.length].color,
                    boxShadow: `0 0 ${4 + a * 8}px ${h[r % h.length].color}`,
                    animation: `particleFloat ${3 + Math.random() * 5}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: 0.3 + Math.random() * 0.5,
                    transform: `translateZ(${a * 50}px)`,
                  }}
                />
              );
            })}
          </div>
          {Je >= 2 && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {Array.from({
                length: 5,
              }).map((t, r) => (
                <div
                  key={`smoke-${r}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    bottom: `${10 + Math.random() * 20}%`,
                    width: `${20 + Math.random() * 30}px`,
                    height: `${20 + Math.random() * 30}px`,
                    background: "rgba(100,100,100,0.3)",
                    filter: "blur(8px)",
                    animation: "smokeRise 2s ease-out infinite",
                    animationDelay: `${r * 0.3}s`,
                  }}
                />
              ))}
            </div>
          )}
          {i.map((t) => {
            const r = HRef.current?.clientHeight || 500;
            const a = Math.min(t.y / r, 1);
            const x = 1 + a * 0.3;
            const p = 1 + a * 0.5;
            return (
              <div
                key={t.id}
                className="absolute pointer-events-none transition-none"
                style={{
                  left: t.x,
                  top: t.y,
                  zIndex: 2 + Math.floor(a * 5),
                  transform: `translateZ(${a * 30}px) scale(${x})`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black whitespace-nowrap"
                  style={{
                    color: t.color,
                    textShadow: `0 0 ${10 * p}px ${t.glow}, 0 0 ${20 * p}px ${t.glow}, 0 0 ${40 * p}px ${t.glow}`,
                    border: t.isPowerUp ? `2px solid ${t.color}` : `1px solid ${t.color}50`,
                    background: t.isPowerUp
                      ? `linear-gradient(180deg, ${t.color}30, ${t.color}10)`
                      : `linear-gradient(180deg, ${t.color}15, ${t.color}05)`,
                    boxShadow: t.isPowerUp
                      ? `0 0 ${25 * p}px ${t.glow}80, 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
                      : `0 0 ${20 * p}px ${t.glow}50, 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
                    animation: t.isPowerUp
                      ? "wordFloat 1s ease-in-out infinite, powerUpGlow 1s ease-in-out infinite alternate"
                      : "wordFloat 2s ease-in-out infinite",
                  }}
                >
                  {t.isPowerUp && (
                    <span className="mr-1">
                      {t.powerType === "turbo" && "⚡"}
                      {t.powerType === "shield" && "🛡️"}
                      {t.powerType === "slow" && "⏱️"}
                      {t.powerType === "multiplier" && "✨"}
                    </span>
                  )}
                  <div
                    className="absolute -bottom-1 left-1 w-1.5 h-1 rounded-full opacity-60"
                    style={{
                      background: t.color,
                      boxShadow: `0 0 8px ${t.color}`,
                    }}
                  />
                  <div
                    className="absolute -bottom-1 right-1 w-1.5 h-1 rounded-full opacity-60"
                    style={{
                      background: t.color,
                      boxShadow: `0 0 8px ${t.color}`,
                    }}
                  />
                  {t.text}
                </div>
              </div>
            );
          })}
          {Fe.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none font-black text-base md:text-lg z-20"
              style={{
                left: t.x,
                top: t.y,
                color: t.color,
                textShadow: `0 0 10px ${t.color}, 0 0 20px ${t.color}`,
                opacity: t.life,
                transform: `translateZ(50px) scale(${1 + (1.5 - t.life) * 0.5})`,
                animation: "scoreFloat 0.5s ease-out",
              }}
            >
              {t.text}
            </div>
          ))}
          {ze.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-30"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: t.color,
                borderRadius: t.shape === "circle" ? "50%" : t.shape === "square" ? "2px" : "0",
                clipPath:
                  t.shape === "triangle"
                    ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                    : t.shape === "star"
                      ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                      : "none",
                opacity: t.life,
                transform: `rotate(${t.x * 10}deg)`,
                boxShadow: `0 0 6px ${t.color}`,
              }}
            />
          ))}
          {Xe.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-25 rounded-full"
              style={{
                left: t.x,
                top: t.y,
                width: "4px",
                height: "4px",
                background: t.color,
                opacity: t.life,
                boxShadow: `0 0 8px ${t.color}`,
              }}
            />
          ))}
        </div>
        <div className="max-w-2xl mx-auto w-full mb-3 md:mb-4 relative">
          <div
            className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-50 blur-md pointer-events-none"
            style={{
              background:
                N === "correct"
                  ? "linear-gradient(135deg, rgba(57,255,20,0.5), rgba(0,212,255,0.3))"
                  : N === "wrong"
                    ? "linear-gradient(135deg, rgba(255,42,109,0.5), rgba(255,68,68,0.4))"
                    : c
                      ? "linear-gradient(135deg, rgba(255,214,0,0.4), rgba(255,107,53,0.4))"
                      : "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(255,107,53,0.2))",
              animation:
                N === "correct"
                  ? "inputGlowCorrect 0.3s ease-out"
                  : N === "wrong"
                    ? "inputGlowWrong 0.5s ease-out"
                    : c
                      ? "inputGlowFast 0.5s ease-in-out infinite alternate"
                      : "inputGlow 2s ease-in-out infinite alternate",
            }}
          />
          <input
            ref={ceRef}
            type="text"
            value={value}
            onChange={onChange}
            autoFocus
            placeholder="Escribe aquí / 在此输入..."
            className="relative w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl md:rounded-3xl text-center text-lg md:text-xl font-black tracking-widest uppercase transition-all outline-none min-h-[48px]"
            style={{
              background: Yt,
              border: `2px solid ${Wt}`,
              color,
              boxShadow: `0 0 30px ${st}, inset 0 0 20px ${st}`,
              backdropFilter: "blur(10px)",
              animation: N === "wrong" ? "inputShake 0.4s ease-in-out" : "none",
            }}
          />
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
            <KeyboardIcon
              size={20}
              className="md:w-6 md:h-6"
              style={{
                color,
              }}
            />
          </div>
          {c && (
            <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <FlameIcon
                size={20}
                className="text-yellow-400 animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255,214,0,0.8))",
                }}
              />
            </div>
          )}
          {N === "correct" && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <div
                className="text-green-400 font-black text-xs"
                style={{
                  textShadow: "0 0 10px rgba(57,255,20,0.9)",
                  animation: "fadeUp 0.5s ease-out forwards",
                }}
              >
                ✓
              </div>
            </div>
          )}
          {N === "wrong" && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <div
                className="text-red-400 font-black text-xs"
                style={{
                  textShadow: "0 0 10px rgba(255,42,109,0.9)",
                  animation: "fadeUp 0.5s ease-out forwards",
                }}
              >
                ✗
              </div>
            </div>
          )}
        </div>
        <Vt1Component expression={expression} turbo={c} combo={F} winner={l === "victory"} />
        {l === "victory" && (
          <div className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({
                length: 80,
              }).map((t, r) => (
                <div
                  key={`vic-${r}`}
                  className="absolute w-2.5 h-2.5 rounded-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "-5%",
                    background: h[r % h.length].color,
                    boxShadow: `0 0 10px ${h[r % h.length].color}, 0 0 20px ${h[r % h.length].color}`,
                    animation: `confettiFall ${1.5 + Math.random() * 3}s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: 0.8,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
            <div
              className="text-center"
              style={{
                animation: "winnerPop 0.6s ease-out",
              }}
            >
              <CrownIcon
                size={64}
                className="mx-auto mb-2 text-yellow-400"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,0.8))",
                  animation: "trophySpin 2s ease-in-out infinite",
                }}
              />
              <h2
                className="text-3xl md:text-5xl font-black text-yellow-400 mb-2"
                style={{
                  textShadow: "0 0 30px rgba(255,214,0,0.8), 0 0 60px rgba(255,214,0,0.4)",
                }}
              >
                ¡GANADOR!
              </h2>
              <p className="text-white/70 text-sm md:text-base">Cruzaste la meta primero 🏁</p>
            </div>
          </div>
        )}
        {(l === "gameover" || l === "victory") && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(25px)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({
                length: 60,
              }).map((t, r) => (
                <div
                  key={r}
                  className="absolute w-2.5 h-2.5 rounded-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "-5%",
                    background: h[r % h.length].color,
                    boxShadow: `0 0 10px ${h[r % h.length].color}`,
                    animation: `confettiFall ${2 + Math.random() * 4}s linear infinite`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: 0.6,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
            <div
              className="text-center p-6 md:p-8 rounded-2xl md:rounded-3xl max-w-md mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.65))",
                border: l === "victory" ? "1px solid rgba(255,214,0,.25)" : "1px solid rgba(255,68,68,.25)",
                boxShadow:
                  l === "victory"
                    ? "0 0 60px rgba(255,214,0,.2), 0 0 120px rgba(255,214,0,.1)"
                    : "0 0 60px rgba(255,68,68,.2), 0 0 120px rgba(255,68,68,.1)",
                animation: "overlayPop 0.6s cubic-bezier(.2,.9,.2,1)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background:
                    l === "victory"
                      ? "linear-gradient(135deg,#ffd600,#ff6b35,#ff4444)"
                      : "linear-gradient(135deg,#ff4444,#ff6b35,#ffd600)",
                  filter: "blur(30px)",
                  animation: "overlayGlow 3s ease-in-out infinite alternate",
                }}
              />
              {l === "victory" ? (
                <CrownIcon
                  size={48}
                  className="md:w-14 md:h-14 mx-auto mb-3"
                  style={{
                    color: "#ffd600",
                    filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                    animation: "trophySpin 3s ease-in-out infinite",
                  }}
                />
              ) : (
                <TrophyIcon
                  size={48}
                  className="md:w-14 md:h-14 mx-auto mb-3"
                  style={{
                    color: "#ff4444",
                    filter: "drop-shadow(0 0 20px rgba(255,68,68,.6))",
                    animation: "trophySpin 3s ease-in-out infinite",
                  }}
                />
              )}
              <h2
                className="text-2xl md:text-3xl font-black mb-1"
                style={{
                  background:
                    l === "victory"
                      ? "linear-gradient(135deg,#ffd600,#ff6b35)"
                      : "linear-gradient(135deg,#ff4444,#ff6b35,#ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    l === "victory"
                      ? "drop-shadow(0 0 15px rgba(255,214,0,.4))"
                      : "drop-shadow(0 0 15px rgba(255,68,68,.4))",
                }}
              >
                {l === "victory" ? "¡Victoria!" : "¡Game Over!"}
              </h2>
              <p className="text-white/50 text-sm mb-5 md:mb-6">
                {l === "victory" ? "¡Cruzaste la meta!" : "游戏结束！"}
              </p>
              <div
                className="grid grid-cols-2 gap-3 mb-5 md:mb-6"
                style={{
                  perspective: "800px",
                }}
              >
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,255,.08)",
                    border: "1px solid rgba(0,212,255,.2)",
                    boxShadow: "0 0 15px rgba(0,212,255,.1), 0 8px 32px rgba(0,0,0,.3)",
                    backdropFilter: "blur(10px)",
                    transform: "translateZ(10px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, transparent)",
                    }}
                  />
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(0,212,255,0.4))",
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
                      textShadow: "0 0 10px rgba(0,212,255,0.4)",
                    }}
                  >
                    {U}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(57,255,20,.08)",
                    border: "1px solid rgba(57,255,20,.2)",
                    boxShadow: "0 0 15px rgba(57,255,20,.1), 0 8px 32px rgba(0,0,0,.3)",
                    backdropFilter: "blur(10px)",
                    transform: "translateZ(15px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: "linear-gradient(135deg, #39ff14, transparent)",
                    }}
                  />
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(57,255,20,0.4))",
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
                      color: "#39ff14",
                      textShadow: "0 0 10px rgba(57,255,20,0.4)",
                    }}
                  >
                    {kt}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,214,0,.08)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 15px rgba(255,214,0,.1), 0 8px 32px rgba(0,0,0,.3)",
                    backdropFilter: "blur(10px)",
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: "linear-gradient(135deg, #ffd600, transparent)",
                    }}
                  />
                  <FlameIcon
                    size={16}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,214,0,0.4))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Combo Max
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,0.4)",
                    }}
                  >
                    {Nt}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,0,170,.08)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 15px rgba(255,0,170,.1), 0 8px 32px rgba(0,0,0,.3)",
                    backdropFilter: "blur(10px)",
                    transform: "translateZ(25px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: "linear-gradient(135deg, #ff00aa, transparent)",
                    }}
                  />
                  <Gamepad2Icon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,0,170,0.4))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Palabras
                  </p>
                  <p
                    className="text-lg md:text-xl font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,0.4)",
                    }}
                  >
                    {L}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClick}
                  className="px-6 md:px-8 py-2.5 md:py-3 rounded-full text-white font-black text-sm md:text-base transition-all hover:scale-105"
                  style={{
                    background:
                      l === "victory"
                        ? "linear-gradient(135deg,#ffd600,#ff6b35)"
                        : "linear-gradient(135deg,#ff4444,#ff6b35)",
                    boxShadow:
                      l === "victory"
                        ? "0 0 30px rgba(255,214,0,.4), 0 0 60px rgba(255,214,0,.2)"
                        : "0 0 30px rgba(255,68,68,.4), 0 0 60px rgba(255,68,68,.2)",
                    animation: "buttonPulse 2s ease-in-out infinite alternate",
                  }}
                >
                  {l === "victory" ? "¡Otra carrera! / 再来一局" : "Reintentar / 重试"}
                </button>
              </div>
              <P_1 currentGameId="typing-race" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes particleFloat { 0%,100%{transform:translateY(0) translateX(0) translateZ(0)} 25%{transform:translateY(-15px) translateX(5px) translateZ(10px)} 50%{transform:translateY(-5px) translateX(-5px) translateZ(20px)} 75%{transform:translateY(-20px) translateX(3px) translateZ(5px)} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes comboPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
          @keyframes overlayPop { 0%{transform:scale(0.8) rotateX(10deg);opacity:0} 100%{transform:scale(1) rotateX(0deg);opacity:1} }
          @keyframes overlayGlow { from{filter:blur(30px) brightness(0.8)} to{filter:blur(35px) brightness(1.2)} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0) scale(1)} 50%{transform:rotateY(180deg) scale(1.15)} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes typingTitlePulse { from{filter:drop-shadow(0 0 25px rgba(0,212,255,.4)) brightness(1)} to{filter:drop-shadow(0 0 50px rgba(0,212,255,.6)) brightness(1.15)} }
          @keyframes wordFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
          @keyframes powerUpGlow { from{box-shadow:0 0 20px rgba(255,255,255,0.1)} to{box-shadow:0 0 30px rgba(255,255,255,0.3)} }
          @keyframes scoreFloat { 0%{transform:translateZ(50px) scale(1)} 100%{transform:translateZ(80px) scale(1.3)} }
          @keyframes speedLineDrop { 0%{transform:translateY(-120%)} 100%{transform:translateY(120vh)} }
          @keyframes confettiFall { 0%{transform:translateY(-10vh) rotate(0deg)} 100%{transform:translateY(110vh) rotate(720deg)} }
          @keyframes inputGlow { from{opacity:0.3} to{opacity:0.6} }
          @keyframes inputGlowFast { from{opacity:0.4} to{opacity:0.7} }
          @keyframes inputGlowCorrect { 0%{opacity:0.8} 100%{opacity:0.3} }
          @keyframes inputGlowWrong { 0%{opacity:0.8} 100%{opacity:0.3} }
          @keyframes inputShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
          @keyframes fadeUp { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-20px);opacity:0} }
          @keyframes buttonPulse { from{box-shadow:0 0 30px rgba(255,68,68,.4), 0 0 60px rgba(255,68,68,.2)} to{box-shadow:0 0 40px rgba(255,68,68,.6), 0 0 80px rgba(255,68,68,.3)} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes mascotBounce { 0%{transform:translateY(0)} 100%{transform:translateY(-12px)} }
          @keyframes mascotBubble { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-4px)} }
          @keyframes shieldPulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.1);opacity:0.3} }
          @keyframes turboPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
          @keyframes turboShimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes smokeRise { 0%{transform:translateY(0) scale(1);opacity:0.4} 100%{transform:translateY(-40px) scale(1.5);opacity:0} }
          @keyframes winnerPop { 0%{transform:scale(0.5);opacity:0} 100%{transform:scale(1);opacity:1} }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { XaComponent as default };
