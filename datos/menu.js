/* Menú, pie de página y recorrido entre páginas
   Parte de la configuración de la página (ver LEEME.md).
   El encabezado y el pie se arman desde acá en TODAS las páginas: se cambia una vez y se ve en todas. */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* Páginas del sitio: id (el mismo que data-pagina en cada .html), archivo y nombre.
     El orden de esta lista es el recorrido "Siguiente →" al final de cada página. */
  paginas: [
    { id: "inicio",         url: "index.html",          nombre: "Inicio" },
    { id: "odoo",           url: "odoo.html",           nombre: "¿Qué es Odoo?" },
    { id: "arandu",         url: "arandu-ai.html",      nombre: "Arandu AI" },
    { id: "consultoria",    url: "consultoria.html",    nombre: "Consultoría y procesos" },
    { id: "automatizacion", url: "automatizacion.html", nombre: "IA y automatización" },
    { id: "implementacion", url: "implementacion.html", nombre: "Implementaciones y soporte" },
    { id: "equipo",         url: "equipo.html",         nombre: "Nuestro equipo" },
    { id: "contacto",       url: "contacto.html",       nombre: "Contacto" }
  ],

  /* Menú de arriba, en este orden. "sub" arma un desplegable. */
  menu: {
    opciones: [
      { pagina: "odoo" },
      { pagina: "arandu" },
      { texto: "Servicios", sub: ["consultoria", "automatizacion", "implementacion"] },
      { pagina: "equipo" }
    ],
    boton: { texto: "Contactanos", pagina: "contacto" }
  },

  /* Pie de página: columnas con enlaces (pagina = id de arriba · url = enlace directo) */
  pie: {
    texto: "Consultoría de procesos e implementación de Odoo para empresas paraguayas: relevamiento, normativa DNIT, inteligencia artificial y soporte.",
    columnas: [
      { titulo: "Conocé", enlaces: [{ pagina: "odoo" }, { pagina: "arandu" }, { texto: "Preguntas frecuentes", url: "contacto.html#preguntas" }] },
      { titulo: "Servicios", enlaces: [{ pagina: "consultoria" }, { pagina: "automatizacion" }, { pagina: "implementacion" }, { texto: "Normativa DNIT y SIFEN", url: "implementacion.html#normativa" }] },
      { titulo: "La empresa", enlaces: [{ texto: "Clientes", url: "index.html#clientes" }, { pagina: "equipo" }] }
    ]
  }
});
