import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { Volume2Icon, PlayIcon, SkipBackIcon, SkipForwardIcon, MicIcon, Gamepad2Icon, ArrowLeftIcon, CheckIcon, LightbulbIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { speak } from "../components/lesson/fx.js";
import FAMILIAS from "../data/pronunciacion.json";
import PracticePlayer from "../components/pron/PracticePlayer.jsx";

const DIFICILES = FAMILIAS.filter((familia) => familia.dificil).length;
// Letra(s) que representan a la familia en su ficha: «b», «c», «ch», «ll»…
const letraDe = (familia) => familia.silabas.map((silaba) => silaba.s)[0].replace(/[aeiouáéíóú]+$/, "") || familia.id;

// Pronunciación: familias de sílabas del español con ejemplo, consejo en chino y audio
export default function PronunciacionNuevaPage() {
  const [soloDificiles, setSoloDificiles] = React.useState(false);
  const [abierta, setAbierta] = React.useState(() => FAMILIAS.find((familia) => familia.dificil)?.id);
  const [oidas, setOidas] = React.useState(() => new Set());
  const [practica, setPractica] = React.useState(null);
  const [sonando, setSonando] = React.useState("");
  const temporizadores = React.useRef([]);
  const lista = FAMILIAS.filter((familia) => !soloDificiles || familia.dificil);
  const familia = lista.find((f) => f.id === abierta) || lista[0];
  const indice = lista.indexOf(familia);

  React.useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);

  const reproducir = (texto) => {
    speak(texto, 0.85);
    setSonando(texto);
    setOidas((previas) => new Set(previas).add(texto));
  };
  const reproducirFamilia = () => {
    temporizadores.current.forEach(clearTimeout);
    temporizadores.current = familia.silabas.map((silaba, n) => setTimeout(() => reproducir(silaba.s), n * 1100));
  };
  const irA = (paso) => setAbierta(lista[(indice + paso + lista.length) % lista.length].id);
  const oidasDe = (f) => f.silabas.filter((silaba) => oidas.has(silaba.s)).length;

  return (
    <LightShell>
      <div className="ui-page jd-pron">
        <Link to="/dashboard" className="sh-back no-print jd-back">
          <ArrowLeftIcon size={14} /> Inicio · 首页
        </Link>

        <section className="jd-hero jd-hero--pron" aria-labelledby="jd-pron-titulo">
          <span className="jd-hero__linterna is-der" aria-hidden="true" />
          <div className="jd-hero__texto">
            <span className="jd-hero__ceja">
              <span className="jd-sello-mini" translate="no">
                音
              </span>
              Pronunciación · 发音
            </span>
            <h1 id="jd-pron-titulo" className="jd-hero__titulo">
              El templo de los sonidos
            </h1>
            <div className="jd-hero__zh">声音殿堂</div>
            <p className="jd-hero__desc">
              {FAMILIAS.length} familias de sílabas: escucha, repite y graba tu voz. Las marcadas con el sello 难 son las más difíciles para hablantes de chino.
              <span>{FAMILIAS.length}组音节：听、跟读、录音。盖“难”字印章的是中国学生最容易出错的发音。</span>
            </p>
            <div className="jd-hero__acciones">
              <Link to="/pronunciacion/templo" className="jd-btn-oro">
                <Gamepad2Icon size={18} /> Templo de las Sílabas · 音节圣殿
              </Link>
            </div>
            <div className="jd-hero__stats">
              <span>
                <b>{FAMILIAS.length}</b> familias · 组
              </span>
              <span>
                <b>{DIFICILES}</b> difíciles · 难点
              </span>
              <span>
                <b>{oidas.size}</b> escuchadas · 已听
              </span>
            </div>
          </div>
          <div className="jd-hero__escena" aria-hidden="true">
            <span className="jd-hero__halo" />
            <img className="jd-hero__nube" src="./theme/nube-oro.png" alt="" />
            <img className="jd-hero__mono" src="./mono/saluda.png" alt="" />
          </div>
        </section>

        <div className="jd-tabs jd-pron__filtro" role="tablist" aria-label="Filtro · 筛选">
          <button type="button" role="tab" aria-selected={!soloDificiles} className={!soloDificiles ? "is-on" : ""} onClick={() => setSoloDificiles(false)}>
            Todas · 全部 <span className="jd-tabs__n">{FAMILIAS.length}</span>
          </button>
          <button type="button" role="tab" aria-selected={soloDificiles} className={soloDificiles ? "is-on" : ""} onClick={() => setSoloDificiles(true)}>
            Difíciles para chinos · 难点 <span className="jd-tabs__n">{DIFICILES}</span>
          </button>
        </div>

        <div className="jd-pron__layout">
          <nav className="jd-familias" aria-label="Familias de sílabas · 音节组">
            {lista.map((f) => {
              const hechas = oidasDe(f);
              return (
                <button key={f.id} type="button" className={`jd-familia${familia?.id === f.id ? " is-on" : ""}${f.dificil ? " is-dificil" : ""}`} onClick={() => setAbierta(f.id)} aria-pressed={familia?.id === f.id} aria-label={`${f.titulo}${f.dificil ? " · difícil · 难点" : ""}`}>
                  <b translate="no">{letraDe(f)}</b>
                  <small>{f.titulo}</small>
                  {f.dificil && (
                    <i className="jd-familia__sello" translate="no" aria-hidden="true">
                      难
                    </i>
                  )}
                  {hechas > 0 && <span className="jd-familia__barra" style={{ "--jd-p": hechas / f.silabas.length }} aria-hidden="true" />}
                </button>
              );
            })}
          </nav>

          {familia && (
            <section className="jd-panel" aria-live="polite">
              <span className="jd-pergamino__rodillo is-arriba" aria-hidden="true" />
              <div className="jd-panel__cuerpo">
                <header className="jd-panel__cabeza">
                  <span className="jd-panel__letra" translate="no">
                    {letraDe(familia)}
                  </span>
                  <div>
                    <h2 className="jd-panel__titulo">
                      {familia.titulo} <span>{familia.tituloZh}</span>
                    </h2>
                    {familia.dificil ? (
                      <span className="jd-chip jd-chip--laca">
                        <i translate="no">难</i> Difícil para hablantes de chino · 中国学生难点
                      </span>
                    ) : (
                      <span className="jd-chip">Sonido parecido al chino · 与汉语相近</span>
                    )}
                  </div>
                  <span className="jd-panel__progreso" title="Sílabas escuchadas · 已听音节">
                    <CheckIcon size={14} /> {oidasDe(familia)}/{familia.silabas.length}
                  </span>
                </header>

                <div className="jd-consejo">
                  <LightbulbIcon size={20} aria-hidden="true" />
                  <div>
                    <b>Consejo · 发音要诀</b>
                    <p>{familia.consejoZh}</p>
                  </div>
                </div>

                <div className="jd-silabas">
                  {familia.silabas.map((silaba) => (
                    <article key={silaba.s} className={`jd-silaba${oidas.has(silaba.s) ? " is-oida" : ""}${sonando === silaba.s ? " is-sonando" : ""}`}>
                      <button type="button" className="jd-silaba__s" onClick={() => reproducir(silaba.s)} aria-label={`Escuchar «${silaba.s}» · 听`}>
                        <span translate="no">{silaba.s}</span>
                        <Volume2Icon size={18} aria-hidden="true" />
                      </button>
                      <button type="button" className="jd-silaba__ej" onClick={() => reproducir(silaba.ej)} aria-label={`Escuchar «${silaba.ej}» · 听`}>
                        <b>{silaba.ej}</b>
                        <small>{silaba.ejZh}</small>
                      </button>
                      <button type="button" className="jd-silaba__practicar" onClick={() => setPractica(silaba)}>
                        <MicIcon size={15} aria-hidden="true" /> Practicar · 练习
                        <small>
                          {(silaba.palabras || []).length} palabras · {(silaba.frases || []).length} frases
                        </small>
                      </button>
                    </article>
                  ))}
                </div>

                <div className="jd-reproductor" aria-label="Reproductor de familias · 播放器">
                  <button type="button" aria-label="Familia anterior · 上一组" onClick={() => irA(-1)}>
                    <SkipBackIcon size={20} fill="currentColor" />
                  </button>
                  <button type="button" className="is-play" onClick={reproducirFamilia}>
                    <PlayIcon size={20} fill="currentColor" /> Escuchar la familia · 连续播放
                  </button>
                  <button type="button" aria-label="Familia siguiente · 下一组" onClick={() => irA(1)}>
                    <SkipForwardIcon size={20} fill="currentColor" />
                  </button>
                </div>
              </div>
              <span className="jd-pergamino__rodillo is-abajo" aria-hidden="true" />
            </section>
          )}
        </div>
      </div>
      {practica && familia && createPortal(<PracticePlayer item={practica} familia={familia} onClose={() => setPractica(null)} />, document.body)}
    </LightShell>
  );
}
