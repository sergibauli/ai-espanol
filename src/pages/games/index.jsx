import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Volume2, RotateCcw } from 'lucide-react';
import { loadVocab } from '../../lib/data.js';
import { useAsync, shuffle } from '../../lib/hooks.js';
import { useStore, recordActivity, addCards } from '../../lib/store.js';
import { speak } from '../../lib/speech.js';
import { PageHeader, Loading, Progress } from '../../components/ui.jsx';
import { GAMES } from '../Games.jsx';

const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export default function Game() {
  const { game } = useParams();
  const level = useStore(s => s.profile.level);
  const showZh = useStore(s => s.settings.showZh);
  const [round, setRound] = useState(0);
  const { data: vocab, loading } = useAsync(() => loadVocab(level), [level]);
  const meta = GAMES.find(g => g.id === game);
  const pool = useMemo(() => (vocab ? shuffle(vocab.filter(v => v.es.length <= 14)).slice(0, 40) : []), [vocab, round]);

  if (!meta) return <p>Juego no encontrado. <Link className="text-brand" to="/juegos">Volver</Link></p>;
  if (loading) return <Loading />;

  const finish = (ok, total, missed = []) => {
    recordActivity({ type: 'game', skill: 'vocabulario', ok, total, xp: ok * 2, ref: 'game' });
    if (missed.length) addCards(missed.map(v => v.id)); // las falladas pasan al repaso automáticamente
  };
  const props = { pool, finish, showZh, restart: () => setRound(r => r + 1) };

  return (
    <>
      <PageHeader back="/juegos" title={meta.name} sub={`${meta.desc} Nivel ${level}.`} />
      <div key={round}>
        {game === 'quiz' && <Quiz {...props} />}
        {game === 'parejas' && <Pairs {...props} />}
        {game === 'ahorcado' && <Hangman {...props} />}
        {game === 'ordenar' && <Scramble {...props} />}
        {game === 'dictado' && <Dictation {...props} />}
      </div>
    </>
  );
}

function End({ ok, total, restart }) {
  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <div className="text-4xl font-bold">{ok}/{total}</div>
      <p className="muted mt-2 text-sm">+{ok * 2} XP. Las palabras falladas se han añadido a tu repaso.</p>
      <button className="btn-primary mt-5" onClick={restart}><RotateCcw size={16} /> Jugar otra vez</button>
    </div>
  );
}

function Quiz({ pool, finish, showZh, restart }) {
  const qs = useMemo(() => pool.slice(0, 10).map(v => ({ v, opts: shuffle([v, ...shuffle(pool.filter(x => x.id !== v.id)).slice(0, 3)]) })), [pool]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [ok, setOk] = useState(0);
  const [missed, setMissed] = useState([]);
  if (i >= qs.length) return <End ok={ok} total={qs.length} restart={restart} />;
  const q = qs[i];
  const label = o => (showZh ? `${o.zh} · ${o.def}` : o.def);
  function choose(o) {
    if (pick) return;
    setPick(o.id);
    const good = o.id === q.v.id;
    const nOk = ok + (good ? 1 : 0);
    const nMissed = good ? missed : [...missed, q.v];
    setOk(nOk);
    setMissed(nMissed);
    setTimeout(() => {
      if (i + 1 === qs.length) finish(nOk, qs.length, nMissed);
      setPick(null);
      setI(i + 1);
    }, 900);
  }
  return (
    <div className="mx-auto max-w-lg">
      <Progress value={i / qs.length} className="mb-5" />
      <div className="card p-6 text-center"><div className="text-3xl font-bold">{q.v.es}</div></div>
      <div className="mt-4 grid gap-2">
        {q.opts.map(o => {
          const tone = !pick ? 'border-line hover:border-brand' : o.id === q.v.id ? 'border-ok bg-ok-soft' : o.id === pick ? 'border-bad bg-bad-soft' : 'border-line opacity-60';
          return <button key={o.id} onClick={() => choose(o)} className={`rounded-xl border bg-surface px-4 py-3 text-left text-sm ${tone}`}>{label(o)}</button>;
        })}
      </div>
    </div>
  );
}

function Pairs({ pool, finish, showZh, restart }) {
  const words = useMemo(() => pool.slice(0, 6), [pool]);
  const cards = useMemo(() => shuffle(words.flatMap(w => [{ k: `${w.id}-es`, id: w.id, text: w.es }, { k: `${w.id}-t`, id: w.id, text: showZh ? w.zh : w.def }])), [words, showZh]);
  const [open, setOpen] = useState([]);
  const [found, setFound] = useState([]);
  const [tries, setTries] = useState(0);
  const done = found.length === words.length;
  function flip(c) {
    if (open.length === 2 || open.some(o => o.k === c.k) || found.includes(c.id)) return;
    const next = [...open, c];
    setOpen(next);
    if (next.length === 2) {
      const t = tries + 1;
      setTries(t);
      setTimeout(() => {
        if (next[0].id === next[1].id) {
          const f = [...found, c.id];
          setFound(f);
          if (f.length === words.length) finish(words.length, Math.max(words.length, t));
        }
        setOpen([]);
      }, 700);
    }
  }
  if (done) return <End ok={words.length} total={tries} restart={restart} />;
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-3 gap-2 sm:grid-cols-4">
      {cards.map(c => {
        const shown = found.includes(c.id) || open.some(o => o.k === c.k);
        return (
          <button key={c.k} onClick={() => flip(c)} className={`card grid aspect-[4/3] place-items-center p-2 text-center text-sm font-medium transition ${found.includes(c.id) ? 'border-ok bg-ok-soft' : shown ? 'border-brand' : 'bg-surface-2'}`}>
            {shown ? c.text : '?'}
          </button>
        );
      })}
    </div>
  );
}

