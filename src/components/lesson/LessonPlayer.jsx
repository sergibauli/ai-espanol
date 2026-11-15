import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon, HeartIcon, Volume2Icon, SnailIcon, CheckIcon, ZapIcon, TargetIcon, ClockIcon, MicIcon } from "lucide-react";
import { MonoNube } from "../../../packages/imperial/src/index.js";
import { Emoji3D } from "../ui/Emoji3D.jsx";
import { sfx, speak, confetti } from "./fx.js";
import { addXp, loseHeart, refillHearts, getGame } from "../../lib/gamification.js";
import { recordAnswer } from "../../lib/progresoDele.js";
import CATALOG from "../../data/modulos/catalog.json";

const levelOf = (n) => CATALOG.find((m) => m.numero === Number(n))?.nivel || "A1";
import { Pergamino, FondoCielo } from "./Pergamino.jsx";
import "../../styles/v28-ejercicios.css";
import { IconoTipo, IcoBorrar, IcoRacha, TrazoBien, TrazoMal } from "./IconosEjercicio.jsx";

const TEACH = new Set(["learn", "tip", "dialog", "speak"]);
const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[¿?¡!.,;:«»"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
const noAccents = (s) => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "");

function SpeakButtons({ text, big = false }) {
  return (
    <span className="ui-row" style={{ gap: 6 }}>
      <button className={`lp-speak ${big ? "big" : ""}`} onClick={() => speak(text)} aria-label="Escuchar">
        <Volume2Icon size={big ? 30 : 18} />
      </button>
      {big && (
        <button className="lp-speak slow" onClick={() => speak(text, 0.55)} aria-label="Escuchar despacio">
          <SnailIcon size={20} />
        </button>
      )}
    </span>
  );
}

