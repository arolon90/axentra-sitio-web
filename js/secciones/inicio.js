/* Inicio: tarjetas "¿Qué hacemos?" que llevan a cada página */
(function () {
  var AX = window.AX, d = AX.d, esc = AX.esc, icono = AX.icono;
  var qh = d.queHacemos, caja = document.getElementById('que-hacemos');
  if (!qh || !caja) { return; }
  var url = function (id) { var p = (d.paginas || []).filter(function (x) { return x.id === id; })[0]; return p ? p.url : '#'; };
  document.getElementById('qh-titulo').innerHTML = qh.titulo;   /* admite <em> para la palabra destacada */
  document.getElementById('qh-texto').textContent = qh.texto || '';
  caja.innerHTML = (qh.tarjetas || []).filter(function (t) { return t.visible !== false; }).map(function (t) {
    return '<a class="qh-tarjeta" href="' + esc(t.url || url(t.pagina)) + '" style="--c:' + esc(t.color || '#0056ff') + '">' +
      '<span class="qh-icono">' + icono(t.icono) + '</span><h3>' + esc(t.titulo) + '</h3><p>' + esc(t.texto) + '</p><span class="ver-mas">Ver más →</span></a>';
  }).join('');
})();
