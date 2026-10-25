import * as React from "react";
import { Navigate, useLocation, useNavigate, Routes, Route, HashRouter } from "react-router";
import { CursorTrail } from "./components/fx/CursorTrail.jsx";
import { TopNav } from "./components/layout/TopNav.jsx";
import { MascotProvider } from "./components/Mascot.jsx";
import { useAppAuth, AuthProvider } from "./lib/auth.jsx";
import { LanguageProvider } from "./lib/i18n.jsx";
import { CampusProvider } from "./lib/campus.jsx";
import MODULE_CATALOG from "./data/modulos/catalog.json";
const MODULE_TITLES = Object.fromEntries(MODULE_CATALOG.map((m) => [m.numero, m.titulo]));
import { LIGHT_ROUTES, LEGACY_LIGHT, STAGE_ROUTES, LightShell } from "./components/layout/LightShell.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import { SECCIONES } from "./lib/precarga.js";
const Login = React.lazy(() => import("./pages/Login.jsx"));
const SignInPage = React.lazy(() => import("./pages/SignInPage.jsx"));
const DashboardPage = React.lazy(SECCIONES["/ruta"]);
const ExamenesNivelPage = React.lazy(() => import("./pages/dele/ExamenesNivelPage.jsx"));
const ExamDetailPage = React.lazy(() => import("./pages/dele/ExamDetailPage.jsx"));
const OficialPage = React.lazy(SECCIONES["/oficial"]);
const MiDelePage = React.lazy(SECCIONES["/mi-dele"]);
const DiagnosticoPage = React.lazy(() => import("./pages/DiagnosticoPage.jsx"));
const ExaminadorOralPage = React.lazy(() => import("./pages/ExaminadorOralPage.jsx"));
const AudicionAcentosPage = React.lazy(() => import("./pages/AudicionAcentosPage.jsx"));
const OficialNivelPage = React.lazy(() => import("./pages/dele/OficialNivelPage.jsx"));
const OficialExamPage = React.lazy(() => import("./pages/dele/OficialExamPage.jsx"));
const ModulosPage = React.lazy(() => import("./pages/ModulosPage.jsx"));
const UnidadesPage = React.lazy(SECCIONES["/modulos"]);
const PronunciacionPage = React.lazy(() => import("./pages/PronunciacionPage.jsx"));
const PronunciacionNuevaPage = React.lazy(SECCIONES["/pronunciacion"]);
const JuegosHubPage = React.lazy(SECCIONES["/juegos"]);
const RuletaPage = React.lazy(() => import("./pages/juegos/RuletaPage.jsx"));
const AhorcadoPage = React.lazy(() => import("./pages/juegos/AhorcadoPage.jsx"));
const MemoryPage = React.lazy(() => import("./pages/juegos/MemoryPage.jsx"));
const CrucigramaPage = React.lazy(() => import("./pages/juegos/CrucigramaPage.jsx"));
const SopaPage = React.lazy(() => import("./pages/juegos/SopaPage.jsx"));
const ScramblePage = React.lazy(() => import("./pages/juegos/ScramblePage.jsx"));
const AudicionPage = React.lazy(() => import("./pages/AudicionPage.jsx"));
const ConsejosPage = React.lazy(() => import("./pages/ConsejosPage.jsx"));
const GramaticaPage = React.lazy(() => import("./pages/GramaticaPage.jsx"));
const DiccionariosPage = React.lazy(SECCIONES["/diccionarios"]);
const ExamenesPage = React.lazy(() => import("./pages/dele/PracticaHubPage.jsx"));
const AyudasPage = React.lazy(() => import("./pages/AyudasPage.jsx"));
const KaraokePage = React.lazy(() => import("./pages/KaraokePage.jsx"));
const MemoriaPage = React.lazy(SECCIONES["/memoria"]);
const GeneradorPage = React.lazy(() => import("./pages/GeneradorPage.jsx"));
const TutorVozPage = React.lazy(SECCIONES["/tutor-voz"]);
const VideosPage = React.lazy(() => import("./pages/VideosPage.jsx"));
const EnjambrePage = React.lazy(() => import("./pages/juegos/EnjambrePage.jsx"));
const ClasePage = React.lazy(() => import("./pages/ClasePage.jsx"));
const PromoPage = React.lazy(() => import("./pages/PromoPage.jsx"));
const KahootPage = React.lazy(() => import("./pages/juegos/KahootPage.jsx"));
const FlashcardsPage = React.lazy(() => import("./pages/juegos/FlashcardsPage.jsx"));
const TypingRacePage = React.lazy(() => import("./pages/juegos/TypingRacePage.jsx"));
const WordSnakePage = React.lazy(() => import("./pages/juegos/WordSnakePage.jsx"));
const VocabBlastPage = React.lazy(() => import("./pages/juegos/VocabBlastPage.jsx"));
const WordQuizPage = React.lazy(() => import("./pages/juegos/WordQuizPage.jsx"));
const FillBlanksPage = React.lazy(() => import("./pages/juegos/FillBlanksPage.jsx"));
const WordPairsPage = React.lazy(() => import("./pages/juegos/WordPairsPage.jsx"));
const WordTowerPage = React.lazy(() => import("./pages/juegos/WordTowerPage.jsx"));
const SpellItPage = React.lazy(() => import("./pages/juegos/SpellItPage.jsx"));
const WordMazePage = React.lazy(() => import("./pages/juegos/WordMazePage.jsx"));
const WordDashPage = React.lazy(() => import("./pages/juegos/WordDashPage.jsx"));
const WordPuzzlePage = React.lazy(() => import("./pages/juegos/WordPuzzlePage.jsx"));
const WordDropPage = React.lazy(() => import("./pages/juegos/WordDropPage.jsx"));
const WordRushPage = React.lazy(() => import("./pages/juegos/WordRushPage.jsx"));
const WordPopPage = React.lazy(() => import("./pages/juegos/WordPopPage.jsx"));
const WordOrbitPage = React.lazy(() => import("./pages/juegos/WordOrbitPage.jsx"));
const WordFusionPage = React.lazy(() => import("./pages/juegos/WordFusionPage.jsx"));
const WordGridPage = React.lazy(() => import("./pages/juegos/WordGridPage.jsx"));
const WordStormPage = React.lazy(() => import("./pages/juegos/WordStormPage.jsx"));
const WordStackPage = React.lazy(() => import("./pages/juegos/WordStackPage.jsx"));
const WordCipherPage = React.lazy(() => import("./pages/juegos/WordCipherPage.jsx"));
const WordTriviaPage = React.lazy(() => import("./pages/juegos/WordTriviaPage.jsx"));
const WordPinballPage = React.lazy(() => import("./pages/juegos/WordPinballPage.jsx"));
const WordTetrisPage = React.lazy(() => import("./pages/juegos/WordTetrisPage.jsx"));
const WordPacManPage = React.lazy(() => import("./pages/juegos/WordPacManPage.jsx"));
const WordShooterPage = React.lazy(() => import("./pages/juegos/WordShooterPage.jsx"));
const WordMatch3DPage = React.lazy(() => import("./pages/juegos/WordMatch3DPage.jsx"));
const WordRacerPage = React.lazy(() => import("./pages/juegos/WordRacerPage.jsx"));
const WordDefenderPage = React.lazy(() => import("./pages/juegos/WordDefenderPage.jsx"));
const WordSlingerPage = React.lazy(() => import("./pages/juegos/WordSlingerPage.jsx"));
const WordNinjaPage = React.lazy(() => import("./pages/juegos/WordNinjaPage.jsx"));
const WordQuestPage = React.lazy(() => import("./pages/juegos/WordQuestPage.jsx"));
const WordArcherPage = React.lazy(() => import("./pages/juegos/WordArcherPage.jsx"));
const WordCandyPage = React.lazy(() => import("./pages/juegos/WordCandyPage.jsx"));
const ApalabradosPage = React.lazy(() => import("./pages/juegos/ApalabradosPage.jsx"));
const WordChainPage = React.lazy(() => import("./pages/juegos/WordChainPage.jsx"));
const TicTacToePage = React.lazy(() => import("./pages/juegos/TicTacToePage.jsx"));
const UnoPage = React.lazy(() => import("./pages/juegos/UnoPage.jsx"));
const ExamGeneratorPage = React.lazy(() => import("./pages/ExamGeneratorPage.jsx"));
const RutaPage = React.lazy(SECCIONES["/ruta"]);

