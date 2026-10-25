---
category: Tarjetas
---
# TarjetaExamen

Tarjeta oscura de examen DELE por nivel, con insignia, datos informativos, progreso opcional y acción principal.

## Cuándo usarlo
- Para listar exámenes DELE por nivel (A1–C2) en pantallas de práctica o simulacros.
- Cuando necesitas una ficha compacta con datos como número de pruebas y duración.
- Para mostrar avance con barra de progreso y botón de “Empezar” o “Seguir”.
- No la uses para unidades didácticas ni juegos: usa `TarjetaUnidad` o `TarjetaJuego`.

## Props clave
- `nivel?: Nivel` — Nivel MCER/DELE; se pinta con `InsigniaNivel`. Por defecto `"A1"`.
- `titulo: string` y `tituloZh?: string` — Título en español y traducción china, p. ej. `"DELE B1"` / `"中级"`.
- `datos?: string[]` — Chapas informativas cortas, p. ej. `["4 pruebas", "3 h 40 min"]`.
- `progreso?: number` — Avance de 0 a 1; si se omite, no se muestra barra.
- `accion?: string` — Texto del botón dorado; por defecto `"Empezar"`.
- `onAccion?: () => void` — Manejador del botón principal.

## Ejemplo
```jsx
import { Escena, TarjetaExamen } from "@ai-espanol/imperial";

export const PracticaDele = () => (
  <Escena variante="papel" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    <TarjetaExamen
      nivel="B1"
      titulo="DELE B1"
      tituloZh="中级"
      datos={["4 pruebas", "3 h 40 min"]}
      progreso={0.4}
      accion="Seguir"
      onAccion={() => console.log("Continuar DELE B1")}
    />
    <TarjetaExamen
      nivel="B2"
      titulo="DELE B2"
      tituloZh="中高级"
      datos={["4 pruebas", "4 h"]}
      accion="Empezar"
    />
  </Escena>
);
```

## Reglas
- Coloca las tarjetas en rejilla dentro de un `Escena` o sobre fondo `papel`; no las apiles dentro de `MenuLacado`.
- Usa siempre `titulo` en español y `tituloZh` con la traducción china.
- Si el estudiante ya empezó el examen, usa `progreso` y `accion="Seguir"`; si no, omite `progreso` y deja `accion="Empezar"`.
- No uses emojis para el nivel; `InsigniaNivel` ya proporciona el color DELE.