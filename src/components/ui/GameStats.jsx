import * as React from "react";
import { Link } from "react-router";
import { Emoji3D } from "./Emoji3D.jsx";
import { useGame } from "../../lib/gamification.js";
import { getStreak } from "../../lib/streak.js";

// Racha, XP/nivel y vidas en una fila compacta (barra superior y Ruta)
export function GameStats({ compact = false }) {
  const g = useGame();
  const streak = getStreak();
  const items = [
    { emoji: "🔥", value: streak, title: "Racha · 连续天数", color: "#ff9600" },
    { emoji: "⚡", value: g.xp, title: `Nivel ${g.level} · ${g.into}/${g.need} XP`, color: "#ffc800" },
    { emoji: "❤️", value: g.hearts, title: "Vidas · 生命", color: "#ff4b6e" },
  ];
  return (
    <Link to="/ruta" className="game-stats" aria-label="Tu progreso">
      {items.map((it) => (
        <span key={it.emoji} className="game-stat" title={it.title} style={{ color: it.color }}>
          <Emoji3D emoji={it.emoji} size={compact ? 20 : 24} />
          <b>{it.value}</b>
        </span>
      ))}
    </Link>
  );
}

export function GoalRing({ pct, size = 64, children }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span style={{ position: "relative", width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,.1)" strokeWidth="7" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#ffc800" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} style={{ transition: "stroke-dashoffset .6s" }} />
      </svg>
      {children}
    </span>
  );
}
