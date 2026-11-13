/* Contacto (WhatsApp, correo, ciudad) y configuración de los carruseles
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  contacto: {
    whatsapp: "595985407809",            // número con código de país, sin + ni espacios (hoy: José, 0985 407 809)
    correo: "contacto@axentra-ai.com.py",
    ciudad: "Asunción, Paraguay",
    /* motivos del formulario de contacto: los botones de cada página llegan con ?motivo=<clave> y queda elegido */
    motivos: [
      { clave: "diagnostico", texto: "Un diagnóstico de mi empresa" },
      { clave: "implementacion", texto: "Implementar Odoo" },
      { clave: "consultoria", texto: "Consultoría y procesos" },
      { clave: "automatizacion", texto: "IA y automatizaciones" },
      { clave: "dnit", texto: "Normativa DNIT y SIFEN" },
      { clave: "arandu", texto: "Arandu AI" },
      { clave: "otro", texto: "Otra consulta" }
    ]
  },


  /* Carruseles: activo = se mueve solo (false = fila fija) · segundosPorElemento = velocidad
     (más segundos, más lento) · pausarAlPasarMouse = se frena con el mouse encima ·
     respetarAnimacionesApagadas = si la computadora del visitante tiene las animaciones apagadas, no se mueve */
  carrusel: {
    clientes:    { activo: true, segundosPorElemento: 7, pausarAlPasarMouse: true, respetarAnimacionesApagadas: false },
    testimonios: { activo: true, segundosPorElemento: 10, pausarAlPasarMouse: true, respetarAnimacionesApagadas: false },
    /* el equipo se muestra lado a lado con hasta "mostrarFijosHasta" personas; con más, pasa a ser un carrusel con flechas */
    equipo:      { activo: true, segundosPorElemento: 9, pausarAlPasarMouse: true, respetarAnimacionesApagadas: true, mostrarFijosHasta: 2 },
    /* los partners se muestran fijos con hasta "mostrarFijosHasta"; con más, pasan a ser un carrusel con flechas.
       modo "pasos": avanza de a una tarjeta entera (sin quedar cortada) cada "segundosPorElemento" */
    partners:    { activo: true, modo: "pasos", segundosPorElemento: 5, pausarAlPasarMouse: true, respetarAnimacionesApagadas: true, mostrarFijosHasta: 2 }
  }
});
