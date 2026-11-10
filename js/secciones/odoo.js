/* ¿Qué es Odoo?: áreas, pantallas y recorrido de una venta */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var cajaAreas = document.getElementById('lista-areas');
  cajaAreas.className = 'pestanas areas-pestanas';
  cajaAreas.innerHTML = pestanasDe(visibles(d.areas), 'area', 'Áreas de Odoo',
    function (a) { return (a.icono ? '<img src="' + esc(a.icono) + '" alt="">' : '') + '<span>' + esc(a.nombre) + '</span>'; },
    function (a) {
      return '<div class="area-panel" style="--color:' + esc(a.color) + '"><h3>' + (a.icono ? '<i class="icono-area"><img src="' + esc(a.icono) + '" alt=""></i>' : '') + esc(a.nombre) + '</h3><div class="apps-area">' +
        (a.apps || []).map(function (x) { return '<div class="app-area"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join('') + '</div></div>';
    });
  var cajaPantallas = document.getElementById('lista-pantallas');
  cajaPantallas.className = 'pestanas';
  cajaPantallas.innerHTML = pestanasDe(visibles(d.pantallas), 'pant', 'Pantallas de Odoo',
    function (p) { return esc(p.etiqueta); },
    function (p) {
      return '<div class="pantalla"><div class="marco"><div class="barra"><i style="background:#ff6058"></i><i style="background:#ffbd2e"></i><i style="background:#28c840"></i></div>' +
        '<div class="marca-agua-cont">' + ((p.tipo && window.PANTALLAS_ODOO && PANTALLAS_ODOO[p.tipo]) ? '<div class="odoo-ui">' + PANTALLAS_ODOO[p.tipo]() + '</div>'
          : '<img src="' + esc(p.imagen) + '" alt="' + esc(p.titulo) + '" loading="lazy">') + '<span class="marca-agua">DATOS DEMOSTRATIVOS</span></div></div><div><h3 style="font-size:1.5rem">' + esc(p.titulo) + '</h3><p>' + esc(p.texto) + '</p><ul class="lista">' +
        (p.puntos || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div></div>';
    });
  /* "¿Qué es Odoo?": recorrido animado de una venta */
  var fo = d.odooFlujo, cajaFo = document.getElementById('flujo-odoo');
  if (fo && cajaFo) {
    cajaFo.innerHTML = '<div class="fo-cabeza"><b>' + esc(fo.titulo) + '</b><span class="fo-vivo">Ejemplo</span></div><div class="fo-nodos">' + fo.pasos.map(function (x, n) {
        return (n ? '<span class="fo-linea"><i></i></span>' : '') + '<button type="button" class="fo-nodo" style="--c:' + colorDe(x, n) + '" aria-label="' + esc(x.app) + '"><span class="fo-ico">' + icono(x.icono) + '</span><small>' + esc(x.app) + '</small></button>';
      }).join('') + '</div><div class="fo-texto"><span class="fo-num" id="fo-num"></span><p id="fo-desc" aria-live="polite"></p></div><div class="fo-barra"><i id="fo-prog"></i></div>';
    var nodos = cajaFo.querySelectorAll('.fo-nodo'), lineas = cajaFo.querySelectorAll('.fo-linea'), paso = 0, relojFo = null, sobreFo = false;
    var mostrar = function (k) {
      paso = k;
      nodos.forEach(function (nd, i) { nd.classList.toggle('activo', i === k); nd.classList.toggle('hecho', i < k); });
      lineas.forEach(function (l, i) { l.classList.toggle('hecho', i < k); });
      document.getElementById('fo-num').textContent = dos(k) + ' / ' + dos(fo.pasos.length - 1);
      document.getElementById('fo-desc').textContent = fo.pasos[k].texto;
      document.getElementById('fo-prog').style.width = ((k + 1) / fo.pasos.length * 100) + '%';
    };
    nodos.forEach(function (nd, i) { nd.addEventListener('click', function () { mostrar(i); }); });
    cajaFo.addEventListener('mouseenter', function () { sobreFo = true; });
    cajaFo.addEventListener('mouseleave', function () { sobreFo = false; });
    mostrar(0);
    if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      relojFo = setInterval(function () { if (!sobreFo) { mostrar((paso + 1) % fo.pasos.length); } }, 2600);
    }
  }
})();
