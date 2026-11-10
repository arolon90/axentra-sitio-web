/* Botón flotante de WhatsApp: se muestra al pasar la portada y se oculta en la sección de contacto */
(function () {
  var b = document.getElementById('wa-flotante'), c = (window.SITIO || {}).contacto || {};
  if (!b) { return; }
  b.href = 'https://wa.me/' + (c.whatsapp || '') + '?text=' + encodeURIComponent('Hola, quiero consultar por Odoo para mi empresa.');
  var portada = document.querySelector('.portada'), contacto = document.getElementById('contacto');
  var revisar = function () {
    var pasada = portada ? portada.getBoundingClientRect().bottom < 0 : true;
    var enContacto = contacto ? contacto.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
    b.classList.toggle('visible', pasada && !enContacto);
  };
  window.addEventListener('scroll', revisar, { passive: true }); revisar();
})();
