/* IA y automatizaciones: casos por industria
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* "IA y automatizaciones": casos prácticos por industria (se muestran en pestañas).
     tipo: "IA", "Automatización" o "IA + WhatsApp" · flujo: los pasos que se ven debajo de cada caso */
  automatizacion: {
    pasos: ["Detectamos las tareas repetitivas en el relevamiento", "Las automatizamos en Odoo, con IA donde suma", "Medimos y ajustamos con tu equipo"],
    nota: "Algunos casos usan funciones de Odoo y otros, desarrollos de AXENTRA: lo definimos juntos según tu empresa.",
    industrias: [
      { nombre: "Comercio y distribución", icono: "i:tienda", color: "#ea580c", casos: [
        { tipo: "IA", titulo: "Facturas de proveedores sin tipear",
          hoy: "Alguien copia a mano cada factura de compra al sistema.",
          ahora: "La IA lee el PDF o la foto de la factura y deja el borrador cargado en Odoo, listo para revisar.",
          flujo: ["Llega la factura", "La IA lee los datos", "Borrador en Odoo", "Contabilidad aprueba"] },
        { tipo: "IA + WhatsApp", titulo: "Pedidos que llegan por WhatsApp",
          hoy: "Los pedidos se anotan en un cuaderno o se pierden en el chat.",
          ahora: "Un asistente toma el pedido por WhatsApp y lo deja como presupuesto en Odoo para que ventas lo confirme.",
          flujo: ["El cliente escribe", "El asistente arma el pedido", "Presupuesto en Odoo", "Ventas confirma"] },
        { tipo: "Automatización", titulo: "Reposición sin quiebres de stock",
          hoy: "Te enterás de que falta mercadería cuando el cliente la pide.",
          ahora: "Odoo avisa cuando un producto baja del mínimo y prepara la orden de compra sugerida.",
          flujo: ["Stock bajo el mínimo", "Aviso automático", "Orden sugerida", "Compras aprueba"] }
      ] },
      { nombre: "Manufactura", icono: "i:industria", color: "#7c5cff", casos: [
        { tipo: "Automatización", titulo: "Faltantes detectados antes de producir",
          hoy: "La producción se frena porque falta un insumo.",
          ahora: "Antes de lanzar una orden, Odoo revisa los materiales y avisa qué falta y cuándo llega.",
          flujo: ["Orden de producción", "Revisión de materiales", "Aviso de faltantes", "Compra a tiempo"] },
        { tipo: "IA", titulo: "Control de calidad con fotos",
          hoy: "Los controles quedan en papel y nadie los vuelve a mirar.",
          ahora: "El operario carga fotos y observaciones desde el celular y la IA resume las no conformidades de la semana.",
          flujo: ["Control en planta", "Fotos desde el celular", "Resumen con IA", "Acciones correctivas"] },
        { tipo: "Automatización", titulo: "Mantenimiento que no se olvida",
          hoy: "Las máquinas se revisan cuando se rompen.",
          ahora: "Odoo programa el mantenimiento preventivo por calendario o por horas de uso y avisa al responsable.",
          flujo: ["Horas de uso", "Mantenimiento programado", "Aviso al técnico", "Equipo al día"] }
      ] },
      { nombre: "Agro y ganadería", icono: "i:hoja", color: "#16a34a", casos: [
        { tipo: "IA + WhatsApp", titulo: "Registros desde el campo, por audio",
          hoy: "Lo que pasa en el campo llega días después, en una planilla.",
          ahora: "El encargado manda un audio por WhatsApp y la IA lo convierte en un registro en Odoo para que la oficina lo valide.",
          flujo: ["Audio desde el campo", "La IA lo transcribe", "Registro en Odoo", "La oficina valida"] },
        { tipo: "IA", titulo: "Comprobantes y remisiones escaneados",
          hoy: "Las remisiones y los comprobantes se acumulan en una carpeta.",
          ahora: "Se les saca una foto, la IA extrae los datos y quedan vinculados a la compra o a la venta.",
          flujo: ["Foto del comprobante", "La IA extrae los datos", "Vinculado en Odoo", "Archivo digital"] },
        { tipo: "Automatización", titulo: "Vencimientos que avisan solos",
          hoy: "Vacunas, contratos y documentos se controlan de memoria.",
          ahora: "Odoo avisa con anticipación cada vencimiento al responsable que corresponde.",
          flujo: ["Fecha cargada", "Aviso anticipado", "Tarea al responsable", "Vencimiento cubierto"] }
      ] },
      { nombre: "Servicios", icono: "i:maletin", color: "#0891b2", casos: [
        { tipo: "IA", titulo: "Reuniones que se convierten en tareas",
          hoy: "Lo que se acuerda en una reunión depende de quién tomó nota.",
          ahora: "La IA resume la reunión y crea las tareas en el proyecto, con responsable y fecha.",
          flujo: ["Reunión", "Resumen con IA", "Tareas en Odoo", "Seguimiento"] },
        { tipo: "IA", titulo: "Consultas respondidas más rápido",
          hoy: "Las mismas preguntas de los clientes se responden una y otra vez.",
          ahora: "La IA sugiere la respuesta según el historial del cliente y una persona la revisa antes de enviarla.",
          flujo: ["Consulta del cliente", "Respuesta sugerida", "Revisión del equipo", "Cliente atendido"] },
        { tipo: "Automatización", titulo: "Facturación recurrente",
          hoy: "Cada mes se arman a mano las mismas facturas.",
          ahora: "Los contratos mensuales generan la factura electrónica y el recordatorio de pago en la fecha que corresponde.",
          flujo: ["Contrato mensual", "Factura automática", "Envío al cliente", "Recordatorio si vence"] }
      ] },
      { nombre: "Salud y veterinarias", icono: "i:salud", color: "#db2777", casos: [
        { tipo: "Automatización", titulo: "Turnos con recordatorio",
          hoy: "Los pacientes se olvidan del turno y la agenda queda con huecos.",
          ahora: "Odoo envía el recordatorio por WhatsApp y el paciente confirma o reprograma.",
          flujo: ["Turno agendado", "Recordatorio por WhatsApp", "Confirma o reprograma", "Agenda al día"] },
        { tipo: "IA", titulo: "La consulta, transcripta",
          hoy: "El profesional escribe la ficha después de atender.",
          ahora: "La IA transcribe lo dictado durante la consulta y deja el borrador de la ficha para revisar.",
          flujo: ["Consulta", "Dictado", "Borrador de la ficha", "Revisión del profesional"] },
        { tipo: "Automatización", titulo: "Medicamentos sin vencer en el estante",
          hoy: "Los vencimientos se descubren cuando ya es tarde.",
          ahora: "Odoo controla lotes y vencimientos y avisa qué usar primero.",
          flujo: ["Lote con vencimiento", "Aviso anticipado", "Usar primero", "Menos pérdidas"] }
      ] },
      { nombre: "Administración", icono: "i:calculadora", color: "#0056ff", casos: [
        { tipo: "IA", titulo: "Rendición de gastos con una foto",
          hoy: "Los comprobantes se juntan en un sobre hasta fin de mes.",
          ahora: "Se saca una foto del comprobante, la IA completa el gasto y pasa a aprobación.",
          flujo: ["Foto del comprobante", "La IA completa el gasto", "Aprobación", "Asiento contable"] },
        { tipo: "Automatización", titulo: "Cobranzas que no se olvidan",
          hoy: "A los clientes atrasados se los llama cuando alguien se acuerda.",
          ahora: "Odoo envía recordatorios automáticos de las facturas vencidas, por correo o por WhatsApp.",
          flujo: ["Factura vencida", "Recordatorio automático", "Seguimiento", "Cobro"] },
        { tipo: "Automatización", titulo: "Indicadores que llegan solos",
          hoy: "Los reportes se arman a mano y llegan tarde.",
          ahora: "Tableros en tiempo real y un resumen semanal automático con lo más importante de la empresa.",
          flujo: ["Datos en Odoo", "Tablero en vivo", "Resumen semanal", "Decisiones a tiempo"] }
      ] }
    ]
  }
});
