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

import AUDIO_INDEX from "../../data/audio-index.json";
import AUDIO_INDEX_F from "../../data/audio-index-f.json";

// Audios pregrabados con la voz del profesor (Fish Audio): mismo hash FNV-1a que scripts de generación
const AUDIO = new Set(AUDIO_INDEX);
const AUDIO_F = new Set(AUDIO_INDEX_F);
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
export function speak(text, rate = 0.9, voice = "m") {
  const t = String(text || "").trim();
  const fk = fnv("F|" + t);
  const key = voice === "f" && AUDIO_F.has(fk) ? fk : fnv(t);
  if (AUDIO.has(key) || AUDIO_F.has(key)) {
    try {
      current?.pause();
      speechSynthesis?.cancel?.();
      current = new Audio(`./audio/${key}.mp3`);
      current.playbackRate = rate < 0.7 ? 0.75 : 1;
      current.play().catch(() => {});
      return;
    } catch {}
  }
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = rate;
    const voice = speechSynthesis.getVoices().find((v) => v.lang?.startsWith("es"));
    if (voice) u.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {}
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
