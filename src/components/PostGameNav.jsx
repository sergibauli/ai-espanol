import { Gamepad2Icon, ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router";
const t = [
  "kahoot",
  "ahorcado",
  "memory",
  "crucigrama",
  "sopa",
  "ruleta",
  "scramble",
  "flashcards",
  "typing-race",
  "word-snake",
  "vocab-blast",
  "speed-match",
  "word-quiz",
  "word-connect",
  "fill-blanks",
  "word-pairs",
  "word-tower",
  "spell-it",
  "word-maze",
  "word-dash",
  "word-puzzle",
  "word-drop",
  "word-rush",
  "word-pop",
  "word-orbit",
  "word-fusion",
  "word-grid",
  "word-storm",
  "word-stack",
  "word-cipher",
  "word-trivia",
  "word-pinball",
  "word-tetris",
  "word-shooter",
  "word-match-3d",
  "word-racer",
  "word-defender",
  "word-slinger",
  "word-ninja",
  "word-quest",
  "word-archer",
  "word-samurai",
  "word-astronaut",
  "word-candy",
  "apalabrados",
  "word-pirate",
  "word-wizard",
];
function l(currentGameId) {
  const r = t.indexOf(currentGameId);
  if (r === -1 || r >= t.length - 1) {
    return null;
  }
  return `/juegos/${t[r + 1]}`;
}
export function P({ currentGameId, extraButton }) {
  const a = useNavigate();
  const d = l(currentGameId);
  return (
    <div className="flex gap-3 justify-center flex-wrap mt-4">
      {extraButton}
      <button
        onClick={() => a("/juegos")}
        className="px-5 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
        style={{
          background: "linear-gradient(135deg, #ff00aa, #b829dd)",
          boxShadow: "0 0 20px rgba(255,0,170,.3)",
        }}
      >
        <Gamepad2Icon size={16} /> Otro juego nuevo / 其他游戏
      </button>
      {d && (
        <button
          onClick={() => a(d)}
          className="px-5 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #39ff14)",
            boxShadow: "0 0 20px rgba(0,212,255,.3)",
          }}
        >
          Siguiente juego / 下一个 <ArrowRightIcon size={16} />
        </button>
      )}
    </div>
  );
}
