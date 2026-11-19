/** 白虎 Tigre Blanco: pelaje blanco con rayas, 王 en la frente, relámpagos violeta y cola que se riza. */
import * as THREE from 'three';
import type { Criatura } from './comun';
import { lerp, ojos, patas } from './comun';
import type { V3 } from '../modelo/taller';

export const tigre: Criatura = {
  silla: [0.68, 0.14],
  ojo: 0x9fd8ff,
  segundo: 0xffffff,
  traje: 0x7a2fd0,
  llama: 0x7a8aff,
  aliento: 0x7ac8ff,
  boca: [0, 0.56, -1.09],
  textura: 'rayas',
  repetir: 1.3,
  piloto: { piel: 0xffe0cc, pelo: 0xeef0ff, peinado: 'coleta', tocado: 'orejas' },
  construir(t) {
    t.tubo('body', [[0, 0.55, 0.58], [0, 0.58, 0.25], [0, 0.55, -0.18], [0, 0.55, -0.5]], (u) => {
      const r = 0.21 + 0.05 * Math.sin(Math.PI * u);
      return [r, r * 0.96];
    }, 16, 14);
    t.esf('second', 0, 0.45, -0.52, 0.21, 0.2, 0.17);
    t.esf('second', 0, 0.42, 0.05, 0.16, 0.1, 0.36);
    t.par((s) => {
      // relámpagos en hombros y ancas
      for (const [z0, y0] of [[-0.55, 0.72], [0.32, 0.74]]) {
        const zz: V3[] = [[s * 0.26, y0, z0], [s * 0.31, y0 - 0.1, z0 + 0.1], [s * 0.27, y0 - 0.12, z0 + 0.17], [s * 0.32, y0 - 0.26, z0 + 0.3]];
        for (let i = 0; i < 2; i++) t.pieza('accent', 'cono', zz[i], zz[i + 1], 0.03, 0.008, [s, 0, 0]);
        t.pieza('accentTip', 'cono', zz[2], zz[3], 0.026, 0.008, [s, 0, 0]);
      }
    });
    patas(t, 'body', 'second', 0.08, [-0.5, 0.5], [0.4, 0.52], true);
    // ---------------------------------------------------------------- cabeza grande (chibi)
    t.cabeza([0, 0.64, -0.7]);
    // cabeza baja y adelantada: felino al acecho
    t.marco(new THREE.Matrix4().makeTranslation(0, -0.08, -0.05));
    t.esf('body', 0, 0.78, -0.74, 0.22, 0.2, 0.2);
    // carrillos con pelo
    t.par((s) => {
      t.esf('second', s * 0.14, 0.68, -0.84, 0.11, 0.09, 0.09);
      t.pieza('second', 'cono', [s * 0.2, 0.68, -0.78], [s * 0.32, 0.62, -0.72], 0.05, 0.03);
      t.pieza('second', 'cono', [s * 0.2, 0.74, -0.76], [s * 0.31, 0.75, -0.7], 0.04, 0.025);
      // orejas con punta oscura
      t.pieza('body', 'cono', [s * 0.13, 0.92, -0.7], [s * 0.2, 1.07, -0.68], 0.065, 0.032);
      t.pieza({ capa: 'uber', color: 0xc9d4e6, m: 0, r: 0.6 }, 'cono', [s * 0.135, 0.93, -0.712], [s * 0.19, 1.03, -0.7], 0.04, 0.012);
      t.pieza('dark', 'cono', [s * 0.185, 1.03, -0.68], [s * 0.2, 1.08, -0.68], 0.022, 0.016);
      // colmillos
      t.pieza('ivory', 'cono', [s * 0.045, 0.63, -0.95], [s * 0.045, 0.55, -0.97], 0.017);
    });
    t.esf('second', 0, 0.68, -0.92, 0.11, 0.08, 0.08);
    t.esf('second', 0, 0.6, -0.86, 0.09, 0.05, 0.08);
    t.esf('noseTiger', 0, 0.74, -0.995, 0.042, 0.03, 0.025);
    ojos(t, 0.095, 0.82, -0.88, 0.042, 'dark', 0.4, 0.45);
    // 王 en la frente
    t.caja('dark', 0.11, 0.016, 0.014, 0, 0.94, -0.84, -0.7);
    t.caja('dark', 0.085, 0.016, 0.014, 0, 0.915, -0.865, -0.7);
    t.caja('dark', 0.11, 0.016, 0.014, 0, 0.89, -0.89, -0.7);
    t.caja('dark', 0.016, 0.075, 0.014, 0, 0.915, -0.865, -0.7);
    // bigotes de pelo blanco
    t.par((s) => {
      for (const dy of [-0.015, 0.015]) t.pieza('ivory', 'cil', [s * 0.1, 0.7 + dy, -0.95], [s * 0.3, 0.72 + dy * 2.5, -0.9], 0.004);
    });
    t.marco(null);
    t.estatico();
    // cola rayada que se riza
    t.onda('cola', { eje: 'z', o: 0.55, len: 0.55, amp: 0.18, freq: 4.2, giro: 0.45, vert: 0.5, n: 4 });
    t.tubo('body', [[0, 0.6, 0.55], [0, 0.62, 0.8], [0.05, 0.78, 1.0], [0, 0.98, 1.08], [-0.08, 1.1, 0.98]], (u) => [lerp(0.06, 0.04, u), lerp(0.06, 0.04, u)], 16, 9);
    t.esf('dark', -0.08, 1.11, 0.97, 0.05);
    t.estatico();
  },
};
