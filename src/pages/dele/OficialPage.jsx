import * as React from "react";
import { Link } from "react-router";
import * as jsxRuntime from "react/jsx-runtime";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
import { T } from "../../lib/oficial-loader.js";
const GOLD = "#e0b566";
const GOLD2 = "#f6dfa8";
const RED = "#b3382f";
const LEVELS = [
  {
    key: "A1",
    name: "Acceso",
    zh: "入门",
    lema: "Primeros intercambios y presentaciones",
    color: "#10b981",
    glow: "#34d399",
    p: ["4 tareas · 25 ítems · 45 min", "4 tareas · 25 ítems · 25 min", "2 tareas · 25 min", "3 tareas"],
    items: 58,
  },
  {
    key: "A2",
    name: "Plataforma",
    zh: "基础",
    lema: "Situaciones cotidianas y experiencias",
    color: "#f97316",
    glow: "#fbbf24",
    p: ["4 tareas · 25 ítems · 60 min", "4 tareas · 25 ítems · 40 min", "2 tareas · 25 min", "3 tareas"],
    items: 58,
  },
  {
    key: "B1",
    name: "Umbral",
    zh: "进阶",
    lema: "Argumentación sencilla y textos de opinión",
    color: "#3b82f6",
    glow: "#60a5fa",
    p: ["5 tareas · 30 ítems · 70 min", "5 tareas · 30 ítems · 40 min", "2 tareas · 45 min", "4 tareas"],
    items: 70,
  },
  {
    key: "B2",
    name: "Avanzado",
    zh: "熟练",
    lema: "Discursos complejos y valoración crítica",
    color: "#a855f7",
    glow: "#c084fc",
    p: ["4 tareas · 36 ítems · 70 min", "4 tareas · 30 ítems · 40 min", "2 tareas · 60 min", "3 tareas"],
    items: 74,
  },
];
const PR = [
  [
    "Comprensión de lectura",
    "阅读理解",
    "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z M14 2v5h5 M16 13H8 M16 17H8 M10 9H8",
  ],
  [
    "Comprensión auditiva",
    "听力理解",
    "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
  ],
  [
    "Expresión e interacción escritas",
    "书面表达",
    "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z M15 5l4 4",
  ],
  [
    "Expresión e interacción orales",
    "口头表达",
    "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
  ],
];
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
function done(level) {
  let n = 0;
  const total = (T && T[level]) || 20;
  try {
    for (let i = 1; i <= total; i++) {
      if (localStorage.getItem(`oficial_res_${level}_${i}`)) {
        n++;
      }
    }
  } catch {}
  return n;
}
const CSS = `
.ofx{max-width:760px;margin:0 auto;padding:16px 16px 120px;color:#fff;font-family:'Plus Jakarta Sans','Noto Sans SC',system-ui,sans-serif;position:relative;z-index:10}
.ofx *{box-sizing:border-box}
.ofx-back{display:inline-flex;align-items:center;gap:8px;min-height:44px;color:#c3c8e0;font-size:13px;font-weight:600;text-decoration:none}
.ofx-back:hover{color:${GOLD2}}
.ofx-hero{position:relative;margin-top:6px;border-radius:28px;padding:22px 20px 20px;background:linear-gradient(140deg,rgba(24,20,12,.92),rgba(10,13,28,.97) 55%,rgba(30,14,14,.92));border:1px solid ${GOLD}48;overflow:hidden;animation:ofxRise .6s cubic-bezier(.2,.9,.3,1) both}
.ofx-hero:before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,${GOLD},${RED},transparent)}
.ofx-top{display:flex;gap:18px;align-items:center}
.ofx-seal{position:relative;width:100px;height:100px;flex:0 0 auto}
.ofx-seal-ring{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,${GOLD},${RED},${GOLD2},${RED},${GOLD});animation:ofxSpin 14s linear infinite}
.ofx-seal-in{position:absolute;inset:3px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#141a30,#080b18);border:1px solid ${GOLD}59;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${GOLD}}
.ofx-seal-orbit{position:absolute;inset:-8px;animation:ofxSpin 6s linear infinite}
.ofx-seal-orbit span{position:absolute;top:0;left:50%;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:${GOLD2};box-shadow:0 0 12px ${GOLD}}
.ofx-chip{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:999px;border:1px solid ${GOLD}66;background:${GOLD}14;font-size:11px;font-weight:700;color:${GOLD2}}
.ofx-title{margin:10px 0 0;font-family:Unbounded,'Plus Jakarta Sans',sans-serif;font-weight:900;font-size:clamp(24px,6vw,38px);line-height:1.06;letter-spacing:-.02em;background:linear-gradient(92deg,#fff,${GOLD2},#fff,${GOLD});background-size:220% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:ofxShine 7s linear infinite}
.ofx-sub{font-size:13px;color:#c3c8e0;margin-top:6px}
.ofx-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:18px}
.ofx-stat{border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:10px 12px}
.ofx-stat b{display:block;font-family:Unbounded,sans-serif;font-weight:700;font-size:18px;color:${GOLD2}}
.ofx-stat span{display:block;font-size:11px;color:#c3c8e0;margin-top:2px;line-height:1.3}
.ofx-h2{margin:26px 0 4px;font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#c3c8e0}
.ofx-p{margin:0 0 12px;font-size:13px;color:#a3a9c7}
.ofx-list{display:grid;grid-template-columns:1fr;gap:12px}
.ofx-card{position:relative;border-radius:24px;background:#0b1030;border:1px solid rgba(255,255,255,.09);overflow:hidden;transition:box-shadow .35s,border-color .35s,background .35s;animation:ofxRise .55s cubic-bezier(.2,.9,.3,1) both}
.ofx-card.on{background:linear-gradient(160deg,var(--c22),#0b1030 55%);border-color:var(--c);box-shadow:0 0 0 4px var(--c1f),0 24px 48px -20px var(--c)}
.ofx-head{width:100%;border:0;background:transparent;color:#fff;font:inherit;text-align:left;padding:16px;display:flex;align-items:center;gap:14px;cursor:pointer}
.ofx-head:focus-visible,.ofx-cta:focus-visible,.ofx-back:focus-visible{outline:2px solid ${GOLD2};outline-offset:2px}
.ofx-badge{width:60px;height:60px;flex:0 0 auto;border-radius:18px;background:var(--c1a);border:1.5px solid var(--c);display:flex;align-items:center;justify-content:center;font-family:Unbounded,sans-serif;font-weight:900;font-size:20px;color:var(--g);box-shadow:0 0 24px -6px var(--c)}
.ofx-name{font-family:Unbounded,sans-serif;font-weight:700;font-size:17px}
.ofx-name small{font-family:'Noto Sans SC',sans-serif;font-weight:500;font-size:13px;color:#c3c8e0;margin-left:6px}
.ofx-lema{display:block;font-size:12.5px;color:#b6bbd6;margin-top:3px;line-height:1.35}
.ofx-tags{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
.ofx-tag{height:22px;padding:0 8px;border-radius:99px;background:rgba(255,255,255,.06);font-size:11px;font-weight:700;color:#d5d9ee;display:inline-flex;align-items:center}
.ofx-tag.g{background:var(--c22);color:var(--g)}
.ofx-chev{flex:0 0 auto;color:var(--g);transition:transform .3s}
.ofx-card.on .ofx-chev{transform:rotate(90deg)}
.ofx-body{padding:0 16px 16px;animation:ofxOpen .35s ease both}
.ofx-pr{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.ofx-pr li{border-radius:16px;background:rgba(5,7,20,.55);border:1px solid rgba(255,255,255,.08);padding:12px;display:flex;flex-direction:column;gap:6px}
.ofx-pr-top{display:flex;align-items:center;justify-content:space-between}
.ofx-pr-ic{width:32px;height:32px;border-radius:10px;background:var(--c26);color:var(--g);display:flex;align-items:center;justify-content:center}
.ofx-pr-n{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;font-weight:700;color:#a3a9c7}
.ofx-pr b{font-size:13px;line-height:1.25}
.ofx-pr i{font-style:normal;font-size:11px;color:#a3a9c7;font-family:'Noto Sans SC',sans-serif}
.ofx-pr em{font-style:normal;font-size:12px;font-weight:700;color:var(--g)}
.ofx-cta{margin-top:12px;height:52px;border-radius:16px;background:var(--c);color:#050714;text-decoration:none;font-weight:800;font-size:14.5px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 12px 30px -10px var(--c);transition:transform .2s}
.ofx-cta:active{transform:scale(.97)}
.ofx-grade{margin-top:18px;border-radius:22px;border:1px dashed ${GOLD}73;padding:16px;background:${GOLD}0d}
.ofx-grade h3{margin:0;font-size:11px;font-weight:800;letter-spacing:.12em;color:${GOLD}}
.ofx-grade-g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:10px;font-size:12px;color:#b6bbd6}
.ofx-grade-g b{display:block;color:#fff;font-size:13px}
.ofx-grade-ok{margin-top:12px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:${GOLD2}}
@media (min-width:900px){.ofx{max-width:1040px}.ofx-list{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}}
@media (max-width:380px){.ofx-top{flex-direction:column;align-items:flex-start}.ofx-pr{grid-template-columns:1fr}}
@keyframes ofxSpin{to{transform:rotate(360deg)}}
@keyframes ofxShine{to{background-position:-220% center}}
@keyframes ofxRise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes ofxOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.ofx *{animation:none!important}}
`;
function OficialPage() {
  let t = (a, b) => a;
  try {
    const L = useLanguage();
    if (L && typeof L.t === "function") {
      t = L.t;
    }
  } catch {}
  const [open, setOpen] = React.useState(() => {
    try {
      return localStorage.getItem("ofx_open") || "B1";
    } catch {
      return "B1";
    }
  });
  React.useEffect(() => {
    try {
      if (open) {
        localStorage.setItem("ofx_open", open);
      }
    } catch {}
  }, [open]);
  const total = LEVELS.reduce((acc, item) => acc + ((T && T[item.key]) || 20), 0);
  const hero = h(
    "section",
    {
      className: "ofx-hero",
    },
    h(
      "div",
      {
        className: "ofx-top",
      },
      h(
        "div",
        {
          className: "ofx-seal",
          "aria-hidden": "true",
        },
        h("div", {
          className: "ofx-seal-ring",
        }),
        h(
          "div",
          {
            className: "ofx-seal-in",
          },
          Icon("M12 2a6 6 0 1 0 0 12a6 6 0 1 0 0-12z M8.2 13.1 7 22l5-3 5 3-1.2-8.9", 18),
          h(
            "span",
            {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: ".18em",
                color: GOLD2,
                marginTop: 3,
              },
            },
            "DELE",
          ),
          h(
            "span",
            {
              style: {
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: ".22em",
              },
            },
            "OFICIAL",
          ),
        ),
        h(
          "div",
          {
            className: "ofx-seal-orbit",
          },
          h("span", null),
        ),
      ),
      h(
        "div",
        {
          style: {
            minWidth: 0,
          },
        },
        h(
          "span",
          {
            className: "ofx-chip",
          },
          t("Estructura oficial · 官方考试结构", "官方考试结构"),
        ),
        h(
          "h1",
          {
            className: "ofx-title",
          },
          t("Exámenes DELE oficiales", "DELE 官方考试"),
        ),
        h(
          "div",
          {
            className: "ofx-sub",
          },
          `DELE 官方考试 · ${t("como el día del examen", "模拟真实考试")}`,
        ),
      ),
    ),
    h(
      "div",
      {
        className: "ofx-stats",
      },
      h(
        "div",
        {
          className: "ofx-stat",
        },
        h("b", null, String(total)),
        h("span", null, t("modelos completos", "套完整模型")),
      ),
      h(
        "div",
        {
          className: "ofx-stat",
        },
        h("b", null, "100%"),
        h("span", null, t("claves con frase que lo justifica", "答案附依据")),
      ),
      h(
        "div",
        {
          className: "ofx-stat",
        },
        h("b", null, "IA"),
        h("span", null, t("corrige escritura y oral", "AI 批改写作和口语")),
      ),
    ),
  );
  const cards = LEVELS.map((l, i) => {
    const on = open === l.key;
    const n = (T && T[l.key]) || 20;
    const d = done(l.key);
    const vars = {
      "--c": l.color,
      "--g": l.glow,
      "--c22": `${l.color}22`,
      "--c1f": `${l.color}1f`,
      "--c1a": `${l.color}1a`,
      "--c26": `${l.color}26`,
      animationDelay: `${i * 70}ms`,
    };
    return (
      <article key={l.key} className={`ofx-card${on ? " on" : ""}`} style={vars}>
        {h(
          "button",
          {
            className: "ofx-head",
            "aria-expanded": on ? "true" : "false",
            onClick: () => setOpen(on ? null : l.key),
          },
          h(
            "span",
            {
              className: "ofx-badge",
            },
            l.key,
          ),
          h(
            "span",
            {
              style: {
                flex: 1,
                minWidth: 0,
              },
            },
            h(
              "span",
              {
                className: "ofx-name",
              },
              l.name,
              h("small", null, l.zh),
            ),
            h(
              "span",
              {
                className: "ofx-lema",
              },
              l.lema,
            ),
            h(
              "span",
              {
                className: "ofx-tags",
              },
              h(
                "span",
                {
                  className: "ofx-tag",
                },
                `${n} ${t("modelos", "套")}`,
              ),
              h(
                "span",
                {
                  className: "ofx-tag",
                },
                `${l.items} ${t("ítems y tareas", "题")}`,
              ),
              d > 0
                ? h(
                    "span",
                    {
                      className: "ofx-tag g",
                    },
                    `${d}/${n} ${t("hechos", "已完成")}`,
                  )
                : null,
            ),
          ),
          h(
            "span",
            {
              className: "ofx-chev",
            },
            Icon("m9 18 6-6-6-6", 20),
          ),
        )}
        {on
          ? h(
              "div",
              {
                className: "ofx-body",
              },
              <ol className="ofx-pr">
                {PR.map((p, k) => (
                  <li key={k}>
                    {h(
                      "span",
                      {
                        className: "ofx-pr-top",
                      },
                      h(
                        "span",
                        {
                          className: "ofx-pr-ic",
                        },
                        Icon(p[2], 16),
                      ),
                      h(
                        "span",
                        {
                          className: "ofx-pr-n",
                        },
                        `PRUEBA ${k + 1}`,
                      ),
                    )}
                    {h("b", null, p[0])}
                    {h("i", null, p[1])}
                    {h("em", null, l.p[k])}
                  </li>
                ))}
              </ol>,
              <Link to={`/oficial/${l.key}`} className="ofx-cta">
                {t("Ver modelos ", "查看模型 ") + l.key}
                {Icon("M5 12h14 M12 5l7 7-7 7", 16)}
              </Link>,
            )
          : null}
      </article>
    );
  });
  return (
    <StarfieldBackground>
      {h("style", null, CSS)}
      <div className="ofx">
        <Link to="/dashboard" className="ofx-back">
          {Icon("M19 12H5 M12 19l-7-7 7-7", 18)}
          {t("Volver al inicio", "返回首页")}
        </Link>
        {hero}
        {h(
          "h2",
          {
            className: "ofx-h2",
          },
          t("Elige tu nivel", "选择你的级别"),
        )}
        {h(
          "p",
          {
            className: "ofx-p",
          },
          t(
            "Toca un nivel para ver sus cuatro pruebas y tiempos oficiales.",
            "点击级别查看四项考试和官方时间。",
          ),
        )}
        <div className="ofx-list">{cards}</div>
        {h(
          "section",
          {
            className: "ofx-grade",
            "aria-label": "Sistema de calificación",
          },
          h("h3", null, t("SISTEMA DE CALIFICACIÓN", "评分系统")),
          h(
            "div",
            {
              className: "ofx-grade-g",
            },
            h(
              "div",
              null,
              h("b", null, t("Grupo 1", "第一组")),
              t("Lectura + escritura · máx. 50", "阅读 + 写作 · 满分50"),
            ),
            h(
              "div",
              null,
              h("b", null, t("Grupo 2", "第二组")),
              t("Audición + oral · máx. 50", "听力 + 口语 · 满分50"),
            ),
          ),
          h(
            "div",
            {
              className: "ofx-grade-ok",
            },
            Icon("M20 6 9 17l-5-5", 16, {
              strokeWidth: 2.4,
            }),
            t("APTO si ≥ 30,00 puntos en cada grupo", "每组 ≥ 30 分即通过"),
          ),
        )}
      </div>
    </StarfieldBackground>
  );
}
export { OficialPage as default };
