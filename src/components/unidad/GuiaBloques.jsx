// v30 · Contenido de la Guía con jerarquía de estudio. Cada bloque de teoría se clasifica y se pinta a su manera:
//   vocabulario → fichas en cuadrícula (icono dibujado, palabra, traducción, audio)
//   frases/ejemplos → tiras con botón de audio y traducción · conjugaciones «hable, hables…» → tabla de personas
//   listas numeradas → pasos · «término: definición» → fichas de definición · resto → viñetas de regla
//   títulos → sección con sello · notas/errores/consejos → tablillas «Ojo · 注意»
// La traducción china sale del texto chino de la teoría («perro = 狗»). Doble toque → cara china (Volteable).
import * as React from "react";
import { Volume2Icon } from "lucide-react";
import { Volteable } from "../ui/Volteable.jsx";
import { speak } from "../lesson/fx.js";
import { IconoPalabra } from "./IconoPalabra.jsx";

const HAN = /\p{Script=Han}/u;
const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}]/gu;
export const NUM_ZH = ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾", "拾壹", "拾贰", "拾叁", "拾肆", "拾伍"];

// Texto con **negritas** y pronunciación «(VEIN-te)» resaltadas (sin emojis)
export function Rico({ t }) {
  const partes = String(t ?? "")
    .replace(EMOJI, "")
    .split(/(\*\*[^*]+\*\*|\([A-Za-zÁÉÍÓÚÑáéíóúñ-]*[A-ZÁÉÍÓÚÑ]{2,}[A-Za-zÁÉÍÓÚÑáéíóúñ-]*\))/g);
  return partes.map((p, i) =>
    /^\*\*.+\*\*$/.test(p) ? (
      <strong key={i} className="ud-marca">
        {p.slice(2, -2)}
      </strong>
    ) : /^\(.*-.*\)$|^\([A-ZÁÉÍÓÚÑ-]+\)$/.test(p) ? (
      <span key={i} className="ud-pron">
        {p}
      </span>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    ),
  );
}

