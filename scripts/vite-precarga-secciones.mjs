// Plugin de Vite: genera `precarga.json` con los ficheros (JS + CSS) que necesita cada sección de
// src/lib/precarga.js. Así la precarga los pide con <link rel="prefetch"> (solo se descargan a la caché)
// en vez de con import(), que además inyecta el CSS de la sección en la página que se está viendo y
// obliga a recalcular los estilos de todo el documento (cientos de ms por hoja).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default function precargaSecciones() {
  return {
    name: 'precarga-secciones',
    apply: 'build',
    generateBundle(_, bundle) {
      const fuente = readFileSync(resolve('src/lib/precarga.js'), 'utf8');
      const secciones = [...fuente.matchAll(/"(\/[^"]+)":\s*\(\)\s*=>\s*import\("\.\.\/([^"]+)"\)/g)];
      const chunks = Object.values(bundle).filter((f) => f.type === 'chunk');
      const porFichero = new Map(chunks.map((c) => [c.fileName, c]));
      // Lo que ya trae la entrada no hace falta precargarlo
      const deEntrada = new Set();
      const recorrer = (nombre, vistos) => {
        if (vistos.has(nombre)) return;
        vistos.add(nombre);
        const c = porFichero.get(nombre);
        if (c) for (const i of c.imports) recorrer(i, vistos);
      };
      for (const c of chunks) if (c.isEntry) recorrer(c.fileName, deEntrada);
      const mapa = {};
      for (const [, ruta, rel] of secciones) {
        const id = resolve('src', rel);
        const pagina = chunks.find((c) => c.facadeModuleId === id);
        if (!pagina) continue;
        const js = new Set();
        recorrer(pagina.fileName, js);
        const urls = new Set();
        for (const f of js) {
          if (deEntrada.has(f)) continue;
          urls.add(f);
          for (const css of porFichero.get(f)?.viteMetadata?.importedCss || []) urls.add(css);
        }
        mapa[ruta] = [...urls];
      }
      this.emitFile({ type: 'asset', fileName: 'precarga.json', source: JSON.stringify(mapa) });
    },
  };
}
