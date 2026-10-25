---
category: Tarjetas
---
# TarjetaJuego

Tarjeta de juego con medallón nocturno, título bilingüe y candado opcional; se usa en rejillas dentro de un `Pergamino`.

## Cuándo usarlo
- Para presentar accesos a juegos o actividades lúdicas en una cuadrícula.
- Cuando necesitas una tarjeta compacta con título, descripción e icono atractivo.
- Para marcar juegos aún no disponibles con candado “Pronto”.
- No la uses para unidades didácticas ni exámenes: usa `TarjetaUnidad` o `TarjetaExamen`.

## Props clave
- `titulo`: nombre del juego en español.
- `tituloZh`: traducción china que aparece como subtítulo bilingüe.
- `icono`: emoji, URL de imagen o nodo React dentro del medallón nocturno.
- `descripcion`: línea breve de apoyo, normalmente en español.
- `etiqueta`: texto corto de categoría, p. ej. “Vocabulario”; se oculta si está bloqueada.
- `bloqueado`: si es `true`, desactiva el clic y muestra “🔒 Pronto”.

## Ejemplo
```jsx
import { Escena, Pergamino, TarjetaJuego } from '@ai-espanol/imperial';

export const Juegos = () => (
  <Escena>
    <Pergamino titulo="Aprende jugando" tituloZh="边玩边学">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        <TarjetaJuego
          icono="🏮"
          titulo="Kahoot Quiz"
          tituloZh="抢答"
          descripcion="Responde antes que el reloj."
          etiqueta="Vocabulario"
        />
        <TarjetaJuego
          icono="🀄"
          titulo="Memory"
          tituloZh="记忆配对"
          descripcion="Empareja palabra y traducción."
          etiqueta="Memoria"
        />
        <TarjetaJuego
          icono="🐉"
          titulo="Serpiente de letras"
          tituloZh="贪吃蛇"
          descripcion="Come las letras en orden."
          bloqueado
        />
      </div>
    </Pergamino>
  </Escena>
);
```

## Reglas
- Coloca siempre las tarjetas dentro de un `Pergamino` y sobre una `Escena` `noche`.
- Mantén textos bilingües: español en `titulo` y chino en `tituloZh`.
- Usa emojis o URLs para `icono`; reserva `Icono` para el menú lateral.
- No uses `TarjetaJuego` para unidades, exámenes ni opciones de respuesta.