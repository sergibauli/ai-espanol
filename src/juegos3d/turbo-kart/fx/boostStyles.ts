/**
 * Estilos del turbo (Wukong Turbo Rush · 西游极速). Un único sitio decide qué
 * aspecto tiene cada turbo para que las partículas, las estelas, el
 * postprocesado y la cámara cuenten la misma historia:
 *
 *  - MINI   (miniturbo de derrape, truco, escudo): cola de dragón azul celeste.
 *  - SUPER  (superturbo de derrape, nitro): cola de fénix naranja y bermellón.
 *  - ULTRA  (ultraturbo de derrape, turbo dorado): oro imperial y rosa.
 *  - NEON   (almohadillas y salida): jade y rosa neón, como en la maqueta.
 */
import type { BoostSource } from '../core/types';

export const TIER_MINI = 0;
export const TIER_SUPER = 1;
export const TIER_ULTRA = 2;
export const TIER_NEON = 3;
export type BoostTier = 0 | 1 | 2 | 3;

export interface BoostStyle {
  /** Color principal de la llama/estela (sRGB hex). */
  a: number;
  /** Segundo color (la otra hebra de la estela, el final del degradado). */
  b: number;
  /** Chispas. */
  spark: number;
  /** Carácter de la onda de choque. */
  glyph: 0 | 1; // 0 = 速, 1 = 冲
  /** Golpe de FOV como fracción del rango fovMax − fovMin de la cámara. */
  kick: number;
  /** Intensidad de la viñeta de color al activarlo (0..1). */
  vignette: number;
  /** Ondulación de la estela (cola de dragón). */
  wiggle: number;
  /** Ensanchamiento en mitad de la estela (plumas de fénix). */
  flare: number;
  /** Vida de la estela en segundos (≈ longitud). */
  trailLife: number;
  /** Anchura de la estela en el escape (m). */
  width: number;
}

export const BOOST_STYLES: readonly BoostStyle[] = [
  // MINI: azul celeste → índigo
  { a: 0x1f9dff, b: 0x7a4dff, spark: 0xbfeaff, glyph: 0, kick: 0.32, vignette: 0.45, wiggle: 1.0, flare: 0.1, trailLife: 0.3, width: 0.2 },
  // SUPER: oro anaranjado → bermellón
  { a: 0xffa63a, b: 0xff3b2a, spark: 0xffd36b, glyph: 1, kick: 0.5, vignette: 0.6, wiggle: 0.55, flare: 0.75, trailLife: 0.36, width: 0.22 },
  // ULTRA: oro imperial ↔ rosa
  { a: 0xffcf4d, b: 0xff4fb8, spark: 0xffe08a, glyph: 1, kick: 0.72, vignette: 0.8, wiggle: 1.0, flare: 0.45, trailLife: 0.44, width: 0.24 },
  // NEON: jade ↔ rosa neón
  { a: 0x36f0cc, b: 0xff55d6, spark: 0xffd36b, glyph: 0, kick: 0.45, vignette: 0.6, wiggle: 0.85, flare: 0.25, trailLife: 0.4, width: 0.22 },
];

/** Duraciones de los turbos de derrape en Kart.ts: 0.7 · 1.2 · 1.8 s. */
export function boostTier(source: BoostSource, strength: number, duration: number): BoostTier {
  switch (source) {
    case 'drift':
      return duration >= 1.6 ? TIER_ULTRA : duration >= 1.0 ? TIER_SUPER : TIER_MINI;
    case 'nitro':
      return TIER_SUPER;
    case 'golden':
      return TIER_ULTRA;
    case 'pad':
      return TIER_NEON;
    case 'start':
      return strength >= 0.35 ? TIER_NEON : TIER_MINI;
    default:
      return TIER_MINI;
  }
}

// ---------------------------------------------------------------------------
// Movimiento reducido (prefers-reduced-motion): menos vibración, menos
// desenfoque y un golpe de FOV más suave.
// ---------------------------------------------------------------------------

let reducido: boolean | null = null;
let mql: MediaQueryList | null = null;

export function movimientoReducido(): boolean {
  if (reducido === null) {
    reducido = false;
    try {
      if (typeof matchMedia === 'function') {
        mql = matchMedia('(prefers-reduced-motion: reduce)');
        reducido = mql.matches;
        const alCambiar = (e: MediaQueryListEvent): void => { reducido = e.matches; };
        if (typeof mql.addEventListener === 'function') mql.addEventListener('change', alCambiar);
      }
    } catch {
      reducido = false;
    }
  }
  return reducido;
}
