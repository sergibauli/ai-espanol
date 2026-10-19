import { useEffect, useRef, useState } from 'react';
import { Play, Square, FileText } from 'lucide-react';
import { speakScript, ttsAvailable } from '../lib/speech.js';

/** Reproduce un guion con voces españolas del navegador. maxPlays limita las escuchas (examen). */
export default function AudioPlayer({ script, maxPlays, allowTranscript = true }) {
  const [playing, setPlaying] = useState(false);
  const [plays, setPlays] = useState(0);
  const [show, setShow] = useState(false);
  const stop = useRef(() => {});
  useEffect(() => () => stop.current(), []);

  if (!ttsAvailable()) return <p className="muted text-sm">Tu navegador no permite reproducir audio sintetizado. Lee la transcripción.</p>;
  const left = maxPlays ? maxPlays - plays : null;

  function toggle() {
    if (playing) { stop.current(); setPlaying(false); return; }
    setPlays(p => p + 1);
    setPlaying(true);
    stop.current = speakScript(script, { onEnd: () => setPlaying(false) });
  }

  return (
    <div className="card flex flex-wrap items-center gap-3 p-3">
      <button className="btn-primary" onClick={toggle} disabled={!playing && left === 0}>
        {playing ? <Square size={16} /> : <Play size={16} />} {playing ? 'Parar' : plays ? 'Escuchar otra vez' : 'Escuchar'}
      </button>
      {left !== null && <span className="muted text-sm">{left} {left === 1 ? 'escucha restante' : 'escuchas restantes'}</span>}
      <span className="flex-1" />
      {allowTranscript && (
        <button className="btn-ghost" onClick={() => setShow(!show)}><FileText size={16} /> {show ? 'Ocultar' : 'Transcripción'}</button>
      )}
      {show && <p className="prose-es muted w-full border-t border-line pt-3 text-sm">{script.replace(/\[[^\]]*\]/g, '').replace(/\n{2,}/g, '\n')}</p>}
    </div>
  );
}
