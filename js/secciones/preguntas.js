/* Preguntas frecuentes */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var cajaPreg = document.getElementById('lista-preguntas');
  cajaPreg.innerHTML = (d.preguntas || []).map(function (q, n) {
    return '<details class="faq"' + (n === 0 ? ' open' : '') + '><summary><span class="faq-num">' + dos(n) + '</span><span class="faq-q">' + esc(q.pregunta) + '</span><span class="faq-mas" aria-hidden="true"></span></summary><div class="faq-r"><p>' + esc(q.respuesta) + '</p></div></details>';
  }).join('');
  var faqs = cajaPreg.querySelectorAll('details');
  faqs.forEach(function (f) { f.addEventListener('toggle', function () { if (f.open) { faqs.forEach(function (o) { if (o !== f) { o.open = false; } }); } }); });
  var faqWa = document.getElementById('faq-wa');
  var faqWaM = document.getElementById('faq-wa-movil');
  if (faqWaM) { faqWaM.href = 'https://wa.me/' + ((d.contacto || {}).whatsapp || '') + '?text=' + encodeURIComponent('Hola AXENTRA, tengo una consulta sobre Odoo:'); }
  if (faqWa) { faqWa.href = 'https://wa.me/' + ((d.contacto || {}).whatsapp || '') + '?text=' + encodeURIComponent('Hola AXENTRA, tengo una consulta sobre Odoo:'); }
})();
