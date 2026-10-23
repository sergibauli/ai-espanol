import * as React from "react";
import { useParams, Link } from "react-router";
import * as jsxRuntime from "react/jsx-runtime";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
import { i, l as l_1 } from "../../lib/oficial-loader.js";
const LV = {
  A1: {
    color: "#10b981",
    glow: "#34d399",
    name: "Acceso",
    zh: "入门",
    info: ["Lectura 45′", "Audición 25′", "Escritura 25′", "Oral 3 tareas"],
  },
  A2: {
    color: "#f97316",
    glow: "#fbbf24",
    name: "Plataforma",
    zh: "基础",
    info: ["Lectura 60′", "Audición 40′", "Escritura 25′", "Oral 3 tareas"],
  },
  B1: {
    color: "#3b82f6",
    glow: "#60a5fa",
    name: "Umbral",
    zh: "进阶",
    info: ["Lectura 70′", "Audición 40′", "Escritura 45′", "Oral 4 tareas"],
  },
  B2: {
    color: "#a855f7",
    glow: "#c084fc",
    name: "Avanzado",
    zh: "熟练",
    info: ["Lectura 70′", "Audición 40′", "Escritura 60′", "Oral 3 tareas"],
  },
};
function h(t, p, ...k) {
  const children = k.length === 0 ? undefined : k.length === 1 ? k[0] : k;
  return jsxRuntime.jsx(
    t,
    children === undefined
      ? p || {}
      : {
          ...(p || {}),
          children,
        },
  );
}
function Icon(d, size, extra) {
  return h(
    "svg",
    {
      width: size || 18,
      height: size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      ...(extra || {}),
    },
    h("path", {
      d,
    }),
  );
}
function result(l, id) {
  try {
    return JSON.parse(localStorage.getItem(`oficial_res_${l}_${id}`) || "null");
  } catch {
    return null;
  }
}
function scoreColor(n) {
  if (n >= 80) {
    return "#34d399";
  }
  if (n >= 60) {
    return "#fbbf24";
  }
  return "#f87171";
}
const CSS = `
.onx{max-width:760px;margin:0 auto;padding:16px 16px 120px;color:#fff;font-family:'Plus Jakarta Sans','Noto Sans SC',system-ui,sans-serif;position:relative;z-index:10}
.onx *{box-sizing:border-box}
.onx-glow{position:fixed;width:520px;height:520px;top:-280px;right:-200px;border-radius:50%;background:radial-gradient(circle,var(--c55) 0%,transparent 68%);pointer-events:none;z-index:0}
.onx-back{display:inline-flex;align-items:center;gap:8px;min-height:44px;color:#c3c8e0;font-size:13px;font-weight:600;text-decoration:none}
.onx-back:hover{color:#fff}
.onx-head{margin-top:6px;display:flex;align-items:flex-end;justify-content:space-between;gap:12px;animation:onxRise .5s both}
.onx-kick{font-size:11px;font-weight:800;letter-spacing:.14em;color:var(--g)}
.onx-h1{margin:6px 0 0;font-family:Unbounded,sans-serif;font-weight:900;font-size:clamp(44px,12vw,64px);line-height:.95;letter-spacing:-.03em;text-shadow:0 0 40px var(--c55)}
.onx-meta{text-align:right;font-size:12px;color:#b6bbd6;line-height:1.55}
.onx-stats{margin-top:18px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.onx-stat{border-radius:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:12px}
.onx-stat b{display:block;font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;font-size:20px}
.onx-stat b small{color:#a3a9c7;font-size:13px}
.onx-stat span{display:block;font-size:11px;color:#b6bbd6;margin-top:3px}
.onx-bar{margin-top:10px;height:8px;border-radius:99px;background:rgba(255,255,255,.07);overflow:hidden}
.onx-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--c),var(--g));box-shadow:0 0 12px var(--c);transition:width .8s}
.onx-rand{margin-top:12px;display:flex;align-items:center;gap:14px;text-decoration:none;color:#fff;border-radius:22px;padding:14px 16px;background:linear-gradient(120deg,var(--c),var(--g));box-shadow:0 18px 40px -16px var(--c);transition:transform .2s}
.onx-rand:active{transform:scale(.98)}
.onx-rand-ic{width:46px;height:46px;border-radius:14px;background:rgba(5,7,20,.22);display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.onx-rand-ic svg{animation:onxSpin 9s linear infinite}
.onx-rand b{display:block;font-size:15px;color:#050714}
.onx-rand span{display:block;font-size:12px;color:#0b1030;margin-top:2px;font-weight:600}
.onx-search{position:relative;margin-top:18px}
.onx-search svg{position:absolute;left:14px;top:14px;color:#a3a9c7}
.onx-search input{width:100%;height:46px;border-radius:15px;border:1px solid rgba(255,255,255,.14);background:#0b1030;color:#fff;padding:0 14px 0 42px;font:inherit;font-size:14px}
.onx-search input::placeholder{color:#8a90b0}
.onx-filters{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
.onx-f{height:36px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:transparent;color:#c3c8e0;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
.onx-f[aria-pressed="true"]{background:var(--c);border-color:var(--c);color:#050714}
.onx-f small{opacity:.75;font-family:'JetBrains Mono',monospace;font-size:11px;margin-left:4px}
.onx-list{list-style:none;margin:14px 0 0;padding:0;display:grid;grid-template-columns:1fr;gap:10px}
.onx-list li{animation:onxRise .45s cubic-bezier(.2,.9,.3,1) both}
.onx-card{display:flex;gap:14px;align-items:stretch;text-decoration:none;color:#fff;border-radius:22px;padding:14px;background:#0b1030;border:1px solid rgba(255,255,255,.08);box-shadow:0 10px 28px -18px rgba(0,0,0,.9);transition:transform .25s cubic-bezier(.2,1.3,.4,1),border-color .25s,box-shadow .25s}
.onx-card:hover{transform:translateY(-3px);border-color:var(--c);box-shadow:0 18px 36px -18px var(--c)}
.onx-card.done{background:linear-gradient(150deg,var(--c1a),#0b1030 55%)}
.onx-num{width:62px;flex:0 0 auto;border-radius:16px;background:var(--c1f);border:1px solid var(--c4d);display:flex;flex-direction:column;align-items:center;justify-content:center}
.onx-num small{font-size:9.5px;font-weight:800;letter-spacing:.12em;color:var(--g)}
.onx-num b{font-family:Unbounded,sans-serif;font-weight:900;font-size:22px;line-height:1.1}
.onx-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.onx-row{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}
.onx-tema{font-weight:700;font-size:14px;line-height:1.3}
.onx-tema:first-letter{text-transform:uppercase}
.onx-amb{display:block;font-size:11px;color:#a3a9c7;margin-top:2px;text-transform:capitalize}
.onx-score{flex:0 0 auto;height:24px;padding:0 8px;border-radius:8px;font-size:11px;font-weight:800;display:inline-flex;align-items:center}
.onx-pips{display:flex;gap:6px;align-items:center}
.onx-pip{height:24px;min-width:30px;padding:0 6px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.12);color:#8a90b0}
.onx-pip.ok{background:var(--c33);border-color:var(--c88);color:#fff}
.onx-go{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:var(--g)}
.onx-empty{text-align:center;padding:36px 10px;color:#a3a9c7;font-size:14px}
.onx-spin{width:40px;height:40px;margin:40px auto 10px;border-radius:50%;border:3px solid rgba(255,255,255,.12);border-top-color:var(--g);animation:onxSpin 1s linear infinite}
.onx-card:focus-visible,.onx-rand:focus-visible,.onx-f:focus-visible,.onx-back:focus-visible,.onx-search input:focus-visible{outline:2px solid var(--g);outline-offset:2px}
@media (min-width:900px){.onx{max-width:1040px}.onx-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@keyframes onxRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes onxSpin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.onx *{animation:none!important}}
`;
function OficialNivelPage() {
  const { level: raw = "A1" } = useParams();
  const l = String(raw).toUpperCase();
  const cfg = LV[l] || LV.A1;
  let t = (a, b) => a;
  try {
    const L = useLanguage();
    if (L && typeof L.t === "function") {
      t = L.t;
    }
  } catch {}
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [q, setQ] = React.useState("");
  const [f, setF] = React.useState("todos");
  React.useEffect(() => {
    let alive = true;
    setLoading(true);
    if (i(l)) {
      l_1(l)
        .then((r) => {
          if (alive) {
            setList(r || []);
            setLoading(false);
          }
        })
        .catch(() => {
          if (alive) {
            setList([]);
            setLoading(false);
          }
        });
    } else {
      setList([]);
      setLoading(false);
    }
    return () => {
      alive = false;
    };
  }, [l]);
  const rows = React.useMemo(
    () =>
      list.map((m) => ({
        m,
        r: result(l, m.id),
      })),
    [list, l],
  );
  const hechos = rows.filter((x) => x.r).length;
  const avg = hechos
    ? Math.round(rows.filter((x) => x.r).reduce((acc, item) => acc + (item.r.total || 0), 0) / hechos)
    : null;
  const best = hechos ? Math.max(...rows.filter((x) => x.r).map((x) => x.r.total || 0)) : null;
  const shown = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows
      .filter((x) => f === "todos" || (f === "hechos" ? !!x.r : !x.r))
      .filter(
        (x) => !s || [x.m.tema, x.m.titulo, x.m.codigo, String(x.m.id)].join(" ").toLowerCase().includes(s),
      );
  }, [rows, q, f]);
  const pick = React.useMemo(() => {
    const pool = rows.filter((x) => !x.r);
    const src = pool.length ? pool : rows;
    return src[Math.floor(Math.random() * src.length)];
  }, [rows]);
  const vars = {
    "--c": cfg.color,
    "--g": cfg.glow,
    "--c55": `${cfg.color}55`,
    "--c1a": `${cfg.color}1a`,
    "--c1f": `${cfg.color}1f`,
    "--c33": `${cfg.color}40`,
    "--c4d": `${cfg.glow}4d`,
    "--c88": `${cfg.glow}88`,
  };
  const FL = [
    ["todos", t("Todos", "全部"), rows.length],
    ["pend", t("Sin hacer", "未做"), rows.length - hechos],
    ["hechos", t("Hechos", "已完成"), hechos],
  ];
  const kids = [
    h("div", {
      className: "onx-glow",
      "aria-hidden": "true",
    }),
    <Link to="/oficial" className="onx-back">
      {Icon("M19 12H5 M12 19l-7-7 7-7", 18)}
      {t("Exámenes oficiales", "返回官方考试")}
    </Link>,
    h(
      "header",
      {
        className: "onx-head",
      },
      h(
        "div",
        null,
        h(
          "div",
          {
            className: "onx-kick",
          },
          `DELE · ${cfg.name.toUpperCase()} · ${cfg.zh}`,
        ),
        h(
          "h1",
          {
            className: "onx-h1",
          },
          l,
        ),
      ),
      h(
        "div",
        {
          className: "onx-meta",
        },
        `${list.length || "—"} ${t("modelos completos", "套完整模型")}`,
        h("br", null),
        `${cfg.info[0]} · ${cfg.info[1]}`,
        h("br", null),
        `${cfg.info[2]} · ${cfg.info[3]}`,
      ),
    ),
    h(
      "section",
      {
        "aria-label": "Progreso",
      },
      h(
        "div",
        {
          className: "onx-stats",
        },
        h(
          "div",
          {
            className: "onx-stat",
          },
          h("b", null, String(hechos), h("small", null, `/${list.length || 0}`)),
          h("span", null, t("Completados", "已完成")),
        ),
        h(
          "div",
          {
            className: "onx-stat",
          },
          h(
            "b",
            {
              style: {
                color: avg != null ? scoreColor(avg) : "#a3a9c7",
              },
            },
            avg != null ? `${avg}%` : "—",
          ),
          h("span", null, t("Acierto medio", "平均正确率")),
        ),
        h(
          "div",
          {
            className: "onx-stat",
          },
          h(
            "b",
            {
              style: {
                color: best != null ? scoreColor(best) : "#a3a9c7",
              },
            },
            best != null ? `${best}%` : "—",
          ),
          h("span", null, t("Mejor modelo", "最佳成绩")),
        ),
      ),
      h(
        "div",
        {
          className: "onx-bar",
          "aria-hidden": "true",
        },
        h("i", {
          style: {
            width: `${list.length ? Math.round((hechos / list.length) * 100) : 0}%`,
          },
        }),
      ),
    ),
    pick ? (
      <Link to={`/oficial/${l}/${pick.m.id}`} className="onx-rand">
        {h(
          "span",
          {
            className: "onx-rand-ic",
          },
          Icon(
            "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 8h.01 M16 8h.01 M12 12h.01 M8 16h.01 M16 16h.01",
            24,
            {
              stroke: "#050714",
            },
          ),
        )}
        {h(
          "span",
          {
            style: {
              flex: 1,
            },
          },
          h("b", null, t("Simulacro sorpresa", "随机模拟考试")),
          h("span", null, t("Un modelo al azar que aún no has hecho", "随机选择一套未做的模型")),
        )}
        {Icon("M5 12h14 M12 5l7 7-7 7", 20, {
          stroke: "#050714",
          strokeWidth: 2.4,
        })}
      </Link>
    ) : null,
    h(
      "div",
      {
        className: "onx-search",
      },
      Icon("M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16z M21 21l-4.3-4.3", 18),
      h("input", {
        type: "search",
        value: q,
        onChange: (ev) => setQ(ev.target.value),
        placeholder: t("Buscar por tema o número de modelo…", "按主题或模型编号搜索…"),
        "aria-label": t("Buscar modelo", "搜索模型"),
      }),
    ),
    <div className="onx-filters" role="group" aria-label="Filtrar">
      {FL.map(([k, lab, n]) => (
        <button key={k} className="onx-f" aria-pressed={f === k ? "true" : "false"} onClick={() => setF(k)}>
          {lab}
          {h("small", null, String(n))}
        </button>
      ))}
    </div>,
    loading ? (
      h(
        "div",
        null,
        h("div", {
          className: "onx-spin",
        }),
        h(
          "p",
          {
            className: "onx-empty",
            style: {
              paddingTop: 0,
            },
          },
          t("Preparando los modelos oficiales…", "正在准备官方模型…"),
        ),
      )
    ) : !list.length ? (
      h(
        "p",
        {
          className: "onx-empty",
        },
        t("Nivel pendiente de publicación", "该级别尚未发布"),
      )
    ) : !shown.length ? (
      h(
        "p",
        {
          className: "onx-empty",
        },
        t("Ningún modelo coincide", "没有匹配的模型"),
      )
    ) : (
      <ul className="onx-list">
        {shown.map(({ m, r }, i) => {
          const num = String(m.id).padStart(2, "0");
          const pip = (lab, v, title) =>
            h(
              "span",
              {
                className: `onx-pip${v != null ? " ok" : ""}`,
                title: title + (v != null ? ` · ${v}%` : ""),
              },
              v != null ? `${lab} ${v}` : lab,
            );
          return (
            <li
              key={m.id}
              style={{
                animationDelay: `${Math.min(i, 12) * 40}ms`,
              }}
            >
              <Link
                to={`/oficial/${l}/${m.id}`}
                className={`onx-card${r ? " done" : ""}`}
                aria-label={`Modelo ${m.id}: ${m.tema}`}
              >
                {h(
                  "span",
                  {
                    className: "onx-num",
                  },
                  h("small", null, "MODELO"),
                  h("b", null, num),
                )}
                {h(
                  "span",
                  {
                    className: "onx-body",
                  },
                  h(
                    "span",
                    {
                      className: "onx-row",
                    },
                    h(
                      "span",
                      null,
                      h(
                        "span",
                        {
                          className: "onx-tema",
                        },
                        m.tema || m.titulo,
                      ),
                      m.ambito
                        ? h(
                            "span",
                            {
                              className: "onx-amb",
                            },
                            m.ambito,
                          )
                        : null,
                    ),
                    r
                      ? h(
                          "span",
                          {
                            className: "onx-score",
                            style: {
                              color: scoreColor(r.total || 0),
                              background: `${scoreColor(r.total || 0)}22`,
                            },
                          },
                          `${r.total || 0}%`,
                        )
                      : null,
                  ),
                  h(
                    "span",
                    {
                      className: "onx-pips",
                    },
                    pip(
                      "L",
                      r && r.lectura != null ? r.lectura : null,
                      t("Comprensión de lectura", "阅读理解"),
                    ),
                    pip(
                      "A",
                      r && r.audicion != null ? r.audicion : null,
                      t("Comprensión auditiva", "听力理解"),
                    ),
                    h(
                      "span",
                      {
                        className: "onx-go",
                      },
                      r ? t("Repetir →", "重做 →") : t("Empezar →", "开始 →"),
                    ),
                  ),
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    ),
  ];
  return (
    <StarfieldBackground>
      <div className="onx" style={vars}>
        {h("style", null, CSS)}
        {...kids}
      </div>
    </StarfieldBackground>
  );
}
export { OficialNivelPage as default };
