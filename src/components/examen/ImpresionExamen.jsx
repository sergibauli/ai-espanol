import * as React from "react";
import { letra, explicacionZh } from "./SalaExamen.jsx";
import "../../styles/impresion-examen.css";

// Versión imprimible del examen (Guardar como PDF desde el diálogo de impresión del navegador).
// variante "corregido": respuestas del alumno, claves, explicaciones y nota. "blanco": examen para hacer en papel.
const contar = (t) => String(t || "").trim().split(/\s+/).filter(Boolean).length;
const fmt = (v) => (v === null || v === undefined ? "—" : v.toFixed(2).replace(".", ","));
const soloLetras = (opciones) => (opciones || []).length > 3 && (opciones || []).every((v) => /^[A-L]$/.test(String(v).trim()));

function Texto({ texto }) {
  if (!texto) return null;
  return (
    <div className="ix-texto">
      {String(texto)
        .split(/\n{2,}|\n/)
        .filter((p) => p.trim())
        .map((p, i) => (
          <p key={i}>{p.replace(/⟨|⟩/g, "")}</p>
        ))}
    </div>
  );
}

function Material({ tarea }) {
  const m = tarea.material;
  return (
    <>
      {tarea.tituloTexto && <h4>{tarea.tituloTexto}</h4>}
      <Texto texto={tarea.texto} />
      {m?.bloques?.length > 0 && (
        <div className="ix-bloques">
          {m.bloques.map((b) => (
            <div key={b.letra}>
              <b>{b.letra}</b> {b.titulo ? <b>{b.titulo}</b> : null}
              <Texto texto={b.texto} />
            </div>
          ))}
        </div>
      )}
      {m?.enunciados?.length > 0 && tarea.tipo !== "relacionar" && (
        <ol className="ix-lista">
          {m.enunciados.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ol>
      )}
      {m?.fragmentos?.length > 0 && (
        <div className="ix-bloques">
          {m.fragmentos.map((f) => (
            <div key={f.letra}>
              <b>{f.letra}</b>
              <Texto texto={f.texto} />
            </div>
          ))}
        </div>
      )}
      {m?.textos?.length > 0 && (
        <div className="ix-bloques">
          {m.textos.map((t, i) => (
            <div key={i}>
              {(t.titulo || t.tituloTexto) && <b>{t.titulo || t.tituloTexto}</b>}
              <Texto texto={t.texto} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Item({ item, valor, corregido }) {
  const letras = soloLetras(item.opciones);
  const ok = valor === item.correcta;
  return (
    <div className="ix-item">
      <span className="ix-n">{item.num}</span>
      <div>
        <div className="ix-q">
          {item.enunciado}
          {corregido && <span className={`ix-marca ${valor === undefined ? "nada" : ok ? "ok" : "ko"}`}>{valor === undefined ? "Sin responder · 未答" : ok ? "✓ Correcta · 正确" : "✗ Incorrecta · 错误"}</span>}
        </div>
        <div className="ix-ops">
          {(letras ? item.opciones.map((_o, i) => i).sort((x, y) => String(item.opciones[x]).trim().localeCompare(String(item.opciones[y]).trim())) : item.opciones.map((_o, i) => i)).map((i) => {
            const op = item.opciones[i];
            const clase = corregido ? `${i === item.correcta ? "c" : ""} ${i === valor && valor !== item.correcta ? "x" : ""} ${i === valor ? "a" : ""}` : "";
            return (
              <span key={i} className={clase}>
                {corregido ? "" : "☐ "}
                {letras ? String(op).trim() : `${letra(i)}) ${op}`}
              </span>
            );
          })}
        </div>
        {corregido && (
          <div className="ix-just">
            {item.justificacion && <span>{item.justificacion} </span>}
            <span className="ix-zh">{explicacionZh(item, valor)}</span>
            {item.fraseSoporte && <span className="ix-frase"> «{item.fraseSoporte}»</span>}
          </div>
        )}
      </div>
    </div>
  );
}

function Lineas({ n = 12 }) {
  return (
    <div className="ix-lineas" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}

export default function ImpresionExamen({ examen, nivel, variante, respuestas, textos, correccionesEsc, correccionesOral, temaOral, puntuacion }) {
  const corregido = variante === "corregido";
  const fecha = new Date().toLocaleDateString("es-ES");
  const pr = (n) => examen.pruebas.find((p) => p.prueba === n);
  const puntosPrueba = { 1: puntuacion?.pLect, 2: puntuacion?.pAud, 3: puntuacion?.pEsc, 4: puntuacion?.pOral };
  const titulo = `${nivel} · Modelo ${String(examen.modelo).padStart(2, "0")} — ${examen.temaCentral || ""}`;
  React.useEffect(() => {
    const anterior = document.title;
    document.title = `${titulo}${corregido ? " (corregido)" : " (en blanco)"}`;
    return () => {
      document.title = anterior;
    };
  }, [titulo, corregido]);
  return (
    <div className="ix-raiz" lang="es">
      <header className="ix-cab">
        <div>
          <h1>{titulo}</h1>
          <div className="ix-zh">
            {/Simulacro nuevo/.test(examen.titulo || "") ? "模拟题" : "官方真题"} · {corregido ? "批改版" : "空白试卷"}
          </div>
        </div>
        <div className="ix-sello">{corregido ? (puntuacion?.apto === true ? "合格" : puntuacion?.apto === false ? "未过" : "暂定") : "考"}</div>
      </header>
      <div className="ix-datos">
        <div>
          Nombre · 姓名<b>&nbsp;</b>
        </div>
        <div>
          Fecha · 日期<b>{corregido ? fecha : " "}</b>
        </div>
        {corregido ? (
          <>
            <div>
              Grupo 1 · 第一组<b>{fmt(puntuacion?.grupo1)} / 50</b>
            </div>
            <div>
              Grupo 2 · 第二组<b>{fmt(puntuacion?.grupo2)} / 50</b>
            </div>
          </>
        ) : (
          <>
            <div>
              Tiempo · 时间
              <b>{examen.pruebas.reduce((acc, p) => acc + (p.duracion || 0), 0)} min</b>
            </div>
            <div>
              Nota · 成绩<b>&nbsp;</b>
            </div>
          </>
        )}
      </div>
      {corregido && (
        <p className="ix-leyenda">
          Leyenda · 图例: <span className="c">verde = respuesta correcta 正确答案</span> <span className="x">tachado = tu error 你的错误</span> <span className="a">recuadro = tu respuesta 你的答案</span>
        </p>
      )}

      {[1, 2].map((n) => {
        const prueba = pr(n);
        if (!prueba) return null;
        return (
          <section key={n} className="ix-prueba">
            <h2>
              <span>
                Prueba {n} · {prueba.nombre} · {n === 1 ? "阅读理解" : "听力理解"}
              </span>
              <span>{corregido && puntosPrueba[n] !== null && puntosPrueba[n] !== undefined ? `${fmt(puntosPrueba[n])} / 25` : prueba.duracion ? `${prueba.duracion} min` : ""}</span>
            </h2>
            {(prueba.tareas || []).map((t) => (
              <div key={t.num} className="ix-tarea">
                <h3>
                  Tarea {t.num} · 任务{t.num}
                  {t.titulo ? ` — ${t.titulo}` : ""}
                </h3>
                {t.instrucciones && <p className="ix-instr">{t.instrucciones}</p>}
                {n === 1 && <Material tarea={t} />}
                {n === 2 && corregido && t.guion && (
                  <details open className="ix-transc">
                    <summary>Transcripción · 听力原文</summary>
                    <Texto texto={t.guion.replace(/\[[^\]]*\]/g, (m) => `\n${m} `)} />
                  </details>
                )}
                {n === 2 && t.material?.bloques?.length > 0 && <Material tarea={{ material: { bloques: t.material.bloques } }} />}
                {(t.items || []).map((it) => (
                  <Item key={it.num} item={it} valor={respuestas[`p${n}-${t.num}-${it.num}`]} corregido={corregido} />
                ))}
              </div>
            ))}
          </section>
        );
      })}

      {pr(3) && (
        <section className="ix-prueba">
          <h2>
            <span>Prueba 3 · {pr(3).nombre} · 书面表达</span>
            <span>{corregido && puntosPrueba[3] !== null && puntosPrueba[3] !== undefined ? `${fmt(puntosPrueba[3])} / 25` : pr(3).duracion ? `${pr(3).duracion} min` : ""}</span>
          </h2>
          {(pr(3).tareas || []).map((t) => {
            const texto = textos[`esc-${t.num}`] || "";
            const ia = correccionesEsc[`esc-${t.num}`];
            return (
              <div key={t.num} className="ix-tarea">
                <h3>
                  Tarea {t.num} · 任务{t.num}
                  {t.titulo ? ` — ${t.titulo}` : ""} ({t.minPalabras}–{t.maxPalabras} palabras · 词)
                </h3>
                {t.instrucciones && <p className="ix-instr">{t.instrucciones}</p>}
                {t.situacion && (
                  <p>
                    <b>Situación · 情境:</b> {t.situacion}
                  </p>
                )}
                {t.destinatario && (
                  <p>
                    <b>Destinatario · 收件人:</b> {t.destinatario}
                  </p>
                )}
                {t.proposito && (
                  <p>
                    <b>Propósito · 目的:</b> {t.proposito}
                  </p>
                )}
                {t.material?.contenido && <Texto texto={t.material.contenido} />}
                {(t.puntosGuia || []).length > 0 && (
                  <ul className="ix-lista">
                    {t.puntosGuia.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
                {corregido && texto.trim() ? (
                  <div className="ix-respuesta">
                    <b>Tu texto · 你的作文 ({contar(texto)} palabras · 词)</b>
                    <Texto texto={texto} />
                  </div>
                ) : (
                  <Lineas n={corregido ? 4 : 14} />
                )}
                {corregido && ia && <CorreccionIA ia={ia} />}
                {corregido && t.modeloRespuesta && (
                  <div className="ix-modelo">
                    <b>Modelo de respuesta · 参考范文</b>
                    <Texto texto={t.modeloRespuesta} />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {pr(4) && (
        <section className="ix-prueba">
          <h2>
            <span>Prueba 4 · {pr(4).nombre} · 口语表达</span>
            <span>{corregido && puntosPrueba[4] !== null && puntosPrueba[4] !== undefined ? `${fmt(puntosPrueba[4])} / 25` : pr(4).preparacion ? `Preparación ${pr(4).preparacion} min` : ""}</span>
          </h2>
          {(pr(4).tareas || []).map((t) => {
            const texto = textos[`oral-${t.num}`] || "";
            const ia = correccionesOral[`oral-${t.num}`];
            const tema = temaOral?.[`oral-${t.num}`];
            return (
              <div key={t.num} className="ix-tarea">
                <h3>
                  Tarea {t.num} · 任务{t.num}
                  {t.titulo ? ` — ${t.titulo}` : ""}
                  {t.tiempo ? ` (${t.tiempo})` : ""}
                </h3>
                {t.instrucciones && <p className="ix-instr">{t.instrucciones}</p>}
                {t.situacion && <p>{t.situacion}</p>}
                {(t.opciones || []).length > 0 && (
                  <ul className="ix-lista">
                    {t.opciones.map((op, i) => (
                      <li key={i}>
                        {op}
                        {corregido && tema === i ? " ← elegido · 已选" : ""}
                      </li>
                    ))}
                  </ul>
                )}
                {(t.puntosGuia || []).length > 0 && (
                  <ol className="ix-lista">
                    {t.puntosGuia.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ol>
                )}
                {corregido && texto.trim() ? (
                  <div className="ix-respuesta">
                    <b>Tu respuesta · 你的回答</b>
                    <Texto texto={texto} />
                  </div>
                ) : (
                  !corregido && <Lineas n={5} />
                )}
                {corregido && ia && <CorreccionIA ia={ia} />}
              </div>
            );
          })}
        </section>
      )}

      {!corregido && (
        <section className="ix-prueba ix-hoja-resp">
          <h2>
            <span>Hoja de respuestas · 答题卡</span>
          </h2>
          {[1, 2].map((n) =>
            (pr(n)?.tareas || []).map((t) => (
              <div key={`${n}-${t.num}`} className="ix-hr">
                <b>
                  P{n} · T{t.num}
                </b>
                {(t.items || []).map((it) => (
                  <span key={it.num}>
                    {it.num}.{" "}
                    {(soloLetras(it.opciones) ? it.opciones.map((o) => String(o).trim()) : it.opciones.map((_o, i) => letra(i))).map((l) => (
                      <i key={l}>{l}</i>
                    ))}
                  </span>
                ))}
              </div>
            )),
          )}
        </section>
      )}
      <footer className="ix-pie">Wukong Español · 悟空西语 — {titulo}</footer>
    </div>
  );
}

function CorreccionIA({ ia }) {
  const errores = ia.errores || ia.errors || [];
  return (
    <div className="ix-ia">
      <b>
        Corrección · 批改{typeof ia.puntuacion === "number" ? `: ${ia.puntuacion}/100` : ""}
      </b>
      {ia.textoCorregido ? (
        <div className="ix-modelo">
          <b>Texto corregido · 修正文本</b>
          <Texto texto={ia.textoCorregido} />
        </div>
      ) : null}
      {Array.isArray(ia.sugerencias) && ia.sugerencias.length > 0 && (
        <ul className="ix-lista">
          {ia.sugerencias.slice(0, 6).map((sg, i) => (
            <li key={i}>{typeof sg === "string" ? sg : sg.texto || sg.es || JSON.stringify(sg)}</li>
          ))}
        </ul>
      )}
      {Array.isArray(errores) && errores.length > 0 && (
        <ul className="ix-lista">
          {errores.slice(0, 12).map((e, i) => (
            <li key={i}>
              {e.original && <s>{e.original}</s>} {e.correccion && <b>→ {e.correccion}</b>} {e.explicacion && <span className="ix-zh"> {e.explicacion}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
