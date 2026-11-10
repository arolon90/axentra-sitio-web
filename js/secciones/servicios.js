/* Servicios */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var cajaServ = document.getElementById('lista-servicios');
  cajaServ.innerHTML = visibles(d.servicios).map(function (sv, n) {
    var c = sv.tamano === 'grande' ? '#00c4e0' : colorDe(sv, n), visual = '';
    if (sv.visual === 'chips' && sv.chips) { visual = '<div class="sv-chips">' + sv.chips.map(function (x, k) { return '<span style="--i:' + k + '">' + esc(x) + '</span>'; }).join('') + '</div>'; }
    if (sv.visual === 'tablero') {
      visual = '<div class="sv-tablero" aria-hidden="true">' +
        '<div class="tb-kpi"><small>Ventas del mes</small><b>▲ 12 %</b><div class="tb-mini">' + [40, 55, 45, 70, 62, 85].map(function (h, k) { return '<i style="--h:' + h + '%;--i:' + k + '"></i>'; }).join('') + '</div></div>' +
        '<div class="tb-linea"><small>Ingresos vs. gastos</small><svg viewBox="0 0 120 50" preserveAspectRatio="none"><defs><linearGradient id="tbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0891b2" stop-opacity=".35"/><stop offset="1" stop-color="#0891b2" stop-opacity="0"/></linearGradient></defs>' +
        '<path class="tb-area" d="M0 40 L15 34 L30 36 L45 26 L60 29 L75 18 L90 21 L105 10 L120 13 L120 50 L0 50 Z" fill="url(#tbg)"/>' +
        '<path class="tb-l1" pathLength="100" d="M0 40 L15 34 L30 36 L45 26 L60 29 L75 18 L90 21 L105 10 L120 13"/>' +
        '<path class="tb-l2" pathLength="100" d="M0 44 L15 42 L30 40 L45 41 L60 37 L75 36 L90 33 L105 32 L120 30"/></svg></div>' +
        '<div class="tb-dona"><small>Ventas por rubro</small><svg viewBox="0 0 42 42"><circle class="tb-base" cx="21" cy="21" r="15.9"/>' +
        '<circle class="tb-s1" cx="21" cy="21" r="15.9" pathLength="100"/><circle class="tb-s2" cx="21" cy="21" r="15.9" pathLength="100"/><circle class="tb-s3" cx="21" cy="21" r="15.9" pathLength="100"/></svg><span class="tb-centro">3</span></div>' +
        '<span class="tb-ejemplo">Ejemplo</span></div>';
    }
    if (sv.visual === 'barras') { visual = '<div class="sv-barras" aria-hidden="true">' + [38, 62, 48, 80, 66, 92, 74, 98].map(function (h, k) { return '<i style="--h:' + h + '%;--i:' + k + '"></i>'; }).join('') + '</div>'; }
    if (sv.visual === 'rubros' && sv.chips) { var r = sv.chips.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join(''); visual = '<div class="sv-rubros" aria-hidden="true"><div>' + r + r + '</div></div>'; }
    /* tarjeta informativa; solo si tiene "enlace" en datos/servicios.js lleva a otra página con "Ver detalle →" */
    var etiqueta = sv.enlace ? 'a' : 'div';
    return '<' + etiqueta + ' class="tarjeta servicio-tarjeta' + (sv.tamano ? ' ' + sv.tamano : '') + '"' + (sv.enlace ? ' href="' + esc(sv.enlace) + '"' : '') + ' style="--c:' + esc(c) + '">' +
      '<span class="acento"></span><span class="icono-fondo">' + icono(sv.icono) + '</span><div class="icono">' + icono(sv.icono) + '</div><h3>' + esc(sv.titulo) + '</h3><p>' + esc(sv.texto) + '</p>' +
      visual + (sv.enlace ? '<span class="ver-mas">Ver detalle →</span>' : '') + '</' + etiqueta + '>';
  }).join('') + (d.serviciosCierre ? '<a class="tarjeta servicio-cierre" href="contacto.html?motivo=otro"><h3>' + esc(d.serviciosCierre.titulo) + '</h3><p>' + esc(d.serviciosCierre.texto) + '</p><span class="boton blanco">' + esc(d.serviciosCierre.boton) + ' →</span></a>' : '');
  var barras = cajaServ.querySelectorAll('.sv-barras, .sv-tablero');
  if ('IntersectionObserver' in window) {
    var obsB = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('en-vista'); obsB.unobserve(e.target); } }); }, { threshold: 0.2 });
    barras.forEach(function (b) { obsB.observe(b); });
  } else { barras.forEach(function (b) { b.classList.add('en-vista'); }); }
})();
