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
  /* Textos de las secciones, desde la configuración ("*palabra*" va resaltada) */
  var conResaltado = function (t) { return esc(t).replace(/\*([^*]+)\*/g, '<em>$1</em>'); };
  var ponerTexto = function (id, t, html) { var el = document.getElementById(id); if (el && t) { if (html) { el.innerHTML = conResaltado(t); } else { el.textContent = t; } } };
  var ct = d.clientesTexto || {};
  ponerTexto('clientes-etiqueta', ct.etiqueta); ponerTexto('clientes-titulo', ct.titulo, true); ponerTexto('clientes-subtitulo', ct.subtitulo);
  /* Partners (tarjeta de abajo de la portada): título, subtítulo y carrusel que corre solo */
  var cajaSocios = document.getElementById('lista-socios'), socios = visibles(d.partners);
  if (cajaSocios) {
    var pt = d.partnersTexto || {};
    var nombres = socios.map(function (p) { return '<b>' + esc(p.nombre) + '</b>'; });
    var unidos = nombres.length > 1 ? nombres.slice(0, -1).join(', ') + ' y ' + nombres[nombres.length - 1] : nombres.join('');
    ponerTexto('socios-titulo', pt.titulo, true);
    var sub = pt.subtitulo || (pt.final ? 'Trabajamos de la mano de {partners} ' + pt.final : '');
    document.getElementById('socios-texto').innerHTML = conResaltado(sub).replace('{partners}', unidos);
    var htmlSocios = socios.map(function (p) {
      var abre = p.enlace ? '<a class="socio" href="' + esc(p.enlace) + '" target="_blank" rel="noopener"' : '<div class="socio"';
      var logo = p.logo ? '<img src="' + esc(p.logo) + '" alt="' + esc(p.nombre) + '">' : '<span class="socio-ini">' + esc(p.iniciales || String(p.nombre || '').charAt(0)) + '</span>';
      var etiqueta = p.etiqueta || p.distintivo;
      return abre + ' style="--sc:' + esc(p.color || '#0056ff') + '"><span class="socio-logo">' + logo + '</span>' +
        '<span class="socio-info">' + (etiqueta ? '<em>' + esc(etiqueta) + '</em>' : '') + '<b>' + esc(p.nombre) + '</b><small>' + esc(p.descripcion) + '</small></span>' +
        (p.enlace ? '<span class="socio-ir" aria-hidden="true">↗</span></a>' : '</div>');
    }).join('');
    var confSo = (d.carrusel || {}).partners || {};
    if (socios.length > (confSo.mostrarFijosHasta || 1)) {
      cajaSocios.classList.add('en-carrusel');
      cajaSocios.innerHTML = '<div class="carrusel" aria-label="Partners"><div class="pista" id="pista-socios"></div></div>';
      armarCarrusel('pista-socios', htmlSocios, socios.length, confSo);
    } else { cajaSocios.innerHTML = htmlSocios; }
  }
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
