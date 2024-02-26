function processJSON(promise) {
  console.log(promise);
  const condition = promise.current.condition.text;
  const tempF = promise.current.temp_f;
  const feelsLikeF = promise.current.feelslike_f;
  const humid = promise.current.humidity;
  const wind = promise.current.wind_mph;

  console.log(condition, tempF, feelsLikeF, humid, wind);

  // humidity, wind, feels like, temp, forecast too
}
async function weatherAPI() {
  const apiKey = 'fbdf1d0dbdd04b99a2b23301242502';
  const baseURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Paris`;
  const weatherData = await fetch(baseURL);
  processJSON(await weatherData.json());
}

weatherAPI();
