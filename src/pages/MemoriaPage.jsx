import {
  BrainIcon,
  RefreshCwIcon,
  TrophyIcon,
  XIcon,
  DownloadIcon,
  Trash2Icon,
  ArrowLeftIcon,
  LayersIcon,
  TargetIcon,
  CheckIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { useFavorites } from "../lib/favorites.js";
import {
  getSrsStats,
  getDueSrsCards,
  getSrsCards,
  SRS_BOX_LABELS_ES,
  SRS_BOX_LABELS_ZH,
  removeSrsCard,
  reviewSrsCard,
  importSrsCards,
} from "../lib/srs.js";
function PComponent() {
  const { favorites } = useFavorites();
  const [n, setN] = React.useState(0);
  const [x, setX] = React.useState(false);
  const [$, set$] = React.useState(0);
  const o = React.useMemo(() => getSrsStats(), [n]);
  const c = React.useMemo(() => getDueSrsCards(), [n]);
  const i = React.useMemo(() => getSrsCards(), [n]);
  const t = c[0] ?? null;
  const d = React.useCallback(() => setN((s) => s + 1), []);
  const p = (s) => {
    if (t) {
      reviewSrsCard(t.word, s);
      setX(false);
      set$((a) => a + 1);
      d();
    }
  };
  const u = () => {
    const s = importSrsCards(
      favorites.map((a) => ({
        word: a.word,
        chinese: a.chinese,
        source: a.source,
        level: a.level,
      })),
    );
    d();
    return s;
  };
  return (
    <StarfieldBackground>
      <div className="max-w-4xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-6 text-sm font-bold"
        >
          <ArrowLeftIcon size={16} /> Volver / 返回
        </Link>
        <div className="fx-section-head mt-2">
          <span
            className="fx-kicker"
            style={{
              color: "#66e7ff",
              borderColor: "rgba(0,212,255,.35)",
              background: "rgba(0,212,255,.08)",
              boxShadow: "0 0 22px rgba(0,212,255,.14)",
            }}
          >
            <BrainIcon size={13} />
            Agente de Memorización · 记忆智能体
          </span>
          <h1 className="fx-title text-4xl md:text-6xl font-black mb-2">Repaso Espaciado</h1>
          <p className="text-white/50 text-lg">间隔重复 · memoriza de forma automática y eficiente</p>
          <div className="fx-underline" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 fx-stagger">
          {[
            {
              label: "Total / 总数",
              value: o.total,
              icon: LayersIcon,
              color: "#66e7ff",
            },
            {
              label: "Pendientes / 待复习",
              value: o.due,
              icon: TargetIcon,
              color: "#ff6b35",
            },
            {
              label: "Aprendiendo / 学习中",
              value: o.learning,
              icon: RefreshCwIcon,
              color: "#ffd600",
            },
            {
              label: "Dominadas / 已掌握",
              value: o.mastered,
              icon: TrophyIcon,
              color: "#39ff14",
            },
          ].map((s, key) => (
            <div
              key={key}
              className="fx-card fx-tilt p-4 text-center"
              data-fx-tilt-max="6"
              style={{
                "--fx-accent": s.color,
              }}
            >
              <s.icon
                size={20}
                style={{
                  color: s.color,
                  margin: "0 auto 6px",
                  filter: `drop-shadow(0 0 8px ${s.color}66)`,
                }}
              />
              <p
                className="text-3xl font-black text-white"
                style={{
                  textShadow: `0 0 18px ${s.color}44`,
                }}
              >
                {s.value}
              </p>
              <p className="text-[11px] font-bold text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mb-8">
          {t ? (
            <div
              className="fx-card fx-reveal p-6 md:p-8 text-center"
              style={{
                "--fx-accent": "#00d4ff",
                borderColor: "rgba(0,212,255,.3)",
                boxShadow: "0 0 40px rgba(0,212,255,.12)",
              }}
            >
              <p className="text-xs font-bold text-white/40 mb-1">
                Quedan {c.length} para hoy · 今天还剩 {c.length} 个
              </p>
              <div
                onClick={() => setX((s) => !s)}
                className="cursor-pointer select-none rounded-2xl py-14 my-4"
                style={{
                  background: "rgba(0,0,0,.25)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <p className="text-3xl md:text-4xl font-black text-white">{t.word}</p>
                <p className="text-white/40 text-sm mt-2">
                  {t.source} · {t.level}
                </p>
                <div className="mt-6 min-h-[2rem]">
                  {x && (
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: "#66e7ff",
                        animation: "fadeIn .3s ease",
                      }}
                    >
                      {t.chinese}
                    </p>
                  )}
                </div>
                <p className="text-white/25 text-xs mt-4">Toca para revelar / 点击显示意思</p>
              </div>
              {x && (
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => p(false)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm transition-transform hover:scale-105"
                    style={{
                      background: "rgba(255,77,77,.15)",
                      border: "1px solid rgba(255,77,77,.4)",
                      color: "#ff4d4d",
                    }}
                  >
                    <XIcon size={16} /> No lo sabía / 忘了
                  </button>
                  <button
                    onClick={() => p(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm transition-transform hover:scale-105"
                    style={{
                      background: "rgba(57,255,20,.15)",
                      border: "1px solid rgba(57,255,20,.4)",
                      color: "#39ff14",
                    }}
                  >
                    <CheckIcon size={16} /> Lo sabía / 记得
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="rounded-3xl p-10 text-center"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(57,255,20,.25)",
              }}
            >
              <TrophyIcon
                size={40}
                style={{
                  color: "#39ff14",
                  margin: "0 auto 12px",
                }}
              />
              <p className="text-white font-black text-xl mb-1">¡Todo al día! / 全部复习完成！</p>
              <p className="text-white/40 text-sm">
                {o.total === 0
                  ? "Añade palabras o importa tus favoritos para empezar."
                  : "Vuelve cuando haya nuevos repasos programados."}
              </p>
              <p className="text-white/30 text-xs mt-2">
                El agente programará el siguiente repaso automáticamente.
              </p>
            </div>
          )}
        </div>
        {favorites.length > 0 && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                const s = u();
                alert(`Importadas ${s} palabras / 已导入 ${s} 个单词`);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,.2), rgba(155,92,255,.2))",
                border: "1px solid rgba(0,212,255,.4)",
                color: "#66e7ff",
              }}
            >
              <DownloadIcon size={16} /> Importar favoritos a memoria / 导入收藏 ({favorites.length})
            </button>
          </div>
        )}
        <div
          className="rounded-3xl p-6"
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h3 className="text-white font-black mb-4">Tus palabras / 你的单词 ({i.length})</h3>
          {i.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-6">
              Aún no hay palabras. Añádelas desde los módulos o importa favoritos.
            </p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {i.map((s) => (
                <div
                  key={s.word}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-bold text-sm">{s.word}</p>
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(0,212,255,.15)",
                          color: "#66e7ff",
                          border: "1px solid rgba(0,212,255,.3)",
                        }}
                      >
                        {SRS_BOX_LABELS_ES[s.box]} · {SRS_BOX_LABELS_ZH[s.box]}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs">{s.chinese}</p>
                  </div>
                  <button
                    onClick={() => {
                      removeSrsCard(s.word);
                      d();
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2Icon
                      size={14}
                      style={{
                        color: "rgba(255,77,77,.5)",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { PComponent as default };