const ABC = 'abcdefghijklmnñopqrstuvwxyz'.split('');

function Hangman({ pool, finish, showZh, restart }) {
  const word = useMemo(() => pool.find(v => /^[a-záéíóúüñ]+$/i.test(v.es) && v.es.length >= 4) || pool[0], [pool]);
  const target = norm(word.es).replace(/[^a-zñ]/g, '');
  const [guessed, setGuessed] = useState([]);
  const wrong = guessed.filter(l => !target.includes(l)).length;
  const won = [...target].every(l => guessed.includes(l));
  const lost = wrong >= 6;
  if (won || lost) {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <div className="text-3xl font-bold">{word.es}</div>
        <p className="muted mt-2">{won ? '¡Acertaste! +2 XP' : 'Otra vez será. La palabra pasa a tu repaso.'}</p>
        <button className="btn-primary mt-5" onClick={() => { finish(won ? 1 : 0, 1, won ? [] : [word]); restart(); }}><RotateCcw size={16} /> Otra palabra</button>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-lg text-center">
      <p className="muted text-sm">Pista: {showZh ? `${word.zh} · ` : ''}{word.def}</p>
      <div className="my-6 text-3xl font-bold tracking-[0.3em]">{[...target].map(l => (guessed.includes(l) ? l : '_')).join('')}</div>
      <p className="mb-4 text-sm">Fallos: {wrong}/6</p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {ABC.map(l => (
          <button key={l} disabled={guessed.includes(l)} onClick={() => setGuessed([...guessed, l])} className={`size-10 rounded-lg border text-sm font-semibold uppercase ${guessed.includes(l) ? (target.includes(l) ? 'border-ok bg-ok-soft' : 'border-line opacity-40') : 'border-line bg-surface hover:border-brand'}`}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function Scramble({ pool, finish, showZh, restart }) {
  const words = useMemo(() => pool.filter(v => !v.es.includes(' ') && v.es.length >= 4).slice(0, 8), [pool]);
  const [i, setI] = useState(0);
  const [val, setVal] = useState('');
  const [ok, setOk] = useState(0);
  const [missed, setMissed] = useState([]);
  const w = words[i];
  const letters = useMemo(() => (w ? shuffle([...w.es.toLowerCase()]).join(' ') : ''), [w]);
  if (!w) return <End ok={ok} total={words.length} restart={restart} />;
  function check(skip) {
    const good = !skip && norm(val) === norm(w.es);
    const nOk = ok + (good ? 1 : 0);
    const nMissed = good ? missed : [...missed, w];
    setOk(nOk); setMissed(nMissed); setVal('');
    if (i + 1 === words.length) finish(nOk, words.length, nMissed);
    setI(i + 1);
  }
  return (
    <div className="mx-auto max-w-md text-center">
      <Progress value={i / words.length} className="mb-5" />
      <div className="text-3xl font-bold uppercase tracking-widest text-brand">{letters}</div>
      <p className="muted mt-3 text-sm">{showZh ? `${w.zh} · ` : ''}{w.def}</p>
      <form className="mt-5 flex gap-2" onSubmit={e => { e.preventDefault(); check(false); }}>
        <input autoFocus className="input" value={val} onChange={e => setVal(e.target.value)} placeholder="Escribe la palabra" />
        <button className="btn-primary">Comprobar</button>
      </form>
      <button className="muted mt-3 text-sm underline" onClick={() => check(true)}>Saltar</button>
    </div>
  );
}

function Dictation({ pool, finish, restart }) {
  const words = useMemo(() => pool.slice(0, 8), [pool]);
  const [i, setI] = useState(0);
  const [val, setVal] = useState('');
  const [ok, setOk] = useState(0);
  const [missed, setMissed] = useState([]);
  const [last, setLast] = useState(null);
  const w = words[i];
  if (!w) return <End ok={ok} total={words.length} restart={restart} />;
  function check() {
    const good = norm(val) === norm(w.es);
    const nOk = ok + (good ? 1 : 0);
    const nMissed = good ? missed : [...missed, w];
    setLast({ good, word: w.es });
    setOk(nOk); setMissed(nMissed); setVal('');
    if (i + 1 === words.length) finish(nOk, words.length, nMissed);
    setI(i + 1);
  }
  return (
    <div className="mx-auto max-w-md text-center">
      <Progress value={i / words.length} className="mb-5" />
      <button className="btn-primary !px-6 !py-4 text-base" onClick={() => speak(w.es, { rate: 0.8 })}><Volume2 size={20} /> Escuchar palabra</button>
      <form className="mt-5 flex gap-2" onSubmit={e => { e.preventDefault(); check(); }}>
        <input autoFocus className="input" value={val} onChange={e => setVal(e.target.value)} placeholder="Escribe lo que oyes" />
        <button className="btn-primary">Comprobar</button>
      </form>
      {last && <p className={`mt-3 text-sm ${last.good ? 'text-ok' : 'text-bad'}`}>{last.good ? '¡Correcto!' : `Era «${last.word}»`}</p>}
    </div>
  );
}
