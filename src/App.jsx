import * as React from "react";
import { Navigate, useLocation, useNavigate, Routes, Route, HashRouter } from "react-router";
import { FavoritesPanel } from "./components/FavoritesPanel.jsx";
import { CursorTrail } from "./components/fx/CursorTrail.jsx";
import { StarfieldBackground } from "./components/fx/StarfieldBackground.jsx";
import { TopNav } from "./components/layout/TopNav.jsx";
import { MascotProvider } from "./components/Mascot.jsx";
import { Pizarra } from "./components/Pizarra.jsx";
import { TutorChat } from "./components/TutorChat.jsx";
import { useAppAuth, AuthProvider } from "./lib/auth.jsx";
import { LanguageProvider } from "./lib/i18n.jsx";
const Login = React.lazy(() => import("./pages/Login.jsx"));
const SignInPage = React.lazy(() => import("./pages/SignInPage.jsx"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage.jsx"));
const ExamenesNivelPage = React.lazy(() => import("./pages/dele/ExamenesNivelPage.jsx"));
const ExamDetailPage = React.lazy(() => import("./pages/dele/ExamDetailPage.jsx"));
const OficialPage = React.lazy(() => import("./pages/dele/OficialPage.jsx"));
const OficialNivelPage = React.lazy(() => import("./pages/dele/OficialNivelPage.jsx"));
const OficialExamPage = React.lazy(() => import("./pages/dele/OficialExamPage.jsx"));
const ModulosPage = React.lazy(() => import("./pages/ModulosPage.jsx"));
const PronunciacionPage = React.lazy(() => import("./pages/PronunciacionPage.jsx"));
const JuegosHubPage = React.lazy(() => import("./pages/juegos/JuegosHubPage.jsx"));
const RuletaPage = React.lazy(() => import("./pages/juegos/RuletaPage.jsx"));
const AhorcadoPage = React.lazy(() => import("./pages/juegos/AhorcadoPage.jsx"));
const MemoryPage = React.lazy(() => import("./pages/juegos/MemoryPage.jsx"));
const CrucigramaPage = React.lazy(() => import("./pages/juegos/CrucigramaPage.jsx"));
const SopaPage = React.lazy(() => import("./pages/juegos/SopaPage.jsx"));
const ScramblePage = React.lazy(() => import("./pages/juegos/ScramblePage.jsx"));
const AudicionPage = React.lazy(() => import("./pages/AudicionPage.jsx"));
const ConsejosPage = React.lazy(() => import("./pages/ConsejosPage.jsx"));
const GramaticaPage = React.lazy(() => import("./pages/GramaticaPage.jsx"));
const DiccionariosPage = React.lazy(() => import("./pages/DiccionariosPage.jsx"));
const ExamenesPage = React.lazy(() => import("./pages/dele/ExamenesPage.jsx"));
const AyudasPage = React.lazy(() => import("./pages/AyudasPage.jsx"));
const KaraokePage = React.lazy(() => import("./pages/KaraokePage.jsx"));
const MemoriaPage = React.lazy(() => import("./pages/MemoriaPage.jsx"));
const GeneradorPage = React.lazy(() => import("./pages/GeneradorPage.jsx"));
const TutorVozPage = React.lazy(() => import("./pages/TutorVozPage.jsx"));
const VideosPage = React.lazy(() => import("./pages/VideosPage.jsx"));
const EnjambrePage = React.lazy(() => import("./pages/juegos/EnjambrePage.jsx"));
const ClasesPage = React.lazy(() => import("./pages/ClasesPage.jsx"));
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
function PageLoader() {
  return (
    <StarfieldBackground>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-400/20 border-t-orange-400 rounded-full animate-spin" />
          <p className="text-white/40 font-bold text-sm animate-pulse">Cargando...</p>
        </div>
      </div>
    </StarfieldBackground>
  );
}
function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAppAuth();
  if (isLoading) {
    return (
      <StarfieldBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-orange-400/20 border-t-orange-400 rounded-full animate-spin" />
        </div>
      </StarfieldBackground>
    );
  }
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
}
function PageTransition({ children }) {
  const tRef = React.useRef(null);
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
  const u = pathname === "/login" || pathname === "/sign-in" || pathname.startsWith("/juegos");
  return (
    <>
      <CursorTrail />
      <SwipeNavigation />
      {isAuthenticated && <TopNav />}
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignInPage />} />
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
                <ModulosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/modulos/:moduloId"
            element={
              <RequireAuth>
                <ModulosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/pronunciacion"
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
          <Route
            path="/juegos/crucigrama"
            element={
              <RequireAuth>
                <PageTransition>
                  <CrucigramaPage />
                </PageTransition>
              </RequireAuth>
            }
          />
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
          <Route
            path="/karaoke"
            element={
              <RequireAuth>
                <KaraokePage />
              </RequireAuth>
            }
          />
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
          <Route
            path="/clases"
            element={
              <RequireAuth>
                <ClasesPage />
              </RequireAuth>
            }
          />
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
          <Route
            path="/juegos/flashcards"
            element={
              <RequireAuth>
                <PageTransition>
                  <FlashcardsPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/typing-race"
            element={
              <RequireAuth>
                <PageTransition>
                  <TypingRacePage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-snake"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordSnakePage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/vocab-blast"
            element={
              <RequireAuth>
                <PageTransition>
                  <VocabBlastPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-quiz"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordQuizPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/fill-blanks"
            element={
              <RequireAuth>
                <PageTransition>
                  <FillBlanksPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-pairs"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordPairsPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-tower"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordTowerPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/spell-it"
            element={
              <RequireAuth>
                <PageTransition>
                  <SpellItPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-maze"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordMazePage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-dash"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordDashPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-puzzle"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordPuzzlePage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-drop"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordDropPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-rush"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordRushPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-pop"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordPopPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-orbit"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordOrbitPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-fusion"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordFusionPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-grid"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordGridPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-storm"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordStormPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-stack"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordStackPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-cipher"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordCipherPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-trivia"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordTriviaPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-pinball"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordPinballPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-tetris"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordTetrisPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-pacman"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordPacManPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-shooter"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordShooterPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-match-3d"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordMatch3DPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-racer"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordRacerPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-defender"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordDefenderPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-slinger"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordSlingerPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-ninja"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordNinjaPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-quest"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordQuestPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-archer"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordArcherPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/word-candy"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordCandyPage />
                </PageTransition>
              </RequireAuth>
            }
          />
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
          <Route
            path="/juegos/word-chain"
            element={
              <RequireAuth>
                <PageTransition>
                  <WordChainPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/juegos/tic-tac-toe"
            element={
              <RequireAuth>
                <PageTransition>
                  <TicTacToePage />
                </PageTransition>
              </RequireAuth>
            }
          />
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
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </React.Suspense>
      {!u && <Pizarra />}
      {!u && <FavoritesPanel />}
      {isAuthenticated && !pathname.startsWith("/juegos") && (
        <div className={pathname === "/dashboard" ? "dashboard-ai-mobile-hidden" : ""}>
          <TutorChat />
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
          <AppRoutes />
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
