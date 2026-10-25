import * as React from "react";
import { useNavigate } from "react-router";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { useGame } from "../lib/gamification.js";
import { lessonId } from "../lib/lessons.js";
import CATALOG from "../data/modulos/catalog.json";
import { InsigniaNivel, TarjetaUnidad } from "../../packages/imperial/src/index.js";

const LEVELS = [
  ["A1", "Principiante · 入门"],
  ["A2", "Elemental · 初级"],
  ["B1", "Intermedio · 中级"],
  ["B2", "Avanzado · 中高级"],
];

// Todas las unidades del curso, agrupadas por nivel
export default function UnidadesPage() {
  const game = useGame();
  const navigate = useNavigate();
  const [q, setQ] = React.useState("");
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return (
    <LightShell>
      <div className="unit-page unidades-sheet" style={{ maxWidth: 1040 }}>
        <div className="ui-between" style={{ marginBottom: 6 }}>
          <div>
            <h1 className="unit-h2" style={{ fontSize: 30, margin: "6px 0" }}>Unidades · 单元</h1>
            <div className="ui-muted">{CATALOG.length} unidades de A1 a B2 · 5 lecciones + historia + examen en cada una</div>
          </div>
          <input className="ui-input" style={{ maxWidth: 280 }} placeholder="Buscar unidad · 搜索" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {LEVELS.map(([lv, name]) => {
          const mods = CATALOG.filter((m) => m.nivel === lv && (!q || norm(m.titulo + m.tituloChino).includes(norm(q))));
          if (!mods.length) return null;
          return (
            <section key={lv}>
              <h2 className="unit-h2 unidades-nivel">
                <InsigniaNivel nivel={lv} tamano="sm" /> {name}
              </h2>
              <div className="unidades-grid">
                {mods.map((m) => {
                  const n = [0, 1, 2, 3, 4].filter((i) => game.lessons[lessonId(m.numero, i)]).length;
                  return (
                    <TarjetaUnidad
                      key={m.numero}
                      numero={m.numero}
                      titulo={m.titulo.split(" - ")[0]}
                      tituloZh={m.tituloChino.split(" - ")[0]}
                      icono={<Emoji3D emoji={m.icono} size={44} />}
                      progreso={n / 5}
                      estado={n === 5 ? "completada" : n > 0 ? "en-curso" : "nuevo"}
                      onClick={() => navigate(`/modulos/modulo-${m.numero}`)}
                    />
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
