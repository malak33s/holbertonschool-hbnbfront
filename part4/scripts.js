document.addEventListener('DOMContentLoaded', () => {
    // URL de l'API
    const apiUrl = 'http://localhost:5000/api/places'; // Change l'URL selon ton API

    // Sélection des éléments
    const placesList = document.getElementById('places-list');
    const priceFilter = document.getElementById('price-filter');
    const loadingIndicator = document.getElementById('loading');

    // Charger les places depuis l'API
    const fetchPlaces = async () => {
        try {
            // Afficher l'indicateur de chargement
            loadingIndicator.style.display = 'block';

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données.');
            }
            const places = await response.json();

            // Masquer l'indicateur de chargement
            loadingIndicator.style.display = 'none';

            // Remplir la liste des places
            populatePlaces(places);

            // Remplir les options du filtre
            populateFilterOptions(places);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    // Afficher les places dans la liste
    const populatePlaces = (places) => {
        placesList.innerHTML = ''; // Réinitialiser la liste
        places.forEach((place) => {
            // Créer une carte pour chaque place
            const placeCard = document.createElement('div');
            placeCard.classList.add('place-card');
            placeCard.innerHTML = `
                <h3>${place.name}</h3>
                <p>Price: $${place.price_per_night}</p>
                <button class="details-button" data-id="${place.id}">View Details</button>
            `;
            placesList.appendChild(placeCard);
        });
    };

    // Remplir les options du filtre
    const populateFilterOptions = (places) => {
        const prices = [...new Set(places.map((place) => place.price_per_night))];
        priceFilter.innerHTML = '<option value="">All Prices</option>'; // Option par défaut
        prices.sort((a, b) => a - b).forEach((price) => {
            const option = document.createElement('option');
            option.value = price;
            option.textContent = `$${price}`;
            priceFilter.appendChild(option);
        });
    };

    // Filtrer les places en fonction du prix sélectionné
    priceFilter.addEventListener('change', async (event) => {
        const selectedPrice = event.target.value;

        try {
            const response = await fetch(apiUrl);
            const places = await response.json();

            const filteredPlaces = selectedPrice
                ? places.filter((place) => place.price_per_night == selectedPrice)
                : places;

            populatePlaces(filteredPlaces);
        } catch (error) {
            console.error('Erreur lors du filtrage:', error);
        }
    });

    // Charger les données au chargement de la page
    fetchPlaces();
});
