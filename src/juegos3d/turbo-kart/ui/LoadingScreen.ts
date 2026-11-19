/**
 * Loading overlay shown while a Track is being built. Track name, theme colour
 * band, animated progress bar and rotating tips.
 */
import type { TrackDefinition } from '../core/types';
import { clamp01 } from '../core/math';
import { cssHex, el, TextField } from './dom';

const TIPS: readonly string[] = [
  'Mantén DERRAPE (Espacio / Shift) en la curva y suéltalo para un miniturbo · 弯道按住漂移键，松开获得小加速。',
  'Acelera justo cuando la cuenta llega a 1 para una salida cohete · 倒数到1时踩油门，火箭起步！',
  'Mantén FRENO al usar una bola de energía para lanzarla hacia atrás · 按住刹车再用能量球，可向后发射。',
  'Pulsa Q para mirar atrás antes de soltar el aceite · 按Q回头看，再放油污陷阱。',
  'Las placas turbo (flechas brillantes) dan +45 % de velocidad · 发光箭头加速板：速度+45%。',
  'Los objetos dependen de tu puesto: los últimos reciben escudos, EMP y cometas · 名次越靠后，越容易得到护盾、电磁波和彗星。',
  'El escudo de plasma te hace invencible y destruye las trampas · 等离子护盾让你无敌，还能摧毁陷阱。',
  '¡No te salgas de la pista! Fuera de ella vas a la mitad · 离开赛道速度减半！',
  'Usa el nitro en la recta larga o para recuperarte tras un golpe · 在长直道或被击中后使用氮气。',
  'Los karts pesados empujan a los ligeros · 重型卡丁车能撞开轻型车。',
  'Salta en las rampas para ganar un pequeño impulso · 在坡顶跳跃获得落地加速。',
  'Acierta el reto de cada caja para recibir un objeto · 答对道具箱的题目才能得到道具。',
];

const TIP_INTERVAL = 2.4;

export class LoadingScreen {
  private readonly rootNode: HTMLElement;
  private readonly title: TextField;
  private readonly subtitle: TextField;
  private readonly band: HTMLElement;
  private readonly bar: HTMLElement;
  private readonly tipNode: HTMLElement;
  private readonly tipText: TextField;
  private tipTimer = 0;
  private tipIndex = 0;
  private progress = 0;
  private visible = false;

  constructor(root: HTMLElement) {
    this.rootNode = el('div', 'screen loading hidden', undefined, root);
    const panel = el('div', 'loading-panel', undefined, this.rootNode);
    this.band = el('div', 'loading-band', undefined, panel);
    const inner = el('div', 'loading-inner', undefined, panel);
    el('div', 'loading-kicker', 'CARGANDO · 加载中', inner);
    this.title = new TextField(el('h2', 'loading-title', '', inner));
    this.subtitle = new TextField(el('div', 'loading-subtitle', '', inner));
    const track = el('div', 'loading-track', undefined, inner);
    this.bar = el('div', 'loading-bar', undefined, track);
    el('div', 'loading-bar-shimmer', undefined, this.bar);
    this.tipNode = el('div', 'loading-tip', undefined, inner);
    el('span', 'loading-tip-label', 'CONSEJO · 提示', this.tipNode);
    this.tipText = new TextField(el('span', 'loading-tip-text', '', this.tipNode));
  }

  show(def: TrackDefinition): void {
    this.title.set(def.name);
    const pips = '★'.repeat(def.difficulty) + '☆'.repeat(3 - def.difficulty);
    this.subtitle.set(`${def.laps} VUELTAS · ${def.laps}圈  ·  ${pips}`);
    const env = def.environment;
    this.band.style.background = `linear-gradient(90deg, ${cssHex(env.skyTop)}, ${cssHex(env.skyHorizon)}, ${cssHex(
      def.palette.road,
    )})`;
    this.tipIndex = Math.floor(Math.random() * TIPS.length);
    this.tipText.set(TIPS[this.tipIndex]);
    this.tipTimer = 0;
    this.setProgress(0);
    this.rootNode.classList.remove('hidden');
    this.visible = true;
  }

  hide(): void {
    this.rootNode.classList.add('hidden');
    this.visible = false;
  }

  setProgress(p: number): void {
    p = clamp01(p);
    if (Math.abs(p - this.progress) < 0.002) return;
    this.progress = p;
    this.bar.style.transform = `scaleX(${p.toFixed(3)})`;
  }

  update(dt: number): void {
    if (!this.visible) return;
    this.tipTimer += dt;
    if (this.tipTimer >= TIP_INTERVAL) {
      this.tipTimer = 0;
      this.tipIndex = (this.tipIndex + 1) % TIPS.length;
      this.tipText.set(TIPS[this.tipIndex]);
      this.tipNode.classList.remove('tip-in');
      void this.tipNode.offsetWidth;
      this.tipNode.classList.add('tip-in');
    }
  }

  dispose(): void {
    this.rootNode.remove();
  }
}
