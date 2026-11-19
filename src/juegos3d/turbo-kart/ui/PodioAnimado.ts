/**
 * Wukong Turbo Rush · podio animado (pantalla de resultados).
 *
 * La ilustración del podio (1600×900) se reconstruye por capas:
 *  - fondo sin el dragón (public/turbo-kart/anim/podio-fondo.webp) y el dragón
 *    recortado entrando en vuelo y ondulando en el cielo,
 *  - el niño guerrero respirando y celebrando, farolillos que titilan,
 *    rayos de sol girando y destellos en los trofeos,
 *  - fuegos artificiales reales y confeti en 3D en un <canvas>,
 *  - golpe dorado de la medalla del puesto con onda y esquirlas.
 * Solo corre con la pantalla visible; `stop()` lo para y `dispose()` lo borra.
 */
import { LienzoFx, MOVIMIENTO_REDUCIDO, ES_MOVIL, brillo, azar } from './lienzoFx';

const W = 1600;
const H = 900;
const RUTA = './turbo-kart/anim/';

function capa(padre: HTMLElement, cls: string, x0: number, y0: number, x1: number, y1: number, src?: string): HTMLElement {
  const n = document.createElement(src ? 'img' : 'div');
  n.className = cls;
  n.setAttribute('aria-hidden', 'true');
  if (src) {
    (n as HTMLImageElement).src = RUTA + src;
    (n as HTMLImageElement).alt = '';
    (n as HTMLImageElement).draggable = false;
    (n as HTMLImageElement).decoding = 'async';
  }
  n.style.left = `${(x0 / W) * 100}%`;
  n.style.top = `${(y0 / H) * 100}%`;
  n.style.width = `${((x1 - x0) / W) * 100}%`;
  n.style.height = `${((y1 - y0) / H) * 100}%`;
  padre.appendChild(n);
  return n;
}

const FAROLILLOS: readonly [number, number, number][] = [
  [200, 148, 44], [300, 112, 36], [24, 160, 30], [1350, 42, 46], [855, 64, 22], [890, 168, 22],
  [1362, 252, 22], [435, 264, 16], [455, 462, 34], [1440, 592, 88], [1245, 425, 18],
];
const TROFEOS: readonly [number, number, number][] = [
  [1015, 330, 55], [905, 385, 38], [1120, 385, 38],
];
const COLORES_FUEGO = [
  ['#fff1b8', '#ffd23f', '#ff9a3c'],
  ['#ffe0f0', '#ff5fa8', '#c8102e'],
  ['#e0fff4', '#5fd3b4', '#1f7a66'],
  ['#fff', '#9fd8ff', '#3a7bff'],
  ['#fff6dc', '#ffb347', '#ff5a1f'],
];
const COLORES_CONFETI = ['#ffd23f', '#f2c14e', '#c8102e', '#ff5a5a', '#5fd3b4', '#ffffff', '#ff9a3c'];

interface Cohete {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alto: number;
  pal: string[];
}
interface Chispa {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  max: number;
  color: string;
  tam: number;
  titila: boolean;
}
interface Confeti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  giro: number;
  vg: number;
  w: number;
  h: number;
  color: string;
}

export class PodioAnimado {
  private readonly escena: HTMLElement;
  private readonly fx: LienzoFx | null;
  private readonly raiz: HTMLElement;
  private activa = false;
  private puesto = 1;
  private cohetes: Cohete[] = [];
  private chispas: Chispa[] = [];
  private confeti: Confeti[] = [];
  private destellos: { x: number; y: number; vida: number; r: number }[] = [];
  private tCohete = 0;
  private tDestello = 0;
  private golpe: { t: number; hecho: boolean; el: HTMLElement | null } = { t: 0.55, hecho: false, el: null };
  /** Rectángulo de la escena dentro de la raíz (px CSS). */
  private rx = 0;
  private ry = 0;
  private rk = 1;
  private readonly movil = ES_MOVIL();
  private readonly reducido = MOVIMIENTO_REDUCIDO();
  private readonly ro: ResizeObserver | null;

