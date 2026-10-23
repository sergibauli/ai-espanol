import * as React from "react";
const SoundContext = React.createContext({
  musicEnabled: true,
  soundEnabled: true,
  toggleMusic: () => {},
  toggleSound: () => {},
  playCorrect: () => {},
  playWrong: () => {},
  playWin: () => {},
  playLose: () => {},
  playClick: () => {},
  playSlice: () => {},
  playSpell: () => {},
});
function useSound() {
  return React.useContext(SoundContext);
}
let mu = null;
function getAudioContext() {
  if (!mu) {
    try {
      mu = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn("AudioContext not available:", error);
      return null;
    }
  }
  return mu;
}
function playTone(i, t, c, u, s = 0) {
  const d = getAudioContext();
  if (!d) {
    return;
  }
  const m = d.createOscillator();
  const g = d.createGain();
  m.type = t;
  m.frequency.value = i;
  m.detune.value = s;
  g.gain.setValueAtTime(u, d.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, d.currentTime + c);
  m.connect(g);
  g.connect(d.destination);
  m.start(d.currentTime);
  m.stop(d.currentTime + c);
}
function hu(i, t, c) {
  i.forEach((u, s) => setTimeout(() => playTone(u, "sine", t, c, s * 5), s * 40));
}
function b1(i, t) {
  const c = getAudioContext();
  if (!c) {
    return;
  }
  const u = c.createBuffer(1, c.sampleRate * i, c.sampleRate);
  const s = u.getChannelData(0);
  for (let g = 0; g < s.length; g++) {
    s[g] = (Math.random() * 2 - 1) * t;
  }
  const d = c.createBufferSource();
  d.buffer = u;
  const m = c.createGain();
  m.gain.setValueAtTime(t, c.currentTime);
  m.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i);
  d.connect(m);
  m.connect(c.destination);
  d.start(c.currentTime);
}
const SFX = {
  correct: () => {
    playTone(880, "sine", 0.15, 0.15, 0);
    setTimeout(() => playTone(1100, "sine", 0.2, 0.12, 5), 80);
    setTimeout(() => playTone(1320, "sine", 0.3, 0.08, 10), 160);
  },
  wrong: () => {
    playTone(200, "sawtooth", 0.3, 0.08, 0);
    setTimeout(() => playTone(150, "sawtooth", 0.3, 0.06, 0), 100);
  },
  win: () => {
    hu([523, 659, 784, 1047], 0.6, 0.1);
    setTimeout(() => hu([587, 740, 880, 1175], 0.6, 0.08), 200);
    setTimeout(() => hu([659, 831, 988, 1319], 0.8, 0.1), 400);
  },
  lose: () => {
    playTone(300, "sine", 0.4, 0.1, 0);
    setTimeout(() => playTone(250, "sine", 0.4, 0.08, 0), 150);
    setTimeout(() => playTone(200, "sine", 0.5, 0.06, 0), 300);
  },
  click: () => {
    playTone(1200, "sine", 0.05, 0.04, 0);
  },
  slice: () => {
    b1(0.1, 0.06);
    playTone(2000, "sawtooth", 0.08, 0.03, 100);
    setTimeout(() => playTone(1500, "sawtooth", 0.06, 0.02, -100), 30);
  },
  spell: () => {
    playTone(600, "sine", 0.2, 0.06, 0);
    setTimeout(() => playTone(900, "sine", 0.3, 0.05, 0), 50);
    setTimeout(() => playTone(1200, "sine", 0.4, 0.04, 0), 100);
    setTimeout(() => playTone(1800, "sine", 0.5, 0.03, 0), 150);
  },
};
function C1(i, t) {
  if (!t) {
    return;
  }
  const c = [262, 294, 330, 349, 392, 440, 494, 523];
  const u = [0, 2, 4, 2, 0, 3, 5, 4, 2, 0, 4, 5, 7, 5, 4, 2];
  let s = 0;
  const d = setInterval(() => {
    if (!t) {
      clearInterval(d);
      return;
    }
    const m = c[u[s % u.length]];
    playTone(m, "triangle", 0.4, 0.025, 0);
    s++;
  }, 400);
  return () => clearInterval(d);
}
function SoundProvider({ children }) {
  const [t, setT] = React.useState(() => {
    try {
      return localStorage.getItem("dele_music_enabled") !== "false";
    } catch {
      return true;
    }
  });
  const [u, setU] = React.useState(() => {
    try {
      return localStorage.getItem("dele_sound_enabled") !== "false";
    } catch {
      return true;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem("dele_music_enabled", String(t));
    } catch {}
  }, [t]);
  React.useEffect(() => {
    try {
      localStorage.setItem("dele_sound_enabled", String(u));
    } catch {}
  }, [u]);
  const d = React.useCallback(
    (z) => {
      if (u) {
        z();
      }
    },
    [u],
  );
  const toggleMusic = React.useCallback(() => {
    setT((z) => !z);
    SFX.click();
  }, []);
  const toggleSound = React.useCallback(() => {
    setU((z) => !z);
  }, []);
  const playCorrect = React.useCallback(() => {
    d(SFX.correct);
    window.dispatchEvent(
      new CustomEvent("mascota-feedback", {
        detail: "correct",
      }),
    );
  }, [d]);
  const playWrong = React.useCallback(() => {
    d(SFX.wrong);
    window.dispatchEvent(
      new CustomEvent("mascota-feedback", {
        detail: "wrong",
      }),
    );
  }, [d]);
  const playWin = React.useCallback(() => d(SFX.win), [d]);
  const playLose = React.useCallback(() => d(SFX.lose), [d]);
  const playClick = React.useCallback(() => d(SFX.click), [d]);
  const playSlice = React.useCallback(() => d(SFX.slice), [d]);
  const playSpell = React.useCallback(() => d(SFX.spell), [d]);
  React.useEffect(() => {
    const z = getAudioContext();
    if (z) {
      return C1(z, t);
    }
  }, [t]);
  return (
    <SoundContext.Provider
      value={{
        musicEnabled: t,
        soundEnabled: u,
        toggleMusic,
        toggleSound,
        playCorrect,
        playWrong,
        playWin,
        playLose,
        playClick,
        playSlice,
        playSpell,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}
export { useSound, SoundProvider };
