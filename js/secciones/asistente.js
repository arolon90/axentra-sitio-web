/* Arandu AI: la aplicación de ejemplo en 4 pantallas */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var ia = d.asistente, secIa = document.getElementById('asistente');
  if (secIa && (!ia || ia.visible === false)) { secIa.parentNode.removeChild(secIa); }
  else if (secIa) {
    document.getElementById('asistente-titulo').innerHTML = 'Conocé a <em>' + esc(ia.nombre) + '</em>, nuestro asistente de relevamiento';
    document.getElementById('asistente-texto').innerHTML = '<strong>' + esc(ia.nombre) + '</strong> (' + esc(ia.significado) + ') es el asistente de inteligencia artificial de AXENTRA. ' + esc(ia.texto);
    document.getElementById('asistente-capacidades').innerHTML = (ia.capacidades || []).map(function (c) {
      return '<div class="capacidad"><span class="cap-icono">' + icono(c.icono) + '</span><div><strong>' + esc(c.titulo) + '</strong><span>' + esc(c.texto) + '</span></div></div>'; }).join('');
    document.getElementById('asistente-nota').textContent = ia.nota || '';
    var cajaVid = document.getElementById('asistente-video');
    if (cajaVid) {
      if (ia.video) { cajaVid.innerHTML = AX.videoDe(ia, ia.nombre + ' trabajando: abre la laptop, ordena los datos del relevamiento y saluda'); AX.activarVideos(cajaVid); }
      else { cajaVid.parentNode.classList.add('sin-video'); cajaVid.parentNode.removeChild(cajaVid); }
    }
    var dm = ia.demo || {}, barras = '';
    for (var b = 0; b < 46; b++) { barras += '<i style="height:' + (22 + Math.round(Math.abs(Math.sin(b * 0.55) * Math.cos(b * 0.21)) * 70)) + '%"></i>'; }
    var svg = function (d, relleno) { return '<svg viewBox="0 0 24 24" aria-hidden="true"' + (relleno ? ' class="relleno"' : '') + '>' + d + '</svg>'; };
    var icCasa = svg('<path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>');
    var icPausa = svg('<rect x="7" y="5.5" width="3.4" height="13" rx="1"/><rect x="13.6" y="5.5" width="3.4" height="13" rx="1"/>', true);
    var icPlay = svg('<path d="M8 5.5v13l10.5-6.5z"/>', true);
    var icBandera = svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>');
    var icCheck = svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
    var logoIa = '<span class="ia-logo">' + (ia.logo ? '<img src="' + esc(ia.logo) + '" alt="">' : esc(ia.nombre).charAt(0)) + '</span>';
    var ini = function (t) { return esc(String(t).charAt(0)); };
    var miniOnda = function () { var o = ''; for (var q = 0; q < 22; q++) { o += '<i style="height:' + (25 + ((q * 47) % 70)) + '%"></i>'; } return '<span class="nota-onda">' + o + '</span>'; };
    var entrada = function (e, n, color, quien) {
      var st = ' style="--n:' + n + ';--c:' + esc(color || '#0056ff') + '"';
      if (e.tipo === 'pregunta') { return '<div class="ent ent-preg"' + st + '><div><small>Consultor AXENTRA</small><p>' + esc(e.texto) + '</p></div></div>'; }
      if (e.tipo === 'audio') { return '<div class="ent ent-audio"' + st + '><i class="burb-ini">' + ini(e.quien || quien) + '</i><div><small>' + esc(e.quien || quien) + '</small><span class="nota"><span class="nota-play">' + icPlay + '</span>' + miniOnda() + '<b>' + esc(e.dur) + '</b></span><p>' + esc(e.texto) + '</p></div></div>'; }
      if (e.tipo === 'ia') { return '<div class="ent ent-ia' + (e.pendiente ? ' con-pend' : '') + '"' + st + '>' + logoIa + '<div><small>Interpretación de ' + esc(ia.nombre) + '</small><p>' + esc(e.texto) + '</p>' + (e.ref ? '<em>' + (e.pendiente ? icBandera : '') + esc(e.ref) + '</em>' : '') + '</div></div>'; }
      if (e.tipo === 'pendiente') { return '<div class="ent ent-pend"' + st + '>' + icBandera + '<p><b>Pendiente</b>' + esc(e.texto) + '</p></div>'; }
      if (e.tipo === 'resuelto') { return '<div class="ent ent-ok"' + st + '>' + icCheck + '<p><b>Resuelto</b>' + esc(e.texto) + '</p></div>'; }
      return '';
    };
    var controles = function (k) {
      return '<div class="ia-controles">' +
        '<button type="button" class="ia-ctl" data-accion="pausa" aria-label="Pausar la grabación">' + icPausa + '<small>Pausa</small></button>' +
        '<button type="button" class="ia-ctl ia-rec" data-accion="pausa" aria-label="Grabando"><span class="ia-rec-punto"></span><small>Grabando</small></button>' +
        '<button type="button" class="ia-ctl' + (k === 1 ? ' actual' : '') + '" data-ir="' + (k === 1 ? 0 : 1) + '" aria-label="' + (k === 1 ? 'Volver a la grabación' : 'Ir a la bitácora') + '">' + icCasa + '<small>' + (k === 1 ? 'Bitácora' : 'Inicio') + '</small></button></div>';
    };
    var se = dm.sesion || {};
    /* pantalla 1: la entrevista del día */
    var pantallaGrab = '<section class="ia-pant ia-grab" aria-label="Entrevista en curso">' +
      '<div class="ia-barra">' + logoIa + '<strong>' + esc(ia.nombre) + '</strong><span class="ia-vivo" id="ia-estado">Grabando</span></div>' +
      '<div class="ia-sesion" style="--c:' + esc(se.color) + '"><i class="burb-ini">' + ini(se.persona) + '</i><div class="ia-rec-datos"><b class="ia-quien">' + esc(se.persona) + ' · ' + esc(se.area) + '</b><small>' + esc(se.dia) + '</small></div><b class="ia-tiempo" id="ia-tiempo">00:00:00</b></div>' +
      '<div class="ia-onda ia-onda-sesion">' + barras + '</div>' +
      '<div class="ia-scroll"><div class="ia-scroll-in">' + (dm.chat || []).map(function (e, n) { return entrada(e, n, se.color, se.persona); }).join('') +
      '<div class="ent ent-escribe" style="--n:' + (dm.chat || []).length + '"><i></i><i></i><i></i><small>Escuchando…</small></div></div></div>' +
      controles(0) + '</section>';
    /* pantalla 2: bitácora día por día */
    var pantallaBit = '<section class="ia-pant ia-bit" aria-label="Bitácora del relevamiento">' +
      '<div class="ia-barra">' + logoIa + '<strong>Bitácora del relevamiento</strong><span class="ia-cuenta">' + (dm.bitacora || []).length + ' días</span></div>' +
      '<div class="ia-scroll"><div class="ia-scroll-in">' + (dm.bitacora || []).map(function (dia, n) {
        return '<div class="dia" style="--n:' + n + ';--c:' + esc(dia.color) + '"><div class="dia-sep"><span>' + esc(dia.dia) + '</span></div>' +
          '<div class="dia-persona"><i class="burb-ini">' + ini(dia.persona) + '</i><div><b>' + esc(dia.persona) + ' · ' + esc(dia.area) + '</b><small>' + esc(dia.sesion) + '</small></div>' + (dia.reconvocado ? '<em>Se lo vuelve a convocar</em>' : '') + '</div>' +
          dia.entradas.map(function (e) { return entrada(e, 0, dia.color, dia.persona); }).join('') + '</div>';
      }).join('') + '</div></div>' + controles(1) + '</section>';
    /* pantalla 3: grafo de lo relevado (gerencias, temas y puntos de unión) */
    var gfd = dm.grafo || { gerencias: [], temas: [] }, GW = 360, GH = 300, CX = 180, CY = 152;
    var semilla = 11, azarG = function () { semilla = (semilla * 16807) % 2147483647; return (semilla - 1) / 2147483646; };
    var hubs = {}, gfEnl = '', gfNod = '', gfFondo = '', propios = {}, comunes = 0;
    gfd.gerencias.forEach(function (h) { hubs[h.id] = h; propios[h.id] = 0; });
    gfd.temas.forEach(function (t) { var hs = t[1].split(' '); if (hs.length === 1) { propios[hs[0]]++; } });
    for (var f = 0; f < 70; f++) {
      var fx = azarG() * GW, fy = azarG() * GH;
      gfFondo += '<circle class="gf-polvo" cx="' + fx.toFixed(1) + '" cy="' + fy.toFixed(1) + '" r="' + (0.8 + azarG() * 1.6).toFixed(1) + '"/>';
      if (f % 3 === 0) { gfFondo += '<line class="gf-hilo" x1="' + fx.toFixed(1) + '" y1="' + fy.toFixed(1) + '" x2="' + (fx + (azarG() - .5) * 80).toFixed(1) + '" y2="' + (fy + (azarG() - .5) * 80).toFixed(1) + '"/>'; }
    }
    var cont = {};
    gfd.temas.forEach(function (t, k) {
      var hs = t[1].split(' ').filter(function (h) { return hubs[h]; }), x, y;
      if (hs.length === 1) {
        var h = hubs[hs[0]], base = Math.atan2(h.y - CY, h.x - CX), n = cont[h.id] = (cont[h.id] || 0) + 1, tot = propios[h.id];
        var ang = base + (n - (tot + 1) / 2) * (Math.PI * 1.45 / Math.max(tot, 1)), rad = (n % 2 ? 40 : 60) + azarG() * 5;
        x = h.x + Math.cos(ang) * rad; y = h.y + Math.sin(ang) * rad * 0.8;
      } else {
        x = hs.reduce(function (a, h) { return a + hubs[h].x; }, 0) / hs.length + (azarG() - .5) * 22;
        y = hs.reduce(function (a, h) { return a + hubs[h].y; }, 0) / hs.length + (azarG() - .5) * 18;
        if (hs.length > 2) { x = CX + (azarG() - .5) * 30; y = CY + (k % 2 ? 14 : -14); }
        if (t.length > 3) { x = t[2]; y = t[3]; }
        comunes++;
      }
      x = Math.max(8, Math.min(GW - 8, x)); y = Math.max(10, Math.min(GH - 8, y));
      hs.forEach(function (h) {
        gfEnl += '<line class="gf-l" data-h="' + h + '" data-t="' + k + '" style="--c:' + esc(hubs[h].color) + '" x1="' + hubs[h].x + '" y1="' + hubs[h].y + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>';
      });
      var comun = hs.length > 1, col = comun ? '#ffffff' : hubs[hs[0]].color;
      var hx = hubs[hs[0]].x, ancho = t[0].length * 3, lado = x < hx - 4 ? 'end' : (x > hx + 4 ? 'start' : 'middle');
      if (lado === 'end' && x - 4.5 - ancho < 3) { lado = 'start'; }
      if (lado === 'start' && x + 4.5 + ancho > GW - 3) { lado = 'end'; }
      gfNod += '<g class="gf-t' + (comun ? ' comun' : '') + '" data-h="' + hs.join(' ') + '" data-t="' + k + '" style="--c:' + esc(col) + '">' +
        '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (comun ? 2.6 + hs.length : 2.4) + '"/>' +
        (comun ? '<text x="' + x.toFixed(1) + '" y="' + (y - 6 - hs.length).toFixed(1) + '">' + esc(t[0]) + '</text>'
          : '<text class="lado" text-anchor="' + lado + '" x="' + (x + (lado === 'end' ? -4.5 : (lado === 'start' ? 4.5 : 0))).toFixed(1) + '" y="' + (y + (Math.abs(x - hubs[hs[0]].x) <= 4 ? (y < hubs[hs[0]].y ? -5 : 9) : 2)).toFixed(1) + '">' + esc(t[0]) + '</text>') + '</g>';
    });
    gfd.gerencias.forEach(function (h) {
      gfNod += '<g class="gf-h" data-hub="' + h.id + '" style="--c:' + esc(h.color) + '" tabindex="0" role="button" aria-label="' + esc(h.nombre) + '">' +
        '<circle class="gf-h-halo" cx="' + h.x + '" cy="' + h.y + '" r="17"/><circle cx="' + h.x + '" cy="' + h.y + '" r="10"/>' +
        '<text x="' + h.x + '" y="' + (h.y + 22) + '">' + esc(h.nombre) + '</text></g>';
    });
    var pantallaMapa = '<section class="ia-pant ia-mapa" aria-label="Relaciones entre áreas">' +
      '<div class="ia-barra">' + logoIa + '<strong>Mapa del relevamiento</strong><span class="ia-cuenta">' + gfd.temas.length + ' temas · ' + comunes + ' en común</span></div>' +
      '<p class="ia-sub">Cada gerencia, los temas que surgieron en sus entrevistas y los puntos donde las áreas se cruzan.</p>' +
      '<div class="grafo-oscuro"><svg class="ia-grafo" viewBox="0 0 ' + GW + ' ' + GH + '" role="img" aria-label="Mapa de temas por gerencia y sus puntos en común">' +
      '<g class="gf-fondo">' + gfFondo + '</g>' + gfEnl + gfNod + '</svg><span class="grafo-foco" id="grafo-foco"></span></div>' +
      '<p class="ia-leyenda gf-ley"><span><i class="lg-h"></i>Gerencia</span><span><i class="lg-t"></i>Tema de un área</span><span><i class="lg-c"></i>Tema en común</span></p></section>';
    /* pantalla 4: resumen por gerencia */
    var ger = dm.gerencias || [], minTot = ger.reduce(function (a, x) { return a + x.minutos; }, 0);
    var totEnt = ger.reduce(function (a, x) { return a + x.entrevistas; }, 0);
    var pantallaResumen = '<section class="ia-pant ia-resumen" aria-label="Participación por gerencia">' +
      '<div class="ia-barra">' + logoIa + '<strong>Resumen por gerencia</strong></div>' +
      '<div class="ia-kpis"><span><b>' + totEnt + '</b>entrevistas</span><span><b>' + Math.floor(minTot / 60) + ' h ' + (minTot % 60) + ' min</b>grabadas</span><span><b>' + (dm.procesos || 0) + '</b>procesos detectados</span><span><b>' + (dm.vinculos || []).length + '</b>vínculos entre áreas</span></div>' +
      '<div class="ia-part-cab"><b>Participación por gerencia</b><span>% del tiempo grabado</span></div>' +
      '<div class="ia-part">' + ger.map(function (g, k) {
        var pct = Math.round(g.minutos / minTot * 100);
        return '<div class="ia-part-fila" style="--c:' + esc(g.color) + ';--p:' + pct + '%;--k:' + k + '"><span class="ia-part-nom">' + esc(g.nombre) + '</span><span class="ia-part-barra"><i></i></span><b>' + pct + ' %</b><small>' + g.entrevistas + ' · ' + g.minutos + ' min</small></div>';
      }).join('') + '</div>' +
      '<div class="ia-hallazgos"><b>' + logoIa + 'Lo que encontró ' + esc(ia.nombre) + '</b><ul>' + (dm.hallazgos || []).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></div></section>';
    var pasosIa = dm.pasos || [];
    var panel = document.getElementById('asistente-demo');
    panel.innerHTML = '<div class="ia-pantallas"><div class="ia-pista" id="ia-pista">' + pantallaGrab + pantallaBit + pantallaMapa + pantallaResumen + '</div></div>' +
      '<div class="ia-historia"><ol class="ia-pasos">' + pasosIa.map(function (x, k) { return '<li><button type="button" data-paso="' + k + '"><span>' + (k + 1) + '</span>' + esc(x[0]) + '</button></li>'; }).join('') + '</ol>' +
      '<p id="ia-paso-texto" aria-live="polite"></p></div>' +
      '<span class="marca-agua">DATOS DEMOSTRATIVOS</span>';
    var pistaIa = document.getElementById('ia-pista'), pantallas = pistaIa.children, botonesPaso = panel.querySelectorAll('[data-paso]');
    var segundos = se.segundos || 0, pausado = false, enVista = false, sobreIa = false, pantIa = 0, ultimoCambio = Date.now();
    var duraciones = [13000, 14000, 13500, 9000];
    var quietoIa = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var reloj2 = function (t) { var h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, sg = t % 60; return [h, m, sg].map(function (v) { return (v < 10 ? '0' : '') + v; }).join(':'); };
    var pintarTiempo = function () { document.getElementById('ia-tiempo').textContent = reloj2(segundos); };
    var desplazar = function (pant) {
      var caja = pant.querySelector('.ia-scroll'), dentro = pant.querySelector('.ia-scroll-in');
      if (!caja || !dentro) { return; }
      dentro.style.transition = 'none'; dentro.style.transform = 'none';
      if (quietoIa) { caja.style.overflowY = 'auto'; return; }
      setTimeout(function () {
        var sobra = dentro.scrollHeight - caja.clientHeight;
        if (sobra > 0) { dentro.style.transition = 'transform ' + Math.max(4, sobra / 28) + 's ease-in-out'; dentro.style.transform = 'translateY(' + (-sobra) + 'px)'; }
      }, 2600);
    };
    var irPant = function (k) {
      pantIa = k; ultimoCambio = Date.now();
      pistaIa.style.transform = 'translateX(' + (-100 / pantallas.length * k) + '%)';
      for (var q = 0; q < pantallas.length; q++) { pantallas[q].classList.remove('activa'); pantallas[q].setAttribute('aria-hidden', q === k ? 'false' : 'true'); }
      void pantallas[k].offsetWidth; pantallas[k].classList.add('activa'); desplazar(pantallas[k]);
      botonesPaso.forEach(function (bt, q) { bt.setAttribute('aria-current', q === k ? 'step' : 'false'); bt.classList.toggle('hecho', q < k); });
      document.getElementById('ia-paso-texto').textContent = (pasosIa[k] || [])[1] || '';
    };
    var cambiarPausa = function () {
      pausado = !pausado;
      panel.classList.toggle('pausado', pausado);
      document.getElementById('ia-estado').textContent = pausado ? 'En pausa' : 'Grabando';
      panel.querySelectorAll('[data-accion="pausa"]:not(.ia-rec)').forEach(function (bp) {
        bp.innerHTML = (pausado ? icPlay + '<small>Seguir</small>' : icPausa + '<small>Pausa</small>');
        bp.setAttribute('aria-label', pausado ? 'Seguir grabando' : 'Pausar la grabación');
      });
    };
    panel.querySelectorAll('[data-accion="pausa"]').forEach(function (bt) { bt.addEventListener('click', cambiarPausa); });
    panel.querySelectorAll('[data-ir]').forEach(function (bt) { bt.addEventListener('click', function () { irPant(+bt.getAttribute('data-ir')); }); });
    botonesPaso.forEach(function (bt) { bt.addEventListener('click', function () { irPant(+bt.getAttribute('data-paso')); }); });
    panel.addEventListener('mouseenter', function () { sobreIa = true; });
    panel.addEventListener('mouseleave', function () { sobreIa = false; ultimoCambio = Date.now(); });
    var grafo = panel.querySelector('.ia-grafo'), focoTxt = document.getElementById('grafo-foco');
    if (grafo) {
      var gfLineas = grafo.querySelectorAll('.gf-l'), gfTemas = grafo.querySelectorAll('.gf-t'), gfHubs = grafo.querySelectorAll('.gf-h');
      var marcarGrafo = function (hubId, temaId) {
        grafo.classList.toggle('foco', !!(hubId || temaId !== undefined && temaId !== null));
        grafo.classList.toggle('foco-comun', hubId === '*');
        var hubsOn = {};
        if (hubId && hubId !== '*') { hubsOn[hubId] = true; }
        if (temaId !== undefined && temaId !== null) { grafo.querySelector('.gf-t[data-t="' + temaId + '"]').getAttribute('data-h').split(' ').forEach(function (h) { hubsOn[h] = true; }); }
        gfHubs.forEach(function (g) { g.classList.toggle('on', !!hubsOn[g.getAttribute('data-hub')] || hubId === '*'); });
        gfLineas.forEach(function (l) {
          var on = temaId !== undefined && temaId !== null ? l.getAttribute('data-t') === String(temaId) : (hubId === '*' ? grafo.querySelector('.gf-t[data-t="' + l.getAttribute('data-t') + '"]').classList.contains('comun') : !!hubsOn[l.getAttribute('data-h')]);
          l.classList.toggle('on', on);
        });
        gfTemas.forEach(function (t) {
          var hs = t.getAttribute('data-h').split(' ');
          var on = temaId !== undefined && temaId !== null ? t.getAttribute('data-t') === String(temaId) : (hubId === '*' ? t.classList.contains('comun') : hs.some(function (h) { return hubsOn[h]; }));
          t.classList.toggle('on', on);
        });
        var nombre = hubId === '*' ? 'Puntos de unión entre áreas' : (hubId ? (gfd.gerencias.filter(function (h) { return h.id === hubId; })[0] || {}).nombre : '');
        if (focoTxt) { focoTxt.textContent = nombre || ''; focoTxt.classList.toggle('ver', !!nombre); }
      };
      var sobreGrafo = false, ciclo = gfd.gerencias.map(function (h) { return h.id; }).concat(['*']), pasoGf = 0;
      gfHubs.forEach(function (g) {
        var id = g.getAttribute('data-hub');
        g.addEventListener('mouseenter', function () { sobreGrafo = true; marcarGrafo(id); });
        g.addEventListener('focus', function () { sobreGrafo = true; marcarGrafo(id); });
        g.addEventListener('mouseleave', function () { sobreGrafo = false; marcarGrafo(null); });
        g.addEventListener('blur', function () { sobreGrafo = false; marcarGrafo(null); });
      });
      gfTemas.forEach(function (t) {
        t.addEventListener('mouseenter', function () { sobreGrafo = true; marcarGrafo(null, t.getAttribute('data-t')); });
        t.addEventListener('mouseleave', function () { sobreGrafo = false; marcarGrafo(null); });
      });
      setInterval(function () {
        if (sobreGrafo || quietoIa || !enVista || pantIa !== 2) { return; }
        marcarGrafo(ciclo[pasoGf % ciclo.length]); pasoGf++;
      }, 2200);
    }
    pintarTiempo(); irPant(0);
    setInterval(function () {
      if (!enVista) { return; }
      if (!pausado) { segundos++; pintarTiempo(); }
      if (!quietoIa && !sobreIa && Date.now() - ultimoCambio > (duraciones[pantIa] || 9000)) { irPant((pantIa + 1) % pantallas.length); }
    }, 1000);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (e) { var antes = enVista; enVista = e.isIntersecting; if (enVista) { panel.classList.add('activo'); if (!antes) { irPant(pantIa); } } }); }, { threshold: 0.3 }).observe(panel);
    } else { enVista = true; panel.classList.add('activo'); }
  }
})();
