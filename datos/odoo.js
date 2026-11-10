/* ¿Qué es Odoo?: áreas, recorrido de una venta y pantallas de ejemplo
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* "¿Qué es Odoo?": áreas y aplicaciones, cada una con su beneficio en pocas palabras.
     icono: el ícono de Odoo que va en el título del área */
  areas: [
    { nombre: "Finanzas", icono: "assets/odoo-apps/contabilidad.svg", color: "#0056ff", visible: true, apps: [
      ["Contabilidad", "con la normativa de la DNIT"], ["Facturación electrónica", "integrada con SIFEN"],
      ["Gastos", "rendiciones en pocos clics"], ["Firma electrónica", "contratos firmados sin papel"] ] },
    { nombre: "Ventas", icono: "assets/odoo-apps/ventas.svg", color: "#00a3c4", visible: true, apps: [
      ["CRM", "cada oportunidad, a la vista"], ["Ventas", "presupuesto, firma y cobro"],
      ["Punto de venta", "vendé con o sin conexión"], ["Suscripciones", "cobros recurrentes automáticos"] ] },
    { nombre: "Cadena de suministro", icono: "assets/odoo-apps/inventario.svg", color: "#1f7a4d", visible: true, apps: [
      ["Inventario", "stock y depósitos al día"], ["Compras", "pedidos y proveedores ordenados"],
      ["Manufactura", "producción planificada"], ["Mantenimiento", "equipos al día, sin sorpresas"] ] },
    { nombre: "Recursos humanos", icono: "assets/odoo-apps/rrhh.svg", color: "#c2410c", visible: true, apps: [
      ["Empleados", "legajo digital completo"], ["Nómina", "sueldos con IPS y recibos"],
      ["Vacaciones", "pedidos y saldos de días"], ["Reclutamiento", "de la búsqueda a la contratación"] ] },
    { nombre: "Sitios web y marketing", icono: "assets/odoo-apps/sitio-web.svg", color: "#714b67", visible: true, apps: [
      ["Sitio web", "tu página, conectada al sistema"], ["Comercio electrónico", "vendé por internet"],
      ["WhatsApp", "mensajes desde Odoo"], ["Marketing por correo", "campañas a tus clientes"] ] },
    { nombre: "Productividad", icono: "assets/odoo-apps/proyectos.svg", color: "#001f40", visible: true, apps: [
      ["Proyectos", "tareas y plazos del equipo"], ["Documentos", "adiós al exceso de papel"],
      ["Inteligencia artificial", "respuestas y textos al instante"], ["Tableros e indicadores", "inteligencia de negocios en vivo"] ] }
  ],


  /* "¿Qué es Odoo?": el recorrido de una venta, de una aplicación a otra */
  odooFlujo: {
    titulo: "Una venta, de punta a punta",
    pasos: [
      { icono: "assets/odoo-apps/ventas.svg", app: "Ventas", color: "#e8590c", texto: "Se confirma la venta al cliente." },
      { icono: "assets/odoo-apps/inventario.svg", app: "Inventario", color: "#7c5cff", texto: "El stock se descuenta solo, en el depósito que corresponde." },
      { icono: "i:normativa", app: "Factura SIFEN", color: "#0056ff", texto: "Se emite la factura electrónica y la DNIT la aprueba." },
      { icono: "assets/odoo-apps/contabilidad.svg", app: "Contabilidad", color: "#16a34a", texto: "El asiento se registra solo, con las cuentas del plan DNIT." },
      { icono: "i:bi", app: "Tableros", color: "#0891b2", texto: "Lo ves al instante en tus indicadores. Sin cargar nada dos veces." }
    ]
  },


  /* "Así se ve en Odoo": pantallas de Odoo recreadas en modo claro con datos demostrativos.
     tipo: "pagos", "asiento", "lote" o "ficha" (ver assets/pantallas-odoo.js); o bien imagen: ruta de una captura.
     lado: "izquierda" o "derecha" (dónde va la pantalla) */
  pantallas: [
    { titulo: "Los sueldos se pagan por banco", etiqueta: "Nómina y pagos", tipo: "pagos", lado: "izquierda", visible: true,
      texto: "Quien hace las transferencias ve a cada funcionario agrupado por su banco, con el monto a acreditar. Las va marcando una por una con el N° de operación y el comprobante.",
      puntos: ["Subtotal por banco y pendientes a la vista", "Solo se paga a cuentas verificadas", "Planilla de pago en PDF y Excel"] },
    { titulo: "La contabilidad se hace sola", etiqueta: "Asientos automáticos", tipo: "asiento", lado: "derecha", visible: true,
      texto: "Al validar la nómina, Odoo genera el asiento con las cuentas del plan de la DNIT: sueldos, aporte patronal, IPS a pagar y sueldos a pagar.",
      puntos: ["Sin cargar asientos a mano", "IPS obrero y patronal separados", "Un asiento por cada lote de nómina"] },
    { titulo: "La liquidación del mes, en una pantalla", etiqueta: "Lote de nómina", tipo: "lote", lado: "izquierda", visible: true,
      texto: "Todos los recibos del mes en un solo lote: días trabajados, salario, IPS y neto de cada funcionario, con avisos si algo no cuadra.",
      puntos: ["IPS 9 % y 16,5 % como parámetros con fecha", "Costo total de cada funcionario para la empresa", "Recibo de sueldo con original y duplicado"] },
    { titulo: "El legajo de cada funcionario, completo", etiqueta: "Recursos humanos", tipo: "ficha", lado: "izquierda", visible: true,
      texto: "Datos personales, contrato, cuenta bancaria, IPS, REOP, hijos y documentos en PDF, con los campos que usa una empresa paraguaya.",
      puntos: ["Teléfonos con formato paraguayo y edad calculada", "Cuentas bancarias de la lista de bancos", "Documentos del legajo en PDF"] }
  ]
});
