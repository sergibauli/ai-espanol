import { Volume2Icon, HeartIcon, BrainIcon } from "lucide-react";
import * as React from "react";
import { useFavorites } from "../../lib/favorites.js";
import { hasSrsCard, removeSrsCard, addSrsCard } from "../../lib/srs.js";
const d = ["#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#ff6b35"];
function V(r) {
  if (!("speechSynthesis" in window)) {
    return;
  }
  const n = new SpeechSynthesisUtterance(r);
  n.lang = "es-ES";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(n);
}
function PComponent({ vocabulario, showChinese = false, level = "A1" }) {
  const [l, setL] = React.useState("");
  const [m, setM] = React.useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [A, setA] = React.useState(0);
  const f = React.useMemo(() => {
    if (!l.trim()) {
      return vocabulario;
    }
    const e = l.toLowerCase();
    return vocabulario.filter(
      (s) =>
        s.espanol?.toLowerCase().includes(e) ||
        s.chino?.toLowerCase().includes(e) ||
        s.ejemplo?.toLowerCase().includes(e),
    );
  }, [vocabulario, l]);
  const v = (e, espanol) => {
    setM(e);
    V(espanol);
    setTimeout(() => setM(null), 1200);
  };
  const k = (e) => {
    if (isFavorite(e.espanol)) {
      removeFavorite(e.espanol);
    } else {
      addFavorite(e.espanol, e.chino, "Vocabulario", level);
    }
  };
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <style>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes neonPulseCard {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.25); }
          50% { box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 0 30px var(--card-glow); }
        }
        .vocab-card {
          position: relative;
          z-index: 1;
          transition: all 0.5s ease-out;
        }
        .vocab-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1.6rem;
          background: linear-gradient(60deg, var(--card-color), var(--card-accent), var(--card-color));
          background-size: 300% 300%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: gradientBorder 3s ease infinite;
        }
        .vocab-card:hover::before {
          opacity: 1;
        }
        .vocab-card:hover {
          transform: translateY(-8px) scale(1.02) rotateX(2deg);
          box-shadow: 0 20px 48px rgba(0,0,0,0.35), 0 0 40px var(--card-glow);
        }
      `}</style>
      <div className="fx-section-head mb-10">
        <h1 className="fx-title text-4xl md:text-5xl font-black mb-3">Vocabulario</h1>
        <p
          className="text-base md:text-lg font-bold"
          style={{
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {vocabulario.length} palabras · Practica y escucha
        </p>
        <div className="fx-underline" />
      </div>
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            value={l}
            onChange={(e) => setL(e.target.value)}
            placeholder="Buscar palabra..."
            className="w-full rounded-2xl px-5 py-3.5 text-base md:text-lg text-white placeholder-white/30 outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
              e.currentTarget.style.background = "rgba(0,212,255,0.06)";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,255,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xl">🔍</span>
        </div>
      </div>
      <div key={l} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 fx-stagger">
        {f.map((e, s) => {
          const x = e.id ?? s;
          const c = m === x;
          const t = isFavorite(e.espanol);
          const o = hasSrsCard(e.espanol);
          const b = d[s % d.length];
          const N = d[(s + 2) % d.length];
          return (
            <div
              key={x}
              className="vocab-card fx-tilt group relative rounded-3xl p-6 md:p-8"
              data-fx-tilt-max="4"
              style={{
                background: "linear-gradient(145deg, rgba(25,28,55,0.95), rgba(12,14,35,0.98))",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
                "--card-color": b,
                "--card-accent": N,
                "--card-glow": `${b}25`,
              }}
            >
              <div
                className="absolute top-0 left-6 right-6 h-[2.5px] rounded-full transition-all"
                style={{
                  background: `linear-gradient(90deg, ${b}, transparent)`,
                  opacity: 0.7,
                }}
              />
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1">{e.espanol}</h3>
                  {showChinese && (
                    <p
                      className="text-lg md:text-xl font-bold"
                      style={{
                        color: "#ffd600",
                        textShadow: "0 0 12px rgba(255,214,0,0.2)",
                      }}
                    >
                      {e.chino}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => v(x, e.espanol)}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
                    style={{
                      background: c ? "rgba(0,212,255,0.25)" : "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    title="Escuchar"
                  >
                    <Volume2Icon
                      size={20}
                      className="transition-all"
                      style={{
                        transform: c ? "scale(1.2)" : "scale(1)",
                        filter: c ? "drop-shadow(0 0 6px #00d4ff)" : "none",
                        color: c ? "#00d4ff" : "rgba(255,255,255,0.7)",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => k(e)}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
                    style={{
                      background: t ? "rgba(255,0,100,0.15)" : "rgba(255,255,255,0.06)",
                      border: `1px solid ${t ? "rgba(255,0,100,0.3)" : "rgba(255,255,255,0.1)"}`,
                    }}
                    title={t ? "Quitar de favoritos" : "Añadir a favoritos"}
                  >
                    <HeartIcon
                      size={20}
                      className="transition-all"
                      fill={t ? "#ff4d8a" : "none"}
                      style={{
                        color: t ? "#ff4d8a" : "rgba(255,255,255,0.7)",
                        filter: t ? "drop-shadow(0 0 8px rgba(255,77,138,0.5))" : "none",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => {
                      if (o) {
                        removeSrsCard(e.espanol);
                      } else {
                        addSrsCard(e.espanol, e.chino, "Vocabulario", level);
                      }
                      setA((S) => S + 1);
                    }}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
                    style={{
                      background: o ? "rgba(0,212,255,0.18)" : "rgba(255,255,255,0.06)",
                      border: `1px solid ${o ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.1)"}`,
                    }}
                    title={o ? "En memoria" : "Añadir a memoria (SRS)"}
                  >
                    <BrainIcon
                      size={20}
                      style={{
                        color: o ? "#66e7ff" : "rgba(255,255,255,0.7)",
                        filter: o ? "drop-shadow(0 0 6px rgba(0,212,255,0.6))" : "none",
                      }}
                    />
                  </button>
                </div>
              </div>
              {e.ejemplo && (
                <div
                  className="rounded-xl p-4 mt-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <p
                    className="text-sm font-bold uppercase tracking-wider mb-1"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    Ejemplo
                  </p>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium">
                    {e.ejemplo}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {f.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4 opacity-30">🔍</div>
          <p className="text-white/40 font-medium">No se encontraron palabras</p>
        </div>
      )}
    </div>
  );
}
export { PComponent as default };
