# Página de AXENTRA AI: cómo está organizada y cómo se edita

La página se arma sola a partir de los **datos**. Para cambiar textos, clientes, personas o servicios,
se edita **solo la carpeta `datos/`**: no hace falta tocar el diseño (`css/`) ni la programación (`js/`).

## Carpetas

```
index.html              estructura de la página (secciones y orden)
datos/                  LO QUE SE EDITA: un archivo por sección
css/                    diseño (colores, tamaños, efectos), en orden numerado
js/base.js              ayudas comunes (carruseles, íconos, pestañas)
js/secciones/           cómo se dibuja cada sección a partir de sus datos
js/pestanas.js, js/efectos.js, js/whatsapp-flotante.js
assets/                 imágenes, logos, fotos, tipografías e íconos
```

## Qué archivo de `datos/` tocar

| Para cambiar…                                         | Archivo                    |
|-------------------------------------------------------|----------------------------|
| WhatsApp, correo, ciudad y velocidad de los carruseles | `datos/general.js`         |
| Módulos y aplicaciones de la portada                  | `datos/portada.js`         |
| Áreas de Odoo, recorrido de una venta, pantallas      | `datos/odoo.js`            |
| Consultoría: método, entregables y ejemplos           | `datos/consultoria.js`     |
| Arandu AI (textos, pantallas de ejemplo, video)       | `datos/asistente.js`       |
| Casos de IA y automatizaciones por industria          | `datos/automatizacion.js`  |
| Servicios                                             | `datos/servicios.js`       |
| Normativa DNIT y SIFEN                                | `datos/normativa.js`       |
| Clientes, partners y testimonios                      | `datos/clientes.js`        |
| Equipo (personas, fotos, CV)                          | `datos/equipo.js`          |
| Preguntas frecuentes                                  | `datos/preguntas.js`       |

## Reglas generales

- **Agregar** un cliente, una persona, una pregunta o un servicio: copiar un bloque `{ … }` completo,
  pegarlo debajo (separado por una coma) y cambiar los datos.
- **Ocultar** sin borrar: `visible: false`.
- **Imágenes**: van en `assets/` y se nombran con su ruta, por ejemplo `"assets/clientes/mi-cliente.png"`.
  Si un logo o una foto se deja vacío (`""`), se muestran las iniciales con el color indicado.
- **Clientes y equipo en carrusel**: los clientes siempre giran. El equipo se muestra lado a lado hasta
  2 personas; con 3 o más pasa solo a ser un carrusel con flechas (`carrusel.equipo` en `general.js`).
- **Testimonios**: están cargados con texto de ejemplo y ocultos. Se activan con `visible: true` cuando
  haya frases reales.
- **Video de Arandu AI**: va en `assets/arandu/` y su ruta en `video` (MP4), `videoWebm` (versión liviana, opcional) y
  `videoPoster` (imagen mientras carga), en `datos/asistente.js`. Se muestra en la presentación de Arandu AI y en Equipo.

## Antes de publicar

Abrir `index.html` en el navegador y revisar la sección cambiada, en computadora y en celular.
Un error de escritura en un archivo de `datos/` (por ejemplo, una coma o una comilla de menos) deja
esa sección vacía: si pasa, revisar el último cambio.

## Panel de administración (`admin/`)

En el pie de la página hay un enlace **Ingresar** que abre el panel (`/admin/`). Desde ahí se puede, sin
tocar archivos:

- **Equipo:** agregar, editar, ordenar, ocultar o eliminar personas (foto, nombre, cargo, correo, CV de
  hasta 5 líneas, línea final y color).
- **Clientes:** agregar, editar, ordenar, ocultar o eliminar clientes (logo y sus tres líneas: título,
  subtítulo y tercera línea).

Cómo funciona:

- Cada persona entra con **su propio token de GitHub** (el panel explica cómo crearlo). No hay usuarios ni
  contraseñas escritos en el código: el token queda solo en el navegador de quien lo usa.
- **Guardar y publicar** sube las imágenes nuevas a `assets/` y actualiza `datos/equipo.js` o
  `datos/clientes.js` en el repositorio. GitHub Pages vuelve a publicar la página sola en uno o dos minutos.
- El repositorio y la rama se configuran en `admin/config.js`.
