/**
 * Lo que comparten todos los vehículos: chasis de laca negra con ribetes de oro, motores laterales
 * con anillos luminosos, parachoques con nube ruyi, trono del piloto, escapes de bronce y ruedas de
 * fuego (风火轮) con llanta dorada.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { Taller, V3 } from './taller';
import type { Criatura } from '../criaturas/comun';
import { rizo } from '../criaturas/comun';

export const WHEEL_R_F = 0.23;
export const WHEEL_R_R = 0.25;
export const WHEEL_W_F = 0.24;
export const WHEEL_W_R = 0.28;
export const WHEEL_X = 0.52;
export const WHEEL_Z_F = -0.52;
export const WHEEL_Z_R = 0.5;
export const ESCAPES_DEF: V3[] = [[-0.17, 0.4, 0.8], [0.17, 0.4, 0.8]];

/** Rueda en coordenadas locales (centro en el origen, eje X). */
export function rueda(t: Taller, radius: number, width: number, llanta = 'rimDark') {
  const tube = width * 0.5;
  // neumático gordo con banda de rodadura y tacos
  t.toro('tire', radius - tube * 0.78, tube, 0, 0, 0, 0, Math.PI / 2, 0, Math.PI * 2, 1, 1, 1, 22);
  const banda = new THREE.CylinderGeometry(radius * 0.985, radius * 0.985, width * 0.8, t.bajo ? 10 : 22, 1, true);
  t.add('tire', banda, 0, 0, 0, 0, 0, Math.PI / 2);
  banda.dispose();
  const taco = new THREE.BoxGeometry(width * 0.7, 0.026, 0.05);
  for (let i = 0; i < (t.bajo ? 0 : 16); i++) {
    const a = (i / 16) * Math.PI * 2;
    t.add('tire', taco, 0, Math.cos(a) * radius, Math.sin(a) * radius, a, (i % 2 ? 1 : -1) * 0.3, 0);
  }
  taco.dispose();
  for (const lado of [-1, 1]) {
    const x = lado * width * 0.4;
    // llanta: plato de laca roja, aro de oro, cinco radios en nube y buje
    const plato = new THREE.CylinderGeometry(radius * 0.64, radius * 0.6, 0.03, t.bajo ? 8 : 16);
    t.add(llanta, plato, x, 0, 0, 0, 0, Math.PI / 2);
    plato.dispose();
    t.toro('gold', radius * 0.64, 0.014, x + lado * 0.012, 0, 0, 0, Math.PI / 2, 0, Math.PI * 2, 1, 1, 1, 18);
    for (let i = 0; i < (t.bajo ? 0 : 5); i++) {
      const a = (i / 5) * Math.PI * 2;
      const a2 = a + 0.5;
      t.pieza('gold', 'cil', [x + lado * 0.02, Math.cos(a) * radius * 0.12, Math.sin(a) * radius * 0.12], [x + lado * 0.02, Math.cos(a2) * radius * 0.6, Math.sin(a2) * radius * 0.6], 0.026, 0.008, [lado, 0, 0]);
    }
    const buje = new THREE.ConeGeometry(radius * 0.17, 0.06, 8);
    t.add('gold', buje, x + lado * 0.04, 0, 0, 0, 0, -lado * Math.PI / 2);
    buje.dispose();
  }
}

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
    t.pieza('chrome', 'cil', [s * 0.36, 0.33, -0.24], [s * 0.36, 0.33, 0.32], 0.085);
    for (const z of [-0.1, 0.02, 0.14]) t.toro('glow', 0.088, 0.016, s * 0.36, 0.33, z, 0, 0, 0, Math.PI * 2, 1, 1, 1, 14);
    t.torno('gold', [[0, 0], [0.09, 0], [0.094, 0.025], [0.06, 0.06], [0, 0.07]], s * 0.36, 0.33, -0.24, -Math.PI / 2, 0, 0, 10);
    t.torno('gold', [[0, 0], [0.09, 0], [0.094, 0.02], [0.07, 0.04], [0, 0.045]], s * 0.36, 0.33, 0.32, Math.PI / 2, 0, 0, 10);
    t.esf('glowCore', s * 0.36, 0.33, -0.31, 0.03);
    // ejes y manguetas
    t.pieza('metal', 'cil', [s * 0.12, 0.2, WHEEL_Z_F], [s * (WHEEL_X - 0.1), WHEEL_R_F, WHEEL_Z_F], 0.03);
    t.pieza('metal', 'cil', [s * 0.12, 0.2, WHEEL_Z_R], [s * (WHEEL_X - 0.12), WHEEL_R_R, WHEEL_Z_R], 0.034);
    // guardabarros traseros con rizo de nube
    const guarda = new THREE.CylinderGeometry(WHEEL_R_R + 0.05, WHEEL_R_R + 0.05, 0.12, 18, 1, true, -Math.PI * 0.05, Math.PI * 0.62);
    t.add('guardaLlama', guarda, s * WHEEL_X, WHEEL_R_R, WHEEL_Z_R, 0, 0, Math.PI / 2);
    guarda.dispose();
    t.toro('gold', WHEEL_R_R + 0.052, 0.012, s * (WHEEL_X + 0.06), WHEEL_R_R, WHEEL_Z_R, Math.PI * 0.05 - Math.PI / 2 + Math.PI, Math.PI / 2, 0, Math.PI * 0.62);
  });
  // parachoques delantero: barra dorada curva y placa ruyi de laca roja
  t.tubo('gold', [[-0.4, 0.2, -0.76], [-0.2, 0.22, -0.86], [0, 0.23, -0.9], [0.2, 0.22, -0.86], [0.4, 0.2, -0.76]], () => [0.03, 0.03], 16, 8);
  t.esf('saddle', 0, 0.26, -0.88, 0.13, 0.07, 0.04);
  t.par((s) => t.esf('saddle', s * 0.11, 0.27, -0.86, 0.07, 0.06, 0.035));
  rizo(t, 'gold', 0.1, 0.27, -0.91, 0.04, 0.008, 0, 0);
  rizo(t, 'gold', -0.1, 0.27, -0.91, 0.04, 0.008, Math.PI, 0);
  t.esf('jade', 0, 0.27, -0.92, 0.035);
  // bloque motor trasero con aletas de refrigeración
  const bloque = t.bajo ? new THREE.BoxGeometry(0.46, 0.2, 0.28) : new RoundedBoxGeometry(0.46, 0.2, 0.28, 1, 0.05);
  t.add('metal', bloque, 0, 0.32, 0.7);
  bloque.dispose();
  t.det(() => {
    for (let i = -2; i <= 2; i++) t.caja('gold', 0.012, 0.16, 0.2, i * 0.07, 0.42, 0.7);
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
    t.torno('chrome', [[0.05, 0], [0.052, 0.12], [0.06, 0.2], [0.078, 0.25], [0.07, 0.255], [0.05, 0.22]], x, y, z - 0.22, Math.PI / 2 - 0.16, 0, 0, 14);
    t.toro('gold', 0.074, 0.012, x, y - 0.04 + 0.0, z + 0.025, -0.16, 0, 0, Math.PI * 2, 1, 1, 1, 16);
    t.toro('gold', 0.054, 0.01, x, y - 0.012, z - 0.1, -0.16, 0, 0, Math.PI * 2, 1, 1, 1, 14);
  }
}
