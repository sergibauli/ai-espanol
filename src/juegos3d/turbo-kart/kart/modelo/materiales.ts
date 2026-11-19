/**
 * Materiales y texturas de los vehículos-criatura.
 *
 * Casi todo el vehículo se pinta con UN material «uber» compartido por los 8 karts: el color va
 * en los vértices y cada vértice lleva además un atributo `pbr` = (metalizado, rugosidad,
 * emisión, iridiscencia). Así oro, laca, jade, marfil, cromo y neumáticos caben en una sola
 * llamada de dibujo. La iridiscencia es un falso efecto de película fina (fresnel → degradado
 * oro-magenta-cian) para plumas y aletas. Todos reflejan un pequeño cielo nocturno pintado en un
 * canvas (farolillos, neón y una «caja de luz»), que da vida al oro y a la laca aunque la pista no
 * tenga mapa de entorno.
 */
import * as THREE from 'three';

// --- cielo de reflejos (equirectangular, compartido) -----------------------------
let _entorno: THREE.CanvasTexture | null = null;
export function entorno(): THREE.Texture {
  if (_entorno) return _entorno;
  const W = 256;
  const H = 128;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const c = cv.getContext('2d');
  if (c) {
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#4a4a80');
    g.addColorStop(0.3, '#6a5a98');
    g.addColorStop(0.45, '#d8a890');
    g.addColorStop(0.5, '#fff0c8');
    g.addColorStop(0.55, '#8a5048');
    g.addColorStop(0.75, '#2a1a2c');
    g.addColorStop(1, '#120c16');
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
    // caja de luz cenital (brillo principal del oro y la laca)
    const k = c.createRadialGradient(W * 0.5, H * 0.14, 2, W * 0.5, H * 0.14, 46);
    k.addColorStop(0, 'rgba(255,250,235,1)');
    k.addColorStop(0.5, 'rgba(255,236,200,0.55)');
    k.addColorStop(1, 'rgba(255,236,200,0)');
    c.fillStyle = k;
    c.fillRect(0, 0, W, H);
    // farolillos rojos y dorados en el horizonte
    let s = 11;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 26; i++) {
      const x = rnd() * W;
      const y = H * (0.36 + rnd() * 0.12);
      const r = 2 + rnd() * 4;
      const lg = c.createRadialGradient(x, y, 0, x, y, r * 2.4);
      const col = rnd() < 0.6 ? '255,70,40' : '255,200,90';
      lg.addColorStop(0, `rgba(${col},1)`);
      lg.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = lg;
      c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
    }
    // neones cian y magenta
    c.fillStyle = 'rgba(80,240,255,0.9)';
    c.fillRect(W * 0.08, H * 0.4, W * 0.12, 2);
    c.fillRect(W * 0.66, H * 0.38, W * 0.1, 2);
    c.fillStyle = 'rgba(255,80,200,0.9)';
    c.fillRect(W * 0.36, H * 0.42, W * 0.08, 2);
    c.fillRect(W * 0.86, H * 0.41, W * 0.09, 2);
  }
  _entorno = new THREE.CanvasTexture(cv);
  _entorno.mapping = THREE.EquirectangularReflectionMapping;
  _entorno.colorSpace = THREE.SRGBColorSpace;
  return _entorno;
}

// --- inyección «uber» en el shader estándar --------------------------------------
const VERT_DECL = 'attribute vec4 pbr;\nvarying vec4 vPbr;\n';
const FRAG_DECL = 'varying vec4 vPbr;\n';

/**
 * Añade al material el atributo por vértice `pbr`. `emisionVertice` = la emisión sale del color del
 * vértice (material uber); si no, se suma a la emisión del propio material (cuerpo y acentos, que
 * Kart.ts hace latir).
 */
export function inyectarUber<T extends THREE.MeshStandardMaterial>(mat: T, clave: string): T {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>\n${VERT_DECL}`)
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPbr = pbr;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\n${FRAG_DECL}`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = vPbr.y;')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = vPbr.x;')
      .replace(
        '#include <normal_fragment_maps>',
        `#include <normal_fragment_maps>
        {
          float fr = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
          float fr2 = fr * fr;
          vec3 irid = 0.55 + 0.45 * cos(6.2832 * (fr * 0.9 + vec3(0.02, 0.36, 0.7)));
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.35 + irid * 0.75, clamp(fr2 * 1.6, 0.0, 1.0) * vPbr.w);
        }`,
      )
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * vPbr.z;');
  };
  mat.customProgramCacheKey = () => `tk-uber-${clave}`;
  return mat;
}

