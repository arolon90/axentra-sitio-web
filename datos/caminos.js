/* "Identificá tu camino": según dónde está la empresa hoy
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* "Identificá tu camino": según dónde está la empresa hoy */
  caminos: [
    { icono: "i:diagnostico", color: "#0056ff", titulo: "Quiero un diagnóstico antes de decidir", destacado: true, cinta: "Recomendado para empezar",
      texto: "Una consultoría para conocer tu empresa a fondo. Relevamos cada área con sus responsables y te entregamos el diagnóstico por escrito:",
      puntos: ["Tus procesos documentados, con diagramas", "Qué resuelve Odoo tal cual y qué hay que desarrollar", "Qué hace falta para cumplir con la DNIT", "Plan por etapas, con plazos y prioridades"],
      enlace: { texto: "Ver cómo lo hacemos →", destino: "#como-trabajamos" },
      boton: "Pedir un diagnóstico" },
    { icono: "i:despegue", color: "#0891b2", titulo: "Quiero empezar con Odoo",
      texto: "Todavía usás planillas u otro sistema. Configuramos Odoo a tu medida, migramos tus datos y capacitamos a tu equipo.",
      boton: "Empezar con Odoo" },
    { icono: "i:normativa", color: "#7c5cff", titulo: "Ya uso Odoo, pero no cumple con la DNIT",
      texto: "Odoo no trae la normativa de Paraguay. La integramos a tu Odoo actual, sin empezar de cero y sin perder tu historial.",
      enlace: { texto: "Ver qué incluye →", destino: "#normativa" },
      boton: "Integrar la DNIT" },
    { icono: "i:crecer", color: "#16a34a", titulo: "Quiero crecer y sumar módulos",
      texto: "Necesitás nuevas áreas, desarrollos a medida o integraciones con otros sistemas. Lo planificamos con vos.",
      boton: "Planificar el crecimiento" }
  ]
});
