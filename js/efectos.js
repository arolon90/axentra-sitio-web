/* Efectos: luz que sigue al mouse en las tarjetas y aparición al bajar */
(function () {
  var selector = '.tarjeta, .cliente, .persona, .testimonio, .partner, .entregable';
  document.querySelectorAll(selector).forEach(function (el) { el.classList.add('efecto-luz'); });
  document.addEventListener('pointermove', function (ev) {
    var el = ev.target.closest && ev.target.closest('.efecto-luz, .area');
    if (!el) { return; }
    var r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
    el.style.setProperty('--my', (ev.clientY - r.top) + 'px');
  });
  var sinMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sinMovimiento || !('IntersectionObserver' in window)) { return; }
  var objetivos = document.querySelectorAll('.seccion h2, .seccion .intro, .seccion .etiqueta, .grilla > *, .areas > *, .pantalla, .pasos > *, .entregables > *, .ficha-demo-cont, .equipo > *, .preguntas details, .centrado');
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  objetivos.forEach(function (el, i) {
    if (el.getBoundingClientRect().top < window.innerHeight) { return; }   /* lo que ya se ve, no se oculta */
    if (el.closest('.pestana-panel') || (el.parentNode.classList.contains('deslizable') && window.innerWidth <= 640)) { return; }
    el.classList.add('revelar'); el.style.transitionDelay = ((i % 4) * 0.08) + 's'; obs.observe(el);
  });
})();
