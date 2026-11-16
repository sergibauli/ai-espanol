import {
  StarIcon,
  BookOpenIcon,
  ZapIcon,
  LightbulbIcon,
  SendIcon,
  TrophyIcon,
  SparklesIcon,
  ArrowLeftIcon,
  RocketIcon,
  LayersIcon,
  FlameIcon,
  SkipForwardIcon,
  TimerIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a } from "../../lib/juegos-utils.js";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import { useSound } from "../../lib/sound.jsx";
import { Escena3D, BarraJuego, Placa, Boton3D, Resultado3D } from "../../components/juegos/Escena3D.jsx";
import "../../styles/v17-ruleta.css";
import "../../styles/v17-imprenta.css";
import "../../styles/movil-juegos.css";
function Re(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Ie(word) {
  let n = [...word.split("")];
  let m = 0;
  do {
    for (let d = n.length - 1; d > 0; d--) {
      const x = Math.floor(Math.random() * (d + 1));
      [n[d], n[x]] = [n[x], n[d]];
    }
    m++;
  } while (n.join("") === word && m < 10);
  return n.join("");
}
function We(word) {
  if (word.length <= 5) {
    return "easy";
  }
  if (word.length <= 8) {
    return "medium";
  }
  return "hard";
}
// Confeti al acertar: animado con transform (Web Animations), sin mover top/left en cada fotograma.
function Ee() {
  const a = ["#e0283f", "#f2c14e", "#f2c14e", "#5fd08a", "#d99a22", "#a50f25", "#e0283f", "#a50f25"];
  const total = window.innerWidth < 768 ? 60 : 120;
  const capa = document.createDocumentFragment();
  for (let o = 0; o < total; o++) {
    const n = document.createElement("div");
    const m = 4 + Math.random() * 10;
    const d = Math.random() > 0.5 ? "50%" : "2px";
    n.style.cssText = `position:fixed;left:50%;top:45%;width:${m}px;height:${m}px;border-radius:${d};background:${a[o % a.length]};pointer-events:none;z-index:9999;box-shadow:0 0 10px ${a[o % a.length]};will-change:transform,opacity;`;
    capa.appendChild(n);
    // misma trayectoria que antes: ~83 fotogramas con velocidad constante y caída de 2 px por fotograma
    const x = (Math.PI * 2 * o) / total;
    const h = 5 + Math.random() * 20;
    const pasos = 83;
    const dx = Math.cos(x) * h * pasos;
    const dy = (Math.sin(x) * h + 2) * pasos;
    const giro0 = Math.random() * 360;
    const giro1 = giro0 + (Math.random() - 0.5) * 20 * pasos;
    const anim = n.animate(
      [
        { transform: `translate3d(0,0,0) rotate(${giro0}deg)`, opacity: 1 },
        { transform: `translate3d(${dx}px,${dy}px,0) rotate(${giro1}deg)`, opacity: 0 },
      ],
      { duration: 1400, easing: "linear", fill: "forwards" },
    );
    anim.onfinish = () => n.remove();
  }
  document.body.appendChild(capa);
}
function Pe1Component() {
  const aRef = React.useRef([]);
  if (aRef.current.length === 0) {
    const o = ["#f2c14e", "#d99a22", "#e0283f", "#f2c14e"];
    for (let id = 0; id < 20; id++) {
      aRef.current.push({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        speed: 3 + Math.random() * 7,
        opacity: 0.2 + Math.random() * 0.5,
        delay: Math.random() * 5,
        color: o[id % o.length],
      });
    }
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {aRef.current.map((o) => (
        <div
          key={o.id}
          className="absolute"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            animation: `energyFloat ${o.speed}s ease-in-out infinite ${o.delay}s`,
          }}
        >
          <SparklesIcon
            size={o.size}
            style={{
              color: o.color,
              opacity: o.opacity,
              filter: `drop-shadow(0 0 6px ${o.color})`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes energyFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(180deg) scale(1.2)} }
      `}</style>
    </div>
  );
}
function GeComponent({ mood }) {
  const rx = mood === "sad" ? 5 : mood === "excited" ? 7 : 6;
  const ry = mood === "sad" ? 3 : mood === "excited" ? 8 : 6;
  const d_1 =
    mood === "happy"
      ? "M 16 24 Q 24 30 32 24"
      : mood === "sad"
        ? "M 16 28 Q 24 22 32 28"
        : mood === "excited"
          ? "M 16 24 Q 24 34 32 24"
          : "M 18 26 Q 24 28 30 26";
  const fill = mood === "happy" || mood === "excited" ? "rgba(224,40,63,0.6)" : "rgba(224,40,63,0.15)";
  const x =
    mood === "happy" ? "#5fd08a" : mood === "sad" ? "#ff4444" : mood === "excited" ? "#f2c14e" : "#f2c14e";
  const animation =
    mood === "excited" ? "mascotExcited 0.3s ease-in-out infinite" : "mascotFloat 3s ease-in-out infinite";
  const b = mood === "sad";
  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70"
          style={{
            background: x,
            width: "80px",
            height: "80px",
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <svg
          width="80"
          height="80"
          viewBox="0 0 48 48"
          fill="none"
          className="relative"
          style={{
            filter: `drop-shadow(0 0 15px ${x}80)`,
          }}
        >
          <path
            d="M 8 14 L 4 6 L 14 12"
            fill="url(#scramGrad)"
            stroke={x}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 40 14 L 44 6 L 34 12"
            fill="url(#scramGrad)"
            stroke={x}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M 6 12 L 4 8 L 10 11" fill="rgba(255,182,193,0.4)" />
          <path d="M 42 12 L 44 8 L 38 11" fill="rgba(255,182,193,0.4)" />
          <ellipse cx="24" cy="28" rx="18" ry="16" fill="url(#scramGrad)" stroke={x} strokeWidth="1.5" />
          <ellipse cx="17" cy="24" rx={rx} ry={ry} fill="white" />
          <ellipse cx="31" cy="24" rx={rx} ry={ry} fill="white" />
          <circle cx="17" cy="24" r="2.5" fill="#2a160c" />
          <circle cx="31" cy="24" r="2.5" fill="#2a160c" />
          <circle cx="18.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="32.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="15.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <circle cx="29.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <path d={d_1} stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="30" r="3" fill={fill} />
          <circle cx="36" cy="30" r="3" fill={fill} />
          {mood === "excited" && (
            <>
              <circle
                cx="4"
                cy="12"
                r="1.5"
                fill="#f2c14e"
                style={{
                  animation: "sparkle 0.5s ease-in-out infinite",
                }}
              />
              <circle
                cx="44"
                cy="8"
                r="1"
                fill="#e0283f"
                style={{
                  animation: "sparkle 0.7s ease-in-out infinite 0.2s",
                }}
              />
              <circle
                cx="42"
                cy="40"
                r="1.5"
                fill="#f2c14e"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
            </>
          )}
          {b && (
            <>
              <circle cx="12" cy="28" r="1.5" fill="#f2c14e" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="28" r="1.5" fill="#f2c14e" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="scramGrad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#f2c14e" />
              <stop offset="50%" stopColor="#d99a22" />
              <stop offset="100%" stopColor="#e0283f" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
function PeComponent({ ch, index, total }) {
  const m = index * 0.15;
  return (
    <div
      className="gm-tile w-16 h-20 flex items-center justify-center text-3xl font-black rounded-2xl relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(242,193,78,.2), rgba(242,193,78,.08), rgba(224,40,63,.06))",
        border: "2px solid rgba(242,193,78,.4)",
        color: "#f2c14e",
        boxShadow:
          "0 0 25px rgba(242,193,78,.2), 0 0 50px rgba(242,193,78,.1), 0 8px 20px rgba(0,0,0,.3), inset 0 1px 1px rgba(255,255,255,.1)",
        animation: `letterLevitate 2s ease-in-out infinite ${m}s, letterReveal 0.6s cubic-bezier(.2,.9,.2,1) ${m}s both`,
        transformStyle: "preserve-3d",
        textShadow: "0 0 15px rgba(242,193,78,.5), 0 0 30px rgba(242,193,78,.3)",
      }}
    >
      <span className="relative z-10">{ch}</span>
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: "linear-gradient(135deg, transparent, rgba(255,255,255,.05), transparent)",
          animation: "shimmer 3s linear infinite",
        }}
      />
    </div>
  );
}
function HeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [x, setX] = React.useState("select");
  const [b, setB] = React.useState([]);
  const [u, setU] = React.useState(0);
  const [z, setZ] = React.useState("");
  const [j, setJ] = React.useState("");
  const [N, setN] = React.useState(0);
  const [_, set_] = React.useState(0);
  const [H, setH] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("scramble_best") || "0");
    } catch {
      return 0;
    }
  });
  const [K, setK] = React.useState(0);
  const [l, setL] = React.useState("playing");
  const [W, setW] = React.useState(false);
  const [V, setV] = React.useState("");
  const [Xe, setXe] = React.useState(false);
  const [G, setG] = React.useState([]);
  const [be, setBe] = React.useState(false);
  const [te, setTe] = React.useState(1);
  const [L, setL_1] = React.useState("neutral");
  const [A, setA] = React.useState([]);
  const [ue, setUe] = React.useState(false);
  const DRef = React.useRef(null);
  const geRef = React.useRef(null);
  const ORef = React.useRef(null);
  const heRef = React.useRef(0);
  const ye = g();
  const [re, setRe] = React.useState("");
  const QRef = React.useRef([]);
  React.useEffect(() => {
    if (G.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setG((i) =>
        i
          .map((c) => ({
            ...c,
            y: c.y - 1,
            life: c.life - 0.02,
          }))
          .filter((c) => c.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [G.length]);
  React.useEffect(() => {
    if (A.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setA((i) =>
        i
          .map((c) => ({
            ...c,
            x: c.x + c.vx,
            y: c.y + c.vy,
            vy: c.vy + 0.3,
            life: c.life - 0.015,
          }))
          .filter((c) => c.life > 0),
      );
    }, 20);
    return () => clearInterval(t);
  }, [A.length]);
  React.useEffect(() => {
    if (L === "happy" || L === "sad") {
      const t = setTimeout(() => setL_1("neutral"), 1500);
      return () => clearTimeout(t);
    }
  }, [L]);
  // v17 · Sin partículas en el estado de React (re-pintaban todo el juego cada 20 ms)
  const je = () => {};
  const se = React.useCallback(
    (t) => {
      playClick();
      let i = t ? a(t) : a();
      if (i.length === 0) {
        setRe(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const c = i
        .filter((s) => s.espanol && s.chino)
        .map((s) => ({
          word: Re(s.espanol),
          hint: s.espanol,
          hintCn: s.chino,
        }))
        .filter((s) => s.word.length >= 3 && s.word.length <= 12)
        .map((s) => ({
          ...s,
          difficulty: We(s.word),
        }));
      const g = new Set();
      const f = [];
      for (const s of c) {
        if (!g.has(s.word)) {
          g.add(s.word);
          f.push(s);
        }
      }
      setB(f);
      QRef.current = f.map((s, y) => y).sort(() => Math.random() - 0.5);
      setU(0);
      setN(0);
      set_(0);
      setK(0);
      setL("playing");
      setV("");
      setW(false);
      setJ("");
      setG([]);
      setA([]);
      setTe(1);
      setL_1("neutral");
      setX("playing");
    },
    [playClick],
  );
  const p = b[QRef.current[u]];
  React.useEffect(() => {
    if (x === "playing" && p) {
      setZ(Ie(p.word));
      setJ("");
      setL("playing");
      setW(false);
      setV("");
    }
  }, [u, x, p]);
  React.useEffect(() => {
    if (x === "playing") {
      DRef.current = setInterval(() => setK((t) => t + 1), 1000);
      return () => {
        if (DRef.current) {
          clearInterval(DRef.current);
        }
      };
    }
  }, [x]);
  const oe = () => {
    if (!j.trim() || l !== "playing" || !p) {
      return;
    }
    if (j.trim().toUpperCase() === p.word) {
      playCorrect();
      setL("correct");
      setL_1("happy");
      const i = _ * 10;
      const c = Math.floor((te - 1) * 50);
      const g = 100 + i + c;
      setN((f) => f + g);
      set_((f) => {
        const s = f + 1;
        setH((y) => {
          const M = Math.max(y, s);
          localStorage.setItem("scramble_best", String(M));
          return M;
        });
        return s;
      });
      setTe((f) => Math.min(f + 0.5, 3));
      Ee();
      setV(`¡Correcto! · 答对了！ +${g}`);
      setUe(true);
      setTimeout(() => setUe(false), 1000);
      if (ORef.current) {
        const f = ORef.current.getBoundingClientRect();
        je(f.width / 2, f.height / 2 - 50, 60);

      }
    } else {
      playWrong();
      setL("wrong");
      setL_1("sad");
      set_(0);
      setTe(1);
      setXe(true);
      setBe(true);
      setTimeout(() => {
        setXe(false);
        setBe(false);
      }, 600);
      setV(`La palabra era ${p.word} · 正确答案`);
    }
  };
  const U = () => {
    playClick();
    if (u < b.length - 1) {
      setU((t) => t + 1);
    } else {
      setL("won");
      setL_1("excited");
      playWin();
    }
  };
  const onKeyDown = (t) => {
    if (t.key === "Enter") {
      if (l === "playing") {
        oe();
      } else if (l === "correct" || l === "wrong") {
        U();
      }
    }
  };
  // Teclado: un único listener mientras se juega, que siempre llama a la versión actual del manejador
  // (antes se quitaba y ponía en cada render y, entre medias, las teclas usaban estado viejo).
  const teclaRef = React.useRef(null);
  teclaRef.current = (evento) => {
    if (evento.target?.closest?.("input, textarea, [contenteditable]") || evento.ctrlKey || evento.metaKey || evento.altKey) return;
    if (evento.key === "Enter") {
      // Sin esto, con un botón enfocado (p. ej. «Saltar») Enter comprobaba y además pulsaba ese botón.
      evento.preventDefault();
      return onKeyDown(evento);
    }
    if (l !== "playing" || !p) return;
    if (evento.key === "Backspace") {
      evento.preventDefault();
      setJ((actual) => actual.slice(0, -1));
      return;
    }
    // Con el IME chino activo la tecla llega como «Process»: se usa el código físico (KeyA → A).
    let letra = evento.key.length === 1 ? evento.key.toUpperCase() : "";
    if (!letra && /^Key[A-Z]$/.test(evento.code || "")) letra = evento.code.slice(3);
    if (!/^[A-ZÑ]$/.test(letra)) return;
    evento.preventDefault();
    setJ((actual) => {
      const libres = z.split("");
      for (const usada of actual) {
        const k = libres.indexOf(usada);
        if (k >= 0) libres[k] = null;
      }
      return libres.includes(letra) && actual.length < z.length ? actual + letra : actual;
    });
  };
  React.useEffect(() => {
    if (x !== "playing") return undefined;
    const tecla = (evento) => teclaRef.current?.(evento);
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [x]);
  const F = (t) => {
    switch (t) {
      case "easy":
        return "#5fd08a";
      case "medium":
        return "#f2c14e";
      default:
        return "#ff4444";
    }
  };
  if (x === "select") {
    return (
      <>
        <SoundToggles />
        <SelectorTemaJuego juego="scramble" error={re} onIniciar={(id) => { setRe(""); se(id); }} />
      </>
    );
  }
  // v17 · Imprenta de tipos móviles: bloques de laca que se tocan (o se teclean) para componer la palabra
  const usados = [];
  {
    const libres = z.split("").map((letra, i) => ({ letra, i }));
    for (const letra of j) {
      const k = libres.findIndex((t) => t && t.letra === letra);
      if (k >= 0) {
        usados.push(libres[k].i);
        libres[k] = null;
      }
    }
  }
  const poner = (i) => {
    if (l !== "playing" || usados.includes(i)) return;
    playClick();
    setJ((actual) => (actual.length < z.length ? actual + z[i] : actual));
  };
  const quitar = (posicion) => {
    if (l !== "playing") return;
    setJ(j.slice(0, posicion) + j.slice(posicion + 1));
  };
  const total = b.length;
  const tiempo = `${Math.floor(K / 60)}:${String(K % 60).padStart(2, "0")}`;
  if (l === "won") {
    return (
      <Escena3D tema="imprenta">
        <CintaTemaJuego />
        <BarraJuego titulo="Palabra desordenada" tituloZh="单词重组" />
        <Resultado3D
          gano
          sello="序"
          estrellas={H >= total ? 3 : H >= total / 2 ? 2 : 1}
          titulo="¡Imprenta completa!"
          tituloZh="全部完成"
          datos={[
            { etiqueta: "Puntos · 得分", valor: N, tono: "rojo" },
            { etiqueta: "Palabras · 单词", valor: total, tono: "jade" },
            { etiqueta: "Mejor racha · 最佳连击", valor: H, tono: "oro" },
            { etiqueta: "Tiempo · 时间", valor: tiempo, tono: "tinta" },
          ]}
          acciones={
            <>
              <Boton3D
                tono="oro"
                onClick={() => {
                  playClick();
                  QRef.current = b.map((t, i) => i).sort(() => Math.random() - 0.5);
                  setU(0);
                  setN(0);
                  set_(0);
                  setK(0);
                  setL("playing");
                  setL_1("neutral");
                }}
              >
                <RocketIcon size={18} /> Otra vez · 再来
              </Boton3D>
              <Boton3D tono="rojo" onClick={() => setX("select")}>
                <LayersIcon size={18} /> Otra unidad · 其他单元
              </Boton3D>
            </>
          }
        />
        <P currentGameId="scramble" />
      </Escena3D>
    );
  }
  const largo = z.length;
  return (
    <Escena3D tema="imprenta" suelo={false} className={`scr ${be ? "rl--temblor" : ""}`}>
      <CintaTemaJuego />
      <SoundToggles />
      <BarraJuego titulo="Palabra desordenada" tituloZh="单词重组" alVolver={() => playClick()}>
        <Placa icono={<ZapIcon size={16} />} valor={N} etiqueta="Puntos · 分" />
        <Placa icono={<FlameIcon size={16} />} valor={_} etiqueta="Racha · 连击" tono="rojo" pulso={_ >= 3} />
        <Placa icono={<StarIcon size={16} />} valor={`${Math.min(u + 1, total)}/${total}`} etiqueta="Palabra · 词" tono="jade" />
        <Placa icono={<TimerIcon size={16} />} valor={tiempo} etiqueta="Tiempo · 时间" tono="tinta" />
        <button type="button" className="rl-accion" onClick={() => setX("select")} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
      </BarraJuego>

      <div className="scr-taller" ref={ORef}>
        <div className="scr-pista">
          <span className={`scr-nivel scr-nivel--${p?.difficulty || "easy"}`}>
            {p?.difficulty === "hard" ? "Difícil · 难" : p?.difficulty === "medium" ? "Media · 中" : "Fácil · 易"}
          </span>
          <p className={`scr-zh ${W || l !== "playing" ? "scr-zh--visible" : ""}`}>{p?.hintCn}</p>
          {l === "playing" && (
            <button type="button" className="scr-boton-pista" onClick={() => setW(!W)}>
              <LightbulbIcon size={16} /> {W ? "Ocultar · 隐藏" : "Ver significado · 看意思"}
            </button>
          )}
        </div>

        <div className={`scr-galera ${l === "correct" ? "scr-galera--bien" : ""} ${Xe ? "scr-galera--mal" : ""}`} style={{ "--n": largo }}>
          {Array.from({ length: largo }, (_x, posicion) => {
            const letra = j[posicion];
            const solucion = l === "wrong" ? p?.word[posicion] : null;
            return (
              <button
                key={posicion}
                type="button"
                className={`scr-hueco ${letra ? "scr-hueco--lleno" : ""} ${solucion ? "scr-hueco--solucion" : ""}`}
                onClick={() => letra && quitar(posicion)}
                disabled={!letra || l !== "playing"}
                aria-label={letra ? `Quitar ${letra}` : `Hueco ${posicion + 1}`}
                style={{ "--i": posicion }}
              >
                {solucion || letra ? <span className="scr-tipo">{solucion || letra}</span> : null}
              </button>
            );
          })}
          {l === "correct" && (
            <span className="scr-sello" translate="no" aria-hidden="true">
              印
            </span>
          )}
        </div>

        <p className="scr-mensaje" aria-live="polite">
          {V || "Toca los bloques en orden o escribe con el teclado · 按顺序点字块或用键盘输入"}
        </p>

        <div className="scr-bandeja" style={{ "--n": largo }}>
          {z.split("").map((letra, i) => {
            const usado = usados.includes(i);
            return (
              <button key={`${z}-${i}`} type="button" className={`scr-bloque ${usado ? "scr-bloque--usado" : ""}`} style={{ "--i": i }} onClick={() => poner(i)} disabled={usado || l !== "playing"}>
                <span className="scr-bloque__cara">{letra}</span>
              </button>
            );
          })}
        </div>

        <div className="scr-acciones">
          {l === "playing" ? (
            <>
              <Boton3D tono="tinta" onClick={() => setJ("")} disabled={!j}>
                Borrar · 清除
              </Boton3D>
              <Boton3D tono="jade" onClick={oe} disabled={j.length !== largo}>
                <SendIcon size={18} /> Comprobar · 检查
              </Boton3D>
              <Boton3D tono="rojo" onClick={U}>
                <SkipForwardIcon size={18} /> Saltar · 跳过
              </Boton3D>
            </>
          ) : (
            <Boton3D tono="oro" onClick={U}>
              {u < total - 1 ? "Siguiente · 下一个" : "Ver resultado · 看结果"} <SkipForwardIcon size={18} />
            </Boton3D>
          )}
        </div>
      </div>
    </Escena3D>
  );
}
export { HeComponent as default };
