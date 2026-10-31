import * as React from "react";
import { LanguagesIcon, CheckIcon } from "lucide-react";
import { IDIOMAS_AYUDA, useLanguage } from "../../lib/i18n.jsx";

// Elige el idioma en el que salen las ayudas y traducciones (el español no cambia)
export function SelectorIdioma({ compacto = false, arriba = false }) {
  const { ayuda, setAyuda } = useLanguage();
  const [abierto, setAbierto] = React.useState(false);
  const ref = React.useRef(null);
  const actual = IDIOMAS_AYUDA.find((l) => l.code === ayuda) || IDIOMAS_AYUDA[0];
  React.useEffect(() => {
    if (!abierto) return;
    const fuera = (e) => !ref.current?.contains(e.target) && setAbierto(false);
    const esc = (e) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", esc);
    return () => (document.removeEventListener("pointerdown", fuera), document.removeEventListener("keydown", esc));
  }, [abierto]);
  return (
    <div className={`sel-idioma ${compacto ? "compacto" : ""} ${arriba ? "arriba" : ""}`} ref={ref} translate="no">
      <button type="button" className="sel-idioma-btn" onClick={() => setAbierto((v) => !v)} aria-haspopup="listbox" aria-expanded={abierto} title="Idioma de ayuda">
        <span className="sel-idioma-bandera">{actual.bandera}</span>
        {!compacto && <span className="sel-idioma-nombre">{actual.nombre}</span>}
        <LanguagesIcon size={15} strokeWidth={2.4} />
      </button>
      {abierto && (
        <div className="sel-idioma-menu" role="listbox" aria-label="Idioma de ayuda">
          <div className="sel-idioma-titulo">Idioma de ayuda</div>
          {IDIOMAS_AYUDA.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === ayuda}
              className={l.code === ayuda ? "on" : ""}
              onClick={() => (setAyuda(l.code), setAbierto(false))}
            >
              <span className="sel-idioma-bandera">{l.bandera}</span>
              <span>
                {l.nombre}
                <small>{l.es}</small>
              </span>
              {l.code === ayuda && <CheckIcon size={16} strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
