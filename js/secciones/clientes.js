/* Clientes, partners y testimonios */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var clientes = visibles(d.clientes).map(function (c) {
    var logo = c.logo ? '<div class="logo-cliente"><img src="' + esc(c.logo) + '" alt="' + esc(c.nombre) + '"></div>'
      : '<div class="logo-cliente">' + marca(c) + '</div>';
    var tercera = c.detalle || (c.grupo ? 'Parte de ' + c.grupo : '');
    var grupo = tercera ? '<span class="grupo">' + esc(tercera) + '</span>' : '';
    return '<div class="cliente">' + logo + '<h3>' + esc(c.nombre) + '</h3><span class="rubro">' + esc(c.rubro) + '</span>' + grupo + '</div>';
  }).join('');
  armarCarrusel('pista-clientes', clientes, visibles(d.clientes).length, (d.carrusel || {}).clientes);
  (document.getElementById('lista-partners') || {}).innerHTML = visibles(d.partners).map(function (p) {
    var abre = p.enlace ? '<a class="partner" href="' + esc(p.enlace) + '" target="_blank" rel="noopener">' : '<div class="partner">';
    var cierra = p.enlace ? '</a>' : '</div>';
    var cabeza = p.logo
      ? '<div class="logo-partner"><img src="' + esc(p.logo) + '" alt="' + esc(p.nombre) + '"></div>'
      : marca(p) + '<h3>' + esc(p.nombre) + '</h3>';
    var sello = p.distintivo ? '<span class="distintivo">' + esc(p.distintivo) + '</span>' : '';
    return abre + cabeza + sello + '<p>' + esc(p.descripcion) + '</p>' + cierra;
  }).join('');
  var testimonios = visibles(d.testimonios).map(function (t) {
    return '<div class="testimonio"><p>' + esc(t.texto) + '</p><strong>' + esc(t.nombre) + '</strong><span>' + esc(t.cargo) + '</span></div>';
  }).join('');
  if (visibles(d.testimonios).length) {
    armarCarrusel('pista-testimonios', testimonios, visibles(d.testimonios).length, (d.carrusel || {}).testimonios);
  } else {
    var listaCli = document.querySelector('#clientes .pestanas-lista'), panelTes = document.getElementById('testimonios');
    if (listaCli) { listaCli.parentNode.removeChild(listaCli); }
    if (panelTes) { panelTes.parentNode.removeChild(panelTes); }
    document.getElementById('clientes').classList.add('sin-pestanas');
  }
})();
