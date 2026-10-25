// Compila el paquete a dist/ (ESM + CSS con las imágenes incrustadas) y copia los tipos
import { build } from "esbuild";
import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });
await build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  jsx: "automatic",
  external: ["react", "react-dom", "react/jsx-runtime"],
  loader: { ".png": "dataurl", ".jpg": "dataurl", ".jsx": "jsx" },
  logLevel: "warning",
});
copyFileSync("index.d.ts", "dist/index.d.ts");
console.log("dist listo");
