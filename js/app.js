// ============================
// Inicializar mapa
// ============================
const map = L.map('map').setView([-34.9011, -56.1645], 12);

// Capa base OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Variables globales
let clubs = JSON.parse(localStorage.getItem('clubs')) || [];
let markers = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let selectedCoords = null;
let tempMarker = null;
let moveMode = null;
window.userCoords = null; // para la ubicación del usuario


// Iconos personalizados por deporte
const icons = {
  futbol: L.icon({ iconUrl: 'assets/icons/pin-fut.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] }),
  tenis: L.icon({ iconUrl: 'assets/icons/pin-tenis.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] }),
  basquet: L.icon({ iconUrl: 'assets/icons/pin-basket.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] }),
  remo: L.icon({ iconUrl: 'assets/icons/pin-remo.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] }),
  padel: L.icon({ iconUrl: 'assets/icons/pin-padel.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] }),
  natacion: L.icon({ iconUrl: 'assets/icons/pin-natacion.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] }),
  rugby: L.icon({ iconUrl: 'assets/icons/pin-rugby.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] }),
  default: L.icon({ iconUrl: 'assets/icons/pin-default.png', iconSize: [50, 50], iconAnchor: [25, 50], popupAnchor: [0, -50] })
};

// Click en mapa para seleccionar ubicación
map.on('click', function(e) {
  if (moveMode) return;
  selectedCoords = [e.latlng.lat, e.latlng.lng];
  if (tempMarker) map.removeLayer(tempMarker);
  tempMarker = L.marker(selectedCoords, {opacity: 0.5, draggable: true})
    .addTo(map)
    .bindPopup('Ubicación seleccionada')
    .openPopup();
});

// Renderizar lista de clubes
function renderClubList(filteredClubs) {
  const list = document.getElementById('clubList');
  list.innerHTML = '';
  const arr = filteredClubs || clubs;

  arr.forEach((club, index) => {
    const li = document.createElement('li');

    // Calcular distancia si se tiene la ubicación del usuario
    let distanceText = '';
    if (window.userCoords && club.coords) {
      const R = 6371; // km
      const dLat = (club.coords[0]-window.userCoords[0])*Math.PI/180;
      const dLon = (club.coords[1]-window.userCoords[1])*Math.PI/180;
      const a = Math.sin(dLat/2)**2 + Math.cos(window.userCoords[0]*Math.PI/180)*Math.cos(club.coords[0]*Math.PI/180)*Math.sin(dLon/2)**2;
      const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R*c;
      distanceText = ` - ${(d).toFixed(2)} km`;
    }

    li.innerHTML = `
      <span>${club.name} (${club.type})${distanceText}</span>
      <div class="buttons">
        <button class="favoriteBtn">${club.favorite ? '★' : '☆'}</button>
        <button class="deleteBtn">🗑️</button>
      </div>
    `;

    li.querySelector('.favoriteBtn').addEventListener('click', () => {
      club.favorite = !club.favorite;
      localStorage.setItem('clubs', JSON.stringify(clubs));
      renderClubList(filteredClubs);
      refreshMarkers();
    });

    li.querySelector('.deleteBtn').addEventListener('click', () => {
      if (confirm(`Eliminar club "${club.name}"?`)) {
        clubs.splice(index, 1);
        localStorage.setItem('clubs', JSON.stringify(clubs));
        refreshMarkers();
      }
    });

    li.addEventListener('click', () => {
      map.setView(club.coords, 16);
      markers[index].openPopup();
    });

    list.appendChild(li);
  });
}

// Crear marcador en mapa
function addMarker(club) {
  const icon = icons[club.type] || icons.default;
  const marker = L.marker(club.coords, { icon }).addTo(map);
  const img = club.photo ? `<img src="${club.photo}" alt="${club.name}">` : `<img src="assets/default.jpg" alt="default">`;

  marker.bindPopup(`
    <b>${club.name}</b><br>
    Tipo: ${club.type}<br>
    ${img}<br>
    <button onclick="toggleFavorite('${club.name}')">
      ${club.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    </button><br>
    <button onclick="editClub('${club.name}')">Editar</button>
    <button onclick="moveClub('${club.name}')">Mover</button>
  `);

  markers.push(marker);
}

// Alternar favorito
function toggleFavorite(name) {
  const club = clubs.find(c => c.name === name);
  if (!club) return;
  club.favorite = !club.favorite;

  if (club.favorite && !favorites.some(f => f.name === club.name)) favorites.push(club);
  else favorites = favorites.filter(f => f.name !== club.name);

  localStorage.setItem('favorites', JSON.stringify(favorites));
  localStorage.setItem('clubs', JSON.stringify(clubs));
  renderClubList();
}

// Editar club
function editClub(name) {
  const club = clubs.find(c => c.name === name);
  if (!club) return;
  const newName = prompt("Nuevo nombre:", club.name) || club.name;
  const newType = prompt("Nuevo tipo (futbol, tenis, basquet):", club.type) || club.type;
  const newPhoto = prompt("Nueva URL foto:", club.photo) || club.photo;
  club.name = newName;
  club.type = newType;
  club.photo = newPhoto;
  localStorage.setItem('clubs', JSON.stringify(clubs));
  refreshMarkers();
}

// Mover club
function moveClub(name) {
  const club = clubs.find(c => c.name === name);
  if (!club) return;
  alert("Arrastra el marcador temporal y haz click en Confirmar.");
  moveMode = club;
  if (tempMarker) map.removeLayer(tempMarker);
  tempMarker = L.marker(club.coords, { draggable: true, opacity: 0.5 })
    .addTo(map)
    .bindPopup('<button id="confirmMove">Confirmar nueva ubicación</button>')
    .openPopup();

  tempMarker.on('popupopen', () => {
    document.getElementById('confirmMove').addEventListener('click', () => {
      club.coords = [tempMarker.getLatLng().lat, tempMarker.getLatLng().lng];
      moveMode = null;
      map.removeLayer(tempMarker);
      tempMarker = null;
      localStorage.setItem('clubs', JSON.stringify(clubs));
      refreshMarkers();
    });
  });
}

// Refrescar todos los markers
function refreshMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  clubs.forEach(addMarker);
  renderClubList();
}

// Formulario agregar club
document.getElementById('addClubForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!selectedCoords) { alert("Selecciona la ubicación primero."); return; }

  const name = document.getElementById('clubName').value;
  const type = document.getElementById('clubType').value;
  const photo = document.getElementById('clubPhoto').value || 'assets/default.jpg';

  const club = { name, type, photo, coords: selectedCoords, favorite: false };
  clubs.push(club);
  addMarker(club);
  localStorage.setItem('clubs', JSON.stringify(clubs));

  e.target.reset();
  selectedCoords = null;
  if (tempMarker) { map.removeLayer(tempMarker); tempMarker = null; }
  renderClubList();
});

// Filtrar clubes
document.getElementById('filterType').addEventListener('change', (e) => {
  const filter = e.target.value;
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  let filtered = clubs;
  if (filter !== 'all') {
    if (filter === 'favorites') filtered = clubs.filter(c => c.favorite);
    else filtered = clubs.filter(c => c.type === filter);
  }
  filtered.forEach(addMarker);
  renderClubList(filtered);
});

// Búsqueda con Photon API
document.getElementById('searchInput').addEventListener('input', async (e) => {
  const query = e.target.value;
  const resultsList = document.getElementById('searchResults');
  resultsList.innerHTML = '';
  if (query.length < 3) return;

  try {
    const res = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`);
    const data = await res.json();
    data.features.forEach(place => {
      const li = document.createElement('li');
      li.textContent = place.properties.name || place.properties.street || 'Lugar encontrado';
      li.addEventListener('click', () => {
        const coords = [place.geometry.coordinates[1], place.geometry.coordinates[0]];
        map.setView(coords, 16);
        L.marker(coords).addTo(map).bindPopup(li.textContent).openPopup();
        resultsList.innerHTML = '';
        e.target.value = '';
      });
      resultsList.appendChild(li);
    });
  } catch (err) {
    console.error('Error en búsqueda:', err);
  }
});

// Detectar ubicación del usuario
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userCoords = [position.coords.latitude, position.coords.longitude];

      const userMarker = L.marker(userCoords, {
        icon: L.icon({
          iconUrl: 'assets/icons/pin-default.png',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        })
      }).addTo(map)
        .bindPopup('Tu ubicación')
        .openPopup();

      map.setView(userCoords, 14);
      window.userCoords = userCoords;
      renderClubList();
    },
    (error) => {
      console.warn('No se pudo obtener la ubicación:', error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
} else {
  console.warn('Geolocalización no soportada por el navegador');
}

// Inicializar con clubes guardados
if (clubs.length > 0) {
  clubs.forEach(addMarker);
  renderClubList();
}
