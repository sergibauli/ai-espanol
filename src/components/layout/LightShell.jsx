import * as React from "react";
import { Link, useLocation } from "react-router";
import { Emoji3D } from "../ui/Emoji3D.jsx";
import { GameStats } from "../ui/GameStats.jsx";
import { useAppAuth } from "../../lib/auth.jsx";
import { attachLightAdapter } from "./lightAdapter.js";

// Navegación de la experiencia de aprendizaje (tema claro, estilo app)
const MAIN = [
  { to: "/ruta", emoji: "🏠", es: "Aprender", zh: "学习" },
  { to: "/modulos", emoji: "📚", es: "Unidades", zh: "单元" },
  { to: "/oficial", emoji: "🏆", es: "DELE", zh: "考试" },
  { to: "/juegos", emoji: "🎮", es: "Juegos", zh: "游戏" },
  { to: "/tutor-voz", emoji: "🐵", es: "Tutor IA", zh: "AI导师" },
];
const MORE = [
  ["/gramatica", "📖", "Gramática · 语法"],
  ["/diccionarios", "🔤", "Diccionario · 词典"],
  ["/pronunciacion", "🗣️", "Pronunciación · 发音"],
  ["/memoria", "🧠", "Repaso · 记忆"],
  ["/videos", "🎬", "Vídeos · 视频"],
];

export function LightShell({ children, legacy = false, stage = false }) {
  const { pathname } = useLocation();
  const { logout } = useAppAuth();
  const mainRef = React.useRef(null);
  const adapt = legacy || ADAPT_ROUTES(pathname);
  React.useEffect(() => (adapt ? attachLightAdapter(mainRef.current) : undefined), [adapt, pathname]);
  const active = (to) =>
    pathname === to ||
    (to !== "/ruta" && pathname.startsWith(to)) ||
    (to === "/ruta" && pathname === "/dashboard") ||
    (to === "/oficial" && /^\/examenes/.test(pathname));
  return (
    <div className={`light-page ${legacy || adapt ? "light-legacy" : ""} ${stage ? "has-stage" : ""}`}>
      <div className="light-top">
        <Link to="/ruta" className="side-brand" style={{ padding: 0, fontSize: 20 }}>
          <img src="./mono-face.png" alt="" className="mono-logo" style={{ width: 34, height: 34 }} /> AI Español
        </Link>
        <GameStats compact />
      </div>
      <div className="light-shell">
        <nav className="side-nav" aria-label="Navegación principal">
          <Link to="/ruta" className="side-brand">
            <img src="./mono-face.png" alt="" className="mono-logo e3d-float" /> AI Español
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
          <details className="side-sub" open={MORE.some(([to]) => pathname.startsWith(to))}>
            <summary>Más herramientas · 更多</summary>
            {MORE.map(([to, e, label]) => (
              <Link key={to} to={to} className={pathname.startsWith(to) ? "on" : ""}>
                <Emoji3D emoji={e} size={22} /> {label}
              </Link>
            ))}
            <a href="#/" onClick={(e) => (e.preventDefault(), logout())}>
              Salir · 退出
            </a>
          </details>
        </nav>
        <main ref={mainRef} className={pathname.startsWith("/juegos/") ? "game-bg" : ""} style={{ minWidth: 0 }}>{stage ? <div className="app-stage">{children}</div> : children}</main>
      </div>
      <nav className="bottom-nav" aria-label="Navegación móvil">
        {MAIN.map((m) => (
          <Link key={m.to} to={m.to} className={active(m.to) ? "on" : ""} aria-label={m.es}>
            <Emoji3D emoji={m.emoji} size={34} />
          </Link>
        ))}
      </nav>
    </div>
  );
}

export const LIGHT_ROUTES = (p) => ["/ruta", "/dashboard", "/modulos", "/juegos", "/examenes/generador", "/oficial", "/tutor-voz"].includes(p) || /^\/modulos\/[^/]+/.test(p);

// Páginas antiguas que se muestran dentro del marco claro con la capa de traducción de colores
export const LEGACY_LIGHT = (p) => /^\/(gramatica|diccionarios|memoria|videos|consejos|ayudas|generador|examenes|examenes-nivel|oficial)(\/|$)/.test(p) && p !== "/oficial" && p !== "/examenes/generador";

// Páginas inmersivas (DELE oficial, pronunciación, karaoke, juegos): marco de app con su contenido en una "pantalla"
export const STAGE_ROUTES = (p) => /^\/(pronunciacion)/.test(p) || /^\/juegos\/.+/.test(p);
export const ADAPT_ROUTES = (p) => /^\/(pronunciacion|juegos\/.+)/.test(p);
