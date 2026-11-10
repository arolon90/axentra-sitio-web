/* Íconos propios de AXENTRA (trazo fino, con un acento de relleno).
   Se usan desde datos/sitio.js con el prefijo "i:", por ejemplo icono: "i:normativa". */
(function () {
  var t = {
    normativa: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5"/><path d="M14 3l5 5v3"/><path d="M14 3v5h5"/><path d="M8.5 9h3M8.5 13h5M8.5 17h2"/><circle class="d" cx="17.5" cy="17.5" r="4"/><path d="M15.8 17.6l1.2 1.2 2.3-2.4"/>',
    personas: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5"/><circle class="d" cx="17" cy="9" r="2.4"/><path d="M16 14.6c2.3-.2 4.1 1.3 4.6 4"/>',
    industria: '<rect class="d" x="14" y="5" width="5" height="16" rx=".6"/><path d="M3 21h18M4 21V11l5 3v-3l5 3"/><path d="M7 17.5h1.5M11 17.5h1.5"/>',
    bi: '<path d="M4 20h16"/><rect class="d" x="5.5" y="13" width="3" height="5" rx=".8"/><rect class="d" x="10.5" y="10" width="3" height="8" rx=".8"/><rect class="d" x="15.5" y="12" width="3" height="6" rx=".8"/><path d="M5 8l4.5-3.2 4 2.2L19 3.5"/>',
    integraciones: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle class="d" cx="12" cy="18" r="2.8"/><path d="M7.4 8.2l3.3 7.3M16.6 8.2l-3.3 7.3M8.5 6h7"/>',
    soporte: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect class="d" x="3" y="13" width="4" height="6" rx="1.6"/><rect class="d" x="17" y="13" width="4" height="6" rx="1.6"/><path d="M19 19c0 1.5-1.8 2.5-5 2.5h-1.5"/>',
    diagnostico: '<circle class="d" cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4l5.1 5.1"/><path d="M7.5 12l2-2.2 1.8 1.6 2.2-2.6"/>',
    despegue: '<path class="d" d="M12 3c3.4 2 5 5.4 5 9l-2 3H9l-2-3c0-3.6 1.6-7 5-9z"/><circle cx="12" cy="10" r="1.8"/><path d="M9 15l-2.5 2.5 1 2.5M15 15l2.5 2.5-1 2.5M12 17.5V21"/>',
    crecer: '<rect class="d" x="3.5" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><path d="M16.5 4v6M13.5 7h6"/>',
    plano: '<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M3.5 9h17M9 9v11"/><rect class="d" x="11.5" y="11.5" width="6.5" height="5.5" rx="1"/>',
    flujo: '<rect class="d" x="3" y="3.5" width="7" height="5" rx="1.4"/><rect class="d" x="14" y="15.5" width="7" height="5" rx="1.4"/><path d="M6.5 8.5v4a2 2 0 0 0 2 2h4"/><path d="M11 12.5l2 2-2 2"/><circle cx="17.5" cy="6" r="2.5"/>',
    organigrama: '<rect class="d" x="9" y="3" width="6" height="4.5" rx="1.2"/><rect x="3" y="16.5" width="6" height="4.5" rx="1.2"/><rect x="15" y="16.5" width="6" height="4.5" rx="1.2"/><path d="M12 7.5V12M6 16.5V12h12v4.5"/>',
    libro: '<path class="d" d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="M9 7.5h6M9 11h4"/>',
    bitacora: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"/><path d="M8 8h6M8 12h4M8 16h2"/><path class="d" d="M19.5 10.5l1.5 1.5-6.5 6.5-2.5.8.8-2.5z"/>',
    calendario: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><rect class="d" x="13" y="13" width="4" height="4" rx=".8"/>',
    pendientes: '<path d="M4 6.5l1.5 1.5L8.5 5M4 13.5l1.5 1.5 3-3"/><path d="M11.5 6.5h5M11.5 13.5h2"/><circle class="d" cx="17" cy="17" r="4"/><path d="M17 15v2.2l1.4 1"/>',
    acta: '<path d="M15 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9l4 4v4"/><path d="M8 8h5M8 11.5h7"/><path d="M7.5 16.5c1-1.5 1.8-1.5 2.2 0s1.2 1.5 2.3-.3"/><circle class="d" cx="18" cy="16.5" r="3.5"/><path d="M16.6 19.6L16 22l2-1 2 1-.6-2.4"/>',
    microfono: '<rect class="d" x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>',
    capas: '<path class="d" d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8z"/><path d="M3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"/>',
    balanza: '<path d="M12 4v16M8 20h8M5 7h14"/><path class="d" d="M2.5 13h5L5 7z"/><path class="d" d="M16.5 13h5L19 7z"/>',
    reloj: '<circle class="d" cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.5 1.8M10 2.5h4M18.5 5.5L20 7"/>',
    documento: '<path class="d" d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    tienda: '<path d="M4.5 10v10h15V10"/><path class="d" d="M3 4h18l-1.4 5a2.5 2.5 0 0 1-4.7.5 2.6 2.6 0 0 1-4.4 0 2.6 2.6 0 0 1-4.4 0A2.5 2.5 0 0 1 4.4 9z"/><path d="M9.5 20v-5h5v5"/>',
    hoja: '<path class="d" d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c3-4 6.5-7.2 10.5-9.2"/>',
    maletin: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path class="d" d="M3 12h18v3H3z"/>',
    salud: '<path class="d" d="M12 20s-7.5-4.4-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.6-7.5 10-7.5 10z"/><path d="M6 12.5h3l1.5-2.5 2 4 1.5-2h4"/>',
    calculadora: '<rect x="5" y="3" width="14" height="18" rx="2"/><rect class="d" x="8" y="6" width="8" height="3.5" rx=".8"/><path d="M8.5 13.5h1M11.5 13.5h1M14.5 13.5h1M8.5 17h1M11.5 17h1M14.5 17h1"/>',
    rayo: '<path class="d" d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z"/>',
    ia: '<rect class="d" x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3"/><path d="M10 14.5l2-5 2 5M10.7 13h2.6"/>',
    mensaje: '<path class="d" d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    enlace: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
  };
  window.ICONOS = {};
  Object.keys(t).forEach(function (k) {
    window.ICONOS[k] = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + t[k] + '</svg>';
  });
})();
