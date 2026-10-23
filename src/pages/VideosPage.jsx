import { YoutubeIcon, ArrowLeftIcon, PlayIcon, FunnelIcon, ExternalLinkIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
const g = [
  {
    id: "v1",
    titulo: "Entrevistas en la calle",
    canal: "Easy Spanish",
    canalHandle: "@EasySpanish",
    query: "Easy Spanish street interview beginners",
    nivel: "A2",
    acento: "México",
    tema: "Conversación real",
    descripcion: "Entrevistas reales a gente por la calle con subtítulos en español e inglés.",
  },
  {
    id: "v2",
    titulo: "Español desde cero (comprensible)",
    canal: "Dreaming Spanish",
    canalHandle: "@DreamingSpanish",
    query: "Dreaming Spanish superbeginner",
    nivel: "A1",
    acento: "España",
    tema: "Input comprensible",
    descripcion: "Vídeos de input comprensible para principiantes absolutos, sin estudiar gramática.",
  },
  {
    id: "v3",
    titulo: "Historias en español real",
    canal: "Español con Juan",
    canalHandle: "@espanolconjuan",
    query: "Español con Juan historia",
    nivel: "B1",
    acento: "España",
    tema: "Historias",
    descripcion: "Juan cuenta historias reales y divertidas en español natural de España.",
  },
  {
    id: "v4",
    titulo: "Entrevistas y listening",
    canal: "Why Not Spanish?",
    canalHandle: "@whynotspanish",
    query: "Why Not Spanish entrevista",
    nivel: "B1",
    acento: "Colombia",
    tema: "Entrevistas",
    descripcion: "María y Cody hacen ejercicios de listening y entrevistas en español colombiano.",
  },
  {
    id: "v5",
    titulo: "Lecciones de gramática y vocabulario",
    canal: "Butterfly Spanish",
    canalHandle: "@ButterflySpanish",
    query: "Butterfly Spanish lesson beginners",
    nivel: "A1",
    acento: "México",
    tema: "Gramática",
    descripcion: "Ana explica gramática y vocabulario con claridad, en español mexicano.",
  },
  {
    id: "v6",
    titulo: "Conversaciones de la vida diaria",
    canal: "Lightspeed Spanish",
    canalHandle: "@LightSpeedSpanish",
    query: "Lightspeed Spanish conversation",
    nivel: "B2",
    acento: "España",
    tema: "Conversación",
    descripcion: "Gordon y Cynthia hablan de temas cotidianos en español de España.",
  },
  {
    id: "v7",
    titulo: "Vlogs y cultura mexicana",
    canal: "Superholly",
    canalHandle: "@Superholly",
    query: "Superholly español vlog",
    nivel: "B1",
    acento: "México",
    tema: "Vlogs",
    descripcion: "Holly habla de cultura, idiomas y su vida en México y EE.UU.",
  },
  {
    id: "v8",
    titulo: "Entrevistas callejeras España",
    canal: "Easy Spanish",
    canalHandle: "@EasySpanish",
    query: "Easy Spanish Madrid street interview",
    nivel: "B1",
    acento: "España",
    tema: "Conversación real",
    descripcion: "Entrevistas reales en las calles de Madrid con subtítulos.",
  },
  {
    id: "v9",
    titulo: "Español argentino auténtico",
    canal: "Dustin Luke",
    canalHandle: "@DustinLuke",
    query: "Dustin Luke español argentino",
    nivel: "B2",
    acento: "Argentina",
    tema: "Cultura",
    descripcion: "Un estadounidense que habla español argentino perfecto explica la cultura rioplatense.",
  },
  {
    id: "v10",
    titulo: "Diálogos básicos con audio lento",
    canal: "SpanishPod101",
    canalHandle: "@SpanishPod101com",
    query: "SpanishPod101 listening comprehension beginner",
    nivel: "A1",
    acento: "Varios",
    tema: "Listening",
    descripcion: "Diálogos lentos y comprensión auditiva para principiantes.",
  },
  {
    id: "v11",
    titulo: "Noticias en español lento",
    canal: "News in Slow Spanish",
    canalHandle: "@NewsInSlowSpanish",
    query: "News in Slow Spanish latino",
    nivel: "B2",
    acento: "Varios",
    tema: "Noticias",
    descripcion: "Noticias de actualidad habladas despacio para estudiantes avanzados.",
  },
  {
    id: "v12",
    titulo: "Conversaciones colombianas",
    canal: "Spanishland School",
    canalHandle: "@SpanishlandSchool",
    query: "Spanishland School listening colombiano",
    nivel: "B1",
    acento: "Colombia",
    tema: "Listening",
    descripcion: "Andrea explica vocabulario y hace ejercicios de escucha en español colombiano.",
  },
  {
    id: "v13",
    titulo: "Frases y pronunciación",
    canal: "Bilingue Blogs",
    canalHandle: "@BilingueBlogs",
    query: "Bilingue Blogs pronunciación español",
    nivel: "A2",
    acento: "México",
    tema: "Pronunciación",
    descripcion: "Pronunciación y frases útiles explicadas con calma.",
  },
  {
    id: "v14",
    titulo: "Cocina y recetas en español",
    canal: "De mi Rancho a Tu Cocina",
    canalHandle: "@DeMiRanchoATuCocina",
    query: "De mi Rancho a tu Cocina receta",
    nivel: "B1",
    acento: "México",
    tema: "Cocina",
    descripcion: "La abuela Ángela cocina recetas mexicanas reales en su rancho. Español natural.",
  },
  {
    id: "v15",
    titulo: "Vlogs de viajes en español",
    canal: "Luisito Comunica",
    canalHandle: "@LuisitoComunica",
    query: "Luisito Comunica vlog",
    nivel: "B2",
    acento: "México",
    tema: "Viajes",
    descripcion: "El youtuber mexicano más famoso viaja por el mundo hablando español rápido y real.",
  },
  {
    id: "v16",
    titulo: "Español para el examen DELE",
    canal: "Academia Eureka",
    canalHandle: "@AcademiaEureka",
    query: "DELE B2 examen oral ejemplo",
    nivel: "B2",
    acento: "España",
    tema: "DELE",
    descripcion: "Ejemplos y consejos para las pruebas orales del examen DELE.",
  },
];
const y = ["Todos", "A1", "A2", "B1", "B2"];
const v = ["Todos", "España", "México", "Colombia", "Argentina", "Varios"];
const n = {
  España: "#ff6b35",
  México: "#39ff14",
  Colombia: "#ffd600",
  Argentina: "#66e7ff",
  Varios: "#c084fc",
};
function NComponent() {
  const [s, setS] = React.useState("Todos");
  const [i, setI] = React.useState("Todos");
  const l = React.useMemo(
    () => g.filter((a) => (s === "Todos" || a.nivel === s) && (i === "Todos" || a.acento === i)),
    [s, i],
  );
  return (
    <StarfieldBackground>
      <div className="max-w-6xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors mb-6 text-sm font-bold"
        >
          <ArrowLeftIcon size={16} /> Volver / 返回
        </Link>
        <div className="fx-section-head mt-2">
          <span
            className="fx-kicker"
            style={{
              color: "#ff6b6b",
              borderColor: "rgba(255,56,96,.4)",
              background: "rgba(255,56,96,.08)",
              boxShadow: "0 0 22px rgba(255,56,96,.16)",
            }}
          >
            <YoutubeIcon size={13} />
            Vídeos en español real · 真实西语视频
          </span>
          <h1 className="fx-title text-4xl md:text-6xl font-black mb-2">Conversaciones y acentos</h1>
          <p className="text-white/50 text-lg">
            Escucha español real de España, México, Colombia y Argentina
          </p>
          <div className="fx-underline" />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {y.map((a) => (
            <button
              key={a}
              onClick={() => setS(a)}
              className="px-4 py-1.5 rounded-full text-xs font-black transition-all"
              style={
                s === a
                  ? {
                      background: "rgba(255,56,96,.2)",
                      border: "1px solid rgba(255,56,96,.5)",
                      color: "#ff6b6b",
                    }
                  : {
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.1)",
                      color: "rgba(255,255,255,.5)",
                    }
              }
            >
              {a}
            </button>
          ))}
          <span className="mx-2 self-center text-white/20">|</span>
          {v.map((a) => (
            <button
              key={a}
              onClick={() => setI(a)}
              className="px-4 py-1.5 rounded-full text-xs font-black transition-all"
              style={
                i === a
                  ? {
                      background: `${n[a] || "#fff"}20`,
                      border: `1px solid ${n[a] || "#fff"}55`,
                      color: n[a] || "#fff",
                    }
                  : {
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.1)",
                      color: "rgba(255,255,255,.5)",
                    }
              }
            >
              {a}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fx-stagger">
          {l.map((a) => (
            <div
              key={a.id}
              className="fx-card fx-tilt p-5 flex flex-col"
              data-fx-tilt-max="4"
              style={{
                "--fx-accent": n[a.acento] || "#ff3860",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-md"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    color: "rgba(255,255,255,.6)",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  {a.nivel}
                </span>
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-md"
                  style={{
                    background: `${n[a.acento] || "#fff"}18`,
                    color: n[a.acento] || "#fff",
                    border: `1px solid ${n[a.acento] || "#fff"}40`,
                  }}
                >
                  {a.acento}
                </span>
              </div>
              <h3 className="text-white font-black mb-1">{a.titulo}</h3>
              <p className="text-white/40 text-xs font-bold mb-2">
                {a.canal} · {a.tema}
              </p>
              <p className="text-white/55 text-xs leading-relaxed flex-1 mb-4">{a.descripcion}</p>
              <div className="flex gap-2">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(a.query)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-black transition-transform hover:scale-105"
                  style={{
                    background: "rgba(255,56,96,.2)",
                    border: "1px solid rgba(255,56,96,.4)",
                    color: "#ff6b6b",
                  }}
                >
                  <PlayIcon size={13} /> Ver vídeos
                </a>
                {a.canalHandle && (
                  <a
                    href={`https://www.youtube.com/${a.canalHandle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2.5 rounded-xl text-xs font-black transition-transform hover:scale-105 flex items-center gap-1.5"
                    style={{
                      background: "rgba(255,255,255,.05)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "rgba(255,255,255,.6)",
                    }}
                  >
                    <ExternalLinkIcon size={12} /> Canal
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        {l.length === 0 && (
          <p className="text-center text-white/30 py-10">
            <FunnelIcon size={24} className="mx-auto mb-2 opacity-30" /> Sin resultados / 无结果
          </p>
        )}
      </div>
    </StarfieldBackground>
  );
}
export { NComponent as default };
