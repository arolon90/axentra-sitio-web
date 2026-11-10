/* IA y automatizaciones */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  /* IA y automatizaciones: industria → caso → detalle */
  var au = d.automatizacion, cajaAu = document.getElementById('auto-pestanas');
  if (au && cajaAu) {
    document.getElementById('auto-pasos').innerHTML = (au.pasos || []).map(function (x, n) { return '<li><span>' + (n + 1) + '</span>' + esc(x) + '</li>'; }).join('');
    document.getElementById('auto-nota').textContent = au.nota || '';
    var iconoTipo = function (t) { return /whatsapp/i.test(t) ? 'i:mensaje' : (/^IA/.test(t) ? 'i:ia' : 'i:rayo'); };
    var inds = au.industrias || [];
    var detalle = function (c, ind) {
      return '<div class="cs-det" style="--c:' + esc(ind.color) + '">' +
        '<div class="cs-tipos">' + c.tipo.split(' + ').map(function (t) { return '<span>' + icono(iconoTipo(t)) + esc(t) + '</span>'; }).join('') + '</div>' +
        '<h3>' + esc(c.titulo) + '</h3>' +
        '<div class="cs-comp"><div class="cs-hoy"><b>Hoy</b><p>' + esc(c.hoy) + '</p></div><span class="cs-flecha" aria-hidden="true">→</span>' +
        '<div class="cs-ahora"><b>Con AXENTRA</b><p>' + esc(c.ahora) + '</p></div></div>' +
        '<div class="cs-como">Cómo funciona</div><ol class="cs-flujo">' + c.flujo.map(function (f, k) { return '<li style="--k:' + k + '"><span>' + (k + 1) + '</span>' + esc(f) + '</li>'; }).join('') + '</ol></div>';
    };
    cajaAu.innerHTML = '<div class="auto-inds" role="tablist" aria-label="Industrias">' + inds.map(function (x, n) {
        return '<button type="button" role="tab" class="auto-ind" data-ind="' + n + '" style="--c:' + esc(x.color) + '"><span class="auto-ind-ico">' + icono(x.icono) + '</span><b>' + esc(x.nombre) + '</b><small>' + x.casos.length + ' casos</small></button>';
      }).join('') + '</div>' +
      inds.map(function (x, n) {
        return '<div class="auto-ind-panel" role="tabpanel" data-panel="' + n + '" style="--c:' + esc(x.color) + '" hidden><div class="cs-lista" role="tablist" aria-label="Casos de ' + esc(x.nombre) + '">' +
          x.casos.map(function (c, k) { return '<button type="button" role="tab" class="cs-item" data-caso="' + k + '"><span class="cs-num">' + dos(k) + '</span><span><b>' + esc(c.titulo) + '</b><small>' + esc(c.tipo) + '</small></span></button>'; }).join('') +
          '</div><div class="cs-vista">' + x.casos.map(function (c, k) { return '<div class="cs-vista-item" data-vista="' + k + '" hidden>' + detalle(c, x) + '</div>'; }).join('') + '</div></div>';
      }).join('');
    var elegirCaso = function (panel, k) {
      panel.querySelectorAll('.cs-item').forEach(function (b, q) { b.setAttribute('aria-selected', q === k ? 'true' : 'false'); });
      panel.querySelectorAll('.cs-vista-item').forEach(function (v, q) { v.hidden = q !== k; if (q === k) { v.classList.remove('animar'); void v.offsetWidth; v.classList.add('animar'); } });
    };
    var elegirInd = function (n) {
      cajaAu.querySelectorAll('.auto-ind').forEach(function (b, q) { b.setAttribute('aria-selected', q === n ? 'true' : 'false'); });
      cajaAu.querySelectorAll('.auto-ind-panel').forEach(function (pn, q) { pn.hidden = q !== n; if (q === n) { elegirCaso(pn, 0); } });
    };
    cajaAu.querySelectorAll('.auto-ind').forEach(function (b) { b.addEventListener('click', function () { elegirInd(+b.getAttribute('data-ind')); }); });
    cajaAu.querySelectorAll('.auto-ind-panel').forEach(function (pn) {
      pn.querySelectorAll('.cs-item').forEach(function (b) { b.addEventListener('click', function () { elegirCaso(pn, +b.getAttribute('data-caso')); }); });
    });
    elegirInd(0);
  }
})();
