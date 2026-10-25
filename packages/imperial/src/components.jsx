import * as React from "react";
import monoSaluda from "./assets/mono-saluda.png";
import monoGuino from "./assets/mono-guino.png";
import monoSerio from "./assets/mono-serio.png";
import monoPoder from "./assets/mono-poder.png";
import monoFeliz from "./assets/mono-feliz.png";
import monoTrofeo from "./assets/mono-trofeo.png";
import { ICONOS } from "./iconos.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");
const MONO = { saluda: monoSaluda, guino: monoGuino, serio: monoSerio, poder: monoPoder, feliz: monoFeliz, trofeo: monoTrofeo };
const Zh = ({ children, className }) => (children ? <span className={cx("im-zh", className)}>{children}</span> : null);

/** Fondo de escena: noche azul con destellos dorados, papel o laca roja. */
export function Escena({ variante = "noche", className, style, children }) {
  return (
    <div className={cx("im-root im-escena", `im-escena--${variante}`, className)} style={style}>
      {children}
    </div>
  );
}

/** Hoja de pergamino: el contenedor principal de contenido. */
export function Pergamino({ variante = "papel", titulo, tituloZh, className, style, children }) {
  return (
    <section className={cx("im-root im-pergamino", variante !== "papel" && `im-pergamino--${variante}`, className)} style={style}>
      {titulo && (
        <header className="im-pergamino__cab">
          <h2 className="im-pergamino__titulo">{titulo}</h2>
          <Zh className="im-pergamino__zh">{tituloZh}</Zh>
        </header>
      )}
      {children}
    </section>
  );
}

/** Cinta de título dorada o lacada para encabezar pantallas y juegos. */
export function CintaTitulo({ texto, zh, tono = "oro", className }) {
  return (
    <div className={cx("im-root im-cinta", `im-cinta--${tono}`, className)}>
      <span className="im-cinta__es">{texto}</span>
      <Zh className="im-cinta__zh">{zh}</Zh>
    </div>
  );
}

/** Botón imperial en forma de píldora. */
export function Boton({ variante = "laca", tamano = "md", ancho = false, icono, zh, className, children, type = "button", ...rest }) {
  return (
    <button type={type} className={cx("im-root im-boton", `im-boton--${variante}`, tamano !== "md" && `im-boton--${tamano}`, ancho && "im-boton--ancho", className)} {...rest}>
      {icono}
      <span>{children}</span>
      <Zh className="im-boton__zh">{zh}</Zh>
    </button>
  );
}

/** Mascota Rey Mono en una de sus poses, con bocadillo opcional. */
export function Mascota({ pose = "saluda", tamano = 120, flota = false, mensaje, className }) {
  return (
    <div className={cx("im-root im-mascota", flota && "im-mascota--flota", className)} style={{ "--im-m": `${tamano}px` }}>
      <img src={MONO[pose] || MONO.saluda} alt="Rey Mono" />
      {mensaje && (
        <div className="im-bocadillo">
          <p className="im-bocadillo__texto">{mensaje}</p>
        </div>
      )}
    </div>
  );
}

/** Héroe de sección lacado con marco dorado, dragón y mascota. */
export function HeroSeccion({ ceja, titulo, tituloZh, descripcion, descripcionZh, mascota, acciones, className }) {
  return (
    <section className={cx("im-root im-hero", className)}>
      <div className="im-hero__texto">
        {ceja && <span className="im-hero__ceja">{ceja}</span>}
        <h1 className="im-hero__titulo">{titulo}</h1>
        <Zh className="im-hero__zh">{tituloZh}</Zh>
        {descripcion && (
          <p className="im-hero__desc">
            {descripcion}
            <Zh>{descripcionZh}</Zh>
          </p>
        )}
        {acciones && <div className="im-hero__acciones">{acciones}</div>}
      </div>
      {mascota && <img className="im-hero__mascota" src={MONO[mascota] || MONO.saluda} alt="" />}
    </section>
  );
}

/** Sello de tinta roja, jade u oro (Completada, APTO, Nuevo…). */
export function Sello({ texto, sub, tono = "laca", grande = false, giro = -8, className }) {
  return (
    <span className={cx("im-root im-sello", `im-sello--${tono}`, grande && "im-sello--grande", className)} style={{ "--im-giro": `${giro}deg` }}>
      {texto}
      {sub && <span className="im-sello__sub">{sub}</span>}
    </span>
  );
}

