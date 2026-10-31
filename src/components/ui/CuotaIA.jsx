import * as React from "react";
import { SparklesIcon } from "lucide-react";
import { cuotaIA } from "../../lib/deepseekClient.js";

// Consultas de IA que le quedan al alumno esta semana (5 por semana)
export function useCuotaIA() {
  const [c, setC] = React.useState(cuotaIA);
  React.useEffect(() => {
    const f = () => setC(cuotaIA());
    window.addEventListener("cuota-ia", f);
    window.addEventListener("storage", f);
    return () => (window.removeEventListener("cuota-ia", f), window.removeEventListener("storage", f));
  }, []);
  return c;
}

export function CuotaIA({ className = "" }) {
  const c = useCuotaIA();
  const dias = Math.max(1, Math.ceil((c.reinicio - Date.now()) / 864e5));
  return (
    <div className={`cuota-ia ${c.restantes === 0 ? "agotada" : ""} ${className}`} title={`Se renueva en ${dias} día${dias > 1 ? "s" : ""} · ${dias}天后更新`}>
      <SparklesIcon size={15} strokeWidth={2.6} />
      <span className="cuota-ia-perlas" aria-hidden="true">
        {Array.from({ length: c.limite }, (_, i) => (
          <i key={i} className={i < c.restantes ? "on" : ""} />
        ))}
      </span>
      <span>
        IA {c.restantes}/{c.limite} <small>esta semana · 本周</small>
      </span>
    </div>
  );
}
