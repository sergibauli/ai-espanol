/**
 * Wukong Español · punto de entrada de Turbo Kart Rush dentro de la app.
 * Basado en Turbo Kart Rush de BridgeMind (licencia MIT, ver LICENSE).
 *
 * `montarTurboKart(contenedor, opciones)` crea el juego dentro de `contenedor`
 * y devuelve `destruir()`, que libera renderer, geometrías, texturas, audio,
 * listeners y el bucle.
 */
import './style.css';
import './learning/wukong.css';
import './learning/wukong-diseno.css';
import './learning/wukong-hud.css';
import './ui/animado.css';
import './learning/wukong-circuitos.css';
import { Game } from './game/Game';
import type { OpcionesAprendizaje } from './learning/Aprendizaje';

export type { OpcionesAprendizaje, ResumenCarrera, Palabra } from './learning/Aprendizaje';

export interface JuegoMontado {
  destruir(): void;
}

function hayWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false });
    const ok = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
    (gl as WebGL2RenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext();
    return ok;
  } catch {
    return false;
  }
}

export function montarTurboKart(contenedor: HTMLElement, opciones: OpcionesAprendizaje): JuegoMontado {
  if (!hayWebGL2()) throw new Error('webgl2');
  contenedor.classList.add('tkr', 'tkr-app');
  const game = new Game(contenedor, opciones);
  game.start();
  let vivo = true;
  return {
    destruir() {
      if (!vivo) return;
      vivo = false;
      game.dispose();
      contenedor.classList.remove('tkr', 'tkr-app');
    },
  };
}
