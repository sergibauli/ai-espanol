import * as React from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

/**
 * Cabecera común de sección (diseño v3).
 * stats: [{ value, label }] · actions: nodos (botones/enlaces) · accent: color del icono y del brillo.
 */
export function SectionHero({ icon: Icon, eyebrow, title, titleZh, description, descriptionZh, stats = [], actions, accent = "#ff7a1a", back = "/dashboard", children }) {
  return (
    <section
      className="ui-card is-hero"
      style={{
        padding: "clamp(20px, 3.4vw, 34px)",
        background: `radial-gradient(110% 140% at 0% 0%, ${accent}33, transparent 55%), radial-gradient(90% 120% at 100% 0%, rgba(61,214,255,0.12), transparent 60%), var(--ui-surface)`,
      }}
    >
      {back && (
        <Link to={back} className="ui-row ui-muted no-print" style={{ gap: 6, fontSize: 13, fontWeight: 700, textDecoration: "none", marginBottom: 14 }}>
          <ArrowLeftIcon size={14} /> Inicio · 首页
        </Link>
      )}
      <div className="ui-row ui-hero-head" style={{ alignItems: "flex-start", flexWrap: "nowrap", gap: 18 }}>
        {Icon && (
          <span
            className="ui-icon"
            style={{ width: 58, height: 58, borderRadius: 18, color: accent, background: `${accent}1f`, borderColor: `${accent}55`, boxShadow: `0 10px 30px ${accent}33` }}
          >
            <Icon size={28} />
          </span>
        )}
        <div style={{ minWidth: 0, flex: 1 }}>
          {eyebrow && (
            <div className="ui-eyebrow" style={{ color: accent }}>
              {eyebrow}
            </div>
          )}
          <h1 className="ui-h1" style={{ margin: "6px 0 4px" }}>
            {title}
          </h1>
          {titleZh && <div className="ui-zh" style={{ fontSize: 17, fontWeight: 700 }}>{titleZh}</div>}
          {description && (
            <p className="ui-lead" style={{ margin: "12px 0 0" }}>
              {description}
              {descriptionZh && (
                <>
                  <br />
                  <span className="ui-zh">{descriptionZh}</span>
                </>
              )}
            </p>
          )}
        </div>
      </div>
      {(stats.length > 0 || actions) && (
        <div className="ui-between" style={{ marginTop: 20, alignItems: "flex-end" }}>
          <div className="ui-row" style={{ gap: 26 }}>
            {stats.map((s) => (
              <div key={s.label} className="ui-stat">
                <b style={{ fontSize: 24 }}>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          {actions && <div className="ui-row">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
