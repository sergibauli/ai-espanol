import { ChevronDownIcon, LightbulbIcon, TriangleAlertIcon, CircleCheckBigIcon, EyeIcon, QuoteIcon } from "lucide-react";
import * as React from "react";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import "../styles/v14-fix-recursos.css";
import { GRAMMAR_TOPICS } from "../data/gramatica.js";
const NIVELES = ["A1", "A2", "B1", "B2"];
// Nombres de cada nivel (el color lo pone la clase rx-nv-* de v14-fix-recursos.css)
const INFO_NIVEL = {
  A1: {
    label: "Nivel A1",
    labelCn: "入门级",
  },
  A2: {
    label: "Nivel A2",
    labelCn: "基础级",
  },
  B1: {
    label: "Nivel B1",
    labelCn: "进阶级",
  },
  B2: {
    label: "Nivel B2",
    labelCn: "熟练级",
  },
};
const CATEGORIAS = {
  verbos: "Verbos / 动词",
  sustantivos: "Sustantivos / 名词",
  pronombres: "Pronombres / 代词",
  conectores: "Conectores / 连接词",
  preposiciones: "Preposiciones / 介词",
  sintaxis: "Sintaxis / 句法",
  pronunciación: "Pronunciación / 发音",
  vocabulario: "Vocabulario / 词汇",
};
const nivelDe = (level) => level.split("-")[0].trim();
function GramaticaPage() {
  const [abiertos, setAbiertos] = React.useState(new Set());
  const [respuestasVistas, setRespuestasVistas] = React.useState(new Set());
  const temasPorNivel = React.useMemo(() => {
    const grupos = { A1: [], A2: [], B1: [], B2: [] };
    for (const tema of GRAMMAR_TOPICS) {
      const nivel = nivelDe(tema.level);
      if (grupos[nivel]) grupos[nivel].push(tema);
    }
    return grupos;
  }, []);
  const alternar = (setter) => (id) =>
    setter((previo) => {
      const siguiente = new Set(previo);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });
  const alternarTema = alternar(setAbiertos);
  const alternarRespuesta = alternar(setRespuestasVistas);
  const irANivel = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const totalTemas = GRAMMAR_TOPICS.length;
  return (
    <div className="rx-page rx-hoja gm-no-adapt">
      <div className="rx-wrap is-estrecho">
        <SectionHero
          eyebrow="Gramática · 语法"
          title="Gramática explicada"
          titleZh="西班牙语语法详解"
          description="Los temas clave de cada nivel, explicados con ejemplos y en chino. Toca un nivel para saltar a sus temas."
          descriptionZh="各级别的核心语法，配有例句和中文讲解。"
          stats={[
            { value: totalTemas, label: "temas · 个主题" },
            { value: NIVELES.length, label: "niveles · 个级别" },
          ]}
        />
        <nav className="rx-filtros rx-gram__saltos" aria-label="Ir a un nivel · 跳到级别">
          {NIVELES.map((nivel) => {
            const cantidad = temasPorNivel[nivel].length;
            return (
              <button key={nivel} type="button" onClick={() => irANivel(`nivel-${nivel}`)} className={`rx-chip rx-nv-${nivel}`}>
                {nivel} · {cantidad} {cantidad === 1 ? "tema" : "temas"} <small>{cantidad} 个主题</small>
              </button>
            );
          })}
        </nav>
        {NIVELES.map((nivel) => {
          const info = INFO_NIVEL[nivel];
          const temas = temasPorNivel[nivel];
          if (temas.length === 0) return null;
          return (
            <section key={nivel} id={`nivel-${nivel}`} className={`rx-nv-${nivel}`} style={{ scrollMarginTop: 90 }}>
              <div className="rx-cabecera">
                <span className="rx-sello is-nivel" aria-hidden="true">
                  {nivel}
                </span>
                <h2 className="rx-h2" style={{ color: "var(--nv)" }}>
                  {info.label} <span className="rx-zh">{info.labelCn}</span>
                  <small>
                    {temas.length} {temas.length === 1 ? "tema" : "temas"} · {temas.length} 个主题
                  </small>
                </h2>
              </div>
              <div className="rx-acc">
                {temas.map((tema, indice) => {
                  const abierto = abiertos.has(tema.id);
                  const respuestaVisible = respuestasVistas.has(tema.id);
                  return (
                    <div key={tema.id} className={`rx-acc__item ${abierto ? "is-abierto" : ""}`}>
                      <button type="button" className="rx-acc__btn" aria-expanded={abierto} aria-controls={`tema-${tema.id}`} onClick={() => alternarTema(tema.id)}>
                        <span className="rx-sello is-nivel rx-gram__num" aria-hidden="true">
                          {indice + 1}
                        </span>
                        <span className="rx-acc__titulo rx-h3">
                          {tema.title}
                          <span className="rx-zh">{tema.titleCn}</span>
                        </span>
                        {tema.category && <span className="rx-tag is-plano rx-gram__cat">{CATEGORIAS[tema.category] || tema.category}</span>}
                        <span className="rx-acc__chev" aria-hidden="true">
                          <ChevronDownIcon size={20} />
                        </span>
                      </button>
                      {abierto && (
                        <div className="rx-acc__cuerpo" id={`tema-${tema.id}`}>
                          <div>
                            <p className="rx-texto">{tema.explanation}</p>
                            <p className="rx-texto-zh">{tema.explanationCn}</p>
                          </div>
                          <div className="rx-caja">
                            <p className="rx-caja__titulo">
                              <QuoteIcon size={15} aria-hidden="true" /> Ejemplos · 例句
                            </p>
                            <ul>
                              {tema.examples.map((ejemplo, clave) => (
                                <li key={clave}>
                                  {ejemplo.es}
                                  <span>{ejemplo.zh}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rx-caja is-error">
                            <p className="rx-caja__titulo">
                              <TriangleAlertIcon size={15} aria-hidden="true" /> Error común · 常见错误
                            </p>
                            <p className="rx-texto">{tema.commonError}</p>
                            <p className="rx-texto-zh">{tema.commonErrorCn}</p>
                          </div>
                          <div className="rx-caja is-consejo">
                            <p className="rx-caja__titulo">
                              <LightbulbIcon size={15} aria-hidden="true" /> Consejo · 小贴士
                            </p>
                            <p className="rx-texto">{tema.tip}</p>
                            <p className="rx-texto-zh">{tema.tipCn}</p>
                          </div>
                          {tema.practice && (
                            <div className="rx-caja is-practica">
                              <p className="rx-caja__titulo">
                                <CircleCheckBigIcon size={15} aria-hidden="true" /> Práctica rápida · 快速练习
                              </p>
                              <p className="rx-texto">{tema.practice.question}</p>
                              <p className="rx-texto-zh" style={{ marginBottom: 10 }}>
                                {tema.practice.questionCn}
                              </p>
                              <button type="button" className="rx-btn is-papel is-mini" aria-expanded={respuestaVisible} onClick={() => alternarRespuesta(tema.id)}>
                                <EyeIcon size={16} aria-hidden="true" />
                                {respuestaVisible ? "Ocultar respuesta · 隐藏答案" : "Ver respuesta · 看答案"}
                              </button>
                              {respuestaVisible && (
                                <p className="rx-solucion">
                                  {tema.practice.answer}
                                  <span>{tema.practice.answerCn}</span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
export { GramaticaPage as default };
