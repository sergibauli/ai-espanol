/**
 * Game: owns the renderer, scene, camera, lights, fixed-step loop and the
 * state machine. This is the only module allowed to import other workstreams'
 * concrete classes; everything is typed against the core interfaces.
 */
import * as THREE from 'three';
import type {
  CharacterDef,
  Difficulty,
  GameState,
  IAIDriver,
  IAudioEngine,
  IItemManager,
  IKart,
  InputState,
  IParticleSystem,
  IPostFX,
  ITrack,
  MusicTrack,
  RaceSettings,
  TrackDefinition,
} from '../core/types';
import { createEmptyInput } from '../core/types';
import { events } from '../core/events';
import { COUNTDOWN_STEP_SECONDS, FIXED_DT, KART_COUNT, MAX_FRAME_DT } from '../core/constants';
import { clamp, clamp01, damp } from '../core/math';

import { Kart } from '../kart/Kart';
import { InputManager } from '../kart/InputManager';
import { CHARACTERS, getCharacter } from '../kart/roster';
import { Track } from '../track/Track';
import { TRACKS, getTrackDef } from '../track/tracks';
import { ItemManager } from '../items/ItemManager';
import { buildItemIcon } from '../items/itemVisuals';
import { AIDriver } from '../ai/AIDriver';
import { AudioEngine } from '../audio/AudioEngine';
import { ParticleSystem } from '../fx/ParticleSystem';
import { PostFX } from '../fx/PostFX';

import { RaceManager } from './RaceManager';
import { FollowCamera } from './FollowCamera';
import { MenuBackdrop } from './MenuBackdrop';
import type { MenuFraming } from './MenuBackdrop';
import { HUD } from '../ui/HUD';
import { MainMenu } from '../ui/MainMenu';
import type { MenuPanel } from '../ui/MainMenu';
import { ResultsScreen } from '../ui/ResultsScreen';
import { PauseMenu } from '../ui/PauseMenu';
import { LoadingScreen } from '../ui/LoadingScreen';
import { el } from '../ui/dom';
import { disposeToasts, showToast } from '../ui/toast';
import { TouchControls } from '../ui/TouchControls';
import { CapaAprendizaje, type OpcionesAprendizaje } from '../learning/Aprendizaje';
import { CiudadDragon } from '../wukong/CiudadDragon';
import { CircuitosImperiales } from '../wukong/CircuitosImperiales';
import { EntradaJugador } from '../kart/EntradaJugador';

/** Wukong: un jugador más en pantalla partida (el jugador 1 usa los campos de siempre). */
interface JugadorExtra {
  kart: IKart;
  camera: THREE.PerspectiveCamera;
  follow: FollowCamera;
  hud: HUD;
  auto: IAIDriver | null;
}

const COLORES_JUGADOR = ['#ff3a4f', '#3ad1ff', '#7cff6b', '#ffd23f'];

const MIN_LOADING_SECONDS = 0.8;
/** Give up waiting for async shader compilation after this long and just go. */
const MAX_COMPILE_WAIT_SECONDS = 8;
const RESULTS_DELAY_SECONDS = 1.6;
const MAX_STEPS_PER_FRAME = 8;
const SUN_DISTANCE = 90;
const SHADOW_HALF_EXTENT = 30;
const EMPTY_KARTS: readonly IKart[] = [];

function framingFor(panel: MenuPanel): MenuFraming {
  return panel === 'characterSelect' ? 'characters' : panel === 'trackSelect' ? 'tracks' : 'title';
}

interface PartialRace {
  track: ITrack | null;
  karts: IKart[];
  items: IItemManager | null;
  followCamera: FollowCamera | null;
  hud: HUD | null;
}

interface RaceContext {
  settings: RaceSettings;
  trackDef: TrackDefinition;
  track: ITrack;
  karts: IKart[];
  aiDrivers: IAIDriver[];
  playerAutoDriver: IAIDriver | null;
  items: IItemManager;
  raceManager: RaceManager;
  followCamera: FollowCamera;
  hud: HUD;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  /** Soft camera-following fill so karts read on dark tracks (0 intensity on bright ones). */
  fill: THREE.DirectionalLight;
  fog: THREE.FogExp2 | null;
  background: THREE.Color;
  unsubs: (() => void)[];
  resultsTimer: number;
  /** Wukong: capa visual de la Ciudad del Dragón. */
  ciudad: CiudadDragon | null;
  /** Wukong: decorado de los circuitos imperiales (bambú, volcán, templo de jade). */
  imperial: CircuitosImperiales | null;
  /** Wukong · pantalla partida: nº de jugadores humanos (karts 0..n-1). */
  humanos: number;
  extra: JugadorExtra[];
  entradas: EntradaJugador[];
  entradasEstado: InputState[];
  usoPendiente: boolean[];
  cuadrantes: HTMLElement[];
  /** Con 3 jugadores, el cuarto cuadrante muestra una vista aérea del líder. */
  vista: THREE.PerspectiveCamera | null;
}

export class Game {
  private readonly container: HTMLElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly uiRoot: HTMLElement;

  private readonly input: InputManager;
  private readonly audio: IAudioEngine;
  private readonly particles: IParticleSystem;
  private readonly postfx: IPostFX;
  private postfxOk = true;

  private readonly backdrop: MenuBackdrop;
  private readonly mainMenu: MainMenu;
  private readonly results: ResultsScreen;
  private readonly pauseMenu: PauseMenu;
  private readonly loading: LoadingScreen;
  private readonly muteIndicator: HTMLElement;

  private state: GameState = 'boot';
  private prePauseState: GameState = 'racing';
  private race: RaceContext | null = null;
  private pendingSettings: RaceSettings | null = null;
  private loadingElapsed = 0;
  private loadingFrames = 0;
  private loadingProgress = 0;
  private shadersReady = false;

