// v14 · Selector de temática (nivel → unidad; siempre la unidad completa) común a los juegos clásicos del hub:
// Ruleta, Ahorcado, Memory, Sopa de letras, Palabra desordenada, Kahoot, Apalabrados y UNO.
// Pantalla tipo app: cabecera con el emblema del juego, búsqueda, chips de nivel A1–B2,
// «Todas las unidades» destacada y tarjetas con sello caligráfico, nivel, palabras y progreso.
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  SearchIcon,
  DicesIcon,
  EyeIcon,
  Grid3x3Icon,
  ShuffleIcon,
  ZapIcon,
  HashIcon,
  CrownIcon,
} from "lucide-react";
import CATALOGO from "../../data/modulos/catalog.json";
import "../../styles/v14-fix-juegos.css";
import { ElegirUnidadJuego } from "./ElegirUnidadJuego.jsx";


export const JUEGOS_CLASICOS = {
  ruleta: { titulo: "Ruleta de Palabras", tituloZh: "单词轮盘", sello: "轮", Icono: DicesIcon, desc: "Gira la ruleta y adivina la palabra letra a letra.", descZh: "转动轮盘，逐个字母猜出单词。" },
  ahorcado: { titulo: "Ahorcado", tituloZh: "猜词游戏", sello: "猜", Icono: EyeIcon, desc: "Adivina la palabra antes de que se acaben los intentos.", descZh: "在机会用完之前猜出单词。" },
  memory: { titulo: "Memory", tituloZh: "记忆配对", sello: "忆", Icono: Grid3x3Icon, desc: "Levanta las fichas y une cada palabra con su traducción.", descZh: "翻开卡片，把单词和翻译配成对。" },
  sopa: { titulo: "Sopa de Letras", tituloZh: "字母寻词", sello: "寻", Icono: SearchIcon, desc: "Encuentra las palabras escondidas en la cuadrícula.", descZh: "在字母方阵中找出隐藏的单词。" },
  scramble: { titulo: "Palabra Desordenada", tituloZh: "单词重组", sello: "序", Icono: ShuffleIcon, desc: "Ordena las letras y forma la palabra correcta.", descZh: "把字母排好，拼出正确的单词。" },
  kahoot: { titulo: "Kahoot Quiz", tituloZh: "抢答竞赛", sello: "答", Icono: ZapIcon, desc: "Responde rápido: cuanto antes aciertes, más puntos.", descZh: "快速作答，越快得分越高。" },
  apalabrados: { titulo: "Apalabrados", tituloZh: "拼字棋盘", sello: "字", Icono: HashIcon, desc: "Coloca fichas en el tablero y forma palabras en español.", descZh: "在棋盘上摆放字母，组成西班牙语单词。" },
  uno: { titulo: "UNO", tituloZh: "UNO 卡牌", sello: "牌", Icono: CrownIcon, desc: "El clásico de cartas: acierta la palabra para poder jugar tu carta.", descZh: "经典卡牌游戏：答对单词才能出牌。" },
};


/** Unidad que llega en la ruta (#/juegos/x?m=N); un ?clase=K heredado se ignora: se juega la unidad entera */
function leerRuta(search) {
  const params = new URLSearchParams(search);
  return { numero: Number(params.get("m")) || null };
}

// Entrada de la ruta que ya arrancó una partida (por location.key): al volver al selector desde el juego
// no se vuelve a arrancar sola, pero una navegación nueva (otra unidad) sí.
let entradaIniciada = null;

/** Sello rojo con caligrafía (número de unidad o carácter) */
export function SelloJuego({ children, grande = false, className = "" }) {
  return (
    <span className={`v14j-sello ${grande ? "v14j-sello--grande" : ""} ${className}`} translate="no" aria-hidden="true">
      {children}
    </span>
  );
}

/**
 * Pantalla de elección de temática.
 * - `juego`: clave de JUEGOS_CLASICOS.
 * - `onIniciar(moduloId | null)`: arranca la partida con la unidad (`modulo-N`) o con todas (null).
 *   Siempre con el vocabulario de la unidad completa (aunque la ruta traiga ?clase=K).
 * - `error`: aviso (p. ej. la unidad no tiene palabras válidas para este juego).
 * - `sinUnidades`: el juego no se juega por unidad (Apalabrados): solo cabecera + `children`.
 */
