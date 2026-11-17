import { useSignIn } from "@clerk/clerk-react";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, KeyRoundIcon, LoaderCircleIcon, LogInIcon, MailIcon, RotateCwIcon, ShieldCheckIcon, WifiOffIcon } from "lucide-react";
import * as React from "react";
import "../../styles/v21-acceso.css";

// Inicio de sesión propio (sin la ventana de Clerk): el alumno solo ve nuestro formulario y por debajo
// se usa la API de Clerk (useSignIn): contraseña, código por correo (primer o segundo factor),
// código de app/SMS/respaldo y «he olvidado la contraseña».

// Sin ClerkProvider (pruebas locales) useSignIn lanza: se trata como «Clerk no disponible»
function useSignInSeguro() {
  try {
    return useSignIn();
  } catch {
    return { isLoaded: false, signIn: null, setActive: null, sinProveedor: true };
  }
}

const ERRORES = {
  form_password_incorrect: "Contraseña incorrecta · 密码错误",
  form_identifier_not_found: "No existe ninguna cuenta con ese correo o usuario · 找不到该账号",
  form_code_incorrect: "El código no es correcto · 验证码不正确",
  verification_expired: "El código ha caducado: pide otro · 验证码已过期，请重新获取",
  verification_failed: "Demasiados intentos con este código: pide otro · 尝试次数过多，请重新获取验证码",
  too_many_requests: "Demasiados intentos. Espera un momento · 尝试次数过多，请稍候",
  user_locked: "Cuenta bloqueada temporalmente por seguridad · 账号已被临时锁定",
  form_password_pwned: "Esa contraseña no es segura, elige otra · 该密码不安全，请换一个",
  form_password_length_too_short: "La contraseña es demasiado corta · 密码太短",
  form_password_validation_failed: "La contraseña no cumple los requisitos · 密码不符合要求",
  form_param_format_invalid: "El formato no es válido · 格式不正确",
  form_param_nil: "Rellena todos los campos · 请填写所有字段",
  strategy_for_user_invalid: "Esta cuenta no puede entrar de esta forma · 该账号不支持此登录方式",
  session_exists: "Ya has iniciado sesión · 你已登录",
};

function mensajeError(error) {
  const primero = error?.errors?.[0];
  if (primero?.code && ERRORES[primero.code]) return ERRORES[primero.code];
  if (!navigator.onLine) return "Sin conexión a internet · 没有网络连接";
  return primero?.longMessage || primero?.message || "No se ha podido iniciar sesión. Inténtalo de nuevo · 登录失败，请重试";
}

// Cómo se explica cada tipo de código
const TEXTO_CODIGO = {
  email_code: (destino) => ({ es: `Te hemos enviado un código a ${destino || "tu correo"}.`, zh: "我们已向你的邮箱发送了验证码。" }),
  phone_code: (destino) => ({ es: `Te hemos enviado un SMS a ${destino || "tu teléfono"}.`, zh: "我们已向你的手机发送了短信验证码。" }),
  totp: () => ({ es: "Escribe el código de tu app de autenticación.", zh: "请输入身份验证应用中的验证码。" }),
  backup_code: () => ({ es: "Escribe uno de tus códigos de respaldo.", zh: "请输入一个备用码。" }),
  reset_password_email_code: (destino) => ({ es: `Te hemos enviado un código a ${destino || "tu correo"} para cambiar la contraseña.`, zh: "我们已向你的邮箱发送了重置密码的验证码。" }),
};

const PREFERENCIA_SEGUNDO = ["email_code", "phone_code", "totp", "backup_code"];

// Seis casillas para el código; acepta pegar el código entero
function CasillasCodigo({ valor, onCambio, onCompleto, largo = 6, deshabilitado }) {
  const refs = React.useRef([]);
  const poner = (texto, desde = 0) => {
    const limpio = texto.replace(/\D/g, "");
    if (!limpio) return;
    const nuevo = (valor.slice(0, desde) + limpio).slice(0, largo);
    onCambio(nuevo);
    refs.current[Math.min(nuevo.length, largo - 1)]?.focus();
    if (nuevo.length === largo) onCompleto?.(nuevo);
  };
  React.useEffect(() => {
    refs.current[0]?.focus();
  }, []);
  return (
    <div className="v21-casillas" onPaste={(e) => { e.preventDefault(); poner(e.clipboardData.getData("text")); }}>
      {Array.from({ length: largo }, (_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={valor[i] ? "llena" : ""}
          value={valor[i] || ""}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={`Dígito ${i + 1} · 第${i + 1}位`}
          maxLength={largo}
          disabled={deshabilitado}
          style={{ "--i": i }}
          onChange={(e) => {
            const texto = e.target.value;
            if (texto.length > 1) return poner(texto, i);
            if (!/^\d?$/.test(texto)) return;
            const nuevo = (valor.slice(0, i) + texto + valor.slice(i + 1)).slice(0, largo);
            onCambio(nuevo);
            if (texto && i < largo - 1) refs.current[i + 1]?.focus();
            if (nuevo.length === largo && !nuevo.includes(" ")) onCompleto?.(nuevo);
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !valor[i] && i > 0) {
              refs.current[i - 1]?.focus();
              onCambio(valor.slice(0, i - 1));
            }
          }}
        />
      ))}
    </div>
  );
}

