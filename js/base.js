/* Ayudas comunes para armar la página a partir de los datos (window.SITIO).
   Cada sección (js/secciones/*.js) las toma de window.AX. */
(function () {
  var d = window.SITIO || {};
  /* elementos visibles, ordenados por "orden" (los que no lo tienen van al final, en su orden original) */
  var visibles = function (lista) {
    return (lista || []).map(function (x, i) { return { x: x, i: i }; })
      .filter(function (e) { return e.x.visible !== false; })
      .sort(function (a, b) {
        var oa = typeof a.x.orden === 'number' ? a.x.orden : Infinity, ob = typeof b.x.orden === 'number' ? b.x.orden : Infinity;
        return oa === ob ? a.i - b.i : oa - ob;
      })
      .map(function (e) { return e.x; });
  };
  var icono = function (v) {
    if (/^i:/.test(v || '')) { return (window.ICONOS || {})[v.slice(2)] || ''; }
    return /\.(svg|png|webp|jpg)$/i.test(v || '') ? '<img src="' + v + '" alt="" class="icono-img">' : (v || '');
  };
  var paleta = ['#0056ff', '#0891b2', '#7c5cff', '#16a34a', '#ea580c', '#db2777', '#0f766e', '#4f46e5'];
  var colorDe = function (x, n) { return (x && x.color) || paleta[n % paleta.length]; };
  var dos = function (n) { return (n < 9 ? '0' : '') + (n + 1); };
  var esc = function (t) { var e = document.createElement('span'); e.textContent = t || ''; return e.innerHTML; };
  /* Carrusel configurable desde datos/sitio.js (sección "carrusel") */
  var armarCarrusel = function (id, html, cantidad, conf) {
    conf = conf || {};
    var pista = document.getElementById(id), carrusel = pista.parentNode;
    var apagadas = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var girar = conf.activo !== false && cantidad > 1 && !(apagadas && conf.respetarAnimacionesApagadas);
    if (cantidad < 2) { carrusel.classList.add('fijo'); pista.innerHTML = html; return; }
    /* se duplica la fila para que el giro no tenga cortes; la copia no la leen los lectores de pantalla */
    pista.innerHTML = html + '<div aria-hidden="true" style="display:contents">' + html + '</div>';
    /* flechas para avanzar o retroceder de a un elemento */
    var envoltura = document.createElement('div'); envoltura.className = 'carrusel-envoltura';
    carrusel.parentNode.insertBefore(envoltura, carrusel); envoltura.appendChild(carrusel);
    envoltura.insertAdjacentHTML('beforeend',
      '<button type="button" class="flecha izquierda" aria-label="Anterior">‹</button><button type="button" class="flecha derecha" aria-label="Siguiente">›</button>');
    var segundos = conf.segundosPorElemento || 7, desplazamiento = 0, objetivo = null, pausa = false, anterior = null;
    var mitad = function () { return pista.scrollWidth / 2; };
    var paso = function () { var e = pista.firstElementChild; return e ? e.getBoundingClientRect().width + 18 : 260; };
    var normalizar = function (x) { var m = mitad(); return m ? ((x % m) + m) % m : 0; };
    var espera = 0;
    var mover = function (direccion) {
      espera = 0;
      var base = objetivo === null ? desplazamiento : objetivo;
      objetivo = base + direccion * paso();
    };
    envoltura.querySelector('.izquierda').addEventListener('click', function () { mover(-1); });
    envoltura.querySelector('.derecha').addEventListener('click', function () { mover(1); });
    if (conf.pausarAlPasarMouse !== false) {
      carrusel.addEventListener('mouseenter', function () { pausa = true; });
      carrusel.addEventListener('mouseleave', function () { pausa = false; });
      envoltura.addEventListener('focusin', function () { pausa = true; });
      envoltura.addEventListener('focusout', function () { pausa = false; });
    }
    var cuadro = function (t) {
      var dt = anterior === null ? 0 : Math.min(0.05, (t - anterior) / 1000); anterior = t;
      if (objetivo !== null) {
        var falta = objetivo - desplazamiento;
        desplazamiento += falta * Math.min(1, dt * 9);
        if (Math.abs(falta) < 0.5) { desplazamiento = objetivo; objetivo = null; }
      } else if (girar && !pausa && conf.modo === 'pasos') {
        /* modo "pasos": se detiene en cada tarjeta y avanza una entera cada "segundosPorElemento" */
        espera += dt;
        if (espera >= segundos) { espera = 0; mover(1); }
      } else if (girar && !pausa) {
        desplazamiento += dt * paso() / segundos;
      }
      var m = mitad();
      if (m && (desplazamiento >= m || desplazamiento < 0)) {
        var antes = desplazamiento; desplazamiento = normalizar(desplazamiento);
        if (objetivo !== null) { objetivo += desplazamiento - antes; }
      }
      pista.style.transform = 'translateX(' + (-desplazamiento) + 'px)';
      requestAnimationFrame(cuadro);
    };
    requestAnimationFrame(cuadro);
  };
  var marca = function (x) {
    return x.logo ? '<img src="' + esc(x.logo) + '" alt="' + esc(x.nombre) + '">'
      : '<div class="inicial" style="background:' + esc(x.color || '#0056ff') + '">' + esc(x.iniciales || (x.nombre || '?').charAt(0)) + '</div>';
  };
  var pestanasDe = function (lista, prefijo, etiqueta, boton, panel) {
    return '<div class="pestanas-lista" role="tablist" aria-label="' + etiqueta + '">' + lista.map(function (x, n) {
        return '<button type="button" class="pestana" role="tab" id="tab-' + prefijo + n + '" aria-controls="panel-' + prefijo + n + '"' + (x.color ? ' style="--color:' + esc(x.color) + '"' : '') + '>' + boton(x) + '</button>'; }).join('') + '</div>' +
      lista.map(function (x, n) { return '<div class="pestana-panel" role="tabpanel" id="panel-' + prefijo + n + '" aria-labelledby="tab-' + prefijo + n + '">' + panel(x) + '</div>'; }).join('');
  };
  /* video en loop (sin sonido) del asistente: WebM liviano y MP4 de respaldo. Arranca solo, sin que haya que darle play. */
  var videoDe = function (x, etiqueta) {
    if (!x || !x.video) { return ''; }
    return '<video autoplay muted loop playsinline preload="auto"' + (x.videoPoster ? ' poster="' + esc(x.videoPoster) + '"' : '') + ' aria-label="' + esc(etiqueta) + '">' +
      (x.videoWebm ? '<source src="' + esc(x.videoWebm) + '" type="video/webm">' : '') + '<source src="' + esc(x.video) + '" type="video/mp4"></video>';
  };
  /* reproduce los videos automáticos mientras se ven y los pausa fuera de pantalla (ahorra batería).
     Si el navegador frena la reproducción automática (ahorro de batería, datos), arranca con el primer toque o movimiento. */
  var activarVideos = function (caja) {
    if (!caja) { return; }
    [].forEach.call(caja.querySelectorAll('video[autoplay]'), function (v) {
      v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
      var visible = true, eventos = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'];
      var reintentar = function () { if (visible) { reproducir(); } };
      var reproducir = function () {
        var p = v.play();
        if (p && p.then) {
          p.then(function () { eventos.forEach(function (ev) { window.removeEventListener(ev, reintentar, true); }); })
           .catch(function () { eventos.forEach(function (ev) { window.addEventListener(ev, reintentar, { capture: true, passive: true }); }); });
        }
      };
      if (!('IntersectionObserver' in window)) { reproducir(); return; }
      new IntersectionObserver(function (es) { es.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible) { reproducir(); } else { v.pause(); }
      }); }, { threshold: 0.25 }).observe(v);
    });
  };
  window.AX = { d: d, visibles: visibles, icono: icono, paleta: paleta, colorDe: colorDe, dos: dos, esc: esc, armarCarrusel: armarCarrusel, marca: marca, pestanasDe: pestanasDe, videoDe: videoDe, activarVideos: activarVideos };
})();
