import * as React from "react";
import { PrinterIcon, XIcon, LoaderCircleIcon, CheckIcon } from "lucide-react";
import { crearDocumento } from "./modeloImpresion.js";
import { EstiloPagina } from "./paginaImpresion.jsx";
import "../../styles/impresion.css";

// Vista previa de impresión de cualquier examen de la plataforma (ver modeloImpresion.js).
// Se imprime con el diálogo del navegador («Guardar como PDF»): mientras la capa está abierta,
// la hoja de estilos de impresión oculta el resto de la página.

const BASE = import.meta.env.BASE_URL || "./";
const CLAVE_OPCIONES = "wk_impresion_opciones";
const OPCIONES_DEF = { hoja: true, soluciones: true, zh: true, lineas: true, transcripciones: false };

const OPCIONES = [
  { k: "hoja", es: "Hoja de respuestas del alumno", zh: "学生答题卡", d: "Plantilla con casillas para marcar" },
  { k: "soluciones", es: "Solucionario al final", zh: "参考答案（附在最后）", d: "Claves y modelos en página aparte" },
  { k: "zh", es: "Traducciones al chino", zh: "中文翻译", d: "Títulos e instrucciones bilingües" },
  { k: "lineas", es: "Espacio para escribir", zh: "书写横线", d: "Líneas en escritura y notas del oral" },
  { k: "transcripciones", es: "Transcripciones de audio", zh: "听力原文", d: "Anexo con los guiones de la audición" },
];

function leerOpciones() {
  try {
    return { ...OPCIONES_DEF, ...JSON.parse(localStorage.getItem(CLAVE_OPCIONES) || "{}") };
  } catch {
    return { ...OPCIONES_DEF };
  }
}

let fuentesPedidas = false;
function pedirFuentes() {
  if (fuentesPedidas || typeof document === "undefined") return;
  fuentesPedidas = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600;700&display=swap";
  document.head.appendChild(link);
}

// ---------- Piezas pequeñas ----------
function Zh({ children, className = "" }) {
  if (!children) return null;
  return (
    <span className={`ip-zh ${className}`} lang="zh-CN">
      {children}
    </span>
  );
}

// Texto con párrafos; los huecos [1], (1) o ___ se pintan como espacios numerados
function Parrafos({ texto, className = "ip-texto" }) {
  if (!texto) return null;
  const parrafos = String(texto)
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className={className}>
      {parrafos.map((p, i) => (
        <p key={i}>{conHuecos(p)}</p>
      ))}
    </div>
  );
}
function conHuecos(p) {
  const partes = p.split(/(\[\d{1,2}\]|_{3,})/);
  if (partes.length === 1) return p;
  return partes.map((x, i) => {
    const m = x.match(/^\[(\d{1,2})\]$/);
    if (m)
      return (
        <span key={i} className="ip-hueco">
          <b>{m[1]}</b>
        </span>
      );
    if (/^_{3,}$/.test(x)) return <span key={i} className="ip-hueco vacio" />;
    return <React.Fragment key={i}>{x}</React.Fragment>;
  });
}

function Lineas({ n, palabras }) {
  return (
    <div className="ip-lineas">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} />
      ))}
      {palabras && (
        <div className="ip-contador">
          Número de palabras · 字数: <span />
        </div>
      )}
    </div>
  );
}

function Casilla({ letra }) {
  return (
    <span className="ip-casilla" aria-hidden="true">
      {letra}
    </span>
  );
}

// Nube auspiciosa (xiangyun) en vector: marca de agua y adornos
function Nube({ className }) {
  return (
    <svg className={className} viewBox="0 0 220 90" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        <path d="M14 70c-9-2-12-14-4-20 6-5 15-2 16 5" />
        <path d="M26 55c-2-14 10-25 24-22 4-13 22-18 33-8 8-12 30-11 36 3 12-4 25 5 23 18 10 0 17 9 14 18" />
        <path d="M60 52c-1-8 6-13 12-11 5 1 7 7 4 11-3 3-8 2-8-2" />
        <path d="M104 46c1-9 10-13 17-9 6 4 5 12-1 14-4 1-7-2-6-5" />
        <path d="M150 62c0-7 7-11 13-8 5 3 4 10-1 11-3 0-5-2-4-4" />
        <path d="M8 76h160c14 0 20-8 26-12" />
        <path d="M30 84h110" />
      </g>
    </svg>
  );
}

