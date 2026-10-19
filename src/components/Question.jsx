import { Check, X } from 'lucide-react';

/** Pregunta de opción múltiple con corrección inmediata. */
export default function Question({ n, text, options, answer, picked, onPick, explanation, letters = true }) {
  const done = picked !== undefined && picked !== null;
  return (
    <div className="card p-4">
      <p className="font-medium"><span className="text-ink-3">{n}. </span>{text}</p>
      <div className="mt-3 grid gap-2">
        {options.map((o, i) => {
          const isAns = i === answer;
          const isPick = i === picked;
          const tone = !done ? 'border-line hover:border-brand' : isAns ? 'border-ok bg-ok-soft' : isPick ? 'border-bad bg-bad-soft' : 'border-line opacity-60';
          return (
            <button key={i} disabled={done} onClick={() => onPick(i)} className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${tone}`}>
              {letters && <span className="font-semibold text-ink-3">{String.fromCharCode(65 + i)}</span>}
              <span className="flex-1">{o.replace(/^[a-dA-D][).]\s+/, '')}</span>
              {done && isAns && <Check size={16} className="text-ok" />}
              {done && isPick && !isAns && <X size={16} className="text-bad" />}
            </button>
          );
        })}
      </div>
      {done && explanation && <p className="muted mt-3 rounded-xl bg-surface-2 p-3 text-sm">{explanation}</p>}
    </div>
  );
}
