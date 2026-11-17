import { useAuth } from "@clerk/clerk-react";
import { ArrowLeftIcon, ShieldCheckIcon } from "lucide-react";
import * as React from "react";
import { useNavigate, Link } from "react-router";
import { Logo } from "../../packages/imperial/src/index.js";
import { FormularioAcceso } from "../components/portada/FormularioAcceso.jsx";
import { VideoEscena } from "../components/portada/VideoEscena.jsx";
import { useParallaxPuntero, prefiereQuietud } from "../components/portada/vida.js";
import "../styles/v21-acceso.css";

// Sin ClerkProvider (pruebas locales) los hooks de Clerk lanzan: se trata como «no ha entrado»
function useAuthSeguro() {
  try {
    return useAuth();
  } catch {
    return { isLoaded: true, isSignedIn: false };
  }
}

// Mismo vídeo que la apertura de la portada: el Rey Mono llega a la puerta celestial
const PUERTA = [
  { consulta: "(max-aspect-ratio: 1/1)", src: "./video/portada-puerta-vertical-llegada.mp4", poster: "./video/portada-puerta-vertical-llegada.jpg", velocidad: 0.85 },
  { consulta: "", src: "./video/portada-puerta-llegada.mp4", poster: "./video/portada-puerta-llegada.jpg", quieta: "./video/portada-puerta-luz.jpg", fin: 2.92, velocidad: 0.8 },
];

// Pose del Rey Mono según lo que hace el alumno
const POSES = {
  saluda: { img: "saluda", es: "¡Hola! Entra con tu cuenta", zh: "你好！请登录" },
  serio: { img: "serio", es: "No miro, ¡palabra de mono!", zh: "我不看，保证！" },
  poder: { img: "poder", es: "Escribe el código mágico", zh: "输入神奇验证码" },
  guino: { img: "guino", es: "¡Uy! Prueba otra vez", zh: "哎呀！再试一次" },
  trofeo: { img: "trofeo", es: "¡Bienvenido!", zh: "欢迎回来！" },
};

