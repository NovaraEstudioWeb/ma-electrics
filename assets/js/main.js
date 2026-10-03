// Links viejos de la versión de un solo archivo (#/equipos, #/producto?...) -> páginas reales
(function () {
  var h = location.hash; if (h.indexOf('#/') !== 0) return;
  var m = { home: 'index.html', equipos: 'equipos.html', producto: 'producto.html', servicio: 'servicio.html', preguntas: 'preguntas.html' };
  var rest = h.slice(2), q = rest.split('?')[1], parts = rest.split('?')[0].split('/');
  var dest = (m[parts[0]] || 'index.html') + (q ? '?' + q : '') + (parts[1] ? '#' + parts[1] : '');
  location.replace(dest);
})();

(function () {
  // Menú mobile
  var btn = document.getElementById('menu-btn'), menu = document.getElementById('mobile-menu');
  if (btn && menu) btn.addEventListener('click', function () { menu.classList.toggle('hidden'); menu.classList.toggle('flex'); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.classList.add('hidden'); menu.classList.remove('flex'); }); });

  // Link activo
  var page = document.querySelector('main') && document.querySelector('main').dataset.page;
  document.querySelectorAll('[data-nav]').forEach(function (a) { if (a.dataset.nav === page) a.classList.add('active'); });

  // Asistente
  var ab = document.getElementById('assist-btn'), ap = document.getElementById('assist-panel'), ac = document.getElementById('assist-close');
  if (ab && ap) ab.addEventListener('click', function () { ap.classList.toggle('hidden'); });
  if (ac && ap) ac.addEventListener('click', function () { ap.classList.add('hidden'); });

  // Precios desde precios.js (elementos con data-precio="160-16")
  if (window.MA_DATA) document.querySelectorAll('[data-precio]').forEach(function (el) {
    var p = el.dataset.precio.split('-'), e = MA_DATA.equipos[p[0]] && MA_DATA.equipos[p[0]][p[1]];
    if (e) el.textContent = MA_formatPrecio(e.precio);
  });
})();

// Reseñas
(function () {
  var box = document.getElementById('resenas');
  if (!box || !window.MA_RESENAS) return;
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  box.innerHTML = MA_RESENAS.map(function (r) {
    var stars = r.estrellas ? '<div class="text-yellow-400 mb-3">' + '★'.repeat(r.estrellas) + '<span class="text-border">' + '★'.repeat(5 - r.estrellas) + '</span></div>' : '';
    var body = r.texto
      ? '<p class="text-lg text-text-primary mb-4">"' + esc(r.texto) + '"</p>'
      : '<p class="text-text-secondary mb-4">Reseña de un cliente en Google Maps.</p>';
    var who = r.nombre ? '<span class="font-bold">' + esc(r.nombre) + '</span>' : '<span class="text-silver text-sm">Cliente en Google</span>';
    return '<div class="bg-surface-elevated rounded-xl border border-border p-5 flex flex-col justify-between">' +
      '<div>' + stars + body + '</div>' +
      '<div class="border-t border-border pt-3 flex items-center justify-between gap-2">' + who +
      '<a href="' + r.url + '" target="_blank" rel="noopener" class="tap text-sm font-semibold text-accent-soft hover:text-white whitespace-nowrap">Ver en Google →</a></div></div>';
  }).join('');
})();

// Aparición al hacer scroll
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in-view'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  els.forEach(function (e) { io.observe(e); });
})();

// Preguntas: abrir y cerrar con deslizamiento suave
(function () {
  document.querySelectorAll('details.faq').forEach(function (d) {
    var sum = d.querySelector('summary'), body = d.querySelector('.faq-body'), anim;
    sum.addEventListener('click', function (e) {
      e.preventDefault();
      if (anim) anim.cancel();
      if (!d.open) {
        d.open = true;
        var h = body.scrollHeight;
        anim = body.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 320, easing: 'ease-out' });
      } else {
        var h2 = body.scrollHeight;
        anim = body.animate([{ height: h2 + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 260, easing: 'ease-in' });
        anim.onfinish = function () { d.open = false; };
      }
    });
  });
})();

// Email: en computadora abre Gmail web (el mailto no hace nada si no hay un programa de correo configurado)
(function () {
  var escritorio = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    if (!escritorio) return;
    var u = a.getAttribute('href').slice(7), to = u.split('?')[0], q = new URLSearchParams(u.split('?')[1] || '');
    var g = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to);
    if (q.get('subject')) g += '&su=' + encodeURIComponent(q.get('subject'));
    if (q.get('body')) g += '&body=' + encodeURIComponent(q.get('body'));
    a.href = g; a.target = '_blank'; a.rel = 'noopener';
  });
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = document.getElementById('toast');
      var done = function () { if (t) { t.style.opacity = 1; setTimeout(function () { t.style.opacity = 0; }, 1800); } };
      if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(done, done); else done();
    });
  });
})();

// Números que cuentan solos
(function () {
  var els = document.querySelectorAll('[data-count]'); if (!els.length) return;
  var fmt = function (n) { return n.toLocaleString('es-AR'); };
  function run(el) {
    var fin = parseInt(el.dataset.count, 10), t0 = null, dur = 3200;
    function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur); el.textContent = fmt(Math.round(fin * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  els.forEach(function (el) { el.textContent = '0'; });
  var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } }); }, { threshold: 0.9 });
  els.forEach(function (el) { io.observe(el); });
})();

// Globito de WhatsApp (aparece una vez por visita)
(function () {
  var b = document.getElementById('wa-bubble'); if (!b) return;
  var visto = false; try { visto = sessionStorage.getItem('ma_bubble') === '1'; } catch (e) {}
  if (visto) return;
  setTimeout(function () { b.classList.remove('hidden'); requestAnimationFrame(function () { b.classList.add('show'); }); }, 7000);
  var cerrar = function () { b.classList.remove('show'); setTimeout(function () { b.classList.add('hidden'); }, 300); try { sessionStorage.setItem('ma_bubble', '1'); } catch (e) {} };
  document.getElementById('wa-bubble-close').addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); cerrar(); });
  b.addEventListener('click', function () { try { sessionStorage.setItem('ma_bubble', '1'); } catch (e) {} });
})();

// Globito para celular (arriba de la barra)
(function () {
  var b = document.getElementById('wa-bubble-m'); if (!b || window.innerWidth >= 1024) return;
  var visto = false; try { visto = sessionStorage.getItem('ma_bubble') === '1'; } catch (e) {}
  if (visto) return;
  var marcar = function () { try { sessionStorage.setItem('ma_bubble', '1'); } catch (e) {} };
  setTimeout(function () { b.classList.remove('hidden'); b.classList.add('flex'); setTimeout(function(){ b.classList.add('hidden'); marcar(); }, 9000); }, 8000);
  document.getElementById('wa-bubble-m-close').addEventListener('click', function () { b.classList.add('hidden'); marcar(); });
  b.querySelector('a').addEventListener('click', marcar);
})();
