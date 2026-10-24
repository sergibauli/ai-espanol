import * as React from "react";
import { Navigate, Link } from "react-router";
import { useClerk } from "@clerk/clerk-react";
import { useAppAuth } from "../lib/auth.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";

const HERE = () => `${location.origin}${location.pathname}#/ruta`;

// Portada pública: elegir entre crear cuenta o entrar (Clerk), como en las apps de idiomas
export default function WelcomePage() {
  const { isAuthenticated, isLoading } = useAppAuth();
  const clerk = useClerk();
  if (!isLoading && isAuthenticated) return <Navigate to="/ruta" replace />;

  const signUp = () => clerk.openSignUp({ forceRedirectUrl: HERE(), fallbackRedirectUrl: HERE() });
  const signIn = () => clerk.openSignIn({ forceRedirectUrl: HERE(), fallbackRedirectUrl: HERE() });

  return (
    <div className="welcome">
      <header className="welcome-top">
        <span className="side-brand" style={{ padding: 0 }}>
          <img src="./mono-face.png" alt="" className="mono-logo" /> AI Español
        </span>
        <span className="welcome-lang">中文 · Español</span>
      </header>
      <main className="welcome-main">
        <div className="welcome-art">
          <video src="./mascota-reymono.mp4" poster="./mono-full.jpg" autoPlay muted loop playsInline />
          <span className="welcome-float f1">
            <Emoji3D emoji="📚" size={64} float />
          </span>
          <span className="welcome-float f2">
            <Emoji3D emoji="🏆" size={58} float />
          </span>
          <span className="welcome-float f3">
            <Emoji3D emoji="🔥" size={54} float />
          </span>
        </div>
        <div className="welcome-text">
          <h1>
            La forma divertida y eficaz de aprender <span>español</span>
          </h1>
          <p>
            最有趣、最有效的西班牙语学习方式
            <br />
            Lecciones de 5 minutos, historias, juegos y preparación DELE A1–B2 explicada en chino.
          </p>
          <button className="lp-btn welcome-btn" onClick={signUp}>
            Empieza ahora · 开始学习
          </button>
          <button className="lp-btn ghost welcome-btn" style={{ "--c": "#fff", "--d": "#e5e5e5", color: "#1cb0f6", borderColor: "#e5e5e5" }} onClick={signIn}>
            Ya tengo una cuenta · 我已有账号
          </button>
          <Link to="/login" className="welcome-admin">
            Acceso administrador
          </Link>
        </div>
      </main>
      <section className="welcome-strip">
        {[
          ["🎮", "Aprende jugando", "游戏化学习"],
          ["🗣️", "Historias con voz real", "真人语音故事"],
          ["🎓", "Preparación DELE", "DELE备考"],
          ["🇨🇳", "Explicado en chino", "中文讲解"],
        ].map(([e, es, zh]) => (
          <div key={es}>
            <Emoji3D emoji={e} size={52} />
            <b>{es}</b>
            <small>{zh}</small>
          </div>
        ))}
      </section>
    </div>
  );
}
