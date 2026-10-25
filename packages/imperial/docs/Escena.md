---
category: Fundamentos
---
# Escena

Fondo de escena imperial: define el lienzo nocturno, papel o lacado de una pantalla.

## Cuándo usarlo
- Como contenedor raíz de cada pantalla, especialmente con `variante="noche"`.
- Para sostener un `Pergamino` con el contenido principal y una `CintaTitulo` de encabezado.
- Para crear zonas visuales alternas con fondo `papel` o `laca`.
- No uses `Escena` como contenedor de lectura: el contenido denso debe ir dentro de un `Pergamino` sobre la escena.

## Props clave
- `variante`: `"noche"` por defecto, azul con destellos dorados; `"papel"` para fondo pergamino; `"laca"` para fondo rojo lacado.
- `children`: contenido que se pinta sobre el fondo, normalmente `CintaTitulo`, `Pergamino` u otros componentes.
- `className`: clases adicionales para composición.
- `style`: estilos en línea; útil para altura mínima o centrado de pantalla.

## Ejemplo
```jsx
import { Escena, CintaTitulo, Pergamino } from "@ai-espanol/imperial";

export const PantallaExamen = () => (
  <Escena variante="noche" style={{ minHeight: "100vh" }}>
    <Pergamino titulo="Preparación B2" tituloZh="B2备考" style={{ margin: 24 }}>
      <CintaTitulo texto="Exámenes DELE" zh="DELE考试" />
      <p>Repasa las pruebas oficiales y mide tu progreso.</p>
    </Pergamino>
  </Escena>
);
```

## Reglas
- La escena `noche` es el lienzo base de la app; el contenido legible va sobre un `Pergamino`.
- No uses las variantes `papel` o `laca` como sustituto del `Pergamino`: solo cambian el fondo, no añaden marco ni título.
- Mantén el espaciado de pantalla en `Pergamino` o en el contenido, no sobrecargues la `Escena` con padding excesivo.
- Los textos bilingües deben incluir traducción china cuando la prop `zh` esté disponible.