function SelloLogo() {
  return (
    <span className="ip-logo" translate="no" aria-hidden="true">
      悟
    </span>
  );
}

// ---------- Portada ----------
function Portada({ doc }) {
  const preguntas = (p) => p.tareas.reduce((a, t) => a + (t.preguntas?.length || 0), 0);
  return (
    <section className="ip-hoja ip-portada">
      <div className="ip-portada-marco">
        <img className="ip-portada-dragon" src={`${BASE}theme/dragon-enroscado.webp`} alt="" aria-hidden="true" />
        <Nube className="ip-portada-nube n1" />
        <Nube className="ip-portada-nube n2" />
        <header className="ip-portada-cab">
          <div className="ip-marca">
            <SelloLogo />
            <div>
              <b>Wukong Español</b>
              <span lang="zh-CN" translate="no">
                悟空西语
              </span>
            </div>
          </div>
          {doc.nivel && (
            <div className="ip-nivel">
              <small>Nivel <Zh>· 级别</Zh></small>
              <b>{doc.nivel}</b>
            </div>
          )}
        </header>

        <div className="ip-portada-centro">
          <div className="ip-tipo">
            {doc.tipo} <Zh>· {doc.tipoZh}</Zh>
          </div>
          <h1 className="ip-portada-titulo">{doc.titulo}</h1>
          {doc.tituloZh && <div className="ip-portada-zh ip-zh" lang="zh-CN">{doc.tituloZh}</div>}
          <div className="ip-filete" aria-hidden="true">
            <i />
            <span>◆</span>
            <i />
          </div>
          <div className="ip-codigo">
            {doc.codigo}
            {doc.minutos ? ` · ${doc.minutos} min` : ""}
            {doc.ambito ? ` · Ámbito ${doc.ambito}` : ""}
          </div>
          <div className="ip-sello-grande" translate="no" aria-hidden="true">
            <span>{doc.sello || "考"}</span>
          </div>
        </div>

        <table className="ip-indice">
          <thead>
            <tr>
              <th>Prueba <Zh>· 部分</Zh></th>
              <th>Tareas <Zh>· 任务</Zh></th>
              <th>Preguntas <Zh>· 题数</Zh></th>
              <th>Tiempo <Zh>· 时间</Zh></th>
              <th>Puntos <Zh>· 分值</Zh></th>
            </tr>
          </thead>
          <tbody>
            {doc.pruebas.map((p, i) => (
              <tr key={i}>
                <td>
                  <b>{i + 1}.</b> {p.nombre} <Zh>{p.nombreZh}</Zh>
                </td>
                <td>{p.tareas.length}</td>
                <td>{preguntas(p) || "—"}</td>
                <td>{p.minutos ? `${p.minutos} min` : "—"}</td>
                <td>{p.puntos ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ip-alumno">
          <div className="ip-alumno-titulo">
            Datos del alumno <Zh>· 考生信息</Zh>
          </div>
          <div className="ip-campos">
            <label className="ancho">
              Nombre y apellidos <Zh>姓名</Zh>
              <span className="ip-campo-linea" />
            </label>
            <label>
              Grupo <Zh>班级</Zh>
              <span className="ip-campo-linea" />
            </label>
            <label>
              Fecha <Zh>日期</Zh>
              <span className="ip-campo-linea" />
            </label>
            <label>
              Nº de alumno <Zh>学号</Zh>
              <span className="ip-campo-linea" />
            </label>
            <label className="nota">
              Calificación <Zh>成绩</Zh>
              <span className="ip-campo-linea">
                <em>/ {doc.puntosTotal || 100}</em>
              </span>
            </label>
          </div>
        </div>

        <div className="ip-normas">
          <div>
            <b>Instrucciones generales</b>
            <ul>
              <li>No abra este cuadernillo hasta que se lo indiquen.</li>
              <li>Escriba con bolígrafo azul o negro y con letra clara.</li>
              <li>Marque cada respuesta en la Hoja de respuestas rellenando la casilla: ●</li>
              <li>{doc.criterio}</li>
            </ul>
          </div>
          <div className="ip-zh" lang="zh-CN">
            <b>考试须知</b>
            <ul>
              <li>听到指令后再打开试卷。</li>
              <li>请用蓝色或黑色笔书写，字迹清楚。</li>
              <li>在答题卡上涂满对应的圆圈：●</li>
              <li>{doc.criterioZh}</li>
            </ul>
          </div>
        </div>
        <footer className="ip-portada-pie">
          <img src={`${BASE}mono/serio.webp`} alt="" aria-hidden="true" />
          <span>
            Wukong Español · <span lang="zh-CN">悟空西语</span> — Material de examen para uso en clase <Zh>· 课堂考试专用</Zh>
          </span>
        </footer>
      </div>
    </section>
  );
}

// ---------- Contenido de las pruebas ----------
function Opciones({ pregunta }) {
  const ops = pregunta.opciones || [];
  const cortas = ops.every((o) => (o.texto || "").length <= 26);
  const columnas = ops.length >= 3 && cortas ? Math.min(ops.length, 4) : ops.length === 2 && cortas ? 2 : 1;
  return (
    <ul className={`ip-opciones c${columnas}`}>
      {ops.map((o) => (
        <li key={o.letra}>
          <Casilla letra={o.letra} />
          <span>{o.texto}</span>
        </li>
      ))}
    </ul>
  );
}

function Pregunta({ p }) {
  if (p.modo === "letra") {
    return (
      <div className="ip-pregunta ip-pregunta-letra">
        <span className="ip-num">{p.num}</span>
        <div className="ip-enun">
          {p.enunciado}
          <Zh className="bloque">{p.enunciadoZh}</Zh>
        </div>
        <span className="ip-caja-letra" aria-label="Letra · 字母" />
      </div>
    );
  }
  if (p.modo === "escribir") {
    return (
      <div className="ip-pregunta ip-pregunta-escribir">
        <span className="ip-num">{p.num}</span>
        <div className="ip-enun">
          {conHuecos(p.enunciado)}
          <Zh className="bloque">{p.enunciadoZh}</Zh>
          {p.pista && <span className="ip-pista">Pista · 提示: {p.pista}</span>}
          <span className="ip-linea-resp" />
        </div>
      </div>
    );
  }
  return (
    <div className="ip-pregunta">
      <span className="ip-num">{p.num}</span>
      <div className="ip-enun">
        <div className="ip-q">
          {conHuecos(p.enunciado)}
          <Zh className="bloque">{p.enunciadoZh}</Zh>
        </div>
        <Opciones pregunta={p} />
      </div>
    </div>
  );
}

function Escritura({ e, opciones }) {
  return (
    <div className="ip-escritura">
      {(e.situacion || e.destinatario || e.proposito) && (
        <dl className="ip-ficha">
          {e.situacion && (
            <>
              <dt>
                Situación <Zh>情境</Zh>
              </dt>
              <dd>{e.situacion}</dd>
            </>
          )}
          {e.destinatario && (
            <>
              <dt>
                Destinatario <Zh>收件人</Zh>
              </dt>
              <dd>{e.destinatario}</dd>
            </>
          )}
          {e.proposito && (
            <>
              <dt>
                Propósito <Zh>目的</Zh>
              </dt>
              <dd>{e.proposito}</dd>
            </>
          )}
        </dl>
      )}
      {e.material && <Parrafos texto={e.material} className="ip-texto ip-documento" />}
      {e.puntosGuia?.length > 0 && (
        <div className="ip-guia">
          <b>
            En su texto debe <Zh>· 写作要点</Zh>
          </b>
          <ul>
            {e.puntosGuia.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      )}
      {e.conectores?.length > 0 && (
        <p className="ip-conectores">
          <b>
            Conectores útiles <Zh>· 常用连接词</Zh>:
          </b>{" "}
          {e.conectores.join(" · ")}
        </p>
      )}
      {(e.min || e.extension) && (
        <p className="ip-extension">
          Número de palabras <Zh>· 字数</Zh>: <b>{e.extension || `${e.min}–${e.max}`}</b>
        </p>
      )}
      {opciones.lineas && <Lineas n={e.lineas || 12} palabras />}
    </div>
  );
}

function Oral({ o, opciones }) {
  return (
    <div className="ip-oral">
      {o.tiempo && (
        <p className="ip-extension">
          Duración <Zh>· 时长</Zh>: <b>{o.tiempo}</b>
        </p>
      )}
      {o.situacion && <p className="ip-situacion">{o.situacion}</p>}
      {o.lamina && (
        <div className="ip-lamina">
          <span className="ip-lamina-et">
            Lámina del candidato <Zh>· 考生任务卡</Zh>
          </span>
          <Parrafos texto={o.lamina} className="ip-texto sin-marco" />
        </div>
      )}
      {o.escena && (
        <p className="ip-escena">
          <b>
            Fotografía <Zh>· 图片</Zh>:
          </b>{" "}
          {o.escena}
        </p>
      )}
      {o.opciones?.length > 0 && (
        <ul className="ip-lista-letras">
          {o.opciones.map((x, i) => (
            <li key={i}>
              <span>{String.fromCharCode(65 + i)}</span>
              {x}
            </li>
          ))}
        </ul>
      )}
      {o.puntosGuia?.length > 0 && (
        <div className="ip-guia">
          <b>
            Puntos para hablar <Zh>· 口语要点</Zh>
          </b>
          <ul>
            {o.puntosGuia.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      )}
      {o.conectores?.length > 0 && (
        <p className="ip-conectores">
          <b>
            Expresiones útiles <Zh>· 常用表达</Zh>:
          </b>{" "}
          {o.conectores.join(" · ")}
        </p>
      )}
      {o.preguntasEntrevistador?.length > 0 && (
        <ol className="ip-entrevista">
          {o.preguntasEntrevistador.map((q, i) => (
            <li key={i}>
              <b>{q.pregunta}</b>
              {q.ayuda && <span className="ip-pista">{q.ayuda}</span>}
              {q.frases?.length > 0 && <span className="ip-frases">{q.frases.join(" · ")}</span>}
            </li>
          ))}
        </ol>
      )}
      {opciones.lineas && (
        <div className="ip-notas">
          <span>
            Notas para preparar <Zh>· 准备笔记</Zh>
          </span>
          <Lineas n={o.notas || 5} />
        </div>
      )}
    </div>
  );
}

function Tarea({ t, n, prueba, opciones }) {
  const totalPreg = t.preguntas?.length || 0;
  return (
    <article className="ip-tarea">
      <header className="ip-tarea-cab">
        <span className="ip-tarea-num">
          Tarea {n} <Zh>任务{n}</Zh>
        </span>
        <h3>
          {t.titulo}
          {t.tituloZh && <Zh> · {t.tituloZh}</Zh>}
        </h3>
        {totalPreg > 0 && (
          <span className="ip-tarea-meta">
            {totalPreg} {totalPreg === 1 ? "pregunta" : "preguntas"} <Zh>· {totalPreg} 题</Zh>
          </span>
        )}
      </header>
      {(t.instrucciones || t.instruccionesZh) && (
        <div className="ip-instr">
          {t.audio || prueba.audio ? (
            <span className="ip-icono-audio" aria-hidden="true">
              ♪
            </span>
          ) : null}
          <div>
            {t.instrucciones && <p>{t.instrucciones}</p>}
            {t.instruccionesZh && (
              <p className="ip-zh" lang="zh-CN">
                {t.instruccionesZh}
              </p>
            )}
          </div>
        </div>
      )}
      {(t.textos || []).map((x, i) => (
        <div key={i} className="ip-lectura">
          {x.titulo && x.titulo !== t.titulo && <h4>{x.titulo}</h4>}
          <Parrafos texto={x.texto} />
          {opciones.zh && x.textoZh && <Parrafos texto={x.textoZh} className="ip-texto ip-zh ip-texto-zh" />}
        </div>
      ))}
      {t.bloques?.length > 0 && (
        <div className="ip-bloques">
          {t.bloques.map((b) => (
            <div key={b.letra} className="ip-bloque">
              <span className="ip-bloque-letra">{b.letra}</span>
              <div>
                {b.titulo && <b>{b.titulo}</b>}
                <Parrafos texto={b.texto} className="ip-texto sin-marco" />
              </div>
            </div>
          ))}
        </div>
      )}
      {t.listaOpciones?.length > 0 && (
        <div className="ip-lista-opciones">
          <span className="ip-lista-et">
            Opciones <Zh>· 选项</Zh>
          </span>
          <ul className="ip-lista-letras">
            {t.listaOpciones.map((x) => (
              <li key={x.letra}>
                <span>{x.letra}</span>
                {x.texto}
              </li>
            ))}
          </ul>
        </div>
      )}
      {totalPreg > 0 && (
        <div className="ip-preguntas">
          {t.preguntas.map((p) => (
            <Pregunta key={p.num} p={p} />
          ))}
        </div>
      )}
      {t.escritura && <Escritura e={t.escritura} opciones={opciones} />}
      {t.oral && <Oral o={t.oral} opciones={opciones} />}
    </article>
  );
}

function Prueba({ p, i, opciones }) {
  return (
    <section className="ip-hoja ip-prueba">
      <header className="ip-prueba-cab">
        <span className="ip-prueba-sello" translate="no" aria-hidden="true">
          {i + 1}
        </span>
        <div className="ip-prueba-tit">
          <small>
            Prueba {i + 1} <Zh>· 第{i + 1}部分</Zh>
          </small>
          <h2>
            {p.nombre} <Zh className="caligrafia">{p.nombreZh}</Zh>
          </h2>
        </div>
        <div className="ip-prueba-datos">
          {p.minutos ? (
            <span>
              <b>{p.minutos}</b> min
            </span>
          ) : null}
          {p.preparacion ? (
            <span>
              <b>{p.preparacion}</b> min prep.
            </span>
          ) : null}
          {p.puntos != null ? (
            <span>
              <b>{p.puntos}</b> puntos
            </span>
          ) : null}
        </div>
      </header>
      {(p.instrucciones || p.instruccionesZh) && (
        <div className="ip-prueba-instr">
          {p.instrucciones && <p>{p.instrucciones}</p>}
          {p.instruccionesZh && (
            <p className="ip-zh" lang="zh-CN">
              {p.instruccionesZh}
            </p>
          )}
        </div>
      )}
      {p.tareas.map((t, k) => (
        <Tarea key={k} t={t} n={k + 1} prueba={p} opciones={opciones} />
      ))}
      <div className="ip-fin-prueba">
        <Nube className="ip-fin-nube" />
        <span>
          Fin de la prueba {i + 1} <Zh>· 第{i + 1}部分结束</Zh>
        </span>
      </div>
    </section>
  );
}

function Vocabulario({ lista }) {
  return (
    <section className="ip-hoja ip-anexo">
      <h2 className="ip-anexo-tit">
        Vocabulario del tema <Zh>· 主题词汇</Zh>
      </h2>
      <table className="ip-tabla">
        <thead>
          <tr>
            <th>Palabra</th>
            <th className="ip-zh-col">
              <Zh>中文</Zh>
            </th>
            <th>Definición y ejemplo</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((v, i) => (
            <tr key={i}>
              <td>
                <b>{v.es}</b>
              </td>
              <td className="ip-zh-col">
                <Zh>{v.zh}</Zh>
              </td>
              <td>
                {v.def}
                {v.ej && <em className="ip-ejemplo"> «{v.ej}»</em>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Transcripciones({ doc }) {
  const lista = [];
  doc.pruebas.forEach((p, i) =>
    p.tareas.forEach((t, k) => {
      if (t.transcripcion) lista.push({ etiqueta: `Prueba ${i + 1} · Tarea ${k + 1}`, titulo: t.titulo, texto: t.transcripcion });
    }),
  );
  if (!lista.length) return null;
  return (
    <section className="ip-hoja ip-anexo">
      <h2 className="ip-anexo-tit">
        Transcripciones de los audios <Zh>· 听力原文</Zh>
      </h2>
      {lista.map((x, i) => (
        <div key={i} className="ip-transc">
          <h3>
            {x.etiqueta}
            {x.titulo ? ` — ${x.titulo}` : ""}
          </h3>
          <Parrafos texto={x.texto} className="ip-texto ip-texto-transc" />
        </div>
      ))}
    </section>
  );
}

// Hoja de respuestas: casillas tipo plantilla (se rellenan con bolígrafo)
function HojaRespuestas({ doc }) {
  const pruebas = doc.pruebas
    .map((p, i) => ({ p, i, tareas: p.tareas.map((t, k) => ({ t, k })).filter(({ t }) => t.preguntas?.length) }))
    .filter((x) => x.tareas.length);
  if (!pruebas.length) return null;
  return (
    <section className="ip-hoja ip-hoja-resp">
      <header className="ip-hr-cab">
        <div>
          <h2>
            Hoja de respuestas <Zh className="caligrafia">答题卡</Zh>
          </h2>
          <p>
            {doc.nivel ? `Nivel ${doc.nivel} · ` : ""}
            {doc.titulo}
          </p>
        </div>
        <span className="ip-sello-mini" translate="no" aria-hidden="true">
          答
        </span>
      </header>
      <div className="ip-campos ip-campos-hr">
        <label className="ancho">
          Nombre y apellidos <Zh>姓名</Zh>
          <span className="ip-campo-linea" />
        </label>
        <label>
          Grupo <Zh>班级</Zh>
          <span className="ip-campo-linea" />
        </label>
        <label>
          Fecha <Zh>日期</Zh>
          <span className="ip-campo-linea" />
        </label>
      </div>
      <div className="ip-hr-ejemplo">
        <span>
          Marque así <Zh>正确涂法</Zh>:
        </span>
        <span className="ip-casilla llena">A</span>
        <span>
          No así <Zh>错误涂法</Zh>:
        </span>
        <span className="ip-casilla tachada">✓</span>
        <span className="ip-casilla tachada">✗</span>
        <span className="ip-casilla tachada">·</span>
      </div>
      {pruebas.map(({ p, i, tareas }) => (
        <div key={i} className="ip-hr-prueba">
          <h3>
            Prueba {i + 1} · {p.nombre} <Zh>{p.nombreZh}</Zh>
          </h3>
          <div className="ip-hr-tareas">
            {tareas.map(({ t, k }) => (
              <div key={k} className="ip-hr-tarea">
                <b className="ip-hr-tarea-et">Tarea {k + 1}</b>
                {t.preguntas.map((q) => (
                  <div key={q.num} className={`ip-hr-fila ${q.modo === "escribir" ? "escribir" : ""}`}>
                    <span className="ip-hr-n">{q.num}</span>
                    {q.modo === "escribir" ? (
                      <span className="ip-hr-linea" />
                    ) : (
                      (q.opciones || []).map((o) => <Casilla key={o.letra} letra={o.letra} />)
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <table className="ip-tabla ip-hr-nota">
        <thead>
          <tr>
            <th>Para el profesor <Zh>· 教师填写</Zh></th>
            {doc.pruebas.map((p, i) => (
              <th key={i}>P{i + 1}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Puntuación <Zh>· 得分</Zh></td>
            {doc.pruebas.map((p, i) => (
              <td key={i}>
                <em>/ {p.puntos ?? "—"}</em>
              </td>
            ))}
            <td>
              <em>/ {doc.puntosTotal || 100}</em>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

function Solucionario({ doc, opciones }) {
  return (
    <section className="ip-hoja ip-solucionario">
      <header className="ip-hr-cab">
        <div>
          <h2>
            Solucionario <Zh className="caligrafia">参考答案</Zh>
          </h2>
          <p>
            {doc.nivel ? `Nivel ${doc.nivel} · ` : ""}
            {doc.titulo} — <em>Para el profesor o la autocorrección <Zh>· 供教师或自我批改使用</Zh></em>
          </p>
        </div>
        <span className="ip-sello-mini" translate="no" aria-hidden="true">
          解
        </span>
      </header>
      {doc.pruebas.map((p, i) => {
        const conPreg = p.tareas.some((t) => t.preguntas?.length);
        const modelos = p.tareas.map((t, k) => ({ t, k, modelo: t.escritura?.modelo || t.oral?.modelo })).filter((x) => x.modelo);
        if (!conPreg && !modelos.length) return null;
        return (
          <div key={i} className="ip-sol-prueba">
            <h3>
              Prueba {i + 1} · {p.nombre} <Zh>{p.nombreZh}</Zh>
            </h3>
            {conPreg && (
              <div className="ip-sol-claves">
                {p.tareas.map((t, k) =>
                  t.preguntas?.length ? (
                    <div key={k} className="ip-sol-tarea">
                      <b>Tarea {k + 1}</b>
                      <span className="ip-sol-chips">
                        {t.preguntas.map((q) => (
                          <span key={q.num}>
                            {q.num}
                            <i>{q.correcta}</i>
                          </span>
                        ))}
                      </span>
                    </div>
                  ) : null,
                )}
              </div>
            )}
            {p.tareas.map((t, k) =>
              t.preguntas?.some((q) => q.explicacion || q.respuesta) ? (
                <div key={k} className="ip-sol-detalle">
                  {t.preguntas.map((q) => (
                    <p key={q.num}>
                      <b>
                        T{k + 1}·{q.num} → {q.correcta}
                      </b>
                      {q.respuesta && q.modo === "opcion" ? <span className="ip-sol-resp"> {q.respuesta.replace(/[.。]+$/, "")}.</span> : null}
                      {q.explicacion ? <span className={/[一-鿿]/.test(q.explicacion) && !/[a-záéíóúñ]{4}/i.test(q.explicacion) ? "ip-zh" : ""}> {q.explicacion}</span> : null}
                    </p>
                  ))}
                </div>
              ) : null,
            )}
            {modelos.map(({ t, k, modelo }) => (
              <div key={k} className="ip-sol-modelo">
                <b>
                  Tarea {k + 1} · Modelo de respuesta <Zh>· 参考范文</Zh>
                </b>
                <Parrafos texto={modelo} className="ip-texto sin-marco" />
              </div>
            ))}
          </div>
        );
      })}
      <p className="ip-sol-nota">
        {doc.criterio} {opciones.zh && <Zh>{doc.criterioZh}</Zh>}
      </p>
    </section>
  );
}

export function DocumentoExamen({ doc, opciones }) {
  const cabecera = `${doc.nivel ? `Nivel ${doc.nivel} · ` : ""}${doc.titulo}`;
  return (
    <div className={`ip-doc ${opciones.zh ? "" : "ip-sin-zh"}`} lang="es">
      <EstiloPagina centro={cabecera.length > 46 ? `${cabecera.slice(0, 44).trim()}…` : cabecera} pieIzquierda={`Wukong Español · 悟空西语 — ${doc.codigo || doc.titulo}`} />
      <div className="ip-agua" aria-hidden="true">
        <Nube className="ip-agua-nube a1" />
        <Nube className="ip-agua-nube a2" />
        <span className="ip-agua-sello" translate="no">
          悟
        </span>
      </div>
      <Portada doc={doc} />
      {doc.pruebas.map((p, i) => (
        <Prueba key={i} p={p} i={i} opciones={opciones} />
      ))}
      {doc.vocabulario?.length > 0 && <Vocabulario lista={doc.vocabulario} />}
      {opciones.transcripciones && <Transcripciones doc={doc} />}
      {opciones.hoja && <HojaRespuestas doc={doc} />}
      {opciones.soluciones && <Solucionario doc={doc} opciones={opciones} />}
    </div>
  );
}

export default function VistaImpresion({ fuente, onCerrar }) {
  const [doc, setDoc] = React.useState(null);
  const [error, setError] = React.useState("");
  const [opciones, setOpciones] = React.useState(leerOpciones);
  const [preparando, setPreparando] = React.useState(false);

  React.useEffect(() => {
    pedirFuentes();
    let vivo = true;
    Promise.resolve(typeof fuente === "function" ? fuente() : fuente)
      .then((f) => {
        if (!vivo) return;
        const d = crearDocumento(f);
        if (d) setDoc(d);
        else setError("No se ha podido preparar el examen · 无法生成试卷");
      })
      .catch(() => vivo && setError("No se ha podido preparar el examen · 无法生成试卷"));
    return () => {
      vivo = false;
    };
  }, [fuente]);

  React.useEffect(() => {
    try {
      localStorage.setItem(CLAVE_OPCIONES, JSON.stringify(opciones));
    } catch {}
  }, [opciones]);

  // Bloquea el scroll de la página de debajo y cierra con Escape
  React.useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("ip-abierta");
    const tecla = (e) => e.key === "Escape" && onCerrar?.();
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = anterior;
      document.body.classList.remove("ip-abierta");
      window.removeEventListener("keydown", tecla);
    };
  }, [onCerrar]);

  // Título del documento = nombre por defecto del PDF
  React.useEffect(() => {
    if (!doc) return;
    const anterior = document.title;
    document.title = `${doc.nivel ? `${doc.nivel} · ` : ""}${doc.titulo} · Wukong Español`;
    return () => {
      document.title = anterior;
    };
  }, [doc]);

  const imprimir = async () => {
    setPreparando(true);
    try {
      await Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 2500))]);
      const imgs = [...document.querySelectorAll(".ip-doc img")];
      await Promise.race([Promise.all(imgs.map((im) => (im.complete ? null : new Promise((r) => (im.onload = im.onerror = r))))), new Promise((r) => setTimeout(r, 2500))]);
    } catch {}
    setPreparando(false);
    window.print();
  };

  const cambiar = (k) => setOpciones((o) => ({ ...o, [k]: !o[k] }));

  return (
    <div className="ip-capa gm-no-adapt" role="dialog" aria-modal="true" aria-label="Vista previa de impresión · 打印预览">
      <aside className="ip-panel">
        <div className="ip-panel-cab">
          <span className="ip-panel-sello" translate="no" aria-hidden="true">
            印
          </span>
          <div>
            <b>Imprimir / PDF</b>
            <span lang="zh-CN">打印 / 保存为 PDF</span>
          </div>
          <button type="button" className="ip-cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
            <XIcon size={20} />
          </button>
        </div>
        <fieldset className="ip-opts">
          <legend>
            Opciones · <span lang="zh-CN">选项</span>
          </legend>
          {OPCIONES.map((o) => (
            <label key={o.k} className={`ip-opt ${opciones[o.k] ? "on" : ""}`}>
              <input type="checkbox" checked={!!opciones[o.k]} onChange={() => cambiar(o.k)} />
              <span className="ip-opt-check" aria-hidden="true">
                {opciones[o.k] && <CheckIcon size={14} />}
              </span>
              <span className="ip-opt-txt">
                <b>{o.es}</b>
                <span lang="zh-CN">{o.zh}</span>
                <small>{o.d}</small>
              </span>
            </label>
          ))}
        </fieldset>
        <button type="button" className="ip-imprimir" onClick={imprimir} disabled={!doc || preparando}>
          {preparando ? <LoaderCircleIcon size={18} className="animate-spin" /> : <PrinterIcon size={18} />}
          Imprimir / PDF · <span lang="zh-CN">打印</span>
        </button>
        <p className="ip-ayuda">
          En el diálogo elija «Guardar como PDF», papel A4 y active «Gráficos de fondo». <span lang="zh-CN">在打印窗口中选择「另存为 PDF」、A4 纸，并勾选「背景图形」。</span>
        </p>
      </aside>
      <div className="ip-escritorio">
        {error && <p className="ip-error">{error}</p>}
        {!doc && !error && (
          <p className="ip-cargando">
            <LoaderCircleIcon size={22} className="animate-spin" /> Preparando el examen… · <span lang="zh-CN">正在准备试卷</span>
          </p>
        )}
        {doc && <DocumentoExamen doc={doc} opciones={opciones} />}
      </div>
    </div>
  );
}