// Pronunciación con el reconocimiento de voz del navegador: se compara lo oído con la palabra (sin tildes ni signos)
const SR = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
function parecido(a, b) {
  const x = noAccents(a);
  const y = noAccents(b);
  if (!x || !y) return 0;
  const d = Array.from({ length: x.length + 1 }, (_, i) => [i, ...Array(y.length).fill(0)]);
  for (let j = 1; j <= y.length; j++) d[0][j] = j;
  for (let i = 1; i <= x.length; i++) for (let j = 1; j <= y.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
  return 1 - d[x.length][y.length] / Math.max(x.length, y.length);
}

function Pronunciar({ texto, level, onExito, pequeno = false }) {
  const [estado, setEstado] = React.useState("listo");
  const [oido, setOido] = React.useState("");
  if (!SR) return null;
  const escuchar = () => {
    if (estado === "escucha") return;
    speechSynthesis?.cancel?.();
    const r = new SR();
    r.lang = "es-ES";
    r.interimResults = false;
    r.maxAlternatives = 4;
    r.onstart = () => setEstado("escucha");
    r.onerror = () => setEstado("listo");
    r.onend = () => setEstado((e) => (e === "escucha" ? "listo" : e));
    r.onresult = (e) => {
      const alts = Array.from(e.results[0], (a) => a.transcript);
      const ok = Math.max(...alts.map((a) => parecido(a, texto))) >= 0.72;
      setOido(alts[0] || "");
      setEstado(ok ? "bien" : "mal");
      sfx(ok ? "ok" : "bad");
      recordAnswer({ skill: "oral", level, ok, src: "pronunciación", error: ok ? undefined : { prompt: texto, given: alts[0], correct: texto, speak: texto, type: "speak" } });
      if (ok) onExito?.();
    };
    r.start();
  };
  return (
    <div className={`lp-pron ${estado} ${pequeno ? "peq" : ""}`}>
      <button className="lp-pron-btn" onClick={escuchar} aria-label="Pronunciar">
        <MicIcon size={pequeno ? 16 : 22} />
        {!pequeno && <span>{estado === "escucha" ? "Te escucho… · 我在听" : "Pronuncia · 跟读"}</span>}
      </button>
      {estado === "bien" && <span className="lp-pron-sello">¡Bien dicho! · 说得好</span>}
      {estado === "mal" && !pequeno && (
        <span className="lp-pron-oido">
          He oído «{oido}» · 再试一次
        </span>
      )}
    </div>
  );
}

function Learn({ step, level, onNext }) {
  React.useEffect(() => {
    const t = setTimeout(() => speak(step.es), 350);
    return () => clearTimeout(t);
  }, [step]);
  const avance = React.useRef(null);
  React.useEffect(() => () => clearTimeout(avance.current), []);
  return (
    <div className="lp-center">
      <Cabecera tipo="learn" es="Palabra nueva" zh="新词" />
      <Pergamino className="lp-rollo">
        <Emoji3D emoji={step.emoji} size={96} float />
        <div className="lp-word">{step.es}</div>
        <div className="lp-zh-big">{step.zh}</div>
        <div className="lp-acciones">
          <SpeakButtons text={step.es} big />
          <Pronunciar texto={step.es} level={level} onExito={() => (avance.current = setTimeout(onNext, 1400))} />
        </div>
        {step.example && <div className="lp-example">{step.example}</div>}
      </Pergamino>
      {SR && <div className="lp-pista">Di la palabra en voz alta para pasar a la siguiente · 读出这个词就能继续</div>}
    </div>
  );
}

// «Di en voz alta»: la palabra se aprueba pronunciándola (si el navegador tiene reconocimiento de voz)
function Hablar({ step, level, onNext }) {
  const avance = React.useRef(null);
  React.useEffect(() => () => clearTimeout(avance.current), []);
  return (
    <div className="lp-center">
      <Cabecera tipo="speak" es="Di en voz alta" zh="读出来" />
      <Pergamino className="lp-rollo">
        {step.emoji && <Emoji3D emoji={step.emoji} size={80} float />}
        <div className="lp-word">{step.es}</div>
        <div className="lp-zh-big">{step.zh}</div>
        <div className="lp-acciones">
          <SpeakButtons text={step.es} big />
          <Pronunciar texto={step.es} level={level} onExito={() => (avance.current = setTimeout(onNext, 1300))} />
        </div>
      </Pergamino>
      <div className="lp-pista">Escúchala y repítela: si la dices bien, pasas sola · 听一遍再读，读对了自动继续</div>
    </div>
  );
}

function Tip({ step, level }) {
  return (
    <div className="lp-tip">
      <Cabecera tipo="tip" es="Idea clave" zh="要点" />
      <h2 className="lp-title">{step.title}</h2>
      {step.titleZh && <div className="lp-zh">{step.titleZh}</div>}
      <div className="lp-points">
        {step.points.map((p, i) => (
          <div key={i} className="lp-point" style={{ animationDelay: `${i * 120}ms` }}>
            <b>{p.es}</b>
            {p.zh && <span>{p.zh}</span>}
          </div>
        ))}
        {step.summary && (
          <div className="lp-point">
            <b>{step.summary}</b>
            {step.summaryZh && <span>{step.summaryZh}</span>}
          </div>
        )}
      </div>
      {step.examples?.map((e, i) => (
        <div key={i} className="lp-example-row">
          <SpeakButtons text={e.espanol} />
          <Pronunciar texto={e.espanol} level={level} pequeno />
          <div>
            <div style={{ fontWeight: 800 }}>{e.espanol}</div>
            <div className="lp-zh">{e.chino}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Diálogo sobre pergamino: medallón de jade por personaje y bocadillos de jade con marco de oro
function Dialog({ step, level, emoji }) {
  const caras = {};
  const cara = (who) => (caras[who] ??= Object.keys(caras).length % 2 ? "👨" : "👩");
  return (
    <div className="lp-tip lp-dialogo">
      {emoji && <Emoji3D emoji={emoji} size={92} float className="lp-dialogo__icono" />}
      <h2 className="lp-title">
        {step.title}
        <span className="lp-dialogo__sello" aria-hidden="true">对话</span>
      </h2>
      {step.titleZh && <div className="lp-dialogo__zh">{step.titleZh}</div>}
      <div className="lp-chat">
        {step.lines.map((l, i) => (
          <div key={i} className="lp-linea" style={{ animationDelay: `${i * 160}ms` }}>
            <span className="lp-linea__cara">
              <span className="lp-linea__disco">
                <Emoji3D emoji={cara(l.who)} size={40} />
              </span>
              <small>{l.who}</small>
            </span>
            <div className="lp-bubble">
              <div className="lp-bubble__texto">
                <div className="lp-bubble__es">{l.es}</div>
                {l.zh && <div className="lp-zh">{l.zh}</div>}
              </div>
              <span className="lp-bubble__voz">
                <SpeakButtons text={l.es} />
                <Pronunciar texto={l.es} level={level} pequeno />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cabecera de cada juego: icono propio del tipo + nombre en español y chino
function Cabecera({ tipo, es, zh }) {
  return (
    <div className="ej-cabecera">
      <span className="ej-cabecera__ico">
        <IconoTipo tipo={tipo} size={34} />
      </span>
      <span className="ej-cabecera__txt">
        <b>{es}</b>
        <span lang="zh">{zh}</span>
      </span>
    </div>
  );
}

// Enunciado en una tablilla con marco de oro
function Enunciado({ texto, zh, children }) {
  return (
    <div className="ej-enunciado">
      <h2 className="ej-enunciado__es">{texto}</h2>
      {zh && <div className="ej-enunciado__zh">{zh}</div>}
      {children}
    </div>
  );
}

// Clase de estado común de cada opción (elegida / correcta / incorrecta tras comprobar)
const estado = (locked, value, i, answer) => `${value === i ? "is-elegida" : ""} ${locked && i === answer ? "is-bien" : ""} ${locked && value === i && i !== answer ? "is-mal" : ""}`;

function MarcaEstado() {
  return (
    <span className="ej-marca" aria-hidden="true">
      <span className="ej-marca__bien"><TrazoBien size={22} /></span>
      <span className="ej-marca__mal"><TrazoMal size={20} /></span>
    </span>
  );
}

function Choice({ step, value, onChange, locked }) {
  React.useEffect(() => {
    if (step.type === "listen" || step.speak) {
      const t = setTimeout(() => speak(step.speak), 300);
      return () => clearTimeout(t);
    }
  }, [step]);
  const escucha = step.type === "listen";
  return (
    <div className={`ej ej--${escucha ? "listen" : "choice"}`}>
      <Cabecera tipo={escucha ? "listen" : "choice"} es={escucha ? "Escucha y elige" : "Elige la respuesta"} zh={escucha ? "听音选择" : "选择正确答案"} />
      {escucha ? (
        <div className="ej-gong">
          <button className="ej-gong__btn" onClick={() => speak(step.speak)} aria-label="Escuchar · 听">
            <span className="ej-gong__ondas" aria-hidden="true" />
            <Volume2Icon size={40} />
          </button>
          <button className="ej-gong__lento" onClick={() => speak(step.speak, 0.55)} aria-label="Escuchar despacio · 慢速">
            <SnailIcon size={20} />
            <span>Despacio · 慢速</span>
          </button>
        </div>
      ) : (
        <Enunciado texto={step.prompt} zh={step.promptZh}>
          {step.speak && (
            <button className="ej-oir" onClick={() => speak(step.speak)} aria-label="Escuchar · 听">
              <Volume2Icon size={18} />
            </button>
          )}
        </Enunciado>
      )}
      <div className="ej-opciones">
        {step.options.map((o, i) => (
          <button
            key={i}
            disabled={locked}
            style={{ "--i": i }}
            className={`ej-opcion ${estado(locked, value, i, step.answer)}`}
            onClick={() => {
              sfx("tap");
              onChange(i);
            }}
          >
            <span className="ej-moneda">{i + 1}</span>
            <span className="ej-opcion__txt">{o}</span>
            <MarcaEstado />
          </button>
        ))}
      </div>
    </div>
  );
}

function TrueFalse({ step, value, onChange, locked }) {
  return (
    <div className="ej ej--tf">
      <Cabecera tipo="tf" es="¿Verdadero o falso?" zh="对还是错？" />
      <Enunciado texto={step.prompt} zh={step.promptZh} />
      <div className="ej-sellos">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            disabled={locked}
            className={`ej-sello-btn ${v ? "es-verdad" : "es-falso"} ${estado(locked, value, v, step.answer)}`}
            onClick={() => {
              sfx("tap");
              onChange(v);
            }}
          >
            <span className="ej-sello-btn__disco">{v ? <TrazoBien size={46} /> : <TrazoMal size={42} />}</span>
            <span className="ej-sello-btn__es">{v ? "Verdadero" : "Falso"}</span>
            <span className="ej-sello-btn__zh" lang="zh">{v ? "对" : "错"}</span>
            <MarcaEstado />
          </button>
        ))}
      </div>
    </div>
  );
}

// Quien pregunta: el Rey Mono en un medallón, con bocadillo de pergamino (nada de avatares tipo emoji)
function Character({ text, speakText }) {
  return (
    <div className="ej-mono">
      <span className="ej-mono__medallon" aria-hidden="true">
        <img src="./mono/serio.png" alt="" />
      </span>
      <div className="ej-mono__bocadillo">
        {speakText && (
          <button className="ej-oir" onClick={() => speak(speakText)} aria-label="Escuchar">
            <Volume2Icon size={16} />
          </button>
        )}
        <span>{text}</span>
      </div>
    </div>
  );
}

function Pictures({ step, value, onChange, locked }) {
  return (
    <div className="ej ej--pictures">
      <Cabecera tipo="pictures" es="¿Cuál es?" zh="选出图片" />
      <Enunciado texto={step.prompt} zh={step.promptZh} />
      <div className="ej-cartas">
        {step.options.map((o, i) => (
          <button
            key={i}
            disabled={locked}
            style={{ "--i": i }}
            className={`ej-carta ${estado(locked, value, i, step.answer)}`}
            onClick={() => {
              sfx("tap");
              speak(o, 1);
              onChange(i);
            }}
          >
            <span className="ej-carta__arte">
              <Emoji3D emoji={step.pics[i]} size={72} />
            </span>
            <span className="ej-carta__pie">
              <span className="ej-moneda">{i + 1}</span>
              {o}
            </span>
            <MarcaEstado />
          </button>
        ))}
      </div>
    </div>
  );
}

function Build({ step, value = [], onChange, locked }) {
  const used = new Set(value);
  return (
    <div className="ej ej--build">
      <Cabecera tipo="build" es="Ordena la frase" zh="排列句子" />
      <Character text={step.prompt} />
      <div className={`ej-tablero ${value.length ? "" : "is-vacio"}`}>
        {value.length === 0 && <span className="ej-tablero__pista">Toca las fichas en orden · 按顺序点击</span>}
        {value.map((ti) => (
          <button key={ti} className="ej-ficha is-puesta" disabled={locked} onClick={() => onChange(value.filter((x) => x !== ti))}>
            {step.tiles[ti]}
          </button>
        ))}
      </div>
      <div className="ej-fichas">
        {step.tiles.map((t, i) => (
          <button
            key={i}
            style={{ "--i": i }}
            className={`ej-ficha ${used.has(i) ? "is-hueco" : ""}`}
            disabled={locked || used.has(i)}
            onClick={() => {
              sfx("tap");
              speak(t, 1);
              onChange([...value, i]);
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// Tapa la solución si aparece dentro de un texto de ayuda (pistas o traducción): nunca se debe dar la respuesta en pantalla
function taparSolucion(texto, answer) {
  let t = String(texto || "");
  const quita = (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const letra = (c) => /[a-zñ0-9]/i.test(c || "");
  for (const a of String(answer || "").split(/\s*\/\s*/).map((x) => x.trim()).filter(Boolean)) {
    const buscado = quita(a);
    let desde = 0;
    for (;;) {
      const plano = quita(t);
      const i = plano.indexOf(buscado, desde);
      if (i < 0) break;
      // Solo palabras enteras: «en» no tapa «enero»
      if (letra(plano[i - 1]) || letra(plano[i + buscado.length])) {
        desde = i + 1;
        continue;
      }
      t = t.slice(0, i) + "_".repeat(buscado.length) + t.slice(i + buscado.length);
      desde = i + buscado.length;
    }
  }
  return t;
}

function TypeIt({ step, value = "", onChange, locked, onEnter }) {
  const [verPista, setVerPista] = React.useState(false);
  const pista = taparSolucion(step.hint, step.answer);
  const zh = taparSolucion(step.promptZh, step.answer);
  return (
    <div className="ej ej--type">
      <Cabecera tipo="type" es="Escribe en español" zh="用西语写" />
      {step.character ? <Character text={step.prompt} /> : <Enunciado texto={step.prompt} />}
      {zh && <div className="ej-enunciado__zh ej-suelto">{zh}</div>}
      <div className="ej-escribir">
        <input
          className="ej-input"
          autoFocus
          value={value}
          disabled={locked}
          placeholder="Escribe aquí · 在这里输入"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnter()}
          autoCapitalize="off"
          autoComplete="off"
          spellCheck={false}
        />
        {pista && !locked && (
          verPista ? (
            <div className="ej-pista" role="status">
              <IconoTipo tipo="tip" size={20} />
              <span>{pista}</span>
            </div>
          ) : (
            <button type="button" className="ej-pista-btn" onClick={() => setVerPista(true)}>
              <IconoTipo tipo="tip" size={18} /> Pista · 提示
            </button>
          )
        )}
      </div>
      <div className="ej-teclado" aria-label="Teclado español">
        {["áéíóúüñ¿¡", "qwertyuiop", "asdfghjklñ", "zxcvbnm"].map((row) => (
          <div key={row} className="ej-teclado__fila">
            {[...new Set(row)].map((c) => (
              <button key={c} className={`ej-tecla ${"áéíóúüñ¿¡".includes(c) ? "es-especial" : ""}`} disabled={locked} onClick={() => onChange(value + c)}>
                {c}
              </button>
            ))}
          </div>
        ))}
        <div className="ej-teclado__fila">
          <button className="ej-tecla es-ancha" disabled={locked} onClick={() => onChange(value + " ")}>
            espacio · 空格
          </button>
          <button className="ej-tecla es-borrar" disabled={locked} onClick={() => onChange(value.slice(0, -1))} aria-label="Borrar · 删除">
            <IcoBorrar size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Match({ step, onDone }) {
  const [left] = React.useState(() => step.pairs.map((p, i) => ({ i, t: p.a })).sort(() => Math.random() - 0.5));
  const [right] = React.useState(() => step.pairs.map((p, i) => ({ i, t: p.b })).sort(() => Math.random() - 0.5));
  const [sel, setSel] = React.useState(null);
  const [done, setDone] = React.useState([]);
  const [bad, setBad] = React.useState(null);
  const pick = (side, item) => {
    if (done.includes(item.i)) return;
    if (side === "a") speak(item.t, 1);
    if (!sel || sel.side === side) return setSel({ side, ...item });
    if (sel.i === item.i) {
      sfx("ok");
      const next = [...done, item.i];
      setDone(next);
      setSel(null);
      if (next.length === step.pairs.length) setTimeout(onDone, 650);
    } else {
      sfx("bad");
      setBad([sel.i, item.i, side]);
      setSel(null);
      setTimeout(() => setBad(null), 500);
    }
  };
  const cls = (side, item) =>
    `ej-ficha ej-ficha--par ${done.includes(item.i) ? "is-pareja" : ""} ${sel && sel.side === side && sel.i === item.i ? "is-elegida" : ""} ${bad && ((side === bad[2] && bad[1] === item.i) || (side !== bad[2] && bad[0] === item.i)) ? "is-mal ej-tiembla" : ""}`;
  return (
    <div className="ej ej--match">
      <Cabecera tipo="match" es="Une las parejas" zh="连线配对" />
      <div className="ej-parejas-cuenta" aria-live="polite">
        {step.pairs.map((_, k) => (
          <i key={k} className={k < done.length ? "is-hecha" : ""} />
        ))}
        <span>
          {done.length}/{step.pairs.length}
        </span>
      </div>
      <div className="ej-parejas">
        <div className="ej-parejas__col">
          {left.map((x) => (
            <button key={x.i} style={{ "--i": x.i }} className={cls("a", x)} onClick={() => pick("a", x)}>
              {x.t}
            </button>
          ))}
        </div>
        <div className="ej-parejas__col">
          {right.map((x) => (
            <button key={x.i} style={{ "--i": x.i }} className={cls("b", x)} onClick={() => pick("b", x)} lang="zh">
              {x.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sello que cae sobre el pergamino al comprobar, con destello dorado (acierto) o salpicadura de tinta (fallo)
function SelloResultado({ ok }) {
  return (
    <aside className={`ej-resultado ${ok ? "es-bien" : "es-mal"}`} aria-hidden="true">
      <span className="ej-resultado__rayos" />
      <span className="ej-resultado__sello">
        <b lang="zh">
          {[...(ok ? "正确" : "再试")].map((c) => (
            <span key={c}>{c}</span>
          ))}
        </b>
        <small>{ok ? "¡Bien!" : "Otra vez"}</small>
      </span>
      {ok && (
        <span className="ej-resultado__chispas">
          {Array.from({ length: 10 }, (_, k) => (
            <i key={k} style={{ "--a": `${k * 36}deg`, "--d": `${(k % 3) * 40}ms` }} />
          ))}
        </span>
      )}
    </aside>
  );
}

function checkAnswer(step, value) {
  if (step.type === "choice" || step.type === "listen" || step.type === "pictures") return { ok: value === step.answer, solution: step.options[step.answer] };
  if (step.type === "tf") return { ok: value === step.answer, solution: step.answer ? "Verdadero" : "Falso" };
  if (step.type === "build") {
    const built = (value || []).map((i) => step.tiles[i]).join(" ");
    return { ok: norm(built) === norm(step.answer), solution: step.answer };
  }
  if (step.type === "type") {
    const options = String(step.answer).split(/\s*\/\s*/);
    const exact = options.some((a) => norm(a) === norm(value));
    const loose = options.some((a) => noAccents(a) === noAccents(value));
    return { ok: exact || loose, accent: !exact && loose, solution: step.answer };
  }
  return { ok: true };
}

/** Lección a pantalla completa. onClose(resultado|null) */
export function LessonPlayer({ lesson, onClose }) {
  const total = lesson.steps.length;
  const [queue, setQueue] = React.useState(() => lesson.steps.map((_, i) => i));
  const [pos, setPos] = React.useState(0);
  const [value, setValue] = React.useState(undefined);
  const [feedback, setFeedback] = React.useState(null);
  const [mistakes, setMistakes] = React.useState(0);
  // Racha de aciertos seguidos: solo se muestra (no cuenta para la puntuación)
  const [racha, setRacha] = React.useState(0);
  const [hearts, setHearts] = React.useState(() => getGame().hearts);
  const [result, setResult] = React.useState(null);
  const [retried] = React.useState(() => new Set());
  const [startedAt] = React.useState(Date.now());
  const step = lesson.steps[queue[pos]];

  React.useEffect(() => {
    // Con la página arriba, el menú lateral se ve entero junto a la lección; al cerrar se vuelve donde estaba
    const y = window.scrollY;
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    // Mientras la lección está abierta, la página de debajo deja de pintarse y de animarse (era la causa principal del lag)
    document.documentElement.classList.add("lp-abierta");
    return () => {
      document.documentElement.classList.remove("lp-abierta");
      document.body.style.overflow = "";
      window.scrollTo(0, y);
      speechSynthesis?.cancel?.();
    };
  }, []);

  const finish = React.useCallback(() => {
    const interactive = lesson.steps.filter((s) => !TEACH.has(s.type)).length;
    const accuracy = interactive ? Math.max(0, Math.round(((interactive - mistakes) / interactive) * 100)) : 100;
    const perfect = mistakes === 0;
    const xp = 10 + (perfect ? 5 : 0);
    const r = addXp(xp, { lessonId: lesson.id, score: accuracy, perfect });
    sfx("win");
    confetti();
    // ¿Con esta lección se completa la clase? (sus 5 lecciones hechas; la clase 1 usa los ids antiguos mN-lI)
    const partes = String(lesson.id).match(/^m(\d+)(?:-c(\d+))?-l\d+$/);
    const unit = partes?.[1];
    const clase = partes?.[2] || "1";
    const prefijo = clase === "1" ? `m${unit}-l` : `m${unit}-c${clase}-l`;
    const lessons = getGame().lessons || {};
    const unitDone = Boolean(unit) && [0, 1, 2, 3, 4].every((i) => lessons[`${prefijo}${i}`]);
    setResult({ xp, accuracy, perfect, unit, clase, unitDone, seconds: Math.round((Date.now() - startedAt) / 1000), ...r });
  }, [lesson, mistakes, startedAt]);

  // Pantallas con pergamino (palabra nueva, «di en voz alta» y todos los ejercicios sobre el paisaje)
  const conPergamino = !result && step && !["dialog", "tip"].includes(step.type);
  const [cerrando, setCerrando] = React.useState(false);
  const cierre = React.useRef(null);
  React.useEffect(() => () => clearTimeout(cierre.current), []);
  const avanzar = () => {
    setCerrando(false);
    setFeedback(null);
    setValue(undefined);
    if (pos + 1 >= queue.length) finish();
    else setPos((p) => p + 1);
  };
  // Antes de cambiar de pantalla el pergamino se enrolla (300 ms); sin animaciones se pasa directamente
  const next = () => {
    if (cerrando) return;
    const sinMovimiento = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!conPergamino || sinMovimiento) return avanzar();
    setCerrando(true);
    cierre.current = setTimeout(avanzar, 300);
  };

  const check = () => {
    const res = checkAnswer(step, value);
    // Progreso por destreza y cuaderno de errores
    const skill = step.type === "listen" ? "audicion" : ["build", "type"].includes(step.type) ? "gramatica" : step.type === "tf" ? "lectura" : "vocabulario";
    const given = Array.isArray(value) ? value.join(" ") : step.options ? step.options[value] : String(value ?? "");
    recordAnswer({ skill, level: levelOf(lesson.modulo), ok: res.ok, src: `lección ${lesson.modulo}`, error: { prompt: step.prompt || step.speak, given, correct: res.solution, explain: step.explain, options: step.options, answer: step.answer, speak: step.speak, type: step.type } });
    if (res.ok) {
      sfx("ok");
      setRacha((r) => r + 1);
    } else {
      sfx("bad");
      setRacha(0);
      setMistakes((m) => m + 1);
      setHearts(loseHeart());
      if (!retried.has(queue[pos])) {
        retried.add(queue[pos]);
        setQueue((q) => [...q, q[pos]]);
      }
    }
    setFeedback({ ...res, explain: step.explain });
  };

  // Tras comprobar, la opción correcta queda a la vista por encima del panel de corrección (en móvil lo tapaba)
  React.useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => document.querySelector(".lp-main .is-bien")?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 120);
    return () => clearTimeout(t);
  }, [feedback]);

  const canCheck = step && !TEACH.has(step.type) && step.type !== "match" && value !== undefined && value !== "" && !(Array.isArray(value) && !value.length);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Enter" || result) return;
      if (feedback || TEACH.has(step?.type)) next();
      else if (canCheck) check();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const progress = result ? 100 : Math.round((pos / queue.length) * 100);
  const outOfHearts = hearts <= 0 && !result && feedback && !feedback.ok;

  const body = result ? (
    <div className={`lp-center lp-end ${result.unitDone ? "unit-done" : ""}`}>
      <div className="lp-reward">
        <span className="lp-reward-rays" />
        <img className="lp-reward-mono" src={`./mono/${result.unitDone || result.perfect ? "trofeo" : "feliz"}.png`} alt="" />
        <span className="lp-reward-seal">{result.unitDone ? "单元" : result.perfect ? "满分" : "完成"}</span>
        {Array.from({ length: Math.min(6, Math.round(result.xp / 3)) }, (_, i) => (
          <i key={i} className="lp-coin" style={{ "--i": i }} />
        ))}
      </div>
      <h2 className="lp-word" style={{ fontSize: 34 }}>
        {result.unitDone ? `¡Clase ${result.clase} de la unidad ${result.unit} completada! · 第${result.clase}课完成` : result.perfect ? "¡Lección perfecta!" : "¡Lección completada!"}
      </h2>
      <div className="lp-zh-big">{result.unitDone ? "单元完成！获得印章" : result.perfect ? "满分完成！" : "课程完成！"}</div>
      <div className="lp-stats lp-scroll-stats">
        <div className="lp-stat xp">
          <small>XP</small>
          <b>
            <ZapIcon size={18} /> +{result.xp}
          </b>
        </div>
        <div className="lp-stat ok">
          <small>Precisión · 正确率</small>
          <b>
            <TargetIcon size={18} /> {result.accuracy}%
          </b>
        </div>
        <div className="lp-stat time">
          <small>Tiempo · 用时</small>
          <b>
            <ClockIcon size={18} /> {Math.floor(result.seconds / 60)}:{String(result.seconds % 60).padStart(2, "0")}
          </b>
        </div>
      </div>
      {result.levelUp && <div className="ui-chip is-on" style={{ fontSize: 15 }}><ZapIcon size={16} /> ¡Subes de nivel! · 升级了！</div>}
      {result.goalReached && <div className="ui-chip ok" style={{ fontSize: 15 }}><TargetIcon size={16} /> ¡Meta diaria cumplida! · 完成今日目标</div>}
      {result.newBadges?.map((b) => (
        <div key={b.id} className="ui-chip warn" style={{ fontSize: 15 }}>
          <Emoji3D emoji={b.emoji} size={22} /> Logro: {b.es} · {b.zh}
        </div>
      ))}
    </div>
  ) : outOfHearts ? (
    <div className="lp-center">
      <img className="ej-sin-vidas" src="./mono/serio.png" alt="" />
      <h2 className="lp-word" style={{ fontSize: 30 }}>Te has quedado sin vidas</h2>
      <div className="lp-zh-big">生命值用完了</div>
      <p className="ui-muted" style={{ textAlign: "center", maxWidth: 420 }}>
        Las vidas se recargan solas (una cada 30 min). También puedes repetir la lección desde el principio con las vidas llenas.
      </p>
    </div>
  ) : step.type === "learn" ? (
    <Learn step={step} level={levelOf(lesson.modulo)} onNext={next} />
  ) : step.type === "speak" ? (
    <Hablar step={step} level={levelOf(lesson.modulo)} onNext={next} />
  ) : step.type === "tip" ? (
    <Tip step={step} level={levelOf(lesson.modulo)} />
  ) : step.type === "dialog" ? (
    <Dialog step={step} level={levelOf(lesson.modulo)} emoji={lesson.emoji} />
  ) : step.type === "tf" ? (
    <TrueFalse step={step} value={value} onChange={setValue} locked={!!feedback} />
  ) : step.type === "build" ? (
    <Build key={queue[pos] + "-" + pos} step={step} value={value} onChange={setValue} locked={!!feedback} />
  ) : step.type === "type" ? (
    <TypeIt key={pos} step={step} value={value} onChange={setValue} locked={!!feedback} onEnter={() => canCheck && check()} />
  ) : step.type === "pictures" ? (
    <Pictures key={pos} step={step} value={value} onChange={setValue} locked={!!feedback} />
  ) : step.type === "match" ? (
    <Match key={pos} step={step} onDone={next} />
  ) : (
    <Choice key={pos} step={step} value={value} onChange={setValue} locked={!!feedback} />
  );

  return createPortal(
    <div className={`lp-root ${!result && ["dialog", "tip"].includes(step?.type) ? "lp-fondo-pergamino" : "lp-fondo-paisaje"} lp-paso-${result ? "fin" : step?.type} ${cerrando ? "pg-cierra" : ""}`} role="dialog" aria-modal="true" aria-label={lesson.es}>
      {!(!result && ["dialog", "tip"].includes(step?.type)) && <FondoCielo />}
      <header className="lp-top">
        <button className="lp-close" onClick={() => onClose(null)} aria-label="Salir">
          <XIcon size={22} />
        </button>
        <div className="lp-bar-wrap">
          <div className="lp-bar">
            <i style={{ width: `${progress}%` }} />
          </div>
          <MonoNube pose={result ? "trofeo" : "poder"} tamano={54} className="lp-bar-mono" style={{ left: `${progress}%` }} />
        </div>
        {racha >= 2 && !result && (
          <div className="ej-racha" key={racha} title="Aciertos seguidos · 连续答对">
            <IcoRacha size={20} />
            <b>×{racha}</b>
            <span lang="zh">连对</span>
          </div>
        )}
        <div className="lp-hearts">
          <HeartIcon size={20} fill="currentColor" /> {hearts}
        </div>
      </header>
      <main className={`lp-main ${feedback && !result ? (feedback.ok ? "ej-acierto" : "ej-fallo") : ""}`} key={result ? "end" : `${pos}-${queue[pos]}`}>
        {conPergamino && !["learn", "speak"].includes(step.type) ? <Pergamino>{body}</Pergamino> : body}
        {feedback && !result && !outOfHearts && <SelloResultado ok={feedback.ok} />}
      </main>
      <footer className={`lp-foot ${feedback ? (feedback.ok ? "ok" : "bad") : ""}`}>
        <div className="lp-foot-inner">
          {feedback && !result && !outOfHearts && (
            <div className="lp-feedback">
              <img className="lp-mono" src={`./mono/${feedback.ok ? (pos % 2 ? "guino" : "feliz") : "serio"}.png`} alt="" />
              <div>
                <b>{feedback.ok ? (feedback.accent ? "¡Bien! Ojo con la tilde · 注意重音" : "¡Correcto! · 正确！") : "Solución correcta · 正确答案"}</b>
                {(!feedback.ok || feedback.accent) && (
                  <div className="lp-solution">
                    <small>Respuesta · 答案</small>
                    {feedback.solution}
                  </div>
                )}
                {feedback.explain && (
                  <div className="lp-explain">
                    <IconoTipo tipo="tip" size={20} />
                    <span>{feedback.explain}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          {result ? (
            <button className="lp-btn" onClick={() => onClose(result)}>
              Continuar · 继续
            </button>
          ) : outOfHearts ? (
            <div className="ui-row" style={{ width: "100%", justifyContent: "flex-end" }}>
              <button className="lp-btn ghost" onClick={() => onClose(null)}>
                Salir
              </button>
              <button
                className="lp-btn"
                onClick={() => {
                  refillHearts();
                  setHearts(getGame().hearts);
                  setQueue(lesson.steps.map((_, i) => i));
                  setPos(0);
                  setMistakes(0);
                  setFeedback(null);
                  setValue(undefined);
                }}
              >
                Repetir con vidas llenas
              </button>
            </div>
          ) : feedback || TEACH.has(step.type) ? (
            <button className={`lp-btn ${feedback && !feedback.ok ? "bad" : ""}`} onClick={next}>
              {step.type === "speak" && !feedback ? "Saltar · 跳过" : TEACH.has(step.type) && !feedback ? "Entendido · 明白了" : "Continuar · 继续"}
            </button>
          ) : step.type === "match" ? (
            <button className="lp-btn ghost" onClick={next}>
              Saltar · 跳过
            </button>
          ) : (
            <button className="lp-btn" disabled={!canCheck} onClick={check}>
              <CheckIcon size={20} /> Comprobar · 检查
            </button>
          )}
        </div>
      </footer>
    </div>,
    document.body,
  );
}
