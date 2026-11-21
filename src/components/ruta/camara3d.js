// v27 · Cámara 3D de la Ruta (sin WebGL: CSS 3D + proyección propia)
//
// Cada unidad es un TABLERO inclinado en perspectiva: el suelo (.r3-suelo: tramo pintado, hilo de oro, huellas,
// sombras de contacto) se transforma con perspective() + rotateX/rotateY, y lo que está de pie (medallones,
// pabellón del examen, Rey Mono) son «carteles» (billboards) planos que se colocan en el punto PROYECTADO de su
// sitio en el suelo y se escalan con la profundidad. Así no dependemos de preserve-3d (que corta los carteles con
// el suelo y rompe z-index y clics) y el resultado es idéntico en Chrome, Safari y Firefox.
//
// Una sola rAF para toda la página que solo trabaja con los tableros visibles y se DUERME cuando la cámara ya ha
// llegado a su sitio. Entradas: scroll (el ángulo cambia según la altura del tablero en la pantalla), puntero en
// escritorio, inclinación del móvil (opcional, con permiso en iOS) y vuelos de cámara (al cargar y al cambiar de
// nivel). Con prefers-reduced-motion la cámara queda quieta en su postura de reposo.
//
// Coordenadas: las del carril (ANCHO_CARRIL × alto de la unidad), las mismas de geometria.js.

import { ANCHO_CARRIL } from "./geometria.js";

const GRADOS = Math.PI / 180;
const sinMovimiento = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
// Leer window.innerWidth puede forzar un recálculo de diseño; camaraBase() se llama por tablero en cada fotograma,
// justo después de escribir transformaciones (layout thrashing: ~200 ms al cargar la ruta). Se cachea y se renueva
// solo al cambiar el tamaño de la ventana.
let movilCache = null;
if (typeof window !== "undefined") window.addEventListener("resize", () => (movilCache = null), { passive: true });
const esMovil = () => {
  if (typeof window === "undefined") return false;
  if (movilCache === null) movilCache = window.innerWidth <= 700;
  return movilCache;
};

/** Postura de reposo del tablero de una unidad de `alto` px */
export function camaraBase(alto, movil = esMovil()) {
  // Móvil con unidades largas (3 clases o más): la cámara se aleja un poco desde arriba para que quepa el examen
  const largo = movil && alto > 520;
  return {
    th: largo ? 34 : movil ? 28 : 34, // inclinación (rotateX, grados)
    ph: 0, // giro lateral (rotateY, grados)
    P: movil ? 920 : 1150, // distancia de la cámara (perspective, px)
    z: largo ? 0.9 : 1, // zoom alrededor del foco
    fx: ANCHO_CARRIL / 2, // foco del zoom
    fy: largo ? 110 : alto * 0.5,
    px: 0, // desplazamiento final
    py: 0,
    ox: ANCHO_CARRIL / 2, // eje de giro
    oy: alto * 0.56,
  };
}

/** Punto del suelo (x, y) → posición en pantalla dentro de la caja del tablero y escala por profundidad */
export function proyectar(cam, x, y) {
  const X = x - cam.ox;
  const Y = y - cam.oy;
  const ct = Math.cos(cam.th * GRADOS);
  const st = Math.sin(cam.th * GRADOS);
  const cp = Math.cos(cam.ph * GRADOS);
  const sp = Math.sin(cam.ph * GRADOS);
  const y1 = Y * ct;
  const z1 = Y * st;
  const x2 = X * cp + z1 * sp;
  const z2 = -X * sp + z1 * cp;
  const f = cam.P / (cam.P - z2);
  const sx = cam.ox + x2 * f;
  const sy = cam.oy + y1 * f;
  return { x: cam.fx + cam.px + cam.z * (sx - cam.fx), y: cam.fy + cam.py + cam.z * (sy - cam.fy), s: cam.z * f };
}

/** transform del suelo (con transform-origin: 0 0) equivalente a proyectar() */
export function transformSuelo(cam) {
  const n = (v) => v.toFixed(2);
  return (
    `translate(${n(cam.fx + cam.px)}px, ${n(cam.fy + cam.py)}px) scale(${cam.z.toFixed(4)}) ` +
    `translate(${n(cam.ox - cam.fx)}px, ${n(cam.oy - cam.fy)}px) perspective(${n(cam.P)}px) rotateY(${n(cam.ph)}deg) rotateX(${n(cam.th)}deg) translate(${n(-cam.ox)}px, ${n(-cam.oy)}px)`
  );
}

