document.addEventListener('DOMContentLoaded', function() {
    const shortenBtn = document.getElementById('shortenBtn');
    const urlInput = document.getElementById('urlInput');
    const shortenedLinks = document.getElementById('shortenedLinks');
    const errorMessage = document.getElementById('errorMessage');

    shortenBtn.addEventListener('click', async function() {
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Please enter a URL');
            return;
        }

        try {
            shortenBtn.disabled = true;
            shortenBtn.textContent = 'Shortening...';
            
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
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
            shortenBtn.textContent = 'Shorten It!';
        }
    });

    function displayShortenedLink(originalUrl, shortUrl) {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'shortened-link';
        linkDiv.innerHTML = `
            <div class="original-url">${originalUrl}</div>
            <div class="shortened-url">${shortUrl}</div>
            <button class="copy-btn" onclick="copyToClipboard('${shortUrl}')">Copy</button>
        `;
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
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}