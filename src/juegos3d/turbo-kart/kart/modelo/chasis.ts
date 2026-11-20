/**
 * Lo que comparten todos los vehículos: chasis de laca negra con ribetes de oro, motores laterales
 * con anillos luminosos, parachoques con nube ruyi, trono del piloto, escapes de bronce y ruedas de
 * fuego (风火轮) con llanta dorada.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { Taller, V3 } from './taller';
import type { Criatura } from '../criaturas/comun';
import { rizo, lerp } from '../criaturas/comun';

export const WHEEL_R_F = 0.23;
export const WHEEL_R_R = 0.25;
export const WHEEL_W_F = 0.24;
export const WHEEL_W_R = 0.28;
export const WHEEL_X = 0.52;
export const WHEEL_Z_F = -0.52;
export const WHEEL_Z_R = 0.5;
export const ESCAPES_DEF: V3[] = [[-0.17, 0.4, 0.8], [0.17, 0.4, 0.8]];

/**
 * Rueda en coordenadas locales (centro en el origen, eje X; `fuera` = ±1 indica la cara exterior).
 * Gira con el hueso de la rueda: neumático de goma mate con tacos y flanco, llanta de radios con
 * aro de oro cepillado y disco de freno ventilado detrás de los radios.
 */
export function rueda(t: Taller, radius: number, width: number, llanta = 'rimDark', fuera = 1) {
  const tube = width * 0.4;
  // neumático: carcasa de perfil cuadrado, banda de rodadura con tacos y flanco
  t.toro('tire', radius - tube, tube, 0, 0, 0, 0, Math.PI / 2, 0, Math.PI * 2, 1.25, 1, 1, 22);
  const banda = new THREE.CylinderGeometry(radius * 0.985, radius * 0.985, width * 0.86, t.bajo ? 10 : 22, 1, true);
  t.add('tire', banda, 0, 0, 0, 0, 0, Math.PI / 2);
  banda.dispose();
  const taco = new THREE.BoxGeometry(width * 0.36, 0.022, 0.05);
  for (let i = 0; i < (t.bajo ? 0 : 14); i++) {
    const a = (i / 14) * Math.PI * 2;
    for (const l of [-1, 1]) t.add('tire', taco, l * width * 0.2, Math.cos(a) * radius, Math.sin(a) * radius, a, l * 0.45, 0);
  }
  taco.dispose();
  t.det(() => t.toro('tireSide', radius * 0.8, 0.008, fuera * width * 0.47, 0, 0, 0, Math.PI / 2, 0, Math.PI * 2, 1, 1, 1, 16));
  // llanta: barril oscuro, aro de oro cepillado, seis radios y tuerca central cromada
  const x = fuera * width * 0.36;
  const barril = new THREE.CylinderGeometry(radius * 0.64, radius * 0.64, width * 0.78, t.bajo ? 8 : 16, 1, true);
  t.add('rimBarrel', barril, 0, 0, 0, 0, 0, Math.PI / 2);
  barril.dispose();
  t.toro('goldBrush', radius * 0.64, 0.016, x, 0, 0, 0, Math.PI / 2, 0, Math.PI * 2, 1, 1, 1, 24);
  for (let i = 0; i < (t.bajo ? 3 : 6); i++) {
    const a = (i / (t.bajo ? 3 : 6)) * Math.PI * 2;
    t.pieza(llanta, 'cil', [x, Math.cos(a) * radius * 0.13, Math.sin(a) * radius * 0.13], [x - fuera * 0.012, Math.cos(a + 0.18) * radius * 0.62, Math.sin(a + 0.18) * radius * 0.62], 0.022, 0.012, [fuera, 0, 0]);
  }
  t.pieza('chrome', 'cil', [x - fuera * 0.01, 0, 0], [x + fuera * 0.025, 0, 0], radius * 0.15);
  t.det(() => {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      t.pieza('chrome', 'cil', [x + fuera * 0.02, Math.cos(a) * radius * 0.09, Math.sin(a) * radius * 0.09], [x + fuera * 0.036, Math.cos(a) * radius * 0.09, Math.sin(a) * radius * 0.09], 0.008);
    }
  });
  // disco de freno ventilado (gira) detrás de los radios
  const disco = new THREE.CylinderGeometry(radius * 0.56, radius * 0.56, 0.018, t.bajo ? 10 : 22);
  t.add('disc', disco, x - fuera * 0.035, 0, 0, 0, 0, Math.PI / 2);
  disco.dispose();
  t.pieza('metal', 'cil', [x - fuera * 0.045, 0, 0], [x - fuera * 0.015, 0, 0], radius * 0.24);
}

