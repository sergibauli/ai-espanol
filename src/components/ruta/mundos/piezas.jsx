import * as React from "react";

// Piezas SVG compartidas por los mundos de la ruta (no cambies firmas: las usan los cuatro niveles)
export const VB = "0 0 800 1000";
export const Capa = ({ clase, children }) => (
  <div className={`mr-capa ${clase}`}>
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {children}
    </svg>
  </div>
);
// ---------- Piezas reutilizables ----------
// Tejado chino de aleros curvos: centro x, línea del alero y, ancho w, alto h
export const tejado = (x, y, w, h) =>
  `M${x - w / 2} ${y - h * 0.32} Q${x - w * 0.36} ${y + 2} ${x - w * 0.28} ${y} L${x + w * 0.28} ${y} Q${x + w * 0.36} ${y + 2} ${x + w / 2} ${y - h * 0.32} Q${x + w * 0.33} ${y - h * 0.45} ${x + w * 0.27} ${y - h} L${x - w * 0.27} ${y - h} Q${x - w * 0.33} ${y - h * 0.45} ${x - w / 2} ${y - h * 0.32}Z`;
// Pino nevado: base (x, y), escala s
export function PinoNevado({ x, y, s = 1, color = "#24402f" }) {
  const capas = [0, 1, 2].map((k) => {
    const ancho = (34 - k * 8) * s;
    const base = y - k * 20 * s;
    const alto = 30 * s;
    return { ancho, base, alto };
  });
  return (
    <g>
      <rect x={x - 2.5 * s} y={y - 6 * s} width={5 * s} height={12 * s} fill="#4a3324" />
      {capas.map(({ ancho, base, alto }, k) => (
        <g key={k}>
          <path d={`M${x - ancho} ${base} L${x} ${base - alto - 10 * s} L${x + ancho} ${base}Z`} fill={color} />
          <path d={`M${x - ancho * 0.55} ${base - alto * 0.5} L${x} ${base - alto - 10 * s} L${x + ancho * 0.6} ${base - alto * 0.45} Q${x + ancho * 0.2} ${base - alto * 0.62} ${x} ${base - alto * 0.5} Q${x - ancho * 0.25} ${base - alto * 0.6} ${x - ancho * 0.55} ${base - alto * 0.5}Z`} fill="#fbfdff" />
        </g>
      ))}
    </g>
  );
}
// Camello bactriano (dos jorobas) mirando a la derecha; pies en (0,0)
export const CAMELLO = "M0 -20 C1 -28 7 -32 13 -30 C16 -40 24 -40 27 -31 C30 -38 37 -38 39 -29 L43 -28 C45 -36 47 -42 52 -42 C56 -42 58 -39 56 -36 L53 -36 C51 -30 50 -24 46 -19 L44 -17 L44 0 L41 0 L40 -14 L35 -14 L34 0 L31 0 L31 -16 L15 -16 L14 0 L11 0 L10 -15 L6 -16 L5 0 L2 0 L2 -16Z";
// Palmera: base (x,y), altura h, inclinación
export function Palmera({ x, y, h = 90, inc = 10, color = "#2f5d34" }) {
  const tx = x + inc;
  const ty = y - h;
  return (
    <g>
      <path d={`M${x - 3} ${y} Q${x + inc * 0.2} ${y - h * 0.5} ${tx - 2} ${ty} L${tx + 2} ${ty} Q${x + inc * 0.3 + 4} ${y - h * 0.5} ${x + 3} ${y}Z`} fill="#6b4423" />
      {[-150, -110, -60, -20, 20, 60].map((a, i) => {
        const r = (a * Math.PI) / 180;
        const ex = tx + Math.cos(r) * 38;
        const ey = ty + Math.sin(r) * 22 + 14;
        return <path key={i} d={`M${tx} ${ty} Q${(tx + ex) / 2} ${ty - 16} ${ex} ${ey} Q${(tx + ex) / 2} ${ty - 6} ${tx} ${ty}Z`} fill={color} />;
      })}
    </g>
  );
}
// Pico kárstico (cono redondeado) con base (x, y), ancho w y alto h
export const karst = (x, y, w, h) => `M${x - w / 2} ${y} C${x - w * 0.42} ${y - h * 0.55} ${x - w * 0.3} ${y - h} ${x} ${y - h} C${x + w * 0.3} ${y - h} ${x + w * 0.42} ${y - h * 0.55} ${x + w / 2} ${y}Z`;
// Banderas de oración entre dos puntos
export function Banderas({ x1, y1, x2, y2, n = 9, tam = 9 }) {
  const colores = ["#2f6fd1", "#f4f1e8", "#d23a2f", "#2f9a55", "#f2c14e"];
  const curva = (t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + Math.sin(Math.PI * t) * 18];
  return (
    <g>
      <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + 36} ${x2} ${y2}`} fill="none" stroke="#5a4636" strokeWidth="1.2" />
      {Array.from({ length: n }, (_, i) => {
        const [bx, by] = curva((i + 0.5) / n);
        return <rect key={i} x={bx - tam / 2} y={by} width={tam} height={tam * 1.2} fill={colores[i % 5]} stroke="rgba(0,0,0,.15)" strokeWidth=".5" />;
      })}
    </g>
  );
}
export const n = (k) => Array.from({ length: k }, (_, i) => i);
export const Vin = ({ children, anima }) => (
  <svg viewBox="0 0 200 240" aria-hidden="true" className={anima ? `mr-anima-${anima}` : undefined}>
    {children}
  </svg>
);
