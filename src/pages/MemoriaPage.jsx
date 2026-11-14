import { RefreshCwIcon, TrophyIcon, XIcon, DownloadIcon, Trash2Icon, LayersIcon, TargetIcon, CheckIcon, Volume2Icon, BookOpenIcon, LibraryIcon, EyeIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { speak } from "../components/lesson/fx.js";
import "../styles/v14-fix-recursos.css";
import { useFavorites } from "../lib/favorites.js";
import { getSrsStats, getDueSrsCards, getSrsCards, SRS_BOX_LABELS_ES, SRS_BOX_LABELS_ZH, removeSrsCard, reviewSrsCard, importSrsCards } from "../lib/srs.js";

// Repaso espaciado (cajas de Leitner: 1, 3, 7, 14 y 30 días) con la estética imperial
function MemoriaPage() {
  const { favorites } = useFavorites();
  const [version, setVersion] = React.useState(0);
  const [revelada, setRevelada] = React.useState(false);
  const [repasadas, setRepasadas] = React.useState(0);
  const [aviso, setAviso] = React.useState("");
  const stats = React.useMemo(() => getSrsStats(), [version]);
  const pendientes = React.useMemo(() => getDueSrsCards(), [version]);
  const tarjetas = React.useMemo(() => getSrsCards(), [version]);
  const actual = pendientes[0] ?? null;
  const refrescar = React.useCallback(() => setVersion((v) => v + 1), []);

  const responder = (laSabia) => {
    if (!actual) return;
    reviewSrsCard(actual.word, laSabia);
    setRevelada(false);
    setRepasadas((n) => n + 1);
    refrescar();
  };
  const importarFavoritos = () => {
    const importadas = importSrsCards(favorites.map((fav) => ({ word: fav.word, chinese: fav.chinese, source: fav.source, level: fav.level })));
    refrescar();
    setAviso(`Importadas ${importadas} palabras · 已导入 ${importadas} 个单词`);
  };

  // Atajos: espacio = mostrar; 1 = no lo sabía; 2 = lo sabía
  React.useEffect(() => {
    if (!actual) return undefined;
    const alPulsar = (e) => {
      if (e.target.closest("input, textarea, button, a")) return;
      if (e.key === " ") (e.preventDefault(), setRevelada(true));
      else if (revelada && e.key === "1") responder(false);
      else if (revelada && e.key === "2") responder(true);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  });

  const cifras = [
    { es: "Total", zh: "总数", valor: stats.total, icono: LayersIcon, sello: "总" },
    { es: "Pendientes", zh: "待复习", valor: stats.due, icono: TargetIcon, sello: "待", destacado: stats.due > 0 },
    { es: "Aprendiendo", zh: "学习中", valor: stats.learning, icono: RefreshCwIcon, sello: "学" },
    { es: "Dominadas", zh: "已掌握", valor: stats.mastered, icono: TrophyIcon, sello: "熟" },
  ];
  const porCaja = SRS_BOX_LABELS_ES.map((_, caja) => tarjetas.filter((t) => t.box === caja).length);

  return (
    <div className="jd-legacy gm-no-adapt rx-page rx-hoja">
      <SectionHero
        eyebrow="Repaso inteligente · 记忆复习"
        title="Repaso espaciado"
        titleZh="间隔重复记忆"
        description="Guarda palabras desde las unidades y el diccionario: te las pregunto justo antes de que las olvides (1, 3, 7, 14 y 30 días)."
        descriptionZh="从单元和词典收藏单词，系统会在你快忘记时提醒复习。"
        mascota="serio"
      />

      <div className="jd-cifras">
        {cifras.map((cifra) => (
          <div key={cifra.es} className={`jd-cifra${cifra.destacado ? " is-destacada" : ""}`}>
            <span className="jd-cifra__sello" translate="no" aria-hidden="true">
              {cifra.sello}
            </span>
            <b>{cifra.valor}</b>
            <span>
              <cifra.icono size={14} aria-hidden="true" /> {cifra.es} · {cifra.zh}
            </span>
          </div>
        ))}
      </div>

      <section className="jd-repaso" aria-label="Tarjeta de repaso · 复习卡">
        {actual ? (
          <>
            <div className="jd-repaso__cabeza">
              <span className="jd-chip jd-chip--laca">
                Quedan {pendientes.length} para hoy · 今天还剩 {pendientes.length} 个
              </span>
              {repasadas > 0 && (
                <span className="jd-chip">
                  <CheckIcon size={13} /> {repasadas} repasadas · 已复习
                </span>
              )}
            </div>
            <div className="jd-ficha">
              <span className="jd-pergamino__rodillo is-arriba" aria-hidden="true" />
              <button type="button" className={`jd-ficha__cuerpo${revelada ? " is-revelada" : ""}`} onClick={() => setRevelada(true)} aria-expanded={revelada}>
                <span className="jd-ficha__meta">
                  {[actual.source, actual.level].filter(Boolean).join(" · ")} · {SRS_BOX_LABELS_ES[actual.box]} · {SRS_BOX_LABELS_ZH[actual.box]}
                </span>
                <span className="jd-ficha__palabra">{actual.word}</span>
                {revelada ? (
                  <span className="jd-ficha__zh">{actual.chinese}</span>
                ) : (
                  <span className="jd-ficha__pista">
                    <EyeIcon size={16} aria-hidden="true" /> Toca para ver el significado · 点击显示意思
                  </span>
                )}
              </button>
              <span className="jd-pergamino__rodillo is-abajo" aria-hidden="true" />
              <button type="button" className="jd-ficha__audio" onClick={() => speak(actual.word)} aria-label="Escuchar · 听">
                <Volume2Icon size={20} />
              </button>
            </div>
            {revelada ? (
              <div className="jd-repaso__botones">
                <button type="button" className="jd-btn-laca" onClick={() => responder(false)}>
                  <XIcon size={18} /> No lo sabía · 忘了
                </button>
                <button type="button" className="jd-btn-jade" onClick={() => responder(true)}>
                  <CheckIcon size={18} /> Lo sabía · 记得
                </button>
              </div>
            ) : (
              <p className="jd-repaso__atajos">Atajos: espacio = mostrar · 1 = no lo sabía · 2 = lo sabía · 快捷键：空格显示，1 忘了，2 记得</p>
            )}
          </>
        ) : (
          <div className="jd-al-dia">
            <img src={`./mono/${stats.total ? "trofeo" : "saluda"}.png`} alt="" />
            <div>
              <h2>{stats.total ? "¡Todo al día! · 全部复习完成！" : "Tu baúl de palabras está vacío · 还没有单词"}</h2>
              <p>
                {stats.total
                  ? "Vuelve cuando toque el siguiente repaso: lo programo yo solo."
                  : "Guarda palabras con la estrella en las unidades o en el diccionario y aparecerán aquí."}
                <span>{stats.total ? "下次复习时间到了再回来，系统会自动安排。" : "在单元或词典里点星标收藏单词，它们就会出现在这里。"}</span>
              </p>
              <div className="jd-al-dia__acciones">
                <Link to="/diccionarios" className="jd-btn-oro">
                  <BookOpenIcon size={17} /> Diccionario · 词典
                </Link>
                <Link to="/modulos" className="jd-btn-papel">
                  <LibraryIcon size={17} /> Unidades · 单元
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {favorites.length > 0 && (
        <div className="jd-importar">
          <button type="button" className="jd-btn-papel" onClick={importarFavoritos}>
            <DownloadIcon size={17} /> Importar favoritos · 导入收藏 ({favorites.length})
          </button>
          {aviso && (
            <span className="jd-importar__aviso" role="status">
              {aviso}
            </span>
          )}
        </div>
      )}

      <section className="jd-cajas" aria-labelledby="jd-cajas-titulo">
        <h2 id="jd-cajas-titulo" className="jd-h3">
          <LayersIcon size={18} /> Cajas de repaso · 复习盒
        </h2>
        <ol className="jd-cajas__lista">
          {porCaja.map((cuantas, caja) => (
            <li key={caja} className={cuantas ? "is-llena" : ""}>
              <b>{cuantas}</b>
              <span>{SRS_BOX_LABELS_ES[caja]}</span>
              <small>{SRS_BOX_LABELS_ZH[caja]}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="jd-palabras" aria-labelledby="jd-palabras-titulo">
        <h2 id="jd-palabras-titulo" className="jd-h3">
          Tus palabras · 你的单词 <span className="jd-chip">{tarjetas.length}</span>
        </h2>
        {tarjetas.length === 0 ? (
          <p className="jd-palabras__vacio">Aún no hay palabras. Añádelas desde las unidades o importa tus favoritos. · 还没有单词，请从单元添加或导入收藏。</p>
        ) : (
          <ul className="jd-palabras__lista">
            {tarjetas.map((tarjeta) => (
              <li key={tarjeta.word}>
                <button type="button" className="jd-palabras__oir" onClick={() => speak(tarjeta.word)} aria-label={`Escuchar ${tarjeta.word} · 听`}>
                  <Volume2Icon size={16} />
                </button>
                <div className="jd-palabras__texto">
                  <b>{tarjeta.word}</b>
                  <span>{tarjeta.chinese}</span>
                </div>
                <span className={`jd-caja-chip is-caja-${tarjeta.box}`}>
                  {SRS_BOX_LABELS_ES[tarjeta.box]} · {SRS_BOX_LABELS_ZH[tarjeta.box]}
                </span>
                <button
                  type="button"
                  className="jd-palabras__borrar"
                  onClick={() => {
                    removeSrsCard(tarjeta.word);
                    refrescar();
                  }}
                  aria-label={`Quitar ${tarjeta.word} · 删除`}
                >
                  <Trash2Icon size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
export { MemoriaPage as default };
