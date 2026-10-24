/* ============================================================
   AI Español v1 — capa de ajustes JS (inyectado desde index.html)
   Permite modificar la app compilada sin código fuente.
   Ronda 6:
   - "DELE" lleva siempre a los exámenes OFICIALES (no a practicar)
   - pestaña "Oficiales" del menú inferior se llama "DELE"
   - sin botón flotante de "Iniciar sesión" (la portada ya tiene uno)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Exámenes DELE -> oficiales ---------- */
  function redirectDele() {
    var h = location.hash || '';
    var m;
  }
  window.addEventListener('hashchange', redirectDele);
  redirectDele();

  /* ---------- 2. Menú inferior: "Oficiales" -> "DELE" ---------- */
  function relabelNav() {
    var links = document.querySelectorAll('a[href="#/oficial"]');
    for (var i = 0; i < links.length; i++) {
      var spans = links[i].querySelectorAll('span');
      for (var j = 0; j < spans.length; j++) {
        if (spans[j].childElementCount === 0 && /^\s*Oficiales\s*$/.test(spans[j].textContent)) {
          spans[j].textContent = 'DELE';
        }
      }
    }
  }

  /* ---------- 3. Limpieza: botón flotante antiguo ---------- */
  function removeOldLoginBtn() {
    var b = document.getElementById('ov-login-btn');
    if (b) b.remove();
  }

  function tick() {
    relabelNav();
    removeOldLoginBtn();
  }

  function start() {
    tick();
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; tick(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
