const A = {
  A1: 20,
  A2: 20,
  B1: 20,
  B2: 20,
};
export const a = 80;
const r = (t) => {
  if (Array.isArray(t)) {
    return t;
  }
  return [];
};
const i = (t) => {
  if (typeof t === "string") {
    return t;
  }
  if (t == null) {
    return "";
  }
  return String(t);
};
const s = (t, e = 0) => {
  if (typeof t === "number" && Number.isFinite(t)) {
    return t;
  }
  return e;
};
export function d(t) {
  const e = i(t).trim();
  if (e) {
    return e.split(/\s+/).filter(Boolean).length;
  }
  return 0;
}
function B(t) {
  return !!t && typeof t === "object" && Array.isArray(t.pruebas);
}
function C(preguntas) {
  return r(preguntas).map((e) => {
    const o = e;
    return {
      num: s(o.id),
      enunciado: i(o.q),
      opciones: r(o.options),
      correcta: s(o.correct),
      etiqueta: o.etiqueta,
      textoAudio: o.textoAudio,
    };
  });
}
function q(t) {
  const e = i(t.recurso);
  const o = r(t.bloques);
  const a = r(t.fragmentos);
  const n = o.length > 0 || a.length > 0;
  return {
    num: s(t.tarea),
    titulo: i(t.titulo),
    instrucciones: i(t.instrucciones),
    tipo: "opcion_multiple",
    genero: i(t.tipo) || undefined,
    texto: e || null,
    tituloTexto: i(t.recursoTitulo) || null,
    palabras: e ? d(e) : null,
    material: n
      ? {
          tipo: "relacionar",
          bloques: o.length ? o : undefined,
          fragmentos: a.length ? a : undefined,
        }
      : null,
    items: C(t.preguntas),
  };
}
function P(t) {
  const guion = i(t.transcripcion);
  return {
    num: s(t.tarea),
    titulo: i(t.titulo),
    instrucciones: i(t.instrucciones),
    tipo: "opcion_multiple",
    tipoAudio: i(t.tipo) || undefined,
    guion,
    fichaTecnica: undefined,
    items: C(t.preguntas),
  };
}
function $(t) {
  const contenido = i(t.enunciado);
  return {
    num: s(t.tarea),
    titulo: i(t.titulo),
    instrucciones: i(t.instrucciones),
    tipo: "expresion_escrita",
    puntosGuia: r(t.puntos).map(i),
    minPalabras: s(t.minimo),
    maxPalabras: s(t.maximo),
    material: contenido
      ? {
          tipo: "texto",
          contenido,
          palabras: d(contenido),
        }
      : null,
  };
}
function E(t) {
  const t_escena = t.escena;
  return {
    num: s(t.tarea),
    titulo: i(t.titulo),
    tiempo: i(t.duracion) || undefined,
    instrucciones: i(t.instrucciones),
    opciones: r(t.opciones).map(i),
    puntosGuia: r(t.puntos).map(i),
    foto: t_escena ? `${i(t_escena.titulo)} — ${i(t_escena.descripcion)}` : null,
    cuadernilloCandidato: i(t.instrucciones) || undefined,
    situacion: i(t.situacion) || undefined,
    escena: t_escena,
    encuesta: t.encuesta || undefined,
  };
}
function y(t, e) {
  const o = t.lectura?.items ?? [];
  const a = t.audicion?.items ?? [];
  const n = t.escritura?.items ?? [];
  const c = t.oral?.items ?? [];
  const p = [
    {
      prueba: 1,
      nombre: "Comprensión de lectura",
      duracion: t.lectura?.minutos,
      tareas: o.map(q),
    },
    {
      prueba: 2,
      nombre: "Comprensión auditiva",
      duracion: t.audicion?.minutos,
      tareas: a.map(P),
    },
    {
      prueba: 3,
      nombre: "Expresión e interacción escritas",
      duracion: t.escritura?.minutos,
      tareas: n.map($),
    },
    {
      prueba: 4,
      nombre: "Expresión e interacción orales",
      tareas: c.map(E),
    },
  ];
  return {
    nivel: String(t.level || e).toUpperCase(),
    modelo: s(t.id),
    codigo: `${String(t.level || e).toUpperCase()}-${String(t.id).padStart(2, "0")}`,
    titulo: i(t.titulo),
    temaCentral: i(t.tema),
    ambito: i(t.dominio) || undefined,
    matriz: {
      generosLectura: o.map((m) => i(m.tipo)).filter(Boolean),
      tiposAudio: a.map((m) => i(m.tipo)).filter(Boolean),
    },
    pruebas: p,
    claves: L(p),
    evaluacion: S(String(t.level || e).toUpperCase()),
  };
}
function L(t) {
  const e = (o) =>
    r(t.find((a) => a.prueba === o)?.tareas).map((a) => ({
      tarea: a.num,
      items: r(a.items).map((n) => ({
        num: n.num,
        correcta: n.correcta,
        justificacion: n.justificacion,
        fraseSoporte: n.fraseSoporte,
      })),
    }));
  return {
    lectura: e(1),
    auditiva: e(2),
  };
}
function S(t) {
  const e = String(t || "").toUpperCase();
  return {
    grupo1: {
      pruebas: [1, 3],
      max: 50,
      minimo: 30,
    },
    grupo2: {
      pruebas: [2, 4],
      max: 50,
      minimo: 30,
    },
    total: 100,
    criterio: `APTO si se obtienen ≥30,00 puntos en cada grupo (nivel ${e || "DELE"})`,
  };
}
function T(t, e) {
  if (B(t)) {
    const o = t;
    const a = r(o.pruebas)
      .map((n) => ({
        ...n,
        tareas: r(n.tareas),
      }))
      .sort((n, c) => s(n.prueba) - s(c.prueba));
    return {
      ...o,
      nivel: String(o.nivel || e).toUpperCase(),
      modelo: s(o.modelo),
      codigo: o.codigo || `${String(o.nivel || e).toUpperCase()}-${String(s(o.modelo)).padStart(2, "0")}`,
      titulo: i(o.titulo),
      temaCentral: i(o.temaCentral),
      pruebas: a,
      claves: o.claves && (o.claves.lectura || o.claves.auditiva) ? o.claves : L(a),
      evaluacion: o.evaluacion || S(String(o.nivel || e)),
    };
  }
  return y(t, e);
}
function D(t, e) {
  return r(t).map((o) => T(o, e));
}
export function c(t, e) {
  return r(t.pruebas).find((o) => o.prueba === e);
}
function h(t, e) {
  return r(c(t, e)?.tareas).flatMap((o) => r(o.items));
}
function U(t) {
  const e = c(t, 1);
  const o = c(t, 2);
  const a = c(t, 3);
  const n = c(t, 4);
  return {
    id: t.modelo,
    codigo: t.codigo || `${t.nivel}-${String(t.modelo).padStart(2, "0")}`,
    nivel: t.nivel,
    tema: t.temaCentral,
    titulo: t.titulo,
    ambito: typeof t.ambito === "string" ? t.ambito : undefined,
    lectura: {
      tareas: r(e?.tareas).length,
      preguntas: h(t, 1).length,
      minutos: s(e?.duracion),
    },
    audicion: {
      tareas: r(o?.tareas).length,
      preguntas: h(t, 2).length,
      minutos: s(o?.duracion),
    },
    escritura: {
      tareas: r(a?.tareas).length,
      minutos: s(a?.duracion),
    },
    oral: {
      tareas: r(n?.tareas).length,
      minutos: s(n?.duracion),
      preparacion: s(n?.preparacion),
    },
    generosLectura: r(t.matriz?.generosLectura).length
      ? r(t.matriz?.generosLectura)
      : r(e?.tareas)
          .map((c) => i(c.genero))
          .filter(Boolean),
    tiposAudio: r(t.matriz?.tiposAudio).length
      ? r(t.matriz?.tiposAudio)
      : r(o?.tareas)
          .map((c) => i(c.tipoAudio || c.genero))
          .filter(Boolean),
    variedadesAudio: r(t.matriz?.variedadesAudio).filter(Boolean),
  };
}
const b = /\[([^\]]+)\]/g;
function M(t) {
  return /^\s*(VOZ|voz)\b/i.test(t);
}
function z(etiqueta) {
  const e = etiqueta.toLowerCase();
  if (M(etiqueta)) {
    return "locucion";
  }
  if (I(etiqueta)) {
    return "texto";
  }
  if (/pausa|silencio/.test(e)) {
    return "pausa";
  }
  if (/ruido|sonido|m[uú]sica|ambiente|fondo/.test(e)) {
    return "ruido";
  }
  return "texto";
}
function I(t) {
  return /^\s*(AUDIO|PISTA|CLIP)\s*\d+/i.test(t);
}
function Z(t) {
  const e = i(t).trim();
  if (!e) {
    return [];
  }
  const o = /\[(AUDIO|PISTA|CLIP)\s*\d+/i.test(e);
  const a = [];
  let n = null;
  let c = 0;
  b.lastIndex = 0;
  let p;
  const m = (u) => {
    const texto = u.trim();
    if (texto) {
      if (n) {
        n.texto = `${n.texto}
${texto}`.trim();
      } else {
        n = {
          etiqueta: "Locución",
          texto,
          tipo: "locucion",
        };
        a.push(n);
      }
    }
  };
  while ((p = b.exec(e)) !== null) {
    m(e.slice(c, p.index));
    c = p.index + p[0].length;
    const etiqueta = p[1].trim();
    const l = I(etiqueta);
    const tipo = z(etiqueta);
    if (l || (tipo === "locucion" && !o)) {
      n = {
        etiqueta,
        texto: "",
        tipo: "locucion",
      };
      a.push(n);
    } else if (tipo === "pausa" || tipo === "ruido") {
      if (n) {
        n.texto = `${n.texto}
[${etiqueta}]`.trim();
      } else {
        n = {
          etiqueta: `[${etiqueta}]`,
          texto: "",
          tipo,
        };
        a.push(n);
      }
    } else if (n) {
      n.texto = `${n.texto}
[${etiqueta}]`.trim();
    } else {
      n = {
        etiqueta: `[${etiqueta}]`,
        texto: "",
        tipo: "texto",
      };
      a.push(n);
    }
  }
  m(e.slice(c));
  if (a.filter((u) => u.tipo === "locucion").length <= 1 && a.length <= 1) {
    const u = e
      .split(/\n{2,}/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (u.length > 1) {
      return u.map((texto, d) => ({
        etiqueta: `Parte ${d + 1}`,
        texto,
        tipo: "locucion",
      }));
    }
  }
  return a.filter((u) => u.texto.trim() || u.tipo === "locucion");
}
function V(t) {
  const e = t?.duracionS ?? t?.duracion_s ?? t?.duracionEstimadaS;
  if (typeof e === "number" && Number.isFinite(e)) {
    return e;
  }
  return null;
}
function J(t) {
  return r(t)
    .filter((e) => i(e?.transcripcion).trim())
    .map((e, o) => {
      const a = V(e);
      return {
        etiqueta: `AUDIO ${e?.n ?? o + 1}${a ? ` · ${a} s` : ""}`,
        texto: i(e.transcripcion),
        tipo: "locucion",
      };
    });
}
function K(t) {
  return i(t?.queHace ?? t?.que_hace);
}
export function n(t) {
  return r(t?.preguntasApoyo ?? t?.preguntas_apoyo).map(i);
}
function N(t) {
  return i(t?.siSeBloquea ?? t?.si_se_bloquea);
}
export function o(t) {
  const e = r(t);
  return e.length > 3 && e.every((o) => /^[A-L]$/.test(i(o)));
}
export function k(t) {
  return i(t)
    .replace(b, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(
      /\n{3,}/g,
      `

`,
    )
    .trim();
}
export function g(t) {
  return String.fromCharCode(65 + t);
}
export function e(t) {
  const e = i(t).toLowerCase();
  return (
    {
      personal: "Personal",
      publico: "Público",
      educativo: "Educativo",
      profesional: "Profesional",
    }[e] || (e ? e.charAt(0).toUpperCase() + e.slice(1) : "")
  );
}
export function f(t) {
  return r(t).some((e) => r(e?.bandas).length > 0 || !!e?.criterio);
}
function tt(t) {
  return !!t && (r(t.fases).length > 0 || n(t).length > 0 || !!N(t));
}
const R = ["A1", "A2", "B1", "B2"];
const j = {
  A1: () => import("../data/oficial/oficial-a1.js").then((t) => t.oficiala1),
  A2: () => import("../data/oficial/oficial-a2.js").then((t) => t.oficiala2),
  B1: () => import("../data/oficial/oficial-b1.js").then((t) => t.oficialb1),
  B2: () => import("../data/oficial/oficial-b2.js").then((t) => t.oficialb2),
};
const et = {
  A1: A.A1,
  A2: A.A2,
  B1: A.B1,
  B2: A.B2,
};
const _ = new Map();
function G(t) {
  return R.includes(String(t).toUpperCase());
}
function v(t) {
  const e = String(t).toUpperCase();
  if (!G(e)) {
    return Promise.resolve([]);
  }
  let o = _.get(e);
  if (!o) {
    o = j[e]()
      .then((a) => D(a, e))
      .catch(() => []);
    _.set(e, o);
  }
  return o;
}
async function it(t, e) {
  return (await v(t)).find((a) => a.modelo === e) ?? null;
}
async function nt(t) {
  return (await v(t)).map(U);
}
function at(t) {
  v(t);
}
export { et as T, it as b, J as h, G as i, Z as j, nt as l, tt as m, at as p, K as q, U as r, N as s };
