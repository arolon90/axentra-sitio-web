/* Inicio: "¿Qué hacemos?" — una tarjeta por página, en el orden del menú
   Parte de la configuración de la página (ver LEEME.md). pagina = id de datos/menu.js · url (opcional) = enlace a una parte de la página */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  queHacemos: {
    titulo: "Todo lo que tu empresa necesita para trabajar con <em>Odoo</em>",
    texto: "Elegí por dónde empezar: cada tema tiene su página con el detalle.",
    tarjetas: [
      { pagina: "odoo", icono: "i:capas", color: "#714b67", titulo: "¿Qué es Odoo?",
        texto: "Un solo sistema para todas las áreas: contabilidad, ventas, inventario, RRHH y más, conectadas entre sí." },
      { pagina: "arandu", icono: "i:microfono", color: "#7c5cff", titulo: "Arandu AI",
        texto: "Nuestro asistente de inteligencia artificial escucha las entrevistas, las transcribe y ordena lo que nos cuenta tu equipo." },
      { pagina: "consultoria", icono: "i:diagnostico", color: "#0056ff", titulo: "Consultoría y procesos",
        texto: "Primero entendemos cómo trabaja tu empresa y dejamos sus procesos por escrito. Después configuramos Odoo." },
      { pagina: "automatizacion", icono: "i:rayo", color: "#16a34a", titulo: "IA y automatización",
        texto: "Lo que hoy se carga a mano o depende de que alguien se acuerde, pasa a hacerse solo." },
      { pagina: "implementacion", icono: "i:soporte", color: "#db2777", titulo: "Implementaciones y soporte",
        texto: "Implementamos Odoo, desarrollamos lo que haga falta, capacitamos a tu equipo y te acompañamos después." },
      { pagina: "implementacion", url: "implementacion.html#normativa", icono: "i:normativa", color: "#0891b2", titulo: "DNIT y SIFEN",
        texto: "Contabilidad y factura electrónica SIFEN listas para la DNIT, con firma digital. Facturás y declarás en regla desde el primer día." }
    ]
  }
});
