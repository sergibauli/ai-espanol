import { RefreshCwIcon, XIcon, ShuffleIcon, CheckIcon } from "lucide-react";
import * as React from "react";
function h(o) {
  const t = [...o];
  for (let n = t.length - 1; n > 0; n--) {
    const p = Math.floor(Math.random() * (n + 1));
    [t[n], t[p]] = [t[p], t[n]];
  }
  return t;
}
function E(vocabulario) {
  const t = vocabulario.filter((s) => s.espanol && s.chino);
  if (t.length < 4) {
    return {
      seleccionar: [],
      completar: [],
      emparejar: [],
    };
  }
  const n = h(t);
  const p = Math.min(8, n.length);
  const seleccionar = n.slice(0, p).map((s, m) => {
    const f = h(t.filter((l) => l.chino !== s.chino))
      .slice(0, 3)
      .map((l) => l.chino);
    return {
      id: `gs${m}`,
      pregunta: `¿Qué significa "${s.espanol}"?`,
      preguntaChino: `"${s.espanol}" 是什么意思？`,
      opciones: h([s.chino, ...f]),
      respuestaCorrecta: s.chino,
      explicacion: `${s.espanol} = ${s.chino}`,
    };
  });
  const b = t.filter((s) => s.ejemplo && s.ejemplo.toLowerCase().includes(s.espanol.toLowerCase()));
  const completar = h(b)
    .slice(0, Math.min(6, b.length))
    .map((s, m) => {
      const l = s.ejemplo.replace(new RegExp(s.espanol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____");
      return {
        id: `gc${m}`,
        pregunta: `Completa: ${l}`,
        preguntaChino: `填空：${l}`,
        respuestaCorrecta: s.espanol,
        explicacion: `${s.espanol} = ${s.chino}`,
      };
    });
  const pares = h(t)
    .slice(0, Math.min(8, t.length))
    .map((s) => ({
      izquierda: s.espanol,
      derecha: s.chino,
    }));
  return {
    seleccionar,
    completar,
    emparejar: [
      {
        id: "ge1",
        pares,
      },
    ],
  };
}
const k = {
  cyan: "#00d4ff",
  magenta: "#ff00aa",
  green: "#39ff14",
  orange: "#ff6b35",
};
function OComponent({ vocabulario }) {
  const [t, setT] = React.useState(() => E(vocabulario));
  const [p, setP] = React.useState({});
  const [b, setB] = React.useState({});
  const [N, setN] = React.useState({});
  const [m, setM] = React.useState({});
  const onClick = React.useCallback(() => {
    setT(E(vocabulario));
    setP({});
    setB({});
    setN({});
    setM({});
  }, [vocabulario]);
  if (vocabulario.length < 4) {
    return (
      <div className="text-center py-16 text-white/40 text-sm font-bold">
        Se necesitan al menos 4 palabras / 至少需要4个单词
      </div>
    );
  }
  const { seleccionar, completar, emparejar } = t;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ShuffleIcon
            size={16}
            style={{
              color: k.orange,
            }}
          />
          <span className="text-white/70 font-bold text-sm">Ejercicios generados / 自动生成练习</span>
          <span className="text-white/30 text-xs font-mono">(mismo tema, nuevo cada vez)</span>
        </div>
        <button
          onClick={onClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-black text-sm transition-transform hover:scale-105"
          style={{
            background: "linear-gradient(135deg,#ff6b35,#ff00aa)",
            boxShadow: "0 0 25px rgba(255,107,53,.35)",
          }}
        >
          <RefreshCwIcon size={16} /> Regenerar / 重新生成
        </button>
      </div>
      <div>
        <h3
          className="text-white font-black mb-3"
          style={{
            color: k.cyan,
          }}
        >
          1 · Elige el significado / 选择意思
        </h3>
        <div className="space-y-3">
          {seleccionar.map((a, c) => {
            const r = p[a.id];
            return (
              <div
                key={a.id}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <p className="text-white font-bold mb-2">
                  {c + 1}. {a.pregunta}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {a.opciones.map((i, d) => {
                    const g = r === d;
                    const y = i === a.respuestaCorrecta;
                    let background = "rgba(255,255,255,.04)";
                    let border = "1px solid rgba(255,255,255,.08)";
                    let color = "#fff";
                    if (r !== undefined) {
                      if (y) {
                        background = "rgba(57,255,20,.12)";
                        border = "1px solid rgba(57,255,20,.5)";
                        color = "#39ff14";
                      } else if (g) {
                        background = "rgba(255,77,77,.12)";
                        border = "1px solid rgba(255,77,77,.5)";
                        color = "#ff4d4d";
                      } else {
                        color = "rgba(255,255,255,.35)";
                      }
                    }
                    return (
                      <button
                        key={d}
                        disabled={r !== undefined}
                        onClick={() =>
                          setP((M) => ({
                            ...M,
                            [a.id]: d,
                          }))
                        }
                        className="px-3 py-2.5 rounded-xl text-sm font-bold transition-all disabled:pointer-events-none"
                        style={{
                          background,
                          border,
                          color,
                        }}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {completar.length > 0 && (
        <div>
          <h3
            className="text-white font-black mb-3"
            style={{
              color: k.green,
            }}
          >
            2 · Completa la frase / 填空
          </h3>
          <div className="space-y-3">
            {completar.map((a, c) => {
              const r = b[a.id] ?? "";
              const i = N[a.id];
              const d = r.trim().toLowerCase() === a.respuestaCorrecta.toLowerCase();
              return (
                <div
                  key={a.id}
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <p className="text-white/80 mb-2">
                    {c + 1}. {a.pregunta}
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      value={r}
                      onChange={(g) =>
                        setB((y) => ({
                          ...y,
                          [a.id]: g.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2.5 rounded-xl text-white font-bold outline-none"
                      style={{
                        background: "rgba(0,0,0,.3)",
                        border: i
                          ? d
                            ? "1px solid rgba(57,255,20,.5)"
                            : "1px solid rgba(255,77,77,.5)"
                          : "1px solid rgba(255,255,255,.15)",
                      }}
                      placeholder="Escribe la palabra / 输入单词"
                    />
                    <button
                      onClick={() =>
                        setN((g) => ({
                          ...g,
                          [a.id]: true,
                        }))
                      }
                      className="px-4 py-2.5 rounded-xl text-sm font-black text-white transition-transform hover:scale-105"
                      style={{
                        background: "rgba(0,212,255,.15)",
                        border: "1px solid rgba(0,212,255,.4)",
                      }}
                    >
                      Comprobar
                    </button>
                  </div>
                  {i && (
                    <p
                      className="text-sm mt-2 font-bold"
                      style={{
                        color: d ? "#39ff14" : "#ff4d4d",
                      }}
                    >
                      {d ? (
                        <span className="flex items-center gap-1">
                          <CheckIcon size={14} /> ¡Correcto!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XIcon size={14} /> {a.respuestaCorrecta}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>
        <h3
          className="text-white font-black mb-3"
          style={{
            color: k.magenta,
          }}
        >
          3 · Tarjetas / 单词卡片（点击翻转）
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {emparejar[0]?.pares.map((a, c) => {
            const r = m[`${a.izquierda}-${c}`];
            return (
              <button
                key={c}
                onClick={() =>
                  setM((i) => ({
                    ...i,
                    [`${a.izquierda}-${c}`]: !i[`${a.izquierda}-${c}`],
                  }))
                }
                className="aspect-[4/3] rounded-2xl flex items-center justify-center text-center px-2 font-bold transition-all hover:scale-105"
                style={{
                  background: r ? "rgba(255,0,170,.12)" : "rgba(255,255,255,.04)",
                  border: r ? "1px solid rgba(255,0,170,.4)" : "1px solid rgba(255,255,255,.1)",
                  color: r ? "#ff00aa" : "#fff",
                  transformStyle: "preserve-3d",
                }}
              >
                {r ? a.derecha : a.izquierda}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export { OComponent as default };
