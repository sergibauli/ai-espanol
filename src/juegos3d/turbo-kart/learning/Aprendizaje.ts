/**
 * Wukong Español · capa de aprendizaje de Turbo Kart Rush.
 *
 * - Retos de las cajas de objetos: al coger una caja aparece una palabra (en chino
 *   o en audio) con 2–3 opciones en español y el juego pasa a cámara lenta. Acierto =
 *   objeto; fallo o tiempo agotado = nada.
 * - Puertas de palabras: pórticos sobre la pista con una palabra en chino arriba y
 *   una opción en español sobre cada carril. Pasar por el carril correcto da turbo.
 * - Estadística por palabra para el resumen final.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { IKart, ITrack } from '../core/types';
import { clamp, trackDelta, wrap01 } from '../core/math';
import { el } from '../ui/dom';
import { TECLAS_RETO } from '../kart/EntradaJugador';

export interface Palabra {
  es: string;
  zh: string;
}

export interface OpcionesAprendizaje {
  /** Vocabulario de la unidad elegida. */
  palabras: Palabra[];
  /** Palabras extra para distractores (otras unidades). */
  banco?: Palabra[];
  /** Pronuncia una palabra en español (voz de la app). */
  decir?: (es: string) => void;
  /** ¿Se puede usar audio en los retos? */
  conVoz?: () => boolean;
  /** Fin de carrera: recibe el resumen y devuelve los XP ganados (para mostrarlos). */
  onCarreraTerminada?: (r: ResumenCarrera) => number | void;
}

export interface ResultadoPalabra extends Palabra {
  aciertos: number;
  fallos: number;
}

export interface ResumenCarrera {
  puesto: number;
  acertadas: ResultadoPalabra[];
  falladas: ResultadoPalabra[];
  retosAcertados: number;
  retosFallados: number;
}

const TIEMPO_RETO = 6; // segundos reales para responder
const CAMARA_LENTA = 0.28;
const TIEMPO_FEEDBACK = 0.9;
const PUERTA_AVISO_M = 75;

const limpiar = (t: string): string => String(t ?? '').replace(/\s+/g, ' ').trim();
const normal = (t: string): string =>
  limpiar(t)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

function barajar<T>(lista: T[]): T[] {
  const c = lista.slice();
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = c[i];
    c[i] = c[j];
    c[j] = t;
  }
  return c;
}

interface RetoActivo {
  palabra: Palabra;
  opciones: string[];
  correcta: number;
  restante: number;
  modo: 'zh' | 'audio';
  resolver: (ok: boolean) => void;
  respondido: boolean;
  feedback: number;
}

interface UIJugador {
  cont: HTMLElement;
  raiz: HTMLElement;
  tarjeta: HTMLElement;
  enunciado: HTMLElement;
  pista: HTMLElement;
  botones: HTMLButtonElement[];
  barra: HTMLElement;
  aviso: HTMLElement;
  avisoZh: HTMLElement;
  reto: RetoActivo | null;
  prevT: number;
  padPrev: boolean[];
}

interface Puerta {
  t: number;
  grupo: THREE.Group;
  palabra: Palabra;
  opciones: string[];
  correcta: number;
  /** Un cartel por carril (n = carriles): centro x y ancho en el marco local del pórtico. */
  carteles: { x: number; ancho: number }[];
  /** Atlas único (estandarte + carteles) → una sola textura y un solo draw call. */
  lienzo: { canvas: HTMLCanvasElement; textura: THREE.CanvasTexture };
  matLuz: THREE.MeshBasicMaterial;
  matNeon: THREE.MeshBasicMaterial;
  destello: THREE.Mesh;
  matDestello: THREE.MeshBasicMaterial;
  altoArco: number;
  flash: number;
  flashOk: boolean;
  flashCarril: number;
}

const COLORES_CARRIL = ['#37e3ff', '#ff4fd8', '#ffc531'];
// Paleta de los pórticos (laca, oro, jade, teja de noche, piedra, tinta)
const LACA = 0xb3122a;
const ORO = 0xe8b04a;
const JADE = 0x0c5546;
const TEJA = 0x24304a;
const PIEDRA = 0x3a2630;
const TINTA = 0x1a0509;
const DESTELLO_S = 0.9;
// Atlas de textos de cada pórtico: estandarte arriba, carteles de 512×160 debajo.
const ATLAS_W = 1024;
const ATLAS_H = 512;
const ATLAS_BANNER_H = 192;
const CARTEL_W = 512;
const CARTEL_H = 160;
const regionCartel = (i: number): { x: number; y: number } => ({ x: (i % 2) * CARTEL_W, y: ATLAS_BANNER_H + Math.floor(i / 2) * CARTEL_H });

export class CapaAprendizaje {
  /** La pone Game: escala de tiempo de la simulación (cámara lenta). */
  setTimeScale: (s: number) => void = () => {};
  /** La pone Game: ¿se puede preguntar ahora (carrera en curso)? */
  puedePreguntar: (jugador: number) => boolean = () => true;

  private readonly palabras: Palabra[];
  private readonly banco: Palabra[];
  private cola: Palabra[] = [];
  private readonly stats = new Map<string, ResultadoPalabra>();
  private retosOk = 0;
  private retosKo = 0;

  /** Interfaz de cada jugador (uno en solitario; 2–4 en pantalla partida). */
  private ui: UIJugador[] = [];

  private puertas: Puerta[] = [];
  private escenaPuertas: THREE.Object3D | null = null;
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly mats: THREE.Material[] = [];
  private track: ITrack | null = null;
  private matPorticos: THREE.MeshStandardMaterial | null = null;
  private reloj = 0;

  constructor(
    uiRoot: HTMLElement,
    private readonly opciones: OpcionesAprendizaje,
  ) {
    const vistas = new Set<string>();
    this.palabras = [];
    for (const p of opciones.palabras || []) {
      const es = limpiar(p.es);
      const zh = limpiar(p.zh);
      if (!es || !zh || vistas.has(normal(es))) continue;
      vistas.add(normal(es));
      this.palabras.push({ es, zh });
    }
    this.banco = [];
    for (const p of opciones.banco || []) {
      const es = limpiar(p.es);
      if (!es || vistas.has(normal(es))) continue;
      vistas.add(normal(es));
      this.banco.push({ es, zh: limpiar(p.zh) });
    }

    this.configurarJugadores([uiRoot]);
    window.addEventListener('keydown', this.onKey);
  }

