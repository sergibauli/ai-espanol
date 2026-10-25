import { AwardIcon, LightbulbIcon, StarIcon, FileTextIcon, CircleAlertIcon } from "lucide-react";
import * as React from "react";
import { deepseekFetch } from "../lib/deepseekClient.js";
const k = 10000;
const x = "dele_tokens_used";
const h = "dele_tokens_date";
const T = "https://api.deepseek.com/chat/completions";
const model = "deepseek-chat";
function R() {
  const t = new Date().toDateString();
  if (localStorage.getItem(h) !== t) {
    return (localStorage.setItem(h, t), localStorage.setItem(x, "0"), 0);
  }
  return Number(localStorage.getItem(x) || "0");
}
function useO() {
  const [t, setT] = React.useState(R());
  return {
    remainingTokens: Math.max(0, k - t),
    consumeTokens: () => {
      const r = t + 1;
      setT(r);
      localStorage.setItem(x, String(r));
    },
  };
}
function $(t, a, s) {
  const i = (s?.nivel || t || "A2").toUpperCase();
  const r = [];
  r.push(
    `Eres corrector oficial de exámenes DELE del Instituto Cervantes. Corriges una prueba de producción del nivel ${i} (MCER).`,
  );
  if (a) {
    r.push(`TAREA: ${a}`);
  }
  if (s?.genero) {
    r.push(`GÉNERO DISCURSIVO: ${s.genero}`);
  }
  if (s?.situacion) {
    r.push(`SITUACIÓN: ${s.situacion}`);
  }
  if (s?.destinatario) {
    r.push(`DESTINATARIO: ${s.destinatario}`);
  }
  if (s?.proposito) {
    r.push(`PROPÓSITO: ${s.proposito}`);
  }
  if (s?.puntosGuia && s.puntosGuia.length) {
    r.push(`DEBE TRATAR (puntos obligatorios del enunciado): ${s.puntosGuia.join(" · ")}`);
    r.push("Para CADA punto obligatorio indica en «puntos» si está «tratado», «incompleto» o «no tratado». Un punto no tratado es un fallo grave de adecuación.");
  }
  if (s?.minPalabras || s?.maxPalabras) {
    r.push(
      `EXTENSIÓN EXIGIDA: ${s.minPalabras ?? "—"}-${s.maxPalabras ?? "—"} palabras (el sistema te da el recuento exacto; no lo recalcules). Si no cumple, dilo en «sugerencias».`,
    );
  }
  if (s?.rubrica && s.rubrica.length) {
    r.push("RÚBRICA OFICIAL DE ESTA TAREA — valora CADA criterio en su banda, no con criterios inventados, y devuélvelo en «criterios»:");
    for (const n of s.rubrica) {
      const m = n.bandas.map((l) => `${l.banda}: ${l.descriptor}`).join(" || ");
      r.push(`- ${n.criterio} → ${m}`);
    }
  }
  r.push(
    `CALIFICACIÓN: la puntuación final (0-100) es la nota ponderada de los criterios anteriores. Un criterio cuenta como logrado solo si alcanza su banda «Apto». El nivel de referencia es ${i}: NO exijas estructuras propias de un nivel superior, y valora como logro lo que corresponde a ${i}.`,
  );
  if (!(s?.rubrica && s.rubrica.length)) {
    r.push("Sin rúbrica específica: usa los criterios DELE «Adecuación a la tarea», «Coherencia y cohesión», «Corrección gramatical y léxica» y «Alcance», cada uno de 0 a 3.");
  }
  r.push(
    "Sé tan exigente como un examinador oficial: no regales puntos. Un texto que no responde a la tarea, que se sale del tema o que tiene errores que impiden entenderlo no puede aprobar. Apto = 60 o más.",
  );
  r.push(`FORMATO DE SALIDA: SOLO un objeto JSON válido, sin texto alrededor:
{"puntuacion":0-100,"apto":true,"criterios":[{"criterio":"","banda":"","nota":0,"comentario":""}],"puntos":[{"punto":"","estado":"tratado"}],"errores":[{"original":"","correccion":"","tipo":"gramática|vocabulario|ortografía|registro|coherencia","explicacion":""}],"sugerencias":[""],"fortalezas":[""],"nivelCERL":"${i}","textoCorregido":""}`);
  r.push(
    "Comentarios, explicaciones, sugerencias y fortalezas en chino (中文) y breves. Hasta 10 errores (los más importantes, de más a menos grave), 3 sugerencias y 2 fortalezas.",
  );
  if (s?.modeloRespuesta) {
    r.push(
      `MODELO DE REFERENCIA (solo para orientar tu valoración; no lo devuelvas como corrección): ${s.modeloRespuesta}`,
    );
  }
  return r.join(`
`);
}
// Si la IA falla no se inventa una nota: se muestra «no corregido»
function D(t, a) {
  return { fallo: true, mensaje: a || "无法连接到AI批改服务，请稍后再试。", nivelCERL: t || "A2" };
}
const contarPalabras = (txt) => (String(txt || "").match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
function L(t) {
  const a = t.indexOf("{");
  const s = t.lastIndexOf("}");
  if (a !== -1 && s !== -1 && s > a) {
    return t.slice(a, s + 1);
  }
  return null;
}
export function u() {
  const [isCorrecting, setIsCorrecting] = React.useState(false);
  const { remainingTokens, consumeTokens } = useO();
  return {
    correctText: React.useCallback(
      async (n, m, l, f, b) => {
        if (remainingTokens <= 0) {
          return {
            limitReached: true,
          };
        }
        setIsCorrecting(true);
        consumeTokens();
        try {
          const palabras = contarPalabras(n);
          const d = `${$(l, f, b)}\nPALABRAS DEL TEXTO (contadas por el sistema, exactas): ${palabras}`;
          const c = await deepseekFetch(T, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages: [
                {
                  role: "system",
                  content: d,
                },
                {
                  role: "user",
                  content: n,
                },
              ],
              temperature: 0.2,
              max_tokens: 1600,
            }),
          });
          if (!c.ok) {
            throw new Error(`API error ${c.status}`);
          }
          const u = (await c.json())?.choices?.[0]?.message?.content;
          if (!u) {
            throw new Error("Empty response from API");
          }
          let o = null;
          try {
            o = JSON.parse(u);
          } catch {
            const g = L(u);
            if (g) {
              try {
                o = JSON.parse(g);
              } catch {}
            }
          }
          if (!o) {
            throw new Error("Failed to parse JSON response");
          }
          if (typeof o.puntuacion !== "number") {
            throw new Error("Respuesta sin nota");
          }
          // Penalizaciones calculadas por el sistema (no dependen de la IA)
          const pen = [];
          let menos = 0;
          if (b?.minPalabras && palabras < b.minPalabras) {
            const p = Math.min(30, Math.round(((b.minPalabras - palabras) / b.minPalabras) * 40));
            menos += p;
            pen.push(`Extensión insuficiente: ${palabras}/${b.minPalabras} palabras (−${p}) · 字数不足`);
          }
          if (b?.maxPalabras && palabras > b.maxPalabras * 1.15) {
            menos += 10;
            pen.push(`Demasiado largo: ${palabras}/${b.maxPalabras} palabras (−10) · 字数超出`);
          }
          const puntos = Array.isArray(o.puntos) ? o.puntos.filter((x) => x && x.punto) : [];
          const noTratados = puntos.filter((x) => /no tratado/i.test(x.estado)).length;
          const incompletos = puntos.filter((x) => /incompleto/i.test(x.estado)).length;
          if (noTratados || incompletos) {
            const p = Math.min(35, noTratados * 10 + incompletos * 4);
            menos += p;
            pen.push(`Puntos del enunciado: ${noTratados} sin tratar, ${incompletos} incompletos (−${p}) · 题目要点未完成`);
          }
          const puntuacion = Math.max(0, Math.min(100, Math.round(o.puntuacion - menos)));
          const data = {
            puntuacion,
            apto: puntuacion >= 60 && noTratados === 0,
            palabras,
            rango: b?.minPalabras || b?.maxPalabras ? `${b?.minPalabras ?? "—"}–${b?.maxPalabras ?? "—"}` : "",
            penalizaciones: pen,
            criterios: Array.isArray(o.criterios) ? o.criterios.filter((x) => x && x.criterio) : [],
            puntos,
            errores: Array.isArray(o.errores) ? o.errores.slice(0, 10) : [],
            sugerencias: Array.isArray(o.sugerencias) ? o.sugerencias : [],
            fortalezas: Array.isArray(o.fortalezas) ? o.fortalezas : [],
            nivelCERL: o.nivelCERL || l || "A2",
            textoCorregido: o.textoCorregido || "",
          };
          setIsCorrecting(false);
          return {
            data,
          };
        } catch (error) {
          setIsCorrecting(false);
          const c = error instanceof Error ? error.message : "Unknown error";
          return {
            data: D(l, `AI服务暂时不可用 (${c})`),
          };
        }
      },
      [remainingTokens, consumeTokens],
    ),
    isCorrecting,
    remainingTokens,
  };
}
function MComponent({ data }) {
  if (data?.fallo)
    return (
      <div className="corr-fallo">
        <b>No se ha podido corregir · 暂时无法批改</b>
        <p>{data.mensaje}</p>
        <small>No se ha puesto ninguna nota. Inténtalo de nuevo en unos minutos. · 未给出分数，请稍后重试。</small>
      </div>
    );
  const data_puntuacion = data.puntuacion;
  const color = data_puntuacion >= 80 ? "#22c55e" : data_puntuacion >= 60 ? "#f59e0b" : "#ef4444";
  const background =
    data_puntuacion >= 80
      ? "rgba(34,197,94,0.1)"
      : data_puntuacion >= 60
        ? "rgba(245,158,11,0.1)"
        : "rgba(239,68,68,0.1)";
  return (
    <div
      className="rounded-3xl overflow-hidden mt-4"
      style={{
        background: "linear-gradient(135deg, rgba(168,85,247,0.06), rgba(0,0,0,0.1))",
        border: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)",
        }}
      />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background,
              border: `2px solid ${color}40`,
            }}
          >
            <AwardIcon
              size={28}
              style={{
                color,
              }}
            />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl font-black"
                style={{
                  color,
                }}
              >
                {data_puntuacion}
              </span>
              <span className="text-white/30">/100</span>
            </div>
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{
                color: `${color}80`,
              }}
            >
              {data_puntuacion >= 80
                ? "Excelente / 优秀"
                : data_puntuacion >= 60
                  ? "Aprobado / 及格"
                  : "Necesita practica / 需练习"}
            </span>
          </div>
        </div>
        <div className="corr-resumen">
          <span className={`corr-apto ${data.apto ? "si" : "no"}`}>{data.apto ? "APTO · 通过" : "NO APTO · 未通过"}</span>
          {data.palabras != null && (
            <span className="corr-chip">
              {data.palabras} palabras{data.rango ? ` (exigidas ${data.rango})` : ""} · 字数
            </span>
          )}
        </div>
        {(data.penalizaciones || []).length > 0 && (
          <ul className="corr-pen">
            {data.penalizaciones.map((t, k) => (
              <li key={k}>{t}</li>
            ))}
          </ul>
        )}
        {(data.criterios || []).length > 0 && (
          <div className="corr-criterios">
            <h4>Criterios DELE · 评分标准</h4>
            {data.criterios.map((c, k) => (
              <div key={k} className="corr-crit">
                <span>
                  <b>{c.criterio}</b>
                  {c.comentario && <small>{c.comentario}</small>}
                </span>
                <em className={`n${Math.max(0, Math.min(3, Number(c.nota) || 0))}`}>
                  {c.banda || `${c.nota}/3`}
                </em>
              </div>
            ))}
          </div>
        )}
        {(data.puntos || []).length > 0 && (
          <div className="corr-puntos">
            <h4>Puntos del enunciado · 题目要点</h4>
            {data.puntos.map((pt, k) => (
              <div key={k} className={`corr-punto ${/no tratado/i.test(pt.estado) ? "no" : /incompleto/i.test(pt.estado) ? "medio" : "si"}`}>
                <i>{/no tratado/i.test(pt.estado) ? "✗" : /incompleto/i.test(pt.estado) ? "◐" : "✓"}</i> {pt.punto}
              </div>
            ))}
          </div>
        )}
        {data.textoCorregido && (
          <div
            className="mb-5 rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,0,0,0.1))",
              border: "1px solid rgba(16,185,129,0.25)",
              boxShadow: "0 0 20px rgba(16,185,129,0.1), inset 0 0 30px rgba(16,185,129,0.04)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, #10b981, transparent)",
              }}
            />
            <h4
              className="flex items-center gap-2 text-sm font-bold mb-2"
              style={{
                color: "#34d399",
              }}
            >
              <FileTextIcon size={14} /> Texto corregido / 修正文本
            </h4>
            <p className="text-white/80 text-sm leading-relaxed font-medium whitespace-pre-line">
              {data.textoCorregido}
            </p>
          </div>
        )}
        {data.errores.length > 0 && (
          <div className="mb-5">
            <h4
              className="flex items-center gap-2 text-sm font-bold mb-3"
              style={{
                color: "#f87171",
              }}
            >
              <CircleAlertIcon size={14} /> Errores / 错误
            </h4>
            <div className="space-y-2">
              {data.errores.map((r, key) => (
                <div
                  key={key}
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.12)",
                  }}
                >
                  <p className="text-red-400/60 text-xs line-through mb-1">{r.original}</p>
                  <p className="text-green-400 text-sm font-bold">{r.correccion}</p>
                  {r.tipo && <span className="corr-tipo">{r.tipo}</span>}
                  <p className="text-white/30 text-xs mt-1">{r.explicacion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.sugerencias.length > 0 && (
          <div className="mb-5">
            <h4
              className="flex items-center gap-2 text-sm font-bold mb-3"
              style={{
                color: "#fbbf24",
              }}
            >
              <LightbulbIcon size={14} /> Sugerencias / 建议
            </h4>
            <ul className="space-y-1.5">
              {data.sugerencias.map((r, n) => (
                <li key={n} className="flex items-start gap-2 text-sm text-white/60">
                  <span className="text-amber-400/60 mt-0.5">{n + 1}.</span> {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.fortalezas.length > 0 && (
          <div>
            <h4
              className="flex items-center gap-2 text-sm font-bold mb-3"
              style={{
                color: "#34d399",
              }}
            >
              <StarIcon size={14} /> Fortalezas / 优点
            </h4>
            <ul className="space-y-1.5">
              {data.fortalezas.map((r, n) => (
                <li key={n} className="flex items-start gap-2 text-sm text-white/60">
                  <span className="text-emerald-400/60 mt-0.5">{n + 1}.</span> {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className="mt-4 pt-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-xs text-white/20">
            Nivel CERL: <span className="text-white/40 font-bold">{data.nivelCERL}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
export { MComponent as C };
