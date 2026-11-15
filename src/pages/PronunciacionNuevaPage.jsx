import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router";
import {
  Volume2Icon,
  Volume1Icon,
  PlayIcon,
  MicIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LightbulbIcon,
  SearchIcon,
  XIcon,
  HeartIcon,
  BookOpenIcon,
  MessageCircleIcon,
  FileTextIcon,
  SparklesIcon,
  LayoutGridIcon,
} from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import PracticePlayer from "../components/pron/PracticePlayer.jsx";
import OndaViva, { useVoz, SelloEstampa } from "../components/pron/OndaViva.jsx";
import { FondoTemplo } from "../components/pron/Escenas.jsx";
import { EmblemaSala, BocaPerfil, AnillosProgreso } from "../components/pron/Emblemas.jsx";
import { TemploSala, FondoImperial } from "../components/pron/Templos.jsx";
import { SALAS, salaDeFamilia, duracionVoz, reducido } from "../components/pron/salas.js";
import { FAMILIAS, materialDe } from "../components/pron/datos.js";
import { useFavorites } from "../lib/favorites.js";
import "../styles/pronunciacion-v2.css";
import "../styles/pronunciacion-sonido.css";
import "../styles/pronunciacion-hero.css";
import "../styles/pronunciacion-templos.css";

const DIFICILES = FAMILIAS.filter((familia) => familia.dificil).length;
const TODAS = FAMILIAS.flatMap((familia) => familia.silabas.map((silaba) => ({ familia, silaba })));
const TOTAL_SILABAS = new Set(TODAS.map((x) => x.silaba.s)).size;
// Letra(s) que representan a la familia: «b», «c», «ch», «ll», «h»…
const LETRAS = { "ge-gi-j": "j", h: "h" };
const letraDe = (familia) => LETRAS[familia.id] || familia.silabas[0].s.replace(/[aeiouáéíóú]+$/, "") || familia.id;

// Progreso guardado
const CLAVES = { oidas: "dele_pron_oidas", dominadas: "dele_pron_dominadas", perfectas: "dele_pron_perfectas", visitadas: "dele_visited_silabas" };
const leer = (clave) => {
  try {
    return new Set(JSON.parse(localStorage.getItem(clave) || "[]"));
  } catch {
    return new Set();
  }
};
function useConjunto(clave) {
  const [valor, setValor] = React.useState(() => leer(clave));
  const anadir = React.useCallback((x) => setValor((previo) => (previo.has(x) ? previo : new Set(previo).add(x))), []);
  React.useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify([...valor]));
    } catch {}
  }, [clave, valor]);
  return [valor, anadir];
}

// Las puertas lacadas del templo se abren una vez por sesión
function usePuertas() {
  const [abrir] = React.useState(() => {
    try {
      if (reducido() || sessionStorage.getItem("pv_puertas")) return false;
      sessionStorage.setItem("pv_puertas", "1");
      return true;
    } catch {
      return false;
    }
  });
  return abrir;
}