  /** Crea la tarjeta del reto y el aviso de puerta dentro de cada contenedor (uno por jugador). */
  configurarJugadores(contenedores: HTMLElement[]): void {
    for (const u of this.ui) {
      if (u.reto && !u.reto.respondido) u.reto.resolver(false);
      u.raiz.remove();
      u.aviso.remove();
    }
    this.ui = contenedores.map((cont, idx) => this.crearUI(cont, idx));
  }

  private crearUI(cont: HTMLElement, idx: number): UIJugador {
    // Estructura visual (wukong-retos.css): pergamino de laca con ejes dorados que se
    // despliega; dentro, sello + kicker, palabra, pista, medallones de jade e incienso.
    const raiz = el('div', 'wk-reto wk-rt oculto', undefined, cont);
    const tarjeta = el('div', 'wk-reto-tarjeta', undefined, raiz);
    tarjeta.setAttribute('role', 'dialog');
    tarjeta.setAttribute('aria-live', 'polite');
    const rayos = el('div', 'wk-rt-rayos', undefined, tarjeta);
    rayos.setAttribute('aria-hidden', 'true');
    for (const lado of ['izq', 'der']) el('div', `wk-rt-eje ${lado}`, undefined, tarjeta).setAttribute('aria-hidden', 'true');
    const papel = el('div', 'wk-rt-papel', undefined, tarjeta);
    const deco = el('div', 'wk-rt-deco', undefined, papel);
    deco.setAttribute('aria-hidden', 'true');
    for (const esq of ['si', 'sd', 'ii', 'id']) el('span', `wk-rt-esq ${esq}`, undefined, deco);
    el('span', 'wk-rt-brillo', undefined, deco);
    const cab = el('div', 'wk-rt-cab', undefined, papel);
    const sello = el('span', 'wk-rt-sello', '宝', cab);
    sello.setAttribute('aria-hidden', 'true');
    el('div', 'wk-reto-kicker', '¡CAJA DE OBJETOS! · 道具箱', cab);
    const enunciado = el('div', 'wk-reto-palabra', '', papel);
    const pista = el('div', 'wk-reto-pista', '', papel);
    const fila = el('div', 'wk-reto-opciones', undefined, papel);
    const botones: HTMLButtonElement[] = [];
    for (let i = 0; i < 3; i++) {
      const b = el('button', 'wk-reto-opcion', '', fila);
      b.type = 'button';
      b.addEventListener('pointerdown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.responder(idx, i);
      });
      botones.push(b);
    }
    const barraBox = el('div', 'wk-reto-tiempo', undefined, papel);
    const barra = el('div', 'wk-reto-tiempo-barra', undefined, barraBox);
    el('span', 'wk-rt-brasa', undefined, barraBox).setAttribute('aria-hidden', 'true');
    const veredicto = el('div', 'wk-rt-veredicto', undefined, tarjeta);
    veredicto.setAttribute('aria-hidden', 'true');
    const chispas = el('div', 'wk-rt-chispas', undefined, tarjeta);
    chispas.setAttribute('aria-hidden', 'true');
    for (let k = 0; k < 14; k++) {
      const c = el('i', '', undefined, chispas);
      c.style.setProperty('--a', `${Math.round((k / 14) * 360 + (k % 2) * 9)}deg`);
      c.style.setProperty('--d', `${120 + (k % 3) * 46}px`);
    }
    enunciado.addEventListener('pointerdown', (ev) => {
      ev.stopPropagation();
      const r = this.ui[idx]?.reto;
      if (r?.modo === 'audio') this.opciones.decir?.(r.palabra.es);
    });
    // Aviso de puerta: estandarte que cae colgado de una vara dorada con borlas.
    const aviso = el('div', 'wk-aviso wk-av oculto', undefined, cont);
    aviso.setAttribute('role', 'status');
    el('span', 'wk-av-vara', undefined, aviso).setAttribute('aria-hidden', 'true');
    const tela = el('span', 'wk-av-tela', undefined, aviso);
    el('span', 'wk-aviso-kicker', 'PUERTA DE PALABRAS · 单词门', tela);
    const avisoZh = el('span', 'wk-aviso-zh', '', tela);
    el('span', 'wk-aviso-hint', 'Pasa por el carril correcto · 从正确的车道通过', tela);
    const carriles = el('span', 'wk-av-carriles', undefined, tela);
    carriles.setAttribute('aria-hidden', 'true');
    for (let k = 0; k < 3; k++) el('i', '', undefined, carriles).style.setProperty('--c', COLORES_CARRIL[k]);
    for (const lado of ['izq', 'der']) el('span', `wk-av-borla ${lado}`, undefined, aviso).setAttribute('aria-hidden', 'true');
    return { cont, raiz, tarjeta, enunciado, pista, botones, barra, aviso, avisoZh, reto: null, prevT: -1, padPrev: [] };
  }

  /** Texto de una opción: medallón con la tecla + palabra (solo presentación). */
  private pintarOpcion(b: HTMLButtonElement, tecla: string, txt: string): void {
    b.textContent = '';
    if (!txt) return;
    if (tecla) el('span', 'wk-rt-num', tecla, b);
    el('span', 'wk-rt-txt', txt, b);
  }

  private get solitario(): boolean {
    return this.ui.length <= 1;
  }

  get hayPalabras(): boolean {
    return this.palabras.length > 0;
  }

  get retoActivo(): boolean {
    return this.ui.some((u) => u.reto !== null);
  }

  // ------------------------------------------------------------------ palabras

  private siguientePalabra(evitar?: string): Palabra {
    if (!this.cola.length) this.cola = barajar(this.palabras).filter((p) => p.es !== evitar);
    if (!this.cola.length) this.cola = barajar(this.palabras);
    return this.cola.shift() as Palabra;
  }

  private distractores(p: Palabra, n: number, maxLen = 99): string[] {
    const out: string[] = [];
    const usados = new Set([normal(p.es)]);
    const fuentes = [barajar(this.palabras), barajar(this.banco)];
    for (const lista of fuentes) {
      for (const c of lista) {
        if (out.length >= n) break;
        const k = normal(c.es);
        if (usados.has(k) || c.es.length > maxLen || c.zh === p.zh) continue;
        usados.add(k);
        out.push(c.es);
      }
    }
    return out;
  }

  private anotar(p: Palabra, ok: boolean): void {
    let r = this.stats.get(p.es);
    if (!r) {
      r = { es: p.es, zh: p.zh, aciertos: 0, fallos: 0 };
      this.stats.set(p.es, r);
    }
    if (ok) r.aciertos++;
    else r.fallos++;
  }

  // ------------------------------------------------------------- retos de caja

  /** ItemManager → reto al coger una caja (kartId = número de jugador en pantalla partida). */
  readonly preguntarCaja = (resolver: (ok: boolean) => void, kartId = 0): void => {
    const u = this.ui[kartId];
    if (!u || !this.hayPalabras || !this.puedePreguntar(kartId) || u.reto) {
      resolver(!u?.reto); // sin palabras / tras la meta: objeto normal
      return;
    }
    const palabra = this.siguientePalabra();
    const n = Math.random() < 0.5 ? 2 : 3;
    const opciones = barajar([palabra.es, ...this.distractores(palabra, n - 1)]);
    const conVoz = (this.opciones.conVoz?.() ?? false) && this.solitario;
    const modo: 'zh' | 'audio' = conVoz && this.opciones.decir && Math.random() < 0.4 ? 'audio' : 'zh';
    u.reto = { palabra, opciones, correcta: opciones.indexOf(palabra.es), restante: TIEMPO_RETO, modo, resolver, respondido: false, feedback: 0 };
    if (modo === 'audio') {
      u.enunciado.textContent = '🔊';
      u.enunciado.classList.add('audio');
      u.pista.textContent = 'Escucha y elige · 听一听，选一选';
      this.opciones.decir?.(palabra.es);
    } else {
      u.enunciado.textContent = palabra.zh;
      u.enunciado.classList.remove('audio');
      u.pista.textContent = '¿Cómo se dice en español? · 用西班牙语怎么说？';
    }
    const teclas = this.solitario ? ['1', '2', '3'] : (TECLAS_RETO[kartId] ?? []).map((c) => c.replace('Digit', ''));
    u.botones.forEach((b, i) => {
      const txt = opciones[i];
      b.style.display = txt ? '' : 'none';
      this.pintarOpcion(b, teclas[i] ?? '', txt ?? '');
      b.classList.remove('ok', 'ko');
      b.disabled = false;
    });
    u.tarjeta.classList.remove('ok', 'ko', 'prisa');
    u.tarjeta.style.setProperty('--wk-resto', '1');
    u.barra.style.transform = 'scaleX(1)';
    u.raiz.classList.remove('oculto');
    // Cámara lenta solo en solitario: en pantalla partida no se frena a los demás.
    if (this.solitario) this.setTimeScale(CAMARA_LENTA);
  };

  private responder(idx: number, i: number): void {
    const u = this.ui[idx];
    const r = u?.reto;
    if (!u || !r || r.respondido) return;
    if (i >= r.opciones.length) return; // i = -1: tiempo agotado
    r.respondido = true;
    const ok = i === r.correcta;
    this.anotar(r.palabra, ok);
    if (ok) this.retosOk++;
    else this.retosKo++;
    u.botones.forEach((b, k) => {
      b.disabled = true;
      if (k === r.correcta) b.classList.add('ok');
      else if (k === i) b.classList.add('ko');
    });
    u.tarjeta.classList.add(ok ? 'ok' : 'ko');
    if (r.modo === 'audio') u.enunciado.textContent = r.palabra.zh;
    u.pista.textContent = ok ? '¡Correcto! Objeto conseguido · 答对了！获得道具' : `${r.palabra.es} = ${r.palabra.zh} · 没有道具`;
    if (ok && this.solitario) this.opciones.decir?.(r.palabra.es);
    r.feedback = TIEMPO_FEEDBACK;
    if (this.solitario) this.setTimeScale(1);
    r.resolver(ok);
  }

  /** Cancela los retos en curso (salir, reiniciar) sin contarlos. */
  cancelarReto(): void {
    for (const u of this.ui) {
      const r = u.reto;
      if (!r) continue;
      u.reto = null;
      u.raiz.classList.add('oculto');
      if (!r.respondido) r.resolver(false);
    }
    this.setTimeScale(1);
  }

  private readonly onKey = (e: KeyboardEvent): void => {
    if (this.solitario) {
      const u = this.ui[0];
      if (!u?.reto || u.reto.respondido) return;
      const m = /^(?:Digit|Numpad)([1-3])$/.exec(e.code);
      if (m) {
        e.preventDefault();
        this.responder(0, Number(m[1]) - 1);
      }
      return;
    }
    this.ui.forEach((u, idx) => {
      if (!u.reto || u.reto.respondido) return;
      const k = (TECLAS_RETO[idx] ?? []).indexOf(e.code);
      if (k >= 0) {
        e.preventDefault();
        this.responder(idx, k);
      }
    });
  };

  private leerMando(idx: number): void {
    if (typeof navigator === 'undefined' || typeof navigator.getGamepads !== 'function') return;
    const u = this.ui[idx];
    let pad: Gamepad | null = null;
    try {
      const pads = navigator.getGamepads();
      if (this.solitario) {
        for (const p of pads) if (p && p.connected) { pad = p; break; }
      } else {
        const p = pads[idx];
        pad = p && p.connected ? p : null;
      }
    } catch {
      return;
    }
    if (!pad || !u) return;
    // X → 1, Y → 2, B → 3 (A queda para el derrape)
    const mapa = [2, 3, 1];
    mapa.forEach((b, opcion) => {
      const now = !!pad?.buttons[b]?.pressed;
      if (now && !u.padPrev[b]) this.responder(idx, opcion);
      u.padPrev[b] = now;
    });
  }

  /** Cada frame (tiempo real, sin cámara lenta). `pausado` congela el reloj. */
  update(dtReal: number, pausado: boolean, jugadores: readonly (IKart | null)[]): void {
    this.ui.forEach((u, idx) => {
      const r = u.reto;
      if (r && !pausado) {
        if (!r.respondido) {
          this.leerMando(idx);
          r.restante -= dtReal;
          const resto = clamp(r.restante / TIEMPO_RETO, 0, 1);
          u.barra.style.transform = `scaleX(${resto.toFixed(3)})`;
          u.tarjeta.style.setProperty('--wk-resto', resto.toFixed(3));
          u.tarjeta.classList.toggle('prisa', resto < 0.34);
          if (r.restante <= 0) {
            this.responder(idx, -1); // tiempo agotado cuenta como fallo
            u.pista.textContent = `¡Tiempo! ${r.palabra.es} = ${r.palabra.zh} · 时间到！`;
          }
        } else {
          r.feedback -= dtReal;
          if (r.feedback <= 0) {
            u.reto = null;
            u.raiz.classList.add('oculto');
          }
        }
      }
      this.actualizarAviso(idx, jugadores[idx] ?? null);
    });
    this.animarPuertas(dtReal, jugadores);
  }

  /** Pórticos: pulso de neón al acercarse y destello al atravesarlos (solo visual). */
  private animarPuertas(dtReal: number, jugadores: readonly (IKart | null)[]): void {
    const track = this.track;
    if (!track || !this.puertas.length) return;
    this.reloj += dtReal;
    for (const p of this.puertas) {
      let d = Infinity;
      for (const k of jugadores) {
        if (!k) continue;
        d = Math.min(d, wrap01(p.t - k.state.trackT) * track.length);
      }
      const cerca = clamp(1 - d / 90, 0, 1);
      const pulso = 0.75 + 0.25 * Math.sin(this.reloj * 7 + p.t * 20);
      p.flash = Math.max(0, p.flash - dtReal);
      const f = p.flash / DESTELLO_S;
      p.matLuz.opacity = clamp(0.5 + 0.5 * cerca * pulso + (p.flashOk ? f * 0.6 : 0), 0, 1);
      p.matNeon.color.setScalar(1.15 + 0.9 * cerca * pulso + (p.flashOk ? f * 1.2 : 0));
      if (f > 0 && p.flashCarril >= 0) {
        const c = p.carteles[p.flashCarril];
        p.destello.visible = true;
        p.destello.position.x = c.x;
        const e = 1 + (1 - f) * 0.35;
        p.destello.scale.set(c.ancho * 0.94 * e, p.altoArco * e, 1);
        p.matDestello.opacity = f * 0.9;
      } else if (p.destello.visible) {
        p.destello.visible = false;
      }
    }
  }

  // ------------------------------------------------------- puertas de palabras

  /** Coloca 2–3 pórticos en la pista, lejos de cajas, placas turbo y salida. */
  montarPuertas(track: ITrack, escena: THREE.Object3D): void {
    this.desmontarPuertas();
    this.track = track;
    if (!this.hayPalabras) return;
    const ocupados = [0, ...track.def.itemBoxRows, ...track.def.boostPads];
    const candidatas = [0.2, 0.33, 0.47, 0.6, 0.74, 0.87];
    const elegidas: number[] = [];
    for (const t of candidatas) {
      if (elegidas.length >= 3) break;
      let ok = true;
      for (const o of ocupados) if (Math.abs(trackDelta(o, t)) < 0.05) ok = false;
      for (const e of elegidas) if (Math.abs(trackDelta(e, t)) < 0.18) ok = false;
      if (ok) elegidas.push(t);
    }
    const raiz = new THREE.Group();
    raiz.name = 'PuertasPalabras';
    for (const t of elegidas) this.puertas.push(this.crearPuerta(track, t, raiz));
    escena.add(raiz);
    this.escenaPuertas = raiz;
    for (const u of this.ui) u.prevT = -1;
  }

  /**
   * Pórtico paifang (牌坊) sobre la pista: columnas de laca roja, dintel y tejado con aleros
   * dorados, estandarte con la palabra en chino y, por carril, un arco de neón de su color con
   * cortina de luz y franja en el suelo. Todo fusionado: 4 draw calls por pórtico (+1 al cruzar).
   */
  private crearPuerta(track: ITrack, t: number, raiz: THREE.Group): Puerta {
    const s = track.sample(t);
    const hw = s.halfWidth;
    const grupo = new THREE.Group();
    const m = new THREE.Matrix4().makeBasis(s.binormal, new THREE.Vector3(0, 1, 0), s.tangent.clone().negate());
    grupo.quaternion.setFromRotationMatrix(m);
    grupo.position.copy(s.position);
    raiz.add(grupo);

    const n = hw * 2 >= 9 ? 3 : 2;
    const ancho = (hw * 2) / n;
    const H = 4.8; // altura de las columnas (base del dintel)
    const px = hw + 0.95; // columnas fuera de la calzada
    const W = px * 2 + 1.1; // largo del dintel
    const bw = Math.min(W * 0.56, 9.4); // estandarte
    const bh = bw * (ATLAS_BANNER_H / ATLAS_W);
    const yFriso = H + 0.55;
    const yViga = yFriso + bh + 0.2;
    const yTejado = yViga + 0.36;

    // ---- estructura (laca, oro, jade, teja): una malla con colores por vértice
    const piezas: THREE.BufferGeometry[] = [];
    const add = (g: THREE.BufferGeometry, color: number, x = 0, y = 0, z = 0, rx = 0, rz = 0): void => {
      if (rx) g.rotateX(rx);
      if (rz) g.rotateZ(rz);
      g.translate(x, y, z);
      piezas.push(conColor(g, new THREE.Color(color), 3));
    };
    for (const lado of [-1, 1]) {
      const x = lado * px;
      add(new THREE.CylinderGeometry(0.34, 0.38, H, 14), LACA, x, H / 2, 0);
      add(new THREE.CylinderGeometry(0.62, 0.7, 0.5, 14), PIEDRA, x, 0.25, 0);
      add(new THREE.CylinderGeometry(0.46, 0.5, 0.18, 14), ORO, x, 0.58, 0);
      add(new THREE.CylinderGeometry(0.44, 0.38, 0.22, 14), ORO, x, H - 0.12, 0);
      add(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 14), ORO, x, H * 0.55, 0);
      // farolillo colgado por fuera de cada columna (su luz va en la malla de neón)
      add(new THREE.BoxGeometry(0.06, 0.6, 0.06), ORO, lado * (px + 0.95), H - 0.25, 0);
      add(new THREE.BoxGeometry(0.95, 0.08, 0.08), ORO, lado * (px + 0.5), H + 0.06, 0);
    }
    // dintel rojo con filos de oro
    add(new THREE.BoxGeometry(W, 0.55, 0.56), LACA, 0, H + 0.275, 0);
    add(new THREE.BoxGeometry(W + 0.12, 0.09, 0.64), ORO, 0, H + 0.02, 0);
    add(new THREE.BoxGeometry(W + 0.12, 0.09, 0.64), ORO, 0, H + 0.53, 0);
    // friso de jade tras el estandarte y viga superior
    add(new THREE.BoxGeometry(W - 0.5, bh + 0.2, 0.36), JADE, 0, yFriso + (bh + 0.2) / 2, 0);
    for (const lado of [-1, 1]) add(new THREE.BoxGeometry(0.22, bh + 0.2, 0.46), ORO, lado * (W / 2 - 0.36), yFriso + (bh + 0.2) / 2, 0);
    add(new THREE.BoxGeometry(W + 0.3, 0.36, 0.6), LACA, 0, yViga + 0.18, 0);
    add(new THREE.BoxGeometry(W + 0.42, 0.08, 0.68), ORO, 0, yViga + 0.36, 0);
    // tejado a dos aguas con aleros y caballete de oro
    const seccion = new THREE.Shape();
    seccion.moveTo(-1.25, 0);
    seccion.lineTo(1.25, 0);
    seccion.lineTo(1.1, 0.12);
    seccion.lineTo(0.18, 0.78);
    seccion.lineTo(-0.18, 0.78);
    seccion.lineTo(-1.1, 0.12);
    seccion.closePath();
    const largoTejado = W + 1.6;
    const tejado = new THREE.ExtrudeGeometry(seccion, { depth: largoTejado, bevelEnabled: false });
    tejado.rotateY(Math.PI / 2);
    add(tejado, TEJA, -largoTejado / 2, yTejado, 0);
    add(new THREE.BoxGeometry(largoTejado + 0.2, 0.08, 0.08), ORO, 0, yTejado + 0.02, 1.25);
    add(new THREE.BoxGeometry(largoTejado + 0.2, 0.08, 0.08), ORO, 0, yTejado + 0.02, -1.25);
    add(new THREE.BoxGeometry(largoTejado - 0.6, 0.2, 0.42), ORO, 0, yTejado + 0.86, 0);
    for (const lado of [-1, 1]) {
      // aleros curvados hacia arriba en las cuatro esquinas
      for (const zz of [-1, 1]) {
        add(new THREE.ConeGeometry(0.14, 0.9, 8), ORO, lado * (largoTejado / 2 + 0.18), yTejado + 0.3, zz * 1.15, zz * 0.45, -lado * 0.9);
      }
      // remates del caballete (chiwen estilizado)
      add(new THREE.ConeGeometry(0.2, 0.75, 8), ORO, lado * (largoTejado / 2 - 0.4), yTejado + 1.2, 0, 0, lado * 0.35);
    }
    add(new THREE.SphereGeometry(0.3, 12, 8), ORO, 0, yTejado + 1.18, 0);
    // tablero de los carteles por carril (cuelga del dintel) y separadores dorados
    add(new THREE.BoxGeometry(hw * 2 + 0.3, 1.02, 0.14), TINTA, 0, H - 0.56, 0);
    add(new THREE.BoxGeometry(hw * 2 + 0.42, 0.07, 0.2), ORO, 0, H - 1.08, 0);
    for (let i = 0; i <= n; i++) add(new THREE.BoxGeometry(0.1, 1.1, 0.22), ORO, -hw + i * ancho, H - 0.56, 0);

    const estructura = new THREE.Mesh(this.geo(fusionar(piezas)), this.matEstructura());
    estructura.castShadow = true;
    grupo.add(estructura);

    // ---- neón: arco por carril (con piernas que se desvanecen), farolillos y filos
    const ins = 0.16;
    const rArco = 0.75;
    const yArco = H - 1.22 - rArco;
    const neon: THREE.BufferGeometry[] = [];
    const luz: THREE.BufferGeometry[] = [];
    for (let i = 0; i < n; i++) {
      const color = new THREE.Color(COLORES_CARRIL[i]);
      const x0 = -hw + i * ancho + ins;
      const x1 = -hw + (i + 1) * ancho - ins;
      const xc = (x0 + x1) / 2;
      const rx = (x1 - x0) / 2;
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k <= 6; k++) pts.push(new THREE.Vector3(x0, 0.05 + (yArco - 0.05) * (k / 6), 0));
      for (let k = 1; k < 24; k++) {
        const a = Math.PI - (k / 24) * Math.PI;
        pts.push(new THREE.Vector3(xc + Math.cos(a) * rx, yArco + Math.sin(a) * rArco, 0));
      }
      for (let k = 0; k <= 6; k++) pts.push(new THREE.Vector3(x1, yArco - (yArco - 0.05) * (k / 6), 0));
      const tubo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'centripetal'), 72, 0.075, 6, false);
      neon.push(conColor(tubo, color, 4, (y) => suave(0.15, 1.5, y)));
      // cortina de luz dentro del arco: intensa abajo, se apaga hacia arriba
      const alto = yArco + rArco * 0.7;
      const cortina = new THREE.PlaneGeometry(rx * 2, alto, 1, 8);
      cortina.translate(xc, alto / 2, 0);
      luz.push(conColor(cortina, color, 4, (y) => 0.42 * Math.pow(1 - clamp(y / alto, 0, 1), 1.3)));
      // franja del carril en el suelo, para ver desde lejos qué color es cada carril
      const suelo = new THREE.PlaneGeometry(rx * 2 * 0.9, 9, 1, 8);
      suelo.rotateX(-Math.PI / 2);
      suelo.translate(xc, 0.06, 0);
      luz.push(conColor(suelo, color, 4, (_y, z) => 0.38 * (1 - Math.min(1, Math.abs(z) / 4.5))));
    }
    for (const lado of [-1, 1]) {
      const farol = new THREE.SphereGeometry(0.34, 12, 8);
      farol.scale(1, 1.2, 1);
      farol.translate(lado * (px + 0.95), H - 0.75, 0);
      neon.push(conColor(farol, new THREE.Color(0xff4a2e), 4));
    }
    for (const zz of [-1, 1]) {
      const filo = new THREE.BoxGeometry(W + 0.14, 0.05, 0.05);
      filo.translate(0, H - 0.03, zz * 0.33);
      neon.push(conColor(filo, new THREE.Color(0xffc75a), 4));
      const filoT = new THREE.BoxGeometry(largoTejado + 0.2, 0.05, 0.05);
      filoT.translate(0, yTejado - 0.02, zz * 1.27);
      neon.push(conColor(filoT, new THREE.Color(0x37e3ff), 4));
    }
    const matNeon = this.mat(
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    matNeon.color.setScalar(1.15);
    const mNeon = new THREE.Mesh(this.geo(fusionar(neon)), matNeon);
    mNeon.renderOrder = 2;
    grupo.add(mNeon);
    const matLuz = this.mat(
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    );
    const mLuz = new THREE.Mesh(this.geo(fusionar(luz)), matLuz);
    mLuz.renderOrder = 1;
    grupo.add(mLuz);

    // ---- estandarte + carteles: un atlas y una malla
    const canvas = document.createElement('canvas');
    canvas.width = ATLAS_W;
    canvas.height = ATLAS_H;
    const textura = new THREE.CanvasTexture(canvas);
    textura.colorSpace = THREE.SRGBColorSpace;
    textura.anisotropy = 4;
    const quads: THREE.BufferGeometry[] = [];
    const banner = new THREE.PlaneGeometry(bw, bh);
    atlasUV(banner, 0, 0, ATLAS_W, ATLAS_BANNER_H);
    banner.translate(0, yFriso + 0.1 + bh / 2, 0.2);
    quads.push(banner);
    const carteles: Puerta['carteles'] = [];
    for (let i = 0; i < n; i++) {
      const x = -hw + (i + 0.5) * ancho;
      const cw = ancho * 0.94;
      const q = new THREE.PlaneGeometry(cw, Math.min(0.95, cw / (CARTEL_W / CARTEL_H)));
      const r = regionCartel(i);
      atlasUV(q, r.x, r.y, CARTEL_W, CARTEL_H);
      q.translate(x, H - 0.56, 0.08);
      quads.push(q);
      carteles.push({ x, ancho });
    }
    const matCarteles = this.mat(
      new THREE.MeshBasicMaterial({ map: textura, transparent: true, toneMapped: false, side: THREE.DoubleSide }),
    );
    matCarteles.color.setScalar(0.92); // que el blanco no se queme con el bloom
    const mCarteles = new THREE.Mesh(this.geo(mergeGeometries(quads, false) ?? new THREE.BufferGeometry()), matCarteles);
    mCarteles.renderOrder = 3;
    grupo.add(mCarteles);
    for (const q of quads) q.dispose();

    // ---- destello al atravesar (oculto hasta entonces)
    const matDestello = this.mat(
      new THREE.MeshBasicMaterial({
        color: 0xffd36b,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    );
    const planoDestello = new THREE.PlaneGeometry(1, 1, 1, 6);
    planoDestello.translate(0, 0.5, 0);
    const destello = new THREE.Mesh(this.geo(conColor(planoDestello, new THREE.Color(1, 1, 1), 4, (y) => 1 - y * 0.85)), matDestello);
    destello.visible = false;
    destello.renderOrder = 4;
    grupo.add(destello);

    const puerta: Puerta = {
      t,
      grupo,
      palabra: { es: '', zh: '' },
      opciones: [],
      correcta: 0,
      carteles,
      lienzo: { canvas, textura },
      matLuz,
      matNeon,
      destello,
      matDestello,
      altoArco: yArco + rArco,
      flash: 0,
      flashOk: false,
      flashCarril: -1,
    };
    this.rellenarPuerta(puerta);
    return puerta;
  }

  private matEstructura(): THREE.MeshStandardMaterial {
    if (!this.matPorticos) {
      const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.42, metalness: 0.35 });
      // Brillo propio (de noche la laca y el oro no deben quedar negros): emisivo = color × 0.32.
      mat.onBeforeCompile = (sh: { fragmentShader: string }) => {
        sh.fragmentShader = sh.fragmentShader.replace(
          '#include <emissivemap_fragment>',
          '#include <emissivemap_fragment>\n  totalEmissiveRadiance += vColor.rgb * 0.32;',
        );
      };
      this.matPorticos = this.mat(mat);
    }
    return this.matPorticos;
  }

  private geo<T extends THREE.BufferGeometry>(g: T): T {
    this.geos.push(g);
    return g;
  }

  private mat<T extends THREE.Material>(m: T): T {
    this.mats.push(m);
    return m;
  }

  private rellenarPuerta(p: Puerta): void {
    const n = p.carteles.length;
    let palabra = this.siguientePalabra(p.palabra.es);
    for (let k = 0; k < 6 && palabra.es.length > 18; k++) palabra = this.siguientePalabra();
    const opciones = barajar([palabra.es, ...this.distractores(palabra, n - 1, 18)]);
    while (opciones.length < n) opciones.push('—');
    p.palabra = palabra;
    p.opciones = opciones;
    p.correcta = opciones.indexOf(palabra.es);
    const x = p.lienzo.canvas.getContext('2d');
    if (!x) return;
    x.clearRect(0, 0, ATLAS_W, ATLAS_H);
    pintarEstandarte(x, palabra.zh);
    for (let i = 0; i < n; i++) {
      const r = regionCartel(i);
      pintarCartel(x, r.x, r.y, opciones[i], COLORES_CARRIL[i]);
    }
    p.lienzo.textura.needsUpdate = true;
  }

  /** Paso fijo: detecta el cruce del jugador por una puerta. */
  revisarPuertas(jugador: IKart, idx = 0): void {
    const track = this.track;
    const u = this.ui[idx];
    if (!track || !u || !this.puertas.length) return;
    const st = jugador.state;
    const t = st.trackT;
    if (u.prevT < 0 || st.isFrozen) {
      u.prevT = t;
      return;
    }
    const avance = trackDelta(u.prevT, t);
    if (avance > 0 && avance < 0.05 && !st.finished) {
      for (const p of this.puertas) {
        const d = trackDelta(u.prevT, p.t);
        if (d >= 0 && d < avance) this.cruzar(p, jugador, track, idx);
      }
    }
    u.prevT = t;
  }

  private cruzar(p: Puerta, jugador: IKart, track: ITrack, idx: number): void {
    const q = track.query(jugador.state.position, jugador.state.trackT);
    const n = p.carteles.length;
    const hw = q.halfWidth;
    let carril = -1;
    if (Math.abs(q.lateral) <= hw + 0.8) carril = clamp(Math.floor(((q.lateral + hw) / (2 * hw)) * n), 0, n - 1);
    const ok = carril === p.correcta;
    this.anotar(p.palabra, ok);
    if (ok) {
      this.retosOk++;
      jugador.applyBoost(0.5, 1.4, 'pad');
      if (this.solitario) this.opciones.decir?.(p.palabra.es);
      this.flashTexto(idx, `¡${p.palabra.es}! TURBO · 加速`, true);
    } else {
      this.retosKo++;
      this.flashTexto(idx, `${p.palabra.zh} = ${p.palabra.es}`, false);
    }
    p.flash = DESTELLO_S;
    p.flashOk = ok;
    p.flashCarril = ok ? p.correcta : carril;
    p.matDestello.color.set(ok ? 0xffd36b : 0xff3046);
    // Nueva palabra para la próxima vuelta (cuando ya no se vea).
    window.setTimeout(() => {
      if (this.puertas.includes(p)) this.rellenarPuerta(p);
    }, 1500);
  }

  private flashTexto(idx: number, texto: string, ok: boolean): void {
    const u = this.ui[idx];
    if (!u) return;
    const n = el('div', `wk-flash ${ok ? 'ok' : 'ko'}`, texto, u.cont);
    window.setTimeout(() => n.remove(), 1600);
  }

  private actualizarAviso(idx: number, jugador: IKart | null): void {
    const u = this.ui[idx];
    if (!u) return;
    const track = this.track;
    let mostrar: Puerta | null = null;
    if (track && jugador && this.puertas.length && !jugador.state.finished && !jugador.state.isFrozen) {
      const t = jugador.state.trackT;
      let mejor = Infinity;
      for (const p of this.puertas) {
        const d = wrap01(p.t - t) * track.length;
        if (d > 2 && d < PUERTA_AVISO_M && d < mejor) {
          mejor = d;
          mostrar = p;
        }
      }
    }
    if (mostrar) {
      if (u.avisoZh.textContent !== mostrar.palabra.zh) u.avisoZh.textContent = mostrar.palabra.zh;
      u.aviso.classList.remove('oculto');
    } else {
      u.aviso.classList.add('oculto');
    }
  }

  desmontarPuertas(): void {
    this.escenaPuertas?.removeFromParent();
    this.escenaPuertas = null;
    for (const p of this.puertas) p.lienzo.textura.dispose();
    this.puertas = [];
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    this.geos.length = 0;
    this.mats.length = 0;
    this.matPorticos = null;
    this.track = null;
    for (const u of this.ui) u.aviso.classList.add('oculto');
  }

  // ------------------------------------------------------------------ resumen

  nuevaCarrera(): void {
    this.stats.clear();
    this.retosOk = 0;
    this.retosKo = 0;
    this.cancelarReto();
  }

  resumen(puesto: number): ResumenCarrera {
    const todas = Array.from(this.stats.values());
    return {
      puesto,
      acertadas: todas.filter((r) => r.aciertos > 0 && r.fallos === 0),
      falladas: todas.filter((r) => r.fallos > 0),
      retosAcertados: this.retosOk,
      retosFallados: this.retosKo,
    };
  }

  terminarCarrera(puesto: number): { resumen: ResumenCarrera; xp: number } {
    this.cancelarReto();
    const resumen = this.resumen(puesto);
    const xp = Number(this.opciones.onCarreraTerminada?.(resumen) ?? 0) || 0;
    return { resumen, xp };
  }

  dispose(): void {
    this.cancelarReto();
    this.desmontarPuertas();
    window.removeEventListener('keydown', this.onKey);
    for (const u of this.ui) {
      u.raiz.remove();
      u.aviso.remove();
    }
    this.ui = [];
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function ajustar(ctx: CanvasRenderingContext2D, texto: string, maxW: number, tam: number, familia: string, peso = 800): void {
  let s = tam;
  ctx.font = `${peso} ${s}px ${familia}`;
  while (s > 22 && ctx.measureText(texto).width > maxW) {
    s -= 4;
    ctx.font = `${peso} ${s}px ${familia}`;
  }
}

// ------------------------------------------------------------ pórticos: utilidades

const suave = (a: number, b: number, x: number): number => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Geometría no indexada con color por vértice (RGB o RGBA; `alfa(y, z)` en coordenadas locales). */
function conColor(
  g: THREE.BufferGeometry,
  color: THREE.Color,
  tam: 3 | 4,
  alfa?: (y: number, z: number) => number,
): THREE.BufferGeometry {
  const r = g.index ? g.toNonIndexed() : g;
  if (r !== g) g.dispose();
  const pos = r.getAttribute('position');
  const c = new Float32Array(pos.count * tam);
  for (let i = 0; i < pos.count; i++) {
    c[i * tam] = color.r;
    c[i * tam + 1] = color.g;
    c[i * tam + 2] = color.b;
    if (tam === 4) c[i * tam + 3] = alfa ? clamp(alfa(pos.getY(i), pos.getZ(i)), 0, 1) : 1;
  }
  r.setAttribute('color', new THREE.BufferAttribute(c, tam));
  return r;
}

function fusionar(partes: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const g = mergeGeometries(partes, false) ?? new THREE.BufferGeometry();
  for (const p of partes) p.dispose();
  g.computeBoundingSphere();
  return g;
}

/** Ajusta las UV de un plano a una región (px) del atlas (CanvasTexture con flipY). */
function atlasUV(g: THREE.BufferGeometry, x: number, y: number, w: number, h: number): void {
  const uv = g.getAttribute('uv');
  const u0 = x / ATLAS_W;
  const u1 = (x + w) / ATLAS_W;
  const v1 = 1 - y / ATLAS_H;
  const v0 = 1 - (y + h) / ATLAS_H;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, u0 + uv.getX(i) * (u1 - u0), v0 + uv.getY(i) * (v1 - v0));
  uv.needsUpdate = true;
}

