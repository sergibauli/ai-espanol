/**
 * Pilotos: cada uno monta una criatura de la mitología china (ver KartModel.ts). Stats are 0..1 and trade off by weight
 * class: light = agile/quick off the line, heavy = fast top end but ponderous.
 */
import type { CharacterDef } from '../core/types';

export const CHARACTERS: CharacterDef[] = [
  // --- light ---------------------------------------------------------------
  {
    id: 'zippy',
    name: 'Fénix Aurora · 凤凰',
    color: 0xf0501e,
    accent: 0xffc23a,
    driverColor: 0xd8202a,
    weightClass: 'light',
    stats: { speed: 0.18, acceleration: 0.95, handling: 0.9, weight: 0.12, miniTurbo: 0.9 },
    tagline: 'Renace del fuego y vuela en cada curva · 浴火重生，弯道飞翔。',
  },
  {
    id: 'pixel',
    name: 'Carpa Dragón · 锦鲤',
    color: 0xff8a2e,
    accent: 0x8ee8ff,
    driverColor: 0x18a0b0,
    weightClass: 'light',
    stats: { speed: 0.12, acceleration: 0.9, handling: 0.95, weight: 0.08, miniTurbo: 0.85 },
    tagline: 'Salta la Puerta del Dragón en cada derrape · 每次漂移都跃过龙门。',
  },
  {
    id: 'fennec',
    name: 'Qilin Relámpago · 麒麟',
    color: 0xf8dc96,
    accent: 0x6ff0c0,
    driverColor: 0x2bb04a,
    weightClass: 'light',
    stats: { speed: 0.25, acceleration: 0.85, handling: 0.8, weight: 0.2, miniTurbo: 0.95 },
    tagline: 'Trae buena suerte… y miniturbos de fuego · 带来好运，还有火焰小加速。',
  },
  // --- medium --------------------------------------------------------------
  {
    id: 'max',
    name: 'Dragón Carmesí · 赤龙',
    color: 0xd01e26,
    accent: 0xffa424,
    driverColor: 0xc81e28,
    weightClass: 'medium',
    stats: { speed: 0.55, acceleration: 0.55, handling: 0.55, weight: 0.5, miniTurbo: 0.55 },
    tagline: 'Señor de las nubes: equilibrado y feroz · 云中之王，均衡又凶猛。',
  },
  {
    id: 'juno',
    name: 'Tigre Blanco · 白虎',
    color: 0xf4f4fa,
    accent: 0x9b6bff,
    driverColor: 0x8a3ad8,
    weightClass: 'medium',
    stats: { speed: 0.6, acceleration: 0.45, handling: 0.5, weight: 0.55, miniTurbo: 0.65 },
    tagline: 'Guardián del Oeste: ruge como la tormenta · 西方守护神，怒吼如雷暴。',
  },
  {
    id: 'kai',
    name: 'Tortuga Negra · 玄武',
    color: 0x3c5248,
    accent: 0x39e6ff,
    driverColor: 0x2a4ab0,
    weightClass: 'medium',
    stats: { speed: 0.5, acceleration: 0.6, handling: 0.65, weight: 0.45, miniTurbo: 0.5 },
    tagline: 'Guardián del Norte: tranquilo como el mar profundo · 北方守护神，冷静如深海。',
  },
  // --- heavy ---------------------------------------------------------------
  {
    id: 'bram',
    name: 'León de Jade · 石狮',
    color: 0x52c48c,
    accent: 0xffb030,
    driverColor: 0xd02a2a,
    weightClass: 'heavy',
    stats: { speed: 0.92, acceleration: 0.2, handling: 0.25, weight: 0.95, miniTurbo: 0.3 },
    tagline: 'Guardián de piedra: tarda en arrancar, nadie lo empuja · 石头守卫，谁也推不动。',
  },
  {
    id: 'rosa',
    name: 'Pixiu Dorado · 貔貅',
    color: 0xffd060,
    accent: 0xffb83a,
    driverColor: 0xc8a040,
    weightClass: 'heavy',
    stats: { speed: 1.0, acceleration: 0.15, handling: 0.3, weight: 0.9, miniTurbo: 0.35 },
    tagline: 'Se traga el oro… y la pista entera · 吞金又吞赛道。',
  },
];

export function getCharacter(id: string): CharacterDef {
  for (let i = 0; i < CHARACTERS.length; i++) {
    if (CHARACTERS[i].id === id) return CHARACTERS[i];
  }
  return CHARACTERS[0];
}
