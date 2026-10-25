import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon, HeartIcon, Volume2Icon, SnailIcon, CheckIcon, ZapIcon, TargetIcon, ClockIcon } from "lucide-react";
import { Emoji3D } from "../ui/Emoji3D.jsx";
import { sfx, speak, confetti } from "./fx.js";
import { addXp, loseHeart, refillHearts, getGame } from "../../lib/gamification.js";
import { CAST } from "./StoryPlayer.jsx";

const TEACH = new Set(["learn", "tip", "dialog"]);
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

function Learn({ step }) {
  React.useEffect(() => {
    const t = setTimeout(() => speak(step.es), 350);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <div className="lp-center">
      <div className="lp-eyebrow">Palabra nueva · 新词</div>
      <Emoji3D emoji={step.emoji} size={96} float />
      <div className="lp-word">{step.es}</div>
      <div className="lp-zh-big">{step.zh}</div>
      <SpeakButtons text={step.es} big />
      {step.example && <div className="lp-example">{step.example}</div>}
    </div>
  );
}

function Tip({ step }) {
  return (
    <div className="lp-tip">
      <div className="lp-eyebrow">💡 Idea clave · 要点</div>
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
          <div>
            <div style={{ fontWeight: 800 }}>{e.espanol}</div>
            <div className="lp-zh">{e.chino}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Dialog({ step }) {
  return (
    <div className="lp-tip">
      <div className="lp-eyebrow">💬 Diálogo · 对话</div>
      <h2 className="lp-title">{step.title}</h2>
      <div className="lp-zh">{step.titleZh}</div>
      <div className="lp-chat">
        {step.lines.map((l, i) => (
          <div key={i} className={`lp-bubble ${i % 2 ? "right" : ""}`} style={{ animationDelay: `${i * 160}ms` }}>
            <small>{l.who}</small>
            <div className="ui-row" style={{ gap: 8, flexWrap: "nowrap", alignItems: "flex-start" }}>
              <SpeakButtons text={l.es} />
              <div>
                <div style={{ fontWeight: 700 }}>{l.es}</div>
                <div className="lp-zh">{l.zh}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Choice({ step, value, onChange, locked }) {
  React.useEffect(() => {
    if (step.type === "listen" || step.speak) {
      const t = setTimeout(() => speak(step.speak), 300);
      return () => clearTimeout(t);
    }
  }, [step]);
  return (
    <div>
      <div className="lp-eyebrow">{step.type === "listen" ? "🎧 Escucha · 听" : "Elige la respuesta · 选择"}</div>
      <h2 className="lp-title">{step.prompt}</h2>
      {step.promptZh && <div className="lp-zh">{step.promptZh}</div>}
      {step.speak && (
        <div style={{ margin: "14px 0" }}>
          <SpeakButtons text={step.speak} big={step.type === "listen"} />
        </div>
      )}
      <div className="lp-options">
        {step.options.map((o, i) => (
          <button
            key={i}
            disabled={locked}
            className={`lp-option ${value === i ? "picked" : ""} ${locked && i === step.answer ? "right" : ""} ${locked && value === i && i !== step.answer ? "wrong" : ""}`}
            onClick={() => {
              sfx("tap");
              onChange(i);
            }}
          >
            <span className="lp-key">{i + 1}</span>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function TrueFalse({ step, value, onChange, locked }) {
  return (
    <div>
      <div className="lp-eyebrow">¿Verdadero o falso? · 对还是错？</div>
      <h2 className="lp-title">{step.prompt}</h2>
      {step.promptZh && <div className="lp-zh">{step.promptZh}</div>}
      <div className="lp-options two">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            disabled={locked}
            className={`lp-option big ${value === v ? "picked" : ""} ${locked && v === step.answer ? "right" : ""} ${locked && value === v && v !== step.answer ? "wrong" : ""}`}
            onClick={() => {
              sfx("tap");
              onChange(v);
            }}
          >
            <Emoji3D emoji={v ? "✅" : "❌"} size={40} />
            {v ? "Verdadero · 对" : "Falso · 错"}
          </button>
        ))}
      </div>
    </div>
  );
}

function Character({ who, text, speakText }) {
  const c = CAST[who] || CAST.lucia;
  return (
    <div className="lp-char">
      <Emoji3D emoji={c.emoji} size={86} float />
      <div className="lp-char-bubble">
        {speakText && (
          <button className="lp-speak" style={{ width: 36, height: 36, borderRadius: 11 }} onClick={() => speak(speakText)} aria-label="Escuchar">
            <Volume2Icon size={16} />
          </button>
        )}
        {text}
      </div>
    </div>
  );
}

function Pictures({ step, value, onChange, locked }) {
  return (
    <div>
      <div className="lp-eyebrow">✨ Palabra nueva · 新词</div>
      <h2 className="lp-title">{step.prompt}</h2>
      <div className="lp-zh">{step.promptZh}</div>
      <div className="lp-pics">
        {step.options.map((o, i) => (
          <button
            key={i}
            disabled={locked}
            className={`lp-pic ${value === i ? "picked" : ""} ${locked && i === step.answer ? "right" : ""} ${locked && value === i && i !== step.answer ? "wrong" : ""}`}
            onClick={() => {
              sfx("tap");
              speak(o, 1);
              onChange(i);
            }}
          >
            <span className="art">
              <Emoji3D emoji={step.pics[i]} size={84} />
            </span>
            <span className="cap">
              {o}
              <span className="lp-key">{i + 1}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Build({ step, value = [], onChange, locked }) {
  const used = new Set(value);
  return (
    <div>
      <h2 className="lp-title">Traduce esta frase · 翻译</h2>
      <Character who={step.character} text={step.prompt} />
      <div className="lp-answer-line">
        {value.map((ti) => (
          <button key={ti} className="lp-tile" disabled={locked} onClick={() => onChange(value.filter((x) => x !== ti))}>
            {step.tiles[ti]}
          </button>
        ))}
      </div>
      <div className="lp-tiles">
        {step.tiles.map((t, i) => (
          <button
            key={i}
            className={`lp-tile ${used.has(i) ? "ghost" : ""}`}
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

function TypeIt({ step, value = "", onChange, locked, onEnter }) {
  return (
    <div>
      <h2 className="lp-title">Escribe en español · 用西语写</h2>
      {step.character ? <Character who={step.character} text={step.prompt} /> : <div className="lp-title" style={{ fontSize: 19 }}>{step.prompt}</div>}
      {step.promptZh && <div className="lp-zh">{step.promptZh}</div>}
      <input
        className="lp-input"
        autoFocus
        value={value}
        disabled={locked}
        placeholder={step.hint || "Escribe aquí · 在这里输入"}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        autoCapitalize="off"
        autoComplete="off"
        spellCheck={false}
      />
      <div className="lp-kbd" aria-label="Teclado español">
        {["áéíóúüñ¿¡", "qwertyuiop", "asdfghjklñ", "zxcvbnm"].map((row) => (
          <div key={row} className="lp-kbd-row">
            {[...new Set(row)].map((c) => (
              <button key={c} className={`lp-key-btn ${"áéíóúüñ¿¡".includes(c) ? "acc" : ""}`} disabled={locked} onClick={() => onChange(value + c)}>
                {c}
              </button>
            ))}
          </div>
        ))}
        <div className="lp-kbd-row">
          <button className="lp-key-btn wide" disabled={locked} onClick={() => onChange(value + " ")}>
            espacio · 空格
          </button>
          <button className="lp-key-btn" disabled={locked} onClick={() => onChange(value.slice(0, -1))} aria-label="Borrar">
            ⌫
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
      if (next.length === step.pairs.length) setTimeout(onDone, 350);
    } else {
      sfx("bad");
      setBad([sel.i, item.i, side]);
      setSel(null);
      setTimeout(() => setBad(null), 500);
    }
  };
  const cls = (side, item) =>
    `lp-option ${done.includes(item.i) ? "matched" : ""} ${sel && sel.side === side && sel.i === item.i ? "picked" : ""} ${bad && ((side === bad[2] && bad[1] === item.i) || (side !== bad[2] && bad[0] === item.i)) ? "wrong shake" : ""}`;
  return (
    <div>
      <div className="lp-eyebrow">Toca las parejas · 点击配对</div>
      <h2 className="lp-title">{step.prompt}</h2>
      <div className="lp-match">
        <div className="lp-options">
          {left.map((x) => (
            <button key={x.i} className={cls("a", x)} onClick={() => pick("a", x)}>
              {x.t}
            </button>
          ))}
        </div>
        <div className="lp-options">
          {right.map((x) => (
            <button key={x.i} className={cls("b", x)} onClick={() => pick("b", x)}>
              {x.t}
            </button>
          ))}
        </div>
      </div>
    </div>
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
  const [hearts, setHearts] = React.useState(() => getGame().hearts);
  const [result, setResult] = React.useState(null);
  const [retried] = React.useState(() => new Set());
  const [startedAt] = React.useState(Date.now());
  const step = lesson.steps[queue[pos]];

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
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
    // ¿Con esta lección se completa la unidad entera? (las 5 lecciones hechas)
    const unit = String(lesson.id).match(/^m(\d+)-l\d+$/)?.[1];
    const lessons = getGame().lessons || {};
    const unitDone = Boolean(unit) && [0, 1, 2, 3, 4].every((i) => lessons[`m${unit}-l${i}`]);
    setResult({ xp, accuracy, perfect, unit, unitDone, seconds: Math.round((Date.now() - startedAt) / 1000), ...r });
  }, [lesson, mistakes, startedAt]);

  const next = () => {
    setFeedback(null);
    setValue(undefined);
    if (pos + 1 >= queue.length) finish();
    else setPos((p) => p + 1);
  };

  const check = () => {
    const res = checkAnswer(step, value);
    if (res.ok) sfx("ok");
    else {
      sfx("bad");
      setMistakes((m) => m + 1);
      setHearts(loseHeart());
      if (!retried.has(queue[pos])) {
        retried.add(queue[pos]);
        setQueue((q) => [...q, q[pos]]);
      }
    }
    setFeedback({ ...res, explain: step.explain });
  };

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
        {result.unitDone ? `¡Unidad ${result.unit} completada!` : result.perfect ? "¡Lección perfecta!" : "¡Lección completada!"}
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
      {result.levelUp && <div className="ui-chip is-on" style={{ fontSize: 15 }}>⬆️ ¡Subes de nivel! · 升级了！</div>}
      {result.goalReached && <div className="ui-chip ok" style={{ fontSize: 15 }}>🎯 ¡Meta diaria cumplida! · 完成今日目标</div>}
      {result.newBadges?.map((b) => (
        <div key={b.id} className="ui-chip warn" style={{ fontSize: 15 }}>
          <Emoji3D emoji={b.emoji} size={22} /> Logro: {b.es} · {b.zh}
        </div>
      ))}
    </div>
  ) : outOfHearts ? (
    <div className="lp-center">
      <Emoji3D emoji="💔" size={120} float />
      <h2 className="lp-word" style={{ fontSize: 30 }}>Te has quedado sin vidas</h2>
      <div className="lp-zh-big">生命值用完了</div>
      <p className="ui-muted" style={{ textAlign: "center", maxWidth: 420 }}>
        Las vidas se recargan solas (una cada 30 min). También puedes repetir la lección desde el principio con las vidas llenas.
      </p>
    </div>
  ) : step.type === "learn" ? (
    <Learn step={step} />
  ) : step.type === "tip" ? (
    <Tip step={step} />
  ) : step.type === "dialog" ? (
    <Dialog step={step} />
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
    <div className="lp-root" role="dialog" aria-modal="true" aria-label={lesson.es}>
      <header className="lp-top">
        <button className="lp-close" onClick={() => onClose(null)} aria-label="Salir">
          <XIcon size={22} />
        </button>
        <div className="lp-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="lp-hearts">
          <HeartIcon size={20} fill="currentColor" /> {hearts}
        </div>
      </header>
      <main className="lp-main" key={result ? "end" : `${pos}-${queue[pos]}`}>
        {body}
      </main>
      <footer className={`lp-foot ${feedback ? (feedback.ok ? "ok" : "bad") : ""}`}>
        <div className="lp-foot-inner">
          {feedback && !result && !outOfHearts && (
            <div className="lp-feedback">
              <img className="lp-mono" src={`./mono/${feedback.ok ? (pos % 2 ? "guino" : "feliz") : "serio"}.png`} alt="" />
              <div>
                <b>{feedback.ok ? (feedback.accent ? "¡Bien! Ojo con la tilde · 注意重音" : "¡Correcto! · 正确！") : "Solución correcta · 正确答案"}</b>
                {(!feedback.ok || feedback.accent) && <div className="lp-solution">{feedback.solution}</div>}
                {feedback.explain && <div className="lp-explain">{feedback.explain}</div>}
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
              {TEACH.has(step.type) && !feedback ? "Entendido · 明白了" : "Continuar · 继续"}
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
