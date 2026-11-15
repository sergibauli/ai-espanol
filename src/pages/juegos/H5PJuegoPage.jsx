// v21 · Juegos H5P adaptados a la unidad: #/juegos/h5p/<tarjetas|arrastrar|marcar>?m=N&clase=K
import * as React from "react";
import { Link, useParams, useLocation } from "react-router";
import { RefreshCwIcon, ArrowLeftRightIcon } from "lucide-react";
import { addXp } from "../../lib/gamification.js";
import { sfx, confetti } from "../../components/lesson/fx.js";
import { JUEGOS_H5P, prepararH5P, liberarH5P } from "../../lib/h5pUnidad.js";
import { useContenidoJuego, SelectorUnidad, Sello, Volver, etiquetaContenido } from "./jbComun.jsx";
import { contenidoJuego } from "../../lib/contenidoJuego.js";
import "../../styles/v13-juegos-b.css";
import "../../styles/v21-h5p.css";

const TIPOS = Object.keys(JUEGOS_H5P);

function Reproductor({ tipo, contenido, ronda }) {
  const caja = React.useRef(null);
  const [estado, setEstado] = React.useState("cargando");
  const [premio, setPremio] = React.useState(null);
  const [ampliado, setAmpliado] = React.useState(false);
  React.useEffect(() => {
    let vivo = true;
    let preparado = null;
    const el = caja.current;
    el.innerHTML = "";
    setEstado("cargando");
    setPremio(null);
    setAmpliado(false);
    preparado = prepararH5P(tipo, contenido);
    // Si la clase tiene poco material para este juego, se usa la unidad completa
    if (!preparado && contenido.clase) {
      const unidad = contenidoJuego(contenido.numero, null);
      preparado = unidad && prepararH5P(tipo, unidad);
      if (preparado) setAmpliado(true);
    }
    if (!preparado) {
      setEstado("vacio");
      return undefined;
    }
    let premiado = false;
    const alTerminar = (evento) => {
      const verbo = evento?.getVerb?.() || evento?.data?.statement?.verb?.display?.["en-US"];
      const res = evento?.data?.statement?.result;
      // Solo el resultado final de la actividad (no cada tarjeta o hueco)
      if (premiado || !res || !["completed", "answered"].includes(verbo) || evento?.data?.statement?.context?.contextActivities?.parent) return;
      const total = res.score?.max || 0;
      const nota = res.score?.raw || 0;
      // Ignora eventos de una sola tarjeta o hueco: solo cuenta el resultado de toda la actividad
      if (total < 3) return;
      premiado = true;
      const xp = nota === 0 ? 1 : Math.max(3, Math.round((nota / total) * 15));
      addXp(xp);
      sfx("win");
      if (nota === total) confetti({ count: 110 });
      setPremio({ nota, total, xp });
    };
    import("h5p-standalone")
      .then(({ H5P }) => new H5P(el, preparado.opciones))
      .then(() => {
        if (!vivo) return;
        setEstado("listo");
        // El reproductor vive en un iframe: su H5P es el que emite los eventos xAPI
        const iframe = el.querySelector("iframe");
        const h5p = iframe?.contentWindow?.H5P || window.H5P;
        h5p?.externalDispatcher?.on("xAPI", alTerminar);
      })
      .catch((error) => {
        console.error("H5P", error);
        if (vivo) setEstado("error");
      });
    return () => {
      vivo = false;
      liberarH5P(preparado.clave);
      el.innerHTML = "";
    };
  }, [tipo, contenido, ronda]);
  return (
    <div className="h5x-marco">
      {estado === "cargando" && (
        <p className="h5x-aviso" role="status">
          Preparando el juego… · 正在准备游戏…
        </p>
      )}
      {estado === "vacio" && (
        <p className="h5x-aviso">
          Esta unidad no tiene bastante material para este juego. Prueba otro juego · 这个单元的内容不够，请换一个游戏。
        </p>
      )}
      {ampliado && estado !== "vacio" && <p className="h5x-nota">Con el vocabulario de toda la unidad · 使用整个单元的词汇</p>}
      {estado === "error" && <p className="h5x-aviso">No se ha podido cargar el juego · 游戏加载失败</p>}
      {premio && (
        <p className="h5x-premio" role="status">
          {premio.nota}/{premio.total} · +{premio.xp} XP {premio.nota === premio.total ? "· ¡Perfecto! 满分！" : ""}
        </p>
      )}
      <div ref={caja} className="h5x-caja gm-no-adapt" />
    </div>
  );
}

export default function H5PJuegoPage() {
  const { tipo: tipoRuta } = useParams();
  const tipo = TIPOS.includes(tipoRuta) ? tipoRuta : "tarjetas";
  const juego = JUEGOS_H5P[tipo];
  const contenido = useContenidoJuego();
  const { search } = useLocation();
  const [ronda, setRonda] = React.useState(0);
  if (!contenido)
    return <SelectorUnidad titulo={juego.titulo} tituloChino={juego.tituloZh} icono={<Sello grande>{juego.sello}</Sello>} descripcion={`${juego.desc} · ${juego.descZh}`} />;
  const consulta = search || `?${window.location.hash.split("?")[1] || ""}`;
  return (
    <div className="h5x gm-no-adapt">
      <Volver />
      <header className="h5x-cab">
        <Sello grande>{juego.sello}</Sello>
        <div className="h5x-cab__textos">
          <h1>
            {juego.titulo} <span lang="zh">{juego.tituloZh}</span>
          </h1>
          <p className="h5x-cab__unidad">
            {etiquetaContenido(contenido)} · {contenido.titulo} <span lang="zh">{contenido.tituloChino}</span>
          </p>
        </div>
      </header>
      <p className="h5x-desc">
        {juego.desc}
        <small lang="zh">{juego.descZh}</small>
      </p>
      <nav className="h5x-tipos" aria-label="Otros juegos de la unidad · 本单元其他游戏">
        {TIPOS.map((t) => (
          <Link key={t} to={`/juegos/h5p/${t}${consulta}`} className={t === tipo ? "on" : ""} aria-current={t === tipo ? "page" : undefined}>
            <span translate="no">{JUEGOS_H5P[t].sello}</span>
            {JUEGOS_H5P[t].titulo}
          </Link>
        ))}
      </nav>
      <Reproductor key={`${tipo}-${contenido.numero}-${contenido.clase}`} tipo={tipo} contenido={contenido} ronda={ronda} />
      <div className="h5x-acciones">
        <button type="button" className="h5x-boton" onClick={() => setRonda((r) => r + 1)}>
          <RefreshCwIcon size={18} aria-hidden="true" /> Nueva ronda · 换一组
        </button>
        <Link to={`/juegos/h5p/${tipo}`} className="h5x-boton h5x-boton--sec">
          <ArrowLeftRightIcon size={18} aria-hidden="true" /> Cambiar unidad · 换单元
        </Link>
      </div>
      <p className="h5x-credito">
        Actividades H5P (licencia MIT) adaptadas a esta unidad · 基于开源 H5P
      </p>
    </div>
  );
}
