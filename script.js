const history = [];

function shortenURL() {
    const originalURL = document.getElementById('originalURL').value;
    if (!originalURL) {
        document.getElementById('error-message').textContent = 'Please enter a valid URL.';
        return;
    }

    //Bitly access token
    const accessToken = 'e3370eac4dff126f9947c164f014ad7c03a164ae';

    //API endpoint
    const bitlyAPI = 'https://api-ssl.bitly.com/v4/shorten';

    fetch(bitlyAPI, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            long_url: originalURL,
        }),
    })
    .then(response => response.json())
    .then(data => {
        const shortenedURL = data.link;
        document.getElementById('shortenedURL').textContent = shortenedURL;
        document.getElementById('error-message').textContent = '';

        // Adds URL history
        history.push({ original: originalURL, shortened: shortenedURL });
        updateHistoryList();
    })
    .catch(error => {
        document.getElementById('error-message').textContent = 'Error: Unable to shorten URL.';
        console.error('Error:', error);
    });
}

function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Original URL:</strong> ${entry.original}<br><strong>Shortened URL:</strong> ${entry.shortened}`;
        historyList.appendChild(listItem);
    });
}
