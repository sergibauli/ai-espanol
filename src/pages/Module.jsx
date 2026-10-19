import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BookA, BookOpen, Headphones, PenLine, Mic, Volume2, Plus, Check, MessageCircle } from 'lucide-react';
import { loadTheme, loadVocab } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { useStore, recordActivity, setThemeProgress, addCards } from '../lib/store.js';
import { speak } from '../lib/speech.js';
import { PageHeader, Tabs, Loading } from '../components/ui.jsx';
import Question from '../components/Question.jsx';
import AudioPlayer from '../components/AudioPlayer.jsx';
import WritingBox from '../components/WritingBox.jsx';

const TABS = [
  { id: 'vocab', label: 'Vocabulario', icon: BookA },
  { id: 'lectura', label: 'Lectura', icon: BookOpen },
  { id: 'audicion', label: 'Audición', icon: Headphones },
  { id: 'escritura', label: 'Escritura', icon: PenLine },
  { id: 'oral', label: 'Oral', icon: Mic },
];

export default function Module() {
  const { level, id } = useParams();
  const [sp, setSp] = useSearchParams();
  const tab = sp.get('s') || 'vocab';
  const progress = useStore(s => s.themes[`${level}-${id}`] || {});
  const { data: t, loading } = useAsync(() => loadTheme(level, id), [level, id]);

  if (loading) return <Loading />;
  if (!t) return <p>Tema no encontrado.</p>;
  const ref = `${level}-${id}`;

  return (
    <>
      <PageHeader back="/modulos" title={t.theme} sub={`${level} · Tema ${t.id}`} />
      <Tabs value={tab} onChange={v => setSp({ s: v }, { replace: true })} tabs={TABS.map(x => ({ ...x, done: progress[x.id] !== undefined }))} />
      {tab === 'vocab' && <Vocab t={t} level={level} refKey={ref} done={progress.vocab} />}
      {tab === 'lectura' && <Quiz key="l" kind="lectura" title={t.reading.title} text={t.reading.text} questions={t.reading.questions} refKey={ref} />}
      {tab === 'audicion' && <Quiz key="a" kind="audicion" title={t.listening.title} script={t.listening.transcription} questions={t.listening.questions} refKey={ref} />}
      {tab === 'escritura' && <Writing t={t} level={level} refKey={ref} />}
      {tab === 'oral' && <Oral t={t} refKey={ref} level={level} />}
    </>
  );
}

function Vocab({ t, level, refKey, done }) {
  const showZh = useStore(s => s.settings.showZh);
  const [added, setAdded] = useState(Boolean(done));

  async function addAll() {
    // Asocia las palabras del tema con el diccionario del nivel para el repaso espaciado
    const dict = await loadVocab(level);
    const words = new Set(t.vocabulary.map(v => v.word.toLowerCase()));
    const ids = dict.filter(d => words.has(d.es.toLowerCase())).map(d => d.id);
    const extra = dict.filter(d => d.theme && t.theme.toLowerCase().includes(d.theme.toLowerCase().split(' ')[0])).slice(0, 10).map(d => d.id);
    addCards([...ids, ...extra]);
    setThemeProgress(level, t.id, 'vocab', true);
    recordActivity({ type: 'vocab', xp: 10, ref: `theme-${refKey}-vocab` });
    setAdded(true);
  }

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2">
        {t.vocabulary.map(v => (
          <div key={v.word} className="card flex gap-3 p-4">
            <button onClick={() => speak(v.word)} className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-2 hover:text-brand" aria-label={`Escuchar ${v.word}`}><Volume2 size={17} /></button>
            <div className="min-w-0">
              <div className="font-semibold">{v.word} {showZh && <span className="muted font-normal">· {v.chinese}</span>}</div>
              <div className="muted text-sm">{v.definition}</div>
              <div className="mt-1 text-sm italic">«{v.example}»</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary mt-5" onClick={addAll} disabled={added}>
        {added ? <><Check size={16} /> Añadidas a tu repaso</> : <><Plus size={16} /> Las he estudiado: añadir al repaso</>}
      </button>
    </div>
  );
}

function Quiz({ kind, title, text, script, questions, refKey }) {
  const [picks, setPicks] = useState({});
  const answered = Object.keys(picks).length;
  const ok = questions.filter(q => picks[q.id] === q.correctAnswer).length;
  const [level, id] = refKey.split('-');
  const finished = answered === questions.length;

  function pick(q, i) {
    const next = { ...picks, [q.id]: i };
    setPicks(next);
    if (Object.keys(next).length === questions.length) {
      const score = questions.filter(x => next[x.id] === x.correctAnswer).length;
      setThemeProgress(level, id, kind, score / questions.length);
      recordActivity({ type: kind, skill: kind, ok: score, total: questions.length, xp: score * 3, ref: `theme-${refKey}-${kind}` });
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:sticky lg:top-6 lg:self-start">
        <h2 className="mb-2 font-semibold">{title}</h2>
        {text && <div className="card prose-es max-h-[70vh] overflow-y-auto p-5 text-[15px]">{text}</div>}
        {script && <AudioPlayer script={script} />}
      </div>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <Question key={q.id} n={i + 1} text={q.question} options={q.options} answer={q.correctAnswer} picked={picks[q.id]} onPick={v => pick(q, v)} explanation={q.explanation} />
        ))}
        {finished && <div className="card border-ok p-4 font-semibold">Resultado: {ok}/{questions.length} · +{ok * 3} XP</div>}
      </div>
    </div>
  );
}

