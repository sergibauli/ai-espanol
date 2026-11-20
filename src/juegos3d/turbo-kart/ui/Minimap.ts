/**
 * Minimapa circular «placa de laca»: el circuito gira con el jugador (su morro siempre apunta arriba),
 * con la pista en trazo de jade luminoso, la meta marcada, los rivales con su color y el jugador
 * como flecha dorada con un halo que late. Una brújula «北» en el borde indica el norte.
 *
 * Rendimiento: la pista se dibuja UNA vez por circuito en una capa fuera de pantalla; cada ~30 Hz
 * solo se copia esa capa girada y se pintan los puntos. Un Minimap por jugador (sin estado global).
 */
import type { IKart, ITrack } from '../core/types';
import { MINIMAP_SIZE } from '../core/constants';
import { cssHex, el } from './dom';

const REDRAW_INTERVAL = 1 / 30;
/** Margen (px CSS) entre el borde del lienzo y el circuito. */
const MARGEN = 12;
/** Velocidad con la que el mapa sigue el giro del jugador (1/s). */
const GIRO_SUAVE = 5;

export class Minimap {
  readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly layer: HTMLCanvasElement;
  private track: ITrack | null = null;
  private timer = 0;
  private reloj = 0;
  private readonly dpr: number;
  private readonly size: number;
  private readonly reducido: boolean;
  /** Centro del circuito (espacio normalizado) y escala normalizado → px de la capa. */
  private cx = 0.5;
  private cy = 0.5;
  private escala = 1;
  /** Giro actual del mapa (rad) y si ya se ha fijado. */
  private giro = 0;
  private giroListo = false;
  /** Meta en espacio normalizado y su dirección. */
  private metaX = 0;
  private metaY = 0;
  /** Aumento de los marcadores cuando el lienzo se muestra más pequeño (móvil, pantalla partida). */
  private marca = 1;
  private readonly observador: ResizeObserver | null = null;

