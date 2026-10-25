---
category: Acciones
---
# Opcion

Opción de respuesta con letra circular, estados de corrección y tonos de concurso para ejercicios tipo test.

## Cuándo usarlo
- En preguntas de elección múltiple dentro de un `Pergamino` o una pantalla de juego.
- Para ejercicios de traducción español-chino con corrección inmediata.
- En modo concurso con tonos vivos (`rojo`, `azul`, `oro`, `jade`) para opciones tipo Kahoot.
- No usar para acciones principales de navegación o confirmación: para eso está `Boton`.

## Props clave
- `letra`: letra del círculo (`a`, `b`, `c`…).
- `children`: texto de la opción; puede ser bilingüe (`Gracias · 谢谢`).
- `estado`: `"normal" | "elegida" | "correcta" | "incorrecta" | "apagada"`; controla color, marca (✓/✗) y deshabilita automáticamente en `correcta`, `incorrecta` o `apagada`.
- `tono`: `"rojo" | "azul" | "oro" | "jade"` para modo concurso; si se omite, la opción usa estilo pergamino.
- `onClick`: callback al pulsar la opción cuando está habilitada.

## Ejemplo
```jsx
import { Opcion, Pergamino } from "@ai-espanol/imperial";

export function EjercicioTraduccion() {
  return (
    <Pergamino titulo="¿Cómo se dice «谢谢»?" tituloZh="“谢谢”怎么说？">
      <Opcion letra="a">Por favor · 请</Opcion>
      <Opcion letra="b" estado="correcta">Gracias · 谢谢</Opcion>
      <Opcion letra="c" estado="incorrecta">Adiós · 再见</Opcion>
      <Opcion letra="d" estado="apagada">Hola · 你好</Opcion>
    </Pergamino>
  );
}
```

## Reglas
- Coloca siempre las opciones dentro de un contenedor como `Pergamino` sobre una `Escena` `noche`; no las uses sueltas sin contexto visual.
- Usa `letra` para identificar la opción y `estado` para el feedback; evita emojis como viñetas en las opciones.
- Mantén coherencia bilingüe: si el enunciado está en español, incluye la traducción china en `tituloZh` o en el propio `children`.
- Reserva los tonos vivos de `tono` para juegos o concursos; en contextos formales DELE usa el estilo pergamino por defecto.