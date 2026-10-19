import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Target, Clock, CalendarDays, ArrowRight } from 'lucide-react';
import { LEVELS, LEVEL_INFO, loadThemes, loadVocab } from '../lib/data.js';
import { placementQuestions, placementResult } from '../lib/adaptive.js';
import { setProfile, addCards, useStore } from '../lib/store.js';
import Question from '../components/Question.jsx';
import { Loading, Progress } from '../components/ui.jsx';

const GOALS = [
  { id: 'dele', label: 'Aprobar el DELE', zh: '通过DELE考试' },
  { id: 'study', label: 'Estudiar en España', zh: '去西班牙留学' },
  { id: 'work', label: 'Trabajo', zh: '工作需要' },
  { id: 'fun', label: 'Por placer', zh: '兴趣爱好' },
];

export default function Onboarding() {
  const nav = useNavigate();
  const profile = useStore(s => s.profile);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ goal: profile.goal, minutesPerDay: profile.minutesPerDay, examDate: profile.examDate, name: profile.name });
  const [qs, setQs] = useState(null);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picked, setPicked] = useState(null);

  async function startTest() {
    setStep(2);
    const byLevel = Object.fromEntries(await Promise.all(LEVELS.map(async L => [L, await loadThemes(L)])));
    setQs(placementQuestions(byLevel, 2));
  }

  async function finish(level) {
    const vocab = await loadVocab(level);
    addCards(vocab.slice(0, 15).map(v => v.id));
    setProfile({ ...form, level, onboarded: true });
    nav('/', { replace: true });
  }

  function next() {
    const q = qs[i];
    const a = [...answers, { level: q.level, ok: picked === q.correctAnswer }];
    setAnswers(a);
    setPicked(null);
    if (i + 1 < qs.length) setI(i + 1);
    else setStep(3);
  }

  const result = step === 3 ? placementResult(answers) : null;

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-4 py-8">
      <div className="mb-8 flex items-center gap-2.5">
        <img src="./app-icon.svg" alt="" className="size-9 rounded-xl" />
        <span className="text-lg font-bold">AI Español</span>
      </div>

      {step === 0 && (
        <>
          <h1 className="h1">Tu plan para el DELE, a tu medida</h1>
          <p className="muted mt-2">Responde tres preguntas y una prueba corta. La app preparará cada día lo que más te conviene y se irá adaptando a tu progreso.</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3"><Sparkles className="text-brand" size={20} /> Plan diario automático con repaso espaciado</li>
            <li className="flex gap-3"><Target className="text-brand" size={20} /> Detecta tus puntos débiles y los refuerza</li>
            <li className="flex gap-3"><CalendarDays className="text-brand" size={20} /> Simulacros oficiales programados hasta tu examen</li>
          </ul>
          <button className="btn-primary mt-8 self-start" onClick={() => setStep(1)}>Empezar <ArrowRight size={16} /></button>
        </>
      )}

      {step === 1 && (
        <>
          <h1 className="h1">Cuéntanos de ti</h1>
          <label className="mt-6 block text-sm font-semibold">¿Cómo te llamas?</label>
          <input className="input mt-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" />

          <div className="mt-6 text-sm font-semibold">¿Para qué estudias español?</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {GOALS.map(g => (
              <button key={g.id} onClick={() => setForm({ ...form, goal: g.id })} className={`card p-3 text-left text-sm ${form.goal === g.id ? 'border-brand bg-brand-soft' : ''}`}>
                <div className="font-semibold">{g.label}</div>
                <div className="muted text-xs">{g.zh}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold"><Clock size={16} /> Minutos al día</div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[10, 20, 30, 45].map(m => (
              <button key={m} onClick={() => setForm({ ...form, minutesPerDay: m })} className={`card py-2.5 text-sm font-semibold ${form.minutesPerDay === m ? 'border-brand bg-brand-soft text-brand' : ''}`}>{m}</button>
            ))}
          </div>

          <label className="mt-6 flex items-center gap-2 text-sm font-semibold"><CalendarDays size={16} /> Fecha de tu examen (opcional)</label>
          <input type="date" className="input mt-2" value={form.examDate} onChange={e => setForm({ ...form, examDate: e.target.value })} />

          <div className="mt-8 flex flex-wrap gap-2">
            <button className="btn-primary" onClick={startTest}>Hacer prueba de nivel (2 min)</button>
          </div>
          <div className="mt-4 text-sm">
            <span className="muted">¿Ya sabes tu nivel? </span>
            {LEVELS.map(L => <button key={L} onClick={() => finish(L)} className="chip ml-1 bg-surface-2 hover:bg-brand-soft hover:text-brand">{L}</button>)}
          </div>
        </>
      )}

      {step === 2 && (!qs ? <Loading label="Preparando la prueba…" /> : (
        <>
          <div className="mb-4 flex items-center justify-between text-sm"><span className="muted">Pregunta {i + 1} de {qs.length}</span><span className="chip bg-surface-2">{qs[i].level}</span></div>
          <Progress value={(i + 1) / qs.length} className="mb-5" />
          <details className="card mb-3 p-4 text-sm" open>
            <summary className="cursor-pointer font-semibold">{qs[i].title}</summary>
            <p className="prose-es muted mt-2 max-h-64 overflow-y-auto">{qs[i].text}</p>
          </details>
          <Question n={i + 1} text={qs[i].question} options={qs[i].options} answer={qs[i].correctAnswer} picked={picked} onPick={setPicked} />
          <button className="btn-primary mt-4 self-start" disabled={picked === null} onClick={next}>{i + 1 < qs.length ? 'Siguiente' : 'Ver resultado'}</button>
        </>
      ))}

      {step === 3 && (
        <>
          <h1 className="h1">Tu nivel recomendado: {result}</h1>
          <p className="muted mt-2">{LEVEL_INFO[result].name} · {LEVEL_INFO[result].zh}. Has acertado {answers.filter(a => a.ok).length} de {answers.length}. Si los ejercicios te resultan muy fáciles o difíciles, la app te propondrá cambiar de nivel automáticamente.</p>
          <button className="btn-primary mt-8 self-start" onClick={() => finish(result)}>Empezar con {result} <ArrowRight size={16} /></button>
        </>
      )}
    </div>
  );
}
