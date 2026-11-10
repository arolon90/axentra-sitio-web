/* Contacto y pie de página */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var c = d.contacto || {}, motivos = c.motivos || [], selMotivo = document.getElementById('cf-motivo');
  var pedido = (new URLSearchParams(location.search)).get('motivo') || '';
  if (selMotivo) {
    selMotivo.innerHTML = '<option value="">Elegí una opción</option>' + motivos.map(function (m) {
      return '<option value="' + esc(m.clave) + '"' + (m.clave === pedido ? ' selected' : '') + '>' + esc(m.texto) + '</option>'; }).join('');
  }
  document.getElementById('formulario-contacto').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = ev.target, mot = f.motivo && f.motivo.selectedIndex > 0 ? f.motivo.options[f.motivo.selectedIndex].text : '';
    var texto = 'Hola AXENTRA, soy ' + f.nombre.value + (f.empresa.value ? ' de ' + f.empresa.value : '') +
      (f.telefono.value ? ' (tel. ' + f.telefono.value + ')' : '') + '. ' + (mot ? 'Motivo: ' + mot + '. ' : '') + f.mensaje.value;
    window.open('https://wa.me/' + ((d.contacto || {}).whatsapp || '') + '?text=' + encodeURIComponent(texto), '_blank');
  });
  var waUrl = 'https://wa.me/' + (c.whatsapp || '') + '?text=' + encodeURIComponent('Hola AXENTRA, quiero coordinar una reunión.');
  var numLocal = String(c.whatsapp || '').replace(/^595/, '0').replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3');
  document.getElementById('enlace-whatsapp').href = waUrl; document.getElementById('numero-whatsapp').textContent = numLocal;
  document.getElementById('enlace-correo').href = 'mailto:' + (c.correo || ''); document.getElementById('texto-correo').textContent = c.correo || '';
})();
