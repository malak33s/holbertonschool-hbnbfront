document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Empêche l'envoi classique du formulaire

            const email = document.getElementById('email').value; // Récupère l'email
            const password = document.getElementById('password').value; // Récupère le mot de passe

            // Appeler la fonction login pour envoyer la requête
            await loginUser(email, password);
        });
    }
});

// Fonction pour envoyer la requête de connexion
async function loginUser(email, password) {
    try {
        const response = await fetch('https://your-api-url/login', {  // Remplacez 'https://your-api-url/login' par l'URL réelle de ton API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Vérifie si la réponse est OK (status 200-299)
        if (response.ok) {
            const data = await response.json(); // Récupère la réponse JSON contenant le token
            // Sauvegarde le JWT dans un cookie
            document.cookie = `token=${data.access_token}; path=/`;
            // Redirige vers la page principale après la connexion
            window.location.href = 'index.html';
        } else {
            // Si la connexion échoue, montre un message d'erreur
            alert('Login failed: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
}
