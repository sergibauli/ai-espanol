import {
  MusicIcon,
  VolumeXIcon,
  Volume2Icon,
  ShuffleIcon,
  SkipBackIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
  RepeatIcon,
  SearchIcon,
  ArrowLeftIcon,
  FileHeadphoneIcon,
  MicVocalIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { s as s_1 } from "../data/songs.js";
const oe = "dele_itunes_cache_v1";
const se = 200;
function Ie() {
  try {
    return JSON.parse(localStorage.getItem(oe) || "{}");
  } catch {
    return {};
  }
}
function Ee(c) {
  try {
    localStorage.setItem(oe, JSON.stringify(c));
  } catch {}
}
function Pe(c, u) {
  return `${c
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*ft\.?\s+[^\s]+/gi, "")
    .trim()} ${u}`
    .replace(/\s*\([^)]*\)/g, "")
    .trim();
}
async function Fe(title, artist) {
  const l = `${title}||${artist}`.toLowerCase();
  const h = Ie();
  if (h[l]) {
    return h[l];
  }
  try {
    const E = encodeURIComponent(Pe(title, artist));
    const b = await fetch(`https://itunes.apple.com/search?term=${E}&media=music&entity=song&limit=3`);
    if (!b.ok) {
      return null;
    }
    const f = ((await b.json()).results || []).find((S) => S.previewUrl)?.previewUrl || null;
    if (f) {
      h[l] = f;
      const S = Object.keys(h);
      if (S.length > se) {
        for (const A of S.slice(0, S.length - se)) {
          delete h[A];
        }
      }
      Ee(h);
    }
    return f;
  } catch {
    return null;
  }
}
function Te(duration) {
  const [u, l] = duration.split(":").map(Number);
  return u * 60 + l;
}
function OeComponent() {
  const [c, setC] = React.useState(0);
  const [l, setL] = React.useState(false);
  const [E, setE] = React.useState(0);
  const [w, setW] = React.useState(0.7);
  const [f, setF] = React.useState(true);
  const [A, setA] = React.useState("");
  const [M, setM] = React.useState("all");
  const [v, setV] = React.useState(false);
  const [C, setC_1] = React.useState(false);
  const [B, setB] = React.useState(null);
  const [g, setG] = React.useState(true);
  const [P, setP] = React.useState(null);
  const [ee, setEe] = React.useState(false);
  const pRef = React.useRef(null);
  const $RefRef = React.useRef(null);
  const teRef = React.useRef(null);
  const DRef = React.useRef(null);
  const mRef = React.useRef(null);
  const jRef = React.useRef(null);
  const KRef = React.useRef(null);
  const GRef = React.useRef(w);
  const FRef = React.useRef(null);
  const TRef = React.useRef(null);
  const re = React.useCallback(async () => {
    const t = window.AudioContext || window.webkitAudioContext;
    if (t) {
      return (
        (!mRef.current || mRef.current.state === "closed") && (mRef.current = new t()),
        mRef.current.state === "suspended" && (await mRef.current.resume()),
        mRef.current
      );
    }
    return null;
  }, []);
  const o = s_1[c];
  const z = P ? 30 : Te(o.duration);
  const xe = z > 0 ? (E / z) * 100 : 0;
  const ae = s_1.filter((t) => {
    const r =
      t.title.toLowerCase().includes(A.toLowerCase()) || t.artist.toLowerCase().includes(A.toLowerCase());
    const n = M === "all" || t.lang === M;
    return r && n;
  });
  const R = o.lyrics
    .split(
      `
`,
    )
    .filter((t) => t.trim().length > 0);
  const he = R.length > 0 ? z / R.length : 1;
  const k = Math.min(Math.floor(E / he), R.length - 1);
  React.useEffect(() => {
    if (DRef.current && f && R.length > 0) {
      const t = DRef.current.querySelector(`[data-line="${k}"]`);
      if (t) {
        t.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [k, f, R.length]);
  React.useEffect(() => {
    if (TRef.current) {
      clearInterval(TRef.current);
    }
    if (FRef.current) {
      clearInterval(FRef.current);
    }
    if (jRef.current) {
      try {
        jRef.current.stop();
      } catch {}
      jRef.current = null;
    }
    $RefRef.current = null;
    if (l && g) {
      const t = window.AudioContext || window.webkitAudioContext;
      const r = mRef.current || (t ? new t() : null);
      if (!r) {
        return;
      }
      mRef.current = r;
      if (r.state === "suspended") {
        r.resume();
      }
      const n = r.createOscillator();
      const s = r.createGain();
      const x = r.createAnalyser();
      x.fftSize = 128;
      n.type = "sine";
      const y = [261.63, 329.63, 392, 440, 523.25, 349.23, 293.66, 415.3];
      const L = y[c % y.length];
      n.frequency.value = L;
      s.gain.value = GRef.current * 0.15;
      n.connect(s);
      s.connect(x);
      x.connect(r.destination);
      n.start();
      jRef.current = n;
      KRef.current = s;
      $RefRef.current = x;
      const d = [1, 1.125, 1.25, 1.333, 1.5, 1.666, 1.875, 2];
      let N = 0;
      FRef.current = setInterval(() => {
        N = (N + 1) % d.length;
        const I = L * d[N];
        if (jRef.current) {
          jRef.current.frequency.setValueAtTime(I, r.currentTime);
        }
      }, 500);
      TRef.current = setInterval(() => {
        setE((I) => {
          if (I >= z) {
            return (
              C ||
                setC((Q) => {
                  if (v) {
                    return Math.floor(Math.random() * s_1.length);
                  }
                  return (Q + 1) % s_1.length;
                }),
              0
            );
          }
          return I + 1;
        });
      }, 1000);
    }
    return () => {
      if (TRef.current) {
        clearInterval(TRef.current);
      }
      if (FRef.current) {
        clearInterval(FRef.current);
      }
      if (jRef.current) {
        try {
          jRef.current.stop();
        } catch {}
        jRef.current = null;
      }
    };
  }, [l, z, C, c, g, v]);
  React.useEffect(
    () => () => {
      if (mRef.current) {
        mRef.current.close();
        mRef.current = null;
      }
      if (B) {
        URL.revokeObjectURL(B);
      }
    },
    [B],
  );
  React.useEffect(() => {
    if (!g && pRef.current) {
      if (l) {
        pRef.current.play().catch(() => setL(false));
      } else {
        pRef.current.pause();
      }
    }
  }, [l, g, c]);
  React.useEffect(() => {
    GRef.current = w;
    if (!g && pRef.current) {
      pRef.current.volume = w;
    }
    if (g && KRef.current) {
      KRef.current.gain.value = w * 0.15;
    }
  }, [w, g]);
  React.useEffect(() => {
    let t = false;
    setP(null);
    setEe(true);
    const r = s_1[c];
    Fe(r.title, r.artist)
      .then((n) => {
        if (!t) {
          if (n) {
            setP(n);
            setG(false);
          } else {
            setG(true);
          }
          setEe(false);
        }
      })
      .catch(() => {
        if (!t) {
          setG(true);
          setEe(false);
        }
      });
    return () => {
      t = true;
    };
  }, [c]);
  React.useEffect(() => {
    if (!P) {
      return;
    }
    if (pRef.current) {
      try {
        pRef.current.pause();
      } catch {}
    }
    const t = new Audio(P);
    t.crossOrigin = "anonymous";
    t.volume = GRef.current;
    pRef.current = t;
    t.ontimeupdate = () => setE(t.currentTime);
    t.onended = () => {
      if (C) {
        t.currentTime = 0;
        t.play().catch(() => {});
      } else {
        H();
      }
    };
    if (l) {
      t.play().catch(() => {});
    }
    return () => {
      try {
        t.pause();
      } catch {}
    };
  }, [P]);
  React.useEffect(() => {
    const teRef_current = teRef.current;
    if (!teRef_current) {
      return;
    }
    const r = teRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!r) {
      return;
    }
    let n;
    const s = () => {
      r.clearRect(0, 0, teRef_current.width, teRef_current.height);
      const x = 64;
      const y = teRef_current.width / x;
      const L = ["#a855f7", "#ec4899", "#06b6d4", "#ff8a2a"];
      for (let d = 0; d < x; d++) {
        let N;
        if (l) {
          if ($RefRef.current) {
            const q = new Uint8Array($RefRef.current.frequencyBinCount);
            $RefRef.current.getByteFrequencyData(q);
            N = (q[d % q.length] / 255) * teRef_current.height * 0.8;
          } else {
            N =
              (Math.sin(Date.now() / 200 + d * 0.3) * 0.5 + 0.5) * teRef_current.height * 0.7 +
              Math.random() * 10;
          }
        } else {
          N = 4;
        }
        const I = d * y;
        const Q = teRef_current.height - N;
        const ne = L[Math.floor((d / x) * L.length)];
        r.fillStyle = ne;
        r.shadowColor = ne;
        r.shadowBlur = 15;
        r.fillRect(I + 1, Q, y - 2, N);
      }
      r.shadowBlur = 0;
      n = requestAnimationFrame(s);
    };
    s();
    return () => cancelAnimationFrame(n);
  }, [l, g]);
  const fe = async () => {
    if (l) {
      setL(false);
      return;
    }
    if (!(g && !(await re()))) {
      setL(true);
    }
  };
  const ge = React.useCallback(() => {
    setE(0);
    if (v) {
      const t = Math.floor(Math.random() * s_1.length);
      setC(t);
    } else {
      setC((t) => (t - 1 + s_1.length) % s_1.length);
    }
  }, [v]);
  const H = React.useCallback(() => {
    setE(0);
    if (v) {
      const t = Math.floor(Math.random() * s_1.length);
      setC(t);
    } else {
      setC((t) => (t + 1) % s_1.length);
    }
  }, [v]);
  const onChange = (t) => {
    const r = t.target.files?.[0];
    if (!r) {
      return;
    }
    const n = URL.createObjectURL(r);
    setB(n);
    setG(false);
    setL(true);
    const s = new Audio(n);
    s.crossOrigin = "anonymous";
    const x = window.AudioContext || window.webkitAudioContext;
    if (!x) {
      return;
    }
    const y = new x();
    y.resume();
    const L = y.createMediaElementSource(s);
    const d = y.createAnalyser();
    d.fftSize = 128;
    L.connect(d);
    d.connect(y.destination);
    $RefRef.current = d;
    s.play().catch(() => {});
    pRef.current = s;
    s.ontimeupdate = () => setE(s.currentTime);
    s.onended = () => {
      if (C) {
        s.currentTime = 0;
        s.play();
      } else {
        H();
      }
    };
  };
  const me = (t) => {
    const r = Math.floor(t / 60);
    const n = Math.floor(t % 60);
    return `${r}:${n.toString().padStart(2, "0")}`;
  };
  const U = {
    all: s_1.length,
    es: s_1.filter((t) => t.lang === "es").length,
    en: s_1.filter((t) => t.lang === "en").length,
    it: s_1.filter((t) => t.lang === "it").length,
  };
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(20,10,40,0.95), rgba(10,5,25,0.98))",
        border: "2px solid rgba(168,85,247,0.3)",
        boxShadow: "0 0 60px rgba(168,85,247,0.15), inset 0 0 80px rgba(168,85,247,0.05)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg, transparent, #a855f7, #ec4899, #06b6d4, transparent)",
          boxShadow: "0 0 15px rgba(168,85,247,0.5)",
        }}
      />
      {Array.from({
        length: 12,
      }).map((t, r) => (
        <div
          key={r}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + ((r * 7) % 3),
            height: 2 + ((r * 11) % 3),
            top: `${5 + ((r * 29) % 88)}%`,
            left: `${2 + ((r * 37) % 94)}%`,
            background: ["#a855f7", "#ec4899", "#06b6d4", "#ff8a2a"][r % 4],
            boxShadow: "0 0 8px currentColor",
            animation: `floatParticle ${3 + (r % 4)}s ease-in-out ${(r % 6) * 0.4}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                boxShadow: "0 0 25px rgba(168,85,247,0.5)",
              }}
            >
              <MusicIcon size={22} className="text-white" />
            </div>
            <div>
              <h2
                className="text-white font-black text-xl"
                style={{
                  textShadow: "0 0 15px rgba(168,85,247,0.4)",
                }}
              >
                Música + Karaoke
              </h2>
              <p className="text-white/40 text-xs font-bold">
                {s_1.length} canciones · {s_1.filter((t) => t.lyrics.length > 50).length} con letra
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setF(!f)}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              style={{
                background: f ? "rgba(236,72,153,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${f ? "rgba(236,72,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                color: f ? "#f472b6" : "rgba(255,255,255,0.4)",
              }}
            >
              <MicVocalIcon size={14} /> {f ? "Letra ON" : "Letra OFF"}
            </button>
            {ee && (
              <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-white/10 text-white/40 border border-white/20">
                Buscando audio...
              </span>
            )}
            {!g && !ee && (
              <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                {P ? "Previa real 30s" : "MP3 cargado"}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-5">
              <div
                className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shrink-0"
                style={{
                  border: "2px solid rgba(168,85,247,0.4)",
                  boxShadow: "0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(236,72,153,0.15)",
                  animation: l ? "spinSlow 20s linear infinite" : "none",
                }}
              >
                <img
                  src={o.cover}
                  alt={o.title}
                  className="w-full h-full object-cover"
                  onError={(t) => {
                    t.target.src = "https://picsum.photos/300/300";
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(168,85,247,0.1), transparent)",
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-white font-black text-xl md:text-2xl truncate"
                  style={{
                    textShadow: "0 0 15px rgba(168,85,247,0.3)",
                  }}
                >
                  {o.title}
                </h3>
                <p className="text-white/50 text-sm font-bold truncate">{o.artist}</p>
                <p className="text-white/30 text-xs mt-1">
                  {o.album} · {o.duration}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                      background:
                        o.lang === "es"
                          ? "rgba(255,138,42,0.15)"
                          : o.lang === "en"
                            ? "rgba(59,130,246,0.15)"
                            : "rgba(168,85,247,0.15)",
                      border: `1px solid ${o.lang === "es" ? "rgba(255,138,42,0.3)" : o.lang === "en" ? "rgba(59,130,246,0.3)" : "rgba(168,85,247,0.3)"}`,
                      color: o.lang === "es" ? "#fb923c" : o.lang === "en" ? "#60a5fa" : "#c084fc",
                    }}
                  >
                    {o.lang === "es" ? "Español" : o.lang === "en" ? "English" : "Italiano"}
                  </span>
                  {o.lyrics.length > 50 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/15 text-pink-400 border border-pink-500/30">
                      <MicVocalIcon size={10} className="inline mr-0.5" /> Letra
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <canvas ref={teRef} width={600} height={80} className="w-full h-20" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(168,85,247,0.05), transparent)",
                }}
              />
            </div>
            <div>
              <div
                className="h-2 bg-white/5 rounded-full overflow-hidden relative cursor-pointer"
                onClick={(t) => {
                  const r = t.currentTarget.getBoundingClientRect();
                  const s = ((t.clientX - r.left) / r.width) * z;
                  setE(s);
                  if (!g && pRef.current) {
                    pRef.current.currentTime = s;
                  }
                }}
                style={{
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="h-full rounded-full relative transition-all duration-300"
                  style={{
                    width: `${xe}%`,
                    background: "linear-gradient(90deg, #a855f7, #ec4899, #06b6d4)",
                    boxShadow: "0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(236,72,153,0.3)",
                  }}
                >
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
                    style={{
                      boxShadow: "0 0 20px rgba(168,85,247,1), 0 0 40px rgba(236,72,153,0.5)",
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-white/30 text-xs font-mono">{me(E)}</span>
                <span className="text-white/30 text-xs font-mono">{o.duration}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setV((t) => !t)}
                className="p-2.5 rounded-full transition-all"
                style={{
                  background: v ? "rgba(168,85,247,0.2)" : "transparent",
                  color: v ? "#c084fc" : "rgba(255,255,255,0.3)",
                  border: `1px solid ${v ? "rgba(168,85,247,0.3)" : "transparent"}`,
                }}
              >
                <ShuffleIcon size={18} />
              </button>
              <button
                onClick={ge}
                className="p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <SkipBackIcon size={24} />
              </button>
              <button
                onClick={fe}
                className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  boxShadow: "0 0 40px rgba(168,85,247,0.5), 0 0 80px rgba(236,72,153,0.2)",
                }}
              >
                {l ? <PauseIcon size={28} /> : <PlayIcon size={28} className="ml-1" />}
              </button>
              <button
                onClick={H}
                className="p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <SkipForwardIcon size={24} />
              </button>
              <button
                onClick={() => setC_1((t) => !t)}
                className="p-2.5 rounded-full transition-all"
                style={{
                  background: C ? "rgba(168,85,247,0.2)" : "transparent",
                  color: C ? "#c084fc" : "rgba(255,255,255,0.3)",
                  border: `1px solid ${C ? "rgba(168,85,247,0.3)" : "transparent"}`,
                }}
              >
                <RepeatIcon size={18} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setW((t) => {
                    if (t === 0) {
                      return 0.7;
                    }
                    return 0;
                  })
                }
                className="text-white/40 hover:text-white/70 transition-all"
              >
                {w === 0 ? <VolumeXIcon size={18} /> : <Volume2Icon size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={w}
                onChange={(t) => setW(Number(t.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a855f7 ${w * 100}%, rgba(255,255,255,0.1) ${w * 100}%)`,
                }}
              />
              <label
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-105"
                style={{
                  background: "rgba(255,138,42,0.1)",
                  border: "1px solid rgba(255,138,42,0.3)",
                  color: "#fb923c",
                }}
              >
                <FileHeadphoneIcon size={14} />
                <span>Subir MP3</span>
                <input type="file" accept="audio/*" className="hidden" onChange={onChange} />
              </label>
            </div>
            {f && R.length > 0 && (
              <div
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.05))",
                  border: "1px solid rgba(168,85,247,0.2)",
                  boxShadow: "inset 0 0 40px rgba(168,85,247,0.05)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MicVocalIcon size={16} className="text-pink-400" />
                  <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Karaoke</span>
                </div>
                <div
                  ref={DRef}
                  className="h-48 overflow-y-auto space-y-2 pr-1"
                  style={{
                    scrollbarWidth: "thin",
                  }}
                >
                  {R.map((t, r) => (
                    <p
                      key={r}
                      data-line={r}
                      className="text-sm md:text-base font-bold transition-all duration-500 py-1 px-2 rounded-lg"
                      style={{
                        color:
                          r === k ? "#ffd600" : r < k ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)",
                        textShadow:
                          r === k ? "0 0 20px rgba(255,214,0,0.6), 0 0 40px rgba(255,214,0,0.3)" : "none",
                        transform: r === k ? "scale(1.03)" : "scale(1)",
                        background: r === k ? "rgba(255,214,0,0.08)" : "transparent",
                        borderLeft: r === k ? "3px solid #ffd600" : "3px solid transparent",
                      }}
                    >
                      {t}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={A}
                onChange={(t) => setA(t.target.value)}
                placeholder="Buscar canción o artista..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              {A && (
                <button
                  onClick={() => setA("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                >
                  <XIcon size={14} />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              {[
                {
                  key: "all",
                  label: `Todos (${U.all})`,
                },
                {
                  key: "es",
                  label: `Español (${U.es})`,
                },
                {
                  key: "en",
                  label: `English (${U.en})`,
                },
                {
                  key: "it",
                  label: `Italiano (${U.it})`,
                },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setM(t.key)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background:
                      M === t.key
                        ? "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.15))"
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${M === t.key ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)"}`,
                    color: M === t.key ? "#c084fc" : "rgba(255,255,255,0.4)",
                    boxShadow: M === t.key ? "0 0 15px rgba(168,85,247,0.2)" : "none",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div
              className="h-[520px] overflow-y-auto space-y-1 pr-1"
              style={{
                scrollbarWidth: "thin",
              }}
            >
              {ae.length === 0 ? (
                <div className="text-center py-8">
                  <MusicIcon size={32} className="text-white/10 mx-auto mb-2" />
                  <p className="text-white/30 text-sm">No se encontraron canciones</p>
                </div>
              ) : (
                ae.map((t, r) => {
                  const n = s_1[c].id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        const s = s_1.findIndex((x) => x.id === t.id);
                        re();
                        setC(s);
                        setE(0);
                        setL(true);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left group"
                      style={{
                        background: n
                          ? "linear-gradient(90deg, rgba(168,85,247,0.15), transparent)"
                          : "transparent",
                        border: n ? "1px solid rgba(168,85,247,0.3)" : "1px solid transparent",
                        boxShadow: n ? "0 0 20px rgba(168,85,247,0.1)" : "none",
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black shrink-0 overflow-hidden"
                        style={{
                          background: n
                            ? "linear-gradient(135deg, #a855f7, #ec4899)"
                            : "rgba(255,255,255,0.06)",
                          boxShadow: n ? "0 0 15px rgba(168,85,247,0.4)" : "none",
                        }}
                      >
                        {n && l ? (
                          <div className="flex gap-[2px] items-end h-4">
                            <span
                              className="w-[3px] bg-white animate-bounce"
                              style={{
                                height: "60%",
                                animationDelay: "0s",
                              }}
                            />
                            <span
                              className="w-[3px] bg-white animate-bounce"
                              style={{
                                height: "100%",
                                animationDelay: "0.1s",
                              }}
                            />
                            <span
                              className="w-[3px] bg-white animate-bounce"
                              style={{
                                height: "70%",
                                animationDelay: "0.2s",
                              }}
                            />
                          </div>
                        ) : (
                          <span className={n ? "text-white" : "text-white/40"}>{r + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-bold truncate ${n ? "text-purple-300" : "text-white/70 group-hover:text-white"}`}
                        >
                          {t.title}
                        </p>
                        <p className="text-xs text-white/30 truncate">{t.artist}</p>
                      </div>
                      <span className="text-[10px] text-white/20 font-mono shrink-0">{t.duration}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floatParticle { 0%,100% { transform: translateY(0) scale(1); opacity: 0.4; } 50% { transform: translateY(-15px) scale(1.2); opacity: 0.9; } }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px; border-radius: 50%;
          background: #a855f7;
          box-shadow: 0 0 10px rgba(168,85,247,0.8);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px; height: 14px; border-radius: 50%;
          background: #a855f7;
          box-shadow: 0 0 10px rgba(168,85,247,0.8);
          cursor: pointer; border: none;
        }
      `}</style>
    </div>
  );
}
function QeComponent() {
  return (
    <StarfieldBackground>
      <div className="max-w-7xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-white/50 hover:text-pink-400 transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
            <MusicIcon
              size={14}
              style={{
                color: "#c084fc",
              }}
            />
            <span>Karaoke · 卡拉OK</span>
          </div>
        </div>
        <OeComponent />
      </div>
    </StarfieldBackground>
  );
}
export { QeComponent as default };
