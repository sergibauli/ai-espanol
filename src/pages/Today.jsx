import { Link } from 'react-router-dom';
import { Flame, Zap, Repeat, CheckCircle2, Circle, TrendingUp, TrendingDown, AlertTriangle, Crown, CalendarDays } from 'lucide-react';
import { useStore, setProfile } from '../lib/store.js';
import { loadThemes } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { dailyPlan, nudges, dueCards, accuracy, SKILL_LABEL, weakestSkill } from '../lib/adaptive.js';
import { useSession } from '../lib/auth.jsx';
import { Stat, Progress } from '../components/ui.jsx';

export default function Today() {
  const s = useStore();
  const { premium, openPaywall } = useSession();
  const { level, name, minutesPerDay, examDate } = s.profile;
  const { data: themes } = useAsync(() => loadThemes(level), [level]);
  const plan = dailyPlan(s, themes);
  const alerts = nudges(s);
  const due = dueCards(s.srs).length;
  const days = examDate ? Math.ceil((new Date(examDate) - Date.now()) / 864e5) : null;
  const weak = weakestSkill(s.skills);
  const hour = new Date().getHours();
  const hello = hour < 13 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="space-y-6">
      <div>
        <p className="muted text-sm">{hello}{name ? `, ${name}` : ''}</p>
        <h1 className="h1 mt-1">Tu plan de hoy</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={Flame} label="Días de racha" value={s.streak.count} tone="gold" />
        <Stat icon={Zap} label="XP hoy" value={s.today.xp} />
        <Stat icon={Repeat} label="Para repasar" value={due} tone="ok" />
        <Stat icon={CalendarDays} label={days !== null ? 'Días al examen' : 'Minutos hoy'} value={days !== null ? Math.max(0, days) : `${s.today.minutes}/${minutesPerDay}`} />
      </div>

      {alerts.map(a => <Nudge key={a.kind} a={a} premium={premium} openPaywall={openPaywall} />)}

      <section className="card p-2">
        <div className="flex items-center justify-between px-3 pb-1 pt-3">
          <h2 className="font-semibold">Actividades sugeridas</h2>
          <span className="muted text-xs">{plan.filter(t => t.done).length}/{plan.length} hechas</span>
        </div>
        <Progress value={s.today.minutes / minutesPerDay} className="mx-3 mb-2" />
        <ul>
          {plan.map(t => (
            <li key={t.id}>
              <Link to={t.to} className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-surface-2">
                {t.done ? <CheckCircle2 className="shrink-0 text-ok" size={22} /> : <Circle className="shrink-0 text-ink-3" size={22} />}
                <div className="min-w-0 flex-1">
                  <div className={`truncate font-medium ${t.done ? 'text-ink-3 line-through' : ''}`}>{t.title}</div>
                  <div className="muted truncate text-xs">{t.sub}</div>
                </div>
                <span className="muted shrink-0 text-xs">{t.minutes} min</span>
              </Link>
            </li>
          ))}
          {!plan.length && <li className="muted p-3 text-sm">Cargando tu plan…</li>}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="font-semibold">Tus destrezas</h2>
          <div className="mt-4 space-y-3">
            {Object.entries(s.skills).map(([k, v]) => {
              const a = accuracy(v);
              return (
                <div key={k}>
                  <div className="mb-1 flex justify-between text-sm"><span>{SKILL_LABEL[k]}</span><span className="muted tabular-nums">{a === null ? '—' : `${Math.round(a * 100)} %`}</span></div>
                  <Progress value={a ?? 0} />
                </div>
              );
            })}
          </div>
          {weak && <p className="muted mt-4 text-sm">Tu punto más débil ahora es <b className="text-ink">{SKILL_LABEL[weak.skill].toLowerCase()}</b>; el plan diario lo refuerza automáticamente.</p>}
        </div>

        {!premium ? (
          <div className="card flex flex-col justify-between bg-brand-soft p-5">
            <div>
              <div className="flex items-center gap-2 font-semibold text-brand"><Crown size={18} /> Premium</div>
              <p className="mt-2 text-sm">Los 80 modelos oficiales con nota APTO/NO APTO, corrección de redacciones con IA y tutor de conversación sin límite.</p>
            </div>
            <Link to="/premium" className="btn-primary mt-4 self-start">Ver planes</Link>
          </div>
        ) : (
          <div className="card p-5">
            <h2 className="font-semibold">Últimos simulacros</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {s.oficiales.slice(-4).reverse().map(o => (
                <li key={o.date} className="flex justify-between"><span>{o.level} · Modelo {o.modelo}</span><span className="tabular-nums">{o.score}/{o.max}</span></li>
              ))}
              {!s.oficiales.length && <li className="muted">Aún no has hecho ninguno.</li>}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

function Nudge({ a, premium, openPaywall }) {
  if (a.kind === 'level') {
    const up = a.dir === 'up';
    return (
      <div className={`card flex flex-wrap items-center gap-3 p-4 ${up ? 'border-ok' : 'border-gold'}`}>
        {up ? <TrendingUp className="text-ok" /> : <TrendingDown className="text-gold" />}
        <p className="flex-1 text-sm">
          {up ? `¡Vas muy bien! Llevas un ${Math.round(a.acc * 100)} % de aciertos. ¿Subimos a ${a.to}?` : `Este nivel te está costando (${Math.round(a.acc * 100)} %). ¿Afianzamos en ${a.to} unos días?`}
        </p>
        <button className="btn-primary" onClick={() => setProfile({ level: a.to })}>Cambiar a {a.to}</button>
      </div>
    );
  }
  if (a.kind === 'streak-risk') {
    return (
      <div className="card flex items-center gap-3 border-gold p-4 text-sm">
        <AlertTriangle className="shrink-0 text-gold" />
        No pierdas tu racha de {a.count} días: completa una actividad hoy.
      </div>
    );
  }
  if (a.kind === 'streak-milestone' && !premium) {
    return (
      <div className="card flex flex-wrap items-center gap-3 border-brand p-4 text-sm">
        <Flame className="text-brand" />
        <span className="flex-1">¡{a.count} días seguidos! Es el momento ideal para dar el salto.</span>
        <button className="btn-primary" onClick={() => openPaywall('streak')}>Ver oferta</button>
      </div>
    );
  }
  return null;
}
