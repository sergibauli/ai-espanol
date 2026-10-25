import * as React from "react";
import { useNavigate } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { Emoji3D } from "../../components/ui/Emoji3D.jsx";
import { TarjetaExamen } from "../../../packages/imperial/src/index.js";

// Portada de "DELE práctica" con estética imperial: cada nivel abre sus exámenes por destrezas
const LEVELS = [
  { key: "A1", name: "Acceso", zh: "入门" },
  { key: "A2", name: "Plataforma", zh: "初级" },
  { key: "B1", name: "Umbral", zh: "中级" },
  { key: "B2", name: "Avanzado", zh: "高级" },
];
const SKILLS = [
  ["📖", "Lectura", "阅读"],
  ["👂", "Audición", "听力"],
  ["🖌️", "Escritura", "写作"],
  ["🗣️", "Oral", "口语"],
];

export default function PracticaHubPage() {
  const navigate = useNavigate();
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
        <div className="dele-levels">
          {LEVELS.map((l) => (
            <TarjetaExamen
              key={l.key}
              nivel={l.key}
              titulo={`DELE ${l.key} · ${l.name}`}
              tituloZh={l.zh}
              datos={SKILLS.map(([, es]) => es)}
              accion="Practicar · 开始练习"
              onAccion={() => navigate(`/examenes-nivel/${l.key}`)}
            />
          ))}
        </div>
      </div>
    </LightShell>
  );
}
