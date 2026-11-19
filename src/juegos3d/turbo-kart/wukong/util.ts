/** Utilidades compartidas por las capas visuales de Wukong Turbo Rush. */
import * as THREE from 'three';
import type { TrackDefinition } from '../core/types';
import { wrap01 } from '../core/math';

export function esVacio(def: TrackDefinition, t: number): boolean {
  const tw = wrap01(t);
  for (const [a, b] of def.voidRanges ?? []) {
    if (a <= b ? tw >= a && tw <= b : tw >= a || tw <= b) return true;
  }
  return false;
}

/** Generador pseudoaleatorio determinista (mismo circuito → misma ciudad). */
export function rnd(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function texturaCanvas(w: number, h: number, dibujar: (c: CanvasRenderingContext2D) => void, repetir = true): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const c = cv.getContext('2d');
  if (c) dibujar(c);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repetir) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

/**
 * Tejado chino de cuatro aguas con las esquinas levantadas (alero curvo).
 * Base cuadrada de lado `w` en y = 0, cumbrera en y = `h`.
 */
export function tejadoChino(w: number, h: number, alza = h * 0.45, div = 6): THREE.BufferGeometry {
  const per: { x: number; z: number; c: number }[] = [];
  for (let lado = 0; lado < 4; lado++) {
    for (let j = 0; j < div; j++) {
      const s = -1 + (2 * j) / div;
      const c = s * s;
      if (lado === 0) per.push({ x: 1, z: s, c });
      else if (lado === 1) per.push({ x: -s, z: 1, c });
      else if (lado === 2) per.push({ x: -1, z: -s, c });
      else per.push({ x: s, z: -1, c });
    }
  }
  const anillos = [
    { r: 0.5 * w, y: (c: number) => alza * Math.pow(c, 1.6) },
    { r: 0.5 * w * 0.86, y: (c: number) => h * 0.16 + alza * 0.45 * c },
    { r: 0.5 * w * 0.55, y: (c: number) => h * 0.5 + alza * 0.12 * c },
    { r: 0.5 * w * 0.16, y: () => h },
  ];
  const P = per.length;
  const pos: number[] = [];
  const idx: number[] = [];
  for (const a of anillos) for (const p of per) pos.push(p.x * a.r, a.y(p.c), p.z * a.r);
  for (let r = 0; r < anillos.length - 1; r++) {
    for (let i = 0; i < P; i++) {
      const a = r * P + i;
      const b = r * P + ((i + 1) % P);
      const c = a + P;
      const d = b + P;
      idx.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Array((pos.length / 3) * 2).fill(0), 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/** Fusiona geometrías indexadas quitando atributos que no compartan todas. */
export function fusionar(lista: THREE.BufferGeometry[], merge: (g: THREE.BufferGeometry[]) => THREE.BufferGeometry | null): THREE.BufferGeometry {
  const comunes = ['position', 'normal', 'uv'];
  const limpias = lista.map((g) => {
    const x = g.index ? g : g.toNonIndexed();
    const out = new THREE.BufferGeometry();
    for (const n of comunes) {
      const a = x.getAttribute(n);
      if (a) out.setAttribute(n, a);
      else if (n === 'uv') out.setAttribute('uv', new THREE.Float32BufferAttribute(new Array(x.getAttribute('position').count * 2).fill(0), 2));
    }
    if (!out.getAttribute('normal')) out.computeVertexNormals();
    if (x.index) out.setIndex(x.index);
    return out;
  });
  const indexadas = limpias.every((g) => g.index);
  const finales = indexadas ? limpias : limpias.map((g) => (g.index ? g.toNonIndexed() : g));
  const r = merge(finales);
  for (const g of lista) g.dispose();
  if (!r) throw new Error('fusionar: geometrías incompatibles');
  return r;
}