export function SelectorTemaJuego({ juego, onIniciar, error = "", sinUnidades = false, children }) {
  const info = JUEGOS_CLASICOS[juego] || JUEGOS_CLASICOS.ruleta;
  const { Icono } = info;
  const location = useLocation();
  const navigate = useNavigate();
  const iniciarRef = React.useRef(onIniciar);
  iniciarRef.current = onIniciar;
  const ruta = leerRuta(location.search);

  // Llegada con una unidad (?m=N, también desde una clase con &clase=K): arranca directamente con la unidad entera.
  // useLayoutEffect: antes de que el auto-clic heredado de App.jsx (PageTransition) pulse una tarjeta.
  // La entrada se identifica por clave + ruta: las URL abiertas a mano comparten la clave «default»
  const entrada = `${location.key}|${location.pathname}${location.search}`;
  React.useLayoutEffect(() => {
    if (sinUnidades || !ruta.numero) return;
    if (entradaIniciada === entrada) return;
    entradaIniciada = entrada;
    iniciarRef.current(`modulo-${ruta.numero}`);
  }, [entrada, ruta.numero, sinUnidades]);

  const ir = (numero) => {
    const destino = `?m=${numero}`;
    if (Number(new URLSearchParams(location.search).get("m")) === numero) {
      entradaIniciada = entrada;
      iniciarRef.current(`modulo-${numero}`);
    } else {
      navigate(`${location.pathname}${destino}`);
    }
  };
  const irTodas = () => {
    if (location.search) navigate(location.pathname, { replace: true });
    iniciarRef.current(null);
  };

  const unidadRuta = ruta.numero ? CATALOGO.find((u) => u.numero === ruta.numero) : null;

  // Juegos por unidad: pantalla escenográfica común (mundos por nivel y tablillas lacadas)
  if (!sinUnidades) {
    const aviso = error && !/[\u4e00-\u9fff]/.test(error) ? `${error} · 这个单元没有适合本游戏的单词，请换一个单元或选择「全部单元」。` : error;
    return (
      <div className="gm-no-adapt" data-juego={juego}>
        <ElegirUnidadJuego
          juego={{ titulo: info.titulo, tituloZh: info.tituloZh, sello: info.sello, desc: info.desc, descZh: info.descZh }}
          onElegir={ir}
          onTodas={irTodas}
          unidadActual={unidadRuta?.numero}
          error={aviso}
        />
      </div>
    );
  }

  return (
    <div className="v14j-selector gm-no-adapt" data-juego={juego}>
      <div className="v14j-barra">
        <Link to="/juegos" className="v14j-volver" aria-label="Juegos · 游戏: volver · 返回">
          <ArrowLeftIcon size={20} aria-hidden="true" />
          <span>Juegos · 游戏</span>
        </Link>
      </div>

      <header className="v14j-hero">
        <div className="v14j-emblema" aria-hidden="true">
          <span className="v14j-emblema-aro">
            <Icono size={30} strokeWidth={2.2} />
          </span>
          <SelloJuego grande>{info.sello}</SelloJuego>
        </div>
        <div className="v14j-hero-texto">
          <h1>{info.titulo}</h1>
          <p className="v14j-hero-zh" translate="no">
            {info.tituloZh}
          </p>
          <p className="v14j-hero-desc">
            {info.desc} <span>{info.descZh}</span>
          </p>
        </div>
      </header>

      {error && (
        <p className="v14j-error" role="alert">
          {error}
          <span> · 这个单元没有适合本游戏的单词，请换一个单元或选择「全部单元」。</span>
        </p>
      )}

      <div className="v14j-libre">{children}</div>

    </div>
  );
}

/** Cinta con la unidad de la partida en curso (para las fases de juego) */
export function CintaTemaJuego() {
  const location = useLocation();
  const { numero } = leerRuta(location.search);
  const unidad = numero ? CATALOGO.find((u) => u.numero === numero) : null;
  // La marca (oculta) permite aplicar el tema imperial v14 solo a los juegos clásicos (.app-stage:has(.v14j-marca))
  if (!unidad) return <span className="v14j-marca" hidden />;
  return (
    <p className="v14j-cinta v14j-marca gm-no-adapt">
      <span translate="no">{unidad.nivel}</span> Unidad {numero}
      {` · 第${numero}单元`}
      <b>{unidad.titulo}</b>
    </p>
  );
}
