/* Marco común de todas las páginas: encabezado con menú, banda final con "Siguiente", pie y WhatsApp flotante.
   Se arma con datos/menu.js y datos/general.js. Cada página indica cuál es con <body data-pagina="…">. */
(function () {
  var AX = window.AX, d = AX.d, esc = AX.esc;
  var paginas = d.paginas || [], actual = document.body.getAttribute('data-pagina') || 'inicio';
  var pag = function (id) { for (var i = 0; i < paginas.length; i++) { if (paginas[i].id === id) { return paginas[i]; } } return null; };
  var enlace = function (x, clase) {
    var p = x.pagina ? pag(x.pagina) : null, url = x.url || (p ? p.url : '#'), texto = x.texto || (p ? p.nombre : '');
    var esActual = p && p.id === actual;
    return '<a href="' + esc(url) + '"' + (clase || esActual ? ' class="' + (clase || '') + (esActual ? ' activo' : '') + '"' : '') + (esActual ? ' aria-current="page"' : '') + '>' + esc(texto) + '</a>';
  };
  var flecha = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- encabezado ---------- */
  var m = d.menu || { opciones: [] };
  var opciones = m.opciones.map(function (o, n) {
    if (!o.sub) { return enlace(o); }
    var dentro = o.sub.indexOf(actual) >= 0;
    return '<div class="desplegable' + (dentro ? ' activo' : '') + '">' +
      '<button type="button" class="desp-boton" aria-expanded="false" aria-controls="desp-' + n + '">' + esc(o.texto) + flecha + '</button>' +
      '<div class="desp-lista" id="desp-' + n + '">' + o.sub.map(function (id) { return enlace({ pagina: id }); }).join('') + '</div></div>';
  }).join('');
  var boton = m.boton ? enlace(m.boton, 'boton primario') : '';
  document.body.insertAdjacentHTML('afterbegin',
    '<a class="saltar" href="#contenido">Saltar al contenido</a>' +
    '<header class="encabezado"><div class="contenedor">' +
      '<a class="logo" href="index.html" aria-label="AXENTRA AI, ir al inicio"><img src="assets/axentra-logo.png" alt="AXENTRA AI"></a>' +
      '<button type="button" class="menu-boton" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir el menú"><span></span><span></span><span></span></button>' +
      '<nav class="menu" id="menu-principal" aria-label="Menú principal">' + opciones + boton + '</nav>' +
    '</div></header>');

  var cab = document.querySelector('header.encabezado'), menuBoton = cab.querySelector('.menu-boton');
  var cerrarDesplegables = function (salvo) {
    cab.querySelectorAll('.desplegable').forEach(function (dp) {
      if (dp !== salvo) { dp.classList.remove('abierto'); dp.querySelector('.desp-boton').setAttribute('aria-expanded', 'false'); }
    });
  };
  cab.querySelectorAll('.desplegable').forEach(function (dp) {
    var b = dp.querySelector('.desp-boton');
    b.addEventListener('click', function () {
      var abrir = !dp.classList.contains('abierto');
      cerrarDesplegables(dp); dp.classList.toggle('abierto', abrir); b.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    });
  });
  menuBoton.addEventListener('click', function () {
    var abrir = !cab.classList.contains('menu-abierto');
    cab.classList.toggle('menu-abierto', abrir);
    menuBoton.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    menuBoton.setAttribute('aria-label', abrir ? 'Cerrar el menú' : 'Abrir el menú');
    document.documentElement.classList.toggle('sin-scroll', abrir);
    if (abrir) {   /* en celular, el desplegable de la página actual ya aparece abierto */
      var dentro = cab.querySelector('.desplegable.activo');
      if (dentro) { dentro.classList.add('abierto'); dentro.querySelector('.desp-boton').setAttribute('aria-expanded', 'true'); }
    }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.desplegable, .menu-boton')) { cerrarDesplegables(); } });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    cerrarDesplegables();
    if (cab.classList.contains('menu-abierto')) { menuBoton.click(); menuBoton.focus(); }
  });

  /* ---------- "Siguiente": la página que sigue en el orden de datos/menu.js (la invitación a contactar está en el pie) ---------- */
  var main = document.getElementById('contenido') || document.querySelector('main');
  var idx = -1; paginas.forEach(function (p, i) { if (p.id === actual) { idx = i; } });
  var sig = idx >= 0 && idx < paginas.length - 1 ? paginas[idx + 1] : null, contacto = pag('contacto');
  var banda = sig && sig.id !== 'contacto'
    ? '<nav class="siguiente-barra" aria-label="Página siguiente"><div class="contenedor"><a class="siguiente" href="' + esc(sig.url) + '"><small>Siguiente</small><b>' + esc(sig.nombre) + '</b><i aria-hidden="true">→</i></a></div></nav>'
    : '';

  /* ---------- pie ---------- */
  var c = d.contacto || {}, pie = d.pie || { columnas: [] };
  var numLocal = String(c.whatsapp || '').replace(/^595/, '0').replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3');
  var waUrl = 'https://wa.me/' + (c.whatsapp || '') + '?text=' + encodeURIComponent('Hola AXENTRA, quiero coordinar una reunión.');
  var columnas = pie.columnas.map(function (col) {
    return '<nav class="pie-col" aria-label="' + esc(col.titulo) + '"><b>' + esc(col.titulo) + '</b>' + col.enlaces.map(function (e) { return enlace(e); }).join('') + '</nav>';
  }).join('');
  var htmlPie = banda + '<footer class="pie"><div class="contenedor pie-grilla">' +
    '<div class="pie-marca"><img src="assets/axentra-logo-blanco.png" alt="AXENTRA AI"><p>' + esc(pie.texto || '') + '</p><span class="pie-partner">Odoo Official Partner</span></div>' +
    columnas +
    '<div class="pie-col"><b>Contacto</b>' +
      '<a href="' + esc(waUrl) + '" target="_blank" rel="noopener">WhatsApp ' + esc(numLocal) + '</a>' +
      (c.correo ? '<a href="mailto:' + esc(c.correo) + '">' + esc(c.correo) + '</a>' : '') +
      (c.ciudad ? '<span>' + esc(c.ciudad) + '</span>' : '') +
      (contacto ? '<a href="' + esc(contacto.url) + '" class="boton primario pie-boton">Contactanos</a>' : '') +
    '</div></div>' +
    '<div class="contenedor pie-base"><span>© ' + new Date().getFullYear() + ' AXENTRA AI Paraguay</span><span>Odoo es una marca registrada de Odoo S.A. · <a class="pie-ingresar" href="admin/">Ingresar</a></span></div></footer>';
  if (main) { main.insertAdjacentHTML('afterend', htmlPie); } else { document.body.insertAdjacentHTML('beforeend', htmlPie); }

  /* ---------- WhatsApp flotante (lo maneja js/whatsapp-flotante.js) ---------- */
  document.body.insertAdjacentHTML('beforeend',
    '<a class="wa-flotante" id="wa-flotante" href="#" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">' +
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.5 6.5 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 4.9c2.1.9 2.9 1 4 .8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4z"/></svg>' +
    '<span>¿Hablamos?</span></a>');
})();
