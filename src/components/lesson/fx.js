// Efectos de las lecciones: sonidos sintetizados (sin ficheros), voz en español y confeti.

let ctx = null;
const soundOn = () => {
  try {
    return localStorage.getItem("dele_sound_enabled") !== "false";
  } catch {
    return true;
  }
};

function tone(freq, start, dur, type = "sine", gain = 0.12) {
  ctx ??= new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume?.().catch?.(() => {});
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + dur + 0.02);
}

export function sfx(kind) {
  if (!soundOn()) return;
  try {
    if (kind === "ok") [523, 659, 784].forEach((f, i) => tone(f, i * 0.07, 0.18, "triangle"));
    else if (kind === "bad") [220, 175].forEach((f, i) => tone(f, i * 0.12, 0.22, "square", 0.06));
    else if (kind === "tap") tone(880, 0, 0.05, "sine", 0.05);
    else if (kind === "win") [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, i * 0.1, 0.25, "triangle", 0.1));
    // Golpe del sello: un tambor grave y un brillo de campanilla
    else if (kind === "sello") {
      tone(110, 0, 0.16, "sine", 0.22);
      tone(70, 0.01, 0.22, "triangle", 0.12);
      tone(1568, 0.05, 0.35, "sine", 0.04);
    }
    // Racha: arpegio que sube un tono más con cada acierto seguido
    else if (kind === "racha") [659, 784, 988, 1319].forEach((f, i) => tone(f, i * 0.06, 0.16, "triangle", 0.06));
    // Corazón perdido: dos notas que caen
    else if (kind === "corazon") [392, 294].forEach((f, i) => tone(f, i * 0.1, 0.2, "sine", 0.07));
    // Pergamino que se abre: soplo suave
    else if (kind === "rollo") [330, 440].forEach((f, i) => tone(f, i * 0.05, 0.12, "sine", 0.025));
    // Fuegos artificiales del final
    else if (kind === "fuego") tone(180 + Math.random() * 60, 0, 0.3, "triangle", 0.05);
  } catch {}
}

// Audios pregrabados con la voz del profesor (Fish Audio): mismo hash FNV-1a que scripts de generación.
// Los índices (~200 KB) no frenan la primera pantalla: se descargan en reposo o, como tarde, en la primera frase.
let AUDIO = null;
let AUDIO_F = null;
let cargaIndices = null;
function cargarIndices() {
  cargaIndices ??= Promise.all([import("../../data/audio-index.json"), import("../../data/audio-index-f.json")])
    .then(([m, f]) => {
      AUDIO = new Set(m.default);
      AUDIO_F = new Set(f.default);
    })
    .catch(() => {
      cargaIndices = null;
    });
  return cargaIndices;
}
if (typeof window !== "undefined") (window.requestIdleCallback || ((f) => setTimeout(f, 1500)))(() => cargarIndices(), { timeout: 4000 });
function fnv(t) {
  let h = 0x811c9dc5;
  for (const b of new TextEncoder().encode(t)) {
    h ^= b;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}
let current = null;

// Un solo <audio> para las frases (MP3): iOS Safari y WeChat solo dejan sonar un elemento cuyo primer
// play() fue dentro de un toque. Con un `new Audio()` por frase, las que arrancan solas (diálogo
// automático, «Reproducir todo») se bloqueaban. Se desbloquea en el primer toque de la página.
const SILENCIO = "data:audio/wav;base64,UklGRmQBAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YUABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
let vozMp3 = null;
let turnoMp3 = 0;
const elementoVoz = () => {
  if (!vozMp3 && typeof Audio !== "undefined") {
    vozMp3 = new Audio();
    vozMp3.preload = "auto";
    vozMp3.setAttribute("playsinline", "");
  }
  return vozMp3;
};
if (typeof window !== "undefined") {
  const desbloquear = () => {
    ["touchend", "click", "keydown"].forEach((tipo) => window.removeEventListener(tipo, desbloquear, true));
    const a = elementoVoz();
    if (a && !a.src) {
      a.src = SILENCIO;
      a.play()?.catch(() => {});
    }
    if (ctx?.state === "suspended") ctx.resume?.().catch?.(() => {});
  };
  ["touchend", "click", "keydown"].forEach((tipo) => window.addEventListener(tipo, desbloquear, true));
}

// voice: "m" (voz del profesor) o "f" (voz femenina para Lucía, Mei y Carmen)
// Voz de Fish generada al momento a través del Worker (textos nuevos, p. ej. el entrevistador); si no hay Worker, voz normal
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export async function speakIA(text, voz = "profesor") {
  if (!API_URL) return speak(text, 0.9);
  try {
    let token = null;
    try {
      token = (await window.Clerk?.session?.getToken?.()) || null;
    } catch {}
    const r = await fetch(`${API_URL}/ai/tts`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ text, voz }) });
    if (!r.ok) throw new Error(String(r.status));
    current?.pause();
    current = new Audio(URL.createObjectURL(await r.blob()));
    await current.play();
  } catch {
    speak(text, 0.9);
  }
}