  private rafId = 0;
  private lastTime = -1;
  private elapsed = 0;
  private accumulator = 0;
  private pendingUseItem = false;
  private currentMusic: MusicTrack = 'none';
  private audioStarted = false;
  private disposed = false;

  private readonly playerInput: InputState = createEmptyInput();
  private readonly unsubs: (() => void)[] = [];
  private readonly sunDir = new THREE.Vector3(0.4, 0.8, 0.3);
  private readonly tmpA = new THREE.Vector3();
  private readonly tmpB = new THREE.Vector3();
  private readonly tmpC = new THREE.Vector3();
  private speedFx = 0;
  private boostFx = 0;
  private hitFx = 0;

  // Wukong Español: learning layer, slow motion, touch controls, adaptive quality.
  private readonly capa: CapaAprendizaje;
  private readonly touchControls: TouchControls | null;
  private timeScale = 1;
  private maxFrameDt = MAX_FRAME_DT;
  private maxSteps = MAX_STEPS_PER_FRAME;
  private adaptive = true;
  private readonly mobile: boolean;
  private readonly tactil: boolean;
  private maxPixelRatio: number;
  private pixelRatio: number;
  private fpsTime = 0;
  private fpsFrames = 0;
  private slowWindows = 0;
  private fastWindows = 0;

  constructor(container: HTMLElement, aprendizaje: OpcionesAprendizaje = { palabras: [] }) {
    this.container = container;
    this.tactil = TouchControls.esTactil();
    this.mobile = this.tactil || Math.min(window.innerWidth, window.innerHeight) < 600;
    this.maxPixelRatio = Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 2);
    this.pixelRatio = this.mobile ? Math.min(this.maxPixelRatio, 1.25) : this.maxPixelRatio;

