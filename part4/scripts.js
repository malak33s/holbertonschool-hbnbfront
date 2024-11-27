document.addEventListener('DOMContentLoaded', () => {
    // Capter l'événement de soumission du formulaire de connexion
    document.getElementById("login-form").addEventListener("submit", function(event) {
        // Empêcher l'envoi du formulaire et le rechargement de la page
        event.preventDefault();
        
        // Récupérer les valeurs des champs email et password
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Appeler la fonction pour envoyer les données au backend (API)
        loginUser(email, password);
    });

    // Fonction pour envoyer les données de connexion à l'API et gérer la réponse
    function loginUser(email, password) {
        // URL de ton API pour la connexion (à remplacer par la vraie URL de ton backend)
        const apiUrl = "https://ton-api.com/login";  // Remplace cela par ton API réelle

        // Créer un objet avec les données à envoyer (email et password)
        const data = {
            email: email,
            password: password
        };

        // Envoi de la requête à l'API via la méthode POST avec Fetch API
        fetch(apiUrl, {
            method: 'POST',  // Méthode HTTP POST
            headers: {
                'Content-Type': 'application/json'  // On envoie les données en JSON
            },
            body: JSON.stringify(data)  // On convertit les données en format JSON
        })
        .then(response => response.json())  // Si la réponse est en JSON
        .then(data => {
            // Vérifier si l'API renvoie un token JWT
            if (data.token) {
                // Sauvegarder le token dans le localStorage pour gérer la session
                localStorage.setItem('auth_token', data.token);

                // Rediriger l'utilisateur vers la page index.html
                window.location.href = "index.html";
            } else {
                // Si l'authentification échoue, afficher un message d'erreur
                alert("Email ou mot de passe incorrect");
            }
        })
        .catch(error => {
            // Gérer les erreurs de l'API ou autres problèmes de réseau
            console.error('Error:', error);
            alert("Erreur lors de la connexion");
        });
    }
});
