import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { LEVELS, LEVEL_INFO, loadThemes } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { useStore } from '../lib/store.js';
import { PageHeader, Tabs, Loading, Progress } from '../components/ui.jsx';

const SECTIONS = ['vocab', 'lectura', 'audicion', 'escritura', 'oral'];

export default function Modules() {
  const myLevel = useStore(s => s.profile.level);
  const progress = useStore(s => s.themes);
  const [level, setLevel] = useState(myLevel);
  const [q, setQ] = useState('');
  const { data, loading } = useAsync(() => loadThemes(level), [level]);

  const list = (data || []).filter(t => t.theme.toLowerCase().includes(q.toLowerCase()));
  const doneCount = t => SECTIONS.filter(sec => progress[`${level}-${t.id}`]?.[sec] !== undefined).length;

  return (
    <>
      <PageHeader title="Módulos" sub="50 temas por nivel con vocabulario, lectura, audición, escritura y expresión oral." />
      <Tabs value={level} onChange={setLevel} tabs={LEVELS.map(L => ({ id: L, label: `${L} · ${LEVEL_INFO[L].name}` }))} />
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
        <input className="input !pl-10" placeholder="Buscar tema…" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {loading ? <Loading /> : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(t => {
            const d = doneCount(t);
            return (
              <Link key={t.id} to={`/modulos/${level}/${t.id}`} className="card group p-4 transition hover:border-brand">
                <div className="flex items-start justify-between gap-2">
                  <span className="muted text-xs font-semibold">TEMA {t.id}</span>
                  {d === SECTIONS.length && <span className="chip bg-ok-soft text-ok">Completado</span>}
                </div>
                <h3 className="mt-1 line-clamp-2 font-semibold group-hover:text-brand">{t.theme}</h3>
                <p className="muted mt-1 line-clamp-1 text-xs">{t.vocabulary.slice(0, 4).map(v => v.word).join(' · ')}</p>
                <Progress value={d / SECTIONS.length} className="mt-3" />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
