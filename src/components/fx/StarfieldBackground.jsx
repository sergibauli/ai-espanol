import * as React from "react";
function StarfieldBackground({ children }) {
  const tRef = React.useRef(null);
  React.useEffect(() => {
    const tRef_current = tRef.current;
    if (!tRef_current) {
      return;
    }
    const u = tRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!u) {
      return;
    }
    let s;
    const d = [];
    const m = () => {
      if (!(tRef_current.clientWidth === 0 || tRef_current.clientHeight === 0)) {
        tRef_current.width = tRef_current.clientWidth || 1;
        tRef_current.height = tRef_current.clientHeight || 1;
        d.length = 0;
        for (let v = 0; v < 80; v++) {
          d.push({
            x: Math.random() * tRef_current.width,
            y: Math.random() * tRef_current.height,
            r: Math.random() * 1.5 + 0.3,
            o: Math.random() * 0.6 + 0.2,
            s: Math.random() * 0.02 + 0.005,
          });
        }
      }
    };
    const g = () => {
      if (document.hidden) {
        s = requestAnimationFrame(g);
        return;
      }
      if (
        !tRef_current ||
        tRef_current.width <= 0 ||
        tRef_current.height <= 0 ||
        !isFinite(tRef_current.width) ||
        !isFinite(tRef_current.height)
      ) {
        s = requestAnimationFrame(g);
        return;
      }
      u.fillStyle = "#050714";
      if (tRef_current.width === 0 || tRef_current.height === 0) {
        return;
      }
      u.fillStyle = "#050714";
      u.fillRect(0, 0, tRef_current.width, tRef_current.height);
      const v = tRef_current.width * 0.5;
      const f = tRef_current.height * 0.4;
      const E = tRef_current.width * 0.6;
      if (![v, f, 0, v, f, E].every((_) => typeof _ === "number" && isFinite(_))) {
        return;
      }
      const j = u.createRadialGradient(v, f, 0, v, f, E);
      j.addColorStop(0, "rgba(30, 20, 60, 0.3)");
      j.addColorStop(0.5, "rgba(10, 15, 40, 0.15)");
      j.addColorStop(1, "rgba(5, 7, 20, 0)");
      u.fillStyle = j;
      u.fillRect(0, 0, tRef_current.width, tRef_current.height);
      for (const _ of d) {
        _.o += _.s;
        if (_.o > 0.8 || _.o < 0.2) {
          _.s = -_.s;
        }
        u.beginPath();
        u.arc(_.x, _.y, _.r, 0, Math.PI * 2);
        u.fillStyle = `rgba(255, 255, 255, ${_.o})`;
        u.shadowBlur = _.r * 3;
        u.shadowColor = `rgba(200, 220, 255, ${_.o * 0.5})`;
        u.fill();
      }
      u.shadowBlur = 0;
      s = requestAnimationFrame(g);
    };
    m();
    window.addEventListener("resize", m);
    g();
    return () => {
      cancelAnimationFrame(s);
      window.removeEventListener("resize", m);
    };
  }, []);
  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#050714",
      }}
    >
      <canvas
        ref={tRef}
        className="fixed inset-0 w-full h-full"
        style={{
          zIndex: 0,
        }}
      />
      <div
        className="relative"
        style={{
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
export { StarfieldBackground };
