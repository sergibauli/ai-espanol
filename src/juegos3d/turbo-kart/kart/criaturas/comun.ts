/**
 * Piezas comunes para esculpir criaturas: ojos chibi, patas, llamas, rizos de nube (xiangyun)...
 */
import * as THREE from 'three';
import type { Taller, V3 } from '../modelo/taller';
import { limbGeometry } from '../modelo/taller';
import type { Textura } from '../modelo/materiales';

export type Tocado = 'fenix' | 'aleta' | 'astas' | 'dragon' | 'orejas' | 'general' | 'borla' | 'lingote';
export type Peinado = 'mono' | 'puntas' | 'dosMonos' | 'flequillo' | 'coleta' | 'corto' | 'barba' | 'bigote';

export interface PilotoSpec {
  piel: number;
  pelo: number;
  peinado: Peinado;
  tocado: Tocado;
  /** Color de los ribetes del traje (por defecto oro). */
  ribete?: number;
}

export interface Criatura {
  /** Altura de la cadera del piloto y su z. */
  silla: [number, number];
  ojo: number;
  segundo: number;
  traje: number;
  /** Color de las llamas del turbo y de los anillos luminosos del chasis. */
  llama: number;
  /** Metalizado del cuerpo (pixiu de oro). */
  metal?: number;
  /** Brillo propio del pellejo (para que el blanco no se apague de noche). */
  emision?: number;
  /** Rugosidad del pellejo. */
  rugosidad?: number;
  aliento: number;
  boca: V3;
  textura: Textura;
  /** Repetición de la textura del pellejo. */
  repetir?: number;
  /** Color de las plumas iridiscentes (alas, colas). */
  pluma?: number;
  escapes?: V3[];
  piloto: PilotoSpec;
  /** Pinta el pellejo por vértice (manchas del koi, vientres...). */
  pintor?: (x: number, y: number, z: number, c: THREE.Color) => void;
  construir(t: Taller): void;
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const llama = (t: Taller, k: string, a: V3, b: V3, r: number) => t.pieza(k, 'cono', a, b, r);

/** Llama de fuego/crin en tres capas (más ancha y cálida en la raíz, punta brillante). */
export function llamaDoble(t: Taller, a: V3, b: V3, r: number, curva: V3 = [0, 0, 0]) {
  if (t.bajo) {
    t.pieza('accent', 'cono', a, b, r * 0.9, r * 0.7);
    return;
  }
  const m: V3 = [lerp(a[0], b[0], 0.55) + curva[0], lerp(a[1], b[1], 0.55) + curva[1], lerp(a[2], b[2], 0.55) + curva[2]];
  t.pieza('accentRoot', 'esf', a, m, r * 1.1, r * 0.8);
  t.pieza('accent', 'cono', m, b, r * 0.75, r * 0.55);
  t.pieza('accentTip', 'cono', [lerp(m[0], b[0], 0.35), lerp(m[1], b[1], 0.35), lerp(m[2], b[2], 0.35)], [b[0] + (b[0] - m[0]) * 0.25, b[1] + (b[1] - m[1]) * 0.25, b[2] + (b[2] - m[2]) * 0.25], r * 0.32, r * 0.25);
}

/** Patas de felino/qilin en pose de carrera. */
export function patas(t: Taller, k: string, pie: string, grosor: number, delante: [number, number], detras: [number, number], garras: boolean, pezuna = false) {
  t.par((s) => {
    const [zd, yd] = delante;
    const [zt, yt] = detras;
    // delanteras: hombro → codo → pata
    t.esf(k, s * 0.16, yd - 0.02, zd + 0.02, grosor * 1.5, grosor * 2, grosor * 1.8);
    const g1 = limbGeometry(s * 0.17, yd - 0.04, zd, s * 0.23, 0.32, zd - 0.2, grosor, t.bajo ? 5 : 7);
    t.add(k, g1);
    g1.dispose();
    const g2 = limbGeometry(s * 0.23, 0.32, zd - 0.2, s * 0.24, 0.17, zd - 0.36, grosor * 0.82, t.bajo ? 5 : 7);
    t.add(k, g2);
    g2.dispose();
    if (pezuna) {
      t.torno(pie, [[0, 0], [grosor * 1.15, 0.0], [grosor * 1.0, 0.07], [grosor * 0.7, 0.08], [0, 0.08]], s * 0.24, 0.1, zd - 0.4, 0, 0, 0, 10);
    } else {
      t.esf(pie, s * 0.24, 0.14, zd - 0.42, grosor * 1.15, grosor * 0.72, grosor * 1.35);
    }
    // traseras: muslo → corvejón → pata
    t.esf(k, s * 0.17, yt, zt, grosor * 1.7, grosor * 2.5, grosor * 2.5);
    const g3 = limbGeometry(s * 0.2, yt - 0.06, zt + 0.08, s * 0.24, 0.3, zt + 0.25, grosor * 0.95, t.bajo ? 5 : 7);
    t.add(k, g3);
    g3.dispose();
    const g4 = limbGeometry(s * 0.24, 0.3, zt + 0.25, s * 0.24, 0.16, zt + 0.38, grosor * 0.75, t.bajo ? 5 : 7);
    t.add(k, g4);
    g4.dispose();
    if (pezuna) {
      t.torno(pie, [[0, 0], [grosor * 1.1, 0.0], [grosor * 0.95, 0.07], [grosor * 0.65, 0.08], [0, 0.08]], s * 0.24, 0.09, zt + 0.42, 0, 0, 0, 10);
    } else {
      t.esf(pie, s * 0.24, 0.13, zt + 0.42, grosor * 1.1, grosor * 0.68, grosor * 1.3);
    }
    if (garras) {
      for (const dx of [-0.04, 0, 0.04]) {
        t.pieza('ivory', 'cono', [s * 0.24 + dx, 0.13, zd - 0.5], [s * 0.24 + dx * 1.3, 0.09, zd - 0.58], 0.015);
        t.pieza('ivory', 'cono', [s * 0.24 + dx, 0.12, zt + 0.34], [s * 0.24 + dx * 1.3, 0.08, zt + 0.26], 0.013);
      }
    }
  });
}

/**
 * Ojos chibi: globo blanco, iris luminoso (capa orb), pupila, brillo y párpado. Miran hacia -Z y
 * un poco hacia fuera (`abre`).
 */
export function ojos(t: Taller, x: number, y: number, z: number, r: number, parpado: string | null, abre = 0.35, ceño = 0.18, iris = 'eye', ceja = true) {
  const c = Math.min(0.2, Math.max(0.15, ceño));
  t.par((s) => {
    const dx = Math.sin(abre) * s;
    const dz = -Math.cos(abre);
    t.esf('ivory', s * x, y, z, r * 1.05, r * 1.15, r * 0.85, 0, s * -abre, 0);
    t.esf(iris, s * x + dx * r * 0.4, y, z + dz * r * 0.4, r * 0.78, r * 0.9, r * 0.52, 0, s * -abre, 0);
    t.esf('pupil', s * x + dx * r * 0.6, y - r * 0.02, z + dz * r * 0.6, r * 0.42, r * 0.62, r * 0.32, 0, s * -abre, 0);
    // brillo grande del color de los ojos y un segundo brillo pequeño, al otro lado y más abajo
    t.esf('glintC', s * x + dx * r * 0.72 - s * r * 0.18, y + r * 0.36, z + dz * r * 0.72, r * 0.16, r * 0.16, r * 0.12);
    t.esf('glint', s * x + dx * r * 0.74 + s * r * 0.12, y - r * 0.22, z + dz * r * 0.74, r * 0.07, r * 0.07, r * 0.05);
    if (parpado) {
      // párpado superior fino, apenas inclinado (mirada despierta)
      t.pieza(parpado, 'esf', [s * x - s * r * 1.15, y + r * (0.95 - c), z + dz * r * 0.2], [s * x + s * r * 1.2, y + r * (0.95 + c), z + dz * r * 0.3], r * 0.32, r * 0.42, [0, 0, -1]);
    }
    if (ceja) {
      // ceja dorada en cuña a ~20°
      const a0: V3 = [s * x - s * r * 1.1, y + r * 1.35, z + dz * r * 0.25];
      const a1: V3 = [s * x + s * r * 1.3, y + r * 1.35 + r * 2.4 * 0.36, z + dz * r * 0.1];
      t.pieza('gold', 'cono', a1, a0, r * 0.32, r * 0.16, [0, 0, -1]);
    }
  });
}

/** Rizo de nube xiangyun (espiral plana) en el plano local XY, mirando a +Z. */
export function rizo(t: Taller, k: string, x: number, y: number, z: number, R: number, grosor: number, ry = 0, rz = 0, giros = 1.25) {
  const pts: V3[] = [];
  const N = 10;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2 * giros;
    const r = R * (1 - (i / N) * 0.8);
    pts.push([Math.cos(a) * r, Math.sin(a) * r, 0]);
  }
  const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, rz)), new THREE.Vector3(1, 1, 1));
  const local = pts.map((p) => new THREE.Vector3(p[0], p[1], p[2]).applyMatrix4(m));
  t.det(() => t.tubo(k, local.map((v) => [v.x, v.y, v.z] as V3), (u) => [grosor * (1 - u * 0.5), grosor * (1 - u * 0.5)], 10, 4));
}
