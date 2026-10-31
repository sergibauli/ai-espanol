import * as React from "react";
import { Link, useNavigate } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { Emoji3D } from "../../components/ui/Emoji3D.jsx";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { ESCENAS } from "../../components/dele/EscenasNivel.jsx";
import { ParticulasNivel } from "../../components/ui/ParticulasNivel.jsx";
// Solo cuenta los simulacros nuevos por el nombre del archivo (A1-21.json…), sin descargar su contenido
const NUEVOS = { A1: [], A2: [], B1: [], B2: [] };
for (const ruta of Object.keys(import.meta.glob("../../data/oficial/nuevos/*.json"))) NUEVOS[ruta.split("/").pop().slice(0, 2)]?.push(ruta);

// Portada de los modelos oficiales DELE (estilo app). Cada modelo muestra la duración real de sus pruebas.
const LEVELS = [
  { key: "A1", name: "Acceso", zh: "入门级", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹", t: [45, 25, 25, 15] },
  { key: "A2", name: "Plataforma", zh: "基础级", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯", t: [60, 35, 45, 15] },
  { key: "B1", name: "Umbral", zh: "进阶级", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山", t: [70, 40, 60, 15] },
  { key: "B2", name: "Avanzado", zh: "高阶级", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙", t: [70, 40, 80, 20] },
];
const TOTAL = 80 + Object.values(NUEVOS).reduce((a, l) => a + l.length, 0);
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
            <small>DELE · 官方真题</small>
            <h1>Exámenes DELE oficiales</h1>
            <p>{TOTAL} modelos completos con las 4 pruebas, cronómetro y corrección.</p>
            <span className="unit-zh">{TOTAL}套完整模拟题 · 四项考试 · 计时与批改</span>
            <div className="ui-row" style={{ marginTop: 18 }}>
              <Link to="/examenes/generador" className="btn3d unit-cta" style={{ "--c": "#f2c14e", "--d": "#c8961e", color: "#5a0a16", textDecoration: "none" }}>
                ⚡ Examen rápido · 快速测试
              </Link>
            </div>
          </div>
          <img className="dele-dragon" src={`${import.meta.env.BASE_URL}theme/dragon.webp`} alt="" />
        </section>

        <h2 className="unit-h2" id="niveles">Modelos oficiales por nivel · 选择级别</h2>
        <div className="dh-portales">
          {LEVELS.map((l, i) => {
            const Escena = ESCENAS[l.key];
            const n = NUEVOS[l.key].length;
            return (
              <Link key={l.key} to={`/oficial/${l.key}`} className="dh-portal" data-nivel={l.key} style={{ animationDelay: `${i * 90}ms` }}>
                <Escena />
                <ParticulasNivel nivel={l.key} />
                <span className="dh-sello" aria-hidden="true" translate="no">
                  <i>{l.sello}</i>
                  <b>{l.key}</b>
                </span>
                {n > 0 && (
                  <span className="dh-nuevos">
                    <SparklesIcon size={13} /> {n} nuevo{n > 1 ? "s" : ""}
                  </span>
                )}
                <span className="dh-txt">
                  <small>
                    {l.mundo} · <span translate="no">{l.mundoZh}</span>
                  </small>
                  <b>
                    DELE {l.key} · {l.name}
                  </b>
                  <span className="dh-tiempos">
                    {["Lectura", "Audición", "Escritura", "Oral"].map((p, k) => (
                      <em key={p}>
                        {p} {l.t[k]}′
                      </em>
                    ))}
                  </span>
                  <span className="dh-cta">
                    Ver {20 + n} modelos · 查看{20 + n}套 <ArrowRightIcon size={16} strokeWidth={2.8} />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <h2 className="unit-h2">Más formas de prepararte · 更多备考方式</h2>
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
