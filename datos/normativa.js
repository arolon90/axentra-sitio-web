/* Normativa DNIT y SIFEN: frentes y factura de ejemplo
   Parte de la configuración de la página (ver LEEME.md). */
window.SITIO = window.SITIO || {};
Object.assign(window.SITIO, {

  /* Sección "Normativa DNIT y SIFEN" (en implementacion.html): los cuatro frentes y la factura electrónica de ejemplo */
  normativa: {
    pasos: [
      { icono: "i:libro", titulo: "Contabilidad DNIT", texto: "Tu contabilidad con el plan de cuentas y los impuestos de Paraguay.",
        chips: ["Plan de cuentas DNIT", "IVA 10 %, 5 % y exentas", "RUC con dígito verificador", "Retenciones de IVA e IRE"] },
      { icono: "i:normativa", titulo: "SIFEN · e-Kuatia", texto: "Facturación electrónica aprobada por la DNIT, desde Odoo.",
        chips: ["Facturas y notas electrónicas", "KuDE con código QR", "Cancelación e inutilización"] },
      { icono: "i:acta", titulo: "Firma digital y electrónica", texto: "El certificado para firmar los documentos electrónicos y tus contratos.",
        chips: ["Certificado para SIFEN", "Contratos sin papel"], enlace: { texto: "Junto a Code100 ↗", url: "https://code100.com.py/" } },
      { icono: "i:calendario", titulo: "Declaraciones y libros", texto: "Lo que pide la DNIT, listo para presentar.",
        chips: ["IVA · Formulario 120", "Registro de comprobantes (RG 90)", "Alertas antes de declarar"] }
    ],
    factura: {
      emisor: "Empresa Demo S.A.", ruc: "80000000-0", timbrado: "12345678", numero: "001-001-0000123",
      cliente: "Cliente Ejemplo S.A.", fecha: "10/11/2026", condicion: "Contado",
      items: [["Producto de ejemplo A", "10", "1.500.000"], ["Servicio de ejemplo", "1", "700.000"]],
      iva: "200.000", total: "2.200.000",
      cdc: "0180 0000 0001 0010 0000 1232 0261 1101 2345 6789 0123"
    }
  }
});