const limpio = (s) => String(s || "").replace(/\*\*/g, "").replace(EMOJI, "").trim();
const sinParentesis = (s) => limpio(s).replace(/\s*[（(][^）)]*[）)]\s*/g, " ").trim();
const clave = (s) =>
  sinParentesis(s)
    .toLowerCase()
    .replace(/[«»"“”.,;:!?¡¿…]/g, "")
    .replace(/\s+/g, " ")
    .trim();
// «Mascotas comunes» en vez de «MASCOTAS COMUNES»
const frase = (s) => {
  const t = limpio(s);
  return t.length > 3 && t === t.toUpperCase() && /[A-ZÁÉÍÓÚÑ]{3}/.test(t) ? t.charAt(0) + t.slice(1).toLowerCase() : t;
};

// Traducción de un punto chino: «perro = 狗» → 狗 · «ladrar（狗）= 叫» → 叫（狗） · «我希望…» → tal cual
function traducir(zi) {
  const raw = limpio(zi?.raw ?? (zi ? (zi.def ? `${zi.term} = ${zi.def}` : zi.term) : ""));
  if (!raw || !HAN.test(raw)) return { k: "", tr: "" };
  const m = raw.match(/^(.*?)\s*[=＝→]\s*(.*)$/u);
  if (m && HAN.test(m[2]) && !HAN.test(sinParentesis(m[1]))) {
    const nota = (m[1].match(/[（(]([^）)]*\p{Script=Han}[^）)]*)[）)]/u) || [])[1];
    return { k: clave(m[1]), tr: nota && !m[2].includes(nota) ? `${m[2]}（${nota}）` : m[2] };
  }
  const lat = raw.match(/^([A-Za-zÁÉÍÓÚÑÜáéíóúñü¿¡'\s/,-]{2,}?)\s*[（(:：]?\s*(\p{Script=Han}.*)$/u);
  if (lat && /[a-z]/i.test(lat[1])) return { k: clave(lat[1]), tr: lat[2].replace(/[）)]$/, "") };
  return { k: "", tr: raw };
}
export function traducciones(esItems = [], zhItems = []) {
  const zs = zhItems.map(traducir);
  const mapa = new Map(zs.filter((z) => z.k).map((z) => [z.k, z.tr]));
  return esItems.map((x, i) => mapa.get(clave(x.raw ?? x.term)) || mapa.get(clave(x.term)) || (zs[i] && (!zs[i].k || zhItems.length === esItems.length) ? zs[i].tr : ""));
}

const esFrase = (t) => /[.!?…»"]$/.test(t) || /^[¿¡«"]/.test(t) || t.split(/\s+/).length >= 6;
const esConj = (t) => {
  const p = limpio(t).split(/\s*,\s*/);
  return p.length >= 4 && p.length <= 8 && p.every((x) => x && x.length <= 18 && !/\s.*\s/.test(x));
};
const PERSONAS = ["yo", "tú", "él / ella / usted", "nosotros", "vosotros", "ellos / ustedes"];

export function tipoLista(b, enEjemplos) {
  const items = b.items;
  const txt = items.map((x) => limpio(x.raw ?? x.term));
  if (items.every((x, i) => esConj(txt[i]) && !x.sub)) return "conj";
  if (enEjemplos && items.every((x) => !x.sub)) return "frases";
  if (b.ordenada) return "pasos";
  const conDef = items.filter((x) => x.def).length;
  if (items.length >= 2 && conDef <= items.length * 0.25 && items.every((x, i) => !x.sub && txt[i].length <= 40 && txt[i].split(/\s+/).length <= 5 && !esFrase(txt[i]))) return "vocab";
  if (conDef >= items.length * 0.5) return "defs";
  if (items.filter((_, i) => esFrase(txt[i])).length >= items.length * 0.7 && items.every((x) => !x.sub)) return "frases";
  return "regla";
}

// ---------- Piezas ----------
function Altavoz() {
  return (
    <span className="gx-altavoz" aria-hidden="true">
      <Volume2Icon size={16} strokeWidth={2.4} />
    </span>
  );
}

function FichaVocab({ x, tr, i }) {
  const palabra = sinParentesis(x.term);
  const nota = (limpio(x.term).match(/[（(]([^）)]+)[）)]/) || [])[1];
  return (
    <Volteable
      cara="gx-voc"
      style={{ "--i": i }}
      onToque={() => speak(palabra)}
      aria-label={`${palabra}${tr ? ` · ${tr}` : ""}. Toca para escuchar`}
      es={
        <span className="gx-in">
          <IconoPalabra espanol={palabra} chino={tr} />
          <span className="gx-voc-txt">
            <b>{palabra}</b>
            {nota && <em>{nota}</em>}
            {x.def && <em>{limpio(x.def)}</em>}
            {tr && <small lang="zh">{tr}</small>}
          </span>
          <Altavoz />
        </span>
      }
      zh={tr ? <span className="gx-voc-zh">{tr}</span> : null}
    />
  );
}

function TiraFrase({ x, tr, i }) {
  const texto = limpio(x.raw ?? x.term).replace(/^[«"]|[»"]$/g, "");
  return (
    <Volteable
      cara="gx-frase"
      style={{ "--i": i }}
      onToque={() => speak(texto.replace(/\s*[（(][^）)]*[）)]/g, ""))}
      es={
        <span className="gx-in">
          <span className="gx-frase-play" aria-hidden="true">
            <Volume2Icon size={17} strokeWidth={2.4} />
          </span>
          <span className="gx-frase-txt">
            <b>
              <Rico t={texto} />
            </b>
            {tr && <small lang="zh">{tr}</small>}
          </span>
        </span>
      }
      zh={tr ? <span className="gx-frase-zh">{tr}</span> : null}
    />
  );
}

function TiraConj({ x, tr }) {
  const formas = limpio(x.raw ?? x.term).split(/\s*,\s*/);
  const seis = formas.length === 6;
  const term = formas.every((f) => f.startsWith("-"));
  return (
    <div className={`gx-conj ${term ? "terminaciones" : ""}`}>
      {formas.map((f, k) => (
        <button key={k} type="button" className="gx-conj-celda" style={{ "--i": k }} onClick={() => !term && speak(f)} tabIndex={term ? -1 : 0}>
          {seis && <small>{PERSONAS[k]}</small>}
          <b>{term ? f : <ResaltaFinal f={f} />}</b>
        </button>
      ))}
      {tr && HAN.test(tr) && !esConj(tr) && <span className="gx-conj-tr" lang="zh">{tr}</span>}
    </div>
  );
}
// «hablemos» → habl + emos (la terminación en rojo) cuando la raíz es común
function ResaltaFinal({ f }) {
  const m = f.match(/^(.*?)(as|es|is|a|e|o|amos|emos|imos|áis|éis|ís|an|en|é|ó|aste|iste|aron|ieron|aba|ía|ará|erá|irá|aría|ería|iría)$/i);
  if (!m || m[1].length < 2) return f;
  return (
    <>
      {m[1]}
      <span className="ud-term">{m[2]}</span>
    </>
  );
}

