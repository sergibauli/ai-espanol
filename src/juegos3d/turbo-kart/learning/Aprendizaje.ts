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
import type { IKart, ITrack } from '../core/types';
import { clamp, trackDelta, wrap01 } from '../core/math';
import { el } from '../ui/dom';

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

interface Puerta {
  t: number;
  grupo: THREE.Group;
  palabra: Palabra;
  opciones: string[];
  correcta: number;
  carteles: { canvas: HTMLCanvasElement; textura: THREE.CanvasTexture; mesh: THREE.Mesh }[];
  banner: { canvas: HTMLCanvasElement; textura: THREE.CanvasTexture };
  flash: number;
  flashOk: boolean;
}

const COLORES_CARRIL = ['#37e3ff', '#ff4fd8', '#ffc531'];

export class CapaAprendizaje {
  /** La pone Game: escala de tiempo de la simulación (cámara lenta). */
  setTimeScale: (s: number) => void = () => {};
  /** La pone Game: ¿se puede preguntar ahora (carrera en curso)? */
  puedePreguntar: () => boolean = () => true;

  private readonly palabras: Palabra[];
  private readonly banco: Palabra[];
  private cola: Palabra[] = [];
  private readonly stats = new Map<string, ResultadoPalabra>();
  private retosOk = 0;
  private retosKo = 0;

  private readonly raiz: HTMLElement;
  private readonly tarjeta: HTMLElement;
  private readonly enunciado: HTMLElement;
  private readonly pista: HTMLElement;
  private readonly botones: HTMLButtonElement[] = [];
  private readonly barra: HTMLElement;
  private readonly aviso: HTMLElement;
  private readonly avisoZh: HTMLElement;
  private reto: RetoActivo | null = null;

  private puertas: Puerta[] = [];
  private escenaPuertas: THREE.Object3D | null = null;
  private readonly geos: THREE.BufferGeometry[] = [];
  private readonly mats: THREE.Material[] = [];
  private prevT = -1;
  private track: ITrack | null = null;
  private readonly padPrev: boolean[] = [];

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

