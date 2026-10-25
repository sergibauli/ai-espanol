---
category: Fundamentos
---
# Logo

Logo de AI Español: un sello chino (印章) lacado con marco de oro, una «Ñ» tallada cuya tilde es una nube de la suerte (祥云) y una moneda de oro con «AI»; al lado, el nombre en Cinzel.

## Cuándo usarlo
- En la cabecera de la portada, en el menú lateral (`MenuLacado`) y en la barra superior móvil.
- `tono="oscuro"` sobre laca roja o noche (texto oro); `tono="claro"` sobre papel (texto laca).
- No lo uses dentro de tarjetas ni repetido en la misma pantalla.

## Props clave
- `variante`: `"completo"` (sello + nombre) o `"sello"` (solo el sello).
- `tono`: `"oscuro"` | `"claro"`.
- `tamano`: lado del sello en px; el texto escala con él (48 por defecto).
- `subtitulo`: muestra «西班牙语 · DELE».

## Ejemplo
```jsx
import { Logo } from "@ai-espanol/imperial";

<header style={{ display: "flex", justifyContent: "space-between", padding: 16, background: "var(--im-papel-50)" }}>
  <Logo tono="claro" tamano={44} />
</header>
```

## Reglas
- No cambies los colores del sello ni lo pongas sobre fondos claros sin `tono="claro"`.
- Deja aire alrededor: al menos la mitad del tamaño del sello.
