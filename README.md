# 🗺️ ClubFinder Map JS

🌍 **[English](README.md) · [Español](README.es.md)**

> Interactive web app to manage sports clubs and courts on a map, built with Leaflet and OpenStreetMap.

## 📋 Overview
Lets users add clubs with location and sport type, mark favorites, filter results, and see distances from their current location — all persisted in `localStorage`, no backend required.

## 🚀 Features
- Interactive map with Leaflet + OpenStreetMap tiles
- Add clubs with name, sport type, photo, and location
- Mark clubs as favorites and filter by sport
- Location autocomplete via the Photon API
- Distance from the user's current location (if permission granted)
- Drag markers to update a club's location
- Persistent storage in `localStorage`

## 🧱 Tech Stack
- Vanilla JavaScript
- Leaflet
- OpenStreetMap
- Photon API (geocoding)
- localStorage

## 📁 Project Structure
```
index.html
css/
  style.css
js/
  app.js
assets/
  icons/    → per-sport marker icons
  default.jpg
```

## ▶️ Getting Started
```bash
git clone https://github.com/Rodri1923/clubfinder-map-js.git
cd clubfinder-map-js
npx http-server .
```
Then open the URL shown in the terminal.

## 🎮 Usage
1. Click on the map to pick a location for a new club.
2. Fill in name, sport type, and an optional photo URL.
3. Click "Add Club" to create a marker.
4. Use the star to favorite, the trash icon to delete.
5. Filter by sport or favorites, or search a location with the search bar.

## 👤 Author
**Rodrigo Navone**
[GitHub](https://github.com/Rodri1923) · [LinkedIn](https://www.linkedin.com/in/rodrigonavone)
