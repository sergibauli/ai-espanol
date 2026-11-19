/** 赤龙 Dragón Carmesí: laca roja y oro, cornamenta, melena de fuego, bigotes y perla de jade. */
import * as THREE from 'three';
import type { Criatura } from './comun';
import { lerp, ojos, llamaDoble } from './comun';
import { limbGeometry, type V3 } from '../modelo/taller';

export const dragon: Criatura = {
  silla: [0.62, 0.12],
  ojo: 0x3dffb0,
  segundo: 0xffcf6a,
  traje: 0xb51a24,
  llama: 0xff2a3a,
  aliento: 0xff3a3a,
  boca: [0, 0.6, -1.12],
  textura: 'escamas',
  repetir: 1.6,
  piloto: { piel: 0xf6cfaa, pelo: 0x141018, peinado: 'puntas', tocado: 'dragon' },
  construir(t) {
    // ---------------------------------------------------------------- cuerpo serpentino
    const pts: V3[] = [[0, 0.62, -0.58], [0, 0.5, -0.38], [0, 0.42, -0.1], [0, 0.44, 0.25], [0, 0.56, 0.52], [0.12, 0.74, 0.78], [0.1, 1.0, 0.94], [-0.03, 1.22, 0.92], [0.02, 1.36, 0.78]];
    const radio = (u: number) => (u < 0.4 ? 0.19 + 0.04 * Math.sin((u / 0.4) * Math.PI * 0.5) : 0.23 * Math.pow(1 - (u - 0.4) / 0.6, 0.8) + 0.025);
    const curva = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
    // parte delantera (estática) y cola (cadena que ondula)
    const cortar = (a: number, b: number): V3[] => {
      const out: V3[] = [];
      for (let i = 0; i <= 8; i++) {
        const P = curva.getPointAt(lerp(a, b, i / 8));
        out.push([P.x, P.y, P.z]);
      }
      return out;
    };
    t.tubo('body', cortar(0, 0.42), (u) => [radio(u * 0.42), radio(u * 0.42) * 0.95], 16, 14);
    // placas del vientre y cresta de llamas
    const P = new THREE.Vector3();
    const T = new THREE.Vector3();
    const placas = (a: number, b: number) => {
      for (let u = a; u < b; u += 0.05) {
        curva.getPointAt(u, P);
        curva.getTangentAt(u, T);
        const r = radio(u);
        t.esf('secondTex', P.x, P.y - r * 0.62, P.z, r * 0.66, r * 0.42, 0.075, Math.atan2(-T.y, Math.abs(T.z) + 1e-3) * Math.sign(T.z || 1), 0, 0);
        if (P.z > -0.3 && P.z < 0.42) continue; // hueco para la silla
        llamaDoble(t, [P.x, P.y + r * 0.7, P.z], [P.x, P.y + r + 0.12 + 0.06 * (1 - u), P.z + 0.1], 0.045);
      }
    };
    placas(0.04, 0.42);
    t.onda('cola', { eje: 'z', o: 0.42, len: 0.55, amp: 0.1, freq: 3.8, giro: 0.4, vert: 0.6, n: 4 });
    t.tubo('body', cortar(0.4, 1), (u) => [radio(lerp(0.4, 1, u)), radio(lerp(0.4, 1, u)) * 0.95], 24, 12);
    placas(0.44, 0.97);
    curva.getPointAt(1, P);
    for (const [dx, dy] of [[0, 0.14], [0.11, 0.06], [-0.11, 0.06], [0, -0.06]]) llamaDoble(t, [P.x, P.y, P.z - 0.04], [P.x + dx, P.y + dy, P.z + 0.26], 0.055);
    t.estatico();
    // patas con garras de oro
    t.par((s) => {
      for (const z of [-0.36, 0.3]) {
        const g = limbGeometry(s * 0.14, 0.46, z, s * 0.3, 0.3, z - 0.08, 0.058);
        t.add('body', g);
        g.dispose();
        t.esf('secondTex', s * 0.31, 0.27, z - 0.09, 0.065, 0.045, 0.075);
        for (const dz of [-0.045, 0, 0.045]) t.pieza('gold', 'cono', [s * 0.34, 0.26, z - 0.09 + dz], [s * 0.42, 0.2, z - 0.1 + dz * 1.5], 0.015);
        llamaDoble(t, [s * 0.2, 0.44, z + 0.02], [s * 0.3, 0.52, z + 0.2], 0.035);
      }
    });
    // perla de jade en llamas delante del morro
    t.esf('eye', 0, 0.46, -1.2, 0.095);
    t.toro('gold', 0.11, 0.014, 0, 0.46, -1.2, 0, 0, 0, Math.PI * 2, 1, 1, 1, 22);
    t.toro('gold', 0.11, 0.01, 0, 0.46, -1.2, 0, Math.PI / 2, 0, Math.PI * 2, 1, 1, 1, 22);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      llamaDoble(t, [Math.cos(a) * 0.1, 0.46 + Math.sin(a) * 0.1, -1.2], [Math.cos(a) * 0.17, 0.46 + Math.sin(a) * 0.17 + 0.03, -1.12], 0.03);
    }
    t.pieza('gold', 'cil', [0, 0.36, -1.2], [0, 0.25, -0.98], 0.012);

    // ---------------------------------------------------------------- cabeza
    t.cabeza([0, 0.66, -0.66]);
    t.esf('body', 0, 0.78, -0.74, 0.2, 0.17, 0.2);
    // hocico largo con puente de oro y nariz
    t.esf('body', 0, 0.71, -0.98, 0.15, 0.095, 0.2);
    t.pieza('gold', 'esf', [0, 0.82, -0.82], [0, 0.78, -1.12], 0.05, 0.035, [0, 1, 0]);
    t.esf('gold', 0, 0.76, -1.15, 0.07, 0.05, 0.045);
    t.par((s) => t.esf('dark', s * 0.03, 0.76, -1.19, 0.015, 0.012, 0.01));
    t.esf('secondTex', 0, 0.64, -1.0, 0.13, 0.035, 0.17);
    // mandíbula abierta con lengua, dientes y colmillos
    t.esf('body', 0, 0.53, -0.92, 0.12, 0.045, 0.16, 0.38);
    t.esf('tongue', 0, 0.58, -0.94, 0.08, 0.025, 0.12, 0.25);
    for (let i = -2; i <= 2; i++) t.pieza('ivory', 'cono', [i * 0.04, 0.63, -1.1 + Math.abs(i) * 0.03], [i * 0.04, 0.59, -1.11 + Math.abs(i) * 0.03], 0.011);
    t.par((s) => {
      t.pieza('ivory', 'cono', [s * 0.09, 0.64, -1.04], [s * 0.09, 0.54, -1.06], 0.018);
      t.pieza('ivory', 'cono', [s * 0.08, 0.53, -0.98], [s * 0.08, 0.6, -0.99], 0.014);
      // cejas de oro, gruesas y en ángulo
      t.pieza('gold', 'esf', [s * 0.03, 0.9, -0.94], [s * 0.21, 0.92, -0.78], 0.045, 0.035, [0, 0, -1]);
      // orejas en abanico
      t.pieza('accent', 'esf', [s * 0.15, 0.8, -0.64], [s * 0.32, 0.88, -0.54], 0.06, 0.014, [s, 0.5, 0]);
      // cornamenta ramificada de oro
      t.tubo('gold', [[s * 0.08, 0.88, -0.7], [s * 0.16, 1.04, -0.6], [s * 0.24, 1.16, -0.42], [s * 0.26, 1.2, -0.28]], (u) => [0.036 * (1 - u * 0.75), 0.036 * (1 - u * 0.75)], 14, 8);
      t.pieza('gold', 'cono', [s * 0.16, 1.04, -0.6], [s * 0.3, 1.08, -0.68], 0.02);
      t.pieza('gold', 'cono', [s * 0.22, 1.14, -0.46], [s * 0.22, 1.29, -0.5], 0.018);
    });
    ojos(t, 0.11, 0.83, -0.9, 0.05, 'body', 0.45, 0.4);
    // melena de llamas detrás de la cabeza y barba
    for (let i = 0; i < 11; i++) {
      const a = -1.8 + (i / 10) * 3.6;
      const b: V3 = [Math.sin(a) * 0.16, 0.74 + Math.cos(a) * 0.13, -0.6];
      llamaDoble(t, b, [b[0] + Math.sin(a) * 0.2, b[1] + Math.cos(a) * 0.12 + 0.03, -0.32], 0.05, [0, 0.03, 0]);
    }
    for (const x of [-0.06, 0, 0.06]) llamaDoble(t, [x, 0.52, -0.9], [x * 2, 0.36, -0.8], 0.028);
    // bigotes largos (una cadena por lado)
    t.par((s) => {
      t.onda(s < 0 ? 'bigoteI' : 'bigoteD', { eje: 'z', o: -1.1, len: 0.6, amp: 0.14, freq: 3, giro: 0.25, vert: 0.8, n: 3, padre: 'cabeza' });
      t.tubo('gold', [[s * 0.1, 0.7, -1.1], [s * 0.22, 0.67, -1.06], [s * 0.34, 0.6, -0.92], [s * 0.4, 0.55, -0.72], [s * 0.44, 0.58, -0.5]], (u) => [lerp(0.016, 0.005, u), lerp(0.016, 0.005, u)], 16, 6);
      t.usar('cabeza');
    });
    t.estatico();
  },
};
