# ClubFinder Map JS 

**ClubFinder Map JS** es una aplicación web sencilla para gestionar clubes y canchas en un mapa interactivo usando Leaflet y OpenStreetMap. Los usuarios pueden agregar clubes, marcarlos como favoritos, filtrar por deporte y ver distancias desde su ubicación actual.

--- 

## Características

- Mapa interactivo con Leaflet + mosaicos de OpenStreetMap
- Agregar clubes con nombre, tipo de deporte, foto y ubicación
- Marcar clubes como favoritos
- Filtrar clubes por deporte o favoritos
- Búsqueda autocompletada de ubicaciones usando la API de Photon 
- Mostrar distancias desde la ubicación del usuario (si se concede permiso) 
- Mover marcadores de clubes a nuevas ubicaciones
- Barra lateral responsiva con lista de clubes desplazable 
- Guardar todos los datos en `localStorage` (persistente al recargar)
- Ventanas emergentes con detalles e imágenes de los clubes

--- 

## Instalación

1. Clona este repositorio:

```bash 
git clone https://github.com/Rodri1923/clubfinder-map-js.git cd clubfinder-map-js 
``` 

2. Abrir en VS Code: 

```bash
 code . 
``` 

3. Abrir con la extensión **Live Server** (recomendado) o instalar `http-server`: 

```bash 
npm install -g http-server http-server 
``` 

4. Abrir `http://localhost:8080` (o el puerto mostrado) en tu navegador. 

--- 

## Uso

1. Haz clic en el mapa para seleccionar la ubicación de un nuevo club.
2. Completa el nombre del club, tipo de deporte y URL de la foto (opcional).
3. Haz clic en "Add Club" para crear un nuevo marcador.
4. Haz clic en un club de la lista para centrar el mapa en él.
5. Usa el botón de estrella para marcar como favorito y el botón de papelera para eliminar.
6. Usa el desplegable de filtros para mostrar solo ciertos deportes o favoritos.
7. Usa la barra de búsqueda para encontrar ubicaciones mediante la API de Photon y agregar marcadores temporales.

--- 

## Estructura de Carpetas

```perl 
clubfinder-map-js/ 
    ├─ index.html 
    ├─ css/ 
    │ └─ style.css 
    ├─ js/ 
    │ └─ app.js 
    ├─ assets/ │ 
    ├─ icons/ # iconos para cada tipo de deporte
    │ └─ default.jpg # Imagen predeterminada 
    ├─ README.md 
    └─ README.es.md 
``` 

--- 

## Personalización 
- **Agregar nuevos deportes:** añade un ícono en `assets/icons` y actualiza el objeto `icons` en `app.js`.
- **Cambiar la imagen predeterminada:** reemplaza `assets/default.jpg`. 
- **Cambiar el tamaño de los marcadores:** modifica `iconSize` en las definiciones de íconos dentro de `app.js`.

---

## Autor

**Rodrigo Navone** – [GitHub Profile](https://github.com/Rodri1923)