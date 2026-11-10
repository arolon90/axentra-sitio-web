/* Contacto y pie de página */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  document.getElementById('formulario-contacto').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = ev.target, texto = 'Hola AXENTRA, soy ' + f.nombre.value + (f.empresa.value ? ' de ' + f.empresa.value : '') +
      (f.telefono.value ? ' (tel. ' + f.telefono.value + ')' : '') + '. ' + f.mensaje.value;
    window.open('https://wa.me/' + ((d.contacto || {}).whatsapp || '') + '?text=' + encodeURIComponent(texto), '_blank');
  });
  var c = d.contacto || {};
  var waUrl = 'https://wa.me/' + (c.whatsapp || '') + '?text=' + encodeURIComponent('Hola AXENTRA, quiero coordinar una reunión.');
  var numLocal = String(c.whatsapp || '').replace(/^595/, '0').replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3');
  document.getElementById('enlace-whatsapp').href = waUrl; document.getElementById('numero-whatsapp').textContent = numLocal;
  document.getElementById('enlace-correo').href = 'mailto:' + (c.correo || ''); document.getElementById('texto-correo').textContent = c.correo || '';
  document.getElementById('pie-whatsapp').href = waUrl; document.getElementById('pie-whatsapp').textContent = 'WhatsApp ' + numLocal;
  document.getElementById('pie-correo').href = 'mailto:' + (c.correo || ''); document.getElementById('pie-correo').textContent = c.correo || '';
  if (c.ciudad) { document.getElementById('pie-ciudad').textContent = c.ciudad; }
})();