export function speak(text, rate = 0.9, voice = "m") {
  play(text, rate, voice, null);
}

// Igual que speak, pero devuelve una promesa que se resuelve cuando termina la frase
// (o cuando otra frase la interrumpe). La usa el escenario de diálogos para ir frase a frase.
export function speakWait(text, rate = 0.9, voice = "m") {
  return new Promise((resolve) => play(text, rate, voice, resolve));
}

// Avance (0–1) del MP3 que suena, o null si no se sabe (voz del sistema): sirve para mover la boca a tiempo
export function audioProgress() {
  const a = current;
  if (a && !a.paused && a.duration > 0 && Number.isFinite(a.duration)) return a.currentTime / a.duration;
  return null;
}

// Corta lo que esté sonando (y resuelve las promesas pendientes de speakWait)
export function stopSpeak() {
  try {
    current?.pause();
    speechSynthesis?.cancel?.();
  } catch {}
  settle();
}

let pending = null;
function settle() {
  const r = pending;
  pending = null;
  r?.();
}

function play(text, rate, voice, onEnd) {
  // Primera frase antes de tener los índices: espera a que lleguen (si fallan, voz del sistema)
  if (!AUDIO) cargarIndices().then(() => reproducir(text, rate, voice, onEnd));
  else reproducir(text, rate, voice, onEnd);
}

function reproducir(text, rate, voice, onEnd) {
  settle();
  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    if (pending === done) pending = null;
    onEnd?.();
  };
  if (onEnd) {
    pending = done;
    // Red de seguridad por si el navegador no avisa del final
    setTimeout(done, 2500 + String(text || "").length * 110);
  }
  const t = String(text || "").trim();
  const fk = fnv("F|" + t);
  const key = voice === "f" && AUDIO_F?.has(fk) ? fk : fnv(t);
  if (AUDIO?.has(key) || AUDIO_F?.has(key)) {
    try {
      if (current && current !== elementoVoz()) current.pause();
      speechSynthesis?.cancel?.();
      const a = elementoVoz();
      const turno = ++turnoMp3;
      current = a;
      a.onended = done;
      a.src = `./audio/${key}.mp3`;
      a.defaultPlaybackRate = a.playbackRate = rate < 0.7 ? 0.75 : 1;
      // Si el navegador bloquea el audio (p. ej. iPhone tras usar el micrófono), usa la voz del sistema
      // (AbortError = otra frase ha ocupado el reproductor: no es un fallo)
      a.play().catch((error) => error?.name !== "AbortError" && turno === turnoMp3 && synth(t, rate, done));
      return;
    } catch {}
  }
  synth(t, rate, done);
}

function synth(text, rate, onEnd) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = rate;
    const voice = speechSynthesis.getVoices().find((v) => v.lang?.startsWith("es"));
    if (voice) u.voice = voice;
    if (onEnd) {
      u.onend = onEnd;
      u.onerror = onEnd;
    }
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    onEnd?.();
  }
}

