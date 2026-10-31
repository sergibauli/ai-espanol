import { recordTask } from "../lib/progresoDele.js";
import { construirPrompt, contarPalabras, aplicarPenalizaciones } from "../lib/correccionDele.js";
import { AwardIcon, LightbulbIcon, StarIcon, FileTextIcon, CircleAlertIcon } from "lucide-react";
import * as React from "react";
import { deepseekFetch } from "../lib/deepseekClient.js";
import { CuotaIA } from "./ui/CuotaIA.jsx";
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
// Si la IA falla no se inventa una nota: se muestra «no corregido»
function D(t, a) {
  return { fallo: true, mensaje: a || "无法连接到AI批改服务，请稍后再试。", nivelCERL: t || "A2" };
}
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
          const d = `${construirPrompt(l, f, b)}\nPALABRAS DEL TEXTO (contadas por el sistema, exactas): ${palabras}`;
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
            const e = await c.json().catch(() => ({}));
            throw new Error(e.error?.message || `API error ${c.status}`);
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
          const { puntuacion, pen, puntos, noTratados } = aplicarPenalizaciones(o, palabras, b);
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
            original: n,
            args: [m, l, f, b],
          };
          recordTask({ skill: /monolog|interacc|oral/i.test(String(m)) ? "oral" : "escritura", level: String(l || "A2").toUpperCase(), score: puntuacion, criterios: data.criterios, src: String(f || "").slice(0, 80), errores: data.errores });
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
// Reescritura guiada: el alumno corrige su texto y ve qué ha mejorado
function Reescritura({ data }) {
  const { correctText, isCorrecting } = u();
  const [txt, setTxt] = React.useState(data.original || "");
  const [nuevo, setNuevo] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  if (!data.original || !data.args) return null;
  const arreglados = (data.errores || []).filter((e) => e.original && e.original !== "—" && !txt.includes(e.original));
  const enviar = async () => {
    const r = await correctText(txt, ...data.args);
    if (r?.data) setNuevo(r.data);
  };
  return (
    <div className="corr-rew">
      {!open ? (
        <>
          <button className="wel-btn red" onClick={() => setOpen(true)}>
            ✍️ Reescribir con la corrección · 根据批改重写
          </button>
          <CuotaIA className="corr-cuota" />
        </>
      ) : (
        <>
          <h4>Reescritura guiada · 修改后重新提交</h4>
          <p className="corr-rew-tip">
            Corrige tu texto aquí. Errores ya arreglados: {arreglados.length}/{(data.errores || []).length} · 已改正的错误
          </p>
          <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={8} />
          <button className="wel-btn red" disabled={isCorrecting || txt.trim() === data.original.trim()} onClick={enviar}>
            {isCorrecting ? "Corrigiendo… · 批改中…" : "Volver a corregir · 再次批改"}
          </button>
          {nuevo && !nuevo.fallo && (
            <div className="corr-compare">
              <div className="corr-delta">
                <span>Antes · 之前 <b>{data.puntuacion}</b></span>
                <span>→</span>
                <span>Ahora · 现在 <b className={nuevo.puntuacion >= data.puntuacion ? "up" : "down"}>{nuevo.puntuacion}</b></span>
                <span className={`corr-apto ${nuevo.apto ? "si" : "no"}`}>{nuevo.apto ? "APTO" : "NO APTO"}</span>
              </div>
              {(nuevo.criterios || []).map((c, k) => {
                const prev = (data.criterios || []).find((x) => x.criterio === c.criterio);
                const d = prev ? (Number(c.nota) || 0) - (Number(prev.nota) || 0) : 0;
                return (
                  <div key={k} className="corr-crit">
                    <span><b>{c.criterio}</b></span>
                    <em className={`n${Math.max(0, Math.min(3, Number(c.nota) || 0))}`}>
                      {prev ? `${prev.nota} → ` : ""}{c.nota}/3 {d > 0 ? "▲" : d < 0 ? "▼" : ""}
                    </em>
                  </div>
                );
              })}
              {(nuevo.errores || []).length > 0 && <p className="corr-rew-tip">Quedan {nuevo.errores.length} errores por corregir · 还有错误需要修改</p>}
            </div>
          )}
          {nuevo?.fallo && <p className="corr-rew-tip">No se ha podido corregir · 暂时无法批改</p>}
        </>
      )}
    </div>
  );
}
function MComponent({ data }) {
  if (data?.fallo)
    return (
      <div className="corr-fallo">
        <b>No se ha podido corregir · 暂时无法批改</b>
        <p>{data.mensaje}</p>
        <small>No se ha puesto ninguna nota. Inténtalo de nuevo en unos minutos. · 未给出分数，请稍后重试。</small>
        <CuotaIA />
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
        <Reescritura data={data} />
      </div>
    </div>
  );
}
export { MComponent as C };
