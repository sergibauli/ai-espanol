// Teatro de diálogos · 对话剧场 — los diálogos de la clase en un escenario imperial: ordenar, elegir réplica y doblaje
import * as React from "react";
import { ArrowUpIcon, ArrowDownIcon, CheckIcon, MicIcon, Volume2Icon, PlayIcon, RotateCcwIcon, GripVerticalIcon, RepeatIcon, ListIcon, SkipForwardIcon } from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak } from "../../components/lesson/fx.js";
import { esMujer } from "../../lib/lessons.js";
import { addXp } from "../../lib/gamification.js";
import { contenidoJuego } from "../../lib/contenidoJuego.js";
import { useContenidoJA, CabeceraJA, SelectorUnidadJA, chispasOro, barajar, reducido } from "./ja-comun.jsx";
import "../../styles/v13-juegos-a.css";

const MODOS = [
  { id: "ordenar", es: "Ordenar el guion", zh: "排列台词", desc: "Arrastra las líneas al orden correcto · 把台词拖到正确顺序" },
  { id: "replica", es: "Elegir la réplica", zh: "选择回答", desc: "Elige qué se dice después · 选出下一句台词" },
  { id: "doblaje", es: "Doblaje", zh: "配音", desc: "Interpreta un personaje en voz alta · 扮演角色大声朗读" },
];
const COLORES_H = ["#c8102e", "#3b2416", "#9a5b12", "#5b2a86"];
const COLORES_M = ["#1f6f5c", "#a0326a", "#1d5a8a", "#6b4f12"];
const Reconocimiento = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

const normalizar = (t) =>
  String(t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zñ0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
function parecido(objetivo, oido) {
  const meta = normalizar(objetivo);
  const oidas = new Set(normalizar(oido));
  if (!meta.length) return { ratio: 0, marcas: [] };
  const marcas = meta.map((p) => oidas.has(p));
  return { ratio: marcas.filter(Boolean).length / meta.length, marcas };
}
const duracion = (texto) => 900 + String(texto).length * 62;
const vozDe = (personaje) => (esMujer(personaje) ? "f" : "m");

function reparto(dialogo) {
  const nombres = dialogo.personajes?.length ? dialogo.personajes : [...new Set(dialogo.lineas.map((l) => l.personaje))];
  let h = 0;
  let m = 0;
  return nombres.map((nombre, i) => {
    const mujer = esMujer(nombre);
    return { nombre, mujer, color: mujer ? COLORES_M[m++ % 4] : COLORES_H[h++ % 4], lado: i % 2 === 0 ? "izq" : "der" };
  });
}

function Medallon({ actor, activo, grande, onClick, etiqueta }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag type={onClick ? "button" : undefined} className={`ja-medallon${activo ? " is-activo" : ""}${grande ? " is-grande" : ""}`} onClick={onClick} style={{ "--ja-actor": actor.color }} aria-label={etiqueta}>
      <span className="ja-medallon-disco" aria-hidden="true">
        <span className="ja-medallon-inicial">{actor.nombre.trim()[0]?.toUpperCase()}</span>
        <span className="ja-medallon-genero" translate="no">{actor.mujer ? "女" : "男"}</span>
      </span>
      <span className="ja-medallon-nombre">{actor.nombre}</span>
    </Tag>
  );
}

function Bocadillo({ linea, actor, estado, nuevo, onOir, mostrarZh = true, children }) {
  return (
    <div className={`ja-bocadillo ja-lado-${actor?.lado || "izq"}${estado ? ` is-${estado}` : ""}${nuevo ? " is-nuevo" : ""}`} style={{ "--ja-actor": actor?.color || "#3b2416" }}>
      <span className="ja-bocadillo-avatar" aria-hidden="true">
        {actor?.nombre?.[0]?.toUpperCase()}
      </span>
      <div className="ja-bocadillo-globo">
        <span className="ja-bocadillo-quien">{linea.personaje}</span>
        <p className="ja-bocadillo-es">{linea.texto}</p>
        {mostrarZh && linea.traduccion && (
          <p className="ja-bocadillo-zh" lang="zh">
            {linea.traduccion}
          </p>
        )}
        {children}
      </div>
      {onOir && (
        <button type="button" className="ja-oir" onClick={onOir} aria-label="Escuchar · 听" title="Escuchar · 听">
          <Volume2Icon size={18} />
        </button>
      )}
    </div>
  );
}

