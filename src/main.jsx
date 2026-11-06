import { ClerkProvider } from "@clerk/clerk-react";
// Solo el español (el índice del paquete arrastra todos los idiomas)
import { esES } from "@clerk/localizations/es-ES";
import * as ReactDOM from "react-dom/client";
import { ErrorBoundary, App } from "./App.jsx";
import "./styles/app.css";
import "./styles/overrides.css";
import "./styles/modern.css";
import "./styles/fun.css";
import "./styles/parchment.css";
import "./styles/espectacular.css";
import "./styles/v12-examenes.css";
import "./styles/v12-inicio.css";
import "./styles/v12-unidad.css";
import "./styles/v12-juegos-dicc.css";
import "./styles/v12-tutor-portada.css";
import "./styles/v12-clases.css";
// En producción define VITE_CLERK_PUBLISHABLE_KEY (pk_live_…); la clave de desarrollo queda como respaldo
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y29tcG9zZWQta2l0dGVuLTcwLmNsZXJrLmFjY291bnRzLmRldiQ";
const ev = document.getElementById("root");
if (!ev) {
  document.body.innerHTML =
    '<div style="color:red;padding:20px;text-align:center;font-family:sans-serif;"><h2>Error: No se encontró el elemento root</h2></div>';
} else {
  // Solo para pruebas locales sin acceso a Clerk (VITE_SIN_CLERK=1 npm run dev): entra con la sesión de admin
  const sinClerk = import.meta.env.DEV && import.meta.env.VITE_SIN_CLERK === "1";
  ReactDOM.createRoot(ev).render(
    sinClerk ? (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ) : (
    <ErrorBoundary>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        localization={esES}
        // Sin registro libre: se oculta «¿No tienes cuenta? Regístrate» en el inicio de sesión
        appearance={{ elements: { footerAction: { display: "none" } } }}
        afterSignOutUrl={`${location.origin + location.pathname}#/`}
        signInForceRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signUpForceRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signInFallbackRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signUpFallbackRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
      >
        <App />
      </ClerkProvider>
    </ErrorBoundary>
    ),
  );
  // Respaldo: si la primera pantalla tarda, el cargador de index.html se quita igualmente (lo normal es que lo quite App)
  setTimeout(() => {
    const t = document.getElementById("initial-loader");
    if (t) {
      t.classList.add("hidden");
      setTimeout(() => t.remove(), 320);
    }
  }, 6000);
}
