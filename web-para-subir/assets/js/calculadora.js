/* Calculadora "¿Qué equipo necesito?"
   Reglas (editables):
   - hasta 40 A de consumo estimado  -> 16 kVA (63 A)
   - de 40 a 55 A                    -> 20 kVA (70 A)
   - de 55 a 75 A                    -> 25 kVA (80 A)
   - más de 75 A                     -> consultar (30/35 kVA) */
(function () {
  var ITEMS = [
    ['Aire 2250 frigorías', 'split chico', 5.0, 0],
    ['Aire 3000 frigorías', 'split estándar', 6.5, 2],
    ['Aire 4500 frigorías', 'split grande', 9.5, 0],
    ['Aire 6000 frigorías', 'split muy grande', 12.5, 0],
    ['Heladera', 'con freezer', 2.0, 1],
    ['Freezer', 'extra', 2.5, 0],
    ['Lavarropas', 'automático', 5.0, 1],
    ['Microondas', '', 5.5, 1],
    ['Horno eléctrico', '', 9.0, 0],
    ['Termotanque eléctrico', '', 7.0, 0],
    ['Bomba de agua', 'presurizadora', 4.5, 0],
    ['Anafe / cocina eléctrica', '', 10.0, 0],
    ['Air fryer / tostadora', '', 6.0, 0],
    ['PC / TV', 'por equipo', 1.5, 2],
    ['Pava eléctrica', '', 9.0, 0]
  ];
  var SIMULTANEIDAD = 0.75;
  var REGLAS = [
    { hasta: 40, kva: '16 kVA', cap: 63 },
    { hasta: 55, kva: '20 kVA', cap: 70 },
    { hasta: 75, kva: '25 kVA', cap: 80 }
  ];
  var box = document.getElementById('calc-items'); if (!box) return;
  box.innerHTML = ITEMS.map(function (it, i) {
    return '<div class="flex items-center justify-between p-3 rounded-xl bg-surface-elevated border border-border" data-i="' + i + '">' +
      '<div><div class="font-semibold text-sm">' + it[0] + '</div><div class="text-xs text-silver">' + (it[1] ? it[1] + ' · ' : '') + '~' + it[2] + ' A</div></div>' +
      '<div class="flex items-center gap-2"><button type="button" data-d="-1" class="w-8 h-8 rounded-lg bg-surface border border-border text-lg font-bold hover:border-silver">−</button>' +
      '<span class="cnt w-5 text-center font-bold">' + it[3] + '</span>' +
      '<button type="button" data-d="1" class="w-8 h-8 rounded-lg bg-surface border border-border text-lg font-bold hover:border-silver">+</button></div></div>';
  }).join('');
  var $ = function (id) { return document.getElementById(id); };
  function calc() {
    var total = 0, lista = [];
    box.querySelectorAll('[data-i]').forEach(function (row) {
      var n = parseInt(row.querySelector('.cnt').textContent, 10), it = ITEMS[row.dataset.i];
      total += n * it[2]; if (n) lista.push(n + ' ' + it[0].toLowerCase());
    });
    var est = Math.round(total * SIMULTANEIDAD);
    var r = REGLAS.find(function (x) { return est <= x.hasta; });
    var pct, msg;
    if (r) {
      $('calc-model').textContent = r.kva;
      $('calc-cap').textContent = r.cap + ' A constantes';
      $('calc-max').textContent = r.cap + ' A';
      pct = Math.min(100, Math.round(est / r.cap * 100));
      $('calc-free').textContent = 'Te quedan ~' + (r.cap - est) + ' A libres para el futuro';
      $('calc-free-sub').textContent = 'Margen para sumar artefactos en el futuro.';
      msg = 'Hola, usé la calculadora de la web: ' + (lista.join(', ') || 'sin artefactos') + ' (~' + est + ' A). Me recomienda el equipo de ' + r.kva + '.';
    } else {
      $('calc-model').textContent = 'A medida';
      $('calc-cap').textContent = 'Línea industrial 30 / 35 kVA';
      $('calc-max').textContent = '80 A+';
      pct = 100;
      $('calc-free').textContent = 'Tu consumo necesita un equipo a medida';
      $('calc-free-sub').textContent = 'Te asesoramos por WhatsApp sin compromiso.';
      msg = 'Hola, usé la calculadora de la web: ' + lista.join(', ') + ' (~' + est + ' A). Necesito asesoramiento para un equipo más grande.';
    }
    $('calc-amps').textContent = est + ' A';
    var bar = $('calc-bar'); bar.style.width = pct + '%';
    bar.className = 'h-full rounded-full transition-all duration-300 ' + (pct > 85 ? 'bg-accent' : pct > 65 ? 'bg-yellow-400' : 'bg-whatsapp');
    $('calc-wa').href = 'https://wa.me/5491161573361?text=' + encodeURIComponent(msg);
  }
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-d]'); if (!b) return;
    var c = b.parentNode.querySelector('.cnt');
    c.textContent = Math.max(0, Math.min(20, parseInt(c.textContent, 10) + parseInt(b.dataset.d, 10)));
    calc();
  });
  $('calc-reset').addEventListener('click', function () { box.querySelectorAll('.cnt').forEach(function (c) { c.textContent = '0'; }); calc(); });
  calc();
})();
