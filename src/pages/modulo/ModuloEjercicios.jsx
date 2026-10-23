import * as React from "react";
const j = {
  background: "linear-gradient(145deg, rgba(25,28,55,0.95), rgba(12,14,35,0.98))",
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
  borderRadius: "1.5rem",
};
const style_1 = {
  padding: "0.85rem 1.5rem",
  borderRadius: "1rem",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.2s",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  outline: "none",
};
const k = {
  background: "rgba(255,255,255,0.08)",
  transform: "translateY(-2px) scale(1.02)",
};
function EComponent({ active }) {
  if (!active) {
    return null;
  }
  const z = Array.from(
    {
      length: 30,
    },
    (p, id) => ({
      id,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      color: ["#ffd600", "#ff00aa", "#00d4ff", "#39ff14", "#ff6b35"][Math.floor(Math.random() * 5)],
      delay: `${Math.random() * 0.5}s`,
      size: `${Math.random() * 8 + 4}px`,
    }),
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {z.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            animation: `confettiPop 1.2s ease-out ${p.delay} forwards`,
          }}
        />
      ))}
    </div>
  );
}
function ReComponent({ ejercicios, vocabulario, showChinese = false }) {
  const [v, setV] = React.useState({});
  const [n, setN] = React.useState({});
  const [F, setF] = React.useState({
    correct: 0,
    total: 0,
  });
  const [y, setY] = React.useState("completar");
  const [_, set_] = React.useState({});
  const [q, setQ] = React.useState({});
  const [x, setX] = React.useState({});
  const [$, set$] = React.useState(null);
  const L = ejercicios && typeof ejercicios === "object";
  const S = React.useMemo(() => {
    if (!L) {
      return [];
    }
    const l = [];
    if (ejercicios.completar?.length) {
      l.push({
        key: "completar",
        label: "Completar",
      });
    }
    if (ejercicios.seleccionar?.length) {
      l.push({
        key: "seleccionar",
        label: "Seleccionar",
      });
    }
    if (ejercicios.verdaderoFalso?.length) {
      l.push({
        key: "verdaderoFalso",
        label: "V/F",
      });
    }
    if (ejercicios.emparejar?.length) {
      l.push({
        key: "emparejar",
        label: "Emparejar",
      });
    }
    if (ejercicios.ordenar?.length) {
      l.push({
        key: "ordenar",
        label: "Ordenar",
      });
    }
    if (ejercicios.traducir?.length) {
      l.push({
        key: "traducir",
        label: "Traducir",
      });
    }
    if (ejercicios.ejerciciosPracticos?.length) {
      l.push({
        key: "practicos",
        label: "Prácticos",
      });
    }
    if (ejercicios.preguntasAbiertas?.length) {
      l.push({
        key: "abiertas",
        label: "Abiertas",
      });
    }
    if (ejercicios.preguntas?.length) {
      l.push({
        key: "preguntas",
        label: "Preguntas",
      });
    }
    return l;
  }, [ejercicios, L]);
  React.useEffect(() => {
    if (S.length && !S.find((l) => l.key === y)) {
      setY(S[0].key);
    }
  }, [S]);
  React.useEffect(() => {
    setX({});
    const l = D(y);
    const a = [];
    l.forEach((s, e) => {
      a.push(
        setTimeout(
          () =>
            setX((o) => ({
              ...o,
              [e]: true,
            })),
          e * 100,
        ),
      );
    });
    return () => a.forEach(clearTimeout);
  }, [y]);
  const D = (l) => {
    if (L) {
      return ejercicios[l] ?? [];
    }
    return [];
  };
  const C = (l, a, s, e) => {
    let o = false;
    if (e === "completar" || e === "traducir") {
      o = s?.toLowerCase().trim() === a?.toLowerCase().trim();
    } else if (e === "seleccionar" || e === "verdaderoFalso") {
      o = s === a;
    } else if (e === "emparejar") {
      o = s === true;
    } else if (e === "ordenar") {
      o = Array.isArray(s) && s.join(" ") === a;
    }
    setN((r) => ({
      ...r,
      [l]: o ? "¡Correcto! 🎉" : "Incorrecto. Intenta de nuevo.",
    }));
    if (o && !n[l]?.includes("¡Correcto")) {
      setF((r) => ({
        correct: r.correct + 1,
        total: r.total + 1,
      }));
      set$(l);
      setTimeout(() => set$(null), 1500);
    } else if (!o && !n[l]?.includes("Incorrecto")) {
      setF((r) => ({
        ...r,
        total: r.total + 1,
      }));
    }
  };
  const W = () =>
    (ejercicios?.completar ?? []).map((a, s) => {
      const e = `comp-${a.id ?? s}`;
      const o = v[e] ?? "";
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <EComponent active={$ === e} />
          <div className="mb-4">
            <p className="text-white font-bold text-base md:text-lg mb-1">{a.pregunta}</p>
            {showChinese && (
              <p
                className="text-sm md:text-base"
                style={{
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {a.preguntaChino}
              </p>
            )}
          </div>
          {a.pista && (
            <div
              className="mb-4 rounded-xl px-4 py-3 text-sm md:text-base"
              style={{
                background: "rgba(255,214,0,0.08)",
                border: "1px solid rgba(255,214,0,0.2)",
                color: "#ffd600",
              }}
            >
              💡 Pista: {a.pista} ({a.numeroLetras} letras)
            </div>
          )}
          <input
            type="text"
            value={o}
            onChange={(r) =>
              setV((g) => ({
                ...g,
                [e]: r.target.value,
              }))
            }
            className="w-full rounded-xl px-5 py-4 text-base md:text-lg text-white mb-4 outline-none neon-input transition-all"
            placeholder="Escribe tu respuesta..."
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div className="flex gap-3">
            <button
              onClick={() => C(e, a.respuestaCorrecta, o, "completar")}
              style={style_1}
              onMouseEnter={(r) => Object.assign(r.currentTarget.style, k)}
              onMouseLeave={(r) => Object.assign(r.currentTarget.style, style_1)}
            >
              Verificar
            </button>
            <button
              onClick={() =>
                setV((r) => ({
                  ...r,
                  [e]: a.respuestaCorrecta,
                }))
              }
              style={style_1}
              onMouseEnter={(r) => Object.assign(r.currentTarget.style, k)}
              onMouseLeave={(r) => Object.assign(r.currentTarget.style, style_1)}
            >
              Mostrar respuesta
            </button>
          </div>
          {n[e] && (
            <div
              className={`mt-4 rounded-xl px-5 py-4 text-base md:text-lg font-bold feedback-pulse ${n[e].includes("¡Correcto") ? "feedback-correct" : "feedback-wrong"}`}
              style={{
                background: n[e].includes("¡Correcto") ? "rgba(57,255,20,0.12)" : "rgba(255,0,0,0.12)",
                border: `1px solid ${n[e].includes("¡Correcto") ? "rgba(57,255,20,0.4)" : "rgba(255,0,0,0.4)"}`,
                color: n[e].includes("¡Correcto") ? "#39ff14" : "#ff4d4d",
              }}
            >
              {n[e]}
              {a.explicacion && !n[e].includes("¡Correcto") && (
                <p className="mt-2 text-sm md:text-base font-normal text-white/60">{a.explicacion}</p>
              )}
            </div>
          )}
        </div>
      );
    });
  const G = () =>
    (ejercicios?.seleccionar ?? []).map((a, s) => {
      const e = `sel-${a.id ?? s}`;
      const o = v[e];
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <EComponent active={$ === e} />
          <div className="mb-4">
            <p className="text-white font-bold text-base md:text-lg mb-1">{a.pregunta}</p>
            {showChinese && (
              <p
                className="text-sm md:text-base"
                style={{
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {a.preguntaChino}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {a.opciones?.map((r, g) => {
              const c = o === r;
              const m = c && r === a.respuestaCorrecta;
              const i = c && r !== a.respuestaCorrecta;
              return (
                <button
                  key={g}
                  onClick={() => {
                    setV((M) => ({
                      ...M,
                      [e]: r,
                    }));
                    C(e, a.respuestaCorrecta, r, "seleccionar");
                  }}
                  className="px-5 py-4 rounded-xl text-base md:text-lg text-left transition-all option-btn-3d"
                  style={{
                    background: m
                      ? "rgba(57,255,20,0.12)"
                      : i
                        ? "rgba(255,0,0,0.12)"
                        : "rgba(255,255,255,0.04)",
                    border: `1px solid ${m ? "rgba(57,255,20,0.4)" : i ? "rgba(255,0,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                    color: "#fff",
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
          {n[e] && (
            <div
              className={`mt-4 rounded-xl px-5 py-4 text-base md:text-lg font-bold feedback-pulse ${n[e].includes("¡Correcto") ? "feedback-correct" : "feedback-wrong"}`}
              style={{
                background: n[e].includes("¡Correcto") ? "rgba(57,255,20,0.12)" : "rgba(255,0,0,0.12)",
                border: `1px solid ${n[e].includes("¡Correcto") ? "rgba(57,255,20,0.4)" : "rgba(255,0,0,0.4)"}`,
                color: n[e].includes("¡Correcto") ? "#39ff14" : "#ff4d4d",
              }}
            >
              {n[e]}
              {a.explicacion && !n[e].includes("¡Correcto") && (
                <p className="mt-2 text-sm md:text-base font-normal text-white/60">{a.explicacion}</p>
              )}
            </div>
          )}
        </div>
      );
    });
  const H = () =>
    (ejercicios?.verdaderoFalso ?? []).map((a, s) => {
      const e = `vf-${a.id ?? s}`;
      const o = v[e];
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <EComponent active={$ === e} />
          <div className="mb-4">
            <p className="text-white font-bold text-base md:text-lg mb-1">{a.pregunta}</p>
            {showChinese && (
              <p
                className="text-sm md:text-base"
                style={{
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {a.preguntaChino}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            {[true, false].map((r) => {
              const g = o === r;
              const c = g && r === a.respuestaCorrecta;
              const m = g && r !== a.respuestaCorrecta;
              return (
                <button
                  key={String(r)}
                  onClick={() => {
                    setV((i) => ({
                      ...i,
                      [e]: r,
                    }));
                    C(e, a.respuestaCorrecta, r, "verdaderoFalso");
                  }}
                  className="flex-1 px-5 py-4 rounded-xl text-base md:text-lg font-bold transition-all option-btn-3d"
                  style={{
                    background: c
                      ? "rgba(57,255,20,0.12)"
                      : m
                        ? "rgba(255,0,0,0.12)"
                        : "rgba(255,255,255,0.04)",
                    border: `1px solid ${c ? "rgba(57,255,20,0.4)" : m ? "rgba(255,0,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                    color: c ? "#39ff14" : m ? "#ff4d4d" : "#fff",
                  }}
                >
                  {r ? "Verdadero" : "Falso"}
                </button>
              );
            })}
          </div>
          {n[e] && (
            <div
              className={`mt-4 rounded-xl px-5 py-4 text-base md:text-lg font-bold feedback-pulse ${n[e].includes("¡Correcto") ? "feedback-correct" : "feedback-wrong"}`}
              style={{
                background: n[e].includes("¡Correcto") ? "rgba(57,255,20,0.12)" : "rgba(255,0,0,0.12)",
                border: `1px solid ${n[e].includes("¡Correcto") ? "rgba(57,255,20,0.4)" : "rgba(255,0,0,0.4)"}`,
                color: n[e].includes("¡Correcto") ? "#39ff14" : "#ff4d4d",
              }}
            >
              {n[e]}
              {a.explicacion && !n[e].includes("¡Correcto") && (
                <p className="mt-2 text-sm md:text-base font-normal text-white/60">{a.explicacion}</p>
              )}
            </div>
          )}
        </div>
      );
    });
  const J = () =>
    (ejercicios?.emparejar ?? []).map((a, s) => {
      const e = `emp-${a.id ?? s}`;
      const o = _[e] ?? {
        left: null,
        right: null,
        matched: [],
      };
      const r = a.pares ?? [];
      const g = r.map((i) => i.izquierda);
      const c = [...r.map((i) => i.derecha)].sort(() => Math.random() - 0.5);
      const m = o.matched.length === r.length * 2;
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <EComponent active={$ === e} />
          <p className="text-white font-bold text-base md:text-lg mb-4">Empareja las palabras:</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {g.map((i, M) => {
                const f = o.matched.includes(`L-${i}`);
                const w = o.left === i;
                return (
                  <button
                    key={M}
                    disabled={f}
                    onClick={() => {
                      const b = {
                        ...o,
                        left: w ? null : i,
                      };
                      if (b.left && b.right) {
                        if (r.find((Y) => Y.izquierda === b.left && Y.derecha === b.right)) {
                          b.matched = [...b.matched, `L-${b.left}`, `R-${b.right}`];
                          C(e, true, true, "emparejar");
                        }
                        b.left = null;
                        b.right = null;
                      }
                      set_((T) => ({
                        ...T,
                        [e]: b,
                      }));
                    }}
                    className="w-full px-4 py-3 rounded-xl text-base md:text-lg transition-all option-btn-3d"
                    style={{
                      background: f
                        ? "rgba(57,255,20,0.12)"
                        : w
                          ? "rgba(0,212,255,0.15)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${f ? "rgba(57,255,20,0.4)" : w ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                      color: f ? "#39ff14" : "#fff",
                      opacity: f ? 0.6 : 1,
                    }}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              {c.map((i, M) => {
                const f = o.matched.includes(`R-${i}`);
                const w = o.right === i;
                return (
                  <button
                    key={M}
                    disabled={f}
                    onClick={() => {
                      const b = {
                        ...o,
                        right: w ? null : i,
                      };
                      if (b.left && b.right) {
                        if (r.find((Y) => Y.izquierda === b.left && Y.derecha === b.right)) {
                          b.matched = [...b.matched, `L-${b.left}`, `R-${b.right}`];
                          C(e, true, true, "emparejar");
                        }
                        b.left = null;
                        b.right = null;
                      }
                      set_((T) => ({
                        ...T,
                        [e]: b,
                      }));
                    }}
                    className="w-full px-4 py-3 rounded-xl text-base md:text-lg transition-all option-btn-3d"
                    style={{
                      background: f
                        ? "rgba(57,255,20,0.12)"
                        : w
                          ? "rgba(255,0,170,0.15)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${f ? "rgba(57,255,20,0.4)" : w ? "rgba(255,0,170,0.5)" : "rgba(255,255,255,0.08)"}`,
                      color: f ? "#39ff14" : "#fff",
                      opacity: f ? 0.6 : 1,
                    }}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
          {m && (
            <div
              className="mt-4 rounded-xl px-5 py-4 text-base md:text-lg font-bold feedback-pulse feedback-correct"
              style={{
                background: "rgba(57,255,20,0.12)",
                border: "1px solid rgba(57,255,20,0.4)",
                color: "#39ff14",
              }}
            >
              ¡Completado! 🎉
            </div>
          )}
        </div>
      );
    });
  const K = () =>
    (ejercicios?.ordenar ?? []).map((a, s) => {
      const e = `ord-${a.id ?? s}`;
      const o = q[e] ?? [];
      const g = (a.palabras ?? []).filter((c) => !o.includes(c));
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <EComponent active={$ === e} />
          <p className="text-white font-bold text-base md:text-lg mb-4">
            Ordena las palabras para formar una frase:
          </p>
          <div
            className="min-h-[3rem] rounded-xl p-4 mb-4 flex flex-wrap gap-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px dashed rgba(255,255,255,0.15)",
            }}
          >
            {o.map((c, m) => (
              <button
                key={m}
                onClick={() =>
                  setQ((i) => ({
                    ...i,
                    [e]: i[e].filter((M, f) => f !== m),
                  }))
                }
                className="px-4 py-2 rounded-lg text-base md:text-lg font-medium transition-all option-btn-3d"
                style={{
                  background: "rgba(0,212,255,0.15)",
                  border: "1px solid rgba(0,212,255,0.4)",
                  color: "#00d4ff",
                }}
              >
                {c}
              </button>
            ))}
            {o.length === 0 && (
              <span className="text-sm md:text-base text-white/30 italic">
                Haz clic en las palabras para ordenarlas...
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {g.map((c, m) => (
              <button
                key={m}
                onClick={() =>
                  setQ((i) => ({
                    ...i,
                    [e]: [...(i[e] ?? []), c],
                  }))
                }
                className="px-4 py-2 rounded-lg text-base md:text-lg font-medium transition-all option-btn-3d"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => C(e, a.respuestaCorrecta, o.join(" "), "ordenar")}
              style={style_1}
              onMouseEnter={(c) => Object.assign(c.currentTarget.style, k)}
              onMouseLeave={(c) => Object.assign(c.currentTarget.style, style_1)}
            >
              Verificar
            </button>
            <button
              onClick={() =>
                setQ((c) => ({
                  ...c,
                  [e]: [],
                }))
              }
              style={style_1}
              onMouseEnter={(c) => Object.assign(c.currentTarget.style, k)}
              onMouseLeave={(c) => Object.assign(c.currentTarget.style, style_1)}
            >
              Reiniciar
            </button>
          </div>
          {n[e] && (
            <div
              className={`mt-4 rounded-xl px-5 py-4 text-base md:text-lg font-bold feedback-pulse ${n[e].includes("¡Correcto") ? "feedback-correct" : "feedback-wrong"}`}
              style={{
                background: n[e].includes("¡Correcto") ? "rgba(57,255,20,0.12)" : "rgba(255,0,0,0.12)",
                border: `1px solid ${n[e].includes("¡Correcto") ? "rgba(57,255,20,0.4)" : "rgba(255,0,0,0.4)"}`,
                color: n[e].includes("¡Correcto") ? "#39ff14" : "#ff4d4d",
              }}
            >
              {n[e]}
              {a.explicacion && !n[e].includes("¡Correcto") && (
                <p className="mt-2 text-sm md:text-base font-normal text-white/60">{a.explicacion}</p>
              )}
            </div>
          )}
        </div>
      );
    });
  const Q = () =>
    (ejercicios?.traducir ?? []).map((a, s) => {
      const e = `trad-${a.id ?? s}`;
      const o = v[e] ?? "";
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <EComponent active={$ === e} />
          <div className="mb-4">
            <p
              className="text-base md:text-lg font-bold uppercase tracking-wider mb-1"
              style={{
                color: "#ffd600",
              }}
            >
              Traduce al español
            </p>
            <p className="text-white font-bold text-xl md:text-2xl">{a.fraseChino}</p>
          </div>
          <input
            type="text"
            value={o}
            onChange={(r) =>
              setV((g) => ({
                ...g,
                [e]: r.target.value,
              }))
            }
            className="w-full rounded-xl px-5 py-4 text-base md:text-lg text-white mb-4 outline-none neon-input transition-all"
            placeholder="Escribe la traducción..."
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div className="flex gap-3">
            <button
              onClick={() => C(e, a.respuestaEsperada, o, "traducir")}
              style={style_1}
              onMouseEnter={(r) => Object.assign(r.currentTarget.style, k)}
              onMouseLeave={(r) => Object.assign(r.currentTarget.style, style_1)}
            >
              Verificar
            </button>
            <button
              onClick={() =>
                setV((r) => ({
                  ...r,
                  [e]: a.respuestaEsperada,
                }))
              }
              style={style_1}
              onMouseEnter={(r) => Object.assign(r.currentTarget.style, k)}
              onMouseLeave={(r) => Object.assign(r.currentTarget.style, style_1)}
            >
              Mostrar respuesta
            </button>
          </div>
          {n[e] && (
            <div
              className={`mt-4 rounded-xl px-5 py-4 text-base md:text-lg font-bold feedback-pulse ${n[e].includes("¡Correcto") ? "feedback-correct" : "feedback-wrong"}`}
              style={{
                background: n[e].includes("¡Correcto") ? "rgba(57,255,20,0.12)" : "rgba(255,0,0,0.12)",
                border: `1px solid ${n[e].includes("¡Correcto") ? "rgba(57,255,20,0.4)" : "rgba(255,0,0,0.4)"}`,
                color: n[e].includes("¡Correcto") ? "#39ff14" : "#ff4d4d",
              }}
            >
              {n[e]}
              {a.explicacion && !n[e].includes("¡Correcto") && (
                <p className="mt-2 text-sm md:text-base font-normal text-white/60">{a.explicacion}</p>
              )}
            </div>
          )}
        </div>
      );
    });
  const U = () =>
    (ejercicios?.ejerciciosPracticos ?? []).map((a, s) => (
      <div
        key={`pr-${s}`}
        className="gradient-exercise-card p-6 md:p-8 mb-5"
        style={{
          ...j,
          opacity: x[s] ? 1 : 0,
          transform: x[s] ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.5s ease",
        }}
      >
        <pre className="text-sm md:text-base text-white/70 whitespace-pre-wrap">
          {JSON.stringify(a, null, 2)}
        </pre>
      </div>
    ));
  const X = () =>
    (ejercicios?.preguntasAbiertas ?? []).map((a, s) => {
      const e = `ab-${a.id ?? s}`;
      const o = v[e] ?? "";
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <div className="mb-4">
            <p className="text-white font-bold text-base md:text-lg mb-1">{a.pregunta}</p>
            {showChinese && (
              <p
                className="text-sm md:text-base"
                style={{
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {a.preguntaChino}
              </p>
            )}
          </div>
          <textarea
            value={o}
            onChange={(r) =>
              setV((g) => ({
                ...g,
                [e]: r.target.value,
              }))
            }
            className="w-full rounded-xl px-5 py-4 text-base md:text-lg text-white mb-4 outline-none resize-y min-h-[80px] neon-input transition-all"
            placeholder={a.sugerencia ?? "Escribe tu respuesta..."}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          {showChinese && a.sugerenciaChino && (
            <p className="text-sm md:text-base text-white/30 mb-2">{a.sugerenciaChino}</p>
          )}
          <button
            onClick={() =>
              setN((r) => ({
                ...r,
                [e]: "Respuesta guardada. ¡Buen trabajo!",
              }))
            }
            style={style_1}
            onMouseEnter={(r) => Object.assign(r.currentTarget.style, k)}
            onMouseLeave={(r) => Object.assign(r.currentTarget.style, style_1)}
          >
            Guardar respuesta
          </button>
          {n[e] && (
            <div
              className="mt-4 rounded-xl px-5 py-4 text-base md:text-lg font-bold feedback-pulse feedback-correct"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00d4ff",
              }}
            >
              {n[e]}
            </div>
          )}
        </div>
      );
    });
  const Z = () =>
    (ejercicios?.preguntas ?? []).map((a, s) => {
      const e = `preg-${a.id ?? s}`;
      const o = v[e] ?? "";
      return (
        <div
          key={e}
          className="gradient-exercise-card relative p-6 md:p-8 mb-5"
          style={{
            ...j,
            opacity: x[s] ? 1 : 0,
            transform: x[s] ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <div className="mb-4">
            <p className="text-white font-bold text-base md:text-lg mb-1">{a.pregunta}</p>
            {showChinese && (
              <p
                className="text-sm md:text-base"
                style={{
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {a.preguntaChino}
              </p>
            )}
          </div>
          <input
            type="text"
            value={o}
            onChange={(r) =>
              setV((g) => ({
                ...g,
                [e]: r.target.value,
              }))
            }
            className="w-full rounded-xl px-5 py-4 text-base md:text-lg text-white mb-4 outline-none neon-input transition-all"
            placeholder="Escribe tu respuesta..."
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <button
            onClick={() =>
              setN((r) => ({
                ...r,
                [e]: "Respuesta guardada.",
              }))
            }
            style={style_1}
            onMouseEnter={(r) => Object.assign(r.currentTarget.style, k)}
            onMouseLeave={(r) => Object.assign(r.currentTarget.style, style_1)}
          >
            Guardar respuesta
          </button>
          {a.respuestaSugerida && (
            <button
              onClick={() =>
                setN((r) => ({
                  ...r,
                  [e]: `Sugerencia: ${a.respuestaSugerida}`,
                }))
              }
              className="ml-2"
              style={style_1}
              onMouseEnter={(r) => Object.assign(r.currentTarget.style, k)}
              onMouseLeave={(r) => Object.assign(r.currentTarget.style, style_1)}
            >
              Ver sugerencia
            </button>
          )}
          {n[e] && (
            <div
              className="mt-4 rounded-xl px-5 py-4 text-base md:text-lg"
              style={{
                background: "rgba(255,214,0,0.08)",
                border: "1px solid rgba(255,214,0,0.2)",
                color: "#ffd600",
              }}
            >
              {n[e]}
              {showChinese && a.respuestaSugeridaChino && (
                <p className="mt-2 text-sm md:text-base text-white/50">{a.respuestaSugeridaChino}</p>
              )}
            </div>
          )}
        </div>
      );
    });
  const ee = () => {
    switch (y) {
      case "completar":
        return W();
      case "seleccionar":
        return G();
      case "verdaderoFalso":
        return H();
      case "emparejar":
        return J();
      case "ordenar":
        return K();
      case "traducir":
        return Q();
      case "practicos":
        return U();
      case "abiertas":
        return X();
      case "preguntas":
        return Z();
      default:
        return null;
    }
  };
  if (!L || S.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4 opacity-30">✏️</div>
        <p className="text-white/40 font-medium">No hay ejercicios disponibles</p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <style>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-exercise-card {
          position: relative;
          z-index: 1;
          transition: all 0.5s ease;
        }
        .gradient-exercise-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1.6rem;
          background: linear-gradient(135deg, rgba(255,214,0,0.25), rgba(255,214,0,0.08));
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .gradient-exercise-card:hover::before {
          opacity: 1;
        }
        .gradient-exercise-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 40px rgba(255,214,0,0.05);
        }
        .gradient-exercise-card:hover p,
        .gradient-exercise-card:hover span,
        .gradient-exercise-card:hover h1,
        .gradient-exercise-card:hover h2,
        .gradient-exercise-card:hover h3,
        .gradient-exercise-card:hover label {
          filter: brightness(1.1);
        }
        .neon-input:focus {
          border-color: rgba(0,212,255,0.5) !important;
          box-shadow: 0 0 20px rgba(0,212,255,0.25), 0 0 40px rgba(0,212,255,0.1), inset 0 0 12px rgba(0,212,255,0.05) !important;
          background: rgba(0,212,255,0.06) !important;
        }
        .option-btn-3d:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 24px rgba(0,0,0,0.3), 0 0 12px rgba(255,255,255,0.05);
        }
        .option-btn-3d:active {
          transform: translateY(-1px) scale(0.98);
        }
        @keyframes feedbackPulse {
          0%, 100% { box-shadow: 0 0 0 0 transparent; }
          50% { box-shadow: 0 0 24px currentColor; }
        }
        .feedback-pulse {
          animation: feedbackPulse 2s ease-in-out infinite;
        }
        .feedback-correct {
          color: #39ff14;
          text-shadow: 0 0 12px rgba(57,255,20,0.4);
        }
        .feedback-wrong {
          color: #ff4d4d;
          text-shadow: 0 0 12px rgba(255,77,77,0.4);
        }
        @keyframes confettiPop {
          0% { transform: scale(0) translateY(0); opacity: 1; }
          50% { transform: scale(1.2) translateY(-20px); opacity: 0.8; }
          100% { transform: scale(0.5) translateY(40px); opacity: 0; }
        }
        .premium-tab {
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }
        .premium-tab::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1.1rem;
          background: linear-gradient(60deg, #ff00aa, #00d4ff, #ffd600, #ff00aa);
          background-size: 300% 300%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: gradientBorder 3s ease infinite;
        }
        .premium-tab:hover::before, .premium-tab.active::before {
          opacity: 1;
        }
        .game-score-glow {
          text-shadow: 0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.25), 0 0 60px rgba(57,255,20,0.1);
          animation: scorePulse 2s ease-in-out infinite;
        }
        @keyframes scorePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      <div className="mb-8 text-center">
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-3"
          style={{
            textShadow: "0 0 30px rgba(255,107,53,0.2)",
          }}
        >
          Ejercicios
        </h1>
        <div
          className="h-1.5 w-32 mx-auto rounded-full mb-4"
          style={{
            background: "linear-gradient(90deg, #ff6b35, #ffd600)",
          }}
        />
        <div
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-base md:text-lg font-black game-score-glow"
          style={{
            background: "rgba(57,255,20,0.1)",
            border: "1px solid rgba(57,255,20,0.25)",
            color: "#39ff14",
          }}
        >
          <span>⭐</span> Puntuación: <span className="text-2xl md:text-3xl font-black">{F.correct}</span> /{" "}
          {F.total}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {S.map((l) => (
          <button
            key={l.key}
            onClick={() => setY(l.key)}
            className={`premium-tab px-6 py-3 rounded-2xl text-base md:text-lg font-bold transition-all ${y === l.key ? "active" : ""}`}
            style={{
              background: y === l.key ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)",
              border: y === l.key ? "1px solid rgba(255,107,53,0.4)" : "1px solid rgba(255,255,255,0.06)",
              color: y === l.key ? "#ff6b35" : "rgba(255,255,255,0.5)",
              backdropFilter: "blur(12px)",
              transform: y === l.key ? "translateY(-2px) scale(1.03)" : "none",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div>{ee()}</div>
    </div>
  );
}
export { ReComponent as default };
