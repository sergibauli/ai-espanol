---
category: Tarjetas
---
# TarjetaUnidad

Tarjeta de unidad didáctica con disco de jade, progreso y estado; úsala para mostrar y navegar por las lecciones de un nivel dentro de una rejilla de pergamino.

## Cuándo usarlo
- Para listar unidades de un nivel con título en español y traducción china.
- Para mostrar el avance con barra fina en unidades `en-curso` o `completada`.
- Para marcar lecciones bloqueadas sin distraer con progreso ni interacción.
- No usar como tarjeta de juego o de examen; para eso existen `TarjetaJuego` y `TarjetaExamen`.

## Props clave
- `titulo` / `tituloZh`: textos bilingües de la unidad; `titulo` es obligatorio y `tituloZh` muestra la traducción china.
- `numero`: número opcional que se muestra como `Unidad {numero}`.
- `icono`: emoji o URL de imagen que entra en el disco de jade; por defecto es `📜`.
- `progreso`: número entre 0 y 1; se dibuja como barra fina, excepto en estado `bloqueada`.
- `estado`: `"nuevo" | "en-curso" | "completada" | "bloqueada"`; controla sello, barra de progreso y bloqueo.
- `onClick`: acción para abrir la unidad; se ignora automáticamente en `bloqueada`.

## Ejemplo
```jsx
import { Pergamino, TarjetaUnidad } from "@ai-espanol/imperial";

export const UnidadesA1 = () => (
  <Pergamino titulo="A1 · Principiante" tituloZh="初级">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 170px)", gap: 16 }}>
      <TarjetaUnidad numero={1} titulo="Hola y adiós" tituloZh="你好和再见" icono="👋" estado="completada" progreso={1} />
      <TarjetaUnidad numero={2} titulo="Por favor y gracias" tituloZh="请和谢谢" icono="🙏" estado="en-curso" progreso={0.55} />
      <TarjetaUnidad numero={3} titulo="Me llamo…" tituloZh="我叫…" icono="📛" estado="nuevo" />
      <TarjetaUnidad numero={4} titulo="¿De dónde eres?" tituloZh="你从哪里来？" icono="🌏" estado="bloqueada" />
    </div>
  </Pergamino>
);
```

## Reglas
- Coloca siempre `TarjetaUnidad` dentro de un `Pergamino` sobre una `Escena` de fondo noche; no la uses suelta sobre fondos lacados o de papel.
- Los textos principales deben ir en español y chino usando `titulo` y `tituloZh`; el número sigue el patrón `Unidad {numero}`.
- Para el icono usa emoji o una URL de imagen; no uses SVG complejo ni texto largo dentro del disco de jade.
- En `estado="bloqueada"` no pases `onClick` ni `progreso`: la tarjeta se muestra sin barra, sin icono y desactivada.