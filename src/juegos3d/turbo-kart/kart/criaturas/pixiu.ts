/** 貔貅 Pixiu Dorado: bestia de oro macizo con un solo cuerno, alas cortas, ojos de jade y monedas. */
import * as THREE from 'three';
import type { Criatura } from './comun';
import { ojos, patas, llamaDoble } from './comun';
import type { V3 } from '../modelo/taller';

export const pixiu: Criatura = {
  silla: [0.74, 0.16],
  ojo: 0x2ee6a0,
  segundo: 0xfff0c8,
  traje: 0x8a5a1a,
  llama: 0xffd040,
  aliento: 0xffd860,
  metal: 0.8,
  rugosidad: 0.28,
  boca: [0, 0.72, -1.08],
  textura: 'oro',
  repetir: 1.8,
  pluma: 0xffc84a,
  piloto: { piel: 0xf0c8a0, pelo: 0x1a1410, peinado: 'bigote', tocado: 'lingote' },
  construir(t) {
    t.tubo('body', [[0, 0.55, 0.58], [0, 0.6, 0.2], [0, 0.6, -0.2], [0, 0.66, -0.48]], (u) => {
      const r = 0.24 + 0.06 * Math.sin(Math.PI * u);
      return [r * 1.02, r];
    }, 16, 14);
    t.esf('secondTex', 0, 0.44, -0.08, 0.22, 0.16, 0.42);
    // monedas de oro con agujero cuadrado en el pecho
    for (const [x, y] of [[-0.11, 0.6], [0, 0.53], [0.11, 0.6]]) {
      const coin = new THREE.CylinderGeometry(0.065, 0.065, 0.018, 18);
      t.add('gold', coin, x, y, -0.66, Math.PI / 2 - 0.3, 0, 0);
      coin.dispose();
      t.caja('dark', 0.028, 0.028, 0.022, x, y, -0.665, -0.3, 0, 0);
    }
    patas(t, 'body', 'gold', 0.085, [-0.44, 0.6], [0.4, 0.55], true);
    // alas cortas iridiscentes
    t.par((s) => {
      t.ala(s, [s * 0.22, 0.84, -0.26], { base: 0.45, amp: 0.3, freq: 5.5 });
      for (let i = 0; i < 5; i++) {
        const ang = -0.2 + i * 0.3;
        const L = 0.56 - i * 0.06;
        t.pieza('feather', 'esf', [s * 0.22, 0.84, -0.26 + i * 0.03], [s * (0.22 + Math.cos(ang) * L), 0.94 - i * 0.03, -0.26 + Math.sin(ang) * L], 0.075, 0.014);
      }
      t.tubo('secondTex', [[s * 0.18, 0.82, -0.28], [s * 0.42, 0.9, -0.24]], () => [0.045, 0.045], 4, 8);
      t.esf('gold', s * 0.42, 0.9, -0.24, 0.04);
      t.estatico();
    });
    // nubes de jade en las ancas
    t.par((s) => {
      t.esf('eye', s * 0.29, 0.72, -0.42, 0.045, 0.045, 0.03);
      t.toro('gold', 0.055, 0.014, s * 0.3, 0.72, -0.42, 0, s * 1.2, 0);
      t.esf('eye', s * 0.3, 0.62, 0.36, 0.04, 0.04, 0.028);
      t.toro('gold', 0.05, 0.012, s * 0.31, 0.62, 0.36, 0, s * 1.3, 0);
    });
    // ---------------------------------------------------------------- cabeza feroz
    t.cabeza([0, 0.8, -0.66]);
    t.esf('body', 0, 0.87, -0.78, 0.21, 0.19, 0.2);
    t.esf('body', 0, 0.79, -0.96, 0.13, 0.1, 0.11);
    // boca muy abierta (se traga el oro)
    t.esf('body', 0, 0.63, -0.9, 0.12, 0.05, 0.11, 0.25);
    t.esf('dark', 0, 0.7, -0.95, 0.11, 0.06, 0.08);
    t.esf('tongue', 0, 0.67, -0.97, 0.07, 0.022, 0.06);
    t.par((s) => {
      t.pieza('ivory', 'cono', [s * 0.07, 0.75, -1.0], [s * 0.07, 0.65, -1.02], 0.018);
      t.pieza('ivory', 'cono', [s * 0.06, 0.65, -0.98], [s * 0.06, 0.71, -0.99], 0.014);
      t.pieza('body', 'cono', [s * 0.15, 0.99, -0.72], [s * 0.26, 1.08, -0.62], 0.055, 0.028);
      t.pieza('gold', 'esf', [s * 0.03, 0.98, -0.93], [s * 0.2, 1.0, -0.84], 0.04, 0.03, [0, 0, -1]);
    });
    t.esf('gold', 0, 0.83, -1.06, 0.05, 0.038, 0.032);
    ojos(t, 0.105, 0.92, -0.9, 0.045, 'body', 0.42, 0.35);
    // un solo cuerno con anillo y gema
    t.tubo('gold', [[0, 1.02, -0.8], [0, 1.16, -0.7], [0, 1.26, -0.56], [0, 1.3, -0.44]], (u) => [0.05 * (1 - u * 0.85), 0.05 * (1 - u * 0.85)], 12, 9);
    t.toro('jade', 0.05, 0.014, 0, 1.06, -0.78, -0.4);
    t.esf('eye', 0, 1.02, -0.9, 0.035, 0.035, 0.02);
    // melena de llamas doradas
    for (let i = 0; i < 9; i++) {
      const a = -1.8 + (i / 8) * 3.6;
      const b: V3 = [Math.sin(a) * 0.17, 0.87 + Math.cos(a) * 0.15, -0.62];
      llamaDoble(t, b, [b[0] + Math.sin(a) * 0.22, b[1] + Math.cos(a) * 0.12, -0.34], 0.055);
    }
    for (const x of [-0.06, 0, 0.06]) llamaDoble(t, [x, 0.6, -0.9], [x * 1.8, 0.46, -0.8], 0.03);
    t.estatico();
    // cola con llamas
    t.onda('cola', { eje: 'z', o: 0.55, len: 0.42, amp: 0.15, freq: 4.5, giro: 0.4, vert: 0.5, n: 3 });
    t.tubo('body', [[0, 0.65, 0.56], [0, 0.82, 0.75], [0.05, 0.96, 0.72], [0.08, 0.97, 0.6]], () => [0.055, 0.055], 10, 8);
    for (const [x, y, z] of [[0.08, 1.16, 0.66], [0.2, 1.05, 0.6], [-0.04, 1.09, 0.5]] as V3[]) llamaDoble(t, [0.08, 0.97, 0.6], [x, y, z], 0.055);
    t.estatico();
  },
};