  constructor(root: HTMLElement) {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.size = Math.round(MINIMAP_SIZE * this.dpr);
    this.canvas = el('canvas', 'minimap-canvas', undefined, root);
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.canvas.style.width = `${MINIMAP_SIZE}px`;
    this.canvas.style.height = `${MINIMAP_SIZE}px`;
    this.ctx = this.canvas.getContext('2d');
    this.layer = document.createElement('canvas');
    this.layer.width = this.size;
    this.layer.height = this.size;
    this.reducido = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof ResizeObserver !== 'undefined') {
      this.observador = new ResizeObserver((entradas) => {
        const w = entradas[0]?.contentRect.width ?? 0;
        if (w <= 0) return;
        const marca = Math.min(2.2, Math.max(1, MINIMAP_SIZE / w / 1.15));
        if (Math.abs(marca - this.marca) > 0.01) {
          this.marca = marca;
          this.renderStaticLayer();
        }
        this.timer = REDRAW_INTERVAL;
      });
      this.observador.observe(this.canvas);
    }
  }

  setTrack(track: ITrack | null): void {
    this.track = track;
    this.giroListo = false;
    this.medir();
    this.renderStaticLayer();
    this.timer = REDRAW_INTERVAL; // force an immediate redraw
  }

  update(dt: number, karts: readonly IKart[], playerId: number): void {
    this.timer += dt;
    this.reloj += dt;
    if (this.timer < REDRAW_INTERVAL) return;
    const paso = this.timer;
    this.timer = 0;
    const ctx = this.ctx;
    if (!ctx) return;
    const S = this.size;
    const h = S / 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, S, S);
    const track = this.track;
    if (!track) return;
    const mm = track.minimap;

    let jugador: IKart | null = null;
    for (let i = 0; i < karts.length; i++) if (karts[i].state.id === playerId) jugador = karts[i];

    // Giro del mapa: el morro del jugador (forward = (-sin h, -cos h) en el plano XZ) apunta arriba.
    if (jugador) {
      const hd = jugador.state.heading;
      const objetivo = -Math.PI / 2 - Math.atan2(-Math.cos(hd), -Math.sin(hd));
      if (!this.giroListo) {
        this.giro = objetivo;
        this.giroListo = true;
      } else {
        let delta = objetivo - this.giro;
        delta = Math.atan2(Math.sin(delta), Math.cos(delta));
        this.giro += delta * Math.min(1, paso * GIRO_SUAVE);
      }
    }
    const cos = Math.cos(this.giro);
    const sin = Math.sin(this.giro);
    const aPantalla = (nx: number, ny: number): [number, number] => {
      const x = (nx - this.cx) * this.escala;
      const y = (ny - this.cy) * this.escala;
      return [h + x * cos - y * sin, h + x * sin + y * cos];
    };

    // Capa estática girada.
    ctx.save();
    ctx.translate(h, h);
    ctx.rotate(this.giro);
    ctx.drawImage(this.layer, -h, -h);
    ctx.restore();

    const d = this.dpr * this.marca;
    // Bandera de meta (sin girar, para que se lea).
    const [mx, my] = aPantalla(this.metaX, this.metaY);
    this.dibujarBandera(ctx, mx, my, d);

    // Rivales primero; el jugador siempre encima.
    for (let i = 0; i < karts.length; i++) {
      const k = karts[i];
      if (k.state.id === playerId) continue;
      const p = mm.worldToMap(k.state.position.x, k.state.position.z);
      const [x, y] = aPantalla(p.x, p.y);
      const color = cssHex(k.state.character.color);
      ctx.beginPath();
      ctx.arc(x, y, 6.5 * d, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 4.6 * d, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6 * d;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.4 * d;
      ctx.strokeStyle = 'rgba(255,246,214,0.9)';
      ctx.stroke();
    }

    if (jugador) {
      const p = mm.worldToMap(jugador.state.position.x, jugador.state.position.z);
      const [x, y] = aPantalla(p.x, p.y);
      const color = cssHex(jugador.state.character.color);
      // Halo que late (fijo si el sistema pide menos movimiento).
      const fase = this.reducido ? 0.5 : (this.reloj * 1.6) % 1;
      ctx.beginPath();
      ctx.arc(x, y, (8 + fase * 12) * d, 0, Math.PI * 2);
      ctx.lineWidth = 2.2 * d;
      ctx.strokeStyle = `rgba(255,225,120,${(0.85 * (1 - fase)).toFixed(3)})`;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 9 * d, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,210,80,0.28)';
      ctx.fill();
      // Flecha: el mapa gira con el jugador, así que apunta casi siempre hacia arriba.
      const hd = jugador.state.heading;
      const ang = Math.atan2(-Math.cos(hd), -Math.sin(hd)) + this.giro;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang + Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, -10 * d);
      ctx.lineTo(7 * d, 7 * d);
      ctx.lineTo(0, 3.5 * d);
      ctx.lineTo(-7 * d, 7 * d);
      ctx.closePath();
      ctx.shadowColor = 'rgba(255,200,60,0.95)';
      ctx.shadowBlur = 8 * d;
      ctx.fillStyle = color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 2 * d;
      ctx.strokeStyle = '#fff6d6';
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.restore();
    }

    // Brújula: «北» en el borde, girando con el mapa.
    const rN = h - 8.5 * d;
    const nx = h + rN * sin;
    const ny = h - rN * cos;
    ctx.beginPath();
    ctx.arc(nx, ny, 7.5 * d, 0, Math.PI * 2);
    ctx.fillStyle = '#8a1a1e';
    ctx.fill();
    ctx.lineWidth = 1.5 * d;
    ctx.strokeStyle = '#f2c14e';
    ctx.stroke();
    ctx.fillStyle = '#ffe9a8';
    ctx.font = `900 ${9 * d}px 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('北', nx, ny + 0.5 * d);
  }

  dispose(): void {
    this.observador?.disconnect();
    this.canvas.remove();
    this.track = null;
  }

  /** Centro y escala para que el circuito quepa en el círculo gire como gire. */
  private medir(): void {
    const track = this.track;
    if (!track) return;
    const mm = track.minimap;
    const pts = mm.leftEdge.length > 1 ? [...mm.leftEdge, ...mm.rightEdge] : mm.points;
    if (pts.length === 0) return;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    this.cx = (minX + maxX) / 2;
    this.cy = (minY + maxY) / 2;
    let rMax = 0.0001;
    for (const p of pts) rMax = Math.max(rMax, Math.hypot(p.x - this.cx, p.y - this.cy));
    this.escala = (this.size / 2 - MARGEN * this.dpr) / rMax;
    if (mm.points.length > 0) {
      this.metaX = mm.points[0].x;
      this.metaY = mm.points[0].y;
    }
  }

  private dibujarBandera(ctx: CanvasRenderingContext2D, x: number, y: number, d: number): void {
    // Mástil + banderín ajedrezado con el carácter 终 (meta) encima.
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -15 * d);
    ctx.lineWidth = 1.6 * d;
    ctx.strokeStyle = '#fff6d6';
    ctx.stroke();
    const c = 3 * d;
    for (let r = 0; r < 2; r++) {
      for (let q = 0; q < 3; q++) {
        ctx.fillStyle = (r + q) % 2 === 0 ? '#ffffff' : '#111111';
        ctx.fillRect(q * c, -15 * d + r * c, c, c);
      }
    }
    ctx.strokeStyle = '#f2c14e';
    ctx.lineWidth = 0.8 * d;
    ctx.strokeRect(0, -15 * d, 3 * c, 2 * c);
    ctx.beginPath();
    ctx.arc(0, 0, 2.4 * d, 0, Math.PI * 2);
    ctx.fillStyle = '#f2c14e';
    ctx.fill();
    ctx.restore();
  }

  private renderStaticLayer(): void {
    const ctx = this.layer.getContext('2d');
    if (!ctx) return;
    const S = this.size;
    const h = S / 2;
    const d = this.dpr * this.marca;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, S, S);
    const track = this.track;
    if (!track) return;
    const mm = track.minimap;
    const toX = (v: number) => h + (v - this.cx) * this.escala;
    const toY = (v: number) => h + (v - this.cy) * this.escala;

    const tracePoly = (pts: readonly { x: number; y: number }[], close: boolean) => {
      if (pts.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(toX(pts[0].x), toY(pts[0].y));
      for (let i = 1; i < pts.length; i++) ctx.lineTo(toX(pts[i].x), toY(pts[i].y));
      if (close) ctx.closePath();
    };

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const pts = mm.points;
    if (pts.length < 2) return;

    // Ancho de la cinta en px (media de la distancia entre bordes), con mínimo legible.
    let ancho = 7 * d;
    if (mm.leftEdge.length > 1 && mm.rightEdge.length > 1) {
      let suma = 0;
      const n = Math.min(mm.leftEdge.length, mm.rightEdge.length);
      for (let i = 0; i < n; i++) suma += Math.hypot(mm.leftEdge[i].x - mm.rightEdge[i].x, mm.leftEdge[i].y - mm.rightEdge[i].y);
      ancho = Math.max(6 * d, Math.min(14 * d, (suma / n) * this.escala));
    }

    // 1) Resplandor de jade.
    tracePoly(pts, true);
    ctx.shadowColor = 'rgba(80,255,190,0.9)';
    ctx.shadowBlur = 14 * d;
    ctx.lineWidth = ancho + 5 * d;
    ctx.strokeStyle = 'rgba(40,190,140,0.55)';
    ctx.stroke();
    ctx.shadowBlur = 0;
    // 2) Bordes dorados finos.
    ctx.lineWidth = ancho + 3 * d;
    ctx.strokeStyle = 'rgba(242,193,78,0.9)';
    ctx.stroke();
    // 3) Asfalto de jade oscuro.
    ctx.lineWidth = ancho;
    ctx.strokeStyle = '#0c3a2e';
    ctx.stroke();
    // 4) Trazo de jade luminoso.
    ctx.lineWidth = Math.max(2 * d, ancho * 0.38);
    ctx.strokeStyle = '#5fffc8';
    ctx.shadowColor = 'rgba(120,255,210,0.9)';
    ctx.shadowBlur = 6 * d;
    ctx.stroke();
    ctx.shadowBlur = 0;
    // 5) Línea central discontinua.
    ctx.setLineDash([2 * d, 4 * d]);
    ctx.lineWidth = 1 * d;
    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.stroke();
    ctx.setLineDash([]);

    // Línea de meta ajedrezada a lo ancho de la pista.
    const p0 = pts[0];
    const p1 = pts[1];
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const half = ancho / 2 + 2.5 * d;
    const cx = toX(p0.x);
    const cy = toY(p0.y);
    ctx.beginPath();
    ctx.moveTo(cx - nx * half, cy - ny * half);
    ctx.lineTo(cx + nx * half, cy + ny * half);
    ctx.lineCap = 'butt';
    ctx.lineWidth = 4 * d;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.setLineDash([2 * d, 2 * d]);
    ctx.strokeStyle = '#111111';
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
