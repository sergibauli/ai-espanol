import * as React from "react";
import { useNavigate } from "react-router";
import { SearchIcon, PlayIcon, CheckIcon, SparklesIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { useGame } from "../lib/gamification.js";
import { lessonId } from "../lib/lessons.js";
import CATALOG from "../data/modulos/catalog.json";
import { Moneda } from "../../packages/imperial/src/index.js";

// Cada nivel es un tramo del viaje con su mundo (los mismos que los niveles DELE)
const LEVELS = [
  { lv: "A1", es: "Principiante", zh: "入门", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹" },
  { lv: "A2", es: "Elemental", zh: "初级", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯" },
  { lv: "B1", es: "Intermedio", zh: "中级", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山" },
  { lv: "B2", es: "Avanzado", zh: "中高级", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙" },
];

function TarjetaUnidad({ m, hechas, onAbrir, i }) {
  const estado = hechas === 5 ? "completada" : hechas > 0 ? "en-curso" : "nueva";
  const ref = React.useRef(null);
  // Inclinación 3D siguiendo el puntero
  const mover = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  };
  const salir = () => ref.current && (ref.current.style.setProperty("--rx", "0deg"), ref.current.style.setProperty("--ry", "0deg"));
  return (
    <button ref={ref} type="button" className={`un-carta ${estado}`} onClick={onAbrir} onPointerMove={mover} onPointerLeave={salir} style={{ animationDelay: `${Math.min(i, 16) * 35}ms`, "--pr": hechas / 5 }}>
      <span className="un-num">{String(m.numero).padStart(2, "0")}</span>
      <span className="un-moneda">
        <span className="un-anillo" aria-hidden="true" />
        <Moneda tono={estado === "completada" ? "oro" : "jade"} tamano={78} brillo={estado === "en-curso"}>
          <Emoji3D emoji={m.icono} size={34} />
        </Moneda>
      </span>
      <span className="un-titulo">{m.titulo.split(" - ")[0]}</span>
      <span className="un-zh">{m.tituloChino.split(" - ")[0]}</span>
      <span className="un-pie">
        {estado === "completada" ? (
          <span className="un-estado ok">
            <CheckIcon size={13} strokeWidth={3} /> Completada
          </span>
        ) : estado === "en-curso" ? (
          <span className="un-estado curso">
            <PlayIcon size={12} strokeWidth={3} /> {hechas}/5 lecciones
          </span>
        ) : (
          <span className="un-estado nueva">
            <SparklesIcon size={12} strokeWidth={3} /> Empezar
          </span>
        )}
      </span>
    </button>
  );
}

export default function UnidadesPage() {
  const game = useGame();
  const navigate = useNavigate();
  const [q, setQ] = React.useState("");
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const hechasDe = (m) => [0, 1, 2, 3, 4].filter((i) => game.lessons[lessonId(m.numero, i)]).length;
  const completadas = CATALOG.filter((m) => hechasDe(m) === 5).length;
  const pctTotal = Math.round((completadas / CATALOG.length) * 100);
  const irA = (lv) => document.getElementById(`un-${lv}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <LightShell>
      <div className="un">
        <header className="un-hero">
          <div className="un-hero-luz" aria-hidden="true" />
          <div className="un-hero-txt">
            <p className="un-kicker">El viaje · 旅程</p>
            <h1>
              Unidades <span>单元</span>
            </h1>
            <p className="un-sub">
              {CATALOG.length} unidades de A1 a B2 · 5 lecciones, historia y examen en cada una
              <small>从A1到B2的{CATALOG.length}个单元 · 每单元5课 + 故事 + 考试</small>
            </p>
            <label className="un-buscar">
              <SearchIcon size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar unidad · 搜索单元" aria-label="Buscar unidad" />
            </label>
          </div>
          <div className="un-hero-prog" style={{ "--p": pctTotal }}>
            <span className="un-hero-aro">
              <b>{completadas}</b>
              <small>/ {CATALOG.length}</small>
            </span>
            <span>Unidades completadas · 已完成</span>
          </div>
          <nav className="un-saltos" aria-label="Ir al nivel">
            {LEVELS.map((L) => (
              <button key={L.lv} type="button" data-nivel={L.lv} onClick={() => irA(L.lv)}>
                <i translate="no">{L.sello}</i>
                <b>{L.lv}</b>
                <small>{L.es}</small>
              </button>
            ))}
          </nav>
        </header>

        {LEVELS.map((L) => {
          const mods = CATALOG.filter((m) => m.nivel === L.lv && (!q || norm(m.titulo + m.tituloChino).includes(norm(q))));
          if (!mods.length) return null;
          const todas = CATALOG.filter((m) => m.nivel === L.lv);
          const hechasNivel = todas.filter((m) => hechasDe(m) === 5).length;
          return (
            <section key={L.lv} id={`un-${L.lv}`} className="un-nivel" data-nivel={L.lv}>
              <div className="un-banda">
                <span className="un-banda-sello" aria-hidden="true" translate="no">
                  <i>{L.sello}</i>
                  <b>{L.lv}</b>
                </span>
                <span className="un-banda-txt">
                  <small>
                    {L.mundo} · <span translate="no">{L.mundoZh}</span>
                  </small>
                  <b>
                    {L.es} · {L.zh}
                  </b>
                </span>
                <span className="un-banda-prog">
                  <i style={{ width: `${(hechasNivel / todas.length) * 100}%` }} />
                  <em>
                    {hechasNivel}/{todas.length}
                  </em>
                </span>
              </div>
              <div className="un-grid">
                {mods.map((m, i) => (
                  <TarjetaUnidad key={m.numero} m={m} i={i} hechas={hechasDe(m)} onAbrir={() => navigate(`/modulos/modulo-${m.numero}`)} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </LightShell>
  );
}
