import {
  StarIcon,
  SparklesIcon,
  BookOpenIcon,
  ChevronRightIcon,
  Volume2Icon,
  HeartIcon,
  FlameIcon,
  CrownIcon,
  ArrowLeftIcon,
  SearchIcon,
  FunnelIcon,
  RotateCcwIcon,
} from "lucide-react";
import * as React from "react";
import VOCAB_EMOJI from "../data/vocab-emoji.json";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { useFavorites } from "../lib/favorites.js";
import { useLanguage } from "../lib/i18n.jsx";
const E = [
  {
    key: "A1",
    title: "A1 - Acceso",
    sub: "入门级",
    color: "#10b981",
    glow: "#34d399",
    accent: "#059669",
    icon: StarIcon,
  },
  {
    key: "A2",
    title: "A2 - Plataforma",
    sub: "基础级",
    color: "#f97316",
    glow: "#fbbf24",
    accent: "#ea580c",
    icon: FlameIcon,
  },
  {
    key: "B1",
    title: "B1 - Umbral",
    sub: "进阶级",
    color: "#3b82f6",
    glow: "#60a5fa",
    accent: "#2563eb",
    icon: CrownIcon,
  },
  {
    key: "B2",
    title: "B2 - Avanzado",
    sub: "熟练级",
    color: "#a855f7",
    glow: "#c084fc",
    accent: "#9333ea",
    icon: SparklesIcon,
  },
];
const U = {
  A1: () => import("../data/diccionarios/a1Dictionary.js").then((s) => s.a1Dictionary),
  A2: () => import("../data/diccionarios/a2Dictionary.js").then((s) => s.a2Dictionary),
  B1: () => import("../data/diccionarios/b1Dictionary.js").then((s) => s.b1Dictionary),
  B2: () => import("../data/diccionarios/b2Dictionary.js").then((s) => s.b2Dictionary),
};
const Z = {
  "Saludos y presentaciones": "问候与介绍",
  "La familia": "家庭",
  "La casa": "房子",
  "La comida y restaurantes": "食物与餐厅",
  "El tiempo libre": "休闲时间",
  "Los deportes": "运动",
  "La ropa y las compras": "衣服与购物",
  "La ciudad": "城市",
  "Los animales": "动物",
  "La salud": "健康",
  "El trabajo y profesiones": "工作与职业",
  "Los viajes y el transporte": "旅行与交通",
  "Las vacaciones": "假期",
  "Las fiestas y tradiciones": "节日与传统",
  "La tecnología": "科技",
  "El tiempo atmosférico": "天气",
  "La escuela y los estudios": "学校与学习",
  "Viajes y transporte": "旅行与交通",
  "Comida y restaurantes": "食物与餐厅",
  "Trabajo y profesiones": "工作与职业",
  "Tiempo libre y ocio": "休闲时间",
  "Salud y bienestar": "健康与养生",
  "Tecnología y sociedad": "科技与社会",
  "Educación y aprendizaje": "教育与学习",
  "Medio ambiente y sostenibilidad": "环境与可持续发展",
  "Cultura y arte": "文化与艺术",
  "Relaciones personales": "人际关系",
  "Sociedad y ciudadanía": "社会与公民",
  "Medio ambiente y naturaleza": "环境与自然",
  "Arte y expresión": "艺术与表达",
  "Economía y comercio": "经济与商业",
  "Ciencia e innovación": "科学与创新",
  "Derechos y justicia": "权利与正义",
  "Pensamiento abstracto y filosofía": "抽象思维与哲学",
  "Comunicación avanzada": "高级沟通",
  "Números y cantidades": "数字与数量",
  "Familia y personas": "家庭与人物",
  "Casa y hogar": "家庭与家居",
  "Comida y bebida": "食物与饮料",
  Colores: "颜色",
  "Ropa y accesorios": "服装与配饰",
  "En la escuela": "在学校",
  "En el restaurante": "在餐厅",
  "En el hotel": "在酒店",
  "Ciudad y lugares": "城市与地点",
  Transporte: "交通",
  "Países y nacionalidades": "国家与国籍",
  Profesiones: "职业",
  "Cuerpo humano": "人体",
  "Salud y cuerpo": "健康与身体",
  Animales: "动物",
  "Verbos básicos": "基本动词",
  "Adjetivos básicos": "基本形容词",
  "Tiempo y clima": "时间与天气",
  "Sentimientos y emociones": "感受与情绪",
  Compras: "购物",
  "Vida cotidiana": "日常生活",
  "Relaciones sociales": "社交关系",
  "Descripción de personas": "人物描述",
  "Trabajo y estudios": "工作与学习",
  "Casa y servicios": "住房与服务",
  Comunicación: "通讯",
  Tecnología: "科技",
  "Ocio y deportes": "休闲与运动",
  "Hogar y rutinas": "家居与日常",
  "Emociones y psicología": "情绪与心理",
  "Moda y estilo": "时尚与风格",
  "Economía y empleo": "经济与就业",
  "Medios de comunicación": "传媒",
  "Cultura y entretenimiento": "文化与娱乐",
  "Tecnología digital": "数字科技",
  "Naturaleza y medio ambiente": "自然与环境",
  "Viajes y turismo": "旅行与旅游",
  "Lengua y comunicación avanzada": "高级语言与沟通",
  "Sociedad y antropología": "社会与人类学",
  "Economía y finanzas avanzado": "高级经济与金融",
  "Historia y civilización": "历史与文明",
  "Arte y cultura": "艺术与文化",
  "Arte y estética avanzada": "高级艺术与美学",
  "Ciencia y descubrimiento": "科学与发现",
  "Ciencia y medicina avanzada": "高级科学与医学",
  "Derechos y ciudadanía": "权利与公民身份",
  "Derecho y justicia": "法律与正义",
  "Política internacional": "国际政治",
  "Política y gobierno": "政治与政府",
  "Política y sociedad": "政治与社会",
  "Educación avanzada y pedagogía": "高级教育与教育学",
  "Literatura y escritura": "文学与写作",
  "Medio ambiente": "环境",
  "Naturaleza y ecología": "自然与生态",
  "Misterio y leyendas": "神秘与传说",
  "Psicología y conducta": "心理与行为",
  "Transporte y movilidad": "交通与出行",
  "Tecnología y medios": "科技与媒体",
};
function J(s) {
  const n = new SpeechSynthesisUtterance(s);
  n.lang = "es-ES";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(n);
}
function QComponent({ word, index, levelCfg, favorite, themeLabel, onToggleFavorite, hint }) {
  const [y, setY] = React.useState(false);
  const dRef = React.useRef(0);
  const b = (target) => {
    if (!(target instanceof Element && target.closest("button"))) {
      setY((r) => !r);
    }
  };
  const onTouchEnd = (o) => {
    if (o.target instanceof Element && o.target.closest("button")) {
      return;
    }
    const r = Date.now();
    if (r - dRef.current < 330) {
      o.preventDefault();
      setY((f) => !f);
      dRef.current = 0;
      return;
    }
    dRef.current = r;
  };
  const pic = VOCAB_EMOJI[String(word.es || "").trim()];
  return (
    <div
      className={`dict2 ${y ? "flip" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`${word.es}. ${hint}`}
      aria-pressed={y}
      style={{ "--c": levelCfg.color }}
      onClick={(o) => {
        if (o.target.closest("button")) return;
        setY((f) => !f);
        if (!y) J(word.es);
      }}
      onKeyDown={(o) => {
        if (o.key === "Enter" || o.key === " ") {
          o.preventDefault();
          setY((r) => !r);
        }
      }}
    >
      <div className="dict2-in">
        <section className="dict2-face dict2-front">
          <div className="dict2-top">
            <span className="dict2-n">{index + 1}</span>
            <span>
              <button onClick={() => J(word.es)} aria-label="Escuchar">
                <Volume2Icon size={16} />
              </button>
              <button onClick={onToggleFavorite} aria-label="Favorito">
                <HeartIcon size={15} className={favorite ? "fill-pink-400 text-pink-400" : ""} />
              </button>
            </span>
          </div>
          <div className="dict2-art">{pic ? <Emoji3D emoji={pic} size={64} /> : <span className="dict2-letter">{String(word.es || "?").trim()[0]?.toUpperCase()}</span>}</div>
          <h3>{word.es}</h3>
          <span className="dict2-chip">{themeLabel}</span>
          <small className="dict2-hint">👆 Toca para ver la traducción · 点击翻转</small>
        </section>
        <section className="dict2-face dict2-back">
          <span className="dict2-es">{word.es}</span>
          <h3>{word.zh}</h3>
          {word.explanation && <p>{word.explanation}</p>}
          {word.exampleEs && (
            <button className="dict2-ex" onClick={() => J(word.exampleEs)}>
              <Volume2Icon size={14} /> “{word.exampleEs}”<small>{word.exampleZh}</small>
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
function NeComponent() {
  const { lang, t: t_1 } = useLanguage();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [m, setM] = React.useState("A1");
  const [y, setY] = React.useState("");
  const [d, setD] = React.useState("");
  const [x, setX] = React.useState([]);
  const [r, setR] = React.useState(true);
  const [v, setV] = React.useState(false);
  const [z, setZ] = React.useState(24);
  const j = React.useDeferredValue(y);
  React.useEffect(() => {
    let a = false;
    setR(true);
    setV(false);
    U[m]()
      .then((l) => {
        if (!a) {
          setX(l);
        }
      })
      .catch(() => {
        if (!a) {
          setX([]);
          setV(true);
        }
      })
      .finally(() => {
        if (!a) {
          setR(false);
        }
      });
    return () => {
      a = true;
    };
  }, [m]);
  const T = React.useMemo(() => {
    const a = new Set(x.map((l) => l.theme));
    return Array.from(a).sort();
  }, [x]);
  const p = React.useMemo(
    () =>
      x.filter((a) => {
        const l = j.trim().toLowerCase();
        const t =
          l === "" ||
          a.es.toLowerCase().includes(l) ||
          a.zh.includes(j.trim()) ||
          a.theme.toLowerCase().includes(l);
        const _ = d === "" || a.theme === d;
        return t && _;
      }),
    [x, j, d],
  );
  React.useEffect(() => {
    setZ(24);
  }, [m, j, d]);
  const $ = React.useMemo(() => p.slice(0, z), [p, z]);
  const levelCfg = E.find((a) => a.key === m) || E[0];
  const S = (a) => ((lang === "zh" || lang === "cn") && Z[a]) || a;
  return (
    <StarfieldBackground>
      <style>{`
        @keyframes iconBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes bookOpenLeft { 0%, 12% { transform: rotateY(0deg); } 42%, 78% { transform: rotateY(-154deg); } 100% { transform: rotateY(0deg); } }
        @keyframes bookOpenRight { 0%, 12% { transform: rotateY(0deg); } 42%, 78% { transform: rotateY(154deg); } 100% { transform: rotateY(0deg); } }
        @keyframes bookKnowledgeGlow { 0%, 100% { opacity: .25; transform: translate(-50%, -50%) scale(.75); } 50% { opacity: .8; transform: translate(-50%, -62%) scale(1.18); } }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div style={{ marginBottom: 26 }}>
          <SectionHero
            icon={BookOpenIcon}
            accent={levelCfg.color}
            eyebrow="Diccionarios · 词典"
            title="Diccionario español–chino"
            titleZh="西汉词典 · 按级别和主题"
            description="Todo el vocabulario de cada nivel, por temas, con audio y ejemplos. Marca con ♥ las palabras para repasarlas en Memoria."
            descriptionZh="每个级别的全部词汇，按主题分类，带发音和例句。点♥收藏到记忆复习。"
          />
        </div>
        <div className="dictionary-level-selector flex justify-center gap-4 mb-8">
          {E.map((a) => {
            const Icon = a.icon;
            const t = m === a.key;
            return (
              <button
                key={a.key}
                onClick={() => {
                  setM(a.key);
                  setD("");
                  setY("");
                }}
                className="relative group"
                style={{
                  perspective: "800px",
                }}
              >
                <div
                  className="absolute -inset-[2px] rounded-3xl transition-all duration-500"
                  style={{
                    background: t
                      ? `linear-gradient(135deg, ${a.glow}, ${a.color}, ${a.accent})`
                      : `linear-gradient(135deg, ${a.color}40, ${a.color}20)`,
                    opacity: t ? 1 : 0,
                    filter: t ? "blur(1px)" : "none",
                  }}
                />
                <div
                  className="dictionary-level-card relative px-6 py-5 rounded-3xl text-center transition-all duration-500 overflow-hidden min-w-[120px]"
                  style={{
                    background: t
                      ? `linear-gradient(135deg, ${a.color}30 0%, ${a.accent}20 50%, rgba(15,24,60,0.9) 100%)`
                      : `linear-gradient(135deg, ${a.color}08 0%, rgba(15,24,60,0.8) 100%)`,
                    border: t ? `2px solid ${a.glow}` : `2px solid ${a.color}15`,
                    boxShadow: t
                      ? `0 0 40px ${a.glow}50, 0 0 80px ${a.glow}20, inset 0 0 30px ${a.glow}10`
                      : `0 0 10px ${a.color}05`,
                    transform: t ? "translateY(-4px)" : "none",
                  }}
                >
                  <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500"
                    style={{
                      background: a.glow,
                      opacity: t ? 0.4 : 0.1,
                    }}
                  />
                  <div
                    className="relative mb-3 mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: t ? `linear-gradient(135deg, ${a.color}, ${a.accent})` : `${a.color}15`,
                      border: t ? `2px solid ${a.glow}` : `2px solid ${a.color}25`,
                      boxShadow: t ? `0 0 25px ${a.glow}60, 0 4px 15px rgba(0,0,0,0.3)` : "none",
                      animation: t ? "iconBounce 2s ease-in-out infinite" : "none",
                    }}
                  >
                    <Icon size={32} className="text-white" />
                    {t && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                        style={{
                          boxShadow: `0 0 20px ${a.glow}`,
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="relative block text-3xl font-black transition-all duration-300"
                    style={{
                      color: t ? "#fff" : `${a.color}80`,
                      textShadow: t ? `0 0 20px ${a.glow}80, 0 2px 4px rgba(0,0,0,0.5)` : "none",
                    }}
                  >
                    {a.key}
                  </span>
                  <span
                    className="relative block text-xs font-bold mt-1 transition-all"
                    style={{
                      color: t ? a.glow : `${a.color}40`,
                    }}
                  >
                    {a.sub}
                  </span>
                  {t && (
                    <>
                      <div
                        className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: a.glow,
                          boxShadow: `0 0 6px ${a.glow}`,
                          animation: "floatY 2s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="absolute top-4 right-3 w-1 h-1 rounded-full"
                        style={{
                          background: a.glow,
                          boxShadow: `0 0 4px ${a.glow}`,
                          animation: "floatY 2.5s ease-in-out infinite 0.5s",
                        }}
                      />
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="text-center mb-8">
          <span
            className="text-xs font-bold px-4 py-2 rounded-xl text-white inline-flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${levelCfg.color}, ${levelCfg.accent})`,
              boxShadow: `0 0 15px ${levelCfg.glow}40`,
            }}
          >
            <BookOpenIcon size={14} />
            {p.length} {t_1("palabras", "词")} · {m}
            {d && ` · ${S(d)}`}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              value={y}
              onChange={(a) => setY(a.target.value)}
              placeholder={t_1("Buscar palabra o tema...", "搜索单词或主题...")}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
          <div className="relative sm:w-64">
            <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <select
              value={d}
              onChange={(a) => setD(a.target.value)}
              className="w-full pl-9 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: "none",
              }}
            >
              <option value="" className="bg-[#0a192f]">
                {t_1("Todos los temas", "所有主题")}
              </option>
              {T.map((a) => (
                <option key={a} value={a} className="bg-[#0a192f]">
                  {S(a)}
                </option>
              ))}
            </select>
            <ChevronRightIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 rotate-90"
              size={14}
            />
          </div>
        </div>
        {r && (
          <div className="dictionary-loading rounded-3xl py-16 text-center mb-8">
            <div className="dictionary-mini-book mx-auto mb-5">
              <span />
              <span />
            </div>
            <p className="text-white font-black text-lg">Abriendo el diccionario {m}…</p>
            <p className="text-white/40 text-sm mt-1">Cargando solo el nivel que necesitas</p>
          </div>
        )}
        {v && !r && (
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-8 text-center text-red-200 mb-8">
            No se pudo cargar este nivel. Vuelve a seleccionarlo para intentarlo de nuevo.
          </div>
        )}
        {!r && !v && (
          <div
            className="dictionary-word-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5"
            style={{
              perspective: "1200px",
            }}
          >
            {$.map((word, index) => {
              const favorite = isFavorite(word.es);
              return (
                <QComponent
                  key={`${word.es}-${index}`}
                  word={word}
                  index={index}
                  levelCfg={levelCfg}
                  favorite={favorite}
                  themeLabel={S(word.theme)}
                  hint={t_1("Doble toque para girar", "双击翻转")}
                  onToggleFavorite={() => {
                    if (favorite) {
                      removeFavorite(word.es);
                    } else {
                      addFavorite(word.es, word.zh, `Diccionario ${word.level}`, word.level);
                    }
                  }}
                />
              );
            })}
          </div>
        )}
        {!r && $.length < p.length && (
          <div className="text-center mt-8">
            <button onClick={() => setZ((a) => a + 24)} className="dictionary-load-more">
              <BookOpenIcon size={18} /> Mostrar 24 palabras más
              <span>
                {$.length} / {p.length}
              </span>
            </button>
          </div>
        )}
        {!r && !v && p.length === 0 && (
          <div className="text-center py-16">
            <BookOpenIcon className="mx-auto text-white/10 mb-4" size={56} />
            <p className="text-white/40 text-lg">{t_1("No se encontraron palabras", "未找到单词")}</p>
            <p className="text-white/20 text-sm mt-2">{t_1("Intenta con otra busqueda", "尝试其他搜索")}</p>
          </div>
        )}
      </div>
    </StarfieldBackground>
  );
}
export { NeComponent as default };
