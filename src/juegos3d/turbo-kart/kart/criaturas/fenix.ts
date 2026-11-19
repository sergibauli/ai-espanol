/** 凤凰 Fénix Aurora: ave de fuego con alas en V que baten, penacho y cola de cinco plumas con ojos. */
import type { Criatura } from './comun';
import { lerp, ojos, llamaDoble } from './comun';
import type { V3 } from '../modelo/taller';

export const fenix: Criatura = {
  silla: [0.6, 0.2],
  ojo: 0xffe066,
  segundo: 0xffb84a,
  traje: 0xc41a24,
  llama: 0xff7a1a,
  aliento: 0xffa52a,
  boca: [0, 1.06, -0.98],
  textura: 'plumas',
  repetir: 1.4,
  pluma: 0xff5a1a,
  piloto: { piel: 0xffd8b8, pelo: 0x1a1018, peinado: 'mono', tocado: 'fenix' },
  construir(t) {
    // torso de ave con pecho dorado
    t.tubo('body', [[0, 0.44, 0.52], [0, 0.48, 0.2], [0, 0.52, -0.15], [0, 0.6, -0.42]], (u) => {
      const r = 0.07 + 0.25 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.1)), 0.6);
      return [r * 1.1, r];
    }, 18, 14);
    t.esf('secondTex', 0, 0.55, -0.44, 0.19, 0.22, 0.15);
    // cuello de cisne
    t.tubo('body', [[0, 0.6, -0.36], [0, 0.76, -0.54], [0, 0.92, -0.62], [0, 1.02, -0.62]], (u) => [lerp(0.15, 0.085, u), lerp(0.15, 0.085, u)], 12, 12);
    // cabeza (hueso propio: mira a la curva)
    t.cabeza([0, 1.0, -0.62]);
    t.esf('body', 0, 1.1, -0.66, 0.15, 0.14, 0.16);
    t.par((s) => t.pieza('secondTex', 'esf', [s * 0.08, 1.06, -0.62], [s * 0.2, 1.04, -0.5], 0.06, 0.02, [s, 0, 0]));
    t.esf('secondTex', 0, 1.06, -0.74, 0.09, 0.07, 0.08);
    // pico dorado curvo
    t.pieza('gold', 'cono', [0, 1.1, -0.76], [0, 1.03, -0.96], 0.05, 0.035, [0, 1, 0]);
    t.pieza('goldDark', 'cono', [0, 1.06, -0.76], [0, 1.03, -0.88], 0.035, 0.025);
    t.esf('accent', 0, 0.98, -0.75, 0.03, 0.06, 0.03);
    ojos(t, 0.08, 1.14, -0.77, 0.04, 'gold', 0.5, 0.3);
    // penacho: tres plumas largas hacia atrás con remate de llama
    for (const [x, y, z] of [[0, 1.48, -0.36], [-0.13, 1.38, -0.42], [0.13, 1.38, -0.42]] as V3[]) {
      t.tubo('feather', [[0, 1.2, -0.66], [x * 0.6, y - 0.12, z - 0.16], [x, y, z]], (u) => [0.012 + 0.03 * Math.sin(Math.PI * u), 0.01], 10, 6);
      t.esf('eye', x, y, z, 0.03);
      t.toro('gold', 0.04, 0.008, x, y, z, 0, 0, 0, Math.PI * 2, 1, 1, 1, 12);
    }
    // cuerpo: plumas del lomo, delante de la silla
    t.estatico();
    for (let i = 0; i < 4; i++) {
      t.pieza('feather', 'esf', [0, 0.74 - i * 0.02, -0.38 + i * 0.07], [0, 0.8 - i * 0.03, -0.14 + i * 0.07], 0.15 - i * 0.015, 0.03);
    }
    // collar de oro con perla
    t.toro('gold', 0.2, 0.02, 0, 0.62, -0.38, Math.PI / 2 - 0.6, 0, 0, Math.PI * 2, 1, 1, 1, 20);
    t.esf('eye', 0, 0.5, -0.56, 0.04);
    // alas en V que baten (con llamas en el borde)
    t.par((s) => {
      t.ala(s, [s * 0.24, 0.64, -0.12], { base: 0.1, amp: 0.26, freq: 4.5 });
      t.tubo('body', [[s * 0.16, 0.62, -0.12], [s * 0.42, 0.74, -0.06], [s * 0.66, 0.9, 0.06]], () => [0.06, 0.055], 6, 8);
      t.esf('gold', s * 0.66, 0.9, 0.06, 0.045);
      // primarias largas en abanico hacia arriba y atrás
      for (let i = 0; i < 8; i++) {
        const L = 0.78 - Math.abs(i - 2.5) * 0.06;
        const B: V3 = [s * (0.26 + i * 0.05), 0.7 + i * 0.026, -0.1 + i * 0.03];
        const T: V3 = [B[0] + s * L * (0.5 - i * 0.04), B[1] + L * (0.86 - i * 0.08), B[2] + L * (0.18 + i * 0.1)];
        t.pieza('feather', 'esf', B, T, 0.085, 0.016, [s, 0.3, 0]);
        llamaDoble(t, [lerp(B[0], T[0], 0.62), lerp(B[1], T[1], 0.62), lerp(B[2], T[2], 0.62)], [T[0] + s * 0.04, T[1] + 0.12, T[2] + 0.05], 0.04);
      }
      // coberteras doradas
      for (let i = 0; i < 6; i++) {
        const ang = -0.3 + i * 0.25;
        const B: V3 = [s * 0.26, 0.7, -0.1 + i * 0.035];
        t.pieza('secondTex', 'esf', B, [B[0] + s * Math.cos(ang) * 0.2, 1.0, B[2] + 0.1 + Math.sin(ang) * 0.24], 0.075, 0.02, [s, 0, 0]);
      }
    });
    // cola de cinco plumas largas con ojos luminosos y dos cintas doradas
    t.onda('cola', { eje: 'z', o: 0.45, len: 0.95, amp: 0.09, freq: 4.2, giro: 0.35, vert: 0.8, n: 4 });
    for (let i = -2; i <= 2; i++) {
      const tip: V3 = [i * 0.26, 0.7 + (2 - Math.abs(i)) * 0.12, 1.42 - Math.abs(i) * 0.13];
      t.tubo('feather', [[i * 0.03, 0.52, 0.45], [i * 0.12, 0.6, 0.86], tip], (u) => [0.03 + 0.045 * Math.sin(Math.PI * u), 0.014], 12, 6);
      t.esf('accent', tip[0], tip[1], tip[2] + 0.03, 0.08, 0.02, 0.095);
      t.esf('eye', tip[0], tip[1] + 0.014, tip[2] + 0.03, 0.036, 0.014, 0.042);
      t.toro('gold', 0.055, 0.008, tip[0], tip[1] + 0.02, tip[2] + 0.03, Math.PI / 2, 0, 0, Math.PI * 2, 1, 1, 1, 12);
    }
    for (const s of [-1, 1]) {
      t.tubo('gold', [[s * 0.05, 0.55, 0.45], [s * 0.2, 0.82, 0.85], [s * 0.4, 1.02, 1.1], [s * 0.52, 1.02, 1.32]], (u) => [0.022 * (1 - u) + 0.006, 0.022 * (1 - u) + 0.006], 14, 6);
    }
    t.estatico();
  },
};
