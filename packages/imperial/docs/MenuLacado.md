---
category: Navegación
---
# MenuLacado

Menú lateral lacado con marca, iconos propios y elemento activo dorado. Úsalo como navegación principal de la aplicación para estudiantes chinos de DELE.

## Cuándo usarlo
- Para navegar entre las secciones principales: Aprender, Unidades, DELE, Juegos, Diccionario, Pronunciación, Repaso y Tutor IA.
- Cuando necesites resaltar la sección activa con una píldora dorada y mostrar nombres bilingües español-chino.
- Como barra lateral fija en pantallas de escritorio o tablet; en móvil se puede integrar en un drawer.
- No lo uses para acciones puntuales o avisos temporales; para eso usa `Boton` o `Sello`.

## Props clave
- `items`: array de elementos; cada uno requiere `id`, `icono` (uno de `NombreIcono`), `label` y opcionalmente `labelZh`.
- `activo`: `id` del elemento resaltado con píldora dorada.
- `onSelect`: callback con el `id` seleccionado.
- `pie`: nodo opcional al final del menú para rachas, nivel o tarjeta de progreso.
- `items[].icono` acepta solo los nombres definidos: `"ruta"`, `"unidades"`, `"dele"`, `"juegos"`, `"diccionario"`, `"pronunciacion"`, `"tutor"`, `"progreso"`, `"repaso"`.

## Ejemplo
```jsx
import { MenuLacado } from "@ai-espanol/imperial";

const items = [
  { id: "ruta", icono: "ruta", label: "Aprender", labelZh: "学习" },
  { id: "unidades", icono: "unidades", label: "Unidades", labelZh: "单元" },
  { id: "dele", icono: "dele", label: "DELE", labelZh: "考试" },
  { id: "progreso", icono: "progreso", label: "Mi DELE", labelZh: "我的DELE" },
  { id: "juegos", icono: "juegos", label: "Juegos", labelZh: "游戏" },
  { id: "diccionario", icono: "diccionario", label: "Diccionario", labelZh: "词典" },
  { id: "pronunciacion", icono: "pronunciacion", label: "Pronunciación", labelZh: "发音" },
  { id: "repaso", icono: "repaso", label: "Repaso", labelZh: "复习" },
  { id: "tutor", icono: "tutor", label: "Tutor IA", labelZh: "AI老师" },
];

<MenuLacado
  items={items}
  activo="unidades"
  onSelect={(id) => console.log("Ir a", id)}
  pie="Racha: 5 días"
/>
```

## Reglas
- Usa siempre iconos propios (`icono`) y nunca emojis en los `items` del menú.
- Mantén las etiquetas principales en español y añade `labelZh` con la traducción china.
- El `activo` debe coincidir exactamente con el `id` de un `item`; de lo contrario no se resalta.
- Si usas `pie`, que sea breve y no incluya emojis, para mantener el estilo imperial lacado.