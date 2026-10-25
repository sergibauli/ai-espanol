---
category: Acciones
---
# TecladoEspanol

Teclado de fichas de marfil con las letras especiales del español (á, é, í, ó, ú, ü, ñ, ¿, ¡); úsalo para insertar caracteres con tilde, diéresis, eñe y signos de apertura en ejercicios de escritura.

## Cuándo usarlo
- Cuando el estudiante necesita escribir letras especiales del español en dictados, huecos o juegos de formar palabras.
- Como complemento de un campo de texto o de fichas de letras para añadir tildes y eñes.
- Cuando quieras una fila compacta de fichas pulsables con el acabado imperial.
- NO lo uses como teclado alfabético completo: solo ofrece caracteres especiales.

## Props clave
- `mayusculas?: boolean` — si es `true`, muestra las letras especiales en mayúscula (`Á`, `É`, `Í`, `Ó`, `Ú`, `Ü`, `Ñ`, `¿`, `¡`). Por defecto es `false`.
- `onTecla?: (letra: string) => void` — devuelve la letra pulsada; úsalo para insertar el carácter en el texto controlado.
- `className?: string` — clases adicionales para ajustar espacio, ancho o alineación.

## Ejemplo
```jsx
import { useState } from "react";
import { Escena, Pergamino, CintaTitulo, TecladoEspanol } from "@ai-espanol/imperial";

export function PantallaDictado() {
  const [texto, setTexto] = useState("");

  return (
    <Escena>
      <Pergamino titulo="Dictado de acentos" tituloZh="重音听写">
        <CintaTitulo texto="Toca la letra especial" zh="点击特殊字母" />
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe aquí" />
        <TecladoEspanol onTecla={(letra) => setTexto((t) => t + letra)} />
      </Pergamino>
    </Escena>
  );
}
```

## Reglas
- Coloca siempre el teclado dentro de un `Pergamino` sobre `Escena variante="noche"`.
- Acompaña los títulos o etiquetas con su traducción china mediante `tituloZh` o `zh`, cuando la prop exista.
- No uses emojis ni iconos del menú en las teclas: solo deben verse las letras especiales del español.
- Mantén el texto en estado y usa `onTecla` para actualizarlo; no leas directamente las fichas.