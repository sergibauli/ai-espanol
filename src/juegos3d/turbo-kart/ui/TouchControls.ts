/**
 * Wukong Turbo Rush · controles táctiles (móvil y tableta).
 *
 * Esquema a dos pulgares:
 *  - Pulgar DERECHO: joystick analógico flotante. Aparece donde se apoya el pulgar dentro
 *    de la zona inferior derecha. Eje X = dirección (-1…1, con zona muerta y curva suave).
 *    Tirar hacia ABAJO = frenar / marcha atrás. Con «AUTO» apagado, empujar hacia ARRIBA acelera.
 *  - Pulgar IZQUIERDO: botón grande «Derrape · 漂移» (mantener) y botón «Objeto · 道具».
 *  - Arriba a la izquierda: pastillas «AUTO» (acelerar solo) y pausa.
 * Aceleración automática por defecto: en el móvil no hace falta un tercer dedo.
 * Pointer Events con setPointerCapture: cada control sigue sus propios toques (multitáctil).
 * Vibración corta (si el navegador la tiene) al empezar a derrapar, al subir de nivel de
 * turbo de derrape y al coger un turbo.
 */
import type { TouchInput } from '../kart/InputManager';
import { events } from '../core/events';
import { el } from './dom';

type Clave = 'derrape' | 'objeto';

/** Fracción del radio en la que el mando no hace nada. */
const ZONA_MUERTA = 0.14;
/** A partir de esta fracción hacia abajo, el mando frena. */
const UMBRAL_FRENO = 0.5;
/** A partir de esta fracción hacia arriba, el mando acelera (solo con AUTO apagado). */
const UMBRAL_ACEL = 0.3;
/** Si el pulgar se aleja más que esto (× radio), la base lo sigue. */
const ARRASTRE_BASE = 1.35;
/** Id del kart del jugador en una carrera táctil (siempre hay un único jugador). */
const KART_JUGADOR = 0;

const NUBE_SVG =
  '<svg viewBox="0 0 64 64" aria-hidden="true" class="wk-joy-nube">' +
  '<path d="M14 38c-5 0-8-3.4-8-7.4 0-4.2 3.4-7.4 7.6-7.4 1-5.4 5.6-9.2 11.2-9.2 4.4 0 8.2 2.4 10 6 1.2-.6 2.6-.9 4-.9 5 0 9 3.8 9.2 8.6 4.4.4 7.8 3.8 7.8 8 0 4.6-3.8 8.2-8.6 8.2H28" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>' +
  '<path d="M28 46.1c-4.6 0-7.4-2.6-7.4-6 0-3 2.4-5.2 5.4-5.2 2.4 0 4.2 1.6 4.2 3.6 0 1.6-1.2 2.7-2.8 2.7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>' +
  '<path d="M36 30.5c0-2.4 1.9-4.2 4.3-4.2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' +
  '</svg>';

