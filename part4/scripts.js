document.addEventListener('DOMContentLoaded', () => {
    loadPlaces();
});

// Fonction pour charger les places depuis l'API
const loadPlaces = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/places');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const places = await response.json();
        const placesList = document.getElementById('places-list');

        if (places.length === 0) {
            document.getElementById('loading').textContent = "No places found.";
            return;
        }

        placesList.innerHTML = places.map(place => `
            <div class="place-card">
                <h3>${place.name}</h3>
                <p>Price: $${place.price_per_night} per night</p>
                <a href="place.html?id=${place.id}" class="details-button">View Details</a>
            </div>
        `).join("");

        document.getElementById('loading').style.display = "none";
    } catch (error) {
        console.error("Error loading places:", error);
        document.getElementById('loading').textContent = "Failed to load places.";
    }
};
