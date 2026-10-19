import { useMemo, useState } from 'react';
import { Search, Volume2, Plus, Check } from 'lucide-react';
import { LEVELS, loadVocab } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { useStore, addCards } from '../lib/store.js';
import { speak } from '../lib/speech.js';
import { PageHeader, Tabs, Loading } from '../components/ui.jsx';

export default function Dictionary() {
  const myLevel = useStore(s => s.profile.level);
  const srs = useStore(s => s.srs);
  const [level, setLevel] = useState(myLevel);
  const [q, setQ] = useState('');
  const { data, loading } = useAsync(() => loadVocab(level), [level]);
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return (data || []).filter(v => !n || v.es.toLowerCase().includes(n) || v.zh.includes(n) || v.theme?.toLowerCase().includes(n));
  }, [data, q]);

  return (
    <>
      <PageHeader title="Diccionario" sub="Español–chino por niveles, con ejemplos y audio. 西汉词典" />
      <Tabs value={level} onChange={setLevel} tabs={LEVELS.map(L => ({ id: L, label: L }))} />
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
        <input className="input !pl-10" placeholder="Busca en español, 中文 o por tema…" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {loading ? <Loading /> : (
        <>
          <p className="muted mb-3 text-xs">{list.length} resultados{list.length > 150 ? ' · mostrando 150' : ''}</p>
          <div className="grid gap-2 md:grid-cols-2">
            {list.slice(0, 150).map(v => (
              <div key={v.id} className="card flex gap-3 p-4">
                <button onClick={() => speak(v.es)} className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-2 hover:text-brand" aria-label={`Escuchar ${v.es}`}><Volume2 size={17} /></button>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{v.es} <span className="font-normal text-brand">{v.zh}</span></div>
                  <div className="muted text-sm">{v.def}</div>
                  {v.ex && <div className="mt-1 text-sm italic">«{v.ex}»</div>}
                  <div className="muted mt-1 text-xs">{v.theme}</div>
                </div>
                <button onClick={() => addCards([v.id])} disabled={Boolean(srs[v.id])} className="self-start p-1 text-ink-3 hover:text-brand disabled:text-ok" aria-label="Añadir al repaso">
                  {srs[v.id] ? <Check size={18} /> : <Plus size={18} />}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
