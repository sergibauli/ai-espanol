/**
 * In-race heads-up display. Pure DOM over the canvas; DOM writes only happen
 * when a displayed value actually changes.
 */
import type { IKart, ITrack, ItemType } from '../core/types';
import { ALL_ITEM_TYPES } from '../core/types';
import { events } from '../core/events';
import { BASE_TOP_SPEED } from '../core/constants';
import { clamp01, damp, formatRaceTime, ordinal } from '../core/math';
import { el, restartAnimation, TextField } from './dom';
import { Minimap } from './Minimap';

const ITEM_LABEL: Record<ItemType, string> = {
  none: '',
  oil: 'ACEITE · 油',
  triple_oil: 'ACEITE ×3 · 油',
  green_orb: 'BOLA VERDE · 绿球',
  triple_green_orb: 'VERDE ×3 · 绿球',
  red_orb: 'BOLA ROJA · 红球',
  triple_red_orb: 'ROJA ×3 · 红球',
  comet: 'COMETA · 彗星',
  nitro: 'NITRO · 氮气',
  triple_nitro: 'NITRO ×3 · 氮气',
  golden_nitro: 'NITRO DORADO · 金氮气',
  shield: 'ESCUDO · 护盾',
  emp: 'ONDA EMP · 电磁波',
  pulse_bomb: 'BOMBA DE PULSO · 脉冲弹',
};

const ITEM_FALLBACK_COLOR: Record<ItemType, string> = {
  none: '#333',
  oil: '#ffd23f',
  triple_oil: '#ffd23f',
  green_orb: '#3ddc5a',
  triple_green_orb: '#3ddc5a',
  red_orb: '#ff4040',
  triple_red_orb: '#ff4040',
  comet: '#3f7fff',
  nitro: '#ff5a3a',
  triple_nitro: '#ff5a3a',
  golden_nitro: '#ffc800',
  shield: '#ffe14a',
  emp: '#ffef70',
  pulse_bomb: '#333344',
};

const GRAD = Math.PI / 180;
/** Radio del arco del velocímetro (viewBox 0 0 200 200). */
const R_ARCO = 76;
/** Cada HUD (uno por jugador) necesita ids propios para sus degradados y filtros SVG. */
let secuenciaHud = 0;
const ROULETTE_FALLBACK_INTERVAL = 0.09;
const SPEED_MAX_KMH = BASE_TOP_SPEED * 3.6 * 1.7;

interface TimedNode {
  node: HTMLElement;
  ttl: number;
}

export class HUD {
  private readonly rootNode: HTMLElement;
  private readonly minimap: Minimap;
  private readonly unsubs: (() => void)[] = [];
  private visible = false;
  private playerId = 0;

  // Item slot
  private readonly itemFrame: HTMLElement;
  private readonly itemIconHost: HTMLElement;
  private readonly itemCount: TextField;
  private readonly itemLabel: TextField;
  private readonly iconCache = new Map<ItemType, HTMLCanvasElement>();
  private shownIcon: ItemType = 'none';
  private shownCount = 0;
  private rouletteTimer = 0;
  private rouletteVisual = false;

  // Place / lap / timer / speed
  private readonly placeNode: HTMLElement;
  private readonly placeNum: TextField;
  private readonly placeDelta: TextField;
  private readonly placeSuffix: TextField;
  private lastPlace = 0;
  private readonly lapText: TextField;
  private readonly timerText: TextField;
  private readonly speedText: TextField;
  private readonly speedWrap: HTMLElement;
  private readonly arcoFill: SVGPathElement;
  private readonly arcoBrillo: SVGPathElement;
  private readonly arcoChispa: SVGGElement;
  private readonly agujaSvg: SVGGElement;
  private readonly estela: SVGPathElement;
  private gaugeValue = -1;
  private speedSmooth = 0;
  private estelaAlfa = 0;
  private estelaLado = 1;
  private zonaRoja = false;

  // Centre overlays
  private readonly center: HTMLElement;
  private readonly wrongWay: HTMLElement;
  private wrongWayShown = false;
  private readonly vignette: HTMLElement;
  private vignetteAlpha = 0;
  private vignetteApplied = -1;
  private readonly timed: TimedNode[] = [];
  private readonly boostGlow: HTMLElement;
  private readonly turboFill: HTMLElement;
  private readonly aguja: HTMLElement;
  private agujaAng = -120;
  private turboValue = -1;
  private boostGlowApplied = -1;

