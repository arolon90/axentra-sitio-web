/* Panel de administración de la página de AXENTRA AI.
   - Ingreso con el token personal de GitHub de cada persona (no hay contraseñas en el código).
   - Lee y guarda datos/equipo.js y datos/clientes.js en el repositorio, y sube las fotos y los logos a assets/.
   - Al guardar, GitHub Pages vuelve a publicar la página sola (tarda uno o dos minutos). */
(function () {
  var CONF = window.PANEL_CONFIG || {};
  var REPO = CONF.repositorio, RAMA = CONF.rama || 'main', API = 'https://api.github.com';
  var CLAVE_TOKEN = 'axentra-panel-token';
  var FIRMA = '\n\nBy AXENTRA AI Paraguay';
  var MAX_IMAGEN = 2 * 1024 * 1024;

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (t) { var e = document.createElement('span'); e.textContent = t == null ? '' : String(t); return e.innerHTML; };
  var leerAlmacen = function (tipo) { try { return window[tipo].getItem(CLAVE_TOKEN); } catch (e) { return null; } };
  var guardarAlmacen = function (tipo, v) { try { if (v) { window[tipo].setItem(CLAVE_TOKEN, v); } else { window[tipo].removeItem(CLAVE_TOKEN); } } catch (e) { /* sin almacenamiento */ } };

  var token = null;
  var estado = {
    seccion: 'equipo', elegido: 0, cambios: { equipo: false, clientes: false, partners: false },
    archivos: {},            /* ruta -> { sha, cabecera, datos } */
    imagenes: {}             /* ruta en assets -> { base64, url } pendientes de subir */
  };

  /* Secciones que se pueden editar y cómo se guardan */
  var SECCIONES = {
    equipo: {
      archivo: 'datos/equipo.js', clave: 'equipo', titulo: 'Equipo',
      ayuda: 'Las personas se muestran en este orden. Con más de 2 visibles, la fila pasa a ser un carrusel.',
      carpeta: 'assets/equipo/', campoImagen: 'foto', retrato: true,
      nuevo: function () { return { nombre: 'Nombre Apellido', rol: 'Cargo · AXENTRA AI Paraguay', iniciales: '', color: '#0056ff', foto: '', visible: true, correo: '', cv: [] }; },
      resumen: function (x) { return [x.nombre, x.rol]; },
      campos: [
        { k: 'nombre', t: 'Nombre (con título, por ejemplo "Lic.")', ancho: true },
        { k: 'rol', t: 'Cargo', ancho: true },
        { k: 'correo', t: 'Correo', tipo: 'email' },
        { k: 'especialidad', t: 'Línea final (opcional)', ayuda: 'Se agrega al final de la lista del CV.' },
        { k: 'cv', t: 'CV breve (una línea por renglón, hasta 5)', tipo: 'lineas', max: 5, ancho: true },
        { k: 'iniciales', t: 'Iniciales (si no hay foto)' },
        { k: 'color', t: 'Color', tipo: 'color' },
        { k: 'visible', t: 'Mostrar en la página', tipo: 'check', ancho: true }
      ]
    },
    clientes: {
      archivo: 'datos/clientes.js', clave: 'clientes', titulo: 'Clientes',
      ayuda: 'Cada tarjeta muestra el logo y tres líneas de texto. Se muestran en este orden, en el carrusel.',
      carpeta: 'assets/clientes/', campoImagen: 'logo', retrato: false,
      nuevo: function () { return { nombre: 'Nombre del cliente', rubro: 'Rubro', detalle: '', iniciales: '', color: '#0056ff', logo: '', visible: true }; },
      resumen: function (x) { return [x.nombre, [x.rubro, x.detalle].filter(Boolean).join(' · ')]; },
      campos: [
        { k: 'nombre', t: 'Título (nombre del cliente)', ancho: true },
        { k: 'rubro', t: 'Subtítulo (rubro)', ancho: true },
        { k: 'detalle', t: 'Tercera línea (opcional)', ayuda: 'Por ejemplo: "Parte de Grupo Noroda".', ancho: true },
        { k: 'iniciales', t: 'Iniciales (si no hay logo)' },
        { k: 'color', t: 'Color', tipo: 'color' },
        { k: 'visible', t: 'Mostrar en la página', tipo: 'check', ancho: true }
      ]
    },
    partners: {
      archivo: 'datos/clientes.js', clave: 'partners', titulo: 'Partners',
      ayuda: 'Se muestran en la tarjeta de abajo de la portada, en este orden. Con más de 2 visibles, pasan a ser un carrusel con flechas.',
      carpeta: 'assets/partners/', campoImagen: 'logo', retrato: false,
      nuevo: function () { return { nombre: 'Nombre del partner', etiqueta: 'Partner', descripcion: 'Qué hacemos juntos', color: '#0056ff', logo: '', enlace: '', visible: true }; },
      resumen: function (x) { return [x.nombre, x.etiqueta || x.distintivo || '']; },
      campos: [
        { k: 'nombre', t: 'Nombre del partner', ancho: true },
        { k: 'etiqueta', t: 'Etiqueta (cápsula de color)', ayuda: 'Por ejemplo: "Odoo Official Partner" o "Partner legal".', ancho: true },
        { k: 'descripcion', t: 'Descripción corta', ancho: true },
        { k: 'enlace', t: 'Página web (opcional)', tipo: 'url', ayuda: 'Empieza con https://. Se abre en otra pestaña.', ancho: true },
        { k: 'color', t: 'Color', tipo: 'color' },
        { k: 'visible', t: 'Mostrar en la página', tipo: 'check', ancho: true }
      ]
    }
  };
  var LISTA_SECCIONES = Object.keys(SECCIONES);
  var archivosDeSecciones = function () { var r = []; LISTA_SECCIONES.forEach(function (s) { if (r.indexOf(SECCIONES[s].archivo) < 0) { r.push(SECCIONES[s].archivo); } }); return r; };
  var cargarTodos = function () { return Promise.all(archivosDeSecciones().map(function (a) { return cargarArchivo(a); })); };
  /* Comentarios que se escriben en los archivos al guardar */
  var COMENTARIOS = {
    equipo: 'EQUIPO: para sumar a alguien, usar el panel (admin/) o copiar un bloque { ... } completo y cambiar los datos.\n     foto: ruta de la foto en assets/equipo/ (vertical, idealmente 400 × 500). Si se deja "", se muestran las iniciales.\n     cv: hasta 5 líneas por persona · especialidad (opcional): línea final · visible: false lo oculta sin borrarlo.\n     Con más de 2 personas visibles, la fila pasa a ser un carrusel (ver carrusel.equipo).',
    equipoValores: 'Lo que nos define (se muestra junto al equipo)',
    clientes: 'CLIENTES: cada tarjeta muestra el logo y tres líneas de texto.\n     nombre = título · rubro = subtítulo · detalle = tercera línea (opcional, por ejemplo "Parte de Grupo Noroda").\n     Si "logo" se deja "", se muestran las iniciales con el color indicado. visible: false lo oculta sin borrarlo.',
    partners: 'PARTNERS: se muestran en la tarjeta de abajo de la portada, en este orden.\n     nombre = título · etiqueta = cápsula de color · descripcion = texto corto · enlace = página del partner (se abre en otra pestaña).\n     Con más de 2 visibles, la fila pasa a ser un carrusel (ver carrusel.partners en general.js). visible: false lo oculta sin borrarlo.',
    partnersTexto: 'Texto de la tarjeta de partners: los nombres se agregan solos ("Trabajamos de la mano de Odoo y Code100 …")',
    testimonios: 'Testimonios: ocultos hasta tener frases reales (visible: true para mostrarlos)'
  };

  /* ---------------------------------------------------------------- GitHub */
  var gh = function (ruta, opciones) {
    opciones = opciones || {};
    return fetch(API + ruta, {
      method: opciones.method || 'GET',
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
      body: opciones.body ? JSON.stringify(opciones.body) : undefined,
      cache: 'no-store'
    }).then(function (r) {
      return r.text().then(function (t) {
        var datos = null; try { datos = t ? JSON.parse(t) : null; } catch (e) { datos = null; }
        if (!r.ok) { var err = new Error((datos && datos.message) || ('Error ' + r.status)); err.status = r.status; throw err; }
        return datos;
      });
    });
  };
  var aBase64 = function (texto) {
    var bytes = new TextEncoder().encode(texto), bin = '';
    for (var i = 0; i < bytes.length; i += 0x8000) { bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); }
    return btoa(bin);
  };
  var deBase64 = function (b64) {
    var bin = atob(b64.replace(/\s/g, '')), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) { bytes[i] = bin.charCodeAt(i); }
    return new TextDecoder('utf-8').decode(bytes);
  };
  var rutaContenido = function (ruta) { return '/repos/' + REPO + '/contents/' + ruta.split('/').map(encodeURIComponent).join('/'); };
  var leerArchivo = function (ruta) {
    return gh(rutaContenido(ruta) + '?ref=' + encodeURIComponent(RAMA)).then(function (r) { return { texto: deBase64(r.content), sha: r.sha }; });
  };
  var escribir = function (ruta, contenido64, sha, mensaje) {
    var cuerpo = { message: mensaje + FIRMA, content: contenido64, branch: RAMA };
    if (sha) { cuerpo.sha = sha; }
    return gh(rutaContenido(ruta), { method: 'PUT', body: cuerpo }).then(function (r) { return r && r.content ? r.content.sha : null; });
  };

  /* ---------------------------------------------------------------- archivos de datos */
  var evaluar = function (texto) {
    var falsa = {};
    new Function('window', texto)(falsa);   /* el archivo es del propio repositorio de la página */
    return falsa.SITIO || {};
  };
  var clave = function (k) { return /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k); };
  var literal = function (v, sangria) {
    sangria = sangria || '';
    if (Array.isArray(v)) {
      if (!v.length) { return '[]'; }
      if (v.every(function (x) { return x === null || typeof x !== 'object'; })) {
        var corto = '[' + v.map(function (x) { return literal(x); }).join(', ') + ']';
        if (corto.length + sangria.length <= 110) { return corto; }
        return '[\n' + v.map(function (x) { return sangria + '  ' + literal(x); }).join(',\n') + '\n' + sangria + ']';
      }
      return '[\n' + v.map(function (x) { return sangria + '  ' + literal(x, sangria + '  '); }).join(',\n') + '\n' + sangria + ']';
    }
    if (v && typeof v === 'object') {
      var partes = Object.keys(v).filter(function (k) { return v[k] !== undefined; }).map(function (k) { return clave(k) + ': ' + literal(v[k], sangria + '  '); });
      var linea = '{ ' + partes.join(', ') + ' }';
      if (linea.indexOf("\n") < 0 && linea.length + sangria.length <= 200) { return linea; }
      return '{\n' + partes.map(function (x) { return sangria + '  ' + x; }).join(',\n') + '\n' + sangria + '}';
    }
    return JSON.stringify(v);
  };
  var armarArchivo = function (info) {
    var entradas = Object.keys(info.datos).map(function (k) {
      return (COMENTARIOS[k] ? '  /* ' + COMENTARIOS[k] + ' */\n' : '') + '  ' + clave(k) + ': ' + literal(info.datos[k], '  ');
    });
    return info.cabecera + 'window.SITIO = window.SITIO || {};\nObject.assign(window.SITIO, {\n\n' + entradas.join(',\n\n') + '\n});\n';
  };
  var cargarArchivo = function (ruta) {
    return leerArchivo(ruta).then(function (r) {
      var i = r.texto.indexOf('window.SITIO');
      estado.archivos[ruta] = { sha: r.sha, cabecera: i > 0 ? r.texto.slice(0, i) : '', datos: evaluar(r.texto) };
    });
  };

  /* ---------------------------------------------------------------- ingreso */
  var mostrarError = function (t) { $('error-ingreso').textContent = t || ''; };
  var ingresar = function (t, recordar) {
    token = t;
    $('boton-ingresar').disabled = true; $('boton-ingresar').textContent = 'Verificando…'; mostrarError('');
    return Promise.all([gh('/user'), gh('/repos/' + REPO)]).then(function (r) {
      var usuario = r[0], repo = r[1];
      if (!repo.permissions || !repo.permissions.push) { throw new Error('sin-permiso'); }
      guardarAlmacen('sessionStorage', t); guardarAlmacen('localStorage', recordar ? t : null);
      $('usuario-nombre').textContent = usuario.name || usuario.login;
      if (usuario.avatar_url) { $('usuario-foto').src = usuario.avatar_url; } else { $('usuario-foto').hidden = true; }
      return cargarTodos();
    }).then(function () {
      $('vista-ingreso').hidden = true; $('vista-panel').hidden = false; $('barra-usuario').hidden = false;
      elegirSeccion('equipo');
    }).catch(function (e) {
      token = null; guardarAlmacen('sessionStorage', null);
      var m = e.message === 'sin-permiso' ? 'Tu usuario no tiene permiso para editar el repositorio ' + REPO + '.'
        : (e.status === 401 ? 'El token no es válido o venció.'
        : (e.status === 404 ? 'No se encontró el repositorio ' + REPO + ' o el token no tiene acceso a él.'
        : 'No se pudo ingresar: ' + e.message));
      mostrarError(m);
    }).then(function () { $('boton-ingresar').disabled = false; $('boton-ingresar').textContent = 'Ingresar'; });
  };
  var salir = function () {
    if (hayCambios() && !confirm('Hay cambios sin guardar. ¿Salir igual?')) { return; }
    guardarAlmacen('sessionStorage', null); guardarAlmacen('localStorage', null);
    location.reload();
  };

  /* ---------------------------------------------------------------- lista y editor */
  var lista = function () { var s = SECCIONES[estado.seccion]; return estado.archivos[s.archivo].datos[s.clave]; };
  var hayCambios = function () { return LISTA_SECCIONES.some(function (s) { return estado.cambios[s]; }); };
  var marcarCambio = function () {
    estado.cambios[estado.seccion] = true;
    $('barra-guardar').hidden = false; $('estado-guardar').textContent = 'Hay cambios sin guardar';
  };
  var urlImagen = function (ruta) { return estado.imagenes[ruta] ? estado.imagenes[ruta].url : (ruta ? '../' + ruta : ''); };
  var iniciales = function (x) { return x.iniciales || String(x.nombre || '').replace(/^(Dr|Dra|Lic|Ing|Abg|Mg)\.\s*/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join(''); };

  var elegirSeccion = function (s) {
    estado.seccion = s; estado.elegido = 0;
    document.querySelectorAll('.pestana').forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-seccion') === s ? 'true' : 'false'); });
    $('lista-titulo').textContent = SECCIONES[s].titulo; $('lista-ayuda').textContent = SECCIONES[s].ayuda;
    pintarLista(); pintarEditor();
  };
  var pintarLista = function () {
    var s = SECCIONES[estado.seccion], items = lista();
    $('lista').innerHTML = items.map(function (x, i) {
      var r = s.resumen(x), img = x[s.campoImagen];
      var vista = img ? '<span class="item-img' + (s.retrato ? '' : ' logo') + '"><img src="' + esc(urlImagen(img)) + '" alt=""></span>'
        : '<span class="item-img" style="--c:' + esc(x.color || '#0056ff') + '">' + esc(iniciales(x)) + '</span>';
      return '<li class="item' + (i === estado.elegido ? ' activo' : '') + (x.visible === false ? ' oculto' : '') + '" data-i="' + i + '">' + vista +
        '<span class="item-texto"><b>' + esc(r[0]) + '</b><small>' + esc(r[1]) + '</small></span>' + (x.visible === false ? '<span class="item-oculto">Oculto</span>' : '') +
        '<span class="item-orden"><button type="button" class="icono-btn" data-mover="-1" aria-label="Subir"' + (i === 0 ? ' disabled' : '') + '>▲</button>' +
        '<button type="button" class="icono-btn" data-mover="1" aria-label="Bajar"' + (i === items.length - 1 ? ' disabled' : '') + '>▼</button></span></li>';
    }).join('');
  };
  var pintarEditor = function () {
    var s = SECCIONES[estado.seccion], items = lista(), x = items[estado.elegido];
    if (!x) { $('editor').innerHTML = '<p class="editor-vacio">No hay elementos. Tocá <b>+ Agregar</b> para crear el primero.</p>'; return; }
    var campos = s.campos.map(function (c) {
      var v = x[c.k], id = 'campo-' + c.k, cls = 'campo' + (c.ancho ? ' ancho' : '');
      if (c.tipo === 'check') { return '<label class="check ancho"><input type="checkbox" id="' + id + '" data-k="' + c.k + '"' + (v !== false ? ' checked' : '') + '> ' + esc(c.t) + '</label>'; }
      if (c.tipo === 'lineas') { return '<label class="' + cls + '"><span>' + esc(c.t) + '</span><textarea id="' + id + '" data-k="' + c.k + '" data-tipo="lineas" data-max="' + c.max + '" rows="5">' + esc((v || []).join('\n')) + '</textarea><small id="cuenta-' + c.k + '"></small></label>'; }
      return '<label class="' + cls + '"><span>' + esc(c.t) + '</span><input id="' + id + '" data-k="' + c.k + '" type="' + (c.tipo || 'text') + '" value="' + esc(c.tipo === 'color' ? (v || '#0056ff') : (v || '')) + '">' + (c.ayuda ? '<small>' + esc(c.ayuda) + '</small>' : '') + '</label>';
    }).join('');
    var img = x[s.campoImagen];
    var imagen = '<div class="campo ancho"><span>' + (s.retrato ? 'Foto (vertical)' : 'Logo') + '</span><div class="imagen-campo">' +
      '<div class="imagen-vista' + (s.retrato ? ' retrato' : '') + '">' + (img ? '<img src="' + esc(urlImagen(img)) + '" alt="">' : 'Sin imagen') + '</div>' +
      '<div class="imagen-botones"><label class="boton chico secundario">Elegir imagen<input type="file" id="archivo-imagen" accept="image/png,image/jpeg,image/webp,image/svg+xml" hidden></label>' +
      (img ? '<button type="button" class="boton chico secundario" id="quitar-imagen">Quitar</button>' : '') +
      '<small class="sub">PNG, JPG, WEBP o SVG, hasta 2 MB.' + (s.retrato ? ' Ideal: 400 × 500.' : ' Ideal: fondo transparente.') + '</small></div></div></div>';
    $('editor').innerHTML = '<div class="editor-cabeza"><h2>' + esc(x.nombre || 'Sin nombre') + '</h2><button type="button" class="boton chico peligro" id="boton-eliminar">Eliminar</button></div>' +
      '<div class="formulario">' + imagen + campos + '</div>' + (estado.seccion === 'clientes' || estado.seccion === 'partners' ? '<div class="vista-previa"><span>Así se ve en la página</span><div id="previa"></div></div>' : '');
    actualizarPrevia(); contarLineas();
  };
  var actualizarPrevia = function () {
    var caja = $('previa'); if (!caja) { return; }
    var x = lista()[estado.elegido];
    if (estado.seccion === 'partners') {
      caja.innerHTML = '<div class="previa-socio" style="--sc:' + esc(x.color || '#0056ff') + '"><div class="logo">' + (x.logo ? '<img src="' + esc(urlImagen(x.logo)) + '" alt="">' : '<span class="ini" style="--c:' + esc(x.color || '#0056ff') + '">' + esc(iniciales(x)) + '</span>') + '</div>' +
        ((x.etiqueta || x.distintivo) ? '<em>' + esc(x.etiqueta || x.distintivo) + '</em>' : '') + '<h3>' + esc(x.nombre) + '</h3><small>' + esc(x.descripcion) + '</small>' + (x.enlace ? '<span class="ir">↗ ' + esc(x.enlace) + '</span>' : '') + '</div>';
      return;
    }
    caja.innerHTML = '<div class="previa-cliente"><div class="logo">' + (x.logo ? '<img src="' + esc(urlImagen(x.logo)) + '" alt="">' : '<span class="ini" style="--c:' + esc(x.color || '#0056ff') + '">' + esc(iniciales(x)) + '</span>') + '</div>' +
      '<h3>' + esc(x.nombre) + '</h3><span class="rubro">' + esc(x.rubro) + '</span>' + (x.detalle ? '<span class="det">' + esc(x.detalle) + '</span>' : '') + '</div>';
  };
  var contarLineas = function () {
    var t = document.querySelector('[data-tipo="lineas"]'); if (!t) { return; }
    var n = t.value.split('\n').filter(function (l) { return l.trim(); }).length, max = +t.getAttribute('data-max');
    var c = $('cuenta-' + t.getAttribute('data-k')); if (c) { c.textContent = n + ' de ' + max + ' líneas' + (n > max ? ' · se guardan solo las primeras ' + max : ''); c.style.color = n > max ? '#b42318' : ''; }
  };

  /* cambios en el formulario */
  var alEditar = function (ev) {
    var el = ev.target, k = el.getAttribute && el.getAttribute('data-k'); if (!k) { return; }
    var x = lista()[estado.elegido];
    if (el.type === 'checkbox') { x[k] = el.checked; }
    else if (el.getAttribute('data-tipo') === 'lineas') { x[k] = el.value.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).slice(0, +el.getAttribute('data-max')); contarLineas(); }
    else if (el.value === '' && (k === 'especialidad' || k === 'detalle' || k === 'enlace')) { delete x[k]; }
    else { x[k] = el.value; }
    marcarCambio(); pintarLista(); actualizarPrevia();
    if (k === 'nombre') { var h = document.querySelector('.editor-cabeza h2'); if (h) { h.textContent = x.nombre || 'Sin nombre'; } }
  };
  var nombreArchivo = function (texto, ext) {
    var base = String(texto || 'imagen').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'imagen';
    return base + '-' + Date.now().toString(36) + '.' + ext;
  };
  var alElegirImagen = function (archivo) {
    if (!archivo) { return; }
    if (archivo.size > MAX_IMAGEN) { avisar('La imagen pesa más de 2 MB. Achicala y probá de nuevo.', 'mal'); return; }
    var ext = ({ 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/svg+xml': 'svg' })[archivo.type];
    if (!ext) { avisar('Formato no admitido. Usá PNG, JPG, WEBP o SVG.', 'mal'); return; }
    var s = SECCIONES[estado.seccion], x = lista()[estado.elegido], lector = new FileReader();
    lector.onload = function () {
      var ruta = s.carpeta + nombreArchivo(x.nombre, ext);
      estado.imagenes[ruta] = { base64: String(lector.result).split(',')[1], url: lector.result };
      x[s.campoImagen] = ruta; marcarCambio(); pintarLista(); pintarEditor();
    };
    lector.readAsDataURL(archivo);
  };

  /* ---------------------------------------------------------------- guardar */
  var guardar = function () {
    var boton = $('boton-guardar'); boton.disabled = true; boton.textContent = 'Guardando…'; $('estado-guardar').textContent = 'Subiendo los cambios…';
    var usadas = {};
    LISTA_SECCIONES.forEach(function (s) {
      if (!estado.cambios[s]) { return; }
      var c = SECCIONES[s]; estado.archivos[c.archivo].datos[c.clave].forEach(function (x) { if (x[c.campoImagen]) { usadas[x[c.campoImagen]] = true; } });
    });
    var subidas = Object.keys(estado.imagenes).filter(function (r) { return usadas[r]; });
    var cadena = Promise.resolve();
    subidas.forEach(function (ruta) {
      cadena = cadena.then(function () { return escribir(ruta, estado.imagenes[ruta].base64, null, 'Página - Nuevo - Imagen ' + ruta.split('/').pop()); })
        .then(function () { estado.imagenes[ruta].subida = true; });
    });
    archivosDeSecciones().forEach(function (archivo) {
      cadena = cadena.then(function () {
        var secs = LISTA_SECCIONES.filter(function (s) { return SECCIONES[s].archivo === archivo && estado.cambios[s]; });
        if (!secs.length) { return; }
        var info = estado.archivos[archivo], titulos = secs.map(function (s) { return SECCIONES[s].titulo; }).join(' y ');
        return escribir(archivo, aBase64(armarArchivo(info)), info.sha, 'Página - Modificación - ' + titulos + ' actualizado desde el panel')
          .then(function (sha) { info.sha = sha || info.sha; secs.forEach(function (s) { estado.cambios[s] = false; }); });
      });
    });
    cadena.then(function () {
      subidas.forEach(function (r) { delete estado.imagenes[r]; });
      $('barra-guardar').hidden = true;
      avisar('Listo: los cambios se guardaron. La página se actualiza sola en uno o dos minutos.', 'ok');
    }).catch(function (e) {
      $('estado-guardar').textContent = 'No se pudo guardar';
      avisar(e.status === 409 ? 'Alguien más cambió la página mientras editabas. Recargá el panel y volvé a hacer el cambio.' : 'No se pudo guardar: ' + e.message, 'mal');
    }).then(function () { boton.disabled = false; boton.textContent = 'Guardar y publicar'; });
  };
  var avisar = function (texto, tipo) {
    var a = $('aviso'); a.textContent = texto; a.className = 'aviso ' + (tipo || ''); a.hidden = false;
    clearTimeout(avisar.t); avisar.t = setTimeout(function () { a.hidden = true; }, tipo === 'mal' ? 9000 : 6000);
  };

  /* ---------------------------------------------------------------- eventos */
  $('ayuda-repo').textContent = REPO;
  $('formulario-ingreso').addEventListener('submit', function (ev) { ev.preventDefault(); ingresar($('token').value.trim(), $('recordar').checked); });
  $('boton-salir').addEventListener('click', salir);
  document.querySelectorAll('.pestana').forEach(function (b) { b.addEventListener('click', function () { elegirSeccion(b.getAttribute('data-seccion')); }); });
  $('lista').addEventListener('click', function (ev) {
    var li = ev.target.closest('.item'); if (!li) { return; }
    var i = +li.getAttribute('data-i'), mover = ev.target.closest('[data-mover]');
    if (mover) {
      var items = lista(), j = i + (+mover.getAttribute('data-mover'));
      if (j < 0 || j >= items.length) { return; }
      var tmp = items[i]; items[i] = items[j]; items[j] = tmp; estado.elegido = j; marcarCambio();
    } else { estado.elegido = i; }
    pintarLista(); pintarEditor();
  });
  $('boton-agregar').addEventListener('click', function () {
    var items = lista(); items.push(SECCIONES[estado.seccion].nuevo()); estado.elegido = items.length - 1;
    marcarCambio(); pintarLista(); pintarEditor();
    var n = $('campo-nombre'); if (n) { n.focus(); n.select(); }
  });
  $('editor').addEventListener('input', alEditar);
  $('editor').addEventListener('change', function (ev) {
    if (ev.target.id === 'archivo-imagen') { alElegirImagen(ev.target.files[0]); return; }
    if (ev.target.type === 'checkbox') { alEditar(ev); }
  });
  $('editor').addEventListener('click', function (ev) {
    if (ev.target.id === 'quitar-imagen') { lista()[estado.elegido][SECCIONES[estado.seccion].campoImagen] = ''; marcarCambio(); pintarLista(); pintarEditor(); }
    if (ev.target.id === 'boton-eliminar') {
      var x = lista()[estado.elegido];
      if (!confirm('¿Eliminar "' + (x.nombre || 'este elemento') + '"? Si solo querés ocultarlo, desmarcá "Mostrar en la página".')) { return; }
      lista().splice(estado.elegido, 1); estado.elegido = Math.max(0, estado.elegido - 1); marcarCambio(); pintarLista(); pintarEditor();
    }
  });
  $('boton-guardar').addEventListener('click', guardar);
  $('boton-descartar').addEventListener('click', function () {
    if (!confirm('¿Descartar todos los cambios sin guardar?')) { return; }
    LISTA_SECCIONES.forEach(function (s) { estado.cambios[s] = false; }); estado.imagenes = {}; $('barra-guardar').hidden = true;
    cargarTodos().then(function () { elegirSeccion(estado.seccion); });
  });
  window.addEventListener('beforeunload', function (ev) { if (hayCambios()) { ev.preventDefault(); ev.returnValue = ''; } });

  var previo = leerAlmacen('sessionStorage') || leerAlmacen('localStorage');
  if (previo) { $('recordar').checked = !!leerAlmacen('localStorage'); ingresar(previo, !!leerAlmacen('localStorage')); }
})();
