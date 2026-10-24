import * as React from "react";
import { Volume2Icon, SearchIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { speak } from "../components/lesson/fx.js";
import VOCAB_EMOJI from "../data/vocab-emoji.json";

// Diccionario español–chino con estética imperial (tarjetas que giran, audio con la voz del profesor)
const LEVELS = [
  { key: "A1", name: "入门", c: "#58cc02", load: () => import("../data/diccionarios/a1Dictionary.js").then((m) => m.a1Dictionary) },
  { key: "A2", name: "初级", c: "#1cb0f6", load: () => import("../data/diccionarios/a2Dictionary.js").then((m) => m.a2Dictionary) },
  { key: "B1", name: "中级", c: "#ff9600", load: () => import("../data/diccionarios/b1Dictionary.js").then((m) => m.b1Dictionary) },
  { key: "B2", name: "高级", c: "#ce82ff", load: () => import("../data/diccionarios/b2Dictionary.js").then((m) => m.b2Dictionary) },
];
const PAGE = 36;
const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function Card({ w, color, i }) {
  const [flip, setFlip] = React.useState(false);
  const pic = VOCAB_EMOJI[String(w.es).trim()];
  return (
    <div
      className={`dict2 ${flip ? "flip" : ""}`}
      style={{ "--c": color, animationDelay: `${(i % PAGE) * 18}ms` }}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (e.target.closest("button")) return;
        if (!flip) speak(w.es);
        setFlip((f) => !f);
      }}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setFlip((f) => !f))}
    >
      <div className="dict2-in">
        <section className="dict2-face dict2-front">
          <div className="dict2-top">
            <span className="dict2-n">{i + 1}</span>
            <button onClick={() => speak(w.es)} aria-label="Escuchar">
              <Volume2Icon size={16} />
            </button>
          </div>
          <div className="dict2-art">{pic ? <Emoji3D emoji={pic} size={64} /> : <span className="dict2-letter">{String(w.es).trim()[0]?.toUpperCase()}</span>}</div>
          <h3>{w.es}</h3>
          <span className="dict2-chip">{w.theme}</span>
          <small className="dict2-hint">👆 Toca · 点击翻转</small>
        </section>
        <section className="dict2-face dict2-back">
          <span className="dict2-es">{w.es}</span>
          <h3>{w.zh}</h3>
          {w.explanation && <p>{w.explanation}</p>}
          {w.exampleEs && (
            <button className="dict2-ex" onClick={() => speak(w.exampleEs)}>
              <Volume2Icon size={14} /> “{w.exampleEs}”<small>{w.exampleZh}</small>
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
  const [limit, setLimit] = React.useState(PAGE);
  const lv = LEVELS.find((l) => l.key === level);

  React.useEffect(() => {
    setWords(null);
    setTheme("");
    setLimit(PAGE);
    lv.load().then(setWords);
  }, [level]);

  const themes = React.useMemo(() => [...new Set((words || []).map((w) => w.theme).filter(Boolean))], [words]);
  const nq = norm(q.trim());
  const list = (words || []).filter((w) => (!theme || w.theme === theme) && (!nq || norm(w.es).includes(nq) || String(w.zh).includes(q.trim())));

  return (
    <LightShell>
      <div className="unit-page" style={{ maxWidth: 1080 }}>
        <section className="imperial-hero">
          <span className="imperial-cloud c1" />
          <span className="imperial-cloud c2" />
          <div className="imperial-hero-text">
            <small>词典 · DICCIONARIO</small>
            <h1>Diccionario español–chino</h1>
            <p>
              {words ? `${words.length.toLocaleString("es-ES")} palabras de nivel ${level}` : "Cargando…"} · toca una tarjeta para ver la traducción y escucharla
            </p>
          </div>
          <div className="imperial-hero-art">
            <Emoji3D emoji="📜" size={120} float />
          </div>
        </section>

        <div className="imperial-seals">
          {LEVELS.map((l) => (
            <button key={l.key} className={`imperial-seal ${level === l.key ? "on" : ""}`} style={{ "--c": l.c }} onClick={() => setLevel(l.key)}>
              <b>{l.key}</b>
              <small>{l.name}</small>
            </button>
          ))}
        </div>

        <label className="imperial-search">
          <SearchIcon size={20} />
          <input value={q} onChange={(e) => (setQ(e.target.value), setLimit(PAGE))} placeholder="Busca en español o en chino · 搜索西语或中文" />
        </label>
        <div className="imperial-themes">
          <button className={!theme ? "on" : ""} onClick={() => setTheme("")}>
            Todos · 全部
          </button>
          {themes.map((t) => (
            <button key={t} className={theme === t ? "on" : ""} onClick={() => (setTheme(t), setLimit(PAGE))}>
              {t}
            </button>
          ))}
        </div>

        {!words ? (
          <div className="ui-empty">Abriendo el diccionario… 正在打开词典</div>
        ) : !list.length ? (
          <div className="ui-empty">No hay palabras con «{q}».</div>
        ) : (
          <>
            <div className="dict-grid">
              {list.slice(0, limit).map((w, i) => (
                <Card key={w.es + i} w={w} i={i} color={lv.c} />
              ))}
            </div>
            {limit < list.length && (
              <button className="btn3d dict-more" style={{ "--c": lv.c, "--d": "rgba(0,0,0,.25)" }} onClick={() => setLimit((l) => l + PAGE)}>
                Ver más palabras ({list.length - limit}) · 更多
              </button>
            )}
          </>
        )}
      </div>
    </LightShell>
  );
}
