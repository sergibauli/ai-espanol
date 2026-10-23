import { TrophyIcon, RefreshCwIcon, BrainIcon, XIcon, CheckIcon } from "lucide-react";
import * as React from "react";
import { ALL_MODULES } from "../../data/modulos/index.js";
import { recordModuleScore } from "../../lib/progress.js";
function j(u) {
  const c = [...u];
  for (let i = c.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [c[i], c[r]] = [c[r], c[i]];
  }
  return c;
}
function FComponent({ numero, showChinese, moduloId }) {
  const r = React.useMemo(() => {
    const t = [];
    for (const s of ALL_MODULES) {
      if (!(s.numero >= numero)) {
        for (const o of s.vocabulario || []) {
          if (o.espanol && o.chino) {
            t.push({
              es: o.espanol,
              zh: o.chino,
              numero: s.numero,
            });
          }
        }
      }
    }
    return t;
  }, [numero]);
  const w = React.useCallback(() => {
    if (r.length < 4) {
      return [];
    }
    return j(r)
      .slice(0, 10)
      .map((s) => {
        const o = r.filter((d) => d.es !== s.es);
        const p = j(o)
          .slice(0, 3)
          .map((d) => d.es);
        return {
          zh: s.zh,
          correct: s.es,
          options: j([s.es, ...p]),
        };
      });
  }, [r]);
  const [n, setN] = React.useState(() => w());
  const [a, setA] = React.useState(0);
  const [l, setL] = React.useState(null);
  const [m, setM] = React.useState(0);
  const [S, setS] = React.useState(false);
  const C = () => {
    setN(w());
    setA(0);
    setL(null);
    setM(0);
    setS(false);
  };
  const z = (t) => {
    if (l !== null) {
      return;
    }
    setL(t);
    if (n[a].options[t] === n[a].correct) {
      setM((o) => o + 10);
    }
  };
  const R = () => {
    if (a + 1 >= n.length) {
      recordModuleScore(moduloId, m);
      setS(true);
    } else {
      setA((t) => t + 1);
      setL(null);
    }
  };
  if (r.length < 4) {
    return (
      <div className="text-center py-16 text-white/40 text-sm font-bold">
        Todavía no hay módulos anteriores para repasar / 还没有可复习的前置模块
      </div>
    );
  }
  if (S) {
    const t = Math.round((m / (n.length * 10)) * 100);
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <div
          className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,214,0,.1)",
            border: "2px solid rgba(255,214,0,.4)",
            boxShadow: "0 0 40px rgba(255,214,0,.2)",
          }}
        >
          <TrophyIcon
            size={36}
            style={{
              color: "#ffd600",
              filter: "drop-shadow(0 0 10px rgba(255,214,0,.5))",
            }}
          />
        </div>
        <h3 className="text-2xl font-black text-white mb-1">Repaso completado / 复习完成</h3>
        <p className="text-white/50 text-sm mb-2">Puntuación / 得分</p>
        <p
          className="text-5xl font-black mb-1"
          style={{
            color: t >= 80 ? "#39ff14" : t >= 50 ? "#ffd600" : "#ff3860",
            textShadow: "0 0 20px currentColor",
          }}
        >
          {m} / {n.length * 10}
        </p>
        <p className="text-white/40 text-sm mb-6">{t}% correcto</p>
        <button
          onClick={C}
          className="px-6 py-3 rounded-full text-white font-black text-sm transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
          style={{
            background: "linear-gradient(135deg,#ffb33b,#ff6b1a)",
            boxShadow: "0 0 30px rgba(255,179,59,.3)",
          }}
        >
          <RefreshCwIcon size={16} /> Repasar de nuevo / 再复习一次
        </button>
      </div>
    );
  }
  const x = n[a];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainIcon
            size={16}
            style={{
              color: "#ffb33b",
            }}
          />
          <span className="text-white/70 font-bold text-sm">Repaso acumulativo / 累计复习</span>
          <span className="text-white/30 text-xs font-mono">({r.length} palabras de módulos anteriores)</span>
        </div>
        <div
          className="text-sm font-black"
          style={{
            color: "#ffd600",
          }}
        >
          {m} pts
        </div>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden mb-5"
        style={{
          background: "rgba(255,255,255,.06)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((a + (l !== null ? 1 : 0)) / n.length) * 100}%`,
            background: "linear-gradient(90deg,#ffb33b,#ff6b1a)",
          }}
        />
      </div>
      <p className="text-center text-xs font-mono text-white/40 mb-4">
        {a + 1} / {n.length}
      </p>
      <div className="text-center mb-6">
        <p className="text-xs font-bold text-white/40 mb-2">¿Qué palabra significa? / 哪个单词的意思是：</p>
        <p
          className="text-3xl md:text-4xl font-black"
          style={{
            color: "#ffd600",
            textShadow: "0 0 25px rgba(255,214,0,.4)",
          }}
        >
          {x.zh}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {x.options.map((t, s) => {
          const o = t === x.correct;
          const p = l === s;
          let background = "rgba(255,255,255,.04)";
          let border = "1px solid rgba(255,255,255,.1)";
          let color = "#fff";
          if (l !== null) {
            if (o) {
              background = "rgba(57,255,20,.12)";
              border = "1px solid rgba(57,255,20,.5)";
              color = "#39ff14";
            } else if (p) {
              background = "rgba(255,56,96,.12)";
              border = "1px solid rgba(255,56,96,.5)";
              color = "#ff3860";
            } else {
              color = "rgba(255,255,255,.35)";
            }
          }
          return (
            <button
              key={s}
              onClick={() => z(s)}
              disabled={l !== null}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-bold transition-all hover:scale-[1.02] disabled:pointer-events-none"
              style={{
                background,
                border,
                color,
              }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                style={{
                  background: "rgba(255,255,255,.08)",
                }}
              >
                {l !== null && o ? (
                  <CheckIcon size={14} color="#39ff14" />
                ) : l === s && !o ? (
                  <XIcon size={14} color="#ff3860" />
                ) : (
                  String.fromCharCode(65 + s)
                )}
              </span>
              <span>{t}</span>
            </button>
          );
        })}
      </div>
      {l !== null && (
        <div
          className="text-center mt-5"
          style={{
            animation: "fadeIn .3s ease",
          }}
        >
          <p
            className="text-sm font-bold mb-3"
            style={{
              color: n[a].options[l] === x.correct ? "#39ff14" : "#ff3860",
            }}
          >
            {n[a].options[l] === x.correct ? "¡Correcto! / 正确！" : `La respuesta era: ${x.correct}`}
          </p>
          <button
            onClick={R}
            className="px-6 py-2.5 rounded-full text-white font-black text-sm transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#ffb33b,#ff6b1a)",
            }}
          >
            {a + 1 >= n.length ? "Ver resultado / 看结果" : "Siguiente / 下一个"} →
          </button>
        </div>
      )}
    </div>
  );
}
export { FComponent as default };
