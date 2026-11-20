/** 麒麟 Qilin Relámpago: escamas doradas, cornamenta, crin de fuego de jade, pezuñas de oro sobre nubes. */
import type { Criatura } from './comun';
import { lerp, ojos, llamaDoble, patas } from './comun';
import type { Taller } from '../modelo/taller';
import type { V3 } from '../modelo/taller';

export const qilin: Criatura = {
  silla: [0.72, 0.1],
  ojo: 0x5dffd8,
  segundo: 0xfff6e0,
  traje: 0x23a040,
  llama: 0x7fffc8,
  aliento: 0xbfffe0,
  boca: [0, 0.9, -1.04],
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
    // cuello corto y robusto
    t.tubo('body', [[0, 0.64, -0.4], [0, 0.78, -0.56], [0, 0.88, -0.64]], (u) => [lerp(0.15, 0.115, u), lerp(0.16, 0.115, u)], 10, 12);
    // crin abundante de llamas de jade (luminosa)
    for (let i = 0; i < 7; i++) {
      const b: V3 = [0, 0.72 + i * 0.04, -0.4 - i * 0.04];
      melena(t, b, [0, b[1] + 0.26, b[2] + 0.26], 0.075);
      t.par((s) => melena(t, [s * 0.05, b[1] - 0.02, b[2]], [s * 0.2, b[1] + 0.16, b[2] + 0.24], 0.06));
    }
    // ---------------------------------------------------------------- cabeza de dragón-caballo
    t.cabeza([0, 0.88, -0.66]);
    t.esf('body', 0, 0.95, -0.74, 0.14, 0.13, 0.15);
    // hocico ancho y chato
    t.esf('body', 0, 0.89, -0.9, 0.12, 0.08, 0.11);
    t.esf('secondTex', 0, 0.84, -0.92, 0.105, 0.045, 0.1);
    t.esf('gold', 0, 0.92, -1.0, 0.07, 0.04, 0.03);
    t.par((s) => t.esf('dark', s * 0.035, 0.92, -1.025, 0.014, 0.01, 0.008));
    ojos(t, 0.085, 0.99, -0.83, 0.04, 'gold', 0.5, 0.18);
    t.par((s) => {
      // cuernos de dragón lisos que se curvan hacia atrás
      t.tubo('gold', [[s * 0.06, 1.05, -0.74], [s * 0.12, 1.17, -0.62], [s * 0.15, 1.2, -0.44]], (u) => [0.03 * (1 - u * 0.8), 0.03 * (1 - u * 0.8)], 12, 8);
      // orejas
      t.pieza('body', 'esf', [s * 0.1, 1.0, -0.66], [s * 0.26, 1.04, -0.6], 0.045, 0.016, [s, 0.4, 0]);
      t.pieza('mane', 'esf', [s * 0.11, 1.005, -0.665], [s * 0.24, 1.04, -0.61], 0.03, 0.01, [s, 0.4, 0]);
      // bigotes de llama en las mejillas
      melena(t, [s * 0.1, 0.88, -0.86], [s * 0.26, 0.84, -0.7], 0.035);
    });
    // flequillo y gran barba de llama
    melena(t, [0, 1.06, -0.8], [0, 1.12, -0.98], 0.045);
    melena(t, [0, 0.82, -0.9], [0, 0.6, -0.82], 0.06);
    t.par((s) => melena(t, [s * 0.05, 0.82, -0.88], [s * 0.1, 0.64, -0.78], 0.045));
    for (let i = 0; i < 7; i++) {
      const a = -1.4 + i * 0.47;
      melena(t, [Math.sin(a) * 0.11, 0.97 + Math.cos(a) * 0.09, -0.62], [Math.sin(a) * 0.3, 1.04 + Math.cos(a) * 0.14, -0.38], 0.06);
    }
    t.estatico();
    // patas con pezuñas de oro y mechones de fuego
    patas(t, 'body', 'gold', 0.075, [-0.42, 0.55], [0.38, 0.56], false, true);
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

/** Llama de la crin: jade luminoso con punta blanca. */
function melena(t: Taller, a: V3, b: V3, r: number) {
  if (t.bajo) {
    t.pieza('mane', 'cono', a, b, r, r * 0.75);
    return;
  }
  const m: V3 = [lerp(a[0], b[0], 0.5), lerp(a[1], b[1], 0.5) + r * 0.4, lerp(a[2], b[2], 0.5)];
  t.pieza('mane', 'esf', a, m, r * 1.15, r * 0.85);
  t.pieza('mane', 'cono', m, b, r * 0.8, r * 0.6);
  t.pieza('accentTip', 'cono', [lerp(m[0], b[0], 0.4), lerp(m[1], b[1], 0.4), lerp(m[2], b[2], 0.4)], [b[0] + (b[0] - m[0]) * 0.2, b[1] + (b[1] - m[1]) * 0.2, b[2] + (b[2] - m[2]) * 0.2], r * 0.35, r * 0.28);
}
