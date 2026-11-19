import * as React from "react";
import { Link } from "react-router";
import {
  ArrowLeftIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  FileDownIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
} from "lucide-react";
import "../../styles/sala-examen.css";

// Sala imperial de examen: piezas de interfaz comunes a las pruebas DELE (modelo oficial y práctica).
const BASE = import.meta.env.BASE_URL;
export const recurso = (ruta) => `${BASE}${ruta}`;

export const LETRAS = "ABCDEFGHIJ";
export const letra = (indice) => LETRAS[indice] ?? String(indice + 1);
export const etiquetaOpcion = (item, i) => (soloLetras(item.opciones) ? String(item.opciones[i]).trim() : letra(i));
const soloLetras = (opciones) => (opciones || []).length > 3 && (opciones || []).every((v) => /^[A-L]$/.test(String(v).trim()));

// Identidad de cada prueba: carácter, colores, pose del Rey Mono y consejo
export const PRUEBAS_SX = {
  1: { glifo: "读", es: "Lectura", zh: "阅读", titulo: "Comprensión de lectura", tituloZh: "阅读理解", c: "#1f6b45", mono: "serio", consejo: ["Lee primero las preguntas y luego el texto.", "先看题，再读文章。"] },
  2: { glifo: "听", es: "Auditiva", zh: "听力", titulo: "Comprensión auditiva", tituloZh: "听力理解", c: "#a3122a", mono: "guino", consejo: ["Lee las preguntas antes de escuchar.", "播放前先看题。"] },
  3: { glifo: "写", es: "Escrita", zh: "写作", titulo: "Expresión escrita", tituloZh: "书面表达", c: "#b07a12", mono: "poder", consejo: ["Cubre todos los puntos guía.", "要写到所有要点。"] },
  4: { glifo: "说", es: "Oral", zh: "口语", titulo: "Expresión oral", tituloZh: "口语表达", c: "#6b4423", mono: "saluda", consejo: ["Habla con calma y sin parar.", "从容地连续说下去。"] },
  claves: { glifo: "评", es: "Nota", zh: "成绩", titulo: "Nota y claves", tituloZh: "成绩与答案", c: "#16656e", mono: "trofeo", consejo: ["¡Mira cuánto has avanzado!", "看看你的进步！"] },
};

export const reducirMovimiento = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function Esquinas() {
  return (
    <>
      <i className="sx-esq tl" aria-hidden="true" />
      <i className="sx-esq tr" aria-hidden="true" />
      <i className="sx-esq bl" aria-hidden="true" />
      <i className="sx-esq br" aria-hidden="true" />
    </>
  );
}

