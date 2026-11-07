import * as React from "react";
import { SparklesIcon } from "lucide-react";
import { cuotaIA } from "../../lib/deepseekClient.js";

// Consultas de IA que le quedan al alumno esta semana (5 por semana)
export function useCuotaIA() {
  const [cuota, setCuota] = React.useState(cuotaIA);
  React.useEffect(() => {
    const actualizar = () => setCuota(cuotaIA());
    window.addEventListener("cuota-ia", actualizar);
    window.addEventListener("storage", actualizar);
    return () => (window.removeEventListener("cuota-ia", actualizar), window.removeEventListener("storage", actualizar));
  }, []);
  return cuota;
}

// Días que faltan para el lunes (hora de China), cuando se renuevan las consultas
export function diasParaRenovar(cuota) {
  return Math.max(1, Math.ceil((cuota.reinicio - Date.now()) / 864e5));
}

/**
 * Cuota semanal de IA.
 * - variante "compacta" (por defecto): píldora con monedas y «IA 3/5».
 * - variante "panel": tarjeta que se entiende de un vistazo (cuántas quedan, qué cuenta como uso y cuándo se renuevan).
 */
export function CuotaIA({ className = "", variante = "compacta" }) {
  const cuota = useCuotaIA();
  const dias = diasParaRenovar(cuota);
  const agotada = cuota.restantes === 0;
  const renueva = `Se renuevan en ${dias} día${dias > 1 ? "s" : ""} · ${dias}天后更新`;
  const resumen = agotada
    ? `Consultas de IA agotadas esta semana. ${renueva}`
    : `Te quedan ${cuota.restantes} de ${cuota.limite} consultas de IA esta semana. ${renueva}`;
  const monedas = (
    <span className="cuota-ia-perlas tp-cuota-monedas" aria-hidden="true">
      {Array.from({ length: cuota.limite }, (_, indice) => (
        <i key={indice} className={indice < cuota.restantes ? "on" : ""} />
      ))}
    </span>
  );

  if (variante === "panel") {
    return (
      <div className={`tp-cuota ${agotada ? "agotada" : ""} ${className}`} role="status" aria-label={resumen}>
        <div className="tp-cuota-cab">
          <SparklesIcon size={16} strokeWidth={2.6} aria-hidden="true" />
          <span className="tp-cuota-tit">
            Consultas de IA <small>本周AI次数</small>
          </span>
          <span className="tp-cuota-num" aria-hidden="true">
            <b>{cuota.restantes}</b>/{cuota.limite}
          </span>
        </div>
        {monedas}
        <p className="tp-cuota-pie">
          {agotada ? (
            <>
              <b>Agotadas · 已用完</b> {renueva}
            </>
          ) : (
            <>
              Una conversación = 1 consulta · 一次对话=1次 · {renueva}
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={`cuota-ia tp-cuota-compacta ${agotada ? "agotada" : ""} ${className}`} title={renueva} role="status" aria-label={resumen}>
      <SparklesIcon size={15} strokeWidth={2.6} aria-hidden="true" />
      {monedas}
      <span aria-hidden="true">
        IA {cuota.restantes}/{cuota.limite} <small>{agotada ? "agotadas · 已用完" : "esta semana · 本周"}</small>
      </span>
    </div>
  );
}
