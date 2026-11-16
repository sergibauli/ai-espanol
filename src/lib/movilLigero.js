// Móvil ligero: en pantallas < 1024 px (móvil y tableta)
// 1) Pausa las animaciones infinitas que están fuera de la pantalla (todas, no solo las de bloques conocidos)
//    y las reanuda al volver a verse.
// 2) Aclara las «lluvias» de partículas decorativas (nieve, chispas, pétalos…): de cada grupo de 8 o más
//    hermanos con la misma animación infinita deja la mitad.
// 3) Marca <html class="scroll-bajando"> mientras el alumno baja, para que lo flotante (Rey Mono) se aparte.
const MOVIL = "(max-width: 1023px)";
const MARGEN = 120;
const pausadas = new WeakSet();
// Escenas de fondo fijas (mundo de la ruta…) o marcadas con data-ml-quieto: en móvil se quedan quietas
// salvo las partículas que dan vida (nieve, farolillos, luciérnagas, estrellas).
const QUIETAS = ".mr-fijo, [data-ml-quieto]";
const VIVAS = /copo|nieve|kongming|luciernaga|estrella|petalo/i;
const congeladas = new WeakSet();
const aclarados = new WeakSet();

function infinita(a) {
  try {
    return a.effect && a.effect.getTiming().iterations === Infinity;
  } catch {
    return false;
  }
}

function aclarar(anims) {
  const grupos = new Map();
  for (const a of anims) {
    const el = a.effect?.target;
    if (!el || !el.parentElement || aclarados.has(el) || el.closest?.(".mf, .bottom-nav, .lp-root, button, a, label")) continue;
    // solo motas decorativas: sin texto y pequeñas
    if (el.textContent.trim() !== "") continue;
    const r = el.getBoundingClientRect();
    if (r.width > 48 || r.height > 48) continue;
    const clave = el.parentElement;
    const nombre = a.animationName || "";
    let g = grupos.get(clave);
    if (!g) grupos.set(clave, (g = new Map()));
    const lista = g.get(nombre) || [];
    lista.push(el);
    g.set(nombre, lista);
  }
  for (const g of grupos.values()) {
    for (const lista of g.values()) {
      const unicos = [...new Set(lista)];
      if (unicos.length < 8) continue;
      unicos.forEach((el, i) => {
        aclarados.add(el);
        if (i % 2 === 1) el.setAttribute("data-ml-oculto", "");
      });
    }
  }
}

function repasar() {
  let anims;
  try {
    anims = document.getAnimations().filter((a) => infinita(a) && a.effect?.target);
  } catch {
    return;
  }
  if (!anims.length) return;
  aclarar(anims.filter((a) => a.playState === "running"));
  const alto = window.innerHeight;
  const ancho = window.innerWidth;
  const rects = new Map();
  for (const a of anims) {
    const el = a.effect.target;
    if (congeladas.has(a)) continue;
    if (el.closest(QUIETAS) && !VIVAS.test(el.getAttribute("class") || "") && !VIVAS.test(a.animationName || "")) {
      if (a.playState === "running" && (a.currentTime || 0) > 0) {
        a.pause();
        congeladas.add(a);
      }
      continue;
    }
    let r = rects.get(el);
    if (!r) rects.set(el, (r = el.getBoundingClientRect()));
    const fuera = r.bottom < -MARGEN || r.top > alto + MARGEN || r.right < -MARGEN || r.left > ancho + MARGEN || (r.width === 0 && r.height === 0);
    if (fuera && a.playState === "running") {
      a.pause();
      pausadas.add(a);
    } else if (!fuera && a.playState === "paused" && pausadas.has(a)) {
      pausadas.delete(a);
      a.play();
    }
  }
}

export function iniciarMovilLigero() {
  if (typeof window === "undefined" || !window.matchMedia || typeof document.getAnimations !== "function") return;
  const mq = window.matchMedia(MOVIL);
  let espera = 0;
  const programar = (ms = 250) => {
    if (!mq.matches || espera) return;
    espera = setTimeout(() => {
      espera = 0;
      (window.requestIdleCallback || ((f) => setTimeout(f, 1)))(repasar, { timeout: 400 });
    }, ms);
  };
  // dirección del scroll (en cualquier contenedor)
  const ultimos = new WeakMap();
  const html = document.documentElement;
  const alDesplazar = (e) => {
    programar();
    if (!mq.matches) return;
    const t = e.target === document ? document.scrollingElement : e.target;
    if (!t || typeof t.scrollTop !== "number") return;
    const y = t.scrollTop;
    const ultimo = ultimos.get(t) ?? 0;
    if (Math.abs(y - ultimo) < 24) return;
    html.classList.toggle("scroll-bajando", y > ultimo && y > 80);
    ultimos.set(t, y);
  };
  document.addEventListener("scroll", alDesplazar, { passive: true, capture: true });
  window.addEventListener("hashchange", () => {
    html.classList.remove("scroll-bajando");
    programar(900);
  });
  new MutationObserver(() => programar(600)).observe(document.body, { childList: true, subtree: true });
  window.addEventListener("resize", () => programar(300), { passive: true });
  programar(1200);
}
