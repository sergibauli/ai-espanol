import * as React from "react";
import { Link } from "react-router";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { useGame } from "../lib/gamification.js";
import { lessonId } from "../lib/lessons.js";
import CATALOG from "../data/modulos/catalog.json";

const LEVELS = [
  ["A1", "Principiante · 入门", "#58cc02", "#46a302"],
  ["A2", "Elemental · 初级", "#1cb0f6", "#1899d6"],
  ["B1", "Intermedio · 中级", "#ff9600", "#e08600"],
  ["B2", "Avanzado · 中高级", "#ce82ff", "#a568cc"],
];

// Todas las unidades del curso, agrupadas por nivel
export default function UnidadesPage() {
  const game = useGame();
  const [q, setQ] = React.useState("");
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return (
    <LightShell>
      <div className="unit-page" style={{ maxWidth: 1040 }}>
        <div className="ui-between" style={{ marginBottom: 6 }}>
          <div>
            <h1 className="unit-h2" style={{ fontSize: 30, margin: "6px 0" }}>Unidades · 单元</h1>
            <div className="ui-muted">{CATALOG.length} unidades de A1 a B2 · 5 lecciones + historia + examen en cada una</div>
          </div>
          <input className="ui-input" style={{ maxWidth: 280, background: "#f7f7f7", borderColor: "#e5e5e5", color: "#3c3c3c" }} placeholder="Buscar · 搜索" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {LEVELS.map(([lv, name, c, d]) => {
          const mods = CATALOG.filter((m) => m.nivel === lv && (!q || norm(m.titulo + m.tituloChino).includes(norm(q))));
          if (!mods.length) return null;
          return (
            <section key={lv}>
              <h2 className="unit-h2">
                <span style={{ color: c }}>{lv}</span> · {name}
              </h2>
              <div className="unidades-grid">
                {mods.map((m) => {
                  const n = [0, 1, 2, 3, 4].filter((i) => game.lessons[lessonId(m.numero, i)]).length;
                  return (
                    <Link key={m.numero} to={`/modulos/modulo-${m.numero}`} className="unidad-card" style={{ "--c": c, "--d": d }}>
                      <span className="unidad-art">
                        <Emoji3D emoji={m.icono} size={64} />
                        {n === 5 && <span className="unidad-crown">👑</span>}
                      </span>
                      <small>UNIDAD {m.numero}</small>
                      <b>{m.titulo.split(" - ")[0]}</b>
                      <span className="ui-muted" style={{ fontSize: 13 }}>{m.tituloChino.split(" - ")[0]}</span>
                      <span className="unidad-bar">
                        <i style={{ width: `${n * 20}%` }} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </LightShell>
  );
}
