import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Timer, Send, MessageCircle, CheckCircle2, XCircle } from 'lucide-react';
import { loadOficial } from '../lib/data.js';
import { useAsync } from '../lib/hooks.js';
import { addOficialResult, recordActivity } from '../lib/store.js';
import { useSession } from '../lib/auth.jsx';
import { FREE_LIMITS } from '../lib/plans.js';
import { PageHeader, Tabs, Loading } from '../components/ui.jsx';
import AudioPlayer from '../components/AudioPlayer.jsx';
import WritingBox from '../components/WritingBox.jsx';

const SKILL_BY_PRUEBA = { 1: 'lectura', 2: 'audicion', 3: 'escritura', 4: 'oral' };

export default function OficialExam() {
  const { level, modelo } = useParams();
  const { premium, openPaywall } = useSession();
  const { data: ex, loading } = useAsync(() => loadOficial(level, modelo), [level, modelo]);
  const [part, setPart] = useState(1);
  const [answers, setAnswers] = useState({}); // "p-t-i": index
  const [submitted, setSubmitted] = useState({}); // prueba: true
  const [manual, setManual] = useState({ 3: null, 4: null }); // puntuación 0-25 de escritura/oral

  const locked = !premium && Number(modelo) > FREE_LIMITS.oficialFreeModels;
  useEffect(() => { if (locked) openPaywall('oficial'); }, [locked, openPaywall]);

  const scores = useMemo(() => {
    if (!ex) return {};
    const out = {};
    for (const p of ex.pruebas) {
      if (p.prueba > 2) { out[p.prueba] = manual[p.prueba]; continue; }
      let ok = 0, total = 0;
      p.tareas.forEach(t => t.items?.forEach((it, i) => { total++; if (answers[`${p.prueba}-${t.num}-${i}`] === it.correcta) ok++; }));
      out[p.prueba] = { ok, total, pts: total ? Math.round((ok / total) * 25 * 100) / 100 : 0 };
    }
    return out;
  }, [ex, answers, manual]);

  if (loading) return <Loading />;
  if (!ex) return <p>Modelo no encontrado.</p>;
  if (locked) return <PageHeader back={`/oficial/${level}`} title={ex.titulo} sub="Este modelo forma parte de Premium." />;

  const prueba = ex.pruebas.find(p => p.prueba === part);
  const pts = n => (n > 2 ? scores[n] ?? 0 : scores[n]?.pts ?? 0);
  const g1 = ex.evaluacion.grupo1.pruebas.reduce((a, n) => a + pts(n), 0);
  const g2 = ex.evaluacion.grupo2.pruebas.reduce((a, n) => a + pts(n), 0);
  const allDone = ex.pruebas.every(p => submitted[p.prueba]);
  const apto = g1 >= ex.evaluacion.grupo1.minimo && g2 >= ex.evaluacion.grupo2.minimo;

  function submit(n) {
    const next = { ...submitted, [n]: true };
    setSubmitted(next);
    const sc = scores[n];
    if (n <= 2 && sc) recordActivity({ type: 'oficial', skill: SKILL_BY_PRUEBA[n], ok: sc.ok, total: sc.total, xp: sc.ok * 2, ref: `${level}-oficial-${modelo}` });
    if (ex.pruebas.every(p => next[p.prueba])) {
      addOficialResult({ level, modelo: Number(modelo), score: Math.round(g1 + g2), max: 100, parts: { 1: pts(1), 2: pts(2), 3: pts(3), 4: pts(4) } });
      recordActivity({ type: 'oficial-done', xp: 50, ref: 'sim' });
    }
  }

  return (
    <>
      <PageHeader back={`/oficial/${level}`} title={ex.temaCentral} sub={ex.titulo} />
      <Tabs value={part} onChange={setPart} tabs={ex.pruebas.map(p => ({ id: p.prueba, label: `${p.prueba}. ${p.nombre.replace('Comprensión ', 'Compr. ').replace('Expresión e interacción ', 'Expr. ')}`, done: submitted[p.prueba] }))} />

      <PartTimer key={part} minutes={prueba.duracion} stopped={submitted[part]} />

      <div className="space-y-8">
        {prueba.tareas.map(t => (
          <Task key={t.num} p={prueba.prueba} t={t} level={level} modelo={modelo} answers={answers} setAnswers={setAnswers} reveal={submitted[part]} />
        ))}
      </div>

      {part > 2 && (
        <div className="card mt-6 p-4 text-sm">
          <label className="font-semibold">Tu puntuación en esta prueba (0–25)</label>
          <p className="muted mt-1">{part === 3 ? 'Usa la nota de la corrección con IA o autoevalúate con la rúbrica.' : 'Autoevalúate con la rúbrica o practica la prueba con el tutor IA.'}</p>
          <input type="range" min="0" max="25" step="0.5" value={manual[part] ?? 0} onChange={e => setManual({ ...manual, [part]: Number(e.target.value) })} className="mt-3 w-full accent-[var(--brand)]" />
          <div className="tabular-nums">{manual[part] ?? 0} / 25</div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!submitted[part] ? (
          <button className="btn-primary" onClick={() => submit(part)}><Send size={16} /> Entregar prueba {part}</button>
        ) : (
          <span className="chip bg-ok-soft text-ok">Prueba entregada{part <= 2 && scores[part] ? ` · ${scores[part].ok}/${scores[part].total} aciertos · ${scores[part].pts}/25` : ''}</span>
        )}
        {part < 4 && <button className="btn-ghost" onClick={() => { setPart(part + 1); scrollTo(0, 0); }}>Siguiente prueba</button>}
      </div>

      {allDone && (
        <div className={`card mt-8 p-5 ${apto ? 'border-ok' : 'border-bad'}`}>
          <div className="flex items-center gap-2 text-xl font-bold">
            {apto ? <CheckCircle2 className="text-ok" /> : <XCircle className="text-bad" />} {apto ? 'APTO' : 'NO APTO'} · {Math.round((g1 + g2) * 100) / 100}/100
          </div>
          <p className="muted mt-2 text-sm">Grupo 1 (lectura + escritura): {g1.toFixed(2)}/50 · Grupo 2 (audición + oral): {g2.toFixed(2)}/50. {ex.evaluacion.criterio}.</p>
        </div>
      )}
    </>
  );
}

function PartTimer({ minutes, stopped }) {
  const [left, setLeft] = useState(minutes * 60);
  useEffect(() => {
    if (stopped) return;
    const id = setInterval(() => setLeft(l => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [stopped]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  return (
    <div className={`sticky top-14 z-10 mb-5 flex items-center gap-2 rounded-xl border border-line bg-surface/95 px-3 py-2 text-sm backdrop-blur lg:top-3 ${left < 300 && !stopped ? 'text-bad' : ''}`}>
      <Timer size={16} /> <span className="font-semibold tabular-nums">{mm}:{ss}</span> <span className="muted">restantes de {minutes} min</span>
    </div>
  );
}

function audioScript(t) {
  if (t.guion) return t.guion;
  return (t.clips || []).map(c => `[AUDIO ${c.n}] ${c.transcripcion}`).join('\n[pausa 3 s]\n');
}

function Task({ p, t, level, modelo, answers, setAnswers, reveal }) {
  const mat = t.material || {};
  return (
    <section>
      <h2 className="font-semibold">Tarea {t.num}{t.titulo ? ` · ${t.titulo}` : ''}</h2>
      {t.instrucciones && <p className="prose-es muted mt-1 text-sm">{t.instrucciones}</p>}

      {p === 2 && <div className="mt-3"><AudioPlayer script={audioScript(t)} maxPlays={reveal ? undefined : 2} allowTranscript={reveal} /></div>}

      {t.texto && <div className="card prose-es mt-3 max-h-[60vh] overflow-y-auto p-5 text-[15px]">{t.texto}</div>}
      {mat.bloques?.length > 0 && (
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {mat.bloques.map(b => <div key={b.letra} className="card p-4 text-sm"><b className="text-brand">{b.letra}</b> {b.titulo && <b>· {b.titulo}</b>}<p className="mt-1">{b.texto}</p></div>)}
        </div>
      )}
      {mat.fragmentos?.length > 0 && (
        <div className="mt-3 grid gap-2">
          {mat.fragmentos.map(f => <div key={f.letra} className="card p-3 text-sm"><b className="text-brand">{f.letra}</b> {f.texto}</div>)}
        </div>
      )}
      {t.parejas?.length > 0 && (
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {t.parejas.map((x, i) => <div key={i} className="card p-3 text-sm"><b className="text-brand">{String.fromCharCode(65 + i)}</b> {x.enunciado}</div>)}
        </div>
      )}
      {mat.tipo === 'texto' && mat.contenido && <div className="card prose-es mt-3 p-5 text-sm">{mat.contenido}</div>}

      {t.items?.length > 0 && (
        <div className="mt-4 space-y-3">
          {t.items.map((it, i) => (
            <ExamItem key={i} it={it} picked={answers[`${p}-${t.num}-${i}`]} reveal={reveal} onPick={v => setAnswers(a => ({ ...a, [`${p}-${t.num}-${i}`]: v }))} />
          ))}
        </div>
      )}

      {p === 3 && (
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <div className="card space-y-2 p-5 text-sm">
            <p>{t.situacion}</p>
            {t.destinatario && <p><b>Destinatario:</b> {t.destinatario}</p>}
            {t.proposito && <p><b>Propósito:</b> {t.proposito}</p>}
            {t.puntosGuia?.length > 0 && <ul className="list-disc space-y-1 pl-5">{t.puntosGuia.map(x => <li key={x}>{x}</li>)}</ul>}
            <p className="muted">Extensión: {t.minPalabras}–{t.maxPalabras} palabras.</p>
            {reveal && t.modeloRespuesta && <details><summary className="cursor-pointer font-semibold">Respuesta modelo</summary><p className="prose-es mt-2">{typeof t.modeloRespuesta === 'string' ? t.modeloRespuesta : JSON.stringify(t.modeloRespuesta)}</p></details>}
          </div>
          <WritingBox
            level={level}
            task={JSON.stringify({ situacion: t.situacion, destinatario: t.destinatario, proposito: t.proposito, puntosGuia: t.puntosGuia, minPalabras: t.minPalabras, maxPalabras: t.maxPalabras, rubrica: t.rubrica })}
            min={t.minPalabras}
            max={t.maxPalabras}
            storageKey={`of-${level}-${modelo}-${t.num}`}
          />
        </div>
      )}

      {p === 4 && (
        <div className="mt-3 space-y-3">
          {(t.cuadernilloCandidato || t.puntosGuia?.length) && (
            <div className="card prose-es p-5 text-sm">{t.cuadernilloCandidato || t.puntosGuia.map(x => `• ${x}`).join('\n')}</div>
          )}
          {t.rubrica?.length > 0 && (
            <details className="card p-4 text-sm"><summary className="cursor-pointer font-semibold">Rúbrica de evaluación</summary>
              <ul className="mt-2 space-y-2">{t.rubrica.map(r => <li key={r.criterio}><b className="capitalize">{r.criterio}</b>: <span className="muted">{r.bandas?.[0]?.descriptor}</span></li>)}</ul>
            </details>
          )}
          <Link to={`/tutor?tema=${encodeURIComponent(`${t.titulo}. ${t.instrucciones || ''}`)}`} className="btn-ghost"><MessageCircle size={16} /> Practicar esta tarea con el tutor IA</Link>
        </div>
      )}
    </section>
  );
}

function ExamItem({ it, picked, onPick, reveal }) {
  const lettersOnly = it.opciones.every(o => o.length <= 2);
  return (
    <div className="card p-4">
      <p className="font-medium"><span className="text-ink-3">{it.num}. </span>{it.enunciado}</p>
      <div className={`mt-3 ${lettersOnly ? 'flex flex-wrap gap-2' : 'grid gap-2'}`}>
        {it.opciones.map((o, i) => {
          const tone = reveal ? (i === it.correcta ? 'border-ok bg-ok-soft' : i === picked ? 'border-bad bg-bad-soft' : 'border-line opacity-60') : i === picked ? 'border-brand bg-brand-soft' : 'border-line hover:border-brand';
          return (
            <button key={i} disabled={reveal} onClick={() => onPick(i)} className={`rounded-xl border text-sm transition ${tone} ${lettersOnly ? 'size-10 font-semibold' : 'px-3 py-2.5 text-left'}`}>
              {lettersOnly ? o : <><b className="mr-2 text-ink-3">{String.fromCharCode(97 + i)})</b>{o}</>}
            </button>
          );
        })}
      </div>
      {reveal && it.justificacion && <p className="muted mt-3 rounded-xl bg-surface-2 p-3 text-sm">{it.justificacion}</p>}
    </div>
  );
}
