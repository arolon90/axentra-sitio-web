/*
  Pantallas de Odoo recreadas en HTML (modo claro, nítidas en cualquier tamaño).
  Reproducen las pantallas reales de los módulos de AXENTRA con DATOS DEMOSTRATIVOS.
  Cada función devuelve el HTML de una pantalla; se eligen desde datos/sitio.js con "tipo".
*/
window.PANTALLAS_ODOO = (function () {
  var g = function (n) { return n.toLocaleString('es-PY').replace(/,/g, '.') + ' ₲'; };
  var barra = function (app, menu) {
    return '<div class="ou-barra"><span class="ou-grilla"></span><b>' + app + '</b>' +
      menu.map(function (m) { return '<span>' + m + '</span>'; }).join('') + '<span class="ou-empresa">Empresa Demo</span></div>';
  };
  var insignia = function (texto, tipo) { return '<span class="ou-insignia ' + tipo + '">' + texto + '</span>'; };

  function pagos() {
    var grupos = [
      ['Banco Continental', [['Ana Duarte', '7890123', '0007-0007', 3640000, 0, '100002', 1], ['Miguel Ortiz', '6789012', '0006-0006', 5460000, 0, '100003', 1]]],
      ['Banco Itaú Paraguay', [['Luis Acosta', '5678901', '0005-0005', 3458000, 0, '100004', 1], ['Pedro Ejemplo', '1234567', '0001-0001', 3276000, 0, '', 0]]],
      ['Banco Nacional de Fomento', [['Carlos Benítez', '3456789', '0003-0003', 3185000, 0, '', 0], ['Juan Ejemplo', '2345678', '0002-0002', 5005000, 0, '', 0]]]
    ];
    var filas = grupos.map(function (gr) {
      var tot = gr[1].reduce(function (a, f) { return a + f[3] + f[4]; }, 0);
      return '<tr class="ou-grupo"><td colspan="2">▾ ' + gr[0] + ' <small>(' + gr[1].length + ')</small></td><td class="n">' + g(tot) + '</td><td colspan="2"></td></tr>' +
        gr[1].map(function (f) {
          return '<tr><td>' + f[0] + '</td><td>' + f[2] + '</td><td class="n"><b>' + g(f[3] + f[4]) + '</b></td><td>' + (f[5] || '') + '</td><td>' +
            (f[6] ? insignia('Pagado', 'verde') : insignia('Pendiente', 'naranja')) + '</td></tr>';
        }).join('');
    }).join('');
    return barra('Nómina', ['Tablero', 'Empleados', 'Recibos de nómina', 'Reportes']) +
      '<div class="ou-cabecera"><div><small>Periodos de nómina</small><h4>Pagos de sueldos</h4></div><div class="ou-buscador">' +
      '<span class="ou-filtro">Pendientes ×</span><span class="ou-filtro">Banco ×</span></div></div>' +
      '<table class="ou-tabla"><thead><tr><th>Funcionario</th><th>Cuenta</th><th class="n">A acreditar</th><th>N° op.</th><th>Estado</th></tr></thead><tbody>' +
      filas + '</tbody></table>';
  }

  function asiento() {
    var l = [['5.2.01.08 Sueldos y jornales de campo', 'Salario básico', 26400000, 0], ['2.1.03.02 IPS a pagar', 'IPS obrero', 0, 2376000],
      ['2.1.03.01 Sueldos y jornales a pagar', 'Salario neto', 0, 24024000], ['5.2.01.09 Aporte patronal IPS', 'IPS patronal', 4356000, 0], ['2.1.03.02 IPS a pagar', 'IPS patronal', 0, 4356000]];
    return barra('Contabilidad', ['Tablero', 'Clientes', 'Proveedores', 'Contabilidad']) +
      '<div class="ou-cabecera"><div><small>Asientos contables</small><h4>SUEL/2026/10/0001</h4></div><div class="ou-estados"><span>Borrador</span><span class="activo">Registrado</span></div></div>' +
      '<div class="ou-ficha"><div class="ou-campos"><p><label>Referencia</label>Sueldos octubre 2026</p><p><label>Fecha contable</label>31/10/2026</p><p><label>Diario</label>Sueldos</p></div>' +
      '<table class="ou-tabla"><thead><tr><th>Cuenta</th><th>Descripción</th><th class="n">Débito</th><th class="n">Crédito</th></tr></thead><tbody>' +
      l.map(function (f) { return '<tr><td>' + f[0] + '</td><td>' + f[1] + '</td><td class="n">' + (f[2] ? g(f[2]) : '') + '</td><td class="n">' + (f[3] ? g(f[3]) : '') + '</td></tr>'; }).join('') +
      '<tr class="ou-total"><td colspan="2"></td><td class="n">' + g(30756000) + '</td><td class="n">' + g(30756000) + '</td></tr></tbody></table></div>';
  }

  function lote() {
    var f = [['Ana Duarte', 4000000, 3640000, 4660000], ['Carlos Benítez', 3500000, 3185000, 4077500], ['Juan Ejemplo', 5500000, 5005000, 6407500], ['Luis Acosta', 3800000, 3458000, 4427000], ['Miguel Ortiz', 6000000, 5460000, 6990000], ['Pedro Ejemplo', 3600000, 3276000, 4194000]];
    return barra('Nómina', ['Tablero', 'Empleados', 'Recibos de nómina', 'Reportes']) +
      '<div class="ou-cabecera"><div><small>Recibos de nómina</small><h4>Octubre 2026 · Mensualero Paraguay</h4></div><div><span class="ou-boton">Preparar pagos</span></div></div>' +
      '<table class="ou-tabla"><thead><tr><th>Empleado</th><th class="n">Días</th><th class="n">Salario básico</th><th class="n">Salario neto</th><th class="n">Costo total</th><th>Estado</th></tr></thead><tbody>' +
      f.map(function (r) { return '<tr><td><i class="ou-avatar">' + r[0].charAt(0) + '</i>' + r[0] + '</td><td class="n">22</td><td class="n">' + g(r[1]) + '</td><td class="n">' + g(r[2]) + '</td><td class="n">' + g(r[3]) + '</td><td>' + insignia('Hecho', 'verde') + '</td></tr>'; }).join('') +
      '<tr class="ou-total"><td>6 funcionarios</td><td></td><td class="n">' + g(26400000) + '</td><td class="n">' + g(24024000) + '</td><td class="n">' + g(30756000) + '</td><td></td></tr></tbody></table>';
  }

  function ficha() {
    var campo = function (e, v) { return '<p><label>' + e + '</label>' + v + '</p>'; };
    return barra('Empleados', ['Empleados', 'Departamentos', 'Reportes', 'Configuración']) +
      '<div class="ou-ficha"><div class="ou-persona"><i class="ou-foto">J</i><div><h4>Juan Ejemplo</h4><small>Capataz · Empresa Demo S.A.</small></div>' +
      '<div class="ou-botones"><span>Recibos 1</span><span>Legajo 3 ✓</span></div></div>' +
      '<div class="ou-pestanas"><span>Nómina</span><span>Trabajo</span><span class="activa">Personal</span><span>Legajo Paraguay</span></div>' +
      '<div class="ou-columnas"><div>' + campo('Teléfono de contacto 1', '(0982)456 789') + campo('Cuentas bancarias', '<span class="ou-chip">0002-0002 · Banco Nacional de Fomento</span> ' + insignia('Confiable', 'verde')) +
      campo('Nacionalidad', 'Paraguay') + campo('Número de cédula de identidad', '2.345.678') + '</div><div>' +
      campo('Fecha de nacimiento', '20/07/1985') + campo('Edad', '41') + campo('Género de nacimiento', 'Masculino') + campo('Estado civil', 'Casado(a)') + '</div></div></div>';
  }

  return { pagos: pagos, asiento: asiento, lote: lote, ficha: ficha };
})();
