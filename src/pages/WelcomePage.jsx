import * as React from "react";
import { Navigate } from "react-router";
import { useClerk } from "@clerk/clerk-react";
import { useAppAuth } from "../lib/auth.jsx";
import { Logo } from "../../packages/imperial/src/index.js";
import { SelectorIdioma } from "../components/ui/SelectorIdioma.jsx";
import { VideoEscena } from "../components/portada/VideoEscena.jsx";
import { EscenaMundo } from "../components/portada/EscenasMundo.jsx";
import { useEntradaAlVer, useParallaxPuntero, prefiereQuietud } from "../components/portada/vida.js";
import {
  LogInIcon,
  MessageCircleIcon,
  ChevronDownIcon,
  ScrollTextIcon,
  LandmarkIcon,
  SparklesIcon,
  Gamepad2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookOpenIcon,
  MicIcon,
  BotIcon,
  MapIcon,
} from "lucide-react";
import "../styles/v15-portada.css";
import "../styles/v19-portada.css";
import "../styles/v20-mundos.css";

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

// Marca <html> mientras se ve la portada (fondo oscuro y sin hueco de barra inferior). Sustituye a html:has(.pc) /
// body:has(.pc), que obligaban a revalidar todo el documento con cada nodo insertado, también fuera de la portada.
function useClaseHtmlPortada(activa) {
  React.useLayoutEffect(() => {
    if (!activa) return;
    const html = document.documentElement;
    html.classList.add("pc-html");
    return () => html.classList.remove("pc-html");
  }, [activa]);
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

// v20 · Lo que hay dentro: seis mundos en un anillo 3D, cada uno con su color, su medallón y su escena animada.
// Gira solo (se detiene al tocarlo), se puede girar a mano o con las flechas, y el halo de la sala toma el color del mundo activo.
const MUNDOS = [
  { tema: "ruta", tono: "#e0a63a", Icono: MapIcon, sello: "路", es: "Ruta por China", zh: "中国之旅", detalle: "Avanza de Pekín a la Ruta de la Seda, clase a clase.", detalleZh: "从北京到丝绸之路，一课一课前进。" },
  { tema: "unidades", tono: "#e8283f", Icono: BookOpenIcon, sello: "课", es: "90 unidades", zh: "90个单元", detalle: "Teoría, vocabulario, diálogos y ejercicios del A1 al B2.", detalleZh: "语法、词汇、对话和练习，A1到B2。" },
  { tema: "juegos", tono: "#22c38e", Icono: Gamepad2Icon, sello: "玩", es: "Juegos en 3D", zh: "3D游戏", detalle: "Kahoot, UNO, ruleta, memory… para repasar jugando.", detalleZh: "抢答、UNO、轮盘、记忆配对，边玩边复习。" },
  { tema: "dele", tono: "#f2c14e", Icono: LandmarkIcon, sello: "考", es: "DELE oficial", zh: "DELE真题", detalle: "80 modelos de examen con corrección y nota.", detalleZh: "80套模拟真题，自动批改评分。" },
  { tema: "pronunciacion", tono: "#4f7dff", Icono: MicIcon, sello: "音", es: "Pronunciación", zh: "发音", detalle: "Sílabas, palabras y frases con voz real.", detalleZh: "音节、单词和句子，真人发音。" },
  { tema: "tutor", tono: "#b25cff", Icono: BotIcon, sello: "师", es: "Tutor IA", zh: "AI导师", detalle: "Pregunta en chino y practica la conversación.", detalleZh: "用中文提问，练习口语对话。" },
];
function Carrusel3D() {
  const [paso, setPaso] = React.useState(0);
  const [pausa, setPausa] = React.useState(false);
  const arrastre = React.useRef(null);
  // Solo gira solo mientras se ve: fuera de pantalla no re-renderiza ni lanza transiciones cada 4,2 s
  const refAnillo = React.useRef(null);
  const [enVista, setEnVista] = React.useState(false);
  React.useEffect(() => {
    const anillo = refAnillo.current;
    if (!anillo || typeof IntersectionObserver === "undefined") return setEnVista(true);
    const observador = new IntersectionObserver((entradas) => setEnVista(entradas.some((e) => e.isIntersecting)));
    observador.observe(anillo);
    return () => observador.disconnect();
  }, []);
  React.useEffect(() => {
    if (pausa || !enVista || prefiereQuietud()) return;
    const reloj = setInterval(() => setPaso((n) => n + 1), 4200);
    return () => clearInterval(reloj);
  }, [pausa, enVista]);
  const total = MUNDOS.length;
  const activo = ((paso % total) + total) % total;
  const irA = (indice) => setPaso((n) => n + ((((indice - activo) % total) + total + Math.floor(total / 2)) % total) - Math.floor(total / 2));
  return (
    <div
      ref={refAnillo}
      className="pc-anillo"
      style={{ "--tono": MUNDOS[activo].tono }}
      onPointerEnter={(evento) => evento.pointerType === "mouse" && setPausa(true)}
      onPointerLeave={() => { setPausa(false); arrastre.current = null; }}
      onPointerDown={(evento) => { arrastre.current = evento.clientX; setPausa(true); }}
      onPointerUp={(evento) => {
        if (arrastre.current === null) return;
        const dx = evento.clientX - arrastre.current;
        arrastre.current = null;
        if (Math.abs(dx) > 40) setPaso((n) => n + (dx < 0 ? 1 : -1));
      }}
      onKeyDown={(evento) => {
        if (evento.key === "ArrowRight") setPaso((n) => n + 1);
        if (evento.key === "ArrowLeft") setPaso((n) => n - 1);
      }}
    >
      <div className="pc-anillo-escena">
        <span className="pc-anillo-aura" aria-hidden="true" />
        <span className="pc-anillo-halo" aria-hidden="true" />
        <div className="pc-anillo-vuelo">
          <div className="pc-anillo-giro" style={{ "--giro": `${-paso * (360 / total)}deg` }}>
            {MUNDOS.map(({ tema, Icono, sello, es, zh, detalle, detalleZh }, indice) => (
              <article
                key={es}
                className={`pc-carta pc-carta--${tema} ${indice === activo ? "activa" : ""}`}
                style={{ "--a": `${indice * (360 / total)}deg` }}
                aria-hidden={indice !== activo}
                onClick={() => indice !== activo && irA(indice)}
              >
                <EscenaMundo tema={tema} />
                <span className="pc-carta-sello" aria-hidden="true" translate="no">{sello}</span>
                <span className="pc-carta-medallon" aria-hidden="true">
                  <Icono size={30} strokeWidth={2.2} />
                </span>
                <h3>
                  {es}
                  <small lang="zh-Hans">{zh}</small>
                </h3>
                <p>
                  {detalle}
                  <small lang="zh-Hans">{detalleZh}</small>
                </p>
                <span className="pc-carta-destello" aria-hidden="true" />
                <span className="pc-carta-velo" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
        <span className="pc-anillo-suelo" aria-hidden="true" />
      </div>
      <div className="pc-anillo-mandos">
        <button type="button" onClick={() => setPaso((n) => n - 1)} aria-label="Anterior · 上一个">
          <ChevronLeftIcon size={22} strokeWidth={2.6} />
        </button>
        <span>
          {MUNDOS.map((mundo, indice) => (
            <button
              type="button"
              key={mundo.es}
              className={indice === activo ? "activo" : ""}
              style={{ "--tono-punto": mundo.tono }}
              onClick={() => irA(indice)}
              aria-label={`${mundo.es} · ${mundo.zh}`}
              aria-current={indice === activo}
            />
          ))}
        </span>
        <button type="button" onClick={() => setPaso((n) => n + 1)} aria-label="Siguiente · 下一个">
          <ChevronRightIcon size={22} strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
}

// Cifra que sube desde cero cuando entra en pantalla
function Cifra({ valor }) {
  const numero = parseInt(valor, 10);
  const resto = String(valor).replace(/^\d+/, "");
  const [visto, setVisto] = React.useState(Number.isNaN(numero) ? valor : prefiereQuietud() ? numero : 0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (Number.isNaN(numero) || prefiereQuietud() || !ref.current) return;
    let cuadro = 0;
    const ojo = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      ojo.disconnect();
      const inicio = performance.now();
      const subir = (ahora) => {
        const t = Math.min(1, (ahora - inicio) / 1400);
        setVisto(Math.round(numero * (1 - (1 - t) ** 3)));
        if (t < 1) cuadro = requestAnimationFrame(subir);
      };
      cuadro = requestAnimationFrame(subir);
    }, { threshold: 0.6 });
    ojo.observe(ref.current);
    return () => { ojo.disconnect(); cancelAnimationFrame(cuadro); };
  }, [numero]);
  return <span ref={ref}>{Number.isNaN(numero) ? valor : `${visto}${resto}`}</span>;
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
  const refMundo = React.useRef(null);
  useEntradaAlVer(refMundo);
  useParallaxPuntero(refRaiz);
  const redirige = !isLoading && isAuthenticated;
  useClaseHtmlPortada(!redirige);

  if (redirige) return <Navigate to="/ruta" replace />;

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
            <span className="pc-titulo-es" aria-label="Cruza la puerta del español">
              {"Cruza la puerta del español".split(" ").map((palabra, indice) => (
                <span key={indice} className="pc-palabra" style={{ "--i": indice }} aria-hidden="true">
                  {palabra}
                </span>
              ))}
            </span>
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

      <section ref={refMundo} className="pc-mundo" aria-labelledby="pc-mundo-titulo">
        <header className="pc-viaje-cabecera">
          <p className="pc-ceja">
            <i aria-hidden="true" />
            <span>Dentro te espera</span>
            <span lang="zh-Hans">里面有什么</span>
            <i aria-hidden="true" />
          </p>
          <h2 id="pc-mundo-titulo" className="pc-mundo-titulo">
            Un palacio entero para aprender
            <span lang="zh-Hans">一整座学习的宫殿</span>
          </h2>
        </header>
        <Carrusel3D />
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
                <Cifra valor={cifra} />
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
