import * as React from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { HeroSeccion } from "../../../packages/imperial/src/index.js";

/**
 * Cabecera común de sección: héroe lacado del sistema de diseño Imperial (packages/imperial).
 * stats: [{ value, label }] · actions: nodos (botones/enlaces) · mascota: pose opcional del Rey Mono.
 * `icon` y `accent` se aceptan por compatibilidad con las páginas antiguas, pero el héroe imperial no los usa.
 */
export function SectionHero({ eyebrow, title, titleZh, description, descriptionZh, stats = [], actions, mascota, back = "/dashboard", children }) {
  const acciones =
    stats.length > 0 || actions ? (
      <>
        {stats.map((s) => (
          <span key={s.label} className="sh-stat">
            <b>{s.value}</b>
            {s.label}
          </span>
        ))}
        {actions}
      </>
    ) : null;
  return (
    <div className="sh-wrap">
      {back && (
        <Link to={back} className="sh-back no-print">
          <ArrowLeftIcon size={14} /> Inicio · 首页
        </Link>
      )}
      <HeroSeccion ceja={eyebrow} titulo={title} tituloZh={titleZh} descripcion={description} descripcionZh={descriptionZh} mascota={mascota} acciones={acciones} />
      {children}
    </div>
  );
}
