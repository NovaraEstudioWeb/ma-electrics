(function () {
  var btns = document.querySelectorAll('.tab-btn'), panes = document.querySelectorAll('[data-pane]');
  function show(t) {
    panes.forEach(function (p) { p.classList.toggle('hidden', p.dataset.pane !== t); });
    btns.forEach(function (b) {
      var on = b.dataset.tab === t;
      b.classList.toggle('bg-surface-elevated', on); b.classList.toggle('text-white', on); b.classList.toggle('shadow-md', on);
      b.classList.toggle('text-silver', !on);
    });
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.tab); if (!window.MA_PREVIEW) history.replaceState(null, '', '#' + b.dataset.tab); }); });
  var h = window.MA_PREVIEW ? '' : location.hash.replace('#', '');
  show(['160', '110', 'ind'].indexOf(h) >= 0 ? h : '160');
})();