// Confeti en un canvas temporal (sin dependencias)
export function confetti({ count = 140, duration = 2600 } = {}) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:200";
  document.body.appendChild(c);
  const dpr = window.devicePixelRatio || 1;
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  const g = c.getContext("2d");
  g.scale(dpr, dpr);
  const colors = ["#ff7a1a", "#ff3d8b", "#3dd6ff", "#34d399", "#fbbf24", "#c084fc"];
  const parts = Array.from({ length: count }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 200,
    y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 14 - 4,
    r: Math.random() * 6 + 4,
    a: Math.random() * Math.PI,
    va: (Math.random() - 0.5) * 0.3,
    color: colors[(Math.random() * colors.length) | 0],
  }));
  const t0 = performance.now();
  const frame = (t) => {
    g.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.vy += 0.35;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.a += p.va;
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.a);
      g.fillStyle = p.color;
      g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
      g.restore();
    }
    if (t - t0 < duration) requestAnimationFrame(frame);
    else c.remove();
  };
  requestAnimationFrame(frame);
}

// ---------- Partículas de las lecciones (v34) ----------
// Un único canvas a pantalla completa que vive solo mientras hay partículas: monedas de oro con agujero cuadrado,
// chispas, pétalos de tinta y cohetes del final. Sin dependencias; se apaga con prefers-reduced-motion.
const sinMovimiento = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
let lienzo = null;
let particulas = [];
let bucle = 0;
function asegurarLienzo() {
  if (lienzo) return lienzo;
  const c = document.createElement("canvas");
  c.className = "lx-lienzo";
  c.setAttribute("aria-hidden", "true");
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2147483000";
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  const g = c.getContext("2d");
  g.scale(dpr, dpr);
  document.body.appendChild(c);
  lienzo = { c, g };
  return lienzo;
}
function pintarMoneda(g, p) {
  const r = p.r;
  g.save();
  g.translate(p.x, p.y);
  g.rotate(p.a);
  g.scale(Math.cos(p.giro) || 0.05, 1);
  const grad = g.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
  grad.addColorStop(0, "#fffbe0");
  grad.addColorStop(0.45, "#f6d77e");
  grad.addColorStop(1, "#a8741e");
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, r, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#7a4c10";
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = "#7a4c10";
  g.fillRect(-r * 0.28, -r * 0.28, r * 0.56, r * 0.56);
  g.restore();
}
function cuadro(t) {
  const { c, g } = lienzo;
  g.clearRect(0, 0, innerWidth, innerHeight);
  const vivas = [];
  const nuevas = [];
  for (const p of particulas) {
    const edad = t - p.t0;
    if (edad < 0) {
      vivas.push(p);
      continue;
    }
    if (edad > p.vida) {
      if (p.alFinal) nuevas.push(...p.alFinal(p));
      continue;
    }
    p.vy += p.grav;
    p.vx *= p.roce;
    p.vy *= p.roce;
    p.x += p.vx;
    p.y += p.vy;
    p.a += p.va;
    p.giro += 0.18;
    const k = 1 - edad / p.vida;
    g.globalAlpha = Math.min(1, k * 1.6);
    if (p.tipo === "moneda") pintarMoneda(g, p);
    else if (p.tipo === "chispa") {
      g.fillStyle = p.color;
      g.beginPath();
      // Estrella de cuatro puntas
      const r = p.r * (0.6 + 0.4 * k);
      g.moveTo(p.x, p.y - r);
      g.quadraticCurveTo(p.x, p.y, p.x + r, p.y);
      g.quadraticCurveTo(p.x, p.y, p.x, p.y + r);
      g.quadraticCurveTo(p.x, p.y, p.x - r, p.y);
      g.quadraticCurveTo(p.x, p.y, p.x, p.y - r);
      g.fill();
    } else if (p.tipo === "cohete") {
      g.fillStyle = "#fff3c4";
      g.fillRect(p.x - 1.5, p.y - 6, 3, 10);
    } else {
      // punto (fuegos)
      g.fillStyle = p.color;
      g.beginPath();
      g.arc(p.x, p.y, p.r * (0.5 + 0.5 * k), 0, Math.PI * 2);
      g.fill();
    }
    vivas.push(p);
  }
  g.globalAlpha = 1;
  particulas = vivas.concat(nuevas);
  if (particulas.length) bucle = requestAnimationFrame(cuadro);
  else {
    bucle = 0;
    c.remove();
    lienzo = null;
  }
}
function lanzar(lista) {
  if (sinMovimiento() || typeof document === "undefined") return;
  asegurarLienzo();
  // Tope de partículas para no bajar de 60 fps en móviles modestos
  particulas = particulas.concat(lista).slice(-260);
  if (!bucle) bucle = requestAnimationFrame(cuadro);
}