function Paso({ x, z, n }) {
  return (
    <Volteable
      cara="gx-paso"
      style={{ "--i": n }}
      es={
        <span className="gx-in">
          <span className="gx-paso-n" translate="no" aria-hidden="true">
            {n + 1}
          </span>
          <span className="gx-paso-txt">
            <Rico t={x.raw ?? x.term} />
            {x.sub?.length > 0 && (
              <ul className="ud-sub">
                {x.sub.map((s, k) => (
                  <li key={k}>
                    <Rico t={s} />
                  </li>
                ))}
              </ul>
            )}
          </span>
        </span>
      }
      zh={z ? <span className="gx-paso-txt">{limpio(z.raw ?? z.term)}</span> : null}
    />
  );
}

function Definicion({ x, tr, z, i }) {
  return (
    <Volteable
      cara="gx-def"
      style={{ "--i": i }}
      es={
        <span className="gx-in">
          <b className="gx-def-term">
            <Rico t={x.term} />
          </b>
          <span className="gx-def-txt">
            {x.def && <Rico t={x.def} />}
            {x.sub?.length > 0 && (
              <ul className="ud-sub">
                {x.sub.map((s, k) => (
                  <li key={k}>
                    <Rico t={s} />
                  </li>
                ))}
              </ul>
            )}
            {tr && x.def && !HAN.test(x.def) && <small lang="zh">{tr}</small>}
          </span>
        </span>
      }
      zh={z ? <span className="gx-def-zh">{limpio(z.raw ?? z.term)}</span> : null}
    />
  );
}

function Vineta({ x, z }) {
  return (
    <Volteable
      cara="gx-vineta"
      es={
        <span className="gx-vineta-in">
          {x.def ? (
            <>
              <b>
                <Rico t={x.term} />
              </b>{" "}
              <span>
                <Rico t={x.def} />
              </span>
            </>
          ) : (
            <Rico t={x.term} />
          )}
          {x.sub?.length > 0 && (
            <ul className="ud-sub">
              {x.sub.map((s, k) => (
                <li key={k}>
                  <Rico t={s} />
                </li>
              ))}
            </ul>
          )}
        </span>
      }
      zh={z ? <span className="gx-vineta-in">{limpio(z.raw ?? z.term)}</span> : null}
    />
  );
}

