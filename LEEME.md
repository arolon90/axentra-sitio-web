# Página de AXENTRA AI: cómo está organizada y cómo se edita

El sitio tiene **una página por tema** y todas comparten el mismo encabezado (menú) y pie, que se arman solos
desde `datos/menu.js`. Para cambiar textos, clientes, personas o servicios, se edita **solo la carpeta `datos/`**:
no hace falta tocar el diseño (`css/`) ni la programación (`js/`).

## Páginas

| Página                   | Archivo               | Qué tiene                                              |
|--------------------------|-----------------------|--------------------------------------------------------|
| Inicio                   | `index.html`          | Portada, partners, "¿Qué hacemos?", clientes y testimonios |
| ¿Qué es Odoo?            | `odoo.html`           | Qué es Odoo, sus áreas y "Así se ve en Odoo"           |
| Arandu AI                | `arandu-ai.html`      | Presentación con video, capacidades y app de ejemplo   |
| Consultoría y procesos   | `consultoria.html`    | Antes y después, método y entregables                  |
| Implementaciones y soporte | `implementacion.html` | Servicios y, como último apartado, normativa DNIT y SIFEN |
| IA y automatización      | `automatizacion.html` | Casos por industria                                    |
| Nuestro equipo           | `equipo.html`         | Equipo y Arandu AI                                     |
| Contacto                 | `contacto.html`       | Formulario, WhatsApp, correo y preguntas frecuentes    |

Los enlaces viejos de la página única (por ejemplo `axentra-ai.com.py/#contacto`) llevan solos a su página nueva.

## Carpetas

```
*.html                  una página por tema (secciones de cada una)
datos/                  LO QUE SE EDITA: un archivo por sección, más menu.js (menú, pie y orden de páginas)
css/                    diseño (colores, tamaños, efectos), en orden numerado
js/base.js              ayudas comunes (carruseles, íconos, pestañas, video)
js/marco.js             encabezado, menú (con desplegable y ☰ en celular), enlace "Siguiente" y pie
js/secciones/           cómo se dibuja cada sección a partir de sus datos
js/pestanas.js, js/efectos.js, js/whatsapp-flotante.js
assets/                 imágenes, logos, fotos, tipografías e íconos
```

## Qué archivo de `datos/` tocar

| Para cambiar…                                         | Archivo                    |
|-------------------------------------------------------|----------------------------|
| Menú, pie de página y orden de páginas ("Siguiente") | `datos/menu.js`            |
| "¿Qué hacemos?" del inicio (una tarjeta por página)   | `datos/inicio.js`          |
| WhatsApp, correo, ciudad, motivos del formulario y carruseles | `datos/general.js` |
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
  `videoPoster` (imagen mientras carga), en `datos/asistente.js`. Se muestra en la página de Arandu AI.

## Botones y formulario de contacto

Los botones que invitan a consultar llevan a `contacto.html?motivo=<clave>` (por ejemplo `?motivo=dnit`): el
formulario llega con ese motivo ya elegido y el mensaje de WhatsApp lo incluye. Las claves y sus textos están en
`motivos` (`datos/general.js`).

## Página nueva

1. Copiar una página parecida (por ejemplo `equipo.html`), cambiar `<title>`, la descripción, `data-pagina` y
   las secciones de adentro de `<main>`.
2. Sumarla en `paginas` de `datos/menu.js` (con el mismo id que `data-pagina`) y, si va en el menú, en `menu.opciones`.

## Antes de publicar

Abrir la página cambiada en el navegador y revisarla en computadora y en celular.
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
