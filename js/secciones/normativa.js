/* Normativa DNIT y SIFEN */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  /* "Odoo no trae Paraguay": los cuatro frentes y la factura electrónica de ejemplo */
  var nv = d.normativa, listaDnit = document.getElementById('dnit-pasos');
  if (nv && listaDnit) {
    listaDnit.innerHTML = nv.pasos.map(function (x, n) {
      return '<li class="dnit-paso"><span class="dnit-num">' + dos(n) + '</span><div class="dnit-ico">' + icono(x.icono) + '</div><div><h3>' + esc(x.titulo) + '</h3><p>' + esc(x.texto) + '</p><ul class="dnit-lista">' +
        x.chips.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' + (x.enlace ? '<a class="dnit-enlace" href="' + esc(x.enlace.url) + '" target="_blank" rel="noopener">' + esc(x.enlace.texto) + '</a>' : '') + '</div></li>';
    }).join('');
    var f = nv.factura, qr = '', semilla = 7;
    var azar = function () { semilla = (semilla * 9301 + 49297) % 233280; return semilla / 233280; };
    var esOjo = function (x, y) { var en = function (a, b) { return x >= a && x < a + 7 && y >= b && y < b + 7; }; return en(0, 0) || en(14, 0) || en(0, 14); };
    for (var qy = 0; qy < 21; qy++) { for (var qx = 0; qx < 21; qx++) {
      var lleno;
      if (esOjo(qx, qy)) { var ox = qx % 14 > 6 ? qx - 14 : qx, oy = qy % 14 > 6 ? qy - 14 : qy; ox = qx >= 14 ? qx - 14 : qx; oy = qy >= 14 ? qy - 14 : qy;
        lleno = ox === 0 || ox === 6 || oy === 0 || oy === 6 || (ox > 1 && ox < 5 && oy > 1 && oy < 5); }
      else { lleno = (qx < 8 && qy < 8) || (qx > 12 && qy < 8) || (qx < 8 && qy > 12) ? false : azar() > 0.52; }
      if (lleno) { qr += '<rect x="' + qx + '" y="' + qy + '" width="1" height="1"/>'; }
    } }
    document.getElementById('dnit-factura').innerHTML =
      '<div class="kude-cab"><div><b>' + esc(f.emisor) + '</b><small>RUC ' + esc(f.ruc) + ' · Timbrado ' + esc(f.timbrado) + '</small></div><div class="kude-tipo">Factura electrónica<b>' + esc(f.numero) + '</b></div></div>' +
      '<div class="kude-cliente"><span><b>Cliente</b>' + esc(f.cliente) + '</span><span><b>Fecha</b>' + esc(f.fecha) + '</span><span><b>Condición</b>' + esc(f.condicion) + '</span></div>' +
      '<table class="kude-items"><tr><th>Descripción</th><th>Cant.</th><th>Total</th></tr>' + f.items.map(function (x) { return '<tr><td>' + esc(x[0]) + '</td><td>' + esc(x[1]) + '</td><td>' + esc(x[2]) + ' ₲</td></tr>'; }).join('') + '</table>' +
      '<div class="kude-totales"><span>Liquidación IVA 10 %</span><b>' + esc(f.iva) + ' ₲</b><span>Total</span><b class="kude-total">' + esc(f.total) + ' ₲</b></div>' +
      '<div class="kude-pie"><svg class="kude-qr" viewBox="-1 -1 23 23" aria-hidden="true"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/>' + qr + '</svg><div><small>CDC</small><code>' + esc(f.cdc) + '</code>' +
      '<div class="kude-estados"><span class="e1">Firmada</span><span class="e2">Enviada a SIFEN</span><span class="e3">Aprobada</span></div></div></div>' +
      '<div class="kude-sello">APROBADO<small>SIFEN · DNIT</small></div><span class="marca-agua">DATOS DEMOSTRATIVOS</span>';
    var kude = document.getElementById('dnit-factura'), pasosDnit = listaDnit.children, activo = 0, relojDnit = null, sobreDnit = false;
    var marcar = function () { for (var k = 0; k < pasosDnit.length; k++) { pasosDnit[k].classList.toggle('activo', k === activo); } };
    listaDnit.addEventListener('mouseenter', function () { sobreDnit = true; for (var k = 0; k < pasosDnit.length; k++) { pasosDnit[k].classList.remove('activo'); } });
    listaDnit.addEventListener('mouseleave', function () { sobreDnit = false; marcar(); });
    var quietoDnit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    marcar();
    if ('IntersectionObserver' in window) {
      var obsK = new IntersectionObserver(function (es) { es.forEach(function (e) {
        if (e.isIntersecting) { kude.classList.add('animar');
          if (!quietoDnit && !relojDnit) { relojDnit = setInterval(function () { if (!sobreDnit) { activo = (activo + 1) % pasosDnit.length; marcar(); } }, 3000); } }
      }); }, { threshold: 0.35 });
      obsK.observe(kude);
    } else { kude.classList.add('animar'); }
  }
})();
