/**
 * Wukong Turbo Rush · portada animada.
 *
 * La ilustración plana (public/turbo-kart/portada.webp, 1600×1200) cobra vida
 * por capas recortadas de la propia imagen (public/turbo-kart/anim):
 *  - entrada de cámara (zoom + luz) y golpe del logo con destello y onda,
 *  - logo flotando con barrido de oro, alas de jade que laten,
 *  - kart al ralentí con el núcleo de jade palpitando y chispas en las ruedas,
 *  - cometa de luz recorriendo el anillo de la plataforma,
 *  - farolillos que titilan, linternas celestes que suben, brasas y niebla.
 * Todo vive dentro de `.wk-pa` y solo se anima con la portada visible.
 */
import { LienzoFx, MOVIMIENTO_REDUCIDO, ES_MOVIL, brillo, azar } from './lienzoFx';

const W = 1600;
const H = 1200;
const RUTA = './turbo-kart/anim/';

/** Coloca una capa en coordenadas de la ilustración (px de la imagen original). */
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

interface Part {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  max: number;
  tam: number;
  tipo: 0 | 1 | 2 | 3; // 0 brasa · 1 chispa · 2 linterna · 3 esquirla dorada
  fase: number;
}

/** Puntos de las estelas de dragones dorados y de las llamas del logo. */
const DESTELLOS: readonly [number, number][] = [
  [190, 600], [260, 585], [330, 600], [1250, 610], [1330, 595], [1420, 630],
  [705, 600], [745, 640], [1085, 690], [1120, 720], [1480, 115], [590, 500], [1010, 500],
];
const LLAMAS: readonly [number, number][] = [
  [455, 175], [1095, 300], [1150, 420], [1005, 430], [650, 445], [470, 395],
];
const FAROLILLOS: readonly [number, number, number][] = [
  [340, 108, 46], [1268, 68, 40], [152, 365, 32], [1418, 365, 32], [1250, 640, 22],
];

export class PortadaAnimada {
  private readonly raiz: HTMLElement;
  private readonly cam: HTMLElement;
  private readonly fx: LienzoFx | null;
  private parts: Part[] = [];
  private activa = false;
  private turno = 0;
  private golpeHecho = false;
  private tEmision = 0;
  private tLinterna = 0;
  private tDestello = 0;
  private estrella = { x: 0, y: 0, vx: 0, vy: 0, vida: 0 };
  private destellos: { x: number; y: number; vida: number }[] = [];
  private readonly movil = ES_MOVIL();
  private readonly reducido = MOVIMIENTO_REDUCIDO();

  /** `arte` es `.wk-arte`; la imagen base se mueve dentro de la cámara. */
  constructor(arte: HTMLElement, img: HTMLImageElement) {
    this.raiz = document.createElement('div');
    this.raiz.className = 'wk-pa';
    this.cam = document.createElement('div');
    this.cam.className = 'wk-pa-cam';
    this.raiz.appendChild(this.cam);
    arte.appendChild(this.raiz);
    this.cam.appendChild(img);

    // Hueco sin logo (el logo recortado entra después y lo tapa).
    capa(this.cam, 'wk-pa-hueco', 440, 40, 1200, 490, 'portada-hueco.webp');
    for (const [x, y, r] of FAROLILLOS) capa(this.cam, 'wk-pa-farol', x - r * 2, y - r * 2, x + r * 2, y + r * 2);
    capa(this.cam, 'wk-pa-niebla atras', -200, 560, 1800, 980);
    this.fx = this.reducido
      ? null
      : new LienzoFx(this.cam, 'wk-pa-fx', (c, dt, t, w, h) => this.dibujar(c, dt, t, w, h), this.movil ? 1 : 1.5);
    capa(this.cam, 'wk-pa-ala izq', 110, 290, 570, 580, 'alaI.webp');
    capa(this.cam, 'wk-pa-ala der', 1050, 290, 1510, 580, 'alaD.webp');
    capa(this.cam, 'wk-pa-kart', 495, 575, 1085, 885, 'kart.webp');
    capa(this.cam, 'wk-pa-nucleo', 690, 705, 840, 855);
    capa(this.cam, 'wk-pa-faro', 640, 655, 890, 905);
    const logo = capa(this.cam, 'wk-pa-logo', 440, 40, 1200, 490);
    const logoImg = document.createElement('img');
    logoImg.src = RUTA + 'logo.webp';
    logoImg.alt = '';
    logoImg.draggable = false;
    logo.appendChild(logoImg);
    const brilloLogo = document.createElement('div');
    brilloLogo.className = 'wk-pa-logo-brillo';
    brilloLogo.style.setProperty('-webkit-mask-image', `url(${RUTA}logo.webp)`);
    brilloLogo.style.setProperty('mask-image', `url(${RUTA}logo.webp)`);
    logo.appendChild(brilloLogo);
    capa(this.cam, 'wk-pa-onda', 520, 0, 1120, 530);
    capa(this.cam, 'wk-pa-niebla delante', -300, 760, 1900, 1200);
    capa(this.raiz, 'wk-pa-flash', -400, -400, 2000, 1600);
  }

