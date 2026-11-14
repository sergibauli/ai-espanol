import {
  SparklesIcon,
  TrophyIcon,
  ZapIcon,
  LightbulbIcon,
  HeartIcon,
  XIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  LayersIcon,
  RotateCcwIcon,
  ClockIcon,
  MoonIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g, a } from "../../lib/juegos-utils.js";
import { SelectorTemaJuego, CintaTemaJuego } from "../../components/juegos/SelectorTemaJuego.jsx";
import { useSound } from "../../lib/sound.jsx";
import { Escena3D, BarraJuego, Placa, Boton3D, Resultado3D } from "../../components/juegos/Escena3D.jsx";
import "../../styles/v17-ruleta.css";
import "../../styles/v17-ahorcado.css";
const Ye = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];
const maxTime = 90;
const Fe = 6;
function De(espanol) {
  return espanol
    .toLocaleUpperCase("es-ES")
    .replace(/Ñ/g, "\0")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0000/g, "Ñ")
    .replace(/[^A-ZÑ]/g, "");
}
function Ze(word) {
  return /^[A-ZÑ]+$/i.test(word) && word.length >= 2 && word.length <= 14;
}
function OeComponent({ active }) {
  const fRef = React.useRef(null);
  const iRef = React.useRef([]);
  const cRef = React.useRef(false);
  const aRef = React.useRef(null);
  React.useEffect(() => {
    cRef.current = active;
  }, [active]);
  React.useEffect(() => {
    const fRef_current = fRef.current;
    if (!fRef_current) {
      return;
    }
    const s = fRef_current.getContext("2d");
    if (!s) {
      return;
    }
    let d;
    const g = () => {
      const u = Math.min(window.devicePixelRatio || 1, 1.5);
      fRef_current.width = window.innerWidth * u;
      fRef_current.height = window.innerHeight * u;
      fRef_current.style.width = `${window.innerWidth}px`;
      fRef_current.style.height = `${window.innerHeight}px`;
      s.setTransform(u, 0, 0, u, 0, 0);
    };
    const x = () => {
      const iRef_current = iRef.current;
      if (!cRef.current && iRef_current.length === 0) {
        d = 0;
        return;
      }
      if (document.hidden) {
        d = requestAnimationFrame(x);
        return;
      }
      s.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let p = iRef_current.length - 1; p >= 0; p--) {
        const n = iRef_current[p];
        n.x += n.vx;
        n.y += n.vy;
        n.vy += n.gravity;
        n.vx *= 0.99;
        n.rotation += n.rotSpeed;
        n.life -= n.decay;
        if (n.life <= 0 || n.y > window.innerHeight + 50) {
          iRef_current.splice(p, 1);
          continue;
        }
        s.save();
        s.translate(n.x, n.y);
        s.rotate((n.rotation * Math.PI) / 180);
        s.globalAlpha = n.life * n.a;
        s.fillStyle = n.c;
        s.shadowBlur = 8;
        s.shadowColor = n.c;
        if (n.shape === "circle") {
          s.beginPath();
          s.arc(0, 0, n.r, 0, Math.PI * 2);
          s.fill();
        } else if (n.shape === "square") {
          s.fillRect(-n.r / 2, -n.r / 2, n.r, n.r);
        } else {
          s.beginPath();
          s.moveTo(0, -n.r);
          s.lineTo(n.r * 0.866, n.r * 0.5);
          s.lineTo(-n.r * 0.866, n.r * 0.5);
          s.closePath();
          s.fill();
        }
        s.restore();
      }
      d = requestAnimationFrame(x);
    };
    aRef.current = x;
    g();
    window.addEventListener("resize", g);
    x();
    return () => {
      cancelAnimationFrame(d);
      window.removeEventListener("resize", g);
    };
  }, []);
  React.useEffect(() => {
    const l = [];
    if (active) {
      aRef.current?.();
      for (let s = 0; s < 2; s++) {
        l.push(
          window.setTimeout(() => {
            const iRef_current = iRef.current;
            const g = ["#e0283f", "#f2c14e", "#f2c14e", "#5fd08a", "#d99a22", "#a50f25"];
            for (let x = 0; x < 70; x++) {
              const u = Math.random() * Math.PI * 2;
              const p = 3 + Math.random() * 15;
              iRef_current.push({
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
                y: window.innerHeight / 2 - 100 + (Math.random() - 0.5) * 50,
                vx: Math.cos(u) * p,
                vy: Math.sin(u) * p - 8,
                r: 4 + Math.random() * 10,
                a: 1,
                c: g[Math.floor(Math.random() * g.length)],
                life: 1,
                decay: 0.002 + Math.random() * 0.004,
                gravity: 0.06 + Math.random() * 0.1,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 25,
                shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
              });
            }
          }, s * 260),
        );
      }
    }
    return () => l.forEach((s) => clearTimeout(s));
  }, [active]);
  return (
    <canvas
      ref={fRef}
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
// v17 · Pórtico en 3D con seis faroles: cada fallo apaga uno; si se apagan todos, se pierde.
const AH_SELLOS = ["加", "油", "好", "运", "常", "在"];
function Portico3D({ fallos, estado }) {
  return (
    <div className={`ah-portico ah-portico--${estado}`} role="img" aria-label={`Faroles encendidos: ${Math.max(0, Fe - fallos)} de ${Fe} · 剩余灯笼`}>
      <div className="ah-portico__plano" translate="no">
        <div className="ah-tejado">
          <span className="ah-tejado__ala" />
          <span className="ah-tejado__viga" />
          <span className="ah-tejado__placa">猜词</span>
        </div>
        <span className="ah-pilar ah-pilar--i" />
        <span className="ah-pilar ah-pilar--d" />
        <div className="ah-faroles">
          {AH_SELLOS.map((sello, n) => {
            const apagado = n >= Fe - fallos;
            return (
              <div key={sello} className={`ah-farol ${apagado ? "ah-farol--apagado" : ""}`} style={{ "--i": n }}>
                <span className="ah-farol__cuerda" />
                <span className="ah-farol__cuerpo">
                  <b>{sello}</b>
                </span>
                <span className="ah-farol__borla" />
                {apagado && <span className="ah-farol__humo" />}
              </div>
            );
          })}
        </div>
        <span className="ah-escalon" />
      </div>
    </div>
  );
}
function OtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [l, setL] = React.useState("select");
  const [d, setD] = React.useState([]);
  const [x, setX] = React.useState({
    word: "",
    hint: "",
    category: "Vocabulario",
  });
  const [p, setP] = React.useState(new Set());
  const [j, setJ] = React.useState(0);
  const [W, setW] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [F, setF] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("ahorcado_best") || "0");
    } catch {
      return 0;
    }
  });
  const [w, setW_1] = React.useState("playing");
  const [q, setQ] = React.useState("");
  const [ge, setGe] = React.useState(new Set());
  const [be, setBe] = React.useState(false);
  const [D, setD_1] = React.useState([]);
  const [B, setB_1] = React.useState(false);
  const [ye, setYe] = React.useState(true);
  const [R, setR] = React.useState("idle");
  const [te, setTe] = React.useState(0);
  const [H, setH] = React.useState(maxTime);
  const [se, setSe] = React.useState(Date.now());
  const [Ke, setKe] = React.useState(false);
  const VRef = React.useRef(null);
  React.useRef(0);
  const XRef = React.useRef(null);
  const length = Fe;
  const A = x.word.split("");
  const oe = l === "playing" && A.length > 0 && A.every((r) => p.has(r));
  const we = g();
  const [ae, setAe] = React.useState("");
  React.useEffect(() => {
    if (!(w !== "playing" || l !== "playing")) {
      XRef.current = window.setInterval(() => {
        setH((r) => Math.max(0, r - 1));
      }, 1000);
      return () => {
        if (XRef.current) {
          clearInterval(XRef.current);
        }
      };
    }
  }, [w, l]);
  React.useEffect(() => {
    if (D.length === 0) {
      return;
    }
    const r = setTimeout(() => setD_1([]), 1400);
    return () => clearTimeout(r);
  }, [D.length]);
  React.useEffect(() => {
    if (!(l !== "playing" || w !== "playing" || H > 0)) {
      setQ("Tiempo agotado / 时间到");
      setJ(length);
    }
  }, [l, w, H, length]);
  React.useEffect(() => {
    if (R === "happy" || R === "sad" || R === "worried") {
      const r = setTimeout(() => setR("idle"), 1800);
      return () => clearTimeout(r);
    }
  }, [R]);
  React.useEffect(() => {
    if (B) {
      const r = setTimeout(() => setB_1(false), 400);
      return () => clearTimeout(r);
    }
  }, [B]);
  const ne = React.useCallback(
    (r) => {
      playClick();
      let m = r ? a(r) : a();
      if (m.length === 0) {
        setAe(
          'Este modulo no tiene palabras validas para este juego. Prueba con otro modulo o selecciona "Todos los modulos".',
        );
        return;
      }
      const h = m
        .filter((y) => y.espanol && y.chino)
        .map((y) => ({
          word: De(y.espanol),
          hint: y.chino,
          category: "Vocabulario",
        }))
        .filter((y) => Ze(y.word));
      const T = new Set();
      const C = [];
      for (const y of h) {
        if (!T.has(y.word)) {
          T.add(y.word);
          C.push(y);
        }
      }
      const v =
        C.length > 0
          ? C
          : [
              {
                word: "HOLA",
                hint: "你好",
                category: "Vocabulario",
              },
            ];
      setD(v);
      setL("playing");
      setGe(new Set());
      setW(0);
      setB(0);
      setP(new Set());
      setJ(0);
      setW_1("playing");
      setQ("");
      setD_1([]);
      setR("idle");
      setTe(0);
      setH(maxTime);
      setSe(Date.now());
      setX(v[Math.floor(Math.random() * v.length)]);
    },
    [playClick],
  );
  React.useEffect(() => {
    if (oe && w === "playing") {
      setW_1("won");
      const r = (Date.now() - se) / 1000;
      const m = Math.max(0, Math.floor((maxTime - r) * 3));
      const h = te * 5;
      const C = Math.max(100 - j * 10, 10) + m + h;
      setW((v) => v + C);
      setB((v) => {
        const y = v + 1;
        setF((le) => {
          const ie = Math.max(le, y);
          localStorage.setItem("ahorcado_best", String(ie));
          return ie;
        });
        return y;
      });
      setTe(0);
      playWin();
      setR("excited");
      setBe(true);
      if (VRef.current) {
        const v = VRef.current.getBoundingClientRect();
        setD_1((y) => [
          ...y,
          {
            id: Date.now() + Math.random(),
            x: v.width / 2 - 30,
            y: v.height / 2 - 40,
            text: `+${C}`,
            color: "#5fd08a",
            life: 2,
            scale: 1.5,
          },
        ]);
      }
    }
  }, [oe, w, j, playWin, te, se]);
  React.useEffect(() => {
    if (j >= length && w === "playing") {
      setW_1("lost");
      setB(0);
      setTe(0);
      setR("sad");
      playLose();
      setBe(true);
    }
  }, [j, w, playLose, length]);
  const Q = React.useCallback(
    (r) => {
      if (w !== "playing" || p.has(r)) {
        return;
      }
      const m = new Set(p);
      m.add(r);
      setP(m);
      if (x.word.includes(r)) {
        playCorrect();
        setTe((h) => h + 1);
        setR("happy");
      } else {
        setJ((h) => h + 1);
        setTe(0);
        playWrong();
        setR("worried");
        setB_1(true);
      }
    },
    [w, p, x, playCorrect, playWrong],
  );
  React.useEffect(() => {
    const r = (m) => {
      const h = m.key.toUpperCase();
      if (/^[A-ZÑ]$/u.test(h)) {
        Q(h);
      }
    };
    window.addEventListener("keydown", r);
    return () => window.removeEventListener("keydown", r);
  }, [Q]);
  const je = () => {
    playClick();
    setKe(true);
    setTimeout(() => {
      const r = d.filter((h) => !ge.has(h.word) && h.word !== x.word);
      const m =
        r.length > 0 ? r[Math.floor(Math.random() * r.length)] : d[Math.floor(Math.random() * d.length)];
      setX(m);
      setP(new Set());
      setJ(0);
      setW_1("playing");
      setQ("");
      setYe(true);
      setBe(false);
      setR("idle");
      setTe(0);
      setH(maxTime);
      setSe(Date.now());
      setGe((h) => new Set(h).add(x.word));
      setKe(false);
    }, 600);
  };
  const ke = () => {
    playClick();
    setP(new Set());
    setJ(0);
    setW_1("playing");
    setQ("");
    setYe(true);
    setBe(false);
    setR("idle");
    setTe(0);
    setH(maxTime);
    setSe(Date.now());
  };
  if (l === "select") {
    return (
      <>
        <SelectorTemaJuego juego="ahorcado" error={ae} onIniciar={(id) => { setAe(""); ne(id); }} />
      </>
    );
  }
  const gano = w === "won";
  const restantes = Math.max(0, length - j);
  const tiempoPct = Math.max(0, Math.min(100, (H / maxTime) * 100));
  if (be) {
    return (
      <Escena3D tema="ahorcado">
        <CintaTemaJuego />
        <OeComponent active={gano} />
        <BarraJuego titulo="Ahorcado" tituloZh="猜词游戏" />
        <Resultado3D
          gano={gano}
          sello="猜"
          estrellas={gano ? (j === 0 ? 3 : j <= 2 ? 2 : 1) : 0}
          titulo={gano ? "¡Correcto!" : "¡Casi!"}
          tituloZh={gano ? "答对了" : q || "再试一次"}
          datos={[
            { etiqueta: "Puntos · 得分", valor: W, tono: "rojo" },
            { etiqueta: "Racha · 连胜", valor: b, tono: "jade" },
            { etiqueta: "Récord · 最佳", valor: F, tono: "oro" },
          ]}
          acciones={
            <>
              <Boton3D tono="oro" onClick={je}>
                <SparklesIcon size={18} /> Siguiente · 下一个
              </Boton3D>
              <Boton3D tono="tinta" onClick={ke}>
                <RotateCcwIcon size={18} /> Reintentar · 重试
              </Boton3D>
            </>
          }
        >
          <div className="ah-solucion">
            <i>{gano ? "Palabra · 单词" : "La palabra era · 正确答案"}</i>
            <b>{x.word}</b>
            <span>{x.hint}</span>
          </div>
        </Resultado3D>
        <P currentGameId="ahorcado" />
      </Escena3D>
    );
  }
  return (
    <Escena3D tema="ahorcado" className={`ah ${B ? "rl--temblor" : ""}`}>
      <CintaTemaJuego />
      <BarraJuego titulo="Ahorcado" tituloZh="猜词游戏" alVolver={() => playClick()}>
        <Placa icono={<ZapIcon size={16} />} valor={W} etiqueta="Puntos · 分" />
        <Placa icono={<TrophyIcon size={16} />} valor={b} etiqueta="Racha · 连胜" tono="jade" />
        <Placa icono={<HeartIcon size={16} />} valor={`${restantes}/${length}`} etiqueta="Faroles · 灯笼" tono="rojo" pulso={restantes <= 2} />
        <button type="button" className="rl-accion" onClick={() => { playClick(); setL("select"); }} title="Cambiar unidad · 切换单元" aria-label="Cambiar unidad · 切换单元">
          <LayersIcon size={18} />
        </button>
      </BarraJuego>

      <div className="rl-tablero ah-tablero" ref={VRef}>
        <div className="rl-lado">
          <Portico3D fallos={j} estado={w} />
          <p className="rl-ayuda ah-ayuda">
            {restantes > 0 ? `Cada fallo apaga un farol · 每错一次灭一盏灯 (${restantes})` : "Se apagaron todos · 灯笼全灭了"}
          </p>
        </div>

        <div className="rl-panel">
          <span className="rl-panel__clavo rl-panel__clavo--i" aria-hidden="true" />
          <span className="rl-panel__clavo rl-panel__clavo--d" aria-hidden="true" />
          <p className="rl-panel__etiqueta">
            <LightbulbIcon size={16} /> Pista · 提示 — {A.length} letras · {A.length} 个字母
          </p>
          <p key={x.word} className={`rl-pista ${Ke ? "rl-pista--sale" : ""}`}>
            {x.hint}
          </p>
          <div className={`rl-casillas ${A.length > 9 ? "rl-casillas--larga" : ""}`} style={{ "--n": A.length }}>
            {A.map((letra, n) => {
              const visible = p.has(letra) || w === "lost";
              return (
                <span key={`${x.word}-${n}`} className={`rl-casilla ${visible ? "rl-casilla--vista" : ""} ${w === "lost" && !p.has(letra) ? "rl-casilla--perdida" : ""}`} style={{ "--i": n }}>
                  <i>?</i>
                  <b>{visible ? letra : ""}</b>
                </span>
              );
            })}
          </div>
          <div className={`rl-tiempo ${tiempoPct < 25 ? "rl-tiempo--poco" : ""}`}>
            <ClockIcon size={15} />
            <span>
              <i style={{ width: `${tiempoPct}%` }} />
            </span>
            <b>{H}s</b>
          </div>
          <div className="rl-teclado">
            {Ye.map((fila) => (
              <div key={fila} className="rl-teclado__fila">
                {fila.split("").map((tecla) => {
                  const usada = p.has(tecla);
                  const acierto = usada && x.word.includes(tecla);
                  return (
                    <button
                      key={tecla}
                      type="button"
                      className={`rl-tecla ${usada ? (acierto ? "rl-tecla--bien" : "rl-tecla--mal") : ""}`}
                      onClick={() => Q(tecla)}
                      disabled={w !== "playing" || usada}
                    >
                      {tecla}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="rl-mensaje" aria-live="polite">{q}</p>
        </div>
      </div>
    </Escena3D>
  );
}
export { OtComponent as default };