/** Lluvia de monedas y chispas desde un punto (acierto). `fuerza` crece con la racha. */
export function estallido(x, y, { fuerza = 1, monedas = 14, chispas = 18 } = {}) {
  const ahora = performance.now();
  const lista = [];
  const nM = Math.round(monedas * Math.min(2.2, fuerza));
  const nC = Math.round(chispas * Math.min(2.2, fuerza));
  for (let i = 0; i < nM; i++) {
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3;
    const v = 6 + Math.random() * 7 * Math.min(1.6, fuerza);
    lista.push({ tipo: "moneda", x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, grav: 0.38, roce: 0.985, r: 7 + Math.random() * 5, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.2, giro: Math.random() * 6, t0: ahora + i * 8, vida: 1300 + Math.random() * 500 });
  }
  for (let i = 0; i < nC; i++) {
    const ang = (i / nC) * Math.PI * 2 + Math.random() * 0.3;
    const v = 3 + Math.random() * 6;
    lista.push({ tipo: "chispa", x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, grav: 0.05, roce: 0.94, r: 4 + Math.random() * 6, a: 0, va: 0, giro: 0, color: ["#fff3c4", "#f2c14e", "#ffd76a", "#ffffff"][i % 4], t0: ahora, vida: 650 + Math.random() * 350 });
  }
  lanzar(lista);
}

/** Fuegos artificiales del final: cohetes que suben y estallan en oro, laca y jade. */
export function fuegos({ cohetes = 6, duracion = 2600 } = {}) {
  if (sinMovimiento()) return;
  const ahora = performance.now();
  const colores = [["#f2c14e", "#fff3c4"], ["#ff4d5e", "#ffd0d6"], ["#4fc27c", "#d8ffe6"], ["#ffb347", "#fff1b8"]];
  const lista = [];
  for (let i = 0; i < cohetes; i++) {
    const x = innerWidth * (0.18 + Math.random() * 0.64);
    const alto = innerHeight * (0.14 + Math.random() * 0.26);
    const retraso = (i / cohetes) * duracion * 0.7 + Math.random() * 200;
    const vy = -Math.sqrt(2 * 0.22 * (innerHeight - alto));
    const [c1, c2] = colores[i % colores.length];
    lista.push({
      tipo: "cohete", x, y: innerHeight + 10, vx: (Math.random() - 0.5) * 1.2, vy, grav: 0.22, roce: 1, r: 2, a: 0, va: 0, giro: 0, t0: ahora + retraso, vida: Math.abs(vy / 0.22) * 16.7,
      alFinal: (p) => {
        sfx("fuego");
        const n = 46;
        const chispas = [];
        for (let k = 0; k < n; k++) {
          const ang = (k / n) * Math.PI * 2;
          const v = 2.5 + Math.random() * 3.5;
          chispas.push({ tipo: "punto", x: p.x, y: p.y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, grav: 0.06, roce: 0.97, r: 2.6, a: 0, va: 0, giro: 0, color: k % 3 ? c1 : c2, t0: performance.now(), vida: 900 + Math.random() * 500 });
        }
        return chispas;
      },
    });
  }
  lanzar(lista);
}
