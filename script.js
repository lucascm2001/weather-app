const cityInput = document.querySelector('#city');
const submit = document.querySelector('#submit');

// time to style!

function weatherToScreen(data) {
  data.forEach((element, index) => {
    const listItem = document.querySelector(`li:nth-child(${index + 1}) > span`);
    listItem.textContent = ` ${element}`;
    // list.appendChild(listItem);
  });
}

function locationToScreen({ name, region, country }) {
  const location = document.querySelector('#location-name');
  location.textContent = `${name}, ${region}, ${country}`;
}

function processJSON(promise) {
  console.log(promise);
  const condition = promise.current.condition.text;
  const tempF = promise.current.temp_f;
  const feelsLikeF = promise.current.feelslike_f;
  const humid = promise.current.humidity;
  const wind = promise.current.wind_mph;

  locationToScreen(promise.location);

  console.log(condition, tempF, feelsLikeF, humid, wind);
  const data = [condition, tempF, feelsLikeF, humid, wind];
  weatherToScreen(data);

  // humidity, wind, feels like, temp, forecast too
}
async function weatherAPI(city) {
  // need to check if valid city
  try {
    const time1 = performance.now();
    const apiKey = 'fbdf1d0dbdd04b99a2b23301242502';
    const baseURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const weatherData = await fetch(baseURL);
    processJSON(await weatherData.json());
    const time2 = performance.now();
    console.log(time2 - time1);
  } catch (err) {
    const location = document.querySelector('#location-name');
    location.textContent = 'Not a valid location';
  }
}

submit.addEventListener('click', (event) => {
  event.preventDefault();
  weatherAPI(cityInput.value);
});

// inputs data on enter
cityInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submit.click();
  }
});
