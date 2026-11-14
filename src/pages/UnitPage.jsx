import * as React from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { createPortal } from "react-dom";
import { ArrowLeftIcon, Volume2Icon, ChevronDownIcon, PlayIcon, CheckIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { StoryPlayer, CAST } from "../components/lesson/StoryPlayer.jsx";
import { speak } from "../components/lesson/fx.js";
import { useGame, getGame } from "../lib/gamification.js";
import { buildLesson, lessonId, LESSON_META, buildPractice, PRACTICE_TYPES, dialogToStory, buildAIChallenge } from "../lib/lessons.js";
import { loadAllModules, loadModulePlus } from "../lib/examGenerator.js";
import { markModuleVisited } from "../lib/progress.js";
import { clasesDe, claseValida, moduloDeClase, plusDeClase, progresoUnidad, sincronizarClase, ultimaClase, recordarClase } from "../lib/clases.js";
import CATALOG from "../data/modulos/catalog.json";
import STOPS from "../data/china-stops.json";
import { Moneda } from "../../packages/imperial/src/index.js";
import { IDIOMAS_AYUDA, useLanguage } from "../lib/i18n.jsx";
import { teoriaTraducida } from "../lib/traductorDom.js";
import { ParticulasNivel } from "../components/ui/ParticulasNivel.jsx";

import { GAMES, isReadyGame } from "./juegos/JuegosHubPage.jsx";
import "../styles/v14-fix-juegos.css";
import { u as useCorrection, C as CorrectionCard } from "../components/CorrectionDisplay.jsx";
const ModuloJuegos = React.lazy(() => import("./modulo/ModuloJuegos.jsx"));
const ModuloExamen = React.lazy(() => import("./modulo/ModuloExamen.jsx"));
const ModuloDescubre = React.lazy(() => import("./modulo/ModuloDescubre.jsx"));
const STORIES = import.meta.glob("../data/stories/*.json", { import: "default" });
const LEVEL_COLORS = { A1: ["#58cc02", "#46a302"], A2: ["#1cb0f6", "#1899d6"], B1: ["#ff9600", "#e08600"], B2: ["#ce82ff", "#a568cc"] };

function bullets(text) {
  return String(text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[•\-–]/.test(l))
    .map((l) => l.replace(/^[•\-–]\s*/, "").replace(/\s=\s[A-Za-z' ,.()/!?-]+$/, ""));
}

function WordCard({ v, color }) {
  const [flip, setFlip] = React.useState(false);
  return (
    <button
      className={`unit-word ${flip ? "flip" : ""}`}
      style={{ "--c": color }}
      onClick={() => {
        setFlip((f) => !f);
        if (!flip) speak(v.espanol);
      }}
    >
      <span className="unit-word-in">
        <span className="front">
          <b>{v.espanol}</b>
          <Volume2Icon size={15} />
        </span>
        <span className="back">
          <b>{v.chino}</b>
          {v.ejemplo && <small>{v.ejemplo}</small>}
        </span>
      </span>
    </button>
  );
}

// Guía rápida: convierte el texto de teoría en bloques ordenados (títulos, listas, tablas, párrafos y notas)
const SPECIAL = [[/^📌/, "note"], [/^❌/, "error"], [/^(💡|✅\s*CONSEJO)/, "tip"]];
const BULLET = /^([•\-–*→✅]|\d+[.º)]|\p{Extended_Pictographic})\s*/u;
function splitItem(text) {
  const m = text.match(/^(.+?)\s(?:=|→|–|-)\s(.+)$/) || text.match(/^([^:]{2,40}):\s(.+)$/);
  return m ? { term: m[1].trim(), def: m[2].trim() } : { term: text, def: "" };
}
function parseTeoria(text) {
  const blocks = [];
  let cur = null;
  const close = () => (cur = null);
  for (const raw of String(text || "").split("\n")) {
    const l = raw.trim();
    if (!l) {
      if (cur && cur.type !== "list" && cur.type !== "table") close();
      continue;
    }
    if (l.startsWith("|")) {
      if (/^\|[\s|:-]+\|?$/.test(l)) continue;
      const cells = l.split("|").map((c) => c.trim()).filter(Boolean);
      if (cur?.type !== "table") blocks.push((cur = { type: "table", rows: [] }));
      cur.rows.push(cells);
      continue;
    }
    const sp = SPECIAL.find(([re]) => re.test(l));
    if (sp) {
      const rest = l.replace(/^\S+\s*[^:]*:?\s*/, "").trim();
      blocks.push((cur = { type: sp[1], lines: rest ? [rest] : [] }));
      continue;
    }
    if (cur && ["note", "error", "tip"].includes(cur.type)) {
      cur.lines.push(l.replace(BULLET, ""));
      continue;
    }
    if (/:$/.test(l) && l.length <= 70) {
      blocks.push({ type: "h", text: l.replace(/^\p{Extended_Pictographic}\s*/u, "").replace(/:$/, "") });
      close();
      continue;
    }
    if (BULLET.test(l)) {
      if (cur?.type !== "list") blocks.push((cur = { type: "list", items: [] }));
      cur.items.push(splitItem(l.replace(BULLET, "")));
      continue;
    }
    blocks.push({ type: "p", text: l });
    close();
  }
  return blocks;
}

// Traducción oculta por defecto: el botón la muestra debajo, en el idioma de ayuda elegido (se recuerda y se comparte)
const ZH_KEY = "ai-espanol:ver-chino";
let ultimoCambioZh = 0;
export function useVerChino() {
  const [ver, setVer] = React.useState(() => { try { return localStorage.getItem(ZH_KEY) === "1"; } catch { return false; } });
  React.useEffect(() => {
    const f = () => { try { setVer(localStorage.getItem(ZH_KEY) === "1"); } catch {} };
    window.addEventListener("ver-chino", f);
    return () => window.removeEventListener("ver-chino", f);
  }, []);
  const cambiar = () => { ultimoCambioZh = Date.now(); try { localStorage.setItem(ZH_KEY, ver ? "0" : "1"); } catch {} window.dispatchEvent(new Event("ver-chino")); };
  return [ver, cambiar];
}
export function OjoChino() {
  const [ver, cambiar] = useVerChino();
  const { ayuda } = useLanguage();
  const idioma = IDIOMAS_AYUDA.find((l) => l.code === ayuda) || IDIOMAS_AYUDA[0];
  return (
    <button type="button" className={`ojo-zh ${ver ? "on" : ""}`} onClick={cambiar} aria-pressed={ver} title={ver ? "Ocultar traducción" : "Mostrar traducción"} translate="no">
      {ver ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
      <span className="ojo-zh-bandera">{idioma.bandera}</span>
      <span>{ver ? "Ocultar" : "Traducción"}</span>
    </button>
  );
}

// Traducción completa de la explicación, debajo del texto en español: párrafos, puntos, subtítulos y tablas
function bloquesTraduccion(texto) {
  const out = [];
  for (const raw of String(texto || "").split(/\n+/)) {
    const l = raw.trim().replace(/\*\*/g, "").replace(/^#+\s*/, "");
    if (!l || /^\|?[\s|:-]*-{3,}[\s|:-]*$/.test(l)) continue;
    if (l.startsWith("|")) {
      const celdas = l.split("|").map((c) => c.trim()).filter(Boolean);
      const ult = out[out.length - 1];
      if (ult?.tipo === "tabla") ult.filas.push(celdas);
      else out.push({ tipo: "tabla", filas: [celdas] });
    } else if (/^[•\-–*→✅]/.test(l)) out.push({ tipo: "punto", texto: l.replace(/^[•\-–*→]\s*/, "") });
    else if (/^(📌|❌|💡)/.test(l) || (/[:：]$/.test(l) && l.length <= 60)) out.push({ tipo: "h", texto: l });
    else out.push({ tipo: "p", texto: l });
  }
  return out;
}
function TraduccionGuia({ t, numero }) {
  const { ayuda } = useLanguage();
  const idioma = IDIOMAS_AYUDA.find((l) => l.code === ayuda) || IDIOMAS_AYUDA[0];
  const [trad, setTrad] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    let vivo = true;
    setTrad(null);
    teoriaTraducida(ayuda, numero).then((d) => vivo && setTrad(d));
    return () => (vivo = false);
  }, [ayuda, numero]);
  // Solo se desplaza hasta la traducción cuando el alumno acaba de pulsar el botón
  React.useEffect(() => {
    if (Date.now() - ultimoCambioZh < 1500) ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);
  const propia = ayuda !== "zh" ? trad?.[t.id] : null;
  const texto = propia ? propia.descripcion : t.descripcionChino;
  const titulo = propia ? propia.titulo : t.tituloChino;
  if (!String(texto || "").trim()) return null;
  return (
    <div ref={ref} className={`gd-trad gd-trad--${propia ? ayuda : "zh"}`} lang={propia ? ayuda : "zh"} {...(propia ? { "data-sin-traducir": "" } : {})}>
      <div className="gd-trad-cab">
        <span className="gd-trad-bandera">{idioma.bandera}</span>
        <span>
          <b translate="no">Traducción · {idioma.nombre}</b>
          {titulo && <small>{titulo}</small>}
        </span>
      </div>
      <div className="gd-trad-cuerpo">
        {bloquesTraduccion(texto).map((b, i) =>
          b.tipo === "tabla" ? (
            <div key={i} className="gd-trad-tabla">
              <table>
                <tbody>
                  {b.filas.map((f, k) => (
                    <tr key={k}>{f.map((c, n) => (k === 0 ? <th key={n}>{c}</th> : <td key={n}>{c}</td>))}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : b.tipo === "punto" ? (
            <p key={i} className="gd-trad-punto">{b.texto}</p>
          ) : b.tipo === "h" ? (
            <h5 key={i}>{b.texto}</h5>
          ) : (
            <p key={i}>{b.texto}</p>
          ),
        )}
      </div>
    </div>
  );
}

// `teoria` = puntos de la clase abierta; `todas` = los de la unidad (para leer las marcas «Visto» antiguas, que eran posiciones)
function GuideScroll({ teoria, todas = teoria, numero }) {
  const [verZh] = useVerChino();
  const [sel, setSel] = React.useState(0);
  const key = `dele_guia_visto_${numero}`;
  const [seen, setSeen] = React.useState(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem(key) || "[]");
      return new Set(guardado.map((marca) => (typeof marca === "number" ? todas[marca]?.id : marca)).filter(Boolean));
    } catch {
      return new Set();
    }
  });
  const t = teoria[sel];
  if (!t) return null;
  const es = parseTeoria(t.descripcion);
  const zh = parseTeoria(t.descripcionChino);
  const zhOf = (i) => (zh[i] && zh[i].type === es[i].type ? zh[i] : null);
  const main = es.map((b, i) => [b, zhOf(i)]).filter(([b]) => !["note", "error", "tip"].includes(b.type));
  const extras = es.map((b, i) => [b, zhOf(i)]).filter(([b]) => ["note", "error", "tip"].includes(b.type));
  const terms = es.flatMap((b) => (b.type === "list" ? b.items.map((x) => x.term) : [])).filter((x) => x.length <= 40);
  const plaques = terms.length ? terms : (t.ejemplos || []).map((e) => e.espanol);
  const idDe = (i) => teoria[i]?.id ?? i;
  const toggleSeen = () => {
    const vistos = new Set(seen);
    vistos.has(idDe(sel)) ? vistos.delete(idDe(sel)) : vistos.add(idDe(sel));
    setSeen(vistos);
    try {
      localStorage.setItem(key, JSON.stringify([...vistos]));
    } catch {}
  };
  return (
    <section className={`gd ${verZh ? "gd--zh" : ""}`} id="u-guia">
      <div className="gd-ribbon">Guía rápida · 语法要点</div>
      <button className={`gd-visto ${seen.has(idDe(sel)) ? "on" : ""}`} onClick={toggleSeen} title="Marcar como leído · 标记为已读">
        Visto
      </button>
      <div className="gd-head">
        <h3>{t.titulo}</h3>
        <p>{t.tituloChino}</p>
        <OjoChino />
      </div>
      <div className="gd-scroll">
        <img className="gd-deco" src={`${THEME}sello-monedas.png`} alt="" />
        <div className="gd-body">
          <div className="gd-text">
            {main.map(([b, z], i) =>
              b.type === "h" ? (
                <h4 key={i} className="gd-h">
                  {b.text}
                </h4>
              ) : b.type === "p" ? (
                <p key={i} className="gd-intro">
                  {b.text}
                </p>
              ) : b.type === "table" ? (
                <div key={i} className="gd-table">
                  <table>
                    <tbody>
                      {b.rows.map((r, k) => (
                        <tr key={k}>{r.map((c, n) => (k === 0 ? <th key={n}>{c}</th> : <td key={n}>{c}</td>))}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div key={i} className="gd-items">
                  {b.items.map((p, k) => (
                    <div key={k} className="gd-point">
                      <b>{p.term}</b>
                      {p.def && <span>{p.def}</span>}
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
          {plaques.length > 0 && (
            <div className="gd-plaques">
              <span className="gd-plaques-tag">Escucha · 听</span>
              {plaques.slice(0, 5).map((w, i) => (
                <button key={i} className="gd-plaque" onClick={() => speak(w)}>
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {extras.length > 0 && (
        <div className="gd-notes">
          {extras.map(([b, z], i) => (
            <div key={i} className={b.type === "error" ? "gd-error" : "gd-note"}>
              <b>{b.type === "error" ? "❌ Error común · 常见错误" : b.type === "tip" ? "💡 Consejo · 小贴士" : "📌 Nota importante · 重要提示"}</b>
              {b.lines.slice(0, 5).map((n, k) => (
                <p key={k}>
                  {n}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
      {(t.ejemplos || []).length > 0 && (
        <div className="gd-examples">
          {t.ejemplos.slice(0, 4).map((e, i) => (
            <button key={i} className="gd-ex" onClick={() => speak(e.espanol)}>
              <Volume2Icon size={16} />
              <span>
                <b>{e.espanol}</b>
                <small>{e.chino}</small>
              </span>
            </button>
          ))}
        </div>
      )}
      {verZh && <TraduccionGuia t={t} numero={numero} />}
      {teoria.length > 1 && (
        <div className="gd-list">
          {teoria.map((x, i) => (
            <button key={i} className={`gd-row ${i === sel ? "on" : ""}`} onClick={() => setSel(i)}>
              <span className={`gd-tick ${seen.has(idDe(i)) ? "on" : ""}`}>{seen.has(idDe(i)) ? "✓" : i + 1}</span>
              <span>
                <b>{x.titulo}</b>
                <small>{x.tituloChino}</small>
              </span>
              <ChevronDownIcon size={16} style={{ transform: "rotate(-90deg)" }} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

// Producción de la unidad: redacción corregida como en el DELE y tarea oral con el examinador IA
const PALABRAS = { A1: [30, 50], A2: [60, 80], B1: [100, 150], B2: [150, 180] };
function ProduccionUnidad({ mod, nivel }) {
  const { correctText, isCorrecting } = useCorrection();
  const [txt, setTxt] = React.useState("");
  const [res, setRes] = React.useState(null);
  const tema = String(mod.titulo || "").split(" - ")[0];
  const puntos = [...(mod.teoria || []).slice(0, 3).map((t) => `Usa: ${t.titulo}`), "Usa al menos 5 palabras del vocabulario de la unidad"];
  const [min, max] = PALABRAS[nivel] || PALABRAS.A2;
  const enunciado = `Escribe un texto sobre «${tema}» con lo que has aprendido en esta unidad (${min}-${max} palabras).`;
  const palabras = (txt.match(/[\p{L}\p{N}]+/gu) || []).length;
  const corregir = async () => {
    const r = await correctText(txt, "escritura", nivel, `${tema}. ${enunciado}`, { nivel, puntosGuia: puntos, minPalabras: min, maxPalabras: max });
    setRes(r?.data || null);
  };
  return (
    <div className="unit-prod">
      <div className="unit-prod-task">
        <h3>✍️ Expresión escrita · 写作</h3>
        <p>{enunciado}</p>
        <ul>
          {puntos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={7} placeholder="Escribe aquí · 在这里写" />
        <div className="unit-prod-foot">
          <span className={palabras < min || palabras > max ? "fuera" : "ok"}>
            {palabras} / {min}–{max} palabras · 字数
          </span>
          <button className="wel-btn red" disabled={isCorrecting || !txt.trim()} onClick={corregir}>
            {isCorrecting ? "Corrigiendo… · 批改中…" : "Corregir como en el DELE · 批改"}
          </button>
        </div>
        {res && <CorrectionCard data={res} />}
      </div>
      <div className="unit-prod-task oral">
        <h3>🎙️ Expresión oral · 口语</h3>
        <p>Habla sobre «{tema}»: preparación, monólogo y preguntas del entrevistador, corregido con los criterios del DELE.</p>
        <a className="oe-link" href={`#/examinador-oral?nivel=${nivel}&tema=${encodeURIComponent(tema)}&tarea=${encodeURIComponent(`Monólogo sobre la unidad «${tema}»`)}&puntos=${encodeURIComponent(JSON.stringify(puntos))}`}>
          Empezar con el examinador IA · 开始口语练习
        </a>
      </div>
    </div>
  );
}

// Piezas 3D recortadas de las maquetas (public/theme)
const THEME = `${import.meta.env.BASE_URL}theme/`;

const contarEjercicios = (info) => Object.values(info?.ejercicios || {}).reduce((total, lista) => total + lista.length, 0);

// Selector de clases: cada unidad se da en 2–3 clases de ~50 minutos
function SelectorClases({ progreso, actual, onElegir }) {
  const lista = React.useRef(null);
  React.useEffect(() => {
    // En móvil, la tarjeta de la clase abierta queda a la vista dentro del carril horizontal
    const carril = lista.current;
    const activa = carril?.querySelector(".cls-tarjeta.on");
    if (carril && activa && carril.scrollWidth > carril.clientWidth) carril.scrollTo({ left: activa.offsetLeft - 16, behavior: "smooth" });
  }, [actual]);
  return (
    <section className="cls-selector gm-no-adapt" id="u-clases" aria-label="Clases de la unidad">
      <div className="cls-selector-cab">
        <span className="cls-cinta">
          Clases de la unidad <span translate="no">· 单元课程</span>
        </span>
        <small>
          {progreso.completadas}/{progreso.total} hechas · 已完成 — cada clase ≈ 50 min · 每课约50分钟
        </small>
      </div>
      <div className="cls-tarjetas" role="tablist" ref={lista}>
        {progreso.clases.map((clase) => {
          const on = clase.n === actual;
          return (
            <button
              key={clase.n}
              type="button"
              role="tab"
              aria-selected={on}
              className={`cls-tarjeta ${on ? "on" : ""} ${clase.completada ? "hecha" : ""}`}
              onClick={() => onElegir(clase.n)}
            >
              <span className="cls-sello" translate="no">
                <b>第{clase.n}课</b>
              </span>
              <span className="cls-tarjeta-txt">
                <small>
                  Clase {clase.n} · 第{clase.n}课 · ~{clase.minutos || 50} min
                </small>
                <b>{clase.titulo}</b>
                <i>{clase.tituloChino}</i>
                <span className="cls-datos">
                  <span>{clase.vocabulario.length} palabras · 词</span>
                  <span>{clase.dialogos.length} diálogos · 对话</span>
                  <span>{contarEjercicios(clase)} ejercicios · 练习</span>
                </span>
                <span className="cls-cuentas" aria-label={`${clase.hechas} de 5 lecciones`}>
                  {clase.lecciones.map((hecha, i) => (
                    <i key={i} className={hecha || clase.completada ? "on" : ""} />
                  ))}
                  <em>{clase.completada ? "✓ Hecha · 完成" : clase.hechas ? `${clase.hechas}/5 lecciones` : "Nueva · 新课"}</em>
                </span>
              </span>
              {on && <span className="cls-aqui">Estás aquí · 当前</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// Objetivo de la clase abierta, sobre pergamino con sello «目标»
function ObjetivoClase({ info, total }) {
  if (!info || info.todo) return null;
  return (
    <div className="cls-objetivo gm-no-adapt">
      <span className="cls-objetivo-sello" translate="no">
        目标
      </span>
      <div>
        <small>
          Objetivo de la clase {info.n} de {total} · 第{info.n}课目标
        </small>
        <p>{info.objetivo?.es}</p>
        <p className="cls-zh">{info.objetivo?.zh}</p>
      </div>
      <span className="cls-objetivo-datos">
        <b>~{info.minutos || 50}</b> min
        <small>{info.teoria.length} {info.teoria.length === 1 ? "punto" : "puntos"} de gramática</small>
      </span>
    </div>
  );
}

// Final de la clase: qué falta para terminarla y el paso siguiente (otra clase, examen de la unidad o la unidad siguiente)
function FinDeClase({ numero, estado, siguiente, total, siguienteUnidad, onIrClase, onExamen }) {
  if (!estado) return null;
  const ultima = !siguiente;
  return (
    <section className={`cls-fin gm-no-adapt ${estado.completada ? "hecha" : ""}`} id="u-fin-clase">
      <span className="cls-fin-sello" translate="no">
        {estado.completada ? "完成" : `第${estado.n}课`}
      </span>
      <div className="cls-fin-txt">
        {estado.completada ? (
          <>
            <h3>
              ¡Clase {estado.n} completada! <span className="cls-zh">第{estado.n}课完成！</span>
            </h3>
            <p>{ultima ? (total > 1 ? "Has hecho todas las clases. Demuestra lo aprendido con el examen de la unidad." : "Demuestra lo aprendido con el examen de la unidad.") : `Sigue con la clase ${siguiente.n}: ${siguiente.titulo}.`}</p>
            <p className="cls-zh">{ultima ? "完成单元考试，检验你的学习成果。" : `继续学习第${siguiente.n}课：${siguiente.tituloChino}`}</p>
          </>
        ) : (
          <>
            <h3>
              Para terminar la clase {estado.n} <span className="cls-zh">如何完成第{estado.n}课</span>
            </h3>
            <p>Haz sus 5 lecciones ({estado.hechas}/5) o aprueba su examen corto con 80 o más.</p>
            <p className="cls-zh">完成本课5个小课（{estado.hechas}/5），或小测验得到80分以上。</p>
          </>
        )}
      </div>
      <div className="cls-fin-botones">
        {!estado.completada && (
          <button type="button" className="cls-btn-papel" onClick={onExamen}>
            📝 Examen de la clase · 小测验
          </button>
        )}
        {siguiente ? (
          <button type="button" className={estado.completada ? "cls-btn-laca grande" : "cls-btn-papel"} onClick={() => onIrClase(siguiente.n)}>
            {estado.completada ? "Siguiente clase" : "Ir a la clase"} {siguiente.n} · 第{siguiente.n}课 →
          </button>
        ) : (
          <>
            <button type="button" className={estado.completada ? "cls-btn-laca grande" : "cls-btn-papel"} onClick={onExamen}>
              🏆 Examen de la unidad · 单元考试
            </button>
            {estado.completada && siguienteUnidad && (
              <Link className="cls-btn-papel" to={`/modulos/modulo-${siguienteUnidad.numero}`}>
                Unidad {siguienteUnidad.numero} · 第{siguienteUnidad.numero}单元 →
              </Link>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// Aviso a pantalla completa al terminar una clase durante la sesión
function CelebrarClase({ estado, siguiente, onIrClase, onExamen, onCerrar }) {
  return createPortal(
    <div className="cls-celebra gm-no-adapt" role="dialog" aria-modal="true" aria-label="Clase completada" onClick={onCerrar}>
      <div className="cls-celebra-hoja" onClick={(e) => e.stopPropagation()}>
        <span className="cls-celebra-sello" translate="no">
          完成
        </span>
        <img src={`${import.meta.env.BASE_URL}mono/trofeo.png`} alt="" className="cls-celebra-mono" onError={(e) => (e.currentTarget.style.display = "none")} />
        <h3>¡Clase {estado.n} completada!</h3>
        <p className="cls-zh">第{estado.n}课完成！</p>
        <p>{estado.titulo}</p>
        {siguiente ? (
          <button type="button" className="cls-btn-laca grande" onClick={() => onIrClase(siguiente.n)}>
            Empezar la clase {siguiente.n} · 开始第{siguiente.n}课 →
          </button>
        ) : (
          <button type="button" className="cls-btn-laca grande" onClick={onExamen}>
            🏆 Examen de la unidad · 单元考试
          </button>
        )}
        <button type="button" className="cls-btn-texto" onClick={onCerrar}>
          Quedarme en esta clase · 留在本课
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function UnitPage() {
  const { moduloId } = useParams();
  const [params, setParams] = useSearchParams();
  const numero = Number(String(moduloId).replace(/\D/g, ""));
  const meta = CATALOG.find((m) => m.numero === numero);
  const [modCompleto, setModCompleto] = React.useState(null);
  const [plusCompleto, setPlusCompleto] = React.useState(null);
  const [story, setStory] = React.useState(undefined);
  const [lesson, setLesson] = React.useState(null);
  const [playStory, setPlayStory] = React.useState(false);
  const [reto, setReto] = React.useState(false);
  const [dialog, setDialog] = React.useState(null);
  const [types, setTypes] = React.useState(PRACTICE_TYPES.map((tipo) => tipo.key));
  const [extra, setExtra] = React.useState(() => params.get("tab"));
  const [celebrar, setCelebrar] = React.useState(null);
  const [, refrescar] = React.useReducer((x) => x + 1, 0);
  const game = useGame();
  const [c1, c2] = LEVEL_COLORS[meta?.nivel] || LEVEL_COLORS.A1;

  // Clase abierta: la de la URL (?clase=2) o la última que el alumno tenía abierta en esta unidad
  const clase = claseValida(numero, params.get("clase") ?? ultimaClase(numero));
  const clases = clasesDe(numero);
  const info = clases.find((c) => c.n === clase) || clases[0];
  const mod = React.useMemo(() => moduloDeClase(modCompleto, clase), [modCompleto, clase]);
  const plus = React.useMemo(() => plusDeClase(plusCompleto, numero, clase), [plusCompleto, numero, clase]);

  React.useEffect(() => {
    if (!meta) return;
    markModuleVisited(`modulo-${numero}`);
    window.scrollTo(0, 0);
    loadAllModules().then((all) => setModCompleto(all.find((m) => m.numero === numero)));
    loadModulePlus(numero).then(setPlusCompleto);
    const load = STORIES[`../data/stories/modulo-${numero}.json`];
    load ? load().then((s) => setStory({ ...s, modulo: numero })) : setStory(null);
    // Registra como hechas las clases cuyas 5 lecciones ya estaban hechas (p. ej. las de antes de existir las clases)
    clases.forEach((c) => sincronizarClase(numero, c.n, getGame().lessons));
  }, [numero]);

  React.useEffect(() => {
    recordarClase(numero, clase);
    if (params.get("clase") !== String(clase))
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("clase", String(clase));
          return next;
        },
        { replace: true },
      );
  }, [numero, clase]);

  React.useEffect(() => {
    window.addEventListener("progreso-clases", refrescar);
    return () => window.removeEventListener("progreso-clases", refrescar);
  }, []);

  if (!meta) return <div className="ui-page">Módulo no encontrado · 未找到该单元</div>;
  const progreso = progresoUnidad(numero, game.lessons);
  const estado = progreso.clases.find((c) => c.n === clase) || progreso.clases[0];
  const siguienteClase = progreso.clases.find((c) => c.n === clase + 1) || null;
  const done = estado.lecciones;
  const nextIdx = done.findIndex((hecha) => !hecha);
  const pct = progreso.pct;
  const prev = CATALOG.find((m) => m.numero === numero - 1);
  const next = CATALOG.find((m) => m.numero === numero + 1);
  const varias = clases.length > 1;
  const conHistoria = !varias || info.historia;
  const start = (i) => mod && setLesson(buildLesson(mod, plus, i, Date.now(), done[i]));

  const irAClase = (n) => {
    setCelebrar(null);
    setParams(
      (prevParams) => {
        const nuevos = new URLSearchParams(prevParams);
        nuevos.set("clase", String(n));
        nuevos.delete("tab");
        return nuevos;
      },
      { replace: false },
    );
    setExtra(null);
    requestAnimationFrame(() => document.getElementById("u-clases")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const abrirExamen = () => {
    setCelebrar(null);
    setExtra("examen");
    requestAnimationFrame(() => document.getElementById("u-extra")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const alCerrarLeccion = () => {
    setLesson(null);
    const yaEstaba = estado.completada;
    const ahora = sincronizarClase(numero, clase, getGame().lessons);
    if (ahora && !yaEstaba) setCelebrar(clase);
  };

  // Botón principal del héroe: la lección siguiente de la clase, o pasar a la siguiente clase
  const cta = !mod
    ? { texto: "Cargando… · 加载中", accion: null }
    : nextIdx >= 0
      ? { texto: `${nextIdx === 0 ? "Empezar" : "Continuar"} · ${LESSON_META[nextIdx].es}`, accion: () => start(nextIdx) }
      : siguienteClase && !siguienteClase.completada
        ? { texto: `Clase ${siguienteClase.n} · 第${siguienteClase.n}课 →`, accion: () => irAClase(siguienteClase.n) }
        : { texto: "Repasar · 复习", accion: () => start(4) };

  return (
    <LightShell>
      <div className="unit-page" data-nivel={meta.nivel}>
        <Link to={`/ruta?nivel=${meta.nivel}`} className="unit-back">
          <ArrowLeftIcon size={16} /> Ruta {meta.nivel} · 学习路线
        </Link>

        <section className="unit-hero imperial-frame unit-hero--v10" style={{ "--c": c1, "--d": c2, "--pct": pct }}>
          <span className="uh-mapa" aria-hidden="true" />
          <ParticulasNivel nivel={meta.nivel} />
          {STOPS.find((x) => x.n === numero) && (
            <span className="uh-parada">
              📍 {STOPS.find((x) => x.n === numero).ciudad} · {STOPS.find((x) => x.n === numero).lugar}
              <i>{STOPS.find((x) => x.n === numero).ciudadZh}·{STOPS.find((x) => x.n === numero).lugarZh}</i>
            </span>
          )}
          <span className="imperial-cloud c1" />
          <span className="imperial-cloud c2" />
          <span className="unit-seal">
            第{numero}
            <br />
            单元
          </span>
          <div className="unit-hero-text">
            <small>
              {meta.nivel} · UNIDAD {numero} · 第{numero}单元
              {varias && (
                <>
                  {" "}
                  · CLASE {clase}/{clases.length}
                </>
              )}
            </small>
            <h1>{meta.titulo.split(" - ")[0]}</h1>
            <p>{meta.titulo.split(" - ")[1] || ""}</p>
            <span className="unit-zh">{meta.tituloChino}</span>
            <div className="unit-hero-progress">
              <div className="lp-bar" style={{ background: "rgba(0,0,0,.2)" }}>
                <i style={{ width: `${pct}%`, background: "linear-gradient(180deg,#fff,#e8e8e8)" }} />
              </div>
              <b>{pct}%</b>
              {varias && (
                <span className="cls-hero-cuenta">
                  {progreso.completadas}/{progreso.total} clases · 课
                </span>
              )}
            </div>
            <button className="btn3d unit-cta" style={{ "--c": "#fff", "--d": "rgba(0,0,0,.25)", color: c2 }} disabled={!cta.accion} onClick={cta.accion || undefined}>
              <PlayIcon size={20} fill="currentColor" /> {cta.texto}
            </button>
          </div>
          <div className="unit-hero-art">
            <span className="uh-anillo" aria-hidden="true" />
            <Moneda tamano={190} tono="oro" brillo>
              <Emoji3D emoji={meta.icono} size={104} float />
            </Moneda>
            <b className="uh-pct">{pct}%</b>
          </div>
        </section>
        <span className="unit-stamp" aria-hidden="true">
          第<span className="tcy">{numero}</span>单元
        </span>

        {varias && <SelectorClases progreso={progreso} actual={clase} onElegir={irAClase} />}
        <ObjetivoClase info={info} total={clases.length} />

        <nav className="unit-jump unit-jump--v11" aria-label="Secciones">
          {[["guia", "💡 Guía"], ["lecciones", "🎯 Lecciones"], ...(conHistoria ? [["historia", "📖 Historia"]] : []), ["dialogos", "💬 Diálogos"], ["ejercicios", "💪 Ejercicios"], ["produccion", "✍️ Producción"], ["juegos", "🎮 Juegos"], ["palabras", "🔤 Palabras"], ...(varias ? [["fin-clase", "🏁 Fin de la clase"]] : [])].map(([id, label]) => (
            <button key={id} onClick={() => document.getElementById(`u-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              {label}
            </button>
          ))}
        </nav>

        {mod && (mod.teoria || []).length > 0 && <GuideScroll key={`guia-${clase}`} teoria={mod.teoria} todas={modCompleto?.teoria || mod.teoria} numero={numero} />}

        <h2 className="unit-h2" id="u-lecciones">
          {varias ? `Lecciones de la clase ${clase} · 第${clase}课` : "Lecciones · 课程"}
        </h2>
        <div className="unit-lessons">
          {LESSON_META.map((l, i) => {
            const open = i === 0 || done[i - 1] || done[i];
            return (
              <button key={l.key} className={`unit-lesson ${done[i] ? "done" : ""} ${open ? "" : "locked"} ${i === nextIdx ? "current" : ""}`} style={{ "--c": c1, "--d": c2 }} disabled={!mod} onClick={() => start(i)}>
                <span className="unit-lesson-icon disc">
                  <img src={`${THEME}${done[i] ? "lazo-oro" : open ? "disco-jade" : "disco-cerrado"}.png`} alt="" />
                  {done[i] && <CheckIcon className="disc-check" size={16} strokeWidth={4} />}
                </span>
                <b>{l.es}</b>
                <small>{l.zh}</small>
                <em>{done[i] ? "Hecha ✓" : "+10 XP"}</em>
              </button>
            );
          })}
        </div>

        {story && conHistoria && (
          <>
            <h2 className="unit-h2" id="u-historia">
              Historia · 故事 {varias && <small>(cierra la unidad: usa las palabras de todas las clases)</small>}
            </h2>
            <button className="unit-story" onClick={() => setPlayStory(true)}>
              <Emoji3D emoji={story.escena} size={96} float />
              <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <small>HISTORIA INTERACTIVA · +15 XP</small>
                <b>{story.titulo}</b>
                <span className="lp-zh">{story.tituloZh}</span>
                <span className="unit-cast">
                  {[...new Set(story.lineas.map((linea) => linea.quien))]
                    .filter((quien) => CAST[quien] && quien !== "narrador")
                    .map((quien) => (
                      <span key={quien} title={CAST[quien].name}>
                        <Emoji3D emoji={CAST[quien].emoji} size={34} />
                        {CAST[quien].name}
                      </span>
                    ))}
                </span>
              </span>
              <span className="unit-play">
                <PlayIcon size={26} fill="currentColor" />
              </span>
            </button>
          </>
        )}

        {mod?.dialogos?.length > 0 && (
          <>
            <h2 className="unit-h2" id="u-dialogos">
              Diálogos · 对话 <small>({mod.dialogos.length} {mod.dialogos.length === 1 ? "conversación" : "conversaciones"} con voz)</small>
            </h2>
            <div className="unit-dialogs">
              {mod.dialogos.map((d, i) => (
                <button key={d.id || i} className="unit-dialog" onClick={() => setDialog(dialogToStory(d, numero, story?.escena))}>
                  <span className="unit-dialog-faces">
                    <Emoji3D emoji={["👩‍🦰", "🧔", "👧", "👨", "👵"][i % 5]} size={44} />
                    <Emoji3D emoji={["👨", "👧", "👵", "👩‍🦰", "🧔"][i % 5]} size={44} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <b>{d.titulo}</b>
                    <small>
                      {d.tituloChino} · {(d.lineas || []).length} frases
                    </small>
                  </span>
                  <PlayIcon size={20} fill="currentColor" />
                </button>
              ))}
            </div>
          </>
        )}

        {mod && (
          <>
            <h2 className="unit-h2" id="u-ejercicios">Ejercicios · 练习 <small>(elige los tipos; cambian de orden en cada intento)</small></h2>
            <div className="unit-practice">
              <div className="unit-practice-types">
                {PRACTICE_TYPES.filter((tipo) => (mod.ejercicios?.[tipo.key] || []).length).map((tipo) => {
                  const on = types.includes(tipo.key);
                  return (
                    <button key={tipo.key} className={`unit-ptype ${on ? "on" : ""}`} style={{ "--c": c1 }} onClick={() => setTypes((lista) => (on ? lista.filter((x) => x !== tipo.key) : [...lista, tipo.key]))}>
                      <Emoji3D emoji={tipo.emoji} size={30} />
                      <span>
                        {tipo.es}
                        <small>
                          {tipo.zh} · {(mod.ejercicios?.[tipo.key] || []).length}
                        </small>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button className="btn3d unit-practice-go" style={{ "--c": c1, "--d": c2 }} disabled={!types.length} onClick={() => setLesson(buildPractice(mod, types))}>
                💪 Practicar ahora · 开始练习
              </button>
              <button
                className="btn3d unit-practice-go unit-reto"
                style={{ "--c": "#c8102e", "--d": "#8f0c21" }}
                disabled={reto}
                onClick={async () => {
                  setReto(true);
                  const retoNuevo = await buildAIChallenge(mod);
                  setReto(false);
                  setLesson(retoNuevo);
                }}
              >
                {reto ? "Creando preguntas… · 生成中…" : "✨ Reto nuevo con IA · AI新挑战"}
              </button>
            </div>

            <h2 className="unit-h2" id="u-produccion">Producción · 写作与口语 <small>(corregida con los criterios del DELE)</small></h2>
            <ProduccionUnidad mod={mod} nivel={meta.nivel} />

            <h2 className="unit-h2" id="u-juegos">Juegos · 游戏 <small>(con las palabras de esta unidad)</small></h2>
            <div className="unit-games">
              {[...GAMES].sort((a, b) => isReadyGame(b) - isReadyGame(a)).map((g) => {
                const Icon = g.icon;
                if (!isReadyGame(g))
                  return (
                    <div key={g.id} className="unit-game gm-locked" aria-disabled="true" title="Próximamente · 即将推出">
                      <span className="unit-game-icon" style={{ background: g.gradient }}>
                        <Icon size={24} color="#fff" />
                      </span>
                      <b>{g.name}</b>
                      <small>🔒 Próximamente</small>
                    </div>
                  );
                return (
                  <Link key={g.id} to={`${g.path}?m=${numero}&clase=${clase}`} className="unit-game">
                    <span className="unit-game-icon" style={{ background: g.gradient }}>
                      <Icon size={24} color="#fff" />
                    </span>
                    <b>{g.name}</b>
                    <small>{g.nameCn}</small>
                  </Link>
                );
              })}
            </div>

            <h2 className="unit-h2" id="u-palabras">
              {varias ? `Palabras de la clase ${clase} · 第${clase}课词汇` : "Palabras · 词汇"} <small>(toca para girar y escuchar)</small>
            </h2>
            <div className="unit-words">
              {(mod.vocabulario || []).slice(0, varias ? 40 : 24).map((v) => (
                <WordCard key={v.id || v.espanol} v={v} color={c1} />
              ))}
            </div>
          </>
        )}

        <h2 className="unit-h2" id="u-extra">Practica más · 更多练习</h2>
        <div className="unit-more">
          {[
            ["descubre", "📖", plus?.lectura ? "Lectura y cultura" : "Frases y errores típicos", plus?.lectura ? "阅读与文化" : "常用句与常见错误"],
            ["examen", "📝", varias ? "Examen · clase o unidad" : "Examen del módulo", varias ? "本课小测 · 单元考试" : "模块考试"],
          ].map(([k, e, es, zh]) => (
            <button key={k} className={`unit-more-card ${extra === k ? "on" : ""}`} style={{ "--c": c1 }} onClick={() => setExtra(extra === k ? null : k)}>
              <Emoji3D emoji={e} size={52} />
              <b>{es}</b>
              <small>{zh}</small>
            </button>
          ))}
        </div>
        {extra && mod && (
          <div className="unit-extra">
            <React.Suspense fallback={<div className="ui-empty">Cargando… · 加载中</div>}>
              {extra === "descubre" && <ModuloDescubre key={`descubre-${clase}`} numero={numero} plus={plus} clase={clase} showChinese />}
              {extra === "juegos" && <ModuloJuegos vocabulario={mod.vocabulario || []} moduloId={mod.id} />}
              {extra === "examen" && <ModuloExamen numero={numero} moduloId={mod.id} clase={varias ? clase : null} modoInicial={params.get("examen") === "unidad" ? "unidad" : undefined} />}
            </React.Suspense>
          </div>
        )}

        {varias && (
          <FinDeClase numero={numero} estado={estado} siguiente={siguienteClase} total={clases.length} siguienteUnidad={next} onIrClase={irAClase} onExamen={abrirExamen} />
        )}

        <div className="unit-nav">
          {prev ? (
            <Link to={`/modulos/modulo-${prev.numero}`} className="unit-nav-btn">
              ← {prev.numero}. {prev.titulo.split(" - ")[0]}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/modulos/modulo-${next.numero}`} className="unit-nav-btn">
              {next.numero}. {next.titulo.split(" - ")[0]} →
            </Link>
          )}
        </div>
      </div>
      {lesson && <LessonPlayer lesson={lesson} onClose={alCerrarLeccion} />}
      {playStory && story && <StoryPlayer story={story} onClose={() => setPlayStory(false)} />}
      {dialog && <StoryPlayer story={dialog} onClose={() => setDialog(null)} />}
      {celebrar && !lesson && (
        <CelebrarClase
          estado={progreso.clases.find((c) => c.n === celebrar) || estado}
          siguiente={progreso.clases.find((c) => c.n === celebrar + 1) || null}
          onIrClase={irAClase}
          onExamen={abrirExamen}
          onCerrar={() => setCelebrar(null)}
        />
      )}
    </LightShell>
  );
}
