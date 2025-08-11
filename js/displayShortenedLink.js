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
    const formData = new URLSearchParams();
    formData.append('url', originalUrl);
    
    const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        body: formData
    });
    
    const data = await response.json();
    
    if (data.result_url) {
        console.log('URL raccourcie:', data.result_url);
        displayShortenedLink(originalUrl, data.result_url);
    } else {
        console.error('Erreur:', data.error);
        displayError('Erreur lors du raccourcissement de l\'URL');
    }
  }
  catch (error) {
    console.error('Erreur réseau:', error);
    displayError('Erreur de connexion au serveur');
  }
}
