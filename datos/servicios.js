/* Servicios
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* tamano: "grande" (2 × 2, oscura), "ancho" (2 columnas) o vacío · visual: "chips", "barras" o "rubros" (opcional) */
  servicios: [
    { icono: "i:normativa", tamano: "grande", visual: "chips", titulo: "Normativa DNIT y SIFEN", enlace: "dnit-sifen.html", visible: true,
      texto: "Contabilidad, declaraciones, facturación electrónica e-Kuatia y firma digital en Odoo, según la normativa paraguaya.",
      chips: ["Plan de cuentas DNIT", "IVA 10 % y 5 %", "Formulario 120", "RG 90", "e-Kuatia", "KuDE con QR", "Firma digital"] },
    { icono: "i:personas", color: "#ea580c", titulo: "RRHH y nómina paraguaya", visible: true,
      texto: "Legajo digital, contratos, liquidación con IPS, recibos de sueldo, pagos por banco y asientos automáticos." },
    { icono: "i:industria", color: "#16a34a", visual: "rubros", titulo: "Soluciones para cada industria", visible: true,
      texto: "Profesionales de cada rubro adaptan Odoo a tu empresa.",
      chips: ["Comercio", "Distribución", "Manufactura", "Servicios", "Agro", "Salud", "Educación", "Construcción"] },
    { icono: "i:integraciones", color: "#7c5cff", titulo: "Desarrollos e integraciones", visible: true,
      texto: "Módulos a medida y conexión de Odoo con tus sistemas propios y otras plataformas." },
    { icono: "i:soporte", color: "#db2777", titulo: "Capacitación y soporte", visible: true,
      texto: "Manuales paso a paso, capacitación de tu equipo y soporte mensual para que Odoo acompañe el crecimiento." },
    { icono: "i:bi", color: "#0891b2", tamano: "ancho", visual: "tablero", titulo: "Inteligencia de negocios (BI)", visible: true,
      texto: "Tableros e indicadores en tiempo real y reportes a medida, para decidir con números." }
  ],

  /* tarjeta final de servicios, que invita a consultar */
  serviciosCierre: { titulo: "¿No ves lo que necesitás?", texto: "Contanos tu caso: si Odoo no lo trae, lo desarrollamos.", boton: "Contanos tu caso" }
});
