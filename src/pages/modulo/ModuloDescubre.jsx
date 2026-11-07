import * as React from "react";
import { BookOpenIcon, GlobeIcon, AlertTriangleIcon, MessageSquareQuoteIcon, Volume2Icon, TargetIcon, TrophyIcon, CheckIcon, XIcon } from "lucide-react";
import { loadModulePlus } from "../../lib/examGenerator.js";
import { speak } from "../../components/lesson/fx.js";


function SpeakBtn({ text }) {
  return (
    <button type="button" className="un-lc-voz" onClick={() => speak(text)} aria-label="Escuchar · 听">
      <Volume2Icon size={16} />
    </button>
  );
}

function Section({ icon: Icon, title, zh, tono = "rojo", children }) {
  return (
    <section className={`un-lc-sec un-lc-sec--${tono}`}>
      <header className="un-lc-cab">
        <span className="un-lc-sello" aria-hidden="true">
          <Icon size={20} />
        </span>
        <div>
          <h3>{title}</h3>
          <div className="un-lc-zh">{zh}</div>
        </div>
      </header>
      {children}
    </section>
  );
}

function Reading({ lectura, showChinese }) {
  const [respuestas, setRespuestas] = React.useState({});
  const [verZh, setVerZh] = React.useState(false);
  const terminado = Object.keys(respuestas).length === lectura.preguntas.length;
  const aciertos = lectura.preguntas.filter((preg, idx) => respuestas[idx] === preg.correcta).length;
  const texto = verZh || showChinese === "only" ? lectura.textoZh : lectura.texto;
  return (
    <div className="un-lc-lectura">
      <article className="un-lc-rollo">
        <div className="un-lc-rollo-cab">
          <div>
            <h4>{lectura.titulo}</h4>
            <div className="un-lc-zh">{lectura.tituloZh}</div>
          </div>
          <div className="un-lc-acciones">
            <SpeakBtn text={lectura.texto} />
            <button type="button" className={`un-lc-chip ${verZh ? "on" : ""}`} aria-pressed={verZh} onClick={() => setVerZh((v) => !v)}>
              {verZh ? "Español" : "中文"}
            </button>
          </div>
        </div>
        <div className="un-lc-texto" lang={verZh ? "zh" : "es"}>
          {String(texto || "").split(/\n+/).filter(Boolean).map((parrafo, idx) => (
            <p key={idx}>{parrafo}</p>
          ))}
        </div>
      </article>
      <div className="un-lc-preguntas">
        {lectura.preguntas.map((preg, idx) => (
          <div key={idx} className="un-lc-preg">
            <div className="un-lc-preg-txt">
              <span className="un-lc-num">{idx + 1}</span>
              <div>
                {preg.pregunta}
                {showChinese && <div className="un-lc-zh">{preg.preguntaZh}</div>}
              </div>
            </div>
            {preg.opciones.map((opcion, j) => {
              const elegida = respuestas[idx] === j;
              let estado = "";
              if (respuestas[idx] !== undefined) {
                if (j === preg.correcta) estado = "bien";
                else if (elegida) estado = "mal";
              }
              return (
                <button key={j} type="button" className={`un-lc-op ${estado}`} disabled={respuestas[idx] !== undefined} onClick={() => setRespuestas((r) => ({ ...r, [idx]: j }))}>
                  <span className="un-lc-letra">{"ABCD"[j]}</span>
                  <span>{opcion}</span>
                  {estado === "bien" && <CheckIcon size={18} className="un-lc-marca" />}
                  {estado === "mal" && <XIcon size={18} className="un-lc-marca" />}
                </button>
              );
            })}
            {respuestas[idx] !== undefined && <div className="un-lc-pista">💡 {preg.explicacionZh}</div>}
          </div>
        ))}
        {terminado && (
          <div className={`un-lc-total ${aciertos === lectura.preguntas.length ? "ok" : ""}`}>
            <TrophyIcon size={16} /> {aciertos}/{lectura.preguntas.length} correctas · 答对
          </div>
        )}
      </div>
    </div>
  );
}