  constructor(
    root: HTMLElement,
    private readonly buildIcon: (item: ItemType) => HTMLCanvasElement,
  ) {
    this.rootNode = el('div', 'hud hidden', undefined, root);

    // Top-left: item slot
    const itemWrap = el('div', 'hud-item', undefined, this.rootNode);
    this.itemFrame = el('div', 'item-frame', undefined, itemWrap);
    this.itemIconHost = el('div', 'item-icon', undefined, this.itemFrame);
    this.itemCount = new TextField(el('div', 'item-count', '', this.itemFrame));
    this.itemLabel = new TextField(el('div', 'item-label', '', itemWrap));

    // Top-right: lap + timer
    const topRight = el('div', 'hud-topright', undefined, this.rootNode);
    const lapBox = el('div', 'hud-lap glass', undefined, topRight);
    el('span', 'hud-lap-label', 'VUELTA · 圈', lapBox);
    this.lapText = new TextField(el('span', 'hud-lap-value', '', lapBox));
    this.timerText = new TextField(el('div', 'hud-timer glass', '0:00.000', topRight));

    // Bottom-left: place
    // Puesto: placa de laca con numeral de oro en relieve; destello y rebote al ganar o perder puestos.
    this.placeNode = el('div', 'hud-place wk-puesto', undefined, this.rootNode);
    el('span', 'wk-puesto-placa', undefined, this.placeNode).setAttribute('aria-hidden', 'true');
    el('span', 'wk-puesto-rayos', undefined, this.placeNode).setAttribute('aria-hidden', 'true');
    el('span', 'wk-puesto-etq', 'PUESTO · 名次', this.placeNode);
    this.placeNum = new TextField(el('span', 'place-num', '', this.placeNode));
    this.placeSuffix = new TextField(el('span', 'place-suffix', '', this.placeNode));
    this.placeDelta = new TextField(el('span', 'wk-puesto-delta', '', this.placeNode));

    // Velocímetro: esfera de reloj imperial (oro y jade) con arco de neón, escala, aguja con estela y turbo.
    const speedWrap = el('div', 'hud-speed wk-vel', undefined, this.rootNode);
    const dial = construirEsfera(++secuenciaHud);
    speedWrap.appendChild(dial.svg);
    this.arcoFill = dial.arco;
    this.arcoBrillo = dial.brillo;
    this.arcoChispa = dial.chispa;
    this.agujaSvg = dial.aguja;
    this.estela = dial.estela;
    const speedInner = el('div', 'speed-inner', undefined, speedWrap);
    this.speedText = new TextField(el('div', 'speed-value', '0', speedInner));
    el('div', 'speed-unit', 'KM/H · 公里/时', speedInner);
    this.aguja = el('div', 'wk-aguja', undefined, speedWrap);
    const turbo = el('div', 'wk-turbo', undefined, speedWrap);
    const etq = el('span', 'wk-turbo-etq', undefined, turbo);
    el('span', 'wk-turbo-txt', 'TURBO · 加速', etq);
    el('span', 'wk-turbo-on', '¡TURBO! · 加速中', etq);
    const barra = el('div', 'wk-turbo-barra', undefined, turbo);
    this.turboFill = el('div', 'wk-turbo-fill', undefined, barra);
    el('div', 'wk-turbo-marcas', undefined, barra);
    this.speedWrap = speedWrap;

    // Bottom-right: minimap
    const mapWrap = el('div', 'hud-minimap glass wk-mapa', undefined, this.rootNode);
    this.minimap = new Minimap(mapWrap);

    // Centre overlays
    this.center = el('div', 'hud-center', undefined, this.rootNode);
    this.wrongWay = el('div', 'hud-wrongway', undefined, this.rootNode);
    el('span', 'wrongway-arrow', '⟲', this.wrongWay);
    el('span', 'wrongway-text', 'SENTIDO CONTRARIO · 方向错了', this.wrongWay);
    this.vignette = el('div', 'hud-vignette', undefined, this.rootNode);
    this.boostGlow = el('div', 'hud-boostglow', undefined, this.rootNode);

    this.subscribe();
  }

