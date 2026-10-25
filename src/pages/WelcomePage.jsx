import * as React from "react";
import { Navigate, Link } from "react-router";
import { useClerk } from "@clerk/clerk-react";
import { useAppAuth } from "../lib/auth.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { Logo, Sello } from "../../packages/imperial/src/index.js";

const HERE = () => `${location.origin}${location.pathname}#/ruta`;

// Portada pública: elegir entre crear cuenta o entrar (Clerk), como en las apps de idiomas
export default function WelcomePage() {
  const { isAuthenticated, isLoading } = useAppAuth();
  const clerk = useClerk();
  if (!isLoading && isAuthenticated) return <Navigate to="/ruta" replace />;

  const signUp = () => clerk.openSignUp({ forceRedirectUrl: HERE(), fallbackRedirectUrl: HERE() });
  const signIn = () => clerk.openSignIn({ forceRedirectUrl: HERE(), fallbackRedirectUrl: HERE() });

  return (
    <div className="wel">
      <header className="wel-top">
        <Logo tono="claro" tamano={46} />
        <span className="wel-lang">中文 · Español</span>
      </header>
      <main className="wel-main">
        <div className="wel-art" role="img" aria-label="Rey Mono, la mascota de AI Español">
          <span className="wel-capa" aria-hidden="true">
            <span className="wel-fondo" />
            <span className="wel-halo" />
            <span className="wel-mono" />
          </span>
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="wel-chispa" style={{ "--x": `${8 + ((i * 37) % 86)}%`, "--d": `${(i * 0.9) % 6}s`, "--t": `${5 + (i % 4)}s` }} aria-hidden="true" />
          ))}
          <span className="wel-twinkle t1" />
          <span className="wel-twinkle t2" />
          <span className="wel-twinkle t3" />
        </div>
        <div className="wel-paper">
          <span className="wel-ribbon" aria-hidden="true" />
          <Sello className="wel-sello" texto="DELE A1–B2" sub="西班牙语考试" giro={-10} />
          <div className="wel-text">
            <h1>
              La forma divertida y eficaz de aprender <span>español</span>
            </h1>
            <p className="wel-sub">
              最有趣、最有效的西班牙语学习方式
              <br />
              Lecciones de 5 minutos, historias, juegos y preparación DELE A1–B2 explicada en chino.
            </p>
            <button className="wel-btn red" onClick={signUp}>
              Inscríbete ahora · 开始学习
            </button>
            <button className="wel-btn cream" onClick={signIn}>
              Ya tengo una cuenta · 我已有账号
            </button>
            <Link to="/login" className="wel-admin">
              Acceso administrador
            </Link>
          </div>
        </div>
      </main>
      <section className="wel-cards">
        {[
          ["🎮", "Aprende jugando", "游戏化学习"],
          ["🗣️", "Historias con voz real", "真人语音故事"],
          ["🎓", "Preparación DELE", "DELE备考"],
          ["🀄", "Explicado en chino", "中文讲解"],
        ].map(([e, es, zh]) => (
          <div key={es} className="wel-card">
            <span className="wel-medal">
              <Emoji3D emoji={e} size={30} />
            </span>
            <b>{es}</b>
            <small>{zh}</small>
          </div>
        ))}
      </section>
    </div>
  );
}
