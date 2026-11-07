// Escape del palacio · 逃出紫禁城 — sala de escape en 5 puertas con el contenido de la clase.
import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { KeyRoundIcon, LightbulbIcon, TimerIcon, LockIcon, CheckIcon, PlayIcon, RotateCcwIcon, LayersIcon, Volume2Icon, VolumeXIcon, MapIcon, StarIcon, Undo2Icon, TrophyIcon } from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { todasLasPalabras } from "../../lib/contenidoJuego.js";
import {
  barajar,
  limpiar,
  sinAcentos,
  tieneChino,
  respuestaSeleccionar,
  useContenidoJuego,
  claveRecord,
  leerNumero,
  guardarNumero,
  usePrefiereMenosMovimiento,
  SelectorUnidad,
  Sello,
  Volver,
  etiquetaContenido,
  frasesDeClase,
  palabrasDe,
} from "./jbComun.jsx";
import "../../styles/v13-juegos-b.css";

const PISTAS = 3;
const COSTE_PISTA = 30;
const COSTE_ERROR = 5;

const PUERTAS = [
  { id: "candado", es: "Puerta del Candado", zh: "字母锁之门", sello: "锁", tarea: "Ordena las letras de la palabra", tareaZh: "排列字母，拼出单词" },
  { id: "pergamino", es: "Puerta del Pergamino roto", zh: "残卷之门", sello: "卷", tarea: "Completa los huecos del pergamino", tareaZh: "补全残卷上的空缺" },
  { id: "balanza", es: "Puerta de la Balanza", zh: "天平之门", sello: "衡", tarea: "Pon la pesa correcta para equilibrar", tareaZh: "放上正确的砝码，让天平平衡" },
  { id: "cifrado", es: "Puerta del Mensaje cifrado", zh: "密信之门", sello: "密", tarea: "Ordena las palabras del mensaje", tareaZh: "把密信的词语排好顺序" },
  { id: "emperador", es: "Puerta del Emperador", zh: "皇帝之门", sello: "皇", tarea: "Responde a las tres preguntas del emperador", tareaZh: "回答皇帝的三个问题" },
];

