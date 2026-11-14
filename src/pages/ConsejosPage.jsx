import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { Link } from "react-router";
import "../styles/v14-fix-recursos.css";
const SECCIONES = [
  {
    id: "general",
    title: "Consejos Generales",
    titleCn: "通用建议",
    sello: "通",
    tips: [
      {
        text: "Lee atentamente todas las instrucciones antes de empezar cada tarea.",
        textCn: "开始每项任务前，仔细阅读所有说明。",
      },
      {
        text: "Gestiona bien tu tiempo: no te quedes atascado en una sola pregunta.",
        textCn: "管理好时间：不要卡在一个问题上。",
      },
      {
        text: "Contesta primero las preguntas que te resulten más fáciles.",
        textCn: "先回答你觉得容易的问题。",
      },
      {
        text: "Revisa tus respuestas si te queda tiempo al final.",
        textCn: "如果最后有时间，检查你的答案。",
      },
      {
        text: "Mantén la calma y la confianza en ti mismo durante todo el examen.",
        textCn: "考试期间保持冷静和自信。",
      },
    ],
  },
  {
    id: "reading",
    title: "Comprensión de Lectura",
    titleCn: "阅读理解",
    sello: "读",
    tips: [
      {
        text: "Lee el título y las preguntas antes del texto para saber qué buscar.",
        textCn: "先读标题和问题，再读文章，这样知道要找什么。",
      },
      {
        text: "Subraya las palabras clave en las preguntas.",
        textCn: "在问题中划出关键词。",
      },
      {
        text: "No te preocupes si no entiendes cada palabra; intenta captar la idea general.",
        textCn: "不要担心每个词都懂；试着抓住大意。",
      },
      {
        text: 'Presta atención a los conectores: "sin embargo", "por eso", "además".',
        textCn: '注意连接词："然而"、"所以"、"此外"。',
      },
      {
        text: "Verifica que tu respuesta está respaldada por el texto, no por tu conocimiento.",
        textCn: "确保你的答案有文章支持，而不是你的常识。",
      },
    ],
  },
  {
    id: "listening",
    title: "Comprensión Auditiva",
    titleCn: "听力理解",
    sello: "听",
    tips: [
      {
        text: "Antes de escuchar, lee las opciones y anticipa el tema.",
        textCn: "听之前，先读选项并预测主题。",
      },
      {
        text: "Durante la primera escucha, enfócate en la idea general.",
        textCn: "第一遍听时，专注于大意。",
      },
      {
        text: "En la segunda escucha, busca los detalles específicos.",
        textCn: "第二遍听时，寻找具体细节。",
      },
      {
        text: "No te rindas si no entiendes algo; sigue escuchando.",
        textCn: "如果有不懂的地方不要放弃；继续听。",
      },
      {
        text: "Fíjate en las palabras de enlace y en el tono del hablante.",
        textCn: "注意连接词和说话者的语气。",
      },
    ],
  },
  {
    id: "writing",
    title: "Expresión e Interacción Escritas",
    titleCn: "书面表达与互动",
    sello: "写",
    tips: [
      {
        text: "Lee bien el enunciado y asegúrate de cumplir todos los requisitos.",
        textCn: "仔细阅读题目要求，确保满足所有条件。",
      },
      {
        text: "Haz un borrador o esquema antes de empezar a escribir.",
        textCn: "开始写作前先打草稿或列提纲。",
      },
      {
        text: "Usa conectores para estructurar bien tu texto.",
        textCn: "使用连接词来好好组织你的文章。",
      },
      {
        text: "Varía el vocabulario; no repitas las mismas palabras.",
        textCn: "变换词汇；不要重复相同的词。",
      },
      {
        text: "Revisa la ortografía, los acentos y la concordancia.",
        textCn: "检查拼写、重音和一致性。",
      },
    ],
  },
  {
    id: "speaking",
    title: "Expresión e Interacción Orales",
    titleCn: "口语表达与互动",
    sello: "说",
    tips: [
      {
        text: "Escucha atentamente las preguntas antes de responder.",
        textCn: "回答问题前仔细听问题。",
      },
      {
        text: "Organiza tus ideas: introducción, desarrollo y conclusión.",
        textCn: "组织你的想法：引言、展开和结论。",
      },
      {
        text: "Habla con claridad y a un ritmo moderado.",
        textCn: "说话清晰，语速适中。",
      },
      {
        text: "Justifica tus opiniones con ejemplos.",
        textCn: "用例子来证明你的观点。",
      },
      {
        text: "No te quedes en silencio; di algo relacionado con el tema.",
        textCn: "不要沉默；说些与主题相关的内容。",
      },
    ],
  },
  {
    id: "grammar",
    title: "Gramática y Vocabulario",
    titleCn: "语法与词汇",
    sello: "法",
    tips: [
      {
        text: "Estudia los tiempos verbales más comunes: presente, pretérito, futuro, subjuntivo.",
        textCn: "学习最常用的时态：现在时、过去时、将来时、虚拟式。",
      },
      {
        text: "Practica las preposiciones: por vs. para, ser vs. estar.",
        textCn: "练习介词：por与para，ser与estar。",
      },
      {
        text: "Aprende conectores útiles: además, sin embargo, por lo tanto, en consecuencia.",
        textCn: "学习有用的连接词：此外、然而、因此、结果。",
      },
      {
        text: "Amplía tu vocabulario leyendo en español regularmente.",
        textCn: "通过定期阅读西班牙语来扩展词汇量。",
      },
      {
        text: "Fíjate en las expresiones idiomáticas y refranes.",
        textCn: "注意习惯用语和谚语。",
      },
    ],
  },
];
function ConsejosPage() {
  const [abiertas, setAbiertas] = React.useState(new Set(["general"]));
  const alternarSeccion = (id) =>
    setAbiertas((previo) => {
      const siguiente = new Set(previo);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });
  return (
    <div className="rx-page rx-hoja gm-no-adapt">
      <div className="rx-wrap is-estrecho">
        <SectionHero
          eyebrow="Examen DELE · DELE考试"
          title="Consejos para aprobar"
          titleZh="DELE 通关技巧"
          description="Estrategias por prueba (comprensión, expresión e interacción) y errores que más penalizan en el examen."
          descriptionZh="按考试部分整理的策略，以及最容易丢分的错误。"
          actions={
            <Link className="ui-btn primary" to="/examenes/generador">
              Hacer un simulacro · 模拟考试
            </Link>
          }
        />
        <div className="rx-acc" style={{ marginTop: 8 }}>
          {SECCIONES.map((seccion) => {
            const abierta = abiertas.has(seccion.id);
            return (
              <div key={seccion.id} className={`rx-acc__item ${abierta ? "is-abierto" : ""}`}>
                <button type="button" className="rx-acc__btn" aria-expanded={abierta} aria-controls={`consejos-${seccion.id}`} onClick={() => alternarSeccion(seccion.id)}>
                  <span className="rx-sello" aria-hidden="true">
                    {seccion.sello}
                  </span>
                  <span className="rx-acc__titulo rx-h3">
                    {seccion.title}
                    <span className="rx-zh">{seccion.titleCn}</span>
                  </span>
                  <span className="rx-tag is-plano">
                    {seccion.tips.length} consejos · {seccion.tips.length} 条
                  </span>
                  <span className="rx-acc__chev" aria-hidden="true">
                    <ChevronDownIcon size={20} />
                  </span>
                </button>
                {abierta && (
                  <ol className="rx-acc__cuerpo rx-consejos" id={`consejos-${seccion.id}`}>
                    {seccion.tips.map((consejo, indice) => (
                      <li key={indice} className="rx-consejo">
                        <span className="rx-consejo__num" aria-hidden="true">
                          {indice + 1}
                        </span>
                        <div>
                          <p className="rx-texto">{consejo.text}</p>
                          <p className="rx-texto-zh">{consejo.textCn}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
        <div className="rx-card rx-consejos__final">
          <span className="rx-sello" aria-hidden="true">
            练
          </span>
          <p className="rx-h2" style={{ justifyContent: "center" }}>
            ¡La práctica hace al maestro! <span className="rx-zh">熟能生巧！</span>
          </p>
          <div className="rx-filtros" style={{ justifyContent: "center" }}>
            <Link to="/examenes" className="rx-btn">
              Ver exámenes · 查看考试
            </Link>
            <Link to="/modulos" className="rx-btn is-papel">
              Unidades · 单元
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export { ConsejosPage as default };