const normalizar = (t) =>
  String(t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¡!¿?.,;:"'«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const TITULO = "El templo de los sonidos";

// Pronunciación: un solo templo. Nivel 1 = las seis salas con sus familias; nivel 2 = una familia con sus sílabas,
// y para cada sílaba sus palabras, frases y textos para escuchar, pronunciar y practicar.
export default function PronunciacionNuevaPage() {
  const [params, setParams] = useSearchParams();
  const familia = FAMILIAS.find((f) => f.id === params.get("f")) || null;
  const silaba = familia ? familia.silabas.find((s) => s.s === params.get("s")) || familia.silabas[0] : null;

  const [soloDificiles, setSoloDificiles] = React.useState(false);
  const [busqueda, setBusqueda] = React.useState("");
  const [oidas, oir] = useConjunto(CLAVES.oidas);
  const [dominadas, dominar] = useConjunto(CLAVES.dominadas);
  const [perfectas, perfecta] = useConjunto(CLAVES.perfectas);
  const [visitadas, visitar] = useConjunto(CLAVES.visitadas);
  const [recien, setRecien] = React.useState("");
  const [practica, setPractica] = React.useState(false);
  const voz = useVoz();
  const puertas = usePuertas();
  const raiz = React.useRef(null);

  const reproducir = React.useCallback(
    (texto, velocidad = 0.85) => {
      voz.hablar(texto, velocidad);
      oir(texto);
    },
    [voz.hablar, oir],
  );

  const ir = (f, s, { reemplazar = false } = {}) => {
    const siguiente = new URLSearchParams();
    if (f) siguiente.set("f", f.id);
    if (s) siguiente.set("s", s.s);
    setParams(siguiente, { replace: reemplazar });
    if (s) visitar(s.s);
    const caja = raiz.current?.getBoundingClientRect();
    if (caja && caja.top < 0) raiz.current.scrollIntoView({ block: "start", behavior: reducido() ? "auto" : "smooth" });
  };

  React.useEffect(() => {
    if (silaba) visitar(silaba.s);
  }, [silaba, visitar]);

  const oidasDe = (f) => f.silabas.filter((s) => oidas.has(s.s)).length;
  const dominadasDe = (f) => f.silabas.filter((s) => dominadas.has(s.s)).length;
  const escuchadas = new Set(TODAS.filter((x) => oidas.has(x.silaba.s)).map((x) => x.silaba.s)).size;
  const totalDominadas = new Set(TODAS.filter((x) => dominadas.has(x.silaba.s)).map((x) => x.silaba.s)).size;
  const porcentaje = Math.round((totalDominadas / TOTAL_SILABAS) * 100);
  const continuar = () => {
    const x = TODAS.find((y) => !visitadas.has(y.silaba.s)) || TODAS[0];
    ir(x.familia, x.silaba);
  };

  const alTerminarPractica = (correctas, total) => {
    if (silaba && total && correctas / total >= 0.7 && !dominadas.has(silaba.s)) {
      dominar(silaba.s);
      setRecien(silaba.s);
    }
  };

  return (
    <LightShell>
      <div ref={raiz} className={`pv-root gm-no-adapt${familia ? "" : " is-recinto"}`}>
        {familia ? <FondoTemplo /> : <FondoImperial />}
        <div className="pv-contenido">
          {!familia ? (
            <Salas
              puertas={puertas}
              soloDificiles={soloDificiles}
              setSoloDificiles={setSoloDificiles}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              oidasDe={oidasDe}
              dominadasDe={dominadasDe}
              escuchadas={escuchadas}
              totalDominadas={totalDominadas}
              porcentaje={porcentaje}
              visitadas={visitadas}
              continuar={continuar}
              ir={ir}
            />
          ) : (
            <Familia
              key={familia.id}
              familia={familia}
              silaba={silaba}
              voz={voz}
              reproducir={reproducir}
              oidas={oidas}
              dominadas={dominadas}
              perfectas={perfectas}
              perfecta={perfecta}
              recien={recien}
              ir={ir}
              practicar={() => setPractica(true)}
            />
          )}
        </div>
      </div>
      {practica &&
        familia &&
        silaba &&
        createPortal(<PracticePlayer item={silaba} familia={familia} onClose={() => setPractica(false)} onTerminar={alTerminarPractica} color={salaDeFamilia(familia.id).color} />, document.body)}
    </LightShell>
  );
}

/* ---------- Nivel 1: las salas ---------- */
function Salas({ puertas, soloDificiles, setSoloDificiles, busqueda, setBusqueda, oidasDe, dominadasDe, escuchadas, totalDominadas, porcentaje, visitadas, continuar, ir }) {
  const lista = FAMILIAS.filter((f) => !soloDificiles || f.dificil);
  const siguienteVisita = TODAS.find((y) => !visitadas.has(y.silaba.s)) || null;
  const q = normalizar(busqueda);
  const encontradas = q
    ? [...TODAS.filter((x) => x.silaba.s.startsWith(q)), ...TODAS.filter((x) => !x.silaba.s.startsWith(q) && (x.silaba.s.includes(q) || normalizar(x.silaba.ej).includes(q)))]
    : [];
  return (
    <div className="pv-nivel pv-nivel--salas">
      <Link to="/dashboard" className="sh-back no-print jd-back pv-volver">
        <ArrowLeftIcon size={14} /> Inicio · 首页
      </Link>

      <section className={`pv-hero ph-hero${puertas ? " con-puertas" : ""}`} aria-labelledby="pv-titulo">
        {puertas && (
          <div className="pv-puertas" aria-hidden="true">
            <span className="is-izq">
              <i translate="no">声</i>
            </span>
            <span className="is-der">
              <i translate="no">音</i>
            </span>
          </div>
        )}
        <span className="ph-ondas" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <i key={i} style={{ "--i": i }} />
          ))}
        </span>
        <span className="ph-esquina is-a" aria-hidden="true" />
        <span className="ph-esquina is-b" aria-hidden="true" />
        <span className="ph-esquina is-c" aria-hidden="true" />
        <span className="ph-esquina is-d" aria-hidden="true" />
        <div className="pv-hero__texto">
          <span className="pv-hero__ceja">
            <span className="pv-sello-mini" translate="no">
              音
            </span>
            Pronunciación · 发音
          </span>
          <h1 id="pv-titulo" className="pv-hero__titulo" aria-label={TITULO}>
            {TITULO.split(" ").map((palabra, p, palabras) => (
              <span key={p} className="pv-hero__palabra" aria-hidden="true">
                {[...palabra].map((letra, l) => (
                  <span key={l} className="pv-hero__letra" style={{ "--i": palabras.slice(0, p).join("").length + l }}>
                    {letra}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="pv-hero__zh">声音殿堂</div>
          <p className="pv-hero__desc ph-desc">
            Escucha, repite y graba cada sílaba. Cada sílaba que dominas recibe el sello 印.
            <span>听、跟读并录下每个音节，每掌握一个就盖上一枚“印”章。</span>
          </p>

          <div className="ph-salas" aria-label="Las seis salas · 六个殿堂">
            {SALAS.map((s, n) => {
              const fams = FAMILIAS.filter((f) => s.familias.includes(f.id));
              const total = fams.reduce((a, f) => a + f.silabas.length, 0);
              const hechas = fams.reduce((a, f) => a + dominadasDe(f), 0);
              const oidasSala = fams.reduce((a, f) => a + oidasDe(f), 0);
              const primera = fams[0];
              return (
                <button
                  key={s.id}
                  type="button"
                  className="ph-sala"
                  style={{ "--sala": s.color, "--i": n, "--p": total ? oidasSala / total : 0, "--d": total ? hechas / total : 0 }}
                  onClick={() => primera && ir(primera, primera.silabas[0])}
                  title={`${s.es} · ${s.zh}`}
                >
                  <span className="ph-sala__sello" translate="no">
                    {s.sello}
                  </span>
                  <span className="ph-sala__txt">
                    <b>{s.zh}</b>
                    <small>{s.rasgo}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pv-hero__acciones ph-acciones">
            <button type="button" className="jd-btn-oro pv-btn-oro ph-continuar" onClick={continuar}>
              <PlayIcon size={16} fill="currentColor" />
              {visitadas.size ? "Continuar · 继续" : "Empezar · 开始"}
              {siguienteVisita && (
                <b translate="no" className="ph-continuar__silaba">
                  {siguienteVisita.silaba.s}
                </b>
              )}
            </button>
            <span className="ph-dificiles">
              <i translate="no">难</i> {DIFICILES} familias difíciles para chinos · 中国学生难点
            </span>
          </div>
        </div>

        <div className="pv-hero__escena ph-escena" aria-hidden="true">
          <svg className="pv-anillo ph-anillo" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="pv-anillo__fondo" />
            <circle cx="60" cy="60" r="54" className="ph-anillo__oidas" style={{ "--p": escuchadas / TOTAL_SILABAS }} />
            <circle cx="60" cy="60" r="47" className="pv-anillo__fondo" />
            <circle cx="60" cy="60" r="47" className="ph-anillo__dom" style={{ "--p": porcentaje / 100 }} />
          </svg>
          <span className="pv-hero__halo" />
          <img className="pv-hero__nube" src="./theme/nube-oro.png" alt="" />
          <img className="pv-hero__mono" src="./mono/saluda.png" alt="" />
        </div>

        <div className="ph-marcador">
          <div className="ph-dato">
            <b>{TOTAL_SILABAS}</b>
            <span>
              sílabas · 音节
              <small>
                en {FAMILIAS.length} familias · {FAMILIAS.length}组
              </small>
            </span>
          </div>
          <div className="ph-dato is-oro">
            <b>
              {escuchadas}
              <small>/{TOTAL_SILABAS}</small>
            </b>
            <span>
              escuchadas · 已听
              <i className="ph-barra" style={{ "--p": escuchadas / TOTAL_SILABAS }} />
            </span>
          </div>
          <div className="ph-dato is-laca">
            <b>
              {totalDominadas}
              <small>/{TOTAL_SILABAS}</small>
            </b>
            <span>
              dominadas · 已掌握 印
              <i className="ph-barra" style={{ "--p": totalDominadas / TOTAL_SILABAS }} />
            </span>
          </div>
        </div>
      </section>

      <div className="pv-barra">
        <div className="pv-filtro" role="tablist" aria-label="Filtro · 筛选">
          <button type="button" role="tab" aria-selected={!soloDificiles} className={!soloDificiles ? "is-on" : ""} onClick={() => setSoloDificiles(false)}>
            Todas · 全部 <span>{FAMILIAS.length}</span>
          </button>
          <button type="button" role="tab" aria-selected={soloDificiles} className={soloDificiles ? "is-on" : ""} onClick={() => setSoloDificiles(true)}>
            Difíciles para chinos · 难点 <span>{DIFICILES}</span>
          </button>
        </div>
        <label className="pt-buscar pv-buscar">
          <SearchIcon size={18} aria-hidden="true" />
          <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar sílaba o palabra · 搜索音节" aria-label="Buscar sílaba o palabra · 搜索音节" />
          {busqueda && (
            <button type="button" onClick={() => setBusqueda("")} aria-label="Borrar · 清除">
              <XIcon size={16} />
            </button>
          )}
        </label>
      </div>

      {q ? (
        <section className="pv-resultados" aria-live="polite">
          {encontradas.length ? (
            encontradas.map(({ familia, silaba }, n) => {
              const sala = salaDeFamilia(familia.id);
              return (
                <button key={familia.id + silaba.s} type="button" className={`pt-ficha${visitadas.has(silaba.s) ? " is-visitada" : ""}`} style={{ "--i": n, "--sala": sala.color, "--tinta": sala.tinta }} onClick={() => ir(familia, silaba)}>
                  <span translate="no">{silaba.s}</span>
                  <small>{silaba.ej}</small>
                </button>
              );
            })
          ) : (
            <p className="pt-vacio">
              <img src="./mono/serio.png" alt="" /> No hay ninguna sílaba con «{busqueda}» · 没有找到这个音节
            </p>
          )}
        </section>
      ) : (
        <div className="pv-recinto tq-recinto">
          {SALAS.map((s, k) => {
            const familias = lista.filter((f) => s.familias.includes(f.id));
            if (!familias.length) return null;
            const total = familias.reduce((n, f) => n + f.silabas.length, 0);
            const oidasSala = familias.reduce((n, f) => n + oidasDe(f), 0);
            return (
              <TemploSala key={s.id} sala={s} k={k} oidas={oidasSala} total={total}>
                {familias.map((f, n) => {
                  const hechas = oidasDe(f);
                  const completa = dominadasDe(f) === f.silabas.length;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      className={`pv-medalla${completa ? " is-completa" : ""}`}
                      style={{ "--i": n, "--p": hechas / f.silabas.length }}
                      onClick={() => ir(f, f.silabas[0])}
                      aria-label={`${f.titulo}${f.dificil ? " · difícil · 难点" : ""} · ${hechas}/${f.silabas.length}`}
                    >
                      <span className="pv-medalla__aro" aria-hidden="true">
                        <span className="pv-medalla__cara">
                          <b translate="no">{letraDe(f)}</b>
                        </span>
                      </span>
                      <span className="pv-medalla__nombre">
                        {f.titulo}
                        <small>{f.tituloZh}</small>
                      </span>
                      {f.dificil && (
                        <i className="pv-medalla__dificil" translate="no" aria-hidden="true">
                          难
                        </i>
                      )}
                      {completa && <SelloEstampa texto="印" className="pv-medalla__sello is-quieto" />}
                    </button>
                  );
                })}
              </TemploSala>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PESTANAS = [
  { clave: "palabras", es: "Palabras", zh: "单词", Icono: BookOpenIcon },
  { clave: "frases", es: "Frases", zh: "句子", Icono: MessageCircleIcon },
  { clave: "textos", es: "Textos", zh: "文本", Icono: FileTextIcon },
];

// Resalta la sílaba dentro de la palabra o la frase
function Resaltar({ texto, silaba }) {
  const i = texto.toLowerCase().indexOf(silaba.toLowerCase());
  if (i < 0) return texto;
  return (
    <>
      {texto.slice(0, i)}
      <mark className="pt-marca">{texto.slice(i, i + silaba.length)}</mark>
      {texto.slice(i + silaba.length)}
    </>
  );
}

/* ---------- Nivel 2: una familia y sus sílabas ---------- */
function Familia({ familia, silaba, voz, reproducir, oidas, dominadas, perfectas, perfecta, recien, ir, practicar }) {
  const sala = salaDeFamilia(familia.id);
  const indice = FAMILIAS.indexOf(familia);
  const anterior = FAMILIAS[(indice - 1 + FAMILIAS.length) % FAMILIAS.length];
  const siguiente = FAMILIAS[(indice + 1) % FAMILIAS.length];
  const { nivel, texto: sonando, hablar } = voz;
  const temporizadores = React.useRef([]);
  const [pestana, setPestana] = React.useState("palabras");
  const [direccion, setDireccion] = React.useState(1);
  const material = React.useMemo(() => materialDe(silaba), [silaba]);
  const hechas = familia.silabas.filter((s) => oidas.has(s.s)).length;
  const dom = familia.silabas.filter((s) => dominadas.has(s.s)).length;
  const siguienteSilaba = familia.silabas[familia.silabas.indexOf(silaba) + 1] || null;
  const [reproduciendoTodas, setReproduciendoTodas] = React.useState(false);

  React.useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);
  React.useEffect(() => setPestana("palabras"), [silaba]);

  const elegir = (s) => {
    temporizadores.current.forEach(clearTimeout);
    setReproduciendoTodas(false);
    setDireccion(familia.silabas.indexOf(s) >= familia.silabas.indexOf(silaba) ? 1 : -1);
    ir(familia, s, { reemplazar: true });
    reproducir(s.s);
  };
  const reproducirFamilia = () => {
    temporizadores.current.forEach(clearTimeout);
    let espera = 0;
    setReproduciendoTodas(true);
    temporizadores.current = familia.silabas.map((s) => {
      const t = setTimeout(() => reproducir(s.s), espera);
      espera += Math.max(1100, duracionVoz(s.s) + 250);
      return t;
    });
    temporizadores.current.push(setTimeout(() => setReproduciendoTodas(false), espera));
  };

  return (
    <div className="pv-nivel pv-nivel--familia" style={{ "--sala": sala.color, "--tinta": sala.tinta }}>
      <div className="pv-familia__nav">
        <button type="button" className="pv-nav-btn" onClick={() => ir(null, null)}>
          <LayoutGridIcon size={16} /> Las salas · 殿堂
        </button>
        <span>
          <button type="button" className="pv-nav-btn" onClick={() => ir(anterior, anterior.silabas[0])} aria-label={`Familia anterior: ${anterior.titulo} · 上一组`}>
            <ArrowLeftIcon size={16} /> <b translate="no">{letraDe(anterior)}</b>
          </button>
          <button type="button" className="pv-nav-btn" onClick={() => ir(siguiente, siguiente.silabas[0])} aria-label={`Familia siguiente: ${siguiente.titulo} · 下一组`}>
            <b translate="no">{letraDe(siguiente)}</b> <ArrowRightIcon size={16} />
          </button>
        </span>
      </div>

      <section className="pe-portico" aria-labelledby="pv-familia-titulo">
        <span className="pe-portico__nubes" aria-hidden="true" />
        <div className="pe-portico__emblema">
          <EmblemaSala sala={sala} sonando={nivel > 0} />
        </div>
        <div className="pe-portico__texto">
          <span className="pe-portico__sala">
            <i translate="no">{sala.sello}</i> {sala.es} · {sala.zh}
          </span>
          <div className="pe-portico__titulo">
            <span className="pe-portico__letra" translate="no">
              {letraDe(familia)}
            </span>
            <div>
              <h1 id="pv-familia-titulo">
                {familia.titulo} <span>{familia.tituloZh}</span>
              </h1>
              {familia.dificil ? (
                <span className="pv-chip is-laca">
                  <i translate="no">难</i> Difícil para hablantes de chino · 中国学生难点
                </span>
              ) : (
                <span className="pv-chip">Sonido parecido al chino · 与汉语相近</span>
              )}
            </div>
          </div>
        </div>
        <div className="pe-portico__progreso" aria-label={`Escuchadas ${hechas} de ${familia.silabas.length}; dominadas ${dom} de ${familia.silabas.length} · 已听 / 已掌握`}>
          <AnillosProgreso oidas={hechas} dominadas={dom} total={familia.silabas.length} />
          <div>
            <p>
              <i className="is-oro" /> Escuchadas · 已听 <b>{hechas}/{familia.silabas.length}</b>
            </p>
            <p>
              <i className="is-laca" /> Dominadas · 已掌握 <b>{dom}/{familia.silabas.length}</b>
            </p>
            <span className="pe-portico__puntos" aria-hidden="true">
              {familia.silabas.map((s) => (
                <i key={s.s} className={dominadas.has(s.s) ? "is-dom" : oidas.has(s.s) ? "is-oida" : ""} title={s.s} />
              ))}
            </span>
          </div>
        </div>
        <img className="pe-portico__mono" src={`./mono/${nivel > 0 ? "poder" : dom === familia.silabas.length ? "trofeo" : "guino"}.png`} alt="" />
      </section>

      <div className="pv-pergamino">
        <div className="pv-pergamino__cuerpo">
          <div className="pe-guia">
            <BocaPerfil sala={sala} sonando={nivel > 0} />
            <div className="pe-guia__der">
              <button type="button" className={`pe-onda${nivel > 0 ? " is-viva" : ""}`} onClick={() => reproducir(silaba.s, 0.8)} aria-label={`Escuchar «${silaba.s}» · 听`}>
                <span className="pe-onda__cabeza">
                  <span className="pe-onda__estado">
                    {nivel > 0 ? (
                      <>
                        <Volume2Icon size={15} /> Suena · 正在播放
                      </>
                    ) : (
                      <>
                        <PlayIcon size={14} fill="currentColor" /> Toca para oír · 点击试听
                      </>
                    )}
                  </span>
                  <b translate="no">{nivel > 0 && sonando ? sonando : silaba.s}</b>
                </span>
                <OndaViva nivel={nivel > 0 ? nivel : 0.4} color={sala.color} alto={56} />
              </button>
              <div className="pe-consejo">
                <span className="pe-consejo__icono" aria-hidden="true">
                  <LightbulbIcon size={18} />
                </span>
                <div>
                  <b>Consejo · 发音要诀</b>
                  <p className="pe-consejo__es">{familia.pista || sala.pista}</p>
                  <p className="pe-consejo__zh">{familia.consejoZh}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pe-botica">
            <div className="pe-botica__tejado" aria-hidden="true">
              <span>
                Botica de sílabas · <b translate="no">音节药柜</b>
              </span>
            </div>
            <div className="pe-botica__cajones" role="tablist" aria-label="Sílabas · 音节">
              {familia.silabas.map((s, n) => {
                const esDom = dominadas.has(s.s);
                const esOida = oidas.has(s.s);
                return (
                  <button
                    key={s.s}
                    type="button"
                    role="tab"
                    aria-selected={s === silaba}
                    style={{ "--i": n }}
                    className={`pe-cajon${s === silaba ? " is-on" : ""}${esOida ? " is-oida" : ""}${esDom ? " is-dominada" : ""}${sonando === s.s ? " is-sonando" : ""}`}
                    onClick={() => elegir(s)}
                  >
                    <span className="pe-cajon__hueco" aria-hidden="true">
                      <span className="pe-cajon__hierbas" />
                    </span>
                    <span className="pe-cajon__frente">
                      <span className="pe-cajon__etiqueta">
                        <b translate="no">{s.s}</b>
                        <small>{s.ej}</small>
                      </span>
                      <i className="pe-cajon__tirador" aria-hidden="true" />
                      <i className="pe-cajon__ondas" aria-hidden="true" />
                    </span>
                    <span className="pe-cajon__estado">{esDom ? "Dominada · 掌握" : esOida ? "Escuchada · 已听" : "Nueva · 新"}</span>
                    {esDom && <SelloEstampa texto="印" className={`pe-cajon__sello${recien === s.s ? "" : " is-quieto"}`} />}
                  </button>
                );
              })}
              <button type="button" className={`pe-cajon is-todas${reproduciendoTodas ? " is-sonando" : ""}`} onClick={reproducirFamilia}>
                <span className="pe-cajon__frente">
                  <span className="pe-cajon__gong" aria-hidden="true">
                    {nivel > 0 ? <SparklesIcon size={20} /> : <PlayIcon size={20} fill="currentColor" />}
                  </span>
                  <span className="pe-cajon__todas">
                    Escuchar todas
                    <small>连续播放</small>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div key={silaba.s} className={`pv-detalle ${direccion < 0 ? "desde-izq" : "desde-der"}`}>
            <div className={`pe-ficha${dominadas.has(silaba.s) ? " is-dominada" : ""}`}>
              <span className="pe-ficha__rodillo is-arriba" aria-hidden="true" />
              <button type="button" className={`pe-ficha__sello${sonando === silaba.s ? " is-sonando" : ""}`} onClick={() => reproducir(silaba.s, 0.8)} aria-label={`Escuchar «${silaba.s}» · 听`}>
                <i className="pe-ficha__aros" aria-hidden="true">
                  <i />
                  <i />
                </i>
                <span translate="no">{silaba.s}</span>
                <small>
                  <Volume2Icon size={14} /> Escuchar · 听
                </small>
              </button>
              <div className="pe-ficha__centro">
                <Formula silaba={silaba.s} muda={familia.id === "h"} />
                <button type="button" className={`pe-ficha__ej${sonando === silaba.ej ? " is-sonando" : ""}`} onClick={() => reproducir(silaba.ej)}>
                  <span className="pe-ficha__ej-etq">Ejemplo · 例词</span>
                  <b>
                    <Resaltar texto={silaba.ej} silaba={silaba.s} />
                  </b>
                  <small>{silaba.ejZh}</small>
                  <Volume2Icon size={18} aria-hidden="true" className="pe-ficha__ej-icono" />
                </button>
              </div>
              <div className="pe-ficha__acciones">
                <button type="button" className="pv-btn-laca" onClick={() => reproducir(silaba.s, 0.55)}>
                  <Volume1Icon size={17} /> Lento · 慢速
                </button>
                <button type="button" className="jd-btn-oro pv-btn-oro" onClick={practicar}>
                  <MicIcon size={17} /> Practicar con el Rey Mono · 跟练
                </button>
                <p className="pe-ficha__meta">
                  {dominadas.has(silaba.s) ? "¡Sílaba dominada! · 已掌握" : "Acierta el 70 % para ganar el sello 印 · 答对70%得印章"}
                </p>
                {siguienteSilaba && (
                  <button type="button" className="pe-ficha__siguiente" onClick={() => elegir(siguienteSilaba)}>
                    Siguiente: <b translate="no">{siguienteSilaba.s}</b> <ArrowRightIcon size={15} />
                  </button>
                )}
              </div>
              {dominadas.has(silaba.s) && <SelloEstampa texto="印" sub="dominada · 掌握" className={`pe-ficha__dominada${recien === silaba.s ? "" : " is-quieto"}`} />}
              {recien === silaba.s && (
                <span className="pe-ficha__fiesta" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <i key={i} style={{ "--i": i }} />
                  ))}
                </span>
              )}
              <span className="pe-ficha__rodillo is-abajo" aria-hidden="true" />
            </div>

            <div className="pt-pestanas" role="tablist">
              {PESTANAS.map(({ clave, es, zh, Icono }) => (
                <button key={clave} type="button" role="tab" aria-selected={pestana === clave} className={pestana === clave ? "is-on" : ""} onClick={() => setPestana(clave)} disabled={!material[clave].length}>
                  <Icono size={16} /> {es} · {zh} <span>{material[clave].length}</span>
                </button>
              ))}
            </div>

            <Lista key={pestana} tipo={pestana} items={material[pestana]} silaba={silaba} hablar={hablar} sonando={sonando} perfectas={perfectas} perfecta={perfecta} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Consonante + vocal = sílaba (la h muda, tachada)
function Formula({ silaba, muda }) {
  const vocal = silaba.match(/[aeiouáéíóú]+$/)?.[0] || "";
  const consonante = silaba.slice(0, silaba.length - vocal.length);
  return (
    <div className="pv-formula pe-formula" aria-label={`${consonante} + ${vocal} = ${silaba}`}>
      <span className={`pv-formula__ficha is-cons${muda ? " is-muda" : ""}`} translate="no">
        {consonante}
      </span>
      <i>+</i>
      <span className="pv-formula__ficha is-vocal" translate="no">
        {vocal}
      </span>
      <i>=</i>
      <span className="pv-formula__ficha is-total" translate="no">
        {silaba}
      </span>
      <small>{muda ? "La h no suena · h不发音" : "consonante + vocal · 辅音 + 元音"}</small>
    </div>
  );
}

// Palabras, frases o textos de una sílaba: escuchar, lento, pronunciar (reconocimiento de voz) y favorito
function Lista({ tipo, items, silaba, hablar, sonando, perfectas, perfecta }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [escuchando, setEscuchando] = React.useState("");
  const [resultado, setResultado] = React.useState({});
  const reconocedor = React.useRef(null);
  React.useEffect(() => () => reconocedor.current?.abort?.(), []);

  const pronunciar = (objetivo) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setResultado((r) => ({ ...r, [objetivo]: { estado: "sin", oido: "" } }));
      return;
    }
    if (escuchando === objetivo) {
      reconocedor.current?.stop?.();
      return;
    }
    reconocedor.current?.abort?.();
    const rec = new SR();
    reconocedor.current = rec;
    rec.lang = "es-ES";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    setEscuchando(objetivo);
    setResultado((r) => ({ ...r, [objetivo]: undefined }));
    rec.onresult = (evento) => {
      const meta = normalizar(objetivo);
      const alternativas = [...evento.results[0]].map((alt) => normalizar(alt.transcript));
      const bien = alternativas.some((oido) => oido && (oido.includes(meta) || meta.includes(oido)));
      setResultado((r) => ({ ...r, [objetivo]: { estado: bien ? "ok" : "mal", oido: evento.results[0][0].transcript } }));
      if (bien) perfecta(objetivo);
    };
    rec.onerror = (e) => {
      if (e?.error === "no-speech") setResultado((r) => ({ ...r, [objetivo]: { estado: "mal", oido: "" } }));
      else if (e?.error && e.error !== "aborted") setResultado((r) => ({ ...r, [objetivo]: { estado: "sin", oido: "" } }));
    };
    rec.onend = () => setEscuchando((actual) => (actual === objetivo ? "" : actual));
    try {
      rec.start();
    } catch {
      setEscuchando("");
    }
  };

  const clase = tipo === "palabras" ? "palabra" : tipo === "frases" ? "frase" : "texto";
  return (
    <div className={`pt-lista pt-lista--${tipo}`}>
      {items.map(({ es, zh }, n) => {
        const r = resultado[es];
        const oyendo = escuchando === es;
        const bien = perfectas.has(es) || r?.estado === "ok";
        return (
          <article key={es} className={`pt-item pt-item--${clase}${bien ? " is-perfecta" : ""}${oyendo ? " is-escuchando" : ""}${sonando === es ? " is-sonando" : ""}`} style={{ "--i": n }}>
            <span className="pt-item__brillo" aria-hidden="true" />
            <span className="pt-item__n">{n + 1}</span>
            <p className="pt-item__es">
              <Resaltar texto={es} silaba={silaba.s} />
            </p>
            <p className="pt-item__zh">{zh}</p>
            <div className="pt-item__botones">
              <button type="button" onClick={() => hablar(es, 0.9)} aria-label={`Escuchar «${es}» · 听`}>
                <Volume2Icon size={16} /> Escuchar · 听
              </button>
              {clase !== "texto" && (
                <button type="button" className="is-lento" onClick={() => hablar(es, 0.55)} aria-label={`Lento «${es}» · 慢速`}>
                  <Volume1Icon size={16} />
                </button>
              )}
              <button type="button" className={`is-mic${oyendo ? " is-on" : ""}`} onClick={() => pronunciar(es)}>
                <MicIcon size={16} /> {oyendo ? "Te escucho… · 正在听" : "Pronunciar · 跟读"}
              </button>
              {clase === "palabra" && (
                <button
                  type="button"
                  className={`is-fav${isFavorite(es) ? " is-on" : ""}`}
                  onClick={() => (isFavorite(es) ? removeFavorite(es) : addFavorite(es, zh, `Pronunciación · ${silaba.s}`, "A1-B2"))}
                  aria-label="Favorito · 收藏"
                  aria-pressed={isFavorite(es)}
                >
                  <HeartIcon size={16} fill={isFavorite(es) ? "currentColor" : "none"} />
                </button>
              )}
            </div>
            {r?.estado === "mal" && <p className="pt-item__aviso is-mal">{r.oido ? `Te he oído «${r.oido}». ¡Otra vez! · 再试一次` : "No te he oído. ¡Otra vez! · 没听清，再试一次"}</p>}
            {r?.estado === "sin" && <p className="pt-item__aviso">Usa Chrome o Edge para el reconocimiento de voz · 请用 Chrome 或 Edge 进行语音识别</p>}
            {bien && <SelloEstampa texto="好" sub="¡Perfecto!" className={`pt-item__sello${r?.estado === "ok" ? "" : " is-quieto"}`} />}
          </article>
        );
      })}
    </div>
  );
}