/** transform de un cartel de pie en (x, y). ancla «centro» (centrado, levantado un poco) o «libre» (origen 0 0) */
export function transformCartel(cam, x, y, ancla = "centro", alza = 0) {
  const p = proyectar(cam, x, y);
  if (ancla === "libre") return `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) scale(${p.s.toFixed(4)})`;
  return `translate3d(${p.x.toFixed(1)}px, ${(p.y - alza * p.s).toFixed(1)}px, 0) translate(-50%, -50%) scale(${p.s.toFixed(4)})`;
}

/**
 * Escribe un transform sin recalcular el estilo de todo el subárbol: medido en móvil, cambiar style.transform de un
 * medallón (con sus SVG y animaciones dentro) cuesta ~4 veces más que actualizar los fotogramas clave de una animación
 * WAAPI quieta (dos claves iguales, sin fin). Solo escribe si el valor cambia.
 */
export function ponerTransform(nodo, valor) {
  if (!nodo || nodo.__tr === valor) return;
  nodo.__tr = valor;
  if (typeof nodo.animate !== "function") {
    nodo.style.transform = valor;
    return;
  }
  const claves = [{ transform: valor }, { transform: valor }];
  if (nodo.__an && nodo.__an.playState !== "idle" && nodo.__an.effect) nodo.__an.effect.setKeyframes(claves);
  else nodo.__an = nodo.animate(claves, { duration: 1e9, fill: "both" });
}

/** Coloca un cartel (lo usa el Rey Mono en cada fotograma de su viaje) con la cámara actual de su tablero */
export function colocarEn(el, x, y, ancla = "libre") {
  if (!el) return;
  el.dataset.gx = x;
  el.dataset.gy = y;
  el.dataset.ancla = ancla;
  const tablero = el.closest?.(".r3-tablero");
  const cam = tablero?.__cam || camaraBase(Number(tablero?.dataset.alto) || 500);
  ponerTransform(el, transformCartel(cam, x, y, ancla, Number(el.dataset.alza) || 0));
}

/** Proyección de un punto con la cámara actual del tablero que contiene a `el` */
export function proyectarEn(el, x, y) {
  const tablero = el?.closest?.(".r3-tablero");
  const cam = tablero?.__cam || camaraBase(Number(tablero?.dataset.alto) || 500);
  return proyectar(cam, x, y);
}

// ---------------------------------------------------------------------------------------------------------------
// Director de cámara (uno por página)

const suaveSalida = (k) => 1 - (1 - k) ** 3;
const suaveVuelo = (k) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);

