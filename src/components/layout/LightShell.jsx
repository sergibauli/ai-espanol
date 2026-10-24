import * as React from "react";
import { Link, useLocation } from "react-router";
import { createPortal } from "react-dom";
import { NavIcon } from "../ui/NavIcon.jsx";
import { GameStats } from "../ui/GameStats.jsx";
import { useAppAuth } from "../../lib/auth.jsx";
import { attachLightAdapter } from "./lightAdapter.js";

// Navegación de la experiencia de aprendizaje (tema claro, estilo app)
const MAIN = [
  { to: "/ruta", icon: "ruta", es: "Aprender", zh: "学习" },
  { to: "/modulos", icon: "unidades", es: "Unidades", zh: "单元" },
  { to: "/oficial", icon: "dele", es: "DELE", zh: "考试" },
  { to: "/juegos", icon: "juegos", es: "Juegos", zh: "游戏" },
  { to: "/tutor-voz", icon: "tutor", es: "Tutor IA", zh: "AI导师" },
  { to: "/diccionarios", icon: "diccionario", es: "Diccionario", zh: "词典" },
  { to: "/pronunciacion", icon: "pronunciacion", es: "Pronunciación", zh: "发音" },
  { to: "/memoria", icon: "repaso", es: "Repaso", zh: "记忆" },
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
              <NavIcon name={m.icon} size={38} />
              <span>
                {m.es}
                <small>{m.zh}</small>
              </span>
            </Link>
          ))}
          <a href="#/" className="side-exit" onClick={(e) => (e.preventDefault(), logout())}>
            Salir · 退出
          </a>
        </nav>
        <main ref={mainRef} className={pathname.startsWith("/juegos/") ? "game-bg" : ""} style={{ minWidth: 0 }}>{stage ? <div className="app-stage">{children}</div> : children}</main>
      </div>
      {createPortal(
        <nav className="bottom-nav" aria-label="Navegación móvil">
          {MAIN.map((m) => (
            <Link key={m.to} to={m.to} className={active(m.to) ? "on" : ""} aria-label={m.es}>
              <NavIcon name={m.icon} size={30} />
              <small>{m.es}</small>
            </Link>
          ))}
        </nav>,
        document.body,
      )}
    </div>
  );
}

export const LIGHT_ROUTES = (p) => ["/ruta", "/dashboard", "/modulos", "/juegos", "/examenes/generador", "/oficial", "/tutor-voz", "/diccionarios", "/pronunciacion", "/examenes"].includes(p) || /^\/modulos\/[^/]+/.test(p);

// Páginas antiguas que se muestran dentro del marco claro con la capa de traducción de colores
export const LEGACY_LIGHT = (p) => /^\/(gramatica|memoria|videos|consejos|ayudas|generador|examenes|examenes-nivel|oficial)(\/|$)/.test(p) && p !== "/oficial" && p !== "/examenes" && p !== "/examenes/generador";

// Páginas inmersivas (DELE oficial, pronunciación, karaoke, juegos): marco de app con su contenido en una "pantalla"
export const STAGE_ROUTES = (p) => /^\/pronunciacion\/templo/.test(p) || /^\/juegos\/.+/.test(p);
export const ADAPT_ROUTES = (p) => /^\/(pronunciacion\/templo|juegos\/.+)/.test(p);
