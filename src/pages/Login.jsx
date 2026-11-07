import { LogInIcon, KeyRoundIcon, MessageCircleIcon, ArrowLeftIcon, LoaderCircleIcon } from "lucide-react";
import * as React from "react";
import { useNavigate, Link } from "react-router";
import { useAppAuth } from "../lib/auth.jsx";
import { Logo } from "../../packages/imperial/src/index.js";

// Acceso: solo se inicia sesión con una cuenta dada por la academia (no hay registro libre).
// El acceso de administrador solo aparece con «admin» en la dirección (#/login?admin).
export default function Login() {
  const { isAuthenticated, login } = useAppAuth();
  const navegar = useNavigate();
  const [formAdmin, setFormAdmin] = React.useState(false);
  const [usuario, setUsuario] = React.useState("");
  const [clave, setClave] = React.useState("");
  const [error, setError] = React.useState("");
  const [entrando, setEntrando] = React.useState(false);
  const verAdmin = /admin/i.test(location.hash);

  React.useEffect(() => {
    if (isAuthenticated) {
      setEntrando(true);
      const t = setTimeout(() => navegar("/dashboard"), 300);
      return () => clearTimeout(t);
    }
  }, [isAuthenticated, navegar]);

  const enviarAdmin = (e) => {
    e.preventDefault();
    setError("");
    if (login(usuario, clave)) setEntrando(true);
    else setError("Usuario o contraseña incorrectos · 用户名或密码错误");
  };

  return (
    <div className="tp-acceso">
      <span className="tp-acceso-luz" aria-hidden="true" />
      <div className="tp-acceso-rollo">
        <span className="tp-rodillo arriba" aria-hidden="true" />
        <main className="tp-acceso-papel">
          <span className="tp-acceso-sello" aria-hidden="true" translate="no">
            <i>入</i>
            <i>门</i>
          </span>
          <Logo tono="claro" tamano={48} />
          <img className="tp-acceso-mono" src="./mono/saluda.png" alt="" />
          <h1>
            Bienvenido de nuevo
            <small>欢迎回来</small>
          </h1>
          <p className="tp-acceso-sub">Prepara el DELE A1–B2 con el Rey Mono · 和美猴王一起备考DELE</p>
          {entrando ? (
            <p className="tp-acceso-estado" role="status">
              <LoaderCircleIcon size={20} className="tp-girando" aria-hidden="true" /> Entrando… · 正在进入…
            </p>
          ) : formAdmin ? (
            <form className="tp-acceso-form" onSubmit={enviarAdmin}>
              <h2>Acceso de administrador · 管理员登录</h2>
              {error && (
                <p className="tp-acceso-error" role="alert">
                  {error}
                </p>
              )}
              <label>
                Usuario · 用户名
                <input value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" required />
              </label>
              <label>
                Contraseña · 密码
                <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} autoComplete="current-password" required />
              </label>
              <button type="submit" className="tp-btn-laca">
                <KeyRoundIcon size={18} aria-hidden="true" /> Entrar · 进入
              </button>
              <button type="button" className="tp-btn-texto" onClick={() => setFormAdmin(false)}>
                <ArrowLeftIcon size={15} aria-hidden="true" /> Volver · 返回
              </button>
            </form>
          ) : (
            <div className="tp-acceso-acciones">
              <button type="button" className="tp-btn-laca" onClick={() => navegar("/sign-in")}>
                <LogInIcon size={20} aria-hidden="true" /> Iniciar sesión · 登录
              </button>
              {verAdmin && (
                <button type="button" className="tp-btn-texto" onClick={() => setFormAdmin(true)}>
                  <KeyRoundIcon size={15} aria-hidden="true" /> Acceso de administrador · 管理员入口
                </button>
              )}
              <div className="tp-acceso-wechat">
                <img src="./images/qr-wechat.png" alt="Código QR de WeChat · 微信二维码" onError={(e) => (e.currentTarget.style.display = "none")} />
                <p>
                  <MessageCircleIcon size={16} aria-hidden="true" />
                  <span>
                    ¿No tienes cuenta? Pídela por WeChat a tu academia.
                    <br />
                    还没有账号？请通过微信联系我们开通。
                  </span>
                </p>
              </div>
            </div>
          )}
          <Link to="/" className="tp-btn-texto tp-acceso-volver">
            <ArrowLeftIcon size={15} aria-hidden="true" /> Portada · 首页
          </Link>
        </main>
        <span className="tp-rodillo abajo" aria-hidden="true" />
      </div>
    </div>
  );
}