export function crearDirector(raiz) {
  const visibles = new Set();
  const tableros = new Map(); // el → { cam, vuelo }
  let raf = 0;
  let puntero = { x: 0, y: 0 }; // −1…1
  let punteroSuave = { x: 0, y: 0 };
  let inclinacion = null; // { x, y } del móvil, −1…1
  let dormida = true;
  let activa = !sinMovimiento();
  let pausada = false;
  let desplazado = 0; // scroll acumulado (px) desde que se midieron las cajas
  let medidaGlobal = 0; // se incrementa para volver a medir (resize, cambios del DOM)
  const ultimoScroll = new WeakMap();
  let altoVentana = typeof window !== "undefined" ? window.innerHeight || 800 : 800;

  const estado = (el) => {
    let e = tableros.get(el);
    if (!e) {
      e = { cam: camaraBase(Number(el.dataset.alto) || 500), vuelo: null };
      tableros.set(el, e);
      el.__cam = e.cam;
    }
    return e;
  };

  const escribir = ponerTransform;
  const aplicar = (el, cam) => {
    el.__cam = cam;
    const suelo = el.querySelector(":scope > .r3-suelo");
    if (suelo) escribir(suelo, transformSuelo(cam));
    for (const cartel of el.querySelectorAll(":scope > [data-gx]")) {
      escribir(cartel, transformCartel(cam, Number(cartel.dataset.gx), Number(cartel.dataset.gy), cartel.dataset.ancla || "centro", Number(cartel.dataset.alza) || 0));
    }
  };

  const objetivo = (el, ahora) => {
    const alto = Number(el.dataset.alto) || 500;
    const base = camaraBase(alto);
    if (!activa) return { cam: base, quieta: true };
    const vh = altoVentana; // leído una vez al empezar el fotograma, antes de escribir transformaciones
    // Posición del tablero en pantalla sin forzar layout: la caja medida una vez y el desplazamiento acumulado
    const e0 = tableros.get(el);
    if (!e0.caja || e0.medida !== medidaGlobal) {
      const r = el.getBoundingClientRect();
      e0.caja = { top: r.top + desplazado, height: r.height };
      e0.medida = medidaGlobal;
    }
    const centro = e0.caja.top - desplazado + e0.caja.height / 2;
    // −1 (tablero arriba de la pantalla) … 1 (abajo): la cámara está a media altura y lo ve desde otro ángulo
    const d = Math.max(-1.2, Math.min(1.2, (centro - vh / 2) / vh));
    const entrada = inclinacion || punteroSuave;
    const cam = { ...base, th: base.th + d * 7 + entrada.y * 4, ph: entrada.x * (inclinacion ? 7 : 5) };
    const e = tableros.get(el);
    let quieta = true;
    if (e?.vuelo) {
      const v = e.vuelo;
      const k = Math.min(1, Math.max(0, (ahora - v.t0) / v.dura));
      const s = v.tipo === "vuelo" ? suaveVuelo(k) : suaveSalida(k);
      const de = v.desde;
      cam.th += (de.th ?? 0) * (1 - s);
      cam.ph += (de.ph ?? 0) * (1 - s);
      cam.z *= 1 + ((de.z ?? 1) - 1) * (1 - s);
      cam.px += (de.px ?? 0) * (1 - s);
      cam.py += (de.py ?? 0) * (1 - s);
      if (de.fx != null) cam.fx += (de.fx - cam.fx) * (1 - s);
      if (de.fy != null) cam.fy += (de.fy - cam.fy) * (1 - s);
      if (k >= 1) e.vuelo = null;
      else quieta = false;
      cam.directo = true;
    }
    return { cam, quieta };
  };

  const paso = (ahora) => {
    raf = 0;
    if (pausada) return;
    if (pendientes.size) leerScroll();
    altoVentana = window.innerHeight || 800;
    // Todas las lecturas de cajas antes de cualquier escritura (sin intercalar: evita un layout forzado por tablero)
    for (const el of visibles) {
      const e0 = estado(el);
      if (!e0.caja || e0.medida !== medidaGlobal) {
        const r = el.getBoundingClientRect();
        e0.caja = { top: r.top + desplazado, height: r.height };
        e0.medida = medidaGlobal;
      }
    }
    punteroSuave = { x: punteroSuave.x + (puntero.x - punteroSuave.x) * 0.08, y: punteroSuave.y + (puntero.y - punteroSuave.y) * 0.08 };
    let seguir = Math.abs(punteroSuave.x - puntero.x) > 0.002 || Math.abs(punteroSuave.y - puntero.y) > 0.002;
    // Parallax del paisaje (solo en el mundo: cambiar una variable en .ruta-main recalcularía toda la página)
    const mundo = raiz?.querySelector(".mr-mundo");
    const entradaFondo = inclinacion || punteroSuave;
    const valor = `${entradaFondo.x.toFixed(3)},${entradaFondo.y.toFixed(3)}`;
    if (mundo && mundo.__cam !== valor) {
      mundo.__cam = valor;
      mundo.style.setProperty("--cam-x", entradaFondo.x.toFixed(3));
      mundo.style.setProperty("--cam-y", entradaFondo.y.toFixed(3));
    }
    for (const el of visibles) {
      const e = estado(el);
      const { cam: meta, quieta } = objetivo(el, ahora);
      const c = e.cam;
      let mov = 0;
      const nueva = { ...meta };
      if (!meta.directo) {
        for (const clave of ["th", "ph", "z", "px", "py"]) {
          nueva[clave] = c[clave] + (meta[clave] - c[clave]) * 0.16;
          mov = Math.max(mov, Math.abs(meta[clave] - nueva[clave]));
        }
      }
      delete nueva.directo;
      nueva.th = Math.round(nueva.th * 20) / 20;
      nueva.ph = Math.round(nueva.ph * 20) / 20;
      e.cam = nueva;
      aplicar(el, nueva);
      if (!quieta || mov > 0.01) seguir = true;
    }
    if (seguir) raf = requestAnimationFrame(paso);
    else dormida = true;
  };
  const despertar = () => {
    if (pausada) return;
    dormida = false;
    if (!raf) raf = requestAnimationFrame(paso);
  };

  const ojo =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          (entradas) => {
            for (const en of entradas) {
              if (en.isIntersecting) visibles.add(en.target);
              else visibles.delete(en.target);
            }
            despertar();
          },
          { rootMargin: "120px 0px" },
        )
      : null;

  const alMover = (ev) => {
    if (ev.pointerType && ev.pointerType !== "mouse") return;
    puntero = { x: (ev.clientX / window.innerWidth) * 2 - 1, y: (ev.clientY / window.innerHeight) * 2 - 1 };
    despertar();
  };
  const alOrientar = (ev) => {
    if (ev.gamma == null) return;
    inclinacion = { x: Math.max(-1, Math.min(1, ev.gamma / 25)), y: Math.max(-1, Math.min(1, ((ev.beta ?? 45) - 45) / 25)) };
    despertar();
  };
  const alVisibilidad = () => {
    pausada = document.hidden;
    if (!pausada) despertar();
  };
  const reducir = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const alReducir = () => {
    activa = !reducir.matches;
    despertar();
  };
  // La posición se lee en el fotograma (paso), no en cada evento: leer scrollY/scrollTop dentro del evento forzaba
  // un recálculo de estilos extra a mitad de fotograma.
  const pendientes = new Set();
  const leerScroll = () => {
    for (const clave of pendientes) {
      const ahora = clave === window ? window.scrollY : clave.scrollTop;
      const antes = ultimoScroll.get(clave);
      ultimoScroll.set(clave, ahora);
      if (antes != null) desplazado += ahora - antes;
    }
    pendientes.clear();
  };
  const alScroll = (ev) => {
    const t = ev.target === document || ev.target === document.documentElement ? null : ev.target;
    pendientes.add(t || window);
    despertar();
  };
  const alRedimensionar = () => {
    medidaGlobal++;
    despertar();
  };
  const remedir = setInterval(() => {
    if (!dormida) medidaGlobal++;
  }, 1200);
  window.addEventListener("scroll", alScroll, { passive: true, capture: true });
  window.addEventListener("resize", alRedimensionar, { passive: true });
  if (activa && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) window.addEventListener("pointermove", alMover, { passive: true });
  document.addEventListener("visibilitychange", alVisibilidad);
  reducir?.addEventListener?.("change", alReducir);

  return {
    /** Registra los tableros nuevos (se llama tras cada render) */
    sincronizar() {
      if (!raiz) return;
      medidaGlobal++;
      for (const el of raiz.querySelectorAll(".r3-tablero")) {
        if (el.__dirigido) continue;
        el.__dirigido = true;
        estado(el);
        ojo ? ojo.observe(el) : visibles.add(el);
      }
      for (const el of [...tableros.keys()]) {
        if (!el.isConnected) {
          tableros.delete(el);
          visibles.delete(el);
          ojo?.unobserve(el);
        }
      }
      despertar();
    },
    /** Vuelo de cámara en los tableros: «acercar» (al cargar, hacia la clase actual) o «vuelo» (cambio de nivel) */
    volar(tipo, foco) {
      if (!activa || !raiz) return;
      const ahora = performance.now();
      const lista = [...raiz.querySelectorAll(".r3-tablero")];
      const iFoco = Math.max(0, lista.findIndex((el) => el.contains(foco)));
      lista.forEach((el, i) => {
        const e = estado(el);
        const alto = Number(el.dataset.alto) || 500;
        const cerca = Math.abs(i - iFoco);
        if (cerca > 3) return;
        const desde =
          tipo === "vuelo"
            ? { th: 34, z: 0.62, py: -alto * 0.18, ph: (i % 2 ? 1 : -1) * 10 }
            : { th: 22, z: 0.78, py: alto * 0.06 };
        if (foco && el.contains(foco)) {
          const nodo = foco.closest("[data-gx]");
          if (nodo) Object.assign(desde, { fx: Number(nodo.dataset.gx), fy: Number(nodo.dataset.gy) });
        }
        e.vuelo = { tipo, t0: ahora + cerca * 140, dura: tipo === "vuelo" ? 1500 : 1700, desde };
      });
      despertar();
    },
    /** Ejecuta `fn` con todos los tableros en su postura de reposo (para medir) y lo restaura todo */
    medirEnReposo(fn) {
      const guardado = [];
      for (const [el, e] of tableros) {
        guardado.push([el, e.cam]);
        aplicar(el, camaraBase(Number(el.dataset.alto) || 500));
      }
      try {
        return fn();
      } finally {
        for (const [el, cam] of guardado) aplicar(el, cam);
      }
    },
    /** Inclinación del móvil (llamar desde un gesto del alumno: iOS pide permiso) */
    async activarInclinacion() {
      const DOE = window.DeviceOrientationEvent;
      if (!DOE) return false;
      try {
        if (typeof DOE.requestPermission === "function") {
          const r = await DOE.requestPermission();
          if (r !== "granted") return false;
        }
      } catch {
        return false;
      }
      window.addEventListener("deviceorientation", alOrientar, { passive: true });
      return true;
    },
    desactivarInclinacion() {
      window.removeEventListener("deviceorientation", alOrientar);
      inclinacion = null;
      despertar();
    },
    get dormida() {
      return dormida;
    },
    destruir() {
      cancelAnimationFrame(raf);
      ojo?.disconnect();
      clearInterval(remedir);
      window.removeEventListener("scroll", alScroll, { capture: true });
      window.removeEventListener("resize", alRedimensionar);
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("deviceorientation", alOrientar);
      document.removeEventListener("visibilitychange", alVisibilidad);
      reducir?.removeEventListener?.("change", alReducir);
    },
  };
}
