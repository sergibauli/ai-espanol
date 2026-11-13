import { useAuth, SignIn } from "@clerk/clerk-react";
import { ArrowLeftIcon, ShieldCheckIcon, WifiOffIcon } from "lucide-react";
import * as React from "react";
import { useNavigate, Link } from "react-router";
import { EscenaAcceso } from "../components/portada/EscenaAcceso.jsx";

// Sin ClerkProvider (pruebas locales) los hooks de Clerk lanzan: se trata como «no ha entrado»
function useAuthSeguro() {
  try {
    return useAuth();
  } catch {
    return { isLoaded: true, isSignedIn: false };
  }
}

// Si el formulario de Clerk no carga (sin red o sin proveedor), se muestra un aviso en lugar de romper la página
class FormularioSeguro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fallo: false };
  }
  static getDerivedStateFromError() {
    return { fallo: true };
  }
  render() {
    if (this.state.fallo) {
      return (
        <div className="tp-acceso-error tp-acceso-fallo v14a-sacude" role="alert">
          <WifiOffIcon size={22} aria-hidden="true" />
          <p>
            <b>No se ha podido cargar el inicio de sesión</b>
            <span>无法加载登录，请检查网络后刷新。</span>
            Comprueba tu conexión y vuelve a cargar la página.
          </p>
          <button type="button" className="tp-btn-laca" onClick={() => location.reload()}>
            Recargar · 刷新
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ORO = "#c8961e";
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
      <div className="tp-acceso-clerk">
        <FormularioSeguro>
          <SignIn
            routing="hash"
            appearance={{
              variables: {
                colorPrimary: "#a5112a",
                colorText: "#2b190e",
                colorTextSecondary: "#5a3a22",
                colorBackground: "#fffaf0",
                colorInputBackground: "#fffdf6",
                borderRadius: "14px",
                fontFamily: "Plus Jakarta Sans, PingFang SC, sans-serif",
              },
              layout: { socialButtonsVariant: "iconButton", showOptionalFields: false },
              elements: {
                card: { boxShadow: "none", border: 0, background: "transparent", padding: 0 },
                headerTitle: { display: "none" },
                headerSubtitle: { display: "none" },
                footerAction: { display: "none" },
                formButtonPrimary: { minHeight: "48px", borderRadius: "99px", background: "linear-gradient(#d4253a, #a5112a 55%, #7d0a1d)", border: `2px solid #f2c14e`, fontWeight: 800 },
                formFieldInput: { minHeight: "46px", border: `1.5px solid ${ORO}` },
                socialButtonsIconButton: { minHeight: "46px", border: `1.5px solid ${ORO}` },
              },
            }}
          />
        </FormularioSeguro>
      </div>
    </EscenaAcceso>
  );
}
