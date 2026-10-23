import {
  SparklesIcon,
  BrainIcon,
  Gamepad2Icon,
  ArrowRightIcon,
  TrophyIcon,
  CreditCardIcon,
  KeyboardIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
const w = {
  background: "linear-gradient(145deg, rgba(25,28,55,0.95), rgba(12,14,35,0.98))",
  border: "1px solid rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
  borderRadius: "1.5rem",
};
const style = {
  padding: "0.6rem 1.2rem",
  borderRadius: "1rem",
  fontWeight: 600,
  fontSize: "0.875rem",
  cursor: "pointer",
  transition: "all 0.2s",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  outline: "none",
};
const L = {
  background: "rgba(255,255,255,0.08)",
};
function y(n) {
  const a = [...n];
  for (let o = a.length - 1; o > 0; o--) {
    const d = Math.floor(Math.random() * (o + 1));
    [a[o], a[d]] = [a[d], a[o]];
  }
  return a;
}
function MComponent({ vocabulario }) {
  const [a, setA] = React.useState(0);
  const [d, setD] = React.useState(false);
  const [t, setT] = React.useState(0);
  const [c, setC] = React.useState(0);
  const [u] = React.useState(() => y(vocabulario));
  const x = u[a] ?? null;
  const m = React.useCallback(() => {
    setD(false);
    setTimeout(() => setA((s) => (s + 1) % u.length), 250);
  }, [u.length]);
  if (x) {
    return (
      <div className="max-w-md mx-auto">
        <div className="flex justify-center gap-4 mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(57,255,20,0.12)",
              color: "#39ff14",
              border: "1px solid rgba(57,255,20,0.25)",
            }}
          >
            ✅ {t}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,0,0,0.12)",
              color: "#ff6b6b",
              border: "1px solid rgba(255,0,0,0.25)",
            }}
          >
            ❌ {c}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {a + 1} / {u.length}
          </span>
        </div>
        <div className="relative h-72 md:h-80 cursor-pointer group" onClick={() => setD((s) => !s)}>
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: d ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-3xl"
              style={{
                ...w,
                backfaceVisibility: "hidden",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{
                  color: "#00d4ff",
                }}
              >
                Español
              </div>
              <h3
                className="text-3xl md:text-4xl font-black text-white text-center"
                style={{
                  textShadow: "0 0 20px rgba(0,212,255,0.2)",
                }}
              >
                {x.espanol}
              </h3>
              <p className="mt-4 text-xs text-white/30">Toca para ver la traducción</p>
            </div>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-3xl"
              style={{
                ...w,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                border: "1px solid rgba(255,214,0,0.2)",
              }}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{
                  color: "#ffd600",
                }}
              >
                Chino
              </div>
              <h3
                className="text-3xl md:text-4xl font-black text-white text-center"
                style={{
                  textShadow: "0 0 20px rgba(255,214,0,0.2)",
                }}
              >
                {x.chino}
              </h3>
              {x.ejemplo && <p className="mt-4 text-sm text-center text-white/60 px-4">{x.ejemplo}</p>}
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => {
              setC((s) => s + 1);
              m();
            }}
            className="px-5 py-3 rounded-2xl text-sm font-bold transition-all active:scale-95"
            style={{
              background: "rgba(255,0,0,0.12)",
              border: "1px solid rgba(255,0,0,0.25)",
              color: "#ff6b6b",
            }}
          >
            No lo sabía
          </button>
          <button
            onClick={() => {
              setT((s) => s + 1);
              m();
            }}
            className="px-5 py-3 rounded-2xl text-sm font-bold transition-all active:scale-95"
            style={{
              background: "rgba(57,255,20,0.12)",
              border: "1px solid rgba(57,255,20,0.25)",
              color: "#39ff14",
            }}
          >
            Lo sabía
          </button>
        </div>
      </div>
    );
  }
  return <div className="text-center text-white/40 py-12">No hay vocabulario para flashcards</div>;
}
function OComponent({ vocabulario }) {
  const [a, setA] = React.useState(0);
  const [d, setD] = React.useState(0);
  const [t, setT] = React.useState(0);
  const [c, setC] = React.useState(null);
  const [u, setU] = React.useState([]);
  const [m] = React.useState(() => y(vocabulario));
  const s = m[a] ?? null;
  React.useEffect(() => {
    if (!s) {
      return;
    }
    const l = y(vocabulario.filter((i) => i.espanol !== s.espanol)).slice(0, 3);
    const g = y([s.espanol, ...l.map((i) => i.espanol)]);
    setU(g);
    setC(null);
  }, [s, vocabulario]);
  const p = (l) => {
    if (c) {
      return;
    }
    const g = l === s.espanol;
    setC(g ? "¡Correcto! 🎉" : "Incorrecto 😅");
    setD((i) => i + (g ? 1 : 0));
    setT((i) => i + 1);
  };
  const onClick = () => {
    setC(null);
    setA((l) => (l + 1) % m.length);
  };
  if (s) {
    return (
      <div className="max-w-md mx-auto">
        <div className="flex justify-center gap-3 mb-6">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,214,0,0.1)",
              color: "#ffd600",
              border: "1px solid rgba(255,214,0,0.25)",
            }}
          >
            ⭐ {d} / {t}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Pregunta {a + 1} / {m.length}
          </span>
        </div>
        <div
          className="p-6 md:p-8 mb-6 text-center"
          style={{
            ...w,
            border: "1px solid rgba(255,0,170,0.15)",
          }}
        >
          <div
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{
              color: "#ff00aa",
            }}
          >
            ¿Qué significa en español?
          </div>
          <h3
            className="text-3xl md:text-4xl font-black text-white mb-2"
            style={{
              textShadow: "0 0 20px rgba(255,0,170,0.15)",
            }}
          >
            {s.chino}
          </h3>
          {s.ejemplo && <p className="text-xs text-white/40 mt-2">{s.ejemplo}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {u.map((l, key) => {
            const i = c !== null;
            const j = l === s.espanol;
            const k = i && c?.includes("Incorrecto") && !j;
            return (
              <button
                key={key}
                onClick={() => p(l)}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background:
                    j && i ? "rgba(57,255,20,0.12)" : k ? "rgba(255,0,0,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${j && i ? "rgba(57,255,20,0.4)" : k ? "rgba(255,0,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: j && i ? "#39ff14" : k ? "#ff6b6b" : "#fff",
                  opacity: i && !j && !k ? 0.5 : 1,
                }}
              >
                {l}
              </button>
            );
          })}
        </div>
        {c && (
          <div className="mt-4 text-center">
            <div
              className="inline-block px-4 py-2 rounded-xl text-sm font-bold mb-3"
              style={{
                background: c.includes("¡Correcto") ? "rgba(57,255,20,0.1)" : "rgba(255,0,0,0.1)",
                border: `1px solid ${c.includes("¡Correcto") ? "rgba(57,255,20,0.3)" : "rgba(255,0,0,0.3)"}`,
                color: c.includes("¡Correcto") ? "#39ff14" : "#ff6b6b",
              }}
            >
              {c}
            </div>
            <div>
              <button
                onClick={onClick}
                style={style}
                onMouseEnter={(l) => Object.assign(l.currentTarget.style, L)}
                onMouseLeave={(l) => Object.assign(l.currentTarget.style, style)}
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  return <div className="text-center text-white/40 py-12">No hay vocabulario para el quiz</div>;
}
function FComponent({ vocabulario }) {
  const [a, setA] = React.useState(0);
  const [d, setD] = React.useState("");
  const [t, setT] = React.useState(null);
  const [c, setC] = React.useState(0);
  const [u] = React.useState(() => y(vocabulario));
  const x = u[a] ?? null;
  if (!x) {
    return <div className="text-center text-white/40 py-12">No hay vocabulario para escribir</div>;
  }
  const m = () => {
    const p = (l) => l.trim().toLocaleLowerCase("es");
    const N = p(d) === p(x.espanol);
    setT(N ? "correct" : "wrong");
    if (N) {
      setC((l) => l + 1);
    }
  };
  const s = () => {
    setA((p) => (p + 1) % u.length);
    setD("");
    setT(null);
  };
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-center gap-3 mb-6">
        <span
          className="px-4 py-2 rounded-full text-xs font-black"
          style={{
            background: "rgba(255,214,0,.1)",
            color: "#ffd600",
            border: "1px solid rgba(255,214,0,.28)",
          }}
        >
          <TrophyIcon size={13} className="inline mr-1" /> {c} aciertos
        </span>
        <span
          className="px-4 py-2 rounded-full text-xs font-black text-white/50"
          style={{
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.1)",
          }}
        >
          {a + 1} / {u.length}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-3xl p-8 text-center"
        style={{
          ...w,
          border: "1px solid rgba(70,255,154,.22)",
          boxShadow: "0 0 45px rgba(70,255,154,.08), 0 18px 60px rgba(0,0,0,.32)",
        }}
      >
        <div
          className="absolute inset-x-12 top-0 h-px"
          style={{
            background: "linear-gradient(90deg,transparent,#46ff9a,transparent)",
          }}
        />
        <p
          className="text-xs font-black uppercase tracking-[.22em] mb-3"
          style={{
            color: "#46ff9a",
          }}
        >
          Escribe la palabra en español
        </p>
        <p className="text-3xl md:text-4xl font-black text-white mb-7">{x.chino}</p>
        <input
          value={d}
          onChange={(p) => setD(p.target.value)}
          onKeyDown={(p) => p.key === "Enter" && (t ? s() : m())}
          autoFocus
          className="w-full rounded-2xl px-5 py-4 text-center text-xl font-black text-white outline-none"
          placeholder="Tu respuesta..."
          style={{
            background: "rgba(255,255,255,.055)",
            border: `2px solid ${t === "correct" ? "#46ff9a" : t === "wrong" ? "#ff5f6d" : "rgba(255,255,255,.12)"}`,
            boxShadow: t
              ? `0 0 24px ${t === "correct" ? "rgba(70,255,154,.2)" : "rgba(255,95,109,.2)"}`
              : "none",
          }}
        />
        {t && (
          <p
            className="mt-4 font-black"
            style={{
              color: t === "correct" ? "#46ff9a" : "#ff6b7a",
            }}
          >
            {t === "correct" ? "¡Perfecto! ✨" : `Respuesta: ${x.espanol}`}
          </p>
        )}
        <button
          onClick={t ? s : m}
          disabled={!d.trim()}
          className="mt-6 px-7 py-3 rounded-2xl font-black text-slate-950 transition-all hover:scale-105 disabled:opacity-35"
          style={{
            background: "linear-gradient(135deg,#46ff9a,#00d4ff)",
            boxShadow: "0 0 24px rgba(70,255,154,.2)",
          }}
        >
          {t ? "Siguiente" : "Comprobar"}
        </button>
      </div>
    </div>
  );
}
function DComponent({ vocabulario, moduloId }) {
  const [o, setO] = React.useState("flashcards");
  const f = [
    {
      id: "flashcards",
      title: "Flashcards 3D",
      subtitle: "Memoriza y voltea",
      icon: CreditCardIcon,
      color: "#00d4ff",
    },
    {
      id: "quiz",
      title: "Quiz relámpago",
      subtitle: "Elige la respuesta",
      icon: BrainIcon,
      color: "#ff00aa",
    },
    {
      id: "write",
      title: "Escribe la palabra",
      subtitle: "Entrena tu memoria",
      icon: KeyboardIcon,
      color: "#46ff9a",
    },
  ];
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div
        className="relative mb-9 text-center rounded-[2rem] p-7 md:p-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 0%,rgba(57,255,20,.13),transparent 55%),linear-gradient(145deg,rgba(20,24,68,.78),rgba(8,12,40,.88))",
          border: "1px solid rgba(70,255,154,.22)",
          boxShadow: "0 18px 70px rgba(0,0,0,.35)",
        }}
      >
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-40 rounded-full blur-3xl opacity-25"
          style={{
            background: "#39ff14",
          }}
        />
        <div
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-4"
          style={{
            background: "rgba(70,255,154,.1)",
            border: "1px solid rgba(70,255,154,.3)",
            color: "#46ff9a",
          }}
        >
          <SparklesIcon size={14} /> ZONA DE ENTRENAMIENTO · {moduloId.replace("modulo-", "MÓDULO ")}
        </div>
        <h1
          className="relative text-4xl md:text-5xl font-black text-white mb-3"
          style={{
            textShadow: "0 0 35px rgba(57,255,20,.22)",
          }}
        >
          Juega con lo que acabas de aprender
        </h1>
        <p className="relative text-white/55 max-w-2xl mx-auto">
          Todos los retos de esta zona usan exclusivamente las{" "}
          <strong className="text-white">{vocabulario.length} palabras</strong> de este módulo.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-9">
        {f.map((t) => {
          const b = o === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setO(t.id)}
              className="group relative overflow-hidden rounded-2xl p-4 text-left transition-all hover:-translate-y-1"
              style={{
                background: b ? `${t.color}18` : "rgba(255,255,255,.04)",
                border: `1px solid ${b ? `${t.color}80` : "rgba(255,255,255,.09)"}`,
                boxShadow: b ? `0 0 28px ${t.color}20` : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${t.color}18`,
                    color: t.color,
                    boxShadow: `inset 0 0 18px ${t.color}12`,
                  }}
                >
                  <Icon size={21} />
                </span>
                <span>
                  <strong className="block text-white text-sm">{t.title}</strong>
                  <small className="text-white/40">{t.subtitle}</small>
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="py-4">
        {o === "flashcards" && <MComponent vocabulario={vocabulario} />}
        {o === "quiz" && <OComponent vocabulario={vocabulario} />}
        {o === "write" && <FComponent vocabulario={vocabulario} />}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/juegos"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white/70 hover:text-white transition-all hover:scale-105"
          style={{
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <Gamepad2Icon size={17} /> Explorar todos los juegos <ArrowRightIcon size={16} />
        </Link>
      </div>
      {vocabulario.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4 opacity-30">🎮</div>
          <p className="text-white/40 font-medium">No hay vocabulario para jugar</p>
        </div>
      )}
    </div>
  );
}
export { DComponent as default };
