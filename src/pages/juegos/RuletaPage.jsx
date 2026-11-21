// Ruleta de palabras · 单词轮盘 (v33): rueda de feria en 3D con bombillas que persiguen el giro,
// desenfoque de velocidad, sector ganador iluminado y la palabra que vuela al panel; casillas que se voltean
// y teclado con volumen. Usa la base común de efectos (JuegoFx): focos de plató, cartel con el significado,
// Rey Mono que reacciona y pantalla final con estrellas y repaso con audio.
import { SparklesIcon, ZapIcon, TrophyIcon, LayersIcon, FlameIcon, TargetIcon, CrownIcon, TimerIcon, FlagIcon, RotateCcwIcon, ArrowLeftIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { a as palabrasParaJuego } from "../../lib/juegos-utils.js";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import { useSound } from "../../lib/sound.jsx";
import { addXp } from "../../lib/gamification.js";
import { Escena3D, BarraJuego, Placa } from "../../components/juegos/Escena3D.jsx";
import { FocosEscenario, useJuegoFx, CapaJuegoFx, PantallaFinal, BotonFx, estrellasPorAciertos, volarFicha, sinMovimiento } from "../../components/juegos/JuegoFx.jsx";
import "../../styles/v17-ruleta.css";
import "../../styles/v33-ruleta.css";
import "../../styles/movil-juegos.css";

const FILAS_TECLADO = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];
const DURACION_GIRO = 5300;

/** «¿Cómo estás?» → «COMOESTAS» */
function normalizar(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}

// Ruleta en 3D: disco SVG inclinado con canto, bombillas, eje dorado y pedestal.
const RL_COLORES = [
  ["#e8324c", "#a50f25", "#fff"],
  ["#ffd968", "#e0a020", "#3b2416"],
  ["#3fbf85", "#17804c", "#fff"],
  ["#fbf1d6", "#e6d3a3", "#8f0c21"],
  ["#8f0c21", "#5e0614", "#ffe9b0"],
  ["#4f8df0", "#1f55c0", "#fff"],
];
const Rueda3D = React.forwardRef(function Rueda3D({ words, onSelect, onSpin, compacta }, ref) {
  const [angulo, setAngulo] = React.useState(0);
  const [girando, setGirando] = React.useState(false);
  const [ganadora, setGanadora] = React.useState(null);
  const temporizador = React.useRef(null);
  React.useEffect(() => () => clearTimeout(temporizador.current), []);
  const total = words.length;
  const paso = total > 0 ? 360 / total : 360;
  const girar = () => {
    if (girando || total === 0) return;
    onSpin();
    const elegido = Math.floor(Math.random() * total);
    const destino = -(elegido + 0.5) * paso;
    const resto = (((destino - angulo) % 360) + 360) % 360;
    setAngulo(angulo + 360 * (5 + Math.floor(Math.random() * 3)) + resto);
    setGirando(true);
    setGanadora(null);
    const palabra = words[elegido];
    temporizador.current = setTimeout(
      () => {
        setGirando(false);
        setGanadora(palabra.word);
        onSelect(palabra);
      },
      sinMovimiento() ? 400 : DURACION_GIRO,
    );
  };
  const punto = (grados, radio) => {
    const rad = ((grados - 90) * Math.PI) / 180;
    return [Math.cos(rad) * radio, Math.sin(rad) * radio];
  };
  const letra = total > 16 ? 6.2 : total > 10 ? 7.6 : 9.4;
  const bombillas = Math.max(16, total * 2);
  return (
    <div ref={ref} className={`rl-rueda rl3-rueda ${girando ? "rl-rueda--girando" : ""} ${ganadora ? "rl3-rueda--parada" : ""} ${compacta ? "rl-rueda--compacta" : ""}`}>
      <div className="rl-flecha" aria-hidden="true" />
      <div className="rl-plano">
        <div className="rl-canto" aria-hidden="true" />
        <button type="button" className="rl-disco" style={{ transform: `rotate(${angulo}deg)` }} onClick={girar} disabled={girando || total === 0} aria-label="Girar la ruleta · 转动轮盘">
          <svg viewBox="-100 -100 200 200" aria-hidden="true" translate="no">
            <defs>
              {RL_COLORES.map((color, n) => (
                <radialGradient key={n} id={`rl-g${n}`} cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0.25" stopColor={color[0]} />
                  <stop offset="1" stopColor={color[1]} />
                </radialGradient>
              ))}
            </defs>
            <circle r="99" fill="#c8961e" />
            <circle r="96" fill="#5e0614" />
            {words.map((palabra, n) => {
              const [x1, y1] = punto(n * paso, 90);
              const [x2, y2] = punto((n + 1) * paso, 90);
              const color = RL_COLORES[total % RL_COLORES.length === 1 && n === total - 1 ? 2 : n % RL_COLORES.length];
              const indice = RL_COLORES.indexOf(color);
              const texto = palabra.hintCn.length > 6 ? `${palabra.hintCn.slice(0, 5)}…` : palabra.hintCn;
              return (
                <g key={palabra.word} className={ganadora === palabra.word ? "rl3-sector rl3-sector--gana" : "rl3-sector"}>
                  <path d={total === 1 ? "M0 -90 A90 90 0 1 1 -0.01 -90 Z" : `M0 0 L${x1} ${y1} A90 90 0 ${paso > 180 ? 1 : 0} 1 ${x2} ${y2} Z`} fill={`url(#rl-g${indice})`} stroke="#f2c14e" strokeWidth="1.2" />
                  <text transform={`rotate(${(n + 0.5) * paso}) translate(0 -56) rotate(90)`} textAnchor="middle" dominantBaseline="central" fontSize={letra} fontWeight="900" fill={color[2]} fontFamily="STKaiti, KaiTi, 'Noto Serif SC', serif">
                    {texto}
                  </text>
                </g>
              );
            })}
            {/* aro de bombillas que se encienden en cadena */}
            {Array.from({ length: bombillas }, (_, n) => {
              const [x, y] = punto((n * 360) / bombillas, 94.5);
              return <circle key={n} className={`rl3-bombilla ${n % 2 ? "rl3-bombilla--b" : ""}`} cx={x} cy={y} r="2.7" />;
            })}
            <circle r="90" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
          </svg>
        </button>
        <div className="rl-brillo" aria-hidden="true" />
        <div className="rl-eje" aria-hidden="true" translate="no">
          <span>转</span>
        </div>
      </div>
      <div className="rl-pie" aria-hidden="true" />
    </div>
  );
});