function Writing({ t, level, refKey }) {
  const [opt, setOpt] = useState('optionA');
  const w = t.writing[opt];
  const range = w.wordCount?.match(/(\d+)\D+(\d+)/);
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <div className="mb-3 flex gap-2">
          {['optionA', 'optionB'].map(o => <button key={o} onClick={() => setOpt(o)} className={`chip !px-3 !py-1.5 ${opt === o ? 'bg-ink text-bg' : 'bg-surface-2'}`}>Opción {o.at(-1)}</button>)}
        </div>
        <div className="card space-y-3 p-5 text-sm">
          <h2 className="text-base font-semibold">{w.title}</h2>
          <p>{w.description}</p>
          <div><b>Estructura</b><ul className="muted mt-1 list-disc space-y-1 pl-5"><li>{w.structure.intro}</li><li>{w.structure.body}</li><li>{w.structure.conclusion}</li></ul></div>
          <div><b>Conectores útiles</b><div className="mt-1 flex flex-wrap gap-1.5">{w.connectors.map(c => <span key={c} className="chip bg-surface-2">{c}</span>)}</div></div>
          {w.wordCount && <p className="muted">Extensión: {w.wordCount}</p>}
        </div>
      </div>
      <WritingBox
        level={level}
        task={`${w.title}. ${w.description}`}
        min={range ? Number(range[1]) : undefined}
        max={range ? Number(range[2]) : undefined}
        storageKey={`w-${refKey}-${opt}`}
        onDone={() => setThemeProgress(level, t.id, 'escritura', true)}
      />
    </div>
  );
}

function Oral({ t, refKey, level }) {
  const m = t.monologue;
  function done() {
    setThemeProgress(level, t.id, 'oral', true);
    recordActivity({ type: 'oral', xp: 15, ref: `theme-${refKey}-oral` });
  }
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {[m.topic1, m.topic2].map(tp => (
          <div key={tp.title} className="card p-5 text-sm">
            <h3 className="text-base font-semibold">{tp.title}</h3>
            <p className="muted mt-1">{tp.description}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">{tp.guideQuestions.map(q => <li key={q}>{q}</li>)}</ul>
            <div className="mt-3 flex flex-wrap gap-1.5">{tp.connectors.map(c => <span key={c} className="chip bg-surface-2">{c}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="card p-5 text-sm">
        <h3 className="text-base font-semibold">Conversación</h3>
        <p className="muted mt-1">{t.interaction.situation}</p>
        <ul className="mt-3 space-y-3">
          {t.interaction.questions.map(q => (
            <li key={q.question}>
              <b>{q.question}</b>
              <p className="muted">{q.help}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link to={`/tutor?tema=${encodeURIComponent(t.interaction.situation)}`} onClick={done} className="btn-primary"><MessageCircle size={16} /> Practicar esta conversación con el tutor IA</Link>
        <button className="btn-ghost" onClick={done}>Marcar como practicado</button>
      </div>
    </div>
  );
}
