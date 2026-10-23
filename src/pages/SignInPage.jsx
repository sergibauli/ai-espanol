import { useAuth, useUser, SignIn } from "@clerk/clerk-react";
import { SparklesIcon, ArrowLeftIcon } from "lucide-react";
import * as React from "react";
import { useNavigate, Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
function FComponent() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const t = useNavigate();
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      t("/dashboard");
    }
  }, [isLoaded, isSignedIn, t]);
  React.useEffect(() => {
    try {
      const n = sessionStorage.getItem("dele_auth");
      const s = sessionStorage.getItem("dele_expiry");
      if (n === "true" && s && Date.now() < Number(s)) {
        t("/dashboard");
      }
    } catch {}
  }, [t]);
  return (
    <StarfieldBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 w-full max-w-sm">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-white/40 hover:text-orange-400 text-sm mb-6 transition-colors"
          >
            <ArrowLeftIcon size={16} />
            <span>Volver al login / 返回登录</span>
          </Link>
          <div className="text-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center mx-auto mb-3 shadow-xl"
              style={{
                boxShadow: "0 0 30px rgba(255,138,42,0.3)",
              }}
            >
              <SparklesIcon size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              AI <span className="text-orange-400">Espanol</span>
            </h1>
            <p className="text-white/40 text-sm">Acceso seguro con Clerk / Clerk安全登录</p>
          </div>
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <SignIn
              routing="hash"
              signUpUrl="#/sign-in"
              appearance={{
                layout: {
                  socialButtonsVariant: "iconButton",
                  showOptionalFields: false,
                },
                elements: {
                  card: "bg-transparent shadow-none border-0 p-0",
                  headerTitle: "text-white text-lg font-bold hidden",
                  headerSubtitle: "text-white/40 text-sm hidden",
                  socialButtonsBlockButton:
                    "bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl transition-all h-10",
                  formButtonPrimary:
                    "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg h-10",
                  formFieldInput:
                    "bg-white/10 border border-white/20 text-white rounded-xl placeholder:text-white/30 focus:border-orange-500/50 h-10",
                  formFieldLabel: "text-white/60 text-sm",
                  footerActionLink: "text-orange-400 hover:text-orange-300",
                  identityPreviewText: "text-white/60",
                  identityPreviewEditButton: "text-orange-400",
                  alternativeMethodsBlockButton:
                    "bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl",
                  otpCodeFieldInput: "bg-white/10 border border-white/20 text-white rounded-xl",
                  dividerLine: "bg-white/10",
                  dividerText: "text-white/30 text-xs",
                  formFieldErrorText: "text-red-400 text-xs",
                  alertText: "text-red-400",
                  main: "gap-3",
                  formFieldAction: "text-orange-400 hover:text-orange-300",
                  formFields: "gap-3",
                  footer: "text-white/40 text-sm",
                  footerAction: "text-white/40",
                },
              }}
            />
          </div>
          <div className="text-center mt-4">
            <Link to="/login" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              ← También puedes acceder con Admin / 也可以用管理员登录
            </Link>
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { FComponent as default };
