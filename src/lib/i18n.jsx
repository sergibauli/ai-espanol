import * as React from "react";
import { iniciarTraductor } from "./traductorDom.js";

// Idioma de apoyo: la web está en español y las ayudas salen en chino por defecto. Si el alumno elige otro idioma,
// todo el chino de la interfaz y de las unidades se sustituye por ese idioma (diccionarios en public/i18n/<idioma>/).
export const IDIOMAS_AYUDA = [
  { code: "zh", nombre: "中文", es: "Chino", bandera: "🇨🇳" },
  { code: "en", nombre: "English", es: "Inglés", bandera: "🇬🇧" },
  { code: "fr", nombre: "Français", es: "Francés", bandera: "🇫🇷" },
  { code: "de", nombre: "Deutsch", es: "Alemán", bandera: "🇩🇪" },
  { code: "nl", nombre: "Nederlands", es: "Neerlandés", bandera: "🇳🇱" },
  { code: "ru", nombre: "Русский", es: "Ruso", bandera: "🇷🇺" },
  { code: "ja", nombre: "日本語", es: "Japonés", bandera: "🇯🇵" },
];
const CLAVE_AYUDA = "ai-espanol:idioma-ayuda";

function ayudaGuardada() {
  try {
    const v = localStorage.getItem(CLAVE_AYUDA);
    if (IDIOMAS_AYUDA.some((l) => l.code === v)) return v;
  } catch {}
  return "zh";
}

const LanguageContext = React.createContext({
  lang: "es",
  setLang: () => {},
  t: (es) => es,
  ayuda: "zh",
  setAyuda: () => {},
});

function LanguageProvider({ children }) {
  const [lang, setLang] = React.useState("es");
  const [ayuda, setAyudaState] = React.useState(ayudaGuardada);
  const t = React.useCallback((es, zh) => (lang === "zh" ? zh : es), [lang]);
  const setAyuda = React.useCallback((code) => {
    try {
      localStorage.setItem(CLAVE_AYUDA, code);
    } catch {}
    setAyudaState(code);
  }, []);
  React.useEffect(() => {
    document.documentElement.setAttribute("data-ayuda", ayuda);
    return iniciarTraductor(ayuda);
  }, [ayuda]);
  return <LanguageContext.Provider value={{ lang, setLang, t, ayuda, setAyuda }}>{children}</LanguageContext.Provider>;
}

function useLanguage() {
  return React.useContext(LanguageContext);
}
export { useLanguage, LanguageProvider };