    // ---- tarjeta del reto (DOM)
    this.raiz = el('div', 'wk-reto oculto', undefined, uiRoot);
    this.tarjeta = el('div', 'wk-reto-tarjeta', undefined, this.raiz);
    el('div', 'wk-reto-kicker', '¡CAJA DE OBJETOS! · 道具箱', this.tarjeta);
    this.enunciado = el('div', 'wk-reto-palabra', '', this.tarjeta);
    this.pista = el('div', 'wk-reto-pista', '', this.tarjeta);
    const fila = el('div', 'wk-reto-opciones', undefined, this.tarjeta);
    for (let i = 0; i < 3; i++) {
      const b = el('button', 'wk-reto-opcion', '', fila);
      b.type = 'button';
      b.addEventListener('pointerdown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.responder(i);
      });
      this.botones.push(b);
    }
    const barraBox = el('div', 'wk-reto-tiempo', undefined, this.tarjeta);
    this.barra = el('div', 'wk-reto-tiempo-barra', undefined, barraBox);
    this.enunciado.addEventListener('pointerdown', (ev) => {
      ev.stopPropagation();
      if (this.reto?.modo === 'audio') this.opciones.decir?.(this.reto.palabra.es);
    });

    // ---- aviso de puerta próxima
    this.aviso = el('div', 'wk-aviso oculto', undefined, uiRoot);
    el('span', 'wk-aviso-kicker', 'PUERTA DE PALABRAS · 单词门', this.aviso);
    this.avisoZh = el('span', 'wk-aviso-zh', '', this.aviso);
    el('span', 'wk-aviso-hint', 'Pasa por el carril correcto · 从正确的车道通过', this.aviso);

    window.addEventListener('keydown', this.onKey);
  }

  get hayPalabras(): boolean {
    return this.palabras.length > 0;
  }

  get retoActivo(): boolean {
    return this.reto !== null;
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

  /** ItemManager → reto al coger una caja. */
  readonly preguntarCaja = (resolver: (ok: boolean) => void): void => {
    if (!this.hayPalabras || !this.puedePreguntar() || this.reto) {
      resolver(!this.reto); // sin palabras / tras la meta: objeto normal
      return;
    }
    const palabra = this.siguientePalabra();
    const n = Math.random() < 0.5 ? 2 : 3;
    const opciones = barajar([palabra.es, ...this.distractores(palabra, n - 1)]);
    const conVoz = this.opciones.conVoz?.() ?? false;
    const modo: 'zh' | 'audio' = conVoz && this.opciones.decir && Math.random() < 0.4 ? 'audio' : 'zh';
    this.reto = {
      palabra,
      opciones,
      correcta: opciones.indexOf(palabra.es),
      restante: TIEMPO_RETO,
      modo,
      resolver,
      respondido: false,
      feedback: 0,
    };
    if (modo === 'audio') {
      this.enunciado.textContent = '🔊';
      this.enunciado.classList.add('audio');
      this.pista.textContent = 'Escucha y elige · 听一听，选一选';
      this.opciones.decir?.(palabra.es);
    } else {
      this.enunciado.textContent = palabra.zh;
      this.enunciado.classList.remove('audio');
      this.pista.textContent = '¿Cómo se dice en español? · 用西班牙语怎么说？';
    }
    this.botones.forEach((b, i) => {
      const txt = opciones[i];
      b.style.display = txt ? '' : 'none';
      b.textContent = txt ? `${i + 1}  ${txt}` : '';
      b.classList.remove('ok', 'ko');
      b.disabled = false;
    });
    this.tarjeta.classList.remove('ok', 'ko');
    this.raiz.classList.remove('oculto');
    this.setTimeScale(CAMARA_LENTA);
  };

  private responder(i: number): void {
    const r = this.reto;
    if (!r || r.respondido) return;
    if (i >= r.opciones.length) return; // i = -1: tiempo agotado
    r.respondido = true;
    const ok = i === r.correcta;
    this.anotar(r.palabra, ok);
    if (ok) this.retosOk++;
    else this.retosKo++;
    this.botones.forEach((b, k) => {
      b.disabled = true;
      if (k === r.correcta) b.classList.add('ok');
      else if (k === i) b.classList.add('ko');
    });
    this.tarjeta.classList.add(ok ? 'ok' : 'ko');
    if (r.modo === 'audio') this.enunciado.textContent = r.palabra.zh;
    this.pista.textContent = ok ? '¡Correcto! Objeto conseguido · 答对了！获得道具' : `${r.palabra.es} = ${r.palabra.zh} · 没有道具`;
    if (ok) this.opciones.decir?.(r.palabra.es);
    r.feedback = TIEMPO_FEEDBACK;
    this.setTimeScale(1);
    r.resolver(ok);
  }

  /** Cancela el reto en curso (salir, reiniciar) sin contarlo. */
  cancelarReto(): void {
    const r = this.reto;
    if (!r) return;
    this.reto = null;
    this.raiz.classList.add('oculto');
    this.setTimeScale(1);
    if (!r.respondido) r.resolver(false);
  }

  private readonly onKey = (e: KeyboardEvent): void => {
    if (!this.reto || this.reto.respondido) return;
    const m = /^(?:Digit|Numpad)([1-3])$/.exec(e.code);
    if (m) {
      e.preventDefault();
      this.responder(Number(m[1]) - 1);
    }
  };

  private leerMando(): void {
    if (typeof navigator === 'undefined' || typeof navigator.getGamepads !== 'function') return;
    let pad: Gamepad | null = null;
    try {
      for (const p of navigator.getGamepads()) if (p && p.connected) { pad = p; break; }
    } catch {
      return;
    }
    if (!pad) return;
    // X → 1, Y → 2, B → 3 (A queda para el derrape)
    const mapa = [2, 3, 1];
    mapa.forEach((idx, opcion) => {
      const now = !!pad?.buttons[idx]?.pressed;
      if (now && !this.padPrev[idx]) this.responder(opcion);
      this.padPrev[idx] = now;
    });
  }

  /** Cada frame (tiempo real, sin cámara lenta). `pausado` congela el reloj. */
  update(dtReal: number, pausado: boolean, jugador: IKart | null): void {
    const r = this.reto;
    if (r && !pausado) {
      if (!r.respondido) {
        this.leerMando();
        r.restante -= dtReal;
        this.barra.style.transform = `scaleX(${clamp(r.restante / TIEMPO_RETO, 0, 1).toFixed(3)})`;
        if (r.restante <= 0) {
          this.responder(-1); // tiempo agotado cuenta como fallo
          this.pista.textContent = `¡Tiempo! ${r.palabra.es} = ${r.palabra.zh} · 时间到！`;
        }
      } else {
        r.feedback -= dtReal;
        if (r.feedback <= 0) {
          this.reto = null;
          this.raiz.classList.add('oculto');
        }
      }
    }
    this.actualizarAviso(jugador);
    for (const p of this.puertas) {
      if (p.flash > 0) {
        p.flash = Math.max(0, p.flash - dtReal);
        const s = 1 + p.flash * 0.25;
        p.carteles[p.correcta].mesh.scale.set(s, s, 1);
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
    this.prevT = -1;
  }

  private crearPuerta(track: ITrack, t: number, raiz: THREE.Group): Puerta {
    const s = track.sample(t);
    const hw = s.halfWidth;
    const grupo = new THREE.Group();
    const m = new THREE.Matrix4().makeBasis(s.binormal, new THREE.Vector3(0, 1, 0), s.tangent.clone().negate());
    grupo.quaternion.setFromRotationMatrix(m);
    grupo.position.copy(s.position);
    raiz.add(grupo);

    const altura = 4.6;
    const metal = this.mat(new THREE.MeshStandardMaterial({ color: 0x2a2f45, roughness: 0.35, metalness: 0.8 }));
    const laca = this.mat(new THREE.MeshStandardMaterial({ color: 0xc8102e, roughness: 0.4, metalness: 0.2, emissive: 0x3a0008 }));
    const poste = this.geo(new THREE.CylinderGeometry(0.22, 0.28, altura, 10));
    for (const lado of [-1, 1]) {
      const p = new THREE.Mesh(poste, laca);
      p.position.set(lado * (hw + 0.7), altura / 2, 0);
      p.castShadow = true;
      grupo.add(p);
    }
    const viga = new THREE.Mesh(this.geo(new THREE.BoxGeometry(hw * 2 + 2.2, 0.32, 0.4)), metal);
    viga.position.y = altura;
    grupo.add(viga);

    // Banner superior con la palabra en chino
    const bc = document.createElement('canvas');
    bc.width = 1024;
    bc.height = 160;
    const bt = new THREE.CanvasTexture(bc);
    bt.colorSpace = THREE.SRGBColorSpace;
    const banner = new THREE.Mesh(
      this.geo(new THREE.PlaneGeometry(Math.min(hw * 2 + 1.6, 12), Math.min(hw * 2 + 1.6, 12) * (160 / 1024))),
      this.mat(new THREE.MeshBasicMaterial({ map: bt, transparent: true, toneMapped: false, side: THREE.DoubleSide })),
    );
    banner.position.y = altura + 1.05;
    grupo.add(banner);

    // Carteles por carril + cortina de luz
    const n = hw * 2 >= 9 ? 3 : 2;
    const ancho = (hw * 2) / n;
    const carteles: Puerta['carteles'] = [];
    const planoCartel = this.geo(new THREE.PlaneGeometry(ancho * 0.92, ancho * 0.92 * 0.3));
    const cortina = this.geo(new THREE.PlaneGeometry(ancho * 0.96, altura - 1.2));
    for (let i = 0; i < n; i++) {
      const x = -hw + (i + 0.5) * ancho;
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 154;
      const tx = new THREE.CanvasTexture(c);
      tx.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        planoCartel,
        this.mat(new THREE.MeshBasicMaterial({ map: tx, transparent: true, toneMapped: false, side: THREE.DoubleSide })),
      );
      mesh.position.set(x, altura - 0.75, 0.05);
      grupo.add(mesh);
      carteles.push({ canvas: c, textura: tx, mesh });
      const luz = new THREE.Mesh(
        cortina,
        this.mat(
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(COLORES_CARRIL[i]),
            transparent: true,
            opacity: 0.13,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
            toneMapped: false,
          }),
        ),
      );
      luz.position.set(x, (altura - 1.2) / 2, 0);
      grupo.add(luz);
    }
    const puerta: Puerta = {
      t,
      grupo,
      palabra: { es: '', zh: '' },
      opciones: [],
      correcta: 0,
      carteles,
      banner: { canvas: bc, textura: bt },
      flash: 0,
      flashOk: false,
    };
    this.rellenarPuerta(puerta);
    return puerta;
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
    p.carteles[p.correcta].mesh.scale.set(1, 1, 1);
    // banner
    const bx = p.banner.canvas.getContext('2d');
    if (bx) {
      const W = p.banner.canvas.width;
      const H = p.banner.canvas.height;
      bx.clearRect(0, 0, W, H);
      bx.fillStyle = 'rgba(16,10,6,0.88)';
      roundRect(bx, 6, 6, W - 12, H - 12, 26);
      bx.fill();
      bx.lineWidth = 8;
      bx.strokeStyle = '#e7b54a';
      bx.stroke();
      bx.fillStyle = '#ffe9a8';
      bx.textAlign = 'center';
      bx.textBaseline = 'middle';
      ajustar(bx, palabra.zh, W - 80, 96, '"PingFang SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif');
      bx.fillText(palabra.zh, W / 2, H / 2 + 4);
      p.banner.textura.needsUpdate = true;
    }
    p.carteles.forEach((c, i) => {
      const x = c.canvas.getContext('2d');
      if (!x) return;
      const W = c.canvas.width;
      const H = c.canvas.height;
      x.clearRect(0, 0, W, H);
      x.fillStyle = 'rgba(10,12,28,0.9)';
      roundRect(x, 4, 4, W - 8, H - 8, 22);
      x.fill();
      x.lineWidth = 8;
      x.strokeStyle = COLORES_CARRIL[i];
      x.stroke();
      x.fillStyle = '#ffffff';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      ajustar(x, opciones[i], W - 40, 64, 'system-ui,"Segoe UI",Arial,sans-serif');
      x.fillText(opciones[i], W / 2, H / 2 + 2);
      c.textura.needsUpdate = true;
    });
  }

  /** Paso fijo: detecta el cruce del jugador por una puerta. */
  revisarPuertas(jugador: IKart): void {
    const track = this.track;
    if (!track || !this.puertas.length) return;
    const st = jugador.state;
    const t = st.trackT;
    if (this.prevT < 0 || st.isFrozen) {
      this.prevT = t;
      return;
    }
    const avance = trackDelta(this.prevT, t);
    if (avance > 0 && avance < 0.05 && !st.finished) {
      for (const p of this.puertas) {
        const d = trackDelta(this.prevT, p.t);
        if (d >= 0 && d < avance) this.cruzar(p, jugador, track);
      }
    }
    this.prevT = t;
  }

  private cruzar(p: Puerta, jugador: IKart, track: ITrack): void {
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
      this.opciones.decir?.(p.palabra.es);
      this.flashTexto(`¡${p.palabra.es}! TURBO · 加速`, true);
    } else {
      this.retosKo++;
      this.flashTexto(`${p.palabra.zh} = ${p.palabra.es}`, false);
    }
    p.flash = 0.8;
    p.flashOk = ok;
    // Nueva palabra para la próxima vuelta (cuando ya no se vea).
    window.setTimeout(() => {
      if (this.puertas.includes(p)) this.rellenarPuerta(p);
    }, 1500);
  }

  private flashTexto(texto: string, ok: boolean): void {
    const n = el('div', `wk-flash ${ok ? 'ok' : 'ko'}`, texto, this.aviso.parentElement);
    window.setTimeout(() => n.remove(), 1600);
  }

  private actualizarAviso(jugador: IKart | null): void {
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
      if (this.avisoZh.textContent !== mostrar.palabra.zh) this.avisoZh.textContent = mostrar.palabra.zh;
      this.aviso.classList.remove('oculto');
    } else {
      this.aviso.classList.add('oculto');
    }
  }

  desmontarPuertas(): void {
    this.escenaPuertas?.removeFromParent();
    this.escenaPuertas = null;
    for (const p of this.puertas) {
      p.banner.textura.dispose();
      for (const c of p.carteles) c.textura.dispose();
    }
    this.puertas = [];
    for (const g of this.geos) g.dispose();
    for (const m of this.mats) m.dispose();
    this.geos.length = 0;
    this.mats.length = 0;
    this.track = null;
    this.aviso.classList.add('oculto');
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
    this.raiz.remove();
    this.aviso.remove();
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

function ajustar(ctx: CanvasRenderingContext2D, texto: string, maxW: number, tam: number, familia: string): void {
  let s = tam;
  ctx.font = `800 ${s}px ${familia}`;
  while (s > 22 && ctx.measureText(texto).width > maxW) {
    s -= 4;
    ctx.font = `800 ${s}px ${familia}`;
  }
}