  /** Arranca (o reinicia) la animación de entrada y el bucle de partículas. */
  start(): void {
    if (this.activa) return;
    this.activa = true;
    this.parts = [];
    this.destellos = [];
    this.golpeHecho = false;
    const titulo = this.raiz.closest('.wk-titulo');
    titulo?.classList.remove('wk-intro');
    titulo?.classList.add('wk-espera');
    this.raiz.classList.remove('intro', 'viva');
    this.raiz.classList.add('espera');
    // La entrada espera a que las capas estén decodificadas y a un fotograma pintado:
    // si no, el golpe del logo ocurriría con las imágenes aún sin cargar.
    const turno = ++this.turno;
    const imgs = Array.from(this.raiz.querySelectorAll('img'));
    const listas = Promise.all(imgs.map((i) => (i.decode ? i.decode().catch(() => undefined) : undefined)));
    const tope = new Promise((r) => setTimeout(r, 2500));
    void Promise.race([listas, tope]).then(() => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!this.activa || turno !== this.turno) return;
          this.raiz.classList.remove('espera');
          this.raiz.classList.add('intro', 'viva');
          titulo?.classList.remove('wk-espera');
          titulo?.classList.add('wk-intro');
          this.fx?.start();
        }),
      );
    });
  }

  stop(): void {
    if (!this.activa) return;
    this.activa = false;
    this.turno++;
    this.raiz.classList.remove('viva', 'espera');
    this.fx?.stop();
    this.parts = [];
  }

  dispose(): void {
    this.stop();
    this.fx?.dispose();
    this.raiz.remove();
  }

  // ------------------------------------------------------------------ partículas

  private emitir(p: Omit<Part, 'vida' | 'fase'> & { fase?: number }): void {
    if (this.parts.length > (this.movil ? 140 : 260)) return;
    this.parts.push({ ...p, vida: p.max, fase: p.fase ?? Math.random() * 6.28 });
  }

  private dibujar(c: CanvasRenderingContext2D, dt: number, t: number, w: number, h: number): void {
    const sx = w / W;
    const sy = h / H;
    c.globalCompositeOperation = 'lighter';

    // Golpe del logo: esquirlas doradas en abanico (coincide con la animación CSS).
    if (!this.golpeHecho && t > 0.82) {
      this.golpeHecho = true;
      for (let i = 0; i < (this.movil ? 50 : 90); i++) {
        const a = azar(0, Math.PI * 2);
        const v = azar(250, 900);
        this.emitir({ x: 820 + Math.cos(a) * 120, y: 260 + Math.sin(a) * 60, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 0.6, max: azar(0.6, 1.3), tam: azar(3, 7), tipo: 3 });
      }
    }

    // Emisión continua.
    this.tEmision -= dt;
    if (this.tEmision <= 0) {
      this.tEmision = this.movil ? 0.07 : 0.035;
      // brasas desde la plataforma y las llamas del logo
      const [lx, ly] = LLAMAS[(Math.random() * LLAMAS.length) | 0];
      if (Math.random() < 0.5) this.emitir({ x: lx + azar(-20, 20), y: ly, vx: azar(-15, 15), vy: azar(-80, -40), max: azar(1.2, 2.2), tam: azar(2, 4), tipo: 0 });
      else this.emitir({ x: azar(380, 1300), y: azar(860, 1000), vx: azar(-20, 20), vy: azar(-130, -60), max: azar(2.5, 4.5), tam: azar(3.5, 7), tipo: 0 });
      // chispas de derrape en las ruedas traseras
      for (const [wx, wy, dir] of [
        [712, 845, -1],
        [1018, 868, 1],
      ] as const) {
        if (Math.random() < 0.75)
          this.emitir({ x: wx + azar(-8, 8), y: wy, vx: dir * azar(60, 260), vy: azar(-260, -60), max: azar(0.3, 0.6), tam: azar(1.8, 3.2), tipo: 1 });
      }
    }
    // linternas celestes que suben despacio
    this.tLinterna -= dt;
    if (this.tLinterna <= 0) {
      this.tLinterna = azar(1.6, 3.2);
      const izq = Math.random() < 0.5;
      this.emitir({ x: izq ? azar(60, 420) : azar(1180, 1540), y: 640, vx: azar(-6, 6), vy: azar(-26, -16), max: 26, tam: azar(9, 15), tipo: 2 });
    }
    // destellos en las estelas doradas
    this.tDestello -= dt;
    if (this.tDestello <= 0) {
      this.tDestello = azar(0.18, 0.45);
      const [x, y] = DESTELLOS[(Math.random() * DESTELLOS.length) | 0];
      this.destellos.push({ x: x + azar(-25, 25), y: y + azar(-15, 15), vida: 1 });
    }
    // estrella fugaz de vez en cuando
    if (this.estrella.vida <= 0 && Math.random() < dt * 0.12) {
      this.estrella = { x: azar(200, 1400), y: azar(20, 160), vx: azar(-700, -500), vy: azar(160, 260), vida: 0.9 };
    }

    // --- anillo de la plataforma: dos cometas (jade y oro) recorriendo la elipse
    const cx = 850;
    const cy = 822;
    const rx = 398;
    const ry = 92;
    const jade = brillo('rgba(110,255,210,0.9)');
    const oro = brillo('rgba(255,210,110,0.9)');
    for (let k = 0; k < 2; k++) {
      const cabeza = t * 1.15 + k * Math.PI;
      const spr = k === 0 ? jade : oro;
      for (let i = 0; i < 26; i++) {
        const a = cabeza - i * 0.045;
        const px = (cx + Math.cos(a) * rx) * sx;
        const py = (cy + Math.sin(a) * ry) * sy;
        const s = (34 - i) * 1.5 * sx * (0.75 + 0.25 * Math.sin(a)); // más grande delante
        c.globalAlpha = (1 - i / 26) * 0.85;
        c.drawImage(spr, px - s / 2, py - s / 2, s, s);
      }
    }

    // --- partículas
    const vivas: Part[] = [];
    for (const p of this.parts) {
      p.vida -= dt;
      if (p.vida <= 0 || p.y < -80) continue;
      p.fase += dt;
      if (p.tipo === 0) {
        p.vx += Math.sin(p.fase * 2.3) * 30 * dt;
      } else if (p.tipo === 1) {
        p.vy += 900 * dt;
      } else if (p.tipo === 3) {
        p.vx *= 1 - 2.4 * dt;
        p.vy = p.vy * (1 - 2.4 * dt) + 160 * dt;
      } else {
        p.vx += Math.sin(p.fase * 0.7) * 3 * dt;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const k = p.vida / p.max;
      const x = p.x * sx;
      const y = p.y * sy;
      if (p.tipo === 2) {
        // linterna de papel: halo + cuerpo cálido
        const s = p.tam * sx;
        const f = 0.85 + 0.15 * Math.sin(p.fase * 9);
        c.globalAlpha = Math.min(1, (p.max - p.vida) / 2) * Math.min(1, p.vida / 3) * 0.75 * f;
        c.drawImage(brillo('rgba(255,150,60,0.8)', 0.08), x - s * 3, y - s * 3, s * 6, s * 6);
        c.globalCompositeOperation = 'source-over';
        c.fillStyle = '#ffb347';
        c.fillRect(x - s * 0.45, y - s * 0.6, s * 0.9, s * 1.2);
        c.fillStyle = '#fff1b8';
        c.fillRect(x - s * 0.22, y - s * 0.2, s * 0.44, s * 0.7);
        c.globalCompositeOperation = 'lighter';
        vivas.push(p);
        continue;
      }
      const s = p.tam * sx * (p.tipo === 1 ? 3.2 : 4) * (0.6 + 0.4 * k);
      c.globalAlpha = p.tipo === 0 ? Math.min(1, k * 1.6) * (0.6 + 0.4 * Math.sin(p.fase * 12)) : k;
      const spr = p.tipo === 1 ? brillo('rgba(255,220,120,0.95)', 0.3) : p.tipo === 3 ? brillo('rgba(255,200,80,0.95)', 0.25) : brillo('rgba(255,120,40,0.9)', 0.15);
      c.drawImage(spr, x - s / 2, y - s / 2, s, s);
      if (p.tipo !== 0) {
        // estela de la chispa
        c.strokeStyle = p.tipo === 1 ? 'rgba(255,230,150,0.8)' : 'rgba(255,215,110,0.7)';
        c.lineWidth = Math.max(1, sx * 2.2);
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x - p.vx * 0.03 * sx, y - p.vy * 0.03 * sy);
        c.stroke();
      }
      vivas.push(p);
    }
    this.parts = vivas;

    // --- destellos en cruz
    this.destellos = this.destellos.filter((d) => (d.vida -= dt * 1.6) > 0);
    for (const d of this.destellos) {
      const k = Math.sin(d.vida * Math.PI);
      const x = d.x * sx;
      const y = d.y * sy;
      const r = 26 * sx * k;
      c.globalAlpha = k;
      c.drawImage(brillo('rgba(255,236,170,0.9)', 0.3), x - r, y - r, r * 2, r * 2);
      c.strokeStyle = 'rgba(255,248,220,0.9)';
      c.lineWidth = Math.max(1, 1.6 * sx);
      c.beginPath();
      c.moveTo(x - r * 1.6, y);
      c.lineTo(x + r * 1.6, y);
      c.moveTo(x, y - r * 1.6);
      c.lineTo(x, y + r * 1.6);
      c.stroke();
    }

    // --- estrella fugaz
    const e = this.estrella;
    if (e.vida > 0) {
      e.vida -= dt;
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      const g = c.createLinearGradient(e.x * sx, e.y * sy, (e.x - e.vx * 0.22) * sx, (e.y - e.vy * 0.22) * sy);
      g.addColorStop(0, 'rgba(255,255,255,0.95)');
      g.addColorStop(1, 'rgba(160,220,255,0)');
      c.globalAlpha = Math.min(1, e.vida * 2);
      c.strokeStyle = g;
      c.lineWidth = Math.max(1, 2.4 * sx);
      c.beginPath();
      c.moveTo(e.x * sx, e.y * sy);
      c.lineTo((e.x - e.vx * 0.22) * sx, (e.y - e.vy * 0.22) * sy);
      c.stroke();
    }
    c.globalAlpha = 1;
    c.globalCompositeOperation = 'source-over';
  }
}
