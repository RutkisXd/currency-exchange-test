const submitButton = document.querySelector('#submit-button');
const outputElement = document.querySelector('.output-wrapper');
const switchButton = document.querySelector('#switch-button')

const apiKey = '3ac66f237ea5d897a0daddd0d1a1f84fb85f691c';

function getCurrencies() {
  fetch(`https://api.getgeoapi.com/v2/currency/list?api_key=${apiKey}&format=json`)
    .then(response => response.json())
    .then(data => {
      const currencies = data.currencies;
      console.log(currencies);

      const hasCurrencySelectElement = document.querySelector('#has-this-currency');

      for (let key in currencies) {
        const currencyOptionElement = document.createElement('option');
        currencyOptionElement.textContent = `${key} - ${currencies[key]}`;
        currencyOptionElement.value = key;
        hasCurrencySelectElement.append(currencyOptionElement);
      }
    
      const wantsCurrencySelectElement = document.querySelector('#wants-this-currency');
    
      for (let key in currencies) {
        const currencyOptionElement = document.createElement('option');
        currencyOptionElement.textContent = `${key} - ${currencies[key]}`;
        currencyOptionElement.value = key;
        wantsCurrencySelectElement.append(currencyOptionElement);
      }

      submitButton.removeAttribute('disabled');
    });
}

function convertCurrency() {
  submitButton.addEventListener('click', event => {
      event.preventDefault();

      const previousResult = document.querySelector('p')

      if (previousResult) {
        previousResult.remove()
      }

      const amountInput = document.querySelector('#amount-input');
      const hasCurrencySelectElement = document.querySelector('#has-this-currency');
      const wantsCurrencySelectElement = document.querySelector('#wants-this-currency');
      const hasCurrency = hasCurrencySelectElement.value;
      const wantsCurrency = wantsCurrencySelectElement.value;
      const amount = amountInput.value;

      const apiUrl = `https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}&from=${hasCurrency}&to=${wantsCurrency}&amount=${amount}&format=json`

      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const rateForAmount = data.rates[wantsCurrency].rate_for_amount;
          const rate = data.rates[wantsCurrency].rate
          // const currencyName = data.rated[wantsCurrency].currency_name

          const resultText = document.createElement('p')
          resultText.textContent = `${hasCurrency} coverted to ${wantsCurrency} is : ${rateForAmount}. Rate for the currency: ${rate}`
          resultText.value = rateForAmount.value

          outputElement.append(resultText)
      });
  });
}

function switchCurrencies() {
  switchButton.addEventListener('click', event => {
    event.preventDefault();
    const hasCurrencySelectElement = document.querySelector('#has-this-currency');
    const wantsCurrencySelectElement = document.querySelector('#wants-this-currency');
    const hasCurrency = hasCurrencySelectElement.value;
    const wantsCurrency = wantsCurrencySelectElement.value;
  
    hasCurrencySelectElement.value = wantsCurrency;
    wantsCurrencySelectElement.value = hasCurrency;
  })
}



switchCurrencies()
getCurrencies();
convertCurrency();

