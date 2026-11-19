/**
 * Wukong Turbo Rush · lienzo de efectos para la portada y el podio.
 *
 * Un único <canvas> 2D con bucle requestAnimationFrame que solo corre mientras
 * la pantalla está visible (se para con la pestaña oculta) y se libera entero
 * en `dispose()`. La carrera nunca paga este coste: las pantallas lo arrancan
 * en `show()` y lo paran en `hide()`.
 */

export const MOVIMIENTO_REDUCIDO = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ES_MOVIL = (): boolean =>
  typeof matchMedia === 'function' && (matchMedia('(pointer: coarse)').matches || innerWidth < 760);

/** Sprite de brillo radial (blanco teñido) cacheado por color. */
const sprites = new Map<string, HTMLCanvasElement>();
export function brillo(color: string, nucleo = 0.18): HTMLCanvasElement {
  const key = `${color}|${nucleo}`;
  let c = sprites.get(key);
  if (c) return c;
  c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(nucleo, color);
  grad.addColorStop(0.55, color.replace(/[\d.]+\)$/, '0.25)'));
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  sprites.set(key, c);
  return c;
}

/** Libera los sprites al salir del juego (los canvas sueltos no están en el DOM). */
export function liberarSprites(): void {
  for (const c of sprites.values()) c.width = c.height = 0;
  sprites.clear();
}

export type Dibujo = (ctx: CanvasRenderingContext2D, dt: number, t: number, w: number, h: number) => void;

export class LienzoFx {
  readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private raf = 0;
  private ultimo = 0;
  private t = 0;
  private ancho = 0;
  private alto = 0;
  private escala = 1;
  private readonly ro: ResizeObserver | null;
  private corriendo = false;
  private readonly onVis = (): void => {
    if (document.hidden) this.cancelar();
    else if (this.corriendo) this.pedir();
  };

  constructor(
    padre: HTMLElement,
    clase: string,
    private readonly dibujar: Dibujo,
    private readonly dprMax = 1.5,
  ) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = clase;
    this.canvas.setAttribute('aria-hidden', 'true');
    padre.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d', { alpha: true })!;
    this.ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => this.medir()) : null;
    this.ro?.observe(this.canvas);
    document.addEventListener('visibilitychange', this.onVis);
  }

  get w(): number {
    return this.ancho;
  }
  get h(): number {
    return this.alto;
  }

  start(): void {
    if (this.corriendo) return;
    this.corriendo = true;
    this.t = 0;
    this.medir();
    this.pedir();
  }

  stop(): void {
    this.corriendo = false;
    this.cancelar();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  dispose(): void {
    this.stop();
    this.ro?.disconnect();
    document.removeEventListener('visibilitychange', this.onVis);
    this.canvas.width = this.canvas.height = 0;
    this.canvas.remove();
  }

  private pedir(): void {
    if (this.raf) return;
    this.ultimo = performance.now();
    this.raf = requestAnimationFrame(this.paso);
  }

  private cancelar(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private medir(): void {
    const r = this.canvas.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const dpr = Math.min(this.dprMax, window.devicePixelRatio || 1);
    const cw = Math.round(r.width * dpr);
    const ch = Math.round(r.height * dpr);
    if (cw !== this.canvas.width || ch !== this.canvas.height) {
      this.canvas.width = cw;
      this.canvas.height = ch;
    }
    this.ancho = r.width;
    this.alto = r.height;
    this.escala = dpr;
  }

  private readonly paso = (ahora: number): void => {
    this.raf = 0;
    if (!this.corriendo) return;
    const dt = Math.min(0.05, Math.max(0, (ahora - this.ultimo) / 1000));
    this.ultimo = ahora;
    this.t += dt;
    if (!this.ancho) this.medir();
    const c = this.ctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = 'source-over';
    c.globalAlpha = 1;
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.ancho) {
      c.setTransform(this.escala, 0, 0, this.escala, 0, 0);
      this.dibujar(c, dt, this.t, this.ancho, this.alto);
    }
    this.raf = requestAnimationFrame(this.paso);
  };
}

export const azar = (a: number, b: number): number => a + Math.random() * (b - a);
