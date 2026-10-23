import {
  XIcon,
  SparklesIcon,
  Volume2Icon,
  PenLineIcon,
  BookOpenIcon,
  MicIcon,
  LightbulbIcon,
  ZapIcon,
  StarIcon,
  HeartIcon,
  CircleQuestionMarkIcon,
  AwardIcon,
  ChevronRightIcon,
  TrophyIcon,
  CameraIcon,
  LayersIcon,
  RepeatIcon,
  ShuffleIcon,
  ListChecksIcon,
  CircleCheckBigIcon,
  CircleXIcon,
  PlayIcon,
  EyeIcon,
  MessageCircleIcon,
  PenToolIcon,
  HeadphonesIcon,
  FileTextIcon,
  ArrowLeftIcon,
  TargetIcon,
  RotateCcwIcon,
  PauseIcon,
  LoaderCircleIcon,
  GaugeIcon,
  EyeOffIcon,
  TypeIcon,
  KeyboardIcon,
  ChevronLeftIcon,
  ArrowLeftRightIcon,
  TrendingUpIcon,
  CrownIcon,
} from "lucide-react";
import * as React from "react";
import { useParams, Link } from "react-router";
import { u, C as C_1 } from "../../components/CorrectionDisplay.jsx";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { L as L_2 } from "../../components/LearningImpactScene.jsx";
import { GRAMMAR_TOPICS } from "../../data/gramatica.js";
import { a } from "../../lib/exams-loader.js";
import { useLanguage } from "../../lib/i18n.jsx";
import "../../data/generated-content.js";
function BsComponent({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: "rgba(3,4,17,.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        className="relative max-w-sm w-full rounded-3xl p-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(15,24,60,0.95), rgba(10,15,40,0.98))",
          border: "2px solid rgba(251,191,36,0.3)",
          boxShadow: "0 0 40px rgba(251,191,36,0.15)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
        >
          <XIcon size={18} />
        </button>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            background: "rgba(251,191,36,0.12)",
            border: "2px solid rgba(251,191,36,0.25)",
          }}
        >
          <SparklesIcon size={28} className="text-amber-400" />
        </div>
        <h3 className="text-white font-black text-xl mb-2">Limite alcanzado / 已达到限制</h3>
        <useParams className="text-white/50 text-sm mb-6">
          Has usado todas tus correcciones de hoy. Vuelve manana para mas. /
          你今天的批改次数已用完。明天再来。
        </useParams>
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            boxShadow: "0 0 20px rgba(245,158,11,0.2)",
          }}
        >
          Entendido / 明白
        </button>
      </div>
    </div>
  );
}
function ae(i) {
  return i
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.,!?¿¡]/g, "");
}
function Ys(text) {
  const window_speechSynthesis = window.speechSynthesis;
  if (!window_speechSynthesis || typeof window.SpeechSynthesisUtterance !== "function") {
    return;
  }
  window_speechSynthesis.cancel();
  const s = new window.SpeechSynthesisUtterance(text);
  s.lang = "es-ES";
  window_speechSynthesis.speak(s);
}
const Lt = {
  trueFalse: {
    icon: ListChecksIcon,
    color: "#f59e0b",
    title: "Verdadero o falso",
    titleCn: "判断对错",
  },
  matching: {
    icon: ArrowLeftRightIcon,
    color: "#818cf8",
    title: "Emparejar",
    titleCn: "配对",
  },
  fillBlanks: {
    icon: PenLineIcon,
    color: "#22c55e",
    title: "Rellenar huecos",
    titleCn: "完形填空",
  },
  order: {
    icon: ShuffleIcon,
    color: "#22d3ee",
    title: "Ordenar la frase",
    titleCn: "组词成句",
  },
  transform: {
    icon: RepeatIcon,
    color: "#a855f7",
    title: "Transformar frases",
    titleCn: "改写句子",
  },
  dictation: {
    icon: Volume2Icon,
    color: "#ec4899",
    title: "Dictado con audio",
    titleCn: "听写",
  },
  cloze: {
    icon: LayersIcon,
    color: "#f97316",
    title: "Rellenar huecos en el texto",
    titleCn: "文本填空",
  },
};
function Ne1Component({ color, title, titleCn, children, right }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(14,22,64,.5), rgba(5,8,27,.4))",
        border: `1px solid ${color}30`,
      }}
    >
      <div
        className="flex items-center justify-between flex-wrap gap-2 px-4 py-3"
        style={{
          background: `${color}0d`,
          borderBottom: `1px solid ${color}22`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}, transparent)`,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
          <h3 className="text-white font-black text-base">
            {title}{" "}
            <span
              className="text-sm font-bold ml-1"
              style={{
                color,
              }}
            >
              {titleCn}
            </span>
          </h3>
        </div>
        {right}
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}
function DsComponent({ exercises }) {
  const { t } = useLanguage();
  const [s, setS] = React.useState({});
  const [m, setM] = React.useState(false);
  const [C, setC] = React.useState({});
  const [g, setG] = React.useState({});
  const [k, setK] = React.useState(false);
  const [E, setE] = React.useState({});
  const [L, setL] = React.useState({});
  const [I, setI] = React.useState(false);
  const [G, setG_1] = React.useState({});
  const [xe, setXe] = React.useState(false);
  const [Ee, setEe] = React.useState({});
  const F = Object.keys(Lt)
    .filter((r) => exercises[r]?.length > 0)
    .map((r) => Lt[r]);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {F.map((r) => (
          <span
            key={r.title}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
            style={{
              background: `${r.color}14`,
              border: `1px solid ${r.color}30`,
              color: r.color,
            }}
          >
            <r.icon size={12} /> {r.titleCn}
          </span>
        ))}
        {F.length === 0 && (
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white/40"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            {t("Este examen no tiene ejercicios adicionales.", "此考试暂无附加练习。")}
          </span>
        )}
      </div>
      {exercises.trueFalse?.length ? (
        <Ne1Component
          color="#f59e0b"
          title="Verdadero o falso"
          titleCn="判断对错"
          right={
            <button
              onClick={() => setM(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-black"
              style={{
                background: "rgba(245,158,11,0.2)",
                border: "1px solid rgba(245,158,11,0.4)",
                color: "#fbbf24",
              }}
            >
              {t("Comprobar", "检查")}
            </button>
          }
        >
          {exercises.trueFalse.map((r) => {
            const f = s[r.id] !== undefined && s[r.id] === r.answer;
            return (
              <div
                key={r.id}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: `1px solid ${m ? (f ? "rgba(34,197,94,.4)" : "rgba(239,68,68,.4)") : "rgba(255,255,255,.08)"}`,
                }}
              >
                <useParams className="text-white/90 text-sm font-medium">
                  {r.id}. {r.statement}
                </useParams>
                <useParams className="text-white/40 text-xs mb-2">{r.statementCn}</useParams>
                <div className="flex gap-2">
                  <button
                    disabled={m}
                    onClick={() =>
                      setS((D) => ({
                        ...D,
                        [r.id]: true,
                      }))
                    }
                    className="px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={
                      s[r.id] === true
                        ? {
                            background: "rgba(34,197,94,.2)",
                            border: "1px solid rgba(34,197,94,.5)",
                            color: "#4ade80",
                          }
                        : {
                            background: "rgba(255,255,255,.04)",
                            border: "1px solid rgba(255,255,255,.1)",
                            color: "rgba(255,255,255,.6)",
                          }
                    }
                  >
                    {t("Verdadero", "正确")}
                  </button>
                  <button
                    disabled={m}
                    onClick={() =>
                      setS((D) => ({
                        ...D,
                        [r.id]: false,
                      }))
                    }
                    className="px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={
                      s[r.id] === false
                        ? {
                            background: "rgba(239,68,68,.2)",
                            border: "1px solid rgba(239,68,68,.5)",
                            color: "#f87171",
                          }
                        : {
                            background: "rgba(255,255,255,.04)",
                            border: "1px solid rgba(255,255,255,.1)",
                            color: "rgba(255,255,255,.6)",
                          }
                    }
                  >
                    {t("Falso", "错误")}
                  </button>
                  {m && (
                    <span
                      className="flex items-center gap-1 text-xs font-bold"
                      style={{
                        color: f ? "#4ade80" : "#f87171",
                      }}
                    >
                      {f ? <CircleCheckBigIcon size={14} /> : <CircleXIcon size={14} />}{" "}
                      {f ? t("¡Correcto!", "正确！") : t("Incorrecto", "错误")}
                    </span>
                  )}
                </div>
                {m && (
                  <useParams className="text-white/50 text-xs mt-2">
                    {r.explanation} <span className="text-white/35">{r.explanationCn}</span>
                  </useParams>
                )}
              </div>
            );
          })}
        </Ne1Component>
      ) : null}
      {exercises.matching?.length ? (
        <Ne1Component color="#818cf8" title="Emparejar" titleCn="配对">
          {exercises.matching.map((r) => (
            <div
              key={r.id}
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <useParams className="text-white/90 text-sm font-bold">
                {r.left} {r.leftCn && <span className="text-white/40 font-medium">{r.leftCn}</span>}
              </useParams>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exercises.matching.map((y) => (
                  <button
                    key={y.id}
                    onClick={() =>
                      setC((f) => ({
                        ...f,
                        [r.id]: y.id,
                      }))
                    }
                    className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
                    style={
                      C[r.id] === y.id
                        ? {
                            background: "rgba(99,102,241,.3)",
                            border: "1px solid rgba(99,102,241,.6)",
                            color: "#c7d2fe",
                          }
                        : {
                            background: "rgba(255,255,255,.04)",
                            border: "1px solid rgba(255,255,255,.1)",
                            color: "rgba(255,255,255,.55)",
                          }
                    }
                  >
                    {y.right} {y.rightCn}
                  </button>
                ))}
              </div>
              {C[r.id] === r.id && (
                <useParams className="flex items-center gap-1 text-xs font-bold mt-1.5 text-green-400">
                  <CircleCheckBigIcon size={13} /> {t("¡Correcto!", "正确！")}
                </useParams>
              )}
            </div>
          ))}
        </Ne1Component>
      ) : null}
      {exercises.fillBlanks?.length ? (
        <Ne1Component
          color="#22c55e"
          title="Rellenar huecos"
          titleCn="完形填空"
          right={
            <button
              onClick={() => setK(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-black"
              style={{
                background: "rgba(34,197,94,0.2)",
                border: "1px solid rgba(34,197,94,0.4)",
                color: "#4ade80",
              }}
            >
              {t("Comprobar", "检查")}
            </button>
          }
        >
          {exercises.fillBlanks.map((r) => {
            const f = g[r.id] !== undefined && g[r.id] === r.answer;
            return (
              <div
                key={r.id}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: `1px solid ${k ? (f ? "rgba(34,197,94,.4)" : "rgba(239,68,68,.4)") : "rgba(255,255,255,.08)"}`,
                }}
              >
                <useParams className="text-white/90 text-sm">
                  {r.id}. {r.before}{" "}
                  <span
                    className="px-2 py-0.5 rounded font-bold text-amber-300"
                    style={{
                      background: "rgba(245,158,11,.15)",
                      border: "1px dashed rgba(245,158,11,.4)",
                    }}
                  >
                    ____
                  </span>{" "}
                  {r.after}
                </useParams>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {r.options.map((D, T) => (
                    <button
                      key={T}
                      disabled={k}
                      onClick={() =>
                        setG((Z) => ({
                          ...Z,
                          [r.id]: T,
                        }))
                      }
                      className="px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={
                        g[r.id] === T
                          ? {
                              background: "rgba(34,197,94,.2)",
                              border: "1px solid rgba(34,197,94,.5)",
                              color: "#4ade80",
                            }
                          : {
                              background: "rgba(255,255,255,.04)",
                              border: "1px solid rgba(255,255,255,.1)",
                              color: "rgba(255,255,255,.55)",
                            }
                      }
                    >
                      {D}
                    </button>
                  ))}
                </div>
                {k && (
                  <>
                    <span
                      className="flex items-center gap-1 text-xs font-bold mt-2"
                      style={{
                        color: f ? "#4ade80" : "#f87171",
                      }}
                    >
                      {f ? <CircleCheckBigIcon size={14} /> : <CircleXIcon size={14} />}{" "}
                      {f ? t("¡Correcto!", "正确！") : `${t("Respuesta", "答案")}: ${r.options[r.answer]}`}
                    </span>
                    <useParams className="text-white/50 text-xs mt-1">{r.explanation}</useParams>
                  </>
                )}
              </div>
            );
          })}
        </Ne1Component>
      ) : null}
      {exercises.dictation?.length ? (
        <Ne1Component
          color="#ec4899"
          title="Dictado con audio"
          titleCn="听写"
          right={
            <button
              onClick={() => setXe(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-black"
              style={{
                background: "rgba(236,72,153,0.2)",
                border: "1px solid rgba(236,72,153,0.4)",
                color: "#f9a8d4",
              }}
            >
              {t("Comprobar", "检查")}
            </button>
          }
        >
          {exercises.dictation.map((r) => {
            const y = G[r.id] || "";
            const f = xe && y.trim() && ae(y) === ae(r.text);
            return (
              <div
                key={r.id}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => Ys(r.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                    style={{
                      background: "rgba(236,72,153,0.18)",
                      border: "1px solid rgba(236,72,153,0.4)",
                      color: "#f9a8d4",
                    }}
                  >
                    <PlayIcon size={13} fill="currentColor" /> {t("Escuchar", "播放")}
                  </button>
                  <span className="text-white/40 text-xs">{r.textCn}</span>
                </div>
                <input
                  value={y}
                  onChange={(D) =>
                    setG_1((T) => ({
                      ...T,
                      [r.id]: D.target.value,
                    }))
                  }
                  placeholder={t("Escribe lo que escuchas…", "写下你听到的内容…")}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,.12)",
                  }}
                />
                {xe && y.trim() && (
                  <useParams
                    className="flex items-center gap-1 text-xs font-bold mt-2"
                    style={{
                      color: f ? "#4ade80" : "#f87171",
                    }}
                  >
                    {f ? <CircleCheckBigIcon size={14} /> : <CircleXIcon size={14} />}{" "}
                    {f ? t("¡Correcto!", "正确！") : `${t("Texto", "原文")}: ${r.text}`}
                  </useParams>
                )}
              </div>
            );
          })}
        </Ne1Component>
      ) : null}
      {exercises.cloze?.length ? (
        <Ne1Component color="#f97316" title="Rellenar huecos en el texto" titleCn="文本填空">
          {exercises.cloze.map((r) => (
            <div
              key={r.id}
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <useParams className="text-white/90 text-sm leading-relaxed">
                {r.text.split(/(\[\d+\])/).map((y, f) => {
                  if (/^\[\d+\]$/.test(y)) {
                    return (
                      <span
                        key={f}
                        className="inline-block px-2 py-0.5 mx-0.5 rounded font-bold text-amber-300"
                        style={{
                          background: "rgba(245,158,11,.15)",
                          border: "1px dashed rgba(245,158,11,.5)",
                        }}
                      >
                        {y}
                      </span>
                    );
                  }
                  return <span key={f}>{y}</span>;
                })}
              </useParams>
              {r.answers.map((y, f) => {
                const D = Ee[r.id]?.[f];
                return (
                  <div key={f} className="mt-2">
                    <span className="text-white/40 text-xs font-bold">
                      {t("Hueco", "空格")} [{f + 1}]:{" "}
                    </span>
                    <span className="inline-flex flex-wrap gap-1.5">
                      {r.options[f].map((T, Z) => {
                        const X = D === Z;
                        const fe = X && T === y;
                        return (
                          <button
                            key={Z}
                            onClick={() =>
                              setEe(($e) => ({
                                ...$e,
                                [r.id]: {
                                  ...$e[r.id],
                                  [f]: Z,
                                },
                              }))
                            }
                            className="px-2.5 py-1 rounded-lg text-xs font-bold"
                            style={
                              X
                                ? fe
                                  ? {
                                      background: "rgba(34,197,94,.25)",
                                      border: "1px solid rgba(34,197,94,.6)",
                                      color: "#4ade80",
                                    }
                                  : {
                                      background: "rgba(239,68,68,.25)",
                                      border: "1px solid rgba(239,68,68,.6)",
                                      color: "#f87171",
                                    }
                                : {
                                    background: "rgba(255,255,255,.04)",
                                    border: "1px solid rgba(255,255,255,.1)",
                                    color: "rgba(255,255,255,.55)",
                                  }
                            }
                          >
                            {T}
                          </button>
                        );
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </Ne1Component>
      ) : null}
      {exercises.order?.length ? (
        <Ne1Component color="#22d3ee" title="Ordenar la frase" titleCn="组词成句">
          {exercises.order.map((r) => (
            <div
              key={r.id}
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div className="flex flex-wrap gap-1.5 mb-2">
                {r.words.map((y, f) => (
                  <span
                    key={f}
                    className="px-2 py-1 rounded-lg text-xs font-bold text-cyan-200"
                    style={{
                      background: "rgba(6,182,212,.15)",
                      border: "1px solid rgba(6,182,212,.3)",
                    }}
                  >
                    {y}
                  </span>
                ))}
              </div>
              <input
                value={E[r.id] || ""}
                onChange={(y) =>
                  setE((f) => ({
                    ...f,
                    [r.id]: y.target.value,
                  }))
                }
                placeholder={t("Escribe la frase ordenada…", "写出正确的句子…")}
                className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              />
              {(E[r.id] || "").trim() && ae(E[r.id]) === ae(r.answer) && (
                <useParams className="text-xs font-bold mt-2 text-green-400">
                  ✅ {t("¡Correcto!", "正确！")}
                </useParams>
              )}
              {ae(E[r.id] || "") !== ae(r.answer) && (
                <button
                  onClick={() =>
                    setE((y) => ({
                      ...y,
                      [r.id]: r.answer,
                    }))
                  }
                  className="flex items-center gap-1.5 text-xs font-bold mt-2 text-white/40 hover:text-amber-300 transition-colors"
                >
                  <EyeIcon size={13} /> {t("Ver respuesta", "看答案")}:{" "}
                  <span className="text-amber-300">
                    {r.answer} ({r.answerCn})
                  </span>
                </button>
              )}
            </div>
          ))}
        </Ne1Component>
      ) : null}
      {exercises.transform?.length ? (
        <Ne1Component
          color="#a855f7"
          title="Transformar frases"
          titleCn="改写句子"
          right={
            <button
              onClick={() => setI(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-black"
              style={{
                background: "rgba(168,85,247,0.2)",
                border: "1px solid rgba(168,85,247,0.4)",
                color: "#c084fc",
              }}
            >
              {t("Comprobar", "检查")}
            </button>
          }
        >
          {exercises.transform.map((r) => {
            const y = L[r.id] || "";
            const f = I && y.trim() && ae(y) === ae(r.answer);
            return (
              <div
                key={r.id}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <useParams className="text-white/90 text-sm font-bold">
                  {r.instruction} <span className="text-white/40 font-medium">{r.instructionCn}</span>
                </useParams>
                <useParams className="text-white/60 text-sm italic mt-1">{r.sentence}</useParams>
                <input
                  value={y}
                  onChange={(D) =>
                    setL((T) => ({
                      ...T,
                      [r.id]: D.target.value,
                    }))
                  }
                  placeholder={t("Escribe la frase transformada…", "写出改写后的句子…")}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none mt-2"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,.12)",
                  }}
                />
                {I && y.trim() && (
                  <useParams
                    className="flex items-center gap-1 text-xs font-bold mt-2"
                    style={{
                      color: f ? "#4ade80" : "#f87171",
                    }}
                  >
                    {f ? <CircleCheckBigIcon size={14} /> : <CircleXIcon size={14} />}{" "}
                    {f ? t("¡Correcto!", "正确！") : `${t("Respuesta", "答案")}: ${r.answer} (${r.answerCn})`}
                  </useParams>
                )}
              </div>
            );
          })}
        </Ne1Component>
      ) : null}
    </div>
  );
}
function H(i) {
  const c = [...i];
  for (let s = c.length - 1; s > 0; s--) {
    const w = Math.floor(Math.random() * (s + 1));
    [c[s], c[w]] = [c[w], c[s]];
  }
  return c;
}
const Vs = new Set([
  "el",
  "la",
  "los",
  "las",
  "un",
  "una",
  "unos",
  "unas",
  "de",
  "del",
  "y",
  "o",
  "que",
  "en",
  "a",
  "con",
  "por",
  "para",
  "es",
  "son",
  "está",
  "están",
  "muy",
  "no",
  "se",
  "me",
  "te",
  "lo",
  "le",
  "su",
  "mi",
  "tu",
  "al",
  "como",
  "pero",
  "sin",
  "hay",
  "tengo",
  "tiene",
  "tienen",
  "hace",
  "hago",
  "hoy",
  "años",
  "año",
]);
function dt(i) {
  return i.replace(/[.,;:!?¿¡()"«»]/g, "");
}
function Os(i) {
  return i
    .split(/\s+/)
    .map((s, index) => ({
      word: dt(s),
      index,
    }))
    .filter((s) => s.word.length >= 4 && s.word.length <= 14 && !Vs.has(s.word.toLowerCase()));
}
function Gs(i) {
  const c = i.vocabulary ?? [];
  const s = {};
  if (c.length >= 4) {
    const h = H(c).slice(0, 4);
    s.matching = h.map((g, j) => ({
      id: j + 1,
      left: g.word,
      leftCn: "",
      right: g.chinese,
      rightCn: "",
    }));
  }
  const w = c.filter((h) => h.example && h.example.includes(h.word));
  if (w.length >= 3) {
    const h = H(w).slice(0, 3);
    s.fillBlanks = h.map((g, j) => {
      const k = g.example.indexOf(g.word);
      const before = k >= 0 ? g.example.slice(0, k) : g.example;
      const after = k >= 0 ? g.example.slice(k + g.word.length) : "";
      const A = H(c.filter((I) => I.word !== g.word))
        .slice(0, 2)
        .map((I) => I.word);
      const L = H([g.word, ...A]);
      const answer = L.indexOf(g.word);
      return {
        id: j + 1,
        before,
        after,
        options: L,
        answer,
        explanation: `${g.word} (${g.chinese})`,
      };
    });
  }
  const m = w.filter((h) => h.example.split(/\s+/).length <= 9);
  if (m.length >= 2) {
    const h = H(m).slice(0, 2);
    s.order = h.map((g, j) => ({
      id: j + 1,
      words: H(
        g.example
          .split(/\s+/)
          .map((k) => dt(k))
          .filter(Boolean),
      ),
      answer: g.example,
      answerCn: g.chinese,
    }));
  }
  const b = w.filter((h) => h.example.split(/\s+/).length <= 12);
  if (b.length >= 2) {
    const h = H(b).slice(0, 2);
    s.dictation = h.map((g, j) => ({
      id: j + 1,
      text: g.example,
      textCn: g.chinese,
    }));
  }
  const C = (i.reading?.text ?? "")
    .split(new RegExp("(?<=[.!?])\\s+"))
    .map((h) => h.trim())
    .filter((h) => h && h.split(/\s+/).length >= 6);
  if (C.length >= 2 && c.length >= 2) {
    const h = C.slice(0, 2);
    const g = [];
    const answers = [];
    const k = [];
    let z = 1;
    for (const E of h) {
      const A = Os(E);
      if (A.length === 0) {
        continue;
      }
      const L = A[Math.floor(A.length / 2)];
      const B = L.word;
      answers.push(B);
      const I = H(c.map((G) => G.word).filter((G) => dt(G) !== B)).slice(0, 2);
      k.push(H([B, ...I]));
      const M = E.split(/\s+/);
      M[L.index] = `[${z}]`;
      g.push(M.join(" "));
      z += 1;
    }
    if (g.length === 2 && answers.length === 2) {
      s.cloze = [
        {
          id: 1,
          text: g.join(" "),
          textCn: "",
          answers,
          options: k,
        },
      ];
    }
  }
  return s;
}
const Ne = [
  "vocabulario",
  "lectura",
  "audicion",
  "ejercicios",
  "gramatica",
  "descripcion-fotografia",
  "escritura",
  "monologo",
  "interaccion",
];
function de() {
  if (typeof window === "undefined") {
    return null;
  }
  const window_speechSynthesis = window.speechSynthesis;
  if (
    window_speechSynthesis &&
    typeof window_speechSynthesis.cancel === "function" &&
    typeof window_speechSynthesis.speak === "function"
  ) {
    return window_speechSynthesis;
  }
  return null;
}
function ie() {
  de()?.cancel();
}
const It = {
  vocabulario: {
    label: "Vocabulario / 词汇",
    icon: BookOpenIcon,
    color: "#f97316",
    glow: "rgba(249,115,22,0.4)",
    gradient: "from-orange-500 to-red-500",
  },
  lectura: {
    label: "Lectura / 阅读",
    icon: FileTextIcon,
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.4)",
    gradient: "from-blue-500 to-indigo-500",
  },
  audicion: {
    label: "Audicion / 听力",
    icon: HeadphonesIcon,
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    gradient: "from-emerald-500 to-teal-500",
  },
  ejercicios: {
    label: "Ejercicios / 练习",
    icon: ZapIcon,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
    gradient: "from-amber-500 to-yellow-500",
  },
  gramatica: {
    label: "Gramatica / 语法",
    icon: LightbulbIcon,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.4)",
    gradient: "from-cyan-500 to-sky-500",
  },
  "descripcion-fotografia": {
    label: "Fotografia / 照片",
    icon: CameraIcon,
    color: "#ff8a2a",
    glow: "rgba(255,138,42,0.4)",
    gradient: "from-orange-400 to-amber-500",
  },
  escritura: {
    label: "Escritura / 写作",
    icon: PenToolIcon,
    color: "#a855f7",
    glow: "rgba(168,85,247,0.4)",
    gradient: "from-violet-500 to-purple-500",
  },
  monologo: {
    label: "Monologo / 独白",
    icon: MicIcon,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.4)",
    gradient: "from-pink-500 to-rose-500",
  },
  interaccion: {
    label: "Interaccion / 互动",
    icon: MessageCircleIcon,
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.4)",
    gradient: "from-cyan-500 to-blue-500",
  },
};
function nt(i) {
  return i.replace(/^[a-dA-D][)\.\]]\s*/, "");
}
function WComponent({ children, className = "", delay = 0 }) {
  const wRef = React.useRef(null);
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const wRef_current = wRef.current;
    if (!wRef_current) {
      return;
    }
    const h = new IntersectionObserver(
      (j) => {
        j.forEach((k) => {
          if (k.isIntersecting) {
            setM(true);
          }
        });
      },
      {
        threshold: 0.08,
      },
    );
    h.observe(wRef_current);
    const g = requestAnimationFrame(() => setM((j) => j));
    return () => {
      h.disconnect();
      cancelAnimationFrame(g);
    };
  }, []);
  return (
    <div
      ref={wRef}
      className={className}
      style={{
        opacity: m ? 1 : 0,
        transform: m
          ? "perspective(1200px) translateY(0) rotateX(0deg)"
          : "perspective(1200px) translateY(36px) rotateX(6deg)",
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
function OComponent({ children, className = "", glowColor, color, tilt = true }) {
  const background = glowColor || "#f59e0b";
  const C = color || background;
  const hRef = React.useRef(null);
  const [g, setG] = React.useState({
    rx: 0,
    ry: 0,
  });
  const [k, setK] = React.useState({
    x: 50,
    y: 50,
  });
  const [E, setE] = React.useState(false);
  const L = (I) => {
    if (!tilt || !hRef.current) {
      return;
    }
    const M = hRef.current.getBoundingClientRect();
    const G = I.clientX - M.left;
    const Y = I.clientY - M.top;
    setG({
      rx: ((Y - M.height / 2) / M.height) * -4,
      ry: ((G - M.width / 2) / M.width) * 4,
    });
    setK({
      x: (G / M.width) * 100,
      y: (Y / M.height) * 100,
    });
  };
  const B = () => {
    setG({
      rx: 0,
      ry: 0,
    });
    setE(false);
  };
  return (
    <div
      ref={hRef}
      className={`relative ${className}`}
      style={{
        perspective: "1400px",
      }}
      onMouseMove={L}
      onMouseEnter={() => setE(true)}
      onMouseLeave={B}
    >
      <div
        className="relative"
        style={{
          transform: `rotateX(${g.rx}deg) rotateY(${g.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.25s ease-out",
        }}
      >
        <div
          className="absolute -inset-[1.5px] rounded-3xl opacity-80"
          style={{
            background: `linear-gradient(135deg, ${background}80, ${C}40, ${background}80)`,
            backgroundSize: "200% 200%",
            animation: "gradientRotate 4s ease infinite",
            filter: "blur(0.5px)",
          }}
        />
        <div
          className="absolute -inset-[2px] rounded-3xl overflow-hidden pointer-events-none opacity-0 transition-opacity duration-500"
          style={{
            opacity: E ? 0.9 : 0,
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `conic-gradient(from 0deg, ${background}, ${C}, transparent, ${background})`,
              animation: "spinBorder 2.5s linear infinite",
            }}
          />
        </div>
        <div
          className="relative rounded-3xl overflow-hidden h-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,24,60,0.95) 0%, rgba(15,24,60,0.98) 50%, rgba(10,15,40,0.99) 100%)",
            border: `2px solid ${background}50`,
            boxShadow: E
              ? `0 0 35px ${background}30, 0 20px 50px rgba(0,0,0,0.4), inset 0 0 30px ${background}06`
              : `0 0 20px ${background}15, inset 0 0 30px ${background}04`,
            transition: "box-shadow 0.3s ease-out",
          }}
        >
          {tilt && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: E ? 1 : 0,
                background: `radial-gradient(280px circle at ${k.x}% ${k.y}%, ${background}10, transparent 70%)`,
              }}
            />
          )}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${background}, transparent)`,
              opacity: 0.8,
            }}
          />
          <div
            className="absolute top-2 left-2 w-1 h-1 rounded-full pointer-events-none"
            style={{
              background,
              boxShadow: `0 0 6px ${background}`,
              animation: "sparkleTwinkle 2.6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-2 right-2 w-1 h-1 rounded-full pointer-events-none"
            style={{
              background,
              boxShadow: `0 0 6px ${background}`,
              animation: "sparkleTwinkle 2.6s ease-in-out infinite 1.1s",
            }}
          />
          <div
            style={{
              transform: "translateZ(20px)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
function XsComponent({ text, className = "", speed = 25 }) {
  const [w, setW] = React.useState("");
  const b = text.split(" ");
  React.useEffect(() => {
    let C = 0;
    setW(b[0] || "");
    const h = setInterval(() => {
      C++;
      if (C < b.length) {
        setW((g) => `${g} ${b[C]}`);
      } else {
        clearInterval(h);
      }
    }, speed);
    return () => clearInterval(h);
  }, [text, speed]);
  return (
    <span className={className}>
      {w}
      <span className="animate-pulse">|</span>
    </span>
  );
}
function Ue1Component({ children, className = "", style }) {
  const wRef = React.useRef(null);
  const [transform, setTransform] = React.useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
  );
  const [C, setC] = React.useState({
    x: 50,
    y: 50,
    o: 0,
  });
  const g = (k) => {
    if (!wRef.current) {
      return;
    }
    const z = wRef.current.getBoundingClientRect();
    const E = k.clientX - z.left;
    const A = k.clientY - z.top;
    const L = z.width / 2;
    const B = z.height / 2;
    const I = ((A - B) / B) * -8;
    const M = ((E - L) / L) * 8;
    setTransform(`perspective(1200px) rotateX(${I}deg) rotateY(${M}deg) scale(1.02) translateZ(10px)`);
    setC({
      x: (E / z.width) * 100,
      y: (A / z.height) * 100,
      o: 1,
    });
  };
  const j = () => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)");
    setC((k) => ({
      ...k,
      o: 0,
    }));
  };
  return (
    <div
      ref={wRef}
      className={`relative ${className}`}
      style={{
        ...style,
        transform,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={g}
      onMouseLeave={j}
    >
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-200"
        style={{
          opacity: C.o * 0.5,
          background: `radial-gradient(220px circle at ${C.x}% ${C.y}%, rgba(255,255,255,0.15), transparent 70%)`,
          zIndex: 5,
        }}
      />
      {children}
    </div>
  );
}
function FtComponent({ show }) {
  if (!show) {
    return null;
  }
  const c = Array.from(
    {
      length: 30,
    },
    (s, id) => ({
      id,
      x: Math.random() * 300 - 150,
      y: Math.random() * -250 - 50,
      rot: Math.random() * 720,
      color: ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#b829dd"][id % 6],
      size: 5 + Math.random() * 10,
      delay: Math.random() * 0.25,
      shape: id % 3 === 0 ? "50%" : id % 3 === 1 ? "2px" : "0px",
    }),
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {c.map((s) => (
        <div
          key={s.id}
          className="absolute left-1/2 top-1/2"
          style={{
            width: s.size,
            height: s.size,
            background: s.color,
            borderRadius: s.shape,
            animation: `confettiFly 0.9s ease-out ${s.delay}s forwards`,
            transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
            boxShadow: `0 0 10px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}
