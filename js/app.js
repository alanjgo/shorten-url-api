document.addEventListener('DOMContentLoaded', function() {
    const shortenBtn = document.getElementById('shortenBtn');
    const urlInput = document.getElementById('urlInput');
    const shortenedLinks = document.getElementById('shortenedLinks');
    const errorMessage = document.getElementById('errorMessage');

    shortenBtn.addEventListener('click', async function() {
        const url = urlInput.value.trim(); // trim pour supprimer les espaces*/
        
        //url se réfère au type d'input (ligne 40 index.html)

        if (!url) {
            showError('Please enter a URL'); 
            return;
        }

        try {
            shortenBtn.disabled = true; //désactive le bouton au clic
            
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', //pas mentionné dans la doc mais obligatoire
                },
                body: JSON.stringify({ url }) //récupère un json
            });

            const data = await response.json();
            
            if (response.ok) {
                displayShortenedLink(url, data.result_url);
                urlInput.value = '';
                hideError();
            } else {
                showError(data.error || 'Failed to shorten URL');
            }
        } catch (error) {
            showError('Network error: ' + error.message);
        } finally {
            shortenBtn.disabled = false;
        }
    });

    function displayShortenedLink(originalUrl, shortUrl) {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'shortened-link';
        linkDiv.innerHTML = `
            <div class="link-content"> 
                <div class="original-url">${originalUrl}</div>
                <div class="shortened-section">
                    <div class="shortened-url">${shortUrl}</div>
                    <button id="copied" class="copy-button" onclick="copyToClipboard('${shortUrl}')">Copy</button>
                </div>
            </div>
    `;

    setTimeout(() => {
        const copyBtn = linkDiv.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => copyToClipboard(shortUrl, copyBtn));
   
    }, 0);
            shortenedLinks.appendChild(linkDiv);
        }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then;
    document.getElementById("copied").textContent = "Copied!";
    document.getElementById("copied").style.backgroundColor = "#3b3054";
}