const FUENTE_ZH = '"STKaiti","KaiTi","Kaiti SC","Noto Serif SC","Songti SC","PingFang SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif';
const FUENTE_ES = 'system-ui,"Segoe UI",Roboto,Arial,sans-serif';

/** Nube xiangyun dorada (espiral) para las esquinas del estandarte. */
function nube(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, sx: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sx * s, s);
  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.bezierCurveTo(0, 4, 14, -4, 26, 4);
  ctx.bezierCurveTo(36, 11, 30, 24, 21, 22);
  ctx.bezierCurveTo(14, 20, 16, 11, 22, 12);
  ctx.moveTo(0, 18);
  ctx.lineTo(52, 18);
  ctx.moveTo(30, 18);
  ctx.bezierCurveTo(32, 8, 44, 6, 48, 12);
  ctx.stroke();
  ctx.restore();
}

/** Estandarte de laca roja con marco de oro y la palabra en chino (región superior del atlas). */
function pintarEstandarte(ctx: CanvasRenderingContext2D, zh: string): void {
  const W = ATLAS_W;
  const H = ATLAS_BANNER_H;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#8e0f22');
  g.addColorStop(0.55, '#5a0816');
  g.addColorStop(1, '#33040e');
  ctx.fillStyle = g;
  roundRect(ctx, 6, 6, W - 12, H - 12, 18);
  ctx.fill();
  const oro = ctx.createLinearGradient(0, 0, W, H);
  oro.addColorStop(0, '#fff3c4');
  oro.addColorStop(0.25, '#f6c95b');
  oro.addColorStop(0.5, '#9a6416');
  oro.addColorStop(0.75, '#f6c95b');
  oro.addColorStop(1, '#fff3c4');
  ctx.lineWidth = 10;
  ctx.strokeStyle = oro;
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(246,201,91,0.7)';
  roundRect(ctx, 22, 22, W - 44, H - 44, 8);
  ctx.stroke();
  ctx.strokeStyle = '#f6c95b';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  nube(ctx, 34, 40, 1.5, 1);
  nube(ctx, W - 34, 40, 1.5, -1);
  nube(ctx, 34, H - 74, 1.5, 1);
  nube(ctx, W - 34, H - 74, 1.5, -1);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ajustar(ctx, zh, W - 260, 128, FUENTE_ZH, 900);
  ctx.lineJoin = 'round';
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#2a0409';
  ctx.strokeText(zh, W / 2, H / 2 + 6);
  const t = ctx.createLinearGradient(0, H * 0.2, 0, H * 0.85);
  t.addColorStop(0, '#fffbe8');
  t.addColorStop(0.45, '#ffe08a');
  t.addColorStop(0.75, '#f0a92a');
  t.addColorStop(1, '#fff0b5');
  ctx.shadowColor = 'rgba(255,190,70,0.9)';
  ctx.shadowBlur = 18;
  ctx.fillStyle = t;
  ctx.fillText(zh, W / 2, H / 2 + 6);
  ctx.shadowBlur = 0;
}

