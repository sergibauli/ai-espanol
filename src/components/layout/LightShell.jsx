import * as React from "react";
import { Link, useLocation } from "react-router";
import { createPortal } from "react-dom";
import { LogOutIcon, XIcon } from "lucide-react";
import { NavIcon } from "../ui/NavIcon.jsx";
import { GameStats } from "../ui/GameStats.jsx";
import { SelectorIdioma } from "../ui/SelectorIdioma.jsx";
import { useAppAuth } from "../../lib/auth.jsx";
import { useGame } from "../../lib/gamification.js";
import { getStreak } from "../../lib/streak.js";
import { attachLightAdapter } from "./lightAdapter.js";
import { Logo } from "../../../packages/imperial/src/index.js";
import { precargar, precargarSecciones } from "../../lib/precarga.js";

// Navegación de la experiencia de aprendizaje (tema claro, estilo app)
const MAIN = [
  { to: "/ruta", icon: "ruta", es: "Aprender", zh: "学习" },
  { to: "/modulos", icon: "unidades", es: "Unidades", zh: "单元" },
  { to: "/oficial", icon: "dele", es: "DELE", zh: "考试" },
  { to: "/mi-dele", icon: "progreso", es: "Mi DELE", zh: "我的进度" },
  { to: "/juegos", icon: "juegos", es: "Juegos", zh: "游戏" },
  { to: "/diccionarios", icon: "diccionario", es: "Diccionario", zh: "词典" },
  { to: "/pronunciacion", icon: "pronunciacion", es: "Pronunciación", zh: "发音" },
  { to: "/memoria", icon: "repaso", es: "Repaso", zh: "记忆" },
  { to: "/tutor-voz", icon: "tutor", es: "Tutor IA", zh: "AI导师" },
];
// En móvil la barra inferior lleva las 5 primeras; el resto se abre con «Más»
const MOVIL_FIJAS = MAIN.slice(0, 5);
const MOVIL_MAS = MAIN.slice(5);

// Ficha de «hoy» en el menú lateral: racha y anillo del objetivo diario de XP
function FichaHoy() {
  const juego = useGame();
  const racha = getStreak();
  const radio = 19;
  const circunferencia = 2 * Math.PI * radio;
  const cumplido = juego.goalPct >= 100;
  return (
    <Link to="/mi-dele" className={`in-hoy ${cumplido ? "is-cumplido" : ""}`} aria-label={`Hoy: ${juego.dailyXp} de ${juego.goal} XP, racha de ${racha} días`}>
      <span className="in-hoy__anillo" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="48" height="48">
          <circle cx="24" cy="24" r={radio} className="in-hoy__fondo" />
          <circle cx="24" cy="24" r={radio} className="in-hoy__valor" strokeDasharray={circunferencia} strokeDashoffset={circunferencia * (1 - juego.goalPct / 100)} />
        </svg>
        <b translate="no">{cumplido ? "✓" : `${juego.goalPct}%`}</b>
      </span>
      <span className="in-hoy__texto">
        <b>
          Meta de hoy <span lang="zh">今日目标</span>
        </b>
        <small>
          {juego.dailyXp}/{juego.goal} XP
        </small>
        <small className="in-hoy__racha">
          🔥 {racha} {racha === 1 ? "día" : "días"} · 连续{racha}天
        </small>
      </span>
    </Link>
  );
}

// Hoja «Más · 更多» de la barra inferior móvil
function HojaMas({ abierta, onCerrar, activo }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!abierta) return;
    const teclado = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", teclado);
    ref.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", teclado);
  }, [abierta, onCerrar]);
  if (!abierta) return null;
  return (
    <div className="in-mas" role="dialog" aria-modal="true" aria-label="Más secciones · 更多">
      <button type="button" className="in-mas__velo" aria-label="Cerrar · 关闭" onClick={onCerrar} />
      <div className="in-mas__hoja" ref={ref}>
        <span className="in-mas__rodillo" aria-hidden="true" />
        <div className="in-mas__cab">
          <b>
            Más secciones <span lang="zh">更多</span>
          </b>
          <button type="button" className="in-mas__cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
            <XIcon size={20} strokeWidth={2.6} />
          </button>
        </div>
        <div className="in-mas__rejilla">
          {MOVIL_MAS.map((m) => (
            <Link key={m.to} to={m.to} className={`in-mas__item ${activo(m.to) ? "on" : ""}`} onClick={onCerrar} onTouchStart={() => precargar(m.to)}>
              <NavIcon name={m.icon} size={40} />
              <span>
                {m.es}
                <small>{m.zh}</small>
              </span>
            </Link>
          ))}
        </div>
        <span className="in-mas__rodillo abajo" aria-hidden="true" />
      </div>
    </div>
  );
}

