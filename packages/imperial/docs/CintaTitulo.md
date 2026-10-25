---
category: Fundamentos
---
# CintaTitulo

Cinta decorativa dorada o lacada para encabezar pantallas y juegos con un título bilingüe español-chino.

## Cuándo usarlo
- Para titular pantallas de juego o actividades breves, como “Aprende jugando”.
- Para destacar una invitación o prueba oficial sobre Pergamino.
- Cuando necesitas una cabecera compacta con traducción china.
- No la uses como título de una tarjeta o lista; ahí usa el título del propio `Pergamino`.

## Props clave
- `texto` (string, obligatoria): título principal en español.
- `zh` (string, opcional): traducción del título al chino.
- `tono` (`"oro"` | `"laca"`, opcional): `"oro"` por defecto; `"laca"` para texto dorado sobre cinta roja.
- `className` (string, opcional): clases adicionales para ajustar posición o márgenes.

## Ejemplo
```jsx
import { CintaTitulo, Escena } from "@ai-espanol/imperial";

export const CabeceraJuego = () => (
  <Escena variante="noche" style={{ display: "grid", placeItems: "center" }}>
    <CintaTitulo texto="Aprende jugando" zh="边玩边学" />
  </Escena>
);

export const CabeceraExamen = () => (
  <Escena variante="papel" style={{ display: "grid", placeItems: "center" }}>
    <CintaTitulo texto="Prueba oficial" zh="官方试卷" tono="laca" />
  </Escena>
);
```

## Reglas
- El contenido va siempre centrado sobre una `Escena`; usa `tono="oro"` sobre noche y `tono="laca"` sobre papel.
- Incluye la traducción china con `zh` para mantener la experiencia bilingüe.
- No uses emojis dentro del texto de la cinta.
- No combines `CintaTitulo` con `Pergamino` que ya tenga `titulo`; evita duplicar jerarquías.