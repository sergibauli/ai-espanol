/**
 * Wukong Turbo Rush · portada en vídeo (cinemática del dueño, public/turbo-kart/portada-video.mp4).
 *
 * - Móvil (vertical): el vídeo ocupa toda la pantalla.
 * - Escritorio (apaisado): el vídeo va centrado a toda altura y el resto se rellena con el mismo
 *   vídeo muy desenfocado (un lienzo diminuto que copia el fotograma, sin decodificar dos veces).
 * - Al terminar se queda unos segundos en el plano final (logo + Wukong saludando) y vuelve a
 *   empezar con un destello dorado.
 * - Empieza en silencio (los navegadores no dejan reproducir con sonido sin un toque); el botón
 *   «Música · 音乐» activa el sonido.
 * - Con «reducir movimiento» o si el vídeo no puede reproducirse, se ve el último fotograma fijo y
 *   `start()` devuelve false para que la portada animada por capas tome el relevo.
 */
import './portada-video.css';

const VIDEO = './turbo-kart/portada-video.mp4';
const POSTER = './turbo-kart/portada-video.webp';
/** Segundos que se queda en el plano final antes de repetir. */
const PAUSA_FINAL = 3.5;

export class PortadaVideo {
  private readonly raiz: HTMLElement;
  private readonly video: HTMLVideoElement;
  private readonly fondo: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly destello: HTMLElement;
  private readonly sonido: HTMLButtonElement;
  private readonly titulo: HTMLElement;
  private activa = false;
  private fallo = false;
  private raf = 0;
  private cuadro = 0;
  private espera: ReturnType<typeof setTimeout> | null = null;
  private readonly reducido =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Se inserta en la sección de la portada, por encima de la ilustración y por debajo de los botones. */
  constructor(titulo: HTMLElement, antesDe?: HTMLElement | null) {
    this.titulo = titulo;
    this.raiz = document.createElement('div');
    this.raiz.className = 'wk-pv';
    this.raiz.setAttribute('aria-hidden', 'true');

    this.fondo = document.createElement('canvas');
    this.fondo.className = 'wk-pv-fondo';
    this.fondo.width = 36;
    this.fondo.height = 64;
    this.ctx = this.fondo.getContext('2d');
    this.raiz.appendChild(this.fondo);

    const marco = document.createElement('div');
    marco.className = 'wk-pv-marco';
    this.video = document.createElement('video');
    this.video.className = 'wk-pv-video';
    this.video.muted = true;
    this.video.defaultMuted = true;
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('webkit-playsinline', '');
    this.video.preload = 'auto';
    this.video.poster = POSTER;
    this.video.src = VIDEO;
    this.video.disablePictureInPicture = true;
    marco.appendChild(this.video);
    this.raiz.appendChild(marco);

    this.destello = document.createElement('div');
    this.destello.className = 'wk-pv-destello';
    this.raiz.appendChild(this.destello);

    const viñeta = document.createElement('div');
    viñeta.className = 'wk-pv-vineta';
    this.raiz.appendChild(viñeta);

    if (antesDe && antesDe.parentNode === titulo) titulo.insertBefore(this.raiz, antesDe);
    else titulo.appendChild(this.raiz);

    // Botón de sonido (fuera de la capa aria-hidden para que sea accesible).
    this.sonido = document.createElement('button');
    this.sonido.type = 'button';
    this.sonido.className = 'wk-pv-sonido';
    this.pintarSonido();
    this.sonido.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.video.muted = !this.video.muted;
      if (!this.video.muted && this.video.paused && this.activa) void this.video.play().catch(() => undefined);
      this.pintarSonido();
    });
    titulo.appendChild(this.sonido);

    this.video.addEventListener('ended', this.alTerminar);
    this.video.addEventListener('error', () => this.marcarFallo());
    if (this.reducido) this.marcarFallo();
  }

  private pintarSonido(): void {
    const mudo = this.video.muted;
    this.sonido.textContent = mudo ? '🔇 Música · 音乐' : '🔊 Música · 音乐';
    this.sonido.setAttribute('aria-pressed', String(!mudo));
    this.sonido.title = mudo ? 'Activar el sonido · 打开声音' : 'Silenciar · 静音';
  }

  private marcarFallo(): void {
    if (this.fallo) return;
    this.fallo = true;
    this.titulo.classList.remove('wk-con-video');
    this.raiz.classList.add('wk-pv-fijo');
    this.sonido.hidden = true;
    this.pararBucle();
  }

  private readonly alTerminar = (): void => {
    if (!this.activa) return;
    this.espera = setTimeout(() => {
      this.espera = null;
      if (!this.activa) return;
      this.destello.classList.remove('activo');
      void this.destello.offsetWidth;
      this.destello.classList.add('activo');
      this.video.currentTime = 0;
      void this.video.play().catch(() => undefined);
    }, PAUSA_FINAL * 1000);
  };

  /** Copia el fotograma a un lienzo diminuto (el CSS lo desenfoca) para el fondo del escritorio. */
  private readonly bucle = (): void => {
    this.raf = requestAnimationFrame(this.bucle);
    if (!this.ctx || (this.cuadro++ & 3) !== 0) return;
    if (this.fondo.offsetParent === null || this.video.readyState < 2) return;
    try {
      this.ctx.drawImage(this.video, 0, 0, this.fondo.width, this.fondo.height);
    } catch {
      /* fotograma aún no disponible */
    }
  };

  private pararBucle(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /** Arranca el vídeo; devuelve false si no hay vídeo (la portada por capas toma el relevo). */
  start(): boolean {
    if (this.fallo) return false;
    if (this.activa) return true;
    this.activa = true;
    this.titulo.classList.add('wk-con-video');
    if (!this.raf) this.raf = requestAnimationFrame(this.bucle);
    const p = this.video.play();
    if (p) {
      p.catch((err: unknown) => {
        // Bloqueo de reproducción automática (p. ej. ahorro de batería): queda el póster.
        if ((err as { name?: string })?.name === 'NotAllowedError') this.raiz.classList.add('wk-pv-pausado');
        else this.marcarFallo();
      });
    }
    return true;
  }

  stop(): void {
    if (!this.activa) return;
    this.activa = false;
    this.video.pause();
    if (this.espera) clearTimeout(this.espera);
    this.espera = null;
    this.pararBucle();
  }

  dispose(): void {
    this.stop();
    this.video.removeEventListener('ended', this.alTerminar);
    this.video.removeAttribute('src');
    this.video.load();
    this.raiz.remove();
    this.sonido.remove();
    this.titulo.classList.remove('wk-con-video');
  }
}