  // ------------------------------------------------------------------ public

  setTrack(track: ITrack | null): void {
    this.minimap.setTrack(track);
  }

  /** Pantalla partida: etiqueta «J1 · 玩家1» con el color del jugador. */
  setJugador(indice: number, color: string): void {
    const tag = el('div', 'wk-jugador', `J${indice + 1} · 玩家${indice + 1}`, this.rootNode);
    tag.style.setProperty('--wk-color', color);
    this.rootNode.classList.add('wk-split-hud');
  }

  show(): void {
    this.rootNode.classList.remove('hidden');
    this.visible = true;
  }

  hide(): void {
    this.rootNode.classList.add('hidden');
    this.visible = false;
  }

  update(dt: number, player: IKart, karts: readonly IKart[], raceTime: number, totalLaps: number): void {
    if (!this.visible) return;
    const s = player.state;
    this.playerId = s.id;

    // Place numeral
    const place = s.place > 0 ? s.place : karts.length;
    if (place !== this.lastPlace) {
      const antes = this.lastPlace;
      this.lastPlace = place;
      const ord = ordinal(place);
      this.placeNum.set(String(place));
      this.placeNum.node.dataset.n = String(place);
      this.placeSuffix.set(ord.slice(String(place).length));
      this.placeNode.classList.toggle('gold', place === 1);
      this.placeNode.classList.toggle('silver', place === 2);
      this.placeNode.classList.toggle('bronze', place === 3);
      if (antes > 0 && place !== antes) {
        const sube = place < antes;
        const n = Math.abs(antes - place);
        this.placeDelta.set(sube ? `▲ ${n} · 升` : `▼ ${n} · 降`);
        this.placeNode.classList.remove('wk-sube', 'wk-baja', 'punch');
        restartAnimation(this.placeNode, sube ? 'wk-sube' : 'wk-baja');
      } else {
        restartAnimation(this.placeNode, 'punch');
      }
    }

    // Lap + timer
    const lapShown = Math.min(Math.max(1, s.lap), totalLaps);
    this.lapText.set(`${lapShown}/${totalLaps}`);
    this.timerText.set(formatRaceTime(raceTime));

    // Speedometer
    const kmh = Math.abs(s.speed) * 3.6;
    this.speedSmooth = damp(this.speedSmooth, kmh, 12, dt);
    this.speedText.set(String(Math.round(this.speedSmooth)));
    const g = clamp01(this.speedSmooth / SPEED_MAX_KMH);
    if (Math.abs(g - this.gaugeValue) > 0.003) {
      this.gaugeValue = g;
      const largo = (g * 100).toFixed(2);
      this.arcoFill.setAttribute('stroke-dasharray', `${largo} 200`);
      this.arcoBrillo.setAttribute('stroke-dasharray', `${largo} 200`);
      this.arcoBrillo.setAttribute('opacity', (0.18 + 0.82 * g).toFixed(2));
      const a = (-120 + 240 * g) * GRAD;
      this.arcoChispa.setAttribute(
        'transform',
        `translate(${(100 + R_ARCO * Math.sin(a)).toFixed(2)} ${(100 - R_ARCO * Math.cos(a)).toFixed(2)})`,
      );
      this.arcoChispa.setAttribute('opacity', g > 0.02 ? '1' : '0');
      const roja = g > 0.86;
      if (roja !== this.zonaRoja) {
        this.zonaRoja = roja;
        this.speedWrap.classList.toggle('wk-vel-roja', roja);
      }
    }
    // Aguja suave (SVG en una sola pantalla; .wk-aguja en pantalla partida) con estela según su giro.
    const objetivo = -120 + 240 * g;
    const antes = this.agujaAng;
    this.agujaAng += (objetivo - this.agujaAng) * Math.min(1, dt * 10);
    const angTxt = this.agujaAng.toFixed(1);
    this.aguja.style.transform = `rotate(${angTxt}deg)`;
    this.agujaSvg.setAttribute('transform', `rotate(${angTxt} 100 100)`);
    const giro = dt > 0 ? (this.agujaAng - antes) / dt : 0;
    const lado = giro < -2 ? -1 : giro > 2 ? 1 : this.estelaLado;
    const alfa = Math.min(0.95, Math.abs(giro) / 140 + g * 0.35);
    this.estelaAlfa += (alfa - this.estelaAlfa) * Math.min(1, dt * 8);
    if (lado !== this.estelaLado) {
      this.estelaLado = lado;
      this.estela.setAttribute('transform', lado < 0 ? 'translate(200 0) scale(-1 1)' : '');
    }
    this.estela.setAttribute('opacity', this.estelaAlfa.toFixed(2));
    // Wukong: barra de turbo (carga del derrape o turbo activo).
    const turboV = s.isBoosting
      ? Math.min(1, 0.35 + s.boostTimer / 1.5)
      : s.isDrifting
        ? Math.min(1, (s.driftStage + s.driftCharge) / 3)
        : 0;
    if (Math.abs(turboV - this.turboValue) > 0.01) {
      this.turboValue = turboV;
      this.turboFill.style.transform = `scaleX(${turboV.toFixed(3)})`;
    }
    const boost = s.isBoosting ? 1 : 0;
    if (boost !== this.boostGlowApplied) {
      this.boostGlowApplied = boost;
      this.boostGlow.classList.toggle('on', boost === 1);
      this.rootNode.classList.toggle('boosting', boost === 1);
    }

    // Item slot
    this.updateItemSlot(dt, s.item, s.itemCount, s.itemRouletteActive);

    // Wrong way
    if (s.wrongWay !== this.wrongWayShown) {
      this.wrongWayShown = s.wrongWay;
      this.wrongWay.classList.toggle('visible', s.wrongWay);
    }

    // Hit vignette decay
    if (this.vignetteAlpha > 0.001) {
      this.vignetteAlpha = damp(this.vignetteAlpha, 0, 3.5, dt);
      if (this.vignetteAlpha < 0.001) this.vignetteAlpha = 0;
    }
    if (Math.abs(this.vignetteAlpha - this.vignetteApplied) > 0.01) {
      this.vignetteApplied = this.vignetteAlpha;
      this.vignette.style.opacity = this.vignetteAlpha.toFixed(2);
    }

    // Timed centre messages
    for (let i = this.timed.length - 1; i >= 0; i--) {
      const t = this.timed[i];
      t.ttl -= dt;
      if (t.ttl <= 0) {
        t.node.remove();
        this.timed.splice(i, 1);
      }
    }

    this.minimap.update(dt, karts, s.id);
  }

