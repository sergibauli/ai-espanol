// Indicador discreto de dónde está el progreso: en la cuenta, guardándose o pendiente (sin conexión).
// Sin servidor de progreso o con el admin local no se muestra nada.
import { CloudIcon, CloudOffIcon, RefreshCwIcon } from "lucide-react";
import { useEstadoSync } from "../../lib/syncProgreso.js";

const TEXTOS = {
  guardado: { icono: CloudIcon, es: "Progreso guardado en tu cuenta", zh: "进度已保存到账号" },
  sincronizando: { icono: RefreshCwIcon, es: "Guardando en tu cuenta…", zh: "正在保存…" },
  "pendiente-breve": { icono: RefreshCwIcon, es: "Guardando en tu cuenta…", zh: "正在保存…" },
  pendiente: { icono: CloudOffIcon, es: "Sin conexión, se guardará luego", zh: "离线，稍后保存" },
};

export function EstadoGuardado({ className = "" }) {
  const { fase } = useEstadoSync();
  const t = TEXTOS[fase];
  if (!t) return null;
  const Icono = t.icono;
  return (
    <p className={`estado-guardado is-${fase} ${className}`} role="status" aria-live="polite">
      <Icono size={14} strokeWidth={2.4} aria-hidden="true" />
      <span>
        {t.es} · <span lang="zh-Hans">{t.zh}</span>
      </span>
    </p>
  );
}
