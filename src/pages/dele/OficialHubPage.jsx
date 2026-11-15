import * as React from "react";
import { Link } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { ArrowRightIcon, SparklesIcon, ZapIcon, TargetIcon, MicIcon, HeadphonesIcon, Wand2Icon, CompassIcon, BookOpenIcon, PenLineIcon } from "lucide-react";
import "../../styles/v23-dele-modos.css";
import "../../styles/dele-portada.css";
import { ESCENAS } from "../../components/dele/EscenasNivel.jsx";
import { ParticulasNivel } from "../../components/ui/ParticulasNivel.jsx";
// Solo cuenta los simulacros nuevos por el nombre del archivo (A1-21.json…), sin descargar su contenido
const NUEVOS = { A1: [], A2: [], B1: [], B2: [] };
for (const ruta of Object.keys(import.meta.glob("../../data/oficial/nuevos/*.json"))) NUEVOS[ruta.split("/").pop().slice(0, 2)]?.push(ruta);

// Portada de los modelos oficiales DELE: cabecera con el dragón y cuatro puertas, una por nivel, cada una con su mundo.
const NIVELES = [
  { key: "A1", nombre: "Acceso", zh: "入门级", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹", t: [45, 25, 25, 15], vista: "640 0 580 420" },
  { key: "A2", nombre: "Plataforma", zh: "基础级", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯", t: [60, 35, 45, 15], vista: "330 0 620 420" },
  { key: "B1", nombre: "Umbral", zh: "进阶级", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山", t: [70, 40, 60, 15], vista: "230 0 720 420" },
  { key: "B2", nombre: "Avanzado", zh: "高阶级", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙", t: [70, 40, 80, 20], vista: "270 0 660 420" },
];
const PRUEBAS = [
  { es: "Lectura", icono: BookOpenIcon },
  { es: "Audición", icono: HeadphonesIcon },
  { es: "Escritura", icono: PenLineIcon },
  { es: "Oral", icono: MicIcon },
];
const TOTAL = 80 + Object.values(NUEVOS).reduce((a, l) => a + l.length, 0);
// Las cuatro formas de prepararse, cada una con su mundo (color, sello y carácter de fondo)
const MODOS = [
  { id: "simulacro", to: "/examenes/generador", icono: ZapIcon, sello: "考", marca: "试", etiqueta: "Examen nuevo cada vez", es: "Simulacro automático", zh: "自动模拟考", desc: "Un examen distinto en cada intento, con nota al momento.", chips: ["4 pruebas", "Nota al instante", "A1–B2"], cta: "Empezar simulacro" },
  { id: "destrezas", to: "/examenes", icono: TargetIcon, sello: "练", marca: "技", etiqueta: "Entrena lo que más te cuesta", es: "Practicar por destrezas", zh: "分项练习", desc: "Lectura, audición, escritura y oral, por niveles.", chips: ["Lectura", "Audición", "Escritura", "Oral"], cta: "Elegir destreza" },
  { id: "oral", to: "/examinador-oral", icono: MicIcon, sello: "问", marca: "言", etiqueta: "Con inteligencia artificial", es: "Examinador oral IA", zh: "AI口语考官", desc: "Preparación, monólogo y preguntas del entrevistador, como en el examen.", chips: ["Monólogo", "Entrevista", "Corrección DELE"], cta: "Hablar con el examinador" },
  { id: "acentos", to: "/audicion", icono: HeadphonesIcon, sello: "音", marca: "声", etiqueta: "Entrena el oído", es: "Acentos del español", zh: "口音听力", desc: "Audiciones con voces de España, México y Argentina.", chips: ["España", "México", "Argentina"], cta: "Escuchar acentos" },
];

// Resultados guardados por el examen (oficial_res_<nivel>_<id> → { total }), sin cargar los modelos
function leerProgreso() {
  const p = {};
  for (const l of NIVELES) p[l.key] = { hechos: 0, suma: 0, ids: new Set() };
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i) || "";
      const m = /^oficial_res_(A1|A2|B1|B2)_/.exec(clave);
      if (!m) continue;
      const r = JSON.parse(localStorage.getItem(clave) || "null");
      if (!r) continue;
      p[m[1]].hechos += 1;
      p[m[1]].ids.add(clave.slice(m[0].length));
      p[m[1]].suma += Number(r.total) || 0;
    }
  } catch {
    /* sin almacenamiento: todo a cero */
  }
  return p;
}

// Nivel recomendado: el más alto empezado y sin terminar (o A1 si aún no hay nada) y su primer modelo pendiente
function siguientePaso(progreso) {
  const empezados = NIVELES.filter((l) => progreso[l.key].hechos > 0 && progreso[l.key].hechos < 20 + NUEVOS[l.key].length);
  const nivel = (empezados[empezados.length - 1] || NIVELES[0]).key;
  let modelo = 1;
  while (modelo < 20 && progreso[nivel].ids.has(String(modelo))) modelo++;
  return { nivel, modelo, nuevo: !NIVELES.some((l) => progreso[l.key].hechos > 0) };
}

// Tejado de pabellón (tejas, aleros curvos y viga lacada) que corona cada puerta
function Tejado({ id }) {
  return (
    <svg className="dp-tejado" viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`dpTeja${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--teja2)" />
          <stop offset="1" stopColor="var(--teja1)" />
        </linearGradient>
      </defs>
      <path d="M150 4 C110 6 60 16 30 30 C18 36 8 34 0 28 C6 42 18 48 34 46 L266 46 C282 48 294 42 300 28 C292 34 282 36 270 30 C240 16 190 6 150 4Z" fill={`url(#dpTeja${id})`} />
      <path d="M30 30 C60 16 110 6 150 4 C190 6 240 16 270 30" fill="none" stroke="#f2c14e" strokeWidth="2.4" />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={54 + i * 16} y1={44} x2={60 + i * 15} y2={14 + Math.abs(6 - i) * 2.2} stroke="rgba(0,0,0,.22)" strokeWidth="2" />
      ))}
      <rect x="22" y="46" width="256" height="14" rx="2" fill="#a50f27" />
      <rect x="22" y="46" width="256" height="14" rx="2" fill="none" stroke="#f2c14e" strokeWidth="1.6" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={46 + i * 26} cy={53} r="2.6" fill="#f2c14e" />
      ))}
      <circle cx="150" cy="5" r="5" fill="#f2c14e" />
    </svg>
  );
}

