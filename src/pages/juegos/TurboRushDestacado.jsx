// Wukong Turbo Rush · 西游极速 — tarjeta estrella de la zona de juegos.
// Arte recortado de la portada del juego (public/turbo-kart/anim), con parallax al mover el ratón,
// estela de turbo, chispas y dragón volando. Respeta prefers-reduced-motion (solo CSS).
import * as React from "react";
import { Link } from "react-router";
import { FlagIcon } from "lucide-react";
import "../../styles/turbo-destacado.css";

const sinMovimiento = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function TurboRushDestacado({ onJugar }) {
  const ref = React.useRef(null);
  const raf = React.useRef(0);
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const mover = (e) => {
    if (e.pointerType !== "mouse" || sinMovimiento()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--tr-x", x.toFixed(3));
      el.style.setProperty("--tr-y", y.toFixed(3));
    });
  };
  const soltar = () => {
    cancelAnimationFrame(raf.current);
    ref.current?.style.removeProperty("--tr-x");
    ref.current?.style.removeProperty("--tr-y");
  };

  return (
    <section className="tr-dest" aria-labelledby="tr-dest-titulo">
      <Link
        ref={ref}
        to="/juegos/turbo-kart"
        className="tr-dest__card"
        onClick={onJugar}
        onPointerMove={mover}
        onPointerLeave={soltar}
      >
        <span className="tr-dest__fondo" aria-hidden="true" />
        <span className="tr-dest__velo" aria-hidden="true" />
        <span className="tr-dest__lineas" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ "--i": i }} />
          ))}
        </span>
        <img className="tr-dest__dragon" src="./turbo-kart/anim/dragon.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />

        <span className="tr-dest__texto">
          <span className="tr-dest__sello" translate="no">
            <b>新</b>
            <small>Nuevo</small>
          </span>
          <h2 id="tr-dest-titulo" className="tr-dest__titulo">
            <img className="tr-dest__logo" src="./turbo-kart/anim/logo.webp" alt="Wukong Turbo Rush" decoding="async" />
            <span className="tr-dest__zh" translate="no">
              西游极速
            </span>
          </h2>
          <span className="tr-dest__desc">
            Carreras de karts en 3D con las palabras de tu unidad: acierta en las cajas para conseguir objetos y cruza la puerta
            correcta para ganar turbo. <span>3D卡丁车：用单元词汇答题拿道具，穿过正确的单词门加速。</span>
          </span>
          <span className="tr-dest__chips">
            <span>4 circuitos · 4条赛道</span>
            <span>1–4 jugadores · 1–4人</span>
            <span>Criaturas míticas · 神兽</span>
          </span>
          <span className="tr-dest__boton">
            <FlagIcon size={18} aria-hidden="true" />
            ¡Correr! · 开赛
          </span>
        </span>

        <span className="tr-dest__escena" aria-hidden="true">
          <span className="tr-dest__halo" />
          <span className="tr-dest__estela" />
          <span className="tr-dest__chispas">
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} style={{ "--i": i }} />
            ))}
          </span>
          <img className="tr-dest__kart" src="./turbo-kart/anim/kart.webp" alt="" loading="lazy" decoding="async" />
          <img className="tr-dest__nino" src="./turbo-kart/anim/nino.webp" alt="" loading="lazy" decoding="async" />
        </span>
        <span className="tr-dest__marco" aria-hidden="true" />
      </Link>
    </section>
  );
}
