import { lazy, Suspense, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProviders } from './lib/auth.jsx';
import { useStore, update } from './lib/store.js';
import { useThemeMode, useActiveMinutes } from './lib/hooks.js';
import Layout from './components/Layout.jsx';
import { Loading } from './components/ui.jsx';

const Today = lazy(() => import('./pages/Today.jsx'));
const Onboarding = lazy(() => import('./pages/Onboarding.jsx'));
const Modules = lazy(() => import('./pages/Modules.jsx'));
const Module = lazy(() => import('./pages/Module.jsx'));
const Oficial = lazy(() => import('./pages/Oficial.jsx'));
const OficialExam = lazy(() => import('./pages/OficialExam.jsx'));
const Review = lazy(() => import('./pages/Review.jsx'));
const Games = lazy(() => import('./pages/Games.jsx'));
const Game = lazy(() => import('./pages/games/index.jsx'));
const Tutor = lazy(() => import('./pages/Tutor.jsx'));
const Dictionary = lazy(() => import('./pages/Dictionary.jsx'));
const Premium = lazy(() => import('./pages/Premium.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

function Guard({ children }) {
  const onboarded = useStore(s => s.profile.onboarded);
  const loc = useLocation();
  if (!onboarded && loc.pathname !== '/bienvenida') return <Navigate to="/bienvenida" replace />;
  return children;
}

function Shell() {
  const mode = useStore(s => s.settings.theme);
  useThemeMode(mode);
  useActiveMinutes(useCallback(() => update(s => { s.today.minutes += 1; }), []));
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/bienvenida" element={<Onboarding />} />
        <Route element={<Guard><Layout /></Guard>}>
          <Route index element={<Today />} />
          <Route path="modulos" element={<Modules />} />
          <Route path="modulos/:level/:id" element={<Module />} />
          <Route path="oficial" element={<Oficial />} />
          <Route path="oficial/:level" element={<Oficial />} />
          <Route path="oficial/:level/:modelo" element={<OficialExam />} />
          <Route path="repaso" element={<Review />} />
          <Route path="juegos" element={<Games />} />
          <Route path="juegos/:game" element={<Game />} />
          <Route path="tutor" element={<Tutor />} />
          <Route path="diccionario" element={<Dictionary />} />
          <Route path="premium" element={<Premium />} />
          <Route path="ajustes" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <AppProviders>
      <HashRouter>
        <Shell />
      </HashRouter>
    </AppProviders>
  );
}
