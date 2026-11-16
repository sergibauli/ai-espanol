import { useAuth } from "@clerk/clerk-react";
import { ArrowLeftIcon, ShieldCheckIcon } from "lucide-react";
import * as React from "react";
import { useNavigate, Link } from "react-router";
import { EscenaAcceso } from "../components/portada/EscenaAcceso.jsx";
import { FormularioAcceso } from "../components/portada/FormularioAcceso.jsx";

// Sin ClerkProvider (pruebas locales) los hooks de Clerk lanzan: se trata como «no ha entrado»
function useAuthSeguro() {
  try {
    return useAuth();
  } catch {
    return { isLoaded: true, isSignedIn: false };
  }
}

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuthSeguro();
  const navegar = useNavigate();
  React.useEffect(() => {
    if (isLoaded && isSignedIn) navegar("/dashboard");
  }, [isLoaded, isSignedIn, navegar]);
  React.useEffect(() => {
    try {
      const sesion = sessionStorage.getItem("dele_auth");
      const caduca = sessionStorage.getItem("dele_expiry");
      if (sesion === "true" && caduca && Date.now() < Number(caduca)) navegar("/dashboard");
    } catch {}
  }, [navegar]);

  return (
    <EscenaAcceso
      sello="登录"
      titulo="Iniciar sesión"
      tituloZh="登录"
      subtitulo={
        <>
          <ShieldCheckIcon size={16} aria-hidden="true" /> Acceso seguro con tu cuenta de la academia · 使用学校账号安全登录
        </>
      }
      pie={
        <Link to="/" className="tp-btn-texto tp-acceso-volver">
          <ArrowLeftIcon size={15} aria-hidden="true" /> Portada · 首页
        </Link>
      }
    >
      <FormularioAcceso alEntrar={() => navegar("/dashboard")} />
    </EscenaAcceso>
  );
}
