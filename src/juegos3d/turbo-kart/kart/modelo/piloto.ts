/**
 * Piloto chibi: casco abierto con gafas de carreras y tocado chino (penacho de fénix, cuernos de
 * dragón, borla roja de general...), cara con ojos grandes, pelo, y mono de carreras con cuello
 * mandarín, solapa cruzada con ribete, fajín y hombreras. Todo va a la capa uber; el cuerpo cuelga
 * del hueso 'piloto' y la cabeza del hueso 'casco' (Kart.ts los inclina y gira).
 */
import * as THREE from 'three';
import type { Taller, V3 } from './taller';
import { limbGeometry } from './taller';
import type { PilotoSpec } from '../criaturas/comun';
import { rizo } from '../criaturas/comun';

const H = 0.15; // altura del centro de la cabeza sobre el cuello
const R = 0.168; // radio del casco

export function piloto(t: Taller, p: PilotoSpec, driverM: THREE.Matrix4, headM: THREE.Matrix4, headPos: THREE.Vector3) {
  // ------------------------------------------------------------------ cuerpo
  t.usar('piloto').marco(driverM);
  const torso = new THREE.CapsuleGeometry(0.13, 0.1, t.bajo ? 2 : 3, t.bajo ? 8 : 12);
  t.add('suit', torso, 0, 0.2, 0.02, 0, 0, 0, 1.12, 1, 0.82);
  torso.dispose();
  // solapa cruzada (交领) y cuello mandarín con ribete
  t.pieza('ribete', 'cil', [-0.1, 0.33, -0.07], [0.05, 0.14, -0.105], 0.018, 0.006, [0, 0, -1]);
  t.pieza('ribete', 'cil', [0.1, 0.33, -0.07], [0.02, 0.22, -0.1], 0.014, 0.006, [0, 0, -1]);
  t.toro('ribete', 0.062, 0.014, 0, 0.34, 0.02, Math.PI / 2, 0, 0);
  t.pieza('suit', 'cil', [0, 0.32, 0.02], [0, 0.37, 0.02], 0.058);
  // fajín rojo con hebilla de jade
  t.toro('sash', 0.138, 0.03, 0, 0.12, 0.02, Math.PI / 2, 0, 0, Math.PI * 2, 1, 0.8, 1);
  t.esf('ribete', 0, 0.12, -0.1, 0.035, 0.035, 0.015);
  t.esf('jade', 0, 0.12, -0.112, 0.018);
  t.par((s) => {
    // hombreras de armadura con borde dorado
    const hombrera = new THREE.SphereGeometry(0.085, 10, 5, 0, Math.PI * 2, 0, Math.PI * 0.5);
    t.add('helmet', hombrera, s * 0.17, 0.31, 0.02, 0, 0, -s * 0.5, 1, 0.8, 1.1);
    hombrera.dispose();
    t.toro('ribete', 0.083, 0.01, s * 0.17, 0.31, 0.02, Math.PI / 2, -s * 0.5, 0, Math.PI * 2, 1, 1.1, 1);
    // brazos hacia el manillar
    const up = limbGeometry(s * 0.19, 0.31, 0.02, s * 0.21, 0.2, -0.13, 0.048, t.bajo ? 5 : 7);
    t.add('suit', up);
    up.dispose();
    const fo = limbGeometry(s * 0.21, 0.2, -0.13, s * 0.14, 0.195, -0.25, 0.043, t.bajo ? 5 : 7);
    t.add('suit', fo);
    fo.dispose();
    t.toro('ribete', 0.042, 0.01, s * 0.15, 0.196, -0.235, 0, s * 1.0, 0);
    t.esf('glove', s * 0.13, 0.195, -0.27, 0.05, 0.045, 0.055);
    // piernas y botas
    const th = limbGeometry(s * 0.1, 0.02, -0.02, s * 0.19, -0.04, -0.28, 0.058, t.bajo ? 5 : 7);
    t.add('suit', th);
    th.dispose();
    const sh = limbGeometry(s * 0.19, -0.04, -0.28, s * 0.22, -0.22, -0.26, 0.05, t.bajo ? 5 : 7);
    t.add('suit', sh);
    sh.dispose();
    t.esf('boot', s * 0.225, -0.25, -0.3, 0.055, 0.05, 0.08);
    t.toro('ribete', 0.05, 0.01, s * 0.22, -0.2, -0.265, Math.PI / 2, 0, 0);
  });

  // ------------------------------------------------------------------ cabeza
  t.usar('casco').marco(headM);
  // cara
  t.esf('skin', 0, H - 0.015, -0.012, 0.138, 0.134, 0.13);
  t.esf('skin', 0, H - 0.075, -0.04, 0.085, 0.06, 0.08);
  t.det(() => {
  // ojos grandes con brillo, cejas, mejillas y boca
  t.par((s) => {
    t.esf('pupil', s * 0.052, H - 0.03, -0.122, 0.024, 0.033, 0.014, 0, s * -0.38, 0);
    t.esf('irisDrv', s * 0.052, H - 0.04, -0.128, 0.016, 0.016, 0.008, 0, s * -0.38, 0);
    t.esf('glint', s * 0.046, H - 0.016, -0.132, 0.008, 0.009, 0.006);
    t.pieza('hair', 'esf', [s * 0.025, H + 0.02, -0.125], [s * 0.085, H + 0.012 + (p.peinado === 'barba' ? -0.008 : 0.008), -0.11], 0.012, 0.008, [0, 0, -1]);
    t.esf('blush', s * 0.08, H - 0.07, -0.105, 0.022, 0.012, 0.01, 0, s * -0.6, 0);
  });
  t.toro('mouth', 0.016, 0.005, 0, H - 0.085, -0.125, 0.25, 0, Math.PI, Math.PI, 1, 1, 1, 8);
  // flequillo bajo el casco
  for (let i = -2; i <= 2; i++) {
    const x = i * 0.035;
    t.pieza('hair', 'cono', [x, H + 0.075, -0.118 + Math.abs(i) * 0.012], [x * 1.25 + (i === 0 ? 0.012 : 0), H + 0.02 - (2 - Math.abs(i)) * 0.006, -0.135 + Math.abs(i) * 0.012], 0.028, 0.014, [0, 0, -1]);
  }
  t.par((s) => t.pieza('hair', 'cono', [s * 0.125, H + 0.04, -0.06], [s * 0.132, H - 0.07, -0.07], 0.03, 0.016, [s, 0, 0]));
  });
  // casco abierto: calota, nuca, banda dorada y orejeras
  const calota = new THREE.SphereGeometry(R, 18, 7, 0, Math.PI * 2, 0, Math.PI * 0.4);
  t.add('helmet', calota, 0, H, 0.0, -0.18, 0, 0);
  calota.dispose();
  const nuca = new THREE.SphereGeometry(R, 14, 5, Math.PI * 0.2 + Math.PI * 1.5 + 0.9, Math.PI * 2 - 1.8, Math.PI * 0.38, Math.PI * 0.32);
  t.add('helmet', nuca, 0, H, 0.0, -0.18, 0, 0);
  nuca.dispose();
  t.toro('ribete', R * Math.sin(Math.PI * 0.4), 0.012, 0, H + R * Math.cos(Math.PI * 0.4) * Math.cos(0.18) - 0.004, 0.0 - R * Math.cos(Math.PI * 0.4) * Math.sin(0.18), Math.PI / 2 - 0.18, 0, 0, Math.PI * 2, 1, 1, 1, 24);
  t.par((s) => {
    t.pieza('helmet', 'cil', [s * 0.15, H - 0.03, 0.01], [s * 0.172, H - 0.03, 0.01], 0.06);
    t.esf('ribete', s * 0.176, H - 0.03, 0.01, 0.022, 0.022, 0.022);
  });
  t.toro('dark', 0.1, 0.006, 0, H - 0.08, -0.01, 0.2, 0, Math.PI, Math.PI, 1.3, 1, 1, 10);
  t.det(() => {
  // gafas de carreras sobre la frente
  t.par((s) => {
    const lente = new THREE.CylinderGeometry(0.042, 0.04, 0.03, 16);
    t.add('visor', lente, s * 0.05, H + 0.085, -0.135, Math.PI / 2 - 0.55, 0, s * 0.08);
    lente.dispose();
    t.toro('ribete', 0.043, 0.009, s * 0.05, H + 0.083, -0.146, -0.55, s * 0.0, 0, Math.PI * 2, 1, 1, 1, 14);
    t.esf('glint', s * 0.04, H + 0.1, -0.15, 0.009, 0.006, 0.004);
  });
  t.caja('dark', 0.03, 0.02, 0.02, 0, H + 0.085, -0.148, -0.55);

  });
  // ------------------------------------------------------------------ peinado
  const top = H + R; // coronilla
  if (p.peinado === 'mono') {
    t.esf('hair', 0, top - 0.01, 0.1, 0.06, 0.055, 0.06);
    t.pieza('ribete', 'cil', [-0.09, top + 0.0, 0.1], [0.09, top + 0.02, 0.12], 0.008);
    t.esf('accentDrv', 0.09, top + 0.02, 0.12, 0.018);
  } else if (p.peinado === 'dosMonos') {
    t.par((s) => {
      t.esf('hair', s * 0.13, top - 0.06, 0.03, 0.05);
      t.toro('ribete', 0.04, 0.008, s * 0.13, top - 0.06, 0.03, 0, s * 0.6, 0);
    });
  } else if (p.peinado === 'puntas') {
    for (let i = 0; i < 5; i++) {
      const a = -0.9 + i * 0.45;
      t.pieza('hair', 'cono', [Math.sin(a) * 0.08, H + 0.02, 0.12], [Math.sin(a) * 0.17, H + 0.06 - Math.abs(a) * 0.05, 0.25], 0.04, 0.025);
    }
  } else if (p.peinado === 'barba' || p.peinado === 'bigote') {
    if (p.peinado === 'barba') t.esf('hair', 0, H - 0.1, -0.06, 0.1, 0.07, 0.08);
    t.par((s) => t.pieza('hair', 'esf', [s * 0.005, H - 0.062, -0.13], [s * 0.07, H - 0.075, -0.11], 0.018, 0.012, [0, 0, -1]));
  } else if (p.peinado === 'corto') {
    t.esf('hair', 0, H - 0.03, 0.08, 0.13, 0.1, 0.08);
  }
  if (p.peinado === 'coleta') {
    // coleta larga que ondea con el viento
    t.esf('hair', 0, H + 0.08, 0.15, 0.05);
    t.toro('ribete', 0.042, 0.01, 0, H + 0.08, 0.17, 0, 0, 0);
    t.onda('coleta', { eje: 'z', o: headPos.z + 0.16, len: 0.3, amp: 0.22, freq: 7, giro: 0.5, vert: 0.4, n: 3, padre: 'casco', fase: 1.1 });
    t.tubo('hair', [[0, H + 0.08, 0.17], [0, H + 0.09, 0.27], [0, H + 0.05, 0.38], [0, H - 0.01, 0.46]], (u) => [0.045 * (1 - u * 0.6), 0.032 * (1 - u * 0.6)], 12, 8);
    t.usar('casco');
  }

  // ------------------------------------------------------------------ tocado
  const k = 'ribete';
  switch (p.tocado) {
    case 'fenix': {
      // corona de fénix: tres plumas en abanico y dos plumas de faisán (雉翎) muy largas
      for (const a of [-0.45, 0, 0.45]) t.pieza(k, 'esf', [0, top - 0.02, -0.02], [Math.sin(a) * 0.1, top + 0.11 - Math.abs(a) * 0.04, -0.05], 0.03, 0.01, [0, 0, -1]);
      t.esf('accentDrv', 0, top - 0.01, -0.07, 0.025);
      t.onda('plumas', { eje: 'z', o: headPos.z - 0.02, len: 0.6, amp: 0.08, freq: 5, giro: 0.25, vert: 1.2, n: 3, padre: 'casco', fase: 0.8 });
      t.par((s) => {
        t.tubo('plumeDrv', [[s * 0.06, top - 0.02, -0.02], [s * 0.14, top + 0.14, 0.04], [s * 0.24, top + 0.22, 0.24], [s * 0.3, top + 0.16, 0.52]], (u) => [0.012 * (1 - u * 0.7) + 0.003, 0.012 * (1 - u * 0.7) + 0.003], 18, 6);
        for (let i = 0; i < 4; i++) t.toro('ribete', 0.014, 0.004, s * (0.1 + i * 0.05), top + 0.08 + i * 0.035 - (i > 2 ? 0.05 : 0), 0.0 + i * 0.12, 0, Math.PI / 2, 0, Math.PI * 2, 1, 1, 1, 8);
      });
      t.usar('casco');
      break;
    }
    case 'aleta': {
      t.pieza('accentDrv', 'esf', [0, top - 0.01, -0.1], [0, top + 0.08, 0.14], 0.07, 0.012, [1, 0, 0]);
      t.par((s) => rizo(t, k, s * 0.12, H + 0.08, 0.02, 0.035, 0.008, s > 0 ? Math.PI / 2 : -Math.PI / 2, 0));
      break;
    }
    case 'astas': {
      t.par((s) => {
        t.pieza('jadeDrv', 'cono', [s * 0.08, top - 0.03, 0], [s * 0.15, top + 0.09, 0.03], 0.02);
        t.pieza('jadeDrv', 'cono', [s * 0.11, top + 0.02, 0.01], [s * 0.18, top + 0.04, -0.04], 0.012);
      });
      t.esf('jadeDrv', 0, top - 0.005, -0.1, 0.025);
      break;
    }
    case 'dragon': {
      t.par((s) => {
        t.tubo(k, [[s * 0.07, top - 0.03, -0.03], [s * 0.12, top + 0.05, 0.02], [s * 0.15, top + 0.1, 0.1], [s * 0.14, top + 0.12, 0.18]], (u) => [0.022 * (1 - u) + 0.003, 0.022 * (1 - u) + 0.003], 12, 7);
        t.pieza(k, 'cono', [s * 0.12, top + 0.05, 0.03], [s * 0.18, top + 0.07, -0.02], 0.01);
      });
      t.esf('jade', 0, top - 0.025, -0.11, 0.022);
      break;
    }
    case 'orejas': {
      t.par((s) => {
        t.pieza('helmet', 'cono', [s * 0.1, top - 0.05, 0.02], [s * 0.15, top + 0.06, 0.03], 0.045, 0.022);
        t.pieza('ivory', 'cono', [s * 0.1, top - 0.04, 0.012], [s * 0.145, top + 0.04, 0.018], 0.028, 0.008);
      });
      // 王 en la frente del casco
      t.caja('dark', 0.05, 0.008, 0.008, 0, top - 0.045, -0.135, -0.65);
      t.caja('dark', 0.04, 0.008, 0.008, 0, top - 0.058, -0.127, -0.65);
      t.caja('dark', 0.05, 0.008, 0.008, 0, top - 0.071, -0.119, -0.65);
      t.caja('dark', 0.008, 0.035, 0.008, 0, top - 0.058, -0.127, -0.65);
      break;
    }
    case 'general':
    case 'borla': {
      // pincho dorado con borla roja (红缨) de casco de general
      t.torno(k, [[0, 0], [0.04, 0], [0.03, 0.03], [0.012, 0.05], [0.008, 0.12], [0, 0.14]], 0, top - 0.02, 0.0, 0, 0, 0, 10);
      t.esf('tassel', 0, top + 0.06, 0.0, 0.05, 0.035, 0.05);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        t.pieza('tassel', 'cono', [Math.cos(a) * 0.02, top + 0.06, Math.sin(a) * 0.02], [Math.cos(a) * 0.08, top - 0.0, Math.sin(a) * 0.08 + 0.02], 0.022);
      }
      if (p.tocado === 'general') {
        t.par((s) => {
          const flap = new THREE.SphereGeometry(0.09, 10, 6, 0, Math.PI, 0, Math.PI * 0.5);
          t.add('helmet', flap, s * 0.15, H - 0.04, 0.03, 0, s * Math.PI / 2, Math.PI, 0.6, 1.2, 1);
          flap.dispose();
        });
      } else {
        t.par((s) => rizo(t, k, s * 0.14, H + 0.1, 0.0, 0.035, 0.008, s > 0 ? Math.PI / 2 : -Math.PI / 2, 0));
      }
      break;
    }
    case 'lingote': {
      // lingote de oro (元宝) sobre el casco
      t.esf(k, 0, top + 0.01, 0.0, 0.08, 0.035, 0.05);
      t.esf(k, 0, top + 0.035, 0.0, 0.035, 0.03, 0.03);
      t.par((s) => t.esf(k, s * 0.065, top + 0.035, 0.0, 0.03, 0.025, 0.04));
      t.esf('jade', 0, top - 0.04, -0.13, 0.02);
      break;
    }
  }
  t.marco(null);
}

/** Pivote de la cabeza del piloto en espacio del vehículo (para cadenas de pelo y plumas). */
export function pivoteCabeza(silla: [number, number]): V3 {
  return [0, silla[0] + 0.4, silla[1] + 0.02];
}
