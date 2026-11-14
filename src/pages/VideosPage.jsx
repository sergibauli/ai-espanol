import { PlayIcon, FunnelIcon, ExternalLinkIcon } from "lucide-react";
import * as React from "react";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import "../styles/v14-fix-recursos.css";
const VIDEOS = [
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
const NIVELES = ["Todos", "A1", "A2", "B1", "B2"];
const ACENTOS = ["Todos", "España", "México", "Colombia", "Argentina", "Varios"];
const ACENTO_ZH = { Todos: "全部", España: "西班牙", México: "墨西哥", Colombia: "哥伦比亚", Argentina: "阿根廷", Varios: "多种" };
const claseAcento = (acento) => `rx-ac-${acento.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`;
function VideosPage() {
  const [nivel, setNivel] = React.useState("Todos");
  const [acento, setAcento] = React.useState("Todos");
  const filtrados = React.useMemo(
    () => VIDEOS.filter((video) => (nivel === "Todos" || video.nivel === nivel) && (acento === "Todos" || video.acento === acento)),
    [nivel, acento],
  );
  const limpiar = () => {
    setNivel("Todos");
    setAcento("Todos");
  };
  return (
    <div className="rx-page rx-hoja gm-no-adapt">
      <div className="rx-wrap">
        <SectionHero
          eyebrow="Vídeos · 视频"
          title="Conversaciones y acentos"
          titleZh="真实西语视频"
          description="Español real de España, México, Colombia y Argentina, ordenado por nivel y acento."
          descriptionZh="来自西班牙、墨西哥、哥伦比亚和阿根廷的真实西语，按级别和口音分类。"
          stats={[{ value: VIDEOS.length, label: "canales y listas · 个频道" }]}
        />
        <div className="rx-videos__filtros" role="group" aria-label="Filtros · 筛选">
          <div className="rx-filtros">
            <p className="rx-filtros__titulo">Nivel · 级别</p>
            {NIVELES.map((opcion) => (
              <button key={opcion} type="button" aria-pressed={nivel === opcion} onClick={() => setNivel(opcion)} className={`rx-chip ${opcion !== "Todos" ? `rx-nv-${opcion}` : ""}`}>
                {opcion === "Todos" ? "Todos · 全部" : opcion}
              </button>
            ))}
          </div>
          <div className="rx-filtros">
            <p className="rx-filtros__titulo">Acento · 口音</p>
            {ACENTOS.map((opcion) => (
              <button key={opcion} type="button" aria-pressed={acento === opcion} onClick={() => setAcento(opcion)} className="rx-chip">
                {opcion} <small>{ACENTO_ZH[opcion]}</small>
              </button>
            ))}
          </div>
        </div>
        <p className="rx-videos__cuenta" role="status">
          {filtrados.length} {filtrados.length === 1 ? "canal" : "canales"} · {filtrados.length} 个频道
        </p>
        {filtrados.length > 0 ? (
          <div className="rx-grid">
            {filtrados.map((video) => (
              <article key={video.id} className={`rx-card is-interactiva is-video ${claseAcento(video.acento)}`}>
                <div className="rx-video__cabeza">
                  <span className={`rx-tag rx-nv-${video.nivel}`}>{video.nivel}</span>
                  <span className="rx-tag is-acento">
                    {video.acento} · {ACENTO_ZH[video.acento]}
                  </span>
                </div>
                <h3 className="rx-video__titulo">{video.titulo}</h3>
                <p className="rx-video__canal">
                  {video.canal} · {video.tema}
                </p>
                <p className="rx-video__desc">{video.descripcion}</p>
                <div className="rx-video__acciones">
                  <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.query)}`} target="_blank" rel="noreferrer" className="rx-btn is-mini">
                    <PlayIcon size={16} aria-hidden="true" /> Ver vídeos · 看视频
                  </a>
                  {video.canalHandle && (
                    <a href={`https://www.youtube.com/${video.canalHandle}`} target="_blank" rel="noreferrer" className="rx-btn is-papel is-mini" aria-label={`Canal ${video.canal} · 频道`}>
                      <ExternalLinkIcon size={16} aria-hidden="true" /> Canal · 频道
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rx-vacio" role="status">
            <span className="rx-sello" aria-hidden="true">无</span>
            <p>
              No hay vídeos con estos filtros
              <span>没有符合筛选条件的视频</span>
            </p>
            <button type="button" className="rx-btn is-oro" onClick={limpiar}>
              <FunnelIcon size={16} aria-hidden="true" /> Quitar filtros · 清除筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export { VideosPage as default };
