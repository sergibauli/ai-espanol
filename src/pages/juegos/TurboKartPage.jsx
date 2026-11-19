// Wukong Turbo Rush · 悟空极速赛车 — carreras de karts 3D (Three.js) con retos de vocabulario de la unidad:
// las cajas de objetos hacen una pregunta (acierto = objeto) y las puertas de palabras dan turbo.
// Basado en Turbo Kart Rush de BridgeMind (licencia MIT). El motor vive en src/juegos3d/turbo-kart/ y se
// descarga solo al entrar (import dinámico), junto con three.
import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";
import { ElegirUnidadJuego } from "../../components/juegos/ElegirUnidadJuego.jsx";
import { vocabularioJuego, todasLasPalabras } from "../../lib/vocabularioJuegos.js";
import { speak } from "../../components/lesson/fx.js";
import { useSound } from "../../lib/sound.jsx";
import { addXp } from "../../lib/gamification.js";
import "./turboKart.css";

const limpiar = (t) => String(t ?? "").replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim();
const tieneChino = (t) => /[一-鿿]/.test(String(t || ""));

function palabrasDe(contenido) {
  const vistas = new Set();
  const lista = [];
  for (const v of contenido.vocabulario || []) {
    const es = limpiar(v.espanol);
    const zh = limpiar(v.chino);
    if (!es || !zh || es.length > 24 || !tieneChino(zh) || vistas.has(es.toLowerCase())) continue;
    vistas.add(es.toLowerCase());
    lista.push({ es, zh });
  }
  const banco = [];
  const todas = todasLasPalabras();
  for (let i = 0; i < 400 && banco.length < 60 && todas.length; i++) {
    const v = todas[Math.floor(Math.random() * todas.length)];
    const es = limpiar(v.espanol);
    const zh = limpiar(v.chino);
    if (!es || es.length > 18 || !tieneChino(zh) || vistas.has(es.toLowerCase())) continue;
    vistas.add(es.toLowerCase());
    banco.push({ es, zh });
  }
  return { palabras: lista.length >= 3 ? lista : [...lista, ...banco.slice(0, 12)], banco };
}

export default function TurboKartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const numero = Number(new URLSearchParams(location.search).get("m")) || null;
  const contenido = React.useMemo(() => (numero ? vocabularioJuego(numero) : null), [numero]);
  if (!contenido)
    return (
      <ElegirUnidadJuego
        juego={{
          titulo: "Wukong Turbo Rush",
          tituloZh: "西游极速",
          sello: "车",
          desc: "Carreras de karts 3D: acierta la palabra de cada caja para recibir objeto y cruza las puertas correctas para ganar turbo · 3D卡丁车：答对道具箱的词才能拿到道具，穿过正确的单词门获得加速。",
        }}
        onElegir={(n) => navigate(`${location.pathname}?m=${n}`)}
        error={numero ? "Esa unidad no existe · 没有这个单元" : ""}
      />
    );
  return <JuegoKart key={contenido.numero} contenido={contenido} />;
}

function JuegoKart({ contenido }) {
  const contenedorRef = React.useRef(null);
  const { soundEnabled } = useSound();
  const sonidoRef = React.useRef(soundEnabled);
  sonidoRef.current = soundEnabled;
  const [estado, setEstado] = React.useState("cargando"); // cargando | listo | error
  const datos = React.useMemo(() => palabrasDe(contenido), [contenido]);

  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let juego = null;
    let cancelado = false;
    import("../../juegos3d/turbo-kart/mount.ts")
      .then(({ montarTurboKart }) => {
        if (cancelado || !contenedorRef.current) return;
        juego = montarTurboKart(contenedorRef.current, {
          palabras: datos.palabras,
          banco: datos.banco,
          decir: (es) => {
            if (sonidoRef.current !== false) speak(es, 0.9);
          },
          conVoz: () => sonidoRef.current !== false && typeof window !== "undefined" && "speechSynthesis" in window,
          onCarreraTerminada: (r) => {
            const bonus = r.puesto === 1 ? 20 : r.puesto === 2 ? 15 : r.puesto === 3 ? 10 : 5;
            const xp = r.retosAcertados * 5 + bonus;
            try {
              addXp(xp);
            } catch {
              /* sin progreso no pasa nada */
            }
            return xp;
          },
        });
        setEstado("listo");
      })
      .catch((err) => {
        console.error("[TurboKart]", err);
        if (!cancelado) setEstado("error");
      });
    return () => {
      cancelado = true;
      juego?.destruir();
      document.body.style.overflow = prevOverflow;
    };
  }, [datos]);

  return createPortal(
    <div className="tk-pagina">
      <div ref={contenedorRef} className="tk-lienzo" />
      <Link to="/juegos/turbo-kart" className="tk-volver" aria-label="Volver a elegir unidad · 返回选择单元">
        <ArrowLeftIcon size={16} aria-hidden="true" />
        <span>
          U{contenido.numero} · Volver · 返回
        </span>
      </Link>
      {estado === "cargando" && (
        <div className="tk-capa">
          <LoaderIcon size={34} className="animate-spin" aria-hidden="true" />
          <p style={{ margin: "12px 0 0", fontWeight: 700 }}>Cargando circuito… · 赛道加载中…</p>
        </div>
      )}
      {estado === "error" && (
        <div className="tk-capa">
          <p style={{ fontWeight: 800, fontSize: 20, margin: 0 }}>Este juego necesita WebGL 2 · 此游戏需要 WebGL 2</p>
          <p style={{ maxWidth: 420, textAlign: "center", opacity: 0.8 }}>
            Prueba con Chrome, Edge, Firefox o Safari actualizados y la aceleración gráfica activada · 请使用最新浏览器并开启硬件加速。
          </p>
          <Link to="/juegos" className="tk-volver tk-volver--fijo">
            <ArrowLeftIcon size={16} aria-hidden="true" /> Juegos · 游戏
          </Link>
        </div>
      )}
    </div>,
    document.body,
  );
}
