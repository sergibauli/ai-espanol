import * as React from "react";
import { Navigate } from "react-router";
import { useClerk } from "@clerk/clerk-react";
import { useAppAuth } from "../lib/auth.jsx";
import { Logo, PanelJade } from "../../packages/imperial/src/index.js";
import { SelectorIdioma } from "../components/ui/SelectorIdioma.jsx";
import { LogInIcon, MessageCircleIcon } from "lucide-react";
import { useParallaxPuntero, useContador, useEntradaAlVer, useEntrando } from "../components/portada/vida.js";
import "../styles/v14-motion.css";
import "../styles/v14-portada.css";

const HERE = () => `${location.origin}${location.pathname}#/ruta`;

// Cifras del contenido real de la app (90 unidades, 80 modelos DELE, 7 idiomas de ayuda)
const CIFRAS = [
  [90, "unidades", "单元"],
  [80, "modelos DELE", "真题模拟"],
  [7, "idiomas de ayuda", "辅助语言"],
];

const VENTAJAS = [
  ["juegos", "Aprende jugando", "游戏化学习"],
  ["pronunciacion", "Historias con voz real", "真人语音故事"],
  ["dele", "Preparación DELE", "DELE备考"],
  ["diccionario", "Explicado en tu idioma", "中文讲解"],
];

// Saludos del Rey Mono (rotan cada vez que se le pasa el ratón por encima o se le toca)
const SALUDOS = [
  ["¡Hola!", "你好！"],
  ["¡Vamos a aprender!", "一起学习吧！"],
  ["¿Listo para el DELE?", "准备好考DELE了吗？"],
  ["¡Ánimo, tú puedes!", "加油，你可以的！"],
  ["¡Buena suerte!", "祝你好运！"],
];

// Nubes doradas en tres profundidades (lejos → cerca): la clase fija tamaño, posición, deriva y parallax en el CSS
const NUBES = ["lejos n1", "lejos n2", "media n3", "media n4", "cerca n5", "cerca n6"];
const PETALOS = 9;
const CHISPAS = 12;

// Sin ClerkProvider (pruebas locales con VITE_SIN_CLERK) useClerk lanza: la portada se pinta igual
function useClerkSeguro() {
  try {
    return useClerk();
  } catch {
    return null;
  }
}

// Cifra que sube desde 0 al entrar (con reduced-motion sale ya con el valor final)
function Cifra({ final, retraso }) {
  const valor = useContador(final, { retraso, duracion: 1200 });
  return <b>{valor}</b>;
}

