import * as React from "react";
const LanguageContext = React.createContext({
  lang: "es",
  setLang: () => {},
  t: (i) => i,
});
function LanguageProvider({ children }) {
  const [t, setT] = React.useState("es");
  const t_1 = React.useCallback(
    (s, d) => {
      if (t === "zh") {
        return d;
      }
      return s;
    },
    [t],
  );
  return (
    <LanguageContext.Provider
      value={{
        lang: t,
        setLang: setT,
        t: t_1,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
function useLanguage() {
  return React.useContext(LanguageContext);
}
export { useLanguage, LanguageProvider };
