import * as React from "react";
import { Navigate } from "react-router";
import { useClerk } from "@clerk/clerk-react";
import { useAppAuth } from "../lib/auth.jsx";
import { Logo } from "../../packages/imperial/src/index.js";
import { SelectorIdioma } from "../components/ui/SelectorIdioma.jsx";
import { VideoEscena } from "../components/portada/VideoEscena.jsx";
import { useEntradaAlVer } from "../components/portada/vida.js";
import {
  LogInIcon,
  MessageCircleIcon,
  ChevronDownIcon,
  ScrollTextIcon,
  LandmarkIcon,
  SparklesIcon,
  Gamepad2Icon,
} from "lucide-react";
import "../styles/v15-portada.css";

const HERE = () => `${location.origin}${location.pathname}#/ruta`;

// Apertura: en pantallas verticales, el Rey Mono llega de espaldas a la puerta celestial (540×960, desde 1,6 s:
// antes asoman faroles y cintas cortados por el borde);
// en horizontales, el tramo 2–5 s del panorámico (ya en portada-puerta-llegada.mp4) a cámara lenta: llega y la puerta se ilumina.
// Antes de 2 s hay cintas doradas y un farol cortados por el borde; después de 5 s el dragón cruza tras el panel y se sale del cuadro.
const APERTURA = [
  {
    consulta: "(max-aspect-ratio: 1/1)",
    src: "./video/portada-puerta-vertical-llegada.mp4",
    poster: "./video/portada-puerta-vertical-llegada.jpg",
    velocidad: 0.85,
  },
  {
    consulta: "",
    src: "./video/portada-puerta-llegada.mp4",
    poster: "./video/portada-puerta-llegada.jpg",
    quieta: "./video/portada-puerta-luz.jpg",
    fin: 2.92,
    velocidad: 0.8,
  },
];
// Vuelo entre montañas, ríos y pagodas hasta los dragones: se enseña entero, en un rollo 16:9 que nunca recorta el cuadro
const VUELO = [
  { consulta: "", src: "./video/portada-vuelo.mp4", poster: "./video/portada-vuelo.jpg", fin: 14.85 },
];

const VENTAJAS = [
  {
    Icono: ScrollTextIcon,
    cifra: "90",
    es: "unidades del A1 al B2",
    zh: "90个单元，从A1到B2",
    detalle: "Clases de 50 minutos con teoría explicada en chino.",
    detalleZh: "每课50分钟，中文讲解语法。",
  },
  {
    Icono: LandmarkIcon,
    cifra: "80",
    es: "modelos de examen DELE",
    zh: "80套DELE模拟真题",
    detalle: "Con el formato y el tiempo del examen real.",
    detalleZh: "与真实考试相同的题型和时间。",
  },
  {
    Icono: SparklesIcon,
    cifra: "IA",
    es: "tutor que te corrige",
    zh: "AI导师批改纠错",
    detalle: "Conversa y escribe; te explica cada error.",
    detalleZh: "对话与写作，逐条讲解错误。",
  },
  {
    Icono: Gamepad2Icon,
    cifra: "游",
    es: "juegos para repasar",
    zh: "游戏化复习",
    detalle: "Vocabulario y verbos jugando cada día.",
    detalleZh: "每天边玩边记单词和动词。",
  },
];

// Sin ClerkProvider (pruebas locales con VITE_SIN_CLERK) useClerk lanza: la portada se pinta igual
function useClerkSeguro() {
  try {
    return useClerk();
  } catch {
    return null;
  }
}

// Escribe en la raíz --pc-avance (0 → 1) mientras el panel de acceso sube sobre el vídeo: el vídeo se oscurece y se aleja
function useAvanceApertura(refRaiz, refApertura) {
  React.useEffect(() => {
    const raiz = refRaiz.current;
    const apertura = refApertura.current;
    if (!raiz || !apertura) return;
    let cuadro = 0;
    const pintar = () => {
      cuadro = 0;
      const alto = window.innerHeight || 1;
      const avance = Math.min(1, Math.max(0, window.scrollY / (alto * 0.85)));
      raiz.style.setProperty("--pc-avance", avance.toFixed(3));
    };
    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    };
    pintar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, [refRaiz, refApertura]);
}

