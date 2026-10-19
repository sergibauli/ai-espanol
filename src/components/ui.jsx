import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

export function PageHeader({ title, sub, back, right }) {
  return (
    <header className="mb-6 flex items-start gap-3">
      {back && (
        <Link to={back} className="btn-ghost mt-0.5 !px-2.5" aria-label="Volver"><ArrowLeft size={18} /></Link>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="h1">{title}</h1>
        {sub && <p className="muted mt-1 text-sm">{sub}</p>}
      </div>
      {right}
    </header>
  );
}

export function Progress({ value, className = '' }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-surface-2 ${className}`}>
      <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${Math.round(Math.min(1, value) * 100)}%` }} />
    </div>
  );
}

export function Stat({ icon: Icon, label, value, tone = 'brand' }) {
  const tones = { brand: 'bg-brand-soft text-brand', ok: 'bg-ok-soft text-ok', gold: 'bg-gold-soft text-gold' };
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={20} /></span>
      <div>
        <div className="text-xl font-bold leading-none tabular-nums">{value}</div>
        <div className="muted mt-1 text-xs">{label}</div>
      </div>
    </div>
  );
}

export function Loading({ label = 'Cargando…' }) {
  return <div className="muted flex items-center gap-2 p-8 text-sm"><Loader2 className="animate-spin" size={18} /> {label}</div>;
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="no-scrollbar -mx-4 mb-5 flex gap-1 overflow-x-auto px-4">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`chip shrink-0 !px-3.5 !py-2 text-sm transition ${value === t.id ? 'bg-ink text-bg' : 'bg-surface-2 text-ink-2 hover:text-ink'}`}
        >
          {t.icon && <t.icon size={15} />} {t.label}
          {t.done && <span className="size-1.5 rounded-full bg-ok" />}
        </button>
      ))}
    </div>
  );
}

export function LevelBadge({ level }) {
  return <span className="chip bg-brand-soft text-brand">{level}</span>;
}
