---
category: Navegación
---
# HeroSeccion

Cabecera lacada de sección con doble marco dorado, dragón y Rey Mono opcional; abre cada página principal.

## Cuándo usarlo
- Como cabecera de página o sección principal: unidades, juegos, exámenes DELE, progreso.
- Para presentar un título bilingüe con contexto breve y 1-2 acciones principales.
- Cuando conviene dar calidez visual con la mascota Rey Mono a la derecha.
- No usar en pantallas internas de contenido denso: ocupa mucho alto y compite con el Pergamino de trabajo.

## Props clave
- `titulo` (obligatoria): texto grande del héroe en español.
- `tituloZh` / `descripcionZh`: traducción china de título y descripción.
- `ceja`: línea superior dorada de contexto corto, p. ej. `"Unidades · 单元"`.
- `descripcion`: párrafo breve bajo el título; incluye traducción con `descripcionZh`.
- `mascota`: pose del Rey Mono a la derecha (`"saluda"`, `"guino"`, `"serio"`, `"poder"`, `"feliz"`, `"trofeo"`); se oculta en móvil.
- `acciones`: nodo React con botones bajo el texto, normalmente `Boton`.

## Ejemplo
```jsx
import { HeroSeccion, Boton } from "@ai-espanol/imperial";

export function CabeceraUnidades() {
  return (
    <HeroSeccion
      ceja="Unidades · 单元"
      titulo="Tu camino del A1 al B2"
      tituloZh="从A1到B2的学习之路"
      descripcion="80 unidades con diálogos, vocabulario, gramática y juegos."
      descripcionZh="80个单元：对话、词汇、语法和游戏。"
      mascota="saluda"
      acciones={
        <>
          <Boton variante="oro">Continuar unidad 2</Boton>
          <Boton variante="fantasma">Ver todas</Boton>
        </>
      }
    />
  );
}
```

## Reglas
- Úsalo al inicio de la página, no dentro de un Pergamino de trabajo.
- Aporta siempre los textos bilingües: `tituloZh`, `descripcionZh` y una `ceja` con su equivalente chino.
- La acción principal debe ser `Boton` `oro` o `laca`; la secundaria `fantasma` o `papel`.
- No uses emojis en `acciones`/`ceja`; para iconografía de navegación usa `Icono`.