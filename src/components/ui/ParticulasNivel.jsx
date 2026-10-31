import * as React from "react";
import "../../styles/dele-niveles.css";

// Partículas animadas de cada mundo: pétalos (A1), linternas que suben (A2), niebla (B1) y chispas de oro (B2)
export function ParticulasNivel({ nivel }) {
  const n = nivel === "A2" ? 12 : 18;
  return (
    <div className={`dn-particulas dn-p-${nivel}`} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i * 0.73) % 9}s`, animationDuration: `${8 + (i % 5) * 2}s`, "--s": `${0.6 + (i % 4) * 0.25}` }} />
      ))}
    </div>
  );
}
