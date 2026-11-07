import * as React from "react";
import { Link } from "react-router";
import { SparklesIcon, Wand2Icon, ClockIcon, CheckIcon } from "lucide-react";
import { ExamRunner } from "../../components/exam/ExamRunner.jsx";
import { generateExam, saveExamResult } from "../../lib/examGenerator.js";
import { recordModuleScore, completeModule, recordClassScore, completeClass } from "../../lib/progress.js";
import { clasesDe } from "../../lib/clases.js";

// Opciones de examen: el corto de una clase (solo su contenido) o el de la unidad entera (todas las clases)
const MODOS = {
  clase: { preguntas: [8, 12], porDefecto: 10 },
  unidad: { preguntas: [15, 25], porDefecto: 15 },
};

/**
 * Examen automático: distinto cada vez.
 * - `clase` (1…n): por defecto, examen corto de esa clase; con 80 o más la clase queda completada.
 * - «Examen de la unidad»: todas las clases; con 80 o más la unidad (y todas sus clases) queda completada.
 * onTerminar(resultado, { modo, clase }) avisa a la página (p. ej. para ofrecer la clase siguiente).
 */
export default function ModuloExamen({ numero, moduloId, clase = null, modoInicial, onTerminar }) {
  const clases = clasesDe(numero);
  const total = clases.length;
  const info = clase ? clases.find((c) => c.n === Number(clase)) : null;
  const modoPorDefecto = modoInicial === "unidad" || !(info && total > 1) ? "unidad" : "clase";
  const [modo, setModo] = React.useState(modoPorDefecto);
  const [preguntas, setPreguntas] = React.useState(MODOS[modoPorDefecto].porDefecto);
  const [exam, setExam] = React.useState(null);
  const [cargando, setCargando] = React.useState(false);
  const idModulo = moduloId || `modulo-${numero}`;

  React.useEffect(() => {
    // Al cambiar de clase en la página, el examen vuelve a la tarjeta de inicio
    setExam(null);
    setModo(modoPorDefecto);
    setPreguntas(MODOS[modoPorDefecto].porDefecto);
  }, [numero, clase, modoInicial]);

  const elegirModo = (m) => {
    setModo(m);
    setPreguntas(MODOS[m].porDefecto);
  };

  const empezar = async () => {
    setCargando(true);
    const deClase = modo === "clase" && info;
    const examen = await generateExam({
      modulos: [numero],
      clase: deClase ? info.n : undefined,
      total: preguntas,
      minutos: Math.round(preguntas * 1.3),
      // El examen corto de una clase no lleva lectura (se comería la mitad de las preguntas)
      conLectura: !deClase,
      seed: Math.floor(Math.random() * 1e9),
    });
    setExam(examen);
    setCargando(false);
  };

  if (exam) {
    const deClase = exam.config?.clase;
    return (
      <div className="cls-examen-run" style={{ fontFamily: "var(--ui-font)", color: "var(--ui-text)" }}>
        <ExamRunner
          key={exam.id}
          exam={exam}
          compact
          onRestart={empezar}
          onFinish={(r) => {
            if (deClase) {
              recordClassScore(idModulo, deClase, r.nota, total);
              if (r.nota >= 80) completeClass(idModulo, deClase, r.nota, total);
            } else {
              recordModuleScore(idModulo, r.nota);
              if (r.nota >= 80) completeModule(idModulo, r.nota);
            }
            saveExamResult({ fecha: new Date().toISOString(), titulo: exam.titulo, nota: r.nota, total: r.total, aciertos: r.aciertos, config: exam.config });
            onTerminar?.(r, { modo: deClase ? "clase" : "unidad", clase: deClase || null });
          }}
        />
      </div>
    );
  }

  const opciones = [
    info && total > 1
      ? {
          key: "clase",
          sello: `第${info.n}课`,
          es: `Examen de la clase ${info.n}`,
          zh: `第${info.n}课小测验`,
          detalle: info.titulo,
          detalleZh: info.tituloChino,
          nota: "Solo lo de esta clase · 只考本课内容",
        }
      : null,
    {
      key: "unidad",
      sello: "单元",
      es: "Examen de la unidad",
      zh: "单元考试",
      detalle: total > 1 ? `Las ${total} clases juntas: vocabulario, gramática, uso de la lengua y una lectura.` : "Vocabulario, gramática, uso de la lengua y una lectura.",
      detalleZh: total > 1 ? `全部${total}课的内容` : "词汇、语法、语言运用和阅读",
      nota: "Con 80 o más, unidad completada · 80分以上完成本单元",
    },
  ].filter(Boolean);

  return (
    <div className="cls-examen gm-no-adapt">
      <div className="cls-examen-cab">
        <span className="cls-examen-sello" translate="no">
          考
        </span>
        <div>
          <h3>Examen · 考试</h3>
          <p>
            Cada examen es distinto. Con 80 o más, lo que examinas queda completado.
            <span className="cls-zh">每次都是新试卷，80分以上即完成。</span>
          </p>
        </div>
      </div>

      <div className="cls-examen-opciones" role="radiogroup" aria-label="Tipo de examen">
        {opciones.map((o) => (
          <button key={o.key} type="button" role="radio" aria-checked={modo === o.key} className={`cls-examen-opcion ${modo === o.key ? "on" : ""}`} onClick={() => elegirModo(o.key)}>
            <span className="cls-examen-opcion-sello" translate="no">
              {o.sello}
            </span>
            <span className="cls-examen-opcion-txt">
              <b>{o.es}</b>
              <i>{o.zh}</i>
              <small>{o.detalle}</small>
              {o.detalleZh && <small className="cls-zh">{o.detalleZh}</small>}
              <em>{o.nota}</em>
            </span>
            <span className="cls-examen-check" aria-hidden="true">
              {modo === o.key && <CheckIcon size={16} strokeWidth={3.5} />}
            </span>
          </button>
        ))}
      </div>

      <div className="cls-examen-pie">
        <div className="cls-examen-num" aria-label="Número de preguntas">
          {MODOS[modo].preguntas.map((n) => (
            <button key={n} type="button" className={preguntas === n ? "on" : ""} onClick={() => setPreguntas(n)}>
              {n} preguntas · {n}题
            </button>
          ))}
          <span className="cls-examen-tiempo">
            <ClockIcon size={15} /> ~{Math.round(preguntas * 1.3)} min
          </span>
        </div>
        <div className="cls-examen-botones">
          <button className="cls-btn-laca" onClick={empezar} disabled={cargando}>
            <SparklesIcon size={18} /> {cargando ? "Generando… · 生成中…" : "Empezar examen · 开始考试"}
          </button>
          <Link className="cls-btn-papel" to="/examenes/generador">
            <Wand2Icon size={17} /> Varios módulos · 多单元
          </Link>
        </div>
      </div>
    </div>
  );
}
