/* Clientes, partners y testimonios
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* CLIENTES: cada tarjeta muestra el logo y tres líneas de texto.
     nombre = título · rubro = subtítulo · detalle = tercera línea (opcional, por ejemplo "Parte de Grupo Noroda").
     Si "logo" se deja "", se muestran las iniciales con el color indicado. visible: false lo oculta sin borrarlo. */
  clientes: [
    { orden: 1, nombre: "Grupo Noroda", rubro: "Agroganadero", detalle: "", iniciales: "GN", color: "#6d6e70", logo: "assets/clientes/grupo-noroda.png", visible: true },
    { orden: 2, nombre: "Noroda Agroganadera", rubro: "Ganadería", detalle: "Parte de Grupo Noroda", iniciales: "N", color: "#2f3b2f", logo: "assets/clientes/noroda-agroganadera.png", visible: true },
    { orden: 3, nombre: "Los Árboles Agroganadera", rubro: "Ganadería", detalle: "Parte de Grupo Noroda", iniciales: "LA", color: "#1f4d33", logo: "assets/clientes/los-arboles.png", visible: true },
    { orden: 4, nombre: "Dino Labs EAS", rubro: "Tecnología · WhatsApp API e IA", detalle: "", iniciales: "DL", color: "#0056ff", logo: "assets/clientes/dino-labs.png", visible: true },
    { orden: 5, nombre: "Veterinaria Petlliwood", rubro: "Salud animal", detalle: "", iniciales: "PW", color: "#111111", logo: "assets/clientes/veterinaria-pw.png", visible: true }
  ],

  /* PARTNERS: se muestran en la tarjeta de abajo de la portada, en este orden.
     nombre = título · etiqueta = cápsula de color · descripcion = texto corto · enlace = página del partner (se abre en otra pestaña).
     Con más de 2 visibles, la fila pasa a ser un carrusel (ver carrusel.partners en general.js). visible: false lo oculta sin borrarlo. */
  partners: [
    {
      orden: 1,
      nombre: "Odoo",
      etiqueta: "Odoo Official Partner",
      descripcion: "Implementación, licencias y soporte del ERP",
      color: "#714b67",
      logo: "assets/partners/odoo.svg",
      enlace: "https://www.odoo.com/es",
      visible: true
    },
    {
      orden: 2,
      nombre: "Code100",
      etiqueta: "Partner de firma digital",
      descripcion: "Firma digital y electrónica para la facturación electrónica",
      color: "#0891b2",
      logo: "assets/partners/code100.png",
      enlace: "https://code100.com.py/",
      visible: true
    },
    {
      nombre: "BG Abogados",
      etiqueta: "Partner",
      descripcion: "Asesoría Jurídica",
      color: "#0056ff",
      logo: "assets/partners/bg-abogados-mwgp2cxd.png",
      enlace: "www.bgabogados.com.py",
      visible: true,
      orden: 3
    }
  ],

  /* Textos de las secciones (también se editan desde el panel).
     En los títulos, la palabra entre asteriscos va resaltada: "Confían en *nosotros*".
     En el subtítulo de partners, {partners} se reemplaza por los nombres de los partners visibles. */
  clientesTexto: { etiqueta: "Clientes", titulo: "Confían en *nosotros*", subtitulo: "Empresas de distintos rubros que ya trabajan con Odoo de la mano de AXENTRA." },

  partnersTexto: { titulo: "Nuestros partners", subtitulo: "Trabajamos de la mano de {partners} para implementar tu sistema de gestión y tu facturación electrónica en Paraguay." },

  /* Testimonios: ocultos hasta tener frases reales (visible: true para mostrarlos) */
  testimonios: [
    { visible: false, texto: "Texto de ejemplo: reemplazar por una frase real del cliente sobre cómo le cambió el trabajo con Odoo.", nombre: "Nombre Apellido", cargo: "Cargo · Grupo Noroda" },
    { visible: false, texto: "Texto de ejemplo: reemplazar por una frase real del cliente.", nombre: "Nombre Apellido", cargo: "Cargo · Dino Labs EAS" },
    { visible: false, texto: "Texto de ejemplo: reemplazar por una frase real del cliente.", nombre: "Nombre Apellido", cargo: "Cargo · Veterinaria Petlliwood" }
  ]
});
