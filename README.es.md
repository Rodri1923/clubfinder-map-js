# 🗺️ ClubFinder Map JS

🌍 **[English](README.md) · [Español](README.es.md)**

> Aplicación web interactiva para gestionar clubes y canchas deportivas en un mapa, construida con Leaflet y OpenStreetMap.

## 📋 Descripción
Permite a los usuarios agregar clubes con ubicación y tipo de deporte, marcarlos como favoritos, filtrar resultados y ver distancias desde su ubicación actual — todo persistido en `localStorage`, sin necesidad de backend.

## 🚀 Funcionalidades
- Mapa interactivo con Leaflet + tiles de OpenStreetMap
- Agregar clubes con nombre, tipo de deporte, foto y ubicación
- Marcar clubes como favoritos y filtrar por deporte
- Autocompletado de ubicaciones vía la API de Photon
- Distancia desde la ubicación actual del usuario (si otorga permiso)
- Arrastrar marcadores para actualizar la ubicación de un club
- Almacenamiento persistente en `localStorage`

## 🧱 Stack técnico
- JavaScript (Vanilla)
- Leaflet
- OpenStreetMap
- Photon API (geocoding)
- localStorage

## 📁 Estructura del proyecto
```
index.html
css/
  style.css
js/
  app.js
assets/
  icons/    → íconos de marcador por deporte
  default.jpg
```

## ▶️ Cómo ejecutar
```bash
git clone https://github.com/Rodri1923/clubfinder-map-js.git
cd clubfinder-map-js
npx http-server .
```
Después abrí la URL que muestra la terminal.

## 🎮 Uso
1. Hacé click en el mapa para elegir la ubicación de un nuevo club.
2. Completá nombre, tipo de deporte y una URL de foto opcional.
3. Click en "Add Club" para crear el marcador.
4. Usá la estrella para marcar favorito, el ícono de basura para eliminar.
5. Filtrá por deporte o favoritos, o buscá una ubicación con la barra de búsqueda.

## 👤 Autor
**Rodrigo Navone**
[GitHub](https://github.com/Rodri1923) · [LinkedIn](https://www.linkedin.com/in/rodrigonavone)
