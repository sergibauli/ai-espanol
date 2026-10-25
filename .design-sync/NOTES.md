# design-sync · notas de AI Español (Imperial)

- El sistema de diseño vive en `packages/imperial/` (componentes en `src/components.jsx`, estilos `src/tokens.css` + `src/imperial.css`, tipos escritos a mano en `index.d.ts`, docs por componente en `docs/<Nombre>.md` con `category` en el frontmatter). La app lo importa desde el código fuente; el conversor usa `dist/`.
- Antes de sincronizar: `cd packages/imperial && node build.mjs` (esbuild; imágenes incrustadas como data URL). `dist/` está en .gitignore.
- `@types/react` no es dependencia de la app: instálalo sin guardar (`npm i --no-save @types/react@19`) antes del conversor, o `[DTS_REACT]` vacía las props.
- Chromium: no hay caché de Playwright; se usa Chrome del sistema con `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` para validate y capture.
- Cinzel solo tiene mayúsculas: las letras sueltas (`FichaLetra`, `TecladoEspanol`) usan `--im-font-letra` (Georgia). No vuelvas a ponerles Cinzel o minúsculas y mayúsculas se verán iguales.
- Las tipografías se cargan con un `@import` remoto de Google Fonts (`[FONT_REMOTE]`, aceptado). En China Google Fonts puede fallar; entonces cae a Times/Georgia y PingFang.
- `guidelinesGlob` apunta a `guidelines/**` (no existe) para que las docs de componentes no se dupliquen como guías.
- El grupo «Navegación» sale como carpeta `navegaci-n` (el conversor quita la tilde del slug); es normal.

## Known render warns
- Ninguno pendiente.

## Re-sync risks
- `index.d.ts` es manual: si cambias props en `components.jsx` y no lo actualizas, el agente de diseño recibirá un contrato desfasado.
- Los docs de `packages/imperial/docs/` los redactó DeepSeek y se revisaron (sin props inventadas); revísalos si cambia la API.
- Las imágenes del paquete son copias reducidas de `public/mono` y `public/theme`; si cambias esas ilustraciones en la app, cópialas también a `packages/imperial/src/assets/`.
