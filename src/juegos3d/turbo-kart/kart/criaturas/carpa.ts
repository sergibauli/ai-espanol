/** 锦鲤 Carpa Dragón: koi naranja y blanca que culebrea, con aletas de seda, bigotes y cuernos que brotan. */
import type { Criatura } from './comun';
import { lerp, ojos, rizo } from './comun';

export const carpa: Criatura = {
  silla: [0.62, 0.12],
  ojo: 0x6ff7ff,
  segundo: 0xfff4ea,
  traje: 0x13889a,
  llama: 0x4fd8ff,
  aliento: 0x6fe8ff,
  boca: [0, 0.44, -1.1],
  textura: 'koi',
  repetir: 2.2,
  rugosidad: 0.22,
  piloto: { piel: 0xffdcc0, pelo: 0x2a1a12, peinado: 'flequillo', tocado: 'aleta' },
  pintor(x, y, z, c) {
    if (c.g > 0.7) return; // vientre blanco
    // manchas blancas grandes y lunares negros (kohaku / sanke)
    const n = Math.sin(x * 7 + z * 3.4 + 1) * Math.sin(z * 5.1 + 0.7) + Math.sin(y * 8 - z * 3.5) * 0.5;
    if (n > 0.7) c.setRGB(1, 0.97, 0.94);
    else if (Math.sin(z * 17 + x * 5) * Math.sin(x * 19 - z * 3) > 0.8 && y > 0.6 && z > -0.5) c.setRGB(0.04, 0.035, 0.04);
  },
  construir(t) {
    // ---------------------------------------------------------------- cabeza (estática)
    t.esf('body', 0, 0.47, -0.64, 0.27, 0.25, 0.32);
    t.esf('secondTex', 0, 0.36, -0.68, 0.22, 0.13, 0.28);
    t.esf('tancho', 0, 0.69, -0.66, 0.11, 0.035, 0.12, -0.15);
    // labios carnosos y boca redonda
    t.toro('secondTex', 0.07, 0.034, 0, 0.42, -0.94, 0, 0, 0, Math.PI * 2, 1, 0.85, 1);
    t.esf('dark', 0, 0.42, -0.945, 0.055, 0.045, 0.02);
    // ojos grandes a los lados
    ojos(t, 0.165, 0.56, -0.83, 0.068, 'body', 0.75, 0.05);
    t.par((s) => {
      // cuernos de dragón que brotan
      t.tubo('gold', [[s * 0.08, 0.66, -0.72], [s * 0.11, 0.78, -0.66], [s * 0.15, 0.86, -0.54]], (u) => [0.032 * (1 - u * 0.8), 0.032 * (1 - u * 0.8)], 10, 7);
      t.pieza('gold', 'cono', [s * 0.1, 0.76, -0.66], [s * 0.18, 0.8, -0.72], 0.014);
      // opérculo dorado
      t.toro('gold', 0.21, 0.016, s * 0.17, 0.46, -0.5, 0, s * 1.25, 0, Math.PI * 0.8, 1, 1, 1, 14);
      // aletas pélvicas
      t.pieza('accentFin', 'esf', [s * 0.12, 0.28, 0.0], [s * 0.32, 0.14, 0.3], 0.08, 0.012);
    });
    // aletas pectorales que reman (seda iridiscente con radios de oro)
    t.par((s) => {
      t.ala(s, [s * 0.24, 0.38, -0.5], { base: 0.1, amp: 0.45, freq: 6.5, eje: 'y' });
      t.pieza('accentFin', 'esf', [s * 0.24, 0.38, -0.5], [s * 0.64, 0.28, -0.22], 0.13, 0.014, [0, 1, 0]);
      for (const a of [-0.08, 0, 0.08]) t.pieza('gold', 'cil', [s * 0.24, 0.385, -0.5], [s * 0.6, 0.3 + a, -0.24 + a], 0.005);
    });
    // bigotes largos
    t.par((s) => {
      t.onda(s < 0 ? 'bigoteI' : 'bigoteD', { eje: 'z', o: -1.02, len: 0.7, amp: 0.14, freq: 4, giro: 0.2, vert: 0.8, n: 3 });
      t.tubo('gold', [[s * 0.06, 0.4, -1.0], [s * 0.24, 0.36, -0.98], [s * 0.42, 0.42, -0.74], [s * 0.54, 0.54, -0.4]], (u) => [lerp(0.016, 0.005, u), lerp(0.016, 0.005, u)], 14, 6);
      t.estatico();
    });
    // salpicaduras de agua bajo la cabeza
    t.par((s) => {
      rizo(t, 'accentFin', s * 0.3, 0.2, -0.8, 0.06, 0.014, s * Math.PI / 2, 0);
      t.esf('accentTip', s * 0.36, 0.28, -0.9, 0.025);
      t.esf('accentTip', s * 0.4, 0.33, -0.82, 0.016);
    });
    // ---------------------------------------------------------------- cuerpo que culebrea con la cola
    t.onda('cola', { eje: 'z', o: -0.25, len: 1.15, amp: 0.13, freq: 5.5, giro: 0.4, vert: 0.25, n: 4 });
    t.tubo('body', [[0, 0.45, -0.5], [0, 0.5, -0.2], [0, 0.53, 0.2], [0, 0.53, 0.52], [0, 0.5, 0.82]], (u) => {
      const r = 0.07 + 0.22 * Math.cos(u * Math.PI * 0.5);
      return [r * 0.95, r * 1.08];
    }, 20, 14);
    t.esf('secondTex', 0, 0.36, -0.05, 0.2, 0.12, 0.42);
    // aleta dorsal detrás del piloto y gran aleta caudal ahorquillada
    t.pieza('accentFin', 'esf', [0, 0.66, 0.3], [0, 0.94, 0.74], 0.14, 0.014, [1, 0, 0]);
    for (const k of [0.3, 0.55, 0.8]) t.pieza('gold', 'cil', [0, 0.68, lerp(0.32, 0.6, k)], [0, lerp(0.8, 0.95, k), lerp(0.5, 0.74, k)], 0.005);
    t.pieza('accentFin', 'esf', [0, 0.52, 0.76], [0, 0.98, 1.3], 0.19, 0.014, [1, 0, 0]);
    t.pieza('accentFin', 'esf', [0, 0.48, 0.76], [0, 0.1, 1.24], 0.17, 0.014, [1, 0, 0]);
    for (const [y, z] of [[0.94, 1.24], [0.74, 1.24], [0.14, 1.19], [0.32, 1.22]]) t.pieza('gold', 'cil', [0, 0.5, 0.8], [0, y, z], 0.006);
    t.esf('gold', 0, 0.5, 0.79, 0.04);
    t.pieza('accentFin', 'esf', [0, 0.32, 0.45], [0, 0.16, 0.72], 0.07, 0.012, [1, 0, 0]);
    t.estatico();
  },
};
