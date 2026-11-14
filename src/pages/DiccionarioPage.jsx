import * as React from "react";
import { Volume2Icon, SearchIcon, RotateCwIcon, SparklesIcon, XIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { speak } from "../components/lesson/fx.js";
import { Boton, HeroSeccion, InsigniaNivel } from "../../packages/imperial/src/index.js";
import "../styles/v14-fix-recursos.css";

// Diccionario español–chino con estética imperial (tarjetas que giran, audio con la voz del profesor)
const LEVELS = [
  { key: "A1", name: "入门", c: "#b81c2e", load: () => import("../data/diccionarios/a1Dictionary.js").then((m) => m.a1Dictionary) },
  { key: "A2", name: "初级", c: "#2f8f52", load: () => import("../data/diccionarios/a2Dictionary.js").then((m) => m.a2Dictionary) },
  { key: "B1", name: "中级", c: "#c8901e", load: () => import("../data/diccionarios/b1Dictionary.js").then((m) => m.b1Dictionary) },
  { key: "B2", name: "高级", c: "#7a4fc4", load: () => import("../data/diccionarios/b2Dictionary.js").then((m) => m.b2Dictionary) },
];
const PAGE = 36;
const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const norm = (text) => String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
// Inicial de la palabra sin signos (¿, ¡) ni tildes; la Ñ se conserva
const inicial = (text) => {
  const letra = String(text || "").replace(/^[^\p{L}]+/u, "")[0] || "";
  return letra.toUpperCase() === "Ñ" ? "Ñ" : norm(letra).toUpperCase();
};

function Card({ w: word, color, i: index }) {
  const [flip, setFlip] = React.useState(false);
  const girar = () => {
    if (!flip) speak(word.es);
    setFlip((f) => !f);
  };
  return (
    <div
      className={`dict2 ${flip ? "flip" : ""}`}
      style={{ "--c": color, animationDelay: `${(index % PAGE) * 18}ms` }}
      role="button"
      tabIndex={0}
      aria-pressed={flip}
      aria-label={flip ? `${word.es}: ${word.zh}` : `${word.es} · Toca para ver la traducción · 点击翻转`}
      onClick={(e) => {
        if (e.target.closest("button")) return;
        girar();
      }}
      onKeyDown={(e) => e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), girar())}
    >
      <div className="dict2-in">
        <section className="dict2-face dict2-front">
          <div className="dict2-top">
            <span className="dict2-n">{index + 1}</span>
            <button onClick={() => speak(word.es)} aria-label="Escuchar · 听">
              <Volume2Icon size={16} />
            </button>
          </div>
          <div className="dict2-art">
            <span className="dict2-scroll">
              <b translate="no">{inicial(word.es)}</b>
            </span>
          </div>
          <h3>{word.es}</h3>
          <span className="dict2-chip">{word.theme}</span>
          <small className="dict2-hint">
            <RotateCwIcon size={12} aria-hidden="true" /> Toca · 点击翻转
          </small>
        </section>
        <section className="dict2-face dict2-back">
          <span className="dict2-es">{word.es}</span>
          <h3>{word.zh}</h3>
          {word.explanation && <p>{word.explanation}</p>}
          {word.exampleEs && (
            <button className="dict2-ex" onClick={() => speak(word.exampleEs)}>
              <Volume2Icon size={14} /> “{word.exampleEs}”<small>{word.exampleZh}</small>
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export default function DiccionarioPage() {
  const [level, setLevel] = React.useState("A1");
  const [words, setWords] = React.useState(null);
  const [q, setQ] = React.useState("");
  const [theme, setTheme] = React.useState("");
  const [letra, setLetra] = React.useState("");
  const [limit, setLimit] = React.useState(PAGE);
  const nivel = LEVELS.find((l) => l.key === level);

  React.useEffect(() => {
    setWords(null);
    setTheme("");
    setLetra("");
    setLimit(PAGE);
    nivel.load().then(setWords);
  }, [level]);

  const themes = React.useMemo(() => [...new Set((words || []).map((w) => w.theme).filter(Boolean))], [words]);
  const letrasConPalabras = React.useMemo(() => new Set((words || []).map((w) => inicial(w.es))), [words]);
  const palabraDelDia = words && words.length ? words[Math.floor(Date.now() / 86400000) % words.length] : null;
  const consulta = norm(q.trim());
  const list = (words || []).filter(
    (w) => (!theme || w.theme === theme) && (!letra || inicial(w.es) === letra) && (!consulta || norm(w.es).includes(consulta) || String(w.zh).includes(q.trim()))
  );
  const hayFiltros = Boolean(q || theme || letra);
  const limpiar = () => (setQ(""), setTheme(""), setLetra(""), setLimit(PAGE));

  return (
    <LightShell>
      <div className="unit-page rx-dicc" style={{ maxWidth: 1080 }}>
        <HeroSeccion
          ceja="词典 · Diccionario"
          titulo="Diccionario español–chino"
          tituloZh="西汉词典 · 每个词都有真人发音"
          descripcion={words ? `${words.length.toLocaleString("es-ES")} palabras de nivel ${level}. Toca una ficha para darle la vuelta: traducción, explicación y un ejemplo con audio.` : "Abriendo el diccionario…"}
          descripcionZh="点击卡片翻面，查看中文、讲解和带语音的例句。"
          mascota="guino"
        />

        <div className="dic-niveles" role="tablist" aria-label="Nivel · 级别">
          {LEVELS.map((l) => (
            <button key={l.key} role="tab" aria-selected={level === l.key} className={level === l.key ? "on" : ""} onClick={() => setLevel(l.key)}>
              <InsigniaNivel nivel={l.key} tamano="sm" />
              <span>
                {l.key}
                <small>{l.name}</small>
              </span>
            </button>
          ))}
        </div>

        {palabraDelDia && (
          <section className="jd-pdd" aria-label="Palabra del día · 每日一词">
            <span className="jd-pdd__sello" translate="no" aria-hidden="true">
              词
            </span>
            <div className="jd-pdd__texto">
              <span className="jd-eyebrow">
                <SparklesIcon size={13} /> Palabra del día · 每日一词 · {level}
              </span>
              <div className="jd-pdd__palabra">
                <b>{palabraDelDia.es}</b>
                <span className="jd-pdd__zh">{palabraDelDia.zh}</span>
              </div>
              {palabraDelDia.exampleEs && (
                <p className="jd-pdd__ej">
                  “{palabraDelDia.exampleEs}” <span>{palabraDelDia.exampleZh}</span>
                </p>
              )}
            </div>
            <button type="button" className="jd-pdd__audio" onClick={() => speak(palabraDelDia.exampleEs || palabraDelDia.es)} aria-label="Escuchar · 听">
              <Volume2Icon size={22} />
            </button>
          </section>
        )}

        <label className="imperial-search">
          <SearchIcon size={20} />
          <input value={q} onChange={(e) => (setQ(e.target.value), setLimit(PAGE))} placeholder="Busca en español o en chino · 搜索西语或中文" aria-label="Buscar palabra · 搜索单词" />
          {q && (
            <button type="button" className="jd-limpiar-busqueda" onClick={() => (setQ(""), setLimit(PAGE))} aria-label="Borrar · 清除">
              <XIcon size={18} />
            </button>
          )}
        </label>

        <nav className="jd-abc" aria-label="Por letra · 按字母">
          <button type="button" className={!letra ? "is-on" : ""} onClick={() => (setLetra(""), setLimit(PAGE))} aria-pressed={!letra}>
            A–Z
          </button>
          {ALFABETO.map((l) => (
            <button key={l} type="button" translate="no" className={letra === l ? "is-on" : ""} disabled={words ? !letrasConPalabras.has(l) : true} aria-pressed={letra === l} onClick={() => (setLetra(letra === l ? "" : l), setLimit(PAGE))}>
              {l}
            </button>
          ))}
        </nav>

        <div className="imperial-themes jd-temas">
          <button type="button" aria-pressed={!theme} className={!theme ? "on" : ""} onClick={() => setTheme("")}>
            Todos · 全部
          </button>
          {themes.map((t) => (
            <button key={t} type="button" aria-pressed={theme === t} className={theme === t ? "on" : ""} onClick={() => (setTheme(t), setLimit(PAGE))}>
              {t}
            </button>
          ))}
        </div>

        {words && (
          <div className="jd-recuento" aria-live="polite">
            <span>
              <b>{list.length.toLocaleString("es-ES")}</b> {list.length === 1 ? "palabra" : "palabras"} · 个单词
              {letra && ` · ${letra}`}
              {theme && ` · ${theme}`}
            </span>
            {hayFiltros && (
              <button type="button" onClick={limpiar}>
                <XIcon size={14} /> Quitar filtros · 清除筛选
              </button>
            )}
          </div>
        )}

        {!words ? (
          <div className="dict-grid jd-esqueleto" aria-label="Abriendo el diccionario… 正在打开词典">
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} />
            ))}
          </div>
        ) : !list.length ? (
          <div className="rx-vacio" role="status">
            <span className="rx-sello" aria-hidden="true">
              无
            </span>
            <p>
              No hay palabras con estos filtros
              <span>没有符合条件的单词</span>
            </p>
            <button type="button" className="rx-btn is-oro" onClick={limpiar}>
              <XIcon size={16} aria-hidden="true" /> Quitar filtros · 清除筛选
            </button>
          </div>
        ) : (
          <>
            <div className="dict-grid">
              {list.slice(0, limit).map((word, index) => (
                <Card key={word.es + index} w={word} i={index} color={nivel.c} />
              ))}
            </div>
            {limit < list.length && (
              <Boton variante="oro" className="dict-more" zh="更多" onClick={() => setLimit((n) => n + PAGE)}>
                Ver más palabras ({list.length - limit})
              </Boton>
            )}
          </>
        )}
      </div>
    </LightShell>
  );
}
