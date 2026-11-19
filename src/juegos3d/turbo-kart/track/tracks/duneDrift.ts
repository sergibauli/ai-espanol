import type { TrackDefinition } from '../../core/types';

/**
 * Dune Drift - sunset desert.
 * Start straight -> banked sweeper -> jump crest -> hairpin 1 -> 180 degree banked sweeper ->
 * long canyon descent with high walls -> hairpin 2 -> flowing S-bend -> final sweeper.
 * ~1150 m.
 */
export const duneDrift: TrackDefinition = {
  id: 'dune_drift',
  name: 'Montaña de Fuego · 火焰山',
  theme: 'desert',
  laps: 3,
  description: 'Un volcán en erupción, pozas de lava, vagonetas mineras y un lago de farolillos · 火焰山：火山、熔岩、矿车和灯笼湖。',
  difficulty: 2,
  controlPoints: [
    { x: 0, y: 0, z: 0 }, // 0 finish line
    { x: 0, y: 0, z: -120.2 },
    { x: 60.1, y: 2, z: -180.3 }, // banked sweeper 1
    { x: 100.2, y: 3, z: -180.3 },
    { x: 136.2, y: 4.5, z: -144.2 },
    { x: 136.2, y: 8, z: -116.2 }, // jump crest
    { x: 136.2, y: 4.5, z: -88.1 },
    { x: 146.2, y: 2, z: -70.8 }, // hairpin 1 (left)
    { x: 166.3, y: 2, z: -70.8 },
    { x: 176.3, y: 2, z: -88.1 },
    { x: 176.3, y: 3, z: -128.2 },
    { x: 212.3, y: 5, z: -164.2 }, // banked sweeper 2 (180 deg)
    { x: 248.4, y: 6, z: -128.2 },
    { x: 248.4, y: 3.8, z: -20.8 }, // canyon descent
    { x: 248.4, y: 0.5, z: 86.5 },
    { x: 237.6, y: 0, z: 105.3 }, // hairpin 2 (right)
    { x: 215.9, y: 0, z: 105.3 },
    { x: 205.1, y: 0, z: 86.5 },
    { x: 205.1, y: 0, z: 66.5 },
    { x: 171.5, y: 0.5, z: 32.8 }, // left sweep
    { x: 136.8, y: 1.5, z: 52.9 }, // S-bend
    { x: 102.1, y: 2.5, z: 72.9 },
    { x: 44.1, y: 0.5, z: 72.9 },
    { x: 0, y: 0, z: 28.8 }, // final sweeper onto the straight
  ],
  halfWidth: 8.5,
  halfWidths: [9, 9, 8.5, 8.5, 8.5, 8.5, 8.5, 9, 9, 9, 8.5, 8.5, 8, 7.5, 7.5, 9, 9, 9, 8.5, 8.5, 8.5, 8.5, 9, 9],
  wallHalfWidthFactor: 1.3,
  itemBoxRows: [0.12, 0.42, 0.62, 0.86],
  boostPads: [0.255, 0.55, 0.88],
  environment: {
    skyTop: 0x1a0a1e,
    skyHorizon: 0xc8401a,
    skyBottom: 0x5a1a10,
    fogColor: 0x5a2014,
    fogDensity: 0.0016,
    sunColor: 0xff8a4a,
    sunIntensity: 1.8,
    sunDirection: { x: -0.7, y: 0.36, z: 0.61 },
    ambientSky: 0xff7a4a,
    ambientGround: 0x3a1a10,
    ambientIntensity: 0.75,
  },
  palette: {
    road: 0x5a4e46,
    roadStripe: 0xffc531,
    curb: 0xc7502f,
    curbAlt: 0xf3e6c8,
    offroad: 0x4a2e22,
    wall: 0x2a1a14,
    ground: 0x3a2218,
  },
};
