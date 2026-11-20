# Vídeo promocional de Douyin · Wukong Español · 悟空西语

Salida: `salida/wukong-espanol-douyin.mp4`, versión de unos 56 s en vertical 1080×1920 a 30 fps, H.264 + AAC 48 kHz y −14 LUFS. Hay también una versión corta para anuncio: `salida/wukong-espanol-douyin-15s.mp4`, de 16,5 s.

## Guion (130 BPM, cortes a compás)
| s | Sección | En pantalla |
|---|---|---|
| 0–3,7 | Gancho | Grietas doradas en negro y un golpe: el cristal estalla y sale el Rey Mono con un dragón. «想去西班牙？» · «留学 · 工作 · 旅行» · «零基础也能学会！» · ¡Hola!, Gracias, ¿Qué tal?, ¡Vamos! |
| 3,7–7,4 | Problema | Fondo de tinta y montañas. «单词背了就忘？» «语法越学越乱？» «想开口却不敢说？» → «别慌！让悟空带你学» (el Rey Mono guiña) |
| 7,4–11,1 | Revelación (drop) | Fogonazo y el vídeo real de la puerta. El móvil 3D llega girando con la portada «Cruza la puerta». «悟空西语 · WUKONG ESPAÑOL · 专为中国学生打造的西语神器» |
| 11,1–14,8 | Aprender | La ruta A1→B2 cambia de mundo en cada golpe: 竹林 / 灯笼 / 水墨 / 紫禁城 |
| 14,8–18,5 | Lecciones | Ejercicio real con el sello 正确 → ¡Lección perfecta! con confeti |
| 18,5–22,2 | Unidades | Tres móviles en abanico: teoría, vocabulario y diálogo. «90 个单元», «¿Y de segundo?» / «El pollo asado, por favor.» |
| 22,2–24 | Herramientas | Pronunciación, diccionario (agua · 水) y repaso |
| 24–27,7 | Práctica | Los cuatro mundos de examen, la corrección automática (对) y una hoja PDF que sale volando del móvil. «88 套模拟题» |
| 27,7–29,5 | Tutor | Conversación con el Rey Mono, con lupa sobre la corrección «Yo soy cansado» → «Hoy estoy cansado» |
| 29,5–31,4 | TV | El móvil gira a horizontal y reproduce la serie del Rey Mono |
| 31,4–35,1 | Juegos | Carrusel 3D de seis juegos reales. «17 款小游戏» |
| 35,1–38,8 | Turbo Rush | Fotogramas reales de la carrera con cortes a corchea y líneas de velocidad. «3D 极速赛车 · 冲对单词门，立刻加速！» |
| 38,8–40,6 | Progreso | La probabilidad de aprobar, con lupa |
| 40,6–42,5 | Idiomas | Respiro con el erhu: siete idiomas de ayuda en órbita |
| 42,5–46,2 | Cifras | Placas imperiales de laca con sello dorado que giran en 3D: 90 个单元 · 88 套模拟题 · 17 款小游戏 · 7 种讲解语言 · «从 A1 到 B2，一路陪你进阶» |
| 46,2–56,2 | Cierre | Panel de cine con el vuelo y el dragón dorado. Después el sello 悟, el logo, el precio ¥39 (一次付费 · 永久使用), el QR de la web, el QR de WeChat, la URL y «今天就开口说西语！» |

## Cómo se hace
- `audio/musica.mjs`: banda sonora compuesta y sintetizada aquí, libre de derechos. Lleva guzheng (Karplus-Strong), erhu, taikos, gong, 808 y beat 4×4 en la escala pentatónica yu. Se genera con `node audio/musica.mjs`; para la versión corta, `VERSION=corta node audio/musica.mjs`.
- `tiempo.mjs`: el BPM y las secciones, compartidos entre la música y la imagen.
- `film/`: página que pinta cada fotograma.
  - `motor.js`: Three.js. Móvil 3D con biseles dorados, pantalla con reflejo y lupa, fondo procedural, partículas, sprites y cristales.
  - `capa.js`: textos, rótulos con línea guía, lupas, tinta y barrido de luz.
  - `guion.js`: las escenas.
  - `material.js`: las capturas usadas y las cifras reales.
- `capturas/`: capturas reales de la app (no se versionan; los scripts están en `herramientas/`).

Para regenerar:
1. `sh herramientas/preparar-recursos.sh`
2. `node herramientas/servidor.cjs 8765 &`
3. `node herramientas/render.cjs 0 1685 fotogramas` (se puede repartir el rango entre varios procesos)
4. `sh herramientas/montar.sh`

Para la versión corta: `VERSION=corta node herramientas/render.cjs 0 495 fotogramas-15s` y después `sh herramientas/montar.sh fotogramas-15s audio/musica-15s.wav salida/wukong-espanol-douyin-15s.mp4`.

Revisiones hechas: director, especialistas por sección, revisor nativo de chino y revisor de calidad visual. Se ha comprobado que en pantalla no aparecen «DELE», «IA» ni «AI».
