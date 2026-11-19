/**
 * Main menu: Title → Character Select → Track Select. Pure DOM; the 3D backdrop
 * behind it is owned by Game (mirrored via onHighlight).
 */
import type { CharacterDef, Difficulty, InputState, RaceSettings, TrackDefinition } from '../core/types';
import { events } from '../core/events';
import { GAME_TITLE, DEFAULT_LAPS } from '../core/constants';
import { button, cssHex, cssRgba, el, TextField } from './dom';
import { PortadaAnimada } from './PortadaAnimada';

export type MenuPanel = 'title' | 'characterSelect' | 'trackSelect';

const DIFFICULTIES: readonly Difficulty[] = ['easy', 'normal', 'hard'];
const DIFFICULTY_LABEL: Record<Difficulty, string> = { easy: 'FÁCIL · 简单', normal: 'NORMAL · 普通', hard: 'DIFÍCIL · 困难' };
const DIFFICULTY_BLURB: Record<Difficulty, string> = {
  easy: 'Rivales tranquilos que te esperan · 对手比较轻松。',
  normal: 'El reto clásico del Gran Premio · 经典大奖赛挑战。',
  hard: 'Rivales implacables, trazadas casi perfectas · 对手毫不留情！',
};
const STAT_KEYS: readonly { key: keyof CharacterDef['stats']; label: string }[] = [
  { key: 'speed', label: 'Velocidad' },
  { key: 'acceleration', label: 'Aceleración' },
  { key: 'handling', label: 'Manejo' },
  { key: 'weight', label: 'Peso' },
  { key: 'miniTurbo', label: 'Turbo' },
];
const CHAR_COLUMNS = 4;
const AYUDA_JUGADORES = [
  'Tú contra 7 rivales · 你对战7个对手',
  'J1: WASD · Espacio · E  —  J2: flechas · Shift dcho. · Enter (o mandos)',
  'J1 y J2 con teclado o mando · J3 con mando · 需要手柄',
  'J1 y J2 con teclado o mando · J3 y J4 con mando · 需要手柄',
];
/** Ilustraciones de las maquetas (public/turbo-kart). */
export const ARTE = {
  portada: './turbo-kart/portada.webp',
};
/** Retrato de cada piloto (recortados de la maqueta 02). */
const RETRATOS: Record<string, { src: string; filtro?: string }> = {
  zippy: { src: './turbo-kart/piloto-mujer.webp' },
  pixel: { src: './turbo-kart/piloto-pixel.webp' },
  fennec: { src: './turbo-kart/piloto-fennec.webp' },
  max: { src: './turbo-kart/piloto-rojo.webp' },
  juno: { src: './turbo-kart/piloto-mujer.webp', filtro: 'hue-rotate(200deg) saturate(1.2)' },
  kai: { src: './turbo-kart/piloto-kai.webp' },
  bram: { src: './turbo-kart/piloto-boulder.webp' },
  rosa: { src: './turbo-kart/piloto-bigrig.webp' },
};
const WEIGHT_LABEL: Record<string, string> = { light: 'LIGERO · 轻', medium: 'MEDIO · 中', heavy: 'PESADO · 重' };
const THEME_LABEL: Record<string, string> = {
  grassland: 'BAMBÚ · 竹林',
  desert: 'VOLCÁN · 火山',
  snow: 'TEMPLO · 玉殿',
  beach: 'PLAYA · 海滩',
  volcano: 'VOLCÁN · 火山',
  neon: 'CIUDAD · 龙城',
};
/** Selección de circuito: foto real de cada circuito (capturas del juego) y sello del mundo. */
const CIRCUITO_ARTE: Record<string, { foto: string; sello: string; mundo: string }> = {
  neon_nexus: { foto: './turbo-kart/circuito-ciudad-dragon.webp', sello: '龙', mundo: 'Ciudad neón · 霓虹城' },
  sunny_circuit: { foto: './turbo-kart/circuito-valle-bambu.webp', sello: '竹', mundo: 'Mar de nubes · 云海' },
  dune_drift: { foto: './turbo-kart/circuito-montana-fuego.webp', sello: '火', mundo: 'Volcán · 火山' },
  frostbite_falls: { foto: './turbo-kart/circuito-templo-jade.webp', sello: '玉', mundo: 'Templo en la nieve · 雪中玉殿' },
};
const NIVEL_CIRCUITO = ['NOVATO · 新手', 'PRO · 进阶', 'EXPERTO · 高手'];
const SVG_NS = 'http://www.w3.org/2000/svg';
/** Icono SVG pequeño (trazos) para las etiquetas de circuito. */
function iconoCircuito(tipo: 'vueltas' | 'nivel' | 'estrella', clase: string): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', clase);
  const d: Record<typeof tipo, string> = {
    // bandera de meta ondeando
    vueltas: 'M5 21V4m0 0c4-2 6 2 10 0s4-1 4-1v9s-1 1-4 1-6-2-10 0',
    // escudo con rayo: dificultad
    nivel: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zm1 4l-4 6h3l-1 4 4-6h-3l1-4z',
    // estrella de cinco puntas
    estrella: 'M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.5l1.3-6.6L2.5 9.3l6.6-.8z',
  };
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d[tipo]);
  svg.appendChild(path);
  return svg;
}
function partirNombre(nombre: string): { es: string; zh: string } {
  const [es, zh] = nombre.split(' · ');
  return { es: es ?? nombre, zh: zh ?? '' };
}