function NotaWeChat({ conQr = true }) {
  return (
    <div className="pc-wechat">
      {conQr && (
        <span className="pc-qr">
          <img
            src="./images/qr-wechat-codigo.png"
            alt="Código QR de WeChat · 微信二维码"
            loading="lazy"
            decoding="async"
            onError={(evento) => (evento.currentTarget.parentElement.style.display = "none")}
          />
        </span>
      )}
      <p>
        <MessageCircleIcon size={18} strokeWidth={2.4} aria-hidden="true" />
        <span>
          ¿Aún no tienes cuenta? Pídela por WeChat a tu academia.
          <b>还没有账号？请通过微信联系我们开通。</b>
        </span>
      </p>
    </div>
  );
}

// Portada pública: el Rey Mono cruza la puerta celestial (vídeo a pantalla completa) y el panel de acceso sube sobre la escena.
// Solo se inicia sesión: las cuentas las da la academia (no hay registro libre).
export default function WelcomePage() {
  const { isAuthenticated, isLoading } = useAppAuth();
  const clerk = useClerkSeguro();
  const refRaiz = React.useRef(null);
  const refApertura = React.useRef(null);
  const refViaje = React.useRef(null);
  useAvanceApertura(refRaiz, refApertura);
  useEntradaAlVer(refViaje);

  if (!isLoading && isAuthenticated) return <Navigate to="/ruta" replace />;

  const signIn = () => clerk?.openSignIn?.({ forceRedirectUrl: HERE(), fallbackRedirectUrl: HERE() });
  const verAcceso = () => {
    const panel = document.getElementById("pc-acceso");
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    panel?.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "center" });
  };

  return (
    <div ref={refRaiz} className="pc">
      <section ref={refApertura} className="pc-apertura" aria-labelledby="pc-titulo">
        {/* La caja ocupa toda la apertura; dentro, el fondo se queda fijo mientras el panel sube y nunca pasa a la sección siguiente */}
        <div className="pc-fondo-caja">
          <div className="pc-fondo">
            <VideoEscena variantes={APERTURA} prioridad retraso={250} className="pc-fondo-video" />
            <span className="pc-sombra" aria-hidden="true" />
            <span className="pc-rayos" aria-hidden="true" />
            {Array.from({ length: 10 }, (_, indice) => (
              <span
                key={indice}
                className="pc-chispa"
                aria-hidden="true"
                style={{
                  "--x": `${6 + ((indice * 37) % 88)}%`,
                  "--d": `${-((indice * 1.3) % 9)}s`,
                  "--t": `${7 + (indice % 4) * 1.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        <header className="pc-barra">
          <Logo tono="claro" tamano={40} />
          <SelectorIdioma />
        </header>

        <div className="pc-intro">
          <p className="pc-ceja">
            <i aria-hidden="true" />
            <span>DELE A1 – B2</span>
            <span lang="zh-Hans">西班牙语备考</span>
            <i aria-hidden="true" />
          </p>
          <h1 id="pc-titulo" className="pc-titulo">
            <span className="pc-titulo-es">Cruza la puerta del español</span>
            <span className="pc-titulo-zh" lang="zh-Hans">
              跨进西班牙语之门
            </span>
          </h1>
          <p className="pc-sub">
            Lecciones cortas, historias con voz real, juegos y preparación del DELE, todo explicado en chino.
            <span lang="zh-Hans">短课、真人语音故事、游戏和DELE备考，全部中文讲解。</span>
          </p>
          <div className="pc-intro-acciones">
            <button type="button" className="pc-btn pc-btn-laca" onClick={signIn}>
              <LogInIcon size={20} strokeWidth={2.6} aria-hidden="true" />
              Iniciar sesión · 登录
            </button>
            <button type="button" className="pc-btn pc-btn-velo" onClick={verAcceso}>
              <MessageCircleIcon size={18} strokeWidth={2.4} aria-hidden="true" />
              ¿Sin cuenta? · 没有账号？
            </button>
          </div>
          <span className="pc-baja" aria-hidden="true">
            <ChevronDownIcon size={22} strokeWidth={2.4} />
          </span>
        </div>

        <div id="pc-acceso" className="pc-panel" role="region" aria-labelledby="pc-acceso-titulo">
          <span className="pc-panel-marco" aria-hidden="true" />
          <span className="pc-panel-aura" aria-hidden="true" />
          <span className="pc-panel-sello" aria-hidden="true" translate="no">
            <i>登</i>
            <i>录</i>
          </span>
          <p className="pc-panel-ceja">
            Acceso de alumnos · <span lang="zh-Hans">学员入口</span>
          </p>
          <h2 id="pc-acceso-titulo" className="pc-panel-titulo">
            Iniciar sesión
            <span lang="zh-Hans">登录</span>
          </h2>
          <p className="pc-panel-texto">
            Entra con la cuenta que te ha dado tu academia y sigue tu ruta hacia el DELE.
            <span lang="zh-Hans">使用学校为你开通的账号登录，继续你的DELE之路。</span>
          </p>
          <button type="button" className="pc-btn pc-btn-laca pc-btn-ancho" onClick={signIn}>
            <LogInIcon size={20} strokeWidth={2.6} aria-hidden="true" />
            Iniciar sesión · 登录
          </button>
          <span className="pc-filete" aria-hidden="true" />
          <NotaWeChat />
        </div>
      </section>

      <section ref={refViaje} className="pc-viaje" aria-labelledby="pc-viaje-titulo">
        <span className="pc-viaje-nubes" aria-hidden="true" />
        <header className="pc-viaje-cabecera">
          <p className="pc-ceja pc-ceja-oscura">
            <i aria-hidden="true" />
            <span>Tu viaje</span>
            <span lang="zh-Hans">你的旅程</span>
            <i aria-hidden="true" />
          </p>
          <h2 id="pc-viaje-titulo" className="pc-viaje-titulo">
            Del primer «hola» al DELE
            <span lang="zh-Hans">从第一句“你好”到DELE</span>
          </h2>
        </header>
        <div className="pc-rollo">
          <span className="pc-rollo-vara arriba" aria-hidden="true" />
          <div className="pc-rollo-lienzo">
            <VideoEscena variantes={VUELO} alVer className="pc-rollo-video" />
          </div>
          <span className="pc-rollo-vara abajo" aria-hidden="true" />
        </div>
        <ul className="pc-ventajas">
          {VENTAJAS.map(({ Icono, cifra, es, zh, detalle, detalleZh }, indice) => (
            <li key={es} className="pc-ventaja" style={{ "--i": indice }}>
              <span className="pc-ventaja-moneda" aria-hidden="true">
                <Icono size={22} strokeWidth={2.2} />
              </span>
              <b className="pc-ventaja-cifra" translate="no">
                {cifra}
              </b>
              <span className="pc-ventaja-titulo">
                {es}
                <small lang="zh-Hans">{zh}</small>
              </span>
              <span className="pc-ventaja-detalle">
                {detalle}
                <small lang="zh-Hans">{detalleZh}</small>
              </span>
            </li>
          ))}
        </ul>
        <div className="pc-cierre">
          <button type="button" className="pc-btn pc-btn-laca" onClick={signIn}>
            <LogInIcon size={20} strokeWidth={2.6} aria-hidden="true" />
            Iniciar sesión · 登录
          </button>
          <NotaWeChat conQr={false} />
        </div>
        <p className="pc-pie">
          AI Español · <span lang="zh-Hans">西班牙语学习与DELE备考</span>
        </p>
      </section>
    </div>
  );
}
