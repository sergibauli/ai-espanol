import * as React from "react";
import { BookOpenIcon, GlobeIcon, AlertTriangleIcon, MessageSquareQuoteIcon, Volume2Icon, TargetIcon, TrophyIcon, CheckIcon, XIcon } from "lucide-react";
import { loadModulePlus } from "../../lib/examGenerator.js";

function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {}
}

function SpeakBtn({ text }) {
  return (
    <button className="ui-btn sm ghost" style={{ minHeight: 30, padding: "0 9px" }} onClick={() => speak(text)} aria-label="Escuchar">
      <Volume2Icon size={14} />
    </button>
  );
}

function Section({ icon: Icon, title, zh, color, children }) {
  return (
    <section className="ui-card" style={{ borderTop: `3px solid ${color}` }}>
      <div className="ui-row" style={{ marginBottom: 14 }}>
        <span className="ui-icon" style={{ color, background: `${color}1a`, borderColor: `${color}40` }}>
          <Icon size={20} />
        </span>
        <div>
          <h3 className="ui-h2" style={{ fontSize: 19 }}>{title}</h3>
          <div className="ui-zh">{zh}</div>
        </div>
      </div>
      {children}
    </section>
  );
}

function Reading({ lectura, showChinese }) {
  const [answers, setAnswers] = React.useState({});
  const [zh, setZh] = React.useState(false);
  const done = Object.keys(answers).length === lectura.preguntas.length;
  const ok = lectura.preguntas.filter((q, i) => answers[i] === q.correcta).length;
  return (
    <div className="ui-grid cols-2" style={{ alignItems: "start" }}>
      <div>
        <div className="ui-between" style={{ marginBottom: 8 }}>
          <div>
            <div className="ui-h3">{lectura.titulo}</div>
            <div className="ui-zh">{lectura.tituloZh}</div>
          </div>
          <div className="ui-row" style={{ gap: 4 }}>
            <SpeakBtn text={lectura.texto} />
            <button className="ui-chip" onClick={() => setZh((v) => !v)}>
              {zh ? "Español" : "中文"}
            </button>
          </div>
        </div>
        <div className="ui-reading">{zh || showChinese === "only" ? lectura.textoZh : lectura.texto}</div>
      </div>
      <div className="ui-stack">
        {lectura.preguntas.map((q, i) => (
          <div key={i} className="ui-stack" style={{ gap: 8 }}>
            <div style={{ fontWeight: 800 }}>
              {i + 1}. {q.pregunta}
              {showChinese && <div className="ui-zh" style={{ fontWeight: 500 }}>{q.preguntaZh}</div>}
            </div>
            {q.opciones.map((op, j) => {
              const picked = answers[i] === j;
              let cls = "ui-option";
              if (answers[i] !== undefined) {
                if (j === q.correcta) cls += " is-right";
                else if (picked) cls += " is-wrong";
              }
              return (
                <button key={j} className={cls} style={{ padding: "9px 12px", fontSize: 14 }} disabled={answers[i] !== undefined} onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}>
                  <span className="ui-letter">{"ABCD"[j]}</span> {op}
                </button>
              );
            })}
            {answers[i] !== undefined && <div className="ui-muted" style={{ fontSize: 13 }}>💡 {q.explicacionZh}</div>}
          </div>
        ))}
        {done && (
          <div className={`ui-chip ${ok === lectura.preguntas.length ? "ok" : "warn"}`} style={{ alignSelf: "flex-start", fontSize: 14 }}>
            <TrophyIcon size={14} /> {ok}/{lectura.preguntas.length} correctas
          </div>
        )}
      </div>
    </div>
  );
}

