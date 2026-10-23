import { ClerkProvider } from "@clerk/clerk-react";
import * as ReactDOM from "react-dom/client";
import { ErrorBoundary, App } from "./App.jsx";
import "./styles/app.css";
import "./styles/overrides.css";
import "./styles/modern.css";
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
        afterSignOutUrl={`${location.origin + location.pathname}#/login`}
        signInForceRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signUpForceRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signInFallbackRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
        signUpFallbackRedirectUrl={`${location.origin + location.pathname}#/dashboard`}
      >
        <App />
      </ClerkProvider>
    </ErrorBoundary>,
  );
  const i = () => {
    const t = document.getElementById("initial-loader");
    if (t) {
      t.classList.add("hidden");
      setTimeout(() => t.remove(), 600);
    }
  };
  if (document.readyState === "complete") {
    setTimeout(i, 300);
  } else {
    window.addEventListener("load", () => setTimeout(i, 300));
  }
}
