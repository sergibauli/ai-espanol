import * as React from "react";
import { createPortal } from "react-dom";
import { PrinterIcon } from "lucide-react";
import "../../styles/impresion-boton.css";

const VistaImpresion = React.lazy(() => import("./VistaImpresion.jsx"));

/**
 * Botón «Imprimir / PDF · 打印 / PDF» que abre la vista previa de impresión.
 * fuente: { tipo: "oficial" | "generado" | "practica", examen, nivel?, extra? }
 *         o una función (síncrona o async) que la devuelve (p. ej. para generar el examen al pulsar).
 */
export function BotonImprimir({ fuente, className = "", compacto = false, etiqueta, title }) {
  // La fuente se fija al abrir: así la vista previa no se rehace con cada render de la página (temporizadores)
  const [abierto, setAbierto] = React.useState(null);
  const cerrar = React.useCallback(() => setAbierto(null), []);
  return (
    <>
      <button type="button" className={`ip-boton ${compacto ? "compacto" : ""} ${className}`} onClick={() => setAbierto({ fuente })} title={title || "Imprimir o guardar en PDF · 打印或保存为 PDF"}>
        <PrinterIcon size={compacto ? 16 : 18} aria-hidden="true" />
        {etiqueta || (
          <span>
            Imprimir / PDF · <span lang="zh-CN">打印 / PDF</span>
          </span>
        )}
      </button>
      {abierto &&
        createPortal(
          <React.Suspense fallback={<div className="ip-capa-cargando" role="status">打印 · …</div>}>
            <VistaImpresion fuente={abierto.fuente} onCerrar={cerrar} />
          </React.Suspense>,
          document.body,
        )}
    </>
  );
}

export default BotonImprimir;

/** Vista previa controlada desde fuera (p. ej. el botón PDF de la cabecera de la sala de examen). */
export function CapaImpresion({ fuente, onCerrar }) {
  return createPortal(
    <React.Suspense fallback={<div className="ip-capa-cargando" role="status">打印 · …</div>}>
      <VistaImpresion fuente={fuente} onCerrar={onCerrar} />
    </React.Suspense>,
    document.body,
  );
}