export default function RuletaPage() {
  const { playCorrect, playWrong, playWin, playClick, playSlice } = useSound();
  const [pantalla, setPantalla] = React.useState("select"); // select | playing
  const [palabras, setPalabras] = React.useState([]);
  const [actual, setActual] = React.useState(null);
  const [probadas, setProbadas] = React.useState(new Set());
  const [puntos, setPuntos] = React.useState(0);
  const [completadas, setCompletadas] = React.useState(new Set());
  const [terminado, setTerminado] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [avisoRacha, setAvisoRacha] = React.useState(false);
  const [rachaMostrada, setRachaMostrada] = React.useState(0);
  const [racha, setRacha] = React.useState(0);
  const [nivel, setNivel] = React.useState(1);
  const [segundos, setSegundos] = React.useState(0);
  const [tiempoMax, setTiempoMax] = React.useState(60);
  const [inicioPalabra, setInicioPalabra] = React.useState(0);
  const [temblor, setTemblor] = React.useState(false);
  const [cambiando, setCambiando] = React.useState(false);
  const [multiplicador, setMultiplicador] = React.useState(1);
  const [avisoMulti, setAvisoMulti] = React.useState(false);
  const [fallosPalabra, setFallosPalabra] = React.useState(0);
  const [resultados, setResultados] = React.useState([]); // { es, zh, ok }
  const [error, setError] = React.useState("");
  const relojRef = React.useRef(null);
  const ruedaRef = React.useRef(null);
  const pistaRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const fx = useJuegoFx({ inicio: ["¡Gira la ruleta!", "转动轮盘吧！"] });

  const pendientes = React.useMemo(() => palabras.filter((x) => !completadas.has(x.word)), [palabras, completadas]);
  const total = palabras.length;

  const terminar = React.useCallback(() => {
    clearInterval(relojRef.current);
    setTerminado(true);
    playWin();
    const hechas = completadas.size;
    if (hechas) addXp(hechas * 2);
    // Las que no se completaron también van al repaso
    setResultados((r) => [...r, ...palabras.filter((x) => !completadas.has(x.word)).map((x) => ({ es: x.es, zh: x.hintCn, ok: false }))]);
  }, [completadas, palabras, playWin]);

  React.useEffect(() => {
    if (pantalla === "playing" && total > 0 && pendientes.length === 0 && !terminado) terminar();
  }, [pantalla, pendientes.length, total, terminado, terminar]);

  // Reloj de la palabra: al llegar a 0 se descubre una letra
  React.useEffect(() => {
    if (pantalla !== "playing" || !actual || completadas.has(actual.word) || terminado) return undefined;
    relojRef.current = setInterval(() => {
      setSegundos((s) => {
        if (s <= 1) {
          const ocultas = actual.word.split("").filter((letra) => !probadas.has(letra));
          if (ocultas.length > 0) {
            const letra = ocultas[Math.floor(Math.random() * ocultas.length)];
            setProbadas((p) => new Set(p).add(letra));
            setRacha(0);
            playWrong();
            setMensaje("¡Tiempo agotado! Letra revelada · 时间到！揭示一个字母");
            fx.mono("guino", "¡Te ayudo con una letra!", "我帮你一个字母！");
            setTimeout(() => setMensaje(""), 2000);
          }
          return tiempoMax;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(relojRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantalla, actual, completadas, terminado, tiempoMax, probadas, playWrong]);

  const empezar = React.useCallback(
    (idTema) => {
      playClick();
      const lista = idTema ? palabrasParaJuego(idTema) : palabrasParaJuego();
      const vistas = new Set();
      const validas = [];
      for (const p of lista) {
        if (!p.espanol || !p.chino) continue;
        const word = normalizar(p.espanol);
        if (word.length < 3 || word.length > 10 || vistas.has(word)) continue;
        vistas.add(word);
        validas.push({ word, hintCn: p.chino, es: p.espanol });
      }
      if (validas.length === 0) {
        setError('Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".');
        return;
      }
      setError("");
      setPalabras(validas.slice(0, 24));
      reiniciar();
      setPantalla("playing");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playClick],
  );

  function reiniciar() {
    setCompletadas(new Set());
    setPuntos(0);
    setProbadas(new Set());
    setActual(null);
    setTerminado(false);
    setMensaje("");
    setRachaMostrada(0);
    setRacha(0);
    setAvisoRacha(false);
    setNivel(1);
    setSegundos(0);
    setTiempoMax(60);
    setMultiplicador(1);
    setFallosPalabra(0);
    setResultados([]);
    fx.mono("saluda", "¡Gira la ruleta!", "转动轮盘吧！");
  }

  const alElegir = (palabra) => {
    playSlice();
    setActual(null);
    setProbadas(new Set());
    setCambiando(true);
    setFallosPalabra(0);
    // La palabra sale volando del puntero de la ruleta al panel
    volarFicha(palabra.hintCn, ruedaRef.current?.querySelector(".rl-flecha"), pistaRef.current, "rl3-vuelo");
    setTimeout(() => {
      setActual(palabra);
      setInicioPalabra(Date.now());
      setSegundos(tiempoMax);
      setCambiando(false);
    }, sinMovimiento() ? 0 : 650);
    fx.mono("feliz", "¡Escríbela en español!", "用西班牙语拼出来！");
  };

  const probarLetra = (letra) => {
    if (!actual || completadas.has(actual.word) || terminado) return;
    const nuevas = new Set(probadas).add(letra);
    setProbadas(nuevas);
    if (!actual.word.includes(letra)) {
      playWrong();
      setRacha(0);
      setMultiplicador(1);
      setFallosPalabra((f) => f + 1);
      setTemblor(true);
      setTimeout(() => setTemblor(false), 600);
      fx.fallo({});
      return;
    }
    playCorrect();
    const nuevaRacha = racha + 1;
    setRacha(nuevaRacha);
    const segundosUsados = (Date.now() - inicioPalabra) / 1000;
    const extraRapidez = segundosUsados < 15 ? 30 : segundosUsados < 30 ? 15 : 0;
    const multi = 1 + Math.min(Math.floor(nuevaRacha / 3), 3);
    setMultiplicador(multi);
    if (multi > 1) {
      setAvisoMulti(true);
      setTimeout(() => setAvisoMulti(false), 1500);
    }
    setPuntos((p) => p + (10 + Math.min(nuevaRacha, 6) * 3 + extraRapidez) * multi);
    if (nuevaRacha >= 3) {
      setRachaMostrada(nuevaRacha);
      setAvisoRacha(true);
      setTimeout(() => setAvisoRacha(false), 1500);
    }
    if (actual.word.split("").every((l) => nuevas.has(l))) {
      // ¡Palabra completa!
      playWin();
      setCompletadas((c) => new Set(c).add(actual.word));
      setPuntos((p) => p + 50 + Math.floor((segundos / tiempoMax) * 50));
      setRacha(0);
      setResultados((r) => [...r, { es: actual.es, zh: actual.hintCn, ok: fallosPalabra === 0 }]);
      fx.acierto({ es: actual.es, zh: actual.hintCn, desde: panelRef.current, nota: "¡Palabra completa! · 完成！" });
      const hechas = completadas.size + 1;
      if (hechas % 3 === 0) {
        setNivel((n) => Math.min(n + 1, 5));
        setTiempoMax((t) => Math.max(t - 8, 30));
      }
    }
  };

  // Teclado físico
  React.useEffect(() => {
    const alPulsar = (evento) => {
      if (pantalla !== "playing" || !actual || terminado || completadas.has(actual.word)) return;
      if (evento.target?.closest?.("input, textarea") || evento.ctrlKey || evento.metaKey || evento.altKey) return;
      // Con el IME chino activo la tecla llega como «Process»: se usa el código físico (KeyA → A).
      let letra = evento.key.length === 1 ? evento.key.toUpperCase() : "";
      if (!letra && /^Key[A-Z]$/.test(evento.code || "")) letra = evento.code.slice(3);
      if (/^[A-ZÑ]$/.test(letra) && !probadas.has(letra)) probarLetra(letra);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  });

  if (pantalla === "select") {
    return (
      <>
        <SoundToggles />
        <SelectorTemaJuego juego="ruleta" error={error} onIniciar={(id) => empezar(id)} />
      </>
    );
  }

  const enJuego = !!actual && !completadas.has(actual.word);
  const tiempoPct = tiempoMax > 0 ? Math.max(0, Math.min(100, (segundos / tiempoMax) * 100)) : 0;

  return (
    <Escena3D tema="ruleta" className={`rl rl3 ${temblor ? "rl--temblor" : ""} ${enJuego ? "rl--jugando" : ""}`} fondo={<FocosEscenario />}>
      <CintaTemaJuego />
      <SoundToggles />
      <BarraJuego titulo="Ruleta de Palabras" tituloZh="单词轮盘" alVolver={() => playClick()}>
        <Placa icono={<ZapIcon size={16} />} valor={puntos} etiqueta="Puntos · 分" />
        <Placa icono={<FlameIcon size={16} />} valor={racha} etiqueta="Racha · 连击" tono="rojo" pulso={racha >= 3} />
        <Placa icono={<TrophyIcon size={16} />} valor={`${completadas.size}/${total}`} etiqueta="Palabras · 词" tono="jade" />
        <Placa icono={<CrownIcon size={16} />} valor={nivel} etiqueta="Nivel · 级" tono="tinta" />
        <button type="button" className="rl-accion" onClick={() => { playClick(); terminar(); }} title="Terminar · 结束" aria-label="Terminar la partida · 结束游戏" disabled={terminado}>
          <FlagIcon size={18} />
        </button>
        <button type="button" className="rl-accion" onClick={() => { playClick(); setPantalla("select"); }} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
      </BarraJuego>

      <div className="rl-avisos" aria-live="polite">
        {avisoRacha && rachaMostrada >= 3 && (
          <p className="rl-aviso rl-aviso--racha">
            <FlameIcon size={30} /> ¡Racha x{rachaMostrada}! · 连击
          </p>
        )}
        {avisoMulti && multiplicador > 1 && (
          <p className="rl-aviso rl-aviso--multi">
            <TargetIcon size={28} /> ¡Puntos x{multiplicador}! · 加倍
          </p>
        )}
      </div>

      <div className="rl-tablero">
        <div className="rl-lado">
          <Rueda3D ref={ruedaRef} words={pendientes} onSelect={alElegir} onSpin={() => { playSlice(); fx.mono("poder", "¡Que gire!", "转起来！"); }} compacta={enJuego} />
          {!enJuego && (
            <p className="rl-ayuda">{pendientes.length > 0 ? "Toca la ruleta para girar · 点击轮盘转动" : "¡Todas las palabras completadas! · 所有单词已完成"}</p>
          )}
        </div>

        <div className="rl-panel rl3-panel" ref={panelRef}>
          <span className="rl-panel__clavo rl-panel__clavo--i" aria-hidden="true" />
          <span className="rl-panel__clavo rl-panel__clavo--d" aria-hidden="true" />
          <p className="rl-panel__etiqueta">
            <SparklesIcon size={16} /> {actual ? "¿Cómo se escribe en español? · 西班牙语怎么拼？" : "Adivina la palabra · 猜单词"}
          </p>
          <p ref={pistaRef} key={actual?.word || "vacio"} className={`rl-pista rl3-pista ${actual ? "" : "rl-pista--vacia"} ${cambiando ? "rl-pista--sale" : ""}`} lang="zh-CN">
            {actual ? actual.hintCn : "转"}
          </p>
          {actual ? (
            <div className={`rl-casillas ${completadas.has(actual.word) ? "rl3-casillas--hecha" : ""}`} style={{ "--n": actual.word.length }}>
              {actual.word.split("").map((letra, n) => {
                const visible = probadas.has(letra) || completadas.has(actual.word);
                return (
                  <span key={`${actual.word}-${n}`} className={`rl-casilla ${visible ? "rl-casilla--vista" : ""}`} style={{ "--i": n }}>
                    <i>?</i>
                    <b>{visible ? letra : ""}</b>
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="rl-panel__vacio">Gira la ruleta para obtener una palabra · 转动轮盘获取单词</p>
          )}
          <div className={`rl-tiempo ${enJuego ? "" : "rl-tiempo--oculto"} ${tiempoPct < 25 ? "rl-tiempo--poco" : ""}`}>
            <TimerIcon size={15} />
            <span>
              <i style={{ transform: `scaleX(${tiempoPct / 100})` }} />
            </span>
            <b>{segundos}s</b>
          </div>
          <div className="rl-teclado">
            {FILAS_TECLADO.map((fila) => (
              <div key={fila} className="rl-teclado__fila">
                {fila.split("").map((tecla) => {
                  const usada = probadas.has(tecla);
                  const acierto = usada && !!actual?.word.includes(tecla);
                  return (
                    <button key={tecla} type="button" className={`rl-tecla ${usada ? (acierto ? "rl-tecla--bien" : "rl-tecla--mal") : ""}`} onClick={() => probarLetra(tecla)} disabled={!enJuego || usada}>
                      {tecla}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="rl-mensaje" aria-live="polite">
            {mensaje}
          </p>
        </div>
      </div>

      <CapaJuegoFx fx={fx} conMono={!terminado} />

      {terminado && (
        <PantallaFinal
          estrellas={estrellasPorAciertos(completadas.size, total)}
          sello="轮"
          titulo={completadas.size === total ? "¡Felicidades!" : undefined}
          tituloZh={completadas.size === total ? "恭喜 · 全部完成" : undefined}
          datos={[
            { etiqueta: "Puntos · 得分", valor: puntos },
            { etiqueta: "Palabras · 单词", valor: `${completadas.size}/${total}` },
            { etiqueta: "Nivel · 等级", valor: nivel },
          ]}
          repaso={resultados}
          nota={completadas.size ? `+${completadas.size * 2} XP · 经验` : ""}
        >
          <BotonFx
            tono="oro"
            onClick={() => {
              playClick();
              reiniciar();
            }}
          >
            <RotateCcwIcon size={18} aria-hidden="true" /> Jugar de nuevo · 再玩一次
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