const NUBES = [
  { clase: "n1", y: "12%", t: "48s", d: "-6s", s: 1.4 },
  { clase: "n2", y: "30%", t: "62s", d: "-30s", s: 1 },
  { clase: "n3", y: "70%", t: "40s", d: "-12s", s: 1.8 },
  { clase: "n4", y: "84%", t: "55s", d: "-40s", s: 1.2 },
];

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuthSeguro();
  const navegar = useNavigate();
  const refRaiz = React.useRef(null);
  const entrandoRef = React.useRef(false);
  const [pose, setPose] = React.useState("saluda");
  const [paso, setPaso] = React.useState("datos");
  const [triunfo, setTriunfo] = React.useState(false);
  const refPapel = React.useRef(null);
  const refVuelta = React.useRef(0);
  useParallaxPuntero(refRaiz);

  // Ya tenía sesión al llegar: directo a la app (sin celebración)
  React.useEffect(() => {
    if (isLoaded && isSignedIn && !entrandoRef.current) navegar("/dashboard");
  }, [isLoaded, isSignedIn, navegar]);
  React.useEffect(() => {
    try {
      const caduca = sessionStorage.getItem("dele_expiry");
      if (sessionStorage.getItem("dele_auth") === "true" && caduca && Date.now() < Number(caduca)) navegar("/dashboard");
    } catch {}
  }, [navegar]);
  React.useEffect(() => () => clearTimeout(refVuelta.current), []);

  const poseBase = (p) => (p === "codigo" ? "poder" : "saluda");
  const avisar = React.useCallback(
    (evento) => {
      clearTimeout(refVuelta.current);
      if (evento.startsWith("paso:")) {
        const nuevo = evento.slice(5);
        setPaso(nuevo);
        setPose(poseBase(nuevo));
      } else if (evento === "clave:dentro") setPose("serio");
      else if (evento === "clave:fuera") setPose((p) => (p === "serio" ? "saluda" : p));
      else if (evento === "error") {
        setPose("guino");
        // Sacudida del pergamino sin volver a montar el formulario (no se pierde lo escrito)
        if (!prefiereQuietud()) refPapel.current?.animate?.([{ transform: "none" }, { transform: "translateX(-8px) rotate(-.5deg)" }, { transform: "translateX(8px) rotate(.5deg)" }, { transform: "translateX(-5px)" }, { transform: "none" }], { duration: 420, easing: "ease-out" });
        refVuelta.current = setTimeout(() => setPose((p) => (p === "guino" ? poseBase(paso) : p)), 1800);
      } else if (evento === "entrando") {
        entrandoRef.current = true;
        setPose("trofeo");
      }
    },
    [paso],
  );
  const alEntrar = () => {
    setTriunfo(true);
    setTimeout(() => navegar("/dashboard"), prefiereQuietud() ? 200 : 1500);
  };

  const datosPose = POSES[pose];
  return (
    <div ref={refRaiz} className={`v21 ${triunfo ? "v21-triunfo" : ""}`}>
      <div className="v21-fondo" aria-hidden="true">
        <VideoEscena variantes={PUERTA} prioridad className="v21-video" />
        <span className="v21-velo" />
        <span className="v21-rayos" />
        {NUBES.map((n) => (
          <img key={n.clase} className={`v21-nube ${n.clase}`} src="./theme/nube-oro.png" alt="" style={{ "--y": n.y, "--t": n.t, "--d": n.d, "--s": n.s }} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="v21-chispa" style={{ "--x": `${4 + ((i * 41) % 92)}%`, "--d": `${-((i * 1.7) % 11)}s`, "--t": `${8 + (i % 5) * 1.6}s`, "--z": `${2 + (i % 3)}px` }} />
        ))}
        <img className="v21-dragon" src="./theme/dragon-luz.webp" alt="" />
      </div>

      <main className="v21-escena">
        <header className="v21-cabecera">
          <Logo tono="oscuro" tamano={40} />
          <h1>
            <span className="v21-titulo-es">Cruza la puerta</span>
            <span className="v21-titulo-zh" lang="zh-Hans">跨进西班牙语之门</span>
          </h1>
        </header>

        <div className="v21-mono" aria-live="polite">
          <span className="v21-mono-halo" aria-hidden="true" />
          <span className="v21-mono-anillo" aria-hidden="true" />
          {Object.entries(POSES).map(([clave, p]) => (
            <img key={clave} className={`v21-mono-pose ${pose === clave ? "activa" : ""}`} src={`./mono/${p.img}.webp`} alt="" draggable="false" aria-hidden="true" />
          ))}
          <span key={pose} className="v21-bocadillo" translate="no">
            {datosPose.es}
            <b lang="zh-Hans">{datosPose.zh}</b>
          </span>
        </div>

        <section className="v21-rollo" aria-labelledby="v21-titulo-form">
          <img className="v21-rodillo izq" src="./theme/rodillo.webp" alt="" aria-hidden="true" />
          <div ref={refPapel} className="v21-papel">
            <span className="v21-sello" aria-hidden="true" translate="no">
              <i>登</i>
              <i>录</i>
            </span>
            <h2 id="v21-titulo-form" className="v21-titulo-form">
              {paso === "codigo" ? "Verificación" : paso === "olvido" || paso === "nueva" ? "Recuperar acceso" : "Iniciar sesión"}
              <small lang="zh-Hans">{paso === "codigo" ? "身份验证" : paso === "olvido" || paso === "nueva" ? "找回账号" : "学员登录"}</small>
            </h2>
            <p className="v21-seguro">
              <ShieldCheckIcon size={14} aria-hidden="true" /> Cuenta de tu academia · 学校账号
            </p>
            <FormularioAcceso alEntrar={alEntrar} avisar={avisar} />
          </div>
          <img className="v21-rodillo der" src="./theme/rodillo.webp" alt="" aria-hidden="true" />
        </section>

        <Link to="/" className="v21-volver">
          <ArrowLeftIcon size={15} aria-hidden="true" /> Portada · 首页
        </Link>
      </main>

      {triunfo && (
        <div className="v21-estallido" aria-hidden="true">
          <span className="v21-onda" />
          <span className="v21-onda o2" />
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="v21-confeti" style={{ "--a": `${i * 15}deg`, "--r": `${38 + (i % 4) * 9}vmin`, "--c": i % 3 ? "#f2c14e" : "#c8102e" }} />
          ))}
          <p className="v21-bienvenida">
            ¡Bienvenido!
            <b lang="zh-Hans">欢迎回来</b>
          </p>
        </div>
      )}
    </div>
  );
}
