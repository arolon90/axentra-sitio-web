/* Equipo: personas y lo que nos define
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* EQUIPO: para sumar a alguien, copiar un bloque { ... } completo, pegarlo debajo y cambiar los datos.
     foto: ruta de la foto en assets/equipo/ (vertical, idealmente 400 × 500). Si se deja "", se muestran las iniciales.
     cv: hasta 5 líneas por persona · especialidad (opcional): línea final · visible: false lo oculta sin borrarlo.
     Con más de 2 personas visibles, la fila pasa a ser un carrusel (ver carrusel.equipo). */
  equipo: [
    { nombre: "Dr. José O. Samaniego G.", rol: "Fundador y Representante legal · AXENTRA AI Paraguay", iniciales: "JS", color: "#0891b2", foto: "assets/equipo/jose.jpg", visible: true,
      correo: "jsamaniego@axentra-ai.com.py",
      cv: [
        "Doctor en Administración de Empresas; cursa la Licenciatura en Inteligencia Artificial y Robótica.",
        "Amplia trayectoria como consultor en procesos y gestión empresarial para empresas e instituciones.",
        "Lidera las implementaciones de Odoo: relevamiento de procesos, parametrización multiempresa y capacitación.",
        "Ocho años en sistemas y gestión de datos en el sector salud.",
        "Más de diez años coordinando proyectos, equipos y procesos institucionales; docente universitario."
      ] },
    { nombre: "Mgtr. Alcides C. Rolón F.", rol: "Co-Fundador y Socio · AXENTRA AI Paraguay", especialidad: "Especialista en Datos, Inteligencia de Negocios con más de 12 años de experiencia", iniciales: "AR", color: "#0056ff", foto: "assets/equipo/alcides.jpg", visible: true,
      correo: "arolon@axentra-ai.com.py",
      cv: [
        "Licenciado en Ciencias Informáticas con énfasis en Análisis de Sistemas y Máster en Administración y Dirección de Empresas.",
        "Lidera las implementaciones de Odoo: relevamiento de procesos, parametrización multiempresa y capacitación.",
        "Desarrolla chatbots con inteligencia artificial en modalidad SaaS."
      ] }
  ],


  /* Lo que nos define (se muestra junto al equipo) */
  equipoValores: [
    { titulo: "Entendemos tu empresa", texto: "Relevamos cada área con quien hace el trabajo, para saber cómo funciona de verdad." },
    { titulo: "Definimos procesos y estructura", texto: "Circuitos, responsables, organigrama y permisos: claros y acordados con cada gerencia." },
    { titulo: "Todo por escrito y firmado", texto: "Fichas de procesos, bitácora de criterios y actas: nada queda de palabra." },
    { titulo: "Recién ahí, Odoo", texto: "Configuramos sobre procesos ya definidos y probamos antes de cada cambio." }
  ]
});
