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
// En producción define VITE_CLERK_PUBLISHABLE_KEY (pk_live_…); la clave de desarrollo queda como respaldo
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y29tcG9zZWQta2l0dGVuLTcwLmNsZXJrLmFjY291bnRzLmRldiQ";
const ev = document.getElementById("root");
if (!ev) {
  document.body.innerHTML =
    '<div style="color:red;padding:20px;text-align:center;font-family:sans-serif;"><h2>Error: No se encontró el elemento root</h2></div>';
} else {
  ReactDOM.createRoot(ev).render(
    <ErrorBoundary>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        localization={esES}
        afterSignOutUrl={`${location.origin + location.pathname}#/`}
        signInForceRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signUpForceRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signInFallbackRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signUpFallbackRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
      >
        <App />
      </ClerkProvider>
    </ErrorBoundary>,
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