  dispose(): void {
    for (const u of this.unsubs) u();
    this.unsubs.length = 0;
    this.minimap.dispose();
    this.rootNode.remove();
  }

  // ----------------------------------------------------------------- private

  private subscribe(): void {
    const on = events.on.bind(events);
    this.unsubs.push(
      on('item:rouletteTick', (e) => {
        if (!e.isPlayer && e.kartId !== this.playerId) return;
        this.rouletteVisual = true;
        this.rouletteTimer = 0;
        this.setIcon(this.randomItem(), false);
        this.itemFrame.classList.add('spinning');
      }),
      on('item:rouletteEnd', (e) => {
        if (!e.isPlayer && e.kartId !== this.playerId) return;
        this.rouletteVisual = false;
        this.itemFrame.classList.remove('spinning');
        this.setIcon(e.item, true);
      }),
      on('race:countdown', (e) => {
        this.flashCenter(String(e.count), 'hud-count', 0.95);
      }),
      on('race:start', () => {
        this.flashCenter('¡YA! · 出发！', 'hud-count hud-go', 1.1);
      }),
      on('race:lap', (e) => {
        if (!e.isPlayer) return;
        if (e.isFinalLap) this.flashCenter('¡ÚLTIMA VUELTA! · 最后一圈！', 'hud-banner final', 2.4);
        else if (e.lap > 1) this.flashCenter(`VUELTA ${e.lap} · 第${e.lap}圈`, 'hud-banner lap', 1.4);
      }),
      on('race:positionChange', (e) => {
        if (!e.isPlayer) return;
        const up = e.to < e.from;
        this.flashCenter(`${up ? '▲' : '▼'} ${ordinal(e.to).toUpperCase()}`, `hud-posflash ${up ? 'up' : 'down'}`, 1.0);
      }),
      on('item:hit', (e) => {
        if (!e.isPlayer) return;
        this.vignetteAlpha = 1;
        restartAnimation(this.rootNode, 'hit-shake');
      }),
      on('race:finish', (e) => {
        if (!e.isPlayer) return;
        const node = this.flashCenter('¡META! · 终点', 'hud-finish', 4.5);
        el('div', 'hud-finish-place', ordinal(e.place) + ' PUESTO · 第' + e.place + '名', node);
      }),
      on('kart:respawn', (e) => {
        if (e.kartId !== this.playerId) return;
        this.vignetteAlpha = Math.max(this.vignetteAlpha, 0.6);
      }),
    );
  }