// Portada pública: escena de apertura con el Rey Mono, el dragón y el mapa antiguo, y el panel de jade para entrar (Clerk).
// La secuencia de entrada es solo CSS (v14-portada.css) y nunca bloquea el botón ni el selector de idioma.
export default function WelcomePage() {
  const { isAuthenticated, isLoading } = useAppAuth();
  const clerk = useClerkSeguro();
  const refRaiz = React.useRef(null);
  const refTarjetas = React.useRef(null);
  const refFinSaludo = React.useRef(0);
  const entrando = useEntrando(2700);
  const [saludo, setSaludo] = React.useState(null); // { indice, vez }
  useParallaxPuntero(refRaiz);
  useEntradaAlVer(refTarjetas);
  React.useEffect(() => () => clearTimeout(refFinSaludo.current), []);

  if (!isLoading && isAuthenticated) return <Navigate to="/ruta" replace />;

  const signIn = () => clerk?.openSignIn?.({ forceRedirectUrl: HERE(), fallbackRedirectUrl: HERE() });

  // El mono salta, guiña y dice el siguiente saludo; el bocadillo se retira solo
  const saludar = () => {
    setSaludo((anterior) => ({ indice: anterior ? (anterior.indice + 1) % SALUDOS.length : 0, vez: (anterior?.vez || 0) + 1 }));
    clearTimeout(refFinSaludo.current);
    refFinSaludo.current = setTimeout(() => setSaludo((anterior) => (anterior ? { ...anterior, oculto: true } : anterior)), 2600);
  };
  const saludoVisible = saludo && !saludo.oculto;

  return (
    <div ref={refRaiz} className={`wel2 tp-portada v14p ${entrando ? "v14-entrando" : ""}`}>
      <header className="wel2-top">
        <Logo tono="claro" tamano={44} />
        <SelectorIdioma />
      </header>
      <div className="tp-faroles" aria-hidden="true">
        <span className="tp-farol f1">
          <i />
        </span>
        <span className="tp-farol f2">
          <i />
        </span>
      </div>
      <div className="wel2-arte">
        <p className="v14-solo-lector">El Rey Mono con su bastón dentro de un círculo dorado y un dragón de oro sobre un mapa antiguo de China · 美猴王、金龙与古地图</p>
        <div className="wel2-lienzo">
          {/* Plano 1 · el mapa pintado; encima, el boceto en pergamino que se retira con un barrido (el rollo se desenrolla) */}
          <span className="v14-caja v14-caja-fondo" aria-hidden="true">
            <span className="wel2-capa wel2-fondo" />
            <span className="v14-boceto">
              <i className="v14-boceto-papel" />
              <i className="v14-boceto-rodillo" />
            </span>
            <span className="v14-rayos" />
            <svg className="v14-aro" viewBox="0 0 1165 892" preserveAspectRatio="none" focusable="false">
              <defs>
                <linearGradient id="v14AroOro" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fff8d6" />
                  <stop offset=".45" stopColor="#f6cf63" />
                  <stop offset="1" stopColor="#c8861a" />
                </linearGradient>
              </defs>
              <circle className="v14-aro-brillo" cx="769" cy="464" r="296" pathLength="1" />
              <circle className="v14-aro-trazo" cx="769" cy="464" r="296" pathLength="1" />
            </svg>
          </span>
          <span className="wel2-aura" aria-hidden="true" />
          <span className="wel2-halo" aria-hidden="true" />
          <span className="v14-luz" aria-hidden="true" />
          {NUBES.slice(0, 2).map((clase) => (
            <span key={clase} className={`v14-nube ${clase}`} aria-hidden="true">
              <i />
            </span>
          ))}
          {/* Plano 2 · el dragón: entra serpenteando, ondula y su perla late */}
          <span className="v14-caja v14-caja-dragon" aria-hidden="true">
            <span className="v14-dragon-entra">
              <span className="v14-dragon-vivo">
                <span className="wel2-capa wel2-dragon" />
                <span className="wel2-capa wel2-dragon v14-dragon-fulgor" />
                <span className="v14-perla" />
                <span className="v14-destello d-ojo" />
              </span>
            </span>
          </span>
          {NUBES.slice(2, 4).map((clase) => (
            <span key={clase} className={`v14-nube ${clase}`} aria-hidden="true">
              <i />
            </span>
          ))}
          {/* Plano 3 · el Rey Mono: salta al centro con rebote, respira, parpadea y su bastón destella */}
          <span className="v14-caja v14-caja-mono" aria-hidden="true">
            <span className="v14-mono-entra">
              <span key={saludo?.vez || 0} className={`v14-mono-salto ${saludo ? "salta" : ""}`}>
                <span className="v14-mono-vivo">
                  <span className="wel2-capa wel2-mono" />
                  <span className="v14-parpado izq" />
                  <span className={`v14-parpado der ${saludoVisible ? "guino" : ""}`} />
                  <span className="v14-baston">
                    <i />
                  </span>
                  <span className="v14-destello d-punta" />
                  <span className="v14-destello d-diadema" />
                </span>
              </span>
            </span>
          </span>
          {/* Zona sensible sobre el mono (ratón, toque o teclado) y bocadillo bilingüe */}
          <button type="button" className="v14-mono-zona" onPointerEnter={(evento) => evento.pointerType === "mouse" && saludar()} onClick={saludar} aria-label="Saludar al Rey Mono · 和美猴王打招呼" />
          <span className="v14-bocadillo-sitio" aria-live="polite">
            {saludoVisible && (
              <span key={saludo.vez} className="v14-bocadillo" translate="no">
                {SALUDOS[saludo.indice][0]}
                <b>{SALUDOS[saludo.indice][1]}</b>
              </span>
            )}
          </span>
          {NUBES.slice(4).map((clase) => (
            <span key={clase} className={`v14-nube ${clase}`} aria-hidden="true">
              <i />
            </span>
          ))}
          {Array.from({ length: PETALOS }, (_, indice) => (
            <span key={`p${indice}`} className="v14-petalo" aria-hidden="true" style={{ "--x": `${8 + ((indice * 29) % 84)}%`, "--d": `${-(indice * 1.7) % 13}s`, "--t": `${11 + (indice % 5) * 1.6}s`, "--giro": `${(indice * 67) % 360}deg`, "--tam": `${10 + (indice % 3) * 4}px` }} />
          ))}
          {Array.from({ length: CHISPAS }, (_, indice) => (
            <span key={indice} className="wel-chispa" aria-hidden="true" style={{ "--x": `${30 + ((indice * 41) % 60)}%`, "--d": `${(indice * 0.7) % 6}s`, "--t": `${5 + (indice % 4)}s` }} />
          ))}
          <span className="wel-twinkle t1" aria-hidden="true" />
          <span className="wel-twinkle t2" aria-hidden="true" />
          <span className="wel-twinkle t3" aria-hidden="true" />
        </div>
        <span className="v14-vineta" aria-hidden="true" />
      </div>
      <main className="wel2-lado">
        <span className="wel2-sello s1" aria-hidden="true" translate="no">
          {[..."西班牙语"].map((letra) => (
            <i key={letra}>{letra}</i>
          ))}
        </span>
        <span className="wel2-sello s2" aria-hidden="true" translate="no">
          {[..."学习"].map((letra) => (
            <i key={letra}>{letra}</i>
          ))}
        </span>
        <PanelJade as="div" className="wel2-panel tp-panel">
          <span className="tp-panel-sello" aria-hidden="true" translate="no">
            <i>西</i>
            <i>语</i>
          </span>
          <span className="tp-panel-ceja">
            <i aria-hidden="true" />
            DELE A1 – B2 · 西班牙语备考
            <i aria-hidden="true" />
          </span>
          <h1>La forma divertida y eficaz de aprender español</h1>
          <p className="wel2-sub">
            <b>最有趣、最有效的西班牙语学习方式</b>
            Lecciones de 5 minutos, historias, juegos y preparación DELE A1–B2 explicada en chino.
          </p>
          <ul className="tp-cifras" aria-label="AI Español en cifras · 数字">
            {CIFRAS.map(([numero, es, zh], indice) => (
              <li key={es}>
                <Cifra final={numero} retraso={700 + indice * 140} />
                <span>
                  {es}
                  <small>{zh}</small>
                </span>
              </li>
            ))}
          </ul>
          {/* Solo se entra con una cuenta ya creada: las altas las da la academia, no hay registro libre */}
          <button className="wel2-btn laca tp-entrar" onClick={signIn}>
            <LogInIcon size={20} strokeWidth={2.6} aria-hidden="true" />
            Iniciar sesión · 登录
          </button>
          <p className="wel2-nota tp-nota">
            <MessageCircleIcon size={16} strokeWidth={2.4} aria-hidden="true" />
            <span>
              ¿Aún no tienes cuenta? Pídela por WeChat a tu academia.
              <br />
              还没有账号？请通过微信联系我们开通。
            </span>
          </p>
        </PanelJade>
        <span className="wel2-nube" aria-hidden="true" />
      </main>
      <section ref={refTarjetas} className="wel2-tarjetas" aria-label="Qué ofrece AI Español · 功能">
        {VENTAJAS.map(([icono, es, zh]) => (
          <PanelJade key={es} variante="tarjeta" icono={icono} titulo={es} tituloZh={zh} />
        ))}
      </section>
    </div>
  );
}
