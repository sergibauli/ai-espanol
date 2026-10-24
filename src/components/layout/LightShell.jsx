import * as React from "react";
import { Link, useLocation } from "react-router";
import { Emoji3D } from "../ui/Emoji3D.jsx";
import { GameStats } from "../ui/GameStats.jsx";
import { useAppAuth } from "../../lib/auth.jsx";

// Navegación de la experiencia de aprendizaje (tema claro, estilo app)
const MAIN = [
  { to: "/ruta", emoji: "🏠", es: "Aprender", zh: "学习" },
  { to: "/modulos", emoji: "📚", es: "Unidades", zh: "单元" },
  { to: "/examenes/generador", emoji: "📝", es: "Exámenes", zh: "考试" },
  { to: "/oficial", emoji: "🏆", es: "DELE", zh: "官方真题" },
  { to: "/juegos", emoji: "🎮", es: "Juegos", zh: "游戏" },
];
const MORE = [
  ["/gramatica", "Gramática · 语法"],
  ["/diccionarios", "Diccionarios · 词典"],
  ["/pronunciacion", "Pronunciación · 发音"],
  ["/memoria", "Repaso · 记忆"],
  ["/karaoke", "Karaoke · 卡拉OK"],
  ["/videos", "Vídeos · 视频"],
  ["/tutor-voz", "Tutor IA · AI导师"],
];

export function LightShell({ children }) {
  const { pathname } = useLocation();
  const { logout } = useAppAuth();
  const active = (to) => pathname === to || (to !== "/ruta" && pathname.startsWith(to)) || (to === "/ruta" && pathname === "/dashboard");
  return (
    <div className="light-page">
      <div className="light-top">
        <Link to="/ruta" className="side-brand" style={{ padding: 0, fontSize: 20 }}>
          <Emoji3D emoji="🐵" size={34} /> AI Español
        </Link>
        <GameStats compact />
      </div>
      <div className="light-shell">
        <nav className="side-nav" aria-label="Navegación principal">
          <Link to="/ruta" className="side-brand">
            <Emoji3D emoji="🐵" size={44} float /> AI Español
          </Link>
          {MAIN.map((m) => (
            <Link key={m.to} to={m.to} className={`side-link ${active(m.to) ? "on" : ""}`}>
              <Emoji3D emoji={m.emoji} size={32} />
              <span>
                {m.es}
                <small>{m.zh}</small>
              </span>
            </Link>
          ))}
          <div className="side-sub">
            {MORE.map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            <a href="#/login" onClick={(e) => (e.preventDefault(), logout())}>
              Salir · 退出
            </a>
          </div>
        </nav>
        <main style={{ minWidth: 0 }}>{children}</main>
      </div>
      <nav className="bottom-nav" aria-label="Navegación móvil">
        {MAIN.map((m) => (
          <Link key={m.to} to={m.to} className={active(m.to) ? "on" : ""}>
            <Emoji3D emoji={m.emoji} size={28} />
            {m.es}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export const LIGHT_ROUTES = (p) => p === "/ruta" || p === "/dashboard" || /^\/modulos\/[^/]+/.test(p);
