/* Portada: módulos y aplicaciones de la notebook
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* Portada: lista de módulos debajo de los botones y pantalla que se ve en la notebook */
  modulos: ["Contabilidad", "Facturación SIFEN", "Firma digital", "Inventario", "Ventas y CRM", "Nómina con IPS"],

  /* Pantalla de la notebook en la portada: la pantalla de inicio de Odoo con sus aplicaciones.
     propia: true = módulo de AXENTRA (se marca con un borde celeste) */
  appsPortada: [
    { nombre: "Contabilidad", icono: "assets/odoo-apps/contabilidad.svg" },
    { nombre: "Ventas", icono: "assets/odoo-apps/ventas.svg" },
    { nombre: "CRM", icono: "assets/odoo-apps/crm.svg" },
    { nombre: "Inventario", icono: "assets/odoo-apps/inventario.svg" },
    { nombre: "Compras", icono: "assets/odoo-apps/compras.svg" },
    { nombre: "Empleados", icono: "assets/odoo-apps/rrhh.svg" },
    { nombre: "Proyectos", icono: "assets/odoo-apps/proyectos.svg" },
    { nombre: "Documentos", icono: "assets/odoo-apps/documentos.svg" },
    { nombre: "Firma electrónica", icono: "assets/odoo-apps/firma-electronica.svg" },
    { nombre: "Punto de venta", icono: "assets/odoo-apps/punto-de-venta.svg" },
    { nombre: "Sitio web", icono: "assets/odoo-apps/sitio-web.svg" },
    { nombre: "IA", icono: "assets/odoo-apps/ia.svg" },
    { nombre: "Tributación PY", icono: "assets/axentra-x.png", propia: true },
    { nombre: "Nómina PY", icono: "assets/axentra-x.png", propia: true }
  ],


  /* Franja debajo de la portada: los 4 motivos principales */
  pilares: [
    { icono: "i:capas", titulo: "Todo en un solo sistema", texto: "Contabilidad, ventas, inventario, personal e indicadores, conectados." },
    { icono: "i:normativa", titulo: "Hecho para Paraguay", texto: "Normativa DNIT, SIFEN e IPS resueltos en Odoo." },
    { icono: "i:bi", titulo: "Con inteligencia artificial", texto: "Odoo trae IA integrada: te ayudamos a aprovecharla." },
    { icono: "i:soporte", titulo: "Acompañamiento local", texto: "Equipo paraguayo, de la implementación al soporte." }
  ]
});