// Celda de tabla: terminaciones «-amos» y negritas en rojo
const Celda = ({ c }) => (/^-[a-záéíóúñ]+$/i.test(c) ? <span className="ud-term">{c}</span> : <Rico t={c} />);
export function TablaConj({ filas }) {
  if (!filas?.length) return null;
  const [cab, ...cuerpo] = filas;
  return (
    <div className="ud-tabla-marco gx-tabla-marco">
      <table className="ud-tabla gx-tabla">
        <thead>
          <tr>
            {cab.map((c, i) => (
              <th key={i}>
                <Rico t={c} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cuerpo.map((r, k) => (
            <tr key={k}>
              {r.map((c, n) =>
                n === 0 ? (
                  <th key={n} scope="row">
                    <Rico t={c} />
                  </th>
                ) : (
                  <td key={n}>
                    <Celda c={c} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pares({ items, trs }) {
  return (
    <div className="gx-pares">
      {items.map((x, i) => (
        <div key={i} className={`gx-par ${x.def ? "" : "solo"}`} style={{ "--i": i }}>
          <b>
            <Rico t={x.term} />
          </b>
          {x.def && (
            <span>
              <Rico t={x.def} />
              {trs?.[i] && !HAN.test(x.def) && <small lang="zh">{trs[i]}</small>}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const TABLILLA = {
  note: { es: "Ojo", zh: "注意", sello: "注" },
  tip: { es: "Consejo", zh: "小贴士", sello: "诀" },
  error: { es: "Error típico", zh: "常见错误", sello: "误" },
};

// ---------- Bloque ----------
function Bloque({ b, z, ctx }) {
  if (b.type === "h") {
    const ejemplos = /EJEMPLO|FRASES? (DE|MODELO)|^Ejemplo/i.test(b.text);
    if (ejemplos)
      return (
        <h5 className="gx-sub-ej">
          <span>
            {frase(b.text)} · <span lang="zh">{z?.text && !/[A-Za-z]/.test(z.text) ? limpio(z.text) : "例句"}</span>
          </span>
        </h5>
      );
    if (b.nivel === 1)
      return (
        <Volteable
          as="h4"
          cara="gx-sec"
          es={
            <span className="gx-in">
              <span className="gx-sec-sello" translate="no" aria-hidden="true">
                {NUM_ZH[ctx.seccion] || ctx.seccion + 1}
              </span>
              <span className="gx-sec-txt">
                <Rico t={frase(b.text)} />
                {z?.text && <small lang="zh">{limpio(z.text)}</small>}
              </span>
            </span>
          }
          zh={z?.text ? <span className="gx-sec-txt">{limpio(z.text)}</span> : null}
        />
      );
    return (
      <Volteable
        as="h5"
        cara="gx-h2"
        es={
          <span className="gx-h2-in">
            <Rico t={frase(b.text)} />
          </span>
        }
        zh={z?.text ? <span className="gx-h2-in">{limpio(z.text)}</span> : null}
      />
    );
  }
  if (b.type === "p")
    return <Volteable cara={`gx-p ${ctx.primerP ? "gx-intro" : ""}`} es={<Rico t={b.text} />} zh={z?.text ? limpio(z.text) : null} />;
  if (b.type === "table") return <Volteable cara="gx-tabla-cara" es={<TablaConj filas={b.rows} />} zh={z?.rows ? <TablaConj filas={z.rows} /> : null} />;
  if (b.type === "pares") {
    const trs = traducciones(b.items, z?.items);
    return <Volteable cara="gx-pares-cara" es={<Pares items={b.items} trs={trs} />} zh={z?.items ? <Pares items={z.items} /> : null} />;
  }
  if (b.type === "list") {
    const tipo = tipoLista(b, ctx.enEjemplos);
    const trs = traducciones(b.items, z?.items);
    const zi = (k) => z?.items?.[k] || null;
    if (tipo === "vocab")
      return (
        <div className="gx-grid gx-vocab">
          {b.items.map((x, k) => (
            <FichaVocab key={k} x={x} tr={trs[k]} i={k} />
          ))}
        </div>
      );
    if (tipo === "frases")
      return (
        <div className="gx-grid gx-frases">
          {b.items.map((x, k) => (
            <TiraFrase key={k} x={x} tr={trs[k]} i={k} />
          ))}
        </div>
      );
    if (tipo === "conj")
      return (
        <div className="gx-grid gx-conjs">
          {b.items.map((x, k) => (
            <TiraConj key={k} x={x} tr={trs[k]} />
          ))}
        </div>
      );
    if (tipo === "pasos")
      return (
        <ol className="gx-grid gx-pasos">
          {b.items.map((x, k) => (
            <li key={k}>
              <Paso x={x} z={zi(k)} n={k} />
            </li>
          ))}
        </ol>
      );
    if (tipo === "defs")
      return (
        <div className="gx-grid gx-defs">
          {b.items.map((x, k) => (
            <Definicion key={k} x={x} tr={trs[k]} z={zi(k)} i={k} />
          ))}
        </div>
      );
    return (
      <div className="gx-grid gx-reglas">
        {b.items.map((x, k) => (
          <Vineta key={k} x={x} z={zi(k)} />
        ))}
      </div>
    );
  }
  const t = TABLILLA[b.type];
  return (
    <aside className={`gx-tablilla ${b.type}`}>
      <span className="gx-tablilla-sello" translate="no" aria-hidden="true">
        {t.sello}
      </span>
      <Volteable as="b" cara="gx-tablilla-tit" es={`${b.titulo ? frase(b.titulo) : t.es} · ${t.zh}`} zh={z?.titulo || t.zh} />
      {b.lines.slice(0, 8).map((n, k) => (
        <Volteable key={k} cara="gx-tablilla-linea" es={<Rico t={n} />} zh={z?.lines?.[k] ? limpio(z.lines[k]) : null} />
      ))}
    </aside>
  );
}

export function GuiaBloques({ bloques }) {
  let seccion = -1;
  let enEjemplos = false;
  const primerP = bloques.findIndex(([b]) => b.type === "p" && b.text.length > 50);
  return bloques.map(([b, z], i) => {
    if (b.type === "h") {
      enEjemplos = /EJEMPLO|FRASES? (DE|MODELO)|^Ejemplo/i.test(b.text);
      if (b.nivel === 1 && !enEjemplos) seccion++;
    } else if (["note", "tip", "error"].includes(b.type)) enEjemplos = false;
    const ctx = { seccion: Math.max(0, seccion), enEjemplos, primerP: i === primerP };
    return <Bloque key={i} b={b} z={z} ctx={ctx} />;
  });
}

export function tieneVocab(bloques) {
  return bloques.some(([b]) => b.type === "list" && tipoLista(b, false) === "vocab");
}