/** Cartel de un carril: placa de tinta con marco de neón del color del carril y la palabra en español. */
function pintarCartel(ctx: CanvasRenderingContext2D, x0: number, y0: number, texto: string, color: string): void {
  const W = CARTEL_W;
  const H = CARTEL_H;
  ctx.save();
  ctx.translate(x0, y0);
  ctx.beginPath();
  ctx.rect(0, 0, W, H);
  ctx.clip();
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, 'rgba(30,8,20,0.96)');
  g.addColorStop(1, 'rgba(8,4,14,0.96)');
  ctx.fillStyle = g;
  roundRect(ctx, 8, 8, W - 16, H - 16, 26);
  ctx.fill();
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.lineWidth = 9;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  roundRect(ctx, 20, 20, W - 40, H - 40, 16);
  ctx.stroke();
  // rombos del color del carril a los lados
  ctx.fillStyle = color;
  for (const cx of [34, W - 34]) {
    ctx.beginPath();
    ctx.moveTo(cx, H / 2 - 12);
    ctx.lineTo(cx + 9, H / 2);
    ctx.lineTo(cx, H / 2 + 12);
    ctx.lineTo(cx - 9, H / 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ajustar(ctx, texto, W - 110, 78, FUENTE_ES, 900);
  ctx.lineJoin = 'round';
  ctx.lineWidth = 8;
  ctx.strokeStyle = 'rgba(0,0,0,0.85)';
  ctx.strokeText(texto, W / 2, H / 2 + 3);
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(texto, W / 2, H / 2 + 3);
  ctx.restore();
}
