// Extrae el contenido didáctico de la build publicada (v1) a JSON por nivel.
// Uso: node scripts/extract-data.mjs <carpeta-assets-de-la-v1>
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const src = process.argv[2];
if (!src) { console.error('Indica la carpeta assets de la build v1'); process.exit(1); }
const out = path.resolve('src/data');
fs.mkdirSync(out, { recursive: true });

const mods = {};
for (const f of fs.readdirSync(src).filter(f => /^(a1|a2|b1|b2)(-exams|Dictionary)|^oficial-(a1|a2|b1|b2)-/.test(f))) {
  const m = await import(pathToFileURL(path.join(src, f)));
  const name = Object.keys(m).find(k => k !== 'default');
  mods[name] = m[name];
}

for (const lvl of ['a1', 'a2', 'b1', 'b2']) {
  const L = lvl.toUpperCase();
  const themes = Object.entries(mods)
    .filter(([k]) => k.toLowerCase().startsWith(lvl + 'exams'))
    .flatMap(([, v]) => v)
    .filter(t => t.level === L)
    .sort((a, b) => a.id - b.id);
  const seen = new Set();
  const unique = themes.filter(t => !seen.has(t.id) && seen.add(t.id));
  fs.writeFileSync(path.join(out, `themes-${lvl}.json`), JSON.stringify(unique));
  fs.writeFileSync(path.join(out, `dict-${lvl}.json`), JSON.stringify(mods[lvl + 'Dictionary']));
  fs.writeFileSync(path.join(out, `oficial-${lvl}.json`), JSON.stringify(mods['oficial' + lvl]));
  console.log(L, 'temas', unique.length, 'palabras', mods[lvl + 'Dictionary'].length, 'oficiales', mods['oficial' + lvl].length);
}