export const formatoReloj = (segundos) => {
  const s = Math.max(0, Math.round(segundos || 0));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

/** Temporizador en forma de varilla de incienso que se consume */
export function Incienso({ restantes, total, enMarcha, onToggle, onReset, etiqueta = "Quedan · 剩余" }) {
  if (!total) return null;
  const frac = Math.max(0, Math.min(1, restantes / total));
  const estado = restantes <= 0 ? "fin" : restantes <= 300 ? "aviso" : "";
  return (
    <div className={`sx-incienso ${estado} ${enMarcha && restantes > 0 ? "" : "parado"}`} role="timer" aria-label={`Tiempo restante · 剩余时间 ${formatoReloj(restantes)}`}>
      <div className="sx-palito" aria-hidden="true">
        <div className="vara" />
        <div className="ceniza" style={{ width: `${(1 - frac) * 100}%` }} />
        <div className="brasa" style={{ left: `${frac * 100}%` }} />
        <div className="humo" style={{ left: `${frac * 100}%` }} />
        <div className="humo" style={{ left: `${frac * 100}%` }} />
      </div>
      <div className="sx-reloj">
        <small>{restantes <= 0 ? "Tiempo · 时间到" : etiqueta}</small>
        {formatoReloj(restantes)}
      </div>
      {onToggle && (
        <button type="button" onClick={onToggle} aria-label={enMarcha ? "Pausar · 暂停" : "Reanudar · 继续"} title={enMarcha ? "Pausar · 暂停" : "Reanudar · 继续"}>
          {enMarcha ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
        </button>
      )}
      {onReset && (
        <button type="button" onClick={onReset} aria-label="Reiniciar la cuenta · 重置计时" title="Reiniciar la cuenta · 重置计时">
          <RotateCcwIcon size={15} />
        </button>
      )}
    </div>
  );
}

/** Cabecera cinematográfica de la prueba */
export function SalaHero({ prueba, codigo, subtitulo, volverA, modo, onModo, incienso, onPdf, chips = [] }) {
  const cfg = PRUEBAS_SX[prueba] || PRUEBAS_SX[1];
  return (
    <section className="sx-hero gm-no-adapt" style={{ "--sx-c": cfg.c }} aria-label={`${cfg.titulo} · ${cfg.tituloZh}`}>
      <div className="sx-hero-bg" aria-hidden="true" />
      <div className="sx-hero-tinte" aria-hidden="true" />
      <img className="sx-nube" src={recurso("theme/nube-oro.png")} alt="" aria-hidden="true" style={{ left: "38%", top: 34 }} />
      <img className="sx-nube" src={recurso("theme/nube-oro.png")} alt="" aria-hidden="true" style={{ left: "56%", bottom: 70, width: 110, animationDelay: "-8s" }} />
      <img className="sx-hero-dragon" src={recurso("theme/dragon-luz.webp")} alt="" aria-hidden="true" />
      <img className="sx-hero-mono" src={recurso(`mono/${cfg.mono}.webp`)} alt="" aria-hidden="true" />
      <div className="sx-bocadillo" aria-hidden="true">
        {cfg.consejo[0]}
        <span className="sx-zh" lang="zh-CN">{cfg.consejo[1]}</span>
      </div>
      <Esquinas />
      <div className="sx-topline">
        <Link to={volverA} className="sx-volver" aria-label="Volver a los modelos · 返回试卷列表" title="Volver · 返回">
          <ArrowLeftIcon size={18} />
        </Link>
        <span className="sx-codigo">
          <b>{codigo}</b>
          {subtitulo && (
            <span className="sub">
              <br />
              {subtitulo}
            </span>
          )}
        </span>
        <span className="sx-hueco" />
        {onModo && (
          <div className="sx-modo" role="radiogroup" aria-label="Modo · 模式">
            <button type="button" role="radio" aria-checked={modo === "practica"} onClick={() => onModo("practica")} title="Corrección inmediata de cada pregunta · 每题即时批改">
              <CheckIcon size={15} /> Práctica <span className="sx-zh" lang="zh-CN">练习</span>
            </button>
            <button type="button" role="radio" aria-checked={modo === "examen"} onClick={() => onModo("examen")} title="Con tiempo y corrección al entregar · 计时，交卷后批改">
              <ClockIcon size={15} /> Examen <span className="sx-zh" lang="zh-CN">模考</span>
            </button>
          </div>
        )}
        {incienso}
        {onPdf && (
          <button type="button" className="sx-btn-cristal" onClick={onPdf} title="Imprimir / PDF · 打印 / PDF">
            <FileDownIcon size={17} />
            <span className="t">
              PDF · <span lang="zh-CN">打印</span>
            </span>
          </button>
        )}
      </div>
      <div className="sx-titular">
        <span className="sx-glifo" aria-hidden="true" translate="no">
          {cfg.glifo}
        </span>
        <div>
          <h1>
            {cfg.titulo}
            <span className="sx-zh" lang="zh-CN">
              {cfg.tituloZh}
            </span>
          </h1>
          {chips.length > 0 && (
            <div className="sx-chips">
              {chips.filter(Boolean).map((chip, indice) => (
                <span key={indice} className="sx-chip">
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Anillo({ progreso }) {
  const r = 50;
  const L = 2 * Math.PI * r;
  return (
    <svg className="anillo" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#0005" strokeWidth="5" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="#f2c14e" strokeWidth="5" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - Math.max(0, Math.min(1, progreso || 0)))} />
    </svg>
  );
}

/** Medallones de las pruebas (pestañas) */
export function Medallones({ items, activa, onSelect }) {
  return (
    <nav className="sx-medallas gm-no-adapt" role="tablist" aria-label="Pruebas del examen · 考试科目">
      {items.map((m) => {
        const cfg = PRUEBAS_SX[m.id] || PRUEBAS_SX[1];
        return (
          <button key={m.id} type="button" role="tab" aria-selected={activa === m.id} className="sx-med" style={{ "--sx-c": cfg.c }} onClick={() => onSelect(m.id)}>
            <span className="disco">
              <Anillo progreso={m.progreso} />
              <span translate="no">{cfg.glifo}</span>
              {m.hecho && <i className="hecho">✓</i>}
            </span>
            <b>
              {cfg.es}
              <small lang="zh-CN">
                {cfg.zh}
                {m.min ? ` · ${m.min}′` : ""}
              </small>
            </b>
          </button>
        );
      })}
    </nav>
  );
}

/** Pestañas de tareas dentro de una prueba */
export function TareasTabs({ tareas, activa, onSelect }) {
  if (!tareas || tareas.length < 2) return null;
  return (
    <div className="sx-tareas" role="tablist" aria-label="Tareas · 任务">
      {tareas.map((t, indice) => (
        <button key={t.id} type="button" role="tab" aria-selected={activa === indice} className={`sx-tab ${t.ok ? "ok" : ""}`} onClick={() => onSelect(indice)} title={t.titulo}>
          <i>{t.ok ? "✓" : indice + 1}</i>
          <span className="tt">
            Tarea {indice + 1} <span lang="zh-CN">任务{indice + 1}</span>
          </span>
          {t.titulo && <small>{t.titulo}</small>}
        </button>
      ))}
    </div>
  );
}

export function Instrucciones({ sello, texto, zh }) {
  if (!texto && !zh) return null;
  return (
    <div className="sx-instr">
      <span className="sx-sello" aria-hidden="true" translate="no">
        {sello}
      </span>
      <p>
        {texto}
        {zh && (
          <span className="sx-zh" lang="zh-CN">
            {zh}
          </span>
        )}
      </p>
    </div>
  );
}

/** Tablero de jade: mapa de preguntas con su estado */
export function TableroJade({ grupos, actual, onIr, modoExamen, titulo = "Tablero de preguntas" }) {
  const todos = grupos.flatMap((g) => g.items);
  const n = todos.length || 1;
  const cuenta = (e) => todos.filter((it) => it.estado === e).length;
  const ok = cuenta("ok");
  const ko = cuenta("ko");
  const r = cuenta("r");
  return (
    <div className="sx-mapa gm-no-adapt">
      <div className="sx-mapa-cab">
        <span>
          {titulo} · <span className="sx-zh" lang="zh-CN">题目导航</span>
        </span>
        <b>
          {ok + ko + r}/{todos.length}
        </b>
      </div>
      {grupos.map((g) => (
        <div key={g.titulo} className="sx-mapa-grupo">
          {grupos.length > 1 && <span>{g.titulo}</span>}
          <div className="sx-dots">
            {g.items.map((it) => (
              <button
                key={it.key}
                type="button"
                className={`sx-dot ${it.estado || ""} ${actual === it.key ? "cur" : ""}`}
                onClick={() => onIr(it.key)}
                aria-label={`Pregunta ${it.num}: ${{ ok: "correcta", ko: "fallada", r: "respondida" }[it.estado] || "sin responder"}`}
              >
                {it.num}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="sx-barrita" aria-hidden="true">
        <span style={{ width: `${(ok / n) * 100}%`, background: "#4fd07f" }} />
        <span style={{ width: `${(ko / n) * 100}%`, background: "#ff6a5a" }} />
        <span style={{ width: `${(r / n) * 100}%`, background: "#f2c14e" }} />
      </div>
      <div className="sx-leyenda">
        <span>
          <i style={{ background: "#b7cdb3" }} />
          Sin responder <span lang="zh-CN">未答</span>
        </span>
        <span>
          <i style={{ background: "#f2c14e" }} />
          Respondida <span lang="zh-CN">已答</span>
        </span>
        {!modoExamen && (
          <>
            <span>
              <i style={{ background: "#2e9e58" }} />
              Correcta <span lang="zh-CN">正确</span>
            </span>
            <span>
              <i style={{ background: "#d02a20" }} />
              Fallada <span lang="zh-CN">错误</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/** Explicación en chino a partir de plantilla (las justificaciones de los modelos solo están en español) */
export function explicacionZh(item, valor) {
  const L = etiquetaOpcion(item, item.correcta);
  const respuesta = item.opciones?.[item.correcta];
  const conTexto = respuesta && String(respuesta).trim() !== L ? `「${String(respuesta).trim()}」` : "";
  const apoyo = item.fraseSoporte ? "依据见下方原文句子。" : "";
  if (valor === undefined || valor === null) return `未作答。正确答案是 ${L}${conTexto}。${apoyo}`;
  if (valor === item.correcta) return `回答正确！答案是 ${L}${conTexto}。${apoyo}`;
  return `你选了 ${etiquetaOpcion(item, valor)}，正确答案是 ${L}${conTexto}。${apoyo}`;
}

function Chispas() {
  return (
    <span className="sx-chispas" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const d = 30 + (i % 3) * 14;
        return <i key={i} style={{ left: Math.cos(a) * d, top: Math.sin(a) * d, animationDelay: `${(i % 4) * 0.05}s` }} />;
      })}
    </span>
  );
}
function ManchaTinta() {
  return (
    <svg className="sx-tinta" viewBox="0 0 100 100" aria-hidden="true">
      <path fill="#3b2416" opacity=".16" d="M52 8c9 3 7 15 16 18s20-4 23 6-9 14-6 23 14 15 6 23-17-2-25 4-6 18-17 17-8-14-17-17-21 4-24-6 9-14 6-23S-1 37 7 30s17 3 25-3S43 5 52 8z" />
      <circle cx="12" cy="80" r="4" fill="#3b2416" opacity=".18" />
      <circle cx="90" cy="14" r="3" fill="#3b2416" opacity=".18" />
    </svg>
  );
}

/**
 * Pregunta de opción múltiple con corrección individual.
 * revelada: se muestra la corrección (por «Comprobar», por corregir la prueba o por ver las claves).
 */
export function PreguntaSX({ id, item, valor, onSelect, revelada, modoExamen, onComprobar, onReintentar, onVerTexto, actual, onFoco }) {
  const [verFrase, setVerFrase] = React.useState(false);
  const letras = soloLetras(item.opciones);
  // En las tareas de relacionar, las letras se muestran en orden alfabético (el valor sigue siendo el índice original)
  const orden = item.opciones.map((_x, i) => i);
  if (letras) orden.sort((x, y) => String(item.opciones[x]).trim().localeCompare(String(item.opciones[y]).trim()));
  const respondida = valor !== undefined && valor !== null;
  const acierto = revelada && valor === item.correcta;
  const fallo = revelada && respondida && valor !== item.correcta;
  const sinResponder = revelada && !respondida;
  const ref = React.useRef(null);
  const teclas = (e) => {
    if (e.target.closest("button[data-accion]")) return;
    const k = e.key.toLowerCase();
    if (!revelada) {
      const porLetra = LETRAS.toLowerCase().indexOf(k);
      const porNumero = /^[1-9]$/.test(k) ? Number(k) - 1 : -1;
      const i = porLetra >= 0 ? porLetra : porNumero;
      const porEtiqueta = letras ? item.opciones.findIndex((op) => String(op).trim().toLowerCase() === k) : -1;
      if (letras && porEtiqueta >= 0) {
        e.preventDefault();
        onSelect(porEtiqueta);
        return;
      }
      if (!letras && i >= 0 && i < item.opciones.length) {
        e.preventDefault();
        onSelect(i);
        return;
      }
      if (k === "enter" && respondida && !modoExamen && onComprobar) {
        e.preventDefault();
        onComprobar();
      }
    }
  };
  const clase = (i) => {
    if (revelada) {
      if (i === item.correcta) return "ok";
      if (i === valor) return "ko";
      return "dim";
    }
    return valor === i ? "pick" : "";
  };
  return (
    <article
      ref={ref}
      id={id}
      tabIndex={-1}
      onKeyDown={teclas}
      onFocus={onFoco}
      className={`sx-q gm-no-adapt ${actual ? "cur" : ""} ${acierto ? "okc marcada" : ""} ${fallo ? "koc marcada" : ""} ${sinResponder ? "marcada" : ""}`}
      aria-label={`Pregunta ${item.num}`}
    >
      {acierto && <Chispas />}
      {fallo && <ManchaTinta />}
      {revelada && (
        <span className={`sx-estampa ${acierto ? "ok" : fallo ? "ko" : "nada"}`} aria-hidden="true" translate="no">
          {acierto ? "对" : fallo ? "错" : "空"}
          <small>{acierto ? "¡BIEN!" : fallo ? "REPASA" : "SIN RESP."}</small>
        </span>
      )}
      <div className="sx-qh">
        <span className="sx-num">{item.num}</span>
        <p className="sx-enun" data-enunciado={item.num}>
          {item.enunciado}
        </p>
      </div>
      <div className={`sx-opts ${letras ? "letras" : ""}`} role="radiogroup" aria-label={`Opciones de la pregunta ${item.num}`}>
        {orden.map((i) => {
          const opcion = item.opciones[i];
          const c = clase(i);
          const tag = revelada && (c === "ok" || c === "ko") ? (c === "ok" ? (valor === i ? "✓ Tu respuesta" : "✓ Correcta · 正确") : "✗ Tu respuesta") : null;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={valor === i}
              data-opcion={i}
              data-item={item.num}
              disabled={revelada}
              className={`sx-opt ${c}`}
              onClick={() => onSelect(i)}
            >
              <span className="l">{letras ? String(opcion).trim() : letra(i)}</span>
              {!letras && <span>{opcion}</span>}
              {tag && !letras && <span className="tag">{tag}</span>}
            </button>
          );
        })}
      </div>
      {revelada ? (
        <div className={`sx-expl ${acierto ? "" : fallo ? "ko" : "nada"}`} data-clave={item.num}>
          <div className="sx-expl-k">
            {acierto ? (
              <>
                ¡Correcto! · <span className="sx-zh" lang="zh-CN">回答正确</span>
              </>
            ) : (
              <>
                Respuesta correcta: {etiquetaOpcion(item, item.correcta)} · <span className="sx-zh" lang="zh-CN">正确答案 {etiquetaOpcion(item, item.correcta)}</span>
              </>
            )}
          </div>
          {item.justificacion && <p data-justificacion={item.num}>{item.justificacion}</p>}
          <p className="sx-zh" lang="zh-CN">
            {explicacionZh(item, valor)}
          </p>
          {item.fraseSoporte && verFrase && <blockquote data-frase={item.num}>«{item.fraseSoporte}»</blockquote>}
          <div className="sx-acc">
            {item.fraseSoporte && (
              <button
                type="button"
                data-accion="1"
                className="sx-btn sx-btn-papel sx-btn-sm"
                onClick={() => {
                  const hallada = onVerTexto ? onVerTexto(item.fraseSoporte) : false;
                  if (!hallada) setVerFrase((v) => !v);
                }}
              >
                <EyeIcon size={15} /> Ver en el texto · <span className="sx-zh" lang="zh-CN">在原文中查看</span>
              </button>
            )}
            {!acierto && onReintentar && (
              <button type="button" data-accion="1" className="sx-btn sx-btn-papel sx-btn-sm" onClick={onReintentar}>
                <RotateCcwIcon size={15} /> Reintentar · <span className="sx-zh" lang="zh-CN">再试一次</span>
              </button>
            )}
          </div>
          <img className="sx-monito" src={recurso(`mono/${acierto ? "feliz" : "serio"}.webp`)} alt="" aria-hidden="true" />
        </div>
      ) : (
        <div className="sx-qpie">
          <span className="sx-pista">
            {!respondida ? (
              <>
                Elige una opción (A, B, C…) · <span lang="zh-CN">请选择</span>
              </>
            ) : modoExamen ? (
              <>
                ✓ Respuesta guardada · <span lang="zh-CN">已作答</span>
              </>
            ) : (
              <>
                Intro para comprobar · <span lang="zh-CN">按回车检查</span>
              </>
            )}
          </span>
          {!modoExamen && onComprobar && (
            <button type="button" data-accion="1" className={`sx-btn sx-btn-sm ${respondida ? "sx-btn-laca" : "sx-btn-papel"}`} disabled={!respondida} onClick={onComprobar}>
              <CheckIcon size={15} /> Comprobar · <span className="sx-zh" lang="zh-CN">检查</span>
            </button>
          )}
        </div>
      )}
    </article>
  );
}

/** Ondas radiales doradas alrededor del gong o del micrófono */
export function OndasCirculares({ n = 96, r0 = 62, r1 = 98, frac = 0, color = "#f2c14e", tenue = "#ffffff30" }) {
  const lineas = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const h = r0 + Math.abs(Math.sin(i * 1.9) * 0.6 + Math.sin(i * 0.37) * 0.4) * (r1 - r0);
      out.push([50 + (Math.cos(a) * r0) / 2.3, 50 + (Math.sin(a) * r0) / 2.3, 50 + (Math.cos(a) * h) / 2.3, 50 + (Math.sin(a) * h) / 2.3, i / n]);
    }
    return out;
  }, [n, r0, r1]);
  return (
    <svg className="ondas" viewBox="0 0 100 100" aria-hidden="true">
      {lineas.map(([x1, y1, x2, y2, p], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={p < frac ? color : tenue} strokeWidth="1.3" strokeLinecap="round" />
      ))}
      <circle cx="50" cy="50" r={r0 / 2.3 - 2} fill="none" stroke="#f2c14e55" strokeWidth=".6" />
    </svg>
  );
}

let idLinterna = 0;
export function Linterna({ encendida }) {
  const [gid] = React.useState(() => `sx-gl-${++idLinterna}`);
  return (
    <svg className={`sx-linterna ${encendida ? "on" : ""}`} viewBox="0 0 44 62" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx=".5" cy=".45">
          <stop offset="0" stopColor="#fff2b0" />
          <stop offset=".4" stopColor="#ff8a2a" />
          <stop offset="1" stopColor="#c8102e" />
        </radialGradient>
      </defs>
      <line x1="22" y1="0" x2="22" y2="6" stroke="#c8961e" strokeWidth="2" />
      <rect x="12" y="5" width="20" height="5" rx="2" fill="#c8961e" />
      <ellipse cx="22" cy="28" rx="18" ry="17" fill={encendida ? `url(#${gid})` : "#5c2a1a"} stroke="#f2c14e" strokeWidth="1.2" />
      <path d="M14 13Q10 28 14 43M22 11v34M30 13q4 15 0 30" stroke={encendida ? "#ffd27a" : "#8a4a2a"} strokeWidth="1" fill="none" />
      <rect x="12" y="44" width="20" height="5" rx="2" fill="#c8961e" />
      <path d="M22 49v12M19 52v8M25 52v8" stroke="#c8102e" strokeWidth="1.6" />
      <text x="22" y="33" textAnchor="middle" fontSize="13" fill={encendida ? "#5c0714" : "#c99"} fontFamily="KaiTi, STKaiti, serif">
        听
      </text>
    </svg>
  );
}

/** Medidor de palabras en forma de pincelada con la franja objetivo */
export function PincelPalabras({ palabras, minimo, maximo }) {
  const tope = Math.max(maximo ? maximo * 1.4 : 100, palabras, 10);
  const pct = (v) => Math.min(100, (v / tope) * 100);
  const dentro = minimo ? palabras >= minimo && (!maximo || palabras <= maximo + 10) : palabras > 0;
  const demasiadas = maximo && palabras > maximo + 10;
  const [cid] = React.useState(() => `sx-cl-${Math.random().toString(36).slice(2, 8)}`);
  return (
    <div className="sx-pincel">
      <div className="row">
        <span className="n" aria-live="polite">
          {palabras}
          <small>
            palabras · <span lang="zh-CN">词</span>
          </small>
        </span>
        <span className={`estado ${dentro ? "ok" : demasiadas ? "mas" : ""}`}>
          {dentro ? (
            <>
              ✓ En el objetivo · <span lang="zh-CN">字数合适</span>
            </>
          ) : demasiadas ? (
            <>
              Te pasas del máximo · <span lang="zh-CN">超出字数</span>
            </>
          ) : minimo ? (
            <>
              Objetivo {minimo}–{maximo} · <span lang="zh-CN">目标字数</span>
            </>
          ) : null}
        </span>
      </div>
      <div className="sx-trazo" aria-hidden="true">
        <svg viewBox="0 0 400 40" preserveAspectRatio="none">
          <defs>
            <clipPath id={cid}>
              <rect className="carga" x="0" y="0" width={(pct(palabras) / 100) * 400} height="40" />
            </clipPath>
            <linearGradient id={`${cid}-g`} x1="0" x2="1">
              <stop offset="0" stopColor="#6b4a2b" />
              <stop offset="1" stopColor="#1a0f08" />
            </linearGradient>
          </defs>
          {minimo ? (
            <rect x={(pct(minimo) / 100) * 400} y="4" width={Math.max(4, ((pct(maximo || minimo) - pct(minimo)) / 100) * 400)} height="32" rx="6" fill="#2e9e5822" stroke="#2e9e58" strokeWidth="1.5" strokeDasharray="4 3" />
          ) : null}
          <path d="M2 22 C40 12,90 28,140 18 S240 26,300 16 S370 24,398 18 L398 24 C370 30,330 22,300 26 S220 32,140 26 S40 32,2 26Z" fill="#e8dcc0" />
          <path clipPath={`url(#${cid})`} d="M2 20 C40 8,90 30,140 16 S240 28,300 14 S370 26,398 16 L398 26 C370 34,330 22,300 28 S220 34,140 28 S40 34,2 28Z" fill={`url(#${cid}-g)`} />
        </svg>
        {minimo ? (
          <>
            <span className="sx-sellito" style={{ left: `${pct(minimo)}%` }}>
              {minimo}
            </span>
            {maximo ? (
              <span className="sx-sellito" style={{ left: `${pct(maximo)}%` }}>
                {maximo}
              </span>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

/** Resalta en un contenedor la frase que justifica una respuesta (CSS Custom Highlight API) */
export function resaltarFrase(contenedor, frase) {
  if (!contenedor || !frase) return false;
  const limpia = (s) => s.replace(/\s+/g, " ").toLowerCase();
  const nodos = [];
  const walker = document.createTreeWalker(contenedor, NodeFilter.SHOW_TEXT);
  let total = "";
  while (walker.nextNode()) {
    const nodo = walker.currentNode;
    nodos.push({ nodo, desde: total.length });
    total += nodo.nodeValue;
  }
  // Mapa de índices del texto normalizado al original
  const norm = [];
  let texto = "";
  for (let i = 0; i < total.length; i++) {
    const ch = total[i];
    if (/\s/.test(ch)) {
      if (texto.endsWith(" ")) continue;
      texto += " ";
    } else texto += ch.toLowerCase();
    norm.push(i);
  }
  const candidatas = [frase, ...String(frase).split(/(?<=[.!?…])\s+/)].map((s) => limpia(s).trim()).filter((s) => s.length > 8);
  let ini = -1;
  let largo = 0;
  for (const c of candidatas) {
    ini = texto.indexOf(c);
    if (ini >= 0) {
      largo = c.length;
      break;
    }
    const corta = c.slice(0, 40);
    ini = texto.indexOf(corta);
    if (ini >= 0) {
      largo = corta.length;
      break;
    }
  }
  if (ini < 0) return false;
  const a = norm[ini];
  const b = norm[Math.min(norm.length - 1, ini + largo - 1)] + 1;
  const ubica = (pos) => {
    for (let i = nodos.length - 1; i >= 0; i--) if (nodos[i].desde <= pos) return [nodos[i].nodo, Math.min(pos - nodos[i].desde, nodos[i].nodo.nodeValue.length)];
    return [nodos[0].nodo, 0];
  };
  const rango = document.createRange();
  rango.setStart(...ubica(a));
  rango.setEnd(...ubica(b));
  if (typeof CSS !== "undefined" && CSS.highlights && typeof Highlight === "function") {
    CSS.highlights.set("sx-frase", new Highlight(rango));
  }
  const el = rango.startContainer.parentElement;
  el?.scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth", block: "center" });
  const hoja = contenedor.closest(".sx-hoja") || contenedor;
  hoja.classList.remove("sx-flash");
  void hoja.offsetWidth;
  hoja.classList.add("sx-flash");
  return true;
}

/** Medallón de jade con la nota de un grupo */
export function MedallonJade({ valor, max, etiqueta, sub, oro }) {
  const L = 2 * Math.PI * 86;
  const p = valor === null ? 0 : Math.max(0, Math.min(1, valor / max));
  return (
    <div className="sx-jade">
      <div className={`d ${oro ? "oro" : ""} ${valor === null ? "vacio" : ""}`}>
        <svg viewBox="0 0 196 196" aria-hidden="true">
          <circle cx="98" cy="98" r="86" fill="none" stroke="#0002" strokeWidth="7" />
          <circle cx="98" cy="98" r="86" fill="none" stroke="#c8102e" strokeWidth="7" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
        </svg>
        <b>{valor === null ? "—" : valor.toFixed(1).replace(".", ",").replace(",0", "")}</b>
        <span className="n">/ {max}</span>
      </div>
      <div className="lbl">
        {etiqueta}
        <small>{sub}</small>
      </div>
    </div>
  );
}

export function Confeti() {
  if (reducirMovimiento()) return null;
  return (
    <div className="sx-confeti" aria-hidden="true">
      {Array.from({ length: 26 }, (_, i) => (
        <i key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 60}%`, background: ["#f2c14e", "#c8102e", "#2e9e58", "#ffe7a3"][i % 4], transform: `rotate(${i * 47}deg)`, animationDelay: `${(i % 7) * 0.12}s` }} />
      ))}
    </div>
  );
}
