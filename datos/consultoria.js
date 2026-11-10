/* Consultoría: antes y después, método, entregables y ejemplos
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* Consultoría y análisis de procesos: los pasos del método y lo que se entrega por escrito */
  metodo: {
    /* "Antes y después": lo que solemos encontrar y lo que dejamos */
    antes: { titulo: "Lo que solemos encontrar", puntos: [
      "Cada área se maneja con sus propias planillas",
      "Procesos que solo conoce quien los hace",
      "Criterios de palabra, que cambian según a quién le preguntes",
      "Nadie tiene claro quién aprueba qué"
    ] },
    despues: { titulo: "Lo que te dejamos", puntos: [
      "Procesos escritos, con diagramas y responsables",
      "Cada criterio decidido, firmado y con fecha",
      "Quién hace qué y quién accede a qué",
      "Un solo sistema, con la información de todas las áreas"
    ] },
    pasos: [
      { titulo: "Relevamiento por área", texto: "Nos sentamos con cada gerencia y con quien hace el trabajo: cómo compra, vende, paga y controla tu empresa hoy." },
      { titulo: "Análisis de procesos", texto: "Cada circuito en una ficha con su diagrama: etapas, responsables, documentos, controles y mejoras." },
      { titulo: "Blueprint funcional", texto: "El diseño de cómo va a funcionar Odoo en tu empresa: qué resuelve el estándar y qué hay que desarrollar." },
      { titulo: "Configuración y pruebas", texto: "Configuramos y programamos sobre lo aprobado, con pruebas automáticas en cada cambio." },
      { titulo: "Prueba con tus datos", texto: "Validás cada circuito en una copia de tu empresa antes de usarlo de verdad." },
      { titulo: "Puesta en marcha y soporte", texto: "Capacitamos a tu equipo, te dejamos los manuales y te acompañamos cada mes." }
    ],
    entregables: [
      { icono: "i:plano", titulo: "Blueprint funcional", texto: "El documento central: cómo va a funcionar Odoo, circuito por circuito.", visible: true },
      { icono: "i:flujo", titulo: "Fichas de procesos con diagramas", texto: "Compras, inventario, ventas y pagos: flujo, responsables y controles.", visible: true },
      { icono: "i:organigrama", titulo: "Organigrama y matriz de usuarios", texto: "Quién hace qué y quién accede a qué en Odoo.", visible: true },
      { icono: "i:libro", titulo: "Plan de cuentas y mapeo DNIT", texto: "Tu plan de cuentas alineado al formato de estados financieros de la DNIT.", visible: true },
      { icono: "i:bitacora", titulo: "Bitácora de criterios", texto: "Cada decisión, con quién la tomó y cuándo. Nada queda de palabra.", visible: true },
      { icono: "i:calendario", titulo: "Cronograma de obligaciones DNIT", texto: "Los vencimientos fiscales de tu RUC, en un solo lugar.", visible: true },
      { icono: "i:pendientes", titulo: "Pendientes y dependencias", texto: "Qué falta y de quién depende, para que nada frene el proyecto.", visible: true },
      { icono: "i:acta", titulo: "Acta de conformidad por etapa", texto: "Cada etapa se cierra con tu firma antes de avanzar.", visible: true }
    ],
    /* Carrusel de ejemplos de entregables (datos demostrativos). tipo: "ficha" (usa fichaEjemplo), "indice", "tabla", "organigrama" o "acta" */
    ejemplos: [
      { tipo: "ficha", nombre: "Ficha de proceso", descripcion: "Cada circuito con su flujo, responsables y controles." },
      { tipo: "indice", nombre: "Blueprint funcional", descripcion: "El documento central del proyecto, capítulo por capítulo.",
        codigo: "BP", titulo: "Blueprint funcional", subtitulo: "Implementación de Odoo · Empresa Demo S.A.",
        datos: [["Versión", "1.0 · para firma"], ["Fecha", "10/11/2026"], ["Páginas", "16"]],
        items: [["1", "Objeto y alcance", "2"], ["2", "Organización y gobierno", "3"], ["3", "Circuitos: compras, ventas y pagos", "4"], ["4", "Estructura en Odoo", "9"],
                ["5", "Normativa DNIT y SIFEN", "12"], ["6", "Estándar de Odoo y desarrollos", "14"], ["7", "Plan de etapas y puesta en marcha", "15"]],
        firmas: ["Directorio", "AXENTRA AI Paraguay"] },
      { tipo: "organigrama", nombre: "Organigrama", descripcion: "Las áreas de la empresa y quién reporta a quién.",
        codigo: "B3", titulo: "Organigrama", subtitulo: "Estructura relevada con la Dirección", raiz: "Dirección general",
        ramas: [["Administración y Finanzas", ["Contabilidad", "Tesorería", "Recursos humanos"]], ["Operaciones", ["Compras", "Depósito", "Ventas"]]] },
      { tipo: "tabla", nombre: "Matriz de usuarios", descripcion: "Quién accede a qué en Odoo, área por área.",
        codigo: "B2", titulo: "Matriz de usuarios y permisos", subtitulo: "Acceso por aplicación de Odoo", seccion: "Permisos",
        columnas: ["Puesto", "Contab.", "Compras", "Ventas", "Invent.", "RRHH"],
        filas: [["Gerencia general", "Lee", "Lee", "Lee", "Lee", "Lee"], ["Contabilidad", "Admin", "Lee", "Lee", "Lee", "—"], ["Compras", "—", "Edita", "—", "Lee", "—"],
                ["Ventas", "—", "—", "Edita", "Lee", "—"], ["Depósito", "—", "Lee", "—", "Edita", "—"], ["Recursos humanos", "—", "—", "—", "—", "Admin"]],
        nota: "Cada usuario ve solo las empresas que le corresponden." },
      { tipo: "tabla", nombre: "Bitácora de criterios", descripcion: "Cada decisión, con quién la tomó y si sigue vigente.",
        codigo: "B4", titulo: "Bitácora de criterios", subtitulo: "Decisiones acordadas con cada gerencia", seccion: "Criterios",
        columnas: ["N.°", "Criterio", "Decidió", "Estado"],
        filas: [["CO-01", "Moneda extranjera a la cotización del día anterior", "Contabilidad", "Vigente"], ["CO-02", "No se paga sin recepción conforme", "Finanzas", "Vigente"],
                ["CM-01", "Toda compra con aprobación de la Dirección", "Dirección", "Vigente"], ["VE-01", "Plazos de pago: contado, 30 y 60 días", "Comercial", "Reemplazado"],
                ["VE-02", "Plazos de pago: contado, 30, 60 y 90 días", "Comercial", "Vigente"]],
        nota: "Lo que todavía depende de una decisión queda en la lista de pendientes." },
      { tipo: "tabla", nombre: "Cronograma DNIT", descripcion: "Las obligaciones fiscales de tu RUC, en un solo lugar.",
        codigo: "B6", titulo: "Cronograma de obligaciones", subtitulo: "Según la constancia de RUC de la empresa", seccion: "Obligaciones",
        columnas: ["Obligación", "Formulario", "Frecuencia", "Estado"],
        filas: [["IVA", "Formulario 120", "Mensual", "Presentado"], ["Registro de comprobantes", "RG 90", "Mensual", "Próximo"],
                ["IRE", "Formulario 500", "Anual", "Pendiente"], ["Estados financieros", "Formato DNIT", "Anual", "Pendiente"]],
        nota: "Vencimientos según la terminación del RUC." },
      { tipo: "acta", nombre: "Acta de conformidad", descripcion: "Cada etapa se cierra con tu firma antes de avanzar.",
        codigo: "AC-1", titulo: "Acta de conformidad · Etapa 1", subtitulo: "Relevamiento y diseño",
        texto: "La empresa recibe y aprueba los entregables de la Etapa 1:",
        items: ["Blueprint funcional", "Plan de cuentas y mapeo DNIT", "Organigrama y matriz de usuarios", "Bitácora de criterios", "Fichas de procesos", "Cronograma DNIT y pendientes"],
        firmas: ["Por la empresa", "Por AXENTRA AI Paraguay"] }
    ],
    /* ejemplo genérico de ficha de proceso (datos demostrativos, no de un cliente) */
    fichaEjemplo: {
      codigo: "CMP-01", titulo: "Compra de mercaderías", area: "Manual de procesos · Gerencia de Compras",
      dueno: "Gerencia de Compras", aprueba: "Dirección", version: "1.0 · para firma",
      flujo: ["Pedido", "Aprobación", "Orden de compra", "Recepción", "Factura", "Pago"],
      filas: [
        ["Aprobación", "Dirección", "Sin aprobación no se confirma la orden"],
        ["Recepción", "Depósito", "Cantidad y estado contra la orden"],
        ["Registro", "Contabilidad", "La factura coincide con la orden y la recepción"],
        ["Pago", "Finanzas", "Nunca sin recepción conforme"]
      ],
      enOdoo: "Orden de compra con aprobación, recepción en Inventario y pago con orden de pago."
    }
  }
});
