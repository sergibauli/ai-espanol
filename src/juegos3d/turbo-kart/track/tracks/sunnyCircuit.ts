import type { TrackDefinition } from '../../core/types';

/**
 * Sunny Circuit - friendly grassland loop.
 * Long start straight -> two sweeping right-handers -> gentle hill crest -> hairpin ->
 * twisty left section -> S-bend -> wide stadium U-turn back onto the start straight.
 * ~950 m.
 */
export const sunnyCircuit: TrackDefinition = {
  id: 'sunny_circuit',
  name: 'Valle de Bambú · 竹林峡谷',
  theme: 'grassland',
  laps: 3,
  description: 'Bosques de bambú, picos de tinta, un lago con pagoda y cascadas · 竹林、水墨山峰、湖心宝塔和瀑布。',
  difficulty: 1,
  controlPoints: [
    { x: 0, y: 0, z: 0 }, // 0 finish line
    { x: 0, y: 0, z: -68.5 },
    { x: 0, y: 0, z: -137.1 },
    { x: 16.1, y: 0.8, z: -175.9 }, // sweeping right 1
    { x: 54.8, y: 1.5, z: -191.9 },
    { x: 100.5, y: 2, z: -191.9 },
    { x: 136.1, y: 3.5, z: -177.2 }, // sweeping right 2, climbing
    { x: 150.8, y: 5, z: -141.7 },
    { x: 150.8, y: 7, z: -61.7 }, // hill crest
    { x: 150.8, y: 2.2, z: 18.3 },
    { x: 140.7, y: 1.5, z: 35.7 }, // hairpin
    { x: 120.6, y: 1.5, z: 35.7 },
    { x: 110.6, y: 1.5, z: 18.3 },
    { x: 110.6, y: 0.5, z: -36.6 },
    { x: 102.6, y: 0, z: -55.9 }, // left-left twisty section
    { x: 83.2, y: 0, z: -64 },
    { x: 64.9, y: 0, z: -64 },
    { x: 48.7, y: 0, z: -57.3 },
    { x: 42, y: 0, z: -41.1 },
    { x: 58, y: 0, z: -13.4 }, // S-bend
    { x: 74, y: 0, z: 14.3 },
    { x: 74, y: 0, z: 32.6 },
    { x: 55.5, y: 0, z: 64.6 }, // stadium U-turn
    { x: 18.5, y: 0, z: 64.6 },
    { x: 0, y: 0, z: 32.6 },
  ],
  halfWidth: 8,
  halfWidths: [8.5, 8.5, 8.5, 8, 8, 8, 8, 8, 8, 8.5, 9, 9, 8.5, 8, 8, 8, 8, 8, 8, 8, 8, 8.5, 9, 9, 8.5],
  wallHalfWidthFactor: 1.55,
  itemBoxRows: [0.1, 0.4, 0.62, 0.83],
  boostPads: [0.3, 0.7, 0.95],
  environment: {
    skyTop: 0x1c2a6e,
    skyHorizon: 0xff9a5a,
    skyBottom: 0xffd2a0,
    fogColor: 0xf2b88a,
    fogDensity: 0.0011,
    sunColor: 0xffc27a,
    sunIntensity: 2.6,
    sunDirection: { x: -0.62, y: 0.32, z: 0.71 },
    ambientSky: 0xffd0a8,
    ambientGround: 0x6a5a7a,
    ambientIntensity: 0.95,
  },
  palette: {
    road: 0x4a4c52,
    roadStripe: 0xf4f4ec,
    curb: 0xd8272b,
    curbAlt: 0xf5f5f5,
    offroad: 0xcfc2a8,
    wall: 0x2a2a2e,
    ground: 0xcfc2a8,
  },
};
