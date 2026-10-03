/* Google Analytics 4
   Pegá tu ID de medición (empieza con "G-") entre las comillas.
   Mientras esté vacío, no se carga nada. */
window.MA_GA_ID = "G-9QQGJ3EWHC";

(function () {
  var id = window.MA_GA_ID;
  window.maTrack = function () {};
  if (!id) return;
  // La etiqueta de Google ya está en el <head> de cada página; acá solo se registran los clics.
  if (typeof window.gtag !== 'function') return;
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