function Gaps({ huecos }) {
  const [vals, setVals] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const norm = (s) => String(s || "").trim().toLowerCase();
  return (
    <div className="ui-stack">
      {huecos.map((h, i) => {
        const [a, b] = h.frase.split("___");
        const right = norm(vals[i]) === norm(h.respuesta);
        return (
          <div key={i} style={{ fontSize: 16, lineHeight: 2 }}>
            {a}
            <input
              className="ui-input"
              value={vals[i] || ""}
              onChange={(e) => setVals((v) => ({ ...v, [i]: e.target.value }))}
              style={{ display: "inline-block", width: Math.max(90, h.respuesta.length * 13), minHeight: 34, padding: "4px 8px", margin: "0 6px", borderColor: checked ? (right ? "var(--ui-ok)" : "var(--ui-bad)") : undefined }}
              aria-label={`Hueco ${i + 1}`}
            />
            {b}
            {checked && !right && <span style={{ color: "var(--ui-ok)", fontWeight: 800, marginLeft: 8 }}>→ {h.respuesta}</span>}
            <div className="ui-zh" style={{ fontSize: 13, lineHeight: 1.4 }}>💡 {h.pistaZh}</div>
          </div>
        );
      })}
      <div className="ui-row">
        <button className="ui-btn primary sm" onClick={() => setChecked(true)}>
          Corregir · 检查
        </button>
        {checked && (
          <button
            className="ui-btn sm"
            onClick={() => {
              setVals({});
              setChecked(false);
            }}
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}

export default function ModuloDescubre({ numero, showChinese }) {
  const [plus, setPlus] = React.useState(undefined);
  React.useEffect(() => {
    setPlus(undefined);
    loadModulePlus(numero).then(setPlus);
  }, [numero]);

  if (plus === undefined) return <div className="ui-empty">Cargando…</div>;
  if (!plus) return <div className="ui-empty">Contenido extra próximamente.</div>;

  return (
    <div className="ui-stack" style={{ gap: 18, fontFamily: "var(--ui-font)", color: "var(--ui-text)" }}>
      {plus.objetivos?.length > 0 && (
        <Section icon={TargetIcon} title="Al terminar este módulo podrás…" zh="学完本模块，你将能够……" color="#34d399">
          <div className="ui-grid cols-2">
            {plus.objetivos.map((o, i) => (
              <div key={i} className="ui-row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }}>
                <CheckIcon size={18} style={{ color: "#34d399", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{o.es}</div>
                  <div className="ui-zh">{o.zh}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {plus.lectura && (
        <Section icon={BookOpenIcon} title="Lectura · comprensión" zh="阅读理解" color="#3dd6ff">
          <Reading lectura={plus.lectura} showChinese={showChinese} />
        </Section>
      )}

      {plus.errores?.length > 0 && (
        <Section icon={AlertTriangleIcon} title="Errores típicos de sinohablantes" zh="中国学生常见错误" color="#f87171">
          <div className="ui-grid cols-2">
            {plus.errores.map((e, i) => (
              <div key={i} className="ui-card" style={{ padding: 14, background: "rgba(255,255,255,0.025)" }}>
                <div className="ui-row" style={{ gap: 8, flexWrap: "nowrap" }}>
                  <XIcon size={16} style={{ color: "var(--ui-bad)", flexShrink: 0 }} />
                  <span style={{ textDecoration: "line-through", color: "#fca5a5" }}>{e.incorrecto}</span>
                </div>
                <div className="ui-row" style={{ gap: 8, marginTop: 6, flexWrap: "nowrap" }}>
                  <CheckIcon size={16} style={{ color: "var(--ui-ok)", flexShrink: 0 }} />
                  <b style={{ color: "#a7f3d0" }}>{e.correcto}</b>
                  <SpeakBtn text={e.correcto} />
                </div>
                <div className="ui-zh" style={{ marginTop: 8, lineHeight: 1.5 }}>{e.explicacionZh}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {plus.frases?.length > 0 && (
        <Section icon={MessageSquareQuoteIcon} title="Frases para la vida real" zh="实用句子" color="#fbbf24">
          <div className="ui-grid cols-2" style={{ gap: 10 }}>
            {plus.frases.map((f, i) => (
              <div key={i} className="ui-between" style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--ui-border)", flexWrap: "nowrap" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800 }}>{f.es}</div>
                  <div className="ui-zh">
                    {f.zh} {f.situacion && <span className="ui-chip" style={{ padding: "1px 7px", fontSize: 11, marginLeft: 4 }}>{f.situacion}</span>}
                  </div>
                </div>
                <SpeakBtn text={f.es} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <div className="ui-grid cols-2" style={{ alignItems: "start" }}>
        {plus.cultura && (
          <Section icon={GlobeIcon} title={plus.cultura.titulo} zh={plus.cultura.tituloZh} color="#c084fc">
            <p style={{ lineHeight: 1.7, margin: 0 }}>{plus.cultura.texto}</p>
            {showChinese && <p className="ui-zh" style={{ lineHeight: 1.7 }}>{plus.cultura.textoZh}</p>}
            {plus.cultura.comparacionChina && (
              <div className="ui-card" style={{ padding: 12, marginTop: 12, background: "rgba(255,61,139,0.08)", borderColor: "rgba(255,61,139,0.3)" }}>
                🇨🇳 {plus.cultura.comparacionChina}
              </div>
            )}
          </Section>
        )}
        {plus.pronunciacion && (
          <Section icon={Volume2Icon} title={`Pronunciación: ${plus.pronunciacion.foco}`} zh="发音重点" color="#ff7a1a">
            <p style={{ lineHeight: 1.6, marginTop: 0 }}>{plus.pronunciacion.consejoZh}</p>
            <div className="ui-row" style={{ gap: 8 }}>
              {plus.pronunciacion.palabras?.map((w) => (
                <button key={w} className="ui-chip" style={{ fontSize: 15, padding: "7px 13px" }} onClick={() => speak(w)}>
                  <Volume2Icon size={13} /> {w}
                </button>
              ))}
            </div>
          </Section>
        )}
      </div>

      {plus.huecos?.length > 0 && (
        <Section icon={TargetIcon} title="Completa las frases" zh="填空练习" color="#60a5fa">
          <Gaps huecos={plus.huecos} />
        </Section>
      )}

      {plus.reto && (
        <section className="ui-card is-hero">
          <div className="ui-eyebrow">
            <TrophyIcon size={14} /> Reto final · 最终挑战
          </div>
          <div className="ui-h2" style={{ marginTop: 8 }}>{plus.reto.es}</div>
          <div className="ui-zh" style={{ marginTop: 6 }}>{plus.reto.zh}</div>
        </section>
      )}
    </div>
  );
}