function Dragon() {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="dp-dragon" aria-hidden="true">
      <span className="dp-sol" />
      <span className="dp-halo" />
      <img className="dp-dragon-img" src={`${base}theme/dragon.webp`} alt="" width="416" height="480" decoding="async" />
      <span className="dp-perla" />
      <img className="dp-nube n1" src={`${base}theme/nube-oro.png`} alt="" />
      <img className="dp-nube n2" src={`${base}theme/nube-oro.png`} alt="" />
      <span className="dp-chispas">
        {Array.from({ length: 9 }, (_, k) => (
          <i key={k} style={{ "--k": k }} />
        ))}
      </span>
    </div>
  );
}

export default function OficialHubPage() {
  const progreso = React.useMemo(leerProgreso, []);
  const hechosTotal = NIVELES.reduce((a, l) => a + progreso[l.key].hechos, 0);
  const sumaTotal = NIVELES.reduce((a, l) => a + progreso[l.key].suma, 0);
  const mediaTotal = hechosTotal ? Math.round(sumaTotal / hechosTotal) : null;
  const base = import.meta.env.BASE_URL;
  const paso = React.useMemo(() => siguientePaso(progreso), [progreso]);

  return (
    <LightShell>
      <div className="unit-page dp" style={{ maxWidth: 1060 }}>
        <section className="dp-cabecera">
          <img className="dp-rodillo izq" src={`${base}theme/rodillo.webp`} alt="" aria-hidden="true" />
          <img className="dp-rodillo der" src={`${base}theme/rodillo.webp`} alt="" aria-hidden="true" />
          <div className="dp-lienzo">
            <span className="dp-nubes-fondo" aria-hidden="true" />
            <span className="dp-marca" aria-hidden="true" translate="no">考</span>
            <Dragon />
            <div className="dp-cab-txt">
              <span className="dp-eyebrow">
                <i translate="no">考</i> DELE · 官方真题
              </span>
              <h1>
                <span>Exámenes DELE oficiales</span>
              </h1>
              <p className="dp-zh" translate="no">西班牙语DELE官方真题 · 四个级别</p>
              <div className="dp-fila">
              <ul className="dp-stats">
                <li>
                  <b>{TOTAL}</b>
                  <span>modelos · 套题</span>
                </li>
                <li>
                  <b>{hechosTotal}</b>
                  <span>hechos · 已完成</span>
                </li>
                <li>
                  <b>{mediaTotal ?? "–"}</b>
                  <span>nota media · 平均分</span>
                </li>
              </ul>
              <Link to={`/oficial/${paso.nivel}/${paso.modelo}`} className="dp-paso">
                <span className="dp-paso-sello" translate="no">步</span>
                <span className="dp-paso-txt">
                  <small>{paso.nuevo ? "Empieza aquí · 从这里开始" : "Tu siguiente paso · 下一步"}</small>
                  <b>
                    DELE {paso.nivel} · Modelo {paso.modelo} <span translate="no">· 第{paso.modelo}套</span>
                  </b>
                </span>
                <ArrowRightIcon size={18} strokeWidth={2.8} />
              </Link>
              </div>
              <nav className="dp-acciones" aria-label="Accesos rápidos">
                <Link to="/examenes/generador" className="dp-btn oro">
                  <ZapIcon size={17} strokeWidth={2.6} /> Examen rápido · 快速测试
                </Link>
                <Link to="/generador" className="dp-btn">
                  <Wand2Icon size={16} strokeWidth={2.4} /> Generador IA · AI出题
                </Link>
                <Link to="/mi-dele" className="dp-btn">
                  <CompassIcon size={16} strokeWidth={2.4} /> Mi DELE · 我的备考
                </Link>
              </nav>
            </div>
          </div>
        </section>

        <h2 className="dp-titulo">
          <span className="dp-titulo-l" aria-hidden="true" />
          Elige tu nivel <small translate="no">选择级别</small>
          <span className="dp-titulo-r" aria-hidden="true" />
        </h2>
        <div className="dp-puertas">
          {NIVELES.map((l, i) => {
            const Escena = ESCENAS[l.key];
            const n = NUEVOS[l.key].length;
            const total = 20 + n;
            const { hechos, suma } = progreso[l.key];
            const pct = Math.min(100, Math.round((hechos / total) * 100));
            const media = hechos ? Math.round(suma / hechos) : null;
            const reco = l.key === paso.nivel;
            return (
              <Link key={l.key} to={`/oficial/${l.key}`} className={`dp-puerta${reco ? " reco" : ""}`} data-nivel={l.key} style={{ "--i": i }}>
                <Tejado id={l.key} />
                <span className="dp-farol izq" aria-hidden="true" />
                <span className="dp-farol der" aria-hidden="true" />
                <span className="dp-bian" aria-hidden="true" translate="no">
                  {l.mundoZh}
                </span>
                <span className="dp-marco">
                  <span className="dp-ventana">
                    <Escena vista={l.vista} />
                    <ParticulasNivel nivel={l.key} />
                    <span className="dp-hoja izq" aria-hidden="true" />
                    <span className="dp-hoja der" aria-hidden="true" />
                    {n > 0 && (
                      <span className="dp-nuevos">
                        <SparklesIcon size={12} /> {n} nuevo{n > 1 ? "s" : ""} · 新
                      </span>
                    )}
                  </span>
                  {reco && (
                    <span className="dp-reco" translate="no">
                      推荐
                    </span>
                  )}
                  <span className="dp-medallon" style={{ "--p": pct }} aria-hidden="true">
                    <span className="dp-sello" translate="no">
                      <i>{l.sello}</i>
                      <b>{l.key}</b>
                    </span>
                  </span>
                  <span className="dp-placa">
                    <small className="dp-mundo">
                      {l.mundo} · <span translate="no">{l.mundoZh}</span>
                    </small>
                    <b className="dp-nivel">DELE {l.key}</b>
                    <span className="dp-nombre">
                      {l.nombre} · <span translate="no">{l.zh}</span>
                    </span>
                    <span className="dp-progreso">
                      <span className="dp-barra">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                      <span className="dp-prog-txt">
                        <b>
                          {hechos}/{total}
                        </b>{" "}
                        hechos<span className="dp-zh-c"> · 完成</span>
                        {media != null && (
                          <em>
                            {" "}
                            · media <b>{media}</b>
                          </em>
                        )}
                      </span>
                    </span>
                    <span className="dp-tiempos">
                      {PRUEBAS.map((p, k) => {
                        const Ic = p.icono;
                        return (
                          <em key={p.es} title={p.es}>
                            <Ic size={12} strokeWidth={2.6} />
                            {l.t[k]}′
                          </em>
                        );
                      })}
                    </span>
                    <span className="dp-cta">
                      {reco && !paso.nuevo ? `Continuar · 继续` : "Entrar · 进入"} <ArrowRightIcon size={15} strokeWidth={2.8} />
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <h2 className="unit-h2">Más formas de prepararte · 更多备考方式</h2>
        <div className="dm-portales">
          {MODOS.map((m, i) => {
            const Icono = m.icono;
            return (
              <Link key={m.to} to={m.to} className="dm-portal" data-modo={m.id} style={{ animationDelay: `${i * 90}ms` }}>
                <span className="dm-fondo" aria-hidden="true">
                  <i className="dm-marca" translate="no">{m.marca}</i>
                  {m.id === "oral" || m.id === "acentos" ? (
                    <span className="dm-ondas">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : null}
                  <span className="dm-chispas">
                    {Array.from({ length: 10 }, (_, k) => (
                      <i key={k} style={{ "--k": k }} />
                    ))}
                  </span>
                </span>
                <span className="dm-sello" aria-hidden="true" translate="no">
                  {m.sello}
                </span>
                <span className="dm-medallon" aria-hidden="true">
                  <span className="dm-anillo" />
                  <Icono size={40} strokeWidth={2.2} />
                </span>
                <span className="dm-txt">
                  <small>{m.etiqueta}</small>
                  <b>{m.es}</b>
                  <span className="dm-zh" translate="no">{m.zh}</span>
                  <span className="dm-desc">{m.desc}</span>
                  <span className="dm-chips">
                    {m.chips.map((c) => (
                      <em key={c}>{c}</em>
                    ))}
                  </span>
                  <span className="dh-cta">
                    {m.cta} <ArrowRightIcon size={16} strokeWidth={2.8} />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </LightShell>
  );
}