// avisar(evento): «paso:<nombre>», «error», «clave:dentro», «clave:fuera», «entrando» (justo antes de abrir la sesión)
export function FormularioAcceso({ alEntrar, avisar }) {
  const { isLoaded, signIn, setActive, sinProveedor } = useSignInSeguro();
  // paso: datos | codigo | olvido | nueva
  const [paso, setPaso] = React.useState("datos");
  const [identificador, setIdentificador] = React.useState("");
  const [clave, setClave] = React.useState("");
  const [verClave, setVerClave] = React.useState(false);
  const [codigo, setCodigo] = React.useState("");
  const [nuevaClave, setNuevaClave] = React.useState("");
  // { fase: "primero" | "segundo", estrategia, destino }
  const [verificacion, setVerificacion] = React.useState(null);
  const [error, setError] = React.useState("");
  const [intentos, setIntentos] = React.useState(0);
  const [ocupado, setOcupado] = React.useState(false);
  const [aviso, setAviso] = React.useState("");
  const [lento, setLento] = React.useState(false);

  // Si Clerk no llega (red de China, bloqueos) se avisa en vez de quedarse cargando para siempre
  React.useEffect(() => {
    if (isLoaded) return;
    const espera = setTimeout(() => setLento(true), 12000);
    return () => clearTimeout(espera);
  }, [isLoaded]);

  const fallo = (err) => {
    setError(typeof err === "string" ? err : mensajeError(err));
    setIntentos((n) => n + 1);
    avisar?.("error");
  };
  React.useEffect(() => {
    avisar?.(`paso:${paso}`);
  }, [paso]); // eslint-disable-line react-hooks/exhaustive-deps

  const terminar = async (resultado) => {
    avisar?.("entrando");
    await setActive({ session: resultado.createdSessionId });
    alEntrar?.();
  };

  // Decide el siguiente paso según el estado del intento de Clerk
  const continuar = async (resultado) => {
    if (resultado.status === "complete") return terminar(resultado);
    if (resultado.status === "needs_new_password") {
      setPaso("nueva");
      return;
    }
    if (resultado.status === "needs_second_factor") {
      const factores = resultado.supportedSecondFactors || [];
      const factor = PREFERENCIA_SEGUNDO.map((s) => factores.find((f) => f.strategy === s)).find(Boolean);
      if (!factor) return fallo("Esta cuenta necesita un método de verificación no disponible · 该账号需要不支持的验证方式");
      if (factor.strategy === "email_code") await signIn.prepareSecondFactor({ strategy: "email_code", emailAddressId: factor.emailAddressId });
      if (factor.strategy === "phone_code") await signIn.prepareSecondFactor({ strategy: "phone_code", phoneNumberId: factor.phoneNumberId });
      setVerificacion({ fase: "segundo", estrategia: factor.strategy, destino: factor.safeIdentifier, factor });
      setCodigo("");
      setPaso("codigo");
      return;
    }
    if (resultado.status === "needs_first_factor") {
      return pedirCodigoCorreo(resultado);
    }
    fallo("No se ha podido completar el acceso · 无法完成登录");
  };

  // Primer factor por código al correo (entrar sin contraseña o cuenta sin contraseña)
  const pedirCodigoCorreo = async (intento) => {
    const factor = (intento.supportedFirstFactors || []).find((f) => f.strategy === "email_code");
    if (!factor) return fallo("Esta cuenta no puede recibir códigos por correo · 该账号无法接收邮箱验证码");
    await intento.prepareFirstFactor({ strategy: "email_code", emailAddressId: factor.emailAddressId });
    setVerificacion({ fase: "primero", estrategia: "email_code", destino: factor.safeIdentifier, factor });
    setCodigo("");
    setPaso("codigo");
  };

  const accion = (fn) => async (evento) => {
    evento?.preventDefault?.();
    if (!isLoaded || ocupado) return;
    setError("");
    setAviso("");
    setOcupado(true);
    try {
      await fn();
    } catch (err) {
      fallo(err);
    } finally {
      setOcupado(false);
    }
  };

  const entrarConClave = accion(async () => {
    const resultado = await signIn.create({ identifier: identificador.trim(), password: clave });
    await continuar(resultado);
  });

  const entrarConCodigo = accion(async () => {
    if (!identificador.trim()) return fallo("Escribe tu correo o usuario · 请输入邮箱或用户名");
    const intento = await signIn.create({ identifier: identificador.trim() });
    await pedirCodigoCorreo(intento);
  });

  const pedirReinicio = accion(async () => {
    if (!identificador.trim()) return fallo("Escribe tu correo · 请输入邮箱");
    const intento = await signIn.create({ strategy: "reset_password_email_code", identifier: identificador.trim() });
    const factor = (intento.supportedFirstFactors || []).find((f) => f.strategy === "reset_password_email_code");
    setVerificacion({ fase: "primero", estrategia: "reset_password_email_code", destino: factor?.safeIdentifier });
    setCodigo("");
    setPaso("codigo");
  });

  const comprobarCodigo = (valor = codigo) =>
    accion(async () => {
      const limpio = valor.trim();
      if (limpio.length < 6) return fallo("Escribe el código completo · 请输入完整验证码");
      const { fase, estrategia } = verificacion;
      const resultado =
        fase === "segundo"
          ? await signIn.attemptSecondFactor({ strategy: estrategia, code: limpio })
          : await signIn.attemptFirstFactor({ strategy: estrategia, code: limpio });
      await continuar(resultado);
    })();

  const reenviar = accion(async () => {
    const { fase, estrategia, factor } = verificacion;
    if (estrategia === "reset_password_email_code") {
      await signIn.create({ strategy: "reset_password_email_code", identifier: identificador.trim() });
    } else if (fase === "segundo") {
      await signIn.prepareSecondFactor(estrategia === "phone_code" ? { strategy: "phone_code", phoneNumberId: factor.phoneNumberId } : { strategy: "email_code", emailAddressId: factor.emailAddressId });
    } else {
      await signIn.prepareFirstFactor({ strategy: "email_code", emailAddressId: factor.emailAddressId });
    }
    setCodigo("");
    setAviso("Código reenviado · 验证码已重新发送");
  });

  const guardarNuevaClave = accion(async () => {
    const resultado = await signIn.resetPassword({ password: nuevaClave, signOutOfOtherSessions: true });
    await continuar(resultado);
  });

  const volver = () => {
    setPaso("datos");
    setError("");
    setAviso("");
    setCodigo("");
    setVerificacion(null);
  };

  if (sinProveedor || (!isLoaded && lento)) {
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

  const avisoError = error && (
    <p key={intentos} className="tp-acceso-error v14a-sacude" role="alert">
      {error}
    </p>
  );
  const avisoOk = aviso && (
    <p className="tp-acceso-estado" role="status">
      {aviso}
    </p>
  );
  const botonPrincipal = (icono, texto) => (
    <button type="submit" className="tp-btn-laca v21-boton" disabled={!isLoaded || ocupado}>
      {ocupado || !isLoaded ? <LoaderCircleIcon size={20} className="tp-girando" aria-hidden="true" /> : icono}
      {ocupado ? "Un momento… · 请稍候…" : texto}
    </button>
  );

  if (paso === "codigo" && verificacion) {
    const texto = (TEXTO_CODIGO[verificacion.estrategia] || TEXTO_CODIGO.email_code)(verificacion.destino);
    const puedeReenviar = ["email_code", "phone_code", "reset_password_email_code"].includes(verificacion.estrategia);
    const esRespaldo = verificacion.estrategia === "backup_code";
    return (
      <form className={`tp-acceso-form v21-paso ${error ? "v14a-con-error" : ""}`} onSubmit={(e) => { e.preventDefault(); comprobarCodigo(); }}>
        <span className="v21-sobre" aria-hidden="true">
          {verificacion.estrategia === "totp" || esRespaldo ? <ShieldCheckIcon size={30} /> : <MailIcon size={30} />}
        </span>
        <h2>Código de verificación · 验证码</h2>
        <p className="v21-explica">
          {texto.es}
          <span lang="zh-Hans">{texto.zh}</span>
        </p>
        {avisoError}
        {avisoOk}
        {esRespaldo ? (
          <label>
            Código de respaldo · 备用码
            <input value={codigo} onChange={(e) => setCodigo(e.target.value)} autoComplete="off" required />
          </label>
        ) : (
          <CasillasCodigo valor={codigo} onCambio={setCodigo} onCompleto={(v) => comprobarCodigo(v)} deshabilitado={ocupado} />
        )}
        {botonPrincipal(<ShieldCheckIcon size={18} aria-hidden="true" />, "Verificar · 验证")}
        <div className="v21-fila">
          {puedeReenviar && (
            <button type="button" className="tp-btn-texto" onClick={reenviar} disabled={ocupado}>
              <RotateCwIcon size={14} aria-hidden="true" /> Reenviar · 重新发送
            </button>
          )}
          <button type="button" className="tp-btn-texto" onClick={volver}>
            <ArrowLeftIcon size={14} aria-hidden="true" /> Volver · 返回
          </button>
        </div>
      </form>
    );
  }

  if (paso === "nueva") {
    return (
      <form className={`tp-acceso-form v21-paso ${error ? "v14a-con-error" : ""}`} onSubmit={guardarNuevaClave}>
        <h2>Nueva contraseña · 新密码</h2>
        {avisoError}
        <label>
          Nueva contraseña · 新密码
          <input type="password" value={nuevaClave} onChange={(e) => setNuevaClave(e.target.value)} autoComplete="new-password" minLength={8} required />
        </label>
        {botonPrincipal(<KeyRoundIcon size={18} aria-hidden="true" />, "Guardar y entrar · 保存并进入")}
      </form>
    );
  }

  if (paso === "olvido") {
    return (
      <form className={`tp-acceso-form v21-paso ${error ? "v14a-con-error" : ""}`} onSubmit={pedirReinicio}>
        <h2>¿Has olvidado la contraseña? · 忘记密码？</h2>
        <p className="v21-explica">
          Te enviaremos un código a tu correo para crear una nueva.
          <span lang="zh-Hans">我们会向你的邮箱发送验证码，用来设置新密码。</span>
        </p>
        {avisoError}
        <label>
          Correo · 邮箱
          <input type="email" value={identificador} onChange={(e) => setIdentificador(e.target.value)} autoComplete="email" required />
        </label>
        {botonPrincipal(<MailIcon size={18} aria-hidden="true" />, "Enviar código · 发送验证码")}
        <button type="button" className="tp-btn-texto" onClick={volver}>
          <ArrowLeftIcon size={14} aria-hidden="true" /> Volver · 返回
        </button>
      </form>
    );
  }

  return (
    <form className={`tp-acceso-form v21-paso ${error ? "v14a-con-error" : ""}`} onSubmit={entrarConClave}>
      {avisoError}
      <label>
        Correo o usuario · 邮箱或用户名
        <input value={identificador} onChange={(e) => setIdentificador(e.target.value)} autoComplete="username" autoCapitalize="none" spellCheck={false} required />
      </label>
      <label>
        Contraseña · 密码
        <span className="v21-clave">
          <input type={verClave ? "text" : "password"} value={clave} onChange={(e) => setClave(e.target.value)} autoComplete="current-password" required onFocus={() => avisar?.("clave:dentro")} onBlur={() => avisar?.("clave:fuera")} />
          <button type="button" onClick={() => setVerClave((v) => !v)} aria-label={verClave ? "Ocultar contraseña · 隐藏密码" : "Mostrar contraseña · 显示密码"}>
            {verClave ? <EyeOffIcon size={18} aria-hidden="true" /> : <EyeIcon size={18} aria-hidden="true" />}
          </button>
        </span>
      </label>
      {botonPrincipal(<LogInIcon size={20} aria-hidden="true" />, "Entrar · 进入")}
      <div className="v21-fila">
        <button type="button" className="tp-btn-texto" onClick={entrarConCodigo} disabled={ocupado}>
          <MailIcon size={14} aria-hidden="true" /> Entrar con código · 用验证码登录
        </button>
        <button type="button" className="tp-btn-texto" onClick={() => { setError(""); setPaso("olvido"); }}>
          ¿Olvidaste la contraseña? · 忘记密码？
        </button>
      </div>
    </form>
  );
}
