const coreCSButton = document.querySelector('.button-future');
coreCSButton.addEventListener('click', randomQuote);
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

function randomQuote() {
    fetch(endpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayQuote(data.message);
        })
        .catch(function () {
            console.log("An error occurred");
        });
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#quote');
    quoteText.textContent = quote;
}