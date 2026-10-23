import { LayoutDashboardIcon, ChevronDownIcon, GlobeIcon, LogOutIcon } from "lucide-react";
import * as React from "react";
import { useLocation, Link } from "react-router";
import { useAppAuth } from "../../lib/auth.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
import { NAV_GROUPS, NAV_LINKS } from "./navConfig.js";
function TopNav() {
  const { isAuthenticated, user, logout } = useAppAuth();
  const { lang, setLang, t: t_1 } = useLanguage();
  const m = useLocation();
  const [g, setG] = React.useState(null);
  const fRef = React.useRef(null);
  React.useEffect(() => {
    setG(null);
  }, [m.pathname]);
  React.useEffect(() => {
    const _ = (A) => {
      if (fRef.current && !fRef.current.contains(A.target)) {
        setG(null);
      }
    };
    document.addEventListener("mousedown", _);
    return () => document.removeEventListener("mousedown", _);
  }, []);
  if (!isAuthenticated) {
    return null;
  }
  const E = (_) => _.children.some((A) => m.pathname === A.path || m.pathname.startsWith(`${A.path}/`));
  const j = m.pathname === "/dashboard";
  return (
    <>
      <nav
        ref={fRef}
        className="app-navbar fixed top-0 left-0 right-0 z-40 border-b border-white/10"
        style={{
          background: "linear-gradient(180deg, rgba(8,10,26,0.82), rgba(8,10,26,0.62))",
          backdropFilter: "blur(18px) saturate(1.4)",
          WebkitBackdropFilter: "blur(18px) saturate(1.4)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="h-[2px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent, #ff8a2a, #ff36d7, #00d4ff, transparent)",
            backgroundSize: "200% 100%",
            animation: "fxUnderlineFlow 4s linear infinite",
          }}
        />
        <div className="max-w-[1480px] mx-auto px-3 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/dashboard"
              className="brand-orbit flex items-center gap-2.5 shrink-0"
              aria-label="AI Español"
            >
              <span className="brand-mark">AI</span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[15px] font-black tracking-[0.08em] text-white">ESPAÑOL</span>
                <span className="text-[9px] font-bold tracking-[0.24em] text-orange-300/80 mt-1">
                  DELE LAB
                </span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1.5 mx-2">
              <Link
                to="/dashboard"
                aria-current={j ? "page" : undefined}
                className="nav-pill flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                style={{
                  color: j ? "#f97316" : "rgba(255,255,255,0.55)",
                  background: j ? "#f9731615" : "transparent",
                  border: j ? "1px solid #f9731630" : "1px solid transparent",
                  textShadow: j ? "0 0 10px #fb923c40" : "none",
                }}
              >
                <LayoutDashboardIcon
                  size={14}
                  style={{
                    filter: j ? "drop-shadow(0 0 4px #fb923c)" : "none",
                  }}
                />
                <span>仪表盘</span>
              </Link>
              {NAV_GROUPS.map((_) => {
                const A = E(_);
                const w = g === _.key;
                const Icon = _.icon;
                return (
                  <div key={_.key} className="relative">
                    <button
                      onClick={() => setG(w ? null : _.key)}
                      aria-expanded={w}
                      className="nav-pill flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                      style={{
                        color: A || w ? _.color : "rgba(255,255,255,0.55)",
                        background: A ? `${_.color}15` : w ? "rgba(255,255,255,0.06)" : "transparent",
                        border: A ? `1px solid ${_.color}30` : "1px solid transparent",
                        textShadow: A ? `0 0 10px ${_.glow}40` : "none",
                      }}
                    >
                      <Icon
                        size={14}
                        style={{
                          filter: A ? `drop-shadow(0 0 4px ${_.glow})` : "none",
                        }}
                      />
                      <span>{_.labelZh}</span>
                      <ChevronDownIcon
                        size={12}
                        style={{
                          transform: w ? "rotate(180deg)" : "none",
                          transition: "transform .25s ease",
                          opacity: 0.7,
                        }}
                      />
                    </button>
                    {w && (
                      <div
                        className="absolute left-0 top-full mt-2 min-w-[220px] rounded-2xl p-2 z-50"
                        style={{
                          background: "linear-gradient(165deg, rgba(16,19,44,0.97), rgba(9,11,28,0.97))",
                          border: `1px solid ${_.color}35`,
                          boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 34px ${_.color}18`,
                          backdropFilter: "blur(20px)",
                          animation: "fxPageIn 0.28s cubic-bezier(0.22,1,0.36,1) both",
                        }}
                      >
                        <div
                          className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em]"
                          style={{
                            color: _.color,
                          }}
                        >
                          {_.label} · {_.labelZh}
                        </div>
                        {_.children.map((R) => {
                          const P = m.pathname === R.path || m.pathname.startsWith(`${R.path}/`);
                          const R_icon = R.icon;
                          return (
                            <Link
                              key={R.path}
                              to={R.path}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group/item"
                              style={{
                                background: P ? `${R.color}16` : "transparent",
                                border: P ? `1px solid ${R.color}35` : "1px solid transparent",
                              }}
                              onMouseEnter={(Q) => {
                                if (!P) {
                                  Q.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                }
                              }}
                              onMouseLeave={(Q) => {
                                if (!P) {
                                  Q.currentTarget.style.background = "transparent";
                                }
                              }}
                            >
                              <span
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110"
                                style={{
                                  background: `${R.color}15`,
                                  border: `1px solid ${R.color}30`,
                                  boxShadow: P ? `0 0 14px ${R.color}40` : "none",
                                }}
                              >
                                <R_icon
                                  size={15}
                                  style={{
                                    color: R.color,
                                    filter: P ? `drop-shadow(0 0 4px ${R.glow})` : "none",
                                  }}
                                />
                              </span>
                              <span className="flex flex-col leading-tight">
                                <span
                                  className="text-xs font-black"
                                  style={{
                                    color: P ? "#fff" : "rgba(255,255,255,0.75)",
                                  }}
                                >
                                  {R.label}
                                </span>
                                <span
                                  className="text-[10px] font-bold"
                                  style={{
                                    color: `${R.color}90`,
                                  }}
                                >
                                  {R.labelZh}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setLang(lang === "es" ? "zh" : "es")}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold transition-all hover:bg-white/10"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <GlobeIcon size={12} />
                <span className="hidden lg:inline">{lang === "es" ? "ES / 中文" : "中文 / ES"}</span>
              </button>
              {user && (
                <>
                  <span className="text-xs font-bold text-white/60 hidden lg:inline">{user.name}</span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold transition-all hover:bg-red-500/20 hover:text-red-400"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <LogOutIcon size={12} />
                    <span className="hidden lg:inline">{t_1("Salir", "退出")}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" />
      <nav className="mobile-bottom-nav md:hidden" aria-label="Navegación principal móvil">
        <div className="mobile-bottom-track no-scrollbar">
          {NAV_LINKS.map((_) => {
            const A = m.pathname === _.path || m.pathname.startsWith(`${_.path}/`);
            const Icon1 = _.icon;
            return (
              <Link
                key={_.path}
                to={_.path}
                aria-current={A ? "page" : undefined}
                className={`mobile-nav-item ${A ? "is-active" : ""}`}
                style={{
                  "--nav-color": _.color,
                  "--nav-glow": _.glow,
                }}
              >
                <span className="mobile-nav-icon">
                  <Icon1 size={19} />
                </span>
                <span>{_.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
export { TopNav };