function Gaps({ huecos }) {
  const [valores, setValores] = React.useState({});
  const [corregido, setCorregido] = React.useState(false);
  const norm = (s) => String(s || "").trim().toLowerCase();
  return (
    <div className="un-lc-huecos">
      {huecos.map((hueco, idx) => {
        const [antes, despues] = hueco.frase.split("___");
        const bien = norm(valores[idx]) === norm(hueco.respuesta);
        return (
          <div key={idx} className="un-lc-hueco">
            <div className="un-lc-hueco-frase">
              <span className="un-lc-num">{idx + 1}</span>
              <span>
                {antes}
                <input
                  className={`un-lc-input ${corregido ? (bien ? "bien" : "mal") : ""}`}
                  value={valores[idx] || ""}
                  onChange={(e) => setValores((v) => ({ ...v, [idx]: e.target.value }))}
                  style={{ width: Math.max(96, hueco.respuesta.length * 13 + 24) }}
                  aria-label={`Hueco ${idx + 1}`}
                  autoCapitalize="off"
                  autoComplete="off"
                />
                {despues}
                {corregido && !bien && <b className="un-lc-sol">→ {hueco.respuesta}</b>}
              </span>
            </div>
            <div className="un-lc-pista">💡 {hueco.pistaZh}</div>
          </div>
        );
      })}
      <div className="un-lc-botones">
        <button type="button" className="un-lc-btn" onClick={() => setCorregido(true)}>
          Corregir · 检查
        </button>
        {corregido && (
          <button
            type="button"
            className="un-lc-btn ghost"
            onClick={() => {
              setValores({});
              setCorregido(false);
            }}
          >
            Reintentar · 再试一次
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

  if (plus === undefined) return <div className="ui-empty">Cargando… · 加载中…</div>;
  if (!plus) return <div className="ui-empty">Contenido extra próximamente. · 即将推出</div>;

  return (
    <div className="un-lc gm-no-adapt">
      {plus.objetivos?.length > 0 && (
        <Section icon={TargetIcon} title="Al terminar este módulo podrás…" zh="学完本模块，你将能够……" tono="jade">
          <ul className="un-lc-objetivos">
            {plus.objetivos.map((obj, idx) => (
              <li key={idx}>
                <CheckIcon size={18} className="un-lc-marca" />
                <div>
                  <b>{obj.es}</b>
                  <div className="un-lc-zh">{obj.zh}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {plus.lectura && (
        <Section icon={BookOpenIcon} title="Lectura · comprensión" zh="阅读理解">
          <Reading lectura={plus.lectura} showChinese={showChinese} />
        </Section>
      )}

      {plus.errores?.length > 0 && (
        <Section icon={AlertTriangleIcon} title="Errores típicos de sinohablantes" zh="中国学生常见错误">
          <div className="un-lc-errores">
            {plus.errores.map((err, idx) => (
              <div key={idx} className="un-lc-error">
                <div className="un-lc-mal">
                  <XIcon size={16} className="un-lc-marca" />
                  <s>{err.incorrecto}</s>
                </div>
                <div className="un-lc-bien">
                  <CheckIcon size={16} className="un-lc-marca" />
                  <b>{err.correcto}</b>
                  <SpeakBtn text={err.correcto} />
                </div>
                <div className="un-lc-expl">{err.explicacionZh}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {plus.frases?.length > 0 && (
        <Section icon={MessageSquareQuoteIcon} title="Frases para la vida real" zh="实用句子" tono="oro">
          <div className="un-lc-frases">
            {plus.frases.map((frase, idx) => (
              <div key={idx} className="un-lc-frase">
                <div>
                  <b>{frase.es}</b>
                  <div className="un-lc-zh">{frase.zh}</div>
                  {frase.situacion && <span className="un-lc-situ">{frase.situacion}</span>}
                </div>
                <SpeakBtn text={frase.es} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <div className="un-lc-dos">
        {plus.cultura && (
          <Section icon={GlobeIcon} title={plus.cultura.titulo} zh={plus.cultura.tituloZh} tono="jade">
            <p className="un-lc-parrafo">{plus.cultura.texto}</p>
            {showChinese && <p className="un-lc-parrafo un-lc-zh">{plus.cultura.textoZh}</p>}
            {plus.cultura.comparacionChina && (
              <div className="un-lc-china">
                <b>🇨🇳 China · 中国</b>
                {plus.cultura.comparacionChina}
              </div>
            )}
          </Section>
        )}
        {plus.pronunciacion && (
          <Section icon={Volume2Icon} title={`Pronunciación: ${plus.pronunciacion.foco}`} zh="发音重点" tono="oro">
            <p className="un-lc-parrafo">{plus.pronunciacion.consejoZh}</p>
            <div className="un-lc-palabras">
              {plus.pronunciacion.palabras?.map((palabra) => (
                <button key={palabra} type="button" className="un-lc-chip" onClick={() => speak(palabra)}>
                  <Volume2Icon size={14} /> {palabra}
                </button>
              ))}
            </div>
          </Section>
        )}
      </div>

      {plus.huecos?.length > 0 && (
        <Section icon={TargetIcon} title="Completa las frases" zh="填空练习">
          <Gaps huecos={plus.huecos} />
        </Section>
      )}

      {plus.reto && (
        <section className="un-lc-reto">
          <span className="un-lc-reto-sello" aria-hidden="true" translate="no">挑战</span>
          <div>
            <small>
              <TrophyIcon size={14} /> Reto final · 最终挑战
            </small>
            <b>{plus.reto.es}</b>
            <div className="un-lc-zh">{plus.reto.zh}</div>
          </div>
        </section>
      )}
    </div>
  );
}