export default function TeatroDialogosPage() {
  const { contenido, elegir, quitar } = useContenidoJA();
  if (!contenido)
    return (
      <div className="ja-raiz ja-teatro gm-no-adapt">
        <CabeceraJA titulo="Teatro de diálogos" tituloZh="对话剧场" sello="剧" />
        <SelectorUnidadJA
          titulo="Teatro de diálogos"
          tituloZh="对话剧场"
          sello="剧"
          descripcion="Sube al escenario con los diálogos de tu clase: ordena el guion, elige la réplica correcta o dobla a un personaje con tu voz. · 用课堂对话登上舞台：排列台词、选择回答，或用你的声音为角色配音。"
          onElegir={elegir}
        />
      </div>
    );
  return <Teatro key={`${contenido.numero}-${contenido.clase}`} contenido={contenido} onCambiar={quitar} />;
}

function Teatro({ contenido, onCambiar }) {
  const sonido = useSound();
  // Diálogos de la clase; si la clase no tiene, los de toda la unidad
  const unidad = React.useMemo(() => contenidoJuego(contenido.numero, null), [contenido.numero]);
  const deClase = contenido.dialogos.filter((d) => d?.lineas?.length >= 2);
  const dialogos = deClase.length ? deClase : (unidad?.dialogos || []).filter((d) => d?.lineas?.length >= 2);
  const todasLasLineas = React.useMemo(() => (unidad?.dialogos || []).flatMap((d, i) => (d.lineas || []).map((l) => ({ ...l, dialogo: i }))), [unidad]);

  const [indiceDialogo, setIndiceDialogo] = React.useState(0);
  const [modo, setModo] = React.useState("ordenar");
  const [fase, setFase] = React.useState("menu"); // menu | juego | final
  const [partida, setPartida] = React.useState(0);
  const [final, setFinal] = React.useState(null);
  const [hablando, setHablando] = React.useState(null);
  const temporizadores = React.useRef([]);
  const dialogo = dialogos[indiceDialogo];
  const actores = React.useMemo(() => (dialogo ? reparto(dialogo) : []), [dialogo]);
  const actorDe = React.useCallback((nombre) => actores.find((a) => a.nombre === nombre) || actores[0], [actores]);

  const esperar = (ms) =>
    new Promise((ok) => {
      temporizadores.current.push(setTimeout(ok, ms));
    });
  const limpiar = () => {
    temporizadores.current.forEach(clearTimeout);
    temporizadores.current = [];
    try {
      speechSynthesis?.cancel?.();
    } catch {}
    setHablando(null);
  };
  React.useEffect(() => limpiar, []);

  const decir = React.useCallback((linea) => {
    setHablando(linea.personaje);
    speak(linea.texto, 0.9, vozDe(linea.personaje));
    const t = setTimeout(() => setHablando((h) => (h === linea.personaje ? null : h)), duracion(linea.texto));
    temporizadores.current.push(t);
  }, []);

  const empezar = () => {
    limpiar();
    sonido.playClick?.();
    setFinal(null);
    setPartida((p) => p + 1);
    setFase("juego");
  };

  const terminar = React.useCallback(
    (puntos, total) => {
      const pct = total ? puntos / total : 0;
      const estrellas = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct > 0 ? 1 : 0;
      const xp = 4 + estrellas * 4;
      addXp(xp);
      setFinal({ puntos: Math.round(puntos * 10) / 10, total, estrellas, xp });
      temporizadores.current.push(
        setTimeout(() => {
          setFase("final");
          if (estrellas >= 2) sonido.playWin?.();
          else sonido.playCorrect?.();
          if (estrellas >= 1) [0.3, 0.5, 0.7].forEach((x, i) => temporizadores.current.push(setTimeout(() => chispasOro(innerWidth * x, innerHeight * 0.35, 30), 500 + i * 200)));
        }, 900),
      );
    },
    [sonido],
  );

  if (!dialogo)
    return (
      <div className="ja-raiz ja-teatro gm-no-adapt">
        <CabeceraJA titulo="Teatro de diálogos" tituloZh="对话剧场" sello="剧" contenido={contenido} onCambiar={onCambiar} />
        <div className="ja-vacio">
          <img src="./mono/serio.png" alt="" aria-hidden="true" />
          <p>Esta unidad no tiene diálogos. · 这个单元没有对话。</p>
          <button type="button" className="ja-boton ja-boton-oro" onClick={onCambiar}>
            Elegir otra unidad · 选择其他单元
          </button>
        </div>
      </div>
    );

  const telonCerrado = fase !== "juego";

  return (
    <div className="ja-raiz ja-teatro gm-no-adapt">
      <CabeceraJA titulo="Teatro de diálogos" tituloZh="对话剧场" sello="剧" contenido={contenido} onCambiar={onCambiar} />

      <section className={`ja-escenario${telonCerrado ? " telon-cerrado" : " telon-abierto"}`} aria-label="Escenario · 舞台">
        <div className="ja-fondo-escena" aria-hidden="true">
          <span className="ja-foco" style={{ "--ja-foco-x": hablando ? (actorDe(hablando)?.lado === "der" ? "70%" : "30%") : "50%" }} />
          <span className="ja-farol ja-farol-izq" />
          <span className="ja-farol ja-farol-der" />
          <span className="ja-tablas" />
        </div>
        <div className="ja-cenefa" aria-hidden="true">
          <span className="ja-cartel">
            <b>{dialogo.titulo}</b>
            {dialogo.tituloChino && <small lang="zh">{dialogo.tituloChino}</small>}
          </span>
        </div>

        <div className="ja-reparto" aria-label="Reparto · 角色">
          {actores.map((a) => (
            <Medallon key={a.nombre} actor={a} activo={hablando === a.nombre} />
          ))}
        </div>

        <div className="ja-escena-contenido">
          {fase === "juego" && modo === "ordenar" && <ModoOrdenar key={partida} dialogo={dialogo} actorDe={actorDe} decir={decir} sonido={sonido} esperar={esperar} terminar={terminar} />}
          {fase === "juego" && modo === "replica" && <ModoReplica key={partida} dialogo={dialogo} todas={todasLasLineas} actorDe={actorDe} decir={decir} sonido={sonido} esperar={esperar} terminar={terminar} />}
          {fase === "juego" && modo === "doblaje" && <ModoDoblaje key={partida} dialogo={dialogo} actores={actores} actorDe={actorDe} decir={decir} sonido={sonido} esperar={esperar} terminar={terminar} />}
        </div>

        <div className="ja-telon ja-telon-izq" aria-hidden="true" />
        <div className="ja-telon ja-telon-der" aria-hidden="true" />

        {fase === "menu" && (
          <div className="ja-cartelera" role="dialog" aria-label="Programa · 节目单">
            <p className="ja-cartelera-kicker">Programa de hoy · 今日节目</p>
            <h2>Elige el diálogo · 选择对话</h2>
            <div className="ja-obras">
              {dialogos.map((d, i) => (
                <button key={i} type="button" className={`ja-obra${i === indiceDialogo ? " is-on" : ""}`} onClick={() => setIndiceDialogo(i)} aria-pressed={i === indiceDialogo}>
                  <span className="ja-obra-n">{i + 1}</span>
                  <span>
                    <b>{d.titulo}</b>
                    <small lang="zh">{d.tituloChino}</small>
                    <em>
                      {(d.personajes || []).join(" · ")} · {d.lineas.length} líneas · {d.lineas.length} 句
                    </em>
                  </span>
                </button>
              ))}
            </div>
            <h2>Elige el modo · 选择模式</h2>
            <div className="ja-modos-teatro">
              {MODOS.map((m) => (
                <button key={m.id} type="button" className={`ja-modo-teatro${modo === m.id ? " is-on" : ""}`} onClick={() => setModo(m.id)} aria-pressed={modo === m.id}>
                  {m.id === "ordenar" ? <ListIcon size={22} /> : m.id === "replica" ? <RepeatIcon size={22} /> : <MicIcon size={22} />}
                  <b>{m.es}</b>
                  <small lang="zh">{m.zh}</small>
                  <em>{m.desc}</em>
                </button>
              ))}
            </div>
            <button type="button" className="ja-boton ja-boton-laca ja-abrir" onClick={empezar}>
              <PlayIcon size={20} /> ¡Arriba el telón! · 开幕
            </button>
          </div>
        )}

        {fase === "final" && final && (
          <div className="ja-cartelera ja-final" role="dialog" aria-label="Resultado · 结果">
            <img src={final.estrellas >= 2 ? "./mono/trofeo.png" : final.estrellas ? "./mono/feliz.png" : "./mono/serio.png"} alt="" aria-hidden="true" className="ja-final-mono" />
            <h2>{final.estrellas >= 3 ? "¡Ovación! · 满堂喝彩！" : final.estrellas >= 2 ? "¡Bravo! · 太棒了！" : "¡Buen ensayo! · 不错的排练！"}</h2>
            <div className="ja-estrellas ja-estrellas-grandes" aria-label={`${final.estrellas} estrellas · 星`}>
              {[0, 1, 2].map((i) => (
                <span key={i} className={i < final.estrellas ? "is-on" : ""} style={{ animationDelay: `${0.3 + i * 0.2}s` }}>
                  ★
                </span>
              ))}
            </div>
            <p className="ja-final-puntos">
              {final.puntos} / {final.total} puntos · 分 <span className="ja-final-xp">+{final.xp} XP</span>
            </p>
            <div className="ja-final-botones">
              <button type="button" className="ja-boton ja-boton-laca" onClick={empezar}>
                <RotateCcwIcon size={18} /> Otra vez · 再来一次
              </button>
              <button type="button" className="ja-boton ja-boton-oro" onClick={() => setFase("menu")}>
                <ListIcon size={18} /> Programa · 节目单
              </button>
            </div>
          </div>
        )}
      </section>

      {fase === "juego" && (
        <div className="ja-bajo-escena">
          <button type="button" className="ja-boton ja-boton-tinta" onClick={() => { limpiar(); setFase("menu"); }}>
            <ListIcon size={18} /> Programa · 节目单
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- (a) Ordenar el guion ----------
function ModoOrdenar({ dialogo, actorDe, decir, sonido, esperar, terminar }) {
  const lineas = dialogo.lineas;
  const [orden, setOrden] = React.useState(() => {
    const indices = lineas.map((_, i) => i);
    let mezcla = barajar(indices);
    for (let k = 0; k < 5 && mezcla.every((v, i) => lineas[v].texto === lineas[i].texto); k++) mezcla = barajar(indices);
    return mezcla;
  });
  const [estados, setEstados] = React.useState(null);
  const [intento, setIntento] = React.useState(0);
  const [primeros, setPrimeros] = React.useState(null);
  const [arrastre, setArrastre] = React.useState(null); // {pos, dy}
  const [actuando, setActuando] = React.useState(-1);
  const listaRef = React.useRef(null);
  const resuelto = estados && estados.every((e) => e === "ok");

  const mover = (desde, hasta) => {
    if (hasta < 0 || hasta >= orden.length) return;
    setOrden((o) => {
      const n = [...o];
      const [x] = n.splice(desde, 1);
      n.splice(hasta, 0, x);
      return n;
    });
    setEstados(null);
    sonido.playClick?.();
  };

  // Arrastre: con ratón desde toda la tarjeta; en táctil, desde el asa numerada (para no bloquear el scroll)
  const movido = React.useRef(false);
  const pulsar = (e, pos) => {
    if (resuelto || e.button > 0 || e.target.closest("button")) return;
    if (e.pointerType === "touch" && !e.target.closest(".ja-guion-num")) return;
    const tarjetas = [...listaRef.current.querySelectorAll(".ja-guion-linea")];
    const alturas = tarjetas.map((t) => t.getBoundingClientRect().height + 8);
    const estado = { pos, inicio: e.clientY, origen: e.clientY, alturas };
    movido.current = false;
    if (e.pointerType === "touch") e.preventDefault();
    const alMover = (ev) => {
      if (!movido.current && Math.abs(ev.clientY - estado.origen) < 5) return;
      movido.current = true;
      let dy = ev.clientY - estado.inicio;
      // Cruza la mitad de la vecina: intercambio
      if (dy > estado.alturas[estado.pos + 1] / 2 && estado.pos < orden.length - 1) {
        estado.inicio += estado.alturas[estado.pos + 1];
        mover(estado.pos, estado.pos + 1);
        [estado.alturas[estado.pos], estado.alturas[estado.pos + 1]] = [estado.alturas[estado.pos + 1], estado.alturas[estado.pos]];
        estado.pos += 1;
        dy = ev.clientY - estado.inicio;
      } else if (dy < -estado.alturas[estado.pos - 1] / 2 && estado.pos > 0) {
        estado.inicio -= estado.alturas[estado.pos - 1];
        mover(estado.pos, estado.pos - 1);
        [estado.alturas[estado.pos], estado.alturas[estado.pos - 1]] = [estado.alturas[estado.pos - 1], estado.alturas[estado.pos]];
        estado.pos -= 1;
        dy = ev.clientY - estado.inicio;
      }
      setArrastre({ pos: estado.pos, dy });
    };
    const soltar = () => {
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
      setArrastre(null);
      setTimeout(() => (movido.current = false), 0);
    };
    window.addEventListener("pointermove", alMover);
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);
  };

  const comprobar = () => {
    const nuevos = orden.map((v, i) => (lineas[v].texto === lineas[i].texto ? "ok" : "bad"));
    setEstados(nuevos);
    setIntento((n) => n + 1);
    const bien = nuevos.filter((e) => e === "ok").length;
    if (primeros === null) setPrimeros(bien);
    if (bien === lineas.length) {
      sonido.playCorrect?.();
      const r = listaRef.current?.getBoundingClientRect();
      if (r) chispasOro(r.left + r.width / 2, r.top + r.height / 2, 40);
    } else sonido.playWrong?.();
  };

  const representar = async () => {
    for (let i = 0; i < lineas.length; i++) {
      setActuando(i);
      decir(lineas[i]);
      listaRef.current?.children[i]?.scrollIntoView?.({ block: "nearest", behavior: reducido() ? "auto" : "smooth" });
      await esperar(duracion(lineas[i].texto) + 250);
    }
    setActuando(-1);
    terminar(primeros ?? 0, lineas.length);
  };

  return (
    <div className="ja-modo-ordenar">
      <p className="ja-consigna">
        {resuelto ? "¡Guion perfecto! Ahora mira la escena. · 台词顺序正确！现在观看表演。" : "Arrastra las líneas (o usa las flechas) para ordenar el diálogo. Toca una línea para oírla. · 拖动台词（或用箭头）排列对话。点击台词可以收听。"}
      </p>
      <ol className="ja-guion" ref={listaRef}>
        {orden.map((v, pos) => {
          const linea = lineas[v];
          const actor = actorDe(linea.personaje);
          const estado = estados?.[pos];
          const arrastrada = arrastre?.pos === pos;
          return (
            <li
              key={v}
              className={`ja-guion-linea${arrastrada ? " is-arrastrada" : ""}${actuando === pos ? " is-actuando" : ""}${estado === "bad" ? " ja-sacude-html" : ""}`}
              style={arrastrada ? { transform: `translateY(${arrastre.dy}px) scale(1.02)` } : undefined}
              onPointerDown={(e) => pulsar(e, pos)}
              onClick={(e) => {
                if (!movido.current && !e.target.closest("button")) decir(linea);
              }}
            >
              <span className="ja-guion-num" title="Arrastra · 拖动" aria-hidden="true">
                <GripVerticalIcon size={14} />
                {pos + 1}
              </span>
              <Bocadillo linea={linea} actor={actor} estado={estado} mostrarZh={!!resuelto} />
              {!resuelto && (
                <span className="ja-guion-flechas">
                  <button type="button" onClick={() => mover(pos, pos - 1)} disabled={pos === 0} aria-label="Subir · 上移">
                    <ArrowUpIcon size={18} />
                  </button>
                  <button type="button" onClick={() => mover(pos, pos + 1)} disabled={pos === orden.length - 1} aria-label="Bajar · 下移">
                    <ArrowDownIcon size={18} />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className="ja-acciones">
        {!resuelto ? (
          <button type="button" className="ja-boton ja-boton-laca" onClick={comprobar}>
            <CheckIcon size={20} /> Comprobar · 检查 {intento > 0 && `(${estados?.filter((e) => e === "ok").length || 0}/${lineas.length})`}
          </button>
        ) : (
          <button type="button" className="ja-boton ja-boton-oro" onClick={representar} disabled={actuando >= 0}>
            <PlayIcon size={20} /> {actuando >= 0 ? "En escena… · 表演中…" : "Representar · 表演"}
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- (b) Elegir la réplica ----------
function ModoReplica({ dialogo, todas, actorDe, decir, sonido, esperar, terminar }) {
  const lineas = dialogo.lineas;
  const [turno, setTurno] = React.useState(0); // última línea mostrada
  const [opciones, setOpciones] = React.useState([]);
  const [falladas, setFalladas] = React.useState([]);
  const [puntos, setPuntos] = React.useState(0);
  const [bloqueado, setBloqueado] = React.useState(true);
  const finRef = React.useRef(null);

  const generar = React.useCallback(
    (i) => {
      const correcta = lineas[i].texto;
      const usadas = new Set([correcta, ...lineas.slice(0, i).map((l) => l.texto)]);
      const otras = barajar(todas.filter((l) => !usadas.has(l.texto) && !lineas.some((x) => x.texto === l.texto)));
      const mismas = barajar(lineas.filter((l, k) => k > i && !usadas.has(l.texto)));
      const distractores = [];
      if (mismas[0]) distractores.push(mismas[0].texto);
      for (const l of otras) if (distractores.length < 2 && !distractores.includes(l.texto)) distractores.push(l.texto);
      for (const l of mismas.slice(1)) if (distractores.length < 2) distractores.push(l.texto);
      return barajar([correcta, ...distractores.slice(0, 2)]);
    },
    [lineas, todas],
  );

  React.useEffect(() => {
    let vivo = true;
    (async () => {
      await esperar(700);
      if (!vivo) return;
      decir(lineas[0]);
      await esperar(duracion(lineas[0].texto) * 0.6);
      if (!vivo) return;
      setOpciones(generar(1));
      setBloqueado(false);
    })();
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    finRef.current?.scrollIntoView?.({ block: "nearest", behavior: reducido() ? "auto" : "smooth" });
  }, [turno, opciones]);

  const elegir = async (texto, e) => {
    if (bloqueado || falladas.includes(texto)) return;
    const siguiente = turno + 1;
    if (texto === lineas[siguiente].texto) {
      setBloqueado(true);
      const ganados = falladas.length === 0 ? 1 : 0;
      setPuntos((p) => p + ganados);
      sonido.playCorrect?.();
      const r = e?.currentTarget?.getBoundingClientRect?.();
      if (r) chispasOro(r.left + r.width / 2, r.top + r.height / 2, 24);
      setOpciones([]);
      setFalladas([]);
      setTurno(siguiente);
      decir(lineas[siguiente]);
      await esperar(Math.min(2600, duracion(lineas[siguiente].texto) * 0.7));
      if (siguiente >= lineas.length - 1) terminar(puntos + ganados, lineas.length - 1);
      else {
        setOpciones(generar(siguiente + 1));
        setBloqueado(false);
      }
    } else {
      setFalladas((f) => [...f, texto]);
      sonido.playWrong?.();
    }
  };

  const proximo = lineas[turno + 1];
  return (
    <div className="ja-modo-replica">
      <div className="ja-conversacion" aria-live="polite">
        {lineas.slice(0, turno + 1).map((l, i) => (
          <Bocadillo key={i} linea={l} actor={actorDe(l.personaje)} nuevo={i === turno} onOir={() => decir(l)} />
        ))}
        <div ref={finRef} />
      </div>
      {proximo && opciones.length > 0 && (
        <div className="ja-opciones">
          <p className="ja-consigna">
            ¿Qué dice <b style={{ color: actorDe(proximo.personaje)?.color }}>{proximo.personaje}</b>? · {proximo.personaje} 说什么？
          </p>
          {opciones.map((t) => {
            const mal = falladas.includes(t);
            return (
              <div key={t} className={`ja-opcion${mal ? " is-bad ja-sacude-html" : ""}`}>
                <button type="button" className="ja-opcion-texto" onClick={(e) => elegir(t, e)} disabled={mal || bloqueado}>
                  {t}
                </button>
                <button type="button" className="ja-oir" onClick={() => speak(t, 0.9, vozDe(proximo.personaje))} aria-label="Escuchar · 听" title="Escuchar · 听">
                  <Volume2Icon size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <p className="ja-marcador">
        Réplica {Math.min(turno + 1, lineas.length - 1)}/{lineas.length - 1} · 第 {Math.min(turno + 1, lineas.length - 1)} 句 · <b>{puntos}</b> ✓
      </p>
    </div>
  );
}

// ---------- (c) Doblaje ----------
function ModoDoblaje({ dialogo, actores, actorDe, decir, sonido, esperar, terminar }) {
  const lineas = dialogo.lineas;
  const [papel, setPapel] = React.useState(null);
  const [turno, setTurno] = React.useState(-1);
  const [esperando, setEsperando] = React.useState(false);
  const [escuchando, setEscuchando] = React.useState(false);
  const [oido, setOido] = React.useState(null); // {texto, ratio, marcas}
  const [fallos, setFallos] = React.useState(0);
  const puntos = React.useRef({ hechos: 0, total: 0 });
  const recRef = React.useRef(null);
  const finRef = React.useRef(null);
  const vivo = React.useRef(true);
  React.useEffect(() => () => {
    vivo.current = false;
    try {
      recRef.current?.abort?.();
    } catch {}
  }, []);
  React.useEffect(() => {
    finRef.current?.scrollIntoView?.({ block: "nearest", behavior: reducido() ? "auto" : "smooth" });
  }, [turno, esperando, oido]);

  const avanzar = React.useCallback(
    async (desde) => {
      for (let i = desde; i < lineas.length; i++) {
        if (!vivo.current) return;
        setTurno(i);
        setOido(null);
        setFallos(0);
        if (lineas[i].personaje === papel) {
          puntos.current.total += 1;
          setEsperando(true);
          return;
        }
        await esperar(350);
        decir(lineas[i]);
        await esperar(duracion(lineas[i].texto));
      }
      if (vivo.current) terminar(puntos.current.hechos, Math.max(1, puntos.current.total));
    },
    [lineas, papel, decir, esperar, terminar],
  );

  React.useEffect(() => {
    if (papel) avanzar(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [papel]);

  const cumplido = (credito, x, y) => {
    puntos.current.hechos += credito;
    setEsperando(false);
    if (credito >= 0.6) {
      sonido.playCorrect?.();
      if (x) chispasOro(x, y, 26);
    }
    esperar(600).then(() => avanzar(turno + 1));
  };

  const hablar = (e) => {
    if (!Reconocimiento || escuchando) return;
    const r = e.currentTarget.getBoundingClientRect();
    const rec = new Reconocimiento();
    recRef.current = rec;
    rec.lang = "es-ES";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    let recibido = false;
    rec.onresult = (ev) => {
      recibido = true;
      const alternativas = [...ev.results[0]].map((a) => a.transcript);
      const mejor = alternativas.map((t) => ({ texto: t, ...parecido(lineas[turno].texto, t) })).sort((a, b) => b.ratio - a.ratio)[0];
      setOido(mejor);
      if (mejor.ratio >= 0.6) cumplido(Math.min(1, mejor.ratio + 0.15), r.left + r.width / 2, r.top);
      else {
        setFallos((f) => f + 1);
        sonido.playWrong?.();
      }
    };
    // Sin permiso de micrófono o sin servicio: se ofrece «Ya lo he dicho»
    rec.onerror = (ev) => {
      setEscuchando(false);
      if (/not-allowed|service-not-allowed|audio-capture|network/.test(ev?.error || "")) setFallos(2);
    };
    const tope = setTimeout(() => {
      try {
        rec.abort();
      } catch {}
      setEscuchando(false);
      if (!recibido) setOido((o) => o || { texto: "", ratio: 0, marcas: [], nada: true });
    }, 9000);
    rec.onend = () => {
      clearTimeout(tope);
      setEscuchando(false);
      if (!recibido) setOido((o) => o || { texto: "", ratio: 0, marcas: [], nada: true });
    };
    try {
      rec.start();
      setEscuchando(true);
      setOido(null);
    } catch {
      setEscuchando(false);
    }
  };

  if (!papel)
    return (
      <div className="ja-modo-doblaje">
        <p className="ja-consigna">Elige tu papel · 选择你的角色</p>
        <div className="ja-papeles">
          {actores.map((a) => (
            <Medallon
              key={a.nombre}
              actor={a}
              grande
              etiqueta={`${a.nombre}: ${lineas.filter((l) => l.personaje === a.nombre).length} líneas`}
              onClick={() => {
                sonido.playClick?.();
                setPapel(a.nombre);
              }}
            />
          ))}
        </div>
        <p className="ja-nota">{Reconocimiento ? "Usaremos el micrófono para escucharte. · 我们会用麦克风听你说。" : "Tu navegador no reconoce la voz: lee en voz alta y pulsa «Ya lo he dicho». · 你的浏览器不支持语音识别：大声朗读后点击「我说完了」。"}</p>
      </div>
    );

  const linea = lineas[turno];
  const mio = linea && linea.personaje === papel && esperando;
  return (
    <div className="ja-modo-doblaje">
      <div className="ja-conversacion" aria-live="polite">
        {lineas.slice(0, Math.max(0, turno + (mio ? 0 : 1))).map((l, i) => (
          <Bocadillo key={i} linea={l} actor={actorDe(l.personaje)} nuevo={i === turno} onOir={() => decir(l)} />
        ))}
        {mio && (
          <div className="ja-atril" style={{ "--ja-actor": actorDe(papel)?.color }}>
            <p className="ja-atril-kicker">Tu turno, {papel} · 轮到你了</p>
            <p className="ja-atril-es">
              {oido && !oido.nada
                ? normalizar(linea.texto).length === linea.texto.split(/\s+/).length
                  ? linea.texto.split(/\s+/).map((p, k) => (
                      <span key={k} className={oido.marcas[k] ? "is-ok" : "is-falta"}>
                        {p}{" "}
                      </span>
                    ))
                  : linea.texto
                : linea.texto}
            </p>
            <p className="ja-atril-zh" lang="zh">
              {linea.traduccion}
            </p>
            {oido && (
              <p className="ja-oido">
                {oido.nada ? "No te he oído. ¡Inténtalo otra vez! · 没听到，再试一次！" : `He oído · 听到：«${oido.texto}» · ${Math.round(oido.ratio * 100)}%`}
              </p>
            )}
            <div className="ja-atril-botones">
              {Reconocimiento && (
                <button type="button" className={`ja-boton ja-boton-laca ja-mic${escuchando ? " is-escuchando" : ""}`} onClick={hablar} disabled={escuchando}>
                  <MicIcon size={20} /> {escuchando ? "Te escucho… · 正在听…" : "Hablar · 说话"}
                </button>
              )}
              <button type="button" className="ja-boton ja-boton-tinta" onClick={() => speak(linea.texto, 0.85, vozDe(linea.personaje))}>
                <Volume2Icon size={18} /> Modelo · 示范
              </button>
              {(!Reconocimiento || fallos >= 2 || oido?.nada) && (
                <button
                  type="button"
                  className="ja-boton ja-boton-oro"
                  onClick={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    cumplido(Reconocimiento ? 0.5 : 1, r.left + r.width / 2, r.top);
                  }}
                >
                  {Reconocimiento ? <SkipForwardIcon size={18} /> : <CheckIcon size={18} />} Ya lo he dicho · 我说完了
                </button>
              )}
            </div>
          </div>
        )}
        <div ref={finRef} />
      </div>
    </div>
  );
}
