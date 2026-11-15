import * as React from "react";
import { Link } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { ArrowRightIcon, SparklesIcon, ZapIcon, TargetIcon, MicIcon, HeadphonesIcon } from "lucide-react";
import "../../styles/v23-dele-modos.css";
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
// Las cuatro formas de prepararse, cada una con su mundo (color, sello y carácter de fondo)
const MODOS = [
  { id: "simulacro", to: "/examenes/generador", icono: ZapIcon, sello: "考", marca: "试", etiqueta: "Examen nuevo cada vez", es: "Simulacro automático", zh: "自动模拟考", desc: "Un examen distinto en cada intento, con nota al momento.", chips: ["4 pruebas", "Nota al instante", "A1–B2"], cta: "Empezar simulacro" },
  { id: "destrezas", to: "/examenes", icono: TargetIcon, sello: "练", marca: "技", etiqueta: "Entrena lo que más te cuesta", es: "Practicar por destrezas", zh: "分项练习", desc: "Lectura, audición, escritura y oral, por niveles.", chips: ["Lectura", "Audición", "Escritura", "Oral"], cta: "Elegir destreza" },
  { id: "oral", to: "/examinador-oral", icono: MicIcon, sello: "问", marca: "言", etiqueta: "Con inteligencia artificial", es: "Examinador oral IA", zh: "AI口语考官", desc: "Preparación, monólogo y preguntas del entrevistador, como en el examen.", chips: ["Monólogo", "Entrevista", "Corrección DELE"], cta: "Hablar con el examinador" },
  { id: "acentos", to: "/audicion", icono: HeadphonesIcon, sello: "音", marca: "声", etiqueta: "Entrena el oído", es: "Acentos del español", zh: "口音听力", desc: "Audiciones con voces de España, México y Argentina.", chips: ["España", "México", "Argentina"], cta: "Escuchar acentos" },
];

export default function OficialHubPage() {
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
        <div className="dm-portales">
          {MODOS.map((m, i) => {
            const Icono = m.icono;
            return (
              <Link key={m.to} to={m.to} className="dm-portal" data-modo={m.id} style={{ animationDelay: `${i * 90}ms` }}>
                <span className="dm-fondo" aria-hidden="true">
                  <i className="dm-marca" translate="no">{m.marca}</i>
                  {m.id === "oral" || m.id === "acentos" ? (
                    <span className="dm-ondas">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : null}
                  <span className="dm-chispas">
                    {Array.from({ length: 10 }, (_, k) => (
                      <i key={k} style={{ "--k": k }} />
                    ))}
                  </span>
                </span>
                <span className="dm-sello" aria-hidden="true" translate="no">
                  {m.sello}
                </span>
                <span className="dm-medallon" aria-hidden="true">
                  <span className="dm-anillo" />
                  <Icono size={40} strokeWidth={2.2} />
                </span>
                <span className="dm-txt">
                  <small>{m.etiqueta}</small>
                  <b>{m.es}</b>
                  <span className="dm-zh" translate="no">{m.zh}</span>
                  <span className="dm-desc">{m.desc}</span>
                  <span className="dm-chips">
                    {m.chips.map((c) => (
                      <em key={c}>{c}</em>
                    ))}
                  </span>
                  <span className="dh-cta">
                    {m.cta} <ArrowRightIcon size={16} strokeWidth={2.8} />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </LightShell>
  );
}