/** Disco de nivel MCER/DELE con su color propio (A1 laca, A2 jade, B1 oro, B2 púrpura). */
export function InsigniaNivel({ nivel = "A1", tamano = "md", className }) {
  return (
    <span className={cx("im-root im-nivel", tamano !== "md" && `im-nivel--${tamano}`, className)} data-nivel={nivel}>
      {nivel}
    </span>
  );
}

/** Barra de progreso con brillo. */
export function BarraProgreso({ valor = 0, max = 100, tono = "jade", etiqueta, mostrarValor = true, fina = false, className }) {
  const pct = Math.max(0, Math.min(100, (valor / (max || 1)) * 100));
  return (
    <div className={cx("im-root im-barra", `im-barra--${tono}`, fina && "im-barra--fina", className)} role="progressbar" aria-valuenow={valor} aria-valuemax={max}>
      {(etiqueta || mostrarValor) && !fina && (
        <div className="im-barra__fila">
          <span>{etiqueta}</span>
          {mostrarValor && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="im-barra__pista">
        <div className="im-barra__relleno" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Tarjeta de unidad didáctica con disco de jade, progreso y estado. */
export function TarjetaUnidad({ numero, titulo, tituloZh, icono = "📜", progreso = 0, estado = "nuevo", onClick, className }) {
  const bloqueada = estado === "bloqueada";
  return (
    <button type="button" className={cx("im-root im-tarjeta im-unidad", `im-unidad--${estado}`, className)} onClick={bloqueada ? undefined : onClick} aria-disabled={bloqueada}>
      {estado === "completada" && <Sello texto="Hecho" tono="jade" />}
      <span className="im-unidad__disco">{bloqueada ? "" : typeof icono === "string" && /\.(png|jpe?g|svg|webp)$/.test(icono) ? <img src={icono} alt="" /> : icono}</span>
      {numero != null && <span className="im-unidad__num">Unidad {numero}</span>}
      <h3 className="im-tarjeta__titulo">{titulo}</h3>
      <Zh className="im-tarjeta__zh">{tituloZh}</Zh>
      {!bloqueada && <BarraProgreso valor={progreso * 100} tono={estado === "completada" ? "jade" : "oro"} fina />}
    </button>
  );
}

/** Tarjeta de juego con medallón nocturno; puede ir bloqueada con candado. */
export function TarjetaJuego({ titulo, tituloZh, descripcion, icono = "🎲", etiqueta, bloqueado = false, onClick, className }) {
  return (
    <button type="button" className={cx("im-root im-tarjeta im-juego", bloqueado && "im-juego--bloqueado", className)} onClick={bloqueado ? undefined : onClick} aria-disabled={bloqueado}>
      <span className="im-juego__medallon">{icono}</span>
      <h3 className="im-tarjeta__titulo">{titulo}</h3>
      <Zh className="im-tarjeta__zh">{tituloZh}</Zh>
      {descripcion && <p className="im-tarjeta__desc">{descripcion}</p>}
      {etiqueta && !bloqueado && <span className="im-tarjeta__eti">{etiqueta}</span>}
      {bloqueado && <span className="im-juego__candado">🔒 Pronto</span>}
    </button>
  );
}

/** Tarjeta oscura de examen DELE por nivel, con datos y progreso. */
export function TarjetaExamen({ nivel = "A1", titulo, tituloZh, datos = [], progreso, accion = "Empezar", onAccion, className }) {
  return (
    <div className={cx("im-root im-tarjeta im-examen", className)}>
      <InsigniaNivel nivel={nivel} />
      <div>
        <h3 className="im-tarjeta__titulo">{titulo}</h3>
        <Zh className="im-tarjeta__zh">{tituloZh}</Zh>
      </div>
      {datos.length > 0 && (
        <ul className="im-examen__datos">
          {datos.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
      <div className="im-examen__pie">
        {progreso != null && <BarraProgreso valor={progreso * 100} tono="oro" etiqueta="Progreso" />}
        <Boton variante="oro" tamano="sm" onClick={onAccion}>
          {accion}
        </Boton>
      </div>
    </div>
  );
}

/** Opción de respuesta (pergamino o tono vivo de concurso) con estados de corrección. */
export function Opcion({ letra, children, estado = "normal", tono, onClick, className }) {
  const marca = estado === "correcta" ? "✓" : estado === "incorrecta" ? "✗" : null;
  return (
    <button type="button" className={cx("im-root im-opcion", estado !== "normal" && `im-opcion--${estado}`, className)} data-tono={tono} disabled={estado === "correcta" || estado === "incorrecta" || estado === "apagada"} onClick={onClick}>
      {letra && <span className="im-opcion__letra">{letra}</span>}
      <span className="im-opcion__texto">{children}</span>
      {marca && <span className="im-opcion__marca">{marca}</span>}
    </button>
  );
}

/** Bocadillo de diálogo con nombre del personaje y traducción. */
export function Bocadillo({ quien, texto, zh, lado = "izquierda", className }) {
  return (
    <div className={cx("im-root im-bocadillo", lado === "derecha" && "im-bocadillo--derecha", className)}>
      {quien && <span className="im-bocadillo__quien">{quien}</span>}
      <p className="im-bocadillo__texto">
        {texto}
        <Zh className="im-bocadillo__zh">{zh}</Zh>
      </p>
    </div>
  );
}

/** Diálogo: lista de bocadillos alternos. */
export function Dialogo({ lineas = [], className }) {
  return (
    <div className={cx("im-root im-dialogo", className)}>
      {lineas.map((l, i) => (
        <Bocadillo key={i} lado={i % 2 ? "derecha" : "izquierda"} {...l} />
      ))}
    </div>
  );
}

/** Ficha de letra de marfil (palabra desordenada, apalabrados, teclado). */
export function FichaLetra({ letra, puntos, estado = "normal", tamano = 48, onClick, className }) {
  return (
    <button type="button" className={cx("im-root im-ficha", estado !== "normal" && `im-ficha--${estado}`, className)} style={{ "--im-f": `${tamano}px` }} disabled={estado === "vacia"} onClick={onClick}>
      {letra}
      {puntos != null && <span className="im-ficha__puntos">{puntos}</span>}
    </button>
  );
}

const ESPECIALES = ["á", "é", "í", "ó", "ú", "ü", "ñ", "¿", "¡"];
/** Teclado con las letras especiales del español. */
export function TecladoEspanol({ mayusculas = false, onTecla, className }) {
  return (
    <div className={cx("im-root im-teclado", className)}>
      {ESPECIALES.map((k) => {
        const t = mayusculas ? k.toUpperCase() : k;
        return <FichaLetra key={k} letra={t} tamano={40} onClick={() => onTecla?.(t)} />;
      })}
    </div>
  );
}

/** Icono propio del menú (medallón con dibujo en laca). */
export function Icono({ nombre, tamano = 36, className }) {
  return (
    <svg className={cx("im-icono", className)} viewBox="0 0 48 48" width={tamano} height={tamano} aria-hidden="true">
      {ICONOS[nombre]}
    </svg>
  );
}

/** Menú lateral lacado con marca, iconos propios y elemento activo dorado. */
export function MenuLacado({ items = [], activo, onSelect, pie, className }) {
  return (
    <nav className={cx("im-root im-menu", className)}>
      <div className="im-menu__marca">
        <span className="im-menu__logo">AI</span>
        <span className="im-menu__nombre">
          Español
          <small>西班牙语</small>
        </span>
      </div>
      {items.map((it) => (
        <button key={it.id} type="button" className={cx("im-menu__item", it.id === activo && "im-menu__item--activo")} onClick={() => onSelect?.(it.id)}>
          <Icono nombre={it.icono} />
          <span>
            {it.label}
            {it.labelZh && <small>{it.labelZh}</small>}
          </span>
        </button>
      ))}
      {pie && <div className="im-menu__pie">{pie}</div>}
    </nav>
  );
}

/** Panel de corrección DELE: nota en anillo, sello APTO/NO APTO, criterios y comentario. */
export function PanelCorreccion({ puntuacion = 0, apto, nivel, criterios = [], comentario, className }) {
  const ok = apto ?? puntuacion >= 60;
  return (
    <Pergamino className={cx("im-correccion", ok ? "im-correccion--apto" : "im-correccion--no-apto", className)}>
      <div className="im-correccion__anillo" style={{ "--p": puntuacion }}>
        <span className="im-correccion__nota">
          {puntuacion}
          <small>/ 100</small>
        </span>
      </div>
      <div className="im-correccion__cab">
        {nivel && <span className="im-correccion__nivel">Corrección DELE {nivel}</span>}
        <Sello texto={ok ? "Apto" : "No apto"} sub={ok ? "合格" : "不合格"} tono={ok ? "jade" : "laca"} grande />
      </div>
      {criterios.length > 0 && (
        <div className="im-correccion__criterios">
          {criterios.map((c) => (
            <BarraProgreso key={c.nombre} etiqueta={c.nombre} valor={c.nota} max={c.max || 100} tono={c.nota / (c.max || 100) >= 0.6 ? "jade" : "laca"} />
          ))}
        </div>
      )}
      {comentario && <p className="im-correccion__comentario">{comentario}</p>}
    </Pergamino>
  );
}

let uid = 0;
const useUid = (p) => React.useMemo(() => `${p}${++uid}`, [p]);

/** Sello del logo: laca con marco de oro, Ñ tallada con tilde de nube (祥云) y moneda «AI». */
export function SelloLogo({ tamano = 48, className }) {
  const id = useUid("im-lg");
  return (
    <svg className={cx("im-sello-logo", className)} viewBox="0 0 74 74" width={tamano} height={tamano} role="img" aria-label="AI Español">
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6293d" />
          <stop offset=".55" stopColor="#a5112a" />
          <stop offset="1" stopColor="#6e0717" />
        </linearGradient>
        <linearGradient id={`${id}o`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset=".5" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#c8901e" />
        </linearGradient>
      </defs>
      <rect x="3" y="8" width="62" height="62" rx="13" fill={`url(#${id}l)`} stroke={`url(#${id}o)`} strokeWidth="2.6" />
      <rect x="8.5" y="13.5" width="51" height="51" rx="8.5" fill="none" stroke="#f6d77e" strokeOpacity=".65" strokeWidth="1" />
      <path d="M12.5 25v-7.5H20M55.5 25v-7.5H48M12.5 53v7.5H20M55.5 53v7.5H48" fill="none" stroke="#f6d77e" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M22 59V35.5h6.6l12.4 15.6V35.5h6.4V59h-6.4L28.4 43.4V59Z" fill="#fff3d6" />
      <path d="M22.5 30.5c2.6-5.4 8.6-6 11.6-2.2s8.6 3.6 11.4-2" fill="none" stroke={`url(#${id}o)`} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="21.6" cy="27.6" r="2.3" fill="none" stroke="#f2c14e" strokeWidth="1.6" />
      <circle cx="46.6" cy="23.6" r="2.3" fill="none" stroke="#f2c14e" strokeWidth="1.6" />
      <circle cx="61" cy="13" r="11" fill={`url(#${id}o)`} stroke="#8a5a1e" strokeWidth="1.3" />
      <circle cx="61" cy="13" r="8.2" fill="none" stroke="#a5112a" strokeOpacity=".55" strokeWidth=".9" />
      <text x="61" y="16.6" textAnchor="middle" fontFamily="Cinzel, Georgia, serif" fontWeight="900" fontSize="10" fill="#8f0c21">AI</text>
    </svg>
  );
}

/** Logo de AI Español: sello imperial y nombre en Cinzel; tono oscuro (sobre laca o noche) o claro (sobre papel). */
export function Logo({ variante = "completo", tono = "oscuro", tamano = 48, subtitulo = true, className }) {
  return (
    <span className={cx("im-root im-logo", `im-logo--${tono}`, className)} style={{ "--im-lg": `${tamano}px` }}>
      <SelloLogo tamano={tamano} />
      {variante === "completo" && (
        <span className="im-logo__texto">
          <b>
            <i>AI</i> Español
          </b>
          {subtitulo && <small>西班牙语 · DELE</small>}
        </span>
      )}
    </span>
  );
}

/** Nube dorada (筋斗云) del Rey Mono. */
function NubeDorada({ id }) {
  return (
    <svg className="im-mononube__nube" viewBox="-24 0 184 70" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}n`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset=".45" stopColor="#f6d77e" />
          <stop offset="1" stopColor="#d9a43a" />
        </linearGradient>
      </defs>
      <path d="M12 56C-2 60-12 52-22 57M10 64C-4 68-10 62-20 66" fill="none" stroke="#f2c14e" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 50C4 50 4 36 16 35c0-11 16-15 22-5 6-14 28-14 32 0 8-10 28-8 28 6 14-6 28 2 22 12 14 0 14 14 0 14H22c-12 0-14-10-8-12Z" fill={`url(#${id}n)`} stroke="#b07a1a" strokeWidth="2" />
      <path d="M38 47a8 8 0 1 1 12 6M82 44a9 9 0 1 0-14 7M104 51a6 6 0 1 1 9 4" fill="none" stroke="#fffaf0" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/** Rey Mono sobre su nube dorada voladora; flota y puede dejar estela de destellos. */
export function MonoNube({ pose = "saluda", tamano = 140, estela = false, className, style }) {
  const id = useUid("im-mn");
  return (
    <div className={cx("im-root im-mononube", estela && "im-mononube--estela", className)} data-pose={pose} style={{ "--im-mn": `${tamano}px`, ...style }}>
      <img src={MONO[pose] || MONO.saluda} alt="Rey Mono" />
      <NubeDorada id={id} />
    </div>
  );
}

/** Moneda imperial de oro con anillo de perlas: medallón para iconos y nodos del mapa (oro = hecho, jade = actual, bronce = pendiente). */
export function Moneda({ tono = "oro", tamano = 72, brillo = false, className, style, children }) {
  const id = useUid("im-mo");
  const campo = { oro: ["#fff1b0", "#e9b648", "#8f5c16"], jade: ["#d8ffe6", "#43b872", "#0f4a2b"], bronce: ["#7a5534", "#4a2f1b", "#22140a"] }[tono] || [];
  return (
    <span className={cx("im-root im-moneda", `im-moneda--${tono}`, brillo && "im-moneda--brillo", className)} style={{ "--im-mo": `${tamano}px`, ...style }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}r`} cx=".35" cy=".3" r=".8">
            <stop offset="0" stopColor="#fffbe6" />
            <stop offset=".35" stopColor="#f6d77e" />
            <stop offset=".7" stopColor="#d9a43a" />
            <stop offset="1" stopColor="#8a5a1e" />
          </radialGradient>
          <radialGradient id={`${id}c`} cx=".4" cy=".35" r=".75">
            <stop offset="0" stopColor={campo[0]} />
            <stop offset=".55" stopColor={campo[1]} />
            <stop offset="1" stopColor={campo[2]} />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill={`url(#${id}r)`} stroke="#6e4210" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="42.5" fill="none" stroke="#8a5a1e" strokeOpacity=".55" strokeWidth="1" />
        {Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2;
          return <circle key={i} cx={50 + Math.cos(a) * 39} cy={50 + Math.sin(a) * 39} r="2.1" fill="#fff3c4" stroke="#a06a18" strokeWidth=".7" />;
        })}
        <circle cx="50" cy="50" r="34" fill={`url(#${id}c)`} stroke="#f6d77e" strokeWidth="2.4" />
        <circle cx="50" cy="50" r="29" fill="none" stroke={tono === "bronce" ? "#d9a43a" : "#fff7d6"} strokeOpacity=".55" strokeWidth="1" strokeDasharray="2.4 2.2" />
        {tono === "jade" && <ellipse cx="50" cy="50" rx="17" ry="17" fill={`url(#${id}c)`} stroke="#0b3a21" strokeOpacity=".4" />}
        <ellipse cx="38" cy="30" rx="18" ry="9" transform="rotate(-28 38 30)" fill="#fff" fillOpacity={tono === "bronce" ? 0.12 : 0.38} />
      </svg>
      {children && <span className="im-moneda__icono">{children}</span>}
    </span>
  );
}

/** Panel de jade con marco de oro ornamental y esquinas de nube; cabecera opcional con icono en moneda. */
export function PanelJade({ titulo, tituloZh, icono, variante = "panel", as: Tag = "section", className, style, children }) {
  return (
    <Tag className={cx("im-root im-jade", `im-jade--${variante}`, className)} style={style}>
      <span className="im-jade__esquinas" aria-hidden="true" />
      {(titulo || icono) && (
        <header className="im-jade__cabecera">
          {icono && (
            <Moneda tamano={variante === "tarjeta" ? 56 : 44} tono="oro">
              {typeof icono === "string" && ICONOS[icono] ? <Icono nombre={icono} tamano={variante === "tarjeta" ? 28 : 22} /> : icono}
            </Moneda>
          )}
          {titulo && (
            <h3 className="im-jade__titulo">
              {titulo}
              <Zh>{tituloZh}</Zh>
            </h3>
          )}
        </header>
      )}
      {children}
    </Tag>
  );
}