function WaComponent() {
  const { level, examId } = useParams();
  const { t: t_1 } = useLanguage();
  const { correctText, isCorrecting, remainingTokens } = u();
  const C = remainingTokens === 0;
  const [h, setH] = React.useState(false);
  const [j, setJ] = React.useState("vocabulario");
  const [z, setZ] = React.useState({});
  const [A, setA] = React.useState({});
  const [B, setB] = React.useState(false);
  const [M, setM] = React.useState(new Set());
  const [Y, setY] = React.useState({});
  const [$, set$] = React.useState(false);
  const [_, set_] = React.useState(false);
  const [r, setR] = React.useState(1);
  const [f, setF] = React.useState(0);
  const [T, setT] = React.useState([]);
  const [X, setX] = React.useState(false);
  const [$e, set$e] = React.useState(false);
  const [Gt, setGt] = React.useState(-1);
  const [Xt, setXt] = React.useState(false);
  const [xt, setXt_1] = React.useState("");
  const [_t, set_t] = React.useState(false);
  const [Ae, setAe] = React.useState("cards");
  const [gt, setGt_1] = React.useState(-1);
  const [Ht, setHt] = React.useState(0);
  const jeRef = React.useRef(undefined);
  const weRef = React.useRef(undefined);
  const yeRef = React.useRef(null);
  const MeRef = React.useRef("");
  const [Te, setTe] = React.useState("A");
  const [Re, setRe] = React.useState("");
  const [Ke, setKe] = React.useState(null);
  const [ut, setUt] = React.useState("escribir");
  const [Le, setLe] = React.useState("");
  const [Je, setJe] = React.useState("");
  const [Kt, setKt] = React.useState(false);
  const [qe, setQe] = React.useState(null);
  const [jt, setJt] = React.useState("escribir");
  const [Fe, setFe] = React.useState("");
  const [et, setEt] = React.useState("");
  const [es, setEs] = React.useState(false);
  const [tt, setTt] = React.useState(null);
  const [ts, setTs] = React.useState(false);
  const [Be, setBe] = React.useState([]);
  const [at, setAt] = React.useState(() => Math.floor(Math.random() * 10000));
  const [vt, setVt] = React.useState(false);
  const [_s, set_s] = React.useState({
    1: "",
    2: "",
    3: "",
  });
  const [Nt, setNt] = React.useState(null);
  const [Ye, setYe] = React.useState("");
  const De = (level || "A2").toUpperCase();
  const [n, setN] = React.useState(null);
  const [ns, setNs] = React.useState(true);
  const [is, setIs] = React.useState(false);
  const exercises = React.useMemo(() => {
    if (n) {
      if (n.exercises) {
        return n.exercises;
      }
      return Gs(n);
    }
    return {};
  }, [n]);
  React.useEffect(() => {
    let t = false;
    setNs(true);
    setIs(false);
    a(De, Number(examId))
      .then((a) => {
        if (!t) {
          setN(a);
        }
      })
      .catch((a) => {
        console.error("Failed to load exam:", a);
        if (!t) {
          setN(null);
          setIs(true);
        }
      })
      .finally(() => {
        if (!t) {
          setNs(false);
        }
      });
    return () => {
      t = true;
    };
  }, [De, examId]);
  React.useEffect(
    () => () => {
      ie();
      if (jeRef.current) {
        clearInterval(jeRef.current);
      }
      if (weRef.current) {
        clearInterval(weRef.current);
      }
      yeRef.current = null;
    },
    [],
  );
  React.useEffect(() => {
    const t = de();
    if (!t) {
      setT([]);
      return;
    }
    const a = () => {
      const x = t
        .getVoices()
        .filter((l) => l.lang.toLowerCase().startsWith("es"))
        .filter((l, d, p) => p.findIndex((u) => u.voiceURI === l.voiceURI) === d);
      if (x.length > 0) {
        setT(x);
      }
    };
    a();
    t.onvoiceschanged = a;
    return () => {
      t.onvoiceschanged = null;
    };
  }, []);
  const activeCfg = It[j];
  const rt = (t) => {
    if (T.length !== 0) {
      return T[Math.min(Math.max(t, 0), T.length - 1)];
    }
  };
  const ds = () => {
    if (!n?.listening?.transcription) {
      return;
    }
    if (_) {
      ie();
      set_(false);
      if (jeRef.current) {
        clearInterval(jeRef.current);
      }
      if (weRef.current) {
        clearInterval(weRef.current);
      }
      yeRef.current = null;
      setGt_1(-1);
      return;
    }
    const t = de();
    if (!t || typeof window.SpeechSynthesisUtterance !== "function") {
      alert(t_1("Tu navegador no permite reproducir este audio.", "你的浏览器无法播放此音频。"));
      return;
    }
    const transcription = n.listening.transcription;
    const x = transcription.split(/\s+/).filter(Boolean);
    const d = (transcription.length * 68) / r;
    const p = d / x.length;
    set_(true);
    setHt(0);
    setGt_1(0);
    const u = Date.now();
    let N = 0;
    const P = setInterval(() => {
      N++;
      if (N < x.length) {
        setGt_1(N);
      }
    }, p);
    jeRef.current = P;
    const S = setInterval(() => {
      const me = Math.min(((Date.now() - u) / d) * 100, 100);
      setHt(me);
      if (me >= 100) {
        clearInterval(S);
      }
    }, 80);
    weRef.current = S;
    const R = new window.SpeechSynthesisUtterance(transcription);
    yeRef.current = R;
    R.lang = "es-ES";
    R.rate = r;
    const V = rt(f);
    if (V) {
      R.voice = V;
    }
    R.onend = () => {
      set_(false);
      setGt_1(-1);
      clearInterval(P);
      clearInterval(S);
      setHt(100);
      yeRef.current = null;
    };
    R.onerror = () => {
      set_(false);
      setGt_1(-1);
      clearInterval(P);
      clearInterval(S);
      setHt(0);
      yeRef.current = null;
    };
    t.cancel();
    t.resume?.();
    window.setTimeout(() => de()?.speak(R), 40);
  };
  const xs = () => {
    const t = de();
    if (!t || !n?.listening?.transcription) {
      return;
    }
    ie();
    set_(false);
    setHt(0);
    const a = n.listening.transcription.split(new RegExp("(?<=[.!?])\\s+")).filter((d) => d.trim());
    if (a.length === 0) {
      return;
    }
    setX(true);
    setXt(false);
    set$e(true);
    set_(true);
    let x = 0;
    setGt(0);
    const l = () => {
      if (x >= a.length) {
        set_(false);
        setGt(-1);
        return;
      }
      setGt(x);
      const d = new window.SpeechSynthesisUtterance(a[x]);
      d.lang = "es-ES";
      d.rate = r;
      const p = rt(f);
      if (p) {
        d.voice = p;
      }
      d.onend = () => {
        x += 1;
        l();
      };
      d.onerror = () => {
        x += 1;
        l();
      };
      t.speak(d);
    };
    l();
  };
  const bs = () => {
    ie();
    set_(false);
    setGt(-1);
    set$e(false);
    setXt_1("");
    set_t(false);
    setXt(true);
  };
  const pe = async (t, a, x, l) => {
    if (!t.trim()) {
      return;
    }
    x(null);
    const d = await correctText(t, a, n?.level, l);
    if (d.limitReached) {
      setH(true);
      return;
    }
    x(d.data ?? null);
  };
  const q = (t) => {
    const a = de();
    if (!a || typeof window.SpeechSynthesisUtterance !== "function") {
      alert(t_1("Tu dispositivo no permite reproducir este audio.", "你的设备无法播放此音频。"));
      return;
    }
    a.cancel();
    const x = new window.SpeechSynthesisUtterance(t);
    x.lang = "es-ES";
    x.rate = r;
    const l = rt(f);
    if (l) {
      x.voice = l;
    }
    a.resume?.();
    window.setTimeout(() => de()?.speak(x), 40);
  };
  const zt = (t, a, x) => {
    const l = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!l) {
      alert(t_1("Tu navegador no soporta reconocimiento de voz", "你的浏览器不支持语音识别"));
      return;
    }
    t(true);
    a("");
    x(null);
    MeRef.current = "";
    const d = new l();
    d.lang = "es-ES";
    d.continuous = true;
    d.interimResults = true;
    d.maxAlternatives = 1;
    let p = -1;
    d.onresult = (u) => {
      let MeRef_current = MeRef.current;
      let P = "";
      for (let S = u.resultIndex; S < u.results.length; S++) {
        if (u.results[S].isFinal) {
          if (S > p) {
            MeRef_current += u.results[S][0].transcript;
            p = S;
          }
        } else {
          P += u.results[S][0].transcript;
        }
      }
      MeRef.current = MeRef_current;
      a(MeRef_current + P);
    };
    d.onerror = () => t(false);
    d.onend = () => {
      t(false);
      a(MeRef.current);
    };
    d.start();
    window._rec = d;
  };
  const Et = (t) => {
    t(false);
    if (window._rec) {
      window._rec.stop();
    }
  };
  const Ve = Ne.indexOf(j);
  const onNext = () => {
    if (Ve < Ne.length - 1) {
      setJ(Ne[Ve + 1]);
    }
  };
  const onPrev = () => {
    if (Ve > 0) {
      setJ(Ne[Ve - 1]);
    }
  };
  const ps = () => {
    const t = [];
    const a = n?.reading?.questions?.filter((p) => z[p.id] === p.correctAnswer).length || 0;
    const x = n?.reading?.questions?.length || 1;
    t.push({
      name: "Lectura / 阅读",
      score: Math.round((a / x) * 100),
      icon: FileTextIcon,
      color: "text-blue-400",
    });
    const l = n?.listening?.questions?.filter((p) => Y[p.id] === p.correctAnswer).length || 0;
    const d = n?.listening?.questions?.length || 1;
    t.push({
      name: "Audicion / 听力",
      score: Math.round((l / d) * 100),
      icon: HeadphonesIcon,
      color: "text-emerald-400",
    });
    t.push({
      name: "Escritura / 写作",
      score: Ke?.puntuacion || 0,
      icon: PenToolIcon,
      color: "text-violet-400",
    });
    t.push({
      name: "Monologo / 独白",
      score: qe?.puntuacion || 0,
      icon: MicIcon,
      color: "text-pink-400",
    });
    t.push({
      name: "Interaccion / 互动",
      score: tt?.puntuacion || 0,
      icon: MessageCircleIcon,
      color: "text-cyan-400",
    });
    setBe(t);
    setTs(true);
  };
  const U = Be.length > 0 ? Math.round(Be.reduce((acc, item) => acc + item.score, 0) / Be.length) : 0;
  const ge = (t) => {
    if (t >= 90) {
      return {
        label: "Sobresaliente",
        labelCn: "优秀",
        color: "text-yellow-400",
        bg: "from-yellow-500/20 to-amber-500/10",
        border: "border-yellow-500/20",
      };
    }
    if (t >= 75) {
      return {
        label: "Notable",
        labelCn: "良好",
        color: "text-emerald-400",
        bg: "from-emerald-500/20 to-green-500/10",
        border: "border-emerald-500/20",
      };
    }
    if (t >= 60) {
      return {
        label: "Aprobado",
        labelCn: "及格",
        color: "text-blue-400",
        bg: "from-blue-500/20 to-cyan-500/10",
        border: "border-blue-500/20",
      };
    }
    if (t >= 40) {
      return {
        label: "En progreso",
        labelCn: "进行中",
        color: "text-orange-400",
        bg: "from-orange-500/20 to-amber-500/10",
        border: "border-orange-500/20",
      };
    }
    return {
      label: "Necesita practica",
      labelCn: "需练习",
      color: "text-red-400",
      bg: "from-red-500/20 to-pink-500/10",
      border: "border-red-500/20",
    };
  };
  if (ns) {
    return (
      <StarfieldBackground>
        <div className="min-h-screen text-white flex items-center justify-center px-6">
          <div className="w-full max-w-md rounded-3xl border border-emerald-400/20 bg-slate-950/70 p-8 text-center shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            <div className="relative mx-auto mb-6 h-20 w-20">
              <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <BookOpenIcon size={30} />
              </div>
            </div>
            <useParams className="text-lg font-black">
              {t_1("Preparando tu examen", "正在准备考试")}
            </useParams>
            <useParams className="mt-2 text-sm text-white/45">
              {t_1("Cargamos únicamente este nivel para entrar más rápido.", "仅加载当前级别，进入更快。")}
            </useParams>
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  if (!n || is) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="mx-auto text-white/10 mb-4" size={56} />
          <useParams className="text-white/40 text-lg">{t_1("Examen no encontrado", "未找到考试")}</useParams>
          <Link
            to={`/examenes-nivel/${De}`}
            className="text-orange-400 text-sm mt-4 inline-block hover:underline"
          >
            {t_1("Volver a examenes", "返回考试列表")}
          </Link>
        </div>
      </div>
    );
  }
  return (
    n.reading?.questions?.filter((t) => z[t.id] === t.correctAnswer).length,
    (
      <StarfieldBackground>
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at center, ${activeCfg.glow}, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes gradientRotate { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes iconBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes neonPulse { 0%, 100% { box-shadow: 0 0 20px currentColor; } 50% { box-shadow: 0 0 40px currentColor, 0 0 80px currentColor; } }
        @keyframes borderGlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } 100% { transform: translateX(0); } }
        @keyframes flashGreen { 0% { background: rgba(34,197,94,0); } 50% { background: rgba(34,197,94,0.2); } 100% { background: rgba(34,197,94,0); } }
        @keyframes barBounce { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.5); } }
        @keyframes confettiFly { 0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 1; } 100% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, -200px))) rotate(var(--tr, 360deg)) scale(0); opacity: 0; } }
        @keyframes scrollGlow { 0%, 100% { box-shadow: 0 0 30px rgba(59,130,246,0.3), inset 0 0 60px rgba(59,130,246,0.08); } 50% { box-shadow: 0 0 60px rgba(59,130,246,0.5), inset 0 0 80px rgba(59,130,246,0.15); } }
        @keyframes floatParticle { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; } 50% { transform: translateY(-20px) scale(1.2); opacity: 1; } }
        @keyframes spinBorder { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes sparkleTwinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.8); } }
        @keyframes medalFlipIn { from { transform: rotateY(180deg) scale(0.7); opacity: 0; } to { transform: rotateY(0deg) scale(1); opacity: 1; } }
        @keyframes dockFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes trophySpinIn { 0% { transform: rotateY(-540deg) scale(0.3); opacity: 0; } 60% { opacity: 1; } 100% { transform: rotateY(0deg) scale(1); opacity: 1; } }
        @keyframes modalRiseIn { from { opacity: 0; transform: perspective(1400px) translateY(60px) rotateX(14deg) scale(0.94); } to { opacity: 1; transform: perspective(1400px) translateY(0) rotateX(0deg) scale(1); } }
        @keyframes ringOrbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes voiceAvatarFloat { 0%, 100% { transform: translateY(0) rotateY(-8deg); } 50% { transform: translateY(-7px) rotateY(8deg); } }
        @keyframes voiceWave { 0%, 100% { transform: scaleY(.35); opacity: .45; } 50% { transform: scaleY(1); opacity: 1; } }
        @keyframes voiceHalo { to { transform: rotate(360deg); } }
        .voice-cockpit { width: 100%; border: 1px solid rgba(52,211,153,.16); background: linear-gradient(145deg,rgba(4,20,31,.78),rgba(8,12,34,.92)); box-shadow: inset 0 1px 0 rgba(255,255,255,.06),0 24px 70px rgba(0,0,0,.32),0 0 50px rgba(16,185,129,.07); border-radius: 28px; padding: 20px; overflow: hidden; position: relative; }
        .voice-character-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(132px,1fr)); gap: 12px; }
        .voice-character-card { min-height: 154px; border-radius: 22px; padding: 14px 10px; border: 1px solid rgba(255,255,255,.08); background: linear-gradient(155deg,rgba(255,255,255,.07),rgba(255,255,255,.018)); position: relative; overflow: hidden; transform: perspective(700px) rotateX(0) translateY(0); transition: transform .28s ease,border-color .28s ease,box-shadow .28s ease; }
        .voice-character-card:hover { transform: perspective(700px) rotateX(4deg) translateY(-5px); }
        .voice-character-card.is-active { border-color: var(--voice-color); box-shadow: 0 14px 34px color-mix(in srgb,var(--voice-color) 24%,transparent),inset 0 0 32px color-mix(in srgb,var(--voice-color) 11%,transparent); }
        .voice-avatar-3d { width: 66px; height: 66px; margin: 0 auto 10px; border-radius: 22px; display:flex; align-items:center; justify-content:center; font-size:36px; position:relative; isolation:isolate; animation: voiceAvatarFloat 4s ease-in-out infinite; filter: drop-shadow(0 12px 10px rgba(0,0,0,.3)); }
        .voice-avatar-3d::before { content:''; position:absolute; inset:-7px; border-radius:25px; border:1px dashed var(--voice-color); opacity:.45; animation:voiceHalo 9s linear infinite; }
        .voice-wave-mini { display:flex; height:14px; gap:3px; justify-content:center; align-items:center; }
        .voice-wave-mini span { width:3px; height:100%; border-radius:99px; background:var(--voice-color); animation:voiceWave .8s ease-in-out infinite; animation-play-state:paused; }
        .voice-character-card.is-active .voice-wave-mini span { animation-play-state:running; }
        .voice-speed-button { border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.045); color:rgba(255,255,255,.5); border-radius:16px; min-width:58px; padding:10px 12px; font-weight:900; transition:.25s ease; }
        .voice-speed-button:hover { transform:translateY(-2px); color:white; }
        .voice-speed-button.is-active { color:#071a16; background:linear-gradient(135deg,#6ee7b7,#22d3ee); border-color:transparent; box-shadow:0 10px 28px rgba(52,211,153,.28); }
        @media (max-width: 640px) { .voice-cockpit { padding:14px; border-radius:22px; } .voice-character-grid { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; padding:3px 2px 10px; } .voice-character-card { min-width:138px; scroll-snap-align:center; } }
        .dele-medal-inner { transition: transform 0.7s cubic-bezier(0.2,0.9,0.3,1); transform-style: preserve-3d; }
        .group\\/medal:hover .dele-medal-inner { transform: rotateY(180deg); }
        .dele-medal-face { backface-visibility: hidden; }
        .dele-medal-back { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
      `,
          }}
        />
        <div className="exam-experience relative max-w-5xl mx-auto px-4 py-8">
          <Link
            to={`/examenes-nivel/${De}`}
            className="inline-flex items-center gap-2 text-white/40 hover:text-orange-400 transition-all mb-6 text-sm group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t_1("Volver", "返回")}
          </Link>
          <OComponent glowColor={activeCfg.glow} color={activeCfg.color} className="mb-8">
            <div className="p-8 relative">
              <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
                <L_2 variant="exams" compact />
              </div>
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-40"
                style={{
                  background: `radial-gradient(circle, ${activeCfg.glow}, transparent)`,
                }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{
                  background: `radial-gradient(circle, ${activeCfg.glow}, transparent)`,
                }}
              />
              <div className="flex items-center gap-5 relative">
                <div
                  className="relative w-20 h-20 shrink-0"
                  style={{
                    perspective: "700px",
                  }}
                >
                  <div
                    className="absolute -inset-3 rounded-full border pointer-events-none"
                    style={{
                      borderColor: `${activeCfg.color}30`,
                      animation: "ringOrbit 8s linear infinite",
                    }}
                  >
                    <span
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: activeCfg.color,
                        boxShadow: `0 0 8px ${activeCfg.glow}`,
                      }}
                    />
                  </div>
                  <div
                    key={j}
                    className="group/medal relative w-full h-full"
                    style={{
                      animation: "medalFlipIn 0.6s cubic-bezier(0.2,0.9,0.3,1)",
                    }}
                  >
                    <div className="dele-medal-inner relative w-full h-full">
                      <div
                        className="dele-medal-face absolute inset-0 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${activeCfg.color}, ${activeCfg.color}dd)`,
                          boxShadow: `0 0 40px ${activeCfg.glow}, 0 0 80px ${activeCfg.glow}40`,
                        }}
                      >
                        <activeCfg.icon size={36} className="text-white" />
                        <div
                          className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full"
                          style={{
                            background: activeCfg.color,
                            boxShadow: `0 0 8px ${activeCfg.glow}`,
                          }}
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full"
                          style={{
                            background: activeCfg.color,
                            boxShadow: `0 0 6px ${activeCfg.glow}`,
                          }}
                        />
                      </div>
                      <div
                        className="dele-medal-face dele-medal-back absolute inset-0 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${activeCfg.color}, ${activeCfg.color}aa)`,
                          boxShadow: `0 0 40px ${activeCfg.glow}, inset 0 0 20px rgba(255,255,255,0.25)`,
                        }}
                      >
                        <span className="font-mono font-black text-white text-sm">{n.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className="text-xs font-bold px-4 py-1.5 rounded-xl text-white inline-block mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${activeCfg.color}, ${activeCfg.color}cc)`,
                      boxShadow: `0 0 15px ${activeCfg.glow}40`,
                    }}
                  >
                    {n.level}-{n.id}
                  </span>
                  <h1
                    className="text-3xl md:text-4xl font-black"
                    style={{
                      textShadow: `0 0 30px ${activeCfg.glow}40`,
                    }}
                  >
                    {n.theme}
                  </h1>
                </div>
              </div>
            </div>
          </OComponent>
          <div
            className="flex flex-wrap gap-3 mb-8"
            style={{
              perspective: "1000px",
            }}
          >
            {Ne.map((t) => {
              const a = It[t];
              const x = j === t;
              return (
                <button
                  key={t}
                  onClick={() => setJ(t)}
                  className="relative flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 overflow-hidden"
                  style={
                    x
                      ? {
                          background: `linear-gradient(135deg, ${a.glow}25, ${a.color}12)`,
                          border: `2px solid ${a.color}`,
                          color: "#fff",
                          boxShadow: `0 0 35px ${a.glow}50, 0 0 70px ${a.glow}25, inset 0 0 30px ${a.glow}15`,
                          textShadow: `0 0 15px ${a.glow}80`,
                          transform: "translateZ(18px) translateY(-2px)",
                          animation: "dockFloat 2.4s ease-in-out infinite",
                        }
                      : {
                          background: "rgba(255,255,255,0.03)",
                          border: "2px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.35)",
                          transform: "translateZ(0px)",
                        }
                  }
                >
                  {x && (
                    <>
                      <span
                        className="absolute inset-0 animate-pulse rounded-2xl opacity-20"
                        style={{
                          boxShadow: `0 0 40px ${a.color}`,
                        }}
                      />
                      <div
                        className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: a.color,
                          boxShadow: `0 0 8px ${a.glow}80`,
                        }}
                      />
                      <div
                        className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: a.color,
                          boxShadow: `0 0 8px ${a.glow}80`,
                        }}
                      />
                      <div
                        className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: a.color,
                          boxShadow: `0 0 8px ${a.glow}80`,
                        }}
                      />
                      <div
                        className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: a.color,
                          boxShadow: `0 0 8px ${a.glow}80`,
                        }}
                      />
                    </>
                  )}
                  <a.icon
                    size={16}
                    style={
                      x
                        ? {
                            color: a.color,
                            filter: `drop-shadow(0 0 6px ${a.glow})`,
                          }
                        : {}
                    }
                  />
                  <span className="relative">{a.label}</span>
                </button>
              );
            })}
          </div>
          {j === "vocabulario" && n.vocabulary && (
            <WComponent key="vocabulario">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(249,115,22,0.2)",
                    border: "2px solid rgba(249,115,22,0.4)",
                    boxShadow: "0 0 25px rgba(249,115,22,0.2)",
                  }}
                >
                  <BookOpenIcon size={26} className="text-orange-400" />
                </div>
                <div>
                  <h2
                    className="text-white font-black text-2xl"
                    style={{
                      textShadow: "0 0 20px rgba(249,115,22,0.3)",
                    }}
                  >
                    {t_1("Vocabulario del examen", "考试词汇")}
                  </h2>
                  <useParams className="text-orange-300/50 text-sm font-bold">
                    {n.vocabulary.length} {t_1("palabras", "词")}
                  </useParams>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {n.vocabulary.map((t, a) => {
                  const x = [
                    "#f97316",
                    "#f59e0b",
                    "#84cc16",
                    "#22c55e",
                    "#06b6d4",
                    "#3b82f6",
                    "#a855f7",
                    "#ec4899",
                  ];
                  const l = x[a % x.length];
                  return (
                    <Ue1Component
                      key={a}
                      className="rounded-3xl overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${l}18, rgba(0,0,0,0.15))`,
                        border: `2px solid ${l}50`,
                        boxShadow: `0 0 25px ${l}30`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] opacity-70"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${l}, transparent)`,
                          boxShadow: `0 0 10px ${l}80`,
                        }}
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                              style={{
                                background: `${l}25`,
                                border: `2px solid ${l}45`,
                                color: l,
                                boxShadow: `0 0 15px ${l}40`,
                              }}
                            >
                              {a + 1}
                            </span>
                            <span
                              className="text-white font-black text-xl md:text-2xl"
                              style={{
                                textShadow: `0 0 20px ${l}50`,
                              }}
                            >
                              {t.word}
                            </span>
                          </div>
                          <button
                            onClick={() => q(t.word)}
                            className="p-3 rounded-xl transition-all hover:scale-110 opacity-60 hover:opacity-100"
                            style={{
                              background: `${l}20`,
                              border: `1px solid ${l}40`,
                              boxShadow: `0 0 10px ${l}30`,
                            }}
                          >
                            <Volume2Icon
                              size={16}
                              style={{
                                color: l,
                                filter: `drop-shadow(0 0 4px ${l})`,
                              }}
                            />
                          </button>
                        </div>
                        <useParams
                          className="font-bold text-lg"
                          style={{
                            color: `${l}dd`,
                          }}
                        >
                          {t.chinese}
                        </useParams>
                        {t.example && (
                          <div
                            className="mt-3 rounded-xl p-3"
                            style={{
                              background: "rgba(0,0,0,0.25)",
                              border: `1px solid ${l}20`,
                            }}
                          >
                            <useParams
                              className="text-white/50 text-sm italic"
                              style={{
                                textShadow: `0 0 8px ${l}20`,
                              }}
                            >
                              “{t.example}”
                            </useParams>
                          </div>
                        )}
                      </div>
                    </Ue1Component>
                  );
                })}
              </div>
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}
          {j === "lectura" && n.reading && (
            <WComponent key="lectura" className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.2)",
                    border: "2px solid rgba(59,130,246,0.4)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.2)",
                  }}
                >
                  <FileTextIcon size={32} className="text-blue-400" />
                </div>
                <div>
                  <h2
                    className="text-white font-black text-2xl md:text-3xl"
                    style={{
                      textShadow: "0 0 25px rgba(59,130,246,0.3)",
                    }}
                  >
                    {n.reading.title}
                  </h2>
                  <span className="text-blue-300/50 text-sm font-bold">{n.reading.textType}</span>
                </div>
              </div>
              <OComponent glowColor="rgba(59,130,246,0.8)" color="#3b82f6">
                <div className="p-6 md:p-8">
                  <div
                    className="relative rounded-2xl p-[2px] overflow-hidden"
                    style={{
                      animation: "gradientRotate 3s linear infinite",
                      background: "linear-gradient(90deg, #3b82f6, #60a5fa, #818cf8, #3b82f6)",
                      backgroundSize: "300% 300%",
                    }}
                  >
                    <div
                      className="dele-reading-scroll rounded-2xl p-8 md:p-10 relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(20,30,70,0.95) 0%, rgba(15,25,55,0.98) 50%, rgba(10,18,40,0.99) 100%)",
                        border: "1px solid rgba(59,130,246,0.25)",
                        boxShadow: "0 0 50px rgba(59,130,246,0.25), inset 0 0 80px rgba(59,130,246,0.1)",
                        animation: "scrollGlow 4s ease-in-out infinite",
                      }}
                    >
                      {Array.from({
                        length: 8,
                      }).map((t, a) => (
                        <div
                          key={a}
                          className="absolute rounded-full pointer-events-none"
                          style={{
                            width: 3 + (a % 4),
                            height: 3 + (a % 4),
                            top: `${14 + ((a * 31) % 70)}%`,
                            left: `${7 + ((a * 43) % 86)}%`,
                            background: ["#3b82f6", "#60a5fa", "#93c5fd"][a % 3],
                            boxShadow: "0 0 8px currentColor",
                            animation: `floatParticle ${2.4 + (a % 3) * 0.7}s ease-in-out ${(a % 4) * 0.35}s infinite`,
                          }}
                        />
                      ))}
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div
                          className="h-px flex-1"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
                          }}
                        />
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(59,130,246,0.15)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            boxShadow: "0 0 15px rgba(59,130,246,0.3)",
                          }}
                        >
                          <BookOpenIcon size={20} className="text-blue-400" />
                        </div>
                        <span
                          className="text-sm font-bold uppercase tracking-widest"
                          style={{
                            color: "#60a5faa0",
                          }}
                        >
                          {n.reading.textType}
                        </span>
                        <div
                          className="h-px flex-1"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
                          }}
                        />
                      </div>
                      <useParams
                        className="text-white/90 text-xl md:text-2xl leading-[2.2] whitespace-pre-line font-medium"
                        style={{
                          textShadow: "0 0 20px rgba(59,130,246,0.2)",
                        }}
                      >
                        <XsComponent text={n.reading.text} speed={20} />
                      </useParams>
                      <div className="flex items-center justify-center gap-2 mt-6">
                        <div
                          className="h-px w-12"
                          style={{
                            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5))",
                          }}
                        />
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: "#60a5fa",
                            boxShadow: "0 0 10px #60a5fa",
                          }}
                        />
                        <div
                          className="h-px w-12"
                          style={{
                            background: "linear-gradient(270deg, transparent, rgba(59,130,246,0.5))",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </OComponent>
              <OComponent glowColor="rgba(59,130,246,0.6)" color="#3b82f6" tilt={false}>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                      <TargetIcon size={20} className="text-blue-400" /> {t_1("Preguntas", "问题")}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-lg font-black px-5 py-2 rounded-xl"
                        style={{
                          background: "rgba(59,130,246,0.1)",
                          color: "#60a5fa",
                          border: "1px solid rgba(59,130,246,0.2)",
                        }}
                      >
                        {Object.keys(A).length}/{n.reading.questions.length} {t_1("verificadas", "已验证")}
                      </span>
                      <button
                        onClick={() => {
                          setZ({});
                          setA({});
                          setM(new Set());
                        }}
                        className="px-4 py-2 rounded-xl text-white/50 font-bold text-sm transition-all flex items-center gap-2 hover:text-white hover:bg-white/10"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <RotateCcwIcon size={14} /> {t_1("Reintentar", "重试")}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-8">
                    {n.reading.questions.map((t, a) => {
                      const x = ["#3b82f6", "#60a5fa", "#818cf8", "#a78bfa"];
                      const l = x[a % x.length];
                      const d = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];
                      const p = [TargetIcon, StarIcon, HeartIcon, ZapIcon];
                      const u = A[t.id];
                      const N = u && z[t.id] === t.correctAnswer;
                      const show = N && M.has(t.id);
                      return (
                        <Ue1Component
                          key={t.id}
                          className="dele-question-card rounded-3xl p-6 md:p-8 relative overflow-hidden group"
                          style={{
                            background: u
                              ? N
                                ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(0,0,0,0.25))"
                                : "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(0,0,0,0.25))"
                              : "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(0,0,0,0.25))",
                            border: u
                              ? N
                                ? "2px solid rgba(34,197,94,0.6)"
                                : "2px solid rgba(239,68,68,0.6)"
                              : "2px solid rgba(59,130,246,0.3)",
                            boxShadow: u
                              ? N
                                ? "0 0 40px rgba(34,197,94,0.25)"
                                : "0 0 40px rgba(239,68,68,0.25)"
                              : "0 0 40px rgba(59,130,246,0.15)",
                          }}
                        >
                          <FtComponent show={show} />
                          <div
                            className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${l}, transparent)`,
                              boxShadow: `0 0 10px ${l}60`,
                            }}
                          />
                          <div className="flex items-start gap-4 mb-6">
                            <span
                              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black shrink-0"
                              style={{
                                background: u
                                  ? N
                                    ? "rgba(34,197,94,0.2)"
                                    : "rgba(239,68,68,0.2)"
                                  : `${l}20`,
                                border: `2px solid ${u ? (N ? "rgba(34,197,94,0.7)" : "rgba(239,68,68,0.7)") : `${l}50`}`,
                                color: u ? (N ? "#4ade80" : "#f87171") : l,
                                boxShadow: `0 0 25px ${u ? (N ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)") : `${l}40`}`,
                              }}
                            >
                              {t.id}
                            </span>
                            <p className="text-white text-xl font-black leading-relaxed flex-1">
                              {t.question}
                            </p>
                            {u && (
                              <span
                                className="px-3 py-1 rounded-xl text-xs font-black uppercase"
                                style={{
                                  background: N ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                                  color: N ? "#4ade80" : "#f87171",
                                  border: `1px solid ${N ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
                                }}
                              >
                                {N ? "✓ Correcta" : "✗ Incorrecta"}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {t.options.map((S, R) => {
                              const V = d[R % d.length];
                              const Me1 = p[R % p.length];
                              const ve = z[t.id] === R;
                              const se = R === t.correctAnswer;
                              const gs = u && ve && !se;
                              const ms = u && se;
                              return (
                                <button
                                  key={R}
                                  onClick={() => {
                                    if (!u) {
                                      setZ((us) => ({
                                        ...us,
                                        [t.id]: R,
                                      }));
                                    }
                                  }}
                                  className="dele-answer-option relative p-5 rounded-2xl text-base transition-all font-bold flex items-center gap-4 border-2 overflow-hidden group/opt hover:scale-[1.02]"
                                  style={{
                                    background: ve
                                      ? u
                                        ? se
                                          ? "rgba(34,197,94,0.25)"
                                          : "rgba(239,68,68,0.25)"
                                        : `${V}20`
                                      : u && se
                                        ? "rgba(34,197,94,0.25)"
                                        : "rgba(255,255,255,0.05)",
                                    borderColor: ve
                                      ? u
                                        ? se
                                          ? "rgba(34,197,94,0.9)"
                                          : "rgba(239,68,68,0.9)"
                                        : `${V}70`
                                      : u && se
                                        ? "rgba(34,197,94,0.9)"
                                        : "rgba(255,255,255,0.15)",
                                    boxShadow:
                                      ve && !u
                                        ? `0 0 35px ${V}50, inset 0 0 30px ${V}20`
                                        : u && se
                                          ? "0 0 30px rgba(34,197,94,0.4)"
                                          : "none",
                                    transform: ve && !u ? "scale(1.04)" : "scale(1)",
                                    animation: gs
                                      ? "shake 0.5s ease-in-out"
                                      : ms
                                        ? "flashGreen 0.8s ease-out"
                                        : "none",
                                  }}
                                >
                                  <span
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black shrink-0"
                                    style={{
                                      background: `${V}30`,
                                      border: `2px solid ${V}60`,
                                      color: V,
                                      boxShadow: `0 0 20px ${V}50`,
                                    }}
                                  >
                                    <Me1 size={18} />
                                  </span>
                                  <span className="text-white/90 text-base font-bold">{nt(S)}</span>
                                  {u && se && (
                                    <CircleCheckBigIcon
                                      size={22}
                                      className="text-green-400 ml-auto shrink-0"
                                      style={{
                                        filter: "drop-shadow(0 0 6px #22c55e)",
                                      }}
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {!u && (
                            <div className="mt-5 flex justify-end">
                              <button
                                onClick={() => {
                                  if (z[t.id] !== undefined) {
                                    setA((S) => ({
                                      ...S,
                                      [t.id]: true,
                                    }));
                                    if (z[t.id] === t.correctAnswer) {
                                      setM((S) => new Set(S).add(t.id));
                                    }
                                  }
                                }}
                                disabled={z[t.id] === undefined}
                                className="px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all shadow-lg hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 flex items-center gap-2"
                                style={{
                                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                                  boxShadow: "0 0 25px rgba(59,130,246,0.3)",
                                }}
                              >
                                <CircleCheckBigIcon size={16} /> {t_1("Comprobar", "检查")}
                              </button>
                            </div>
                          )}
                          {u && (
                            <div
                              className="mt-4 p-5 rounded-2xl text-base font-medium"
                              style={{
                                background: N ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                                border: `1px solid ${N ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
                              }}
                            >
                              <p className={N ? "text-green-400" : "text-red-400"}>{t.explanation}</p>
                            </div>
                          )}
                        </Ue1Component>
                      );
                    })}
                  </div>
                </div>
              </OComponent>
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}{" "}
          {j === "audicion" && n.listening && (
            <WComponent key="audicion" className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(16,185,129,0.2)",
                    border: "2px solid rgba(16,185,129,0.4)",
                    boxShadow: "0 0 30px rgba(16,185,129,0.2)",
                  }}
                >
                  <HeadphonesIcon size={32} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-white font-black text-2xl md:text-3xl">
                    {n.listening.title || t_1("Comprension auditiva", "听力理解")}
                  </h2>
                  <useParams className="text-white/40 text-sm font-medium">
                    {t_1("Escucha y responde", "听并回答")}
                  </useParams>
                </div>
              </div>
              <OComponent glowColor="#10b981" tilt={false}>
                <div className="p-6 md:p-8">
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, #10b981, transparent)",
                    }}
                  />
                  <div
                    className="rounded-2xl p-6 mb-6 overflow-hidden"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "2px solid rgba(16,185,129,0.3)",
                      boxShadow: "0 0 40px rgba(16,185,129,0.15), inset 0 0 40px rgba(16,185,129,0.05)",
                    }}
                  >
                    <div className="h-28 flex items-center justify-center gap-[3px] px-4 overflow-hidden">
                      {Array.from(
                        {
                          length: 40,
                        },
                        (t, a) => {
                          const x = 20 + Math.abs(Math.sin(a * 0.7)) * 60;
                          const l = a * 0.04;
                          return (
                            <div
                              key={a}
                              className="w-[3px] rounded-full bg-gradient-to-t from-emerald-600 via-emerald-400 to-emerald-200"
                              style={{
                                height: `${x}%`,
                                animation: _
                                  ? `barBounce ${0.4 + Math.abs(Math.sin(a * 0.3)) * 0.4}s ease-in-out ${l}s infinite`
                                  : "none",
                                transformOrigin: "bottom",
                                opacity: _ ? 0.9 : 0.3,
                              }}
                            />
                          );
                        },
                      )}
                    </div>
                  </div>
                  <div
                    className="h-3 bg-white/5 rounded-full overflow-hidden relative mb-8"
                    style={{
                      boxShadow: "0 0 15px rgba(16,185,129,0.1)",
                    }}
                  >
                    <div
                      className="h-full rounded-full relative transition-all duration-200"
                      style={{
                        width: `${Ht}%`,
                        background: "linear-gradient(90deg, #059669, #34d399, #22d3ee)",
                        boxShadow: "0 0 25px rgba(52,211,153,0.8), 0 0 50px rgba(52,211,153,0.3)",
                      }}
                    >
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"
                        style={{
                          boxShadow: "0 0 30px rgba(52,211,153,1), 0 0 60px rgba(52,211,153,0.5)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button
                      onClick={ds}
                      className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        boxShadow: "0 0 50px rgba(16,185,129,0.5), 0 0 100px rgba(16,185,129,0.2)",
                      }}
                    >
                      {_ ? (
                        <PauseIcon size={32} className="text-white" />
                      ) : (
                        <PlayIcon size={32} className="text-white ml-1" />
                      )}
                      {_ && (
                        <>
                          <span
                            className="absolute inset-0 rounded-full animate-ping opacity-20"
                            style={{
                              background: "#10b981",
                            }}
                          />
                          <span className="absolute -inset-3 rounded-full border-2 border-emerald-400/30 animate-pulse" />
                        </>
                      )}
                    </button>
                    <div className="voice-cockpit">
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <useParams className="flex items-center gap-2 text-sm font-black text-white">
                            <Volume2Icon size={17} className="text-emerald-300" />{" "}
                            {t_1("Estudio de voces", "语音工作室")}
                          </useParams>
                          <useParams className="mt-1 text-xs text-white/40">
                            {t_1(
                              "Elige un personaje y todo el examen sonará con esa voz.",
                              "选择角色，整场考试将使用该声音。",
                            )}
                          </useParams>
                        </div>
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-emerald-300">
                          Audio DELE
                        </span>
                      </div>
                      {T.length === 0 ? (
                        <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[.025] py-8 text-sm text-white/35">
                          <LoaderCircleIcon size={18} className="animate-spin text-emerald-300" />{" "}
                          {t_1("Preparando voces del dispositivo…", "正在准备设备语音…")}
                        </div>
                      ) : (
                        <div className="voice-character-grid relative z-10">
                          {T.slice(0, 6).map((t, a) => {
                            const x =
                              /female|mujer|femen|helena|laura|monica|victoria|sabina|elvira|dalia/i.test(
                                t.name,
                              );
                            const l = /male|hombre|mascul|pablo|alvaro|diego|jorge|roberto|arnau/i.test(
                              t.name,
                            );
                            const d = x
                              ? {
                                  color: "#f472b6",
                                  avatar: "👩‍🏫",
                                  role: t_1("Mentora", "女导师"),
                                }
                              : l
                                ? {
                                    color: "#60a5fa",
                                    avatar: "👨‍🎙️",
                                    role: t_1("Locutor", "男播音员"),
                                  }
                                : {
                                    color: "#a78bfa",
                                    avatar: "🧑‍🚀",
                                    role: t_1("Voz digital", "数字语音"),
                                  };
                            const p = f === a;
                            return (
                              <button
                                key={t.voiceURI || t.name + a}
                                className={`voice-character-card ${p ? "is-active" : ""}`}
                                style={{
                                  "--voice-color": d.color,
                                }}
                                aria-pressed={p}
                                aria-label={`${d.role}: ${t.name}`}
                                onClick={() => {
                                  setF(a);
                                  ie();
                                  set_(false);
                                  setGt_1(-1);
                                  setHt(0);
                                }}
                              >
                                {p && (
                                  <CircleCheckBigIcon
                                    size={17}
                                    className="absolute right-3 top-3 z-20"
                                    style={{
                                      color: d.color,
                                    }}
                                  />
                                )}
                                <div
                                  className="voice-avatar-3d"
                                  style={{
                                    "--voice-color": d.color,
                                    background: `linear-gradient(145deg, ${d.color}38, ${d.color}0b)`,
                                    boxShadow: `inset 0 1px 0 rgba(255,255,255,.18),0 12px 28px ${d.color}22`,
                                  }}
                                >
                                  {d.avatar}
                                </div>
                                <p className="text-sm font-black text-white">{d.role}</p>
                                <p className="mt-1 truncate text-[10px] text-white/38">{t.name}</p>
                                <div
                                  className="voice-wave-mini mt-3"
                                  style={{
                                    "--voice-color": d.color,
                                  }}
                                >
                                  {[0, 1, 2, 3, 4].map((u) => (
                                    <span
                                      key={u}
                                      style={{
                                        animationDelay: `${u * 0.1}s`,
                                      }}
                                    />
                                  ))}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      <div className="relative z-10 mt-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-2xl border border-white/[.07] bg-black/20 p-3">
                        <div className="flex items-center justify-between gap-3 px-2">
                          <div className="flex items-center gap-2">
                            <GaugeIcon size={18} className="text-cyan-300" />
                            <div>
                              <useParams className="text-xs font-black text-white">
                                {t_1("Ritmo de escucha", "播放速度")}
                              </useParams>
                              <useParams className="text-[10px] text-white/35">
                                {t_1("Adáptalo a tu nivel", "适应你的水平")}
                              </useParams>
                            </div>
                          </div>
                          <span className="text-xl font-black text-emerald-300">
                            {r.toFixed(2).replace(/0$/, "")}x
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[0.75, 1, 1.25, 1.5].map((t) => (
                            <button
                              key={t}
                              onClick={() => {
                                setR(t);
                                if (_) {
                                  ie();
                                  set_(false);
                                  setHt(0);
                                  setGt_1(-1);
                                }
                              }}
                              className={`voice-speed-button ${Math.abs(r - t) < 0.01 ? "is-active" : ""}`}
                            >
                              {t}x
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            ie();
                            set_(false);
                            setGt_1(-1);
                            setHt(0);
                          }}
                          className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-xs font-black text-white/45 transition hover:border-emerald-400/30 hover:text-emerald-300"
                        >
                          <RotateCcwIcon size={16} /> {t_1("Reiniciar", "重新开始")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </OComponent>
              <OComponent glowColor="#10b981" tilt={false}>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <FileTextIcon size={20} className="text-emerald-400" /> {t_1("Transcripcion", "转录")}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={xs}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          border: "1px solid rgba(16,185,129,0.28)",
                          color: "#6ee7b7",
                        }}
                      >
                        <RepeatIcon size={14} /> {t_1("Frase a frase", "逐句播放")}
                      </button>
                      <button
                        onClick={bs}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
                        style={{
                          background: "rgba(6,182,212,0.1)",
                          border: "1px solid rgba(6,182,212,0.28)",
                          color: "#67e8f9",
                        }}
                      >
                        <PenToolIcon size={14} /> {t_1("Dictado", "听写")}
                      </button>
                      <button
                        onClick={() => {
                          setX(!X);
                          if (X) {
                            set$e(false);
                            setGt(-1);
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all"
                        style={{
                          background: X ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${X ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.08)"}`,
                          color: X ? "#34d399" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {X ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                        {X ? t_1("Ocultar", "隐藏") : t_1("Mostrar", "显示")}
                      </button>
                    </div>
                  </div>
                  {Xt ? (
                    <div
                      className="rounded-2xl p-6 backdrop-blur-md"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(6,182,212,0.25)",
                      }}
                    >
                      <useParams className="text-white/70 text-sm font-bold mb-3 flex items-center gap-2">
                        <HeadphonesIcon size={16} className="text-cyan-300" />{" "}
                        {t_1("Escucha y escribe lo que oyes", "听并写下你听到的内容")}
                      </useParams>
                      <button
                        onClick={() => q(n.listening.transcription)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all mb-3"
                        style={{
                          background: "rgba(6,182,212,0.15)",
                          border: "1px solid rgba(6,182,212,0.3)",
                          color: "#67e8f9",
                        }}
                      >
                        <PlayIcon size={14} fill="currentColor" /> {t_1("Escuchar audio", "播放音频")}
                      </button>
                      <textarea
                        value={xt}
                        onChange={(t) => setXt_1(t.target.value)}
                        rows={6}
                        placeholder={t_1("Escribe aquí lo que escuchas…", "在这里写下你听到的内容…")}
                        className="w-full rounded-xl p-3 text-sm text-white outline-none resize-y"
                        style={{
                          background: "rgba(0,0,0,0.4)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => set_t(true)}
                          className="px-4 py-2 rounded-xl text-xs font-black transition-all"
                          style={{
                            background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                            color: "#fff",
                            boxShadow: "0 0 15px rgba(6,182,212,0.25)",
                          }}
                        >
                          {t_1("Comprobar", "检查")}
                        </button>
                        <button
                          onClick={() => setXt(false)}
                          className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          {t_1("Salir", "退出")}
                        </button>
                      </div>
                      {_t &&
                        (() => {
                          const t = n.listening.transcription
                            .toLowerCase()
                            .replace(/[^\wáéíóúñü\s]/g, " ")
                            .split(/\s+/)
                            .filter(Boolean);
                          const a = xt
                            .toLowerCase()
                            .replace(/[^\wáéíóúñü\s]/g, " ")
                            .split(/\s+/)
                            .filter(Boolean);
                          const x = new Set(a);
                          let l = 0;
                          for (const p of t) {
                            if (x.has(p)) {
                              l += 1;
                            }
                          }
                          const d = t.length ? Math.round((l / t.length) * 100) : 0;
                          return (
                            <div
                              className="mt-4 rounded-xl p-4"
                              style={{
                                background: "rgba(6,182,212,0.08)",
                                border: "1px solid rgba(6,182,212,0.25)",
                              }}
                            >
                              <useParams className="text-white font-black">
                                🎯 {t_1("Precisión", "准确率")}: {d}%
                              </useParams>
                              <useParams className="text-white/40 text-xs mt-2 font-bold">
                                {t_1("Texto correcto", "正确文本")}:
                              </useParams>
                              <useParams className="text-white/85 text-sm mt-1 whitespace-pre-wrap leading-relaxed">
                                {n.listening.transcription}
                              </useParams>
                            </div>
                          );
                        })()}
                    </div>
                  ) : X ? (
                    <div
                      className="rounded-2xl p-6 md:p-8 backdrop-blur-md"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        boxShadow: "0 0 30px rgba(16,185,129,0.1), inset 0 0 60px rgba(16,185,129,0.02)",
                      }}
                    >
                      {$e ? (
                        <div className="text-base md:text-lg leading-[2.2]">
                          {n.listening.transcription
                            .split(new RegExp("(?<=[.!?])\\s+"))
                            .filter((t) => t.trim())
                            .map((t, a) => (
                              <span
                                key={a}
                                onClick={() => {
                                  setGt(a);
                                  q(t);
                                }}
                                className={`transition-all duration-200 inline rounded px-1.5 py-0.5 cursor-pointer ${Gt === a ? "bg-emerald-500/30 text-emerald-200 font-bold shadow-lg shadow-emerald-500/30" : "text-white/70 hover:bg-white/5"}`}
                              >
                                {t}{" "}
                              </span>
                            ))}
                        </div>
                      ) : (
                        <useParams className="text-base md:text-lg leading-[2.2]">
                          {n.listening.transcription
                            .split(/\s+/)
                            .filter(Boolean)
                            .map((t, a) => (
                              <span
                                key={a}
                                className={`transition-all duration-150 inline-block mr-[0.3em] rounded px-1.5 py-0.5 ${_ && a === gt ? "bg-emerald-500/30 text-emerald-200 font-bold shadow-lg shadow-emerald-500/30 scale-110 border border-emerald-500/30" : _ && a < gt ? "text-emerald-400/60" : "text-white/70"}`}
                              >
                                {t}
                              </span>
                            ))}
                        </useParams>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-6">
                        <button
                          onClick={() => q(n.listening.transcription)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                          style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            color: "#fff",
                            boxShadow: "0 0 15px rgba(16,185,129,0.2)",
                          }}
                        >
                          <Volume2Icon size={16} /> {t_1("Escuchar", "听")}
                        </button>
                        <div
                          className="flex items-center gap-1 rounded-lg px-2 py-1"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <GaugeIcon size={12} className="text-white/30" />
                          {[0.75, 1, 1.25].map((t) => (
                            <button
                              key={t}
                              onClick={() => setR(t)}
                              className="px-2 py-1 rounded text-[10px] font-bold transition-all"
                              style={
                                r === t
                                  ? {
                                      background: "rgba(16,185,129,0.15)",
                                      color: "#34d399",
                                    }
                                  : {
                                      color: "rgba(255,255,255,0.3)",
                                    }
                              }
                            >
                              {t}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="rounded-2xl p-10 text-center backdrop-blur-md"
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <EyeOffIcon size={40} className="text-white/10 mx-auto mb-4" />
                      <useParams className="text-white/30 text-base font-medium">
                        {t_1("Escucha primero y luego revela el texto.", "请先听，然后再显示文本。")}
                      </useParams>
                      <button
                        onClick={() => setX(true)}
                        className="mt-4 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105"
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          color: "#34d399",
                          border: "1px solid rgba(16,185,129,0.2)",
                        }}
                      >
                        {t_1("Revelar texto", "显示文本")}
                      </button>
                    </div>
                  )}
                </div>
              </OComponent>
              <OComponent glowColor="#10b981" tilt={false}>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <TargetIcon size={20} className="text-emerald-400" />{" "}
                        {t_1("Preguntas de audición", "听力问题")}
                      </h3>
                      <useParams className="text-white/35 text-sm mt-1">
                        {t_1(
                          "Escúchalas individualmente o revisa todas en una sola pantalla.",
                          "可逐题收听，或在同一屏幕查看全部问题。",
                        )}
                      </useParams>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          q(n.listening.questions.map((t, a) => `${a + 1}. ${t.question}`).join(". "))
                        }
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all hover:-translate-y-0.5"
                        style={{
                          background: "linear-gradient(135deg, rgba(16,185,129,.28), rgba(6,182,212,.2))",
                          border: "1px solid rgba(52,211,153,.45)",
                          color: "#a7f3d0",
                          boxShadow: "0 0 22px rgba(16,185,129,.14)",
                        }}
                      >
                        <PlayIcon size={15} fill="currentColor" /> {t_1("Escuchar todas", "收听全部")}
                      </button>
                      <button
                        onClick={() =>
                          setAe((t) => {
                            if (t === "cards") {
                              return "all";
                            }
                            return "cards";
                          })
                        }
                        aria-pressed={Ae === "all"}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all"
                        style={
                          Ae === "all"
                            ? {
                                background: "rgba(34,211,238,.18)",
                                border: "1px solid rgba(34,211,238,.55)",
                                color: "#67e8f9",
                                boxShadow: "0 0 22px rgba(34,211,238,.16)",
                              }
                            : {
                                background: "rgba(255,255,255,.05)",
                                border: "1px solid rgba(255,255,255,.12)",
                                color: "rgba(255,255,255,.65)",
                              }
                        }
                      >
                        <FileTextIcon size={16} />
                        {Ae === "all"
                          ? t_1("Vista detallada", "详细视图")
                          : t_1("Todas en una pantalla", "同屏查看全部")}
                      </button>
                    </div>
                  </div>
                  {Ae === "all" ? (
                    <div
                      className="rounded-3xl overflow-hidden"
                      style={{
                        border: "1px solid rgba(52,211,153,.24)",
                        background: "rgba(2,12,22,.55)",
                        boxShadow: "inset 0 1px rgba(255,255,255,.05), 0 24px 70px rgba(0,0,0,.28)",
                      }}
                    >
                      {n.listening.questions.map((t, a) => (
                        <article key={t.id} className="p-4 md:p-5 border-b border-white/5 last:border-b-0">
                          <div className="flex items-start gap-3">
                            <span
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-black text-emerald-300"
                              style={{
                                background: "rgba(16,185,129,.15)",
                                border: "1px solid rgba(52,211,153,.3)",
                              }}
                            >
                              {a + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <useParams className="text-white font-black leading-relaxed">
                                  {t.question}
                                </useParams>
                                <button
                                  onClick={() => q(t.question)}
                                  aria-label={t_1(`Escuchar pregunta ${a + 1}`, `收听问题 ${a + 1}`)}
                                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-emerald-300 transition-all hover:scale-105"
                                  style={{
                                    background: "rgba(16,185,129,.14)",
                                    border: "1px solid rgba(52,211,153,.3)",
                                  }}
                                >
                                  <PlayIcon size={15} fill="currentColor" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {t.options.map((x, l) => {
                                  const d = Y[t.id] === l;
                                  const p = l === t.correctAnswer;
                                  return (
                                    <button
                                      key={l}
                                      onClick={() => {
                                        if (!$) {
                                          setY((u) => ({
                                            ...u,
                                            [t.id]: l,
                                          }));
                                        }
                                      }}
                                      className="text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all"
                                      style={{
                                        background:
                                          $ && p
                                            ? "rgba(34,197,94,.18)"
                                            : d
                                              ? "rgba(16,185,129,.18)"
                                              : "rgba(255,255,255,.035)",
                                        border: `1px solid ${$ && p ? "rgba(74,222,128,.65)" : d ? "rgba(52,211,153,.55)" : "rgba(255,255,255,.08)"}`,
                                        color: d || ($ && p) ? "#fff" : "rgba(255,255,255,.62)",
                                      }}
                                    >
                                      <span className="text-emerald-400 mr-2">
                                        {String.fromCharCode(65 + l)}
                                      </span>
                                      {nt(x)}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {n.listening.questions.map((t, a) => {
                        const x = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"];
                        const l = x[a % x.length];
                        return (
                          <Ue1Component
                            key={t.id}
                            className="dele-question-card dele-question-audio rounded-3xl p-6 md:p-8 relative overflow-hidden group"
                            style={{
                              background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(0,0,0,0.2))",
                              border: "2px solid rgba(16,185,129,0.25)",
                              boxShadow: "0 0 30px rgba(16,185,129,0.1)",
                            }}
                          >
                            <div
                              className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${l}, transparent)`,
                                boxShadow: `0 0 10px ${l}60`,
                              }}
                            />
                            <div className="flex items-start gap-4 mb-6">
                              <span
                                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black shrink-0"
                                style={{
                                  background: `${l}20`,
                                  border: `2px solid ${l}50`,
                                  color: l,
                                  boxShadow: `0 0 25px ${l}40`,
                                }}
                              >
                                {t.id}
                              </span>
                              <useParams className="text-white text-xl font-black leading-relaxed flex-1">
                                {t.question}
                              </useParams>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {t.options.map((d, p) => {
                                const u = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];
                                const N = u[p % u.length];
                                const P = Y[t.id] === p;
                                const S = p === t.correctAnswer;
                                const R = $ && P && !S;
                                const V = $ && S;
                                return (
                                  <button
                                    key={p}
                                    onClick={() => {
                                      if (!$) {
                                        setY((me) => ({
                                          ...me,
                                          [t.id]: p,
                                        }));
                                      }
                                    }}
                                    className="dele-answer-option relative p-5 rounded-2xl text-base transition-all font-bold flex items-center gap-4 border-2 overflow-hidden group/opt hover:scale-[1.02]"
                                    style={{
                                      background: P
                                        ? $
                                          ? S
                                            ? "rgba(34,197,94,0.2)"
                                            : "rgba(239,68,68,0.2)"
                                          : `${N}18`
                                        : $ && S
                                          ? "rgba(34,197,94,0.2)"
                                          : "rgba(255,255,255,0.05)",
                                      borderColor: P
                                        ? $
                                          ? S
                                            ? "rgba(34,197,94,0.8)"
                                            : "rgba(239,68,68,0.8)"
                                          : `${N}60`
                                        : $ && S
                                          ? "rgba(34,197,94,0.8)"
                                          : "rgba(255,255,255,0.12)",
                                      boxShadow:
                                        P && !$
                                          ? `0 0 30px ${N}40, inset 0 0 25px ${N}15`
                                          : $ && S
                                            ? "0 0 25px rgba(34,197,94,0.3)"
                                            : "none",
                                      transform: P && !$ ? "scale(1.03)" : "scale(1)",
                                      animation: R
                                        ? "shake 0.5s ease-in-out"
                                        : V
                                          ? "flashGreen 0.8s ease-out"
                                          : "none",
                                    }}
                                  >
                                    <span
                                      className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black shrink-0"
                                      style={{
                                        background: `${N}25`,
                                        border: `2px solid ${N}50`,
                                        color: N,
                                        boxShadow: `0 0 18px ${N}40`,
                                      }}
                                    >
                                      {String.fromCharCode(65 + p)}
                                    </span>
                                    <span className="text-white/90 text-base font-bold">{nt(d)}</span>
                                    {$ && S && (
                                      <CircleCheckBigIcon
                                        size={22}
                                        className="text-green-400 ml-auto shrink-0"
                                      />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                            {$ && Y[t.id] !== undefined && (
                              <div
                                className="mt-4 p-5 rounded-2xl text-base font-medium"
                                style={{
                                  background:
                                    Y[t.id] === t.correctAnswer
                                      ? "rgba(34,197,94,0.08)"
                                      : "rgba(239,68,68,0.08)",
                                  border: `1px solid ${Y[t.id] === t.correctAnswer ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)"}`,
                                }}
                              >
                                <useParams
                                  className={Y[t.id] === t.correctAnswer ? "text-green-400" : "text-red-400"}
                                >
                                  {t.explanation}
                                </useParams>
                              </div>
                            )}
                          </Ue1Component>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex gap-3 mt-6">
                    {$ ? (
                      <button
                        onClick={() => {
                          set$(false);
                          setY({});
                        }}
                        className="px-8 py-4 rounded-2xl text-white/50 font-bold text-base transition-all flex items-center gap-2 hover:text-white hover:bg-white/10"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <RotateCcwIcon size={16} /> {t_1("Reintentar", "重试")}
                      </button>
                    ) : (
                      <button
                        onClick={() => set$(true)}
                        disabled={Object.keys(Y).length < (n.listening?.questions?.length || 0)}
                        className="px-8 py-4 rounded-2xl text-white font-bold text-base transition-all shadow-lg hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                        style={{
                          background: "linear-gradient(135deg, #10b981, #059669)",
                          boxShadow: "0 0 30px rgba(16,185,129,0.3)",
                        }}
                      >
                        {t_1("Comprobar", "检查")}
                      </button>
                    )}
                  </div>
                </div>
              </OComponent>
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}
          {j === "ejercicios" && (
            <WComponent key="ejercicios" className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(245,158,11,0.2)",
                    border: "2px solid rgba(245,158,11,0.4)",
                    boxShadow: "0 0 30px rgba(245,158,11,0.2)",
                  }}
                >
                  <ZapIcon size={32} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="text-white font-black text-2xl md:text-3xl">
                    {t_1("Ejercicios variados", "多样练习")}
                  </h2>
                  <useParams className="text-amber-300/50 text-sm font-bold">
                    {t_1(
                      "Estilo DELE: verdadero/falso, emparejar, huecos, ordenar y transformar",
                      "DELE风格：判断、配对、填空、排序和改写",
                    )}
                  </useParams>
                </div>
              </div>
              <DsComponent exercises={exercises} />
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}
          {j === "gramatica" && (
            <WComponent key="gramatica" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(34,211,238,0.2)",
                    border: "2px solid rgba(34,211,238,0.4)",
                    boxShadow: "0 0 30px rgba(34,211,238,0.2)",
                  }}
                >
                  <LightbulbIcon size={32} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-white font-black text-2xl md:text-3xl">
                    {t_1("Gramatica del nivel", "本级语法")} {n.level}
                  </h2>
                  <useParams className="text-cyan-300/50 text-sm font-bold">
                    {t_1("Puntos clave para tu nivel DELE", "你的DELE级别的关键语法点")}
                  </useParams>
                </div>
              </div>
              <div className="space-y-3">
                {GRAMMAR_TOPICS.filter((t) => t.level.includes(n.level)).map((t) => (
                  <div
                    key={t.id}
                    className="rounded-2xl p-4"
                    style={{
                      background: "linear-gradient(180deg, rgba(14,22,64,.55), rgba(5,8,27,.45))",
                      border: "1px solid rgba(34,211,238,0.2)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-xs font-black px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(34,211,238,0.15)",
                          color: "#67e8f9",
                          border: "1px solid rgba(34,211,238,0.3)",
                        }}
                      >
                        {t.level}
                      </span>
                      <h3 className="text-white font-black">
                        {t.title} <span className="text-sm font-bold text-cyan-300">{t.titleCn}</span>
                      </h3>
                    </div>
                    <useParams className="text-white/70 text-sm leading-relaxed">{t.explanationCn}</useParams>
                    {t.examples[0] && (
                      <useParams className="text-white/50 text-sm mt-1.5">
                        💬 {t.examples[0].es} <span className="text-white/35">{t.examples[0].zh}</span>
                      </useParams>
                    )}
                    <Link
                      to="/gramatica"
                      className="inline-block mt-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                    >
                      {t_1("Ver gramática completa", "查看完整语法")} →
                    </Link>
                  </div>
                ))}
              </div>
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}
          {j === "descripcion-fotografia" && n.photoDescription && (
            <WComponent key="foto" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,138,42,0.2)",
                      border: "2px solid rgba(255,138,42,0.4)",
                      boxShadow: "0 0 30px rgba(255,138,42,0.2)",
                    }}
                  >
                    <CameraIcon size={32} className="text-orange-400" />
                  </div>
                  <div>
                    <h2
                      className="text-white font-black text-2xl md:text-3xl"
                      style={{
                        textShadow: "0 0 25px rgba(255,138,42,0.3)",
                      }}
                    >
                      {t_1("Descripcion de fotografia", "照片描述")}
                    </h2>
                    <useParams className="text-white/40 text-sm font-medium">
                      {t_1("Describe la imagen en voz alta o por escrito", "口头或书面描述图片")}
                    </useParams>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVt((t) => !t)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={
                      vt
                        ? {
                            background: "linear-gradient(135deg, #f59e0b, #f97316)",
                            color: "#fff",
                            boxShadow: "0 0 30px rgba(255,138,42,0.4)",
                          }
                        : {
                            background: "rgba(255,138,42,0.12)",
                            border: "1px solid rgba(255,138,42,0.35)",
                            color: "#fb923c",
                          }
                    }
                  >
                    <CameraIcon size={16} /> {t_1("Comparar 2 fotos", "比较2张照片")}
                  </button>
                  <button
                    onClick={() => setAt(Math.floor(Math.random() * 10000))}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #ff8a2a, #f97316)",
                      boxShadow: "0 0 30px rgba(255,138,42,0.4)",
                    }}
                  >
                    <RotateCcwIcon size={16} /> {t_1("Nueva foto", "新照片")}
                  </button>
                </div>
              </div>
              <Ue1Component
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,138,42,0.08), rgba(0,0,0,0.15))",
                  border: "2px solid rgba(255,138,42,0.25)",
                  boxShadow: "0 0 40px rgba(255,138,42,0.15), 0 0 80px rgba(255,138,42,0.08)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background: "linear-gradient(90deg, transparent, #ff8a2a, transparent)",
                    boxShadow: "0 0 15px #ff8a2a",
                  }}
                />
                <div className="p-4 md:p-6">
                  <div
                    className="relative rounded-2xl p-[3px] overflow-hidden"
                    style={{
                      animation: "gradientRotate 3s linear infinite",
                      background: "linear-gradient(90deg, #ff8a2a, #f59e0b, #f97316, #ff8a2a)",
                      backgroundSize: "300% 300%",
                    }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: "0 0 60px rgba(255,138,42,0.3), inset 0 0 30px rgba(255,138,42,0.1)",
                      }}
                    >
                      <img
                        src={`https://picsum.photos/seed/dele-foto-${at}/800/500`}
                        alt={t_1("Fotografia del examen DELE", "DELE考试照片")}
                        className="w-full h-auto object-cover transition-transform duration-700"
                        style={{
                          minHeight: "320px",
                          maxHeight: "500px",
                        }}
                        loading="eager"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                        }}
                      />
                      <div
                        className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full"
                        style={{
                          background: "#ff8a2a",
                          boxShadow: "0 0 10px #ff8a2a",
                        }}
                      />
                      <div
                        className="absolute top-3 right-3 w-2 h-2 rounded-full"
                        style={{
                          background: "#f59e0b",
                          boxShadow: "0 0 8px #f59e0b",
                        }}
                      />
                      <div
                        className="absolute bottom-3 left-3 w-2 h-2 rounded-full"
                        style={{
                          background: "#f97316",
                          boxShadow: "0 0 8px #f97316",
                        }}
                      />
                      <div
                        className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full"
                        style={{
                          background: "#ff8a2a",
                          boxShadow: "0 0 10px #ff8a2a",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Ue1Component>
              {vt && (
                <OComponent glowColor="#f59e0b" color="#ff8a2a" tilt={false}>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <CameraIcon size={20} className="text-orange-400" />
                      <h3 className="text-white font-black text-lg">
                        {t_1("Compara las dos fotos", "比较两张照片")}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          border: "2px solid rgba(255,138,42,0.3)",
                        }}
                      >
                        <img
                          src={`https://picsum.photos/seed/dele-foto-${at}/400/500`}
                          alt="Foto A"
                          className="w-full h-48 object-cover"
                        />
                        <useParams
                          className="text-center text-xs font-bold py-1"
                          style={{
                            background: "rgba(255,138,42,0.15)",
                            color: "#fb923c",
                          }}
                        >
                          Foto A
                        </useParams>
                      </div>
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          border: "2px solid rgba(255,138,42,0.3)",
                        }}
                      >
                        <img
                          src={`https://picsum.photos/seed/dele-foto2-${at}/400/500`}
                          alt="Foto B"
                          className="w-full h-48 object-cover"
                        />
                        <useParams
                          className="text-center text-xs font-bold py-1"
                          style={{
                            background: "rgba(255,138,42,0.15)",
                            color: "#fb923c",
                          }}
                        >
                          Foto B
                        </useParams>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-white/85">
                      <useParams>
                        1. {t_1("¿Qué tienen en común las dos fotos?", "这两张照片有什么共同点？")}
                      </useParams>
                      <useParams>2. {t_1("¿En qué se diferencian?", "它们有什么不同？")}</useParams>
                      <useParams>
                        3. {t_1("¿Cuál prefieres y por qué?", "你更喜欢哪一张？为什么？")}
                      </useParams>
                    </div>
                  </div>
                </OComponent>
              )}
              <OComponent glowColor="#ff8a2a" color="#f59e0b" tilt={false}>
                <div className="p-6 md:p-8 relative">
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: "linear-gradient(90deg, transparent, #ff8a2a, transparent)",
                      boxShadow: "0 0 15px #ff8a2a",
                    }}
                  />
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,138,42,0.15)",
                        border: "1px solid rgba(255,138,42,0.3)",
                        boxShadow: "0 0 15px rgba(255,138,42,0.3)",
                      }}
                    >
                      <TypeIcon size={20} className="text-orange-400" />
                    </div>
                    <h3
                      className="text-white font-black text-lg"
                      style={{
                        textShadow: "0 0 15px rgba(255,138,42,0.3)",
                      }}
                    >
                      {t_1("Practica tu descripcion", "练习你的描述")}
                    </h3>
                  </div>
                  <textarea
                    value={Ye}
                    onChange={(t) => setYe(t.target.value)}
                    placeholder={t_1(
                      "Escribe tu descripcion de la foto aqui...",
                      "在这里写你对照片的描述...",
                    )}
                    className="w-full h-56 rounded-2xl p-5 text-white text-base placeholder-white/25 focus:outline-none resize-none leading-relaxed font-medium"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255,138,42,0.3)",
                      boxShadow: "0 0 30px rgba(255,138,42,0.15), inset 0 0 30px rgba(255,138,42,0.05)",
                    }}
                    onFocus={(t) => {
                      t.target.style.borderColor = "rgba(255,138,42,0.8)";
                      t.target.style.boxShadow =
                        "0 0 40px rgba(255,138,42,0.3), 0 0 80px rgba(255,138,42,0.1), inset 0 0 30px rgba(255,138,42,0.1)";
                    }}
                    onBlur={(t) => {
                      t.target.style.borderColor = "rgba(255,138,42,0.3)";
                      t.target.style.boxShadow =
                        "0 0 30px rgba(255,138,42,0.15), inset 0 0 30px rgba(255,138,42,0.05)";
                    }}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 text-sm font-medium">
                        {Ye.split(/\s+/).filter(Boolean).length} {t_1("palabras", "词")}
                      </span>
                      <span
                        className="text-xs px-3 py-1 rounded-lg font-bold"
                        style={{
                          background: remainingTokens === 0 ? "rgba(239,68,68,0.15)" : "rgba(255,138,42,0.1)",
                          color: remainingTokens === 0 ? "#f87171" : "#fb923c",
                          border: `1px solid ${remainingTokens === 0 ? "rgba(239,68,68,0.3)" : "rgba(255,138,42,0.2)"}`,
                        }}
                      >
                        {remainingTokens.toLocaleString()} {t_1("tokens hoy", "tokens今日剩余")}
                      </span>
                    </div>
                    <button
                      onClick={() => pe(Ye, "monologo", setNt, "Descripcion de fotografia")}
                      disabled={isCorrecting || !Ye.trim() || C}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all hover:scale-105 disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #ff8a2a, #f97316)",
                        boxShadow: "0 0 40px rgba(255,138,42,0.5), 0 0 80px rgba(255,138,42,0.2)",
                      }}
                    >
                      {isCorrecting ? (
                        <LoaderCircleIcon size={18} className="animate-spin" />
                      ) : (
                        <SparklesIcon size={18} />
                      )}
                      {isCorrecting ? t_1("Corrigiendo...", "批改中...") : t_1("Corregir con IA", "AI批改")}
                    </button>
                  </div>
                </div>
              </OComponent>
              {Nt && <C_1 data={Nt} />}
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}
          {j === "escritura" && n.writing && (
            <WComponent key="escritura" className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(168,85,247,0.15)",
                    border: "2px solid rgba(168,85,247,0.25)",
                  }}
                >
                  <PenToolIcon size={20} className="text-violet-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">{t_1("Escritura", "写作")}</h2>
                  <useParams className="text-white/30 text-xs">
                    {t_1("Elige una opcion", "选择一个选项")}
                  </useParams>
                </div>
              </div>
              <div className="flex gap-2">
                {["A", "B"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTe(t);
                      setRe("");
                      setKe(null);
                    }}
                    className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all relative overflow-hidden"
                    style={
                      Te === t
                        ? {
                            background: "linear-gradient(135deg, #a855f7, #9333ea)",
                            color: "#fff",
                            boxShadow: "0 0 30px rgba(168,85,247,0.5), 0 0 60px rgba(168,85,247,0.2)",
                            border: "2px solid rgba(168,85,247,0.6)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.4)",
                            border: "1px solid rgba(255,255,255,0.12)",
                          }
                    }
                  >
                    {Te === t && (
                      <span
                        className="absolute inset-0 animate-pulse rounded-xl opacity-30"
                        style={{
                          boxShadow: "0 0 40px #a855f7",
                        }}
                      />
                    )}
                    <span className="relative">
                      {t_1("Opcion", "选项")} {t}
                    </span>
                  </button>
                ))}
              </div>
              {(() => {
                const t = Te === "A" ? n.writing.optionA : n.writing.optionB;
                return (
                  <>
                    <Ue1Component
                      className="rounded-3xl overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(0,0,0,0.2))",
                        border: "2px solid rgba(168,85,247,0.3)",
                        boxShadow: "0 0 40px rgba(168,85,247,0.15)",
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{
                          background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
                          boxShadow: "0 0 15px #a855f7",
                        }}
                      />
                      <div className="p-6 md:p-8 relative">
                        <h3
                          className="text-white font-black text-xl md:text-2xl mb-3"
                          style={{
                            textShadow: "0 0 15px rgba(168,85,247,0.2)",
                          }}
                        >
                          {t.title}
                        </h3>
                        <useParams className="text-white/50 text-base font-medium mb-5">
                          {t.description}
                        </useParams>
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          {["Intro / 开头", "Cuerpo / 主体", "Final / 结尾"].map((a, x) => (
                            <div
                              key={x}
                              className="rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5"
                              style={{
                                background: "rgba(168,85,247,0.15)",
                                border: "1px solid rgba(168,85,247,0.3)",
                                boxShadow: "0 0 15px rgba(168,85,247,0.1)",
                              }}
                            >
                              <span className="text-violet-400 text-sm font-black">{a.split(" / ")[0]}</span>
                              <useParams className="text-white/30 text-xs mt-2 font-medium">
                                {[t.structure.intro, t.structure.body, t.structure.conclusion][x]}
                              </useParams>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-white/25 text-sm font-bold mr-1">
                            {t_1("Conectores", "连接词")}:
                          </span>
                          {t.connectors.map((a, x) => (
                            <button
                              key={x}
                              onClick={() => setRe((l) => l + (l ? " " : "") + a)}
                              className="text-sm px-3 py-1 rounded-lg transition-all hover:scale-105 font-bold"
                              style={{
                                background: "rgba(168,85,247,0.1)",
                                color: "#c084fc",
                                border: "1px solid rgba(168,85,247,0.15)",
                              }}
                            >
                              {a}
                            </button>
                          ))}
                        </div>
                        <span className="text-white/25 text-sm font-medium">
                          {t_1("Palabras", "词数")}:{" "}
                          <span className="text-white/50 font-bold">{t.wordCount}</span>
                        </span>
                      </div>
                    </Ue1Component>
                    <div
                      className="rounded-3xl overflow-hidden relative"
                      style={{
                        background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(0,0,0,0.15))",
                        border: "2px solid rgba(168,85,247,0.2)",
                        boxShadow: "0 0 30px rgba(168,85,247,0.1)",
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{
                          background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
                          boxShadow: "0 0 15px #a855f7",
                        }}
                      />
                      <div className="p-6 relative">
                        <textarea
                          value={Re}
                          onChange={(a) => setRe(a.target.value)}
                          placeholder={t_1("Escribe tu texto aqui...", "在此写你的文本...")}
                          className="w-full h-52 rounded-2xl p-5 text-white text-base placeholder-white/25 focus:outline-none resize-none leading-relaxed font-medium"
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            border: "2px solid rgba(168,85,247,0.3)",
                            boxShadow: "0 0 30px rgba(168,85,247,0.15), inset 0 0 30px rgba(168,85,247,0.05)",
                          }}
                          onFocus={(a) => {
                            a.target.style.borderColor = "rgba(168,85,247,0.8)";
                            a.target.style.boxShadow =
                              "0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(168,85,247,0.1), inset 0 0 30px rgba(168,85,247,0.1)";
                          }}
                          onBlur={(a) => {
                            a.target.style.borderColor = "rgba(168,85,247,0.3)";
                            a.target.style.boxShadow =
                              "0 0 30px rgba(168,85,247,0.15), inset 0 0 30px rgba(168,85,247,0.05)";
                          }}
                        />
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-white/30 text-sm font-medium">
                              {Re.split(/\s+/).filter(Boolean).length} {t_1("palabras", "词")}
                            </span>
                            <span
                              className="text-xs px-3 py-1 rounded-lg font-bold"
                              style={{
                                background:
                                  remainingTokens === 0 ? "rgba(239,68,68,0.15)" : "rgba(251,191,36,0.1)",
                                color: remainingTokens === 0 ? "#f87171" : "#fbbf24",
                                border: `1px solid ${remainingTokens === 0 ? "rgba(239,68,68,0.3)" : "rgba(251,191,36,0.2)"}`,
                              }}
                            >
                              {remainingTokens.toLocaleString()} {t_1("tokens hoy", "tokens今日剩余")}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              pe(
                                Re,
                                "escritura",
                                setKe,
                                Te === "A" ? n?.writing?.optionA?.title : n?.writing?.optionB?.title,
                              )
                            }
                            disabled={isCorrecting || !Re.trim() || C}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all hover:scale-105 disabled:opacity-40"
                            style={{
                              background: "linear-gradient(135deg, #a855f7, #9333ea)",
                              boxShadow: "0 0 40px rgba(168,85,247,0.5), 0 0 80px rgba(168,85,247,0.2)",
                            }}
                          >
                            {isCorrecting ? (
                              <LoaderCircleIcon size={18} className="animate-spin" />
                            ) : (
                              <SparklesIcon size={18} />
                            )}
                            {isCorrecting
                              ? t_1("Corrigiendo...", "批改中...")
                              : t_1("Corregir con IA", "AI批改")}
                          </button>
                        </div>
                      </div>
                    </div>
                    {Ke && <C_1 data={Ke} />}
                  </>
                );
              })()}
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}
          {j === "monologo" && n.monologue && (
            <WComponent key="monologo" className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(236,72,153,0.15)",
                    border: "2px solid rgba(236,72,153,0.25)",
                  }}
                >
                  <MicIcon size={20} className="text-pink-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">{t_1("Monologo", "独白")}</h2>
                  <useParams className="text-white/30 text-xs">
                    {t_1("Elige un tema", "选择一个主题")}
                  </useParams>
                </div>
              </div>
              {[n.monologue.topic1, n.monologue.topic2].map((t, a) => {
                const x = ["#ec4899", "#f43f5e", "#fb7185"];
                const l = x[a % x.length];
                return (
                  <Ue1Component
                    key={a}
                    className="rounded-3xl overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${l}12, rgba(0,0,0,0.15))`,
                      border: `2px solid ${l}35`,
                      boxShadow: `0 0 25px ${l}20`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${l}, transparent)`,
                        boxShadow: `0 0 10px ${l}60`,
                      }}
                    />
                    <div className="p-6 md:p-8 relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${l}12`,
                            border: `1px solid ${l}20`,
                          }}
                        >
                          <MicIcon
                            size={20}
                            style={{
                              color: l,
                            }}
                          />
                        </div>
                        <h3
                          className="text-white font-black text-xl"
                          style={{
                            textShadow: `0 0 10px ${l}15`,
                          }}
                        >
                          {t.title}
                        </h3>
                      </div>
                      <useParams className="text-white/50 text-base font-medium mb-5">
                        {t.description}
                      </useParams>
                      <div className="mb-5">
                        <useParams
                          className="font-bold text-sm mb-3 flex items-center gap-2"
                          style={{
                            color: `${l}60`,
                          }}
                        >
                          <ZapIcon size={12} /> {t_1("Conectores utiles", "有用连接词")}:
                        </useParams>
                        <div className="flex flex-wrap gap-2">
                          {t.connectors.map((d, p) => (
                            <button
                              key={p}
                              onClick={() => q(d)}
                              className="text-sm px-3 py-1.5 rounded-xl transition-all hover:scale-105 font-bold"
                              style={{
                                background: `${l}15`,
                                color: l,
                                border: `1px solid ${l}30`,
                                boxShadow: `0 0 8px ${l}20`,
                              }}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <useParams
                          className="font-bold text-sm mb-3 flex items-center gap-2"
                          style={{
                            color: `${l}60`,
                          }}
                        >
                          <CircleQuestionMarkIcon size={12} /> {t_1("Preguntas guia", "引导问题")}:
                        </useParams>
                        <ul className="space-y-2">
                          {t.guideQuestions.map((d, p) => (
                            <li
                              key={p}
                              className="flex items-start gap-3 rounded-xl p-3"
                              style={{
                                background: "rgba(0,0,0,0.1)",
                                border: `1px solid ${l}15`,
                              }}
                            >
                              <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                                style={{
                                  background: `${l}20`,
                                  color: l,
                                  boxShadow: `0 0 6px ${l}30`,
                                }}
                              >
                                {p + 1}
                              </div>
                              <span className="text-white/70 text-base font-medium">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Ue1Component>
                );
              })}
              <OComponent glowColor="#ec4899" tilt={false}>
                <div className="p-6">
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, #ec4899, transparent)",
                    }}
                  />
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <ZapIcon size={18} className="text-pink-400" />{" "}
                    {t_1("Practica tu monologo", "练习你的独白")}
                  </h3>
                  <div className="flex gap-2 mb-5">
                    {["escribir", "grabar"].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setUt(t);
                          setJe("");
                          setQe(null);
                        }}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 relative overflow-hidden"
                        style={
                          ut === t
                            ? {
                                background: "rgba(236,72,153,0.12)",
                                color: "#f472b6",
                                border: "1px solid rgba(236,72,153,0.25)",
                              }
                            : {
                                background: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.4)",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }
                        }
                      >
                        {t === "escribir" ? <KeyboardIcon size={15} /> : <MicIcon size={15} />}
                        {t === "escribir" ? t_1("Escribir", "写作") : t_1("Grabar", "录音")}
                      </button>
                    ))}
                  </div>
                  {ut === "escribir" ? (
                    <div>
                      <textarea
                        value={Le}
                        onChange={(t) => setLe(t.target.value)}
                        placeholder={t_1("Escribe tu monologo aqui...", "在这里写你的独白...")}
                        className="w-full h-48 rounded-2xl p-5 text-white text-base placeholder-white/25 focus:outline-none resize-none leading-relaxed font-medium"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "2px solid rgba(236,72,153,0.3)",
                          boxShadow: "0 0 30px rgba(236,72,153,0.15), inset 0 0 30px rgba(236,72,153,0.05)",
                        }}
                        onFocus={(t) => {
                          t.target.style.borderColor = "rgba(236,72,153,0.8)";
                          t.target.style.boxShadow =
                            "0 0 40px rgba(236,72,153,0.3), 0 0 80px rgba(236,72,153,0.1), inset 0 0 30px rgba(236,72,153,0.1)";
                        }}
                        onBlur={(t) => {
                          t.target.style.borderColor = "rgba(236,72,153,0.3)";
                          t.target.style.boxShadow =
                            "0 0 30px rgba(236,72,153,0.15), inset 0 0 30px rgba(236,72,153,0.05)";
                        }}
                      />
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-white/30 text-sm font-medium">
                            {Le.split(/\s+/).filter(Boolean).length} {t_1("palabras", "词")}
                          </span>
                          <span
                            className="text-xs px-3 py-1 rounded-lg font-bold"
                            style={{
                              background:
                                remainingTokens === 0 ? "rgba(239,68,68,0.15)" : "rgba(236,72,153,0.1)",
                              color: remainingTokens === 0 ? "#f87171" : "#f472b6",
                              border: `1px solid ${remainingTokens === 0 ? "rgba(239,68,68,0.3)" : "rgba(236,72,153,0.2)"}`,
                            }}
                          >
                            {remainingTokens.toLocaleString()} {t_1("tokens hoy", "tokens今日剩余")}
                          </span>
                        </div>
                        <button
                          onClick={() => pe(Le, "monologo", setQe, n?.monologue?.topic1?.title)}
                          disabled={isCorrecting || !Le.trim() || C}
                          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all hover:scale-105 disabled:opacity-40"
                          style={{
                            background: "linear-gradient(135deg, #a855f7, #9333ea)",
                            boxShadow: "0 0 40px rgba(168,85,247,0.5), 0 0 80px rgba(168,85,247,0.2)",
                          }}
                        >
                          {isCorrecting ? (
                            <LoaderCircleIcon size={18} className="animate-spin" />
                          ) : (
                            <SparklesIcon size={18} />
                          )}
                          {isCorrecting
                            ? t_1("Corrigiendo...", "批改中...")
                            : t_1("Corregir con IA", "AI批改")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-3 mb-4">
                        {Kt ? (
                          <button
                            onClick={() => Et(setKt)}
                            className="flex-1 py-3 rounded-xl font-medium animate-pulse flex items-center justify-center gap-2"
                            style={{
                              background: "rgba(239,68,68,0.2)",
                              color: "#f87171",
                              border: "2px solid rgba(239,68,68,0.4)",
                              boxShadow: "0 0 30px rgba(239,68,68,0.4)",
                            }}
                          >
                            <div
                              className="w-3 h-3 rounded-full bg-red-400 animate-ping"
                              style={{
                                boxShadow: "0 0 10px #f87171",
                              }}
                            />{" "}
                            {t_1("Detener", "停止")}
                          </button>
                        ) : (
                          <button
                            onClick={() => zt(setKt, setJe, setQe)}
                            className="flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                            style={{
                              background: "rgba(236,72,153,0.2)",
                              color: "#f472b6",
                              border: "2px solid rgba(236,72,153,0.4)",
                              boxShadow: "0 0 25px rgba(236,72,153,0.3)",
                            }}
                          >
                            <MicIcon size={18} /> {t_1("Grabar", "录音")}
                          </button>
                        )}
                      </div>
                      {Je && (
                        <div className="mb-4">
                          <useParams className="text-white/30 text-xs mb-1">
                            {t_1("Transcripcion", "转录")}:
                          </useParams>
                          <div
                            className="rounded-xl p-4"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              border: "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <useParams className="text-white/75 text-sm">{Je}</useParams>
                          </div>
                          <button
                            onClick={() => pe(Je, "monologo", setQe, n?.monologue?.topic1?.title)}
                            disabled={isCorrecting}
                            className="mt-3 flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-40 transition-all hover:scale-105"
                            style={{
                              background: "linear-gradient(135deg, #a855f7, #9333ea)",
                            }}
                          >
                            {isCorrecting ? (
                              <LoaderCircleIcon size={16} className="animate-spin" />
                            ) : (
                              <SparklesIcon size={16} />
                            )}
                            {isCorrecting
                              ? t_1("Corrigiendo...", "批改中...")
                              : t_1("Corregir con IA", "AI批改")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {qe && <C_1 data={qe} />}
                </div>
              </OComponent>
              <Re1Component onNext={onNext} onPrev={onPrev} activeCfg={activeCfg} />
            </WComponent>
          )}
          {j === "interaccion" && n.interaction && (
            <WComponent key="interaccion" className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(6,182,212,0.15)",
                    border: "2px solid rgba(6,182,212,0.25)",
                  }}
                >
                  <MessageCircleIcon size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">{t_1("Interaccion oral", "口语互动")}</h2>
                  <useParams className="text-white/30 text-xs">
                    {t_1("Practica con IA", "用AI练习")}
                  </useParams>
                </div>
              </div>
              <OComponent glowColor="#06b6d4">
                <div className="p-6">
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
                      boxShadow: "0 0 15px #06b6d4",
                    }}
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: "rgba(6,182,212,0.2)",
                        border: "1px solid rgba(6,182,212,0.3)",
                        boxShadow: "0 0 10px rgba(6,182,212,0.3)",
                      }}
                    >
                      <LightbulbIcon size={18} className="text-cyan-400" />
                    </div>
                    <h3
                      className="text-white font-black text-lg"
                      style={{
                        textShadow: "0 0 15px rgba(6,182,212,0.4)",
                      }}
                    >
                      {t_1("Situacion", "情境")}
                    </h3>
                  </div>
                  <useParams
                    className="text-white/80 text-base leading-relaxed font-medium"
                    style={{
                      textShadow: "0 0 10px rgba(6,182,212,0.1)",
                    }}
                  >
                    {n.interaction.situation}
                  </useParams>
                </div>
              </OComponent>
              {n.interaction.questions.map((t, a) => (
                <OComponent key={a} glowColor="#06b6d4">
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                        style={{
                          background: "rgba(6,182,212,0.2)",
                          color: "#22d3ee",
                          border: "1px solid rgba(6,182,212,0.35)",
                          boxShadow: "0 0 15px rgba(6,182,212,0.3)",
                        }}
                      >
                        {a + 1}
                      </span>
                      <h4
                        className="text-white font-bold text-base leading-relaxed flex-1"
                        style={{
                          textShadow: "0 0 10px rgba(6,182,212,0.2)",
                        }}
                      >
                        {t.question}
                      </h4>
                    </div>
                    <div
                      className="rounded-xl p-4 mb-4"
                      style={{
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(6,182,212,0.15)",
                        boxShadow: "0 0 15px rgba(6,182,212,0.05)",
                      }}
                    >
                      <useParams className="text-cyan-300/50 text-xs mb-1 font-bold uppercase tracking-wider">
                        {t_1("Ayuda / 帮助", "帮助")}:
                      </useParams>
                      <useParams className="text-white/65 text-base font-medium">{t.help}</useParams>
                    </div>
                    <div>
                      <useParams className="text-cyan-300/30 text-xs mb-2 font-bold uppercase tracking-wider">
                        {t_1("Frases utiles / 有用的句子", "有用的句子")}:
                      </useParams>
                      <div className="flex flex-wrap gap-2">
                        {t.usefulPhrases.map((x, l) => {
                          const d = ["#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"];
                          const p = d[l % d.length];
                          return (
                            <button
                              key={l}
                              onClick={() => q(x)}
                              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl transition-all hover:scale-105 font-bold"
                              style={{
                                background: `${p}15`,
                                color: p,
                                border: `1px solid ${p}30`,
                                boxShadow: `0 0 8px ${p}20`,
                              }}
                            >
                              <Volume2Icon size={12} /> {x}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </OComponent>
              ))}
              <OComponent glowColor="#06b6d4" tilt={false}>
                <div className="p-6">
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
                    }}
                  />
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <ZapIcon size={18} className="text-cyan-400" />{" "}
                    {t_1("Practica la interaccion oral", "练习口语互动")}
                  </h3>
                  <div className="flex gap-2 mb-5">
                    {["escribir", "grabar"].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setJt(t);
                          setEt("");
                          setTt(null);
                        }}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                        style={
                          jt === t
                            ? {
                                background: "rgba(6,182,212,0.12)",
                                color: "#67e8f9",
                                border: "1px solid rgba(6,182,212,0.25)",
                              }
                            : {
                                background: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.4)",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }
                        }
                      >
                        {t === "escribir" ? <KeyboardIcon size={15} /> : <MicIcon size={15} />}
                        {t === "escribir" ? t_1("Escribir", "写作") : t_1("Grabar", "录音")}
                      </button>
                    ))}
                  </div>
                  {jt === "escribir" ? (
                    <div>
                      <textarea
                        value={Fe}
                        onChange={(t) => setFe(t.target.value)}
                        placeholder={t_1("Escribe tus respuestas aqui...", "在这里写你的回答...")}
                        className="w-full h-48 rounded-2xl p-5 text-white text-base placeholder-white/25 focus:outline-none resize-none leading-relaxed font-medium"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "2px solid rgba(6,182,212,0.3)",
                          boxShadow: "0 0 30px rgba(6,182,212,0.15), inset 0 0 30px rgba(6,182,212,0.05)",
                        }}
                        onFocus={(t) => {
                          t.target.style.borderColor = "rgba(6,182,212,0.8)";
                          t.target.style.boxShadow =
                            "0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(6,182,212,0.1), inset 0 0 30px rgba(6,182,212,0.1)";
                        }}
                        onBlur={(t) => {
                          t.target.style.borderColor = "rgba(6,182,212,0.3)";
                          t.target.style.boxShadow =
                            "0 0 30px rgba(6,182,212,0.15), inset 0 0 30px rgba(6,182,212,0.05)";
                        }}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <span className="text-white/30 text-xs">
                            {Fe.split(/\s+/).filter(Boolean).length} {t_1("palabras", "词")}
                          </span>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-lg"
                            style={{
                              background:
                                remainingTokens === 0 ? "rgba(239,68,68,0.15)" : "rgba(6,182,212,0.1)",
                              color: remainingTokens === 0 ? "#f87171" : "#67e8f9",
                              border: `1px solid ${remainingTokens === 0 ? "rgba(239,68,68,0.3)" : "rgba(6,182,212,0.2)"}`,
                            }}
                          >
                            {remainingTokens.toLocaleString()} {t_1("tokens hoy", "tokens今日剩余")}
                          </span>
                        </div>
                        <button
                          onClick={() => pe(Fe, "interaccion", setTt, n?.interaction?.situation)}
                          disabled={isCorrecting || !Fe.trim() || C}
                          className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-40 transition-all hover:scale-105"
                          style={{
                            background: "linear-gradient(135deg, #a855f7, #9333ea)",
                            boxShadow: "0 0 20px rgba(168,85,247,0.25)",
                          }}
                        >
                          {isCorrecting ? (
                            <LoaderCircleIcon size={16} className="animate-spin" />
                          ) : (
                            <SparklesIcon size={16} />
                          )}
                          {isCorrecting
                            ? t_1("Corrigiendo...", "批改中...")
                            : t_1("Corregir con IA", "AI批改")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-3 mb-4">
                        {es ? (
                          <button
                            onClick={() => Et(setEs)}
                            className="flex-1 py-3 rounded-xl font-medium animate-pulse flex items-center justify-center gap-2"
                            style={{
                              background: "rgba(239,68,68,0.2)",
                              color: "#f87171",
                              border: "2px solid rgba(239,68,68,0.4)",
                              boxShadow: "0 0 30px rgba(239,68,68,0.4)",
                            }}
                          >
                            <div
                              className="w-3 h-3 rounded-full bg-red-400 animate-ping"
                              style={{
                                boxShadow: "0 0 10px #f87171",
                              }}
                            />{" "}
                            {t_1("Detener", "停止")}
                          </button>
                        ) : (
                          <button
                            onClick={() => zt(setEs, setEt, setTt)}
                            className="flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                            style={{
                              background: "rgba(6,182,212,0.2)",
                              color: "#67e8f9",
                              border: "2px solid rgba(6,182,212,0.4)",
                              boxShadow: "0 0 25px rgba(6,182,212,0.3)",
                            }}
                          >
                            <MicIcon size={18} /> {t_1("Grabar respuesta", "录制回答")}
                          </button>
                        )}
                      </div>
                      {et && (
                        <div className="mb-4">
                          <useParams className="text-white/30 text-xs mb-1">
                            {t_1("Transcripcion", "转录")}:
                          </useParams>
                          <div
                            className="rounded-xl p-4"
                            style={{
                              background: "rgba(0,0,0,0.2)",
                              border: "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <useParams className="text-white/75 text-sm">{et}</useParams>
                          </div>
                          <button
                            onClick={() => pe(et, "interaccion", setTt, n?.interaction?.situation)}
                            disabled={isCorrecting}
                            className="mt-3 flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-40 transition-all hover:scale-105"
                            style={{
                              background: "linear-gradient(135deg, #a855f7, #9333ea)",
                            }}
                          >
                            {isCorrecting ? (
                              <LoaderCircleIcon size={16} className="animate-spin" />
                            ) : (
                              <SparklesIcon size={16} />
                            )}
                            {isCorrecting
                              ? t_1("Corrigiendo...", "批改中...")
                              : t_1("Corregir con IA", "AI批改")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {tt && <C_1 data={tt} />}
                </div>
              </OComponent>
              <div className="flex flex-col items-center gap-4 pt-6 pb-8">
                <button
                  onClick={ps}
                  className="relative flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(234,179,8,0.2), rgba(217,119,6,0.2))",
                    border: "1px solid rgba(234,179,8,0.3)",
                    color: "#facc15",
                    boxShadow: "0 0 30px rgba(234,179,8,0.1)",
                  }}
                >
                  <span
                    className="absolute inset-0 animate-pulse rounded-2xl opacity-10"
                    style={{
                      boxShadow: "0 0 40px rgba(234,179,8,0.3)",
                    }}
                  />
                  <AwardIcon size={24} />{" "}
                  <span className="relative">{t_1("Finalizar examen", "完成考试")}</span>{" "}
                  <ChevronRightIcon size={20} />
                </button>
                <useParams className="text-white/20 text-xs">
                  {t_1("Ver certificado con todas las calificaciones", "查看所有成绩的证书")}
                </useParams>
              </div>
            </WComponent>
          )}
        </div>
        {ts && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              perspective: "1600px",
            }}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setTs(false)} />
            <div
              className="relative w-full max-w-2xl rounded-3xl border overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a2744, #0f1d36)",
                borderColor: "rgba(234,179,8,0.2)",
                boxShadow: "0 0 60px rgba(234,179,8,0.15), 0 40px 100px rgba(0,0,0,0.5)",
                animation: "modalRiseIn 0.55s cubic-bezier(0.2,0.9,0.25,1)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: "linear-gradient(90deg, #eab308, #f59e0b, #f97316)",
                }}
              />
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                style={{
                  background: "rgba(234,179,8,0.08)",
                }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl"
                style={{
                  background: "rgba(249,115,22,0.06)",
                }}
              />
              <button
                onClick={() => setTs(false)}
                className="absolute top-4 right-4 p-2 rounded-xl transition-all hover:scale-110 z-10"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <XIcon size={18} />
              </button>
              <div className="p-8 pt-10 text-center relative">
                <FtComponent show={U >= 60} />
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    perspective: "600px",
                  }}
                >
                  <div
                    className="absolute -inset-2 rounded-full border pointer-events-none"
                    style={{
                      borderColor: "rgba(234,179,8,0.25)",
                      animation: "ringOrbit 6s linear infinite",
                    }}
                  />
                  <div
                    className="relative w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(234,179,8,0.2), rgba(217,119,6,0.1))",
                      border: "2px solid rgba(234,179,8,0.3)",
                      boxShadow: "0 0 40px rgba(234,179,8,0.15)",
                      animation: "trophySpinIn 0.9s cubic-bezier(0.2,0.9,0.25,1)",
                    }}
                  >
                    <TrophyIcon size={40} className="text-yellow-400" />
                    <div
                      className="absolute inset-0 rounded-full animate-pulse opacity-20"
                      style={{
                        boxShadow: "0 0 30px rgba(234,179,8,0.4)",
                      }}
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {t_1("Certificado de Practica", "练习证书")}
                </h2>
                <useParams className="text-white/35 text-sm mb-2">
                  DELE {n.level} - {n.theme}
                </useParams>
                <div
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-mono mb-6"
                  style={{
                    background: "rgba(234,179,8,0.1)",
                    border: "1px solid rgba(234,179,8,0.2)",
                    color: "#facc15",
                  }}
                >
                  <StarIcon size={10} /> {t_1("Evaluacion completada", "评估已完成")}
                </div>
                <div
                  className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${ge(U).bg.split(" ")[0].replace("from-", "").replace("/20", "/15")}, rgba(255,255,255,0.02))`,
                    border: `1px solid ${ge(U).border.replace("border-", "").replace("/20", "/15")}`,
                  }}
                >
                  <div className="text-left">
                    <useParams className="text-white/35 text-xs">
                      {t_1("Calificacion Global", "总分")}
                    </useParams>
                    <useParams className={`text-5xl font-bold ${ge(U).color}`}>
                      {U}
                      <span className="text-xl text-white/25">/100</span>
                    </useParams>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div className="text-left">
                    <useParams className={`text-lg font-bold ${ge(U).color}`}>{ge(U).label}</useParams>
                    <useParams className="text-white/25 text-xs">{ge(U).labelCn}</useParams>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {Be.map((t, a) => (
                    <div
                      key={a}
                      className="rounded-xl p-4 transition-all hover:-translate-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        animation: `modalRiseIn 0.5s cubic-bezier(0.2,0.9,0.25,1) ${0.15 + a * 0.07}s backwards`,
                      }}
                    >
                      <t.icon size={18} className={`${t.color} mx-auto mb-2`} />
                      <useParams className="text-white/50 text-xs mb-1">{t.name}</useParams>
                      <div className="flex items-center justify-center gap-1">
                        <span className={`text-xl font-bold ${t.color}`}>{t.score}</span>
                        <span className="text-white/15 text-xs">/100</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${t.score}%`,
                            background:
                              t.score >= 75
                                ? "#10b981"
                                : t.score >= 60
                                  ? "#3b82f6"
                                  : t.score >= 40
                                    ? "#f97316"
                                    : "#ef4444",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <CrownIcon size={16} className="text-yellow-400" />
                    <TrendingUpIcon size={16} className="text-emerald-400" />
                  </div>
                  <useParams className="text-white/45 text-sm">
                    {U >= 75
                      ? t_1("Excelente trabajo! Estas muy preparado.", "出色的工作！你已经非常准备好了。")
                      : U >= 60
                        ? t_1("Buen progreso! Sigue practicando.", "不错的进步！继续练习。")
                        : t_1(
                            "No te rindas! La practica constante te llevara al exito.",
                            "不要放弃！坚持练习会带你走向成功。",
                          )}
                  </useParams>
                </div>
              </div>
            </div>
          </div>
        )}
        {h && <BsComponent onClose={() => setH(false)} />}
      </StarfieldBackground>
    )
  );
}
function Re1Component({ onNext, onPrev, activeCfg }) {
  return (
    <div
      className="flex justify-between mt-6"
      style={{
        perspective: "600px",
      }}
    >
      <button
        onClick={onPrev}
        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <ChevronLeftIcon size={16} /> Anterior / 上一步
      </button>
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:scale-105 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${activeCfg.color}, ${activeCfg.color}dd)`,
          boxShadow: `0 0 20px ${activeCfg.glow}30`,
        }}
      >
        Siguiente / 下一步 <ChevronRightIcon size={16} />
      </button>
    </div>
  );
}
export { WaComponent as default };