export class MainMenu {
  onStart: ((settings: RaceSettings) => void) | null = null;
  onHighlight: ((characterId: string) => void) | null = null;
  onPanelChange: ((panel: MenuPanel) => void) | null = null;

  private readonly rootNode: HTMLElement;
  private readonly panels: Record<MenuPanel, HTMLElement>;
  private panel: MenuPanel = 'title';
  private visible = false;
  /** Wukong: portada animada por capas (solo corre con la portada visible). */
  private readonly portada: PortadaAnimada;

  // Character select
  private readonly charCards: HTMLElement[] = [];
  private charIndex = 0;
  private readonly charName: TextField;
  private readonly charTagline: TextField;

  // Track select
  private readonly trackCards: HTMLElement[] = [];
  /** Fotos a pantalla completa (una por circuito) y ficha grande del circuito elegido. */
  private readonly trackFondos: HTMLElement[] = [];
  private heroSello!: HTMLElement;
  private heroZh!: HTMLElement;
  private heroEs!: HTMLElement;
  private heroMundo!: HTMLElement;
  private heroDesc!: HTMLElement;
  private heroEstrellas!: HTMLElement;
  private heroMeta!: HTMLElement;
  private hero!: HTMLElement;
  private trackIndex = 0;
  private readonly diffButtons: HTMLElement[] = [];
  private difficultyIndex = 1;
  /** Wukong: jugadores en pantalla partida (1–4). */
  private jugadores = 1;
  private readonly jugBotones: HTMLElement[] = [];
  private jugAyuda!: TextField;
  private readonly diffBlurb: TextField;
  private readonly startButton: HTMLElement;
  /** 0 = track cards row, 1 = difficulty row, 2 = start button. */
  private trackRow = 0;

