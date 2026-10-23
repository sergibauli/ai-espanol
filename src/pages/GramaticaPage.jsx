import {
  BookOpenIcon,
  ChevronDownIcon,
  LightbulbIcon,
  ArrowLeftIcon,
  ChevronUpIcon,
  TriangleAlertIcon,
  CircleCheckBigIcon,
  EyeIcon,
  QuoteIcon,
} from "lucide-react";
import * as React from "react";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { GRAMMAR_TOPICS } from "../data/gramatica.js";
const h = ["A1", "A2", "B1", "B2"];
const p = {
  A1: {
    label: "Nivel A1",
    labelCn: "入门级",
    color: "#10b981",
    glow: "#34d399",
  },
  A2: {
    label: "Nivel A2",
    labelCn: "基础级",
    color: "#f97316",
    glow: "#fbbf24",
  },
  B1: {
    label: "Nivel B1",
    labelCn: "进阶级",
    color: "#3b82f6",
    glow: "#60a5fa",
  },
  B2: {
    label: "Nivel B2",
    labelCn: "熟练级",
    color: "#a855f7",
    glow: "#c084fc",
  },
};
const R = {
  verbos: "Verbos / 动词",
  sustantivos: "Sustantivos / 名词",
  pronombres: "Pronombres / 代词",
  conectores: "Conectores / 连接词",
  preposiciones: "Preposiciones / 介词",
  sintaxis: "Sintaxis / 句法",
  pronunciación: "Pronunciación / 发音",
  vocabulario: "Vocabulario / 词汇",
};
function T(level) {
  return level.split("-")[0].trim();
}
function QComponent() {
  const [o, setO] = React.useState(new Set());
  const [g, setG] = React.useState(new Set());
  const i = React.useMemo(() => {
    const s = {
      A1: [],
      A2: [],
      B1: [],
      B2: [],
    };
    for (const a of GRAMMAR_TOPICS) {
      const l = T(a.level);
      if (s[l]) {
        s[l].push(a);
      }
    }
    return s;
  }, []);
  const u = (s) => {
    setO((a) => {
      const l = new Set(a);
      if (l.has(s)) {
        l.delete(s);
      } else {
        l.add(s);
      }
      return l;
    });
  };
  const j = (s) => {
    setG((a) => {
      const l = new Set(a);
      if (l.has(s)) {
        l.delete(s);
      } else {
        l.add(s);
      }
      return l;
    });
  };
  const N = (s) => {
    document.getElementById(s)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const w_length = GRAMMAR_TOPICS.length;
  return (
    <StarfieldBackground>
      <div className="max-w-4xl mx-auto px-4 py-6 min-h-screen">
        <div style={{ marginBottom: 24 }}>
          <SectionHero
            icon={BookOpenIcon}
            accent="#f97316"
            eyebrow="Gramática · 语法"
            title="Gramática explicada"
            titleZh="西班牙语语法详解"
            description="Los temas clave de cada nivel, explicados con ejemplos y en chino. Toca un nivel para saltar a sus temas."
            descriptionZh="各级别的核心语法，配有例句和中文讲解。"
            stats={[
              { value: w_length, label: "temas · 个主题" },
              { value: h.length, label: "niveles · 个级别" },
            ]}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {h.map((s) => {
            const a = p[s];
            const length = i[s].length;
            return (
              <button
                key={s}
                onClick={() => N(`nivel-${s}`)}
                className="px-4 py-2 rounded-xl text-sm font-black transition-all hover:scale-105"
                style={{
                  background: `${a.color}18`,
                  border: `1px solid ${a.color}45`,
                  color: a.color,
                  boxShadow: `0 0 14px ${a.color}20`,
                }}
              >
                {s} · {length} {length === 1 ? "tema" : "temas"}
              </button>
            );
          })}
        </div>
        {h.map((s) => {
          const a = p[s];
          const l = i[s];
          if (l.length === 0) {
            return null;
          }
          return (
            <section key={s} id={`nivel-${s}`} className="mb-10 scroll-mt-24 fx-reveal">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)`,
                    boxShadow: `0 0 20px ${a.glow}50`,
                  }}
                >
                  {s}
                </span>
                <div>
                  <h2 className="text-white font-black text-xl leading-tight">
                    {a.label}{" "}
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: a.glow,
                      }}
                    >
                      {a.labelCn}
                    </span>
                  </h2>
                  <p className="text-white/40 text-xs font-bold">
                    {l.length} {l.length === 1 ? "tema" : "temas"}
                  </p>
                </div>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${a.color}40, transparent)`,
                  }}
                />
              </div>
              <div className="space-y-3">
                {l.map((t, w) => {
                  const a_color = a.color;
                  const r = o.has(t.id);
                  const x = g.has(t.id);
                  return (
                    <div
                      key={t.id}
                      className="fx-card overflow-hidden"
                      style={{
                        "--fx-accent": a_color,
                        borderColor: r ? `${a_color}40` : undefined,
                        boxShadow: r ? `0 18px 50px rgba(0,0,0,.4), 0 0 30px ${a_color}18` : undefined,
                      }}
                    >
                      <button
                        onClick={() => u(t.id)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors"
                        style={{
                          background: r ? `${a_color}10` : "transparent",
                        }}
                      >
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-black"
                          style={{
                            background: `${a_color}20`,
                            border: `1px solid ${a_color}40`,
                            color: a_color,
                            boxShadow: `0 0 12px ${a_color}25`,
                          }}
                        >
                          {w + 1}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-white font-black text-base leading-tight">
                            {t.title}
                          </span>
                          <span
                            className="block text-sm font-bold"
                            style={{
                              color: a_color,
                            }}
                          >
                            {t.titleCn}
                          </span>
                        </span>
                        {t.category && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 hidden sm:inline"
                            style={{
                              background: `${a_color}14`,
                              color: `${a_color}cc`,
                              border: `1px solid ${a_color}30`,
                            }}
                          >
                            {R[t.category] || t.category}
                          </span>
                        )}
                        {r ? (
                          <ChevronUpIcon
                            size={18}
                            style={{
                              color: a_color,
                            }}
                          />
                        ) : (
                          <ChevronDownIcon
                            size={18}
                            style={{
                              color: "rgba(255,255,255,.4)",
                            }}
                          />
                        )}
                      </button>
                      {r && (
                        <div className="px-4 pb-4 pt-1 space-y-3">
                          <div className="space-y-1.5">
                            <p className="text-white/85 text-sm leading-relaxed">{t.explanation}</p>
                            <p className="text-white/50 text-sm leading-relaxed">{t.explanationCn}</p>
                          </div>
                          <div
                            className="rounded-xl p-3"
                            style={{
                              background: "rgba(0,0,0,.25)",
                              border: `1px solid ${a_color}22`,
                            }}
                          >
                            <div
                              className="flex items-center gap-1.5 mb-1.5 text-xs font-bold"
                              style={{
                                color: a_color,
                              }}
                            >
                              <QuoteIcon size={13} /> Ejemplos / 例句
                            </div>
                            <ul className="space-y-1">
                              {t.examples.map((d, key) => (
                                <li key={key} className="text-sm">
                                  <span className="text-white/85 font-medium">{d.es}</span>
                                  <span className="text-white/40 ml-2">{d.zh}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div
                            className="rounded-xl p-3"
                            style={{
                              background: "rgba(239,68,68,.08)",
                              border: "1px solid rgba(239,68,68,.28)",
                            }}
                          >
                            <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-red-400">
                              <TriangleAlertIcon size={13} /> Error común / 常见错误
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">{t.commonError}</p>
                            <p className="text-white/45 text-sm mt-0.5 leading-relaxed">{t.commonErrorCn}</p>
                          </div>
                          <div
                            className="rounded-xl p-3"
                            style={{
                              background: "rgba(34,197,94,.08)",
                              border: "1px solid rgba(34,197,94,.28)",
                            }}
                          >
                            <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-green-400">
                              <LightbulbIcon size={13} /> Consejo / 小贴士
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">{t.tip}</p>
                            <p className="text-white/45 text-sm mt-0.5 leading-relaxed">{t.tipCn}</p>
                          </div>
                          {t.practice && (
                            <div
                              className="rounded-xl p-3"
                              style={{
                                background: "rgba(59,130,246,.08)",
                                border: "1px solid rgba(59,130,246,.3)",
                              }}
                            >
                              <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-blue-400">
                                <CircleCheckBigIcon size={13} /> Práctica rápida / 快速练习
                              </div>
                              <p className="text-white/85 text-sm font-medium">{t.practice.question}</p>
                              <p className="text-white/45 text-sm mb-2">{t.practice.questionCn}</p>
                              <button
                                onClick={() => j(t.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                style={{
                                  background: "rgba(59,130,246,.18)",
                                  border: "1px solid rgba(59,130,246,.4)",
                                  color: "#93c5fd",
                                }}
                              >
                                <EyeIcon size={13} />{" "}
                                {x ? "Ocultar respuesta / 隐藏答案" : "Ver respuesta / 看答案"}
                              </button>
                              {x && (
                                <p className="mt-2 text-sm font-bold text-blue-300">
                                  {t.practice.answer}{" "}
                                  <span className="text-white/45 font-medium">{t.practice.answerCn}</span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </StarfieldBackground>
  );
}
export { QComponent as default };
