/**
 * Wukong Turbo Rush · texturas de canvas de la Ciudad del Dragón: nubes chinas (xiangyun) para
 * grabar en luz sobre la carretera de jade, escamas lacadas de las barandillas y nubes blancas
 * volumétricas. Todo procedural (sin ficheros), en tamaños pequeños para móvil.
 */
import * as THREE from 'three';
import { rnd, texturaCanvas } from './util';

/** Espiral de nube que se enrolla hacia dentro. */
function espiral(c: CanvasRenderingContext2D, cx: number, cy: number, R: number, sg: number, vueltas: number, a0: number): void {
  c.beginPath();
  const N = 72;
  for (let i = 0; i <= N; i++) {
    const k = i / N;
    const th = a0 + k * vueltas * Math.PI * 2 * sg;
    const rr = R * (1 - k * 0.82);
    const x = cx + Math.cos(th) * rr;
    const y = cy + Math.sin(th) * rr;
    if (i === 0) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.stroke();
}

/** Motivo «xiangyun»: tres rizos encadenados y una cola larga que fluye. */
function nubeChina(c: CanvasRenderingContext2D, x: number, y: number, s: number, sg: number): void {
  espiral(c, x, y, s, sg, 1.35, Math.PI * 0.5);
  espiral(c, x + sg * s * 1.45, y - s * 0.35, s * 0.66, -sg, 1.2, Math.PI * 0.6);
  espiral(c, x - sg * s * 1.2, y + s * 0.15, s * 0.5, sg, 1.15, Math.PI * 0.4);
  c.beginPath();
  c.moveTo(x - sg * s * 1.75, y + s * 0.6);
  c.bezierCurveTo(x - sg * s * 0.7, y + s * 1.35, x + sg * s * 0.9, y + s * 1.2, x + sg * s * 2.0, y + s * 0.45);
  c.bezierCurveTo(x + sg * s * 2.9, y - s * 0.05, x + sg * s * 3.6, y + s * 1.0, x + sg * s * 4.8, y + s * 0.55);
  c.bezierCurveTo(x + sg * s * 5.6, y + s * 0.25, x + sg * s * 6.2, y + s * 0.6, x + sg * s * 6.6, y + s * 0.4);
  c.stroke();
  // contorno exterior del grupo de rizos (doble línea, como en los grabados)
  c.beginPath();
  c.arc(x, y, s * 1.18, Math.PI * (sg > 0 ? 0.85 : 0.15), Math.PI * (sg > 0 ? 2.05 : -1.05), sg < 0);
  c.stroke();
}

/**
 * Nubes chinas blancas sobre negro (canal R = intensidad), con halo suave alrededor del trazo.
 * Repetible en ambos ejes: u = a lo ancho de la pista, v = a lo largo.
 */
export function texturaXiangyun(): THREE.CanvasTexture {
  const T = 512;
  const tex = texturaCanvas(T, T, (c) => {
    c.fillStyle = '#000';
    c.fillRect(0, 0, T, T);
    c.lineCap = 'round';
    c.lineJoin = 'round';
    const r = rnd(1717);
    const motivos: [number, number, number, number][] = [];
    for (let i = 0; i < 7; i++) motivos.push([r() * T, (i / 7) * T + r() * 30, 22 + r() * 16, r() < 0.5 ? -1 : 1]);
    const lineas = (): void => {
      // líneas largas y sinuosas a lo largo de la pista (periodo divisor de T para que repita)
      for (const [x0, a, f] of [
        [70, 26, 2],
        [300, 34, 1],
        [430, 18, 3],
      ] as const) {
        c.beginPath();
        for (let v = 0; v <= T; v += 4) {
          const x = x0 + a * Math.sin((v / T) * Math.PI * 2 * f) + 10 * Math.sin((v / T) * Math.PI * 2 * (f + 2));
          if (v === 0) c.moveTo(x, v);
          else c.lineTo(x, v);
        }
        c.stroke();
      }
    };
    const todo = (): void => {
      for (const [x, y, s, sg] of motivos) {
        for (const dx of [-T, 0, T]) for (const dy of [-T, 0, T]) nubeChina(c, x + dx, y + dy, s, sg);
      }
      lineas();
    };
    // halo
    c.strokeStyle = 'rgba(255,255,255,0.22)';
    c.lineWidth = 15;
    c.shadowColor = '#fff';
    c.shadowBlur = 14;
    todo();
    // trazo
    c.shadowBlur = 0;
    c.strokeStyle = '#fff';
    c.lineWidth = 4.5;
    todo();
  });
  tex.anisotropy = 8;
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

/** Escamas rojas lacadas con filo dorado y brillo (barandillas). */
export function texturaEscamas(): THREE.CanvasTexture {
  const W = 512;
  const H = 256;
  return texturaCanvas(W, H, (c) => {
    c.fillStyle = '#5a0610';
    c.fillRect(0, 0, W, H);
    const fila = 30;
    const col = 40;
    for (let row = 0; row < 9; row++) {
      for (let k = -1; k < W / col + 1; k++) {
        const x = k * col + (row % 2) * (col / 2);
        const y = 26 + row * fila;
        const g = c.createRadialGradient(x, y - 14, 2, x, y - 4, 24);
        g.addColorStop(0, '#ff7a4a');
        g.addColorStop(0.45, '#e01c30');
        g.addColorStop(1, '#6a0612');
        c.fillStyle = g;
        c.beginPath();
        c.arc(x, y - 16, 21, 0.02 * Math.PI, 0.98 * Math.PI);
        c.closePath();
        c.fill();
        c.strokeStyle = '#ffd36a';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(x, y - 16, 21, 0.06 * Math.PI, 0.94 * Math.PI);
        c.stroke();
        c.strokeStyle = 'rgba(255,230,180,0.55)';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(x - 3, y - 20, 12, 0.6 * Math.PI, 0.9 * Math.PI);
        c.stroke();
      }
    }
    // remate dorado arriba y zócalo abajo
    const oro = c.createLinearGradient(0, 0, 0, 14);
    oro.addColorStop(0, '#fff0b0');
    oro.addColorStop(1, '#c98a1a');
    c.fillStyle = oro;
    c.fillRect(0, 0, W, 12);
    c.fillStyle = '#ffd36a';
    c.fillRect(0, H - 22, W, 6);
    c.fillStyle = '#3a0408';
    c.fillRect(0, H - 16, W, 16);
  });
}

/** Nube blanca algodonosa: bultos con la parte de arriba iluminada (alfa = densidad, rojo = luz). */
export function texturaNubeBlanca(): THREE.CanvasTexture {
  const T = 256;
  const tex = texturaCanvas(
    T,
    T,
    (c) => {
      const r = rnd(31337);
      const bultos: [number, number, number][] = [];
      for (let i = 0; i < 26; i++) {
        const a = r();
        const x = 40 + a * 176;
        const borde = Math.sin(a * Math.PI);
        const y = 150 - borde * 55 * r() - 10;
        bultos.push([x, y, 18 + borde * 34 * (0.5 + r() * 0.5)]);
      }
      // densidad (alfa) con sombra azulada abajo y luz arriba
      for (const [x, y, rad] of bultos) {
        const g = c.createRadialGradient(x, y - rad * 0.35, rad * 0.1, x, y, rad);
        g.addColorStop(0, 'rgba(255,255,255,0.95)');
        g.addColorStop(0.55, 'rgba(225,225,240,0.6)');
        g.addColorStop(1, 'rgba(180,180,215,0)');
        c.fillStyle = g;
        c.beginPath();
        c.arc(x, y, rad, 0, Math.PI * 2);
        c.fill();
      }
      // base plana y difusa
      const gb = c.createLinearGradient(0, 140, 0, 200);
      gb.addColorStop(0, 'rgba(200,200,230,0.5)');
      gb.addColorStop(1, 'rgba(200,200,230,0)');
      c.fillStyle = gb;
      c.beginPath();
      c.ellipse(128, 160, 110, 30, 0, 0, Math.PI * 2);
      c.fill();
    },
    false,
  );
  return tex;
}
