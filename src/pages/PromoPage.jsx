import { VolumeXIcon, Volume2Icon, PlayIcon, SkipBackIcon, PauseIcon, SkipForwardIcon, RotateCcwIcon } from "lucide-react";
import * as React from "react";

// Diapositivas del vídeo promocional (cifras reales de la app)
const ESCENAS = [
  { mono: "saluda", es: "AI Español", zh: "AI 西班牙语", desc: "Tu camino al DELE A1–B2, hecho para estudiantes chinos", descZh: "为中文学生打造的 DELE A1–B2 备考平台" },
  { mono: "feliz", es: "90 unidades", zh: "90 个单元", desc: "Un viaje por China: vocabulario, diálogos, teoría y ejercicios", descZh: "游历中国：词汇、对话、语法和练习" },
  { mono: "serio", es: "80 modelos DELE", zh: "80 套 DELE 模拟题", desc: "Lectura, audición, escritura y prueba oral, como el día del examen", descZh: "阅读、听力、写作和口语，和考试一样" },
  { mono: "guino", es: "Tutor IA y examinador oral", zh: "AI 导师和口语考官", desc: "Habla con el Rey Mono y practica la prueba oral con corrección", descZh: "和美猴王对话，练习口语并获得批改" },
  { mono: "poder", es: "Pronunciación y juegos", zh: "发音和游戏", desc: "Sílabas con voz real, repaso espaciado y juegos para memorizar", descZh: "真人发音、间隔复习和记忆游戏" },
  { mono: "trofeo", es: "Explicado en tu idioma", zh: "母语讲解", desc: "Chino, inglés, francés, alemán, neerlandés, ruso o japonés", descZh: "中文、英语、法语、德语、荷兰语、俄语或日语" },
];

export default function PromoPage() {
  const [escena, setEscena] = React.useState(0);
  const [reproduciendo, setReproduciendo] = React.useState(true);
  const [silencio, setSilencio] = React.useState(false);
  const [empezado, setEmpezado] = React.useState(false);
  const audioRef = React.useRef(null);
  const final = escena === ESCENAS.length;

  React.useEffect(() => {
    if (!reproduciendo || !empezado || final) return;
    const t = setInterval(() => setEscena((actual) => Math.min(actual + 1, ESCENAS.length)), 4200);
    return () => clearInterval(t);
  }, [reproduciendo, empezado, final]);

  // Melodía pentatónica suave con Web Audio (sin ficheros)
  React.useEffect(() => {
    if (!empezado || silencio) return;
    const Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return;
    const ctx = new Contexto();
    const osc = ctx.createOscillator();
    const ganancia = ctx.createGain();
    osc.type = "sine";
    ganancia.gain.value = 0.035;
    osc.connect(ganancia);
    ganancia.connect(ctx.destination);
    osc.start();
    const notas = [293.66, 329.63, 392, 440, 392, 329.63, 293.66, 246.94];
    let paso = 0;
    const t = setInterval(() => (osc.frequency.value = notas[paso++ % notas.length]), 900);
    audioRef.current = ctx;
    return () => {
      clearInterval(t);
      try {
        osc.stop();
        ctx.close();
      } catch {}
    };
  }, [empezado, silencio]);

  const actual = ESCENAS[escena];
  return (
    <div className="tp-promo">
      <span className="tp-acceso-luz" aria-hidden="true" />
      {!empezado ? (
        <div className="tp-promo-escena">
          <img className="tp-promo-mono" src="./mono/saluda.png" alt="" />
          <h1>
            AI Español
            <small>智能西班牙语</small>
          </h1>
          <p className="tp-promo-desc">Vídeo promocional · 宣传片</p>
          <button type="button" className="tp-btn-laca" onClick={() => setEmpezado(true)}>
            <PlayIcon size={20} aria-hidden="true" /> Reproducir · 播放
          </button>
        </div>
      ) : (
        <>
          <div className="tp-promo-barra" aria-hidden="true">
            <span style={{ width: `${(escena / ESCENAS.length) * 100}%` }} />
          </div>
          <div key={escena} className="tp-promo-escena" aria-live="polite">
            {final ? (
              <>
                <h1>
                  ¡Empieza hoy!
                  <small>今天就开始学西语！</small>
                </h1>
                <p className="tp-promo-desc">Prepárate para el DELE y habla español con confianza · 自信地说西班牙语</p>
                <div className="tp-promo-qr">
                  <img src="./images/qr-wechat.png" alt="Código QR de WeChat · 微信二维码" />
                  <b>扫码加微信 · 联系我们</b>
                  <span>Escanea para contactarnos</span>
                </div>
              </>
            ) : (
              <>
                <img className="tp-promo-mono" src={`./mono/${actual.mono}.png`} alt="" />
                <span className="tp-panel-ceja">{actual.es}</span>
                <h1>{actual.zh}</h1>
                <p className="tp-promo-desc">
                  {actual.desc}
                  <small>{actual.descZh}</small>
                </p>
              </>
            )}
          </div>
          <div className="tp-promo-mandos">
            <button type="button" onClick={() => setEscena((e) => Math.max(e - 1, 0))} disabled={escena === 0} aria-label="Anterior · 上一个">
              <SkipBackIcon size={20} />
            </button>
            <button type="button" className="grande" onClick={() => setReproduciendo((r) => !r)} aria-label={reproduciendo ? "Pausa · 暂停" : "Reproducir · 播放"}>
              {reproduciendo ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </button>
            <button type="button" onClick={() => setEscena((e) => Math.min(e + 1, ESCENAS.length))} disabled={final} aria-label="Siguiente · 下一个">
              <SkipForwardIcon size={20} />
            </button>
            <button type="button" onClick={() => setSilencio((s) => !s)} aria-label={silencio ? "Activar sonido · 打开声音" : "Silenciar · 静音"}>
              {silencio ? <VolumeXIcon size={20} /> : <Volume2Icon size={20} />}
            </button>
            <button type="button" onClick={() => (setEscena(0), setReproduciendo(true))} aria-label="Volver a empezar · 重新开始">
              <RotateCcwIcon size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
