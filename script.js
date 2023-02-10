const submitButton = document.querySelector('#submit-button');
const switchButton = document.querySelector('#switch-button')

const outputList = document.querySelector('.output-wrapper')

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

        if (key === "USD") {
          currencyOptionElement.selected = true;
        }
      }
    
      const wantsCurrencySelectElement = document.querySelector('#wants-this-currency');
    
      for (let key in currencies) {
        const currencyOptionElement = document.createElement('option');
        currencyOptionElement.textContent = `${key} - ${currencies[key]}`;
        currencyOptionElement.value = key;
        wantsCurrencySelectElement.append(currencyOptionElement);

        
        if (key === "EUR") {
          currencyOptionElement.selected = true;
        }
      }

      submitButton.removeAttribute('disabled');
    });
}

function convertCurrency() {
  submitButton.addEventListener('click', event => {
      event.preventDefault();

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
          const outputElement = document.createElement('div');
          outputElement.className = 'output-item'
          const rateForAmount = data.rates[wantsCurrency].rate_for_amount;
          const rate = data.rates[wantsCurrency].rate
          // const currencyName = data.rated[wantsCurrency].currency_name

          const resultText = document.createElement('span')
          resultText.textContent = `${hasCurrency} coverted to ${wantsCurrency} is : ${rateForAmount}.`
          resultText.value = rateForAmount.value

          const rateText = document.createElement('span')
          rateText.textContent = `Rate for the currency: ${rate}`

          outputElement.append(resultText, rateText)
          outputList.append(outputElement)
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

