/* Pestañas: una sola parte visible por vez, con teclado y enlaces que abren la pestaña correcta */
(function () {
  var elegir = function (tab, foco) {
    var lista = tab.parentNode;
    lista.querySelectorAll('.pestana').forEach(function (t) {
      var si = t === tab, panel = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', si ? 'true' : 'false'); t.tabIndex = si ? 0 : -1;
      if (panel) { panel.hidden = !si; }
    });
    if (foco) { tab.focus(); }
    if (lista.scrollWidth > lista.clientWidth) { lista.scrollTo({ left: tab.offsetLeft - 24, behavior: 'smooth' }); }
  };
  document.querySelectorAll('.pestanas-lista').forEach(function (lista) {
    var tabs = Array.prototype.slice.call(lista.querySelectorAll('.pestana'));
    if (!tabs.length) { return; }
    elegir(tabs[0]);
    tabs.forEach(function (t, n) {
      t.addEventListener('click', function () { elegir(t); });
      t.addEventListener('keydown', function (e) {
        var k = { ArrowRight: n + 1, ArrowDown: n + 1, ArrowLeft: n - 1, ArrowUp: n - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) { return; }
        e.preventDefault(); elegir(tabs[(k + tabs.length) % tabs.length], true);
      });
    });
  });
  var abrirDestino = function (id) {
    var el = id && document.getElementById(id);
    var panel = el && (el.classList.contains('pestana-panel') ? el : el.closest('.pestana-panel'));
    if (panel && panel.hidden) { var t = document.querySelector('[aria-controls="' + panel.id + '"]'); if (t) { elegir(t); } }
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) { abrirDestino(a.getAttribute('href').slice(1)); }
  }, true);
  if (location.hash) { abrirDestino(location.hash.slice(1)); }
})();
