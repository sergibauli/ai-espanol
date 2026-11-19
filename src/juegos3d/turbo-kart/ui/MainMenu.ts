/**
 * Main menu: Title → Character Select → Track Select. Pure DOM; the 3D backdrop
 * behind it is owned by Game (mirrored via onHighlight).
 */
import type { CharacterDef, Difficulty, InputState, RaceSettings, TrackDefinition } from '../core/types';
import { events } from '../core/events';
import { GAME_TITLE, DEFAULT_LAPS } from '../core/constants';
import { button, cssHex, cssRgba, el, TextField } from './dom';

export type MenuPanel = 'title' | 'characterSelect' | 'trackSelect';

const DIFFICULTIES: readonly Difficulty[] = ['easy', 'normal', 'hard'];
const DIFFICULTY_LABEL: Record<Difficulty, string> = { easy: 'FÁCIL · 简单', normal: 'NORMAL · 普通', hard: 'DIFÍCIL · 困难' };
const DIFFICULTY_BLURB: Record<Difficulty, string> = {
  easy: 'Rivales tranquilos que te esperan · 对手比较轻松。',
  normal: 'El reto clásico del Gran Premio · 经典大奖赛挑战。',
  hard: 'Rivales implacables, trazadas casi perfectas · 对手毫不留情！',
};
const STAT_KEYS: readonly { key: keyof CharacterDef['stats']; label: string }[] = [
  { key: 'speed', label: 'VEL' },
  { key: 'acceleration', label: 'ACE' },
  { key: 'handling', label: 'MAN' },
  { key: 'weight', label: 'PES' },
  { key: 'miniTurbo', label: 'TUR' },
];
const CHAR_COLUMNS = 4;
const WEIGHT_LABEL: Record<string, string> = { light: 'LIGERO · 轻', medium: 'MEDIO · 中', heavy: 'PESADO · 重' };
const THEME_LABEL: Record<string, string> = {
  grassland: 'PRADERA · 草原',
  desert: 'DESIERTO · 沙漠',
  snow: 'NIEVE · 雪地',
  beach: 'PLAYA · 海滩',
  volcano: 'VOLCÁN · 火山',
  neon: 'NEÓN · 霓虹',
};

export class MainMenu {
  onStart: ((settings: RaceSettings) => void) | null = null;
  onHighlight: ((characterId: string) => void) | null = null;
  onPanelChange: ((panel: MenuPanel) => void) | null = null;

  private readonly rootNode: HTMLElement;
  private readonly panels: Record<MenuPanel, HTMLElement>;
  private panel: MenuPanel = 'title';
  private visible = false;

  // Character select
  private readonly charCards: HTMLElement[] = [];
  private charIndex = 0;
  private readonly charName: TextField;
  private readonly charTagline: TextField;

  // Track select
  private readonly trackCards: HTMLElement[] = [];
  private trackIndex = 0;
  private readonly diffButtons: HTMLElement[] = [];
  private difficultyIndex = 1;
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
    const title = el('section', 'panel-title-screen', undefined, this.rootNode);
    const logoWrap = el('div', 'logo', undefined, title);
    const words = GAME_TITLE.split(' ');
    words.forEach((w, i) => {
      const line = el('span', `logo-word logo-word-${i}`, undefined, logoWrap);
      line.dataset.text = w;
      line.textContent = w;
    });
    el('div', 'logo-sub', 'GRAN PREMIO DE PALABRAS · 单词大奖赛', title);
    const prompt = el('div', 'press-start', undefined, title);
    el('span', 'press-start-text', 'ENTER O TOCA · 点击开始', prompt);
    const legend = el('div', 'controls-legend glass', undefined, title);
    const keys: [string, string][] = [
      ['W / ↑', 'Acelerar · 加速'],
      ['S / ↓', 'Frenar / atrás · 刹车/倒车'],
      ['A D / ← →', 'Girar · 转向'],
      ['ESPACIO / SHIFT', 'Saltar · derrapar · 跳跃/漂移'],
      ['E / CTRL', 'Usar objeto (con FRENO, hacia atrás) · 使用道具'],
      ['Q', 'Mirar atrás · 向后看'],
      ['1 2 3', 'Responder reto · 回答问题'],
      ['ESC / P', 'Pausa · 暂停'],
      ['M', 'Silencio · 静音'],
    ];
    for (const [k, v] of keys) {
      const row = el('div', 'legend-row', undefined, legend);
      el('kbd', '', k, row);
      el('span', '', v, row);
    }
    el('div', 'version', 'Basado en Turbo Kart Rush de BridgeMind, licencia MIT · 支持手柄', title);
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
    charActions.appendChild(button('SEGUIR · 继续 →', 'primary', () => this.goTo('trackSelect', true)));

