import * as React from "react";
import { Link, useNavigate } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { Emoji3D } from "../../components/ui/Emoji3D.jsx";
import { TarjetaExamen } from "../../../packages/imperial/src/index.js";
import { NUEVOS } from "../../data/oficial/nuevos/index.js";

// Portada de los modelos oficiales DELE (estilo app). Cada modelo muestra la duración real de sus pruebas.
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
  const navigate = useNavigate();
  return (
    <LightShell>
      <div className="unit-page" style={{ maxWidth: 1000 }}>
        <section className="imperial-hero dele-hero">
          <span className="imperial-cloud c1" />
          <span className="imperial-cloud c2" />
          <div className="imperial-hero-text">
            <small>DELE · INSTITUTO CERVANTES · 官方真题</small>
            <h1>Exámenes DELE oficiales</h1>
            <p>80 modelos completos con las 4 pruebas, cronómetro y corrección.</p>
            <span className="unit-zh">80套完整模拟题 · 四项考试 · 计时与批改</span>
            <div className="ui-row" style={{ marginTop: 18 }}>
              <Link to="/examenes/generador" className="btn3d unit-cta" style={{ "--c": "#f2c14e", "--d": "#c8961e", color: "#5a0a16", textDecoration: "none" }}>
                ⚡ Examen rápido · 快速测试
              </Link>
            </div>
          </div>
          <img className="dele-dragon" src={`${import.meta.env.BASE_URL}theme/dragon.png`} alt="" />
        </section>

        <div className="dele-modes">
          {[
            ["⚡", "Simulacro automático", "自动模拟考", "Un examen nuevo cada vez, con nota al momento", "/examenes/generador", "#ff9600", "#e08600"],
            ["🎯", "Practicar por destrezas", "分项练习", "Lectura, audición, escritura y oral por niveles", "/examenes", "#1cb0f6", "#1899d6"],
            ["📜", "Modelos oficiales", "官方真题", "80 exámenes completos con cronómetro", "#niveles", "#58cc02", "#46a302"],
            ["🎙️", "Examinador oral IA", "AI口语考官", "Prueba oral con preparación, monólogo y entrevistador", "/examinador-oral", "#c8102e", "#8f0c21"],
            ["🎧", "Acentos del español", "口音听力", "Audiciones con voces de España, México y Argentina", "/audicion", "#2f6fd6", "#173f8a"],
          ].map(([e, es, zh, d, to, c, dk]) =>
            to.startsWith("#") ? (
              <a key={es} href="#" onClick={(ev) => { ev.preventDefault(); document.getElementById("niveles")?.scrollIntoView({ behavior: "smooth" }); }} className="dele-mode" style={{ "--c": c, "--d": dk }}>
                <Emoji3D emoji={e} size={54} />
                <b>{es}</b>
                <small>{zh}</small>
                <span>{d}</span>
              </a>
            ) : (
              <Link key={es} to={to} className="dele-mode" style={{ "--c": c, "--d": dk }}>
                <Emoji3D emoji={e} size={54} />
                <b>{es}</b>
                <small>{zh}</small>
                <span>{d}</span>
              </Link>
            ),
          )}
        </div>

        <h2 className="unit-h2" id="niveles">Modelos oficiales por nivel · 选择级别</h2>
        <div className="dele-levels">
          {LEVELS.map((l) => (
            <TarjetaExamen
              key={l.key}
              nivel={l.key}
              titulo={`DELE ${l.key} · ${l.name}`}
              tituloZh={l.zh}
              datos={[...["Lectura", "Audición", "Escritura", "Oral"].map((p, i) => `${p} ${l.t[i]} min`), ...(NUEVOS[l.key].length ? [`✨ ${NUEVOS[l.key].length} nuevo${NUEVOS[l.key].length > 1 ? "s" : ""}`] : [])]}
              accion={`Ver ${20 + NUEVOS[l.key].length} modelos · 查看${20 + NUEVOS[l.key].length}套`}
              onAccion={() => navigate(`/oficial/${l.key}`)}
            />
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