const UnitPage = React.lazy(() => import("./pages/UnitPage.jsx"));
// Paneles flotantes: se cargan aparte, cuando hacen falta, para que la primera pantalla pese menos
const FavoritesPanel = React.lazy(() => import("./components/FavoritesPanel.jsx").then((m) => ({ default: m.FavoritesPanel })));
const Pizarra = React.lazy(() => import("./components/Pizarra.jsx").then((m) => ({ default: m.Pizarra })));
const TutorChat = React.lazy(() => import("./components/TutorChat.jsx").then((m) => ({ default: m.TutorChat })));
function PageLoader() {
  return (
    <div className="carga-seccion" role="status" aria-live="polite">
      <span className="carga-seccion__moneda" />
      <span>Cargando · 加载中…</span>
    </div>
  );
}
// Quita el cargador de index.html cuando la primera pantalla real ya está pintada
function QuitaCargadorInicial() {
  React.useEffect(() => {
    const t = document.getElementById("initial-loader");
    if (!t) return;
    requestAnimationFrame(() => {
      t.classList.add("hidden");
      setTimeout(() => t.remove(), 320);
    });
  }, []);
  return null;
}
function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAppAuth();
  if (isLoading) return <PageLoader />;
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace />;
}
function PageTransition({ children }) {
  const tRef = React.useRef(null);
  // Desde una unidad (?m=N): pulsa sola la tarjeta del módulo en el menú del juego
  React.useEffect(() => {
    const m = Number(new URLSearchParams(window.location.hash.split("?")[1] || "").get("m"));
    if (!m || !tRef.current) return;
    const titulo = MODULE_TITLES[m];
    if (!titulo) return;
    let done = false;
    const tryPick = () => {
      if (done || !tRef.current) return;
      const btn = [...tRef.current.querySelectorAll("button, [role=button], a")].find((b) => (b.textContent || "").includes(titulo));
      if (btn) {
        done = true;
        btn.click();
      }
    };
    const mo = new MutationObserver(tryPick);
    mo.observe(tRef.current, { childList: true, subtree: true });
    tryPick();
    const t = setTimeout(() => mo.disconnect(), 8000);
    return () => {
      mo.disconnect();
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    const tRef_current = tRef.current;
    if (!tRef_current) {
      return;
    }
    let u = 0;
    let s = 0;
    const d = () => {
      cancelAnimationFrame(u);
      u = requestAnimationFrame(() => {
        let v = 0;
        tRef_current.querySelectorAll("button").forEach((f) => {
          const E = (f.textContent || "").replace(/\s+/g, " ").trim();
          if (/(palabras\s*\/\s*词|palabras\b|Todos los módulos|所有模块)/i.test(E)) {
            f.classList.add("game-module-choice");
            f.style.setProperty("--game-module-delay", `${(v++ % 12) * 70}ms`);
          }
        });
      });
    };
    const m = () => {
      const v = performance.now();
      if (!(v - s < 600)) {
        s = v;
        d();
      }
    };
    d();
    const g = new MutationObserver(m);
    g.observe(tRef_current, {
      childList: true,
      subtree: true,
    });
    return () => {
      cancelAnimationFrame(u);
      g.disconnect();
    };
  }, []);
  return (
    <MascotProvider>
      <div ref={tRef} className="game-route-shell">
        {children}
      </div>
    </MascotProvider>
  );
}
const SWIPE_SECTIONS = [
  "/dashboard",
  "/examenes",
  "/diccionarios",
  "/modulos",
  "/pronunciacion",
  "/juegos",
  "/consejos",
  "/ayudas",
];
function SwipeNavigation() {
  const i = useLocation();
  const t = useNavigate();
  const cRef = React.useRef(null);
  const [u, setU] = React.useState(null);
  React.useEffect(() => {
    const d = SWIPE_SECTIONS.indexOf(i.pathname);
    if (d < 0) {
      return;
    }
    const m = (v) => {
      if (v.touches.length !== 1) {
        return;
      }
      const v_target = v.target;
      if (
        v_target instanceof Element &&
        v_target.closest("input,textarea,select,button,a,[data-no-section-swipe]")
      ) {
        return;
      }
      const E = v.touches[0];
      cRef.current = {
        x: E.clientX,
        y: E.clientY,
        target: v_target,
      };
    };
    const g = (v) => {
      const cRef_current = cRef.current;
      cRef.current = null;
      if (!cRef_current || v.changedTouches.length !== 1) {
        return;
      }
      const E = v.changedTouches[0];
      const j = E.clientX - cRef_current.x;
      const _ = E.clientY - cRef_current.y;
      if (Math.abs(j) < 78 || Math.abs(_) > Math.abs(j) * 0.58) {
        return;
      }
      const A = j < 0 ? d + 1 : d - 1;
      if (A < 0 || A >= SWIPE_SECTIONS.length) {
        return;
      }
      const w = j < 0 ? "next" : "previous";
      setU(w);
      window.setTimeout(() => {
        t(SWIPE_SECTIONS[A]);
        setU(null);
      }, 120);
    };
    window.addEventListener("touchstart", m, {
      passive: true,
    });
    window.addEventListener("touchend", g, {
      passive: true,
    });
    return () => {
      window.removeEventListener("touchstart", m);
      window.removeEventListener("touchend", g);
    };
  }, [i.pathname, t]);
  if (u) {
    return (
      <div className={`mobile-swipe-cue is-${u}`} aria-hidden="true">
        <span>{u === "next" ? "→" : "←"}</span>
      </div>
    );
  }
  return null;
}
function AppRoutes() {
  const { isAuthenticated } = useAppAuth();
  const pathname = useLocation().pathname;
  React.useEffect(() => {
    const s = () => document.documentElement.classList.toggle("app-is-hidden", document.hidden);
    s();
    document.addEventListener("visibilitychange", s);
    return () => {
      document.removeEventListener("visibilitychange", s);
      document.documentElement.classList.remove("app-is-hidden");
    };
  }, []);
  const legacyLight = isAuthenticated && LEGACY_LIGHT(pathname);
  const stage = isAuthenticated && STAGE_ROUTES(pathname);
  const light = LIGHT_ROUTES(pathname) || legacyLight || stage;
  const u = pathname === "/login" || pathname === "/" || pathname === "/sign-in" || pathname.startsWith("/juegos") || light;
  return (
    <>
      <CursorTrail />
      <SwipeNavigation />
      {isAuthenticated && !light && <TopNav />}
      <React.Suspense fallback={<PageLoader />}>
      <QuitaCargadorInicial />
      {(() => {
        const routes = (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profesores" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/examenes/generador"
            element={
              <RequireAuth>
                <ExamGeneratorPage />
              </RequireAuth>
            }
          />
          <Route
            path="/ruta"
            element={
              <RequireAuth>
                <RutaPage />
              </RequireAuth>
            }
          />
          <Route path="/campus" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/examenes-nivel/:level"
            element={
              <RequireAuth>
                <ExamenesNivelPage />
              </RequireAuth>
            }
          />
          <Route
            path="/examenes/:level/:examId"
            element={
              <RequireAuth>
                <ExamDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/mi-dele"
            element={
              <RequireAuth>
                <MiDelePage />
              </RequireAuth>
            }
          />
          <Route
            path="/audicion"
            element={
              <RequireAuth>
                <AudicionAcentosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/examinador-oral"
            element={
              <RequireAuth>
                <ExaminadorOralPage />
              </RequireAuth>
            }
          />
          <Route
            path="/diagnostico"
            element={
              <RequireAuth>
                <DiagnosticoPage />
              </RequireAuth>
            }
          />
          <Route
            path="/oficial"
            element={
              <RequireAuth>
                <OficialPage />
              </RequireAuth>
            }
          />
          <Route
            path="/oficial/:level"
            element={
              <RequireAuth>
                <OficialNivelPage />
              </RequireAuth>
            }
          />
          <Route
            path="/oficial/:level/:examId"
            element={
              <RequireAuth>
                <OficialExamPage />
              </RequireAuth>
            }
          />
          <Route
            path="/modulos"
            element={
              <RequireAuth>
                <UnidadesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/modulos/:moduloId"
            element={
              <RequireAuth>
                <UnitPage />
              </RequireAuth>
            }
          />
          <Route
            path="/pronunciacion"
            element={
              <RequireAuth>
                <PronunciacionNuevaPage />
              </RequireAuth>
            }
          />
          <Route
            path="/pronunciacion/templo"
            element={
              <RequireAuth>
                <PronunciacionPage />
              </RequireAuth>
            }
          />
          <Route
            path="/juegos"
            element={
              <RequireAuth>
                <JuegosHubPage />
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/ruleta"
            element={
              <RequireAuth>
                <PageTransition>
                  <RuletaPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/ahorcado"
            element={
              <RequireAuth>
                <PageTransition>
                  <AhorcadoPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/memory"
            element={
              <RequireAuth>
                <PageTransition>
                  <MemoryPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route path="/juegos/crucigrama" element={<Navigate to="/juegos" replace />} />
          <Route
            path="/juegos/sopa"
            element={
              <RequireAuth>
                <PageTransition>
                  <SopaPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/scramble"
            element={
              <RequireAuth>
                <PageTransition>
                  <ScramblePage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/audicion"
            element={
              <RequireAuth>
                <AudicionPage />
              </RequireAuth>
            }
          />
          <Route
            path="/consejos"
            element={
              <RequireAuth>
                <ConsejosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/gramatica"
            element={
              <RequireAuth>
                <GramaticaPage />
              </RequireAuth>
            }
          />
          <Route
            path="/diccionarios"
            element={
              <RequireAuth>
                <DiccionariosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/examenes"
            element={
              <RequireAuth>
                <ExamenesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/ayudas"
            element={
              <RequireAuth>
                <AyudasPage />
              </RequireAuth>
            }
          />
          <Route path="/karaoke" element={<Navigate to="/ruta" replace />} />
          <Route
            path="/memoria"
            element={
              <RequireAuth>
                <MemoriaPage />
              </RequireAuth>
            }
          />
          <Route
            path="/generador"
            element={
              <RequireAuth>
                <GeneradorPage />
              </RequireAuth>
            }
          />
          <Route
            path="/tutor-voz"
            element={
              <RequireAuth>
                <TutorVozPage />
              </RequireAuth>
            }
          />
          <Route
            path="/videos"
            element={
              <RequireAuth>
                <VideosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/enjambre"
            element={
              <RequireAuth>
                <EnjambrePage />
              </RequireAuth>
            }
          />
          <Route path="/clases" element={<Navigate to="/dashboard" replace />} />
          <Route path="/clase" element={<ClasePage />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route
            path="/juegos/kahoot"
            element={
              <RequireAuth>
                <PageTransition>
                  <KahootPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route path="/juegos/flashcards" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/typing-race" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-snake" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/vocab-blast" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-quiz" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/fill-blanks" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-pairs" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-tower" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/spell-it" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-maze" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-dash" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-puzzle" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-drop" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-rush" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-pop" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-orbit" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-fusion" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-grid" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-storm" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-stack" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-cipher" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-trivia" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-pinball" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-tetris" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-pacman" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-shooter" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-match-3d" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-racer" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-defender" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-slinger" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-ninja" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-quest" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-archer" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/word-candy" element={<Navigate to="/juegos" replace />} />
          <Route
            path="/juegos/apalabrados"
            element={
              <RequireAuth>
                <PageTransition>
                  <ApalabradosPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route path="/juegos/word-chain" element={<Navigate to="/juegos" replace />} />
          <Route path="/juegos/tic-tac-toe" element={<Navigate to="/juegos" replace />} />
          <Route
            path="/juegos/uno"
            element={
              <RequireAuth>
                <PageTransition>
                  <UnoPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
        );
        return legacyLight ? <LightShell legacy>{routes}</LightShell> : stage ? <LightShell stage>{routes}</LightShell> : routes;
      })()}
      </React.Suspense>
      <React.Suspense fallback={null}>
        {!u && <Pizarra />}
        {!u && <FavoritesPanel />}
      </React.Suspense>
      {isAuthenticated && !pathname.startsWith("/juegos") && pathname !== "/tutor-voz" && pathname !== "/" && (
        <div className={pathname === "/dashboard" ? "dashboard-ai-mobile-hidden" : ""}>
          <React.Suspense fallback={null}>
            <TutorChat />
          </React.Suspense>
        </div>
      )}
    </>
  );
}
function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <LanguageProvider>
          <CampusProvider>
            <AppRoutes />
          </CampusProvider>
        </LanguageProvider>
      </AuthProvider>
    </HashRouter>
  );
}
class ErrorBoundary extends React.Component {
  constructor(t) {
    super(t);
    this.state = {
      hasError: false,
      error: null,
    };
  }
  static getDerivedStateFromError(t) {
    return {
      hasError: true,
      error: t,
    };
  }
  componentDidCatch(t, c) {
    console.error("ErrorBoundary caught:", t, c);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            background: "#050714",
            padding: "20px",
          }}
        >
          <div className="max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1
              style={{
                color: "#ff6b6b",
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Algo salió mal
            </h1>
            <p
              style={{
                color: "#ccc",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              La aplicación encontró un error. Intenta recargar la página.
            </p>
            <pre
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,107,107,0.3)",
                borderRadius: "8px",
                padding: "12px",
                color: "#ff9999",
                fontSize: "0.75rem",
                textAlign: "left",
                overflow: "auto",
                maxHeight: "200px",
              }}
            >
              {this.state.error?.message || "Error desconocido"}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "1rem",
                padding: "10px 24px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #ff8a2a, #ff0055)",
                color: "white",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              🔄 Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
export { ErrorBoundary, App };
