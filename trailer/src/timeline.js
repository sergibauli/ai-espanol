// Orden y duración de las escenas (segundos). 120 BPM: 1 pulso = 0,5 s; los cortes caen en pulso.
export const FPS = 30;
export const W = 1080, H = 1920;
export const SCENES = [
  { id: "s1-hook",     duration: 4 },
  { id: "s2-puerta",   duration: 6 },
  { id: "s3-vuelo",    duration: 6 },
  { id: "s4-unidades", duration: 6 },
  { id: "s5-dele",     duration: 6 },
  { id: "s6-ia",       duration: 6 },
  { id: "s7-final",    duration: 8 },
];
let acc = 0;
for (const s of SCENES) { s.start = acc; acc += s.duration; }
export const TOTAL = acc;
