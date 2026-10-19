import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Mic, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { tutorReply } from '../lib/api.js';
import { useSession } from '../lib/auth.jsx';
import { useStore, countAiUse, recordActivity } from '../lib/store.js';
import { speak } from '../lib/speech.js';
import { FREE_LIMITS } from '../lib/plans.js';
import { PageHeader } from '../components/ui.jsx';

const SCENARIOS = ['Presentarte en una entrevista de trabajo', 'Pedir en un restaurante', 'Alquilar un piso', 'Hablar de tus últimas vacaciones', 'Ir al médico'];
const Recognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function Tutor() {
  const [sp] = useSearchParams();
  const level = useStore(s => s.profile.level);
  const used = useStore(s => s.usage.ai);
  const { gate, premium, openPaywall } = useSession();
  const [scenario, setScenario] = useState(sp.get('tema') || '');
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [voice, setVoice] = useState(true);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  async function send(content) {
    if (!content.trim() || busy) return;
    if (!gate('ai', { trigger: 'tutor' })) return;
    const next = [...msgs, { role: 'user', content }];
    setMsgs(next);
    setText('');
    setBusy(true);
    setError('');
    try {
      const r = await tutorReply({ level, scenario, messages: next });
      countAiUse();
      setMsgs([...next, { role: 'assistant', content: r.reply, correction: r.correction }]);
      if (voice) speak(r.reply);
      recordActivity({ type: 'tutor', xp: 5, ref: 'tutor' });
    } catch (e) {
      if (e.code === 'quota') openPaywall('tutor');
      setError(e.message);
      setMsgs(msgs);
    } finally {
      setBusy(false);
    }
  }

  function listen() {
    if (!Recognition) return;
    const r = new Recognition();
    r.lang = 'es-ES';
    r.interimResults = false;
    r.onresult = e => send(e.results[0][0].transcript);
    r.onend = () => setListening(false);
    setListening(true);
    r.start();
  }

  return (
    <div className="flex min-h-[calc(100dvh-12rem)] flex-col">
      <PageHeader
        title="Tutor IA"
        sub={`Conversa en español a nivel ${level}. El tutor te corrige con tacto.`}
        right={<button className="btn-ghost !px-2.5" onClick={() => setVoice(!voice)} aria-label="Voz">{voice ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>}
      />
      {!msgs.length && (
        <div className="mb-4">
          <label className="text-sm font-semibold">Situación (opcional)</label>
          <input className="input mt-2" value={scenario} onChange={e => setScenario(e.target.value)} placeholder="Ej.: pedir información en una estación" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SCENARIOS.map(s => <button key={s} onClick={() => setScenario(s)} className="chip bg-surface-2 hover:text-brand">{s}</button>)}
          </div>
        </div>
      )}
      <div className="flex-1 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-brand text-brand-ink' : 'card'}`}>
              {m.content}
              {m.correction && <div className="mt-2 rounded-lg bg-gold-soft p-2 text-xs text-ink">✏️ {m.correction}</div>}
            </div>
          </div>
        ))}
        {busy && <div className="muted flex items-center gap-2 text-sm"><Loader2 size={16} className="animate-spin" /> Escribiendo…</div>}
        <div ref={end} />
      </div>
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
      <form className="sticky bottom-20 mt-4 flex gap-2 rounded-2xl bg-bg py-2 lg:bottom-4" onSubmit={e => { e.preventDefault(); send(text); }}>
        {Recognition && <button type="button" onClick={listen} className={`btn-ghost !px-3 ${listening ? 'text-brand' : ''}`} aria-label="Hablar"><Mic size={18} /></button>}
        <input className="input" value={text} onChange={e => setText(e.target.value)} placeholder={msgs.length ? 'Escribe tu respuesta…' : '¡Hola! Empieza la conversación…'} />
        <button className="btn-primary !px-3" disabled={busy} aria-label="Enviar"><Send size={18} /></button>
      </form>
      {!premium && <p className="muted text-center text-xs">{Math.max(0, FREE_LIMITS.aiPerDay - used)} mensajes con IA gratis hoy</p>}
    </div>
  );
}
