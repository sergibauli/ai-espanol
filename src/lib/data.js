// Carga diferida del contenido por nivel (cada JSON es un chunk aparte).
export const LEVELS = ['A1', 'A2', 'B1', 'B2'];

export const LEVEL_INFO = {
  A1: { name: 'Acceso', zh: '入门级', color: '#16a34a' },
  A2: { name: 'Plataforma', zh: '初级', color: '#0891b2' },
  B1: { name: 'Umbral', zh: '中级', color: '#7c3aed' },
  B2: { name: 'Avanzado', zh: '中高级', color: '#db2777' },
};

const themes = import.meta.glob('../data/themes-*.json', { import: 'default' });
const dicts = import.meta.glob('../data/dict-*.json', { import: 'default' });
const oficiales = import.meta.glob('../data/oficial-*.json', { import: 'default' });

const cache = new Map();
function load(map, prefix, level) {
  const key = `${prefix}-${level}`;
  if (!cache.has(key)) cache.set(key, map[`../data/${prefix}-${level.toLowerCase()}.json`]());
  return cache.get(key);
}

export const loadThemes = level => load(themes, 'themes', level);
export const loadDict = level => load(dicts, 'dict', level);
export const loadOficiales = level => load(oficiales, 'oficial', level);

export async function loadTheme(level, id) {
  return (await loadThemes(level)).find(t => t.id === Number(id)) ?? null;
}

export async function loadOficial(level, modelo) {
  return (await loadOficiales(level)).find(e => e.modelo === Number(modelo)) ?? null;
}

// Vocabulario normalizado para juegos y repaso: {id, es, zh, def, ex, level, theme}
export async function loadVocab(level) {
  const dict = await loadDict(level);
  return dict.map((w, i) => ({
    id: `${level}-${i}`,
    es: w.es,
    zh: w.zh,
    def: w.explanation,
    ex: w.exampleEs,
    exZh: w.exampleZh,
    level,
    theme: w.theme,
  }));
}
