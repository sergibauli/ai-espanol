/**
 * Vehículos-criatura de Wukong Turbo Rush. Cada piloto monta una criatura de la mitología
 * tradicional china (dominio público) convertida en bólido: fénix, carpa-dragón, qilin, dragón,
 * tigre blanco, tortuga-serpiente (玄武), león guardián y pixiu. Todo es procedural (sin assets),
 * mira hacia -Z y las ruedas apoyan en y = 0. El tamaño de colisión no depende de esto: aquí solo
 * hay estética.
 *
 * Organización:
 * - `modelo/taller.ts`: API para esculpir con primitivas (capas de material, huesos, cadenas).
 * - `modelo/materiales.ts`: material «uber» compartido (PBR por vértice + iridiscencia), cielo de
 *   reflejos y texturas canvas del pellejo (escamas, plumas, rayas, hexágonos, jade).
 * - `modelo/chasis.ts` y `modelo/piloto.ts`: chasis, ruedas de fuego y piloto chibi con tocado.
 * - `criaturas/*.ts`: las ocho criaturas.
 * - `modelo/construir.ts`: montaje, esqueleto y animación.
 *
 * Rendimiento: cada kart es una única malla con esqueleto partida en 4 capas de material (uber,
 * pellejo, acentos, orbes) + las llamas: ~6 llamadas de dibujo por kart y ~20–30 k triángulos.
 * Colas, alas, cabeza, ruedas, piloto y manillar son huesos (animación en GPU, sin tocar vértices
 * en CPU). Materiales, texturas y geometrías unitarias se comparten entre instancias.
 */
export { buildKartModel } from './modelo/construir';
export type { KartModelParts, KartModelPartsEx } from './modelo/construir';
