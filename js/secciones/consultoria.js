/* Consultoría: antes y después, método, entregables y ejemplos */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var metodo = d.metodo || {};
  var ad = document.getElementById('antes-despues');
  if (ad && metodo.antes && metodo.despues) {
    var bloque = function (b, clase) { return '<div class="ad-caja ' + clase + '"><h3>' + esc(b.titulo) + '</h3><ul>' + b.puntos.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>'; };
    ad.innerHTML = bloque(metodo.antes, 'ad-antes') + '<div class="ad-flecha" aria-hidden="true">→</div>' + bloque(metodo.despues, 'ad-despues');
  }
  var listaPasos = document.getElementById('lista-pasos');
  if (listaPasos) { listaPasos.innerHTML = (metodo.pasos || []).map(function (x, n) { return '<div class="paso"><span class="paso-num">' + dos(n) + '</span><h3>' + esc(x.titulo) + '</h3><p>' + esc(x.texto) + '</p></div>'; }).join(''); }
  var listaEnt = document.getElementById('lista-entregables');
  if (listaEnt) { listaEnt.innerHTML = visibles(metodo.entregables).map(function (x, n) {
    return '<div class="entregable" style="--c:' + colorDe(x, n) + '"><span class="ent-num">' + dos(n) + '</span><span class="ent-icono">' + icono(x.icono) + '</span><div><strong>' + esc(x.titulo) + '</strong><span>' + esc(x.texto) + '</span></div></div>'; }).join(''); }
  /* carrusel de ejemplos de entregables */
  var pistaEj = document.getElementById('ej-pista'), ejemplos = visibles(metodo.ejemplos);
  if (pistaEj && ejemplos.length) {
    var cab = function (e) { return '<div class="fd-cabeza"><span class="fd-codigo">' + esc(e.codigo) + '</span><div><strong>' + esc(e.titulo) + '</strong><small>' + esc(e.subtitulo || e.area || '') + '</small></div></div>'; };
    var chipsEstado = { 'Admin': 'c-admin', 'Edita': 'c-edita', 'Lee': 'c-lee', '—': 'c-no', 'Vigente': 'c-ok', 'Presentado': 'c-ok', 'Reemplazado': 'c-gris', 'Pendiente': 'c-pend', 'Próximo': 'c-prox' };
    var celda = function (x) { return chipsEstado[x] ? '<span class="chip ' + chipsEstado[x] + '">' + esc(x) + '</span>' : esc(x); };
    var datosDoc = function (lista) { return lista ? '<div class="fd-datos">' + lista.map(function (x) { return '<span><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</span>'; }).join('') + '</div>' : ''; };
    var firmas = function (lista) { return lista ? '<div class="fd-firmas">' + lista.map(function (x) { return '<div><span class="fd-linea"></span><small>' + esc(x) + '</small></div>'; }).join('') + '</div>' : ''; };
    var armarDoc = function (e) {
      if (e.tipo === 'ficha') {
        var fe = metodo.fichaEjemplo || {};
        return cab(fe) + datosDoc([['Dueño del proceso', fe.dueno], ['Aprueba', fe.aprueba], ['Versión', fe.version]]) +
          '<div class="fd-titulo">Flujo</div><div class="fd-flujo">' + (fe.flujo || []).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('<i>→</i>') + '</div>' +
          '<div class="fd-titulo">Etapas, responsables y controles</div><table class="fd-tabla"><tr><th>Etapa</th><th>Responsable</th><th>Control</th></tr>' +
          (fe.filas || []).map(function (f) { return '<tr><td>' + esc(f[0]) + '</td><td>' + esc(f[1]) + '</td><td>' + esc(f[2]) + '</td></tr>'; }).join('') + '</table>' +
          '<div class="fd-odoo"><b>En Odoo:</b> ' + esc(fe.enOdoo) + '</div>' + firmas(['Validación de la gerencia']);
      }
      if (e.tipo === 'indice') {
        return cab(e) + datosDoc(e.datos) + '<div class="fd-titulo">Índice</div><ol class="fd-indice">' + e.items.map(function (x) {
          return '<li><span>' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b><i></i><em>' + esc(x[2]) + '</em></li>'; }).join('') + '</ol>' + firmas(e.firmas);
      }
      if (e.tipo === 'tabla') {
        return cab(e) + '<div class="fd-titulo">' + esc(e.seccion) + '</div><table class="fd-tabla"><tr>' + e.columnas.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' +
          e.filas.map(function (f) { return '<tr>' + f.map(function (c) { return '<td>' + celda(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>' +
          (e.nota ? '<div class="fd-odoo">' + esc(e.nota) + '</div>' : '');
      }
      if (e.tipo === 'organigrama') {
        return cab(e) + '<div class="fd-organi"><div class="org-raiz">' + esc(e.raiz) + '</div><div class="org-ramas">' + e.ramas.map(function (r) {
          return '<div class="org-rama"><div class="org-caja">' + esc(r[0]) + '</div><div class="org-hojas">' + r[1].map(function (h) { return '<span>' + esc(h) + '</span>'; }).join('') + '</div></div>'; }).join('') + '</div></div>';
      }
      if (e.tipo === 'acta') {
        return cab(e) + '<p class="fd-texto">' + esc(e.texto) + '</p><ul class="fd-check">' + e.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' + firmas(e.firmas);
      }
      return '';
    };
    pistaEj.innerHTML = ejemplos.map(function (e, n) {
      return '<div class="ej-slide" role="group" aria-roledescription="diapositiva" aria-label="' + (n + 1) + ' de ' + ejemplos.length + ': ' + esc(e.nombre) + '"><div class="marca-agua-cont ficha-demo doc-demo">' +
        armarDoc(e) + '<span class="marca-agua">DATOS DEMOSTRATIVOS</span></div></div>';
    }).join('');
    var cajaEj = document.getElementById('ejemplos'), puntosEj = document.getElementById('ej-puntos'), actual = 0, reloj = null;
    puntosEj.innerHTML = ejemplos.map(function (e, n) { return '<button type="button" aria-label="Ver ' + esc(e.nombre) + '"></button>'; }).join('');
    var botonesEj = puntosEj.querySelectorAll('button'), slides = pistaEj.children;
    var irA = function (n) {
      actual = (n + ejemplos.length) % ejemplos.length;
      pistaEj.style.transform = 'translateX(' + (-100 * actual) + '%)';
      for (var k = 0; k < slides.length; k++) { slides[k].setAttribute('aria-hidden', k === actual ? 'false' : 'true'); }
      botonesEj.forEach(function (b, k) { b.removeAttribute('aria-current'); if (k === actual) { void b.offsetWidth; b.setAttribute('aria-current', 'true'); } });
      document.getElementById('ej-nombre').textContent = (actual + 1) + ' / ' + ejemplos.length + ' · ' + ejemplos[actual].nombre;
      document.getElementById('ej-desc').textContent = ejemplos[actual].descripcion || '';
    };
    var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var arrancar = function () { if (quieto) { return; } clearInterval(reloj); reloj = setInterval(function () { irA(actual + 1); }, 6000); };
    var frenar = function () { clearInterval(reloj); };
    document.getElementById('ej-ant').addEventListener('click', function () { irA(actual - 1); arrancar(); });
    document.getElementById('ej-sig').addEventListener('click', function () { irA(actual + 1); arrancar(); });
    botonesEj.forEach(function (b, k) { b.addEventListener('click', function () { irA(k); arrancar(); }); });
    cajaEj.addEventListener('mouseenter', function () { frenar(); cajaEj.classList.add('pausado'); });
    cajaEj.addEventListener('mouseleave', function () { arrancar(); cajaEj.classList.remove('pausado'); });
    cajaEj.addEventListener('focusin', function () { frenar(); cajaEj.classList.add('pausado'); });
    cajaEj.addEventListener('focusout', function () { arrancar(); cajaEj.classList.remove('pausado'); });
    var x0 = null;
    pistaEj.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    pistaEj.addEventListener('pointerup', function (e) { if (x0 !== null && Math.abs(e.clientX - x0) > 40) { irA(actual + (e.clientX < x0 ? 1 : -1)); arrancar(); } x0 = null; });
    if (quieto) { cajaEj.classList.add('pausado'); }
    irA(0); arrancar();
  }
})();
