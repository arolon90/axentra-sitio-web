/* Equipo */
(function () {
  var AX = window.AX, d = AX.d, visibles = AX.visibles, icono = AX.icono, paleta = AX.paleta, colorDe = AX.colorDe, dos = AX.dos, esc = AX.esc, armarCarrusel = AX.armarCarrusel, marca = AX.marca, pestanasDe = AX.pestanasDe;
  var chipsDe = function (lista) { return lista ? '<p class="persona-esp">' + lista.map(esc).join('<i>·</i>') + '</p>' : ''; };
  var sobre = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg>';
  var ficha = function (clase, color, avatar, nombre, rol, chips, extra) {
    return '<div class="avatar-anillo"><div class="avatar">' + avatar + '</div></div><div class="persona-datos"><h3>' + nombre + '</h3><span class="rol">' + rol + '</span>' + chipsDe(chips) + (extra || '') + '</div>';
  };
  var personas = visibles(d.equipo).map(function (e, n) {
    var avatar = e.foto ? '<img src="' + esc(e.foto) + '" alt="' + esc(e.nombre) + '">' : esc(e.iniciales);
    var correo = e.correo ? '<a class="persona-correo" href="mailto:' + esc(e.correo) + '">' + sobre + esc(e.correo) + '</a>' : '';
    var bio = e.cv ? '<ul class="persona-cv">' + e.cv.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + (e.especialidad ? '<li class="destacada">' + esc(e.especialidad) + '</li>' : '') + '</ul>' : (e.bio ? '<p class="persona-bio">' + esc(e.bio) + '</p>' : '');
    return '<div class="persona' + (e.foto ? ' con-foto' : '') + '" style="--c:' + esc(e.color || colorDe(e, n)) + '">' + ficha('', '', avatar, esc(e.nombre), esc(e.rol), (e.bio || e.cv) ? null : e.chips, bio + correo) + '</div>';
  }).join('');
  var iaEq = d.asistente;
  if (iaEq && iaEq.visible !== false) {
    personas += '<a class="persona persona-ia" href="arandu-ai.html" style="--c:#7c5cff">' + ficha('', '', iaEq.logo ? '<img src="' + esc(iaEq.logo) + '" alt="">' : icono('i:microfono'),
      esc(iaEq.nombre), 'Asistente de inteligencia artificial de AXENTRA', null, '<p class="persona-bio">Escucha las entrevistas de relevamiento, las transcribe y arma los borradores de las fichas de procesos.</p><span class="ver-mas">Conocelo →</span>') + '</a>';
  }
  var htmlSocios = personas.split('<a class="persona persona-ia"')[0], cajaSocios = document.getElementById('lista-equipo');
  var confEq = (d.carrusel || {}).equipo || {}, cantEq = visibles(d.equipo).length;
  if (cantEq > (confEq.mostrarFijosHasta || 2)) {
    cajaSocios.classList.add('en-carrusel');
    cajaSocios.innerHTML = '<div class="carrusel" aria-label="Equipo"><div class="pista" id="pista-equipo"></div></div>';
    armarCarrusel('pista-equipo', htmlSocios, cantEq, confEq);
  } else { cajaSocios.innerHTML = htmlSocios; }
  var cajaIaEq = document.getElementById('equipo-ia');
  if (cajaIaEq && iaEq && iaEq.visible !== false) {
    var tarjetaIa = '<a class="persona persona-ia"' + personas.split('<a class="persona persona-ia"')[1];
    var vid = iaEq.video ? AX.videoDe(iaEq, iaEq.nombre + ' en acción')
      : '<div class="video-reserva">' + (iaEq.videoPoster ? '<img src="' + esc(iaEq.videoPoster) + '" alt="">' : '') + '<span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg></span><b>' + esc(iaEq.nombre) + ' en acción</b><small>Video próximamente</small></div>';
    cajaIaEq.innerHTML = tarjetaIa + '<div class="equipo-video">' + vid + '</div>';
    AX.activarVideos(cajaIaEq);
  }
  var cajaValores = document.getElementById('equipo-valores');
  if (cajaValores) { cajaValores.innerHTML = (d.equipoValores || []).map(function (v, n) {
    return '<li><span class="val-num">' + dos(n) + '</span><div><b>' + esc(v.titulo) + '</b><span>' + esc(v.texto) + '</span></div></li>'; }).join(''); }
})();
