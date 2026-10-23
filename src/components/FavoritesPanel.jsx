import {
  HeartIcon,
  ArrowRightIcon,
  RefreshCwIcon,
  XIcon,
  SparklesIcon,
  Volume2Icon,
  Trash2Icon,
  TrophyIcon,
  ZapIcon,
  StarIcon,
} from "lucide-react";
import * as React from "react";
import { useFavorites } from "../lib/favorites.js";
import { useLanguage } from "../lib/i18n.jsx";
function FS() {
  const i = [
    "#ff00aa",
    "#00d4ff",
    "#ffd600",
    "#39ff14",
    "#ff6b35",
    "#b829dd",
    "#ff3860",
    "#2080ff",
    "#ff8a2a",
    "#ffffff",
    "#ff00ff",
    "#00ff88",
  ];
  for (let t = 0; t < 180; t++) {
    const c = document.createElement("div");
    const u = 4 + Math.random() * 10;
    const s = Math.random() > 0.5 ? "50%" : "0";
    c.style.cssText = `position:fixed;left:50%;top:50%;width:${u}px;height:${u}px;border-radius:${s};background:${i[t % i.length]};pointer-events:none;z-index:99999;`;
    document.body.appendChild(c);
    const d = (Math.PI * 2 * t) / 180;
    const m = 4 + Math.random() * 22;
    let g = window.innerWidth / 2;
    let v = window.innerHeight / 2;
    let f = 1;
    const E = Math.cos(d) * m;
    const j = Math.sin(d) * m;
    const _ = () => {
      g += E;
      v += j + 2.5;
      f -= 0.008;
      c.style.left = `${g}px`;
      c.style.top = `${v}px`;
      c.style.opacity = String(f);
      if (f > 0) {
        requestAnimationFrame(_);
      } else {
        c.remove();
      }
    };
    requestAnimationFrame(_);
  }
}
const FAVORITE_CARD_COLORS = [
  {
    bg: "#ff3860",
    glow: "rgba(255,56,96,0.6)",
    border: "#ff3860",
    label: "A",
  },
  {
    bg: "#2080ff",
    glow: "rgba(32,128,255,0.6)",
    border: "#2080ff",
    label: "B",
  },
  {
    bg: "#39ff14",
    glow: "rgba(57,255,20,0.6)",
    border: "#39ff14",
    label: "C",
  },
  {
    bg: "#ffd600",
    glow: "rgba(255,214,0,0.6)",
    border: "#ffd600",
    label: "D",
  },
];
function FavoritesPanel() {
  const { favorites, removeFavorite, count, reload } = useFavorites();
  const { t: t_1 } = useLanguage();
  const [d, setD] = React.useState(false);
  const [g, setG] = React.useState(false);
  const [f, setF] = React.useState("idle");
  const [j, setJ] = React.useState([]);
  const [A, setA] = React.useState(0);
  const [z, setZ] = React.useState(null);
  const [P, setP] = React.useState(0);
  const [Q, setQ] = React.useState(320);
  const [X, setX] = React.useState(false);
  const [G, setG_1] = React.useState(15);
  const [J, setJ_1] = React.useState(false);
  const [de, setDe] = React.useState(false);
  const xeRef = React.useRef(null);
  const Le = React.useCallback(() => {
    if (favorites.length < 4) {
      return;
    }
    const K = [...favorites].sort(() => Math.random() - 0.5);
    const te = [];
    const x = Math.min(10, K.length);
    for (let k = 0; k < x; k++) {
      const Y = K[k];
      const options = [
        ...K.filter((Se) => Se.word !== Y.word)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((Se) => Se.word),
        Y.word,
      ].sort(() => Math.random() - 0.5);
      te.push({
        chinese: Y.chinese,
        correct: Y.word,
        options,
      });
    }
    setJ(te);
    setA(0);
    setP(0);
    setZ(null);
    setF("asking");
    setG(true);
    setG_1(15);
    setJ_1(true);
  }, [favorites]);
  const Re = (K) => {
    if (f !== "asking") {
      return;
    }
    setZ(K);
    if (j[A].options[K] === j[A].correct) {
      setP((x) => x + 10 + Math.floor(G * 0.5));
      FS();
    } else {
      setDe(true);
      setTimeout(() => setDe(false), 600);
    }
    setJ_1(false);
    setF("answered");
  };
  const D = () => {
    if (A + 1 >= j.length) {
      setF("finished");
      setJ_1(false);
    } else {
      setA((K) => K + 1);
      setZ(null);
      setF("asking");
      setG_1(15);
      setJ_1(true);
    }
  };
  React.useEffect(() => {
    if (!J || f !== "asking") {
      if (xeRef.current) {
        clearInterval(xeRef.current);
      }
      return;
    }
    xeRef.current = setInterval(() => {
      setG_1((K) => {
        if (K <= 1) {
          return (setJ_1(false), setF("answered"), setDe(true), setTimeout(() => setDe(false), 600), 0);
        }
        return K - 1;
      });
    }, 1000);
    return () => {
      if (xeRef.current) {
        clearInterval(xeRef.current);
      }
    };
  }, [J, f]);
  const B = (word) => {
    if (!("speechSynthesis" in window)) {
      return;
    }
    const te = new SpeechSynthesisUtterance(word);
    te.lang = "es-ES";
    te.rate = 0.9;
    window.speechSynthesis.speak(te);
  };
  React.useEffect(() => {
    if (!d) {
      return;
    }
    const K = (te) => {
      const te_target = te.target;
      if (!(te_target.closest("[data-favorites-panel]") || te_target.closest("[data-favorites-toggle]"))) {
        setD(false);
      }
    };
    document.addEventListener("mousedown", K);
    return () => document.removeEventListener("mousedown", K);
  }, [d]);
  const ne = (K) => {
    setX(true);
    K.preventDefault();
  };
  React.useEffect(() => {
    if (!X) {
      return;
    }
    const K = (x) => {
      const k = window.innerWidth - x.clientX;
      setQ(Math.max(280, Math.min(450, k)));
    };
    const te = () => setX(false);
    document.addEventListener("mousemove", K);
    document.addEventListener("mouseup", te);
    return () => {
      document.removeEventListener("mousemove", K);
      document.removeEventListener("mouseup", te);
    };
  }, [X]);
  React.useEffect(() => {
    const K = (te) => {
      if (te.key === "Escape") {
        setG(false);
        setF("idle");
        setJ_1(false);
      }
    };
    window.addEventListener("keydown", K);
    return () => window.removeEventListener("keydown", K);
  }, []);
  if (count === 0 && !d) {
    return (
      <button
        data-favorites-toggle
        onClick={() => setD(true)}
        className="fixed z-50 flex items-center justify-center transition-all hover:scale-110"
        style={{
          bottom: "84px",
          left: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(255,0,170,.25), rgba(184,41,221,.15))",
          border: "1px solid rgba(255,0,170,.5)",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 0 30px rgba(255,0,170,.5), 0 0 60px rgba(255,0,170,.25), 0 4px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)",
          animation:
            "neonPulseFav 2s ease-in-out infinite, fadeInUp 0.6s ease-out, borderRotateFav 3s linear infinite",
        }}
      >
        <HeartIcon
          size={22}
          style={{
            color: "#ff00aa",
            filter: "drop-shadow(0 0 6px rgba(255,0,170,.8))",
          }}
        />
      </button>
    );
  }
  return (
    <>
      <button
        data-favorites-toggle
        onClick={() => setD(!d)}
        className="fixed z-50 flex items-center justify-center transition-all hover:scale-110"
        style={{
          bottom: "84px",
          left: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: d
            ? "rgba(255,0,170,.2)"
            : "linear-gradient(135deg, rgba(255,0,170,.25), rgba(184,41,221,.15))",
          border: "1px solid rgba(255,0,170,.5)",
          backdropFilter: "blur(10px)",
          boxShadow: d
            ? "0 0 40px rgba(255,0,170,.4), 0 0 80px rgba(255,0,170,.2), 0 4px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)"
            : "0 0 30px rgba(255,0,170,.5), 0 0 60px rgba(255,0,170,.25), 0 4px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)",
          transition: "all 0.3s ease",
          animation: "neonPulseFav 2s ease-in-out infinite, borderRotateFav 3s linear infinite",
        }}
      >
        {d ? (
          <ArrowRightIcon
            size={22}
            style={{
              color: "#ff00aa",
              filter: "drop-shadow(0 0 6px rgba(255,0,170,.8))",
            }}
          />
        ) : (
          <HeartIcon
            size={22}
            style={{
              color: "#ff00aa",
              filter: "drop-shadow(0 0 6px rgba(255,0,170,.8))",
            }}
          />
        )}
        {!d && count > 0 && (
          <span
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
            style={{
              background: "#ff00aa",
              color: "#fff",
              boxShadow: "0 0 12px rgba(255,0,170,.6)",
              animation: "countPulseFav 2s ease-in-out infinite",
            }}
          >
            {count}
          </span>
        )}
      </button>
      <div
        data-favorites-panel
        className="fixed z-40 top-16 right-0 h-[calc(100vh-64px)] overflow-hidden"
        style={{
          width: d ? `${Q}px` : "0",
          transition: "width 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          className="absolute inset-0 rounded-l-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,0,170,0.4), rgba(0,212,255,0.35), rgba(255,214,0,0.35), rgba(255,0,170,0.4))",
            backgroundSize: "100% 300%",
            animation: "borderGradientRotateFav 3s linear infinite",
            padding: "1px",
          }}
        >
          <div
            className="w-full h-full rounded-l-3xl"
            style={{
              background: "linear-gradient(180deg, rgba(5,7,20,.97) 0%, rgba(8,10,30,.98) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({
            length: 20,
          }).map((K, te) => (
            <div
              key={te}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14"][te % 4],
                animation: `floatParticleFav ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`,
              }}
            />
          ))}
        </div>
        {d && (
          <div
            onMouseDown={ne}
            className="absolute left-0 top-0 h-full w-1 cursor-col-resize z-50 hover:w-1.5 transition-all"
            style={{
              background: "transparent",
            }}
          />
        )}
        <div
          className="h-full flex flex-col relative"
          style={{
            width: `${Q}px`,
            minWidth: "280px",
          }}
        >
          <div
            className="flex items-center justify-between p-4"
            style={{
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div className="flex items-center gap-2">
              <HeartIcon
                size={16}
                style={{
                  color: "#ff00aa",
                  filter: "drop-shadow(0 0 4px rgba(255,0,170,.5))",
                }}
              />
              <span
                className="text-sm font-black"
                style={{
                  color: "#fff",
                  textShadow: "0 0 8px rgba(255,255,255,.2)",
                }}
              >
                {t_1("Favoritos", "收藏")}
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                style={{
                  background: "rgba(255,0,170,.2)",
                  color: "#ff00aa",
                  boxShadow: "0 0 10px rgba(255,0,170,.3)",
                  animation: "countPulseFav 2s ease-in-out infinite",
                }}
              >
                {count}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={reload}
                className="p-1.5 rounded-lg hover:bg-white/15 transition-all flex items-center gap-1.5 text-[11px] font-bold hover:scale-105 active:scale-95"
                style={{
                  color: "#d0dcff",
                  textShadow: "0 0 6px rgba(0,212,255,.5)",
                  background: "rgba(0,212,255,.08)",
                }}
                title={t_1("Actualizar", "刷新")}
              >
                <RefreshCwIcon
                  size={14}
                  className="animate-spin-slow"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(0,212,255,.8))",
                  }}
                />
                <span>{t_1("Actualizar", "刷新")}</span>
              </button>
              <button
                onClick={() => setD(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <XIcon
                  size={14}
                  style={{
                    color: "rgba(207,216,255,.4)",
                  }}
                />
              </button>
            </div>
          </div>
          {count >= 4 && (
            <div className="px-4 pt-3">
              <button
                onClick={Le}
                className="w-full py-2.5 rounded-xl text-xs font-black transition-all hover:scale-[1.02] flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,.15), rgba(184,41,221,.1))",
                  border: "1px solid rgba(255,0,170,.2)",
                  color: "#ff00aa",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
                <SparklesIcon size={14} /> {t_1("Iniciar Quiz", "开始测验")} ({count}{" "}
                {t_1("palabras", "单词")})
              </button>
            </div>
          )}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,.1) transparent",
            }}
          >
            {favorites.length === 0 && (
              <div className="text-center py-8">
                <HeartIcon
                  size={32}
                  style={{
                    color: "rgba(255,0,170,.15)",
                    margin: "0 auto 12px",
                  }}
                />
                <p
                  className="text-xs font-medium"
                  style={{
                    color: "rgba(207,216,255,.3)",
                  }}
                >
                  {t_1("No hay favoritos aún", "还没有收藏")}
                </p>
                <p
                  className="text-[10px] mt-1"
                  style={{
                    color: "rgba(207,216,255,.2)",
                  }}
                >
                  {t_1("Añade palabras desde los módulos", "从模块添加单词")}
                </p>
              </div>
            )}
            {favorites.map((K, te) => (
              <div
                key={K.word}
                className="group relative p-3 rounded-xl transition-all hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.05)",
                  animation: `staggerInFav 0.4s ease-out ${te * 0.06}s both`,
                  transformStyle: "preserve-3d",
                  boxShadow: "0 0 0 rgba(255,0,170,0)",
                }}
                onMouseEnter={(x) => {
                  x.currentTarget.style.borderColor = "rgba(255,0,170,0.35)";
                  x.currentTarget.style.boxShadow =
                    "0 0 20px rgba(255,0,170,0.1), inset 0 0 10px rgba(255,0,170,0.03)";
                  x.currentTarget.style.transform = "scale(1.02) translateZ(10px)";
                }}
                onMouseLeave={(x) => {
                  x.currentTarget.style.borderColor = "rgba(255,255,255,.05)";
                  x.currentTarget.style.boxShadow = "0 0 0 rgba(255,0,170,0)";
                  x.currentTarget.style.transform = "scale(1) translateZ(0)";
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p
                        className="text-sm font-black truncate"
                        style={{
                          color: "#fff",
                        }}
                      >
                        {K.word}
                      </p>
                      <button
                        onClick={() => B(K.word)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/5"
                      >
                        <Volume2Icon
                          size={10}
                          style={{
                            color: "rgba(0,212,255,.6)",
                          }}
                        />
                      </button>
                    </div>
                    <p
                      className="text-[11px] font-medium truncate"
                      style={{
                        color: "rgba(207,216,255,.5)",
                      }}
                    >
                      {K.chinese}
                    </p>
                    <p
                      className="text-[9px] mt-1 font-medium"
                      style={{
                        color: "rgba(207,216,255,.25)",
                      }}
                    >
                      <span
                        className="px-1 py-0.5 rounded"
                        style={{
                          background: "rgba(255,255,255,.05)",
                        }}
                      >
                        {K.level}
                      </span>{" "}
                      · {K.source}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFavorite(K.word)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/10"
                    style={{
                      color: "rgba(255,68,68,.5)",
                    }}
                  >
                    <Trash2Icon size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {g && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center ${de ? "shakeWrong" : ""}`}
          style={{
            background: "rgba(3,4,17,.92)",
            backdropFilter: "blur(30px)",
          }}
          onClick={(K) => {
            if (K.target === K.currentTarget) {
              setG(false);
              setF("idle");
              setJ_1(false);
            }
          }}
        >
          <div
            className="w-full max-w-lg mx-4 rounded-3xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.85))",
              border: "1px solid rgba(255,255,255,.1)",
              boxShadow: "0 0 60px rgba(255,0,170,.1), 0 25px 80px rgba(0,0,0,.5)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none p-[1px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,0,170,0.3), rgba(0,212,255,0.3), rgba(255,214,0,0.3), rgba(255,0,170,0.3))",
                backgroundSize: "300% 100%",
                animation: "borderGradientRotateFav 3s linear infinite",
              }}
            >
              <div
                className="w-full h-full rounded-3xl"
                style={{
                  background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.85))",
                }}
              />
            </div>
            <div className="relative z-10">
              {f === "finished" ? (
                <div className="text-center py-6">
                  <TrophyIcon
                    size={48}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 16px",
                      filter: "drop-shadow(0 0 15px rgba(255,214,0,.4))",
                    }}
                  />
                  <h2
                    className="text-3xl font-black mb-2"
                    style={{
                      background: "linear-gradient(135deg,#ff00aa,#ffd600)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {t_1("¡Quiz Completado!", "测验完成！")}
                  </h2>
                  <div className="flex gap-4 justify-center my-6">
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: "rgba(255,0,170,.1)",
                        border: "1px solid rgba(255,0,170,.15)",
                      }}
                    >
                      <ZapIcon
                        size={20}
                        style={{
                          color: "#ff00aa",
                          margin: "0 auto 6px",
                        }}
                      />
                      <p
                        className="text-2xl font-black"
                        style={{
                          color: "#ff00aa",
                        }}
                      >
                        {P}
                      </p>
                      <p
                        className="text-[10px]"
                        style={{
                          color: "rgba(207,216,255,.4)",
                        }}
                      >
                        Score
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background: "rgba(0,212,255,.1)",
                        border: "1px solid rgba(0,212,255,.15)",
                      }}
                    >
                      <StarIcon
                        size={20}
                        style={{
                          color: "#00d4ff",
                          margin: "0 auto 6px",
                        }}
                      />
                      <p
                        className="text-2xl font-black"
                        style={{
                          color: "#00d4ff",
                        }}
                      >
                        {Math.round((P / (j.length * 17.5)) * 100)}%
                      </p>
                      <p
                        className="text-[10px]"
                        style={{
                          color: "rgba(207,216,255,.4)",
                        }}
                      >
                        Accuracy
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={Le}
                      className="px-6 py-3 rounded-full text-white font-black text-sm transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg,#ff00aa,#b829dd)",
                        boxShadow: "0 0 25px rgba(255,0,170,.3)",
                      }}
                    >
                      {t_1("Repetir", "重试")}
                    </button>
                    <button
                      onClick={() => {
                        setG(false);
                        setF("idle");
                      }}
                      className="px-6 py-3 rounded-full text-sm font-black transition-all hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,.05)",
                        border: "1px solid rgba(255,255,255,.1)",
                        color: "rgba(207,216,255,.6)",
                      }}
                    >
                      {t_1("Cerrar", "关闭")}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <div
                      className="flex justify-between text-[10px] font-bold mb-1.5"
                      style={{
                        color: "rgba(207,216,255,.3)",
                      }}
                    >
                      <span>
                        {A + 1} / {j.length}
                      </span>
                      <span
                        style={{
                          color: "#ff00aa",
                        }}
                      >
                        Score: {P}
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,.05)",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${((A + 1) / j.length) * 100}%`,
                          background: "linear-gradient(90deg, #ff00aa, #b829dd)",
                        }}
                      />
                    </div>
                  </div>
                  {j[A] && (
                    <div className="text-center mb-6 relative">
                      <div className="absolute right-0 top-0 w-16 h-16">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke={G <= 5 ? "#ff3860" : "#ffd600"}
                            strokeWidth="2"
                            strokeDasharray={`${2 * Math.PI * 15}`}
                            strokeDashoffset={`${2 * Math.PI * 15 * (1 - G / 15)}`}
                            strokeLinecap="round"
                            style={{
                              transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-sm font-black"
                            style={{
                              color: G <= 5 ? "#ff3860" : "#ffd600",
                            }}
                          >
                            {G}
                          </span>
                        </div>
                      </div>
                      <p
                        className="text-xs font-bold mb-3"
                        style={{
                          color: "rgba(207,216,255,.3)",
                        }}
                      >
                        {t_1("¿Qué palabra significa:", "哪个单词的意思是：")}
                      </p>
                      <p
                        className="text-4xl md:text-5xl font-black mb-2"
                        style={{
                          color: "#ffd600",
                          filter:
                            "drop-shadow(0 0 20px rgba(255,214,0,.5)) drop-shadow(0 0 40px rgba(255,214,0,.2))",
                          animation: "goldenGlow 2s ease-in-out infinite alternate",
                        }}
                      >
                        {j[A].chinese}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {j[A]?.options.map((K, te) => {
                      const x = z === te;
                      const k = K === j[A].correct;
                      const Y = f === "answered" && k;
                      const Z = f === "answered" && x && !k;
                      const ie = FAVORITE_CARD_COLORS[te % 4];
                      return (
                        <button
                          key={te}
                          onClick={() => Re(te)}
                          disabled={f !== "asking"}
                          className="relative py-4 px-4 rounded-2xl text-sm font-black transition-all disabled:pointer-events-none overflow-hidden"
                          style={{
                            background: Y
                              ? "rgba(57,255,20,.15)"
                              : Z
                                ? "rgba(255,56,96,.15)"
                                : x
                                  ? `${ie.bg}25`
                                  : `${ie.bg}12`,
                            border: Y
                              ? "1px solid rgba(57,255,20,.5)"
                              : Z
                                ? "1px solid rgba(255,56,96,.5)"
                                : `1px solid ${ie.border}40`,
                            color: Y ? "#39ff14" : Z ? "#ff3860" : "#fff",
                            boxShadow: Y
                              ? "0 0 30px rgba(57,255,20,.35)"
                              : Z
                                ? "0 0 30px rgba(255,56,96,.35)"
                                : x
                                  ? `0 0 25px ${ie.glow}`
                                  : `0 0 12px ${ie.glow}30`,
                            transform: "scale(1)",
                            transformStyle: "preserve-3d",
                            animation: Y
                              ? "correctGlow 1s ease-in-out infinite alternate"
                              : Z
                                ? "shakeWrong 0.5s ease-in-out"
                                : "none",
                          }}
                          onMouseEnter={(pe) => {
                            if (f === "asking") {
                              pe.currentTarget.style.transform = "scale(1.05) translateZ(20px)";
                              pe.currentTarget.style.boxShadow = `0 0 40px ${ie.glow}, 0 10px 30px rgba(0,0,0,.3)`;
                            }
                          }}
                          onMouseLeave={(pe) => {
                            pe.currentTarget.style.transform = "scale(1) translateZ(0)";
                            pe.currentTarget.style.boxShadow = Y
                              ? "0 0 30px rgba(57,255,20,.35)"
                              : Z
                                ? "0 0 30px rgba(255,56,96,.35)"
                                : x
                                  ? `0 0 25px ${ie.glow}`
                                  : `0 0 12px ${ie.glow}30`;
                          }}
                        >
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-black opacity-30">
                            {ie.label}
                          </span>
                          {K}
                        </button>
                      );
                    })}
                  </div>
                  {f === "answered" && (
                    <div
                      className="text-center mb-4"
                      style={{
                        animation: "fadeIn 0.3s ease",
                      }}
                    >
                      <p
                        className="text-sm font-bold"
                        style={{
                          color: j[A].options[z] === j[A].correct ? "#39ff14" : "#ff3860",
                        }}
                      >
                        {j[A].options[z] === j[A].correct
                          ? "¡Correcto! / 正确！"
                          : `${t_1("La respuesta correcta era:", "正确答案是：")} ${j[A].correct}`}
                      </p>
                      <button
                        onClick={D}
                        className="mt-3 px-6 py-2.5 rounded-full text-white font-black text-sm transition-all hover:scale-105"
                        style={{
                          background: "linear-gradient(135deg,#ff00aa,#b829dd)",
                        }}
                      >
                        {A + 1 >= j.length ? t_1("Ver resultado", "看结果") : t_1("Siguiente", "下一个")} →
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setG(false);
                      setF("idle");
                      setJ_1(false);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg transition-colors hover:bg-white/5"
                  >
                    <XIcon
                      size={14}
                      style={{
                        color: "rgba(207,216,255,.4)",
                      }}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideIn { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeInUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes staggerInFav { from{transform:translateX(30px) rotateY(-10deg);opacity:0} to{transform:translateX(0) rotateY(0);opacity:1} }
        @keyframes borderGradientRotateFav { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes countPulseFav { 0%,100%{box-shadow:0 0 5px rgba(255,0,170,.2)} 50%{box-shadow:0 0 15px rgba(255,0,170,.5), 0 0 25px rgba(255,0,170,.2)} }
        @keyframes floatParticleFav { 0%,100%{transform:translateY(0) translateX(0)} 25%{transform:translateY(-20px) translateX(10px)} 50%{transform:translateY(-10px) translateX(-10px)} 75%{transform:translateY(-30px) translateX(5px)} }
        @keyframes goldenGlow { from{filter:drop-shadow(0 0 20px rgba(255,214,0,.5))drop-shadow(0 0 40px rgba(255,214,0,.2)) brightness(1)} to{filter:drop-shadow(0 0 30px rgba(255,214,0,.7))drop-shadow(0 0 60px rgba(255,214,0,.3)) brightness(1.2)} }
        @keyframes shakeWrong { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-8px)} 20%,40%,60%,80%{transform:translateX(8px)} }
        @keyframes neonPulseFav { 0%,100%{box-shadow:0 0 30px rgba(255,0,170,.5), 0 0 60px rgba(255,0,170,.25), 0 4px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)} 50%{box-shadow:0 0 45px rgba(255,0,170,.7), 0 0 80px rgba(255,0,170,.4), 0 4px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)} }
        @keyframes borderRotateFav { 0%{border-color:rgba(255,0,170,.5)} 33%{border-color:rgba(0,212,255,.5)} 66%{border-color:rgba(255,214,0,.5)} 100%{border-color:rgba(255,0,170,.5)} }
        @keyframes correctGlow { from{box-shadow:0 0 30px rgba(57,255,20,.35)} to{box-shadow:0 0 50px rgba(57,255,20,.6)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .animate-spin-slow { animation: spinSlow 3s linear infinite; }
        .shakeWrong { animation: shakeWrong 0.5s ease-in-out; }
      `}</style>
    </>
  );
}
export { FavoritesPanel };