  private randomItem(): ItemType {
    return ALL_ITEM_TYPES[Math.floor(Math.random() * ALL_ITEM_TYPES.length)];
  }

  private updateItemSlot(dt: number, item: ItemType, count: number, rouletteActive: boolean): void {
    if (rouletteActive) {
      // If the item system doesn't emit ticks we still animate the roulette locally.
      this.rouletteTimer += dt;
      if (this.rouletteTimer >= ROULETTE_FALLBACK_INTERVAL) {
        this.rouletteTimer = 0;
        this.rouletteVisual = true;
        this.setIcon(this.randomItem(), false);
        this.itemFrame.classList.add('spinning');
      }
      if (this.shownCount !== 0) {
        this.shownCount = 0;
        this.itemCount.set('');
      }
      return;
    }
    if (this.rouletteVisual) {
      // Roulette ended without an explicit event; land on the real item.
      this.rouletteVisual = false;
      this.itemFrame.classList.remove('spinning');
      this.setIcon(item, true);
    } else if (item !== this.shownIcon) {
      this.setIcon(item, item !== 'none');
    }
    const shownCount = item === 'none' || count <= 1 ? 0 : count;
    if (shownCount !== this.shownCount) {
      this.shownCount = shownCount;
      this.itemCount.set(shownCount > 0 ? `×${shownCount}` : '');
    }
  }

  private setIcon(item: ItemType, pop: boolean): void {
    if (item === this.shownIcon && !pop) return;
    this.shownIcon = item;
    this.itemIconHost.replaceChildren();
    if (item !== 'none') {
      this.itemIconHost.appendChild(this.getIcon(item));
    }
    this.itemFrame.classList.toggle('has-item', item !== 'none');
    this.itemLabel.set(this.rouletteVisual ? '' : ITEM_LABEL[item]);
    if (pop) restartAnimation(this.itemFrame, 'pop');
  }

  private getIcon(item: ItemType): HTMLCanvasElement {
    let icon = this.iconCache.get(item);
    if (icon) return icon;
    try {
      icon = this.buildIcon(item);
      if (!(icon instanceof HTMLCanvasElement)) throw new Error('buildItemIcon did not return a canvas');
    } catch (err) {
      console.warn('[HUD] item icon fallback for', item, err);
      icon = this.fallbackIcon(item);
    }
    icon.classList.add('item-icon-canvas');
    this.iconCache.set(item, icon);
    return icon;
  }

  private fallbackIcon(item: ItemType): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.fillStyle = ITEM_FALLBACK_COLOR[item];
      ctx.beginPath();
      ctx.arc(32, 32, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 22px Impact, "Arial Narrow", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.replace(/^triple_/, '')[0]?.toUpperCase() ?? '?', 32, 34);
    }
    return c;
  }

  private flashCenter(text: string, cls: string, ttl: number): HTMLElement {
    const node = el('div', `hud-msg ${cls}`, text, this.center);
    node.style.setProperty('--ttl', `${ttl}s`);
    this.timed.push({ node, ttl });
    return node;
  }
}

// ------------------------------------------------------------- velocímetro (SVG, se crea una sola vez)

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>,
  parent?: SVGElement,
): SVGElementTagNameMap[K] {
  const n = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  if (parent) parent.appendChild(n);
  return n;
}

