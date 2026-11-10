/* Arandu AI: textos, capacidades y pantallas de ejemplo
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* Asistente de inteligencia artificial propio de AXENTRA (el nombre se cambia acá) */
  asistente: {
    visible: true,
    nombre: "Arandu AI",
    significado: "arandu es «sabiduría» en guaraní",
    logo: "assets/arandu/avatar.png",   /* foto de perfil de Arandu AI (la cabeza del robot) */
    /* video en loop de Arandu AI trabajando (se muestra en su presentación y en Equipo).
       video = MP4 (obligatorio) · videoWebm = versión más liviana (opcional) · videoPoster = imagen mientras carga.
       video vacío ("") = en Equipo se muestra el espacio reservado y en la presentación no hay video. */
    video: "assets/arandu/arandu-ai-loop.mp4",
    videoWebm: "assets/arandu/arandu-ai-loop.webm",
    videoPoster: "assets/arandu/arandu-ai-poster.jpg",
    texto: "Lo desarrollamos nosotros para el trabajo de relevamiento: escucha, transcribe y ordena lo que nos cuenta tu equipo. Así llegamos más rápido a los documentos y cumplimos los plazos, sin perder ningún detalle.",
    capacidades: [
      { icono: "i:microfono", titulo: "Transcribe cada entrevista", texto: "Las reuniones de relevamiento quedan escritas, con quién dijo qué." },
      { icono: "i:capas", titulo: "Ordena lo relevado en procesos", texto: "Arma el borrador de cada ficha: etapas, responsables, documentos y controles." },
      { icono: "i:balanza", titulo: "Detecta decisiones y diferencias", texto: "Si dos áreas hacen lo mismo de forma distinta, lo marca para resolverlo con vos." },
      { icono: "i:reloj", titulo: "Sigue los pendientes", texto: "Qué falta, de quién depende y para cuándo, para llegar a tiempo." }
    ],
    nota: "Ayuda a nuestro equipo, no lo reemplaza: cada documento lo revisa y valida una persona, y las reuniones se graban solo con tu autorización.",
    /* pantalla de ejemplo (datos demostrativos) */
    /* pantallas de ejemplo de la aplicación (datos demostrativos):
       1) grabación con transcripción en vivo · 2) inicio con las grabaciones agrupadas por persona */
    /* Pantallas de ejemplo de la aplicación (datos demostrativos). Cuentan la metodología:
       1) grabamos la entrevista del día · 2) bitácora día por día, persona por persona
       3) relacionamos las áreas · 4) resumimos por gerencia */
    demo: {
      sesion: { persona: "Carlos Benítez", area: "Gerencia de Compras", color: "#ea580c", dia: "Lunes 3 de noviembre · Sesión 1", segundos: 2538 },
      chat: [
        { tipo: "pregunta", texto: "Contame cómo es una compra, desde que alguien la pide." },
        { tipo: "audio", quien: "Carlos · Compras", dur: "3:12", texto: "El depósito nos manda el pedido, lo ve el director y recién ahí pedimos cotización…" },
        { tipo: "ia", texto: "Toda compra la aprueba la Dirección antes de cotizar. Lo anoto como paso de aprobación.", ref: "Ficha CMP-01 · Paso 2" },
        { tipo: "pregunta", texto: "¿Hay un monto a partir del cual hace falta esa aprobación?" },
        { tipo: "audio", quien: "Carlos · Compras", dur: "0:48", texto: "Eso lo decide el director, no está escrito en ningún lado…" },
        { tipo: "ia", texto: "No hay un monto definido. Lo dejo como pregunta pendiente para volver a consultar.", ref: "Pendiente P-01", pendiente: true }
      ],
      bitacora: [
        { dia: "Lun 3/11", persona: "Carlos Benítez", area: "Compras", color: "#ea580c", sesion: "Sesión 1 · 42 min", entradas: [
          { tipo: "audio", dur: "42:18", texto: "Entrevista completa" },
          { tipo: "ia", texto: "Circuito de compra en 6 pasos: la Dirección aprueba antes de cotizar." },
          { tipo: "pendiente", texto: "¿Desde qué monto hace falta la aprobación?" } ] },
        { dia: "Mar 4/11", persona: "Ana Duarte", area: "Depósito", color: "#7c5cff", sesion: "Sesión 1 · 31 min", entradas: [
          { tipo: "audio", dur: "7:05", texto: "Recepción de mercadería · escuchado completo" },
          { tipo: "ia", texto: "Controla contra la remisión, no contra la orden de compra: no coincide con lo que contó Compras." },
          { tipo: "pregunta", texto: "¿Quién registra la diferencia cuando falta mercadería?" } ] },
        { dia: "Mié 5/11", persona: "Luis Acosta", area: "Contabilidad", color: "#16a34a", sesion: "Sesión 1 · 36 min", entradas: [
          { tipo: "audio", dur: "36:40", texto: "Cierre del mes" },
          { tipo: "ia", texto: "Recibe planillas de 4 áreas a fin de mes: candidato a automatizar." } ] },
        { dia: "Jue 6/11", persona: "Carlos Benítez", area: "Compras", color: "#ea580c", sesion: "Se lo vuelve a convocar · 12 min", reconvocado: true, entradas: [
          { tipo: "audio", dur: "12:05", texto: "Preguntas pendientes" },
          { tipo: "resuelto", texto: "Monto de aprobación definido con la Dirección. P-01 resuelta." } ] }
      ],
      areas: [
        { id: "dir", nombre: "Dirección", color: "#001f40", x: 50, y: 4 },
        { id: "com", nombre: "Compras", color: "#ea580c", x: 10, y: 34 },
        { id: "fin", nombre: "Finanzas", color: "#db2777", x: 50, y: 52 },
        { id: "con", nombre: "Contabilidad", color: "#16a34a", x: 90, y: 34 },
        { id: "dep", nombre: "Depósito", color: "#7c5cff", x: 16, y: 90 },
        { id: "ven", nombre: "Ventas", color: "#0891b2", x: 84, y: 90 }
      ],
      vinculos: [["dir", "com", 3, "Aprobación"], ["com", "dep", 5, "Remisión"], ["com", "con", 4, "Facturas"], ["dep", "con", 2, "Planillas"],
                 ["ven", "con", 4, "Ventas"], ["con", "fin", 3, "Pagos"], ["dir", "fin", 2, "Orden de pago"], ["ven", "dep", 3, "Despacho"]],
      /* pantalla 3: grafo de lo relevado. Cada gerencia es un centro; cada tema surge de las entrevistas.
         Un tema con más de una gerencia es un punto de unión entre áreas. */
      grafo: {
        gerencias: [
          { id: "dir", nombre: "Dirección", color: "#0891b2", x: 180, y: 52 },
          { id: "com", nombre: "Compras", color: "#ea580c", x: 92, y: 150 },
          { id: "con", nombre: "Contabilidad", color: "#16a34a", x: 268, y: 150 },
          { id: "dep", nombre: "Depósito", color: "#7c3aed", x: 180, y: 252 }
        ],
        temas: [
          ["Pedido de compra", "com"], ["Cotizaciones", "com"], ["Orden de compra", "com"], ["Proveedores", "com"], ["Precio tope", "com"],
          ["Condiciones de pago", "com"], ["Flete", "com"], ["Descuentos", "com"],
          ["Recepción", "dep"], ["Nota de remisión", "dep"], ["Stock mínimo", "dep"], ["Inventario mensual", "dep"], ["Ubicaciones", "dep"],
          ["Despacho", "dep"], ["Faltantes", "dep"],
          ["Plan de cuentas", "con"], ["Libro IVA", "con"], ["Formulario 120", "con"], ["Asientos", "con"], ["Cierre del mes", "con"],
          ["Retenciones", "con"], ["RG 90", "con"], ["Planillas por área", "con"],
          ["Montos de aprobación", "dir"], ["Presupuesto anual", "dir"], ["Reemplazos", "dir"], ["Indicadores", "dir"],
          ["Factura del proveedor", "com con", 208, 118], ["Recepción conforme", "com dep", 110, 214], ["Orden de pago", "dir con", 240, 92], ["Aprobación de compras", "dir com", 116, 90],
          ["Costo de mercadería", "dep con", 250, 214], ["Presupuesto de compras", "dir com", 138, 128],
          ["Diferencias de mercadería", "com dep con", 198, 188], ["Pago a proveedores", "dir com con", 166, 158]
        ]
      },
      gerencias: [
        { nombre: "Compras", color: "#ea580c", entrevistas: 2, minutos: 54 },
        { nombre: "Ventas", color: "#0891b2", entrevistas: 1, minutos: 40 },
        { nombre: "Contabilidad", color: "#16a34a", entrevistas: 1, minutos: 36 },
        { nombre: "Dirección", color: "#001f40", entrevistas: 1, minutos: 35 },
        { nombre: "Depósito", color: "#7c5cff", entrevistas: 1, minutos: 31 },
        { nombre: "Finanzas", color: "#db2777", entrevistas: 1, minutos: 30 }
      ],
      procesos: 12,
      hallazgos: [
        "Compras y Depósito controlan la mercadería de forma distinta: se unifica en una sola ficha.",
        "Contabilidad recibe datos de 4 áreas por planilla: candidato a automatizar.",
        "Dirección aprueba en 2 circuitos: definir montos y reemplazos."
      ],
      pasos: [
        ["Grabar", "Grabamos cada entrevista y la IA interpreta lo que cuenta cada persona."],
        ["Bitácora", "Día por día, persona por persona: lo que queda pendiente se vuelve a consultar."],
        ["Relacionar", "Unimos todas las entrevistas para ver cómo se relacionan las áreas."],
        ["Resumir", "Resumimos la participación de cada gerencia y lo que encontramos."]
      ]
    }
  }
});
