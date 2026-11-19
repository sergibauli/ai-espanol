// El viaje del Rey Mono · 美猴王之旅 — juego de recorrido (oca + parchís): para tirar el dado hay que acertar una pregunta de la unidad.
import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeftIcon, HelpCircleIcon, Volume2Icon, VolumeXIcon, LayersIcon, PlayIcon, RotateCcwIcon, XIcon, CheckIcon, UsersIcon, BotIcon, LoaderCircleIcon, ShieldIcon } from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { useModalAccesible } from "../../lib/useModalAccesible.js";
import { contenidoJuego } from "../../lib/contenidoJuego.js";
import CATALOGO from "../../data/modulos/catalog.json";
import { ElegirUnidadJuego } from "../../components/juegos/ElegirUnidadJuego.jsx";
import { chispasOro } from "./ja-comun.jsx";
import { sinAcentos, usePrefiereMenosMovimiento, leerNumero, guardarNumero } from "./jbComun.jsx";
import { META, ESPECIALES, NUBES, REGLAS_CASILLAS, ETIQUETA, centroDe, crearPreguntas, crearMazoPreguntas, esSegura, recorrido } from "./viajeLogica.js";
import { TableroViaje, Dado, GIRO_CARA } from "./ViajeMonoTablero.jsx";
import "../../styles/v25-viaje-mono.css";

const BASE = import.meta.env.BASE_URL || "./";
const PLUS = import.meta.glob("../../data/plus/*.json", { import: "default" });

const FICHAS = [
  { color: "jade", es: "Jade", zh: "玉" },
  { color: "oro", es: "Oro", zh: "金" },
  { color: "laca", es: "Laca", zh: "漆" },
  { color: "lapis", es: "Lapislázuli", zh: "青金" },
];

const MOTIVO = {
  tirar: { es: "Acierta para tirar el dado", zh: "答对才能掷骰子" },
  pozo: { es: "Estás en el pozo: acierta para salir", zh: "你在井里：答对才能出来" },
  linterna: { es: "Linterna: acierta otra y tiras otra vez", zh: "灯笼：再答对一题就再掷一次" },
  laberinto: { es: "Laberinto: acierta para encontrar la salida", zh: "迷宫：答对才能找到出口" },
};

export default function ViajeMonoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const numero = Number(new URLSearchParams(location.search).get("m")) || null;
  const contenido = React.useMemo(() => {
    const datos = numero ? contenidoJuego(numero) : null;
    return datos ? { ...datos, nivel: datos.nivel || CATALOGO.find((u) => u.numero === datos.numero)?.nivel || "" } : null;
  }, [numero]);
  if (!contenido)
    return (
      <ElegirUnidadJuego
        juego={{
          titulo: "El viaje del Rey Mono",
          tituloZh: "美猴王之旅",
          sello: "旅",
          desc: "Tablero de recorrido: acierta una pregunta de la unidad para tirar el dado y llega al Templo del Oeste · 答对本单元的题才能掷骰子，一路走到西天",
        }}
        onElegir={(n) => navigate(`${location.pathname}?m=${n}`)}
      />
    );
  return <JuegoViaje key={contenido.numero} contenido={contenido} />;
}

