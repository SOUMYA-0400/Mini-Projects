const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

// Popular currencies list
const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY'];

// Populate dropdowns
currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.text = currency;
    fromCurrency.add(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.text = currency;
    toCurrency.add(option2);
});

// Set default values
fromCurrency.value = 'USD';
toCurrency.value = 'EUR';

async function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amt = amount.value;

    if (amt === "" || amt <= 0) return;

    resultText.innerText = "Fetching rates...";

    try {
        // Using ExchangeRate-API (Free Tier)
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();
        
        const rate = data.rates[to];
        const convertedAmount = (amt * rate).toFixed(2);

        resultText.innerText = `${amt} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        resultText.innerText = "Error fetching data. Try again.";
        console.error(error);
    }
}

// Event Listeners
convertBtn.addEventListener('click', convertCurrency);

// Optional: Convert on 'Enter' key press
amount.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertCurrency();
});