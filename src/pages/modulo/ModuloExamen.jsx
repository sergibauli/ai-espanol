import * as React from "react";
import { Link } from "react-router";
import { SparklesIcon, Wand2Icon } from "lucide-react";
import { ExamRunner } from "../../components/exam/ExamRunner.jsx";
import { generateExam, saveExamResult } from "../../lib/examGenerator.js";
import { recordModuleScore, completeModule } from "../../lib/progress.js";

// Examen automático del módulo: distinto cada vez; con nota ≥ 80 el módulo queda completado
export default function ModuloExamen({ numero, moduloId }) {
  const [exam, setExam] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(15);

  const start = async () => {
    setLoading(true);
    const e = await generateExam({ modulos: [numero], total, minutos: Math.round(total * 1.3), conLectura: true, seed: Math.floor(Math.random() * 1e9) });
    setExam(e);
    setLoading(false);
  };

  if (exam) {
    return (
      <div style={{ fontFamily: "var(--ui-font)", color: "var(--ui-text)" }}>
        <ExamRunner
          key={exam.id}
          exam={exam}
          compact
          onRestart={start}
          onFinish={(r) => {
            recordModuleScore(moduloId, r.nota);
            if (r.nota >= 80) completeModule(moduloId, r.nota);
            saveExamResult({ fecha: new Date().toISOString(), titulo: exam.titulo, nota: r.nota, total: r.total, aciertos: r.aciertos, config: exam.config });
          }}
        />
      </div>
    );
  }

  return (
    <div className="ui-card is-hero" style={{ fontFamily: "var(--ui-font)", color: "var(--ui-text)", textAlign: "center", padding: "40px 24px" }}>
      <div style={{ fontSize: 46 }}>📝</div>
      <h3 className="ui-h2" style={{ marginTop: 10 }}>Examen del módulo {numero}</h3>
      <p className="ui-lead" style={{ margin: "8px auto" }}>
        Cada examen es distinto: vocabulario, gramática, uso de la lengua y una lectura. Con 80 o más, el módulo queda completado.
        <br />
        <span className="ui-zh">每次都是新试卷。80分以上即完成本模块。</span>
      </p>
      <div className="ui-row" style={{ justifyContent: "center", margin: "16px 0" }}>
        {[10, 15, 25].map((n) => (
          <button key={n} className={`ui-chip ${total === n ? "is-on" : ""}`} onClick={() => setTotal(n)} style={{ fontSize: 14, padding: "7px 14px" }}>
            {n} preguntas
          </button>
        ))}
      </div>
      <div className="ui-row" style={{ justifyContent: "center" }}>
        <button className="ui-btn primary lg" onClick={start} disabled={loading}>
          <SparklesIcon size={18} /> {loading ? "Generando…" : "Empezar examen · 开始考试"}
        </button>
        <Link className="ui-btn lg" to="/examenes/generador">
          <Wand2Icon size={18} /> Examen de varios módulos
        </Link>
      </div>
    </div>
  );
}
