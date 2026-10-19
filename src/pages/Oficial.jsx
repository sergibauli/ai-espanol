import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lock, Clock, Trophy } from 'lucide-react';
import { LEVELS, loadOficiales } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { useStore } from '../lib/store.js';
import { useSession } from '../lib/auth.jsx';
import { FREE_LIMITS } from '../lib/plans.js';
import { PageHeader, Tabs, Loading } from '../components/ui.jsx';

export default function Oficial() {
  const myLevel = useStore(s => s.profile.level);
  const results = useStore(s => s.oficiales);
  const { level = myLevel } = useParams();
  const nav = useNavigate();
  const { premium, openPaywall } = useSession();
  const { data, loading } = useAsync(() => loadOficiales(level), [level]);

  const best = m => {
    const r = results.filter(x => x.level === level && x.modelo === m);
    return r.length ? Math.max(...r.map(x => x.score)) : null;
  };

  return (
    <>
      <PageHeader title="Exámenes oficiales DELE" sub="20 modelos completos por nivel con las cuatro pruebas, cronómetro y nota APTO/NO APTO." />
      <Tabs value={level} onChange={L => nav(`/oficial/${L}`)} tabs={LEVELS.map(L => ({ id: L, label: `DELE ${L}` }))} />
      {loading ? <Loading /> : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(ex => {
            const locked = !premium && ex.modelo > FREE_LIMITS.oficialFreeModels;
            const b = best(ex.modelo);
            const mins = ex.pruebas.reduce((a, p) => a + (p.duracion || 0), 0);
            const body = (
              <>
                <div className="flex items-center justify-between">
                  <span className="muted text-xs font-semibold">MODELO {String(ex.modelo).padStart(2, '0')}</span>
                  {locked ? <Lock size={15} className="text-ink-3" /> : b !== null ? <span className={`chip ${b >= 60 ? 'bg-ok-soft text-ok' : 'bg-surface-2'}`}><Trophy size={12} /> {b}/100</span> : null}
                </div>
                <h3 className="mt-1 line-clamp-2 font-semibold">{ex.temaCentral}</h3>
                <p className="muted mt-2 flex items-center gap-1 text-xs"><Clock size={12} /> {mins} min · {ex.pruebas.length} pruebas</p>
              </>
            );
            return locked ? (
              <button key={ex.modelo} onClick={() => openPaywall('oficial')} className="card p-4 text-left opacity-80 transition hover:border-brand">{body}</button>
            ) : (
              <Link key={ex.modelo} to={`/oficial/${level}/${ex.modelo}`} className="card p-4 transition hover:border-brand">{body}</Link>
            );
          })}
        </div>
      )}
    </>
  );
}
