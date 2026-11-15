import * as React from "react";
import { createPortal } from "react-dom";
import { DownloadIcon, RefreshCwIcon, XIcon, ShareIcon } from "lucide-react";
import { useEstadoApp, instalarApp, cerrarAvisoActualizacion, esInstalada } from "../../lib/appNativo.js";

// Aviso flotante cuando el service worker ha instalado una versión nueva
export function AvisoActualizacion() {
  const { actualizada } = useEstadoApp();
  if (!actualizada) return null;
  return createPortal(
    <div className="app-aviso" role="status">
      <RefreshCwIcon size={18} strokeWidth={2.6} aria-hidden="true" />
      <span>
        Nueva versión lista <small lang="zh">新版本已就绪</small>
      </span>
      <button type="button" className="app-aviso__accion" onClick={() => location.reload()}>
        Actualizar · 更新
      </button>
      <button type="button" className="app-aviso__cerrar" onClick={cerrarAvisoActualizacion} aria-label="Cerrar · 关闭">
        <XIcon size={16} strokeWidth={2.6} />
      </button>
    </div>,
    document.body,
  );
}

const esIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;

// Tarjeta «Instalar la app» de la hoja «Más»: Android/escritorio con el aviso del navegador; iPhone con instrucciones
export function TarjetaInstalar() {
  const { instalar } = useEstadoApp();
  const [verAyuda, setVerAyuda] = React.useState(false);
  if (esInstalada() || (!instalar && !esIOS())) return null;
  return (
    <div className="app-instalar">
      <span className="app-instalar__icono" aria-hidden="true">
        <img src="./icons/icon-192.png" alt="" width="44" height="44" />
      </span>
      <span className="app-instalar__texto">
        <b>
          Instala la app <span lang="zh">安装应用</span>
        </b>
        <small>Pantalla completa, sin navegador y más rápida · 全屏、更快</small>
        {verAyuda && (
          <small className="app-instalar__ios">
            Pulsa <ShareIcon size={13} aria-label="Compartir" /> y luego «Añadir a pantalla de inicio» · 点击分享，再选「添加到主屏幕」
          </small>
        )}
      </span>
      <button type="button" className="app-instalar__boton" onClick={() => (instalar ? instalarApp() : setVerAyuda((v) => !v))}>
        <DownloadIcon size={16} strokeWidth={2.6} aria-hidden="true" />
        {instalar ? "Instalar" : "Cómo"}
      </button>
    </div>
  );
}
