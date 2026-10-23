import * as React from "react";
import { useLocation } from "react-router";
function CursorTrail() {
  const i = useLocation();
  const tRef = React.useRef(null);
  React.useEffect(() => {
    const matches = window.matchMedia("(pointer: fine)").matches;
    const matches_1 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!matches || matches_1) {
      return;
    }
    const tRef_current = tRef.current;
    if (!tRef_current) {
      return;
    }
    let d = 0;
    let m = -1000;
    let g = -1000;
    let v = -1000;
    let f = -1000;
    const E = (_) => {
      m = _.clientX;
      g = _.clientY;
    };
    const j = () => {
      v += (m - v) * 0.16;
      f += (g - f) * 0.16;
      tRef_current.style.transform = `translate3d(${v}px, ${f}px, 0)`;
      d = requestAnimationFrame(j);
    };
    window.addEventListener("pointermove", E, {
      passive: true,
    });
    d = requestAnimationFrame(j);
    return () => {
      window.removeEventListener("pointermove", E);
      cancelAnimationFrame(d);
    };
  }, []);
  React.useEffect(() => {
    const c = document.getElementById("root");
    if (c) {
      c.classList.remove("fx-page");
      c.offsetWidth;
      c.classList.add("fx-page");
    }
  }, [i.pathname]);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const u = new IntersectionObserver(
      (m) => {
        for (const g of m) {
          if (g.isIntersecting) {
            g.target.classList.add("fx-in");
            u.unobserve(g.target);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      },
    );
    const s = () => {
      document.querySelectorAll(".fx-reveal:not(.fx-in)").forEach((m) => u.observe(m));
    };
    s();
    const d = new MutationObserver(() => s());
    d.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      u.disconnect();
      d.disconnect();
    };
  }, [i.pathname]);
  React.useEffect(() => {
    const matches = window.matchMedia("(pointer: fine)").matches;
    const matches_1 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!matches || matches_1) {
      return;
    }
    let s = null;
    let d = 0;
    const m = (f, E) => {
      const j = f.getBoundingClientRect();
      const _ = (E.clientX - j.left) / j.width - 0.5;
      const A = (E.clientY - j.top) / j.height - 0.5;
      const w = Number(f.dataset.fxTiltMax || 8);
      f.style.transform = `perspective(900px) rotateX(${(-A * w).toFixed(2)}deg) rotateY(${(_ * w).toFixed(2)}deg) translateY(-4px) scale(1.015)`;
    };
    const g = (f) => {
      const E = f.target.closest?.(".fx-tilt");
      if (E !== s) {
        if (s) {
          s.style.transform = "";
        }
        s = E;
      }
      if (s) {
        cancelAnimationFrame(d);
        d = requestAnimationFrame(() => s && m(s, f));
      }
    };
    const v = (f) => {
      if (!s) {
        return;
      }
      const f_relatedTarget = f.relatedTarget;
      if (!(f_relatedTarget && s.contains(f_relatedTarget))) {
        cancelAnimationFrame(d);
        s.style.transform = "";
        s = null;
      }
    };
    document.addEventListener("pointerover", g, {
      passive: true,
    });
    document.addEventListener("pointerout", v, {
      passive: true,
    });
    return () => {
      document.removeEventListener("pointerover", g);
      document.removeEventListener("pointerout", v);
      cancelAnimationFrame(d);
    };
  }, []);
  return (
    <>
      <div className="fx-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div ref={tRef} className="fx-cursor-glow" aria-hidden="true" />
    </>
  );
}
export { CursorTrail };
