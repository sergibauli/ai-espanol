import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { correctWriting } from '../lib/api.js';
import { useSession } from '../lib/auth.jsx';
import { countAiUse, recordActivity, useStore } from '../lib/store.js';
import { FREE_LIMITS } from '../lib/plans.js';

const words = t => (t.trim() ? t.trim().split(/\s+/).length : 0);

/** Redacción con contador de palabras y corrección por IA (limitada en el plan gratuito). */
export default function WritingBox({ level, task, min, max, storageKey, onDone }) {
  const { gate, premium, openPaywall } = useSession();
  const used = useStore(s => s.usage.ai);
  const [text, setText] = useState(() => { try { return localStorage.getItem(storageKey) || ''; } catch { return ''; } });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const n = words(text);

  function save(v) {
    setText(v);
    try { localStorage.setItem(storageKey, v); } catch { /* sin almacenamiento */ }
  }

  async function correct() {
    if (!gate('ai')) return;
    setBusy(true);
    setError('');
    try {
      const r = await correctWriting({ level, task, text });
      countAiUse();
      setResult(r);
      recordActivity({ type: 'writing', skill: 'escritura', ok: r.score ?? 0, total: r.max ?? 0, xp: 30, ref: storageKey });
      onDone?.(r);
    } catch (e) {
      if (e.code === 'quota') openPaywall('ai');
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  const tone = min && n < min ? 'text-gold' : max && n > max ? 'text-bad' : 'text-ok';

  return (
    <div>
      <textarea className="input min-h-56 font-[inherit] leading-relaxed" value={text} onChange={e => save(e.target.value)} placeholder="Escribe aquí tu texto…" />
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
        <span className={`tabular-nums ${tone}`}>{n} palabras{min ? ` · objetivo ${min}${max ? `–${max}` : ''}` : ''}</span>
        <span className="flex-1" />
        {!premium && <span className="muted text-xs">{Math.max(0, FREE_LIMITS.aiPerDay - used)} correcciones gratis hoy</span>}
        <button className="btn-primary" onClick={correct} disabled={busy || n < 10}>
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Corregir con IA
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
      {result && (
        <div className="card mt-4 space-y-3 p-4 text-sm">
          {result.max ? <div className="text-lg font-bold">{result.score}/{result.max} <span className="muted text-sm font-normal">{result.verdict}</span></div> : null}
          {result.summary && <p>{result.summary}</p>}
          {result.criteria?.length > 0 && (
            <ul className="space-y-1">
              {result.criteria.map(c => <li key={c.name} className="flex justify-between gap-3"><span>{c.name}</span><span className="tabular-nums">{c.score}/{c.max}</span></li>)}
            </ul>
          )}
          {result.errors?.length > 0 && (
            <div>
              <div className="font-semibold">Correcciones</div>
              <ul className="mt-1 space-y-1.5">
                {result.errors.map((e, i) => <li key={i}><s className="text-bad">{e.original}</s> → <b className="text-ok">{e.correction}</b> <span className="muted">· {e.explanation}</span></li>)}
              </ul>
            </div>
          )}
          {result.improved && <details><summary className="cursor-pointer font-semibold">Versión mejorada</summary><p className="prose-es mt-2">{result.improved}</p></details>}
        </div>
      )}
    </div>
  );
}
