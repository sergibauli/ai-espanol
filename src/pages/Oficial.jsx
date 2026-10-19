import { useNavigate, useParams } from 'react-router-dom';
import { Lock, Clock, Trophy, ListChecks } from 'lucide-react';
import { LEVELS, LEVEL_INFO, loadOficiales } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { useStore } from '../lib/store.js';
import { useSession } from '../lib/auth.jsx';
import { FREE_LIMITS } from '../lib/plans.js';
import { Loading, Ring } from '../components/ui.jsx';

export default function Oficial() {
  const myLevel = useStore(s => s.profile.level);
  const results = useStore(s => s.oficiales);
  const { level = myLevel } = useParams();
  const nav = useNavigate();
  const { premium, openPaywall } = useSession();
  const { data, loading } = useAsync(() => loadOficiales(level), [level]);

  const mine = results.filter(x => x.level === level);
  const best = m => {
    const r = mine.filter(x => x.modelo === m);
    return r.length ? Math.max(...r.map(x => x.score)) : null;
  };
  const attempts = m => mine.filter(x => x.modelo === m).length;
  const doneCount = new Set(mine.map(x => x.modelo)).size;
  const withScore = mine.map(x => x.score);
  const avg = withScore.length ? Math.round(withScore.reduce((a, b) => a + b, 0) / withScore.length) : null;
  const bestAll = withScore.length ? Math.max(...withScore) : null;
  const info = LEVEL_INFO[level];

  return (
    <>
      {/* Hero del nivel */}
      <div className="lvl-hero mb-6 p-6" style={{ '--lv': info.color }}>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {LEVELS.map(L => (
                <button key={L} data-on={L === level ? '1' : '0'} onClick={() => nav(`/oficial/${L}`)} className="lvl-pill">DELE {L}</button>
              ))}
            </div>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Exámenes oficiales DELE {level}</h1>
            <p className="mt-1 text-sm opacity-85">{(data || []).length} modelos completos · cuatro pruebas, cronómetro y nota APTO/NO APTO.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Ring value={doneCount / ((data || []).length || 1)} size={70} stroke={7} color="#fff" track="rgb(255 255 255 / .25)">
                <div className="text-center leading-none">
                  <div className="text-base font-black tabular-nums">{doneCount}</div>
                  <div className="text-[9px] opacity-80">de {(data || []).length}</div>
                </div>
              </Ring>
              <div className="mt-1 text-[11px] opacity-80">hechos</div>
            </div>
            <div className="space-y-1 text-sm">
              <div><span className="text-xl font-black tabular-nums">{bestAll ?? '—'}</span> <span className="opacity-75">mejor nota</span></div>
              <div><span className="text-xl font-black tabular-nums">{avg ?? '—'}</span> <span className="opacity-75">media</span></div>
            </div>
          </div>
        </div>
      </div>

      {loading ? <Loading /> : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(ex => {
            const locked = !premium && ex.modelo > FREE_LIMITS.oficialFreeModels;
            const b = best(ex.modelo);
            const mins = ex.pruebas.reduce((a, p) => a + (p.duracion || 0), 0);
            const n = attempts(ex.modelo);
            return (
              <div key={ex.modelo} style={{ '--lv': info.color }} className="relative">
                <div
                  role="button" tabIndex={0}
                  onClick={() => locked ? openPaywall('oficial') : nav(`/oficial/${level}/${ex.modelo}`)}
                  onKeyDown={e => { if (e.key === 'Enter') (locked ? openPaywall('oficial') : nav(`/oficial/${level}/${ex.modelo}`)); }}
                  className={`card card-lift lvl-shine relative h-full cursor-pointer overflow-hidden p-4 transition hover:border-[var(--lv)] ${locked ? '' : ''}`}
                >
                  {/* banda lateral del nivel */}
                  <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: `linear-gradient(180deg, ${info.color}, color-mix(in oklab, ${info.color} 55%, #000))` }} />
                  <div className={`flex items-start gap-3 pl-2 ${locked ? 'blur-[2px] select-none' : ''}`} aria-hidden={locked}>
                    <span className="lvl-medal grid size-12 shrink-0 place-items-center text-sm font-black tabular-nums leading-none">
                      M{String(ex.modelo).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold">{ex.temaCentral}</h3>
                      <p className="muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="inline-flex items-center gap-1"><Clock size={12} /> {mins} min</span>
                        <span className="inline-flex items-center gap-1"><ListChecks size={12} /> {ex.pruebas.length} pruebas</span>
                        {n > 0 && <span className="inline-flex items-center gap-1"><Trophy size={12} className="text-gold" /> {n} {n === 1 ? 'intento' : 'intentos'}</span>}
                      </p>
                    </div>
                    {b !== null && (
                      <Ring value={b / 100} size={46} stroke={4.5} color={b >= 60 ? 'var(--ok)' : 'var(--gold)'}>
                        <span className="text-[11px] font-black tabular-nums">{b}</span>
                      </Ring>
                    )}
                  </div>
                  {locked && (
                    <div className="absolute inset-0 z-10 grid place-items-center">
                      <span className="chip bg-surface/95 border border-line !px-3 !py-1.5 text-brand shadow"><Lock size={13} /> Premium</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
