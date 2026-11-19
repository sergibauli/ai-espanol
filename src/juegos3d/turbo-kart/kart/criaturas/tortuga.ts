/** 玄武 Tortuga Negra: caparazón hexagonal con aro de oro y vetas luminosas, y la serpiente que se alza. */
import * as THREE from 'three';
import type { Criatura } from './comun';
import { ojos } from './comun';
import type { V3 } from '../modelo/taller';

export const tortuga: Criatura = {
  silla: [0.8, 0.12],
  ojo: 0x5ff0ff,
  segundo: 0x2f6a58,
  traje: 0x23399a,
  llama: 0x40e8ff,
  aliento: 0x40e8ff,
  boca: [0, 0.48, -1.18],
  textura: 'hex',
  repetir: 1,
  rugosidad: 0.28,
  escapes: [[-0.22, 0.3, 0.76], [0.22, 0.3, 0.76]],
  piloto: { piel: 0xf2cfae, pelo: 0x101418, peinado: 'corto', tocado: 'general' },
  construir(t) {
    // caparazón en cúpula
    const cupula = new THREE.SphereGeometry(1, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    t.add('body', cupula, 0, 0.32, 0.06, 0, 0, 0, 0.52, 0.46, 0.68);
    cupula.dispose();
    t.esf('second', 0, 0.3, 0.06, 0.55, 0.065, 0.71);
    t.toro('gold', 1, 0.045, 0, 0.34, 0.06, Math.PI / 2, 0, 0, Math.PI * 2, 0.53, 0.69, 0.7, 32);
    // vetas luminosas y tachones de oro
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const pts: V3[] = [];
      for (let k = 0; k <= 6; k++) {
        const th = 0.25 + (k / 6) * 1.2;
        pts.push([Math.cos(a) * Math.sin(th) * 0.53, 0.32 + Math.cos(th) * 0.47, 0.06 + Math.sin(a) * Math.sin(th) * 0.69]);
      }
      t.tubo('accent', pts, () => [0.012, 0.012], 10, 5);
      t.esf('gold', Math.cos(a) * 0.38, 0.62, 0.06 + Math.sin(a) * 0.5, 0.035, 0.022, 0.035);
    }
    t.esf('gold', 0, 0.79, 0.06, 0.05, 0.025, 0.05);
    // aletas traseras fijas
    t.par((s) => t.pieza('second', 'esf', [s * 0.36, 0.26, 0.5], [s * 0.6, 0.2, 0.74], 0.08, 0.025));
    // aletas delanteras que reman
    t.par((s) => {
      t.ala(s, [s * 0.38, 0.28, -0.4], { base: 0.05, amp: 0.32, freq: 3, eje: 'y' });
      t.pieza('second', 'esf', [s * 0.38, 0.28, -0.4], [s * 0.76, 0.22, -0.6], 0.12, 0.03);
      t.pieza('gold', 'cil', [s * 0.4, 0.3, -0.41], [s * 0.7, 0.25, -0.58], 0.008);
      t.pieza('accent', 'cil', [s * 0.42, 0.29, -0.38], [s * 0.72, 0.23, -0.55], 0.005);
    });
    // cuello
    t.estatico();
    t.tubo('second', [[0, 0.36, -0.45], [0, 0.4, -0.75], [0, 0.46, -0.94]], () => [0.11, 0.1], 8, 10);
    // ---------------------------------------------------------------- cabeza
    t.cabeza([0, 0.46, -0.9]);
    t.esf('second', 0, 0.5, -1.0, 0.14, 0.12, 0.16);
    t.esf('serpBelly', 0, 0.44, -1.02, 0.11, 0.07, 0.12);
    t.pieza('gold', 'cono', [0, 0.49, -1.1], [0, 0.44, -1.2], 0.045, 0.035);
    ojos(t, 0.085, 0.56, -1.07, 0.034, 'second', 0.55, 0.3);
    t.par((s) => t.pieza('gold', 'esf', [s * 0.02, 0.6, -1.1], [s * 0.12, 0.62, -0.96], 0.03, 0.02, [0, 1, 0]));
    t.estatico();
    // la serpiente: rodea el caparazón y se alza detrás del piloto
    t.onda('serpiente', { eje: 'y', o: 0.5, len: 0.65, amp: 0.1, freq: 2.4, giro: 0.25, vert: 0.6, n: 4 });
    const sp: V3[] = [[-0.38, 0.3, -0.44], [-0.55, 0.34, 0.0], [-0.46, 0.36, 0.52], [-0.1, 0.4, 0.8], [0.3, 0.44, 0.68], [0.42, 0.66, 0.48], [0.36, 0.94, 0.42], [0.34, 1.12, 0.28]];
    t.tubo('serpent', sp, (u) => {
      const r = 0.028 + 0.06 * Math.min(1, u * 2.2);
      return [r, r];
    }, 34, 10);
    t.tubo('serpBelly', sp.slice(4).map((p) => [p[0] - 0.03, p[1], p[2] - 0.05] as V3), () => [0.035, 0.035], 14, 6);
    t.esf('serpent', 0.34, 1.17, 0.19, 0.085, 0.068, 0.12);
    t.esf('serpent', 0.34, 1.15, 0.09, 0.058, 0.045, 0.06);
    t.par((s) => {
      t.esf('ivory', 0.34 + s * 0.055, 1.21, 0.13, 0.026);
      t.esf('eye', 0.34 + s * 0.06, 1.212, 0.115, 0.017);
      t.esf('pupil', 0.34 + s * 0.064, 1.212, 0.106, 0.006, 0.014, 0.006);
    });
    t.pieza('tongue', 'cono', [0.34, 1.13, 0.05], [0.31, 1.12, -0.06], 0.009);
    t.pieza('tongue', 'cono', [0.34, 1.13, 0.05], [0.37, 1.12, -0.06], 0.009);
    // capucha con escamas de jade
    t.par((s) => t.pieza('accent', 'esf', [0.34, 1.12, 0.22], [0.34 + s * 0.16, 1.1, 0.3], 0.07, 0.014, [s, 0, 0]));
    t.estatico();
  },
};
