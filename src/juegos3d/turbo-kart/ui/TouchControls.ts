/**
 * Wukong Español: on-screen controls for phones and tablets. Feeds the
 * InputManager's virtual `touch` state. Steering on the left, throttle /
 * brake / drift / item on the right, pause at the top. Multi-touch safe
 * (each button tracks its own pointer ids).
 */
import type { TouchInput } from '../kart/InputManager';
import { el } from './dom';

type Clave = 'izq' | 'der' | 'acel' | 'freno' | 'derrape' | 'objeto';

export class TouchControls {
  private readonly root: HTMLElement;
  private readonly activos = new Map<Clave, Set<number>>();
  private autoAcelerar = true;
  private readonly autoBtn: HTMLButtonElement;
  private visible = false;

  constructor(
    parent: HTMLElement,
    private readonly touch: TouchInput,
  ) {
    this.root = el('div', 'wk-tactil oculto', undefined, parent);
    const izq = el('div', 'wk-tactil-izq', undefined, this.root);
    this.boton(izq, 'izq', '◀', 'Izq. · 左转', 'grande');
    this.boton(izq, 'der', '▶', 'Der. · 右转', 'grande');
    const der = el('div', 'wk-tactil-der', undefined, this.root);
    this.boton(der, 'objeto', '◈', 'Objeto · 道具', 'objeto');
    this.boton(der, 'derrape', '⤳', 'Derrapar · 漂移', 'derrape');
    this.boton(der, 'freno', '▼', 'Frenar · 刹车', 'freno');
    this.boton(der, 'acel', '▲', 'Acelerar · 加速', 'acel');
    const arriba = el('div', 'wk-tactil-arriba', undefined, this.root);
    this.autoBtn = el('button', 'wk-tactil-auto on', 'AUTO ▲', arriba);
    this.autoBtn.type = 'button';
    this.autoBtn.setAttribute('aria-label', 'Acelerar automáticamente · 自动加速');
    this.autoBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.autoAcelerar = !this.autoAcelerar;
      this.autoBtn.classList.toggle('on', this.autoAcelerar);
      this.sync();
    });
    const pausa = el('button', 'wk-tactil-pausa', 'II', arriba);
    pausa.type = 'button';
    pausa.setAttribute('aria-label', 'Pausa · 暂停');
    pausa.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.touch.pausePressed = true;
    });
  }

  static esTactil(): boolean {
    if (typeof window === 'undefined') return false;
    return !!window.matchMedia?.('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private boton(parent: HTMLElement, clave: Clave, icono: string, etiqueta: string, cls: string): void {
    const b = el('button', `wk-tactil-btn ${cls}`, undefined, parent);
    b.type = 'button';
    b.setAttribute('aria-label', etiqueta);
    el('span', 'wk-tactil-icono', icono, b);
    el('span', 'wk-tactil-etq', etiqueta.split(' · ')[0], b);
    this.activos.set(clave, new Set());
    const down = (e: PointerEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      try {
        b.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      this.activos.get(clave)?.add(e.pointerId);
      b.classList.add('pulsado');
      if (clave === 'objeto') this.touch.itemPressed = true;
      this.sync();
    };
    const up = (e: PointerEvent): void => {
      const set = this.activos.get(clave);
      set?.delete(e.pointerId);
      if (!set || set.size === 0) b.classList.remove('pulsado');
      this.sync();
    };
    b.addEventListener('pointerdown', down);
    b.addEventListener('pointerup', up);
    b.addEventListener('pointercancel', up);
    b.addEventListener('lostpointercapture', up);
    b.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private on(clave: Clave): boolean {
    return (this.activos.get(clave)?.size ?? 0) > 0;
  }

  private sync(): void {
    const t = this.touch;
    t.steer = (this.on('der') ? 1 : 0) - (this.on('izq') ? 1 : 0);
    const freno = this.on('freno');
    t.brake = freno ? 1 : 0;
    t.throttle = this.on('acel') || (this.autoAcelerar && this.visible && !freno) ? 1 : 0;
    t.drift = this.on('derrape');
    t.itemHeld = this.on('objeto');
  }

  setVisible(v: boolean): void {
    if (v === this.visible) return;
    this.visible = v;
    this.root.classList.toggle('oculto', !v);
    if (!v) {
      for (const s of this.activos.values()) s.clear();
      this.root.querySelectorAll('.pulsado').forEach((n) => n.classList.remove('pulsado'));
    }
    this.sync();
  }

  dispose(): void {
    this.setVisible(false);
    const t = this.touch;
    t.steer = t.throttle = t.brake = 0;
    t.drift = t.itemHeld = t.itemPressed = t.pausePressed = false;
    this.root.remove();
  }
}
