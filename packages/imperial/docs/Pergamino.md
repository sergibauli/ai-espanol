---
category: Fundamentos
---
# Pergamino

Contenedor principal de contenido con aspecto de pergamino y marco dorado; úsalo como lienzo de lectura, instrucciones y tarjetas sobre una Escena noche.

## Cuándo usarlo
- Para envolver el contenido principal de una pantalla: textos de lección, instrucciones, resúmenes o rejillas de tarjetas.
- Cuando necesitas jerarquía clara con título en español y su traducción china.
- Para elegir presentación: hoja clásica, rollo con rodillos o tablilla lacada.
- No lo uses como fondo global de la aplicación; para eso existe `Escena`.

## Props clave
- `variante`: `"papel" | "rollo" | "tablilla"` — hoja con marco dorado, rollo con rodillos de madera arriba y abajo, o tablilla con marco lacado rojo.
- `titulo`: `string` opcional — título en Cinzel rojo laca con barra lateral.
- `tituloZh`: `string` opcional — traducción china del título.
- `children`: contenido interno del pergamino.
- `className` y `style`: personalización del contenedor.

## Ejemplo
```jsx
import { Escena, Pergamino } from "@ai-espanol/imperial";

export const PantallaLectura = () => (
  <Escena variante="noche" style={{ padding: 24 }}>
    <Pergamino titulo="Las palabras mágicas" tituloZh="礼貌用语">
      <p style={{ margin: 0, lineHeight: 1.6 }}>
        En España se usan mucho «por favor» y «gracias» en tiendas, bares y en casa.
      </p>
    </Pergamino>
  </Escena>
);
```

## Reglas
- Colócalo siempre sobre una `Escena` con `variante="noche"` para conservar el contraste laca y oro.
- Usa `titulo` y `tituloZh` en pantallas principales para mantener los textos bilingües.
- Elige `variante="rollo"` para textos ceremoniales o invitaciones, y `variante="tablilla"` para guías rápidas con aire más lacado.
- No anides un `Pergamino` dentro de otro; cada pantalla debe tener un único contenedor principal.