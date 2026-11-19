import type { TrackDefinition } from '../../core/types';

/**
 * Frostbite Falls - icy mountain plateau.
 * High start straight -> tight chicane -> big downhill sweeper -> frozen-lake causeway with
 * no barriers (void off the edge!) -> long climb -> second chicane -> final corner.
 * ~1200 m.
 */
export const frostbiteFalls: TrackDefinition = {
  id: 'frostbite_falls',
  name: 'Templo de Jade · 玉虚宫',
  theme: 'snow',
  laps: 3,
  description: 'Salas de jade entre la nieve, guardianes de piedra y un puente sobre el vacío · 雪中玉殿、石像守卫和悬空栈道。',
  difficulty: 2,
  controlPoints: [
    { x: 0, y: 8, z: 0 }, // 0 finish line (plateau)
    { x: 0, y: 8, z: -134.1 },
    { x: -6.7, y: 7.5, z: -150.4 }, // chicane 1
    { x: -6.7, y: 6.5, z: -182.9 },
    { x: 0, y: 5.5, z: -199.2 },
    { x: 0, y: 4.5, z: -237.5 },
    { x: 57.5, y: 2, z: -295 }, // big downhill sweeper
    { x: 134.1, y: 0, z: -295 },
    { x: 208.7, y: -1, z: -264.1 }, // frozen lake sweep (void)
    { x: 239.5, y: -1, z: -189.6 },
    { x: 239.5, y: -1, z: -122.5 }, // end of lake
    { x: 239.5, y: 1.5, z: -21.9 }, // long climb
    { x: 239.5, y: 4, z: 78.7 },
    { x: 191.6, y: 5.5, z: 126.6 },
    { x: 143.7, y: 6.5, z: 126.6 },
    { x: 127.5, y: 7.5, z: 119.8 }, // chicane 2
    { x: 94.9, y: 8.5, z: 119.8 },
    { x: 78.7, y: 9, z: 126.6 },
    { x: 47.9, y: 8.5, z: 126.6 },
    { x: 0, y: 8, z: 78.7 }, // final corner onto the straight
  ],
  halfWidth: 8,
  halfWidths: [8.5, 8.5, 8.5, 8.5, 8.5, 8, 8, 7.5, 7.5, 7.5, 7.5, 8, 8, 8, 8, 8.5, 8.5, 8.5, 8, 8.5],
  wallHalfWidthFactor: 1.5,
  itemBoxRows: [0.08, 0.36, 0.62, 0.9],
  boostPads: [0.22, 0.66, 0.935],
  voidRanges: [[0.315, 0.545]],
  environment: {
    skyTop: 0x1a2f5a,
    skyHorizon: 0x9fe0d8,
    skyBottom: 0xe8fff8,
    fogColor: 0xbfe4dc,
    fogDensity: 0.0016,
    sunColor: 0xdfeaff,
    sunIntensity: 2.0,
    sunDirection: { x: 0.36, y: 0.66, z: -0.66 },
    ambientSky: 0xbfe6dc,
    ambientGround: 0x8fa8c4,
    ambientIntensity: 1.0,
  },
  palette: {
    road: 0x55606e,
    roadStripe: 0xe8f6ff,
    curb: 0x2f6fb5,
    curbAlt: 0xffffff,
    offroad: 0xe6ece8,
    wall: 0x2f9a80,
    ground: 0xe6eff8,
  },
};
