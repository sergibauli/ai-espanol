import * as React from "react";
import { PlayIcon, CheckIcon, Volume2Icon, SkipForwardIcon, ClapperboardIcon } from "lucide-react";
import { SERIES } from "../data/tv.js";
import { speak } from "../components/lesson/fx.js";
import "../styles/tv.css";

// TV · 电视: series cortas en español con subtítulos en chino. Los episodios vistos se guardan en dele_tv_vistos.
const CLAVE = "dele_tv_vistos";
function leerVistos() {
  try {
    return new Set(JSON.parse(localStorage.getItem(CLAVE) || "[]"));
  } catch {
    return new Set();
  }
}
function guardarVistos(vistos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...vistos]));
  } catch {}
}

export default function TvPage() {
  const serie = SERIES[0];
  const [vistos, setVistos] = React.useState(leerVistos);
  const [actual, setActual] = React.useState(() => {
    const vistosAhora = leerVistos();
    return serie.episodios.find((episodio) => !vistosAhora.has(`${serie.id}-${episodio.n}`)) || serie.episodios[0];
  });
  const [terminado, setTerminado] = React.useState(false);
  const refVideo = React.useRef(null);
  const refPantalla = React.useRef(null);
  const siguiente = serie.episodios.find((episodio) => episodio.n === actual.n + 1);

  const elegir = (episodio, reproducir = true) => {
    setActual(episodio);
    setTerminado(false);
    refPantalla.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (reproducir) requestAnimationFrame(() => refVideo.current?.play?.().catch(() => {}));
  };
  const alTerminar = () => {
    const nuevos = new Set(vistos);
    nuevos.add(`${serie.id}-${actual.n}`);
    setVistos(nuevos);
    guardarVistos(nuevos);
    setTerminado(true);
  };

  return (
    <div className="tv">
      <header className="tv-cabecera">
        <span className="tv-sello" aria-hidden="true" translate="no">剧</span>
        <div>
          <p className="tv-ceja">
            TV · <span lang="zh-Hans">电视</span> · Serie original
          </p>
          <h1 className="tv-titulo">
            {serie.titulo}
            <span lang="zh-Hans">{serie.tituloZh}</span>
          </h1>
          <p className="tv-sinopsis">
            {serie.sinopsis}
            <span lang="zh-Hans">{serie.sinopsisZh}</span>
          </p>
          <p className="tv-aviso-ia">
            Serie creada con inteligencia artificial · <span lang="zh-Hans">本剧由人工智能生成</span>
          </p>
        </div>
      </header>

      <section ref={refPantalla} className="tv-escenario" aria-label={`Episodio ${actual.n} · 第${actual.n}集`}>
        <div className="tv-marco">
          <span className="tv-farol izq" aria-hidden="true" />
          <span className="tv-farol der" aria-hidden="true" />
          <div className="tv-pantalla">
            <video
              key={actual.video}
              ref={refVideo}
              src={actual.video}
              poster={actual.poster}
              controls
              playsInline
              preload="metadata"
              onEnded={alTerminar}
              onPlay={() => setTerminado(false)}
            />
            <span className="tv-ia" translate="no">Creado con IA · AI生成</span>
            {terminado && (
              <div className="tv-fin">
                <p>
                  ¡Episodio {actual.n} visto! <span lang="zh-Hans">第{actual.n}集看完了！</span>
                </p>
                {siguiente ? (
                  <button type="button" className="tv-btn" onClick={() => elegir(siguiente)}>
                    <SkipForwardIcon size={18} strokeWidth={2.6} aria-hidden="true" />
                    Siguiente: {siguiente.titulo} · <span lang="zh-Hans">{siguiente.tituloZh}</span>
                  </button>
                ) : (
                  <p className="tv-pronto">
                    Continuará… <span lang="zh-Hans">未完待续……</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="tv-ficha">
          <p className="tv-ficha-n">
            Episodio {actual.n} · <span lang="zh-Hans">第{actual.n}集</span> · {actual.duracion}
          </p>
          <h2>
            {actual.titulo} <span lang="zh-Hans">{actual.tituloZh}</span>
          </h2>
          <p className="tv-resumen">
            {actual.resumen}
            <span lang="zh-Hans">{actual.resumenZh}</span>
          </p>
          <h3>
            Frases del episodio · <span lang="zh-Hans">本集句子</span>
          </h3>
          <ul className="tv-frases">
            {actual.frases.map((frase) => (
              <li key={frase.es}>
                <button type="button" onClick={() => speak(frase.es)} aria-label={`Escuchar · 听: ${frase.es}`}>
                  <Volume2Icon size={16} strokeWidth={2.4} />
                </button>
                <span>
                  {frase.es}
                  <small lang="zh-Hans">{frase.zh}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tv-lista" aria-labelledby="tv-lista-titulo">
        <h2 id="tv-lista-titulo">
          <ClapperboardIcon size={20} strokeWidth={2.4} aria-hidden="true" /> Episodios · <span lang="zh-Hans">剧集</span>
        </h2>
        <ol>
          {serie.episodios.map((episodio, indice) => {
            const visto = vistos.has(`${serie.id}-${episodio.n}`);
            const activo = episodio.n === actual.n;
            return (
              <li key={episodio.n} style={{ "--i": indice }}>
                <button type="button" className={`tv-episodio ${activo ? "activo" : ""}`} onClick={() => elegir(episodio)} aria-current={activo}>
                  <span className="tv-miniatura">
                    <img src={episodio.poster} alt="" loading="lazy" decoding="async" />
                    <span className="tv-play" aria-hidden="true">
                      <PlayIcon size={22} strokeWidth={2.6} fill="currentColor" />
                    </span>
                    <span className="tv-duracion">{episodio.duracion}</span>
                    {visto && (
                      <span className="tv-visto" title="Visto · 已看">
                        <CheckIcon size={14} strokeWidth={3} /> Visto · <span lang="zh-Hans">已看</span>
                      </span>
                    )}
                  </span>
                  <span className="tv-episodio-texto">
                    <b>
                      {episodio.n}. {episodio.titulo}
                    </b>
                    <small lang="zh-Hans">
                      第{episodio.n}集 · {episodio.tituloZh}
                    </small>
                  </span>
                </button>
              </li>
            );
          })}
          {serie.proximamente && (
            <li style={{ "--i": serie.episodios.length }}>
              <div className="tv-episodio tv-proximo" aria-disabled="true">
                <span className="tv-miniatura">
                  <span className="tv-candado" aria-hidden="true" translate="no">待</span>
                </span>
                <span className="tv-episodio-texto">
                  <b>{serie.proximamente.es}</b>
                  <small lang="zh-Hans">{serie.proximamente.zh}</small>
                </span>
              </div>
            </li>
          )}
        </ol>
      </section>
    </div>
  );
}
