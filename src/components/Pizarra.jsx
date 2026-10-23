import {
  ChevronRightIcon,
  PenLineIcon,
  GripVerticalIcon,
  DownloadIcon,
  EraserIcon,
  Minimize2Icon,
  XIcon,
} from "lucide-react";
import * as React from "react";
const PIZARRA_NOTES_KEY = "dele_pizarra_notes";
const PIZARRA_WIDTH_KEY = "dele_pizarra_width";
const PIZARRA_OPEN_KEY = "dele_pizarra_open";
const PIZARRA_POS_KEY = "dele_pizarra_pos";
function Pizarra() {
  const [i, setI] = React.useState(() => {
    try {
      return localStorage.getItem(PIZARRA_OPEN_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [c, setC] = React.useState(false);
  const [s, setS] = React.useState(() => {
    try {
      return localStorage.getItem(PIZARRA_NOTES_KEY) || "";
    } catch {
      return "";
    }
  });
  const [m, setM] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem(PIZARRA_WIDTH_KEY) || "320");
    } catch {
      return 320;
    }
  });
  const [v, setV] = React.useState(false);
  const [E, setE] = React.useState(false);
  const [_, set_] = React.useState(() => {
    try {
      const J = localStorage.getItem(PIZARRA_POS_KEY);
      if (J) {
        return JSON.parse(J);
      }
    } catch {}
    return {
      top: 20,
      left: Math.max(20, window.innerWidth - 340),
    };
  });
  const [w, setW] = React.useState(false);
  const RRef = React.useRef(null);
  const PRef = React.useRef(null);
  const HRef = React.useRef({
    startX: 0,
    startY: 0,
    initialLeft: 0,
    initialTop: 0,
  });
  const QRef = React.useRef({
    startX: 0,
    startWidth: 320,
    startLeft: 0,
  });
  React.useEffect(() => {
    if (PRef.current) {
      clearTimeout(PRef.current);
    }
    PRef.current = setTimeout(() => {
      try {
        localStorage.setItem(PIZARRA_NOTES_KEY, s);
      } catch {}
      setE(true);
      setTimeout(() => setE(false), 1000);
    }, 800);
    return () => {
      if (PRef.current) {
        clearTimeout(PRef.current);
      }
    };
  }, [s]);
  React.useEffect(() => {
    try {
      localStorage.setItem(PIZARRA_OPEN_KEY, String(i));
    } catch {}
  }, [i]);
  React.useEffect(() => {
    try {
      localStorage.setItem(PIZARRA_WIDTH_KEY, String(m));
    } catch {}
  }, [m]);
  React.useEffect(() => {
    try {
      localStorage.setItem(PIZARRA_POS_KEY, JSON.stringify(_));
    } catch {}
  }, [_]);
  React.useEffect(() => {
    const J = () => {
      const ue = window.innerWidth < 768;
      const de = ue ? Math.floor(window.innerWidth * 0.8) : 380;
      const ve = ue ? 200 : 280;
      if (m > de) {
        setM(de);
      }
      if (m < ve) {
        setM(ve);
      }
      set_((xe) => ({
        top: Math.max(0, Math.min(window.innerHeight - 200, xe.top)),
        left: Math.max(0, Math.min(window.innerWidth - ve, xe.left)),
      }));
    };
    window.addEventListener("resize", J);
    J();
    return () => window.removeEventListener("resize", J);
  }, []);
  const ae = (J) => {
    if (!c) {
      setW(true);
      HRef.current = {
        startX: J.clientX,
        startY: J.clientY,
        initialLeft: _.left,
        initialTop: _.top,
      };
    }
  };
  React.useEffect(() => {
    if (!w) {
      return;
    }
    const J = (de) => {
      const left = Math.max(
        0,
        Math.min(window.innerWidth - m, HRef.current.initialLeft + (de.clientX - HRef.current.startX)),
      );
      const top = Math.max(
        0,
        Math.min(window.innerHeight - 100, HRef.current.initialTop + (de.clientY - HRef.current.startY)),
      );
      set_({
        left,
        top,
      });
    };
    const ue = () => setW(false);
    document.addEventListener("mousemove", J);
    document.addEventListener("mouseup", ue);
    return () => {
      document.removeEventListener("mousemove", J);
      document.removeEventListener("mouseup", ue);
    };
  }, [w, m]);
  const X = (J) => {
    setV(true);
    QRef.current = {
      startX: J.clientX,
      startWidth: m,
      startLeft: _.left,
    };
    J.preventDefault();
  };
  React.useEffect(() => {
    if (!v) {
      return;
    }
    const J = window.innerWidth < 768;
    const ue = J ? Math.floor(window.innerWidth * 0.8) : 380;
    const de = J ? 200 : 280;
    const ve = (Le) => {
      const Re = QRef.current.startX - Le.clientX;
      const D = Math.max(de, Math.min(ue, QRef.current.startWidth + Re));
      const B = QRef.current.startLeft - (D - QRef.current.startWidth);
      setM(D);
      set_((ne) => ({
        ...ne,
        left: Math.max(0, B),
      }));
    };
    const xe = () => setV(false);
    document.addEventListener("mousemove", ve);
    document.addEventListener("mouseup", xe);
    return () => {
      document.removeEventListener("mousemove", ve);
      document.removeEventListener("mouseup", xe);
    };
  }, [v]);
  React.useEffect(() => {
    if (!i || c) {
      return;
    }
    const J = (ue) => {
      const ue_target = ue.target;
      if (!(ue_target.closest("[data-pizarra-panel]") || ue_target.closest("[data-pizarra-toggle]"))) {
        setI(false);
      }
    };
    document.addEventListener("mousedown", J);
    return () => document.removeEventListener("mousedown", J);
  }, [i, c]);
  const se = () => {
    if (confirm("¿Borrar todas las notas? / 确定清除所有笔记？")) {
      setS("");
    }
  };
  const G = () => {
    const J = new Blob([s], {
      type: "text/plain;charset=utf-8",
    });
    const ue = URL.createObjectURL(J);
    const de = document.createElement("a");
    de.href = ue;
    de.download = `pizarra-notas-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(de);
    de.click();
    document.body.removeChild(de);
    URL.revokeObjectURL(ue);
  };
  return (
    <>
      <button
        data-pizarra-toggle
        onClick={() => {
          setI(!i);
          setC(false);
        }}
        className="fixed z-50 flex items-center justify-center transition-all hover:scale-110"
        style={{
          left: "24px",
          bottom: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: i
            ? "rgba(70,255,154,.15)"
            : "linear-gradient(135deg, rgba(70,255,154,.25), rgba(70,255,154,.1))",
          border: "1px solid rgba(70,255,154,.3)",
          backdropFilter: "blur(10px)",
          boxShadow: i
            ? "0 0 30px rgba(70,255,154,.3)"
            : "0 0 25px rgba(70,255,154,.3), 0 0 50px rgba(70,255,154,.15), 0 4px 20px rgba(0,0,0,.4)",
          transition: "all 0.3s ease",
          animation: i ? "none" : "neonPulseGreen 2s ease-in-out infinite",
        }}
      >
        {i ? (
          <ChevronRightIcon
            size={18}
            style={{
              color: "#46ff9a",
              filter: "drop-shadow(0 0 4px rgba(70,255,154,.6))",
            }}
          />
        ) : (
          <PenLineIcon
            size={18}
            style={{
              color: "#46ff9a",
              filter: "drop-shadow(0 0 4px rgba(70,255,154,.6))",
            }}
          />
        )}
      </button>
      {i && !c && (
        <div
          data-pizarra-panel
          className="fixed z-40 overflow-hidden flex flex-col"
          style={{
            top: `${_.top}px`,
            left: `${_.left}px`,
            width: `${m}px`,
            height: "480px",
            maxHeight: "80vh",
            background: `
    radial-gradient(ellipse at 20% 30%, rgba(30,60,40,0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(20,50,35,0.2) 0%, transparent 50%),
    linear-gradient(180deg, #0a1f14 0%, #0d2518 50%, #081a10 100%)
  `,
            borderRadius: "16px",
            border: "1px solid rgba(70,255,154,.2)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 0 40px rgba(70,255,154,.15), 0 10px 40px rgba(0,0,0,.6), 0 0 80px rgba(70,255,154,.05)",
            animation: "slideInPizarra 0.4s cubic-bezier(.4,0,.2,1)",
            cursor: w ? "grabbing" : "default",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none p-[1px] overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(70,255,154,0.4), rgba(0,212,255,0.3), rgba(70,255,154,0.4))",
              backgroundSize: "300% 100%",
              animation: "borderGradientRotate 4s linear infinite",
            }}
          >
            <div
              className="w-full h-full rounded-2xl"
              style={{
                background: "transparent",
              }}
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none opacity-30 rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: 0.04,
              mixBlendMode: "overlay",
            }}
          />
          <div
            onMouseDown={X}
            className="absolute left-0 top-0 h-full w-1.5 cursor-col-resize z-50 hover:w-2 transition-all"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(70,255,154,.2), transparent)",
            }}
          />
          <div
            className="h-full flex flex-col relative"
            style={{
              width: `${m}px`,
              minWidth: "280px",
            }}
          >
            <div
              onMouseDown={ae}
              className="flex items-center justify-between px-4 py-3 cursor-grab active:cursor-grabbing select-none"
              style={{
                borderBottom: "1px solid rgba(70,255,154,.12)",
                background: "rgba(0,0,0,.2)",
                borderRadius: "16px 16px 0 0",
              }}
            >
              <div className="flex items-center gap-2">
                <GripVerticalIcon
                  size={14}
                  style={{
                    color: "rgba(70,255,154,.4)",
                    cursor: "grab",
                  }}
                />
                <PenLineIcon
                  size={14}
                  style={{
                    color: "#46ff9a",
                    filter: "drop-shadow(0 0 3px rgba(70,255,154,.5))",
                  }}
                />
                <span
                  className="text-sm font-black"
                  style={{
                    color: "#c8e6c9",
                    textShadow: "0 0 8px rgba(70,255,154,.3)",
                  }}
                >
                  Pizarra / 白板
                </span>
                {E && (
                  <span
                    className="text-[9px] font-bold ml-1"
                    style={{
                      color: "rgba(70,255,154,.6)",
                      animation: "fadeIn 0.3s ease",
                    }}
                  >
                    guardado / 已保存
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={G}
                  title="Exportar / 导出"
                  className="p-1.5 rounded-lg transition-all hover:bg-white/5"
                  style={{
                    color: "rgba(200,230,201,.5)",
                  }}
                >
                  <DownloadIcon size={13} />
                </button>
                <button
                  onClick={se}
                  title="Borrar / 清除"
                  className="p-1.5 rounded-lg transition-all hover:bg-white/5"
                  style={{
                    color: "rgba(200,230,201,.5)",
                  }}
                >
                  <EraserIcon size={13} />
                </button>
                <button
                  onClick={() => setC(true)}
                  className="p-1.5 rounded-lg transition-all hover:bg-white/5"
                  style={{
                    color: "rgba(200,230,201,.5)",
                  }}
                >
                  <Minimize2Icon size={13} />
                </button>
                <button
                  onClick={() => setI(false)}
                  className="p-1.5 rounded-lg transition-all hover:bg-white/5"
                  style={{
                    color: "rgba(200,230,201,.5)",
                  }}
                >
                  <XIcon size={13} />
                </button>
              </div>
            </div>
            <div
              className="flex items-center gap-1 px-4 py-2"
              style={{
                background: "rgba(0,0,0,.15)",
                borderBottom: "1px solid rgba(70,255,154,.06)",
              }}
            >
              <button
                onClick={() =>
                  setS(
                    (J) =>
                      J +
                      `
───
`,
                  )
                }
                className="px-2 py-1 rounded text-[10px] font-bold transition-all hover:bg-white/5"
                style={{
                  color: "rgba(200,230,201,.4)",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              >
                ───
              </button>
              <button
                onClick={() =>
                  setS(
                    (J) =>
                      J +
                      `
• `,
                  )
                }
                className="px-2 py-1 rounded text-[10px] font-bold transition-all hover:bg-white/5"
                style={{
                  color: "rgba(200,230,201,.4)",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              >
                • bullet
              </button>
              <button
                onClick={() =>
                  setS(
                    (J) =>
                      J +
                      `
1. `,
                  )
                }
                className="px-2 py-1 rounded text-[10px] font-bold transition-all hover:bg-white/5"
                style={{
                  color: "rgba(200,230,201,.4)",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              >
                1. num
              </button>
              <div
                className="ml-auto text-[9px] font-medium"
                style={{
                  color: "rgba(200,230,201,.25)",
                }}
              >
                {s.length} chars ·{" "}
                {
                  s.split(`
`).length
                }{" "}
                lines
              </div>
            </div>
            <div className="flex-1 p-3 min-h-0">
              <textarea
                ref={RRef}
                value={s}
                onChange={(J) => setS(J.target.value)}
                placeholder="Notas / 笔记..."
                className="w-full h-full resize-none outline-none text-sm leading-relaxed font-mono"
                style={{
                  background: "rgba(0,0,0,.2)",
                  border: "1px solid rgba(70,255,154,.08)",
                  borderRadius: "12px",
                  padding: "16px",
                  color: "#c8e6c9",
                  caretColor: "#46ff9a",
                  boxShadow: "inset 0 2px 8px rgba(0,0,0,.2)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(70,255,154,.15) transparent",
                }}
                spellCheck={false}
              />
            </div>
            <div
              className="px-4 py-2 flex items-center justify-between"
              style={{
                borderTop: "1px solid rgba(70,255,154,.06)",
              }}
            >
              <div className="flex gap-1">
                {["rgba(200,230,201,.08)", "rgba(200,230,201,.06)", "rgba(200,230,201,.04)"].map((J, ue) => (
                  <div
                    key={ue}
                    className="rounded-full"
                    style={{
                      width: `${6 + ue * 3}px`,
                      height: `${6 + ue * 3}px`,
                      background: J,
                    }}
                  />
                ))}
              </div>
              <p
                className="text-[9px] font-medium"
                style={{
                  color: "rgba(200,230,201,.15)",
                }}
              >
                Auto-guardado / 自动保存
              </p>
            </div>
          </div>
        </div>
      )}
      {i && c && (
        <button
          onClick={() => setC(false)}
          className="fixed z-40 bottom-24 right-6 flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105"
          style={{
            background: "rgba(10,30,15,.8)",
            border: "1px solid rgba(70,255,154,.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 20px rgba(70,255,154,.15), 0 0 40px rgba(70,255,154,.05)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <PenLineIcon
            size={14}
            style={{
              color: "#46ff9a",
              filter: "drop-shadow(0 0 3px rgba(70,255,154,.5))",
            }}
          />
          <span
            className="text-xs font-bold"
            style={{
              color: "#c8e6c9",
            }}
          >
            Pizarra
          </span>
          {s.length > 0 && (
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "#46ff9a",
                boxShadow: "0 0 6px rgba(70,255,154,.4)",
              }}
            />
          )}
        </button>
      )}
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideInPizarra { from{transform:translateX(30px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes borderGradientRotate { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes neonPulseGreen { 0%,100%{box-shadow:0 0 25px rgba(70,255,154,.3),0 0 50px rgba(70,255,154,.15),0 4px 20px rgba(0,0,0,.4)} 50%{box-shadow:0 0 35px rgba(70,255,154,.5),0 0 70px rgba(70,255,154,.25),0 4px 20px rgba(0,0,0,.4)} }
      `}</style>
    </>
  );
}
export { Pizarra };