  constructor(raiz: HTMLElement) {
    this.raiz = raiz;
    this.escena = document.createElement('div');
    this.escena.className = 'wk-po';
    raiz.prepend(this.escena);
    const cam = document.createElement('div');
    cam.className = 'wk-po-cam';
    this.escena.appendChild(cam);
    capa(cam, 'wk-po-fondo', 0, 0, W, H, 'podio-fondo.webp');
    capa(cam, 'wk-po-rayos', 650, -700, 2050, 700);
    for (const [x, y, r] of FAROLILLOS) {
      const f = capa(cam, 'wk-po-farol', x - r * 2, y - r * 2, x + r * 2, y + r * 2);
      f.style.animationDelay = `-${(Math.random() * 3).toFixed(2)}s`;
      f.style.animationDuration = `${(1.6 + Math.random() * 1.6).toFixed(2)}s`;
    }
    capa(cam, 'wk-po-trofeo', 900, 230, 1140, 470);
    const dragon = capa(cam, 'wk-po-dragon', 955, 15, 1600, 315);
    const dImg = document.createElement('img');
    dImg.src = RUTA + 'dragon.webp';
    dImg.alt = '';
    dImg.draggable = false;
    dragon.appendChild(dImg);
    capa(cam, 'wk-po-nino', 395, 170, 830, 605, 'nino.webp');
    capa(cam, 'wk-po-ojos', 600, 560, 720, 660);
    // Velo de contraste para el panel (antes era el fondo CSS de .results).
    const velo = document.createElement('div');
    velo.className = 'wk-po-velo';
    raiz.insertBefore(velo, this.escena.nextSibling);
    this.fx = this.reducido
      ? null
      : new LienzoFx(raiz, 'wk-po-fx', (c, dt, t, w, h) => this.dibujar(c, dt, t, w, h), this.movil ? 1 : 1.5);
    if (this.fx) raiz.insertBefore(this.fx.canvas, velo.nextSibling);
    this.ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => this.colocar()) : null;
    this.ro?.observe(raiz);
  }

  /** Arranca la escena para el puesto del jugador; `medalla` recibe el golpe dorado. */
  start(puesto: number, medalla: HTMLElement | null): void {
    this.puesto = puesto;
    this.cohetes = [];
    this.chispas = [];
    this.confeti = [];
    this.destellos = [];
    this.tCohete = 0.9;
    this.golpe = { t: 0.62, hecho: false, el: medalla };
    this.escena.classList.remove('intro');
    void this.escena.offsetWidth;
    this.escena.classList.add('intro', 'viva');
    this.escena.classList.toggle('triste', puesto > 3);
    this.colocar();
    this.activa = true;
    if (!this.fx) return;
    if (puesto <= 3) {
      const n = this.movil ? 55 : 110;
      for (let i = 0; i < n; i++) this.confeti.push(this.nuevoConfeti(true));
    }
    this.fx.start();
  }

  stop(): void {
    if (!this.activa) return;
    this.activa = false;
    this.escena.classList.remove('viva', 'intro');
    this.fx?.stop();
    this.cohetes = [];
    this.chispas = [];
    this.confeti = [];
  }

  dispose(): void {
    this.stop();
    this.ro?.disconnect();
    this.fx?.dispose();
    this.escena.remove();
  }

  /** Encaje tipo `cover` (escritorio) o franja superior (móvil vertical). */
  private colocar(): void {
    const r = this.raiz.getBoundingClientRect();
    const rw = r.width;
    const rh = r.height;
    if (rw < 2 || rh < 2) return;
    let w: number;
    let h: number;
    let x: number;
    let y: number;
    if (rw / rh < 0.9) {
      h = rh * 0.5;
      w = (h * W) / H;
      if (w < rw) {
        w = rw;
        h = (w * H) / W;
      }
      x = (rw - w) * 0.3;
      y = 0;
    } else {
      w = Math.max(rw, (rh * W) / H);
      h = (w * H) / W;
      x = (rw - w) * 0.28;
      y = (rh - h) * 0.5;
    }
    this.rx = x;
    this.ry = y;
    this.rk = w / W;
    const s = this.escena.style;
    s.left = `${x}px`;
    s.top = `${y}px`;
    s.width = `${w}px`;
    s.height = `${h}px`;
  }

  // -------------------------------------------------------------- partículas

  private nuevoConfeti(inicio: boolean): Confeti {
    const w = this.raiz.clientWidth || 800;
    const h = this.raiz.clientHeight || 600;
    return {
      x: azar(-20, w + 20),
      y: inicio ? azar(-h * 1.1, -10) : azar(-60, -10),
      vx: azar(-30, 30),
      vy: azar(60, 140),
      rot: azar(0, 6.28),
      vr: azar(-4, 4),
      giro: azar(0, 6.28),
      vg: azar(4, 10),
      w: azar(6, 11),
      h: azar(9, 16),
      color: COLORES_CONFETI[(Math.random() * COLORES_CONFETI.length) | 0],
    };
  }

  private estallido(x: number, y: number, pal: string[], n: number, fuerza: number, titila: boolean): void {
    const tope = this.movil ? 380 : 900;
    const anillo = Math.random() < 0.3;
    for (let i = 0; i < n && this.chispas.length < tope; i++) {
      const a = (i / n) * Math.PI * 2 + azar(-0.05, 0.05);
      const v = fuerza * (anillo ? azar(0.92, 1) : Math.sqrt(Math.random()));
      this.chispas.push({
        x,
        y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        vida: azar(1.1, 1.8),
        max: 1.8,
        color: pal[(Math.random() * pal.length) | 0],
        tam: azar(1.6, 2.8),
        titila,
      });
    }
  }

  private dibujar(c: CanvasRenderingContext2D, dt: number, t: number, w: number, h: number): void {
    const k = this.rk;
    const px = (x: number): number => this.rx + x * k;
    const py = (y: number): number => this.ry + y * k;
    const grav = 140 * Math.max(0.6, k * 1.4);

    // Golpe dorado de la medalla: esquirlas y anillo desde su centro.
    if (!this.golpe.hecho && t > this.golpe.t) {
      this.golpe.hecho = true;
      const m = this.golpe.el;
      if (m && m.isConnected) {
        const rr = this.raiz.getBoundingClientRect();
        const mr = m.getBoundingClientRect();
        const cx = mr.left + mr.width / 2 - rr.left;
        const cy = mr.top + mr.height / 2 - rr.top;
        const pal = this.puesto === 1 ? ['#fff7d6', '#ffd23f', '#f2c14e'] : this.puesto <= 3 ? ['#ffffff', '#e8eef5', '#ffd23f'] : ['#fff1d0', '#f2c14e'];
        this.estallido(cx, cy, pal, this.movil ? 40 : 70, 420, true);
      }
    }

    // Lanzamiento de cohetes según el puesto.
    this.tCohete -= dt;
    if (this.tCohete <= 0) {
      const ritmo = this.puesto === 1 ? [0.35, 0.8] : this.puesto <= 3 ? [0.6, 1.3] : [1.8, 3.2];
      this.tCohete = azar(ritmo[0], ritmo[1]) * (this.movil ? 1.4 : 1);
      const salva = this.puesto === 1 && Math.random() < 0.25 ? 3 : 1;
      for (let i = 0; i < salva; i++) {
        const x0 = azar(150, 1500);
        this.cohetes.push({
          x: px(x0),
          y: py(azar(520, 640)),
          vx: azar(-40, 40) * k,
          vy: -azar(620, 820) * Math.max(0.6, k),
          alto: py(azar(60, 280)),
          pal: COLORES_FUEGO[(Math.random() * COLORES_FUEGO.length) | 0],
        });
      }
    }

    c.globalCompositeOperation = 'lighter';
    // Cohetes subiendo con estela.
    const cohetes: Cohete[] = [];
    for (const r of this.cohetes) {
      r.vy += grav * 0.35 * dt;
      r.x += r.vx * dt;
      r.y += r.vy * dt;
      if (r.y <= r.alto || r.vy > -60) {
        const n = this.movil ? 46 : 80;
        this.estallido(r.x, r.y, r.pal, n, azar(170, 260) * Math.max(0.7, k * 1.2), Math.random() < 0.45);
        this.destellos.push({ x: r.x, y: r.y, vida: 1, r: 70 * Math.max(0.6, k) });
        continue;
      }
      c.globalAlpha = 0.9;
      c.strokeStyle = 'rgba(255,220,150,0.8)';
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(r.x, r.y);
      c.lineTo(r.x - r.vx * 0.06, r.y - r.vy * 0.06);
      c.stroke();
      c.drawImage(brillo('rgba(255,210,120,0.9)'), r.x - 7, r.y - 7, 14, 14);
      cohetes.push(r);
    }
    this.cohetes = cohetes;

    // Chispas de los estallidos.
    const vivas: Chispa[] = [];
    for (const s of this.chispas) {
      s.vida -= dt;
      if (s.vida <= 0) continue;
      s.vx *= 1 - 1.6 * dt;
      s.vy = s.vy * (1 - 1.6 * dt) + grav * 0.5 * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      const f = s.vida / s.max;
      let a = Math.min(1, f * 1.5);
      if (s.titila && f < 0.5) a *= Math.random() < 0.5 ? 0.2 : 1;
      c.globalAlpha = a;
      c.strokeStyle = s.color;
      c.lineWidth = s.tam * (0.5 + f * 0.6);
      c.beginPath();
      c.moveTo(s.x, s.y);
      c.lineTo(s.x - s.vx * 0.07, s.y - s.vy * 0.07);
      c.stroke();
      const g = s.tam * 5 * (0.4 + f);
      c.globalAlpha = a * 0.55;
      c.drawImage(brillo('rgba(255,220,160,0.7)'), s.x - g / 2, s.y - g / 2, g, g);
      vivas.push(s);
    }
    this.chispas = vivas;

    // Destellos: flash de cada estallido y brillos en los trofeos.
    this.tDestello -= dt;
    if (this.tDestello <= 0) {
      this.tDestello = azar(0.25, 0.6);
      const [tx, ty, tr] = TROFEOS[(Math.random() * TROFEOS.length) | 0];
      this.destellos.push({ x: px(tx + azar(-tr, tr) * 0.7), y: py(ty + azar(-tr, tr)), vida: 1, r: 22 * Math.max(0.5, k) });
    }
    this.destellos = this.destellos.filter((d) => (d.vida -= dt * 1.7) > 0);
    for (const d of this.destellos) {
      const e = Math.sin(d.vida * Math.PI);
      const r = d.r * e;
      c.globalAlpha = e;
      c.drawImage(brillo('rgba(255,236,170,0.9)', 0.3), d.x - r, d.y - r, r * 2, r * 2);
      if (d.r < 40) {
        c.strokeStyle = 'rgba(255,250,225,0.95)';
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(d.x - r * 1.7, d.y);
        c.lineTo(d.x + r * 1.7, d.y);
        c.moveTo(d.x, d.y - r * 1.7);
        c.lineTo(d.x, d.y + r * 1.7);
        c.stroke();
      }
    }

    // Confeti con giro 3D (normal, no aditivo).
    c.globalCompositeOperation = 'source-over';
    if (this.puesto <= 3 && t > 6 && this.confeti.length < (this.movil ? 30 : 60) && Math.random() < dt * 8) {
      this.confeti.push(this.nuevoConfeti(false));
    }
    const quedan: Confeti[] = [];
    for (const q of this.confeti) {
      q.vx += Math.sin(q.giro * 0.5 + q.rot) * 40 * dt;
      q.vx *= 1 - 0.8 * dt;
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      q.rot += q.vr * dt;
      q.giro += q.vg * dt;
      if (q.y > h + 30) {
        if (t < 6) quedan.push(Object.assign(q, this.nuevoConfeti(false)));
        continue;
      }
      if (q.y < -20) {
        quedan.push(q);
        continue;
      }
      const sc = Math.cos(q.giro);
      c.save();
      c.translate(q.x, q.y);
      c.rotate(q.rot);
      c.scale(1, sc);
      c.globalAlpha = 0.95;
      c.fillStyle = q.color;
      c.fillRect(-q.w / 2, -q.h / 2, q.w, q.h);
      if (sc > 0.6) {
        c.fillStyle = 'rgba(255,255,255,0.35)';
        c.fillRect(-q.w / 2, -q.h / 2, q.w, q.h * 0.3);
      }
      c.restore();
      quedan.push(q);
    }
    this.confeti = quedan;
    c.globalAlpha = 1;
    void w;
  }
}
