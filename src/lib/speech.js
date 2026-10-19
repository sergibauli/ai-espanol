// Síntesis de voz del navegador con voz española nativa cuando existe.
let voices = [];
function refresh() { voices = window.speechSynthesis?.getVoices() ?? []; }
if (typeof window !== 'undefined' && window.speechSynthesis) {
  refresh();
  window.speechSynthesis.onvoiceschanged = refresh;
}

export const ttsAvailable = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

function voiceFor(gender) {
  const es = voices.filter(v => v.lang?.toLowerCase().startsWith('es'));
  const spain = es.filter(v => /es[-_]es/i.test(v.lang));
  const pool = spain.length ? spain : es;
  if (!pool.length) return null;
  const female = /monica|mónica|paulina|laura|elvira|helena|lucia|female|mujer/i;
  const match = pool.filter(v => (gender === 'mujer') === female.test(v.name));
  return (match.length ? match : pool)[0];
}

/** Lee un guion con marcas [VOZ n - mujer/hombre ...] y [pausa n s]. Devuelve una función para parar. */
export function speakScript(script, { rate = 0.92, onEnd } = {}) {
  if (!ttsAvailable()) return () => {};
  window.speechSynthesis.cancel();
  const parts = [];
  const re = /\[VOZ[^\]]*?(mujer|hombre)[^\]]*\]|\[pausa (\d+) ?s\]|\[AUDIO \d+\]/gi;
  let gender = 'mujer';
  let last = 0;
  let m;
  while ((m = re.exec(script))) {
    const chunk = script.slice(last, m.index).trim();
    if (chunk) parts.push({ text: chunk, gender });
    if (m[1]) gender = m[1].toLowerCase();
    if (m[2]) parts.push({ pause: Number(m[2]) * 1000 });
    last = re.lastIndex;
  }
  const tail = script.slice(last).trim();
  if (tail) parts.push({ text: tail, gender });

  let stopped = false;
  let timer;
  const run = i => {
    if (stopped) return;
    if (i >= parts.length) { onEnd?.(); return; }
    const p = parts[i];
    if (p.pause) { timer = setTimeout(() => run(i + 1), p.pause); return; }
    const u = new SpeechSynthesisUtterance(p.text);
    u.lang = 'es-ES';
    u.rate = rate;
    const v = voiceFor(p.gender);
    if (v) u.voice = v;
    u.onend = () => run(i + 1);
    window.speechSynthesis.speak(u);
  };
  run(0);
  return () => { stopped = true; clearTimeout(timer); window.speechSynthesis.cancel(); };
}

export const speak = (text, opts) => speakScript(text, opts);
