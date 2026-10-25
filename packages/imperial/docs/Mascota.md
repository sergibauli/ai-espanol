---
category: Personajes
---
# Mascota

Mascota Rey Mono en poses con bocadillo opcional; úsala para dar ánimo, guiar y celebrar logros sin distraer del contenido.

## Cuándo usarlo
- Al completar ejercicios, rachas o hitos de estudio para reforzar positivamente.
- Como guía visual en pantallas de inicio, diálogos o paneles de corrección.
- Para dar avisos breves o sugerencias en tono amable.
- No la uses como icono de navegación ni dentro del menú; para eso existe `Icono`/`MenuLacado`.

## Props clave
- `pose`: `"saluda" | "guino" | "serio" | "poder" | "feliz" | "trofeo"` para elegir la ilustración del Rey Mono.
- `tamano`: número en px; por defecto `120`, controla el ancho.
- `flota`: booleano opcional; activa una animación suave de flotar.
- `mensaje`: string opcional; muestra un bocadillo junto a la mascota.
- `className`: string opcional para estilos o layout adicional.

## Ejemplo
```jsx
import { Escena, Mascota } from "@ai-espanol/imperial";

export const RefuerzoRacha = () => (
  <Escena variante="noche" style={{ display: "flex", alignItems: "center", gap: 16, minHeight: 200 }}>
    <Mascota
      pose="feliz"
      tamano={130}
      flota
      mensaje="¡Muy bien! Llevas 5 días seguidos preparando el DELE."
    />
  </Escena>
);

export const AvisoError = () => (
  <Escena variante="noche">
    <Mascota
      pose="serio"
      tamano={100}
      mensaje="Revisa la concordancia: personas felices."
    />
  </Escena>
);
```

## Reglas
- Usa la mascota sobre `Escena` noche o junto a `Pergamino`; no la integres en el `MenuLacado`.
- Mantén el mensaje breve y de apoyo en español; la prop `mensaje` no tiene traducción china automática.
- No la conviertas en botón ni la uses para estados funcionales; reserva la interacción para `Boton`, `Opcion` o tarjetas.
- Ajusta `tamano` entre 80 y 160 px en la mayoría de pantallas para no competir con el contenido.