// ---------- Construcción de los puzles (siempre hay alternativa con vocabulario) ----------
const LETRAS = /^[a-záéíóúüñ]+$/i;
const quitarPuntuacion = (p) => p.replace(/[¿?¡!.,;:«»"()—–]/g, "");

function construirPuzles(c) {
  let vocab = (c.vocabulario || []).filter((v) => limpiar(v.espanol) && limpiar(v.chino));
  if (vocab.length < 6) vocab = [...vocab, ...barajar(todasLasPalabras()).slice(0, 20 - vocab.length)];
  const espanoles = [...new Set(vocab.map((v) => limpiar(v.espanol)))];
  const otras = (correcta, lista, n) => barajar(lista.filter((x) => sinAcentos(x) !== sinAcentos(correcta))).slice(0, n);

  // 1 · Candado de letras
  const candidatos = barajar(vocab)
    .map((v) => {
      const palabras = limpiar(v.espanol).split(" ").map(quitarPuntuacion).filter((p) => LETRAS.test(p));
      const palabra = palabras.sort((a, b) => b.length - a.length)[0] || "";
      return { palabra, zh: limpiar(v.chino), completa: limpiar(v.espanol), ejemplo: v.ejemplo, unica: palabras.length === 1 };
    })
    .filter((x) => x.palabra.length >= 4 && x.palabra.length <= 10);
  const candado = candidatos.find((x) => x.unica) || candidatos[0] || { palabra: "PUERTA", zh: "门", completa: "puerta" };

  // 2 · Pergamino roto: tres líneas con hueco
  const lineas = [];
  for (const e of barajar(c.ejercicios?.completar || [])) {
    const preg = limpiar(e?.pregunta);
    const resp = limpiar(e?.respuestaCorrecta);
    if (!resp || resp.length > 22 || !/_{2,}/.test(preg) || lineas.length >= 3) continue;
    const [antes, ...resto] = preg.split(/_{2,}/);
    const zh = limpiar(e.preguntaChino);
    lineas.push({ antes, despues: resto.join("…"), resp, zh: zh && zh !== preg && tieneChino(zh) ? zh : "" });
  }
  const conHueco = (es, zh, palabra) => {
    const i = es.toLowerCase().indexOf(palabra.toLowerCase());
    if (i < 0) return null;
    return { antes: es.slice(0, i), despues: es.slice(i + palabra.length), resp: es.slice(i, i + palabra.length), zh };
  };
  for (const t of barajar(c.teoria || []))
    for (const ej of barajar(t?.ejemplos || [])) {
      if (lineas.length >= 3) break;
      const ps = palabrasDe(ej?.espanol).map(quitarPuntuacion).filter((p) => p.length >= 3 && LETRAS.test(p));
      if (!ps.length || palabrasDe(ej.espanol).length > 12 || tieneChino(ej.espanol)) continue;
      const l = conHueco(limpiar(ej.espanol), limpiar(ej.chino), ps[Math.floor(Math.random() * ps.length)]);
      if (l && !lineas.some((x) => x.resp === l.resp)) lineas.push(l);
    }
  for (const v of barajar(vocab)) {
    if (lineas.length >= 3) break;
    if (typeof v.ejemplo !== "string" || tieneChino(v.ejemplo)) continue;
    const l = conHueco(limpiar(v.ejemplo), limpiar(v.chino), limpiar(v.espanol));
    if (l && !lineas.some((x) => x.resp === l.resp)) lineas.push({ ...l, zh: `${limpiar(v.espanol)} = ${limpiar(v.chino)}` });
  }
  while (lineas.length < 3) {
    const v = vocab[lineas.length % vocab.length];
    lineas.push({ antes: "", despues: ` = ${limpiar(v.chino)}`, resp: limpiar(v.espanol), zh: "" });
  }
  const pergamino = { lineas, banco: barajar([...lineas.map((l) => l.resp), ...otras("", espanoles.filter((e) => !lineas.some((l) => sinAcentos(l.resp) === sinAcentos(e))), 2)]) };

  // 3 · Balanza: dos preguntas de «seleccionar» o de vocabulario
  const balanza = [];
  for (const s of barajar(c.ejercicios?.seleccionar || [])) {
    const correcta = limpiar(respuestaSeleccionar(s));
    const opciones = (s?.opciones || []).map(limpiar).filter(Boolean);
    if (!correcta || opciones.length < 2 || !opciones.includes(correcta) || balanza.length >= 2) continue;
    const pz = limpiar(s.preguntaChino);
    balanza.push({ pregunta: limpiar(s.pregunta), zh: pz && pz !== limpiar(s.pregunta) ? pz : "", opciones: barajar(opciones), correcta });
  }
  for (const v of barajar(vocab)) {
    if (balanza.length >= 2) break;
    const correcta = limpiar(v.espanol);
    if (balanza.some((b) => b.correcta === correcta)) continue;
    balanza.push({ pregunta: `¿Cómo se dice «${limpiar(v.chino)}» en español?`, zh: `「${limpiar(v.chino)}」用西班牙语怎么说？`, opciones: barajar([correcta, ...otras(correcta, espanoles, 3)]), correcta });
  }

  // 4 · Mensaje cifrado: una frase de diálogo para ordenar
  const frases = frasesDeClase(c, 4, 9);
  const conZh = frases.filter((f) => f.zh);
  const frase = (conZh.length ? conZh : frases)[Math.floor(Math.random() * Math.max(1, (conZh.length ? conZh : frases).length))] ||
    (() => {
      const v = vocab.find((x) => typeof x.ejemplo === "string" && palabrasDe(x.ejemplo).length >= 3 && !tieneChino(x.ejemplo));
      return v ? { texto: limpiar(v.ejemplo), zh: `${limpiar(v.espanol)} = ${limpiar(v.chino)}` } : { texto: "El emperador abre la puerta", zh: "皇帝打开了门" };
    })();
  const cifrado = { texto: frase.texto, zh: frase.zh, palabras: palabrasDe(frase.texto) };

  // 5 · Puerta del emperador: teoría + vocabulario (mezcla)
  const emperador = [];
  const ejemplosTeoria = (c.teoria || []).flatMap((t) => (t?.ejemplos || []).filter((e) => limpiar(e?.espanol) && limpiar(e?.chino) && !tieneChino(e.espanol)).map((e) => ({ ...e, tema: limpiar(t.titulo) })));
  for (const e of barajar(ejemplosTeoria)) {
    if (emperador.length >= 2 || ejemplosTeoria.length < 3) break;
    const correcta = limpiar(e.espanol);
    if (correcta.length > 70) continue;
    emperador.push({
      pregunta: `${e.tema ? `${e.tema}: ` : ""}¿Qué frase significa «${limpiar(e.chino)}»?`,
      zh: `哪一句的意思是「${limpiar(e.chino)}」？`,
      opciones: barajar([correcta, ...otras(correcta, ejemplosTeoria.map((x) => limpiar(x.espanol)).filter((x) => x.length <= 70), 2)]),
      correcta,
    });
  }
  const zhs = [...new Set(vocab.map((v) => limpiar(v.chino)))];
  for (const v of barajar(vocab)) {
    if (emperador.length >= 3) break;
    const correcta = limpiar(v.chino);
    if (emperador.some((q) => q.correcta === correcta)) continue;
    emperador.push({ pregunta: `¿Qué significa «${limpiar(v.espanol)}»?`, zh: `「${limpiar(v.espanol)}」是什么意思？`, opciones: barajar([correcta, ...otras(correcta, zhs, 3)]), correcta, decir: limpiar(v.espanol) });
  }
  return { candado, pergamino, balanza, cifrado, emperador };
}

const formatoTiempo = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// ---------- Página ----------
export default function EscapePalacioPage() {
  const contenido = useContenidoJuego();
  if (!contenido)
    return (
      <SelectorUnidad
        titulo="Escape del palacio"
        tituloChino="逃出紫禁城"
        icono={<Sello grande>逃</Sello>}
        descripcion="Cinco puertas lacadas, cinco enigmas con tu clase · 五道朱漆门，五个谜题"
      />
    );
  return <JuegoEscape key={`${contenido.numero}-${contenido.clase}`} contenido={contenido} />;
}

function JuegoEscape({ contenido }) {
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playClick } = useSound();
  const reducido = usePrefiereMenosMovimiento();
  const [semilla, setSemilla] = React.useState(0);
  const puzles = React.useMemo(() => construirPuzles(contenido), [contenido, semilla]);
  const claveRec = claveRecord("escape", contenido);
  const [record, setRecord] = React.useState(() => leerNumero(claveRec));
  const [fase, setFase] = React.useState("inicio");
  const [puerta, setPuerta] = React.useState(0);
  const [llaves, setLlaves] = React.useState(0);
  const [inicio, setInicio] = React.useState(0);
  const [ahora, setAhora] = React.useState(0);
  const [penal, setPenal] = React.useState(0);
  const [pistas, setPistas] = React.useState(PISTAS);
  const [errores, setErrores] = React.useState(0);
  const [aviso, setAviso] = React.useState(null);
  const [resultado, setResultado] = React.useState(null);
  const puzleRef = React.useRef(null);
  const actual = React.useRef({});
  actual.current = { llaves, inicio, penal, pistas, errores, soundEnabled };

  const enMarcha = fase === "mapa" || fase === "puerta" || fase === "abriendo";
  React.useEffect(() => {
    if (!enMarcha) return;
    const id = window.setInterval(() => setAhora(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [enMarcha]);
  const segundos = inicio ? Math.max(0, ((resultado ? resultado.fin : ahora) - inicio) / 1000) + penal : 0;

  const decir = (t) => soundEnabled && speak(t, 0.9);
  const avisar = (es, zh, tipo = "info") => {
    setAviso({ es, zh, tipo, id: Math.random() });
  };

  const empezar = () => {
    playClick?.();
    setSemilla((s) => s + 1);
    setPuerta(0);
    setLlaves(0);
    setPenal(0);
    setPistas(PISTAS);
    setErrores(0);
    setResultado(null);
    setAviso(null);
    const t = Date.now();
    setInicio(t);
    setAhora(t);
    setFase("mapa");
  };

  const fallo = () => {
    soundEnabled && playWrong();
    setErrores((e) => e + 1);
    setPenal((p) => p + COSTE_ERROR);
    avisar(`Casi… +${COSTE_ERROR} s`, "差一点……再试一次", "mal");
    try {
      navigator.vibrate?.(80);
    } catch {}
  };

  const resuelto = () => {
    soundEnabled && playCorrect();
    setFase("abriendo");
    window.setTimeout(
      () => {
        const { llaves, inicio, penal, pistas, errores, soundEnabled } = actual.current;
        const nuevas = llaves + 1;
        setLlaves(nuevas);
        setAviso(null);
        if (nuevas >= PUERTAS.length) {
          const fin = Date.now();
          const total = (fin - inicio) / 1000 + penal;
          const estrellas = Math.max(1, 3 - (PISTAS - pistas > 1 ? 1 : 0) - (total > 420 ? 1 : 0) - (errores > 6 ? 1 : 0));
          const mejor = leerNumero(claveRec);
          const nuevoRecord = !mejor || total < mejor;
          if (nuevoRecord) {
            guardarNumero(claveRec, Math.round(total));
            setRecord(Math.round(total));
          }
          const xp = 30 + estrellas * 10;
          try {
            addXp(xp);
          } catch {}
          soundEnabled && playWin();
          setResultado({ fin, total, estrellas, nuevoRecord, xp });
          setFase("final");
        } else {
          setPuerta(nuevas);
          setFase("mapa");
        }
      },
      reducido ? 700 : 2300,
    );
  };

  const pedirPista = () => {
    if (pistas <= 0) return;
    const ok = puzleRef.current?.pista?.();
    if (ok) {
      setPistas((p) => p - 1);
      setPenal((p) => p + COSTE_PISTA);
      avisar(`Pista usada · +${COSTE_PISTA} s`, "已使用提示", "pista");
    } else avisar("Aquí no hace falta pista", "这里不需要提示");
  };

  if (import.meta.env.DEV) window.__jbEscape = { resolver: resuelto, puzles }; // solo para pruebas locales
  const raizRef = React.useRef(null);
  React.useEffect(() => {
    const r = raizRef.current;
    if (r && r.getBoundingClientRect().top < 0) r.scrollIntoView({ block: "start", behavior: reducido ? "auto" : "smooth" });
  }, [fase, puerta, reducido]);
  const datosPuerta = PUERTAS[puerta];
  const propsPuzle = { ref: puzleRef, onResuelto: resuelto, onFallo: fallo, decir };

  return (
    <div ref={raizRef} className={`jb-escape gm-no-adapt ${reducido ? "is-reducido" : ""}`}>
      <div className="jb-escape__barra">
        <Volver />
        <span className="jb-dragon__unidad">{etiquetaContenido(contenido)}</span>
      </div>

      {fase !== "inicio" && (
        <div className="jb-escape__hud" role="group" aria-label="Estado · 状态">
          <span className="jb-chip" aria-label={`Tiempo ${formatoTiempo(segundos)} · 用时`}>
            <TimerIcon size={18} aria-hidden="true" /> <b>{formatoTiempo(segundos)}</b>
          </span>
          <span className="jb-chip jb-chip--llaves" aria-label={`Llaves ${llaves} de 5 · 钥匙`}>
            {PUERTAS.map((p, i) => (
              <KeyRoundIcon key={p.id} size={18} className={i < llaves ? "is-tengo" : ""} aria-hidden="true" />
            ))}
          </span>
          {fase === "puerta" && (
            <button type="button" className="jb-chip jb-chip--boton" onClick={() => setFase("mapa")}>
              <MapIcon size={18} aria-hidden="true" /> Mapa · 地图
            </button>
          )}
          <button type="button" className="jb-icono jb-escape__sonido" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"} aria-pressed={!soundEnabled}>
            {soundEnabled ? <Volume2Icon size={20} /> : <VolumeXIcon size={20} />}
          </button>
        </div>
      )}

      {fase === "inicio" && (
        <div className="jb-escape__portada">
          <div className="jb-tarjeta jb-pergamino">
            <PuertaLacada className="jb-escape__puerta-portada" />
            <Sello grande>逃</Sello>
            <h1 className="jb-titulo jb-titulo--tinta">
              Escape del palacio <span>逃出紫禁城</span>
            </h1>
            <p className="jb-tarjeta__clase">
              {contenido.titulo} · {contenido.tituloChino}
            </p>
            <ul className="jb-instrucciones">
              <li>
                <b>Te han encerrado en la Ciudad Prohibida.</b> Abre las 5 puertas lacadas con lo que has aprendido en esta clase.
                <span>你被困在紫禁城里。用这一课学到的知识打开五道朱漆门。</span>
              </li>
              <li>
                <b>Cada puerta es un enigma:</b> candado de letras, pergamino roto, balanza, mensaje cifrado y la puerta del emperador.
                <span>每道门都是一个谜题：字母锁、残卷、天平、密信和皇帝之门。</span>
              </li>
              <li>
                <b>El reloj corre.</b> Tienes 3 pistas (+{COSTE_PISTA} s cada una); cada error suma {COSTE_ERROR} s.
                <span>计时进行中。你有3次提示（每次加{COSTE_PISTA}秒），每次答错加{COSTE_ERROR}秒。</span>
              </li>
            </ul>
            {record > 0 && (
              <p className="jb-record">
                <TrophyIcon size={18} aria-hidden="true" /> Mejor tiempo · 最佳用时: <b>{formatoTiempo(record)}</b>
              </p>
            )}
            <button type="button" className="jb-boton jb-boton--grande" onClick={empezar} autoFocus>
              <PlayIcon size={22} aria-hidden="true" /> Entrar al palacio · 进入皇宫
            </button>
            <Link to="/juegos/escape-palacio" className="jb-enlace">
              <LayersIcon size={16} aria-hidden="true" /> Otra unidad · 换单元
            </Link>
          </div>
        </div>
      )}

      {fase === "mapa" && <MapaPalacio puerta={puerta} llaves={llaves} onEntrar={() => (playClick?.(), setAviso(null), setFase("puerta"))} />}

      {fase === "puerta" && (
        <section className="jb-sala" aria-labelledby="jb-sala-titulo">
          <header className="jb-sala__cabecera">
            <Sello>{datosPuerta.sello}</Sello>
            <div>
              <p className="jb-sala__num">
                Puerta {puerta + 1} de 5 · 第{puerta + 1}道门
              </p>
              <h2 id="jb-sala-titulo" className="jb-sala__titulo">
                {datosPuerta.es} · <span>{datosPuerta.zh}</span>
              </h2>
              <p className="jb-sala__tarea">
                {datosPuerta.tarea} · {datosPuerta.tareaZh}
              </p>
            </div>
            <button type="button" className="jb-boton jb-boton--pista" onClick={pedirPista} disabled={pistas <= 0} aria-label={`Pista, quedan ${pistas} · 提示，剩余${pistas}次`}>
              <LightbulbIcon size={20} aria-hidden="true" /> Pista · 提示 <span className="jb-boton__n">{pistas}</span>
            </button>
          </header>
          <div className="jb-sala__cuerpo jb-pergamino">
            {datosPuerta.id === "candado" && <PuzleCandado key={`c${semilla}`} datos={puzles.candado} {...propsPuzle} />}
            {datosPuerta.id === "pergamino" && <PuzlePergamino key={`p${semilla}`} datos={puzles.pergamino} {...propsPuzle} />}
            {datosPuerta.id === "balanza" && <PuzleBalanza key={`b${semilla}`} datos={puzles.balanza} {...propsPuzle} />}
            {datosPuerta.id === "cifrado" && <PuzleCifrado key={`m${semilla}`} datos={puzles.cifrado} {...propsPuzle} />}
            {datosPuerta.id === "emperador" && <PuzleEmperador key={`e${semilla}`} datos={puzles.emperador} {...propsPuzle} />}
          </div>
          <div className="jb-aviso-zona" aria-live="polite">
            {aviso && (
              <p key={aviso.id} className={`jb-aviso jb-aviso--${aviso.tipo}`}>
                {aviso.es} · {aviso.zh}
              </p>
            )}
          </div>
        </section>
      )}

      {fase === "abriendo" &&
        createPortal(
          <div className={`jb-apertura gm-no-adapt ${reducido ? "is-reducido" : ""}`} role="status" aria-live="assertive">
            <div className="jb-apertura__luz" aria-hidden="true" />
            <div className="jb-apertura__puertas" aria-hidden="true">
              <span className="jb-hoja jb-hoja--izq" />
              <span className="jb-hoja jb-hoja--der" />
            </div>
            <div className="jb-apertura__llave">
              <KeyRoundIcon size={64} aria-hidden="true" />
              <strong>¡Puerta abierta! · 门开了！</strong>
              <span>
                Llave {llaves + 1} de 5 · 第{llaves + 1}把钥匙
              </span>
            </div>
          </div>,
          document.body,
        )}

      {fase === "final" &&
        resultado &&
        createPortal(
          <div className="jb-modal gm-no-adapt" role="dialog" aria-modal="true" aria-labelledby="jb-tesoro-titulo">
            <div className={`jb-tarjeta jb-pergamino jb-fin jb-tesoro ${reducido ? "is-reducido" : ""}`}>
              <div className="jb-cofre" aria-hidden="true">
                <span className="jb-cofre__brillo" />
                {!reducido && Array.from({ length: 14 }, (_, i) => <span key={i} className="jb-moneda" style={{ "--i": i }} />)}
                <span className="jb-cofre__tapa" />
                <span className="jb-cofre__caja" />
              </div>
              <img className="jb-tesoro__mono" src="./mono/trofeo.png" alt="Rey Mono con el trofeo · 美猴王" />
              <Sello grande className="jb-sello--tongguan">
                通关
              </Sello>
              <h2 id="jb-tesoro-titulo" className="jb-titulo jb-titulo--tinta">
                ¡Has escapado del palacio!
                <span>你逃出了紫禁城！</span>
              </h2>
              <div className="jb-estrellas" aria-label={`${resultado.estrellas} de 3 estrellas · 星`}>
                {[0, 1, 2].map((i) => (
                  <StarIcon key={i} size={36} className={i < resultado.estrellas ? "is-llena" : ""} style={{ "--i": i }} aria-hidden="true" />
                ))}
              </div>
              <div className="jb-stats">
                <div>
                  <small>Tiempo · 用时</small>
                  <strong>{formatoTiempo(resultado.total)}</strong>
                </div>
                <div>
                  <small>Pistas · 提示</small>
                  <strong>{PISTAS - pistas}</strong>
                </div>
                <div>
                  <small>XP · 经验</small>
                  <strong>+{resultado.xp}</strong>
                </div>
              </div>
              {resultado.nuevoRecord && <p className="jb-nuevo-record">¡Mejor tiempo! · 最佳纪录！</p>}
              <div className="jb-fin__botones">
                <button type="button" className="jb-boton jb-boton--grande" onClick={empezar} autoFocus>
                  <RotateCcwIcon size={20} aria-hidden="true" /> Otra vez · 再玩一次
                </button>
                <Link to="/juegos/escape-palacio" className="jb-boton jb-boton--linea">
                  <LayersIcon size={18} aria-hidden="true" /> Otra clase · 换一课
                </Link>
                <Link to="/juegos" className="jb-boton jb-boton--linea">
                  Juegos · 游戏
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

// ---------- Decorado ----------
function PuertaLacada({ className = "" }) {
  return (
    <div className={`jb-puerta ${className}`} aria-hidden="true">
      <span className="jb-puerta__tejado" />
      <span className="jb-hoja jb-hoja--izq" />
      <span className="jb-hoja jb-hoja--der" />
    </div>
  );
}

const NODOS = [
  [200, 600],
  [96, 488],
  [300, 372],
  [104, 256],
  [200, 128],
];

function MapaPalacio({ puerta, llaves, onEntrar }) {
  const botonRef = React.useRef(null);
  React.useEffect(() => {
    botonRef.current?.focus({ preventScroll: true });
  }, []);
  const ruta = "M200 690 C 200 640, 200 630, 200 600 C 150 560, 90 540, 96 488 C 110 430, 300 430, 300 372 C 300 310, 110 320, 104 256 C 100 200, 200 190, 200 128";
  return (
    <section className="jb-mapa" aria-labelledby="jb-mapa-titulo">
      <div className="jb-mapa__plano jb-pergamino">
        <svg viewBox="0 0 400 720" className="jb-mapa__svg" role="img" aria-label={`Mapa del palacio: ${llaves} de 5 puertas abiertas · 皇宫地图`}>
          <defs>
            <linearGradient id="jbTejado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd86b" />
              <stop offset="1" stopColor="#c8961e" />
            </linearGradient>
            <linearGradient id="jbMuro" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#b3122c" />
              <stop offset="1" stopColor="#7d0a1c" />
            </linearGradient>
            <filter id="jbBrillo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          {/* Muralla exterior */}
          <rect x="18" y="40" width="364" height="660" rx="10" fill="none" stroke="#8f0c21" strokeWidth="6" opacity="0.45" />
          <rect x="30" y="52" width="340" height="636" rx="8" fill="none" stroke="#c8961e" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
          {/* Salón del trono */}
          <g transform="translate(200 62)">
            <rect x="-80" y="10" width="160" height="34" fill="url(#jbMuro)" />
            <path d="M-104 12 Q-60 -2 0 -22 Q60 -2 104 12 L92 18 L-92 18 Z" fill="url(#jbTejado)" stroke="#8a5a0a" strokeWidth="1.5" />
            <path d="M-70 -8 Q-30 -20 0 -34 Q30 -20 70 -8 L60 -4 L-60 -4 Z" fill="url(#jbTejado)" stroke="#8a5a0a" strokeWidth="1.5" />
            {[-56, -28, 0, 28, 56].map((x) => (
              <rect key={x} x={x - 3} y="18" width="6" height="26" fill="#f2c14e" opacity="0.8" />
            ))}
          </g>
          {/* Pabellones de fondo */}
          {[
            [60, 380],
            [340, 520],
            [340, 210],
            [62, 620],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`} opacity="0.55">
              <rect x="-24" y="0" width="48" height="18" fill="url(#jbMuro)" />
              <path d="M-34 2 Q0 -16 34 2 L28 6 L-28 6 Z" fill="url(#jbTejado)" />
            </g>
          ))}
          {/* Camino */}
          <path d={ruta} fill="none" stroke="#3b2416" strokeWidth="14" strokeLinecap="round" opacity="0.18" />
          <path d={ruta} fill="none" stroke="#c8961e" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
          {/* Puertas */}
          {NODOS.map(([x, y], i) => {
            const abierta = i < llaves;
            const actual = i === puerta && !abierta;
            const p = PUERTAS[i];
            return (
              <g key={p.id} transform={`translate(${x} ${y})`} className={`jb-nodo ${abierta ? "is-abierta" : actual ? "is-actual" : "is-cerrada"}`}>
                {actual && <circle r="46" fill="#f2c14e" filter="url(#jbBrillo)" className="jb-nodo__halo" />}
                <path d="M-34 -24 Q0 -44 34 -24 L28 -18 L-28 -18 Z" fill={abierta || actual ? "url(#jbTejado)" : "#9c8f7a"} />
                <rect x="-24" y="-18" width="48" height="44" rx="3" fill={abierta || actual ? "url(#jbMuro)" : "#7c6f62"} stroke="#3b2416" strokeWidth="1.5" />
                {abierta ? (
                  <>
                    <rect x="-20" y="-14" width="40" height="40" fill="#ffe9a8" opacity="0.9" />
                    <path d="M-10 6 l7 7 l14 -16" fill="none" stroke="#1d6b48" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ) : (
                  <>
                    <line x1="0" y1="-18" x2="0" y2="26" stroke="#3b2416" strokeWidth="1.5" />
                    {[-8, 4, 16].map((yy) => [-14, -7, 7, 14].map((xx) => <circle key={`${xx}${yy}`} cx={xx} cy={yy - 4} r="1.8" fill={actual ? "#f2c14e" : "#b8aa96"} />))}
                  </>
                )}
                <text y="50" textAnchor="middle" className="jb-nodo__num">
                  {i + 1}
                </text>
              </g>
            );
          })}
          <text x="200" y="712" textAnchor="middle" className="jb-mapa__salida">
            Entrada · 午门
          </text>
        </svg>
      </div>
      <div className="jb-mapa__lado">
        <h2 id="jb-mapa-titulo" className="jb-titulo jb-titulo--oro">
          Mapa del palacio · <span>皇宫地图</span>
        </h2>
        <ol className="jb-mapa__lista">
          {PUERTAS.map((p, i) => {
            const abierta = i < llaves;
            const actual = i === puerta && !abierta;
            return (
              <li key={p.id} className={abierta ? "is-abierta" : actual ? "is-actual" : ""}>
                <span className="jb-mapa__icono">{abierta ? <CheckIcon size={18} aria-hidden="true" /> : actual ? <KeyRoundIcon size={18} aria-hidden="true" /> : <LockIcon size={16} aria-hidden="true" />}</span>
                <span>
                  <b>
                    {i + 1}. {p.es}
                  </b>
                  <small>{p.zh}</small>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="jb-mapa__llaves">
          {llaves} de 5 puertas abiertas · 已打开{llaves}道门
        </p>
        <button ref={botonRef} type="button" className="jb-boton jb-boton--grande" onClick={onEntrar}>
          <KeyRoundIcon size={22} aria-hidden="true" /> Abrir la puerta {puerta + 1} · 打开第{puerta + 1}道门
        </button>
      </div>
    </section>
  );
}

// ---------- Puzles ----------
function useSacudida() {
  const [sacude, setSacude] = React.useState(0);
  return [sacude ? "is-sacude" : "", () => {
    setSacude(0);
    window.requestAnimationFrame(() => setSacude(Date.now()));
    window.setTimeout(() => setSacude(0), 520);
  }];
}

// 1 · Candado de letras
const PuzleCandado = React.forwardRef(function PuzleCandado({ datos, onResuelto, onFallo, decir }, ref) {
  const objetivo = React.useMemo(() => [...datos.palabra.toUpperCase()], [datos]);
  const fichas = React.useMemo(() => {
    const extra = objetivo.length <= 6 ? barajar([..."AEIOSRNLT"].filter((l) => !objetivo.includes(l))).slice(0, 2) : [];
    let orden = barajar([...objetivo, ...extra].map((l, i) => ({ l, id: i })));
    if (orden.slice(0, objetivo.length).map((f) => f.l).join("") === objetivo.join("")) orden = orden.reverse();
    return orden;
  }, [objetivo]);
  const [huecos, setHuecos] = React.useState(() => objetivo.map(() => null)); // {id, l, fija}
  const [abierto, setAbierto] = React.useState(false);
  const [sacude, sacudir] = useSacudida();
  const usadas = new Set(huecos.filter(Boolean).map((h) => h.id));

  const comprobar = (lista) => {
    if (lista.some((h) => !h)) return;
    if (lista.map((h) => h.l).join("") === objetivo.join("")) {
      setAbierto(true);
      decir(datos.completa || datos.palabra);
      window.setTimeout(onResuelto, 900);
    } else {
      onFallo();
      sacudir();
      window.setTimeout(() => setHuecos((hs) => hs.map((h, i) => (h && (h.fija || h.l === objetivo[i]) ? { ...h, fija: true } : null))), 450);
    }
  };
  // Se comprueba cada vez que cambia la combinación (evita lecturas de estado obsoletas)
  const ultimaComprobada = React.useRef("");
  React.useEffect(() => {
    if (abierto || huecos.some((h) => !h)) {
      ultimaComprobada.current = "";
      return;
    }
    const clave = huecos.map((h) => `${h.id}`).join(",");
    if (ultimaComprobada.current === clave) return;
    ultimaComprobada.current = clave;
    comprobar(huecos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [huecos, abierto]);
  const poner = (f) => {
    if (abierto) return;
    setHuecos((hs) => {
      if (hs.some((h) => h?.id === f.id)) return hs;
      const i = hs.findIndex((h) => !h);
      return i < 0 ? hs : hs.map((h, k) => (k === i ? f : h));
    });
  };
  const quitar = (i) => {
    if (abierto || !huecos[i] || huecos[i].fija) return;
    setHuecos((hs) => hs.map((h, k) => (k === i ? null : h)));
  };
  React.useImperativeHandle(ref, () => ({
    pista: () => {
      const i = huecos.findIndex((h, k) => !h || (!h.fija && h.l !== objetivo[k]));
      if (i < 0 || abierto) return false;
      const libres = huecos.map((h, k) => (k !== i ? h : null));
      const enUso = new Set(libres.filter(Boolean).map((h) => h.id));
      let ficha = fichas.find((f) => f.l === objetivo[i] && !enUso.has(f.id));
      if (!ficha) {
        // la letra está en otro hueco equivocado: se libera
        const k = libres.findIndex((h) => h && !h.fija && h.l === objetivo[i]);
        ficha = libres[k];
        libres[k] = null;
      }
      libres[i] = { ...ficha, fija: true };
      setHuecos(libres);
      return true;
    },
  }));

  return (
    <div className="jb-puzle jb-candado">
      <p className="jb-pista-zh">
        <span>Palabra secreta · 秘密单词:</span> <strong>{datos.zh}</strong> <small>({objetivo.length} letras · 个字母)</small>
      </p>
      <div className={`jb-candado__cuerpo ${abierto ? "is-abierto" : ""} ${sacude}`}>
        <span className="jb-candado__arco" aria-hidden="true" />
        <div className="jb-candado__caja">
          <div className="jb-candado__huecos" role="group" aria-label="Combinación · 密码">
            {huecos.map((h, i) => (
              <button key={i} type="button" className={`jb-letra jb-letra--hueco ${h ? "is-llena" : ""} ${h?.fija ? "is-fija" : ""}`} onClick={() => quitar(i)} aria-label={h ? `Quitar ${h.l}` : `Hueco ${i + 1} vacío`}>
                {h?.l || ""}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="jb-letras" role="group" aria-label="Letras · 字母">
        {fichas.map((f) => (
          <button key={f.id} type="button" className="jb-letra" disabled={usadas.has(f.id) || abierto} onClick={() => poner(f)}>
            {f.l}
          </button>
        ))}
      </div>
      <button type="button" className="jb-enlace" onClick={() => setHuecos((hs) => hs.map((h) => (h?.fija ? h : null)))} disabled={abierto}>
        <Undo2Icon size={16} aria-hidden="true" /> Borrar · 清除
      </button>
    </div>
  );
});

// 2 · Pergamino roto
const PuzlePergamino = React.forwardRef(function PuzlePergamino({ datos, onResuelto, onFallo, decir }, ref) {
  const n = datos.lineas.length;
  const [puestas, setPuestas] = React.useState(() => Array(n).fill(null)); // índice del banco
  const [bien, setBien] = React.useState(() => Array(n).fill(false));
  const [activa, setActiva] = React.useState(0);
  const [mal, setMal] = React.useState([]);
  const [sacude, sacudir] = useSacudida();
  const usadas = new Set(puestas.filter((x) => x !== null));
  const correcta = (i, b) => b !== null && sinAcentos(datos.banco[b]) === sinAcentos(datos.lineas[i].resp);

  const poner = (b) => {
    let i = puestas[activa] === null && !bien[activa] ? activa : puestas.findIndex((x, k) => x === null && !bien[k]);
    if (i < 0) return;
    const nueva = puestas.map((x, k) => (k === i ? b : x));
    setPuestas(nueva);
    const sig = nueva.findIndex((x, k) => x === null && !bien[k]);
    if (sig >= 0) setActiva(sig);
  };
  const comprobar = () => {
    const nb = puestas.map((b, i) => bien[i] || correcta(i, b));
    setBien(nb);
    if (nb.every(Boolean)) {
      decir(datos.lineas.map((l) => `${l.antes}${l.resp}${l.despues}`).join(". "));
      window.setTimeout(onResuelto, 900);
    } else {
      const errs = puestas.map((b, i) => (!nb[i] && b !== null ? i : -1)).filter((i) => i >= 0);
      setMal(errs);
      onFallo();
      sacudir();
      window.setTimeout(() => {
        setMal([]);
        setPuestas((ps) => ps.map((b, i) => (nb[i] ? b : null)));
        setActiva(nb.findIndex((x) => !x));
      }, 700);
    }
  };
  React.useImperativeHandle(ref, () => ({
    pista: () => {
      const i = bien.findIndex((x) => !x);
      if (i < 0) return false;
      const b = datos.banco.findIndex((t, k) => sinAcentos(t) === sinAcentos(datos.lineas[i].resp) && (!usadas.has(k) || puestas[i] === k));
      if (b < 0) return false;
      const nueva = puestas.map((x, k) => (k === i ? b : x === b ? null : x));
      setPuestas(nueva);
      setBien(bien.map((x, k) => x || k === i));
      if (bien.filter((x) => !x).length === 1) window.setTimeout(onResuelto, 900);
      return true;
    },
  }));
  const llenas = puestas.every((x, i) => x !== null || bien[i]);

  return (
    <div className="jb-puzle jb-rollo">
      <div className={`jb-rollo__papel ${sacude}`}>
        <span className="jb-rollo__rodillo" aria-hidden="true" />
        <ol className="jb-rollo__lineas">
          {datos.lineas.map((l, i) => (
            <li key={i}>
              <span className="jb-rollo__frase">
                {l.antes}
                <button
                  type="button"
                  className={`jb-rollo__hueco ${activa === i ? "is-activa" : ""} ${bien[i] ? "is-bien" : ""} ${mal.includes(i) ? "is-mal" : ""}`}
                  onClick={() => (bien[i] ? null : puestas[i] !== null ? setPuestas(puestas.map((x, k) => (k === i ? null : x))) : setActiva(i))}
                  aria-label={puestas[i] !== null ? `Hueco ${i + 1}: ${datos.banco[puestas[i]]}` : `Hueco ${i + 1} vacío · 空`}
                >
                  {puestas[i] !== null ? datos.banco[puestas[i]] : "　？　"}
                </button>
                {l.despues}
              </span>
              {l.zh && <small className="jb-rollo__zh">{l.zh}</small>}
            </li>
          ))}
        </ol>
        <span className="jb-rollo__rodillo jb-rollo__rodillo--abajo" aria-hidden="true" />
      </div>
      <div className="jb-banco" role="group" aria-label="Fragmentos · 碎片">
        {datos.banco.map((t, k) => (
          <button key={k} type="button" className="jb-fragmento" disabled={usadas.has(k)} onClick={() => poner(k)}>
            {t}
          </button>
        ))}
      </div>
      <button type="button" className="jb-boton" disabled={!llenas} onClick={comprobar}>
        <CheckIcon size={20} aria-hidden="true" /> Comprobar · 检查
      </button>
    </div>
  );
});

// 3 · Balanza de opciones
const PuzleBalanza = React.forwardRef(function PuzleBalanza({ datos, onResuelto, onFallo, decir }, ref) {
  const [ronda, setRonda] = React.useState(0);
  const [descartadas, setDescartadas] = React.useState([]);
  const [elegida, setElegida] = React.useState(null);
  const [estado, setEstado] = React.useState("espera"); // espera | bien | mal
  const q = datos[ronda];
  const elegir = (o) => {
    if (estado === "bien") return;
    setElegida(o);
    if (o === q.correcta) {
      setEstado("bien");
      decir(o);
      window.setTimeout(() => {
        if (ronda + 1 >= datos.length) onResuelto();
        else {
          setRonda(ronda + 1);
          setDescartadas([]);
          setElegida(null);
          setEstado("espera");
        }
      }, 1300);
    } else {
      setEstado("mal");
      setDescartadas((d) => [...d, o]);
      onFallo();
      window.setTimeout(() => setEstado("espera"), 900);
    }
  };
  React.useImperativeHandle(ref, () => ({
    pista: () => {
      const malas = q.opciones.filter((o) => o !== q.correcta && !descartadas.includes(o));
      if (malas.length <= 1 || estado === "bien") return false;
      setDescartadas([...descartadas, ...barajar(malas).slice(0, malas.length - 1)]);
      return true;
    },
  }));
  const giro = estado === "bien" ? 0 : estado === "mal" ? 14 : -10;
  return (
    <div className="jb-puzle jb-balanza">
      <p className="jb-ronda">
        Pesada {ronda + 1} de {datos.length} · 第{ronda + 1}次称量
      </p>
      <div className="jb-pregunta">
        <strong>{q.pregunta}</strong>
        {q.zh && <span>{q.zh}</span>}
      </div>
      <svg className={`jb-balanza__svg is-${estado}`} viewBox="0 0 320 170" role="img" aria-label={estado === "bien" ? "La balanza está equilibrada · 天平平衡了" : "La balanza está desequilibrada · 天平不平衡"}>
        <rect x="150" y="40" width="20" height="112" rx="4" fill="#8a5a0a" />
        <path d="M110 160 L210 160 L190 146 L130 146 Z" fill="#c8961e" />
        <g style={{ transform: `rotate(${giro}deg)`, transformOrigin: "160px 44px" }} className="jb-balanza__brazo">
          <rect x="40" y="40" width="240" height="8" rx="4" fill="#f2c14e" stroke="#8a5a0a" />
          <g className="jb-balanza__plato" style={{ transform: `rotate(${-giro}deg)`, transformOrigin: "52px 44px" }}>
            <line x1="52" y1="44" x2="26" y2="100" stroke="#8a5a0a" strokeWidth="2" />
            <line x1="52" y1="44" x2="78" y2="100" stroke="#8a5a0a" strokeWidth="2" />
            <path d="M18 100 Q52 124 86 100 Z" fill="#c8961e" />
            <text x="52" y="94" textAnchor="middle" className="jb-balanza__zh">
              问
            </text>
          </g>
          <g className="jb-balanza__plato" style={{ transform: `rotate(${-giro}deg)`, transformOrigin: "268px 44px" }}>
            <line x1="268" y1="44" x2="242" y2="100" stroke="#8a5a0a" strokeWidth="2" />
            <line x1="268" y1="44" x2="294" y2="100" stroke="#8a5a0a" strokeWidth="2" />
            <path d="M234 100 Q268 124 302 100 Z" fill="#c8961e" />
            {elegida && <rect x="252" y="80" width="32" height="20" rx="4" fill={estado === "bien" ? "#1d6b48" : "#8f0c21"} />}
          </g>
        </g>
        <circle cx="160" cy="44" r="8" fill="#c8102e" stroke="#f2c14e" strokeWidth="2" />
      </svg>
      <div className="jb-pesas" role="group" aria-label="Pesas · 砝码">
        {q.opciones.map((o) => (
          <button key={o} type="button" className={`jb-pesa ${elegida === o && estado === "bien" ? "is-bien" : ""} ${elegida === o && estado === "mal" ? "is-mal" : ""} ${descartadas.includes(o) ? "is-descartada" : ""}`} disabled={descartadas.includes(o) || estado === "bien"} onClick={() => elegir(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
});

// 4 · Mensaje cifrado
const PuzleCifrado = React.forwardRef(function PuzleCifrado({ datos, onResuelto, onFallo, decir }, ref) {
  const fichas = React.useMemo(() => {
    let orden = barajar(datos.palabras.map((p, i) => ({ p, id: i })));
    if (orden.length > 1 && orden.every((f, i) => f.p === datos.palabras[i])) orden = [...orden.slice(1), orden[0]];
    return orden;
  }, [datos]);
  const [linea, setLinea] = React.useState([]); // fichas colocadas
  const [fijas, setFijas] = React.useState(0);
  const [hecho, setHecho] = React.useState(false);
  const [sacude, sacudir] = useSacudida();
  const usadas = new Set(linea.map((f) => f.id));
  const comprobar = (l) => {
    if (l.every((f, i) => f.p === datos.palabras[i])) {
      setHecho(true);
      decir(datos.texto);
      window.setTimeout(onResuelto, 1400);
    } else {
      onFallo();
      sacudir();
      const buenas = l.findIndex((f, i) => f.p !== datos.palabras[i]);
      window.setTimeout(() => setLinea((ll) => ll.slice(0, Math.max(buenas, fijas))), 500);
    }
  };
  const ultima = React.useRef("");
  React.useEffect(() => {
    if (hecho || linea.length < datos.palabras.length) {
      ultima.current = "";
      return;
    }
    const clave = linea.map((f) => f.id).join(",");
    if (ultima.current === clave) return;
    ultima.current = clave;
    comprobar(linea);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linea, hecho]);
  const poner = (f) => {
    if (hecho) return;
    setLinea((l) => (l.some((x) => x.id === f.id) || l.length >= datos.palabras.length ? l : [...l, f]));
  };
  const quitar = (i) => {
    if (hecho || i < fijas) return;
    setLinea(linea.filter((_, k) => k !== i));
  };
  React.useImperativeHandle(ref, () => ({
    pista: () => {
      if (hecho) return false;
      let k = 0;
      while (k < linea.length && linea[k].p === datos.palabras[k]) k++;
      const base = linea.slice(0, k);
      const enUso = new Set(base.map((f) => f.id));
      const f = fichas.find((x) => x.p === datos.palabras[k] && !enUso.has(x.id));
      if (!f) return false;
      const l = [...base, f];
      setLinea(l);
      setFijas(l.length);
      return true;
    },
  }));
  return (
    <div className="jb-puzle jb-cifrado">
      {datos.zh ? (
        <p className="jb-pista-zh">
          <span>Mensaje descifrado · 密信译文:</span> <strong>{datos.zh}</strong>
        </p>
      ) : (
        <p className="jb-pista-zh">
          <span>Ordena la frase · 排列句子</span>
        </p>
      )}
      <div className={`jb-cifrado__tira ${hecho ? "is-hecho" : ""} ${sacude}`} aria-live="polite">
        {linea.length === 0 && <span className="jb-cifrado__vacio">Toca las palabras en orden · 按顺序点击词语</span>}
        {linea.map((f, i) => (
          <button key={`${f.id}-${i}`} type="button" className={`jb-sobre jb-sobre--puesto ${i < fijas ? "is-fija" : ""}`} onClick={() => quitar(i)}>
            {f.p}
          </button>
        ))}
      </div>
      <div className="jb-banco" role="group" aria-label="Palabras cifradas · 加密词语">
        {fichas.map((f) => (
          <button key={f.id} type="button" className="jb-sobre" disabled={usadas.has(f.id) || hecho} onClick={() => poner(f)}>
            <span className="jb-sobre__lacre" aria-hidden="true">
              密
            </span>
            {f.p}
          </button>
        ))}
      </div>
    </div>
  );
});

// 5 · Puerta del emperador
const PuzleEmperador = React.forwardRef(function PuzleEmperador({ datos, onResuelto, onFallo, decir }, ref) {
  const [i, setI] = React.useState(0);
  const [descartadas, setDescartadas] = React.useState([]);
  const [bien, setBien] = React.useState(null);
  const q = datos[i];
  const elegir = (o) => {
    if (bien) return;
    if (o === q.correcta) {
      setBien(o);
      decir(q.decir || (tieneChino(o) ? "" : o));
      window.setTimeout(() => {
        if (i + 1 >= datos.length) onResuelto();
        else {
          setI(i + 1);
          setDescartadas([]);
          setBien(null);
        }
      }, 1000);
    } else {
      setDescartadas((d) => [...d, o]);
      onFallo();
    }
  };
  React.useImperativeHandle(ref, () => ({
    pista: () => {
      const malas = q.opciones.filter((o) => o !== q.correcta && !descartadas.includes(o));
      if (malas.length <= 1 || bien) return false;
      setDescartadas([...descartadas, ...barajar(malas).slice(0, malas.length - 1)]);
      return true;
    },
  }));
  return (
    <div className="jb-puzle jb-emperador">
      <div className="jb-sellos" aria-label={`${i} de ${datos.length} sellos · 印章`}>
        {datos.map((_, k) => (
          <span key={k} className={`jb-sellito ${k < i || (k === i && bien) ? "is-puesto" : ""}`} translate="no">
            {["天", "子", "令"][k] || "令"}
          </span>
        ))}
      </div>
      <div className="jb-pregunta jb-pregunta--edicto">
        <small>Edicto imperial {i + 1} · 圣旨 {i + 1}</small>
        <strong>{q.pregunta}</strong>
        {q.zh && <span>{q.zh}</span>}
      </div>
      <div className="jb-opciones">
        {q.opciones.map((o) => (
          <button key={o} type="button" className={`jb-opcion ${bien === o ? "is-bien" : ""} ${descartadas.includes(o) ? "is-descartada" : ""}`} disabled={descartadas.includes(o) || (bien && bien !== o)} onClick={() => elegir(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
});
