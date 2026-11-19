// Palabra desordenada · 单词重组 (v32): «Imprenta del palacio».
// Los tipos móviles de marfil llegan desordenados; el alumno los coloca en la galera lacada para componer
// la palabra. Usa la base común de efectos (JuegoFx): mundo del nivel de fondo, cartel con el significado,
// estallido dorado, Rey Mono que reacciona y pantalla final con estrellas y repaso con audio.
import * as React from "react";
import { Link } from "react-router";
import { StarIcon, ZapIcon, LightbulbIcon, SendIcon, LayersIcon, FlameIcon, SkipForwardIcon, TimerIcon, RotateCcwIcon, ArrowLeftIcon, Volume2Icon, DeleteIcon } from "lucide-react";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { a as palabrasParaJuego } from "../../lib/juegos-utils.js";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import { useSound } from "../../lib/sound.jsx";
import { speak } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { Escena3D, BarraJuego, Placa, Boton3D } from "../../components/juegos/Escena3D.jsx";
import { FondoMundo, useJuegoFx, CapaJuegoFx, PantallaFinal, BotonFx, estrellasPorAciertos } from "../../components/juegos/JuegoFx.jsx";
import CATALOGO from "../../data/modulos/catalog.json";
import "../../styles/v17-ruleta.css";
import "../../styles/v17-imprenta.css";
import "../../styles/v32-imprenta.css";
import "../../styles/movil-juegos.css";

/** «¿Cómo estás?» → «COMOESTAS» (sin tildes, espacios ni signos) */
function normalizar(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}

