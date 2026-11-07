import * as React from "react";
import { Navigate } from "react-router";
import { useClerk } from "@clerk/clerk-react";
import { useAppAuth } from "../lib/auth.jsx";
import { Logo, PanelJade } from "../../packages/imperial/src/index.js";
import { SelectorIdioma } from "../components/ui/SelectorIdioma.jsx";
import { LogInIcon, MessageCircleIcon } from "lucide-react";

const HERE = () => `${location.origin}${location.pathname}#/ruta`;

// Cifras del contenido real de la app (90 unidades, 80 modelos DELE, 7 idiomas de ayuda)
const CIFRAS = [
  ["90", "unidades", "单元"],
  ["80", "modelos DELE", "真题模拟"],
  ["7", "idiomas de ayuda", "辅助语言"],
];

const VENTAJAS = [
  ["juegos", "Aprende jugando", "游戏化学习"],
  ["pronunciacion", "Historias con voz real", "真人语音故事"],
  ["dele", "Preparación DELE", "DELE备考"],
  ["diccionario", "Explicado en tu idioma", "中文讲解"],
];

// Portada pública: el Rey Mono en su círculo dorado sobre el mapa antiguo y el panel de jade para entrar (Clerk)
// Sin ClerkProvider (pruebas locales con VITE_SIN_CLERK) useClerk lanza: la portada se pinta igual
function useClerkSeguro() {
  try {
    return useClerk();
  } catch {
    return null;
  }
}

export default function WelcomePage() {
  const { isAuthenticated, isLoading } = useAppAuth();
  const clerk = useClerkSeguro();
  if (!isLoading && isAuthenticated) return <Navigate to="/ruta" replace />;

  const signIn = () => clerk?.openSignIn?.({ forceRedirectUrl: HERE(), fallbackRedirectUrl: HERE() });

  return (
    <div className="wel2 tp-portada">
      <header className="wel2-top">
        <Logo tono="claro" tamano={44} />
        <SelectorIdioma />
      </header>
      <div className="tp-faroles" aria-hidden="true">
        <span className="tp-farol f1" />
        <span className="tp-farol f2" />
      </div>
      <div className="wel2-arte" role="img" aria-label="El Rey Mono con su bastón dentro de un círculo dorado y un dragón de oro sobre un mapa antiguo de China">
        <div className="wel2-lienzo" aria-hidden="true">
          <span className="wel2-capa wel2-fondo" />
          <span className="wel2-aura" />
          <span className="wel2-halo" />
          <span className="wel2-capa wel2-dragon" />
          <span className="wel2-capa wel2-mono" />
          {Array.from({ length: 12 }, (_, indice) => (
            <span key={indice} className="wel-chispa" style={{ "--x": `${30 + ((indice * 41) % 60)}%`, "--d": `${(indice * 0.7) % 6}s`, "--t": `${5 + (indice % 4)}s` }} />
          ))}
          <span className="wel-twinkle t1" />
          <span className="wel-twinkle t2" />
          <span className="wel-twinkle t3" />
        </div>
      </div>
      <main className="wel2-lado">
        <span className="wel2-sello s1" aria-hidden="true" translate="no">
          {[..."西班牙语"].map((letra) => <i key={letra}>{letra}</i>)}
        </span>
        <span className="wel2-sello s2" aria-hidden="true" translate="no">
          {[..."学习"].map((letra) => <i key={letra}>{letra}</i>)}
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
            {CIFRAS.map(([numero, es, zh]) => (
              <li key={es}>
                <b>{numero}</b>
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
      <section className="wel2-tarjetas" aria-label="Qué ofrece AI Español · 功能">
        {VENTAJAS.map(([icono, es, zh]) => (
          <PanelJade key={es} variante="tarjeta" icono={icono} titulo={es} tituloZh={zh} />
        ))}
      </section>
    </div>
  );
}