  constructor(
    root: HTMLElement,
    private readonly characters: readonly CharacterDef[],
    private readonly tracks: readonly TrackDefinition[],
  ) {
    this.rootNode = el('div', 'screen menu hidden', undefined, root);

    // ---------------------------------------------------------------- title
    const title = el('section', 'panel-title-screen wk-titulo', undefined, this.rootNode);
    // Ilustración de la portada (maqueta 03): logo, alas de dragón de jade y kart sobre la plataforma.
    const arte = el('div', 'wk-arte', undefined, title);
    const img = el('img', 'wk-arte-img', undefined, arte);
    img.src = ARTE.portada;
    img.alt = `${GAME_TITLE} · 西游极速 · Gran Premio de Palabras · 单词大奖赛`;
    img.draggable = false;
    this.portada = new PortadaAnimada(arte, img);
    // Interfaz real encima, en las mismas posiciones que en la maqueta.
    const capa = el('div', 'wk-capa', undefined, title);
    const legend = el('div', 'wk-controles', undefined, capa);
    el('div', 'wk-controles-tit', '操作说明 · Controles', legend);
    const keys: [string, string, string][] = [
      ['➚', 'Acelerar · 加速', 'W / ↑'],
      ['◐', 'Frenar / Derrapar · 刹车/漂移', 'S · Espacio'],
      ['⟲', 'Girar · 转向', 'A D / ← →'],
      ['◈', 'Objeto · 道具', 'E / Ctrl'],
      ['Ⅱ', 'Pausa · 暂停', 'Esc / P'],
      ['✎', 'Responder reto · 答题', '1 2 3'],
    ];
    for (const [ico, txt, tecla] of keys) {
      const row = el('div', 'wk-control', undefined, legend);
      el('span', 'wk-control-ico', ico, row);
      el('span', 'wk-control-txt', txt, row);
      el('kbd', 'wk-control-tecla', tecla, row);
    }
    const lado = el('div', 'wk-botones-jade', undefined, capa);
    const jade = (texto: string, panel: MenuPanel): void => {
      const b = el('button', 'wk-jade', texto, lado);
      b.type = 'button';
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this.goTo(panel, true);
      });
    };
    jade('Empezar · 开始比赛', 'characterSelect');
    jade('Pilotos · 角色选择', 'characterSelect');
    jade('Circuitos · 赛道选择', 'trackSelect');
    const prompt = el('div', 'press-start wk-enter', undefined, capa);
    el('span', 'press-start-text', 'ENTER O TOCA · 点击开始', prompt);
    el('span', 'wk-pa-barrido', undefined, prompt);
    el('div', 'version', 'Basado en Turbo Kart Rush de BridgeMind, licencia MIT · 支持手柄', capa);
    title.addEventListener('click', () => {
      if (this.panel === 'title') this.goTo('characterSelect', true);
    });

    // ------------------------------------------------------- character select
    const chars = el('section', 'panel-select panel-chars', undefined, this.rootNode);
    const charHead = el('header', 'select-header', undefined, chars);
    el('div', 'panel-kicker', 'PASO 1 / 2 · 第一步', charHead);
    el('h2', 'panel-title', 'ELIGE PILOTO · 选择车手', charHead);
    const charGrid = el('div', 'card-grid char-grid', undefined, chars);
    characters.forEach((c, i) => {
      const card = this.buildCharacterCard(c);
      card.addEventListener('pointerenter', () => this.setCharacter(i));
      card.addEventListener('click', () => {
        if (this.charIndex === i) this.goTo('trackSelect', true);
        else this.setCharacter(i, true);
      });
      card.addEventListener('dblclick', () => this.goTo('trackSelect', true));
      charGrid.appendChild(card);
      this.charCards.push(card);
    });
    const charFoot = el('footer', 'select-footer glass', undefined, chars);
    const charInfo = el('div', 'select-info', undefined, charFoot);
    this.charName = new TextField(el('div', 'select-info-name', '', charInfo));
    this.charTagline = new TextField(el('div', 'select-info-tagline', '', charInfo));
    const charActions = el('div', 'actions', undefined, charFoot);
    charActions.appendChild(button('← ATRÁS · 返回', 'ghost', () => this.goTo('title', true)));
    charActions.appendChild(button('SELECCIONAR · 选择 →', 'primary', () => this.goTo('trackSelect', true)));

    // ----------------------------------------------------------- track select
    const tr = el('section', 'panel-select panel-tracks wkc', undefined, this.rootNode);
    // Fondo: la foto del circuito elegido a pantalla completa (tapa el kart del menú).
    const fondo = el('div', 'wkc-fondo', undefined, tr);
    fondo.setAttribute('aria-hidden', 'true');
    tracks.forEach((t) => {
      const capa = el('div', 'wkc-fondo-foto', undefined, fondo);
      const arte = CIRCUITO_ARTE[t.id];
      if (arte) capa.style.backgroundImage = `url("${arte.foto}")`;
      this.trackFondos.push(capa);
    });
    el('div', 'wkc-fondo-velo', undefined, fondo);
    const trHead = el('header', 'select-header', undefined, tr);
    el('div', 'panel-kicker', 'PASO 2 / 2 · 第二步', trHead);
    el('h2', 'panel-title', 'ELIGE CIRCUITO · 选择赛道', trHead);
    // Ficha grande del circuito elegido.
    this.hero = el('div', 'wkc-hero', undefined, tr);
    this.heroSello = el('div', 'wkc-hero-sello', '', this.hero);
    this.heroSello.translate = false;
    const heroTxt = el('div', 'wkc-hero-txt', undefined, this.hero);
    this.heroMundo = el('div', 'wkc-hero-mundo', '', heroTxt);
    this.heroZh = el('div', 'wkc-hero-zh', '', heroTxt);
    this.heroEs = el('div', 'wkc-hero-es', '', heroTxt);
    this.heroDesc = el('div', 'wkc-hero-desc', '', heroTxt);
    const heroPie = el('div', 'wkc-hero-pie', undefined, heroTxt);
    this.heroEstrellas = el('div', 'wkc-estrellas wkc-estrellas-grandes', undefined, heroPie);
    this.heroMeta = el('div', 'wkc-meta', undefined, heroPie);
    const trackGrid = el('div', 'card-grid track-grid wkc-grid', undefined, tr);
    tracks.forEach((t, i) => {
      const card = this.buildTrackCard(t);
      card.addEventListener('pointerenter', () => {
        this.trackRow = 0;
        this.setTrack(i);
      });
      card.addEventListener('click', () => {
        if (this.trackIndex === i && this.trackRow === 0) this.start();
        else {
          this.trackRow = 0;
          this.setTrack(i, true);
        }
      });
      trackGrid.appendChild(card);
      this.trackCards.push(card);
    });
    const trFoot = el('footer', 'select-footer glass wkc-pie', undefined, tr);
    const diffWrap = el('div', 'difficulty', undefined, trFoot);
    el('div', 'difficulty-label', 'RIVALES · 对手', diffWrap);
    const seg = el('div', 'segmented', undefined, diffWrap);
    DIFFICULTIES.forEach((d, i) => {
      const b = el('button', 'seg', DIFFICULTY_LABEL[d], seg);
      b.type = 'button';
      b.addEventListener('pointerenter', () => {
        this.trackRow = 1;
        this.refreshTrackFocus();
      });
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this.trackRow = 1;
        this.setDifficulty(i, true);
      });
      this.diffButtons.push(b);
    });
    this.diffBlurb = new TextField(el('div', 'difficulty-blurb', '', diffWrap));
    // Pantalla partida (solo con teclado/mandos: se oculta en pantallas táctiles por CSS).
    const jugWrap = el('div', 'difficulty wk-jugadores', undefined, trFoot);
    el('div', 'difficulty-label', 'JUGADORES · 玩家', jugWrap);
    const segJ = el('div', 'segmented', undefined, jugWrap);
    for (let n = 1; n <= 4; n++) {
      const b = el('button', 'seg', String(n), segJ);
      b.type = 'button';
      b.title = n === 1 ? 'Un jugador · 单人' : `Pantalla partida · ${n}人分屏`;
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this.jugadores = n;
        this.jugBotones.forEach((x, k) => x.classList.toggle('selected', k === n - 1));
        this.jugAyuda.set(AYUDA_JUGADORES[n - 1]);
        events.emit('ui:move', {});
      });
      if (n === 1) b.classList.add('selected');
      this.jugBotones.push(b);
    }
    this.jugAyuda = new TextField(el('div', 'difficulty-blurb wk-jug-ayuda', AYUDA_JUGADORES[0], jugWrap));
    const trActions = el('div', 'actions', undefined, trFoot);
    trActions.appendChild(button('← ATRÁS · 返回', 'ghost', () => this.goTo('characterSelect', true)));
    this.startButton = button('¡A CORRER! · 开始比赛', 'primary start', () => this.start());
    this.startButton.addEventListener('pointerenter', () => {
      this.trackRow = 2;
      this.refreshTrackFocus();
    });
    trActions.appendChild(this.startButton);

    this.panels = { title, characterSelect: chars, trackSelect: tr };
    this.setCharacter(0);
    this.setTrack(0);
    this.setDifficulty(1);
    this.applyPanel();
  }

  // ------------------------------------------------------------------ public

  get currentPanel(): MenuPanel {
    return this.panel;
  }

  get highlightedCharacter(): CharacterDef {
    return this.characters[this.charIndex];
  }

  show(panel: MenuPanel = 'title'): void {
    this.rootNode.classList.remove('hidden');
    this.visible = true;
    this.goTo(panel, false);
    this.onHighlight?.(this.highlightedCharacter.id);
  }

  hide(): void {
    this.rootNode.classList.add('hidden');
    this.visible = false;
    this.portada.stop();
  }

  dispose(): void {
    this.portada.dispose();
    this.rootNode.remove();
  }

  /** Drive navigation from the InputState edges (keyboard / gamepad). */
  handleInput(input: InputState): void {
    if (!this.visible) return;
    switch (this.panel) {
      case 'title':
        if (input.confirm) this.goTo('characterSelect', true);
        break;
      case 'characterSelect': {
        const n = this.characters.length;
        if (input.menuLeft) this.setCharacter((this.charIndex - 1 + n) % n, true);
        else if (input.menuRight) this.setCharacter((this.charIndex + 1) % n, true);
        else if (input.menuUp) this.setCharacter((this.charIndex - CHAR_COLUMNS + n) % n, true);
        else if (input.menuDown) this.setCharacter((this.charIndex + CHAR_COLUMNS) % n, true);
        if (input.confirm) this.goTo('trackSelect', true);
        else if (input.back) this.goTo('title', true);
        break;
      }
      case 'trackSelect': {
        if (input.menuUp) {
          this.trackRow = (this.trackRow + 2) % 3;
          this.refreshTrackFocus();
          events.emit('ui:move', {});
        } else if (input.menuDown) {
          this.trackRow = (this.trackRow + 1) % 3;
          this.refreshTrackFocus();
          events.emit('ui:move', {});
        } else if (input.menuLeft || input.menuRight) {
          const dir = input.menuRight ? 1 : -1;
          if (this.trackRow === 0) {
            const n = this.tracks.length;
            this.setTrack((this.trackIndex + dir + n) % n, true);
          } else if (this.trackRow === 1) {
            this.setDifficulty((this.difficultyIndex + dir + 3) % 3, true);
          } else {
            events.emit('ui:move', {});
          }
        }
        if (input.confirm) this.start();
        else if (input.back) this.goTo('characterSelect', true);
        break;
      }
    }
  }

  // ----------------------------------------------------------------- private

  private goTo(panel: MenuPanel, sound: boolean): void {
    if (sound) {
      const forward =
        (this.panel === 'title' && panel !== 'title') || (this.panel === 'characterSelect' && panel === 'trackSelect');
      events.emit(forward ? 'ui:select' : 'ui:back', {});
    }
    const changed = panel !== this.panel;
    this.panel = panel;
    this.applyPanel();
    if (changed) this.onPanelChange?.(panel);
  }

  private applyPanel(): void {
    for (const key of Object.keys(this.panels) as MenuPanel[]) {
      const node = this.panels[key];
      const active = key === this.panel;
      node.classList.toggle('active', active);
      if (active) {
        node.classList.remove('panel-in');
        void node.offsetWidth;
        node.classList.add('panel-in');
      }
    }
    if (this.visible && this.panel === 'title') this.portada.start();
    else this.portada.stop();
    if (this.panel === 'trackSelect') {
      this.trackRow = 0;
      this.refreshTrackFocus();
    }
  }

  private setCharacter(i: number, sound = false): void {
    if (i < 0 || i >= this.characters.length) return;
    const changed = i !== this.charIndex;
    this.charIndex = i;
    this.charCards.forEach((c, k) => {
      c.classList.toggle('selected', k === i);
      c.classList.toggle('focused', k === i);
    });
    const def = this.characters[i];
    this.charName.set(def.name.toUpperCase());
    this.charTagline.set(def.tagline);
    if (changed) {
      if (sound) events.emit('ui:move', {});
      this.onHighlight?.(def.id);
    }
  }

  private setTrack(i: number, sound = false): void {
    if (i < 0 || i >= this.tracks.length) return;
    const changed = i !== this.trackIndex;
    this.trackIndex = i;
    this.trackCards.forEach((c, k) => c.classList.toggle('selected', k === i));
    this.pintarCircuito(i, changed);
    this.refreshTrackFocus();
    if (changed && sound) events.emit('ui:move', {});
  }

  private setDifficulty(i: number, sound = false): void {
    const changed = i !== this.difficultyIndex;
    this.difficultyIndex = i;
    this.diffButtons.forEach((b, k) => b.classList.toggle('selected', k === i));
    this.diffBlurb.set(DIFFICULTY_BLURB[DIFFICULTIES[i]]);
    this.refreshTrackFocus();
    if (changed && sound) events.emit('ui:move', {});
  }

  private refreshTrackFocus(): void {
    this.trackCards.forEach((c, k) => c.classList.toggle('focused', this.trackRow === 0 && k === this.trackIndex));
    this.diffButtons.forEach((b, k) =>
      b.classList.toggle('focused', this.trackRow === 1 && k === this.difficultyIndex),
    );
    this.startButton.classList.toggle('focused', this.trackRow === 2);
  }

  private start(): void {
    const track = this.tracks[this.trackIndex];
    const character = this.characters[this.charIndex];
    if (!track || !character) return;
    events.emit('ui:select', {});
    this.onStart?.({
      characterId: character.id,
      trackId: track.id,
      difficulty: DIFFICULTIES[this.difficultyIndex],
      laps: track.laps > 0 ? track.laps : DEFAULT_LAPS,
      jugadores: this.jugadores,
    });
  }

  private buildCharacterCard(c: CharacterDef): HTMLElement {
    const card = el('div', 'card char-card glass');
    card.tabIndex = -1;
    card.style.setProperty('--card-accent', cssHex(c.color));
    card.style.setProperty('--card-accent-2', cssHex(c.accent));
    card.style.setProperty('--card-glow', cssRgba(c.color, 0.55));
    const retrato = RETRATOS[c.id];
    if (retrato) {
      const foto = el('img', 'wk-retrato', undefined, card);
      foto.src = retrato.src;
      foto.alt = c.name;
      foto.draggable = false;
      if (retrato.filtro) foto.style.filter = retrato.filtro;
      card.classList.add('con-retrato');
    }
    const swatch = el('div', 'char-swatch', undefined, card);
    swatch.style.background = `linear-gradient(145deg, ${cssHex(c.color)} 0%, ${cssHex(c.accent)} 100%)`;
    const helmet = el('div', 'char-helmet', undefined, swatch);
    helmet.style.background = `radial-gradient(circle at 35% 35%, #fff 0%, ${cssHex(c.driverColor)} 45%, ${cssHex(
      c.accent,
    )} 100%)`;
    el('div', 'char-wheel char-wheel-l', undefined, swatch);
    el('div', 'char-wheel char-wheel-r', undefined, swatch);
    el('div', 'card-name', c.name.toUpperCase(), card);
    el('div', 'card-tag', c.tagline, card);
    const pill = el('div', `pill weight-${c.weightClass}`, WEIGHT_LABEL[c.weightClass], card);
    pill.title = 'Peso · 重量';
    const stats = el('div', 'stats', undefined, card);
    for (const s of STAT_KEYS) {
      const row = el('div', 'stat', undefined, stats);
      row.dataset.k = s.key;
      el('span', 'stat-label', s.label, row);
      const bar = el('div', 'stat-bar', undefined, row);
      const fill = el('div', 'stat-fill', undefined, bar);
      const v = Math.max(0, Math.min(1, c.stats[s.key]));
      fill.style.width = `${Math.round(v * 100)}%`;
    }
    return card;
  }

  /** Estrellas de dificultad (1–3) como iconos SVG dorados. */
  private pintarEstrellas(caja: HTMLElement, n: number): void {
    caja.replaceChildren();
    caja.title = `Dificultad ${n}/3 · 难度`;
    for (let k = 0; k < 3; k++) caja.appendChild(iconoCircuito('estrella', k < n ? 'wkc-est on' : 'wkc-est'));
  }

  private pintarMeta(caja: HTMLElement, t: TrackDefinition): void {
    caja.replaceChildren();
    const vueltas = el('span', 'wkc-chip', undefined, caja);
    vueltas.appendChild(iconoCircuito('vueltas', 'wkc-chip-ico'));
    el('span', '', `${t.laps} VUELTAS · ${t.laps}圈`, vueltas);
    const nivel = el('span', `wkc-chip wkc-nivel-${t.difficulty}`, undefined, caja);
    nivel.appendChild(iconoCircuito('nivel', 'wkc-chip-ico'));
    el('span', '', NIVEL_CIRCUITO[t.difficulty - 1] ?? 'PRO · 进阶', nivel);
  }

  /** Fondo y ficha grande del circuito elegido. */
  private pintarCircuito(i: number, animar: boolean): void {
    const t = this.tracks[i];
    if (!t || !this.hero) return;
    this.trackFondos.forEach((f, k) => f.classList.toggle('activa', k === i));
    const arte = CIRCUITO_ARTE[t.id];
    const nombre = partirNombre(t.name);
    this.heroSello.textContent = arte?.sello ?? '赛';
    this.heroMundo.textContent = arte?.mundo ?? THEME_LABEL[t.theme] ?? '';
    this.heroZh.textContent = nombre.zh;
    this.heroEs.textContent = nombre.es;
    this.heroDesc.textContent = t.description;
    this.pintarEstrellas(this.heroEstrellas, t.difficulty);
    this.pintarMeta(this.heroMeta, t);
    if (animar) {
      this.hero.classList.remove('wkc-entra');
      void this.hero.offsetWidth;
      this.hero.classList.add('wkc-entra');
    }
  }

  private buildTrackCard(t: TrackDefinition): HTMLElement {
    const card = el('div', 'track-card wkc-card');
    card.tabIndex = -1;
    const arte = CIRCUITO_ARTE[t.id];
    const nombre = partirNombre(t.name);
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', t.name);
    const foto = el('div', 'wkc-foto', undefined, card);
    if (arte) {
      const img = el('img', 'wkc-foto-img', undefined, foto);
      img.src = arte.foto;
      img.alt = t.name;
      img.draggable = false;
      img.loading = 'eager';
    } else {
      foto.style.background = `linear-gradient(180deg, ${cssHex(t.environment.skyTop)}, ${cssHex(t.environment.skyHorizon)})`;
    }
    el('div', 'wkc-foto-brillo', undefined, foto);
    const sello = el('div', 'wkc-sello', arte?.sello ?? '赛', foto);
    sello.translate = false;
    this.pintarEstrellas(el('div', 'wkc-estrellas', undefined, foto), t.difficulty);
    for (const pos of ['tl', 'tr', 'bl', 'br']) el('span', `wkc-esquina wkc-esquina-${pos}`, undefined, card);
    const placa = el('div', 'wkc-placa', undefined, card);
    el('div', 'wkc-nombre-zh', nombre.zh, placa);
    el('div', 'wkc-nombre-es', nombre.es, placa);
    const meta = el('div', 'wkc-meta wkc-meta-carta', undefined, placa);
    this.pintarMeta(meta, t);
    return card;
  }
}
