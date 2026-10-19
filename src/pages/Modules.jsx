import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Check } from 'lucide-react';
import { LEVELS, LEVEL_INFO, loadThemes } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { useStore } from '../lib/store.js';
import { Loading, Ring } from '../components/ui.jsx';

const SECTIONS = [
  { id: 'vocab', label: 'Vocabulario' },
  { id: 'lectura', label: 'Lectura' },
  { id: 'audicion', label: 'Audición' },
  { id: 'escritura', label: 'Escritura' },
  { id: 'oral', label: 'Expresión oral' },
];

export default function Modules() {
  const myLevel = useStore(s => s.profile.level);
  const progress = useStore(s => s.themes);
  const [level, setLevel] = useState(myLevel);
  const [q, setQ] = useState('');
  const { data, loading } = useAsync(() => loadThemes(level), [level]);

  const list = (data || []).filter(t => t.theme.toLowerCase().includes(q.toLowerCase()));
  const secsDone = t => SECTIONS.filter(sec => progress[`${level}-${t.id}`]?.[sec] !== undefined);
  const total = (data || []).length || 1;
  const themesDone = (data || []).filter(t => secsDone(t).length === SECTIONS.length).length;
  const overall = (data || []).reduce((a, t) => a + secsDone(t).length, 0) / (total * SECTIONS.length);
  const info = LEVEL_INFO[level];

  return (
    <>
      {/* Hero del nivel */}
      <div className="lvl-hero mb-6 p-6" style={{ '--lv': info.color }}>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {LEVELS.map(L => (
                <button key={L} data-on={L === level ? '1' : '0'} onClick={() => setLevel(L)} className="lvl-pill">
                  {L} · {LEVEL_INFO[L].name}
                </button>
              ))}
            </div>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
              DELE {level} <span className="font-medium opacity-80">· {info.name} {info.zh}</span>
            </h1>
            <p className="mt-1 text-sm opacity-85">{total} temas · vocabulario, lectura, audición, escritura y oral.</p>
          </div>
          <div className="flex items-center gap-5">
            <Ring value={overall} size={84} stroke={8} color="#fff" track="rgb(255 255 255 / .25)" className="pop-in">
              <div className="text-center leading-none">
                <div className="text-lg font-black tabular-nums">{Math.round(overall * 100)}%</div>
              </div>
            </Ring>
            <div className="text-sm leading-tight">
              <div className="text-2xl font-black tabular-nums">{themesDone}<span className="opacity-70">/{total}</span></div>
              <div className="opacity-80">temas completados</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
        <input className="input !pl-10" placeholder="Buscar tema…" value={q} onChange={e => setQ(e.target.value)} />
      </div>

      {loading ? <Loading /> : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(t => {
            const done = secsDone(t);
            const complete = done.length === SECTIONS.length;
            return (
              <Link
                key={t.id}
                to={`/modulos/${level}/${t.id}`}
                style={{ '--lv': info.color }}
                className="card card-lift lvl-shine group relative p-4 transition hover:border-[var(--lv)]"
              >
                <div className="flex items-start gap-3">
                  <span className="lvl-medal grid size-12 shrink-0 place-items-center text-lg font-black tabular-nums">
                    {String(t.id).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 font-semibold transition group-hover:text-[var(--lv)]">{t.theme}</h3>
                    <p className="muted mt-1 line-clamp-1 text-xs">{t.vocabulary.slice(0, 4).map(v => v.word).join(' · ')}</p>
                  </div>
                  <Ring value={done.length / SECTIONS.length} size={40} stroke={4} color={info.color}>
                    <span className="text-[10px] font-bold tabular-nums">{done.length}/5</span>
                  </Ring>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <div className="flex gap-1.5">
                    {SECTIONS.map(s => (
                      <span
                        key={s.id}
                        title={s.label}
                        className={`size-2.5 rounded-full transition ${done.some(d => d.id === s.id) ? '' : 'bg-line'}`}
                        style={done.some(d => d.id === s.id) ? { background: info.color } : undefined}
                      />
                    ))}
                  </div>
                  {complete && (
                    <span className="chip bg-gold-soft text-gold"><Check size={12} /> Completado</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
