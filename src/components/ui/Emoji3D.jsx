import * as React from "react";
import INDEX from "../../data/emoji3d.json";

// Ilustraciones 3D (Microsoft Fluent Emoji, licencia MIT) alojadas en public/3d/.
// Si un emoji no tiene versión 3D, se muestra el emoji normal.
export function Emoji3D({ emoji, size = 48, float = false, className = "", style, alt }) {
  const file = INDEX[emoji] || INDEX[String(emoji || "").replace(/️/g, "")];
  if (!file) {
    return (
      <span className={className} style={{ fontSize: size * 0.82, lineHeight: 1, display: "inline-block", ...style }} role="img" aria-label={alt || emoji}>
        {emoji}
      </span>
    );
  }
  return (
    <img
      src={`./3d/${file}.webp`}
      width={size}
      height={size}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`${float ? "e3d-float" : ""} ${className}`}
      style={{ width: size, height: size, objectFit: "contain", filter: "drop-shadow(0 8px 14px rgba(0,0,0,.35))", ...style }}
    />
  );
}
