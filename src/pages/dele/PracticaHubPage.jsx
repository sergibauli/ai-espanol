import * as React from "react";
import { Link } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { Emoji3D } from "../../components/ui/Emoji3D.jsx";

// Portada de "DELE práctica" con estética imperial: cada nivel abre sus exámenes por destrezas
const LEVELS = [
  { key: "A1", name: "Acceso · 入门", emoji: "🏮", c: "#58cc02" },
  { key: "A2", name: "Plataforma · 初级", emoji: "🎐", c: "#1cb0f6" },
  { key: "B1", name: "Umbral · 中级", emoji: "🐉", c: "#ff9600" },
  { key: "B2", name: "Avanzado · 高级", emoji: "🏯", c: "#ce82ff" },
];
const SKILLS = [
  ["📖", "Lectura", "阅读"],
  ["👂", "Audición", "听力"],
  ["🖌️", "Escritura", "写作"],
  ["🗣️", "Oral", "口语"],
];

export default function PracticaHubPage() {
  return (
    <LightShell>
      <div className="unit-page" style={{ maxWidth: 1000 }}>
        <section className="imperial-hero">
          <span className="imperial-cloud c1" />
          <span className="imperial-cloud c2" />
          <div className="imperial-hero-text">
            <small>DELE 练习 · PRÁCTICA POR DESTREZAS</small>
            <h1>Entrena cada prueba del DELE</h1>
            <p>Vocabulario, lectura, audición, escritura, monólogo e interacción, nivel a nivel.</p>
          </div>
          <div className="imperial-hero-art">
            <Emoji3D emoji="🎯" size={110} float />
          </div>
        </section>
        <div className="imperial-skills">
          {SKILLS.map(([e, es, zh]) => (
            <span key={es}>
              <Emoji3D emoji={e} size={34} /> {es} · {zh}
            </span>
          ))}
        </div>
        <div className="imperial-levels">
          {LEVELS.map((l) => (
            <Link key={l.key} to={`/examenes-nivel/${l.key}`} className="imperial-level" style={{ "--c": l.c }}>
              <span className="imperial-level-seal">{l.key}</span>
              <Emoji3D emoji={l.emoji} size={70} float />
              <b>{l.name}</b>
              <span className="btn3d" style={{ "--c": "var(--imp-red)", "--d": "var(--imp-red-d)", padding: "10px 14px", fontSize: 14 }}>
                Practicar · 开始练习
              </span>
            </Link>
          ))}
        </div>
      </div>
    </LightShell>
  );
}
