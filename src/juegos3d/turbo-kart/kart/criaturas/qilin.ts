/** 麒麟 Qilin Relámpago: escamas doradas, cornamenta, crin de fuego de jade, pezuñas de oro sobre nubes. */
import type { Criatura } from './comun';
import { lerp, ojos, llamaDoble, patas } from './comun';
import type { V3 } from '../modelo/taller';

export const qilin: Criatura = {
  silla: [0.72, 0.1],
  ojo: 0x5dffd8,
  segundo: 0xfff6e0,
  traje: 0x23a040,
  llama: 0x7fffc8,
  aliento: 0xbfffe0,
  boca: [0, 0.98, -1.06],
  textura: 'escamas',
  repetir: 1.8,
  metal: 0.4,
  rugosidad: 0.3,
  piloto: { piel: 0xffdcc4, pelo: 0x3a2214, peinado: 'dosMonos', tocado: 'astas' },
  construir(t) {
    t.tubo('body', [[0, 0.56, 0.52], [0, 0.6, 0.2], [0, 0.58, -0.2], [0, 0.64, -0.45]], (u) => {
      const r = 0.2 + 0.045 * Math.sin(Math.PI * u);
      return [r * 0.95, r];
    }, 16, 14);
    t.esf('secondTex', 0, 0.46, -0.02, 0.17, 0.12, 0.42);
    // cuello
    t.tubo('body', [[0, 0.64, -0.4], [0, 0.82, -0.58], [0, 0.98, -0.66]], (u) => [lerp(0.14, 0.1, u), lerp(0.15, 0.1, u)], 10, 12);
    // crin de llamas de jade a lo largo del cuello
    for (let i = 0; i < 6; i++) {
      const b: V3 = [0, 0.74 + i * 0.055, -0.42 - i * 0.045];
      llamaDoble(t, b, [0, b[1] + 0.18, b[2] + 0.2], 0.05, [0, 0.03, 0]);
    }
    // ---------------------------------------------------------------- cabeza
    t.cabeza([0, 0.98, -0.66]);
    t.esf('body', 0, 1.04, -0.74, 0.13, 0.125, 0.16);
    t.esf('body', 0, 0.99, -0.9, 0.085, 0.075, 0.12);
    t.esf('gold', 0, 1.0, -1.01, 0.045, 0.035, 0.03);
    t.esf('secondTex', 0, 0.94, -0.9, 0.07, 0.04, 0.09);
    ojos(t, 0.08, 1.08, -0.82, 0.036, 'gold', 0.5, 0.25);
    t.par((s) => {
      // cornamenta de ciervo dorada
      t.tubo('gold', [[s * 0.05, 1.13, -0.72], [s * 0.1, 1.26, -0.66], [s * 0.18, 1.38, -0.56], [s * 0.2, 1.48, -0.48]], (u) => [0.028 * (1 - u * 0.7), 0.028 * (1 - u * 0.7)], 12, 7);
      t.pieza('gold', 'cono', [s * 0.1, 1.26, -0.66], [s * 0.22, 1.32, -0.74], 0.016);
      t.pieza('gold', 'cono', [s * 0.17, 1.37, -0.57], [s * 0.3, 1.42, -0.6], 0.013);
      // orejas
      t.pieza('body', 'esf', [s * 0.09, 1.1, -0.66], [s * 0.25, 1.14, -0.6], 0.045, 0.016, [s, 0.4, 0]);
      t.pieza('accent', 'esf', [s * 0.1, 1.105, -0.665], [s * 0.23, 1.14, -0.61], 0.03, 0.01, [s, 0.4, 0]);
    });
    // flequillo y barba de llama
    llamaDoble(t, [0, 1.15, -0.78], [0, 1.2, -0.95], 0.04);
    llamaDoble(t, [0, 0.93, -0.9], [0, 0.8, -0.84], 0.03);
    for (let i = 0; i < 5; i++) {
      const a = -1.2 + i * 0.6;
      llamaDoble(t, [Math.sin(a) * 0.1, 1.06 + Math.cos(a) * 0.08, -0.62], [Math.sin(a) * 0.22, 1.12 + Math.cos(a) * 0.1, -0.42], 0.04);
    }
    t.estatico();
    // patas con pezuñas de oro y mechones de fuego
    patas(t, 'body', 'gold', 0.05, [-0.42, 0.55], [0.38, 0.56], false, true);
    t.par((s) => {
      llamaDoble(t, [s * 0.22, 0.36, -0.6], [s * 0.28, 0.5, -0.35], 0.045);
      llamaDoble(t, [s * 0.22, 0.36, 0.7], [s * 0.28, 0.52, 0.95], 0.045);
      llamaDoble(t, [s * 0.2, 0.6, 0.42], [s * 0.3, 0.76, 0.62], 0.05);
      // nubes bajo las pezuñas
      for (const z of [-0.82, 0.82]) {
        t.esf('cloud', s * 0.24, 0.08, z, 0.1, 0.05, 0.08);
        t.esf('cloud', s * 0.31, 0.1, z + 0.05, 0.06, 0.04, 0.05);
      }
    });
    // collar de oro con cascabel de jade
    t.toro('gold', 0.15, 0.018, 0, 0.72, -0.52, Math.PI / 2 - 0.7, 0, 0, Math.PI * 2, 1, 1, 1, 18);
    t.esf('jade', 0, 0.62, -0.64, 0.04);
    // cola de llama (cadena)
    t.onda('cola', { eje: 'z', o: 0.48, len: 0.55, amp: 0.16, freq: 5, giro: 0.45, vert: 0.6, n: 3 });
    t.tubo('body', [[0, 0.6, 0.48], [0, 0.72, 0.7], [0, 0.86, 0.84]], () => [0.05, 0.05], 8, 8);
    for (const [x, y, z] of [[0, 1.14, 1.04], [0.13, 1.02, 1.1], [-0.13, 1.02, 1.1], [0, 0.9, 1.16]] as V3[]) {
      llamaDoble(t, [0, 0.86, 0.84], [x, y, z], 0.065);
    }
    t.estatico();
  },
};