/**
 * Lo que no gira de cada rueda (hueso 'buje': gira con la dirección, no con la rueda): pinza de
 * freno del color de la criatura y mangueta.
 */
export function buje(t: Taller, radius: number, width: number, fuera: number) {
  const x = fuera * width * 0.36 - fuera * 0.035;
  t.add('caliper', CAJA, x - fuera * 0.008, radius * 0.36, radius * 0.36, -0.8, 0, 0, 0.04, 0.07, 0.13);
  t.pieza('metal', 'cil', [x - fuera * 0.06, 0, 0], [x - fuera * 0.14, 0, 0], 0.03);
}
const CAJA = new THREE.BoxGeometry(1, 1, 1);

/** Chasis, motores, parachoques, trono y tubos de escape (hueso 'raiz'). */
export function chasis(t: Taller, spec: Criatura) {
  t.chasis();
  // bandeja de laca negra con ribete de oro
  const bandeja = t.bajo ? new THREE.BoxGeometry(0.84, 0.07, 1.5) : new RoundedBoxGeometry(0.84, 0.07, 1.5, 1, 0.03);
  t.add('metal', bandeja, 0, 0.19, 0.0);
  bandeja.dispose();
  const borde: V3[] = [];
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const sx = Math.sign(c) * Math.pow(Math.abs(c), 0.25);
    const sz = Math.sign(s) * Math.pow(Math.abs(s), 0.25);
    borde.push([sx * 0.43, 0.225, sz * 0.76]);
  }
  t.tubo('gold', borde, () => [0.014, 0.014], 40, 4);
  t.par((s) => {
    const larguero = t.bajo ? new THREE.BoxGeometry(0.08, 0.08, 1.16) : new RoundedBoxGeometry(0.08, 0.08, 1.16, 1, 0.02);
    t.add('metal', larguero, s * 0.38, 0.25, 0.02);
    larguero.dispose();
    // motor lateral: cilindro de bronce con anillos luminosos y tapas de oro
    t.pieza('bronze', 'cil', [s * 0.36, 0.33, -0.24], [s * 0.36, 0.33, 0.32], 0.085);
    for (const z of [-0.1, 0.02, 0.14]) t.toro('glow', 0.088, 0.016, s * 0.36, 0.33, z, 0, 0, 0, Math.PI * 2, 1, 1, 1, 14);
    t.torno('gold', [[0, 0], [0.09, 0], [0.094, 0.025], [0.06, 0.06], [0, 0.07]], s * 0.36, 0.33, -0.24, -Math.PI / 2, 0, 0, 10);
    t.torno('gold', [[0, 0], [0.09, 0], [0.094, 0.02], [0.07, 0.04], [0, 0.045]], s * 0.36, 0.33, 0.32, Math.PI / 2, 0, 0, 10);
    t.esf('glowCore', s * 0.36, 0.33, -0.31, 0.03);
    // costuras y remaches del motor lateral
    t.det(() => {
      for (const z of [-0.2, 0.28]) t.toro('seam', 0.087, 0.004, s * 0.36, 0.33, z, 0, 0, 0, Math.PI * 2, 1, 1, 1, 16);
    });
    // suspensión de doble trapecio con amortiguador y muelle (se estira entre chasis y buje)
    for (const [z, wy, i] of [[WHEEL_Z_F, WHEEL_R_F, s < 0 ? 0 : 1], [WHEEL_Z_R, WHEEL_R_R, s < 0 ? 2 : 3]] as [number, number, number][]) {
      const xb = WHEEL_X - (i < 2 ? WHEEL_W_F : WHEEL_W_R) * 0.62;
      t.puente('raiz', `buje${i}`, 0.3, xb - 0.01);
      for (const dy of [-0.06, 0.07]) {
        t.pieza('arm', 'cil', [s * 0.24, wy + dy, z - 0.09], [s * xb, wy + dy, z], 0.014);
        t.pieza('arm', 'cil', [s * 0.24, wy + dy, z + 0.09], [s * xb, wy + dy, z], 0.014);
      }
      // amortiguador: cuerpo cromado y muelle helicoidal del color de la criatura
      const top: V3 = [s * 0.27, wy + 0.24, z + 0.02];
      const bot: V3 = [s * (xb - 0.02), wy - 0.02, z];
      t.pieza('chrome', 'cil', top, bot, 0.012);
      t.pieza('shock', 'cil', top, [lerp(top[0], bot[0], 0.5), lerp(top[1], bot[1], 0.5), lerp(top[2], bot[2], 0.5)], 0.022);
      t.det(() => {
        const hel: V3[] = [];
        const ax = new THREE.Vector3(bot[0] - top[0], bot[1] - top[1], bot[2] - top[2]);
        const len = ax.length();
        ax.normalize();
        const u = new THREE.Vector3(0, 0, 1).cross(ax).normalize();
        const v = ax.clone().cross(u);
        const N = 30;
        for (let k = 0; k <= N; k++) {
          const f = 0.08 + (k / N) * 0.84;
          const an = (k / N) * Math.PI * 2 * 5;
          hel.push([top[0] + ax.x * f * len + (u.x * Math.cos(an) + v.x * Math.sin(an)) * 0.03, top[1] + ax.y * f * len + (u.y * Math.cos(an) + v.y * Math.sin(an)) * 0.03, top[2] + ax.z * f * len + (u.z * Math.cos(an) + v.z * Math.sin(an)) * 0.03]);
        }
        t.tubo('spring', hel, () => [0.006, 0.006], 30, 3);
      });
      t.chasis();
    }
    // guardabarros traseros con rizo de nube
    const guarda = new THREE.CylinderGeometry(WHEEL_R_R + 0.05, WHEEL_R_R + 0.05, 0.12, 18, 1, true, -Math.PI * 0.05, Math.PI * 0.62);
    t.add('guardaLlama', guarda, s * WHEEL_X, WHEEL_R_R, WHEEL_Z_R, 0, 0, Math.PI / 2);
    guarda.dispose();
    t.toro('gold', WHEEL_R_R + 0.052, 0.012, s * (WHEEL_X + 0.06), WHEEL_R_R, WHEEL_Z_R, Math.PI * 0.05 - Math.PI / 2 + Math.PI, Math.PI / 2, 0, Math.PI * 0.62);
  });
  // parachoques delantero: barra dorada curva y placa ruyi de laca roja
  t.tubo('goldBrush', [[-0.4, 0.2, -0.76], [-0.2, 0.22, -0.86], [0, 0.23, -0.9], [0.2, 0.22, -0.86], [0.4, 0.2, -0.76]], () => [0.03, 0.03], 14, 7);
  t.esf('saddle', 0, 0.26, -0.88, 0.13, 0.07, 0.04);
  rizo(t, 'gold', 0.1, 0.27, -0.91, 0.04, 0.008, 0, 0);
  rizo(t, 'gold', -0.1, 0.27, -0.91, 0.04, 0.008, Math.PI, 0);
  t.esf('jade', 0, 0.27, -0.92, 0.035);
  // bloque motor trasero con aletas de refrigeración
  const bloque = t.bajo ? new THREE.BoxGeometry(0.46, 0.2, 0.28) : new RoundedBoxGeometry(0.46, 0.2, 0.28, 1, 0.05);
  t.add('metal', bloque, 0, 0.32, 0.7);
  bloque.dispose();
  // radiadores laterales con rejilla, manguitos y trompetas de admisión cromadas
  t.par((s) => {
    t.caja('metal', 0.03, 0.16, 0.2, s * 0.25, 0.36, 0.66, 0, 0, s * 0.25);
    t.det(() => {
      for (let k = 0; k < 6; k++) t.caja('grille', 0.034, 0.012, 0.18, s * 0.25 + s * Math.sin(0.25) * (k * 0.024 - 0.06), 0.3 + k * 0.024, 0.66, 0, 0, s * 0.25);
    });
    t.tubo('hose', [[s * 0.24, 0.3, 0.58], [s * 0.18, 0.25, 0.58], [s * 0.12, 0.27, 0.62]], () => [0.016, 0.016], 6, 6);
  });
  t.det(() => {
    for (const xx of [-0.12, -0.04, 0.04, 0.12]) t.torno('chrome', [[0.022, 0], [0.024, 0.04], [0.036, 0.07], [0.034, 0.072], [0.02, 0.05]], xx, 0.42, 0.72, 0, 0, 0, 10);
  });
  // remaches a lo largo del ribete
  t.det(() => {
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const c = Math.cos(a);
      const sn = Math.sin(a);
      t.pieza('chrome', 'cono', [Math.sign(c) * Math.pow(Math.abs(c), 0.25) * 0.4, 0.225, Math.sign(sn) * Math.pow(Math.abs(sn), 0.25) * 0.72], [Math.sign(c) * Math.pow(Math.abs(c), 0.25) * 0.4, 0.237, Math.sign(sn) * Math.pow(Math.abs(sn), 0.25) * 0.72], 0.008);
    }
  });
  // faros delanteros con cristal y reflector, pilotos traseros rojos
  t.par((s) => {
    t.torno('chrome', [[0, 0], [0.048, 0], [0.05, 0.05], [0.044, 0.055]], s * 0.3, 0.3, -0.8, -Math.PI / 2, 0, 0, 14);
    t.esf('lens', s * 0.3, 0.3, -0.856, 0.04, 0.04, 0.012);
    t.caja('brakeLight', 0.07, 0.03, 0.012, s * 0.25, 0.28, 0.846);
  });
  t.caja('glow', 0.4, 0.02, 0.01, 0, 0.27, 0.845);
  // piloto de cola: luz del color de la criatura (identidad de noche y desde atrás)
  t.caja('glow', 0.12, 0.04, 0.012, 0, 0.36, 0.846);
  t.par((s) => t.caja('gold', 0.012, 0.05, 0.014, s * 0.066, 0.36, 0.846));
  // trono del piloto: asiento negro y respaldo bajo de laca oscura con marco de oro abierto
  const [sy, sz] = spec.silla;
  const base = t.bajo ? new THREE.BoxGeometry(0.38, 0.07, 0.34) : new RoundedBoxGeometry(0.38, 0.07, 0.34, 1, 0.025);
  t.add('seat', base, 0, sy - 0.03, sz);
  base.dispose();
  const resp = new THREE.CylinderGeometry(0.2, 0.19, 0.22, 14, 1, true, -Math.PI / 2, Math.PI);
  t.add('lacaOscura', resp, 0, sy + 0.08, sz + 0.15, 0.12, 0, 0);
  resp.dispose();
  const forro = new THREE.CylinderGeometry(0.185, 0.175, 0.2, 14, 1, true, -Math.PI / 2, Math.PI);
  t.add('seat', forro, 0, sy + 0.08, sz + 0.14, 0.12, 0, 0);
  forro.dispose();
  t.toro('gold', 0.2, 0.014, 0, sy + 0.19, sz + 0.165, Math.PI / 2 + 0.12, 0, 0, Math.PI);
  t.par((s) => {
    t.pieza('gold', 'cil', [s * 0.2, sy - 0.03, sz + 0.13], [s * 0.2, sy + 0.2, sz + 0.16], 0.012);
    t.det(() => rizo(t, 'gold', s * 0.2, sy + 0.24, sz + 0.16, 0.04, 0.011, s > 0 ? 0 : Math.PI, 0));
  });
  t.chasis();
  // escapes de bronce acampanados
  for (const [x, y, z] of spec.escapes ?? ESCAPES_DEF) {
    t.torno('exhaust', [[0.05, 0], [0.052, 0.12], [0.06, 0.2], [0.078, 0.25], [0.07, 0.255], [0.05, 0.22]], x, y, z - 0.22, Math.PI / 2 - 0.16, 0, 0, 14);
    // colector que baja al motor
    t.tubo('exhaust', [[x * 0.6, 0.34, 0.56], [x * 0.9, 0.36, z - 0.24], [x, y - 0.02, z - 0.2]], () => [0.03, 0.03], 8, 7);
    t.toro('gold', 0.074, 0.012, x, y - 0.04 + 0.0, z + 0.025, -0.16, 0, 0, Math.PI * 2, 1, 1, 1, 16);
    t.toro('gold', 0.054, 0.01, x, y - 0.012, z - 0.1, -0.16, 0, 0, Math.PI * 2, 1, 1, 1, 14);
  }
}
