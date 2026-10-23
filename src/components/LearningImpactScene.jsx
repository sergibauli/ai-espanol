import { SparklesIcon, Volume2Icon, TrophyIcon, BookOpenIcon } from "lucide-react";
const n = {
  modules: {
    main: "Ñ",
    side: "60",
    word: "APRENDE",
    color: "#ffb33b",
    accent: "#ff36d7",
  },
  exams: {
    main: "A+",
    side: "DELE",
    word: "SUPÉRATE",
    color: "#fbbf24",
    accent: "#a855f7",
  },
  pronunciation: {
    main: "RR",
    side: "¡!",
    word: "SUENA",
    color: "#00d4ff",
    accent: "#ff00aa",
  },
  dashboard: {
    main: "Ñ",
    side: "∞",
    word: "AVANZA",
    color: "#00d4ff",
    accent: "#ff8a2a",
  },
};
export function L({ variant, compact = false }) {
  const c = n[variant];
  return (
    <div
      className={`learning-impact-scene learning-impact-${variant} ${compact ? "is-compact" : ""}`}
      style={{
        "--impact-color": c.color,
        "--impact-accent": c.accent,
      }}
      aria-hidden="true"
    >
      <div className="impact-halo" />
      <div className="impact-orbit impact-orbit-a">
        <i />
      </div>
      <div className="impact-orbit impact-orbit-b">
        <i />
      </div>
      <div className="impact-character impact-character-main" data-text={c.main}>
        {c.main}
      </div>
      <div className="impact-character impact-character-side" data-text={c.side}>
        {c.side}
      </div>
      <div className="impact-word">{c.word}</div>
      <div className="impact-icon impact-icon-one">
        <SparklesIcon size={15} />
      </div>
      <div className="impact-icon impact-icon-two">
        {variant === "pronunciation" ? (
          <Volume2Icon size={15} />
        ) : variant === "exams" ? (
          <TrophyIcon size={15} />
        ) : (
          <BookOpenIcon size={15} />
        )}
      </div>
      <span className="impact-star impact-star-a" />
      <span className="impact-star impact-star-b" />
      <span className="impact-star impact-star-c" />
    </div>
  );
}
