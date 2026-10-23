import { Volume2Icon, VolumeXIcon } from "lucide-react";
import { useSound } from "../lib/sound.jsx";
function SoundToggles() {
  const { musicEnabled, soundEnabled, toggleMusic, toggleSound } = useSound();
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={toggleMusic}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: musicEnabled ? "rgba(0,212,255,.15)" : "rgba(255,255,255,.05)",
          border: `1px solid ${musicEnabled ? "rgba(0,212,255,.4)" : "rgba(255,255,255,.12)"}`,
          backdropFilter: "blur(10px)",
          boxShadow: musicEnabled ? "0 0 15px rgba(0,212,255,.2)" : "none",
        }}
        title="Música / Music"
      >
        {musicEnabled ? (
          <Volume2Icon
            size={16}
            style={{
              color: "#00d4ff",
            }}
          />
        ) : (
          <VolumeXIcon
            size={16}
            style={{
              color: "rgba(255,255,255,.4)",
            }}
          />
        )}
      </button>
      <button
        onClick={toggleSound}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: soundEnabled ? "rgba(255,0,170,.15)" : "rgba(255,255,255,.05)",
          border: `1px solid ${soundEnabled ? "rgba(255,0,170,.4)" : "rgba(255,255,255,.12)"}`,
          backdropFilter: "blur(10px)",
          boxShadow: soundEnabled ? "0 0 15px rgba(255,0,170,.2)" : "none",
        }}
        title="Sonidos / Sound Effects"
      >
        {soundEnabled ? (
          <Volume2Icon
            size={16}
            style={{
              color: "#ff00aa",
            }}
          />
        ) : (
          <VolumeXIcon
            size={16}
            style={{
              color: "rgba(255,255,255,.4)",
            }}
          />
        )}
      </button>
    </div>
  );
}
export { SoundToggles };
