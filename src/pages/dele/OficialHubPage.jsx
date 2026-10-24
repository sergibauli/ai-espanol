import * as React from "react";
import { Link } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { Emoji3D } from "../../components/ui/Emoji3D.jsx";

// Portada de los modelos oficiales DELE (estilo app). Duraciones de las pruebas según el Instituto Cervantes.
const LEVELS = [
  { key: "A1", name: "Acceso", zh: "入门级", emoji: "🌱", c: "#58cc02", d: "#46a302", t: [45, 20, 25, 15] },
  { key: "A2", name: "Plataforma", zh: "基础级", emoji: "🚀", c: "#1cb0f6", d: "#1899d6", t: [60, 35, 50, 15] },
  { key: "B1", name: "Umbral", zh: "进阶级", emoji: "🎯", c: "#ff9600", d: "#e08600", t: [70, 40, 60, 15] },
  { key: "B2", name: "Avanzado", zh: "高阶级", emoji: "🏆", c: "#ce82ff", d: "#a568cc", t: [70, 40, 80, 20] },
];
const PRUEBAS = [
  ["📖", "Comprensión de lectura", "阅读理解"],
  ["🎧", "Comprensión auditiva", "听力理解"],
  ["✍️", "Expresión escrita", "书面表达"],
  ["🗣️", "Expresión oral", "口语表达"],
];

export default function OficialHubPage() {
  return (
    <LightShell>
      <div className="unit-page" style={{ maxWidth: 1000 }}>
        <section className="unit-hero" style={{ "--c": "#ff4b4b", "--d": "#d33131" }}>
          <div className="unit-hero-text">
            <small>DELE · INSTITUTO CERVANTES · 官方真题</small>
            <h1>Exámenes DELE oficiales</h1>
            <p>80 modelos completos con las 4 pruebas, cronómetro y corrección.</p>
            <span className="unit-zh">80套完整模拟题 · 四项考试 · 计时与批改</span>
            <div className="ui-row" style={{ marginTop: 18 }}>
              <Link to="/examenes/generador" className="btn3d unit-cta" style={{ "--c": "#fff", "--d": "rgba(0,0,0,.25)", color: "#d33131", textDecoration: "none" }}>
                ⚡ Examen rápido · 快速测试
              </Link>
            </div>
          </div>
          <div className="unit-hero-art">
            <Emoji3D emoji="🎓" size={150} float />
          </div>
        </section>

        <h2 className="unit-h2">Elige tu nivel · 选择级别</h2>
        <div className="dele-levels">
          {LEVELS.map((l) => (
            <Link key={l.key} to={`/oficial/${l.key}`} className="dele-level" style={{ "--c": l.c, "--d": l.d }}>
              <div className="dele-level-head">
                <Emoji3D emoji={l.emoji} size={70} float />
                <div>
                  <b>{l.key}</b>
                  <span>
                    {l.name} · {l.zh}
                  </span>
                </div>
              </div>
              <div className="dele-pruebas">
                {PRUEBAS.map(([e, es, zh], i) => (
                  <div key={es}>
                    <Emoji3D emoji={e} size={30} />
                    <span>
                      {es}
                      <small>
                        {zh} · {l.t[i]} min
                      </small>
                    </span>
                  </div>
                ))}
              </div>
              <span className="btn3d dele-go" style={{ "--c": l.c, "--d": l.d }}>
                Ver 20 modelos · 查看20套
              </span>
            </Link>
          ))}
        </div>

        <h2 className="unit-h2">Cómo aprobar · 通过秘诀</h2>
        <div className="unit-more">
          {[
            ["🧠", "Aprende con la Ruta", "先学课程", "/ruta"],
            ["📝", "Simulacro automático", "自动模拟考", "/examenes/generador"],
            ["💡", "Consejos de examen", "考试技巧", "/consejos"],
          ].map(([e, es, zh, to]) => (
            <Link key={to} to={to} className="unit-more-card" style={{ textDecoration: "none" }}>
              <Emoji3D emoji={e} size={52} />
              <b>{es}</b>
              <small>{zh}</small>
            </Link>
          ))}
        </div>
      </div>
    </LightShell>
  );
}
