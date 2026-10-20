/* ============================================================
   AI Español v1 — capa de ajustes JS (inyectado desde index.html)
   Permite modificar la app compilada sin código fuente:
   DOM, botones, flujos (p. ej. login de Clerk).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Botón flotante "Iniciar sesión" (un clic, Clerk) ---------- */
  var LOGIN_BTN_ID = 'ov-login-btn';

  function onAuthPages() {
    var h = (location.hash || '') + ' ' + (location.pathname || '');
    return /login|sign-in|signin/.test(h);
  }

  function loginTick() {
    var clerk = window.Clerk;
    var btn = document.getElementById(LOGIN_BTN_ID);

    // Clerk aún no cargó: esperar (y ocultar botón si estaba)
    if (!clerk || !clerk.loaded) {
      if (btn) btn.hidden = true;
      return;
    }

    // Sesión iniciada o en pantalla de login: no mostrar el botón
    if (clerk.user || onAuthPages()) {
      if (btn) btn.remove();
      return;
    }

    if (!btn) {
      btn = document.createElement('button');
      btn.id = LOGIN_BTN_ID;
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Iniciar sesión');
      btn.textContent = 'Iniciar sesión';
      btn.addEventListener('click', function () {
        try {
          window.Clerk.openSignIn();
        } catch (e) {
          location.hash = '#/login'; // Plan B: ir a la página de login
        }
      });
      document.body.appendChild(btn);
    }
    btn.hidden = false;
  }

  var started = false;
  function start() {
    if (started) return;
    started = true;
    setInterval(loginTick, 900);
    loginTick();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