const compartidos = new Map<string, THREE.Material>();
export function compartido<T extends THREE.Material>(key: string, crear: () => T): T {
  const hecho = compartidos.get(key) as T | undefined;
  if (hecho) return hecho;
  const m = crear();
  compartidos.set(key, m);
  return m;
}

/** El material uber (compartido por todos los karts: nunca se libera). */
export function materialUber(): THREE.MeshStandardMaterial {
  return compartido('tk-uber', () =>
    inyectarUber(
      new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0, roughness: 1, envMap: entorno(), envMapIntensity: 1.15 }),
      'u',
    ),
  );
}

// --- texturas del pellejo de cada criatura (canvas, compartidas) --------------------
export type Textura = 'escamas' | 'rayas' | 'plumas' | 'hex' | 'piedra' | 'koi' | 'oro';
const texturas = new Map<Textura, THREE.CanvasTexture>();

function rng(semilla: number) {
  let s = semilla;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

export function textura(nombre: Textura): THREE.Texture {
  let t = texturas.get(nombre);
  if (t) return t;
  const N = 256;
  const cv = document.createElement('canvas');
  cv.width = N;
  cv.height = N;
  const c = cv.getContext('2d');
  if (c) {
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, N, N);
    if (nombre === 'escamas' || nombre === 'koi' || nombre === 'oro') {
      // escamas imbricadas: 8 por vuelta, filas alternas; cada una con degradado y borde claro
      const cols = 8;
      const w = N / cols;
      const h = w * 0.62;
      const filas = Math.ceil(N / h) + 1;
      for (let f = filas; f >= -1; f--) {
        for (let col = -1; col <= cols; col++) {
          const x = col * w + (f % 2) * w * 0.5 + w * 0.5;
          const y = f * h;
          const g = c.createRadialGradient(x, y + h * 0.15, 1, x, y + h * 0.4, w * 0.62);
          if (nombre === 'oro') {
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.7, '#e8dcc8');
            g.addColorStop(1, '#8c7a66');
          } else {
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.65, '#d8d2cc');
            g.addColorStop(1, '#6e6266');
          }
          c.fillStyle = g;
          c.beginPath();
          c.moveTo(x - w * 0.5, y);
          c.quadraticCurveTo(x - w * 0.5, y + h * 1.25, x, y + h * 1.35);
          c.quadraticCurveTo(x + w * 0.5, y + h * 1.25, x + w * 0.5, y);
          c.closePath();
          c.fill();
          c.strokeStyle = nombre === 'koi' ? 'rgba(255,255,255,0.85)' : 'rgba(255,236,190,0.95)';
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(x - w * 0.46, y + h * 0.2);
          c.quadraticCurveTo(x - w * 0.46, y + h * 1.2, x, y + h * 1.3);
          c.quadraticCurveTo(x + w * 0.46, y + h * 1.2, x + w * 0.46, y + h * 0.2);
          c.stroke();
        }
      }
    } else if (nombre === 'rayas') {
      c.fillStyle = '#f4f6ff';
      c.fillRect(0, 0, N, N);
      const r = rng(5);
      c.fillStyle = '#16121e';
      for (let k = 0; k < 11; k++) {
        const x = (k + 0.5) * (N / 11) + (r() - 0.5) * 8;
        for (const centro of [N * 0.25, N * 0.75]) {
          const largo = N * (0.12 + r() * 0.1);
          const ancho = 5 + r() * 5;
          c.beginPath();
          c.moveTo(x - ancho, centro - largo);
          c.bezierCurveTo(x + ancho * 1.6, centro - largo * 0.3, x - ancho * 0.6, centro + largo * 0.4, x + ancho * 0.4, centro + largo);
          c.bezierCurveTo(x + ancho * 0.2, centro + largo * 0.3, x + ancho * 2.2, centro - largo * 0.3, x + ancho, centro - largo);
          c.closePath();
          c.fill();
          // rama secundaria
          c.beginPath();
          c.moveTo(x + ancho * 0.5, centro - largo * 0.2);
          c.quadraticCurveTo(x + ancho * 3, centro, x + ancho * 3.6, centro + largo * 0.35);
          c.quadraticCurveTo(x + ancho * 2, centro + 2, x + ancho * 0.5, centro + largo * 0.1);
          c.fill();
        }
      }
    } else if (nombre === 'plumas') {
      const cols = 7;
      const w = N / cols;
      const h = w * 0.95;
      const filas = Math.ceil(N / h) + 1;
      for (let f = filas; f >= -1; f--) {
        for (let col = -1; col <= cols; col++) {
          const x = col * w + (f % 2) * w * 0.5 + w * 0.5;
          const y = f * h;
          const g = c.createLinearGradient(x, y, x, y + h * 1.4);
          g.addColorStop(0, '#ffffff');
          g.addColorStop(0.7, '#e8d4c4');
          g.addColorStop(1, '#7a5a5a');
          c.fillStyle = g;
          c.beginPath();
          c.ellipse(x, y + h * 0.7, w * 0.48, h * 0.78, 0, 0, Math.PI * 2);
          c.fill();
          c.strokeStyle = 'rgba(255,240,200,0.9)';
          c.lineWidth = 1.6;
          c.beginPath();
          c.moveTo(x, y);
          c.lineTo(x, y + h * 1.45);
          c.stroke();
          c.strokeStyle = 'rgba(120,80,80,0.35)';
          c.lineWidth = 1;
          for (let b = 1; b < 6; b++) {
            c.beginPath();
            c.moveTo(x, y + b * h * 0.24);
            c.lineTo(x - w * 0.42, y + b * h * 0.24 + h * 0.2);
            c.moveTo(x, y + b * h * 0.24);
            c.lineTo(x + w * 0.42, y + b * h * 0.24 + h * 0.2);
            c.stroke();
          }
        }
      }
    } else if (nombre === 'hex') {
      c.fillStyle = '#9aa29a';
      c.fillRect(0, 0, N, N);
      const R = N / 8;
      for (let fila = -1; fila < 6; fila++) {
        for (let col = -1; col < 6; col++) {
          const cx = col * R * 1.732 + (fila % 2) * R * 0.866;
          const cy = fila * R * 1.5;
          {
            const x0 = cx;
            const y0 = cy;
            const g = c.createRadialGradient(x0, y0 - R * 0.3, 2, x0, y0, R);
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.75, '#cfd6cf');
            g.addColorStop(1, '#5a625a');
            c.fillStyle = g;
            c.beginPath();
            for (let k = 0; k < 6; k++) {
              const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
              const px = x0 + Math.cos(a) * R * 0.9;
              const py = y0 + Math.sin(a) * R * 0.9;
              if (k === 0) c.moveTo(px, py);
              else c.lineTo(px, py);
            }
            c.closePath();
            c.fill();
            // anillos de crecimiento
            c.strokeStyle = 'rgba(60,70,60,0.4)';
            c.lineWidth = 1.2;
            c.beginPath();
            for (let k = 0; k <= 6; k++) {
              const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
              const px = x0 + Math.cos(a) * R * 0.55;
              const py = y0 + Math.sin(a) * R * 0.55;
              if (k === 0) c.moveTo(px, py);
              else c.lineTo(px, py);
            }
            c.stroke();
          }
        }
      }
    } else {
      // piedra de jade: moteado, vetas claras y nubes
      const r = rng(7);
      for (let i = 0; i < 900; i++) {
        const v = 196 + Math.floor(r() * 59);
        c.fillStyle = `rgba(${v},${v},${v},0.6)`;
        c.beginPath();
        c.arc(r() * N, r() * N, 1 + r() * 9, 0, Math.PI * 2);
        c.fill();
      }
      c.strokeStyle = 'rgba(255,255,255,0.95)';
      for (let i = 0; i < 10; i++) {
        c.lineWidth = 1 + r() * 2.5;
        c.beginPath();
        let x = r() * N;
        let y = r() * N;
        c.moveTo(x, y);
        for (let k = 0; k < 7; k++) {
          x += (r() - 0.5) * 70;
          y += (r() - 0.3) * 50;
          c.lineTo(x, y);
        }
        c.stroke();
      }
      c.strokeStyle = 'rgba(70,90,80,0.35)';
      for (let i = 0; i < 6; i++) {
        c.lineWidth = 1;
        c.beginPath();
        c.arc(r() * N, r() * N, 10 + r() * 30, 0, Math.PI * 1.4);
        c.stroke();
      }
    }
  }
  t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  texturas.set(nombre, t);
  return t;
}
