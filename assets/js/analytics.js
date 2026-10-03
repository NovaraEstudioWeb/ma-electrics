/* Google Analytics 4
   Pegá tu ID de medición (empieza con "G-") entre las comillas.
   Mientras esté vacío, no se carga nada. */
window.MA_GA_ID = "G-9QQGJ3EWHC";

(function () {
  var id = window.MA_GA_ID;
  window.maTrack = function () {};
  if (!id) return;
  var s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date()); gtag('config', id);
  window.maTrack = function (evento, datos) { gtag('event', evento, datos || {}); };
  // Clics importantes: WhatsApp, email, "Ver detalle", teléfono
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('wa.me') >= 0) maTrack('click_whatsapp', { ubicacion: a.textContent.trim().slice(0, 60), pagina: location.pathname });
    else if (h.indexOf('mailto:') === 0 || h.indexOf('mail.google.com') >= 0) maTrack('click_email', { pagina: location.pathname });
    else if (h.indexOf('producto.html') >= 0) maTrack('ver_detalle', { destino: h });
    else if (h.indexOf('maps.') >= 0 || h.indexOf('google.com/maps') >= 0) maTrack('click_mapa', { pagina: location.pathname });
  }, true);
})();
