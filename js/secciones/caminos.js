/* Identificá tu camino */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  document.getElementById('lista-caminos').innerHTML = (d.caminos || []).map(function (c) {
    return '<div class="tarjeta camino' + (c.destacado ? ' destacado' : '') + '" style="--c:' + esc(c.color || '#0056ff') + '">' + (c.cinta ? '<span class="cinta">' + esc(c.cinta) + '</span>' : '') +
      '<div class="icono">' + icono(c.icono) + '</div><h3>' + esc(c.titulo) + '</h3><p>' + esc(c.texto) + '</p>' +
      (c.puntos ? '<ul class="lista chica">' + c.puntos.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
      (c.enlace ? '<a class="ver-mas" href="' + esc(c.enlace.destino) + '">' + esc(c.enlace.texto) + '</a>' : '') +
      '<a class="boton ' + (c.destacado ? 'primario' : 'contorno') + '" href="#contacto">' + esc(c.boton) + '</a></div>';
  }).join('');
})();
