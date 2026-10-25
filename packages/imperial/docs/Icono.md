---
category: Fundamentos
---
# Icono

Icono propio del sistema imperial en dibujo lacado para medallones dorados; úsalo para identificar secciones y acciones de navegación sin recurrir a emojis.

## Cuándo usarlo
- Para los iconos del menú: `ruta`, `unidades`, `dele`, `juegos`, `diccionario`, `pronunciacion`, `tutor`, `progreso` y `repaso`.
- Dentro de `MenuLacado`, pasando el nombre del icono en cada elemento.
- Para medallones circulares dorados en cabeceras, accesos o navegación.
- No lo uses como imagen de contenido didáctico; en `TarjetaUnidad` y `TarjetaJuego` se permite emoji o URL.

## Props clave
- `nombre`: obligatorio; una de las nueve opciones: `"ruta"`, `"unidades"`, `"dele"`, `"juegos"`, `"diccionario"`, `"pronunciacion"`, `"tutor"`, `"progreso"`, `"repaso"`.
- `tamano?: number`; ancho y alto en px, por defecto `36`.
- `className?: string`; clase extra para el SVG/contenedor.

## Ejemplo
```jsx
import { Icono, MenuLacado } from "@ai-espanol/imperial";

const items = [
  { id: "ruta", icono: "ruta", label: "Ruta", labelZh: "路线" },
  { id: "unidades", icono: "unidades", label: "Unidades", labelZh: "单元" },
  { id: "dele", icono: "dele", label: "DELE", labelZh: "考试" },
];

export const Navegacion = () => (
  <>
    <span className="medallon"><Icono nombre="ruta" tamano={48} /></span>
    <MenuLacado items={items} activo="unidades" />
  </>
);
```

## Reglas
- Usa `Icono` en menús y medallones lacados; nunca uses emojis en `MenuLacado`.
- No inventes valores de `nombre`: solo los definidos por `NombreIcono`.
- En navegación, acompaña cada icono con texto bilingüe `label`/`labelZh`.
- Mantén el tamaño de medallones de menú entre `36` y `48` px.