/** Baraja las letras (nunca devuelve la palabra tal cual si se puede evitar) */
function desordenar(palabra) {
  const letras = [...palabra];
  let intentos = 0;
  do {
    for (let i = letras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    intentos++;
  } while (letras.join("") === palabra && intentos < 10);
  return letras.join("");
}

const dificultad = (palabra) => (palabra.length <= 5 ? "easy" : palabra.length <= 8 ? "medium" : "hard");
const ETIQUETA_DIFICULTAD = { easy: "Fácil · 易", medium: "Media · 中", hard: "Difícil · 难" };
const barajarIndices = (n) => Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
const formatoTiempo = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function nivelDeTema(idTema) {
  const numero = Number(String(idTema || "").replace(/\D/g, ""));
  return CATALOGO.find((u) => u.numero === numero)?.nivel || "B2";
}

export default function ScramblePage() {
  const { playCorrect, playWrong, playWin, playClick } = useSound();
  const [pantalla, setPantalla] = React.useState("select"); // select | playing
  const [palabras, setPalabras] = React.useState([]);
  const [nivel, setNivel] = React.useState("A1");
  const [indice, setIndice] = React.useState(0);
  const [desordenada, setDesordenada] = React.useState("");
  const [respuesta, setRespuesta] = React.useState("");
  const [puntos, setPuntos] = React.useState(0);
  const [racha, setRacha] = React.useState(0);
  const [mejorRacha, setMejorRacha] = React.useState(0);
  const [segundos, setSegundos] = React.useState(0);
  const [fase, setFase] = React.useState("playing"); // playing | correct | wrong | won
  const [verSignificado, setVerSignificado] = React.useState(false);
  const [multiplicador, setMultiplicador] = React.useState(1);
  const [resultados, setResultados] = React.useState([]); // { es, zh, ok }
  const [error, setError] = React.useState("");
  const ordenRef = React.useRef([]);
  const galeraRef = React.useRef(null);
  const fx = useJuegoFx({ inicio: ["¡Ordena las letras!", "把字母排好！"] });

  const empezar = React.useCallback(
    (idTema) => {
      playClick();
      const lista = idTema ? palabrasParaJuego(idTema) : palabrasParaJuego();
      const vistas = new Set();
      const validas = [];
      for (const p of lista) {
        if (!p.espanol || !p.chino) continue;
        const word = normalizar(p.espanol);
        if (word.length < 3 || word.length > 12 || vistas.has(word)) continue;
        vistas.add(word);
        validas.push({ word, hint: p.espanol, hintCn: p.chino, difficulty: dificultad(word) });
      }
      if (validas.length === 0) {
        setError('Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".');
        return;
      }
      setError("");
      setNivel(nivelDeTema(idTema));
      setPalabras(validas);
      ordenRef.current = barajarIndices(validas.length);
      setIndice(0);
      setPuntos(0);
      setRacha(0);
      setMejorRacha(0);
      setSegundos(0);
      setFase("playing");
      setMultiplicador(1);
      setResultados([]);
      setPantalla("playing");
      fx.mono("saluda", "¡Ordena las letras!", "把字母排好！");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playClick],
  );

  const actual = palabras[ordenRef.current[indice]];
  const total = palabras.length;

  React.useEffect(() => {
    if (pantalla === "playing" && actual) {
      setDesordenada(desordenar(actual.word));
      setRespuesta("");
      setFase("playing");
      setVerSignificado(false);
    }
  }, [indice, pantalla, actual]);

  // Reloj: corre mientras se juega
  React.useEffect(() => {
    if (pantalla !== "playing" || fase === "won") return undefined;
    const reloj = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(reloj);
  }, [pantalla, fase]);

  const comprobar = () => {
    if (!respuesta.trim() || fase !== "playing" || !actual) return;
    if (respuesta.trim().toUpperCase() === actual.word) {
      playCorrect();
      const ganados = 100 + racha * 10 + Math.floor((multiplicador - 1) * 50);
      const nuevaRacha = racha + 1;
      setFase("correct");
      setPuntos((p) => p + ganados);
      setRacha(nuevaRacha);
      setMejorRacha((m) => Math.max(m, nuevaRacha));
      try {
        const guardada = parseInt(localStorage.getItem("scramble_best") || "0", 10);
        if (nuevaRacha > guardada) localStorage.setItem("scramble_best", String(nuevaRacha));
      } catch {}
      setMultiplicador((m) => Math.min(m + 0.5, 3));
      setResultados((r) => [...r, { es: actual.hint, zh: actual.hintCn, ok: true }]);
      fx.acierto({ es: actual.hint, zh: actual.hintCn, desde: galeraRef.current, racha: nuevaRacha, nota: `+${ganados} · 得分` });
    } else {
      playWrong();
      setFase("wrong");
      setRacha(0);
      setMultiplicador(1);
      setResultados((r) => [...r, { es: actual.hint, zh: actual.hintCn, ok: false }]);
      fx.fallo({ es: actual.hint, zh: actual.hintCn });
    }
  };

  const siguiente = () => {
    playClick();
    if (indice < total - 1) setIndice((i) => i + 1);
    else {
      setFase("won");
      playWin();
      const aciertos = resultados.filter((r) => r.ok).length;
      if (aciertos) addXp(aciertos * 2);
    }
  };

  const saltar = () => {
    if (actual && fase === "playing") setResultados((r) => [...r, { es: actual.hint, zh: actual.hintCn, ok: false }]);
    setRacha(0);
    setMultiplicador(1);
    siguiente();
  };

  // Teclado: un único listener mientras se juega, que siempre llama a la versión actual del manejador
  const teclaRef = React.useRef(null);
  teclaRef.current = (evento) => {
    if (evento.target?.closest?.("input, textarea, [contenteditable]") || evento.ctrlKey || evento.metaKey || evento.altKey) return;
    if (evento.key === "Enter") {
      // Sin esto, con un botón enfocado (p. ej. «Saltar») Enter comprobaba y además pulsaba ese botón.
      evento.preventDefault();
      if (fase === "playing") comprobar();
      else if (fase === "correct" || fase === "wrong") siguiente();
      return;
    }
    if (fase !== "playing" || !actual) return;
    if (evento.key === "Backspace") {
      evento.preventDefault();
      setRespuesta((r) => r.slice(0, -1));
      return;
    }
    // Con el IME chino activo la tecla llega como «Process»: se usa el código físico (KeyA → A).
    let letra = evento.key.length === 1 ? evento.key.toUpperCase() : "";
    if (!letra && /^Key[A-Z]$/.test(evento.code || "")) letra = evento.code.slice(3);
    if (!/^[A-ZÑ]$/.test(letra)) return;
    evento.preventDefault();
    setRespuesta((r) => {
      const libres = desordenada.split("");
      for (const usada of r) {
        const k = libres.indexOf(usada);
        if (k >= 0) libres[k] = null;
      }
      return libres.includes(letra) && r.length < desordenada.length ? r + letra : r;
    });
  };
  React.useEffect(() => {
    if (pantalla !== "playing") return undefined;
    const tecla = (evento) => teclaRef.current?.(evento);
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [pantalla]);

  if (pantalla === "select") {
    return (
      <>
        <SoundToggles />
        <SelectorTemaJuego juego="scramble" error={error} onIniciar={(id) => empezar(id)} />
      </>
    );
  }

  // Qué bloques de la bandeja ya están colocados en la galera
  const usados = [];
  {
    const libres = desordenada.split("").map((letra, i) => ({ letra, i }));
    for (const letra of respuesta) {
      const k = libres.findIndex((t) => t && t.letra === letra);
      if (k >= 0) {
        usados.push(libres[k].i);
        libres[k] = null;
      }
    }
  }
  const poner = (i) => {
    if (fase !== "playing" || usados.includes(i)) return;
    playClick();
    setRespuesta((r) => (r.length < desordenada.length ? r + desordenada[i] : r));
  };
  const quitar = (posicion) => {
    if (fase !== "playing") return;
    setRespuesta(respuesta.slice(0, posicion) + respuesta.slice(posicion + 1));
  };

  const largo = desordenada.length;
  const aciertos = resultados.filter((r) => r.ok).length;
  const repetir = () => {
    playClick();
    ordenRef.current = barajarIndices(total);
    setIndice(0);
    setPuntos(0);
    setRacha(0);
    setMejorRacha(0);
    setSegundos(0);
    setMultiplicador(1);
    setResultados([]);
    setFase("playing");
    setDesordenada(desordenar(palabras[ordenRef.current[0]].word));
    setRespuesta("");
    setVerSignificado(false);
    fx.mono("saluda", "¡Otra vez!", "再来一次！");
  };

  return (
    <Escena3D tema="imprenta" suelo={false} className="scr scr2" fondo={<FondoMundo nivel={nivel} />}>
      <CintaTemaJuego />
      <SoundToggles />
      <BarraJuego titulo="Palabra desordenada" tituloZh="单词重组" alVolver={() => playClick()}>
        <Placa icono={<ZapIcon size={16} />} valor={puntos} etiqueta="Puntos · 分" />
        <Placa icono={<FlameIcon size={16} />} valor={racha} etiqueta="Racha · 连击" tono="rojo" pulso={racha >= 3} />
        <Placa icono={<StarIcon size={16} />} valor={`${Math.min(indice + 1, total)}/${total}`} etiqueta="Palabra · 词" tono="jade" />
        <Placa icono={<TimerIcon size={16} />} valor={formatoTiempo(segundos)} etiqueta="Tiempo · 时间" tono="tinta" />
        <button type="button" className="rl-accion" onClick={() => setPantalla("select")} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
      </BarraJuego>

      <div className="scr2-progreso" aria-hidden="true">
        <span style={{ width: `${(Math.min(indice + (fase === "playing" ? 0 : 1), total) / Math.max(1, total)) * 100}%` }} />
      </div>

      <div className="scr-taller scr2-taller">
        {/* Pergamino con las pistas: significado (sellado hasta que se pide) y audio */}
        <div className={`scr2-pergamino${verSignificado || fase !== "playing" ? " is-abierto" : ""}`}>
          <span className={`scr2-nivel scr2-nivel--${actual?.difficulty || "easy"}`}>{ETIQUETA_DIFICULTAD[actual?.difficulty || "easy"]}</span>
          {verSignificado || fase !== "playing" ? (
            <p className="scr2-significado" key={`s${indice}`}>
              <small>Significado · 意思</small>
              <b lang="zh-CN" translate="no">
                {actual?.hintCn}
              </b>
            </p>
          ) : (
            <button type="button" className="scr2-sellado" onClick={() => setVerSignificado(true)}>
              <span className="scr2-sellado__lacre" aria-hidden="true" translate="no">
                意
              </span>
              <span>
                <b>Ver significado</b>
                <small>点击看意思</small>
              </span>
              <LightbulbIcon size={18} aria-hidden="true" />
            </button>
          )}
          <button type="button" className="scr2-oir" onClick={() => actual && speak(actual.hint, 0.85)} aria-label="Escuchar la palabra · 听单词" title="Escuchar · 听">
            <Volume2Icon size={20} aria-hidden="true" />
          </button>
        </div>

        <div
          ref={galeraRef}
          key={`g${fx.estado.temblor}`}
          className={`scr-galera scr2-galera ${fase === "correct" ? "scr-galera--bien" : ""} ${fase === "wrong" ? "jfx-tiembla" : ""}`}
          style={{ "--n": largo }}
        >
          {Array.from({ length: largo }, (_x, posicion) => {
            const letra = respuesta[posicion];
            const solucion = fase === "wrong" ? actual?.word[posicion] : null;
            return (
              <button
                key={posicion}
                type="button"
                className={`scr-hueco ${letra ? "scr-hueco--lleno" : ""} ${solucion ? "scr-hueco--solucion" : ""}`}
                onClick={() => letra && quitar(posicion)}
                disabled={!letra || fase !== "playing"}
                aria-label={letra ? `Quitar ${letra} · 移除` : `Hueco ${posicion + 1} · 空位`}
                style={{ "--i": posicion }}
              >
                {solucion || letra ? <span className="scr-tipo">{solucion || letra}</span> : null}
              </button>
            );
          })}
          {fase === "correct" && (
            <span className="scr-sello" translate="no" aria-hidden="true">
              印
            </span>
          )}
        </div>

        <p className="scr-mensaje scr2-mensaje" aria-live="polite">
          {fase === "playing" ? (
            <>
              Toca los tipos en orden o escribe con el teclado <span>按顺序点字块或用键盘输入</span>
            </>
          ) : fase === "correct" ? (
            <>
              ¡Impreso! <span>印好了！</span>
            </>
          ) : (
            <>
              Así se escribe <span>正确写法</span>
            </>
          )}
        </p>

        <div className="scr-bandeja scr2-bandeja" style={{ "--n": largo }}>
          {desordenada.split("").map((letra, i) => {
            const usado = usados.includes(i);
            return (
              <button key={`${desordenada}-${i}`} type="button" className={`scr-bloque scr2-bloque ${usado ? "scr-bloque--usado" : ""}`} style={{ "--i": i }} onClick={() => poner(i)} disabled={usado || fase !== "playing"} aria-label={`Letra ${letra} · 字母`}>
                <span className="scr-bloque__cara">{letra}</span>
              </button>
            );
          })}
        </div>

        <div className="scr-acciones">
          {fase === "playing" ? (
            <>
              <Boton3D tono="tinta" onClick={() => setRespuesta("")} disabled={!respuesta}>
                <DeleteIcon size={18} /> Borrar · 清除
              </Boton3D>
              <Boton3D tono="jade" onClick={comprobar} disabled={respuesta.length !== largo}>
                <SendIcon size={18} /> Comprobar · 检查
              </Boton3D>
              <Boton3D tono="rojo" onClick={saltar}>
                <SkipForwardIcon size={18} /> Saltar · 跳过
              </Boton3D>
            </>
          ) : (
            <Boton3D tono="oro" onClick={siguiente} disabled={fase === "won"}>
              {indice < total - 1 ? "Siguiente · 下一个" : "Ver resultado · 看结果"} <SkipForwardIcon size={18} />
            </Boton3D>
          )}
        </div>
      </div>

      <CapaJuegoFx fx={fx} conMono={fase !== "won"} />

      {fase === "won" && (
        <PantallaFinal
          estrellas={estrellasPorAciertos(aciertos, total)}
          sello="印"
          datos={[
            { etiqueta: "Puntos · 得分", valor: puntos },
            { etiqueta: "Aciertos · 答对", valor: `${aciertos}/${total}` },
            { etiqueta: "Mejor racha · 最佳连击", valor: mejorRacha },
            { etiqueta: "Tiempo · 时间", valor: formatoTiempo(segundos) },
          ]}
          repaso={resultados}
          nota={aciertos ? `+${aciertos * 2} XP · 经验` : ""}
        >
          <BotonFx tono="oro" onClick={repetir}>
            <RotateCcwIcon size={18} aria-hidden="true" /> Otra vez · 再来
          </BotonFx>
          <BotonFx tono="laca" onClick={() => setPantalla("select")}>
            <LayersIcon size={18} aria-hidden="true" /> Otra unidad · 其他单元
          </BotonFx>
          <Link to="/juegos" className="jfx-boton jfx-boton--claro">
            <ArrowLeftIcon size={18} aria-hidden="true" /> Juegos · 游戏
          </Link>
        </PantallaFinal>
      )}
    </Escena3D>
  );
}
