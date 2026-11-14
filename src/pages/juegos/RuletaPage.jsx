import {
  BrainIcon,
  SparklesIcon,
  BookOpenIcon,
  ZapIcon,
  TrophyIcon,
  ArrowLeftIcon,
  LayersIcon,
  DiamondIcon,
  FlameIcon,
  TargetIcon,
  CrownIcon,
  TimerIcon,
  CoinsIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import { useSound } from "../../lib/sound.jsx";
import { Escena3D, BarraJuego, Placa, Boton3D, Resultado3D } from "../../components/juegos/Escena3D.jsx";
import "../../styles/v17-ruleta.css";
const Se = ["#e0283f", "#d99a22", "#f2c14e", "#f2c14e", "#a50f25", "#5fd08a", "#e0283f", "#f2c14e"];
const _e = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];
function Qe(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function UeComponent({ active }) {
  const oRef = React.useRef(null);
  const sRef = React.useRef([]);
  const rRef = React.useRef(false);
  React.useEffect(() => {
    rRef.current = active;
  }, [active]);
  React.useEffect(() => {
    const oRef_current = oRef.current;
    if (!oRef_current) {
      return;
    }
    const f = oRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!f) {
      return;
    }
    let c;
    const m = [
      "#e0283f",
      "#d99a22",
      "#f2c14e",
      "#f2c14e",
      "#a50f25",
      "#5fd08a",
      "#e0283f",
      "#f2c14e",
      "#e0283f",
      "#f2c14e",
    ];
    const a = () => {
      const b = window.devicePixelRatio || 1;
      oRef_current.width = (window.innerWidth || 1) * b;
      oRef_current.height = (window.innerHeight || 1) * b;
      oRef_current.style.width = `${window.innerWidth}px`;
      oRef_current.style.height = `${window.innerHeight}px`;
      f.setTransform(b, 0, 0, b, 0, 0);
    };
    const v = () => {
      for (let b = 0; b < 150; b++) {
        const w = Math.random() * Math.PI * 2;
        const d = 2 + Math.random() * 10;
        sRef.current.push({
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 100,
          vx: Math.cos(w) * d,
          vy: Math.sin(w) * d - 5,
          r: 3 + Math.random() * 8,
          a: 1,
          c: m[Math.floor(Math.random() * m.length)],
          life: 1,
          maxLife: 1,
          decay: 0.003 + Math.random() * 0.005,
          gravity: 0.08 + Math.random() * 0.12,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 20,
          shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
        });
      }
    };
    const l = () => {
      if (document.hidden) {
        c = requestAnimationFrame(l);
        return;
      }
      if (
        !oRef_current ||
        oRef_current.width <= 0 ||
        oRef_current.height <= 0 ||
        !isFinite(oRef_current.width) ||
        !isFinite(oRef_current.height)
      ) {
        c = requestAnimationFrame(l);
        return;
      }
      f.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const sRef_current = sRef.current;
      for (let w = sRef_current.length - 1; w >= 0; w--) {
        const d = sRef_current[w];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += d.gravity;
        d.vx *= 0.99;
        d.rotation += d.rotSpeed;
        d.life -= d.decay;
        if (d.life <= 0 || d.y > window.innerHeight + 50) {
          sRef_current.splice(w, 1);
          continue;
        }
        f.save();
        f.translate(d.x, d.y);
        f.rotate((d.rotation * Math.PI) / 180);
        f.globalAlpha = d.life * d.a;
        f.fillStyle = d.c;
        f.shadowBlur = 15;
        f.shadowColor = d.c;
        if (d.shape === "circle") {
          f.beginPath();
          f.arc(0, 0, d.r, 0, Math.PI * 2);
          f.fill();
        } else if (d.shape === "square") {
          f.fillRect(-d.r / 2, -d.r / 2, d.r, d.r);
        } else {
          f.beginPath();
          f.moveTo(0, -d.r);
          f.lineTo(d.r * 0.866, d.r * 0.5);
          f.lineTo(-d.r * 0.866, d.r * 0.5);
          f.closePath();
          f.fill();
        }
        f.restore();
      }
      if (rRef.current && sRef_current.length < 50 && Math.random() > 0.7) {
        v();
      }
      c = requestAnimationFrame(l);
    };
    a();
    window.addEventListener("resize", a);
    l();
    return () => {
      cancelAnimationFrame(c);
      window.removeEventListener("resize", a);
    };
  }, []);
  React.useEffect(() => {
    if (active) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const sRef_current = sRef.current;
          const c = ["#e0283f", "#d99a22", "#f2c14e", "#f2c14e", "#a50f25", "#5fd08a", "#e0283f", "#f2c14e"];
          for (let m = 0; m < 200; m++) {
            const a = Math.random() * Math.PI * 2;
            const v = 3 + Math.random() * 15;
            sRef_current.push({
              x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
              y: window.innerHeight / 2 - 100 + (Math.random() - 0.5) * 50,
              vx: Math.cos(a) * v,
              vy: Math.sin(a) * v - 8,
              r: 4 + Math.random() * 10,
              a: 1,
              c: c[Math.floor(Math.random() * c.length)],
              life: 1,
              maxLife: 1,
              decay: 0.002 + Math.random() * 0.004,
              gravity: 0.06 + Math.random() * 0.1,
              rotation: Math.random() * 360,
              rotSpeed: (Math.random() - 0.5) * 25,
              shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
            });
          }
        }, i * 300);
      }
    }
  }, [active]);
  return (
    <canvas
      ref={oRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 101,
        pointerEvents: "none",
      }}
    />
  );
}
// v17 · Ruleta en 3D: disco SVG inclinado con canto, bombillas, eje dorado y pedestal.
const RL_COLORES = [
  ["#e8324c", "#a50f25", "#fff"],
  ["#ffd968", "#e0a020", "#3b2416"],
  ["#3fbf85", "#17804c", "#fff"],
  ["#fbf1d6", "#e6d3a3", "#8f0c21"],
  ["#8f0c21", "#5e0614", "#ffe9b0"],
  ["#4f8df0", "#1f55c0", "#fff"],
];
function Rueda3D({ words, onSelect, onSpin, compacta }) {
  const [angulo, setAngulo] = React.useState(0);
  const [girando, setGirando] = React.useState(false);
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
    const palabra = words[elegido];
    temporizador.current = setTimeout(() => {
      setGirando(false);
      onSelect(palabra);
    }, 5300);
  };
  const punto = (grados, radio) => {
    const rad = ((grados - 90) * Math.PI) / 180;
    return [Math.cos(rad) * radio, Math.sin(rad) * radio];
  };
  const letra = total > 16 ? 6.2 : total > 10 ? 7.6 : 9.4;
  return (
    <div className={`rl-rueda ${girando ? "rl-rueda--girando" : ""} ${compacta ? "rl-rueda--compacta" : ""}`}>
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
              const [x1, y1] = punto(n * paso, 92);
              const [x2, y2] = punto((n + 1) * paso, 92);
              const color = RL_COLORES[total % RL_COLORES.length === 1 && n === total - 1 ? 2 : n % RL_COLORES.length];
              const indice = RL_COLORES.indexOf(color);
              const texto = palabra.hintCn.length > 6 ? `${palabra.hintCn.slice(0, 5)}…` : palabra.hintCn;
              return (
                <g key={palabra.word}>
                  <path d={total === 1 ? "M0 -92 A92 92 0 1 1 -0.01 -92 Z" : `M0 0 L${x1} ${y1} A92 92 0 ${paso > 180 ? 1 : 0} 1 ${x2} ${y2} Z`} fill={`url(#rl-g${indice})`} stroke="#f2c14e" strokeWidth="1.2" />
                  <text transform={`rotate(${(n + 0.5) * paso}) translate(0 -58) rotate(90)`} textAnchor="middle" dominantBaseline="central" fontSize={letra} fontWeight="900" fill={color[2]} fontFamily="STKaiti, KaiTi, 'Noto Serif SC', serif">
                    {texto}
                  </text>
                </g>
              );
            })}
            {words.map((palabra, n) => {
              const [x, y] = punto(n * paso, 95.5);
              return <circle key={palabra.word} cx={x} cy={y} r="2.6" fill="#fff3c4" stroke="#8a5a0a" strokeWidth="0.6" />;
            })}
            <circle r="92" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
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
}
function YtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick, playSlice } = useSound();
  const [c, setC] = React.useState("select");
  const [a, setA] = React.useState([]);
  const [l, setL] = React.useState(null);
  const [w, setW] = React.useState(new Set());
  const [O, setO] = React.useState(0);
  const [M, setM] = React.useState(new Set());
  const [P, setP] = React.useState(false);
  const [F, setF] = React.useState("");
  const [B, setB] = React.useState(false);
  const [h, setH] = React.useState(0);
  const [g, setG] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [$, set$] = React.useState(0);
  const [j, setJ] = React.useState(60);
  const [A, setA_1] = React.useState(false);
  const [R, setR] = React.useState("");
  const [D, setD] = React.useState(0);
  const [oe, setOe] = React.useState(0);
  const [Ne, setNe] = React.useState(0);
  const [Ce, setCe] = React.useState(false);
  const [de, setDe] = React.useState(false);
  const [fe, setFe] = React.useState(1);
  const [ze, setZe] = React.useState(false);
  const [ot, setOt] = React.useState(0);
  const [pe, setPe] = React.useState("");
  const words = React.useMemo(() => a.filter((x) => !M.has(x.word)), [a, M]);
  React.useEffect(() => {
    if (c === "playing" && words.length === 0 && a.length > 0 && !P) {
      setP(true);
      playWin();
    }
  }, [c, words, a, P, playWin]);
  const reRef = React.useRef(null);
  const Fe = g_1();
  const [me, setMe] = React.useState("");
  const expression = React.useMemo(() => {
    if (P || (B && h >= 6)) {
      return "mega";
    }
    if (B) {
      return "excited";
    }
    if (g >= 4) {
      return "cool";
    }
    if (g >= 2) {
      return "happy";
    }
    if (g === 0 && w.size > 0 && l && !l.word.split("").every((x) => w.has(x))) {
      return "sad";
    }
    return "neutral";
  }, [P, B, g, w, l, h]);
  React.useEffect(() => {
    if (c === "playing" && l && !M.has(l.word) && !P) {
      reRef.current = setInterval(() => {
        set$((x) => {
          if (x <= 1) {
            if (l && !M.has(l.word)) {
              const k = l.word.split("").filter((S) => !w.has(S));
              if (k.length > 0) {
                const S = k[Math.floor(Math.random() * k.length)];
                setW((G) => new Set(G).add(S));
                setG(0);
                playWrong();
                setF("¡Tiempo agotado! Letra revelada...");
                setTimeout(() => setF(""), 2000);
              }
            }
            return j;
          }
          return x - 1;
        });
      }, 1000);
      return () => {
        if (reRef.current) {
          clearInterval(reRef.current);
        }
      };
    }
  }, [c, l, M, P, j, w, playWrong]);
  const ue = React.useCallback(
    (x) => {
      playClick();
      let k = x ? a_1(x) : a_1();
      if (k.length === 0) {
        setMe(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const S = k
        .filter((W) => W.espanol && W.chino)
        .map((W) => ({
          word: Qe(W.espanol),
          hintCn: W.chino,
        }))
        .filter((W) => W.word.length >= 3 && W.word.length <= 10);
      const G = new Set();
      const X = [];
      for (const W of S) {
        if (!G.has(W.word)) {
          G.add(W.word);
          X.push(W);
        }
      }
      const Q = X.slice(0, 24);
      setA(Q);
      setM(new Set());
      setO(0);
      setW(new Set());
      setL(null);
      setP(false);
      setF("");
      setH(0);
      setG(0);
      setB(false);
      setLevel(1);
      setOe(0);
      setNe(Q.length);
      set$(0);
      setFe(1);
      setOt(0);
      setC("playing");
    },
    [playClick],
  );
  const onSelect = (x) => {
    playSlice();
    if (M.has(x.word)) {
      setF("¡Ya completada! / 已完成！");
      setTimeout(() => setF(""), 1500);
      return;
    }
    setL(null);
    setW(new Set());
    setDe(true);
    setTimeout(() => {
      setL(x);
      setD(Date.now());
      set$(60);
      setJ(60);
      setDe(false);
    }, 400);
    setF(`¡Palabra seleccionada! / 已选择单词: ${x.hintCn}`);
    setTimeout(() => setF(""), 3000);
  };
  const ne = (x) => {
    if (!l || M.has(l.word)) {
      return;
    }
    const k = new Set(w).add(x);
    setW(k);
    if (l.word.includes(x)) {
      playCorrect();
      const S = g + 1;
      setG(S);
      const G = (Date.now() - D) / 1000;
      let X = 0;
      if (G < 15) {
        X = 30;
      } else if (G < 30) {
        X = 15;
      }
      const Q = 1 + Math.min(Math.floor(S / 3), 3);
      setFe(Q);
      if (Q > 1) {
        setZe(true);
        setTimeout(() => setZe(false), 1500);
      }
      const Le = (10 + Math.min(S, 6) * 3 + X) * Q;
      setO((Z) => Z + Le);
      if (S >= 3) {
        setH(S);
        setB(true);
        setTimeout(() => setB(false), 1500);
      }
      setR("rgba(95,208,138,0.35)");
      setA_1(true);
      setTimeout(() => setA_1(false), 400);
      if (!l.word.split("").every((Z) => k.has(Z))) {
        setTimeout(() => {
          setR("rgba(95,208,138,0.15)");
          setA_1(true);
          setTimeout(() => setA_1(false), 200);
        }, 100);
      }
      if (l.word.split("").every((Z) => k.has(Z))) {
        playWin();
        setM((q) => new Set(q).add(l.word));
        setPe("¡Muy bien!");
        setTimeout(() => setPe(""), 2000);
        const Z = 50 + Math.floor(($ / j) * 50);
        setO((q) => q + Z);
        setG(0);
        setOe((q) => q + 1);
        if ((oe + 1) % 3 === 0) {
          setLevel((q) => Math.min(q + 1, 5));
          setJ((q) => Math.max(q - 8, 30));
        }
        setR("rgba(242,193,78,0.2)");
        setA_1(true);
        setTimeout(() => setA_1(false), 500);
        if (M.size + 1 >= a.length) {
          setP(true);
          playWin();
        }
      }
    } else {
      playWrong();
      setG(0);
      setFe(1);
      setCe(true);
      setR("rgba(224,40,63,0.45)");
      setA_1(true);
      setTimeout(() => {
        setCe(false);
        setA_1(false);
      }, 600);
    }
  };
  const We = () => {
    playClick();
    setL(null);
    setW(new Set());
    setO(0);
    setM(new Set());
    setP(false);
    setH(0);
    setG(0);
    setB(false);
    setLevel(1);
    setOe(0);
    set$(0);
    setFe(1);
    setOt(0);
  };
  const onSpin = () => {
    playSlice();
    setOt((x) => x + 1);
  };
  React.useEffect(() => {
    const x = (k) => {
      if (c !== "playing" || !l || P || M.has(l.word)) {
        return;
      }
      const S = k.key.toUpperCase();
      if (/^[A-ZÑ]$/.test(S) && !w.has(S)) {
        ne(S);
      }
    };
    window.addEventListener("keydown", x);
    return () => window.removeEventListener("keydown", x);
  }, [c, l, w, P, ne, M]);
  if (c === "select") {
    return (
      <>
        <SoundToggles />
        <SelectorTemaJuego juego="ruleta" error={me} onIniciar={(id) => { setMe(""); ue(id); }} />
      </>
    );
  }
  const enJuego = !!l && !M.has(l.word);
  const tiempoPct = j > 0 ? Math.max(0, Math.min(100, ($ / j) * 100)) : 0;
  if (P) {
    return (
      <Escena3D tema="ruleta">
        <CintaTemaJuego />
        <SoundToggles />
        <UeComponent active={P} />
        <BarraJuego titulo="Ruleta de Palabras" tituloZh="单词轮盘" />
        <Resultado3D
          gano
          sello="轮"
          estrellas={3}
          titulo="¡Felicidades!"
          tituloZh="恭喜 · 全部完成"
          datos={[
            { etiqueta: "Puntos · 得分", valor: O, tono: "rojo" },
            { etiqueta: "Palabras · 单词", valor: `${oe}/${Ne}`, tono: "jade" },
            { etiqueta: "Nivel · 等级", valor: level, tono: "oro" },
          ]}
          acciones={
            <>
              <Boton3D tono="oro" onClick={We}>
                Jugar de nuevo · 再玩一次
              </Boton3D>
              <Boton3D tono="rojo" onClick={() => { playClick(); setC("select"); }}>
                <LayersIcon size={18} /> Otra unidad · 其他单元
              </Boton3D>
            </>
          }
        />
        <P_1 currentGameId="ruleta" />
      </Escena3D>
    );
  }
  return (
    <Escena3D tema="ruleta" className={`rl ${Ce ? "rl--temblor" : ""} ${enJuego ? "rl--jugando" : ""}`}>
      <CintaTemaJuego />
      <SoundToggles />
      {A && <div className="rl-destello" style={{ background: R }} aria-hidden="true" />}
      <BarraJuego titulo="Ruleta de Palabras" tituloZh="单词轮盘" alVolver={() => playClick()}>
        <Placa icono={<ZapIcon size={16} />} valor={O} etiqueta="Puntos · 分" />
        <Placa icono={<FlameIcon size={16} />} valor={g} etiqueta="Racha · 连击" tono="rojo" pulso={g >= 3} />
        <Placa icono={<TrophyIcon size={16} />} valor={`${oe}/${Ne}`} etiqueta="Palabras · 词" tono="jade" />
        <Placa icono={<CrownIcon size={16} />} valor={level} etiqueta="Nivel · 级" tono="tinta" />
        <button type="button" className="rl-accion" onClick={() => { playClick(); setC("select"); }} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
      </BarraJuego>

      <div className="rl-avisos" aria-live="polite">
        {B && h >= 3 && (
          <p className="rl-aviso rl-aviso--racha">
            <FlameIcon size={30} /> ¡Racha x{h}!
          </p>
        )}
        {ze && fe > 1 && (
          <p className="rl-aviso rl-aviso--multi">
            <TargetIcon size={28} /> ¡Puntos x{fe}!
          </p>
        )}
        {pe && <p className="rl-aviso rl-aviso--bien">{pe} · 很好</p>}
      </div>

      <div className="rl-tablero">
        <div className="rl-lado">
          <Rueda3D words={words} onSelect={onSelect} onSpin={onSpin} compacta={enJuego} />
          {!enJuego && (
            <p className="rl-ayuda">
              {words.length > 0 ? "Toca la ruleta para girar · 点击轮盘转动" : "¡Todas las palabras completadas! · 所有单词已完成"}
            </p>
          )}
        </div>

        <div className="rl-panel">
          <span className="rl-panel__clavo rl-panel__clavo--i" aria-hidden="true" />
          <span className="rl-panel__clavo rl-panel__clavo--d" aria-hidden="true" />
          <p className="rl-panel__etiqueta">
            <SparklesIcon size={16} /> {l ? "¿Cómo se escribe en español? · 西班牙语怎么拼？" : "Adivina la palabra · 猜单词"}
          </p>
          <p key={l?.word || "vacio"} className={`rl-pista ${l ? "" : "rl-pista--vacia"} ${de ? "rl-pista--sale" : ""}`}>
            {l ? l.hintCn : "转"}
          </p>
          {l ? (
            <div className="rl-casillas" style={{ "--n": l.word.length }}>
              {l.word.split("").map((letra, n) => {
                const visible = w.has(letra) || M.has(l.word);
                return (
                  <span key={`${l.word}-${n}`} className={`rl-casilla ${visible ? "rl-casilla--vista" : ""}`} style={{ "--i": n }}>
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
              <i style={{ width: `${tiempoPct}%` }} />
            </span>
            <b>{$}s</b>
          </div>
          <div className="rl-teclado">
            {_e.map((fila) => (
              <div key={fila} className="rl-teclado__fila">
                {fila.split("").map((tecla) => {
                  const usada = w.has(tecla);
                  const acierto = usada && !!l?.word.includes(tecla);
                  return (
                    <button
                      key={tecla}
                      type="button"
                      className={`rl-tecla ${usada ? (acierto ? "rl-tecla--bien" : "rl-tecla--mal") : ""}`}
                      onClick={() => ne(tecla)}
                      disabled={!enJuego || usada}
                    >
                      {tecla}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="rl-mensaje" aria-live="polite">{F}</p>
        </div>
      </div>
    </Escena3D>
  );
}
export { YtComponent as default };
