# ClubFinder Map JS 

**ClubFinder Map JS** is a simple web app to manage sports clubs and courts on an interactive map using Leaflet and OpenStreetMap. Users can add clubs, mark favorites, filter by sport, and see distances from their current location. 

--- 

## Features 

- Interactive map with Leaflet + OpenStreetMap tiles 
- Add clubs with name, sport type, photo, and location 
- Mark clubs as favorites 
- Filter clubs by sport or favorites 
- Autocomplete search for locations using Photon API 
- Display distances from user location (if granted) 
- Move club markers to new locations 
- Responsive sidebar with scrollable club list 
- Save all data in `localStorage` (persistent on reload) 
- Popups with club details and images 

--- 

## Installation 

1. Clone the repo:

```bash 
git clone https://github.com/Rodri1923/clubfinder-map-js.git cd clubfinder-map-js 
``` 

2. Open in VS Code: 

```bash
 code . 
``` 

3. Open with **Live Server** extension (recommended) or install `http-server`: 

```bash 
npm install -g http-server http-server 
``` 

4. Open `http://localhost:8080` (or the port shown) in your browser. 

--- 

## Usage 

1. Click on the map to select the location for a new club. 
2. Fill in the club's name, sport type, and photo URL (optional). 
3. Click "Add Club" to create a new marker. 
4. Click a club in the list to center the map on it. 
5. Use the star button to mark as favorite, trash button to delete. 
6. Use the filter dropdown to show only certain sports or favorites. 
7. Use the search bar to find locations via Photon API and add temporary markers. 

--- 

## Folder Structure 

```perl 
clubfinder-map-js/ 
    ├─ index.html 
    ├─ css/ 
    │ └─ style.css 
    ├─ js/ 
    │ └─ app.js 
    ├─ assets/ │ 
    ├─ icons/ # Custom icons per sport 
    │ └─ default.jpg # Default club image 
    ├─ README.md 
    └─ README.es.md 
``` 

--- 

## Customization 
- **Add new sports:** add icon in `assets/icons` and update `icons` object in `app.js`. 
- **Change default image:** replace `assets/default.jpg`. 
- **Change marker size:** modify `iconSize` in `app.js` icons definitions. 

---

## Author

**Rodrigo Navone** – [GitHub Profile](https://github.com/Rodri1923)