function degradado(
  defs: SVGElement,
  tipo: 'linearGradient' | 'radialGradient',
  id: string,
  attrs: Record<string, string | number>,
  paradas: [number, string, number?][],
): void {
  const g = svgEl(tipo, { id, ...attrs }, defs);
  for (const [o, c, a] of paradas) {
    svgEl('stop', { offset: o, 'stop-color': c, 'stop-opacity': a ?? 1 }, g);
  }
}

/** Punto a `r` del centro (100,100) en el ángulo `a` (grados, 0 = arriba, sentido horario). */
function polar(r: number, a: number): [number, number] {
  return [100 + r * Math.sin(a * GRAD), 100 - r * Math.cos(a * GRAD)];
}

function trazoArco(r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(r, a0);
  const [x1, y1] = polar(r, a1);
  const grande = a1 - a0 > 180 ? 1 : 0;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${grande} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

interface Esfera {
  svg: SVGSVGElement;
  arco: SVGPathElement;
  brillo: SVGPathElement;
  chispa: SVGGElement;
  aguja: SVGGElement;
  estela: SVGPathElement;
}

function construirEsfera(n: number): Esfera {
  const id = (s: string) => `wk-v${n}-${s}`;
  const url = (s: string) => `url(#${id(s)})`;
  const svg = svgEl('svg', { viewBox: '0 0 200 200', class: 'wk-vel-svg', 'aria-hidden': 'true' });
  const defs = svgEl('defs', {}, svg);
  degradado(defs, 'linearGradient', id('oro'), { x1: 0, y1: 0, x2: 0, y2: 1 }, [
    [0, '#fff6d0'],
    [0.35, '#f2c14e'],
    [0.7, '#a8711c'],
    [1, '#ffe08a'],
  ]);
  degradado(defs, 'radialGradient', id('cara'), { cx: 0.5, cy: 0.42, r: 0.6 }, [
    [0, '#3a1410'],
    [0.6, '#1a0807'],
    [1, '#070203'],
  ]);
  degradado(defs, 'linearGradient', id('neon'), { gradientUnits: 'userSpaceOnUse', x1: 24, y1: 150, x2: 176, y2: 150 }, [
    [0, '#2dffb4'],
    [0.38, '#b8ff4a'],
    [0.58, '#ffe14a'],
    [0.8, '#ff8a2a'],
    [1, '#ff2a4a'],
  ]);
  degradado(defs, 'linearGradient', id('hoja'), { x1: 0, y1: 0, x2: 0, y2: 1 }, [
    [0, '#fffbe6'],
    [0.25, '#ffd23f'],
    [1, '#e0182e'],
  ]);
  degradado(defs, 'linearGradient', id('estela'), { gradientUnits: 'userSpaceOnUse', x1: 64, y1: 0, x2: 100, y2: 0 }, [
    [0, '#ff8a2a', 0],
    [1, '#ffd23f', 0.75],
  ]);
  degradado(defs, 'radialGradient', id('jade'), { cx: 0.38, cy: 0.35, r: 0.7 }, [
    [0, '#d8fff0'],
    [0.45, '#3fd6a0'],
    [1, '#0b5a44'],
  ]);
  const blur = svgEl('filter', { id: id('blur'), x: '-30%', y: '-30%', width: '160%', height: '160%' }, defs);
  svgEl('feGaussianBlur', { stdDeviation: 4.5 }, blur);

  // Marco imperial: anillos de oro, jade y laca.
  svgEl('circle', { cx: 100, cy: 100, r: 97, class: 'wk-v-sombra' }, svg);
  svgEl('circle', { cx: 100, cy: 100, r: 95, fill: 'none', stroke: url('oro'), 'stroke-width': 5 }, svg);
  svgEl('circle', { cx: 100, cy: 100, r: 91, fill: 'none', stroke: '#2f8f6e', 'stroke-width': 2.5 }, svg);
  svgEl('circle', { cx: 100, cy: 100, r: 89, fill: url('cara'), stroke: '#c9a24a', 'stroke-width': 1 }, svg);
  svgEl('circle', { cx: 100, cy: 100, r: 52, fill: 'none', stroke: 'rgba(242,193,78,0.18)', 'stroke-width': 1, 'stroke-dasharray': '2 4' }, svg);
  svgEl('circle', { cx: 100, cy: 100, r: 34, class: 'wk-v-aura' }, svg);

  // Escala: marcas cada 5 km/h, mayores con número cada 20; zona roja desde 100.
  const marcas = svgEl('g', { class: 'wk-v-marcas' }, svg);
  const numeros = svgEl('g', { class: 'wk-v-numeros' }, svg);
  for (let v = 0; v <= SPEED_MAX_KMH + 0.01; v += 5) {
    const a = -120 + (240 * v) / SPEED_MAX_KMH;
    const mayor = v % 20 === 0;
    const [x0, y0] = polar(mayor ? 57 : 62, a);
    const [x1, y1] = polar(67, a);
    svgEl(
      'line',
      {
        x1: x0.toFixed(2),
        y1: y0.toFixed(2),
        x2: x1.toFixed(2),
        y2: y1.toFixed(2),
        class: `wk-v-marca${mayor ? ' mayor' : ''}${v >= 100 ? ' roja' : ''}`,
      },
      marcas,
    );
    if (mayor) {
      const [tx, ty] = polar(46, a);
      const t = svgEl('text', { x: tx.toFixed(1), y: (ty + 3.4).toFixed(1), class: `wk-v-num${v >= 100 ? ' roja' : ''}` }, numeros);
      t.textContent = String(v);
    }
  }

  // Arco de neón: carril, zona roja, halo difuminado (crece con la velocidad), trazo y chispa en la punta.
  const d = trazoArco(R_ARCO, -120, 120);
  svgEl('path', { d, class: 'wk-v-carril' }, svg);
  const rojaDesde = (100 / SPEED_MAX_KMH) * 100;
  svgEl('path', { d, class: 'wk-v-zona', pathLength: 100, 'stroke-dasharray': `0 ${rojaDesde.toFixed(1)} 100 0` }, svg);
  const brillo = svgEl('path', { d, pathLength: 100, class: 'wk-v-brillo', stroke: url('neon'), filter: url('blur'), 'stroke-dasharray': '0 200', opacity: 0.2 }, svg);
  const arcoFill = svgEl('path', { d, pathLength: 100, class: 'wk-v-arco', stroke: url('neon'), 'stroke-dasharray': '0 200' }, svg);
  const chispa = svgEl('g', { class: 'wk-v-chispa', opacity: 0 }, svg);
  svgEl('circle', { r: 7.5, class: 'wk-v-chispa-halo' }, chispa);
  svgEl('circle', { r: 3.2, fill: '#fffbe6' }, chispa);

  // Tachones de jade en los extremos del arco y arriba.
  for (const a of [-134, 0, 134]) {
    const [x, y] = polar(92, a);
    svgEl('circle', { cx: x.toFixed(2), cy: y.toFixed(2), r: 4.4, fill: url('jade'), stroke: url('oro'), 'stroke-width': 1.6 }, svg);
  }
  // Aguja con estela: gira entera con un solo atributo transform.
  const aguja = svgEl('g', { class: 'wk-v-aguja', transform: 'rotate(-120 100 100)' }, svg);
  const [ex, ey] = polar(68, -30);
  const estela = svgEl(
    'path',
    { d: `M100 100L${ex.toFixed(2)} ${ey.toFixed(2)}A68 68 0 0 1 100 32Z`, fill: url('estela'), class: 'wk-v-estela', opacity: 0 },
    aguja,
  );
  svgEl('path', { d: 'M100 30L104 98L102 116H98L96 98Z', fill: url('hoja'), class: 'wk-v-hoja' }, aguja);
  svgEl('path', { d: 'M100 34L101 96H99Z', fill: 'rgba(255,255,255,0.75)' }, aguja);
  svgEl('circle', { cx: 100, cy: 100, r: 9, fill: url('oro'), stroke: '#5a0a10', 'stroke-width': 1.5 }, svg);
  svgEl('circle', { cx: 100, cy: 100, r: 4.5, fill: url('jade') }, svg);

  return { svg, arco: arcoFill, brillo, chispa, aguja, estela };
}
