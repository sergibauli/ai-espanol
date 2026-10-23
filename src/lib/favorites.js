import * as React from "react";
const FAVORITES_KEY = "dele_favorites";
function normalizeFavorite(i) {
  return i.trim().toLowerCase();
}
function useFavorites() {
  const [i, setI] = React.useState(() => {
    try {
      const m = localStorage.getItem(FAVORITES_KEY);
      if (m) {
        return JSON.parse(m);
      }
      return [];
    } catch {
      return [];
    }
  });
  React.useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(i));
  }, [i]);
  const addFavorite = React.useCallback((m, g, v, f) => {
    const E = normalizeFavorite(m);
    setI((j) => {
      if (j.some((_) => normalizeFavorite(_.word) === E)) {
        return j;
      }
      return [
        ...j,
        {
          word: m,
          chinese: g,
          source: v,
          level: f,
          timestamp: Date.now(),
        },
      ];
    });
  }, []);
  const removeFavorite = React.useCallback((m) => {
    const g = normalizeFavorite(m);
    setI((v) => v.filter((f) => normalizeFavorite(f.word) !== g));
  }, []);
  const isFavorite = React.useCallback(
    (m) => {
      const g = normalizeFavorite(m);
      return i.some((v) => normalizeFavorite(v.word) === g);
    },
    [i],
  );
  const reload = React.useCallback(() => {
    try {
      const m = localStorage.getItem(FAVORITES_KEY);
      setI(m ? JSON.parse(m) : []);
    } catch {
      setI([]);
    }
  }, []);
  return {
    favorites: i,
    addFavorite,
    removeFavorite,
    isFavorite,
    count: i.length,
    reload,
  };
}
export { useFavorites };