const ARO_SVG =
  '<svg viewBox="0 0 200 200" aria-hidden="true" class="wk-joy-aro">' +
  '<circle cx="100" cy="100" r="94" class="aro-ext"/>' +
  '<circle cx="100" cy="100" r="80" class="aro-int"/>' +
  // Marcas cardinales y diagonales (ocho, como las puertas de la ciudad imperial).
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const x1 = 100 + Math.cos(a) * 84;
    const y1 = 100 + Math.sin(a) * 84;
    const x2 = 100 + Math.cos(a) * 92;
    const y2 = 100 + Math.sin(a) * 92;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="aro-marca"/>`;
  }).join('') +
  '<path d="M30 100 l14 -10 v20z" class="aro-flecha izq"/>' +
  '<path d="M170 100 l-14 -10 v20z" class="aro-flecha der"/>' +
  '<path d="M100 172 l-11 -12 h22z" class="aro-flecha abajo"/>' +
  '</svg>';

export class TouchControls {
  private readonly root: HTMLElement;
  private readonly activos = new Map<Clave, Set<number>>();
  private autoAcelerar = true;
  private readonly autoBtn: HTMLButtonElement;
  private visible = false;

  // --- joystick -------------------------------------------------------------
  private readonly zona: HTMLElement;
  private readonly joy: HTMLElement;
  private readonly mando: HTMLElement;
  private joyPointer: number | null = null;
  /** Centro de la base, relativo a la zona. */
  private cx = 0;
  private cy = 0;
  private joyX = 0;
  private joyY = 0;
  private ultimoEstadoFreno = false;
  private readonly offEventos: (() => void)[] = [];
  private ultimaVibracion = 0;

  constructor(
    parent: HTMLElement,
    private readonly touch: TouchInput,
  ) {
    this.root = el('div', 'wk-tactil wk-tactil-v2 oculto', undefined, parent);
    this.root.setAttribute('translate', 'no');

    // Pulgar izquierdo: derrape (grande) y objeto.
    const izq = el('div', 'wk-tactil-izq', undefined, this.root);
    this.boton(izq, 'derrape', '漂', 'Derrape · 漂移');
    this.boton(izq, 'objeto', '宝', 'Objeto · 道具');

    // Pulgar derecho: zona del joystick.
    this.zona = el('div', 'wk-joy-zona', undefined, this.root);
    this.zona.setAttribute('aria-label', 'Volante: desliza el pulgar · 方向盘：滑动拇指');
    this.joy = el('div', 'wk-joy reposo', undefined, this.zona);
    const base = el('div', 'wk-joy-base', undefined, this.joy);
    base.innerHTML = ARO_SVG;
    this.mando = el('div', 'wk-joy-mando', undefined, this.joy);
    this.mando.innerHTML = NUBE_SVG;
    const pista = el('div', 'wk-joy-pista', undefined, this.joy);
    el('span', 'es', 'Gira · Frena ▼', pista);
    el('span', 'zh', '转向 · 下拉刹车', pista);
    this.zona.addEventListener('pointerdown', this.onJoyDown);
    this.zona.addEventListener('pointermove', this.onJoyMove);
    this.zona.addEventListener('pointerup', this.onJoyUp);
    this.zona.addEventListener('pointercancel', this.onJoyUp);
    this.zona.addEventListener('lostpointercapture', this.onJoyUp);
    this.zona.addEventListener('contextmenu', (e) => e.preventDefault());

    // Arriba a la izquierda: AUTO y pausa.
    const arriba = el('div', 'wk-tactil-arriba', undefined, this.root);
    this.autoBtn = el('button', 'wk-tactil-auto on', undefined, arriba);
    this.autoBtn.type = 'button';
    this.autoBtn.setAttribute('aria-label', 'Acelerar automáticamente · 自动加速');
    this.autoBtn.setAttribute('aria-pressed', 'true');
    el('span', 'wk-tactil-auto-es', 'AUTO', this.autoBtn);
    el('span', 'wk-tactil-auto-zh', '自动', this.autoBtn);
    this.autoBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.autoAcelerar = !this.autoAcelerar;
      this.autoBtn.classList.toggle('on', this.autoAcelerar);
      this.autoBtn.setAttribute('aria-pressed', String(this.autoAcelerar));
      this.root.classList.toggle('sin-auto', !this.autoAcelerar);
      this.sync();
    });
    const pausa = el('button', 'wk-tactil-pausa', undefined, arriba);
    pausa.type = 'button';
    pausa.setAttribute('aria-label', 'Pausa · 暂停');
    el('span', 'wk-tactil-pausa-ico', undefined, pausa);
    pausa.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.touch.pausePressed = true;
    });

    // Vibración: solo eventos del kart del jugador, cortos y espaciados.
    this.offEventos.push(
      events.on('kart:driftStart', (e) => {
        if (e.kartId === KART_JUGADOR) this.vibrar(12);
      }),
      events.on('kart:driftStage', (e) => {
        if (e.kartId === KART_JUGADOR) this.vibrar(e.stage === 3 ? [14, 40, 14] : 14);
      }),
      events.on('kart:boost', (e) => {
        if (e.kartId === KART_JUGADOR && e.source !== 'start') this.vibrar(26);
      }),
    );
  }

  static esTactil(): boolean {
    if (typeof window === 'undefined') return false;
    return !!window.matchMedia?.('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  // ------------------------------------------------------------------ botones

  private boton(parent: HTMLElement, clave: Clave, glifo: string, etiqueta: string): void {
    const b = el('button', `wk-tactil-btn ${clave}`, undefined, parent);
    b.type = 'button';
    b.setAttribute('aria-label', etiqueta);
    const [es, zh] = etiqueta.split(' · ');
    el('span', 'wk-tactil-glifo', glifo, b);
    el('span', 'wk-tactil-etq', es, b);
    el('span', 'wk-tactil-etq-zh', zh, b);
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

  // ----------------------------------------------------------------- joystick

  private radio(): number {
    const w = this.joy.offsetWidth;
    return w > 0 ? w / 2 : 60;
  }

  private colocarBase(): void {
    this.joy.style.transform = `translate3d(${this.cx}px, ${this.cy}px, 0)`;
  }

  private readonly onJoyDown = (e: PointerEvent): void => {
    if (this.joyPointer !== null) return;
    e.preventDefault();
    e.stopPropagation();
    this.joyPointer = e.pointerId;
    try {
      this.zona.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const r = this.zona.getBoundingClientRect();
    const R = this.radio();
    // La base aparece bajo el pulgar, sin salirse de la zona.
    const m = R * 0.9;
    this.cx = clampN(e.clientX - r.left, m, Math.max(m, r.width - m));
    this.cy = clampN(e.clientY - r.top, m, Math.max(m, r.height - m));
    this.joy.classList.remove('reposo');
    this.joy.classList.add('activo');
    this.colocarBase();
    this.moverMando(e.clientX - r.left, e.clientY - r.top);
  };

  private readonly onJoyMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.joyPointer) return;
    e.preventDefault();
    const r = this.zona.getBoundingClientRect();
    this.moverMando(e.clientX - r.left, e.clientY - r.top);
  };

  private readonly onJoyUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.joyPointer) return;
    this.soltarJoystick();
  };

  private soltarJoystick(): void {
    this.joyPointer = null;
    this.joyX = 0;
    this.joyY = 0;
    this.joy.classList.remove('activo', 'frenando', 'acelerando', 'girando');
    this.joy.classList.add('reposo');
    this.joy.style.transform = '';
    this.mando.style.transform = '';
    this.sync();
  }

  private moverMando(px: number, py: number): void {
    const R = this.radio();
    let dx = px - this.cx;
    let dy = py - this.cy;
    let d = Math.hypot(dx, dy);
    // Base que sigue al pulgar si este se va muy lejos (no se pierde el control).
    const lim = R * ARRASTRE_BASE;
    if (d > lim) {
      const k = (d - lim) / d;
      this.cx += dx * k;
      this.cy += dy * k;
      this.colocarBase();
      dx = px - this.cx;
      dy = py - this.cy;
      d = Math.hypot(dx, dy);
    }
    // El mando visual se queda dentro del aro.
    const vis = d > R ? R / d : 1;
    this.mando.style.transform = `translate3d(${dx * vis}px, ${dy * vis}px, 0)`;
    const nx = clampN(dx / R, -1, 1);
    const ny = clampN(dy / R, -1, 1);
    this.joyX = respuesta(nx);
    this.joyY = ny;
    this.sync();
  }

  // ---------------------------------------------------------------- composición

  private sync(): void {
    const t = this.touch;
    const activo = this.joyPointer !== null;
    t.steer = activo ? this.joyX : 0;
    const bajada = activo ? this.joyY : 0;
    const freno = bajada > UMBRAL_FRENO;
    t.brake = freno ? clampN((bajada - UMBRAL_FRENO) / (0.85 - UMBRAL_FRENO), 0.6, 1) : 0;
    const empuje = !this.autoAcelerar && activo && bajada < -UMBRAL_ACEL;
    t.throttle = !freno && ((this.autoAcelerar && this.visible) || empuje) ? 1 : 0;
    t.drift = this.on('derrape');
    t.itemHeld = this.on('objeto');
    this.joy.classList.toggle('frenando', freno);
    this.joy.classList.toggle('acelerando', empuje);
    this.joy.classList.toggle('girando', Math.abs(this.joyX) > 0.05);
    this.joy.classList.toggle('derrapando', t.drift && activo);
    if (freno && !this.ultimoEstadoFreno) this.vibrar(8);
    this.ultimoEstadoFreno = freno;
  }

  private vibrar(patron: number | number[]): void {
    if (!this.visible) return;
    const ahora = performance.now();
    if (ahora - this.ultimaVibracion < 120) return;
    this.ultimaVibracion = ahora;
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') navigator.vibrate(patron);
    } catch {
      /* sin vibración */
    }
  }

  setVisible(v: boolean): void {
    if (v === this.visible) return;
    this.visible = v;
    this.root.classList.toggle('oculto', !v);
    if (!v) {
      for (const s of this.activos.values()) s.clear();
      this.root.querySelectorAll('.pulsado').forEach((n) => n.classList.remove('pulsado'));
      if (this.joyPointer !== null) {
        try {
          this.zona.releasePointerCapture(this.joyPointer);
        } catch {
          /* ignore */
        }
      }
      this.soltarJoystick();
    }
    this.sync();
  }

  dispose(): void {
    this.setVisible(false);
    for (const off of this.offEventos) off();
    this.offEventos.length = 0;
    const t = this.touch;
    t.steer = t.throttle = t.brake = 0;
    t.drift = t.itemHeld = t.itemPressed = t.pausePressed = false;
    this.root.remove();
  }
}

function clampN(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Zona muerta + curva suave: precisión cerca del centro, giro completo en el borde. */
function respuesta(v: number): number {
  const a = Math.abs(v);
  if (a < ZONA_MUERTA) return 0;
  const n = (a - ZONA_MUERTA) / (1 - ZONA_MUERTA);
  return Math.sign(v) * Math.pow(clampN(n, 0, 1), 1.3);
}
