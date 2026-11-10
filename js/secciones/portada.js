/* Portada: módulos y aplicaciones de la notebook */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  document.getElementById('lista-modulos').innerHTML = (d.modulos || []).map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('');
  document.getElementById('apps-portada').innerHTML = (d.appsPortada || []).map(function (a) {
    return '<div class="home-app' + (a.propia ? ' propia' : '') + '"><i><img src="' + esc(a.icono) + '" alt=""></i><span>' + esc(a.nombre) + '</span></div>';
  }).join('');
  (document.getElementById('lista-pilares') || {}).innerHTML = (d.pilares || []).map(function (p) {
    return '<div class="pilar"><div class="icono">' + icono(p.icono) + '</div><div><strong>' + esc(p.titulo) + '</strong><span>' + esc(p.texto) + '</span></div></div>';
  }).join('');
})();
