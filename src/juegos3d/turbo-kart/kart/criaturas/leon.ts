/** 石狮 León de Jade: guardián de piedra con melena de rizos, lazo rojo con cascabel y bola bordada. */
import type { Criatura } from './comun';
import { ojos, patas, rizo, llamaDoble } from './comun';

export const leon: Criatura = {
  silla: [0.72, 0.16],
  ojo: 0xffd84a,
  segundo: 0x2a9a5e,
  traje: 0xc0222a,
  llama: 0xffa030,
  aliento: 0xffc040,
  boca: [0, 0.66, -1.06],
  textura: 'piedra',
  repetir: 1.2,
  rugosidad: 0.24,
  piloto: { piel: 0xe8b890, pelo: 0x2a1810, peinado: 'barba', tocado: 'borla' },
  construir(t) {
    t.tubo('body', [[0, 0.55, 0.55], [0, 0.58, 0.2], [0, 0.6, -0.2], [0, 0.66, -0.45]], (u) => {
      const r = 0.23 + 0.06 * Math.sin(Math.PI * u);
      return [r, r * 0.98];
    }, 16, 14);
    patas(t, 'body', 'body', 0.085, [-0.42, 0.58], [0.4, 0.54], false);
    t.par((s) => {
      // rizos en codos y ancas
      rizo(t, 'secondTex', s * 0.27, 0.36, -0.6, 0.05, 0.022, s * Math.PI / 2, 0);
      rizo(t, 'secondTex', s * 0.3, 0.5, 0.42, 0.06, 0.024, s * Math.PI / 2, 0);
      // garras de oro
      for (const dx of [-0.045, 0, 0.045]) t.pieza('gold', 'cono', [s * 0.24 + dx, 0.13, -0.5], [s * 0.24 + dx * 1.2, 0.1, -0.57], 0.016);
    });
    // lazo rojo con cascabel de oro
    t.toro('saddle', 0.23, 0.04, 0, 0.62, -0.55, -0.9, 0, 0, Math.PI * 2, 1, 1, 1, 22);
    t.par((s) => t.pieza('saddle', 'esf', [0, 0.48, -0.7], [s * 0.16, 0.38, -0.74], 0.07, 0.02, [0, 0, -1]));
    t.esf('gold', 0, 0.44, -0.72, 0.065);
    t.caja('dark', 0.075, 0.012, 0.012, 0, 0.42, -0.785);
    // bola bordada que rueda delante
    t.bola([0, 0.16, -1.0]);
    t.esf('saddle', 0, 0.16, -1.0, 0.15);
    for (const [ax, ay] of [[0, Math.PI / 2], [0, 0], [Math.PI / 2, 0], [Math.PI / 4, Math.PI / 4], [-Math.PI / 4, Math.PI / 4]]) {
      t.toro('gold', 0.152, 0.011, 0, 0.16, -1.0, ax, ay, 0, Math.PI * 2, 1, 1, 1, 20);
    }
    // ---------------------------------------------------------------- cabeza grande cuadrada
    t.cabeza([0, 0.78, -0.66]);
    t.esf('body', 0, 0.84, -0.76, 0.24, 0.22, 0.21);
    t.esf('body', 0, 0.75, -0.94, 0.15, 0.1, 0.1);
    t.esf('body', 0, 0.62, -0.88, 0.13, 0.06, 0.1, 0.2);
    // sonrisa enorme con dientes
    t.esf('dark', 0, 0.67, -0.92, 0.12, 0.055, 0.08);
    t.esf('tongue', 0, 0.65, -0.95, 0.07, 0.025, 0.05);
    for (let i = -2; i <= 2; i++) t.caja('ivory', 0.034, 0.026, 0.02, i * 0.038, 0.705, -0.99 + Math.abs(i) * 0.012);
    t.par((s) => t.pieza('ivory', 'cono', [s * 0.09, 0.7, -0.96], [s * 0.09, 0.62, -0.97], 0.016));
    t.esf('secondTex', 0, 0.8, -1.03, 0.06, 0.045, 0.04);
    ojos(t, 0.1, 0.9, -0.9, 0.055, 'secondTex', 0.42, 0.2);
    t.par((s) => {
      t.pieza('secondTex', 'esf', [s * 0.02, 0.98, -0.92], [s * 0.19, 0.99, -0.84], 0.04, 0.035, [0, 0, -1]);
      rizo(t, 'secondTex', s * 0.12, 1.0, -0.86, 0.03, 0.012, 0, 0);
    });
    // melena de rizos en dos anillos con remate de oro
    for (let anillo = 0; anillo < 2; anillo++) {
      const R = 0.22 + anillo * 0.085;
      const n = 11 + anillo * 4;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + anillo * 0.2;
        const x = Math.cos(a) * R;
        const y = 0.84 + Math.sin(a) * R * 0.95;
        if (y < 0.6) continue;
        const z = -0.62 + anillo * 0.08;
        t.esf('secondTex', x, y, z + 0.02, 0.048);
        rizo(t, anillo ? 'gold' : 'secondTex', x, y, z - 0.035, 0.04, 0.012, 0, a);
      }
    }
    t.estatico();
    // llamas en el lomo (crin)
    for (let i = 0; i < 3; i++) llamaDoble(t, [0, 0.84 - i * 0.02, -0.46 + i * 0.08], [0, 0.98 - i * 0.03, -0.3 + i * 0.08], 0.04);
    // cola rizada
    t.onda('cola', { eje: 'z', o: 0.55, len: 0.3, amp: 0.12, freq: 4, giro: 0.35, vert: 0.4, n: 3 });
    t.tubo('body', [[0, 0.62, 0.55], [0, 0.8, 0.68], [0, 0.95, 0.72]], () => [0.05, 0.05], 8, 8);
    t.esf('secondTex', 0, 1.02, 0.74, 0.1);
    t.par((s) => rizo(t, 'secondTex', s * 0.08, 1.06, 0.76, 0.06, 0.022, Math.PI / 2, 0));
    rizo(t, 'gold', 0, 1.02, 0.85, 0.05, 0.012, 0, 0);
    t.estatico();
  },
};
