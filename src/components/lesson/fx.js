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
      current?.pause();
      speechSynthesis?.cancel?.();
      const a = new Audio(`./audio/${key}.mp3`);
      current = a;
      a.playbackRate = rate < 0.7 ? 0.75 : 1;
      a.onended = done;
      // Si el navegador bloquea el audio (p. ej. iPhone tras usar el micrófono), usa la voz del sistema
      a.play().catch(() => synth(t, rate, done));
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
