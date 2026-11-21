# Fuentes de la app

Ficheros woff2 **variables** (todos los pesos en uno), subconjunto latino (incluye ñ, á, é, í, ó, ú, ü, ¿, ¡).
Se declaran con `@font-face` en `index.html` y se precargan `plus-jakarta-sans` y `cinzel`.
Se sirven desde la propia web porque Google Fonts no carga en China.

Origen: paquetes `@fontsource-variable/<familia>` 5.3.x (fichero `files/<familia>-latin-wght-normal.woff2`).
Licencia: SIL Open Font License 1.1 (`LICENSE-OFL.txt`).

Para actualizar: `npm pack @fontsource-variable/<familia>`, copiar ese fichero aquí con el nombre `<familia>.woff2`.
