import { AwardIcon, LightbulbIcon, StarIcon, FileTextIcon, CircleAlertIcon } from "lucide-react";
import * as React from "react";
const k = 10000;
const x = "dele_tokens_used";
const h = "dele_tokens_date";
const S = import.meta.env.VITE_DEEPSEEK_API_KEY ?? ""; // antes: clave hardcodeada (revocar)
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
    r.push(`DEBE TRATAR: ${s.puntosGuia.join(" · ")}`);
  }
  if (s?.minPalabras || s?.maxPalabras) {
    r.push(
      `EXTENSIÓN EXIGIDA: ${s.minPalabras ?? "—"}-${s.maxPalabras ?? "—"} palabras. Cuéntalas y, si no cumple, dilo en «sugerencias»: la falta de extensión penaliza.`,
    );
  }
  if (s?.rubrica && s.rubrica.length) {
    r.push("RÚBRICA OFICIAL DE ESTA TAREA — valora CADA criterio en su banda, no con criterios inventados:");
    for (const n of s.rubrica) {
      const m = n.bandas.map((l) => `${l.banda}: ${l.descriptor}`).join(" || ");
      r.push(`- ${n.criterio} → ${m}`);
    }
  }
  r.push(
    `CALIFICACIÓN: la puntuación final (0-100) es la nota ponderada de los criterios anteriores. Un criterio cuenta como logrado solo si alcanza su banda «Apto». El nivel de referencia es ${i}: NO exijas estructuras propias de un nivel superior, y valora como logro lo que corresponde a ${i}.`,
  );
  r.push(`FORMATO DE SALIDA: SOLO un objeto JSON válido, sin texto alrededor:
{"puntuacion":0-100,"errores":[{"original":"","correccion":"","explicacion":""}],"sugerencias":[""],"fortalezas":[""],"nivelCERL":"${i}","textoCorregido":""}`);
  r.push(
    "Las explicaciones, sugerencias y fortalezas van en chino (中文) y breves. Máximo 5 errores, 3 sugerencias y 2 fortalezas.",
  );
  if (s?.modeloRespuesta) {
    r.push(
      `MODELO DE REFERENCIA (solo para orientar tu valoración; no lo devuelvas como corrección): ${s.modeloRespuesta}`,
    );
  }
  return r.join(`
`);
}
function D(t, a) {
  return {
    puntuacion: 60,
    errores: [
      {
        original: "—",
        correccion: "—",
        explicacion: a || "无法连接到AI批改服务，请稍后再试。",
      },
    ],
    sugerencias: ["检查你的网络连接", "稍后重试"],
    fortalezas: ["文本已提交"],
    nivelCERL: t || "A2",
    textoCorregido: "（无法获取批改结果）",
  };
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
          const d = $(l, f, b);
          const c = await fetch(T, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${S}`,
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
              temperature: 0.3,
              max_tokens: 800,
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
          const data = {
            puntuacion: typeof o.puntuacion === "number" ? o.puntuacion : 60,
            errores: Array.isArray(o.errores) ? o.errores : [],
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