    // ---------------------------------------------------------- renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: !this.mobile, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(this.pixelRatio);
    if (import.meta.env.DEV && new URLSearchParams(location.search).has('sim')) {
      // Dev-only: lets slow software renderers (automated tests) simulate in real time.
      this.maxFrameDt = 0.5;
      this.maxSteps = 80;
      this.adaptive = false;
    }
    this.renderer.domElement.className = 'game-canvas';
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1200);
    this.camera.position.set(0, 3, 8);
    this.scene.add(this.camera);

    this.uiRoot = el('div', '', undefined, container);
    this.uiRoot.id = 'ui';

    // ---------------------------------------------------------- systems
    this.input = new InputManager();
    this.audio = new AudioEngine();
    this.particles = new ParticleSystem();
    this.scene.add(this.particles.object);
    this.postfx = new PostFX();
    try {
      this.postfx.init(this.renderer, this.scene, this.camera);
    } catch (err) {
      console.error('[Game] PostFX init failed, using plain rendering', err);
      this.postfxOk = false;
    }

    // ---------------------------------------------------------- ui
    this.backdrop = new MenuBackdrop();
    this.backdrop.setArte('characters', './turbo-kart/fondo-pilotos.webp');
    this.backdrop.setArte('tracks', './turbo-kart/fondo-circuitos.webp');
    this.mainMenu = new MainMenu(this.uiRoot, CHARACTERS as readonly CharacterDef[], TRACKS as readonly TrackDefinition[]);
    this.mainMenu.onHighlight = (id) => this.backdrop.setCharacter(getCharacter(id));
    this.mainMenu.onPanelChange = (panel) => this.onMenuPanel(panel);
    this.mainMenu.onStart = (settings) => this.startRace(settings);

    this.results = new ResultsScreen(this.uiRoot);
    this.results.onRaceAgain = () => {
      if (this.race) this.startRace(this.race.settings);
    };
    this.results.onChangeTrack = () => this.returnToMenu('trackSelect');
    this.results.onMainMenu = () => this.returnToMenu('title');

    this.pauseMenu = new PauseMenu(this.uiRoot);
    this.pauseMenu.onResume = () => this.resume();
    this.pauseMenu.onRestart = () => {
      const settings = this.race?.settings;
      this.leavePause();
      if (settings) this.startRace(settings);
      else this.returnToMenu('title');
    };
    this.pauseMenu.onQuit = () => {
      this.leavePause();
      this.returnToMenu('title');
    };

    this.loading = new LoadingScreen(this.uiRoot);
    this.capa = new CapaAprendizaje(this.uiRoot, aprendizaje);
    this.capa.setTimeScale = (v) => {
      this.timeScale = v;
    };
    this.capa.puedePreguntar = (j) => this.state === 'racing' && !!this.race && !!this.race.karts[j] && !this.race.karts[j].state.finished;
    this.touchControls = this.tactil ? new TouchControls(this.uiRoot, this.input.touch) : null;
    this.uiRoot.classList.toggle('tactil', this.tactil);
    this.muteIndicator = el('div', 'mute-indicator', '🔇 SILENCIO · 静音', this.uiRoot);

    // ---------------------------------------------------------- listeners
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('pointerdown', this.onGesture, { passive: true });
    window.addEventListener('keydown', this.onGesture);
    window.addEventListener('blur', this.onBlur);
    document.addEventListener('visibilitychange', this.onVisibility);

    this.onResize();
  }

  // ------------------------------------------------------------------ public

  start(): void {
    if (this.state !== 'boot') return;
    this.showMenu('title');
    this.lastTime = -1;
    this.rafId = requestAnimationFrame(this.loop);
  }

  get currentState(): GameState {
    return this.state;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('pointerdown', this.onGesture);
    window.removeEventListener('keydown', this.onGesture);
    window.removeEventListener('blur', this.onBlur);
    document.removeEventListener('visibilitychange', this.onVisibility);
    for (const u of this.unsubs) u();
    this.unsubs.length = 0;
    this.disposeRace();
    this.backdrop.detach(this.scene);
    this.backdrop.dispose();
    this.mainMenu.dispose();
    this.results.dispose();
    this.pauseMenu.dispose();
    this.loading.dispose();
    this.muteIndicator.remove();
    this.capa.dispose();
    this.touchControls?.dispose();
    this.input.dispose();
    this.safe(() => this.audio.dispose());
    this.safe(() => this.particles.dispose());
    this.safe(() => this.postfx.dispose());
    this.renderer.renderLists.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
    this.uiRoot.remove();
    disposeToasts();
    events.clear();
  }

  // ------------------------------------------------------------- main loop

  private readonly loop = (now: number): void => {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(this.loop);
    if (this.lastTime < 0) this.lastTime = now;
    let dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (dt > this.maxFrameDt) dt = this.maxFrameDt;
    if (dt < 0) dt = 0;
    this.elapsed += dt;
    this.adaptQuality(dt);

    const input = this.input.update();
    try {
      this.capa.update(dt, this.state === 'paused', this.race ? this.race.karts.slice(0, this.race.humanos) : []);
      this.frame(dt, input);
    } catch (err) {
      console.error('[Game] frame error', err);
      events.emit('ui:error', {});
    }
  };

  private frame(dt: number, input: InputState): void {
    switch (this.state) {
      case 'boot':
        return;
      case 'title':
      case 'characterSelect':
      case 'trackSelect':
        this.mainMenu.handleInput(input);
        this.backdrop.update(dt, this.camera);
        this.particles.update(dt, EMPTY_KARTS, this.camera);
        this.audio.update(dt, EMPTY_KARTS, -1, this.camera);
        this.render(dt);
        return;
      case 'loading':
        this.frameLoading(dt);
        return;
      case 'countdown':
      case 'racing':
      case 'finished': {
        const pausaExtra = this.leerEntradas();
        if (input.pause || pausaExtra) {
          this.pause();
          this.render(dt);
          return;
        }
        const sdt = dt * this.timeScale;
        this.simulate(sdt, input);
        this.renderRace(sdt, this.state === 'racing' && input.lookBack);
        return;
      }
      case 'paused':
        this.pauseMenu.handleInput(input);
        if (input.pause && this.state === 'paused') this.resume();
        this.render(dt);
        return;
      case 'results':
        this.results.handleInput(input);
        if (this.race && this.state === 'results') {
          // Keep the world alive behind the results panel.
          this.simulate(dt, input);
          this.renderRace(dt, false);
        } else {
          this.render(dt);
        }
        return;
    }
  }

  private frameLoading(dt: number): void {
    this.loading.update(dt);
    this.loadingElapsed += dt;
    this.loadingFrames++;
    // Give the loading screen a frame to paint before the synchronous build.
    if (!this.race && this.loadingFrames >= 2 && this.pendingSettings) {
      const settings = this.pendingSettings;
      try {
        this.buildRace(settings);
      } catch (err) {
        console.error('[Game] failed to build race', err);
        showToast('No se pudo preparar la carrera · 无法创建比赛', 'error');
        this.pendingSettings = null;
        this.loading.hide();
        this.showMenu('title');
        return;
      }
      this.warmShaders();
    }

    // Fake progress creeps toward 90% while shaders compile off-thread, then snaps to 100%.
    const ready = this.race !== null && (this.shadersReady || this.loadingElapsed > MAX_COMPILE_WAIT_SECONDS);
    const target = !this.race ? 0.12 : ready ? 1 : 0.9;
    this.loadingProgress = damp(this.loadingProgress, target, ready ? 14 : 1.4, dt);
    this.loading.setProgress(this.loadingProgress);

    if (this.race && ready) {
      // Warm the remaining passes (shadow depth, post-processing) behind the overlay.
      this.renderRace(dt, false);
      if (this.loadingElapsed >= MIN_LOADING_SECONDS && this.loadingProgress > 0.985) this.enterCountdown();
    }
  }

  /** Kick off parallel shader compilation for the freshly built race scene. */
  private warmShaders(): void {
    const r = this.race;
    this.shadersReady = false;
    if (!r) return;
    const renderer = this.renderer as { compileAsync?: (s: THREE.Object3D, c: THREE.Camera) => Promise<unknown> };
    if (typeof renderer.compileAsync !== 'function') {
      this.shadersReady = true;
      return;
    }
    let promise: Promise<unknown>;
    try {
      promise = renderer.compileAsync.call(this.renderer, this.scene, this.camera);
    } catch (err) {
      console.warn('[Game] compileAsync threw; falling back to synchronous compile', err);
      this.shadersReady = true;
      return;
    }
    const done = (): void => {
      if (this.race === r) this.shadersReady = true;
    };
    promise.then(done, (err: unknown) => {
      console.warn('[Game] compileAsync failed; falling back to synchronous compile', err);
      done();
    });
  }

  private simulate(dt: number, input: InputState): void {
    const r = this.race;
    if (!r) return;
    if (input.useItem) this.pendingUseItem = true;
    this.accumulator += dt;
    let steps = 0;
    while (this.accumulator >= FIXED_DT && steps < this.maxSteps) {
      this.step(FIXED_DT, r, input, this.pendingUseItem);
      this.pendingUseItem = false;
      this.accumulator -= FIXED_DT;
      steps++;
    }
    if (steps >= this.maxSteps) this.accumulator = 0;
  }

  private step(dt: number, r: RaceContext, input: InputState, useItem: boolean): void {
    const { track, karts, items } = r;
    const player = karts[0];

    // Player input (or auto-drive after finishing).
    if (r.playerAutoDriver) {
      r.playerAutoDriver.update(dt, track, karts, items, null);
    } else if (r.humanos > 1) {
      this.aplicarEntrada(r, 0, player);
    } else {
      const p = this.playerInput;
      p.throttle = input.throttle;
      p.brake = input.brake;
      p.steer = input.steer;
      p.drift = input.drift;
      p.useItem = useItem;
      p.useItemHeld = input.useItemHeld;
      p.lookBack = input.lookBack;
      p.pause = false;
      p.confirm = false;
      p.back = false;
      p.menuUp = false;
      p.menuDown = false;
      p.menuLeft = false;
      p.menuRight = false;
      player.setInput(p);
    }

    for (let j = 0; j < r.extra.length; j++) {
      const x = r.extra[j];
      if (x.auto) x.auto.update(dt, track, karts, items, null);
      else this.aplicarEntrada(r, j + 1, x.kart);
    }

    for (let i = 0; i < r.aiDrivers.length; i++) {
      r.aiDrivers[i].update(dt, track, karts, items, player);
    }

    for (let i = 0; i < karts.length; i++) {
      karts[i].update(dt, track, karts);
    }
    for (let j = 0; j < r.humanos; j++) this.capa.revisarPuertas(karts[j], j);

    for (let i = 0; i < karts.length; i++) {
      const k = karts[i];
      const inp = k.input;
      if (inp.useItem && !k.state.itemRouletteActive && k.state.item !== 'none') {
        items.requestUse(k, inp.brake > 0.5 || inp.lookBack);
      }
    }

    items.update(dt);
    r.raceManager.update(dt);
  }

  private renderRace(dt: number, lookBack: boolean): void {
    const r = this.race;
    if (!r) {
      this.render(dt);
      return;
    }
    const player = r.karts[0];
    for (let i = 0; i < r.karts.length; i++) r.karts[i].updateVisuals(dt);
    r.track.update(dt, this.elapsed);
    if (r.ciudad) this.safe(() => r.ciudad?.update(dt, player.state.position, this.camera));
    if (r.imperial) this.safe(() => r.imperial?.update(dt));
    r.followCamera.update(dt, player, r.humanos > 1 ? (r.entradasEstado[0]?.lookBack ?? false) && this.state === 'racing' : lookBack);
    for (let j = 0; j < r.extra.length; j++) {
      const x = r.extra[j];
      x.follow.update(dt, x.kart, (r.entradasEstado[j + 1]?.lookBack ?? false) && this.state === 'racing');
      x.hud.update(dt, x.kart, r.karts, r.raceManager.raceTime, r.raceManager.totalLaps);
    }
    if (r.vista) this.actualizarVista(r, dt);
    this.updateSun(r, player);
    this.particles.update(dt, r.karts, this.camera);
    this.audio.update(dt, r.karts, player.state.id, this.camera);
    r.hud.update(dt, player, r.karts, r.raceManager.raceTime, r.raceManager.totalLaps);
    this.updatePostFxFeel(dt, player);

    if (this.state === 'finished' && r.resultsTimer > 0) {
      r.resultsTimer -= dt;
      if (r.resultsTimer <= 0) this.enterResults();
    }
    this.render(dt);
  }

  private render(dt: number): void {
    const r = this.race;
    if (r && r.humanos > 1 && this.state !== 'loading') {
      this.renderPartido(r);
      return;
    }
    if (this.postfxOk) {
      try {
        this.postfx.render(dt);
        return;
      } catch (err) {
        console.error('[Game] PostFX render failed; falling back to plain rendering', err);
        this.postfxOk = false;
        this.safe(() => this.postfx.setEnabled(false));
      }
    }
    this.renderer.render(this.scene, this.camera);
  }

  private updateSun(r: RaceContext, player: IKart): void {
    const p = player.state.position;
    // Snap the shadow frustum to a coarse grid to avoid edge shimmer while driving.
    const snap = 2;
    this.tmpA.set(Math.round(p.x / snap) * snap, Math.round(p.y / snap) * snap, Math.round(p.z / snap) * snap);
    r.sun.target.position.copy(this.tmpA);
    r.sun.position.copy(this.tmpA).addScaledVector(this.sunDir, SUN_DISTANCE);

    // Fill light shines from just above the camera toward the player kart.
    if (r.fill.visible) {
      r.fill.position.copy(this.camera.position);
      r.fill.position.y += 2;
      r.fill.target.position.copy(p);
    }
  }

  private updatePostFxFeel(dt: number, player: IKart): void {
    if (!this.postfxOk) return;
    const s = player.state;
    const top = Math.max(1, player.topSpeed());
    const speedTarget = clamp01((Math.abs(s.speed) - top * 0.55) / (top * 0.9));
    const boostTarget = s.isBoosting ? clamp01(0.45 + s.boostStrength) : s.isInvincible ? 0.35 : 0;
    this.speedFx = damp(this.speedFx, speedTarget, 5, dt);
    this.boostFx = damp(this.boostFx, boostTarget, s.isBoosting ? 12 : 4, dt);
    if (this.hitFx > 0) {
      this.hitFx = damp(this.hitFx, 0, 3, dt);
      if (this.hitFx < 0.005) this.hitFx = 0;
    }
    this.postfx.setSpeedEffect(this.speedFx);
    this.postfx.setBoostEffect(this.boostFx);
    this.postfx.setHitEffect(this.hitFx);
  }

  // ------------------------------------------------------------ state flow

  private setState(next: GameState): void {
    if (next === this.state) return;
    const from = this.state;
    this.state = next;
    this.uiRoot.dataset.state = next;
    this.touchControls?.setVisible(next === 'countdown' || next === 'racing' || next === 'finished');
    events.emit('game:stateChange', { from, to: next });
  }

  private showMenu(panel: MenuPanel): void {
    this.results.hide();
    this.pauseMenu.hide();
    this.loading.hide();
    this.backdrop.setCharacter(this.mainMenu.highlightedCharacter);
    this.backdrop.setFraming(framingFor(panel), true);
    this.backdrop.attach(this.scene, this.camera, this.renderer);
    this.mainMenu.show(panel);
    this.setState(panel);
    this.playMusic('menu');
  }

  private onMenuPanel(panel: MenuPanel): void {
    if (this.state === 'title' || this.state === 'characterSelect' || this.state === 'trackSelect') {
      this.setState(panel);
      this.backdrop.setFraming(framingFor(panel));
    }
  }

  private returnToMenu(panel: MenuPanel): void {
    this.disposeRace();
    this.showMenu(panel);
  }

  private startRace(settings: RaceSettings): void {
    this.disposeRace();
    this.backdrop.detach(this.scene);
    this.mainMenu.hide();
    this.results.hide();
    this.pauseMenu.hide();
    this.safe(() => this.particles.reset());

    let trackDef: TrackDefinition;
    try {
      trackDef = getTrackDef(settings.trackId) as TrackDefinition;
    } catch {
      trackDef = TRACKS[0] as TrackDefinition;
    }
    if (!trackDef) {
      showToast('No hay circuitos · 没有赛道', 'error');
      this.showMenu('title');
      return;
    }
    this.pendingSettings = { ...settings, trackId: trackDef.id };
    if (import.meta.env.DEV) {
      // Dev-only: `?laps=N` shortens races for automated tests.
      const laps = Number(new URLSearchParams(location.search).get('laps'));
      if (laps > 0) this.pendingSettings.laps = laps;
    }
    this.loadingElapsed = 0;
    this.loadingFrames = 0;
    this.loadingProgress = 0;
    this.shadersReady = false;
    this.loading.show(trackDef);
    this.scene.background = new THREE.Color(0x0b0b1a);
    this.scene.fog = null;
    this.setState('loading');
  }

  private buildRace(settings: RaceSettings): void {
    // Partially constructed pieces, cleaned up if a later constructor throws.
    const partial: PartialRace = { track: null, karts: [], items: null, followCamera: null, hud: null };
    try {
      this.buildRaceInner(settings, partial);
    } catch (err) {
      const { hud, followCamera, items, karts, track } = partial;
      if (hud) this.safe(() => hud.dispose());
      if (followCamera) this.safe(() => followCamera.dispose());
      if (items) this.safe(() => items.dispose());
      for (const k of karts) this.safe(() => k.dispose());
      if (track) this.safe(() => track.dispose());
      throw err;
    }
  }

  private buildRaceInner(settings: RaceSettings, partial: PartialRace): void {
    const trackDef = getTrackDef(settings.trackId) as TrackDefinition;
    const track: ITrack = new Track(trackDef);
    partial.track = track;
    const env = trackDef.environment;
    const karts = partial.karts;

    // Karts: player 0 with the chosen character, AI 1..7 with the rest shuffled.
    let playerChar: CharacterDef;
    try {
      playerChar = getCharacter(settings.characterId) as CharacterDef;
    } catch {
      playerChar = CHARACTERS[0] as CharacterDef;
    }
    const others = (CHARACTERS as readonly CharacterDef[]).filter((c) => c.id !== playerChar.id);
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = others[i];
      others[i] = others[j];
      others[j] = t;
    }
    // Wukong: pantalla partida (2–4 jugadores humanos, solo con teclado/mandos).
    const humanos = this.tactil ? 1 : Math.max(1, Math.min(4, Math.round(settings.jugadores ?? 1)));
    karts.push(new Kart(0, playerChar, true));
    for (let id = 1; id < KART_COUNT; id++) {
      const def = others.length > 0 ? others[(id - 1) % others.length] : playerChar;
      karts.push(new Kart(id, def, id < humanos));
    }

    const difficulty: Difficulty = settings.difficulty;
    const aiDrivers: IAIDriver[] = [];
    for (let id = humanos; id < karts.length; id++) {
      aiDrivers.push(new AIDriver(karts[id], difficulty, id));
    }

    const itemManager = new ItemManager(this.particles);
    itemManager.playerQuiz = this.capa.preguntarCaja;
    const items: IItemManager = itemManager;
    partial.items = items;
    items.init(track, karts);

    const raceManager = new RaceManager(track, karts, settings);
    const followCamera = new FollowCamera(this.camera);
    partial.followCamera = followCamera;
    followCamera.setTrack(track);

    // Cuadrantes de la pantalla partida (2 = arriba/abajo, 3–4 = rejilla 2 × 2).
    const cuadrantes: HTMLElement[] = [];
    if (humanos > 1) {
      this.uiRoot.classList.add('wk-split', `wk-split-${humanos}`);
      for (let i = 0; i < humanos; i++) cuadrantes.push(el('div', `wk-cuadrante wk-q${i}`, undefined, this.uiRoot));
      if (humanos === 3) {
        const v = el('div', 'wk-cuadrante wk-q3 wk-vista', undefined, this.uiRoot);
        el('div', 'wk-vista-titulo', 'VISTA DEL LÍDER · 领先者视角', v);
        cuadrantes.push(v);
      }
      this.capa.configurarJugadores(cuadrantes.slice(0, humanos));
    } else {
      this.capa.configurarJugadores([this.uiRoot]);
    }
    const ajusteSplit = { distancia: 6, altura: 3, mirarArriba: 1.1, fovMin: 60, fovMax: 68 };
    if (humanos > 1) followCamera.configurar(ajusteSplit);

    const hud = new HUD(humanos > 1 ? cuadrantes[0] : this.uiRoot, buildItemIcon);
    partial.hud = hud;
    hud.setTrack(track);
    if (humanos > 1) hud.setJugador(0, COLORES_JUGADOR[0]);
    const extra: JugadorExtra[] = [];
    for (let j = 1; j < humanos; j++) {
      const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 1200);
      const follow = new FollowCamera(cam);
      follow.setTrack(track);
      follow.configurar(ajusteSplit);
      const h = new HUD(cuadrantes[j], buildItemIcon);
      h.setTrack(track);
      h.setJugador(j, COLORES_JUGADOR[j]);
      extra.push({ kart: karts[j], camera: cam, follow, hud: h, auto: null });
    }
    const entradas: EntradaJugador[] = [];
    if (humanos > 1) for (let j = 0; j < humanos; j++) entradas.push(new EntradaJugador(j));

    // Lights from the track environment.
    const sun = new THREE.DirectionalLight(env.sunColor, env.sunIntensity);
    sun.castShadow = humanos === 1;
    sun.shadow.mapSize.set(this.mobile ? 1024 : 2048, this.mobile ? 1024 : 2048);
    const sc = sun.shadow.camera;
    sc.left = -SHADOW_HALF_EXTENT;
    sc.right = SHADOW_HALF_EXTENT;
    sc.top = SHADOW_HALF_EXTENT;
    sc.bottom = -SHADOW_HALF_EXTENT;
    sc.near = 1;
    sc.far = SUN_DISTANCE + SHADOW_HALF_EXTENT * 3;
    sc.updateProjectionMatrix();
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.03;
    this.sunDir.set(env.sunDirection.x, env.sunDirection.y, env.sunDirection.z);
    if (this.sunDir.lengthSq() < 1e-6) this.sunDir.set(0.4, 0.8, 0.3);
    if (this.sunDir.y < 0) this.sunDir.y = -this.sunDir.y;
    if (this.sunDir.y < 0.15) this.sunDir.y = 0.15;
    this.sunDir.normalize();
    const hemi = new THREE.HemisphereLight(env.ambientSky, env.ambientGround, env.ambientIntensity);
    // Camera-following fill: strong on dim night tracks, zero on sunny ones.
    const darkness =
      clamp(0.9 - env.ambientIntensity, 0, 0.6) + clamp((1.6 - env.sunIntensity) * 0.3, 0, 0.3);
    const fill = new THREE.DirectionalLight(0xd9e4ff, darkness);
    fill.castShadow = false;
    fill.visible = darkness > 0.01;
    const fog = env.fogDensity > 0 ? new THREE.FogExp2(env.fogColor, env.fogDensity) : null;
    const background = new THREE.Color(env.skyHorizon);

    this.scene.add(track.object);
    for (const k of karts) this.scene.add(k.object);
    this.scene.add(items.object);
    this.scene.add(sun, sun.target, hemi, fill, fill.target);
    this.scene.fog = fog;
    this.scene.background = background;
    this.capa.nuevaCarrera();
    this.capa.montarPuertas(track, this.scene);

    const r: RaceContext = {
      settings,
      trackDef,
      track,
      karts,
      aiDrivers,
      playerAutoDriver: null,
      items,
      raceManager,
      followCamera,
      hud,
      sun,
      hemi,
      fill,
      fog,
      background,
      unsubs: [],
      resultsTimer: 0,
      ciudad: null,
      imperial: null,
      humanos,
      extra,
      entradas,
      entradasEstado: entradas.map(() => createEmptyInput()),
      usoPendiente: entradas.map(() => false),
      cuadrantes,
      vista: humanos === 3 ? new THREE.PerspectiveCamera(55, 1, 0.1, 1500) : null,
    };
    try {
      r.imperial = new CircuitosImperiales(track);
      this.scene.add(r.imperial.object);
    } catch (err) {
      console.error('[Game] circuitos imperiales', err);
    }
    try {
      r.ciudad = new CiudadDragon(track, karts);
      this.scene.add(r.ciudad.object);
    } catch (err) {
      console.error('[Game] Ciudad del Dragón', err);
    }
    this.race = r;
    this.accumulator = 0;
    this.pendingUseItem = false;
    this.speedFx = 0;
    this.boostFx = 0;
    this.hitFx = 0;

    if (import.meta.env.DEV) {
      // Dev-only: `?auto=1` lets the AI drive the player for soak testing.
      if (new URLSearchParams(location.search).has('auto')) {
        r.playerAutoDriver = new AIDriver(karts[0], 'hard', 0);
        for (const x of r.extra) x.auto = new AIDriver(x.kart, 'hard', x.kart.state.id);
      }
      (window as unknown as { __tkr?: unknown }).__tkr = {
        game: this,
        getRace: () => this.race,
        renderer: this.renderer,
        events,
      };
    }

    // Sync visuals once so the first rendered frame is sane.
    for (const k of karts) k.updateVisuals(0);
    followCamera.snapTo(karts[0]);
    for (const x of extra) x.follow.snapTo(x.kart);
    this.updateSun(r, karts[0]);

    r.unsubs.push(
      events.on('race:start', () => {
        if (this.race === r && this.state === 'countdown') this.setState('racing');
      }),
      events.on('race:lap', (e) => {
        if (this.race !== r || !e.isPlayer) return;
        if (e.isFinalLap) this.playMusic('finalLap');
      }),
      events.on('race:finish', (e) => {
        if (this.race !== r || !e.isPlayer) return;
        this.onPlayerFinished(r, e.kartId);
      }),
      events.on('race:allFinished', () => {
        if (this.race !== r) return;
        if (this.state === 'finished') r.resultsTimer = RESULTS_DELAY_SECONDS;
        else if (this.state === 'racing' || this.state === 'countdown') this.enterResults();
      }),
      events.on('item:hit', (e) => {
        if (this.race !== r || !e.isPlayer) return;
        this.hitFx = 1;
      }),
      events.on('item:emp', () => {
        if (this.race !== r || !this.postfxOk) return;
        this.safe(() => this.postfx.flash(0xc9a4ff, 0.3));
      }),
    );
  }

  private enterCountdown(): void {
    const r = this.race;
    if (!r) return;
    this.pendingSettings = null;
    this.loading.hide();
    r.hud.show();
    for (const x of r.extra) x.hud.show();

    // Cinematic: wide shot of the grid swooping into the chase position.
    const grid = r.track.startGrid;
    const center = this.tmpA.set(0, 0, 0);
    const n = Math.min(grid.length, KART_COUNT);
    if (n > 0) {
      for (let i = 0; i < n; i++) center.add(grid[i].position);
      center.multiplyScalar(1 / n);
    } else {
      center.copy(r.karts[0].state.position);
    }
    const forward = this.tmpB;
    r.karts[0].forwardDir(forward);
    if (forward.lengthSq() < 1e-6) forward.set(0, 0, -1);
    forward.y = 0;
    forward.normalize();
    const right = this.tmpC.set(-forward.z, 0, forward.x);
    const from = center.clone().addScaledVector(forward, 18).addScaledVector(right, 11);
    from.y += 6.5;
    const look = center.clone();
    look.y += 0.8;
    r.followCamera.setCinematic(from, look, 3 * COUNTDOWN_STEP_SECONDS, 46);

    r.raceManager.startCountdown();
    this.setState('countdown');
    this.playMusic('race');
  }

  private onPlayerFinished(r: RaceContext, kartId = 0): void {
    if (this.state !== 'racing' && this.state !== 'countdown') return;
    try {
      if (kartId === 0) r.playerAutoDriver = new AIDriver(r.karts[0], 'normal', 0);
      else {
        const x = r.extra[kartId - 1];
        if (x) x.auto = new AIDriver(x.kart, 'normal', kartId);
      }
    } catch (err) {
      console.warn('[Game] could not create auto-driver for the player', err);
    }
    // En pantalla partida la carrera «termina» cuando han llegado todos los jugadores.
    for (let j = 0; j < r.humanos; j++) if (!r.karts[j].state.finished) return;
    if (this.postfxOk) this.safe(() => this.postfx.flash(0xffffff, 0.35));
    this.setState('finished');
    if (r.raceManager.allFinished) r.resultsTimer = RESULTS_DELAY_SECONDS;
  }

  private enterResults(): void {
    const r = this.race;
    if (!r || this.state === 'results') return;
    r.hud.hide();
    for (const x of r.extra) x.hud.hide();
    const standings = r.raceManager.getStandings();
    this.results.jugadores = r.humanos;
    this.results.show(standings);
    const puesto = Math.min(...standings.filter((s) => s.isPlayer).map((s) => s.place), standings.length);
    try {
      const { resumen, xp } = this.capa.terminarCarrera(puesto);
      this.results.showAprendizaje(resumen, xp);
    } catch (err) {
      console.error('[Game] learning summary failed', err);
    }
    this.setState('results');
    this.playMusic('results');
  }

  private pause(): void {
    if (this.state !== 'countdown' && this.state !== 'racing' && this.state !== 'finished') return;
    this.prePauseState = this.state;
    this.setState('paused');
    this.pauseMenu.show();
    events.emit('game:pause', {});
  }

  private resume(): void {
    if (this.state !== 'paused') return;
    this.pauseMenu.hide();
    this.accumulator = 0;
    this.pendingUseItem = false;
    this.setState(this.prePauseState);
    events.emit('game:resume', {});
  }

  /** Leave the paused state without returning to the race (restart / quit). */
  private leavePause(): void {
    this.pauseMenu.hide();
    if (this.state === 'paused') {
      // Other systems may have ducked audio / frozen timers on game:pause.
      events.emit('game:resume', {});
    }
  }

  private disposeRace(): void {
    const r = this.race;
    if (!r) return;
    this.race = null;
    this.capa.cancelarReto();
    this.capa.desmontarPuertas();
    this.timeScale = 1;
    for (const u of r.unsubs) u();
    r.unsubs.length = 0;

    this.scene.remove(r.track.object);
    for (const k of r.karts) this.scene.remove(k.object);
    this.scene.remove(r.items.object);
    this.scene.remove(r.sun, r.sun.target, r.hemi, r.fill, r.fill.target);
    r.sun.dispose();
    r.hemi.dispose();
    r.fill.dispose();
    this.scene.fog = null;

    if (r.ciudad) this.safe(() => r.ciudad?.dispose());
    if (r.imperial) this.safe(() => r.imperial?.dispose());
    this.safe(() => r.items.dispose());
    for (const k of r.karts) this.safe(() => k.dispose());
    this.safe(() => r.track.dispose());
    r.raceManager.dispose();
    r.followCamera.dispose();
    r.hud.dispose();
    for (const x of r.extra) {
      x.follow.dispose();
      x.hud.dispose();
    }
    for (const e of r.entradas) e.dispose();
    for (const c of r.cuadrantes) c.remove();
    this.uiRoot.classList.remove('wk-split', 'wk-split-2', 'wk-split-3', 'wk-split-4');
    this.renderer.setScissorTest(false);
    const tam = this.renderer.getSize(this.tmpVec2);
    this.renderer.setViewport(0, 0, tam.x, tam.y);
    this.camera.aspect = tam.x / Math.max(1, tam.y);
    this.camera.updateProjectionMatrix();
    this.safe(() => this.particles.reset());
    if (this.postfxOk) {
      this.safe(() => {
        this.postfx.setSpeedEffect(0);
        this.postfx.setBoostEffect(0);
        this.postfx.setHitEffect(0);
      });
    }
    this.accumulator = 0;
    this.pendingUseItem = false;
  }

  // ---------------------------------------------------------------- audio

  private playMusic(track: MusicTrack): void {
    this.currentMusic = track;
    this.safe(() => this.audio.playMusic(track));
  }

  private readonly onGesture = (): void => {
    if (this.audioStarted) return;
    this.audioStarted = true;
    window.removeEventListener('pointerdown', this.onGesture);
    window.removeEventListener('keydown', this.onGesture);
    this.audio
      .init()
      .then(() => {
        if (this.currentMusic !== 'none') this.safe(() => this.audio.playMusic(this.currentMusic));
      })
      .catch((err: unknown) => {
        console.warn('[Game] audio init failed', err);
        this.audioStarted = false;
        window.addEventListener('pointerdown', this.onGesture, { passive: true });
        window.addEventListener('keydown', this.onGesture);
      });
  };

  private toggleMute(): void {
    const muted = !this.audio.muted;
    this.safe(() => this.audio.setMuted(muted));
    this.muteIndicator.classList.toggle('visible', muted);
  }

  // ------------------------------------------------------------- listeners

  private readonly onResize = (): void => {
    const w = Math.max(1, this.container.clientWidth || window.innerWidth);
    const h = Math.max(1, this.container.clientHeight || window.innerHeight);
    const pr = this.pixelRatio;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.postfxOk) {
      try {
        this.postfx.setSize(w, h, pr);
      } catch (err) {
        console.error('[Game] PostFX resize failed', err);
        this.postfxOk = false;
      }
    }
  };

  // ------------------------------------------------------------ pantalla partida

  private readonly tmpVec2 = new THREE.Vector2();

  /** Lee los mandos de cada jugador (una vez por fotograma). Devuelve true si alguno pide pausa. */
  private leerEntradas(): boolean {
    const r = this.race;
    if (!r || r.humanos < 2) return false;
    let pausa = false;
    for (let j = 0; j < r.entradas.length; j++) {
      const e = r.entradas[j].update();
      const dst = r.entradasEstado[j];
      Object.assign(dst, e);
      if (e.useItem) r.usoPendiente[j] = true;
      if (e.pause && j > 0) pausa = true;
    }
    return pausa;
  }

  private aplicarEntrada(r: RaceContext, j: number, kart: IKart): void {
    const src = r.entradasEstado[j];
    if (!src) return;
    const p = this.jugadorInput[j] ?? (this.jugadorInput[j] = createEmptyInput());
    p.throttle = src.throttle;
    p.brake = src.brake;
    p.steer = src.steer;
    p.drift = src.drift;
    p.useItem = r.usoPendiente[j];
    p.useItemHeld = src.useItemHeld;
    p.lookBack = src.lookBack;
    r.usoPendiente[j] = false;
    kart.setInput(p);
  }
  private readonly jugadorInput: InputState[] = [];

  /** Rectángulos (x, y, w, h) de cada vista, en píxeles CSS, origen abajo-izquierda (WebGL). */
  private rectangulos(n: number, w: number, h: number): [number, number, number, number][] {
    const w2 = Math.floor(w / 2);
    const h2 = Math.floor(h / 2);
    if (n === 2) return [[0, h2, w, h - h2], [0, 0, w, h2]];
    return [
      [0, h2, w2, h - h2],
      [w2, h2, w - w2, h - h2],
      [0, 0, w2, h2],
      [w2, 0, w - w2, h2],
    ];
  }

  private renderPartido(r: RaceContext): void {
    const tam = this.renderer.getSize(this.tmpVec2);
    const camaras: THREE.PerspectiveCamera[] = [this.camera, ...r.extra.map((x) => x.camera)];
    if (r.vista) camaras.push(r.vista);
    const rects = this.rectangulos(r.humanos, tam.x, tam.y);
    this.renderer.setScissorTest(true);
    for (let i = 0; i < camaras.length && i < rects.length; i++) {
      const [x, y, w, h] = rects[i];
      const cam = camaras[i];
      cam.aspect = w / Math.max(1, h);
      cam.updateProjectionMatrix();
      this.renderer.setViewport(x, y, w, h);
      this.renderer.setScissor(x, y, w, h);
      this.renderer.render(this.scene, cam);
    }
    this.renderer.setScissorTest(false);
  }

  /** Con 3 jugadores: cámara aérea que sigue al líder de la carrera. */
  private actualizarVista(r: RaceContext, dt: number): void {
    const cam = r.vista;
    if (!cam) return;
    let lider = r.karts[0];
    for (const k of r.karts) if (k.state.place > 0 && k.state.place < lider.state.place) lider = k;
    const p = lider.state.position;
    lider.forwardDir(this.tmpB);
    this.tmpA.set(p.x - this.tmpB.x * 18, p.y + 16, p.z - this.tmpB.z * 18);
    cam.position.lerp(this.tmpA, Math.min(1, dt * 3));
    cam.lookAt(p.x + this.tmpB.x * 8, p.y, p.z + this.tmpB.z * 8);
  }

  /** Adaptive quality: lower the pixel ratio when frames are slow, raise it back when there is headroom. */
  private adaptQuality(dt: number): void {
    const racing = this.state === 'racing' || this.state === 'countdown' || this.state === 'finished';
    if (!this.adaptive || !racing || dt <= 0) {
      this.fpsTime = 0;
      this.fpsFrames = 0;
      return;
    }
    this.fpsTime += dt;
    this.fpsFrames++;
    if (this.fpsTime < 2) return;
    const fps = this.fpsFrames / this.fpsTime;
    this.fpsTime = 0;
    this.fpsFrames = 0;
    if (fps < 42) {
      this.slowWindows++;
      this.fastWindows = 0;
    } else if (fps > 57) {
      this.fastWindows++;
      this.slowWindows = 0;
    } else {
      this.slowWindows = this.fastWindows = 0;
    }
    if (this.slowWindows >= 2) {
      this.slowWindows = 0;
      if (this.pixelRatio > 0.7) {
        this.pixelRatio = Math.max(0.65, this.pixelRatio - 0.25);
        this.onResize();
      } else if (this.postfxOk) {
        this.postfxOk = false;
        this.safe(() => this.postfx.setEnabled(false));
      }
    } else if (this.fastWindows >= 4 && this.pixelRatio < this.maxPixelRatio) {
      this.fastWindows = 0;
      this.pixelRatio = Math.min(this.maxPixelRatio, this.pixelRatio + 0.25);
      this.onResize();
    }
  }

  private readonly onKeyDown = (ev: KeyboardEvent): void => {
    if (ev.repeat) return;
    if (ev.key === 'm' || ev.key === 'M') this.toggleMute();
  };

  private readonly onBlur = (): void => {
    if (this.state === 'racing' || this.state === 'countdown') this.pause();
  };

  private readonly onVisibility = (): void => {
    if (document.hidden) this.onBlur();
  };

  private safe(fn: () => void): void {
    try {
      fn();
    } catch (err) {
      console.error('[Game]', err);
    }
  }
}
