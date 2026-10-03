(function () {
  var D = window.MA_DATA.equipos, $ = function (id) { return document.getElementById(id); };
  var st = { r: '160', k: '16' };
  function leerParams() {
    var q = new URLSearchParams(location.search || (location.hash.split('?')[1] || ''));
    st.r = D[q.get('rango')] ? q.get('rango') : '160'; st.k = '16';
    if (q.get('kva') && D[st.r][q.get('kva')]) st.k = q.get('kva');
  }
  leerParams();
  window.addEventListener('hashchange', function () { if (location.hash.indexOf('#/producto') === 0) { leerParams(); render(); } });
  var RL = { '160': '160V – 245V', '110': '110V – 245V' };

  function render() {
    document.querySelectorAll('#rangos .opt-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.r === st.r); });
    document.querySelectorAll('#potencias .opt-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.k === st.k); });
    var e = D[st.r][st.k];
    $('amp-text').textContent = e.amp || '';
    $('amp-line').classList.toggle('hidden', !e.amp);
    $('precio').textContent = MA_formatPrecio(e.precio);
    $('precio-nota').textContent = e.precio == null ? 'Equipo especial · te cotizamos por WhatsApp' : 'Precio final · Efectivo o transferencia';
    var p16 = D[st.r]['16'].precio, dif = (p16 != null && e.precio != null) ? p16 - e.precio : null;
    var mostrar = (st.k === '12' || st.k === '14') && dif != null && dif >= 0 && dif <= 50000;
    if (mostrar) {
      if (dif === 0) { $('tip16-title').textContent = 'Mismo precio, más potencia.'; $('tip16-text').textContent = 'Por el mismo valor te llevás el de 16 kVA, con más resto para el futuro.'; }
      else { $('tip16-title').textContent = 'Por solo ' + MA_formatPrecio(dif) + ' más, 16 kVA.'; $('tip16-text').textContent = 'Te llevás el de 16 kVA, con más resto para el futuro.'; }
    }
    $('tip16').classList.toggle('hidden', !mostrar); $('tip16').classList.toggle('flex', mostrar);
    $('wa-label').textContent = e.precio == null ? 'Pedir cotización por WhatsApp' : 'Consultar disponibilidad por WhatsApp';
    var msg = 'Hola, quiero consultar ' + (e.precio == null ? 'el precio' : 'la disponibilidad') + ' del estabilizador de ' + st.k + ' kVA, rango ' + RL[st.r] + '.';
    $('wa-btn').href = 'https://wa.me/' + MA_DATA.whatsapp + '?text=' + encodeURIComponent(msg);
    if (!window.MA_PREVIEW) history.replaceState(null, '', '?rango=' + st.r + '&kva=' + st.k);
  }
  document.querySelectorAll('#rangos .opt-btn').forEach(function (b) { b.addEventListener('click', function () { st.r = b.dataset.r; render(); }); });
  document.querySelectorAll('#potencias .opt-btn').forEach(function (b) { b.addEventListener('click', function () { st.k = b.dataset.k; render(); }); });
  $('to16').addEventListener('click', function () { st.k = '16'; render(); });
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      document.querySelectorAll('.thumb').forEach(function (x) { x.classList.remove('active'); }); t.classList.add('active');
      var img = $('main-img'); img.style.opacity = 0; setTimeout(function () { img.src = t.dataset.src; img.style.opacity = 1; }, 150);
    });
  });
  render();
})();
