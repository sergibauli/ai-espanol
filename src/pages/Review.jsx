import { useMemo, useState } from 'react';
import { Volume2, Plus, PartyPopper } from 'lucide-react';
import { LEVELS, loadVocab } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { useStore, getState, reviewCard, addCards, recordActivity } from '../lib/store.js';
import { dueCards } from '../lib/adaptive.js';
import { speak } from '../lib/speech.js';
import { PageHeader, Loading, Progress } from '../components/ui.jsx';

const GRADES = [
  { g: 0, label: 'Otra vez', cls: 'border-bad text-bad' },
  { g: 1, label: 'Difícil', cls: 'border-gold text-gold' },
  { g: 2, label: 'Bien', cls: 'border-ok text-ok' },
  { g: 3, label: 'Fácil', cls: 'border-brand text-brand' },
];

export default function Review() {
  const level = useStore(s => s.profile.level);
  const srs = useStore(s => s.srs);
  const showZh = useStore(s => s.settings.showZh);
  const { data: vocab, loading } = useAsync(async () => {
    const all = await Promise.all(LEVELS.map(loadVocab));
    return new Map(all.flat().map(v => [v.id, v]));
  }, []);
  // La cola se fija al empezar la sesión para no reordenar mientras se repasa
  const [queue, setQueue] = useState(() => dueCards(getState().srs).slice(0, 20));
  const [pos, setPos] = useState(0);
  const [flip, setFlip] = useState(false);
  const [stats, setStats] = useState({ ok: 0, total: 0 });

  const card = vocab && queue[pos] ? vocab.get(queue[pos]) : null;
  const total = Object.keys(srs).length;
  const learned = useMemo(() => Object.values(srs).filter(c => c.interval >= 21).length, [srs]);

  async function addNew() {
    const list = await loadVocab(level);
    const fresh = list.filter(v => !getState().srs[v.id]).slice(0, 10).map(v => v.id);
    addCards(fresh);
    setQueue(fresh);
    setPos(0);
    setFlip(false);
  }

  function grade(g) {
    reviewCard(queue[pos], g);
    const s = { ok: stats.ok + (g > 0 ? 1 : 0), total: stats.total + 1 };
    setStats(s);
    setFlip(false);
    if (pos + 1 >= queue.length) recordActivity({ type: 'review', skill: 'vocabulario', ok: s.ok, total: s.total, xp: s.total * 2, minutes: 0, ref: 'review' });
    setPos(pos + 1);
  }

  if (loading) return <Loading />;

  return (
    <>
      <PageHeader title="Repaso inteligente" sub={`${total} palabras en tu mazo · ${learned} dominadas. Cada palabra vuelve justo antes de que la olvides.`} />
      {card ? (
        <div className="mx-auto max-w-md">
          <Progress value={pos / queue.length} className="mb-4" />
          <button onClick={() => setFlip(true)} className="card flex min-h-72 w-full flex-col items-center justify-center p-8 text-center">
            <span className="chip mb-4 bg-surface-2">{card.level} · {card.theme}</span>
            <div className="text-3xl font-bold">{card.es}</div>
            {flip ? (
              <div className="mt-5 space-y-2">
                {showZh && <div className="text-xl text-brand">{card.zh}</div>}
                <div className="muted text-sm">{card.def}</div>
                {card.ex && <div className="text-sm italic">«{card.ex}»</div>}
              </div>
            ) : <div className="muted mt-6 text-sm">Toca para ver la respuesta</div>}
          </button>
          <div className="mt-3 flex justify-center">
            <button className="btn-ghost" onClick={() => speak(card.es)}><Volume2 size={16} /> Escuchar</button>
          </div>
          {flip && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {GRADES.map(x => <button key={x.g} onClick={() => grade(x.g)} className={`btn border bg-surface ${x.cls}`}>{x.label}</button>)}
            </div>
          )}
        </div>
      ) : (
        <div className="card mx-auto max-w-md p-8 text-center">
          <PartyPopper className="mx-auto text-brand" size={36} />
          <h2 className="mt-3 text-lg font-semibold">{stats.total ? `¡Sesión terminada! ${stats.ok}/${stats.total}` : 'No tienes palabras pendientes'}</h2>
          <p className="muted mt-1 text-sm">Puedes añadir palabras nuevas de tu nivel ({level}) o volver mañana.</p>
          <button className="btn-primary mt-5" onClick={addNew}><Plus size={16} /> 10 palabras nuevas</button>
        </div>
      )}
    </>
  );
}
