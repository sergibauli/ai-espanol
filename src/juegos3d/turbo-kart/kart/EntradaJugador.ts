/**
 * Wukong Turbo Rush · mandos de cada jugador en pantalla partida.
 * Cada jugador combina un juego de teclas propio (J1: WASD, J2: flechas) con su mando
 * (índice de navigator.getGamepads() = número de jugador − 1). Los bordes (objeto, pausa)
 * se calculan por jugador, sin interferir con InputManager (que sigue llevando los menús).
 */
import { createEmptyInput, type InputState } from '../core/types';
import { clamp } from '../core/math';

interface Teclas {
  acelerar: string[];
  frenar: string[];
  izquierda: string[];
  derecha: string[];
  derrape: string[];
  objeto: string[];
  atras: string[];
}

export const TECLAS_JUGADOR: (Teclas | null)[] = [
  { acelerar: ['KeyW'], frenar: ['KeyS'], izquierda: ['KeyA'], derecha: ['KeyD'], derrape: ['Space', 'ShiftLeft'], objeto: ['KeyE', 'ControlLeft'], atras: ['KeyQ'] },
  {
    acelerar: ['ArrowUp'],
    frenar: ['ArrowDown'],
    izquierda: ['ArrowLeft'],
    derecha: ['ArrowRight'],
    derrape: ['ShiftRight', 'Numpad0', 'Period'],
    objeto: ['Enter', 'NumpadEnter', 'ControlRight', 'Slash'],
    atras: ['Comma'],
  },
  null,
  null,
];

/** Teclas del reto de vocabulario por jugador (1/2/3 y 8/9/0). */
export const TECLAS_RETO: string[][] = [
  ['Digit1', 'Digit2', 'Digit3'],
  ['Digit8', 'Digit9', 'Digit0'],
  [],
  [],
];

const pulsadas = new Set<string>();
let usuarios = 0;
const abajo = (e: KeyboardEvent): void => {
  pulsadas.add(e.code);
};
const arriba = (e: KeyboardEvent): void => {
  pulsadas.delete(e.code);
};
const limpiar = (): void => pulsadas.clear();

export class EntradaJugador {
  private readonly estado: InputState = createEmptyInput();
  private objetoAntes = false;
  private pausaAntes = false;
  private readonly teclas: Teclas | null;
  private disposed = false;

  constructor(readonly indice: number) {
    this.teclas = TECLAS_JUGADOR[indice] ?? null;
    if (usuarios++ === 0) {
      window.addEventListener('keydown', abajo);
      window.addEventListener('keyup', arriba);
      window.addEventListener('blur', limpiar);
    }
  }

  private algunaTecla(codigos: string[] | undefined): boolean {
    if (!codigos) return false;
    for (const c of codigos) if (pulsadas.has(c)) return true;
    return false;
  }

  private mando(): Gamepad | null {
    try {
      const pads = navigator.getGamepads?.() ?? [];
      const p = pads[this.indice];
      return p && p.connected ? p : null;
    } catch {
      return null;
    }
  }

  update(): InputState {
    const s = this.estado;
    const t = this.teclas;
    const pad = this.mando();
    const b = (i: number): boolean => !!pad?.buttons[i] && (pad.buttons[i].pressed || pad.buttons[i].value > 0.5);
    const eje = pad ? pad.axes[0] ?? 0 : 0;
    const ejeZona = Math.abs(eje) < 0.15 ? 0 : eje;
    const rt = pad?.buttons[7]?.value ?? 0;
    const lt = pad?.buttons[6]?.value ?? 0;
    s.throttle = Math.max(this.algunaTecla(t?.acelerar) ? 1 : 0, rt, b(7) ? 1 : 0);
    s.brake = Math.max(this.algunaTecla(t?.frenar) ? 1 : 0, lt, b(6) ? 1 : 0);
    s.steer = clamp((this.algunaTecla(t?.derecha) ? 1 : 0) - (this.algunaTecla(t?.izquierda) ? 1 : 0) + ejeZona, -1, 1);
    s.drift = this.algunaTecla(t?.derrape) || b(0) || b(5);
    const objeto = this.algunaTecla(t?.objeto) || b(2) || b(4);
    s.useItem = objeto && !this.objetoAntes;
    s.useItemHeld = objeto;
    this.objetoAntes = objeto;
    s.lookBack = this.algunaTecla(t?.atras) || b(3);
    const pausa = b(9);
    s.pause = pausa && !this.pausaAntes;
    this.pausaAntes = pausa;
    return s;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (--usuarios === 0) {
      window.removeEventListener('keydown', abajo);
      window.removeEventListener('keyup', arriba);
      window.removeEventListener('blur', limpiar);
      pulsadas.clear();
    }
  }
}
