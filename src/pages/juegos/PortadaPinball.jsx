// Portada del «Pinball del dragón · 龙之弹球» para el Pabellón de juegos (escena SVG 320 × 180).
import * as React from "react";

export function PortadaPinball() {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const u = (n) => `url(#pbp${id}${n})`;
  const d = (n) => `pbp${id}${n}`;
  return (
    <>
      <defs>
        <radialGradient id={d("laca")} cx="50%" cy="45%" r="70%">
          <stop offset="0" stopColor="#e0384c" />
          <stop offset=".6" stopColor="#a90f26" />
          <stop offset="1" stopColor="#3f040d" />
        </radialGradient>
        <linearGradient id={d("oro")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a4f12" />
          <stop offset=".3" stopColor="#f2c14e" />
          <stop offset=".5" stopColor="#fff6cf" />
          <stop offset=".75" stopColor="#e0a83a" />
          <stop offset="1" stopColor="#7a4f12" />
        </linearGradient>
        <linearGradient id={d("jade")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9ffe0" />
          <stop offset=".45" stopColor="#3fae6a" />
          <stop offset="1" stopColor="#0f3d24" />
        </linearGradient>
        <radialGradient id={d("bola")} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset=".35" stopColor="#ffe08a" />
          <stop offset=".8" stopColor="#e0a92a" />
          <stop offset="1" stopColor="#7a4f12" />
        </radialGradient>
        <radialGradient id={d("luz")}>
          <stop offset="0" stopColor="#ffd27a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ff7a2a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={d("farol")} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fff6c8" />
          <stop offset=".4" stopColor="#ffb347" />
          <stop offset="1" stopColor="#c8102e" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#12020a" />
      {/* mesa en perspectiva */}
      <path d="M92 6 H228 Q262 6 270 40 L300 180 H20 L50 40 Q58 6 92 6 Z" fill={u("laca")} stroke={u("oro")} strokeWidth="4" />
      <path d="M96 14 H224 Q254 14 261 44 L288 176 H32 L59 44 Q66 14 96 14 Z" fill="none" stroke="#f2c14e" strokeOpacity=".45" strokeWidth="1" />
      <image href="./theme/dragon-enroscado.webp" x="105" y="14" width="110" height="160" opacity=".35" preserveAspectRatio="xMidYMid meet" />
      <image className="jh-p-nube" href="./theme/nube-oro.png" x="40" y="40" width="80" height="28" opacity=".45" />
      {/* luces del borde */}
      {Array.from({ length: 14 }, (_, i) => {
        const t = i / 13;
        const x = 66 + t * 188;
        return <circle key={i} className="jh-p-estrella" style={{ "--d": `${i * 0.15}s` }} cx={x} cy={22 + Math.abs(t - 0.5) * 20} r="2" fill="#ffd27a" />;
      })}
      {/* linternas */}
      {[
        [126, 48],
        [194, 48],
        [160, 74],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="20" fill={u("luz")} />
          <ellipse cx={x} cy={y} rx="12" ry="11" fill={u("farol")} stroke="#7a4f12" strokeWidth="1" />
          <rect x={x - 6} y={y - 13} width="12" height="4" rx="1.5" fill={u("oro")} />
          <rect x={x - 6} y={y + 9} width="12" height="4" rx="1.5" fill={u("oro")} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#8f0c21" fontFamily="STKaiti, KaiTi, serif">
            福
          </text>
        </g>
      ))}
      {/* placas con palabras */}
      {[
        [104, 108, "hola", false],
        [214, 108, "adiós", true],
        [160, 132, "gracias", false],
      ].map(([x, y, w, ok]) => (
        <g key={w}>
          <rect x={x - 28} y={y - 10} width="56" height="20" rx="10" fill={ok ? u("jade") : "#fff4dc"} stroke="#c8961e" strokeWidth="2" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill={ok ? "#fff" : "#3b2416"}>
            {w}
          </text>
        </g>
      ))}
      {/* bola con estela */}
      {[0.15, 0.3, 0.45].map((a, i) => (
        <circle key={i} cx={248 - i * 9} cy={86 + i * 7} r={4 + i} fill="#ffd27a" opacity={a} />
      ))}
      <circle cx="232" cy="96" r="20" fill={u("luz")} opacity=".7" />
      <circle cx="232" cy="96" r="7.5" fill={u("bola")} />
      {/* flippers de jade */}
      <path d="M98 160 L148 168 A4 4 0 0 1 146 175 L96 170 A6 6 0 0 1 98 160 Z" fill={u("jade")} stroke="#f2c14e" strokeWidth="1.5" />
      <path d="M222 160 L172 168 A4 4 0 0 0 174 175 L224 170 A6 6 0 0 0 222 160 Z" fill={u("jade")} stroke="#f2c14e" strokeWidth="1.5" />
      <image href="./mono/feliz.webp" x="262" y="92" width="50" height="89" />
    </>
  );
}