    // ----------------------------------------------------------- track select
    const tr = el('section', 'panel-select panel-tracks', undefined, this.rootNode);
    const trHead = el('header', 'select-header', undefined, tr);
    el('div', 'panel-kicker', 'PASO 2 / 2 · 第二步', trHead);
    el('h2', 'panel-title', 'ELIGE CIRCUITO · 选择赛道', trHead);
    const trackGrid = el('div', 'card-grid track-grid', undefined, tr);
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
    const trFoot = el('footer', 'select-footer glass', undefined, tr);
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
  }

  dispose(): void {
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
    });
  }

  private buildCharacterCard(c: CharacterDef): HTMLElement {
    const card = el('div', 'card char-card glass');
    card.tabIndex = -1;
    card.style.setProperty('--card-accent', cssHex(c.color));
    card.style.setProperty('--card-accent-2', cssHex(c.accent));
    card.style.setProperty('--card-glow', cssRgba(c.color, 0.55));
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
      el('span', 'stat-label', s.label, row);
      const bar = el('div', 'stat-bar', undefined, row);
      const fill = el('div', 'stat-fill', undefined, bar);
      const v = Math.max(0, Math.min(1, c.stats[s.key]));
      fill.style.width = `${Math.round(v * 100)}%`;
    }
    return card;
  }

  private buildTrackCard(t: TrackDefinition): HTMLElement {
    const card = el('div', 'card track-card glass');
    card.tabIndex = -1;
    const env = t.environment;
    card.style.setProperty('--card-accent', cssHex(env.skyHorizon));
    card.style.setProperty('--card-glow', cssRgba(env.skyHorizon, 0.5));
    const art = el('div', 'track-art', undefined, card);
    art.style.background = `linear-gradient(180deg, ${cssHex(env.skyTop)} 0%, ${cssHex(env.skyHorizon)} 55%, ${cssHex(
      t.palette.ground,
    )} 56%, ${cssHex(t.palette.ground)} 100%)`;
    const road = el('div', 'track-art-road', undefined, art);
    road.style.background = cssHex(t.palette.road);
    road.style.borderColor = cssHex(t.palette.curb);
    el('div', 'track-theme-pill pill', THEME_LABEL[t.theme] ?? t.theme, art);
    const body = el('div', 'track-body', undefined, card);
    const nameRow = el('div', 'track-name-row', undefined, body);
    el('div', 'card-name', t.name, nameRow);
    const pips = el('div', 'pips', undefined, nameRow);
    for (let i = 0; i < 3; i++) el('span', i < t.difficulty ? 'pip on' : 'pip', '★', pips);
    el('div', 'card-tag', t.description, body);
    const meta = el('div', 'track-meta', undefined, body);
    el('span', 'pill', `${t.laps} VUELTAS · ${t.laps}圈`, meta);
    el('span', 'pill', `${['NOVATO · 新手', 'PRO · 进阶', 'EXPERTO · 高手'][t.difficulty - 1] ?? 'PRO'}`, meta);
    return card;
  }
}
