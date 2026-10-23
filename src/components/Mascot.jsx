import * as React from "react";
import { SoundProvider } from "../lib/sound.jsx";
import { SoundToggles } from "./SoundToggles.jsx";
const MASCOT_PHRASES = {
  correct: {
    text: "很好!",
    pinyin: "Hěn hǎo!",
  },
  wrong: {
    text: "哦不!",
    pinyin: "Ō bù!",
  },
};
function MascotBubble({ mood }) {
  const [t, setT] = React.useState(null);
  const [u, setU] = React.useState(false);
  const dRef = React.useRef(null);
  React.useEffect(() => {
    if (mood) {
      if (dRef.current) {
        clearTimeout(dRef.current);
      }
      setU(false);
      setT(mood);
    } else if (t !== null) {
      setU(true);
      dRef.current = setTimeout(() => {
        setT(null);
        setU(false);
      }, 400);
    }
    return () => {
      if (dRef.current) {
        clearTimeout(dRef.current);
      }
    };
  }, [mood]);
  if (t === null) {
    return null;
  }
  const m = MASCOT_PHRASES[t];
  const g = t === "correct";
  const v = g
    ? "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)"
    : "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #db2777 100%)";
  const color = g ? "rgba(16, 185, 129, 0.6)" : "rgba(239, 68, 68, 0.6)";
  const E = g ? "rgba(52, 211, 153, 0.8)" : "rgba(251, 146, 60, 0.8)";
  const j = u
    ? "animate-[mascota-fade-out_0.4s_ease-in_forwards]"
    : "animate-[mascota-pop-in_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards]";
  return (
    <div
      className={`fixed bottom-28 right-6 z-50 flex flex-col items-end ${j}`}
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        className="relative px-6 py-4 rounded-2xl rounded-br-sm"
        style={{
          background: v,
          border: `2px solid ${E}`,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}, inset 0 0 20px rgba(255,255,255,0.15)`,
          animation: u ? undefined : "mascota-glow-pulse 2s ease-in-out infinite",
          color,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl rounded-br-sm pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-0.5">
          <span
            className="text-3xl font-black tracking-wider"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.2)",
              lineHeight: 1.2,
            }}
          >
            {m.text}
          </span>
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            {m.pinyin}
          </span>
        </div>
      </div>
      <div className="relative w-full h-0">
        <div
          className="absolute -top-2 right-2 w-2 h-2 rounded-full"
          style={{
            background: g ? "#34d399" : "#fb923c",
            boxShadow: `0 0 8px ${g ? "#34d399" : "#fb923c"}`,
            animation: "floatParticle 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -top-4 right-8 w-1.5 h-1.5 rounded-full"
          style={{
            background: g ? "#60a5fa" : "#f472b6",
            boxShadow: `0 0 6px ${g ? "#60a5fa" : "#f472b6"}`,
            animation: "floatParticle 2.5s ease-in-out infinite 0.3s",
          }}
        />
      </div>
    </div>
  );
}
function MascotProvider({ children }) {
  const [mood, setMood] = React.useState(null);
  const uRef = React.useRef(null);
  React.useEffect(() => {
    const s = (d) => {
      const d_detail = d.detail;
      if (uRef.current) {
        clearTimeout(uRef.current);
      }
      setMood(d_detail);
      uRef.current = setTimeout(() => {
        setMood(null);
      }, 2000);
    };
    window.addEventListener("mascota-feedback", s);
    return () => {
      window.removeEventListener("mascota-feedback", s);
      if (uRef.current) {
        clearTimeout(uRef.current);
      }
    };
  }, []);
  return (
    <SoundProvider>
      <div className="game-experience">
        <div className="game-ambient game-ambient-one" aria-hidden="true" />
        <div className="game-ambient game-ambient-two" aria-hidden="true" />
        <div className="relative z-[1] min-h-screen">{children}</div>
        <SoundToggles />
        <MascotBubble mood={mood} />
      </div>
    </SoundProvider>
  );
}
export { MascotProvider };