// Cielo según la hora de China (UTC+8): noche, amanecer/atardecer o día de pergamino
function skyNow() {
  try {
    const forced = localStorage.getItem("ai-espanol:cielo");
    if (forced) return forced;
  } catch {}
  const h = (new Date().getUTCHours() + 8) % 24;
  return h >= 20 || h < 5 ? "noche" : (h >= 5 && h < 8) || (h >= 17 && h < 20) ? "amanecer" : "dia";
}

export function LightShell({ children, legacy = false, stage = false }) {
  React.useEffect(() => {
    const set = () => document.documentElement.setAttribute("data-cielo", skyNow());
    set();
    const iv = setInterval(set, 5 * 60 * 1000);
    return () => clearInterval(iv);
  }, []);
  const { pathname } = useLocation();
  const { logout } = useAppAuth();
  React.useEffect(precargarSecciones, []);
  const mainRef = React.useRef(null);
  const [masAbierto, setMasAbierto] = React.useState(false);
  const cerrarMas = React.useCallback(() => setMasAbierto(false), []);
  React.useEffect(() => setMasAbierto(false), [pathname]);
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
        <Link to="/ruta" className="side-brand" style={{ padding: 0 }} aria-label="AI Español">
          <Logo tamano={36} subtitulo={false} />
        </Link>
        <div className="light-top-der">
          <GameStats compact />
          <SelectorIdioma compacto />
          <button type="button" className="light-salir" onClick={() => logout()} aria-label="Salir · 退出" title="Salir · 退出">
            <LogOutIcon size={18} strokeWidth={2.6} />
            <span>Salir</span>
          </button>
        </div>
      </div>
      <div className="light-shell">
        <nav className="side-nav" aria-label="Navegación principal">
          <Link to="/ruta" className="side-brand" aria-label="AI Español">
            <Logo tamano={50} />
          </Link>
          {MAIN.map((m) => (
            <Link key={m.to} to={m.to} className={`side-link ${active(m.to) ? "on" : ""}`} onPointerEnter={() => precargar(m.to)} onFocus={() => precargar(m.to)}>
              <NavIcon name={m.icon} size={38} />
              <span>
                {m.es}
                <small>{m.zh}</small>
              </span>
            </Link>
          ))}
          <FichaHoy />
          <SelectorIdioma arriba />
          <a href="#/" className="side-exit" onClick={(e) => (e.preventDefault(), logout())}>
            Salir · 退出
          </a>
        </nav>
        <main ref={mainRef} className={pathname.startsWith("/juegos/") ? "game-bg" : ""} style={{ minWidth: 0 }}>{stage ? <div className="app-stage">{children}</div> : children}</main>
      </div>
      {createPortal(
        <>
          <nav className="bottom-nav in-barra" aria-label="Navegación móvil">
            {MOVIL_FIJAS.map((m) => (
              <Link key={m.to} to={m.to} className={active(m.to) ? "on" : ""} aria-current={active(m.to) ? "page" : undefined} onTouchStart={() => precargar(m.to)} onPointerEnter={() => precargar(m.to)}>
                <NavIcon name={m.icon} size={30} />
                <small>{m.es}</small>
              </Link>
            ))}
            <button type="button" className={`in-barra__mas ${MOVIL_MAS.some((m) => active(m.to)) ? "on" : ""}`} aria-haspopup="dialog" aria-expanded={masAbierto} onClick={() => setMasAbierto((v) => !v)}>
              <span className="in-barra__puntos" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <small>Más · 更多</small>
            </button>
          </nav>
          <HojaMas abierta={masAbierto} onCerrar={cerrarMas} activo={active} />
        </>,
        document.body,
      )}
    </div>
  );
}

export const LIGHT_ROUTES = (p) => ["/ruta", "/dashboard", "/mi-dele", "/diagnostico", "/examinador-oral", "/audicion", "/modulos", "/juegos", "/examenes/generador", "/oficial", "/tutor-voz", "/diccionarios", "/pronunciacion", "/examenes"].includes(p) || /^\/modulos\/[^/]+/.test(p) || NIVEL_DELE(p);

// Páginas antiguas que se muestran dentro del marco claro con la capa de traducción de colores
export const LEGACY_LIGHT = (p) => /^\/(gramatica|memoria|videos|consejos|ayudas|generador|examenes|examenes-nivel|oficial)(\/|$)/.test(p) && p !== "/oficial" && p !== "/examenes" && p !== "/examenes/generador" && !NIVEL_DELE(p);
// Páginas de cada nivel DELE (/oficial/A1…): diseño propio a pantalla completa dentro del marco
export const NIVEL_DELE = (p) => /^\/oficial\/(a1|a2|b1|b2)\/?$/i.test(p);

// Páginas inmersivas (DELE oficial, pronunciación, karaoke, juegos): marco de app con su contenido en una "pantalla"
export const STAGE_ROUTES = (p) => /^\/pronunciacion\/templo/.test(p) || /^\/juegos\/.+/.test(p);
export const ADAPT_ROUTES = (p) => /^\/(pronunciacion\/templo|juegos\/.+)/.test(p);
