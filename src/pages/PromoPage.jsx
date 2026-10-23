import {
  VolumeXIcon,
  Volume2Icon,
  SparklesIcon,
  PlayIcon,
  SkipBackIcon,
  PauseIcon,
  SkipForwardIcon,
} from "lucide-react";
import * as React from "react";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
const n = [
  {
    emoji: "🐵",
    es: "AI Español",
    zh: "AI 西班牙语",
    desc: "Tu camino al DELE A1–B2, hecho para estudiantes chinos",
    descZh: "为中文学生打造的 DELE A1–B2 备考平台",
    color: "#ffb33b",
  },
  {
    emoji: "📚",
    es: "60 Módulos",
    zh: "60 个学习模块",
    desc: "Vocabulario, diálogos, teoría y ejercicios por nivel",
    descZh: "按级别学习词汇、对话、理论和练习",
    color: "#39ff14",
  },
  {
    emoji: "📝",
    es: "50 Exámenes DELE por nivel",
    zh: "每级 50 套 DELE 真题",
    desc: "Lectura, audición, escritura, monólogo e interacción",
    descZh: "阅读、听力、写作、独白与互动",
    color: "#ff4d4d",
  },
  {
    emoji: "🧠",
    es: "Gramática + Repaso Espaciado",
    zh: "语法 + 间隔复习",
    desc: "Gramática integrada y memorización automática (SRS)",
    descZh: "语法整合 + 自动记忆（间隔重复）",
    color: "#66e7ff",
  },
  {
    emoji: "🔊",
    es: "Pronunciación 3D",
    zh: "3D 发音",
    desc: "Sílabas interactivas en cristal 3D con audio",
    descZh: "带音频的 3D 水晶音节互动",
    color: "#ff00aa",
  },
  {
    emoji: "🎤",
    es: "Tutor de Voz IA",
    zh: "AI 语音导师",
    desc: "Habla con el mono y conversa en español en tiempo real",
    descZh: "与猴子实时西语对话",
    color: "#39ff14",
  },
  {
    emoji: "🎵",
    es: "Karaoke con música real",
    zh: "真实音乐卡拉OK",
    desc: "Aprende español cantando 500+ canciones",
    descZh: "通过 500+ 首歌曲唱歌学西语",
    color: "#c084fc",
  },
  {
    emoji: "🎮",
    es: "46 Juegos",
    zh: "46 个游戏",
    desc: "Kahoot, Ahorcado, Memory, Word Tetris…",
    descZh: "Kahoot、吊死鬼、记忆配对、单词俄罗斯方块…",
    color: "#00d4ff",
  },
  {
    emoji: "🤖",
    es: "Agentes IA",
    zh: "AI 智能体",
    desc: "Enjambre autónomo y generador de exámenes",
    descZh: "自主智能体集群 + 考试生成器",
    color: "#a855f7",
  },
  {
    emoji: "📅",
    es: "Planificador de Clases",
    zh: "课程安排",
    desc: "Invita a tus estudiantes y recibe confirmaciones por email",
    descZh: "邀请学生并通过邮件接收确认",
    color: "#39ff14",
  },
];
function MComponent() {
  const [l, setL] = React.useState(0);
  const [x, setX] = React.useState(true);
  const [m, setM] = React.useState(false);
  const [r, setR] = React.useState(false);
  const dRef = React.useRef(null);
  React.useEffect(() => {
    if (!x || !r) {
      return;
    }
    const t = setInterval(() => setL((c) => (c + 1) % (n.length + 1)), 4200);
    return () => clearInterval(t);
  }, [x, r]);
  React.useEffect(() => {
    if (!r || m) {
      if (dRef.current) {
        try {
          dRef.current.stop();
        } catch {}
        dRef.current = null;
      }
      return;
    }
    const t = window.AudioContext || window.webkitAudioContext;
    if (!t) {
      return;
    }
    const c = new t();
    const a = c.createOscillator();
    const f = c.createGain();
    a.type = "sine";
    a.frequency.value = 220;
    f.gain.value = 0.04;
    a.connect(f);
    f.connect(c.destination);
    a.start();
    let p = 0;
    const b = [220, 277.18, 329.63, 277.18, 220, 329.63, 415.3, 329.63];
    const g = setInterval(() => {
      a.frequency.value = b[p % b.length];
      p++;
    }, 900);
    dRef.current = {
      stop: () => {
        clearInterval(g);
        try {
          a.stop();
        } catch {}
      },
    };
    return () => {
      clearInterval(g);
      try {
        a.stop();
      } catch {}
    };
  }, [r, m]);
  const v = () => setR(true);
  const N = () => {
    setL(0);
    setX(true);
  };
  const w = () => setL((t) => Math.min(t + 1, n.length));
  const z = () => setL((t) => Math.max(t - 1, 0));
  const disabled = l === n.length;
  const s = n[l];
  return (
    <StarfieldBackground>
      <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 overflow-hidden">
        {r ? (
          <>
            <div
              className="absolute top-6 left-6 right-6 h-1.5 rounded-full overflow-hidden"
              style={{
                background: "rgba(255,255,255,.1)",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(l / n.length) * 100}%`,
                  background: "linear-gradient(90deg,#ffb33b,#ff00aa,#00d4ff)",
                }}
              />
            </div>
            <div
              key={l}
              className="text-center max-w-3xl mx-auto"
              style={{
                animation: "promoScene 0.7s ease-out",
              }}
            >
              {disabled ? (
                <>
                  <div className="text-7xl mb-6 spec-float">🇪🇸</div>
                  <h1 className="spec-glow-text text-5xl md:text-7xl font-black mb-4">¡Empieza hoy!</h1>
                  <p className="text-white/80 text-2xl md:text-3xl font-bold mb-3">今天就开始学西语！</p>
                  <p className="text-white/50 text-lg mb-8">
                    Prepárate para el DELE y habla español con confianza
                  </p>
                  <div
                    className="inline-block p-5 rounded-3xl spec-border"
                    style={{
                      background: "rgba(255,255,255,.95)",
                    }}
                  >
                    <img
                      src="./images/qr-wechat.png"
                      alt="WeChat QR"
                      className="w-56 h-56 object-contain rounded-xl"
                    />
                    <p className="text-slate-800 font-black mt-3 text-sm">扫码加微信 · 联系我们</p>
                    <p className="text-slate-500 text-xs">Escanea para contactarnos / 微信扫码联系</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-7xl md:text-8xl mb-6 spec-float"
                    style={{
                      filter: `drop-shadow(0 0 30px ${s.color}66)`,
                    }}
                  >
                    {s.emoji}
                  </div>
                  <div
                    className="text-xs font-black uppercase tracking-[0.3em] mb-2"
                    style={{
                      color: s.color,
                    }}
                  >
                    {s.es}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-4">{s.zh}</h2>
                  <p className="text-white/75 text-xl md:text-2xl font-bold mb-2">{s.desc}</p>
                  <p className="text-white/45 text-lg">{s.descZh}</p>
                </>
              )}
            </div>
            <div className="absolute bottom-8 flex items-center gap-4">
              <button
                onClick={z}
                disabled={l === 0}
                className="p-3 rounded-full transition-all disabled:opacity-20"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                <SkipBackIcon size={18} color="#fff" />
              </button>
              <button
                onClick={() => setX((t) => !t)}
                className="p-4 rounded-full transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#ffb33b,#ff00aa)",
                  boxShadow: "0 0 30px rgba(255,0,170,.4)",
                }}
              >
                {x ? <PauseIcon size={22} color="#fff" /> : <PlayIcon size={22} color="#fff" />}
              </button>
              <button
                onClick={w}
                disabled={disabled}
                className="p-3 rounded-full transition-all disabled:opacity-20"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                <SkipForwardIcon size={18} color="#fff" />
              </button>
              <button
                onClick={() => setM((t) => !t)}
                className="p-3 rounded-full transition-all"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                {m ? <VolumeXIcon size={18} color="#fff" /> : <Volume2Icon size={18} color="#39ff14" />}
              </button>
              <button
                onClick={N}
                className="p-3 rounded-full transition-all"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                <SparklesIcon size={18} color="#c084fc" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-8xl mb-6 spec-float">🐵</div>
            <h1 className="spec-glow-text text-5xl md:text-7xl font-black mb-4">AI Español</h1>
            <p className="text-white/60 text-xl md:text-2xl mb-8">🎬 Vídeo promocional · 宣传片</p>
            <button
              onClick={v}
              className="flex items-center gap-3 px-10 py-4 rounded-full text-white font-black text-lg transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#ffb33b,#ff00aa)",
                boxShadow: "0 0 40px rgba(255,0,170,.5)",
              }}
            >
              <PlayIcon size={22} /> Reproducir / 播放
            </button>
          </div>
        )}
        <style>{`
          @keyframes promoScene { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { MComponent as default };
