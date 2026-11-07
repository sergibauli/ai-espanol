import { UserIcon, CalendarIcon, BookOpenIcon, XIcon, MailIcon, ClockIcon, Link2Icon, CheckIcon, ArrowLeftIcon } from "lucide-react";
import * as React from "react";
import { useSearchParams, Link } from "react-router";
import { f as leerInvitacion, g as enlaceRespuesta } from "../data/clases.js";

// Invitación a una clase (enlace que el profesor envía al alumno): pergamino con los datos y la respuesta por email
function ClasePage() {
  const [params] = useSearchParams();
  const clase = leerInvitacion(params.get("d") || "");
  const [respuesta, setRespuesta] = React.useState(null);
  if (!clase) {
    return (
      <div className="tp-acceso tp-clase">
        <div className="tp-acceso-rollo">
          <span className="tp-rodillo arriba" aria-hidden="true" />
          <main className="tp-acceso-papel">
            <img className="tp-acceso-mono" src="./mono/serio.png" alt="" />
            <h1>
              Invitación no válida
              <small>无效邀请</small>
            </h1>
            <p className="tp-acceso-sub">El enlace no contiene datos de clase válidos. Pide a tu profesor/a que te lo envíe otra vez. · 链接无效，请让老师重新发送。</p>
            <Link to="/" className="tp-btn-laca">
              <ArrowLeftIcon size={18} aria-hidden="true" /> Ir al inicio · 返回首页
            </Link>
          </main>
          <span className="tp-rodillo abajo" aria-hidden="true" />
        </div>
      </div>
    );
  }
  const datos = [
    [CalendarIcon, "Fecha · 日期", clase.fecha],
    [ClockIcon, "Hora · 时间", clase.hora],
  ];
  return (
    <div className="tp-acceso tp-clase">
      <span className="tp-acceso-luz" aria-hidden="true" />
      <div className="tp-acceso-rollo">
        <span className="tp-rodillo arriba" aria-hidden="true" />
        <main className="tp-acceso-papel">
          <span className="tp-acceso-sello" aria-hidden="true" translate="no">
            <i>邀</i>
            <i>请</i>
          </span>
          <span className="tp-panel-ceja">Invitación a clase · 课程邀请</span>
          <h1>{clase.titulo}</h1>
          <p className="tp-acceso-sub">
            <UserIcon size={15} aria-hidden="true" /> {clase.profesor || "Tu profesor/a · 你的老师"}
          </p>
          <ul className="tp-clase-datos">
            {datos.map(([Icono, rotulo, valor]) => (
              <li key={rotulo}>
                <span className="tp-clase-ic">
                  <Icono size={18} aria-hidden="true" />
                </span>
                <span>
                  <small>{rotulo}</small>
                  <b>{valor}</b>
                </span>
              </li>
            ))}
            {clase.enlace && (
              <li>
                <span className="tp-clase-ic">
                  <Link2Icon size={18} aria-hidden="true" />
                </span>
                <span>
                  <small>Enlace de la reunión · 会议链接</small>
                  <a href={clase.enlace} target="_blank" rel="noreferrer">
                    {clase.enlace}
                  </a>
                </span>
              </li>
            )}
            {clase.deberes && (
              <li>
                <span className="tp-clase-ic">
                  <BookOpenIcon size={18} aria-hidden="true" />
                </span>
                <span>
                  <small>Deberes · 作业</small>
                  <b className="tp-clase-deberes">{clase.deberes}</b>
                </span>
              </li>
            )}
          </ul>
          {respuesta ? (
            <p className="tp-acceso-estado" role="status">
              <MailIcon size={18} aria-hidden="true" />
              <span>
                {respuesta === "accept" ? "¡Genial! Se abrirá tu email para confirmar asistencia. · 将打开邮件确认出席。" : "Se abrirá tu email para avisar de que no puedes asistir. · 将打开邮件通知老师。"}
                <br />
                <small>Envía el email para que tu profesor/a reciba la respuesta. · 请发送邮件。</small>
              </span>
            </p>
          ) : (
            <div className="tp-clase-botones">
              <a href={enlaceRespuesta(clase, true)} onClick={() => setRespuesta("accept")} className="tp-btn-laca">
                <CheckIcon size={18} aria-hidden="true" /> Aceptar · 接受
              </a>
              <a href={enlaceRespuesta(clase, false)} onClick={() => setRespuesta("decline")} className="tp-btn-papel">
                <XIcon size={18} aria-hidden="true" /> No puedo · 拒绝
              </a>
            </div>
          )}
        </main>
        <span className="tp-rodillo abajo" aria-hidden="true" />
      </div>
    </div>
  );
}
export { ClasePage as default };
