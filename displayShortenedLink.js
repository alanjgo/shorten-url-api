// Gestionnaire d'événement pour le bouton Shorten It!
document.addEventListener('DOMContentLoaded', function() {
    const shortenBtn = document.getElementById('shortenBtn');
    const urlInput = document.getElementById('urlInput');
    
    if (shortenBtn) {
        shortenBtn.addEventListener('click', function() {
            const url = urlInput.value.trim();
            if (url) {
                shortenUrl(url);
            }
        });
    }
});

// Fonction pour raccourcir l'URL
async function shortenUrl(originalUrl) {
    try {
        // Utiliser l'API tinyurl qui supporte CORS
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`);
        
        if (response.ok) {
            const shortUrl = await response.text();
            console.log('URL raccourcie:', shortUrl);
            // Ici vous pouvez ajouter la logique pour afficher le lien raccourci
        } else {
            console.error('Erreur:', response.status);
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
}