// ---------- Partida ----------
function JuegoViaje({ contenido }) {
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playLose, playClick, playSpell } = useSound();
  const reducido = usePrefiereMenosMovimiento();
  const [grupos, setGrupos] = React.useState(null);
  const [pantalla, setPantalla] = React.useState("intro");
  const [ayuda, setAyuda] = React.useState(false);
  const [, setTick] = React.useState(0);
  const pintar = React.useCallback(() => setTick((t) => t + 1), []);
  const st = React.useRef(null);
  const partida = React.useRef(0);
  const vivo = React.useRef(true);
  const reducidoRef = React.useRef(reducido);
  reducidoRef.current = reducido;
  const tableroRef = React.useRef(null);
  const clicDado = React.useRef(null);
  const sonido = React.useRef({});
  sonido.current = { playCorrect, playWrong, playWin, playLose, playClick, playSpell };

  React.useEffect(() => {
    vivo.current = true;
    return () => {
      vivo.current = false;
    };
  }, []);

  // Preguntas: unidad + banco «plus» (lectura, errores, huecos)
  React.useEffect(() => {
    let cancelado = false;
    const cargar = PLUS[`../../data/plus/modulo-${contenido.numero}.json`];
    (cargar ? cargar().catch(() => null) : Promise.resolve(null)).then((plus) => {
      if (!cancelado) setGrupos(crearPreguntas(contenido, plus));
    });
    return () => {
      cancelado = true;
    };
  }, [contenido]);

  const esperar = (ms, id) =>
    new Promise((ok, mal) =>
      setTimeout(() => (vivo.current && id === partida.current ? ok() : mal(new Error("fin"))), reducidoRef.current ? Math.min(ms, 450) : ms),
    );

  const registrar = (j, es, zh) => {
    const s = st.current;
    s.registro = [{ k: Date.now() + Math.random(), color: j?.color, es, zh }, ...s.registro].slice(0, 6);
  };

  const avisar = async (id, aviso, ms = 1500) => {
    st.current.aviso = { ...aviso, k: Date.now() };
    pintar();
    if (aviso.chispas && tableroRef.current) {
      const r = tableroRef.current.getBoundingClientRect();
      chispasOro(r.left + r.width / 2, r.top + r.height / 2, 34);
    }
    await esperar(ms, id);
    st.current.aviso = null;
    pintar();
  };

  // ----- Preguntas -----
  const preguntar = async (id, j, motivo) => {
    const s = st.current;
    if (j.cpu) {
      s.pensando = { motivo };
      pintar();
      await esperar(1100, id);
      const ok = Math.random() < 0.68;
      s.pensando = { motivo, ok };
      if (ok) j.aciertos++;
      else j.fallos++;
      pintar();
      await esperar(900, id);
      s.pensando = null;
      return ok;
    }
    const p = s.mazo.siguiente();
    if (!p) return true;
    return new Promise((resolver) => {
      s.pregunta = { p, jugador: j, motivo, elegida: null, resolver: (ok) => (id === partida.current ? resolver(ok) : null) };
      pintar();
      if (p.escuchar) setTimeout(() => speak(p.audio, 0.85), 450);
    });
  };

  const responder = (opcion) => {
    const q = st.current.pregunta;
    if (!q || q.elegida != null) return;
    q.elegida = opcion;
    q.ok = sinAcentos(opcion) === sinAcentos(q.p.correcta);
    if (q.ok) {
      q.jugador.aciertos++;
      sonido.current.playCorrect?.();
      if (q.p.audio) speak(q.p.audio, 0.9);
    } else {
      q.jugador.fallos++;
      sonido.current.playWrong?.();
    }
    pintar();
  };

  const cerrarPregunta = () => {
    const q = st.current.pregunta;
    if (!q || q.elegida == null) return;
    st.current.pregunta = null;
    pintar();
    q.resolver(q.ok);
  };

  // ----- Dado -----
  const tirarDado = async (id, j) => {
    const s = st.current;
    if (!j.cpu) {
      s.dado.activo = true;
      s.mensaje = { es: `${j.nombre}: ¡toca el dado para tirar!`, zh: "点击骰子掷骰！" };
      pintar();
      await new Promise((ok) => {
        clicDado.current = ok;
      });
      clicDado.current = null;
      if (id !== partida.current) throw new Error("fin");
    } else {
      await esperar(350, id);
    }
    const valor = 1 + Math.floor(Math.random() * 6);
    s.dado.activo = false;
    s.dado.vueltas += 2;
    const [x, y] = GIRO_CARA[valor];
    s.dado.giro = [s.dado.vueltas * 360 + x, s.dado.vueltas * 360 + y];
    s.dado.girando = true;
    s.dado.valor = null;
    sonido.current.playSpell?.();
    pintar();
    await esperar(1150, id);
    s.dado.girando = false;
    s.dado.valor = valor;
    pintar();
    await esperar(300, id);
    return valor;
  };

  // ----- Movimiento -----
  const caminar = async (id, j, camino, ms = 290) => {
    const s = st.current;
    for (const p of camino) {
      j.pos = p;
      j.salto = (j.salto || 0) + 1;
      s.luces = [...s.luces.slice(-5), p];
      sonido.current.playClick?.();
      pintar();
      await esperar(ms, id);
    }
  };

  const volar = async (id, j, destino) => {
    j.vuelo = true;
    j.pos = destino;
    j.salto = (j.salto || 0) + 1;
    st.current.luces = [destino];
    pintar();
    await esperar(850, id);
    j.vuelo = false;
    pintar();
  };

  const retroceder = async (id, j, destino) => {
    const camino = [];
    for (let p = j.pos - 1; p >= destino; p--) camino.push(p);
    await caminar(id, j, camino, 170);
  };

  /** Efecto de la casilla donde cae `j`. Devuelve true si vuelve a jugar. */
  const resolverCasilla = async (id, j) => {
    const s = st.current;
    if (j.pos === META) return false;
    // Parchís: si caes donde hay otra ficha fuera de casilla segura, la adelantas y retrocede 4
    if (!esSegura(j.pos)) {
      for (const otro of s.jugadores) {
        if (otro === j || otro.pos !== j.pos) continue;
        const atras = Math.max(0, otro.pos - 4);
        registrar(j, `${j.nombre} adelanta a ${otro.nombre}: retrocede a la ${atras}`, `超过对手，对手退到${atras}号`);
        await avisar(id, { sello: "超", tipo: "captura", es: `¡Adelantas a ${otro.nombre}! Retrocede 4 casillas`, zh: "超过对手！对手后退4格" }, 1300);
        await retroceder(id, otro, atras);
      }
    }
    const esp = ESPECIALES[j.pos];
    if (!esp) return false;
    s.destino = j.pos;
    pintar();
    switch (esp.tipo) {
      case "nube": {
        const siguiente = NUBES.find((n) => n > j.pos);
        sonido.current.playSpell?.();
        if (siguiente) {
          await avisar(id, { sello: "云", tipo: "nube", es: "¡De nube en nube! Vuela y vuelve a jugar", zh: "筋斗云！飞到下一朵云，再玩一次", chispas: true }, 1300);
          await volar(id, j, siguiente);
          registrar(j, `${j.nombre} vuela en la nube a la ${siguiente}`, `乘筋斗云飞到${siguiente}号`);
        } else {
          await avisar(id, { sello: "云", tipo: "nube", es: "Nube voladora: ¡vuelve a jugar!", zh: "筋斗云：再玩一次！", chispas: true }, 1300);
        }
        return true;
      }
      case "puente":
        if (esp.fin) return false;
        sonido.current.playSpell?.();
        await avisar(id, { sello: "桥", tipo: "puente", es: "¡De puente a puente! Cruzas al 12 y vuelves a jugar", zh: "过仙桥！到12号，再玩一次", chispas: true }, 1400);
        await volar(id, j, esp.destino);
        registrar(j, `${j.nombre} cruza el puente`, "过桥");
        return true;
      case "linterna": {
        await avisar(id, { sello: "灯", tipo: "linterna", es: "¡Linterna! Acierta otra pregunta y tiras otra vez", zh: "灯笼！再答对一题就再掷一次" }, 1300);
        const ok = await preguntar(id, j, "linterna");
        if (ok) {
          await avisar(id, { sello: "灯", tipo: "linterna", es: "¡Doble acierto! Vuelves a tirar", zh: "连对两题！再掷一次", chispas: true }, 1100);
          registrar(j, `${j.nombre}: doble acierto en la linterna`, "灯笼连对");
          return "dado";
        }
        registrar(j, `${j.nombre} falla en la linterna`, "灯笼答错");
        return false;
      }
      case "pozo":
        j.pozo = true;
        sonido.current.playLose?.();
        await avisar(id, { sello: "井", tipo: "pozo", es: "¡Al pozo! Necesitarás una pregunta extra para salir", zh: "掉进井里！下回合要多答一题才能出来" }, 1600);
        registrar(j, `${j.nombre} cae en el pozo`, "掉进井里");
        return false;
      case "laberinto": {
        await avisar(id, { sello: "迷", tipo: "laberinto", es: "¡Laberinto! Acierta para encontrar la salida", zh: "迷宫！答对才能找到出口" }, 1300);
        const ok = await preguntar(id, j, "laberinto");
        if (ok) {
          registrar(j, `${j.nombre} sale del laberinto`, "走出迷宫");
          return false;
        }
        await avisar(id, { sello: "迷", tipo: "laberinto", es: `Te pierdes… vuelves a la ${esp.destino}`, zh: `迷路了……退回${esp.destino}号` }, 1200);
        await retroceder(id, j, esp.destino);
        registrar(j, `${j.nombre} se pierde en el laberinto`, "在迷宫迷路");
        return false;
      }
      case "dragon":
        if (j.escudo) {
          j.escudo = false;
          await avisar(id, { sello: "桃", tipo: "melocoton", es: "¡El melocotón de la inmortalidad te protege del dragón!", zh: "蟠桃保护了你，恶龙伤不到你！", chispas: true }, 1600);
          registrar(j, `${j.nombre} se salva del dragón`, "蟠桃护身");
          return false;
        }
        sonido.current.playWrong?.();
        await avisar(id, { sello: "龙", tipo: "dragon", es: `¡El dragón te sopla hacia atrás! Vuelves a la ${esp.destino}`, zh: `恶龙把你吹回${esp.destino}号！` }, 1500);
        await retroceder(id, j, esp.destino);
        registrar(j, `${j.nombre}: el dragón lo devuelve a la ${esp.destino}`, `被恶龙吹回${esp.destino}号`);
        return false;
      case "melocoton":
        j.escudo = true;
        sonido.current.playCorrect?.();
        await avisar(id, { sello: "桃", tipo: "melocoton", es: "¡Melocotón de la inmortalidad! Te protege del próximo dragón", zh: "蟠桃！能保护你躲过下一条恶龙", chispas: true }, 1500);
        registrar(j, `${j.nombre} coge un melocotón`, "得到蟠桃");
        return false;
      case "pagoda":
        await avisar(id, { sello: "塔", tipo: "pagoda", es: "Pagoda: casilla segura", zh: "宝塔：安全格" }, 900);
        return false;
      default:
        return false;
    }
  };

  /** Un turno completo; devuelve true si el jugador vuelve a jugar */
  const jugarTurno = async (id, j) => {
    const s = st.current;
    s.mensaje = { es: j.cpu ? "El Rey Mono piensa su respuesta…" : `Turno de ${j.nombre}: responde la pregunta`, zh: j.cpu ? "美猴王正在思考……" : "轮到你：先回答问题" };
    pintar();
    if (j.pozo) {
      const ok = await preguntar(id, j, "pozo");
      if (!ok) {
        registrar(j, `${j.nombre} sigue en el pozo`, "还在井里");
        await avisar(id, { sello: "井", tipo: "pozo", es: `${j.nombre} sigue en el pozo`, zh: "还在井里，下回合再试" }, 1100);
        return false;
      }
      j.pozo = false;
      await avisar(id, { sello: "井", tipo: "pozo", es: `¡${j.nombre} sale del pozo!`, zh: "出井了！", chispas: true }, 1100);
    }
    let ok = await preguntar(id, j, "tirar");
    while (true) {
      if (!ok) {
        registrar(j, `${j.nombre} falla y no tira`, "答错，不能掷骰子");
        if (j.cpu) await avisar(id, { sello: "错", tipo: "fallo", es: "El Rey Mono falla: pierde el turno", zh: "美猴王答错了，失去这一回合" }, 1100);
        return false;
      }
      const valor = await tirarDado(id, j);
      registrar(j, `${j.nombre} saca un ${valor}`, `掷出${valor}点`);
      const antes = j.pos;
      await caminar(id, j, recorrido(j.pos, valor));
      if (antes + valor > META) await avisar(id, { sello: "回", tipo: "rebote", es: "Rebotas: hay que llegar justo a la meta", zh: "超过终点要反弹：必须正好走到终点" }, 1100);
      if (j.pos === META) {
        s.ganador = j;
        return false;
      }
      const extra = await resolverCasilla(id, j);
      s.destino = null;
      if (extra === "dado") {
        ok = true;
        continue;
      }
      return !!extra;
    }
  };

  const bucle = async (id) => {
    try {
      const s = st.current;
      while (!s.ganador) {
        const j = s.jugadores[s.turno];
        const otra = await jugarTurno(id, j);
        if (s.ganador) break;
        if (otra) {
          s.mensaje = { es: `¡${j.nombre} vuelve a jugar!`, zh: "再玩一次！" };
        } else {
          s.turno = (s.turno + 1) % s.jugadores.length;
        }
        s.luces = [];
        pintar();
        await esperar(450, id);
      }
      await esperar(500, id);
      terminar();
    } catch {
      /* partida cancelada */
    }
  };

  const terminar = () => {
    const s = st.current;
    const g = s.ganador;
    const humanos = s.jugadores.filter((j) => !j.cpu);
    const aciertos = humanos.reduce((a, j) => a + j.aciertos, 0);
    const fallos = humanos.reduce((a, j) => a + j.fallos, 0);
    const ganaHumano = !g.cpu;
    const xp = Math.max(5, aciertos * 2 + (ganaHumano ? 25 : 8));
    let premio = null;
    try {
      premio = addXp(xp);
    } catch {}
    const clave = `dele_viaje_record_${contenido.numero}`;
    const record = leerNumero(clave);
    const nuevoRecord = ganaHumano && s.modo === "mono" && aciertos > record;
    if (nuevoRecord) guardarNumero(clave, aciertos);
    s.mensaje = { es: `¡${g.nombre} llega a la meta!`, zh: "到达终点！" };
    s.final = { ganador: g, aciertos, fallos, xp, nuevoRecord, subeNivel: premio?.levelUp, contra: s.modo === "mono" };
    setPantalla("fin");
    if (ganaHumano) {
      sonido.current.playWin?.();
      speak("¡Enhorabuena! Has llegado al Templo del Oeste.", 0.95);
      chispasOro(innerWidth / 2, innerHeight * 0.3, 70);
      setTimeout(() => chispasOro(innerWidth * 0.25, innerHeight * 0.45, 40), 350);
      setTimeout(() => chispasOro(innerWidth * 0.75, innerHeight * 0.45, 40), 700);
    } else {
      sonido.current.playLose?.();
      speak("¡El Rey Mono llega primero! Otra vez será.", 0.95);
    }
  };

  const empezar = (config) => {
    if (!grupos) return;
    partida.current += 1;
    const id = partida.current;
    const jugadores =
      config.modo === "mono"
        ? [
            { id: 0, nombre: config.nombres[0] || "Tú", nombreZh: "你", color: "jade", cpu: false },
            { id: 1, nombre: "Rey Mono", nombreZh: "美猴王", color: "oro", cpu: true },
          ]
        : FICHAS.slice(0, config.cuantos).map((f, i) => ({ id: i, nombre: config.nombres[i] || `Jugador ${i + 1}`, nombreZh: `玩家${i + 1}`, color: f.color, cpu: false }));
    st.current = {
      modo: config.modo,
      jugadores: jugadores.map((j) => ({ ...j, pos: 0, escudo: false, pozo: false, aciertos: 0, fallos: 0, salto: 0 })),
      turno: 0,
      mazo: crearMazoPreguntas(grupos),
      dado: { giro: [-14, 18], vueltas: 0, activo: false, girando: false, valor: null },
      pregunta: null,
      aviso: null,
      registro: [],
      luces: [],
      destino: null,
      mensaje: null,
      pensando: null,
      ganador: null,
      final: null,
    };
    setPantalla("juego");
    sonido.current.playClick?.();
    setTimeout(() => bucle(id), 500);
  };

  React.useEffect(
    () => () => {
      partida.current += 1;
    },
    [],
  );

  const s = st.current;
  const total = grupos ? Object.values(grupos).reduce((a, v) => a + v.length, 0) : 0;

  return (
    <div className="vm gm-no-adapt">
      <header className="vm-cabecera">
        <Link to="/juegos" className="vm-volver" aria-label="Volver a Juegos · 返回游戏">
          <ArrowLeftIcon size={18} aria-hidden="true" />
          <span>Juegos · 游戏</span>
        </Link>
        <div className="vm-titulo">
          <span className="vm-sello" translate="no" aria-hidden="true">
            旅
          </span>
          <div>
            <h1>
              El viaje del Rey Mono <span translate="no">· 美猴王之旅</span>
            </h1>
            <p>
              U{contenido.numero} · {contenido.nivel} · {contenido.titulo} <span>{contenido.tituloChino}</span>
            </p>
          </div>
        </div>
        <div className="vm-acciones">
          <button type="button" className="vm-icono" onClick={() => setAyuda(true)} aria-label="Cómo se juega · 玩法" title="Cómo se juega · 玩法">
            <HelpCircleIcon size={20} />
          </button>
          <button type="button" className="vm-icono" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"} title={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"}>
            {soundEnabled ? <Volume2Icon size={20} /> : <VolumeXIcon size={20} />}
          </button>
          <Link to="/juegos/viaje-mono" className="vm-icono vm-icono--texto" title="Cambiar unidad · 更换单元">
            <LayersIcon size={18} aria-hidden="true" />
            <span>Unidad · 单元</span>
          </Link>
        </div>
      </header>

      {pantalla === "intro" && <Intro contenido={contenido} total={total} listo={!!grupos} onEmpezar={empezar} />}

      {pantalla !== "intro" && s && (
        <div className="vm-mesa">
          <div className={`vm-marco ${s.aviso?.tipo === "dragon" && !reducido ? "is-temblor" : ""}`}>
            <div className="vm-tablero" ref={tableroRef}>
              <TableroViaje luces={s.luces} destino={s.destino} />
              <Fichas jugadores={s.jugadores} turno={s.turno} />
              {s.aviso && <Aviso aviso={s.aviso} />}
            </div>
          </div>
          <aside className="vm-lado">
            <ol className="vm-jugadores" aria-label="Jugadores · 玩家">
              {s.jugadores.map((j, i) => (
                <li key={j.id} className={`vm-jugador is-${j.color} ${i === s.turno ? "is-turno" : ""}`}>
                  <span className={`vm-ficha-mini is-${j.color}`} aria-hidden="true">
                    {j.cpu && <img src={`${BASE}mono/feliz.webp`} alt="" />}
                  </span>
                  <span className="vm-jugador-txt">
                    <b>{j.nombre}</b>
                    <small>
                      {j.pos === 0 ? "Salida · 起点" : j.pos >= META ? "Meta · 终点" : `Casilla ${j.pos} · 第${j.pos}格`}
                    </small>
                  </span>
                  <span className="vm-jugador-estado">
                    {j.escudo && (
                      <span className="vm-chapa is-escudo" title="Melocotón: protegido del dragón · 蟠桃护身">
                        <ShieldIcon size={12} aria-hidden="true" /> 桃
                      </span>
                    )}
                    {j.pozo && (
                      <span className="vm-chapa is-pozo" title="En el pozo · 在井里">
                        井
                      </span>
                    )}
                    <span className="vm-chapa" title="Aciertos · 答对">
                      <CheckIcon size={12} aria-hidden="true" /> {j.aciertos}
                    </span>
                  </span>
                  <span className="vm-progreso" aria-hidden="true">
                    <i style={{ width: `${(j.pos / META) * 100}%` }} />
                  </span>
                </li>
              ))}
            </ol>

            <div className="vm-control">
              <Dado
                giro={s.dado.giro}
                activo={s.dado.activo}
                girando={s.dado.girando && !reducido}
                onTirar={() => clicDado.current?.()}
                etiqueta={s.dado.activo ? "Tirar el dado · 掷骰子" : s.dado.valor ? `Dado: ${s.dado.valor} · 骰子：${s.dado.valor}` : "Dado · 骰子"}
              />
              <div className="vm-mensaje" role="status" aria-live="polite">
                {s.pensando ? (
                  <MonoPiensa pensando={s.pensando} />
                ) : (
                  <>
                    {s.dado.valor && !s.dado.activo && (
                      <span className="vm-valor" translate="no">
                        {s.dado.valor}
                      </span>
                    )}
                    <p>
                      {s.mensaje?.es}
                      <small>{s.mensaje?.zh}</small>
                    </p>
                  </>
                )}
              </div>
            </div>

            <ul className="vm-registro" aria-label="Diario del viaje · 旅行日志">
              {s.registro.map((r) => (
                <li key={r.k}>
                  <i className={`is-${r.color}`} aria-hidden="true" />
                  <span>
                    {r.es} <small>{r.zh}</small>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      {s?.pregunta && createPortal(<TarjetaPregunta q={s.pregunta} onResponder={responder} onCerrar={cerrarPregunta} varios={s.jugadores.filter((j) => !j.cpu).length > 1} />, document.body)}
      {pantalla === "fin" && s?.final && createPortal(<Final f={s.final} jugadores={s.jugadores} onOtra={() => setPantalla("intro")} />, document.body)}
      {ayuda &&
        createPortal(
          <Hoja onCerrar={() => setAyuda(false)}>
            <Reglas />
          </Hoja>,
          document.body,
        )}
    </div>
  );
}

// ---------- Fichas 3D que saltan casilla a casilla ----------
const DESVIO = [
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
];
function Fichas({ jugadores, turno }) {
  return jugadores.map((j, i) => {
    const juntos = jugadores.filter((o) => o.pos === j.pos);
    const k = juntos.indexOf(j);
    const { x, y } = centroDe(j.pos);
    const d = juntos.length > 1 ? DESVIO[k] : [0, 0];
    const meta = j.pos >= META;
    const dx = d[0] * (meta ? 6 : 3.2);
    const dy = d[1] * (meta ? 4 : 3.2) + (meta ? 6 : 0);
    return (
      <div
        key={j.id}
        className={`vm-ficha is-${j.color} ${i === turno ? "is-turno" : ""} ${j.vuelo ? "is-vuelo" : ""}`}
        style={{ left: `${x + dx}%`, top: `${y + dy}%`, zIndex: 10 + Math.round(y) }}
        aria-label={`${j.nombre}: ${j.pos === 0 ? "salida" : `casilla ${j.pos}`}`}
      >
        <span className="vm-ficha-salto" key={j.salto}>
          <span className="vm-ficha-cuerpo">
            <span className="vm-ficha-base" />
            <span className="vm-ficha-cuello" />
            <span className="vm-ficha-cabeza">{j.cpu ? <img src={`${BASE}mono/feliz.webp`} alt="" /> : <b translate="no">{FICHAS.find((f) => f.color === j.color)?.zh}</b>}</span>
          </span>
        </span>
        <span className="vm-ficha-sombra" />
      </div>
    );
  });
}

function Aviso({ aviso }) {
  return (
    <div className={`vm-aviso is-${aviso.tipo}`} key={aviso.k} role="status">
      <span className="vm-aviso-sello" translate="no" aria-hidden="true">
        {aviso.sello}
      </span>
      <p>
        {aviso.es}
        <small>{aviso.zh}</small>
      </p>
    </div>
  );
}

function MonoPiensa({ pensando }) {
  const m = MOTIVO[pensando.motivo] || MOTIVO.tirar;
  return (
    <div className={`vm-piensa ${pensando.ok === true ? "is-ok" : pensando.ok === false ? "is-mal" : ""}`}>
      <img src={`${BASE}mono/${pensando.ok === false ? "serio" : pensando.ok ? "feliz" : "guino"}.webp`} alt="" />
      <p>
        {pensando.ok == null ? "El Rey Mono piensa…" : pensando.ok ? "¡El Rey Mono acierta!" : "El Rey Mono falla"}
        <small>{pensando.ok == null ? `${m.zh}……` : pensando.ok ? "美猴王答对了！" : "美猴王答错了"}</small>
      </p>
      {pensando.ok == null && (
        <span className="vm-puntos" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </div>
  );
}

// ---------- Tarjeta de pregunta (pergamino que se despliega) ----------
function TarjetaPregunta({ q, onResponder, onCerrar, varios }) {
  const ref = React.useRef(null);
  useModalAccesible(ref, { enfocar: true });
  const { p, jugador, motivo, elegida, ok } = q;
  const m = MOTIVO[motivo] || MOTIVO.tirar;
  const respondida = elegida != null;
  const largo = p.opciones.some((o) => o.length > 26);
  const textoBoton = !respondida
    ? ""
    : motivo === "tirar"
      ? ok
        ? "¡A tirar el dado! · 去掷骰子"
        : "Pierdes el turno · 失去这一回合"
      : motivo === "pozo"
        ? ok
          ? "¡Fuera del pozo! · 出井"
          : "Sigues en el pozo · 还在井里"
        : motivo === "linterna"
          ? ok
            ? "¡Tira otra vez! · 再掷一次"
            : "Continuar · 继续"
          : ok
            ? "¡Salida encontrada! · 找到出口"
            : "Te pierdes… · 迷路了";
  React.useEffect(() => {
    if (!respondida) return undefined;
    const t = setTimeout(() => ref.current?.querySelector(".vm-q-seguir")?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(t);
  }, [respondida]);
  return (
    <div className="vm-modal-fondo">
      <div className={`vm-q is-${jugador.color}`} ref={ref} role="dialog" aria-modal="true" aria-labelledby="vm-q-titulo">
        <span className="vm-q-rodillo is-arriba" aria-hidden="true" />
        <div className="vm-q-papel">
          <div className="vm-q-cabecera">
            <span className="vm-q-sello" translate="no" aria-hidden="true">
              {p.sello}
            </span>
            <span className="vm-q-tipo">{ETIQUETA[p.tipo]}</span>
            {varios && <span className={`vm-q-jugador is-${jugador.color}`}>{jugador.nombre}</span>}
          </div>
          <p className="vm-q-motivo">
            {m.es} · <span>{m.zh}</span>
          </p>
          <h2 id="vm-q-titulo" className="vm-q-enunciado">
            {p.es}
          </h2>
          {p.zh && <p className="vm-q-zh">{p.zh}</p>}
          {p.audio && (p.escuchar || p.tipo === "traducir") && (
            <button type="button" className={`vm-q-audio ${p.escuchar ? "is-grande" : ""}`} onClick={() => speak(p.audio, 0.85)}>
              <Volume2Icon size={p.escuchar ? 26 : 18} aria-hidden="true" /> {p.escuchar ? "Escuchar otra vez · 再听一遍" : "Escuchar · 听"}
            </button>
          )}
          <div className={`vm-q-opciones ${largo ? "is-largas" : ""}`}>
            {p.opciones.map((o, i) => {
              const correcta = sinAcentos(o) === sinAcentos(p.correcta);
              const estado = !respondida ? "" : correcta ? "is-correcta" : o === elegida ? "is-mal" : "is-apagada";
              return (
                <button key={o + i} type="button" className={`vm-q-opcion ${estado}`} onClick={() => onResponder(o)} disabled={respondida}>
                  <span className="vm-q-letra" aria-hidden="true">
                    {"ABCD"[i]}
                  </span>
                  <span>{o}</span>
                  {respondida && correcta && <CheckIcon size={18} aria-label="correcta · 正确" />}
                  {respondida && !correcta && o === elegida && <XIcon size={18} aria-label="incorrecta · 错误" />}
                </button>
              );
            })}
          </div>
          {respondida && (
            <div className={`vm-q-resultado ${ok ? "is-ok" : "is-mal"}`} role="alert">
              <b>{ok ? "¡Correcto! · 答对了！" : "No es correcto · 答错了"}</b>
              {!ok && (
                <p className="vm-q-solucion">
                  Respuesta correcta · 正确答案：<strong>{p.correcta}</strong>
                </p>
              )}
              <p className="vm-q-explica" lang="zh-CN">
                {p.explicacion}
              </p>
              {p.repetida && <small>Ya salieron todas las preguntas: se repiten · 题目已全部出过，开始重复</small>}
              <button type="button" className={`vm-q-seguir ${ok ? "" : "is-perder"}`} onClick={onCerrar}>
                {ok ? <PlayIcon size={16} aria-hidden="true" /> : null}
                {textoBoton}
              </button>
            </div>
          )}
        </div>
        <span className="vm-q-rodillo is-abajo" aria-hidden="true" />
      </div>
    </div>
  );
}

// ---------- Intro ----------
function Intro({ contenido, total, listo, onEmpezar }) {
  const [modo, setModo] = React.useState("mono");
  const [cuantos, setCuantos] = React.useState(2);
  const [nombres, setNombres] = React.useState(["", "", "", ""]);
  return (
    <section className="vm-intro">
      <div className="vm-intro-escena" aria-hidden="true">
        <img className="vm-intro-templo" src={`${BASE}theme/templos/montana.webp`} alt="" />
        <img className="vm-intro-nube is-1" src={`${BASE}theme/nube-oro.png`} alt="" />
        <img className="vm-intro-nube is-2" src={`${BASE}theme/nube-oro.png`} alt="" />
        <img className="vm-intro-mono" src={`${BASE}mono/saluda.webp`} alt="" />
      </div>
      <div className="vm-intro-panel">
        <h2>
          ¡Viaja hasta el Templo del Oeste! <span>一路西行，直到西天！</span>
        </h2>
        <p className="vm-intro-regla">
          <b>Regla de oro:</b> para tirar el dado hay que acertar una pregunta de la unidad. Si fallas, no tiras y ves la respuesta explicada.
          <small>黄金规则：答对本单元的问题才能掷骰子；答错就不能掷，并显示正确答案和中文解释。</small>
        </p>
        <div className="vm-modos" role="radiogroup" aria-label="Modo de juego · 游戏模式">
          <button type="button" role="radio" aria-checked={modo === "mono"} className={`vm-modo ${modo === "mono" ? "is-activo" : ""}`} onClick={() => setModo("mono")}>
            <BotIcon size={22} aria-hidden="true" />
            <span>
              <b>Contra el Rey Mono</b>
              <small>挑战美猴王</small>
            </span>
          </button>
          <button type="button" role="radio" aria-checked={modo === "varios"} className={`vm-modo ${modo === "varios" ? "is-activo" : ""}`} onClick={() => setModo("varios")}>
            <UsersIcon size={22} aria-hidden="true" />
            <span>
              <b>2–4 jugadores</b>
              <small>同一设备多人玩</small>
            </span>
          </button>
        </div>
        {modo === "varios" && (
          <div className="vm-config">
            <div className="vm-cuantos" role="group" aria-label="Número de jugadores · 玩家人数">
              {[2, 3, 4].map((n) => (
                <button key={n} type="button" aria-pressed={cuantos === n} className={cuantos === n ? "is-activo" : ""} onClick={() => setCuantos(n)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="vm-nombres">
              {FICHAS.slice(0, cuantos).map((f, i) => (
                <label key={f.color} className={`vm-nombre is-${f.color}`}>
                  <span className={`vm-ficha-mini is-${f.color}`} aria-hidden="true" />
                  <input value={nombres[i]} maxLength={14} placeholder={`Jugador ${i + 1} · 玩家${i + 1}`} onChange={(e) => setNombres((l) => l.map((x, k) => (k === i ? e.target.value : x)))} aria-label={`Nombre del jugador ${i + 1} · 玩家${i + 1}的名字`} />
                </label>
              ))}
            </div>
          </div>
        )}
        <ul className="vm-leyenda" aria-label="Casillas especiales · 特殊格子">
          {REGLAS_CASILLAS.map((r) => (
            <li key={r.tipo} className={`is-${r.tipo}`}>
              <span translate="no" aria-hidden="true">
                {r.sello}
              </span>
              <p>
                {r.es}
                <small>{r.zh}</small>
              </p>
            </li>
          ))}
        </ul>
        <button type="button" className="vm-empezar" disabled={!listo} onClick={() => onEmpezar({ modo, cuantos, nombres: modo === "mono" ? [] : nombres.map((n) => n.trim()) })}>
          {listo ? <PlayIcon size={20} aria-hidden="true" /> : <LoaderCircleIcon size={20} className="animate-spin" aria-hidden="true" />}
          {listo ? "Empezar el viaje · 开始旅程" : "Preparando preguntas… · 准备题目"}
        </button>
        {listo && (
          <p className="vm-intro-nota">
            {total} preguntas de la unidad {contenido.numero}, sin repetir en la partida · 本单元共{total}道题，一局内不重复
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- Final ----------
function Final({ f, jugadores, onOtra }) {
  const ref = React.useRef(null);
  useModalAccesible(ref, { enfocar: true });
  const gana = !f.ganador.cpu;
  const ordenados = [...jugadores].sort((a, b) => b.pos - a.pos);
  return (
    <div className="vm-modal-fondo is-final">
      <div className={`vm-final ${gana ? "is-gana" : "is-pierde"}`} ref={ref} role="dialog" aria-modal="true" aria-labelledby="vm-final-titulo">
        <div className="vm-final-rayos" aria-hidden="true" />
        <img className="vm-final-mono" src={`${BASE}mono/${gana ? "trofeo" : "guino"}.webp`} alt="" />
        <h2 id="vm-final-titulo">
          {gana ? (f.contra ? "¡Has llegado al Templo del Oeste!" : `¡${f.ganador.nombre} llega al Templo del Oeste!`) : "¡El Rey Mono llega primero!"}
          <span>{gana ? "到达西天，取得真经！" : "美猴王先到了西天！"}</span>
        </h2>
        <ol className="vm-final-podio">
          {ordenados.map((j, i) => (
            <li key={j.id} className={`is-${j.color}`}>
              <b>{i + 1}.</b> <span className={`vm-ficha-mini is-${j.color}`} aria-hidden="true">{j.cpu && <img src={`${BASE}mono/feliz.webp`} alt="" />}</span> {j.nombre}
              <small>
                {j.pos >= META ? "Meta · 终点" : `Casilla ${j.pos}`} · ✓ {j.aciertos} · ✗ {j.fallos}
              </small>
            </li>
          ))}
        </ol>
        <div className="vm-final-datos">
          <span>
            <b>{f.aciertos}</b> aciertos · 答对
          </span>
          <span>
            <b>{f.fallos}</b> fallos · 答错
          </span>
          <span className="is-xp">
            <b>+{f.xp}</b> XP
          </span>
        </div>
        {f.nuevoRecord && <p className="vm-final-record">¡Nuevo récord de aciertos en esta unidad! · 本单元新纪录！</p>}
        {f.subeNivel && <p className="vm-final-record">¡Subes de nivel! · 升级了！</p>}
        <div className="vm-final-botones">
          <button type="button" className="vm-empezar" onClick={onOtra}>
            <RotateCcwIcon size={18} aria-hidden="true" /> Otra partida · 再玩一局
          </button>
          <Link to="/juegos/viaje-mono" className="vm-boton-papel">
            <LayersIcon size={18} aria-hidden="true" /> Otra unidad · 换单元
          </Link>
          <Link to="/juegos" className="vm-boton-papel">
            Juegos · 游戏
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------- Ayuda ----------
function Hoja({ children, onCerrar }) {
  const ref = React.useRef(null);
  useModalAccesible(ref, { onEscape: onCerrar, enfocar: true });
  return (
    <div className="vm-modal-fondo" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="vm-hoja" ref={ref} role="dialog" aria-modal="true" aria-labelledby="vm-hoja-titulo">
        <button type="button" className="vm-hoja-cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
          <XIcon size={20} />
        </button>
        <h2 id="vm-hoja-titulo">Cómo se juega · 玩法</h2>
        {children}
      </div>
    </div>
  );
}

function Reglas() {
  return (
    <div className="vm-reglas">
      <ol>
        <li>
          En tu turno aparece una pregunta de la unidad. <b>Si aciertas, tiras el dado</b> y avanzas. <b>Si fallas, no tiras</b>: ves la respuesta correcta con su explicación y pasa el turno.
          <small>轮到你时先答一道本单元的题：答对才能掷骰子前进；答错不能掷，会看到正确答案和解释，然后换人。</small>
        </li>
        <li>
          Gana quien llegue primero al Templo del Oeste (casilla 40). Hay que llegar justo: si sobran puntos, rebotas hacia atrás.
          <small>先到西天（第40格）的人获胜。必须正好走到终点，多出的点数要往回退。</small>
        </li>
        <li>
          Si caes en la casilla de otra ficha (fuera de una pagoda), la adelantas y retrocede 4 casillas.
          <small>如果你落在别人的格子上（宝塔除外），对方后退4格。</small>
        </li>
      </ol>
      <ul className="vm-leyenda">
        {REGLAS_CASILLAS.map((r) => (
          <li key={r.tipo} className={`is-${r.tipo}`}>
            <span translate="no" aria-hidden="true">
              {r.sello}
            </span>
            <p>
              {r.es}
              <small>{r.zh}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
